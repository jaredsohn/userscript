// ==UserScript==
// @name           SSW.UpUp.us Combat Advance
// @namespace      http://SSW.UpUp.us
// @description    Adds range selection, auto-filling
// @include        http://www.secretsocietywars.com/index.php?p=planets&a=daily_maze*
// @include        http://www.secretsocietywars.com/index.php?p=monsters*
// @include        http://www.secretsocietywars.com/index.php?p=quests&a=quest*

// ==/UserScript==
var atkButton = find('.//input[@type="submit" and @value="attack"]');
if(atkButton) {
	//low end ranges for movement (these aren't exact, and may change).
	var ler = ({
		tent:1,
		conf:10,
		reck:35
	});
	openEventListeners=new Array();
	addEventListener(window, 'unload', destroyEventListeners, false);

	var form=find('./ancestor::form',atkButton);
	var lh = form.elements.namedItem('lh_attack');
	var rh = form.elements.namedItem('rh_attack');
	var lastLH = GM_getValue('origLeft',false);
	var lastRH = GM_getValue('origRight',false);
	
	if(lh) {
		lh.addEventListener('change', function(ev) {GM_setValue("origLeft", this.value);}, false);
	}
	if(rh) {
		rh.addEventListener('change', function(ev) {GM_setValue("origRight", this.value);}, false);
	}
	
	if(lastLH) {
		lh.value=lastLH;
//		GM_setValue('origLeft',false);
	}
	if(lastRH) {
		rh.value=lastRH;
//		GM_setValue('origRight',false);
	}
	
	var currentIP = 0;
	var moveField = document.createElement('input');
	moveField.type="text";
	moveField.value = GM_getValue('targetIP',40);
	moveField.size=3;
	moveField.title="Target IP";
	moveField.maxLength=3;
	moveField.style.width="2em";
	moveField.style.marginRight="4px";
	addEventListener(moveField,'change',changeMove,false);
	
	moveSubmit = document.createElement('input');
	moveSubmit.type="button";
	moveSubmit.value="advance";
	moveSubmit.setAttribute("accesskey", "z");
	addEventListener(moveSubmit,'click',advance,false);
	
	var frag = document.createDocumentFragment();
	frag.appendChild(moveField);
	frag.appendChild(moveSubmit);
	
	var targetCell = find('ancestor::td[1]/following-sibling::td[1]',atkButton);
	targetCell.style.textAlign="left";
	targetCell.insertBefore(frag,targetCell.firstChild);
}

function changeMove() {
	var newMove = moveField.value;
	newMove=newMove*1;
	if(!isNaN(newMove) && newMove > 0 && newMove < 500) {
		GM_setValue('targetIP',newMove);
	} else {
		moveField.value = GM_getValue('targetIP',40);
	}
}

function addEventListener(target, event, listener, capture) {
	openEventListeners.push( [target, event, listener, capture] );
	target.addEventListener(event, listener, capture);
}
function destroyEventListeners(event) {
	for (var i = 0, l=openEventListeners.length; i<l; i++)     {
		var rel = openEventListeners[i];
		rel[0].removeEventListener(rel[1], rel[2], rel[3]);
	}
	window.removeEventListener('unload', destroyEventListeners, false);
}
function advance() {
	GM_setValue('origLeft',lh.value);
	GM_setValue('origRight',rh.value);
	var findIPRegex=/ about (\d+) IP/g
	var currentIP;
	while(x=findIPRegex.exec(document.body.innerHTML)) {
		currentIP=x[1];
	}
	var targetIP = GM_getValue('targetIP',40);
	var diff=currentIP - targetIP;

	var rhVal = 'weapon1';
	var lhVal = 'weapon2';
	if(diff>0) {
		//Try to do one handed advance first
		GM_log("Difference: "+diff)
		switch (true) {
			case diff<=ler.tent:
				rhVal = "forward-sm";
			break;
			case diff<=ler.conf:
				rhVal = "forward-med";
			break;
			case diff<=ler.reck:
				rhVal = "forward-lg";
			break;
			
			case diff<=ler.reck+ler.tent:
				rhVal = "forward-sm";
				lhVal = "forward-lg";
			break;
			case diff<=ler.reck+ler.conf:
				rhVal = "forward-med";
				lhVal = "forward-lg";
			break;
			case diff>ler.reck+ler.conf:
				rhVal = "forward-lg";
				lhVal = "forward-lg";
			break;
		}
	}
	lh.value=lhVal;
	rh.value=rhVal;
	atkButton.click();
}
function find(xp,location) {
	if(!location)location = document;
	var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	return temp.singleNodeValue;
}