// ==UserScript==
// @name           CTC - Top Movers
// @namespace      NA
// @description    Sort CTC by todays NTIs
// @include        http://crackthecode.fiso.co.uk/rises.html
// @include        http://crackthecode.fiso.co.uk/drops.html
// @include        http://crackthecode.fiso.co.uk/RISES.html
// @include        http://crackthecode.fiso.co.uk/DROPS.html
// ==/UserScript==
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  window[key] = GM_getValue(key, defaultValue);
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}
function setSortCriteria(val) {GM_setValue("sortcriteria", val);location.reload()}
if(document.location.href.indexOf('rises')!=-1 || document.location.href.indexOf('RISES')!=-1){
	thePage='rises'
} else if(document.location.href.indexOf('drops')!=-1 || document.location.href.indexOf('DROPS')!=-1) {
	thePage='drops'
} else {
	thePage='other'
}
function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
allLIs=document.getElementsByTagName("li")
ntiTodayArr=new Array()
ntiTodayOrgArr=new Array()
ntiTodayPercArr=new Array()
ntiTodayValArr=new Array()
percentArr=new Array()
costArr=new Array()
nameArr=new Array()
teamArr=new Array()
selectedArr=new Array()
targetArr=new Array()
ntiArr=new Array()
playersArr=new Array()
liLng=allLIs.length
	for(i=0;i<liLng;i++) {
		if(allLIs[i].className=='NTI_today') {
			if(allLIs[i].innerHTML!="Today's NTI") {
				ntiTodayPercArr.push(parseFloat(allLIs[i].innerHTML.split(' (')[1].split('%')[0]))
				ntiTodayValArr.push(parseFloat(allLIs[i].innerHTML.split(' (')[0]))
			}
		} else if(allLIs[i].className=='cost') {
			if(allLIs[i].innerHTML!="Cost") {
				costArr.push(parseFloat(allLIs[i].innerHTML.split('£')[1].split('m')[0]))
			}		
		} else if(allLIs[i].className=='selected') {
			if(allLIs[i].innerHTML!="Selected") {
				selectedArr.push(parseFloat(allLIs[i].innerHTML.replace(/,/g,"")))
			}		
		} else {
			theClass=allLIs[i].className.toLowerCase()
			theText=allLIs[i].innerHTML.toLowerCase()
			if(theText!="name"&&theText!="%"&&theText!="cost"&&theText!="team"&&theText!="nti"&&theText!="target nti"&&theText!="selected") {
				if(theClass!="") {
					eval(theClass+"Arr.push(allLIs[i].innerHTML)")
				}
			}
		}
	}
	ntiLng=ntiTodayValArr.length
	numPlayers=ntiTodayValArr.length
	if(numPlayers==0||isNaN(numPlayers)){
		alert('There are less players on the page than you are trying to display.\n\nEither you have entered too high a value for numPlayers, or the CTC site is currently not functioning correctly')
	}
		for(i=0;i<ntiLng;i++) {
			if(thePage=='drops') {
				tmpPlayer=new Array(nameArr[i], percentArr[i], costArr[i], teamArr[i], ntiArr[i], targetArr[i], ntiTodayValArr[i], ntiTodayPercArr[i], selectedArr[i])
			} else {
				tmpPlayer=new Array(nameArr[i], percentArr[i], costArr[i], teamArr[i], ntiArr[i], targetArr[i], ntiTodayValArr[i], ntiTodayPercArr[i])
			}
			playersArr.push(tmpPlayer)
		}
			
			function sortByName(a, b) {var x = a[0];var y = b[0];return ((x < y) ? -1 : ((x > y) ? 1 : 0));}
			function sortByPercent(a, b) {var x = a[1];var y = b[1];return y - x}
			function sortByCost(a, b) {var x = a[2];var y = b[2];return y - x}
			function sortByClub(a, b) {var x = a[3];var y = b[3];return ((x < y) ? -1 : ((x > y) ? 1 : 0));}
			function sortByNTIRises(a, b) {var x = a[4];var y = b[4];return y - x}
			function sortByNTIDrops(a, b) {var x = a[4];var y = b[4];return x - y}
			function sortByTargetRises(a, b) {var x = a[5];var y = b[5];return y - x}
			function sortByTargetDrops(a, b) {var x = a[5];var y = b[5];return x - y}
			function sortByTodayValRises(a, b) {var x = a[6];var y = b[6];return y - x}
			function sortByTodayValDrops(a, b) {var x = a[6];var y = b[6];return x - y}
			function sortByTodayPerc(a, b) {var x = a[7];var y = b[7];return y - x}
			function sortBySelected(a, b) {var x = a[8];var y = b[8];return y - x}
			pageSort = GM_getValue("sortcriteria", "todayval")
			if(pageSort=='selected'&&thePage=='rises'){pageSort='todayval'}
			if(pageSort=='name'){sortType='Name';playersArr.sort(sortByName)}
			if(pageSort=='percent'){sortType='Percent towards rise';playersArr.sort(sortByPercent)}
			if(pageSort=='cost'){sortType='Cost';playersArr.sort(sortByCost)}
			if(pageSort=='team'){sortType='Team';playersArr.sort(sortByName);playersArr.sort(sortByClub)}
			if(pageSort=='nti'&&thePage=='rises'){sortType='NTI';playersArr.sort(sortByNTIRises)}
			if(pageSort=='nti'&&thePage=='drops'){sortType='NTI';playersArr.sort(sortByNTIDrops)}
			if(pageSort=='selected'){sortType='Selected';playersArr.sort(sortBySelected)}
			if(pageSort=='target'&&thePage=='rises'){sortType='Target NTI';playersArr.sort(sortByTargetRises)}
			if(pageSort=='target'&&thePage=='drops'){sortType='Target NTI';playersArr.sort(sortByTargetDrops)}
			if(pageSort=='todayval'&&thePage=='rises'){sortType='Today\'s NTI';playersArr.sort(sortByTodayValRises)}
			if(pageSort=='todayval'&&thePage=='drops'){sortType='Today\'s NTI';playersArr.sort(sortByTodayValDrops)}
			if(pageSort=='todayperc'){sortType='Today\'s NTI (%)';playersArr.sort(sortByTodayPerc)}
		if(thePage=='rises') {
			tableCode='<h3>Price Rises - sorted by '+sortType+'</h3>'
		} else {
			tableCode='<h3>Price Drops - sorted by '+sortType+'</h3>'
		}
		tableCode+='<div id="header"><ul><li class="percent"><a href="javascript:void(0)" id="sortPerc">%</a></li><li class="cost"><a href="javascript:void(0)" id="sortCost">Cost</a></li><li class="name"><a href="javascript:void(0)" id="sortName">Name</a></li><li class="team"><a href="javascript:void(0)" id="sortTeam">Team</a></li>'
		if(thePage=='drops') {tableCode+='<li class="selected"><a href="javascript:void(0)" id="sortSelected">Selected</a></li>'}
		tableCode+='<li class="NTI_today"><a href="javascript:void(0)" id="sortTodayVal">Today\'s NTI</a><br><a href="javascript:void(0)" id="sortTodayPerc">%</a></li><li class="TARGET"><a href="javascript:void(0)" id="sortTarget">Target NTI</a></li><li class="NTI"><a href="javascript:void(0)" id="sortNTI">NTI</a></li></ul></div>'
		for(n=0;n<numPlayers;n++){
			tableCode+='<ul'
			if(parseInt(playersArr[n][1].split('%')[0])>99){
				tableCode+=' class="threshold"'
			}
			tableCode+='><li class="percent">'+playersArr[n][1]+'</li><li class="cost">£'+playersArr[n][2]+'m</li><li class="name">'+playersArr[n][0]+'</li><li class="team">'+playersArr[n][3]+'</li>'
			if(thePage=='drops') {tableCode+='<li class="selected">'+addCommas(playersArr[n][8])+'</li>'}
			tableCode+='<li class="NTI_today">'+playersArr[n][6]+' ('+playersArr[n][7]+'%)</li><li class="TARGET">'+playersArr[n][5]+'</li><li class="NTI">'+playersArr[n][4]+'</li></ul>'
		}
		document.getElementsByTagName("body")[0].innerHTML=tableCode
	document.getElementById("sortPerc").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'percent');location.reload()}, true);
	document.getElementById("sortCost").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'cost');location.reload()}, true);
	document.getElementById("sortName").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'name');location.reload()}, true);
	document.getElementById("sortTeam").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'team');location.reload()}, true);
	if(thePage=='drops') {document.getElementById("sortSelected").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'selected');location.reload()}, true);}
	document.getElementById("sortTarget").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'target');location.reload()}, true);
	document.getElementById("sortTodayVal").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'todayval');location.reload()}, true);
	document.getElementById("sortTodayPerc").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'todayperc');location.reload()}, true);
	document.getElementById("sortNTI").addEventListener('click', function(ev) {GM_setValue('sortcriteria', 'nti');location.reload()}, true);