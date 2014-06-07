// ==UserScript==
// @name           Better iGoogle
// @description    Take control of your iGoogle page! This extension GREATLY improves the RSS feeds on your iGoogle page, making them look better, giving summaries on hover, and allowing you to mark feeds as "read" so they don't show up if there are no new items. It also adds many more options, letting you take full control over your iGoogle experience!
// @namespace      http://userscripts.org/users/86416
// @include        http://www.google.tld/ig*
// @unwrap
// ==/UserScript==

var _IG_FetchFeedAsJSON = unsafeWindow._IG_FetchFeedAsJSON;
var isExtension = (typeof isExtension!="undefined" && !!isExtension);

function _gel(id) {
	return document.getElementById(id);
}

// I love this little function of mine
// Had to not extend String.prototype in order to make this an add-on
var template = function(s) {
	for (var i=1; i<arguments.length; i++) {
		var arg = arguments[i];
		if ("object"==typeof arg) {
			for (var key in arg) {
				var val = arg[key];
				if (typeof val=='undefined') {val = '';}
				s = s.replace( new RegExp("%"+key+"%","g"),val);
			}
		}
		else {
			s = s.replace( new RegExp("%"+(i+1)+"%","g"),arg);
		}
	}
	return s;
}

// ==================================================================
// A Generic RSS object for Gadgets
// ==================================================================
function rss( url, opts, init ) {
	this.url = url;
	this.loaded = false;
	this.last_seen = null;
	this.new_last_seen = null;
	this.feed_id = null;
	this.timeout = null;
	this.title = '';
	this.filters = [];
	this.replacers = [];
	this.subject_list = [];
	this.subject_items = {};
	this.item_list = [];
	this.container = null;
	this.post_process = null;
	this.count = 0;
	this.favicon_url = null;
	this.threaded = false;
	// Set defaults passed in
	if (opts) {
		for (var i in opts) {
			this[i] = opts[i];
		}
	}
	if (init) { this.init(); }
}
// Needlessly put into an anonymous function so my editor can collapse it
(function() {
	rss.prototype.bullet = 'favicon';
	rss.prototype.rewrite_google = true;
	rss.prototype.item_format = '<a href="%url%" class="item %classname%" target="_blank">%bullet% %title%</a><br>';
	rss.prototype.thread_format = '<div class="thread %alt% %classname%"><div class="title">%title% (%count%)</div>%list%</div>';
	rss.prototype.num = 10;
	rss.prototype.refresh_interval = 30; // In minutes
	rss.prototype.avoid_caching = true;
	rss.prototype.feed_fetcher = _IG_FetchFeedAsJSON;
	rss.prototype.retry_delay = 2; // seconds
	rss.prototype.max_retries = 10;
	rss.prototype.retry_count = 0;
	rss.prototype.day_names = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	rss.prototype.response_prefixes = [ /^\s*re\s*:\s*/i ];
	rss.prototype.before_load = function(url) {
		this.msg("Refreshing...");
	}
	rss.prototype.init = function() {
		this.load();
	}
	rss.prototype.load = function() {
		var self = this;
		var url = this.url;
		if (this.avoid_caching) {
			url += (url.indexOf("?")>-1)?"&":"?";
			url += "random="+new Date().getTime();
		}
		this.before_load(url);
		this.feed_fetcher(url,function(){ 
			if (self.process.apply(self,arguments)) {
				self.render(); 
				if (self.timeout) { clearTimeout(self.timeout); }
				self.timeout = setTimeout(function(){self.load()},self.refresh_interval*60*1000);
				}
			else {
				self.process_error();
			}
		},this.num,true);
	};
	rss.prototype.refresh = function() {
		clearTimeout(this.timeout);
		this.load();
	}
	rss.prototype.clear = function() {
		this.last_seen = this.new_last_seen;
		this.refresh();
	}
	rss.prototype.retry = function(msg) {
		var self = this;
		if (++this.retry_count >= this.max_retries) {
			this.max_retries_reached();
		}
		else {
			if (msg && !this.loaded) {this.msg(msg);}
			if (this.timeout) { clearTimeout(this.timeout); }
			this.timeout = setTimeout(function(){self.load()},this.retry_delay*1000);
		}
	};
	rss.prototype.msg = function(msg) {
		this.output(msg);
	};
	rss.prototype.template = function(tpl,item) { return template(""+tpl,item); } ;
	rss.prototype.output = function(str) {
		if (typeof this.container=='string') { this.container = document.getElementById(this.container); }
		if (this.container) { this.container.innerHTML = str; }
	}
	rss.prototype.process = function(obj) {
		if (obj && obj.ErrorMsg && obj.ErrorMsg != "") { this.retry(obj.ErrorMsg);return false; }
		else if (!obj || !obj.Entry || obj.Entry.length == 0) { 
			var s = "";
			for (var i in obj) { s += i+"="+obj[i]+"<br>"; }
			this.retry('Retrying...(try enabling caching for this feed in options)<br><div style="display:none;">'+s+'</div>'); 
			this.avoid_caching = false;
			return false; 
		}
		this.retry_count = 0;
		this.subject_items = {};
		this.subject_list = [];
		if (obj.Title) {
			this.feedTitle = obj.Title;
			if (!this.title) {
				this.title = obj.Title; 
			}
		}
		if (obj.Entry) {
			var count = 0;
			var hide = false;
			var old_last_seen = this.last_seen;
			this.new_last_seen = obj.Entry[0].Link;
			
			for (var i = 0; i < obj.Entry.length; i++) {
			if (!hide && old_last_seen && obj.Entry[i].Link==old_last_seen) {
					hide = true;
				}
				if (!hide) {
					var entry = obj.Entry[i];
					var item = { 
						'index':i, 
						'url':entry.Link, 
						'title':entry.Title, 
						'summary':entry.Summary, 
						'date':entry.Date,
						'classname':'%alt% ',
						'author':entry.Author
					};

					// Re-write google url's to go directory to the news story url?
					if (this.rewrite_google && item.url.search(/news\.google\.com.*\&url=([^\&]+)/)>=0) {
						item.url = unescape(RegExp.$1);
					}

					// Apply all the search/replace options on the title
					for (var j=0; j<this.replacers.length; j++) {
						var re = this.replacers[j].split("/");
						if (re && re.length==4) { 
							item.title = item.title.replace(new RegExp(re[1],re[3]),re[2]);
						}
					}

					// Remove the re: in front of replies so grouping will work correctly
					item.subject = item.title;
					for (var j=0; j<this.response_prefixes.length; j++) {
						var re = this.response_prefixes[j];
						while (re.test(item.subject)) {
							item.subject = item.subject.replace(re,"");
						}
					}
					
					// Check filters to see if this item should be kicked out
					var filtered = false;
					for (var j=0; j<this.filters.length; j++) {
						var filter = this.filters[j];
						if ('string'==typeof filter) {
							var re = filter.split("/");
							if (re && re.length==3) { 
								filter = this.filters[j] = new RegExp(re[1],re[2]);
							}
							else {
								filter = this.filters[j] = new RegExp(filter);
							}
						}
						if ( ('function'==typeof filter && filter(item)) || (filter.test && filter.test(item.title)) ) {
							filtered = true; break;
						}
					}
					if (filtered) { continue; }

					// Group by subjects
					if (!this.subject_items[item.subject]) {
						this.subject_items[item.subject] = [];
						this.subject_list.push(item.subject);
					}
					
					// Keep track of new items
					if (!this.item_list[this.url || this.title]) {
						this.item_list[this.url || this.title] = true;
						if (this.loaded) {
							item.classname += ' newitem';
						}
					}

					item.url = _hesc(item.url);
					item.title = _hesc(item.title);
					item.feed_id = this.feed_id;
					item.bullet = this.bullet;
					if (item.bullet=="arrow") { item.bullet="&#187;&nbsp;" }
					else if (item.bullet=="bullet") { item.bullet="&#8226;&nbsp;" }
					else if (item.bullet=="favicon") {
						var ico_url = '';
						if (this.favicon_url!=null) {
							ico_url = this.favicon_url;
						}
						else if (item.url.search(/^(https?:\/\/[^\/]+)/)>=0) {
							ico_url = RegExp.$1+'/favicon.ico';
						}
						item.bullet = (ico_url)?'<img width="16" height="16" src="'+ico_url+'" border="0" class="favicon" align="absmiddle" onerror="this.style.visibility=\'hidden\'">':'';
					}

					if (item.date) {
						var d = new Date(item.date*1000);
						item.N = this.day_names[d.getDay()];
						item.D = d.getDate();
						item.M = d.getMonth()+1;
						item.Y = d.getFullYear();
						item.h = d.getHours();
						item.m = d.getMinutes();
						item.s = d.getSeconds();
					}
					
					// Finally allow an app-specific "post-process" function to do whatever it wants to the item
					if (typeof this.post_process=='function') {
						this.post_process(item);
					}
					var title = this.template(this.item_format,item);
					this.subject_items[item.subject].push(title);
				}
			}
		}
		else {
			return false;
		}
		this.loaded = true;
		return true;
	}
	rss.prototype.render = function() {
		var str = '';
		var count = 0;
		var alt_counter = 0;
		// Loop through each subject and display items within the list
		for (var i=0; i<this.subject_list.length; i++) {
			var s = this.subject_list[i];
			var items = this.subject_items[s];
			if (items.length==1 || !this.threaded) {
				for (var j=0; j<items.length; j++) {
					var alt = (alt_counter%2==1)?'alt':'';
					str += this.template( items[j] , {'alt':alt} );
					count++;
					alt_counter++;
				}
			}
			else {
				// Apply the alt class to each item in the thread
				for (var j=0; j<items.length; j++) {
					items[j] = items[j].replace('%alt%', (j%2==1)?'alt':'' );
					count++;
				}
				// Output the subject heading and all the items
				str += this.template( this.thread_format , {'alt':(alt_counter%2==1)?'alt':'','count':items.length,'title':s,'list':items.join(''),'classname':'' } );
				alt_counter++;
			}
		}
		this.count = count;
		this.output(str);
		this.post_render();
	}
	rss.prototype.max_retries_reached = function() {
		this.msg("Max number of retries ("+this.max_retries+") reached. Stopped trying.");
	}
	rss.prototype.post_process = null;
	rss.prototype.post_render = function() { };
	rss.prototype.process_error = function() { };
})();

