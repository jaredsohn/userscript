// JavaScript Document
// ==UserScript==
// @name           Cargo Ships
// @autor          roselan
// @version        0.0.2
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    displays more info in the military when you mouse over transport ships
// @include        http://m*.*.ikariam.*/index.php?action=transportOperations*
// @include        http://m*.*.ikariam.*/index.php?view=militaryAdvisorMilitary*
// @exclude        http://board.ikariam.*/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$(document).ready(function(){
	var weights = {
		'icon_wood.png'					:  1,
		'icon_wine.png'					:  1,
		'icon_marble.png'				:  1,
		'icon_glass.png'				:  1,
		'icon_sulfur.png'				:  1,
		'y40_phalanx_faceright.png'		:  5,
		'y40_steamgiant_faceright.png'	: 15,
		'y40_spearman_faceright.png'	:  3,
		'y40_swordsman_faceright.png'	:  3,
		'y40_slinger_faceright.png'		:  3,
		'y40_archer_faceright.png'		:  5,
		'y40_marksman_faceright.png'	:  5,
		'y40_ram_faceright.png'			: 30,
		'y40_catapult_faceright.png'	: 30,
		'y40_mortar_faceright.png'		: 30,
		'y40_gyrocopter_faceright.png'	: 15,
		'y40_bombardier_faceright.png'	: 30,
		'y40_cook_faceright.png'		: 20,
		'y40_doctor_faceright.png'		: 25
	};
	var shipCapacity = 500;
	var $fleetMovements = $('#fleetMovements table.locationEvents');
	$fleetMovements.find('tr').each( function () {
		var $this = $(this),
			$tooltip = $this.find('div.tooltip2 h5'),
			text = $tooltip.text(),
			totalWeight = 0,
			capacity = 0;
		$(this).find('div.unitBox').each( function () {
			var $this = $(this),
				thing = $this.find('div.icon > img, div.iconSmall > img').attr('src').split('/').pop(),
				quantity = $this.find('div.count').text();	
			
			if ( thing == 'ship_transport_r_40x40.png' ) capacity = quantity * shipCapacity ;
			else totalWeight += weights[thing] * quantity;
			
		});
		
		$tooltip.text(text + ' - ' + totalWeight + '/' + capacity + ' (' + Math.ceil(totalWeight/shipCapacity) + '/' + capacity/shipCapacity + ')');
	}); 
	
		
});
