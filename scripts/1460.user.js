/**
 * Get stock quotes on Yahoo! Finance from other financial sites.
 *
 * Original Copyright (C) 2006, Chetan Narsude
 * http://chetan.narsude.net/yahoo_finance_quotes.user.js
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You are allowed to modify the script to suit your own needs
 * and distribute as long as the original copyright and disclaimer
 * is included at the top of the script.
 *
 * Acknowlegement:
 *   The following people have submitted the patches for this script
 *   to work with the financial portals listed against their names.
 *     Etrade         : Alex Robinson http://www.tranzoa.com
 *     Morgan Stanley : Tony Acero
 *
 *
 * Log:
 *   2006.03.06 - Added Reuters overview.aspx url
 */

// ==UserScript==
// @name          Yahoo! Finance Quotes
// @namespace     http://finance.yahoo.com
// @description   Get stock quotes on Yahoo! Finance from other financial sites
// @include       http://*.fool.com/*
// @include       http://*.businessweek.com/*
// @include       http://*.smartmoney.com/*
// @include       http://*.marketwatch.com/*
// @include       http://*.thestreet.com/*
// @include       http://*.reuters.com/*
// @include       http://*.msn.com/*
// @include       http://*.forbes.com/*
// @include       https://trading.scottrade.com/*
// @include       https://wwws.ameritrade.com/*
// @include       https://*.etrade.com/*
// @include       https://*.etrade.wallst.com/*
// @include       https://*.morganstanleyclientserv.com/*
// ==/UserScript==

(function() {
 var sites = new Object();
 sites['.fool.com/']         = new Array('href',
                                         /\/uberdata.asp\?symbols=(.+)/i);
 sites['.businessweek.com/'] = new Array('href',
                                         /javascript: void showTicker\('([^']+)'/i);
 sites['.smartmoney.com/']   = new Array('href',
                                         /[?&]searchString=([^&]+)/i);
 sites['.marketwatch.com/']  = new Array('href',
                                         /\/quotes\/detail.asp\?view=detail&symb=([^&]+)/i);
 sites['.thestreet.com/']    = new Array('href',
                                         /\/quotes.html\?pg=qcn&symb=(.*)$/i);
 sites['.reuters.com/']      = new Array('href',
                                         /&ticker=([^.]+)\.[ANO].*\/fullquote$/i,
                                         /\/Quote\.aspx\?symbol=([^.]+)\.[ANO]$/i,
                                         /\/FullQuote\.aspx\?ticker=([^.]+)\.[ANO]/i,
                                         /\/stocks\/overview\.aspx\?symbol=([^.]+)\.[ANO]/i
                                         );
 sites['.msn.com/']          = new Array('href',
                                         /\/stock_quote\?Symbol=([^&]+)/i,
                                         /\/quoteredir.asp\?Symbol=([^&]+)/i);
 sites['.forbes.com/']       = new Array('href',
                                         /[?&]tkr=([^&]+)/i);
 sites['.scottrade.com/']    = new Array('href',
                                         /\/DetailedQuoteSummary.aspx\?SYMBOL=([^&]+)/i);
 sites['.ameritrade.com/']   = new Array('onclick',
                                         /\.viewQuote\('([^']+)'\);/i);
 sites['.etrade.com/']       = new Array('href',
                                         /\/quotes(?:and)?research\?(?:.+&)?sym=([^&]+)/);
 sites['.etrade.wallst.com/'] = new Array('href',
                                         /\/quotes(?:and)?research\?(?:.+&)?sym=([^&]+)/);
 sites['.morganstanleyclientserv.com/'] = new Array('href',
                                                    /SEARCHBY=([^&amp;]+)/);

 function checkSite(href)
 {
   for (var site in sites) {
     if (href.indexOf(site) > 7) {
       return site;
     }
   }

   return false;
 }

function insertHTML(node, result, target)
{
  var furl = 'http://us.rd.yahoo.com/finance/chetan/*http://finance.yahoo.com/q?s=' + result[1];
  var link = document.createElement('a');
  link.setAttribute('href', furl);
  link.innerHTML = '<img src=http://chetan.narsude.net/ylinksy_l.gif border=0 width=16 height=16 align=top>';
  link.title = 'Yahoo!';
  if (target) {
    link.setAttribute('target', target);
  }

  node.parentNode.insertBefore(link, node.nextSibling);
}

function annotate(site)
{
  var regexes = sites[site];

  var nodes = document.getElementsByTagName("a");
  for (var c = 0, node; node = nodes[c]; c++) {
    var attr = node.getAttribute(regexes[0]);
    var target = node.getAttribute('target');

    for (var r = regexes.length - 1; r > 0; r--) {
      var result = regexes[r].exec(attr);
      if (result) {
        insertHTML(node, result, target);
        break;
      }
    }
  }
}

var site = checkSite(document.location.href);
if (site) {
  annotate(site);
}
})();

