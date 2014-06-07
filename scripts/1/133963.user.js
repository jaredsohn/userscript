// ==UserScript==
// @author   	Ahileus (modifications Yasen6275 (derived from BiH Academia 3.41))
// @name        Damages Report Script for SoL
// @namespace   Damages Report Script for SoL
// @version	0.05 
// @include	http://www.erepublik.com/*/military/battlefield/*
// @description Damages Report Script for SoL MU
// @updateURL	http://userscripts.org/scripts/source/133963.meta.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==


//**********************************
//** SETTINGS
//**********************************
var VERSION = "0.05";
var sendToSpread=1;
//var sendToDatabase=1;
var unitname = 'SoL';
var sef1 = 'Yasen6275';
var sef2 = 'saks77';
var sef3 = 'roonex';
var sef4 = 'krush';
var sef5 = 'Ko3aTa';
var urlOrder="http://www.erepublik.com/en/article/-1-2158590/1/20";
var formKey="dFYzaC1tMEQxY01TM3BiWk5GS3NnTmc6MQ";
var URLGoogleForm="https://docs.google.com/spreadsheet/viewform?formkey="+formKey+"#gid=0";
var FORM_URL="https://docs.google.com/spreadsheet/viewform?formkey="+formKey+"#gid=0";
//var URLMyForm="http://www.erepublik-bih.com/ebih/akademija_damage_form.php";

//**********************************
//** SCRIPT START
//**********************************
var pageURL = location.href;
var pageURLSize = pageURL.length;
$=jQuery=jQuery.noConflict(true);
//var jQuery = null;
//var $ = null;
var nickname=jQuery('.user_info a').html();
var round=jQuery("#select_zone").html();

function eDayFromeDate(date)
{	
	date=date.replace(/\,/g,''); // Day 1823 14:36		
	date=date.substring(0, date.length - 6);	// Day 1823
	date=date.substr(4);	// 1823
	return date; 
}	


//******************************
//** DISPLAY ORDER
function displayOrder()
{	
  jQuery.get(urlOrder, function(data) {
  orderLast=jQuery("#comments_div .articlecomments .smallholder:last",data).html();
  orsetbyLast=jQuery("#comments_div .articlecomments .nameholder:last",data).html();
  orsetdateLast=jQuery("#comments_div .articlecomments .article_comment_posted_at:last",data).html();
  orsetdateLastNice = eDayFromeDate(orsetdateLast);

  edatefrompage = jQuery("#header .header_info .eday strong").text();  
  edayfrompage = eDayFromeDate(edatefrompage);
  edatefromcomment = orsetdateLast;   
  edayfromcomment = eDayFromeDate(edatefromcomment); 

if(orsetbyLast==sef1 || orsetbyLast==sef2 || orsetbyLast==sef3 || orsetbyLast==sef4 || orsetbyLast==sef5) // ako je naredba od šefova
{
  jQuery("#menuText").prepend("<div style='margin:-75px 0 40px 200px; text-align:center; text-shadow:0.1em 0.1em 0.1em gray; z-index:500; background-color:none; width:480px;'><table><tr><td align='center'><b>"+unitname+" ORDER by "+orsetbyLast+"</b> on "+orsetdateLast+" <i>(erep time)</i></td></tr><tr><td>"+orderLast+"</td></tr></table></div>");
  }
else
{
  jQuery("#menuText").prepend("<div style='margin:-55px 0 40px 200px; text-align:center; text-shadow:0.1em 0.1em 0.1em gray; z-index:500; background-color:none; width:480px;'><table><tr><td align='center'>No new order!</td></tr></table></div>");			
}
	});				
}


