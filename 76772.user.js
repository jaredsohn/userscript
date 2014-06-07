
// ==UserScript==
// @name          ihudong
// @namespace     http://userstyles.org
// @description	  互动空间自动关注
// @version		  1.0
// @author        songdenggao@gmail.com
// @include       http://i.hudong.com/*
// ==/UserScript==
 
(function() {  
	var load = function() {  
			var scriptTag = document.createElement('script');  
			scriptTag.src = 'http://10.0.0.88/castor/jquery.js';  
			scriptTag.type = 'text/javascript';  
			document.getElementsByTagName('head')[0].appendChild(scriptTag);  

			load = function() {  
				if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(load,100); }  
				else { $ = unsafeWindow.jQuery; main(); }  
			};  
			
			return load();  
	}; 
	
	load();  

	function main() {  
		///profile.do?useriden=zAQNWX1leVEFcXnsB
	 	$("a").each( function(){
					var href=this.href;
					var start= href.indexOf("useriden=");
					if(start!=-1){
						useriden=href.substring(start+9,href.length);
						$.get("http://i.hudong.com/ajaxChangeFollowRelation.do?relationFlag=1&followUserIdEn="+useriden); 
					}
			}
		); 
	}


})();