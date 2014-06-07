// ==UserScript==
// @name           Remove Useless Mafia Wars Posts From Your Wall
// @namespace      Facebook
// @version        0.1.2
// @include        http://www.facebook.com/home.php*
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @upgrade		   http://userscripts.org/scripts/show/56176
// ==/UserScript==


/* Each image that is posted from mafia wars contains a source.  Some of them are included below..  
	"Family Values" and "Respected" are both from promotions
	"Nothing Personal" is from when someone gets whacked..
	
	You can add as many as you want to not show up on your wall..  Just add them to the src.indexOf()
	below..  Make sure you add the || (which means OR) after the one previous, before you add another.
	
*/


GM_setValue('HelpRequestDiv', "//div[@class='UIStoryAttachment_Copy']//div[@class = 'CopyTitle' and contains(., 'requested help')]");
GM_setValue('showButton', "//div[@class='UIIntentionalStream_ShowNewStories UIOneOff_Container']");
GM_setValue('jobLinks', "//a[contains(@id, 'jobLinkAnchor')]");
GM_registerMenuCommand("Turn Jobs On", doJobsOn);
GM_registerMenuCommand("Turn Jobs Off", doJobsOff);



GM_getValue('doJobs', 0);

function doJobsOn() {
	GM_setValue('doJobs', 1);	
}

function doJobsOff() {
	GM_setValue('doJobs', 0);	
}

