// ==UserScript==
// @name           IMDb External TorrentZ/RevoTT search
// @namespace      projekt
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// @include        http://*.imdb.com/name/*
// @include        http://imdb.com/name/*
// ==/UserScript==
// Original Script by Rob Miller. Edited by projekt.

var SUC_script_num = 63093; 
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var div = document.createElement("div");
div.className = 'strip toplinks';

div.innerHTML = '<table><tr><td>';


var wpLink = document.createElement("a");
wpLink.href = 'http://www.torrentz.com/search?q=' + title;
wpLink.style.marginRight = "25px";
wpLink.title = "Public";
wpLink.innerHTML = '<img src="http://www.torrentz.com/favicon.ico" align="absmiddle" border="0" vspace="3"> ';
div.appendChild(wpLink);

div.innerHTML += '</td><td>';

var wpLink = document.createElement("a");
wpLink.href = 'http://www.revolutiontt.net/browse.php?search=' + title + '&cat=0&titleonly=1';
wpLink.style.marginRight = "25px";
wpLink.title = "Private";
wpLink.innerHTML = '<img src="http://www.revolutiontt.net/favicon.ico" align="absmiddle" border="0" vspace="3"> ';
div.appendChild(wpLink);

div.innerHTML += '</td><td>';

namePos.parentNode.insertBefore(div, namePos.nextSibling);