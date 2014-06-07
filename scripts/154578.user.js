// ==UserScript==
// @name           Jpager
// @version        2.16
// @namespace      
// @author         stansmith
// @description    autopager based on jquery autopager. lots of specific sites optimizations.
// @include        http://perezhilton.com/*
// @include        http://cocoperez.com/*
// @include        http://fitperez.com/*
// @include        http://teddyhilton.com/*
// @include        http://perezitos.com/*
// @include        http://www.thesuperficial.com/*
// @include        http://forum.hardware.fr/*
// @include        http://g.e-hentai.org/*
// @include        http://www.gamekult.com/forum/*
// @include        http://forums.dpreview.com/*
// @include        http://randomc.net/*
// @include        http://www.jefusion.com/*
// @include        http://www.gizmodo.fr/*
// @include 	   http://manga-worldjap.over-blog.com/*
// @include 	   http://www.tmz.com/*
// @include 	   http://www.neogaf.com/*
// @include        *tumblr.com*
// @include        http://henshinjustice.com/*
// @include        http://www.sonyalpharumors.com/*
// @include        http://*.france3.fr/*
// @include        http://www.sankakucomplex.com/*
// @include        http://ratsoff.com/*
// @include        http://www.kpopspy.com/*
// @include        http://www.mangareader.net/*
// @include        http://mangafox.me/*
// @include        http://mangastream.com/*
// @include        http://pitchfork.com/*
// @include        http://www.bing.com/*
// @include        http://www.dogpile.com/*
// @include        http://www.similarsitesearch.com/*
// @include        https://yande.re/*
// @include        http://konachan.com/*
// @include        http://exhentai.org/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/154578.meta.js
// @downloadURL    https://userscripts.org/scripts/source/154578.user.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==
/*
 * jpager
 *
 * GPL license.
 *
 * note : for google use my optimized script google pager : http://userscripts.org/scripts/show/155518
 * note2 : you should use adblock to remove useless parts of the pages.
 * 
 * 
 */
 
var link1 = "a#pnnext,div#pager a.next,a[class*=TurnLink]&a:contains(Next),span.next-page a,a:contains(Page Suivante),div.sn a:has(img[src*=n.png]),a:contains(Older Posts),";
var link2 = "div[class=paging-next pagination-sprite left] a,a.next-page,div.wp-pagenavi a:contains(»),div.nav a:contains(<),a[title=next]&a[href*=henshinjust],";
var link3 = "div#navigation a:contains(earlier),div#Next a:contains(Next),div#pagination a[class=button right],div#nav-pages p a:contains(Previous page),span.next a:contains(Next),a[class=btn next_page],a.nextpostslink,";
var link4 = "li[class=pager-next last] a,span.prev_next a[rel=next],td[class=next enabled] a,a[class=next page-numbers],div[class=pagination center] a.textNext,";
var link5 = "td.alt1 a[title*=Next Page],div#controls a:contains(Next),table.ptt tbody tr td:last a,span.next-container a.next,li a.sb_pagN,span.paginationNext a,";
var link6 = "div.pagenum a:contains(»),.pagination a.next_page";
//
var content1 = "div#main:has(div#cnt),div#container:has(div#masthead),div#cocoContainer,div#fitContainer,div#wrapper div#page,div.mesdiscussions,div#postlist,div.sni,div.mainContent,div#content:has(img[src*=randomc.net]),";
var content2 = "div#fr3-main-inner,div.indexpadding div#third,div.fill&div#content,div#container:has(img[src*=bp.blogspot.com]),div#postscolumn div#posts,div#top-level-wrapper,";
var content3 = "div#imgholder img#img,div#viewer a img#image,div#wrapper b div#content,div.column_content div.articles,div#wrapper div#content,div#Body div#Posts,";
var content4 = "div#container div#sideandwrap,div#wrap:has(div#col_middle),div#container div#content-column,div#contentwrap div#posts,div#manga div a img#p,";
var content5 = "div.ido:has(div#toppane),div#gdt:has(div.gdtm),div#main ul.object-grid,div#main ul[class=object-list tracks-list],#results_area #results_container,";
var content6 = "div#resultsNavBarColumn,#columns #left,#page&.hfeed,#resultsPane #resultsMainWrapper,#content:has(img[src*=yande.re]),#content:has(img[src*=konachan.com])";
//
var loadfox = false;
//
//
$(window).scroll(function() {
    if (loadfox == true){ if ($(window).scrollTop() + $(window).height() > $(document).height()-10) {
        
        $("#top_chapter_list option:selected").next().attr('selected', true);
    
        $('#top_chapter_list').change();loadfox = false;
    };};
});
//
//
$(document).ready(function() {
    
var int=self.setInterval(function(){
    if (((window.location.href == 'http://pitchfork.com/reviews/albums/')&&($('ul.object-grid').size() == 1))||((window.location.href == 'http://pitchfork.com/reviews/tracks/')&&($('ul[class=object-list tracks-list]').size() == 1)))  {
        location.href=location.href;};},2500);
    
});
//
//
var site = [
    {
        url:"^http*", 
        link:link1 + link2 + link3 + link4 + link5 + link6,
        content:content1 + content2 + content3  + content4 + content5 + content6
    }
 ];
 var i;
 var href = location.href;
 for (i=0;i<site.length;++i)
 {
    if (href.match(site[i].url))
    {
//        unsafeWindow.alert("test");
        main(site[i]);
        return;
    }
 }
 
