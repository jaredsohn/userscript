// ==UserScript==
// @version     	3.01
// @name        	MyEpisodes Enhanced
// @namespace   	http://userscripts.org/scripts/show/110076
// @description 	Adds download links, a progress bar, season premiere alerts, better searching, and a whole lot of customization to MyEpisodes.com
// @include     	http://*myepisodes.com/*
// @exclude     	http://*myepisodes.com/forum*
// @exclude     	http://dev.myepisodes.com*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js
// @grant       	GM_getValue
// @grant       	GM_setValue
// @grant       	GM_listValues
// @grant       	GM_xmlhttpRequest
// ==/UserScript==


var isNow = new Date()
if (GM_getValue("settings", "")==""){//initial setup of the script
	GM_setValue("settings", '1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~#a0c0ff~~#60ffc0~~1~~s(S)e(E) / (F)~~http://en.wikipedia.org/wiki/Special:Search?search=list+of+SHOWNAME+episodes~~1~~1~~1~~~~15~~1~~-720p -1080p~~1~~1~~')
	GM_setValue("gmdate", isNow.getDate())
	GM_setValue("UseCache", false)
	GM_setValue("UseProgCache", false)
	GM_setValue("chFilter", "")
	GM_setValue("searchBuddy", "")
}
else {
	if (GM_getValue("gmdate") != isNow.getDate()){ //first website load of the day
		GM_setValue("gmdate", isNow.getDate())
		isRefresh = false
		//this is just because I decided to abbreviate Comedy Central between v3 and 3.01.  This will be removed in the next update
		if (GM_getValue("tvRage").match(";;Comedy Central;;")){
			GM_setValue("tvRage", GM_getValue("tvRage").replace(/;;Comedy Central;;/g, ';;Com. Central;;'))
		}
		if (GM_getValue("chFilter").match(";Comedy Central;")){
			GM_setValue("chFilter", GM_getValue("chFilter").replace(/;Comedy Central;/g, ';Com. Central;'))
		}
	}
	else{
		isRefresh = true
	}
}

//parse out the settings
settingsArr = GM_getValue("settings").split('~~')
pAlert = Boolean(Number(settingsArr[0]));uAlert = Boolean(Number(settingsArr[1]));ukAlert = Boolean(Number(settingsArr[2]));caAlert = Boolean(Number(settingsArr[3]));
auAlert = Boolean(Number(settingsArr[4]));anim = Boolean(Number(settingsArr[5]));award = Boolean(Number(settingsArr[6]));docu = Boolean(Number(settingsArr[7]));
game = Boolean(Number(settingsArr[8]));mini = Boolean(Number(settingsArr[9]));news = Boolean(Number(settingsArr[10]));real = Boolean(Number(settingsArr[11]));
scrip = Boolean(Number(settingsArr[12]));sport = Boolean(Number(settingsArr[13]));talk = Boolean(Number(settingsArr[14]));variy = Boolean(Number(settingsArr[15]));
hColor = settingsArr[16];pColor = settingsArr[17];countdown = Boolean(Number(settingsArr[18]));namer = settingsArr[19];hLink = settingsArr[20];
nzbOld = Boolean(Number(settingsArr[21]));nzbTod = Boolean(Number(settingsArr[22]));nzbdl = Boolean(Number(settingsArr[23]));nzbUrl = settingsArr[24];
nzbMrkOld = Number(settingsArr[25]);nzbMrk = Boolean(Number(settingsArr[26]));nzbdf = settingsArr[27];torOld = Boolean(Number(settingsArr[28]));
torTod = Boolean(Number(settingsArr[29]));torUrl = settingsArr[30];

//add the configuration Screen
configScreen = document.createElement('div')
configScreen.style.display = "none"
configScreen.id = 'configScreen'
configScreen.innerHTML = "<br><br>" +
'<div style="height:416px;border:1px solid black;float:left;padding:5px">' +
'<div>' +
'<h2 style="background-color:#CCC;text-align:center;border-bottom:1px solid black">My List Settings</h2>' +
'<p><input type="checkbox" id="pAlert"> Season premiere alert header</p>' +
'<p><input type="checkbox" id="countdown"> Enable episode countdown</p>' +
'<p style="border-top:1px solid red">Highlight color for season premieres</p>' +
'<input type="text" id="hColor" style="width:50px">(hex color only)' +
'<p style="border-top:1px solid red">Highlight color for series premieres</p>' +
'<input type="text" id="pColor" style="width:50px">(hex color only)' +
'<p style="border-top:1px solid red">Naming format of the progress bar.<br>' + 
'(s)=season#, (e)=episode#, (f)=finale#.<br>' +
'Use caps to add a leading zero</p>' +
'<input type="text" id="namer" style="width:180px" value="' + namer + '">' +
'<p style="border-top:1px solid red">Hyperlink embedded in the progress bar<br>' + 
'Use variables:<br>SHOWNAME SEASON EPISODE</p>' +
'<input type="text" id="hLink" style="width:180px" value="' + hLink + '">' +
'</div>' +
'</div>' +
'<div style="height:416px;border:1px solid black;float: left;margin-left:5px;padding:5px">' +
'<h2 style="background-color:#CCC;text-align:center;border-bottom:1px solid black">TVRage Series Premieres</h2>' +
'<p style="font-weight:bold">Get shows from which countries</p>' +
'<table>' +
'<tr>' +
'<td style="padding-left:5px" width="55px">US</td>' +
'<td style="padding-left:5px" width="55px">UK</td>' +
'<td style="padding-left:5px" width="55px">Canada</td>' +
'<td style="padding-left:5px" width="55px">Australia</td>' +
'</tr>' +
'<tr>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="uAlert"></td>' +
'<td><input type="checkbox" id="ukAlert"></td>' +
'<td><input type="checkbox" id="caAlert"></td>' +
'<td><input type="checkbox" id="auAlert"></td>' +
'</tr>' +
'</table>' +
'<div style="float:left;display:inline">' +
'<p style="font-weight:bold">Types of shows I want</p>' +
'<table style="margin-top:-8px">' +
'<tbody>' +
'<tr>' +
'<td><input type="checkbox" id="anim"></td>' +
'<td>Animated</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="award"></td>' +
'<td>Award Shows</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="docu"></td>' +
'<td>Documentary</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="game"></td>' +
'<td>Game Show</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="mini"></td>' +
'<td>Mini-Series</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="news"></td>' +
'<td>News</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="real"></td>' +
'<td>Reality Shows</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="scrip"></td>' +
'<td>Scripted</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="sport"></td>' +
'<td>Sports</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="talk"></td>' +
'<td>Talk Shows</td>' +
'</tr>' +
'<tr>' +
'<td><input type="checkbox" id="variy"></td>' +
'<td>Variety Shows</td>' +
'</tr>' +
'</tbody>' +
'</table>' +
'</div>' +
'<div style="float:right; display:inline; margin-left: 20px; width:130px">' +
'<p style="font-weight:bold">Blocked Channels</p>' +
'<select id="channelFilterList" multiple="multiple" size="16" style="width:130px;height:238px;margin-top:-3px"></select>' +
'<input id="removeSelBtn" type="button" disabled="true" value="Unblock Selected" style="margin-left:12px;margin-top:2px">' +
'</div>' +
'</div>' +
'<div style="height:416px;border:1px solid black;float:left;margin-left:5px;padding:5px">' +
'<h2 style="background-color:#CCC;text-align:center;border-bottom:1px solid black">Downloads</h2>' +
'<div style="float:left;border-right:1px solid grey">' +
'<h2 style="text-align:center">NZB</h2>' +
'<p><input type="checkbox" id="nzbTod">Add links for today</p>' +
'<p><input type="checkbox" id="nzbOld">Add links for the past</p>' +
'<div id="hasNzbDownloads">' +
"<p>Age considered 'the past' (days)?</p>" +
'<input type="number" id="nzbMrkOld" style="width:40px" value="' + nzbMrkOld + '">' +
'<p><input type="checkbox" id="nzbdl">Enable Bulk Download</p>' +
'<p><input type="checkbox" id="nzbMrk">Mark acquired when NZB found</p>' +
'<p style="border-top:1px solid red">Use a different NZB source<br>' +
'SHOWNAME SEASON EPISODE</p>' +
'<p><input type="text" id="nzbUrl" style="width:165px" value="' + nzbUrl + '"></p>' +
'<p style="border-top:1px solid red">NZB download filter</p>' +
'<p><input type="text" id="nzbdf" style="width:165px" value="' + nzbdf + '"></p>' +
'</div>' +
'</div>' +
'<div style="float:left;padding-left:5px">' +
'<h2 style="text-align:center">TOR</h2>' +
'<p><input type="checkbox" id="torTod">Add links for today</p>' +
'<p><input type="checkbox" id="torOld">Add links for the past</p>' +
'<div id="hasTorDownloads">' +
'<p style="border-top:1px solid red">Use a different Torrent source<br>' +
'SHOWNAME SEASON EPISODE</p>' +
'<p><input type="text" id="torUrl" style="width:165px" value="' + torUrl + '"></p>' +
'</div>' +
'</div>' +
'</div>' +
'<div style="text-align: center;padding-top:15px;clear:both">' + 
"<input type='button' name='Restore the default settings (doesn't affect Blocked Channels)' id='restoreDefault' style='width:70px;background-color: #a0c0ff; border-radius:10px; cursor:pointer;' value='Restore'>" +
'<input type="button" name="Save settings and refresh page" id="saveReload" style="width:70px;background-color: #a0c0ff; border-radius:10px; cursor:pointer; margin-left:15px" value="Save">' +
'<input type="button" name="Discard any changes made" id="cancelSettings" style="width:70px;background-color: #a0c0ff; border-radius:10px; cursor:pointer; margin-left:15px" value="Cancel">' +
'</div>'

