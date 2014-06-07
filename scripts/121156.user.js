// ==UserScript==
// @name           4chan widescreen
// @version        1.0.2
// @namespace      meh
// @description    Presents more images and threads at once using columns. 
// @copyright      lazyttrick
// @copyright      rctgamer3
// @include        http*://boards.4chan.org/*
// @exclude	   http*://boards.4chan.org/f/*
// @require        http://code.jquery.com/jquery-1.5.1.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js
// ==/UserScript==
const DEBUG = false;
const RESIZE_DELAY = 400;
const ID_HOLDER = 'navtop';
const ID_TOP_MENU = 'header';
const HREF_NO_HISTORY = 'javascript:void(0)';
const DEF_THUMB_SIZE = 5; // 50%
const DEF_TEXT_SIZE = 12; // px
const DEF_NUM_COLUMNS = 0;// 0 == auto
const BASE_ZINDEX = 999;
const GMT_4chan = -4;
var columns;
var scrollTopBackup;
var topSpace, bottomSpace;
var pages;
var timerResize;
var formHtml, formHtmlNext;
var isX;
var imgReply, imgPopup;

// auto settings
const MIN_COLS = 3;
var colSettings = [ 
	{cols:4, resWidth:960},
	{cols:5, resWidth:1300}
];
var thumbSettings = [ 
	{resize:5, resWidth:960},
	{resize:4, resWidth:1300},
	{resize:5, resWidth:1600},
	{resize:7, resWidth:1800}
];

