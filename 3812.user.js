// ==UserScript==
// @name           Douban Avg Star Level
// @namespace      
// @description    Add Average Stars Level to Subjects
// @include        http://www.douban.com/subject/*
// ==/UserScript==

const HALFSTAR_IMG = "data:image/gif,GIF89a%0C%00%0B%00%F7%00%00%FF%FD%FD%9D%0C%0C%8C%00%00y%00%00%A9JJ%F7%ED%ED%FF%FE%FE%EF%F5%EF%F3%F1%EE%E8%C7%C7%E6%CE%CE%ABYY%EB%CB%CB%F2%E1%E1%EE%D4%D4%E7%CD%CD%EE%E4%E1%FE%FB%FB%F7%F8%F5%D6%99%99%D8%AA%AA%F7%E9%E9%AA%2B%2B%90%00%00%C0vv%A5%1F%1F%E1%B4%B4%E8%C5%C5%E5%C3%C3%B1%3B%3B%AB66%CF%86%86%C9%91%91%99%20%20%8D%1D%1D%99%14%14%CD%9F%9F%ED%D2%D2%F9%F0%F0%FB%F7%F7%D5%95%95%D8%9D%9D%A5BB%A2JJ%B8PP%BE%5B%5B%EC%D6%D6%EC%E2%DF%EF%D7%D7%A3%22%22%A8%26%26%B9kk%B9rr%89%0B%0B%DE%AC%AC%E2%B8%B8%AF%5E%5E%DE%C1%BE%F6%EB%EB%CC%80%80%82%00%00%F8%FB%F8%F7%FA%F7%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%0C%00%0B%00%00%08s%00%0F%F8%18(a%07%85%1F%08%11%F6H%F8%83%00%09%09%0C%7D%24%D4%E1!%C7%0B%86%08N%18%F8%C1a%C4%0B%8B%10%20%7C%9C%81%83%06%81%0B%3Fr%A8%A4A%E2%05%08%11%03x%A0%FC%81%80D%8E%1E%12%15%AC%E0!%E0%07%04%12.%10J%FCA%82'%04%09%07%85%FE%00%B0%60%40%08%12%0A%14%40P%FA%A0%86%0A%175A%E4P%F8%83%02%86%02%08%23%90%20%810%20%00%3B";
const level1text = decodeURI("%E5%BE%88%E5%B7%AE");//trick, because greasemonkey does not support utf-8 script
const level2text = decodeURI("%E8%BE%83%E5%B7%AE");
const level3text = decodeURI("%E8%BF%98%E8%A1%8C");
const level4text = decodeURI("%E6%8E%A8%E8%8D%90");
const level5text = decodeURI("%E5%8A%9B%E8%8D%90");
const levelavgtext = decodeURI("%E5%B9%B3%E5%9D%87");
const levelmap = {};
levelmap[level1text]=1;
levelmap[level2text]=2;
levelmap[level3text]=3;
levelmap[level4text]=4;
levelmap[level5text]=5;

function xpath(query) {
  return document.evaluate(query, document, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getLevelNum(aspan) {
  if (aspan.parentNode.tagName.toLowerCase()=="a"){
    return Number(aspan.parentNode.nextSibling.nodeValue);
  } else {
    return Number(aspan.nextSibling.nodeValue);
  }
}

function generateAvgStarSpan(avg) {
  var fixavg = Math.floor(avg);
  var avgspan = document.createElement('span');
  avgspan.title = levelavgtext;
  for (var i=1; i<=fixavg; ++i) {
    avgspan.innerHTML += '<img src="/pics/sts.gif">';
  }
  if (avg - fixavg > 0.5) {
    var hstar = document.createElement('img');
    hstar.src = HALFSTAR_IMG;
    avgspan.appendChild(hstar);
  }
  else {
    avgspan.innerHTML += '<img src="/pics/nsts.gif">';
  }
  for (var i=1; i<=5-fixavg-1; ++i) {
    avgspan.innerHTML += '<img src="/pics/nsts.gif">';
  }
  return avgspan;
}

alinks = xpath("//a[text()='"+level5text+"']");
if (alinks.snapshotLength==0) alinks = xpath("//a[text()='"+level4text+"']");
if (alinks.snapshotLength==0) return;
starsdiv = alinks.snapshotItem(0).parentNode;
spans = starsdiv.getElementsByTagName('span');

var sum = 0;
var count = 0;

for (var i=0; i<spans.length; ++i)
{
  if (spans[i].title in levelmap){
    num = getLevelNum(spans[i]);
    level = levelmap[spans[i].title];
    sum += num*level;
    count += num;
  }
}
if (count == 0) return;

starsdiv.innerHTML += levelavgtext + "&nbsp;&nbsp;&nbsp;";
starsdiv.appendChild(generateAvgStarSpan(sum/count));
starsdiv.innerHTML += "&nbsp;&nbsp;&nbsp;" + count.toString() + "<br/>";