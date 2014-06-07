// ==UserScript==
// @name GS easy emblems
// @description    Script shows all of the users emblems on their profile
// @version 0.2
// @author XenoLair
// @include        http://*.gamespot.com/users/*
// @include        http://gamespot.com/users/*
//
// last edit: 2. aug 2011
// ==/UserScript==

var emblems = document.createElement('div');
var site = document.location.href.split("users")[0];
addPopup();

if(document.title.indexOf("Profile") > 1){
var req = new XMLHttpRequest();
req.open("GET", site +"users/"+document.title.split("'")[0]+"/achievements/gamespot", true);
req.onreadystatechange = function () {  
if (req.readyState == 4) 
     {
        if(req.status == 200)
	   {
		var emblemlist = req.responseText.substr(req.responseText.search(/<div class="achievement_list">/));
		var emblemCount = req.responseText.substr(req.responseText.search(/<td class="num_achieved">/),30).match(/\d{1,3}/);

		var div = document.createElement('div');
		div.innerHTML = emblemlist;

		var embl = new Array(); // array holds emblem id + emblem name

		for (i=0; i<emblemCount ; i++)		
		{
		   embl[i] = new Array(3);

		   embl[i]["title"] = div.getElementsByClassName("title")[i].childNodes[0].nodeValue.trim();
		   embl[i]["desc"] = div.getElementsByTagName("li")[i].childNodes[1].getElementsByTagName("p")[0].innerHTML;
		   var line = div.getElementsByTagName("li")[i].className.replace(/first last|first|last/, "").trim();
		   embl[i]["id"] = JSON.parse(line.replace(/'/g, '"')).id;
		}

		embl.sort(function(a,b) {return parseInt(a.id) - parseInt(b.id);}); //sort by id
		embl = setStationary(embl, emblemCount);

		var html = "<div class='module list_emblems contain_all'><div class='head'><div class='wrap'><div class='module_title_wrap'><h2 class='module_title'>My Emblems</h2>";
		html += "<ul class='more'><li class='first'><a  href='http://www.gamespot.com/users/"+document.title.split("'")[0]+"/achievements/gamespot'>"+emblemCount +"</a></li></ul></br></br>";
		html += "<font style='font-size:6px'>";
		
		var lineCount = 0;
		for (i=0; i<emblemCount ; i++)
		{
		   if(lineCount < 1)
			{
			   html += "<pre style='margin:0;' >";
			}
 
		   html +="<img src='http://image.com.com/gamespot/shared/user/emblems/emblem_" +embl[i]["id"]+ "_32x32.jpg' onMouseover=\"ddrivetip('<img src=http://image.com.com/gamespot/shared/user/emblems/emblem_" +embl[i]["id"]+ "_64x64.jpg /></br><b>"+embl[i]["title"].replace(/'/, "")+"</b><p>"+ embl[i]["desc"].replace(/"|'|\n|\r/gm, "")+"</p>')\" onMouseout='hideddrivetip()'/> ";

		   if(lineCount == 7)
			{
			   html +="</pre>";
			   lineCount = 0;
			}
		   else
		        {lineCount++;}
		}

		html +="</pre></font></br></div></div></div></div>";
		emblems.innerHTML = html;
		var parent = document.getElementById("side");
		parent.insertBefore(emblems, parent.firstChild);
	   }
     }
}
req.send(null);
}

//reorder list to set stationary emblems

function setStationary(embl, emblemCount)
{

var isMod = 0;
var hasSoap = 0;
var goodTaste =0;
var betatester =0;
var oldSkool =0;
var isAficionado =0;
var isCollector =0;
var isBetaTester =0;

		for (i=0; i<emblemCount ; i++)		
		{
var temp = new Array();

if(embl[i]["id"] == 76 | embl[i]["id"] == 77 | embl[i]["id"] == 78 | embl[i]["id"] == 35| embl[i]["id"] == 36) 
{temp = embl[0]; embl[0] = embl[i]; embl[i] = temp} // rank
if(embl[i]["id"] == 258 | embl[i]["id"] == 259 | embl[i]["id"] == 260 | embl[i]["id"] == 261 | embl[i]["id"] == 262 | embl[i]["id"] == 263)
{temp = embl[1]; embl[1] = embl[i]; embl[i] = temp; isMod = 1;} //mod rank
if(embl[i]["id"] == 54 | embl[i]["id"] == 55 | embl[i]["id"] == 56) 
{temp = embl[1+isMod]; embl[1+isMod] = embl[i]; embl[i] = temp} // popularity
if(embl[i]["id"] == 25) 
{temp = embl[2+isMod]; embl[2+isMod] = embl[i]; embl[i] = temp; hasSoap = 1;} // soapbox
if(embl[i]["id"] == 31 | embl[i]["id"] == 32) 
{temp = embl[2+hasSoap+isMod]; embl[2+hasSoap+isMod] = embl[i]; embl[i] = temp; oldSkool =1;}// old skool
if(embl[i]["id"] == 44 | embl[i]["id"] == 46 | embl[i]["id"] == 42 | embl[i]["id"] == 43 | embl[i]["id"] == 45 | embl[i]["id"] == 68 | embl[i]["id"] == 46 | embl[i]["id"] == 586 | embl[i]["id"] == 587 | embl[i]["id"] == 588 | embl[i]["id"] == 591 | embl[i]["id"] == 585 | embl[i]["id"] == 599) 
{temp = embl[2+hasSoap+oldSkool+isMod]; embl[2+hasSoap+oldSkool+isMod] = embl[i]; embl[i] = temp; isAficionado=1;}// Aficionado
if(embl[i]["id"] == 40 | embl[i]["id"] == 39) 
{temp = embl[2+hasSoap+oldSkool+isAficionado+isMod]; embl[2+hasSoap+oldSkool+isAficionado+isMod] = embl[i]; embl[i] = temp; goodTaste =1;}// goodTaste
if(embl[i]["id"] == 41) 
{temp = embl[2+hasSoap+oldSkool+isAficionado+isMod+goodTaste]; embl[2+oldSkool+hasSoap+isAficionado+isMod+goodTaste] = embl[i]; embl[i] = temp; isCollector =1;}// serious collector
if(embl[i]["id"] == 26) 
{temp = embl[2+hasSoap+oldSkool+isAficionado+isMod+goodTaste+isCollector]; embl[2+oldSkool+hasSoap+isAficionado+isMod+goodTaste+isCollector] = embl[i]; embl[i] = temp; isBetaTester =1;}// beta tester
if(embl[i]["id"] == 69)
{temp = embl[2+hasSoap+oldSkool+isAficionado+isMod+goodTaste+isCollector+isBetaTester]; embl[2+oldSkool+hasSoap+isAficionado+isMod+goodTaste+isCollector+isBetaTester] = embl[i]; embl[i] = temp;}// artistic
		}
return embl;
}

//generates CSS + JS for balloon popups

/***********************************************
* Cool DHTML tooltip script- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

function addPopup()
{
var styleHtml = ""; //CSS for bubble popup
var headCss = document.createElement('style');
headCss.setAttribute("type", "text/css");

styleHtml += "#dhtmltooltip{";
styleHtml += "position: absolute;";
styleHtml += "width: 300px;";
styleHtml += "border: 1px solid black;";
styleHtml += "padding: 5px;";
styleHtml += "background-color: white;";
styleHtml += "visibility: hidden;";
styleHtml += "z-index: 100;";
styleHtml += "text-align:center;";
styleHtml += "filter: progid:DXImageTransform.Microsoft.Shadow(color=gray,direction=135);";
styleHtml += "}";

headCss.innerHTML=styleHtml;
document.getElementsByTagName('head')[0].appendChild(headCss); 


var scriptHtml = new Array(); //JS for bubble popup
var headScript = document.createElement('script');
headScript.setAttribute("type", "text/javascript");

scriptHtml.push("var offsetxpoint=-60 //Customize x offset of tooltip");
scriptHtml.push("var offsetypoint=20 //Customize y offset of tooltip");
scriptHtml.push("var ie=document.all");
scriptHtml.push("var ns6=document.getElementById && !document.all");
scriptHtml.push("var enabletip=false");
scriptHtml.push("if (ie||ns6)");
scriptHtml.push("var tipobj=document.all? document.all['dhtmltooltip'] : document.getElementById? document.getElementById('dhtmltooltip') : ''");
scriptHtml.push("function ietruebody(){");
scriptHtml.push("return (document.compatMode && document.compatMode!='BackCompat')? document.documentElement : document.body");
scriptHtml.push("}");
scriptHtml.push("function ddrivetip(thetext, thecolor, thewidth){");
scriptHtml.push("if (ns6||ie){");
scriptHtml.push("if (typeof thewidth!='undefined') tipobj.style.width=thewidth+'px'");
scriptHtml.push("if (typeof thecolor!='undefined' && thecolor!='') tipobj.style.backgroundColor=thecolor");
scriptHtml.push("tipobj.innerHTML=thetext");
scriptHtml.push("enabletip=true");
scriptHtml.push("return false");
scriptHtml.push("}");
scriptHtml.push("}");
scriptHtml.push("function positiontip(e){");
scriptHtml.push("if (enabletip){");
scriptHtml.push("var curX=(ns6)?e.pageX : event.clientX+ietruebody().scrollLeft;");
scriptHtml.push("var curY=(ns6)?e.pageY : event.clientY+ietruebody().scrollTop;");
scriptHtml.push("var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20");
scriptHtml.push("var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20");
scriptHtml.push("var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000");
scriptHtml.push("if (rightedge<tipobj.offsetWidth)");
scriptHtml.push("tipobj.style.left=ie? ietruebody().scrollLeft+event.clientX-tipobj.offsetWidth+'px' : window.pageXOffset+e.clientX-tipobj.offsetWidth+'px'");
scriptHtml.push("else if (curX<leftedge)");
scriptHtml.push("tipobj.style.left='5px'");
scriptHtml.push("else");
scriptHtml.push("tipobj.style.left=curX+offsetxpoint+'px'");
scriptHtml.push("if (bottomedge<tipobj.offsetHeight)");
scriptHtml.push("tipobj.style.top=ie? ietruebody().scrollTop+event.clientY-tipobj.offsetHeight-offsetypoint+'px' : window.pageYOffset+e.clientY-tipobj.offsetHeight-offsetypoint+'px'");
scriptHtml.push("else");
scriptHtml.push("tipobj.style.top=curY+offsetypoint+'px'");
scriptHtml.push("tipobj.style.visibility='visible'");
scriptHtml.push("}");
scriptHtml.push("}");
scriptHtml.push("function hideddrivetip(){");
scriptHtml.push("if (ns6||ie){");
scriptHtml.push("enabletip=false");
scriptHtml.push("tipobj.style.visibility='hidden'");
scriptHtml.push("tipobj.style.left='-1000px'");
scriptHtml.push("tipobj.style.backgroundColor=''");
scriptHtml.push("tipobj.style.width=''");
scriptHtml.push("}");
scriptHtml.push("}");
scriptHtml.push("document.onmousemove=positiontip");

var popupDiv = document.createElement('div');
popupDiv.setAttribute("id","dhtmltooltip");
document.getElementsByTagName("body")[0].insertBefore(popupDiv, document.getElementsByTagName("body")[0].firstChild); 

headScript.innerHTML=scriptHtml.join('\n');
document.getElementsByTagName("body")[0].insertBefore(headScript, document.getElementsByTagName("body")[0].firstChild); 
}
