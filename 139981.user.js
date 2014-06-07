// ==UserScript==
// @name        Ika filtro de movimientos
// @autor		Madacol
// @namespace	Ikariam movements filter
// @homepage	http://userscripts.org/scripts/show/139981
// @include     http://s*.ikariam.*/*
// @require     http://code.jquery.com/jquery-1.7.min.js
// @exclude     http://board.ikariam.*/*
// @exclude     http://support*.ikariam.*/*
// @version     1.2
//
// @history	1.2 BugFix: Buttons load ocrrectly now
// ==/UserScript==

const version = '1.2';

$(document).ready(function(){
 $("#js_GlobalMenu_military").click(main1);
});

function main1() {
	
	var temp = window.setInterval(main2, 1000);

	function main2() {
		
		if (document.getElementById('loadingPreview').style.display == 'block') {return};
		//try {
		if (document.getElementById('MovementFilter') != null) {
			window.clearInterval(temp);
			return
		};
				
		var filtro = document.createElement("div");
		filtro.id = 'MovementFilter';
		filtro.innerHTML = '<a id="Hide_Battles" href="javascript:;" style="position:relative; top:3px;" class="button">Esconder oleadas en combate</a>	<a id="Show_Own" href="javascript:;" style="position:relative; top:3px;" class="button">Mostrar Propias</a> <a id="Show_Foreign" href="javascript:;" style="position:relative; top:3px;" class="button">Mostrar Ajenas</a> <a id="Show_all" href="javascript:;" style="position:relative; top:3px;" class="button">Mostrar todas</a> '; 
		filtro.style.textAlign = 'center';
		var credits = document.createElement("div");
		credits.innerHTML = '<b><a href="http://userscripts.org/scripts/show/139981"><b>Ikariam Movements Filter</b></a></b>   Version '+version+'  ©2012 By <a href="http://board.ve.ikariam.com/index.php?page=User&userID=6243"><b>Madacol</b></a> and <a href="http://board.ve.ikariam.com/index.php?page=User&userID=7519"><b>Jlvdesign</b></a>';
		credits.style.textAlign = 'center';
		credits.style.marginTop = '10px';
		credits.style.marginBottom = '-10px';
		$('#js_MilitaryMovementsCombatsInProgress').append(filtro,credits);
					
		var Button_Hide_Battles = document.getElementById('Hide_Battles');
		Button_Hide_Battles.addEventListener("click", Hide_Battles_click, false);
		
		var Button_Show_Own = document.getElementById('Show_Own');
		Button_Show_Own.addEventListener("click", Show_Own_click, false);
		
		var Button_Show_Foreign = document.getElementById('Show_Foreign');
		Button_Show_Foreign.addEventListener("click", Show_Foreign_click, false);
		
		var Button_Show_all = document.getElementById('Show_all');
		Button_Show_all.addEventListener("click", Show_all_click, false);
		
		$("#js_militaryMovements").click(main1);
		$('#js_MilitaryMovementsFleetMovementsTable tr.own').each(function() { 
			$(this).find("a.action_icon").click(main1);
			this.click(main1) 
		});
		window.clearInterval(temp);
		
		
		function Hide_Battles_click() {

			$('#js_MilitaryMovementsFleetMovementsTable tr').each(function()  { 
				if ( ($(this).find("img").attr('src') == "skin/advisors/military/bang_ship.png") || ($(this).find("img").attr('src') == "skin/advisors/military/bang_soldier.png") ) {
					this.style.display = 'none';
				}; 
			});
		};
		
		function Show_Own_click () {
					
			$('#js_MilitaryMovementsFleetMovementsTable tr:gt(0)').each(function() {
				this.style.display = 'none';			
			});
			
			$('#js_MilitaryMovementsFleetMovementsTable tr.own').each(function()  { 
				this.style.display = '';
			});
		
		};
		
		function Show_Foreign_click () {
			
			Show_all_click();
			$('#js_MilitaryMovementsFleetMovementsTable tr.own').each(function()  { 
				this.style.display = 'none';
			});		
			
		};
		
		function Show_all_click () {
		
			$('#js_MilitaryMovementsFleetMovementsTable tr').each(function()  { 
				this.style.display = '';
			});
		
		};
		
	};
}