// ==UserScript==
// @name			Playlist button youtube
// @namespace		http://userscripts.org/scripts/show/130725
// @author			Antoine B.
// @description		Button replacement for youtube playlist bar, lets you choose to hide or show the bar at the bottom of certain pages, also adds various options.
// @include			http://youtube.com/watch?*&list=*
// @include			http://*.youtube.com/watch?*&list=*
// @include			https://*.youtube.com/watch?*&list=*
// @match			http://*.youtube.com/watch?*&list=*
// @match			https://*.youtube.com/watch?*&list=*
// @version			1.5.2
// ==/UserScript==

//CHANGELOG

	/* CHANGELOG
	v1.1 
		*bugfix : when clicking directly on video in playlist bar, the bar won't hide anymore when loading the new page
		*now the behaviour will be the same when you click "previous button", "next button" or the video frame you want to watch
	v1.1.2
		*added style for non toggled button : button text turns red when mouse over then turns back to grey when mouse out.
	v1.2.0
		*I rebuilt the script so that it's less "heavy" 
		*added a secondary button that lets user easily go to previous or next video in the playlist without having to show the playlist bar
	v1.2.1
		*added translations for French and English Browsers
		*other browsers will have english translation! (PM me for new languages)
	v1.3.0
		*added new options in menu button, now you can switch on or off autoplay and shuffle play !
		*also added the position of the actual video in the playlist at the bottom of the menu and in tooltip of menu button
	v1.3.1
		*bugfix: when you enable suffle play, the position of the video in the index of playlist will update.	
		*little tweaks
	v1.4.0
		*added new option in menu button that let user choose between hiding or showing video icons in playlist bar
	v1.5.0
		*changed background color to less agressive color (compared to white)
		*added icons in front of each option
        v1.5.1
		*little bugfix
        v1.5.2
		*https support
	*/
		
		
		
//Create all needed variables
var playlist = document.getElementById('playlist-bar');
var classname = playlist.className.toString();
var hid = classname.search("hid");
if (typeof GM_getValue("ytautoplay") == "undefined") {
GM_setValue("ytautoplay",0);
} else {};
if (typeof GM_getValue("ytshuffleplay") == "undefined") {
GM_setValue("ytshuffleplay",0);
} else {};
if (typeof GM_getValue("yticon") == "undefined") {
GM_setValue("yticon",0);
} else {};


var url = window.location.href.toString();
var next = url.search("feature=bf_next");
var prev = url.search("feature=bf_prev");
var BFa = url.search("feature=BFa");

// function for index of video
function buttonPlaylist2tooltip () {
	buttonPlaylist2.setAttribute('data-tooltip-text',document.getElementById('playlist-bar-info').getElementsByClassName('playing-index')[0].innerHTML +" / "+ document.getElementById('playlist-bar-info').getElementsByClassName('item-count')[1].innerHTML)
	buttonPlaylist2.setAttribute('title',document.getElementById('playlist-bar-info').getElementsByClassName('playing-index')[0].innerHTML +" / "+ document.getElementById('playlist-bar-info').getElementsByClassName('item-count')[1].innerHTML)
	};
function indexcount () {
	lastItem.innerHTML = document.getElementById('playlist-bar-bar').getElementsByClassName('playing-index')[0].innerHTML +" / "+ document.getElementById('playlist-bar-info').getElementsByClassName('item-count')[1].innerHTML
	};


// Translations
var L = window.navigator.language;
L = L.substr(0,2);
if ((L!='en')&&(L!='fr')) {
var O = 1;
} else {
var O = 0;
};

var title = {en: "Playlist", fr: "Playlist"};
var show = {en: "Show Playlist", fr: "Montrer la playlist"};
var hide = {en: "Hide Playlist", fr: "Cacher la playlist"};
var previousvideo = {en: "Previous Video", fr: "Vidéo précédente"};
var nextvideo = {en: "Next Video", fr: "Vidéo suivante"};
var autoplay = {en: "Autoplay", fr: "Lecture auto."};
var shuffleplay = {en: "Shuffle Play", fr: "Lecture aléatoire"};
var icon = {en: "Show video icons", fr: "Miniatures visibles"};


