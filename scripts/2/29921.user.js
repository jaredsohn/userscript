// ==UserScript==
// @name			YetAnother Wretch Album AutoPages
// @namespace		http://userscripts.org/users/59045
// @description		Yet another wretch album auto-pages
// @include			http://www.wretch.cc/album/album.php*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version			0.8
// @creator			Filitov Chang
// ==/UserScript==
//
// **NOTICE**
// To install this script, you need Greasemonkey version after 0.8.
// **END NOTICE**
//
// **THANKS**
// This script was inspired by Gea-Suan Lin <http://blog.gslin.org/> 's Wretch Album Expander <http://userscripts.org/scripts/show/12267>
// and Pierre Andrews (mortimer.pa@free.fr)'s Flickr Auto Page <http://6v8.gamboni.org/Flickr-Auto-Pagination.html>,
// thanks for their great idea.
// **END THANKS**
// 
// To Do:
// 1. correct page number when more than 13 pages
// 2. sometimes UI may broken
//

var fiYaWaAP_navPages_path = '#bigcontainer table:eq(2) > tbody > tr:eq(2) a[href*=\'&page=\']';
var fiYaWaAP_thumb_path = '#ad_square';
var fiYaWaAP_AutoPage = true;
var fiYaWaAP_AutoPage_Threshold = 340;
var fiYaWaAP_AutoPage_Timer = 200;

var fiYaWaAP_pages = [];
var fiYaWaAP_cpage = 0;
var fiYaWaAP_linkBox;

function fiYaWaAP_parsePage(cPageNum,data){
	
	$('#inplacefetchpagethumb' + cPageNum).after(
		$('<table>')
			.attr('id', 'inplacefetchpagethumbpage' + cPageNum )
			.attr('class', 'hTableCenter' )
			.append( $(fiYaWaAP_thumb_path, data).html() )
	)
	
	$('#inplacefetchpagethumbpage' + cPageNum).before(
		$('<div>').html('Page '+ cPageNum).attr('class','hCenter')
	);
	
	if(typeof(data)!='string' ){
		$(fiYaWaAP_thumb_path, data).remove();
	}

	var imgsdiv = $("<div>")
		.attr('class','hCenter')
		.append('<hr/>')
		.append( $("<div>").html('Page '+ cPageNum ).attr('class','hCenter') );

	$('#inplacefetchpagethumbpage' + cPageNum + ' .side').each(function() {
		var alink = $('a', this).attr('href');
		var imgidx = /&f=([\d]+)&/.exec( alink );
		$('<div>')
			.append(
				$('<a>')
					.attr('id', 'imgidx' + imgidx[1] )
					.attr('href','#inplacefetchpagethumb' + cPageNum)
					.append(
						$('<img>')
							.attr('src', $('img', this).attr('src').replace(/\/thumbs\/t?/, '/') )
							.hover( 
								function () {
									fiYaWaAP_linkBox
										.attr('href', alink )
										.css("top", $(this).offset().top + 4)
										.css("left",$(this).offset().left + 4)
										.show();
								}, 
								function () {
									fiYaWaAP_linkBox.hide();
								}
							)
					)
			)
			.appendTo( imgsdiv );

		$('a', this)
			.attr('id','imgthumbidx' + imgidx[1])
			.attr('href','#imgidx' + imgidx[1]);
	});

	$('#inplacefetchpagelink' + cPageNum).attr('class','checkItm');
	$('#inplacefetchpage' + cPageNum).after(imgsdiv)
}


function fiYaWaAP_scrollToPage( cPageNum ){
		var offsetLength = $('#inplacefetchpage' + cPageNum ).offset().top;
		$('body').animate({scrollTop: offsetLength}, 800);
}


function fiYaWaAP_getPageMoreIndex() {
	var i = fiYaWaAP_cpage;
	for( ; i<fiYaWaAP_pages.length && fiYaWaAP_pages[i][1]==''; i++ );
	if(i>=fiYaWaAP_pages.length){
		for(i=0 ; i<fiYaWaAP_cpage && fiYaWaAP_pages[i][1]==''; i++ );
		if( i>=fiYaWaAP_cpage ) return -1;
	}
	return i;
}