$('#divContainer').parent().prepend(configScreen); 
$('#cancelSettings').click(function(){ //cancel and exit settings
	toggleConfig()
})
$('#restoreDefault').click(function(){ //restore defaults
	restoreDefault()
})
$('#saveReload').click(function(){ //save button
	saveReload()
})
$('#channelFilterList').click(function(){ //enable remove selected button when clicking on filtered channel list
	$('#removeSelBtn').removeAttr("disabled")
})
$('#removeSelBtn').click(function(){ //remove selected items from list
    $("#channelFilterList option:selected").remove();
})
$('#hColor').keyup(function(){//checks if text is a hex color.  if it is, changes background color
	if ((this.value.length==3 || this.value.length==6) && /^#/.test(this.value)==false){
		this.value = "#" + this.value
	}
	if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.value) && this.value!=$(this).css('background-color')){
		if(this.value=="#000"){
			$(this).css('color','white')
		}
		else{
			$(this).css('color','black')
		}
		$(this).css('background-color',this.value)
	}
})
$('#pColor').keyup(function(){//checks if text is a hex color.  if it is, changes background color
	if ((this.value.length==3 || this.value.length==6) && /^#/.test(this.value)==false){
		this.value = "#" + this.value
	}
	if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.value) && this.value!=$(this).css('background-color')){
		if(this.value=="#000"){
			$(this).css('color','white')
		}
		else{
			$(this).css('color','black')
		}
		$(this).css('background-color',this.value)
	}
})
$('#nzbTod').click(function(){
	showNzbSettings()
})
$('#nzbOld').click(function(){
	showNzbSettings()
})
$('#torTod').click(function(){
	showTorSettings()
})
$('#torOld').click(function(){
	showTorSettings()
})

//add User Config button, search bar and Status List link
extraLine = document.createElement('div');
extraLine.setAttribute("style", "padding-top:3px;")
extraLine.innerHTML = '<b>&nbsp;&nbsp;<a href="http://www.myepisodes.com/shows.php?type=list" style="font-size:11px; color: #054f5c; font-family: Tahoma; text-decoration: none" >Status List</a></b>'
configButton = document.createElement('input');
configButton.setAttribute('type','button');
configButton.setAttribute('id','configButton')
configButton.setAttribute('style','float:right; background-color: #a0c0ff; border-radius:5px; cursor:pointer')
configButton.setAttribute('value','MyEpisodes Enhanced Config');
configButton.addEventListener('click',toggleConfig,true);
extraLine.appendChild(configButton)
$('#menuText').css('white-Space', 'no-wrap');
$('#menuText').append('<form style="float:right" action="search.php" method="POST"><input type="text" style="width:178px;border-width: 1px;border-style:solid;border-color: black" autocomplete="off" name="tvshow" tabindex="1" id="r"></form>')
$('#menuText').after(extraLine);
$('#r').parent().submit(function(){
	$(this).attr('id','q')
	GM_setValue("searchBuddy", $(this).children().val() + ";;" + '0')
})


/*****************************END OF USER CONFIG CODE*****************************/



//resize the layout to accomodate all the extra data
$('#divContainer').attr('id','divContainers')
$('td:eq(0)').width(0)
$('td:last').width(0)
$('td:eq(1)').width('900px')

rageCount = 0
if (!uAlert){rageCount = rageCount+1}
if (!ukAlert){rageCount = rageCount+1}
if (!caAlert){rageCount = rageCount+1}
if (!auAlert){rageCount = rageCount+1}
classFliter = ""
if (anim){classFliter=classFliter + "A"}
if (award){classFliter=classFliter + 'W'}
if (docu){classFliter=classFliter + 'D'}
if (game){classFliter=classFliter + 'G'}
if (mini){classFliter=classFliter + 'M'}
if (news){classFliter=classFliter + 'N'}
if (real){classFliter=classFliter + 'R'}
if (scrip){classFliter=classFliter + 'S'}
if (sport){classFliter=classFliter + 'P'}
if (talk){classFliter=classFliter + "T"}
if (variy){classFliter=classFliter + "V"}
if (nzbOld || nzbTod){hasNzb = true}
else{hasNzb = false}
if (torOld || torTod){hasTor = true}
else{hasTor = false}
nzbdf = nzbdf.replace(/ /g, "+");
var myMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var idList = new Array
myURL = window.location.href

if (myURL.match(/.*epsbyshow.*/)){ //working on the individual show pages
	//add the header for data pulled from tvrage
	tvRageShowHeader = document.createElement('div')
	tvRageShowHeader.setAttribute('style', 'border-bottom:1px solid grey;border-right:1px solid grey;width:100%;height:auto;margin:-12px 0px 5px 0px;display:none')
	tvRageShowHeader.setAttribute('id', 'tvRageShowHeader')
	addShowHeader($('.flatbutton:eq(0)').attr('href'))
	$('.pageheader').after(tvRageShowHeader)
	
	if($('.flatButton:eq(0)').attr('value') != 'Add Show'){
		$('.pageheader').html(function(){ //Change the old header to the show name
			$(this).children().remove()
			newHeaderImg = document.createElement('div')
			newHeaderImg.setAttribute('style', 'width:60px;height:32px;background-image:url("img/header_episodes_by_show.jpg")')
			newHeader = document.createElement('div')
			newHeader.setAttribute('style', 'position:relative;top:-30px;width:100%;color:#799BA5;font-size:200%;text-align:center;font-weight:bold')
			newHeader.innerHTML = $('.flatbutton:eq(0)').text()
			$(this).append(newHeaderImg)
			$(this).append(newHeader)
		})
		//formatting and adding year/day of the week to airdate
		$('.date').html(function(index, oldhtml){
			if ($(this).text() != "Unknown"){
				myDate = cleanDate($(this).html())
				d = new Date(myDate)
				myDate = d.toDateString().replace(/^(.*?) (.*) (.*)/, "$1, $2, $3")
				myDate = oldhtml.replace(/(.*)>.*?</, "$1>" + myDate + "<")
				$(this).html(myDate)
			}
		});
		$('.date').css('text-align', 'left');
		$('.showname').css('text-align', 'center');
		$('.longnumber').attr('width', '6%');
		$('.longnumber').css('text-align', 'left');
		if ($("th.season").length > 1){ //create the reverse season order button
			newDiv = document.createElement("div")
			newDiv.setAttribute('style','float: right')
			revOrder = document.createElement('input');
			revOrder.setAttribute('type','button');
			revOrder.setAttribute('id','revOrder')
			revOrder.setAttribute('title',"This will disable 'Save Status'")
			revOrder.setAttribute('style','background-color: #DADADA; border: 1px solid gray; text-align:center; float:right; margin-bottom: 5px')
			revOrder.setAttribute('value','Reverse Season Order');
			newDiv.appendChild(revOrder)
			revOrder.addEventListener('click',reverse,true);
			$(".mylist").before(newDiv)
			for (i=6; i<$("th.season").length+6; i++){ //the header looks better red
				$("tbody tr.header:eq(" + i + ")").css('color', 'red');
			}
		}
	}
}

