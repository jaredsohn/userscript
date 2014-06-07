// ==UserScript==
// @name       Bangumi.tv Episodes Reverser
// @version    0.0.2
// @author     Li Caomu a.k.a.Bonegumi
// @description  将Bangumi.tv中动画条目的章节倒序排列，章节数量过多时可能会使浏览器暂时失去响应。
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include    http://bgm.tv/subject/*/ep
// @include    http://bangumi.tv/subject/*/ep
// @include    http://chii.in/subject/*/ep
// ==/UserScript==

$(document).ready(function(){

	var douga=$('li').eq(0).children('a').hasClass('focus');

	var css='#epre{padding-top: 4px;}';
	var style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);

	var epre='<div class="rr" id="epre"><a class="chiiBtn" href="javascript:void(0);"><span>章节倒序</span></a></div>';

	function reverselist(){
		var list=$('.line_list').children().slice(1,-1);

		if(list.filter('.cat')[0]){
			var cindex=$(list).index(list.filter('.cat')[0]);
		}
		else{
			cindex=list.length;
		};

		var listfirst=list.first().prev();
		var listlast=list.last().next();
		var remainlist=list.slice(cindex);

		list=list.slice(0,cindex);

		var relist=list.toArray().reverse();
		var remainlist=remainlist.toArray();

		var newlist=relist.concat(remainlist);
			newlist.unshift(listfirst[0]);
			newlist.push(listlast[0]);
		return newlist;
	};

	var type0 = $(".cat:first");
	if (type0.text()=="本篇" && douga){
		type0.parent().parent().prepend(epre);
	};

	$('#epre').click(function(){
		var newlist=reverselist();
		$('.line_list').html(newlist);
	});

});