// ==UserScript==
// @name           twilog date linker
// @namespace      http://efcl.info/
// @include        http://twilog.org/*
// ==/UserScript==

var dateDiv = document.getElementsByClassName("bar-main2");
var userName = document.getElementById("user-id").value;
var Reg = /\d{2}(\d{2})年(\d+)月(\d+)日/; 
var m;
var tempURL = "http://twilog.org/"+ userName +"/date-";
for (var i=0,l= dateDiv.length;i < l; i++) {
     m = dateDiv[i].textContent.match(Reg);
    (function(){
        var aTag = document.createElement("a");
        aTag.href = tempURL + m[1]+m[2]+m[3];
        var imgTag = document.createElement("img");
        imgTag.src = "http://twilog.org/image-dir/tl.png";
        aTag.appendChild(imgTag);
        dateDiv[i].appendChild(aTag);   
    })();
}

