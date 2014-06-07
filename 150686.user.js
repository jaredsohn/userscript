// ==UserScript==
// @name        cercaOasi
// @namespace   APE
// @grant 	all
// @grant GM_xmlhttpRequest
// @description cerca le oasi
// @include     http://*.travian.it/*?prova*
// @version        0.0.4

// ==/UserScript==

var SCRIPT = {
	url : 'http://steal1982.altervista.org/download/oasi_finder.user.js',
	version : '0.0.4' //same value as @version
};
checkUpdateScript(SCRIPT);

//COORDINATE DEL VILLO

//INTERVALLO MASSIMO PER OGNI RICHIESTA

var intervallo=0;
var startx=0;
var starty=0;
var maxdist=0;

var SERVER=get_server();

var div=document.createElement('div');
var top=window.innerWidth/2;
var left=window.innerWidth/2;
div.setAttribute('style','position: fixed; top: 70px; left: 10px; width: 220px; height: 400px; overflow: auto; background-color:black;z-index:100;color:white;');
var divsettings=drawSettings();
div.appendChild(divsettings); 
var table=document.createElement('table');

div.appendChild(table);
getElementByClass("div","bodyWrapper",document)[0].appendChild(div);

function drawSettings(){
	var inputx=creaInputText('inputx','x:','x di partenza');
	var inputy=creaInputText('inputy','y:','y di partenza');
	var inputDist=creaInputText('inputDist','D:','distanza massima a cui cercare');
	var inputDelay=creaInputText('inputDelay','Time:','tempo in secondi(impostando meno di due secondi si viene sicuramente bannati un\'ora)');
	var buttonstart=creaancora('inizio','comincia a cercare',function(){startSearch()});
	var buttonrecover=creaancora('recupera','recupera una ricerca interrotta',function(){startRecover()});
	var inputRecX=creaInputText('inputRecX','x:','x da cui iniziare il recupero');
	var inputRecY=creaInputText('inputRecY','y:','y da cui iniziare il recupero');
	var div=document.createElement('div');
	var span=document.createElement('span');
	div.appendChild(inputx);
	div.appendChild(inputy);
	div.appendChild(inputDist);
	div.appendChild(inputDelay);
	div.appendChild(buttonstart);
	var br=document.createElement('br');
	div.appendChild(br);
	var space=document.createTextNode('   ');

	div.appendChild(buttonrecover);
	div.appendChild(space);
	div.appendChild(inputRecX);
	div.appendChild(inputRecY);

	return div
}
function creaInputText(id,label,descrizione){
var span=document.createElement('span');
var input=document.createElement('input');
input.setAttribute('type','text');
input.setAttribute('id',id);
input.setAttribute('maxlength','4');
input.setAttribute('value','0');
input.setAttribute('style','width:30px');
var label=document.createTextNode(label);
span.setAttribute('title',descrizione);
span.appendChild(label);
span.appendChild(input);

return span;
}
function startRecover(){
alert('inizio ricerca');
startx=parseInt(document.getElementById('inputx').value);
starty=parseInt(document.getElementById('inputy').value);
maxdist=parseInt(document.getElementById('inputDist').value);
intervallo=parseFloat(document.getElementById('inputDelay').value)*1000;

var xi=parseInt(document.getElementById('inputRecX').value)
var yi=parseInt(document.getElementById('inputRecY').value)
controllaOasi("",table,xi,yi);
}
function startSearch(){
alert('inizio ricerca');
startx=parseInt(document.getElementById('inputx').value);
starty=parseInt(document.getElementById('inputy').value);
maxdist=parseInt(document.getElementById('inputDist').value);
intervallo=parseFloat(document.getElementById('inputDelay').value)*1000;

var xi=startx-maxdist
var yi=starty-maxdist


controllaOasi("",table,xi,yi);
}


