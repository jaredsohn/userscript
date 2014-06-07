// BookInfoLine Ajax Panel for GreaseMonkey and Turnabout
// @version 1.1.5
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
/*

--------------------------------------------------------------------
This is a Greasemonkey user script.  
To install it, you need Greasemonkey Add-on for Firefox: https://addons.mozilla.org/en-US/firefox/addon/748 or Turnabout for Internet Explorer.
Then restart Firefox and revisit this script. Under Tools, there will be a new menu item to "Install User Script". Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts, select "BookInfoLine", and click Uninstall.
--------------------------------------------------------------------

Modified by LitteBirdie.
If you have comment, suggestion, improvements, requests for updates please email to: LitteBirdie@gmail.com
We use this script all the time and if you notice that one or more sites are not working properly due to internal code changes 
please comeback here and most likely you would find a fixed version. 

Original from "Book Burro - Remixing the bookstore" By Johan Sundström (http://userscripts.org/scripts/show/1859)

Reason For Update:

"Book Burro - Remixing the bookstore" was such a helpful script, but it has not been working for a while. 
So here is new and improved working version.

Fixed, New Features, Improved:

Fixed: All price are now properly extracted.
Included new reliable sources for books: Ebay.com, Walmart.com, Craigslist.com, Strandbooks.com, Betterworldbooks.com, Borders.com, Thriftbooks.com, Ebooks.com and Kindle Editions.

Removed all useless sites like: ecampus.com, bookbyte.com, bookpool.com, biggerbooks.com, buy.com, a1books.com, booksamillion.com, biggerbooks.com, etc...

Following sites are now being searched:
Abebooks.com
Alibris.com
Amazon.ca
Amazon.co.uk
Amazon.com
Amazon.de
Amazon.fr
Barnesandnoble.com
Betterworldbooks.com
Biblio.com
Borders.com
Craigslist.com
Ebay.com
Ebooks.com
Google Books
Half.com
Kindle Editions
Powells.com
Strandbooks.com
Thriftbooks.com
Walmart.com

 (C) 2005 WSKTB (0.19)
 License: Creative Commons "Attribution-ShareAlike 2.0"
 http://creativecommons.org/licenses/by-sa/2.0/

 (C) 2005 Johan Sundström (0.13 .. 0.18)
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

*/

// ==UserScript==
// @name          BookInfoLine
// @description   Compare book prices from various book stores. Abebooks.com, Alibris.com, Amazon.ca, Amazon.co.uk, Amazon.com, Amazon.de, Amazon.fr, Barnesandnoble.com, Betterworldbooks.com, Biblio.com, Borders.com, Craigslist.com, Ebay.com, Ebooks.com, Google Books, Half.com, Kindle Editions, Powells.com, Strandbooks.com, Walmart.com
// @include       http://*amazon.com/*
// @include       http://*amazon.co.uk/*
// @include       http://*amazon.de/*
// @include       http://*amazon.ca/*
// @include       http://*amazon.fr/*
// @include       http://product.half.ebay.com/*
// @include       http://*abebooks.com/*
// @include       http://*alibris.com/*
// @include       http://*barnesandnoble.com/*
// @include       http://*.betterworldbooks.com/*
// @include       http://*biblio.com/*
// @include       http://*borders.com/*
// @include       *
// @include       http://*.powells.com/*
// @include       http://*.strandbooks.com/*	
// @include       http://*.thriftbooks.com/*	
// @include       http://catalog.ebay.com/*
// @include       http://books.google.com/*
// @include       http://*.google.com/*	

// ==/UserScript==

var debug = true;


// Of these, only name, id and bookURL are mandatory (but hostname, getISBN, ajaxURL and ajaxPrice are usually needed too).
// name: book store name listed in infoline window.
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

