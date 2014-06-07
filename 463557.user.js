 // ==UserScript==
// @name         مساعد النهب
/**********************************************************************
 *	Init default parameters
 */
 // Before script runs variables
var pagesLoaded = false;
var currentGameTime = getCurrentGameTime();
var profileName;
var settings;

/**********************************************************************
 *	 Main
 */
redirect();
if($('#settingsDiv').length <= 0){
	// this function is run first to ensure all scripts are loaded
	// before the FA Filter script functions are ran
	loadJqueryPlugins();
}

/**********************************************************************
 *	 Auto page loading and settings creation
 */
function showAllRows(){
	var pages = $.trim($('#am_widget_Farm tr:last td:last').children().last().html().replace(/\D+/g, ''));
	if($('#endPage').val() == "max"){
		$('#endPage').text(pages);
	}
	$('#am_widget_Farm tr:last').remove();
	if(pages > parseInt($('#endPage').val(), 10)){
		pages = parseInt($('#endPage').val(),10);
	}

	setTimeout(function(){getPage((parseInt($('#startPage').val(),10)-1), pages);},1);
}

function removeFirstPage(){
	$('#am_widget_Farm').hide();
	$('#am_widget_Farm tr').slice(2).not(':last').remove();
	$('#am_widget_Farm tr:last').hide();
}

function getPage(i,pages){
	if(i<pages){
		changeHeader(filter_41 + " " + (i+1) + "/" + pages + " <img src='graphic/throbber.gif' height='24' width='24'></img>");
		var urlParams;
		
		if(urlParam('t') != 0){
			urlParams = {order: $('#orderBy').val(),dir: $('#direction').val(),screen: "am_farm", Farm_page: i, village: urlParam('village'), t: urlParam('t')};
		}
		else{
			urlParams = {order: $('#orderBy').val(),dir: $('#direction').val(),screen: "am_farm", Farm_page: i, village: urlParam('village')};
		}
		ajaxRequest = $.ajax({
			url: "/game.php",
			type: "GET",
			data: urlParams,
			dataType: "text",
			async: true,
			success: function(){
				setTimeout(function(){getPage(i+1, pages);},1);
			}
		});
		
		ajaxRequest.done(function(data) {
			// append all table rows retrieved from data except for first two and the last
			$('#am_widget_Farm tr', data).not(":last").slice(2).each(function(){
				$('#am_widget_Farm tr:last').after("<tr>"+$(this).html()+"</tr>");
			});
		});
	}
	else{
		setTimeout(function(){
			addTableInfo();
			applyFilters();
			changeHeader(filter_40);
			highlightRows();
		},1);
		$('#am_widget_Farm').show();
		pagesLoaded = true;
	}
}

