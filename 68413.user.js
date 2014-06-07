// ==UserScript==
// @name           Already rented that
// @namespace      *
// @description     When on a Blockbuster.com movie page, check your rental history to see if you've already rented the movie.  If you have, display a note at the top, hopefully preventing you from renting that (apparently) forgettable movie again.
// @include        http://*blockbuster.com/*catalog/movieDetails/*
// @version         1.0.1
// @copyright     2010+, Miles Libbey (http://www.libbey.org)

// ==/UserScript==

var HoursToCacheRentalHistory=12;

// these from http://wiki.greasespot.net/Code_snippets
// make firebug work nicely
var DEBUG = 0;
console = { 
    log : function (text) { if( DEBUG && unsafeWindow.console ) {unsafeWindow.console.log( text ); }},
    info : function (text) { if( DEBUG && unsafeWindow.console) {unsafeWindow.console.info( text ); }},
    warn : function (text) { if( DEBUG && unsafeWindow.console) {unsafeWindow.console.warn( text ); }},
    error : function (text) { if( DEBUG && unsafeWindow.console) {unsafeWindow.console.error( text ); }}
};

// allow object to be stored in GM_values
function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

// this from http://userscripts.org/guides/9 to parse html. 
function getDOC(callback) {
    console.log("stale or no rental history data, so fetching it");
    url="http://www.blockbuster.com/acctmgmt/rentalHistory?pg.1.page=1&pg.1.pageSize=90000";
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
            var doc = document.implementation.createDocument('', '', null),
                html = document.createElement('html');
            html.innerHTML = responseDetails.responseText;
            doc.appendChild(html);
            callback(doc);
        }
    });
}

// add a note to the user that they've rented this before.  Gets called by gettitles() and the general script
function haveamatch(){
	var spot=document.getElementsByClassName('contentsLB');
	spot[0].innerHTML+='<div><h2>You already rented this!</h2></div>';
	spot[0].parentNode.replaceChild(spot[0],spot[0]);
	GM_addStyle(".contentsLB div{background-color: #FFFFDD;text-align: center;}");
}


// gets called by getDOC.  WIll parse the rentalhistory page, grabbing movie ids, and storing them first in an array, then in a GM_value.
function gettitles(doc) {
    var titles=[]; // array of end paths of movies
    // go through the titles you currently have out and add them to the list
    var a=doc.getElementById('queue').getElementsByTagName('a');
    var titleclass=doc.getElementById('queueShippedList').getElementsByClassName('title');
    var rp=/.*movieDetails\//; 
    for(var i=0;i<a.length;i++){
        if(a[i].href){
            newa=a[i].href.replace(rp,"");
            titles.push(newa);
        }
    }
    // get the movies you have already returned.

    var titleclasslen=titleclass.length;
    for (i=0;i<titleclasslen;i++){
        if(titleclass[i].href){
            newa=titleclass[i].href.replace(rp,"");
            titles.push(newa);
        }
    }
//	console.log(titles);
    if(titles.indexOf(path)!=-1){haveamatch();}
    titles.sort();
    var gmv={"Time":currentTime,"titles":titles};
    serialize('t', gmv); // store these to cache the rental history
}

// for logged in users, check to see if we have a fresh cached version of the rental history. 
//If not, get it (function gettittles). Otherwise see if this movie was rented before. 
// Storing GM_value "t"  -- object set in gettitles() -- format 
//({Time:(), titles:["movieid1", "movieid2"]})

//GM_deleteValue("t"); // for debugging might need to remove GM_value.  Can see current value in about:config -- greasemonkey.scriptvals.*Already rented that.t
if(document.getElementsByClassName('login').length === 0){ // only do this for logged in users
    currentTime=new Date();
    path=document.location.pathname.replace(/.*movieDetails\//,""); // movie detail page can sometimes have browse path in it
    var gmv=deserialize('t');
    var oldTime=gmv.Time || (currentTime-(HoursToCacheRentalHistory *10000*60*60)); // if the GM_value isn't set yet, default this to really old time -- 
    if((currentTime-oldTime)>(1000*60*60*HoursToCacheRentalHistory)){ // only do fetch if data is more than TTL hours old
        getDOC(gettitles); // gets the rental history
    }
    else{ // cache is fresh
        var titles=gmv.titles ? gmv.titles: getDOC(gettitles);
        if(titles.indexOf(path)!=-1){
            haveamatch();
        }
    }
}
else { //not logged in
    console.log("GM script not run because logged out.")
}