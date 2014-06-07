// ==UserScript==
// @name           Merriam-Webster Sound File Link ReWriter
// @namespace      http://www.xiaolai.net
// @description    This script converts m-w.com sound file links which otherwise would open a new window into links that point to acutual wav files.
// @include        http://*.merriam-webster.com/*
// ==/UserScript==
// checkremove function adopted from http://userscripts.org/scripts/review/19456

function MWSL_Rewrite()
{
  for(var i=0;i<document.links.length;i++)
  {
    var linkelem = document.links[i];
    var linkregexp=/^onclick=\"return au\(\'(.?)(.*)\',$/i;
    if(linkelem.href.match(linkregexp))
    {
      linkelem.href="http://media.merriam-webster.com/soundc11/"+RegExp.$1+"/"+RegExp.$1+RegExp.$2;
    }
  }
}

function docEval(evalString)
{
    var evaluated;
    var evaluated  = document.evaluate(
    evalString,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    return evaluated;
}

function Ev(evalString)
{
    var evaluated  = docEval(evalString);
    var evaluatedReturn = evaluated.snapshotItem(0);
    return evaluatedReturn;
}

function pOut(child)
{
child.parentNode.removeChild(child);
}

function removeX(xpathString)
{
    var thisNode = Ev(xpathString);
    pOut(thisNode);
}

function removeAll(tagName){
    var allTags = document.getElementsByTagName(tagName);
    for(var i = 0; i < allTags.length; i++)
    {
        var thisTag = allTags[i];
        pOut(thisTag);
    }
}

function checkRemove(xpStr)
{
    if(Ev(xpStr))
    {
        removeX(xpStr);
    }
}


window.addEventListener("load", function() { MWSL_Rewrite(); }, true);

checkRemove("//div[@class='left_col']");
checkRemove("//div[@class='main_ad']");
checkRemove("//div[@class='banner_ad']");
checkRemove("//div[@class='hnav_bar']");
// checkRemove("//div[@class='search_bar']");
checkRemove("//div[@class='ad_space']");
checkRemove("//div[@class='result_adhealthline']");
checkRemove("//div[@class='result_ad last']");
checkRemove("//div[@class='INV2']");
checkRemove("//div[@class='footer']");
checkRemove("//td[@class='left_col']");

// checkRemove("//div[@class='promo']");
// checkRemove('/html/body/table[3]/tbody/tr/td[1]');