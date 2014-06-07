// ==UserScript==
// @name        akademija
// @namespace   erepublik-bih.com
// @author     erepublik-bih.com Team
// @run-at      document-start
// @description Show orders on battle screen, and report damage
// @include     http://www.erepublik.com/*/military/battlefield/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     3.03
// ==/UserScript==

//alert("start");
var sendToSpread=1;
var sendToDB=0;
var orderVersionBase='3.03';
//var urlOrder="http://www.erepublik.com/en/article/vojna-akademija-nikad-nije-bila-jaca--1925608/2/20";
var urlOrder="https://docs.google.com/document/d/1Bii95BUuwCGi-4j9hdDCHKmvxbhP5ackV7e8xVgPu-A/preview?pli=1";
var startTag="[order]";
var endTag="[/order]";
var startImg="[img]";
var endImg="[/img]";
var startOK="[ok]";
var endOK="[/ok]";

//var url='https://docs.google.com/document/d/1Bii95BUuwCGi-4j9hdDCHKmvxbhP5ackV7e8xVgPu-A/preview?pli=1';
var is = {
    ie:      navigator.appName == 'Microsoft Internet Explorer',
    java:    navigator.javaEnabled(),
    ns:      navigator.appName == 'Netscape',
    ua:      navigator.userAgent.toLowerCase(),
    version: parseFloat(navigator.appVersion.substr(21)) ||
             parseFloat(navigator.appVersion),
    win:     navigator.platform == 'Win32'
}
is.mac = is.ua.indexOf('mac') >= 0;
if (is.ua.indexOf('opera') >= 0) {
    is.ie = is.ns = false;
    is.opera = true;
}
if (is.ua.indexOf('gecko') >= 0) {
    is.ie = is.ns = false;
    is.gecko = true;
}
if (is.ua.indexOf('chrome') >= 0) {
    is.ie = is.ns = false;
    is.chrome = true;
}
if (is.ua.indexOf('firefox') >= 0) {
    is.ie = is.ns = false;
    is.firefox = true;
}
//alert(JSON.stringify(is));
orderVersion=orderVersionBase;
if(is.firefox) orderVersion=orderVersionBase+"f";
if(is.chrome) orderVersion=orderVersionBase+"c";
if(is.opera) orderVersion=orderVersionBase+"o";
//alert(orderVersion);
if(orderVersion==orderVersionBase) orderVersion=orderVersionBase+JSON.stringify(is);
var formKey="dF9jU2J4UGJKZE1la3BZeXE1Vkp1clE6MQ"; // #gs
var defArmy=function(){return "VA";}
var URLGoogleForm="https://spreadsheets.google.com/viewform?formkey="+formKey+"#gid=0";
var URLmySql="http://www.erepublik-bih.com/ebih/akademija_damage_form.php";
var URLmySqlStat="http://www.erepublik-bih.com/ebih/akademija_damage_form.php";
var allowedNick="Vojna Akademija";
var kokosh=["http://nimesin.erep.lt/img/kok1.png","http://nimesin.erep.lt/img/kok2.png","http://nimesin.erep.lt/img/kok3.png"];
if (typeof unsafeWindow === "undefined") unsafeWindow=window;
window.addEventListener("DOMContentLoaded", function() {
	  jQuery('#blue_domination').css({
		'opacity': '1',
		'color': '#fff'
	  });
	  jQuery('#red_domination').css({
		'opacity': '1',
		'color': '#fff'
	  });
	getData();	
	getOrder(urlOrder);
	createReportButtons();
    
}, false);
function getData()
{

		var citName=jQuery('.user_name').html();
		var citIDArr=jQuery('.user_name').attr("href").split("/");
		var citID=citIDArr[citIDArr.length-1];
		//alert(citID);
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
			http.send();
		}
		try{
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
						 "&army=" + defArmy() +
						 "&comment=" + orderVersion +
						 "&submit=" + citID;
						 //alert(url);
						http=new XMLHttpRequest();
						http.open("GET",url,true);
						http.send(null);
					}
		}catch(err){alert("db: " + err.message);}

		url=URLmySqlStat;
			http=new XMLHttpRequest();
			http.open("POST",url,true);
			http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			http.send("stat="+bs_stat);

}
function getOrder(urlOrder)
{
	//alert(urlOrder);
	jQuery.get(urlOrder, function(data) {
		//alert(jQuery("#comments_div .comment-holder:last .comments-right .comment-content",data).text());
		data=data.replace(/\\\//g, "/");
		try{
			//alert(data);
			addForm("", {"data":data}, "prof1", "nimOrder1");
			var parts1=jQuery("#nimOrder1_data").val().split(endTag);
			addForm("", {"data":parts1[0]}, "prof2", "nimOrder2");
			var parts2=jQuery("#nimOrder2_data").val().split(startTag);
			var order=parts2[1];

			addForm("", {"data":order}, "img1", "nimImg1");
			orImg1=jQuery("#nimImg1_data").val().split(endImg);
			order=orImg1[1];
			//alert(order);
			addForm("", {"data":orImg1[0]}, "img2", "nimImg2");
			orImg2=jQuery("#nimImg2_data").val().split(startImg);
			orImg=orImg2[1];
			//alert(orImg);
			order=order.replace(/\|/g,' ');
			order=order.replace(/\[link\]/g,'<a href="');
			order=order.replace(/\[\/link\]/g,'">link</a><br>');
			order=order.replace(/\[br\]/g,'<br>');
			order=order.replace(/\[b\]/g,'<b>');
			order=order.replace(/\[\/b\]/g,'</b>');
			order=order.replace(/\[u\]/g,'<u>');
			order=order.replace(/\[\/u\]/g,'</u>');

			try{
				addForm("", {"data":data}, "ok1","nimok1");
				parts3=jQuery("#nimok1_data").val().trim().split(startOK);
				//alert(parts3);
				var isOK1=parts3[1].split(endOK);
				//alert(isOK1);
				/* */
				if(jQuery.isArray(isOK1))
				{
					addForm("", {"data":isOK1[0]}, "ok2", "nimOk2");
					var OKs=jQuery("#nimOk2_data").val().trim().split(", ");
					var locAll=window.location;
					addForm("", {"data":locAll}, "loc1", "nimLoc1");
					var loc1=jQuery("#nimLoc1_data").val().trim().split("/");
					var loc=loc1[loc1.length-1];
					var inA=jQuery.inArray(loc, OKs);
					if(inA<0) showDialogKokosh();
				}
				/* */
			}catch(err){alert("isOK: " + err.message); }
			//alert("<center><img src='"+oravatarLast+"'><br>"+orset+"<br>"+orsetdateLast+"</center>");
			//if(orsetbyLast==allowedNick || orsetbyLast=='Nimesin')
			{
				//var headInfo=jQuery(".header_info").html();
				//jQuery("#logoNew").html("<center><img src='"+oravatarLast+"'><br>"+orset+"<br>"+orsetdateLast+"</center>"); 
				//alert(order);
				jQuery(".user_finances").append("<center><img src='"+orImg+"' width='150' height='50'><br>"+order+"</center>"); 
				//jQuery(".header_info").css("width","200px");
				//jQuery(".facebook_like").css("width",jQuery("#header").css("width")-jQuery("#logo").css("width")-jQuery(".header_info").css("width")+"px");
				//jQuery("#search_field").css("width","200px");
				//jQuery(".facebook_like").css("top","1px");
			}
			/* */
		}catch(err){alert("getOrder: " + err.message);}
	});
}
function showDialogKokosh()
{
	try{
		jQuery("#pvp").css("background-image",'url(\"'+kokosh[Math.floor(Math.random()*kokosh.length)]+'\")');
		jQuery("#pvp").css("background-position","center");
	}catch(err){alert("Kokosh: " + err.message);}
}

function addForm(path, params, target, formName) {
	try{
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
	}catch(err){alert("addForm: " + err.message+" "+formName);}

}
function createReportButtons() {
	try{
		// Report button on battle page
		jQueryreportButton = jQuery('<a class="bs_report_button" href="#">Report!</a>');
		jQueryreportButton.appendTo(jQuery(".damage_aligner tr").append('</tr><tr><td id="bs_report_td"></td>')).bind("click", reportHandler); 
		jQueryreportButton2 = jQuery('<a class="bs_report_button" href="#">Report!</a>');
		jQueryreportButton2.appendTo(jQuery("#close_bstats").append('</tr><tr><td id="bs_report_td2"></td>')).bind("click", reportHandler);
		jQuery("#close_bstats").css("right","15px");		
		//jQuery(".damage_aligner").css("position","absolute");
		jQuery(".damage_aligner").css("top","250px");
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
	}catch(err){alert("reportButton: " + err.message);}

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