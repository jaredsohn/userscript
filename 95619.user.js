// ==UserScript==
// @name           MusicBrainz plain text tracklist - EAC optimized
// @description    musicbrainz.org : Get a quick copy of the track list in plain text for quick re-use (in track parser, foobar2000 or mp3tag for instance)
// @version        2011-01-29_1505
// @author         Tecfan's configuration of Tristan "jesus2099" DANIEL (http://miaou.ions.fr)'s script
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http://musicbrainz.org/release/*
// @include        http://musicbrainz.org/show/release/*
// @include        http://musicbrainz.org/album/*
// @include        http://musicbrainz.org/show/album/*
// ==/UserScript==

(function () {

/* - --- - --- - --- - START OF CONFIGURATION - --- - --- - --- - 
pattern		: tweak the result tracklist using \\n for new lines
vapattern	: same for Various Arists tracklists
linktext	: bla bla bla proutor
colour		: just put "" for standard stylings
background	: 
border		: 
padding		: bla bla proutor */
var pattern = "%title%\\n";
var vapattern = "%artist% / %title%\\n";
var linktext = "\u00A0Text tracklist\u00a0";
var colour = "black";
var background = "#ff6";
var border = "";
var padding = "";
/* - --- - --- - --- - END OF CONFIGURATION - --- - --- - --- - */
var debugging = false;

var replaces = [
    [/%artist%/g, "artist"],
    [/%length%/g, "length"],
    [/%title%/g, "title"],
    [/%tracknumber%/g, "tracknumber"],
]
var tracklist = "";
var tracksHtml = getElementsByClassName(document, "tr", "track");
for (var i=0 ; i < tracksHtml.length ; i++) {
	var tracknumber = getElementsByClassName(tracksHtml[i], "td", "no")[0].firstChild.nodeValue;
	var artist = false;
	var title = false;
	var vatitle = getElementsByClassName(tracksHtml[i], "td", "title va");
	if (vatitle.length > 0) {
		title = vatitle[0].getElementsByTagName("a")[0].firstChild.nodeValue;
		artist = getElementsByClassName(tracksHtml[i], "td", "artist")[0].getElementsByTagName("a")[0].firstChild.nodeValue;
		pattern = vapattern;
	} else {
		title = getElementsByClassName(tracksHtml[i], "td", "title")[0].getElementsByTagName("a")[0].firstChild.nodeValue;
	}
	var length = getElementsByClassName(tracksHtml[i], "td", "length")[0].firstChild.nodeValue.replace(/[^0-9:]/, "");

	debug(tracknumber+". "+artist+" - "+title+" ("+length+")");
	
	var txt = pattern;
	for (var j=0; j < replaces.length; j++) {
		txt = txt.replace(replaces[j][0], eval(replaces[j][1]));
	}
	tracklist += txt.replace(" (?:??)", "");

}

tracklist = tracklist.replace(/\"/g, "\\\"");
debug(tracklist);

var fragment= document.createDocumentFragment();
var a = document.createElement("a");
a.setAttribute("href", "javascript:void(alert(\""+tracklist+"\"));");
a.style.color = colour;
a.style.background = background;
a.style.border = border;
a.style.padding = padding;
a.appendChild(document.createTextNode(linktext));
fragment.appendChild(a);
fragment.appendChild(document.createTextNode(" | "));

var relinfo = getElementsByClassName(getElementsByClassName(document, "table", "releaselinks")[0], "td", "info")[0];
relinfo.insertBefore(fragment, relinfo.getElementsByTagName("a")[0]);


/*	Helper function for getting html element by class name
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com */
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements);
}

function error(hehe) {
	var errtxt = "89036: ## NUCLEAR ERROR ##\n" + hehe;
	try {
		opera.postError(errtxt);
	} catch(e) {/*alert(errtxt);*/}
}

function debug(coucou) {
	if (debugging) {
		var dbgtxt = "89036: " + coucou;
		try { opera.postError(dbgtxt);
		} catch(e) {alert(dbgtxt);}
	}
}

})();