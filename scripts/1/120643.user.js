// ==UserScript==
// @name           Boot.lv Ad Remover
// @version        0.0.1
// @namespace      http://boot.lv
// @description    Removes ads from boot.lv
// @match          http://*.boot.lv/*
// @include        http://*boot.lv/*
// @exclude        http://*.boot.lv/forums/*
// ==/UserScript==
 
(function(){
 
  /**
   * Hide all the elements within the supplied array
   * @param {Array} elements An array of html nodes you want to hide
   * @return void
   */
  var hideElements = function(elements) {
    for(var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
 
  /**
   * Get the elements for a classname, only if the
   *   document.getElementsByClassName method exists
   * @param {String} classname The name of the class
   * @return {Array} The elements with the classname
   * @type String|Object|Array|Boolean|Number
   */
  var getElementsByClassName = function(classname) {
    if(document.getElementsByClassName) {
      return document.getElementsByClassName(classname);
    }
  }
 
  /**
   * Select elements defined with a specific pattern
   *   (This is only supported since firefox 3.5)
   * @param {String} selector The pattern you want the elements for
   * @returns The elements with the pattern
   */
  var querySelectorAll = function(selector){
    if(document.querySelectorAll){
      return document.querySelectorAll(selector);
    }
  }
 
  // Get all iframes and hide them
  var iframes = document.getElementsByTagName("iframe");
  hideElements(iframes);
 
    
    /*


	<script type="text/javascript">
		(function(){
		if(window.smartad_space)smartad_space+=',807';
		else{smartad_space='807';
		var f=function(){var h=document.getElementsByTagName('head')[0],s=document.createElement('script');
		s.src=location.protocol+unescape('//ad.smartad.lv/script.php%3fv=2%26space=')+smartad_space+unescape('%26refurl=')+escape(document.referrer)+unescape('%26pageurl=')+escape(document.location);
		h.insertBefore(s, h.firstChild);}
		if(window.addEventListener)window.addEventListener('load',f,false);
		else if(window.attachEvent)window.attachEvent('onload',f);
		}})();
	</script>


zem class level_3 ->>>>>>>>>>>>>
				<div class="text" style="font-weight:bold;font-size:14px;">
					<script type='text/javascript'><!--//<![CDATA[
					   var m3_u = (location.protocol=='https:'?'https://ads.boot.lv/www/delivery/ajs.php':'http://ads.boot.lv/www/delivery/ajs.php');
					   var m3_r = Math.floor(Math.random()*99999999999);
					   if (!document.MAX_used) document.MAX_used = ',';
					   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
					   document.write ("?zoneid=12&amp;target=_blank&amp;charset=UTF-8");
					   document.write ('&amp;cb=' + m3_r);
					   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
					   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
					   document.write ("&amp;loc=" + escape(window.location));
					   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
					   if (document.context) document.write ("&context=" + escape(document.context));
					   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
					   document.write ("'><\/scr"+"ipt>");
					//]]>--></script>
				</div>
*/
    
    
    
  // Get all the ads and hide them
  var ads = getElementsByClassName("top_header_wrapper");
  hideElements(ads);
 
  // Get all the spons links and hide them
  ads = getElementsByClassName("hd_w");
  hideElements(ads);
 
    
      // Get all the spons links and hide them
  ads = getElementsByClassName("ad_250x250_w");
  hideElements(ads);
    
    
         // Get all the spons links and hide them
  ads = getElementsByClassName("bootlv_recommends bootlv_recommends_closed");
  hideElements(ads);
    



  // Define all the selectors that we want to hide and hide them
  var queryselectors = querySelectorAll('div[id^="aptauja_4"], '
//    + 'a[href*="ibario.com"], a[href*="http://facemoods.com/"] , '
//    + 'a[href*="http://download.premium.netdna-cdn.com/"], '
//    + 'a[href*="http://soda.adserver-pro.net/pb"], '
//    + 'a[href*="http://premiumdownloads.info"], '
    + '[href*="kredits365.lv"], '
    + 'div[id^="shop-item"]');
  hideElements(queryselectors);
 
})();