// ==UserScript==
// @name           mail quotes color coding
// @namespace      Maxim.Yanchenko
// @description    mail quotes color coding in pre area
// @require        http://usocheckup.redirectme.net/92919.js
// @installURL     http://userscripts.org/scripts/source/92919.user.js
// @updateURL      http://userscripts.org/scripts/source/92919.meta.js
// @icon           http://files.rsdn.ru/8211/quote.png
// @copyright      2009+, Maxim Yanchenko (http://profiles.google.com/Maxim.Yanchenko)
// @license       (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        3.0.2
// @include        http://userscripts.org/scripts/show/92919
// @include        http://userscripts.org/scripts/show/92919/*
// @include        http://*.gmane.org/*
// @include        http://*.nabble.com/*
// @include        http://groups.google.com/group/*
// @include        http://www.mail-archive.com/*
// @include        http://lists.gnu.org/*
// @include        http://gcc.gnu.org/ml/*
// @include        http://marc.info/*
// @include        */pipermail/*
// @include        http://lists.linuxgazette.net/pipermail/tag/*
// @include        https://*/show_bug.cgi?id=*
// @include        /http:\/\/.*\osdir\.com/ml\/.*\/\d{4}-\d\d\/msg\d+\.html?/
// ==/UserScript==

// Version history
// ---------------
// 3.0.2
// removed http for pipermail sites (firefox list is https)
//
// 3.0.1
// nabble changed div classes
//
// 3.0.0
// colors are read from about:config (finally!)
//
// 2.3.0
// OSDir support added
//
// 2.2.0
// Generic Bugzilla sites added
//
// 2.1.0
// http://nabble.com support added
//
// 2.0.1
// Generic pipermail sites enabled (no code change)
//
// 2.0.0
// http://lists.linuxgazette.net support added
// (splitting algorithm changed, affecting all sites)
//
// 1.3.3
// icon added
//
// 1.3.2
// http://marc.info enabled (no code change)
//
// 1.3.1
// http://gcc.gnu.org enabled (no code change)
//
// 1.3.0
// http://groups.google.com support added
//
// 1.2.0
// http://lists.gnu.org support added
//
// 1.1.0
// http://mail-archive.com support added
//
// 1.0.0
// Initial version, http://gmane.org only


// feel free to add more colors, they will be taken care of automatically
var colors = function() {
  var config = GM_getValue("colors");
  if (config === undefined)
  {
    config = "#990099,#ff7700,#007799,#95c500,darkred,brown";
    GM_setValue("colors", config);
  }
  return config.split(/[\s,]+/);
}();
var regexes = new Array();


