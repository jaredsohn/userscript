// ==UserScript==
// @name			Smart Next Link Button
// @author			shaldengeki
// @namespace		shaldengeki
// @description		Adds a Next Link button to the links page pointing to the next non-deleted link.
// @include			http://links.endoftheinter.net/linkme.php?l=*
// @include			https://links.endoftheinter.net/linkme.php?l=*
// ==/UserScript==
function getUrlVars(urlz)
{
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	 
	return vars;
}

function goNext() {
	//if we're on the 'next links' page, then redirect to the next page.
	arguments=goNext.arguments;
	if (arguments.length < 1) {
		return;
	}
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://links.endoftheinter.net/linkme.php?l=' + (parseInt(arguments[0])+1), 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Next Links Script',
		},
		onload: function(response) {
			var linkid=response.finalUrl.slice(response.finalUrl.indexOf('linkme.php?l=')+13, response.finalUrl.length);
			var linkstart = response.responseText.slice(response.responseText.indexOf('<h2>')+4, response.responseText.indexOf('</h2>'))
			if (linkstart.match(/deleted/i)) {
				//grab the next link and start anew.
				goNext(parseInt(linkid));
			} else {
				window.location="http://links.endoftheinter.net/linkme.php?l=" + (parseInt(linkid));
			}
		}
	});
}
var get=getUrlVars(window.location.href);
var linkstart = document.getElementsByTagName("h1")[0];
var nextlink=document.createElement("span");
nextlink.style.cssFloat="right";
nextlink.style.display="inline";
nextlink.style.fontSize="18pt";
nextlink.addEventListener("click", function() { goNext(get['l']) }, true);
nextlink.innerHTML="<a href=''>Next Link</a>";
linkstart.parentNode.insertBefore(nextlink,linkstart);