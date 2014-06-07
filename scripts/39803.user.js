// ==UserScript==
// @name           Remove fan page stories
// @namespace      http://after-party.co.cc?rfps
// @description    Removes fan page stories from your Facebook newsfeed
// @include        http://*.facebook.com/home.php*
// @version        0.1
// ==/UserScript==

nc=0;
unsafeWindow.onafterloadRegister(function(){
	interv=unsafeWindow.setInterval(removeFanpages=function(){
		story=document.getElementById("newsfeed_wrapper").getElementsByTagName("div");

		c=0;
		Array.forEach(story,function(s,i){
			if((did=s.getAttribute("id")) && (did.indexOf("div_story")==0) && (dcl=s.getAttribute("class"))&&(dcl.indexOf("fbpage_fan")>-1)){

				s.parentNode.removeChild(s);
				c++;
			}
		});
		if(c==0){
			nc++;
		}else{
			nc=0;
		}
		if(nc>10){
			clearInterval(interv);
		}
	},500);

});



