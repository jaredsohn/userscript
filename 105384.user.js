// ==UserScript==
// @name           kakku man's plugin v2
// @namespace     kmp
// @description    Adds stuff and such.
// @include        http://kdice.com/*
// @include        http://www.kdice.com/*
// @include        http://gpokr.com/*
// @include        http://www.gpokr.com/*
// @include        http://xsketch.com/*
// @include        http://www.xsketch.com/*
// @version        0.2.02
// @require         http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require         http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @require         https://www.google.com/jsapi
// @grant           none
// ==/UserScript==

    console.log('...plugin starts');

kmp = {};
kmp.VERSION = "0.2.02";

////############> init functions <##############

kmp.OtherInit = function () {
    console.log('OtherInit...  href='+window.location.href);
    
	kmp.pnlinks = "";
	kmp.statTable;
	kmp.playerstat;
   	kmp.userDiceCounter = [0,0,0,0,0,0];
   
    if(GMO_getValue("kmp_minTheme") == true){     kmp.themeStyler();      }

    if(window.location.href.indexOf("monthStats") != -1){
        console.log('.monthStats');
		kmp.pnlinks = $('#mainpage td:first-child div:first-child div:first-child').html().replace('Month Archives','</br>Month Archives</br>');	
		playerstat= false;
		kmp.statTable = $('.wide.stats');
		kmp.forumChanges();
		kmp.tableChanges(false);
        kmp.checkmembers(".stats .notcurrent");
	} else if(window.location.href.indexOf("stats") != -1 && window.location.href.indexOf("profile") != -1 ){
        console.log('.profile .stats');
		playerstat = true; 
		kmp.statTable = $('.section:last .wide.stats');
		kmp.forumChanges();
		kmp.tableChanges(true);
	
		if(window.location.href.indexOf("kdice.com") != -1) {	//todo: this?
         	kmp.showHistory();
			kmp.profileNR = window.location.href.split("/")[4];
			var d=new Date();       var year = d.getYear();     var month = d.getMonth()+1;
			if(localStorage.getItem("kmp_"+kmp.profileNR+"_y"+year+"_m"+month) != undefined){
			//	console.log("ttteststorage = undefined: "+localStorage.getItem("kmp_"+profileNR+"_y"+year+"_m"+month) )
				var ppm = kmp.getPPM(); //todo
				//var ppmtd = $(".statLine tr:first-child").append('<td>PPM <div class="lrgStat" id="ppmSTAT">'+ppm+'</div>	</td>');
		
				$("#profile").append('<div id="kmp_GameHistory" style="border-bottom: 1px solid #888888;	padding-bottom: 50px;"><h3><span>Game History Charts</span><div class="line">&nbsp;</div></h3></div>');
				kmp.addGHchartSection('kmp_GameHistory', true); //todo
				kmp.kmp.updateGameHist(); //todo
			}
        }	
	
    } else if(window.location.href.indexOf("leaderboardAll") != -1){
        console.log('.leaderboardAll');
		$('h3:first-child').hide();

		kmp.pnlinks = $(".pages").html().replace('Higer','Higher<br>').replace('Lower','<br>Lower');
		
		playerstat= false;
		kmp.statTable = $('.wide.stats');
		kmp.forumChanges();
		kmp.tableChanges(false);
        kmp.checkmembers(".stats .notcurrent");
	} else if(window.location.href.indexOf("leaderboard") != -1 || window.location.href.indexOf("careerStat") != -1){
        console.log('.leaderboard / careerStat');
		kmp.forumChanges();
        kmp.checkmembers(".statslist .notcurrent");
        
	} else if(window.location.href.indexOf("rules") != -1){
        console.log('.rules');
		$('#iogc-regularMenu:last').appendTo('#hd')
        kmp.forumChanges();
	}else  if(window.location.href.indexOf("com/#") == -1){	//all other pages but game
        console.log(".other  href="+window.location.href);
		if ($(".pages").length !== 0) {			kmp.pnlinks = $(".pages").html().replace('Newer','Newer<br>').replace('Older','<br>Older').replace('Previous','Previous<br>').replace('Next','<br>Next');   }

		$('.body').each(function (ind){
			$(this).html(kmp.replaceURLWithHTMLLinks($(this).html() ) )
			$(this).html(	$(this).html().replace( /amp;/gi, "" ));
		});
		kmp.forumChanges();
		
		if ( $('.current:eq(0)').text() == 'Overview' ){//forum overview: add numbered links to pages each topic
		
			$('.list-item ').each(function(){
				var ta = $(this).text().split(' ');
				var ii = Math.floor( parseFloat( ta[ta.indexOf('comments')-1] )/10 );
				for(p=(ii); p>0; p--){
					$(this).find('.footer').append('<a style="float:right;" href="'+$(this).find('.title2 a').attr('href')+'?page='+(p+1)+'" >	&ensp;'+(p+1)+' </a>')
				}
				$(this).find('.footer').append('<a style="float:right;" href="'+$(this).find('.title2 a').attr('href')+'" >'+(p+1)+' </a>')
			});
		}else if(window.location.href.indexOf("discussion") != -1 && window.location.href.indexOf("topics") == -1)  {	
			$('.list-item ').each(function(){
				var ta = $(this).find('td:last').text();
				var ii = Math.floor( parseFloat( ta )/10 );
				$(this).append('<td style="max-width:100px;"></td>');
				$(this).find('td:last').append('<a style=" font-size:10;" href="'+$(this).find('td:eq(1) a').attr('href')+'" >'+(1)+' </a>')
				for(p=1; p<=ii; p++){
					$(this).find('td:last').append('<a style=" font-size:10;" href="'+$(this).find('td:eq(1) a').attr('href')+'?page='+(p+1)+'" >	&ensp;'+(p+1)+' </a>')
				}
			});
		}
		
	}

};   

kmp.checkUD = function(){   //check for updates:   
	var now = new Date().getTime();
    if (GMO_getValue("kmp_plugin") && now > GMO_getValue("kmp_plugin")+172800000 ) { //bi-daily
        $.get("http://kdice.com/profile/45032677", function(data){ 		kmp.checkUD2(data); 		});
    }
};
kmp.checkUD2 = function(dat){    //check for version number for update.
	answer = $(dat).find('.tagline').text().split(">")
	var ver = answer[answer.indexOf('kmp')+1];
	
	if(kmp.VERSION != ver){
		if(confirm("version "+ ver +" of kakku man's Plugin is available!\nDo you want to upgrade now?"))	window.location = "http://userscripts.org/scripts/source/105384.user.js";
	}
    var now = new Date().getTime();
    GMO_setValue("kmp_plugin", now);
	console.log("checked for update=="+ver+" =? "+kmp.VERSION);
};

kmp.sketchGameInit= function(){
    console.log('game sketchGameInit...');
	if (GMO_getValue("kmp_minTheme") == true)  	kmp.themeStyler();
    kmp.addPanel();
    kmp.timedCheck = window.setInterval(function(){    
        kmp.checkChatUrls();    //check chatbox for links:
    },1000);
	if (GMO_getValue("kmp_minTheme") == true)		$('input[name="minTheme"]').attr('checked', true);
};
kmp.gpokrGameInit= function(){
    console.log('game gpokrGameInit...');
	if (GMO_getValue("kmp_minTheme") == true)  	kmp.themeStyler();
    kmp.addPanel();
    kmp.colCards();
	if (GMO_getValue("kmp_colorCards") == "true")	$('input[name="colorCards"]').attr('checked', true);
	if (GMO_getValue("kmp_minTheme") == true)		$('input[name="minTheme"]').attr('checked', true);
};

kmp.kdiceGameInit = function(){
    console.log('game kdiceGameInit...');

   	if( kmp.gchartsReady == false )     {     //todo: change this cause could break whole thing.
    	window.setTimeout(kmp.kdiceGameInit, 1000); 
    	console.log('gchartsReady check fail...');	
		return;
	}

    if(GMO_getValue("kmp_minTheme") == true){     kmp.themeStyler();	}

    if( $('.iogc-LoginPanel-nameHeading').text().length>0) { //check if logged in
		kmp.addPanel();
		//kmp.addSettings();
		$('#kmpMinTheme').prop('checked', (GMO_getValue("kmp_minTheme")) );	
		
		kmp.timedCheck = window.setInterval(function(){    //todo: do this in same loop as luckcahrts?
            kmp.checkChatUrls();    //check chatbox for links:
        },1000);
	}

	if(GMO_getValue("kmp_luckSwitch") == true){ 		kmp.startLucking();		}    
};
kmp.startLucking = function(){
    console.log("..luck chart setup");
 	kmp.user = $('.iogc-LoginPanel-nameHeading').text();
    kmp.profileNR = $("#profileLink").html().split("/")[2].split('"')[0];
	
    console.log("gameInit name:"+$('.iogc-LoginPanel-nameHeading').text()+" profileNR:"+kmp.profileNR);
	
	kmp.rollStats = [		// set prediction percentages:
	/* def/att   2         3         4         5         6         7         8
        1  83.79630  97.29938  99.72994  99.98500  99.99964 100.00000 100.00000
        2  44.36728  77.85494  93.92361  98.79401  99.82169  99.98013  99.99834
        3  15.20062  45.35751  74.28305  90.93471  97.52998  99.46634  99.90692
        4   3.58796  19.17010  45.95282  71.80784  88.39535  96.15359  98.95340
        5   0.61050   6.07127  22.04424  46.36536  69.96164  86.23765  94.77315	
        6   0.07662   1.48786   8.34228  24.24491  46.67306  68.51650  84.38738
        7   0.00709   0.28900   2.54497  10.36260  25.99838  46.91392  67.34556
        8   0.00047   0.04519   0.63795   3.67419  12.15070  27.43755  47.10907															*/
	   
		[83.79630, 44.36728, 15.20062, 3.58796, 0.61050, 0.07662, 0.00709, 0.00047],        //2
		[97.29938, 77.85494, 45.35751, 19.17010, 6.07127, 1.48786, 0.28900, 0.04519],       //3
		[99.72994, 93.92361, 74.28305, 45.95282, 22.04424, 8.34228, 2.54497, 0.63795],      //4
		[99.98500, 98.79401, 90.93471, 71.80784, 46.36536, 24.24491, 10.36260, 3.67419],    //5
		[99.99964, 99.82169, 97.52998, 88.39535, 69.96164, 46.67306, 25.99838, 12.15070],   //6
		[100.0000, 99.98013, 99.46634, 96.15359, 86.23765, 68.51650, 46.91392, 27.43755],   //7	
		[100.0000, 99.99834, 99.90692, 98.95340, 94.77315, 84.38738, 67.34556, 47.10907],	//8
	];

//// setup main chart panel:
	if(GMO_getValue("kmp_pos1top") != undefined) {
		$('body').append('<div id="kmp_BasePanel" style="z-index:11; position:fixed; top:'+GMO_getValue("kmp_pos1top")+'; left:'+GMO_getValue("kmp_pos1left")+'; width:auto; height:auto; background-color:#f0f0f4; border-top: 1px solid #888888; 	text-align:center; font-size:11px; padding:5px; "><div id="kmp_drag1" style="margin-bottom:5px; font-size:9px;">Draggable Area</div></div>');
	}else{
		$('body').append('<div id="kmp_BasePanel" style="z-index:11; position:fixed; top:89px; left:1230px; width:auto; height:auto; background-color:#f0f0f4; border-top: 1px solid #888888; 	text-align:center; font-size:11px; padding:5px; "><div id="kmp_drag1" style="border-bottom: 1px solid #AAAAAA; margin-bottom:5px; font-size:9px;">Luck Charts</div></div>');
	}
	$('#kmp_drag1').mousedown(function(event){ kmp.mdowner(event, $('#kmp_BasePanel') )});
	$('#kmp_drag1').mouseover(function(){ $('#kmp_drag1').css("cursor","move")});

	$('#kmp_BasePanel').append('<div id="baseChart1" style="border-top: 1px solid #AAAAAA; margin-bottom:5px;"></div>');
	//$('#kmp_BasePanel').append('<div><form id="b1option"> ryan:<input type="radio" name="scale1" id="allNotUser" value="1" /> real:<input type="radio" name="scale1" id="userNotAll" value="2" /></form></div>');
	$('#kmp_BasePanel').append('<div id="baseChart2" style="border-top: 1px solid #AAAAAA; margin-bottom:5px;"">');
	//$("#baseC2option").click( kmp.newScale1);
	//$("#allNotUser").prop('checked', true);		
	$('#kmp_BasePanel').append('<div id="baseChart3" style="border-top: 1px solid #AAAAAA; margin-bottom:5px;"></div>');
//todo kmp.newScale1();

	kmp.clearDataArrays();	//	setup empty arrays to hold data.
	kmp.setupCharts(); 		// setup charts
/*
        // some CSS-styling:
        $("<style type='text/css'>\
		#kmp_LeftExtra {	font-size: 9px; position: absolute; top: 89px; left: 10px; width: 200px; height: auto; border-style: solid; border-width: 1px; border-color: #888888; padding: 5px; background-color: #f0f0f4; z-index: 1001; color: #000000; 	}\
		#kmp_LeftExtra img { 	border-top: 1px solid #888888; padding-bottom: 5px;	}\
		#kmp_BasePanel img { 	border-top: 1px solid #888888; padding-bottom: 5px;	 }\
	</style>").appendTo("head");

	if(GMO_getValue("extendToggle")){   //extended:
		$('#extraMode').prop('checked', true);
		kmp.addExtend();
	}*/

	kmp.speed = 1000;//(GMO_getValue("kmp_speed")!=undefined) ? GMO_getValue("kmp_speed") : 1000;
	
	if ($(".iogc-GameWindow-status").text().indexOf("running") !=-1 && kmp.checkSeated() )	{ //refresh when seated and game is running
		kmp.gameStatus = "corrupt";	// NB even after refresh while playing
		$('#checkLight').css('color','#ff0000');	
		$('#watchMode').prop('checked', true);
		kmp.dataCorrupted = true;
		console.log("CORRUPT data , refreshed during game: "+kmp.dataCorrupted+" game="+kmp.gameStatus+" -> watcher checkbox checked: "+$('#watchMode').prop('checked'));
	}else{	//not seated or not 
		kmp.gameStatus = "ibg";
		kmp.dataCorrupted = false;
		$('#checkLight').css('color','#00ff00');	
	}
        
	kmp.gameLoop(); //start game loop:
	$('input[id="luckSwitch"]').attr('checked', true);

};

