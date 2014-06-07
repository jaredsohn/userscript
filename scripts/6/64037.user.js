// ==UserScript==
// @name           GLB Hide CPU players from roster
// @namespace      GLB
// @description    Adds button to hide CPU plays from roster page
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// 

$(document).ready(function(){

	var hidebutton = document.createElement('input');
	hidebutton.setAttribute('type','button');
	hidebutton.setAttribute('id', 'hidebut');
	hidebutton.setAttribute('value','Hide CPUs');
	hidebutton.addEventListener('click', toggleshow, false);
	$('div[class="medium_head"]:first').append('<br>');
	$('div[class="medium_head"]:first').append(hidebutton);


	function toggleshow(){
		var previouscount = $('tr[class="alternating_color1"]:visible, tr[class="alternating_color2"]:visible').size();
		var curtext = $('#hidebut').attr('value');
		if (curtext == 'Hide CPUs') {
			$('#hidebut').attr('value', 'Show CPUs');
		}else{
			$('#hidebut').attr('value', 'Hide CPUs');
		}
		$('span[class="cpu"]').each(function(t){
			$(this).parent().parent().parent().toggle();
		})
		var tcount = $('tr[class="alternating_color1"]:visible, tr[class="alternating_color2"]:visible').size();
		var divhtml = $('div[class="medium_head"]:first').html();
		divhtml = divhtml.replace(': '+previouscount,': '+tcount);
		$('div[class="medium_head"]:first').html(divhtml);
		$('#hidebut').click(toggleshow);

	}
})
