// ==UserScript==
// @name           Knmi.nl With No Javascript
// @namespace     http://userscripts.org/scripts/show/24333
// @version	0.6
// @description    This script will eliminate the need of Javascript for seeing weather forecasts on Knmi.nl (Handy if you have NoScript extension on)
// @include        http://www.knmi.nl/
// @include        http://knmi.nl/
// ==/UserScript==

var $knmi = {
	init : function(){
		$xpath('/html/body/div/div[2]/div/div/table/tbody/tr/td/table/tbody/tr/td[6]').snapshotItem(0).innerHTML += this.draw_iframe();
		//$xpath('/html/body/div/div[2]/div/div/table/tbody/tr/td/table/tbody/tr/td[6]').snapshotItem(0).innerHTML += '<iframe scrolling="no" src="/neerslagradar/homepage.html" height="315" width="220" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" title="neerslagradar"/>';
	},
	
	draw_iframe : function(){
		return '<iframe height="325" width="225" frameborder="0" src ="/'+this.map_page()+'.html" />';
	},
	
	map_page : function() {
		var now = new Date(), hour = now.getUTCHours(), page_name = '';
		if (hour < 01 || hour > 15) {
			page_name = 'short_term_morgen1_radar' ;
		}
		else {
			if (hour > 00 && hour < 05) {
				page_name = 'short_term_vandaag1_radar' ;
			}
			else {
				page_name = 'short_term_vandaag2_radar' ;
			}
 		}
		return page_name ;
	}

}

function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }

(function(){
	try{
		$knmi.init();
	}
	catch(e){
		/* console.log(e) */;	
	}

})();