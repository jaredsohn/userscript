// ==UserScript==
// @name           Arena BG (Torrents)
// @namespace      *
// @include        http://arenabg.com/*
// @include        http://www.arenabg.com/*
// @include        http://0.arenabg.com/*
// @grant          none
// ==/UserScript==
mod_version = '2.5';

// this is all the universe
function J(var_name){}

// items are added during script execution
J.prototype.data = {
	// page - the page name where we are 'LIST', 'DETAILS', etc.
}

// initialize stuff
J.prototype.init = (function(){
	this.recognize_page();
	if (this.data.page != 'IFRAME'){
		this.adds.remove();
		this.global.go();
		
		// torrents list
		if (this.data.page == 'LIST'){
			this.mod_list.go();
		}else if(this.data.page == 'ITEM'){
			this.mod_item.go();
		}
	}
});

// recognizes on which page are we to take needed actions
J.prototype.recognize_page = (function(){
	var patt_torrent_list = new RegExp('/torrents');
	var patt_torrent_item = new RegExp('/torrents/.+/[0-9]+/$');
	var patt_iframe = new RegExp('iframe');
	if (patt_iframe.test(document.location.href)){
		this.data.page = 'IFRAME';
	}else if (patt_torrent_list.test(document.location.href)){
		if (patt_torrent_item.test(document.location.href)){
			this.data.page = 'ITEM';
		}else{
			this.data.page = 'LIST';
		}
	}else{
		this.data.page = 'UNKNOWN';
	}
});

J.prototype.adds = {
	remove: function(){
		var i = 0;
		
		var iframes = document.getElementsByTagName('iframe');
		if (iframes){
			for(i = 0; i < iframes.length; i++){
				this.clean_element(iframes[i]);
			}
		}
		var divs = document.getElementsByTagName('div');
		if (divs){
			for(i = 0; i < divs.length; i++){
				if (this.check_element(divs[i])){
					this.clean_element(divs[i]);
				}
			}
		}
		var img = document.getElementsByTagName('img');
		if (img){
			for(i = 0; i < img.length; i++){
				if (img[i].getAttribute('class') == 'banner'){
					this.clean_element(img[i].parentNode);
				}
				
			}
		}
		var obj = document.getElementsByTagName('object');
		if (obj){
			for(i = 0; i < obj.length; i++){
				this.clean_element(obj[i].parentNode);
			}
		}
		var a = document.getElementsByTagName('a');
		if (a){
			var patt_url = new RegExp('subsunacs|imdb|subs.sab|arenabg');
			for(i = 0; i < a.length; i++){
				if (a[i].getAttribute('target') == '_blank'){
					if (!patt_url.test(a[i].getAttribute('href'))){
						this.clean_element(a[i]);
					}
				}
			}
		}
	},
	
	check_element: function(e){
		if (e.getAttribute('id') == 'reklama'){
			return true;
		}
		if (e.getAttribute('id') == 'header'){
			return true;
		}
		var patt_ads = new RegExp('ads[_]*(left|right)');
		if (patt_ads.test(e.getAttribute('id'))){
			return true;
		}
		var patt_banner = new RegExp('banner');
		if (patt_banner.test(e.getAttribute('id'))){
			return true;
		}
		return false;
	},
	
	// cleans element contents
	clean_element: function(e){
		e.innerHTML = '';
		e.parentNode.removeChild(e);
	},
}

J.prototype.global = {
	settings: Array,
	loaging_gif: 'http://www.tga.nl/images/loading.gif',
	
	go: function(){
		this._get_all_settings();
		this._parse();
		this._modify_header();
		this._add_search();
		this._add_settings();
	},
	
	// settings set
	set: function(setting, value){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + 3000);
		var c_value = escape(value) + "; expires=" + exdate.toUTCString();
		document.cookie = 'mod_' + setting + "=" + c_value;
	},
	
	// settings get
	get: function(setting){
		if (this.settings[setting]){
			return this.settings[setting];
		}else{
			return false;
		}
	},
	
	// writes all settings in cookies into local varible settings
	_get_all_settings: function(setting){
		var i,x,y,cookies=document.cookie.split(";");
		var patt_mod = new RegExp('mod_(.+)')
		for (i = 0; i< cookies.length; i++)
		{
			x = cookies[i].substr(0, cookies[i].indexOf("="));
			y = cookies[i].substr(cookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g,"");
			// get only mod cookies
			if (res = patt_mod.exec(x)){
				this.settings[res[1]] = y;
			}
		}
	},
	
	// fetches common info for all pages
	_parse:function(){
		// define the variables and how to fetch them from URL
		var reg_exp = new RegExp('');
		var url = unescape(document.location.href);
		var patt = new Array;
		patt['search'] = '/search[:]([^/]+)';
		patt['type'] = '/type[:]([^/]+)';
		patt['page'] = '/page[:]([0-9]+)';
		patt['item'] = '/torrents/([0-9]+)';
		
		for(key in patt){
			eval('this.'+key+' = ""; ');
			reg_exp.compile(patt[key]);
			if (res = reg_exp.exec(url)){
				eval('this.'+key+' = res[1]; ');
			}
		}
	},
	
	_modify_header: function(){
		// STEP 2 - Header
		var header_el = document.getElementById('arena-line-wrapper');
		if (header_el){
			var head_nav = header_el.getElementsByTagName('a');
			var patt_info = new RegExp('span>(.+)');
			
			// remove texts and add them as title
			if (head_nav){
				for(i = 0; i < head_nav.length; i++){
					if (res = patt_info.exec(head_nav[i].innerHTML)){
						head_nav[i].innerHTML = head_nav[i].innerHTML.replace(res[1], '');
						res[1] = res[1].replace(/<[^>]+>/gi, ' ');
						head_nav[i].setAttribute('title', res[1]);
					}
				}
			}
		}
	},
	
	_add_search: function(){
		// STEP 3 - SEARCH ADD
		
		var wrapper = document.getElementById('arena-line-wrapper');
		if (wrapper){
			wrapper.setAttribute('style', 'width: 1000px;');
		}
		var head = document.getElementById('arena-line-ul-nav');
		if (head){
			head.setAttribute('style', 'white-space:nowrap;');
			// search helper parameters
			var search_str = 'http://arenabg.com/torrents/';
			var type_str = '';
			if (j.global.type != ''){
				type_str = '/type:' + j.global.type + '/';
			}
			var function_search_button = 'var search=document.getElementById(\'mod_search\'); if (search && (search.value != \'\')){ document.location.href = \''+search_str+'search:\'+escape(search.value)+\''+type_str+'\'; } return false;';
			var function_search_input = 'if ((this.value.length > 2) && (event.keyCode == 13)){ document.location.href = \''+search_str+'search:\'+escape(this.value)+\''+type_str+'\';}else{return false;}';
			
			// search field
			var li_input = document.createElement('li');
			var search_type = '';
			if (this.type != ''){
				// search type display
				search_type += '<span style="padding: 2px; border: 1px dashed #40CE01; color: #888;">&nbsp;in&nbsp;<span style="color: #FFF; font-weight: bold;">'+this.type+'&nbsp;</span></span>';
			}
			if ((this.type != '') || (j.global.search != '')){
				// clear search
				search_type += '&nbsp;<span style="border: 1px solid #F00; color: #000; background-color: #D00; font-weight: bold; cursor: pointer; padding: 1px;" title="Clear Search" onclick="document.location.href = \'http://arenabg.com/torrents/\';">&nbsp;X&nbsp;</span>&nbsp;';
			}
			li_input.innerHTML = '<div style="white-space:nowrap; border: 1px solid #888; background-color: #000; padding: 1px; margin: 1px 5px;"><input type="text" name="search" id="mod_search" value="'+j.global.search.replace('%', '')+'" onKeyUp="'+function_search_input+'" />'+search_type+'</div>';
			li_input.setAttribute('style', 'border-left: 1px solid #505050; height: 35px; white-space: nowrap;');
			head.appendChild(li_input);
			
			// search button
			var li_search = document.createElement('li');
			li_search.innerHTML = '<a href="" onclick="'+function_search_button+'" style="border: 0; color: #40CE01;">Search</a>';
			head.appendChild(li_search);
			
			// 1080
			var li_1080 = document.createElement('li');
			li_1080.innerHTML = '<a href="#" onClick="document.location.href=\'http://arenabg.com/torrents/search:1080p\'" style="color: #01AECD;" title="List High Definition movies 1080p">1080</a>';
			head.appendChild(li_1080);
			
			// 720
			var li_720 = document.createElement('li');
			li_720.innerHTML = '<a href="#" onClick="document.location.href=\'http://arenabg.com/torrents/search:720p\'" style="color: #F56C5C;" title="List High Definition movies 720p">720</a>';
			head.appendChild(li_720);
		}
	},
	
	// adds settings panel
	_add_settings: function(){
		str = '';
		str += '\n<table border="0" class="header" width="100%"><tr><td>MOD Settings</td><td width="50">';
		str += '<input type="button" value="X" onClick="document.getElementById(\'mod_settings\').style.display = \'none\';" /></td></tr></table>\n';
		//str += '<input type
		
		var settings = document.createElement('div');
		settings.setAttribute('id', 'mod_settings');
		settings.innerHTML = str;
		document.body.appendChild(settings);
	},
}

