// ==UserScript==
// @name          Bettor Status
// @namespace     d2jsp
// @description   Puts the betting status of the person in their avatar
// @include       http://forums.d2jsp.org/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==
/**************************************
** COPYRIGHT NUMONE@D2jsp.org ******
**************************************/
//globals
var VERSION = 3.03;
var CACHE_TIME = 1000 * 60 * 60; //1000 to convert to seconds, 60 to convert to min, 60 for 60 minutes
var HEADER_URL = 'http://bettor-status-d2jsp.googlecode.com/svn/lists/master.json';
var PAGE_TYPE = window.location.href.match(/\/topic\.php/) ? 'thread'
	: window.location.href.match(/\/pm\.php\?c\=3/) ? 'pm'
	: window.location.href.match(/\/user\.php/) ? 'user'
	: window.location.href.match(/\/settings\.php/) ? 'settings'
	: 'UNKNOWN';
var LIST = {}; // holds the list of everything

// universal fieldset
$('BODY').append('<fieldset style="padding:5px;position:absolute;z-index:100;background-color:#D4E0FF;" id="bsFieldset"><legend style="background-color:#D4E0FF;border:1px solid #B0B0B0;"><span></span><img style="vertical-align:inherit;margin-left:2px;cursor:pointer;" src="images/x.gif" /></legend><div class="main"></div></fieldset>');
$('#bsFieldset LEGEND IMG').click(function(){$('#bsFieldset').hide();});
$('#bsFieldset').hide();


function showPreferencesMenu(){
	$('BODY').css({'overflow':'hidden'});
	$('BODY').append('<div id="Bettor_Status_bkgrnd" style="position:absolute;top:0%;left:0%;width:100%;height:100%;background-color:black;z-index:1001;-moz-opacity:0.6;opacity:.60;filter:alpha(opacity=60)">' +
		'</div><div id="Bettor_Status_forgrnd" style="position:absolute;top:25%;left:25%;width:50%;height:50%;padding:16px;border:5px solid #8FBEFF;background-color:#E4EBFF;z-index:1002;overflow:auto;color:black;"></div>');
	var holder = $('#Bettor_Status_forgrnd');
	$(holder).html('<div style="font-size:12pt;"><span style="font-weight:bold;text-decoration:underline;">Bettor Status Settings:</span><span id="Bettor_Status_close" style="float:right;cursor:pointer;color:blue;text-decoration:underline;">Close</span></div>');
	$('#Bettor_Status_close').click(function(){
		$('#Bettor_Status_bkgrnd').remove();
		$('#Bettor_Status_forgrnd').remove();
		$('BODY').css({'overflow':'auto'});
	});
	
	// display type
	$(holder).append('<span style="font-weight:bold;">Status Display:</span> <input type="radio" name="dispType" value="rolled" />Combined <input type="radio" name="dispType" value="seporated" />Separated');
	$(holder).find('INPUT[name="dispType"][value="' + GM_getValue('BSDispType','rolled') + '"]').prop('checked',true);
	$(holder).find('INPUT[name="dispType"]').click(function(){
		GM_setValue('BSDispType',$(this).prop('value'));
	});
	
	// use list checkboxes
	$(holder).append('<div style="margin-top:15px;font-weight:bold;">Use Status From The Following Sports:</div>');
	for(var i=0;i<LIST.sports.length;i++){
		$(holder).append('<input type="checkbox" name="useSport" value="' + LIST.sports[i].title + '" /> ' + LIST.sports[i].title + '<br />');
		if(!(GM_getValue('BSHideSpt' + LIST.sports[i].title,false))){
			$(holder).find('INPUT[type="checkbox"][value="' + LIST.sports[i].title + '"]').prop('checked',true);
		}
	}
	$(holder).find('INPUT[type="checkbox"][name="useSport"]').click(function(){
		if($(this).prop('checked')){
			GM_setValue('BSHideSpt' + $(this).prop('value'),false);
		}else{
			GM_setValue('BSHideSpt' + $(this).prop('value'),true);
		}
	});
	
	// names last updated
	var timeAgo = Math.round(((new Date().getTime()) - (GM_getValue('BSExpireTime') - CACHE_TIME)) / 60000);
	if(GM_getValue('BSExpireTime') == '0'){
		$(holder).append('<br /><br /><br /><span id="Bettor_Status_refreshSpan">Names List will reload when the page is refreshed (F5)</span>');
	}else{
		$(holder).append('<br /><br /><br /><span id="Bettor_Status_refreshSpan"><span style="font-style:italic;">Names List Last Updated ' + timeAgo + ' minutes ago.</span> <a href="#" id="Bettor_Status_refresh">Reload Now</a></span>');
		$('#Bettor_Status_refresh').click(function(){
			GM_setValue('BSExpireTime','0');
			$('#Bettor_Status_refreshSpan').html('Will now reload when the page is refreshed (F5)');
		});
	}
};

