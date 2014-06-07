// ==UserScript==
// @name	MIGUELO SRIPT
// @namespace  	Menu
// @description	Versión legalizada del script de Darkolem creada por jacky1305.(1.2)
// @include    	http://s12.ikariam.es/index.php*
// ==/UserScript==


var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:750px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';

if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}
function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function add_Alliance_Menu(){
var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var Tools_Link       = document.createElement('LI');
Tools_Link.setAttribute('id', 'Tools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(Tools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('Tools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>ALIANZA THE END</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://alianzatheendmundomy.foroactivo.com" align="left">&nbsp;FORO DE LA ALIANZA</a></li>'
+ '     <li><center><a href="http://hi.muriandre.com/cdv.php" align="left">&nbsp;CALCULADOR DE TIEMPOS DE VIAJE</a></li>'
+ '     <li><center><a href="http://ikariamlibrary.com/?content=IkaFight" align="left">&nbsp;SIMULADOR DE BATALLAS</a></li>'
+ '	<li><center><a href="http://www.ika-world.com/es/suche.php"_blank" onClick="window.open(this.href, this.target); return false;" title=" Buscador de jugadores, islas y ciudades ">Buscador de ciudades</a></li>'
+ '	<li><center><a href="http://hi.muriandre.com/cdb.php" target="_blank" onClick="window.open(this.href, this.target); return false;" title=" Compacta una batalla para publicarla en un foro ">Compactador de batallas</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

add_Alliance_Menu();

//niveles
var getbody=document.getElementsByTagName('body')[0];

//some standard functions
var XPFirst	 = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList	 = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter	 = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPIterOrder	 = XPathResult.ORDERED_NODE_ITERATOR_TYPE;

function XX(xpath, xpres, startnode, myhtml){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (myhtml) ret.singleNodeValue.innerHTML=myhtml;
		return	xpres == XPFirst ? ret.singleNodeValue : ret;
}

function forall(query,startnode, call){
	var objs=XX(query,XPList,startnode);
	for (var i = 0; i < objs.snapshotLength; i++) 
		call(objs.snapshotItem(i),i);
}

function node(type, id, className, style, content, title ) {
    var n = document.createElement(type||"div"); 
    if (id) n.setAttribute('id',id);
    if (className) n.className = className;
    if (title) n.setAttribute('title',title);
    if (style) n.setAttribute('style',style);
    if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
    return n;
}

switch (getbody.id){
    case "city":
	forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
	    var lvl = obj.title.replace(/[^\d-]+/g, "");
	    if (lvl.length>0) {
		var as=node('a','blevels','blevels','background:#000;top:10px;left:25px;width:18px;height:18px;font-size:12px;margin:0;padding:0px 0px 0px 0px;color:#fff;-moz-outline: orange ridge 2px;-moz-outline-radius: 10px 10px 10px 10px;text-align:center;',lvl);
		obj.parentNode.appendChild(as);
	    }
	});
    break;
}
//niveles
// ==UserScript==
// @name           	Ikariam Payloads +/-500,+1000,+2000,+5000
// @version	2
// @author		berivik
// @namespace     Ikariam Payloads
// @description    Add +/-500,+1000,+2000,+5000 buttons on views where you need to set resources payload. Require Ikariam v 0.3.0 game server. Based on oliezekat's x500Payloads.
// @include     http://*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @exclude    http://*.ikariam.*/*?view=options
// @exclude    http://*.ikariam.*/*?view=highscore
// @exclude    http://*.ikariam.*/pillory.php
// ==/UserScript==

if (!IkaPayloads) var IkaPayloads = {};

