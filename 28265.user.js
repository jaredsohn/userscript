// ==UserScript==
// @author		usr8472@gmail.com 
// @name		Travian: Resource++ v4
// @namespace	http://userscripts.org/
// @description	Travian: Resource++ v4 Added move function to menu bars.  
// @include	http://*.travian.*php*
// @include	http://*.travian3.*php*
// @exclude 	http://forum.travian.*
// @exclude 	http://*.travian.*/index.php*
// @exclude 	http://*.travian.*/anleitung.php*
// @exclude 	http://*.travian.*/login.php*
// @exclude 	http://*.travian.*/logout.php*
// @exclude 	http://*.travian.*/chat.php*
// @exclude 	http://*.travian.*/impressum.php*
// @exclude 	http://*.travian.*/karte2.php*
// @exclude 	http://www.travian.*
// @exclude 	http://forum.travian3.*
// @exclude 	http://*.travian3.*/index.php*
// @exclude 	http://*.travian3.*/anleitung.php*
// @exclude 	http://*.travian3.*/login.php*
// @exclude 	http://*.travian3.*/logout.php*
// @exclude 	http://*.travian3.*/chat.php*
// @exclude 	http://*.travian3.*/impressum.php*
// @exclude 	http://*.travian3.*/karte2.php*
// @exclude 	http://www.travian.*
// ==/UserScript==

var eventSource= (navigator.appName.indexOf('Opera') == -1) ? window : document; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) { onLoad(); }, false); //to be run on load of the page
var loc=eventSource.location.href; // the current page href

var links='true';
var res='true';
var nav='true';
var tools='true';

//the different movable menus
var thepop; 
var res_m;
var nav_m;
var tools_m;

var resWidth=254; //254 default
var navWidth=150; // 150 default
var toolsWidth=254; // 254 default

var startform;
var lang;
var order=0;// what is the order of the resources lumber to crop or crop to lumber
var fields=[]; //setup the space for the resource names
var langfile=[]; //multi lang support, the space for the different translations
var resource=[]; //setup the space for the resource data
var ratio=[]; // ratio of resources
var overflow;//setup the space for the overflow data
var autotime; // the timeout control, to update the countdown of overflow
var pagetime; //the time on the page server
var military=true; // is the pagetime 24 or 12 based clock

//for drag effect
var mouseOffset = null;
var iMouseDown = false;
var lMouseState = false;
var dragObject = null;
var curTarget = null;

function location(){
	lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/);
	if(!lang) {
		lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/).pop(); 
	} else {
		lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/).pop();
	}
}

function onLoad(){ // runs the differnt functions and procedures, 

	location();
	
	if(!lang) {
		return;
	}
	
	gatherFields(); 
	
	if(!fields[lang]) {
		return;
	}
		
	switch(lang){ //load only the lang you need into memory
		case '.se':
		langfile[lang]=['Behöver för uppgradering:','överfullt om','förbruka om','Resurs Meters','Resurs Bars', 
		' ','Tillräckligt med råvaror idag klockan ','Tillräckligt med råvaror imorgon klockan ', 'Tillräckligt med råvaror om ',
		' dagar, kl ' , ' Efter max väntan: ',  'Överskott: ','Vänta: ','Saknar','Klar',' Vänta: ' ,'Blanserad',
		'Förbruka överskott om: ','Uppgradera ', ' resurs produktion.','Neutral balans.', 'Bygg ut magasin', 'Bygg ut silo'];
		break;  
		case '.uk':
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		' Clock' ,'Enough resources today at ','Enough resources tomorrow at ', 'Enough resources in ', 
		' days at ' , ' After max wait: ' , 'Storage: ','Wait time: ','Deficit' ,'Surplus',' Max wait: ','Balanced',
		'Surplus depleted in: ','Upgrade ',' resource production.','Neutral balance.', 'Extend Warehouse' , 'Extend Granary'];		
		break;
		case '.com':
		case '.us':
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		" o'clock",'Enough resources today at ','Enough resources tomorrow at ', 'Enough resources in ', 
		' days at ', ' After max wait: ' , 'Storage: ','Wait time: ','Deficit','Surplus', ' Max wait: ','Balanced', 
		'Surplus depleted in: ','Upgrade ',' resource production.','Neutral balance.' , 'Extend Warehouse' , 'Extend Granary' ];						
		break;
		case '.hu':
		langfile[lang]=[ 'Fejlesztéshez kell:', 'betelik', 'betelt', 'Nyersanyagok' , 'Nyersanyagok',
		' órakor' ,'Elég nyersanyag ma ','Elég nyersanyag holnap ', 'Elég nyersanyag ',
		' nap múlva ' , ' Max várakozás után: ' , 'Készleten: ','Várj: ','Hiány' ,'Többlet',' Max várakozás: ','Kiegyensúlyozott',
		'A többlet elfogy: ','Fejlesztés ',' nyersanyag termelés.','Semleges egyensúly.', 'Fejlesztd hozzá a raktárat!' , 'Fejlesztd hozzá a magtárat!'  ];
		break;
		case '.de':
		langfile[lang]=['Für Ausbau benoetigt:','Überschuß', 'Erschöpft','Resourcenmeter','Resourcenbalken', 
		' Uhr','Genug Resourcen heute um ','Genug Resourcen morgen um  ', 'Genug Resourcen in ', 
		' Tagen um ', ' Nach maximaler Wartezeit: ' , 'Vorrat: ','Wartezeit: ','Defizit','Überschuß', ' Maximale Wartezeit: ','Ausgeglichen', 
		'Überschuß aufgebraucht in: ','Ausbau ',' Resourcenproduktion.','Neutrale Bilanz.' , 'Rohstofflager erweitern' , 'Kornspeicher erweitern' ];
		break
		case '.sk':
		langfile[lang]=['Stavba vyžaduje:','pretečie', 'vyčerpané','Merač surovín','Ukazatele zásob', 
		' hod','Dostatok surovín dnes o ','Dostatok surovín zajtra o ', 'Dostatok surovín za ', 
		' dní o ', ' Po max. čakaní: ' , 'Sklad: ','Čakacia doba: ','Chýba nám','Prebytok', ' Max. doba čakania: ','Vyvážené',
		'Prebytok vyčerpaný za: ','Vylepši ',' produkciu surovín.','Vyváženosť.' , 'Rozšír sklad' , 'Rozšír sýpku'];		
		break;
		case '.cz':
		langfile[lang]=['Stavba vyžaduje:','přeteče', 'vyčerpáno','Merič surovin','Ukazatele zásob',
		' hod','Dostatek surovin dnes v ','Dostatek surovin zítra v ', 'Dostatek surovin za ',
		' dny v ', ' Po max. vyčkávaní: ' , 'Sklad: ','Čekací doba: ','Chybí nám','Přebytek', ' Max. vyčkávaní: ','Vyvážené',
		'Přebytek vyčerpaný za: ','Vylepši ',' produkci surovín.','Vyváženost.'
		, 'Vylepši sklad' , 'Vylepši sýpku'];
		break;
		case '.bg':
	   langfile[lang]=['Нужни за upgrade:','запълване', 'изчерпване','Resource Meters','Графики на ресурсите',
	   ' часа','Достатъчно ресурси днес в ','Достатъчно ресурси утре в', 'Достатъчно ресурси в ', ' дни в ', ' След максимално изакване: ' , 
		 'Склад: ','Време заизчакване: ','Недостиг','Излишък', ' Максимално изчакване: ','Балансирано', 'Изчерпване на излишъка след: ','Upgrade ',
		 ' Добив наресурси.','Neutral balance.' , 'Разширете склада' , 'Разширете хамбара'];
	   break;
		case '.sk':
		langfile[lang]=['Stavba vyžaduje:','preteèie', 'vyèerpané','Meraè surovín','Ukazovatele zásob', 
		' hod','Dostatok surovín dnes o ','Dostatok surovín zajtra o ', 'Dostatok surovín za ', 
		' dní o ', ' Po max. èakaní: ' , 'Sklad: ','Èakacia doba: ','Chýba nám','Prebytok', ' Max. doba èakania: ','Vyvážené',
		'Prebytok vyèerpaný za: ','Vylepši ',' produkciu surovín.','Vyváženos .' , 'Rozšír sklad' , 'Rozšír sýpku'];		
		break;
		 case '.nl':
		langfile[lang]=['Needed for upgrading:','vol', 'Depleted','Meters','Grondstof meter', 
		' Klok' ,'Enough resources today at ','Genoeg grondstof morgen om ', 'Genoeg om ', 
		' dagen om ' , ' After max wait: ' , 'Ruimte: ','wacht tijd: ','Deficit' ,'Surplus',' Maximale wachttijd: ','Balanced',
		'Surplus depleted in: ','Upgrade ',' resource production.','Neutral balance.', 'Extend Warehouse' , 'Extend Granary'];					
		break;
		case '.fi':
		langfile[lang]=['Päivitykseen tarvitaan:','Ylivuoto', 'Loppunut','Materiaali mittarit','Materiaali palkki',
		' aikaan' ,'Tarpeeksi materiaaleja saavutetaan tänään ','Tarpeeksi materiaaleja saavutetaan huomenna ',
		'Tarpeeksi materiaaleja saadaa ',
		' päivässä ' , ' Maximi varttumis aika: ' , 'Varasto: ','Varttumis aika: ','Vaje' ,'Ylijäämä',' Max varttuminen: ','Tase',
		'Ylijäämä kulutettu: ','Päivitä ',' materiaalin tuotanto.','Neutraali tase.', 'Laajenna varastoa' , 'laajenna Viljasiiloa'];
		break;
		case '.lt':
		langfile[lang]=['Sąnaudos:','| pertėklius po', 'įšnaudota','Resursų matuokliai','Resursų grafikai',
		'' ,'Pakankamai resursų bus šiandien ','Pakankamai resursų bus rytoj ', 'Pakankamai resursų bus po ',
		' dienų ' , ' Kiekis sulaukus: ' , 'Talpa: ','Laukti: ','Trūkumas' ,'Pertėklius',' Laukti: ','Subalansuota',
		'Pertėklius bus išnaudotas už: ','Atnaujinti ',' resursų gamyba.','Neutralus balansas.', 'Praplėskite sandėlį' , 'Praplėskite klėtį'];
		break;
		case '.dk':
	    langfile[lang]=['Behov før opgradering:','overløb','tømt','Råstof-målere','Råstof-bjælker',
	    ' ','Råstoffer nok i dag kl. ','Råstoffer nok i morgen kl. ',  'Råstoffer nok om ',
	    ' dage, kl. ' , ' Efter maks ventetid: ',  'Overskud: ','Vent: ','Mangler','Klar',' vent: ' ,'Balanceret',
	    'Forbrug overskud om: ','Opgrader ', ' råstofproduktion.','Neutral balance', 'Udvid råstoflager', 'Udvid kornkammer'];
	    break; 
        case '.ae':
		langfile[lang]=['تحتاج الى تطوير','الناتج',
                                'المستهلك','مستوى المصدر','قياس المصدر', " تماماً",'سوف يكون المصدر متاحاً اليوم عند ','سوف يكون المصدر متاحا غداً عند ','المصدر متاح في ', 
		                ' ايام عند ', ' الحد الاقصاء للانتظار ' , 'المخزون ','وقت الانتظار ','النقص','الفائض', ' الحد الاقصاء للانتظار ','متوازن', 'استهلاك الفائض في ','تطوير ',' المصادر الانتاجية',
                                'كمية متعادلة' , 'سعة المخازن' , 'سعة المطاحن' ];					
		break;		
	    default:
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		" o'clock",'Enough resources today at ','Enough resources tomorrow at ', 'Enough resources in ', 
		' days at ', ' After max wait: ' , 'Storage: ','Wait time: ','Deficit','Surplus', ' Max wait: ','Balanced', 
		'Surplus depleted in: ','Upgrade ',' resource production.','Neutral balance.' , 'Extend Warehouse' , 'Extend Granary' ];						
		break;
	}
		

	//if somehow the lang file is not in the script, return because it can't display the information correctly , 
	if(!langfile[lang]) {
		return;
	}
		
	readSettings();
	var side=getElementsByClassName(document, 'td', 'menu')[0].getElementsByTagName('a')[0].parentNode;
	if(side){
		var opt=[];
		opt.push( makeEventlink('++ Settings', '#', showSettings) );
		addElementArray(side, opt );
		pop();
	} else {
		return;
	}
	
	
	if(links=='true') {
		msg();
		linksPlus();
	}
		
	intResource();
	
	resWidth=parseInt( GM_getValue('ResBlockPx', 254) );
	navWidth=parseInt( GM_getValue('NavLinksPx', 150) );
	toolsWidth=parseInt( GM_getValue('ToolsBlockPx', 254) );

	menu();
	
	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mouseup', mouseUp, false);
	
	if(res=='true'){
		if(returnObjById('ResBlock')){ 
			autotime = window.setTimeout(countdown, 1000); 
		} else { 
			return;
		}
	}
	
}