function removeCrap() {
	
	var date1 = new Date(); 
	var milliseconds1 = date1.getTime();
	var date2 = new Date(); 
	var milliseconds2 = date2.getTime(); 
	
	var difference = milliseconds2 - milliseconds1; 
	//alert(difference);
	
	$("a:not([id^='jobLinkAnchor']):has(div[class='UIMediaItem_Wrapper'])[href*='next_action=give_help']").attr('id', function (arr) { return "jobLinkAnchor" + arr; });
	$("img[src*='godfather_130x130']").parent().parent().parent().parent().parent().parent().remove();
	$("img[src*='logo_wars_stronger_']").parent().parent().parent().parent().parent().parent().remove();
	$("img[src*='daily_chance_white_']").parent().parent().parent().parent().parent().parent().remove();
	$("img[src*='logo_mafia_family_']").parent().parent().parent().parent().parent().parent().remove();
	$("img[src*='logo_mafia_respected_']").parent().parent().parent().parent().parent().parent().remove();
	$("img[src*='white_boost']").parent().parent().parent().parent().parent().parent().remove();
	$("img[src*='logo_mafia_nothing_']").parent().parent().parent().parent().parent().parent().remove();
	$("img[src*='cigarbabe_']").parent().parent().parent().parent().parent().parent().remove();
	$("a[href*='track_category=sendgiftshort']").parent().parent().parent().parent().remove();
	$("a[href*='mafia-loots-diabca']").parent().parent().parent().parent().remove();

	
	chk = xpathFirst('.//div[@class="UIIntentionalStream_ShowNewStories"]');

	if ((chk) && chk.style.display == 'block')
	{
		lnk = xpathFirst('.//a[@class="UIIntentionalStream_ShowNewStories_Msg"]');
		
		simulateClick(lnk);

	}
	
	if (GM_getValue("doJobs") == 1)
	{

		jobs = itemArray(GM_getValue('jobLinks'));
			
		for(var i = jobs.snapshotLength - 1; i >= 0; i--)
		{	
					
			thiselem = jobs.snapshotItem(i).id;
	
			goto = jobs.snapshotItem(i).href;
	
			paramStr = urldecode(goto).split("next_params=");
			
			newStr = paramStr[1].replace('{', '');
			newStr = newStr.replace('}', '');
			newStr = newStr.replace(/"/g, '');
			
			
			paramArray = newStr.split(',');
			target = paramArray[0].split(':');
			targetID = target[1];
			city = paramArray[1].split(':');
			cityID = city[1];
			
			vNow = new Date().getTime(); 
			
			if (!GM_getValue("id"+targetID+'-'+cityID, false))
			{
				loadJob(targetID,cityID,thiselem);
				tNow = new Date().getTime(); 
				GM_setValue("id"+targetID+"-"+cityID, "'"+tNow+"'");
			} else if ( vNow - GM_getValue("id"+targetID+'-'+cityID) > 864000000 ) {
				loadJob(targetID,cityID,thiselem);
				tNow = new Date().getTime(); 
				GM_setValue("id"+targetID+"-"+cityID, "'"+tNow+"'");
			} else {
				//GM_deleteValue("id"+targetID+"-"+cityID);
			}
	
		}
	
	}
	
}






var loadJob = function(target, city, returndiv) { 

	GM_xmlhttpRequest(
	{
		 method: "GET",
		 url: "http://apps.facebook.com/inthemafia/index.php?xw_controller=job&xw_action=give_help&target_id="+target+"&job_city="+city+"&skip_interstitial=1",
		 onload: function(response)
				{
					x = response.responseText;
					str = x.indexOf('<table class="messages" style="">');
					en = x.indexOf('</table>', str);
					count = en-str+8;
					rslt = x.substr(str, count).replace(' style=""', ' style="margin-top:5px;width:100%;padding:3px;overflow:hidden;"');
					
					if (rslt.indexOf('too late!') != -1)
						rslt2 = rslt.replace('<span ', '<span style="font-size:8pt;width:150px;color:red;position:relative;font-weight:bold;" ');
					else
						rslt2 = rslt.replace('<span ', '<span style="font-size:8pt;width:150px;color:green;position:relative;font-weight:bold;" ');

					//$("\"a[id='"+returndiv+"']\"").after(rslt2);
					//alert(response.responseText);
					$("div:has(a[id='"+returndiv+"'])[id^='div_story_']").before('<div id="Message'+returndiv+'" style="border:2px solid #aaaaaa;width:350px;height:50px;background:#eeeeee;z-index:5000;position:absolute;margin-left:90px;margin-top:25px;opacity:0.90">' + rslt2 + '</div>');
					$("div:has(a[id='"+returndiv+"'])[id^='div_story_']").fadeTo('slow', 0.35);
				}
	});
	
}







function itemArray(_strPattern)
{
 return document.evaluate(_strPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

var simulateClick = function (el)
{ 
	var evt = document.createEvent("MouseEvents"); 
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
	el.dispatchEvent(evt); 
} 

function urldecode (str) {
    var hash_map = {}, ret = str.toString(), unicodeStr='', hexEscStr='';
    
    var replacer = function (search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };
    
    // The hash_map is identical to the one in urlencode.
    hash_map["'"]   = '%27';
    hash_map['(']   = '%28';
    hash_map[')']   = '%29';
    hash_map['*']   = '%2A';
    hash_map['~']   = '%7E';
    hash_map['!']   = '%21';
    hash_map['%20'] = '+';
    hash_map['\u00DC'] = '%DC';
    hash_map['\u00FC'] = '%FC';
    hash_map['\u00C4'] = '%D4';
    hash_map['\u00E4'] = '%E4';
    hash_map['\u00D6'] = '%D6';
    hash_map['\u00F6'] = '%F6';
    hash_map['\u00DF'] = '%DF';
    hash_map['\u20AC'] = '%80';
    hash_map['\u0081'] = '%81';
    hash_map['\u201A'] = '%82';
    hash_map['\u0192'] = '%83';
    hash_map['\u201E'] = '%84';
    hash_map['\u2026'] = '%85';
    hash_map['\u2020'] = '%86';
    hash_map['\u2021'] = '%87';
    hash_map['\u02C6'] = '%88';
    hash_map['\u2030'] = '%89';
    hash_map['\u0160'] = '%8A';
    hash_map['\u2039'] = '%8B';
    hash_map['\u0152'] = '%8C';
    hash_map['\u008D'] = '%8D';
    hash_map['\u017D'] = '%8E';
    hash_map['\u008F'] = '%8F';
    hash_map['\u0090'] = '%90';
    hash_map['\u2018'] = '%91';
    hash_map['\u2019'] = '%92';
    hash_map['\u201C'] = '%93';
    hash_map['\u201D'] = '%94';
    hash_map['\u2022'] = '%95';
    hash_map['\u2013'] = '%96';
    hash_map['\u2014'] = '%97';
    hash_map['\u02DC'] = '%98';
    hash_map['\u2122'] = '%99';
    hash_map['\u0161'] = '%9A';
    hash_map['\u203A'] = '%9B';
    hash_map['\u0153'] = '%9C';
    hash_map['\u009D'] = '%9D';
    hash_map['\u017E'] = '%9E';
    hash_map['\u0178'] = '%9F';
    hash_map['\u00C6'] = '%C3%86';
    hash_map['\u00D8'] = '%C3%98';
    hash_map['\u00C5'] = '%C3%85';
 
    for (unicodeStr in hash_map) {
        hexEscStr = hash_map[unicodeStr]; // Switch order when decoding
        ret = replacer(hexEscStr, unicodeStr, ret); // Custom replace. No regexing
    }
    
    // End with decodeURIComponent, which most resembles PHP's encoding functions
    ret = decodeURIComponent(ret);
 
    return ret;
}

removeCrap();
window.setInterval(function (){removeCrap()}, 15000);