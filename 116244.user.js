// ==UserScript==
// @name		SE Read Observatory
// @description	Reads and sends information to a server about the galaxy
// @include	http://extreme.sysemp.com/observatory.php*
// @include	http://extreme.sysemp.com/market.php?tab=2
// @exclude	http://extreme.sysemp.com/observatory.php?tab=*
// @author		Carapuca
// ==/UserScript==


// EDITEM ESTAS 5 VARIAVEIS COM OS VALORES CERTOS
// nick no ST
var login = "";
// password do ST
var passw = "";
// link do ST (ao ficheiro secret.php)
var shost = "http://revavg.zzl.org/secret.php";
// escrever 'false' em vez de 'true' (sem aspas) se desejar fazer update a zonas fora do planeta terra
var onlyearth = false;
// escrever 'false' em vez de 'true' (sem aspas) se nao desejar ver o estado da actualizacao do ST
var seediv = true;
// NAO EDITEM NADA ABAIXO DESTA LINHA


// aux
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function isMarket(href) {
	return href.search(/\/market\.php/i) > -1;
}

// trim
function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}
function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

// var
// Code adapted from the 'Foxgame' firefox extension
var fg_MilosDiv = 
	'<div style="border:1px solid #f00; background-color:#aaa; position:absolute; z-index:1; top:5px; left:5px; visibility:'+(seediv ? 'visible' : 'hidden')+'; width:200px; height:70px;" id="div_frame">'+
	'<table width="200px" style="width:200px" celspacing="0" celpadding="0" border="0">'+
	'<tr>'+
	  '<td align="left" bgcolor="#ffffff">ST Update</td>'+
	  '<td valign="middle" align="center" bgcolor="#ffffff"><a onclick="hide()" style="text-decoration: none;"><font color="black" style="text-decoration: none; font-size: 15px;">x</font></a></td>'+
	'</tr>'+
	'<tr>'+
	  '<td bgcolor="#FFFFFF" colspan="2">'+
	    '<iframe onload="setTimeout(\'hide()\', 5000);" frameborder="0" src="" name="_milos" id="_milos" width="194" height="40"></iframe>'+
	  '</td>'+
	'</tr>'+
	'</table>'+
	'</div>';



