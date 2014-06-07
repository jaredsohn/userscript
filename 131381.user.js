// ==UserScript==
// @name			吧主之怒
// @version			1.0
// @namespace		angerOfBazhu
// @include			http://tieba.baidu.com/f*
// @author			anran
// @date			2012/8/30
// ==/UserScript==

//封号天数 : 大吧可另改为3 10 , 默认为1天
var day = 1;

if (window == window.top && /http:\/\/tieba\.baidu\.com\/f/g.test(location.href)) {
	$ = unsafeWindow.$;
	$('#container').find(".threadlist_li_right").each(function(i) {
		addDeleteHref($(this));
		addBlockHref($(this));
	});

}

//删
function addDeleteHref($title) {
	var $a = $title.find('a').eq(0);
	var href = "http://wapp.baidu.com/f/m?kz=" + $a.attr("href").replace(/\/p\//g, '') + "&pinf=1__";
	$a.parent().prepend("<span target='_blank' style='float: left;' name='delete' class='green' href=" + href + ">删&nbsp;</span>");
	$a.parent().find('span[name=delete]')[0].addEventListener("click", function() {

		var href = $(this).attr('href');
		var iframe = $("<iframe width='0' height='0' id='nuIframe'></iframe>")[0];
		$("body").append(iframe);
				
		$(iframe).load(function(){
			var as = iframe.contentDocument.getElementsByTagName('a');
			for (var i=0; i < as.length; i++) {
				var a = as[i];
				//删除第二步
				if (a.innerHTML == '确认删除'){
					var evt = document.createEvent("MouseEvents");
					evt.initEvent("click", true, true);
					a.dispatchEvent(evt);
				} 
				//刪除完成 关闭iframe
				else if(a.name == 'top' && a.nextSibling.className == 'light'){
					$(iframe).remove();
				} 
			}
		});
		
		//删除第一步
		GM_xmlhttpRequest({
			method : "GET",
			url : href,
			onload : function(response) {
				iframe.contentDocument.body.innerHTML = response.responseText;
				var as = iframe.contentDocument.getElementsByTagName('a');
				for (var i=0; i < as.length; i++) {
					if (as[i].innerHTML == '删主题'){
						var evt = document.createEvent("MouseEvents");
						evt.initEvent("click", true, true);
						as[i].dispatchEvent(evt);
					}
						
				}
			}
		});
		
		$(this).parent().parent().parent().parent().remove();

	}, false);
}


//封
function addBlockHref($title) {

	var $a = $title.children().eq(0).find('a').eq(0);
	var href = "http://wapp.baidu.com/f/m?kz=" + $a.attr("href").replace(/\/p\//g, '') + "&pinf=1__";
	$title.find('.threadlist_author').find('a').each(function(index) {
		$(this).before("<span target='_blank' name='block' class='green' href=" + href + ">封</span>&nbsp;")
	});
	for (var i = 0; i < $title.parent().find('span[name=block]').length; i++) {
		$title.parent().find('span[name=block]')[i].addEventListener("click", function() {
			
			var href = $(this).attr('href');
			var username = $(this).next().html();
			$('iframe#nuIframe').remove();
			
			var iframe = $("<iframe width='0' height='0' id='nuIframe'></iframe>")[0];
			$("body").append(iframe);
					
			$(iframe).load(function(){
				var inputs = iframe.contentDocument.getElementsByTagName('input');
				for (var i=0; i < inputs.length; i++) {
					var input = inputs[i];
					//封号第二步
					if (input.value == "确定"){
						var select = input.parentNode.children[0];
						if(day == 3)
							select.options[1].selected = true;
						else if(day == 10)
							select.options[2].selected = true;
						
						var evt = document.createEvent("MouseEvents");
						evt.initEvent("click", true, true);
						input.dispatchEvent(evt);
					} 
				}
				//封号第三步
				var as = iframe.contentDocument.getElementsByTagName('a');
				for (var i=0; i < as.length; i++) {
					var a = as[i];
					if (a.innerHTML == '确定'){
						var evt = document.createEvent("MouseEvents");
						evt.initEvent("click", true, true);
						a.dispatchEvent(evt);
					}
				}
			});
			
			//封号第一步
			GM_xmlhttpRequest({
				method : "GET",
				url : href,
				onload : function(response) {
					iframe.contentDocument.body.innerHTML = response.responseText;
					var as = iframe.contentDocument.getElementsByTagName('a');
					for (var i=0; i < as.length; i++) {
						if (as[i].innerHTML == username){
							var evt = document.createEvent("MouseEvents");
							evt.initEvent("click", true, true);
							as[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.dispatchEvent(evt);
						}
					}
				}
			});
		}, false);
	}
}