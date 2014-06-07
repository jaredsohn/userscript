// ==UserScript==
// @name           Video Download link (SP)
// @namespace      http://services.sample.me.uk/greasemonkey/vid_download_sp
// @match          http://www.stileproject.com/video/*
// @include        http://www.stileproject.com/video/*
// ==/UserScript==
//function addDownloadLink() {
    var test = document.body.innerHTML;
    var regex = new RegExp("file=(http://[a-zA-Z0-9./+_-]*)","igm");
    //var regex = new RegExp("file=(http://[a-zA-Z0-9./+_-]*\.mp4)","igm");
    var res = regex.exec(test);
    var vidurl = res[1];
//alert("Here: " + vidurl);
	document.getElementById('va8').innerHTML = '<a href="' + vidurl.replace('+',' ') + '">Download</a>';
    //document.getElementById('watch').innerHTML = '<a href="' + vidurl.replace('+',' ') + '">Download</a>';
//}
//GM_registerMenuCommand("Add Download Link", addDownloadLink, undefined, undefined, "A");
//addDownloadLink();
//javascript:test=document.body.innerHTML;regex=new RegExp("file=(http://[a-zA-Z0-9./+_-]*\.mp4)","igm");res=regex.exec(test);vidurl=res[1];document.getElementById('watch').innerHTML='<a href="'+vidurl+'">Download</a>';