//Episodes List only
d = new Date();
if (myURL.match(/views.php$/) || myURL.match(/views.php.$/) || myURL.match(/views.php..$/)){
	//add new Series table, and run function to find upcoming series premieres from TVRage	
	if (uAlert || ukAlert || caAlert || auAlert){
		var tvRageHeader = document.createElement('table');
		tvRageHeader.setAttribute('id', 'newSeriesList');
		tvRageHeader.setAttribute('width', '50%');
		tvRageHeader.setAttribute('align', 'left');
		tvRageHeader.setAttribute('style', 'text-align: center; padding:2px')
		tvRageHeader.setAttribute('cellspacing', "0")
		tvRageHeader.innerHTML = '<tbody id="tvRageHeader"><tr><td colspan="6" nowrap style="cursor:pointer;background-color: #CCC"><a>Upcoming Series Premieres (from TVRage)<span id="tvRageCount"></span></a></td></tr></tbody>'
		tvRageList = document.createElement('tbody');
		tvRageList.setAttribute('id', 'tvRageList');
		tvRageList.setAttribute('style', 'text-align: left; display:none')
		$('.mylist').before(tvRageHeader)
		$('#newSeriesList').append(tvRageList)
	}
	
	//add Premiere alert
	if (pAlert && !myURL.match(/showid/) && !myURL.match(/quickcheck/)){
		var newTable = document.createElement('table');
		newTable.setAttribute('id', 'PremiereAlert');
		newTable.setAttribute('width', '50%');
		newTable.setAttribute('align', 'right');
		newTable.setAttribute('style', 'text-align: center; padding:2px')
		newTable.setAttribute('cellspacing', "0")
		newTable.innerHTML = '<tbody><tr><td id="isPremiere" colspan="4" style="cursor:pointer; background-color: #CCC"><a>Season Premieres in My List</a></td></tr></tbody><tbody id="premiereList" style="display: none"></tbody>';
		$('.mylist').before(newTable)
		$('#isPremiere').click(function(){togglepAlert()})
	}
	
	//add the coundown column
	$('.Episode_PastOne td:first-child').attr("class", "airDate")
	$('.Episode_PastTwo td:first-child').attr("class", "airDate")
	$('.Episode_Today td:first-child').attr("class", "airDate")
	$('.Episode_One td:first-child').attr("class", "airDate")
	$('.Episode_Two td:first-child').attr("class", "airDate")
	if (countdown){
		//add in the current time header
		var weekday=new Array(7);
		weekday=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
		AMPM = "am"
		hours = d.getHours()
		if (hours >= 12){
			AMPM = "pm"
			hours = hours - 12
		}
		minutes = '' + d.getMinutes()
		if (minutes.length < 2) {minutes = '0' + minutes;}
		myHtml = 'Air Date<br><font color="#c06080">' + weekday[d.getDay()] + ' ' + hours + ':' + minutes + '' + AMPM + "</font>"
		$('th:first').html(myHtml)
		$('th:first').attr('colspan','2')
		//add the countdown for each row
		$('.airDate').each(function(){
			//find the air date of episodes, and format it
			airDate = cleanDate($(this).html())
			var d2 = new Date(airDate)
			var myDate = new Date(airDate);

			//time math
			airTime = $(this).next().html()
			//$(this).attr('width','7%')
			$(this).css('vertical-align', 'top')
			$(this).css('padding', '2px 5px 2px 5px')
			$(this).css('white-space', 'nowrap')
			findHour = airTime.replace(/(\d{1,2}):.*/, "$1")
			findHour = airTime.replace(/^0/, "")
			findHour = parseInt(findHour)
			if (airTime.match("pm")){findHour = findHour + 12}
			else if (airTime.match('12:')){findHour = findHour - 12}
			findMin = airTime.replace(/.*:(\d{2})/, "$1")
			findMin = parseInt(findMin)
			d2.setHours(findHour)
			d2.setMinutes(findMin)
			d2.setSeconds(0)
			d2.setMilliseconds(0)
			cDownTD = document.createElement('td');
			cDownTD.setAttribute('class', 'countdown')

			//Countdown feature for all shows before today
			if ($(this).parent().attr('class').match("Episode_Past")){
				cDown = Math.abs(parseInt((new Date()-myDate)/86400000))
				cDownTD.setAttribute('style', 'float:left;color: #ff3000;padding:2px 5px 2px 3px;margin-right:3px;white-space: nowrap;height:20px')
				if (cDown == 1){
					cDownTD.innerHTML = 'Yesterday'
				}
				else {
					cDownTD.innerHTML = cDown + ' Days Ago'
				}
			}
			
			//Countdown feature for shows in todays list
			else if ($(this).parent().attr('class') == "Episode_Today"){
				cDown = (d2 - new Date()) / 3600000
				theHour = Math.abs(parseInt(cDown))
				theMinutes = Math.abs(parseInt(60*(cDown-theHour)))
				if (theHour == 0 && theMinutes == 0){ //air time is Now
					cDownTD.setAttribute('style', 'float:left;color: #ff3000;padding:2px 5px 2px 3px;margin-right:3px;white-space: nowrap;height:20px')
					cDownTD.innerHTML = 'Now'
				}
				else if (cDown > 0){ //air time is later today
					if (theMinutes + d.getMinutes != 60){theMinutes = theMinutes + 1}
					if (theMinutes==60){myTime = theHour + 1 + " h"}
					else if (theMinutes==0){myTime = theHour + " h"}
					else if (theHour==0){myTime = theMinutes + " min"}
					else {myTime = theHour + " h " + theMinutes + " min"}
					cDownTD.setAttribute('style', 'float:left;color: #00c000;padding:2px 5px 2px 3px;margin-right:3px;white-space: nowrap;height:20px')
					cDownTD.innerHTML = myTime
				}
				else{ //air time already passed
					theHour = Math.abs(Math.ceil(cDown))
					theMinutes = Math.abs(parseInt(60*(-cDown-theHour)))
					if (theMinutes==60){myTime = theHour + 1 + " h"}
					else if (theMinutes==0){myTime = theHour + " h"}
					else if (theHour==0){myTime = theMinutes + " min"}
					else {myTime = theHour + " h " + theMinutes + " min"}
					cDownTD.setAttribute('style', 'float:left;color: #ff3000;padding:2px 5px 2px 3px;margin-right:3px;white-space: nowrap;height:20px')
					cDownTD.innerHTML = myTime
				}
			}
			
			//Countdown feature for all shows scheduled for the future dates
			else {
				cDownTD.setAttribute('style', 'float:left;color: #00c000;padding:2px 5px 2px 3px;margin-right:3px;white-space: nowrap;height:20px')
				cDown = Math.abs(parseInt((myDate-new Date())/86400000))+1
				if (cDown == 1){
					cDownTD.innerHTML = 'Tomorrow'
				}
				else{
					cDownTD.innerHTML = '<span>' + cDown + ' Days</span>'
				}
			}
			$(this).before(cDownTD)
		})
	}
	else{
		$('.airDate').each(function(){
			$(this).css('vertical-align', 'top')
			$(this).css('padding', '2px 5px 2px 5px')
			$(this).css('white-space', 'nowrap')
		})
	}
	
	//add links to remove or ignore show
	removeShow = document.createElement('div');
	removeShow.setAttribute('style', 'display:none;border:1px solid blue; height:8px;width:8px; margin-top:3px; margin-left:6px; float:left; cursor:pointer; text-align:center')
	removeShow.setAttribute('title', 'Remove Show')
	removeShow.setAttribute('class', 'showRemove')
	removeShow.innerHTML = "<p style='position:relative;top:-10px;color:red;font-size:75%;font-weight:bold'>R</p>"
	ignoreShow = document.createElement('div');
	ignoreShow.setAttribute('style', 'display:none;border:1px solid blue; height:8px;width:8px; margin-top:3px; margin-left:2px; float:left; cursor:pointer; text-align:center')
	ignoreShow.setAttribute('title', 'Ignore Show')
	ignoreShow.setAttribute('class', 'showIgnore')
	ignoreShow.innerHTML = "<p style='position:relative;top:-10px;color:red;font-size:75%;font-weight:bold'>I</p>"
	$('.showname').children().css('float', 'left')
	$('.showname').append(removeShow)
	$('.showname').append(ignoreShow)
	$('.showname').hover(function(){
		$(this).find(">:nth-last-child(1)").toggle()
		$(this).find(">:nth-last-child(2)").toggle()
	})
	$('.showRemove').click(function(){
		showID = $(this).parent().html().replace(/.*?showid\=(.*?)".*/, "$1")
		showName = $(this).prev().text()
		ignoreRemove(showID,showName,'Remove')
	})
	$('.showIgnore').click(function(){
		showID = $(this).parent().html().replace(/.*?showid\=(.*?)".*/, "$1")
		showName = $(this).prev().prev().text()
		ignoreRemove(showID,showName,'Ignore')
	})
	
	//Create progress bar
	$('.longnumber').html(function(index, oldhtml){
		$(this).attr('id', $(this).text())
		showNameFull = $(this).prev().find('>:first-child').text()
		showName = cleanShowName(showNameFull)
		showID = $(this).prev().html().replace(/.*?showid\=(.*?)".*/, "$1")
		var progBar = document.createElement('td');
		var tempArray = $(this).text().split("x");
		epNb = "s" + tempArray[0] + "e" +tempArray[1];
		ep = epNb.replace(/.*?e(..).*/, "$1")
		se = epNb.replace(/s(..).*/, "$1")
		se1 = se.replace(/^0/, "")
		ep1 = ep.replace(/^0/, "")
		reNamer = namer.replace("(S)", se)
		reNamer = reNamer.replace("(E)", ep)
		reNamer = reNamer.replace("(s)", se1)
		reNamer = reNamer.replace("(e)", ep1)
		reNamer = reNamer.replace(/ /g, "&nbsp;")
		reNamer = reNamer.replace(/$/, "&nbsp;")
		myUrl = cleanUserURL(hLink,showName,se1,ep1)
		thisShow = showID + "s" + se
		progBar.setAttribute('class', 'ProgBar' + thisShow);
		progBar.setAttribute('title', ep);
		progBar.innerHTML = '<b><div style="border: 1px solid black; background-color:white"><div style="background-color:white; width:0%">&nbsp;<a class="emptyBar" href="' + myUrl + '" target="_blank">' + reNamer + '</a></div></div></b>';
		$(this).html(progBar)
		
		//add lines to season/series premiere table
		if (pAlert && (ep1 == 0 || ep1 == 1) && $('#' + showName).length == 0){
			newTr = document.createElement('tr');
			newTr.setAttribute('id',showName)
			//newTr.setAttribute('style',';border:1px solid black')
			newTd = document.createElement('td');
			newTd2 = document.createElement('td');
			newTd3 = document.createElement('td');
			newTd4 = document.createElement('td');
			newTd.setAttribute('style', 'padding:2px;border-bottom:1px solid grey;text-align: left')
			newTd2.setAttribute('style', 'padding:2px;border-bottom:1px solid grey;text-align: left')
			newTd3.setAttribute('style', 'padding:2px;border-bottom:1px solid grey')
			newTd4.setAttribute('style', 'padding:2px;border-bottom:1px solid grey')
			if (se1==1){
				newTr.setAttribute("style", "background-color:rgba(255,255,0,0.4)")
				$(this).parent().css("background-color", "rgba(255,255,0,0.4)")
				$(this).parent().attr('class','Episode_series_premiere')
			}
			else{
				$(this).parent().css("background-color", "rgba(255,0,0,0.2)")
				$(this).parent().attr('class','Episode_premiere')
			}
			newTd.setAttribute('width', '10%')
			newTd.innerHTML = $('.myDate:eq(' + index + ")").text()
			newTd2.innerHTML = showNameFull
			link = 'http://www.nzbindex.nl/search/?q=' + showName + '+preair+|+' + showName + '+dvdscr+|+' + showName + '+' + epNb + '&age=&max=25&minage=&sort=agedesc&minsize=20&maxsize=&dq=&poster=&nfo=&complete=1&hidespam=0&hidespam=1&more=1'
			link2 = 'http://thepiratebay.sx/search/' + showName + '+preair/0/99/0'
			newTr.appendChild(newTd)
			newTr.appendChild(newTd2)
			if (hasNzb){
				newTd3.innerHTML = '<a style="text-decoration:none" href="' + link + '" target="_blank">NZB</a>'
				newTr.appendChild(newTd3)
			}
			if (hasTor){
				newTd4.innerHTML = '<a style="text-decoration:none" href="' + link2 + '" target="_blank">TOR</a>'
				newTr.appendChild(newTd4)
			}
			if (se=='01' && $('#seriesPremiereMyList').length==0){ //the separated header for series premieres
				newRow = document.createElement('tr');
				newLine = document.createElement('td');
				newRow.setAttribute('id','seriesPremiereMyList')
				newLine.setAttribute('colspan','4')
				newLine.setAttribute('style','background-color:#CCC;text-align:center')
				newLine.innerHTML = 'Series Premieres'
				newRow.appendChild(newLine)
				$("#premiereList").append(newRow)
			}
			if (se=='01'){
				$("#premiereList").append(newTr)
			}
			else if ($('#seriesPremiereMyList').length>0){
				$('#seriesPremiereMyList').before(newTr)
			}
			else{
				$("#premiereList").append(newTr)
			}
		}
		ct = $("#premiereList").children().length
		if ($('#seriesPremiereMyList').length>0){
			ct = $("#premiereList").children().length - 1
		}
		$("#isPremiere").html("<a>Upcoming Season Premieres in My List (<b>" + ct + "</b>)</a>")
		
		//Begin to actually build the progress bars
		airDate = cleanDate($('.airDate:eq(' + index + ')').html())
		var d2 = new Date(airDate)
		searchShow = false
		if (typeof isRefresh === "undefined" || GM_getValue("ProgBarCache","")==""){
			searchShow = true
		}
		else if (!isRefresh && d2.getDate() - d.getDate() >=0 && d2.getDate() - d.getDate() <=3){//determine if the show is airing between today and 3 days from now
			searchShow = true
		}
		else{ //search the cache for the show
			var reg = new RegExp("^" + thisShow + 'e')
			if (GM_getValue("ProgBarCache").match(reg)){fd = 0}
			else{fd = GM_getValue("ProgBarCache").indexOf("," + thisShow + 'e')}
			if (fd<0){searchShow = true}
		}
		if (searchShow){
			found = undefined;
			for (y=0; y < idList.length; y++){ //prevent addition of duplicates
				if (thisShow === idList[y]){
					found = true;  
					break;
				}
			}
			if (!found){
				idList.push(thisShow)
			}
		}
	})
	
	//make the newly colored rows highlight on hover
	$('.Episode_series_premiere').hover(function(){
		$(this).css('background-color', '')
	}, function(){
		$(this).css("background-color", "rgba(255,255,0,0.4)")
	})
	$('.Episode_premiere').hover(function(){
		$(this).css('background-color', '')
	}, function(){
		$(this).css('background-color', 'rgba(255,0,0,0.2)')
	})
	
	//tvrage data gathering
	if (typeof isRefresh === "undefined" || GM_getValue('tvRage','')==''){Upcoming(0)}
	else{tvRageChecker()}
	if (typeof isRefresh !== "undefined" && !isRefresh && GM_getValue('tvRage','')!=''){Upcoming(0)} //refresh the data in the background - data will show up on next refresh

	
	Arr = new Array()
	if (GM_getValue("UseProgCache")){//place any progress bar data we have
		parseProgBarCache(0)
	}
	else {//Start collecting progress bar data
		GM_setValue("UseProgCache", true)
		GM_setValue("ProgBarCache", "null")
		ProgCacheBuilder(0)
	}
}

//functions running on Episodes List / Quick Check / Show pages (i.e. NZB/Torrent)
if ((myURL.match(/views.php$/) || myURL.match(/views.php.$/) || myURL.match(/views.php..$/) || myURL.match("quickcheck") || myURL.match('epsbyshow')) && $('.flatButton:eq(0)').attr('value') != 'Add Show'){
	//Insert new column for NZB/Torrent links, 
	if (myURL.match("quickcheck") || myURL.match('epsbyshow')){
		c = 4
		if (myURL.match("quickcheck")){$('.headershowname').attr('colspan','6')}
		else{$('.season').attr('colspan','6')}
	}
	else{c=5}
	if (hasTor){
		$('th:eq(' + c + ')').before('<th width="4%" style="text-align:left">TOR</th>')
		$('.epname').after('<td class="TOR" style="padding:2px 2px 2px 2px;vertical-align:top"></td>')
	}
	if (hasNzb){
		$('th:eq(' + c + ')').before('<th width="4%" style="text-align:left">NZB</th>')
		$('.epname').after('<td class="NZB" style="padding:2px 2px 2px 2px;vertical-align:top"></td>')
	}
	
	if (hasNzb || hasTor){
		var past = new Date();
		past.setHours(0)
		past.setMinutes(0)
		past.setSeconds(0)
		past.setTime(past.getTime() - (nzbMrkOld*86400000));
		if (hasNzb){
			if (nzbdl){
				var bulkSearch = document.createElement('div');
				bulkSearch.style.display="none";
				bulkSearch.setAttribute('id', 'BulkDownload');
				bulkSearch.setAttribute('style', 'display:none;clear:both;float:right;cursor:pointer');
				bulkSearch.innerHTML = '<a id="bulkDl" onClick="">' + nzb_img_src() + '<font color="red" font size="2"> (All <span id="bulkDlCt"></span>)</font></a>';
				$('.mylist').before(bulkSearch)
			}
			rssList = []
			$('.NZB').html(function(index, oldhtml){
				if (myURL.match("quickcheck") || myURL.match('epsbyshow')){
					myDate = cleanDate($('.date:eq(' + index + ')').html())
				}
				else{
					myDate = cleanDate($('.airDate:eq(' + index + ')').html())
				}
				myDate = new Date(myDate)
				//add NZB elements
				if ((nzbOld && myDate <= past) || (nzbTod && myDate > past && myDate <= isNow)) {
					if (myURL.match('epsbyshow')){showName = cleanShowName($('.showname:eq(' + index + ')').text())}
					else{showname = cleanShowName($('.showname:eq(' + index + ')').find(">:first-child").text())}
					if (myURL.match("quickcheck") || myURL.match('epsbyshow')){longNb = $('.longnumber:eq(' + index + ')').text()}
					else{longNb = $('.longnumber:eq(' + index + ')').attr('id')}
					epNb = longNb.replace(/.*x/, "")
					sNb = longNb.replace(/x.*/, "")
					//build NZB Links
					rss = showName + '+s' + sNb + "e" + epNb
					link = 'http://www.nzbindex.nl/search/?q=' + rss + "&age=30&max=25&g[]=42&g[]=687&g[]=657&g[]=356&minage=&sort=agedesc&minsize=20&maxsize=&dq=" + nzbdf + '&poster=&nfo=&complete=1&hidespam=1&more=1'
					link = link.replace("++", "+")
					if (nzbUrl != "") {link = cleanUserURL(nzbUrl,showName,sNb,epNb)}
					else if (myURL.match("quickcheck") || myURL.match('epsbyshow')){link = 'http://www.nzbindex.nl/search/?q=' + rss + '&age=30&max=25&minage=&sort=agedesc&minsize=20&maxsize=&dq=&poster=&nfo=&complete=1&hidespam=0&hidespam=1&more=1'}
					else if (myDate <= past){link = 'http://www.nzbindex.nl/search/?q=' + showName + '&age=30&max=25&minage=&sort=agedesc&minsize=20&maxsize=&dq=&poster=&nfo=&complete=1&hidespam=0&hidespam=1&more=1'}
					$(this).html('<a href ="' + link + '" target="_blank">NZB</a>')
					if (myDate > past && myDate <= isNow){
						$(this).attr('id', 'NzbLinkNew' + index)
						if (myURL.match(/views.php$/) || myURL.match(/views.php.$/) || myURL.match(/views.php..$/)){rssList.push(rss + ";;" + index)}
					}
					else{$(this).attr('class', 'NZBlink')}
				}
			})
			if (myURL.match(/views.php$/) || myURL.match(/views.php.$/) || myURL.match(/views.php..$/)){
				NzbStart()
			}
		}
		if (hasTor){
			$('.TOR').html(function(index, oldhtml){
				if (myURL.match("quickcheck") || myURL.match('epsbyshow')){
					myDate = cleanDate($('.date:eq(' + index + ')').html())
				}
				else{
					myDate = cleanDate($('.airDate:eq(' + index + ')').html())
				}
				myDate = new Date(myDate)
				//add Torrent elements
				if ((torOld && myDate <= past) || (torTod && myDate > past && myDate <= isNow )){
					if (myURL.match('epsbyshow')){showName = cleanShowName($('.showname:eq(' + index + ')').text())}
					else{showname = cleanShowName($('.showname:eq(' + index + ')').find(">:first-child").text())}
					if (myURL.match("quickcheck") || myURL.match('epsbyshow')){longNb = $('.longnumber:eq(' + index + ')').text()}
					else{longNb = $('.longnumber:eq(' + index + ')').attr('id')}
					epNb = longNb.replace(/.*x/, "")
					sNb = longNb.replace(/x.*/, "")
					//build Torrent Links
					link = 'http://thepiratebay.sx/search/' + showName + '+s' + sNb + "e" + epNb + '/0/99/0'
					if (torUrl != "") {link = cleanUserURL(torUrl,showName,sNb,epNb)}
					else if (myURL.match("quickcheck") || myURL.match('epsbyshow')){link = 'http://thepiratebay.sx/search/' + showName + "+s" + sNb + "e" + epNb + '/0/99/0'}
					else if (myDate <= past){link = 'http://thepiratebay.sx/search/' + showName + '/0/99/0'}
					$(this).html('<a href ="' + link + '" target="_blank">TOR</a>')
					if(myDate > past && myDate <= d){$(this).attr('class', 'torLinkNew');}
					else{$(this).attr('class', 'torLink');}
				}
			})
		}
	}
}
	
//search results pages
if (myURL.match(/search.php/)){
	if ($('#divContainers table tbody tr td').length == 1){//there was only 1 search result, redirect to the page
		window.location.assign($('#divContainers table tbody tr td a').attr('href'))
	}
	searchVal = ""
	if (GM_getValue('searchBuddy') != ""){ //use the searchBuddy to figure out what show was searched for
		src = ""
		if (GM_getValue('searchBuddy').replace(/.*(.$)/,"$1") == 0){ //only put this info if its a myepisodes result search
			searchBuddyResults = document.createElement('p')
			searchBuddyResults.setAttribute('margin-top','2px')
			searchBuddyResults.innerHTML = 'Search Source: <strong>myepisodes.com</strong>'
			$('u:eq(0)').parent().after(searchBuddyResults)
		}
		searchVal = GM_getValue('searchBuddy').replace(/...$/,"")
		GM_setValue("searchBuddy","")
	}
	
	//add the search bar to all search results pages
	notResults = document.getElementById('showlist')
	if (!notResults){ //keeps us from adding junk to the blank search page
		var searchBar = document.createElement('form');
		searchBar.setAttribute('action', 'search.php');
		searchBar.setAttribute('method', 'POST');
		searchBar.innerHTML = '<br><div><input type="text" value="' + searchVal + '" style="width: 100%;" autocomplete="off" name="tvshow" tabindex="1" id="q"><br></div><br><table cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td width="45%" valign="top"><input type="submit" value="Search myepisodes.com" name="action" tabindex="2"><br><br>Search myepisodes.com for a show stored localy on this site.</td><td align="center" width="10%">- <b>OR</b> -</td><td align="right" width="45%" valign="top"><input type="submit" value="Search tvrage.com" name="action" tabindex="3"><br><br>If you can' + "'t find the show in a myepisodes.com search.<br>Then you can try <b>adding</b> it directly from tvrage.com.<br>All you do is press this search button instead,<br>then add the show you are looking for to our site.<br></td></tr></tbody></table>"
		$('div:last').before(searchBar)
	}
	
	$('input:last').click(function(){ //bind searchbuddy to tvrage search
		GM_setValue("searchBuddy", $('#q').val() + ";;" + '1')
	})
	$('input:nth-last-child(3)').click(function(){ //bind searchbuddy to myEpisodes search
		GM_setValue("searchBuddy", $('#q').val() + ";;" + '0')
	})
	$('#q').parent().submit(function(){ //bind searchbuddy to a search performed by clicking enter, rather than a button
		GM_setValue("searchBuddy", $(this).children().val() + ";;" + '0')
	})
}

function nzb_img_src(){
	var nzb_img_src = '<img alt="" src="data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAAd0SU1FB9kCEgEkJcIbdOUAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAADF0lEQVRIS8WVX0hTcRTHv0EPK1HIP6lz6kwtp3NqmqbOZs6ZFaXWCEuyeigJIhatQoiEyojAFv2BVlJGREXmiiikHpIihCB6KqiM9exTIkSkdTrn3t05zfQSQj/4cn/3d87vfM45v9/dgP8x4vIQzXLE5aJWj2JzkK07z/h8xCfY8DGpHJRcoSop9NTeI59iW1yEH4uysVsXJKEAbZaWBXRv9CT1fu/UpR09' + 
		'FcSVfmaAYVYIZ+O1eQzko2bqIrcutT61UbwVwxw8ZlZAYgm8eV7QtvFo2joepUuu/ijiyvUBkkoZcBjUNKpfVY9ACUU6Acnl8FrbQRuHVW0IaaZ5ZS8fdLFOgNEOb/5R0PovrODftfYDyB4AFZwAZe8EJZbqBKQ4+JA7QPXvI/RuYl73FlRxGyRJ5HpAOXsZsIuvcrlegBPeguOgujcgV6Reg6oegorPgQpPgWzHQNYjKmTZHv5e7DMAUuuRlroGDSFdl7JXPwfVvFDl6AeV3wSV+kElF0DLuyYgeQzJ2QdKqcFXowPNWhxjNTLCVzZtHQaXtoEsnE3uATWQBF31WM3afl9ty8obbLvCkIshSGeoVQdBGVtA5s2sJlB6AwNr8Sn84Zlc2J/VirGq' + 
		'B5zxy5A4c6mi+hnDnjCIbZV3uRINch6Uyb3PrTVRvstM6SWxlNkKytquAH7GF+IqA+ZrVcxLcaJlSQu+ScZykNL/Wu6785UKkorEVnmHK+kBrbgMSt0ECgaDJMPn81FGs1LBWGw+Tk/92bDyQnV0BjqMTowXnQWVSabXuB3ckuJLoCIfX8kz3BI+nzy+QZZDfPcdkwEJZfi10IhbHMvJkpjqMJvNAR40VX6/n9j8x7rmJzatgqGhoUl+EjMMsNlsAaVOHt3d3TQwMKDMZbME8Xg8YfX19Wmuik0DyB7Zqw2JOS2gsbFR6WckQAKJ3G43CUCyFZ9IgLzL3n8GmEwmGhwcpJGREdJaN6eAyNuiVTRngHDdUyaRgKk+k87AYDC0y4IoJiYmYDQalbnF' +
		'YpGDUubTSWziM51NYs767zYXDr8BFT1PtO2OLbgAAAAASUVORK5CYII=" />'
	return nzb_img_src
}
	
var amzImgSrc = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAH4AAAAYCAYAAAA8jknPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAZuSURBVGhD7Zk7bixFFIY7IPIKvAOvAW/BW/AeHLMFL4DcbIDc2c3MCiwSAgdIQASWrhHmurlf+37o96Gqp+YhJ0xLrZmpPnVe/3l1zTQ3rsfHx5n7va+Xl5dF7vPz83uLPpi8Ud2hG6VFuR7tNjzSyMkfOPz6+no+Pz+fz87O5tPT0+U7a7/8+tsbx9zc3MxXV1fz5eXlfH9/P9/d3S3foeeT31w8c/3i4mJmX+u6vb1d6JTLJ79Zzws9lMvz1l33pG5VP3njPOyEH/z5ja7o7J6Hh4du' +
		'cLgfWv22yVbotFN/KQBduOULHTe6iQX66DPkIm+bIJjIMpjAeJqm5g3jrAA4RFqUwYjcy28AaPGsDmF/Ty7r0qMngdSjPTk5WZ7Bjwt69rqe+1jDsRn0aQPPqhxsaVVBnJ3+wFfuTRkGk89MMH6jTwYsstSR59BqB7LEi7WU1wu2VsQuwKfiOIBIyjWEG4Ew4bkGtByrMS2QMMrIxNikQSa8EwTon56eFt0xmGfeOih5YHwrSHBQOok9ZhqAGqQ9ewzCmlXI4xn7CUxkw1cbsvrJW4DMaPZDjx7sF2jopYW3OmoLa1wGqjxG+tZE6UhjVbQGBKDYayrwKNfKcLKP9QwiZFk2M9vhKf8MiKTnufMHn+lgM0PnpY7qXoMWB8ozq5MZiB7pG6tJVgr3' +
		'pd8SDPeoT/LAx+lnQTZAs2JYwQxyQddn7sn1tQCYiDqIMbL2mgSm5zwMQimupMchXj0gCQBk8jzLaJZ0HF+NqQ6zwkhXg9kqgD5mqHugxQcJvA6vZdz+r13obrbrA5/BFzDcUwMkQVEnfSmIFQ/9aMAmDwOr7umBv5T6NMThyUHFCOtlvJmaUa4zNgHPc2cMjLfF1OxrRXHtw9nfBETds3/W9sLvCrz06JaVI21lj7wyKVqONpBr9dL+GkC97FVe6iGPrYFnI4rV/lf7cy/jCRSDJ8GAn+u9jOd5a5Cqg1gFnt9ZgtHNKoA9FfjMglZQtIC3l/eAz+qxCXhl0oPrG1Lqa4/eFnh4JPC1+rSCcWJwygzjO0D5ujCa8RXETaW+TrlOsbadHB7zVaqC' +
		'VJ3pcJXBkxk/Cry9M4GvPd4SvQZ8DprYuAl47NsX+LXe7rMpHVH76UiP72X8GvAYT8Dl9J58ao8HeDOwvv4tJT7alRWsTvqttuNkv2vGr/VcAxuanDmc/BOcymdf4IcyPocdgMgrK4EDBQa1yl/N+BxAaqnHEXUAy4EqdcrXrtqfnSXQk6zzsClfz6DJTM3WYmmt9FaInq36yABtVZ3s/76i+UqYPs5XOn2wL/BDGV+diXAyrHWwAm0deHbNeJydfRpjkYuMeiAEqDho02GPIKczfUemsnFnMBsQLeBbPT5t1bm+quK3zDTXPVEz4OpETgJoL4F0iFI/lPE4uw5yAlIB8NVkJOM39fgaQPXQJ4MCPWgNCTzPPfasgx6gVDCrjXkSV9vOpoz3GBqg' +
		'si2hn0e9nit4+JTtxCNWaA3EDKp3yXin03piRcRilJGa5bIOPJum+jpHOKzxWd8mABOHOLl7IqaenuGTKR8//5fDzXdkoGOeMMK/nkACiMee6t0CvpfxrJsQvgqib00S7Kr9vPf2hN7ooD7vArzCUAoDPIXz9QiF6qGAk7fTv2UPAFjj9hUMPp6yeUiUpQj+rCsbsFIngyRf1+ZPf87zHz/N888fXm++f14DlOTNd9+34U9Q2K4qXdpUD5O0SV08dMrjW/2HDGSZ6bXfOvRJV33rWwDr9XhYX7X+MFL/ntyqx7//zo0MBPOP3706eYfrDXBl/9qzN6TI/uGbef72q//e3389z3/93tTMAFhTe6Qvpp7DOq8I7fFwvafTIWSPA0+WATxOx/kdJ+8Q' +
		'E+NbkI9sM53PDAR0PF5DHhgHHnYvf7863YwThCFRhyFaDpgJuijxiz5k/PEa9sCWwH851yezcLQBwPc92sCQtsisGS74VqEhRkciPLAd8NVngJ0BYOZZCXacBxYxZDX7Le/Z15EJ6JzYWer3kfU/jIXdgf8yMS8A9QYuAwGgoOEGyOzRfGdNgKGBvgaUvKCzl1t52HO8tvLA7sArxnNyAqBVAVoT+LZrthJkALYyCRqneeaP4zXsgf2BzwBIQMzcbUGuVWKthBsIw+YeCfXA4YBf86m9Osu5pT9bgAMigOY/bsdsPnjE/gPkLld1SQxVWQAAAABJRU5ErkJggg==';

		

/*****************************FUNCTIONS ONLY BEYOND THIS POINT*****************************/


//open / close config screen
function toggleConfig(){
	if ($('#divContainers').is(":visible")){
		applySettings()
		showNzbSettings()
		showTorSettings()
	}
	$('#configScreen').toggle('slow',function(){
		$('#divContainers').toggle()
	})
}

function applySettings(){ //most settings that are text based are entered on load of the script
	$('#pAlert').prop('checked', pAlert)
	$('#uAlert').prop('checked', uAlert)
	$('#ukAlert').prop('checked', ukAlert)
	$('#caAlert').prop('checked', caAlert)
	$('#auAlert').prop('checked', auAlert)
	$('#anim').prop('checked', anim)
	$('#award').prop('checked', award)
	$('#docu').prop('checked', docu)
	$('#game').prop('checked', game)
	$('#mini').prop('checked', mini)
	$('#news').prop('checked', news)
	$('#real').prop('checked', real)
	$('#scrip').prop('checked', scrip)
	$('#sport').prop('checked', sport)
	$('#talk').prop('checked', talk)
	$('#variy').prop('checked', variy)
	$('#hColor').val(hColor)
	$('#hColor').css('background-color', hColor)
	$('#pColor').val(pColor)
	$('#pColor').css('background-color', pColor)
	$('#countdown').prop('checked', countdown)
	$('#nzbOld').prop('checked', nzbOld)
	$('#nzbTod').prop('checked', nzbTod)
	$('#nzbdl').prop('checked', nzbdl)
	$('#nzbMrk').prop('checked', nzbMrk)
	$('#torOld').prop('checked', torOld)
	$('#torTod').prop('checked', torTod)
	//not sure why, but I need to empty out the option box first
	$('#channelFilterList option').each(function(){$(this).remove();});
	//fill in the blocked channels
	cf = GM_getValue("chFilter").split(';;')
	cf[0] = cf[0].replace(/^;/,"")
	cf[cf.length-1] = cf[cf.length-1].replace(/;$/,"")
	cf.sort()
	for (i=0; i<cf.length; i++){
		cfe = document.createElement('option')
		cfe.innerHTML = cf[i]
		$("#channelFilterList").append(cfe)
	}
}
		
//toggle for the season premiere table
function togglepAlert(){
	$('#premiereList').toggle('fast')
}

function toggleTvRage(){
	$('#tvRageList').toggle('fast')
}

function colorToHex(color) {
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};

function saveReload(){
	//save all the settings
	GM_setValue('settings', Number(document.getElementById("pAlert").checked) + '~~' +
	Number(document.getElementById("uAlert").checked) + '~~' +
	Number(document.getElementById("ukAlert").checked) + '~~' +
	Number(document.getElementById("caAlert").checked) + '~~' +
	Number(document.getElementById("auAlert").checked) + '~~' +
	Number(document.getElementById("anim").checked) + '~~' +
	Number(document.getElementById("award").checked) + '~~' +
	Number(document.getElementById("docu").checked) + '~~' +
	Number(document.getElementById("game").checked) + '~~' +
	Number(document.getElementById("mini").checked) + '~~' +
	Number(document.getElementById("news").checked) + '~~' +
	Number(document.getElementById("real").checked) + '~~' +
	Number(document.getElementById("scrip").checked) + '~~' +
	Number(document.getElementById("sport").checked) + '~~' +
	Number(document.getElementById("talk").checked) + '~~' +
	Number(document.getElementById("variy").checked) + '~~' +
	colorToHex($('#hColor').css("background-color")) + '~~' +
	colorToHex($('#pColor').css("background-color")) + '~~' +
	Number(document.getElementById("countdown").checked) + '~~' +
	$('#namer').val() + '~~' +
	$('#hLink').val() + '~~' +
	Number(document.getElementById("nzbOld").checked) + '~~' +
	Number(document.getElementById("nzbTod").checked) + '~~' +
	Number(document.getElementById("nzbdl").checked) + '~~' +
	$('#nzbUrl').val() + '~~' +
	$('#nzbMrkOld').val() + '~~' +
	Number(document.getElementById("nzbMrk").checked) + '~~' +
	$('#nzbdf').val() + '~~' +
	Number(document.getElementById("torOld").checked) + '~~' +
	Number(document.getElementById("torTod").checked) + '~~' +
	$('#torUrl').val() + '~~')
	//save blocked channels list
	myVar = ""
	$('#channelFilterList option').each(function(){
		myVar = myVar +  ";" + this.value + ";"
    });
	GM_setValue("chFilter", myVar)
	location.reload()
}

function ignoreRemove(showID,showName,remove){
	if (confirm(remove + " " + showName + "?")==true){
		if(remove=='Remove'){remove='mode=del&showid=' + showID}
		else{remove='mode=ign&showid=' + showID + '&ignored=1'}
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.myepisodes.com/views.php?type=manageshow&' + remove,
		})
		$('.showname').find('>:first-child').text(function(index, text){
			if(text==showName){$(this).parent().parent().hide('slow')}
		})
	}
}

function restoreDefault(){
	if (confirm("Are you sure you want to restore all defaults?  The list of blocked channels will not be changed")==true){
		GM_setValue("settings", '1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~1~~#a0c0ff~~#60ffc0~~1~~s(S)e(E) / (F)~~http://en.wikipedia.org/wiki/Special:Search?search=list+of+SHOWNAME+episodes~~1~~1~~1~~~~15~~1~~-720p -1080p~~1~~1~~')
		location.reload()
	}
}

//Reverse the season order for shows
function reverse(){
	if ($('#revOrder').attr('value') == 'Reverse Season Order'){
		$('#revOrder').attr('value', 'Refresh Page');
		//disable the Save Status buttons
		$('.flatButton:eq(1)').attr('disabled','true')
		$('.flatButton:eq(4)').attr('disabled','true')
		$('.mylist tbody').append('<tr><td style="padding-top: 14px;"></td></tr>')
		b = $("th.season").length+5
		//reverse the seasons
		for (i=6; i<$("th.season").length+5; i++){
			$("tbody tr.header:eq(" + b + ")").nextUntil("tr.header").andSelf().insertBefore($("tbody tr.header:eq(" + i + ")"))
		}
	}
	else {
		location.reload();
	}
}

function addShowHeader(url){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			text = responseDetails.responseText
			var reg = /padding.bottom.10.*?div>/gm
			var imgMatch = text.match(reg);
			if (imgMatch[0].match('src')){ //add the tvrage image (if there is one)
				$('#tvRageShowHeader').append(imgMatch[0].replace(/.*<img(.*?)>/, '<span style="float:left"><img id="tvRageImage"$1></span>'))
				$('#tvRageImage').css({
					maxHeight: '150px',
					maxWidth: '270px',
				})
				$('#tvRageImage').load(function(){resizeHeader()})
			}
			//add the tvRage synopsis
			text = text + ""
			var reg = /show.synopsis.*/gm
			var txtMatch = text.split(reg);
			txtMatch = txtMatch[1].split(/.*?<div class/)
			myTxt = txtMatch[0] + ""
			myTxt = myTxt.replace(/^\s+/,"")
			txtHeader = document.createElement('p')
			txtHeader.innerHTML = myTxt
			txtHeader.setAttribute('id', 'tvRageTxt')
			txtHeader.setAttribute('style','margin:0px 0px 0px 5px;overflow:auto;float:left')
			$('#tvRageShowHeader').append(txtHeader)
			rating = $('#tvRageTxt strong').html()
			$('#tvRageTxt div').nextUntil().remove()
			$('#tvRageTxt div').prev().remove()
			if (rating==undefined){$('#tvRageTxt div').replaceWith('<br><br>')}
			else{$('#tvRageTxt div').replaceWith('<p style="margin-top:5px;font-weight:bold">'+rating+"</p>")}
			if($('#tvRageImage').length>0){ //pre-formatting if there is an image.  We have to wait until the image loads
				$('#tvRageShowHeader').height('150px')
				$('#tvRageTxt').css({
					height: '150px',
					width: '624px'
				})
			}
			else{ //no image, slap the data onto the screen
				$('#tvRageShowHeader').css('border-left', '1px solid grey')
				$('#tvRageShowHeader').show()
				myHeight = $('#tvRageTxt').height()
				$('#tvRageShowHeader').height(myHeight)
			}
			$('#tvRageShowHeader').css('margin-left', '-1px')
		}
	});
}