IkaPayloads =
	{
	View: '',
	
	EnhancedBy: 'Enhanced by <a target="_blank" href="http://userscripts.org/scripts/show/51384"><b>Ikariam Payloads</b></a>.',

	Init: function()
		{
		IkaPayloads.DOM.Init(this);

		// Fetch view name
		try
			{
			IkaPayloads.View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) IkaPayloads.View = RegExp.$1;
			}
		if (IkaPayloads.View =='transport')
			{
			IkaPayloads.View_Transport();
			}
		else if (IkaPayloads.View =='branchOffice')
			{
			IkaPayloads.View_BranchOffice();
			}
		else if (IkaPayloads.View =='takeOffer')
			{
			IkaPayloads.View_TakeOffer();
			}
		else if (IkaPayloads.View =='colonize')
			{
			IkaPayloads.View_Colonize();
			}
		// Oh my god! I had forgot view's name while launch new colony. And I coudn't try this now :o(  .oO(hope I will not forget...)
		},
		
	View_Transport: function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			#mainview ul.resourceAssign { width: 750px; }
			#container .resourceAssign input.textfield { top: 9px; }
			input.IkaPayloads1 { position: absolute; top: 6px; left: 511px; margin: 0px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { position: absolute; top: 6px; left: 541px; margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { position: absolute; top: 6px; left: 570px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { position: absolute; top: 6px; left: 603px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { position: absolute; top: 6px; left: 636px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var li = nodes.snapshotItem(i);
				var Good = li.className;
				
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				li.appendChild(input);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				li.appendChild(input);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				li.appendChild(input);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				li.appendChild(input);
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				li.appendChild(input);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},
				
	View_TakeOffer: function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//div[@id='mainview']//td[@class='input']/input");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			input.IkaPayloads1 { margin: 0px; margin-left: 5px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},
		
	View_BranchOffice: function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//table[@class='tablekontor']//td/input");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			input.IkaPayloads1 { margin: 0px; margin-left: 5px; margin-bottom: 2px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i=i+2)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},
		
				
	Add_500_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value or complete to x500 value
		input.value = Math.floor(parseInt(input.value)/500)*500 + 500;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_1k_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 1000 and complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 + 1000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_2k_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 2000 and complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 + 2000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_5k_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 5000 and complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 + 5000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Dec_500_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Decrease value or complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 - 500;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Insert_Footer: function()
		{
		var div = document.createElement('div');
		div.id = 'IkaPayloadsFooter';
		div.setAttribute("style", "margin-bottom: 10px; text-align: right;");
		div.innerHTML = IkaPayloads.EnhancedBy;
		var mainview = document.getElementById("mainview");
		mainview.appendChild(div);
		}
	};

IkaPayloads.View_Colonize = function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			#mainview ul.resourceAssign { width: 750px; }
			#container .resourceAssign input.textfield { top: 9px; }
			#container .resourceAssign .summary {left: 500px !important;}
			input.IkaPayloads1 { position: absolute; top: 6px; left: 511px; margin: 0px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { position: absolute; top: 6px; left: 541px; margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { position: absolute; top: 6px; left: 570px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { position: absolute; top: 6px; left: 603px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { position: absolute; top: 6px; left: 636px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
		
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var li = nodes.snapshotItem(i);
				var Good = li.className;
				if ((Good == undefined) || (Good == '')) continue;
			
				// Fix for colonize
				if (Good == 'wood') Good = 'resource';
				if (Good == 'glass') Good = 'crystal';
			
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				li.appendChild(input);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				li.appendChild(input);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				li.appendChild(input);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				li.appendChild(input);
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				li.appendChild(input);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},

IkaPayloads.DOM =
	{
	_Parent: null
	};
	
IkaPayloads.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};
	
IkaPayloads.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
IkaPayloads.Init();
// 
// version 2.0.0 (beta)
// 2009-05-18
// author - miasM http://www.entula.net
// most code ripped from ikariaminlinescore by immortalknight from http://www.ikaraimlibrary.com/
// this is a  modified version of ikariaminlinescore by immortalknight  from http://www.ikaraimlibrary.com/
// 
// Added support for ikariam version 0.3.1
// Added showed info about ally score position
// Added showed info about militar score position ( not only how much )
// Added showed info for gold score position ( not only how much )
// Font size are now 12
// Removed line for how many ally members, it can be shown near ally score.
// needed code cleanup.
// a
// ==UserScript==
// @name           IkariamOutLineScore
// @namespace      iKariam
// @description    show selected player's scores.
// @version        v0.3.1
// @include        http://*.ikariam.*/*?view=island*
// @exclude        http://board.ikariam.*/*
//                 2009/5/18
// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var post = {
    score: "score",
 military: "army_score_main",
     gold: "trader_score_secondary" };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold",
    3: "allyscore",
    //4: "allymembers",
};

var scoreShown = false;

getElementsByClass = function(inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (findIn == true) {
        if (all[e].className.indexOf(className) > 0) {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

String.prototype.TrimHTML = function() { return this.replace(/(<[^>]*>)/g, ""); }

// called using player name, score type, 
function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=highscore&highscoreType=" + post[type] + "&searchUser=" + playerName,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload:onload
    });
}

function requestAlliance(allyId, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=allyPage&allyId=" + allyId, 
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php',
            'Cookie': document.cookie
        },
        onload:onload
    });
}


function fmtNumber(n) {
  n += "";
  for (var i = (n.length - 3); i > 0; i -= 3) {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}
/*
        <li style="margin: 2px 10px;font-size:10px" id="ally_members" class="ally">
            <span style="float:left;" class="textLabel">{lang['allymembers']}:</span>
            <div id="allymembers">{lang['unknown']}</div>
        </li>
	*/
function createBaseDiv() {
    baseDivCreated = true;
    
    scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "inlinescore");
    scoreElement.setAttribute("class", "dynamic");
    var scoreDiv = <>
    	<h3 style="margin-left:-5px;margin-right:-2px;" class="header">{lang['inline']}</h3>
        <li style="margin: 2px 10px;font-size:12px" id="ally_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['allyscore']}:</span>
            <div id="allyscore">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['score']}:</span>
            <div id="score">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">{lang['military']}:</span>
            <div id="military">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="trader_score_secondary" class="ally">
            <span style="float:left;" class="textLabel">{lang['gold']}:</span>
            <div id="gold">{lang['unknown']}</div>
        </li>
    </>;
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    //var allyClass = getElementsByClass(informationContainer, "ally") 
    
    //insertAfter(scoreElement, allyClass[0]);
    insertAfter(scoreElement, informationContainer);
    scoreShown = true;
}

