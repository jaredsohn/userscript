// ==UserScript==
// @name        ArmBotHelper2
// @namespace   tinyrsn
// @include     http://turntable.fm/rrunescape
// @version     1
// ==/UserScript==


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
	var div = document.getElementById('tt2_stats_current_coverart');
	// Create a div to surround the button
	var modDiv = document.createElement('div');
	modDiv.setAttribute('id', 'armbothelper');
		
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
	//targetDiv.appendChild(modDiv);
}
addButtons();
 

 