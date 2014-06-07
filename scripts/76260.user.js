// ==UserScript==
// @name           Include points after progress bars on halo reach commendations
// @namespace      halo-reach
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//created by drowsap on reddit  http://reddit.com/user/drowsap

jQuery(".drowsapPoints").remove();
jQuery(".barContainer").each(function() {
	var pointsDiv = jQuery("<div class='drowsapPoints'/>").css({fontSize:"12px",marginTop:"5px",color:"#444",backgroundColor:"#CCC",padding:"10px",border:"2px solid #444","width":"110%",textAlign:"center"});
	var percentage = jQuery(this).find(".bar").css("width");
	percentage = percentage.replace("%","");
	var rankDivSrc = jQuery(this).prev("img").attr("src").toLowerCase();
	var rankType = 
	(rankDivSrc.indexOf("steel")>=0 ? "steel" :
		(rankDivSrc.indexOf("bronze")>=0 ? "bronze" : 
			(rankDivSrc.indexOf("silver")>=0 ? "silver" :
				(rankDivSrc.indexOf("gold")>=0 ? "gold" :
					(rankDivSrc.indexOf("onyx")>=0 ? "onyx" :"")
				)
			)
		)
	);
	var totalPoints = 0;
	var rankLimitPoints = 0;
	switch(rankType){
		case "steel":
		rankLimitPoints = 100;
		break;
		case "bronze":
		rankLimitPoints = 600;
		break;
		case "silver":
		rankLimitPoints = 1200;
		break;	
		case "gold":
		rankLimitPoints = 2400;
		break;	
		case "onyx":
		rankLimitPoints = 4800;
		break;
		default:
		totalPoints = "Could not calculate";
	}
	totalPoints = Math.round((percentage*rankLimitPoints)/100);
	pointsDiv.html("<b>Total Points until "+rankType+":</b> <br/>"+totalPoints+" / "+rankLimitPoints);
	jQuery(this).after(pointsDiv);
});