// ==================================================================
// Customize the RSS Object for this application
// ==================================================================
var hide_empty_feeds = getValue('rss_hide_empty',true);

var feedLoaded = false; // This is a hack to make sure feeds load correctly, else a retry is triggered

(function(){
	rss.prototype.clear = function() {
		this.last_seen = this.new_last_seen;
		setValue("last_seen:"+this.url,this.new_last_seen);
		if (hide_empty_feeds) {
			// Hide it - it will show again if there are new items
			var o = _gel('m_'+this.id);
			if (o) { o.style.display = 'none'; }
		}
		this.refresh();
	}
	rss.prototype.init = function() {
		if (hide_empty_feeds) {
			// Initially hide the feed so the screen is cleaner and only shows new items
			var o = _gel('m_'+this.id);
			if (o) { o.style.display = 'none'; }
		}
		this.load();
	}

	rss.prototype.refresh_interval = getValue('default_rss_refresh_interval',null) || 15; // In minutes

	rss.prototype.num = getValue('default_rss_num_items',null) || 10;

	rss.prototype.post_render = function() {
		// First update the title
		_gel('m_'+this.id+'_title').innerHTML = this.title || this.feedTitle || this.url;

		if (hide_empty_feeds) {
			// If there are no items, hide the whole box
			if (this.count==0) {
				_gel('m_'+this.id).style.display = 'none';
			}
			else {
				_gel('m_'+this.id).style.display = '';
			}
		}
		feedLoaded = true; // hack
	}
	rss.prototype.addControls = function() {
		var after = _gel('DD_tg_'+this.id);
		if (after && after.parentNode && after.parentNode.insertBefore && after.nextSibling) {
		
			// Clear button
			var cb = w.document.createElement("A");
			cb.href = "#";
			cb.src = "";
			cb.title="Click to mark all items as read and clear the list";
			cb.innerHTML = "<img src=\"data:image/gif,GIF89a!%00%0C%00%C4%10%00%A7%C4%E4%DF%EA%F5%8F%B4%DC%D7%E4%F3%9F%BF%E1%CF%DF%F0%B7%CF%E9%EF%F4%FA%AF%CA%E6%97%BA%DF%F7%FA%FD%C7%DA%EE%E7%EF%F8%BF%D4%EB%87%AF%DA%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%10%00%2C%00%00%00%00!%00%0C%00%00%05%99%20%E4%8Cdi%9E()%3El%CB2N%E3%CE%F4%3C%D6%0F%2C%E3%3C%7B%3F%07%C0H%A6%CB%11%1C%89%01k1%12%14%1E%0D%87p%F1%F8%25%12%0A%E6B%A7H%10%1E%00%81%02%16x%24%04%D0%D8CQu%3C%02%0E%83KWpP%07v%60C%E8PD%95%3Enx%3B%2F1L%25%0Dp%00%05G~%0Ee%81oqs1uT-%06%8FfhQ%0C-%3F%04X%83%5C%02_%99%0CZp%9C%0E%9E%91%40%7C%089j%03%09%0ENkG%09B%0C%9D%9Fn%3D%C0%3C%0E%22)%C5%C6*!%00%3B\">";
			cb.onclick = Function("unsafeWindow.rssFeeds["+this.id+"].clear();return false;");
			cb.className = "customRssButton clearButton";

			// Refresh Button
			var rb = w.document.createElement("A");
			rb.href = "#";
			rb.src = "";
			rb.title="Click to refresh now";
			rb.innerHTML = "<img src=\"data:image/gif,GIF89a-%00%0C%00%C4%10%00%AF%CA%E6%A7%C4%E4%C7%DA%EE%97%BA%DF%EF%F4%FA%BF%D4%EB%E7%EF%F8%B7%CF%E9%CF%DF%F0%DF%EA%F5%D7%E4%F3%8F%B4%DC%F7%FA%FD%9F%BF%E1%87%AF%DA%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%10%00%2C%00%00%00%00-%00%0C%00%00%05%BE%20%E4%8Cdi%9Eh%8A%8AO%EB%BE.2%1Epm7%0E%03%8Fv%8D%EB%BD%E0%E3%B7s%3C%14%8E%80%03%F0(%8C%98%00%92%C1%D1X%0C%1E%88E%92%F0%20%E0%92-%5C%D4%81h%F1%90%8D%AE%80%9Cp%14%869%86c%C1%20%B4%0F%8CA%3A%B08%3A%04p%80%03%7D%0Fgn-%83a%7D%3Fri%0F%07%0E%09M%0E%06J%0D%05%5Cp%06p%3A%86%80%0FZ%25%0C%8C%60%0Fc%24%0A%06%A1%7F%9C%AD%9E%88%84.%A4L%8F%945%0AN%8B9%AEFH%9FN%08%04%0BL%B3-H4%0DW%03%03%0C%0C%0B%01%ADD%AF-c%01%3A%C5-kT%9B%04J%5B%D1%BB%3CB%E3%E4A%0E%22*%E9%EA%EB%10!%00%3B\">";
			rb.onclick = Function("unsafeWindow.rssFeeds["+this.id+"].refresh();return false;");
			rb.className = "customRssButton refreshButton";
			
			after.parentNode.insertBefore(cb,after.nextSibling);
			after.parentNode.insertBefore(rb,after.nextSibling);
		}
	}
	
	rss.prototype.item_format = getValue('default_rss_item_template',null) || (<><![CDATA[<div class="item" onmouseover="item_hover_over(this,arguments[0]);" onmousemove="item_reposition(this,arguments[0])" onmouseout="item_hover_out(this)"><a href="%url%" class="%classname%" target="_blank">%bullet%%title%</a><div class="bi_summary" style="display:none;"><b><u>%title%</u></b><br>%summary%</div></div>]]></>).toString();

})();

// Util functions for hovering
unsafeWindow.item_hover_timeout = null;
unsafeWindow.mouse_wheel_scrolls_summary = false;
var summaryDelay = getValue("summary_delay",500) || 500;
var summaryOffsetX = getValue("summary_offset_x",15) || 15;
var summaryVerticalGutter = 50;

unsafeWindow.item_hover_over = function(div,e) {
	var x = e.pageX;
	var y = e.pageY;
	
	var newTimeout = setTimeout( function() { unsafeWindow.item_hover_timeout=null; unsafeWindow.item_hover_display(div,x,y); }, summaryDelay );
	if (unsafeWindow.item_hover_timeout!=null && unsafeWindow.item_hover_timeout!=newTimeout) {
		clearTimeout(unsafeWindow.item_hover_timeout);
	}
	unsafeWindow.item_hover_timeout = newTimeout;
}
unsafeWindow.item_hover_display = function(div,x,y) {
	var ns = div.childNodes[1];
	
	ns.style.visibility = "hidden";
	ns.style.display = 'block';

	// width
	var maxw = document.body.clientWidth - 20;
	if (x+ns.offsetWidth+summaryOffsetX > maxw) {
		x = x-ns.offsetWidth - summaryOffsetX;
	}
	else {
		x = x + summaryOffsetX;
	}
	ns.style.left=x+'px';

	// height
	var innerH = window.innerHeight;
	var scroll = document.documentElement.scrollTop;

	var maxh = (innerH-(summaryVerticalGutter*2));
	ns.style.maxHeight = maxh + "px";
	
	if (ns.scrollHeight >= maxh) {
		unsafeWindow.mouse_wheel_scrolls_summary = true;
	}
	
	var half = (ns.offsetHeight/2);
	
	var maxy = scroll + innerH - summaryVerticalGutter;
	var miny = scroll+summaryVerticalGutter;
	
	if ( (y+half) > maxy) {
		y = maxy-half;
	}
	else if ( (y-half) < miny) {
		y = miny+half;
	}
	ns.style.top= (y-half) + "px";
	
	ns.style.visibility = "";
}
unsafeWindow.item_reposition = function(div,e) {
	if (unsafeWindow.item_hover_timeout==null) {
		var x = e.pageX;
		var y = e.pageY;
		unsafeWindow.item_hover_display(div,x,y);
	}
	else {
		unsafeWindow.item_hover_over(div,e);
	}
}
unsafeWindow.item_hover_out = function(div) {
	if (unsafeWindow.item_hover_timeout!=null) {
		clearTimeout(unsafeWindow.item_hover_timeout);
	}
	unsafeWindow.item_hover_timeout = null;
	div.childNodes[1].style.display='none';
	unsafeWindow.mouse_wheel_scrolls_summary = false;
}


