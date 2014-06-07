// ==UserScript==
// @author		usr8472@gmail.com 
// @namespace	http://userscripts.org/
// @name		Travian: Market++ v1
// @description	Travian market filters. Currently supported, .uk, .com, .pt, .nl, .se, partial support for other servers
// @include       	 http://*.travian.*/*php*&t=1*
// @exclude 	http://forum.travian.*
// @exclude 	http://*.travian.*/index.php*
// @exclude 	http://*.travian.*/anleitung.php*
// @exclude 	http://*.travian.*/login.php*
// @exclude 	http://*.travian.*/logout.php*
// @exclude 	http://*.travian.*/chat.php*
// @exclude 	http://*.travian.*/impressum.php*
// @exclude 	http://*.travian.*/karte2.php*
// @exclude 	http://www.travian.*
// ==/UserScript==

var eventSource= (navigator.appName == 'Opera') ? document : window; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false);  //loads the script on the page load
var loc=window.location.href; // the current page href
var lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop(); // thanks to F. S., who emailed me with a update for the regex
var marketc;// the current market table
var orgmarket;//the first loaded market table
var general=false; // did we have to generate a language file
var fields=[]; //space for the field anme information
var langfile=[]//space for multi lang support, need more translations
var tab;//location of the menu to be inserted after
var res;//the menu to be inserted
var change=false;//do we need to rest the menu
var zerobar;
var check=[false, false, false, false, false, false, false, false];
var c=0;
var top=false;
var bot=false;
var ratio=false;

function onLoad(){ // calls to the functions and procedure

	if( loc.indexOf('&t=1')!=-1 && loc.indexOf('build')!=-1 ) {
	
	tab=getElementsByClassName(document, "p", "txt_menue")[0];//place to but the bar
	if(!tab)tab=getElementsByClassName(document, "p", "f10")[1]; //second guess for the bar place
	if(!tab) return; //return if you can't place the bar
	var linkl=tab.getElementsByTagName('a');
	if(linkl[1].href.indexOf('&t=1')==-1) return;	 // test for troops vs market links
	
	fields[lang]=gatherFields();//gets the name of the resource fields
	if(!fields[lang]){//if we can't find the names use the image names
		fields[lang]=["1.gif", "2.gif", "3.gif", "4.gif"];
	}
		//if we are on the market page then find the loaded market table
		marketc=getElementsByClassName(document, "table", "tbg");
		if(marketc.length>1){
			var mc=[];
			var end=marketc.length;
			var i=0;
			while(marketc[i].rows[1].cells.length!=5 && i<end){i++}
			mc[0]=marketc[i];
			marketc=mc;
			orgmarket=marketc[0].cloneNode(true);
		}else {
			orgmarket=marketc[0].cloneNode(true);
		}
		
		if(!marketc) return;
		
		
		switch(lang){//only load the lang you need. Might look strange if you don't view as UTF-8
			case '.pt':
			langfile[lang]=['Propostas no mercado','Aceitar proposta','Recursos insuficentes','Pede','Oferece','Remove','Reset'];
			break;
			case '.uk':
			langfile[lang]=['Offers','Accept offer','Too few resources','Search','Offer','Remove','Reset'];
			break;
			case '.com':
			langfile[lang]=['Biddings','Accept offer','Too few resources','Searching','Offering','Remove','Reset'];
			break;
			case '.se':
			langfile[lang]=['Bud','Acceptera erbjudande','För få råvaror', 'Söker','Erbjuder','Ta bort','Reset'];
			break;
			case '.nl':
			langfile[lang]=['Aanbiedingen','Bod accepteren','Te weinig grondstoffen', 'Gezocht','Geboden','Verwijderen','Herstellen'];
			break;
			case '.ru':
			langfile[lang]=['Предложения','Принять предложение','Не хватает сырья','Поиск','Предложение','Удалить','Сброс'];
			break;
			default:
			langfile[lang]=gatherInfo();
			if(!langfile[lang]) return;
			general=true;
			break;
		}
		
		if(loc.indexOf('si')!=-1){  //special cases
			langfile[lang]=gatherInfo();//finds the information
			if(!langfile[lang]) return; //if we still can't find return and exit the script
			general=true; //sets the flage
		}
				
		var thebar=filterbar();
		zerobar=thebar.cloneNode(true);
		if(!thebar) return; //if no bar is created return
		tab.appendChild( thebar ); // add the bar
				
	} else {
		return;
	}
	
}