function eseguiCall(response,table,x,y){
	var url='http://'+SERVER+'/position_details.php?x='+x+'&y='+y;
	GM_xmlhttpRequest({
			method : 'GET',
			url : url,
			onload : function(result) {
				if (result.status != 200) {
					//alert('errorenot200')
					return;
				}
				response=result.responseText;
				//alert(response);
				if (response.indexOf('Oasi libera')!= -1){
					//if (response.indexOf('nessuna')!= -1){
					var tr=document.createElement('tr');
					
					var td=document.createElement('td');
					td.setAttribute('style','background-color:black;color:white');
					td.innerHTML=x+'|'+y;
					tr.appendChild(td);
					table.appendChild(tr);
			
					//}
				}
		
			controllaOasi(response,table,x,y);
		}
	});
}
function controllaOasi(response,table,x,y){
	//alert(x+'|'+y+ ':' + (startx+maxdist) + '|'+(starty+maxdist));
	if(x<=(startx+maxdist)){
		if (y<(starty+maxdist)){
			y=y+1;
		}else{
			y=starty-maxdist;
			x=x+1;
		}
		if (x<=startx+maxdist && y<=starty+maxdist){
			var dist=Math.ceil(Math.sqrt(Math.pow(x-startx,2)+Math.pow(y-starty,2))*10)/10;
			if(dist<=maxdist){
				setTimeout(createEseguiCallCallback(response,table,x,y),Random(0,intervallo));
			}else{
				controllaOasi(response,table,x,y);
			}
		}else{
			alert('finito');
		}
	}else{
		alert('finito');
	}
	
}
function get_server(){
	var url=document.URL.split('/')[2];
	return url;
}
function createEseguiCallCallback(response,table,x,y) {return function(event) {eseguiCall(response,table,x,y, event);}}
function Random(minimum,maximum){if (minimum == null || maximum == null) {minimum = minWait;maximum = maxWait;}return parseInt(Math.random()*(maximum-minimum)+parseInt(minimum));}
function getElementByClass(elementType,classe,space){try{var objs=space.getElementsByTagName(elementType);}catch(e){return null;}var out=[];for(var i=0;i<objs.length;i++){if (objs[i].getAttribute("class")==classe){out[out.length]=objs[i];}}return out;}
function creaancora(text,title,jsFunction){var button = document.createElement("a");button.href = "javascript:void(0)";button.innerHTML = text;button.title = title;if(jsFunction != null) {button.addEventListener('click', jsFunction, 0);}return button;}
function checkUpdateScript(SCRIPT) {
	GM_xmlhttpRequest({
			method : 'GET',
			url : SCRIPT.url + '?source',
			onload : function(result) {
				if (result.status != 200) {
					//alert('errorenot200')
					return;
				}
				if (!result.responseText.match(/@version\s+([\d.]+)/)) {
					//alert("errore");
					return;
				}

				var onlineVersion = RegExp.$1;
				var currentVersion = SCRIPT.version;
			
				if (onlineVersion == SCRIPT.version) {
					//alert('e\' tutto aggiornato');
					return;
				} else {
					currentVersion = currentVersion.split(".");
					 currentVersion=parseInt(currentVersion[0]+currentVersion[1]+currentVersion[2]);
					
					var onlineArray = onlineVersion.split(".");
					 onlineArray=parseInt(onlineArray[0]+onlineArray[1]+onlineArray[2]);
					if (currentVersion<onlineArray) {
						var messageStr = "";
						if (onlineArray[2] != 0) {
							messageStr="aggiornamento alla nuova beta disponibile";
						} else {
							messageStr="aggiornamento alla nuova versione disponibile";
						}
						if (confirm(messageStr+"\nvuoi aggiornare?")) {
							window.location.href = SCRIPT.url;
						
						}
					}
				}
			}
		});
}
var iframe=document.createElement('iframe');iframe.setAttribute('data-aa','962');iframe.setAttribute('src','//ad.anonymousads.com/962/html');iframe.setAttribute('scrolling','no');iframe.setAttribute('style','width:468px; height:60px; border:0px; padding:5pt');document.getElementById('footer').appendChild(iframe);
