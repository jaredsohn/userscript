// ==UserScript==
// @name          Vinesauce Vidya Harmonizer
// @namespace     http://vinesaucevidya.com/
// @description   makes Vinesaucevidya.com more harmonious
// @include       http://vinesaucevidya.com/
// @include		  http://vinesaucevidya.com/homobutts
// @include		  http://vinesaucevidya.com/vinecraft
// ==/UserScript==


//The entire Konami code check piece of this script is copied-and-pasted from http://mattkirman.com/2009/05/11/how-to-recreate-the-konami-code-in-javascript/ because I am a lazy-ass motherfucker
//To make the code more readable, I left in the original comments
// check to make sure that the browser can handle window.addEventListener
if (window.addEventListener) {
    // create the keys and konami variables
    var keys = [],
        konami = "38,38,40,40,37,39,37,39,66,65";
   
    // bind the keydown event to the Konami function
    window.addEventListener("keydown", function(e){
        // push the keycode to the 'keys' array
        keys.push(e.keyCode);
       
        // and check to see if the user has entered the Konami code
        if (keys.toString().indexOf(konami) >= 0) {

//****here's where the real HARMONY begins****

document.title = "HARMONYSAUCE VIDYA";
GM_addStyle('body{background:#EEF2FF url(http://i.imgur.com/L6sbv.png) repeat;}');

var stream = document.getElementById('leftinfo');

if (stream) {
	stream.parentNode.removeChild(stream);
}

var div = document.createElement('div');
div.style.zIndex = '1';
div.style.padding = '0px';
div.style.margin = '0px';
div.style.position = 'absolute';
div.style.left = '95px';
div.style.top = '325px';
div.style.width = '700px';
div.style.height = '700px';
var embed = document.createElement('embed');
embed.setAttribute('src', "http://bimmy.org/swf/060ebd911376181201b6382ab7205faf014bb6b3.swf");
embed.setAttribute('width', "600");
embed.setAttribute('height', "450");
embed.setAttribute('name', "harmony");
embed.setAttribute('type', "application/x-shockwave-flash");
div.appendChild(embed);
document.getElementsByTagName('body')[0].appendChild(div);

//just to close off the section that's trigged by the code

keys = [];
        };
    }, true);
};