//if not a thread page
if(!isThreadPage()){
	
	//add toggle link
	$('a:contains("@")')
		.parent()
		.after( 
			$('<a href="javascript:void(0)" id="wstogglelink" title="4chan widescreen">')
				.html('ws')
				.css({cursor:'pointer'})
				.click(toggle) 
		)
		.after(' / ');

	//autorun
	if(GM_getValue('autorun')==true)
		toggle();		
}
	
	
function toggle(evt){
	
	var div = getById('divHoriz');
	img();
	
	if(div){//off
	
		GM_setValue('autorun',false);
		window.removeEventListener('resize', resize, false);
		$(document).unbind('keyup.keys');
		document.body.scrollTop = scrollTopBackup;
		document.body.style.overflow = 'auto';
		$('#divHoriz').remove();
		$('#divBgHoriz').remove();
		$('div.logo').css('visibility','visible');
		$(pages).remove();
		$('#divMenu').remove();
		$('#divPageLeft').remove();
		$('#divPageRight').remove();
		$('#divTempIsolateScript').remove();
		$('#divTempLoadNextPage').remove();		
		closeForm();
		$('.resizedThumb').remove();
		$('form[name=post]').unbind('submit.postform');
		
	}else{//on
		
		GM_setValue('autorun',true);
		scrollTopBackup = document.body.scrollTop;
		document.body.scrollTop = 0;
		document.body.style.overflow = 'hidden';
		isX = ($('#imgControls').length > 0);
		if(GM_getValue('opt_isolate_script') || isX){ // solve incompatibilities with other scripts
			if(!formHtml){//avoids making new request when window resized
				$('<div id="divBgHoriz">').css({ position:'fixed', top: $('#wstogglelink').offset().top + $('#wstogglelink').outerHeight(), left:0,width:window.innerWidth,height:window.innerHeight,backgroundColor:getStyle(document.body,'background-color')}).appendTo(document.body);
				GM_xmlhttpRequest({
					method: 'GET',
					url: location.href,
					onload: function(resp){
						if(resp.status==200){
							formHtml = null;
							formHtml = resp.responseText.match(/<form[^>]+name\=\"delform\"[^>]*>([\s\S]+)<\/form>/)[1];				
							create( formHtml );
						}
					}
				});
			}else{
				create(formHtml);
			}
		}else{
			create(null);
		}
		window.addEventListener('resize', resize, false);
		$('div.logo').css('visibility','hidden');
		$(document).bind('keyup.keys', keyupHandler);
		$('form[name=post]').bind('submit.postform',onSubmitFormPost)
	}
	
	if(evt)
		evt.target.blur();
}


function onSubmitFormPost(evt){

	var form = $('#divFormPosttt form[name=post]');
	var upfile = form.find('input[name=upfile]');
	var str, divform, divBlock;
	
	//submit page without GM_xmlhttpRequest, if there's a file to upload
	if(upfile.val() != ''){
		return true;
	}
	
	//grab form input data
	str = '';
	form.find('input,textarea').each(function(i,el){
		if(el.getAttribute('name'))
			str += ((str==''?'':'&')) + el.getAttribute('name') +'='+ el.value;
	});

	debug('action:'+form.attr('action'));
	debug('data: '+str);
	
	// hide form before sending request
	$('<div id="divBlockForm">')
		.css({width:$('#divFormPosttt').outerWidth(), minWidth:$('#divFormPosttt').outerWidth(), height:$('#divFormPosttt').outerHeight(), minHeight:$('#divFormPosttt').outerHeight(), verticalAlign:'middle', display:'table-cell', fontSize:'16px', color:'#789922'})
		.html('<center>\> posting ...</center>')
		.appendTo($('#divFormPosttt'));
	form.hide();

	// post form request
	GM_xmlhttpRequest({
		method: "POST",
		url: form.attr('action'),
		headers: { 
			"Content-type" : "application/x-www-form-urlencoded",
			"Referer" : location.href
		},
		data: encodeURI(str),
		onload: function(resp) {
			$('#divFormPosttt form[name=post]').show();
			$('#divBlockForm').remove();
			debug(resp.status+': '+resp.statusText)
			debug(resp.responseText)
			if(resp.status==200){
				var msg = createElement('div',null,null,resp.responseText.match(/\<table[\s\S]+\<\/table\>/)[0]).textContent;
				if(msg.search(/Post successful/) > -1){
					closeForm({target:document.getElementById('closeFormmm')});
				}else{
					alert( (msg.search(/Return/) > -1 ? msg.replace(/Return/,'') : msg) );
					unsafeWindow.Recaptcha.reload();
				}
			}else{
				alert(resp.status+': '+resp.statusText)
			}
		}
	});	
	
	return false;
}


function create(html){
	var page;
	
	//remove any embed
	try{ $('embed').remove(); }catch(e){}
	
	//div background
	if($('#divBgHoriz').length==0)
		document.body.appendChild(createElement('div', {id:'divBgHoriz'}));
	
	//main div
	document.body.appendChild(createElement('div', {id:'divHoriz', tabindex:1}));
	getById('divHoriz').appendChild(createElement('table', {id:'tableHoriz'},null,'<tr id="trHoriz"></tr>'));
	getById('divHoriz').focus();
	document.body.scrollTop = 0;
	
	//define num of columns 
	if(GM_getValue('opt_numcolumns') && GM_getValue('opt_numcolumns')!=0){
		columns = GM_getValue('opt_numcolumns');
	}else{
		columns = MIN_COLS;
		for(var i=0; i<colSettings.length; i++){
			if(window.innerWidth >= colSettings[i].resWidth){
				columns = colSettings[i].cols;
			}
		}
	}
	
	// isolate script from others
	if(!html){ 
		page = $('form[name="delform"]');
		debug('creating... normal mode')
	}else{
		page = $('<div id="divTempIsolateScript">').css('display','none').html(formHtml).appendTo(document.body);
		debug('creating... isolated mode')
	}
	
	//pages
	pages = createElement('div');
	pages.appendChild(xp('//table[@class="pages"]//td')[1].cloneNode(true));
	pages.setAttribute('class', 'tablePages');
	document.body.appendChild(pages);
	
	//menu
	$(document.body)
		.append( 
			$('<div id="divMenu">')
				.append( 
					$('<a id="linkClose">')
						.css({cursor:'pointer'})
						.html('\>close')
						.click(toggle) 
						.mouseenter(function(evt){
							$('#divMenuHide').show();
							$('#divMenu').addClass('shadowww').css('font-size','12px');
						})
				)
				.append(
					$('<div id="divMenuHide">')
						.hide()
						.append( $('<a id="linkOptions">').css({cursor:'pointer'}).html('\>options').click(options) )
						.append('<br>')
						.append( $('<a id="linkNewThread">').css({cursor:'pointer'}).html('\>new thread').click(postForm) )
						.append('<br>')
						.mouseleave(function(evt){
							$('#divMenuHide').hide();
							$('#divMenu').removeClass('shadowww').css('font-size','11px');;
						})
				)				
		)
	
	//create threads
	createThreads(page,false);
	debug('create() > calling applyOptionsAndEvents()...')
	applyOptionsAndEvents();
	if(GM_getValue('opt_showonlyop') && GM_getValue('opt_loadnextpage')){
		loadNextPage();
	}	
}



function createThreads(page, isNextPage){
	
	var td, el, cont, id, divThread;
	
	cont = 0;
	
	page.children('span[id^="nothread"]').each(function(i,x){
		
		//count td
		if(cont==columns)
			cont = 0;
			
		//thread id
		id = x.getAttribute('id').match(/\d+$/)[0];
		
		// create div
		if($('#divHoriz #'+id).length == 0){
			divThread = createElement('div', {id:id});
			divThread.setAttribute('class','divThread'+((isNextPage==true)?' nextpageee':''));	
			el = x; 
			while(el && el.previousSibling && el.previousSibling.nodeName!='HR'){
				el=el.previousSibling;
			}
			if(el && !el.previousSibling){
				divThread.appendChild(el.cloneNode(true));
			}
			while(el && el.nextSibling && el.nextSibling.nodeName != 'HR')
			{
				divThread.appendChild(el.nextSibling.cloneNode(true));
				el = el.nextSibling;
			}
			el = getByTag('img',divThread)[0].parentNode;
			
			//append div thread to td
			try{ td = xp('child::td',getById('trHoriz'))[cont]; }catch(e){}
			if(!td || td=='undefined')
				td = getById('trHoriz').appendChild(createElement('td',{class:'tdHoriz'}));
			cont++;
			td.appendChild(divThread);
			td.style.zIndex = BASE_ZINDEX+cont;//old code
			
		}else{
			debug('duplicate thread #'+id)
		}
	});	
}


function applyOptionsAndEvents(){

	//cleanup
	$('#divHoriz input').remove();
	$('td .doubledash').remove();
	$('#divHoriz a:contains(Reply)').each(function(i,el){ 
		var reply = $(el); 
		reply.parent().contents().filter(function(){return this.nodeType == 3;}).remove();
		reply.remove();
	});

	//show only OP's post
	if(GM_getValue('opt_showonlyop')){
		$('.tdHoriz table').hide();
	}

	//poster name
	if(!GM_getValue('opt_show_poster')){
		$('#divHoriz span.postername').hide();
		$('#divHoriz span.postertrip').hide();
		$('#divHoriz span.commentpostername').hide();		
	}

	//post title
	if(!GM_getValue('opt_show_title')){
		$('#divHoriz span.filetitle').hide();
		$('#divHoriz span.replytitle').hide();
	}

	//post number
	if(!GM_getValue('opt_show_threadnumber')){
		$('#divHoriz a.quotejs').hide();
	}

	//file info
	if(!GM_getValue('opt_show_filesize')){
		$('#divHoriz span.filesize').hide();
	}

	//ommited posts info
	if(!GM_getValue('opt_show_omittedposts')){
		$('#divHoriz span.omittedposts').hide();
	}

	//remove <br> from posts
	$('#divHoriz td.reply').each(function(i,el){
		var comment = $(el).children('blockquote');
		comment.html(comment.html().replace(/\<br\>\s*\<br\>/ig,'<br>'))
		if(	comment.prev().get(0).nodeName == 'A'  &&  comment.prev().get(0).href  &&  comment.prev().get(0).href.search(/http\:\/\/images.4chan\.org/) > -1)
			comment = comment.prev();
		comment.prevAll().filter('br,a').remove();		
	});
	
	//wrap date in a span tag
	$('.divThread td.reply').each(function(i,td){ 
			td.innerHTML = td.innerHTML.replace(/(\d+\/\d+\/\d+\(\S+\)\d+\:\d+)/g, '<span class="posttime">$1</span>');
	});
	
	//post date
	if(!GM_getValue('opt_show_date')) {
		$('#divHoriz .posttime').hide();
	}else if(GM_getValue('opt_showrelativedate')){
		toggleRelativeDate(true)
	}
	
	//thread shadow
	if(!GM_getValue('opt_hideShadows')){
		$('#divHoriz .divThread').removeClass('shadowww').addClass('shadowww');
	}


	//thumbnail's resizing and events
	var resize = getThumbSize();
	resize = parseFloat(resize/10);
	$('#divHoriz img')
		.each(function(i,el){
			
			var jqel = $(el);
			
			if(jqel.parents('.divThreadButtons').length==0 && jqel.attr('src').search(/sticky/) < 0  &&  jqel.attr('src').search(/closed/) < 0){
						
				jqel.css({
						width: parseInt(el.getAttribute('width'))*resize, 
						height: parseInt(el.getAttribute('height'))*resize
					})
					.mouseenter(function(evt) {
						if(GM_getValue('opt_resize_thumbnail')){
							var t = $(evt.target);
							var os = t.offset();
							var clone;
							$('.resizedThumb').parent().remove();
							clone = t.clone(false)
								.addClass('resizedThumb')
								.css({
									position: 'absolute',
									zIndex: BASE_ZINDEX+998,
									border:'1px solid #789922',
									top: os.top,
									left: os.left - 20,
									width: '',
									height: ''
								})
								.mouseleave(function(evt){
									$(evt.target).parent().remove();
									//$('.resizedThumb').remove();
								})
								.appendTo(document.body)
								.wrap(
									$('<a>')
										.attr({target:'_blank', href:t.parent().attr('href')})
										.click(function(evt){
											$('.resizedThumb').parent().remove();
										})
								);
							
							//out of bounds
							if(clone.height() + clone.offset().top > window.innerHeight)
								clone.css({top: window.innerHeight - clone.height()});
							if(clone.width() + clone.offset().left > window.innerWidth)
								clone.css({left: window.innerWidth - clone.width()});
						}
					})
			}
		})


	//css() uses num of columns
	debug('applyOptions() calling css()...')
	css();


	//pagination edge buttons
	if( $('#divPageLeft').length == 0 && $('#divPageRight').length == 0 ){
		var currentPage = 0;	
		try{ currentPage = parseInt(location.href.match(/(\d+)$/)[1]) }catch(e){}
		if(currentPage > 0){
			$(document.body).append(
				$('<div id="divPageLeft">')
					.append(
						$('<table>').addClass('tablePagination').html('<tr><td><center>'+(currentPage-1)+'</center></tr></td>')
					)
					.mouseenter(function(evt){
						if(GM_getValue('opt_hidePaginationEdges'))
							return;
						$('#divPageLeft').css('opacity','1')
					})
					.mouseleave(function(evt){
						if(GM_getValue('opt_hidePaginationEdges'))
							return;
						$('#divPageLeft').css('opacity','0')
					})
					.click(function(evt){ 
						if(GM_getValue('opt_hidePaginationEdges'))
							return;
						paginate(37); 
					})
			);
		}
		if(currentPage < $('.tablePages').text().match(/\[(\d+)\]\s*$/)[1] ){
			$(document.body).append(
				$('<div id="divPageRight">')
					.append(
						$('<table>').addClass('tablePagination').html('<tr><td><center>'+(currentPage+1)+'</center></tr></td>')
					)
					.mouseenter(function(evt){
						if(GM_getValue('opt_hidePaginationEdges'))
							return;
						$('#divPageRight').css('opacity','0.9')//.animate({width:'100px'}, 'fast')
					})
					.mouseleave(function(evt){
						if(GM_getValue('opt_hidePaginationEdges'))
							return;
						$('#divPageRight').css('opacity','0')
					})
					.click(function(evt){ 
						if(GM_getValue('opt_hidePaginationEdges'))
							return;
							paginate(39); 
					})
			);
		}
	}
	

	//posts buttons
	$('#divHoriz .divThread:not(.threadDone) blockquote').each(function(i,el){
		if($(el).parent().find('.divThreadButtons').length==0){
			$(el).parent().prepend(
				//quick reply buton
				$('<div>')
					.addClass('divThreadButtons')
					.append( 
						imgReply
							.clone(true)
							.attr({id:el.parentNode.getAttribute('id')}) 
							.click(replyThread)
					)
			)
		}
	});
	
	//main thread buttons
	$('.divThread:not(.threadDone) > .divThreadButtons').each(function(i,el){
		$(el).prepend(
			$('<a>')
				.attr({ href:'res/'+el.parentNode.getAttribute('id'), target:'_blank'})
				.append( imgPopup.clone(true) )
		)
		//$('<a>GoTo</a>').click(goTo).attr({href:'javascript:void(0)', threadUrl:a.href})
	});
	
	
	$('#divHoriz .divThread').removeClass('threadDone').addClass('threadDone');
	
	//cleanup
	$('#divTempIsolateScript').remove();
	$('#divTempLoadNextPage').remove();
}


function img(){
	if(!imgReply){
		imgReply = $(createElement('img', {src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAI0lEQVR42mPYsGHDfwZCYJAoQhHHpwguB+Pgw3idQdC9yAoA8aVAPGs+tj4AAAAASUVORK5CYII%3D', title:'quick reply'})).css({cursor:'pointer'});
		imgPopup = $(createElement('img', {src:'data:image/gif;base64,R0lGODlhCQAJANEAAP///4CAgAAAAMDAwCH5BAkZAAAALAAAAAAJAAkAAAIUhI8my8ccwhBIxFmDehaNE4VaQhYAOw%3D%3D', title:'open thread in a new tab'}));
	}
}


function loadNextPage(){
	
	var currentPage;
	var nextUrl;

	try{
		currentPage = parseInt(location.href.match(/(\d+)\/?$/)[1]);
	}catch(e){
		currentPage = 0;
	}
	
	if(currentPage==0)
		nextUrl = location.href + '1';
	else
		nextUrl = location.href.replace(/\d+\/?$/, (currentPage+1));
	
	if(!formHtmlNext){ //avoids requests when resizing and toggling 
		debug('loadNextPage() > requesting next page')
		GM_xmlhttpRequest({
			method: 'GET',
			url: nextUrl,
			onload: function(resp){
				if(resp.status==200){
					formHtmlNext = null;
					formHtmlNext = resp.responseText.match(/<form[^>]+name\=\"delform\"[^>]*>([\s\S]+)<\/form>/)[1];
					page = $('<div id="divTempLoadNextPage">').css('display','none').html(formHtmlNext).appendTo(document.body)
					createThreads(page,true);
					debug('loadNextPage() > GM_xmlhttpRequest() > onload > calling applyOptionsAndEvents()...')
					applyOptionsAndEvents();
				}
			}
		});
	}else{
		page = $('<div id="divTempLoadNextPage">').css('display','none').html(formHtmlNext).appendTo(document.body);
		createThreads(page,true);
		debug('loadNextPage() > formHtmlNext==true > calling applyOptionsAndEvents()...')
		applyOptionsAndEvents();		
	}
}


function recentMenu(evt){
	
}

function replyThread(evt){
	
	var ta, divform;
	var t = $(evt.target);
	var id = t.attr('id');
	var thread = t.parents('.divThread');
	var threadoffset = thread.offset();
	var spaceLeft, spaceRight;
	
	debug('replyThread() > id: '+id)
	
	//show form
	postForm(evt);
	divform = $('#divFormPosttt');
	ta = $('#divFormPosttt textarea[name=com]');
	
	//position form horizontally
	spaceLeft = threadoffset.left;
	spaceRight = window.innerWidth - threadoffset.left - thread.outerWidth();
	if(spaceRight >= spaceLeft*0.8  ||  spaceRight >= divform.outerWidth()*0.9 )
		divform.css({ right:'', left: threadoffset.left + thread.outerWidth() +7}); // right side
	else
		divform.css({ right:'', left: threadoffset.left - divform.outerWidth() -7}); // left side
	
	//position form vertically
	divform.css({top:threadoffset.top});
	if(window.innerHeight - threadoffset.top  < (divform.outerHeight()*0.7)){
		divform.css({top:window.innerHeight - (divform.outerHeight()*0.8)})
	}
	debug(divform.css('top'))
	if(divform.css('top').search(/^-/) > -1){//negative top value ("-33px")
		divform.css({top:0});
	}
	
	//set selected thread
	if(divform.attr('threadid') != thread.attr('id')){
		debug('replyThread() > '+divform.attr('threadid')+' != '+thread.attr('id'))
		//new thread selected, remove previous quotes (format ">>12653625")
		ta.val(ta.val().replace(/\>\>\d+/ig, ''));
		divform.find('input[name=resto]').remove();
		divform.find('form').prepend($('<input>').attr({type:'hidden', value:thread.attr('id'), name:'resto'}));
		$('#spanFormPostTopBarTitle').html('Reply to thread <a class="quotelink" href="res/'+thread.attr('id')+'" target="_blank">\>\>'+divform.find('input[name=resto]').val()+'</a>')
	}
	divform.attr({threadid: thread.attr('id')});
	
	//add thread number to textarea
	ta.val(ta.val()+'>>'+id);
	setCaretToPos(ta.get(0), ta.val().length)
	
	//highlight thread or reply
	$('.classHighlightThread').removeClass('classHighlightThread');
	t.parents('.divThread').addClass('classHighlightThread');
}


function closeForm(evt){
	
	debug('closeForm()...')
	
	if($('#divFormPosttt').lenght==0 || evt==undefined || !evt.target || evt.target.getAttribute('id')!='closeFormmm'){
		debug('closeForm() > divForm not found or close link not clicked by the user')
		return;
	}
	
	//clear fields
	$('#divFormPosttt').find('input[name=sub]').val('');
	$('#divFormPosttt').find('textarea[name=com]').val('');
	$('#recaptcha_response_field').val('');
	$('#divFormPosttt').find('input[name=upfile]').val('');
	
	//remove thread reference	
	$('#divFormPosttt').find('input[name=resto]').remove();
	
	//re-append form to original pos
	$('#spanFormPostOriginalPlace').before($('#formPosttt'));	
	
	//undo highlight
	$('.classHighlightThread').removeClass('classHighlightThread')
	
	//remove div form
	$('#divFormPosttt').remove();
}


function postForm(evt){
	
	var t = $(evt.target);
	var form = $('form[name="post"]');
	var divForm = $('#divFormPosttt');
	var placeholder;
		
	//create div to append form
	if(divForm.length==0){
		debug('postForm() > creating divForm...')
		divForm = $('<div id="divFormPosttt">')
				.append(
					$('<div id="divFormPostTopBar">')
						.css({width:'100%', cursor:'move', backgroundColor:'#789922', color:'#000000', display:'inline-block'})
						.append(
							$('<a id="closeFormmm">close</a>')
								.css({float:'right', cursor:'pointer', margin:'1px 3px'})
								.click(closeForm)
						)
						.append(
							$('<span id="spanFormPostTopBarTitle">')
								.css({margin:'1px 3px'})
						)
				)
				.css({
					position: 'absolute', 
					backgroundColor: $(document.body).css('background-color'),
					zIndex: BASE_ZINDEX + 999,
					padding: 0,
					margin: 0,
					border:'1px solid #789922'
				})
				.addClass('shadowww')
				.appendTo(document.body)
				.draggable({
					handle:'#divFormPostTopBar', 
					start: function(event, ui){
						$('#divFormPosttt').css({right:'',top:''});
					}
				})
				.hide();
		
		//save form original position
		placeholder = $('#spanFormPostOriginalPlace');
		if(placeholder.length==0)
			placeholder = $('<span id="spanFormPostOriginalPlace">').hide();
		form.before( placeholder );
		
		//append form to div
		form.attr('id','formPosttt').appendTo( divForm );
	}
	
	divForm.show()	
	
	//remove reply info if it's new thread
	if(t.parents('#divMenu').length > 0)
		$('#spanFormPostTopBarTitle').html('New thread');
	if(divForm.attr('threadid')!=undefined && divForm.attr('threadid') != t.parents('.divThread').attr('id')){
		debug("1. postForm() > "+divForm.attr('threadid') +' != '+ t.parents('.divThread').attr('id'))
		divForm.removeAttr('threadid').find('input[name=resto]').remove();	
	}else{
		debug("2. postForm() > "+divForm.attr('threadid') +' != '+ t.parents('.divThread').attr('id'))
	}
	
	//position div form
	t = $('#linkNewThread');
	divForm.css({
		top: t.offset().top + t.outerHeight(),
		right: window.innerWidth - t.offset().left - t.outerWidth(),
		left:''
	});
	
	
	//get new captcha
	unsafeWindow.Recaptcha.reload();
}


function getThumbSize(){
	var res = (GM_getValue('opt_thumbsize') ? GM_getValue('opt_thumbsize') : DEF_THUMB_SIZE);
	if(res == -1){//auto
		res = DEF_THUMB_SIZE;
		for(var i=0; i<thumbSettings.length; i++){
			if(window.innerWidth > thumbSettings[i].resWidth)
				res = thumbSettings[i].resize;
		}
	}
	return res;
}

function distributeThreads(){
	
	var threads;
	var data = [];
	var reverse = false;
	var t, j, obj, tds, freeHeight, bestTD;
	
	if(GM_getValue('opt_showonlyop') && GM_getValue('opt_loadnextpage') && $('#divHoriz .nextpageee').length > 0){
		//distribute next page threads
		threads = $('#divHoriz .nextpageee');
		debug('distributeThreads() > next page threads = '+threads.length)
	}else{
		//distribute current page threads
		threads = $('#divHoriz .divThread').not('.nextpageee');
		debug('distributeThreads() > current page threads = '+threads.length)
	}
	
	//sort threads by height in data[]
	for(var i=0; i<threads.length; i++){
		
		t = $(threads[i]);
		obj = {thread:t, height:t.outerHeight()}
		
		//insertion order by height
		j=0;
		while(j<data.length && obj.height >= data[j].height)
			j++
		data.splice(j,0,obj);//insert obj at j
	}
	
	debug('distributeThreads() > data.length = '+data.length)
	
	tds = $('.tdHoriz');
	tds.removeAttr('freeheight');//cleanup
	while(data.length > 0){
		//insert on empty tds first
		for(var i=0; i<tds.length; i++){
			if(data[0] && tds.eq(i).attr('freeheight')==undefined){
				tds.eq(i).append(data[0].thread);
				tds.eq(i).attr('freeheight', (parseInt(window.innerHeight) - parseInt(topSpace) - parseInt(data[0].height)));
				data.splice(0,1);
			}
		}
		if(data[0]==undefined)
			return;
		if(!reverse){
			data = data.reverse();
			reverse = true;
		}
		//insert on higher free space (data[0] is the higher thread)
		bestTD = 0;
		for(var i=0; i<tds.length; i++){
			if(parseInt(tds.eq(i).attr('freeheight')) > parseInt(tds.eq(bestTD).attr('freeheight'))){
				bestTD = i;
			}
		}
		tds.eq(bestTD).append(data[0].thread);
		tds.eq(bestTD).attr('freeheight', (parseInt(tds.eq(bestTD).attr('freeheight')) - parseInt(data[0].height)));
		data.splice(0,1);		
	}
}


function options(evt){
	
	if($('#options').length == 0){ 
	
		$('<div id="options">')
			.appendTo(document.body)
			.css({position:'absolute', top:'0px', right:'0px', zIndex:BASE_ZINDEX+999, backgroundColor: $(document.body).css('background-color'), color: 'black', border:'1px solid #789922', padding: '13px', minWidth:'200px'})	
			.mouseleave(function(){
				$('#options').hide()
			})
			.append(' Number of columns:  ')
			.append(
				$('<select id="comboNumColumns">')
					.css({fontSize:'10px'})
					.html('<option value=0>auto</option> <option value=3>3</option> <option value=4>4</option> <option value=5>5</option> <option value=6>6</option> <option value=7>7</option> <option value=8>8</option> <option value=9>9</option> <option value=10>10</option>')
					.val((GM_getValue('opt_numcolumns') ? GM_getValue('opt_numcolumns') : DEF_NUM_COLUMNS))
					.change(function(evt){
						GM_setValue('opt_numcolumns', parseInt($(evt.target).val()));
						columns = parseInt($(evt.target).val());
						toggle();
						toggle();
						css();
					})
			)
			.append('<br>')	
			.append(' Text size:  ')
			.append(
				$('<select id="comboTextSize">')
					.css({fontSize:'10px'})
					.html('<option value=9>9px</option> <option value=10>10px</option> <option value=11>11px</option> <option value=12>12px</option> <option value=13>13px</option> <option value=14>14px</option> <option value=16>16px</option> <option value=20>20px</option>')
					.val((GM_getValue('opt_textsize') ? GM_getValue('opt_textsize') : DEF_TEXT_SIZE))
					.change(function(evt){
						GM_setValue('opt_textsize', parseInt($(evt.target).val()));
						css();
					})
			)
			.append('<br>')
			.append(' Thumbnail size:  ')
			.append(
				$('<select id="comboThumbSize">')
					.css({fontSize:'10px'})
					.html('<option value=-1>auto</option><option value=3>30%</option> <option value=4>40%</option> <option value=5>50%</option> <option value=6>60%</option> <option value=7>70%</option> <option value=8>80%</option> <option value=9>90%</option> <option value=10>100%</option>')
					.val( (GM_getValue('opt_thumbsize') ? GM_getValue('opt_thumbsize') : DEF_THUMB_SIZE))
					.change(function(evt){

						var resize = parseInt($(evt.target).val());
						GM_setValue('opt_thumbsize', resize);
						if(resize==-1){//auto
							resize = getThumbSize();
						}
						resize = parseFloat(resize/10);
						

						$('#divHoriz img')
							.each(function(i,el){
								
								if($(el).attr('src').search(/sticky/) < 0  &&  $(el).attr('src').search(/closed/) < 0 ){									
									$(el).css({width: parseInt(el.getAttribute('width')) * resize, height: parseInt(el.getAttribute('height')) * resize})
								}
							})
					})
			)
			.append('<br>')	
			.append(
				$('<input type="checkbox" id="optResizeThumbnail">')
					.attr({checked:GM_getValue('opt_resize_thumbnail')})
					.click( function(evt){	
						GM_setValue('opt_resize_thumbnail',evt.target.checked);
					})
				
			)
			.append(' Resize thumbnails on mouse over')
			.append('<br>')	
			.append(
				$('<input type="checkbox" id="optSolveIncompatibilities">')
					.attr({checked:GM_getValue('opt_isolate_script')})
					.click( function(evt){	
						GM_setValue('opt_isolate_script',evt.target.checked);
					})
				
			)
			.append(' Isolate script (solve incompatibilities)')
			.append('<br>')	
			.append(
				$('<input type="checkbox" id="optCheckUseArrowKeysToPaginate">')
					.attr({checked:GM_getValue('opt_useArrowKeysToPaginate')})
					.click( function(evt){	
						GM_setValue('opt_useArrowKeysToPaginate',evt.target.checked);
					})
				
			)
			.append(' Use arrow keys to change pages')
			.append('<br>')
			.append(
				$('<input type="checkbox" id="optCheckHidePagination">')
					.attr({checked:GM_getValue('opt_hidePaginationEdges')})
					.click( function(evt){	
						GM_setValue('opt_hidePaginationEdges',evt.target.checked);
					})
				
			)
			.append(' Hide pagination edges')
			.append('<br>')
			.append(
				$('<input type="checkbox" id="optCheckHideShadows">')
					.attr({checked:GM_getValue('opt_hideShadows')})
					.click( function(evt){	
						GM_setValue('opt_hideShadows', evt.target.checked);
						if(!evt.target.checked)
							$('#divHoriz .divThread').removeClass('shadowww').addClass('shadowww');
						else
							$('#divHoriz .divThread').removeClass('shadowww');
					})
				
			)
			.append(' Hide shadows')
			.append('<br>')			
			.append(
				$('<input type="checkbox" id="optCheckShowOnlyOP">')
					.attr({checked:GM_getValue('opt_showonlyop')})
					.click( function(evt){	
						GM_setValue('opt_showonlyop',evt.target.checked);
						if(evt.target.checked){
							//show only OP
							$('.tdHoriz table').hide();
							$('#optSpanLoadNextPage').show();
							if(GM_getValue('opt_loadnextpage')){
								if($('.nextpageee').length==0)
									loadNextPage()
								else
									$('.nextpageee').show();
							}
						}else{
							//show replies
							$('#optSpanLoadNextPage').hide();
							$('.tdHoriz table').show();
							$('.nextpageee').hide();
						}
						debug('opt_showonlyop > calling distributeThreads()...')
						distributeThreads();
					})
				
			)
			.append(' Show only original post<br>')
			.append(
				$('<span>')
					.attr({id:'optSpanLoadNextPage', checked:GM_getValue('opt_loadnextpage')})
					.css({marginLeft:'19px', display:(GM_getValue('opt_showonlyop')?'box':'none')})
					.append(
						$('<input type="checkbox" id="optCheckLoadNextPage">')
							.attr({checked:GM_getValue('opt_loadnextpage')})
							.click(function(evt){
								GM_setValue('opt_loadnextpage', evt.target.checked);
								if(evt.target.checked){
									if($('.nextpageee').length==0)
										loadNextPage()
									else
										$('.nextpageee').show();
								}else{
									$('.nextpageee').hide();
								}
							})
					)
					.append(' Load next page<br>')
			)
			
			
			.append('<hr>')
			
			
			.append(
				$('<input type="checkbox" id="optCheckShowPoster">')
					.attr({checked:GM_getValue('opt_show_poster')})
					.click( function(evt){	
						GM_setValue('opt_show_poster',evt.target.checked);
						if(evt.target.checked){
							$('#divHoriz span.postername').show();
							$('#divHoriz span.postertrip').show();
							$('#divHoriz span.commentpostername').show();
						}else{
							$('#divHoriz span.postername').hide();
							$('#divHoriz span.postertrip').hide();
							$('#divHoriz span.commentpostername').hide();
						}
					})
				
			)
			.append(' Show post names<br>')
			.append(
				$('<input type="checkbox" id="optCheckShowTitle">')
					.attr({checked:GM_getValue('opt_show_title')})
					.click( function(evt){	
						GM_setValue('opt_show_title',evt.target.checked);
						if(evt.target.checked){
							$('#divHoriz span.filetitle').show();
							$('#divHoriz span.replytitle').show();
						}else{
							$('#divHoriz span.filetitle').hide();
							$('#divHoriz span.replytitle').hide();
						}
					})
				
			)
			.append(' Show post titles<br>')			
			.append(
				$('<input type="checkbox" id="optCheckShowFileSize">')
					.attr({checked:GM_getValue('opt_show_filesize')})
					.click( function(evt){	
						GM_setValue('opt_show_filesize',evt.target.checked);
						if(evt.target.checked){
							$('#divHoriz span.filesize').show();
						}else{
							$('#divHoriz span.filesize').hide();
						}
					})
				
			)
			.append(' Show file info<br>')
			.append(
				$('<input type="checkbox" id="optCheckShowThreadNumber">')
					.attr({checked:GM_getValue('opt_show_threadnumber')})
					.click( function(evt){	
						GM_setValue('opt_show_threadnumber',evt.target.checked);
						if(evt.target.checked){
							$('#divHoriz a.quotejs').show();
						}else{
							$('#divHoriz a.quotejs').hide();
						}
					})
				
			)
			.append(' Show post number<br>')	
			.append(
				$('<input type="checkbox" id="optCheckShowDate">')
					.attr({checked:GM_getValue('opt_show_date')})
					.click( function(evt){	
						GM_setValue('opt_show_date',evt.target.checked);
						if(evt.target.checked){
							$('#divHoriz .posttime').show();
							$('#optSpanRelativeDate').show();
						}else{
							$('#divHoriz .posttime').hide();
							$('#optSpanRelativeDate').hide();
						}
					})
				
			)
			.append(' Show date<br>')
			.append(
				$('<span>')
					.attr({id:'optSpanRelativeDate', checked:GM_getValue('opt_showrelativedate')})
					.css({marginLeft:'19px', display:(GM_getValue('opt_show_date')?'box':'none')})
					.append(
						$('<input type="checkbox" id="optCheckRelativeDate">')
							.attr({checked:GM_getValue('opt_showrelativedate')})
							.click(function(evt){
								GM_setValue('opt_showrelativedate', evt.target.checked);
								toggleRelativeDate(evt.target.checked);
							})
					)
					.append(' Calculate relative time using ')
					.append(
						$('<select>')
							.attr({id:'optComboDateGMT'})
							.css({marginLeft:'4px', fontSize:'10px'})
							.html('<option value=-12>GMT-12</option><option value=-11>GMT-11</option><option value=-10>GMT-10</option><option value=-9>GMT-9</option><option value=-8>GMT-8</option><option value=-7>GMT-7</option><option value=-6>GMT-6</option><option value=-5>GMT-5</option><option value=-4>GMT-4</option><option value=-3>GMT-3</option><option value=-2>GMT-2</option><option value=-1>GMT-1</option><option value=0>GMT 0</option><option value=1>GMT+1</option><option value=2>GMT+2</option><option value=3>GMT+3</option><option value=4>GMT+4</option><option value=5>GMT+5</option><option value=6>GMT+6</option><option value=7>GMT+7</option><option value=8>GMT+8</option><option value=9>GMT+9</option><option value=10>GMT+10</option><option value=11>GMT+11</option><option value=12>GMT+12</option>')
							.val((GM_getValue('opt_gmt') ? GM_getValue('opt_gmt') : GMT_4chan))
							.change(function(evt){
								GM_setValue('opt_gmt',$('#optComboDateGMT').val())
								toggleRelativeDate(false);
								$('#divHoriz .posttime').removeAttr('originaldate').removeAttr('relativedate');
								toggleRelativeDate(true);
							})
					)
					.append('<br>')
			)			
			.append(
				$('<input type="checkbox" id="optCheckShowOmittedPosts">')
					.attr({checked:GM_getValue('opt_show_omittedposts')})
					.click( function(evt){	
						GM_setValue('opt_show_omittedposts',evt.target.checked);
						if(evt.target.checked){
							$('#divHoriz span.omittedposts').show();
						}else{
							$('#divHoriz span.omittedposts').hide();
						}
					})
				
			)
			.append(' Show omitted posts info<br>')
		
	}else{
		$('#options').show();
	}	
}


function toggleRelativeDate(on){
	
	if(on==true){
		
		//show relative date
		$('#divHoriz .posttime').each(function(i,el){
			
			if(!el.getAttribute('originalDate') && !el.getAttribute('relativeDate')){
				
				// calculate relativeDate, store in attributes
				var hour, origDate;
				var arr = el.innerHTML.match(/(\d+)\/(\d+)\/(\d+)[^\d]+(\d+)\:(\d+)/); //  01/19/11(Wed)02:27
				var gmt = (GM_getValue('opt_gmt') ? GM_getValue('opt_gmt') : GMT_4chan);
				hour = parseInt(arr[4],10);
				if(gmt > GMT_4chan){
					hour += Math.abs(gmt - GMT_4chan);
				}else if(gmt < GMT_4chan){
					hour -= Math.abs(gmt - GMT_4chan);
				}else{
					hour = (new Date()).getHours();
				}
				origDate = new Date(20+arr[3], arr[1]-1, arr[2], hour, arr[5]);// new Date(year, month, day, hours, minutes, seconds, milliseconds);
				el.setAttribute('originalDate', el.innerHTML);
				el.setAttribute('relativeDate', getRelativeDate(origDate));				
			}
			el.innerHTML = el.getAttribute('relativeDate');
		});
	}else{
		//show original date
		$('#divHoriz .posttime').each(function(i,el){
			el.innerHTML = el.getAttribute('originalDate');
		});
	}
}


//  http://snipplr.com/view/10290/
function getRelativeDate(d){

    var dateFunc = new Date();
    var timeSince = dateFunc.getTime() - d;
    var inSeconds = timeSince / 1000;
    var inMinutes = timeSince / 1000 / 60;
    var inHours = timeSince / 1000 / 60 / 60;
    var inDays = timeSince / 1000 / 60 / 60 / 24;
    var inYears = timeSince / 1000 / 60 / 60 / 24 / 365;
    var ret = "";
    
	
    // in seconds
    if(timeSince < 0 || Math.round(inSeconds) == 1){
		ret += "1 second ago";
    }
    else if(inMinutes < 1.01){
    	ret += Math.round(inSeconds) + " seconds ago";
    }
     
    // in minutes
    else if(Math.round(inMinutes) == 1){
    	ret += "1 minute ago";
    }
    else if(inHours < 1.01){
    	ret += Math.round(inMinutes) + " minutes ago";
    }
     
    // in hours
    else if(Math.round(inHours) == 1){
    	ret += "1 hour ago";
    }
    else if(inDays < 1.01){
    	ret += Math.round(inHours) + " hours ago";
    }
     
    // in days
    else if(Math.round(inDays) == 1){
    	ret += "1 day ago";
    }
    else if(inYears < 1.01){
    	ret += Math.round(inDays) + " days ago";
    }
     
    // in years
    else if(Math.round(inYears) == 1){
    	ret += "1 year ago";
    }
    else
    {
    	ret += Math.round(inYears) + " years ago";
    }
    
    return ret+'.';
}


function keyupHandler(evt){
	
	//escape key, close ws
	if(evt.keyCode == 27){ 
		toggle();
		return;
	}
	
	// left/right arrow 
	if( (evt.keyCode == 37 || evt.keyCode == 39) && GM_getValue('opt_useArrowKeysToPaginate') && !isFormPostBeingUsed()){ 
		paginate(evt.keyCode);
	}
}

function isFormPostBeingUsed(){
	if( $('#divFormPosttt').length > 0  &&  $('#divFormPosttt').find('form').length > 0 ){
		return true;
	}else{
		return false;
	}
}


function goTo(evt){
	toggle();
	var href = evt.target.getAttribute('threadUrl').match(/res\/\d+/)[0];
	var node = $('a[href^="'+href+'"]');
	window.scrollTo( 0, node.offset().top - 50);
	GM_setValue('autorun',true);
}

function resize(evt){
	if(timerResize)
		clearTimeout(timerResize);
	timerResize = setTimeout( function(evt){
		//readjust to screen size
		toggle();
		toggle();
		//css();
	}, RESIZE_DELAY);
}

function css(){

	if(!getById('cssholder'))
	{
		getByTag('head')[0].appendChild(createElement('style', {id:'cssholder', type:"text/css"}));
	}
	
	var height = parseInt(window.innerHeight);
	var width = parseInt(window.innerWidth);
	
	topSpace = $('#wstogglelink').offset().top + $('#wstogglelink').outerHeight();
	bottomSpace = parseInt(getStyle(pages,'height').match(/\d+/)[0]);

	getById('cssholder').innerHTML = ''+

		' #divBgHoriz { '+
			'position: fixed; top: '+topSpace+'px; left: 0px; z-index:'+(BASE_ZINDEX+1)+';'+
			'width: 100%;'+
			'height: 100%;'+
			'background-color: '+$('.reply').css('background-color')+';'+
			'vertical-align: middle !important;'+
		'}'+
		
		' #divBgHoriz td{ '+
			'color: #dddddd !important;'+
			'vertical-align: middle !important;'+
			'font-size: 200px !important;'+
		'}'+
		
		' #divHoriz { '+
			'position: fixed; top: '+topSpace+'px; left: 10px; z-index:'+(BASE_ZINDEX+2)+';'+
			'max-height: '+(height - (topSpace+bottomSpace))+'px;'+
			'max-width: '+(width - 20)+'px;'+
			'width: '+(width - 20)+'px;'+
			'overflow: auto;'+
			'background-color: '+$('.reply').css('background-color')+';'+
		'}'+

		' #tableHoriz { '+
			'max-height: 100%;'+
			'height: 100%;'+
			'width: 99%;'+
		'}'+
		
		' .tdHoriz { '+
			'vertical-align: top;'+
			'overflow: auto;'+
			'width: '+(100/columns)+'%;'+
			'max-width: '+(100/columns)+'%;'+
		'}'+
		
		' .tablePages { '+
			'position: fixed; bottom: 0px; left: '+parseInt(width/2 - 175)+'px; z-index:'+(BASE_ZINDEX+3)+';'+
		'}'+
		
		' .divThread { '+
			'max-width: '+parseInt(width/columns)+'px;'+
			'background-color: '+$(document.body).css('background-color')+';'+
			'padding: 0 10px;'+
			'margin: 8px 4px'+
		'}'+
		
		'.divThread table{ '+
			'max-width: '+((window.innerWidth/columns)-15)+'px;'+
			'clear:left; '+
			'border: 0;'+
			'padding: 0;'+
		'}'+
		
		
		' .divThread, .divThread .reply, .divThread blockquote { '+
			'font-size: '+(GM_getValue('opt_textsize') ? GM_getValue('opt_textsize') : DEF_TEXT_SIZE)+'px !important;'+
			'word-wrap: break-word !important;'+
			'max-width: '+((window.innerWidth/columns)-15)+'px;'+// must be in pixels or some texts will overflow
			'min-width: 50% !important;'+
			'border: 0;'+
		'}'+
		
		' .divThread .reply, .divThread blockquote { '+
			'padding: 0 !important;'+
			'margin:3px !important;'+
		'}'+
		
		' .divThread a img {'+
			'margin: 0 5 !important;'+
		'}'
		
		+'.divThread .divThreadButtons { float:right; padding:0; margin-top:3; margin-right:3px; }'
		
		+'#divHoriz span.omittedposts {font-size:10px !important;}'
		
		+'#divHoriz span.postername, #divHoriz span.postertrip, #divHoriz span.commentpostername, #divHoriz span.filetitle, #divHoriz .replytitle, #divHoriz span.filesize, #divHoriz a.quotejs, #divHoriz .posttime { font-size: 11px !important; }'
		
		//menu
		+'#divMenu { position:fixed; right:35px; top: 2px; z-index:'+(BASE_ZINDEX+998)+'; padding:0 10px; margin:3px; font-size:11px; background-color:'+$(document.body).css('background-color')+'; border:1px solid #789922; }'
		+'#divMenu a:hover, #divMenu a:active { color: #789922 !important; }'
		+'#divMenu a { float:right; }'
		
		//pagination edges
		+'#divPageLeft, #divPageRight { position:absolute; top:0px; height:100%; width:13px; cursor:pointer; z-index:'+BASE_ZINDEX*2+'; vertical-align: middle; background-color:'+$(document.body).css('background-color')+'; opacity:0; overflow:hidden;}'
		+'#divPageLeft { left:0px; }'	
		+'#divPageRight { right:0px; }'
		+'.tablePagination { width:100%; height:100%; color:#000000; overflow:hidden; vertical-align:middle !important;}'
		+'.tablePagination center { font-size:10px;  }'
		
		//shadow
		+'.shadowww {box-shadow: 5px 5px 5px #222222;}'
		
		//next page threads
		+'.nextpageee {background-color: #eeeeee;}'
		
		//highlight thread
		+'.classHighlightThread {border:1px solid #789922;}'
		
		// /b/ackwash compatibility
		+'#backwash_tooltip { z-index:'+(BASE_ZINDEX+999)+' !important;}'
		+'#divHoriz a.backlink {display:none !important;} ';		
		
		debug('CSS() calling distributeThreads()... ')
		distributeThreads();
}


function isThreadPage(){
	return (location.href.search(/\/res\/\d+/) > -1);
}


function getThreadIdByUrl(url){
	try{
		return url.match(/\/res\/(\d+)/)[1];
	}catch(e){
		return null;
	}
}


function storeThread(t, type){
	
	var threads = GM_getValue('threads');
	
	if(!threads){//first insertion
		threads = {};
		threads.t = [];
		threads.t.push(t);
		if(type=='posted'){
			threads.posted
		}
	}
	
	//store changes
	GM_setValue('threads', escape(threads.toSource()))
}



function paginate(keyCode){

	var href, delay, currentPage = 0;
	
	try{ currentPage = parseInt(location.href.match(/(\d+)$/)[1]); }catch(e){}
	
	//cleanup
	$(document).unbind('keyup.keys');		
	$('#divPageLeft').remove();
	$('#divPageRight').remove();
	
	if(keyCode==37 && currentPage > 0){ // paginate left

		if(currentPage<=1)
			href = location.href.replace(/(\d+)$/, '');
		else
			href = location.href.replace(/(\d+)$/, (currentPage-1));

		//animate
		$('#divBgHoriz').append($('<table>').css({width:'100%',height:'100%'}).html('<tr><td><center></center></tr></td>'));
		$('#divHoriz').animate( {left: $('#divHoriz').outerWidth()});
		
		//change page
		delay = $('#divHoriz img').length > 20 ? 250 : 20 ;
		setTimeout(function(){location.href = href},delay);

	}else if(keyCode==39 && currentPage < $('.tablePages').text().match(/\[(\d+)\]\s*$/)[1] ){ // paginate right

		$(document).unbind('keyup.keys');
		if(currentPage==0)
			href = location.href + '1';
		else
			href = location.href.replace(/(\d+)$/, (currentPage+1));
		
		//animate
		$('#divBgHoriz').append($('<table>').css({width:'100%',height:'100%'}).html('<tr><td><center></center></tr></td>'));
		$('#divHoriz').animate( {left: -$('#divHoriz').outerWidth()});
		
		//change page
		delay = $('#divHoriz img').length > 20 ? 250 : 20 ;
		setTimeout(function(){location.href = href}, delay);
	}
}





// http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}
function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}


function getStyle(elem, style)
{
	return window.getComputedStyle(elem,null).getPropertyValue(style);  
}


function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function getById(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getByTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

function xp(p, context, doc) {
	if (!context) 
		context = document;
	if (!doc) 
		doc = document;	
	var i, arr = [], xpr = doc.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) 
		arr.push(item);
	return arr;
}

function debug(str)
{
	if(!DEBUG)
		return;
	var d = document.getElementById('debugg');
	if(!d){	
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; width:30%; z-index:9999999999999;');
		
		var closeButton = document.createElement('input');
		closeButton.setAttribute('id','closedebug');
		closeButton.setAttribute('type', 'button');
		closeButton.setAttribute('value', 'close');
		closeButton.setAttribute('onClick', 'this.parentNode.parentNode.removeChild(this.parentNode);');
		
		d = document.createElement('textarea');
		d.setAttribute('id','debugg');
		d.setAttribute('style',"height:120px; width:99%; margin:2px; font-size:11px;");
		
		div.appendChild(d);
		div.appendChild(document.createElement('br'));
		div.appendChild(closeButton);
		document.body.appendChild(div);
	}
	d.innerHTML += '\n'+str;
	d.scrollTop = d.scrollHeight;

}
