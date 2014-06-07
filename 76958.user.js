// EX.UA Play video on your MPC
// version 0.5 BETA!
// 2010−05−17
// Copyleft
// Released under the GPL license
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          EX-Player
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Play vidoe in external video player MPC
// @include       http://www.ex.ua/view/*
// ==/UserScript==

//new style insert
var exStyle = document.evaluate("/html/body", document, null, XPathResult.ANY_TYPE, null);
var pathtoput = exStyle.iterateNext(); 
var myStyle = document.createElement('STYLE');
myStyle.innerHTML = '.bigf{font-size:20px} .explayerstyle{-moz-border-end-color:#999999;-moz-border-radius:10px 10px 10px 10px;-moz-border-start:medium none #CCCCCC;-moz-box-shadow:0 0 14px #EFEFEF;background-color:#EFEFEF;border:1px solid #CCCCCC;padding:1em;}';
pathtoput.appendChild(myStyle);

//search flv files
var flv = document.getElementsByTagName('script');
for(var i=0; i<flv.length; i++){

    if(flv[i].text.indexOf('.flv') != -1){

        var txtfg = flv[i].innerHTML;
        var myRe = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?.flv", "gi");
        var findArray = txtfg.match(myRe);

        if(findArray.length == 1){
            var findPlace = document.evaluate("/html/body/table/tbody/tr[2]/td/p[3]", document, null, XPathResult.ANY_TYPE, null);
            var thisPlace = findPlace.iterateNext(); 
            var exPlayerStyle = document.createAttribute("class");
            exPlayerStyle.nodeValue = "explayerstyle";
            
            var newEl = document.createElement('DIV');
            newEl.setAttributeNode(exPlayerStyle);
            newEl.innerHTML = '<b class="bigf">Ссылка на фильм:</b><br/>' + findArray;
            thisPlace.appendChild(newEl);

        }

    }

}