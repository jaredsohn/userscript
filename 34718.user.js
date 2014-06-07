// ==UserScript==
// @name           Harta diplomatiei
// @namespace      http://userscripts.org/users/andone
// @description    Genereaza o harta a diplomatiei
// @include        http://*.triburile.ro/*
// @version        0.10.4
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////////////////
//////////////// functii pentru dinamizarea hartii ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
			var startPos = null;
			var startH=null;
			var _h = null;//document.getElementById("harta");
			var _p = null;//document.getElementById("loadingH");
			var zoomRegExp=/zoom=(\d+)/;
			var centerXRegExp=/centrex=(\d+)/;
			var centerYRegExp=/centrey=(\d+)/;
			var imageIsLoading = false;
			var fullZoomOut = false;
			var primaOara = true;//indica prima oara cand se incarca harta diplomatiei

			var istorieDirectie = {
				lista: new Array(),
				MAXIM: 5,
				adauga: function(dir) {
					this.lista[this.lista.length]=dir;
					if ( this.lista.length > this.MAXIM ) //raman MAXIM elemente
						this.lista.splice(0,this.lista.length-this.MAXIM);
					return this.increment()*2;
				},
				increment: function() {//pe baza istoriei decide incrementul:
					//daca directia este noua: 10
					//daca directia este egala doar cu directia anterioara, si nu cu ante-anterioarele: 10
					//daca exista 3 directii consecutive aceleasi in coada listei: 30
					//daca exista 4 directii consecutive aceleasi in coada listei: 50
					//mai mult ramane constant: 50
					var indexUltim = this.lista.length-1;
					var indexPenUltim = indexUltim-1;
					var indexPPUltim = indexPenUltim-1;
					var indexPPPUltim = indexPPUltim-1;
					if ( indexUltim<=0 )
						return 10;//nu am istorie
					if ( indexPenUltim>=0 && this.lista[indexPenUltim]==this.lista[indexUltim] )
						if ( indexPPUltim>=0 && this.lista[indexPPUltim]==this.lista[indexPenUltim] )
							if ( indexPPPUltim>=0 && this.lista[indexPPPUltim]==this.lista[indexPPUltim] )
								return 50;
							else
								return 30;
						else
							return 10;
					else
						return 10;
					return 10;
				}
			};
			
			function mouseCoords(ev){
				if(ev.pageX || ev.pageY){
					return {x:ev.pageX, y:ev.pageY};
				}
				return {
					x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
					y:ev.clientY + document.body.scrollTop  - document.body.clientTop
				};
			}
			function schimbaUrl(url) {
				imageIsLoading = true;
				_p.style.display="";
				_h.src = url;
			}
			//calculeaza deplasarea top,left pentru imagine considerand un anumit nivel de zoom si un anumit centru al pozei
			//astfel incat centrul pozei sa fie in centrul spatiului disponibil
			//zoom-ul este exprimat in puteri ale lui doi multiplicate cu 100
			//centrul este de la 0 la 999
			//poza are 1000x1000 pixeli, spatiul disponibil 400x400
			function centrare(cC, cY, z) {
				startH = {
					x: -300,
					y: -300
				}
			}
			function setFullZoomOut( enable) {
				if (enable && !fullZoomOut ) {
					fullZoomOut = true;
					_h.width=400;
					_h.height=400;
					_h.style.left="0px";
					_h.style.top="0px";
					return;
				} 
				if ( !enable && fullZoomOut ) {
					fullZoomOut = false;
					_h.width=1000;
					_h.height=1000;
					_h.style.left="-300px";
					_h.style.top="-300px";
					return;
				}
			}
			function cancelEvt(evt) {
				try {
					if (!evt) evt = window.event;
					if (evt.cancelBubble ) evt.cancelBubble = true;
					if (evt.stopPropagation) evt.stopPropagation();
					if (evt.stopPropagation) evt.preventDefault();
				} catch(ex) {}
			}
			
			/*_h.onload*/onloadHarta = function(evt) {
				//console.log("image loaded");
				if ( startH ) {
					_h.style.left = (startH.x+"px");
					_h.style.top = (startH.y+"px");
					startH = null;
					
				}
				//initial se poate prinde si evenimentul generat de vidanjori
				//pentru asta se verifica ca evenimentul este generat de noi prin variabila imageIsLoading
				if ( imageIsLoading && primaOara ) {
					primaOara = false;
					setFullZoomOut(true);
				} else {
				}
				imageIsLoading = false;
				_p.style.display = "none";
				//doar prima oara fa harta full zoom out, adica sa se vada toata
			}
			/*document.onmousemove*/onmousemoveDocument = function(evt) {
                //info2("[onmousemoveDocument] start");
				if ( fullZoomOut )
					return;
                //info2("[onmousemoveDocument] not full zoom out");
				if (startPos) {
                    //info2("[onmousemoveDocument] has start pos");
					evt           = evt || window.event;
					var mousePos = mouseCoords(evt);
					//info2("mouse pos: "+mousePos.x+"|"+mousePos.y);
					var top = startH.y+mousePos.y-startPos.y;
					//if ( top >)
					_h.style.top=(top+"px");
					//if ( _h.style.t)
					var left = (startH.x+mousePos.x-startPos.x);
					_h.style.left=(left+"px");
					info2("moved to: ["+top+","+left+"]");
					cancelEvt(evt);
					return false;
				} /*else alert("startPos este null");*/
				
			}
			function searchVal(reg, str, def) {
				valAr = reg.exec(str);
				var val = def;
				if ( valAr && valAr.length>1 ) val = parseInt(valAr[1]);
				return val;
			}
			/*document.onmouseup*/onmouseupDocument = function(evt) {
				//alert("mouse up")
				//daca harta a fost miscata verifica daca trebuie regenerata: nu acopera toata suprafata vizibila
				if ( startPos ) {
					var endH = {
						x: parseInt(_h.style.left),
						y: parseInt(_h.style.top)
					};
					if ( endH.x>0 || endH.x<-600 || endH.y>0 || endH.y<-600 ) {
						//console.log("endH: "+endH.x+"|"+endH.y);
						//calculeaza noul x si y pentru url: centrex=\d+ si centrey=\d+
						var url = _h.src;
						centerX = searchVal(centerXRegExp, url, 500);
						centerY = searchVal(centerYRegExp, url, 500);
						var zoom = searchVal(zoomRegExp, url, 100);
						//console.log("old center: "+centerX+"|"+centerY);
						//pentru a lua in considerare zoom-ul inseamna ca deplasarea centrului se face de zoom/100 de ori mai putin
						//ex: daca zoom=200 atunci centerX = (startH.x-endH.x)/2
						centerX += parseInt((startH.x - endH.x)*100/zoom);
						if ( centerX < 0 ) centerX = 0;
						if ( centerX > 999 ) centerX = 999;
						centerY += parseInt((startH.y - endH.y)*100/zoom);
						if ( centerY < 0 ) centerY = 0;
						if ( centerY > 999 ) centerY = 999;
						//console.log("new center: "+centerX+"|"+centerY);
						url=url.replace(centerXRegExp,"centrex="+centerX);
						url=url.replace(centerYRegExp,"centrey="+centerY);
						schimbaUrl(url);
						
					}
					startPos=null;
					//startH=null;
				}
				cancelEvt(evt);
				return false;
			}
			/*_h.ondblclick*/ondbclickHarta = function() {
				if ( imageIsLoading )
					return false;
				if ( fullZoomOut ) {
						setFullZoomOut(false);
						return;
					}

				try {
					var url = _h.src;
					var zoom = searchVal(zoomRegExp, url, 100);
					centerX = searchVal(centerXRegExp, url, 500);
					centerY = searchVal(centerYRegExp, url, 500);
					//daca se face zoom trebuie schimbate valorile centrului, zoom-ul se face fata de centrul relativ...
					var curH = {
						x: parseInt(_h.style.left),
						y: parseInt(_h.style.top)
					};
					//calculeaza centrul relativ (centrul vizibil)
					centerX = centerX-parseInt(500*100/zoom)+parseInt((200 - curH.x)*100/zoom);
					if ( centerX < 0 ) centerX = 0;
					if ( centerX > 999 ) centerX = 999;
					centerY = centerY-parseInt(500*100/zoom)+parseInt((200 - curH.y)*100/zoom);
					if ( centerY < 0 ) centerY = 0;
					if ( centerY > 999 ) centerY = 999;
					//aplica zoom si noua repozitionare dupa incarcarea imaginii
					zoom*=2;
					centrare(centerX,centerY,zoom);
					url=url.replace(zoomRegExp,"zoom="+zoom);
					url=url.replace(centerXRegExp,"centrex="+centerX);
					url=url.replace(centerYRegExp,"centrey="+centerY);
					schimbaUrl(url);
				} catch(ex) {
					alert("exceptie: "+ex.message)
				}
				return false;
			}
			function onrightclickHarta(evt) {
				if ( imageIsLoading )
					return false;
				try {
					var url = _h.src;
					var zoom = searchVal(zoomRegExp, url, 100);
					if ( zoom == 100 ) {
						setFullZoomOut(true);
						return;
					}
					centerX = searchVal(centerXRegExp, url, 500);
					centerY = searchVal(centerYRegExp, url, 500);
					//daca se face zoom trebuie schimbate valorile centrului, zoom-ul se face fata de centrul relativ...
					var curH = {
						x: parseInt(_h.style.left),
						y: parseInt(_h.style.top)
					};
					//calculeaza centrul relativ (centrul vizibil)
					centerX = centerX-parseInt(500*100/zoom)+parseInt((200 - curH.x)*100/zoom);
					if ( centerX < 0 ) centerX = 0;
					if ( centerX > 999 ) centerX = 999;
					centerY = centerY-parseInt(500*100/zoom)+parseInt((200 - curH.y)*100/zoom);
					if ( centerY < 0 ) centerY = 0;
					if ( centerY > 999 ) centerY = 999;
					//aplica zoom si noua repozitionare dupa incarcarea imaginii
					zoom/=2;
					if ( zoom<100 ) zoom=100;
					centrare(centerX,centerY,zoom);
					url=url.replace(zoomRegExp,"zoom="+zoom);
					url=url.replace(centerXRegExp,"centrex="+centerX);
					url=url.replace(centerYRegExp,"centrey="+centerY);
					schimbaUrl(url);
				} catch(ex) {
					alert("exceptie: "+ex.message)
				}
				cancelEvt(evt);
				return false;
			}
			/*_h.onmousedown*/onmousedownHarta=function(evt) {
				if ( imageIsLoading )
					return false;
				evt = evt || window.event;
				rclick = (evt.which==3)||(evt.button==2);
				if ( rclick )
					return onrightclickHarta(evt);
				startPos = mouseCoords(evt);
				startH = {
					x: parseInt(_h.style.left),
					y: parseInt(_h.style.top)
				};
				//alert("start pos: "+startPos.x+"|"+startPos.y);
				cancelEvt(evt);
				return false;
			}
			function miscaHarta(directie) {
					onmousedownHarta( { 
						which:0,
						button: 0,
						pageX: 1,
						pageY: 1
					});
					var valoare_increment = istorieDirectie.adauga(directie);//20 in principiu
					onmousemoveDocument( {
						which:0,
						button: 0,
						pageX: (directie.indexOf("stanga")>=0?valoare_increment+1:(directie.indexOf("dreapta")>=0?1-valoare_increment:1)),
						pageY: (directie.indexOf("sus")>=0?valoare_increment+1:(directie.indexOf("jos")>=0?1-valoare_increment:1))
					});
					onmouseupDocument({ 
						which:0,
						button: 0,
						pageX: 1,
						pageY: 1
					});
			}
			function setupDynHarta(urlHarta) {
				_h = document.getElementById("harta");
				_p = document.getElementById("loadingH");
				_h.addEventListener("load", onloadHarta, false);
				//_h.onload=onloadHarta;
				/*
				try {
					document.onmousemove=onmousemoveDocument;
					document.onmouseup=onmouseupDocument;
					_h.ondblclick=ondbclickHarta;
					_h.onmousedown=onmousedownHarta;
				} catch(ex) {}
				*/
				try {
					document.addEventListener("mousemove", onmousemoveDocument, false);
					document.addEventListener("mouseup", onmouseupDocument, false);
					_h.addEventListener("dblclick", ondbclickHarta, false);
					_h.addEventListener("mousedown", onmousedownHarta, false);
				} catch(ex) {}
				try {
					var minusEl = document.getElementById("img_minus");
					minusEl.addEventListener("click", onrightclickHarta, false);
					var plusEl = document.getElementById("img_plus");
					plusEl.addEventListener("click", ondbclickHarta, false);
					
					var stEl = document.getElementById("img_stanga");
					stEl.addEventListener("click", function(){ miscaHarta("stanga"); }, false);
					var drEl = document.getElementById("img_dreapta");
					drEl.addEventListener("click", function(){ miscaHarta("dreapta"); }, false);
					var susEl = document.getElementById("img_sus");
					susEl.addEventListener("click", function(){ miscaHarta("sus"); }, false);
					var josEl = document.getElementById("img_jos");
					josEl.addEventListener("click", function(){ miscaHarta("jos"); }, false);
					var stEl = document.getElementById("img_stanga_sus");
					stEl.addEventListener("click", function(){ miscaHarta("stanga_sus"); }, false);
					var stEl = document.getElementById("img_stanga_jos");
					stEl.addEventListener("click", function(){ miscaHarta("stanga_jos"); }, false);
					var stEl = document.getElementById("img_dreapta_sus");
					stEl.addEventListener("click", function(){ miscaHarta("dreapta_sus"); }, false);
					var stEl = document.getElementById("img_dreapta_jos");
					stEl.addEventListener("click", function(){ miscaHarta("dreapta_jos"); }, false);
					
					var styleEl = document.getElementById("m-odo_style");
					styleEl.addEventListener("click", function(evt){ 
						if ( imageIsLoading )
							return false;
						try {
							var url = _h.src;
							if ( styleEl.innerHTML.indexOf("m-odo")>=0 ) {
								url+="&nocache=1";
								styleEl.innerHTML = "normal<br/>style";
							} else {
								url = url.replace("&nocache=1","");
								styleEl.innerHTML = "m-odo<br/>style";
							}
							schimbaUrl(url);
						} catch(ex) {
							alert("exceptie: "+ex.message)
						}
						cancelEvt(evt);
						return false;
					}, false);

				} catch(ex) {}

				window.setTimeout(function(){
					centrare(500, 500, 100);
					if ( urlHarta )
						schimbaUrl(urlHarta);
				},2000);
			}
