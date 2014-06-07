// ==UserScript==
// @name           DA levelup estimator
// @namespace      http://dragonadopters.com/
// @description    show datetime estimed for next level
// @include        http://*.dragonadopters.com/dragon_*
// @include        http://*.dragonadopters.com/release
// ==/UserScript==

var pourcent, level, growthpourcent;

if (/^http:\/\/.+\.dragonadopters\.com\/release/.test(location.href)) {
	alldragon();
} else {
	singledragon();
}

function levelup(id,level,pourcent,growthpourcent) {
	var tabgrowth = [2,4,6.5,7.5,9.5,10.5,11.5,13,14.5,15,16.5,17,18.5,19.5,20,21,22,23,24,25,26,26,27,28,28,30,30,31,32,33,33,33.5,35,35,36,36.5,37,38.5,38.5,40,41,41,42,42,43,43,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50,51,51,52,52,53,53,54,54,55,55,56,65,65,70,70,70,70,70,70,75,75,75,75,75,75,75,75,80,80,80,80,80,80,85,85,85,85,85,85,90,90,90,90,90,90,90,95,95,95];
	var timelvlup;
	
	if (GM_getValue(id+'level') == level && GM_getValue(id+'pourcentlevel') == pourcent && typeof(GM_getValue(id+'oldtimeFullYear')) == 'number'){
			var year = GM_getValue(id+'oldtimeFullYear');
			var month = GM_getValue(id+'oldtimeMonth');
			var day = GM_getValue(id+'oldtimeDate');
			var hour = GM_getValue(id+'oldtimeHours');
			var minute = GM_getValue(id+'oldtimeMinutes');
			var second = GM_getValue(id+'oldtimeSeconds');
			maintenant = new Date(year,month,day,hour,minute,second);
			now = new Date();
			var timediff = Math.ceil((now-maintenant)/1000/60);
		} else {
			maintenant = new Date;
			GM_setValue(id+'oldtimeFullYear',maintenant.getFullYear());
			GM_setValue(id+'oldtimeMonth',maintenant.getMonth());
			GM_setValue(id+'oldtimeDate',maintenant.getDate());		
			GM_setValue(id+'oldtimeHours',maintenant.getHours());
			GM_setValue(id+'oldtimeMinutes',maintenant.getMinutes());
			GM_setValue(id+'oldtimeSeconds',maintenant.getSeconds());
		}
	GM_log(GM_getValue(id+'level')+':gmgetvalue');
	GM_log('level:'+level);

	if (110>level) {
		timelvlup = (100 - pourcent) * tabgrowth[level] * ((100 - growthpourcent)/100);
		var nbjour = Math.floor(timelvlup / (24*60));
		var reste = timelvlup % (24*60);
		var nbheure = Math.floor(reste / 60);
		var nbmin = Math.ceil(reste %60);
		var tempslvl = '';
		var maintenant;
		
		if (typeof(pourcent) == 'number' && typeof(growthpourcent) == 'number') {
			GM_setValue(id+'pourcentlevel',pourcent);
			GM_setValue(id+'growth',growthpourcent);
		}
		maintenant.setDate(maintenant.getDate()+nbjour);
		maintenant.setHours(maintenant.getHours()+nbheure);
		maintenant.setMinutes(maintenant.getMinutes()+nbmin);
		
		if (typeof(timediff) == 'number') {
			timelvlup = timelvlup - timediff;
			nbjour = Math.floor(timelvlup / (24*60));
			reste = timelvlup % (24*60);
			nbheure = Math.floor(reste / 60);
			nbmin = Math.ceil(reste %60);
		}
		if (timelvlup >= 0) {
		//display time
		if (nbjour > 0) {
			tempslvl = nbjour+' jours ';
		}
		if (nbheure <= 9) {
			nbheure = '0' + nbheure;
		}
		if (nbmin <= 9) {
			nbmin = '0' + nbmin;
		}		
		tempslvl = tempslvl+ nbheure +':'+nbmin;
		} else {
			tempslvl = 'time level up near';
		}
		
		GM_setValue(id+'level',level);
		return(maintenant.toLocaleString()+' ('+tempslvl+')');
	} else {
		GM_setValue(id+'level',level);
		return('no info for lvl:'+level);
	}
	
}

