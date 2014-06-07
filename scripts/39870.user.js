// ==UserScript==
// @name           koc click helper
// @namespace      localhost
// @description    koc click helper
// @include        http://www.kingsofchaos.com/recruit.php*
// ==/UserScript==



//
//automatic refrerrer if a users' link has been clicker five times
//

if(document.body.innerHTML.indexOf("You've already clicked this link 5 times today")!=-1){
	document.location ="http://www.kingsofchaos.com/recruit.php";
}

//
//image manipulation
//

/*
imgar=document.getElementsByTagName("img");
image=imgar[(imgar.length-1)];

GM_xmlhttpRequest({
  method:"GET",
  url:image.src,
  headers:{
    "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
    "Accept":"text/xml"
  },
  onload:function(response) {
	test(response.responseText);
  }
});

function test(data){
	imgsrc=data;
}
//*/


window.addEventListener("load", function(e) {
	unsafeWindow.processImage();
}, false);

unsafeWindow.processImage = function() {
	imgar=document.getElementsByTagName("img");
	image=imgar[(imgar.length-1)];



	// Create the canvas element

	var canvas = document.createElement("canvas");

	canvas.width = image.width;

	canvas.height = image.height;

	// Draw the image onto the canvas

	canvas.getContext("2d").drawImage(image, 0, 0);

//*
	// Get the pixeldata
	//var imgData=canvas.getContext("2d").getImageData(0, 0, image.width, image.height);
//alert(image_data);
	//*/

	// --------------------------------------------------
	// 		Manipulate the image
	// --------------------------------------------------

	// --------------------------------------------------
	// 		Manipulation END
	// --------------------------------------------------



	// Create the refreshbutton
	refreshbutton="<input type='button' onclick='document.location =\"http://www.kingsofchaos.com/recruit.php\";' value='New'>";

	// Put the canvas element on the page
	node=document.getElementsByName('image_clickthrough_form')[0].getElementsByTagName("p")[0];
	node.innerHTML=refreshbutton+node.innerHTML+"\n<br><br>";
	node.appendChild(canvas);
};


