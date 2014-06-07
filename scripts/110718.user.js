// ==UserScript==
// @name           Flag Your AWRDS Sites
// @namespace      flagsite.awrds.com
// @version        1.1.11128
// @author         Jason Cooper 
// @description    Allow you to enter sites under you jurisdiction and flag those that need attention from you.
// @include        http://www.awrds.com/tst_dqe/belvoir.htm*
// ==/UserScript==

document.title = 'AWRDS Server Status';

createCSS();	//I have the CSS first because if something is wrong in the code don't want to be looking at default layouts
setTimeout('location.reload(true)',1000*60*15); // forces a reload from the server

var d = new Date();	
var site = GM_getValue('site');
var timeZone = GM_getValue('timeZone');
var x = GM_getValue('x');
var dst = GM_getValue('dst');  //Daylight Savings Time
if (site== null)
	site = ';';
var arr = site.split(';');
var td = document.getElementsByTagName("td");
var tr = document.getElementsByTagName("tr");
var currDate = ConvertStringToDate(td[1].innerHTML);
var dateDiff;
var baseTable = document.getElementsByTagName('table')[0];
	
if (timeZone == 'local')
	setLocalTime();

createConfig();		//top panel
createControls();	//popup control panel
createLegend();		//legend at the bottom
createInstructions();	//instructions and notes at the bottom
setTableHeaders();	//change the table headers into something a bit easier to read
//after all the changes to dates and times, we need to refresh the table variables
td = document.getElementsByTagName("td");
tr = document.getElementsByTagName("tr");
baseTable = document.getElementsByTagName('table')[0];
var currDate = ConvertStringToDate(td[1].innerHTML);
scanTable();		//scan the table and highlight the sites selected
checkNewVersion();	//Checks for a new version of this script every 24 hours.

//##############################################################################################
function createCSS(){
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = '* {font-family: Calibri, sans-serif;} ' +
		'body {width:900px;} ' +
		'table {border-collapse:collapse; width:900px;} ' +
		'table, th, td {padding: 2px 5px;} ' + 
		'th {background-color:#D1D1D1; } ' + 
		'td.good, tr.good {background-color:#c6efce; color:#007b74} ' +
		'td.bad, tr.bad {background-color:#ffc7ce; color:#9c2d75} ' +
		'td.warning, tr.warning {color:#9c6500; background-color:#ffeb9c;} ' +
		'span.time-offset {float:right; text-align:center; margin:0px -5px 0px 5px; height:100%; position:relative; padding-left: 7px; padding-right:7px;} ' +
		'span.bad, span.warning, span.good {font-style:italic;} ' +
		'dfn {text-decoration:underline;} ' +
		'div.controls {background-color:#024769; color:#95CBE9;  padding-left: 5px;}' +
		'div.controls input{ float:right;}'+
		'span#title {font-size: 22px;font-family:"Palatino Linotype", "Book Antiqua", Palatino, serif; text-shadow: 2px 2px #000;}'+
		'a#a-instructions {font-size:12px;color:#fff; margin:5px 5px; }' +
		'label {margin-right:5px; } ' +
		'input {margin:3px; } ' +
		'span#refreshRate {margin-left:20px; margin-right:5px;}' +
		'div#legend, div#legend table{width:100px; float:left; margin-right:20px;}'+
		'div#legend table td{border: 1px ridge black;}' +
		'div#config {display: block; position: absolute; top: 100px; left: 100px; width: 400px; padding: 5px; margin: 10px; z-index: 100; color: #333; background: #ddd; border: 3px ridge #000; padding:10px; visibility:hidden; -moz-border-radius: 10px;border-radius: 10px;}' +
		'div#config input#save {float:right; position:absolute;}' +
		'div#config-sites {width:150px; height:300px; overflow:scroll; float:left; }' +
		'div#config-title {font-family:"Palatino Linotype", "Book Antiqua", Palatino, serif; text-shadow: 1px 1px #000; background-color:#024769; color:#95CBE9; padding:3px 5px; margin:-9px -9px 5px -9px; border-bottom:3px ridge #000; -moz-border-radius: 6px 6px 0px 0px ;border-radius: 6px 6px 0px 0px;}'+
		'div#config-sites {width:150px; height:300px; background-color:#fff; margin-right:10px; padding:8px;}' +
		'div#config-end {float:left; clear:both; width:100%}' +
		'div#config-end input{float:right; }' +
		'div.dst {margin-top:5px;}'+
		'.config-sites {clear:both;}' +
		'.config-sites label{margin-left:5px;;}' +
		'div#config-timeZone {}'+
		'.hdr {margin:0px; font:15px;)';
	document.body.appendChild(css);
}

