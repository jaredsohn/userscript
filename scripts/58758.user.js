// ==UserScript==
// @name           sidewiki
// @namespace      http://localhost/
// @include        http://*
// @exclude        http://www.google.com/sidewiki/entry/*
// @exclude        http://www.google.com/sidewiki/feeds/entries/*
// ==/UserScript==

(function()
{
var $w = window.top;
var $d = null;
if ($w != null)
  $d = $w.top.document;
if (!$d) {
  $w = window;
  $d = $w.document;
}
if ($d.body.tagName == 'FRAMESET') {
  // try show at least something, somehow
  $w = window;
  $d = document;
}
if ($w == null)
  $w = window;

// It does not seem to work in exclude. Probably because the main document
// is opened in a frame right next to the sidewiki panel.
if (RegExp('^http://www\.google\.com/sidewiki/entry/').test($d.location.href))
  return;

function sidewiki(re,rq)
{
  var sw = $d.createElement("div");
  sw.id = 'sidewiki-annotations';
  sw.className = 'sidewiki';
  sw.style.opacity = "0.85";
  //sw.style.filter = "alpha(opacity=80)";
  sw.style.position = "absolute";
  sw.style.zIndex = "10000";
  sw.style.left = ($w.scrollX + 10) + "px";
  sw.style.top = ($w.scrollY + 20) + "px";
  sw.style.background = '#dfdfdf';
  sw.style.styleFloat = "right";
  sw.style.padding = "3px 4px";
  sw.style.color = "#000000";
  sw.style.textDecoration = "none";
  sw.style.textAlign = "left";
  sw.style.MozBorderRadius = "2px";
  sw.style.WebkitBorderRadius = "2px";
  sw.style.WebkitBoxShadow = "2px 2px 2px #bfbfbf";
  sw.style.MozBoxShadow = "2px 2px 2px #bfbfbf";
  sw.style.fontSize = '8pt';
  sw.style.fontFamily = 'Helvetica';

  if (re && re.feed.entry && re.feed.entry.length) {

    sw.innerHTML = ' <span style="font-size: 8pt; margin: 0">'+
      'Sidewikis: ' + re.feed.entry.length + ' of '
      + re.feed.openSearch$totalResults.$t + '</span>';
    var ent0 = $d.createElement('div');
    ent0.style.display = 'none';
    ent0.style.fontSize = '10pt';
    var entries = '';
    for (var i = 0; i < re.feed.entry.length; ++i) {
      entries +=
        '<div style="margin-bottom: 1em">' +
        '<div style="font-weight: bold; background: #afdfaf">' +
        '<a target="sidewiki-by-author" '+
        'href="http://www.google.com/sidewiki/feeds/entries/author/' +
        re.feed.entry[i].author[0].gd$resourceId.$t +
        '/full">' + re.feed.entry[i].author[0].name.$t + '</a> ' +
        '<a target=_top href="http://www.google.com/sidewiki/entry/' +
          re.feed.entry[i].author[0].gd$resourceId.$t + '/id/' +
          re.feed.entry[i].gd$resourceId.$t + '">' +
        re.feed.entry[i].title.$t  + '</a> '+
        '</div>'+
        re.feed.entry[i].content.$t +
        '</div>';
    }
    ent0.innerHTML = entries;
    sw.appendChild(ent0);

    var ticker_counter_start = 30;
    var ticker_counter = ticker_counter_start;
    var ticker_timer = null;
    var ticker = $d.createElement('span');
    ticker.style.fontSize = 'xx-small';

    sw.addEventListener('mouseover',
      function(e) {
        ent0.style.display = 'inline';
        sw.style.width = '70%';
        ticker.style.display = 'none';
        $w.clearTimeout(ticker_timer);
      },
      false);
    sw.addEventListener('mouseout',
      function(e) {
        ent0.style.display = 'none';
        sw.style.width = null;
        ticker_counter = ticker_counter_start;
        ticker_timer = $w.setTimeout(countdown, 1000);
      },
      false);

    sw.insertBefore(ticker, sw.firstChild);
    function countdown()
    {
      --ticker_counter;
      if (ticker_counter) {
        ticker.innerHTML = '(Closing in ' + ticker_counter + ' sec)';
        ticker.style.display = 'inline';
        ticker_timer = $w.setTimeout(countdown, 1000);
      } else
        $d.body.removeChild(sw);
    }
    ticker_timer = $w.setTimeout(countdown, 1000);
  }
  else if (rq.status == 200) {
    return;
    // just for debugging
    sw.innerHTML = 'No sidewiki annotations';
    $w.setTimeout(function(){ $d.body.removeChild(sw); }, 5000);
  }
  else { // status != 200
    var hdrs = rq.responseHeaders;
    /* hdrs = rq.getAllResponseHeaders(); */
    sw.innerHTML = '' + rq.status + ' ' + rq.statusText +
      '<br>Headers:<pre>' + hdrs + '</pre>';
    $w.setTimeout(function(){ $d.body.removeChild(sw); }, 5000);
  }
  $d.body.appendChild(sw);
}

var rq = 'http://www.google.com/sidewiki/feeds/entries/webpage/' +
  encodeURIComponent($d.location.href) +
  '/default?alt=json&sortorder=quality';
//GM_log("Requesting sidewikies for "+rq);

/*
var siderq = new XMLHttpRequest();
siderq.open('GET', rq, true);
siderq.onreadystatechange = function() {
  if (this.readyState == 4) {
    var re = null;
    if (this.status == 200) {
      re = JSON.parse(this.responseText);
    }
    sidewiki(re,this);
  }
};
siderq.send('');
*/
// Can't do a cross-domain request with XMLHttpRequest
GM_xmlhttpRequest({

  method: 'GET',

  url: rq,

  onload: function(details) {
    var re = null;
    if (details.status == 200) {
      re = JSON.parse(details.responseText);
    }
    if (details.status == 400)
      return; // google started returning 400 for impossible requests recently
    sidewiki(re,details);
  }
});

})();
// vim: sw=2 et
