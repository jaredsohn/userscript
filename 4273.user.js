// Listing2Tauschticket
// 0.10 beta: 2009-12-21 Multikulti no longer exists, but archives are still online. Funkhauseuropa.de added instead.
// 0.9 beta: 2008-01-21 RadioEins renamed their playlists once more... tried to fix it. Still a bug: reset to 0 hits doesnt work
// 0.8 beta: 2007-11-18 Script modified for redesigned multikulti pages. All new links in orange color
// 0.7 beta: 2007-04-07 Just discovered that It works properly only for amazon.de sites , not for amazon.com. Due to i18n issues. Sorry!
// 0.6 beta: 2007-03-30 Amazon has changed the format of the urls of their "listmania!" lists. Script modified
// 0.5 beta; 2006-06-17 more generic variable names, re-ordered some blocks and object definitions
// 0.4 beta: 2006-06-05 also query amazon wishlists, make one request per title
// 0.3 beta: 2006-05-31 
// 
// $Id: listing2tauschticket.user.js 91 2009-12-21 18:32:18Z knut $
//
// ************
// What it does
// ************
// Mashup between selected media sites and german booklovers forum tauschticket.de.
// Did this ever happen to you: Querying an amazon wishlist or listening to a radio show packed with nice music 
// you decide to remember a few of the interesting artists. Clearly, next time in the bookstore/record store 
// you will search for a few artists just discovered to see what's in stock. 
// That scenario outlines a bit what the script does. The script grabs the artist names from a listing
// and looks on the german website  www.tauschticket.de (TT) which of the artists are available there. 
// If there are some records available, the artist names or titles will be changed to a hyperlink, 
// including the number of hits found. If nothing is found, the script inserts a dummy link ending in [TT] 
// leading to the TT query page where the query can be refined.
// Note: If you can understand the source code, you might be able to extend the script: 
//       define an url and an xpath expression in the if-clause in the "Main Program" below
// Note: depending on the length of the listing, this script makes LOTS of http requests to tauschticket!
// Note: You need to be a member of tauschticket.de in order to request one of those items available.
//
// **********************************************
// Tauschticket users: if you like this script, give me tauschtickets by requesting some of my articles:
// my tauschticket userid is knbknb, login and search at
// http://www.buchticket.de/cgi-perl/searchUser.cgi
//
//
// ==UserScript==
// @name          Listing2Tauschticket
// @namespace     http://knbknb.greasemonkey.de
// @description   Grab name of artists from playlists of Radio-Shows (and similar sites)- For each singer from the playlist, make a HTTP request to tauschticket.de to see which cds are available.  
// @include       http://www.multikulti.de*
// @include       http://www.funkhauseuropa.de*
// @include       http://www.radioeins.de*
// @include       http://www.radio1.de*
// @include       http://www.amazon.de*
// @include       http://film-dienst.kim-info.de*
// @include       http://www.heise.de/tp/*
// ==/UserScript==

//we need a recent version of greasemonkey
//to make links to another site, www.tauschticket.de
//
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
}

var log = (unsafeWindow.console) ? unsafeWindow.console.log : GM_log;

/**********************************************************************/
/***********************         OBJECTS        ***********************/
/**********************************************************************/

// the current page contains the playlist 
// no named arguments for now, this is good enough
function ListingOnWebpage(){
//++++++ examples and defaults  +++++++++++++++
//http://www.multikulti.de/playlist.jsp
//http://www.radioeins.de/_/playlists/playlist_jsp/activeid=267/key=playlist_99669.html
  this.name = "Radio Multikulti"; //a descriptive name
  this.url  = "musiksuche.plst";  //page on this site that contains the playlist
  this.newstyle = "";
  this.xpath = "//td[@headers='sp2']"; //xpath expression that returns names of the artists
  this.maxqueries = 103; // how many xmlhttprequests at once max? prevent a denial-of-service attack on the targetsite
}
//ListingOnWebpage.prototype.maxqueries = 3