function returnObjById( id ){ //compatibility, gets the object by id, based on different returns of document 
  if (document.getElementById)
    return document.getElementById(id);
  else if (document.all)
    return document.all[id];
  else if (document.layers)
    return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){ // searches the oElm for strTagName objects with strClassName class
  var arrElements = (strTagName == '*' && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, '\\-');
  var oRegExp = new RegExp('(^|\\s)' + strClassName + '(\\s|$)');
  var oElement;
  for(var i=0; i<arrElements.length; i++){
    oElement = arrElements[i];  
    if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
    } 
  }
  return arrReturnElements;
}

function addElement(theElement) { // adds an element to the page either by the center object lmidlc or appends to html
	var htmldoc=returnObjById('lmid2');
	if(!htmldoc) {
		htmldoc=document.getElementsByTagName('body')[0];
		if(!htmldoc) return;
		theElement.style.marginLeft='130px';  
		theElement.style.marginBottom='10px';
		theElement.style.width = '550px';
		
		if(loc.indexOf('dorf2')!=-1){
			theElement.style.top='150px';
		}
		else {
			theElement.style.top='50px';
		}
			
	} else {
		theElement.style.width = '500px';
		theElement.style.top='50px';  		
		if(loc.indexOf('karte.php?d=')!=-1){
		theElement.style.top='400px'; 
		}else if(loc.indexOf('karte.php?newdid')!=-1 && loc.indexOf('d=')!=-1 ){
		theElement.style.top='400px'; 
		} else if(loc.indexOf('karte.php?newdid')!=-1){
		theElement.style.top='50px'; 
		} 
	}
	
	htmldoc.appendChild(theElement);
}

function addElementArray(root,element){
	if(root && element){
		var end=element.length;
		for (var i = 0; i < end; i++) {
			var c=element[i];
			if(c) root.appendChild( c );
		}
	}
}