function scanTable(){
	for (var i = 0; i < td.length; i++) {
		var tdx = td[i];
		if( arr.indexOf(tdx.innerHTML)!=-1){
			if (tdx.nextSibling.innerHTML == 'ALERT Site!'){
				tdx.parentNode.className = 'bad';
			}
			else if(tdx.previousSibling.innerHTML == '1'){
				tdx.parentNode.className = 'warning';
			}
			else{
				tdx.parentNode.className = 'good';
				addTimeDiff (tdx.previousSibling.previousSibling, 'good');
				addTimeDiff (tdx.previousSibling.previousSibling.previousSibling, 'good'); 
			}
		}
		if(tdx.innerHTML =='ALERT Site!'){
			tdx.className = 'bad';
			addTimeDiff (tdx.previousSibling.previousSibling.previousSibling, 'bad');
			addTimeDiff (tdx.previousSibling.previousSibling.previousSibling.previousSibling, 'bad'); 
		}
		else if (tdx.innerHTML == '1'){
			tdx.nextSibling.nextSibling.className = 'warning';
			addTimeDiff (tdx.previousSibling, 'warning');
			addTimeDiff (tdx.previousSibling.previousSibling, 'warning'); 
		}
	}
}

function ConvertStringToDate(dateString){
	dateString = dateString.substr(0,3) + '/' + dateString.substr(4,2) + '/' + d.getFullYear() + ' ' + dateString.substr(7,5);
	dateString = new Date(dateString);
	return dateString;
}

function DateDiff(toDate, fromDate){
	diff  = new Date();
	diff.setTime(Math.abs(fromDate.getTime() - toDate.getTime()));
	timediff = diff.getTime();
	hours = Math.floor(timediff / (1000 * 60 * 60)); 
	timediff -= hours * (1000 * 60 * 60);

	mins = Math.floor(timediff / (1000 * 60)); 
	timediff -= mins * (1000 * 60);
	return String('00' + hours).substr(-2,2) + ':' + String('00' + mins).substr(-2,2);
}

function addTimeDiff(td, className){
	minDate = ConvertStringToDate(td.innerHTML);
	dateDiff = DateDiff(minDate, currDate);
	td.innerHTML = td.innerHTML + '<span class="'+className+' time-offset">'+ dateDiff +'</span>';
}

function setSettings(){
	var site =  document.getElementById("config-sites").getElementsByTagName('input');	
	var timeZone =  document.getElementById("timeZone");	
	var dst =  document.getElementById("dst");	
	var siteList='';
	
	for (var i=0; i<site.length ;i++){
		if (site[i].checked){
			siteList += site[i].value + ';';
		}
	}

	GM_setValue('site', siteList);
	GM_setValue('timeZone', timeZone.options[timeZone.selectedIndex].value);
	GM_setValue('dst', (dst.checked ? 1 : 0));
	location.reload(true);
}

function getSites(){
	var options ='';
	var arrSites = new Array(tr.length-1);
	for (var i=1, j=0; i<tr.length; i++, j++){
		var td = tr[i].getElementsByTagName("td");
		arrSites[j] = new Array(2);
		arrSites[j][0] = toProperCase(td[0].innerHTML.substr(4));
		arrSites[j][1] = td[5].innerHTML;
	}
	arrSites.sort();
	return arrSites;
}