function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function updateScore(type, score) {
    document.getElementById(type).innerHTML = " "+score;
}

function updateDetails(type, playerName, townLevel, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: hidden;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score", false);
	var place = getElementsByClass(hiddenDiv, "place", false);
    var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
			var totalRank = place[e].innerHTML;
        }
    }
    document.body.removeChild(hiddenDiv);


    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore+"   #"+totalRank;
}

function updateAllyDetails(divId, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;

    var allyTable = getElementsByClass(hiddenDiv, 'content', false);

    var members = parseInt(allyTable[1].childNodes[1].childNodes[1].childNodes[4].childNodes[2].innerHTML, 10);
	//alert("memb"+members);
	//alert("posscore"+allyTable[1].childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[1].innerHTML);
    var posScore = allyTable[1].childNodes[1].childNodes[1].childNodes[8].childNodes[2].innerHTML;

    if (/([0-9]+)\s\((.+)\)/.exec(posScore)!=null) {
    	//allRank = RegExp.$1;
    	//posScore = RegExp.$2;
    }
    document.body.removeChild(hiddenDiv);
    
    var strScore = posScore //+ " (" + allRank + ")";
    document.getElementById("allyscore").innerHTML = strScore+ " (" + members + ")";
    GM_setValue("allyscore", strScore);
//    document.getElementById("allymembers").innerHTML = members;
//    GM_setValue("allymembers", members);
//    GM_setValue(divId, (posScore + " (" + members + ")"));
//    document.getElementById(divId).innerHTML =  (posScore + " (" + members + ")");
}

