// ==UserScript==
// @name           MAL.net user statistics
// @namespace      QAZXSWEDCVFRTGBNHYUJMKIOLP
// @description    Shows user compability next to username on myanimelist.net
// @include        http://*myanimelist.net/*
// ==/UserScript==
//*/
var SUC_script_num = 56162; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 100 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

function trim(value) {
  value = value.replace(/^\s+/,'');
  value = value.replace(/\s+$/,'');
  return value;
}
unsafeWindow.GM_options = function(){
  window.setTimeout(function() {
	show_gender = GM_getValue('show_gender', true);
    show_compability = GM_getValue('show_compability', true);
    warn_high_comp = GM_getValue('warn_high_comp', false);
    show_comp_based_on = GM_getValue('show_comp_based_on', false);
    place_compscore_header = GM_getValue('place_compscore_header', false);
    show_user_info = GM_getValue('show_user_info', true);

	(show_gender == true) ? show_gender_checked = "checked" : show_gender_checked = "";
	(show_compability == true) ? show_compability_checked = "checked" : show_compability_checked = "";
	(warn_high_comp == true) ? warn_high_comp_checked = "checked" : warn_high_comp_checked = "";
	(show_comp_based_on == true) ? show_comp_based_on_checked = "checked" : show_comp_based_on_checked = "";
	(place_compscore_header == true) ? place_compscore_header_checked = "checked" : place_compscore_header_checked = "";
	(show_user_info == true) ? show_user_info_checked = "checked" : show_user_info_checked = "";

	org_title = $("#rightbody h1").html();
	org_content = $("#rightbody div:not('#GM_notice'):not('h1 > div'):first").html();

	$("#rightbody h1").html("MAL.net Greasemonkey helper");	
	$("#rightbody div:not('#GM_notice'):not('h1 > div'):first").html("<ul><li>Show any info behind users (overides most of the below properties):<input type='checkbox' id='gm_ui' value='true' "+show_user_info_checked+" /><ul><li>Show gender: <input type='checkbox' id='gm_gender' value='true' "+show_gender_checked+" /><li>Show anime compability: <input type='checkbox' id='gm_comp' value='true' "+show_compability_checked+" /><ul><li>Show # of animes anime compability is based on: <input type='checkbox' id='gm_comp_bo' value='true' "+show_comp_based_on_checked+" /></ul><li>Warn if a user is found with an anime compability of over 85%: <input type='checkbox' id='gm_warn_comp' value='true' "+warn_high_comp_checked+" /></ul><li>Place average compability score (compscore) into header: <input type='checkbox' id='gm_cs_he' value='true' "+place_compscore_header_checked+" /></ul><input type='button' onclick='javascript:GM_save()' value='Save' />");
  }, 0);
}
unsafeWindow.GM_save = function(){
  window.setTimeout(function() {
    GM_setValue("show_gender", $("#gm_gender").is(':checked'));
    GM_setValue("show_compability", $("#gm_comp").is(':checked'));
    GM_setValue("warn_high_comp", $("#gm_warn_comp").is(':checked'));
    GM_setValue("show_comp_based_on", $("#gm_comp_bo").is(':checked'));
    GM_setValue("place_compscore_header", $("#gm_cs_he").is(':checked'));
    GM_setValue("show_user_info", $("#gm_ui").is(':checked'));

    $("#rightbody h1").html(org_title);
    $("#rightbody div:not('#GM_notice'):not('h1 > div'):first").html(org_content);
    $("#rightbody div:not('#GM_notice'):not('h1 > div'):first").before("<div id='GM_notice' style='color:white;background:red;'>THE NEW USER STATISTICS WILL BE SHOWN ON NEXT PAGE LOAD</div>")
    setTimeout(function(){
		$("#GM_notice").fadeOut('slow');
    }, 3000);
  }, 0);
}
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
	