function fiYaWaAP_fetchPage(pageIndex){
	
	if( fiYaWaAP_pages[pageIndex][1] == '' ) return;
	if( fiYaWaAP_pages[pageIndex][1] == '*' ){
		fiYaWaAP_pages[pageIndex][1] = '';
		fiYaWaAP_parsePage(fiYaWaAP_pages[pageIndex][0], $(document));
		
		var nextIndex = fiYaWaAP_getPageMoreIndex();
		if( nextIndex<0 ){
			$('#inplacefetchpagemore').remove();
			$('#inplacefetchpageall').remove();
			fiYaWaAP_AutoPage = false;
		}
		return;
	}
	$.get( fiYaWaAP_pages[pageIndex][1], function(data){
		var nLn = this.url;
		var i;
		for( i=0; i<fiYaWaAP_pages.length && fiYaWaAP_pages[i][1]!=nLn; i++);
		if( i<fiYaWaAP_pages.length ){
			fiYaWaAP_pages[i][1] = '';
			fiYaWaAP_parsePage(fiYaWaAP_pages[i][0], data);
		}

		var nextIndex = fiYaWaAP_getPageMoreIndex();
		if( nextIndex<0 ){
			$('#inplacefetchpagemore').remove();
			fiYaWaAP_AutoPage = false;
		}
	});
}


function fiYaWaAP_fetchPageClick() {
	fiYaWaAP_cpage = $(this).text()-1;
	fiYaWaAP_fetchPage( fiYaWaAP_cpage );
	fiYaWaAP_scrollToPage(fiYaWaAP_pages[fiYaWaAP_cpage][0]);
}

function fiYaWaAP_fetchPageMoreClick() {
	var newIndex = fiYaWaAP_getPageMoreIndex();
	if( newIndex<0 ){
		alert( "all pages load" );
		return;
	}
	fiYaWaAP_cpage = newIndex;
	fiYaWaAP_fetchPage( fiYaWaAP_cpage );
	//fiYaWaAP_scrollToPage(fiYaWaAP_pages[fiYaWaAP_cpage][0]);
}

function fiYaWaAP_fetchPageMore() {
	var newIndex = fiYaWaAP_getPageMoreIndex();
	if( newIndex<0 ){
		return;
	}
	fiYaWaAP_cpage = newIndex;
	fiYaWaAP_fetchPage( fiYaWaAP_cpage );
}


function fiYaWaAP_fetchPageAll(){
	for(var i=0; i<fiYaWaAP_pages.length; i++)
		fiYaWaAP_fetchPage( i );
}


function fiYaWaAP_watchScorll(){
	if( fiYaWaAP_AutoPage ){
		// code notice: original from Pierre's Flickr Auto Page
		try{
			var sc = document.body.scrollTop;
			var wh = window.innerHeight ? window.innerHeight : document.body.clientHeight;
			var total = (document.body.scrollHeight - wh);
			var remain = total - sc;
			
			if(remain < fiYaWaAP_AutoPage_Threshold){
				fiYaWaAP_fetchPageMore();
			}
		}catch(e){
			
		}
		// end code notice
	}
	setTimeout(fiYaWaAP_watchScorll,fiYaWaAP_AutoPage_Timer);
}