function showSettings() {
	$('#am_widget_Farm').hide();
	setDefaultToggle();
	$('head').append("<link type='text/css' rel='stylesheet' href='https://dl.dropboxusercontent.com/u/26362756/faFilter/faFilter.css' />");
    $('div.vis').slice(1,2).after("<div class='vis' id='settingsDiv'><table class='settingsTable'><thead><tr><th colspan='5'class='vis'style='padding:0px;'><h4>"+filter_01+" - <a href='http://forum.tribalwars.net/showthread.php?266604-ntoombs19-s-FA-Filter' target='_blank'>"+filter_02+"</a> - "+filter_42+": <select id='language' style='margin:0px;' onchange='loadLanguage($(&quot;#language&quot;).val())'></select><span style='font-size:10px;float:right;font-weight:normal;font-style:normal'>"+filter_03+" <a href='http://forum.tribalwars.net/member.php?22739-ntoombs19' target='_blank'>ntoombs19</a> <img id='settingsToggle' style='cursor:pointer;' onclick='toggleSettingsWindow()' src='graphic/"+$.jStorage.get('display')[1]+".png'></span></h4></th></tr></thead><tbody id='settingsBody' style='display:"+$.jStorage.get('display')[0]+";'><tr><td class='col1' style='min-width:200px'><span>"+filter_04+" </span><input type='text' value='' size='2' maxlength='3' id='startPage'><span> "+filter_05+" </span><input type='text' value='' size='2' maxlength='3' id='endPage'></td><td colspan='3'><span style='font-weight:bold'>"+filter_06+" </span><img src='graphic/questionmark.png' width='13' height='13' id='enable_help'></td><td rowspan='5' valign='top'><form><input type='checkbox' id='all_none'><label for='all_none' style='font-weight:bold'> "+filter_07+" </label><img src='graphic/questionmark.png' width='13' height='13' id='report_help'><br><input type='checkbox' id='blue'><label for='blue'><img src='graphic/dots/blue.png'> "+filter_08+"</label><br><input type='checkbox' id='green'><label for='green'><img src='graphic/dots/green.png'> "+filter_09+"</label><br><input type='checkbox' id='yellow'><label for='yellow'><img src='graphic/dots/yellow.png'> "+filter_10+"</label><br><input type='checkbox' id='red_yellow'><label for='red_yellow'><img src='graphic/dots/red_yellow.png'> "+filter_11+"</label><br><input type='checkbox' id='red_blue'><label for='red_blue'><img src='graphic/dots/red_blue.png'> "+filter_12+"</label><br><input type='checkbox' id='red'><label for='red'><img src='graphic/dots/red.png'> "+filter_13+"</label></form></td></tr><tr><td rowspan='2'><label for='orderBy'>"+filter_14+": </label><select id='orderBy'val='distance'><option value='distance'>"+filter_15+"</option><option value='date'>"+filter_16+"</option></select><br/><label for='direction'>"+filter_17+": </label><select id='direction' val='desc'><option value='asc'>"+filter_18+"</option><option value='desc'>"+filter_19+"</option></select></td><td style='width:26px'><input type='checkbox' id='enable_hauls'></td><td style='width:110px'><label for='enable_hauls'>"+filter_20+"</label></td><td><input type='radio' name='hauls' id='full'><label for='full'><img src='graphic/max_loot/1.png'>"+filter_21+"</label><input type='radio' name='hauls' id='partial'><label for='partial'><img src='graphic/max_loot/0.png'>"+filter_22+"</label></td></tr><tr><td><input type='checkbox' id='enable_attacks'></td><td><label for='enable_attacks'>"+filter_23+"</label></td><td><select id='attackOperator'><option value='greater_than'>"+filter_24+"</option><option value='less_than'>"+filter_25+"</option><option value='equal_to'>"+filter_26+"</option></select><input type='text' id='attackValue' size='2' maxlength='2' value=''></td></tr><tr><td rowspan='2'><input type='checkbox' id='hideRecentFarms'><label for='hideRecentFarms'>"+filter_27+"</label><br><input type='text' id='hideRecentTime' size='2' maxlength='3' value=''>"+filter_28+" - <a href='#' onclick='deleteRecentlyFarmed()'>"+filter_29+" </a><img src='graphic/questionmark.png' width='13' height='13' id='recent_help'></td><td><input type='checkbox' id='enable_walls'></td><td><label for='enable_walls'>"+filter_30+"</label></td><td><select id='wallOperator'><option value='greater_than'>"+filter_24+"</option><option value='less_than'>"+filter_25+"</option><option value='equal_to'>"+filter_26+"</option></select><input type='text' id='wallValue' size='2' maxlength='2' value=''></td></tr><tr><td><input type='checkbox' id='enable_distances'></td><td><label for='enable_distances'>"+filter_31+"</label></td><td><select id='distanceOperator' val='greater_than'><option value='greater_than'>"+filter_24+"</option><option value='less_than'>"+filter_25+"</option><option value='equal_to'>"+filter_26+"</option></select><input type='text' id='distanceValue' size='2' maxlength='2' value=''></td></tr><tr><td rowspan='2'><select id='continentDisplay'><option value='hide'>"+filter_32+"</option><option value='show'>"+filter_33+"</option></select><label for='continents_list'>"+filter_34+" </label><img src='graphic/questionmark.png' height='13' id='continent_help'><br><input type='text' size='26' maxlength='150' id='continents_list' value=''></td><td><input type='checkbox' id='enable_scout'></td><td colspan='3'><label for='enable_scout'>"+filter_35+"</label><select id='scoutReportOperator'val='greater_than'><option value='greater_than'>"+filter_24+"</option><option value='less_than'>"+filter_25+"</option><option value='equal_to'>"+filter_26+"</option></select><input type='text' id='haulValue' size='9' maxlength='7' value=''></td></tr><tr><td><input type='checkbox' id='enable_time'></td><td colspan='3'><select id='timeFilter' val='hide'><option value='hide'>"+filter_32+"</option><option value='show'>"+filter_33+"</option></select><label for='enable_time'> "+filter_36+" </label><input type='text' id='timeValue' size='4' maxlength='4' value=''><span> "+filter_37+"</span></td></tr><tr><td><input type='checkbox' id='enable_autoRun'><label for='enable_autoRun'> "+filter_38+"</label></td><td><input type='checkbox' id='enable_hideC'></td><td colspan='3'><label for='enable_hideC'>"+filter_39+"</label></td></tr><tr><td colspan='5'><div style='float:left'><input type='submit' value='"+profile_02+"' onclick='runScript()'><input type='submit' value='"+profile_03+"' onclick='resetTable()'></div><div style='float:right'><img src='graphic/questionmark.png' width='13' height='13' id='profile_help'><label for='settingsProfile'>"+profile_01+":</label><select id='settingsProfile' onchange='changeProfile($(&quot;#settingsProfile&quot;).val())'></select><input type='submit' value='"+profile_04+"' onclick='createProfile()'><input type='submit' value='"+profile_05+"' onclick='setDefaultProfile()'><input type='submit' value='"+profile_06+"' onclick='deleteProfile()'><input type='submit' value='"+profile_07+"' onclick='updateProfile()'><input type='submit' value='"+profile_08+"' onclick='exportProfile()'><input type='submit' value='"+profile_09+"' onclick='importProfile()'></td></tr></tbody></div></table></div>");  
	formatSettings();
	$("#settingsDiv").css('display','block');
	$("body").css('margin-bottom','1000px');
	addLanguages();
	$("#language option[value='"+$.jStorage.get("language")+"']").attr("selected", "selected");
}

