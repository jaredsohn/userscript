// ==UserScript==
// @name           ETI Image Width
// @namespace      pendevin
// @description    Allows you to set a maximum width for an image so it doesn't stretch your page
// @include        http://endoftheinter.net/inboxthread.php*
// @include        http://links.endoftheinter.net/linkme.php*
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://endoftheinter.net/inboxthread.php*
// @include        https://links.endoftheinter.net/linkme.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// ==/UserScript==

//BEGIN USER DEFINED VALUES

//This value is the desired maximum width
const Width=1080;

//END USER DEFINED VALUES

function livelinks(func){
	document.addEventListener(
		'DOMNodeInserted',
		function(e){if(e.target.firstChild&&e.target.firstChild.className=='message-container')func(e.target.firstChild);},
		false
	);
	func(document);
}

function getSmall(place){
	var images=place.getElementsByClassName('img-placeholder');
	var css='';

	for(var i=0;i<images.length;i++){
		var imgWidth=parseInt(images[i].style.width.slice(0,-2));
		if(imgWidth>Width){
			var imgHeight=parseInt(images[i].style.height.slice(0,-2));
			var ratio=imgHeight/imgWidth;
			css+='\n\
				.message #'+images[i].id+', .message #'+images[i].id+' > img{\n\
					max-width:'+Width+'px;\n\
					max-height:'+parseInt(Width*ratio)+'px;\n\
				}';
		}
	}

	GM_addStyle(css);
}

livelinks(getSmall);