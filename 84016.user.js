// ==UserScript==

// @name           Redirector and word blocker
// @namespace      jarblewiki.tiddlyspot.com/

// @description    Blocks pages on specified sites and also blocks specified words.
// ==/UserScript==





//GM_setValue("foo", "bar")

//str = GM_getValue("foo");

//alert(str);



//Alert all previously visited sites



currentSite = window.location.href;

GM_setValue("foo", GM_getValue("foo") + "            " + currentSite);

str = GM_getValue("foo");

//if current page has not been visited





//GM_setValue("foo", "");



//determine whether site has been visited.





function conditionalRedirect(toRedirect, redirectPage){

if((window.location.href).indexOf(toRedirect) != -1){

//alert("Redirect to " + redirectPage);

location.replace(redirectPage);

}

}



function clickRedirect(toRedirect, redirectPage){

if((document.referrer).indexOf(toRedirect) != -1){

//alert("Redirect to " + redirectPage);

//location.replace(document.referrer);

location.replace(redirectPage);

}

}



function alsoOpen(pg1, pg2){



foo = GM_getValue("foo")



if((window.location.href).indexOf(pg1) != -1){

//alert("also open " + pg2);

//unless pg2 has been visited today:

//GM_openInTab(pg2);

location.href = "javascript:document.write('<HTML><HEAD></HEAD><FRAMESET%20COLS=\'50%,*\'><FRAME%20SRC='%20+%20location.href%20+%20'><FRAME%20SRC='%20+%20location.href%20+%20'></FRAMESET></HTML>')"

}

}



//if the current page hasn't been visited yet, show this.

//redirectPage = prompt("What should " + window.location.href + " redirect to?", "");



//if((window.location.href).indexOf(facebook) != -1){

//conditionalRedirect(".com/", "http://www.facebook.com");

//}

//conditionalRedirect("http://www.youtube.com/", "http://www.wikipedia.org");



function wordBlock(word, redirect){

window.location.href = lol;

if(document.body.innerHTML.indexOf(word) != -1 || lol.indexOf(word) != -1){

location.replace(redirect);

}

}



conditionalRedirect("http://www.youtube.com/", "http://en.wikipedia.org/");

conditionalRedirect("http://www.wikipedia.org/", "http://en.wikipedia.org/");

clickRedirect("http://www.uncyclopedia.org/", "http://en.wikipedia.org");

clickRedirect("http://en.wikipedia.org/", "http://www.facebook.com/");

conditionalRedirect("http://userscripts.org/", "http://userscripts.org/forums");

//clickRedirect("http://www.facebook.com/", "http://mail.google.com/");

clickRedirect("http://www.google.com/", "http://www.google.com");



//open one web page along with another web page

alsoOpen("https://seahawks.smcm.edu/ics/Help/", "http://mail.google.com");

alsoOpen("https://seahawks.smcm.edu/ics/Help/", "http://mail.yahoo.com");

alsoOpen("https://seahawks.smcm.edu/ics/Help/", "https://webmail.smcm.edu/CookieAuth.dll?GetLogon?curl=Z2Fowa&reason=0&formdir=1");

alsoOpen("http://www.facebook.com", "http://www.userscripts.org");

alsoOpen("http://www.facebook.com", "http://www.formspring.me");

alsoOpen("http://www.facebook.com", "http://www.yelp.com/")

alsoOpen("http://userscripts.org", "https://addons.mozilla.org/")

alsoOpen("http://www.smcm.edu", "https://seahawks.smcm.edu/ics/Help/");

alsoOpen("http://answers.yahoo.com", "http://mail.google.com");

alsoOpen("http://answers.yahoo.com", "http://www.mahalo.com/answers");

alsoOpen("http://www.facebook.com/", "http://www.twitter.com");

alsoOpen("http://userscripts.org/", "https://www.squarefree.com/bookmarklets/pagelinks.html");

alsoOpen("http://serebii.net/", "http://www.metalkid.info/Pokemon/Calculators/CatchRate.aspx");

alsoOpen("http://www.google.com/", "http://www.bing.com/");





//block a word and redirect to a site

wordBlock("pokemon", "http://www.google.com/");

wordBlock("Pokémon", "http://www.google.com/");

wordBlock("cellular automata", "http://www.google.com");

wordBlock("Linux", "http://www.google.com/");

wordBlock("games", "http://www.google.com/");

wordBlock("slashdot", "http://www.google.com/");

wordBlock("emulator", "http://www.google.com/");

wordBlock("Greasemonkey", "http://www.google.com/");

wordBlock("userscripts", "http://www.google.com/");

wordBlock("Trololo", "http://www.google.com/");

wordBlock("TiddlyWiki", "http://www.google.com/");





function translateFunction(str, theFunction){

//"redirect to (http://www.wikipedia.org) if current page is (www.youtube.com)"

//"redirect to "

}