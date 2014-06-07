// ==UserScript==
// @name        		Userscripts.org - Inline Fans List
// @version 			0.8.3
// @namespace	http://userscripts.org/scripts/show/35370
// @description		See the list of fans in the same script page
// @include			http://userscripts.org/scripts/show/*
// @include 			http://userscripts.org/topics/*
// @include			http://userscripts.org/scripts/discuss/*
// @include			http://userscripts.org/scripts/reviews/*
// @include			http://userscripts.org/scripts/review/*
// @include			http://userscripts.org/scripts/issues/*
// @include			http://userscripts.org/scripts/admin/*
// @include			http://userscripts.org/scripts/edit/*
// @include			http://userscripts.org/scripts/edit_src/*
// @include			http://userscripts.org/scripts/upload/*
// @include			http://userscripts.org/scripts/images/*
// ==/UserScript==

var $uso = {
	pre_load_fans : false , 
	parse_type : 'paginate',
	//parse_type : 'all-in-one-page',
	_html_root : '//html//body//div[@id="root"]//div[@id="section"]//div[@class="container"]',  
	_fans_anchor_obj : null, 
	_fans_link : null, 
	_fans_count : null, 
	_fans_content_obj : null , 
	
	
	init: function(){
		try { 
			this._fans_anchor_obj = $xpath(this._html_root+'//ul[@id="script-nav"]//li[contains(*/text(),"Fans")]//a').snapshotItem(0) ;  
			this._fans_anchor_obj.innerHTML = '<img src="'+this.images.arrow+'"/> '+this._fans_anchor_obj.innerHTML;
			this._fans_link = this._fans_anchor_obj.href ; 
			this._fans_count = $xpath(this._html_root+'//ul[@id="script-nav"]//li[contains(*/text(),"Fans")]//span[1]').snapshotItem(0).innerHTML ;
			this._fans_anchor_obj.setAttribute('onclick','return false;');
			this._fans_anchor_obj.setAttribute('onfocus','this.blur();');
			this._fans_anchor_obj.addEventListener('click', $uso.toggle_fans_button , false ) ;  
			this.create_fans_content_obj();
			if(this.pre_load_fans){
				this.xmlhttp(this._fans_link, this.parse_response) ;
			}
		} catch(e) {  /* console.log('error: '+e)  ; */ } 
	} , 
	
	create_fans_content_obj : function(){
		var div_scriptinfo_obj = $xpath(this._html_root+'//ul[@id="script-nav"]').snapshotItem(0) ;		
		var div_fans_content_obj = document.createElement("div");
		div_fans_content_obj.setAttribute('style','padding:10px; margin-bottom:0.9em; display:none; font-size:13px; border-bottom:1px solid #cccccc;background-color: #ffffff;');
		div_fans_content_obj.setAttribute('id','fans_content') ; 
		div_fans_content_obj.innerHTML = '<b>Loading fans....</b>';
		div_scriptinfo_obj.parentNode.insertBefore(div_fans_content_obj, div_scriptinfo_obj.nextSibling);
		this._fans_content_obj = $xpath(this._html_root+'//div[@id="fans_content"]').snapshotItem(0) ; 
	} , 
	
	toggle_fans_button : function(){
		$uso._fans_content_obj.style.display == 'none'  ? $uso.show_fans_content() : $uso.hide_fans_content() ; 
	} , 
	
	show_fans_content : function(){
		$xpath(this._html_root+'//ul[@id="script-nav"]//li[contains(*/text(),"Fans")]').snapshotItem(0).setAttribute('style','background-color:#ffffff; border: 1px solid #999999;border-bottom: 0;');
		$uso._fans_anchor_obj.innerHTML = (''+$uso._fans_anchor_obj.innerHTML+'').replace($uso.images.arrow, $uso.images.arrow_down) ; 
		$uso._fans_content_obj.style.display = '' ; 
		if ($uso._fans_content_obj.innerHTML == '<b>Loading fans....</b>') {
			if (($uso._fans_count).match(/^0$/)) { 
				$uso._fans_content_obj.innerHTML = '<b>No fans for this script</b><br/><div id="fans"><p class="favorite"><a onclick="jQuery.ajax({dataType:\'script\', type:\'post\', url:\''+$uso._fans_link.replace('fans','favorite')+'\'}); return false;" href="#" class="add">Favorite this script</a></p></div>'; 
			}
			else {
				$uso.xmlhttp($uso._fans_link, $uso.parse_response) ;
			}
		}		
	},
	
	hide_fans_content : function() {
		$xpath(this._html_root+'//ul[@id="script-nav"]//li[contains(*/text(),"Fans")]').snapshotItem(0).removeAttribute('style');
		$uso._fans_anchor_obj.innerHTML = (''+$uso._fans_anchor_obj.innerHTML+'').replace($uso.images.arrow_down, $uso.images.arrow) ;  
		$uso._fans_content_obj.style.display = 'none';
	},
	
	parse_response: function(response) {
		var fav_container = response.match(/<p class='favorite'>(.*)[\s\S]+this script<\/a><\/p>/ig)
		if(fav_container){
			fav_container = '<div id="fans">'+fav_container[0]+'</div>';
		}
		else {
			fav_container = '';
		}
		var pagination = response.match(/<div class="pagination"(.*?)[\s\S]+<ul/) ;
		response = response.match(/<ul style='-moz-column-count: 4; list-style: none(.*?)[\s\S]+<\/ul>/);
		response[0] = response[0].replace('-moz-column-count: 4', '-moz-column-count: 4;-webkit-column-count: 4');
		if($uso.parse_type == 'paginate'){
			$uso.parse_response_paginate(fav_container, pagination, response);		
		}
		else {
			$uso.parse_response_all_in_one_page(fav_container, pagination, response);
		}
		
	} ,
	
	parse_response_paginate : function(fav_container, pagination, response){
		if (pagination){
			pagination = (''+pagination[0]+'').replace(/<ul$/g,'') ;
			pagination = '<div id="pagination_inline_fans_list">'+pagination+'</div>' ; 
			pagination += '<div id="progress_pagination_inline_fans_list" style="display: none; font-weight: bold; border: 2px solid #FF8800 ; padding: 3px; -moz-border-radius: 8px; -webkit-border-radius: 8px; background-color: #FF9900; color: #ffffff; float: right;margin-top: -35px;"></div>';
		}
		else {
			pagination = '' ; 
		}
			
		$uso._fans_content_obj.innerHTML = fav_container+'<b>Fans for this script:</b>'+pagination+response[0]; 
		if(pagination != ''){
			var pagination_links = $xpath($uso._html_root+'//div[@id="fans_content"]//div[@id="pagination_inline_fans_list"]').snapshotItem(0).getElementsByTagName('a');
			for(a in pagination_links){
				var url = pagination_links[a].getAttribute('href') ; 
				var name = url.match(/\?page=(.*)$/)[1];
				pagination_links[a].addEventListener('click', function(page_url, page_name){ 
						return function(){
							$xpath($uso._html_root+'//div[@id="fans_content"]//div[@id="progress_pagination_inline_fans_list"]').snapshotItem(0).innerHTML = 'Fetching page '+page_name;	
							$xpath($uso._html_root+'//div[@id="fans_content"]//div[@id="progress_pagination_inline_fans_list"]').snapshotItem(0).style.display = '';
							$uso.xmlhttp('http://userscripts.org'+page_url, $uso.parse_response) ;
						};
					}(url, name), false);
				pagination_links[a].setAttribute('onclick','return false;');
				pagination_links[a].setAttribute('onfocus','this.blur();');
			}
		}	
	
	},
	
	parse_response_all_in_one_page : function(fav_container, pagination, response){
		$uso._fans_content_obj.innerHTML = fav_container+'<b>Fans for this script:</b>'+response[0]; 
		if (pagination){
			pagination = (''+pagination[0]+'').replace(/&laquo;|&raquo;|<ul$/g,'') ;
			var parser = new DOMParser();
			var dom = parser.parseFromString(pagination, "text/xml");
			if(dom){
				dom = dom.documentElement ;
				var anchors = dom.getElementsByTagName('a') , i = 0 ;
				for(a in anchors){
					var url = anchors[a].getAttribute('href') ; 
					if(anchors[a].getAttribute('class') != 'next_page' && url){
						i++;
						setTimeout(
							function(page){
								return function(){$uso.xmlhttp('http://userscripts.org'+page, $uso.parse_pagination) ; };
							}(url)
						, 1000 * i );
					}
				}
			}
			dom = null ; 
			parser = null ; 
		}

	},
	
	parse_pagination: function(response){
	response = response.match(/<ul style='-moz-column-count: 4; list-style: none(.*?)[\s\S]+<\/ul>/);
        response[0] = response[0].replace('-moz-column-count: 4', '-moz-column-count: 4;-webkit-column-count: 4');
        $uso._fans_content_obj.innerHTML += '<hr/>'+response[0]; 
	},
	
	images : {
		arrow : 'data:image/gif;base64,R0lGODlhCQAJAJEAAP///5mZmQAAAAAAACH5BAUUAAAALAAAAAAJAAkAAAIRDI4nlroNhGRIzmSp04offxQAOw==',
		arrow_down : 'data:image/gif;base64,R0lGODlhCQAJAJEAAP///5mZmQAAAAAAACH5BAUUAAAALAAAAAAJAAkAAAIQhI+pGuIvAmhQGhpTs3qpAgA7'
	},
	
	xmlhttp : function(myurl,func) { GM_xmlhttpRequest({ method:"GET", url:myurl, headers:{ "User-Agent": navigator.userAgent }, onload: function(response) { func(response.responseText) ; } }) ; }	
}

function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }
(function() {
	$uso.init() ;
})();