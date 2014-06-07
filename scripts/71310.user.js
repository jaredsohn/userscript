// ==UserScript==
// @name           Forgotten Knowledge Download
// @namespace      apache1990.dod.net
// @description    Get all of the forgotten blueprints simultaneously!
// @include        http://*.war-facts.com/forgotten_knowledge.php*
// ==/UserScript==

unsafeWindow.buyThese = new Array();

unsafeWindow.loadXMLDoc = function(url){
	// branch for native XMLHttpRequest object
	unsafeWindow.GM_log("Beginning purchase.");
	req = new XMLHttpRequest();
	req.onreadystatechange = unsafeWindow.processReqChange();
	req.open("GET", url, true);
	req.send(null);
}

unsafeWindow.processReqChange = function(){
	// only if req shows "complete"
	unsafeWindow.GM_log("Processing purchase.");
	if (req.readyState == 4) {
		unsafeWindow.GM_log("A purchase finished.");
		// only if "OK"
	        if (req.status == 200) {
        	    
			}else{
				window.alert("There was a problem buying the blueprint:\n" + req.statusText);
			}
	}else{
		unsafeWindow.GM_log("Epic fail.  Trying again.");
		setTimeout("processReqChange()", 1500);
	}
}

unsafeWindow.buyThem = function(){
	for(var i = 0; i < unsafeWindow.buyThese.length; i++){
		document.getElementById('executeButton').innerHTML = 'Purchasing blueprint ' + (i+1) + ' out of ' + unsafeWindow.buyThese.length + '.';
		unsafeWindow.loadXMLDoc('http://' + window.location.hostname + '/forgotten_knowledge.php?buybp=' + unsafeWindow.buyThese[i]);
	}
	
	setTimeout("location.reload(true);", 2000);
	
	return;
}

unsafeWindow.getPrints = function(){
	for(var i = 0; i < document.getElementsByTagName('select').length; i++){
		for(var j = 1; j < document.getElementsByTagName('select')[i].getElementsByTagName('option').length; j++){
			unsafeWindow.buyThese.splice(unsafeWindow.buyThese.length, 0, document.getElementsByTagName('select')[i].getElementsByTagName('option')[j].value);
		}
	}
	
	for(var i = 0; i < unsafeWindow.buyThese.length; i++){
		GM_log(unsafeWindow.buyThese[i]);
	}
	
	return;
}

unsafeWindow.GM_log = GM_log;
var executeButton = document.createElement('button');
executeButton.innerHTML = 'Download Forgotten Knowledge';
executeButton.setAttribute('id', 'executeButton')
executeButton.setAttribute('style', 'font-size: 11px;border: outset 2px;background-color: #85ACD1;border-color: #8a8;color: black;border-collapse: collapse;');
executeButton.addEventListener('click', unsafeWindow.buyThem, true);
var newTR = document.createElement('tr');
var newTD = document.createElement('td');
newTD.setAttribute('class', 'strong');
newTD.setAttribute('colspan', '6');
newTD.setAttribute('style', 'text-align: center;');
newTD.appendChild(executeButton);
newTR.appendChild(newTD);
unsafeWindow.getPrints();
document.getElementsByTagName('table')[0].appendChild(newTR);