////############> main game kdice loop functions <##############
kmp.gameLoop = function(){
	kmp.tempScore = 0;
	kmp.ready = [true,true,true,true];
	
	kmp.loop = window.setInterval( function() {
		if (kmp.gameStatus != "ingame" ){

			if($('.iogc-LoginPanel-nameHeading').text().length < 1) { 	//check if user is logged out
				kmp.gameStatus = "corrupt";
				$('#checkLight').css('color','#00ff00');	
				console.log("logged out, gameStatus= "+kmp.gameStatus);		
				return;
			}
			if($(".iogc-GameWindow-status").length < 1){
				kmp.gameStatus = "corrupt";
				$('#checkLight').css('color','#00ff00');	
				console.log("opened table in another window?, gameStatus= "+kmp.gameStatus);		
				return;
			}
		
			kmp.userStatus = $(".iogc-LoginPanl-item:eq(1)").text().replace(/\(|\)/g, "");        	//	watching / playing
			kmp.tableStatus = $(".iogc-GameWindow-status").text();//.split(" ");	// kmp.tableStatus[7] ==> waiting / running / paused 	//todo make this work with the 'new' starting in 45sec thing
		
			if (kmp.user != $('.iogc-LoginPanel-nameHeading').text()){	//check if user is still same user
	//			kmp.gameStatus = "corrupt";
				$('#checkLight').css('color','#ff0000');	
				//console.log("user is different: "+kmp.gameStatus);		
				kmp.clearDataArrays();
				kmp.clearCharts();				
				kmp.user = $('.iogc-LoginPanel-nameHeading').text();	//set new user:
						//console.log("test>1> "+kmp.profileNR +" +>["+$("#profileLink").html().split("/")[2].split('"')[0] +"]");
				kmp.profileNR = $("#profileLink").html().split("/")[2].split('"')[0];
						//console.log("test>2> "+kmp.profileNR);
	
				if (kmp.userStatus == "playing"){	//data could be incomplete so:
					$('#watchMode').prop('checked', true);	//keeps showing stuff anyway
					//kmp.gameStatus = "corrupt";
					kmp.dataCorrupted = true;		//but it wont be stored.
					$('#checkLight').css('color','#ff0000');	
					//console.log("different user -> "+kmp.gameStatus+ " -> data corrupted: "+kmp.dataCorrupted);	
				}
			
			}else if (kmp.gameStatus == "ibg"){		//prepare playing:
				if (kmp.userStatus == "playing"){
					if( kmp.checkSeated() ){
						kmp.location = window.location.href;
						if( kmp.tableStatus.indexOf("paused") != -1 || kmp.tableStatus.indexOf("waiting") != -1 || kmp.tableStatus.indexOf("starting") != -1 ){//tournament or normal didn't start yet
						//if( kmp.tableStatus[9] == "paused" || kmp.tableStatus[6] == "waiting" ){//tournament or normal didn't start yet
							kmp.dataCorrupted = false;		
							$('#checkLight').css('color','#00ff00');	
							kmp.clearDataArrays();
							kmp.clearCharts(); //keep this one				
							kmp.tagAllRows();	// dont care about old stuff..
							kmp.gameStatus = "seated";
					console.log("waiting for game to start: ibg -> "+kmp.gameStatus+" ,corrupt= "+kmp.dataCorrupted);	
						}else if (kmp.tableStatus.indexOf("running") != -1 || kmp.tableStatus.indexOf("running") != -1 ){	//game started straight away.	//todo isnt this double?
						//}else if (kmp.tableStatus[7] == "running" || kmp.tableStatus[9] == "running" ){	//game started straight away.
							kmp.gameStatus = "ingame";
							$('#checkLight').css('color','#00ff00');	
							kmp.checkPlayer();
							kmp.startTime = new Date().getTime(); // set start time
					console.log("start playing (1) -> "+kmp.gameStatus+" corrupt: "+kmp.dataCorrupted+" NR:"+kmp.playerNR);	
							$('#watchMode').prop('checked', false);
							if (kmp.tableStatus.indexOf("tournament") > 0){	//count players sitting:
								kmp.normalTable = kmp.countSeated();
							}else{
								kmp.normalTable = 0;
							}
							//console.log("1 kmp.normalTable== "+kmp.normalTable);
						}else{	// this shouldnt happen.
							console.log("WTF? playing seated and ibg= "+kmp.gameStatus+"  kmp.tableStatus= "+ kmp.tableStatus);	
						}
					}else{ // sitStatus false. // possible seated at tourney, but not there yet.
							console.log("playing= "+kmp.userStatus+" during:"+ kmp.gameStatus+", but not seated? "+ kmp.checkSeated());	
					}
				}
			} else if( kmp.gameStatus=="seated"){
				if (kmp.tableStatus.indexOf("running") != -1 ){		//game starts
				//if (kmp.tableStatus[7] == "running" ||  kmp.tableStatus[9] == "running"){		//game starts
					kmp.gameStatus = "ingame";
					kmp.checkPlayer();
					kmp.startTime = new Date().getTime(); // set start time
					kmp.dataCorrupted = false;
					$('#checkLight').css('color','#00ff00');	
				console.log("start playing (2) seated==> "+kmp.gameStatus+" NR:"+kmp.playerNR);	
					$('#watchMode').prop('checked', false);
					if (kmp.tableStatus.indexOf("tournament") > 0){	//count players sitting:
						kmp.normalTable = kmp.countSeated();
					}else{
						kmp.normalTable = 0;
					}
					//console.log("2 kmp.normalTable== "+kmp.normalTable);
				}else if (kmp.tableStatus.indexOf("starting") != -1 ){		//waiting for brown/teal //todo?
				
				}else if (kmp.userStatus != "playing" || !kmp.checkSeated() ){
					kmp.dataCorrupted = true;				
					$('#checkLight').css('color','#ff0000');	
					kmp.gameStatus = "ibg";
					//console.log("you are seated elsewhere.. CORRUPT data, wrong location while playing: "+kmp.gameStatus+" userStatus= "+kmp.userStatus +"seated= "+kmp.checkSeated());	
				}else{
					//console.log("status=seated but not running and not playing ?: "+kmp.gameStatus);		
	
					$('.iogc-MessagePanel-messages tr:not(.km-tagged)').each(function(index) {
						$(this).addClass('km-tagged');
						if($(this).text().indexOf(kmp.user+" takes a seat") != -1) {			//// clear userdata when sitting down.
							kmp.dataCorrupted = false;	
							$('#checkLight').css('color','#00ff00');	
							kmp.clearDataArrays();
							kmp.clearCharts();				
						}else if($(this).text().indexOf(kmp.user+" stands up") != -1) {
							kmp.gameStatus = "ibg";
							console.log("user stands up: "+kmp.gameStatus);		
							kmp.dataCorrupted = false;				
							$('#checkLight').css('color','#00ff00');	
						}
					})
				}
			}else if (kmp.gameStatus == "corrupt"){
				if (!kmp.checkSeated() && !kmp.userStatus == "playing"){
					kmp.gameStatus = "ibg";	
				}	
			}else{
				console.log("wtf is happening??!? ");//+window.location.href+" }{ "+ tableName.replace(/ /g,"%20")+" }{ "+ kmp.location+" }{ "+ kmp.userStatus+" }{ "+ kmp.tableStatus+" }{ "+sitStatus);	
			}
		}
	
////############> ingame loop <##############	
	
		if (kmp.gameStatus =="ingame" || $('#watchMode').prop('checked') ){
			if(window.location.href != kmp.location && kmp.gameStatus =="ingame" && (window.location.href.slice(-1) != "#" ) ){;		//|| (window.location.href.indexOf(tableName.replace(/ /g,"%20"))== -1 && kmp.tableStatus[9] != "<b>paused</b>")) {		//visiting other tables while playing -> data could be incomplete/corrupted		//this also counts for multitabling..
				kmp.dataCorrupted = true;	
				$('#checkLight').css('color','#ff0000');
				kmp.gameStatus = "corrupt";	
				//console.log("please refresh or game-data won't be saved. problem with tablename");
				console.log("data CORRUPTED, wrong location while gameStatus= "+kmp.gameStatus+" | "+window.location.href+" | "+ kmp.location);//+" | "+ tableName.replace(/ /g,"%20")+ " | "+ kmp.userStatus+" | "+ kmp.tableStatus+" | "+sitStatus);
			}
			var trigger=false;
		// console.log("ready?? pre check="+kmp.ready.indexOf(false) );
			if( kmp.ready.indexOf(false) == -1 ){ 
				//console.log("ready?? at check="+kmp.ready);
				$('.iogc-MessagePanel-messages tr:not(.km-tagged)').each(function(index) {
					$(this).addClass('km-tagged');
					var content = $(this).text();
					var html = $(this).html();
			
					if( (content.indexOf("defeated") != -1 || content.indexOf("defended") != -1)) {		//// new roll	==> get number of defending player >> get data of roll
						 if (content.indexOf("neutral") == -1 ){
							kmp.defPlayerNr = parseFloat(html.slice(html.indexOf("span class=")+1).split("")[12]);//kmp.getNrPlayer(node.innerHTML));		//number									
						}else if (content.indexOf("neutral") != -1 ){
							kmp.defPlayerNr = 8;		//number									
						}
		
						var results = $(this).find('b').text().split(" to ");
		//// collecting data:		
						var WLD;
						var tkst2;
						if (content.indexOf("defeated") != -1){
							WLD = true;
							tkst2 = content.split(" ").slice(content.split(" ").indexOf("defeated")+1)[0].split("")
						}else if (content.indexOf("defended") != -1){
							WLD = false;
							tkst2 = content.split(" ").slice(content.split(" ").indexOf("defended")+1)[0].split("")
						}		
								
		//		put that data in array: 	0		1			2				3			4			5			6	
		//		var lastRoll = new Array(versA, versD, kmp.attPlayerNr, kmp.defPlayerNr, resultAtt, resultDef, WLD); //todo add ,[diceA],[diceD]
		
						kmp.lastRoll = new Array(parseFloat(tkst2[0]),  parseFloat(tkst2[2]),  kmp.attPlayerNr,  kmp.defPlayerNr,  parseFloat(results[0]),  parseFloat(results[1]),  WLD);				
		
		
		//	console.log("testing highlights:: "+content+" >>>> "+html+" >>>"+$(this).not('span').text());
						//bigger number above 40
						var SS = (kmp.tableStatus.split(" ")[6] == 16) ? 2 : (kmp.tableStatus.split(" ")[6] == 4) ? .5 : 1 ;
						if (parseFloat(results[0]) >= 40*SS && parseFloat(results[1]) >= 40*SS){
							$(this).find('b').html("<b><span style='font-size:"+(parseFloat(results[0])-25*SS)+"px'>"+results[0]+"</span> to <span style='font-size:"+(parseFloat(results[1])-25*SS)+"px'>"+results[1]+"</span></b>");
							$(".iogc-MessagePanel-messages").scrollTop($(".iogc-MessagePanel-messages")[0].scrollHeight);
						}else if (parseFloat(results[0]) >= 40*SS){
							$(this).find('b').html("<b><span style='font-size:"+(parseFloat(results[0])-25*SS)+"px'>"+results[0]+"</span> to "+results[1]+"</b>");
							$(".iogc-MessagePanel-messages").scrollTop($(".iogc-MessagePanel-messages")[0].scrollHeight);
						}else if (parseFloat(results[1]) >= 40*SS){
							$(this).find('b').html("<b>"+results[0]+" to <span style='font-size:"+(parseFloat(results[1])-25*SS)+"px'>"+results[1]+"</span></b>");
							$(".iogc-MessagePanel-messages").scrollTop($(".iogc-MessagePanel-messages")[0].scrollHeight);
						}

						kmp.updateStats();	////	 update all data
						trigger=true;
		
					}else if(content.length <=0) {		//// seperator line	
						//console.log("track node:"+node.innerHTML);
					}else if(content.indexOf("'s turn") != -1) {		//// new player turn -> get number of attacking player:		
						//kmp.currentPlayer = node.getElementsByTagName("span")[0].innerHTML;	//=string
						kmp.attPlayerNr = parseFloat(html.slice(html.indexOf("span class=")+1).split("")[12]);//kmp.getNrPlayer(node.innerHTML));		//number									
					}else if(content.indexOf(kmp.user +" finishes") != -1) {	//player is out
						if(kmp.gameStatus=="ingame" && !kmp.dataCorrupted){
							 
							if(kmp.tableStatus.indexOf("tournament") == -1){	// normal tables	> store score, place , rounds			
								console.log("game over (1)"+kmp.tableStatus.split(" ")[2]+" | "+ kmp.tempScore+" | "+ 	content.split(" ")[(content.split(" ").indexOf("finishes")+1)]+" | "+ 	content.split(" ")[(content.split(" ").indexOf("round")+1)]);
								kmp.storeMData( kmp.tempScore, 	content.split(" ")[(content.split(" ").indexOf("finishes")+1)], 	content.split(" ")[(content.split(" ").indexOf("round")+1)]);
							}else if(kmp.tableStatus.indexOf("tournament") != -1){	//tourney tables > store payout, place , rounds		
								kmp.tempScore = 0;
								var place = content.split(" ")[(content.split(" ").indexOf("finishes")+1)];
									$('.iogc-MessagePanel-messages tr:not(.km-tagged)').each(function(index) {
									var content2 = $(this).text();
									if(content2.indexOf(kmp.user+" finishes the tournament") != -1) {
										var place = content2.split(" ")[(content2.split(" ").indexOf("tournament")+1)];
										kmp.tempScore = 0 - parseFloat($(".iogc-info:first-child").text().split("◆")[0]);			
										if(content2.indexOf("and wins") != -1) {
											kmp.tempScore += parseFloat(content2.split(" ")[(content2.split(" ").indexOf("wins")+1)].replace(",","").replace("◆",""))
										}
									}
								})
							
								console.log("game over (2)"+kmp.tableStatus.split(" ")[2]+" | "+ kmp.tempScore+" | "+ 	content.split(" ")[(content.split(" ").indexOf("finishes")+1)]+" | "+ 	content.split(" ")[(content.split(" ").indexOf("round")+1)]);
								kmp.storeMData( kmp.tempScore, 	place, 	content.split(" ")[(content.split(" ").indexOf("round")+1)]);
							}
						}
						
						//i could set gamestatus to ibg here ? why didnt i ?
					}else if(content.indexOf(kmp.user+" takes a seat") != -1) {			//// clear userdata when sitting down.
						kmp.dataCorrupted = false;	
						$('#checkLight').css('color','#00ff00');	
						kmp.clearDataArrays();
						kmp.clearCharts();				
					}else if(content.indexOf(" takes a seat") != -1 && $('#watchMode').prop('checked')) {			//// clear userdata when somebody sits down and you are watching.
						kmp.clearDataArrays();
						kmp.clearCharts();				
					}else if(content.indexOf(kmp.user+" stands up") != -1) {	
						kmp.gameStatus = "ibg";
						kmp.dataCorrupted = false;			
						$('#checkLight').css('color','#00ff00');	
					}else if(content.indexOf("flags for") != -1) {	//someone flags
						var rgbString =  $(this).find("span").css('color');//"rgb(0, 70, 255)"; // get this in whatever way.
						var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);// parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
						delete (parts[0]);
					//console.log("parts=="+parts)
						for (var i = 1; i <= 3; ++i) {
							//console.log("part[i]s=="+parts[i]+"==>"+(parseFloat(parts[i])+80))
							parts[i] = parseInt(parseFloat(parts[i])+40).toString(16);
							if (parts[i].length == 1) parts[i] = '0' + parts[i];
						}
						var hexString = parts.join(''); // "0070ff"
						$(this).css("background-color",hexString).css("color","#fff");
		
					}else if(content.indexOf("sits out") != -1) {	//someone sits out
						$(this).css("background-color","#ddd");

					}else if(content.indexOf("dice") != -1 && content.indexOf("+") == 0) {		//// end of turn	
	
					}else if(content.indexOf("Score") != -1) {	//save score
						kmp.tempScore = parseFloat(content.split(" ")[3].replace("+",""));	
					}				
					
				})
				if(trigger){
					kmp.updateBars();	//update all charts
					trigger = false;	
				}
				
			}else{ console.log("not ready?? that's a pity.."+ kmp.ready)	}
		}
	}, kmp.speed)	//1500)	//setting this to 100 causes major lag ingame.?? at least it did once for me.. 
	
};	//########### end of ingame luck loop