$(document).ready(function() {
	fiYaWaAP_AutoPage = GM_getValue('fiYaWaAPEnable', true);
	fiYaWaAP_AutoPage_Threshold = GM_getValue('fiYaWaAPThreshold', 340);
	fiYaWaAP_AutoPage_Timer = GM_getValue('fiYaWaAPTimer', 200);
	fiYaWaAP_navPages_path = GM_getValue('fiYaWaAPNavPagesPath', fiYaWaAP_navPages_path);
	
	$("<div>").attr('id','ooxxTEST').appendTo("body");
	
	var tmpPages = [];	
	$(fiYaWaAP_navPages_path).each(function() {
		if( /\d+/.exec($(this).text()) ){
			tmpPages.push([$(this).text(), $(this).attr("href")]);
		}
	});
	$(fiYaWaAP_navPages_path).parent().remove();
	
	tmpPages.sort(function(a,b){return a[0]-b[0]});
	fiYaWaAP_cpage=1;
	var i;
	for(i=0; i<tmpPages.length && tmpPages[i][0]==fiYaWaAP_cpage; i++,fiYaWaAP_cpage++)
		fiYaWaAP_pages.push(tmpPages[i]);
	fiYaWaAP_pages.push([fiYaWaAP_cpage, '*' ]);
	for( ; i<tmpPages.length ; i++)
		fiYaWaAP_pages.push(tmpPages[i]);
	fiYaWaAP_cpage--;

	var cssRule = $('<style>')
		.attr("rel", "alternate stylesheet")
		.attr("type", "text/css")
		.appendTo('head')[0];
	cssRule['sheet'].insertRule('a.linkBox { position:absolute; background-color:#eeeeee; color:black; text-decoration:none; padding:2px; opacity:0.6; font:10px sans-serif; border: 1px solid; border-color: white black black white; }', 0);
	cssRule['sheet'].insertRule('a.linkBox:hover { opacity: 1; }', 0);
	cssRule['sheet'].insertRule('.checkBox { position:fixed; overflow:none; top:100px; left:0; width:3.5em; font:normal normal normal 10pt/12pt sans-serif; color:black; border:1px solid black; padding:0; margin:0; }', 0);	
	cssRule['sheet'].insertRule('.checkItm, a.checkItm:hover { display:block; background-color:white; opacity:0.4; color:black; font:normal normal normal 10pt/12pt sans-serif; text-align:center; text-decoration:none; border-bottom:1px solid black; padding:0; margin:0; }', 0);
	cssRule['sheet'].insertRule('a.checkItm { opacity: 0.4; }', 0);
	cssRule['sheet'].insertRule('a.checkItm:hover { opacity: 1; }', 0);
	cssRule['sheet'].insertRule('a.checkItmUnVisited { text-decoration:underlink; font-style:italic; color:red; font-weight:bold }', 0);
	cssRule['sheet'].insertRule('a.checkItmUnVisited:hover { text-decoration:underlink; font-style:italic; color:red; font-weight:bolder }', 0);
	cssRule['sheet'].insertRule('.hCenter { text-align:center; padding:0; margin:0; }', 0);
	cssRule['sheet'].insertRule('.hTableCenter { margin-left:auto; margin-right:auto; border-collapse:separate; borderSpacing:10px; }', 0);
	
	var thumbDiv = $("<div>").appendTo("body");
	var previewDiv = $("<div>").appendTo("body");

	fiYaWaAP_linkBox = $("<a>")
		.html('original link')
		.attr('class','linkBox')
		.hover( function () { $(this).show(); }, function () { $(this).hide(); } )
		.appendTo("body")
		.hide();

	var checkDiv = $("<div>")
		.attr('class','checkBox')
		.ajaxStart(function(){ $(this).hide(); })
		.ajaxStop(function(){ $(this).show(); })
		.appendTo("body");

	// checkbox for setup
	$("<div>")
		.attr('class','checkItm')
		.append("<label for=\"fiYaWaAP_autoPageCheck\">Auto<br/>Pages</lable")
		.append(
			$("<input type='checkbox'>")
				.attr('id','fiYaWaAP_autoPageCheck')
				.attr('checked',fiYaWaAP_AutoPage)
				.click( function () {
					if( this.checked ){
						fiYaWaAP_AutoPage = true;
						GM_setValue('fiYaWaAPEnable', fiYaWaAP_AutoPage);
					}else{
						fiYaWaAP_AutoPage = false;
						GM_setValue('fiYaWaAPEnable', fiYaWaAP_AutoPage);
					}
				})
		)
		.appendTo(checkDiv);

	// 'all' item
	$("<a>")
		.attr('id','inplacefetchpageall')
		.attr('class','checkItm')
		.html("all")
		.attr('href','#')
		.click(fiYaWaAP_fetchPageAll)
		.appendTo(checkDiv);

	if(fiYaWaAP_pages.length>1){
		// 'more' item
		$("<a>")
			.attr('id','inplacefetchpagemore')
			.attr('class','checkItm')
			.html("more")
			.attr('href','#')
			.click(fiYaWaAP_fetchPageMoreClick)
			.appendTo(checkDiv);
	}
	
	for( var i=0; i<fiYaWaAP_pages.length; i++ ){
		$("<a>")
			.attr('id', 'inplacefetchpage' + fiYaWaAP_pages[i][0])
			.attr('name','inplacefetchpage'+ fiYaWaAP_pages[i][0])
			.appendTo(previewDiv);

		$("<a>")
			.attr('id', 'inplacefetchpagethumb' + fiYaWaAP_pages[i][0])
			.attr('name','inplacefetchpagethumb'+ fiYaWaAP_pages[i][0])
			.appendTo(thumbDiv);

		$("<a>")
			.attr('id', 'inplacefetchpagelink' + fiYaWaAP_pages[i][0])
			.attr('class','checkItm checkItmUnVisited')
			.html(fiYaWaAP_pages[i][0])
			.attr('href','#inplacefetchpage'+fiYaWaAP_pages[i][0])
			.click(fiYaWaAP_fetchPageClick)
			.appendTo(checkDiv);
	}

	if(fiYaWaAP_pages.length>1){
		fiYaWaAP_watchScorll();
	}else{
		fiYaWaAP_fetchPageMoreClick();
	}

});

