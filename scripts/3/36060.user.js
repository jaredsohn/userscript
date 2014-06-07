// ==UserScript==
// @name           list of villages
// @include 	http://*.travian.*/spieler.php*
// ==/UserScript== 

var _p = /allianz.php|spieler.php/
if(_p.test(location.href)){
	var $;
	var host ='http://'+location.host;
	// Add jQuery
	var GM_JQ = document.createElement("script");
	GM_JQ.src = "http://nirn.ru/jquery-latest.min.js";
	GM_JQ.type = "text/javascript";
	
	document.body.appendChild(GM_JQ);
	
	// Check if jQuery's loaded
	var checker=setInterval(function(){
	if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
		clearInterval(checker);
		letsJQuery();
	}
	},100);
}

var total_e = 0
var totel_c = new Array()

function letsJQuery() {
	var _p = /allianz.php/
	var _p1 = /spieler.php/
	if(_p.test(location.href)){
		var url_arr = new Array()
		$.each( $('#member .pla a'), function(i, n){
			var a = $(n).attr('href').split('=')[1]
			total_e = i
			$.get(host+"/spieler.php",{uid:a}, function(data){
				var coor_arr = new Array()
				$.each( $(data).find('#villages .aligned_coords'), function(i, n){
					totel_c.push($(n).text().replace (/\(|\)|(\s?)/g, '').split('|').join(','))
				});
				total_e--
				if(total_e==0){
					$('#member').after('<br><textarea style="width:495px; height:80px">'+totel_c.join('|')+'</textarea>')										  
				}
			})
		});
	console.info(url_arr)
	}else if(_p1.test(location.href)){
		var coor_arr = new Array()
		$.each( $('#villages .aligned_coords'), function(i, n){
			coor_arr.push($(n).text().replace (/\(|\)|(\s?)/g, '').split('|').join(','))
		});
	
		$('#villages').after('<br><textarea style="width:495px; height:80px">'+coor_arr.join('|')+'</textarea>')
	}
}