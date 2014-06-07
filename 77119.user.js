// ==UserScript==
// @name           GLB OAT Locations
// @namespace      GLB
// @author         DDCUnderground
// @description    Retrieves where each team is located
// @include        http://goallineblitz.com/game/forum_thread_list.pl?forum_id=358*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==



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

	function dooatlocas(){
		// disable button
		$('#ddcoatloca').hide();
		// display working window
		workingwindow=window.open('',"Working Window", "width=260,height=240,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
		if (!workingwindow.opener) workingwindow.opener = self;
		workingwindow.document.writeln('Working...');
		var posttext = '';
		// parse posting list
		$.ajax({
				async: false,
				type: 'GET',
				url: 'http://goallineblitz.com/game/forum_thread.pl?thread_id=3785856',
				success: function(returned_data) {
						 posttext = returned_data;
				}
		}
		)
		var oatteaminfo = new Array;
		$('a[href*="http://goallineblitz.com/game/team.pl?team_id="]',$('#post_content_33494404',posttext)).each(function(z){
			oatteaminfo[z] = new Array;
			oatteaminfo[z][0] = $(this).attr('href');
		})
		totalteamcount = oatteaminfo.length;
		for (var i=0;i<oatteaminfo.length;i++) {
			$.get(oatteaminfo[z][0],function(returned_data2){
				var curteamlink = $('a[href*="/game/team.pl?team_id="]:first',returned_data2).attr('href');
				curteamlink = 'http://goallineblitz.com' + curteamlink;
				for(var q=0;q<oatteaminfo.length;q++) {
					if (oatteaminfo[q][0] == curteamlink) {
						oatteaminfo[q][1] = $('div[class*="big_head"]',returned_data2).text();
						oatteaminfo[q][2] = $('#team_league',returned_data2).html();
						oatteaminfo[q][3] = $('#team_owner',returned_data2).html();
					}
				}
				totalteamcount = totalteamcount - 1;
				if (totalteamcount == 0) {
					workingwindow.close();
					var outputwindow = window.open('','OAT Locations Results',"width=260,height=240,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
					if (!outputwindow.opener) outputwindow.opener = self;
					for (var t=0;t<oatteaminfo.length;t++) {
						outputwindow.writeln('<a href="'+ oatteaminfo[t][0] + '" target="_blank">' + oatteaminfo[t][1] + '</a>&nbsp;&nbsp;&nbsp;' + oatteaminfo[t][2] + '&nbsp;&nbsp;&nbsp;' + oatteaminfo[t][3] + '<br>');
					}
				}
			})
		}

	}
	
	// pull each teams profile page
	// parse out location
	// store information into array
	// sort array by location
	// post information to HTML




	// build tab for display
	var totalteamcount = 0;
	var workingwindow ='';
	var ddcoatloca = buildobj('div','class','tab_off','id','ddcoatloca');
	var ddcoatlink = buildobj('a','id','ddcoatlink');
	var ddcoattext = document.createTextNode('OAT Locations');
	ddcoatlink.appendChild(ddcoattext);
	ddcoatloca.appendChild(ddcoatlink);
	$('div[class="subhead_link_bar"]:first').append(ddcoatloca);
	$('#ddcoatloca').bind('click',dooatlocas,false);
    
})
