// ==UserScript==
// @name           Woot Deals Clean-Up
// @namespace      http://jobson.us
// @description    Cleans up deals.woot.com
// @include        http://deals.woot.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var w = {
	page: 1,
	init: function() {
		if (!document.title) return;
		// Add styles
		w.addStyles();
		
		// Setup loader gif.
		w.setupLoaderGif();
		
		// Clears expired deals from the hero.
		w.clearHeroExpired();
		
		// Clean Community Area
		w.cleanCommArea();
		
		// Clears expired deals from Community Area
		w.clearCommExpired();
		
		// AJAX Load More Deals, rather than pagaination
		w.setupPagination();
		
		// Sets tags to remove from deals list.
		w.updateBlacklist();
		w.wordBlacklist();
		
		// Open In Tab - opens each deal in new tab.
		w.openInTab();
		
		// Scrolling monitor
		w.scrollEventTracker();
	},
	addStyles: function() {
		GM_addStyle("div.forumList { border-bottom: 1px dashed silver; }");
		GM_addStyle("ul#blacklist { background-color: white; }");
		GM_addStyle("li.bl { padding: 5px !important; }");
		GM_addStyle("input#addTag { width: 100px; }");
		GM_addStyle("div#nolist { color: #777777; }");
		GM_addStyle("li#blWordlist br { line-height: 1.3em; }");
		GM_addStyle("span.blDel { color: #8E2323; cursor: pointer; font-size: 1.25em; }");
		GM_addStyle("span.red { color: #8E2323; font-size: 1.25em; }");
		GM_addStyle("div#blGuide { padding-bottom: 5px; border-bottom: 1px dashed silver; }");
		GM_addStyle("div#wLoader { width: 16px; height: 16px; background-color: none; top: 0; left: 0; position: absolute; text-align: center; padding-top: 15px; }");
		GM_addStyle("div#searchContainer { width: 300px; background-color: #333333; }");
	},
	setupLoaderGif: function() {
		var gifData = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';
		$('a.next').parent().append($('<div id="wLoader"><img src="'+ gifData +'" /></div>'));
		$('#wLoader').hide();
	},
	clearHeroExpired: function() {
		$('div#rotatorContainer div.sponsoredDeals div.sponsoredDeal span.expired').each(function() {
			$(this).parent().remove();
		});
	},
	clearCommExpired: function() {
		$('div#deals').find('span.expired').each(function() {
			$(this).parent().remove();
		});
	},
	cleanCommArea: function() {
		$('div#deals div.stripe').each(function() {
			$(this).removeClass('stripe');
		});
	},
	setupPagination: function() {
		$('a.first').remove();
		$('a.last').remove();
		$('a.previous').remove();
		$('a.next').attr('href','').bind('click',function(ev) {
			ev.preventDefault();
			
			
			$('#wLoader').show();
			$('#wLoader').css({
				top: ($(this).position().top)+'px',
				left: ($(this).position().left)+'px',
				height: '30px',
				width: '35px'
			});
			
			var purl = (/http:\/\/deals.woot.com\/sellout.*/.test(window.location.href) ? 'http://deals.woot.com/' : window.location.href.replace(/\?.*/,'')) + '?page='+ ++w.page;


			GM_xmlhttpRequest({
				method: "GET",
				url: purl,
				onload: function(response) {
					$(response.responseText.replace(/[\r\n\t]/g,'').match(/<body>.+<\/body>/)[0]).find('div.forumList').each(function() {
						if ($(this).find('span.expired').length>0) return;
						if ($(this).find('input#deal_Title').length === 1) return;

						$(this).removeClass('stripe');
						$('div#deals').append(this);
						
						w.clearBlacklistedTags();
						$('#wLoader').hide();
					});
				}
			});

		});
	},
	blacklist: [],
	updateBlacklist: function() {
		if (!GM_getValue('blacklist')) return;
		w.blacklist = GM_getValue('blacklist').split('|--|');
	},
	clearBlacklistedTags: function() {
		$('a.category,div.postInfo p a[target="_blank"]').each(function() {
			var tag = $(this).html();
			var rem = 0;
			for (var i=0;i<w.blacklist.length;i++) {
				rem = 0;
				if (/^\/.+\/$/.test(w.blacklist[i])) {
					// Regex
					var x = new RegExp(w.blacklist[i].substr(1,w.blacklist[i].length-2),'i');
					if (x.test(tag)) rem = 1;
				} else {
					// String
					if (tag == w.blacklist[i]) rem = 1;
				}
				if (rem==1) $(this).parents('div.forumList').remove();
			}
		});
	},
	wordBlacklist: function() {
		$('span.blDel').live('click',function() {
			w.modifyBlacklist({
				method: 'del',
				value: $(this).parent().find('span.str').html()
			});
			$(this).parent().next().remove();
			$(this).parent().remove();
		});

		var bl=['<div id="searchContainer">',
				'<div class="searchBar clearfix" style="border: medium none;">',
				'	<div class="jquery-corner" style="margin: 0px 0px -5px;">',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 2px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 1px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'	</div>',
				'	<div class="searchHead">',
				'		<h2><a href="http://userscripts.org/scripts/show/91656">Tag Blacklist</a></h2>',
				'	</div>',
				'	<div class="jquery-corner" style="position: absolute; margin: 0pt; padding: 0pt; left: 0pt; bottom: 0pt; width: 100%;">',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 1px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 2px;"></div>',
				'	</div>',
				'</div>',
				'<div class="dealArrow"></div>',
				'<div class="dealList clearfix" style="border: medium none; position: relative;">',
				'	<div class="jquery-corner" style="margin: -10px -10px 5px;">',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none none none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px 0pt 2px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none none none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px 0pt 1px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none none none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none none none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none none none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'	</div>',
				'	<ul id="blacklist">',
				'		<li class="bl"><div id="blGuide">',
				'			Enter a tag to hide items you don\'t wish to see.<br/>',
				'			Standard regular expressions are supported, enter /.+/ to match all items, don\'t use flags like i and g.<br/>',
				'			Click the <span class="red">\u2297</span> icon to delete a tag, you must refresh the page to make them reappear.',
				'			</div></li>',
				'		<li class="bl" id="blWordlist"></li>',
				'		<li class="bl">Blacklist Tag: <input type="text" id="addTag" /> <input id="addToBlacklist" type="submit" value="add" class="searchSubmit"></li>',
				'	</ul>',
				'	<div class="jquery-corner" style="position: absolute; margin: 0pt; padding: 0pt; left: 0pt; bottom: 0pt; width: 100%;">',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 0px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 1px;"></div>',
				'		<div style="overflow: hidden; height: 1px; background-color: transparent; border-style: none solid; border-color: rgb(51, 51, 51); border-width: 0pt 2px;"></div>',
				'	</div>',
				'</div>',
				'</div>'];
		bl = bl.join('');
		$(bl).prependTo($('div.sidebar'));
				
		w.updateBlacklistItems();
		
		$('input#addTag').bind('keyup', function(ev) {
			if (ev.keyCode != 13) return;
			if (!$('input#addTag').val()) return;
			w.modifyBlacklist({
				method: 'add',
				value: $('input#addTag').val()
			});
		});
		
		$('input#addToBlacklist').bind('click',function() {
			if (!$('input#addTag').val()) return;
			w.modifyBlacklist({
				method: 'add',
				value: $('input#addTag').val()
			});
		});
	},
	updateBlacklistItems: function() {
		$('input#addTag').val('');
		$('li#blWordlist').empty();
		if (w.blacklist.length>0) {
			$.each(w.blacklist,function() {
				$('li#blWordlist').append('<span><span class="blDel">\u2297</span> <span class="str">'+ this.toString() + '</span></span><br/>');
			});
		} else {
			$('li#blWordlist').append('<div id="nolist">[No Entries]</div>');
		}
		w.clearBlacklistedTags();
	},
	modifyBlacklist: function(h) {
		switch (h.method) {
			case 'add':
				w.blacklist.push(h.value);
				break;
			case 'del':
				w.blacklist = w.blacklist.remove(h.value);
				break;
			default: break;
		}
		w.blacklist = w.blacklist.sort().unique();
		GM_setValue('blacklist',w.blacklist.join('|--|'));
		w.updateBlacklistItems();
	},
	openInTab: function() {
		$('div.postInfo h3 a').live('click',function(ev) {
				ev.preventDefault();
				var url = 'http://deals.woot.com'+ $(this).attr('href');
				GM_openInTab(url);
		});
	},
	scrollEventTracker: function() {
		$(window).bind('scroll',function(ev) {
			w.searchBoxPos = (w.searchBoxPos) ? w.searchBoxPos : $('div#searchContainer').offset().top;
			var pagePos      = ev.currentTarget.pageYOffset;
			
			if (w.searchBoxPos < pagePos-100) {
				$('#searchContainer').css({
					position: 'fixed',
					bottom: '30px',
					zIndex: 9999
				});
			}
			
		});
	}
};

Array.prototype.remove = function(val) {
	var vals = this;
	var out = [];
	for (var i=0;i<vals.length;i++) {
		if (vals[i] === val) continue;
		out.push(vals[i]);
	}
	return out;
}

Array.prototype.unique = function() {
	var vals = this;
	var uniques = [];
	for(var i=vals.length;i--;){
		var val = vals[i];  
		if($.inArray( val, uniques )===-1){
			uniques.unshift(val);
		}
	}
	return uniques;
}

w.init();
