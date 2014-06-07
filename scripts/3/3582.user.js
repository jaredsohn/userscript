/* Tauschticket.de Hacks */
// $Id: tauschticket-hacks.user.js 121 2011-12-02 14:44:02Z knut $
// $HeadURL: file:///H:/mydocuments/_svnrepo/eigene_projekte/greasemonkey_prod/tauschticket-hacks.user.js $
// 2011-12-02    Treffernummerierung repariert, viele inzw. überfl. Fkt. raus (da von TT selbst impl.)
// 2011-06-05    Amazon.de Suche nach Keyword eingefügt
// 2010-11-10 redesigned: isbn and ean-number scraping 
// 2010-09-06 jquery changes
// 2006-06-10 froggle, google, amazon links are added for music and film
// 2006-05-19 table row numbering works for buchticket.de, too
// 2006-05-23 works for tauschticket.de and buchticket.de
// 
// Experiments with Regex Object, might not work properly forever
// TODO: turn this into OO design, implement google book search API query, 
// if you like this script, give me Tickets by requesting some of my books or cds:
// my tauschticket userid is knbknb
// http://www.buchticket.de/cgi-perl/searchUser.cgi
// ==UserScript==
// @name          Tauschticket.de Hacks
// @namespace     http://knbknb.greasemonkey.de
// @description   Add information to webpages, at german booklovers' forum www.tauschticket.de: "Suchanfrage", "Meine Tauschvorgaenge", "Tauschvorgang-Bestaetigung", "Detailansicht" 
// @include       http://www.buchticket.de/*
// @include       http://www.tauschticket.de/*
// @version  2011.12.02
// ==/UserScript==
//use firebug console, if available
var jQy;
// Add jQuery
function importJs(url) {
  var script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);
}
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
// maybe use this in future release
// importJs('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.js');
// Check if jQuery is loaded
function jQueryWait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(jQueryWait, 100);
  } else {
    // some other userscript may manipulate slashdot page with jQuery,
    // so assign to this global var instead of $ variable
    jQy = unsafeWindow.jQuery;
    init();
    main();
  }
}
jQueryWait();
// Here comes the main function, called by jQueryWait ;-)

function init() {
  if (!window.knbknb) {
    window.knbknb = {};
  }
  var site = {
    "name": "Amazon.de - (Suche nach ISBN oder EAN)",
    "producttype": "books",
    "searchparamname": "isbn",
    "searchparamvalue": /ISBN:|EAN:/,
    "url": "http://www.amazon.de/gp/search?ie=UTF8&keywords=",
    "rx": /([\\d|\\-]{9,15}X?)/,
    "tooltip": "Suche bei Amazon Deutschland"
  };
  var amazon_de = new SearchSite(site);
  var amazon_keyw = new SearchSite(site);
  amazon_keyw.searchparamname= "titel";
  amazon_keyw.url = 'http://www.amazon.de/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=';
  amazon_keyw.name = "Suche bei Amazon.de - (Suche nach Keywords)";
  amazon_keyw.tooltip = "alle Titelwoerter werden Keywords; ggf. kuerzen";
  
  var amazon_en = new SearchSite(site);
  amazon_en.name = "Amazon.com - (Suche nach ISBN oder EAN)";
  amazon_en.url = 'http://www.amazon.com/ASIN/';
  amazon_en.tooltip = "Suche bei Amazon.com, USA";
  site = {
    "name": "Google Produktsuche - (Suche nach Titel)",
    "producttype": "any",
    "searchparamname": "titel",
    "searchparamvalue": "Titel:",
    "url": "http://www.google.de/products?q=",
    "tooltip": "Suche bei Google Products, USA"
  };
  var google_pr = new SearchSite(site);
  var google_de = new SearchSite(site);
  google_de.name = "Google.de - (Suche nach Titel)";
  google_de.url = 'http://www.google.de/search?hl=de&q=';
  google_de.tooltip = "Suche bei Google.de (Seiten aus Deutschland haben Prioritaet in Suchergebnissen)";
  var google_en = new SearchSite(site);
  google_en.name = "Google.com - (Suche nach Titel)";
  google_en.url = 'http://www.google.com/search?hl=en&q=';
  google_en.tooltip = "Suche bei Google, USA, (moeglw. andere Ergebn. als bei Google.de)";
  var google_isbn_de = new SearchSite(site);
  google_isbn_de.name = "Google.de - (Suche nach ISBN)";
  google_isbn_de.searchparamname = "isbn";
  google_isbn_de.searchparamvalue = /ISBN:/;
  google_isbn_de.url = 'http://www.google.de/search?hl=de&q=ISBN%20';
  google_isbn_de.tooltip = "Suche bei Google.de (nach ISBN- auf deut. Seiten)";
  google_isbn_de.rx = /([\\d|\\-]{9,15}X?)/;
  site = {
    "name": "Booklooker.de - (Suche nach Titel)",
    "producttype": "any",
    "searchparamname": "titel",
    "searchparamvalue": "Titel:",
    "url": 'http://www.booklooker.de/app/result.php?titel='
  };
  var booklooker = new SearchSite(site);
  //order matters here
  knbknb.sites = [amazon_de, amazon_keyw, amazon_en, google_isbn_de, google_de, google_pr, google_en, booklooker];
}


