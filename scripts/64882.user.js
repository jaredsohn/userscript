// ==UserScript==
// @name           increase area
// @namespace      geasslei
// @description    increase your read area
// @include        https://www.google.com/reader/*
// @include        http://www.google.com/reader/*
// ==/UserScript==

//全局增加css样式
function addGlobalStyle(css){
    var head,style;
    head = document.getElementsByTagName('head')[0];
    if (!head) return ;
    style = document.createElement('style');
    style.type='text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function addScript(javascript){
    var head,script;
    head = document.getElementsByTagName('head')[0];
    if (!head) return ;
    script = document.createElement('script');
    script.type = "text/javascript";
    script.innerHTML = javascript;
    head.appendChild(script);
}
var hiddenA = document.createElement("a");
hiddenA.id="hiddenA";
hiddenA.href="javascript:hidden();";
hiddenA.innerHTML="hidden";
hiddenA.className="ml20";
var showA = document.createElement("a");
showA.id="showA";
showA.href="javascript:show();";
showA.innerHTML="show";
showA.className="ml20 hidden";
var ab = document.getElementById('lhn-add-subscription-section');
ab.appendChild(hiddenA);
ab.appendChild(showA);
addScript(""
        +"function hidden(){var gbar = document.getElementById('gbar'); gbar.className='hidden';var main = document.getElementById('main'); var search = document.getElementById('search');  main.style.top='0px';main.style.marginTop='0px'; search.className='hidden'; var hiddenA = document.getElementById('hiddenA');var showA = document.getElementById('showA'); hiddenA.className='hidden';showA.className='ml20';}"
        +"function show(){var gbar = document.getElementById('gbar'); gbar.className='';var main = document.getElementById('main'); var search = document.getElementById('search'); main.style.top='65px'; search.className='';var hiddenA = document.getElementById('hiddenA');var showA = document.getElementById('showA'); hiddenA.className='ml20'; showA.className='hidden';}"
        +"hidden();"
        +"");

addGlobalStyle(""
        +".hidden {display:hidden}"
        +".ml20 {margin-left:20px;}"
        +".t0{top:0px;}"
        +"#hiddenA,#showA {text-decoration:none;}"
        +"");