//////////////////////////////////////////////////////////////////////////////////////////
//////////////// END functii pentru dinamizarea hartii END ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


var DEBUG_MODE=false;
var debugInfo = "";
function info(msg) {
	debugInfo += "<br>"+msg;
}
info("start");

function arataEroare(ex) {
	errorElem = document.createElement("div");
	errorElem.style.bgcolor="#ffffff";
	errorElem.style.color="red";
	errorElem.innerHTML="exceptie: "+ex.message;
	document.body.appendChild(errorElem);
	activeazaDebug();
}
function info2(text) {
    if ( DEBUG_MODE ) {
        var txtElem = document.createElement("div");
        txtElem.style.bgcolor="#ffffff";
        txtElem.style.color="yellow";
        txtElem.innerHTML=text;
        document.body.appendChild(txtElem);
	}
}
function arataDebug() {
	if ( DEBUG_MODE && debugInfo && debugInfo.length>0 ) {
		debugElem = document.createElement("div");
		debugElem.style.bgcolor="#ffffff";
		debugElem.style.color="green";
		debugElem.innerHTML="debug info: "+debugInfo;
		document.body.appendChild(debugElem);
	}
}
try{
var codLume = "ro5";
var diplRegEx1 = /screen=ally/;
var diplRegEx2 = /mode=contracts/;
if ( diplRegEx1.test(window.location.href) && diplRegEx2.test(window.location.href) ) {
	//afla codul lumii:
	var arrLume = window.location.hostname.match(/^(\w+)\./);
	if ( arrLume.length > 1 )
		codLume = arrLume[1];
	else
		info("nu am gasitu codul lumii!!! se foloseste default");
	info("codul lumii folosit este "+codLume);
	//este pagina de diplomatie, parseaz-o si afla diplomatia
	var diplomatie = function(actiune, trib, id) {
		this.actiune = actiune;
		this.trib = trib;
		this.id = id;
	}
	diplomatie.prototype.toString = function() {
		return "diplomatie { trib: "+this.trib+", id: "+this.id+", actiune: "+this.actiune+"}";
	}
	var primulTabel = null;
	var jucList = new Array();
	var diplList = new Array();
	var amTrib, amJucator, amHarta; //indica daca executia fiecarei functii cu aceste nume s-a incheiat sau nu
	amTrib=false;
	amJucator=false;
	amHarta=false;
	function genereazaDiplomatii() {
		var categorii = document.evaluate( '//table[@class="vis"][@id="partners"]/tbody/tr/*', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		info("am gasit "+categorii.snapshotLength+" rânduri");
		var nume_cat = "--nimic--";
		var index_cat = 0;
		for ( i=0; i<categorii.snapshotLength; i++ ) {
			var catEl = categorii.snapshotItem(i);
			if ( primulTabel == null ) {
                primulTabel = catEl;
                while ( primulTabel && primulTabel.parentNode!=primulTabel && (primulTabel.nodeType!=1 || primulTabel.tagName!="TABLE") ) {
                    info("merg catre "+primulTabel.nodeType+" "+(primulTabel.nodeType==1?primulTabel.tagName:"nod text"));
                    primulTabel = primulTabel.parentNode;
                }
                primulTabel.style.width="200px";
			}
			if ( catEl.tagName == "TH" ) {
                nume_cat = catEl.innerHTML;
                index_cat = 0;
                info("am găsit categoria "+nume_cat);
            } else if (catEl.tagName == "TD" ) {
				//gaseste toate linkurile de forma
				info("caut linkuri sub forma: *screen=info_ally* si *id=*");
				var triburi = document.evaluate( ".//a[contains(@href,'screen=info_ally')]", catEl, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				//info("am gasit "+triburi.snapshotLength+" triburi");
				for ( j=0; j<triburi.snapshotLength; j++ ) {
					var link = triburi.snapshotItem(j);
					var nume_trib = link.innerHTML;
					info(nume_cat+"["+index_cat+"]="+nume_trib);
					
					//afla id-ul tribului
					var allyRegEx = /screen=info_ally/;
					var idRegEx = /id=(\d+)/;
					var id_trib = 0;
					if ( allyRegEx.test(link.href) ) {
						var nimereli = idRegEx.exec(link.href);
						id_trib = nimereli[1];
					}
					d = new diplomatie(nume_cat, nume_trib, id_trib);
					diplList[diplList.length]=d;
					info("am gasit "+d);
				}
				index_cat++;
            }
		}
	}

	function genereazaHarta() {
		//generez url pentru harta, fara id-ul tribului meu
		var urlHarta = "http://twsmap.com/mapservice/"+codLume+"?";
		for ( i=0; i<diplList.length; i++) {
			var culoare = (diplList[i].actiune[0]=="A"?"00A0F4":(diplList[i].actiune[0]=="D"?"F40000":(diplList[i].actiune[0]=="P"?"800080":"0000F4")));
			urlHarta+="&ti"+i+"="+diplList[i].id+"&tc"+i+"="+culoare;
		}
		for ( i=0; i<jucList.length; i++) {
			var culoare = jucList[i].actiune;
			urlHarta+="&pi"+i+"="+jucList[i].id+"&pc"+i+"="+culoare;
		}
		urlHarta+="&zoom=100&centrex=500&centrey=500&grid=1";
		info("url harta: "+urlHarta);
		if ( primulTabel ) {
			var mydiv = document.createElement("div");
			mydiv.innerHTML = 
				"<div style='float:right'>"
				+'    <table><tr><td valign=top align=right>'
				+'    <table style="border: 1px solid ; background-color: rgb(222, 211, 185);width:60px;">'
				+'        <tbody>'
				+'            <tr class="nowrap">'
				+'                <td width="20" height="20" style="font-size:20px;font-weight:bold;" align=center valign=center>'
				+'					<a href="#" id="img_plus">+</a>'
				+'				</td>'
				+'                <td/>'
				+'                <td width="20" height="20" style="font-size:28px;font-weight:bold;" align=center valign=center>'
				+'					<a href="#" id="img_minus">-</a>'
				+'				</td>'
				+'			</tr>'
				+'		</tbody>'
				+'	</table>'
				+'    <table style="border: 1px solid ; background-color: rgb(222, 211, 185);width:60px;">'
				+'        <tbody>'
				+'            <tr>'
				+'                <td width="20" height="20" align=center valign=center>'
				+'					<a href="#" id="m-odo_style">m-odo<br/>style</a>'
				+'				</td>'
				+'			</tr>'
				+'		</tbody>'
				+'	</table>'
				+'    <table style="border: 1px solid ; background-color: rgb(222, 211, 185);width:60px;">'
				+'        <tbody>'
				+'            <tr>'
				+'                <td width="20" height="20" align=center valign=center>'
				+'					<img border="0" src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif" onmouseover="document.getElementById(\'trageMouse\').style.display=\'\';" onclick="var t=document.getElementById(\'trageMouse\'); var d=t.style.display; t.style.display=(d==\'\'?\'none\':\'\');" onmouseout="document.getElementById(\'trageMouse\').style.display=\'none\';">'
				+'					<div style="position:relative"><div id="trageMouse" style="position:absolute;width:300px;z-index:100;display:none;border: 1px solid ; background-color: rgb(222, 211, 185);">SUPER TARE!<br>Acum poti trage de harta ca sa o misti,<br>dublu click ca sa faci zoom in<br>si click dreapta ca sa faci zoom out!<br><br>Totul pentru placerea ta <img border="0" src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif"> </div></div>'
				+'				</td>'
				+'			</tr>'
				+'		</tbody>'
				+'	</table>'
				+'	</td><td rowspan=2>'
				+'    <table cellspacing="1" cellpadding="0" class="map_container">'
				+'        <tbody>'
				+'            <tr>'
				+'                <td align="center">'
				+'                    <a href="#" id="img_stanga_sus"><img alt="map/map_nw.png" style="z-index: 1; position: relative;" src="/graphic/map/map_nw.png"/></a>'
				+'                </td>'
				+'                <td align="center">'
				+'                    <a href="#" id="img_sus"><img alt="map/map_n.png" style="z-index: 1; position: relative;" src="/graphic/map/map_n.png"/></a>'
				+'                </td>'
				+'                <td align="center">'
				+'                    <a href="#" id="img_dreapta_sus"><img alt="map/map_ne.png" style="z-index: 1; position: relative;" src="/graphic/map/map_ne.png"/></a>'
				+'                </td>'
				+'            </tr>'
				+'            <tr>'
				+'                <td align="center">'
				+'                    <a href="#" id="img_stanga"><img alt="map/map_w.png" style="z-index: 1; position: relative;" src="/graphic/map/map_w.png"/></a>'
				+'                </td>'
				+'                <td>'
				+'		<div style="overflow:hidden;width:400px;height:400px;position:relative;border: 1px solid black;">'
				+'			<img src="http://s16.postimg.org/nypgk2s7p/losvidanjores.png" id="harta" style="position:absolute;left:0;top:0">'
				+'		</div>'
				+'                </td>'
				+'                <td align="center">'
				+'                    <a href="#" id="img_dreapta"><img alt="map/map_e.png" style="z-index: 1; position: relative;" src="/graphic/map/map_e.png"/></a>'
				+'                </td>'
				+'            </tr>'
				+'            <tr>'
				+'                <td align="center">'
				+'                    <a href="#" id="img_stanga_jos"><img alt="map/map_sw.png" style="z-index: 1; position: relative;" src="/graphic/map/map_sw.png"/></a>'
				+'                </td>'
				+'                <td align="center">'
				+'                    <a href="#" id="img_jos"><img alt="map/map_s.png" style="z-index: 1; position: relative;" src="/graphic/map/map_s.png"/></a>'
				+'                </td>'
				+'                <td align="center">'
				+'                    <a href="#" id="img_dreapta_jos"><img alt="map/map_se.png" style="z-index: 1; position: relative;" src="/graphic/map/map_se.png"/></a>'
				+'                </td>'
				+'            </tr>'
				+'        </tbody>'
				+'    </table>'

				+'		<div style="clear:both;"/>'
				+'		<div id="loadingH" style="display:none;width:400px;height:20px;">'
				+'			<table cellpadding=0 cellspacing=0 border=0 width=100% height=100%>'
				+'				<tr>'
				+'					<td valign=top align=center>'
				+'						<img src="http://img134.imageshack.us/img134/1558/loadingxf1.gif">'
				+'					</td>'
				+'				</tr>'
				+'			</table>'
				+'		</div>'
				+'    </td></tr>'
				+'    <tr><td valign=bottom align=right>'

				+'    <table style="border: 1px solid ; background-color: rgb(222, 211, 185);width:60px;">'
				+'        <tbody>'
				+'            <tr>'
				+'                <td width="20" height="20" align=center valign=center>'
				+'					<a href="http://ro5.triburile.ro/guest.php?screen=info_player&id=341202">&copy; ando</a>'
				+'				</td>'
				+'			</tr>'
				+'		</tbody>'
				+'	</table>'
				
				+'    </td></tr></table>'
				+"</div>";
				
				
			/*

				+'		<div id="Unelte" style="width:331px;height:109px;position:relative;">'
				+'			<img src="http://monalisa2.cern.ch/~mluc/diplomatie/unelte/minus.png" id="img_minus" style="position:absolute;left:215px;top:16px;width:70px;height:24px;" alt="">'
				+'			<img src="http://monalisa2.cern.ch/~mluc/diplomatie/unelte/sus.png" id="img_sus" style="position:absolute;left:73px;top:20px;width:65px;height:20px;" alt="">'
				+'			<img src="http://monalisa2.cern.ch/~mluc/diplomatie/unelte/stanga.png" id="img_stanga" style="position:absolute;left:15px;top:30px;width:59;height:31px;" alt="">'
				+'			<img src="http://monalisa2.cern.ch/~mluc/diplomatie/unelte/dreapta.png" id="img_dreapta" style="position:absolute;left:142px;top:30px;width:57px;height:31px" alt="">'
				+'			<img src="http://monalisa2.cern.ch/~mluc/diplomatie/unelte/plus.png" id="img_plus" style="position:absolute;left:200px;top:46px;width:100px;height:50px" alt="">'
				+'			<img src="http://monalisa2.cern.ch/~mluc/diplomatie/unelte/jos.png" id="img_jos" style="position:absolute;left:73px;top:51px;width:69px;height:45px" alt="">'
				+'		</div>'
			mydiv.innerHTML="<a href='"+urlHarta+"' target=_blank>"
				+"<img src='"+urlHarta+"' width=400 height=400 style='float:right'>"
				+"</a>"
				+"<a href='#' onClick='a=this.previousSibling;e=a.childNodes[0];b=\"&nocache=1\";c=\"\";if ( this.innerHTML == \"m-odo style\" ) {this.innerHTML = \"normal\";a.href+=b;e.src+=b;} else {this.innerHTML = \"m-odo style\";a.href=a.href.replace(b,c);e.src=e.src.replace(b,c);};return false;' style='float:right'>m-odo style</a>";
			*/
			primulTabel.parentNode.insertBefore(mydiv,primulTabel);
			setupDynHarta(urlHarta);
		}
	}
	
	function apeleazaHarta() {
		//aici se strang cele 2 threaduri care au fost folosite pentru a afla jucatorul si harta
		if ( amHarta )
			return;
		if ( amTrib && amJucator )
			amHarta=true;
		else
			return;//inca nu s-a terminat una din cele doua deci nu pot genera harta
		genereazaHarta();
		//daca a fost vreo eroare, arata si informatia de debug
		arataDebug();
	}
	//de vreme ce nu pot obtine informatii despre id-ul jucatorului nu incerc sa-i pun satele pe harta
	//afla id trib si id jucator
	//pentru asta, trebuie incarcate alte 2 pagini:
	//pentru trib mode=profile
	function aflaTrib() {
		try {
			var urlProfil = window.location.href.replace("mode=contracts","mode=profile");
			var frAscuns = document.createElement("iframe");
			frAscuns.style.display="none";
			frAscuns.src = urlProfil;
			document.body.appendChild(frAscuns);
			var errCount=0;
			var maxErrCount = 50;
			var timeoutPeriod = 200;//deci maxim se poate astepta 10 secunde pentru incarcarea paginii dupa care se da eroare
			var timeoutFunc = function() {
				//verifica daca pagina e incarcata
				try {
					var doc = frAscuns.contentDocument;
					//acum pagina ar trebui sa fie incarcata, asa ca genereaza harta
					//if ( doc ) {
					var rez = doc.body.innerHTML.match(/<a href=".*((screen=info_member)|id=(\d+)).*((screen=info_member)|id=(\d+)).*">Membri<\/a>/);
					if ( rez.length>1 ) {
						//am terminat, sa o sterg de aci
						var idTrib = rez[3]||rez[6];
						d = new diplomatie("Meu", "DHBM", idTrib);
						diplList[diplList.length]=d;
						info("am gasit trib propriu "+d);
						amTrib=true;
						apeleazaHarta();
						return;
					} else
						errCount++;
				} catch (ex) {
					errCount ++;
					//arataEroare(ex);
				}
				if ( errCount >= maxErrCount ) {
					amTrib=true; //executie terminata pentru ca nu se gaseste ce trebuie
					apeleazaHarta();
				} else {
					setTimeout(timeoutFunc,200);
				}
			}
			setTimeout(timeoutFunc,200);
		} catch (ex) {
			arataEroare(ex);
			amTrib=true;//executie terminata cu eroare dar totusi terminata
			apeleazaHarta();
		}
	}
	//pentru jucator mode=members
	function aflaJucator() {
		try {
			var url = window.location.href.replace("mode=contracts","mode=members");
			var frAscuns = document.createElement("iframe");
			frAscuns.style.display="none";
			frAscuns.src = url;
			document.body.appendChild(frAscuns);
			var errCount=0;
			var maxErrCount = 50;
			var timeoutPeriod = 200;//deci maxim se poate astepta 10 secunde pentru incarcarea paginii dupa care se da eroare
			var timeoutFunc = function() {
				//verifica daca pagina e incarcata
				try {
					var doc = frAscuns.contentDocument;
					
					var snapTr = doc.evaluate( '//tr[contains(@class,"selected")]/td[@class="lit-item"]/a', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
					if ( snapTr.snapshotLength > 0 ) {
						var jucElem = snapTr.snapshotItem(0);
						if ( jucElem ) {
							rez = jucElem.href.contains("screen=info_player") &&
									jucElem.href.match(/id=(\d+)/) || [];
							if ( rez.length>1 ) {
								var idJuc = rez[1];
								d = new diplomatie("F0C800", jucElem.innerHTML, idJuc);
								jucList[jucList.length]=d;
								info("am gasit jucator "+d);
								amJucator=true;
								apeleazaHarta();
								return;
							} else
								errCount ++;
						} else
							errCount ++;
					} else
						errCount ++;
				} catch (ex) {
					errCount ++;
					//arataEroare(ex);
				}
				if ( errCount >= maxErrCount ) {
					amJucator=true; //executie terminata pentru ca nu se gaseste ce trebuie
					apeleazaHarta();
				} else {
					setTimeout(timeoutFunc,200);
				}
			}
			setTimeout(timeoutFunc,200);
		} catch (ex) {
			arataEroare(ex);
			amJucator=true;//executie terminata cu eroare dar totusi terminata
			apeleazaHarta();
		}
	}
	
	genereazaDiplomatii();
	aflaTrib();
	aflaJucator();
	//generareHarta(); //este apelata de una din cele doua
	apeleazaHarta();//poate poate... desi mai mult ca sigur ca nu, doar pentru logica de executie
}
} catch (ex) {
	arataEroare(ex);
}
arataDebug();