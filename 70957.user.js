{
// ==UserScript==
// @name           What.CD :: On The Web
// @namespace      http://www.what.cd
// @description    Simply launches a Google 'I Feel Lucky' search for the artist on a new tab
// @include        http*://*.what.cd/artist.php?*
// @version        0.3
// ==/UserScript==

 (function() {
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    
    function newTab(link){
      link.addEventListener("click", 
		function(event) {
                    GM_openInTab(link.href);
                    event.stopPropagation();
                    event.preventDefault();
                    return false;
                },
                true);
    }
    if (document.URL.indexOf("action=") == -1){
        artistNameEl = document.getElementsByTagName("h2")[0];
        artistName = artistNameEl.innerHTML.replace(" ", "+");
        
        googleURL = "<a id=\"on_the_web\" href=\"http://www.google.com/search?q=" + artistName + "&amp;btnI=1\" target=\"_blank\"> [On the Web] </a>";
        linkbox = artistNameEl.nextSibling.nextSibling;
        linkbox.innerHTML += googleURL;
        linkbox.style.marginRight = "3.5em";
        onTheWeb = document.getElementById("on_the_web");
        if (!is_chrome)
            newTab(onTheWeb);
    }
    })();}
