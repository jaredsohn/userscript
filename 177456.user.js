// ==UserScript==
// @name        AiiD
// @namespace   DMM free adult movie on Amazon
// @description DMMの無料アダルト動画をアマゾンで見れる
// @include     http://www.amazon.co.jp/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require     http://affiliateui.com/colorbox-master/jquery.colorbox-min.js
// @grant       GM_xmlhttpRequest
// @version     1
// ==/UserScript==

(function($) {
	
	var r = 0;

	var p_id;
	var my_i;

	var r2;

	p = $("span.zg_hrsr_ladder");

	p.each(function() {

		z = ($(this).text()).indexOf("アダルト", 0);
		
		if(z != -1) {

			r = 1;
			return false;
		}

	});

	//アダルトジャンルである
	if(r == 1) {

		l = $("div.content ul li");

    	l.each(function () {

			e = $(this).text();
        	
			v = e.indexOf("EAN", 0);
			
			if(v == -1) {

				//EANがなければ処理しない
			
			} else {

				//EANがある
				y = e.replace("EAN：", " ");
				y = "ean=" + jQuery.trim(y);
				
				return false;

			}

    	});
		
		//DMMリクエスト
		GM_xmlhttpRequest({
			method:  "POST",
			url:     "http://affiliateui.com/AiiD/dmm_xml_res.php",
			headers: {
				     "Accept": "text/xml",
					 "Content-Type": "application/x-www-form-urlencoded"
			},
			synchronous:false,
			data:    y,
			onload:  function(res) {
				
				xml = res.responseText;
				
				//DMMの品番取得
				p_id = $("product_id", xml).text();

				//大画像
				my_i = $("imageURL large", xml).text();

				t = $("span#btAsinTitle");

				//大画像の位置
				t.before("<a class=\"myimg\" href=\"" + my_i + "\" target=\"_blank\"><img src=\"" + my_i + "\" style=\"width:200px; height:134px; cursor: pointer;\" /></a><p>");

				f_tag = "<iframe width=\"476\" height=\"368\" src=\"http://affiliateui.com/AiiD/aiid.php?p_id=" + p_id + "\" scrolling=\"no\" frameborder=\"0\"></iframe><br />";

				//動画の位置
				t.before(f_tag);

				//画像の拡大
				$("img.myimg").colorbox();
				
			}

		});

	}

})(jQuery);