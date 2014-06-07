// ==UserScript==
// @name          HWM_Map_Move
// @homepage      http://hwm.xo4yxa.ru/js/mapmove/
// @include       http://www.heroeswm.ru/map.php*
// @include       http://www.heroeswm.ru/move_sector.php*
// ==/UserScript==

var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;
var ems = getI( "//embed[@name='map']" ).snapshotItem(0) ;
/*
0 - cur place
1 - view place
2-10 - have move
11 - gO
12 - gV
13 - gN
14 - loc from move (only move)
15 - last time move (only move)
16 - all time move (only move)
17 - ?
18 - clan id
19 - ?
20 - ?
*/
var pl =  ems.getAttribute('FlashVars').split('=')[1].split(':') ;
var road = new Array() ;
ems.width = 500;

//StartMy
var s = 120;
var d = 169;
var f = 100000;

var lang = 0;
var modifyMode = false;
var modifing = false;
var from;
var to;
var newPath;
var newPathLength;

var E = new Array
(	// 	0	1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	
	[],
	[[	f,	f,	s,	s,	d,	s,	f,	d,	s,	f,	f,	d,	d,	f,	f,	f,	f,	f,	f], [	'Empire Capital' ,		'\u0421\u0442\u043e\u043b\u0438\u0446\u0430 \u0418\u043c\u043f\u0435\u0440\u0438\u0438' ]],
	[[	f,	s,	f,	d,	s,	d,	f,	f,	f,	f,	f,	s,	f,	f,	f,	f,	f,	f,	f], [	'East River' ,			'\u0412\u043e\u0441\u0442\u043e\u0447\u043d\u0430\u044f \u0420\u0435\u043a\u0430' ]],
	[[	f,	s,	d,	f,	s,	f,	s,	f,	d,	d,	f,	f,	s,	f,	f,	f,	f,	f,	f], [	'Tiger\'s Lake' ,		'\u0422\u0438\u0433\u0440\u0438\u043d\u043e\u0435 \u041e\u0437\u0435\u0440\u043e' ]] ,
	[[	f,	d,	s,	s,	f,	f,	d,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f], [	'Rogue\'s Wood' ,		'\u041b\u0435\u0441 \u0420\u0430\u0437\u0431\u043e\u0439\u043d\u0438\u043a\u043e\u0432' ]] ,
	[[	f,	s,	d,	f,	f,	f,	f,	s,	d,	f,	s,	s,	f,	f,	f,	f,	f,	f,	f], [	'Wolf\'s Dale' ,		'\u0414\u043e\u043b\u0438\u043d\u0430 \u0412\u043e\u043b\u043a\u043e\u0432' ]] ,
	[[	f,	f,	f,	s,	d,	f,	f,	f,	f,	s,	f,	f,	d,	f,	f,	f,	f,	f,	f], [	'Peaceful Camp' ,		'\u041c\u0438\u0440\u043d\u044b\u0439 \u041b\u0430\u0433\u0435\u0440\u044c' ]] ,
	[[	f,	d,	f,	f,	f,	s,	f,	f,	s,	f,	d,	f,	f,	f,	f,	f,	f,	f,	f], [	'Lizard\'s Lowland' ,	'\u0420\u0430\u0432\u043d\u0438\u043d\u0430 \u042f\u0449\u0435\u0440\u043e\u0432' ]] ,
	[[	f,	s,	f,	d,	f,	d,	f,	s,	f,	f,	f,	f,	s,	d,	f,	f,	f,	f,	f], [	'Green Wood' ,			'\u0417\u0435\u043b\u0435\u043d\u044b\u0439 \u041b\u0435\u0441' ]] ,
	[[	f,	f,	f,	d,	f,	f,	s,	f,	f,	f,	f,	f,	s,	d,	f,	f,	f,	f,	f], [	'Eagle\'s Nest' ,		'\u041e\u0440\u043b\u0438\u043d\u043e\u0435 \u0413\u043d\u0435\u0437\u0434\u043e' ]] ,
	[[	f,	f,	f,	f,	f,	s,	f,	d,	f,	f,	f,	d,	f,	f,	f,	f,	f,	f,	f], [	'Portal\'s Ruins' ,		'\u0420\u0443\u0438\u043d\u044b \u041f\u043e\u0440\u0442\u0430\u043b\u0430' ]] ,
	[[	f,	d,	s,	f,	f,	s,	f,	f,	f,	f,	d,	f,	f,	f,	d,	f,	f,	f,	f], [	'Dragon\'s Caves' ,		'\u041f\u0435\u0449\u0435\u0440\u044b \u0414\u0440\u0430\u043a\u043e\u043d\u043e\u0432' ]] ,
	[[	f,	d,	f,	s,	f,	f,	d,	f,	s,	s,	f,	f,	f,	s,	f,	f,	f,	f,	f], [	'Shining Spring' ,		'\u0421\u0438\u044f\u044e\u0449\u0438\u0439 \u0420\u043e\u0434\u043d\u0438\u043a' ]] ,
	[[	f,	f,	f,	f,	f,	f,	f,	f,	d,	d,	f,	f,	s,	f,	f,	f,	f,	f,	f], [	'Sunny City' ,			'\u0421\u043e\u043b\u043d\u0435\u0447\u043d\u044b\u0439 \u0413\u043e\u0440\u043e\u0434' ]] ,
	[[	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	d,	f,	f,	f,	s,	f,	f,	f], [	'Magma Mines' ,		'\u041c\u0430\u0433\u043c\u0430 \u0428\u0430\u0445\u0442\u044b' ]] ,
	[[	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	s,	f,	s,	f,	s], [	'Bear Mountain' ,		'\u041c\u0435\u0434\u0432\u0435\u0436\u044c\u044f \u0413\u043e\u0440\u0430' ]] ,
	[[	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	s,	f,	f,	d], [	'Fairy Trees' ,		'\u041c\u0430\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u041b\u0435\u0441' ]] ,
	[[	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	s], [	'Port City' ,			'\u041f\u043e\u0440\u0442\u043e\u0432\u044b\u0439 \u0413\u043e\u0440\u043e\u0434' ]] ,
	[[	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	f,	s,	d,	s,	f], [	'Mythril Coast' ,		'\u041c\u0438\u0444\u0440\u0438\u043b\u043e\u0432\u044b\u0439 \u0411\u0435\u0440\u0435\u0433' ]]
);

