// ==UserScript==
// @name           proboards-block-user
// @namespace      http://userscripts.org/users/133663
// @description    Add "block user" to proboards.com forums
// @include        http://*.proboards*.com/*
// @version        0.10
// ==/UserScript==

var forum = /http:\/\/([^\/]+)\.proboards\d*\.com.*/.exec(window.location.href)[1];
var blocklist = GM_getValue('proboards-block-user-'+forum+'-blocklist', false);
if (!blocklist)
{
	blocklist = ';';
	GM_setValue('proboards-block-user-'+forum+'-blocklist', blocklist);
}
getElementsByAttribute(document,'td','class','menubg')[0].innerHTML = getElementsByAttribute(document,'td','class','menubg')[0].innerHTML + '&nbsp<span style="color: ff0000;font-weight: bold" onmouseover="this.style.textDecoration=\'underline overline\'" onmouseout="this.style.textDecoration=\'\'" onclick="blockclr();">[reset blocklist]</span>';
magick(true);

function magick (first)
{
	var posts = getElementsByAttribute(document,'tr','class','tr_post');
	for (var i in posts)
	{
		var poster = /proboards\d*\.com\/index\.cgi\?action=viewprofile&user=(.+)/.exec(posts[i].getElementsByTagName('a')[2].href)[1];
		if (blockchk(poster))
		{
			posts[i].setAttribute('style', 'display:none');
		}
		else if (first)
		{
			posts[i].getElementsByTagName('b')[0].innerHTML = posts[i].getElementsByTagName('b')[0].innerHTML + '&nbsp<span style="color: ff0000;font-weight: bold" onmouseover="this.style.textDecoration=\'underline overline\'" onmouseout="this.style.textDecoration=\'\'" onclick="blockadd(\''+poster+'\');">[block]</span>';
		}
	}
}

function blockadd (poster)
{
	blocklist = blocklist+poster+';';
	GM_setValue('proboards-block-user-'+forum+'-blocklist', blocklist);
	magick(false);
}

function blockdel (poster)
{
	var tmp = new RegExp ('(.*)'+poster+';(.*)');
	blocklist = tmp.exec(blocklist)[1]+tmp.exec(blocklist)[2];
	GM_setValue('proboards-block-user-'+forum+'-blocklist', blocklist);
	magick(false);
}

function blockclr ()
{
	blocklist = ';';
	GM_setValue('proboards-block-user-'+forum+'-blocklist', blocklist);
	magick(false);
}

function blockchk (poster)
{
	var tmp = new RegExp ('(.*);'+poster+';(.*)');
	if (tmp.test(blocklist)) { return true; }
	else { return false; }
}

// Security breach!
unsafeWindow.magick=magick;
unsafeWindow.blockadd=blockadd;
unsafeWindow.blockdel=blockdel;
unsafeWindow.blockclr=blockclr;
unsafeWindow.blockchk=blockchk;

// Generic code - I can't believe Javascript doesn't have this!
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
    }}} return arrReturnElements;
}