//Common function for pulling in user stats
	function LoadUserStats (sUrl,options, fCallBack)
	{		
		var defaults = {  
			show_compability :  true,
			show_gender : true,
			show_comp_based_on : false,
			warn_high_comp :  false
			};								    	  
    			
		var options = $.extend(defaults, options);		
		$.ajaxSetup({cache: true});
		$.get(sUrl, null, function(data){
			var returnObject = {
				userURL : sUrl,
				compability : "",
				based_on_text : "",
				gender : "",
				options : options
				};	
			if(options.show_compability){
				//GM_log("work out compatibility")
				var compability =  data.split('padding: 0 2px 1px 0; color: #fff; font-weight: bold; text-align: right;">');
				//alert(compability.length);
				if(compability[1] != undefined){
					compability = compability[1].split('</div>');
					if(compability[0].match("nbsp")){
						returnObject.compability = "";	
					}else{
						returnObject.compability = compability[0];

						if(options.show_comp_based_on){
							var comp_based_on = data.split("Anime You Share (");
							comp_based_on = comp_based_on[1].split(")");
							returnObject.based_on_text = "<sup>" + comp_based_on[0]+"</sup>";
						}						
					}
				}
			}
			if(options.show_gender){
				var gender = data.split('<td class="lightLink">Gender</td>');
				gender = gender[1].split('</td>');
				if(gender[0].match("specified")){
					returnObject.gender = "N/A ";	
				}else{
					returnObject.gender = trim(gender[0].replace('<td>',''));	
				}
			}
			        		
        	fCallBack(returnObject);
		});
		
	}
	
//To be called when the button is pushed.	
	unsafeWindow.BoyGirlDoStats= function()
	{
		$("#SHNStats").html("<div id=\"SHNStats_Boys\" style=\"width:100px;  padding:2px; white-space:nowrap; border: 1px solid black; overflow:hidden; float:left\"><strong>Boys </strong> <span> </span></div>" + 
			"<div id=\"SHNStats_Girls\" style=\"width:100px; white-space:nowrap; border: 1px solid black; padding:2px; overflow:hidden; float:left\"><strong>Girls </strong> <span> </span></div><div style=\"clear:both\" id=\"SHNStats_Total\"></div>");
		
		var SHNStats_Boys = $("#SHNStats_Boys");
		var SHNStats_Girls = $("#SHNStats_Girls");
		var SHNStats_Total = $("#SHNStats_Total");		
		var SHNStats_avgcomp = 	$("#SHNStats_avgcomp");
		var SHNStats_avgcomp_header = 	$("#SHNStats_avgcomp_header");
		
		var boysCount = 0;
		var girlsCount = 0;
		var totalCompCount = 0;
		var avgComp = 0;
				
		var re = new RegExp(".net/([^/]*/[^/]*/[^/]*)");
		var m = re.exec(window.location.href);
		if (m != null && m.length>0) 
		{		
			
			$.get('/' + m[1] + '/stats&m=all' , null, function(data)
			{
				var idxStart_topList;
				if(window.location.href.toLowerCase().indexOf(".net/anime")>0)
					idxStart_topList = data.indexOf("<strong>Eps Seen</strong>");
				else 
					idxStart_topList = data.indexOf("<strong>Chap. Read</strong>");
				var idxEnd_topList = data.indexOf("</table>",idxStart_topList);								
				re = new RegExp("<tr>[^<]*<td[^\r]*[^<]*<td[^<]*<a href=\"([^\"]*)");				
				data = data.substring(idxStart_topList,idxEnd_topList);				
				//GM_log(data)	
				var rows =  data.split("</tr>");				
				for(ridx=0;ridx<rows.length;ridx++)
				{									
					m = re.exec(rows[ridx]);
					if (m != null && m.length>0) 
					LoadUserStats(m[1],null,function(stats){									 
						 if(stats.gender.indexOf("Male")>=0)boysCount++;
						 if(stats.gender.indexOf("Female")>=0)girlsCount++;
						 if(parseFloat(stats.compability)>0){
						 	avgComp	=	(avgComp*(totalCompCount)+parseFloat(stats.compability))/(totalCompCount+1);
						 	totalCompCount++;
						 }
						 if(boysCount+girlsCount>0)
						 {
							var perCentBoys = Math.round((boysCount/(boysCount+girlsCount))*100);
							var perCentGirls = 100 - perCentBoys;
							SHNStats_Boys.find("span").html(perCentBoys + "%")
							SHNStats_Girls.find("span").html(perCentGirls + "%")
						 	SHNStats_Boys.css( { width: perCentBoys * 2+ "px",  backgroundColor:"blue", color:"white"   });
							SHNStats_Girls.css( { width: perCentGirls * 2 + "px", backgroundColor:"red", color:"white"   });
							SHNStats_Total.html("From " + (boysCount+girlsCount) + " top scoring users");
							SHNStats_avgcomp.html("<span class='dark_text'>CompScore: </span>" + Math.round(avgComp*10)/10);
							SHNStats_avgcomp_header.html(" ("+Math.round(avgComp*10)/10+"%)"); //Can't check for gm setting, as we are in unsafewindow
							window.setTimeout(function() {
								var re = new RegExp(".net/([^/]*)/([^/]*)/[^/]*");
								var m = re.exec(window.location.href);
								GM_setValue(m[1]+"_"+m[2]+"_avgComp", avgComp.toString());
								GM_setValue(m[1]+"_"+m[2]+"_perCentBoys", perCentBoys.toString());
							});
						 }
					});		
					
				}	
				
			});
		}		
		
	}