function cityInformation() {
    if (!document.getElementById("inlinescore")) {
        createBaseDiv();
    }
    else {
    	document.getElementById('ally_score').style.display = "block";
    	//document.getElementById('ally_members').style.display = "block";
    }
    // Get the lanugage
    lang = defineLanguage(domain);
    
    var playerScore = -1;
    // Remove the "points" information (as of 0.2.8), and get the value for later
    var infoContainer = document.getElementById("infocontainer");
    if (infoContainer) {
        var pointsLi = getElementsByClass(infoContainer, "name", false);
        if (pointsLi[1]) {
            playerScore = parseInt(pointsLi[1].innerHTML.split(/>/)[2].replace(/,/g, ""),10);
            pointsLi[1].style.display = "none";
        }
    }
    
    // Remove the disabled actions... looks messy when it happens
    //var actions = document.getElementById("actions");
    //if (actions) {
    //    textSpans = getElementsByClass(actions, "disabled", true);
    //    for (var cnt = 0; cnt < textSpans.length;cnt++) {
    //        //textSpans[cnt].style.display = "none";
    //    }
    //}
    
    
    // Removes the report player link, again causes a fliker
    //var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";
    
    updateScore("score", lang.fetch);
    updateScore("military", lang.fetch);
    updateScore("gold", lang.fetch);
    updateScore("allyscore", lang.fetch); 
    //updateScore("allymembers", lang.fetch);
	
    var listParts = "";
    // Get the players name
    listParts = getElementsByClass(document,"owner", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
    playerName = playerName.replace(/&nbsp;/g, " "); // replace any silly nubspaces!
    
    // Get the players town level for gold pillage data
    listParts = getElementsByClass(document,"citylevel", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var townLevel = parseInt(listParts[2].replace(/^\s+|\s+$/g, ''), 10); // trim up the town level
    
    // Get the players alliance id for alliance check
    listParts = getElementsByClass(document,"ally", false)[0].innerHTML;
    if (/allyId=([0-9]+)/.exec(listParts) != null) {
    	var allyId = RegExp.$1;
    } else {
        var allyId = -1;
        GM_setValue("allyscore", "-");
        //GM_setValue("allymembers", "-");
    }
    
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

        if (playerScore > -1) {
            updateScore('score', fmtNumber(playerScore));
        } else {
            requestScore(playerName, 'score', function(responseDetails) {
                updateDetails('score', playerName, townLevel, responseDetails.responseText);
            });
        }
        
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold', playerName, townLevel, responseDetails.responseText);
        });
        
        if (allyId != -1) {
            requestAlliance(allyId, function(responseDetails) {
                updateAllyDetails('allyscore', responseDetails.responseText);
            });
        } else {
            updateScore("allyscore", "-")
            //updateScore("allymembers", "-")
            document.getElementById('ally_score').style.display = "none";
            //document.getElementById('ally_members').style.display = "none";
        }
        
        
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for(key in scoreTypes) {
            var type = scoreTypes[key];
            if (type == "allyscore" && GM_getValue(type) == "-") {
                document.getElementById('ally_score').style.display = "none";
            }
            /*if (type == "allymembers" && GM_getValue(type) == "-") {
            	document.getElementById('ally_members').style.display = "none";
            }*/
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "fr":
            language = { inline:"OutLine Score",
            fetch:"cargando...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Points",
            military:"Troupes",
            gold:"Oro",
            loot:"loot" };
            break;
        case "gr":
            language = { inline:"OutLine Score",
            fetch:"ανάκτηση...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός",
            loot:"loot" };
            break;
        case "de":
            language = { inline:"OutLine Score",
            fetch:"Laden...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Gesamtpunkte",
            military:"Generäle",
            gold:"Goldbestand",
            loot:"loot" };
            break;
        case "tr":
            language = { inline:"OutLine Score",
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Altin Puani",
            loot:"loot" };
            break;
        case "cz":
            language = { inline:"OutLine Score",
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score: "Celkové skóre",
            military: "Vojenské skóre",
            gold: "Zlatá zásoba",
            loot:"loot" };
            break;
        case "sk":
            language = { inline:"OutLine Score",
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Celkové Skóre",
            military:"Vojenské skóre",
            gold:"Zlatá zásoba",
            loot:"loot" };
            break;
        case "tw":
            language = { inline:"積分資訊",
            fetch:"讀取中...",
            unknown:"無法得知",
            allyscore:"聯盟分數",
            allymembers:"聯盟成員",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            loot:"搶" };
            break;
        case "cn": 
            language = { inline:"排名", 
            fetch:"获取中...", 
            unknown:"无法获取", 
            allyscore:"联盟总分", 
            allymembers:"联盟成员", 
            score:"总分", 
            military:"战争元帅", 
            gold:"黄金储备", 
            loot:"抢" }; 
            break;
        case "hu":
            language = { inline:"OutLine Score",
            fetch:"Töltés...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Összpontszám",
            military:"Katonai pont",
            gold:"Arany",
            loot:"loot" };
            break;
        case "se":
            language = { inline:"OutLine Score",
            fetch:"hämtar...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Totalpoäng",
            military:"Generalspoäng",
            gold:"Guldmängd",
            loot:"loot" };
            break;
        case "pl":
            language = { inline:"OutLine Score",
            fetch:"Ładowanie...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Całkowity Wynik",
            military:"Generałowie",
            gold:"Zapas Złota",
            loot:"loot" };
            break;
        case "ro":
            language = { inline:"OutLine Score",
            fetch:"Incarc...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            allymembers:"Ally Members",
            score:"Scor Total",
            military:"Scor Armata",
            gold:"Scor Aur",
            loot:"loot" };
            break;
        case "il":
            language = { inline:"OutLine Score",
            fetch:"טוען...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"ניקוד",
            military:"כח צבאי",
            gold:"זהב",
            loot:"loot" };
            break;
        case "ikariam":
            if (subDomain == "fi") {
                language = { inline:"OutLine Score",
                fetch:"haetaan...",
                unknown:"Unknown",
                allyscore:"Ally Score",
                allymembers:"Ally Members",
                score:"Kokonaispisteet",
                military:"Sotilaspisteet",
                gold:"Kulta",
                loot:"loot" };
            }
            if (subDomain == "ae") {
                language = { inline:"OutLine Score",
                fetch:"يجلب...",
                unknown:"Unknown",
                allyscore:"نقاط التحالف",
                allymembers:"Ally Members",
                score:"المجموع الكلي",
                military:"النقاط العسكريه",
                gold:"الذهب",
                loot:"loot" };
            }
            if (subDomain == "ba") {
                language = { inline:"OutLine Score",
                fetch:"dohvati...",
                unknown:"nemoguce",
                allyscore:"Bodovi Saveza",
                allymembers:"Ally Members",
                score:"Ukupni Rezultat",
                military:"Vojska",
                gold:"Zlato",
                loot:"loot" };
            }
            break;
        default:
            language = { inline:"OutLine Score",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score",
            loot:"loot" };
            break;
    }
    return language;
}