////############> basic luck functions <##############
kmp.clearDataArrays = function(){
	//luck all players
	kmp.playerLuck = [  [ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ]  ];	
	//average per dice user
	kmp.AvPeDiU = [  [ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0] ], [ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0] ]  ];
	
	//average per roll all players
//	kmp.playerAvgDice=[	[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	,[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	];
	kmp.playerAvgDice=[	[	[null,null,null,null,  null,null,null,null, null],[null,null,null,null,  null,null,null,null, null],[null,null,null,null,  null,null,null,null, null]	]	,[	[null,null,null,null,  null,null,null,null, null],[null,null,null,null,  null,null,null,null, null],[null,null,null,null,  null,null,null,null, null]	]	];

	// plus/minus rolls:	
	kmp.pmRollsArray = [ [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ],[ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ] ];
	
	//average for each roll user only
	kmp.avgPerAttDefArray =	[	[	[1,2,3,4,5,6,7,8], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	], [	[1,2,3,4,5,6,7,8], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	]	];
	
	//history bar
	kmp.WLDarray = [ [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0], [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0] ];
	kmp.HistColA = new Array();
	kmp.HistColD = new Array();
	kmp.HattBar = new Array();
	kmp.HdefBar = new Array();
	kmp.HattDice = new Array();
	kmp.HdefDice = new Array();
	//history bar user only:
	kmp.HistColAU = new Array();
	kmp.HistColDU = new Array();
	kmp.HattBarU = new Array();
	kmp.HdefBarU = new Array();
	kmp.HattDiceU = new Array();
	kmp.HdefDiceU = new Array();

	//counting 8v8's:
	kmp.eights =	[		[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	,	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0],		 [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]		];
	//first round luck:
	kmp.earlyRound = new Array();
	
};
kmp.clearCharts = function(){	
	kmp.b1data.removeRows(0, kmp.b1data.getNumberOfRows() );
	kmp.b1data.addRows([
	['red',   	null , '#BF3069' ,null ],
    ['green',   null, '#30BF69' ,null ],
    ['purple',  null, '#9E30BF' ,null ],
    ['yellow',  null, '#cebf30' ,null ],
    ['blue',   	null, '#3069BF' ,null ],
    ['brown',   null, '#9A6654' ,null ],
    ['teal',   	null, '#30B1BF' ,null ],
    ['all',    	null, '#666666' ,null ],
    ['grey',   	50, '#CCCCCC' ,50 ], ]);
	
	kmp.b2data.removeRows(0, kmp.b2data.getNumberOfRows() );

	kmp.b3data.removeRows(0, kmp.b3data.getNumberOfRows() );
	kmp.b3data.addRows([
	['', 	null, '#BF3069', null],
	['',		null, '#DA94A6', null],
    ['',  	null, '#30BF69', null],
    ['',  	null, '#94CAA6', null],
    ['',  null, '#9E30BF', null],
    ['',  null, '#B894CA', null],
    ['',  null, '#cebf30', null],
    ['',  null, '#D0CA94', null],
    ['', 	null, '#3069BF', null],
    ['', 	null, '#94A6CA', null],
    ['',  	null, '#9A6654', null],
    ['',  	null, '#BA9482', null],
    ['', 	null, '#30B1BF', null],
    ['', 	null, '#A4D0DA', null],
    ['',  	null, '#333333', null],
    ['',  	null, '#666666', null],
    ['', 	3.5, '#CCCCCC', 3.5] ]);	
//	console.log("clearCharts end")
};
kmp.setupCharts = function(){	//setting up visualization data:
	kmp.prepChartb1();
	kmp.prepChartb2();
	kmp.prepChartb3();
};
kmp.prepChartb1 = function(){
	kmp.b1data = google.visualization.arrayToDataTable([
    ['color', 	'ryanluck',	{ role: 'style' }, { role: 'annotation' }],
    ['red',   	null , '#BF3069' ,null ],
    ['green',   null, '#30BF69' ,null ],
    ['purple',  null, '#9E30BF' ,null ],
    ['yellow',  null, '#cebf30' ,null ],
    ['blue',   	null, '#3069BF' ,null ],
    ['brown',   null, '#9A6654' ,null ],
    ['teal',   	null, '#30B1BF' ,null ],
    ['all',    	null, '#666666' ,null ],
    ['grey',   	50, '#CCCCCC' ,50 ], ]);

   // kmp.b1chart = new google.visualization.ColumnChart(document.getElementById('baseChart1'));
   // google.visualization.events.addListener(   kmp.b1chart, 'ready', kmp.readyChartb1 );
	
//	 var formatter = new google.visualization.NumberFormat(  { pattern:'##.#' });
//    formatter.format(data, 1);
	
/*	var view = new google.visualization.DataView(data);
	view.setColumns( [0, 1, { calc: "stringify",
                         	sourceColumn: 1,
                         	type: "string",
                         	role: "annotation" }, 2] );*/
	var options = {
        width: 260, height: 140,
        chartArea: {  top: 20, left: 20, width: "88%", height: "80%" },
        title:"Luck percentages",
        titleTextStyle: { fontSize:10},
        bar: {groupWidth: "90%"},
        hAxis: {textPosition: "none"},
		legend: {position:"none"},
		tooltip:{trigger:"none"},
  	};  
 	kmp.b1wrap = new google.visualization.ChartWrapper({
    	chartType: 'ColumnChart',
  		dataTable: kmp.b1data,
		options: options,
    	containerId: 'baseChart1'
  	});
	google.visualization.events.addListener(   kmp.b1wrap /*kmp.b3chart*/, 'ready', kmp.readyChartb1 );
};
kmp.prepChartb2 = function(){
	kmp.b2data = new google.visualization.DataTable();
	kmp.b2data.addColumn('string', 'roll');
	kmp.b2data.addColumn('number', 'att');
	kmp.b2data.addColumn(	{type: 'string', role: 'style' } );
	kmp.b2data.addColumn('number', 'def');
	kmp.b2data.addColumn( {type: 'string', role: 'style' } );		
	var options = {
    	width: 260, height: 200,
        chartArea: {  top: 20, left: 14, width: "90%", height: "75%" },
        title:"Roll History with Average per Dice",
        titleTextStyle: { fontSize:10},
        legend: { position: 'none' },
        tooltip:{trigger:"none"},
        bar: { groupWidth: '80%' },
        isStacked: true,
        hAxis: {textStyle: {   fontSize: 9},
                maxTextLines: 2, minTextSpacing: 4, maxAlternation: 2},
        vAxis: {
         	textStyle: {   fontSize: 7},
         	ticks: [{v:-5 , f:"6"}, {v:-2.5 , f:"3.5"},{v:0 , f:"1"}, {v:2.5 , f:"3.5"}, {v:5 , f:"6"} ],
         	minValue:1,
         	maxValue:4.5,
    	} ,
	};
    kmp.b2wrap = new google.visualization.ChartWrapper({
    	chartType: 'ColumnChart',
  		dataTable: kmp.b2data,
		options: options,
    	containerId: 'baseChart2'
  	});
	google.visualization.events.addListener(   kmp.b2wrap /*kmp.b3chart*/, 'ready', kmp.readyChartb2 );
};
kmp.prepChartb3 = function(){
	kmp.b3data = google.visualization.arrayToDataTable([
    ['dice rolled', 	'average',	{ role: 'style' }, { role: 'annotation' }],
    ['', 	null, '#BF3069', null],
	['',		null, '#DA94A6', null],
    ['',  	null, '#30BF69', null],
    ['',  	null, '#94CAA6', null],
    ['',  null, '#9E30BF', null],
    ['',  null, '#B894CA', null],
    ['',  null, '#cebf30', null],
    ['',  null, '#D0CA94', null],
    ['', 	null, '#3069BF', null],
    ['', 	null, '#94A6CA', null],
    ['',  	null, '#9A6654', null],
    ['',  	null, '#BA9482', null],
    ['', 	null, '#30B1BF', null],
    ['', 	null, '#A4D0DA', null],
    ['',  	null, '#333333', null],
    ['',  	null, '#666666', null],
    ['', 	3.5, '#CCCCCC', 3.5] ]);
	
//	kmp.b3format = new google.visualization.NumberFormat(  { pattern:'#.##' });
//    kmp.b3format.format(kmp.b3data, 1);
/*
	var view = new google.visualization.DataView(kmp.b3data);
	view.setColumns( [0, 1, { calc: "stringify",
    	                      sourceColumn: 1,
        	                  type: "string",
            	              role: "annotation" }, 2] );*/
	var options = {
    	width: 260, height: 180,
		//backgroundColor: "none",
    	chartArea: {  top: 20, left: 32, width: "85%", height: "80%" },
    	title:"Attack Defense Dice Roll Averages",
   		titleTextStyle: { fontSize:10},
   		bar: {groupWidth: "85%"},
   		legend: {position: "none"},
   		//tooltip:{trigger:"none"},
   		hAxis: {ticks: [{v:2.5, f:"2.5"}, {v:3.5 , f:"3.5"}, {v:4.5,f:"4.5"} ],
			minorGridlines:{count:1} } ,
	};
	kmp.b3wrap = new google.visualization.ChartWrapper({
    	chartType: 'BarChart',
  		dataTable: kmp.b3data,
		options: options,
    	containerId: 'baseChart3'
  	});
	google.visualization.events.addListener(   kmp.b3wrap /*kmp.b3chart*/, 'ready', kmp.readyChartb3 );
};