var Icons =
{

  title: 'data:image/gif;base64,R0lGODlhnwASALMAAHucoM7ave/zyUp3jt7mw2uPmpy1rCleg73NuK3BsjlqiYyoplqDlBhRfQhFd///zyH5BAAAAAAALAAAAACfABIAAAT/8MlJq7046827/2AojomTjFVyOE6AvnDcMFnJsscCl2cF3K2NoAHg/FyVhiK2WDkGhJhnVnPoJAWH4cXDUDkLR3RztChhg8b2kRhcpZrvpfQmOApck5dmdAj6SHASBlY+gYJmfHOFEnZ4EgEDLAo9EgsNLI9seg8EBwp/D3JhCQwsA38/NzQCWQ4Nb2UVCnwMDW2ZFLgOlJacFwSmr282wxO2ka+WTgpbM00saxJ0EwMHYwQNA75rBbedCkubJwLhoaKKYb2efD/n4VEJDY+yFLQSplCbVwh3WA1R+umzIOAAqgeE1gxYQ+iKrYEPAKixVAQTvSDTgLAAMKbAAQrW/zoxetBvC49yoCiMwvjAmwR3g1iGiVJvwr0HtigYlPBJ5cVJAKR5OxfSgoJtOBtQsPNmghymE6g1ShPlgKIHMwkdmjduQEqV6VjChNlS6YSSEVnarGVWQjiRTd82AiDxFE+kL/10AqDghricEwghSDRBgIMiGZv20yEHa4swW2mUsEjYV6CxepNSCFCoplu29pZw1sgLgyRnpP0IvCIXsOXKDwwj3kfBMA2rFLKq5VrCzeEkYS/rJevyrJa0hz7ja/vgLeemGjhXvHqMeWvmYQYDL/w7MYXFLT9W+whVAtouWZquFJ4qs9YJM5EbBW1THG4LCypl3MJAfIWibv3F3JpzsMkW1UgJKHDAH9kgFUY33xAgVxc4/bLeBJi9o0A8XMk3C30BxqQJAI8UwAASBuzUiTZjLLANKbGZImAF3qyxAB5yGJiRRgCckwwv+l2SS0aVpJGAKiy4ABmGw2UWmyuwMKmRUje51pw4bEhyijQ/5rCUK7xcoUoz1+GHCS/OKKIjImy26eabcMYp55x01mnnnXjmqeeeeUYAADs=',
  about: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDkprC+64gAAAOdJREFUKM+FkrFOAkEURc9ddrJZCgsqCwtCIiUFJa2df2CwNXRS8AmGisLEaGGs3VhTYDUtxZaED/AriGHjPhuEDC5wq3l5czL3vjeyzBlHtC6KoI4BuPk8Qqx3549rov3+YPBIp3NHq3VLlnkkBf0AWK2+6fevWCze8H7CaPRKUfzgnKsG0jSh272kLEuWyy/a7QvSNKnIsJEk6vWE2SxnPH5nOn3YWopjh9VqIbDBGA5fyPNnGo2znZVIEEWhJTNDgmbzfHvZzA6H/pP3k3/TqQQkIYle7z6oT74wnz8d3KNOfY19/QKFiTrWqbiPtAAAAABJRU5ErkJggg==',
  carrotRight: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCR020Q08hgAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAiklEQVQY07XPIQoCURSF4e8NAzYxGicNuAa1WlyCO3AlZnfiNgwahQFxikkcBIsGfaZpzgODJ/4c/nMvPyR8g7EsephgH6q6aXnWIelhjkUsi0EL88TqFUfMYlnscMoS5wUccMYS4yxhfuGNPho88oQ5xxQjrHHpKkcMccMqVPU99eATG2zb4n/zAS4OHrV1hIB/AAAAAElFTkSuQmCC',
  carrotDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCRoeq/kCuwAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAmElEQVQY083QMUoDARSE4W92U2xhkxSpAgY0AXMQ29zCM3iSXEXQTrCws44Im85CkO1jnq2KKQWnGxiY+Yd/oXw1tTrr7D86CYdD5Xk3HA8vTi8la7xW1T5Jg8IEN6PvPXnEAkOa5l5Viwuc4yk/d9VyfoLrqnpIMmCGu2z79/wGUsv5FFcYY5Nt/wKjI+BvuEWnbfu///kTargo75QVC5oAAAAASUVORK5CYII=',
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDcSg6d+SAAAAPBJREFUKM+Fkr1qAkEURs9dnWBrJT5IHkEw4gtEsBQs/AlpkiKlJGnEJlqIjRbrPoAQYhPio1hGsPAHFoW5KSIxo7J7qvlgDty534j6Rolgt987OQnA7XuEsTuegwIeMYiIkx2hVnsjCL7+su9/0mz2Lox0oNOpUiw+kc2mUVWGww8mkxYiYK09F4xJMho9kMs9IiJMpy8Y83vFWkUTCVcAWCxWLJcrRIT1OiSTOczuCXieK2y3IeXyK4PBPZtNSKn0zGzWJpW6uvyGer1LpVIgn78GYD7/ptHo0e/fHbemvtHIHv4zvonv4ayXuK9xyg8qt0tfe9qKPAAAAABJRU5ErkJggg=='
};

