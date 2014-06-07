// ==UserScript==
// @name           Adfly Raw Click
// @author         Cagri Ari
// @description    Adfly kazancinizi katlayin
// @version        2.0
// @include       *adf.ly/*
// ==/UserScript==
    var url = document.URL;
    if (url.indexOf("adf.ly/") != -1) {
        window.location = url;
        setTimeout(clickUrl, 11000);
    }
    function clickUrl() {
      
            window.open(url,'_blank');
            setInterval(closeOpen,1000);
        
    }
    function closeOpen() {
        document.getElementById("skip_ad_button").click();
        clearInterval();
        setInterval(closeWind,2000);
    }
    function closeWind() {
        window.close();
        clearInterval();
    }