// ==UserScript==
// @name           DS Popup entfernen
// @namespace      DS-Skripte by Merik
// @include        http://de*.die-staemme.de/*
// ==/UserScript==

if(document.getElementById('open_groups')!=undefined && document.getElementById('overview') && document.getElementById('overview').value=='buildings') {	
	unsafeWindow.BuildingOverview.upgrade_building=function(village_id,building,destroy){
		if(this._upgrade_villages[village_id].confirm_queue)
			if(!confirm("Auftraege in der Bauschleife kosten extra. Dennoch bauen?"))
				return;
		var url=unsafeWindow.$('#upgrade_building_link').val().replace(/village=([0-9]*)/,"village="+village_id);
		unsafeWindow.$.getJSON(url,{id:building,destroy:destroy,force:1},function(ret){
			if(ret.error){
				var t=eval('unsafeWindow.msg_'+village_id);
				if(t!='1') {
					alert(ret.error);
					eval('unsafeWindow.msg_'+village_id+'="1";');
				}
			}else if(ret.success){
				unsafeWindow.BuildingOverview._upgrade_villages[village_id].confirm_queue=ret.confirm_queue;
				unsafeWindow.BuildingOverview.generate_buildings_for_village(ret.next_buildings,destroy);
				if(unsafeWindow.$("ul","#building_order_"+village_id).length==0){
					var list=unsafeWindow.$('<ul></ul>').addClass('building_order');
					unsafeWindow.BuildingOverview.create_sortable(list);
					unsafeWindow.$("#building_order_"+village_id).append(list)
				};
				unsafeWindow.$("ul","#building_order_"+village_id).html(ret.building_orders);
				unsafeWindow.UI.ToolTip(unsafeWindow.$('tr.village_'+village_id+' .building_tooltip'))
			}
		})
	};
}