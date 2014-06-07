// ==UserScript==
// @name           Naked Capitalism Tweaks
// @namespace      http://userscripts.org/users/slagfan
// @description    Some enhancements to the Naked Capitalism website for readability
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http*://*.nakedcapitalism.com/*.html
// ==/UserScript==

// minor css tweaks - outline comments, shrink reply and timestamp text,
// remove bullets.  it would be nice to be able to hilight other authors
// that i consider valuable, and de-emphasize the trolls.
var css = '\
.comment { border: 1px solid silver; margin: 3px; padding: 2px; } \
.comment-reply-link { font-size: xx-small; } \
.comment-meta { font-size: xx-small; } \
ul { list-style-type: none; } \
.comment-body { padding: 2px; } \
.acro a { color: #000000 !important; } \
';

// experimental
// #outer-wrapper { width: 90%; padding-left: 9%; } \

GM_addStyle(css);

var contributors = {};

var acronyms = {
'CDO': 'Collateralized Debt Obligation',
'CDPC': 'Credit Derivatives Product Company',
'CDS': 'Credit Default Swap',
'CFTC': 'Commodity Futures Trading Commission',
'ECB': 'European Central Bank',
'EFSF': 'European Financial Stability Facility',
'ESM': 'European Stability Mechanism',
'FOMC': 'Federal Open Market Committee',
'GATT': 'General Agreement on Trade and Tariffs',
'GFC': 'Global Financial Crisis',
'GSE': 'Government Sponsored Enterprise',
'HAMP': 'Home Affordable Modification Program',
'HARP': 'Home Affordable Refinance Program',
'HELOC': 'Home Equity Line Of Credit',
'HOEPA': 'Home Ownership and Equity Protection Act',
'HOLC': 'Home Owners Loan Corporation',
'IMF': 'International Monetary Fund',
'JOBS': 'Jumpstart Our Business Startups',
'LIBOR': 'London Interbank Offered Rate',
'LTRO': 'Long Term Refinancing Operation',
'MBS': 'Mortgage-Backed Security',
'MMT': 'Modern Monetary Theory',
'MSM': 'Main Stream Media',
'OCC': 'Office of the Controller of the Currency',
'OECD': 'Organisation for Economic Co-operation and Development',
'PMI': 'Purchasing Managers Index',
'RMBS': 'Residential Mortgage-Backed Security',
'SOX': 'Sarbanes Oxley',
'TARP': 'Troubled Asset Relief Program',
'TBTF': 'Too Big To Fail',
'TLGP': 'Temporary Liquidity Guarantee Program',
'ZIRP': 'Zero Interest Rate Policy'
};

function replace_text (matched_text, acronym)
{
  var title = acronyms[acronym];
  return '<span class="acro"><a href="http://en.wikipedia.org/wiki/' + acronym + '" title="' + title + '"><abbr title="' + title + '">' + matched_text + '</abbr></a></span>';
}

function doit () {
  // store list of contributors
  $('#Profile1 li a').each(function (i, v) {
    var name = $(this).text();
    contributors[name] = '1';
  });

  // hilight comment depending on author
  $('cite.fn').css('color', function (i,v) {
    var fn = $(this).text();
    if (fn == 'Yves Smith') {
      $(this).parent().parent().css('border', '1px solid red');
      return 'red';
    } else if (contributors[fn] == '1') {
      $(this).parent().parent().css('border', '1px solid blue');
      return 'blue';
    }
  });

  // create regexp
  var keys = [];
  for (var i in acronyms) { keys.push(i); }
  var regexp_s = '\\b(' + keys.join('|') + ')s?\\b';
 
  try {
    var re = new RegExp(regexp_s, 'g');

    $('p').each(function() {
      var node = $(this);	 
      node.html(node.html().replace(re, replace_text));
    });
  } catch (e) {
    alert(' e = ' + e);
  }
}

doit();
