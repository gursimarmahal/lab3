https://pixabay.com/api/?key=34307200-d9d40f7d91792ea09ef6fe4a9&q=yellow+flowers&image_type=photo&pretty=true


// This function sends a GET request to the Pixabay API and calls getExternal() with the response data
function getpixabay() {
	let response = "";
	// Send a GET request to the Pixabay API with a search query for yellow flowers
	fetch('https://pixabay.com/api/?key=34307200-d9d40f7d91792ea09ef6fe4a9&q=yellow+flowers&image_type=photo&pretty=true')
	  .then(function(res){
		// Convert the response to JSON
		return res.json();
	  })
	  .then(function(data) {
		// Call getExternal() with the hits property of the response data
		getExternal(data.hits);
	  })
	  .catch(function(err){
		// Handle any errors
		console.log(err);
	  });
	// Return the response variable (which is currently an empty string)
	return response;
  }
  
  // This function sends a GET request to the JSON Placeholder API and generates HTML content based on the response data
  function getExternal(hits) {
	// Send a GET request to the JSON Placeholder API
	fetch('https://jsonplaceholder.typicode.com/posts')
	  .then(function(res){
		// Convert the response to JSON
		return res.json();
	  })
	  .then(function(data) {
		// Loop through the response data using forEach()
		let counter = 0;
		data.forEach(function(d){
		  // Clone a template element and set its content based on the response and the hits array
		  let tmpl = document.getElementById("blogtemplate");
		  let obj = tmpl.cloneNode(true);
		  obj.removeAttribute('id');
		  obj.setAttribute("class", "blogInformation");
		  obj.style.display = ''; 
  
		  if (counter <= 20) {
			let hdr = obj.getElementsByClassName("card-header");
			let body = obj.getElementsByClassName("description");
			let img = obj.getElementsByClassName("image");
			img[0].src = hits[counter].webformatURL;
  
			hdr[0].innerText = (counter+1) + '. '  + d.title;
			body[0].innerText = d.body;
  
			tmpl.parentNode.append(obj);
		  }
  
		  counter++;
		});
	  })
	  .catch(function(err){
		// Handle any errors
		console.log(err);
	  });
  }
  
  // Add an event listener to the window object to execute getpixabay() when the page loads
  window.addEventListener( "load", getpixabay, false );