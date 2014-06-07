// ==UserScript==
// @name			Village Building Script
// @author			Unknown
// @description			A test run of the village build script.
// ==/UserScript==
//javascript:


function failsafe(order){
	var fsafe = 0;
	if( tr2[order].getElementsByTagName("td")[6] ) { 
		FS=tr2[order].getElementsByTagName("td")[6].innerHTML;
		if (FS.match("available") == "available" || FS.match("farm") == "farm" || FS.match("warehouse") == "warehouse"){	
			fsafe=1;
		}
		if (FS.match("Expansion") == "Expansion"){	
			fsafe=0;
		}


	}
	return {fsafe:fsafe};
}
function reallevel(buildingname){
	table2=doc.getElement("th:contains('Buildings')").getParent("table");
	tr2=table2.getElementsByTagName("tr");
	Level=0;
	queue=0;		
	for(a=1;a<tr2.length;a++){
		esijalgnelevel = tr2[a].getElementsByTagName("td")[0].innerHTML;
		if(esijalgnelevel.match(buildingname)){
			if(esijalgnelevel.match(/Level/)){
				temp = esijalgnelevel.match(/Level ([0-9]*)/);
				Level=temp[1]*1;
				}
			else if(esijalgnelevel.match(/not constructed/)){
				Level=0;
				}
			}
		}
	if(doc.getElement("th:contains('Cancellation')")){
		tablex=doc.getElement("th:contains('Cancellation')").getParent("table");
		trx=tablex.getElementsByTagName("tr");
		for(var j=1;j<trx.length;j++) {
			if(trx[j]){ 
				var downlevel = trx[j].getElementsByTagName("td")[0].innerHTML;
				if(downlevel.match(/Level/)){
					queue=queue+1
					}
 				if(downlevel.match(buildingname) && !downlevel.match(/demolish/)){
 					Level = Level+1;
 					}	
				}
			}
		}
	return {Level:Level, queue:queue};	
	}
function BuildOrder() {

	var HQindex=1,Barracksindex=1,Stableindex=1,Workshopindex=1,Academyindex=1,Smithyindex=1,Marketindex=1,Rallypointindex=1,Statueindex=1,Timberindex=1,Clayindex=1,Ironindex=1,Farmindex=1,Warehouseindex=1,Hidinplaceindex=1,Wallindex=1;
	tableBuildOrder=doc.getElement("th:contains('Buildings')").getParent("table");
	trBuildOrder=tableBuildOrder.getElementsByTagName("tr");
	for(var j = 1; j < trBuildOrder.length; j++ ){
		getindex = trBuildOrder[j].getElementsByTagName("td")[0].innerHTML;
		
		if(getindex.match(/Head/)){
			HQindex = j;
			}
		if(getindex.match(/Barracks/)){
			 Barracksindex = j;
			}
		if(getindex.match(/Stable/)){
			Stableindex = j;
			}
		if(getindex.match(/Workshop/)){
			Workshopindex = j;
			}
		if(getindex.match(/Academy/)){
			Academyindex = j;
			}
		if(getindex.match(/Smithy/)){
			Smithyindex = j;
			}
		if(getindex.match(/Market/)){
			Marketindex = j;
			}
		if(getindex.match(/Rally/)){
			Rallypointindex = j;
			}
		if(getindex.match(/Statue/)){
			Statueindex = j;
			}
		if(getindex.match(/Timber/)){
			Timberindex = j;
			}
		if(getindex.match(/Clay/)){
			Clayindex = j;
			}
		if(getindex.match(/Iron/)){
			Ironindex = j;
			}
		if(getindex.match(/Farm/)){
			Farmindex = j;
			}
		if(getindex.match(/Warehouse/)){
			Warehouseindex = j;
			}
		if(getindex.match(/Hiding/)){
			Hidinplaceindex = j;
			}
		if(getindex.match(/Wall/)){
			Wallindex = j;
			}
			 
			
		}

	return {HQindex : HQindex, Barracksindex : Barracksindex, Stableindex : Stableindex, Workshopindex : Workshopindex, Academyindex : Academyindex, Smithyindex : Smithyindex, Marketindex : Marketindex, Rallypointindex : Rallypointindex, Statueindex : Statueindex, Timberindex : Timberindex, Clayindex : Clayindex, Ironindex : Ironindex, Farmindex : Farmindex, Warehouseindex : Warehouseindex, Hidinplaceindex : Hidinplaceindex, Wallindex : Wallindex};
	
	}
