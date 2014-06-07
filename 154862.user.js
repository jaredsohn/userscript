// ==UserScript==
// @name        My Trial
// @namespace   mytrial
// @description Yesting
// @include http://www.google.com/
// @include http://www.google.co.in/
// @include https://www.google.com/
// @include https://www.google.co.in/
// @version     1
// ==/UserScript==
(function () {
	
 
  run();
  
function run() {
	//alert("I am an alert box!");
  // download-youtube-video is a container for the download button
  if (!document.getElementById("hplogo")) return ;
  //Get I am Lucky Button
  var my_love= document.getElementById("hplogo");
  if (my_love.tagName.toLowerCase()=="div")
	my_love.style.background="url('http://pictat.com/i/2012/12/23/33491roseramya.jpg')";
  else
   my_love.src="http://pictat.com/i/2012/12/23/33491roseramya.jpg";
  //alert(get_lucky);
}
})();