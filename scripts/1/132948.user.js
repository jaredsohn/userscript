// ==UserScript==
// @name           6park_news_reader
// @namespace      caoglish
// @include        http://www.6park.com/
// @include        http://www.6park.com/au*.*html
// @description    6park 新闻阅读器
// @version        1.1.4
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==
//--constant--
const VERSION='1.1.4';
//-----------HelperBar.min.js-----------------
(function(e){"use strict";function f(){var e=this;e.html("").text("").attr("id","").attr("class","").attr("style","")}function l(){this.attr("id",t.strip()).css({position:"fixed","background-color":o.menubar_style.background_color,color:o.menubar_style.font_color,bottom:"0",right:"0",opacity:o.menubar_style.opacity,"border-radius":"0px "+o.border_radius+" 0px 0px","padding-left":"2px","margin-left":"1px",width:"100%","text-align":"left"});var i=e.tag("div",{id:n.strip()}),s=e.tag("div",{id:r.strip()});this.append(i).append(s).append(c())}function c(){var t=e.tag("div",{id:i.strip()}),n=e.tag("ul",{id:s.strip()});return n.css({margin:0,padding:0}),t.append(n),t}function h(t,n,r){var i=e.tag("a",{id:t,href:"#",text:n}).click(function(e){e.preventDefault(),r&&r.apply()});i.css(u).css({background:o.menubar_items_style.background_color}).hover(function(){e(this).css({background:o.menubar_items_style.hover_background_color})},function(){e(this).css({background:o.menubar_items_style.background_color})});var s=e.tag("li").css({"float":"left","list-style":"none",font:"12px Tahoma, Arial","z-index":"100"}).append(i);return s}function p(t,n,r){var i=e.tag("li");i.css({"float":"none",display:"inline",margin:"0px"});var s=e.tag("a",{id:t,href:"#",text:n}).click(function(e){e.preventDefault(),r&&r.apply()});return s.css(u).css({background:o.menubar_items_style.background_color}).css({"border-bottom":"1px solid white"}).hover(function(){e(this).css({background:o.menubar_items_style.hover_background_color})},function(){e(this).css({background:o.menubar_items_style.background_color})}),i.append(s),i}function d(e){return h(e.id,e.title,e.click)}function v(t){var n=e.tag("ul");n.hide().css({margin:"0",padding:"0",position:"absolute",bottom:"23px","z-index":"100"});for(var r in t){var i=t[r].id,s=t[r].title,o=t[r].click;n.append(p(i,s,o))}return n}function m(t){var n=d(t.root).append(v(t.list));return n.hover(function(){e(this).find("ul").slideDown()},function(){e(this).find("ul").slideUp()}),n}function g(){var n=this;o.hide_mode=="all"?e(document).dblclick(function(e){n.toggle()}):o.hide_mode=="onBar"?e(document).dblclick(function(r){var i=e(r.target).parents(t);i[0]==n[0]?n.hide():n.show()}):o.hide_mode=="notOnBar"?e(document).dblclick(function(r){var i=e(r.target).parents(t);i[0]!=n[0]&&n.toggle()}):o.hide_mode=="notOnMenu"?e(document).dblclick(function(r){var i=e(r.target).parents(t);(i[0]!=n[0]||r.target.nodeName!="A")&&n.toggle()}):o.hide_mode!="noHide"&&e.error("Wrong Type of Hide Mode")}function y(){var e=arguments,t=this,n=t.find(i);t.hover(function(){n.show()},function(){n.hide("slow")});for(var r in e)m(e[r]).appendTo(this.find(s));n.hide(),t.menubar("title",o.bar_title),g.call(t)}var t="#status-bar",n="#status-title",r="#status-message",i="#status-menu",s="#list-menu",o,u,a={init:function(t,n){return o=e.extend(!0,{bar_title:"Helper Bar",menu_width:"100px",safe_mode:"safe",hide_mode:"notOnMenu",warning_size:"50px",warning_color:"red",warning_mode:"append",border_radius:"56px",menubar_style:{background_color:"black",opacity:"0.8",font_color:"white"},menubar_items_style:{background_color:"#111111",hover_background_color:"#333333",font_color:"#EAFFED"}},n),u={display:"block",padding:"5px 12px","text-decoration":"none",width:o.menu_width,color:o.menubar_items_style.font_color,"white-space":"nowrap"},this.each(function(){f.call(e(this)),l.call(e(this)),y.apply(e(this),t)})},title:function(t){return this.each(function(){e(this).find(n).append(t)})},clsTitle:function(){return this.each(function(){e(this).find(n).html("")})},html:function(t){return arguments.length===0?this.find(r).html():this.each(function(){e(this).find(r).html(t)})},append:function(t){return this.each(function(){e(this).find(r).append(t)})},getSettings:function(){return o}};e.fn.menubar=function(t){if(a[t])return a[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t=="object"||!t)return a.init.apply(this,arguments);e.error("Method "+t+" does not exist on jQuery.menubar")},String.prototype.strip=function(){var e=/^#|^\./;return this.replace(e,"")},e.tag=function(t,n){return e("<"+t+"/>",n)}})(jQuery),function(e){"use strict";function r(r,i){t=e.tag("div").appendTo("body").menubar(r,i),n=t.menubar("getSettings"),n.safe_mode!="safe"&&(n.safe_mode=="unsafe"?(this.getMenuBar=function(){return t},this.getSettings=function(){return n}):e.error("no this type of safe mode."))}var t,n;r.prototype.append=function(e){return t.menubar("append",e),this},r.prototype.html=function(e){return arguments.length!==0?(t.menubar("html",e),this):t.menubar("html")},r.prototype.addmsg=function(t,n){return typeof n=="string"?t=e.tag("span",{style:"color:"+n}).html(t):typeof n=="object"&&(t=e.tag("span").css(n).html(t)),this.append(t),this},r.prototype.msg=function(t,n){return arguments.length!==0?(this.cls(),this.addmsg(t,n)):e(this.html()).text()},r.prototype.log=function(t){return t=e.tag("div").html(t),this.addmsg(t)},r.prototype.warn=function(t){var r={color:n.warning_color,"font-size":n.warning_size};if(n.warning_mode==="append")return this.addmsg(t,r);if(n.warning_mode==="log")return t=e.tag("div").html(t),this.addmsg(t,r);if(n.warning_mode==="clean")return this.msg(t,r);e.error("no this type of warning mode")},r.prototype.cls=function(){return this.html(""),this},r.prototype.title=function(e){return t.menubar("title",e),this},r.prototype.open=function(e,t){return t=t||"self",t==="new"?window.open(e,"_blank"):t==="self"?window.open(e,"_self"):window.open(e),this},r.prototype.show=function(e){return e===undefined?t.show():t.slideDown(e),this},r.prototype.hide=function(e){return e===undefined?t.hide():t.slideUp(e),this},r.prototype.clsTitle=function(){return t.menubar("clsTitle"),this.title(n.bar_title),this},r.prototype.version=function(){return"0.2.8"},window.HelperBar=function(){function t(e,t){return new r(e,t)}var e;return{getbar:function(n,r){return e||(e=t(n,r)),e},version:function(){return r.prototype.version()}}}()}(jQuery);
//-----------HelperBar.min.js-----------------

const PARKNEWS='#parknews';
const NEWS_LIST='#news-list';
const CLASS_NEWS_ITEM='.6park-news-item';
const NEWS_CONTENT='#news-content';
const NEWS_COMMENT='#news-comment';
const READER_MODE='1';
const NORMAL_MODE='0';
const DEFAULT_MODE=READER_MODE;
const DEFAULT_NEWS_FONT_SIZE='24';

//menu tree and menu item setup.
var menu_tree_1={
	'root':{'id':'mi-go-top','title':'go top','click':go_to_top},
	'list':[{'id':'mi-mode','title':(is_reader_mode()?'Normal Mode':'Reader Mode'),'click':toggle_mode}
	]
};

var menu_tree_2={
	'root':{'id':'mi-go-comment','title':'go comment','click':go_to_comment},
	'list':[]
};

var menu_tree_about={
	'root':{'id':'mi-about','title':'About','click':about_info},
	'list':[]
};

var menu_tree_font_size_default={
	'root':{'id':'mi-font-size-default','title':'A(Default)','click':font_size_default},
	'list':[]
};

var menu_tree_font_size_increase={
	'root':{'id':'mi-font-size-increase','title':'A+','click':font_size_increase},
	'list':[]
};
var menu_tree_font_size_decrease={
	'root':{'id':'mi-font-size-decrease','title':'A-','click':font_size_decrease},
	'list':[]
};

//click event
function go_to_top(){$('html, body').animate({ scrollTop: 0 }, 'slow');}
function go_to_comment(){$('html, body').animate({ scrollTop: $(NEWS_COMMENT).position().top }, 'slow');}
function font_size_default(){processing_font_size();}
function font_size_increase(){processing_font_size('+');}
function font_size_decrease(){processing_font_size('-');}
function about_info(){
	var about_message=$.tag('div')
					.html(ABOUT_INFO)
					.click(function(){bar.cls();});
	bar.msg(about_message);
}

//------processing script----------
function processing_font_size(action){
	if(action=='+') action_string='+=2';
	else if (action=='-') action_string='-=2';
	else action_string=DEFAULT_NEWS_FONT_SIZE;

	var jbob_font_size=$('#news-comment table td,.td3');
	jbob_font_size.css('font-size',get_local_font_size());
	jbob_font_size.css('font-size',action_string);
	set_local_font_size(jbob_font_size.css('font-size'));
}
//---------------------------------
var menu_tree_list=[menu_tree_1,menu_tree_2,menu_tree_font_size_increase,menu_tree_font_size_decrease,menu_tree_font_size_default,menu_tree_about];

var bar_opts={bar_title:'6Park News Reader',menu_width:'65px'}
var ABOUT_INFO='6Park News Reader[version:'+VERSION+']<br/>HelperBar.js Core[version:'+HelperBar.version()+']<br/>Jquery[version:'+$().jquery+']<br/>Designer:Caoglish';

$(run);
function run(){
	init_mode();
	if(is_reader_mode())
	{
		ajax_default_setting();
		extract_news_area();
		construct_news_area();
		news_default_style();
		set_event_handle();
	}
	window.bar=HelperBar.getbar(menu_tree_list,bar_opts);
	show_mode_info();
}

function show_mode_info()
{
	if(is_reader_mode())
	{
		bar.title(' [<span style="color:green">read mode</span>]');
	}else{
		bar.title(' [normal mode]');
	}
}

function ajax_default_setting(){
		$.ajaxSetup({
				   beforeSend: function( xhr ) {
					 xhr.overrideMimeType( 'text/plain; charset=gb2312' );
					}
				});
}

function extract_news_area(){
	$(PARKNEWS).clone().appendTo('body');//clone news area
	$('body > *').not(PARKNEWS).remove();//leave news area alone
	$(PARKNEWS).find('font').parent().remove();//remove ad.
	
	//re-structure DOM of news list div#news-list -> ul ->li.6park-news-item
	var ul_news_list=$('<ul/>');
	var div_news_list=$('<div/>',{id:NEWS_LIST.strip()});
	ul_news_list.appendTo(div_news_list);
	div_news_list.appendTo('body');
	//processing each of news item
	$(PARKNEWS)
			.find('a')
			.each(function(){
				var jq_a=$(this);
				$('<li/>')
					.addClass(CLASS_NEWS_ITEM.strip())
					.html(jq_a)
					.appendTo(ul_news_list);
			})
			.end()
			.text('')
			.remove;
}

function construct_news_area(){
	$('<div/>',{
		id:NEWS_CONTENT.strip(),
	}).appendTo('body');
}

function news_content_style()
{
	$('.td3')
		.css({
			'background-color':'#E6E6DD',
			'font-size':get_local_font_size()
		
		});
	$(NEWS_CONTENT).find(':image').css({
			'width':'750px'
	});
	
	$('#news-comment table td').css({'font-size':get_local_font_size()});
}

function news_default_style()
{
	$('body').css({
		'background-color':'#ffffff',
		'border':'0px solid #000000',
	});
	//in news list, each news item style
	$(CLASS_NEWS_ITEM)
			.css({
				'list-style-type':'none',
				'background-color':'#E6E6DD',		
				'border-radius':'5px',
				'display':'block',
				'margin-bottom':'8px',
				'height':'18px'
				
			})
			.hover(function(){
				$(this).css({
					'background-color':'#aaaaaa'
				});;
			},function(){
				$(this).css({
					'background-color':'#E6E6DD'
				});
			});

	//news list area style
	$(NEWS_LIST).css({
		'border':'0px solid #000000',
		'overflow':'auto',
		'font-size':'x-small',
		'width':'30%',
		'float':'left'
	});
	//news content area
	$(NEWS_CONTENT).css({
		'border':'1px solid black',
		'overflow':'auto',
		'border-radius':'5px',
		'width':'800px',
		'float':'left',
		'box-shadow':'3px 3px 10px black',
		'margin':'10px'
	});
	
}

function set_event_handle(){
	$(CLASS_NEWS_ITEM).find('a').click(click_single_news_item);
}

function click_single_news_item(event){
	event.preventDefault();
	var jq_this=$(this);
	jq_this.parent().css({'border':'3px solid black'}).end().css({'color':'olive'});
	jq_this.parent().siblings().css({'border':'0px solid black'});
	
	//processing links.
	var link=jq_this.attr('href');//get news link
	var comment_link=link
						.replace('messages','newscom')
						.replace('html','shtml');//get news comment link
	
	 //load news
	 $(NEWS_CONTENT).load(link+' .td3',function(){
		 $(this).find('.td1').remove();//remove useless area
		 
		 
		 
		 $('font[color]:contains(www.6park.com)').remove();
		 $('<div/>',{id:NEWS_COMMENT.strip()}).load(comment_link+" form table[cellpadding='5']",
			function(){
				news_content_style();
				newsReverse(NEWS_COMMENT +' table[cellpadding="5"]');//re-sort the comment.
				$(this).find("table.dc_bar").remove();//remove useless area
	
			}).appendTo(this);
	 });
}

// 逆序新闻回复
function newsReverse(responseList)
{
    var post_list = $(responseList).not(".dc_bar").not(':last');
    post_list.each(function(){
		post_list.siblings().eq(0).after($(this));
	});
}

function toggle_mode()
{
	var mode=localStorage.getItem("mode");
	if(mode == READER_MODE){
		localStorage.setItem("mode", NORMAL_MODE);
	}else if(mode == NORMAL_MODE){
		localStorage.setItem("mode", READER_MODE);
	}else{
		localStorage.setItem("mode", NORMAL_MODE);
	}
	location.reload(true);
}

function init_mode()
{
	var mode=localStorage.getItem("mode");
	if(mode != READER_MODE && mode != NORMAL_MODE){
		localStorage.setItem("mode", DEFAULT_MODE);
	}
}

function is_reader_mode()
{
	var mode=localStorage.getItem("mode");
	if(mode == READER_MODE){
		return true;
	}else{
		return false;
	}
}

function get_local_font_size(){
	if(localStorage.getItem("font-size") == undefined){
		return DEFAULT_NEWS_FONT_SIZE;
	}else{
		return localStorage.getItem("font-size");
	}
}

function set_local_font_size(size){
	localStorage.setItem("font-size", size);
}