// ==UserScript==
// @name           Enlarge facebook small photos and profile images
// @namespace      orenbh
// @description    Shows the full sized profile picture/photos when you hover over profile images/photos, in thumbnails on profiles or walls. Also enlarge all pictures on search results and on view friends page.
// @include        http://*.facebook.com/*
// ==/UserScript==

/*
This is a combined scripts of 3 original scripts:
(Make Facebook Images Big / Enlarge facebook profile images / inYOf4ceBook)
also fixes some major bugs on some of them. (made by orenbh)

some source taken from FB_PIC by Michael Coyne.
Different strategy, attach mouseover to all images at 
server "profile.ak.facebook.com", forget links.
Modified by orenbh to include photos as well

FB_PIC = http://userscripts.org/scripts/show/11446

Big images on search/friends pages got fixed by orenbh to
display the page correctly (using customized CSS files).
*/

function init() {


	var re = new RegExp("www.facebook.com/friends.php?");
	var re2 = new RegExp("www.facebook.com/s.php?");
	if (re.test(location) | re2.test(location)){
	
	var img = document.getElementsByTagName("img");
	for(var i=0;i<img.length;i++)
	{
	    if(img[i].src.match("profile"))
	    {
			var myarray=img[i].src.split("/");
			var hehe = myarray[6].substring(1,myarray[6].length);
			img[i].src = myarray[0]+"/"+myarray[1]+"/"+myarray[2]+"/"+myarray[3]+"/"+myarray[4]+"/"+myarray[5]+"/"+"n"+hehe;
	    }
	
	} 
	
	var links = document.getElementsByTagName("link");
	for(var i=0;i<links.length;i++)
	{
	    if(links[i].href.match("friends.css"))
	    {
	        links[i].href= "http://sevevb.com/facebook/orenbh/friends.css?12:60931";
	        break;
	    }
	    else if(links[i].href.match("ubersearch.css"))
	    {
	        links[i].href= "http://sevevb.com/facebook/orenbh/ubersearch.css?12:69640";
	        break;
	    } 
	} 
	
	}
	
	var pic = document.createElement('div');
	pic.setAttribute('id', 'FB_PIC_EVO');
	pic.style.position = 'absolute';
	pic.style.zIndex = 10000;
	pic.style.visibility = 'hidden';
	document.body.appendChild(pic);
	
	var imgs = document.getElementsByTagName('img');
	for (var i = 0; i < imgs.length; i++) { // http://photos-
	
		if (imgs[i].src.include('profile.ak.facebook.com') || imgs[i].src.include('photos-')) {
	    if (imgs[i].src.substr(imgs[i].src.lastIndexOf('\/')+1,1) != 'n'){
        imgs[i].addEventListener('mouseover', find, true);
        imgs[i].addEventListener('mousemove', function(ev) {
          wait(
            function() { return ($('FB_PIC_EVO').clientHeight > 0 && $('FB_PIC_EVO').clientWidth > 0 && ev.clientX > 0); },
            function() { show(ev.clientX, ev.clientY, $('FB_PIC_EVO').clientHeight, $('FB_PIC_EVO').clientWidth); } 
          );
        }, true);
        imgs[i].addEventListener('mouseout', function(){$('FB_PIC_EVO').innerHTML = '';$('FB_PIC_EVO').style.visibility='hidden';}, true); 
			}
		}
	}
	
}

function find(ev) {
	//var id = ev.target.src.getIDFromImg();
	var pic = ev.target.src;
	
	if (pic) {
		pic = pic.substring( 0, pic.lastIndexOf('/') + 1 ) + 'n' + pic.substring( pic.lastIndexOf('/') + 2, pic.length );
		//pic = pic.substr(0,pic.indexOf(id)-1)+'n'+pic.substr(pic.indexOf(id));
		$('FB_PIC_EVO').innerHTML = '<img src="'+pic+'"/>';
	}
} 
function show(x, y, h, w) {
	$('FB_PIC_EVO').style.top = window.scrollY+y-(.5*h)+'px';
	while (parseInt($('FB_PIC_EVO').style.top,10)+h >= window.innerHeight+window.scrollY)
		$('FB_PIC_EVO').style.top = parseInt($('FB_PIC_EVO').style.top,10)-30+'px';	

	while (parseInt($('FB_PIC_EVO').style.top,10) <= window.scrollY)
		$('FB_PIC_EVO').style.top = 30+parseInt($('FB_PIC_EVO').style.top,10)+'px'; 
		
	if (window.innerWidth-15 <= window.scrollX+x+w+25)
		$('FB_PIC_EVO').style.left = x-w-25+window.scrollX+'px';	
	else
		$('FB_PIC_EVO').style.left = (window.scrollX+x+25)+'px';

	$('FB_PIC_EVO').style.visibility = 'visible';
}

// *********************
//
// Utility Functions 
//
// *********************
function wait(c,f){	if (c()) f(); else window.setTimeout(function (){wait(c,f)},300,false);}
function $(e) { return document.getElementById(e); }
//String.prototype.getIDFromImg = function(){return parseInt(this.substr(this.lastIndexOf('\/')+2,this.indexOf('_')-2-this.lastIndexOf('\/')),10);}
String.prototype.include = function(pattern){ return this.indexOf(pattern) > -1 }

init();