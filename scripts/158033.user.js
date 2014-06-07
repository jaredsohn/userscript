// ==UserScript==
// @name        Hide fleets
// @author      Microbe
// @license     GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include     http://s1-fr.ikariam.gameforge.com/index.php*
// @include     http://s*.ikariam.*/index.php*
// @version     1.1
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
			var node = document.querySelector('div#militaryAdvisor_c.templateView');
			if (node) {
				showOptions();
				return;
			}
		}
	});
});

observer.observe(document, { childList: true, subtree: true });

function showOptions(){
	var movesOptionsBox = document.evaluate("//div[contains(@id,'movesOptionsBox')]", document.body, null, 9, null).singleNodeValue;    
	if(!movesOptionsBox){
		$('div#js_MilitaryMovementsFleetMovementsTable.content').prepend(
			'<div id="movesOptionsBox" style="padding-top:0px;padding-bottom:10px;padding-left:10px;padding-right:10px;">'
			+'<a id="movesOptionsBoxOptionHide" href="#" title="Cliquez pour masquer les options">Masquer les options</a>'
			+'<a id="movesOptionsBoxOptionShow" style="display:none;" href="#" title="Cliquez pour afficher les options">Montrer les options</a>'
			+'<table style="width:100%;">'
			+'<tr class="movesOptionsBoxRow">'
			+'<td colspan="2" style="text-align:center;font-weight:bold;background:#f5dbb3;padding-bottom:2px;">Mes mouvements</td>'
			+'<td colspan="2" style="text-align:center;font-weight:bold;background:#FAEAC6;padding-bottom:2px;">Mouvements étrangers</td>'
			+'</tr>'
			+'<tr class="movesOptionsBoxRow">'
			+'<td style="padding-left:15px;background:#f5dbb3"><input name="ownTransportMoves" id="ownTransportMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownTransportMoves",true) +'/><label for="ownTransportMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Transporter</label></td>'
			+'<td style="padding-left:10px;background:#f5dbb3"><input name="ownCommercialMoves" id="ownCommercialMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownCommercialMoves",true) +'/><label for="ownCommercialMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Commercer</label></td>'
			+'<td style="padding-left:15px;background:#FAEAC6"><input name="otherTransportMoves" id="otherTransportMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherTransportMoves",true) +'/><label for="otherTransportMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Transporter</label></td>'
			+'<td style="padding-left:10px;background:#FAEAC6"><input name="otherCommercialMoves" id="otherCommercialMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherCommercialMoves",true) +'/><label for="otherCommercialMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Commercer</label></td>'
			+'</tr>'
			+'<tr class="movesOptionsBoxRow">'
			+'<td style="padding-left:15px;background:#f5dbb3"><input name="ownArmyDeploy" id="ownArmyDeploy" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownArmyDeploy",true) +'/><label for="ownArmyDeploy" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Stationner troupes</label></td>'
			+'<td style="padding-left:10px;background:#f5dbb3"><input name="ownFleetDeploy" id="ownFleetDeploy" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownFleetDeploy",true) +'/><label for="ownFleetDeploy" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Stationner flottes</label></td>'   
			+'<td style="padding-left:15px;background:#FAEAC6"><input name="otherArmyDeploy" id="otherArmyDeploy" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherArmyDeploy",true) +'/><label for="otherArmyDeploy" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Stationner troupes</label></td>'
			+'<td style="padding-left:10px;background:#FAEAC6"><input name="otherFleetDeploy" id="otherFleetDeploy" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherFleetDeploy",true) +'/><label for="otherFleetDeploy" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Stationner flottes</label></td>'     
			+'</tr>'
			+'<tr class="movesOptionsBoxRow">'
			+'<td style="padding-left:15px;background:#f5dbb3"><input name="ownTownDefendMoves" id="ownTownDefendMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownTownDefendMoves",true) +'/><label for="ownTownDefendMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Défendre ville</label></td>'      
			+'<td style="padding-left:10px;background:#f5dbb3"><input name="ownPortDefendMoves" id="ownPortDefendMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownPortDefendMoves",true) +'/><label for="ownPortDefendMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Défendre port</label></td>'
			+'<td style="padding-left:15px;background:#FAEAC6"><input name="otherTownDefendMoves" id="otherTownDefendMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherTownDefendMoves",true) +'/><label for="otherTownDefendMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Défendre ville</label></td>'      
			+'<td style="padding-left:10px;background:#FAEAC6"><input name="otherPortDefendMoves" id="otherPortDefendMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherPortDefendMoves",true) +'/><label for="otherPortDefendMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Défendre port</label></td>'
			+'</tr>'
			+'<tr class="movesOptionsBoxRow">'
			+'<td style="padding-left:15px;background:#f5dbb3"><input name="ownPlunderMoves" id="ownPlunderMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownPlunderMoves",true) +'/><label for="ownPlunderMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Piller</label></td>'      
			+'<td style="padding-left:10px;background:#f5dbb3"><input name="ownPiracyMoves" id="ownPiracyMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownPiracyMoves",true) +'/><label for="ownPiracyMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Raid corsaires</label></td>'             
			+'<td style="padding-left:15px;background:#FAEAC6"><input name="otherPlunderMoves" id="otherPlunderMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherPlunderMoves",true) +'/><label for="otherPlunderMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Piller</label></td>'      
			+'<td style="padding-left:10px;background:#FAEAC6"><input name="otherPiracyMoves" id="otherPiracyMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherPiracyMoves",true) +'/><label for="otherPiracyMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Raid corsaires</label></td>'             
			+'</tr>'
			+'<tr class="movesOptionsBoxRow">'
			+'<td style="padding-bottom:7px;padding-left:15px;background:#f5dbb3"><input name="ownOccupyMoves" id="ownOccupyMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownOccupyMoves",true) +'/><label for="ownOccupyMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Occuper</label></td>'
			+'<td style="padding-bottom:7px;padding-left:10px;background:#f5dbb3"><input name="ownBlockadeMoves" id="ownBlockadeMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("ownBlockadeMoves",true) +'/><label for="ownBlockadeMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Bloquer</label></td>'             
			+'<td style="padding-bottom:7px;padding-left:15px;background:#FAEAC6"><input name="otherOccupyMoves" id="otherOccupyMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherOccupyMoves",true) +'/><label for="otherOccupyMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Occuper</label></td>'
			+'<td style="padding-bottom:7px;padding-left:10px;background:#FAEAC6"><input name="otherBlockadeMoves" id="otherBlockadeMoves" type="checkbox" style="vertical-align: bottom;" '+ retrieveState("otherBlockadeMoves",true) +'/><label for="otherBlockadeMoves" style="padding-left:2px;" title="Cochez/décochez une case pour afficher/masquer les mouvements correspondants">Bloquer</label></td>'             
			+'</tr>'			
			+'</table>'
			+'</div>'
		);		
		$('div#js_MilitaryMovementsFleetMovements table.table01.dotted.center.military_event_table tr:first').append('<th>A/M</th>');
		var rows = $('div#js_MilitaryMovementsFleetMovements table.table01.dotted.center.military_event_table tr:not(:first)');
		rows.each(function(){
		  var cbId = $(this).attr('id') + 'Checkbox';
		  $(this).append('<td><input type="checkbox" title="Cochez cette case pour conserver ce mouvement visible" id="' + cbId +'" class="movesOptionsKeepMove" ' + retrieveState(cbId,false) + '></input></td>');		  		  
		});	
		movesOptionsBoxState();	
		check($('#ownPiracyMoves'),true,$('.mission_icon.piracyRaid'),'mission_icon piracyRaid');
		check($('#ownTransportMoves'),true,$('.mission_icon.transport'),'mission_icon transport');
		check($('#otherTransportMoves'),false,$('.mission_icon.transport'),'mission_icon transport');
		check($('#ownCommercialMoves'),true,$('.mission_icon.trade'),'mission_icon trade'); 
		check($('#otherCommercialMoves'),false,$('.mission_icon.trade'),'mission_icon trade');
		check($('#ownArmyDeploy'),true,$('.mission_icon.deployarmy'),'mission_icon deployarmy');
		check($('#otherArmyDeploy'),false,$('.mission_icon.deployarmy'),'mission_icon deployarmy');
		check($('#ownFleetDeploy'),true,$('.mission_icon.deployfleet'),'mission_icon deployfleet'); 
		check($('#otherFleetDeploy'),false,$('.mission_icon.deployfleet'),'mission_icon deployfleet');     
		check($('#ownPlunderMoves'),true,$('.mission_icon.plunder'),'mission_icon plunder');   
		check($('#ownOccupyMoves'),true,$('.mission_icon.occupy'),'mission_icon occupy');  
		check($('#ownBlockadeMoves'),true,$('.mission_icon.blockade'),'mission_icon blockade');
		check($('#ownTownDefendMoves'),true,$('.mission_icon.defend'),'mission_icon defend');
		check($('#ownPortDefendMoves'),true,$('.mission_icon.defend_port'),'mission_icon defend_port');
		check($('#otherTownDefendMoves'),false,$('.mission_icon.defend'),'mission_icon defend');
		check($('#otherPortDefendMoves'),false,$('.mission_icon.defend_port'),'mission_icon defend_port');
		check($('#ownPiracyMoves'),true,$('.mission_icon.piracyRaid'),'mission_icon piracyRaid');	
		check($('#otherPiracyMoves'),false,$('.mission_icon.piracyRaid'),'mission_icon piracyRaid');	
		check($('#otherPlunderMoves'),false,$('.mission_icon.plunder'),'mission_icon plunder');
		check($('#otherOccupyMoves'),false,$('.mission_icon.occupy'),'mission_icon occupy');   
		check($('#otherBlockadeMoves'),false,$('.mission_icon.blockade'),'mission_icon blockade');		
		$('#ownTransportMoves').live('click', function(){check($('#ownTransportMoves'),true,$('.mission_icon.transport'),'mission_icon transport');}); 
		$('#otherTransportMoves').live('click', function(){check($('#otherTransportMoves'),false,$('.mission_icon.transport'),'mission_icon transport');}); 
		$('#ownCommercialMoves').live('click', function(){check($('#ownCommercialMoves'),true,$('.mission_icon.trade'),'mission_icon trade');}); 
		$('#otherCommercialMoves').live('click', function(){check($('#otherCommercialMoves'),false,$('.mission_icon.trade'),'mission_icon trade');});
		$('#ownArmyDeploy').live('click', function(){check($('#ownArmyDeploy'),true,$('.mission_icon.deployarmy'),'mission_icon deployarmy');}); 
		$('#otherArmyDeploy').live('click', function(){check($('#otherArmyDeploy'),false,$('.mission_icon.deployarmy'),'mission_icon deployarmy');});
		$('#ownFleetDeploy').live('click', function(){check($('#ownFleetDeploy'),true,$('.mission_icon.deployfleet'),'mission_icon deployfleet');}); 
		$('#otherFleetDeploy').live('click', function(){check($('#otherFleetDeploy'),false,$('.mission_icon.deployfleet'),'mission_icon deployfleet');});     
		$('#ownPlunderMoves').live('click', function(){check($('#ownPlunderMoves'),true,$('.mission_icon.plunder'),'mission_icon plunder');});     
		$('#ownOccupyMoves').live('click', function(){check($('#ownOccupyMoves'),true,$('.mission_icon.occupy'),'mission_icon occupy');});     
		$('#ownBlockadeMoves').live('click', function(){check($('#ownBlockadeMoves'),true,$('.mission_icon.blockade'),'mission_icon blockade');});	
		$('#ownTownDefendMoves').live('click', function(){check($('#ownTownDefendMoves'),true,$('.mission_icon.defend'),'mission_icon defend');});
		$('#ownPortDefendMoves').live('click', function(){check($('#ownPortDefendMoves'),true,$('.mission_icon.defend_port'),'mission_icon defend_port');});
		$('#otherTownDefendMoves').live('click', function(){check($('#otherTownDefendMoves'),false,$('.mission_icon.defend'),'mission_icon defend');});
		$('#otherPortDefendMoves').live('click', function(){check($('#otherPortDefendMoves'),false,$('.mission_icon.defend_port'),'mission_icon defend_port');});
		$('#ownPiracyMoves').live('click', function(){check($('#ownPiracyMoves'),true,$('.mission_icon.piracyRaid'),'mission_icon piracyRaid');});		
		$('#otherPiracyMoves').live('click', function(){check($('#otherPiracyMoves'),false,$('.mission_icon.piracyRaid'),'mission_icon piracyRaid');});		
		$('#otherPlunderMoves').live('click', function(){check($('#otherPlunderMoves'),false,$('.mission_icon.plunder'),'mission_icon plunder');});     
		$('#otherOccupyMoves').live('click', function(){check($('#otherOccupyMoves'),false,$('.mission_icon.occupy'),'mission_icon occupy');});     
		$('#otherBlockadeMoves').live('click', function(){check($('#otherBlockadeMoves'),false,$('.mission_icon.blockade'),'mission_icon blockade');});
		$('#movesOptionsBoxOptionHide').click(function () {GM_setValue('movesOptionsBoxState',false);movesOptionsBoxState();});
		$('#movesOptionsBoxOptionShow').click(function () {GM_setValue('movesOptionsBoxState',true);movesOptionsBoxState();});
    $('.movesOptionsKeepMove').click(function(){
      if($(this).attr('checked')){GM_setValue($(this).attr('id'),true);}
      else {
        GM_setValue($(this).attr('id'),false);        
        var own = false;
        if($(this).parent().parent().attr('class').indexOf('own')!=-1){own = true;}        
        var iconStr = $('td:first div', $(this).parent().parent()).attr('class');
        if(!(GM_getValue(iconStr + '&' + own.toString(),false))){$(this).parent().parent().hide();}       
      }     
    });
	}
}

