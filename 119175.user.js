// ==UserScript==
// @name             FontFix [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      Увеличивает размер шрифта с 8px до 9px.
// @include          http://www.ganjawars.ru/*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

function getStyle(elem, prop) {
    
    if (typeof elem!="object") elem = document.getElementById(elem);
  
    // external stylesheet for Mozilla, Opera 7+ and Safari 1.3+
    if (document.defaultView && document.defaultView.getComputedStyle) {
        
        if (prop.match(/[A-Z]/)) prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
        
        return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
        
    }
  
    // external stylesheet for Explorer and Opera 9
    if (elem.currentStyle) {
        
        var i;
        while ((i=prop.indexOf("-"))!=-1) prop = prop.substr(0, i) + prop.substr(i+1,1).toUpperCase() + prop.substr(i+2);
        return elem.currentStyle[prop];
        
    }
  
    return "";
    
}

// font
var font = root.document.getElementsByTagName('font');
for (var i = 0, l = font.length; i < l; i++) {
    
    if (getStyle(font[i], 'font-size') == '8px') {
        
        font[i].style.fontSize = '9px';
        
    }
    
}

// td
var td = root.document.getElementsByTagName('td');
for (var i = 0, l = td.length; i < l; i++) {
    
    if (getStyle(td[i], 'font-size') == '8px') {
        
        td[i].style.fontSize = '9px';
        
    }
    
}

})();