kmp.readyChartb1 = function (){		 kmp.ready[1] = true;	};	//console.log("ready b1");
kmp.readyChartb2 = function (){		 kmp.ready[2] = true;	};	//console.log("ready b2"); 
kmp.readyChartb3 = function (){		 kmp.ready[3] = true;	};	//console.log("ready b3"); 

kmp.resetAllData = function(){
	if (confirm("This will delete all your monthly game data on this account. This can't be undone. Are you sure you wanna do this?") ){
		console.log("all data of this month is deleted");
		kmp.removeCookie();
		kmp.clearDataArrays();
		
		var d = new Date();
		var year = d.getYear();
		var month = d.getMonth()+1;
		localStorage.removeItem('kmp_'+kmp.profileNR+"_y"+year+"_m"+month); //reset localStorage for the month.	
	}
};

kmp.updateStats = function(){		
	// simple mode:
	kmp.updateLuckStats();	//chart1R data
	kmp.updateHistData();	//chart2R data
	kmp.updateADavgStat();	//chart3R data
};
kmp.updateBars = function(){
// simple mode:
	kmp.updateLuckBar();	//chart1R bar
	kmp.updateHistBar();	//chart2R bar
	kmp.updateADavgBar();	//chart3R bar 
};
///////############> luck chart calculator functions <############################################################################################################################

////############> all luck percentage per player  chart-1- <##############
kmp.updateLuckStats = function(){		//(1)
//	[	allluck 	perc[0,0,0,0, 0,0,0, 0,0]	counters[0,0,0,0, 0,0,0, 0,0]	arrays[[],[],[],[], [],[],[], [],[]]	]
//		kmp.playerLuck =[  [ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ]  ];	
//		kmp.playerLuck [all / att / def] [current perc, counter, array] [player nr]

	var vsA = kmp.lastRoll[0];
	var vsD = kmp.lastRoll[1];
	var resA = kmp.lastRoll[4];
	var resD = kmp.lastRoll[5];
	var WLD = kmp.lastRoll[6];
	// calculating luck of the Roll:
	var luckRollA = 0;	
	if (WLD){
		luckRollA = 100 - kmp.rollStats[vsA-2][vsD-1];	
	}else if(!WLD){
		luckRollA = 0 - kmp.rollStats[vsA-2][vsD-1];
	}			
	var luckRollD = 0;	
	if (!WLD){
		luckRollD = kmp.rollStats[vsA-2][vsD-1];
	}else if(WLD){
		luckRollD = 0 - (100 - kmp.rollStats[vsA-2][vsD-1]);	
	}

	//luck players
	kmp.playerLuck[0][1][kmp.lastRoll[2]]++;
	kmp.playerLuck[0][2][kmp.lastRoll[2]] = ( (kmp.playerLuck[0][2][kmp.lastRoll[2]] *(kmp.playerLuck[0][1][kmp.lastRoll[2]]-1))+ luckRollA) / kmp.playerLuck[0][1][kmp.lastRoll[2]];
	//										(	(							current avg	* counter-1										) + new roll	) / counter				
	kmp.playerLuck[0][1][kmp.lastRoll[3]]++;	
	kmp.playerLuck[0][2][kmp.lastRoll[3]] = (( kmp.playerLuck[0][2][kmp.lastRoll[3]] *(kmp.playerLuck[0][1][kmp.lastRoll[3]]-1))+luckRollD ) / kmp.playerLuck[0][1][kmp.lastRoll[3]];	
			
	/*//luck att def:			*experimental*
	kmp.playerLuck[1][1][kmp.lastRoll[2]]++;
	kmp.playerLuck[1][2][kmp.lastRoll[2]] = (( kmp.playerLuck[1][2][kmp.lastRoll[2]] *(kmp.playerLuck[1][1][kmp.lastRoll[2]]-1))+luckRollA ) / kmp.playerLuck[1][1][kmp.lastRoll[2]];	
			
	kmp.playerLuck[2][1][kmp.lastRoll[3]]++;	
	kmp.playerLuck[2][2][kmp.lastRoll[3]] = (( kmp.playerLuck[2][2][kmp.lastRoll[3]] *(kmp.playerLuck[2][1][kmp.lastRoll[3]]-1))+luckRollD ) / kmp.playerLuck[2][1][kmp.lastRoll[3]];
*/
	//avg att/def
	kmp.playerLuck[1][1][7]++;
	kmp.playerLuck[1][2][7] = (( kmp.playerLuck[1][2][7] *(kmp.playerLuck[1][1][7]-1))+luckRollA ) / kmp.playerLuck[1][1][7];
				
	kmp.playerLuck[2][1][7]++;	
	kmp.playerLuck[2][2][7] = (( kmp.playerLuck[2][2][7] *(kmp.playerLuck[2][1][7]-1))+luckRollD ) / kmp.playerLuck[2][1][7];
	
	kmp.playerLuck[0][0][kmp.lastRoll[2]] = (kmp.playerLuck[0][1][kmp.lastRoll[2]] != 0) ? (kmp.playerLuck[0][0][kmp.lastRoll[2]] = (100+( kmp.playerLuck[0][2][kmp.lastRoll[2]] ) ) /2) : 0;
	kmp.playerLuck[0][0][kmp.lastRoll[3]] = (kmp.playerLuck[0][1][kmp.lastRoll[3]] != 0) ? (kmp.playerLuck[0][0][kmp.lastRoll[3]] = (100+( kmp.playerLuck[0][2][kmp.lastRoll[3]] ) ) /2) : 0;

	//att/def luck//		
	kmp.playerLuck[1][0][kmp.lastRoll[2]] = (kmp.playerLuck[1][1][kmp.lastRoll[2]] != 0) ? (kmp.playerLuck[1][0][kmp.lastRoll[2]] = (100+( kmp.playerLuck[1][2][kmp.lastRoll[2]] ) ) /2) : 0;
	kmp.playerLuck[2][0][kmp.lastRoll[3]] = (kmp.playerLuck[2][1][kmp.lastRoll[3]] != 0) ? (kmp.playerLuck[2][0][kmp.lastRoll[3]] = (100+( kmp.playerLuck[2][2][kmp.lastRoll[3]] ) ) /2) : 0;
	//avg att/def luck:
	kmp.playerLuck[1][0][7] = (100+( kmp.playerLuck[1][2][7])) /2;
	kmp.playerLuck[2][0][7] = (100+( kmp.playerLuck[2][2][7])) /2;
	
	
	if(vsA == 8 && vsD == 8){
		//store 8v8 result: todo	
	}
	
 	kmp.b1data.setCell( kmp.lastRoll[2], 1, kmp.playerLuck[0][0][kmp.lastRoll[2]].toFixed(1) ); 
 	kmp.b1data.setCell( kmp.lastRoll[3], 1, kmp.playerLuck[0][0][kmp.lastRoll[3]].toFixed(1) ); 
	
 	kmp.b1data.setCell( kmp.lastRoll[2], 3, kmp.playerLuck[0][0][kmp.lastRoll[2]].toFixed(1) ); 
 	kmp.b1data.setCell( kmp.lastRoll[3], 3, kmp.playerLuck[0][0][kmp.lastRoll[3]].toFixed(1) ); 
	
}
kmp.updateLuckBar = function(){	// chart(1)
   	kmp.ready[1] = false;
    kmp.b1wrap.draw();
};

///////############> history rolls chart-2- <#######################################################################################################################						
kmp.updateHistData = function(){			//(2)
	kmp.b2data.addRow(	[ ( kmp.lastRoll[0].toString()+" "+kmp.lastRoll[1].toString() ), ( (kmp.lastRoll[4] / kmp.lastRoll[0])-1), kmp.getColorNR(kmp.lastRoll[2],kmp.lastRoll[6]),  (1-(kmp.lastRoll[5] / kmp.lastRoll[1])) , kmp.getColorNR(kmp.lastRoll[3],(!kmp.lastRoll[6])) ] );
	if (kmp.b2data.getNumberOfRows() >= 26) { 	kmp.b2data.removeRow(0);	}
};
kmp.updateHistBar = function(){			//(2)
   	kmp.ready[2] = false;
    kmp.b2wrap.draw();		
};


///////############> avg per dice per player chart-3- <#################################################################################################################	
kmp.updateADavgStat = function(){	
//										0		1			2				3				4			5		6	 7		8
//			kmp.lastRoll = new Array(versA, versD, kmp.attPlayerNr, kmp.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//			kmp.playerAvgDice [playerNR] [0)current average Attack, 1)total result att, 2)counter of dice,	  3)total result def, 4)counter of dice, 5)current average Defend ]

//	[att/def] [counter/result/avg] [playernr] 

//		kmp.playerAvgDice=[	[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	,[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	];
		
	var At = kmp.lastRoll[2];
	var Df = kmp.lastRoll[3];
	//att
	kmp.playerAvgDice[0][2][At] += kmp.lastRoll[0]; //counter dice rolled	//2
	kmp.playerAvgDice[0][1][At] += kmp.lastRoll[4];	//result dice	//1
	if(kmp.playerAvgDice[0][2][At] > 0){
		kmp.playerAvgDice[0][0][At] = kmp.playerAvgDice[0][1][At] / kmp.playerAvgDice[0][2][At];
	}
	//def
	kmp.playerAvgDice[1][2][Df] += kmp.lastRoll[1]; //counter dice rolled	//2
	kmp.playerAvgDice[1][1][Df] += kmp.lastRoll[5];	//result dice	//1
	if(kmp.playerAvgDice[1][2][Df] > 0){
		kmp.playerAvgDice[1][0][Df] = kmp.playerAvgDice[1][1][Df] / kmp.playerAvgDice[1][2][Df];
	}
	//avg
	kmp.playerAvgDice[0][2][7] += kmp.lastRoll[0];
	kmp.playerAvgDice[0][1][7] += kmp.lastRoll[4];
	if (kmp.playerAvgDice[0][2][7] > 0){
		kmp.playerAvgDice[0][0][7] = kmp.playerAvgDice[0][1][7] / kmp.playerAvgDice[0][2][7];
	}
	kmp.playerAvgDice[1][2][7] += kmp.lastRoll[1];
	kmp.playerAvgDice[1][1][7] += kmp.lastRoll[5];
	if (kmp.playerAvgDice[1][2][7] > 0){
		kmp.playerAvgDice[1][0][7] = kmp.playerAvgDice[1][1][7] / kmp.playerAvgDice[1][2][7];
	}
	//adding avg for attacker/defender
 	kmp.b3data.setCell( kmp.lastRoll[2]*2, 1, kmp.playerAvgDice[0][0][kmp.lastRoll[2]].toFixed(2) ); 
 	kmp.b3data.setCell( (kmp.lastRoll[3]*2)+1, 1, kmp.playerAvgDice[1][0][kmp.lastRoll[3]].toFixed(2) ); 
	//adding counter to vaxis:
 	kmp.b3data.setCell( kmp.lastRoll[2]*2, 0, kmp.playerAvgDice[0][2][kmp.lastRoll[2]].toString() ); 
 	kmp.b3data.setCell( (kmp.lastRoll[3]*2)+1, 0, kmp.playerAvgDice[1][2][kmp.lastRoll[3]].toString() ); 
	//adding avg for all
 	kmp.b3data.setCell( 14, 1, kmp.playerAvgDice[0][0][7].toFixed(2) );
 	kmp.b3data.setCell( 15, 1, kmp.playerAvgDice[1][0][7].toFixed(2) ); 
	
	//annotations:
 	kmp.b3data.setCell( kmp.lastRoll[2]*2, 3, kmp.playerAvgDice[0][0][kmp.lastRoll[2]].toFixed(2) ); 
 	kmp.b3data.setCell( (kmp.lastRoll[3]*2)+1, 3, kmp.playerAvgDice[1][0][kmp.lastRoll[3]].toFixed(2) ); 
 	kmp.b3data.setCell( 14, 3, kmp.playerAvgDice[0][0][7].toFixed(2) ); 
 	kmp.b3data.setCell( 15, 3, kmp.playerAvgDice[1][0][7].toFixed(2) ); 
	
};
kmp.updateADavgBar = function(){		//(3)	
	kmp.ready[3] = false;
    kmp.b3wrap.draw();
};


/*kmp.AutoEndTurnCheck = function() {	//aet
	if ($('#dct-aet').is(':checked')) {
		// $(".iogc-PlayerPanel-away") //todo sit back in if sit out.
		if ($('.iogc-GameWindow-status').html().indexOf("waiting") != -1) {
			$('#dct-aet').prop('checked', false);
		}
		
		var isRound1 = ($('.iogc-GameWindow-status').html().length - $('.iogc-GameWindow-status').html().indexOf("running round 1")) == 15;
		
		if (isRound1) {
			$('#dct-aet').prop('checked', false);
		}
	}
	
	if ($('#dct-aet').is(':checked')) {
		$('.iogc-Controls button:visible').each(function() {
			if ($(this).html() == "End Turn") {
				this.click();
				track("Auto End Turn", "Turn Ended");
			}
		});
	}
};*/