var pd = find(pl[0]);

for (var i = 1; i < E.length; i++) {
	if (i == pl[0]) {continue;}
	var aw;
	var nP = [pl[0]];
	if ((aw = GM_getValue(pl[0] + "." + i, 0)) != 0) {
		aw = pl[0];
		while (aw != i) {
			if (GM_getValue(aw + "." + i, 0) == 0) {
				aw = find(aw)[0][i][1];
			} else {
				aw = GM_getValue(aw + "." + i, 0);
			}
			nP[nP.length] = aw;
		}
		pd[0][i] = nP;
		var t = 0;
		for (var j = 0; j < nP.length - 1; j++) {
			t += w(nP[j], nP[j + 1]);
		}
		d[i] = t;
	}
}

function find(a) {
	var d = new Array();
	var p = new Array();
	var U = new Array();
	var v;
	for (var i = 1; i < E.length; i++) {
		d[i] = (i == a)?(0):(f);
		U[i] = 0;
	}
	p[a] = [a];
	
	while ((v = isNoVizit(U,d)) != 0) {
		U[v] = 1;
		for (var u = 1; u < E.length; u++) {
			if (U[u] == 0 && w(v, u) < f) {
				if (d[u] > d[v] + w(v, u)) {
					d[u] = d[v] + w(v, u);
					p[u] = p[v].concat([u]);
				}
			}
		}
	}
	return [p, d];
}