function check(selector,own,icon,iconStr){
  var ownStr = own.toString();
	if(selector.attr('checked')){
		GM_setValue(selector.attr('id'),true);
		GM_setValue(iconStr + '&' + ownStr,true);
		showIt(icon,own);		
	}
	else{
		GM_setValue(selector.attr('id'),false);
		GM_setValue(iconStr + '&' + ownStr,false);
		hideIt(icon,own);		
	}
}

function showIt(icon,own){
	icon.each(function(){
		if(own){
			if($(this).parent().parent().attr("class")==' own' || $(this).parent().parent().attr("class")=='alt own'){
				$(this).parent().parent().show();
			}
		} else {
			if($(this).parent().parent().attr("class")=='' || $(this).parent().parent().attr("class")=='alt' || $(this).parent().parent().attr("class")==' hostile' || $(this).parent().parent().attr("class")=='alt hostile'){
				$(this).parent().parent().show();
			} 
		}
	});	
}

function hideIt(icon,own){  
	icon.each(function(){
		if(own){
			if($(this).parent().parent().attr("class")==' own' || $(this).parent().parent().attr("class")=='alt own'){
				var rowId = $(this).parent().parent().attr('id') + 'Checkbox';
				if(!(GM_getValue(rowId,false))){
				  $(this).parent().parent().hide();
				}
			}
		} else {
			if($(this).parent().parent().attr("class")=='' || $(this).parent().parent().attr("class")=='alt' || $(this).parent().parent().attr("class")==' hostile' || $(this).parent().parent().attr("class")=='alt hostile'){
				var rowId = $(this).parent().parent().attr('id') + 'Checkbox';
				if(!(GM_getValue(rowId,false))){
				  $(this).parent().parent().hide();
				}
			} 
		}
	});	 
}

function retrieveState(selectorId,defaultState){
    if(GM_getValue(selectorId,defaultState)){
		return "checked";
	}else{
		return "";
	}
}

function movesOptionsBoxState(){
  if(GM_getValue('movesOptionsBoxState',false)){
    $('#movesOptionsBoxOptionHide').show();
    $('#movesOptionsBoxOptionShow').hide(); 
    $('.movesOptionsBoxRow').show(); 
    $('#movesOptionsBox').css('padding-bottom','10px');
  }
  else{
    $('#movesOptionsBoxOptionHide').hide();
    $('#movesOptionsBoxOptionShow').show(); 
    $('.movesOptionsBoxRow').hide(); 
    $('#movesOptionsBox').css('padding-bottom','0px');
  }

}
