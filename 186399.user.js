// ==UserScript==
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://static.acfun.tv/dotnet/20130418/script/member/script.js
// @name           Acfun助手
// @description    AC助手
// @match          http://www.acfun.tv/v/*
// @match          http://www.acfun.tv/a/*
// @author         橙橙
// @version        1.0
// ==/UserScript==

/*anti-fanbai*/
(function(){
	window.onload=function(){
    setTimeout(function(){
		var comment_area = $("#area-comment-inner");
		var fanbai = $("font[color=#FFFFFF]");
		fanbai.css({
			"color":"red",
			"font-style":"italic"
		});
		comment_area.css("font-family","Microsoft YaHei");
		/*insert image*/
		$("#btn-send-editor").after("<a href=\"javascript:void(function(){var%20d%20=%20document,a%20=%20'setAttribute',s%20=%20d.createElement('script');s[a]('type','text/javascript');s[a]('src','http://acfind.sinaapp.com/sinaimg/bookmark.js');d.head.appendChild(s);})();\" class='btn-active-theme btn primary' style='margin-left:5px'><i class='icon white icon-folder-open'></i>插入大图</a>");
    },2000);
}
})();

/*acfind button*/
(function(){
    var iSpan = document.createElement("span");
	iSpan.class = "acfind";
	iSpan.innerHTML = "<br><form action='http://kagami.me/acfind/index.php' method='post' target='_blank' style='display:inline;margin:0;'><input type='hidden' name='url' value='"+document.URL+"' ><button type='submit' title='弹出窗口去Acfind观看视频 ┏ (゜ω゜)=☞' class='btn-active-theme btn primary' style='margin-top: -20px;'><i class='icon white icon-heart'></i>Acfind!</button></form>";
    document.getElementById("share-article").appendChild(iSpan);
})();

/*switch html5 player*/
(function(){
	$("#share-article").append("<button class='btn-active-theme btn primary' title='切换为HTML5播放器,妈妈再也不担心我的Flash崩溃惹QAQ' style='margin-left:5px;margin-top: -20px;' onclick=\"javascript:(function(){var l = document.createElement('link');l.setAttribute('rel','stylesheet');l.setAttribute('media','all');l.setAttribute('href','http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.css');document.body.appendChild(l);var s = document.createElement('script');s.setAttribute('src','http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.js');document.body.appendChild(s);})();\"><i class='icon white icon-play-circle'></i>HTML5</button>");
})();

/*google custom search*/
(function(){
	function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
	}
	addStyle('.gsc-control-cse { background-color: transparent !important;width: 200px !important;top: 0 !important;right: 18px !important;position: absolute !important;border-color: transparent !important;margin-top: -10px !important;margin-right: 28px !important;position: fixed!important; }');
	addStyle('.gsc-input { width: 100px !important;margin-top: -15px !important; }');
	addStyle('.hint { display:none !important; }');
	addStyle('#area-share { display:none !important; }');
	addStyle('#area-article-info { display:none !important; }');
	//simplify and beautify acfun
	addStyle('#block-guide-footer { display:none !important; }');
	addStyle('#footer { display:none !important; }');
	addStyle('#guide { position:fixed !important; }');
	addStyle('.avatar { border-radius:50px !important;-webkit-transition:.4s all ease-in-out;-moz-transition:.4s all ease-in-out;transition:.4s all ease-in-out }');
	addStyle('.avatar:hover { -webkit-transform:rotate(360deg);-webkit-transition:.4s all ease-in-out;-moz-transform:rotate(360deg);-moz-transition:.4s all ease-in-outtransform:rotate(360deg);transition:.4s all ease-in-out }');
	//addStyle('#ACFlashPlayer-re { display:none !important; }');
	$("body").append("<gcse:search></gcse:search>");
	$("#search-guide").css({
		"opacity":"0",
		"position":"absolute"
	});
})();
(function() {
  (function() {
    var cx = '011185792368681800309:ynktq1v4z6g';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
})();

/*change player width*/
(function(){
function changeTo(wid) {
    wid = Math.floor(wid);
    if (wid == 0) {
        return;
    }
    var w = wid + 330;
    var h = Math.floor(wid / 16 * 10) + 40;
    if (h < 480) {
        h = 480;
    }
    var l = 0;
    if (wid + 6 > 980) {
        l = -Math.floor((wid + 6 - 980) / 2);
    }
    $("#ACFlashPlayer-re").css({
        width: w + "px",
        height: h + "px",
        left: l + "px",
        top: "0px"
    });
}

if (document.getElementById("ACFlashPlayer-re")) {
    var myscript = document.createElement("script");
    myscript.textContent = changeTo.toString();
    document.body.appendChild(myscript);

    var myspan = document.createElement("span");
    myspan.innerHTML = "<button class='btn-active-theme btn primary' style='margin-left:5px;margin-top: -20px;' onmouseover='$(\"#change-title\").show();$(\"#change-title\").mouseleave(function() {$(this).hide();});'><i class='icon white icon-align-left'></i>改变宽度</button><span id='change-title' style='float:right;display:none;'>宽度:<a href='javascript:void(0);' onclick='changeTo(540);'>540</a> <a href='javascript:void(0);' onclick='changeTo(650);'>650</a> <a href='javascript:void(0);' onclick='changeTo(720);'>720</a> <a href='javascript:void(0);' onclick='changeTo(800);'>800</a> <a href='javascript:void(0);' onclick='changeTo(864);'>864</a> <a href='javascript:void(0);' onclick='changeTo(960);'>960</a> <a href='javascript:void(0);' onclick='changeTo(1280);'>1280</a></span>";
    document.getElementById("share-article").appendChild(myspan);
}
})();

/*search avatar*/
(function() {
	//var floor = $("div[data-layer=87] .avatar");
	//floor.attr("src","http://bbs.comicat.us/logo.png");		
	$("#share-article").append("<form method='post' action='http://www.google.com.hk/searchbyimage'><button type='submit' id='ava' class='btn-active-theme btn primary' title='交出头像我们还是好朋友！' style='margin-left:5px;margin-top: -20px;'><i class='icon white icon-picture'></i>交头还友</button><input class='floor' type='text' style='width:78px;height:32px;margin-left:5px;margin-top: -21px;position:absolute;' onmouseover='this.select()' placeholder='头像所在楼层' value='1'>");
})();

/*change player*/
(function(){
	//$("#mainer-inner").remove("div[id=area-player]");
	
	/*var oSpan = document.createElement("span");
	oSpan.innerHTML = '<object type="application/x-shockwave-flash" data="http://www.acfun.tv/player/ac947170" width="540" height="405" id="videoPlayer" style="visibility: visible; "><param name="quality" value="high"><param name="allowScriptAccess" value="never"><param name="wmode" value="transparent"><param name="allowFullscreen" value="true"><param name="autostart" value="false"><param name="autoplay" value="false"><param name="flashvars" value="playMovie=true&amp;auto=0&amp;play=false&amp;autoPlay=false&amp;isAutoPlay=false"></object>';
    document.getElementById("area-player").appendChild(oSpan);*/
});

/*decode tudoucode*/