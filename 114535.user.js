// ==UserScript==
// @name       Image view
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http://*/*
// @copyright  2011+, You
// @exclude *.jpg
// @exclude *.jpeg
// @exclude *.gif
// @exclude *.png
// @exclude *.bmp
// ==/UserScript==

(function (){
/*------------------------------设置-------------------------------*/
	//这里根据你的Opera页面缩放情况填入相关数值。如默认100%则填100。如果不使用Opera则不必理会这一项。
	//注：对于 Opera 11.10 以下的版本，如果你的页面缩放不是100%，不调整这项值会造成居中错误的问题。Opera 11.10 可不必理会此项。
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
	
	//是否显示半透明黑色背景
	//true——显示；false——不显示
	var TRANSLUCENT_BACKGROUND = false;
	
	//黑色背景的不透明度
	//注：取值为0到1之间的数，包括0跟1。当 TRANSLUCENT_BACKGROUND 为 true 时生效
	var BACKGROUND_OPACITY = 0.5;
	
	//显示预览图工具栏
	//true——显示；false——不显示
	var SHOW_TOOLS_BAR = true;
	
	//当VIEW_STYLE = 2时（鼠标悬停即显示）时，显示预览图的时延
	var VIEW_PREVIEW_DELAY = 100;
	
	//是否开启旋转功能
	//true——开启；false——不开启
	var ROTATE_ENABLE = true;
	
	//旋转开启的方式
	//0——长按
	//1——按住alt键不放
	//2——长按或按alt键
	var ROTATE_STYLE = 2;
	
	//旋转捕捉，即旋转的角度为下值的倍数
	//注：该值为整数，0或负数为不开启捕捉
	var ROTATE_SNAP = 0;
	
	//旋转开启方式2
	//0——不启用
	//1——按shift旋转
	var ROTATE_STYLE_2 = 1;
	
	//使用第二种旋转开启方式时的角度捕捉
	//注：该值为整数，0或负数为不开启捕捉
	var ROTATE_SNAP_2 = 15;
	
	//当ROTATE_STYLE = 0或2时有效，长按x毫秒后开始旋转
	var LONG_PRESS_TIME = 300;
	
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
	//true——开启；false——关闭
	var CLICK_BLANK_TO_CLOSE = true;
	
	//按 esc 键关闭预览图
	//true——开启；false——关闭
	var PRESS_ESC_TO_CLOSE = false;
	
	//说明：对于一些网站，不使用绝对路径的，可以添加替换规则
	//注：规则暂定，以后可能会变动。
	//true——开启规则检查
	//false——关闭规则检查
	var SITE_IMG_INFO_FLAG = true;
	//可按下面格式进行添加，只有在附件检查开启时才起作用
	//第一个值为图片匹配的正则表达式，第二个值为替换的内容，如何使用正则和替换，请自行搜索，或到论坛发帖求助
	//第三个值为可选值，可对替换后的链接地址作编码操作，可填常用编码函数，如 decodeURIComponent
	//第四个值为可选值，可填"href"或其他，当值为"href"时，则按照链接来匹配规则；当值为其他时，则按照图片的src来匹配规则。可参考下面google的规则
	//以下设置可做参考
	var SITE_IMG_INFO = [
		[/http\:\/\/bbs\.themex\.net\/attachment\.php\?attachmentid\=(\w+).*\&thumb\=1\&d\=(\w+)/, 'http://bbs.themex.net/attachment.php?attachmentid=$1&d=$2'],
		[/http\:\/\/(\w+)\.douban\.com\/view\/photo\/thumb\/public\/(\w+)/, 'http://$1.douban.com/view/photo/photo/public/$2'],
		[/http\:\/\/126\.fm\/(\w+)s$/, 'http://126.fm/$1'],
		[/http\:\/\/oimage\w\w\.ydstatic\.com\/image\?.*(http.*126\.fm.*)/, '$1', 'decodeURIComponent'],
		[/http:\/\/bbs\.operachina\.com\/download\/file\.php\?id\=(\w+)&t=1/, 'http://bbs.operachina.com/download/file.php?id=$1&mode=view'],
		[/http\:\/\/static\.minitokyo\.net\/thumbs\/(\d+)\/(\d+)\/(\d+)\.(\w+)\?(\w+)/, 'http://static.minitokyo.net/view/$1/$2/$3.$4?$5'],
		[/http\:\/\/farm(\d)\.static\.flickr\.com\/(\d+)\/(.+)_m\.(\w+)/, 'http://farm$1.static.flickr.com/$2/$3.$4'],
		//[/http\:\/\/www\.google\.\w{2,3}(\..*)?\/(images|imgres)\?imgurl\=(.*)\&imgrefurl\=.*/, '$3', '', 'href'],//去掉前面的"//"可开启该规则
	];
	
	//说明：特例网站设置
	//第一个值为站点匹配的正则表达式，第二个值为特例设置
	//以下设置可做参考
	var SITE_STYLE_INFO = [
		//[/http\:\/\/www\.douban\.com\/online\/\d+\/album\/\d+\//, 'CLICK_DIRECT_VIEW = false; VIEW_STYLE = 2; VIEW_PREVIEW_DELAY = 250;'],
		[/http:\/\/t\.163\.com\//, 'CLICK_DIRECT_VIEW = false; VIEW_STYLE = 2; VIEW_PREVIEW_DELAY = 100;'],
		[/http:\/\/www\.flickr\.com\/photos\//, 'CLICK_DIRECT_VIEW = false; VIEW_STYLE = 2; VIEW_PREVIEW_DELAY = 100;'],
		[/http:\/\/tieba\.baidu\.com\/.+\/tupian/, 'MIN_WIDTH = 200; MIN_HEIGHT = 200;'],
		[/http:\/\/hi\.baidu\.com\/.+\/album/, 'MIN_WIDTH = 200; MIN_HEIGHT = 200;'],
	];
/*---------------------------设置结束---------------------------------*/
	var target_obj = null;
	var preview_div = null;//大图的整个框架
	var preview_bg = null;//半暗背景
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
	var timmer_rotate = null;//用于开启旋转
	//如果图片链接的是一张新图，尺寸要改变过两次才可信？？
	var org_pre_width = 0;//辅助获取新图的尺寸
	var org_cur_width = 0;//辅助获取新图的尺寸
	var org_count = 0;//辅助获取新图的尺寸
	var org_width = 0;
	var org_height = 0;
	//用于预览图拖拽
	var drag_flag = false;
	var offset_x = 0;
	var offset_y = 0;
	var preview_down_x = 0;//鼠标在预览图上点下的坐标
	var preview_down_y = 0;
	var create_lock = false;
	//用于预览图旋转
	var flag_rotate = false;
	var angle_org = 0;
	var angle_now = 0;
	var rotate_style = 1;
	
	// 用于缩放
	// 0——双击还原
	// 1——双击屏幕适配
	var fit_flag = 1;
	var percentage = 100;
	
	if(window.opera && window.opera.version() >= 11.10)
		OP_PAGE_PERCENTAGE = 100;
	
	var viewWidth = window.opera ? window.innerWidth / (OP_PAGE_PERCENTAGE / 100) : window.innerWidth;
	var viewHeight = window.opera ? window.innerHeight / (OP_PAGE_PERCENTAGE / 100) : window.innerHeight;
	
	var icon = {
		view: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACUlBMVEX///8AAAAAAACMjooAAAAAAACMj4kAAAAAAACLjYmLjYl5e3eKjIiKjIdydG8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgSocsVI0pUozz9fXu8/Pm7e8oUIvv8fPp8fEuVY4vVo7E0d39/f3j6+1hf6mIioX8/Pz7/Pzt8/Ps8vLz9vbF0N3M1eDv8vGWqsTr8fJgfqhIapz19vaXqsXy9fWYq8XAy9r6+/soUow5X5Rkg6uywtO3x9ZPcJ9cfKZEaJptirCPpcHC0Ny4yNeRp8KAmLg3XZOtvtDAzdri6u2RqMIrVI1GaZvn6++rvdDw9PTG0976/Pz8/f1Ja5z09PS7y9nJ1N+tv9Ht8fObrsjN1eCxwNMhSofk6u7j6e7K1OCwv9KIn73r8PLCzdx1j7Nkgat+lrixv9LL1OBPcZ9nhKzJ09/q7/F9lbhjgKpwi7G7yNh2kbTb5OktVY7L1eCWqcS+ytny9PUlTomvvtHf5+vm6u7l6u3o7O/v8/Tr8vL39/epus7d5urq8fGVq8W/zdoiS4esvtG8yth8l7jAztuqvdDo8PHP2eLf5uvk6u3t8vNefadqh62qvM9ohax/l7iVqcR7lLfN2OE0WpHCztyUqMPx8vSXqsRffqhrh67t8PK2xdVuirArU42DnLu8x9jFz93O1uHK0t8wV4/x9fWTqMOUqcP5+fvx9PS5ydjv9PT29/n09vb29/fJ096vv9K9zdrg5+vd5ero7/BQcaDk7O7p7vB4k7XAzNru8fJigKp8lbe0xdWiqtzEAAAAGXRSTlMANgnxCgJdEgPx8mvz9HITJjhFOUpAMBkNEtkifgAAAatJREFUeF6NymOzHEEAheFNFpcxe2bWNq5t27ZtK7Zt27bxv9Kz3b2T7J2pyvPlVJ16Rf9BJjYJEcvYQOyKFeISs4GpvBC59F6N7NPOIeUmFAAv5W81UR2Hrn+DWjUnkS9IMOwhDKfpZUFTTnK7AgeKgpTUwr8CCwz2x/cPHDpydAdLnZk+fqpoEr4WEihLwj6fPec+cNFjgz5knMn6FpZ2i/YFyiRb/t3svbm6CZvXR13Jk6dfbHk0CV5YrVbFrndlu63YQtnBT3AOk0DOGjp2XO5zwuMdLmCdlPvhgpdCcGAuFWLGwXMhOKh4LKQCB1Gs0q9RnG3bvUOCtwzDqC43LDLEkvP7DzgOElA19rr66MapZjvS0toWGd1hd9AkAFRnV3dPZG9f8WtW8eC8e3hkdIwGONADALSVP39Nz8xGsJiY8xeM4Rr46rkAaMKNV1QRyNVr14so4BcA6sbNN4Tq9h2wLAAxOzn3AE9AOX3BfZovAJoHOHj4aA5BQVDVK+yZ3k9VMAykIaEmIatWS2CxZu269St4bNi4afMWqQgKlASs5LE1QBIoEv0B9jL7JDZInvEAAAAASUVORK5CYII=',
		view_click:'data:image/gif;base64,R0lGODlhIAAgAPcAAAAAAP////n5+/b3+SBKhyFKhyJLhyVOiShQiyxUjS1Vji5Vji9WjjRakTddk0Zpm0hqnElrnE9wn1BxoGSBq36WuJapxJeqxShSjClSjCtUjTlflERomk9xn1x8pl59p2F/qWB+qGKAqmSDq2eErGiFrGqHrWuHrm2KsHaRtHWPs3yVt3+XuICYuIifvZSow5aqxJirxZuuyLG/0sLN3MDL2svU4M7W4c3V4HiTtXyXuIOcu4+lwZGnwpOow5WrxZSpw6m6zq+/0rHA077K2czV4JGowrbF1cLO3MnT3svV4Kq90Ky+0au90Kq8z62/0a2+0LLC07zK2MDN2snU3+fr7+bq7u/x87TF1bfH1rnJ2LjI18DO27/N2sTR3c/Z4rvL2b3N2sLQ3MbT3s3Y4d/m6+Tq7u3w8t3l6nSiu6DD1t/o7dvk6eDn62qdtnKiu3SkvHalvXalvHilvH6rwYWwxoq0yY+3y7LQ39/n6+Tq7e3x8/L09WedtV+Qp2idtWaZsGqdtWmdtG2guG6guHinvXqovn2rwXyqv3ehtHGZq4WwxYeyxoq1yYWuwYy2you1yY22yo63y4+4y5C4y5a+0KHF1qLG1qbJ2qvN3KjI16nI16vK2N3m6nenvI64yoKksp/F1aXG1KzN267O3LTR3bjU4LfT37nV4N/p7erv8enu8ODr79zn6+Lq7ebt74a0v5zDzeTs7uPr7Ye1v7/b4e3y8+vx8ujv8JfCx+jw8enx8evy8urx8e3z8+zy8u/09O7z8/H19fD09PP29vL19fH09Pr8/PT29vP19fz9/fv8/Pr7+/b39/X29qzVzZ/NwrDYze/y8fb8+dHu37Tjxbzny7jlx+n57uf57Mvx1djz3+P56cPuzcfu0M7x1tbz3d3247/sydPz2tHx2Nv24e788cLsysbuzsru0eH25fH888rx0dbz24iLh4yOiouNiYqMiIiKhf39/fz8/Pf39/T09P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAPcALAAAAAAgACAAAAj/AO8JHEiwoMGDB9/JW8iwocOHDd8RfCeNmcWLGDNqxChNokB5xzSIHKmhQZhdKFPu6sLggMuXB47JGwiSgM2bCLCo3AkGw82bMmke+2nzyc6jUYgSCPpxKNERs3pJnTp1lokMRJneq3mzgAMJLl5RnfrKiAcOGn5qlbfspoENHUjoWKKLl127u7bwSPHhgYKby2Z+bIugSYgJJVjAYELm1q/Hv9qIcdIjRwgUR7AGprkMQZZfrna0+AHFCxvIkNF4aeIDiKxfUzJsHqzFl+1XQYSM6WS7d+88Y6Tg6s1l9tZlwZInV/WljPLnyvXcgm6cLfRgtq5rpy74OLDv4MOL/x8fvjq9YejTq1/PXj297vLoGZtPv759Y6lOZcJ0SQ2nVsa8R5MywhRo4IEImjJKJZI88kgkk1AiijLwKVPMhRcOswqGHOIRioMggtjIHe4MmEQyKF6BBA5WoOgiKh+GKCMjoAyYABXE7CFDDEMoYQYxQLIySogBTGNONiEeMiABCdCgAgUVXDCDDVUgg0wplYS4DjbchAMHiIsY8tE8NzEQgQgrWEAEH844Q0qDIGajTjngfOkgJG+M+dMCEIDwwhVtOoMJiLV0uc0437ATDYiE6PlTAiec0cykzVwCIiXUtEOONt5YUwgiDrrh6E811GOqqZZEAmIs36SDzjmwxHQBySN29DHqTQkUcWo9m0wS4jPdiAMNHHU4SMcgt960wA2nrkFJiJ9cU40noDr4x0Dw2DPAttxuK8A84M6jSSMh5kKLrA7KoQhB8UD0kDuOMBJiHcU+IgcgCOVLUCKHLDIrrXT84Ye+BA80RxqEuBGIIAUFBAA7',
		vire_notresize:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACslBMVEX///8AAAAAAACMjooAAAAAAAAAAACMj4kAAACLjYmLjYl5e3eKjIiKjIdydG8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADv9PTu8/Ps8vL8/f39/f3l6uo8YKV0hp6IioUqWqb7/PxCZKr6/Pw+YKXv8vE8ZKbu9PQ/Yabt8vLq7++osLlrhK9DarFWcqM+Yqk/Za2hrsB/k7NQb6aFkqbe4+RAZ65JbKlYb5jc4uRDbrhec5ecprRGaa89YKXY3eA7YKVidppugKBYcJo+Y6c/Zq3e4uM8Y6Y+Z6xBZq09ZKfn7vA8YqZPcK309PT8/PxfdZjs8vNngrJtgKGImLFpfJ1AZa1BbbF5jK1BZa10jrtBY6hCZKPJztB8kLctXa0sXKctXacuX6gvYKgxZbFadJk+Z6pCZq1Oa57f5ORzi7EwZLcuYbExZLEyZrIzZ7M1abQ1arU5cL1Vc5o/YaR8jKNFa7VQa5vm6uu+xsxugZ9xg5xyhJ5zhZ60ur91hp6ttb+MmrFfdZw/aK9hd5mFlKpFaK1AYqY/YaVBaq5HZp9Aa689Yqi1vcREaK25wMRCZq57iJ3p7u5zhaFFZqs7ZKc6ZKc7Zac8Zqg+Z6g8YaU8YqU7YaVEZ65AZKtRa5vj6OhLa6JFZ6s+aK1AarA/ZKs9YaZDaK/6+/tTb6JCZKk+abBBZax2hZx1h6GPmqakrbg3YbFAXpfm6+vT2NojTqEwU5fe4+NYcJwhTKPKz9GyusEkVK+Un61wg6RPbaBXb5m9xMhBZaTb4OCVobCcprK4wMfr8PDT2Nm9w8fe5uvn7fBsf511jLL5+fsqWao9ZacoVqT29/kqWKQsWqU/YKUuXKYzY69bdJh1jK9CZ6+LlqV4iaIqWqopWKUqWaWLmrMrW6YtYK5YcpgohrjHAAAAGXRSTlMANgnxCgIDXRLx8mvz9HITJjhFOUpAMBkNBOtl/AAAAahJREFUeF6tymOX3AAYQOHZnVmz7puxtbZt27Ztb23btm3btvE/mpxkkmkzafth78d7HtZ/ZMYWM8U2wwBbuY8pJRsDYjkwxJWLxxiEuntkZ2Y5xjAAh2/JO2T5OfF7Pb28sYFMI4EUA/4Zc+YqQoRCYdgiZ5el6MjzA66UAlqnVV0KV7ec3Xs2bNzk4zsC0wMCfwNBwfM08QvCIyKjopOSYuO2X9m5Kw3SKSDYf0Bz6PA9VN6fMTNBpaqZ/2xhGqgpsHjJ62XLAQtWrDy4es3adetzZwFQYPbmLVu3AdGjp89fvnrz9p0+eC/78BF0ffr85avk+4+fJEgFKCgsKtaBklJJWXlFZVU1QCoJHtfW1eNA0NDY1NzS2tbe0UkCHkB3T28fDvoHBoeGRSLR6JGjADwSHDt+4iTQo8Cp02fO0oGaAnDu/AU6SNcDFy9dpgMuAfjoQK5eMwD4FIDrN27+HcCt2/8A2jt3mQERI3iIl4gQAEnExwMcWKS8IHrC/6MUSxSYWFmLmbKx5aDCzn7ceCMDTZg4afIUExaaKcfc2EBTzTmmLNYvujfGvXfBv+oAAAAASUVORK5CYII=',
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
	
	function get_angle(ox, oy, x, y){
		x = x - ox;
		y = oy - y;
		ox = oy = 0;
		if(ox == x)
			return (y > oy) ? 90 : 270;
		else if(oy == y)
			return (x > ox) ? 0 : 180;
		else if(y > oy && x > ox)//第一象限
			return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180;
		else if( (y > oy && x < ox) || (y < oy && x < ox))//第二、三象限
			return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180 + 180;
		else if(y < oy && x > ox)//第四象限
			return Math.atan( (y - oy) / (x - ox) ) / Math.PI * 180 + 360;
	}
	
	function stop_rotate(){
		window.removeEventListener('mousemove', rotate_handler, false);
		if(timmer_rotate != null){
			clearTimeout(timmer_rotate);
			timmer_rotate = null;
		}
		flag_rotate = false;
	}
	
	function is_undefined(x){
		if(typeof x != 'undefined')
			return false;
		return true;
	}
	
	function is_rotate_available(){
		var style = document.body.style;
		if( ! is_undefined(style.OTransform) || ! is_undefined(style.MozTransform) || ! is_undefined(style.WebkitTransform) || !is_undefined(style.Transform) )
			return true;
		return false;
	}
	
	function rotate_obj(obj, angle){
		!is_undefined(obj.style.OTransform) && (obj.style.OTransform = 'rotate(' + angle + 'deg)');
		!is_undefined(obj.style.MozTransform) && (obj.style.MozTransform = 'rotate(' + angle + 'deg)');
		!is_undefined(obj.style.WebkitTransform) && (obj.style.WebkitTransform = 'rotate(' + angle + 'deg)');
		!is_undefined(obj.style.Transform) && (obj.style.Transform = 'rotate(' + angle + 'deg)');
	}
	
	function rotate_handler(ev){
		var angle = get_angle(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY);
		var style_str = preview_div.getAttribute('style');
		var angle_to_rotate = (angle_org - angle + angle_now);
		if(ROTATE_SNAP > 0 && rotate_style == 1){
			angle_to_rotate = Math.floor(angle_to_rotate / ROTATE_SNAP) * ROTATE_SNAP;
		}
		else if(ROTATE_SNAP_2 > 0 && rotate_style == 2){
			angle_to_rotate = Math.floor(angle_to_rotate / ROTATE_SNAP_2) * ROTATE_SNAP_2;
		}
		rotate_obj(preview_div, angle_to_rotate);
	}
	
	function start_rotate(ox, oy, x, y){
		timmer_rotate = null;
		preview_img.removeEventListener('mousemove', drag_proc, false);
		if(ox == x && oy == y)
			return false;
		flag_rotate = true;
		drag_flag = false;
		angle_org = get_angle(ox, oy, x, y);
		window.addEventListener('mousemove', rotate_handler, false);
		window.addEventListener('mouseup', stop_rotate, false);
	}
	
	function get_container_origin(){
		return {
			x: preview_div.offsetLeft + (preview_div.offsetWidth >> 1),
			y: preview_div.offsetTop + (preview_div.offsetHeight >> 1)
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
		preview_img.addEventListener('mousemove', drag_proc, false);
		if(ROTATE_ENABLE && is_rotate_available()){
			if(ROTATE_STYLE == 0 || ROTATE_STYLE == 2){
				if(timmer_rotate == null)
					timmer_rotate = setTimeout(function(){ rotate_style = 1; start_rotate(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY); }, LONG_PRESS_TIME);
			}
			if(ROTATE_STYLE == 1 || ROTATE_STYLE == 2){
				if(ev.altKey){
					rotate_style = 1;
					start_rotate(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY);
				}
			}
			if(ROTATE_STYLE_2 == 1){
				if(ev.shiftKey){
					rotate_style = 2;
					start_rotate(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY);
				}
			}
		}
	}
	
	function drag_proc(ev){
		if(!drag_flag || preview_img === null)
			return false;
		var x = ev.pageX;
		var y =	ev.pageY;
		stop_rotate();
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
		if(flag_rotate){
			angle_now = angle_org - get_angle(get_container_origin().x, get_container_origin().y, ev.pageX, ev.pageY) + angle_now;
		}
		stop_rotate();
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
		if(preview_img.offsetWidth !== org_width || preview_img.offsetHeight !== org_height)
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
				if(preview_img.offsetHeight > viewHeight * 0.9){
					percentage = (viewHeight * 100 * 0.9)/ org_height;
					preview_img.style.height = org_height * percentage/100 + 'px';
					preview_img.style.width = org_width * percentage/100 + 'px';
				}
				if(preview_img.offsetWidth > viewWidth * 0.9){
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
		if(percentage < 5)
			percentage = 5;
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
		preview_div.style.zIndex = 9999;
	}
	
	function create_preview_button(icon, func){
		var btn = document.createElement('span');
		btn.setAttribute('style', 'margin-left: 5px; width: 22px !important; height: 22px !important; background-image: url("' + icon + '"); float: right !important; cursor: pointer !important;');
		btn.addEventListener('click', func, false);
		return btn;
	}
	
	function drag_fix(ev){
		var x = ev.pageX;
		var y = ev.pageY;
		if(drag_flag){
			preview_div.style.left = x - offset_x + 'px';
			preview_div.style.top = y - offset_y + 'px';
			if(window.getSelection() !== '')
				window.getSelection().removeAllRanges();
			return true;
		}
		return false;
	}
	
	function create_preview(x, y, imgLink){
		if(imgLink !== null){
			destroy_all();
			if(TRANSLUCENT_BACKGROUND && VIEW_STYLE != 2){
				preview_bg = document.createElement('div');
				preview_bg.setAttribute('style', 'position: absolute !important; left: 0px !important; top: 0px !important; z-index: 9998 !important; background-color: black !important; opacity: ' + BACKGROUND_OPACITY + ' !important; width: '+Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) + 'px !important; height: ' + Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, (window == window.top) ? window.innerHeight : 0) + 'px !important;');
				preview_bg.addEventListener('mousemove', drag_fix, false);
				document.body.appendChild(preview_bg);
			}
			preview_div = document.createElement('div');
			preview_div.setAttribute('style', 'border: 1px solid gray !important; background-color: white !important; position: absolute !important; z-index: 9999 !important; padding: 5px !important;');
			preview_div.style.left = -9999 + 'px';
			preview_div.style.top = -9999 + 'px';
			preview_div.style.visibility = 'hidden';
			preview_div.style.zIndex = -9999;
			
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
				preview_img.addEventListener('mousewheel', resize_preview, false);
			}
			preview_div.appendChild(preview_img);
			document.body.appendChild(preview_div);
			
			//opera中，body子元素加载优先权高于孙子元素，此段代码用于解决页面未加载完成时图片不显示的问题。
			preview_img_clone = document.createElement('img');
			preview_img_clone.src = imgLink;
			preview_img_clone.setAttribute('style', 'visibility: hidden !important; z-index: -9999 !important; position: absolute !important; width: 0px; height: 0px;');
			document.body.appendChild(preview_img_clone);
		}
		//调整图片位置
		if(VIEW_STYLE !== 0){//不居中
			preview_div.style.left = x + 5 + 'px';
			preview_div.style.top = y + 5 + 'px';
			preview_div.style.visibility = 'visible';
			preview_div.style.zIndex = 9999;
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
			}
			delete temp_img;
		}
	}
	
	function create_preview_loading(){
		preview_loading = document.createElement('div');
		preview_loading.setAttribute('style', 'border: 1px solid gray !important; background-color: white !important; position: absolute !important; z-index: 9999 !important;');
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
		if(preview_bg != null){
			preview_bg.removeEventListener('mousemove', drag_fix, false);
			document.body.removeChild(preview_bg);
			preview_bg = null;
		}
		if(preview_div !== null){
			preview_img.removeEventListener('mousedown', drag_begin, false);
			preview_img.removeEventListener('mousemove', drag_proc, false);
			preview_img.removeEventListener('mouseup', drag_over, false);
			preview_img.removeEventListener('dblclick', fit_to_screen_switch, false);
			preview_img.removeEventListener('DOMMouseScroll', resize_preview, false);
			preview_img.removeEventListener('mousewheel', resize_preview, false);
			
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
			
			angle_org = 0;
			angle_now = 0;
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
	
	function show_view_icon(imgLink, resized){
		if(drag_flag || target_obj == preview_img || (VIEW_STYLE == 2 && preview_div != null)){
			destroy_view_icon();
			return false;
		}
		var pos = getElementXY(target_obj);
		var x = pos.x, y = pos.y;
		var view_icon = '';
		if(resized == 'NOT_RESIZED')
			view_icon = icon.vire_notresize;
		else
			view_icon = can_click_direct_view() ? icon.view_click : icon.view;
		if(VIEW_BUTTON_POS == 1)//右上
			x = x + target_obj.width - 32;
		icon_view = document.createElement('span');
		icon_view.setAttribute('style', 'width: 32px !important; height: 32px !important; position: absolute !important; left: ' + x + 'px !important; top: ' + y + 'px !important; cursor: pointer; background-image: url("' + view_icon + '") !important; z-index: 9998 !important;');
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
	
	function diff_ingore(w, h, ow, oh){
		if((100 - w*100/ow) <= DEC_PERCENTAGE && (100 - h*100/oh) <= DEC_PERCENTAGE)
			return true;
		if(Math.abs(ow - w) <= DEC_PIX && Math.abs(oh - h) <= DEC_PIX)
			return true;
		return false;
	}
	
	function need_preview(w, h, ow, oh){
		if(VIEW_FILTER == false)
			return true;
		if(w > ow && h > oh)
			return false;
		if(diff_ingore(w, h, ow, oh))
			return false;
		return true;
	}
	
	function check_img_link (link){
		if(link.search(/(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i) !== -1)
			return true;
		return false;
	}
	
	function check_img_src_reg (){
		if(!SITE_IMG_INFO_FLAG)
			return '';
		var i, t_link = '', link = target_obj.src;
		for(i = 0; i < SITE_IMG_INFO.length; i++){
			if(SITE_IMG_INFO[i][3] == 'href'){
				var target_link = target_obj, find = false;
				while(target_link.nodeName.toLowerCase() != 'a' && target_link.parentNode){
					target_link = target_link.parentNode;
				}
				if(target_link.nodeName.toLowerCase() != 'a') return '';
				t_link = target_link.href;
			}
			else{
				t_link = link;
			}
			if(SITE_IMG_INFO[i][0].test(t_link)){
				return (SITE_IMG_INFO[i][2]) ? eval(SITE_IMG_INFO[i][2] + '("' + t_link.replace(SITE_IMG_INFO[i][0], SITE_IMG_INFO[i][1]) + '")') : t_link.replace(SITE_IMG_INFO[i][0], SITE_IMG_INFO[i][1]);
			}
		}
		return '';
	}
	
	function can_click_direct_view(){
		var temp = target_obj;
		if(!CLICK_DIRECT_VIEW)
			return false;
		if(ALWAYS_CLICK_DIRECT_VIEW)
			return true;
		while(temp.nodeName.toLowerCase() !== 'a' && temp.parentNode)
			temp = temp.parentNode;
		if(temp.nodeName.toLowerCase() !== 'a')
			return true;
		else{
			if(check_img_src_reg() || check_img_link(temp.href))
				return true;
		}
		return false;
	}
	
	function start_preview(x, y, target_x, target_y, link, resized){
		if(timmer){
			clearTimeout(timmer);
		}
		if(VIEW_STYLE == 2){
			show_view_icon(link, resized);
			timmer = setTimeout(function(){create_preview(x, y, link);}, VIEW_PREVIEW_DELAY);
		}
		else
			timmer = setTimeout(function(){show_view_icon(link, resized);}, VIEW_BUTTON_DELAY);
		if( can_click_direct_view() ){
			target_obj.setAttribute('onclick', null);
			target_obj.addEventListener('click', function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				if(preview_div == null || link != preview_img.src){
					setTimeout(function(){create_preview(target_x, target_y, link);}, 1);
					target_obj.removeEventListener('click', arguments.callee, false);
				}
				else if(preview_div != null)
					destroy_all();
			}, false);
		}
	}
	
	function checkImage(ev){
		var x = ev.pageX;
		var y =	ev.pageY;
		if(flag_rotate){
			return false;
		}
		//用于修正拖拽过快造成的拖拽失败问题
		if(drag_fix(ev)){
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
			if(check_img_src_reg() !== ''){//自定义的规则
				var link = check_img_src_reg();
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, link, 'RESIZED');
			}
			else if( imgLink.nodeName.toLowerCase() === 'a' && EXCLUDE_IMG_LINK == true)
			{
			}
			else if( imgLink.nodeName.toLowerCase() === 'a' && check_img_link(imgLink.href) && EXCLUDE_IMG_LINK == false ){
				//图片链接，链接的是一张图片
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, imgLink.href, 'RESIZED');
			}
			else if( (org_img.width > target_obj.offsetWidth || org_img.height > target_obj.offsetHeight)
				&& need_preview(target_obj.offsetWidth, target_obj.offsetHeight, org_img.width, org_img.height)){//原图被缩放
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, target_obj.src, 'RESIZED');
			}
		}//if(VIEW_FILTER)
		else{//任何图片（除长或宽小于40像素外）都显示查看按钮，如果图片链接着另一张图片，则显示被链接的图片，否则显示当前图片
			if(check_img_src_reg() !== ''){//自定义的规则
				var link = check_img_src_reg();
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, link, 'RESIZED');
			}
			//图片链接，链接的是另一张图片
			else if( imgLink.nodeName.toLowerCase() === 'a' && check_img_link(imgLink.href) ){
				start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, imgLink.href, 'RESIZED');
			}
			else if(need_preview(target_obj.width, target_obj.height, org_img.width, org_img.height)){//没有链接图片
				if(diff_ingore(target_obj.offsetWidth, target_obj.offsetHeight, org_img.width, org_img.height)){
					start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, target_obj.src, 'NOT_RESIZED');
				}
				else{
					start_preview(x, y, getElementXY(target_obj).x, getElementXY(target_obj).y, target_obj.src, 'RESIZED');
				}
			}
		}
		delete org_img;
	}
	
	function closePreview(ev){
		var temp = ev.target;
		var find_preview = false;
		var find_loading = false;
		if(preview_div !== null || preview_loading !== null){
			if(ev.keyCode == 27 && ev.type != 'click'){
				/*避免跟浏览器的停止载入冲突*/
				ev.stopPropagation();
				ev.preventDefault();
			}
			else if(ev.type != 'click'){
				return false;
			}
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
		if(PRESS_ESC_TO_CLOSE){
			if(window.opera)
				window.addEventListener('keypress', closePreview, false);
			else
				window.addEventListener('keydown', closePreview, false);
		}
	}
	main_function();
})();