////############> init helper-functions & basic stuff <##############
kmp.addPanel = function(){	// create checkbox panel:
    var panel = $('<div id="KMplugpanel" style="margin-top: 10px;"></div>');
	$('#iogc-PlayerPanel').after(panel);
    var kmtit = $("<div class='iogc-SidePanel-title'>kakku man's Plugin</div>").appendTo(panel);
    var panelone = $('<div class="iogc-SidePanel-inner"></div>').appendTo(panel);
    $('<span><input type="checkbox" id="kmpMinTheme" name="minTheme" /><span> <b>Minimal Theme </b></span><br/>').appendTo(panelone);
  
	$('#kmpMinTheme').change(function(){
		if ($('#kmpMinTheme').prop('checked') == false) {
			GMO_setValue("kmp_minTheme", false);
			$('#kmpMinTheme').prop('disabled', true);
			alert('Refresh page for changes to take effect.');
		} else {
			GMO_setValue("kmp_minTheme", true);
			kmp.themeStyler();
		}
	});
	if(window.location.href.indexOf("kdice.com") != -1)	{
		$('<span><input type="checkbox" id="statCalc" /> <b> Extra Stats </b>(on profile pages)</span><br/>').appendTo(panelone);
		$('#statCalc').change(function(){
			if ($('#statCalc').prop('checked') == false) {				GMO_setValue("kmp_statCalc", false);
			} else {				GMO_setValue("kmp_statCalc", "true");
			}
		});		
		if(GMO_getValue("kmp_statCalc") == "true")	$('#statCalc').prop('checked', true);
		//$('<span><input type="checkbox" id="dct-aet" /> <b>Auto End Turn</b></span><br/>').appendTo(panelone);	//aet
		$('<span><input type="checkbox" id="kmp-TOTM" /> <b>Tables of the Month</b></span>').appendTo(panelone);
		$('#kmp-TOTM').click(function(){
			if ( $('#kmp-TOTM').prop('checked') == true ){		kmp.tableList();
			} else {	$('#tablesOfTheMonth').remove();
			}
		});
        
        var panelluck = $('<div class="iogc-SidePanel-inner" ></div>').appendTo(panel);	//luckpanel:
        $('<span style="font-size: 8pt;"><b>Luck Charts</b> <input type="checkbox" id="luckSwitch" /> </span><span id="checkLight" style="float:right; color:#00ff00; font-size:14pt"> <b>•</b> </span><br/>').appendTo(panelluck);
		$('#luckSwitch').change(function(){
			if ($('input[id="luckSwitch"]:checked').length == 0) {
				GMO_setValue("kmp_luckSwitch", false);
				$('input[id="watchMode"]').attr('disabled', true);
				$('input[id="extraMode"]').attr('disabled', true);
				$('#kmp_BasePanel').remove();//remove all charts: todo
				kmp.loop = window.clearInterval(kmp.loop);		//stop loop
			//	console.log("switch: off")
			} else {
				GMO_setValue("kmp_luckSwitch", true);
				$('input[id="watchMode"]').attr('disabled', false);
				$('input[id="extraMode"]').attr('disabled', false);
				kmp.startLucking();	//	kmp.gameLoop(); 	// setup charts
				
			//	console.log("switch: on")
			}
		});
		//todo grey out diasbled
        $('<span><input type="checkbox" id="watchMode" /> <b>Watching</b> </span><br/>').appendTo(panelluck);
        $('<span><input type="checkbox" id="extraMode" disabled=true/> <b>Extend</b> (coming soon) </span><br/>').appendTo(panelluck);
        $('input[id="extraMode"]').change(function(){	kmp.moreChartsToggle();	});
        $("<div class='iogc-SidePanel-inner'><span> Version <a href='http://userscripts.org/scripts/source/105384.user.js' title='Version of kakku man's plugin, click to check for a new version.'>"+kmp.VERSION+'</a></span></div>').appendTo(panelluck);
        $('#dupli .menu2').append('<li><a target="_blank" href="http://xsketch.com"><b>XSKETCH</b></a></li>');
		$('#dupli .menu2').append('<li><a target="_blank" href="http://gpokr.com"><b>GPOKR</b></a></li>');
		
	}else if(window.location.href.indexOf("gpokr.com") != -1)	{
		panelone.append('<span><input type="checkbox" name="colorCards" /> <b>Colored Cards</b></span>');
		$('input[name="colorCards"]').change(function(){
			if ($('input[name="colorCards"]:checked').length == 0) {
				GMO_deleteValue("kmp_colorCards");
				//alert('Refresh page for changes to take effect.');
                kmp.timedCheck = window.clearInterval(kmp.timedCheck);
				kmp.colCards();
			} else {
				GMO_setValue("kmp_colorCards", "true");
				kmp.colCards();
			}
		});
		$('#dupli .menu2').append('<li><a target="_blank" href="http://kdice.com"><b>KDICE</b></a></li>');
		$('#dupli .menu2').append('<li><a target="_blank" href="http://xsketch.com"><b>XSKETCH</b></a></li>');
	
	}else if(window.location.href.indexOf("xsketch.com") != -1) {
		$('#dupli .menu2').append('<li><a target="_blank" href="http://kdice.com"><b>KDICE</b></a></li>');
		$('#dupli .menu2').append('<li><a target="_blank" href="http://gpokr.com"><b>GPOKR</b></a></li>');
	}
};
kmp.checkChatUrls = function() {
	//kmp.AutoEndTurnCheck();	//aet
	$('.iogc-chatPanel-messages .gwt-HTML:not(.km-done)').each(function (){
		$(this).addClass("km-done");
		var text = $(this).html();
		text.replace( /<a[^>]+>([^<]+)<\/a>/gi, '$1' ).replace( /<wbr>/g, '' );
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        $(this).html(	text.replace(exp,"<a href='$1' target='_blank'>$1</a>")     );
	});
};
kmp.replaceURLWithHTMLLinks = function(text) {
	text.replace( /<a[^>]+>([^<]+)<\/a>/gi, '$1' ).replace( /<wbr>/g, '' );
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	if (text.indexOf('.png') != -1 || text.indexOf('.gif') != -1 || text.indexOf('.jpg') != -1 || text.indexOf('.tif') != -1 || text.indexOf('.bmp') != -1){
		return text.replace( exp, '<img src="$1" class="imgLimit" ></br><a href="$1" target="_blank">$1</a>' );	
	}else{
		return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 		
	}
};	
kmp.colCards = function(){
	kmp.timedCheck = (GMO_getValue("kmp_colorCards") == "true") ? window.setInterval(function(){
		$('.iogc-MessagePanel-messages tr td div:not(.km_done)').each(function(){
			$(this).addClass("km_done");
  			var text = $(this).text(); //todo check if text() is better than html() ??
    		var replaced = text.replace(/\[(.*)\]/, function( $0, $1 ) {
        		return $1.replace(/(.)([hdsc])/g, function( $0, $1, $2 ) {
            		switch($2) {
               		case "h":	return "<span style='color: red;font-weight:bold;'>".concat($1, "♥", "</span>");
                	case "d":	return "<span style='color: red;font-weight:bold;'>".concat($1, "♦", "</span>");
					case "s":	return "<span style='color: black;font-weight:bold;'>".concat($1, "♠", "</span>");
                	case "c":	return "<span style='color: black;font-weight:bold;'>".concat($1, "♣", "</span>");
                	default:    return $1;
            		}
				});
			});
			$(this).html(replaced);
		});
		kmp.checkChatUrls();	
	},1000) : window.setInterval(function(){ 	kmp.checkChatUrls(); 	},1000);
};

////############> tables of the month functions <##############
kmp.tableList = function(){
	$.get("http://kdice.com/monthStats", function(data){ 		kmp.tableList2(data); 		});
	$('<style type="text/css">	.TOTMlisthead { 	border-bottom:1px solid #AAA; width:100px; }\
								.TOTMlist { margin-bottom:5px; font-size:9pt; padding:5px 0px 0px 5px; width:100px;	}	</style>').appendTo('head');
	$('body').append('<div id="tablesOfTheMonth" class="gwt-DialogBox" style="left: 15px; top: 15px; visibility: visible; position: absolute; overflow: visible; clip: rect(auto, auto, auto, auto); z-index: 1000; ">\
		<div id="TOTMcaption" class="Caption"> Tables of the Month </div>\
		<div class="holder" style="background-color:#fff; border-radius:5px; padding:5p; width:230px; height:821px; fontsize:9pt; position:relative;">\
			<div style="position: absolute; top:0px; left: 0px; width:115px;">\
				<div id="TOTM-5k" class="TOTMlist" ><div class="TOTMlisthead">5k</div></div>\
				<div id="TOTM-2k" class="TOTMlist" ><div class="TOTMlisthead">2k</div></div>\
				<div id="TOTM-100" class="TOTMlist" ><div class="TOTMlisthead">100</div></div>\
			</div>\
			<div style="position: absolute; top:0px; left: 115px; width:115px;">\
				<div id="TOTM-500" class="TOTMlist" ><div class="TOTMlisthead">500</div></div>\
				<div id="TOTM-0" class="TOTMlist" ><div class="TOTMlisthead">0</div></div>\
				<div><button style="margin-left: 10px; font-size: 14px; padding: 5px 20px 5px;" id="TOTM-close" class="iogc-NewButton-white iogc-NewButton" type="button">Close</button></div>\
			</div>\
		</div>\
	</div>');
	$('#TOTM-close').click(	function(){	 $('#tablesOfTheMonth').remove();	$('#kmp-TOTM').prop('checked', false); });	
	
	$('#TOTMcaption').mousedown(function(event){ kmp.mdowner(event, $('#tablesOfTheMonth') )});
	$('#TOTMcaption').mouseover(function(){ $('#TOTMcaption').css("cursor","move")});	
};
kmp.tableList2 = function(data){
	$(data).find('.wide.stats tbody .notcurrent').each(function(index, value){	
		if(index <3){ 	$('#TOTM-5k').append('<span><a class="notcurrent" href="#'+$(this).text()+'">'+$(this).text()+' </a></span></br>');
		}else if(index <25){ 	$('#TOTM-2k').append('<span><a class="notcurrent" href="#'+$(this).text()+'">'+$(this).text()+' </a></span></br>');
		}else if(index <50){ 	$('#TOTM-500').append('<span><a class="notcurrent" href="#'+$(this).text()+'">'+$(this).text()+' </a></span></br>');
		}else if(index <75){ 	$('#TOTM-100').append('<span><a class="notcurrent" href="#'+$(this).text()+'">'+$(this).text()+' </a></span></br>');
		}else { 	$('#TOTM-0').append('<span><a class="notcurrent" href="#'+$(this).text()+'">'+$(this).text()+' </a></span></br>');
		}
	});
	
};
////############> theme styler functions <##############
kmp.themeStyler = function(text) {
    console.log("minimal theme-styling")
	if(window.location.href.indexOf("com/#") != -1) {
    //gamewindow:
		$(".iogc-Controls").css("background-color"," #f0f0f4");//.css("border-bottom"," 1px solid #8899AA");
		$('.iogc-GameWindow tr:last').css("position","absolute").css("top","-600px");//hide();
		$("#outside > div:last").css("position","absolute").css("top","-600px");//hide();
		$('#menu div:last').css("position","absolute").css("top","-600px");//hide();
		$('#mainpage').css("padding","10");
		$('.iogc-GameWindow-layout').css("background-color"," #fff").css("border","0px dotted #f0f");//removeClass();
		
        $('.iogc-GameWindow-commands .iogc-GameWindow-findSeatButton').hide().css("border","4px dotted #f00").css("position","absolute").css("top","-600px");; 
                                		
    //infobox cleanup
		$('.iogc-SidePanel-inner .iogc-LoginPanel-playerRow').each( function(){
			if($(this).text().indexOf('Boost') != -1){ $(this).css("position","absolute").css("top","-330px"); 
			}else if($(this).text().indexOf('Buy') != -1){ $(this).css("position","absolute").css("top","-330px"); }
		})
		
	//coloring:
		$('<style type="text/css">	.gwt-DialogBox { background-color:rgb(34, 85, 119) !important; }\
									.gwt-TabBar .gwt-TabBarItem-selected {background: none repeat scroll 0% 0% #257;}\
									.selected {     background-color: #39D; }	</style>').appendTo('head');
		//$('.gwt-DialogBox').css('background-color','rgb(34, 85, 119)');
	
	}else{
	//cleaning	
		$("h2.mainheader a").css("font-size","26px").css("color","#555555").css("float","right").css("font-weight","bold").css("padding","18px 20px 0");
		$("h2.mainheader a").insertAfter("#hd img");
		$('.hmenu').css("margin"," 0px");
		$('#forum table').css("width","");
		$('#forum td').css("padding","");
		$('#forum h3').hide();
		$('#menu-out').hide();
		$('#forum div').css("padding-bottom","");
		$('.all-item').css("margin-bottom","");

		if(window.location.href.indexOf("profile")!= 17  && window.location.href.indexOf("profile")!= 21 ){     $("h2.mainheader").hide();	}

		$('#menu').hide();	
	}
	
	if(window.location.href.indexOf("kdice") != -1) {
		$('.menu2 style').remove();	//remove red shit
        //buttons:	
		$(".iogc-NewButton").addClass("gwt-Button");
		$(".iogc-NewButton .gwt-Button").removeClass('iogc-NewButton')
		$(".gwt-Button").css("padding","2px");
	}
        
    //chat bigger:
	var mH = (GMO_getValue("kmp_messHght")!=undefined) ? GMO_getValue("kmp_messHght") : "230px";
	var cH = (GMO_getValue("kmp_chatHght")!=undefined) ? GMO_getValue("kmp_chatHght") : "200px";

	$('.iogc-MessagePanel').css("margin"," 0px")
	$('.iogc-ChatPanel-messages').css("height", cH).css("width","auto");
	$('.iogc-MessagePanel-messages').css("height", mH);
	////$('.iogc-ChatPanel-messages').css("height","200px").css("width","auto");
	/////$('.iogc-MessagePanel-messages').css("height","225px");
        
	$('.iogc-MessagesPanel').parent().append('<div id="resdragC" style="position:relative; width:100%;cursor:s-resize; text-align:center;" >V</div>');// height:0px; 
	$('#resdragC').mousedown(function(event){ kmp.mdowner2(event)});
	
	$('.iogc-MessagePanel-inner .gwt-HTML').css("padding-left"," 0px").css("padding-right"," 0px");
	$('.rdews-RoundedCompositeInside').css("padding-left"," 0px").css("padding-right"," 0px");
//chatbox
	$('.iogc-MessagePanel-inner tr:first-child').hide();
	$('table.iogc-MessagePanel-inner tr:last').hide();
	$('.rdews-RoundedCompositeInside').removeClass();
	$('.rdews-RoundedCompositeOutside').removeClass();
	$('.iogc-ChatPanel').css("margin","0 0 0 5px");
//header:
	$('#logo a').appendTo("#hd")
	$('#hd div:first-child').hide();
	$('#hd').css("padding","5px 0 5px").css("text-align","left").css("width","auto")
	$('#hd img').css("height","40px")
//chatbox's:	
	$('.rdews-RoundedCompositeInside').css("padding","0");
//menu move to top
	$('#iogc-regularMenu:eq(0)').clone().appendTo("#hd").removeAttr('id').attr('id', 'dupli').css("margin-top","10px");//insertAfter('#hd');
	$('#iogc-regularMenu').hide();
	$('#iogc-regularMenu').remove();
	//$('#iogc-regularMenu').hide();
	$('.yui-b ins').hide();

	console.log("minimal theme:done");
}

