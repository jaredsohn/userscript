// ==UserScript==
// @name Original_size_image
// @author yansyrs
// @description 当图片被缩小时，显示原本尺寸的图片，可拖拽，可缩放
// @version v1.5.1
// @exclude *.jpg
// @exclude *.jpeg
// @exclude *.gif
// @exclude *.png
// @exclude *.bmp
// ==/UserScript==

(function (){
/*------------------------------设置-------------------------------*/
	//这里根据你的Opera页面缩放情况填入相关数值。如默认100%则填100。如果不使用Opera则不必理会这一项。
	//注：如果你的页面缩放不是100%，不调整这项值会造成居中错误的问题。
	var OP_PAGE_PERCENTAGE = 100;

	// 0——图片居中显示，如果过大，则缩放
	// 1——图片出现位置即查看按钮的位置，不缩放
	// 2——直接在鼠标旁边显示图片，不缩放
	var VIEW_STYLE = 0;

	// true——只在图片被缩小过（用户限定规则的除外），或者图片链接着另一张图片时显示查看按钮
	// false——任何图片（用户限定规则的除外）都显示查看按钮，如果图片链接着另一张图片，则显示被链接的图片，否则显示当前图片
	var VIEW_FILTER = true;
	
	//长或宽小于其自身最小值，则不显示查看按钮
	var MIN_WIDTH = 40;
	var MIN_HEIGHT = 40;
	
	//图片并未链接图片，且图片仅仅被缩小x%，或者x像素的，则不显示查看按钮
	var DEC_PERCENTAGE = 2;
	var DEC_PIX = 10;
	
	//显示查看按钮的时延，单位为毫秒
	var VIEW_BUTTON_DELAY = 100;
	
	//查看按钮出现的位置
	//0——左上
	//1——右上
	var VIEW_BUTTON_POS = 0;
	
	//显示预览图工具栏
	//true——显示；false——不显示
	var SHOW_TOOLS_BAR = true;
	
	//当VIEW_STYLE = 2时（鼠标悬停即显示）时，显示预览图的时延
	var VIEW_PREVIEW_DELAY = 100;
	
	//缩放方式
	//0——居中缩放
	//1——左上角对齐
	//2——按鼠标位置缩放
	var RESIZE_STYLE = 2;
	
	//显示原始尺寸方式
	//0——左上角对齐
	//1——按鼠标位置显示
	var ORIGINAL_STYLE = 1;
	
	//缩放速度，正数，值越大越快
	//注：当此参数为负数或零时，则不开启滚轮缩放图片功能。
	var RESIZE_SPEED = 5;
	
	//查看方式
	//true——当图片无链接，或链接的是一张图片，点击图片即可显示预览图，有可能与原有事件冲突。
	//false——必须点击查看按钮才显示预览图。
	var CLICK_DIRECT_VIEW = false;
	
	//CLICK_DIRECT_VIEW = true时，即使链接的不是一张图片也显示预览图。
	var ALWAYS_CLICK_DIRECT_VIEW = false;
	
	//EXCLUDE_IMG_LINK = true，当图片带链接时，则不做预览操作。
	//注：ALWAYS_CLICK_DIRECT_VIEW = true或者使用自定义规则时，会忽略这项值。
	var EXCLUDE_IMG_LINK = false;
	
	//CLEAR_ORG_IMG_OVER_HDLR = true时，会清除原有图片上的 onmouseover 属性
	//注1：此参数用于解决在一些网站上查看按钮无法正常显示的问题。如深度论坛，存在第一次能显示按钮，第二次则无法显示的问题。
	//注2：开启此参数可能会破坏该网页该图片原有的 onmouseover 事件。如果要开启此参数，建议在 SITE_STYLE_INFO 中单独设置。
	var CLEAR_ORG_IMG_OVER_HDLR = false;
	
	//鼠标单击预览图的事件
	//0——尺寸切换（屏幕适配或原始尺寸）
	//1——关闭预览图
	//其他——无动作
	var PREVIEW_CLICK_HDLR = 0;
	
	//当PREVIEW_CLICK_HDLR = 1时（关闭预览图），等待关闭的时延，用于兼容双击事件
	var PREVIEW_CLICK_CLOSE_DELAY = 300;
	
	//鼠标双击预览图的事件
	//0——关闭预览图
	//1——尺寸切换（屏幕适配或原始尺寸）
	//其他——无动作
	var PREVIEW_DBLCLICK_HDLR = 0;
	
	//点击空白处关闭预览图，有可能会与网页冲突
	//true——开启
	//false——关闭
	var CLICK_BLANK_TO_CLOSE = false;
	
	//说明：对于一些网站，不使用绝对路径的，可以添加替换规则
	//注：规则暂定，以后可能会变动。
	//true——开启规则检查
	//false——关闭规则检查
	var SITE_IMG_INFO_FLAG = true;
	//可按下面格式进行添加，只有在附件检查开启时才起作用
	//第一个值为图片匹配的正则表达式，第二个值为替换的内容，如何使用正则和替换，请自行搜索，或到论坛发帖求助
	//第三个值为可选值，可对替换后的链接地址作编码操作，可填常用编码函数，如 decodeURIComponent
	//以下设置可做参考
	var SITE_IMG_INFO = [
		[/http\:\/\/bbs\.themex\.net\/attachment\.php\?attachmentid\=(\w+).*\&thumb\=1\&d\=(\w+)/, 'http://bbs.themex.net/attachment.php?attachmentid=$1&d=$2'],
		[/http\:\/\/(\w+)\.douban\.com\/view\/photo\/thumb\/public\/(\w+)/, 'http://$1.douban.com/view/photo/photo/public/$2'],
		[/http\:\/\/126\.fm\/(\w+)s$/, 'http://126.fm/$1'],
		[/http\:\/\/oimage\w\w\.ydstatic\.com\/image\?.*(http.*126\.fm.*)/, '$1', 'decodeURIComponent'],
		[/http:\/\/bbs\.operachina\.com\/download\/file\.php\?id\=(\w+)&t=1/, 'http://bbs.operachina.com/download/file.php?id=$1&mode=view'],
		[/http\:\/\/static\.minitokyo\.net\/thumbs\/(\d+)\/(\d+)\/(\d+)\.(\w+)\?(\w+)/, 'http://static.minitokyo.net/view/$1/$2/$3.$4?$5'],
		[/http\:\/\/farm(\d)\.static\.flickr\.com\/(\d+)\/(.+)_m\.(\w+)/, 'http://farm$1.static.flickr.com/$2/$3.$4'],
	];
	
	//说明：特例网站设置
	//第一个值为站点匹配的正则表达式，第二个值为特例设置
	//以下设置可做参考
	var SITE_STYLE_INFO = [
		[/http\:\/\/www\.douban\.com\/online\/\d+\/album\/\d+\//, 'CLICK_DIRECT_VIEW = false; VIEW_STYLE = 2; VIEW_PREVIEW_DELAY = 250;'],
		[/http\:\/\/t\.163\.com\//, 'CLICK_DIRECT_VIEW = false; VIEW_STYLE = 2; VIEW_PREVIEW_DELAY = 100;'],
		[/http\:\/\/www\.flickr\.com\/photos\//, 'CLICK_DIRECT_VIEW = false; VIEW_STYLE = 2; VIEW_PREVIEW_DELAY = 100;'],
		[/http\:\/\/tieba\.baidu\.com\/.+\/tupian/, 'MIN_WIDTH = 200; MIN_HEIGHT = 200;'],
		[/http\:\/\/hi\.baidu\.com\/.+\/album/, 'MIN_WIDTH = 200; MIN_HEIGHT = 200;'],
	];
/*---------------------------设置结束---------------------------------*/
	var target_obj = null;
	var preview_div = null;//大图的整个框架
	var preview_head = null;//大图上面的三个按钮栏
	var preview_icon_view = null;//原始尺寸按钮
	var preview_icon_fit = null;//屏幕适配按钮
	var preview_icon_close = null;//关闭按钮
	var preview_img = null;//大图
	var preview_img_clone = null;//用于解决页面未加载完时大图无法显示的问题
	var icon_view = null;//移到可放大的图片时显示的图标
	var preview_loading = null;
	var preview_loading_close = null;
	var preview_loading_close_icon = null;
	var preview_loading_img = null;
	
	var timmer = null;//用于延时显示查看按钮
	var get_size_timmer = null;//用于获取图片尺寸
	var get_size_timeout_timmer = null;//获取图片尺寸超时
	var close_preview_timmer = null;//用于单击图片关闭预览图
	//如果图片链接的是一张新图，尺寸要改变过两次才可信？？
	var org_pre_width = 0;//辅助获取新图的尺寸
	var org_cur_width = 0;//辅助获取新图的尺寸
	var org_count = 0;////辅助获取新图的尺寸
	var org_width = 0;
	var org_height = 0;
	//用于预览图拖拽
	var drag_flag = false;
	var offset_x = 0;
	var offset_y = 0;
	var preview_down_x = 0;//鼠标在预览图上点下的坐标
	var preview_down_y = 0;
	var create_lock = false;
	
	// 用于缩放
	// 0——双击还原
	// 1——双击屏幕适配
	var fit_flag = 1;
	var percentage = 100;
	
	var viewWidth = window.opera ? window.innerWidth / (OP_PAGE_PERCENTAGE / 100) : window.innerWidth;
	var viewHeight = window.opera ? window.innerHeight / (OP_PAGE_PERCENTAGE / 100) : window.innerHeight;
	
	var icon = {
		view: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAR6SURBVFiFxZdbiFR1HMc//3PO3M+cVWdnZ5w1ofISuiqiS09GkWQiaT0E9lAPrRChmbSUmAVbIHgpSli0oB4i6qHLGrpQBBKUPSrmsrvmlluwl7kY7dxvZ+bfgzvr7MyZcSS3vvBjhvn/znw/5/v/n/85R0gp+T+lVb68+/7xZ5Gi3zSLxoKbarYEQu7rPfDap3MASNHfs+cFw+NyL7Q/6WzG+PijD/uBWwCmWTQ8bg8bd59seKDLrnGsdztdKwINe0Z+i3Dg2CCZXLFhz/BAL5WklTq6TMGySmaZvr1bm5oDrFkR4J1Xd6BqKkWzbFnVqgNopCMvP0Z317KWetevCnL8wLaWelsG+PbCNQoFEwG3rULB5Lufr+Fy2v49gAACPp3YXyk+G7yMWRNhrUyzzMD5YRLpPJ0dBh63vXUAUTsoIOj3EmzXCbZ7SeWKXLj8J2UJQoi6ksCVsTDlkiTkNwj5vXT6DbweR91JWQJU5LRrnOjdzkOb7iWwRGdpu5egTyfk01GEYDI8A7I++mymgNtpozNg0NlhEOq4CfFw932cOrzTckq02h+cdo33Du6ge+0yHlx3D5+cvUTJLOH3eQn4PAR8OobuRNTGBegeB51+A2U2EUUIlnUYPPnoWpx2jdOHd/LikbPNAU4eeoLNazoB8Ljs9Dy1mZ8ujmO3aQTadQI+nUVel1VwACwyXCiKQFEEi71OulYGsWkqAOtWLeX0G7uaA3TPmlcn8kj3/UxG4yzyumjzOhuaV9SmO7GpCg6HDVWZH9X6lcHmAFbSNIXlSxdbxt5Iblfz1d8QQDRwuRPzO9E8gMpqXmhVe9Qn8B8AVGs+gBALl3Wtz6zqNiKrvV1KSS5fbOk+MLcpZQuUy9JyrFp1AKPXI/OaS2aZK9fCTEzPkErnWzJPpnNMROL88usUplmaNzY0Fm4O0PPWGUbGoyAEBbPMV+eHGfk9wkQsyWQsQTydvzVVFjWTyjMZTTIRTTB6PcYX3w+RK5ZACK6Mhdnz9pl5fnWLMJUp0NM3wKlDuzj34yh/J3KE/F6kBKQECaoQdTcYgGQ6z1Q0zlQswfSNJNOxFFOxBFf/uMGOLavZf3yQbM2TUt1lWIF47s0vadMdhPwGZSkpS4mUEq/Hgcdlt7xadLedbK7IVCw5WwmmZz+/+WGkzscygWrFU3mkTNw8cSkJ+nQ2rg7Vba8VKUKwcXWI0fEoE9H4nHkqU2jocdsHkkQ6z0Q0jttp45nHN+Cwa5bPApWy2VR2b9tAm+5kMtrcvCUAuDklT2/twu2wtXQVOO0aO7c8QDrb3LxlAIB9x84xfD3SUu+lq1O8dGKwpd6WAVKZAs/3DTA6Hm3aNzQWZu/Rs5hmCZumWFa15hahqmqJbDZrjHz9SlMDVVHQtMbcm9Yu5+Ln+5v+RzabRVW15ByAEEI5dPjg66c+6D9aLpf0pkffBSmKkg6Hw31CCLeovB0LIXyAD1gCeIH4XfZVgcVABpgBIkBEVL+eCyFUwAE4gexdBtAAG5AD8lLKEsA/MrexdRcV2gIAAAAASUVORK5CYII=',
		fit:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACyklEQVR42rSVS0hVURSGv7WvdvORZRbRO1HsgTRpUA56UVZEEQVRTQsKDJqEJjRoEIUPIqUsahBUM6OCXghBqFQ0DYoIhSyTkKCradnVe/dqcPY5nnNLm9iGwzqbtfZ31v3XWvuKqvI/VhZAfeP5a8DRKWJer605fQxVpa7hnE7Vqms4p0HG/hoaGuRtT4JVywoRBU8kJZ1OjweJMG1aHCEI4H1vgrJFs8jLnxGEmTD43ccBvv9Icr/zA4qiqqgCAoIgIgiAWqyCorS2d5MYHuX954GIHhHw8sUF9CdG6P06zPHm56haKmseIxgwDiyGLScfglqONLbT9XmQ7r4BShcWTAxWhd0VS+nuG+TLtxG217ahCmLAiA+GtFUqqx/RnxjhTc83Dm4uDWT5Kxi1qFouVq1jaGQMa9XJahAEHBwglVZ+JlPcqt2EunMTZ+zstlNtAdQLEjDish4/Yq2ytfrJeC0y+zjYZGWDwLMLuxFxX3IZioC4QnY07fFe8Iqqvm8isP8z8Y3Bbwmv/YznCmftfVAyRc0E+zn4Gw0cEvL7++Cc4Y/iRcDx+HQAKqpaI0GdzXv9VBFg/Yl7Ef+rq4e8gZmoeFYVa5WXLfvJlMiIcWyJQq8ccAOjk7Wboii7ah8Qz45hfK3FeNkaEwHHjLC9+r7rCp1sQJRLd19TPL+AwhlxOpr3ecUJHgm65GXLfubMzKG8uIjbT99NDu7qTVBePJuVSwu5c2YHqpaOpr3BKPvT9+KyJ9W9sztZu3Ie5cVFfOofjKgXKV7JgpkkU2k2rl6FVetKrd5dIepkEFRT3iWFsG9DCR/7h1g0Nz+MikXAObm5rFmR+++rPBaLbMuWTM+M8DJOpVI36hvPH56Kv4/R5OhNAFFVRCQG5AB5zmY5/bNC7yZUE+ueMSDl7CjwC/gBJH0wGSAJgSRkYyGwAumQtc6OAfb3AK6YX0CcAv8GAAAAAElFTkSuQmCC',
		full:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMQEww2YmW/YQAAADV0RVh0Q29tbWVudAAoYykgMjAwNCBKYWt1YiBTdGVpbmVyCgpDcmVhdGVkIHdpdGggVGhlIEdJTVCQ2YtvAAACjklEQVQ4y7WVTUhUURTHf+fMK5m0dAZCwo8MFBGEVkFYpBtB+gKL2kQtWhhkYi2SIFq0MEaHlgUJBS2CQrBFn2ZRtKloK0mgDNoXZeZHSs44zmvx7nvzxmamFnZ49517373nf77vg/9EAhDp7b4GtK0SZt+5rvMnMMD2alGkt9sGsPyqtrXdylD9pKcli4+CIIBNc9ejjK23fUe8uWbzRVU8UDEvQRBxIEVARHga3Y2qZI2HZgNdH1zDmauvEVEQRVBQAyzqjWORF6wrsLACkh9YBAYjLWwKB6kuK+beq3HHOgUVF9jx4PbzUeqrwpSGggxF9xJYYXkG8FDvHkSUK507qdhYRGkoyPsPc46FiBNfEUY/zVFdVkJNeTHXzzaBKM8u78tvsZjktO7awobCAuo2l6AIqBirldryEkJFazncVI0gqOC45SMrE1gxCUcF6qvCjjZXqW0SKUJtZdgkV7AF1CYfsPjaxjVCnMcG2+gVn3WOQvmjDKyVocBUqbOwfbWb3nfXnpymj+aIsZt1R3BkYgYhnThEvVqe+DbvzFW9MswD7BxSUfoevGNyZpGxz7PeNzHKP07OM7uQYODlWDo0kqfcGk/fRUQ5dPExI+PTDMd+UFMR8gRd6ypLixmOTfFm5CsHLjwEYMep/tzAtg2NnQNM/4wT+zJHx8GtXnjcUnRr+WhzHcOxKb7P/qKhvf/vLZ2yIb60zP3I/oymEFFf9zljMNrKcsrOeh1rrku1ob0fdZsCTTePUYAo20/eySUesHJde/9Cec6LBZBMJm/0RC8dX43fRyKeuOnrMQJAECg03DLxt3xz9eUkZcYSkDQ8ASwCC0BcViTSBRIfkPh4wAdsA8s+njJ8CUj9BrtK5as85v9RAAAAAElFTkSuQmCC',
		close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADGUlEQVR42rSVXUxbZRjHf+e0dKOsnIwMy6DCHKQONjMoujA1gSiKMRtXbnH0Ysti3LLbZQTkQp1ujhETLxYTNRKpUYmJ0RiSDTTuI0a3pcg22fjYlg1lQAcpK9BCT0/P64UtHuyHYvCfvHnOeZ83//zyPM97jiSE4P+QGaC17fgHwKsr5PlhU2PLAYQQnDh5TPxXhVVtyfuJk8fEInFcodDcsvEGfpvGYjZRnJ+N1bpmcV82Hro9NkNdYxdvf9rLVGAhraEQ0HdzilNf93PovQvJawygRqKoWpSSAoXvekeZm49wYGcZj6zPTmp8ccDHO5/9QiCo8lylIyG/SGzJMFFauJZXXixFybLw8w0fn/9wC11PnJoR3yye7iECQZXtZXYO1m9OTRxXeck6mt0uPN1DfO8dBQG7aopxOhS0qM6Pv07w/rfXmZye5/knHqbhmRLWKatTE8clSbC9zE5TQwW5azPp8f7OR103iGg6dydmaT89iM8forbSQfOeipSlMqdqTpHdxqH6zbSfHuTy4H1aPr7MVGCeEd8s2zY9xK6aYmRZSn9BUunpx/Jw5GbxZoeXSwM+AJ51FdDc4CLDLKedmrRZs0lGliUk6S8yXYAW1dH/4VOQlvj81THe/fIqgaBKVZkd/8wCZ/vuIYTAXevE6VCWT3x3YhZPzzCBoEpNeT5v7H2cZrcLJcvCuStjfHJmcHmlUCM6F66Nc9Tj5fZYgKe25OGudbLKYmLj+mwO795KSYHCT9cnaOu8wp3xmX9XiuHRB5z6ph+fP8SOqiKOvFy+JF+9NZ8iu42jHi9dF0cY94d4ze1KmOUE4tbOPnz+EJXOXF6q3piUZkOejX0vbMKeY6V3eJKO7iGm58IY+iklEJtlmfonN7C37tGkNyquqlI7ObZVtHb20X/Hj2K1YBge0xJjq3UNX7y+gwfBMDm21WmbYwW2Kdl89VZhsvSfxJqmtbe2Hd+/Er8PNax2AEhCCCRJMgGZQFYsmmP1NxueZUNP9NiKAFosqsACEATCcWP+ZiQZjCRDNBmMBRA1RD0WI4D+xwBJI2Cqc17NlgAAAABJRU5ErkJggg==',
		loading:'data:image/gif;base64,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'
	};
		
	function get_preview_orginal_size() {
		if(org_width === 0 || org_height === 0){
			org_width = preview_img.offsetWidth;
			org_height = preview_img.offsetHeight;
		}
	}
	
	function drag_begin (ev){
		if(ev.button !== 0)//非左键
			return false;
		ev.preventDefault();
		create_lock = true;
		preview_down_x = ev.pageX;
		preview_down_y = ev.pageY;
		drag_flag = true;
		var x = ev.pageX;
		var y = ev.pageY;
		offset_x = x - preview_div.offsetLeft;
		offset_y = y - preview_div.offsetTop;
	}
	
	function drag_proc(ev){
		if(!drag_flag || preview_img === null)
			return false;
		var x = ev.pageX;
		var y =	ev.pageY;
		preview_div.style.left = x - offset_x + 'px';
		preview_div.style.top = y - offset_y + 'px';
		if(window.getSelection() !== '')
			window.getSelection().removeAllRanges();
	}
	
	function drag_over(ev){
		if(ev.button !== 0)
			return false;
		drag_flag = false;
		create_lock = false;
		if(ev.pageX === preview_down_x && ev.pageY === preview_down_y){
			switch(PREVIEW_CLICK_HDLR)
			{
				case 0:
					fit_to_screen_switch(ev.pageX, ev.pageY);
					break;
				case 1:
					if(close_preview_timmer == null){
						close_preview_timmer = setTimeout(function(){destroy_preview(); close_preview_timmer = null}, PREVIEW_CLICK_CLOSE_DELAY);
					}
					else{
						clearTimeout(close_preview_timmer);
						close_preview_timmer = null;
					}
					break;
				default:
					break;
			}
		}
	}
	
	function fit_to_screen_switch (x, y){
		get_preview_orginal_size();
		if(preview_img.width !== org_width || preview_img.height !== org_height)
			fit_to_screen_switch_ext(0, x, y);
		else
			fit_to_screen_switch_ext(1, x, y);
	}
	
	function fit_to_screen_switch_ext (fit_flag, x, y){
		get_preview_orginal_size();
		switch(fit_flag)
		{
			case 0://还原
				var of_x = x - preview_div.offsetLeft;
				var of_y = y - preview_div.offsetTop;
				var o_w = preview_div.offsetWidth;
				var o_h = preview_div.offsetHeight;
				preview_img.style.width = 'auto';
				preview_img.style.height = 'auto';
				percentage = 100;
				fit_flag = 1;
				if(ORIGINAL_STYLE === 1){
					var p_x = of_x / o_w;
					var p_y = of_y / o_h;
					preview_div.style.left = x - (preview_div.offsetWidth * p_x) + 'px';
					preview_div.style.top = y - (preview_div.offsetHeight * p_y) + 'px';
				}
				break;
			case 1://屏幕适配
				preview_img.style.width = 'auto';
				preview_img.style.height = 'auto';
				percentage = 100;
				if(preview_img.height > viewHeight * 0.9){
					percentage = (viewHeight * 100 * 0.9)/ org_height;
					preview_img.style.height = org_height * percentage/100 + 'px';
					preview_img.style.width = org_width * percentage/100 + 'px';
				}
				if(preview_img.width > viewWidth * 0.9){
					percentage = (viewWidth * 100 * 0.9)/ org_width;
					preview_img.style.height = org_height * percentage/100 + 'px';
					preview_img.style.width = org_width * percentage/100 + 'px';
				}
				preview_div.style.left = (viewWidth - preview_div.offsetWidth) / 2 + window.pageXOffset +  'px';
				preview_div.style.top = (viewHeight - preview_div.offsetHeight) / 2 + window.pageYOffset + 'px';
				fit_flag = 0;
				break;
			default:
				break;
		}
	}
	
	function resize_preview(ev){
		get_preview_orginal_size();
		var val;
		if(ev.wheelDelta)
			val = ev.wheelDelta/120;
		else if(ev.detail)
			val = -ev.detail/3;
		ev.stopPropagation();
		ev.preventDefault();
		if(val > 0)
			percentage += RESIZE_SPEED;
		else
			percentage -= RESIZE_SPEED;
		if(percentage < 20)
			percentage = 20;
		var org_div_w, org_div_h, org_div_x, org_div_y;
		var of_x, of_y;
		if(RESIZE_STYLE != 1)//居中缩放
		{
			org_div_w = preview_div.offsetWidth;
			org_div_h = preview_div.offsetHeight;
			org_div_x = preview_div.offsetLeft;
			org_div_y = preview_div.offsetTop;
			of_x = ev.pageX - org_div_x;
			of_y = ev.pageY - org_div_y;
		}
		preview_img.style.width = org_width * percentage/100 + 'px';
		preview_img.style.height = org_height * percentage/100 + 'px';
		if(RESIZE_STYLE == 0)//居中缩放
		{
			preview_div.style.left = preview_div.offsetLeft - (preview_div.offsetWidth - org_div_w)/2 + 'px';
			preview_div.style.top = preview_div.offsetTop - (preview_div.offsetHeight - org_div_h)/2 + 'px';
		}
		else if(RESIZE_STYLE == 2)//按鼠标位置缩放
		{
			var p_x = (of_x / org_div_w);
			var p_y = (of_y / org_div_h);
			preview_div.style.left = ev.pageX - (preview_div.offsetWidth * p_x) + 'px';
			preview_div.style.top = ev.pageY - (preview_div.offsetHeight * p_y) + 'px';
		}
	}
	
	function set_preview_layout_ext(){
		var times = window.opera ? 2 : 1;
		get_preview_orginal_size();
		if(org_width !== 0 && org_height !== 0){
			if(org_pre_width !== org_width){
				org_count ++;
				org_pre_width = org_cur_width;
				org_cur_width = org_width;
			}
			if(org_count > times){
				clearInterval(get_size_timmer);
				get_size_timmer = null;
				org_count = 0;
				org_pre_width = 0;
				org_cur_width = 0;
				set_preview_layout();
			}
			else{
				org_width = 0;
				org_height = 0;
			}
		}
	}
	
	function set_preview_layout(){
		destroy_preview_loading();
		if(org_width > viewWidth * 0.9 || org_height > viewHeight * 0.9)
			fit_to_screen_switch_ext(1);
		preview_div.style.left = (viewWidth - preview_div.offsetWidth) / 2 + window.pageXOffset + 'px';
		preview_div.style.top = (viewHeight - preview_div.offsetHeight) / 2 + window.pageYOffset + 'px';
		preview_div.style.visibility = 'visible';
		preview_div.style.zIndex = 999;
	}
	
	function create_preview_button(icon, func){
		var btn = document.createElement('span');
		btn.setAttribute('style', 'margin-left: 5px; width: 22px !important; height: 22px !important; background-image: url("' + icon + '"); float: right !important; cursor: pointer !important;');
		btn.addEventListener('click', func, false);
		return btn;
	}
	
	function create_preview(x, y, imgLink){
		if(imgLink !== null){
			destroy_all();
			preview_div = document.createElement('div');
			preview_div.setAttribute('style', 'border: 1px solid gray !important; background-color: white !important; position: absolute !important; z-index: 999 !important; padding: 5px !important;');
			preview_div.style.left = -9999 + 'px';
			preview_div.style.top = -9999 + 'px';
			preview_div.style.visibility = 'hidden';
			preview_div.style.zIndex = -999;
			if(SHOW_TOOLS_BAR){
				preview_head = document.createElement('div');
				preview_head.setAttribute('style', 'min-width: 100px; height: 22px !important;');
				
				preview_icon_fit = create_preview_button(icon.fit, function(){fit_to_screen_switch_ext(1);});
				preview_icon_full = create_preview_button(icon.full, function(){fit_to_screen_switch_ext(0);});
				preview_icon_close = create_preview_button(icon.close, destroy_preview);
				
				preview_head.appendChild(preview_icon_close);
				preview_head.appendChild(preview_icon_full);
				preview_head.appendChild(preview_icon_fit);
				preview_div.appendChild(preview_head);
			}
			
			preview_img = document.createElement('img');
			preview_img.src = imgLink;
			preview_img.setAttribute('style', 'margin-top: 5px !important; cursor: move;');
			preview_img.addEventListener('mousedown', drag_begin, false);
			preview_img.addEventListener('mousemove', drag_proc, false);
			preview_img.addEventListener('mouseup', drag_over, false);
			switch(PREVIEW_DBLCLICK_HDLR)
			{
				case 0:
					preview_img.addEventListener('dblclick', destroy_preview, false);
					break;
				case 1:
					preview_img.addEventListener('dblclick', fit_to_screen_switch, false);
					break;
				default:
					break;
			}
			if(RESIZE_SPEED > 0){
				preview_img.addEventListener('DOMMouseScroll', resize_preview, false);
				preview_img.onmousewheel = resize_preview;
			}
			preview_div.appendChild(preview_img);
			document.body.appendChild(preview_div);
			
			//opera中，body子元素加载优先权高于孙子元素，此段代码用于解决页面未加载完成时图片不显示的问题。
			preview_img_clone = document.createElement('img');
			preview_img_clone.src = imgLink;
			preview_img_clone.setAttribute('style', 'visibility: hidden !important; z-index: -999 !important; position: absolute !important; width: 0px; height: 0px;');
			document.body.appendChild(preview_img_clone);
		}
		//调整图片位置
		if(VIEW_STYLE !== 0){//不居中
			preview_div.style.left = x + 5 + 'px';
			preview_div.style.top = y + 5 + 'px';
			preview_div.style.visibility = 'visible';
			preview_div.style.zIndex = 999;
		}
		else{//图片居中显示，如果过大，则缩放
			var temp_img = new Image();
			temp_img.src = imgLink;
			if(temp_img.width !== 0){
				get_preview_orginal_size();
				set_preview_layout();
			}
			else{
				create_preview_loading();
				get_size_timmer = setInterval(set_preview_layout_ext, 10);
				/*
				get_size_timeout_timmer = setTimeout(function(){if(get_size_timmer){clearInterval(get_size_timmer); get_size_timmer = null;destroy_preview(); destroy_preview_loading();}}, 10000);//10秒超时
				*/
			}
			delete temp_img;
		}
	}
	
	function create_preview_loading(){
		preview_loading = document.createElement('div');
		preview_loading.setAttribute('style', 'border: 1px solid gray !important; background-color: white !important; position: absolute !important; z-index: 999 !important;');
		preview_loading_close = document.createElement('div');
		preview_loading_close_icon = document.createElement('div');
		preview_loading_close_icon.setAttribute('style', 'width: 22px !important; height: 22px !important; background-image: url("' + icon.close + '"); float: right !important; cursor: pointer !important;');
		preview_loading_close_icon.addEventListener('click', function(){destroy_preview(); destroy_preview_loading();}, false);
		preview_loading_close.appendChild(preview_loading_close_icon);
		preview_loading.appendChild(preview_loading_close);
		preview_loading_img = document.createElement('div');
		preview_loading_img.setAttribute('style', 'margin-top: 5px !important; background-image: url("' + icon.loading + '") !important; background-position: center center !important; background-repeat:no-repeat !important; width: 100px !important; height: 100px !important;');
		preview_loading.appendChild(preview_loading_img);
		document.body.appendChild(preview_loading);
		preview_loading.style.left = (viewWidth - preview_loading.offsetWidth) / 2 + window.pageXOffset + 'px';
		preview_loading.style.top = (viewHeight - preview_loading.offsetHeight) / 2 + window.pageYOffset + 'px';
	}
	
	function destroy_preview_loading(){
		if(get_size_timmer){
			clearInterval(get_size_timmer);
			get_size_timmer = null;
		}
		if(get_size_timeout_timmer){
			clearTimeout(get_size_timeout_timmer);
			get_size_timeout_timmer = null;
		}
		if(preview_loading !== null){
			preview_loading_close_icon.removeEventListener('click', destroy_preview_loading, false);
			preview_loading.removeChild(preview_loading_close);
			preview_loading_close.removeChild(preview_loading_close_icon);
			preview_loading.removeChild(preview_loading_img);
			document.body.removeChild(preview_loading);
			preview_loading = null;
		}
	}
	
	function destroy_preview(){
		if(timmer){
			clearTimeout(timmer);
			timmer = null;
		}
		if(preview_div !== null){
			preview_img.removeEventListener('mousedown', drag_begin, false);
			preview_img.removeEventListener('mousemove', drag_proc, false);
			preview_img.removeEventListener('mouseup', drag_over, false);
			preview_img.removeEventListener('dblclick', fit_to_screen_switch, false);
			preview_img.removeEventListener('DOMMouseScroll', resize_preview, false);
			preview_img.onmousewheel = null;
			
			preview_div.removeChild(preview_img);
			if(SHOW_TOOLS_BAR)
				preview_div.removeChild(preview_head);
			preview_div.parentNode.removeChild(preview_div);
			document.body.removeChild(preview_img_clone);
			
			if(get_size_timmer){
				clearInterval(get_size_timmer);
				get_size_timmer = null;
			}
			preview_div = null;
			percentage = 100;
			fit_flag = 1;
			org_width = 0;
			org_height = 0;
		}
	}
	
	function getElementXY(ele){
		destroy_view_icon();
		if(ele.getBoundingClientRect){
			return {
				x : ele.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
				y : ele.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
			}
		}
		else{
			var i = ele.offsetLeft, j = ele.offsetTop;
			var temp_node = ele;
			while(temp_node.offsetParent){
				temp_node = temp_node.offsetParent;
				i += temp_node.offsetLeft;
				j += temp_node.offsetTop;
			}
			temp_node = ele;
			while(temp_node.parentNode && temp_node.parentNode.tagName != 'BODY'){
				temp_node = temp_node.parentNode;
				i -= temp_node.scrollLeft;
				j -= temp_node.scrollTop;
			}
			return {
				x : i,
				y : j
			}
		}
	}
	
	function show_view_icon(imgLink){
		if(drag_flag || target_obj == preview_img || (VIEW_STYLE == 2 && preview_div != null)){
			destroy_view_icon();
			return false;
		}
		var pos = getElementXY(target_obj);
		var x = pos.x, y = pos.y;
		if(VIEW_BUTTON_POS == 1)//右上
			x = x + target_obj.width - 32;
		icon_view = document.createElement('span');
		icon_view.setAttribute('style', 'width: 32px !important; height: 32px !important; position: absolute !important; left: ' + x + 'px !important; top: ' + y + 'px !important; cursor: pointer; background-image: url("' + icon.view + '") !important; z-index: 998 !important;');
		icon_view.addEventListener('click', function(){setTimeout(function(){create_preview(x, y, imgLink);}, 1);}, false);
		document.body.appendChild(icon_view);
	}
	
	function destroy_view_icon (){
		if(target_obj != icon_view){
			if(timmer){
				clearTimeout(timmer);
			}
			if(icon_view !== null){
				icon_view.parentNode.removeChild(icon_view);
				icon_view = null;
			}
		}
	}
	
	function destroy_all (){
		destroy_preview_loading();
		destroy_view_icon();
		destroy_preview();
	}
	
	function need_preview(w, h, ow, oh){
		if(VIEW_FILTER == false)
			return true;
		if(w > ow && h > oh)
			return false;
		if( (100 - w*100/ow) <= DEC_PERCENTAGE && (100 - h*100/oh) <= DEC_PERCENTAGE )
			return false;
		if(Math.abs(ow - w) <= DEC_PIX && Math.abs(oh - h) <= DEC_PIX)
			return false;
		return true;
	}
	
	function check_img_link (link){
		if(link.search(/(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i) !== -1)
			return true;
		return false;
	}
	
	function check_img_src_reg (link){
		if(!SITE_IMG_INFO_FLAG)
			return '';
		var i;
		for(i = 0; i < SITE_IMG_INFO.length; i++){
			if(SITE_IMG_INFO[i][0].test(link)){
				return (SITE_IMG_INFO[i][2]) ? eval(SITE_IMG_INFO[i][2] + '("' + link.replace(SITE_IMG_INFO[i][0], SITE_IMG_INFO[i][1]) + '")') : link.replace(SITE_IMG_INFO[i][0], SITE_IMG_INFO[i][1]);
			}
		}
		return '';
	}
	
	function can_click_direct_view(){
		var temp = target_obj;
		if(ALWAYS_CLICK_DIRECT_VIEW)
			return true;
		while(temp.nodeName.toLowerCase() !== 'a' && temp.parentNode)
			temp = temp.parentNode;
		if(temp.nodeName.toLowerCase() !== 'a')
			return true;
		else{
			if(check_img_src_reg(target_obj.src) || check_img_link(temp.href))
				return true;
		}
		return false;
	}
	
	function start_preview(x, y, target_x, target_y, link){
		if(timmer){
			clearTimeout(timmer);
		}
		if(VIEW_STYLE == 2){
			show_view_icon(link);
			timmer = setTimeout(function(){create_preview(x, y, link);}, VIEW_PREVIEW_DELAY);
		}
		else
			timmer = setTimeout(function(){show_view_icon(link);}, VIEW_BUTTON_DELAY);
		if(CLICK_DIRECT_VIEW){
			if( can_click_direct_view() ){
				target_obj.setAttribute('onclick', null);
				target_obj.addEventListener('click', function(ev){
					ev.stopPropagation();
					ev.preventDefault();
					if(preview_div == null || link != preview_img.src)
						setTimeout(function(){create_preview(target_x, target_y, link);}, 1);
				}, false);
			}
		}
	}
	
	function checkImage(ev){
		var x = ev.pageX;
		var y =	ev.pageY;
		//用于修正拖拽过快造成的拖拽失败问题
		if(drag_flag){
			preview_div.style.left = x - offset_x + 'px';
			preview_div.style.top = y - offset_y + 'px';
			if(window.getSelection() !== '')
				window.getSelection().removeAllRanges();
			return false;
		}
		target_obj = ev.target;
		var temp = target_obj;
		if(preview_div !== null){
			while(temp.parentNode){
				if(temp == preview_div){
					if(VIEW_STYLE === 2 && timmer){
						clearTimeout(timmer);
						timmer = null;
					}
					destroy_view_icon();
					return false;
				}
				temp = temp.parentNode;
			}
		}
		//指向非图片元素时，则关闭查看图标
		if(target_obj.nodeName.toLowerCase() !== 'img'){
			if(VIEW_STYLE === 2)
				destroy_preview();
			destroy_view_icon();
			return false;
		}
		//如果目标图片过小，则不生效
		if(target_obj.width < MIN_WIDTH && target_obj.height < MIN_HEIGHT)
			return false;
			
		if(CLEAR_ORG_IMG_OVER_HDLR)
			target_obj.setAttribute('onmouseover', null);
			
		//创建一个不显示的图片，用于验证原本尺寸
		var org_img = new Image();
		org_img.src = target_obj.src;
			
		var imgLink = target_obj;
		while(imgLink.nodeName.toLowerCase() !== 'a' && imgLink.parentNode)
			imgLink = imgLink.parentNode;
		if(VIEW_FILTER){//只在图片被缩小过，或者图片链接着另一张图片时显示查看按钮
			if(check_img_src_reg(target_obj.src) !== ''){//自定义的规则
				var link = check_img_src_reg(target_obj.src);
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, link);
			}
			else if( imgLink.nodeName.toLowerCase() === 'a' && EXCLUDE_IMG_LINK == true)
			{
			}
			else if( imgLink.nodeName.toLowerCase() === 'a' && check_img_link(imgLink.href) && EXCLUDE_IMG_LINK == false ){
				//图片链接，链接的是一张图片
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, imgLink.href);
			}
			else if( (org_img.width > target_obj.offsetWidth || org_img.height > target_obj.offsetHeight)
				&& need_preview(target_obj.offsetWidth, target_obj.offsetHeight, org_img.width, org_img.height)){//原图被缩放
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, target_obj.src);
			}
		}//if(VIEW_FILTER)
		else{//任何图片（除长或宽小于40像素外）都显示查看按钮，如果图片链接着另一张图片，则显示被链接的图片，否则显示当前图片
			if(check_img_src_reg(target_obj.src) !== ''){//自定义的规则
				var link = check_img_src_reg(target_obj.src);
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, link);
			}
			//图片链接，链接的是另一张图片
			else if( imgLink.nodeName.toLowerCase() === 'a' && check_img_link(imgLink.href) ){
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, imgLink.href);
			}
			else if(need_preview(target_obj.width, target_obj.height, org_img.width, org_img.height)){//没有链接图片
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, target_obj.src);
			}
		}
		delete org_img;
	}
	
	function closePreview(ev){
		var temp = ev.target;
		var find_preview = false;
		var find_loading = false;
		if(preview_div !== null || preview_loading !== null){
			while(temp.parentNode){
				if(temp == preview_div)
					find_preview = true;
				if(temp == preview_loading)
					find_loading = true;
				temp = temp.parentNode;
			}
		}
		if(!find_preview)
			destroy_preview();
		if(!find_loading)
			destroy_preview_loading();
	}
	
	//特例网站设置
	function run_site_setting (){
		var i;
		for(i = 0; i < SITE_STYLE_INFO.length; i++){
			if(SITE_STYLE_INFO[i][0].test(location.href)){
				eval(SITE_STYLE_INFO[i][1]);
			}
		}
	}
	
	function check_current_page() {
		var spec_ele = null;
		var ret = 'NORMAL_PAGE';
		if(window.opera){
			spec_ele = document.selectSingleNode('//head/link[@href="opera:style/image.css"]');
			if(spec_ele != null)
				ret = 'IMG_PAGE';
		}
		/*firefox及chrome单独打开一张图片时不执行脚本，免去判断*/
		return ret;
	}
	
	function main_function () {
		if(check_current_page() == 'IMG_PAGE')
			return false;
		run_site_setting();
		if(VIEW_STYLE == 2)
			window.addEventListener('mousemove', checkImage, false);
		else
			window.addEventListener('mouseover', checkImage, false);
		if(CLICK_BLANK_TO_CLOSE){
			window.addEventListener('click', closePreview, false);
		}
	}
	main_function();
})();