//******************************
//** CREATE MENU
function createMenu()
{
  var LnLbaner="http://www.groupama.bg/img/keywordsDot.jpg";
  jQuery("#large_sidebar").append("<div style='text-align:center; width:150px; z-index:500; background-color:none;'><a href='http://userscripts.org/scripts/show/133963'><img style='width:10px; height:10px;' src='"+LnLbaner+"' /></a><br />Ver "+VERSION);

if(nickname==sef1 || nickname==sef2 || nickname==sef3 || nickname==sef4 || nickname==sef5) {
jQuery("#large_sidebar").append("<br /><b>ADMIN MENU</b><br />* <a href='"+urlOrder+"#comments'>Подай заповед</a>");
   }  
 // jQuery("#large_sidebar").append("<br /><a href='http://www.erepublik.com/en/logout' style='margin-top:10px; background:none repeat scroll 0 0 #FF8888; border:1px solid #FF0000; border-radius:3px 3px 3px 3px; color:#FFFFFF; display:inline; float:left; font-weight:bold; padding:4px; text-align:center; width:58px; margin-left:40px; z-index:500;'>Logout</a></div>");

  jQuery(".facebook_like").hide();
  jQuery(".banner_place").hide();

// extra linkovi
if(nickname==sef1 || nickname==sef2 || nickname==sef3 || nickname==sef4 || nickname==sef5) 
{
  jQuery("#menuText").append("<div style='margin:20px 0 -5px 0px; text-align:center; z-index:500; background-color:none; width:950px; font:normal 14px/16px Verdana;'><a href='http://www.erepublik.com/en/country/society/Bulgaria'>еБългариа</a> || <a href='http://egov4you.info/unit/overview/182'>SoL в eGOV</a></table></div>"); // ||<a href='http://estats.gvozdano.net/?militaryevents=Bosnia-Herzegovina'>Events in eBIH</a>||<a href='http://www.erepublik-bih.com/ebih/admin/akademija_damage.php'>Akademija damage report</a> ||
}
}
// end create menu