function init() {
    lang = defineLanguage(domain);
    
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation, 1); }, false);
        }
    }
        
    var informationDiv = document.getElementById('information');
    if (informationDiv) {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) {
            cityInformation();
        }
    }
}

init();
// ==UserScript==
// @name           Ikariam All In One Embassy Tool
// @namespace      MMXForge
// @description    Gives information about what and when of your allyance members
// @author       Luca Saba - N-I-K-O
// @version		   0.10
// @include		   http://s*.ikariam.*/*
// @exclude		   http://board.ikariam.*/*
// ==/UserScript==
/*
 * This script comes from an idea of N-I-K-O.
 * It merge in a unique script 2 other scripts
 * IkariamMemberLastOnline (http://userscripts.org/scripts/show/34793) from Ektdeheba
 * Ikariam Ally's Memebers Info (http://userscripts.org/scripts/show/34852) from Luca Saba... wich is me :D
*/
/*
 * Changes in v. 0.9
 * - Ikariam 2.8 compatibility
 * - Removed Ally Sorter.... not needed anymore
 */
 
if(document.getElementById('embassy') == null && document.getElementById('alliance') == null) return;

var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

var tpl = GM_getValue('template', 0);

var membersTab = document.getElementById('memberList');
if(membersTab == null) return;
var update_record = false;
//var points_cell_idx = membersTab.rows[0].cells.length - 3;
var points_cell_idx = 4;

/*
 * Words dictionary
 */
var lang={
  en: {'newAlert': 'New Members', 'newTotal': 'Total new members', 'aband': 'Abandon', 'totAban': 'Total abandon', 'confirm': 'Are you sure you want to reset recorded points ?'},
  it: {'newAlert': 'Nuovi membri', 'newTotal': 'Totale nuovi membri', 'aband': 'Abbandoni', 'totAban': 'Totale abbandoni', 'confirm': 'Sei sicuro di cancellare i punteggi salvati ?'},
  co: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
  il: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
}

var local = 'en'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;

//Order by points... not needed anymore
//sortAlly();

//Last Recorded values... this method.. I've seen it in an ecmanaut script ;-)
var members = eval(GM_getValue(domain + "." + server + ".members.2.8", {}) || {});
var recorded_points = eval(GM_getValue(domain + "." + server + ".points.2.8", {}) || {});
//Add reset and config images
var confRow = document.createElement('TR');
var confCell = document.createElement('TD');
confCell.setAttribute('colspan', '6');
confCell.innerHTML = "<img style='float: left' src='http://isoleunite.mmxforge.net/images/stories/ikariam/unit_boom_small.gif' alt='Config' title='Config' id='ainfoConfig'>";
confCell.innerHTML += "<img style='float: right' src='http://isoleunite.mmxforge.net/images/stories/ikariam/icon-backx20.gif' alt='Reset' title='Reset' id='ainfoReset'>";
confRow.appendChild(confCell);
membersTab.appendChild(confRow);

