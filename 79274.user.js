// ==UserScript==
// @name          GoogleCache
// @namespace     http://userstyles.org
// @description          Google cache
// @version                  1.0
// @author        Nobody
// @include       http://www.google.*/search*
// ==/UserScript==
(function(){
        function enableCache() {
                var allLinks = document.links;
                var ra=Math.round(Math.random()*1000);
                var _raplaceIPAddress="";
                switch(ra%6){
                        case 0:_raplaceIPAddress="203.208.37.104"; break;
                        case 1:_raplaceIPAddress="66.102.7.104";break;
                        case 2:_raplaceIPAddress="66.102.9.104";break;
                        case 3:_raplaceIPAddress="66.102.11.104";break;
                        case 4:_raplaceIPAddress="72.14.207.104";break;
                        case 5:_raplaceIPAddress="216.239.59.104";break;
                }  
                if (allLinks != null)
                {
                        for (i = 0; i <allLinks.length; ++i)
                        {
                                if (allLinks [i].href.indexOf ("/search?q=cache:") > 0)
                                {
                                allLinks [i].href = allLinks [i].href.replace ("/search?q=cache:", "/search?&q=cache:");
                                allLinks [i].href = allLinks [i].href.replace ("webcache.googleusercontent.com", _raplaceIPAddress);
                                }
                        }
                }
        }
        enableCache();
})();