// ==UserScript==
// @name           fix facebook
// @description    removes what i dont like
// 
// @author         jim - 
// @include        http://www.facebook.com/*
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

function Clean_FB() {
    
    var suggestions = document.getElementById('pagelet_pymkbox');
    if (suggestions && suggestions.style.visibility != 'hidden') { 
        suggestions.style.visibility = 'hidden';  
    }

       
    var pagelet_connectbox = document.getElementById('pagelet_connectbox');
    if (pagelet_connectbox && pagelet_connectbox.style.visibility != 'hidden') { 
    pagelet_connectbox.style.visibility = 'hidden';  
    }

    var pagelet_adbox = document.getElementById('pagelet_adbox');
    if (pagelet_adbox && pagelet_adbox.style.visibility != 'hidden') { 
    pagelet_adbox.style.visibility = 'hidden';  
    }

    var pagelet_netego = document.getElementById('pagelet_netego');
    if (pagelet_netego && pagelet_netego.style.visibility != 'hidden') { 
    pagelet_netego.style.visibility = 'hidden';  
    }

    var pagelet_ads = document.getElementById('pagelet_ads');
    if (pagelet_ads && pagelet_ads.style.visibility != 'hidden') { 
    pagelet_ads.style.visibility = 'hidden';  
    }

    var pagelet_betabox = document.getElementById('pagelet_betabox');
    if (pagelet_betabox && pagelet_betabox.style.visibility != 'hidden') { 
    pagelet_betabox.style.visibility = 'hidden';  
    }    

    var pagelet_reqbox = document.getElementById('pagelet_reqbox');
    if (pagelet_reqbox && pagelet_reqbox.style.visibility != 'hidden') { 
    pagelet_reqbox.style.visibility = 'hidden';  
    } 
    
    var sidebar_ads = document.getElementById('sidebar_ads');
    if (sidebar_ads && sidebar_ads.style.visibility != 'hidden') { 
    sidebar_ads.style.visibility = 'hidden';  
    }

    var sidebar_ads_groups = document.getElementById('ego');
    if (sidebar_ads_groups && sidebar_ads_groups.style.visibility != 'hidden') { 
        sidebar_ads_groups.style.visibility = 'hidden';  
    }
    
    var reqs_sug = getElementsByClass('mbl PYMK_Reqs_Sidebar');
    for ( i=0;i<reqs_sug.length;i++ ) {
    reqs_sug[i].style.visibility = 'hidden';
    }
    
    var ego_column = getElementsByClass('ego_column');
    for ( i=0;i<ego_column.length;i++ ) {
    ego_column[i].style.visibility = 'hidden';
    }
    



}

document.addEventListener("DOMNodeInserted", Clean_FB, true);