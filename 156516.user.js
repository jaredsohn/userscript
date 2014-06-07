// ==UserScript==
// @name        ba-lounge
// @namespace   http://userscripts.org/users/466607
// @description	Insert flight details into BA lounge meet-up thread
// @include     http://www.flyertalk.com/forum/british-airways-executive-club/1423315-lounge-meet-up-2013-master-thread*
// @grant				GM_getValue
// @grant				GM_setValue
// @grant				GM_xmlhttpRequest
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @version     4
// ==/UserScript==

function start() {
	try {
		akeys = document.evaluate('//td[@class="alt2"]/div/strong/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (akeys.snapshotLength) {
			for (var i = 0; i < akeys.snapshotLength; i++) {
				var hr = akeys.snapshotItem(i).href;
				var ih = akeys.snapshotItem(i).innerHTML;
				if (hr.indexOf("members/") !== -1) {
					GM_setValue('ft_user', ih);
				}
			}
		}
	} catch (e) {
		alert('no id');
	}
	var snl = document.createElement('label');
	snl.appendChild(document.createTextNode("Surname:"));
	var sni = document.createElement('input');
	var sn = GM_getValue('surname', 'Smith');
	sni.setAttribute('value', sn);
	sni.addEventListener('change',
		function(event) {
			sn = sni.value;
			GM_setValue('surname', sn);
		}
	);
	var pnl = document.createElement('label');
	pnl.appendChild(document.createTextNode("PNR:"));
	var pni = document.createElement('input');
	var pnr = GM_getValue('lastpnr', 'PNR');
	pni.setAttribute('value', pnr);
	pni.addEventListener('change',
		function(event) {
			pnr = pni.value;
			GM_setValue('lastpnr', pnr);
		}
	);
	var upd = document.createElement('input');
	upd.setAttribute('type', 'button');
	upd.setAttribute('value', 'Lookup');
	upd.addEventListener("click", update, false);
	var f = document.createElement('form');
	f.appendChild(snl); f.appendChild(sni);
	f.appendChild(pnl); f.appendChild(pni);
	f.appendChild(upd);
	editDiv = top.document.createElement("div");
	editDiv.appendChild(f);
	idiv = document.getElementById('vB_Editor_QR');
	idiv.parentNode.insertBefore(editDiv, idiv.nextSibling);
  return true;
}

function update() {
	var m = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
	var pnr = GM_getValue('lastpnr');
	var sn = GM_getValue('surname');
	var ftu = GM_getValue('ft_user', 'NotLoggedIn');
	var dtf = 'data={"recLoc":"'+pnr+'","lastName":"'+sn+'","checkSessionCache":true}';
//				'User-agent': 'Mozilla/4.0 (compatible)',
//				'X-Requested-With': 'XMLHttpRequest'
	GM_xmlhttpRequest(
		{
			method: 'POST',
			url: 'https://www.checkmytrip.com/cmt/apf/pnr/retrieve?SITE=NCMTNCMT&LANGUAGE=US',
			headers: {
				'Accept': '*/*',
				'Content-type': 'application/x-www-form-urlencoded',
			},
			data: dtf,
			onload: function (resp) {
				var xmldata = "empty";
				if (!resp.responseXML) {
					var xmldata = new DOMParser().parseFromString(resp.responseText, "text/xml");
				}
				var cdata = xmldata.getElementsByTagName('data');
				var foo = cdata[0].childNodes[0];
				var jstuff = foo.nodeValue;
				var jobj = jQuery.parseJSON(jstuff);
				var ta = document.getElementsByTagName('textarea');
				var pfx = "";
				for (var i = 0; i < jobj.model.airItineraries.length; i++) {
					var itin = jobj.model.airItineraries[i];
					for (var j = 0; j < itin.segments.length; j++) {
						var seg = itin.segments[j];
						var dt=seg.departureDate.date;
						var arr=seg.arrivalDate.date;
						sfx = "\n";
						pfx = "";
						if (j > 0) {
							sfx = " (arrive: "+a[4]+":"+a[5]+")\n";
						} else {
						}
						var a = arr.match(/^([0-9]*)\/([0-9]*)\/([0-9]*) ([0-9]*):([0-9]*):.*/);
						var d = dt.match(/^([0-9]*)\/([0-9]*)\/([0-9]*) ([0-9]*):([0-9]*):.*/);
						var term = seg.departureTerminal;
						if (term) {
							term = "T"+term+" ";
						} else {
							term = "";
						}
						// this is to insert a url to member, but it looks too messy
						//ta[0].value = ta[0].value+"OFFER "+d[3]+"-"+m[parseInt(d[2])-1]+"-"+d[1]+" / "+d[4]+":"+d[5]+" / "+seg.departureLocation.locationCode+" / " + term+"GX / [url=http://www.flyertalk.com/forum/members/"+ftu+".html]"+ftu+"[/url]\n";
						ta[0].value = ta[0].value+pfx+"OFFER "+d[3]+"-"+m[parseInt(d[2])-1]+"-"+d[1]+" / "+d[4]+":"+d[5]+" / "+seg.departureLocation.locationCode+" / " + term+"GX / "+ftu+sfx;
					}
					ta[0].value = ta[0].value+"\n";
				}
			}
		}
	);
}

start();