function isNoVizit(U, d) {
	var min = f;
	var minI = 0;
	for (var i = 1; i < U.length; i++) {
		if (U[i] == 0 && d[i] < f) {
			if (d[i] < min) {
				min = Math.min(min, d[i]);
				minI = i;
			}
		}
	}
	return (min == f) ? 0 : minI;
}

function w(i, j) {
	return E[i][0][j];
}
//EndMy
 
var dm = document.createElement( 'div' );
dm.innerHTML = '<table>' +
'<tr>' +
'<td></td>' + 
'<td id="loc_9"></td>' + 
'<td id="loc_6"></td>' +
'<td></td>' +
'<td id="loc_16"></td>' +
'<td></td>' +
'</tr>' +
'<tr>' +
'<td id="loc_13"></td>' + 
'<td id="loc_12"></td>' + 
'<td id="loc_3"></td>' +
'<td id="loc_4"></td>' +
'<td id="loc_15"></td>' +
'<td id="loc_18"></td>' +
'</tr>' +
'<tr>' +
'<td></td>' + 
'<td id="loc_8"></td>' + 
'<td id="loc_1"></td>' +
'<td id="loc_2"></td>' +
'<td id="loc_14"></td>' +
'<td id="loc_17"></td>' +
'</tr>' +
'<tr>' +
'<td></td>' + 
'<td id="loc_7"></td>' + 
'<td id="loc_5"></td>' +
'<td id="loc_11"></td>' +
'<td></td>' +
'<td></td>' + 
'</tr>' +
'<tr>' +
'<td></td>' + 
'<td></td>' + 
'<td id="loc_10"></td>' +
'<td></td>' +
'<td></td>' + 
'<td></td>' +
'</tr>' +
'</table> ' +
'<div><label for="id_check_go" style="cursor:pointer;"><input type="checkbox" id="id_check_go"> \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430 \u043f\u0440\u0438 \u043e\u0445\u043e\u0442\u0435</lable></div>' +
'<div><label for="id_check_gn" style="cursor:pointer;"><input type="checkbox" id="id_check_gn"> \u0441\u0434\u0430\u0432\u0430\u0442\u044c \u0437\u0430\u0434\u0430\u043d\u0438\u044f \u0413\u041d</lable></div>' +
//'<br><div><label for="modify" style="cursor:pointer;"><input type="checkbox" id="id_modify"/>MM</lable><br/><font id="id_modify_font"></font></div>' +
'';

if (url_cur.indexOf('map.php') > -1) {
	if (GM_getValue("move")) {
		getCXY() ;
	} else {
		init();
	}
} else if (url_cur.indexOf('move_sector.php') > -1) {
	init();
}

