// ==UserScript==
// @name           Gestione Risorse (ITA) تعريب Dream1
// @namespace      http://userscripts.org/users/59418
// @author         http://www.travianutility.com
// @description    Mostra le risorse necessarie, quelle in eccesso e i tempi di riempimento dei magazzini.
// @version        1.0.2
// @include		http://*.travian.*php*
// @include		http://*.travian3.*php*
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

var eventSource= (navigator.appName.indexOf== 'Opera') ? document : window; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false); //to be run on load of the page

var loc=window.location.href; // the current page href
var lang;

var order=0;// what is the order of the resources lumber to crop or crop to lumber
var fields=[]; //setup the space for the resource names
var langfile=[]//multi lang support, the space for the different translations
var resource; //setup the space for the resource data
var overflow;//setup the space for the overflow data
var autotime; // the timeout control, to update the countdown of overflow
var pagetime; //the time on the page server
var military=true; // is the pagetime 24 or 12 based clock

function onLoad(){ // runs the differnt functions and procedures, 
	
	lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ );
	if(!lang) {
	lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/ ).pop(); } 
	else {
	lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop();
	}
	
	if(!lang) return;
	
	fields[lang]=gatherFields(); // gets the names of the resources
	if(!fields[lang]) return; //if you can't find the names of the resources you don't need to run this script, return to stop the script
		
	switch(lang){//load only the lang you need into memory
		case '.it':
		langfile[lang]=['Necessarie per ampliare:','Pieno tra', 'Esaurito','Misurazione risorse','Barra delle risorse', 
		' precise' ,'Risorse disponibili oggi alle ',"Risorse disponibili oggi alle ", "Risorse disponibili in ", 
		" giorni al " , " Dopo l'attesa: " , "Immagazzinate: ","Aspetta: ","Ti mancano" ,"Eccedenza di"," Tempo massimo: ","Bilanciate",
		"Eccedenza esaurita in: ","Ampliamento "," produzione risorse.","Bilanciamento neutrale.", "Aumentare magazzino" , "Aumentare granaio"];		
		break;   
		case '.uk':
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		' Clock' ,'Enough resources today at ',"Enough resources tomorrow at ", "Enough resources in ", 
		" days at " , " After max wait: " , "Storage: ","Wait time: ","Deficit" ,"Surplus"," Max wait: ","Balanced",
		"Surplus depleted in: ","Upgrade "," resource production.","Neutral balance.", "Extend Warehouse" , "Extend Granary"];		
		break;
		case '.com':
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		" o'clock",'Enough resources today at ',"Enough resources tomorrow at ", "Enough resources in ", 
		" days at ", " After max wait: " , "Storage: ","Wait time: ","Deficit","Surplus", " Max wait: ","Balanced",   
		"Surplus depleted in: ","Upgrade "," resource production.","Neutral balance." , "Extend Warehouse" , "Extend Granary"   ];						
		break;
