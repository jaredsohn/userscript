// ==UserScript==
// @name        爱漫画优化
// @namespace   rntaken
// @include     http://www.imanhua.com/comic/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @version     1
// ==/UserScript==
$(document).ready(function(){
	//初始化导航栏、服务器选择
	$('DIV.w980.title div.fr').css("display","none")
	$('DIV.w980.clearfix.sub-btn').css("display","none")
	$('.header').css("display","none")
	//清理广告元素
	$('#imh-3').remove()
	$('DIV.footer-main').remove()
	$('DIV#imh-2.imh-vv.w980.imh-2').remove()
	$('.main-btn').remove()
	$('#imh-1').remove()
	//解锁右键
	window.location='javascript:(function()%20{%20function%20R(a){ona%20=%20"on"+a;%20if(window.addEventListener)%20window.addEventListener(a,%20function%20(e)%20{%20for(var%20n=e.originalTarget;%20n;%20n=n.parentNode)%20n[ona]=null;%20},%20true);%20window[ona]=null;%20document[ona]=null;%20if(document.body)%20document.body[ona]=null;%20}%20R("contextmenu");%20R("click");%20R("mousedown");%20R("mouseup");%20R("selectstart");})()'
	GM_addStyle("DIV.w980.clearfix.sub-btn{background-color:transparent !important;border:none !important;height:auto !important;float:right;width:450px !important;}.servList,.support{text-shadow:none !important;}.servList li a:hover,A.support-shortcuts:hover{color:rgb(255,255,255) !important;}.servList li a.current,A.support-shortcuts{color:white !important;background:transparent !important;padding-left:0px !important;}.servList li a,A.support-shortcuts{background-color:transparent !important;border:none !important;width:50px;text-align:center !important;}.servList li a:hover,A.support-shortcuts:hover{background-color:rgb(50,50,50) !important;}A.support-shortcuts{z-index:auto !important;}DIV.header{position:absolute;left:63px;z-index:11 !important;width:1300px;overflow:hidden;}div.w980{margin-left:150px !important;width:1210px !important;}DIV.search.fr.pr{background:rgb(50,50,50);border:1px solid rgb(90,90,90);}INPUT#txtKey{width:220px !important;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAA7UlEQVQ4jeXRPU4DMRCG4clSZe8VFAqXvsB870HIEio6bkCBIrgHuQBKKPgJdUILQSAUmomEEIg1WyGmsTyWH38am/3Pyjn3JY2AG+BF0q27NymlughKKdWSpsBG0gw4A65iPy0CJR0AG3dvzKyKdgUcBjguwRaSLs2s9+moJ2ku6b41BrxKOv3moQnwVoLd/ZBs0Rpz9+bDbCozs5zzzq9mllKqgYu4OJd0vv3N6B21xiJJH9iXdC1pHesIOA7wARgUoV8VsIqUj+6+2wlz9z3gORKuJQ07gZKGwFOAy06YmRkwkLQETjpjf6/eAfuci7EMht1NAAAAAElFTkSuQmCC) !important;background-position:left !important;}A.pr.new-update{border-left:none !important;}img#logo{position:absolute;top:8px;left:63px;z-index:12;cursor:pointer;}.title h1 a,.title h2{color:rgb(150,150,150) !important;}#pagechange{margin:0px auto !important;width:566px;height:76px;line-height:76px !important;}#pagechange a,#pagechange span{font-size:18px;color:rgba(255,255,255,0.2) !important;text-decoration:none !important;margin:0px 5px;-moz-transition:all 0.3s ease;}#pagechange a:hover,#pagechange span:hover{color:rgba(255,255,255,0.5) !important;}#pagechange span.current{font-size:24px;color:rgba(255,255,255,0.5) !important;}#pagechange a img{vertical-align:middle;opacity:0.2;-moz-transition:all 0.3s ease;}#pagechange a img:hover,DIV.w980.clearfix.sub-btn,SPAN#lighter.lighter-open{opacity:0.5}img{cursor:pointer !important;}DIV#tip-shortcuts.tip-shortcuts{z-index:99 !important;}")
	//服务器选择清理
	$('#share').remove()
	$('DIV.fl.support > ul > li:nth-child(2)').remove()
	$('DIV.fl.support > ul > li:nth-child(2)').remove()
	$('DIV.fl.support > ul > li:nth-child(2)').remove()
	$('DIV.fl.support > ul > li:nth-child(2)').remove()
	$('DIV#imh-0.imh-vv.w980.imh-0').remove()
	$('#servList > ul:nth-child(1) > li:nth-child(1)').remove()
	$('.fl > ul:nth-child(1) > li:nth-child(5)').remove()
	//导航栏清理
	$('a.logo').remove()
	$('BUTTON#btnSend').remove()
	$('SPAN#lighter.lighter-open').text("")
	//淡入淡出动画
	//导航栏
	$('DIV.w980.title').before('<img id="logo" src="http://www.imanhua.com/v2.2/css/logo_mini_gray.gif">')
	$('img#logo').click(function(){
		$('DIV.header').fadeToggle()
	})
	//服务器选择
	$('DIV.w980.title').mouseenter(function(){
		$('DIV.w980.clearfix.sub-btn').fadeIn(300)
		$('DIV.w980.title div.fr').fadeIn(300)
	
	})
	$('DIV.w980.title').mouseleave(function(){
		$('DIV.w980.clearfix.sub-btn').fadeOut(300)
		$('DIV.w980.title div.fr').fadeOut(300)
	
	})
	//创建新选择器
	$('div.clearfix.mtb4').after('<div id="pagechange"></div>')
	$('div#pagechange').prepend('<a id="prevC" href="javascript:void(0)" onclick="imh.prevC()"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAABv0lEQVR4nO3ZsUrDUBjFcXFwcRMXcRAEfQA3N/EBxM3dd3AvOOlDiIuDjj6AFFzFrUsHt7YZREggue3Nx/lcumiK3tx7lw/ODzL+hxNKSW7W1oiIiIiIiIiIiIiIiIjIgrqud0TkXlWf/rpE5GE+n+/nak1qmmYXwFj/AcCLyHmu1qSqqg4BTAIG1yJylqs1yXt/BGAWMtg5d5KrNalt22MAn4GDT3O1JjnnTgDUAYO/vPdHuVqTROQsdnBKa9JisbgA4AMGT6qqOszVmuS9vwSAmMEprUmqevXf2OXg8e8Hy5TWJFW9Dvx1jJum2c3VmqSqt6G/jhU3K7o1ZzAYrIvIXczglNak0Wi0ISKPMYNTWrPatr0JHCyqepCrNassyy0A74HDh0VRbOZoTSuKYhPAS8zwlNa05fDnhJsW1ZrW80/8x/CU1rSejwnD6XS6naM1T8MfRN/LstzK1Zqm4a86q25adGua9niZXvG6FN2a1uO4pjM8pTWtx4HgR8JhYqc1rceRc+dgMKU1rcdHjVnCB5FOa1qPz2adjxsprWnLD7NvAEZ/Xar66pzby9USEREREREREREREREREVnwDZiLhWN1dTafAAAAAElFTkSuQmCC"></a>')
	$('div#pagechange').append('<a id="prevPage" href="'+$('a.btn-red:nth-child(2)').attr("href")+'"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAABmElEQVR4nO3ZsWoUURTG8cXCJl2wkRSCYB4gnV3IAwQ7e9/BfiGVPoTYWGjpA4SAraTbZgu7bKaQwAzM3N07h+/Y7LTJvSCckPn/YPqPjwtz7zmLBQAAAAAAAAAAAICnpO/7l2b21d1/3PeZ2bftdvs6Om+oYRiOJK39AZKymb2Lzhuq67pjSTcFZfVmdh6dN1TO+UTSbUlZKaXT6LyhxnF8K+lvYVln0XlDpZROJfUFZd3lnE+i84Yys3PKKrTb7d5LygVl3XRddxydN1TO+YMkUVYBd//4UFH7stazv5S6+0XhyVoPw3AUnTeUu38uPVmzLmu5XD4zsy+UVWC1Wj03s++UVWgcx0+FZZm7v4nOG65t20NJ14WlXTVNcxCdOVzTNAeSLimtwr60n5RWofIHQGmLRfUV42qz2byIzvwoePkl9rpt28PovI+Clz+TKG3iFQ/x2V9qJxWjHkqbVAwT/8x+PjapGFczVJxULERuZz/jn1Ss3FiMTPZL3d+SVvd97v4rpfQqOi8AAAAAAAAAAAAA/A//AF58QrJDGeNWAAAAAElFTkSuQmCC"></a>')
	for (i=3;i<13;i++) {
		$('div#pagechange').append($('#pagination > :nth-child(3)'))
	
	}
	$('div#pagechange').append('<a id="nextPage" href="'+$('a.btn-red:nth-child(3)').attr("href")+'"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAABpUlEQVR4nO3ZIU8DQRCG4UsFBkcwBIeoIyFYQtJgcE0dDlGHw+AQm+BQ/AJ+ABKNwOFwNfg2VU166XWvs3MzGNCdVbNJvyc5/+XNpentVhUAAAAAAAAAAAAAAAAAlIiZh6r6tu1JKb1MJpM9773uQgg9Zn5VAxF5n8/n+96b3YUQeimlF2O0T0T7o6rPxmhfs9ns0HtvEVT1SUTEEO17uVweeO8tgqo+GN+0n/V6fey9twhd190b37Sftm1PvPcWgYjGxmjTuq773nuLkBFtQUTn3nuLwMwjESFLtJTShffeImREa2KMA++9RWjb9lpEGks0Zh567y1CjHFgjEbMPPLeW4SMaEJEY++9RSCi8bZg/9FSSpfee13Vdd0XkaklmKo+e+91lRnrMYTQ897sJjPWg/deV0R0LiKLbZXwQ19VlaqeGWORqt5673WF/10ZMmLhc4iZh8ZYixjjlfdeVzmnEzt/pLPZbG6Msaar1erUe68rnLBm6LruznqGv/MXH2q/JfpumubIe68rVR2KyMTwfOAeEgAAAAAAAAAAAAAAAAB23S/yxzgTW7zR0wAAAABJRU5ErkJggg=="></a>')
	$('div#pagechange').append('<a id="nextC" href="javascript:void(0)" onclick="imh.nextC()"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAABx0lEQVR4nO3ZvUoDQRTFcbGwsRMbsRAC+gB2duIDiJ2972AfsNKHEBsLLX0AEWzFLo2FXeIWIuzC7mxmL2ds0hg/MrN7MVw9P9jyX5wtQnZmYYGIiIiIiIiIiIiIiIiIfltd1z0RuQwhXP/0iMhFWZZrWq1pInIAwIcZADxVVbWu1ZomIvsAyojhw6IotrRa05xzu5HDX7z321qtac65vcjhr03T7Gi1pnnvtwG8RQwvnXO7Wq1pKcNFZF+rNa0oii0Aw4jhfjweH2q1piUMh/f+SKs1ra7rHoCnWcMnjrVa06qqWo8ZDgAhhBOt1rTY4RNnWq1pKcNF5Lzf7y9qtKYlDr8aDAZLbdt57lQVQtgEIDHDm6Y5bdvOa5+qLMuWAdzFDAbwmOf5Stt2njtVJA6+zbJsWaM1KXHwTYeXdfOvXtb0D32X1qTRaLSaMPjD34EurUl5nq8AeIwZHKb+cHZpTYod/NUnTZfWpMRPmWOt1qSUj+XpY5kurUmTM6zniMHfHRq2ak1KOPD7dLTcpTVpcg7/EjP4m4uPVq1JCZcWn67HurQmOec2Qgj3AAYznocvLm9bt0REREREREREREREREREf9U74od8fygFX/wAAAAASUVORK5CYII="></a>')
	$('div.w980.tc').remove()
	//创造图片链接
	$('DIV#mangaBox').append('<a id="mangaFileA"></a>')
	$('a#mangaFileA').append($('img#mangaFile'))
	$('a#mangaFileA').attr("href",$('A#nextPage').attr("href"))
	//移动服务器选择
	$('div.w980.title > div.fr').after($('DIV.w980.clearfix.sub-btn'))
	$('body > DIV.w980.clearfix.sub-btn').remove()

})