function init() {
//$('map').style.display = "none";
	var el = ems;
	nado = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	if (pl[14] > 0) {
		if (GM_getValue("move_mz") == 0) {
			place = E[pl[0]][1][lang] ;
		} else {
			place = E[GM_getValue("move_mz")][1][lang];
		}
		div = document.createElement('div');
		div.innerHTML = '<br><div id="hint_move">\u041a\u043e\u043d\u0435\u0447\u043d\u044b\u0439 \u043f\u0443\u043d\u043a\u0442 \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f <b>' + place + '</b> [<a href="javascript: void(0)" id="a_stop_move">stop</a>]</div>';
		nado.appendChild(div);
		var a = $('a_stop_move');
		a.addEventListener("click", setStop , false );
		
		var start_time = new Date() ;
		update_time(start_time.getTime());
	} else {
		nado.appendChild( dm );

		var check_go = $('id_check_go');
		check_go.checked = (GM_getValue("checkgo", false)) ? 'checked' : '';
		check_go.addEventListener("click", setCheckGo , false);
		
        var check_gn = $('id_check_gn');
        check_gn.checked = (GM_getValue('checkgn', false)) ? 'checked' : '';
        check_gn.addEventListener("click", setCheckGn, false);
		
		
//		var m = $('id_modify');
//		m.addEventListener("click", modify , false);		

		for (var l = 1 ; l < E.length; l++ ) {
			var d = $('loc_' + l) ;
			d.style.textAlign = 'center';
			d.style.padding = '2px 4px';
			d.style.fontSize = '11px';
			d.style.border = '1px solid #abc';
			if (l == pl[0]) {
				d.style.fontWeight = 'bold';
				d.style.backgroundColor = 'FFF8DC' ;
				if(pl[13] != 0 && l == pl[13]) {
					d.style.color = 'FF0000';
				}
				d.innerHTML = E[l][1][lang];
			} else {
				a = document.createElement( 'a' );
				a.style.fontSize = '11px';
				a.href = 'javascript: void(0)';
				if (pl[13] != 0 && l == pl[13]) {
					a.style.color = 'FF0000';
				}
				a.innerHTML = E[l][1][lang];
				a.setAttribute( 'tZ' , l );

				a.addEventListener( "mouseover", viewPath , false );
				a.addEventListener( "mouseout", hidePath , false );

				a.addEventListener( "click", setMXY , false );
				a.title = E[l][1][lang] + ' (' + getTimeL(l) + ')';
				d.appendChild( a );
			}
			
			if (pl[13] == -1 && (l == 2 || l == 6)) {
				b = document.createElement( 'b' );
				b.style.color = '#00F';
				b.innerHTML = ' X';
				d.appendChild( b );
			}
		}
	}
}

function update_time(start) {
	new_time=new Date();
	s=pl[15]-Math.round((new_time.getTime()-start)/1000.);
	m=0;h=0;
	if (s >= 0) {
		if (s > 59) {
			m = Math.floor(s / 60);
			s -= m*60;
		}
		if (m > 59) {
			h = Math.floor(m / 60);
			m -= h*60;
		}
		if (s < 10) {
			s = "0" + s;
		}
		if (m < 10) {
			m = "0" + m;
		}
		document.title = /*"\u041f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u0435 \u0432 " + */E[pl[0]][1][lang]  + " ["+m+":"+s+"]";
		setTimeout( function(){ update_time(start)}, 1000);
	}
}

function move(mz) {
	var cz = pl[0];
	if (pl[14] != 0) {
		init();
		return ;
	}
	if (mz == cz) {
		GM_setValue("move", false);
		GM_setValue("move_mz" , 0);
		if (pl[13] == -1 && ( cz == 2 || cz == 6 ) && GM_getValue('checkgn', false)) {
			window.location.href = url + 'mercenary_guild.php';
		}
		init();
		return ;
	}

	if (pl[11] != '' && GM_getValue("checkgo")) {
		GM_setValue("move" , false);
		GM_setValue("move_mz" , 0);
		return ;
	}
	
	//My
	var path = GM_getValue(cz + "." + mz, 0);
	if (path != 0) {
		//alert("Not default way");
		window.location.href = url + 'move_sector.php?id=' + path;
	}
	
	window.location.href = url + 'move_sector.php?id=' + pd[0][mz][1];
	//EndMy
}