function main() {
  var pagePath;
  
  pagePath = window.location.pathname.toString();
  if (pagePath.match(/myTauschBestaetigen/i)) {
    // on "view recipient address" page, add title-of-article to
	// recipient-address - part 2
    page_myTauschBestaetigen(pagePath);
  } else if (pagePath.match(/filme|buecher|musik|alles|suche/i)) {
    // on search result page, add row number to table of items
    page_search(pagePath);
    
  } else if (pagePath.match(/(_\d+)\//i)) {
    // on book/film/musik... details page, add URL to amazon.de or whatever
    jQy.each(knbknb.sites, page_insert_ISBN_EAN_Links);
  }
}
// *******************************************************************
// *******************************************************************
// *******************************************************************
function SearchSite(params) {
  this.name = params.name;
  this.producttype = params.producttype;
  this.searchparamname = params.searchparamname;
  this.searchparamvalue = params.searchparamvalue;
  this.url = params.url;
  this.tooltip = 'undefined' === typeof params.tooltip ? "Suche" : params.tooltip;
  this.make_link = function(href) {
    if (href.length > 0) {
      var container = "<a target='_blank' title='" + this.tooltip + "' href='" + this.url + escape(href) + "'>" + this.name + "</a>";
      return (container);
    } else {
      return (null);
    }
  };
  this.rx = params.rx;
}
function page_insert_ISBN_EAN_Links(index, site) {
  var jqdetail;
  // we'll append to this dom element (underneath box of product data;
	// key-value pairs)
  jqdetail = jQy("div.detail_center").first();
  // search for Titel - only thing in h2 element
  if (site.searchparamname === "titel") {
    var jq_dom_els = jQy("div.headline_2_space").find("h2");
    var titel = jq_dom_els.first().text();
    if (typeof titel !== 'undefined') {
      jqdetail.append("<div class='detail_text'>" + site.make_link(titel) + "</div");
      // jqdetail.html(lnk + " 1 ");
      // databox.appendTo(lnk);
    }
  } else {
    // search for isbn or anything else
    var dom_els = jQy("div.clearfix").filter(function(index) {
      var n = jQy("div.detail_listing", this).text();
      // return div.clearfix with the metadata block
      return site.searchparamvalue.test(n);
    });
    var i = dom_els.filter(function(index) {
      var txt = jQy("div.detail_listing + div.detail_listing_text", this).text();
      return (/^\d+/.test(txt, "mg"));
    });
    // is it an ISBN? amazon url does not work for ISBNs with "-"
    // var isbn = cleanup_isbn(b);
    if (typeof i !== 'undefined' ) {
    var e =i.text().replace(/(?:\s)+/mg, "");      // remove whitespace
      	
      var b = /:(.+)/.exec(e);
      if (Object.prototype.toString.call(b) === '[object Array]') {
      // if(e.push && e.slice && e.join){
    	    // Definitely an array!
    	    // This is widely considered as the most rebust way
    	    // to determine if a specific value is an Array.
    	jqdetail.append("<div class='detail_text'>" + site.make_link(b[1]) + "</div");
      }
    }
  }
}
function cleanup_isbn(i) {
  var c = new RegExp('-', "gi");
  s = i.replace(c, "");
  return s;
}

// *******************************************************************
// *******************************************************************
// *******************************************************************
function page_search(s) {
// find rx in bold text that is not contained in an URL
	var start=parseInt(getURLParameter("start")) || 1;
	var i = 0;
		jQy(".main_content_v2").has(".category_item_link").each(function(){
		jQy(this).prepend(start + i++);
		
	});
}

//http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

