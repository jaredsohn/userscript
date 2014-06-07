// ==UserScript==
// @name        Damage report
// @namespace   Nimesin
// @description Damage report send to google form
// @match		http://*erepublik.com/*/military/battlefield/*
// @include     http://*erepublik.com/*/military/battlefield/*
// @version     2.05
// ==/UserScript==

// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
var sendToSpread=1;
var sendToDB=1;
var urlOrder="http://www.erepublik.com/en/article/i-got-it-q8-and-q9-2089854/1/20";
var urlOrder="http://www.erepublik.com/en/article/vojne-firme-759817/1/20";
var startTag="[order]";
var endTag="[/order]";
var startImg="[img]";
var endImg="[/img]";

var formKey="dGU3QzkxRGlSVGhYMjloUnRHQnhYVEE6MQ"; // #FM
var formKey="dG5Vd0JzMjEyQU5uZngwMVlpbzJ2eGc6MQ"; // erepublik@nimesin.com
var formKey="dGMwOXk4aUdXcWJKVnJ4c1o5bThILVE6MQ"; // #gs
var URLGoogleForm="https://spreadsheets.google.com/formResponse?formkey="+formKey;
var URLmySql="http://nimesin.erep.lt/GM/index.php?table=battle";
var URLmySqlStat="http://nimesin.erep.lt/GM/index.php?table=battle_stat";
var allowedNick="Ministarstvo Obrane";
function getDataProfile()
{
	var citName=$j('.user_info a').html();
	var locAll=window.location;
	var region=$j("#pvp_header h2").text();
	var leftSide=$j("#pvp_header .left_side div h3").text();
	var rightSide=$j("#pvp_header .right_side div h3").text();
	var blueDomination=encodeURIComponent($j("#blue_domination").text());
	var fighterSkill=$j("#fighter_skill").text();
	var totalDamage=$j("#total_damage strong").text();
	var rankPoints=$j("#rank_min").text();
	var currentRound=$j("#selectzone").html();

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
		http=new XMLHttpRequest();
		http.open("GET",url,true);
		http.send(null);
	}

}
function getData()
{
	var citName=$j('.user_info a').html();
	var locAll=window.location;
	var region=$j("#pvp_header h2").text();
	var leftSide=$j("#pvp_header .left_side div h3").text();
	var rightSide=$j("#pvp_header .right_side div h3").text();
	var blueDomination=encodeURIComponent($j("#blue_domination").text());
	var fighterSkill=$j("#fighter_skill").text();
	var totalDamage=$j("#total_damage strong").text();
	var rankPoints=$j("#rank_min").text();
	var currentRound=$j("#selectzone").html();
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
		 "&round=" + SERVER_DATA['zoneId'] +
		 "&submit=Submit";
		http=new XMLHttpRequest();
		http.open("GET",url,true);
		http.send(null);
	}
	var bs_stat=JSON.stringify(SERVER_DATA['historyStats']);
	//alert(JSON.stringify($j("#scroller").data("scrollable")));
	//currentWeaponId=10;
	url=URLmySqlStat;
		http=new XMLHttpRequest();
		http.open("POST",url,true);
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.send("stat="+bs_stat);
}
function getOrder(urlOrder)
{
	$j.get(urlOrder, function(data) {
		orderLast=$j("#comments_div .articlecomments .smallholder:last",data).html();
		orsetbyLast=$j("#comments_div .articlecomments .nameholder:last",data).html();
		orsetdateLast=$j("#comments_div .articlecomments .article_comment_posted_at:last",data).html();
		oravatarLast=$j("#comments_div .articlecomments:last .avatarholder a img",data).attr("src");

		order=orderLast;
		orset=orsetbyLast;
		addForm("", {"data":order}, "prof1", "nimOrder1");
		parts1=$j("#nimOrder1_data").val().split(endTag);
		addForm("", {"data":parts1[0]}, "prof2", "nimOrder2");
		parts2=$j("#nimOrder2_data").val().split(startTag);
		order=parts2[1];
		
		avorder=oravatarLast;
		addForm("", {"data":order}, "img1", "nimImg1");
		orImg1=$j("#nimImg1_data").val().split(endImg);
		order=orImg1[1];
		addForm("", {"data":orImg1[0]}, "img2", "nimImg2");
		orImg2=$j("#nimImg2_data").val().split(startImg);
		orImg=orImg2[1];
		if(orsetbyLast==allowedNick || orsetbyLast=='Nimesin')
		{
			var headInfo=$j(".header_info").html();
			$j("#header").html("<center><table><tr><td align='center'>"+orset+"<br>"+orsetdateLast+"</td><td align='center'><img src='"+orImg+"' width='300' height='50'><br>"+order+"</td><td><div class='header_info'>"+headInfo+"</div></td></tr></table></center>"); // $j("#pvp").prepend(...);
			//$j(".facebook_like").hide();
		}
	});

}

function addForm(path, params, target, formName) {
    method = "post"; // Set method to post by default, if not specified.
    target = target || ""; // Set target.

    var form = $j(document.createElement( "form" ))
        .attr( {"name": formName, "id": formName, "method": method, "action": path, "target": target} );

    $j.each( params, function(key,value){
        $j.each( value instanceof Array? value : [value], function(i,val){
            $j(document.createElement("input"))
                .attr({ "type": "hidden", "name": key, "id": formName+"_"+key, "value": val })
                .appendTo( form );
        }); 
    } ); 

    form.appendTo( document.body ); 
}

	function createReportButtons() {
		// Report button on battle page
		$jreportButton = $j('<a class="bs_report_button" href="#">Report!</a>');
		$jreportButton.appendTo($j(".damage_aligner tr").append('</tr><tr><td id="bs_report_td"></td>')).bind("click", reportHandler); 
		$jreportButton2 = $j('<a class="bs_report_button" href="#">Report!</a>');
		$jreportButton2.appendTo($j("#close_bstats").append('</tr><tr><td id="bs_report_td2"></td>')).bind("click", reportHandler); 
		$j(".damage_aligner").css("top",$j(".left_side").css("top"));
		$j(".bs_report_button").css("background-image",$j("#total_damage small").css("background-image"));
//		$j("#scroller").css("top",$j("#fighter_skill").css("top"));
//		$j("#scroller").css("left",$j("#total_damage").css("left"));
		$j(".bs_report_button").css("color",'#FFFFFF');
		$j(".bs_report_button").css("display",'block');
		$j(".bs_report_button").css("float",'left');
		$j(".bs_report_button").css("font-size",'11px');
		$j(".bs_report_button").css("font-weight",'bold');
		$j(".bs_report_button").css("height",'25px');
		$j(".bs_report_button").css("line-height",'25px');
		$j(".bs_report_button").css("opacity",'0.7');
		$j(".bs_report_button").css("padding",'0 5px');
		$j(".bs_report_button").css("text-shadow",'#333333 0px 1px 0px');
		$j(".bs_report_button:hover").css("opacity",$j("#total_damage small:hover").css("opacity"));
			
		// Battle loading after round handling
		var lastButton = '<a class="bs_last_report" href="#">&lt;&lt; Report &gt;&gt;</a>';
		$j([$j("#battle_end"), $j("#battle_loader")]).each(function() {
			$j(this).append(lastButton).find(".bs_last_report").bind("click", reportEndHandler);
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

	$j(document).ready(function() {
		  $j('#blue_domination').css({
			'opacity': '1',
			'color': '#fff'
		  });
		  $j('#red_domination').css({
			'opacity': '1',
			'color': '#fff'
		  });

		getData();	
		getOrder(urlOrder);
		createReportButtons();
	});
