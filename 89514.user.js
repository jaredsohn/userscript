// ==UserScript==
// @name           GC Statens Kartverk
// @namespace      http://www.smavik.com/
// @description    Link to map from Statens Kartverk for Geocaching.com
// @include        http://*geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

//	Copyright (c) 2010 Aina Smavik
//	
//	Permission is hereby granted, free of charge, to any person
//	obtaining a copy of this software and associated documentation
//	files (the "Software"), to deal in the Software without
//	restriction, including without limitation the rights to use,
//	copy, modify, merge, publish, distribute, sublicense, and/or sell
//	copies of the Software, and to permit persons to whom the
//	Software is furnished to do so, subject to the following
//	conditions:
//	
//	The above copyright notice and this permission notice shall be
//	included in all copies or substantial portions of the Software.
//
//	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
//	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
//	OTHER DEALINGS IN THE SOFTWARE.

mapLinks = document.getElementById('ctl00_ContentBody_MapLinks_MapLinks');
mapLinksLi = mapLinks.getElementsByTagName('li');
query = mapLinksLi[0].getElementsByTagName('a')[0].href.split("?");
query = query[query.length-1];
lat = null;
lng = null;
for (var i = 0; i < query.split("&").length; i++) {
	pair = query.split("&")[i];
	if (pair.split("=").length <= 1) continue;
	key = pair.split("=")[0];
	if (key == "lat")
		lat = pair.split("=")[1];
	if (key == "lng" || key == "lon")
		lng = pair.split("=")[1];
}

if (lat != null && lng != null) {
	cacheName = document.getElementById('ctl00_ContentBody_CacheName').textContent;
	skLink = document.createElement('li');
	skLink.innerHTML = '<a href="http://www.smavik.com/gcmap.php?lng='+lng+'&lat='+lat+'&name='+escape(cacheName)+'" target="_blank">Statens kartverk topografisk kart</a>';
	mapLinks.appendChild(skLink);
}

// Script Update Checker by Jarett
// http://userscripts.org/scripts/show/20145
var SUC_script_num = 89514;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}