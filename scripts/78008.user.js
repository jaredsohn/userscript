// ==UserScript==
// @name           No logout bug    
// @description    bug de connection
// @include http://pg-logout.auskunft.de/*
// @include *clodogame*
// @include *pennergame*
// @include *dossergame*
// @include *menelgame*
// @exclude *change_please*
// ==/UserScript==

/* Update proc */
var SCRIPT={SCRIPTED:"No logout bug",VERSION:"1.0",SCRIPT_URL:"http://userscripts.org/scripts/source/78008.user.js"}
function updateCheck(){try{GM_xmlhttpRequest({method:'GET',url:SCRIPT.SCRIPT_URL+"?rnd="+Math.random(),onload:function(result){if(result.status!=200)throw"status="+result.status;var tmp=/VERSION[\s=]+"(.*?)"/.exec(result.responseText);if(tmp==null)throw"parse error";if(SCRIPT.VERSION!=tmp[1]){window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");if(window.confirm("New version "+tmp[1]+" is available. Update ?"))location.href=SCRIPT.SCRIPT_URL}else{window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");alert("Latest version\n\""+SCRIPT.SCRIPTED+"\"\nVersion: "+SCRIPT.VERSION+" ")}}})}catch(error){alert('Error updating: '+error)}}GM_registerMenuCommand("Check for update for  "+SCRIPT.SCRIPTED+"",updateCheck);
/* end Update */


if(window.location.href == "http://pg-logout.auskunft.de/*" || window.location.href == "http://pg-logout.auskunft.de/videotheken.html")
{
window.location.href = "http://berlin.pennergame.de/";
};

if(window.location.href == "http://www.clodogame.fr/city/district/")
{
window.location.href = "http://www.clodogame.fr/city/district/?orderby=flaschen&style=ab";
};
if(window.location.href == "http://berlin.pennergame.de/city/district/")
{
window.location.href = "http://berlin.pennergame.de/city/district/?orderby=flaschen&style=ab";
};

if(window.location.href == "http://www.clodogame.fr/" || window.location.href == "http://clodogame.fr/")
{
window.location.href = "http://www.clodogame.fr/overview/";
};

if(window.location.href == "http://www.pennergame.de/nologout/" || window.location.href == "http://pennergame.de/nologout/")
{
window.location.href = "http://www.pennergame.de/overview/";
};

if(window.location.href == "http://www.berlin.pennergame.de/nologout/" || window.location.href == "http://berlin.pennergame.de/nologout/")
{
window.location.href = "http://www.berlin.pennergame.de/overview/";
};

if(window.location.href == "http://www.dossergame.co.uk/nologout/" || window.location.href == "http://dossergame.co.uk/nologout/")
{
window.location.href = "http://www.dossergame.co.uk/overview/";
};

if(window.location.href == "http://www.menelgame.pl/nologout/" || window.location.href == "http://menelgame.pl/nologout/")
{
window.location.href = "http://www.menelgame.pl/overview/";
};


if(window.location.href == "http://www.clodogame.fr/nologout/" || window.location.href == "http://clodogame.fr/nologout/")
{
window.location.href = "http://www.clodogame.fr/overview/";
};