function formatSettings(){
	$("#all_none").bind("click", function(){
		$(this).closest('form').find(':checkbox').prop('checked', this.checked);
	});
	
	// report instructions
	var reportHelp = $('#report_help');
	reportHelp.attr('title',instructions_01);
	UI.ToolTip(reportHelp);
	
	// enable instrunctions
	var enableHelp = $('#enable_help');
	enableHelp.attr('title',instructions_02);
	UI.ToolTip(enableHelp);
	
	// continent instrunctions
	var continentHelp = $('#continent_help');
	continentHelp.attr('title',instructions_03);
	UI.ToolTip(continentHelp);
	
	// recent instrunctions
	var recentHelp = $('#recent_help');
	recentHelp.attr('title',instructions_04);
	UI.ToolTip(recentHelp);
	
	// profile instrunctions
	var profileHelp = $('#profile_help');
	profileHelp.attr('title',instructions_05);
	UI.ToolTip(profileHelp);
	
	loadDefaultProfile();
	fillProfileList();
}

function changeHeader(string) {
    $("h3:first").html(string);
}

function highlightRows(){
	$('#am_widget_Farm table').each(function() {
    	$('tr:even:gt(0) td', this).not("table:first").css("backgroundColor", "#FFF5DA");
    	$('tr:odd:gt(0) td', this).not("table:first").css("backgroundColor", "#F0E2BE");
	});
}

function moreRowsTip(){
	if($('#am_widget_Farm tr').length < 100){
		$('#am_widget_Farm h4:first a').after("<-- "+instructions_06+" -");
	}
}

function setDefaultToggle(){
	if($.jStorage.get("display") == null){
		$.jStorage.set("display", ["", "minus"]);
	}
}

function toggleSettingsWindow(){
	if($('#settingsBody').is(":visible")){
		$('#settingsToggle').attr("src", "graphic/plus.png");
		$('#settingsBody').hide();
		$.jStorage.set("display", ["none", "plus"]);
	}
	else{
		$('#settingsToggle').attr("src", "graphic/minus.png");
		$('#settingsBody').show();
		$.jStorage.set("display", ["", "minus"]);
	}
}

/**********************************************************************
 *	 Table formatting
 */
function customSendUnits(link, target_village, template_id, button) {
    button.closest("tr").hide();
    link = $(link);
    if (link.hasClass('farm_icon_disabled')) return false;
    var data = {
        target: target_village,
        template_id: template_id,
        source: game_data.village.id
    };
    $.post(Accountmanager.send_units_link, data, function (data) {
        if (data.error) {
            UI.ErrorMessage(data.error);
            button.closest("tr").show();
        } else {
        	setLocalStorageRow(button);
            //$('.farm_village_' + target_village).addClass('farm_icon_disabled');
            Accountmanager.farm.updateOwnUnitsAvailable(data.current_units);
        }
    }, 'json');
    return false
}

function customSendUnitsFromReport(link, target_village, report_id, button) {
	button.closest("tr").hide();
	link = $(link);
	if (link.hasClass('farm_icon_disabled')) return false;
	var data = {
		report_id: report_id
	};
	$.post(Accountmanager.send_units_link_from_report, data, function (data) {
		if (data.error) {
			UI.ErrorMessage(data.error);
			button.closest("tr").show();
		} 
		else {
        	setLocalStorageRow(button);
			if (typeof data.success === 'string') {
				UI.SuccessMessage(data.success, 1000);
				Accountmanager.farm.updateOwnUnitsAvailable(data.current_units)
			};
			//$('.report_' + target_village + ' .farm_icon').addClass('farm_icon_disabled')
		}
	}, 'json');
    return false
}

function setOnclick(button){
	var clickFunction = button.find('a').attr('onclick');
	if(typeof clickFunction != 'undefined'){
		var parameters = clickFunction.slice(clickFunction.indexOf("(")+1,clickFunction.indexOf(")"));
		var eachParameter = parameters.split(",");
		if(clickFunction.indexOf("FromReport") == -1){
			button.find('a').attr('onclick', 'return customSendUnits('+parameters+', $(this))');
		}
		else{
			button.find('a').attr('onclick', 'return customSendUnitsFromReport('+parameters+', $(this))');
		}
		
	}
}

function addTableInfo(){
	$('#am_widget_Farm tr th').slice(0,1).after("<th></th>");
	$('#am_widget_Farm tr:gt(1)').each(function(i){
		$(this).children("td").each(function(j) {
			switch(j){
				case 1:
					$(this).filter(":first").before("<td style='width:10px;font-weight:bold;'>"+(i+1)+"</td>")
					break;
				case 3:	
					var attackImg = $(this).find('img');
					if(typeof attackImg.attr('title') != 'undefined'){
						var numAttacks = attackImg.attr('title').replace(/\D/g, '');
						attackImg.after("<span style='font-weight:bold;'> ("+numAttacks+")</span>");
					}
					break;
				case 8:
					setOnclick($(this));
					break;
				case 9:
					setOnclick($(this));
					break;
				case 10:
					setOnclick($(this));
					break;	
			}
		});
	});
}

/**********************************************************************
 *	Filtering table with settings
 */
function runScript(){
	if(!pagesLoaded){
		moreRowsTip();
		removeFirstPage();
		setTimeout(showAllRows(), 1);
	}
	else{
		applyFilters();
	}

}

