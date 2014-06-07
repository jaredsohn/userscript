// ==UserScript==
// @name           Ikariam 100 CRs
// @namespace      overkill_gm
// @description    Makes the Military advisor give first 100 CRs on the first page
// @version        9
// @include        http://*.ikariam.*/index.php?view=militaryAdvisorCombatReports*
// @exclude        http://board.ikariam.*
// @homepage       http://userscripts.org/scripts/show/34564
// ==/UserScript==

// I integrated Ikariam Attack Counter since it won't work with this AJAX http://ikariam.nfshost.com/

// variables to set up
var enableCounts = true;      // Activate attack counter script after retrieving CRs
var hilightColor = '#DAE899'; // Color to hilight cities attacked  background is #EEE8AA // old color: #CAE877
var bashingColor = '#FAE877'; // Color to hilight cities attacked 6 times or greater in the past 24 hours.

// begin script
var loadingImg = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPYAAO7oqobRM9zjlcHeeKzZX5/WUKHXUrLaZcfeft/jmcjff5TTQ5XURJjUSZvV'+
    'TJ/VT7HZY9HgiZHSP7PbaObloOfmotTijb7dc6XYV6zYXtPhi9rilJ3VTY7SPL/cc8vggavZXbjb'+
    'bOHlnLzccYvRObDZY8Xee6/aYs/hh6LWUonRNs3ghMLeeI/SPofRNeTln+nmpbbbarvccOrmpbrc'+
    'b8rfgeznp+3nqNPijNjikevmpt3jl83fhOfmotvjlOLlneDkmtrjktbij9LhiuDkm97kl+jmo97k'+
    'mLfba8/ghs7ghqTXVabXWKrYXK3ZYKDWUZ7VTtXijrXaaZnUSeXloJbURsDddanYW5fUR5LTQMbf'+
    'faXXV4zSO73dcq7ZYJrVStfij9njkuPlndDhibncbcDddsbefKjYWsDddqPXVaPWVJPUQsnfgIvR'+
    'OYrROMzgg4bQNMTee5TTRI3SO5zVTLTaaJjVR4jRNrLaZpLTQafXWrLaZbnbbgAAAAAAAAAAACH+'+
    'GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwA'+
    'AAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAML'+
    'E4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaD'+
    'ERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQACgABACwAAAAAEAAQAAAH'+
    'jIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hL'+
    'UbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb'+
    '04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAAKAAIALAAAAAAQABAAAAeJgACCg4SFhQkK'+
    'E2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0pu'+
    'aoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtA'+
    'L9yGRgkbcvggEq9atUAAIfkEAAoAAwAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZ'+
    'Z1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zH'+
    'kFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwF'+
    'GAFvKRwUCAAh+QQACgAEACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVE'+
    'PAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3'+
    'Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5'+
    'BAAKAAUALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZW'+
    'QYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyD'+
    'N9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkEAAoABgAsAAAAABAA'+
    'EAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjcz'+
    'rJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUW'+
    'VnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAAKAAcALAAAAAAQABAAAAeLgACCg4SFhjc6'+
    'RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpj'+
    'ggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgce'+
    'YY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA';
    
function debug() { var msg = ''; for (var i = 0, n = arguments.length; i<n; ++i) msg += arguments[i] + ' '; setTimeout(function() { throw new Error("[debug] " + msg); }, 0);}
$ = document.getElementById;
function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}
function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}
function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles)
    for (var prop in styles)
      n.style[prop] = styles[prop];
  if (content)
    n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}
function remove(node){ if (node) return node.parentNode.removeChild(node); }
function replace(node,newNode){ if (node) { node.parentNode.insertBefore(newNode,node); node.parentNode.removeChild(node); } }
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); }

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText); }
  });
}
function getCRs(page){
  if (page && tableBody) {
    $('okMore').innerHTML = titleText + ' [' + $X("//*[@id='finishedReports']/table/tfoot//a").innerHTML+']';
    var rows = $x(".//*[@id='finishedReports']/table/tbody/tr",node("div", "", "", page));
    //debug("rows: "+rows.length);
    for (var i = 0; i < rows.length - 4; ++i) tableBody.appendChild(rows[i]);
    if (enableCounts) { attack_counter(); }
  }
}

