/*

 BookBorough Ajax Panel for Greasemonkey
 (C) 2005 Matt Katz under cc-by-sa
 License: Creative Commons "Attribution-ShareAlike 1.0"
 http://creativecommons.org/licenses/by-sa/1.0/
 A new york centric way to look at books.
 You should save this text as bookborough.user.js
 You probably don't want to use this and bookburro.user.js at the same time.
 I've left in the reference codes of the original devs - give them
 dough so they give us some new versions of book burro.
 Any improvements/new versions of this will be found at 
 http://snarkhunt.blogspot.com
 email me any suggestions, just use my blogspot @ google's email.
 
 All I've added is the new york public library, brookly public library and the strand'
 Fixed amazon, buy.com, removed the SE urls, as they aren't so relevant to NYC.
 entireley based on:

 Bookburro Ajax Panel for GreaseMonkey and Turnabout

 Version 0.17
 (C) 2005 Johan SundstrÃ¶m (0.13 .. 0.17)
 License: Creative Commons "Attribution-ShareAlike 2.0"
 http://creativecommons.org/licenses/by-sa/2.0/

 Skeletal parts of DOM-Drag by Aaron Boodman, 2001
 http://www.youngpup.net/2001/domdrag
 License: Creative Commons "Attribution-ShareAlike 2.0"
 http://creativecommons.org/licenses/by-sa/2.0/

 (C) 2005 Reify (0.11r .. 0.12r)
 License: Creative Commons "Attribution-ShareAlike 1.0"
 http://creativecommons.org/licenses/by-sa/1.0/

 (C) 2005 Jesse Andrews, Britt Selvitelle under cc-by-sa (0.01 .. 0.11)
 License: Creative Commons "Attribution-ShareAlike 1.0"
 http://creativecommons.org/licenses/by-sa/1.0/

 Snipits used from RSS Reader for GreaseMonkey
 http://www.xs4all.nl/~jlpoutre/BoT/Javascript/RSSpanel/
 Version: 1.03 (C) 2005 Johannes la Poutre
 THANKS!

 Changelog:

  *  2005-11-02  *

 0.17 - Added Google Print. Initial preparations for ISBN-13, for Jan. 1, 2007.

  *  2005-10-04  *

 0.16 - Bugfix for Greasemonkey 0.53 -- for now, only open/close/drag the title

  *  2005-10-03  *

 0.15 - Added BiggerBooks.com, Bookbyte, Booksamillion.com and eCampus.com

  *  2005-10-02  *

 0.14 - Made the bookburro window draggable
      - Added (one hour) price cache for last seen book
      - Added Abebooks, Alibris, biblio.com, cdon.com, exlibris.se and libris.se
      - Centralized all (functionally important) code dealing with each store
      - Integrated my improvements with the Reified version 0.12r codebase
      - Added option to update book URL when fetching price tag
      / Johan SundstrÃ¶m, oyasumi+bookburro@gmail.com

  *  2005-09-19  *

 0.13 - GreaseMonkey 0.6 compatibility fix to get working onclick handlers
      - Added AJAX fetching from Powell's Books, figuring they want customers
      - Added adlibris.se, akademibokhandeln.se, bokus.com and internetbokhandeln.se
      - For kicks, added availability listing at LinkÃ¶ping University library
      / Johan SundstrÃ¶m, oyasumi+bookburro@gmail.com

  *  2005-06-24  *

 0.12x - Added support for alldirect.com

  *  2005-06-21  *

 0.12r - works when injected before the page has finished loading; fixed price-parsing on Powells.com; removed Powells from list in the Burro box

 0.11r - modified by Reify to work in Internet Explorer with Turnabout:
 	- The price wouldn't render on Amazon for some reason, so we now render with DIVs + SPANs
 	- Set style in a way that works in IE (element.setAttribute("style", str) doesn't work in IE)
 	- Moved data: URIs to one place to make the script easier to read
 	- Show/hide the price table rather than changing the box's dimensions to make code easier to maintain (don't have dimensions scattered throughout)
 	- Anchored top right icons to the top right instead of top left so their position will update automatically if the box has to be wider
 	- Branch to use MS or Mozilla XML parser

  *  2005-04-25  *

 0.11 - improved skin & add link to message if no results
 0.10 - bug fix - don't show iframes!
 0.09 - bug fix - alert were out of scope, plus a couple visual tweaks
 0.08 - bug - use (function(){ code })(); so you don't kill other javascript
 0.07 - use AWS to grab amazon's prices

  *  2005-04-24  *
 0.06 - wasn't checking for ISBN= in the url as well!
 0.05 - added Amazon marketplace
 0.04 - worked on skin to make it PURTY
 0.03 - use AJAX to add the prices
 0.02 - Improved interface
 0.01 - initial releasea

*/