function applyFilters(){
	$('#am_widget_Farm tr:gt(0)').each(function(i) {
	    $(this).children("td").each(function(j) {
		    switch (j) {
		        case 2:
		        	reportSettings($(this));
		            break;
		        case 3:
		        	haulSettings($(this));
		            break;
		        case 4:
		    		hideRecentlyFarmed($(this));
		        	attackSettings($(this));
		        	continentSettings($(this));
		            break;
		        case 5:
		        	hideTime($(this));
		        	break;
		        case 6:
		        	scoutReportSettings($(this));
		        	break;
		        case 7:
		        	wallSettings($(this));
		        	break;
		        case 8:
		        	distanceSettings($(this));
		        	break;
		        case 11:
		        	cSettings($(this));
		        	break;
			}
	    });
	});
	changeHeader(filter_40);
}

function resetTable(){
	$('#am_widget_Farm tr').each(function(i) {
		$(this).show()
	});
}

function setLocalStorageRow(button){
	var reportLinkText = $.trim(button.closest("tr").children("td").eq(4).children("a").html());
	var sitter = urlParam('t');
	var localTitle = "sitter:"+sitter+", village:"+reportLinkText+", world:"+getURL()[0];
	$.jStorage.set(localTitle, localTitle, {TTL: $('#hideRecentTime').val()*60000});
}

/**********************************************************************
 *	Settings logic
 */
function reportSettings(cell){
	if (cell.html().indexOf("blue") >= 0 && $('#blue').is(':checked'))
		cell.closest("tr").hide();
	if (cell.html().indexOf("green") >= 0 && $('#green').is(':checked'))
		cell.closest("tr").hide();
	if (cell.html().indexOf("yellow") >= 0 && $('#yellow').is(':checked'))
		cell.closest("tr").hide();
	if (cell.html().indexOf("red_yellow") >= 0 && $('#red_yellow').is(':checked'))
		cell.closest("tr").hide();
	if (cell.html().indexOf("red_blue") >= 0 && $('#red_blue').is(':checked'))
		cell.closest("tr").hide();
	if (cell.html().indexOf("red") >= 0 && $('#red').is(':checked'))
		cell.closest("tr").hide();
}

function haulSettings(cell){
	if($('#enable_hauls').is(':checked')){
		// Hides full hauls
		if (cell.html().indexOf("max_loot/1") >= 0 && $('#full').is(':checked')){
			cell.closest("tr").hide();
		}
		// Hides partial hauls
		if (cell.html().indexOf("max_loot/0") >= 0 && $('#partial').is(':checked')){
			cell.closest("tr").hide();
		}
		// Hides scout reports
		if (cell.html().indexOf("max_loot") == -1 && ($('#full').is(':checked') || $('#partial').is(':checked'))){
			cell.closest("tr").hide();
		}
	}
}

function attackSettings(cell){
	var numAttacks;
	var attackImg = cell.find('img');
	if(typeof attackImg.attr('title') != 'undefined'){
		numAttacks = attackImg.attr('title').replace(/\D/g, '');
	}
	else{
		numAttacks = 0;
	}
	if($('#enable_attacks').is(':checked')){
		switch ($.trim($('#attackOperator').val())) { 
	        case "greater_than":
	        	if(numAttacks > $("#attackValue").val()){
		        	cell.closest("tr").hide();
	        	}
	            break;
	        case "less_than":
	        	if(numAttacks < $("#attackValue").val()){
		        	cell.closest("tr").hide();
	        	}
	            break;
	        case "equal_to":
	        	if(numAttacks == $("#attackValue").val()){
		        	cell.closest("tr").hide();
	        	}
	            break; 
		}
	}
}

function wallSettings(cell){
	if($('#enable_walls').is(':checked')){
		var wallLvl = cell.html();
		if(wallLvl == '?'){
			wallLvl = 0;
		}
		switch ($.trim($('#wallOperator').val())) { 
	        case "greater_than":
	        	if(wallLvl > $("#wallValue").val()){		
		        	cell.closest("tr").hide();
	        	}
	            break;
	        case "less_than":
	        	if(wallLvl < $("#wallValue").val()){
		        	cell.closest("tr").hide();
	        	}
	            break;
	        case "equal_to":
	        	if(wallLvl == $("#wallValue").val()){
		        	cell.closest("tr").hide();
	        	}
	            break; 
		}
	}
}

function distanceSettings(cell){
	if($('#enable_distances').is(':checked')){
		var distanceLvl = cell.html();
		switch ($.trim($('#distanceOperator').val())) { 
	        case "greater_than":
	        	if(parseFloat(distanceLvl) > parseFloat($("#distanceValue").val())){		
		        	cell.closest("tr").hide();
	        	}
	            break;
	        case "less_than":
	        	if(parseFloat(distanceLvl) < parseFloat($("#distanceValue").val())){
		        	cell.closest("tr").hide();
	        	}
	            break;
	        case "equal_to":
	        	if(parseFloat(distanceLvl) == parseFloat($("#distanceValue").val())){
		        	cell.closest("tr").hide();
	        	}
	            break; 
		}
	}
}

