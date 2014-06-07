// ==UserScript==
// @name          AIM Link
// @namespace     d2jsp
// @description   Puts aim link
// @include       http://forums.d2jsp.org/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==
/**************************************
** COPYRIGHT NUMONE@D2jsp.org ******
**************************************/
//globals
var VERSION = 1.00;
var CACHE_TIME = 1000 * 60 * 10; //1000 to convert to seconds, 60 to convert to min, 10 for 10 minutes

// var CACHE_TIME = 1;


var HEADER_URL = 'http://dedie.nsnf-clan.net/PokerStatus/aim_list.txt';

var PAGE_TYPE = window.location.href.match(/\/topic\.php/) ? 'thread'
	: window.location.href.match(/\/pm\.php\?c\=3/) ? 'pm'
	: window.location.href.match(/\/user\.php/) ? 'user'
	: window.location.href.match(/\/settings\.php/) ? 'settings'
	: 'UNKNOWN';
var LIST = {}; // holds the list of everything

var sAimUid = [];
var sAimArray = [];
// universal fieldset



function showStatus(nameList,nameHolders){
	// console.log('nameList = ' + nameList + ' @ nameHolders = ' + nameHolders);
	for(var i=0;i<nameList.length;i++){

		var resultsArray = [];
		var results = {rank:-1};
		// console.log("Size: " + sAimUid.length);
		for(var j=0;j<sAimUid.length;j++){
			var current = sAimUid[j];
			// console.log(sAimUid[j]  + " @ " + nameList[i]);
			if (sAimUid[j] == nameList[i])
			{
				// console.log();
				var appendStr = '<div class="aimstatus">Aim: <a href="aim:GoIm?screenname=' + sAimArray[j] + '"><span style="font-weight: bold;font-size: 7pt; font-family: Verdana;color:orangered;">' + sAimArray[j] + '</a></div>';
				$(nameHolders[i]).append(appendStr);
			}

		}

	}
};









function parsePage(){
	// console.log("Size: " + sAimUid.length);
	var names = [],nameHolders = [];
	switch(PAGE_TYPE){
		case 'thread':
			$('BODY DIV.tbb FORM[name="REPLIER"] DL').has('TABLE.ftb').find('DT A[href^="user.php"]').each(function(){
				var test = $(this).attr('href');
				var splitedstring = test.split('=');
				
				// console.log(splitedstring[1]);
				names.push(splitedstring[1]);
				
			});
			$('BODY DIV.tbb FORM[name="REPLIER"] DL DD TABLE.ftb TBODY TR TD.bc1').each(function(){
				nameHolders.push(this);
			});
			break;
		case 'pm':
			$('BODY FORM[name="a"] TABLE:eq(0) TR TD DL DT A[href^="user.php"]').each(function(){
				
				var test = $(this).attr('href');
				var splitedstring = test.split('=');
				
				
				names.push(splitedstring[1]);
			});
			$('BODY FORM[name="a"] TABLE:eq(0) TR TD DL DD TABLE TD.bc1').each(function(){
				nameHolders.push(this);
			});
			break;
		case 'user':
			$('BODY TABLE TR DL DD TABLE.ftbt TR.bts > TD B A').each(function(){
				var test = $(this).attr('href');
				var splitedstring = test.split('=');
				
				// console.log(splitedstring[1]);
				names.push(splitedstring[1]);
			});
			$('BODY TABLE TR TD DL DD UL.bc1').each(function(){
				var list = document.createElement('LI');
				this.appendChild(list);
				nameHolders.push(list);
			});
			break;
		case 'settings':
			//showPreferencesLink(); //Poker shouldn't need any of these
			break;
	}

	if(names.length > 0 && nameHolders.length > 0){
		showStatus(names,nameHolders);
	}

	
	
};





function parseNames(sequence,responseText){
	var userStatus;
	responseText = responseText.replace(/\r\n|\r|\n/gi,'#EL##SL#');
	var split = responseText.split('#EL##SL#');
	for(var i=0;i<split.length;i++){
		var temp = split[i];
		
			// var sAimUid = [];
			// var sAimArray = [];
			// var iAimCount = 0;
		var uid = temp.trim();
		var splitedstring = uid.split('|');
		
		// if(temp.match(/###[a-zA-Z0-9\s]+###/)){
		// console.log("Size " + splitedstring.length);
		if (splitedstring.length == 2)
		{
			sAimUid.push(splitedstring[0].trim());
			sAimArray.push(splitedstring[1].trim());
			

		}
			// userStatus = temp.replace(/#/g,'').trim();
		// }else if(temp.length > 0){
			// if(temp.match(/[^\s]\s+\/\/[0-9]+/)){
				// var temp2 = temp.split(/\s+\/\//);
					// LIST.sports[sequence].names[temp2[0].replace(/\/\//g,'').trim().toUpperCase()] = {status:userStatus,id:temp2[1].trim()};
				// if(userStatus == 'Mediator'){
					// LIST.sports[sequence].medList.push({name: temp2[0].replace(/\/\//g,'').trim(), id: temp2[1].trim()});
				// }
			// }else{
				
				// LIST.sports[sequence].names[temp.trim().toUpperCase()] = {status:userStatus};
				// if(userStatus == 'Mediator'){
					// LIST.sports[sequence].medList.push({name: temp.trim()});
				// }
			// }
		// }
	}
	parsePage();
};



function retrieveCache(){//return false;
	var expTime = GM_getValue('PSListAIMTime');
	// return false; // a retirer
	

	if(!expTime){//first load?
		// console.log("Retrive : false");
		return false;
	}

	var nowTime = new Date().getTime();
	if(nowTime > expTime){ //we've expired
		// console.log("Retrive false");
		return false;
	}
	
	// LIST = JSON.parse(GM_getValue('PSListInfo'));
	// console.log("now: " + nowTime + " Exp: " + expTime);
	// retrieveHeader();
	// retrieveHeader(1);
	parsePage();
	parseNames(0, GM_getValue('PSListAIM'));
	return true;
};

function retrieveHeader(sequence){
	
	// console.log("retriveHeader called");
	
	sAimUid = [];
	sAimUid = [];
	sAimArray = [];


	console.log("Downloading cache" + HEADER_URL);

	GM_xmlhttpRequest({
		method:'GET',
		url:HEADER_URL + '?' + (new Date().getTime()),
		headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
		onload:function(response){
			GM_setValue('PSListAIM',response.responseText);
			// GM_setValue('PSListAIMTime',new Date().getTime());
			GM_setValue('PSListAIMTime',(new Date().getTime() + CACHE_TIME) + '');

			parseNames(sequence,response.responseText);
		},
		onerror:function(err){
			// console.log("Wtf");
			// showErrorMsg('Error retrieving list ' + LIST.sports[sequence].title);
		}
	});
};


retrieveCache() ||  retrieveHeader();