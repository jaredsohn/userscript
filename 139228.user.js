// ==UserScript==
// @name        Gotya
// @namespace   Gotya
// @description Gotya
// @include     http://www.gotya.com/index.php?p=game&x=*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==
$('#duellen').attr('id','abcyxz');
$("<div></div>").attr({id:'duellen',style:'display:none'}).appendTo('body');    
$("div.lred1 div.t-text3,div.lwhite1 div.t-text3").each(function(){
	var url = location.href.split('=');
	var gid = url.pop();
	var parent = $(this);
	var a = $(this).find('a');
	var href = a.attr('href');
	if(href!=''){
		var strArr = href.split('=');
		var tid = strArr.pop();
		$.ajax({
			url: 'index.php',
			type: 'get',
			data: 'p=game&x='+gid+'&justplayed='+tid,
			success: function(data) {
				parent.append($(data).find('div.t-text1 a').first().text());
			}
		});
	}
});
