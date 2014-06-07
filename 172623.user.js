// ==UserScript==
// @name        Kadokawa Auto Buy Script
// @namespace   http://harryt.me
// @description :|
// @match       https://www.kadokawa.com.tw/p1-products_detail.php?id=*
// @version     1
// @grant       none
// ==/UserScript==


(function() {
	'use strict';
	
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
				alert('added successfully.');
				window.location.href = 'https://www.kadokawa.com.tw/p8-shoplist.php';
			}
		}
	});
	
	//alert(href);
})();
