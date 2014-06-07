// ==UserScript==
// @name       煎蛋无聊图优化脚本
// @namespace  http://be-evil.org/
// @version    0.2
// @description  优化煎蛋无聊图加载速度
// @match      http://jandan.net/pic
// @match      http://jandan.net/pic/*
// @match      http://jandan.net/ooxx
// @match      http://jandan.net/ooxx/*
// @copyright  2012+, 朦胧之影
// ==/UserScript==

$('.commentlist li p img').each(function() {
	if (/sinaimg\.cn/.test(this.src)) {
        var $this = $(this);
        var newSrc = this.src.replace(/(sinaimg.cn\/)(\w+)(\/.+\.(gif|jpg|png))$/, '$1thumbnail$3');
        var newImg = $('<img src="'+ newSrc +'" org_src="'+this.src+'" />');
        if (/\.gif$/.test(this.src)) {
            newImg.one('load', function() {
                var width = this.clientWidth;
                var height = this.clientHeight;
                var parent = $(this).parent();
                parent.css('position', 'relative');
                var position = $(this).position();
                var mask = $('<div class="gif-mask" style="position:absolute;top:'+position.top+'px;left:'+position.left+'px;width:'+width+'px;height:'+height+'px;line-height: '+height+'px;color:#fff;background-color:#000;cursor:pointer;text-align:center;opacity: 0.3;">点击播放动画</div>');
                mask.click(function() {
                    console.log('click');
                    this.innerHTML = '加载动画中...';
                	var img = $(this).parent().find('img');
                    var org_src = img.attr('org_src');
                    img.one('load', function() {
                        $(this).parent().find('.gif-mask').remove();
                    });
                    if (org_src != '') {
                        img.attr('src', org_src);
                    }
                });
                parent.append(mask);
            });
        } else {
         	newImg.one('click', function() {
            	var org_src = $(this).attr('org_src');
                this.src = org_src;
            });   
        }
        
		$this.parent().append(newImg);
        $this.remove();
	}
});