// Create the button position in user info bar 
var divHEAD = document.evaluate("//div[@id='watch-headline-user-info']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
divHEAD.appendChild(document.createTextNode("\n"));

var span1 = divHEAD.appendChild(document.createElement("span"));
span1.setAttribute("dir", "ltr");
span1.className = "yt-uix-button-group watch show-label";
	
// building the buttons
var buttonPlaylist = span1.appendChild(document.createElement('button'));
if (O==0) {
	buttonPlaylist.appendChild(document.createTextNode(title[L]));
} else {
	buttonPlaylist.appendChild(document.createTextNode(title['en']));
};

var buttonPlaylist2 = span1.appendChild(document.createElement('button'));
buttonPlaylist2.className = 'end yt-uix-button yt-uix-button-default yt-uix-button-empty yt-uix-tooltip';

buttonPlaylist2.style.color = "grey";
buttonPlaylist2tooltip ();
var imgButton=buttonPlaylist2.appendChild(document.createElement('img'));
imgButton.setAttribute('class', 'yt-uix-button-arrow');
imgButton.setAttribute('src','//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
  
var listItems=buttonPlaylist2.appendChild(document.createElement('div'));
listItems.setAttribute('style', 'background-color: rgb(242, 242, 242); display: none; width: 200px');
listItems.setAttribute('class', 'yt-uix-button-menu');
  
//First item of list
var listItem1=listItems.appendChild(document.createElement('li'));
var listSpan1=listItem1.appendChild(document.createElement('span'));
listSpan1.setAttribute('class', 'yt-uix-button-menu-item');
listSpan1.setAttribute('id', 'prev');
listSpan1.setAttribute('style','font-weight: bold;');
var imgp = document.createElement("img");
imgp.setAttribute('class', 'yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev');
imgp.setAttribute('src','//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
imgp.setAttribute('style','width: 17px; padding-right: 1px');
listSpan1.appendChild(imgp)
if (O==0) {
	listSpan1.appendChild(document.createTextNode(previousvideo[L]));
} else {
	listSpan1.appendChild(document.createTextNode(previousvideo['en']));
};

//Second item of list
var listItem2=listItems.appendChild(document.createElement('li'));
var listSpan2=listItem2.appendChild(document.createElement('span'));
listSpan2.setAttribute('class', 'yt-uix-button-menu-item');
listSpan2.setAttribute('id', 'next');
listSpan2.setAttribute('style','font-weight: bold;');
var imgn = document.createElement("img");
imgn.setAttribute('class', 'yt-uix-button-icon yt-uix-button-icon-playlist-bar-next');
imgn.setAttribute('src','//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
imgn.setAttribute('style','width: 17px;  padding-right: 2px');
listSpan2.appendChild(imgn)
if (O==0) {
	listSpan2.appendChild(document.createTextNode(nextvideo[L]));
} else {
	listSpan2.appendChild(document.createTextNode(nextvideo['en']));
};


//Third item of list
var listItem3 = document.createElement("div");
var labelcheck1 = document.createElement("span");
labelcheck1.setAttribute('style','display: inline-block; width: 150px; color: rgb(101, 101, 101); font-size: 12px; font-weight: bold; margin-top: 11px; padding-left: 18px;');
if (O==0) {
	labelcheck1.appendChild(document.createTextNode(autoplay[L]));
} else {
	labelcheck1.appendChild(document.createTextNode(autoplay['en']));
};
var imga = document.createElement("img");
imga.setAttribute('class', 'yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay');
imga.setAttribute('src','//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
imga.setAttribute('style','width: 15px; float: left; padding-right: 7px;');
labelcheck1.appendChild(imga)
var checkspan1 = document.createElement("span");
checkspan1.className = "yt-uix-form-input-checkbox-container";
var checkbox1 = document.createElement("input");
checkbox1.className = "yt-uix-form-input-checkbox";
checkbox1.type = "checkbox";
var autobutton = document.getElementById('playlist-bar-autoplay-button');
var autotog = autobutton.className.toString().search("toggled")
switch (GM_getValue("ytautoplay")) {
	case 1:
		switch (autotog) {
			case -1:
				checkbox1.checked=false;
			break;
			default:
				checkbox1.checked=true;
			break;}
	break;
	default:
		switch (autotog) {
			case -1:
				checkbox1.checked=false;
			break;
			default:
				checkbox1.checked=true;
			break;}	
	break;
};
checkspan1.appendChild(checkbox1);
var checkspan12 = document.createElement("span");
checkspan12.className = "yt-uix-form-input-checkbox-element";
checkspan12.setAttribute('style','display: inline-block;');
checkspan1.appendChild(checkspan12);
listItem3.appendChild(labelcheck1);
listItem3.appendChild(checkspan1);
listItems.appendChild(listItem3);


//Fourth item of list
var listItem4 = document.createElement("div");
var labelcheck2 = document.createElement("span");
labelcheck2.setAttribute('style','display: inline-block; width: 152px; color: rgb(101, 101, 101); font-size: 12px; font-weight: bold; margin-top: 13px; padding-left: 16px;');
if (O==0) {
	labelcheck2.appendChild(document.createTextNode(shuffleplay[L]));
} else {
	labelcheck2.appendChild(document.createTextNode(shuffleplay['en']));
};
var imgs = document.createElement("img");
imgs.setAttribute('class', 'yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle');
imgs.setAttribute('src','//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
imgs.setAttribute('style','width: 24px; float: left');
labelcheck2.appendChild(imgs)
var checkspan2 = document.createElement("span");
checkspan2.className = "yt-uix-form-input-checkbox-container";
var checkbox2 = document.createElement("input");
checkbox2.className = "yt-uix-form-input-checkbox";
checkbox2.type = "checkbox";
var shufflebutton = document.getElementById('playlist-bar-shuffle-button');
var shuftog = shufflebutton.className.toString().search("toggled")
switch (GM_getValue("ytshuffleplay")) {
	case 1:
		switch (shuftog) {
			case -1:
				checkbox2.checked=false;
			break;
			default:
				checkbox2.checked=true;
			break;}
	break;
	default:
		switch (shuftog) {
			case -1:
				checkbox2.checked=false;
			break;
			default:
				checkbox2.checked=true;
			break;}	
	break;
};
checkspan2.appendChild(checkbox2);
var checkspan22 = document.createElement("span");
checkspan22.className = "yt-uix-form-input-checkbox-element";
checkspan2.appendChild(checkspan22);
listItem4.appendChild(labelcheck2);
listItem4.appendChild(checkspan2);
listItems.appendChild(listItem4);


//Fifth item of list
var listItem5 = document.createElement("div");
var labelcheck3 = document.createElement("span");
labelcheck3.setAttribute('style','display: inline-block; width: 148px; color: rgb(101, 101, 101); font-size: 12px; font-weight: bold; margin-top: 13px; padding-left: 20px;');
if (O==0) {
	labelcheck3.appendChild(document.createTextNode(icon[L]));
} else {
	labelcheck3.appendChild(document.createTextNode(icon['en']));
};
var imgt = document.createElement("img");
imgt.setAttribute('class', 'yt-uix-button-icon yt-uix-button-icon-playlist-bar-toggle');
imgt.setAttribute('src','//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
imgt.setAttribute('style','width: 17px;  float: left; padding-right: 2px');
labelcheck3.appendChild(imgt)
var checkspan3 = document.createElement("span");
checkspan3.className = "yt-uix-form-input-checkbox-container";
var checkbox3 = document.createElement("input");
checkbox3.className = "yt-uix-form-input-checkbox";
checkbox3.type = "checkbox";
var max = classname.search("max");
switch (GM_getValue("yticon")) {
	case 1:
		switch (max) {
			case -1:
				checkbox3.checked=false;
			break;
			default:
				checkbox3.checked=true;
			break;}
	break;
	default:
		switch (max) {
			case -1:
				checkbox3.checked=false;
			break;
			default:
				checkbox3.checked=true;
			break;}	
	break;
};
checkspan3.appendChild(checkbox3);
var checkspan33 = document.createElement("span");
checkspan33.className = "yt-uix-form-input-checkbox-element";
checkspan3.appendChild(checkspan33);
listItem5.appendChild(labelcheck3);
listItem5.appendChild(checkspan3);
listItems.appendChild(listItem5);


//Last item of list
var lastItemdiv=listItems.appendChild(document.createElement('div'));
lastItemdiv.style.align='center';
var lastItem=lastItemdiv.appendChild(document.createElement('span'));
lastItem.setAttribute('style','display: block; text-align: center; color: rgb(101, 101, 101); font-size: 11px; margin-top: 7px;');
lastItem.appendChild(document.createTextNode(document.getElementById('playlist-bar-bar').getElementsByClassName('playing-index')[0].innerHTML +" / "+ document.getElementById('playlist-bar-info').getElementsByClassName('item-count')[1].innerHTML));

// all functions for playlist bar switching and button animation
function keepplaylistbar () {
	playlist.className=playlist.className.toString();				
	buttonPlaylist.className = 'start yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-toggled';
	if (O==0) {
		buttonPlaylist.setAttribute('data-tooltip-text', hide[L]);
		buttonPlaylist.setAttribute('title', hide[L]);
	} else {
		buttonPlaylist.setAttribute('data-tooltip-text', hide['en']);
		buttonPlaylist.setAttribute('title', hide['en']);
	};
	buttonPlaylist.style.color = "#C8311B";
	};
function showplaylistbar () {
	if (O==0) {
		buttonPlaylist.setAttribute('data-tooltip-text', hide[L]);
		buttonPlaylist.setAttribute('title', hide[L]);
	} else {
		buttonPlaylist.setAttribute('data-tooltip-text', hide['en']);
		buttonPlaylist.setAttribute('title', hide['en']);
	};
	buttonPlaylist.style.color = "#C8311B";
	buttonPlaylist.className = 'yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-toggled';
	playlist.className=playlist.className.toString().replace(' hid','');
};
function hideplaylistbar () {
	playlist.className=playlist.className.toString() + " hid";
	buttonPlaylist.className = 'start yt-uix-button yt-uix-button-default yt-uix-tooltip';
	if (O==0) {
		buttonPlaylist.setAttribute('data-tooltip-text', show[L]);
		buttonPlaylist.setAttribute('title', show[L]);
	} else {
		buttonPlaylist.setAttribute('data-tooltip-text', show['en']);
		buttonPlaylist.setAttribute('title', show['en']);
	};
buttonPlaylist.style.color = "grey";
};
function mouseoverhidden () {
	buttonPlaylist.onmouseover=function () {buttonPlaylist.style.color = "#C8311B"};
	buttonPlaylist.onmouseout=function () {buttonPlaylist.style.color = "grey"};
};
function mouseovershown () {
	buttonPlaylist.onmouseover=function () {buttonPlaylist.style.color = "#C8311B"};
	buttonPlaylist.onmouseout=function () {buttonPlaylist.style.color = "#C8311B"};
};
function clicknext () {
	try
		{//for ie
			document.getElementById('playlist-bar-next-button').click();
		}catch(e)
		{//for ff
			var evt = document.createEvent("MouseEvents"); 
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
			var cb = document.getElementById('playlist-bar-next-button'); 
			cb.dispatchEvent(evt);  
		}
};
function clickprev () {
	try
		{//for ie
			document.getElementById('playlist-bar-prev-button').click();
		}catch(e)
		{//for ff
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var cb = document.getElementById('playlist-bar-prev-button');
			cb.dispatchEvent(evt);
		}
};			


// find if playlist bar must be shown or not
  switch (next) {
		
		case -1:
			switch (prev) {
		
				case -1:
					switch (BFa) {
		
						case -1:
							hideplaylistbar ();
						break;
						default:
							keepplaylistbar ();
						break;
						}		
		
				break;
				default:
					switch (GM_getValue("a")) {
						case 2:
							hideplaylistbar ();
							GM_deleteValue("a");
						break;
						default:
							keepplaylistbar ();
							GM_deleteValue("a");
						break;
					}
					
				break;
				}			

		break;
		default:
			switch (GM_getValue("a")) {
						case 2:
							hideplaylistbar ();
							GM_deleteValue("a");
						break;
						default:
							keepplaylistbar ();
							GM_deleteValue("a");
						break;
					}
		break;
		}
	
//Mouseover function
playlist = document.getElementById('playlist-bar');
classname = playlist.className.toString();
hid = classname.search("hid");
switch (hid) {		
	case -1:
		mouseovershown ();
	break;
	default:
		mouseoverhidden ();
	break;
}
		
// Switch between shown and hidden playlist bar
buttonPlaylist.addEventListener('click', function () {
		
	playlist = document.getElementById('playlist-bar');
	classname = playlist.className.toString()
	hid = classname.search("hid")
		
	switch (hid) {
		
		case -1:
			hideplaylistbar ();
			mouseoverhidden ();
		break;
		default:
			showplaylistbar ();
			mouseovershown ();
		break;
		}
		
	

}, true);
	
// Event listeners for Control menu in arrow button
listItem1.addEventListener('click',function () {
	var playlist = document.getElementById('playlist-bar');
	var classname = playlist.className.toString()
	var hid = classname.search("hid")
	switch (hid) {		
		case -1:
			GM_setValue("a",1)
			clickprev ()
		break;
		default:
			GM_setValue("a",2)
			clickprev ()
		break;
		}
 }, true);
listItem2.addEventListener('click',function () {
	var playlist = document.getElementById('playlist-bar');
	var classname = playlist.className.toString()
	var hid = classname.search("hid")
	switch (hid) {		
		case -1:
			GM_setValue("a",1)
			clicknext ()
		break;
		default:
			GM_setValue("a",2)
			clicknext ()
		break;
		}
   
 }, true);
 
//functions for checkboxes
function clickautoplay () {
	try
		{//for ie
			document.getElementById('playlist-bar-autoplay-button').click();
		}catch(e)
		{//for ff
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var cb = document.getElementById('playlist-bar-autoplay-button');
			cb.dispatchEvent(evt);
		}
};			
function clickshuffle () {
	try
		{//for ie
			document.getElementById('playlist-bar-shuffle-button').click();
		}catch(e)
		{//for ff
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var cb = document.getElementById('playlist-bar-shuffle-button');
			cb.dispatchEvent(evt);
		}
	buttonPlaylist2tooltip ();
	indexcount ();		
};		
function clickicon () {
	try
		{//for ie
			document.getElementById('playlist-bar-toggle-button').click();
		}catch(e)
		{//for ff
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var cb = document.getElementById('playlist-bar-toggle-button');
			cb.dispatchEvent(evt);
		}
};		

checkbox1.addEventListener('click',function () {
	var autobutton = document.getElementById('playlist-bar-autoplay-button');
	var autotog = autobutton.className.toString().search("toggled")

	if (checkbox1.checked==true) {
		switch (autotog) {
			case -1:
				GM_setValue("ytautoplay",1);
				clickautoplay();
			break;
			default:
				GM_setValue("ytautoplay",1);
			break;}
	} else {
		switch (autotog) {
			case -1:
				GM_setValue("ytautoplay",0);
			break;
			default:
				GM_setValue("ytautoplay",0);
				clickautoplay();
			break;}
	}
},true) ;

checkbox2.addEventListener('click',function () {
	var shufflebutton = document.getElementById('playlist-bar-shuffle-button');
	var shuftog = shufflebutton.className.toString().search("toggled")
	if (checkbox2.checked==true) {
		switch (shuftog) {
			case -1:
				GM_setValue("ytshuffleplay",1);
				clickshuffle();
			break;
			default:
				GM_setValue("ytshuffleplay",1);
			break;};
	} else {
		switch (shuftog) {
			case -1:
				GM_setValue("ytshuffleplay",0);
			break;
			default:
				GM_setValue("ytshuffleplay",0);
				clickshuffle();
			break;}
	}
},true) ;

checkbox3.addEventListener('click',function () {
	var showicons = classname.search("max");
	if (checkbox3.checked==true) {
		switch (buttonPlaylist.className.toString().search("toggled")) {
			case -1:
				GM_setValue("yticon",1);
				clickicon();
				hideplaylistbar();
			break;
			default:
				GM_setValue("yticon",1);
				clickicon();
				showplaylistbar();
			}
	} else {
		switch (buttonPlaylist.className.toString().search("toggled")) {
			case -1:
				GM_setValue("yticon",0);
				clickicon();	
				hideplaylistbar();
			break;
			default:
				GM_setValue("yticon",0);
				clickicon();	
				showplaylistbar();
			}
	}
},true) ;



