// ==UserScript==
// @author		yopzer
// @name		Travian village preserver T3.6
// @namespace	http://userscripts.org/
// @description	Remembers current village if played form two computers (browsers, tabs) simultaneously
// @include	http://s*.travian.*
// @exclude	http://shop.travian.*
// ==/UserScript==
var vil_nums = false;
var vil_idx = 0;
try {
	vil_list = document.getElementById('vlist').getElementsByTagName('tbody')[0];
	//alert(vil_list.rows.length);
	vil_nums = vil_list.rows.length;
	//alert (vil_list.rows[5].firstChild.className);
	while (vil_list.rows[vil_idx++].firstChild.className != "dot hl") {};
	vil_idx--;
	//alert(vil_idx);
} catch(e) {
};
var host = window.location.host;
//alert(vil_list.rows[vil_idx].cells[1].lastChild.innerHTML);
var newdid = vil_list.rows[vil_idx].cells[1].lastChild.innerHTML.replace(/^.*newdid\=(\d+).*$/, "$1");
if (document.forms[0]) {
	xinput = document.createElement('input');
	xinput.name = 'newdid';
	xinput.type = 'hidden';
	xinput.value = newdid;
	document.forms[0].appendChild(xinput);
	document.forms[0].action += '?newdid=' + newdid;
}
for (l = 0; l < document.links.length; l++) {
	link = document.links[l];
	if (!link.href.match('newdid') && !link.href.match('submit') && link.href.match(host)) {
		if (link.href.match(/\?/))
			link.href += '&newdid=' + newdid;
		else
			link.href += '?newdid=' + newdid;
	}
}

tmp_m_c_ad = unsafeWindow.m_c.ad;
if(tmp_m_c_ad) {
  for (l = 0; l < tmp_m_c_ad.length; l++) {
    for (n = 0; n < tmp_m_c_ad[l].length; n++) {  
      tmp_m_c_ad[l][n][4] = tmp_m_c_ad[l][n][4] + "&newdid=" + newdid;
    }
  }
  unsafeWindow.m_c.ad = tmp_m_c_ad;
}

var maps = document.getElementsByTagName('map');
for (m = 1; m < maps.length; m++) {
	var areas = maps[m].getElementsByTagName('area');
	for (a = 0; a < areas.length; a++) {
		link = areas[a];
		if (!link.href.match('newdid') && !link.href.match('submit') && link.href.match(host)) {
			if (link.href.match(/\?/))
				link.href += '&newdid=' + newdid;
			else
				link.href += '?newdid=' + newdid;
		}
	}
}