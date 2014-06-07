// ==UserScript==
// @name           Weibo Read It Later
// @namespace      http://userscripts.org/users/413684
// @description	   add Read It later links to weibo webpage
// @version        0.2
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include        http://*weibo.com/*
//
// ==/UserScript==

(function(){
        // change from src http://readitlaterlist.com/button/multi_v1.js
        var RILBUTTONS = 0;
        function RIL_button(url, title, img, width, height)
            {
                var custom = false;
                if (!width || !height){
                    width = 85;
                    height = 16;
                }
                else
                    custom = true;	

            RILBUTTONS++;
            var iframe = '<iframe class="readitlater_button" id="readitlater_button'+
                        RILBUTTONS+
                        '" allowtransparency="true" frameborder="0" scrolling="no" width="'+width+
                        '" height="'+height+'" style="z-index: 2000; overflow: hidden;'+
                        (custom?'':'position:relative;top:3px')+'"'+
                        'src="http://readitlaterlist.com/button?url='+encodeURIComponent(url)+
                        '&title='+encodeURIComponent(title.replace(/^\s\s*/, '').replace(/\s\s*$/, ''))+
                        '&via='+encodeURIComponent(document.location.host)+
                        (img?'&img='+encodeURIComponent(img):'')+
                        '"></iframe>';

               return iframe
            }

    
	function RIL(){
	    var wblist = $(".feed_list:not(:has([ril='true'])) > .content");
	    wblist.each(function(index){
		    var $this = $(this);
    		var content = $.trim($('p[node-type="feed_list_content"]', $(this)).text()); //获取微博内容
            var toolbar = $('> .info', $this);
            var href = "http://weibo.com" + $(".date", toolbar).attr('href'); //构建微博的访问地址
            var target = $("span", toolbar);
            target.append(RIL_button(href, content));  //把构建的button直接追加到各微博信息上面
            $this.attr('ril', 'true');
	});
	}
	
	//home feed 改变的时候再追加一次检查
	var hassetup = false;
	var $homeFeed = $('#pl_content_homeFeed');  //只检查微博显示区域
	function changed(){
		//document.addEventListener('DOMNodeInserted', function(){
		$homeFeed.bind('DOMNodeInserted', function(){
			if (!hassetup) {
				window.setTimeout(function(){
					RIL();
					hassetup = false;
				}, 2000);
				hassetup = true;
			}
		})
	}
	setTimeout(RIL, 5000);
	setTimeout(changed, 10000);
})()