// modifies item page_advance
J.prototype.mod_item = {
	go: function(){
		// nothing yet
	}
}

// modifies the listing pages
J.prototype.mod_list = {
	list: {},
	header: Array,
	paging: {},
	xmlhttp: {},
	
	go: function(){
		// init set up
		this.header = '';
		
		this.paging.portion = 10;
		this.paging.page_advance = 1;
		
		// get info
		this.parse(document);
		
		// modify the styling of the page
		this.modify();
		
		// more content on one page
		this.load_more_pages(); // MULTI PAGES MORE PAGES
	},
	
	// loading animation
	_build_loading: function(page_number){
		var str = '\n';
		str += '<div class="mod_loading" id="mod_loading">\n';
		str += '<img width="32" height="32" src="'+j.global.loaging_gif+'" />';
		str += '<br />Loading page '+page_number+'... <br /><br />|-----&gt;';
		str += '</div>\n';
		return str;
	},
	
	add_loading: function(page_number){
		var mod_torrents_list = document.getElementById('mod_torrents_list');
		if (mod_torrents_list){
			mod_torrents_list.innerHTML += this._build_loading(page_number);
		}
	},
	
	remove_loading: function(){
		var mod_loading = document.getElementById('mod_loading');
		if (mod_loading){
			mod_loading.parentNode.removeChild(mod_loading);
		}
	},
	
	// called to start page calling and loading process
	load_more_pages: function(){
		// fetch next target
		var target_page = (this.paging.current + this.paging.page_advance);
		if (this.paging.current >= this.paging.last){
			target_page = 0;
		}
		if (target_page % this.paging.portion == 0){
			// reached end of the paging portion
			target_page = 0;
		}
		if (target_page > this.paging.last){
			target_page = 0;
		}
		
		if (target_page > 0){
			// prepare for page load
			var target_url = this.form_paging_url(target_page);
			this.xmlhttp = new XMLHttpRequest();
			if (this.xmlhttp){
				// show loading
				this.add_loading(target_page);
				
				// load next page
				this.paging.page_advance++;
				this.xmlhttp.open("GET",target_url,true);
				this.xmlhttp.send();
				this.xmlhttp.onreadystatechange = function(){ j.mod_list.process_xml(); }
			}
		}
	},
	
	// is called on event of xmlhttp.onreadystatechange to process the received data
	process_xml: function(){
		if ((this.xmlhttp.readyState == 4) && (this.xmlhttp.status == 200)){
			// reset the list
			this.list.torrents = new Array;
			
			// convert to HTML document
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(this.xmlhttp.responseText, "text/html");
			
			// parse new page and populate the torrents list
			this.parse(xmlDoc);
			
			// remove loading animation
			this.remove_loading();
			
			// adding results to the pool
			var mod_torrents_list = document.getElementById('mod_torrents_list');
			if (mod_torrents_list && this.list.torrents.length > 0){
				mod_torrents_list.innerHTML += this._build_torrents_list(this.list.torrents, (this.paging.current + this.paging.page_advance - 1));
			}
			
			// make recursive call to load_more_pages() for nex page load portion
			this.load_more_pages();
		}
	},
	
	// modifies the listing page
	modify: function(){
		page = '';
		
		this._clean_element(document.getElementById('main'));
		this._add_version();
		this._add_style();
		
		var footer = document.getElementById('footer');
		footer.setAttribute('style', 'float: left;');
		
		this._add_scripts();
		this._add_header();
		this._add_torrents();
	},
	
	// parses the site and fetches the needed info
	// xml_document - the current page to be fetched the info
	parse: function(xml_document){
		if(!xml_document){
			return false;
		}
		var i = 0;
		
		// DEBUG
			/*
			var debug = document.createElement('div');
			debug.setAttribute('style', 'background-color: #000; color: #FFF; border: 1px solid #F00; position: absolute; z-index: 2000; top: 50px; right: 0px; width: 400px; padding: 10px;');
			document.body.appendChild(debug);
			debug.innerHTML = ' ';
			debug.innerHTML += '<ol>';
			*/
		// DEBUG END
		
		
		// fetch header
		if (xml_document == document){
			// find containing element
			var header_el = xml_document.getElementById('topcontainer');
			if (header_el){
				this.header = header_el.innerHTML;
			}
		}
		
		// fetch torrents list
		patt = undefined;
		patt = new Array;
		patt['name'] = 'pull-left">([^>^<]+)</a>'; // torrent name
		patt['thumb'] = 'src="([^"]+(posters|zamunda|resize_100|scale_100)[^"]+)"'; // torrent small image
		patt['url'] = 'href=[\'"](/torrents/[^"^\']+/)[\'"] class="pull-left"'; // torrent page
		patt['icon'] = '(http.//91.196.126.51.8081/var/assets/icons/[^"]+)"'; // category icon
		patt['imdb'] = '"(http.//imdb.com/[^"]+)"'; // link to imdb
		patt['catalog'] = 'href="(/catalogue/[^"]+)"'; // link to Arena Catalog
		patt['comments'] = 'href="(/torrents/[^"]+#comments)"'; // link pointing to the comments
		patt['comments_count'] = '#comments">([0-9]+)<img '; // getting the comments number
		patt['flag'] = 'src="([^"]+/flags/bg\.png)"' // bg subtitles
		patt['date'] = '<span title="([0-9]+.[0-9]+.[0-9]+)">'; // torrent date
		patt['date_full'] = '<span title="([0-9]+.[0-9]+.[0-9]+)">'; // torrent date (can't remember why)
		patt['size'] = '<td>([0-9.]+ [A-Z]B)</td>'; // torrent size
		patt['seed'] = '<td>([0-9]+)</td>[^<]+<td>[0-9]+</td>[^<]+<td>[0-9]+</td>';
		patt['leech'] = '<td>[0-9]+</td>[^<]+<td>([0-9]+)</td>[^<]+<td>[0-9]+</td>';
		patt['downloads'] = '<td>[0-9]+</td>[^<]+<td>[0-9]+</td>[^<]+<td>([0-9]+)</td>';
		patt['coppa'] = 'src="(http://91.196.126.51.8080/share/images/site/coppa/[0-9]+.png)"';
		var torrents = xml_document.getElementsByTagName('table');
		if (torrents){
			for(i = 0; i < torrents.length; i++){
				if (torrents[i].getAttribute('id') == 'torrents'){
					this.list.torrents = this._fetch_list(torrents[i], 'tr', patt);
					break;
				}
			}
			
			
			
			// big images add
			this.list.torrents = this.transform_image(this.list.torrents);
			// torrent type recognition
			this.list.torrents = this.recognize_torrent_name(this.list.torrents);
			
			if (this.list.torrents.length == 1 && this.list.torrents[0].name == ''){
				this.list.torrents.length = 0;
			}
		}
		
		if (xml_document == document){
			this.list.no_torrents = '';
			if (this.list.torrents.length == 0){
				this.list.no_torrents = 'No results found';
			}
			
			// STEP 4 - paging
			
			// last page
			this.list.last_page = 1;
			var pages_element = xml_document.getElementById('pager');
			if (pages_element){
				var patt_last_page = new RegExp('page.([0-9]+)">[^<]+</a></li>[^<]+</ul>');
				if (res = patt_last_page.exec(pages_element.innerHTML)){
					this.list.last_page = res[1];
				}
			}
			
			this.list.page_str1 = '';
			this.list.page_str2 = '';
			var patt_page_split = new RegExp('^(.+page[:])[0-9]+(.*)$');
			if (res = patt_page_split.exec(xml_document.location.href)){
				this.list.page_str1 = res[1];
				this.list.page_str2 = res[2];
			}else{
				if (this.list.page_str1.search('/$') < 0){
					this.list.page_str1 = xml_document.location.href + '/page:';
				}else{
					this.list.page_str1 = xml_document.location.href + 'page:';
				}
			}
			this.list.page_str2 = this.list.page_str2.replace('#', '');
			
			// STEP 5 - Header
			
			// get header data
			this.list.torrents_header = new Array;
			var torrents = xml_document.getElementsByTagName('table');
			if (torrents){
				for(i = 0; i < torrents.length; i++){
					if (torrents[i].getAttribute('class') == 'torrents'){
						var row = torrents[i].getElementsByTagName('tr')[0].getElementsByTagName('td');
						if (row.length == 0){
							row = torrents[i].getElementsByTagName('tr')[0].getElementsByTagName('th');
						}
						if (row){
							this.list.torrents_header = new Array;
							for(k = 0; k < row.length; k++){
								this.list.torrents_header[k] = row[k].innerHTML;
							}
						}
						break;
					}
				}
			}
		}
		
		return true;
	},
	
	// torrent type recognition and some style assignment
	recognize_torrent_name: function(list){
		// TODO - improve
		var patt_series = new RegExp('[sS]([0-9]+)[eE]([0-9]+)');
		var patt_boxset = new RegExp('([sS][0-9]+)(-[sS][0-9]+)*')
		var fetch_value = '';
		var fetch_style = '';
		var fetch_title = '';
		
		for(i = 0; i < list.length; i++){
			fetch_value = '';
			fetch_style = '';
			fetch_title = '';
			
			if (res = patt_series.exec(list[i].name)){
				fetch_value = 'S<b>'+res[1]+'</b>E<b>'+res[2]+'</b>';
				fetch_title = 'Series (Season '+res[1]+', Episode '+res[2]+')';
				fetch_style = 'background-color: #555;';
				
				if (list[i].name.search(/720[pi]/i) >= 0){
					fetch_style += ' border: 1px solid #CC0000;';
					fetch_title += ' HD 720p';
				}else if (list[i].name.search(/1080[pi]/i) >= 0){
					fetch_style += ' border: 1px solid #0033CC;';
					fetch_title += ' HD 1080p (1080i)';
				}
			}else if (res = patt_boxset.exec(list[i].name)){
				fetch_value = res[0];
				fetch_title = 'Series Boxet';
				fetch_style = 'background-color: #555;';
				
				if (list[i].name.search(/720[pi]/i) >= 0){
					fetch_style += ' border: 1px solid #CC0000;';
					fetch_title += ' HD 720p';
				}else if (list[i].name.search(/1080[pi]/i) >= 0){
					fetch_style += ' border: 1px solid #0033CC;';
					fetch_title += ' HD 1080p (1080i)';
				}
			}else if (list[i].name.search(/1080[pi]/i) >= 0){
				fetch_value = '1080p';
				fetch_style = 'background-color: #0033CC;';
				fetch_title = 'HD 1080p Movie';
			}else if (list[i].name.search(/720[pi]/i) >= 0){
				fetch_value = '720p';
				fetch_style = 'background-color: #CC0000;';
				fetch_title = 'HD 720p Movie';
			}else{
				if (list[i].name.search(/[. \-]DVDR[. \-]/i) >= 0){
					fetch_value = 'DVDR';
					fetch_style = 'background-color: #006600;';
					fetch_title = 'DVD Image Movie';
				}else if (list[i].name.search(/DVDRip/i) >= 0){
					fetch_value = 'DVD Rip';
					fetch_style = 'background-color: #006633;';
					fetch_title = 'DVD Ripped Movie';
				}else if (list[i].name.search(/TVRip/i) >= 0){
					fetch_value = 'TV Rip';
					fetch_style = 'background-color: #006633;';
					fetch_title = 'Television Ripped Movie';
				}else if (list[i].name.search(/[. \-]hdrip[. \-]/i) >= 0){
					fetch_value = 'HD Rip';
					fetch_style = 'background-color: #006633;';
					fetch_title = 'HD Ripped Movie';
				}else if (list[i].name.search(/[. \-]brrip[. \-]/i) >= 0){
					fetch_value = 'BR Rip';
					fetch_style = 'background-color: #006633;';
					fetch_title = 'BluRay Ripped Movie';
				}else if (list[i].name.search(/[. \-]bluray[. \-]/i) >= 0){
					fetch_value = 'BluRay';
					fetch_style = 'background-color: #006699;';
					fetch_title = 'HD BluRay Movie';
				}else if (list[i].name.search(/[. \-]r5[. \-]/i) >= 0){
					fetch_value = 'R5';
					fetch_style = 'background-color: #006633;';
					fetch_title = 'R5 Movie';
				}else if (list[i].name.search(/[. \-](hd2)*dvd[1-9][. \-]/i) >= 0){
					fetch_value = 'DVD';
					fetch_style = 'background-color: #006633;';
					fetch_title = 'DVD Ripped Movie';
				}else if (list[i].name.search(/[. \-]BDRip[. \-]/i) >= 0){
					fetch_value = 'BD Rip';
					fetch_style = 'background-color: #006633;';
					fetch_title = 'DVD Ripped Movie';
				}else if (list[i].name.search(/[^a-z]cam[^a-z]/i) >= 0){
					fetch_value = 'CAM';
					fetch_style = 'background-color: #330033;';
					fetch_title = 'Camera taken Movie';
				}else if (list[i].name.search(/[^a-z]ts[^a-z]/i) >= 0){
					fetch_value = 'TS';
					fetch_style = 'background-color: #330033;';
					fetch_title = 'Tele Sync';
				}else if (list[i].name.search(/[^a-z]hdts[^a-z]/i) >= 0){
					fetch_value = 'HDTS';
					fetch_style = 'background-color: #330033;';
					fetch_title = 'HD Tele Sync';
				}else if (list[i].name.search(/[^a-z]ppvrip[^a-z]/i) >= 0){
					fetch_value = 'PP View';
					fetch_style = 'background-color: #330033;';
					fetch_title = 'PAy PEr View Ripped Movie';
				}
			}
			
			list[i].fetch_value = fetch_value;
			list[i].fetch_style = fetch_style;
			list[i].fetch_title = fetch_title;
		}
		
		return list;
	},
	
	// transforms thumb URL images to big images URL
	transform_image: function(list){
		if(list){
			var patt_parse = new RegExp('^(.+resize_)[0-9]+x[0-9]+(.+)$');
			
			var i = 0;
			for(i = 0; i < list.length; i++){
				if (res = patt_parse.exec(list[i].thumb)){
					// STEP 6 - resizing
					list[i].image = res[1]+'447x540'+res[2];
				}else{
					list[i].image = '';
				}
			}
		}
			return list;
	},
	
	// forms current URL with custom page number
	form_paging_url: function(page_number){
		return this.list.page_str1+page_number+this.list.page_str2;
	},
	
	_add_version: function(){
		var e = document.getElementsByTagName('td');
		var i = 0;
		if(e){
			var patt = new RegExp('ArenaBG v[0-9].[0-9]');
			for(i = 0; i < e.length; i++){
				if (patt.test(e[i].innerHTML)){
					e[i].innerHTML = 'MOD v'+mod_version+'<span style="color: #888;"> over '+e[i].innerHTML+'</span>';
					break;
				}
			}
		}
	},
	
	// builds torrent list paging
	_build_paging: function(){
		var i = 0;
		var current_page = j.global.page;
		if (!current_page){
			current_page = 1;
		}
		
		var last_page = this.list.last_page;
		if (!last_page){
			last_page = current_page;
		}
		var previous_page = 0;
		var next_page = 0;
		var first_page = 0;
		var last_portion_page = 0;
		
		// calculate previous page
		if (current_page > 1){
			if (current_page <= 10){
				previous_page = 1;
			}else{
				for(i = (current_page - 1); i > 0; i--){
					if (i % this.paging.portion == 0){
						previous_page = i;
						break;
					}
				}
			}
			first_page = 1;
		}
		
		// calculate last portion page
		for(i = last_page; i > 0; i--){
			if (i % this.paging.portion == 0){
				last_portion_page = i;
				break;
			}
		}
		
		// calculate next page
		if (current_page < last_portion_page){
			for(i = 1; i <= last_page; i++){
				if (i % this.paging.portion == 0){
					next_page = i;
					break;
				}
			}
		}
		
		this.paging.first = parseInt(first_page);
		this.paging.last = parseInt(last_page);
		this.paging.current = parseInt(current_page);
		this.paging.previous = parseInt(previous_page);
		this.paging.next = parseInt(next_page);
		this.paging.last_portion = parseInt(last_portion_page);
		
		var str = '<div id="mod_paging">\n';
		str += '<table border="0" width="100%"><tr>\n';
		// backward
		str += '<td class="layout" style="text-align: right;">\n';
		if (current_page == 1){
			// disable
			str += '<div><span title="Go to Prevoius Page">&lt; Previous</span></div>';
			str += '<div><span title="Go to First Page">|&lt;</span></div>\n';
		}else{
			str += '<div><a href="'+this.form_paging_url(previous_page)+'" title="Go to Prevoius Page">&lt; Previous</a></div>';
			str += '<div><a href="'+this.form_paging_url(1)+'" title="Go to First Page">|&lt;</a></div>\n';
		}
		str += '</td>\n';
		// all pages
		str += '<td class="page_holder">\n';
		str += '<table><tr><td>\n';
		str += '<div style="overflow: hidden; height: 100px;" id="paging_scroller">';
		str += '<ul>\n';
		
		for(i = 1; i <= last_page; i++){
			if ((i == 1) || (i % this.paging.portion == 0)){
				if (i == current_page){
					str += '<li class="current_page" id="mod_current_page"><a href="#">'+i+'</a></li>';
				}else{
					s = '';
					if ((i % 1000 == 0) || (i == last_page)){
						s = 'color: #F20;';
					}else if (i % 100 == 0){
						s = 'color: #FC0;';
					}else if (i % 10 == 0){
						s = 'color: #CCC;';
					}
					
					if (s != ''){
						str += '<li class="page"><a href="'+this.form_paging_url(i)+'" style="'+s+'">'+i+'</a></li>';
					}else{
						str += '<li class="page"><a href="'+this.form_paging_url(i)+'">'+i+'</a></li>';
					}
				}
			} // portioning
		}
		str += '</ul>\n';
		str += '</div>\n';
		str += '</td>';
		// show scroll control only when needed
		if (last_page > 100){
			str += '<td>\n';
			str += '<div class="side_scroll" onClick="document.getElementById(\'paging_scroller\').scrollTop = 0;">Top</div>\n';
			str += '<div class="side_scroll" style="height: 25px;" onClick="document.getElementById(\'paging_scroller\').scrollTop -= 70;">&#47;&#92<br /><br />UP</div>\n';
			str += '<div class="side_scroll" style="height: 25px;" onClick="document.getElementById(\'paging_scroller\').scrollTop += 70;">Down<br /><br />&#92&#47;</div>\n';
			str += '<div class="side_scroll" onClick="document.getElementById(\'paging_scroller\').scrollTop = 2000;">Bottom</div>\n';
			str += '</td>';
		}
		str += '</tr></table>';
		str += '</td>\n';
		// forward
		str += '<td class="layout" style="text-align: left;">\n';
		if (next_page > 0){
			str += '<div><a href="'+this.form_paging_url(next_page)+'" class="button" title="Go to Next Page">Next &gt;</a></div>';
		}else{
			// disable
			str += '<div><span title="Go to Next Page">Next &gt;</span></div>';
		}
		if(current_page >= last_portion_page){
			// disable
			str += '<div><span title="Go to Last Page">&gt;|</span></div>';
		}else{
			str += '<div><a href="'+this.form_paging_url(last_portion_page)+'" title="Go to Last Page">&gt;|</a></div>';
		}
		str += '</td>\n';
		str += '</tr></table>\n';
		// end
		str += '</div>\n';
		return str;
	},
	
	_build_torrents_header: function(){
		var str = '';
		var i = 0;
		str += '<table align="center" class="torrents_header"><tr>';
		if (this.list.torrents_header.length > 0){
			for(i = 0; i < this.list.torrents_header.length; i++){
				str += '<td>'+this.list.torrents_header[i]+'</td>';
			}
		}
		str += '</tr></table>';
		str += '<hr style="width: 95%; border: 0; border-bottom: 2px solid #FDB23B; margin-bottom: 20px;" />';
		
		return str;
	},
	
	_add_scripts: function(){
		var js = document.createElement('script');
		var half_width = window.innerWidth / 2;
		
		js.setAttribute('language', 'javascript');
		js.innerHTML = ""
			+"var MODxmlhttp = new XMLHttpRequest();\n"
			+"function mod_zoom_hover(event, url, big_img_src){\n"
			+"	var el = document.getElementById('mod_preview');\n"
			+"	var half_width = window.innerWidth / 2;\n"
			+"	if((event.clientX - half_width) >0){\n"
			+"		el.setAttribute('style', 'left: 20px;');\n"
			+"	}else{\n"
			+"		el.setAttribute('style', 'right: 20px;');\n"
			+"	}\n"
			// TODO - add direct image without XML with check and XML after
			+"	el.style.display = 'table-cell';\n"
			+"	if (MODxmlhttp){\n"
			+"		MODxmlhttp.open('GET', url, true);\n"
			+"		MODxmlhttp.send();\n"
			+"		MODxmlhttp.onreadystatechange = function(){ mod_zoom_ready(); }\n"
			+"	}\n"
			+"}\n"
			+"function mod_zoom_ready(){\n"
			+"	if ((MODxmlhttp.readyState == 4) && (MODxmlhttp.status == 200)){\n"
			+"		var parser = new DOMParser();\n"
			+"		var xmlDoc = parser.parseFromString(MODxmlhttp.responseText, 'text/html');\n"
			+"		var scripts = xmlDoc.getElementsByTagName('script');\n"
			+"		if (scripts){\n"
			+"			var i = 0;\n"
			+"			var patt_img = new RegExp(' src=\"([^\"]+)\"');\n"
			+"			var res = new Array();\n"
			+"			for (i = 0; i < scripts.length; i++){\n"
			+"				if ((scripts[i].innerHTML != '') && (res = patt_img.exec(scripts[i].innerHTML))){\n"
			+"					var el = document.getElementById('mod_preview');\n"
			+"					var eli = document.getElementById('mod_i');\n"
			+"					if(eli && el){\n"
			+"						eli.onload = function(){\n"
			+"							if((this.height / this.width) < (this.parentNode.clientHeight / this.parentNode.clientWidth)){\n"
			+"								this.setAttribute('style', 'max-height: 100%; width: 100%;');\n"
			+"							}else{\n"
			+"								this.setAttribute('style', 'max-width: 100%; height: 100%;');\n"
			+"							}\n"
			+"						};\n"
			+"						eli.src = res[1];\n"
			+"					}\n"
			+"					break;\n"
			+"				}\n"
			+"			}\n"
			+"		}\n"
			+"	}\n"
			+"}\n"
			+"function mod_zoom_hover_out(){\n"
			+"	var eli = document.getElementById('mod_i');\n"
			+"	eli.src = '';\n"//"+j.global.loaging_gif+"';\n"
			+"	eli.removeAttribute('style');\n"
			+"	document.getElementById('mod_preview').style.display = 'none'; \n"
			+"}\n";
		document.body.appendChild(js);
	},
	
	_add_torrents: function(){
		var content = document.getElementById('content');
		if (!content){
			content = document.createElement('div');
			content.setAttribute('id', 'content');
			content.setAttribute('style', 'float: left;');
			content.innerHTML = '';
			document.body.appendChild(content);
		}
		
		var paging = this._build_paging();
		var img_preview = this._build_img_preview();
		////////////// TORRENTS
		content.innerHTML += '<div style="width: 100%; margin: auto;">'
		+'<div style="text-aligh: center; margin-left: 45px; background-color: #505050; width: 250px; padding-left: 20px; color: #000;">ENJOY THE TORRENTS MOD v'+mod_version+'</div>\n'
		+'<div id="mod_torrents" style="float: left;">\n'
		+'<div id="mod_torrents_list">\n'
		// header
		+this._build_torrents_header()
		// list
		+this._build_torrents_list(this.list.torrents, this.paging.current)
		+'</div>\n'
		// Big immages
		+img_preview
		// paging
		+paging
		+'</div></div>\n';
			
		// paging focus
		var current_page = document.getElementById('mod_current_page');
		var paging_scroller = document.getElementById('paging_scroller');
		if (current_page && paging_scroller){
			paging_scroller.scrollTop = (current_page.offsetTop - 40);
		}
	},
	
	// adds recommended torrents at the top and all functionality around it
	_add_header: function(){
		button_show = 'none';
		button_hide = 'block';
		if (j.global.page > 1){
			button_hide = 'none';
			button_show = 'block';
		}
		var content = document.getElementById('content');
		if (!content){
			content = document.createElement('div');
			content.setAttribute('id', 'content');
			content.innerHTML = '';
			document.body.appendChild(content);
		}		
		content.setAttribute('style', 'float: left;');
		
		////////////// HEADER
		content.innerHTML = '\n'
		+'<div id="mod_header">\n'
		+'<div id="mod_header_show" style="display: '+button_show+'; "  onClick="document.getElementById(\'mod_header_container\').style.display = \'block\'; this.style.display = \'none\'; ">[ + ] :: Show</div>\n'
		+'<div id="mod_header_container" style="display: '+button_hide+'; ">'
		+'<div id="mod_header_butt" onClick="document.getElementById(\'mod_header_container\').style.display = \'none\'; document.getElementById(\'mod_header_show\').style.display = \'block\'; ">[ - ] :: Hide</div>\n'
		+this.header+'</div>\n</div>\n';
	},
	
	_build_img_preview: function(){
		var str = '';
		
		str += '<div id="mod_preview"><img id="mod_i" src="'+j.global.loaging_gif+'" /></div>';
		
		return str;
	},
	
	// transforms the list into HTML
	_build_header_list: function(list){
		var str = '';
		if(list.length > 1){
			var i = 0;
			for(i = 0; i < list.length; i++){
				if ((list[i].name) || (list[i].name != '')){
					str += '<div class="mod_item" onClick="document.location.href=\''+list[i].url+'\'">';
					str += '<table width="100%"><tr>';
					if (list[i].thumb == ''){
						str += '<td style="background-color: #444; color: #000; height: 135px;" ><a href="'+list[i].url+'" style="color: #000; ">no image</a></td>';
					}else{
						str += '<td><a href="'+list[i].url+'"><img src="'+list[i].thumb+'" /></a></td>';
					}
					str += '<td> <div style="text-align: left;">';
					str	+= '<img src="'+list[i].icon+'" class="mod_opac" /><br />';
					str += '<img src="http://91.196.126.51:8080/share/images/site/icons/seed.png" style="vertical-align: -35%; "/> '+list[i].seed+'</div><div style="text-align: left;"><img style="vertical-align: -35%; " src="http://91.196.126.51:8080/share/images/site/icons/leech.png" /> '+list[i].leech+'</div>';
					str += '<div class="mod_zoom"';
					// script
					str += ' onmouseover="mod_zoom_hover(event, \''+list[i].url+'\', \''+list[i].img+'\')"';
					str += ' onmouseout="mod_zoom_hover_out()"';
					str += '>zoom</div>';
					if (list[i].flag != ''){
						str	+= '<div style="text-align: left; padding-top: 10px;"><img src="'+list[i].flag+'" /></div>';
					}
					str += '</td></tr></table>';
					str += '<a href="'+list[i].url+'">'+list[i].name.replace(/\./gi, " ")+'</a>';
					str += '</div>\n';
				}
			}
		}
		return str;
	},
	
	// builds the torrents list to HTML
	_build_torrents_list: function(list, page){
		if (list.length == 0){
			return '<div style="text-align: center; "><span style="font-size: 18px; color: #DDD;">No results found</span></div>';
		}
		
		var str = '';
		var i = 0;
		var first = true;
		for(i = 0; i < list.length; i++){
			// exclude service elements
			if (list[i].name != ''){
				if (first){
					str += '<div class="item" style="border-left: 1px solid #FDB23B;" onmouseout="mod_zoom_hover_out()">\n';
					// show page
					str += '<div class="paging">PAGE <span>'+page+'</span> &gt;</div>\n';
					first = false;
				}else{
					str += '<div class="item" onmouseout="mod_zoom_hover_out()">\n';
				}
				str += '<table width="100%"><tr><td width="30%" valign="top">';
				///////////////////////// DETAILS 1
				// zoom
				str += '<div class="mod_zoom"';
				str += ' onmouseover="mod_zoom_hover(event, \''+list[i].url+'\', \''+list[i].img+'\')"';
				str += ' onmouseout="mod_zoom_hover_out()"';
				str += '>zoom</div>\n';
				// torrent type icon
				if (list[i].icon != ''){
					str	+= '<img src="'+list[i].icon+'" class="mod_opac" /><br /><br />';
				}
				// imdb
				if (list[i].imdb != ''){
					str	+= '<div class="imdb" title="Link to imdb.com"><a href="'+list[i].imdb+'">IMDB</a></div>';
				}
				// bg subtitles
				if (list[i].flag != ''){
					str	+= '<img src="'+list[i].flag+'" title="BG Subtitles" />';
				}
				// catalog
				if (list[i].catalog != ''){
					str += '&nbsp;&nbsp;<a href="'+list[i].catalog+'" title="Same title in Arena Catalog"><img src="http://91.196.126.51:8080/share/images/site/catalogue.png" /></a>';
				}
				// parrental control flag
				if (list[i].coppa != ''){
					str	+= '<div style="text-align: right;"><img src="'+list[i].coppa+'" /></div>';
				}
				str += '</td><td>';
				///////////////////////// THUMB IMAGE
				if (list[i].thumb == ''){
					str += '<div style="background-color: #444; color: #000; height: 135px; width: 100px;"><a href="'+list[i].url+'" style="color: #000; ">no image</a></div>';
				}else{
					str += '<a href="'+list[i].url+'"><img src="'+list[i].thumb+'" /></a>';
				}
				str += '</td><td width="30%" valign="top">\n';
				//////////////////////// DETAILS 2
				// type
				str += '<div class="type" style="'+list[i].fetch_style+'" title="'+list[i].fetch_title+'">'+list[i].fetch_value+'</div>\n';
				// comments
				str += '<div style="text-align: left;">';
				if (list[i].comments != ''){
					str += '<a href="'+list[i].comments+'"><img src="http://91.196.126.51:8080/share/images/site/comments.png" style="vertical-align: -35%;" /> '+list[i].comments_count+'</a>';
				}else{
					str += '&nbsp;';
				}
				str += '</div>';
				// seed / leech
				str += '<div style="text-align: left;" title="Seeders: '+list[i].seed+'"><img src="http://91.196.126.51:8080/share/images/site/icons/seed.png" style="vertical-align: -35%; "/> '+list[i].seed+'</div><div style="text-align: left;" title="Leechers: '+list[i].leech+'"><img style="vertical-align: -35%; " src="http://91.196.126.51:8080/share/images/site/icons/leech.png" /> '+list[i].leech+'</div>';
				// downloads
				str += '<div class="mod_downloads_c" title="Downloads: '+list[i].downloads+'"><img src="http://91.196.126.51:8080/share/images/site/icons/arrow_rotate_clockwise.png" style="vertical-align: -35%;" /> '+list[i].downloads+'</div>\n';
				// date
				str += '<div class="date" title="'+list[i].date_full+'">'+list[i].date+'</div>\n';
				// size
				str += '<div class="size">'+list[i].size+'</div>\n';
				str += '</td></tr></table>\n';
				///////////////////////// NAME
				str += '<a href="'+list[i].url+'" class="title">'+list[i].name.replace(/\./gi, " ")+'</a>';
				str += '</div>\n';
			}
		}
			
		return str;
	},
	
	// gets from settings which header to display and returns its CSS value
	_header_display_setting: function(name){
		var header = j.global.get('show_header');
		var patt_validate = new RegExp('mod_HEADER_[0-9]');
		if (!header || !patt_validate.test(header)){
			header = 'mod_HEADER_0';
		}
		
		if (name == header){
			return 'block';
		}else{
			return 'none';
		}
	},
	
	// adds CSS styling to the site
	_add_style: function(){
		var css = document.createElement('style');
		css.innerHTML = "\n"
			+"#mod_settings{\n"
			+"	display: none;\n"
			+"	position: fixed;\n"
			+"	left: 200px;\n"
			+"	right: 200px;\n"
			+"	border: 1px solid #FFF;\n"
			+"	padding: 30px;\n"
			+"	background-color: #AAA;\n"
			+"	color: #000;\n"
			+"}\n"
			+"#content{ width: 100%;}\n"
			+"#mod_settings .header{\n"
			+"	font-weight: bold;\n"
			+"	border-bottom: 1px solid #888;\n"
			+"}\n"
			+"#mod_settings .header input{\n"
			+"	border: 1px solid #D00;\n"
			+"	color: #000;\n"
			+"	background-color: #F00;\n"
			+"	font-weight: bold;\n"
			+"	cursor: pointer;\n"
			+"	padding: 5px;\n"
			+"}\n"
			+"#mod_paging{\n"
			+"	float: left;\n"
			+"	width: 100%;\n"
			+"	text-align: center;\n"
			+"	margin: auto;\n"
			+"	padding: 20px 0px;\n"
			+"}\n"
			+"#mod_paging .layout{\n"
			+"	width: 100px;\n"
			+"}\n"
			+"#mod_paging .layout div{\n"
			+"	margin: 10px 0px 30px 0px;\n"
			+"}\n"
			+"#mod_paging .layout span{\n"
			+"	background-color: #212121;\n"
			+"	color: #888;\n"
			+"	padding: 10px;\n"
			+"	border-top: 1px solid #888;\n"
			+"	font-size: 12px;\n"
			+"	font-weight: bold;\n"
			+"}\n"
			+"#mod_paging .layout a{\n"
			+"	background-color: #212121;\n"
			+"	color: #FFF;\n"
			+"	padding: 10px;\n"
			+"	border-top: 1px solid #FDB23B;\n"
			+"	font-size: 12px;\n"
			+"	font-weight: bold;\n"
			+"}\n"
			+"#mod_paging .layout a:hover{\n"
			+"	background-color: #313131;\n"
			+"	text-decoration: none;\n"
			+"}\n"
			+"#mod_paging .page_holder{\n"
			+"	border-top: 2px solid #FDB23B;\n"
			+"	padding: 0px;\n"
			+"}\n"
			+"#mod_paging .layout a:active{\n"
			+"	background-color: #F00;\n"
			+"	color: #000;\n"
			+"}\n"
			+"#mod_paging li{\n"
			+"	overflow: hidden;\n"
			+"	float: left;\n"
			+"	display: block;\n"
			+"	margin: 2px 0px 0px 2px;\n"
			+"	padding: 9px 0px;\n"
			+"}\n"
			+"#mod_paging .page a{\n"
			+"	padding: 9px;\n"
			+"	background-color: #181818;\n"
			+"	margin: 0;\n"
			+"	text-decoration: none;\n"
			+"	color: #888;\n"
			+"	font-size: 10px;\n"
			+"	-moz-user-select: none;\n"
			+"	-khtml-user-select: none;\n"
			+"	user-select: none;\n"
			+"}\n"
			+"#mod_paging .page a:hover{\n"
			+"	background-color: #505050;\n"
			+"}\n"
			+"#mod_paging .page a:active{\n"
			+"background-color: #F00;\n"
			+"color: #000;\n"
			+"}\n"
			+"#mod_paging li.current_page a{\n"
			+"	padding: 9px;\n"
			+"	background-color: #FC0;\n"
			+"	text-decoration: none;\n"
			+"	color: #000;\n"
			+"	font-size: 10px;\n"
			+"	-moz-user-select: none;\n"
			+"	-khtml-user-select: none;\n"
			+"	user-select: none;\n"
			+"	border-bottom: 1px solid #FC0;\n"
			+"	}\n"
			+"#mod_paging ul{\n"
			+"	position: relative;\n"
			+"	list-style-type: none;\n"
			+"	z-index: 10;\n"
			+"	left: 0px;\n"
			+"	margin: 0px;\n"
			+"	padding: 0px;\n"
			+"}\n"
			+"#mod_paging .side_scroll{\n"
			+"	padding: 4px 5px;\n"
			+"	background-color: #111;\n"
			+"	margin: 1px;\n"
			+"	text-decoration: none;\n"
			+"	color: #888;\n"
			+"	font-size: 8px;\n"
			+"	-moz-user-select: none;\n"
			+"	-khtml-user-select: none;\n"
			+"	user-select: none;\n"
			+"	cursor: pointer;\n"
			+"}\n"
			+"#mod_paging .side_scroll:hover{\n"
			+"	background-color: #333;\n"
			+"}\n"
			+"#mod_paging .side_scroll:active{\n"
			+"	background-color: #F00;\n"
			+"	color: #000;\n"
			+"}\n"
			
			+"#mod_header, #mod_torrents{\n"
			+"	margin: auto;\n"
			+"	margin-top: 0px;\n"
			+"	margin-bottom: 10px;\n"
			+"	border: 1px solid #505050;\n"
			+"	width: 90%;\n"
			+"	padding: 10px;\n"
			+"	background:rgba(0,0,0,0.5);\n"
			+"}\n"
			
			+"#mod_torrents{\n"
			+"	width: auto;\n"
			+"	margin-left: 40px;\n"
			+"	margin-right: 20px;\n"
			+"	text-align: center;\n"
			+"}\n"
			+".torrents_header{\n"
			+"	margin: 0 auto;\n"
			+"}\n"
			+".torrents_header td{\n"
			+"	background-color: #111;\n"
			+"	padding: 5px 25px;\n"
			+"}\n"
			+"#mod_torrents .date{\n"
			+"	padding-top: 3px;\n"
			+"}\n"
			+"#mod_torrents .size{\n"
			+"	padding-top: 10px;\n"
			+"	color: #999;\n"
			+"}\n"
			+"#mod_torrents .paging{\n"
			+"	background-color: #FDB23B;\n"
			+"	position: absolute;\n"
			+"	left: 0px;\n"
			+"	padding: 2px 5px;\n"
			+"	color: #c80;\n"
			+"	font-size: 10px;\n"
			+"}\n"
			+"#mod_torrents .paging span{\n"
			+"	color: #000;\n"
			+"}\n"
			+"#mod_torrents .item, .mod_loading{\n"
			+"	padding: 2px 5px;\n"
			+"	width: 230px;\n"
			+"	height: 200px;\n"
			+"	float: left;\n"
			+"	margin: 0px 0px 5px 8px;\n"
			+"	background-color: #000;\n"
			+"	border: 1px solid #222;\n"
			+"	color: #aaa;\n"
			+"}\n"
			+".mod_loading{\n"
			+"	border-left: 1px solid #FDB23B;\n"
			+"	color: #888;\n"
			+"}\n"
			+".mod_loading img{\n"
			+"	margin: 30px;\n"
			+"}\n"
			+"#mod_header a, #mod_torrents a{\n"
			+"	color: #888;\n"
			+"}\n"
			+"#mod_torrents .title{\n"
			+"	color: #FDB23B;\n"
			+"}\n"
			+"#mod_torrents .imdb{\n"
			+"	background-color: #222;\n"
			+"	border: 1px solid #444;\n"
			+"	color: #FDB23B;\n"
			+"	padding: 2px;\n"
			+"	margin-bottom: 5px;\n"
			+"}\n"
			+"#mod_torrents .imdb a{\n"
			+"	color: #FDB23B;\n"
			+"}\n"
			+"#mod_torrents .type{\n"
			+"	padding: 2px 0px;\n"
			+"	margin-bottom: 7px;\n"
			+"	color: #000;\n"
			+"}\n"
			+"#mod_header ul{\n"
			+"	margin-top: 10px;\n"
			+"}\n"
			+".mod_opac{\n"
			+"	-khtml-opacity:.50; -moz-opacity:.50; -ms-filter:РІР‚Сњalpha(opacity=50)РІР‚Сњ; filter:alpha(opacity=50); opacity:.50;\n"
			+"}\n"
			+"#mod_header .mod_item{\n"
			+"	width: 18%;\n"
			+"	height: 170px;\n"
			+"	float: left;\n"
			+"	margin: 0px 0px 3px 5px;\n"
			+"	background-color: #090909;\n"
			+"	text-align: center;\n"
			+"	color: #888;\n"
			+"	cursor: pointer;\n"
			+"}\n"
			+"#mod_header .mod_item:hover{\n"
			+"	background-color: #101010;\n"
			+"}\n"
			+"#mod_header .mod_menu{\n"
			+"	border-left: 2px solid #FDB23B;\n"
			+"}\n"
			+"#mod_header li{\n"
			+"	background-color: #212121;\n"
			+"	padding: 10px;\n"
			+"	margin-top: 2px;\n"
			+"	color: #888;\n"
			+"	cursor: pointer;\n"
			+"}\n"
			+"#mod_header li:hover{\n"
			+"	background-color: #313131;\n"
			+"}\n"
			+"#mod_header li.mod_chosen{\n"
			+"	background-color: #FDB23B;\n"
			+"	cursor: default;\n"
			+"	color: #000;\n"
			+"}\n"
			+".mod_downloads_c{\n"
			+"	text-align: left;\n"
			+"	margin-top: 5px;\n"
			+"	color: #A5D59B;\n"
			+"	border: 1px solid #444;\n"
			+"	padding: 1px;\n"
			+"	background-color: #000000;\n"
			+"}\n"
			+".mod_zoom{\n"
			+"	margin-bottom: 5px;\n"
			+"	background-color: #333;\n"
			+"	padding: 3px 3px 5px 3px;\n"
			+"	color: #000;\n"
			+"	border: 1px solid #333;\n"
			+"	cursor: -webkit-zoom-in; cursor: -moz-zoom-in;\n"
			+"}\n"
			+".mod_zoom:hover{\n"
			+"    color: #FC0;\n"
			+"    background-color: #555;\n"
			+"    border: 1px solid #FC0;\n"
			+"}\n"
			+"#mod_header_butt, #mod_header_show {\n"
			+"	padding-bottom: 12px;\n"
			+"	cursor: pointer;\n"
			+"	color: #BBB;\n"
			+"}\n"
			+"#mod_search{\n"
			+"	font-size: 14px;\n"
			+"	border: 1px solid #000;\n"
			+"	background-color: #000;\n"
			+"	color: red;\n"
			+"	font-weight: bold;\n"
			+"	padding: 2px;\n"
			+"	margin: 0;\n"
			+"	width: 300px;\n"
			+"}\n"
			+"#mod_preview{\n"
			+"    border: 1px solid #FC0;\n"
			+"    position: fixed;\n"
			+"    z-index: 2001;\n"
			+"    top: 40px;\n"
			+"    width: 45%;\n"
			+"    height: 90%;\n"
			+"	background-color: #000;\n"
			+"    padding: 10px;\n"
			+"    text-align: center;\n"
			+"    vertical-align: middle;\n"
			+"    display: none;\n"
			+"    overflow: hidden;\n"
			+"}\n"
			+"#mod_i{\n"
			+"	border: 1px solid #888;\n"
			+"	display: inline-block;\n"
			+"	margin: auto;\n"
			+"}\n"
			+"#mod_header_container{\n"
			+"    background-color: #000;\n"
			+"    color: #888;\n"
			+"    height: 290px;\n"
			+"}\n"
			+"\n";
		document.body.appendChild(css);
	},
	
	// cleans element contents and the element itself
	_clean_element: function(e){
		e.innerHTML = '';
		e.parentNode.removeChild(e);
	},
	
	// e - the element to see inside
	// iside_tag - which tags hold the listing information , just one item of it
	// patt - the patterns array
	_fetch_list: function(e, inside_tag, patt){
		if (!e){
			return false;
		}
		var tag = e.getElementsByTagName(inside_tag);
		var list = new Array;
		var index = 0;
		var i = 0;
		
		if (tag){
			var pattern = new RegExp('');
			for(i = 0; i < tag.length; i++){
				index = list.length;
				list[index] = this._fetch_list_iteration(tag[i], patt);
			}
		}
		return list;
	},
	
	// e - the element to search with reg expressions in
	// patt - the patterns array
	_fetch_list_iteration: function(e, patt){
		var pattern = new RegExp('');
		list_item = {};
		for(key in patt){
			eval('list_item.'+key+' = "";');
			pattern.compile(patt[key]);
			if (res = pattern.exec(e.innerHTML)){
				eval('list_item.'+key+' = res[1];');
			}
		}
		return list_item;
	},
}

// start the script
var j = new J;
j.init();