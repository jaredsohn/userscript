// ==UserScript==
// @name           Count links
// @namespace      Meir
// @include        http://srv1.bannerplay.com/*
// @include        https://srv1.bannerplay.com/*


// ==/UserScript==


  
       try{
       console.log("#links in page:"+document.getElementsByTagName("a").length);
}
        catch(e){/*error in runtime*/}


