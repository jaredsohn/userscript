// ==UserScript==
// @name        TrollHider
// @namespace   TrollHider
// @include     http://www.linkomanija.net/forums*
// @version     1.4
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant  GM_xmlhttpRequest
// @grant  GM_getValue
// @grant  GM_setValue
// ==/UserScript==
jQuery.noConflict();

function updateSource() {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://pastebin.com/raw.php?i=dfzCnEcC",
	  synchronous:    true,
	  onload: function(response) {
	  	GM_setValue("TH_nicks", response.responseText); 
	  } 
	});
}
var includeNicksText = GM_getValue("TH_includeNicks","none0,none1,none2");
var excludeNicksText = GM_getValue("TH_excludeNicks","none0,none1,none2");
var includeNicks = includeNicksText.split(",");
var excludeNicks = excludeNicksText.split(",");


var lastSource = GM_getValue("TH_lastSource", 0);
if(lastSource!=new Date().getDay()) {
	updateSource();
	GM_setValue("TH_lastSource",new Date().getDay());
}
var HidePost = GM_getValue("TH_HP_enabled", true);
var fullHidePost = GM_getValue("TH_fHP_enabled", false );
var HideTopic = GM_getValue("TH_HT_enabled", true);
var fullHideTopic = GM_getValue("TH_fHT_enabled", false);
var greyOutPost = GM_getValue("TH_greyoutPost", false);
var greyOutTopic = GM_getValue("TH_greyoutTopic", false);
var loadSource = GM_getValue("TH_loadSource", true);
var enabled = GM_getValue("TH_enabled", true );
var nicks = GM_getValue("TH_nicks", "").split(", ");

	jQuery("h1").after("<span id=\"TrollHider_toggle\"><b>*TrollHider nustatymai</b></span>");
	jQuery("#TrollHider_toggle").after("<div style=\"display:none; \"id=\"TrollHider\"></div>");
	jQuery("#TrollHider").html("Įjungti TrollHider: <input id=\"TrollHider_enabled\" type=\"checkbox\">");
	jQuery("#TrollHider_enabled").attr("checked",enabled);
	jQuery("#TrollHider").append("<br/>Atnaujinti sąrašą iš šaltinio:  <input id=\"TrollHider_loadSource\" type=\"submit\" value=\"Atnaujinti\">  ");

	jQuery("#TrollHider").append("<br/>Slėpti pranešimus:  <input id=\"TrollHider_HidePost\" type=\"checkbox\">");
	jQuery("#TrollHider_HidePost").attr("checked",HidePost);
	jQuery("#TrollHider").append(" Pilkinti pranešimus (nebus slėpiami, slėpimas turi būti įjungtas):  <input id=\"TrollHider_greyOutPost\" type=\"checkbox\">");
	jQuery("#TrollHider_greyOutPost").attr("checked",greyOutPost);
	jQuery("#TrollHider").append(" Pilnai slėpti pranešimus:  <input id=\"TrollHider_fullHidePost\" type=\"checkbox\">");
	jQuery("#TrollHider_fullHidePost").attr("checked",fullHidePost);

	jQuery("#TrollHider").append("<br/>Slėpti temas:  <input id=\"TrollHider_HideTopic\" type=\"checkbox\">");
	jQuery("#TrollHider_HideTopic").attr("checked",HideTopic);
	jQuery("#TrollHider").append(" Pilkinti temas (nebus slėpiami, slėpimas turi būti įjungtas):  <input id=\"TrollHider_greyOutTopic\" type=\"checkbox\">");
	jQuery("#TrollHider_greyOutTopic").attr("checked",greyOutTopic);
	jQuery("#TrollHider").append(" Pilnai slėpti temas:  <input id=\"TrollHider_fullHideTopic\" type=\"checkbox\">");
	jQuery("#TrollHider_fullHideTopic").attr("checked",fullHideTopic);

	jQuery("#TrollHider").append("<br/>Papildomi nariai (atskirti kableliais):  <input id=\"TrollHider_includeNicks\" type=\"text\" value=\""+includeNicksText +"\"><input id=\"TrollHider_includeNicks_sub\" type=\"submit\" value=\"Atnaujinti\"> ");
	jQuery("#TrollHider").append("<br/>Pašalinti iš ignoruojamų (atskirti kableliais):  <input id=\"TrollHider_excludeNicks\" type=\"text\" value=\""+excludeNicksText +"\"><input id=\"TrollHider_excludeNicks_sub\" type=\"submit\" value=\"Atnaujinti\"> ");
	jQuery("input[id^=TrollHider]").click(function() {
		if(this.id == "TrollHider_enabled") GM_setValue("TH_enabled", !enabled);
		else if(this.id == "TrollHider_fullHidePost") GM_setValue("TH_fHP_enabled", !fullHidePost);
		else if(this.id == "TrollHider_fullHideTopic") GM_setValue("TH_fHT_enabled", !fullHideTopic);
		else if(this.id == "TrollHider_HideTopic") GM_setValue("TH_HT_enabled", !HideTopic);
		else if(this.id == "TrollHider_HidePost") GM_setValue("TH_HP_enabled", !HidePost);
		else if(this.id == "TrollHider_greyOutPost") GM_setValue("TH_greyoutPost", !greyOutPost);
		else if(this.id == "TrollHider_greyOutTopic") GM_setValue("TH_greyoutTopic", !greyOutTopic);
		else if(this.id == "TrollHider_loadSource") { 
			updateSource();
		}
		else if(this.id == "TrollHider_includeNicks_sub") {
			GM_setValue("TH_includeNicks",jQuery("#TrollHider_includeNicks").val());
		}
		else if(this.id == "TrollHider_excludeNicks_sub") {
			GM_setValue("TH_excludeNicks",jQuery("#TrollHider_excludeNicks").val());
		}
	});

  jQuery("#TrollHider_toggle").click(function () {
    jQuery("#TrollHider").toggle('slow', function() {});
  });
  

  	var nicks = jQuery.grep(nicks, function(n, i) {
  		return jQuery.inArray(n, excludeNicks) == -1;
  	});
  	nicks = jQuery.merge(nicks, includeNicks);


  	if(enabled) {
	jQuery("a[href^=userdetails]").each(function () {
		if(jQuery.inArray(jQuery(this).html(),nicks) !== -1){
			var nick = jQuery(this).html();
			if(HidePost)
			if(jQuery(this).parent().is("span"))
				if(jQuery(this).parent().parent().is("p")){
					var change = jQuery(this).parent().parent().parent();
							if(fullHidePost) change.html("");
							else if(greyOutPost) { change.find("*").css("color","#D8D8D8"); change.find("img").css("display","none"); }
							else if(!fullHidePost) change.html("<hr/><i>TrollHider - Parašė: " + nick +"</i><hr/>");
							
						
				}
			if(HideTopic)		
				if(jQuery(this).parent().is("td"))
					if(jQuery(this).parent().attr("class") == "tleft" && !jQuery(this).prev().is("BR")) {
						var change = jQuery(this).parent().parent();
						if(greyOutTopic) {change.find("*").css("color","#D8D8D8").css("font-size","8px").css("padding-top","0px");}
						else if(!fullHideTopic) change.html("<td colspan=5><i>TrollHider - Sukūrė: " + nick +"</i></td>");
						else if(fullHideTopic) change.html("");

					}

		}
	});
	}
  


