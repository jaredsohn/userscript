// ==UserScript==
// @name           Flash Quality Changer
// @description    Changes the quality setting of flash files.
// @version        1.5.4
// @author         Volkan K.
// @namespace      http://userscripts.org/users/volkan
// @homepageURL    https://userscripts.org/users/108756
// @updateURL      https://userscripts.org/scripts/source/57994.meta.js
// @include *
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-18
// @lastupdated		2013-02-02
// ==/UserScript==

if (typeof GM_log == "undefined") {
    GM_log = (window.opera) ? opera.postError : console.log;
}

if (typeof GM_openInTab == "undefined") {
	GM_openInTab = window.open;
}

if (typeof GM_getValue == "undefined") {
	// We will use static values if we can't use Greasemonkey API
	//eg. low, medium, high (see http://kb.adobe.com/selfservice/viewContent.do?externalId=tn_12701&sliceId=2)
	var s_quality = 'medium';
	//Overrides existing quality settings
	var s_force = true;
} else {
	// We will use menu commands and stored values if we are able to use Greasemonkey API
	GM_registerMenuCommand("Change Flash Quality Setting to Low", function(){GM_setValue('flash_quality.quality', 'low');GM_log('quality setting is changed to low')});
	GM_registerMenuCommand("Change Flash Quality Setting to Medium", function(){GM_setValue('flash_quality.quality', 'medium');GM_log('quality setting is changed to medium')});
	GM_registerMenuCommand("Change Flash Quality Setting to High", function(){GM_setValue('flash_quality.quality', 'high');GM_log('quality setting is changed to high')});
	GM_registerMenuCommand("Override Flash Quality Settings", function(){GM_setValue('flash_quality.force', true);GM_log('override setting is changed to true')});
	GM_registerMenuCommand("Don't Override Flash Quality Settings", function(){GM_setValue('flash_quality.force', false);GM_log('override setting is changed to false')});

	//eg. low, medium, high (see http://kb.adobe.com/selfservice/viewContent.do?externalId=tn_12701&sliceId=2)
	if (GM_getValue('flash_quality.quality', 0) == 0) GM_setValue('flash_quality.quality', 'medium');
	//Overrides existing quality settings
	if (GM_getValue('flash_quality.force', 0) == 0) GM_setValue('flash_quality.force', true);

	var s_quality = GM_getValue('flash_quality.quality', 'medium');
	var s_force = GM_getValue('flash_quality.force', true);
}

hello_flash=function()
{
	if (document.embeds){
		var doc_embeds = document.embeds;
	} else {
		var doc_embeds = document.getElementsByTagName('embed');
	}
if ( (doc_embeds != null) && (doc_embeds.length > 0) ) {
	for (var objs = doc_embeds, i = objs.length - 1; i >= 0; i--) {
		if ( objs[i].getAttribute('quality') != s_quality )
		{
			objs[i].setAttribute('quality', s_quality);
//			objs[i].src+="#r";
			mysrc=objs[i].getAttribute('src');
			if (mysrc != null) {
				objs[i].setAttribute('src','');
				objs[i].setAttribute('src',mysrc);
				continue;
			}
			mynextSibling=objs[i].nextSibling;
			myparentnode=objs[i].parentNode;
			if (mynextSibling != null)
			{
				removednode=objs[i].parentNode.removeChild(objs[i]);
				myparentnode.insertBefore(removednode,mynextSibling);
			}
			else
			{
				removednode=objs[i].parentNode.removeChild(objs[i]);
				myparentnode.appendChild(removednode);
			}
		}
	}
}

var doc_objects=document.getElementsByTagName('object');
if ( (doc_objects != null) && (doc_objects.length > 0) ) {
	for (objs = doc_objects, i = objs.length - 1; i >= 0; i--) {
		var changed = false;
		if ( (objs[i].getAttribute('type')!=null) && (/silverlight/i.test(objs[i].getAttribute('type'))) ) {
			continue;
		}
		for (var c = objs[i].childNodes, j = c.length - 1, set = false; j >= 0; j--) {
			if ((c[j].tagName == 'PARAM') && (c[j].getAttribute('name') == 'quality') && s_force) {
				if ( c[j].getAttribute('value') != s_quality )
				{
					c[j].setAttribute('value', s_quality);
					changed = true;
				}
				set = true;
				break;
			}
		}
		if (!set)
		{
			v=objs[i].appendChild(document.createElement('param'));
			v.setAttribute('name', 'quality');
			v.setAttribute('value', s_quality);
			changed = true;
		}

		if (changed)
		{
			mynextSibling=objs[i].nextSibling;
			myparentnode=objs[i].parentNode;
			mysrc=objs[i].getAttribute('data');
			if (mysrc != null) {
				objs[i].setAttribute('data','');
				objs[i].setAttribute('data',mysrc);
				continue;
			}
			if (mynextSibling != null)
			{
				removednode=objs[i].parentNode.removeChild(objs[i]);
				myparentnode.insertBefore(removednode,mynextSibling);
			}
			else
			{
				removednode=objs[i].parentNode.removeChild(objs[i]);
				myparentnode.appendChild(removednode);
			}
		}
	}
//	alert('test'); // for debugging
}
}
hello_flash();
window.addEventListener("DOMNodeInserted", function(event) {
	if ( event.target && (( event.target.nodeName == 'EMBED' ) || ( event.target.nodeName == 'OBJECT' )) )
	{
		hello_flash();
	}
}, true);