// All your GM code must be inside this function
    function letsJQuery() {
    	if(window.location.href == "http://myanimelist.net/modules.php?go=recommendation"){
    		var vals = new Array();
    		function sortMultiDimensional(a,b)
				{
				    // this sorts the array using the second element    
				    return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
				}
    		for each(var val in GM_listValues()){
    			var re = new RegExp("_avgComp$");
    			var m = re.exec(val);
				if (m != null && m.length>0){
    				vals.push(new Array(val,GM_getValue(val)));
    			}
    		}
    		vals = vals.sort(sortMultiDimensional).reverse();
    		
    		content = "<h1>Personal recommendations</h1><div id='rightcontent'>The following list is compiled from anime's for which you have calculated the exact compscore (by hitting the button in the left statistics menu on any anime or manga).";
    		content +="<ol id='recc'></ol>";
      		$("#rightbody").html(content);
    		var i =0;
    		for each(var val in vals){
    			i++;
    			if(i<11){
    				var data = val[0].split('_');
    				$("#recc").append("<li><a id='"+data[0]+"top"+data[1]+"' href='http://myanimelist.net/"+data[0]+"/"+data[1]+"/'>Loading...</a></li>");
					$.get('http://myanimelist.net/' + data[0] + '/' + data[1] + '/' , null, function(dataa){
						var re = new RegExp("Ranked #\\d+<\\/div>(.*?)<\\/h1>");
						var m  = re.exec(dataa);
						anime_name = m[1];
						var re = new RegExp('id="myinfo_(anime|manga)_id" value="(.*?)"');
						var m = re.exec(dataa);
						$("#"+m[1]+"top"+m[2]).html(anime_name);
					});    	
    			}else{
    				break;	
    			}	
    		}

    	}
    	$("a[href^=http://www.myanimelist.net/profile/]").each(function(idx, item){
    		$(this).attr("href", $(this).attr("href").replace("www.",''));
    	});
    	
    	
		var re = new RegExp(".net/([^/]*)/([^/]*)/[^/]*");
		var m = re.exec(window.location.href);
		if (m != null && m.length>0) 
			{		
				var saved_avgComp = GM_getValue(m[1]+"_"+m[2]+"_avgComp",0)*1;
				var saved_perCentBoys = GM_getValue(m[1]+"_"+m[2]+"_perCentBoys",0)*1;
			}
			
		if(saved_perCentBoys > 0){
			$("h2:contains('Statistics')").after("<div id='SHNStats'><div id=\"SHNStats_Boys\" style=\"width:100px;  padding:2px; white-space:nowrap; border: 1px solid black; overflow:hidden; float:left\"><strong>Boys </strong> <span> </span></div>" + 
			"<div id=\"SHNStats_Girls\" style=\"width:100px; white-space:nowrap; border: 1px solid black; padding:2px; overflow:hidden; float:left\"><strong>Girls </strong> <span> </span></div><div style=\"clear:both\" id=\"SHNStats_Total\"></div><input type=\"button\" value=\"Recalculate ratio and compscore\" onclick=\"BoyGirlDoStats()\" /></div>");
			var perCentBoys = saved_perCentBoys;
			var perCentGirls = 100 - saved_perCentBoys;
			var SHNStats_Boys = $("#SHNStats_Boys");
			var SHNStats_Girls = $("#SHNStats_Girls");
			SHNStats_Boys.find("span").html(perCentBoys + "%")
			SHNStats_Girls.find("span").html(perCentGirls + "%")
			SHNStats_Boys.css( { width: perCentBoys * 2+ "px",  backgroundColor:"blue", color:"white"   });
			SHNStats_Girls.css( { width: perCentGirls * 2 + "px", backgroundColor:"red", color:"white"   });
		}else{
			$("h2:contains('Statistics')").after("<div id='SHNStats'><input type=\"button\" value=\"Girls/Boys ratio and exact compScore\" onclick=\"BoyGirlDoStats()\" /></div>");
		}
		$("#SHNStats").after("<div id='SHNStats_avgcomp'></div>");
		$("h1 > div:contains('Ranked #')").append("<span id='SHNStats_avgcomp_header'></span>")
		$("div.spaceit").removeClass('spaceit').css('margin-bottom','3px');

        $("li:contains('My Blog')").after("<li><a id='gm_options' href='#' onclick='GM_options();return false;'>GM Options</a></li><li><a href='http://myanimelist.net/modules.php?go=recommendation'>GM Recommendations</a></li>");

		//GM_log("setting is " + GM_getValue('show_compability', true))		
		var option = {  
			show_compability : GM_getValue('show_compability', true),
			show_gender : GM_getValue('show_gender', true),
			show_comp_based_on : GM_getValue('show_comp_based_on', false),
			warn_high_comp : GM_getValue('warn_high_comp', false)
			};		

		var SHNStats_avgcomp = 	$("#SHNStats_avgcomp")		
		var SHNStats_avgcomp_header = 	$("#SHNStats_avgcomp_header")		
		var totalCompCount = 0;
		var avgComp = 0;
		var place_compscore_header = GM_getValue('place_compscore_header', false);


        $("a[href^=http://myanimelist.net/anime/]:not(:has('img')):not('div#horiznav_nav > ul > li > a'), a[href^=http://myanimelist.net/manga/]:not(:has('img')):not('div#horiznav_nav > ul > li > a')").each(
        	function(idx, item){
        		window.setTimeout(function() {
	        		var re = new RegExp(".net/([^/]*)/([^/]*)/[^/]*");
					var m = re.exec($(item).attr('href'));
					if (m != null && m.length>0) 
						{		
							var saved_avgComp = GM_getValue(m[1]+"_"+m[2]+"_avgComp","0");
						}
					if(Math.round(saved_avgComp*10)/10 > 0){
	        			$(item).after(" ("+Math.round(saved_avgComp*10)/10+"%)");
					}
        		});
        	}
        );			
        var show_user_info = GM_getValue('show_user_info', true);
		if(show_user_info){
        $("a[href^=http://myanimelist.net/profile/]:not(:has('img')):not('#leftcontent > ul > li > a')").each(
        	function(idx, item){
        				
				LoadUserStats($(item).attr('href'),option,function(stats)
				{	
					if(option.warn_high_comp){
        				//document.write("turned on");
        				if(parseFloat(stats.compability)>85){
        					if($("#GM_notice:contains('"+stats.compability+"')").length == 0){
								$("#rightbody div:first").before("<div id='GM_notice' style='color:white;background:red;'>User found with an anime compability of "+ stats.compability +", go to <a href='"+ stats.userURL +"'>anime profile</a></div>")
        					}
        					//alert($("#GM_notice:contains('"+compability+"')").length + " " + "#GM_notice:contains('"+compability+"')");						    
        				}
        			}

					if(parseFloat(stats.compability)>0 && saved_avgComp == 0){
						avgComp	=	(avgComp*(totalCompCount)+parseFloat(stats.compability))/(totalCompCount+1);
						totalCompCount++;
					}
					(saved_avgComp>0)?avgComp=saved_avgComp:"";
					(place_compscore_header==true) ? SHNStats_avgcomp_header.html(" ("+Math.round(avgComp*10)/10+"%)") : " ";
					
					(saved_avgComp>0)?SHNStats_avgcomp.html("<span class='dark_text'>CompScore: </span>" + Math.round(avgComp*10)/10 + " <small>(Old calculation)</small>"):SHNStats_avgcomp.html("<span class='dark_text'>CompScore: </span>~" + Math.round(avgComp*10)/10);
					
					if($(item).parent("[id^='messageuser']").length > 0){
        				$(item).parent().after(" (" + stats.compability + stats.based_on_text + " "  + stats.gender + ")<br />");
        			}else{
        				$(item).after(" ("+ trim(stats.compability + stats.based_on_text + " "  + stats.gender) +")");
        			}
					
					
				});
				
				
        	}
    	);
		}
    }
 
