// ==UserScript==
// @name ETI Work Mode
// @namespace freakish thunder
// @description Hit 'w' key on message list to quickly toggle image display for browsing at work
// @include http://*.endoftheinter.net/showmessages.php*
// @include https://*.endoftheinter.net/showmessages.php*
// @include http://endoftheinter.net/showmessages.php*
// @include https://endoftheinter.net/showmessages.php*
// ==/UserScript==

GM_setValue("hide", false);
GM_setValue("clicks", 0);

document.onkeydown = function(evt) { 

     evt  = (evt) ? evt : ((event) ? event : null);
var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    var code = evt.keyCode; // retrieve keypress keycode
var value = String.fromCharCode(evt.keyCode).toUpperCase();
           
	if (value == 'W' && node.tagName != 'TEXTAREA')
    {
var clicks = GM_getValue("clicks");
        GM_setValue("clicks", clicks + 1);
var visible;
if (clicks == 0)
    visible = false;
    else   
    visible = !GM_getValue("hide");
        GM_setValue("hide", visible);        
  var images = document.getElementsByTagName('img'); 
for(var i = 0; i < images.length; i++) {

    images[i].style.visibility = (visible ? 'visible' : 'hidden');  
}
                       
	 }
    
};