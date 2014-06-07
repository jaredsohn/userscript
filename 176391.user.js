// ==UserScript==
// @name  Audiotica.FM Not Found CSS
// @version  0.1
// @description  Stylise the 404 page on Audiotica.FM
// @match  *://*.audiotica.fm/song/download/*
// @author  celliott1997
// ==/UserScript==

function makePage(){
    var cssStr = "\
div#notFound{width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 100;background: rgb(65, 64, 64);color: rgb(200, 200, 200);font-family: arial;font-size: 16px;cursor: default;white-space:nowrap;}\
.subTxt{font-size:12px;color:rgb(150, 150, 150);font-weight:bold;position:absolute;}\
div#notFound img{position: absolute;top: 290px;left: 100px;width: 622px;height: 84px;}\
div#notFound a#notice{position: absolute;left: 100px;top: 380px;}\
body{overflow:hidden;}\
    ";
    var newCss = document.createElement("style");
    newCss.innerHTML = cssStr;
    document.body.appendChild(newCss);
    
    var div1 = document.createElement("div");
    div1.setAttribute("id", "notFound");
    var img1 = document.createElement("img");
    img1.setAttribute("src", "http://audiotica.fm/Images/audiotica.fm-logo.png");
    div1.appendChild(img1);
    var a1 = document.createElement("a");
    a1.setAttribute("id", "notice");
    a1.innerHTML = "File was removed due to DMCA Policy.";
    div1.appendChild(a1);
    var a2 = document.createElement("a");
    a2.setAttribute("class", "subTxt");
    a2.setAttribute("style", "cursor:pointer;top:400px;left:100px;");
    a2.innerHTML = "◄ Go Back";
    a2.setAttribute("onclick", "history.back();");
    div1.appendChild(a2);
    var a3 = document.createElement("a");
    a3.setAttribute("class", "subTxt");
    a3.setAttribute("style", "right:10px;bottom:10px;");
    a3.innerHTML = "- celliott1997";
    div1.appendChild(a3);
    document.body.appendChild(div1);
    
    document.body.setAttribute("onselectstart", "return false;");
    document.body.setAttribute("oncontextmenu", "return false;");
};

function isInvalid(){
    var find1 = "Server Error";
    var find2 = "404 - File or directory not found.";
    var html = document.body.innerHTML;
    
    if (html.indexOf(find1) >= 0 && html.indexOf(find2)){
        makePage();
    };
};

setTimeout(isInvalid(), 100);