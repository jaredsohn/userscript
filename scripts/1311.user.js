/*
 Bookburro Ajax Panel for GreaseMonkey and Turnabout

 Version 0.12r
 (C) 2005 Jesse Andrews, Britt Selvitelle under cc-by-sa
 License: Creative Commons "Attribution-ShareAlike 1.0"
 http://creativecommons.org/licenses/by-sa/1.0/

 (C) 2005 Reify
 License: Creative Commons "Attribution-ShareAlike 1.0"
 http://creativecommons.org/licenses/by-sa/1.0/

 Snipits used from RSS Reader for GreaseMonkey
 http://www.xs4all.nl/~jlpoutre/BoT/Javascript/RSSpanel/
 Version: 1.03 (C) 2005 Johannes la Poutre
 THANKS!

 Changelog:

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
// @name          Book Burro - Remixing the bookstore
// @namespace     http://overstimulate.com/userscripts/
// @description   Compare book prices on Amazon, Barnes and Noble, Buy.com, and Half.com
// @include       http://amazon.com*
// @include       http://www.amazon.com*
// @include       http://www.powells.com*
// @include       http://half.ebay.com*
// @include       http://buy.com*
// @include       http://www.buy.com*
// @include       http://search.barnesandnoble.com*
// @include       http://barnesandnoble.com*
// @include       http://www.barnesandnoble.com*
// @exclude
// ==/UserScript==

var hasFetched = false;

var Icons =
{
	title: "data:image/gif;base64,R0lGODlheAAOAOYAAAAAAOmUUUOGfx1eVj8/M1ijnqBhLrmFVv//zNi6oCUIAO/vwJqEbGk4EL+/mm9vWZmZmVpaWvfAl7ydiC8vJo+PcwAPCaJtSylNS////4tCC9/fs0MeAa+vjefy9LR1QpnMzH9/Zny3s7WIazttbG5MMVyVj09PQJ+fgMvO11UwEwMWGq10R5K6ugg2Nh8fGdiecOaxhdiKTAAACZlqPnWtqu/dxTxlYXNeS1o6IU8rEZqytlp2d4p4bDZ/dn+Eh4pWL2JNOFKLhf/frtusjtGFS750N8ulfo1qVM/Ppm2HhsSQa615UvSlYy5HS9rb1hAEDqdvPjgpJg8PDP/vx4S2s6toMzRERKmlmrS8vkFfXwAhHnI7Ek06K+3x8D92c6/M0DNmZk5nb4xNGr+8s9uNT8x9OysRAtSniJWOlq6GYwAICZGtsP+4dGVCLkaVj4GpqF9fTMuLW8q/ra1rOV1UTXpKJmaZmb+SabGzstWXZEtMTmg9G4RZN4rFwVZeYSH5BAUUAAgALAAAAAB4AA4AAAf/gAiCg4MzM4SIgyo5hGcKj1JTiZOUlZaXmJmagmtrPEprlRN9TA0ICjpIaiMjSEhdm7Gys7SInXd3JiQ3oZN8Bx9jXGpoaEtLFzRumkkEKLTNz4nRtbWGbHBVJttCJBaTDQYaYzASSzAHQCxEmw4AIbTu8Iny1bMzWTtwcH4Fbz4DBHhLZGfMmCJy5NCwY0qWuwdxCHQYVIHAiYmCkkR8sABBvQ4hkgx6GBFjCGknPYYkUCGEgwcnNix4QCCOyEsrVoBpUUOEvwIAw4T5RkjFmA8faPDhU8sdgAcUADhA8ODpCQATN0yhEGKrx3coAMQh5BSqVAQACAhKiyAEgCnv/94CAICAwpQQdjdcmiFmRQuf/nwICDMAA4ZeCLrouBClMR8VJUrMcjd2A4CYlwVNeYEgDgCRFQCgcHdVLVmxCCyfQGuardvVaD8jCFsBQRLUllY40eICRA0BwL8I7ZRhUA8VNAx8sIOGSoISy2LVYz2dAF3rguQ5xT3y3Vq1bFm3PSt+/NTyliyIwbAFhB+BJIinKC5oAh8WBqzAoEKFA5ISONTxRwqZPITAApfdNhYCL0hylV60uUNBVedl99SBmYXnGnnhhfaMapmsgYEY7bWwxRoZZJBCGlAMMgEQdMhghR5DxKAADWokYMMTWeyBiTtTdODZM3Z1EBo8HYjlgL9dC8izwBSmWRjkkAhMMeWG54WnFQUOeFbhJWtoocWJHqj4gyGE6MBCGQHIUIQZetBwAB5qBEGGF3n8KNYLFx541RQPDIICnxSIVE9Y0nwVB5+BzgbXCRSo5VaWUSYR1QuJhniFBRlkAQEAiA1yBgtFtNGEEUbQYUAUeKDBABYZPBGBPbTWWs1cP4BKyRk06NFEAKdawUIUTBBhgxfI+mjrssxiMpclXdhBRxlmmJEUDTQckcAcXnjwRKPNhltrIAA7",
	about: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDkprC+64gAAAOdJREFUKM+FkrFOAkEURc9ddrJZCgsqCwtCIiUFJa2df2CwNXRS8AmGisLEaGGs3VhTYDUtxZaED/AriGHjPhuEDC5wq3l5czL3vjeyzBlHtC6KoI4BuPk8Qqx3549rov3+YPBIp3NHq3VLlnkkBf0AWK2+6fevWCze8H7CaPRKUfzgnKsG0jSh272kLEuWyy/a7QvSNKnIsJEk6vWE2SxnPH5nOn3YWopjh9VqIbDBGA5fyPNnGo2znZVIEEWhJTNDgmbzfHvZzA6H/pP3k3/TqQQkIYle7z6oT74wnz8d3KNOfY19/QKFiTrWqbiPtAAAAABJRU5ErkJggg==",
	carrotRight: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCR020Q08hgAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAiklEQVQY07XPIQoCURSF4e8NAzYxGicNuAa1WlyCO3AlZnfiNgwahQFxikkcBIsGfaZpzgODJ/4c/nMvPyR8g7EsephgH6q6aXnWIelhjkUsi0EL88TqFUfMYlnscMoS5wUccMYS4yxhfuGNPho88oQ5xxQjrHHpKkcMccMqVPU99eATG2zb4n/zAS4OHrV1hIB/AAAAAElFTkSuQmCC",
	carrotDown: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QQYCRoeq/kCuwAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAmElEQVQY083QMUoDARSE4W92U2xhkxSpAgY0AXMQ29zCM3iSXEXQTrCws44Im85CkO1jnq2KKQWnGxiY+Yd/oXw1tTrr7D86CYdD5Xk3HA8vTi8la7xW1T5Jg8IEN6PvPXnEAkOa5l5Viwuc4yk/d9VyfoLrqnpIMmCGu2z79/wGUsv5FFcYY5Nt/wKjI+BvuEWnbfu///kTargo75QVC5oAAAAASUVORK5CYII=",
	close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH1QQYCDcSg6d+SAAAAPBJREFUKM+Fkr1qAkEURs9dnWBrJT5IHkEw4gtEsBQs/AlpkiKlJGnEJlqIjRbrPoAQYhPio1hGsPAHFoW5KSIxo7J7qvlgDty534j6Rolgt987OQnA7XuEsTuegwIeMYiIkx2hVnsjCL7+su9/0mz2Lox0oNOpUiw+kc2mUVWGww8mkxYiYK09F4xJMho9kMs9IiJMpy8Y83vFWkUTCVcAWCxWLJcrRIT1OiSTOczuCXieK2y3IeXyK4PBPZtNSKn0zGzWJpW6uvyGer1LpVIgn78GYD7/ptHo0e/fHbemvtHIHv4zvonv4ayXuK9xyg8qt0tfe9qKPAAAAABJRU5ErkJggg=="
};

function checkISBN( isbn ) {
  try {
    isbn=isbn.toLowerCase().replace(/-/g,'').replace(/ /g,'');
    if (isbn.length != 10) return false;
    var checksum = 0;
    for (var i=0; i<9; i++) {
      if (isbn.charAt(i) == 'x') {
        checksum += 10 * (i+1);
      } else {
        checksum += isbn.charAt(i) * (i+1);
      }
    }
    checksum = checksum % 11;
    if (checksum == 10) checksum = 'x';
    if (isbn.charAt(9) == checksum)
      return isbn;
    else
      return false;
  } catch (e) { return false; }
}

function dom_createLink(url, txt, title) {
  var a  = document.createElement("a");
  a.setAttribute("href", url);
  with (a.style) {
    color="#00a";
    textDecoration="none";
    fontWeight="bold";
  }
  if (title) a.setAttribute("title", title);
  a.appendChild(document.createTextNode(txt));
  return a;
}

function add_site(url, title, loc_id ) {
	var tr = document.createElement("div");

	var td_left = document.createElement("span");
	var a = dom_createLink(url, title, title + ' Search');
	td_left.appendChild(a);
	tr.appendChild(td_left);

	var td_right = document.createElement("span");
	td_right.innerHTML = 'fetching';
  td_right.id = loc_id;
	tr.appendChild(td_right);

	if (document.all)	// IE only
	{
		tr.style.position = "relative";
		td_right.style.textAlign = "right";
		td_right.style.position = "absolute";
		td_right.style.left = "10em";
		td_right.style.width = "4em";
	}
	else	// other browsers
	{
		tr.style.display = "table-row";
		td_left.style.display = "table-cell";
		td_right.style.display = "table-cell";
	}

  return tr;
}

function str2xml(strXML)
{
	if (window.ActiveXObject)
	{
    var domdoc = new ActiveXObject("Microsoft.XMLDOM");
    domdoc.async = "false";
    domdoc.loadXML(strXML);
    return domdoc;
  }
	else
	{
    var objDOMParser = new DOMParser();
    return objDOMParser.parseFromString(strXML, "text/xml");
	}
}

function int2money( cents )  {
  var money = "$"
  if (cents< 100) {
    money = money + '0.';
  } else {
    money = money + Math.floor(cents/100) + '.';
  }
  cents = cents % 100;
  if (cents < 10)
    money = money + '0';
  money = money + cents;
  return money;
}

var amazon_associate_code = 'anotherjesse-20' // PUT YOUR AMAZON ASSOCIATE CODE HERE !!!!
var amazon_dev_key = '0XYJJ825QSB9Q7F2XN02'; // PUT YOUR AMAZON DEV KEY HERE !!!
var bn_associate_code = '41456445'; /// PUT YOUR BN AFFILIATE CODE HERE!!!
var half_associate_code = '1698206-1932276'; /// PUT YOUR HALF AFFILIATE CODE HERE!!!

function run_queries(isbn) {

  var errmsg = 'Oops! Either there are no books available,\\nor there is a parsing error because of\\nsome change to their website.';

  ////// AJAX for BN.com /////

  GM_xmlhttpRequest({ method:"POST", url:'http://search.barnesandnoble.com/booksearch/isbninquiry.asp?isbn='+isbn, data:"",
    onload:function(result) {
      try {
        document.getElementById('burro_bn').firstChild.nodeValue = result.responseText.match('priceRightBNPrice[^>]*>\([^<]*\)</')[1];
      } catch (e) {
        document.getElementById('burro_buy').innerHTML = '<a href="javascript: alert(\''+errmsg+'\');">Error</a>';
      }
    }
  });

  ////// AJAX for Buy.com /////

  GM_xmlhttpRequest({ method:"POST", url:'http://www.buy.com/retail/GlobalSearchAction.asp?qu='+isbn, data:"",
    onload:function(result) {
      try {
        document.getElementById('burro_buy').firstChild.nodeValue = result.responseText.match('productPrice[^>]*>\([^<]*\)</')[1];
      } catch (e) {
        document.getElementById('burro_buy').innerHTML = '<a href="javascript: alert(\''+errmsg+'\');">Error</a>';
      }
    }
  });

  ////// AJAX for half.com /////

  GM_xmlhttpRequest({ method:"POST", url:'http://half.ebay.com/search/search.jsp?product=books:isbn&query='+isbn, data:"",
    onload:function(result) {
      try {
        document.getElementById('burro_half').firstChild.nodeValue = result.responseText.match('Best[^P]*Price[^\$]*\([^<]*\)<')[1];
      } catch (e) {
        document.getElementById('burro_half').innerHTML = '<a href="javascript: alert(\''+errmsg+'\');">none</a>';
      }
    }
  });

  ////// AJAX for both amazon.com /////

  GM_xmlhttpRequest({ method:"POST", url:'http://xml.amazon.com/onca/xml3?t=' + amazon_associate_code + '&dev-t=' + amazon_dev_key + '&type=lite&f=xml&mode=books&AsinSearch='+isbn, data:"",
    onload:function(result) {
      var x = str2xml( result.responseText );
      var ourprices = x.getElementsByTagName('OurPrice');
      if (ourprices.length == 0) {
        document.getElementById('burro_amazon').innerHTML = '<a href="javascript: alert(\''+errmsg+'\');">Error</a>';
      } else {
        document.getElementById('burro_amazon').firstChild.nodeValue = ourprices[0].childNodes[0].nodeValue;
      }

      var usedprices = x.getElementsByTagName('UsedPrice');
      if (usedprices.length == 0) {
        document.getElementById('burro_amazonmarket').innerHTML = '<a href="javascript: alert(\''+errmsg+'\');">none</a>';
      } else {
        document.getElementById('burro_amazonmarket').firstChild.nodeValue = usedprices[0].childNodes[0].nodeValue;
      }
    }
  });

  var msg = 'We want to check with them regarding the traffic of querying for prices from their site on every click...';
}


function burro( location, isbn ) {
  var box = document.createElement("div");
  box.title = "Click box to expand/collapse";
  with (box.style) {
    position  =  "absolute";
    zIndex  =  "1000";

    if (location == "half")
    	top = "240px";
    else
    	top = "120px";

    if (location == "bn" || location == "half")
    	right = "15px";
    else
    	left = "15px";

    backgroundColor = "#ffc";
    border = "1px solid orange";
    padding = "4px";
    textAlign = "left";
    font = "8pt sans-serif";
    width = "200px";
    marginBottom = "15px";

    opacity = "0.93";
		filter = "alpha(opacity=90)";
  }

  var carrot = document.createElement("img");
  carrot.style.top="-10px";
  carrot.src = Icons.carrotRight;
  carrot.id = "hide_show_carrot";
  box.appendChild( carrot );

  var title_image = document.createElement("img");
  title_image.style.marginLeft="6px";
  title_image.src = Icons.title;
  box.appendChild( title_image );

  var close = document.createElement("img");
  close.src = Icons.close;
  with (close.style) {
    position = "absolute";
    right = "3px";
    top = "3px";
    margin = "2px";
    width = "12px";
    height = "12px";
    backgroundColor = "#ffb";
    border = "none";
    lineHeight = "8px";
    textAlign = "center";
  }
  close.setAttribute("title","Click To Remove");
  close.onclick = function() { this.parentNode.style.display = "none"; };
  box.appendChild(close);

  var about = document.createElement("a");
  var about_img = document.createElement("img");
  about_img.src = Icons.about;
  about_img.style.border = "none";
  about.appendChild(about_img);
  with (about.style) {
    position = "absolute";
    right = "18px";
    top = "3px";
    margin = "2px";
    width = "12px";
    height = "12px";
    backgroundColor = "#ffb";
    lineHeight = "12px";
    textAlign = "center";
    textDecoration = "none";
  }
  about.title = "OverStimulate / modified by Reify";
  about.href ="http://overstimulate.com/articles/2005/04/24/greasemonkey-book-burro-find-cheap-books";
  box.appendChild(about);

  var table = document.createElement("div");
  with (table.style) {
  	marginTop = "5px";
    padding = "0 5px";
    width = "100%";
    height = "5em";
    font = "10pt sans-serif";
    display = "none";
  }
  table.id = "bookburro-pricesTable";
  table.appendChild( add_site("http://www.amazon.com/exec/obidos/ASIN/" + isbn + "/" + amazon_associate_code, "Amazon", "burro_amazon" ));
  table.appendChild( add_site("http://www.amazon.com/exec/obidos/redirect?tag="+amazon_associate_code+"&path=tg/stores/offering/list/-/"+isbn+"/all/", "Amazon (used)", "burro_amazonmarket" ));
  table.appendChild( add_site( 'http://service.bfast.com/bfast/click?bfmid=2181&sourceid=' + bn_associate_code +'&bfpid=' + isbn + '&bfmtype=book', "Barnes & Noble", "burro_bn"));
  table.appendChild( add_site("http://www.buy.com/retail/GlobalSearchAction.asp?qu=" + isbn, "Buy.com", "burro_buy"));
  table.appendChild( add_site( 'http://www.tkqlhce.com/click-'+half_associate_code+'?ISBN=' + isbn, 'Half.com', 'burro_half' ));
  // table.appendChild( add_site("http://www.powells.com/cgi-bin/biblio?isbn=" + isbn, "Powell's Books", "burro_powell"));
  box.appendChild(table);

  box.onclick = function() {
		var pricesTable = document.getElementById("bookburro-pricesTable");
    var carrot = document.getElementById('hide_show_carrot');

    if (pricesTable.style.display == "none")
    {
    	if (!hasFetched) run_queries(isbn);
    	pricesTable.style.display = document.all ? "block" : "table";
      carrot.src = Icons.carrotDown;
    }
    else
    {
    	pricesTable.style.display = "none";
      carrot.src = Icons.carrotRight;
    }
  };
  document.getElementsByTagName("body")[0].appendChild(box);
}

function init()
{
	if (document.location.href.match('amazon.com') && !document.location.href.match('rate-this')) {
		try {
			isbn = checkISBN(document.location.href.match(/\/([0-9X]{10})(\/|\?|$)/)[1]);
			if (isbn) burro( 'amazon', isbn );
		} catch (e) { }
	}

	else if (document.location.href.match('barnesandnoble.com')) {
		try {
			isbn = checkISBN( document.location.href.match(/[iI][sS][Bb][Nn]=([0-9X]{10})(\&|\?|$)/)[1] );
			if (isbn) burro( 'bn', isbn );
		} catch (e) { }
	}

	else if (document.location.href.match('buy.com')) {
		try {
			isbn = checkISBN( document.title.match(/ISBN ([0-9X]{10})/)[1] );
			if (isbn) burro( 'buy', isbn );
		} catch (e) { }
	}

	else if (document.location.href.match('powells.com')) {
		bs = document.getElementsByTagName('b');
		for (i=0; i<bs.length; i++)
			if (bs[i].innerHTML.match('ISBN:')) {
				isbn = checkISBN(bs[i].nextSibling.nextSibling.firstChild.nodeValue);
				if (isbn) burro( 'powells', isbn );
			}
	}

	else if (document.location.href.match('half.ebay.com')) {
		bs = document.getElementsByTagName('b');
		for (i=0; i<bs.length; i++)
			if (bs[i].innerHTML.match('ISBN:')) {
				isbn = checkISBN(bs[i].nextSibling.firstChild.nodeValue);
				if (isbn) burro( 'half', isbn );
			}
	}
	else
		return;
}

function addEventHandler(target, eventName, eventHandler)
{
	if (target.addEventListener)
		target.addEventListener(eventName, eventHandler, false);
	else if (target.attachEvent)
		target.attachEvent("on" + eventName, eventHandler);
}

// addEventHandler(document, "load", init);
init();
