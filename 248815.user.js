// ==UserScript==
// @name            ZhuZhu.cc_DownloadHelper_js
// @namespace       RealSex
// @description     ZhuZhu.cc_DownloadHelper_js
// @include         http://www.vrokddddddddddddd.cc/*
// ==/UserScript==

(function () {

    if (typeof VideoInfoList != "undefined" ) {
        var fvlist = document.createElement('div');
        var a = VideoInfoList.split('$'), ary = [];
        for (i = 0, ic = a.length; i < ic; i++) {
            if (a[i].length > 20) {
                ary.push(a[i]);
                ary.push("<br/>");
            }
        }

        fvlist.innerHTML = "<div id='fvlist' style='width: 100%; height: 60px;z-index:9999; background-color:#cccccc;padding:2px; overflow:auto'>" + ary.join("") + "</div>"
        document.body.insertBefore(fvlist,document.getElementsByTagName("div")[0]);
    }

    if (typeof playdata != "undefined" ) {
        var fvlist = document.createElement('div');
        var a = playdata[0].data, ary = [];
        for (i = 0, ic = a.length; i < ic; i++) {
                ary.push(a[i][1]);
                ary.push("<br/>");
        }

        fvlist.innerHTML = "<div id='fvlist' style='width: 100%; height: 60px;z-index:9999; background-color:#cccccc;padding:2px; overflow:auto'>" + ary.join("") + "</div>"
        document.body.insertBefore(fvlist,document.getElementsByTagName("div")[0]);
    }

    if (typeof VideoListJson != "undefined" ) {
        var fvlist = document.createElement('div');
	
        var ary = [];
	for (i1=0,ic1=VideoListJson.length;i1<ic1;i1++){
	var a = VideoListJson[i1][1];
        for (i = 0, ic = a.length; i < ic; i++) {
		var b=a[i].split('$');
                ary.push(b[1]);
                ary.push("<br/>");
        }
	}

        fvlist.innerHTML = "<div id='fvlist' style='width: 100%; height: 60px;z-index:9999; background-color:#cccccc;padding:2px; overflow:auto'>" + ary.join("") + "</div>"
        document.body.insertBefore(fvlist,document.getElementsByTagName("div")[0]);
    }



})();