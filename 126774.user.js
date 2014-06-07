// ==UserScript==
// @name         Google Remove Junk Lite
// @version	0.3.4
// @namespace http://userscripts.org/scripts/show/126774 
// @description Remove prefetch, sponsors and link tracking from Google search.
// @include	http://www.google.tld/*
// @include	https://www.google.tld/*
// @include	http://groups.google.tld/*
// @include	https://groups.google.tld/*
// ==/UserScript==

var $grjl = {
    
    i : 0,
    
    interval : null,
    
    init : function() {
        $grjl.start();
        setTimeout(function() {
            $grjl.start();
            $grjl.interval = setInterval(function() {
                $grjl.i++;
                $grjl.RemoveLinkTracking();
                if ($grjl.i > 10) {
                    clearInterval($grjl.interval);
                }
            }, 1000);
        }, 2000);
    },
    
    start : function() {
        $grjl.removeNoScriptTags();
        $grjl.RemovePrefetch();
        $grjl.RemoveSponsors();
        $grjl.RemoveLinkTracking();
    },
    
    qs : function(Query_String_Name,url) {
        var i, pos, argname, argvalue, queryString, pairs;
        if(!url){url = location.href}
        queryString = url.substring(url.indexOf("?")+1);
        pairs = queryString.split("&");
        for (i = 0; i < pairs.length; i++) { 
            pos = pairs[i].indexOf('='); 
            if (pos == -1) {
                continue; 
            }
            argname = pairs[i].substring(0,pos);
            argvalue = pairs[i].substring(pos+1); 
            if (argname == Query_String_Name) {
                // return unescape(argvalue.replace(/\+/g, " "));
                return argvalue;
            }
        }
        return false;
    },
    
    removeNoScriptTags : function(){
        var noScriptTags = document.getElementsByTagName('noscript');
        for (var x = 0, y = noScriptTags.length; x < y; x++) {
            var el = noScriptTags[x];
            el.innerHTML = '';
        }
    },
    
    RemoveSponsors : function(){
        var mbEnd = $('mbEnd') ;  
        if (mbEnd){
            mbEnd.parentNode.removeChild(mbEnd) ; 
        }
        var tads = $('tads');
        if(tads){
            tads.parentNode.removeChild(tads) ;  				
        }
        var rhsa = $('rhsa');
        if(rhsa){
            rhsa.parentNode.removeChild(rhsa) ; 
        }
    },
    
    RemoveLinkTracking : function(){
        var all_a = document.getElementsByTagName('a');
        for (var i = 0, k=all_a.length; i< k; i++){
            var a = all_a[i];
            a.removeAttribute('onclick');
            a.removeAttribute('onmousedown');
            if(a.href.match(/\/url\?/)){
                var url = this.qs('url',a.href);
                if (url) {
                    a.href = decodeURIComponent(url.replace(/\+/g, '%20'));
                } else {
                    var q = this.qs('q',a.href);
                    if (q) {
                        a.href = decodeURIComponent(q.replace(/\+/g, '%20'));
                    }
                }
            }
        }
        
        var elements = ['div', 'li', 'span', 'a'];
        for (var i = 0, k=elements.length; i< k; i++){
            var element = document.getElementsByTagName(elements[i]);
            for (var x = 0, y=element.length; x< y; x++){
                var el = element[x];
                el.removeAttribute('onclick');
                el.removeAttribute('onmousedown');	
            }
        }
        
    },
    
    RemovePrefetch : function(){
        var all_links = document.getElementsByTagName('link');
        for (var i = 0 , k=all_links.length; i< k ; i++){
            var link = all_links[i];
            if(link.rel == 'prefetch'){
                link.parentNode.removeChild(link) ;
            }
        }	
    }
    
};

function $(id, doc) { if (!doc) { doc = document ; } if(doc.getElementById(id)) { return doc.getElementById(id) } else { return false } ; };

(function(){
    $grjl.init();
})();