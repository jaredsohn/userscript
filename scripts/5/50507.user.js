// ==UserScript==
// @name           CPU Team Tracker  Enhancer
// @namespace      rockitsauce
// @description    Enhancements to the Replay page
// @include       http://goallineblitz.com/game/leagues.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// ==/UserScript==	
$(document).ready( function() {
	var cpu_teams = [];
	
	function team(link, name, levels, team_name,team_link) {
		this.link = link;
		this.name = name;
		this.levels = levels;
		this.team_name = team_name;
		this.team_link = team_link;
	}
	
	function getter(link, name, levels) {
		$.get(link, function(data) {
			var context = $('.conference_table', data);
			$('.cpu', context).each( function() {
				var team_name = $(this).prev().text();
				var team_link = $(this).prev().attr('href');
				var cpu = new team(link, name, levels, team_name, team_link);
				cpu_teams.push(cpu);
			});
		});
	}
	
	$('.subhead_head').append("   <input type='button' id='find' value='Find CPU' /><input type='button' id='display' value='Show' />");
	$('body').append("<div id='teams' style='padding: 5px; overflow-y: auto; height: 400px; background-color: lightgrey; z-index: 9999; position: absolute; display: none;'><div style='float: right;' id='close'>[ X ]<br /></div></div>");
	
	$('#find').bind('click', function() {
		$('.league').each(function() {
			var link = $('a', this).attr('href');
			var name = $('a', this).text();
			var levels = $('div', this).text();
			getter(link, name, levels);
		});
	});
	
	$('#display').bind('click', function() {
		$.each(cpu_teams, function() {
			$('#teams').append("<div style='text-align: left;'><input type='checkbox' id='viewed' /><a href=" + this.link + " target='_blank'>" + this.name + "</a> - " + this.levels + " : <a href=" + this.team_link + " target='_blank'>" + this.team_name + "</a></div>");
		});
		
		$('#teams')
			.css('left', $(this).offset().left + $(this).width() + 5)
			.css('top', $(this).offset().top)
			.show();
		
		var load = GM_getValue('cpu_teams');
		var team_store = load != undefined ? load.split(',') : '';
		
		$.each(team_store, function() {
			$('a:contains("' + this + '")').prev().prev().attr('checked', true);
		});
		
		$('#teams :checkbox').bind('change', function() {
			var team = $(this).next().next().text();
			var store = GM_getValue('cpu_teams');
			
			if (store != undefined) {
				if (store.indexOf(team) == -1 && this.checked) {
					store += "," + team;
					GM_setValue('cpu_teams', store);
				}
				else if (!this.checked) {
					var remove = "," + team;
					store.replace(remove, "");
					GM_setValue('cpu_teams', store);
				}
			}
			else {
				GM_setValue('cpu_teams', team);
			}
		});
	});
	
	$('#close')
		.bind('click', function() {
			$('#teams').hide();
		})
		.css('cursor', 'pointer');
});