function continentSettings(cell){
	var continent = cell.find('a').html();
	if(typeof continent != 'undefined'){
		continent = continent.substr(continent.length - 2);
		var filteredContinents = $('#continents_list').val().split('.')
		if($.inArray(continent, filteredContinents) >= 0 && $.trim($('#continentDisplay').val()) == "hide"){
			cell.closest("tr").hide();
		}
		if($.inArray(continent, filteredContinents) == -1 && $.trim($('#continentDisplay').val()) == "show"){
			cell.closest("tr").hide();
		}
	}
}

function cSettings(cell){
	if($('#enable_hideC').is(':checked') && cell.find('a').hasClass('farm_icon_disabled')){
		cell.closest("tr").hide();
	}
}

function hideRecentlyFarmed(cell){
	if($('#hideRecentFarms').is(':checked')){
		var reportLinkText = $.trim(cell.children("a").html());
		var sitter = urlParam('t');
		localTitle = "sitter:"+sitter+", village:"+reportLinkText+", world:"+getURL()[0];
		if($.jStorage.get(localTitle) != null){
			cell.closest("tr").hide();
		}
	}
}

function deleteRecentlyFarmed(){
	$('#am_widget_Farm tr:gt(0)').each(function(i) {
	    $(this).children("td").each(function(j){
	    	if(j == 4){
		    	reportLinkText = $.trim($(this).children("a").html());
				sitter = urlParam('t');
				localTitle = "sitter:"+sitter+", village:"+reportLinkText+", world:"+getURL()[0];
				if($.jStorage.get(localTitle) != null){
					$.jStorage.deleteKey(localTitle);
				}
			}
	    });
	});
}

function scoutReportSettings(cell){
	var total;
	if($('#enable_scout').is(':checked')){
		if($.trim(cell.find('span').html()) == "?"){
			total = 0;
		}
		else{
			var wood = parseInt(cell.children('span').eq(0).html().replace(/\D+/g, ''));
			var clay = parseInt(cell.children('span').eq(1).html().replace(/\D+/g, ''));
			var iron = parseInt(cell.children('span').eq(2).html().replace(/\D+/g, ''));
			total = wood+clay+iron;
		}

		switch ($.trim($('#scoutReportOperator').val())) { 
	        case "greater_than":
	        	if(total > parseInt($('#haulValue').val())){	
		        	cell.closest("tr").hide();
	        	}
	            break;
	        case "less_than":
	        	if(total < parseInt($('#haulValue').val())){
		        	cell.closest("tr").hide();
	        	}
	            break;
	        case "equal_to":
	        	if(total == parseInt($('#haulValue').val())){
		        	cell.closest("tr").hide();
	        	}
	            break; 
		}
	}
}

function getCurrentGameTime(){
	var serverTime = $('#serverTime').html().split(':');
	var serverDate = $('#serverDate').html().split('/');	
	return new Date(serverDate[2], serverDate[1]-1, serverDate[0], serverTime[0], serverTime[1], serverTime[2], 0);
}

function getVillageAttackedTime(cell){
	var time = cell.html();
	var cellTime = time.split(' ');
	var attackDay;
	var attackTime;
	for (var i = 0; i < cellTime.length; i++){
		if(cellTime[i].indexOf('.') > -1){
			attackDay = cellTime[i];
		}
		if(cellTime[i].indexOf(':') > -1){
			attackTime = cellTime[i];
		}
	}
	if(typeof attackDay == 'undefined'){
		var day = currentGameTime.getDate();
		var month = currentGameTime.getMonth();
		var year = currentGameTime.getFullYear();
		var time = attackTime.split(':');
		var hours = time[0];
		var minutes = time[1];
		var seconds = time[2];
		return new Date(year, month, day, hours, minutes, seconds, 0);
	}
	else{
		var cellDay = attackDay.split('.');
		var day = cellDay[1];
		var month = cellDay[0]-1;
		if(currentGameTime.getMonth() == 0 && month == 11)
			var year = currentGameTime.getFullYear()-1;
		else
			var year = currentGameTime.getFullYear();
		var time = attackTime.split(':');
		var hours = time[0];
		var minutes = time[1];
		var seconds = time[2];
		return new Date(year, month, day, hours, minutes, seconds, 0);
	}
}

function hideTime(cell){
	if($('#enable_time').is(':checked')){
		var t1 = currentGameTime;
		var t2 = getVillageAttackedTime(cell);
		var dif = t1.getTime() - t2.getTime();
		var minutesBetween = Math.abs(parseInt(dif/1000/60));
		switch ($.trim($('#timeFilter').val())) { 
			case "hide":
				if(minutesBetween < parseInt($('#timeValue').val())){
					cell.closest("tr").hide();
				}
				break;
			case "show":
				if(minutesBetween > parseInt($('#timeValue').val())){
					cell.closest("tr").hide();
				}
				break;
		}
	}
}

/**********************************************************************
 *	Settings profiles functionality
 */
function loadDefaultProfile(){
	if($.jStorage.get("profile:"+profile_10) == null){
		$.jStorage.set("profile:"+profile_10,["","","distance","ascending",false,false,false,false,false,false,false,false,"",false,false,false,false,"greater_than","",false,"greater_than","",false,"greater_than","",false,"greater_than","","hide","",false,"hide","",false,false]);
		$.jStorage.deleteKey("profileList");
		$.jStorage.set("profileList",[profile_10]);
	}
	loadProfile(profile_10);
	$('#settingsProfile').val(profile_10);
	
}