function gatherInfo(){//gets the words from the table
if(loc.indexOf('&t=1')==-1) return;
if(!marketc) return;
var current=marketc;
if(current[0].rows[1].cells.length==1) return;
return [current[0].rows[0].textContent,'href','!href',current[0].rows[1].cells[1].textContent,current[0].rows[1].cells[0].textContent,'-','Reset'];
}

function gatherFields(){//get the resource names from the page
var orgbar=returnObjById('lres0');
	if(!orgbar) {orgbar=getElementsByClassName(document, 'div', 'div4')[0];}
	if(!orgbar) {orgbar=returnObjById('lres');}
	if(!orgbar) return;
	var resbar=orgbar.getElementsByTagName('img');
return [resbar[0].title,resbar[1].title,resbar[2].title,resbar[3].title]
}

function returnObjById( id ){ // I use this because I might want to make it cross browser later
    if (document.getElementById)
        return document.getElementById(id);
    else if (document.all)
        return document.all[id];
    else if (document.layers)
        return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){  // searches the oElm for strTagName objects with strClassName class
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

function marketOffer(){//picks column 1 to search in
gomarket(0);
}

function marketSearch(){//picks column 2 to search in
gomarket(2);
}

function gomarket(select){//seacrhc the select column to search for a match of the res varable
if(loc.indexOf('&t=1')==-1) return;
if(!marketc) return;
var current=marketc;
var market=new Array();
var end=0;
	if(current.length==1 ) {

		if(current[0].rows[0].textContent.indexOf(langfile[lang][0])!=-1 || general){
	
			if(current[0].rows[1].cells.length!=5) {return;}
			if(current[0].rows[2].cells.length!=7) {return;}
			end=current[0].rows.length-1;
						
			for(var i=2; i<end; i++){
				var cc=current[0].rows[i].cells[parseInt(select)]
				if(cc){
					cc=cc.innerHTML;
					if( cc.indexOf(res)!=-1 ) {market.push(current[0].rows[i].cloneNode(true));}
				}
				
			}

			mod(current,end,market);
		
		} 	else {change=false;}	

	} 	else {change=false;}	
}

function mod(current,end,market){//changes the table
		var mymenu = current[0].cloneNode(false) ;
		mymenu.className = "tbg";
		mymenu.style.width = "500px";
		mymenu.setAttribute('cellspacing', 1);
		mymenu.setAttribute('cellpadding', 2);
		
		mymenu.appendChild(current[0].rows[0].cloneNode(true) );
		mymenu.appendChild(current[0].rows[1].cloneNode(true) );
		var tail=current[0].rows[end].cloneNode(true);
		
		end=market.length;
		for(var i=0; i<end; i++){
			mymenu.appendChild( market[i].cloneNode(true) );
		}
		
		mymenu.appendChild( tail );
		
		current[0].innerHTML=mymenu.innerHTML;
		change=true;
}

function x(f){//ratio of offer:search search
if(loc.indexOf('&t=1')==-1) return;
if(!marketc) return;

var current=marketc;
var market=new Array();
var end=0;

	if(current.length==1) {
		if(current[0].rows[0].textContent.indexOf(langfile[lang][0])!=-1 || general){
			
			if(current[0].rows[1].cells.length!=5) {return;}
			if(current[0].rows[2].cells.length!=7) {return;}
			
			end=current[0].rows.length-1;
			var first;
			var second;
			for(var i=2; i<end; i++){
				if(current[0].rows[i].cells[3] && current[0].rows[i].cells[1]){
					switch(f){
						case 1:
							first=parseInt( current[0].rows[i].cells[1].innerHTML);
							second=parseInt( current[0].rows[i].cells[3].innerHTML);
							if( first>second ) {market.push(current[0].rows[i].cloneNode(true));}
						break;    
						case 3:
							first=parseInt( current[0].rows[i].cells[3].innerHTML);
							second=parseInt( current[0].rows[i].cells[1].innerHTML);
							if( first>second ) {market.push(current[0].rows[i].cloneNode(true));}
						break;
						case 0:
							first=parseInt( current[0].rows[i].cells[1].innerHTML);
							second=parseInt( current[0].rows[i].cells[3].innerHTML);
							if( first==second ) {market.push(current[0].rows[i].cloneNode(true));}
						break;
						case 2:
							first=parseInt( current[0].rows[i].cells[1].innerHTML);
							second=parseInt( current[0].rows[i].cells[3].innerHTML);
							if( first>=second ) {market.push(current[0].rows[i].cloneNode(true));}
						break;
					}
				}
			}
			mod(current,end,market);
		}else {change=false;}
	}

}


function ironSearch(){//select the name of the resource from the fields language 
res=fields[lang][2];
marketSearch();
}

function cropSearch(){//select the name of the resource from the fields language 
res=fields[lang][3];
marketSearch();
}


function woodSearch(){//select the name of the resource from the fields language 
res=fields[lang][0];
marketSearch();
}

function claySearch(){//select the name of the resource from the fields language 
res=fields[lang][1];
marketSearch();
}

function ironOffer(){//select the name of the resource from the fields language 
res=fields[lang][2];
marketOffer();
}

function clayOffer(){//select the name of the resource from the fields language 
res=fields[lang][1];
marketOffer();
}

function cropOffer(){//select the name of the resource from the fields language 
res=fields[lang][3];
marketOffer();
}

function woodOffer(){//select the name of the resource from the fields language 
res=fields[lang][0];
marketOffer();
}

function reset(){//using the orginal market table reset the page
	if(change){
	marketc[0].innerHTML=orgmarket.innerHTML;
		
	tab.removeChild(tab.lastChild);
	tab.appendChild( filterbar() );
	check=[false, false, false, false, false, false, false, false];
	c=0;
	top=false;
	bot=false;
	change=false;
	ratio=false;
	} 
}

function one(){ // a one to one search
x(0);
}

function xone(){ // offer > search
x(1);
}

function onexone(){ // offer > search
x(2);
}

function onex(){ // offer < search
x(3);
}

function filterbar(){// create the menu

var fill = document.createElement('table');
var row1 = document.createElement('tr');
var row2 = document.createElement('tr');
var cell = document.createElement('td');

	cell.appendChild( document.createTextNode( langfile[lang][3] )   ); 
	row1.appendChild( cell );
	cell = document.createElement('td');
	cell.appendChild( document.createTextNode( langfile[lang][4] )   ); 
	row2.appendChild( cell );
		
			cell = document.createElement('td');
			var simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/1.gif";
				simg.style.cursor='pointer';
	
				simg.title=fields[lang][0];
				cell.appendChild(simg);
				cell.addEventListener('click',function (e) { 
				if(check[0] || check[1] || c>1 || top) return;  
					check[0]=true;
					top=true;
					c=c+1;
					e.target.style.backgroundColor='red'; 
					e.target.parentNode.style.backgroundColor='red'; 
					woodSearch();}, true);

				row1.appendChild(cell);
				cell=cell.cloneNode(true);
				
				cell.addEventListener('click',function (e) {
				if(check[0] || check[1] || c>1 || bot) return;  
					check[1]=true;
					c=c+1;
					bot=true;
					e.target.style.backgroundColor='red'; 
					e.target.parentNode.style.backgroundColor='red'; woodOffer();}, true);				

				row2.appendChild(cell);
				
				cell = document.createElement('td');
				simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/2.gif";
				simg.style.cursor='pointer';
	
				simg.title=fields[lang][1];
				cell.appendChild(simg);
				cell.addEventListener('click',function (e) {
				if(check[2] || check[3] || c>1 || top) return;  
					check[2]=true;
					top=true;
					c=c+1;
					e.target.style.backgroundColor='red'; 
					e.target.parentNode.style.backgroundColor='red'; claySearch();}, true);
				row1.appendChild(cell);
				cell=cell.cloneNode(true);
				cell.addEventListener('click',function (e) {
				
				if(check[2] || check[3] || c>1 || bot) return;  
					check[3]=true;
					bot=true;
					c=c+1;
					e.target.style.backgroundColor='red'; 
					e.target.parentNode.style.backgroundColor='red'; clayOffer();}, true);
				row2.appendChild(cell);
				cell = document.createElement('td');
				simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/3.gif";
				simg.style.cursor='pointer';
				simg.title=fields[lang][2];
				cell.appendChild(simg);
				cell.addEventListener('click',function (e) {
				
				if(check[4] || check[5] || c>1 || top) return;  
					check[4]=true;
					top=true;
					c=c+1;
					e.target.style.backgroundColor='red'; 
					e.target.parentNode.style.backgroundColor='red'; ironSearch();}, true);
				row1.appendChild(cell);
				cell=cell.cloneNode(true);
				cell.addEventListener('click',function (e) {
				if(check[4] || check[5]  || c>1 || bot) return;  
					check[5]=true;				
					bot=true;
					c=c+1;
					e.target.parentNode.style.backgroundColor='red'; ironOffer();}, true);
					row2.appendChild(cell);
				
				cell = document.createElement('td');
				simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/4.gif";
				simg.style.cursor='pointer';
				simg.title=fields[lang][3];
				cell.appendChild(simg);
				cell.addEventListener('click',function (e) {
				if(check[6] || check[7]  || c>1 || top) return;  
					check[6]=true;				
					top=true;
					c=c+1;
					e.target.style.backgroundColor='red'; 
					e.target.parentNode.style.backgroundColor='red'; cropSearch();}, true);
				row1.appendChild(cell);
				cell=cell.cloneNode(true);
				cell.addEventListener('click',function (e) {
				
				if(check[6] || check[7]  || c>1 || bot) return;  
					check[8]=true;				
					bot=true;
					c=c+1;
					e.target.style.backgroundColor='red'; 
					e.target.parentNode.style.backgroundColor='red'; cropOffer();}, true);
				row2.appendChild(cell);
				
	var con = document.createElement('a');	
		cell = document.createElement('td');
		con.appendChild( document.createTextNode( langfile[lang][4]+"="+langfile[lang][3] )   );
		con.href='#';
		con.addEventListener('click', function (e){  if(ratio)return; ratio=true;e.target.style.color='red'; one();}, true);
		cell.appendChild(con);
		row2.appendChild(cell);
		
		con = document.createElement('a');	
		cell = document.createElement('td');
		con.appendChild( document.createTextNode( langfile[lang][4]+">"+langfile[lang][3] )   );
		con.href='#';
		con.addEventListener('click', function (e){  if(ratio)return; ratio=true;e.target.style.color='red'; xone(); }, true);
		cell.appendChild(con);
		row1.appendChild(cell);
		
		con = document.createElement('a');	
		cell = document.createElement('td');
		con.appendChild( document.createTextNode( langfile[lang][6] )    );
		con.href='#';
		con.addEventListener('click', reset, true);
		cell.appendChild(con);
		row1.appendChild(cell);

		con = document.createElement('a');	
		cell = document.createElement('td');
		con.appendChild( document.createTextNode( langfile[lang][4]+"<"+langfile[lang][3] )   );
		con.href='#';
		con.addEventListener('click', function (e){  if(ratio)return; ratio=true;e.target.style.color='red'; onex(); } , true);
		cell.appendChild(con);
		row2.appendChild(cell);
		
		row1.className="cbg1";
		row2.className="cbg1";
		
	fill.appendChild(  row2 );			
	fill.appendChild(  row1 );

	fill.className="tbg";
	fill.setAttribute('cellspacing', 1);
	fill.setAttribute('cellpadding', 1);

return fill;
}
