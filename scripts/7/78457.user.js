// ==UserScript==
// @name         Clean Google
// @version      1.0
// @description  Full description @ http://code.eyecatch-up.de/clean-google/
// 
// Want to have a pure result listing when using Google? 
// 
// This script: 
//      -   cleans the frontpage so you have only the search box and buttons
//      -   sets the visibility of the top and the right ad block on all Google
//          result pages to 'hidden' so you don't see any ads 
//      -   removes shopping results
//      -   removes left control panel
//      -   removes top panel
//      -   gives more structure to the result lists by using background-color     
//
// That way you can use a "clean" Google - Just displays the organic results. 
// Works on all TLDs.
// 
// Enjoy your pure Google-experience!
// 
// @author       Stephan Schmitz - code.eyecatch-up.de 
// @namespace    http://userscripts.org/scripts/show/78457 
// @include      http*://*google.*
// ==/UserScript== 

function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function Clean_Google() {

    var g_head = document.getElementById('ghead');
    if (g_head && g_head.style.visibility != 'hidden') {
        g_head.style.visibility = 'hidden';
    }    
    
    var g_user = document.getElementById('guser');
    if (g_user && g_user.style.visibility != 'hidden') {
        g_user.style.visibility = 'hidden';
    }

    var g_user = document.getElementById('guser');
    if (g_user && g_user.style.visibility != 'hidden') {
        g_user.style.visibility = 'hidden';
    }

    var g_bar = document.getElementById('gbar');
    if (g_bar && g_bar.style.visibility != 'hidden') {
        g_bar.style.visibility = 'hidden';
        g_bar.style.height = '0px';
    }    

    var top_ads = document.getElementById('tads');
    if (top_ads && top_ads.style.display != 'none') {
        top_ads.style.display = 'none';
    }

    var fll = document.getElementById('fll');
    if (fll && fll.style.visibility != 'hidden') {
        fll.style.visibility = 'hidden';
    }

    var sbl = document.getElementById('sbl');
    if (sbl && sbl.style.visibility != 'hidden') {
        sbl.style.visibility = 'hidden';
    }    

    var rhs = document.getElementById('rhs');
    if (rhs && rhs.style.display != 'none') {
        rhs.style.display = 'none';
    }    

    var prc = document.getElementById('footer');
    if (prc && prc.style.display != 'none') {
        prc.style.display = 'none';
    }
    
    var cpNavTextWrapper = document.getElementById('cpNavTextWrapper');
    if (cpNavTextWrapper && cpNavTextWrapper.style.display != 'none') {
        cpNavTextWrapper.style.display = 'none';
    }
    
    var leftnavc = document.getElementById('leftnavc');
    if (leftnavc && leftnavc.style.display != 'none') {
        leftnavc.style.display = 'none';
    }

    var leftnav = document.getElementById('leftnav');
    if (leftnav && leftnav.style.display != 'none') {
        leftnav.style.display = 'none';
    }

    var brs = document.getElementById('brs');
    if (brs && leftnav.style.display != 'none') {
        brs.style.display = 'none';
    }
        
    var shopping_results = document.getElementById('productbox');
    if (shopping_results && shopping_results.style.visibility != 'hidden') {
        shopping_results.style.height = '1px';
        shopping_results.style.visibility = 'hidden';
    }

    var gbh = getElementsByClass('gbh');
    for ( i=0;i<gbh.length;i++ ) {
    gbh[i].style.borderTop = '0px solid #fff'
    }

    var gb = getElementsByClass('g');
    for ( i=0;i<gb.length;i++ ) {
    gb[i].style.backgroundColor = '#E5ECF9';
    gb[i].style.padding = '5px';
    }    

    var cnt = document.getElementById('cnt');
        cnt.style.marginTop = '-70px';
        cnt.style.paddingTop = '0px';
    
    var center_col = document.getElementById('center_col');
        center_col.style.marginLeft = '0px';
        center_col.style.marginRight = '0px';
        center_col.style.width = '100%';
    
    var res = document.getElementById('res');
        res.style.width = '100%'

    var search = document.getElementById('search');
        search.style.width = '100%'
        
}

document.addEventListener("DOMNodeInserted", Clean_Google, true);