function setDefaultProfile(){
	if($('#settingsProfile').val() == profile_10){
		var newProfile = confirm(dialog_02);
		if (newProfile){
		  createProfile();
		  setDefaultProfile();
		}
		else{
		  return false;
		}
	}
	else{
		var profile = $.jStorage.get("profile:"+$('#settingsProfile').val());
		$.jStorage.set("profile:"+profile_10,profile);
	}

}

function fillProfileList(){
	var profileList = $.jStorage.get("profileList");
	$.each(profileList, function(i,val){
		$('#settingsProfile').append("<option value='"+val+"'>"+val+"</option>")
	});
	$('#settingsProfile').val($.jStorage.get("DefaultProfile"));
	if($('#enable_autoRun').is(':checked')){
		runScript();
	}
}

function createProfile(){
	var profileName = prompt(dialog_03+":");
	if($.inArray(profileName, $.jStorage.get("profileList")) != -1){
		alert(dialog_04);
		createProfile();
		return false;
	}
	if(profileName == ""){
		alert(dialog_05);
		createProfile();
		return false;
	}
	var profiles;
	if (profileName != null && profileName != ""){
		var settings = [];
		settings.push($('#startPage').val());
		settings.push($('#endPage').val());
		settings.push($('#orderBy').val());
		settings.push($('#direction').val());
		settings.push($('#all_none').prop('checked'));
		settings.push($('#blue').prop('checked'));
		settings.push($('#green').prop('checked'));
		settings.push($('#yellow').prop('checked'));
		settings.push($('#red_yellow').prop('checked'));
		settings.push($('#red_blue').prop('checked'));
		settings.push($('#red').prop('checked'));
		settings.push($('#hideRecentFarms').prop('checked'));
		settings.push($('#hideRecentTime').val());
		settings.push($('#enable_hauls').prop('checked'));
		settings.push($('#full').prop('checked'));
		settings.push($('#partial').prop('checked'));
		settings.push($('#enable_attacks').prop('checked'));
		settings.push($('#attackOperator').val());
		settings.push($('#attackValue').val());
		settings.push($('#enable_walls').prop('checked'));
		settings.push($('#wallOperator').val());
		settings.push($('#wallValue').val());
		settings.push($('#enable_distances').prop('checked'));
		settings.push($('#distanceOperator').val());
		settings.push($('#distanceValue').val());
		settings.push($('#enable_scout').prop('checked'));
		settings.push($('#scoutReportOperator').val());
		settings.push($('#haulValue').val());
		settings.push($('#continentDisplay').val());
		settings.push($('#continents_list').val());
		settings.push($('#enable_time').prop('checked'));
		settings.push($('#timeFilter').val());
		settings.push($('#timeValue').val());
		settings.push($('#enable_autoRun').prop('checked'));
		settings.push($('#enable_hideC').prop('checked'));
		
		$.jStorage.set("profile:"+profileName, settings);
		var profileList = $.jStorage.get("profileList");
		profileList.push(profileName);
		$.jStorage.set("profileList",profileList)
		$('#settingsProfile').append("<option value='"+profileName+"'>"+profileName+"</option>");
		$('#settingsProfile').val(profileName);
	}
}

function loadProfile(profile){
	var settings = $.jStorage.get("profile:"+profile);
	$('#startPage').val(settings[0]);
	$('#endPage').val(settings[1]);
	$('#orderBy').val(settings[2]);
	$('#direction').val(settings[3]);
	$('#all_none').prop('checked',settings[4]);
	$('#blue').prop('checked',settings[5]);
	$('#green').prop('checked',settings[6]);
	$('#yellow').prop('checked',settings[7]);
	$('#red_yellow').prop('checked',settings[8]);
	$('#red_blue').prop('checked',settings[9]);
	$('#red').prop('checked',settings[10]);
	$('#hideRecentFarms').prop('checked',settings[11]);
	$('#hideRecentTime').val(settings[12]);
	$('#enable_hauls').prop('checked',settings[13]);
	$('#full').prop('checked',settings[14]);
	$('#partial').prop('checked',settings[15]);
	$('#enable_attacks').prop('checked',settings[16]);
	$('#attackOperator').val(settings[17]);
	$('#attackValue').val(settings[18]);
	$('#enable_walls').prop('checked',settings[19]);
	$('#wallOperator').val(settings[20]);
	$('#wallValue').val(settings[21]);
	$('#enable_distances').prop('checked',settings[22]);
	$('#distanceOperator').val(settings[23]);
	$('#distanceValue').val(settings[24]);
	$('#enable_scout').prop('checked',settings[25]);
	$('#scoutReportOperator').val(settings[26]);
	$('#haulValue').val(settings[27]);
	$('#continentDisplay').val(settings[28]);
	$('#continents_list').val(settings[29]);
	$('#enable_time').prop('checked',settings[30]);
	$('#timeFilter').val(settings[31]);
	$('#timeValue').val(settings[32]);
	$('#enable_autoRun').prop('checked',settings[33]);
	$('#enable_hideC').prop('checked',settings[34]);
}

function changeProfile(profile){
	loadProfile(profile);
	resetTable();
	applyFilters();
}

