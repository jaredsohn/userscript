// ==UserScript==
// @name        Normle (Google Normalizer)
// @namespace   *
// @include     *
// @exclude     http://maps.google.*
// @exclude     https://maps.google.*
// @version     1.1.1
// ==/UserScript==

window.onload=function(){
var a=window.location.href;
var rwt=""; var xe;
var regg1 = /https?\:\/\/(www.)?google.(de|com|at|pl|fr|nl|it|com.tr|es|ch|be|com.br|gr|lu|fi|pt|hu|hr|bg|com.mx|si|sk|ro|ca|co.uk|cl|com.ar|se|cz|dk|co.th|com.co|lt|co.id|co.in|co.il|com.eg|cn|co.ve|ru|co.jp|com.pe|com.au|co.ma|co.za|com.ph|com.sa|ie|co.kr|no|com.ec|com.vn|lv|com.mt|com.uy|ae|ba|co.nz|com.ua|com.do|com.tw|com.hk|com.my|com.sv|com.pr|lk|com.gt|com.bd|is|li|com.bh|com.ni|com.py|com.ng|com.bo|co.ke|hn|com.sg|mu|ci|jo|nu|com.jm|com.ly|co.yu|tt|com.kh|ge|com.na|com.et|sm|cd|gm|com.qa|dj|com.cu|com.pa|gp|az|as|pl|mn|ht|md|am|sn|je|com.bn|com.ai|co.zm|ma|rw|co.ug|com.vc|at|com.gi|to|com.om|kz|co.uz)\/search*/;
if(regg1.test(a)){
	rwt = document.createElement('script'); 
	rwt.type = "text/javascript"; 
	rwt.innerHTML = "rwt = function(a,b,c,d,e,f,g,h,i,j){return false;};";
	document.getElementsByTagName('head')[0].appendChild(rwt);
}
}