function setMXY() {
	if (modifyMode) {
		var tz = this.getAttribute('tz');
		if (modifing) {
			if (newPath[newPathLength - 1] == tz) {
				$('loc_' + newPath[newPathLength - 1]).style.backgroundColor = 'DDD9CD' ;
				newPathLength--;
			} else {
				if (!isIn(tz, newPath, newPathLength)) {
					if (w(newPath[newPathLength - 1], tz) < f && tz != to) {
						newPath[newPathLength] = tz;
						newPathLength++;
						$('loc_' + tz).style.backgroundColor = 'F0E68C' ;
					} else if (tz == to) {
							var sumTime = 0;
							for (var i = 0; i < newPathLength - 1; i++) {
								sumTime += w(newPath[i], newPath[i + 1]);
							}
							if (w(newPath[newPathLength - 1], tz) == f) {
								sumTime += find(newPath[newPathLength - 1])[1][to];
							}
							if (sumTime > pd[1][to]) {
								if (confirm('More time?')) {
									save();
									alert('Saved');
									
									clear();
								} else {
									newPathLength--;
								}
							} else if (confirm('Save?')) {
								save();
								alert('Saved');
								
								clear();
								
							} else {
								newPathLength--;
							}
					} else { 
						alert("Ups. No way");
					}
				} else {
					alert("Ring");
				}
			}
		} else {
			modifing = true;
			from = pl[0];
			to = tz;
			newPath = [from];
			newPathLength = 1;
			hidePath();
		}
		update();
	} else {
		GM_setValue("move_mz" , this.getAttribute('tz'));
		GM_setValue("move", true);
		getCXY();
	}
}

function save() {
	for (var i = 0; i < newPathLength - 1; i++) {
		GM_setValue(newPath[i] + "." + to, newPath[i + 1]);
	}
}

function isIn(el, arr, length) {
	for (var i = 0; i < length; i++) {
		if (el == arr[i]) {
			return true;
		}
	}
	return false;
}

function update() {
	if (modifyMode) {
		$('id_modify_font').innerHTML = "Now updating path " + E[from][1][lang] + " -> " + E[to][1][lang] + ": ";
		for (var i = 0; i < newPathLength - 1; i++) {
			$('id_modify_font').innerHTML += E[newPath[i]][1][lang] + " -> ";
		}
		$('id_modify_font').innerHTML += E[newPath[newPathLength - 1]][1][lang];
	} else {
		$('id_modify_font').innerHTML = "";
	}
}

function clear() {
	for( i = 0; i < E.length ; i++) {
		$('loc_'+newPath[i]).style.backgroundColor = 'DDD9CD' ;
	}
	modifing = false;
	modifyMode = false;
	$('id_modify').checked = false;
}

function getCXY() {
	move(GM_getValue("move_mz"));
}


function setStop() {
	GM_setValue("move", false);
	GM_setValue("move_mz", 0);
	$('hint_move').innerHTML = 
	'\u041a\u043e\u043d\u0435\u0447\u043d\u044b\u0439 \u043f\u0443\u043d\u043a\u0442 \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f <b>' + 
	E[pl[0]][1][lang] + 
	'</b>';
}


function setCheckGo() {
	if (GM_getValue("checkgo")) {
		GM_setValue( "checkgo" , false );
	} else {
		GM_setValue( "checkgo" , true );
	}
}

function setCheckGn(){
    if (GM_getValue('checkgn', false)) {
        GM_setValue('checkgn', false);
    } else {
        GM_setValue('checkgn', true);
    }
}


function getTimeL(mz) {
	var myT = new Date(pd[1][mz] * 1000)
	return myT.getMinutes() + ':' + ((myT.getSeconds() < 10)?('0'):('')) + myT.getSeconds() ;
}

function viewPath() {
	if (modifing) {return;}
	var mz = this.getAttribute( 'tz' ) ;
	for (var i = 1; i < pd[0][mz].length; i++) {
		var td = $('loc_' + pd[0][mz][i]);
		td.style.backgroundColor = 'F0E68C' ;
		road[road.length] = pd[0][mz][i];
	}
}

function hidePath() {
	//if (modifing) {return;}
	for( i = 0; i < road.length ; i++) {
		$('loc_'+road[i]).style.backgroundColor = 'DDD9CD' ;
	}
	road = new Array() ;
}

function modify() {
	if (modifyMode) {
		update();
		clear();
		window.location.reload(true);
	}
	modifyMode = !modifyMode;
}

function getI(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function $(id) { 
	return document.getElementById(id); 
}