function resizeHeader(){ //after the image from tvrage loads we will resize everything around it
	$('#tvRageShowHeader').animate({'height':'toggle'}, 'slow', function(){
		myHeight = $('#tvRageImage').height()
		myWidth = 894 - $('#tvRageImage').width()
		$('#tvRageTxt').css({
			'height': myHeight,
			'width': myWidth
		})
		$('#tvRageShowHeader').height(myHeight)
	})
}

function cleanDate(text){ //make date fields readable by javascript
	myDate = text.replace(/.*?date\=(.*?)">.*/, "$1");
	myDate = myDate.replace(/" name="yesterday.*/, "");
	myDate = myDate.replace(/" name="today.*/, "");
	myDate = myDate.replace(/-/gm, " ");
	return myDate
}

function showNzbSettings(){
	if(Number(document.getElementById("nzbTod").checked) + Number(document.getElementById("nzbOld").checked) == 0){
		$('#hasNzbDownloads').hide()
	}
	else{
		$('#hasNzbDownloads').show()
	}
}

function showTorSettings(){
	if(Number(document.getElementById("torTod").checked) + Number(document.getElementById("torOld").checked) == 0){
		$('#hasTorDownloads').hide()
	}
	else{
		$('#hasTorDownloads').show()
	}
}

function cleanShowName(showNameFull){ //prepares the showname for being used in a hyperlink
	showName = showNameFull.replace(" (US)", "")
	showName = showName.replace(" (UK)", "")
	showName = showName.replace(/ \(\d{4}\)$/, "")
	showName = showName.replace(/'/,"")
	showName = showName.replace(/[^0-9a-zA-Z\.: ]+/gm, " ")
	showName = showName.replace(/\s{1,100}/gm, "+")
	showName = showName.replace(/\+$/g,"")
	return showName
}

function cleanUserURL(url,showName,sNb,epNb){ //user defined URL cleaning
	if(!url.match(/^http/)){url = "http://" + url}
	url = url.replace("SHOWNAME", showName)
	url = url.replace("EPISODE", epNb)
	url = url.replace("SEASON", sNb)
	return url
}

//will create the cache for the Progress Bar
function ProgCacheBuilder(i){
	showId = idList[i].replace(/;../,"")
	seasonNumber = idList[i].replace(/.*;/,"")
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.myepisodes.com/views.php?type=epsbyshow&showid=' + showId,
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onerror: function(responseDetails){
			GM_setValue("UseProgCache", false)
		},
		onload: function(responseDetails) {
			var text = responseDetails.responseText;
			var reg = new RegExp(seasonNumber + "x\\d{2}", 'gm')
			var regMatch = text.match(reg);
			reg = /.....$/g
			regMatch = reg.exec(regMatch)
			reg = /..$/
			epNumber = reg.exec(regMatch)
			id = showId + "s" + seasonNumber + "e" + epNumber
			if (GM_getValue("ProgBarCache","null")=="null"){
				GM_setValue("ProgBarCache", id)
			}
			else {
				GM_setValue("ProgBarCache", GM_getValue("ProgBarCache") + "," + id)
			}
			if (i == idList.length-1){
				parseProgBarCache(0)
			}
			else{
				ProgCacheBuilder(i+1)
			}
		}
	});
}

