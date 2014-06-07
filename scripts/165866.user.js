// ==UserScript==
// @id             sgwonv
// @name           sgwonv
// @version        1.01
// @namespace      
// @author         EyEBURNeR
// @description    Add a "Won value" feature ( tab and sub-menu)
// @include        http://www.steamgifts.com/*
// @run-at         document-end
// ==/UserScript==

var $ = unsafeWindow.jQuery;
//prepare globals
wv=0;
nb_won=parseInt($('.pagination>.results>strong:last').text());
nb_page=Math.ceil(nb_won/25);
nb_show=0;
nb_not_received=0;
nb_not_in_group=0;

//add menu link
$('.absolute-dropdown:first>ul', '#navigation').append( $('<li/>').append( $('<a/>').attr('href','/manage/won/value').text('View Won Value') ) );

//add tab
if(document.location.href.indexOf('/manage')!==-1) $('.sub_navigation>ol>div').before( 
		$('<li/>').append($('<a/>').attr('href','/manage/won/value').text('Won value'))
	 );
//detect tab url
if(document.location.href.indexOf('/won/value')!==-1) initTab();

function initTab(){
	//prepare header and misc page elements
	$('.pagination>.results>strong:eq(1)').text(nb_show).attr('id','nb_show');
	$('.numbers','.pagination').remove();
	$('.warning_feedback').remove();
	$('.pagination>.results').append( $('<span>( Not received : <strong id="nb_not_received">0</strong>)</span>') ) ;
	//, no longer in group : <strong id="nb_not_in_group">0</strong>

	//prepare rows header and container
	$('.sub_navigation>ol>li').removeClass('selected');
	$('.sub_navigation>ol>li:last').addClass('selected');
	$('.manage').attr('id','wv_detail');
	$('.row:not(.headings),.row.headings>.status,.row.headings>.received','.manage').remove();
	$('.row.headings>.entries','.manage').text('Value').css('text-align','right');
	//prepare footer
	$('.results, div', '.pagination:last').remove();
	var obj=$('<div/>').addClass('row');
	$(obj).append($('<div/>').addClass('title').text('Total Won Value').width('490px'));
	$(obj).append($('<div/>').addClass('entries').append( $('<strong/>').attr('id','wv').text('$0')).css('text-align','right'));
	$(obj).append($('<div/>').addClass('clear_both'));
	$('.pagination:last').css('padding',0).addClass('manage').append(obj);

	//do the magic!
	for(i=1;i<=nb_page;i++) loadWon(i);	
}



function loadWon(i){
	$.ajax({
		    url: 'http://www.steamgifts.com/manage/won/all/page/'+i,
		    success: function (page) {			
				parseWon(page);
				},
		    dataType: 'html'
		});	
}
function parseWon(page){
	$('.row>.title>a', page).each(function(){
		// received only
		if($('.received>.yes.selected',  $(this).parents('.row:first')).length){
			loadWonGa( $(this).attr('href') );	
		}else{
			$('#nb_not_received').text(++nb_not_received);		
		}
			
		
	})
}
function loadWonGa(url){
		$.ajax({
		    url: 'http://www.steamgifts.com'+url,
		    success: function (page) {			
				parseWonGa(page,url);
				},
		    dataType: 'html'
		});
}
function parseWonGa(page, url){
	var title='';
	var gawv=0;
	nb_show++;
	try{
		var gawv=$('.steam_store', page ).text().split('$')[1].split(')')[0];
		var title=$('.featured .title', page ).text();
		wv=Math.round( (parseFloat(gawv)+wv)*100)/100;		
		$('#wv').text('$'+wv);
	}catch(err){
		var title=url;
		$('#nb_not_in_group').text(++nb_not_in_group);
	}
	
	var obj=$('<div/>').addClass('row');		
	$(obj).append($('<div/>').addClass('title').append( $('<a/>').text(title).attr('href', url) )   );
	$(obj).append($('<div/>').addClass('entries').text('$'+gawv).css('text-align','right'));
	$(obj).append($('<div/>').addClass('clear_both'));
	$('#wv_detail').append(obj);
	$('#nb_show').text(nb_show);
}