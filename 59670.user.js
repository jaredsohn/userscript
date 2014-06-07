// ==UserScript==
// @name	GeoKrety Toolbox
// @version	1.0.3
// @copyright	©2013, simor
// @namespace	http://simor.net/greasemonkey/
// @description	(v1.0.3) Shows GeoKrety trackables on geocaching.com cache pages and facilitates dropping GK trackables into GC caches.
// @include	http://www.geocaching.com/geocache/GC*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// ==/UserScript==

// HISTORY
// -------
// 1.0.3	 22 Aug 2013	Geocache url update
// 1.0.2	  6 Aug 2013	Chrome Web Store update
// 1.0.1	 13 Nov 2011	Site layout update
// 1.0.0	 18 Oct 2011	Version change forced by Google Chrome Extension (0.3.2 -> 1.0.0)
// 0.3.2	 18 Oct 2011	Site layout update
// 0.3.1	 13 May 2011	Site layout update
// 0.3.0	  6 Feb 2010	+ script is now compatible with Google Chrome
//					* some internal and GUI improvements
// 0.2.4	16 Jan 2010	* Combined both Geokrety areas into one
//					* Some layout fixes (thanks to Thomas E.)
// 0.2.3	13 Jan 2010	Code optimization
// 0.2.2	13 Jan 2010	Site layout update
//					* Internal changes
// 0.2.1	10 Dec 2009	* Some GUI fixes 
//					+ Brought back the "log a gk" link
// 0.2.0	26 Nov 2009	+ Easy geokret drop 
//					* Further serverside speed improvements
// 0.1.6	13 Nov 2009	New (lighter & faster) way of fetching and displaying geokret list
//					+ New dedicated search engine for GeoKrety Toolbox on GK site
//					* Swapped XML with JSON data structures
// 0.1.5	 5 Nov 2009	Site layout update
// 0.1.4	19 Oct 2009	Little fix
// 0.1.3	18 Oct 2009	+ Added error handler for the http request but this doesn't solve timeout issue (waiting for next version of GM)
// 0.1.2	15 Oct 2009	Code optimization
//					+ Automatic version check
//					+ Easy debug option
//					+ In-code images
//					* GK search area increased 
// 0.1.1	13 Oct 2009	Some slight fixes
// 0.1.0	12 Oct 2009	Initial version

// userscript.org downloads: 5086
// userscript.org downloads: 13824

var SUC_script_num = 59670,
	VER = '1.0.3',
	DEBUG = false,
	GKHOST = 'geokrety.org',
	border_style = '1px solid #B0B0B0',
	border_style2 = '1px solid #E06060',
	imgDrop = '<img style="padding:0;border:0;vertical-align:middle;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAVElEQVR42mNkoBAw4hD%2FT6xa3AY0IPEaRg2gqwH%2F0TRhstH0YBrgBSTNsFh1Coi3ETYAuyE4NOMPA5gheDTjMwBhyDb86vAZAAtUvGoIGUAQUGwAAIrkGxG1kinTAAAAAElFTkSuQmCC"/>',
	pixel_grey = '<img style="padding:0;border:0;vertical-align:middle;" src="../images/pixel_grey.gif" width="100%" height="1px" />',
	geokretyorg_header = '<h3 class="WidgetHeader" style="margin-top:1em; font-size:100%"><strong>Geo<span style="color: white; background-color: #303030;">Krety</span>.org</strong></h3>';

//var imgGKico = '<img align="absmiddle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAU0lEQVR42mP8DwQMFADGwW8AIyMjHQzApghmLkgOmY0uBxL5jyyIrhDdAHTDsBqA7gV0OWQXoxiA7hV0F2ALE5K8QNAFZIUBxbEwOBISAwWAYgMANHpy8qY1e9UAAAAASUVORK5CYII%3D"/>';

