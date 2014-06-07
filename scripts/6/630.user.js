//
// This is a Greasemonkey user script for the Joel on Software
// forums. It lets you create a a "kill file" that will automatically
// remove posts of idiotic users you name.
//
// It also provides a link that lets you jump to the bottom of a thread
// so you can see the latest posts without scrolling and it provides a
// convenient link to the Off Topic forum.
// 
// Greasemonkey is a Firefox only extension, this will not work if
// you use IE.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Idiot-B-Gone", and click Uninstall.
//
// Written by Damien Katz and placed into the public domain.
//
// ==UserScript==
// @name           Idiot-B-Gone
// @namespace      http://discuss.joelonsoftware.com
// @description    Removes named idiots from discussions on JOS, plus other enhancements. v0.8
// @include        http://discuss.joelonsoftware.com*
// ==/UserScript==

(function() {

function ibg_setCookie(name, value, expireDays, path, domain, secure)
{
	var UTCstring;
	if (expireDays) {
		Today = new Date();
		nomilli=Date.parse(Today);
		Today.setTime(nomilli+expireDays*24*60*60*1000);
		UTCstring = Today.toUTCString();
	}
	
	document.cookie= name + "=" + escape(value) +
		((UTCstring) ? "; expires=" + UTCstring : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}

function ibg_getCookie(name)
{
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1)
	{
		begin = dc.indexOf(prefix);
		if (begin != 0) return "";
	}
	else
	{
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
	{
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

window.ibg_postsRemoved = 0;

var d = document.getElementById('formnewcase');
try {
	if (ibg_getCookie('JOSIdiotsDisabled') == "") {
		var idiotsArray = ibg_getCookie("JOSIdiots").split('\n');

		if (d != null && idiotsArray != null) {
			d = d.nextSibling.nextSibling;
			var nodes = d.childNodes;
			for (var i = nodes.length-1; i>=0; i--) {
				try {
					var kids = nodes[i].childNodes;
					for (var j=0; j < kids.length;  j++) {
						var kid = kids[j];
						if (kid.className == 'discussSign') {
							for (var k=0; k < idiotsArray.length; k++) {
								if (idiotsArray[k] != "" && kid.textContent.search(idiotsArray[k]) == 0) {
									window.ibg_postsRemoved++;
									d.removeChild(nodes[i]);
								}
							}
						}
					}
				} catch (e) {}
			}
		}
	}
} catch (e) {}

function ibg_disableToggle()
{
	var ibgDisable = document.getElementById("ibgDisable");
	
	if (ibgDisable.checked) {
		ibg_setCookie('JOSIdiotsDisabled', "1", 1000);
	}
	else {	
		ibg_setCookie('JOSIdiotsDisabled', "", 1000);
	}
	
	ibg_setCookie('JOSIdiotsTempExpand', "1");
	
	location.reload();
}

function ibg_collapse()
{	
	try {
		var ibg = document.getElementById("ibg");
		
		var newBody = "";
		newBody += '<a href="javascript:ibg_expand();"  style="text-decoration: none;padding-left: 15px;">(+) JOS Idiot-B-Gone<i>';
		if (ibg_getCookie('JOSIdiotsDisabled') == "") {
			newBody += ": " + window.ibg_postsRemoved + " idiotic post(s) removed";
		}
		else {
			newBody += ": disabled";
		}
		newBody += '</i></a><br /><br />';
		
		ibg.innerHTML = newBody;
	}
	catch (e) {
		alert(e);
	}
}

function ibg_expand()
{
	try {
		var ibg = document.getElementById("ibg");
		
		var disabledCheckedAttribute = "";
		
		if (ibg_getCookie('JOSIdiotsDisabled') != "") {
			disabledCheckedAttribute = "CHECKED";
		}
		
		var newBody = "";
		newBody += '<a href="javascript:ibg_collapse();"  style="text-decoration: none;padding-left: 15px;">(-) JOS Idiot-B-Gone</a>';
		newBody += '<form style="padding-left: 30px;">';
		newBody += "<br /><i>" + window.ibg_postsRemoved + " idiotic post(s) removed</i><br />";
		newBody += '<br />Enter each idiot you wish to b-gone on a separate line:<br />';
		newBody += '<textarea name="idiots" rows="5" cols="40">';
		newBody += ibg_getCookie("JOSIdiots");
		newBody += '</textarea><br />';
		newBody += '<input type="button" value="Update My Idiots List" OnClick="javascript:ibg_setCookie(\'JOSIdiots\',this.form.idiots.value, 1000);location.reload();" /> <input type="checkbox" id="ibgDisable" OnClick="javascript:ibg_disableToggle()" ' + disabledCheckedAttribute +  '>Disable<br />';
		newBody += "<br />";
		newBody += '</form>';
		
		ibg.innerHTML = newBody;
		window.location = "#ibg";
	}
	catch (e) {
		alert(e);
	}
	
}

function ibg_onload() {
	if (old_onload != null) {
		old_onload();
	}
	
	var newBody = "";
	newBody += '<div id="ibg">';
	newBody += '</div>';

	var newDiv = document.createElement('d');
	newDiv.innerHTML = newBody;
	document.body.appendChild(newDiv);
	
	
	if (ibg_getCookie("JOSIdiotsTempExpand") == "") {
		ibg_collapse();
	}
	else {
		ibg_expand();
		ibg_setCookie('JOSIdiotsTempExpand', "");
	}
	try {
		var links = document.getElementsByTagName('a');
		
		for (i=0; i<links.length; i++) {
			if (links[i].href == "http://discuss.joelonsoftware.com/?biz") {
				
				var newLink = document.createElement('a');
				newLink.href = "http://discuss.joelonsoftware.com/default.asp?off";
				newLink.innerHTML = "Off Topic";
				links[i].parentNode.insertBefore(newLink, links[i]);
				
				var newBr = document.createElement('br');
				links[i].parentNode.insertBefore(newBr, links[i+1]);
				break;
			}
		} 
	}
	catch (e) {
		alert(e);
	}
	
	var foo = document.getElementById("mainArea").firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.nextSibling;
	var newDiv = document.createElement('d');
	newDiv.innerHTML = "<div align='right'><a href='#ibg'>Bottom of Page</a></div>";
	foo.appendChild(newDiv);
}
var old_onload = window.onload;
window.onload = ibg_onload;
window.ibg_setCookie = ibg_setCookie;
window.ibg_getCookie = ibg_getCookie;
window.ibg_expand = ibg_expand;
window.ibg_collapse = ibg_collapse;
window.ibg_disableToggle = ibg_disableToggle;
})();

