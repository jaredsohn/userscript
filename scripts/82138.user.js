// ==UserScript==
// @name           Show hidden track relationships
// @description    musicbrainz.org : Quickly reveal hidden Advanced Relationships for release and each track in release page in place of the "View all relationships …" links.
// @version        2010-09-13_1934
// @author         Tristan "jesus2099" DANIEL (http://j2.ions.fr)
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http://musicbrainz.org/release/*
// @include        http://musicbrainz.org/show/release/*
// @include        http://musicbrainz.org/album/*
// @include        http://musicbrainz.org/show/album/*
// ==/UserScript==

(function () {

/* - --- - --- - --- - START OF CONFIGURATION - --- - --- - --- - 
expandReleaseRels : adds "remove" and "edit" tool links for each releationship
expandTrackRels   : adds "remove" and "edit" tool links for each track releationship */
var expandReleaseRels = true;
var expandTrackRels = false;
/* - --- - --- - --- - END OF CONFIGURATION - --- - --- - --- - */
var debugging = false;

var rb = getElementsByClassName(document, "div", "RelationshipBox")[0];
var relrel = rb.getElementsByTagName("table");

if (relrel.length > 0) {
	relrel = relrel[0];
	var td = relrel.getElementsByTagName("td");
	td = td[td.length-1];
	var relrelsNotShown = td.firstChild.textContent.match("^([0-9]+) relationships? not shown.+");
	if( td.getAttribute("colspan") && relrelsNotShown ) {
		debug("Retrieving "+relrelsNotShown[1]+" hidden relationship"+(relrelsNotShown[1]>1?"s":"")+" for release \""+rb.getElementsByTagName("a")[0].firstChild.textContent+"\"");
		td.replaceChild(loading(), td.firstChild);
		relrel.parentNode.style.opacity = ".5";
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var res = this.responseText;
				if (res.match("Your requests are exceeding the allowable rate limit")) {
					error("Encountered a problem while retrieving relationships\n\n"+res);
				} else {
					/*VERY UGLEY CODE HEER*/relrel.innerHTML = res.match("\<table width=\"100%\"\>(.*)\<\/table\>")[1];
				}
				relrel.parentNode.style.opacity = "";
			}
		};
		xhr.open("GET", td.getElementsByTagName("a")[0].getAttribute("href")+(expandReleaseRels?"&amp;expanded=1":""), true);
		xhr.send(null);
	}
}

var tracksHtml = getElementsByClassName(document, "tr", "track");
for (var i=0 ; i < tracksHtml.length ; i++) {
	
	var relationships = getElementsByClassName(tracksHtml[i], "table", "relationships");
	if (relationships.length > 0) {
		relationships = relationships[0];
		var td = relationships.getElementsByTagName("td");
		td = td[td.length-1];
		var relsNotShown = td.firstChild.textContent.match("^([0-9]+) relationships? not shown.+");
		if( td.getAttribute("colspan") && relsNotShown ) {
			debug("Retrieving "+relsNotShown[1]+" hidden relationship"+(relsNotShown[1]>1?"s":"")+" for track #"+(i+1)+" \""+tracksHtml[i].getElementsByTagName("a")[0].firstChild.textContent+"\"");
			td.replaceChild(loading(), td.firstChild);
			td.parentNode.parentNode.parentNode.parentNode.style.opacity = ".5";
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var res = this.responseText;
					if (res.match("Your requests are exceeding the allowable rate limit")) {
						error("Encountered a problem while retrieving relationships\n\n"+res);
					} else {
						var trackno = res.match("This track appears as \<strong\>track number ([0-9]+)\<\/strong\> on this release")[1];
						var relsBag = getElementsByClassName(getElementsByClassName(document, "tr", "track")[trackno-1], "table", "relationships")[0].getElementsByTagName("tbody")[0];
						/*VERY UGLEY CODE HEER*/relsBag.innerHTML = res.match("\<table width=\"100%\"\>(.*)\<\/table\>")[1];
						var rels = relsBag.getElementsByTagName("tr");
						for (var i=0; i < rels.length; i++) {
							rels[i].removeChild(rels[i].firstChild);
						}
						relsBag.parentNode.parentNode.style.opacity = "";
					}
				}
			};
			xhr.open("GET", td.getElementsByTagName("a")[0].getAttribute("href")+(expandTrackRels?"&amp;expanded=1":""), true);
			xhr.send(null);
		}
	}
	
}

function loading() {
	var frag = document.createDocumentFragment();
	var span = document.createElement("span");
	span.style.background = "yellow";
	span.appendChild(document.createTextNode("\u231B\u00A0loading\u2026"));
	frag.appendChild(span);
	frag.appendChild(document.createTextNode(" "));
	return frag;
}

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
	var errtxt = "82138: ## NUCLEAR ERROR ##\n" + hehe;
	try {
		opera.postError(errtxt);
	} catch(e) {/*alert(errtxt);*/}
}

function debug(coucou) {
	if (debugging) {
		var dbgtxt = "82138: " + coucou;
		try { opera.postError(dbgtxt);
		} catch(e) {alert(dbgtxt);}
	}
}

})();