// the site we get additional data from. 
// this is a bit fragile
function TargetSite(){
  this.name = "Tauschticket";
  this.querypage = "http://www.tauschticket.de/suche";
  this.querystring = "";
  this.getrequest = "";
  this.pg = "musik";
  this.sort = "ctime";
  this.action = "newSearch";
  this.titel = "";
  this.x = 47;
  this.y = 10;
  this.interpret = "";
  this.autor = "";
  this.runnumber = 0;
  this.numberofHits = 0;
  this.makeQuerystring = function(){
    //var params = new Array("pg="  + this.pg, "sort=" + this.sort, "action=" + this.action, "titel=" + this.titel, "x=" + this.x, "y=" + this.y, "interpret=" + escape(this.interpret))
    if (arguments.length){
      var params = [];
      for (var i = 0; i < arguments.length; i++){
            params[i]= arguments[i] + "=" + eval("escape(this. " +  arguments[i] + ")");
      }
      this.querystring = params.join("&");
    }
    return this.querystring;
  };
  
  this.setDynAttributes = function(){
		var listingname = "";
		var str4replace = "[TT?]";
		if (arguments.length >= 1){
					listingname = arguments[0];
					str4replace = arguments[1];
		} 
		if (listingname.match(/Film-Dienst/i)){
					this.pg="film"; 
					this.titel=cleanup4TT(str4replace);
					this.interpret="";
		} else if (listingname.match(/Amazon/i)){
					this.pg="buch"; 
					//von|by|de|di|da|van
					var rx = '>([^>]*)<\/a>\\s*<\/strong>&nbsp;\\s*von\\s*(.*)';
					var t = new RegExp(rx);
					t.compile(rx);
					t.exec(str4replace);
					if (RegExp.$2 !== null){
					  this.titel=RegExp.$1;
					  this.autor=RegExp.$2;
					  this.autor=cleanup4TT(this.autor);
					  this.titel=cleanup4TT(this.titel);
					  this.interpret = this.titel +" " + this.autor;
					  //this.autor= str4replace;
					} else {
					  this.titel= cleanup4TT(str4replace);
					  this.interpret="";
					}
					
		} else if (listingname.match(/Sachbücher/i)){
					this.pg="buch"; 
					this.autor= str4replace;
					this.interpret=this.autor;
		} else {
					this.pg = "musik";
					this.titel = "";
					this.interpret=str4replace;        
		}  
  };
}

TargetSite.prototype.makeGetrequest = function(){
       this.getrequest = this.querypage + "?" + this.makeQuerystring(); 
       return this.getrequest;  
};


// purpose : search an item on TT 
// input: the type of search (books, music, movies, games) and current node
//function TT_Query(tttype, node){
function TT_Query(tt, node){
  // music : http://www.tauschticket.de/suche?pg=musik
  // music search:
  /* GM_log("searching " + tt.interpret + " on page " + tt.pg);*/

  this.html = GM_xmlhttpRequest({
      method: 'POST',
      url: tt.querypage,
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          "Content-type" : 'application/x-www-form-urlencoded'
      },
      data : tt.querystring,
      onload: function(responseDetails) {
          /*parse_response_details(responsedetails.responsetext);*/
            var tthtml = responseDetails.responseText;
             var link ={};
             tt.numberOfHits = 0;
            if ( tthtml.length > 0 ){
               tt.numberOfHits= (function(){                   
                   var rx = "(\\d+)\\s*-\\s*(\\d+)\\s+von\\s+(\\d+)";
                  var t = new RegExp(rx, "i");
                  t.compile(rx);
                  t.exec(tthtml);
                  var r = RegExp.$3;
                  delete t;
                  if (r){
                    return r;
                  } else {
                    return 0;
                  }
               })();
               if (tt.numberOfHits > 0){
                 //GM_log("searchresult: " + tt.interpret + "found hits: " + numberOfHits); 
                 link = makeTTLink(tt, " [" + tt.numberOfHits + " hits]");
               } else if (alwaysCreateGenericLink == 1) {
                 //insert a link to TT query page in every row, no matter what
                 //GM_log("run  " + tt.runnumber + ": making link for " + tt.interpret); 
                 tt.numberOfHits=0;
                 link = makeTTLink(tt, " [TT]");
               } else {
                 tt.numberOfHits=0;
                 //GM_log("run " + tt.runnumber + ": no hits found for " + tt.interpret); 
               }

               if (link !== null){
                 if (node.nextSibling === null){
                   node.parentNode.appendChild(link);
                 } else {
                   //insert after
                   //node.parentNode.insertBefore(link, node.nextSibling);
                   node.parentNode.replaceChild(link, node);
                 }
               } 
               delete link;
               tthtml= null;
               tt.numberOfHits = 0;
            } else {
                   tthtml = "";
            }

      } 
    });
    
}


/**************************************************************************/
/************    object definitions and prototypes end   ******************/
/**************************************************************************/
// 
/**************************************************************************/
/***********************    Main Program   ********************************/
/**************************************************************************/

