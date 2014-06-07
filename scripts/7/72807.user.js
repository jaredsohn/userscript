// ==UserScript==
// @name           Status
// @namespace      11235813[Bande:Dritteliga Penner]
// @description    Zeigt Spenden , eingehende Angriffe und neue Nachrichten an.
// @include        http://*pennergame*
// @exclude      http://*game*login*
// @exclude      *board*
// @require		   http://dabei.kilu.de/script.class.js
// ==/UserScript==
target = buildNavi();
getOV(target);


function buildNavi() {
	document.getElementById("header").style.background = "transparent url(http://dabei.kilu.de/bg_header.gif) repeat scroll 0 0";
    document.getElementById("header").style.height = "142px";
	var opts = document.getElementsByClassName("zclear zleft-childs")[0];
	opts.style.padding = "12px 0 0 29px";
	return opts.parentNode;
}
function fillData(spenden,msgs,inc) {
	
	var ul = document.createElement("ul");
	ul.id = "options";
	ul.style.padding = "12px 0 0 29px";
	ul.className = "zclear zleft-childs";
	var li = document.createElement("li");
	li.className = "icon money";
	li.innerHTML = '<a class="ttip" rel="Du hast heute schon soviele Spenden erhalten." href="/overview/">'+getSpenden(spenden[0])+'<span>/</span>'+getSpenden(spenden[1])+' </a>';
	ul.appendChild(li);
	if(msgs != false) {
	var li = document.createElement("li");
	li.className = "icon book";
	li.innerHTML ='<a class="ttip" rel="Neue Nachrichten!" href="/messages/">['+msgs+']</a>';
	ul.appendChild(li);
	}
	if(inc[0] != 0 ) {
	var li = document.createElement("li");
	li.className = "icon fight";
	li.innerHTML ='<a class="ttip" rel="KÃ¤mpfe" href="/fight/">['+inc[0]+'|'+inc[1]+']</a>';
	ul.appendChild(li);
	}
	
	return ul;
}
function getSpenden(spenden) {
	if(spenden>=50) {
		return '<span style="color:#FF0000">'+spenden+'</span>';
	} else {
		return '<span style="color:#00FF00">'+spenden+'</span>';
	}
}
function getOV(target) {
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://'+document.location.hostname+'/overview/',
    onload: function(responseDetails) {
		var cont = responseDetails.responseText;
		var spenden = cont.match(/Du hast heute (\d+) Spenden erhalten, kannst heute also noch (\d+) Spenden bekommen./);
		var max_s = parseInt(spenden[1])+parseInt(spenden[2]);
		spende = [spenden[1],max_s];
		var msgs = cont.match(/\/img\/overview\/new_msg.gif/) ? cont.match(/\/img\/overview\/new_msg.gif.*\[(\d+)\]/)[1] : false;
		getFI(target,spende,msgs);
	}
					  });
}
function getFI(target,spende,msgs) {
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://'+document.location.hostname+'/fight/',
    onload: function(responseDetails) {
		var cont = responseDetails.responseText;
		if(cont.match(/http:\/\/.*pennergame.de\/img.*\/dots\/warning.gif/)) {
			var tbl = cont.split('<td><strong>Ausweichen</strong></td>')[1].split('</table>')[0];
			var ids = tbl.match(/id:(\d+)/g);
			var names = tbl.match(/">(.*?)<\/a/g);
			var ids = matchArrayVal(ids,/\d+/,0);
			var names = matchArrayVal(names,/>(.*?)</,1);
			var oldnames = GM_getValue("incoming_fights",Array());
			var oldnames = oldnames.split(';');
//alert(oldnames);
			var news = arrayCompare(ids,oldnames);
			GM_setValue("incoming_fights",ids.join(';'));
			if(news.length != 0) {
				msg ='';
				for(var i=0;i<news.length;i++) {
					msg += 'ID:'+news[i][0]+'   NAME:'+names[news[i][1]]+'\n';
				}
				//alert(msg);
			}
			var time = ids.length;
			if(oldnames.length != ids.length) {
				try {
				//window.open('http://www.youtube.com/watch?v=osXKyCGljuE','_blank');
				} catch(e) {
					alert('Fight!');
				}
			}
			try{
				var ausw = tbl.match(/Ausweichen/g).length;
			} catch(e) {
				var ausw = 0;
			}			
			notify(time,ausw,news.length);
			el = fillData(spende,msgs,[time,ausw]);
			target.appendChild(el);
			
		} else {
			notify(0,0,0);
			el = fillData(spende,msgs,[0,0]);
			target.appendChild(el);
			
		}
	}
					  });
}
function isInArray(array,value) {
	if(typeof(array=='string')) {
		if (array == value) {
			return true;
		} else {
			return false;
		}
	} else {
	for(var i=0;i<array.length;i++) {
		if(array[i]==value) return true;
	}
	return false;
	}
}
function matchArrayVal(array,regexp,ind) {
	var arr = new Array();
	for(var i=0;i<array.length;i++) {
		var akt = array[i];
		var akt_t = akt.match(regexp)[ind];
		arr.push(akt_t);
	}
	return arr;
}
function arrayCompare(arr1,arr2) {
	var arr = new Array();
	//alert(arr1+'\n'+arr2);
	for(var i = 0;i<arr1.length;i++) {
		//alert(arr2+'\n'+arr1[i]);
		if(isInArray(arr2,arr1[i])) {} else {
			arr.push(Array(arr1[i],i));
		}
	}
	return arr;
}
function notify(time,aus,neue) {
	var div = document.getElementById('notifyme');
	div.style.top = '123px';
	div.style.fontWeight = 'bold';
	var div = document.getElementById('ntext');
	div.innerHTML += time+' eingehende Angriffe<br>';
	div.innerHTML += aus+' Ausweichbar<br>';
	div.innerHTML += neue+' neue Angriffe<br>';
}