function parseProgBarCache(j){
	if (Arr.length==0){
		Arr = GM_getValue("ProgBarCache").split(",")
	}
	epVal = Arr[j].replace(/.*(..)$/, "$1")
	thisShow = Arr[j].replace(/...$/, "")
	isSent = false
	if($(".ProgBar" + thisShow).length==0){ //show isn't in list any more.  Remove from array.
		Arr.splice(j,1)
	}
	else{
		$(".ProgBar" + thisShow).html(function(){
			if (!isSent){
				var percent = ($(this).attr("title") / epVal)*100
				var progChange = document.createElement('td');
				progChange.setAttribute('class', 'ProgBar');
				reg = /^0/
				epVal2 = reg.exec(epVal)
				if (epVal2==null){
					epVal2 = epVal
				}
				else{
					reg = /.$/
					epVal2 = reg.exec(epVal)
				}
				progChange.innerHTML = $(this).html().replace("(F)", epVal)
				progChange.innerHTML = progChange.innerHTML.replace("(f)", epVal2)
				if (percent > 100){
					isSent = true
					loadShow(thisShow.replace(/s.*/,""))
				}
				else{
					if (percent == 100){ //add red bars on left and right for season finale episodes
						$(this).parent().parent().find(">:first-child").css("border-left", "3px solid red")
						$(this).parent().parent().find(">:last-child").css("border-right", "3px solid red")
						if (countdown){
							$(this).parent().parent().find(">:first-child").css("padding-left", "1px")
							$(this).parent().parent().find(">:last-child").css("padding-right", "1px")
						}
						else{
							$(this).parent().parent().find(">:first-child").css("padding-left", "2px")
							$(this).parent().parent().find(">:last-child").css("padding-right", "2px")
						}
					}
					progAdj = percentToObj(percent)
					progChange.innerHTML = progChange.innerHTML.replace("background-color:white; width:0%", progAdj)
					progChange.innerHTML = progChange.innerHTML.replace('class="emptyBar"', 'class="fullBar"')
					$(this).html(progChange);
				}
			}
			if (hLink.match('wikipedia')){
				$(this).attr('title', 'Search Wikipedia')
			}
			else{
				$(this).attr('title', 'Custom Search')
			}
		})
	}
	if (j <= Arr.length-2){
		parseProgBarCache(j+1)
	}
	else if ($('.emptyBar').length > 0){ //the parse is over.  look for empty progress bars
		GM_setValue("ProgBarCache", Arr.join()) //save to cache (in case items were removed)
		newArr = new Array()
		for (i=0; i<$('.emptyBar').length; i++){
			parentClass = $('.emptyBar:eq(' + i + ")").parent().parent().parent().parent().attr('class')
			if (newArr.indexOf(parentClass) == -1){
				newArr.push(parentClass)
				GM_setValue("ProgBarCache", GM_getValue("ProgBarCache") + "," + parentClass.replace("ProgBar","") + "e01")
				loadShow(parentClass.replace(/ProgBar(.*?)s.*/,'$1'))
			}
		}
	}
}

