// ==UserScript==
// @name          OGame - Stats AutoBrowser
// @namespace     http://userscripts.org/scripts/show/11384
// @description   Browses through stats pages automatically
// @source        http://userscripts.org/scripts/show/11384
// @identifier    http://userscripts.org/scripts/source/11384.user.js
// @version       1.1
// @date          2007-08-16
// @include http://uni*.ogame*
// @include http://s*.ogame.onet.pl*
// @include http://uni*.o-game.co.kr*
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function checker(vartitle, vardefault){
	var temp = GM_getValue(vartitle);
	if (temp == undefined){ 
		return vardefault;
	} else {
		return temp;
	}
}

function chooseandgo(){
    var sele = xpath("//select[@name='start']").snapshotItem(0);
    var val = sele.selectedIndex;
    if(val == (sele.length-1)){val = -1;}
    sele.options[(val+1)].selected = true;
    var t = setTimeout('document.forms[0].submit()',3000);
}

function loopselect(){
    if(document.getElementById('seleloop').value == "0"){
    GM_setValue(document.getElementById('univar').value,"1");
    var govar = true;
    }else{
    GM_setValue(document.getElementById('univar').value,"0");
    var govar = false;
    }
    if(govar){chooseandgo();}
}

if(document.location.href.indexOf("index.php?page=stat") != -1){
    var ogtitle = window.location.href;
    var ogserver = /http\:\/\/([\-\.0-9a-zA-Z]+)\//.exec(ogtitle);
    if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }

    var loopwhere = checker((ogserver+"seleloop"),"0");
    if(loopwhere == "0"){var butstr = "START"} else {var butstr = "STOP";}
    var butzone = xpath("//select/parent::th/parent::tr/parent::tbody/parent::table").snapshotItem(0);
    var buttb = document.createElement('table');
        buttb.innerHTML = "<tr><th><input type='hidden' id='univar' value='"+ogserver+"seleloop'><input type='hidden' id='seleloop' value='"+loopwhere+"'><input type='button' id='gobut' value='"+butstr+"'></th></tr>";
        butzone.parentNode.insertBefore(buttb, butzone);
    document.getElementById("gobut").addEventListener("click", loopselect, false);

    if(loopwhere == "1"){chooseandgo();}
}