kmp.forumChanges = function(){
	// style="padding-right: 3px; align="absmiddle"
		$('body').append('\
		<div id="forumAddOnDiv" class="pages">\
			<div class="subPanel">\
				<a href="/leaderboardAll" class="current"><img src="http://static.iogc.org/date.gif">This Month</a></br>\
				<a href="/monthStats" class="notcurrent"><img src="http://static.iogc.org/date_go.gif">Month Archives</a></br>\
				<a href="/careerStat" class="notcurrent"><img src="http://static.iogc.org/coins.gif">Career</a></br>\
			</div>\
			<div class="subPanel"></div>\
			<div class="subPanel">\
				<a href="/blog" class="notcurrent"><img src="http://static.iogc.org/forum.gif">Advisor Blog</a></br>\
				<a href="/discussion" class="notcurrent"><img src="http://static.iogc.org/forum.gif">Discussion</a></br>\
				<a href="/reviews" class="notcurrent"><img src="http://static.iogc.org/user_edit.gif" >Reviews</a></br>\
				<a href="/strategies" class="notcurrent"><img src="http://static.iogc.org/lightning.gif">Strategies</a></br>\
				<a href="/ideas" class="current"><img src="http://static.iogc.org/lightbulb.gif">Ideas</a>\
			</div>\
			<div class="subPanel"></div>\
			<div class="subPanel" style="padding: 6px 0">'+ kmp.pnlinks+'</div>\
		</div>\
		<button id="collapser" style="text-align:right; z-index: 1002;">></button>\
		');
		
		// some styling:
		$('<style type="text/css">\
			#collapser { position: fixed;	top: 0px;	right: 0px; }\
		 	#forumAddOnDiv {	font-size: 13px; position: fixed; bottom: 40%; right: 0px; width: auto; background-color: #E4E6EC; z-index: 1001; }\
			.imgLimit {	max-width: 700px; max-height: 800px; }\
			.subPanel {	border-top: 1px solid #AAA; margin-bottom:5px; padding:5px 0 0 5px; text-align:left;}\
			.signature { border-top: 1px solid #cccccc;	width: auto; height: auto; text-align:center; }\
		</style>').appendTo('head');
		
			$('.menu2 li:eq(0)').clone().prependTo('.subPanel:eq(0)');
			$('.menu2 li:eq(1)').clone().prependTo('.subPanel:eq(1)');
			$('.menu2 li:eq(2)').clone().prependTo('.subPanel:eq(2)');
			$('.menu2 li:eq(4)').clone().prependTo('.subPanel:eq(3)');

    $(".yui-b").css("margin-right","0px").css("width","100%");

	$("#collapser").click(function(){
		var pan = $("#forumAddOnDiv");
		parseInt(pan.css('marginRight'),10) == 0 ? pan.animate({ marginRight:-pan.outerWidth()  },function(){$("#collapser").text( "<");}) : pan.animate({ marginRight: 0 },function(){$("#collapser").text( ">");}) ;
	});
}

kmp.checkmembers= function(str){
    $(str).each(function(ind){
        var href = $(this).attr('href');
        if (href.indexOf("/profile/") != -1) {    
            $.get("http://kdice.com"+ href, function(data){     kmp.callBackMembers(data);       });   
        }
    });
};
kmp.callBackMembers = function(data , elem){
    if ( $(data).find(' [src*=badge_member] ').length > 0)  {
        profnr = $(data).find(".profilemenu .current").attr("href");
        var that = $(".notcurrent").filter(function( index ) {      return  $( this ).attr( "href" ) == profnr;     })
        if (!that.hasClass('membershipped')) {      that.addClass('membershipped').append('<sup style="font-size: 10px;"> m</sup>');    }
    }
};

kmp.showHistory = function(){   //show locally stored games history	---------->	

	if(window.location.href.indexOf("stats")!= -1){	//check if on stats page
		var profileNR = window.location.href.split("/")[4];
		var marray=["","January","February","March","April","May","June","July","August","September","October","November","December"];
	
		var d=new Date();
		var year = d.getYear();
		var yearN = d.getFullYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
		        console.log("nothing?? test 1"+'kmp_'+profileNR+'_y'+year+'_m'+month+"  yy="+yearN)

				
		if(localStorage.getItem('kmp_'+profileNR+'_y'+year+'_m'+month)!= undefined){
			$('#profile').append('<h3>Game History</h3>	<div id="GHcharts"></div> 	<div id="GHtdiv" class="section">	<div id="GHsel">get data from the past:<select><option value="kmp_'+profileNR+'_y'+year+'_m'+month+'">'+yearN+' '+marray[month]+'</option></select>	<button id="GHgo">GO</button>\
			<div style="float:right">\
				 show normal tables:<input type="checkbox" name="vnt" value="norm" />\
				 show tournies:<input type="checkbox" name="vtt" value="tour" /></div><br />\
				</div>	<table id="GHtab" class="wide stats tablesorter"></table></div>');
			$('#GHgo').click(function(){kmp.GHgoshow()});
			
			
			$('#GHtdiv input[name="vtt"]').change(function(){ 	$('#GHtab .list-item').each(function(index) {
   					if( $(this).find('td:eq(1)').text()=="tourney" ) {
						if ($(this).css("display")=="none") { 	$(this).show();
						}else{ 	$(this).hide() 	}
					} 	}); 	});
			$('input[name="vnt"]').change(function(){ 	$('#GHtab .list-item').each(function(index) {
				if( $(this).find('td:eq(1)').text()!="tourney" ) {
						if ($(this).css("display")=="none") { $(this).show();
						}else{ 	$(this).hide() 	}
					} 	}); 	});				 

			for(var i=0;i<localStorage.length;i++){
				var k = localStorage.key(i)
				if(k.indexOf(profileNR) != -1){
	//				console.log("test keys!: "+ k +" m= "+ marray[parseFloat(k.split("_m")[1])] );
					$('#GHsel select').append('<option value='+k+'>20'+k.split("_m")[0].split("_y1")[1]+' '+marray[parseFloat(k.split("_m")[1])]+'</option>')
				}
			}
		}else{ console.log('WTF')   }
        if(localStorage.getItem("kmp_"+profileNR+"_y"+year+"_m"+month) != undefined)	kmp.GHgoshow();
	}
}
kmp.GHgoshow = function(){
	$('#GHtdiv table').hide();
	var keysel = $('#GHsel option:selected').val();
	var dataString = localStorage.getItem(keysel);
	var	dataObject =  eval('(' + dataString +')');
	var size=0,key;	
	for (key in dataObject) {
		if (dataObject.hasOwnProperty(key)==true)   size++;
	}
	
	$('#GHtdiv').append('<table id="GHtab" class="wide stats tablesorter"></table>');
	$('#GHtab').append('<thead> <th>Game</th> <th>Table</th> <th>Color</th> <th>Place</th>  <th>Score</th>  <th>Luck</th>  <th>Rounds</th>  <th>gameTime</th> \
	   <th>avg/dice</th> <th>avgA</th> <th>avgD</th> <th>diceRolled</th>  </thead>');
	$('#GHtab').append('<tbody></tbody>');
	
//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]	[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]	[gametime]	[month, date, game]		[rounds]
//		0	1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16	  17		18		19		20			21
	for(var g=size;g>0;g--){		//	<td></td>
		$('#GHtab tbody').append('<tr class="list-item">\
			<td>'+g+'</td>\
			<td>'+(dataObject["G"+g][0]=="6000"?"tourney":dataObject["G"+g][0])+'</td>\
			<td><div style="margin:0 5px 0 5px; color:'+kmp.colrblock(dataObject["G"+g][1])+'; background-color:'+kmp.colrblock(dataObject["G"+g][1])+'">'+dataObject["G"+g][1]+'</div></td>\
			<td>'+dataObject["G"+g][16]+kmp.suffixer(dataObject["G"+g][16])+'</td>\
			<td><span style="color:#'+(dataObject["G"+g][15]>=0?"080":"800")+'">'+kmp.addComma(dataObject["G"+g][15])+'</span></td>\
			<td>'+dataObject["G"+g][2]+'%</td>\
			<td>'+dataObject["G"+g][20]+'</td>\
			<td>'+kmp.sechms(dataObject["G"+g][17])+'</td>\
			<td>'+Math.round(100*(dataObject["G"+g][6]+dataObject["G"+g][5])/(dataObject["G"+g][8]+dataObject["G"+g][7]))/100+'</td>\
			<td>'+Math.round(100*dataObject["G"+g][5]/dataObject["G"+g][7])/100+'</td>\
			<td>'+Math.round(100*dataObject["G"+g][6]/dataObject["G"+g][8])/100+'</td>\
			<td>'+(dataObject["G"+g][7]+dataObject["G"+g][8])+'</td>\
		</tr>')	
	}
	
}

////############> table changes functions <##############