function deleteProfile(){
	var profileName = $('#settingsProfile').val();
	if(profileName == profile_10){
		alert(dialog_06);
	}
	else{
		var profilesList = $.jStorage.get("profileList");
		profilesList.splice(profilesList.indexOf(profileName), 1);
		$.jStorage.set("profileList", profilesList);
		$.jStorage.deleteKey("profile:"+profileName);
		$("#settingsProfile option[value='"+profileName+"']").remove();
		loadDefaultProfile(profile_10);
	}
}

function updateProfile(){
	var profileName = $('#settingsProfile').val();
	var settings = [];
	settings.push($('#startPage').val());
	settings.push($('#endPage').val());
	settings.push($('#orderBy').val());
	settings.push($('#direction').val());
	settings.push($('#all_none').prop('checked'));
	settings.push($('#blue').prop('checked'));
	settings.push($('#green').prop('checked'));
	settings.push($('#yellow').prop('checked'));
	settings.push($('#red_yellow').prop('checked'));
	settings.push($('#red_blue').prop('checked'));
	settings.push($('#red').prop('checked'));
	settings.push($('#hideRecentFarms').prop('checked'));
	settings.push($('#hideRecentTime').val());
	settings.push($('#enable_hauls').prop('checked'));
	settings.push($('#full').prop('checked'));
	settings.push($('#partial').prop('checked'));
	settings.push($('#enable_attacks').prop('checked'));
	settings.push($('#attackOperator').val());
	settings.push($('#attackValue').val());
	settings.push($('#enable_walls').prop('checked'));
	settings.push($('#wallOperator').val());
	settings.push($('#wallValue').val());
	settings.push($('#enable_distances').prop('checked'));
	settings.push($('#distanceOperator').val());
	settings.push($('#distanceValue').val());
	settings.push($('#enable_scout').prop('checked'));
	settings.push($('#scoutReportOperator').val());
	settings.push($('#haulValue').val());
	settings.push($('#continentDisplay').val());
	settings.push($('#continents_list').val());
	settings.push($('#enable_time').prop('checked'));
	settings.push($('#timeFilter').val());
	settings.push($('#timeValue').val());
	settings.push($('#enable_autoRun').prop('checked'));
	settings.push($('#enable_hideC').prop('checked'));
	$.jStorage.set("profile:"+profileName, settings);
}

function exportProfile(){
	var profileName = $('#settingsProfile').val();
	var settings = $.jStorage.get("profile:"+profileName);
	if(profileName == profile_10){
		alert(dialog_07);
	}
	else{
		var profileSettings = prompt(dialog_08,dialog_09A+""+profileName+""+dialog_09B+""+profileName+","+settings+""+dialog_09C);
	}
}

function importProfile(){
	var profileSettings = prompt(dialog_10+":",dialog_11);
	profileSettings = profileSettings.split(",");
	var profileName = profileSettings[0];
	profileSettings.shift();
	var profileList = $.jStorage.get("profileList");
	if($.inArray(profileName, profileList) != -1){
		alert(dialog_12);
		return false;
	}
	else{
		for(i = 0; i <= profileSettings.length; i++){
			if(profileSettings[i] === "false" || profileSettings[i] === "true"){
				profileSettings[i] = parseBool(profileSettings[i]);
			}
		}
		$.jStorage.set("profile:"+profileName, profileSettings);
		profileList.push(profileName);
		$.jStorage.set("profileList",profileList);
		$('#settingsProfile').append("<option value='"+profileName+"'>"+profileName+"</option>");
		$('#settingsProfile').val(profileName);
		loadProfile(profileName);
	}
}

/**********************************************************************
 *	Language functions
 */
function setDefaultLanguage(){
	var url = getURL();
	url.shift();
	var domain = url.join('.');
	switch(domain){
		/*case "die-staemme.de", "staemme.ch":
			$.jStorage.set("language", "de");//german
			break;*/
		/*case "tribalwars.nl":
			$.jStorage.set("language", "nl");//dutch
			break;*/
		/*case "plemiona.pl":
			$.jStorage.set("language", "pl");//polish
			break;*/
		/*case "tribalwars.se":
			$.jStorage.set("language", "sv");//swedish
			break;*/
		/*case "tribalwars.com.br", "tribalwars.com.pt":
			$.jStorage.set("language", "pt");//portuguese
			break;*/
		/*case "divokekmeny.cz":
			$.jStorage.set("language", "cs");//czech
			break;*/
		/*case "bujokjeonjaeng.org":
			$.jStorage.set("language", "ko");//korean
			break;*/
		/*case "triburile.ro":
			$.jStorage.set("language", "ro");//romanian
			break;*/
		/*case "voyna-plemyon.ru":
			$.jStorage.set("language", "ru");//russian
			break;*/
		/*case "fyletikesmaxes.gr":
			$.jStorage.set("language", "el");//greek
			break;*/
		/*case "tribalwars.no.com":
			$.jStorage.set("language", "no");//norwegian
			break;*/
		/*case "divoke-kmene.sk":
			$.jStorage.set("language", "sk");//slovak
			break;*/
		/*case "klanhaboru.hu":
			$.jStorage.set("language", "hu");//hungarian
			break;*/
		/*case "tribalwars.dk":
			$.jStorage.set("language", "da");//danish
			break;*/
		/*case "tribals.it":
			$.jStorage.set("language", "it");//italian
			break;*/
		/*case "klanlar.org":
			$.jStorage.set("language", "tr");//turkish
			break;*/
		/*case "guerretribale.fr":
			$.jStorage.set("language", "fr");//french
			break;*/
		case "guerrastribales.es":
			$.jStorage.set("language", "es");//spanish
			break;
		/*case "tribalwars.fi":
			$.jStorage.set("language", "fi");//finnish
			break;*/
		/*case "tribalwars.ae":
			$.jStorage.set("language", "ar");//arabic
			break;*/
		/*case "vojnaplemen.si":
			$.jStorage.set("language", "sl");//slovene
			break;*/
		/*case "genciukarai.lt":
			$.jStorage.set("language", "lt");//lithuanian
			break;*/
		case "plemena.com":
			$.jStorage.set("language", "hr");//croatian
			break;
		/*case "perangkaum.net":
			$.jStorage.set("language", "id");//indonesian
			break;*/
		/*case "tribalwars.asia":
			$.jStorage.set("language", "th");//thai
			break;*/
		default:
			$.jStorage.set("language", "en");//english
			break;
	}
}