try {
	if (isMarket(document.location.href))
		var ttags = xpath('//table[@class="mini region"]/tbody/tr');
	else
		var ttags = xpath('//table[@class="mini nreg"]/tbody/tr');
	if (ttags.snapshotLength > 0) {
		var coord = new Array(ttags.snapshotLength/4); // coordinates
		var oinfo = new Array(ttags.snapshotLength/4); // I N etc
		var zname = new Array(ttags.snapshotLength/4); // zona name
		var pname = new Array(ttags.snapshotLength/4); // player name
		var prank = new Array(ttags.snapshotLength/4); // player rank
		var aname = new Array(ttags.snapshotLength/4); // alliance name
		var plaid = new Array(ttags.snapshotLength/4); // ingame player id
		var allid = new Array(ttags.snapshotLength/4); // ingame alliance id
	}
	var debris = new Array(4);
	var emptycoord = /\d+\:\d+\:\d+/.exec(document.getElementById("t1").textContent);
	for (var i=0; i!=ttags.snapshotLength; i+=4) {
		coord[i/4] = /\d+\:\d+\:\d+/.exec(ttags.snapshotItem(i).textContent);
		oinfo[i/4] = /[A-Z\ ]+/.exec(ttags.snapshotItem(i).textContent);
		oinfo[i/4] = oinfo[i/4].toString().replace(/\ /g,"");
		zname[i/4] = /.+/.exec(ttags.snapshotItem(i+1).textContent);
		pname[i/4] = /.+/.exec(ttags.snapshotItem(i+2).textContent);
		prank[i/4] = /[0-9\.\-]+/.exec(trim(ttags.snapshotItem(i+3).textContent));
		aname[i/4] = /\ [0-9a-zA-Z\ \-\_]+/.exec(trim(ttags.snapshotItem(i+3).textContent));
	}
	if (!isMarket(document.location.href)) {
		if (ttags.snapshotLength > 0) {
			if (navigator.appName == 'Opera') {
				for (var i=0, j=0; i!=50; i++) {
					if (lz[i] != 0) {
						plaid[j] = lz[i];
						allid[j] = lt[i];
						j++;
					}
				}
			} else { // firefox
				for (var i=0, j=0; i!=50; i++) {
					if (unsafeWindow.lz[i] != 0) {
						plaid[j] = unsafeWindow.lz[i];
						allid[j] = unsafeWindow.lt[i];
						j++;
					}
				}
			}
		}
		var debris_img = xpath('/html/body/table[2]/tbody/tr[1]/td/table/tbody/tr/td[1]/a');
		if (debris_img.snapshotLength == 0) {
			debris[0] = 0; debris[1] = 0; debris[2] = 0; debris[3] = 0;
		} else {
			debris_img = debris_img.snapshotItem(0).getAttribute("hoverbox");
			debris[0] = /[0-9\.]+\ M/.exec(debris_img);
			try { debris[0] = debris[0].toString().replace(/\ M/g, ''); } catch(e) { debris[0] = 0; }
			debris[1] = /[0-9\.]+\ D/.exec(debris_img);
			try { debris[1] = debris[1].toString().replace(/\ D/g, ''); } catch(e) { debris[1] = 0; }
			debris[2] = /[0-9\.]+\ N/.exec(debris_img);
			try { debris[2] = debris[2].toString().replace(/\ N/g, ''); } catch(e) { debris[2] = 0; }
			debris[3] = /[0-9\.]+\ L/.exec(debris_img);
			try { debris[3] = debris[3].toString().replace(/\ L/g, ''); } catch(e) { debris[3] = 0; }
		}
	} else if (ttags.snapshotLength > 0) {
		for (var i=0; i!=ttags.snapshotLength/4; i++) {
			plaid[i] = -1;
			allid[i] = -1;
		}
	}
	if (isMarket(document.location.href)) {
		debris[0] = -1; debris[1] = -1; debris[2] = -1; debris[3] = -1;
	}

	if (onlyearth && emptycoord.toString().substr(0,1) != "3") {
		// do nothing
	} else {
		// send data
		var ttags2 = xpath('//body');
		var td = document.createElement('td');
		td.setAttribute("width", "1");
		td.innerHTML = fg_MilosDiv;
		td.innerHTML +=
			"<input class=\"button nav\" type=button value=\"ST\" onClick=\"next('1:GalaxieTool')\" style='display: none;'>";
		var td2 = document.createElement('td');
		td2.setAttribute("width", "1");
		if (ttags.snapshotLength > 0 && coord.length > 0) {
			td2.innerHTML +=
				'<form action="'+shost+'" method=post target="_milos" id="milos_form">'+
				'<input type=hidden name="coord" value="'+escape(coord)+'">'+
				'<input type=hidden name="oinfo" value="'+escape(oinfo)+'">'+
				'<input type=hidden name="zname" value="'+escape(zname)+'">'+
				'<input type=hidden name="pname" value="'+escape(pname)+'">'+
				'<input type=hidden name="prank" value="'+escape(prank)+'">'+
				'<input type=hidden name="aname" value="'+escape(aname)+'">'+
				'<input type=hidden name="login" value="'+escape(login)+'">'+
				'<input type=hidden name="passw" value="'+escape(passw)+'">'+
				'<input type=hidden name="allid" value="'+escape(allid)+'">'+
				'<input type=hidden name="debris" value="'+escape(debris)+'">'+
				'<input type=hidden name="plaid" value="'+escape(plaid)+'"></form>';
		} else {
			td2.innerHTML +=
				'<form action="'+shost+'" method=post target="_milos" id="milos_form">'+
				'<input type=hidden name="login" value="'+escape(login)+'">'+
				'<input type=hidden name="passw" value="'+escape(passw)+'">'+
				'<input type=hidden name="debris" value="'+escape(debris)+'">'+
				'<input type=hidden name="emptycoord" value="'+escape(emptycoord)+'"></form>';
		}
		ttags2.snapshotItem(0).insertBefore(td2, ttags2.snapshotItem(0).firstChild);
		ttags2.snapshotItem(0).insertBefore(td,  ttags2.snapshotItem(0).firstChild);
		//
		ttags = xpath('/html/body').snapshotItem(0);
		var script = document.createElement('script');
		script.setAttribute("language", "JavaScript");
		script.innerHTML =
			'function next(e) {'+'\n'+
			'	try {'+'\n'+
			'		var temp = e.split(\':\');'+'\n'+
			'		document.getElementById("milos_form").submit();'+'\n'+
			'		if (temp[1] != "GalaxieTool")'+'\n'+
			'			document.getElementById("div_frame").style.visibility = "visible";'+'\n'+
			'		setTimeout("cargado(\'"+temp[0]+"\');",4000);'+'\n'+
			'	} catch(e) {'+'\n'+
			'		alert(e);'+'\n'+
			'	}'+'\n'+
			'}'+'\n'+
			'function hide(e) {'+'\n'+
			'	document.getElementById("div_frame").style.visibility = "hidden";'+'\n'+
			'}'+'\n'+
			'function cargado (e) {'+'\n'+
			'	if (e == "l") {'+'\n'+
			'		galaxy_submit(\'systemLeft\');'+'\n'+
			'	} else if (e == "r") {'+'\n'+
			'		galaxy_submit(\'systemRight\');'+'\n'+
			'	}'+'\n'+
			'}'+'\n'+
			'next("1:GalaxieTool")';
		ttags.appendChild(script);
	}
} catch (e) {
}