case '.ae':
langfile[lang]=['الموارد اللازمه لرفه المستوى:','يمتلاء بعد', 'المستنفذ','وقت امتلاء المخازن','نسبة امتلاء المخازن', " ساعة",'الموارد تكفي غداً في ',"الموارد تكفي اليوم في ", "الموارد تكفي في ", " في يوم ", " انتظر بعد: " , "التخزين: ","وقت الانتظار: ","النقص","الفائض", " وقت الانتظار: ","متوازن","يستنفذ الفائض في: ","تحديث "," انتاج الموارد.","محايد التوازن" , "توسيع المخزن" , "توسيع مخزن الحبوب"   ];
break;
		case '.hu':
		langfile[lang]=[ 'Fejlesztéshez kell:', 'betelik', 'betelt', 'Nyersanyagok' , 'Nyersanyagok',
		' órakor' ,'Elég nyersanyag ma ',"Elég nyersanyag holnap ", "Elég nyersanyag ",
		" nap múlva " , " Max várakozás után: " , "Készleten: ","Várj: ","Hiány" ,"Többlet"," Max várakozás: ","Kiegyensúlyozott",
		"A többlet elfogy: ","Fejlesztés "," nyersanyag termelés.","Semleges egyensúly.", "Fejlesztd hozzá a raktárat!" , "Fejlesztd hozzá a magtárat!"    ];
		break;
		case '.de':
		langfile[lang]=['Für Ausbau benoetigt:','Überschuß', 'Erschöpft','Resourcenmeter','Resourcenbalken', 
		' Uhr','Genug Resourcen heute um ',"Genug Resourcen morgen um  ", "Genug Resourcen in ", 
		" Tagen um ", " Nach maximaler Wartezeit: " , "Vorrat: ","Wartezeit: ","Defizit","Überschuß", " Maximale Wartezeit: ","Ausgeglichen",   
		"Überschuß aufgebraucht in: ","Ausbau "," Resourcenproduktion.","Neutrale Bilanz." , "Rohstofflager erweitern" , "Kornspeicher erweitern" ];
		break
		case '.sk':
		langfile[lang]=['Stavba vyžaduje:','pretečie', 'vyčerpané','Merač surovín','Ukazatele zásob', 
		' hod','Dostatok surovín dnes o ',"Dostatok surovín zajtra o ", "Dostatok surovín za ", 
		" dní o ", " Po max. čakaní: " , "Sklad: ","Čakacia doba: ","Chýba nám","Prebytok", " Max. doba čakania: ","Vyvážené",
		"Prebytok vyčerpaný za: ","Vylepši "," produkciu surovín.","Vyváženosť." , "Rozšír sklad" , "Rozšír sýpku"];		
		break;
		case '.cz':
		langfile[lang]=['Stavba vyžaduje:','přeteče', 'vyčerpáno','Merič surovin','Ukazatele zásob',
		' hod','Dostatek surovin dnes v ',"Dostatek surovin zítra v ", "Dostatek surovin za ",
		" dny v ", " Po max. vyčkávaní: " , "Sklad: ","Čekací doba: ","Chybí nám","Přebytek", " Max. vyčkávaní: ","Vyvážené",
		"Přebytek vyčerpaný za: ","Vylepši "," produkci surovín.","Vyváženost."
		, "Vylepši sklad" , "Vylepši sýpku"];
		break;
		case '.bg':
       langfile[lang]=['Нужни за upgrade:','запълване', 'изчерпване','Resource Meters','Графики на ресурсите',
       ' часа','Достатъчно ресурси днес в ',"Достатъчно ресурси утре в", "Достатъчно ресурси в ", " дни в ", " След максимално изакване: " , 
	   "Склад: ","Време заизчакване: ","Недостиг","Излишък", " Максимално изчакване: ","Балансирано", "Изчерпване на излишъка след: ","Upgrade ",
	   " Добив наресурси.","Neutral balance." , "Разширете склада" , "Разширете хамбара"];
       break;
		default:
		langfile[lang]=['Needed for upgrading:','Overflow', 'Depleted','Resource Meters','Resource Bars', 
		' Clock' ,'Enough resources today at ',"Enough resources tomorrow at ", "Enough resources in ", 
		" days at " , " After max wait: " , "Storage: ","Wait time: ","Deficit" ,"Surplus"," Max wait: ","Balanced",
		"Surplus depleted in: ","Upgrade "," resource production.","Neutral balance.", "Extend Warehouse" , "Extend Granary"];					
		break;
	}
	
	//if somehow the lang file is not in the script, return because it can't display the information correctly       
	if(!langfile[lang]) return;

	resource=getResourceInfo(); // gathers the current store, capacity and production of each resource
	if(!resource) return; // if no resources exist on the page, return to stop the script
	overflow=calOverflow(); // computes the overflow information using resource information
	if(!overflow) return; //if overflow can't be computed, return to stop the script

	if(loc.indexOf('build')!=-1){
		getTime();
		resourcePerBuild();
	}
	
	var tme=menu();//make the menu
	if(!tme) return; // if we can't make the menu return
	addElement( tme ); // add the menu to the page
	if(!returnObjById('blocktimer')) return; //if we can't find the added menu return
	autotime = window.setTimeout(countdown, 1000); // start the timeout
		
}