function priority(){


	if(reallevel(Head).Level < HQ){
		if (reallevel(Head).Level <= reallevel(Wal).Level && reallevel(Head).Level <= reallevel(War).Level && reallevel(Head).Level <= reallevel(Iro).Level && reallevel(Head).Level <= reallevel(Cla).Level && reallevel(Head).Level <= reallevel(Tim).Level){
			var HQpri =1;
			}
		}
	if(reallevel(Wal).Level < Wall){
		if (reallevel(Wal).Level <= reallevel(Head).Level && reallevel(Wal).Level <= reallevel(War).Level && reallevel(Wal).Level <= reallevel(Iro).Level && reallevel(Wal).Level <= reallevel(Cla).Level && reallevel(Wal).Level <= reallevel(Tim).Level){
			var Wallpri =1;
			}
		}	
	if(reallevel(War).Level < Warehouse){
		if (reallevel(War).Level <= reallevel(Iro).Level && reallevel(War).Level <= reallevel(Cla).Level && reallevel(War).Level <= reallevel(Tim).Level){
			var Warehousepri =1;
			}
		}
	if(reallevel(Iro).Level < Iron){
		if (reallevel(Iro).Level <= reallevel(War).Level && reallevel(Iro).Level <= reallevel(Cla).Level && reallevel(Iro).Level <= reallevel(Tim).Level){
			var Ironpri =1;
			}
		}
	if(reallevel(Cla).Level < Clay){
		if (reallevel(Cla).Level <= reallevel(War).Level && reallevel(Cla).Level <= reallevel(Iro).Level && reallevel(Cla).Level <= reallevel(Tim).Level){
			var Claypri =1;
			}
		}
	if(reallevel(Tim).Level < Wood){
		if (reallevel(Tim).Level <= reallevel(War).Level && reallevel(Tim).Level <= reallevel(Iro).Level && reallevel(Tim).Level <= reallevel(Cla).Level){
			var Timberpri =1;
			}
		}
	
	if(reallevel(Tim).Level >= Wood && reallevel(Cla).Level >= Clay && reallevel(Iro).Level >= Iron && reallevel(War).Level >= Warehouse && reallevel(Wal).Level >= Wall && reallevel(Head).Level >= HQ){
		var Blockbuilding = 0;
		}
	
		
	return {HQpri : HQpri, Wallpri : Wallpri, Warehousepri : Warehousepri, Ironpri : Ironpri, Claypri : Claypri, Timberpri : Timberpri, Blockbuilding : Blockbuilding};
		
	
	
	
}
function group(){
	table=doc.getElement("th:contains('Village')").getParent("table");
	tr=table.getElementsByTagName("tr");
	for(i=1;i<tr.length;i++){
		
		if(tr[i].getElementsByTagName("td")[2].innerHTML>=HQ && tr[i].getElementsByTagName("td")[3].innerHTML>=Barracks && tr[i].getElementsByTagName("td")[4].innerHTML>=Stable && tr[i].getElementsByTagName("td")[5].innerHTML>=Workshop && tr[i].getElementsByTagName("td")[6].innerHTML>=Academy && tr[i].getElementsByTagName("td")[7].innerHTML>=Smithy && tr[i].getElementsByTagName("td")[8].innerHTML>=RallyPoint && tr[i].getElementsByTagName("td")[10].innerHTML>=Market && tr[i].getElementsByTagName("td")[11].innerHTML>=Wood && tr[i].getElementsByTagName("td")[12].innerHTML>=Clay && tr[i].getElementsByTagName("td")[13].innerHTML>=Iron && tr[i].getElementsByTagName("td")[14].innerHTML>=Farm && tr[i].getElementsByTagName("td")[15].innerHTML>=Warehouse && tr[i].getElementsByTagName("td")[17].innerHTML>=Wall){
			val=tr[i].getElementsByTagName("input");
			if(val[1]!=undefined){
				val[1].checked=false
				}
			}
		else{
			val=tr[i].getElementsByTagName("input");
			if(val[1]!=undefined){
				val[1].checked=true
				}
			}
		}
	}
	