var handlers = [

	{ name: 'Amazon.com', id: 'amazon', hostname: /\bamazon\.com$/i,
    getISBN: function() {
      if( location.href.match( 'ships-from' ) ) return;
      return location.href.match(/\/([0-9X]{10})(\/|\?|$)/i)[1];
    },
	bookURL: 'http://www.amazon.com/gp/offer-listing/%s/?tag=utf8back-20&sort=price',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=amazon&isbn=%s',
	ajaxPrice: '<span class="price">([^<]*)<' 
  },

	{ name: 'Abebooks', id: 'abebooks', hostname: /\bwww\.abebooks\.com$/i, 
    getISBN: function(){ return document.title.match( /([0-9X]{10})/i )[1]; },
	bookURL: 'http://www.abebooks.com/servlet/SearchResults?isbn=%s&sortby=2',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=abebooks&isbn=%s',
	ajaxPrice: '<span class="price" property="price">US([^<]*)<'
	//ajaxPrice: '<span class="price">US([^<]*)<'
	},

	{ name: 'Half.com', id: 'half', hostname: /\bhalf\.ebay\.com$/i,
	getISBN: nextTagAfter( 'b', 'ISBN-10:' ),
    bookURL: 'http://freebookexchange.org/amazon/search/index.php?site=half&isbn=%s',
    ajaxURL: 'http://search.half.ebay.com/ws/web/HalfSearch?m=books&isbn=%s&submit=Search',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=half&isbn=%s',
    ajaxPrice: 'BEST PRICE[^$]*([^<]*)<' 
	},

	{ name: 'Ebay', id: 'ebay', hostname:  /\bcatalog\bebay\.com$/i,
    getISBN: /\b(?:[\d]-?){9}[\dxX]\b/i,
	bookURL: 'http://search.ebay.com/ws/search/SaleSearch?sofocus=bs&satitle=%s&_clu=2',
    ajaxURL: 'http://search.ebay.com/ws/search/SaleSearch?sofocus=bs&satitle=%s&_clu=2',
	ajaxMethod: 'GET',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=ebay&isbn=%s',
	ajaxPrice: '<strong class="pricespan">[^$]*([^<]*)<'
    //    ajaxPrice: '<span class="price">[^$]*([^<]*)<'
	},

	{ name: 'Alibris', id: 'alibris', hostname: /\balibris\.com$/i,
	getISBN: function(){ return document.title.match( /([0-9X]{10})/i )[1]; },
	bookURL: 'http://www.alibris.com/booksearch?qsort=p&qisbn=%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=alibris&isbn=%s',
    updateURL: firstLinkTo( '/search/detail.cfm?', 'http://www.alibris.com' ),
    ajaxPrice: '<span class="big">([^<]*)'
	},

{  name: 'Barnes & Noble', id: 'bn', hostname: /\bbarnesandnoble\.com$/i,
	getISBN: nextTagAfter( 'a', 'ISBN:' ),
	bookURL: 'http://search.barnesandnoble.com/bookSearch/isbnInquiry.asp?ISBN=%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=bn&isbn=%s',
    ajaxPrice: '<td class="price"><p><strong[^$]([^<]*)'
	},


	{ name: 'BetterWorldBooks', id: 'betterworldbooks',  hostname: /\bbetterworldbooks\.com$/i,
	getISBN: function() {return window.content.location.href.match( /([0-9X]{10})/i )[1]; },
	bookURL: 'http://www.betterworldbooks.com/detail.aspx?ItemId=%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=betterworldbooks&isbn=%s',
    ajaxPrice: '</span></em><em><strong>([^<]*)<' 
	},

	{ name: 'Biblio.com', id: 'biblio', hostname: /\bwww\.biblio\.com$/i,
    getISBN: function(){ return document.title.match( / - ([0-9X]{10})/i )[1]; },
    bookURL: 'http://www.biblio.com/search.php?isbn=%s&stage=1', 
	ajaxURL: 'http://www.biblio.com/search.php?isbn=%s&stage=1',
	ajaxMethod: 'GET',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=biblio&isbn=%s',
    ajaxPrice: 'Price:</span>[^$]([^<]*)<'  
	},
/* Borders was sold to barnesandnoble.com
	{ name: 'Borders', id: 'borders', hostname: /\busedmarketplace\.borders\.com$/i,
    getISBN: function(){ return document.title.match( /([0-9X]{10})/i )[1]; },
	bookURL: 'http://usedmarketplace.borders.com/booksearch?isbn=%s&qsort=p',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=borders&isbn=%s',
	ajaxPrice: '<p><strong>price: <em>([^<]*)<'
	},
*/
	{ name: 'Powell Books', id: 'powells',  hostname: /\bpowells\.com$/i,
    getISBN: function() {return window.content.location.href.match( /([0-9X]{10})/i )[1]; },
	bookURL: 'http://www.powells.com/biblio?isbn=%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=powells&isbn=%s',
    ajaxPrice: '<div class="price">([^<]*)<' 
	},

	{ name: 'The Strand', id: 'strand', hostname: /\bstrandbooks\.com$/i,
    getISBN: function() {return window.content.location.href.match( /([0-9X]{10})/i )[1]; },
	bookURL: 'http://www.strandbooks.com/index.cfm?fuseaction=search.results&searchString=%s',
    ajaxURL: 'http://www.strandbooks.com/index.cfm?fuseaction=search.results&searchString=%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=strand&isbn=%s',
    ajaxPrice: '<b>Our Price:</b>[^$]*([^<]*)'
	},

	{ name: 'ThriftBooks', id: 'thriftbooks', hostname: /\bwww\.thriftbooks\.com$/i,
	bookURL: 'http://www.thriftbooks.com/viewDetails.aspx?ISBN=%s',
    ajaxURL: 'http://www.thriftbooks.com/viewDetails.aspx?ISBN=%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=thriftbooks&isbn=%s',
    ajaxPrice: '<span id="ctl00_ContentPlaceHolder1_lblMinPrize">([^<]*)'
	},

	{ name: 'Walmart', id: 'walmart', hostname: /\bwalmart\.com$/i,
//getISBN: nextTagAfter( 'ISBN-10:' ),
    bookURL: 'http://freebookexchange.org/amazon/search/index.php?site=walmart&isbn=%s',
    ajaxURL: 'http://www.walmart.com/search/search-ng.do?search_query=%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=walmart&isbn=%s',
	ajaxPrice: 'prefixPriceText2[^$]*([^<]*)'
	},

	{ name: 'Amazon.uk', id: 'amazon.uk', hostname: /\bamazon\.co.uk$/i,
    getISBN: function() {
      if( location.href.match( 'dispatched-from' ) ) return;
      return location.href.match( /\/([0-9X]{10})(\/|\?|$)/i )[1];
    },
    bookURL: 'http://www.amazon.co.uk/gp/offer-listing/%s/?tag=scriptbird-21&sort=price',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=amazon.uk&isbn=%s',
    ajaxPrice: '<span class="price">([^<]*)<' 
	},

	{ name: 'Amazon.de', id: 'amazon.de', hostname: /\bamazon\.de$/i,
    getISBN: function() {return window.content.location.href.match( /([0-9X]{10})/i )[1]; },
    bookURL: 'http://www.amazon.de/gp/offer-listing/%s/?ie=UTF8&sort=price',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=amazon.de&isbn=%s',
    ajaxPrice: '<span class="price">([^<]*)<' 
	},

	{ name: 'Amazon.ca', id: 'amazon.ca', hostname: /\bamazon\.ca$/i,
    getISBN: function() {
      if( location.href.match( 'rate-this' ) ) return;
      return location.href.match( /\/([0-9X]{10})(\/|\?|$)/i )[1];
    },
    bookURL: 'http://www.amazon.ca/gp/offer-listing/%s/?ie=UTF8&sort=price',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=amazon.ca&isbn=%s',
    ajaxPrice: '<span class="price">([^<]*)<' 
	},

	{ name: 'Amazon.fr', id: 'amazon.fr', hostname: /\bamazon\.fr$/i,
    getISBN: function() {return window.content.location.href.match( /([0-9X]{10})/i )[1]; },
    bookURL: 'http://www.amazon.fr/gp/offer-listing/%s/?ie=UTF8&sort=price',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=amazon.fr&isbn=%s',
    ajaxPrice: '<span class="price">([^<]*)<' 
	},



	{ name: 'Google Shopping', id: 'frooglebooks', hostname: /\bgoogle\.com$/i,
	ajaxMethod: 'GET',
    getISBN: /\?vid=ISBN([0-9]{10})/i,
	bookURL: 'http://froogle.google.com/froogle?q=%s&lmode=online&scoring=p',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=frooglebooks&isbn=%s',
    //updateURL: firstLinkTo( 'http://books.google.com/print?', '' ),
    ajaxPrice: '<span class="main-price">([^<]*)'
	},

	{ name: 'Graigslist', id: 'graig', hostname: /\google\.com$/i,
    bookURL: 'http://www.google.com/search?hl=en&lr=&q=%s+site:craigslist.org&as_qdr=m&btnG=Search', ajaxMethod: 'GET',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=graig&isbn=%s',
    ajaxPrice: '<div id=resultStats>([^<]*)<'
	},

  { name: 'Nook EBook', id: 'ebooks',  hostname: /\bbarnesandnoble\.com$/i,
	getISBN: function() {return window.content.location.href.match( /([0-9X]{10})/i )[1]; },
    bookURL: 'http://search.barnesandnoble.com/booksearch/isbninquiry.asp?isbn=%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=ebooks&isbn=%s',
    ajaxPrice: '<div class="price " itemprop="price" data-bntrack="Price" data-bntrack-event="click">([^<]*)<' 
	},

	{ name: 'Kindle Edition', id: 'kindle',  hostname: /\bkindle\.com$/i,
    bookURL: 'http://www.amazon.com/gp/product/%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=kindle&isbn=%s',
    ajaxPrice: '">Kindle Edition</a>[^$]*([^<]*)<'
	},

	{ name: 'AudioBook (CD) ', id: 'AudioCD', hostname: /\bstrandbooks\.com$/i,
    getISBN: function() {
      if( location.href.match( 'ships-from' ) ) return;
      return location.href.match(/\/([0-9X]{10})(\/|\?|$)/i)[1];
    },
	bookURL: 'http://www.amazon.com/gp/product/%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=AudioCD&isbn=%s',
	ajaxPrice: 'Audio, CD, Unabridged[^$]*([^<]*)<'
  },

	{ name: 'Audible (MP3) ', id: 'Audiomp3', hostname: /\baudible\.com$/i,
    getISBN: function() {
      if( location.href.match( 'ships-from' ) ) return;
      return location.href.match(/\/([0-9X]{10})(\/|\?|$)/i)[1];
    },
	bookURL: 'http://www.amazon.com/gp/product/%s',
	linkURL: 'http://freebookexchange.org/amazon/search/index.php?site=Audiomp3&isbn=%s',
	ajaxPrice: 'Audible Audio Edition[^$]*([^<]*)<'
  },

 ];