function singledragon() {
	
var Nodes = document.evaluate("//*[@class='dragoninfocontentlong']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (Nodes.snapshotLength == 0) {
	GM_log('error eval nodes');
	return;
}

for (var i = Nodes.snapshotLength - 1; i >= 0; i--) {
	var elmNode = Nodes.snapshotItem(i);
	var stringHTML = elmNode.innerHTML;
	var expreg_id = /(\d{5,})/;
	expreg_id.exec(stringHTML);
	id = parseInt(RegExp.$1);
}

Nodes = document.evaluate('//html/body/div/div/div[7]/div/div[2]/div[21]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = Nodes.snapshotLength - 1; i >= 0; i--) {
	var elmNode = Nodes.snapshotItem(i);
	level = elmNode.innerHTML;
}

var Nodes = document.evaluate('//html/body/div/div/div[7]/div/div[2]/div[25]/div[2]/span',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = Nodes.snapshotLength - 1; i >= 0; i--) {
	var elmNode = Nodes.snapshotItem(i);
	var stringHTML = elmNode.innerHTML;
	var expreg_lvlpourcent = /(\d+)%/;
	expreg_lvlpourcent.exec(stringHTML);
	pourcent = parseInt(RegExp.$1);	
}

Nodes = document.evaluate('//html/body/div/div/div[7]/ul[2]/*',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
growthpourcent = 0;
for (var i = Nodes.snapshotLength - 1; i >= 0; i--) {
	var elmNode = Nodes.snapshotItem(i);
	var stringHTML = elmNode.innerHTML;
	if (stringHTML.indexOf("growing") != -1) {
		var expreg_growth = /(\d+)%/;
		expreg_lvlpourcent.exec(stringHTML);
		growthpourcent = parseInt(growthpourcent) + parseInt(RegExp.$1);
	}
}

if (level != 110 && typeof(pourcent) != 'undefined') {
var timelevel = levelup(id,level,pourcent,growthpourcent);
var Node = document.evaluate('//html/body/div/div/div[7]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var elmNode = Node.snapshotItem(0);
var stringHTML = elmNode.innerHTML;
var HTML = '<div style="width: 100%;" id="level_estimator" class="dragoninfocontent"><div style="background-color: rgb(157, 175, 158); width: '+pourcent+'%;" class="dragonprogressbar">&nbsp;</div><div class="dragonprogresstext"><span class="dragonprogresstextbg">'+timelevel+'</span></div></div><div class="clearleft">		</div>';
 elmNode.innerHTML = stringHTML+HTML;
}
}


function alldragon(){
	Nodes = document.evaluate('//html/body/div/div/div[7]/table/tbody/tr/*',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i <= Nodes.snapshotLength - 1; i++) {
		var elmNode = Nodes.snapshotItem(i);
		var stringHTML = elmNode.innerHTML;
		if ((i % 2) == 0) {
			var regexpid = /dragon_(\d+)/;
			regexpid.exec(stringHTML);
			var id = parseInt(RegExp.$1);
		}else {
			var regexplvlpourcent = /Level: (\d+) \((\d+)%\)/;
			regexplvlpourcent.exec(stringHTML);
			if (regexplvlpourcent.test(stringHTML)) {
				var level = (RegExp.$1);
				var pourcent = (RegExp.$2);
				if (level != 110) {
				var timelevel = levelup(id,level,pourcent,GM_getValue(id+'growth'));
				elmNode.innerHTML = elmNode.innerHTML+timelevel;
				}
			}
		}
	}
}