function startbuilding(){
		
	table2=doc.getElement("th:contains('Buildings')").getParent("table");
	tr2=table2.getElementsByTagName("tr");
	
	var ConstuctionOrder = new Array();
	var a = BuildOrder();

	ConstuctionOrder.push(a.Rallypointindex,a.Statueindex,a.Wallindex,a.HQindex,a.Timberindex,a.Clayindex,a.Ironindex,a.Warehouseindex,a.Barracksindex,a.Stableindex,a.Workshopindex,a.Smithyindex,a.Marketindex,a.Hidinplaceindex,a.Academyindex,a.Farmindex);
	var x = priority();
	
	
			
	for(i=1;i<tr2.length;i++){
		var order=ConstuctionOrder.splice(0,1);
		getlevel = tr2[order].getElementsByTagName("td")[0].innerHTML;
		


		if( /Village Headquarters/.test(getlevel) && reallevel(Head).Level<HQ && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.HQpri == 1 ){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Barracks/.test(getlevel) && reallevel(Barr).Level<Barracks && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Blockbuilding == 0){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Stable/.test(getlevel) && reallevel(Stabl).Level<Stable && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Blockbuilding == 0){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Workshop/.test(getlevel) && reallevel(Works).Level<Workshop && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Blockbuilding == 0){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}

		else if( /Academy/.test(getlevel) && reallevel(Acad).Level<Academy && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Blockbuilding == 0){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Smithy/.test(getlevel) && reallevel(Smith).Level<Smithy && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Blockbuilding == 0){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /RallyPoint/.test(getlevel) && reallevel(Ral).Level<RallyPoint && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Statue/.test(getlevel) && reallevel(Stat).Level<Statue && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Market/.test(getlevel) && reallevel(Mark).Level<Market && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Blockbuilding == 0){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Timber/.test(getlevel) && reallevel(Tim).Level<Wood && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Timberpri == 1 ){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Clay/.test(getlevel) && reallevel(Cla).Level<Clay && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Claypri == 1 ){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Iron/.test(getlevel) && reallevel(Iro).Level<Iron && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Ironpri == 1 ){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Farm/.test(getlevel) && reallevel(Far).Level<Farm && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Warehouse/.test(getlevel) && reallevel(War).Level<Warehouse && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Warehousepri == 1 ){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Hiding/.test(getlevel) && reallevel(Hid).Level<Hiding && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Blockbuilding == 0 ){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else if( /Wall/.test(getlevel) && reallevel(Wal).Level<Wall && failsafe(order).fsafe == 0 && reallevel(Wal).queue<queuelength && x.Wallpri == 1 ){
			build=tr2[order].getElementsByTagName("td")[6].getElementsByTagName("a")[0].href;
			document.location.href = build;
			i=17;
			}
		else  if (reallevel(Wal).queue>=queuelength || i>=tr2.length-1){
    			var nextLink = $$("#menu_row2 > td:nth-child(3) > a[accesskey='d']")[0];
   			doc.location.href = nextLink;
  			}
		}
	}



/*	
var queuelength = 3;
var HQ = 20;
var Barracks = 25;
var Stable = 20;
var Workshop = 3;
var Academy = 1;
var Smithy = 20;
var RallyPoint = 1;
var Statue = 0;
var Market = 10;
var Wood = 30;
var Clay = 29;
var Iron = 30;
var Farm = 30;
var Warehouse = 30;
var Hiding = 0;
var Wall = 20;
*/
var doc=document;
if(window.frames.length>0)doc=window.main.document;
	if(document.URL.match("screen=main") == "screen=main" && document.URL.match("mode=destroy") != "mode=destroy"){
		var Head="Headquarters", Barr="Barracks", Stabl="Stable",Works="Workshop",Acad="Academy",Smith="Smithy",Mark="Market",Tim="Timber",Cla="Clay",Iro="Iron",Far="Farm",War="Warehouse",Hid="Hiding", Wal="Wall",Stat="Statue",Ral="Rally",que=0;
		startbuilding();
		}	
	if(document.URL.match("edit_group=") == "edit_group=")  {
		group();
		}
end();