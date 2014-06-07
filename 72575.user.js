// ==UserScript==
// @name          MapMyRun with no ads. : )
// @namespace     http://userstyles.org
// @description	  Step 1  Install This Firefox Add-on: https://addons.mozilla.org/en-US/firefox/addon/2108
// @author        EmmmmE
// @homepage      http://userstyles.org/styles/21132
// @include       http://ws.mapmyfitness.com/*
// @include       https://ws.mapmyfitness.com/*
// @include       http://*.ws.mapmyfitness.com/*
// @include       https://*.ws.mapmyfitness.com/*
// @include       http://ws.mapmyfitness.com/route_engine/3.1/engine*
// @include       http://www.mapmyride.com/create_new*
// @include       http://www.mapmyfitness.com/create_new*
// @include       http://www.mapmywalk.com/create_new*
// @include       http://www.mapmyrun.com/create_new*
// @include       http://www.mapmyhike.com/create_new*
// @include       http://www.mapmyrun.com*
// @include       http://www.mapmyride.com*
// @include       http://www.mapmywalk.com*
// @include       http://www.mapmyfitness.com*
// @include       http://www.mapmyhike.com*
// @include       http://www.mapmyride.com/interstitial?txtRedirectURL=%2Fcreate_new
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "ws.mapmyfitness.com" || document.domain.substring(document.domain.indexOf(".ws.mapmyfitness.com") + 1) == "ws.mapmyfitness.com") || (document.location.href.indexOf("http://ws.mapmyfitness.com/route_engine/3.1/engine") == 0) || (document.location.href.indexOf("http://www.mapmyride.com/create_new") == 0) || (document.location.href.indexOf("http://www.mapmyfitness.com/create_new") == 0) || (document.location.href.indexOf("http://www.mapmywalk.com/create_new") == 0) || (document.location.href.indexOf("http://www.mapmyrun.com/create_new") == 0) || (document.location.href.indexOf("http://www.mapmyhike.com/create_new") == 0))
	css += "#mmf_container {\n position:relative;\n top:0px;\n left:-2px;\n}\n\n#welcome_div\n { display: none !important; }\n\n#footer_content\n { display: none !important; }\n\n\n	\n\n\n\n#map_sponsor_ad\n { display: none !important; }\n\n#button-banner-ad\n { display: none !important; }\n\n .map_media_banner_ad \n { display: none !important; }\n\n.ui-resizable5555\n { display: none !important; }\n\n#header_banner \n { display: none !important; }\n\ndiv.map_media_banner_ad div  \n { display: none !important; }\n\n#header_banner div \n { display: none !important; }\n\n#Advertisement \n { display: none !important; }\n\n#header_promo \n { display: none !important; }\n\n#banner_ad_leaderboard \n { display: none !important; }\n\ndiv href  \n { display: none !important; }\n\n#header.div a  \n { display: none !important; }\n\n#leaderboard_ad \n { display: none !important; }\n\n#mmf_copywrite \n { display: none !important; }\n\n#banner_ad_leaderboard \n{ display: none !important; }\n\n#banner_ad_footer \n{ display: none !important; }\n\n#leaderboard_ad \n{ display: none !important; }\n\ndiv.leaderboard_ad \n{ display: none !important; }\n\n#header .leaderboard_ad \n{ display: none !important; }\n\n#welcome_banner_ad \n{ display: none !important; }\n\n#map_sponsor_ad \n{ display: none !important; }\n\n#button-banner-ad\n{ display: none !important; }\n\n.map_media_banner_ad \n{ display: none !important; }\n\n\n\n\n\n#header {\n  padding: 0;\n  margin: 0;\n  position: absolute;\n  top: 0px;    \n  left: 0px;\n  width: 100%;\n  height: 93px;\n  overflow: hidden;\n\n}\n\n\n\n\n#map_engine_container {\n position:relative;\n top:89px;\n left:0px;\n}\n\n\n#footer {\n position:relative;\n top:90px;\n left:0px;\n}";
if (false || (document.location.href.indexOf("http://www.mapmyrun.com") == 0) || (document.location.href.indexOf("http://www.mapmyride.com") == 0) || (document.location.href.indexOf("http://www.mapmywalk.com") == 0) || (document.location.href.indexOf("http://www.mapmyfitness.com") == 0) || (document.location.href.indexOf("http://www.mapmyhike.com") == 0))
	css += "#header_banner { display: none !important; }\n#Advertisement { display: none !important; }\n.banner_ad { display: none !important; }\n.homepage_promo { display: none !important; }\n#banner_ad_footer { display: none !important; }\n#mmf_copywrite { display: none !important; }\n#mmf_sponsored_links { display: none !important; }\ndiv .mmf_vertical_banner_ad { display: none !important; }\n\n \n\n\n#header {\n  padding: 0;\n  margin: 0;\n  top: 0px;    \n  left: 0px;\n  width: 100%;\n  height: 94px;\n  overflow: hidden;\n\n}\n\n\n\n\n\n\n#logo5555\n{\nposition:absolute;\nleft:1036px;\ntop:17px;\n}\n\n\n\n\n  img[src=\"http://static.mapmyfitness.com/www/10559/images/tell_a_friend.png\"],\n\n  img[src=\"http://static.mapmyfitness.com/www/10559/images/bg_become_member_red.gif\"],\n\n  img[src=\"http://static.mapmyfitness.com/www/10559/images/btn_become_a_member.png\"] {\n\n    display: none;\n\n  }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();














if(document.location.href.indexOf("http://www.mapmyride.com/interstitial?txtRedirectURL=%2Fcreate_new") > -1)

 {
  if (document.location.href.indexOf("autos") > -1) 

    {
    document.location.replace("http://www.mapmyride.com/create_new");
    } 
else 
  
 
        {
    document.location.replace("http://www.mapmyride.com/create_new");
        }


  }


if(document.location.href.indexOf("http://www.mapmyrun.com/interstitial?txtRedirectURL=%2Fcreate_new") > -1)

{
    document.location.replace("http://www.mapmyrun.com/create_new");
    } 


if(document.location.href.indexOf("http://www.mapmyfitness.com/interstitial?txtRedirectURL=%2Fcreate_new") > -1)

{
    document.location.replace("http://www.mapmyfitness.com/create_new");
    } 

if(document.location.href.indexOf("http://www.mapmywalk.com/interstitial?txtRedirectURL=%2Fcreate_new") > -1)

{
    document.location.replace("http://www.mapmywalk.com/create_new");
    } 
if(document.location.href.indexOf("http://www.mapmyhike.com/interstitial?txtRedirectURL=%2Fcreate_new") > -1)

{
    document.location.replace("http://www.mapmyhike.com/create_new");
    } 





