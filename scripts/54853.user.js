// ==UserScript==
// @name           OGame Helper
// @namespace      OH
// @description    
// @include        http://*.ogame.org/*
// ==/UserScript==

/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
	}
}

function getMouseOffset(target, ev){
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		
	GM_setValue("OGH_POSITION", dragObject.style.top +"_"+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){	
var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;	
	if(target.getAttribute('DragObj')){
		return false;
	}	
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener("mousedown",function(ev){
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this.parentNode, ev);
		return false;
	}, false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);
/************************************************************************************/
/* get all the planets from the dropdown and return the text in an array */
window.getPlanets = function() {
   var returnVal = new Array();
   for (var i=0; i < ddplanets.options.length; i++) {
      returnVal[i] = ddplanets.options[i].text;
   }
   return returnVal;
}

window.getOnlyPlanets = function(PlanetArray) {
   var returnVal = new Array();
   for (var i=0; i < PlanetArray.length; i++) {
      if (!/\(Moon\)/.test(PlanetArray[i])) {
         returnVal[returnVal.length] = PlanetArray[i];
      }
   }
   return returnVal;
}

window.getOnlyMoons = function(PlanetArray) {
   var returnVal = new Array();
   for (var i=0; i < PlanetArray.length; i++) {
      if (/\(Moon\)/.test(PlanetArray[i])) {
         returnVal[returnVal.length] = PlanetArray[i];
      }
   }
   return returnVal
}

window.getMenuLink = function(LinkLabel) {
   var returnVal = document.createElement("a");
   var menu = document.getElementById("menu");
   var links = menu.getElementsByTagName("a");
   var re = new RegExp(LinkLabel, "i");
   for (var i = 0; i < links.length; i++) {
      if (re.test(links[i].text)) {
	 returnVal = links[i];
      }
   }
   return returnVal;
}

window.saveResources = function() {
   var planets = getOnlyPlanets(myPlanets);
   var FleetHREF = getMenuLink("Fleet").href;
   for (var i in planets) {
      setEvent("SETPLANET|" + planets[i]);
      setEvent("PAUSE|2000");
      setEvent("HREF|" + FleetHREF);
      setEvent("SETMAXCARGOS");
      setEvent("CLICKCONTINUE");
      setEvent("SELECTTARGETPLANET");
      setEvent("CLICKCONTINUE");
      setEvent("TRANSPORTALL");
      setEvent("CLICKCONTINUE");
      setEvent("PAUSE|2000");
      setEvent("-");
   }
   processEvents();
   //var myLink = getMenuLink("Fleet");
   //window.location.href = myLink.href;
}

window.setEvent = function(OGEvent) {
   EventQueue.push(OGEvent);
   GM_setValue("OGH_EventQueue",EventQueue.toSource());
}

window.getNextEvent = function() {
   var returnVal =  EventQueue.shift().split("|");
   GM_setValue("OGH_EventQueue",EventQueue.toSource());
   return returnVal;
}

window.setSelectListToPlanet = function(value){
   var si;
   for (var i=0; i<ddplanets.length; i++) {
      if(ddplanets.options[i].text == value){
         si = i;
      }
   }
   ddplanets.selectedIndex = si;
   //eval("window.location.href='http://uni5.ogame.org"+ddplanets.options[si].value+"'");
   window.location.href="http://" + window.location.host + ddplanets.options[si].value;
}

function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 


window.processEvents = function() {
   if (EventQueue.length > 0) {
      var cmd = getNextEvent();
      switch(cmd[0])
      {
         case "SETPLANET":
	    setSelectListToPlanet(cmd[1]);
	    break;
	 case "HREF":
            window.location.href = cmd[1];
            break;
	 case "SETMAXCARGOS":
            setMaxCargos();
	    window.setTimeout(processEvents, 1000);
            break;
	 case "CLICKCONTINUE":
            var inputs = document.getElementsByTagName("input");
	    for (var i in inputs) {
               if (inputs[i].value == "continue") inputs[i].click();
	    }
            break;
         case "SELECTTARGETPLANET":
	    pausecomp(1000);
	    var links = document.getElementById("content").getElementsByTagName("a");
	    var planetName = resourceTargetCoords.replace(/[\W\s]/g, "");
	    for (var i in links) {
               var linkText = links[i].textContent.replace(/[\W\s]/g, "");
               if (linkText == planetName) {
		  window.location.href = links[i].href;
	       }
	    }
	    window.setTimeout(checkDeut, 2000);
	    break;
	 case "TRANSPORTALL":
            var radio = document.getElementsByTagName("input");
	    for (var i in radio) {
	       if (radio[i].type == "radio") {
                  if (radio[i].value == "3") radio[i].checked = true;
	       }
	    }
	    window.location.href = "javascript:maxResources()";
	    window.setTimeout(processEvents, 1000);
            break;
         case "PAUSE":
            var pauseTime = parseInt(cmd[1]);
	    window.setTimeout(processEvents, parseInt(cmd[1]));
            break;
	 case "-":
	    window.setTimeout(processEvents, 1000);
            break;

         default:
      }
   }
}

window.checkDeut = function() {
   var neededDeut = parseInt(document.getElementById("consumption").textContent.replace(/[\W\s]/g, ""));
   var availableDeut = getResources()[2];
   if (neededDeut > availableDeut) {
      alert('not enough info');
      popUntilNextTask();
   }
   window.setTimeout(processEvents, 500);
}

window.popUntilNextTask = function() {
   var endPop = false;
   while (!endPop) {
      var cmd = getNextEvent();
      if (cmd[0] == '-' || cmd[0] == undefined || cmd[0] == '') {
         endPop = true;
      }
   }
}

window.getResources = function() {
   var returnVal = new Array(3);
   // find the resources table and get all columns on the 3rd row
   var resourceTable = document.getElementById("resources").getElementsByTagName("tr")[2].getElementsByTagName("td");
   var metal = parseInt(resourceTable[0].textContent.replace(/\./g, ""));
   var crystal = parseInt(resourceTable[1].textContent.replace(/\./g, ""));
   var deut = parseInt(resourceTable[2].textContent.replace(/\./g, ""));
   returnVal[0] = metal;
   returnVal[1] = crystal;
   returnVal[2] = deut;
   return returnVal;
}

window.setMaxCargos = function() {
   try {
      document.getElementsByName("ship203")[0].value = getNeededCargos();
   }
   catch (err) {
      popUntilNextTask();
   }
}

window.getNeededCargos = function() {
   var myResources = getResources();
   var total = myResources[0] + myResources[1] + myResources[2];
   return Math.ceil(total / 25000);
}

var OGHMain = document.createElement("div");
var ddplanets = document.getElementsByTagName("select")[0]; // the planets dropdown list at the top
var msgCoords = GM_getValue("OGH_POSITION", "45px_300px");
var resourceTargetCoords = GM_getValue("OGH_RESOURCETARGETCOORDS", "1:267:4");
msgCoords = msgCoords.split("_");
OGHMain.style.position = 'absolute';
OGHMain.style.top = msgCoords[0];
OGHMain.style.left = msgCoords[1];
var EventQueue = eval(GM_getValue("OGH_EventQueue"));
if (EventQueue == undefined) {
   EventQueue = new Array();
   GM_setValue("OGH_EventQueue",EventQueue.toSource());
}


OGHMain.id = "OGH_Main";

OGHMain.innerHTML = '<div id="OGH_Main_draghandle" style="position: absolute; z-index: 100; border: 1px solid red; float: right ' +
    'font-size: small; background-color: #ffffff; color: #000000; width: 300px">' + 
    '<p style="margin: 2px 0 1px 0;"> ' +
    'OGame Helper ' +
    '<br/>Save Resources: <br/>' +
    '<select id=resourceTargetDD></select> <input type=button id="btnSaveResources" value="Transport"><input type=button id="btnSkipPlanetSaveResources" value="Skip">' +
    '</p></div>';

   
document.body.appendChild(OGHMain);
var ddResourceTarget = document.getElementById('resourceTargetDD');
var ddResourceTarget = document.getElementById('resourceTargetDD');
ddResourceTarget.addEventListener("change", function() {GM_setValue("OGH_RESOURCETARGETCOORDS", ddResourceTarget.options[ddResourceTarget.selectedIndex].text);}, true);
document.getElementById('btnSaveResources').addEventListener("click", function() {saveResources();}, true);
document.getElementById('btnSkipPlanetSaveResources').addEventListener("click", function() {popUntilNextTask();}, true);
makeDraggable(document.getElementById('OGH_Main_draghandle'));

/* fill in resource target dropdown and fill in with currently selected value from last time */
var myPlanets = getPlanets();
for (var i = 0; i < myPlanets.length; i++) {
	var option = document.createElement("OPTION");
	option.text = myPlanets[i];
	option.value = i;
	if (resourceTargetCoords == option.text) option.selected = true;
	ddResourceTarget.options.add(option);
}

if (EventQueue.length > 0) processEvents();

