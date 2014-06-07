// ==UserScript==
// @name       Test LocalStorage
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://std-acct.kku.ac.th/gappsauthen/login.php
// @copyright  2012+, You
// ==/UserScript==

var test1 = 0;
var max1 = 5;

test1 = localStorage.getItem('test1');
//alert("load test1: " + test1);

if (test1 == null){
    test1 = 0;
    localStorage.setItem('test1',test1);  
    alert("Count " + test1);
    window.location.reload();
}else if (test1 == 0){
    alert("Count " + test1);
    test1++;
    localStorage.setItem('test1',test1);
    window.location.reload();
    
}else if (test1 > 0 && test1 < max1){
    alert("Count " + test1);
    test1++;
    localStorage.setItem('test1',test1);
    window.location.reload();
}else if (test1 == max1){
    test1 = 0;
    localStorage.setItem('test1',test1);
    alert("Count 5 >> Max to Zero");
}else {
    alert("It's Over");
}
