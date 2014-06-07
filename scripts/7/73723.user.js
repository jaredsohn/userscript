// ==UserScript==
// @name        quick search with googlereader
// @description QSGR - quick search with googlereader
// @include     htt*://*.google.*/reader/*
// @author      QSGR by daiji harada (http://hrd.slack77.net)
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



(function($){
	var markup = '\
		<div class="section lhn-section section-minimized" id="lhn-quick-search">\
			<div class="section-button section-minimize" id="lhn-quick-search-minimize" style="right:3px;"></div>\
			<div style="padding-left:10px">\
				<span style="font-weight: bold;">クイック検索</span>\
			</div>\
			<div class="scroll-tree">\
				<ul class="lhn-section-secondary" style="max-height:200px"></ul>\
			</div>\
			<div class="lhn-section-footer">\
				<span id="add-quick-search" class="link">追加 »</span>\
			</div>\
		</div>';
	$('#lhn-selectors').before(markup);
	
	//block status
	var toggle = {
		open:function(){
			$('#lhn-quick-search').removeClass('section-minimized');
			var height = $('#sub-tree').height() - ($('#lhn-quick-search .lhn-section-secondary').height() + $('#lhn-quick-search .lhn-section-footer').height());
			$('#sub-tree').height(height);
		},
		close:function(){
			$('#lhn-quick-search').addClass('section-minimized');
			var height = $('#sub-tree').height() + ($('#lhn-quick-search .lhn-section-secondary').height() + $('#lhn-quick-search .lhn-section-footer').height());
			$('#sub-tree').height(height);
		}
	}
	var email = $('#guser b.gb4').text();
	$('#lhn-quick-search-minimize').click(function(){
		if($(this).parent().hasClass('section-minimized')){
			toggle.open();
			GM_setValue('quick-search-'+email, true);
		}else{
			toggle.close();
			GM_setValue('quick-search-'+email, false);
		}
	});
	
	if(GM_getValue('quick-search-'+email) == true){
		toggle.open();
	}
	
	//query read
	var search = [];
	if(GM_getValue('quick-search-query-'+email)){
		search = JSON.parse(GM_getValue('quick-search-query-'+email));
		var li = '';
		$.each(search,function(i,query){
			li += '<li><span class="icon sub-icon del" style="background-position:4px -60px;position:absolute;left:8px;display:none;z-index:100;cursor:pointer;"></span><a style="outline:none" href="'+ query.url +'"><span class="icon sub-icon" style="background-position:-32px -32px;"></span><span class="name sub-name">'+ query.title +'</span></a></li>';
		});
		$('#lhn-quick-search .lhn-section-secondary').append(li);
	}
	
	//query add
	$('#add-quick-search').click(function(){
		if(location.hash.indexOf('#search') != -1 ){
			var url = '/reader/view/#search/';
			url += (!location.hash.split('//')[1])?encodeURIComponent(location.hash.split('//')[0].replace('#search/','').replace(/\/$/,'')):encodeURIComponent(location.hash.split('//')[0].replace('#search/','')) +'//'+ encodeURIComponent(location.hash.split('//')[1]);
			var title = $('#chrome-title em').text() +' - '+$('#search-restrict-input').val();
			search.push({'title':title,'url':url});
			GM_setValue('quick-search-query-'+email, JSON.stringify(search));
			var li = '<li><span class="icon sub-icon del" style="background-position:4px -60px;position:absolute;left:8px;display:none;z-index:100;cursor:pointer;"></span><a style="outline:none" href="'+ url +'"><span class="icon sub-icon" style="background-position:-32px -32px;"></span><span class="name sub-name">'+ title +'</span></a></li>';
			$('#lhn-quick-search .lhn-section-secondary').append(li);
		} else {
			alert('検索後に追加して下さい。');
		}
	});
	
	//query del
	$('#lhn-quick-search .lhn-section-secondary li').live('mouseover',function(){
		$('.del',this).show();
	});
	$('#lhn-quick-search .lhn-section-secondary li').live('mouseout',function(){
		$('.del',this).hide();
	});
	$('#lhn-quick-search .lhn-section-secondary li .del').live('click',function(){
		$(this).parent().remove();
		search = [];
		$('#lhn-quick-search .lhn-section-secondary li').each(function(){
			search.push({'title':$('.name',this).text(),'url':$('a',this).attr('href')});
			GM_setValue('quick-search-query-'+email, JSON.stringify(search));
		});
	});
})(jQuery);