//Listener to reset member's points record
document.addEventListener('click',function(event) {
  //Send Message Button
  if (event.target.id=='ainfoReset') 
  {
    recorded_points = actualValues;
    if(confirm(lang[local]['confirm']))
      saveArray("points", recorded_points);
  }
  if (event.target.id=='ainfoConfig') 
  {
    showToolConfig(event);
  }
  if ( event.target.id=='eToolConfButton')
  {
    if(document.getElementById('eToolCfImages').checked)
      GM_setValue('template', 1);
    else
      GM_setValue('template', 0);
    document.getElementById('eToolConfDiv').style.display = 'none';
  }
}, true);
//addEventListener("keyup", showToolConfig, false);

function showToolConfig(e)
{
  //if(e.keyCode != 51) return;
  var div =  document.getElementById('eToolConfDiv');
  if(div) div.style.display = 'block';
  else
  {
    div = document.createElement('div'); 
    div.setAttribute('id', 'eToolConfDiv');
    div.setAttribute('class', 'dynamic');
    div.setAttribute('style', 'z-index: 10; border: 1px solid #CB9B6B; background-color: #FDF7DD; width: 229px; height: 150px; position: absolute; float: center;top: ' + e.pageY + 'px; left: ' + e.pageX +'px');
    div.innerHTML = '<h3 class="header" style="padding-top: 8px; height: 20px; background-image: url(http://s3.ikariam.it/skin/layout/bg_sidebox_header.jpg)"><b>Config</b></h3>'; 
    div.innerHTML += '<div style="margin-left: 80px; margin-top: 20px; text-align: left">';
    
    if(tpl == 0) div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0" checked >&nbsp;Text<br/>';
    else div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0">&nbsp;Text<br/>';
    
    if(tpl == 1) div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1" checked >&nbsp;Images</div>';
    else div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1">&nbsp;Images</div>';
    
    //GM_log(div.innerHTML);
    div.innerHTML += '<input id="eToolConfButton" type="button" class="button" value="Save">';
    document.body.appendChild(div); 
  }
}

var actualValues = getActualData();
//Let's check for new entries
var msg = lang[local]['newAlert'] + "\n";
var sum = 0;

for(var readed_name in actualValues)
{
  //If an actual member name is not in the members list...
  if(typeof(members[readed_name]) == 'undefined')
  {
    sum++;
    msg += readed_name + "\n";
  }
}
if(sum > 0) alert(msg + lang[local]['newTotal'] + ": " + sum);
//And now, let's check for those who left the ally!
var msg = lang[local]['aband'] + "\n";
sum = 0;
for(var member_name in members)
{
  //If a member name is not in the actual member list...
  if(typeof(actualValues[member_name]) == 'undefined')
  {
    sum++;
    msg += member_name + "\n";
    var trOut = document.createElement("TR");
    trOut.style.backgroundColor = "#F00";
    var tdOut = document.createElement("TD");
    tdOut.setAttribute('colspan','7');
    tdOut.style.color = "#FFF";
    tdOut.innerHTML = "<b>" + member_name + "</b> Points: <b>" + members[member_name] + "</b>";
    trOut.appendChild(tdOut);
    membersTab.appendChild(trOut);
  }
}
if(sum > 0) alert(msg + lang[local]['totAban'] + ": " + sum);
saveArray("members", actualValues);

/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

//Returns an Associative Array of the members's points
//While doing that, it sets the online/inactive/offline status
function getActualData()
{
  var res = new Array();
  var pName = '';
  var pPoints = 0;
  for(i=1; i < membersTab.rows.length - 1; i++)
  {
    setOnlineStatus(membersTab.rows[i]);
    pName = membersTab.rows[i].cells[1].innerHTML;
	  pPoints = membersTab.rows[i].cells[points_cell_idx].innerHTML.replace(/,/g, "") * 1; //Force variable type
	  res[pName] = pPoints;
    //If this is the first insert for this member
    if(typeof(recorded_points[pName]) === 'undefined')
	  {
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>New Entry</font>)";
	    recorded_points[pName] = pPoints;
	    update_record = true;
    }
	  else
	  {
	    var prev = recorded_points[pName];
	    var act = res[pName];
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>" + (act - prev) + "</font>)";
    }
  }
  if(update_record) saveArray("points", recorded_points);
  return res;
}