function getNextPage(){
  var nextPage = $X("//*[@id='finishedReports']/table/tfoot//a");
  if (nextPage) {
    $('okMore').innerHTML = '<img src="'+loadingImg+'" width="16" height="16" style="margin:2px;"/>';
    replace(nextPage,node('span','','',nextPage.innerHTML));
    get(nextPage.href, getCRs);
  }
}
function main(){
  titleText = $X("//*[@id='troopsOverview']/div/h3/span/text()").nodeValue;
  tableBody = $X("//*[@id='finishedReports']/table/tbody");
  var rows = $x("./tr",tableBody);
  if (rows.length == 14) {
    var newFoot = node("tfoot",'','');
    newFoot.appendChild(remove(rows[10]));
    newFoot.appendChild(remove(rows[11]));
    newFoot.appendChild(remove(rows[12]));
    newFoot.appendChild(remove(rows[13]));
    tableBody.parentNode.appendChild(newFoot);
    
    var temp = $('finishedReports').appendChild(node('div','okMore',{background:'PaleGoldenRod',fontSize:'16px',textAlign:'center',cursor:'pointer',height:'20px'},titleText + ' ['+$X(".//a",rows[10]).innerHTML+']'));
    temp.id = 'okMore';
    onClick(temp,getNextPage);
/*
    $(window).scroll(function(){
      if( tnt_twitter.is_scroll_bottom() )
      {
        tnt_twitter.timeline_load_next_page();
      }
    }
*/
  } else { return false; }
  if (enableCounts) { attack_counter(); }
}



var tableBody;
var reportTimer;
var titleText;

if ($('servertime') && (document.body.id == "militaryAdvisorCombatReports")) {
  main();
}

//document.addEventListener('DOMMouseScroll', function(e){ debug('hi you scrolled',e.detail,document.body.scrollTop); }, false); 







function trim(str) {
  var	str = str.replace(/^\s\s*/, ''),
    ws = /\s/,
    i = str.length;
  while (ws.test(str.charAt(--i)));
  return str.slice(0, i + 1);
}




function attack_counter(){
  var CURRENTYEAR = new Date().getFullYear();
  function parsedate(date){
    date = trim(date);
    s=date.split(' ');
    d=s[0].split('.');
    t=s[1].split(':');
    return new Date(CURRENTYEAR,d[1]-1,d[0],t[0],t[1]) - 0; // Date cast to int
    // new Date(year, month, date [, hour, minute, second, millisecond ])
  }
  function townadd(name){ counts[name] = counts[name] ? counts[name] + 1 : 1; }

  var battlere = /^Battle for /;
  var seabatre = /^Sea battle near /;

  var counts = {};

  var servertime = parsedate(document.getElementById('servertime').innerHTML);
  var reports = $x("//form[@id='finishedReports']/table/tbody/tr/td[3][@class='date']/..");
  for each(var report in reports) {
    var cells = report.getElementsByTagName('td');
    var date = cells[2];
    var rtime = parsedate(date.innerHTML);
    if((servertime - rtime) < (1000*60*60*24)){
      date.style.fontWeight = 'bold';
      if(cells[3].className == "subject won" || cells[3].className == "subject won new"){
        t = $X('./a/@title',cells[3]).nodeValue;  //todo, move RE inside XPATH
        t = t.replace(battlere, '');
        t = t.replace(seabatre, '');
        townadd(t);
      }
    } else {
      break;
    }
  }
  for each(var report in reports) {
    var temp, cells = report.getElementsByTagName('td');
    var td = cells[3];
    if(td.className == "subject won" || td.className == "subject won new"){
      t = $X('./a/@title',cells[3]).nodeValue;  //todo, move RE inside XPATH
      t = t.replace(battlere, '');
      t = t.replace(seabatre, '');
      if (counts[t]) {
        if (temp = $X('./span',td)) {
          temp.innerHTML = "[ " + counts[t] + " ]";
        } else {
          td.appendChild(node('span','','',"[ " + counts[t] + " ]"));
        }
        td.style.backgroundColor = (counts[t] >= 6) ? bashingColor : hilightColor;
        delete counts[t];
      }
    }
  }
}