kmp.tableChanges = function(ps){
    console.log("..tableChanges");
	if(window.location.href.indexOf("kdice.com") != -1){
        var playerstat = ps;
        //adding links panel:	
        $('#forumAddOnDiv').append('<div class="subPanel">\
            <div style="font-size: 11px;"><b>'+"kakku's Stat Improver"+'</b>\
            </br>game threshold: <button id="statSettings" tabindex="0" type="button" class="gwt-Button"  style="font-size:9px; float:right;">X</button></br>\
        </div>');
        $('#statSettings').click(function(){	kmp.thresholdGAmount()	});
			
		// some styling:
		$("<style type='text/css'>\
			.highest {	color: rgb(88, 166, 255); font-weight: bold; font-size: 13;     }\
			.lowest {	color: rgb(255, 0, 0); font-weight: bold; font-size: 12;    }\
			#statAddOnDiv { 	font-size: 13px; position: fixed; bottom: 300px; right: 0px; width: 140px; padding: 5px; background-color: #f0f0f4;  border-top:1px solid #aaa;; z-index: 1001;margin: 3px 0 3px 0; }\
			.totavg { 	border: 1px solid #58A6FF; 	}\
			.curmon { 	border: 1px solid #58FFA6; 	}\
			.odd { 	background:#F2F4F6; 	}\
			#mainpage { 	border-width:0; 	}\
		</style>").appendTo("head");
			
		//#yui-b {	margin-right: auto !important;  }\
       //         .yui-b {    width:100%;     }\
//        .stats {    width: 100%; margin-left: -190px;     }\


//		
//	//	rank	name	score	games 	ppg		kills   dom		att/def		luck	1st ---- 7th 
//	//	0		1		2		3		4		5       6       7           8       9	10		11-12-13-14-15-16-17
//	
		var worst = [	1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1100000000, 1000000, 1000000, 1000000, 1000000, 1010000000, 1010000000, 1100000000, 1100000000, 1100000000, 1010000000, 1000000, 100000, 100000, 100, 100000, 100000, 100000, 1000000];	//	worst or lowest
		var best = [	0,0,0,0,0,0,0,0,0,0,0,0,0,	0,	0,	0,	0,	0,0,0,0,0,0,0,0];	// best OR most
		var winners = [0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0 ];	
		var losers = [0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0 ];	
		
		var minG = (GMO_getValue("kmp_minGames") !=undefined && GMO_getValue("kmp_minGames") != null) ? GMO_getValue("kmp_minGames") : 35;	
		var expTAZD = [7.2, 7.9, 10.2, 14, 17.5, 20.3, 22.9];
	
		
		//repositioning tablehead
		var headers = kmp.statTable.find("tbody tr:first-child").html();
		kmp.statTable.prepend('<thead>'+headers+'</thead>');
		kmp.statTable.find("tbody tr:first-child").remove();
	
		if(GMO_getValue("kmp_statCalc") == "true"){     //todo: this just here?
			kmp.statTable.find('thead tr').append('<th>ASR</th><th>ASRm</th><th>KPPK</th><th>TAZD</th><th>TAZD+</th><th>ersatz</th> <th>ntp</th> <th>kPoints</th>');
		}
		//some styling:
		kmp.statTable.find('thead th').css("padding-left","2px");
		kmp.statTable.css("width","100%").css("margin-left","-120px").css("background-color","#fff");		
			if(window.location.href.indexOf("/monthStats") != -1 || window.location.href.indexOf("/leaderboardAll") != -1){  kmp.statTable.css("margin-left","0px");    };
		
		var totP =0, totG = 0,totM=0,totK=0,totD = 0,totPpg = 0,totA=0,totL=0,totE = 0,totN = 0, tot1=0, tot2=0, tot3=0, tot4=0, tot5=0, tot6=0, tot7=0, totcount=0;
	
		if(playerstat) kmp.statTable.find('tbody tr:first-child').addClass("curmon");
	    
	//get data from table:
		kmp.statTable.find('tbody tr').each(function(index0,tr){	
			var row = $('td',tr).map(function(index, td) {
					//	console.log("...check inrow: "+ $(this).text().replace("%","").replace(/,/g, "").replace("◆", "").replace(".","").replace("st","").replace("nd","").replace("rd","").replace("th",""));
				return parseFloat($(this).text().replace("%","").replace(/,/g, "").replace("◆", "").replace(".","").replace("st","").replace("nd","").replace("rd","").replace("th","") );
	
			});
		
			var sumperc =  (row[9]+row[10]+row[11]+row[12]+row[13]+row[14]+row[15]);        // sum of 1st-7th %'s
			var sum=0, sum2=0, sum3=0;      //	(Sum of (expected %-actual %)squared/expected%) x square root of games x 1000.  --> TAPL TAZD TAZD*
			for (var p=6; p>=0; p--){
				var dif = ( row[p+9] - expTAZD[p] );
				var np = (dif < 0) ? -1 : 1;
	
				sum += Math.pow( ( 14 - row[p+9]), 2) / 14;
				sum2 += Math.pow( ( expTAZD[p] - row[p+9]), 2) / expTAZD[p];
					
				if (p<3){	sum3 += np * ( Math.pow( dif, 2) / expTAZD[p] );
				}else {		sum3 -= np * ( Math.pow( dif, 2) / expTAZD[p] );
				}
			}
			
			//var tapl = Math.floor(10*sum * Math.sqrt(row[3]) / Math.sqrt(sumperc/100) );
			var tazd = Math.floor(10*sum2 * Math.sqrt(row[3]) / Math.sqrt(sumperc/100) );
			var mtazd = (row[3] >= 300) ? Math.floor(10*sum3 * Math.sqrt(300) / Math.sqrt(sumperc/100) ) : Math.floor(10*sum3 * Math.sqrt(row[3]) / Math.sqrt(sumperc/100) );
				
			////	((games*PPG)(4*1st percentage+3*2nd+2*3rd+4th-6th-2*7th)/100)+(games/25) 
			var ASRm = ( (4 * row[9]) + (3 * row[10]) + (2 * row[11]) + (row[12]) - (row[14]) + (-2 * row[15]) ) / 100;
			var ASR = Math.floor( ( ( row[3] * row[4] * ASRm ) / 100 + ( row[3] / 25 ) )  );
			ASRm = Math.floor(ASRm*100)/100;
							
			//// (kill / possible kills ) ==>  kill% = ( ( kills*100 / 	( total possible kills = possible kills per game * games)
			var kill = Math.floor( 	(row[5]*1000  / (		( (row[9]*6 +row[10]*5 + row[11]*4 + row[12]*3 +row[13]*2+ row[14])/sumperc) * 	row[3] 	* 	(sumperc/100) 	) )	)/10;			
	
			////	ERSATZ:		score - ( games * ppg) - (kills*50)
			ersatz =  row[2] - (row[3]*row[4]) - (row[5]*50);
			var killpo = (row[5]*50);	
			var ntp = 	row[3]*row[4];  //normal table points. / not tournie points
				
			//exeptions:
			if(row[3] < 35){
				ASR = "-";
				ASRm ="-";
				tazd="-";
				mtazd="-";
			}
			zkillz =(row[3]==0)? "-" : kill+"%";	
			
			if(playerstat){
				totP += row[2];     //points
				totG += row[3];     //games
				totPpg +=row[4];    //ppg
				totM += row[3]*row[6];     //dom
				totK += row[5];     //kills
				if(row[3]>0) totA += row[9]*row[3];      //
				totL += row[3]*(row[8]);   //luck
				totE += ersatz;
				totN += ntp;
				tot1 += row[3]*(row[9]);
				tot2 += row[3]*(row[10]);
				tot3 += row[3]*(row[11]);
				tot4 += row[3]*(row[12]); 
				tot5 += row[3]*(row[13]);
				tot6 += row[3]*(row[14]);
				tot7 += row[3]*(row[15]);
				totcount++;
			}
	
			if(GMO_getValue("kmp_statCalc") == "true"){     // putting data into table
				$(this).append('<td>'+ASR+'</td><td>'+ASRm+'</td><td>'+zkillz+'</td><td>'+tazd+'</td><td>'+mtazd+'</td> <td>'+kmp.addComma(ersatz)+'◆</td> <td>'+kmp.addComma(ntp)+'◆</td> <td>'+kmp.addComma(killpo)+'◆</td> ');
			}
    
			//checking for best / worst:
			if(row[3] >= minG){
				for (var b=15;b>0;b--){
					if(b<=10 && b>1){
						if(best[b] < row[b] && row[b] > 0 && (row[b] != 100)){      best[b] = row[b]; winners[b] = index0;  }
						if(worst[b] > row[b] && row[b] != 0  ){         worst[b] = row[b]; losers[b] = index0;  }
						//todo: if same as worst/best.
					}else if (b>10 || b==1){
						if(best[b] < row[b] && row[b] > 0 && (row[b] != 100)){      best[b] = row[b]; losers[b] = index0;   }
						if(worst[b] > row[b]  ){ 	worst[b] = row[b]; winners[b] = index0; }
				}
			}
			if(best[16] < ASR) { best[16] = ASR; winners[16] = index0;}
			if(best[17] < ASRm){  best[17] = ASRm; winners[17] = index0;}
			if(best[18] < kill){  best[18] = kill; winners[18] = index0;}
			if(best[19] < tazd){  best[19] = tazd; winners[19] = index0;}
			if(best[20] < mtazd){  best[20] = mtazd; winners[20] = index0;}
			if(best[21] < ersatz){  best[21] = ersatz; winners[21] = index0;}
			if(best[22] < ntp){  best[22] = ntp; winners[22] = index0;}
			
			if(worst[16] > ASR) { worst[16] = ASR; losers[16] = index0;}
			if(worst[17] > ASRm){  worst[17] = ASRm; losers[17] = index0;}
			if(worst[18] > kill){  worst[18] = kill; losers[18] = index0;}
			if(worst[19] > tazd){  worst[19] = tazd; losers[19] = index0;}
			if(worst[20] > mtazd){  worst[20] = mtazd; losers[20] = index0;}
			if(worst[21] > ersatz){  worst[21] = ersatz; losers[21] = index0;}
			if(worst[22] > ntp){  worst[22] = ntp; losers[22] = index0;}
		}
		if(row[3] < worst[3]){ worst[3] = row[3]; losers[3] = index0;}
				
	}); //end of all calculations of extra stats.

		if (playerstat){	// add alltime averages & totals:
			var sumperc2 =  (tot1+tot2+tot3+tot4+tot5+tot6+tot7)/totG;
			var sum=0, sum2=0, sum3=0;
			var ttot = [tot1,tot2,tot3,tot4,tot5,tot6,tot7];
			for (var p=6; p>=0; p--){
				var dif = ( ttot[p] - expTAZD[p] );
				var np = (dif < 0) ? -1 : 1;
	
				sum += Math.pow( ( 14 - ttot[p]), 2) / 14;
				sum2 += Math.pow( ( expTAZD[p] - ttot[p]), 2) / expTAZD[p];
					
				if (p<3){	sum3 += np * ( Math.pow( dif, 2) / expTAZD[p] );
				}else {		sum3 -= np * ( Math.pow( dif, 2) / expTAZD[p] );
				}
			}
			
			var ttazd = Math.floor(10*sum2 * Math.sqrt(totG) / Math.sqrt(sumperc2/100) );
			var tmtazd = (totG >= 300) ? Math.floor(10*sum3 * Math.sqrt(300) / Math.sqrt(sumperc2/100) ) : Math.floor(10*sum3 * Math.sqrt(totG) / Math.sqrt(sumperc2/100) );
				
			//	((games*PPG)(4*1st percentage+3*2nd+2*3rd+4th-6th-2*7th)/100)+(games/25) 
			var tASRm = ( (4 * tot1) + (3 * tot2) + (2 * tot3) + (tot4) - (tot6) + (-2 * tot7) ) / 100;
			var tASR = Math.floor( ( ( totG * totPpg * tASRm ) / 100 + ( totG / 25 ) )  );
			tASRm = Math.floor(tASRm*100)/100;
			
			// (kill / possible kills ) ==>  kill% = ( ( kills*100 / 	( total possible kills = possible kills per game * games)
			var KPPKtot = Math.floor( 	(totK*1000  / (		( ((tot1/totG)*6 +(tot2/totG)*5 + (tot3/totG)*4 + (tot4/totG)*3 +(tot5/totG)*2+ (tot6/totG))/sumperc2) * 	totG 	* 	(sumperc2/100) 	) )	)/10;			
			
			if(GMO_getValue("kmp_statCalc") == "true"){
				kmp.statTable.find('thead').append('<tr class="list-item totavg">\
				<td>lifetime (average)</td>\
				<td>-</td>\
				<td>'+kmp.addComma(totP)+"◆ ("+kmp.addComma(Math.round(totP/totcount))+'◆)</td>\
				<td>'+totG+' ('+Math.round(totG/totcount)+')</td>\
				<td>'+Math.round((totP-totE)/totG)+'</td>\
				<td>'+totK+' ('+Math.round(totK/totcount)+')</td>\
				<td>'+Math.floor(totM/totG)+'%</td>\
				<td>-</td>\
				<td>'+Math.floor(totL/totG)/10+'%</td>\
				<td>'+Math.floor(tot1/totG)+'%</td>\
				<td>'+Math.floor(tot2/totG)+'%</td>\
				<td>'+Math.floor(tot3/totG)+'%</td>\
				<td>'+Math.floor(tot4/totG)+'%</td>\
				<td>'+Math.floor(tot5/totG)+'%</td>\
				<td>'+Math.floor(tot6/totG)+'%</td>\
				<td>'+Math.floor(tot7/totG)+'%</td>\
				<td>-</td>\
				<td>-</td>\
				<td>'+KPPKtot+'%</td>\
				<td>-</td>\
				<td>-</td>\
				<td>'+kmp.addComma(totE)+'◆ ('+ kmp.addComma(Math.round(totE/totcount))+'◆)</td>\
				<td>'+kmp.addComma(totN)+'◆ ('+kmp.addComma(Math.round(totN/totcount))+'◆)</td>\
				<td>-</td>\
				</tr>');
			}
		}
	
	//			<td>'+Math.floor(totA/totG)+' : '+(100-Math.floor(totA/totG))+'</td>\
	//			<td>'+kmp.addComma(Math.round(totM/totcount))+'◆ ('+kmp.addComma(totM)+'◆)</td>\
		
		//highlight highest/lowest
		$.each(losers, function(index, value) { 
			if(index > 1 || playerstat && index ==1){
				kmp.statTable.find('tbody tr:eq('+value+')').find('td:eq('+index+')').addClass('lowest');
			}   
		});
		$.each(winners, function(index, value) { 
			if(index > 1 || playerstat && index ==1){
				kmp.statTable.find('tbody tr:eq('+value+')').find('td:eq('+index+')').removeClass('lowest').addClass('highest');
			}
		});
		//todo have to add killpoints
			
		$('th').click(function(){	//Table Sorting based on example from Nick G on http://stackoverflow.com/questions/3160277/jquery-table-sort 
			var table = $(this).parents('table').eq(0);
			var rows = table.find('tr:gt(0)').toArray().sort( kmp.comparer($(this).index()) );
			this.asc = !this.asc;
			if (!this.asc){rows = rows.reverse()};
			for (var i = 0; i < rows.length; i++){table.append(rows[i])};			
			if (playerstat && kmp.statTable.find('thead').text() == $(this).closest('thead').text() )		$("tr .totavg").insertAfter( table.find('tr:first') );	//put all-time  on top

			kmp.fixZebra(table);
		});    

	}//todo maybe only sort table with most stats OR have all do zebra
};
kmp.comparer = function(index) {
    return function(a, b) {
        var valA = kmp.getCellValue(a, index), valB = kmp.getCellValue(b, index)
        return jQuery.isNumeric(valA) && jQuery.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
    }
};
kmp.getCellValue = function(row, index){ 
    return $(row).children('td').eq(index).html().replace(/,/g, "").replace(/◆/g,"").replace(" ","").replace("%","").replace(":",".").replace("st","").replace("nd","").replace("rd","").replace("th","");
};
kmp.fixZebra = function(table){	//fixing zebra:
	table.find(".list-odd").removeClass('list-odd');  
    table.find('tr:gt(0)').each(function(i){
    	if(i % 2 == 0)   $(this).addClass('list-odd');  
		
    });
};

