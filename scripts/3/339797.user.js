// ==UserScript==
// @name          Pretty Hudson Cucumber
// @namespace     http://userscripts.org/users/566356
// @description   Correctly display the ANSI color codes in cucumber console output on Hudson
// @version       0.3
// @include       */hudson/*
// ==/UserScript==

if(document.getElementById('spinner') == null){

    var bod = document.getElementById('main-panel').innerHTML;
    var fixed = bod;

    fixed = fixed.replace(/\[1m(.*?)\[0m/g, '<strong>$1</strong>');
    fixed = fixed.replace(/\[32m(.*?)\[0m/g, '<span style="color:green">$1</span>');
    fixed = fixed.replace(/\[90m(.*?)\[0m/g, '<span style="color:grey">$1</span>');
    fixed = fixed.replace(/\[36m(.*?)\[0m/g, '<span style="color:purple">$1</span>');
    fixed = fixed.replace(/\[31m(.*?)\[0m/g, '<span style="font-weight: bold;color:red">$1</span>');
    fixed = fixed.replace(/\[33m(.*?)\[0m/g, '<span style="color:orange">$1</span>');
    fixed = fixed.replace(/\[31m|\[32m|\[36m/g, '');
    fixed = fixed.replace(/(\[WARNING\])|(\[ERROR\])/g, '<span style="color:red">$1$2</span>');
    fixed = fixed.replace(/(Finished\: FAILURE)/g, '<h1 style="color:red">$1</h1>');
    fixed = fixed.replace(/(Finished\: SUCCESS)/g, '<h1 style="color:green">$1</h1>');
    
    fixed = fixed.replace(/# (features\/stories\/.*:\d+)/g,'<a id="$1">$1</a>');
    fixed = fixed.replace(/cucumber (features\/stories\/.*?\:\d+)(.*) /g,'cucumber <a href="#$1" style="color:red;">$1</a>$2');
    
    document.getElementById('main-panel').innerHTML = fixed;
    
}
