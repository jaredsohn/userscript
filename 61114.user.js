// ==UserScript==
// @name           SLEKI TTS
// @namespace      SLEKI TTS
// @version 1.0
// @description    Travian Tools Script
// @include        http://*.travian.*/*
// @exclude        http://forum.travian*.*
// ==/UserScript==

var uri;

function init()
{
	var div = document.createElement("div");
	div.innerHTML = '<div id="myinfo" style="z-index:909090;border:1px solid #000000; background:#FFFFFF; position:absolute; width:300px; top:2px; left:910px; padding:2px; margin:2px;"></div>';
	document.body.insertBefore(div, document.body.firstChild);
	uri = String(location);
	if (uri.indexOf('dorf1.php') > -1) { resMon(); }
	vill();
}

function vill()
{
	var a = document.evaluate("//table[@id='vlist']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	//alert(a);
	//var cel = new Array();
	var h = a.snapshotItem(0);
	//alert(document);
	var cox = document.evaluate("//div[@class='cox']",h,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var coy = document.evaluate("//div[@class='coy']",h,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i = 0; i < cox.snapshotLength; i++) {
		kx = cox.snapshotItem(i).innerHTML.replace('(','');
		ky = coy.snapshotItem(i).innerHTML.replace(')','');	
		dv = document.createElement('span'); dv.innerHTML='<a href="a2b.php?x='+kx+'&y='+ky+'">Kirim Pasukan</a> | <a href="build.php?gid=17&x='+kx+'&y='+ky+'">Pasar</a>';
		cox.snapshotItem(i).parentNode.appendChild(dv);
		//alert(cox.snapshotItem(i).parentNode.innerHTML);
	}
	/*
	for(i=1;i<h.length;i++) {
		var str = String(h[i]);
		lk = str.split("?");
		n = String(lk[1]).split('&');
		if (n == 'undefined' || n == null) { links = lk[1]; }
		else { links=n[0]; }
		nd = links.split('=');
		tbl = h[i].parentNode.parentNode;
		cel = tbl.insertCell(tbl.cells.length);
		cel.innerHTML='<div onClick="location.assign(\'a2b.php?z='+nd[1]+'\')">A</a>';
		//alert(tbl.cells.length);
		//r1 = row.insertCell(0); r1.innerHTML=''+nd[1];
	}
	*/
}
function resMon()
{
	var a = document.evaluate("//table[@id='production']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	tbl = a.snapshotItem(0).getElementsByTagName('tr');
	var res = new Object();
	for(i=1;i<tbl.length;i++) {
		td = tbl[i].getElementsByTagName('td');
		var v = td[1].innerHTML.replace(':','');
		switch(v) {
			case 'Kayu' : 
				res['kayu'] = parseInt(td[2].innerHTML);
			break;
			case 'Liat' : 
			case 'Tanah Liat':
				res['liat'] = parseInt(td[2].innerHTML);
			break;
			case 'Besi' : 
				res['besi'] = parseInt(td[2].innerHTML);
			break;
			case 'Gandum' : 
			case 'Tanaman' :
				res['gandum'] = parseInt(td[2].innerHTML);
			break;
		}
		//var res[v] = parseInt(td[2].innerHTML);
		//alert(parseInt(td[2].innerHTML));
	}
	
	//alert(tbl[0].innerHTML);
	//alert(res['kayu']);
	//res['gandum'] = -10000;
	var minusCrop = res['gandum'] < 1 ? 'red' : '';
	//res['gandum'] = res['gandum'] < 0 ? Math.abs(res['gandum']) : res['gandum'];
	var mytime = new Date(); 
	document.getElementById('myinfo').innerHTML='<b>Penuh dalam:</b><br /><table width="100%" cellpadding="2" cellspacing="1">'
	+'<tr><td>Kayu:</td><td id="sl_kayu"></td></td><td id="jam_kayu"></td></tr>'
	+'<tr><td>Liat:</td><td id="sl_liat"></td><td id="jam_liat"></td></tr>'
	+'<tr><td>Besi:</td><td id="sl_besi"></td><td id="jam_besi"></td></tr>'
	+'<tr><td style="color:'+minusCrop+'">Gandum:</td><td id="sl_gandum"></td><td id="jam_gandum"></td></tr>'
	+'</table>';
	
	
	
	window.setInterval(function(){
		var b = document.evaluate("//div[@id='res']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		tbl = b.snapshotItem(0).getElementsByTagName('tr');
		tr = tbl[0].getElementsByTagName('td');
		var k = tr[1].innerHTML.split('/');
		var l = tr[3].innerHTML.split('/');
		var b = tr[5].innerHTML.split('/');
		var g = tr[7].innerHTML.split('/');
		
		var kayu = (parseInt(k[1]) - parseInt(k[0]) ) / res['kayu'];
		var liat = (parseInt(l[1]) - parseInt(l[0]) ) / res['liat'];
		var besi = (parseInt(b[1]) - parseInt(b[0]) ) / res['besi'];
		if (res['gandum'] > 0) {
			var gandum = (parseInt(g[1]) - parseInt(g[0]) ) / res['gandum'];
		} else { 
			var gandum = (parseInt(g[0]) ) / Math.abs(res['gandum']);
		}
		
		var jamKayu = new Date();
		jamKayu.setTime(mytime.getTime() + (Math.round(kayu * 10) / 10 * 3600 * 1000));
		
		var jamLiat = new Date();
		jamLiat.setTime(mytime.getTime() + (Math.round(liat * 10) / 10 * 3600 * 1000));
		
		var jamBesi = new Date();
		jamBesi.setTime(mytime.getTime() + (Math.round(besi * 10) / 10 * 3600 * 1000));
		
		var jamGandum = new Date();
		jamGandum.setTime(mytime.getTime() +  (Math.round(gandum * 10) / 10 * 3600 * 1000));
		
		document.getElementById('sl_kayu').innerHTML=Math.round(kayu);
		document.getElementById('jam_kayu').innerHTML=' '+ jamKayu.getHours() +':'+ jamKayu.getMinutes() + ' ('+jamKayu.getDate() + '/' + jamKayu.getMonth()+')';
		
		document.getElementById('sl_liat').innerHTML=Math.round(liat);
		document.getElementById('jam_liat').innerHTML=' '+ jamLiat.getHours() +':'+ jamLiat.getMinutes() + ' ('+jamLiat.getDate() + '/' + jamLiat.getMonth()+')';
		
		document.getElementById('sl_besi').innerHTML=Math.round(besi);
		document.getElementById('jam_besi').innerHTML=' '+ jamBesi.getHours() +':'+ jamBesi.getMinutes() + ' ('+jamBesi.getDate() + '/' + jamBesi.getMonth()+')';
		
		document.getElementById('sl_gandum').innerHTML=Math.round(gandum);
		document.getElementById('jam_gandum').innerHTML=' '+ jamGandum.getHours() +':'+ jamGandum.getMinutes()  + ' ('+jamGandum.getDate() + '/' + jamGandum.getMonth()+')';
	},1000);
}

window.addEventListener( 'load', init, false);
