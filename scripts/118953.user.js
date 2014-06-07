// ==UserScript==
// @name           oneclickmoviez clicksor enhacment
// @namespace      http://ilija.neopsindle.com/
// @description    skip all boring stuff on oneclickmoviez.com
// @include        http://oneclickmoviez.com/*
// ==/UserScript==

    var scriptCode = new Array();
    scriptCode.push('clicksor_enable_pop = false;');
    scriptCode.push('document.getElementById('topbar').style.display == 'none';');
    scriptCode.push('clicksor_layer_banner = false;);
    var script = document.createElement('script');    
    script.innerHTML = scriptCode.join('\n');         
    scriptCode.length = 0;                            
    document.getElementsByTagName('head')[0].appendChild(script);
 