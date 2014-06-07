// ==UserScript==
// @name       Vdisk Direct Download
// @version    0.0.1
// @author     Caomu
// @description  新浪微博的微盘每次下载都弹出分享好蛋疼，这个脚本能让点击下载按钮直接就下载文件了。
// @require    http://lib.sinaapp.com/js/jquery/1.8.2/jquery.js
// @include    http://vdisk.weibo.com/*
// ==/UserScript==
(function(){
    var proxy = function(fn){
			var script = document.createElement('script');
			script.textContent = '(' + fn.toString() + ')();';
			document.body.appendChild(script);
		};
    proxy(function(){
    	function vdd(){
            var vdisk = window.vdisk
            if(vdisk){
                var dlbtn = $('#download_big_btn');
                if (dlbtn){
                    var event = dlbtn.data("events");
                    if (event){
                        var clickevent = dlbtn.data("events")['click'];
                        if (clickevent){
                            dlbtn.unbind();
                            var fid = vdisk.pagedata.fileinfo.fid;
                            if (fid){
                                function dlf(){vdisk.api.downloadFile(fid)};
                                dlbtn.click(function(){dlf()});
                                clearInterval(bvdd);
                            };                        
                        };
                    };
                };
            };
        };
		var bvdd = setInterval(vdd,100);
    });
})();