var alwaysCreateGenericLink = 1;
var curpage = window.location.href;
var listing = new ListingOnWebpage(); // use the default show or the playlist on the current page
var matched = 0;		
//make sure we're on the right page
if (curpage.match(/multikulti/i) ){ 
    listing.name = "Radio Multikulti (RBB)";
    listing.url  = "musiksuche.plst";
    //listing.xpath = "//td[@headers='sp2']";
    listing.xpath = "//div[@id='contentPlaylist']/table//td[2]";
    matched = 1;
}  else if (curpage.match(/funkhauseuropa/i)) {
		listing.name = "Funkhaus Europa";
    listing.url  = "/playlists/";
    listing.xpath = "//*[@id='wsContentArea']//td[@class='bold']//span[not(.//a)]";
    matched = 1;  
} else if (curpage.match(/radioeins|radio1/i)) {
		listing.name = "Radio Eins (RBB)";
    listing.url  = "/playlists/";
    listing.xpath = "//*[@id='containerCenter']//td/strong[not(.//a)]";
    //id('containerCenter')/div[2]/table/tbody/tr/td[1]/strong
    matched = 1;  
} else if (curpage.match(/film-dienst/i)) {
// this is not a ListingOnWebpage but an online movie magazine 
		listing.name = "Film-Dienst";
    listing.url  = "artikel.php?dest=frei&pos=aktuell";
    listing.xpath = "//b[not(.//parent::a)]|strong[not(.//parent::a)]";
    matched = 1;  
} else if (curpage.match(/\/lm\//i)) {
		listing.name = "Amazon Wunschlisten";
    listing.url  = "ref="; //may be arbitrary or not needed
    listing.xpath = "//span[@id='lm_asinlink95']";
    matched = 1; 
} else if (curpage.match(/tp/i)) {
		listing.name = "Sachbücher des Monats";
    listing.url  = ""; //may be arbitrary or not needed
    listing.xpath = "//p[@class='b-autor']";
    matched = 1;     
}

if (matched){
    //this function does it all: 
    //parse the playlist, perform searches, insert new hrefs    
    insert_available_items(listing);
}

/**************************************************************************/
/********************    End of Main Program   ****************************/
/**************************************************************************/

//this function does most of the work
function insert_available_items(listing){
    // nodesets ns1
    var  ns1, nstt, q, i, len, newElement, link, node, tt, r;
    //this xpath must return all the names of the artists ot titles that we intend to search for at Tauschticket (TT)
    ns1 = gm_xpath(listing.xpath);
    len = ns1.snapshotLength;
    if (len > listing.maxqueries ){len = listing.maxqueries;}
    for(i = 0; i < len; i++){
      node = ns1.snapshotItem(i);
      tt = new TargetSite();
      //tt.interpret = node.innerHTML;
      tt.runnumber = i;
      tt.numberofHits = 0;
      tt.setDynAttributes(listing.name, node.innerHTML); // some attributes depend on the current site 
      tt.makeQuerystring("pg"  , "sort" , "action" , "titel" , "x" , "y" , "interpret", "autor" );
      tt.makeGetrequest();
      //GM_log("found " + tt.interpret + " of " + len);
      // perform search at Targetsite. we're only interested in the result
      r = new TT_Query(tt, node);
      delete node;
      delete r;
     }
}

function cleanup4TT(inptstr){
  //str.replace(/\\w\\w /ig, " ");
  //remove every string of length <= 2 chars because TT does not accept it
  // if strlen > 75, remove every string with length 3 or less
  var ostr = "";
  var mxl = 2;
  if (inptstr.length >= 75) {mxl = 3};
  var words = inptstr.split(" ");
  var tl = 0; //total lenngth
  for (var i = 0; i < words.length; i++){
    tl += words[i].length;
    if (tl >= 73){
    //no-op
    } else if (words[i].length > mxl ){
      ostr = ostr + " " + words[i] ;
    } 
    
  }
  return ostr;
}

function makeTTLink(tt, extrainfo){
  var container , newLink ;
  if (tt.interpret.length > 0)  {
    container = document.createElement("td");
    container.appendChild(document.createTextNode(" "));
    newLink = document.createElement("a");
    newLink.setAttribute("href", tt.getrequest);
    newLink.style.color= "#ff3300 ! important";    
    newLink.appendChild(document.createTextNode(cleanup4TT(tt.interpret) + extrainfo ));
    container.appendChild(newLink);
    delete tt;
    return(container);

  } else if (tt.titel.length > 0)  {
    //Amazon
    container = document.createElement("b");
    container.appendChild(document.createTextNode(" "));
    newLink = document.createElement("a");
    newLink.setAttribute("href", tt.getrequest);
    newLink.appendChild(document.createTextNode(cleanup4TT(tt.titel) + extrainfo ));
    container.parent.appendChild(newLink);
    delete tt;
    return(container);

  } else {
    GM_log("makeTTlink: arg1 = empty object?" );
    delete tt;
    return(null);
    
  }
}


//
function find_TT_hits(str)
{
  var rx = "(\\d+)\\s*-\\s*(\\d+)\\s+von\\s+(\\d+)";
  var t = RegExp(rx, "i");
  t.compile(rx);
  t.exec(str);
  var r = RegExp.$3;
  RegExp.$3 = "";
  delete t;
  if (r){
    return r;
  } else {
    return 0;
  }
}

function gm_xpath(expression){
   //return document.evaluate(expression,contextNode,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   return document.evaluate(expression,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

// *******************************************************************