function showPreferencesLink(){
	//$('BODY DIV.bar DIV.barR').append('<a href="#" id="Bettor_Status_pref">Bettor Status Settings</a>');
	$('BODY TABLE DL DD UL.mL').append('<li><a href="#" id="Bettor_Status_pref">Bettor Status Settings</a></li>');
	$('#Bettor_Status_pref').click(function(){
		showPreferencesMenu();
	});
};

function showStatus(nameList,nameHolders){
	for(var i=0;i<nameList.length;i++){
		var resultsArray = [];
		var results = {rank:-1};
		for(var j=0;j<LIST.sports.length;j++){
			var sport = LIST.sports[j];
			if(!(GM_getValue('BSHideSpt' + sport.title,false))){
				if(sport.names[nameList[i].toUpperCase()]){
					resultsArray.push({sport:sport.title,status:sport.names[nameList[i].toUpperCase()].status,id:j});
					if(results.rank < LIST.statusInfo[sport.names[nameList[i].toUpperCase()].status].rank){
						results = {rank:LIST.statusInfo[sport.names[nameList[i].toUpperCase()].status].rank,status:sport.names[nameList[i].toUpperCase()].status};
					}
				}else{
					resultsArray.push({sport:sport.title,status:'Unknown',id:j});
					if(results.rank < 0){
						results = {rank:0,status:'Unknown'};
					}
				}
			}
		}
		if(results.rank > -1){
			if(GM_getValue('BSDispType','rolled') == 'rolled'){
				function createLink(){
					$(nameHolders[i]).append('<div class="sportStatusHolder"><a href="javascript:void(0);">Bettor Status</a>: ' + colorTheStatus(results.status) + '</div>');
					var resArray = resultsArray;
					$(nameHolders[i]).find('DIV.sportStatusHolder:last A').click(function(){
						showMultiSportsInfo(resArray,this);
					});
				}
				createLink();
			}else{
				for(var j=0;j<resultsArray.length;j++){
					function createLinkAll(){
						var appendStr = '<div class="sportStatusHolder"><a href="javascript:void(0);">' + resultsArray[j].sport + '</a>: ' + colorTheStatus(resultsArray[j].status) + '</div>';
						$(nameHolders[i]).append(appendStr);
						var theID = resultsArray[j].id;
						$(nameHolders[i]).find('DIV.sportStatusHolder:last A').click(function(){
							showSingleSportInfo(theID,this);
						});
					}
					createLinkAll();
				}
			}
		}
	}
};

function showSingleSportInfo(id,link){
	var offset = $(link).offset();
	var sportInfo = LIST.sports[id];
	$('#bsFieldset').css({top:offset.top,left:offset.left}).show();
	$('#bsFieldset LEGEND SPAN').html(sportInfo.title + ' Info');
	$('#bsFieldset DIV.main').html('<a href="' + sportInfo.list + '" target="_blank">Link To ' + sportInfo.title + ' List Image</a><br /><br />List Ran By:<br />');
	for(var i=0;i<sportInfo.listRunner.length;i++){
		$('#bsFieldset DIV.main').append('<a href="' + sportInfo.listRunner[i].link + '" target="_blank">'  + sportInfo.listRunner[i].name + '</a><br />');
	}	
};

