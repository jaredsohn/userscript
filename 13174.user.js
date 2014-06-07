// ==UserScript==
// @name        Gmail Counter
// @namespace	http://gmail.1o4.jp/
// @description Gmail's storage counter for free account.
// @include     http*://mail.google.com/*
// @version     1.0
// ==/UserScript==

window.addEventListener("load", function(e) {
addCounter();
getQuota();
function addCounter() {
	var sf = document.getElementById('s');
	if (sf) {
		var q = sf.elements[0];
		var ele = document.createElement('div');
		ele.id = "strageID"; 
		ele.innerHTML = "Gmail Counter"; 
		ele.style.color = '#006633';
		ele.style.fontFamily = 'sans-serif';
		ele.style.fontWeight= 'bold';
		ele.style.fontSize= '75%';
		sf.parentNode.insertBefore(ele, sf.nextSibling);
	}
}
function getQuota() {
   var CP = [
    [ 1112331600000, 1025 ],
    [ 1112439600000, 2050 ],
    [ 1113062400000, 2075 ],
    [ 1113685200000, 2100 ],
    [ 1114308000000, 2125 ],
    [ 1114930800000, 2150 ],
    [ 1117609200000, 2250 ],
    [ 1120201200000, 2350 ],
    [ 1122879600000, 2450 ],
    [ 1125558000000, 2550 ],
    [ 1128150000000, 2650 ],
    [ 1136102400000, 2680 ],
    [ 1149145200000, 2730 ],
    [ 1167638400000, 2800 ],
    [ 1175414400000, 2835 ],
    [ 1192176000000, 2912 ],
    [ 1193122800000, 4321 ],
    [ 1199433600000, 6283 ],
    [ 2147328000000, 43008 ],
   ];
   var now = (new Date()).getTime();
   var i;
   for (i = 0; i < CP.length; i++) {
     if (now < CP[i][0]) break;
   }
   if (i == 0) {
     setTimeout(getQuota, 1000);
   } else if (i == CP.length) {
     document.getElementById("container").innerHTML= CP[i - 1][1]+"GB";
   } else {
     var ts = CP[i - 1][0];
     var bs = CP[i - 1][1];
     var g_rate=(CP[i][1]-bs)/(CP[i][0]-ts);
     var st = ((now-ts) * g_rate) + bs;
     var stm = (st).toFixed(5);
     var stg = (st/1024).toFixed(1);
     document.getElementById("strageID").innerHTML=stm + ' MB (' + stg + 'GB)';
     setTimeout(getQuota, 1000);
   }
 }

}, false);