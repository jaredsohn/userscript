// ==UserScript==
// @name           eBay Product Permalink
// @namespace      http://userscripts.org/scripts/show/91344
// @version        0.1.3
// @description    Show a permalink for products on eBay
// @include        http://cgi.ebay.tld/*
// @include	http://www.ebay.tld/*
// ==/UserScript==

(function(){
	var ebay_permalink = {
		init : function(){
			var all_anchors = document.getElementsByTagName('a');
			for(var i = 0, k = all_anchors.length; i < k ; i++){
				if((''+all_anchors[i].href).match('print=all')){
					this.create_permalink_element(all_anchors[i]);  
					break ; 
				}
			}
		},
		
		create_permalink_element : function(a){
			var perma = document.createElement('a');
			var item_number = this.qs('item', a.href);
			perma.href = this.make_link(item_number);
			perma.innerHTML = 'PermaLink';
			perma.setAttribute('style', 'margin: 0 10px;');
			perma.setAttribute('title', 'Permanent link for item no. '+item_number);
			perma.setAttribute('target', '_blank');
			a.parentNode.insertBefore(perma, a); 
		},
		
		make_link : function(item_number){
			return document.location.protocol+'//'+document.location.hostname+'/itm/'+item_number;
		},
		
		qs: function(key, str){
			if(!str){
				str = window.location.search.substring(1);
			}
			var parts = str.split('&');
			for (var i = 0, k = parts.length; i < k; i++) {
				var param = parts[i].split('=');
				if (param[0] == key) {
					return param[1];
				}
			}
			return '';
		}
	}
	ebay_permalink.init();
})();