// ==UserScript==
// @name           ChatWork Image Thumbnail
// @namespace      http://www.akiyan.com/
// @include        https://www.chatwork.com/*
// ==/UserScript==

(function() { TimeLineView.prototype.getTimeLineOrg = TimeLineView.prototype.getTimeLine; TimeLineView.prototype.getTimeLine = function(a, f) { var html = this.getTimeLineOrg(a, f); var elm = $(document.createElement("div")); elm.get(0).innerHTML = html; $(".ui_sp_favicon_parent", elm).each(function(i, anchor) { var v = $(anchor); if (v.attr("href").match(new RegExp("^http://gyazo\.com/|\.(png|jpg|gif|jpeg)$")) && !v.data("img-added")) { v.data("img-added", true); var img = document.createElement("img"); var url = v.attr("href"); if (url.match(new RegExp("^http://gyazo\.com/"))) url += ".png"; $(img).attr("src", url).css({"max-width": "300px", "max-height": "300px" }); var imgBlock = $(document.createElement("div")).css({"line-height":"300px", "vertical-align":"middle", "text-align":"center", margin:"4px 0", padding: "2px", border:"1px solid #ccc", height:"300px", width:"300px"}).append(img); v.css({display:"block"}).append(imgBlock); } }); return elm.get(0).innerHTML; }})();