function $x(x, t, r) {
  if (t && t.tagName) {
    //console.log("t was provided, switching");
    var h = r, r = t, t = h;
  }
  var d = r ? r.ownerDocument || r : r = document, p;
  switch (t) {
  case XPathResult.NUMBER_TYPE:
    p = 'numberValue';
    break;
  case XPathResult.STRING_TYPE:
    p = 'stringValue';
    break;
  case XPathResult.BOOLEAN_TYPE:
    p = 'booleanValue';
    break;
  case XPathResult.ANY_UNORDERED_NODE_TYPE:
  case XPathResult.FIRST_ORDERED_NODE_TYPE:
    p = 'singleNodeValue';
    break;
  default:
    return d.evaluate(x, r, null, t || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  return d.evaluate(x, r, null, t, null)[p];
}

function forEach(lst, cb)
{
  if(!lst)
    return;
  if (lst.snapshotItem)
    for (var i = 0, len = lst.snapshotLength; i < len; ++i)
    {
      cb(lst.snapshotItem(i), i, lst);
    }
  else if (lst.iterateNext)
  {
    var item;
    while (item = lst.iterateNext())
      cb(item, lst);
  }
  else if (typeof lst.length != 'undefined')
    for (var i = 0, len = lst.length; i < len; ++i)
      cb(lst[i], i, lst);
  else if (typeof lst == "object")
    for (var i in lst)
      cb(lst[i], i, lst);
}

function createRegexes(colors, regexes)
{
  // setup regexes according to the number of colors
  // don't allow more than 2 spaces between '>'
  var sp = '\\s{0,2}', rs1 = '&gt;'+sp, rs2 = '(?!&gt;)';
  var r='^'+sp;

      if (document.location.hostname == "lists.linuxgazette.net")
      {
        // Similar to GNU lists, but <i> can be anywhere
        rs1 = rs1+"(?:<[iI]>)?"+sp;
      }

  for(var i=0;i<colors.length;i++)
  {
    r+=rs1;

    if (i == 0)
    {
      if (document.location.hostname == "lists.gnu.org"
       || document.location.hostname == "osdir.com")
      {
        // GNU lists display qoutes as italic, so enable <i> after the first '>'
        r += "(?:<[iI]>)*\\s*";
      }
    }
    regexes[i] = new RegExp(r+rs2);
    //console.log( i + ": " + regexes[i] + " => " + colors[i] );
  }
}

function set_style(item)
{
  for(var ci=colors.length-1; ci>=0; ci--)
  {
    if ( item.innerHTML.match( regexes[ci] ) )
    {
      //console.log("match "+regexes[ci]+"\n"+item.innerHTML);
      var style = item.getAttribute('style');
      if (style)
        style += "; ";
      else
        style = "";
      style += 'color:';
      style += colors[ci];
      //console.log(style);
      item.setAttribute('style',style);
      break;
    }
  }
  //alert(item.textContent);
};

function replace_with_span_str(target_str, delim)
{
  var big_pat = new RegExp( '(.*?)('+delim+')', 'g' );
  //console.log(big_pat);
  return target_str.replace(big_pat,function(match,text,d){
      //console.log(text);
      for(var ci=colors.length-1; ci>=0; ci--)
      {
        if ( text.match( regexes[ci] ) )
        {
          text = '<span style="color:' + colors[ci] + '">' + text + '</span>';
          break;
        }
      }
      return text+d;
    });
}

function replace_with_span(target, delim)
{
  //console.log(target.innerHTML);
  target.innerHTML = replace_with_span_str(target.innerHTML, delim);
}

function pppp(item)
{
  console.log(item.innerHTML);
}

function set_style_and_text(item)
{
  //console.log("ENTRY");
  //console.log(item.innerHTML);
  set_style(item);

  var pat=/^.*?(?=<p\b)|^.*$/;
  var s = ""+pat.exec(item.innerHTML);
  //console.log( s );
  var replaced = replace_with_span_str(s, "<br>");
  item.innerHTML = replaced + item.innerHTML.slice(s.length);

  forEach($x('p',item), function(item){replace_with_span(item,"<br>");});
};

function main()
{
  createRegexes(colors, regexes);
  if (document.location.hostname == "groups.google.com")
  {
    // google groups places quotes in <p> and in <div class="qt">
    // (in the latter case you need to process contents as well, it will be broken down be <br>)
    forEach($x('//div[@id="inbdy"]//p'), set_style);
    forEach($x('//div[@id="inbdy"]//div[@class="qt"]'), set_style_and_text);
  }

  // work on <pre> (add more of you need more on specific site)
  var xpath = '//pre';

  // bugzilla kindly encapsulates quotes in a special span
  if (document.location.href.match("/show_bug[.]cgi[?]id="))
    xpath = '//span[@class="quote"]';

  // osidr.com kindly encapsulates the message in a special span
  if (document.location.hostname == "osdir.com")
    xpath = '//div[@id="messspan"]';


  //console.log( "xpath: "+xpath +", "+document.location.href );
  forEach($x(xpath), function(item){replace_with_span(item,'\n(?:</[iI]>)?|$');} );

  if (document.location.hostname.match("\.nabble\.com$"))
  {
    // nabble.com has special div for long quotes (class="shrinkable-quote"),
    // but short quotes go inline, so easier to process the whole div[@class="message-text"].
    // If/when nabble.com starts placing all quotes to divs, searching will be more efficient.
    forEach($x('//div[contains(concat(" ", normalize-space(@class), " "), " message-text ")]'), function(item){replace_with_span(item,'\n?<(?:br|/div)>');} );
  }
}

main()
