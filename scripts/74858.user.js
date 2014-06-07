// ==UserScript==
// @name           GLB Set all Players View settings
// @namespace      GLB
// @description    Sets all players to the same view setting
// @author         DDCUnderground
// @include        http://goallineblitz.com/game/home.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// 


$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};
	function viewclick(){
		if ($('#tab_DDCview').is('.subtab_off')) {
			$('#tab_DDCview').removeClass("subtab_off");
			$('#tab_DDCview').addClass("subtab_on");
			$('#DDCViewDiv').show();
		} else {
			$('#tab_DDCview').removeClass("subtab_on");
			$('#tab_DDCview').addClass("subtab_off");
			$('#DDCViewDiv').hide();
		}
	}

	function doViewApply(){
		workingwindow=window.open('',"Working", "width=130,height=120,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
		$('#tab_DDCview').hide();
		$('#DDCViewDiv').hide();
		if (!workingwindow.opener) workingwindow.opener = self;
		workingwindow.document.writeln('Working...');
		$('a[href*="/game/player.pl?player_id="]',$('#players')).each(function(z){
			var playerlink = $(this).attr('href');
			var playerid = playerlink.substring(playerlink.indexOf('=')+1, playerlink.length);
			var Viewstat = $('#DDCSelView').attr('value');
			var upgradeData = 'action=Update&player_id=' + playerid +'&allow_manager_view=' + Viewstat;
			GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://goallineblitz.com' + playerlink,
					 headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: encodeURI(upgradeData),				  	
					onload: function(response1) {
					}
				});
		})
		workingwindow.close();
		window.location.reload();
	}
	//build tab & div
	//build select for div
	var DDCloadview = buildobj('div','id', 'tab_DDCview','class', 'subtab_off');
	var DDCviewclick = buildobj('a','href','javascript:;');
	DDCviewtextnode = document.createTextNode("Set Players' View");
    DDCviewclick.appendChild(DDCviewtextnode);
    DDCloadview.appendChild(DDCviewclick);
    $('ul[id="tabs"]').append(DDCloadview);
    $('#tab_DDCview').bind('click', viewclick);
	var DDCViewDiv = buildobj('div','id','DDCViewDiv','class','content_container');
	var DDCSelView = buildobj('select','id', 'DDCSelView');
	DDCSelView.options[0]= new Option('Hide attributes from all', '0', true, true);
    DDCSelView.options[1]= new Option('Team owner can view', '1', false, false);
	DDCSelView.options[2]= new Option('Team owner/coord can view', '4', false, false);
	DDCSelView.options[3]= new Option('All Team GMs can view', '5', false, false);
	DDCSelView.options[4]= new Option('All Team members can view', '2', false, false);
	DDCSelView.options[5]= new Option('Everyone can view', '3', false, false);
	DDCViewDiv.appendChild(DDCSelView);
	var DDCApplyBut = buildobj('input','type','button','value','Apply','id','DDCApplyBut','name','DDCApplyBut');
	DDCViewDiv.appendChild(DDCApplyBut);
    $('#modules').prepend(DDCViewDiv);
	$('#DDCApplyBut').bind('click',doViewApply);
	viewclick();
	viewclick();

})
