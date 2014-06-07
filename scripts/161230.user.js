// Add search links (SO, Google, Symbolhound), allowing to open them in a new tab
//
// ==UserScript==
// @name           Stackoverflow Search in Tab
// @version        0.4
// @description    Adds tab-openable links besides the search box
// @namespace      data:,000000000000000000000000000000003fbf49fdcc8f9ddb8de0d10f6a5c32ca
// @include        http://*stackexchange.com/*
// @include        http://*stackoverflow.com/*
// @include        http://*superuser.com/*
// @include        http://*serverfault.com/*
// @include        http://*doctype.com/*
// @include        http://*askubuntu.com/*
// ==/UserScript==


(function(){

    // functionality    
    var main = (function(){

        // append empty links next to search box
        $("#search div").append(
            '<span style="position:absolute">'+
            '<a id="q_search1" href="/search?q=..." target=_blank title="Stacksearch, new tab">⬀</a>'+
            '&nbsp;'+
            '<a id="q_search2" href="//google.com/search?q=..." title=Google>G</a>' +
            '&nbsp;'+
            '<a id="q_search3" href="//symbolhound.com/?q=..." title=Symbolhound>$</a>'+
            '</span>'
        );

        // register update handler to populate ⬀ G $ links
        $("input[name=q]").bind("change input propertychange", function(){
            $("#q_search1").attr("href", "/search?q="+encodeURI(this.value));
            $("#q_search2").attr("href", "http://www.google.com/search?q=site:"+location.host+"+"+encodeURI(this.value));
            $("#q_search3").attr("href", "http://symbolhound.com/?q="+encodeURI(this.value)+"&l=&e=&n=&u="+location.host);
        });
        
        // temporary fix for missing space after [tag]
        var q = document.forms.search.q;
        if (q.value && q.value != "search") { 
            q.value += " ";
        }


    });


    // inject function as last page script, so jQuery is available
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.textContent = '(' + main.toString() + ')();';
    document.body.appendChild(script);

})()