function showMultiSportsInfo(resultsArray,link){
	var offset = $(link).offset();
	$('#bsFieldset').css({top:offset.top,left:offset.left}).show();
	$('#bsFieldset LEGEND SPAN').html('Bettor Status Info');
	$('#bsFieldset DIV.main').html('');
	for(var i=0;i<resultsArray.length;i++){
		var t = resultsArray[i];
		$('#bsFieldset DIV.main').append('<div><a title="links to ' + t.sport + ' list" href="' + LIST.sports[t.id].list + '" target="_blank">' + t.sport + '</a>: ' + colorTheStatus(t.status) + ' <span style="font-size:7pt;">Ran By: </span></div>');
		for(var j=0;j<LIST.sports[t.id].listRunner.length;j++){
			var o = LIST.sports[t.id].listRunner[j];
			$('#bsFieldset DIV.main DIV:last SPAN:last').append(' <a href="' + o.link + '" target="_blank">' + o.name + '</a>');
		}
	}
};

function colorTheStatus(status){
	if(LIST.statusInfo[status]){
		return '<span style="color:' + LIST.statusInfo[status].color + ';font-weight:bold;">' + status + '</span>';
	}else{
		return '<span style="color:gray;font-weight:bold;">' + status + '</span>';
	}
};

function showMedList(){
	var forumID = parseInt(window.location.href.split('&f=')[1]);
	var theSport = false;
	for(var i=0;i<LIST.sports.length;i++){
		if(LIST.sports[i].medForumIDs){
			var medList = LIST.sports[i].medForumIDs;
			for(var j=0;j<medList.length;j++){
				if(medList[j] == forumID){
					theSport = LIST.sports[i];
					break;
				}
			}
		}
	}
	
	if(!theSport || theSport.medList.length == 0){
		return;
	}
	
	$('BODY DIV.tbb DIV.links B').append('<a id="BSMedListLink" href="javascript:void(0);">Bettor Med List</a>');
	$('#BSMedListLink').click(function(){
		showMediators(theSport,this);
	});
};

function showMediators(sportObj,link){
	var offset = $(link).offset();
	$('#bsFieldset').css({top:offset.top,left:offset.left}).show();
	$('#bsFieldset LEGEND SPAN').html('Bettor Med List');
	$('#bsFieldset DIV.main').html('');
	for(var i=0;i<sportObj.medList.length;i++){
		if(sportObj.medList[i].id){
			$('#bsFieldset DIV.main').append('<span style="font-weight:bold;">' + sportObj.medList[i].name + '</span> ( <a href="http://forums.d2jsp.org/user.php?i=' + sportObj.medList[i].id + '" target="_blank">http://forums.d2jsp.org/user.php?i=' + sportObj.medList[i].id + '</a> )<br />');
		}else{
			$('#bsFieldset DIV.main').append('<span style="font-weight:bold;">' + sportObj.medList[i].name + '</span><br />');
		}
	}
};

function parsePage(){
	var names = [],nameHolders = [];
	switch(PAGE_TYPE){
		case 'thread':
			$('BODY DIV.tbb FORM[name="REPLIER"] DL DT A[href^="user.php"]').each(function(){
				names.push($(this).text());
			});
			$('BODY DIV.tbb FORM[name="REPLIER"] DL DD DIV.pud').each(function(){
				nameHolders.push(this);
			});
			break;
		case 'pm':
			$('BODY FORM[name="a"] DL.c DT A[href^="user.php"]').each(function(){
				names.push($(this).text());
			});
			$('BODY FORM[name="a"] DL.c DD DIV.pud').each(function(){
				nameHolders.push(this);
			});
			break;
		case 'user':
			$('BODY TABLE TR TD DL DT A[href="#"]').each(function(){
				names.push($(this).text());
			});
			$('BODY TABLE TR TD DL DD UL.bc1').each(function(){
				var list = document.createElement('LI');
				this.appendChild(list);
				nameHolders.push(list);
			});
			break;
		case 'settings':
			showPreferencesLink();
			break;
	}

	if(names.length > 0 && nameHolders.length > 0){
		showStatus(names,nameHolders);
	}
	
	if(PAGE_TYPE == 'thread'){
		showMedList();
	}
	
	showFlushLink();
};

