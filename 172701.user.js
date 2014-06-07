// ==UserScript==
// @name		Kadokawa Auto Buy Script moded
// @namespace   http://harryt.me
// @description >w<
// @include	 https://www.kadokawa.com.tw/p1-products_detail.php?id=*
// @include	 https://www.kadokawa.com.tw/p8-*.php*
// @include	 https://www.kadokawa.com.tw/p1-products.php*
// @exclude	 https://www.kadokawa.com.tw/p8-shopok.php*
// @version	 1
// @grant	   none
// ==/UserScript==


(function() {
	'use strict';
	if (document.URL == 'https://www.kadokawa.com.tw/p8-shoppay.php'){
		document.getElementsByName("SendType")[1].checked = true;
		document.getElementsByName("intPay")[2].checked = true;
		document.frmCar.Submit.click();
	}
	else if (document.URL == 'https://www.kadokawa.com.tw/p8-shopcheck.php' || document.URL == "https://www.kadokawa.com.tw/p8-shopcoupon.php"){
		document.form1.Submit.click();
	}
	//"精品"分類刷新&注文
	else if (!!document.URL.match(/.*(p1-products.php).*/)){
		var flag1 = 11;
		var flag2 = 11;
		var flag3 = 11;
		var reg = /.?AddCart\('(.*)'/;
		for (var i = 0; i<10; i++){
			if (!!$('.pro_bookname')[i].textContent.match(/.*(野水).*/))
				flag1 = i;
			if (!!$('.pro_bookname')[i].textContent.match(/.*(橘公司).*/))
				flag2 = i;
			if (!!$('.pro_bookname')[i].textContent.match(/.*(杉井光).*/))
				flag3 = i;
		}
		if (flag1 < 10 && !!$('.pro_buybtn')[flag1].outerHTML.match(reg)){
			var pkey1 = $('.pro_buybtn')[flag1].outerHTML.match(reg)[1];
			
			$.ajax({
				type: 'POST',
				url : '_add_Car.php',
				data: 'PKey=' + pkey1,
				success: function(response){
					if(isNaN(parseInt(response))){
						alert(response);
					}
					else {
						if (flag2 < 10 && !!$('.pro_buybtn')[flag2].outerHTML.match(reg)){
							var pkey2 = $('.pro_buybtn')[flag2].outerHTML.match(reg)[1];
							$.ajax({
								type: 'POST',
								url : '_add_Car.php',
								data: 'PKey=' + pkey2,
								success: function(response){
									if(isNaN(parseInt(response))){
										alert(response);
									}
									else {
										if (flag3 < 10 && !!$('.pro_buybtn')[flag3].outerHTML.match(reg)){
											var pkey3 = $('.pro_buybtn')[flag3].outerHTML.match(reg)[1];
											$.ajax({
												type: 'POST',
												url : '_add_Car.php',
												data: 'PKey=' + pkey3,
												success: function(response){
													if(isNaN(parseInt(response))){
														alert(response);
													}
													else {
														window.location.href = 'https://www.kadokawa.com.tw/p8-shoppay.php';
													}
												}
											});
										}
										else {
											window.location.href = 'https://www.kadokawa.com.tw/p8-shoppay.php';
										}
									}
								}
							});
						}
						else {
							window.location.href = 'https://www.kadokawa.com.tw/p8-shoppay.php';
						}
					}
				}
			});
		}
		else
			window.location.href = $($('.menu td')[8]).children('a').attr('href');
	}
	//單頁面刷新
	else if ((typeof $('.pro_buybtn a').attr('href') === 'undefined' || $('.pro_buybtn a').attr('href').match(/.?:(.*)\(/)[1] != 'AddCart') && !!document.URL.match(/.*(p1-products_detail.php).*/))
		location.reload();
	//單頁面注文
	else{
		var href = $('.pro_buybtn a').attr('href');
		var reg = /.?'(.*)'/;
		var pkey = href.match(reg)[1];
		$.ajax({
			type: 'POST',
			url : '_add_Car.php',
			data: 'PKey=' + pkey,
			success: function(response){
				if(isNaN(parseInt(response))){
					alert(response);
				}
				else {
					window.location.href = 'https://www.kadokawa.com.tw/p8-shoppay.php';
				}
			}
		});
	}
})();
