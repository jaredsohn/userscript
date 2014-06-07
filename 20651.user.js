// ==UserScript==
// @name           Webwereld Clean 0.1
// @namespace      WebwereldClean
// @description    Webwereld zonder advertenties en intelliTxt
// @include        http://www.webwereld.nl/*
// @include        http://webwereld.nl/*
// ==/UserScript==

addEventListener('load', function(event) {

	  var docwrapper = document.getElementById('wrapper');
	  var topbanners =  document.getElementById('leaderBoard');
	
	
		// Verwijder top banner(s)
	  if(topbanners) {
		  var new_topbanner = document.createElement('div');
			  new_topbanner.innerHTML = 'Cleaned by CoolJet';
			  new_topbanner.id = 'cleanedby';
			  
		  //docwrapper.removeChild(topbanners);
		  docwrapper.replaceChild(new_topbanner,topbanners);
		  
		  
	  }
	  
	  
	  
	  // Verwijder add in midden van de pagina
	  var page_ad = document.getElementById('Banner336x280Div');
	  
	  if(page_ad) {
		  var page_ad_parent = page_ad.parentNode
		  page_ad_parent.removeChild(page_ad);
	  }
	  
		var docwrapper = document.getElementById('wrapper');
  
	  // Verwijder google ads aan de linker kant
	  var iframes = docwrapper.getElementsByTagName('iframe');
	  
	  for(i=0;i<iframes.length;i++) {
		  if(iframes[i].name == 'google_ads_frame') {
			  		  var iframe_parent = iframes[i].parentNode;
						  iframe_parent.removeChild(iframes[i]);
		  }
	  }
	  
	  
	  
	  // Verwijder google ads boven de reacties
	  
	  var google_bottom = document.getElementById('middle');
	  if(google_bottom) {
	  	  google_bottom_divs = google_bottom.getElementsByTagName('div');
		  
		  google_bottom.removeChild(google_bottom_divs[6]);
	  }

	var intelliTXT_div = document.getElementById('intelliTXT');
	if(intelliTXT_div) {
		var intelliTXT_parent = intelliTXT_div.parentNode;
			
		var no_intelliTXT_div = document.createElement('div');
			no_intelliTXT_div.className = 'bodyText';
			no_intelliTXT_div.innerHTML = intelliTXT_div.innerHTML;
			
			intelliTXT_parent.replaceChild(no_intelliTXT_div,intelliTXT_div);
	/*		
		var intro = document.getElementsByTagName('div');
		
			for(i=0;i<intro.length;i++) {
				
				if(intro[i].className=='intro') {
						var intro_div = intro[i];
						break;
				}
				
			}
		
		var intelliTXT_div = intro_div
		var intelliTXT_parent = intelliTXT_div.parentNode;
			
		var no_intelliTXT_div = document.createElement('div');
			no_intelliTXT_div.className = 'bodyText';
			no_intelliTXT_div.innerHTML = intelliTXT_div.innerHTML;
			
			intelliTXT_parent.replaceChild(no_intelliTXT_div,intelliTXT_div);
		*/
	}


      function getObjectCss() {
         var css = null;
         try {
            css = document.styleSheets[0];
            if (!css) {
               var head = document.getElementsByTagName("head").item(0);
               head.appendChild(document.createElement("style"));
               css = document.styleSheets[0];
            }
         } catch (ex) {
            css = document.createStyleSheet("styles.css");
         }
         return css;
      }

      function changeCssRule(css, selector, rule) {
      	if (css.insertRule) { // ff
      		css.insertRule(""+selector+" { "+rule+" }", css.cssRules.length);
      	} else if(css.addRule) { // ie
            css.addRule(selector, rule);
      	}
      }
	  
	     var css = getObjectCss();
         changeCssRule(css, "#cleanedby", "background-color:#eef2f7; border-left:1px solid #000; border-right:1px solid #000; text-align:center");
		
	}, false);	