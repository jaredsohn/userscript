// ==UserScript==
// @name           OGame Redesign SpioHelper mod with Opera compatibility
// @namespace      -
// @description    Organise spy reports in a short overview-table (Languages: All)
// @include        http://*.ogame.*/game/index.php?page=messages*
// @include        http://*.ogame.*/game/index.php?page=globalTechtree*
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @version        2.6
// ==/UserScript==


(function() 
{
if (!(typeof GM_getValue == 'function')) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
}
/*
 * jQuery implemented by OGame
 */
var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
var $ = unsafe.jQuery;
if ( !$ ) return;

// check script version against ogame-version
// returns true if the script version is higher or equal to the ogame-version
// prepairs output for the user incl. sytel
oGameVersionCheck=function(j,i,k){var h=!1,b,e=document.getElementById("oGameVersionCheckData"),f=document.getElementById("oGameVersionCheckMenuButton"),a=document.getElementById("menuTableTools");b=document.getElementsByName("ogame-version")[0].content;var g=/(\d+)\D*(\d*)\D*(\d*)\D*(\d*)/;b=g.exec(b);var l=parseInt(("00"+b[1]).slice(-2)+("00"+b[2]).slice(-2)+("00"+b[3]).slice(-2)+("00"+b[4]).slice(-2));b=g.exec(i);parseInt(("00"+b[1]).slice(-2)+("00"+b[2]).slice(-2)+("00"+b[3]).slice(-2)+("00"+ b[4]).slice(-2))>=l&&(h=!0);if(null!==a&&(null===e&&(g=document.createElement("li"),0===a.childNodes.length?a.appendChild(g):a.insertBefore(g,a.childNodes[0]),f=document.createElement("a"),f.id="oGameVersionCheckMenuButton",f.href="javascript:void(0)",f.className="menubutton",g.appendChild(f),a=document.createElement("span"),a.className="textlabel",a.innerHTML="Tools & Scripts",f.appendChild(a),e=document.createElement("div"),e.id="oGameVersionCheckData",e.style.display="none",g.insertBefore(e,f)), null!==e))a=document.createElement("span"),a.style.display="none",a.innerHTML="<span>"+j+"</span><span>"+i+"</span><span>"+k+"</span><span>"+h+"</span>",e.appendChild(a),null!==f&&(f.onclick=function(){var a=document.getElementById("contentWrapper");a.innerHTML="";var c=document.createElement("div");c.style.background='url("http://gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif") no-repeat scroll 0 0 transparent';c.style.height="28px";c.style.marginTop="8px";c.style.position="relative"; c.style.textAlign="center";a.appendChild(c);var d=document.createElement("div");d.style.font="700 12px/23px Verdana,Arial,Helvetica,sans-serif";d.style.color="#6F9FC8";d.style.paddingTop="3px";c.appendChild(d);c=document.createTextNode("Tools, Scripts & Skins");d.appendChild(c);d=document.createElement("div");d.style.background='url("http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif") repeat-y scroll 5px 0 transparent';d.style.color="#848484";d.style.margin="0";d.style.padding="17px 0 10px 0"; d.style.width="100%";d.style.textAlign="center";a.appendChild(d);c=document.createElement("div");c.style.background='url("http://gf1.geo.gfsrv.net/cdn30/aa3e8edec0a2681915b3c9c6795e6f.gif") no-repeat scroll 2px 0 transparent';c.style.height="17px";a.appendChild(c);for(a=0;a<e.childNodes.length;a++){c="red";e.childNodes[a].childNodes[3].innerHTML=="true"&&(c="green");var b=document.createElement("p");b.style.padding="3px 0";b.style.color=c;b.innerHTML=e.childNodes[a].childNodes[0].innerHTML+' ( <a href="'+ e.childNodes[a].childNodes[2].innerHTML+'" style="text-decoration:none;" target="_blank">link</a> )';d.appendChild(b)}},!1===h&&(f.childNodes[0].style.color="red"));return h};

// call of oGameVersionCheck
// parameter:
// 1. name of the script
// 2. last ogame version on which the script have been tested
// 3. url to the update site of the script
oGameVersionCheck('OGame Redesign SpioHelper','4.1.5','http://userscripts.org/scripts/show/106772');

var ogameUniverse = $('meta[name=ogame-universe]').attr('content');

/*
 * sort-helper for sorting numbers in array
 * return
 */
function numsort (a, b) {
	return a - b;
}

/*
 * getting formated server, like OGAME_ORG
 */
var url = document.location.href;
var server = url.match(/http:\/\/([^\\\/]+[\\\/])/i);
if (server) server = server[1].toUpperCase();
server = server.replace(/\//, '').replace(/\.OGAME\./g,'_');

/*
 * creating url for globalTechtree
 */
var globalTechtreeUrl = url.replace(/messages/,'globalTechtree');

/*
 * get saved DFpercent
 */
var dfpercent = GM_getValue(server + '_DFpercent','');

/*
 * get saved techID's and techName's or load and parse globalTechtree
 */
var techIDstring, techNamestring, techID, techName;
techIDstring = GM_getValue(server + '_techID','');
techNamestring = GM_getValue(server + '_techName','');

/*
 * parse techs on another page (= globalTechtree)
 */
if (url.indexOf('page=globalTechtree') != -1) {
	if (techIDstring == '' || techNamestring == '') {
		techID = new Array();
		techName = new Array();
		links = $('a[href*="techID="]');
		links.each(function(i){
			if (i >= 3 && i%2 == 1) {
				regex = /techID=([0-9]+)/.exec($(this).attr('href'));
				techID.push(regex[1]);
				techName.push($.trim($(this).html())); // trim spaces before and after string
			}
		});
		
		GM_setValue(server + '_techID',techID.join(","));
		GM_setValue(server + '_techName',techName.join(","));
	}
	return;
}

if (techIDstring == '' || techNamestring == '' || dfpercent == '') {
	var techs = false, percent = false;
	if (techIDstring == '' || techNamestring == '') techs = true;
	if (dfpercent == '') percent = true;
	/*
	 * if techs are not available show link to globalTechtree
	 */
	$('#messageContent').ajaxSuccess(function(){
		if ($('#spioHelperDIV').length == 0) {
			div = $('<div id="spioHelperDIV"/>').css({'text-align':'center','margin':'20px 0'}).prependTo($('#messageContent'));
			if (techs) {
				link = $('<a/>').attr('href',globalTechtreeUrl).attr('target','_blank').html('Please view global TechTree!').appendTo(div).click(function(){ $(this).hide(); settingsClick(1,div); });
			}
			if (percent) {
				span = $('<span/>').appendTo(div).html('<br/>How many percent (%) of fleet ressources to debis field (normal: 30%)?<br/>');
				$('<a/>').attr('href','#').html('10%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '10'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 20%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '20'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 30%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '30'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 40%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '40'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 50%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '50'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 60%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '60'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 70%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '70'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 80%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '80'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 90%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '90'); },0); span.hide(); settingsClick(2,div); });
				$('<a/>').attr('href','#').html('&nbsp; 100%').appendTo(span).click(function(){ setTimeout(function(){ GM_setValue(server + '_DFpercent', '100'); },0); span.hide(); settingsClick(2,div); });
			}
		}
	});
} else {
	techID = techIDstring.split(",");
	techName = techNamestring.split(",");
	dfpercent = parseInt(dfpercent);
	
	observer();
}
/*
 * sample for using techName's
 * techName[techID.indexOf('124')] --> Astrophysics
 */
 
function settingsClick(num,div) {
	if (num == 1) techs = false;
	if (num == 2) percent = false;
	if (!techs && !percent) {
		$('<a/>').attr('href',url).attr('target','_top').html('Load Messages-Screen again').appendTo(div);
	}
}
 
/*
 * handle ajax loading messages
 */
function observer() {
	if (url.indexOf('page=messages') != -1) {
		document.getElementById('section2').addEventListener('DOMNodeInserted', generate, false);
		generate();
	} else if (url.indexOf('page=fleet1') != -1) {
		if (url.indexOf('&smallCargo=') != -1 && url.indexOf('&largeCargo=') != -1) {
			smallCargoAmount = /.*smallCargo=([0-9]+)/.exec(url);
			intSmallCargoAmount = parseInt(smallCargoAmount[1]);
			availableSmallCargoAmount = /.*\s([0-9.]+)/.exec($('#ship_202').prev().find('span.level').text());
			intAvailableSmallCargoAmount = parseInt(availableSmallCargoAmount[1].replace(/\./g,''));
			if (intSmallCargoAmount <= intAvailableSmallCargoAmount) {
				$('#ship_202').val(intSmallCargoAmount).keyup ();
			} else {
				largeCargoAmount = /.*largeCargo=([0-9]+)/.exec(url);
				intLargeCargoAmount = parseInt(largeCargoAmount[1]);
				availableLargeCargoAmount = /.*\s([0-9.]+)/.exec($('#ship_203').prev().find('span.level').text());
				intAvailableLargeCargoAmount = parseInt(availableLargeCargoAmount[1].replace(/\./g,''));
				if (intLargeCargoAmount <= intAvailableLargeCargoAmount) {
					$('#ship_203').val(intLargeCargoAmount).keyup ();
				}
			}
		} else if (url.indexOf('&battleShip=') != -1) {
			battleShipAmount = /.*battleShip=([0-9]+)/.exec(url);
			intBattleShipAmount = parseInt(battleShipAmount[1]);
			availableBattleShipAmount = /.*\s([0-9.]+)/.exec($('#ship_207').prev().find('span.level').text());
			intAvailableBattleShipAmount = parseInt(availableBattleShipAmount[1].replace(/\./g,''));
			if (intBattleShipAmount <= intAvailableBattleShipAmount) {
				$('#ship_207').val(intBattleShipAmount).keyup ();
			}
		}
	}
}

/*
 * the full function to generate the short overview table
 */
function generate() {
	var ogameClock = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec($('#OGameClock').html().replace(/<span>/g,'').replace(/<\/span>/g,''));
	// ogameClock[0] = whole text
	// ogameClock[1] = day
	// ogameClock[2] = month
	// ogameClock[3] = year
	// ogameClock[4] = hour
	// ogameClock[5] = minute
	// ogameClock[6] = second
	var ogameClockDate = new Date(ogameClock[3],parseInt(ogameClock[2])-1,ogameClock[1],ogameClock[4],ogameClock[5],ogameClock[6]);
	
	var smallplunder = $('#messageContent form table tr.entry');
	
	if (smallplunder.length > 0) {
		if ($('#spioHelperDIV').length == 0) {
			$('#messageContent').find('form').before('<div id="spioHelperDIV"/>').prev().css('text-align','center').hide();
			span = $('<span/>').appendTo($('#spioHelperDIV')).html('Summary of espionage reports').css({'font-size':'16px','font-weight':'bold'});
			$('<table/>').appendTo($('#spioHelperDIV')).css({
				borderCollapse:'collapse',
				margin:'10px auto',
				border:'1px solid #2F2F2F',
				width:'98%'
			}).attr('cellspacing','0').attr('cellpadding','0');
			
			row = $('<tr/>');
			$('<th/>').css({color:'#6F9FC8',fontWeigth:'bold',padding:'2px',borderBottom:'1px solid #2F2F2F',borderRight:'1px solid #2F2F2F'}).html('Coordinates').appendTo(row);
			$('<th/>').css({color:'#6F9FC8',fontWeigth:'bold',padding:'2px',borderBottom:'1px solid #2F2F2F',borderRight:'1px solid #2F2F2F'}).html('Age').appendTo(row);
			$('<th/>').css({color:'#6F9FC8',fontWeigth:'bold',padding:'2px',borderBottom:'1px solid #2F2F2F',borderRight:'1px solid #2F2F2F'}).html('Player (<span style="color:#99CC00;font-weight:normal;">activity</span>)').appendTo(row);
			$('<th/>').css({color:'#6F9FC8',fontWeigth:'bold',padding:'2px',borderBottom:'1px solid #2F2F2F',borderRight:'1px solid #2F2F2F'}).html('Loot').appendTo(row);
			$('<th/>').css({color:'#6F9FC8',fontWeigth:'bold',padding:'2px',borderBottom:'1px solid #2F2F2F',borderRight:'1px solid #2F2F2F'}).html('DF').appendTo(row);
			$('<th/>').css({color:'#6F9FC8',fontWeigth:'bold',padding:'2px',borderBottom:'1px solid #2F2F2F',borderRight:'1px solid #2F2F2F'}).html('DEF').appendTo(row);
			$('<th colspan="2"/>').css({color:'#6F9FC8',fontWeigth:'bold',padding:'2px',borderBottom:'1px solid #2F2F2F',borderRight:'1px solid #2F2F2F'}).html('Ress/(1+Def/1000)').appendTo(row);
			row.appendTo($('#spioHelperDIV').find('table'));
			
			var totalLoot = 0, totalDF = 0, spyReportCount = 0;
			
			smallplunder.each(function(){
				var $this = $(this), $next = $(this).next();
				
				if ($this.find('td.subject').html().indexOf("switchView('spioDetails_") != -1) {
					spyReportCount++;
					id = $this.attr('id');
					$this.find('a:first').attr('name',id);
					
					//temp = /.*\[([0-9:]+)\].*\(.*>(.*)<.*\)/.exec($next.find('table.material tr:eq(0) th').html());
					//temp = /.*\[([0-9:]+)\].*\n*.*>(.*)<.*/.exec($next.find('table.material tr:eq(0) th').html());
					temp = /\[(\d+:\d+:\d+)\][^\(]*\([^\(\s]+\s+[\']*([^\']+)[\']*\)/.exec ($next.find ('table.material tr:eq(0) th').html ());
					coordinates = temp[1];
					player = temp[2];
					
					date = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec($this.find('td.date').html());
					// date[0] = whole text
					// date[1] = day
					// date[2] = month
					// date[3] = year
					// date[4] = hour
					// date[5] = minute
					// date[6] = second
					dateDate = new Date(date[3],parseInt(date[2])-1,date[1],date[4],date[5],date[6]);
					ageInMilliseconds = ogameClockDate.getTime() - dateDate.getTime();
					ageHours = Math.floor(ageInMilliseconds / 3600000);
					ageMinutes = Math.floor(ageInMilliseconds / 60000) - (ageHours * 60);
					ageSeconds = Math.floor(ageInMilliseconds / 1000) - (ageHours * 3600) - (ageMinutes * 60);
					age = '';
					if (ageHours > 0) age += ageHours + 'h ';
					if (ageMinutes > 0) age += ageMinutes + 'm ';
					if (ageSeconds > 0) age += ageSeconds + 's';
					
					tech124 = '';
					defense = 0;
					fleet = 0;
					maxPlanets = '';
					moon = false;
					$next.find('table.fleetdefbuildings td.key').each(function(){
						var thisHtml = $(this).html(),
							fdbCount = parseInt($(this).next().html().replace(/\./g,''));
						
						if (thisHtml.indexOf(techName[techID.indexOf('41')]) != -1) moon = true;
						if (thisHtml.indexOf(techName[techID.indexOf('42')]) != -1) moon = true;
						if (thisHtml.indexOf(techName[techID.indexOf('43')]) != -1) moon = true;
						
						if (thisHtml.indexOf(techName[techID.indexOf('124')]) != -1) tech124 = '' + fdbCount;
						
						if (thisHtml.indexOf(techName[techID.indexOf('202')]) != -1) fleet += fdbCount * 4000;
						if (thisHtml.indexOf(techName[techID.indexOf('203')]) != -1) fleet += fdbCount * 12000;
						if (thisHtml.indexOf(techName[techID.indexOf('204')]) != -1) fleet += fdbCount * 4000;
						if (thisHtml.indexOf(techName[techID.indexOf('205')]) != -1) fleet += fdbCount * 10000;
						if (thisHtml.indexOf(techName[techID.indexOf('206')]) != -1) fleet += fdbCount * 27000;
						if (thisHtml.indexOf(techName[techID.indexOf('207')]) != -1) fleet += fdbCount * 60000;
						if (thisHtml.indexOf(techName[techID.indexOf('208')]) != -1) fleet += fdbCount * 30000;
						if (thisHtml.indexOf(techName[techID.indexOf('209')]) != -1) fleet += fdbCount * 16000;
						if (thisHtml.indexOf(techName[techID.indexOf('210')]) != -1) fleet += fdbCount * 1000;
						if (thisHtml.indexOf(techName[techID.indexOf('211')]) != -1) fleet += fdbCount * 75000;
						if (thisHtml.indexOf(techName[techID.indexOf('212')]) != -1) fleet += fdbCount * 2000;
						if (thisHtml.indexOf(techName[techID.indexOf('213')]) != -1) fleet += fdbCount * 110000;
						if (thisHtml.indexOf(techName[techID.indexOf('214')]) != -1) fleet += fdbCount * 9000000;
						if (thisHtml.indexOf(techName[techID.indexOf('215')]) != -1) fleet += fdbCount * 70000;
						
						if (thisHtml.indexOf(techName[techID.indexOf('401')]) != -1) defense += fdbCount * 20;
						if (thisHtml.indexOf(techName[techID.indexOf('402')]) != -1) defense += fdbCount * 20;
						if (thisHtml.indexOf(techName[techID.indexOf('403')]) != -1) defense += fdbCount * 80;
						if (thisHtml.indexOf(techName[techID.indexOf('404')]) != -1) defense += fdbCount * 350;
						if (thisHtml.indexOf(techName[techID.indexOf('405')]) != -1) defense += fdbCount * 80;
						if (thisHtml.indexOf(techName[techID.indexOf('406')]) != -1) defense += fdbCount * 1000;
						if (thisHtml.indexOf(techName[techID.indexOf('407')]) != -1) defense += fdbCount * 200;
						if (thisHtml.indexOf(techName[techID.indexOf('408')]) != -1) defense += fdbCount * 1000;
					});
					if (tech124.length > 0) {
						maxPlanets = 'max. ' + (1 + Math.ceil(parseInt(tech124) / 2)) + ' planets';
					}
					
					// getting ress (metal, crystal, deuterium) from spy-report
					metal = parseInt($next.find('table.material table td:eq(1)').html().replace(/\./g,''));
					crystal = parseInt($next.find('table.material table td:eq(3)').html().replace(/\./g,''));
					deuterium = parseInt($next.find('table.material table td:eq(5)').html().replace(/\./g,''));
					ress = metal + crystal + deuterium;
					
					// check player rank status (hororable, bandit, normal) -> plunder ratio/factor
					var status = $this.find ("td.subject span").eq (0).attr ("class");
					var factor = 0.5;
					if (status.indexOf ("bandit") >= 0) {
						factor = 1;
					} else if (status.indexOf ("honorable") >= 0) {
						factor = 0.75;
					}
                    // calculate prey
					loot = Math.round (ress * factor);
					totalLoot += loot;
                    // calculate needed space for prey
					cap = factor * Math.max(ress,Math.min((3 / 4) * (2 * metal + crystal + deuterium),2 * metal + deuterium));
                    // calculate cargo ships
					largeCargo = Math.ceil(cap / 25000);
					smallCargo = Math.ceil(cap / 5000);
					battleShip = Math.ceil(cap / 1500);
					
					// calculate DF
					df = Math.round(fleet / 100 * dfpercent);
					totalDF += df;
					// calculate amount of recycler
					recs = Math.ceil(df / 20000);
					
					activity = $next.find('table.aktiv font').html();
					if (activity == null) {
						activity = '';
					} else if (parseInt(activity) == 15) {
						activity = ' (<span style="color:#99CC00;">*</span>)';
					} else {
						activity = ' (<span style="color:#99CC00;">' + activity + '</span>)';
					}
					
					// add single row to table #spioHelperDIV
					row = $('<tr/>').css('cursor','default').hover(function(){
						$(this).css('background-color','#212121');
					},function(){
						$(this).css('background-color','');
					});
					
					attack = $next.find('table.defenseattack tr:eq(1) td.attack a').attr('href');
					attackTitle = $next.find('table.defenseattack tr:eq(1) td.attack a span').html();
					
					if (attack.indexOf('&type=3&') != -1) moon = true;
					moonText = '';
					if (moon == true) moonText = ' M';
					
					$('<td/>').width(81).css({'padding':'2px',borderRight:'1px solid #2F2F2F','text-align':'center'}).html('')
						.append($('<a/>').attr('href','#' + id).attr('title','|Jump to spy report').addClass('tipsStandard').html(coordinates + moonText))
						.appendTo(row);
					$('<td/>').css({'padding':'2px',borderRight:'1px solid #2F2F2F'}).attr('title','|' + date[0]).html(age).addClass('tipsStandard').appendTo(row);
					$('<td/>').css({'padding':'2px',borderRight:'1px solid #2F2F2F'}).attr('title','|' + maxPlanets).html(player + activity).addClass('tipsStandard').appendTo(row);
					$('<td/>').css({'padding':'2px',borderRight:'1px solid #2F2F2F'}).css({'text-align':'right'}).attr('title','|' + techName[techID.indexOf('203')] + ': ' + unsafe.tsdpkt(largeCargo) + '<br/>' + techName[techID.indexOf('202')] + ': ' + unsafe.tsdpkt(smallCargo) + '<br/>' + techName[techID.indexOf('207')] + ': ' + unsafe.tsdpkt(battleShip)).html(unsafe.tsdpkt(loot)).addClass('tipsStandard').appendTo(row);
					$('<td/>').css({'padding':'2px',borderRight:'1px solid #2F2F2F'}).css({'text-align':'right'}).attr('title','|' + techName[techID.indexOf('209')] + ': ' + unsafe.tsdpkt(recs)).html(unsafe.tsdpkt(df)).addClass('tipsStandard').appendTo(row);
					$('<td/>').css({'padding':'2px',borderRight:'1px solid #2F2F2F'}).css({'text-align':'right'}).html(unsafe.tsdpkt(defense)).appendTo(row);
					$('<td/>').css({'padding':'2px',borderRight:'1px solid #2F2F2F'}).css({'text-align':'right'}).html(unsafe.tsdpkt(Math.floor(ress/(1+defense/1000)))).appendTo(row);
					
					// add ships to attack-link
					if (defense == 0 && fleet == 0) {
						attack = attack + '&smallCargo=' + smallCargo + '&largeCargo=' + largeCargo;
					} else {
						attack = attack + '&battleShip=' + battleShip;
					}
					
					// link to galaxy view
					temp = /([0-9]+):([0-9]+):([0-9]+)/.exec(coordinates);
					galaxyLink = 'http://' + ogameUniverse + '/game/index.php?page=galaxy&galaxy=' + temp[1] + '&system=' + temp[2] + '&planet=' + temp[3];
					
					$('<td/>').width(80).css({'padding':'2px','text-align':'center'})
						.append($this.find('.actions a:eq(0)'))
						.append($this.find('.actions a:eq(0)'))
						.append($('<a/>').attr('href',galaxyLink).attr('title','|Galaxy: show position [' + coordinates + ']').addClass('tipsStandard').html('')
							.append($('<span/>').css({
								'font-weight':'bold',
								'display':'block',
								'float':'left',
								'width':'15px',
								'line-height':'16px',
								'text-align':'center',
								'background-color':'#597FA0',
								'margin-right':'4px'
							}).html('G')))
						.append($('<a/>').attr('href',attack).attr('title','|' + attackTitle).addClass('tipsStandard').html('')
							.append($('<span/>').css({
								'font-weight':'bold',
								'display':'block',
								'float':'left',
								'width':'15px',
								'line-height':'16px',
								'text-align':'center',
								'background-color':'#597FA0'
							}).html('A')))
						.appendTo(row);
					
					row.appendTo($('#spioHelperDIV').find('table'));
				}
			});
			
			// colum-sorting
			if ($('#spioHelperDIV').find('table tr:gt(0)').length > 1) {
				sortCoords = 0;
				sortPlayer = 0;
				sortLoot = 0;
				sortDF = 0;
				sortDEF = 0;
				sortRessDEF = 0;
				sortAge = 0;
				// coordinates
				$('#spioHelperDIV').find('table th:eq(0)').css('cursor','pointer').attr('title','|sort').addClass('tipsStandard').click(function(){
					var list = new Array();
					$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
						temp = /([0-9]+):([0-9]+):([0-9]+)/.exec($(this).find('td:eq(0) a').html());
						galaxy = temp[1];
						system = temp[2];
						planet = temp[3];
						if (galaxy.length == 1) { galaxy = '0' + galaxy; }
						if (system.length == 1) { system = '00' + system; }
						if (system.length == 2) { system = '0' + system; }
						if (planet.length == 1) { planet = '0' + planet; }
						coords = galaxy + '' + system + '' + planet;
						list.push(coords);
					});
					list.sort();
					if (sortCoords <= 0) {
						sortCoords = 1;
						sortPlayer = 0;
						sortLoot = 0;
						sortDF = 0;
						sortDEF = 0;
						sortRessDEF = 0;
						sortAge = 0;
					} else {
						list.reverse();
						sortCoords = -1;
						sortPlayer = 0;
						sortLoot = 0;
						sortDF = 0;
						sortDEF = 0;
						sortRessDEF = 0;
						sortAge = 0;
					}
					for (t = 0; t < list.length; t++) {
						$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
							temp = /([0-9]+):([0-9]+):([0-9]+)/.exec($(this).find('td:eq(0) a').html());
							galaxy = temp[1];
							system = temp[2];
							planet = temp[3];
							if (galaxy.length == 1) { galaxy = '0' + galaxy; }
							if (system.length == 1) { system = '00' + system; }
							if (system.length == 2) { system = '0' + system; }
							if (planet.length == 1) { planet = '0' + planet; }
							coords = galaxy + '' + system + '' + planet;
							if (coords == list[t]) {
								$(this).appendTo($('#spioHelperDIV').find('table'));
							}
						});
					}
				});
				// age
				$('#spioHelperDIV').find('table th:eq(1)').css('cursor','pointer').attr('title','|sort').addClass('tipsStandard').click(function(){
					var list = new Array();
					$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
						age = $(this).find('td:eq(1)').html();
						if (age.indexOf('h') != -1) {
							hours = /([0-9]+)h/.exec(age);
							hours = parseInt(hours[1]);
						} else {
							hours = 0;
						}
						if (age.indexOf('m') != -1) {
							minutes = /([0-9]+)m/.exec(age);
							minutes = parseInt(minutes[1]);
						} else {
							minutes = 0;
						}
						if (age.indexOf('s') != -1) {
							seconds = /([0-9]+)s/.exec(age);
							seconds = parseInt(seconds[1]);
						} else {
							seconds = 0;
						}
						list.push((hours * 3600) + (minutes * 60) + seconds);
					});
					list.sort(numsort);
					if (sortAge <= 0) {
						sortDEF = 0;
						sortAge = 1;
						sortLoot = 0;
						sortDF = 0;
						sortRessDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
					} else {
						list.reverse();
						sortDEF = 0;
						sortAge = -1;
						sortLoot = 0;
						sortDF = 0;
						sortRessDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
					}
					for (t = 0; t < list.length; t++) {
						$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
							h = Math.floor(list[t] / 3600);
							m = Math.floor(list[t] / 60) - (h * 60);
							s = list[t] - (h * 3600) - (m * 60);
							age = '';
							if (h > 0) age += h + 'h ';
							if (m > 0) age += m + 'm ';
							if (s > 0) age += s + 's';
							if ($(this).find('td:eq(1)').html() == age) {
								$(this).appendTo($('#spioHelperDIV').find('table'));
							}
						});
					}
				});
				// player
				$('#spioHelperDIV').find('table th:eq(2)').css('cursor','pointer').attr('title','|sort').addClass('tipsStandard').click(function(){
					var list = new Array();
					$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
						$(this).find('td:eq(2) span').each(function(){
							if ($(this).attr('class') !== undefined && $(this).attr('class').indexOf('status_abbr') != -1) {
								list.push($(this).html().toUpperCase());
							}
						});
					});
					list.sort();
					if (sortPlayer <= 0) {
						sortPlayer = 1;
						sortLoot = 0;
						sortDF = 0;
						sortDEF = 0;
						sortRessDEF = 0;
						sortCoords = 0;
						sortAge = 0;
					} else {
						list.reverse();
						sortPlayer = -1;
						sortLoot = 0;
						sortDF = 0;
						sortDEF = 0;
						sortRessDEF = 0;
						sortCoords = 0;
						sortAge = 0;
					}
					for (t = 0; t < list.length; t++) {
						$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
							$(this).find('td:eq(2) span').each(function(){
								if ($(this).attr('class') !== undefined && $(this).attr('class').indexOf('status_abbr') != -1) {
									if ($(this).html().toUpperCase().indexOf(list[t]) != -1) {
										$(this).parent().parent().appendTo($('#spioHelperDIV').find('table'));
									}
								}
							});
						});
					}
				});
				// loot
				$('#spioHelperDIV').find('table th:eq(3)').css('cursor','pointer').attr('title','|sort').addClass('tipsStandard').click(function(){
					var list = new Array();
					$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
						list.push(parseInt($(this).find('td:eq(3)').html().replace(/\./g,'')));
					});
					list.sort(numsort);
					if (sortLoot <= 0) {
						list.reverse();
						sortLoot = 1;
						sortDF = 0;
						sortDEF = 0;
						sortRessDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
						sortAge = 0;
					} else {
						sortLoot = -1;
						sortDF = 0;
						sortDEF = 0;
						sortRessDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
						sortAge = 0;
					}
					for (t = 0; t < list.length; t++) {
						$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
							if (parseInt($(this).find('td:eq(3)').html().replace(/\./g,'')) == list[t]) {
								$(this).appendTo($('#spioHelperDIV').find('table'));
							}
						});
					}
				});
				// DF
				$('#spioHelperDIV').find('table th:eq(4)').css('cursor','pointer').attr('title','|sort').addClass('tipsStandard').click(function(){
					var list = new Array();
					$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
						list.push(parseInt($(this).find('td:eq(4)').html().replace(/\./g,'')));
					});
					list.sort(numsort);
					if (sortDF <= 0) {
						list.reverse();
						sortDF = 1;
						sortLoot = 0;
						sortDEF = 0;
						sortRessDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
						sortAge = 0;
					} else {
						sortDF = -1;
						sortLoot = 0;
						sortDEF = 0;
						sortRessDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
						sortAge = 0;
					}
					for (t = 0; t < list.length; t++) {
						$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
							if (parseInt($(this).find('td:eq(4)').html().replace(/\./g,'')) == list[t]) {
								$(this).appendTo($('#spioHelperDIV').find('table'));
							}
						});
					}
				});
				// DEF
				$('#spioHelperDIV').find('table th:eq(5)').css('cursor','pointer').attr('title','|sort').addClass('tipsStandard').click(function(){
					var list = new Array();
					$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
						list.push(parseInt($(this).find('td:eq(5)').html().replace(/\./g,'')));
					});
					list.sort(numsort);
					if (sortDEF <= 0) {
						sortDEF = 1;
						sortLoot = 0;
						sortDF = 0;
						sortRessDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
						sortAge = 0;
					} else {
						list.reverse();
						sortDEF = -1;
						sortLoot = 0;
						sortDF = 0;
						sortRessDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
						sortAge = 0;
					}
					for (t = 0; t < list.length; t++) {
						$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
							if (parseInt($(this).find('td:eq(5)').html().replace(/\./g,'')) == list[t]) {
								$(this).appendTo($('#spioHelperDIV').find('table'));
							}
						});
					}
				});
				// RessDEF
				$('#spioHelperDIV').find('table th:eq(6)').css('cursor','pointer').attr('title','|sort').addClass('tipsStandard').click(function(){
					var list = new Array();
					$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
						list.push(parseInt($(this).find('td:eq(6)').html().replace(/\./g,'')));
					});
					list.sort(numsort);
					if (sortRessDEF <= 0) {
						list.reverse();
						sortRessDEF = 1;
						sortLoot = 0;
						sortDF = 0;
						sortDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
						sortAge = 0;
					} else {
						sortRessDEF = -1;
						sortLoot = 0;
						sortDF = 0;
						sortDEF = 0;
						sortPlayer = 0;
						sortCoords = 0;
						sortAge = 0;
					}
					for (t = 0; t < list.length; t++) {
						$('#spioHelperDIV').find('table tr:gt(0)').each(function(){
							if (parseInt($(this).find('td:eq(6)').html().replace(/\./g,'')) == list[t]) {
								$(this).appendTo($('#spioHelperDIV').find('table'));
							}
						});
					}
				});
			}
			$('#spioHelperDIV').append($('<div/>').css({'text-align':'center','margin-bottom':'20px'}).html('count: ' + spyReportCount + ' | total loot: ' + unsafe.tsdpkt(totalLoot) + ' | total DF: ' + unsafe.tsdpkt(totalDF)));
				if ($('#spioHelperDIV tr').length > 1) {
				$('#spioHelperDIV').show();
				$('#spioHelperDIV td').click(function(){
					if (!$(this).is(':first-child')) {
						$sel = $(this).parent();
						if ($sel.find('td:eq(0)').css('font-size') == '8px') {
							$sel.find('td').css({'font-size':''});
							$($sel.find('td:eq(0) a').attr('href')).find('td:eq(0) input').attr('checked',false);
						} else {
							$sel.find('td').css({'font-size':'8px'});
							$($sel.find('td:eq(0) a').attr('href')).find('td:eq(0) input').attr('checked',true);
						}
					}
				});
			}
		}
	}
}
}) ()