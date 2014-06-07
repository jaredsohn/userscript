// ==UserScript==
// @name       Primewire.ag Ad Removal
// @namespace  http://www.primewire.ag/
// @version    0.2
// @description  Removes thr righthand most advertisement column from the priewire.a homepage
// @match      http*://www.primewire.ag/*
// @copyright  2012+, Janga
// ==/UserScript==

try{  
document.getElementsByClassName('col2')[0].remove()
}catch(ex){
}

