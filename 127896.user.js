// ==UserScript==
// @name       Amazon Mobilism Linker
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @include    http://www.amazon.com/*
// @copyright  2011+, You
// ==/UserScript==

function addCSS(css)
{
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
}

function gotoMobilism() {
    document.location.href = "http://forum.mobilism.org/search.php?keywords="+ bookTitle +" "+ bookAuthor +"&fid%5B%5D=0&sc=1&sr=topics&sf=titleonly";
}

var bookInfo = document.getElementsByClassName("buying");
var bookInfoRegex = /[\w\s]*parseasinTitle[\w\s]*/g;

bookInfo = bookInfoRegex.test(bookInfo[1].childNodes[1].className)? bookInfo[1] : bookInfo[2];

var bookTitlePattern = /^[a-z0-9\&\w\s]+/ig;
//var bookTitle = bookTitlePattern.exec(bookInfo.innerHTML);
var bookTitle = bookTitlePattern.exec(bookInfo.childNodes[1].childNodes[1].innerHTML);

var bookAuthorPattern = /^[a-z]+/ig;
var bookAuthor = (bookInfo.childNodes[3].childNodes[1].nodeName == "A")? bookInfo.childNodes[3].childNodes[1].innerHTML : bookInfo.childNodes[3].childNodes[1].childNodes[0].innerHTML;

var jumpBar = document.getElementsByClassName("jumpBar");

var css = "img.mobilismSearchButton {\
height: 16px;\
cursor: pointer;\
}";

addCSS(css);

var mobilismSearchButton = document.createElement("img");
mobilismSearchButton.setAttribute("src","http://a0.twimg.com/profile_images/1673543016/mobilism-icon_mini.png");
mobilismSearchButton.className = "mobilismSearchButton";
mobilismSearchButton.addEventListener("click", gotoMobilism, false);
mobilismSearchButton.setAttribute("title","Search Mobilism");
jumpBar[0].appendChild(mobilismSearchButton);