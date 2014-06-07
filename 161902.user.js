// ==UserScript==
// @name       TM_matchResult_modded(test)
// @include    http://trophymanager.com/matches/*
// ==/UserScript==

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = (<><![CDATA[

function match_end() {
    
    language["tbah"]=number_format(match_info["attendance"]);
    element_venue.update();
    
	// Avoid multiple match_ends
	if (end_of_game) return;    
	match_last_min = 140;
	end_of_game = true;

	// Update stats
	update_stats();
	update_live_elements(true);
	element_score.update(true);

	// Change clock to whistle
	$(".clock").html($("<img src='/pics/matchviewer/whistle.png'/>").css("margin-top", "-5px").effect("pulsate"));
	
	// Remove data tables
	$(".stats").remove();
	$(".actiontext").remove();
	$(".actionclips").remove();
	
	$(".flash_button_disable").remove();
	
	$(".download_icon").hide();
    
	match_last_min = 140;
	//$(".mv_bottom").empty();
	
	$(".mv_bottom").append(
		$("<div class='post_report'>").append(
			$("<div class='mega_headline tcenter report_section_header'>").text("Game Breakdown"),
			$("<div class='half'>").append(template_events()),
			$("<div class='half'>").append(template_statistics()),
			$("<div class='mega_headline tcenter report_section_header'>").text("Player Breakdown"),
			$("<div class='quarter'>").append(template_field_list(lineup["home"])),
			$("<div class='half'>").append(template_field_div()),
			$("<div class='quarter'>").append(template_field_list(lineup["away"])),
			$("<div class='mega_headline tcenter report_section_header'>").text("Report and Venue"),
			$("<div class='half'>").append(template_report()),
			$("<div class='half'>").append(
				template_venue_div(),
				qm ? template_qm().css("padding-top","30px") : ""
			)
		)
	);    
}
    
]]></>).toString();
                     
document.getElementsByTagName('head')[0].appendChild(script);