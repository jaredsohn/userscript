// ==UserScript==
// @id             iaskdownloadhelper@ywzhaiqi
// @name           iask download helper
// @version        1.0
// @namespace      http://ishare*.sina*.cn/f/*
// @author         ywzhaiqi
// @description    新浪爱问添加下载链接
// @include        http://ishare.iask.sina.com.cn/*
// @run-at         document-end
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var Iask = {
    MAX: 20,
    current: 1,
    init: function(){
        var download_btn = $("#download_file");
        if(download_btn.length == 0) return;

        // 略过 0分的
        var num = parseInt(download_btn.next().text());
        if(num == 0) return;

        var m = download_btn.attr("href").match(/fileid=(\d+)/);
        var fileid = m[1];
        if(!fileid) return;

        this.fileid = fileid;

        this.get();
    },
    get: function () {
        var url = "http://www.bangshouwang.com/xinl.asp?id=" + this.fileid;
        console.log("正在获取，目前第" + this.current + "次", url);
        GM_xmlhttpRequest({
            url: url,
            overrideMimeType: "text/html; charset=gb2312",
            onload: Iask.onload
        });
    },
    onload: function(res){
        var doc = new DOMParser().parseFromString(res.responseText, "text/html");
        // console.log(res.responseText);
        var links = $(doc).find("a[href^='http://sinastorage.cn']");
        if(links.length > 0){
            links.appendTo($("#downLoad .save_vd_btn"));
        }else{
            if(Iask.current > 20){
                return;
            }else{
                Iask.get();
            }
        }

        Iask.current++;
    }
};

Iask.init();