////############> locally stored data functions <##############

kmp.getMData = function(year,month){
	var dataObject;
	if (localStorage.getItem('kmp_'+kmp.profileNR+"_y"+year+"_m"+month)){
		var dataString = localStorage.getItem('kmp_'+kmp.profileNR+"_y"+year+"_m"+month);
	//	console.log("kmp.getMData dataString= "+dataString+" localkey:"+localStorage.key(1));
		dataObject =  eval('(' + dataString +')');
	}else{
		dataObject ={};
	}
	return dataObject;
};
 //todo rename these GMO's
GMO_deleteValue = function(name) {
    localStorage.removeItem(name);
}

GMO_getValue = function(name, defaultValue) {
    var value = localStorage.getItem(name);
    if (!value)     return defaultValue;
    var type = value[0];
    value = value.substring(1);
    switch (type) {
        case 'b':
            return value == 'true';
        case 'n':
            return Number(value);
        default:
            return value;
    }
}

GMO_setValue = function(name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
};
GMO_openInTab = function(url) {
    return window.open(url, "_blank");
}
GMO_registerMenuCommand = function(name, funk) {
    //todo
}  
kmp.thresholdGAmount = function(){ 
	var minG = (GMO_getValue("kmp_thresholdGames")!=undefined) ? GMO_getValue("kmp_thresholdGames") : 35;
	GMO_setValue("kmp_tresholdGames", prompt("set minimal games threshold to? (takes effect after refresh)", minG) );	
}
////############> other functions <##############

kmp.addComma = function(nStr){	// adds a comma like 1234 => 1,234
	nStr = nStr.toString();
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + "," + '$2');
	}
	return nStr;
}
kmp.suffixer = function(n){	// adds suffix like 2nd or 3rd
	n=n+'';
	var l=n.length, r=parseInt(n.substring(l-2,l)), i = n % 10;
	return ((r < 11 || r > 19) && (i < 4)) ? ['th','st','nd','rd'][i] : 'th';
}
kmp.sechms = function(secs){
	var m = (secs / 60) | 0;
	return (m < 10 ? "0" + m : m) 
		+ "m:"
		+ ( ( secs %= 60 ) < 10 ? "0" + secs : secs)
		+ "s";
}  
kmp.colrblock =function(c){
	var color;
	switch	(c){
		case 0: color = "BF3069";   break;
		case 1: color = "30BF69";	break;
		case 2: color = "9E30BF";	break;
		case 3: color = "cebf30";	break;
		case 4: color = "3069BF";	break;
		case 5: color = "9A6654";	break;
		case 6: color = "30B1BF";	break;
		default: color="ffffff";
	}
	return color;
}



////############> draggable functions <##############


kmp.mdowner = function(event, elem) { //luck panels
	kmp.dragThis = elem;
	$('body').mousemove(function(event){ kmp.mmover(event)});
	$('body').mouseup(function(event){ kmp.mupper(event)});
	clickX=event.pageX;
	clickY=event.pageY;
	itemX = kmp.dragThis.css("left");
	itemY = kmp.dragThis.css("top");
    kmp.Xoffset = clickX - parseFloat(itemX);
    kmp.Yoffset = clickY - parseFloat(itemY);
};
kmp.mmover =function(event) {
	kmp.x=event.pageX - kmp.Xoffset;
	kmp.y=event.pageY - kmp.Yoffset;
	kmp.dragThis.css("left", kmp.x+"px");     
	kmp.dragThis.css("top", kmp.y+"px");
};
kmp.mupper =function() {
	$("body").unbind();
	kmp.dragThis.css("left", kmp.x+"px");
	kmp.dragThis.css("top", kmp.y+"px");
	//store position:
	if(kmp.dragThis.attr("id")=='kmp_BasePanel' ){
		GMO_setValue("kmp_pos1left",kmp.dragThis.css("left"));
		GMO_setValue("kmp_pos1top",kmp.dragThis.css("top"));
	}else if(kmp.dragThis.attr("id")=='kmp_LeftExtra'){
		GMO_setValue("kmp_pos2left",kmp.dragThis.css("left"));
		GMO_setValue("kmp_pos2top",kmp.dragThis.css("top"));		
	}else{
	//	console.log("works not > "+kmp.dragThis.attr("id"))
	}
};
kmp.mdowner2 = function(event) {    //chat stretch
	kmp.pan1 = $('.iogc-MessagePanel-messages') ;
	kmp.pan2 = $('.iogc-ChatPanel-messages') ;
	
	$('body').mousemove(function(event){ kmp.mmover2(event)});
	$('body').mouseup(function(event){ kmp.mupper2(event)});
	clickY=event.pageY;
	itemY1 = kmp.pan1.css("height");
	itemY2 = kmp.pan2.css("height");
    kmp.Yoffset1 = clickY - parseFloat(itemY1);
    kmp.Yoffset2 = clickY - parseFloat(itemY2);
}
kmp.mmover2 =function(event) {
	kmp.y1 = event.pageY -kmp.Yoffset1;
	kmp.y2 = event.pageY -kmp.Yoffset2;
	kmp.pan1.css("height", kmp.y1+"px");
	kmp.pan2.css("height", kmp.y2+"px");
}
kmp.mupper2 =function() {
	$("body").unbind();
	kmp.pan1.css("height", kmp.y1+"px");
	kmp.pan2.css("height", kmp.y2+"px");
	if(kmp.dragThis.attr("id")=='kmp_BasePanel' ){ 	//store position:
		//console.log("test css="+kmp.pan1.css("height"))
		GMO_setValue("kmp_messHght",kmp.pan1.css("height"));
		GMO_setValue("kmp_chatHght",kmp.pan2.css("height"));
	}
	$(".iogc-MessagePanel-messages").scrollTop($(".iogc-MessagePanel-messages")[0].scrollHeight);
	$(".iogc-ChatPanel-messages").scrollTop($(".iogc-ChatPanel-messages")[0].scrollHeight);
}

////############> chart helper-functions <##############

kmp.newScale1 = function(){	//roll history chart toggle all/user	//todo no longer using this.
	if ($('#allNotUser').prop('checked') == "true"){
		kmp.histAllOrUser = true;
	}else if ($('#userNotAll').prop('checked') == "true"){
		kmp.histAllOrUser = false;
	}
	//todo kmp.updateHistBar();
};

kmp.gameCallback = function(){
    console.log("google charts callbacked and ready for game.");
    kmp.gchartsReady = true;
};
kmp.profileCallback = function(){   // add daily progress chart
    var dailyTable = $("h3:contains('Daily Performance')").next(".section");
    myData = [['day', 'points', 'games', 'kills']]
    var d=0,p=0,g=0,k=0;
    $(  dailyTable.find(".list-item").get().reverse() ).each(function(index) {  
        while( parseFloat( $(this).find("td").eq(0).text().split(" ")[1] ) >= d+1 ){ //making sure to start at zero and add empty days
            myData.push( [ d,p,g,k ]);
            d++; 
        }    
        d= parseFloat( $(this).find("td").eq(0).text().split(" ")[1] ); 
        p= parseFloat( $(this).find("td").eq(2).text().replace(/◆/g,"").replace(/,/g, "").replace(".", "") );
        g+= parseFloat( $(this).find("td").eq(3).text() ); 
        k+= parseFloat( $(this).find("td").eq(5).text() );
        myData.push( [ d,p,g,k ])          
    });
    var today = new Date().getDate(); 
    while( d < today ){ //adding more empty days
            myData.push( [ d,p,g,k ]);
            d++; 
    }   
    dailyTable.after( "<div id='kmpMonthGraph' '> google charts failed us :( </div>" );
    kmp.profileDrawChart(myData, dailyTable);
};  
kmp.profileDrawChart = function (myData, dailyTab) {
    var data = google.visualization.arrayToDataTable(myData);
    var options = {
        width: 800, height: 360,
        chartArea: {  top: 20, width: "70%", height: "80%" },
        legend: { position: 'bottom' },
        series:{0:{color:'#4488bb', lineWidth:3, targetAxisIndex:0},
                1:{color:'orange', lineWidth:2, targetAxisIndex:1},
                2:{color:'red', lineWidth:2, targetAxisIndex:1},
        },
        hAxis:  { ticks: [7,14,21,28], minorGridlines: {count: 6}}
    };
    var formatter = new google.visualization.NumberFormat(  {suffix: '◆', pattern:'#,###' });
    formatter.format(data, 1);
    var formatterD = new google.visualization.NumberFormat(  {prefix:  dailyTab.find("td:first").text().split(" ")[0], pattern:' ##' });
    formatterD.format(data, 0);
        
    var chart = new google.visualization.LineChart(document.getElementById('kmpMonthGraph'));
    chart.draw(data, options);
};

////############> other helper-functions <##############

kmp.countSeated = function(){	//count how many ppl sit on a tourney table	//TODO
	var num = 7;
	for(var i=6;i>-1;i--){
		$(".iogc-PlayerPanel"+i).each(function(index) {
			if ($(this).text() == ""){	num--;	}
			console.log("countSeated ["+i +"]: "+$(this).text()+" num="+num);
		})
	}
	return num;
};
kmp.checkSeated = function(){	//check if user is seated on table.
	var bool = false;
	$(".iogc-PlayerPanel-name").each(function(index) {
		if ($(this).text() == kmp.user){	bool= true;}
	})
	return bool;
};
kmp.checkPlayer = function (){	//get playerNR of user
	for(var i=6;i>-1;i--){
		$(".iogc-PlayerPanel"+i).each(function(index) {
			if ($(this).text().indexOf(kmp.user) != -1){
				kmp.playerNR = i;
				kmp.userColor1 = kmp.getColorNR(i,true);
				kmp.userColor2 = kmp.getColorNR(i,false);	
			}
            console.log("checkplayer ["+i +"]: "+$(this).text()+" user:"+kmp.user);
		})
	}
    console.log("kmp.playerNR>>> "+kmp.playerNR);
};
kmp.getNrPlayer = function(con){	
    return con.slice(con.indexOf("span class=")+1).split("")[12];	
};
kmp.getColorNR = function(numb,AorD,WorL){
    var color;
	switch (numb){
		case 0: color = (AorD) ? "BF3069" : "da94a6";   break;
		case 1: color = (AorD) ? "30BF69" : "94cAa6";   break;
		case 2: color = (AorD) ? "9E30BF" : "b894cA";	break;
		case 3: color = (AorD) ? "cebf30" : "d0ca94";	break;
		case 4: color = (AorD) ? "3069BF" : "94a6cA";	break;
		case 5: color = (AorD) ? "9A6654" : "bA9482";	break;
		case 6: color = (AorD) ? "30B1BF" : "a4d0dA";	break;
		case 8:	color =  "CCCCCC";		break;
		default: color="000000";
	}	
	return color;
};

kmp.tagAllRows = function() {
	$(".iogc-MessagePanel-messages tr:not(.km-tagged)").each(function(index) {$(this).addClass("km-tagged")}); 
};

////############> DOM-ready function <################################
$(document).ready(function () {
	
	if (typeof jQuery === "undefined") {
    	console.log("jquery not defined")
	}else if (typeof $ === "undefined") {
    	console.log("$ not defined")
	}
	if(jQuery.fn.jquery != "2.0.3")    jQuery.noConflict();
	console.log("jQuery version ="+jQuery.fn.jquery)

	
//todo place this where needed.
	Object.size = function(obj) { // Get the size of an object	//var size = Object.size(myArray);
		var size = 0, key;
		for (key in obj) {			if (obj.hasOwnProperty(key)) size++;    }
		return size;
	};

	if (window.top != window.self)  return; //-- Don't run on frames or iframes
    
    kmp.checkUD();
    
    if(window.location.href.indexOf(".com/#") != -1 ){  //game
        if(window.location.href.indexOf("kdice.com/#") != -1 || window.location.href.indexOf("kdice.com/kdice/") != -1 ){
        //  if( //todo: luck plugin active ){
                kmp.gchartsReady = false;
                google.load('visualization', '1', {packages:['corechart'], callback: kmp.gameCallback});
        //    }   
            window.setTimeout(kmp.kdiceGameInit, 2400);
        }else if(window.location.href.indexOf("xsketch.com") != -1 ){
            window.setTimeout(kmp.sketchGameInit, 2400)
    
        }else if(window.location.href.indexOf("gpokr.com") != -1 ){
            window.setTimeout(kmp.gpokrGameInit, 2400)
    
        }
    }else{
        if(window.location.href.indexOf("/currentGamePlayer/stats") ){
                google.load('visualization', '1', {packages:['corechart'], callback: kmp.profileCallback});
        }   
        window.setTimeout(kmp.OtherInit, 100)
    }
});

