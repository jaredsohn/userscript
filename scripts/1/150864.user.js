// ==UserScript==
// @name        ArmBotHelper
// @namespace   tinyrsn
// @include     http://turntable.fm/rrunescape
// @version     1
// ==/UserScript==

// OPTIONS ///////////////////////////////////////////////////////////////
var box_style = 'border:1px solid #FFFFFF; background:#000000; color:#FFF; padding:16px; width:300px; text-align:center; cursor:move;';
//////////////////////////////////////////////////////////////////////////

function dragStart(e) {
dragObj.elNode = e.target;
if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
dragObj.cursorStartX = e.clientX + window.scrollX;
dragObj.cursorStartY = e.clientY + window.scrollY;
dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
dragObj.elNode.style.zIndex = ++dragObj.zIndex;
document.addEventListener("mousemove", dragGo,   true);
document.addEventListener("mouseup",   dragStop, true);
e.preventDefault();
}

function dragGo(e) {
e.preventDefault();
var x = e.clientX + window.scrollX,
	y = e.clientY + window.scrollY;
dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
dragObj.elNode.style.top = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
}

function dragStop(e) {
document.removeEventListener("mousemove", dragGo,   true);
document.removeEventListener("mouseup",   dragStop, true);
}

var dragObj = new Object(), x, y;
dragObj.zIndex = 20000;
var div = document.createElement('div');
div.setAttribute('id', 'draggable_box');
div.setAttribute('style', 'z-index:99; position:fixed; top:'+((window.innerHeight/8)+300)+'px; left:'+((window.innerWidth/2)-50)+'px; -moz-border-radius:6px; '+(box_style?box_style:''));
div.addEventListener('mousedown', function(e){dragStart(e);}, false);
document.body.insertBefore(div, document.body.firstChild);





// Inserts javascript that will be called by the autoCheckOrderButton
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  'function enterText(msg) { 				\
	var inputs, index;												\
	inputs = document.getElementsByTagName("input");				\
	for (index = 0; index < inputs.length; ++index) {				\
	if (inputs[index].placeholder == "enter a message") {			\
	var inputBox = inputs[index];									\
	inputBox.value = msg;inputBox.focus();							\
}}}';
document.getElementsByTagName("head")[0].appendChild(scriptElement);

window.addButtons = function () {
	// Get the location on the page where you want to create the button
	var targetDiv = document.getElementById('draggable-box');

	// Create a div to surround the button
	var modDiv = document.createElement('div');
	modDiv.setAttribute('id', 'ArmBotModHelper');
		
	function ButtonRec(p1, p2, p3) {
		this.name = (p1 != undefined) ? p1 : '';
		this.buttonText = (p2 != undefined) ? p2 : '';
		this.textToEnter = (p3 != undefined) ? p3 : '';
	}

	var buttonCreateList = [
		new ButtonRec("armbotABEngage", "Autobop Engage", "armbot /autobop engage"),
		new ButtonRec("armbotABDisengage", "Autobop Disengage", "armbot /autobop disengage"),
		new ButtonRec("armbotDjMode", "Start DJ Mode", "armbot /djmode"),
		new ButtonRec("armbotSkip", "Skip Song", "armbot /skip"),
		new ButtonRec("armbotGetDown", "Stop DJ Mode", "armbot /getdown"),
		new ButtonRec("armbotqinfo", "Queue Info", "/q"),
		new ButtonRec("armbotqon", "Queue On", "/q on"),
		new ButtonRec("armbotqoff", "Queue Off", "/q off"),
		new ButtonRec("armbotqplays", "Plays", "/plays"),
		new ButtonRec("armbotsc1", "SC = 1", "/1"),
		new ButtonRec("armbotsc2", "SC = 2", "/2"),
		new ButtonRec("armbotsc3", "SC = 3", "/3"),
		new ButtonRec("armbotscnone", "SC = None", "/none"),
		new ButtonRec("armbotBL", "Blacklist", "armbot /blacklist ")
	];

	var inputButton = [];
		
	for (j=0; j<buttonCreateList.length; j++) {
		inputButton[j] = document.createElement('input');
		inputButton[j].name = buttonCreateList[j].name;
		inputButton[j].type = 'button';
		inputButton[j].value = buttonCreateList[j].buttonText;
		inputButton[j].width = '60px';
		inputButton[j].setAttribute("onclick", "enterText('"+buttonCreateList[j].textToEnter+"');");
		div.appendChild(inputButton[j]);
	}
	//div.appendChild(modDiv);
}
addButtons();
 


 