// ==================================================================
// "Reusable" Options interface
// ==================================================================
function GM_options(key) {
	this.optionsDiv = null;
	this.options = [];
	this.key = key;
	this.addOption = function(opt) {
		this.options.push( opt );
	};
	this.addHtml = function(html) {
		this.options.push( {'type':'html', 'value':html } );
	};
	this.renderOption = function(opt) {
		opt.value = getValue(opt.name,opt['default']);
		opt.onchange = opt.onchange || "";
		var input = '';
		// CHECKBOX Option
		if (opt.type=="checkbox") {
			opt.checked = (opt.value?"checked":"");
			input = template('<input type="checkbox" name="%name%" onclick="%onchange%" %checked%>',opt);
		}
		// TEXTAREA option
		else if (opt.type=='textarea') {
			input = template('<textarea name="%name%" nowrap class="textarea" onchange="%onchange%" rows="%rows%" cols="%cols%">%value%</textarea>',opt);
		}
		// INPUT option
		else {
			input = template('<input name="%name%" class="text" onchange="%onchange%" value="%value%" size="%size%">',opt);
		}
		return input;
	};
	this.render = function() {
		var content = "";
		var self = this;
		this.options.forEach(function(opt,i) {
			if (opt.type=='html') {
				content += '<tr><td colspan="2" class="html">'+opt.value+'</td></tr>';
			}
			else {
				var input = self.renderOption(opt);
				content += '<tr><td class="label">' + opt.description + '</td><td class="input">' + input + '</td></tr>';
			}
		});
		return content;
	};
	this.displayOptions = function() {
		var doc = document.wrappedJSObject;
	
		var optionsContent = this.render();
		var optionsWrapper = template( (<><![CDATA[
			<form name="%key%">
				<div class="GM_options_header">
					<div class="GM_options_buttons">
						<input type="button" name="GM_options_save" value="Save">
						<input type="button" name="GM_options_cancel" value="Cancel">
					</div>
					<img src="http://s3.amazonaws.com/uso_ss/icon/56039/thumb.gif?1253817613" width="120" height="90" align="left" style="margin-right:20px;">
					<a href="http://userscripts.org/scripts/show/56039" target="_blank">Script Home</a> | 
					<a href="http://userscripts.org/scripts/reviews/56039" target="_blank">Review This Script</a> | 
					<a href="http://userscripts.org/scripts/discuss/56039" target="_blank">Problems? Suggestions? Discuss!</a> |
					<a href="mailto:gadgets@mattkruse.com">Email me feedback!</a>
					<br>
					<a href="http://www.facebook.com/pages/Better-iGoogle/165423455378" target="_blank"><img border="0" src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%BD%00%00%00%19%08%02%00%00%00%EB8%B8%9F%00%00%05%BBIDATx%DA%ED%5B%5DL%1CU%14%FE%AE%F2%E8%03%2F%05j%C4%B6%C6%1AM%D8%D6%98%DD5%D5%F0R%B6%2C%B4%E9%13%D0%A6%96XZjj%B6%5B%81%0Eu!VJ%B5%B1n%BA%DBe%5B%C4%D0%D2%40%7F%C4d%81%87j%D3%A5%2C%F4%C1%1A%25Lc%16L%D4%F4%C1%96%18%97%C5%A4%C6'1%26%CE%F1%E1%EE%CE%FEpg%3A%A0%A65%DC%93%7D%98%B9s~%BE%7B%E6%9Bs%EE%9D%01%B6%B0%B0%00)R%96(%05%00%C2%E1%B0L%84%14%EB%D2%D4%D4T%C0%8F%7C%3E%9FL%87%14%2B%E2%F7%FBS%F5%06%C0%EF%B2%5BIYj%9F%02%00%8D%ACh%BF%E3y%0D%60%0C8%D1%F3%89%CC%9D%E4%0D%08%F9%BC%F9%EE%CDM%60%60%00%11%C0%00%02%18v%A7%94%05%FARV%24o%16%D1%E0%85%8F%BF%FE%C1%B3%E9%D9%AD%EB%18c%05%AB_%FA%EB%B7%7B%B4%F0%EB%1F%B3%F7%EFW%1E%EF%0B%9D%7DO%D2F%F2FL%1C%E0%F9%8F%BE%FA%DE%F3%CA%FAm%EB%F4%9AD%00%98%5E%85%A4%ACx%DEh%D0%84%97%19%03ci%92%10%18%03%88%88%0C%F5%A5%3CLI%5Eo%DB%15%98r%B6%0E%FA%B7%96%FC%C7%E6z%9F%12%D4%8F%3B%DE%F2%E7%B6%3DC%20%C68%87%18%C0%AED%C6%FF%7C%E2%C96_%1B%D7)%2C%2C%F4%B5%89%F6%F0%D3%BD%15-%91%CC%A9%B3%F5%93%0F%ABK%1E%D9%8C%3F%2C%B4%FFn%5C%D2%9B%C7%B2%DA%C1R%CC%0B%F2l2%A49T%0E%E0%CE%B5%1F%19%03%E1n%FB%E3M%FA%FAx%A2%BFQW%3Bx%F0%A0x%89%CC%07w%9C%9E8%B0q%BA%B7%E2p%24p5%5E%7D%60%E3%A3%CA%9B%2C%B4F%09%F9%1F%C4%25%FC%23'K17%AC7%EB%CF%7C%91s%DE2%D2%E9%DD%0C%B0%CE%EE%F1%9CXd%C0N%D2%AF%CF%FD%7C%17%80%A3%B4%88%88%80%E9s.%25%FD%849%94%2B'%ABK%20%18D%B4%BD%3E%A8%E6h%25%A3%ED%F5A%D5%E1p%A8%AA%0A%00%3B%82A(%DC%CA%D8O%E6%D9Mfy%5Ct1%0B-%99%E9s%FF%3A%86%7C%2F9F%96L%2C%C6%15Nm%F1%08%F72%15%D8%5D%11%C86%16%A0%12%0Ers%22%22%8A%9Fs)%11%8C%8F%8F%1B%F1%E6%B14p%CD%E8W%D32R%DB2%A2%D70%06V%B1%F7%82k%EF%85%2C%EA%08%0D%09%00%22%8A%CBU%1FT%81%BA%9DU%C5%1A%CD%5DoW%22%0E%E5R%2C6%16%0B%D4A%0D%86%A3%09%8A%F7%BA%94%08%1C%87%2F%C7%C6b%B1K%CAZ%A2xo%7DPE%5D%20%16%1B%0B%D4A%0D%D6%F7%C6%D3%0E%D5%B5%3Bcc%97%15%07%10Q%26%9D%5C%01j%F0j%DC%C0%B9%8E%A7%D8%FDAl%2C%C6C8%A0%06%C3%D19!Z%97%CB%E5j%8F%26%0C%F4y%1A%CA%DF%CA%8E%AB%3B1%81mdb1%EE%E2%14%89'K%00%B8%DA%E5%94qB%8C%CA%0C*Q%BCW%89%00u%01%E1%9D%CD%5D%17%9B%BE%F7%3B%E6%DDL%00oS%C7%BC%9B%01%1C%EF%BE%99%5E83%B1-%07Q%7B%EA%C6%1B%1B0s%DE%7D%A4u%0B%9D%BAXzK%05%10%7C%7DK0%A5%A5%CE%CE%C7g%87%00%D4%EEp%17i%A4%A1%B8r%BF%7B%E6%BC%1B%40%AD%D3%A6ids%D6bhxhrz%FFv%9E%94%A7Vi%A4i%E9%C3%F4d%89(%F1%8D%C0%B9%A6%15g%8A%C1%E8%D1%3D!%FDI%86%96%F6%93%8F6%7DU%A0%CF%D5%D6%AC.%D2(%99%8E%AB%3B%99%99%1C%12%C0~%D9%CC%C4b%DC%F8d~%8A%92%A3G%05%93%DD%90%BA%F1%9AF%25%25k%005%93%DE%5CTN%0C%19f%18%B7%CE%B4%AAp%B4%5C%DCo3aE%81%85%96F%00%18%18%18%88%C0%F2%E9Af%EB%1B~PT%EA%00%D4%7B%89_J%01%C0%D1r%F1%84%3BS%AAg%FA2%2F%13%F3%3D%18%0D%1A%B7%E4%3C%E7%FAx%F2%C6%D1%3D!%95_%9D%E9s%1F%196%E8%E8%CB%D07%87mnb1%AEA%AC%FC%C9%CE'%1E%907%2B%83*%60%07%D4P%F7%E8%8B9%CE%C5%7D%0A%9A%D1%8F%81%1D%EF%BE%D9%D9%3D%01%02%03%3A%BB'%F4b%C3%A5%E3XG%F0tp%91!%87%A3%11%B4d%FC%96%0A%D8%CB7%DAV%3F%0D%40%0D%7D6%9D%A5is%D6%00%18%8ED%93%D0%08s%A3%7D%D1%22%3E2%15'h%D3S%C3%00j%9De%A9%B7G%20%40%E3s%25%10e%BE%8Fh%C5%22%E7%FAo%FE'5m2%97%B8%97%F2%23Dk%AA%9F%AD%86%3C%13%9B%01l%13%13%8Bq%17%A7%08%E2%C9fR%A4%03%10%A2%B2%99d%D8%FE%AA%F7P%B3%1DPCg%85%7C%C8%5D%17%1BW%A4O%FD%DB%01%EC%F2%7DN%20%5El%C6%B3%F6S%3D%3D%3D%00%3C%1EO%BE%07~6%EC%AB%E2O%8C%BD%D9%BB%A5%88%D0%18%ED%2F%7Dwo%D7%DBU%23H%0D%F7%BF_%D9%18%F5%A3%DA%D7%B5%A7%AA%8B%0F%0D%ECk%1Ch%9Em%E8J%D9%DA%9B%FB%1B%CB%88%E6%91%81%9An%C4%94%D5%A7%C8%26t%9E%EAS%B6%7D%FE%9Aa%DFH%A8%A1*d%B7%DBS~H%CBEK%99%3C%88%F5%B3%D42qu'e%22%D8%DF%9A%9AX%8C%5B%26H%91%60%B2%7COv%3B%ADV%E3o%2C%23%82%08%15L3%BC%AA%D2%DB%FCeC%D7m%13V%B0%85%85%85p8%DC%D0%D0%60%BE%EF%DA%DDvM%9Ff%F6%3E%5C%DF%8Dwtt%C8%17o%2BA%06%06%062%7F%7F%F3%C07%3DWNn%E3%07%81%40%C0%E3%F10%C6%B2M%0A%0B%0BI~yX%81%DF%19%AC%DFuEQ%C4%8Bg%C9%9B%95%F8%7DJ%DEu)%CB%E0%0DH~%A7%94%B2%8Cz%A3%C9z%23e%E9%BC%19%1C%1C%94%B9%90b%5D%98%FC%FF))%CB%90%BF%01%C9%2B%7F%1ACT0%C2%00%00%00%00IEND%AEB%60%82"></a>
					<br><br>
					<b>Support Development! Make a donation with PayPal: <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8448943" target="_blank"><img border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif"></a></b>
					
				</div>
				<div class="GM_options_body">
					<table class="GM_options" id="GM_options_%key%">
						%options%
					</table>
				</div>
			</form>
		]]></>).toString(), {'options':optionsContent,'key':this.key} );
		var div = this.optionsDiv;
		if (div==null) {
			this.optionsDiv = doc.createElement('div');
			div = this.optionsDiv;
			div.className = 'GM_options_wrapper '+this.key+'_wrapper';
			doc.body.appendChild(div);
		}
		div.innerHTML = optionsWrapper;
		var self = this;
		var f = doc.forms[this.key];
		f.GM_options_save.onclick = function() { self.saveOptions(); };
		f.GM_options_cancel.onclick = function() { self.cancelOptions(); };
		div.style.display="block";
	};
	this.hideOptions = function() {
		if (this.optionsDiv!=null) {
			this.optionsDiv.style.display='none';
		}
	};
	this.cancelOptions = function() {
		this.hideOptions();
	};
	this.saveOptions = function() {
		var doc = document.wrappedJSObject;
		var f = doc.forms[this.key];
		if (f && f.elements) {
			for (var i=0; i<f.elements.length; i++) {
				var el = f.elements[i];
				if (el.name && el.name.indexOf("GM_")!=0) {
					if (el.type=="checkbox") {
						setValue(el.name,el.checked);
					}
					else if (el.type=='text') {
						setValue(el.name,el.value);
					}
					else if (el.type=='textarea') {
						setValue(el.name,el.value);
					}
				}
			}
		}
		else {
			alert('Form not found!');
		}
		alert("Refresh the page to see your changes");
		this.hideOptions();
	};

}

// ==================================================================
// Utility functions
// ==================================================================
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function setValue(key,val) {
	window.setTimeout( function(){ GM_setValue(key,val); },0);
}
function getValue(key, def) {
	return GM_getValue(key,def);
}

// Code from Jarett - http://userscripts.org/scripts/show/20145
function updateCheck(forced) {
	var SUC_script_num= 56039;
	if ((forced) || (parseInt(getValue('SUC_last_update', '0')) + 3600000 <= (new Date().getTime()))) { // Check every hour
		try {
		GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp) {
					var local_version, remote_version, rt, script_name;
					rt=resp.responseText;
					GM_setValue('SUC_last_update', new Date().getTime()+'');
					remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
					local_version=parseInt(getValue('SUC_current_version', '-1'));
					if(local_version!=-1){
						script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
						setValue('SUC_target_script_name', script_name);
						if (remote_version > local_version) {
							// TODO: Signal to the user that there is a new version available
							// When they acknowledge, set the current version
							if (forced) {
							
							}
							else {
								var img = document.getElementById('better_igoogle_new_indicator');
								img.addEventListener('click',function() { 
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									setValue('SUC_current_version', remote_version);
									img.style.display='none';
								},false);
								img.style.display='inline';
							} 
						}
						else if (forced)
							alert('No update is available for "'+script_name+'."');
					}
					else
						setValue('SUC_current_version', remote_version+'');
				}
			});
		}
		catch (err){
			if (forced)
				alert('An error occurred while checking for updates:\n'+err);
		}
	}
}