//*********************************************
//** REPORT DAMAGE
	var LOCALE = {
		en:function() {
			return {
				locale: "en_US",
				no_damage: "You must deal at least 1 damage before sending a report.",
				send_report: "Do you want to send a report?",
				button_send: "Send Report",
				round_end: "Round has finished. Do you want to send a report?",
				damage: "Damage",
				report: "Report",
				report_title: "Send Report",
				report_failed: "Unknow error occured. Please, try sending your report again."
			};
		},
		hr: function() {
			return {
				locale: "bg_BG",
				no_damage: "Отчети с 0 не могат да бъдят изпратени. Що не вземеш да удариш един два пъти?",
				send_report: "Желаете ли да изпратите Вашия отчет?",
				button_send: "Изпрати отчет",
				round_end: "Рундът е свършил и искате да пратите отчет?",
				damage: "Щета",
				report: "Отчети",
				report_title: "Изпращане на отчет",
				report_failed: "Възникна грешка при изпращането на отчета Ви. Моля, опитайте отново."
			};
		}
	};
	
	String.prototype.endsWith = function(str) { return this.match(str + "$") == str; };
	String.prototype.startsWith = function(str) { return this.match("^" + str) == str; };
	String.prototype.trim = function(){return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""); };
	
	var formatString = function() {
		var s = arguments[0];
		for (var i = arguments.length - 1; i >= 0; i--) {
			s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
		}
		
		return s;
	};
	
	var resource = (function() { // Read locale
		var href = window.location.href;
		var startIndex = href.indexOf(".com/") + 5;
		var endIndex = href.indexOf("/", startIndex + 1);
		var localeCode = href.substring(startIndex, endIndex);
		var result = LOCALE[localeCode];
		return result != null ? result() : LOCALE["en"]();
	})();
	
	(function() { // Update form fields
		if(FORM_URL.startsWith("https://docs.google.com/")) {
			var lastIndex = FORM_URL.lastIndexOf("#");
			var formKey = FORM_URL.substring(FORM_URL.lastIndexOf("formkey=") + 8, (lastIndex > 0 ? lastIndex : FORM_URL.length));
			FORM_URL = "https://spreadsheets.google.com/spreadsheet/formResponse?hl=en_US&formkey=" + formKey + "&ifq";
		}
	})();

	// Setup and find jQuery instance.
	jQuery = $ = (function(unsafeWindow) {
		if(window.navigator.vendor.match(/Google/)) {
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			unsafeWindow = div.onclick();
		}
		
		return unsafeWindow.jQuery;
	})(unsafeWindow);
	
	// Selects the first 
	function selectFirst(/*...args*/) {
		for(var i = 0; i < arguments.length; i++) {
			var result = jQuery(arguments[i]);
			if(result.length) return result;
		}
		
		return null;
	}
	
	function PopupManager() {
		var self = this;
		var $mask = null;
		
		this.initialize = function() {
			$mask = jQuery("#bs_popups_mask").click(function() { self.hide(); });
		}
		
		this.show = function(popup) {
			$popup = jQuery(popup);
			
			// Set the popup window to center
			$popup.css("top",  (jQuery(window).height() - $popup.height()) / 2);
			$popup.css("left", (jQuery(document).width() - $popup.width()) / 2);
		 
			// Transition effect
			$popup.fadeIn(1000);
			$mask.fadeIn(1000); 
			
			return $popup;
		}
		
		this.hide = function(popup) {
			$mask.hide();
			jQuery(".bs_window").hide();
			if(popup) return jQuery(popup);
		}
	}
	
	function BattlePage() {
		// private properties:
		var self = this;
		var customCss = null;
		
		// Mapping to form input names
		var fieldsMap = {
                name: "entry.0.single",
		eday: "entry.1.single",
                time: "entry.5.single",
                damage: "entry.7.single",
                battle: "entry.14.single",
                wall: "entry.6.single",
                donate: "entry.9.single",
                strenght: "entry.12.single",
                hits: "entry.8.single",
                fightingside: "entry.11.single",
                currentregion: "entry.2.single",
                version: "entry.13.single",
                extra: "entry.10.single",
                round: "entry.4.single",
		battleid: "entry.3.single",
		checksum: "entry.15.single"
                };

		var MyFieldsMap  = {
			eday: "erep_dan",
			name: "nick",
			time: "time",
			damage: "damage",
			battle: "battle",
			wall: "wall",
			donate: "donatelink",
			hits: "hits",
			strenght: "strenght",
			fightingside: "side",
			currentregion: "region",
			version: "version",
			extra: "division",
			round: "round",
			level: "level",
			profilelink: "profilelink",
                        battleid: "battleid"
			};
		
		// public properties:
		// private methods:
		function addStyle(selector, properties) {
			var newStyle = selector + "{";
	
			for(var property in properties)  {
				newStyle += (property + ":" + properties[property].toString() + ";");
			}
			
			newStyle += "}";
			customCss.innerHTML += newStyle;
		}
		
		var onReportFail = function() {
			alert(resource.report_failed);
		};

		// public methods:
		this.initialize = function() {
			customCss = document.createElement("style");
			customCss.setAttribute("type", "text/css");			
			
			// Create required CSS
			addStyle(".bs_last_report", {
				"position": "relative",
				"cursor": "pointer",
				"left": "240px",
				"top": "65px"
			});
			
			addStyle(".bs_last_report:hover", {
				"font-weight": "bold"
			});
			
			addStyle(".bs_report_button", {
				"text-transform": "uppercase",
				"background-color": "#f67777",
				"border-radius": "5px 5px 5px 5px",
				"color": "#FFFFFF",
				"font-size": "11px",
				"font-weight": "bold",
				"padding": "5px 10px 5px 8px",			
				"text-shadow": "rgba(0, 0, 0, 0.2) 0 -1px 0",
				"margin-left": "140px",
				"display": "block",
				"top": "-200px",
			});
			
			addStyle(".bs_report_button:hover", {
				"background-color": "#333333",
			});
			
			addStyle("#bs_popups_mask", {
				"margin": "0",
				"z-index": "30000",
				"background-color": "#000",
				"display": "none",
				"opacity": "0.8",
				"-moz-opacity": ".80",
				"position": "fixed",
				"top": "0px",
				"left": "0px",
				"width": "100%",
				"height": "100%",
				"text-align": "center",
				"vertical-align": "middle"
			});
			
			addStyle("#bs_popup_report", {
				"position": "fixed",
				"display": "none",
				"z-index": "30100",
				"font-size": "14px",
				"font-weight": "bold",				
				"height": "240px",
				"-webkit-border-radius": "10px",
				"-moz-border-radius": "10px",
				"border-radius": "10px",
				"background-position": "-12px -6px",
				"width": "372px"
			});
			
			addStyle("#bs_report_pop_send", {
				"margin-left": "26px"
			});
			
			addStyle("#bs_close_report", {
				"cursor": "pointer",
				"position": "absolute",
				"top": "-8px",
				"right": "-8px"
			});
					
			// Append CSS to document
			document.head.appendChild(customCss);
		};
		
		this.createReportObject = function() {
        var userLink = jQuery("#large_sidebar .user_section .user_avatar");
        var profileUrl = userLink.attr("href");
        var path=parent.document.location.pathname.toString();
        var rankar={"Recruit":1, "Private":2, "Private *":3, "Private **":4, "Private ***":5,
                                "Corporal":6, "Corporal *":7, "Corporal **":8, "Corporal ***":9, "Sergeant":10,
                                "Sergeant *":11, "Sergeant **":12, "Sergeant ***":13, "Lieutenant":14, "Lieutenant *":15,
                                "Lieutenant **":16, "Lieutenant ***":17, "Captain":18, "Captain *":19, "Captain **":20,
                                "Captain ***":21, "Major":22, "Major *":23, "Major **":24, "Major ***": 25,
                                "Commander":26, "Commander *":27, "Commander **":28, "Commander ***":29, "Lt Colonel":30,
                                "Lt Colonel *":31, "Lt Colonel **":32, "Lt Colonel ***":33, "Colonel":34, "Colonel *":35,
                                "Colonel **":36, "Colonel ***":37, "General":38, "General *":39, "General **":40,
                                "General ***":41, "Field Marshal":42, "Field Marshal *":43, "Field Marshal **":44, "Field Marshal ***":45,
                                "Supreme Marshal":46, "Supreme Marshal *":47, "Supreme Marshal **":48, "Supreme Marshal ***":49, "National Force":50,
                                "National Force *":51, "National Force **":52, "National Force ***":53, "World Class Force":54, "World Class Force *":55,
                                "World Class Force **":56, "World Class Force ***":57, "Legendary Force":58, "Legendary Force *":59, "Legendary Force **":60,
                                "Legendary Force ***":61, "God of War":62, "God of War *":63, "God of War **":64, "God of War ***": 65 };
        var str,
                ranks = jQuery('#rank_icon').attr('title');
                str = parseFloat(jQuery('#fighter_skill').text().trim().replace(/,/g,''));
        if (typeof ranks == 'undefined' || ranks.length == 0) {
                ranks = jQuery('#rank_icon').attr('original-title').substr(15).trim();
        } else {
                ranks = ranks.substr(15).trim();
        }
        var rankl=rankar[ranks];
        var dmg=parseInt(jQuery("#total_damage strong").text().replace(/[^\d.]/g, "")); //innerHTML
        var dmgq6=Math.floor(Math.floor((parseInt(rankl)+5)*(parseFloat(str)+400)*0.005)*3);
        var dmgq6hit=Math.floor(dmg/dmgq6);
	var hits0=Math.floor(dmg/((Math.floor(Math.floor((parseInt(rankl)+5)*(parseFloat(str)+400)*0.005)))*3));
        var battle0=jQuery("#pvp_header h2").text()+' ('+path.split('/')[4]+')';
        var battleid0 = path.split('/')[4];
	var level0=jQuery("#large_sidebar .user_level b").text();
        var fightingside10=jQuery("#pvp_header .country h3:first").text();
        var currentregion10=jQuery("#pvp_header h2").text();
 //       var battleround=jQuery(".battle_stats .view_selector select option").text();
        var level10=jQuery("#large_sidebar .user_info .user_level b").text();
        var currentRound=jQuery("#selectzone").html();
	var leftSide=jQuery("#pvp_header .left_side div h3").text();
	var rightSide=jQuery("#pvp_header .right_side div h3").text();
	var blueDomination=encodeURIComponent(jQuery("#blue_domination").text());
        var leftTotalPoints = jQuery("#left_campaign_points strong").text();
        var rightTotalPoints = jQuery("#right_campaign_points strong").text();
	
        leftTotalPoints = parseFloat(leftTotalPoints);
        rightTotalPoints = parseFloat(rightTotalPoints);
        var TotalPoints = leftTotalPoints + rightTotalPoints;

	 if(TotalPoints < 11) {bround = 1;}
	 if(TotalPoints > 10 && TotalPoints < 22) {bround = 2;}
	 if(TotalPoints > 21 && TotalPoints < 33) {bround = 3;}
	 if(TotalPoints > 32 && TotalPoints < 44) {bround = 4;}
	 if(TotalPoints > 43 && TotalPoints < 55) {bround = 5;}
	 if(TotalPoints > 54 && TotalPoints < 66) {bround = 6;}
	 if(TotalPoints > 65 && TotalPoints < 77) {bround = 7;}
	 if(TotalPoints > 76 && TotalPoints < 88) {bround = 8;}
	 if(TotalPoints > 87 && TotalPoints < 99) {bround = 9;}
	 if(TotalPoints > 98 && TotalPoints < 110) {bround = 10;}
	 if(TotalPoints > 109 && TotalPoints < 121) {bround = 11;}
	 if(TotalPoints > 120 && TotalPoints < 132) {bround = 12;}
	 if(TotalPoints > 131 && TotalPoints < 143) {bround = 13;}
	 if(TotalPoints > 142 && TotalPoints < 154) {bround = 14;}
	 if(TotalPoints > 153 && TotalPoints < 165) {bround = 15;}
	 if(TotalPoints > 164 && TotalPoints < 176) {bround = 16;}

        if (level10 < 25) {division = 1;}
        if (level10 > 24 || level10 <30) {division = 2;}
        if (level10 > 29 || level10 <37) {division = 3;}
        if (level10 > 36) {division = 4;}
	var checksum0 = battleid0*100+bround;

		var data = {
		name: userLink.attr("title"),
		profilelink: userLink.attr("href"),
		level: jQuery("#large_sidebar .user_info .user_level b").text(),
		damage: dmg,
		dq6hit: dmgq6hit,
		battle: battle0,
		eday: jQuery("#header .header_info .eday strong").text(),
		time: jQuery("#battle_countdown").text(),
		wall: selectFirst("#blue_domination_f", "#blue_domination").text(),
		donate: "http://www.erepublik.com/en/economy/donate-items/" + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
		strenght: str,
		round: bround,
		hits: hits0,
		extra: division,
		fightingside: fightingside10,
		currentregion: currentregion10,
		version: VERSION,
                battleid: battleid0,
		checksum: checksum0
		};

                               
        jQuery("#pvp_header .crowns").each(function() {
                data.round += parseInt(jQuery(this).attr("class").split(" ")[1].substr(2));
        });
       
        return data;
};
		
		this.isDamageValid = function(reportObject) {
        return !isNaN(reportObject.damage) && reportObject.damage > 0;
};
		
		this.sendReportObject = function(data) {
			if(data == null) data = self.createReportObject();
			
			if(!self.isDamageValid(data)) {
				alert(resource.no_damage);
				return false;
			}
			
			var report = {pageNumber: "0", backupCache: "", submit: "Submit"};
			for(var fieldName in fieldsMap) {
				report[fieldsMap[fieldName]] = data[fieldName];
			}

			var headers = {"Content-Type": "application/x-www-form-urlencoded"};
			GM_xmlhttpRequest({method: "POST", url: FORM_URL, data: $.param(report), headers: headers, onerror: onReportFail});


// SEND TO DATABASE
//			var reportDB = {form: "process", robot: "", submit: "Submit"};
//			for(var MyfieldName in MyFieldsMap ) {
//				reportDB[MyFieldsMap[MyfieldName]] = data[MyfieldName];
//			}
//			var Myheaders = {"Content-Type": "application/x-www-form-urlencoded"};
//			GM_xmlhttpRequest({method: "POST", url: URLMyForm, data: $.param(reportDB), headers: Myheaders, onerror: onReportFail});
			return true;
		};
	}
	
	var lastReport = null;
	var $reportButton = null;
	var battlePage = null;
	var popUpManager = new PopupManager();
	
	var reportHandler = function() {		
	lastReport = battlePage.createReportObject();
		
	if(battlePage.isDamageValid(lastReport)) {
			popUpManager.show("#bs_popup_report").find("#bs_report_pop_dmg").text(lastReport.damage);
	}
	else {alert(resource.no_damage);}//
		
	return false;
	};
	
	var reportEndHandler = function() {	
		if(confirm(resource.round_end)) {
			reportHandler();
		}		
		return false;
	};
	
	var sendLastReport = function() {
		if(battlePage.sendReportObject(lastReport)) {
			$reportButton.css("display", "none");
		}	
		popUpManager.hide();
	};
	
	function createReportDialog() {
		var $reportDialog = jQuery('<div id="bs_popup_report" class="pop enemy_defeated bs_window"> \
			<div class="heading">																										   \
<img id="bs_close_report" alt="Close window" src="http://www.erepublik.com/images/modules/pvp/close_button.png">		   \
<h2>' + resource.report_title + '</h2>																					   \
			</div>                                                                                                                         \
<div class="content" style="margin-left: 30px">                                                                                \
				<div>                                                                                                                      \
<img alt="" src="http://www.erepublik.com/images/modules/pvp/war_effort.png" class="symbol">                           \
<strong>' + resource.damage + ': </strong><big id="bs_report_pop_dmg"></big>										   \
				</div>                                                                                                                     \
			</div> 																														   \
<div style="clear: both; height: 1.5em"></div>																				   \
<a title="' + resource.button_send + '" href="#" id="bs_report_pop_send">' + resource.button_send + '</a>					   \
</div>');
		
jQuery("body").append($reportDialog).append('<div id="bs_popups_mask"></div>');
jQuery("#bs_close_report").click(function() { 
popUpManager.hide(); 
return false;
});
		
// Add listener this way because with jQuery the context will change and GM functions will stop working.
document.getElementById("bs_report_pop_send").addEventListener("click", sendLastReport, false);
}
	
function createReportButtons() {
// Report button on battle page
$reportButton = jQuery('<a class="bs_report_button" title="Report damage!" href="#">' + resource.report + '!</a>');
$reportButton.appendTo(jQuery("#total_damage")).bind("click", reportHandler);

document.getElementById("total_damage").setAttribute("title", "");
			
// Battle loading after round handling
var lastButton = '<a class="bs_last_report" href="#">&lt;&lt; Report &gt;&gt;</a>';

//var lastButton = '<a class="bs_last_report" href="#">&lt;&lt; ' + resource.report + ' &gt;&gt;</a>';
jQuery([jQuery("#battle_end"), jQuery("#battle_loader")]).each(function() {
jQuery(this).append(lastButton).find(".bs_last_report").bind("click", reportEndHandler);
});
	}
// end damage report	

	
//******************************
//** END SCRIPT
jQuery(document).ready(function() {
	displayOrder();
	createMenu();
	createReportDialog();			
	battlePage = new BattlePage();
	battlePage.initialize();
	popUpManager.initialize();		
	createReportButtons();
});