// DeliciousToBlog
// v0.1
// Copyright (c) 2005, Wayne Burkett 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// This is a Greasemonkey user script. 
// Greasemonkey version 0.3 or later required.
// http://greasemonkey.mozdev.org/

// This script adds a "post to weblog" checkbox to the del.icio.us
// posting interface. You'll be asked to enter your blog's metaWeblog
// API information the next time you add a post to del.icio.us.
// Your blog's password is stored (and sent over the wire) as plain 
// text and is visible via about:config.

// ==UserScript==
// @name          DeliciousToBlog
// @namespace     http://dionidium.com/projects/greasemonkey/
// @description   Post to a weblog using the del.icio.us interface and the metaWeblog API
// @include       http://del.icio.us*
// ==/UserScript==

function submitForm(e) {
    var metaWeblog; 
    var form = e.target;
    if (!form.toblog.checked) { return; }
    metaWeblog = configuration();
    metaWeblog.data = metaWeblogContent(metaWeblog, form);
    GM_xmlhttpRequest({
        method: 'POST',
    	url: metaWeblog.url,
        data: metaWeblog.data,
    	headers: { 
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey (DeliciousToBlog/0.1)',
	    'Content-type': 'text/xml; charset=utf-8'
	},
	onload: function(responseDetails) {
   	    var xml = responseDetails.responseText;
   	    var dom = (new DOMParser()).parseFromString(xml, 'application/xml').documentElement;
	    // alert the user if the metaWeblog API returns an error
	    if (dom.firstChild.tagName == 'fault') {
	        var error = dom.getElementsByTagName('string')[0]; 
		alert("Couldn't post to weblog: " + error.textContent);
	    }
	}, 
    	onerror: function(responseDetails) {
	    alert("Couldn't post to weblog: " + responseDetails.status + " " + responseDetails.statusText);
    	}
    });
}

function metaWeblogContent(metaWeblog, form) {
    return '<?xml version="1.0"?>' +
'<methodCall>' +
    '<methodName>metaWeblog.newPost</methodName>' +
    '<params>' +
	'<param><value><string>' + metaWeblog.blogid +' </string></value></param>' +
	'<param><value><string>' + metaWeblog.username +' </string></value></param>' +
	'<param><value><string>' + metaWeblog.password +' </string></value></param>' +
	'<param><value>' +
	    '<struct>' +
	        '<member><name>title</name><value><string>' + 
		    encodeXml(form.description.value) + 
		'</string></value></member>' +
		'<member><name>description</name><value><string>' + 
		    metaWeblogDescription(metaWeblog, form) + 
		'</string></value></member>' +
	    '</struct>' +
	'</value></param>' +
	'<param><value><boolean>' + metaWeblog.publish + '</boolean></value></param>' +
    '</params>' +
'</methodCall>'; 
}

function metaWeblogDescription(metaWeblog, form) {
    var body, entryTags, i, tag;
    body = '<p class="dtb_title"><a href="' + form.url.value + '">' + form.description.value + '</a></p>'; 
    if (form.extended.value !== '') {
        body += '<p class="dtb_body">' + form.extended.value + '</p>';
    }
    entryTags = new Array();
    entryTags = form.tags.value.split(/\s+/);
    if (entryTags[0] !== '') {
        body += '<ul class="dtb_tags">';
        for (i = 0; i < entryTags.length; i += 1) {
	    tag = entryTags[i];
            body += '<li><a href="http://del.icio.us/' + metaWeblog.delUsername + '/' + tag + '">' + tag + '</a></li>';
        }
	body += '</ul>';
    }
    body = encodeXml(body);
    return body;
}
        
function configuration() {
    var i, key, value;
    var configValues = {};
    // metaWeblog API settings
    for (i = 0; (key = ['url', 'username', 'password', 'blogid', 'publish', 'delUsername'][i]); i += 1) {
	value = GM_getValue(key, 'DNE');
	if (value == 'DNE') {
	    if (key == 'delUsername') { value = prompt('del.icio.us username', ''); } 
            else { value = prompt('metaWeblog API ' + key, ''); }
            GM_setValue(key, value);
        }
	configValues[key] = value;
    }
    return configValues;
}

function encodeXml(field) {
    // http://www.intertwingly.net/blog/2005/03/03/Ampersands-are-Insidious#c1109866718
    var replaced = field.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w{1,8});)/g, '&#38;');
    replaced = replaced.replace(/</g, '&#60;');
    replaced = replaced.replace(/>/g, '&#62;');
    return replaced;
}

var xpath, node, button; 
var checkbox, nextcell, postmsg;
xpath = '//input[contains(@value, "save")]';
node = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if (!(button = node.singleNodeValue)) { return; }

// prompt user for settings, if necessary
configuration();  
window.addEventListener('submit', submitForm, true);

checkbox = document.createElement("input");
checkbox.setAttribute("type", "checkbox");
checkbox.setAttribute("id", "toblog");

// use the "save" button as a reference point
nextcell = button.parentNode.nextSibling.nextSibling;
postmsg = document.createTextNode("post to weblog");
nextcell.insertBefore(postmsg, nextcell.firstChild);
nextcell.insertBefore(checkbox, postmsg);

// 2005-05-30 - 0.1 - released
