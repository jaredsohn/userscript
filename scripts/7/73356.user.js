// ==UserScript==
// @name GaiaEggs
// ==/UserScript==


 var found = 0;
  var msg = "";
  var egg = /[\w\W]*egg.png[\w\W]*/
  var imgs = document.getElementsByTagName('img'); //find all the images in the dom
  for (var i = 0; i < imgs.length; i++) { //go through them all
    img = imgs[i];  
	
    //msg += img.src;
    if(egg.test(img.src)){
		found = 1;
		//alert('There is an egg on this page!");
		//break;
	}
   
  }

if(found == 1){
   alert('Found Egg!');
}
  
