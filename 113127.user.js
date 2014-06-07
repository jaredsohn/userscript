// ==UserScript==
// @name          Anorak Zone
// @description	  Calculate views/days ratio for threads
// @include       http://anorakzoneforum.informe.com/forum/*/
// @include       http://anorakzoneforum.informe.com/forum/
// @include       http://anorakzoneforum.informe.com/forum/*search_id=newposts*
// ==/UserScript==

var lis, li, ddposts, ddviews, ratio, ddvtn, reg;
var threadt, stdate, nowdate;
var ratiorep, gotdate, denom, qual;
var i, m;

lis = document.evaluate(
    "//li[starts-with(@class,'row')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

reg = /on (.* [ap]m)/;
nowdate = new Date(Date.now());

for (var i = 0; i < lis.snapshotLength; i++)
{
  li = lis.snapshotItem(i);
  if (li)
  {
    gotdate = 0;
    // text node under LI starting 'by'
    threadt = document.evaluate(".//dt/text()[contains(string(.),'on')]", li, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (threadt) {
    // extract start date
      m = reg.exec( threadt.nodeValue );
      if (m) {
        if (m.length > 0) {
          //GM_log(m[1]);
          gotdate = 1;
          stdate = new Date(m[1]);
          //GM_log(stdate);
        }
      } else {
        GM_log("No date in '" + threadt.nodeValue + "'");
      }
    }
    // ".//dd" here means "dd at any level among the descendants of the context node li"
    ddposts = document.evaluate(".//dd[@class='posts']", li, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    ddviews = document.evaluate(".//dd[@class='views']", li, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (ddposts) {
      if (ddviews) {
        // we divide by days since thread start, if we know that quant, otherwise by posts
        if (gotdate) {
          denom = (nowdate.getTime() - stdate.getTime()) / 86400000;
          qual = "";
        } else {
          denom = ddposts.firstChild.nodeValue;
          qual = " *";
        }
        ddvtn = ddviews.firstChild;
        if (denom == 0) {
          ratio = 0;
        } else {
          ratio = ddvtn.nodeValue / denom;
        }
        if (ratio == 0 || ratio >= 100) {
          ratiorep = ratio.toFixed(0);
        } else {
          ratiorep = ratio.toFixed(1);
        }
        ddvtn.nodeValue = ddvtn.nodeValue + " (" + ratiorep + qual + ")";
      }
    }
  }
}

function xpath_one(path, context)
{
var nodes;

nodes = document.evaluate(path, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
return nodes.snapshotItem(0);
}