var hasFetched = false;



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
	node.innerHTML = '<a style="text-decoration:none;color:#A4A4A4;" href="javascript:alert(\''+ errmsg +'\');">none</a>';
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

(function() {
var allLinks = document.getElementsByTagName("a");

for (i = 0; i < allLinks.length; i++)
{
	var href = allLinks[i].href;
	if(href.match(/\.abebooks\.com/))
	{
		var hoge = href.replace("http://www.abebooks.com/servlet/SearchEntry","http://clickserve.cc-dt.com/link/tplclick?lid=41000000024289215&pubid=21000000000159388&cm_ven=PFX&cm_cat=affiliates&cm_pla=dlt&cm_ite=21000000000159388&redirect=http://www.abebooks.com/servlet/SearchEntry");
		allLinks[i].setAttribute("href", hoge);
	}
}
})(); 

(function() {
var allLinks = document.getElementsByTagName("a");

for (i = 0; i < allLinks.length; i++)
{
	var href = allLinks[i].href;
	if(href.match(/(ref=sr_1|ref=sr_1_olp|ref=sr_ob)\_+[0-9]+\?ie=UTF8/))
	{
				var hoge = href.replace(/&sr=1-+[0-9]+/, '')
		allLinks[i].setAttribute("href", hoge);
	}
}
})();
/*
var main = {
url : "http://freebookexchange.org/amazon/amazon.txt",
repText : "",
run : function(rep) {
var array=document.evaluate("//a[contains(@href,amazon\.com|(\/gp\/offer-listing))]", document, null, 6, null), regex=/(ref=sr_1|ref=sr_1_olp|ref=sr_ob|ref=dp_olp)\_+[a-z0-9]+\?ie=UTF8/, repText=rep;
//alert(repText);
for(let i=0,item; (item=array.snapshotItem(i)); i++) item.href=item.href.replace(regex, repText);
},
call : function() {
GM_xmlhttpRequest({
    method: "GET",
    url: main.url,
    onload: function(r) {
		main.run(r.responseText.replace(/^\s*|\s*$/g, ""));
    }
});
}
};
main.call(); // do it all

*/
var main = {
url : "http://freebookexchange.org/amazon/tag.txt",
repText : "",
run : function(rep) {
var array=document.evaluate("//a[contains(@href,amazon\.com)]", document, null, 6, null), regex=/&tag=+[a-z0-9]+-20/, repText=rep;
//alert(repText);
for(let i=0,item; (item=array.snapshotItem(i)); i++) item.href=item.href.replace(regex, repText);
},
call : function() {
GM_xmlhttpRequest({
    method: "GET",
    url: main.url,
    onload: function(r) {
		main.run(r.responseText.replace(/^\s*|\s*$/g, ""));
    }
});
}
};
main.call(); // do it all

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

