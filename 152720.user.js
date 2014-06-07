// ==UserScript==
// @name           Damage report, Chrome version
// @version        2.06
// @namespace      nimesin.com
// @author         Nimesin
// @run-at         document-start
// @include        http://www.erepublik.com/en/military/battlefield/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @resource       icon http://www.imerx.net/favicon.ico
// ==/UserScript==
//GM_log("run!");
var sendToSpread=1;
var sendToDB=1;
var urlOrder="http://www.erepublik.com/en/article/i-got-it-q8-and-q9-2089854/1/20";
var startTag="[order]";
var endTag="[/order]";
var startImg="[img]";
var endImg="[/img]";
var formKey="dGU3QzkxRGlSVGhYMjloUnRHQnhYVEE6MQ"; // #fm
var URLGoogleForm="https://spreadsheets.google.com/formResponse?formkey="+formKey;
var URLmySql="http://nimesin.erep.lt/GM/index.php?table=battle";
var URLmySqlStat="http://nimesin.erep.lt/GM/index.php?table=battle_stat";
var allowedNick="Ministarstvo Obrane";

window.addEventListener("DOMContentLoaded", function() {
    //var image = document.createElement('img');
    //image.src = GM_getResourceURL('icon');
    //document.getElementsByTagName('body')[0].appendChild(image);
    //GM_log("done!!");
		  jQuery('#blue_domination').css({
			'opacity': '1',
			'color': '#fff'
		  });
		  jQuery('#red_domination').css({
			'opacity': '1',
			'color': '#fff'
		  });
		createReportButtons();
		getOrder(urlOrder);
		getData();	
    
    //GM_log("jQuery().jquery: " + jQuery().jquery);
}, false);
var rrr = function() {
    try {
    GM_log("jQuery().jquery: " + jQuery().jquery);
    GM_log("$().jquery: " + $().jquery);    
    } catch (e) {
        console.log(e);
    }
    // window.setTimeout(rrr, 2000);
};
function getData()
{
	var citName=jQuery('.user_info a').html();
	var locAll=window.location;
	var region=jQuery("#pvp_header h2").text();
	var leftSide=jQuery("#pvp_header .left_side div h3").text();
	var rightSide=jQuery("#pvp_header .right_side div h3").text();
	var blueDomination=encodeURIComponent(jQuery("#blue_domination").text());
	var fighterSkill=jQuery("#fighter_skill").text();
	var totalDamage=jQuery("#total_damage strong").text();
	var rankPoints=jQuery("#rank_min").text();
	var currentRound=unsafeWindow.SERVER_DATA['zoneId'];
	var bs_stat=JSON.stringify(unsafeWindow.SERVER_DATA['historyStats']);
	if (sendToSpread==1 && totalDamage>0)
	{
		var http;
		var url=URLGoogleForm+
		 "&entry.0.single=" + citName +
		 "&entry.1.single=" + locAll + 
		 "&entry.2.single=" + region +
		 "&entry.3.single=" + leftSide +
		 "&entry.4.single=" + rightSide +
		 "&entry.5.single=" + blueDomination +
		 "&entry.6.single=" + fighterSkill +
		 "&entry.7.single=" + totalDamage +
		 "&entry.8.single=" + rankPoints +
		 "&entry.9.single=" + currentRound +
		 "&submit=Submit";
        //alert(url);
		http=new XMLHttpRequest();
		http.open("GET",url,true);
		http.send(null);
	}
	if (sendToDB==1 && totalDamage>0)
	{
		var http;
		var url=URLmySql+
		 "&name=" + citName +
		 "&url=" + locAll + 
		 "&region=" + region +
		 "&leftSide=" + leftSide +
		 "&rightSide=" + rightSide +
		 "&domination=" + blueDomination +
		 "&strength=" + fighterSkill +
		 "&damage=" + totalDamage +
		 "&rankPoints=" + rankPoints +
		 "&round=" + currentRound +
		 "&submit=Submit";
        //alert(url);
		http=new XMLHttpRequest();
		http.open("GET",url,true);
		http.send(null);
	}
	url=URLmySqlStat;
		http=new XMLHttpRequest();
		http.open("POST",url,true);
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.send("stat="+bs_stat);
}
function getOrder(urlOrder)
{
	jQuery.get(urlOrder, function(data) {
		orderLast=jQuery("#comments_div .articlecomments .smallholder:last",data).html();
		orsetbyLast=jQuery("#comments_div .articlecomments .nameholder:last",data).html();
		orsetdateLast=jQuery("#comments_div .articlecomments .article_comment_posted_at:last",data).html();
		oravatarLast=jQuery("#comments_div .articlecomments:last .avatarholder a img",data).attr("src");
		order=orderLast;
		orset=orsetbyLast;
		addForm("", {"data":order}, "prof1", "nimOrder1");
		parts1=jQuery("#nimOrder1_data").val().split(endTag);
		addForm("", {"data":parts1[0]}, "prof2", "nimOrder2");
		parts2=jQuery("#nimOrder2_data").val().split(startTag);
		order=parts2[1];
		
		avorder=oravatarLast;
		addForm("", {"data":order}, "img1", "nimImg1");
		orImg1=jQuery("#nimImg1_data").val().split(endImg);
		order=orImg1[1];
		addForm("", {"data":orImg1[0]}, "img2", "nimImg2");
		orImg2=jQuery("#nimImg2_data").val().split(startImg);
		orImg=orImg2[1];
		if(orsetbyLast==allowedNick || orsetbyLast=='Nimesin')
		{
			var headInfo=jQuery(".header_info").html();
			jQuery("#header").html("<center><table><tr><td align='center'>"+orset+"<br>"+orsetdateLast+"</td><td align='center'><img src='"+orImg+"' width='300' height='50'><br>"+order+"</td><td><div class='header_info'>"+headInfo+"</div></td></tr></table></center>"); // jQuery("#pvp").prepend(...);
			//jQuery(".facebook_like").hide();
		}
	});
}
function addForm(path, params, target, formName) {
    method = "post"; // Set method to post by default, if not specified.
    target = target || ""; // Set target.
    var form = jQuery(document.createElement( "form" ))
        .attr( {"name": formName, "id": formName, "method": method, "action": path, "target": target} );
    jQuery.each( params, function(key,value){
        jQuery.each( value instanceof Array? value : [value], function(i,val){
            jQuery(document.createElement("input"))
                .attr({ "type": "hidden", "name": key, "id": formName+"_"+key, "value": val })
                .appendTo( form );
        }); 
    } ); 
    form.appendTo( document.body ); 
}
	function createReportButtons() {
		// Report button on battle page
		jQueryreportButton = jQuery('<a class="bs_report_button" href="#">Report!</a>');
		jQueryreportButton.appendTo(jQuery(".damage_aligner tr").append('</tr><tr><td id="bs_report_td"></td>')).bind("click", reportHandler); 
		jQueryreportButton2 = jQuery('<a class="bs_report_button" href="#">Report!</a>');
		jQueryreportButton2.appendTo(jQuery("#close_bstats").append('</tr><tr><td id="bs_report_td2"></td>')).bind("click", reportHandler); 
		jQuery(".damage_aligner").css("top",jQuery(".left_side").css("top"));
		jQuery(".bs_report_button").css("background-image",jQuery("#total_damage small").css("background-image"));
//		jQuery("#scroller").css("top",jQuery("#fighter_skill").css("top"));
//		jQuery("#scroller").css("left",jQuery("#total_damage").css("left"));
		jQuery(".bs_report_button").css("color",'#FFFFFF');
		jQuery(".bs_report_button").css("display",'block');
		jQuery(".bs_report_button").css("float",'left');
		jQuery(".bs_report_button").css("font-size",'11px');
		jQuery(".bs_report_button").css("font-weight",'bold');
		jQuery(".bs_report_button").css("height",'25px');
		jQuery(".bs_report_button").css("line-height",'25px');
		jQuery(".bs_report_button").css("opacity",'0.7');
		jQuery(".bs_report_button").css("padding",'0 5px');
		jQuery(".bs_report_button").css("text-shadow",'#333333 0px 1px 0px');
		jQuery(".bs_report_button:hover").css("opacity",jQuery("#total_damage small:hover").css("opacity"));
			
		// Battle loading after round handling
		var lastButton = '<a class="bs_last_report" href="#">&lt;&lt; Report &gt;&gt;</a>';
		jQuery([jQuery("#battle_end"), jQuery("#battle_loader")]).each(function() {
			jQuery(this).append(lastButton).find(".bs_last_report").bind("click", reportEndHandler);
		});
	}
	var reportHandler = function() {
		alert("Reported");
		getData();
		return false;
	};
	var reportEndHandler = function() {
		alert("Reported End");
		getData();
		return false;
	};
rrr();