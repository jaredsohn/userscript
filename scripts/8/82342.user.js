// ==UserScript==
// @name         Google快照修复
// @include      http://www.google.com/*
// @include      http://www.google.cn/*
// ==/UserScript==

    (function() {
    var allLinks = document.links;
    var ra=Math.round(Math.random()*1000);
    var _raplaceIPAddress="";
    switch(ra%9){
        case 0:_raplaceIPAddress="64.233.167.104"; break;
        case 1:_raplaceIPAddress="66.102.7.104";break;
        case 2:_raplaceIPAddress="66.102.9.104";break;
        case 3:_raplaceIPAddress="66.102.11.104";break;
        case 4:_raplaceIPAddress="72.14.207.104";break;
        case 5:_raplaceIPAddress="216.239.53.104";break;
        case 6:_raplaceIPAddress="216.239.59.104";break;
        case 7:_raplaceIPAddress="216.239.63.104";break;
        case 8:_raplaceIPAddress="64.233.179.104";break;
        
    }  
    if (allLinks != null)
{
for (i = 0; i <allLinks.length; ++i)
{
if (allLinks [i].href.indexOf ("/search?q=cache:") > 0)
{
allLinks [i].href = allLinks [i].href.replace ("/search?q=cache:", "/search?&q=cache:");

allLinks [i].href = allLinks [i].href.replace ("72.14.235.104", _raplaceIPAddress);

}
}
}
}
)();