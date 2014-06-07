// ==UserScript==
// @name         Videoweed Free Downloader
// @autor		 crumbl3d
// @description  Changes the link of Download File Here to OvGet download ...
// @include      *videoweed.es/file/*
// @version      1.0
// @copyright	 2014, crumbl3d
// ==/UserScript==

var buttons = document.getElementsByClassName('profile_btn');
for(var i = 0; i < buttons.length; i++)
{
    if (buttons[i].id="premium_download_file")
    {
        var myurl = document.URL;
		myurl = myurl.replace("http://","");
		myurl = myurl.replace(/\//g,"%2F");
        myurl = "http://www.ovget.com/?url=" + myurl;
        document.getElementsByClassName('profile_btn')[i].href = myurl;
    }
}