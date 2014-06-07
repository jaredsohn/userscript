// ==UserScript==
// @name           MusicBrainz Subscriptions (Opera compatible)
// @description    Highlight the artists or labels for which you are subscribed, changes the "Subscribe" link to "Unsubscribe" and  appends a "View subscriptions" link right away, to avoid page jump (Opera compatibility fork version).
// @version        2010-07-29_1713
// @author         Aurelien Mino (http://userscripts.org/scripts/show/8266 2008-06-18_01) & contributions by jesus2099 (Opera OK + avoid page jump)
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http://musicbrainz.org/artist/*
// @include        http://musicbrainz.org/show/artist/*
// @include        http://musicbrainz.org/release-group/*
// @include        http://musicbrainz.org/show/release-group/*
// @include        http://musicbrainz.org/release/*
// @include        http://musicbrainz.org/show/release/*
// @exclude        http://musicbrainz.org/show/release/relationships.html*
// @include        http://musicbrainz.org/album/*
// @include        http://musicbrainz.org/show/album/*
// @include        http://musicbrainz.org/label/*
// @include        http://musicbrainz.org/show/label/*

// ==/UserScript==

(function () {

// Get subscriptionType (label or artist)
var subscriptionType = undefined;
if (window.location.href.match(/artist/) || window.location.href.match(/release/) || window.location.href.match(/album/) || window.location.href.match(/release-group/)) {
	subscriptionType = 'artist';
} else if (window.location.href.match(/label/)) {
	subscriptionType = 'label';
}

// Get editor name
var editorName = getEditorName();

// Load subscriptions page
if (subscriptionType && editorName) {
	var url = 'http://' + window.location.host + '/show/' + subscriptionType + '/subscriptions.html?' + subscriptionType + '=' + getEntityId(subscriptionType);
	/*display "view subscriptions" link right away to avoid page jump*/
	subscriptionsLink();

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = xmlhttpChange;
	xmlhttp.open("GET", url, true);
	xmlhttp.overrideMimeType('text/xml');
	xmlhttp.send(null);
}

// Analyze XmlHttp response
function xmlhttpChange() {

	// create XMLDOM object if xmlhttp shows "loaded"
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
	{
	
		var xmldoc = xmlhttp.responseXML;

        var xpathExpr = "count(//xhtml:td[@id='content-td']//xhtml:a[contains(text(), '" + editorName + "')])>0";
		var isSubscribed = xmldoc.evaluate(xpathExpr, xmldoc, NSResolver, XPathResult.BOOLEAN_TYPE, null).booleanValue;
	
		if(isSubscribed) {
			subscriptionDecorator();
		}
	}		
}

// Function which does page change if the editor is subscribed
function subscriptionDecorator() {
	// Highlight label/artist name
	var artistTitle = getElementsByClassName(document, 'td', 'title')[0].getElementsByTagName('a')[0];
	artistTitle.style.borderBottom = "red dotted 2px";
	
	// Change 'Subscribe' to 'Unsubscribe'
	var artistbox = getElementsByClassName(document, "td", (subscriptionType == "artist" ? "editlinks": "links"))[0];
	var subscribeLink = artistbox.getElementsByTagName("a")[2];
	subscribeLink.href += '&unsubscribe=1';
	subscribeLink.replaceChild(document.createTextNode('Unsubscribe'), subscribeLink.firstChild);
}

// Function which adds the Subscriptions link
function subscriptionsLink(subscribeLink) {
	// If subscribeLink is null or not provided, redefine it (the expresssion refers to the definition of artistbox & subscribeLink in function subscriptionDecorator())
	var subscribeLink = (subscribeLink == null) ? getElementsByClassName(document, "td", (subscriptionType == "artist" ? "editlinks": "links"))[0].getElementsByTagName("a")[2] : subscribeLink;
	
	var newlink = document.createElement("a");
	newlink.href = url;
	newlink.appendChild(document.createTextNode("View subscriptions"));
	
	var fragment= document.createDocumentFragment();
	fragment.appendChild(document.createTextNode(" ("));
	fragment.appendChild(newlink);
	fragment.appendChild(document.createTextNode(") "));
	
	subscribeLink.parentNode.insertBefore(fragment, subscribeLink.nextSibling);
}

// Obtain the connected editor name
function getEditorName() {
	var link = document.getElementById('sidebar-td').getElementsByTagName('div')[3].getElementsByTagName('a')[0];
	var username = link.firstChild.nodeValue;
	return username;
}

// Obtain the artistId of the current page
function getEntityId(subscriptionType) {
	var artistbox = getElementsByClassName(document, "td", "links")[0];
	var link = artistbox.getElementsByTagName("a")[1];
	var re = new RegExp('details.html\\?' + subscriptionType + 'id=(.+)');
	var entity_id = re.exec(link.href)[1];
	return entity_id;
}

// Helper function for getting html element by class name
// Written by Jonathan Snook, http://www.snook.ca/jonathan
// Add-ons by Robert Nyman, http://www.robertnyman.com
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


// Helper function needed for resolving namespaces in xpath expression
function NSResolver(prefix) {
  var ns = {
    'xhtml' : 'http://www.w3.org/1999/xhtml'
  };
  return ns[prefix] || null;
}

})();