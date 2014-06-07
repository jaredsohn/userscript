// ==UserScript==
// @name          Webmaster-Tools Link für google.de
// @description   Auf google.de finde ich keinen Direktlink zu den Webmaster-Tools mehr. Schade. Da hilft dieses Script!
// @version 1.1
// @uso:version 1.1
// @include      https://*google.de/*
// @include      http://*google.de/*
// @include      https://*google.com/*
// @include      http://*google.com/*
// ==/UserScript==
var set=0;

a();

function a(){
    
    if (set!=0) return;
    
    var elem = document.createElement("li");
    elem.className = "gbt";
    elem.innerHTML = '<a class="gbzt" id="gb_78" href="https://www.google.com/webmasters/tools/home?hl=de"><span class="gbtb2"></span><span class="gbts">Webmaster Tools</span></a>';
    if (document.getElementById("gbzc")){
    	document.getElementById("gbzc").appendChild(elem);
        set=1;
    }
    else
    	window.setTimeout(a,1000);
    
}