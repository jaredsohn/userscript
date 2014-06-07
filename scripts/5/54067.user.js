// ==UserScript==
// @name           AltUse.com link fixer
// @namespace      http://bsdhosting.co.za/~jamesw/
// @description    Fixes the links on altuse.com so that you can open multiple windows
// @include        http://altuse.com/*
// @include        http://www.altuse.com/*
// ==/UserScript==

// altuse.com's has a bunch of javascript links:
// pSearch(n) - product search, maps to
//    /altuse/search.php?uParam=n&frmAction=4&searchType=4
// showDetail(n) - detail of alternative use, maps to
//    /altuse/detail.php?detail_id=n
// uSearch(m,n)  - other searches (users, categories, etc) maps to
//    /altuse/search.php?frmAction=m&searchType=m&uParam=n
// subscribe(m,n) - subscriptions or something maps to
// subs_useDetail.php?subsType=m&subsParam=n

//  There are others but this at least gets it functional

const pSearch_regex     = /pSearch\((\d+)\)/;
const uSearch_regex     = /uSearch\((\d+),(\d+)\)/;
const showDetail_regex  = /showDetail\((\d+)\)/;
const subscribe_regex   = /subscribe\((\d+),(\d+)\)/;
const subscribe2_regex  = /subscribe\((\d+),(\d+),(\d+)\)/;

for (var i = 0,                                         
        anchors = document.getElementsByTagName("a"),  
        num_anchors = anchors.length,                 
        anchor = null;                               
     i < num_anchors;
     i++)
{
    anchor = anchors[i];
    if (anchor.getAttribute("onclick") == null
        && anchor.href.indexOf("javascript:") == 0)
    {
        var pmatch = anchor.href.match(pSearch_regex);
        // do nothing if a link isn't found
        if (pmatch) {
            anchor.href = '/altuse/search.php?frmAction=4&searchType=4&uParam=' + pmatch[1];
            continue;
        }
        var umatch = anchor.href.match(uSearch_regex);
        if (umatch) {
            anchor.href = '/altuse/search.php?frmAction=' + umatch[1] + '&searchType=' + umatch[1] + '&uParam=' & umatch[2];
            continue;
        }
        var dmatch = anchor.href.match(showDetail_regex);
        if (dmatch) {
            anchor.href = '/altuse/detail.php?detail_id=' + dmatch[1];
            continue;
        }
        var smatch = anchor.href.match(subscribe_regex);
        if (smatch) {
            anchor.href = '/altuse/subs_useDetail.php?subsType='+smatch[1]+'&subsParam='+smatch[2]+'';   
            continue;
        }
        var zmatch = anchor.href.match(subscribe2_regex);
        if (zmatch) {	
            anchor.href = '/altuse/subs_useDetail.php?detail_id='+zmatch[3]+'&subsType='+zmatch[1]+'&subsParam='+zmatch[2]+'';   
            continue;
        }
    }
}