// ==================================================================
// Begin code that runs when page loads
// ==================================================================
var w = unsafeWindow;
var _hesc = w._hesc;

// ==================================================================
// Add CSS to the page
// ==================================================================
var summaryWidth = getValue('summary_width',500) || 500;
(function() {
addGlobalStyle( template( (<><![CDATA[
	.customRssButton img { margin:0; padding:0; }
	.customRssButton {
		float:right;
		padding-top:1px;
		margin:0px 3px 0 0;
		z-index:10;
		position:relative;
		height:12px;
		line-height:12px;
	}
	.customRssButton:hover {
		background-color:black;
		color:white !important;
	}
	.item a { text-decoration:none !important; }
	.item .alt, .item .alt .title { background-color:#EDF2F5; }
	.item a {
		color:black;
		display:block;
	}
	.item .favicon {
		margin-right:2px;
	}
	.item a:hover {
		background-color:yellow;
	}
	.bi_summary {
		margin:0;
		border:3px solid #0F67A1;
		-moz-border-radius: 10px;
		padding:10px;
		position:absolute;
		width:%summary_width%px !important;
		max-width:%summary_width%px !important;
		overflow:auto;
		background-color:white;
		z-index:99999;
	}
	.refreshButton {
		background-image:url("data:image/gif,GIF89a%10%00%10%00%C4%1F%00%B9%E2%93f%97B%FE%FE%FD%D3%EE%B7%BD%E5%95%B7%DA%95%AD%CB%99n%A0Ij%9DCg%98Dj%9AH%B7%DC%93%9E%BC%89%8A%D4%40%DE%F2%CC%5E%91%3C%B4%D7%95%88%D4%3F%C5%F0%99%87%D0%40%B6%D8%97%88%D1%40h%9AB%C3%EE%98%D6%F2%BB%B9%E0%94%D3%F3%B0%B5%D8%95%FE%FE%FEP%87%2B%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%10%00%10%00%00%05u%E0'%8E%5E%E9%89%E5HzJ%10(%E5s%AA%9C%83%60%03%86%1DF%97%8A%1COg%00%00T%1A%0B%8CoV%EA0%3AP%CA%24B%F0q%80B%8B%A9s!d%96%A4%84'%08-%83M%E8%B4%E9%D34%5B%3D%E2UGs%91%2C%3D%16%2BJ(%89L(eO%3FM%12%0B%0D%15E%10%3E%02r%06%07%05%05%1B%10%0A%0EW*%1E2%2C.03%97Lk*%A1%A2%A3!%00%3B");
		background-position:left top;
		background-repeat:no-repeat;
	}
	.thread .items {
		background-color:white;
		margin-left:16px;
		padding:1px;
		border:0px dashed #666;
		border-width:0 0 1px 1px;
	}
	.thread .alt {
		background-color:#eee;
	}
	.thread .title {
		cursor:pointer;
		padding-left:18px !important;
		background-image:url("data:image/x-icon,%00%00%01%00%01%00%10%10%00%00%01%00%20%00h%04%00%00%16%00%00%00(%00%00%00%10%00%00%00%20%00%00%00%01%00%20%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C4%98a%80%C4%98a%FF%C4%98a%FF%C4%98a%EF%C4%98a%8F%C4%98a%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D0%AC%83%FF%F9%F4%F1%FF%E7%D3%C2%FF%DB%C0%A1%FF%DB%C0%A2%FF%D5%B5%90%FF%C7%9Dh%FF%C4%98a%AF%C4%98a%10%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C4%98a%AF%D2%B0%8A%FF%ED%DD%D5%FF%F3%E8%E2%FF%F7%EF%EC%FF%F7%F0%ED%FF%F4%EA%E4%FF%EC%DC%D1%FF%D3%B0%8B%FF%C4%98a%9F%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C4%98a%FF%F1%E4%DD%FF%FB%F7%F5%FF%F6%EE%E9%FF%FB%F7%F5%FF%DD%DA%D8%FF%CE%C7%C3%FF%C6%BC%B6%FF%D8%C6%BB%FF%C4%98a%FF%C4%98a%40%C4%98a%9F%C4%98a%BF%C4%98a%80%C4%98a%20%00%00%00%00%C6%9Ch%FF%F3%E9%E3%FF%FF%FF%FF%FF%FE%FD%FD%FF%E2%E1%DF%FF%AF%AD%AC%FF%A8%9F%97%FF%A0%91%84%FF%9D%8C~%FF%BB%91%5C%FF%C7%9Ej%FF%E1%CA%B0%FF%F5%EE%E6%FF%D7%B9%95%FF%C4%98a%AF%00%00%00%00%C4%98a%BF%DC%C0%A5%FF%F6%EE%EA%FF%E5%E5%E5%FF%B2%B2%B2%FF%9D%8Ez%FF%D8%BF%9F%FF%ED%DF%CF%FF%F8%F2%EC%FF%F8%F2%ED%FF%F4%EB%E3%FF%FA%F5%F2%FF%E8%D6%C3%FF%C7%9Dj%FF%00%00%00%00%00%00%00%00%C4%98a0%C4%98a%CF%CE%A8%7C%FF%9B%8Aw%FF%A5%9A%90%FF%F5%EE%E7%FF%FB%F7%F5%FF%FC%F9%F8%FF%FD%FB%FA%FF%FD%FB%FA%FF%FC%FA%F9%FF%FB%F8%F7%FF%FA%F5%F3%FF%E1%CB%B1%FF%C4%98a%EF%C4%98a%10%00%00%00%00%00%00%00%00%C4%98a%9F%CE%A8%7B%FF%F8%F1%ED%FF%FA%F5%F3%FF%FC%F9%F8%FF%FD%FC%FB%FF%FE%FD%FD%FF%FE%FD%FD%FF%FE%FD%FC%FF%FD%FB%F9%FF%FB%F8%F6%FF%F9%F3%F0%FF%DE%C4%A6%FF%C4%98a%9F%00%00%00%00%00%00%00%00%C4%98a%AF%E4%CE%B7%FF%FA%F6%F4%FF%FE%FD%FC%FF%A1%9F%9C%FF%8D%8C%88%FF%8D%8C%88%FF%FA%F7%F5%FF%A2%A1%9E%FF%8D%8C%88%FF%FC%F9%F7%FF%F9%F5%F2%FF%F4%EA%E4%FF%C4%98a%FF%00%00%00%00%00%00%00%00%C4%98a%BF%EC%DC%CC%FF%FF%FF%FF%FF%FF%FF%FF%FF%FE%FD%FD%FF%FE%FD%FC%FF%FF%FF%FE%FF%FF%FF%FF%FF%FF%FE%FE%FF%FD%FC%FB%FF%FC%F9%F7%FF%FA%F5%F2%FF%F7%F0%EC%FF%CA%A3r%FF%00%00%00%00%00%00%00%00%C4%98a%BF%E8%D5%C1%FF%FF%FE%FE%FF%FF%FF%FF%FF%A2%A0%9D%FF%8D%8C%88%FF%8D%8C%88%FF%8D%8C%88%FF%8D%8C%88%FF%A0%9D%9A%FF%FC%FA%F8%FF%F9%F4%F1%FF%F7%F0%EC%FF%C4%98a%FF%00%00%00%00%00%00%00%00%C4%98a%60%D4%B3%8C%FF%FA%F5%F3%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FE%FF%FE%FD%FD%FF%FF%FF%FF%FF%FA%F5%F2%FF%E4%CE%B7%FF%C4%98a%BF%00%00%00%00%00%00%00%00%00%00%00%00%C4%98a%CF%D7%B9%95%FF%FA%F5%F2%FF%FE%FD%FD%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FE%FE%FE%FF%FC%FA%F9%FF%FD%FB%FA%FF%EB%DB%CA%FF%C7%9Ej%EF%C4%98a0%00%00%00%00%00%00%00%00%00%00%00%00%C4%98a%10%C4%98a%BF%D1%AE%84%FF%E7%D5%C2%FF%F7%F0%EA%FF%FC%F9%F7%FF%FC%F9%F7%FF%FA%F5%F2%FF%EE%E1%D4%FF%D7%B9%95%FF%C4%98a%EF%C4%98a0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C4%98a%60%C4%98a%AF%C4%98a%FF%C4%98a%FF%C4%98a%FF%C4%98a%FF%C4%98a%CF%C4%98a%80%C4%98a%10%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%03%FF%00%00%80%3F%00%00%00%3F%00%00%00%01%00%00%00%01%00%00%00%03%00%00%00%00%00%00%C0%00%00%00%C0%00%00%00%C0%00%00%00%C0%00%00%00%C0%00%00%00%E0%00%00%00%E0%01%00%00%F8%03%00%00%FF%FF%00%00");
		background-position:left center;
		background-repeat:no-repeat;
	}
	.thread .bi_summary {
		margin-left:2px;
	}
	.thread .count {
		color:#666;
		font-size:12px;
	}
	
	div.better_igoogle_options_msg {
		position:absolute;
		top:204px;
		right:180px;
		width:200px;
		heigh:200px;
		background-color:yellow;
		border:8px solid #0F67A1;
		-moz-border-radius: 15px;
		padding:10px;
		z-index:5000;	
		font-weight:bold;
	}
	img.better_igoogle_options_arrow {
		position:absolute;
		top:20px;
		right:127px;
		z-index:5000;	
	}
	
	div.GM_options_wrapper {
		display:none;
		position:absolute;
		width:50%;
		margin-left:25%;
		margin-right:25%;
		top:50px;

		background-color:white;
		border:8px solid #0F67A1;
		-moz-border-radius: 15px;
		padding:10px;

		z-index:5000;	
	}
	.GM_options_wrapper h2 {
		font-size:16px;
		background-color:#0F67A1; /* #82B6D9;*/
		color:white;
		font-weight:bold;
		padding:5px 10px;
		margin:0px;
	}
	.GM_options_header {
		background-color:white;
		color:#0F67A1;
		height:90px;
		border-bottom:5px solid #0F67A1;
	}
	.GM_options_header a {
		color:#0F67A1;
	}
	.GM_options_message {
		background-color:yellow;
		padding:10px;
		border:1px solid black;
		-moz-border-radius: 10px;
		margin:10px;
		font-weight:bold
	}
	.GM_options_body {
		height:500px;
		overflow:auto;
	}
	.GM_options_wrapper table.GM_options {
		border:1px solid black;
	}
	.GM_options_wrapper td.label, .GM_options_wrapper td.input, .GM_options_wrapper td.html  {
		border:1px solid #aaa;
		margin:5px;
		padding:3px;
	}
	.GM_options_buttons {
		float:right;
		width:200px;
		height:50px;
		vertical-align:middle;
		text-align:center;
	}
	.GM_options_buttons input {
		background-color:#0F67A1;
		color:white;
		font-size:16px;
		font-weight:bold;
	}
	
	.GM_options_better_igoogle {
		
	}
	
	.rss-options-feed-header {
		background-color:#ccc;
		font-weight:bold;
		font-size:14px;
	}
	#better_igoogle_new_indicator {
		margin:0px 5px;
	}
]]></>).toString(), {'summary_width':summaryWidth} ) );
})();

