// ==UserScript==
// @name           tsinaAvatarShower
// @namespace      http://www.zeali.net/tsina/AvatarShower
// @description    show 180X180 avatar picture on mouseover
// @include        http://t.sina.com.cn/*
// ==/UserScript==
(function() {
    var style = document.createElement("style");
    style.innerHTML = "div#weiboAvatar180{text-align:center;z-index:999;position:absolute;top:0px;left:0px;display:none;width:180px;height:180px;border:1px solid black;background-color:white;opacity:1.0;padding:10px;}div#weiboAvatar180 img.avatar{display:block;width:180px;height:180px;}div#weiboAvatar180 img.loading{margin:50px auto;}";
    document.getElementsByTagName("head")[0].appendChild(style);

    var tip = document.createElement("div");
    tip.setAttribute("id", "weiboAvatar180");
	tip.innerHTML = '<img id="weiboAvatarLoading" class="loading" src="http://simg.sinajs.cn/miniblog/images/common/loading.gif" />';
    document.getElementsByTagName("body")[0].appendChild(tip);

	var hideTip = function(){
        tip.style.display = "none";
    };

	var regx = /^http:\/\/(.+?)\.sinaimg\.cn\/([0-9]+)\/50\/([0-9]+)$/;
	var anchors = document.getElementsByTagName('img');
	for (var i = 0; i < anchors.length; i++) {	
		var curA = anchors[i];
		var src = curA.getAttribute('src');
		var matches = null;
		if(null == (matches = regx.exec(src,0)) || matches.length <= 1){
			continue;
		}

		curA.addEventListener("mouseover", function(e){try{
			tip.innerHTML = '<img id="weiboAvatarLoading" class="loading" src="http://simg.sinajs.cn/miniblog/images/common/loading.gif" />';
			tip.style.top = (e.pageY) + "px";
			tip.style.left = (e.pageX+4) + "px";
			tip.style.display = "block";
			var imgPreloader = document.createElement('img');
			imgPreloader.addEventListener('load',function(){
				tip.replaceChild(imgPreloader,document.getElementById('weiboAvatarLoading'));
			}, false);
			imgPreloader.setAttribute('src', this.getAttribute('src').replace(/\/50\//,"/180/"));
		}catch(ex){alert(ex.message);}}, false);

		curA.addEventListener("mousemove", function(e){
			tip.style.top = e.pageY + "px";
			tip.style.left = (e.pageX+4) + "px";
		}, false);
		curA.addEventListener("mouseout", hideTip, false);
		curA = null;
	}
})();
