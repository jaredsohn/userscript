// ==UserScript==
// @name           StarOnline UnClutter
// @namespace      http://userscripts.org/users/201329
// @description    Removes unwanted content from StarOnline homepage
// @include        http://www.thestar.com.my/
// @include        http://www.thestar.com.my/*
// @include        http://thestar.com.my/*
// @version        0.1 - 3rd Aug 2010
// ==/UserScript==

var el = "slider_outer,ad_midpage_expandable,features_specials,masthead,channels,opinion,world,mstar,lifestyle,entertainment,sports,dailychilli,clovetwo,parenthots,motoring,kuali,bskl_summary,videos,ad_rectangular,sidebar_facebook_twitter_links,latest_jobs_list,your_lifestyle_link"

function hideElement(eid) {
    if(document.getElementById(eid)) {
        document.getElementById(eid).style.display="none";
    }
}

var eli = el.split(",")

for(i = 0; i < eli.length; i++){
    if (eli[i] == "slider_outer") {
        if(document.getElementById(eli[i])) {
            document.getElementById(eli[i]).style.height=0;
            document.getElementById(eli[i]).style.width=0;
        }
    }
    else {
	   hideElement(eli[i]);
    } 
}
