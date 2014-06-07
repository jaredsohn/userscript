// ==UserScript==
// @name        buzztter with googlereader
// @description BTJGR - buzztter with googlereader
// @include     htt*://*.google.*/reader/*
// @author      BTJGR by daiji harada (http://hrd.slack77.net)
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// ==/UserScript==



(function($){
	var markup = '\
		<div class="section lhn-section section-minimized" id="lhn-buzztter">\
			<div class="section-button section-minimize" id="lhn-buzztter-minimize" style="right:3px;"></div>\
			<div style="padding-left:10px">\
				<span style="font-weight: bold;">buzztter 人気の話題</span>\
			</div>\
			<div class="scroll-tree">\
				<ul class="lhn-section-secondary" style="height:200px;"></ul>\
			</div>\
		</div>';
	$('#lhn-selectors').before(markup);
	
	var toggle = {
		open:function(){
			$('#lhn-buzztter-minimize').parent().removeClass('section-minimized');
			var height = $('#sub-tree').height() - 200;
			$('#sub-tree').height(height);
		},
		close:function(){
			$('#lhn-buzztter-minimize').parent().addClass('section-minimized');
			var height = $('#sub-tree').height() + 200;
			$('#sub-tree').height(height);
		}
	}

	$('#lhn-buzztter-minimize').click(function(){
		if($(this).parent().hasClass('section-minimized')){
			toggle.open();
			GM_setValue("buzztter", true);
		}else{
			toggle.close();
			GM_setValue("buzztter", false);
		}
	});

	//buzztterをyahoopipesから読み込み
	$.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=zIQi0Iy72xGJ3NMhJhOy0Q&_render=json&s=http://buzztter.com/ja/rss',function(datas){
		$.each(datas.value.items,function(i,item){
			//var query = item.title.replace(/ /g,'%2520').replace(/#/g,'%2523').replace(/@/g,'%2540');
			var query = encodeURIComponent(item.title).replace(/%/g,'%25')
			var li = '<li><a style="outline:none" href="http://www.google.com/reader/view/#stream/feed%2Fhttp%3A%2F%2Fbuzztter.com%2Fja%2Frss%2F'+ query +'"><span class="icon sub-icon"></span><span class="name sub-name">'+ item.title +'</span></a></li>'
			$('#lhn-buzztter .lhn-section-secondary').append(li);
		});
		
		if(GM_getValue("buzztter") == true){
			toggle.open();
		}
	});
	
})(jQuery);

