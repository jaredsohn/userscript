// ==UserScript==
// @name         UserScript_mongolbichig
// @namespace    http://mongolian-it.blogspot.com
// @description  customized layout for the mongolian script book
// @include      http://www.dl.is.ritsumei.ac.jp/*
// @match        http://www.dl.is.ritsumei.ac.jp/*
// ==/UserScript==

var preElement, replText, inText, lines, lnumber, mydiv, mypre, myimg, newlink;

function replacePreElement() {
    preElement = document.getElementsByTagName('pre')[0];

    if (preElement) {
        inText = preElement.innerHTML;
        lines = inText.split("\n");
        lnumber = lines.length - 1;
        mydiv = document.createElement("div");
        mydiv.setAttribute('class','mglbichig');
        mypre = document.createElement("pre");
        replText = "";
        for(i=lnumber; i >= 0; i--){
            replText += lines[i];
            replText += '\n';
        }
        mypre.innerHTML = replText;
        mydiv.appendChild(mypre);
        preElement.parentNode.replaceChild(mydiv, preElement);
    } else {
        GM_log('notfound');
    }
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function replaceImage() {
    imageFive = document.evaluate("//img[@width='500']", document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    myimg = imageFive.snapshotItem(0);
    var newlink = myimg.src.split("_screen.jpeg")[0];
    newlink += ".jpg";
    myimg.src = newlink;
    /* myimg.removeAttribute('width'); */
    myimg.removeAttribute('height');
    myimg.setAttribute('width', 1000);
}

replaceImage();
replacePreElement();
addGlobalStyle('div.mglbichig {-moz-transform: rotate(90deg); -webkit-transform:rotate(90deg); display: block; writing-mode: tb-lr; font-family:MongolianScript; padding:0; clear: both; width:900px !important; height: 900px !important; }');
addGlobalStyle('.table {width: 100%; }');