function getTimeZones(defaultTimeZone){
// EST = GMT -5:00
	var timeLocal = new Date();
	var timeZoneString = timeLocal.toString();
	var displayTZ = timeLocal.toTimeString();
	displayTZ = displayTZ.substr(displayTZ.indexOf('GMT'),8);
	timeZoneString = displayTZ + ' (' + getAbbr(timeZoneString.substring(timeZoneString.indexOf('(')+1)) + ')';
	
	var options = '<option '+ (defaultTimeZone == 'est' ? 'SELECTED' : '') +' value="est">GMT+0500 (EST)</option>';
	options = options + '<option ' +(defaultTimeZone == 'local' ? 'SELECTED' : '') +' value="local">'+timeZoneString+'</option>';
	return options;
}

function toProperCase(s){
	if (s.length <=3)
		return s.toUpperCase();
	else
		return s.toLowerCase().replace(/^(.)|\s(.)/g, 
			function($1) { return $1.toUpperCase(); });
}

function getAbbr(phrase) {
        var newVal = '';
        phrase = phrase.split(' ');
        for(var c=0; c < phrase.length; c++) {
			newVal += phrase[c].substring(0,1).toUpperCase();
        }
        return newVal;
}

function setLocalTime(){
	var localTime = new Date();
	for (var i=1, j=0; i<tr.length; i++, j++){
		var td = tr[i].getElementsByTagName("td");
		td[1].innerHTML =convertLocalTime(td[1].innerHTML );
		td[2].innerHTML =convertLocalTime(td[2].innerHTML );
		td[3].innerHTML =convertLocalTime(td[3].innerHTML );
	}
}

function convertLocalTime(est){
	minDate = ConvertStringToDate(est);
	tz = -((-5 +dst) + (minDate.getTimezoneOffset()/60));
	minDate.setTime(minDate.getTime() + (tz*60*60000));
	return minDate.toDateString().substr(4,6).replace(' ', '-') + ' ' + minDate.toTimeString().substr(0,5);
}

function createConfig(){
	var config = document.createElement("div")
	config.className = 'config';	
	config.id = 'config';
	var sites = getSites();
	var optionsTZ = getTimeZones(timeZone);
	var chkList = '';
	for (var i=0; i<sites.length; i++){
		if( arr.indexOf( sites[i][1])!=-1)
			chkList = chkList + '<div class="config-sites"><input type="checkbox" CHECKED value="' + sites[i][1] + '" /><label for="' + sites[i][1] + '">'+ sites[i][0]+'</label></div>';
		else
			chkList = chkList + '<div class="config-sites"><input type="checkbox" value="' + sites[i][1] + '" /><label for="' + sites[i][1] + '">'+ sites[i][0]+'</label></div>';
	}
	config.innerHTML='<div id="config-title">Configuration Options</div>';
	config.innerHTML = config.innerHTML + '<form id="config">' + 
		'<div id="config-sites">' +
		chkList + 
		'</div>' +
		'<div id="config-timeZone"><label for="timeZone">Time Zone</label><select id="timeZone" name="timeZone">'+
		optionsTZ+
		'</select></div><div class="dst"><label for="dst"><abbr title="Daylight Savings Time">DST</abbr></label><input type="checkbox" '+ (dst==1 ? 'CHECKED' : '') +' id="dst" name="dst" value="1" /></div>' +
		'<div id="refreshRate">Refresh Rate: 15 min</div>'+
		'</form><div id="config-end"></div>';
	
	var cancelButton= document.createElement('input');
	cancelButton.setAttribute('type','button');
	cancelButton.setAttribute('name','cancel');
	cancelButton.setAttribute('value','Cancel');
	config.lastChild.appendChild(cancelButton);
	cancelButton.addEventListener('click', function() {cancelSettings();}, true);
	
	var saveButton= document.createElement('input');
	saveButton.setAttribute('type','button');
	saveButton.setAttribute('name','save');
	saveButton.setAttribute('value','Save');
	config.lastChild.appendChild(saveButton);
	saveButton.addEventListener('click', function() {setSettings();}, true);

	baseTable.parentNode.insertBefore(config, baseTable);
}