// ==UserScript==
// @name          Book Borough - Remixing the NYC bookstore
// @namespace     http://overstimulate.com/userscripts/
// @description   Compare book prices from various book stores
// @include       http://amazon.com/*
// @include       http://www.amazon.com/*
// @include       http://www.powells.com/*
// @include       http://half.ebay.com/*
// @include       http://buy.com/*
// @include       http://www.buy.com/*
// @include       http://biblio.com/*
// @include       http://www.biblio.com/*
// @include       http://search.barnesandnoble.com/*
// @include       http://barnesandnoble.com/*
// @include       http://www.barnesandnoble.com/*
// @include       http://www.alldirect.com/*
// @include       http://www.bokus.com/*
// @include       http://www.internetbokhandeln.se/*
// @include       http://www.akademibokhandeln.se/*
// @include       http://akademibokhandeln.se/*
// @include       http://www.adlibris.se/*
// @include       http://*.bibl.liu.se/*
// @include       http://www.cdon.com/*
// @include       http://www.exlibris.se/*
// @include       http://www.libris.se/*
// @include       http://www.alibris.com/*
// @include       http://bookbyte.com/*
// @include       http://www.bookbyte.com/*
// @include       http://biggerbooks.com/*
// @include       http://www.biggerbooks.com/*
// @include       http://ecampus.com/*
// @include       http://www.ecampus.com/*
// @include       http://www.booksamillion.com/*
// @include       http://print.google.com/*
// @include       http://*.strandbooks.com/*	
// ==/UserScript==

var debug = 0;

// You are welcome either to put your own affiliate codes and dev keys below,
// or to leave them as is, sponsoring further development of this application
var abebooks_aid = 10395338, abebooks_pid = 1814912;
var amazon_associate_code = 'diaryohayou-20';
var amazon_dev_key = '0ZKGXR4GJ7EJES42FT02';
var bn_associate_code = 41532291;
var half_associate_code = 1814912; // (CJ PID, really -- not your CJ account number!)