function main(obj){
(function($) {
	var window = this, options = {},
		content, currentUrl, nextUrl,
		active = false,
		defaults = {
			autoLoad: true,
			page: 1,
            content:content1 + content2 + content3 + content4 + content5 + content6,
            link:link1 + link2 + link3 + link4 + link5 + link6,
			insertBefore: null, 
			appendTo: null, 
			start: function() {},
			load: function() {},
			disabled: false
		};
	$.autopager = function(_options) {
		var autopager = this.autopager;
		if (typeof _options === 'string' && $.isFunction(autopager[_options])) {
			var args = Array.prototype.slice.call(arguments, 1),
				value = autopager[_options].apply(autopager, args);
			return value === autopager || value === undefined ? this : value;
		}
		_options = $.extend({}, defaults, _options);
		autopager.option(_options);
		content = $(_options.content).filter(':last');
		if (content.length) {
			if (!_options.insertBefore && !_options.appendTo) {
				var insertBefore = content.next();
				if (insertBefore.length) {
					set('insertBefore', insertBefore);
				} else {
					set('appendTo', content.parent());
				}
			}
		}
		setUrl();
		return this;
	};
	$.extend($.autopager, {
		option: function(key, value) {
			var _options = key;
			if (typeof key === "string") {
				if (value === undefined) {
					return options[key];
				}
				_options = {};
				_options[key] = value;
			}
			$.each(_options, function(key, value) {
				set(key, value);
			});
			return this;
		},
		enable: function() {
			set('disabled', false);
			return this;
		},
		disable: function() {
			set('disabled', true);
			return this;
		},
		destroy: function() {
			this.autoLoad(false);
			options = {};
			content = currentUrl = nextUrl = undefined;
			return this;
		},
		autoLoad: function(value) {
			return this.option('autoLoad', value);
		},
		load: function() {
			if (active || !nextUrl || options.disabled) {
				return;
			}
			active = true;
			options.start(currentHash(), nextHash());
			$.get(nextUrl, insertContent);
			return this;
		}
	});
	function set(key, value) {
		switch (key) {
			case 'autoLoad':
				if (value && !options.autoLoad) {
					$(window).scroll(loadOnScroll);
				} else if (!value && options.autoLoad) {
					$(window).unbind('scroll', loadOnScroll);
				}
				break;
			case 'insertBefore':
				if (value) {
					options.appendTo = null;
				}
				break
			case 'appendTo':
				if (value) {
					options.insertBefore = null;
				}
				break
		}
		options[key] = value;
	}
	function setUrl(context) {
		currentUrl = nextUrl || window.location.href;
		nextUrl = $(options.link, context).attr('href');
	}
	function loadOnScroll() {
     
		if (content.offset().top + content.height() <= $(document).scrollTop() + $(window).height()*1.7) {
			$.autopager.load();
		}
	}
	function insertContent(res) {
		var _options = options,
			nextPage = $('<div/>').append(res.replace(/<script(.|\s)*?\/script>/g, "")),
			nextContent = nextPage.find(_options.content); 
		set('page', _options.page + 1);
		setUrl(nextPage);
		if (nextContent.length) {
			if (_options.insertBefore) {
				nextContent.insertBefore(_options.insertBefore);
			} else {
				nextContent.appendTo(_options.appendTo);
			}
			_options.load.call(nextContent.get(), currentHash(), nextHash());
			content = nextContent.filter(':last');
		}
             
//
//code to expand pictures on mangareader
//        
        if (window.location.href.indexOf('mangareader.net') >= 0)  {
            $('div#imgholder').css({'text-align' : 'center','width' : 'auto'});
            $('img#img').css({'width' : 'auto','height' : 'auto','border-width' : '5px','border-style' : 'solid','border-color' : 'black','display':'block','margin-left':'auto','margin-right':'auto'});
        }
//
//code to expand pictures on mangafox
//
        if (window.location.href.indexOf('mangafox.me') >= 0)  {
            if (nextContent.length == 0) { loadfox = true;$('body').append('<div style="height: 250px;"> </div>'); } else { loadfox = false; };
   
            $('div#viewer').css({'text-align' : 'center','width' : 'auto','background' : 'black','border' : 'none'});
            $('img#image').css({'width' : 'auto','height' : 'auto','border-width' : '5px','border-style' : 'solid','border-color' : 'black','display':'block','margin-left':'auto','margin-right':'auto'});
        }
//
//code to expand pictures on mangastream
//
        if (window.location.href.indexOf('mangastream.com') >= 0)  { 
            $('#pagewrapper *').css({'text-align' : 'center','width' : '100%'});
            $('img#p').css({'width' : 'auto','height' : 'auto','border-width' : '5px','border-style' : 'solid','border-color' : 'black','display':'block','margin-left':'auto','margin-right':'auto'});
            $('body').css({'background' : 'black'});
        }
//
//code to expand pictures on g.e-hentai
//
        if (window.location.href.indexOf('g.e-hentai.org') >= 0)  { 
            $('body:has(div.sni)').css({'background' : 'black'});$('div.sni').css({'background' : 'black'});
            $('body div.sni div').remove();$('body div.sni h1').remove();
            $('body div.sni').css({'border' : 'none'});$('iframe[src*=juicyads.com]').remove();
        }
//
//code to expand pictures on exhentai
//
        if (window.location.href.indexOf('exhentai.org') >= 0)  { 
            $('body:has(div.sni)').css({'background' : 'black'});$('div.sni').css({'background' : 'black'});
            $('div#i1 h1,div#i1 div#i2,div#i1 div#i4,div#i1 div#i5,div#i1 div#i6,div#i1 div#i7').remove();
            $('body div.sni').css({'border' : 'none'});$('iframe[src*=juicyads.com]').remove();
        }
//
//code to optimize pitchfork
//
        if (window.location.href.indexOf('pitchfork.com') >= 0)  { 
               
               $("div.lazy").each(function() {
                   
               		$(this).parent().append($(this).attr("data-content"));
               		$(this).remove();
                   
               });
            
            
          if ((window.location.href == 'http://pitchfork.com/reviews/albums/')&&($('ul.object-grid').size() > 1)) { 
            $(".object-grid a[href*='/reviews/albums/']").each(function(){
                if ($(this).find('#div_rating').length == 0) {
                
                	var myhref = $(this).attr('href');
                	var d1 = document.createElement('div');
                	d1.id = "div_rating";    
                
                	$(this).append(d1);
                	$(d1).load(myhref+' span.score');  
                };
             });
          };
       }
//
//code for yandere
//        
        if (window.location.href.indexOf('yande.re') >= 0)  {
            
            $('div.sidebar').remove();
            $('div.content').css({'width' : '100%'});$('div#content').css({'width' : '100%'});
            
            $('div.footer').each(function(){ if ($(this).find('#padding').length == 0) $(this).append('<div id=padding style="height: 50px;"> </div>'); });
            
            $('div.content div[align=center]').remove();
           
            $('span.directlink-info').remove(); $('span.plid').remove();
            
            $('#post-list-posts li').attr('style','width : 310px; visibility : visible !important; display : inline-block !important');
            $('span.directlink-res').css({'display' : 'block'});
            $('[class=directlink smallimg]').css({'background' : 'black'});
            
            $('div.inner').css({'width' : '300px','height' : '300px'});
            
            $('img.preview').css({'width' : 'auto', 'max-width': '300px','height' : 'auto', 'max-height': '300px'});
    }
//
//code for konachan
//        
         if (window.location.href.indexOf('konachan.com') >= 0)  {
             
            $('div.sidebar').remove();
            $('div.content').css({'width' : '100%'});$('div#content').css({'width' : '100%'});
            
            $('div.footer').each(function(){ if ($(this).find('#padding').length == 0) $(this).append('<div id=padding style="height: 50px;"> </div>'); });
            
             
            $('div.content div[align=center]').remove();
             
            $('span.directlink-info').remove(); $('span.plid').remove();
            
            $('#post-list-posts li').attr('style','width : 310px; visibility : visible !important; display : inline-block !important');
            $('span.directlink-res').css({'display' : 'block'});
            $('[class=directlink smallimg]').css({'background' : 'black'});
            
            $('div.inner').css({'width' : '300px','height' : '300px'});
            
            $('img.preview').css({'width' : 'auto', 'max-width': '300px','height' : 'auto', 'max-height': '300px','border' : 'none'});
         }
//
// 
		active = false;
//        
        if ($(window).height() >= $(document).height()) $.autopager.load();
	}
	function currentHash() {
		return {
			page: options.page,
			url: currentUrl
		};
	}
	function nextHash() {
		return {
			page: options.page + 1,
			url: nextUrl
		};
	}
})(jQuery);
$.ajaxSetup({
   beforeSend:function(xhr){
    xhr.overrideMimeType("text/html; charset=" + document.characterSet)
   }
});
$.autopager(obj);
$.autopager.load();
}