function createControls(){
	var controls = document.createElement("div");
	controls.className = 'controls';
	controls.innerHTML = '<div><span id="title">AWRDS Server Status</span></div>';

	var instructionsLink = document.createElement('span');
	instructionsLink.innerHTML = '<a href="#instructions" id="a-instructions">Instructions &amp; Legend</a>'
	controls.firstChild.appendChild(instructionsLink);

	var config= document.createElement('input');
	config.setAttribute('type','button');
	config.setAttribute('name','config');
	config.setAttribute('value','Settings');
	controls.firstChild.appendChild(config);
	config.addEventListener('click', function() {showConfig();}, true);
	baseTable.parentNode.insertBefore(controls, baseTable);	
}

function createLegend(){
	var legend = document.createElement("div")
	legend.id = 'legend';
	legend.innerHTML = '<h3>Legend</h3>' +
		'<table id="colors"><tr><td class="bad">Bad</td></tr><tr><td class="warning">Warning</td></tr><tr><td class="good">Good</td></tr><tr><td>Not You</td></tr></table>';
	baseTable.parentNode.appendChild(legend);
}

function createInstructions(){
	var instructions = document.createElement("div")
	instructions.id = 'instructions';
	instructions.innerHTML = '<h3>Control Panel Instructions</h3>' +
		'<p>The controls at the top of the page are for you to set. Select your site/region that you are responsible for or at. ' +
		'This will highlight all the sites that you are responsible for. Some sites will identify multiple locations. That is ok ' +
		'and is designed for those with a larger support footprint.</p>' +
		'<p>For the time zones you will have the options of showing times in either <abbr title="Eastern Standard Time">EST</abbr> ' +
		'where the server is location or your local time zone. This will automatically update depending on the zone indicated on ' +
		'your computer. There an also a toggle for <abbr title="Daylight Savings Time">DST</abbr>. You may have to play with the DST ' + 
		'option to get the proper times to display in the report.</p>' +
		'<p>Also note that there is a built in setting that will refresh the status page every 15 minutes for you so that you always have the most up to date information.</p>' +
		'<p>Clicking <i>Save</i> will save your changes and update the page with the settings that you have selected. These settings ' +
		'will be remembered until they are changed, even if you restart your computer!</p>' +
		'<p><a href="#top">Top</a></p>';
	baseTable.parentNode.appendChild(instructions);
}

function setTableHeaders(){
	var th=document.getElementsByTagName("th");
	th[0].innerHTML = 'Remote Site';
	th[1].innerHTML = 'Server Time';
	th[2].innerHTML = 'Last Upload';
	th[3].innerHTML = 'Last Download';
	th[4].innerHTML = '<dfn title="Take the numbers of hours (no rounding) of the time difference between ServerDate-LastUpload and ServerDate-LastDownload and add the results together. NOTE: this does not translate to actual hours offline!">Combined</dfn> Gap Hours';
	th[5].innerHTML = 'Site Abbr';
	th[6].innerHTML = 'Sync Status';
}

function showConfig(){
	document.getElementById('config').style.visibility="visible";
}

function cancelSettings(){
	document.getElementById('config').style.visibility="hidden";
}

function checkNewVersion(){
	/*Thanks Jarett!
		http://userscripts.org/scripts/review/20145
		this will check for a new vesion once a day (24 hours)
	*/
	var SUC_script_num = 110718; // Change this to the number given to the script by userscripts.org (check the address bar)
	try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}