function percentToObj(percent){
	if (percent < 34){colorCode = '20ff40'}
	else if (percent > 34 && percent < 67){colorCode = 'ffff80' }
	else if (percent > 67 && percent <= 99.9){colorCode = 'a080ff'}
	else if (percent == 100){colorCode = 'ff6020'}
	progAdj = "background-color:#" + colorCode + "; width:" + percent + "%"
	return progAdj
}

function loadShow(showId){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.myepisodes.com/views.php?type=epsbyshow&showid=' + showId,
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			showId = responseDetails.finalUrl.replace(/.*\=/, "")
			seasonNumberArr = GM_getValue("ProgBarCache").split(",")
			var reg = new RegExp("^" + showId + "s")
			for (i=0;i<seasonNumberArr.length;i++){
				if (seasonNumberArr[i].match(reg)){
					seasonNumber = seasonNumberArr[i].replace(/.*s(.*?)e.*/,"$1")
					break
				}
			}
			var text = responseDetails.responseText;
			reg = new RegExp(seasonNumber + "x\\d{2}", 'gm')
			var regMatch = text.match(reg);
			reg = /.....$/g
			regMatch = reg.exec(regMatch)
			reg = /..$/
			epVal = reg.exec(regMatch)
			$(".ProgBar" + showId + "s" + seasonNumber).html(function(){
				var percent = ($(this).attr("title") / epVal)*100
				var progChange = document.createElement('td');
				progChange.setAttribute('class', 'ProgBar');
				reg = /^0/
				epVal2 = reg.exec(epVal)
				if (epVal2==null) {
					epVal2 = epVal
				}
				else {
					reg = /.$/
					epVal2 = reg.exec(epVal)
				}
				progChange.innerHTML = $(this).html().replace("(F)", epVal)
				progChange.innerHTML = progChange.innerHTML.replace("(f)", epVal2)
				progAdj = percentToObj(percent)
				progChange.innerHTML = progChange.innerHTML.replace("background-color:white; width:0%", progAdj)
				progChange.innerHTML = progChange.innerHTML.replace("class=emptyBar", "class=fullBar")
				$(this).html(progChange);
			})
			seasonNumberArr[i] = showId + "s" + seasonNumber + "e" + epVal
			GM_setValue("ProgBarCache", seasonNumberArr.join())
		}
	});
}