try {
	if (GM_getValue('a', 'b') == 'b') {
		try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{debug("updateCheck",forced);GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'".\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
	}
}
catch(err)
{}

var gcwaypoint, lat, lon;

// window.drop_geokret = function() {
	// var select = document.getElementById("gk_select");
	// var url = 'http://'+GKHOST+'/ruchy.php?gkt=drop_gc&nr='+select.value+'&waypoint='+gcwaypoint+'&lat='+lat+'&lon='+lon+'&gkt_return_url='+escape(window.location.href);
	// debug('window.location.href='+url);
	// window.location.href = url;
// };

window.gk_selectchange = function() {
	if (this.selectedIndex==0) {
		document.getElementById("gk_dropselected").setAttribute("style","cursor:not-allowed");
		document.getElementById("gk_dropselected").removeAttribute("href");
	}
	else {
		var url = 'http://'+GKHOST+'/ruchy.php?gkt=drop_gc&nr='+this.options[this.selectedIndex].value+'&waypoint='+gcwaypoint+'&lat='+lat+'&lon='+lon;
		debug('url='+url);
		document.getElementById("gk_dropselected").setAttribute("style","cursor:pointer");
		document.getElementById("gk_dropselected").setAttribute("href",url);
	}
}

window.gk_getinventory = function() {

	var imgRefresh = '<img style="padding:0;border:0;vertical-align:middle;"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAADHklEQVR42qWTbUhTURjHn7udrW2ttQxtXSc6M20qYZdFJSo6yHS9oFCLxJCKQsoPUlIfsk8ZRFkYGEkv9MKwGNEbZRamprGCxjUip%2FZitrm5TMvmnHp3d2%2Fn3kqKgj504M853P%2F%2F%2FJ7Duc8heJ4n4D8GIQDyLg434LXpL74T6ygWwgri7Of27QuYPwA554dKgecrN%2BeT1PQ0LxoIEXD9kY8uzl24d%2FQrE%2BMdmWLc%2FslgOMy5OnaS%2Ft8AwiLzjLsGTwWbzHoqGGRBoZTCzcdeuigntirC8ukcz4NKKYF7Dn8gNMk%2BceyO758BLK97Q8pkUtvaTDI3FAyDNmoWMAwHtzoGaZzZRUYr89MMc3UI11LPQXC70%2BtnmEjD88rFYyJg2bHuCqNBuz8uSqlXqBDc6fTQJZZFVGPTO7prf5qJOu6icM66egWZSrC8xD06GegdGGvE3l0RkHaYbjSbYjcgfMpeX6DfPTTejCuvFI7YfYgSLze9psui16krjaRGzxIw1er0tmKvSgQkH3Q4LTlJVISNwAPHe%2Fr1kUxTSvXTUrwvq69mVfnPC8O59jWZhgwpkkJTx9sXOJcrAhKq2trX5BkzwiwHrZ19LwZq83J%2Fborf1yr84icfTphtOOc0Z6dQMiSBB209NM6ZRABZcb92ZZbRHCGQwvfeN%2Bj1jNT5TluaBAD2nD9Yz2L18wtIA5kohUjoWafrjq%2B%2BsEQERO%2B8tS4%2BJa5EEafXqIDlulqeu%2FB3%2B8j5Yhp7zoIteVTz1TbatD6bGp9kYdrrHRzocR%2F7dK6oXgRoy%2BxaJEflGRvzdUPjLKgjUzD8stf%2F2fPxIa58Ns1aSKnkEvjwJQzRs6XQc7OlnWfZ0rHLVt9MI6m32BJls5VZSZvXafwTHEglBCgQ8cpzxV6bUGalhkMcGDQS6L5gF3qjeeLa1urfOlEYspwDOhSbnqpNTlQjQ4Ickbphb8Olk4v2bKMm2O8tHqMg4OWpiwKkjrmxwzYDIAhCJfiEcl4URC9Rg5pEBBPgIGbpLpi%2FOPmPZzb6xsU5TlT%2FCpDjSYAosCT%2FeMUcFivoGyb2cjTnPs%2B9AAAAAElFTkSuQmCC"/>';

	var gk_inventory = document.getElementById("gk_inventory");
	gk_inventory.innerHTML='<i>Retrieving ...</i>';
	var gk_inventory2 = document.getElementById("gk_inventory2");
	gk_inventory2.setAttribute('style','display:none');

	var xhr = new XMLHttpRequest();
	xhr.onerror = function() {
		debug('Request failed with ' + xhr.status + ' ' + xhr.statusText + '\nData:\n' + xhr.responseText);
		gk_inventory.innerHTML='Error retrieving data.';
	}
	xhr.onload  = function() {
			debug('Request returned ' + xhr.status + ' ' + xhr.statusText + '\nData:\n|' + xhr.responseText +'|');
			var inventory = JSON.parse(this.responseText);
			var len = inventory.list.length;
			if(len>0)
			{
				var krets='<option value="0">--- Select GeoKret ---</option>';
				for (var i = 0; i < len; i++) {
					krets=krets+'<option value="'+inventory.list[i].tc+'">'+inventory.list[i].n+'</option>';
				}
				gk_inventory.innerHTML = '<select id="gk_select" style="width: 100%;margin-top:3px;">'+krets+'</select>';
				gk_inventory2.setAttribute('style','');

				document.getElementById("gk_select").addEventListener("change", gk_selectchange, false);
				document.getElementById("gk_select").addEventListener("keyup", gk_selectchange, false);
			}
			else
			{
				if (inventory.loggedin) {
					gk_inventory.innerHTML = 'Your inventory on GeoKrety.org is empty.';
				}
				else
				{
					gk_inventory.innerHTML = '<span style="line-height:1.2em;">Your are not logged in on GeoKrety.org. To view your inventory you need to <a href="http://'+GKHOST+'/longin.php">log in</a> and then click refresh inventory.</span>';
				}
			}
	}
		
	xhr.overrideMimeType('text/plain');
	xhr.open("GET", "http://"+GKHOST+"/gkt/inventory_v3.php", true);
	xhr.withCredentials = "true";
	xhr.send(null);

	document.getElementById("gk_getinventory_icon").innerHTML = imgRefresh;
	this.innerHTML = 'Refresh my GK Inventory';

};
	
function go() {

	// ------------------------------- images -------------------------------

	var imgLogGK = '<img style="padding:0;border:0;vertical-align:middle;"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA8klEQVR42mOcnsLwnwEIMpkYEGAWAyMDkYARZEB6KgMDUy8Dw7kFEEGjAuINQhjQzcAQVqLNsP%2F2fYadwd%2BINghhQA%2FQgGKIAV%2F%2B%2FmWQEBRhWOv6lKBBKF4IK0I1QF5YgEFeSIAhX%2BEowiA0Q4gyQFRMgkFDWJYhxX0CA8MuMgxYWABxAbpmDAPCS3QY9t28Bzfg%2FtSnODViGtAJNKACYsDrxd8wNcZC0gscLIbIIQyoRZLEZiPQgHMzoekkHYsBM2cDU%2BMc7BphTBQD0L2AzwCYRnQAMog%2BBlDmBUKBWB%2FC8P%2FuCwYGZQkGhsY1%2BA3AFo0AdpGZgTxJCIcAAAAASUVORK5CYII%3D" />';
	
	// ------------------------------- geokrets sitting in the cache -------------------------------

	var prefix_krets_in_cache = document.createElement('span');
	prefix_krets_in_cache.setAttribute("id","prefix_krets_in_cache");
		
	var table_krets_in_cache = document.createElement('span');
	tmp = '<table id="table_krets_in_cache" width="100%" cellspacing="2" cellpadding="0" style="line-height:1.2em;margin-bottom:0"></table>';
	table_krets_in_cache.innerHTML = tmp;

	// ------------------------------- GeoKrety.org inventory -------------------------------
	
	var krets_header = document.createElement('span');
	tmp = geokretyorg_header;
	krets_header.innerHTML = tmp;

	var table_krets_with_me = document.createElement('span');
	tmp = '<table width="100%" cellspacing="2" cellpadding="0" style="margin-bottom:0">';
	tmp += '<tr><td colspan=2 style="padding:0;line-height:1px">'+pixel_grey+'</td></tr><tr><td style="padding:0;width=16px"><center>'+imgLogGK+'</center></td><td><a id="gk_logkret" href="http://'+GKHOST+'/ruchy.php?gkt=log_gc&waypoint='+gcwaypoint+'&lat='+lat+'&lon='+lon+'">Log any GeoKret here</a></td></tr>';
	tmp += '<tr><td colspan=2 style="padding:0;line-height:1px">'+pixel_grey+'</td></tr><tr><td colspan=2 id="gk_inventory" style="padding:0"></td></tr>';
	tmp += '<tr id="gk_inventory2" style="display:none"><td style="width:16px;padding:2px">'+imgDrop+'</td><td><a id="gk_dropselected" style="cursor:not-allowed">Drop/dip selected GK</a></td></tr>';
	tmp += '<tr><td style="width:16px;padding:2px"><center><span id="gk_getinventory_icon">'+imgDrop+'</span></center></td><td><a id="gk_getinventory" style="cursor: pointer">Drop a GK in this cache</a></td></tr>';
	tmp += '</table>';
	table_krets_with_me.innerHTML = tmp;
		
	var krets_content = document.createElement('div');
	krets_content.setAttribute("style","border:"+border_style+";padding:2px 2px");
		
	krets_content.appendChild(prefix_krets_in_cache);
	krets_content.appendChild(table_krets_in_cache);
	krets_content.appendChild(table_krets_with_me);

	// -------------------------------  -------------------------------

	var lnk = document.getElementById("ctl00_ContentBody_lnkTravelBugs");
	lnk = getRealNextSibling(lnk);
	lnk.appendChild(krets_header);
	lnk.appendChild(krets_content);
	
	document.getElementById("gk_getinventory").addEventListener("click", gk_getinventory, false);

	// -------------------------------  -------------------------------
	
	//if (latlon.textContent.match(regex)) {
		window.gk_searchgeokrets();
	//}

}

window.gk_searchgeokrets = function() {
	var imgGK = '<img style="padding:0;border:0;vertical-align:middle;"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s%2FZAAACtUlEQVR42o2UXUiTURjH%2F6%2BZ5tAQS0tDp25Wa4VNUSnc%2BhANcnPqndiXldo00KTVVAq8sfkRJgnlEm%2BaXiRmfrVZDdLh9SAmZJtZrC7KXLJprmiuM0tpH8d64Lwv73mf%2F%2B%2Bc838ODwN6uLy%2BGX9JDE3ocnnqGYbxq%2FEGuLyFPiv%2BBvmlrYstFgva2%2B5geHAQISwWcsVilFw4Dy6X6wNh%2FK1cKC3Ek6EBREVsw9LyMri79yAtIw0KhQKJCQkeEB%2BATvcC0lwJAoODwQphwelwIEsihpjswvblMy5VXt4Y0NvTi%2BJTxYiM3oXqwnzEfLNDbX6HvKIiGPoe4WptLfjZ2XTAyPAIJFIpMlMOQi8twNfGBryqb0D3%2B1kYurpw%2F4EKhy%2BW0gH6iQnk5JxAXDwHk%2FIa%2FNBpYD1bip%2BcRMBqBZd4EBoZSQf0qNU4d%2FoM0kRC1F%2BXI%2FekGAbjFBzfHTiUmupTTg%2FAjNkMWVk5nCsuBGwOxNbwMPT39cNmt6Ot5Tau1FSTuXA6QNl4C61NTSiXyXC3vR11N29AQUxzh6qzE5kiEfbxeHTAkUwhXE4nOElJGB4dxVPNKBbtizielQXds%2Bd4bTahsqKCDuDEJ2B7RASSBQKoH6oRExMN68ICZGRHPD4fk8Tge6rOjQFL5Lxs4nR5WRm0Wi36Bh7jAH8%2FlEolXo6Po7mlmQ4QJCfjo%2BUDbDYb3szOIC42DmNjWgQFbQGbzcYUqYYkT0wH1Clq0dTaihXnCkoqZeju6Fgv25BGg%2FTUFOyM2kEHmE0myKuq8JYkC9yTGekI5e0Fa9oEyTU5RPkFG98Do9EI5%2Fw8prtUCJubgyEoGJ%2FI4G4KQOzRY8gnZtIA%2F9VMvMXeDWUVMkFK5Q6hUOjxQ6%2FXr75F5DKB0pHWIe7HGmgt%2Fgh9NH477d%2Bgf%2BX%2BAio4KictimHrAAAAAElFTkSuQmCC"/>';	
	var prefix_krets_in_cache = document.getElementById("prefix_krets_in_cache");
	prefix_krets_in_cache.innerHTML = '<i>Retrieving ...</i>';

	var xhr = new XMLHttpRequest();
	var url = "http://"+GKHOST+"/gkt/search_v3.php?mode=latlon&lat="+lat+"&lon="+lon;
	xhr.onerror = function() {
		/*debug('Request failed with ' + xhr.status + ' ' + xhr.statusText + '\nData:\n' + xhr.responseText);*/
		prefix_krets_in_cache.innerHTML = 'Error retrieving data. <a id="gk_searchgeokrets" style="cursor: pointer">Try again</a>';
		document.getElementById("gk_searchgeokrets").addEventListener("click", gk_searchgeokrets, false);
	}
	xhr.onload  = function() {
		/*debug('Request returned ' + xhr.status + ' ' + xhr.statusText + '\nData:\n|' + xhr.responseText +'|');*/
		var gk = JSON.parse(this.responseText);
		/*debug("geokrety:",gk.length); for(var att in gk) { if (gk.hasOwnProperty(att)) { debug(gk[att]); } }*/
		
		prefix_krets_in_cache.innerHTML  = '';
		var krets='';
		if (gk.length>0)
			for (var i=gk.length-1; i>=0; i--) {
				krets='<tr><td style="width:16px;padding:2px">'+imgGK+'</td><td><a href="http://'+GKHOST+'/konkret.php?id='+gk[i].id+'" target="_blank">' + gk[i].n + '</a></td></tr>'+krets;
			}
		else { krets='<tr><td>No geokrets in this cache.</td></tr>'; }			
		document.getElementById("table_krets_in_cache").innerHTML=krets;
	}
	xhr.overrideMimeType('text/plain');
	xhr.open("GET", url, true);
	xhr.send(null);
}

function init() {
	
	debug('Toolbox ' + VER + ' starting!');

	var tmp, url, cond1, cond2;
	url = window.location.href;

	//debug('Checking URL...');
	//regex = /https?:\/\/www\.geocaching\.com\/seek\/cache_details/;
	//if (!url.match(regex)) {
	//	debug('Match not found!');
	//	return;
	//}
	//else {
	//	debug('Match found');
	//}

	debug('Checking if user is logged in...');
	tmp = document.getElementById("ctl00_ContentBody_trNotLoggedIn");
	if (tmp != null) {
		debug('User is not logged in!');
		var krets_header = document.createElement('span');
		krets_header.innerHTML = geokretyorg_header+'<div style="border:'+border_style2+';padding:5px 5px">Please log in :)</div>';

		tmp = document.getElementById("ctl00_ContentBody_lnkTravelBugs");
		if (tmp != null) {
			tmp = getRealNextSibling(tmp);
			tmp.appendChild(krets_header);
		}
		debug('Exiting');
		return;
	}
	debug('User is logged in');

	debug('Searching for waypoint code...');
	cond1 = false;
	tmp = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode');
	if (tmp != null) {
		cond1=tmp.textContent.match(/(GC[A-Z0-9]+)/)
		if(cond1) { gcwaypoint=RegExp.$1; debug('Waypoint found: ' + gcwaypoint); }
	}
	if (!cond1) { gcwaypoint='';  debug('Waypoint not found');}

	debug('Searching for coordinates...');
	cond2 = false;
	tmp = document.getElementById('uxLatLon');
	if (tmp != null) {
		cond2=tmp.textContent.match(/([NS])\s(\d+).\s(\d{1,2})\.(\d{3})\s([EW])\s(\d+).\s(\d{1,2})\.(\d{3})/);
		if(cond2) { debug('Coordinates found'); }
	}
	if (!cond2) { gcwaypoint='';  debug('Coordinates not found');}
			
	if ( !cond1 || !cond2 ) {
		//var krets_header = document.createElement('span');
		//tmp = geokretyorg_header+'<div style="border:'+border_style2+';padding:5px 5px">';
		//if (!cond1) { tmp += 'Waypoint not found<br/>'; }
		//if (!cond2) { tmp += 'Coordinates not found<br/>'; }
		//tmp += '</div>';
		//krets_header.innerHTML = tmp;
		
		//var lnk = document.getElementById("ctl00_ContentBody_lnkTravelBugs");
		//if (lnk != null) {
		//	lnk = getRealNextSibling(lnk);
		//	lnk.appendChild(krets_header);
		//}
		debug('Exiting');
		return;
	}

	lat = parseFloat(RegExp.$2) + (parseFloat(RegExp.$3) + (parseFloat(RegExp.$4)/1000))/60;
	if (RegExp.$1 == 'S') {lat = -1 * lat;}
	lat = Math.round(lat*100000)/100000;
	debug("lat = "+lat);
	
	lon = parseFloat(RegExp.$6) + (parseFloat(RegExp.$7) + (parseFloat(RegExp.$8)/1000))/60;
	if (RegExp.$5 == 'W') {lon = -1 * lon;}
	lon = Math.round(lon*100000)/100000;
	debug("lon = "+lon);
	
	debug('Searching for TB area...');
	if (document.getElementById("ctl00_ContentBody_lnkTravelBugs") != null)	{
		debug('TB area found');
	}
	else {
		debug('TB area not found');
		debug('Exiting');
		return;
	}
	
	go();
}

function getRealNextSibling(ele) {
	ele = ele.nextSibling;
	while (ele.nodeType !=1) { ele = ele.nextSibling; } 
	return ele;
}
    
function debug(s) {
	if (DEBUG && console) {
		unsafeWindow.console.log('GKT: '+s);
  }
}

init();