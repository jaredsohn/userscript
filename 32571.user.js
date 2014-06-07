// ==UserScript==
// @name	Digg autobury top diggers submissions
// @namespace	http://userscripts.org/scripts/show/22300
// @description	Automatically bury Digg submissions based on user name or keyword. Add users to 'var users_blacklist' and keywords to 'var keywords_blacklist' at the beginning of this script.
// @include	http://digg.com/*
// @include	http://www.digg.com/*

// ==/UserScript==
//var users_blacklist = /GIMAD2008|mklopez|supernova17|schestowitz|mrbabyman|msaleem|digidave|zaibatsu/ig;
var users_blacklist = /MrBabyMan|msaleem|zaibatsu|MakiMaki|supernova17|digitalgopher|mklopez|CLIFFosakaJAPAN|skored|p9s50W5k4GUD2c6|gwjc|aaaz|bonlebon|webtech|Aidenag|chrisek|tomboy501|koregaonpark|BloodJunkie|webtickle|jaybol|dirtyfratboy|IvanB|pizzler|snipehack|badwithcomputer|FameMoney|cosmikdebris|maheshee11|Burento|SirPopper|curtissthompson|3monkeys|TalSiach|parislemon|suxmonkey|wayjer|Bukowsky|sepultura|capn_caveman|Gregd|tommytrc|optimusprime01|Alexius|johndi|diggleague|charbarred|DigiDave|1KrazyKorean|insaincain02|Mediasight/ig;
var keywords_blacklist = /reddit.com/ig;
var bury_interval = 5 ; //<--- 5 means 5 seconds delay between each bury!

var $AutoBuryStories = {
	show_infobar : true ,
	html_root : '//html//body//div[@id="container"]//div[@id="contents"]//div[@id="wrapper"]',
	init: function(){
		try {
			var enclosures = $xpath(this.html_root+'//div[contains(@id,"enclosure")]') ;
			if (!enclosures) { return ; }
			if (enclosures.snapshotLength == 1) { 
				this.bury_single_item(enclosures) ; 
			}
			else {
				this.bury_items(enclosures)	
			}
		} 
		catch(e){ /* alert(e) ;  */ }
	},
	
	bury_single_item: function(enclosures){
		if (!($xpath(this.html_root+'//div[@id="enclosure1"]//ul//li[@id="diglink1"]').snapshotItem(0).innerHTML).match(/buried|dugg/ig)) {	
			//var username1 = ($xpath(this.html_root+'//div[@id="enclosure1"]//div[@class="news-details"]//dl//dd[2]//a').snapshotItem(0).href).replace(/(.*)\/users\//,'');
			var username1 = ($xpath(this.html_root+'//div[@id="enclosure1"]//div[@class="news-details"]//span[2]//a').snapshotItem(0).href).replace(/(.*)\/users\//,'');
			//var link_content1 = $('enclosure1').getElementsByTagName('p')[0] ? ($('enclosure1').getElementsByTagName('p')[0]).innerHTML : $('enclosure1').getElementsByTagName('div')[0].innerHTML;  
			
			var link_content1 = $xpath(this.html_root+'//div[@id="enclosure1"]//div').snapshotItem(0).innerHTML ;
			if (username1.match(users_blacklist) || link_content1.match(keywords_blacklist)){
				var bury_func1 = $xpath(this.html_root+'//div[@id="enclosure1"]//div[@class="bury tool"]//a').snapshotItem(0).href ; 
				window.setTimeout(''+bury_func1+'',1);
						
			}
		}
	},
	
	bury_items: function(enclosures){
		var buried = 0 ;
		var delay = 0 ;
		var txt_tmp = '';
		bury_interval = bury_interval * 1000 ; 
		for(var i=0, k=enclosures.snapshotLength; i<k; i++){
			if (!($xpath(this.html_root+'//div[@id="enclosure'+i+'"]//ul//li[@id="diglink'+i+'"]').snapshotItem(0).innerHTML).match(/buried|dugg/ig)) {	
				var username = ($xpath(this.html_root+'//div[@id="enclosure'+i+'"]//span[@class="tool user-info"]//a').snapshotItem(0).href).replace(/(.*)\/users\//,'');
				//var link_content = $('enclosure'+i).getElementsByTagName('p')[0] ? ($('enclosure'+i).getElementsByTagName('p')[0]).innerHTML : $('enclosure'+i).getElementsByTagName('div')[0].innerHTML;  
				var link_content = $xpath(this.html_root+'//div[@id="enclosure'+i+'"]//div').snapshotItem(0).innerHTML ;
				if (username.match(users_blacklist) || link_content.match(keywords_blacklist) ){
					$xpath(this.html_root+'//div[@id="enclosure'+i+'"]').snapshotItem(0).style.display = 'none'; 
					var bury_func = $xpath(this.html_root+'//div[@id="enclosure'+i+'"]//div[@id="burytool'+i+'"]//a').snapshotItem(0).href ; 
					//--> old digg:
					// var link = $xpath(this.html_root+'//div[@id="enclosure'+i+'"]//div[@class="news-body"]//h3[@id="title0"]//a').snapshotItem(0) ;
					//--> new digg:
					var link = $xpath(this.html_root+'//div[@id="enclosure'+i+'"]//div[@class="news-body"]//h3[1]//a').snapshotItem(0) ;
					var comments = $xpath(this.html_root+'//div[@id="enclosure'+i+'"]//div[@class="news-details"]//a').snapshotItem(0) ; 
					//var user_icon = $xpath(this.html_root+'//div[@id="enclosure'+i+'"]//img[@class="user-photo"]').snapshotItem(0).src ;
					buried++ ;
					delay = buried * bury_interval == bury_interval ? 1 : buried * bury_interval  ; 
					if (this.show_infobar){
						// <img width="16" height="16" style="border:1px solid #CCCCCC;vertical-align:-5px;" src="'+user_icon+'" />
						txt_tmp += '<span id="autobury_info'+buried+'"><b>Waiting...</b></span> <a href="'+comments.href+'">'+(link.innerHTML).replace(/<span[^>]*>(.*?)<\/span>/ig,'')+'</a> &nbsp;<a title="original link" href="'+link.href+'" target="_blank"><img src="'+this.images.external+'" border="0"/></a> - submitted by <a href="/users/'+username+'/"> '+username+'</a><br/>';						
						window.setTimeout('$("autobury_info'+buried+'").innerHTML="Working...";'+bury_func+';window.setTimeout(\'$("autobury_info'+buried+'").innerHTML="Buried."\',1000);', delay );
					}
					else {
						window.setTimeout(''+bury_func+'', delay );
					}
					
				}
			}
		}
		if (buried > 0){
			this.print_infobar(txt_tmp)
		}
	},
	
	print_infobar : function(txt_tmp){
		if (this.show_infobar){
			txt_tmp = '<b>Autobury Submissions:</b><br/>'+txt_tmp ; 
			$xpath('//html//body//div[@id="container"]//div[@id="footer"]//div[@class="footer-contents"]').snapshotItem(0).innerHTML += '<div id="autobury_info_wrapper"  style="width:80%;line-height:1.6;color:#556C31;background-color:#FFF8CE;margin:5px 0 0 0;float:left;padding:5px 10px;border: 1px dotted #2E6AB1"></div>';
			$xpath('//html//body//div[@id="container"]//div[@id="footer"]//div[@class="footer-contents"]//div[@id="autobury_info_wrapper"]').snapshotItem(0).innerHTML = txt_tmp ;			
		}
		
	},
	images : {
		external : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC' ,	
	}

}

function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }
(function() {
	$AutoBuryStories.init();
})();