// ==UserScript==
// @name           disc
// @namespace      /home/srinivasy/disc
// @include        http://nagfans.com/forum/showthread.php?t=27670&page=35
// ==/UserScript==
cntr=0;
/*for(cntr=0;cntr<50000;cntr++){
setTimeout(doSomething,5000);
}*/
NFDBRigg = self.setInterval(doSomething, 7000);
/*self.setInterval('clock()', 10000);
function clock() {
    alert("hello");
}*/
//doSomething();
//alert("this");
//alert(unsafeWindow.PHP);
uw=unsafeWindow;
//alert("that");//
ph=uw.PHP;

function doSomething(){
try{
var dt=new Date(); 
var datestr=dt.getDate()+":"+dt.getMonth()+":"+dt.getFullYear()+":"+dt.getSeconds()+":"+dt.getUTCMilliseconds(); 
if(document.getElementById("vB_Editor_QR_textarea"))
{ 
	document.getElementById("vB_Editor_QR_textarea").value="[hbd2]\n[COLOR=\"#FFFFFF\"]"+datestr+"[/COLOR]"; 
} 
var D= document.getElementById("quick_reply"); 
var E="ajax=1"; 
if(typeof ajax_last_post!="undefined"){
	E+="&ajax_lastpost="+ph.urlencode(ajax_last_post)
}

for(var C=0;C<D.elements.length;C++){var F=D.elements[C];if(F.name&&!F.disabled){switch(F.type){case"text":case"textarea":case"hidden":E+="&"+F.name+"="+ph.urlencode(F.value);break;case"checkbox":case"radio":E+=F.checked?"&"+F.name+"="+ph.urlencode(F.value):"";break;case"select-one":E+="&"+F.name+"="+ph.urlencode(F.options[F.selectedIndex].value);break;case"select-multiple":for(var B=0;B<F.options.length;B++){E+=(F.options[B].selected?"&"+F.name+"="+ph.urlencode(F.options[B].value):"")}break}}} 

uw.fetch_object("qr_posting_msg").style.display=""; document.body.style.cursor="wait"; uw.qr_ajax_post(D.action,E);
cntr++;
if(cntr>5000){
clearInterval(NFDBRigg);
}
console.log(cntr);
}
catch(e){console.log(e.message);}
//alert("hello");
//clearInterval(NFDBRigg);
}

/*
function callme(){
alert("hello");
}
callme();
self.setInterval(callme, 5000);*/