//Saves an array to GM string
function saveArray(variable, values_array)
{
  var str = '({';
  for(var k in values_array) str += "'" + k + "':" + values_array[k] + ", ";
  str += '})';
  GM_setValue(domain + '.' + server + '.' + variable + ".2.8", str);
}

function setOnlineStatus(tRow)
{
  if(tRow.cells[0].getAttribute('class') == 'online')
  {
    template('online', tRow, null);
  }
  else if(tRow.cells[0].getAttribute('class') == 'offline')
  {
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].replace(/^\s+|\s+$/g, '');
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    var lastOnline = tRow.cells[0].title.split(":")[1].replace(/^\s+|\s+$/g, '');
    var lastDate = convertIkariamDate( lastOnline );

    if( lastDate < inactiveDate )
      template('inactive', tRow, lastOnline);
    else
      template('offline', tRow, lastOnline);
  }
}

function template(status, rowElement, lastOnline)
{
  if(status == 'online')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML="<div style='width: 8em'><span style='float: right'><img src='http://iudis.mmxforge.net/images/stories/ikariam/On.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML="<B><font color='#008800'>ONLINE</FONT></B>";        
        break;
    }
  }
  else if(status == 'inactive')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left'>("+lastOnline + ")</span><span style='float: right'><img src='http://www.ikariamods.com/gunmetal/cadmium/hardcode/crown.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<B><font color='#708090' SIZE='1'>("+lastOnline + ")INACTIVE</FONT></B>";        
        break;
    }
  }
  else if(status == 'offline')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left;'>("+lastOnline+")</span><span style='float: right'><img src='http://iudis.mmxforge.net/images/stories/ikariam/Off.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<font color='#F00' SIZE='1'>("+lastOnline+")OFFLINE</FONT>";
        break;
    }
  }
  rowElement.cells[0].style.backgroundImage = "none";
}
// ==UserScript==
// @name           World Select
// @namespace      WTF
// @include        http://ikariam.*/
// @include        http://www.ikariam.*/
// ==/UserScript==

//INTRODUCE A CONTINUACION (Cambiando el 12) EL NUMERO DE TU SERVIDOR (1-Alpha, 2-Beta, etc.) Lo puedes ver en el foro
var id = 12;

//AQUI PUEDES ADAPTARLO SI JUEGAS EN OTRO IKARIAM DIFERENTE AL .ES
var country = "es";

//NO MODIFICAR A PARTIR DE AQUI
var text = document.getElementById('universe');
text.innerHTML = text.innerHTML.replace('<option value="s' + id + '.ikariam.' + country + '">','<option value="s' + id + '.ikariam.' + country + '" selected="selected">');
// ==UserScript==
// @name Ikariam: Ikariam Transporter
// @author darkyndy
// @include http://*.ikariam.*/index.php*
// @version 0.1
// @description Transport to your villages
// ==/UserScript==


// Add styles BEGIN
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#transportBox { height: 20px; width: 200px; position: relative; margin:-185px 29px -18px 630px; z-index:99; display:block;}');
// Add styles END

var ikMain = document.getElementById('mainview');
var ikNewElement = document.createElement('div');
ikNewElement.setAttribute('id', 'transportBox');
ikMain.parentNode.insertBefore(ikNewElement, ikMain);


var citySelect = document.getElementById("citySelect");

var new_options = "";
for(var i=0;i<citySelect.length;i++){
//<a href=\"index.php?view=transport&amp;destinationCityId="+citySelect[i].value+"\">T</a>
  new_options = new_options+"<option value=\""+citySelect[i].value+"\">"+citySelect[i].text+"</option>";
}

document.getElementById("transportBox").innerHTML = "<form method=\"GET\" action=\"index.php\"><select name=\"destinationCityId\" style=\"width:130px;\">"+new_options+"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /><input type=\"submit\" value=\"Go\" /></form>";

