// ==UserScript==
// @name           Facebook Newspaper Cleaner
// @namespace      Elmore.Facebook.Newspaper
// @description    Lets me click on links to newspapers without having their apps
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==


// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
// parseUri 1.2.2





// returns the independent's article url if one is found or an empty string if not
function getRedirectUrl(fbUrl) { 
	var uri  = parseUri(fbUrl);
	return uri["queryKey"]["redirect_uri"] == null ? "" : uri["queryKey"]["redirect_uri"];
}

// updates the link to the article to be just a plain old regular link
function updateLink(anchor) {
	var urlInPaper = getRedirectUrl(anchor.href);
	
	if(urlInPaper != '') {
		anchor.href = unescape(urlInPaper);
		anchor.removeAttribute('rel');
		anchor.setAttribute('target', '_blank');
		anchor.click = function (e) { e.stopPropagation(); };
		anchor.mousedown = function (e) { e.stopPropagation(); };
		anchor.mouseup = function (e) { e.stopPropagation(); };
	}
}



// main
try
{
	var as = document.getElementsByTagName('a');
	for (i=0; i<as.length; i++)
	{
		updateLink(as[i]);
	}
}
catch (ex)
{
	var message = 'Oops - something unexpected went wrong you guys!! This is what the browser said : ' + ex;
	alert(message)
}