function rowOpera(i,leftval){
var tol= (leftval<50) ? 150 : 255;
var sec=155-leftval;
	
var testmain = document.createElement( 'div' );
var value = document.createElement( 'div' );
var bar = document.createElement( 'table' );
var row= document.createElement( 'tr' );
var left= document.createElement( 'td' );
var right= document.createElement( 'td' );
var simg = document.createElement( 'img' );
	
	testmain.style.width='490px';
	testmain.style.height='16px';

	simg.src="img/un/r/"+(i+1)+".gif";
	simg.className='res';
	simg.style.cssFloat="left";
	simg.title=fields[lang][i];
	simg.alt=fields[lang][i];

	bar.style.cssFloat="left";
	bar.style.width='432px';
	bar.style.height='16px';
	bar.style.backgroundColor="white"
	bar.setAttribute("cellpadding","1");
	bar.setAttribute("cellspacing","0");

	left.id=fields[lang][i]+"left";
	right.id=fields[lang][i]+"right";
	value.id=fields[lang][i]+"value";
	
	
	left.style.width=leftval+'%';
	left.style.backgroundColor=rgb2HEX(sec, sec, parseInt(tol*(leftval/100)) );
	right.style.width=(100-leftval)+'%';
		
	if(leftval>=90){
		value.setAttribute("style","text-decoration:blink;");
		value.style.color='red';
	} else {
		value.setAttribute("style","text-decoration:none;");
	}
	
	value.style.width='40px';
	value.appendChild( document.createTextNode(  leftval+"%"  )  );
	value.style.cssFloat="left"
	value.title=leftval;

row.appendChild(left);
row.appendChild(right);
bar.appendChild(row);

testmain.appendChild( simg );
testmain.appendChild( value );
testmain.appendChild( bar );

testmain.id='resbar'+i;

return testmain
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
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
     
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
       arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

function addElement(theElement) { // adds an element to the page either by the center object lmidlc or appends to html
var htmldoc=returnObjById("lmid2");
	
	if(!htmldoc) {
		htmldoc=document.getElementsByTagName('body')[0];
		if(!htmldoc) return;
                if(!htmldoc) {htmldoc=returnObjById("content");}
		theElement.style.marginLeft="130px";  
		theElement.style.marginBottom="10px";
		theElement.style.width="550px";

		if(loc.indexOf('dorf2')!=-1){
			theElement.style.top="150px";}
		else {
			theElement.style.top="50px";}
	} else {
		theElement.style.width = "500px";
		if(loc.indexOf('karte.php?d=')!=-1){       
			theElement.style.top="428px";       
		}
	}
	
	htmldoc.appendChild(theElement);
}

function formatTime(maxtime, hours, minutes, seconds, off){ // given maxtime in secs and and offset values, returns a array of [hrs,min,sec]
     return [Math.floor(maxtime/3600)+hours+off,(Math.floor(maxtime/60)%60)+minutes,(maxtime % 60)+seconds];
}

function gatherFields(){//gathers the name of each resource
	var orgbar=returnObjById('lres0');
	if(!orgbar) {orgbar=getElementsByClassName(document, 'div', 'div4')[0];}
	if(!orgbar) {orgbar=returnObjById('lres');}
        if(!orgbar) {orgbar=returnObjById('res');}
	if(!orgbar) return;
	var resbar=orgbar.getElementsByTagName('img');
	var ret=fields[lang]=[resbar[0].title,resbar[1].title,resbar[2].title,resbar[3].title]
	var idbar=orgbar.getElementsByTagName('td');
	if(idbar[1].id.indexOf('1')==-1) order=1;
return ret;
}

function rgb2HEX(red, green, blue){ // given red green blue values return their hexcode
    var decColor = red + (256 * green) + (65536 * blue);//offset each value and create a new int
	
	decColor=decColor.toString(16);//convert to a base16 string
	
	while( decColor.length < 6){//append 0 till it is a 6 length string
		decColor="0"+decColor;
	}
	
    return "#"+decColor;
}

function formatTimeString(maxtime){ // maxtime in seconds returns it in hh:mm:ss h format
     var helper=formatTime(maxtime, 0, 0, 0, 0);
     if(helper[1] < 10){helper[1] = "0"+helper[1];}
     if(helper[2] < 10){helper[2] = "0"+helper[2];}
     return helper[0]+':'+helper[1]+':'+helper[2]+' h';
}

function getResourceInfo(){ //using the resource values on the page, return the production, store, and capacity values as an array
	var resource=new Array();
	for(var i=1;i<=4;i++) {
		var rtd  = returnObjById("l"+i);
		if(!rtd) return;
		resource.push( [parseInt(rtd.title),parseInt(rtd.textContent.match(/\-?(\d+)\//)),parseInt(rtd.textContent.replace(/(\d+)\//,""))] );
	}
	
	if(!order) { //if the order is 0 return the array as is, if not reverse the array
		return resource;
	} else {
		return resource.reverse();
	}
	
}

function calOverflow(){ //using the resource values, return the overflow information as an array
	var sec=[];

	for(var i=0;i<4;i++) {
		if(resource[i][0]>0){
			sec[i] = [ Math.ceil(3600*(resource[i][2]-resource[i][1])/resource[i][0]),langfile[lang][1]];
		} else if(resource[i][0]<0){
			sec[i] = [ Math.ceil(3600*(-resource[i][1])/resource[i][0]), langfile[lang][2] ];
		} else {
			sec[i]=[ 0, langfile[lang][16] ];
		}
	}


	return sec;
}

function menu(){ //create an resource menu
	var mymenu = document.createElement( 'table' );
	mymenu.id="blocktimer";
	mymenu.setAttribute('style', 'z-index:5;');
	mymenu.setAttribute('cellspacing', 1);
	mymenu.setAttribute('cellpadding', 1);
	mymenu.className = "tbg";
	mymenu.style.marginTop="36px";
	mymenu.style.clear = "both";
	mymenu.style.position="relative"; 

	var row =document.createElement("tr");
	var cell = document.createElement("td");
	cell.setAttribute("colspan",2);
	cell.setAttribute('align', 'center');
	cell.appendChild(      document.createTextNode(  langfile[lang][3]  )          );
	cell.className = "rbg";
	row.appendChild( cell );

	mymenu.appendChild(row);

	for(var i=0; i<4; i++){
		row =document.createElement("tr");
				
		for(var j=0; j<2; j++){
			var c=i+j;
			cell = document.createElement("td");
			var inSpan = document.createElement("span");
			
			var newText = document.createTextNode(    fields[lang][c]+" "+overflow[c][1]+": "   );
			cell.appendChild(newText);
			cell.setAttribute('align', 'center');
			inSpan.id=fields[lang][c]+"timer";
			inSpan.style.color= (overflow[c][0]<300) ? "red" : "green";
			newText = document.createTextNode(formatTimeString(overflow[c][0]));
			inSpan.appendChild(newText);
			cell.appendChild(inSpan);
			row.appendChild( cell);
		}	
		
		i++;
		
		mymenu.appendChild( row);
	}
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.setAttribute("colspan",2);
	cell.setAttribute('align', 'center');
	cell.appendChild(      document.createTextNode(  langfile[lang][4]   )          );
	cell.className = "rbg";
	row.appendChild( cell );
	mymenu.appendChild(row);

	for(var i=0; i<4; i++){

	var leftval=parseInt(resource[i][1]/resource[i][2] *100);
	var inRow=rowOpera(i,leftval);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.setAttribute("colspan",2);
	cell.appendChild(      inRow         );
	row.appendChild(      cell         );
	
	mymenu.appendChild( row );
	}
		
return mymenu;
}


function estTime(time){//using the pagetime and the wait time for the resource, returns a time field of when the resource will be ready
     var days=0;
     var head="";
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
		time[0]="0"+time[0];
     }
     if(time[1]<10){
		time[1]="0"+time[1];
     }
     if(time[2]<10){
		time[2]="0"+time[2];
     }

     if(days==0){
		head=langfile[lang][6];
     } else if(days==1){
		head=langfile[lang][7];
     } else {
		head=langfile[lang][8] +days + langfile[lang][9];
     }
     
return head+time[0]+":"+time[1]+":"+time[2]+tail;
}

function getTime(){ // gets the time from the page or use java time
	var servertime=returnObjById("tp1").textContent;
		
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

function timeField(time) { // convert a hh:mm:ss time stamp to seconds
   var limit = time.split(":");
   return (limit.length == 3) ? ([parseInt(limit[0]) , parseInt(limit[1]) , parseInt(limit[2])]) : -1;
}

function countdown(){//updates all countdown values and displays

	var go=false;
	resource=getResourceInfo();
		
	for(var i=0; i<4; i++){
	
		if(overflow[i][0]>0){
			go=true;
			overflow[i][0]--;
			var leftval=parseInt(resource[i][1]/resource[i][2] *100);
			var color=(overflow[i][0]<300) ? "red" : "green";
			var newSpan = document.createElement("span");
			
			newSpan.id=fields[lang][i]+"timer";
			newSpan.appendChild(    document.createTextNode(formatTimeString(overflow[i][0])));
			
			if(newSpan.style.color.indexOf(color)==-1){
				newSpan.style.color=color;
			}
			
			var old=returnObjById(fields[lang][i]+"timer") ;
			old.parentNode.replaceChild(newSpan,old );
			
			old=returnObjById(fields[lang][i]+"value");

			if(parseInt(old.title)!=leftval){
				overflow=calOverflow();
				old=returnObjById("resbar"+i);
				old.parentNode.replaceChild(rowOpera(i,leftval),old );
			}

			
		} else {
				var old=returnObjById(fields[lang][i]+"timer") ;
	
				if(old.textContent.indexOf("0:00:00 h")==-1){    
					old.textContent="0:00:00 h";
					old.style.color='red';
					old=returnObjById("resbar"+i);
					old.parentNode.replaceChild(rowOpera(i,100),old );
				}
		}
	}
	
	if(go){
		autotime = window.setTimeout(countdown, 1000);} 
	else {
		clearTimeout(autotime); //kill the timeout
		return;
	}
}

function resourceBuildBar(vals){//create a resource needed menu given an array of values
var div1 = document.createElement("div");
var inTable = document.createElement("table");
var row = document.createElement("tr");
var cell = document.createElement("td");

inTable.className = "tbg";
inTable.style.width = "500px";
inTable.setAttribute('cellspacing', 1);
inTable.setAttribute('cellpadding', 1);
cell.setAttribute("colspan",4);


cell.appendChild(      document.createTextNode( langfile[lang][0] )          );
cell.className = "rbg";
row.appendChild( cell );
inTable.appendChild( row );
	
	for(var i=0; i<4; i++){
		row = document.createElement("tr");
		row.style.color=vals[i][3];
		cell = document.createElement("td");
		var simg = document.createElement("img");
		simg.src="img/un/r/"+(i+1)+".gif";
		simg.alt=fields[lang][i];
		simg.title=fields[lang][i];
		cell.appendChild(simg);
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.appendChild( document.createTextNode( vals[i][0] ) );
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.appendChild( document.createTextNode( vals[i][1] ) );
		row.appendChild(cell);
		cell = document.createElement("td");
		if(vals[i][4]){
			cell.appendChild( document.createTextNode( vals[i][2]  +" |"+langfile[lang][10]+  vals[i][4] )   );}
		else {
			cell.appendChild( document.createTextNode( vals[i][2] ) );
		}
		row.appendChild(cell);
		inTable.appendChild(row);
	}

return inTable;
}



function resourcePerBuild(){ // search the page for resource needed to build, and calculates the surplus, deficit or other information

var need = document.evaluate('//table[@class="f10"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
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
		if( c.indexOf(" | ")!=-1 && c.charAt(0)!="\n" ) {
			 resourceBlock.push( current );}
	}
	
}

end=resourceBlock.length;
if(end==0) return;

	for(var i=0; i<end; i++){
	var current=resourceBlock[i].textContent.split(" | ");

		var stuff=[];
		var maxtime=0;
		for(var j=0; j<4; j++){
			var cneed = parseInt( current[j] );
			var cproduction = parseInt( resource[j][0] );
			var cstore = parseInt( resource[j][1] );
			var cdiff = cstore-cneed;
			var ctime;
			var font="green"
						
			if(cproduction<0){
				if(cdiff>0){
					temp=parseInt(-cdiff/cproduction*3600);
					if(temp>maxtime) maxtime=temp;
					ctime=langfile[lang][17]+formatTimeString(temp);
				}
				else if(cdiff<0){
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19]; 
					font="red"
				}
				else {      
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19];    
					font="red"					
				}
				
			} else if(cproduction>0){
				if(cdiff>0){
					ctime=langfile[lang][11]+(cdiff/cneed*100).toFixed(2)+"%";
				}
				else if(cdiff<0){
					temp=parseInt(-cdiff/cproduction*3600);
					if(temp>maxtime) maxtime=temp;
					ctime=langfile[lang][12]+formatTimeString(temp); 
					font="red"
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
					font="red"
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
				
				holdtable=resourceBuildBar(stuff);
				
				var row = document.createElement("tr");
				var cell = document.createElement("td");
				cell.setAttribute("colspan",4);
				var timer=estTime( formatTime(maxtime+pagetime[0]*3600+pagetime[1]*60+pagetime[2],0,0,0,0) );
				
				cell.appendChild( document.createTextNode(  timer+" |"+langfile[lang][15]+formatTimeString(maxtime) )   ); 
				row.appendChild( cell );
				holdtable.appendChild( row );
				
				if(w || g){
					var msg="";
					row = document.createElement("tr");
					cell = document.createElement("td");
					
					if( w && g){
						msg=langfile[lang][21];
						if(wover) msg+='*';
						msg+=" and "+langfile[lang][22];
						if(gover) msg+='*';
					} else if(w){
						msg=langfile[lang][21];
						if(wover) msg+='*';
					} else {
						msg=langfile[lang][22];
						if(wover) msg+='*';
					}					
					
					if(blink){
						cell.setAttribute("style","text-decoration:blink;");
						cell.style.color="red"; 
					} else {
						cell.style.color="green"; 
					}
					
					cell.setAttribute("colspan",4);
					cell.appendChild( document.createTextNode(  msg )   ); 
					row.appendChild( cell );
					holdtable.appendChild( row );
				}
				

			} else {
				holdtable=resourceBuildBar(stuff);
			}

			resourceBlock[i].appendChild( holdtable );
	}
}