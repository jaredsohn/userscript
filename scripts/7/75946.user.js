// ==UserScript==
// @name           Wurzler V 1.01
// @namespace      www.wurzelimperium.de
// @include        http://s*.wurzelimperium.de/*
// ==/UserScript==

(function () {

var scriptUrl = "";
var loc = document.location; 
var reg = /http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i;
var server = reg.exec(loc)[1];
var page = reg.exec(loc)[2];

val_schutz = !!GM_getValue('WI_'+server+'_schutz');
val_zwgarten = !!GM_getValue('WI_'+server+'_zwgarten');
val_drgarten = !!GM_getValue('WI_'+server+'_drgarten');
val_vrgarten = !!GM_getValue('WI_'+server+'_vrgarten');
val_frgarten = !!GM_getValue('WI_'+server+'_frgarten');
val_zwregal = !!GM_getValue('WI_'+server+'_zwregal');
val_dregal = !!GM_getValue('WI_'+server+'_dregal');
val_giess = GM_getValue('WI_'+server+'_giess');
if (!val_giess) {val_giess=15};
val_low = GM_getValue('WI_'+server+'_low');
if (!val_low) {val_low=1000};

var Wndw = window;
all = document.getElementsByTagName("body")[0];
fr = top.document.getElementsByTagName("iframe");
function getFrameByName(a,b){
	for (var v=0;v<b.length;v++){
		if (b[v].name == a) return v;
	}
}

switch (page) {
case "main"	  : do_main();break;
case "garten_map" : do_garten_map();break;
case "verkauf_map": do_verkauf_map();break;
}

// ***Navi***

function do_main () {

function reg1(){ top.location.href='javascript:updateRack(0)'; }
function reg2(){ top.location.href='javascript:updateRack(1)'; }
function reg3(){ top.location.href='javascript:updateRack(2)'; }

canddiv = document.getElementsByTagName("div");
candspan = document.getElementsByTagName("span");
lager_zeit = document.getElementById("lager_zeit");
candimg = document.getElementsByTagName("img");
rackInfo = document.getElementById("rackInfo");
bedientext = document.getElementById("bedientext");

werbediv = top.document.getElementById("upsimtoolbar");
if (werbediv) werbediv.style.display = "none";

profilimg = top.document.getElementById("profil");
if (profilimg) profilimg.style.display = "none";

if (val_zwgarten || val_drgarten) {
garten1 = top.document.createElement("span");
garten1.innerHTML = '<a href="javascript:waehleGarten(1)"><img border="0" src="http://wurzelgrafik3.de1.cc/pics/popin/map_auto/garten_out.gif"></a>';
garten1.title = "Gehe zum 1. Garten";
garten1.setAttribute("style","position:fixed;top:5px;left:0px;width:40px;height:36px;");
all.appendChild(garten1);}

if (val_zwgarten) {
garten2 = top.document.createElement("span");
garten2.innerHTML = '<a href="javascript:waehleGarten(2)"><img border="0" src="http://wurzelgrafik3.de1.cc/pics/popin/map_auto/garten_out.gif"></a>';
garten2.title = "Gehe zum 2. Garten ";
garten2.setAttribute("style","position:fixed;top:45px;left:0px;width:40px;height:36px;");
all.appendChild(garten2);}

if (val_drgarten) {
garten3 = top.document.createElement("span");
garten3.innerHTML = '<a href="javascript:waehleGarten(3)"><img border="0" src="http://wurzelgrafik3.de1.cc/pics/popin/map_auto/garten_out.gif"></a>';
garten3.title = "Gehe zum 3. Garten";
garten3.setAttribute("style","position:fixed;top:85px;left:0px;width:40px;height:36px;");
all.appendChild(garten3);}

if (val_vrgarten) {
garten4 = top.document.createElement("span");
garten4.innerHTML = '<a href="javascript:waehleGarten(4)"><img border="0" src="http://wurzelgrafik3.de1.cc/pics/popin/map_auto/garten_out.gif"></a>';
garten4.title = "Gehe zum 4. Garten";
garten4.setAttribute("style","position:fixed;top:125px;left:0px;width:40px;height:36px;");
all.appendChild(garten4);}

if (val_frgarten) {
garten5 = top.document.createElement("span");
garten5.innerHTML = '<a href="javascript:waehleGarten(5)"><img border="0" src="http://wurzelgrafik3.de1.cc/pics/popin/map_auto/garten_out.gif"></a>';
garten5.title = "Gehe zum 5. Garten";
garten5.setAttribute("style","position:fixed;top:165px;left:0px;width:40px;height:36px;");
all.appendChild(garten5);}

if (val_zwregal) {
regal1 = top.document.createElement("span");
regal1.innerHTML = '<img border="0" src="http://wurzelgrafik3.de1.cc/pics/verkauf/regal.jpg">';
regal1.title = "Zeige das 1.Regal";
regal1.addEventListener("click",reg1,true);
regal1.setAttribute("style","position:fixed;top:200px;left:-35px;width:40px;height:65px");
all.appendChild(regal1);

regal2 = top.document.createElement("span");
regal2.innerHTML = '<img border="0" src="http://wurzelgrafik3.de1.cc/pics/verkauf/regal.jpg">';
regal2.title = "Zeige das 2.Regal";
regal2.addEventListener("click",reg2,true);
regal2.setAttribute("style","position:fixed;top:300px;left:-35px;width:72px;height:95px");
all.appendChild(regal2);}

if (val_dregal) {
regal3 = top.document.createElement("span");
regal3.innerHTML = '<img border="0" src="http://wurzelgrafik3.de1.cc/pics/verkauf/regal.jpg">';
regal3.title = "Zeige das 3.Regal";
regal3.addEventListener("click",reg3,true);
regal3.setAttribute("style","position:fixed;top:400px;left:-35px;width:72px;height:95px");
all.appendChild(regal3);}

// ***Menü***

inp_zwgarten = document.createElement("input");
inp_zwgarten.setAttribute("style","position:absolute;top:-120px;left:795px;z-index:31;text-align:center;");
inp_zwgarten.type = "checkbox";
inp_zwgarten.checked = val_zwgarten;
inp_zwgarten.id = "zwgarteninput";
inp_zwgarten.title = "Ersten & Zweiten Garten anzeigen";
inp_zwgarten.addEventListener("change",function(){GM_setValue('WI_'+server+'_zwgarten', inp_zwgarten.checked);top.location.reload();},false);
rackInfo.appendChild(inp_zwgarten);

inp_drgarten = document.createElement("input");
inp_drgarten.setAttribute("style","position:absolute;top:-120px;left:815px;z-index:31;text-align:center;");
inp_drgarten.type = "checkbox";
inp_drgarten.checked = val_drgarten;
inp_drgarten.id = "drgarteninput";
inp_drgarten.title = "Dritten Garten anzeigen";
inp_drgarten.addEventListener("change",function(){GM_setValue('WI_'+server+'_drgarten', inp_drgarten.checked);top.location.reload();},false);
rackInfo.appendChild(inp_drgarten);

inp_vrgarten = document.createElement("input");
inp_vrgarten.setAttribute("style","position:absolute;top:-120px;left:835px;z-index:31;text-align:center;");
inp_vrgarten.type = "checkbox";
inp_vrgarten.checked = val_vrgarten;
inp_vrgarten.id = "vrgarteninput";
inp_vrgarten.title = "Vierten Garten anzeigen";
inp_vrgarten.addEventListener("change",function(){GM_setValue('WI_'+server+'_vrgarten', inp_vrgarten.checked);top.location.reload();},false);
rackInfo.appendChild(inp_vrgarten);

inp_frgarten = document.createElement("input");
inp_frgarten.setAttribute("style","position:absolute;top:-120px;left:855px;z-index:31;text-align:center;");
inp_frgarten.type = "checkbox";
inp_frgarten.checked = val_frgarten;
inp_frgarten.id = "frgarteninput";
inp_frgarten.title = "Fünften Garten anzeigen";
inp_frgarten.addEventListener("change",function(){GM_setValue('WI_'+server+'_frgarten', inp_frgarten.checked);top.location.reload();},false);
rackInfo.appendChild(inp_frgarten);

inp_zwregal = document.createElement("input");
inp_zwregal.setAttribute("style","position:absolute;top:-120px;left:875px;z-index:31;text-align:center;");
inp_zwregal.type = "checkbox";
inp_zwregal.checked = val_zwregal;
inp_zwregal.id = "zwregalinput";
inp_zwregal.title = "Erstes & Zweites Regal";
inp_zwregal.addEventListener("change",function(){GM_setValue('WI_'+server+'_zwregal', inp_zwregal.checked);top.location.reload();},false);
rackInfo.appendChild(inp_zwregal);

inp_dregal = document.createElement("input");
inp_dregal.setAttribute("style","position:absolute;top:-120px;left:895px;z-index:31;text-align:center;");
inp_dregal.type = "checkbox";
inp_dregal.checked = val_dregal;
inp_dregal.id = "dregalinput";
inp_dregal.title = "Drittes Regal";
inp_dregal.addEventListener("change",function(){GM_setValue('WI_'+server+'_dregal', inp_dregal.checked);top.location.reload();},false);
rackInfo.appendChild(inp_dregal);

inp_giess = document.createElement("input");
inp_giess.setAttribute("style","position:absolute;width:0px;top:-142px;left:509px;z-index:31;text-align:center;");
inp_giess.value = val_giess;
inp_giess.id = "giessinput";
inp_giess.title = "Giess-Stufe";
inp_giess.addEventListener("change",function(){GM_setValue('WI_'+server+'_giess', inp_giess.value);rdytime();},false);
rackInfo.appendChild(inp_giess);

inp_low = document.createElement("input");
inp_low.setAttribute("style","position:absolute;width:60px;top:-36px;left:80px;z-index:31;text-align:center;");
inp_low.value = val_low;
inp_low.id = "lowinput";
inp_low.title = "Knappe Lagerbest\u00E4nde hervorheben ab...";
inp_low.addEventListener("change",function(){GM_setValue('WI_'+server+'_low', inp_low.value);top.location.reload();},false);
rackInfo.appendChild(inp_low);

// ***Lager***

rdytime();
function rdytime(){
	var jetzt = new Date();
	jetzt = (jetzt.getHours()*60 + jetzt.getMinutes())*60+jetzt.getSeconds();
	giess = 1-inp_giess.value*0.01;
	var Ausdruck = /(\d+):(\d+):(\d\d)/;
	Ausdruck.exec(lager_zeit.innerHTML);
	zeit = RegExp.$1 *3600 + RegExp.$2 *60 + RegExp.$3 *1;
	zeit = zeit * giess;
	while (zeit > 86400) { zeit = (zeit - 86400) *giess; }
	zeit = Math.round((zeit+jetzt) % 86400);
	zeitstr = Math.floor(zeit/3600)+':';
	zeit = zeit % 3600;
	neu = Math.floor(zeit/60);
	if (neu<10) {zeitstr += '0'+ neu} else {zeitstr += neu};
	bedientext.innerHTML = ' '+'<font color="blue">'+zeitstr+' Uhr fertig</font>'
}

all.addEventListener("load",function(){
rdytime();
for (var v=14;v<canddiv.length;v++){
a = parseInt(canddiv[v].innerHTML);
if (!isNaN(a)){
	if (a<val_low) {
		canddiv[v].setAttribute("style","position:relative; top:3px;text-decoration:blink;color:red;");
	}
	else {
		canddiv[v].setAttribute("style","position:relative; top:3px;color:blue;");
	}
}
}
},true);

}


// ***Garten***

function do_garten_map(){

var jetzt = new Date();
jetzt = Math.round(jetzt.getTime()/1000);

for (var i=1; i<205;i++) {
	feld = document.getElementById("f"+i);
	
	if (val_schutz && unsafeWindow.garten_kategorie[i]=="u"){ feld.removeAttribute("onclick");	}

	if (unsafeWindow.garten_kategorie[i]=="v"){
		if (unsafeWindow.garten_zeit[i]>0){
			nextGiess = 86400 + unsafeWindow.garten_wasser[i];
			if (jetzt<nextGiess && nextGiess<unsafeWindow.garten_zeit[i]) { 
				nextGiess = Math.floor((nextGiess-jetzt)/60);
				h = Math.floor(nextGiess/60);
				m = nextGiess - h*60;
				if (m<10) { newstr= h+":0"+m;}
				else {newstr = h+":"+m;};
				feld.title = newstr;
				if (unsafeWindow.garten_x[i]*unsafeWindow.garten_y[i]==1) { feld.innerHTML += newstr;}
			}
		}
	}
}

allbtn = top.document.createElement("button");
allbtn.type = 'button';
allbtn.name = 'plant_all';
allbtn.innerHTML = 'Alles';
allbtn.addEventListener("click",function(){
	for (var i=1;i<205;i++){
		if (unsafeWindow.garten_kategorie[i]!="u"){
			unsafeWindow.parent.cache_me(i, unsafeWindow.garten_prod[i], unsafeWindow.garten_kategorie[i]);
		}
	}
},true); 
allbtn.setAttribute("style","position:fixed;top:0px;left:300px;width:100px;height:20px;");
all.appendChild(allbtn);


}

// ***Button***

function do_verkauf_map(){

candspan = document.getElementsByTagName("span");

function giess () {
	fr[getFrameByName('garten',fr)].src='garten_map.php?giesse=alles';
}

function giess2 () {
	fr[getFrameByName('garten',fr)].src='garten_map.php?giesse=alles';
}

function ernte() {
	fr[getFrameByName('garten',fr)].src='garten_map.php?ernte=alles';
	window.setTimeout('top.location.href="javascript: updateRack(0, true)"',3000);
}

for (var v=0;v<candspan.length;v++){
if (candspan[v].style.background.search(/kannenzwerg/) != -1) {
	kanne = candspan[v];
	kanne.removeAttribute("onclick");
	kanne.addEventListener('click',giess,true);
}
if (candspan[v].style.background.search(/sensenzwerg/) != -1) {
	sense = candspan[v];
	sense.removeAttribute("onclick");
	sense.addEventListener('click',ernte,true);
}
}
}

})();