//begin the RSS search of NZB files
function NzbStart(){
	if (rssList.length>0){
		NzbQuery(rssList[0].replace(/;;.*/, ""), rssList[0].replace(/.*?;;/, ""))
		rssList.splice(0,1)
	}
}

function NzbQuery(rss, i){
	//loading the full page rather than the RSS feed. The RSS feed is way faster (about 25-40%), but spits out 'Service Unavailable' errors more than 40% of the time.
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.nzbindex.nl/search/?q=' + rss + "&age=30&max=25&g[]=42&g[]=687&g[]=657&g[]=356&minage=&sort=age&minsize=20&maxsize=&dq=" + nzbdf + '&poster=&nfo=&complete=1&hidespam=1&more=1',
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var text = responseDetails.responseText;
			myLink = text.split('.nzb">Download')
			myLink = myLink[0].split('href="')
			myLink = myLink[myLink.length-1] + ".nzb"
			if (myLink.match('http://www.nzbindex.nl/download')){
				var newNzbLink = document.createElement('td');
				newNzbLink.setAttribute('class', 'NzbDirect');
				newNzbLink.innerHTML = '<a href="' + myLink + '">' + nzb_img_src() + '</a>';
				$('#NzbLinkNew' + i).replaceWith(newNzbLink)
				//automatically mark "Acquired" any items that have NZB results
				if(nzbMrk){$('.NzbDirect:last').nextUntil().prev().children().attr('checked', 'true')}
				//update the bulk download link
				if (nzbdl){
					$('#bulkDlCt').html($('.NzbDirect').length)
					if ($('.NzbDirect').length == 2){
						$('#BulkDownload').show()
					}
					$('#bulkDl').attr('onclick',function(index, attr){
						if (attr == ""){
							$(this).attr('onclick',"window.open('" + myLink + "')")
						}
						else{
							$(this).attr('onclick',attr + ";window.open('" + myLink + "')")
						}
					})
				}
			}
			NzbStart()
		}
	});
}

//Upcoming series premieres from TVRage
function Upcoming(b){
	country = ''
	if (b==0 && uAlert){
		thisUrl = "http://services.tvrage.com/tools/quickschedule.php"
		country = "US"
	}
	else if (b<=3){
		if (b==1 && ukAlert){country = "GB"}
		else if (b==2 && caAlert){country = "CA"}
		else if (b==3 && auAlert){country = "AU"}
		thisUrl = "http://services.tvrage.com/tools/quickschedule.php?country=" + country
	}
	if (country != ''){
		GM_xmlhttpRequest({
			method: 'GET',
			url: thisUrl,
			headers: {
				'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onerror: function(responseDetails){
				GM_setValue("UseCache", false)
			},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
				regMatch = text.match(/\[SHOW\].*?01x01.*?\[\/SHOW\]/g)
				t=0
				country = responseDetails.finalUrl.replace(/.*(.).$/,"$1")
				if (country=="h"){country="U"}
				if (regMatch!=null){
					while (regMatch[t]!=null){
						regMatch[t] = regMatch[t].replace(/\[SHOW\](.*?)\[\/SHOW\]/, "$1")
						station = regMatch[t].replace(/(.*?)\^.*/, "$1")
						station = station.replace(" Channel"," Ch.")
						station = station.replace(" Network"," Net.")
						station = station.replace("Destination America","Dest. Amer.")
						station = station.replace("National Geographic","NatGeo")
						station = station.replace("ReelzChannel","Reelz")
						station = station.replace("SportsNet New York","SportsNet NY")
						station = station.replace("Investigation Discovery","Inv. Disc.")
						station = station.replace("BBC Red Button 1","BBC RedBtn1")
						station = station.replace("Comedy Central","Com. Central")
						sName = regMatch[t].replace(/.*?\^(.*?)\^.*/, "$1")
						sLink = regMatch[t].replace(/.*\^(.*?)/, "$1")
						if (sLink.match(/shows.id-/)){
							sLink = sLink.replace(/.*(id-.*?)$/, "$1")
						}
						else {
							sLink = sLink.replace(/.*tvrage.com.(.*?)$/, "$1")
						}
						regMatch[t] = country + ";;" + sName + ";;" + sLink + ";;" + station
						// if (GM_getValue("tvRage", "null") == "null" || GM_getValue("tvRage") == ""){
							// GM_setValue("tvRage", country + ";;" + sName + ";;" + sLink + ";;" + station)
						// }
						// else if (!GM_getValue("tvRage").match(country.substring(0,1) + ";;" + sName)){
							// GM_setValue("tvRage", GM_getValue("tvRage") + "~~" + country + ";;" + sName + ";;" + sLink + ";;" + station)
						// }
						t = t+1
					}
					if (GM_getValue('tvRage',"")==""){txtAdd = ""}
					else {txtAdd = "~~" + GM_getValue('tvRage')}
					GM_setValue("tvRage", regMatch.join('~~') + txtAdd)
				}
				rageCount = rageCount + 1
				if (rageCount==4){
					keys = new Array
					keys = GM_getValue("tvRage").split("~~")
					rageCount = 0
					MoreData(0)
				}
			}
		});
	}
	if (b<3){Upcoming(b+1)}
}