// ==================================================================
// Customize the style of the page with additional CSS
// (Replacement for Stylish script)
// ==================================================================
var css = (<><![CDATA[
__hide_search_bar:
	#gsea,#gbar,#nhdrwrapsizer{ display:none !important; }

__hide_footer:
	#footerwrap { display:none !important; }

__gray_background:
	body,#modules { background-color:#eee !important; }

__condense_whitespace:
	#modules { padding: 5px !important }
	div.modboxin { padding:0px !important; }
	.modboxin, .modtitle { border-width:2px !important; }
	.modbox { border:none !important;margin-top:4px !important;margin-bottom:0px !important; }

__hide_maximize:
	.v2enlargebox { display:none !important; }

__compact_headers:
	.modtitle, .modtitle_s { padding:0px 5px 1px !important; }

__remove_round_borders:
	.rnd1,.rnd2,.rnd3 { display:none !important; }
	.modtitle { border-top:1px solid #87AFDA !important; }
	.modboxin { border-bottom:1px solid #87AFDA !important; }
	
__hide_sidebar:
	#col1_contents { display:none; }
	#col1_expander { display:block; width:10px; background-color:#ECF4FD; font-weight:bold; text-align:center; cursor:pointer; }
	#col1_expander:hover { background-color:yellow; }

__hide_sidebar_full:
	#col1_contents { display:none !important; }
	#col1_expander { display:none !important; }
	
]]></>).toString();
var insertCss = "";
css.split('__').splice(1).forEach(function(str,i) {
	var x = str.indexOf(':');
	var pref = str.substring(0,x);
	var val = str.substring(x+2);
	if (getValue(pref,false)) {
		insertCss += val;
	}
});
if (css) {
	addGlobalStyle(insertCss);
}


// Handle mouse wheel scroll while hovering over a link
window.addEventListener('DOMMouseScroll', wheel, false);
function wheel(e) {
	if (unsafeWindow.mouse_wheel_scrolls_summary) {
		var t = e.target;
		if (t && t.parentNode && t.parentNode.className && t.parentNode.className=='item') {
			if (e.detail) {
				t.nextSibling.scrollTop -= (-(e.detail/3))*20;
			}
			e.preventDefault();
		}
	}
}

// Utility function to load up a feed property with a stored value
function setSavedAttribute(feed,obj,property) {
	var val = getValue(property+":"+feed.url,null);
	if (typeof val != "undefined" && val!==null && val!=="") { 
		obj[property] = val; 
	}
}

// A global container to hold all the feed objects
w.rssFeeds = {};

var feedsExist = false;
// Find all the feeds on the page and convert them!
function convertFeeds() {
	for (var i in w) {
		if (/FEED(\d+)/.test(i)) {
			var id = RegExp.$1;
			var f = w['FEED'+id];
			if (f && f.url && f.num_items) {
			
				feedsExist = true;
				
				var opts = {};
				opts.container = "m_"+id+"_b";
				opts.id = id;
				
				// Get saved values
				setSavedAttribute(f,opts,'last_seen');
				setSavedAttribute(f,opts,'title');
				setSavedAttribute(f,opts,'item_format');
				setSavedAttribute(f,opts,'num');
				setSavedAttribute(f,opts,'refresh_interval');
				setSavedAttribute(f,opts,'avoid_caching');
				
				w.rssFeeds[id] = new rss(f.url,opts,true );
				w.rssFeeds[id].addControls();

				// Kill some methods of the built-in rss objects so they don't try to continue running
				if (typeof f.init=="function") { f.init = function() { } }
				if (typeof f.msg=="function") { f.msg = function() { } }
				if (typeof f.render=="function") { f.render = function() { } }
			}
		}
	}
}
convertFeeds();

// This is a hack-y way to load feeds, because sometimes the iGoogle architecture isn't fully loaded when this code runs.
// So we try to convert, and if it doesn't work then we try again in a few seconds
function initFeeds() {
	if (feedsExist && !feedLoaded) {
		for (var id in w.rssFeeds) {
		w.rssFeeds[id].init();
		}
		setTimeout( initFeeds, 3000 );
	}
}
setTimeout( initFeeds, 3000 );

// Get a list of all gadgets on the screen
var gadget_boxes = document.getElementsByClassName('modbox');
var gadgets = {};
if (gadget_boxes) {
	for (var i=0; i<gadget_boxes.length; i++) {
		var el = gadget_boxes[i];
		var id = el.id.substring(2);
		var title = _gel('m_'+id+'_title');
		if (title && typeof w.rssFeeds[id]=="undefined") { // Only track non-rss gadgets
			gadgets[id] = {'title':title.innerHTML};
		}
	}
}

// Append a link to trigger Options dialog
var guser = _gel('guser');
if (guser && guser.childNodes && guser.childNodes[0]) {
	var el = guser.childNodes[0];
	var t = document.createTextNode(' | ');
	el.appendChild(t);
	
	var img = document.createElement('img');
	img.src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1F%00%00%00%0C%08%06%00%00%00%9A%ECf%0C%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%B6IDATx%DA%C4%94%AFn%1BA%10%C6%7FWE6%B2%B4%D2%95%D8%24%8B%1Adi%25%A3%22_H%91%25%AF%DF%C0%26%87%2FOpy%83%F0%90(O%10G*%0A%B9%3DR%7C%B8h%91Mj%F9%24%974d%0Alos%CE%A5*jF%1A%B0%BB3%DF7%7F7%B2V%0B%EF%24g%00%0F%0F_%FE%3B%F1l%F6%B4'%07%F0~%87%F7%3B%B4%EE%A1u%0F%00%E7V%E1%5CU%1B%EA%FAW%03%C0%98%8FT%D5%0F%94%EAbL%0C%40Um%0Eoq%C08%BEG%D1-%00%22%E9%1E%C0Z-%22%A9%E4%F9H%00Q%AA%23%DB%ED%5CDR%01%24%CFG%22%92J%92%0C%04hhQL%C4%98X%00%11Ie%BB%9D%0B%20%C6%C4%22%92JQL%04%90%2C%1B%06%BC%A3%AD%B5Z%CEN%CBQ%D7%CF%2C%16%EE%CDV%84%A8%0F2%9Dj%AAj%83s%2B%BC%FF%19%B2%F7~%87s%EB%83%CDy%2B%D6%87%D3%8B%3C%1F%B1%5Cz%96K%DF%EApy%F95(%40%92%F4%03aY%AE%B0V%1F%CA%BD%A6%2C%D7%07%9B%C1%DB%03%F7R%B2l%C8%FD%FDw%16%0B%D7%EA0%1E%F7%1B%E7%24%19%A0T%87%B2%5C%E3%DC%8A%3C%1F%01%F0%F8%E8q%EEO0%FFD%AET%87%BB%BBq%C8%ECT%AE%AFG%AF%EE%92d%10*e%ADF%A9.WW%DFZ%83%FDk%D9%8F%60Y6lu%88%A2%DB%A0%CE%AD%1A%04%C6%C4h%DD%23I%FA%D4%F5%F3%AB%92%8B%A4%8D%99%09%99%CF%E7%9FB%FF%8E%BD%9FN%CF%C3%DA%DD%DC%7Cn%5D%B5%BD%EF%05%C6%C4(%D5%05%40%EB%1EE1i%AC%DC1%F0%97C%1BY%AB%E5%5D%3F%99%D9%EC%E9%5D%BE%D7%DF%03%00_c%CDc%AAn%81%19%00%00%00%00IEND%AEB%60%82";
	img.style.display="none";
	img.style.cursor="pointer";
	img.title="A new version of this script is available. Click to go to the update page.";
	img.id="better_igoogle_new_indicator";
	el.appendChild(img);
	
	var a = document.createElement('a');
	a.innerHTML = '<b>Better iGoogle Options</b>';
	a.href ='#';
	a.addEventListener('click',function(){ options.displayOptions(); },false);
	el.appendChild(a);
}

// Point to the options link if this is the user's first time here
var highlight_options = getValue('highlight_options',true);
if (highlight_options && location.href.indexOf("/ig/")==-1) {
	var div = document.createElement('div');
	div.innerHTML = (<><![CDATA[
		You have options!<br><br>
		Click this link to see all the new options you have for your iGoogle page.<br><br>
		Click OK to dismiss this message. It will not appear again.<br><br>
	]]></>).toString();
	var button = document.createElement('input');
	button.type='button';
	button.value='OK';
	button.addEventListener('click',function() { setValue('highlight_options',false); document.getElementById('better_igoogle_options_msg').style.display='none'; document.getElementById('better_igoogle_options_arrow').style.display='none';},false);
	div.appendChild(button);
	div.className = 'better_igoogle_options_msg';
	div.id = 'better_igoogle_options_msg';
	document.body.appendChild(div);
	
	var arrow = document.createElement('img');
	arrow.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%7F%00%00%00%B8%08%06%00%00%00%CAP3%1F%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%09%08IDATx%DA%EC%9D%7Fd%DD%E7%1E%C7_%F7%E6%0A%25%F4*%25%84%10B)%25%94%91%09e%94Q%C2(%A5lR7%9A%B5%16%8DM%A3%D1juZ%AD%D6*%D3iok%B5%B9%D7%0D%B31J%98%7B%DD%B9%23v%99%D5-%B5%DA%A8%95R%0E%25%EE%E8_%25%BA%3F%9E'Mr%9C%9C%9C%F3%FD%3C%E7%7B%BE%9F%EF%F7%FD%A2%92%E6%C7%C9%C9y%E5%F9%9C%EF%F3%9C%F7%F3y%FE%F0%F2%E5KD5%F9%D3%EA%3B%7F~%F7oz4%AAC%DF%FF%FF%FA%CE%F3%3F%EAq%A8%14%BD%C0i%E0%16%80%E4W%87%FD%C0O%C0%05%60Y%F2%AB%C1%20%F0%25%F0O%608~%EC%A9%E4%97%BF%C4%9F%8C%A3%FD%60%DD%E7j%1B.%F8D%A9%D8%07%DC%00vo%F2y%8D%FC%12%D2%0F%FC%03%F8O%13%F1%AFF%BE%E4%97%83%1E%E0%04%F03p%B8%85%AFW%D9%2F%09%A3%B1%C4%8F%B4%F8%F5%2F%80g%1A%F9%BE%D9%01%7C%06%7C%DF%86%F8W%A3%5E%F2%FDr%0C%F8%15%98%C8%F0%BD%AF%E4%AB%EC%FBb%2Faun%AF%E16%9Ej%E4%FBb%7B%7C%5E%FF%D1(%5E%23%DF%19%13%C0G%F19%3E%05%92%EF%80%3D%B1%C4%8F%26%BE%5D%95%FD%82%97%F8y%E0%7F%1D%10%BFA%BEF~%B18%1CK%7C%7F%07%7F%86%E4%17%8C%DD%F1%82n_%0E%3FK%F3%FC%82%D0%07%5C%89%25%3E%0F%F1%AFV%F74%F2%BB%CB%C1X%E2%07s%FC%99%B5%F5%FF%91%FC%FC%19%8E%25~%7F%17~%F6%06%F9*%FB%F9%B1%8D%10%A1%FA%A9K%E27%5C%ECi%E4%E7%C7x%9C%BE%0Du%F9~%A8%EC%E7%C8P%94%3E%5E%90%FB%A3%B2%9F%03%BD%C0%D9X%E2%C7%0Bt%BFT%F6%3B%CC%FExA7%5C%C0%FB%A6%91%DF!%1AE%A4%25%BF%02%25~%B3%88t%D1P%D9O%C8%1B%C0u%9A'e%8B%C2%86%D5%3D%8D%FC%EC%ACF%A4%FF%EDD%FCj%C9_%91%FC%EC%B4%1B%91.%EC%F3%BD%CA~%7B%8C%12%C2%15%7B%9C%DE%FF%A7%F5%1F%D0%C8%DF%9A%F5%11%E9%3D%8E%7F%8F%9A%E4%B7%87%25%22%AD%B2%EF%94%14%11i%95%7Dgl%8F%D2%7F%2C%99x%8D%FC-%98%20mDZ%F2%1D0BX%8B%1F-%F9%EF%A9%B2_W%E2%E7c%89%2F%BB%F8%15%EAV%F7%AA%3C%F2%F3%88H%17%89g%D4%AD%EEUQ~%9E%11%E9B%97%FC%AA%C9%3F%14%AF%E4%B7W%B0%D2U%5E%FE%17%F1%DFj%05%D8%B6%EE%ED.B%86%BE%FE%AD%E4%97%90%87%F1%ED%BD-%BEn8V%8A%FA%B7CqJ8%E4djX%93%FC%F6y%D4%E2%1F%C9%EA%1F%C1%20%B0%B3%C9%5B%8D%FC%12%F28%FEk%F4G%D2KH%F9%EC%2C%DA%C8%D7%F2n%E79M%F73%7D%92%DF%05v%01%A7%8Az%C1'%F9%9D%E5%D3X%F6%BBI%C3%D5%3D%C9%EF%2CG%81%B1%02%DC%8F%86%AB%7B%92%DF9%FA%81KE%9E%E3K~%E7(%D2K%C35%C9%CF%8F%03%D8%93%BD%0F%24%DF%1F%7D%84%17%8E%AC%E2_gm%81Ie%DF%09%E7%B1%B5YY%01%8E%03%CF%81%19%C9%F7%C3%08aC%87%85%DB%C0R%7C%7F%11X%90%FC%E2%D3C%C8%F6%F7%18%25%CD%D5%7Dl6V%01%3D%E7%17%98%13%B4%D7%F3%BE%113%C0o%0D%FE%20.j%E4%17%97%C1%F8%5Coa%11%F8j%93%CF%5D3%5C%FDo%BA%BA'%F9i%B8%81-%F8%F1%1C%98j%F2%F9%17%F1%220%0B%9B%AE%EEI%BE%9DCq%5Eo%E1L%B3%D2%1CY%CAx%F1%D7%F4v%25%3F%3B%3B%08%2By%16%EE%01%9F%B4%F8%B5Y.%FEj%92%DF%19.%00%03%C69%FDd%B3%B2%DC%60%14%CFJ~%F7%19%23%EC%E0%B5p%15%B8%9Fa%1D%A0%9D%EFQ%D9OL%2F%E1uz%0B%8F2N%E1V%80i%8D%FC%EEq%8A%90%D0%B10M%F6%C5%9B%25%E0s%C9%CF%9FaB%26%CF%C2%02%F0%8D%F16%3E%00%96U%F6%F3%E53l%B1%ACe%D2%BC%60%B3%1C%A7%88%1A%F99%F1%17%EC%B1%ACY%9A%AC%B8%25%BE%F8%5B%D1%C8O%C3N%C2q(%16%96%80%3B%09%EF%D3%0Ap%A4%C9T%F1%D9V%D3H%C9o%8Dyl%B1%AC%17QTj%EE%C7%0A%D0%F6%F3%BD%E4%B7%C6%9B%D8cY%17I%97%CC%A9%E7%CC%26%17%7F5%C9%B7%D1G%E8%ADk%E1%17%E0r%07%EF%E32%8DW%FE%24%DFH%8A%ADV%93%B1%ECw%92%3B%AC%25%80T%F6%130Bh%A5n%E1f%03)%9Db%BA%EE%02O%23%3F%23%3D%84%25%5Ck%2C%EBL%8E%F7%B9%FE%E2O%F23%F2%1E%F6%26%8C%AD%AE%C2%A5dn%5D%B9W%D9%CF%C0%00%E1%E5Z%0B%8B%AC%B5%80%C9%93%DF%D6%5D%FCi%E4g%E0%16%F6X%D6%F1.%DE%FF%85x%9D!%F9mr%10%7B%2C%EB%1C%F0%A4%CB%BF%C7%91Vf%18%92%BF%C6jGN%EBE%D7%C7%05%F8%5DZZP%92%FC5.a%8Fe5%5Bk%2F%1C%92%1F%18%234S%B0%F01%ED%C7%B2%24%BF%CB%F4%12%B2%F7%969%FD%93%F8%5C%8F%E4%FB%E2%7D%ECg%E7%AC%EE%AC%95%7CG%0Cc%DFj%B5%10%E7%F5H%BE%2F%AC%DD%B2%96%09%2ByH%BE%2F%26%B0%B7%5E%9F%A3%85%C5%14%C9%2F%16)%B6Z-%B1y%8AF%F2%0B%CCu%EC%B1%ACI%EF%0FB%15%E5%EF%C7%1E%CB%BALH%E8H%BE%23%B6a%EF%96%95u%AB%95%E4w%99%B3%D8cY-%BDh%22%F9%C5b%84%B0%A0c%A1QVN%F2%0BNO%2C%F7%969%7D%8D%F6%F7%C7K~%018%8A%FD%E0%C4n%C4%B2%24%DF%C8%00%F6%ADV%A9%1A%22J~%CE%A4%E8%965%5D%C6%07%A6%EC%F2%DF%02%C6%8D%B7%F1!%E1%F0%24%C9wD%8A%ADV%F7%09M%10%91%7C_%5C!%DFnY%92_%10F%B1%C7%B2%3Ea%EB%C3%14%25%BF%60%A4%88e%E5%BD%D5J%F2%13%F1%3E%F6%0E%D8S8%8CeU%5D%FE0a%FD%DE%C2W8%8DeU%5D%FE%0D%C2%2BwYI%D5-K%F2s%E6m%C2k%F5%16Z%E9%80-%F9%05c%07%F6%ADVK%84f%0AH%BE%2F%E6%B1%C7%B2%A6%A8%18e%90%FFF%2C%F9%16%AE%02%0F%25%DF%DF%9C%FE%96%F16%1E%11%D6%EF%91%7C_%9C%C7G%B7%2C%C9O%CC%1E%EC%B1%AC%CF%81%EF%A8(%5E%E5%A7%88e%B9%DEjUe%F9G%B1w%C0%9E%A6d%B1%AC*%C8%1F%20t%D1%B0%F0%2FJ%18%CB%AA%82%FCyB%FF%9C%ACt%BB%5B%96%E4gd%9C%D01%CBB'%3B%60K~%87%E8%C3%BE%D5%EA%3EaAG8%93%9F%A2%5B%D6%14%25%8Ee%95U%FEk%D8%0F1%BC%09%FC%20%E5%BE%E4%F7%10%96p%AD%B1%AC9%E9%F6'%FF%24%F6X%96%CBnYU%97%9F%E2%10%C3%AF%81%BBR%EDO%FEu%B4%D5%AA%92%F2%0F%13N%B6%B20K%85bYe%91%9F%22%96%F5_%9Cw%CB%AA%AA%FC%2B%84S%2C%B3%F2Bsz%9F%F2%F7%11%CE%AD%B5p%0Dx%20%BD%BE%E4%F7%12Z%A2Zx%84%C3%0E%D8%92%9F%A6%5B%D6%14%15%8Dey%96%BF%1B%FB!%86%7F%07%BE%95V%7F%F2oa%8Fe%CDH%A9%3F%F9%C7%B0%C7%B2f%A8x%2C%CB%A3%FC%14%87%18~%1BK%BEp%26%FF%23%B4%D5%AA%92%F2%0F%00%87%8C%B7q%0E%C5%B2%DC%C9O%11%CBz%40%89%BBe%95Y%FEy%60%D0%F0%FD%2B%9A%D3%FB%94%BF%178a%BC%8D%DB%84%17o%84%23%F9%3D%84%25%5Ck%2CkV%FA%FC%C9O%D1-k%1A%C5%B2%DC%C9%1F%C2%DE-%EB.!%9A%25%9C%C9O%11%CB%D2V%2B%87%F2%0F%C7y%BD%859%14%CBr'%3F%C5!%86%3FP%B1nYe%91%7F%09%E8O0%A7W%2C%CB%99%FC1%EC%1D%B0%AF%126Y%0AG%F2S%C5%B2.J%95%3F%F9%A7%80%5D%C6%DB%D0V%2B%87%F2wa%DFj%B5%40h%A1%22%9C%C9%FF%14%7B%2CK%5B%AD%1C%CAO%D1-%ABt%87%18VA~%3F%F6nY%DF%11%1A%24%0Ag%F2S%C4%B2%26%A5%C6%9F%FC%03%84e%5C%0B%1F%A2X%96%3B%F9)%0E1%7C%88%BAe%B9%94%7F%96%F0%92%AD%05%C5%B2%1C%CA%1F%C1%DE%01%FB%26%E1%A8%13%E1H~%AAX%D6%19%E9%F0'%FF%3DB%20%D3%C2%8C%E6%F4%FE%E4%0Fb%DFj%B5H8%C8P8%93%7F%03%7B%2CK%5B%AD%1C%CA%3F%84%3D%96U%A9C%0C%CB%22%3FE%2C%EB%1E%E1%98r%E1L%FE%05%EC%1D%B0'Q%2C%CB%9D%FC1%EC%1D%B0%AF%A1X%96%3B%F9)%0E1%7CLE%0F1%F4.%FF%24%A1q%92%05m%B5r(%7F%18%FBV%AB%858%AF%17%CE%E4%A7%88e%7D%A0%87%DC%9F%FC%09B%5BT%0B%B3%40M%0F%B9%2F%F9%3B%13%CC%E9%97%80%3Bz%B8%FD%C9%9F%C7%1E%CB%3A%A2%87%DA%9F%FC7%B1%C7%B2t%88%A1C%F9)bY%BF%00%97%F50%FB%93%7F%1A%7B%07%ECI%14%CBr'%7F%04%7B%07%EC%DB(%96%E5N~%8AC%0Ck%E8%10C%97%F2%8F%11%8E%2F%B5%A0%ADV%0E%E5%0F%60%DFj%B5HX%C6%15%CE%E4%A7%88eig%ADC%F9o%01%E3%C6%DB%3BGx%C9V8%E0%F7%01%00H%5C%D3%02%F4h%17%D4%00%00%00%00IEND%AEB%60%82";
	arrow.className='better_igoogle_options_arrow';
	arrow.id = 'better_igoogle_options_arrow';
	document.body.appendChild(arrow);

	// Unhide the header bar for now in case users have it hidden
	var o = document.getElementById('guser');
	if (o) { o.style.display="block"; }
	var o = document.getElementById('gbar');
	if (o) { o.style.display="block"; }
	
}

// If the tabs sidebar has been hidden, add a way to show it
if (getValue('hide_sidebar',false)) {
	var c1 = document.getElementById('col1');
	if (c1!=null) {
		var expander = document.createElement('div');
		expander.id = "col1_expander";
		expander.innerHTML = "<br>c<br>l<br>i<br>c<br>k<br><br>t<br>o<br><br>s<br>h<br>o<br>w<br><br>t<br>a<br>b<br><br>s<br>i<br>d<br>e<br>b<br>a<br>r<br>";
		expander.addEventListener('click',function() {
			_gel('col1_contents').style.display='block';
			_gel('col1_expander').style.display='none';
		},false);
		c1.appendChild(expander);
	}
}

var id;
var resize_iframe = function(gid,iframeh) {
	var iframe = _gel('remote_iframe_'+gid);
	if (iframe) {
		iframe.style.height = iframeh+'px';
	}
};

// Resize gadgets
for (id in gadgets) {
	var el = gadgets[i];
	var h = getValue('gadget_height_'+id,0);
	// If there is already a pref set, resize the iframe
	if (h) {
		(function(inner_id,hh) {
			setTimeout(function() {
				resize_iframe(inner_id,hh);
			},1000);
		})(id,h);
	}
}

// Add gadget resize icons if the option is set
if (getValue('allow_gadget_resize',false)) {
	for (id in gadgets) {
		var el = gadgets[i];
		var after = _gel('DD_tg_'+id);
		if (after && after.parentNode && after.parentNode.insertBefore && after.nextSibling) {
			// Resize Icon
			var a = document.createElement("A");
			a.href = "#";
			a.src = "";
			a.title="Set gadget size";
			a.innerHTML = "<img src=\"data:image/gif,GIF89a%0C%00%0C%00%80%01%00%BA%06%06%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%0C%00%0C%00%00%02%1B%0C%8Ei%C1%06%ED%9Ab%87%A6%17%2F%8A%12%5BXu%8E%C6%91%DC%E8%85%9F%84%92%05%00%3B\">";
			a.addEventListener('click',(function(inner_id) { return function() {
				var h = getValue('gadget_height_'+inner_id,0);
				h = prompt('Set size (in pixels) for this gadget. Note: If the gadget uses dynamic height internally, then that will override your setting!',h);
				if (h && !isNaN(+h)) {
					setValue('gadget_height_'+inner_id,h);
					resize_iframe(inner_id,h);
				}
			}; })(id),false);
			a.className = "customRssButton gadget_resize_icon";
			after.parentNode.insertBefore(a,after.nextSibling);
		}
	}
}

// Hide header bar of gadgets
for (id in gadgets) {
	if (getValue('gadget_'+id+'_hide_header',false)) {
		_gel('m_'+id+'_hd').style.display="none";
	}
}

// ==================================================================
// Script options
// ==================================================================
var options = new GM_options('better_igoogle');
options.addHtml("<h2>Misc Options</h2>");
// Misc Options
options.addOption( {'name':'prevent_refresh','type':'checkbox','default':true,'description':'Prevent the auto-refresh of the entire page'} );
options.addOption( {'name':'allow_gadget_resize','type':'checkbox','default':false,'description':'Put an icon on each gadget to allow manual resize'} );

options.addHtml("<h2>Display Options</h2>");
options.addOption( {'name':'hide_search_bar', 'type':'checkbox','description':'Hide the Google Search bar','default':false} );
options.addOption( {'name':'hide_footer', 'type':'checkbox','description':'Hide footer','default':false} );
options.addOption( {'name':'gray_background', 'type':'checkbox','description':'Use gray background to increase readability','default':false} );
options.addOption( {'name':'condense_whitespace', 'type':'checkbox','description':'Condense whitespace','default':false} );
options.addOption( {'name':'hide_maximize', 'type':'checkbox','description':'Hide maximize icon in gadget headers','default':false} );
options.addOption( {'name':'compact_headers', 'type':'checkbox','description':'Compact gadget headers to save space','default':false} );
options.addOption( {'name':'remove_round_borders', 'type':'checkbox','description':'Remove rounded corners to save space','default':false} );
options.addOption( {'name':'hide_sidebar', 'type':'checkbox','description':'Collapse the Tabs/Chat sidebar','default':false} );
options.addOption( {'name':'hide_sidebar_full', 'type':'checkbox','description':'Completely Hide the Tabs/Chat sidebar','default':false} );

options.addHtml("<h2>Gadget Options</h2>");
// Gadget Options
for (id in gadgets) {
	options.addHtml("<b>"+gadgets[id].title+"</b>");
	var name = 'gadget_'+id+'_hide_header';
	options.addOption( {'name':name, 'type':'checkbox', 'default':false, 'description':'Hide Title Bar'} );
	var h = getValue('gadget_height_'+id,'');
	options.addOption( {'name':'gadget_height_'+id, 'type':'input', 'default':h, 'description':'Gadget Height (leave blank to use default)'} );
}

options.addHtml("<h2>RSS Options</h2>");
// RSS Options
options.addOption( {'name':'rss_hide_empty','type':'checkbox','default':true,'description':'Hide feeds with no unread items'} );
options.addOption( {'name':'default_rss_refresh_frequency','type':'input','description':'Default RSS Refresh frequency (minutes) [default=15]','size':5} );
options.addOption( {'name':'default_rss_num_items','type':'input','description':'Default RSS number of items [default=10]','size':5} );
options.addOption( {'name':'default_rss_item_template','type':'input','description':'Default RSS Item Template [Expert users only!]','size':50} );
options.addOption( {'name':'summary_delay','type':'input','description':'Delay (in ms) until summary appears [Default: 500]','size':5} );
options.addOption( {'name':'summary_offset_x','type':'input','description':'Horizontal offset (in px) from cursor for summaries [Default: 15]','size':5} );
options.addOption( {'name':'summary_width','type':'input','description':'Summary display width(in px) [Default: 500]','size':5} );
options.renderOptions = options.render;
options.render = function() {
	var content = this.renderOptions();
	for (var id in w.rssFeeds) {
		var f = w.rssFeeds[id];
		// First output a header with the url
		var title = f.feedTitle?f.feedTitle+'<br>('+f.url+')':f.url;
		content += template('<tr><td class="rss-options-feed-header" colspan="2">%1%</td></tr>', title );
	
		var inputs = [
			{'name':"title:"+f.url,'description':'Title', 'size':50},
			{'name':"refresh_interval:"+f.url,'description':'Refresh Frequency (minutes)', 'size':5},
			{'name':"last_seen:"+f.url,'description':'Last seen url', 'size':50},
			{'name':"num:"+f.url,'description':'Number of Items', 'size':5},
			{'name':"item_format:"+f.url,'description':'Item template', 'size':50},
			{'name':"avoid_caching:"+f.url,'type':'checkbox','default':true,'description':'Avoid feed caching by Google'}
		];
		for (var i=0;i<inputs.length;i++) {
			var input = inputs[i];
			input.value = getValue(input.name,'');
			input.html = options.renderOption(input);
			content += template( (<><![CDATA[
				<tr class="rss-options-feed-fields">
					<td class="rss-options-feed-field-name">%description%</td>
					<td class="rss-options-feed-field">%html%</td>
				</tr>
			]]></>).toString(), input );
		}
	}
	
	return content;
};

// Check for script updates
if (!isExtension) {
	updateCheck();
}

// Stop page refresh?
if (getValue('prevent_refresh',true)) {
	unsafeWindow._reload = function() { if (unsafeWindow.status) { unsafeWindow.status="Page Reload Cancelled"; } };
}