function showFlushLink(){
	var timeAgo = Math.round(((new Date().getTime()) - (localStorage['BSExpireTime'] - CACHE_TIME)) / 60000);
	$('BODY DIV.crt.links').append(' | Bettor Status version: ' + VERSION.toFixed(2) + ', <span id="BSBottomSpan">cached for ' + timeAgo + ' minutes <a href="javascript:void(0);" id="BSBottomFlush">flush</a></span>');
	$('#BSBottomFlush').click(function(){
		GM_setValue('BSExpireTime','0');
		$('#BSBottomSpan').html('Will now reload when the page is refreshed (F5)');
	});
};

function gatherSport(sequence){
	if(sequence + 1 > LIST.sports.length){
		//save to cache
		GM_setValue('BSExpireTime',(new Date().getTime() + CACHE_TIME) + '');
		GM_setValue('BSListInfo',JSON.stringify(LIST));
		
		parsePage();
		return;
	}
	LIST.sports[sequence].names = {};
	LIST.sports[sequence].medList = [];
	
	GM_xmlhttpRequest({
		method:'GET',
		url:LIST.sports[sequence].namesURL + '?' + (new Date().getTime()),
		headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
		onload:function(response){
			parseNames(sequence,response.responseText);
			gatherSport(sequence + 1);
		},
		onerror:function(err){
			showErrorMsg('Error retrieving list ' + LIST.sports[sequence].title);
		}
	});
};

function parseNames(sequence,responseText){
	var userStatus;
	responseText = responseText.replace(/\r\n|\r|\n/gi,'#EL##SL#');
	var split = responseText.split('#EL##SL#');
	for(var i=0;i<split.length;i++){
		var temp = split[i];
		if(temp.match(/###[a-zA-Z0-9\s]+###/)){
			//console.log('Title: ' + temp.replace(/#/g,'').trim());
			userStatus = temp.replace(/#/g,'').trim();
		}else if(temp.length > 0){
			if(temp.match(/[^\s]\s+\/\/[0-9]+/)){
				var temp2 = temp.split(/\s+\/\//);
				//console.log('Name: ' + temp2[0].replace(/\/\//g,'').trim() + ' with number: ' + temp2[1].trim());
				LIST.sports[sequence].names[temp2[0].replace(/\/\//g,'').trim().toUpperCase()] = {status:userStatus,id:temp2[1].trim()};
				if(userStatus == 'Mediator'){
					LIST.sports[sequence].medList.push({name: temp2[0].replace(/\/\//g,'').trim(), id: temp2[1].trim()});
				}
			}else{
				//console.log('Name: ' + temp.trim() + ' length: ' + temp.trim().length);
				LIST.sports[sequence].names[temp.trim().toUpperCase()] = {status:userStatus};
				if(userStatus == 'Mediator'){
					LIST.sports[sequence].medList.push({name: temp.trim()});
				}
			}
		}else{
			//console.log('seporator');
			// empty line (hopefully)
		}
	}
};

function showErrorMsg(msg){
	var div = document.createElement('DIV');
	$(div).css({
		position:'absolute',
		backgroundColor:'yellow',
		width:'50%',
		padding:'5px',
		top:'95px',
		textAlign:'center',
		left:'25%',
		fontWeight:'bold'
	}).html('Bettor Status Message: ' + msg);
	document.body.appendChild(div);
};

function retrieveCache(){//return false;
	var expTime = GM_getValue('BSExpireTime');
	if(!expTime){//first load?
		return false;
	}
	var nowTime = new Date().getTime();
	if(nowTime > expTime){ //we've expired
		return false;
	}
	
	LIST = JSON.parse(GM_getValue('BSListInfo'));
	parsePage();
	return true;
};

function retrieveHeader(){
	GM_xmlhttpRequest({
		method:'GET',
		url:HEADER_URL + '?' + (new Date().getTime()),
		headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
		onload:function(response){
			LIST = JSON.parse(response.responseText);
			if(LIST.version != VERSION){
				showErrorMsg('Your bettor status script is out of date, <a href="http://userscripts.org/scripts/show/50720" target="_blank">Click Here</a> to upgrade!');
			}
			gatherSport(0);
		},
		onerror:function(err){
			showErrorMsg('Error retrieving list header. Will used cached lists if available.');
			if(GM_getValue('BSListInfo')){// we have old lists, we will use that for now
				LIST = JSON.parse(GM_getValue('BSListInfo'));
				parsePage();
			}
		}
	});
};


retrieveCache() || retrieveHeader();