//check that all the data for tvRage got collected
function tvRageChecker(){
	keys = GM_getValue("tvRage").split("~~")
	for (t=0; t<keys.length; t++){
		if (!keys[t].match(/;;.$/)){
			rageCount = t
			MoreData(t)
			t=-1
			break
		}
	}
	if (t>-1){SendData()}
}

//Gathers more info about each show (i.e. it's classification, and start date)
function MoreData(t){
	fart = false
	if (!keys[t].match(/;;.$/)){
		sLink = keys[t].replace(/.*?;;.*?;;(.*?);;.*/, "$1")
		if (sLink.match(/^id-/)){
			sLink = sLink.replace(/id-(.*)/, "http://services.tvrage.com/tools/quickinfo.php?sid=$1")
		}
		else {
			sLink = sLink.replace(/^/, "http://services.tvrage.com/tools/quickinfo.php?show=")
		}
		GM_xmlhttpRequest({
			method: 'GET',
			url: sLink,
			headers: {
				'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onerror: function(responseDetails){
				GM_setValue("UseCache", false)
			},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
				if(text.match(/Classification@Animation/)){sClass = 'A'}
				else if(text.match(/Classification@Award Show/)){sClass = 'W'}
				else if(text.match(/Classification@Documentary/)){sClass = 'D'}
				else if(text.match(/Classification@Game Show/)){sClass = 'G'}
				else if(text.match(/Classification@Mini-Series/)){sClass = 'M'}
				else if(text.match(/Classification@News/)){sClass = 'N'}
				else if(text.match(/Classification@Reality/)){sClass = 'R'}
				else if(text.match(/Classification@Scripted/)){sClass = 'S'}
				else if(text.match(/Classification@Sports/)){sClass = 'P'}
				else if(text.match(/Classification@Talk Shows/)){sClass = "T"}
				else if(text.match(/Classification@Variety/)){sClass = "V"}
				sAirDate = text.match(/Started@(.*)/) + ""
				sAirDate = sAirDate.replace(/Started@(.*?),.*/,"$1")
				keys[t] = keys[t] + ";;" + sAirDate + ";;" + sClass
				GM_setValue("tvRage", keys.join("~~"))
				rageCount = rageCount + 1
				if (rageCount == keys.length-1){ //I have no idea why, but if I don't pause this function, the tvrage cache gets screwed up
					setTimeout(function(){SendData()},1000)
				}
			}
		});
	}
	if (t<keys.length-1){MoreData(t+1)}
}

//This places the Series Premiere cache data onto the page
function SendData(){
	keys = new Array()
	bigKey = new Array()
	tempVar = GM_getValue("tvRage")
	bigKey = tempVar.split("~~")
	removeDups = []
	doSave = false
	$.each(bigKey, function(i, el){ //remove any duplicates found
		if($.inArray(el, removeDups) === -1){
			removeDups.push(el);
			doSave = true
		}
	});
	bigKey = removeDups
	removeDups = ""
	for (t=0; t<bigKey.length; t++){
		keys[t] = bigKey[t].split(";;")
		keys[t][6] = new Date(keys[t][4])
		keys[t][4] = keys[t][6].toDateString()
	}
	//sort by date
	keys.sort(function(a,b){if(a[6] > b[6]) return 1;if(a[6] < b[6]) return -1;})
	t = keys.length
	d = new Date(new Date().setDate(new Date().getDate()-3))
	while (t--){ //remove any items that aired more than 3 days ago
		if (keys[t][6] < d){
			keys.splice(t,1)
			doSave = true
		}
	}
	if ((typeof isRefresh === "undefined" && !isRefresh) || doSave){ //save the cache if dups or old info were found
		var myString = ""
		for (t=0; t<keys.length; t++){
			myString = keys[t][0] + ";;" + keys[t][1] + ";;" + keys[t][2] + ";;" + keys[t][3] + ";;" + myMonth[keys[t][6].getMonth()] + "/" + keys[t][6].getDate() + "/" + keys[t][6].getFullYear() + ";;" + keys[t][5] + "~~" + myString
		}
		GM_setValue("tvRage", myString.replace(/~~$/, ""))
	}
	//end of data purge.  Now we filter based on classification, and post the data to the page.
	for (t=0; t<keys.length; t++){
		if (keys[t][2].match(/^id-/)){
			keys[t][2] = keys[t][2].replace(/^/, "http://www.tvrage.com/shows/")
		}
		else {
			keys[t][2] = keys[t][2].replace(/^/, "http://www.tvrage.com/")
		}
		if (classFliter.match(keys[t][5]) && !GM_getValue("chFilter").match(";" + keys[t][3] + ";")){
			if (keys[t][0]=='G'){keys[t][0]="UK"}
			else if (keys[t][0]=='U'){keys[t][0]="US"}
			else if (keys[t][0]=='C'){keys[t][0]="CA"}
			else if (keys[t][0]=='A'){keys[t][0]="AU"}
			if (keys[t][5]=="A"){keys[t][5]="Anim.";keys[t][6]="Animated"}
			else if (keys[t][5]=="W"){keys[t][5]="Award";keys[t][6]='Award Show'}
			else if (keys[t][5]=="D"){keys[t][5]="Docu.";keys[t][6]='Documentary'}
			else if (keys[t][5]=="G"){keys[t][5]="Game";keys[t][6]='Game Show'}
			else if (keys[t][5]=="M"){keys[t][5]="Mini";keys[t][6]='Mini-Series'}
			else if (keys[t][5]=="N"){keys[t][5]="News";keys[t][6]='News'}
			else if (keys[t][5]=="R"){keys[t][5]="Real";keys[t][6]='Reality'}
			else if (keys[t][5]=="S"){keys[t][5]="Scrip";keys[t][6]='Scripted'}
			else if (keys[t][5]=="P"){keys[t][5]="Sport";keys[t][6]='Sports'}
			else if (keys[t][5]=="T"){keys[t][5]="Talk";keys[t][6]='Talk Show'}
			else if (keys[t][5]=="V"){keys[t][5]="Var.";keys[t][6]='Variety'}
			premDate = document.createElement('td');
			premShow = document.createElement('td');
			premStation = document.createElement('td');
			moreInfo = document.createElement('td');
			premCountry = document.createElement('td');
			premClass = document.createElement('td');
			premDate.setAttribute('style', 'padding:2px')
			premShow.setAttribute('style', 'padding:2px')
			premStation.setAttribute('style', 'padding:2px;cursor:pointer')
			moreInfo.setAttribute('style', 'padding:2px')
			premCountry.setAttribute('style', 'padding:2px')
			premClass.setAttribute('style', 'padding:2px')
			premCountry.setAttribute('nowrap', true)
			premClass.setAttribute('nowrap', true)
			premDate.setAttribute('nowrap', true)
			premStation.setAttribute('nowrap', true)
			premStation.setAttribute('title', "Block all shows from " + keys[t][3])
			moreInfo.setAttribute('nowrap', true)
			premShow.innerHTML = '<a id="' + keys[t][1] + '" style="cursor:pointer" title="Search on MyEpisodes">' + keys[t][1] + '</a>'
			premStation.innerHTML = '<a class="' + keys[t][3].replace(/[^0-9a-zA-Z]+/gm,"") + '" style="color:black;text-decoration: none">' + keys[t][3] + '</a>'
			premStation.setAttribute('class','channel')
			premDate.setAttribute('class', "premDate")
			premShow.setAttribute('class', "premShow")
			moreInfo.setAttribute('class', "moreInfo")
			premCountry.innerHTML = keys[t][0]
			premDate.innerHTML = keys[t][4].replace(/....(.*) .*/,"$1")
			premDate.setAttribute('title',keys[t][4].replace(/....(.*)/,"$1"))
			premClass.innerHTML = keys[t][5]
			premClass.setAttribute('title', keys[t][6])
			moreInfo.innerHTML = '<a title="More Information about the show" href="' + keys[t][2] + '" target="_blank"><font size=1>TVRage</font></a>'
			newLine = document.createElement('tr');
			newLine.setAttribute('class',"tvRageItem")
			newLine.appendChild(premDate)
			newLine.appendChild(premCountry)
			newLine.appendChild(premShow)
			newLine.appendChild(premClass)
			newLine.appendChild(premStation)
			newLine.appendChild(moreInfo)
			$('#tvRageList').append(newLine)
		}
	}
	$('#tvRageList').show()
	$('.channel').click(function(){
		if ($(this).attr('class') === 'channel'){blockChannel($(this).find(">:first-child").attr('class'))}
		else{blockChannel($(this).attr('class'))}
	})
	$('.channel').hover(function(){
		if ($(this).attr('class') === 'channel'){
			$(this).css('color', 'red')
			$(this).css('text-decoration','line-through')}
		else {$(this).parent().css('color', 'red')
			$(this).parent().css('text-decoration','line-through')}
	}, function(){
		if ($(this).attr('class') === 'channel'){
			$(this).css('color', 'black')
			$(this).css('text-decoration','none')}
		else{$(this).parent().css('color', 'black')
			$(this).parent().css('text-decoration','none')}
	})
	$('.premShow').find(">:first-child").click(function(){
		GM_setValue("searchBuddy",$(this).attr('id') + ";;" + '0')
		$('#r').attr('id','q')
		$('#q').val($(this).attr('id'))
		$('#q').parent().submit()
		$('#q').attr('value', '')
	})
	$('.tvRageItem').hover(function(){
		$(this).css('background-color', '#F5F5F5')
	}, function(){
		$(this).css('background-color', '')
	})
	$('#tvRageList').hide()
	$('#tvRageCount').html(" (<b>" + $('.channel').length + "</b>)")
	$('#tvRageHeader').click(function(){
		toggleTvRage()
	})
	GM_setValue("UseCache", true)
}

//allows user to block unwanted tv channels from the tvrage series premiere list
function blockChannel(station){
	if (confirm("Are you sure you want to block all shows from " + $('.' + station + ':eq(0)').text() + "?")==true){
		GM_setValue("chFilter", GM_getValue("chFilter", "") + ";" + $('.' + station + ':eq(0)').text() + ";")
		$('.' + station).parent().parent().hide('slow')
		$('#tvRageCount').html(function(index, oldhtml){
			ct = oldhtml.replace(/.*?>(.*?)<.*/,"$1")
			ct = ct - $('.' + station).length
			$(this).html(" (<b>" + ct + "</b>)")
		})
	}
}

