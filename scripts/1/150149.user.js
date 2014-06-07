// ==UserScript==
// @name           Baidu & Google Button
// @description    Fast Switch Baidu & Google Search Engine
// @author         waisir
// @include        http://www.baidu.com/s*
// @include        http://www.baidu.com/baidu*
// @include        https://www.google.com.hk/search*
// @include        http://www.google.com.hk/search*
// @include        https://www.google.com/search*
// @include        http://www.google.com/search*
// @include        http://www.bing.com/search*
// @include        http://cn.bing.com/search*
// @version        1.0
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


$(document).ready(function (){

	var kw = $('#kw').val(),
	
	ggprefix = 'https://www.google.com.hk/search?q=',
	byprefix = 'http://www.bing.com/search?q=',
	bdprefix = 'http://www.baidu.com/s?wd=';
	
	$('#su').val("百度你妹");
	
	$('.s_btn_wr').after('<span class="s_btn_wr"><input type="button" id="ggyx" value="谷歌你妹" class="s_btn" ></span><span class="s_btn_wr"><input type="button" id="byyx" value="必应你妹" class="s_btn" ></span>');
	
	$('#ggyx').on({click:function(){
		location.href = ggprefix+kw;	
	}});
	
	$('#byyx').on({click:function(){
		location.href = byprefix+kw;	
	}});

		
	function atachebdbtn() { 
		
		$('.lsb').after('<span class="s_btn_wr"><input type="button" id="bdyx" value="百度你妹" class="s_btn" ></span><span class="s_btn_wr"><input type="button" id="byyx1" value="必应你妹" class="s_btn" ></span>');
	
		$('#bdyx').off('click').on({click:function(){
			var kwg = $('#tsf-oq').text();
			location.href = bdprefix+kwg;
			return false;
		}});
		
		$('#byyx1').off('click').on({click:function(){
			var kwg = $('#tsf-oq').text();
			location.href = byprefix+kwg;
			return false;
		}});
	}

	$('.lsb').on({click:function(){
		setTimeout(atachebdbtn, 2000);	
	}});

	atachebdbtn();
	
	(function atachebybtn() { 
		
		$('.sw_b').after('<span class="bdbt2"><input type="button" id="bdyx2" value="百度你妹"></span>');
    $('.bdbt2').after('<div class="ggbt2"><input type="button" id="ggyx2" value="谷歌你妹"></div>');

    $('#bdyx2').off('click').on({click:function(){
			var bwg = $('#sb_form_q').val();
			location.href = bdprefix+bwg;
			return false;
		}});
		
		$('#ggyx2').off('click').on({click:function(){
			var bwg = $('#sb_form_q').val();
			location.href = ggprefix+bwg;
			return false;
		}});


	})();
	
});