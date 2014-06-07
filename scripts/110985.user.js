// ==UserScript==
// @name           VU_ispotaly
// @version        2.01
// @namespace      vegzetur
// @include        http://*.vegzetur.hu/index.php*
// ==/UserScript==

var version = "2.01";

//Thnx to Jerikó a kóddarabért!
function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}
var ver_check = GM_getValue("ver_check",0);
var most = Math.floor(new Date().getTime()/1000/3600/24);
if (most > ver_check) {
var url = 'http://userscripts.org/scripts/source/110985';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/110985');
		alert ("Van újabb ispotaly verzió!\nHozzá tartozó lapot megnyitottam!");
	 }	
   });
   GM_setValue("ver_check", Math.round(most));
}

function strpos(needle, hay) { 
     if (!hay) return false; 
     return hay.indexOf(needle)!=-1;
}

function getByClass(tag, classname){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) {
			items.push(elems[i]);
		}
	}
	return items;
}

function getFirstByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0];
}

function id(elem){
	return document.getElementById(elem);
}

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

function click_gyogyit() {
	if (!magassebgyogy && !autogyogyit){
		id=select[select.selectedIndex].value;
		GM_setValue(azonosito+'_id',id);
	}
	if (!autogyogyit){GM_setValue(azonosito+'_autogyogyit',true);}
	else{
		GM_setValue(azonosito+'_autogyogyit',false);
		GM_setValue(azonosito+'_id',0);
	}
	window.location.reload();
}

var username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
var vilag = strcut('//','.',window.location.href);
var azonosito = vilag + "_" + username
var autogyogyit = GM_getValue(azonosito+'_autogyogyit',false);
var now = (new Date()).getTime();

if(strpos('allatok',window.location.href)){
	allatlista = getFirstByClass('div','allatok');
	sorok = allatlista.getElementsByTagName('tr');
	allatok = [];
	for (i=0; i<sorok.length; i++){
		if (strpos('<span>Gyógyítás</span>',sorok[i].innerHTML)){
			var nev = sorok[i].getElementsByTagName('img')[0].alt;
			var id = parseInt(sorok[i].innerHTML.split('allat=')[1]);
			allatok.push({nev: nev,	id: id});
			var magassebgyogy=false;
		}
		if (strpos('>Gyógyítani jelölöm<',sorok[i].innerHTML)){
			var nev = sorok[i].getElementsByTagName('img')[0].alt;
			var id = parseInt(sorok[i].innerHTML.split('allat=')[1]);
			allatok.push({nev: nev,	id: id});
			var magassebgyogy=true;
		}
	}
	
	jobb = document.getElementById('jobb');
	if (allatok.length>1 && jobb.innerHTML.match('>Gyógyítani jelölöm<')){
		id = "";
		for (i=0; i<allatok.length; i++){
			if (i != allatok.length-1) {
				id += allatok[i].id;
				id += ",";
			}
			else {id += allatok[i].id;}
		}
	}
	if (allatok.length==1 && jobb.innerHTML.match('>Gyógyítani jelölöm<')){id = allatok[0].id;}

	uzik = getByClass('div','message_center');
	for (i=0; i<uzik.length; i++){
		if (uzik[i].innerHTML.match('Újra gyógyíthatsz') || uzik[i].innerHTML.match('állat éppen gyógyul')){
			timercontent = uzik[i].getElementsByTagName("span")[0].textContent;
			timeto = (parseInt(timercontent.split(':')[0]*60)+parseInt(timercontent.split(':')[1]));
			timer=true;
			nextrun = now+timeto*1000+" ";
			GM_setValue(azonosito+'_nextrun',nextrun);
			i=uzik.length;
		}
		else {timer=false;}
	}
	
	if(timer && autogyogyit){
		div = document.createElement('div'); 
		div.className = "message_center";
		a = document.createElement('a'); 
		a.addEventListener('click', click_gyogyit, true);
		a.className='gomblink';
		a.setAttribute('style','margin-top: 10px; cursor: pointer');
		div.appendChild(a);
		aspan = document.createElement('span'); 
		aspan.innerHTML = "Gyógyítás STOP";
		a.appendChild(aspan);
		getFirstByClass('div', 'allatok').insertBefore(div, getFirstByClass('div', 'text'));	
	}
	
	if (allatok.length>0){
		div = document.createElement('div'); 
		div.className = "message_center";
		
		if (!autogyogyit){
			if (!magassebgyogy){
				select = document.createElement('select');
				select.id = "gyogyitando";
				div.appendChild(select);
				for (i=0; i<allatok.length; i++){
					option = document.createElement('option');
					option.value=allatok[i].id;
					option.innerHTML=allatok[i].nev;
					select.appendChild(option);
				}
				span = document.createElement('span'); 
				span.innerHTML = " állatom folyamatos gyógyításra jelölöm!";
			}
			else {
				span = document.createElement('span'); 
				span.innerHTML = "Az állataim folyamatosan gyógyítom!";
			}
			div.appendChild(span);
			a = document.createElement('a'); 
			a.addEventListener('click', click_gyogyit, true);
			a.className='gomblink';
			a.setAttribute('style','margin-top: 10px; cursor: pointer');
			div.appendChild(a);
			aspan = document.createElement('span'); 
			aspan.innerHTML = "Gyógyítás START";
			a.appendChild(aspan);	
		}
		if (autogyogyit){
			if (magassebgyogy){
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://'+vilag+'.vegzetur.hu/index.php?m=allatok',
					headers:{'Content-type':'application/x-www-form-urlencoded'},
					data: encodeURI('allatok_gyogyit='+id+'&tev=tobb_gyogyit')
				});
				window.location.reload();
			}
			else {
				id=GM_getValue(azonosito+'_id',0);
				vanilyen=false;
				for (i=0; i<allatok.length; i++){
					if (allatok[i].id==id){vanilyen=true;}
				}
				if (vanilyen){
					window.location.href="http://"+vilag+".vegzetur.hu/index.php?m=allatok&allat="+id+"&tev=gyogyit";
				}
				else {
					if(id!=0){
						alert('Befejeztem a gyógyítást!');
						GM_setValue(azonosito+'_id',0);
						GM_setValue(azonosito+'_autogyogyit',false);
						window.location.reload();
					}
				}
				
			}
		}
		getFirstByClass('div', 'allatok').insertBefore(div, getFirstByClass('div', 'text'));	
	}
	else{
		if(autogyogyit && !timer){
			alert('Befejeztem a gyógyítást!');
			GM_setValue(azonosito+'_id',0);
			GM_setValue(azonosito+'_autogyogyit',false);
		}
	}
}
else{
	nextrun = parseInt(GM_getValue(azonosito+'_nextrun',0));
	if (autogyogyit && nextrun<now && !strpos('allatok',window.location.href)){
		GM_openInTab("http://"+vilag+".vegzetur.hu/index.php?m=allatok&allat");
	}
}