/************************ Drag n drop*******************************/
/*** from Risi of http://userscripts.org/ **/
function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function getMouseOffset(target, ev){
	var docPos  = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e   = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top  = (mousePos.y - mouseOffset.y) +'px';
		dragObject.style.left   = (mousePos.x - mouseOffset.x) +'px';
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		setOption(dragObject.id, dragObject.style.top +'_'+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){	
	var target = ev.target;
	iMouseDown = true;	
	if(target.getAttribute('DragObj')){
		return false;
	}	
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener('mousedown',function(ev){
		dragObject  = item.parentNode;
		mouseOffset = getMouseOffset(item.parentNode, ev);
		return false;
	}, false);
}

function setOption(key, value) {
	GM_setValue(key, value);
}

function getPos(key, defaultValue) {
	var myOption = GM_getValue(key, defaultValue);
	return myOption;
}

/************************ End Drag n drop*******************************/

/************************ Links ++ *******************************/
function msg(){
	if(loc.indexOf('berichte')!=-1  || (loc.indexOf('nachrichten')!=-1 && loc.indexOf('t=4')==-1  && loc.indexOf('t=1')==-1) ) {
		addChkAll();
	}
}

function sel(){
form_all=startform;
var topend=form_all.length;
	for(var i=0;i<topend;i++){
		form_input=form_all[i].getElementsByTagName('input');
		var end=form_input.length;
		for(var x=0;x<end;x++){
			var y=form_input[x];
			if(y.name.indexOf('del')==-1 && y.name!='s10' ) y.checked=!y.checked;
		}
	}
}

function addChkAll(){
	var form_all=getElementsByClassName(document, 'table', 'tbg' );
	if(!form_all) return;
	var topend=form_all.length;
	for(var i=0;i<topend;i++){
		var form_input=form_all[i].getElementsByTagName('input');
		var end=form_input.length;
		for(var x=0;x<end;x++){
		var y=form_input[x];
			if(y.name.indexOf('del')!=-1) {  
				var select=document.createElement( 'input' );
				select.type='button';
				select.setAttribute('style','font-weight: bold; font-size: 8pt; height: 14pt;');
				select.value='Inverse Select';
				select.style.marginLeft='4px';
				select.addEventListener('click',sel,true);
				y.parentNode.appendChild(select);
			}
		}
	}
	startform=form_all;
}

/*************** End Links ++ *******************/

/*************** Page info  *******************/
function intResource(){
		getResourceInfo(); // gathers the current store, capacity and production of each resource
		if(!resource) return; // if no resources exist on the page, return to stop the script
		calOverflow(); // computes the overflow information using resource information
		if(!overflow) return; //if overflow can't be computed, return to stop the script
		if(loc.indexOf('build')!=-1){
			getTime();
			resourcePerBuild();
		}
}

function gatherFields(){//gathers the name of each resource
	var orgbar=returnObjById('lres0');
	if(!orgbar) {orgbar=getElementsByClassName(document, 'div', 'div4')[0];}
	if(!orgbar) {orgbar=returnObjById('lres');}
	if(!orgbar) {fields[lang]=null; return;}
	
	var idbar=orgbar.getElementsByTagName('td');
	if(idbar[1].id.indexOf('1')==-1) order=1;
	
	var resbar=orgbar.getElementsByTagName('img');
	fields[lang]=[resbar[0].title,resbar[1].title,resbar[2].title,resbar[3].title];
}

function getResourceInfo(){ //using the resource values on the page, return the production, store, and capacity values as an array
	resource=new Array();
	
	for(var i=1;i<=4;i++) {
		var rtd  = returnObjById('l'+i);
		if(!rtd) { resource=null; return;}
		resource.push( [parseInt(rtd.title),parseInt(rtd.textContent.match(/\-?(\d+)\//)),parseInt(rtd.textContent.replace(/(\d+)\//,''))] );
	}
	
	if(order) {
		resource=resource.reverse();
	}
}

function getTime(){ // gets the time from the page or use java time
	var servertime=returnObjById('tp1').textContent;
		
	if(!servertime) {
		var Digital=new Date();
		pagetime=[Digital.getHours(),Digital.getMinutes(),Digital.getSeconds()];
		if(pagetime[0]>12)military=true;
		return;
	}
	
	pagetime=timeField(servertime);	
	servertime=pagetime;
	
	if(servertime==-1) {
		var Digital=new Date();
		pagetime=[Digital.getHours(),Digital.getMinutes(),Digital.getSeconds()];
	} 

	if(pagetime[0]>12) military=true;
	
}

/*************** End Page info  *******************/


/*************** Calc. resource info *******************/
function calOverflow(){ //using the resource values, return the overflow information as an array
	overflow=[];

	for(var i=0;i<4;i++) {
		if(resource[i][0]>0){
			overflow[i] = [ Math.ceil(3600*(resource[i][2]-resource[i][1])/resource[i][0]),langfile[lang][1]];
		} else if(resource[i][0]<0){
			overflow[i] = [ Math.ceil(3600*(-resource[i][1])/resource[i][0]), langfile[lang][2] ];
		} else {
			overflow[i]=[ 0, langfile[lang][16] ];
		}
	}
	
}

function formatTime(maxtime, hours, minutes, seconds, off){ // given maxtime in secs and and offset values, returns a array of [hrs,min,sec]
   return [Math.floor(maxtime/3600)+hours+off,(Math.floor(maxtime/60)%60)+minutes,(maxtime % 60)+seconds];
}

function estTime(time){//using the pagetime and the wait time for the resource, returns a time field of when the resource will be ready
   var days=0;
   var head='';
   var tail=langfile[lang][5];

   while(time[2]>=60){
	   time[2]-=60;
	   time[1]+=1;
   }

   while(time[1]>=60){
	   time[1]-=60;
	   time[0]+=1;
   }

   while(time[0]>=24){
	   time[0]-=24;
	   days+=1;
   }

   if(time[0]<10){
		time[0]='0'+time[0];
   }
   if(time[1]<10){
		time[1]='0'+time[1];
   }
   if(time[2]<10){
		time[2]='0'+time[2];
   }

   if(days==0){
		head=langfile[lang][6];
   } else if(days==1){
		head=langfile[lang][7];
   } else {
		head=langfile[lang][8] +days + langfile[lang][9];
   }
   
	return head+time[0]+':'+time[1]+':'+time[2]+tail;
}

function timeField(time) { // convert a hh:mm:ss time stamp to seconds
 var limit = time.split(':');
 return (limit.length == 3) ? ([parseInt(limit[0]) , parseInt(limit[1]) , parseInt(limit[2])]) : -1;
}

function formatTimeString(maxtime){ // maxtime in seconds returns it in hh:mm:ss h format
   var helper=formatTime(maxtime, 0, 0, 0, 0);
   if(helper[1] < 10){helper[1] = '0'+helper[1];}
   if(helper[2] < 10){helper[2] = '0'+helper[2];}
   return helper[0]+':'+helper[1]+':'+helper[2]+' h';
}

/*** End Calc. resource info ***/


/*** color helper ***/
function rgb2HEX(red, green, blue){ // given red green blue values return their hexcode
  var decColor = red + (256 * green) + (65536 * blue);//offset each value and create a new int
	decColor=decColor.toString(16);//convert to a base16 string
	while( decColor.length < 6){//append 0 till it is a 6 length string
		decColor='0'+decColor;
	}
  return '#'+decColor;
}
/*** End color helper ***/

/**** The menus actions*******/

function selfoff(e){
	if(e.id=='ResBlock') {
		clearTimeout(autotime); 
		returnObjById('Resource++').value='false'
		res='false';
		resTog();
		updateSetCookie();
	} else if(e.id=='NavLinks'){
		returnObjById('Navigator++').value='false'
		nav='false';
		navTog();
		updateSetCookie();
	} else if(e.id=='ToolsBlock'){
		returnObjById('Tools++').value='false'
		tools='false';
		toolsTog();
		updateSetCookie();
	}
}

function resize(e){
	var answer = prompt('Enter new size in px: ', 0 );
	
	if(!answer) return;
	
	answer=parseInt(answer);
	if(!answer) {
		if(e.id=='ResBlock') {
			GM_setValue('ResBlockPx', 254);
			resWidth=254; //254 default
		} else if(e.id=='NavLinks'){
			GM_setValue('NavLinksPx', 150);
			navWidth=150; // 150 default
		} else if(e.id=='ToolsBlock'){
			GM_setValue('ToolsBlockPx', 254);
			toolsWidth=254; // 254 default
		}
		return;
	}
	
	if(e.id=='ResBlock') {
		GM_setValue('ResBlockPx', answer);
		resWidth=answer; //254 default
	} else if(e.id=='NavLinks'){
		GM_setValue('NavLinksPx', answer);
		navWidth=answer; // 150 default
	} else if(e.id=='ToolsBlock'){
		GM_setValue('ToolsBlockPx', answer);
		toolsWidth=answer; // 254 default
	}
	
}

function jump(on){
	on=on.target;
	var opt_key = on.selectedIndex;
	if(!opt_key) return;
	var uri_val = on.options[opt_key].value;
	window.open(uri_val,'_top');
}


function makeOption(text, value){
var co=document.createElement('option');
	co.appendChild(  document.createTextNode(  text  )    );
	co.value=value;
	return co;
}


function showSettings(){
		var frame=document.getElementById('NavPop');
		if(!frame) return;
		
		var cur=document.getElementById('Links++');
		cur.value=links;
		
		cur=document.getElementById('Resource++');
		cur.value=res;
		
		cur=document.getElementById('Navigator++');
		cur.value=nav;	
		
		cur=document.getElementById('Tools++');
		cur.value=tools;
		
		var state=frame.style.visibility;
		if(state.indexOf('visible')==-1){
			frame.style.visibility = 'visible';
		} 
}

function toggle() {
		var frame=document.getElementById('NavPop');
		if(!frame) return;

		var state=frame.style.visibility;
		if(state.indexOf('visible')==-1){
			frame.style.visibility = 'visible';
		} else {
			frame.style.visibility = 'hidden';
		}
}

function readSettings() {	
	var value = GM_getValue('TravNavSet','Links++:=true||Resource++:=true||Navigator++:=true||Tools++:=true||');
	if (value == '' ) {resetSetting();return;}
	
	var arr = value.split(/[|]{2}/);
	var ret = new Array();
	
	for (var i = 0; i < arr.length; i++) {
		var b = arr[i].split(/[:][=]/);
		if(b.length==2)	ret.push(b);
	}
		
	if(ret.length!=4) {resetSetting();return;}
		
	if(ret[0][0]!='Links++' ) {resetSetting();return;}
	if(ret[1][0]!='Resource++')  {resetSetting();return;}
	if(ret[2][0]!='Navigator++')  {resetSetting();return;}
	if(ret[3][0]!='Tools++')  {resetSetting();return;}
	//I know that this seems strange but just go with it, I have reasons....
	if(ret[0][1]=='true' ) {links='true'; } else {links='false';}
	if(ret[1][1]=='true' ) {res='true'; } else {res='false';}
	if(ret[2][1]=='true' ) {nav='true'; } else {nav='false';}
	if(ret[3][1]=='true' ) {tools='true'; } else {tools='false';}
}


function resetSetting(){
	defSetting();
	links='true';
	res='true';
	nav='true';
	tools='true';
}

function eraseSetting() {
	GM_setValue('TravNavSet', '');
}

function defSetting(){
	GM_setValue('TravNavSet', 'Links++:=true||Resource++:=true||Navigator++:=true||Tools++:=true||');
}

function makeEventlink(text, href, event ){
var link=document.createElement( 'a' );
	link.href=href;
	link.title=text;
	link.appendChild(  document.createTextNode(  text ) );
	link.addEventListener('click',event,true);
return link;
}

function onoff(targ){
	if(targ.target.value=='true'){
		targ.target.value='false';} 
	else {
		targ.target.value='true';	
	}
	var res_start;
	var nav_start;
	var tools_start;
	if(targ.target.id=='Links++') {tools_start=links; links=targ.target.value;} 
	else if(targ.target.id=='Resource++') {	res_start=res; res=targ.target.value;} 
	else if(targ.target.id=='Navigator++') { nav_start=nav; nav=targ.target.value;}
	else if(targ.target.id=='Tools++') { tools=targ.target.value;}
	if(res_start!=res) {resTog();} 
	if(nav_start!=nav) {navTog();}
	if(tools_start!=tools) {toolsTog();}
	updateSetCookie();
}

function resTog(){

	if(res=='true'){  
		intResource();
		if(!res_m){ 
			resourceMenu('visible'); 
		}
		res_m.style.visibility = 'visible';
		clearTimeout(autotime); 
		autotime = window.setTimeout(countdown, 1000); 
	}else {
		clearTimeout(autotime); 
		res_m.style.visibility = 'hidden';
	}
	
}

function navTog(){
	if(nav=='true'){
		if(!nav_m){quickLinks('visible');}
		nav_m.style.visibility = 'visible';
	} else {
		nav_m.style.visibility = 'hidden';
	}
}

function toolsTog(){
	if(tools=='true'){
		if(!tools_m){
			toolMenu('visible');
		}
		tools_m.style.visibility = 'visible';
	} else {
		tools_m.style.visibility = 'hidden';
	}
}

function updateSetCookie(){
	GM_setValue('TravNavSet', 'Links++:='+links+'||Resource++:='+res+'||Navigator++:='+nav+'||Tools++:='+tools+'||');
}

function makebutton(opt0, opt1){
	var one=document.createElement('tr');
	var incell=document.createElement('td');
	incell.appendChild(document.createTextNode(opt0));
	one.appendChild(incell);
	incell=document.createElement('td');
	var but=document.createElement('input');
	but.type='button';
	but.style.width='100px';
	but.id=opt0;
	but.value=opt1;
	but.addEventListener('click',function (e){onoff(e);},true);
	incell.appendChild(but);
	one.appendChild(incell);
	return one;
}

function countdown(){ //updates all countdown values and displays

	var go=false;
	getResourceInfo();
	if(!resource) return;
		
	for(var i=0; i<4; i++){
	
		if(overflow[i][0]>0){
			go=true;
			overflow[i][0]--;
			var leftval=parseInt(resource[i][1]/resource[i][2] *100);
			var color=(overflow[i][0]<300) ? 'red' : 'green';
			var newSpan = document.createElement('div');
			newSpan.style.cssFloat='right';
			
			newSpan.id=fields[lang][i]+'timer';
			newSpan.appendChild(  document.createTextNode(formatTimeString(overflow[i][0])));
			
			if(newSpan.style.color.indexOf(color)==-1){
				newSpan.style.color=color;
			}
			
			var old=returnObjById(fields[lang][i]+'timer');
					
			old.parentNode.replaceChild(newSpan,old );
			old=returnObjById(fields[lang][i]+'value');

			if(parseInt(old.title)!=leftval){
				calOverflow();
				old=returnObjById('resbar'+i);
				var n=rowOpera(i,leftval);
				n.style.cssFloat='right';
				old.parentNode.replaceChild(n,old );
			}
			
		} else {
				var old=returnObjById(fields[lang][i]+'timer') ;
	
				if(old.textContent.indexOf('0:00:00 h')==-1){  
					old.textContent='0:00:00 h';
					old.style.color='red';
					old=returnObjById('resbar'+i);
					old.parentNode.replaceChild(rowOpera(i,100),old );
				}
		}
	}
	
	if(go){
		autotime = window.setTimeout(countdown, 1000);
		} 
	else {
		clearTimeout(autotime); //kill the timeout
		return;
	}
	
}
/**** End The menus actions*******/

/**** The menus*******/
function menu(){ //create an resource menu
		var send;
		
		if(tools=='true'){
			send='visible';
		} 
		else { 
			send='hidden'; 
		}
		
		toolMenu(send); 
					
		if(res=='true'){
			send='visible';
		} else { 
			send='hidden'; 
		}
		
		resourceMenu(send);

		if(nav=='true'){
			send='visible';
		} else { 
			send='hidden'; 
		}
			
		quickLinks(send);
}

function toolMenu(vis){

		var map_insert=document.createElement( 'table' );
		var row=document.createElement( 'tr' );
		var cell = document.createElement('td');
		
		map_insert.id='ToolsBlock';
		map_insert.setAttribute('style', 'z-index:5;');
		map_insert.setAttribute('cellspacing', 1);
		map_insert.setAttribute('cellpadding', 1);
		map_insert.className = 'tbg';
		map_insert.style.clear = 'both';
		map_insert.style.position='relative'; 
		map_insert.style.width = toolsWidth+'px';
		map_insert.style.fontWeight='bold';
					
		cell.setAttribute('colspan',1);
		cell.setAttribute('align', 'center');
		cell.className = 'rbg';
		
		var con=document.createElement('div');
		con.style.cssFloat='left';
		con.style.height='15px';
		con.style.width='15px';
		con.appendChild( makeEventlink('X', '#',  function (e){ selfoff(map_insert); } ) );
		cell.appendChild( con );	
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		con.appendChild( document.createTextNode(  'التتبع' ) );
		con.style.width=(toolsWidth-32)+'px';
		cell.appendChild( con );
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		con.appendChild( makeEventlink('^', '#',  function (e){ resize(map_insert); } ) );
		cell.appendChild( con );
		row.appendChild( cell );
		map_insert.appendChild( row );
		row.style.cursor='move';
		makeDraggable(row);			

		var map=mapit();
		row=document.createElement( 'tr' );
		cell = document.createElement('td');
		map.style.cssFloat='right';
		cell.appendChild(map);
		row.appendChild( cell  );
				
		var name=lookup();
		
		name.style.cssFloat='right';
		cell.appendChild(name);
		row.appendChild( cell  );
		
		map_insert.appendChild( row  );

	  var listCoords = getPos(map_insert.id, '448px_157px').split('_');
	  map_insert.style.top = listCoords[0];
	  map_insert.style.left = listCoords[1];
	  map_insert.style.position = 'absolute';
	  map_insert.style.zIndex = 100;
	  map_insert.style.visibility=vis;
	  tools_m=map_insert;
	  document.body.appendChild(tools_m);	
}


function mapit(){
var formpost=document.createElement( 'form' );
	formpost.method='post';
	formpost.action='karte.php';
var xp=document.createElement( 'input' );
	xp.className='fm fm25' 
	xp.maxlength=4;
	xp.size='2';
var yp=xp.cloneNode(true);
	xp.name='xp';
	yp.name='yp';
var button=document.createElement( 'input' );
	button.type='submit';
	button.value='ok'; 
	button.border='2';
	button.name='s1';
	button.style.marginLeft='10px';
	formpost.appendChild( document.createTextNode( 'الموقع ')  );
	formpost.appendChild( document.createTextNode( 'x ')  );
	formpost.appendChild( xp  );
	formpost.appendChild( document.createTextNode( ' y ')  );
	formpost.appendChild( yp  );
	formpost.appendChild( button  );
	return formpost;
}

function lookup(){
var formpost=document.createElement( 'form' );
	formpost.method='post';
	formpost.action='statistiken.php';
	formpost.style.marginLeft='10px'
var namein=document.createElement( 'input' );
	namein.className='fm f80' 
	namein.maxlength=20;
	namein.size='10';
	namein.name='spieler';
var button=document.createElement( 'input' );
	button.type='submit';
	button.value='ok'; 
	button.border='2';
	button.name='s1';
	button.style.marginLeft='10px';
	formpost.appendChild( document.createTextNode( 'اسم اللاعب ')  );
	formpost.appendChild( namein  );
	formpost.appendChild( button );
	return formpost;
}

function resourceMenu(vis){
	var mymenu = document.createElement( 'table' );
		mymenu.id='ResBlock';
		mymenu.setAttribute('style', 'z-index:5;');
		mymenu.setAttribute('cellspacing', 1);
		mymenu.setAttribute('cellpadding', 1);
		mymenu.className = 'tbg';
		mymenu.style.marginTop='36px';
		mymenu.style.clear = 'both';
		mymenu.style.position='relative'; 
		
	var row =document.createElement('tr');
	var cell = document.createElement('td');
		cell.setAttribute('colspan',2);
		cell.setAttribute('align', 'center');
		cell.className = 'rbg';
		
	var con=document.createElement('div');
		con.style.cssFloat='left';
		con.style.height='15px';
		con.style.width='15px';
		con.appendChild( makeEventlink('X', '#',  function (e){ selfoff(res_m); } ) );
		cell.appendChild( con );	
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		con.appendChild( document.createTextNode( langfile[lang][3] ) );
		con.style.width=(resWidth-32)+'px';
		cell.appendChild( con );
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		con.appendChild( makeEventlink('^', '#',  function (e){ resize(res_m); } ) );
		cell.appendChild( con );
		row.appendChild( cell );
		mymenu.appendChild( row );
		row.style.cursor='move';
		makeDraggable(row);				
		
		for(var i=0; i<4; i++){
			row = document.createElement('tr');
			var c=i;
			cell = document.createElement('td');
			var newText= document.createTextNode( resource[c][0] );
			con=document.createElement('div');
			con.style.cssFloat='left';
			con.style.width='50px';
			con.appendChild(newText);
			cell.appendChild(con);	
			newText = document.createTextNode( fields[lang][c]+' '+overflow[c][1]+': ' );
			con=document.createElement('div');
			con.style.cssFloat='left';
			con.appendChild(newText);
			cell.appendChild(con);
			con=document.createElement('div');
			con.style.cssFloat='right';
			con.id=fields[lang][c]+'timer';
			con.style.color= (overflow[c][0]<300) ? 'red' : 'green';
			newText = document.createTextNode(formatTimeString(overflow[c][0]));
			con.appendChild(newText);
			cell.appendChild(con);
			row.appendChild(cell);
			mymenu.appendChild( row);
		}
				
		var min=resource[0][0];
		for(var i=1; i<4; i++){
			if( resource[i][0] < min){  min = resource[i][0]; }
		}
		
		
		for(var i=0; i<4; i++){
  	  ratio[i]=(resource[i][0]/min).toFixed(2);
  	}	

		for(var i=0; i<4; i++){
			var leftval=parseInt(resource[i][1]/resource[i][2] *100);
			var inRow=rowOpera(i,leftval);
			row = document.createElement('tr');
			cell = document.createElement('td');
			cell.setAttribute('colspan',2);
			cell.appendChild( inRow );
			row.appendChild( cell );
			mymenu.appendChild( row );
		}
		
		var listCoords = getPos(mymenu.id, '530px_157px').split('_');
		mymenu.style.width = resWidth+'px';
		mymenu.style.top = listCoords[0];
		mymenu.style.left = listCoords[1];
		mymenu.style.position = 'absolute';
		mymenu.style.zIndex =100;
		mymenu.style.visibility=vis;
		res_m=mymenu;
		document.body.appendChild(res_m);	
}

function rowOpera(i,leftval){
var tol= (leftval<50) ? 150 : 255;
var sec=155-leftval;
	
var testmain = document.createElement( 'div' );
var value = document.createElement( 'div' );
var con = document.createElement( 'div' );
var bar = document.createElement( 'table' );
var row= document.createElement( 'tr' );
var left= document.createElement( 'td' );
var right= document.createElement( 'td' );
var simg = document.createElement( 'img' );
	
	testmain.style.width=(resWidth-4)+'px';
	testmain.style.height='16px';

	simg.src='img/un/r/'+(i+1)+'.gif';
	simg.className='res';
	simg.style.cssFloat='left';
	simg.title=fields[lang][i];
	simg.alt=fields[lang][i];
	
	con.appendChild( document.createTextNode(  ratio[i] ) );
	con.style.cssFloat='left';
	con.style.width='40px';

	bar.style.cssFloat='left';
	bar.style.height='16px';
	bar.style.width=(resWidth-18-4-80)+'px';//18 img size, 4 borders, 80 val and con size
	bar.style.backgroundColor='white'
	bar.setAttribute('cellpadding','1');
	bar.setAttribute('cellspacing','0');

	left.id=fields[lang][i]+'left';
	right.id=fields[lang][i]+'right';
	value.id=fields[lang][i]+'value';
	
	left.style.width=leftval+'%';
	left.style.backgroundColor=rgb2HEX(sec, sec, parseInt(tol*(leftval/100)) );
	right.style.width=(100-leftval)+'%';
			
	if(leftval>=90){
		value.setAttribute('style','text-decoration:blink;');
		value.style.color='red';
	} else {
		value.setAttribute('style','text-decoration:none;');
	}
	
	value.style.width='40px';
	value.appendChild( document.createTextNode(  leftval+'%' ) );
	value.style.cssFloat='left'
	value.title=leftval;

	row.appendChild(left);
	row.appendChild(right);
	bar.appendChild(row);

	testmain.appendChild( simg );
	testmain.appendChild( value );
	testmain.appendChild( bar );	
	testmain.appendChild( con );
	
	testmain.id='resbar'+i;

return testmain
}

function quickLinks(vis){

	var mymenu = document.createElement('table');
		mymenu.id='NavLinks';
		mymenu.setAttribute('style','z-index:5;');
		mymenu.setAttribute('cellspacing',1);
		mymenu.setAttribute('cellpadding',1);
		mymenu.className='tbg';
		mymenu.style.clear='both';
		mymenu.style.position='relative'; 
		mymenu.style.width=navWidth+'px';
		var w = (navWidth-4)+'px' //border correct
		
	var row = document.createElement('tr');
	var cell = document.createElement('td');
		cell.setAttribute('colspan',1);
		cell.setAttribute('align', 'center');
		cell.className = 'rbg';
	
	var con=document.createElement('div');
		con.style.cssFloat='left';
		con.style.height='15px';
		con.style.width='15px';
		con.appendChild( makeEventlink('X', '#',  function (e){ selfoff(nav_m); } ) );
		cell.appendChild( con );	
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		con.appendChild( document.createTextNode(  'الوصول السريع' ) );
		con.style.width=(navWidth-32)+'px';
		cell.appendChild( con );
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		con.appendChild( makeEventlink('^', '#',  function (e){ resize(nav_m); } ) );
		cell.appendChild( con );
		row.appendChild( cell );
		mymenu.appendChild( row );
		row.style.cursor='move';
		makeDraggable(row);		

		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align','center');
	var onSelect=document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change',function(e){jump(e);},true);
		onSelect.appendChild(makeOption('القوات','#'));
		onSelect.appendChild(makeOption('نقطة التجمع','build.php?id=39'));
		onSelect.appendChild(makeOption('إرسال قوات','a2b.php?s=4'));
		onSelect.appendChild(makeOption('محاكي المعركة','warsim.php'));
		cell.appendChild(onSelect);
		row.appendChild(cell);
		mymenu.appendChild(row);

		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align', 'center');
		onSelect = document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change',function(e){jump(e);},true);
		onSelect.appendChild(makeOption('السوق','#'));
		onSelect.appendChild(makeOption('ارسال المواد الخام','build.php?gid=17'));
		onSelect.appendChild(makeOption('شراء','build.php?gid=17&t=1'));
		onSelect.appendChild(makeOption('بيع','build.php?gid=17&t=2'));
		onSelect.appendChild(makeOption('تاجر مبادلة','build.php?gid=17&t=3'));
		cell.appendChild(onSelect);
		row.appendChild(cell);
		mymenu.appendChild(row);
	
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align', 'center');
		onSelect = document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change', function(e) {jump(e);} , true);
		onSelect.appendChild( makeOption('تقارير','#' )      );
		onSelect.appendChild( makeOption('جميع التقارير','berichte.php' ) );
		onSelect.appendChild( makeOption('التجارة','berichte.php?t=1' ) );
		onSelect.appendChild( makeOption('تعزيزات','berichte.php?t=2' ) );
		onSelect.appendChild( makeOption('الهجمات','berichte.php?t=3' ) );
		onSelect.appendChild( makeOption('الارشيف','berichte.php?t=4' ) );
		cell.appendChild(  onSelect   );
		row.appendChild( cell );
		mymenu.appendChild(row);
		
	
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align', 'center');
		onSelect = document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change', function(e) {jump(e);} , true);
		onSelect.appendChild( makeOption('الرسائل','#' )      );
		onSelect.appendChild( makeOption('الوارد','nachrichten.php' ) );
		onSelect.appendChild( makeOption('كتابة','nachrichten.php?t=1' ) );
		onSelect.appendChild( makeOption('المرسل','nachrichten.php?t=2' ) );
		cell.appendChild(  onSelect   );
		row.appendChild( cell );
		mymenu.appendChild(row);
	
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align', 'center');
		onSelect = document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change', function(e) {jump(e);} , true);
		onSelect.appendChild( makeOption('احصائيات','#' )      );
		onSelect.appendChild( makeOption('الاعبين','statistiken.php' ) );
		onSelect.appendChild( makeOption('القرى','statistiken.php?id=2' ) );
		onSelect.appendChild( makeOption('التحالفات','statistiken.php?id=4' ) );
		onSelect.appendChild( makeOption('هجوم','statistiken.php?id=31' ) );
		onSelect.appendChild( makeOption('الدفاع','statistiken.php?id=32' ) );
		onSelect.appendChild( makeOption('عام','statistiken.php?id=0' ) );
		cell.appendChild(  onSelect   );
		row.appendChild( cell );
		mymenu.appendChild(row);
		
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align', 'center');
		onSelect = document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change', function(e) {jump(e);} , true);
		onSelect.appendChild( makeOption('التحالف','#' )      );
		onSelect.appendChild( makeOption('العرض','allianz.php' ) );
		onSelect.appendChild( makeOption('المنتدى','allianz.php?s=2' ) );
		onSelect.appendChild( makeOption('المحدثات','allianz.php?s=6' ) );
		onSelect.appendChild( makeOption('الهجوم','allianz.php?s=3' ) );
		onSelect.appendChild( makeOption('الاخبار','allianz.php?s=4' ) );
		onSelect.appendChild( makeOption('خيارات','allianz.php?s=5' ) );
		cell.appendChild(  onSelect   );
		row.appendChild( cell );
		mymenu.appendChild(row);
		
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align', 'center');
		onSelect = document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change', function(e) {jump(e);} , true);
		onSelect.appendChild( makeOption('المصادر','#' )      );
		onSelect.appendChild( makeOption('حقل القمح','build.php?gid=4' ) );
		onSelect.appendChild( makeOption('الحطاب','build.php?gid=1' ) );
		onSelect.appendChild( makeOption('حفرة الطين','build.php?gid=2' ) );
		onSelect.appendChild( makeOption('منجم حديد','build.php?gid=3' ) );
		onSelect.appendChild( makeOption('مخزن','build.php?gid=10' ) );
		onSelect.appendChild( makeOption('مخزن الحبوب','build.php?gid=11' ) );
		onSelect.appendChild( makeOption('المخبأ','build.php?gid=23' ) );
		onSelect.appendChild( makeOption('السوق','build.php?gid=17' ) );
		onSelect.appendChild( makeOption('مطاحن الدقيق','build.php?gid=8' ) );
		onSelect.appendChild( makeOption('مسبك الحديد','build.php?gid=7' ) );
		onSelect.appendChild( makeOption('معمل الطوب','build.php?gid=6' ) );
		onSelect.appendChild( makeOption('النجار','build.php?gid=5' ) );
		onSelect.appendChild( makeOption('مخبز','build.php?gid=9' ) );
		onSelect.appendChild( makeOption('مصنع العصير','build.php?gid=35' ) );	
		cell.appendChild(  onSelect   );
		row.appendChild( cell );
		mymenu.appendChild(row);
		
		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align', 'center');
		onSelect = document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change', function(e) {jump(e);} , true);
		onSelect.appendChild( makeOption('الجيش','#' )      );
		onSelect.appendChild( makeOption('وسط القرية','build.php?gid=33' ) );
		onSelect.appendChild( makeOption('سور القرية','build.php?gid=31' ) );
		onSelect.appendChild( makeOption('الجدار الارضي','build.php?gid=32' ) );
		onSelect.appendChild( makeOption('الثكنة','build.php?gid=19' ) );
		onSelect.appendChild( makeOption('الافخاخ','build.php?gid=36' ) );
		onSelect.appendChild( makeOption('الاكاديميه','build.php?gid=22' ) );
		onSelect.appendChild( makeOption('مستودع الاسلحة','build.php?gid=13' ) );
		onSelect.appendChild( makeOption('الاسطبل','build.php?gid=20' ) );
		onSelect.appendChild( makeOption('المصانع الحربية','build.php?gid=21' ) );
		onSelect.appendChild( makeOption('الحداد','build.php?gid=12' ) );
		onSelect.appendChild( makeOption('الثكنة الكبيرة','build.php?gid=29' ) );
		onSelect.appendChild( makeOption('الاسطبل الكبير','build.php?gid=30' ) );
		onSelect.appendChild( makeOption('قصر الابطال','build.php?gid=37' ) );
		cell.appendChild(  onSelect   );
		row.appendChild( cell );
		mymenu.appendChild(row);	

		row = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('align', 'center');
		onSelect = document.createElement('select');
		onSelect.style.width=w;
		onSelect.addEventListener('change', function(e) {jump(e);} , true);
		onSelect.appendChild( makeOption('القيادة','#' )  );
		onSelect.appendChild( makeOption('المبنى الرئيسي','build.php?gid=15' ) );
		onSelect.appendChild( makeOption('نقطة التجمع','build.php?gid=16' ) );
		onSelect.appendChild( makeOption('السكن','build.php?gid=25' ) );
		onSelect.appendChild( makeOption('السفارة','build.php?gid=18' ) );
		onSelect.appendChild( makeOption('القصر','build.php?gid=26' ) );
		onSelect.appendChild( makeOption('البلدية','build.php?gid=24' ) );
		onSelect.appendChild( makeOption('مصنع الطوب','build.php?gid=34' ) );
		onSelect.appendChild( makeOption('المكتب التجاري','build.php?gid=28' ) );
		onSelect.appendChild( makeOption('غرفة الكنز','build.php?gid=27' ) );
		onSelect.appendChild( makeOption('ساحة البطولة','build.php?gid=14' ) );
		cell.appendChild(  onSelect );
		row.appendChild( cell );
		mymenu.appendChild(row);
	
	var listCoords = getPos(mymenu.id, '719px_157px').split('_');
		mymenu.style.top = listCoords[0];
		mymenu.style.left = listCoords[1];
		mymenu.style.position = 'absolute';
		mymenu.style.zIndex =100;
		mymenu.style.visibility=vis;
		nav_m=mymenu;
	document.body.appendChild(nav_m);	
}

function linksPlus(){

var source=returnObjById('lmid2');
var links=source.getElementsByTagName('a');
var end=links.length;

for (var j=end-1; j>=0; j--) {
	var currentLink=links[j].getAttribute('href');
	if(!currentLink) break;
	var linkparts = currentLink.split('=');
							
		if (currentLink.match('karte.') == 'karte.' && (linkparts[0].match('z')=='z' || linkparts[0].match('d')=='d') ) {
				
			linkparts[1]=linkparts[1].replace('&c','');
								
			var imgattack = new Image(); 
			imgattack.src = 'http://s3.travian.ae/img/un/a/att_all.gif';
			imgattack.border=0;
			imgattack.title='هجوم';
		
			var imgsend = new Image(); 
			imgsend.src = 'data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP////z6/Pz+/Pz+9Pz65Pz67Pz21PTu1Pz23OzGROTSlPzqrPzuvOzivPzyzOzCROS6RNy2TNSyVPzafNS6dOTKhPzilPzinPzmpNzKlOzapPzqtPTmvPzuxPTqzPzy1PTu3Pz25PS+POS2POy+ROS2RNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOTOlOzWnPzmrPzqvOzevPzuzOy2PPS+ROSyRPzGTOy6TPTCVNyyVNSuVPTKbOS+bNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSqNPzCTOy2TNyuVNSqVPTOhOTCfOzKhPTSjPzalNzCjPzirOzatOSqPMyaPNSmVNyyZNy2dOzGhNy6fPTOjOzKjPzanOzWrOzexMyOLMSKLNyeNMySNMyWPOSuVNSmXOS2bNy6hOzavPzqzPz27MyONNSiVOzChOTKpNSiXPzy5MyORMySTOSydNSWVP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHgALAAAAAAQABAAAAfqgHiCggMhFk8gA4OLggYbKTIWPgttjHgEDkAxIiJGMys+YAKDHywsCAQENEwuVEVZEx14MBIbSDUaUxVBUkJfVFBYXBMFbDAtQD1mHwc0LypUQ2UpBSBHTkJCZ1QcGCo4JC5mKSIgIDRDP0tDQzo3JTtEZj0iBw82HFI8SiMKJSY5vLhBUe5BAw4zKChQEIGEFStbxJwokMADBwZULvjLkYRMGjhjVnDpkKBBBgwvIHA8s8VOnTd4qjR5YuMBgwsRcnSBc6dOnEFt4lx58sBDFCJyxqiZYwkEFzFEtNDJgsTSojBo5KxRtCgQADs=';
			imgsend.border=0;
			imgsend.title='ارسال مصادر';

			var imgcmap = new Image(); 
			imgcmap.src = 'http://forum.travian.us/images/travian/misc/sticky.gif';
			imgcmap.border=0;
			imgcmap.title='الخريطة';
		
		  var attklink = document.createElement('a');
		  attklink.href='a2b.php'+'?z='+linkparts[1];
		  attklink.appendChild( imgattack );
		    
			var bizlink = document.createElement('a');
		    bizlink.href='build.php'+'?z='+linkparts[1]+'&gid=17';
		    bizlink.appendChild( imgsend );

			var maplink = document.createElement('a');
		    maplink.href='karte.php'+'?z='+linkparts[1];
		    maplink.appendChild( imgcmap );

		    maplink.appendChild(document.createTextNode('  '));
		    links[j].parentNode.insertBefore( maplink ,links[j]);
		    links[j].parentNode.insertBefore( attklink ,links[j]);
		    links[j].parentNode.insertBefore( bizlink ,links[j]);
									
		} else if(currentLink.match('spieler.') == 'spieler.' && linkparts[0].match('uid')=='uid' ){
				var imgprofile = new Image(); 
				imgprofile.src = 'http://forum.travian.us/images/travian/misc/paperclip.gif';
				imgprofile.border=0;
				imgprofile.title='القرية';
			
				var imgsend = new Image(); 
				imgsend.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
				imgsend.border=0;
				imgsend.title='ارسال رسالة';

			  var profilelink = document.createElement('a');
			    profilelink.href='spieler.php'+'?uid='+linkparts[1];
			    profilelink.appendChild( imgprofile );
			    
				var msglink = document.createElement('a');
			    msglink.href='nachrichten.php?t=1&'+'id='+linkparts[1];
			    msglink.appendChild( imgsend );

			    links[j].parentNode.insertBefore( profilelink ,links[j]);
			    links[j].parentNode.insertBefore( msglink ,links[j]);	
		}
			
	}

}

function resourceBuildBar(vals, cid){//create a resource needed menu given an array of values
	var div1 = document.createElement('div');
	var inTable = document.createElement('table');
	var row = document.createElement('tr');
	var cell = document.createElement('td');

	inTable.className = 'tbg';
	inTable.style.width = '500px';
	inTable.setAttribute('cellspacing', 1);
	inTable.setAttribute('cellpadding', 1);
	cell.setAttribute('colspan',4);

	cell.appendChild(document.createTextNode(langfile[lang][0]));
	cell.className = 'rbg';
	row.appendChild( cell );
	inTable.appendChild( row );
	
	for(var i=0; i<4; i++){
		row = document.createElement('tr');
		row.style.color=vals[i][3];
		cell = document.createElement('td');
		var simg = document.createElement('img');
		simg.src='img/un/r/'+(i+1)+'.gif';
		simg.alt=fields[lang][i];
		simg.title=fields[lang][i];
		cell.appendChild(simg);
		row.appendChild(cell);
		cell = document.createElement('td');
		var con= document.createElement('span');
		con.appendChild(  document.createTextNode( vals[i][0] )  );
		cell.appendChild( con );
		row.appendChild(cell);
		
		con= document.createElement('span');
		cell = document.createElement('td');
		con.appendChild(  document.createTextNode( vals[i][1] )  );
		cell.appendChild( con );
		row.appendChild(cell);
		
		cell = document.createElement('td');
		if(vals[i][4]){
			con= document.createElement('span');
			con.appendChild(document.createTextNode(vals[i][2]));
			cell.appendChild(con);
			cell.appendChild(document.createTextNode(' |'+langfile[lang][10]+vals[i][4]));
		}
		else {
			cell.appendChild( document.createTextNode( vals[i][2] ) );
		}
		
		row.appendChild(cell);
		inTable.appendChild(row);
	}

	return inTable;
}



function resourcePerBuild(){ // search the page for resource needed to build, and calculates the surplus, deficit or other information

	var need = document.evaluate("//table[@class='f10']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var end = need.snapshotLength;
	if(end==0) return;

	var resourceBlock=new Array();

	for(var i=0; i<end; i++){
		var current=need.snapshotItem(i);
		var tdcells=current.getElementsByTagName('td');
		var cout=0;
		for(var k=0; k<tdcells.length; k++){
			if(tdcells[k].getAttribute('class')=='s7'){cout++;}
		}	
		if(cout==0){
			var c=current.textContent;
			if( c.indexOf(' | ')!=-1 && c.charAt(0)!='\n' ) {
				 resourceBlock.push( current );}
		}
	}

	end=resourceBlock.length;
	if(end==0) return;

	for(var i=0; i<end; i++){
	
		if(document.getElementById('cost'+i)) {
			i++; 
			continue;
		}
	
		var current=resourceBlock[i].textContent.split(' | ');

		var stuff=[];
		var maxtime=0;
		for(var j=0; j<4; j++){
			var cneed = parseInt( current[j] );
			var cproduction = parseInt( resource[j][0] );
			var cstore = parseInt( resource[j][1] );
			var cdiff = cstore-cneed;
			var ctime;
			var font='green'
						
			if(cproduction<0){
			
				if(cdiff>0){
					temp=parseInt(-cdiff/cproduction*3600);
					if(temp>maxtime) maxtime=temp;
					ctime=langfile[lang][17]+formatTimeString(temp);
				}
				else if(cdiff<0){
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19]; 
					font='red'
				}
				else {  
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19];  
					font='red'					
				}
				
			} else if(cproduction>0){
				if(cdiff>0){
					ctime=langfile[lang][11]+(cdiff/cneed*100).toFixed(2)+'%';
				}
				else if(cdiff<0){
					temp=parseInt(-cdiff/cproduction*3600);
					if(temp>maxtime) maxtime=temp;
					ctime=langfile[lang][12]+formatTimeString(temp); 
					font='red'
				}
				else {  
					ctime=langfile[lang][20];
				}
				
			} else {
			
				if(cdiff>0){  
					ctime=langfile[lang][20];
				}
				else if(cdiff<0){ 
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19]; 
					font='red'
				}
				else {  
					ctime=langfile[lang][20];        
				}
				
			}
			
			if(cdiff<0){   
				stuff[j]=[langfile[lang][13],(-cdiff),ctime,font];
			}
			else if(cdiff>0){ 
				stuff[j]=[langfile[lang][14],cdiff,ctime,font];  
			}
			else {      
				stuff[j]=[langfile[lang][16],0,ctime,font];   
			}
			
					 
		}
		
		var holdtable;
		var w=false;
		var g=false;
		var blink=false;
		var over=false;
		
		var wblink=false;
		var gblink=false;
		
		var wover=false;
		var gover=false;
		
			if(maxtime>0){
			
				for(var k=0;k<4; k++){
				
					var left=Math.ceil((maxtime/3600)*resource[k][0])+resource[k][1];  
					var cap=parseInt(  resource[k][2] )	; 
					
					if(left>cap){
						if(k!=3){
							wover=true;
							w=true;
						} else{
							gover=true;
							g=true;
						}
						
						over=true;
						stuff[k].push( left +'*');
					} else {
						stuff[k].push( left );
					}
					
					if(current[k]>cap)	{
						
						if(k!=3){
							w=true;
							wblink=true;
							stuff[k].push( langfile[lang][21] );
						} else{
							g=true;
							gblink=true;
							stuff[k].push( langfile[lang][22] );
						}
						
						blink=true;
					}
						
						
				}
				
				holdtable=resourceBuildBar(stuff, 'cost'+i );
				
				var row = document.createElement('tr');
				var cell = document.createElement('td');
				cell.setAttribute('colspan',4);
				var timer=estTime( formatTime(maxtime+pagetime[0]*3600+pagetime[1]*60+pagetime[2],0,0,0,0) );
				
				cell.appendChild( document.createTextNode(  timer+' |'+langfile[lang][15]+formatTimeString(maxtime) ) ); 
				row.appendChild( cell );
				holdtable.appendChild( row );
				
				if(w || g){
					var msg='';
					row = document.createElement('tr');
					cell = document.createElement('td');
					
					if( w && g){
						msg=langfile[lang][21];
						if(wover) msg+='*';
						msg+=' and '+langfile[lang][22];
						if(gover) msg+='*';
					} else if(w){
						msg=langfile[lang][21];
						if(wover) msg+='*';
					} else {
						msg=langfile[lang][22];
						if(wover) msg+='*';
					}					
					
					if(blink){
						cell.setAttribute('style','text-decoration:blink;');
						cell.style.color='red'; 
					} else {
						cell.style.color='green'; 
					}
					
					cell.setAttribute('colspan',4);
					cell.appendChild( document.createTextNode(  msg ) ); 
					row.appendChild( cell );
					holdtable.appendChild( row );
				}
				

			} else {
				holdtable=resourceBuildBar(stuff);
			}
			
			holdtable.id='cost'+i;	
	
			resourceBlock[i].appendChild(holdtable);
	}

}

function pop(){
	var fulltable=document.createElement( 'table' );
	
	fulltable.id='NavPop';
	fulltable.style.height='auto';
	fulltable.style.backgroundColor='#FFFFFF';
		
	var row=document.createElement( 'tr' );
	var cell=document.createElement( 'td' );

	fulltable.setAttribute('style', 'z-index:100;');
	fulltable.setAttribute('cellspacing', 1);
	fulltable.setAttribute('cellpadding', 1);
	fulltable.className = 'tbg';
	cell.className = 'rbg';
	cell.appendChild(document.createTextNode('++ اعدادات'));
	cell.setAttribute('colspan',2);
	
	row.appendChild(  cell );
	fulltable.appendChild(  row );
	row.style.cursor='move';
	
	makeDraggable(row);	
		
	fulltable.appendChild(makebutton('Links++', links) );
	fulltable.appendChild(makebutton('Tools++', res) );
	fulltable.appendChild(makebutton('Resource++', res) );
	fulltable.appendChild(makebutton('Navigator++', nav) );

	row=document.createElement('tr');
	cell=document.createElement('td');
	cell.appendChild(makeEventlink('اخفاء الاعدادات', '#', toggle));
	cell.setAttribute('colspan',2);
	row.appendChild( cell );
	fulltable.appendChild( row );

	var listCoords = getPos(fulltable.id, '300px_157px').split('_');
	fulltable.style.top = listCoords[0];
	fulltable.style.left = listCoords[1];
	fulltable.style.position = 'absolute';
	fulltable.style.zIndex =100;
	fulltable.style.width='502px';
		
	fulltable.style.visibility='hidden';
	document.body.appendChild(fulltable);	
}