function loadLanguage(lang){
	$.jStorage.set("language",lang);
	var profileList = $.jStorage.get("profileList");
	var defaultProfile = $.jStorage.get("profile:"+profile_10);
	$.getScript('https://dl.dropboxusercontent.com/u/26362756/faFilter/faLang/'+lang+'.js',function(){
		$('#settingsDiv').remove();
		profileList[0] = profile_10;
		$.jStorage.set("profileList", profileList);
		$.jStorage.set("profile:"+profile_10, defaultProfile);
		changeHeader(filter_40);
		$('#am_widget_Farm').show();
		showSettings();
	});
}

function addLanguages(){
	$('#language').append("<option value='en'>English</option>");
	//$('#language').append("<option value='de'>Deutsch</option>");
	//$('#language').append("<option value='nl'>Nederlands</option>");
	//$('#language').append("<option value='pl'>polszczyzna</option>");
	//$('#language').append("<option value='sv'>Svensk</option>");
	//$('#language').append("<option value='pt'>Portuguأھs</option>");
	//$('#language').append("<option value='cs'>ؤŒeإ،tina</option>");
	//$('#language').append("<option value='ko'>ي•œêµ­ى–´</option>");
	//$('#language').append("<option value='ro'>ذ رƒرپرپذ؛ذ¸ذ¹</option>");
	//$('#language').append("<option value='el'>خ•خ»خ»خ·خ½خ¹خ؛خ¬</option>");
	//$('#language').append("<option value='no'>Norsk</option>");
	//$('#language').append("<option value='sk'>Slovenؤچina</option>");
	//$('#language').append("<option value='hu'>Magyar</option>");
	//$('#language').append("<option value='da'>Dansk</option>");
	//$('#language').append("<option value='it'>Italiano</option>");
	//$('#language').append("<option value='tr'>Tأ¼rkأ§e</option>");
	//$('#language').append("<option value='fr'>Franأ§ais</option>");
	$('#language').append("<option value='es'>Espaأ±ol</option>");
	//$('#language').append("<option value='fi'>finnish</option>");
	//$('#language').append("<option value='ar'>ط§ظ„ظ„ط؛ط© ط§ظ„ط¹ط±ط¨ظٹط©</option>");
	//$('#language').append("<option value='sl'>Slovenإ،ؤچina</option>");
	//$('#language').append("<option value='lt'>Lietuviإ³</option>");
	$('#language').append("<option value='hr'>Hrvatski</option>");
	//$('#language').append("<option value='id'>Bahasa Indonesia</option>");
	//$('#language').append("<option value='th'>à¸ à¸²à¸©à¸²à¹„à¸—à¸¢</option>");
}

/**********************************************************************
 *	Outer functions
 */
function parseBool(string){
	var bool = (string === "true");
	return bool;
}

function redirect(){
	var url=window.location.toString();
	var villageID = urlParam('village');
	var farmAssistant = urlParam('screen');
	url = "game.php?screen=am_farm&village="+villageID;
	if(urlParam('t') != 0){
		url += "&t="+urlParam('t');
	}
	if(farmAssistant != "am_farm"){
		window.location.href=url;
		throw new Error("Redirecting to "+url);
	}
}

function getURL(){
	var domain = window.location.hostname;
	domain = domain.split('.');
	return domain;
}

function urlParam(name){
	var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) {
		return 0;
	}
	return results[1] || 0;
};

function loadJqueryPlugins(){
	$.getScript("https://dl.dropboxusercontent.com/u/26362756/libraries/jstorage2.js",function(){
		$.getScript("https://dl.dropboxusercontent.com/u/26362756/libraries/json2.js",function(){
			//$.jStorage.deleteKey("language");
			if($.jStorage.get("language") == null){
				setDefaultLanguage();
			}
			$.getScript('https://dl.dropboxusercontent.com/u/26362756/faFilter/faLang/'+$.jStorage.get("language")+'.js',function(){
				showSettings();
			});
		});
	});
}
 // ==/UserScript==