// Of these, only name, id and bookURL are mandatory (but hostname, getISBN, ajaxURL and ajaxPrice are usually needed too).
// name: book store name listed in burro window
// id: a short unique id string for all document nodes related to this book store
// hostname: a hostname regexp used to determine whether to look for ISBNs on this page
// bookURL: address to link the name to, %s being replaced with the ISBN of the book
// getISBN: function run on book store pages to find the book ISBN it's about; returns false (no book), or an ISBN string
// -- or -- regexp applied to the full URL of the page, whose first matched paren pair gives the ISBN of the book shown
//       -- defaults to /isbn[\/=]([0-9X]{10})(&|\?|\.|$)/i if omitted
// ajaxURL: address to pick up price for the book whose ISBN is %s, for ajax handler (defaults to bookURL, if not given)
// ajaxData: '' by default; if given, the data to provide with the ajax request body, %s replaced with the ISBN of the book
// ajaxMethod: POST by default (if not given); which HTTP method to access the above
// ajaxHeaders: HTTP headers for the AJAX request. Adds a Content-Type: 'application/x-www-form-urlencoded' header for all
//              POST requests missing a content-type declaration.
// ajaxPrice: function run on fetched AJAX page to get book price; returns false (not found) or a price and currency string
//            or an associative array from store id to price and currency string, when one AJAX request can get many prices
//   -- or -- regexp (or string form, the latter mostly useful avoid quoting /:s) whose first paren picks up the book price
//   -- or -- false, in which case no xmlHTTPRequest is ever made (for instance because some other handler finds the price)
// priceFix: if ajaxPrice was a string and this function is provided, the resulting price is fed through the callback
// updateURL: if provided, a function run on the fetched AJAX page, to get a new (or proper) URL for the book link
var handlers = [
  { name: 'Abebooks.com', id: 'abebooks', hostname: /\babebooks.com$/i, getISBN: /(?:isbn|bi)=([0-9X]{10})(&|\?|$)/i,
    bookURL: 'http://www.abebooks.com/servlet/SearchResults?isbn=%s&pid='+ abebooks_pid +'&aid='+ abebooks_aid,
    ajaxPrice: /<span class="price">\D*(\$[^<]*)/i },
  { name: 'AllDirect.com', id:'alldirect', hostname: /\balldirect\.com$/i,
    getISBN: nextTagAfter( 'b', 'ISBN:' ),
    bookURL: 'http://www.alldirect.com/book.asp?&isbn=%s',
    ajaxPrice: 'All Direct\x27s[^P]*Price[^\$]*([^<]*)<' },
  { name: 'Amazon', id: 'amazon', hostname: /\bamazon\.com$/i,
    getISBN: function() {
      if( location.href.match( 'rate-this' ) ) return;
      return location.href.match( /\/([0-9X]{10})(\/|\?|$)/i )[1];
    },
    bookURL: 'http://www.amazon.com/exec/obidos/ASIN/%s/'+ amazon_associate_code,
    ajaxURL: 'http://xml.amazon.com/onca/xml3?t='+ amazon_associate_code +'&dev-t='+ amazon_dev_key +'&type=lite&f=xml&mode=books&AsinSearch=%s',
    ajaxPrice: function( html, http )
    {
      var xml = str2xml( html );
      var our = xml.Details.ListPrice;
      var used = xml.Details.UsedPrice;
      return { amazon: our ,
	  amazon_used: used  };
    } },
  { name: 'Amazon (used)', id: 'amazon_used', ajaxPrice: false,
    bookURL: 'http://www.amazon.com/exec/obidos/redirect?tag='+ amazon_associate_code +'&path=tg/stores/offering/list/-/%s/all/' },
  { name: 'The Strand', id: 'strand', bookURL: 'http://www.strandbooks.com/profile/?isbn=%s',
    hostname: /\bwww\.strandbooks\.com\/profile/,
    //getISBN: function() {
    //  alert(location.href);
    //  return location.href.match( /\/([0-9X]{10})(\/|\?|$)/i )[1];
    //},
    ajaxURL: 'http://www.strandbooks.com/profile/?isbn=%s',
    ajaxPrice: '([^<]*)<br>(save '
   //ajaxPrice: false
   },

  { name: 'NYPL', id: 'nypl_copies', hostname: /\bleopac\.nypl\.org$/i,
    bookURL: 'http://leopac.nypl.org/ipac20/ipac.jsp?menu=search&aspect=numeric&npp=10&ipp=1&spp=30&ri=&index=ISBN&aspect=numeric&term=%s',   
    ajaxURL: 'http://leopac.nypl.org/ipac20/ipac.jsp?menu=search&aspect=numeric&npp=10&ipp=1&spp=30&ri=&index=ISBN&aspect=numeric&term=%s',
    ajaxPrice: function(html, http)
    {
		var reservable =0;
		var hold = 0;
		reservable = html.match('Reservable Copies: \([^<]*\) Number')[1];
		
		holds = html.match('Number of Holds: \([^<]*\)</')[1];
		if(reservable + holds)
        {
			html = reservable;
			if(holds)
			  return html + ' (of ' + (Number(reservable) + Number(holds)) + ')';
			return html + ' in';
        }	 
    }
    },
  { name: 'Barnes & Noble', id: 'bn', hostname: /\bbarnesandnoble\.com$/i,
    bookURL: 'http://service.bfast.com/bfast/click?bfmid=2181&sourceid='+ bn_associate_code +'&bfpid=%s&bfmtype=book',
    ajaxURL: 'http://search.barnesandnoble.com/booksearch/isbninquiry.asp?isbn=%s',
    ajaxPrice: 'priceRightBNPrice[^>]*>([^<]*)</' },
  { name: 'Biblio.com', id: 'biblio', hostname: /\bbiblio\.com$/i,
    bookURL: 'http://www.biblio.com/isbn/%s.html', ajaxMethod: 'GET',
    ajaxPrice: /<td valign="top"><div[^>]*>\s*((?:&#036;|$)\S+)\s*</i },
  { name: 'BiggerBooks.com', id: 'biggerbooks', hostname: /\bbiggerbooks\.com$/i,
    bookURL: 'http://www.dpbolvw.net/click-'+ half_associate_code +'-9467039?ISBN=%s',
    ajaxURL: 'http://www.biggerbooks.com/bk_detail.asp?ISBN=%s', ajaxPrice: /<span class='price'>([^<]+)/ },
  { name: 'Bookbyte', id: 'bookbyte_new', hostname: /\bbookbyte\.com$/i,
    getISBN: function(){ return document.getElementById('lbIsbn').textContent; },
    bookURL: 'http://www.kqzyfj.com/click-'+ half_associate_code +
	     '-10365617?url=http%3A%2F%2Fwww.bookbyte.com%2Fproduct.aspx%3Fisbn%3D%s',
    ajaxURL: 'http://www.bookbyte.com/product.aspx?isbn=%s', ajaxPrice: function( html, http ) {
      var prices = { bookbyte_new: html.match( '<span id="lbNewPrice">(?:<[^>]*>)*([^<]*)' ),
		     bookbyte_used: html.match( '<span id="lbUsedPrice">(?:<[^>]*>)*([^<]*)' ),
		     bookbyte_bazaar: html.match( '<a href="#Bazaar_Bookmark" class=price-red-14>([^<]*)' ) }, i;
      for( i in prices )
	prices[i] = prices[i] ? unHTML( prices[i][1] ).replace( /[^$.0-9]/g, '' ) : '';
      return prices;
    } },
  { name: 'Bookbyte (used)', id: 'bookbyte_used', ajaxPrice: false, bookURL: 'http://www.kqzyfj.com/click-'+ 
    half_associate_code +'-10365617?url=http%3A%2F%2Fwww.bookbyte.com%2Fproduct.aspx%3Fisbn%3D%s' },
  { name: 'Bookbyte (bazaar)', id: 'bookbyte_bazaar', ajaxPrice: false, bookURL: 'http://www.kqzyfj.com/click-'+ 
    half_associate_code +'-10365617?url=http%3A%2F%2Fwww.bookbyte.com%2Fproduct.aspx%3Fisbn%3D%s' },
  { name: 'Booksamillion.com', id: 'bamm', hostname: /\bbooksamillion\.com$/i,
    bookURL: 'http://www.dpbolvw.net/click-'+ half_associate_code +'-42121?isbn=%s', // /<B>Our\s+Price:\s*([^<]+)/i
    ajaxURL: 'http://www.booksamillion.com/ncom/books?type=isbn&find=%s', ajaxMethod: 'GET',
    ajaxPrice: function( html, http ){ return '$' + html.match( /Our\s+Price:\s*\$?([^<]+)/i )[1]; } },
  { name: 'Buy.com', id: 'buy', hostname: /\bbuy\.com$/i,
    getISBN: function(){ return document.title.match( /ISBN ([0-9X]{10})/i )[1]; },
    bookURL: 'http://www.buy.com/retail/GlobalSearchAction.asp?qu=%s',
    ajaxPrice: 'Your Price: </b></td><td align="right"><b style="font-size:16px; color:#cc0000">([^<]*)</b>'
    },
  { name: 'eCampus.com', id: 'ecampus', hostname: /\becampus.com$/i,
    bookURL: 'http://www.anrdoezrs.net/click-'+ half_associate_code +'-5029466?ISBN=%s',
    ajaxURL: 'http://www.ecampus.com/bk_detail.asp?ISBN=%s', ajaxPrice: /Our\s+Price\s*<font[^>]*>([^<]+)/i },
  { name: 'Google Print', id: 'googleprint', hostname: /print\.google\.com$/i,
    bookURL: 'http://print.google.com/print?as_isbn=%s',
    getISBN: function() {
      var re = new RegExp( 'https?://www.google.com/pagead/ads\\?.*' +
			   '&channel=[^&]*BTB-ISBN:([0-9X]{10})', 'i' );
      return firstDocumentLinkMatching( re, 1 );
    }, updateURL: firstLinkTo( 'http://print.google.com/print?', '' ),
    ajaxPrice: function( html, http ) {
      var re = new RegExp( '<a(?:[^>]*) href=["\']?' +
			   'https?://print.google.com/print\\?' +
			   '[^"\']*&sig=', 'i' );
      return html.match( re ) != null;
    } },
  { name: 'Half.com', id: 'half', hostname: /\bhalf\.ebay\.com$/i,
    getISBN: nextTagAfter( 'b', 'ISBN:' ),
    bookURL: 'http://www.kqzyfj.com/click-'+ half_associate_code +'-1932276?ISBN=%s',
    ajaxURL: 'http://half.ebay.com/search/search.jsp?product=books:isbn&query=%s',
    ajaxPrice: 'Best[^P]*Price[^$]*([^<]*)<' },
 { name: 'Brooklyn Library', id: 'bklyn',
   bookURL: 'http://catalog.brooklynpubliclibrary.org/search/i%s/i%s/1,1,1,E/holdings&FF=i%s&1,0,',
   ajaxURL: 'http://catalog.brooklynpubliclibrary.org/search/i%s/i%s/1,1,1,E/holdings&FF=i%s&1,0,',
   ajaxPrice: function( html, http)
   {
     var book, bookin = 0, bookout = 0;
     while( book = /<td width="24%" > <!-- field % -->&nbsp; (.*?)<\/td>/gi.exec( html ))
     {
       if(book[1].match(/CHECK SHELVES/i) ){
         
         bookin++;}
       else
         bookout++;
     }
     if(bookin + bookout)
     {
			html = bookin;
			if(bookout)
			  return html + ' (of ' + (bookin + bookout) + ')';
			return html + ' in';
    }
   } },
  { name: 'Powell\'s Books', id: 'powells', hostname: /\bpowells.com$/i,
    getISBN: function()
    {
      var dt = document.getElementsByTagName( 'dt' ), i;
      for( i=0; i<dt.length; i++ )
	if( dt[i].innerHTML.match( 'ISBN:' ) &&
	    checkISBN( dt[i].nextSibling.title ) )
	  return dt[i].nextSibling.title;
    },
    bookURL: 'http://www.powells.com/cgi-bin/biblio?isbn=%s',
    ajaxPrice: '<div class="price">([^<]*)<' }
  ];

var hasFetched = false;

var Icons =
{
  title: 'data:image/gif;base64,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',
  about: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDkprC+64gAAAOdJREFUKM+FkrFOAkEURc9ddrJZCgsqCwtCIiUFJa2df2CwNXRS8AmGisLEaGGs3VhTYDUtxZaED/AriGHjPhuEDC5wq3l5czL3vjeyzBlHtC6KoI4BuPk8Qqx3549rov3+YPBIp3NHq3VLlnkkBf0AWK2+6fevWCze8H7CaPRKUfzgnKsG0jSh272kLEuWyy/a7QvSNKnIsJEk6vWE2SxnPH5nOn3YWopjh9VqIbDBGA5fyPNnGo2znZVIEEWhJTNDgmbzfHvZzA6H/pP3k3/TqQQkIYle7z6oT74wnz8d3KNOfY19/QKFiTrWqbiPtAAAAABJRU5ErkJggg==',
  carrotRight: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCR020Q08hgAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAiklEQVQY07XPIQoCURSF4e8NAzYxGicNuAa1WlyCO3AlZnfiNgwahQFxikkcBIsGfaZpzgODJ/4c/nMvPyR8g7EsephgH6q6aXnWIelhjkUsi0EL88TqFUfMYlnscMoS5wUccMYS4yxhfuGNPho88oQ5xxQjrHHpKkcMccMqVPU99eATG2zb4n/zAS4OHrV1hIB/AAAAAElFTkSuQmCC',
  carrotDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCRoeq/kCuwAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAmElEQVQY083QMUoDARSE4W92U2xhkxSpAgY0AXMQ29zCM3iSXEXQTrCws44Im85CkO1jnq2KKQWnGxiY+Yd/oXw1tTrr7D86CYdD5Xk3HA8vTi8la7xW1T5Jg8IEN6PvPXnEAkOa5l5Viwuc4yk/d9VyfoLrqnpIMmCGu2z79/wGUsv5FFcYY5Nt/wKjI+BvuEWnbfu///kTargo75QVC5oAAAAASUVORK5CYII=',
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDcSg6d+SAAAAPBJREFUKM+Fkr1qAkEURs9dnWBrJT5IHkEw4gtEsBQs/AlpkiKlJGnEJlqIjRbrPoAQYhPio1hGsPAHFoW5KSIxo7J7qvlgDty534j6Rolgt987OQnA7XuEsTuegwIeMYiIkx2hVnsjCL7+su9/0mz2Lox0oNOpUiw+kc2mUVWGww8mkxYiYK09F4xJMho9kMs9IiJMpy8Y83vFWkUTCVcAWCxWLJcrRIT1OiSTOczuCXieK2y3IeXyK4PBPZtNSKn0zGzWJpW6uvyGer1LpVIgn78GYD7/ptHo0e/fHbemvtHIHv4zvonv4ayXuK9xyg8qt0tfe9qKPAAAAABJRU5ErkJggg=='
};

function quoteRegExp( re )
{
  return re.replace( /([.*+^$?(){}\[\]\\])/g, '\\$1' );
}

function regexpify( stringOrRegExp, flags, quote )
{
  if( (typeof stringOrRegExp == 'function') && stringOrRegExp.exec )
    return stringOrRegExp;
  if( quote ) stringOrRegExp = quoteRegExp( stringOrRegExp );
  return new RegExp( stringOrRegExp, flags );
}

function firstDocumentLinkMatching( re, paren )
{
  var x, i;
  for( i=0; i<document.links.length; i++ )
    if( (x = re.exec( document.links[i].href )) )
      return x[paren]; // should perhaps backtrack up to parent TR, get its
  // previous sibling and verify that its contentText == 'Buy this Book'
}

// AJAX callback returning the first <a href="..."> link to a page whose URL starts with `url'.
// baseURL is prepended to the returned result, so passing "/search?" and "http://example.com"
// might yield a link to "http://example.com/search?isbn=0596000480", if the page contained it.
function firstLinkTo( url, baseURL )
{
  return function( html, http )
  {
    return baseURL + unHTML(html.match( '<a(?:[^>]*) href=["\']?('+ quoteRegExp( url ) +'[^\'" >]*)' )[1]);
  };
}

function nextTagAfter( tag, content )
{
  return function()
  {
    var tags = document.getElementsByTagName( tag ), i, node, isbn;
    for( i=0; i<tags.length; i++ )
      if( tags[i].innerHTML.match( content ) )
	for( j=tags[i].nextSibling; j=j.nextSibling; )
	  if( (isbn = j.textContent.replace( /-/g, '' ).match( /[0-9X]{10}/i )) )
	    return isbn[0];
  };
}

function nextSameTagAfter( tag, content )
{
  return function()
  {
    var isbn, i, tags = document.getElementsByTagName( tag );
    for( i=0; i<tags.length-1; i++ )
      if( tags[i].innerHTML.match( content ) &&
	  (isbn = tags[i+1].innerHTML.match( /[0-9X]{10}/i )) &&
	  (isbn = checkISBN( isbn && isbn[0] )) )
	return isbn;
  };
}

function unHTML( html )
{
  return html.replace( /&(amp|lt|gt|quot|apos|#(\d+));/g, function( match, character, code )
  {
    return { amp:'&', lt:'<', gt:'>', quot:'"', apos:'\'' }[character] || String.fromCharCode( code );
  });
}

function SEK( price ){ return price.replace( /:-|kr| /gi, '' ) +' SEK'; }

// document.getElementById() on steroids (ask for several ids, and you get them back as an array)
function $( ids, doc )
{
  if( typeof ids == 'string' )
    return (doc || document).getElementById( ids );
  for( var i=0; i<ids.length; i++ )
    ids[i] = (doc || document).getElementById( ids[i] );
  return ids;
}

// price cache since last seen book, one day expiry time
var last_isbn = GM_getValue( 'last_isbn', '' );
//GM_setValue( 'last_run', '0' );
var last_run = GM_getValue( 'last_run', '0' );
var last_prices = GM_getValue( 'last_prices', '' );
//alert( 'last_run:'+last_run+'\nsaved:\n\n' + last_prices );

function getPrices( isbn )
{
  var now = (new Date).getTime();
  //alert( isbn +':'+ last_isbn +'\n'+ (now-parseInt( last_run )) +'\n' + last_prices );
  if( (isbn != last_isbn) || (now-parseInt( last_run ) > 36e5) ||
      (last_prices.split( '\n' ).length != handlers.length) ) return false;
  return decodePrices( last_prices );
}

var prices = {};
function updateCache( isbn, store, price )
{
  var now = (new Date).getTime(), got = 0, i, h;
  if( (isbn != last_isbn) || (now - parseInt( last_run ) > 864e5) )
    prices = {};
  last_isbn = isbn;
  last_run = now.toString();
  prices[store] = price;
  for( i in prices ) got++;
  if( got == handlers.length )
  {
    //alert( encodePrices( prices ) );
    GM_setValue( 'last_prices', last_prices = encodePrices( prices ) );
    GM_setValue( 'last_isbn', isbn );
    GM_setValue( 'last_run', last_run );
  }
  else
    ;//alert( got +'/' + handlers.length );
}

function decodePrices( stored )
{
  var prices = {}, i, raw = (stored||'').split( '\n' );
  for( i=0; i<raw.length; i++ )
  {
    var data = raw[i].split( ':' );
    prices[data.shift()] = data.join( ':' );
  }
  return prices;
}

function encodePrices( prices )
{
  var i, raw = [];
  for( i in prices )
    raw.push( i +':'+ prices[i] );
  return raw.join( '\n' );
}

function updatePrices( prices, isbn )
{
  var id, node, price, data, errmsg = 
    'Oops! Either there are no books available,\\n' +
    'or there is a parsing error due to changes\\n' +
    'in to this website\\\'s page format.';
  for( id in prices )
    if( (node = document.getElementById( 'burro_'+id )) )
    {
      if( debug ) GM_log( id +' price set to '+ prices[id] );
      data = (prices[id] || '').split( ':' );
      if( (price = data.shift()) )
      {
	node.firstChild.nodeValue = price;
	if( data.length )
	  updateURL( id, data.join( ':' ) );
      }
      else
	node.innerHTML = '<a style="text-decoration:none;color:#00A;" href="javascript:alert(\''+ errmsg +'\');">none</a>';
      if( isbn )
	updateCache( isbn, id, price );
    }
}

function findHeader( headers, name )
{
  var i, found;
  name = regexpify( name, 'i', 'quote' );
  for( i in headers )
    if( i.match( name ) )
      return headers[i];
}

function runQueries( isbn )
{
  var i, j, h, request, callback, prices = debug ? false : getPrices( isbn );
  if( prices ) return updatePrices( prices ); // already cached
  for( i=0; i<handlers.length; i++ )
  {
    h = handlers[i];
    if( h.ajaxPrice != false )
    {
      if( debug )
	GM_log( h.id +': '+ (h.ajaxMethod||'POST')+'( '+(h.ajaxURL||h.bookURL) + ' )' );
      request = { method:h.ajaxMethod||'POST', data:(h.ajaxData||'').replace( /%s/g, isbn ),
		  onload:makeAjaxCallback( h, isbn ), url:(h.ajaxURL||h.bookURL).replace( /%s/g, isbn ) };
      if( h.ajaxHeaders ) request.headers = h.ajaxHeaders;
      if( (request.method == 'POST') && !findHeader( request.headers = request.headers || {}, 'Content-Type' ) )
	request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      GM_xmlhttpRequest( request );
    }
  }
}

function updateURL( id, url )
{
  document.getElementById( 'burro_book_' + id ).href = url;
}

function makeAjaxCallback( handler, isbn )
{
  var callback = handler.ajaxPrice;
  switch( typeof callback )
  {
    case 'function':
      if( !callback.exec )
	break; // callback is already our proper callback
      // fall-through -- it was a regexp:

    case 'string':
      callback = function( html, http )
      {
	var x = html.match( handler.ajaxPrice );
	var price = html.match( handler.ajaxPrice )[1].replace( /&nbsp;/g, '' );
	if( debug > 2 ) GM_log( 'found raw '+ handler.id +'price '+ price );
	if( price ) price = unHTML( price );
	if( price && handler.priceFix ) price = handler.priceFix( price );
	return price;
      };
      break;

    case 'object': // array of string or regexp
      callback = function( html, http )
      {
	var i, price, regexps = handler.ajaxPrice;
	for( i=0; i<regexps.length; i++ )
	  if( (price = html.match( regexps[i] )) )
	  {
	    price = price[1];
	    if( debug > 2 ) GM_log( 'found raw '+ handler.id +' price '+ price +' for regexp '+ regexps[i] );
	    if( price && handler.priceFix ) price = handler.priceFix( price );
	    return price;
	  }
      };
      break;

    default:
      alert( 'Price handler for '+ handler.name +' (id '+ handler.id +
	     ') is of illegal type '+ (typeof callback) +'! Ignoring.' );
      // fall-through:

    case 'boolean':
      callback = function(){};
  }
  return function( xmlHttpResponse )
  {
    if( debug ) with( xmlHttpResponse )
      GM_log( 'Status ' + status+' '+statusText + ': '+ responseText.length +' bytes' );
    var failure = false, prices = {}, result = '', node, id, price;
    try {
      result = callback( xmlHttpResponse.responseText, xmlHttpResponse ) || '';
    } catch (e) {
      failure = true;
      if( debug )
	GM_log( 'Failed to load or parse '+ handler.name +' (id '+ handler.id +'): ' +e );
      //alert( xmlHttpResponse.responseText );
    }
    if( handler.updateURL )
    try {
      var url = handler.updateURL( xmlHttpResponse.responseText, xmlHttpResponse );
      if( url )
	updateURL( handler.id, url );
    } catch( e ) {}
    if( typeof result == 'string' ) // a price tag
    {
      if( url ) result += ':' + url; // a new book URL to link
      prices[handler.id] = result;
    }
    else if( typeof result == 'boolean' ) // availability info only
    {
      if( url ) result += ':' + url; // a new book URL to link
      prices[handler.id] = result ? 'available' : 'unavailable';
    }
    else
      prices = result;
    updatePrices( prices, isbn );
  };
}

function checkEAN( ean )
{
  try {
    ean = (ean||'').replace( /-| |&nbsp;/gi, '' );
    if( ean.length != 13 ) return false;
    var checksum = 0;
    for( var i=0; i<12; i++ )
      checksum += ean.charAt(i) * (i&1 ? 3 : 1);
    checksum = (10 - (checksum % 10)) % 10;
    if( ean.charAt(12) == checksum )
      return ean;
    else
    {
      if( debug ) GM_log( 'EAN '+ean+ ' failed checksum.' );
      return false;
    }
  }
  catch (e)
  { 
    if( debug ) GM_log( 'checkEAN: '+ e );
    return false;
  }
}

function checkISBN( isbn )
{
  try {
    isbn = (isbn||'').toLowerCase().replace( /-| |&nbsp;/g, '' );
    if( isbn.length != 10 ) return false;
    var checksum = 0;
    for( var i=0; i<9; i++ )
      if( isbn.charAt(i) == 'x' )
        checksum += 10 * (i+1);
      else
        checksum += isbn.charAt(i) * (i+1);
    checksum = checksum % 11;
    if( checksum == 10 ) checksum = 'x';
    if( isbn.charAt(9) == checksum )
      return isbn;
    else
    {
      if( debug ) GM_log( 'ISBN '+isbn+ ' failed checksum.' );
      return false;
    }
  }
  catch (e)
  { 
    if( debug ) GM_log( 'checkISBN: '+ e );
    return false;
  }
}

function dom_createLink( url, txt, title, id )
{
  var a  = document.createElement( 'a' );
  if( id ) a.id = id;
  a.setAttribute( 'target', '_top' );
  a.setAttribute( 'href', url );
  with( a.style )
  {
    color = '#00A';
    textDecoration = 'none';
    fontWeight = 'bold';
  }
  if( title ) a.setAttribute( 'title', title );
  a.appendChild( document.createTextNode( txt ) );
  return a;
}

function addSite( url, title, loc_id )
{
  var tr = document.createElement( 'div' );
  var td_left = document.createElement( 'span' );
  var a = dom_createLink( url, title, title+' Search', 'burro_book_'+loc_id );
  td_left.style.paddingLeft = '5px';
  td_left.appendChild( a );
  tr.appendChild( td_left );

  var td_right = document.createElement( 'span' );
  td_right.innerHTML = 'fetching';
  td_right.style.paddingRight = '5px';
  td_right.id = 'burro_' + loc_id;
  tr.appendChild( td_right );

  if( document.all ) // IE only
  {
    tr.style.position = 'relative';
    td_right.style.textAlign = 'right';
    td_right.style.position = 'absolute';
    td_right.style.left = '10em';
    td_right.style.width = '4em';
  }
  else // other browsers
  {
    tr.style.display = 'table-row';
    td_left.style.display = 'table-cell';
    td_right.style.display = 'table-cell';
  }
  return tr;
}

function str2xml( strXML )
{
  //if( window.ActiveXObject )
  //{
  //  var domdoc = new ActiveXObject( 'Microsoft.XMLDOM' );
  //  domdoc.async = 'false';
  //  domdoc.loadXML( strXML );
  //  return domdoc;
  //}
  //else
  //{
  //alert(strXML);
  //E4X hates xml declarations for some reason.
	var xml = new XML(strXML.replace(/<\?xml.*?\?>/g, ""));
	return xml;
    //var xml = new XML(strXML);
    
    //alert(xml.ProductInfo);
    //alert(xml.Details.ListPrice);
    //var objDOMParser = new XPCNativeWrapper(window, "DOMParser");
    //return objDOMParser.parseFromString( strXML, 'text/xml' );
  //}
}

function int2money( cents )
{
  var money = '$'
  if( cents < 100 )
    money = money + '0.';
  else
    money = money + Math.floor( cents/100 ) + '.';
  cents = cents % 100;
  if( cents < 10 )
    money = money + '0';
  money = money + cents;
  return money;
}

var Drag = function(){ this.init.apply( this, arguments ); };

Drag.fixE = function( e )
{
  if( typeof e == 'undefined' ) e = window.event;
  if( typeof e.layerX == 'undefined' ) e.layerX = e.offsetX;
  if( typeof e.layerY == 'undefined' ) e.layerY = e.offsetY;
  return e;
};

Drag.prototype.init = function( handle, dragdiv )
{
  this.div = dragdiv || handle;
  this.handle = handle;
  if( isNaN(parseInt(this.div.style.right )) ) this.div.style.right  = '0px';
  if( isNaN(parseInt(this.div.style.bottom)) ) this.div.style.bottom = '0px';
  this.onDragStart = function(){};
  this.onDragEnd = function(){};
  this.onDrag = function(){};
  this.onClick = function(){};
  this.mouseDown = addEventHandler( this.handle, 'mousedown', this.start, this );
};

Drag.prototype.start = function( e )
{
  // this.mouseUp = addEventHandler( this.handle, 'mouseup', this.end, this );
  e = Drag.fixE( e );
  this.started = new Date();
  var y = this.startY = parseInt(this.div.style.bottom);
  var x = this.startX = parseInt(this.div.style.right);
  this.onDragStart( x, y );
  this.lastMouseX = e.clientX;
  this.lastMouseY = e.clientY;
  this.documentMove = addEventHandler( document, 'mousemove', this.drag, this );
  this.documentStop = addEventHandler( document, 'mouseup', this.end, this );
  if( e.preventDefault ) e.preventDefault();
  return false;
};

Drag.prototype.drag = function( e )
{
  e = Drag.fixE( e );
  var ey = e.clientY;
  var ex = e.clientX;
  var y = parseInt(this.div.style.bottom);
  var x = parseInt(this.div.style.right );
  var nx = x - ex + this.lastMouseX;
  var ny = y - ey + this.lastMouseY;
  this.div.style.right	= nx + 'px';
  this.div.style.bottom	= ny + 'px';
  this.lastMouseX	= ex;
  this.lastMouseY	= ey;
  this.onDrag( nx, ny );
  if( e.preventDefault ) e.preventDefault();
  return false;
};

Drag.prototype.end = function()
{
  removeEventHandler( document, 'mousemove', this.documentMove );
  removeEventHandler( document, 'mouseup', this.documentStop );
  var time = (new Date()) - this.started;
  var x = parseInt(this.div.style.right),  dx = this.startX - x;
  var y = parseInt(this.div.style.bottom), dy = this.startY - y;
  this.onDragEnd( x, y, dx, dy, time );
  if( (dx*dx + dy*dy) < (4*4) && time < 1e3 )
    this.onClick( x, y, dx, dy, time );
};

function removeEventHandler( target, eventName, eventHandler )
{
  if( target.addEventListener )
    target.removeEventListener( eventName, eventHandler, true );
  else if( target.attachEvent )
    target.detachEvent( 'on' + eventName, eventHandler );
}

function addEventHandler( target, eventName, eventHandler, scope )
{
  var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
  if( target.addEventListener )
    target.addEventListener( eventName, f, true );
  else if( target.attachEvent )
    target.attachEvent( 'on' + eventName, f );
  return f;
}

function burro( location, isbn )
{
  if( debug > 1 ) GM_log( 'adding burro' );
  var handle = document.createElement( 'div' );
  var root = document.createElement( 'div' );
  var box = document.createElement( 'div' ), i, h;
  with( root.style )
  {
    position = 'absolute';
    top = right = '15px';
  }
  handle.style.padding = '4px';
  handle.title = 'Click title to expand, collapse or drag';
  with( box.style )
  {
    position = 'relative';
    zIndex = '1000';

    backgroundColor = '#FFC';
    border = '1px solid orange';
    padding = '0px';
    textAlign = 'left';
    font = '8pt sans-serif';
    width = '220px';
    marginBottom = '15px';

    opacity = '0.93';
    filter = 'alpha(opacity=90)';
  }

  var carrot = document.createElement( 'img' );
  carrot.style.top = '-10px';
  carrot.src = Icons.carrotRight;
  carrot.id = 'hide_show_carrot';
  handle.appendChild( carrot );

  var title_image = document.createElement( 'img' );
  title_image.style.marginLeft = '6px';
  title_image.src = Icons.title;
  handle.appendChild( title_image );

  var close = document.createElement( 'img' );
  close.src = Icons.close;
  with( close.style )
  {
    position = 'absolute';
    right = '3px';
    top = '3px';
    margin = '2px';
    width = '12px';
    height = '12px';
    backgroundColor = '#FFB';
    border = 'none';
    lineHeight = '8px';
    textAlign = 'center';
  }
  close.setAttribute( 'title', 'Click to remove' );
  addEventHandler( close, 'click', function(){ document.body.removeChild( root ); } );
  handle.appendChild( close );

  var about = document.createElement( 'a' );
  var about_img = document.createElement( 'img' );
  about_img.src = Icons.about;
  about_img.style.border = 'none';
  about.appendChild( about_img );
  with( about.style )
  {
    position = 'absolute';
    right = '18px';
    top = '3px';
    margin = '2px';
    width = '12px';
    height = '12px';
    backgroundColor = '#FFB';
    lineHeight = '12px';
    textAlign = 'center';
    textDecoration = 'none';
  }
  about.title = 'OverStimulate / modified by Reify and Johan SundstrÃ¶m';
  about.href = 'http://overstimulate.com/articles/2005/04/24/greasemonkey-book-burro-find-cheap-books';
  handle.appendChild( about );
  box.appendChild( handle );

  var table = document.createElement( 'div' );
  with( table.style )
  {
    marginTop = '1px';
    marginBottom = '3px';
    padding = '0';
    width = '100%';
    //font = '10pt sans-serif';
    display = 'none';
  }
  table.id = 'bookburro-pricesTable';
  for( i=0; i<handlers.length; i++ )
  {
    h = handlers[i];
    table.appendChild( addSite( h.bookURL.replace( /%s/g, isbn ), h.name, h.id ) );
  }
  box.appendChild( table );

  var zip = function()
  {
    box.opened = !box.opened;
    var pricesTable = document.getElementById( 'bookburro-pricesTable' );
    var carrot = document.getElementById( 'hide_show_carrot' );
    if( box.opened ) // pricesTable.style.display == 'none'
    {
      if( !hasFetched ) runQueries( isbn );
      hasFetched = true;
      pricesTable.style.display = document.all ? 'block' : 'table';
      carrot.src = Icons.carrotDown;
    }
    else
    {
      pricesTable.style.display = 'none';
      carrot.src = Icons.carrotRight;
    }
  };
  //addEventHandler( box, 'click', zip );
  root.appendChild( box );
  document.body.appendChild( root );
  handle.drag = new Drag( handle, box );
  handle.drag.onClick = zip;
  if( debug > 1 ) GM_log( 'added burro' );
}

function init()
{
  var i, h, getISBN, isbn;
  for( i=0; i<handlers.length; i++ )
  {
    h = handlers[i];
    if( h.hostname && location.hostname.match( h.hostname ) )
      try {
	if( debug ) GM_log( h.name +' matched at '+ location.hostname );
	getISBN = h.getISBN || /isbn[\/=]([0-9X]{10})(&|\?|\.|$)/i;
	switch( typeof getISBN )
	{
	  case 'string':
	    getISBN = new RegExp( getISBN );
	    // fall-through
	  case 'function':
	    if( getISBN.exec ) // a regexp
	    {
	      var regexp = getISBN;
	      getISBN = function(){ return location.href.match( regexp )[1]; };
	    }
	    isbn = getISBN();
	    break;

	  default:
	    alert( 'getISBN handler for '+ h.name +' (id '+ h.id +
		   ') is of illegal type '+ (typeof getISBN) +'! Ignoring.' );
	    continue;
	}
	if( (isbn = checkISBN( isbn )) )
	  burro( h.id, isbn );
	else if( debug )
	  GM_log( 'Failed to find ISBN for '+ h.name +' (id '+ h.id +')' );
      } catch (e) { if( debug ) GM_log( e ); }
  }
}

// addEventHandler(document, 'load', init);
init();
