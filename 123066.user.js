// ==UserScript==
// @name           Eksperten BB-Code Editor
// @version		   1.2
// @namespace      http://www.eksperten.dk/guide/1450
// @description    BB-Code Editor for Eksperten.dk
// @include        http://www.eksperten.dk/*
// ==/UserScript==


(function(){ // ExpBBEdit 1.2
  // Hvis vi er på en spørgsmålsside
    var elmTxt = document.getElementById("newreplytext");
  // Hvis vi er på en guideside
    if (!elmTxt) elmTxt = document.getElementById("text");
  // Hvis vi er på en internpostside
    if (!elmTxt) elmTxt = document.getElementsByName("message")[0];
  // Hvis vi er på en Opret Spørgsmålsside
    if (!elmTxt) elmTxt = document.getElementById("newquestiontext");
  // Hvis vi er på en anden side, stopper festen her!
    if (!elmTxt) return;
    
    var aBtns = [
        ["B", "Bold (Ctrl+B)", "b"],
        ["I", "Italic (Ctrl+I)", "i"],
        ["@", "@UserName: (Ctrl+A)", "@"],
        ["BOX", "Blue Box (Ctrl+D)", "div"],
        ["PRE", "Preform/Monosp\nText (Ctrl+M)", "pre"],
        ["URL", "URL (Ctrl+U)", "url"],
        ["FNT", "Font (Ctrl+F)", "font"],
        ["SIZ", "Font Size (Ctrl+S)", "size"],
        ["COL", "Color/Hue (Ctrl+H)", "color"]
    ];
    var oCSS = {
        bar: {
            height: "28px",
            background: "#cbcbcb",
            cursor: "default"
        },
        btn: {
            cssFloat: "left",
            float: "left",
            width: "35px",
            height: "16px",
            marginLeft: "5px",
            paddingTop: "5px",
            border: "1px solid #999",
            borderBottomColor: "#888",
            background: "#01bce0 url('/images/button_w86.gif') no-repeat center center",
            color: "#fff",
            font: "bold 11px arial, sans-serif",
            textAlign: "center"
        }
    };
    function insertButton(elmPar, aOpts) {
        var elmBtn = document.createElement("div"),
        css = elmBtn.style;
        elmPar.appendChild(elmBtn);
        elmBtn.appendChild(document.createTextNode(aOpts[0]));
        elmBtn.setAttribute("title", aOpts[1]);
        for (x in oCSS.btn) css[x] = oCSS.btn[x];
        if (aOpts[0].length<3) css.width = "24px";
        if (elmBtn.addEventListener) elmBtn.addEventListener("mousedown", function(){ExpBBEdit.format(aOpts[2])}, false);
        else if (elmBtn.attachEvent) elmBtn.attachEvent("onmousedown", function(){ExpBBEdit.format(aOpts[2])});
    };
    function insertBar() {
        var elmBar = document.createElement("div"),
        css = elmBar.style, x;
        for (x in oCSS.bar) css[x] = oCSS.bar[x];
        elmTxt.parentNode.insertBefore(elmBar, elmTxt);
        return elmBar;
    };

    var elmBar = insertBar();
    for (var i=0,j=aBtns.length; i<j; i++) insertButton(elmBar, aBtns[ i]);
    //elmTxt.focus();

/*******************************************************************************/

    function format(sTag) {
        var bAT = false;
        if (sTag=="@") {
            sTag = "b";
            bAT = true;
        }
        var val = elmTxt.value, nS = elmTxt.selectionStart,
        nE = elmTxt.selectionEnd;
        if (val.charAt(nE-1)==" ") nE--;
        var a = val.substr(0, nS),
        b = val.substring(nS, nE),
        c = val.substring(nE),
        sSTag = (bAT ? "@" : "") + "[" + sTag + ((/font|color|url|size/.test(sTag)) ? "=]" : "]"),
        sETag = "[/" + sTag + "]" + (bAT ? ":" : ""),
        nSLen = sSTag.length,
        nELen = sETag.length, n;
        elmTxt.value = a + sSTag + b + sETag + c;
        if (nE-nS<1) {
            n = sSTag.indexOf("=")<0 ? nS+nSLen : nS+nSLen-1;
            elmTxt.selectionStart = n;
            elmTxt.selectionEnd = n;
        } else {
            n = sSTag.indexOf("=")<0 ? nE+nSLen+nELen : nS+nSLen-1;
            elmTxt.selectionStart = n;
            elmTxt.selectionEnd = n;
        }
        setTimeout("ExpBBEdit.focus()", 1);
    };
    
    function formatFromKey(e) {
        e = e ? e : event;
        if (!e.ctrlKey) return;
        switch (e.keyCode) {
            case 65: format("@"); break
            case 66: format("b"); break
            case 68: format("div"); break
            case 70: format("font"); break
            case 72: format("color"); break
            case 73: format("i"); break
            case 77: format("pre"); break
            case 83: format("size"); break
            case 85: format("url"); break
            default: return;
        }
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
    };
    
    function doFocus() {
        elmTxt.focus();
    };
    
    window.ExpBBEdit = {
        "format": format,
        "formatFromKey": formatFromKey,
        "focus": doFocus
    };
    
    if (elmTxt.addEventListener) elmTxt.addEventListener("keydown", ExpBBEdit.formatFromKey, false);
    else if (elmTxt.attachEvent) elmTxt.attachEvent("onkeydown", ExpBBEdit.formatFromKey, false);
})();