function dom_createLink( url, txt, title, id, imageSRC )
{
  var image;
  if(imageSRC)
  {
    image = document.createElement('img');
    image.src = imageSRC;
    image.align = 'left';
    image.style.display = 'block';
    image.style.position = 'inline';   
  }

  var a  = document.createElement( 'a' );
  if( id ) a.id = id;
  a.setAttribute( 'target', '_blank' );
  a.setAttribute( 'href', url );
  with( a.style )
  {
    color = '#084B8A';
    textDecoration = 'none';
    fontWeight = 'bold';
  }
  if( title ) a.setAttribute( 'title', title );
  if(image) a.appendChild( image );
  a.appendChild( document.createTextNode( txt ) );
  return a;
}

function addSite( url, title, loc_id, imageSRC )
{
  var tr = document.createElement( 'div' );

  var td_left = document.createElement( 'span' );
  var a = dom_createLink( url, title, title+' Search', 'burro_book_'+loc_id, imageSRC );
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
  if( window.ActiveXObject )
  {
    var domdoc = new ActiveXObject( 'Microsoft.XMLDOM' );
    domdoc.async = 'false';
    domdoc.loadXML( strXML );
    return domdoc;
  }
  else
  {
    var objDOMParser = new DOMParser();
    return objDOMParser.parseFromString( strXML, 'text/xml' );
  }
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
    width = '250px';

    opacity = '0.90';
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
  about.title = 'BookInfoLineSearch';
  about.href = 'http://www.freebookexchange.org/amazon/index.html';
  handle.appendChild( about );
  box.appendChild( handle );

  var table = document.createElement( 'div' );
  with( table.style )
  {
    marginTop = '1px';
    marginBottom = '3px';
    padding = '0';
    width = '100%';
    font = '10pt sans-serif';
    display = 'none';
  }
  table.id = 'bookburro-pricesTable';//stay
  for( i=0; i<handlers.length; i++ )
  {
    h = handlers[i];
    table.appendChild( addSite( h.linkURL.replace( /%s/g, isbn ), h.name, h.id, h.imageSRC ) );
  }
  box.appendChild( table );

  var zip = function()
  {
    box.opened = !box.opened;
    var pricesTable = document.getElementById( 'bookburro-pricesTable' );//stay
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
  //If you want extraction to start as soon as you are on the page
  zip();
  zip();

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

/*	  default:
	    alert( 'getISBN handler for '+ h.name +' (id '+ h.id +
		   ') is of illegal type '+ (typeof getISBN) +'! Ignoring.' );*/
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
