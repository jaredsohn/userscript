// ==UserScript==
// @name           kakku man's luck chart
// @description    Adds various charts and stats on luck and roll averages.
// @namespace      kdice
// @include        http://kdice.com/*
// @include        http://www.kdice.com/*
// @version        0.12.3
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

kmlc = {}		//namespace
	
kmlc.checkUD = function(dat){
	answer = $(dat).find('.tagline').text().split(">")
	var ver = answer[answer.indexOf('kmlc')+1];
	
	if(kmlc.VERSION != ver){
		if(confirm("version "+ ver +" of kakku man's Luck Charts is available!\nDo you want to upgrade now?"))	window.location = "http://userscripts.org/scripts/source/91990.user.js";
	}
	GM_log("checked for update=="+ver+" ? "+kmlc.VERSION);
}

///////#######> initiate <##################################################################################################################################################
kmlc.init = function() {

//check version:
	kmlc.VERSION = "0.12.3";
	var now = new Date().getTime()
	if(GM_getValue("kmlc_checkUpdate") != undefined && now-parseFloat(GM_getValue("kmlc_checkUpdate")) > 8640000){	//daily check
	
		//GM_log("gonna check for update >"+(now-parseFloat(GM_getValue("kmlc_checkUpdate")))+" ??");

		$.get("http://kdice.com/profile/45032677", function(data){ 		kmlc.checkUD(data); 		});
	}//else if(GM_getValue("kmlc_checkUpdate")==undefined){ 
		GM_setValue("kmlc_checkUpdate", now.toString());
	


	Object.size = function(obj) { // Get the size of an object	//var size = Object.size(myArray);
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
		
if(window.location.href.indexOf("profile")!= -1 && window.location.href.indexOf("stats")!=-1 ){		//check if on stat page.
	GM_log("STAT MODE");	
	kmlc.profileNR = window.location.href.split("/")[4];

	var profileNR = window.location.href.split("/")[4];
	var d=new Date();
	var year = d.getYear();
	var month = d.getMonth()+1;
	
	if(localStorage.getItem("kmlc_"+profileNR+"_y"+year+"_m"+month) != undefined){
		//GM_log("ttteststorage:: "+localStorage.getItem("kmlc_"+profileNR+"_y"+year+"_m"+month) )
		var ppm = kmlc.getPPM();
		var ppmtd = $(".statLine tr:first-child").append('<td>PPM	<div class="lrgStat" id="ppmSTAT">'+ppm+'</div>	</td>');
	
		$(".section:eq(2)").append('<div id="kmlc_GameHistory" style="border-bottom: 1px solid #888888;	padding-bottom: 10px;"><h3><span>Game History Charts</span><div class="line">&nbsp;</div></h3></div>');
		kmlc.addGHchartSection('kmlc_GameHistory', true);
		kmlc.updateGameHist();
	}

}else if( (window.location.href.indexOf("#")== 17 || window.location.href.indexOf("#")== 21 ) && $('.iogc-LoginPanel-nameHeading').text().length>0) { // check if on a table and if logged in
	GM_log("TABLE MODE");

	kmlc.user = $('.iogc-LoginPanel-nameHeading').text();
	kmlc.profileNR = $("#profileLink").html().split("/")[2].split(" ")[0].replace(/"/,"");
	GM_log("init name:"+$('.iogc-LoginPanel-nameHeading').text()+" profileNR:"+kmlc.profileNR);//+" stacks="+kmlc.stackheight[6])
	kmlc.rollStats = [		// set prediction percentages:
	/* def/att   2         3         4         5         6         7         8			9		10		11		12		13		14		15		16
       1  83.79630  97.29938  99.72994  99.98500  99.99964 100.00000 100.00000
       2  44.36728  77.85494  93.92361  98.79401  99.82169  99.98013  99.99834
       3  15.20062  45.35751  74.28305  90.93471  97.52998  99.46634  99.90692
       4   3.58796  19.17010  45.95282  71.80784  88.39535  96.15359  98.95340
       5   0.61050   6.07127  22.04424  46.36536  69.96164  86.23765  94.77315				100
       6   0.07662   1.48786   8.34228  24.24491  46.67306  68.51650  84.38738
       7   0.00709   0.28900   2.54497  10.36260  25.99838  46.91392  67.34556
       8   0.00047   0.04519   0.63795   3.67419  12.15070  27.43755  47.10907															*/
	   
	[83.79630, 44.36728, 15.20062, 3.58796, 0.61050, 0.07662, 0.00709, 0.00047],	//2
	[97.29938, 77.85494, 45.35751, 19.17010, 6.07127, 1.48786, 0.28900, 0.04519],	//3
	[99.72994, 93.92361, 74.28305, 45.95282, 22.04424, 8.34228, 2.54497, 0.63795],	//4
	[99.98500, 98.79401, 90.93471, 71.80784, 46.36536, 24.24491, 10.36260, 3.67419],	//5
	[99.99964, 99.82169, 97.52998, 88.39535, 69.96164, 46.67306, 25.99838, 12.15070],	//6
	[100.0000, 99.98013, 99.46634, 96.15359, 86.23765, 68.51650, 46.91392, 27.43755],	//7	
	[100.0000, 99.99834, 99.90692, 98.95340, 94.77315, 84.38738, 67.34556, 47.10907],	//8
//	[100.0000, ],	//9
//	[100.0000, ],	//10
//	[100.0000, ],	//11
//	[100.0000, ],	//12
//	[100.0000, 100.0000, ],	//13
//	[100.0000, 100.0000, ],	//14
//	[100.0000, 100.0000, ],	//15
//	[100.0000, 100.0000, ]	//16	
	];

	kmlc.clearUserStats();	//set up empty arrays to hold data.	

//infopanel:
	var panel = $('<div style="margin-top: 10px;"></div>');
	var sidepanel = $('<div class="iogc-SidePanel-inner"></div>').appendTo(panel);
	$('<span style="font-size: 1.3 em;"><b>Luck Plugin</b></span>').appendTo(sidepanel);
	$('<a href="http://userscripts.org/scripts/source/91990.user.js" style="float:right" title="Version of this GM script, click to check for a new version." >'+kmlc.VERSION+'</a>').appendTo(sidepanel); 
	$('<br/><span><b>Watching</b>: <input type="checkbox" id="luckMode" /></span>').appendTo(sidepanel);
	$('<span> <b>Extend</b>: <input type="checkbox" id="extraMode" /></span>').appendTo(sidepanel);
	$("<button id='kmlc_settings' tabindex='0' type='button' class='gwt-Button' style='font-size:11px; float:right; padding:1px'>X</button>").appendTo(sidepanel);
	$('#iogc-PlayerPanel').after(panel);

	$('input[id="extraMode"]').change(function(){	kmlc.moreChartsToggle();	});
	$("#kmlc_settings").click(function() {	kmlc.showHideForm();	});

	kmlc.addSettings();
	
//// setup main chart panel:
	if(GM_getValue("kmlc_pos1top")!=undefined) {
		$('body').append('<div id="kmlc_BasePanel" style="z-index:11; position:fixed; top:'+GM_getValue("kmlc_pos1top")+'; left:'+GM_getValue("kmlc_pos1left")+'; width:200px; height:auto; background-color:#f0f0f0; border: 1px solid #888888; 	text-align:center; font-size:11px; padding:5px; "><div id="kmlc_drag1" style="border-bottom: 1px solid #AAAAAA; margin-bottom:5px; font-size:9px;">Draggable Area</div></div>');
	}else{
		$('body').append('<div id="kmlc_BasePanel" style="z-index:11; position:fixed; top:89px; left:1230px; width:200px; height:auto; background-color:#f0f0f0; border: 1px solid #888888; 	text-align:center; font-size:11px; padding:5px; "><div id="kmlc_drag1" style="border-bottom: 1px solid #AAAAAA; margin-bottom:5px; font-size:9px;">Draggable Area</div></div>');
	}
	$('#kmlc_drag1').mousedown(function(event){ kmlc.mdowner(event, $('#kmlc_BasePanel') )});
	$('#kmlc_drag1').mouseover(function(){ $('#kmlc_drag1').css("cursor","move")});

//// empty charts for startup
	var empty1 = "http://chart.apis.google.com/chart?chxl=1:||||players||||all|grey&chxr=0,0,100|1,1,9&chds=0,100&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=13,0,6&chs=200x120&cht=bvg&chco=BF3069|30BF56|9E30BF|ffdd44|3039BF|BF8630|30B1BF|666666|CCCCCC&chd=t:50,50,50,50,50,50,50,50,50&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=(1)+Luck+Percentage&chts=000000,11";
	var empty2 = "http://chart.apis.google.com/chart?chxl=0:|6|3.5|1|3.5|6&chxr=0,-6,6&chxs=0,333333,9,0,l,333333&chxt=y&chbh=a,1,1&chs=200x150&cht=bvs&chco=333333,888888,333333,888888&chds=-5,5,-5,5,1,8,1,8&chd=t2:2.5|-2.5|1|1&chg=20,0,2,2&chma=0,0,0,30&chm=h,333333,0,0.5:0.5,1|N,000000,2,-1,10,1|N,000000,3,-1,10,1|h,666666,0,0.25:0.25:1,1,-1|h,666666,0,0.75:0.75,1,-1&chtt=(2)+Roll+History&chts=000000,11";
	var empty3 = "http://chart.apis.google.com/chart?chxl=1:||||players|||all|grey&chxr=0,1,6|1,1,9&chxs=0,000000,11,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=8,0,7&chs=200x120&cht=bvg&chco=BF3069|30BF56|9E30BF|E1F038|3039BF|BF8630|30B1BF|333333,BA8496|84BA96|A884BA|BABA84|8484BA|BA9684|84BABA|666666|CCCCCC&chds=1,6,1,6&chd=t:3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5|3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=average+of+att%2Fdef+rolls&chts=000000,12";

	$('#kmlc_BasePanel').append('<img id="chart1R" src='+empty1+'></img>');
	$('#kmlc_BasePanel').append('<img id="chart2R" src='+empty2+'></img>');
	$('#kmlc_BasePanel').append('<div id="divbox1R"><form id="avgScale1R"> all:<input type="radio" name="scale1" id="allNotUser" value="1" /> user:<input type="radio" name="scale1" id="userNotAll" value="2" /></form></div>');
	$("#avgScale1R").click( kmlc.newScale1);
	$("#allNotUser").prop('checked', true);		
	kmlc.newScale1();
	$('#kmlc_BasePanel').append('<img id="chart3R" src='+empty3+'></img>');

// some CSS-styling:
	$("<style type='text/css'>\
		#kmlc_LeftExtra {	font-size: 9px; position: absolute; top: 89px; left: 10px; width: 200px; height: auto; border-style: solid; border-width: 1px; border-color: #888888; padding: 5px; background-color: #f0f0f0; z-index: 1001; color: #000000; 	}\
		#kmlc_LeftExtra img { 	border-top: 1px solid #888888; padding-bottom: 5px;	}\
		#kmlc_BasePanel img { 	border-top: 1px solid #888888; padding-bottom: 5px;	 }\
	</style>").appendTo("head");
//extended:
	if(GM_getValue("extendToggle")){
		$('#extraMode').prop('checked', true);
		kmlc.addExtend();
	}
		
	var SPEED = (GM_getValue("kmlc_speed")!=undefined) ? GM_getValue("kmlc_speed") : 1500;
		
	if ($(".iogc-GameWindow-status").text().indexOf("running") !=-1 && kmlc.checkSeated() )	{ //refresh when seated and game is running
		kmlc.gameStatus = "corrupt";	// NB even after refresh while playing
		$('#luckMode').prop('checked', true);
		kmlc.dataCorrupted = true;
		GM_log("CORRUPT data , refreshed during game: "+kmlc.dataCorrupted+" game="+kmlc.gameStatus+" -> watcher checkbox checked: "+$('#luckMode').prop('checked'));
	}else{	//not seated or not 
		kmlc.gameStatus = "ibg";
		kmlc.dataCorrupted = false;
	}
	
	GM_log("kmlc initiated succesfull. speed = "+SPEED+" ud:"+ GM_getValue("kmlc_tester") );
		
///////############> main loop <############################################################################################################################						
	kmlc.tempScore = 0;
	kmlc.loop = window.setInterval( function() {
	
	if (kmlc.gameStatus != "ingame" ){//|| $('#luckMode').prop('checked')==false ){	// ?? why the luckBox ?
		
	//	GM_log("lol >"+$('#luckMode').prop('checked')+" > "+kmlc.gameStatus)

		if($('.iogc-LoginPanel-nameHeading').text().length < 1) { 	//check if user is logged out
			kmlc.gameStatus = "corrupt";
			GM_log("logged out, gameStatus= "+kmlc.gameStatus);		
			return;
		}
		if($(".iogc-GameWindow-status").length < 1){
			kmlc.gameStatus = "corrupt";
			GM_log("opened table in another window?, gameStatus= "+kmlc.gameStatus);		
			return;
		}
		
		kmlc.userStatus = $(".iogc-LoginPanl-item:eq(1)").text();	//	(watching) / (playing)
		kmlc.tableStatus = $(".iogc-GameWindow-status").text();//.split(" ");	// kmlc.tableStatus[7] ==> waiting / running / paused 	
	
		if (kmlc.user != $('.iogc-LoginPanel-nameHeading').text()){	//check if user is still same user
//			kmlc.gameStatus = "corrupt";
			//GM_log("user is different: "+kmlc.gameStatus);		
			kmlc.clearUserStats();					
			kmlc.user = $('.iogc-LoginPanel-nameHeading').text();	//set new user:
			kmlc.profileNR = $("#profileLink").html().split("/")[2].split(" ")[0].replace(/"/,"");
			if (kmlc.userStatus == "(playing)"){	//data could be incomplete so:
				$('#luckMode').prop('checked', true);	//keeps showing stuff anyway
				//kmlc.gameStatus = "corrupt";
				kmlc.dataCorrupted = true;		//but it wont be stored.
				GM_log("different user -> "+kmlc.gameStatus+ " -> data corrupted: "+kmlc.dataCorrupted);	
			}
		
		}else if (kmlc.gameStatus == "ibg"){		//prepare playing:
			if (kmlc.userStatus == "(playing)"){
				if( kmlc.checkSeated() ){
					kmlc.location = window.location.href;
					if( kmlc.tableStatus.indexOf("paused") != -1 || kmlc.tableStatus.indexOf("waiting") != -1 ){//tournament or normal didn't start yet
					//if( kmlc.tableStatus[9] == "paused" || kmlc.tableStatus[6] == "waiting" ){//tournament or normal didn't start yet
						kmlc.dataCorrupted = false;				
						kmlc.clearUserStats();
						kmlc.tagAllRows();	// dont care about old stuff..
						kmlc.gameStatus = "seated";
				GM_log("waiting for game to start: ibg -> "+kmlc.gameStatus+" ,corrupt= "+kmlc.dataCorrupted);	
					}else if (kmlc.tableStatus.indexOf("running") != -1 || kmlc.tableStatus.indexOf("running") != -1 ){	//game started straight away.
					//}else if (kmlc.tableStatus[7] == "running" || kmlc.tableStatus[9] == "running" ){	//game started straight away.
						kmlc.gameStatus = "ingame";
						kmlc.checkPlayer();
						kmlc.startTime = new Date().getTime(); // set start time
				GM_log("start playing (1) -> "+kmlc.gameStatus+" corrupt: "+kmlc.dataCorrupted+" NR:"+kmlc.playerNR);	
						$('#luckMode').prop('checked', false);
						if (kmlc.tableStatus.indexOf("tournament") > 0){	//count players sitting:
							kmlc.normalTable = kmlc.countSeated();
						}else{
							kmlc.normalTable = 0;
						}
						GM_log("1 kmlc.normalTable== "+kmlc.normalTable);
					}else{	// this shouldnt happen.
						GM_log("WTF? playing seated and ibg= "+kmlc.gameStatus+"  kmlc.tableStatus= "+ kmlc.tableStatus);	
					}
				}else{ // sitStatus false. // possible seated at tourney, but not there yet.
						GM_log("playing= "+kmlc.userStatus+" during:"+ kmlc.gameStatus+", but not seated? "+ kmlc.checkSeated());	
				}
			}
		} else if( kmlc.gameStatus=="seated"){
			if (kmlc.tableStatus.indexOf("running") != -1 ||  kmlc.tableStatus.indexOf("running") != -1 ){		//game starts
			//if (kmlc.tableStatus[7] == "running" ||  kmlc.tableStatus[9] == "running"){		//game starts
				kmlc.gameStatus = "ingame";
				kmlc.checkPlayer();
				kmlc.startTime = new Date().getTime(); // set start time
				kmlc.dataCorrupted = false;				
		GM_log("start playing (2) seated==> "+kmlc.gameStatus+" NR:"+kmlc.playerNR);	
				$('#luckMode').prop('checked', false);
				if (kmlc.tableStatus.indexOf("tournament") > 0){	//count players sitting:
					kmlc.normalTable = kmlc.countSeated();
				}else{
					kmlc.normalTable = 0;
				}
						GM_log("2 kmlc.normalTable== "+kmlc.normalTable);
			}else if (!kmlc.userStatus == "(playing)" || !kmlc.checkSeated() ){
				kmlc.dataCorrupted = true;				
				kmlc.gameStatus = "ibg";
				GM_log("you are seated elsewhere.. CORRUPT data, wrong location while playing: "+kmlc.gameStatus+" userStatus= "+kmlc.userStatus +"seated= "+kmlc.checkSeated());	
			}else{
				//GM_log("status=seated but not running and not playing ?: "+kmlc.gameStatus);		

				$('.iogc-MessagePanel-messages tr:not(.tagged)').each(function(index) {
					$(this).addClass('tagged');
					if($(this).text().indexOf(kmlc.user+" takes a seat") != -1) {			//// clear userdata when sitting down.
						kmlc.dataCorrupted = false;				
						kmlc.clearUserStats();
					}else if($(this).text().indexOf(kmlc.user+" stands up") != -1) {
						kmlc.gameStatus = "ibg";
						GM_log("user stands up: "+kmlc.gameStatus);		
						kmlc.dataCorrupted = false;				
					}
				})
			}
		}else if (kmlc.gameStatus == "corrupt"){
			if (!kmlc.checkSeated() && !kmlc.userStatus == "(playing)"){
				kmlc.gameStatus = "ibg";	
				GM_log("gameStatus= "+kmlc.gameStatus);
			}
//			kmlc.luckBox().checked = true;		//keeps showing stuff anyway

		}else{
			GM_log("wtf is happening??? ");//+window.location.href+" }{ "+ tableName.replace(/ /g,"%20")+" }{ "+ kmlc.location+" }{ "+ kmlc.userStatus+" }{ "+ kmlc.tableStatus+" }{ "+sitStatus);
		
		}
	}
///////#####################################################################> ingame LOOP
			
	if (kmlc.gameStatus =="ingame" || $('#luckMode').prop('checked') ){
		if(window.location.href != kmlc.location && kmlc.gameStatus =="ingame"){;//|| (window.location.href.indexOf(tableName.replace(/ /g,"%20"))== -1 && kmlc.tableStatus[9] != "<b>paused</b>")) {		//visiting other tables while playing -> data could be incomplete/corrupted		//this also counts for multitabling..
			kmlc.dataCorrupted = true;	
			kmlc.gameStatus = "corrupt";	
			//GM_log("please refresh or game-data won't be saved. problem with tablename");
			GM_log("data CORRUPTED, wrong location while gameStatus= "+kmlc.gameStatus+" | "+window.location.href+" | "+ kmlc.location);//+" | "+ tableName.replace(/ /g,"%20")+ " | "+ kmlc.userStatus+" | "+ kmlc.tableStatus+" | "+sitStatus);
		}
		var trigger=false;
		$('.iogc-MessagePanel-messages tr:not(.tagged)').each(function(index) {
			$(this).addClass('tagged');
			var content = $(this).text();
			var html = $(this).html();
	
			if( (content.indexOf("defeated") != -1 || content.indexOf("defended") != -1)) {		//// new roll	==> get number of defending player >> get data of roll
				 if (content.indexOf("neutral") == -1 ){
					kmlc.defPlayerNr = parseFloat(html.slice(html.indexOf("span class=")+1).split("")[12]);//kmlc.getNrPlayer(node.innerHTML));		//number									
				}else if (content.indexOf("neutral") != -1 ){
					kmlc.defPlayerNr = 8;		//number									
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
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD);

				kmlc.lastRoll= new Array(parseFloat(tkst2[0]),  parseFloat(tkst2[2]),  kmlc.attPlayerNr,  kmlc.defPlayerNr,  parseFloat(results[0]),  parseFloat(results[1]),  WLD);				

//	GM_log("testing highlights:: "+content+" >>>> "+html+" >>>"+$(this).not('span').text());
				//bigger number above 40
				var SS = (kmlc.tableStatus.split(" ")[6] == 16) ? 2 : (kmlc.tableStatus.split(" ")[6] == 4) ? .5 : 1 ;
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


				kmlc.updateStats();	////	 update all data / charts:
				trigger=true;
			}else if(content.indexOf("dice") != -1) {		//// end of turn	
			
			}else if(content.length <=0) {		//// seperator line	
				//GM_log("track node:"+node.innerHTML);
			}else if(content.indexOf("'s turn") != -1) {		//// new player turn -> get number of attacking player:		
				//kmlc.currentPlayer = node.getElementsByTagName("span")[0].innerHTML;	//=string
				kmlc.attPlayerNr = parseFloat(html.slice(html.indexOf("span class=")+1).split("")[12]);//kmlc.getNrPlayer(node.innerHTML));		//number									
			}else if(content.indexOf("Score") != -1) {	//save score
				kmlc.tempScore = parseFloat(content.split(" ")[3].replace("+",""));	
			}else if(content.indexOf(kmlc.user +" finishes") != -1) {	//player is out
 				if(kmlc.gameStatus=="ingame" && !kmlc.dataCorrupted){
					 
					if(kmlc.tableStatus.indexOf("tournament") == -1){	// normal tables	> store score, place , rounds			
						GM_log("game over (1)"+kmlc.tableStatus.split(" ")[2]+" | "+ kmlc.tempScore+" | "+ 	content.split(" ")[(content.split(" ").indexOf("finishes")+1)]+" | "+ 	content.split(" ")[(content.split(" ").indexOf("round")+1)]);
						kmlc.storeMData( kmlc.tempScore, 	content.split(" ")[(content.split(" ").indexOf("finishes")+1)], 	content.split(" ")[(content.split(" ").indexOf("round")+1)]);
					}else if(kmlc.tableStatus.indexOf("tournament") != -1){	//tourney tables > store payout, place , rounds		
						kmlc.tempScore = 0;
						var place = content.split(" ")[(content.split(" ").indexOf("finishes")+1)];
							$('.iogc-MessagePanel-messages tr:not(.tagged)').each(function(index) {
							var content2 = $(this).text();
							if(content2.indexOf(kmlc.user+" finishes the tournament") != -1) {
								var place = content2.split(" ")[(content2.split(" ").indexOf("tournament")+1)];
								kmlc.tempScore = 0 - parseFloat($(".iogc-info:first-child").text().split("◆")[0]);			
								if(content2.indexOf("and wins") != -1) {
									kmlc.tempScore += parseFloat(content2.split(" ")[(content2.split(" ").indexOf("wins")+1)].replace(",","").replace("◆",""))
								}
							}
						})
					
						GM_log("game over (2)"+kmlc.tableStatus.split(" ")[2]+" | "+ kmlc.tempScore+" | "+ 	content.split(" ")[(content.split(" ").indexOf("finishes")+1)]+" | "+ 	content.split(" ")[(content.split(" ").indexOf("round")+1)]);
						kmlc.storeMData( kmlc.tempScore, 	place, 	content.split(" ")[(content.split(" ").indexOf("round")+1)]);
					}
				}
				
				//i could set gamestatus to ibg here ? why didnt i ?
			}else if(content.indexOf(kmlc.user+" takes a seat") != -1) {			//// clear userdata when sitting down.
				kmlc.dataCorrupted = false;				
				kmlc.clearUserStats();
			}else if(content.indexOf(" takes a seat") != -1 && $('#luckMode').prop('checked')) {			//// clear userdata when somebody sits down and you are watching.
				kmlc.clearUserStats();
			}else if(content.indexOf(kmlc.user+" stands up") != -1) {
				kmlc.gameStatus = "ibg";
				kmlc.dataCorrupted = false;			
			}else if(content.indexOf("flags for") != -1) {	//someone flags
				var rgbString =  $(this).find("span").css('color');//"rgb(0, 70, 255)"; // get this in whatever way.
				var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);// parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
				delete (parts[0]);
			//GM_log("parts=="+parts)
				for (var i = 1; i <= 3; ++i) {
					//GM_log("part[i]s=="+parts[i]+"==>"+(parseFloat(parts[i])+80))
				    parts[i] = parseInt(parseFloat(parts[i])+40).toString(16);
				    if (parts[i].length == 1) parts[i] = '0' + parts[i];
				}
				var hexString = parts.join(''); // "0070ff"
				$(this).css("background-color",hexString).css("color","#fff");

			}else if(content.indexOf("sits out") != -1) {	//someone flags
				$(this).css("background-color","#ddd");
			}				
			
		})
		if(trigger){
			kmlc.updateBars();
			trigger = false;	
		}
		
	}
	
	}, SPEED)//1500)	//setting this to 100 causes major lag ingame.?? at least it did once for me.. 
}
}//end of main loop

///////##########################################################################################################################################> updateStats						
kmlc.updateStats = function(){
// simple mode:
	kmlc.updateLuckStats();	//chart1R data
	kmlc.updateADavgStat();	//chart3R data
	
	kmlc.updateHistData();	//chart2R data
	
	kmlc.updateWLDdata();	//just data for chart4L ,also for game history
	
	//kmlc.earlyRoundStat();
	kmlc.eightStat();
	
//extended mode:						
	if(GM_getValue("extendToggle")){
		//for (a=0;a<kmlc.lasRoll.length;a++){	//TODO
			kmlc.updatePMrollsStat();	//bar1/2L data
			
			if (kmlc.lastRoll[3] == kmlc.playerNR || kmlc.lastRoll[2] == kmlc.playerNR){	
				kmlc.userColor1 = kmlc.getColorNR(kmlc.playerNR,true);
				kmlc.userColor2 = kmlc.getColorNR(kmlc.playerNR,false);
				kmlc.updateAvgRollStat();	//chart4Re
				kmlc.updateAvgADperDiceStat();	//chart5Re
			}
		//}
	}
}//end of updateStats
kmlc.updateBars = function(){
// simple mode:
	kmlc.updateLuckBar();	//chart1R bar
	kmlc.updateADavgBar();	//chart3R bar 
	
	kmlc.updateHistBar();	//chart2R bar
	
//extended mode:						
	if(GM_getValue("extendToggle")){
		//for (a=0;a<kmlc.lasRoll.length;a++){	//TODO
			kmlc.updatePMrollsBar();	//bar1/2L
			kmlc.luckNAD();		//chart3L bar 
			
			if (kmlc.lastRoll[3] == kmlc.playerNR || kmlc.lastRoll[2] == kmlc.playerNR){	
				kmlc.userColor1 = kmlc.getColorNR(kmlc.playerNR,true);
				kmlc.userColor2 = kmlc.getColorNR(kmlc.playerNR,false);
				kmlc.updateAvgRollBar();	//chart4Re
				kmlc.updateAvgADperDiceBar();	//chart5Re
			}
			kmlc.updateWLDbar();	//chart4L bar
			//kmlc.eightBar();	//chart5L bar
		//}
	}
}//end of updateStats
						
///////########################################################################################			
kmlc.clearUserStats = function(){
	//luck all players
	kmlc.playerLuck =[  [ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ]  ];	
	
	//average per dice user
	kmlc.AvPeDiU = [  [ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0] ], [ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0] ]  ];
	
	//average per roll all players
	kmlc.playerAvgDice=[	[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	,[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	];

	// plus/minus rolls:	
	kmlc.pmRollsArray = [ [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ],[ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ] ];
	
	//average for each roll user only
	kmlc.avgPerAttDefArray =	[	[	[1,2,3,4,5,6,7,8], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	], [	[1,2,3,4,5,6,7,8], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	]	];
	
	//history bar
	kmlc.WLDarray = [ [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0], [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0] ];
	kmlc.HistColA = new Array();
	kmlc.HistColD = new Array();
	kmlc.HattBar = new Array();
	kmlc.HdefBar = new Array();
	kmlc.HattDice = new Array();
	kmlc.HdefDice = new Array();
	//history bar user only:
	kmlc.HistColAU = new Array();
	kmlc.HistColDU = new Array();
	kmlc.HattBarU = new Array();
	kmlc.HdefBarU = new Array();
	kmlc.HattDiceU = new Array();
	kmlc.HdefDiceU = new Array();

	//counting 8v8's:
	kmlc.eights =	[		[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	,	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0],		 [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]		];
	//first round luck:
	kmlc.earlyRound = new Array();
					
}
kmlc.resetAllData = function(){
	if (confirm("This will delete all your monthly game data on this account. This can't be undone. Are you sure you wanna do this?") ){
		GM_log("all data of this month is deleted");
		kmlc.removeCookie();
		kmlc.clearUserStats();
		
		var d = new Date();
		var year = d.getYear();
		var month = d.getMonth()+1;
		localStorage.removeItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month); //reset localStorage for the month.	
	}
}

///////############> STAT page stuff <############################################################################################################################
kmlc.getPPM = function(){
	var d=new Date();
		var year = d.getYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
	var MDataObj = kmlc.getMData(year,month);
	var gameAmount = Object.size(MDataObj);
	var totTime=0, totPoints=0, tourneyTime=0;
	for (var g=gameAmount; g>0; g--){
		//GM_log("test 15 17 == "+MDataObj["G"+g][15]+" <> "+MDataObj["game"+g][17] );
		if (MDataObj["G"+g][17] > 0){
			if(MDataObj["G"+g][0] != 6000){		
				if (tourneyTime>0){
					totTime += tourneyTime;
					totPoints += MDataObj["G"+g][15];		
				}
				tourneyTime = 0;
				totTime += MDataObj["G"+g][17];
				totPoints += MDataObj["G"+g][15];	
			}else if(MDataObj["G"+g][0] == 6000){	//tourney	 wait for payout.. :P
				tourneyTime += MDataObj["G"+g][17];
				if(MDataObj["G"+g][15] != 0){
					totTime += tourneyTime;
					totPoints += MDataObj["G"+g][15];
				}
			}
		}
	}
	var PPM = Math.floor(totPoints/(totTime/60));
	return PPM;
}
kmlc.updateGameHist = function(){
	if(window.location.href.indexOf("stats")!= -1){	//check if on stats page
		var chartlen = 800;
		var charthght = 150;
	}else{
		var chartlen = 200;
		var charthght = 100;
	}
	
	var d=new Date();
		var year = d.getYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
	var MDataObj = kmlc.getMData(year,month);
	var gameAmount = Object.size(MDataObj);



//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]	[gametime]	[month, date, game]
//					0												1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16	  17		18		19		20
	var sel1 = $('#GameHistSelection1').val();	//	1	/	4	/	7	/	8	/	9
	var sel2 = $('#GameHistSelection2').val();	//	8000=all	7000=tables		6000=tourneys	 5000 ... 0
	var sel3 = $('#GameHistSelection3').val();	//	colors/playernr:  0 1 2 3 4 5 6 7	all: 10
	var num = $("#numberMode").prop('checked');	//on/off

	var colors = new Array();
	var colors2 = new Array();
	var tempArray = new Array();
	var tempArray2 = new Array();
	var tempArray3 = new Array();
	var tempArray4 = new Array();
	var tempArray5 = new Array();
	var tempArray6 = new Array(); var tempArray10= new Array(); var tempArray11= new Array(); var tempArray12 = new Array();
///////############> <#######################################################################################################################						
	if (sel1 == 1){		//luck:
		var maxL= 0;	var minL= 100;
		//for (var g=gameAmount; g>0; g--){
		for (var g=1; g<=gameAmount; g++){
			if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
				if (MDataObj["G"+g][2] > 0){
					if (MDataObj["G"+g][2] > maxL) maxL=MDataObj["G"+g][2];
					if (MDataObj["G"+g][2] < minL) minL=MDataObj["G"+g][2];
				}	
				tempArray.push(MDataObj["G"+g][2]);
				if (MDataObj["G"+g][3] > 0){
					if (MDataObj["G"+g][3] > maxL) maxL=MDataObj["G"+g][3];
					if (MDataObj["G"+g][3] < minL) minL=MDataObj["G"+g][3];
				}	
				tempArray2.push(MDataObj["G"+g][3]);
				if (MDataObj["G"+g][4] > 0){
					if (MDataObj["G"+g][4] > maxL) maxL=MDataObj["G"+g][4];
					if (MDataObj["G"+g][4] < minL) minL=MDataObj["G"+g][4];
				}	
				tempArray3.push(MDataObj["G"+g][4]);
				
				tempArray10.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11] ));
				tempArray11.push( (MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
				tempArray12.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11]+MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
				
				colors.push(kmlc.getColorNR(MDataObj["G"+g][1],true));
				colors2.push(kmlc.getColorNR(MDataObj["G"+g][1],false));
			}
		}

	if (minL > (100-maxL)) {	maxL = Math.ceil(maxL/5)*5;		minL = 100-maxL;
	}else if (minL < (100-maxL)) {	minL = Math.floor(minL/5)*5;	maxL = 100-minL;	}
		
	if (!num){
		var gameHistBar ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+(charthght+20)+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t:"+ tempArray.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=game+history%3A+luck+percentages&chts=000000,11";
		
		var gameHistBar2 ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t:"+ tempArray2.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
		
		var gameHistBar3 ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t:"+ tempArray3.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
	}else if (num){
		var gameHistBar ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+","+0+","+999+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+(charthght+20)+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t1:"+ tempArray.slice(-30)+"|"+ tempArray12.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,666666,0,0.5:0.5,1,-1&chtt=game+history%3A+luck+percentages&chts=000000,11";
		
		var gameHistBar2 ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+","+0+","+999+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t1:"+ tempArray2.slice(-30)+"|"+ tempArray10.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,666666,0,0.5:0.5,1,-1";
		
		var gameHistBar3 ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+","+0+","+999+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t1:"+ tempArray3.slice(-30)+"|"+ tempArray11.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,666666,0,0.5:0.5,1,-1";
	
	}
	

///////############> <#######################################################################################################################						
	}else if (sel1 == 4){		//avg:
			//for (var g=gameAmount; g>0; g--){
			for (var g=1; g<=gameAmount; g++){
				if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
					if (MDataObj["G"+g][7]>0){	tempArray.push(MDataObj["G"+g][5]/MDataObj["G"+g][7]);	}else{ tempArray.push(0);}
					if (MDataObj["G"+g][8]>0){	tempArray2.push(MDataObj["G"+g][6]/MDataObj["G"+g][8]);	}else{ tempArray2.push(0);}
					if (MDataObj["G"+g][7]+MDataObj["G"+g][8]>0){ tempArray3.push( (MDataObj["G"+g][5]+MDataObj["G"+g][6])/(MDataObj["G"+g][7]+MDataObj["G"+g][8]) ); }else{ tempArray3.push(0);}
					colors.push(kmlc.getColorNR(MDataObj["G"+g][1],true));
					colors2.push(kmlc.getColorNR(MDataObj["G"+g][1],false));
					
					tempArray10.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11] ));
					tempArray11.push( (MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
					tempArray12.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11]+MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
				}
			}
		
		//scale:	
		var maxR= 0; var minR= 100;
		for(r=6;r>-1;r--){
		//for(r=0;r<7;r++){
			if(tempArray[r]>0){
				if (tempArray[r] > maxR) maxR=tempArray[r];
				if (tempArray[r] < minR) minR=tempArray[r];	
			}
			if(tempArray2[r]>0){
				if (tempArray2[r] > maxR) maxR=tempArray2[r];
				if (tempArray2[r] < minR) minR=tempArray2[r];	
			}
			if(tempArray3[r]>0){
				if (tempArray3[r] > maxR) maxR=tempArray3[r];
				if (tempArray3[r] < minR) minR=tempArray3[r];	
			}
		}
		
		if (minR > (7-maxR)) {
			maxR = Math.ceil(maxR*2)/2;
			minR = 7-maxR;
		}else if (minR < (7-maxR)) {
			minR = Math.floor(minR*2)/2;
			maxR = 7-minR;
		}
		if (!num){
			var gameHistBar= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+(chartlen+20)+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+minR+","+maxR+"&chd=t:"+tempArray3.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=game+history%3A+roll+averages&chts=000000,12";
			var gameHistBar2= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+minR+","+maxR+"&chd=t:"+tempArray.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
			var gameHistBar3= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+minR+","+maxR+"&chd=t:"+tempArray2.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
		
		}else if (num){
		
			var gameHistBar= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+(charthght+20)+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+0+","+999+"&chd=t1:"+tempArray3.slice(-30)+"|"+ tempArray12.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,aaaaaa,0,0.5:0.5,1,-1&chtt=game+history%3A+roll+averages&chts=000000,12";
		
			var gameHistBar2= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+0+","+999+"&chd=t1:"+tempArray.slice(-30)+"|"+ tempArray10.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,aaaaaa,0,0.5:0.5,1,-1";
		
			var gameHistBar3= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+0+","+999+"&chd=t1:"+tempArray2.slice(-30)+"|"+ tempArray11.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,aaaaaa,0,0.5:0.5,1,-1";
		
		}
		
///////############> <#######################################################################################################################						
	}else if (sel1 == 7){		//WLD:
		var tempArray4= new Array(); var tempArray5= new Array(); var tempArray6= new Array(); var tempArray7= new Array(); var tempArray8= new Array(); var tempArray9 = new Array(); var tempArray9D = new Array();
	
		var tota,maxa,totd,maxd,tots,maxs;
//			if (sel2 > 6000){
			//for (var g=gameAmount; g>0; g--){
			for (var g=1; g<=gameAmount; g++){
				if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
					tota =  (MDataObj["G"+g][9] +MDataObj["G"+g][10]+ MDataObj["G"+g][11] > 20) ? (MDataObj["G"+g][9] +MDataObj["G"+g][10]+ MDataObj["G"+g][11]) : 1;
					maxa = (tota==1) ? tota : 20;
					tempArray.push((maxa * MDataObj["G"+g][9])/tota);
					tempArray2.push((maxa * MDataObj["G"+g][10])/tota);
					tempArray3.push((maxa * MDataObj["G"+g][11])/tota);
					
					totd =  (MDataObj["G"+g][12] +MDataObj["G"+g][13]+ MDataObj["G"+g][14] > 20) ? (MDataObj["G"+g][12] +MDataObj["G"+g][13]+ MDataObj["G"+g][14]) : 1;
					maxd = (totd==1) ? totd : 20;
					tempArray4.push((maxd * MDataObj["G"+g][12])/totd);
					tempArray5.push((maxd * MDataObj["G"+g][13])/totd);
					tempArray6.push((maxd * MDataObj["G"+g][14])/totd);

					tots =  (MDataObj["G"+g][9] +MDataObj["G"+g][10]+ MDataObj["G"+g][11] +MDataObj["G"+g][12] +MDataObj["G"+g][13]+ MDataObj["G"+g][14] > 20) ? (MDataObj["G"+g][9] +MDataObj["G"+g][10]+ MDataObj["G"+g][11] +MDataObj["G"+g][12] +MDataObj["G"+g][13]+ MDataObj["G"+g][14]) : 1;
					maxs = (tots==1) ? tots : 20;
					//wins ok
					tempArray7.push((maxs * (MDataObj["G"+g][12]+MDataObj["G"+g][9]))/tots);	
					//losses ok
					tempArray8.push((maxs * (MDataObj["G"+g][13]+MDataObj["G"+g][10]))/tots);
					//draw Att = loss
					tempArray9.push((maxs * (MDataObj["G"+g][11]))/tots);
					//draw Def = win
					tempArray9D.push((maxs * (MDataObj["G"+g][14]))/tots);
					
					colors.push(kmlc.getColorNR(MDataObj["G"+g][1],true));
					colors2.push(kmlc.getColorNR(MDataObj["G"+g][1],false));
					
					tempArray10.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11] ));
					tempArray11.push( (MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
					tempArray12.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11]+MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
					
				}
			}
	
		if (!num){
			var gameHistBar = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+(charthght+20)+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",333333,888888,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray7.slice(-30)+"|"+tempArray9D.slice(-30)+"|"+tempArray9.slice(-30)+"|"+tempArray8.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12&chtt=game+history%3A+Win+Draw+Loss&chts=000000,12";
			
			var gameHistBar2 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",888888,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray.slice(-30)+"|"+tempArray3.slice(-30)+"|"+tempArray2.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12";
			
			var gameHistBar3 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",333333,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray4.slice(-30)+"|"+tempArray6.slice(-30)+"|"+tempArray5.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12";
		}else if (num){
			var gameHistBar = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+(charthght+20)+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",333333,888888,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20,0,20,"+0+","+999+"&chd=t4:"+tempArray7.slice(-30)+"|"+tempArray9D.slice(-30)+"|"+tempArray9.slice(-30)+"|"+tempArray8.slice(-30)+"|"+tempArray12.slice(-30)+"&chdlp=b&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,4,-1,10,1,s::-10&chtt=game+history%3A+Win+Draw+Loss&chts=000000,12";
			
			var gameHistBar2 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",888888,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20,"+0+","+999+"&chd=t3:"+tempArray.slice(-30)+"|"+tempArray3.slice(-30)+"|"+tempArray2.slice(-30)+"|"+tempArray10.slice(-30)+"&chdlp=b&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,3,-1,10,1,s::-10";
			
			var gameHistBar3 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",333333,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20,"+0+","+999+"&chd=t3:"+tempArray4.slice(-30)+"|"+tempArray6.slice(-30)+"|"+tempArray5.slice(-30)+"|"+tempArray11.slice(-30)+"&chdlp=b&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,3,-1,10,1,s::-10";
		}	
	
///////############> Points Dom Places ^^ <#######################################################################################################################						
	}else if (sel1 == 9){
	GM_log("places=>>")
	
		var score500 = [487, 140, 10, -33, -77, -207, -250];
		var score2000 = [1862, 515, 10, -158, -327, -832, -1000];
		var score5000 = [+4612, +1265, 10, -408, -827, -2082, -2500];
		
		var colplaces = [	[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]		];
		
		var domcolor = [[],[],[],[],[],[],[]];
		
//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]	[gametime]	[month, date, game]		[rounds]
//									0						w		1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16	  17		18		19		20			21
	
		var tota,maxa,totd,maxd,tots,maxs;
		for (var g=1; g<=gameAmount; g++){
		//for (var g=1; g<=gameAmount; g++){
			if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
	
				colplaces[ MDataObj["G"+g][1] ][ MDataObj["G"+g][16]-1 ] += 1;
	
				domcolor[MDataObj["G"+g][1]].push(MDataObj["G"+g][16]);
				
				
						GM_log(" 1== "+MDataObj["G"+g][1]+" 16== " +(MDataObj["G"+g][16])+" color== "+kmlc.getColorNR(MDataObj["G"+g][1],true))

				if (MDataObj["G"+g][0] == 500){
					tempArray.push( MDataObj["G"+g][15] - score500[parseFloat(MDataObj["G"+g][16])] )
				}else if (MDataObj["G"+g][0] == 2000){
					tempArray.push( MDataObj["G"+g][15] - score2000[parseFloat(MDataObj["G"+g][16])] )
				}else if (MDataObj["G"+g][0] == 5000){
					tempArray.push( MDataObj["G"+g][15] - score5000[parseFloat(MDataObj["G"+g][16])] )
				}else {
					tempArray.push( MDataObj["G"+g][15] )
				}
					tempArray2.push( parseFloat(MDataObj["G"+g][16]) )
					if( MDataObj["G"+g][21] > 0 ){	tempArray3.push( MDataObj["G"+g][21] ) }else{	tempArray3.push(0);}
					tempArray4.push( MDataObj["G"+g][15] )
					tempArray5.push( (MDataObj["G"+g][15] / MDataObj["G"+g][17]) / MDataObj["G"+g][21] )
				
				colors.push(kmlc.getColorNR(MDataObj["G"+g][1],true));
			}
		}
		
		var domColorArray = [];
		var colors = [];
		var domtall = 0;
		var totdomgames = 0;
		for (var f=6; f>=0; f--){
			var domt = 0;
			$.each(domcolor[f], function(index, value) { 	
				domt += parseFloat(value);				
				colors2.push(kmlc.getColorNR(index,true));
			});
			GM_log('domt=='+domt)
			domtall += domt;
			totdomgames += domcolor.length;
			domColorArray.push(domt / domcolor.length);
		}
			domColorArray.push(domtall / gameAmount);
		
		
		GM_log("colplaces: "+colplaces +" totdomgames: "+totdomgames+ " domColorArray:"+domColorArray+" colors2: "+colors2);
	
		GM_log("podopl 1:"+tempArray+ " |2:"+tempArray2+" |3:"+tempArray3+" |4:"+tempArray4);
					
	if (minL > (100-maxL)) {	maxL = Math.ceil(maxL/5)*5;		minL = 100-maxL;
	}else if (minL < (100-maxL)) {	minL = Math.floor(minL/5)*5;	maxL = 100-minL;	}
	
		var gameHistBar = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+(charthght+20)+"&cht=bvs&chco="+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray.slice(-30)+"|"+tempArray2.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12&chtt=game+history%3A+Win+Draw+Loss&chts=000000,12&chm=N,000000,1,-1,10,1,s::-10";
		var gameHistBar2 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+(charthght+20)+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray5.slice(-30)+"|"+tempArray2.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12&chtt=game+history%3A+Win+Draw+Loss&chts=000000,12&chm=N,000000,1,-1,10,1,s::-10";
		var gameHistBar3 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+(charthght+20)+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray4.slice(-30)+"|"+tempArray3.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12&chtt=game+history%3A+Win+Draw+Loss&chts=000000,12&chm=N,000000,1,-1,10,1,s::-10";
			
		
///////############> COCO ^^ <#######################################################################################################################						
	}else if (sel1 == 8){
	
//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]
//					0												1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16		
		tempArray = [	[	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0	], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0	], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0	], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0	],
						[	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0]		];
		var tota,maxa,totd,maxd,tots,maxs;
		for (var g=gameAmount; g>0; g--){
		//for (var g=1; g<=gameAmount; g++){
			if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
				tempArray[MDataObj["G"+g][1]][0]++;
				//luck:
				if (MDataObj["G"+g][2] > 0){
					tempArray[MDataObj["G"+g][1]][21]++;
					tempArray[MDataObj["G"+g][1]][2] += MDataObj["G"+g][2];
				}
				if (MDataObj["G"+g][2] > 0){
					tempArray[MDataObj["G"+g][1]][22]++;
					tempArray[MDataObj["G"+g][1]][3] += MDataObj["G"+g][3];
				}
				if (MDataObj["G"+g][2] > 0){
					tempArray[MDataObj["G"+g][1]][23]++;
					tempArray[MDataObj["G"+g][1]][4] += MDataObj["G"+g][4];
				}
				//result:
				tempArray[MDataObj["G"+g][1]][5] += MDataObj["G"+g][5];
				tempArray[MDataObj["G"+g][1]][6] += MDataObj["G"+g][6];
				//dice rolled:
				tempArray[MDataObj["G"+g][1]][7] += MDataObj["G"+g][7];
				tempArray[MDataObj["G"+g][1]][8] += MDataObj["G"+g][8];
				//tot win
				tempArray[MDataObj["G"+g][1]][9] += MDataObj["G"+g][9];
				tempArray[MDataObj["G"+g][1]][10] += MDataObj["G"+g][10];
				//tot loose
				tempArray[MDataObj["G"+g][1]][11] += MDataObj["G"+g][11];
				tempArray[MDataObj["G"+g][1]][12] += MDataObj["G"+g][12];
				//tot draw
				tempArray[MDataObj["G"+g][1]][13] += MDataObj["G"+g][13];
				tempArray[MDataObj["G"+g][1]][14] += MDataObj["G"+g][14];
			}
		}
		//for (p=6;p> -1;p--){		
		for (p=0;p<7;p++){		
			//avg luck all/att/def
			tempArray[7][21] += tempArray[p][21];//counters
			tempArray[7][22] += tempArray[p][22];
			tempArray[7][23] += tempArray[p][23];
			
			tempArray[7][2] += tempArray[p][2];//lucks
			tempArray[7][3] += tempArray[p][3];
			tempArray[7][4] += tempArray[p][4];
			//avg roll att/def/all
			tempArray[7][5] += tempArray[p][5];
			tempArray[7][6] += tempArray[p][6];
			tempArray[7][7] += tempArray[p][7];
			tempArray[7][8] += tempArray[p][8];
			
			tempArray[7][9] += tempArray[p][9];
			tempArray[7][10] += tempArray[p][10];
			tempArray[7][11] += tempArray[p][11];
			tempArray[7][12] += tempArray[p][12];
			tempArray[7][13] += tempArray[p][13];
			tempArray[7][14] += tempArray[p][14];
			//total win/loose/draw
			tempArray[7][18] += tempArray[p][9]+tempArray[p][12];
			tempArray[7][19] += tempArray[p][10]+tempArray[p][13];
			tempArray[7][20] += tempArray[p][11]+tempArray[p][14];	
			
			//avg luck all/att/def
			tempArray[p][2] = tempArray[p][2]/tempArray[p][21];
			tempArray[p][3] = tempArray[p][3]/tempArray[p][22];
			tempArray[p][4] = tempArray[p][4]/tempArray[p][23];
			//avg roll att/def/all
			tempArray[p][15] = tempArray[p][5]/tempArray[p][7];	
			tempArray[p][16] = tempArray[p][6]/tempArray[p][8];	
			tempArray[p][17] = (tempArray[p][5]+tempArray[p][6])/(tempArray[p][7]+tempArray[p][8]);
			//total win/loose/draw
			tempArray[p][18] = tempArray[p][9]+tempArray[p][12];
			tempArray[p][19] = tempArray[p][10]+tempArray[p][13];
			tempArray[p][20] = tempArray[p][11]+tempArray[p][14];	
			
			tempArray12.push( (tempArray[p][9]+tempArray[p][10]+tempArray[p][11]+tempArray[p][12]+tempArray[p][13]+tempArray[p][14] ));
			tempArray10.push( (tempArray[p][9]+tempArray[p][10]+tempArray[p][11]+tempArray[p][12]+tempArray[p][13]+tempArray[p][14] ));
			tempArray10.push( (tempArray[p][9]+tempArray[p][10]+tempArray[p][11] ));
			tempArray10.push( (tempArray[p][12]+tempArray[p][13]+tempArray[p][14] ));
		}
		//avg luck all/att/def
		tempArray[7][2] = tempArray[7][2]/tempArray[7][21];
		tempArray[7][3] = tempArray[7][3]/tempArray[7][22];
		tempArray[7][4] = tempArray[7][4]/tempArray[7][23];
		//avg roll att/def/all
		tempArray[7][15] = tempArray[7][5]/tempArray[7][7];	
		tempArray[7][16] = tempArray[7][6]/tempArray[7][8];	
		tempArray[7][17] = (tempArray[7][5]+tempArray[7][6])/(tempArray[7][7]+tempArray[7][8]);
		//total win/loose/draw
		tempArray[7][18] = tempArray[7][9]+tempArray[7][12];
		tempArray[7][19] = tempArray[7][10]+tempArray[7][13];
		tempArray[7][20] = tempArray[7][11]+tempArray[7][14];
				
		tempArray12.push( (tempArray[7][9]+tempArray[7][10]+tempArray[7][11]+tempArray[7][12]+tempArray[7][13]+tempArray[7][14] ));
		tempArray10.push( (tempArray[7][9]+tempArray[7][10]+tempArray[7][11]+tempArray[7][12]+tempArray[7][13]+tempArray[7][14] ));
		tempArray10.push( (tempArray[7][9]+tempArray[7][10]+tempArray[p][11] ));
		tempArray10.push( (tempArray[7][12]+tempArray[7][13]+tempArray[7][14] ));
		
		var luckarray1 = new Array();	var avgarray1 = new Array();
		var wdlarray1 = new Array();	var wdlarray2 = new Array();	var wdlarray4 = new Array();	var wdlarray3=new Array();	var wdlarray3D=new Array();
		var tota,maxa;
		//for(y=7; y>-1; y--){
		for(y=0;y<8;y++){
			luckarray1.push(tempArray[y][2]>0 ? tempArray[y][2] : 0);
			luckarray1.push(tempArray[y][3]>0 ? tempArray[y][3] : 0);
			luckarray1.push(tempArray[y][4]>0 ? tempArray[y][4] : 0);
			
			avgarray1.push(tempArray[y][15]>0 ? tempArray[y][15] : 0);
			avgarray1.push(tempArray[y][16]>0 ? tempArray[y][16] : 0);
			avgarray1.push(tempArray[y][17]>0 ? tempArray[y][17] : 0);
		
			tots =  (tempArray[y][18] +tempArray[y][19]+ tempArray[y][20] > 20) ? (tempArray[y][18] +tempArray[y][19]+ tempArray[y][20]) : 1;
			maxs = (tota==1) ? tots : 20;
			wdlarray1.push(kmlc.roundDec( (maxs * tempArray[y][18])/tots,2));
			wdlarray2.push(kmlc.roundDec((maxs * tempArray[y][19])/tots,2));
			wdlarray3.push(kmlc.roundDec((maxs * tempArray[y][11])/tots,2));
			wdlarray3D.push(kmlc.roundDec((maxs * tempArray[y][14])/tots,2));
			wdlarray4.push(tots);
					
			tota =  (tempArray[y][9] +tempArray[y][10]+ tempArray[y][11] > 20) ? (tempArray[y][9] +tempArray[y][10]+ tempArray[y][11]) : 1;
			maxa = (tota==1) ? tota : 20;
			wdlarray1.push(kmlc.roundDec((maxa * tempArray[y][9])/tota,2));
			wdlarray2.push(kmlc.roundDec((maxa * tempArray[y][10])/tota,2));
			wdlarray3.push(kmlc.roundDec((maxa * tempArray[y][11])/tota,2));
			wdlarray3D.push(0);
			wdlarray4.push(tota);
					
			totd =  (tempArray[y][12] +tempArray[y][13]+ tempArray[y][14] > 20) ? (tempArray[y][12] +tempArray[y][13]+ tempArray[y][14]) : 1;
			maxd = (tota==1) ? tota : 20;
			wdlarray1.push(kmlc.roundDec((maxd * tempArray[y][12])/totd,2));
			wdlarray2.push(kmlc.roundDec((maxd * tempArray[y][13])/totd,2));
			wdlarray3D.push(kmlc.roundDec((maxd * tempArray[y][14])/totd,2));
			wdlarray3.push(0);
			wdlarray4.push(totd);
		}
		
		if (num==0){
			var gameHistBar ="http://chart.apis.google.com/chart?chxr=0,"+0+","+100+"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y&chbh=a,1,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco=BF3069|BF3069|da94a6|30BF69|30BF69|94cAa6|9E30BF|9E30BF|b894cA|cebf30|cebf30|d0ca94|3069BF|3069BF|94a6cA|9A6654|9A6654|bA9482|30B1BF|30B1BF|a4d0dA|666666|666666|888888&chd=t1:"+ luckarray1+"9&chg=4.17,20,2,2&chds="+0+","+100+"&chtt=all+%2B+att+%2B+def+luck&chts=000000,11&chm=h,888888,0,0.5:0.5,1,-1";

			var gameHistBar2 = "http://chart.apis.google.com/chart?chxr="+0+","+1+","+6+",1&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y&chbh=a,1,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco=BF3069|BF3069|da94a6|30BF69|30BF69|94cAa6|9E30BF|9E30BF|b894cA|cebf30|cebf30|d0ca94|3069BF|3069BF|94a6cA|9A6654|9A6654|bA9482|30B1BF|30B1BF|a4d0dA|666666|666666|888888|CCCCCC&chd=t:"+avgarray1+"&chg=4.17,20,2,2&chds="+1+","+6+","+1+","+6+"&chtt=all+%2B+att%2Fdef+averages&chts=000000,11&chm=h,888888,0,0.5:0.5,1,-1";
						
			var gameHistBar3 = 	"http://chart.apis.google.com/chart?chxr=0,0,100&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco=BF3069|BF3069|BF3069|30BF69|30BF69|30BF69|9E30BF|9E30BF|9E30BF|cebf30|cebf30|cebf30|3069BF|3069BF|3069BF|9A6654|9A6654|9A6654|30B1BF|30B1BF|30B1BF|666666|666666|666666,333333,888888,da94a6|da94a6|da94a6|94cAa6|94cAa6|94cAa6|b894cA|b894cA|b894cA|d0ca94|d0ca94|d0ca94|94a6cA|94a6cA|94a6cA|bA9482|bA9482|bA9482|a4d0dA|a4d0dA|a4d0dA|aaaaaa|aaaaaa|aaaaaa&chds=0,20,0,20,0,20,0,20,"+0+","+99999+"&chd=t4:"+wdlarray1+"|"+wdlarray3D+"|"+wdlarray3+"|"+wdlarray2+"&chdlp=b&chma=12&chtt=win%2Fdraw%2Floss+of+all+%2B+att+%2B+def+rolls&chts=000000,11";
		
		}else if(num==1){
			var gameHistBar ="http://chart.apis.google.com/chart?chxr=0,"+0+","+100+"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y&chbh=a,0,3&chs="+chartlen+"x"+(20+charthght)+"&cht=bvg&chco=BF3069|BF3069|da94a6|30BF69|30BF69|94cAa6|9E30BF|9E30BF|b894cA|cebf30|cebf30|d0ca94|3069BF|3069BF|94a6cA|9A6654|9A6654|bA9482|30B1BF|30B1BF|a4d0dA|666666|666666|888888|CCCCCC&chd=t1:"+ luckarray1+"|"+tempArray10 +"&chg=4.17,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chds="+0+","+100+","+0+","+9999+"&chtt=all+%2B+att+%2B+def+luck&chts=000000,11&chma=0,0,0,12&chm=h,888888,0,0.5:0.5,1,-1|N,000000,0,-1,10,1,::20|N,000000,1,-1,10,1,s::-10";
	
			var gameHistBar2 ="http://chart.apis.google.com/chart?chxr=0,"+1+","+6+"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y&chbh=a,0,3&chs="+chartlen+"x"+(charthght+20)+"&cht=bvg&chco=BF3069|BF3069|da94a6|30BF69|30BF69|94cAa6|9E30BF|9E30BF|b894cA|cebf30|cebf30|d0ca94|3069BF|3069BF|94a6cA|9A6654|9A6654|bA9482|30B1BF|30B1BF|a4d0dA|666666|666666|888888|CCCCCC&chd=t1:"+ avgarray1+"|"+tempArray10 +"&chg=4.17,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chds="+1+","+6+","+0+","+9999+"&chtt=all+%2B+att+%2B+def+averages&chts=000000,11&chma=0,0,0,12&chm=h,888888,0,0.5:0.5,1,-1|N,000000,0,-1,10,1,::20|N,000000,1,-1,10,1,s::-10";

			var gameHistBar3 = 	"http://chart.apis.google.com/chart?chxr=0,0,100&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y&chbh=a,3,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco=BF3069|BF3069|BF3069|30BF69|30BF69|30BF69|9E30BF|9E30BF|9E30BF|cebf30|cebf30|cebf30|3069BF|3069BF|3069BF|9A6654|9A6654|9A6654|30B1BF|30B1BF|30B1BF|666666|666666|666666,333333,888888,da94a6|da94a6|da94a6|94cAa6|94cAa6|94cAa6|b894cA|b894cA|b894cA|d0ca94|d0ca94|d0ca94|94a6cA|94a6cA|94a6cA|bA9482|bA9482|bA9482|a4d0dA|a4d0dA|a4d0dA|aaaaaa|aaaaaa|aaaaaa&chds=0,20,0,20,0,20,0,20,"+0+","+99999+"&chd=t4:"+wdlarray1+"|"+wdlarray3D+"|"+wdlarray3+"|"+wdlarray2+"|"+tempArray10 +"&chdlp=b&chg=14.29,25,2,2&chma=12&chtt=win%2Fdraw%2Floss+of+all+%2B+att+%2B+def+rolls&chts=000000,11&chma=0,0,0,12&chm=N,000000,4,-1,11,1,::-10";
		
		}
	}
		$('#chart5L').attr('src', gameHistBar);	
		$('#chart6L').attr('src', gameHistBar2);	
		$('#chart7L').attr('src', gameHistBar3);	
	//kmlc.chart5L.src = gameHistBar;
	//kmlc.chart6L.src = gameHistBar2;
	//kmlc.chart7L.src = gameHistBar3;
	MDataObj = null;
}

///////############> early luck <###########################################################################################################################
kmlc.earlyRoundStat = function(){
//									0		 1		 2					 3				4		 5		  6		7		8
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//		kmlc.avgPerAttDefArray =	[	[	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	], [	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	]	];
	if(lastRoll[2] == kmlc.user){
		kmlc.earlyRound
	}
	
	var DA = (kmlc.lastRoll[3] == kmlc.playerNR) ? 0 : 1;
	var sR = kmlc.lastRoll[DA] -1;
	kmlc.avgPerAttDefArray[DA][1][sR]++;
	kmlc.avgPerAttDefArray[DA][2][sR] += kmlc.lastRoll[DA+4];		
	kmlc.avgPerAttDefArray[DA][0][sR] = (kmlc.avgPerAttDefArray[DA][1][sR] >= sR+1 ) ? sR+1 : kmlc.avgPerAttDefArray[DA][2][sR] / kmlc.avgPerAttDefArray[DA][1][sR];		
}
kmlc.earlyRoundBar = function(){

	var barAvgPerRollUser = "http://chart.apis.google.com/chart?chxp=0,12,24,36,48&chxr=0,0,48|1,1,8&chxs=0,333333,9,0,lt,333333|1,333333,9,0,l,333333&chxt=y,x&chbh=8,0,6&chs=200x120&cht=bvg&chco="+kmlc.userColor1+","+kmlc.userColor2+",000000&chds=0,48,0,48,0,48,0,48&chd=t2:"+kmlc.avgPerAttDefArray[0][0]+"|"+kmlc.avgPerAttDefArray[1][0]+"|3.5,7,10.5,14,17.5,21,24.5,28&chdlp=b&chg=12.5,12.5,2,2&chma=5&chm=H,666666,2,,1:22,-1|H,666666,3,,1:22,-1|H,666666,4,,1:22,&chtt=(4)+Average+per+Att/Def+Roll&chts=000000,10";
	//	$('#chart4Re').attr('src', barAvgPerRollUser);	
	//kmlc.chart4Re.src = barAvgPerRollUser;
}
///////############> 8vs8 luck <###########################################################################################################################
kmlc.eightStat = function(){
//									0		 1		 2					 3				4		 5		  6		7		8
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//		kmlc.eights =	[		[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	,	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0],		 [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]		];
	if(kmlc.lastRoll[0] == 8 && kmlc.lastRoll[1] ==8){
			kmlc.eights[6][kmlc.lastRoll[2]]+=kmlc.lastRoll[4];	//attacker result diceroll+
			kmlc.eights[7][kmlc.lastRoll[3]]+=kmlc.lastRoll[5];	//attacker result diceroll+
		if (kmlc.lastRoll[6]){	//attacker wins
			kmlc.eights[0][kmlc.lastRoll[2]]++;	//attacker +1 win
			kmlc.eights[4][kmlc.lastRoll[3]]++;	//defender +1 loss
		}else if (kmlc.lastRoll[4] == kmlc.lastRoll[5]){	//draw
			kmlc.eights[2][kmlc.lastRoll[2]]++;	//draw attacker = loss	//attacker +1 draw
			kmlc.eights[5][kmlc.lastRoll[3]]++;	//draw defender = win	//defender +1 draw
		}else if (!kmlc.lastRoll[6]){	//defender wins
			kmlc.eights[1][kmlc.lastRoll[2]]++;	//attacker +1 loss
			kmlc.eights[3][kmlc.lastRoll[3]]++;	//defender +1 win
		}
	}
		
}
kmlc.eightBar = function(){

	var WLDwin = [];
	var WLDloose = [];
	var WLDdraw = [];
	var avg8AD = [];
	var avg8D = [];
	var maxa, tota, maxd, totd;
	for (p=0;p<7;p++){
		tota =  (kmlc.eights[0][p] +kmlc.eights[1][p]+ kmlc.eights[2][p] > 15) ? (kmlc.eights[0][p] +kmlc.eights[1][p]+ kmlc.eights[2][p]) : 1;
		maxa = (tota==1) ? tota : 20;
		WLDwin.push((maxa * kmlc.eights[0][p])/tota);
		WLDloose.push((maxa * kmlc.eights[1][p])/tota);
		WLDdraw.push((maxa * kmlc.eights[2][p])/tota);
		
		totd =  (kmlc.eights[3][p] +kmlc.eights[4][p]+ kmlc.eights[5][p] > 15) ? (kmlc.eights[3][p] +kmlc.eights[4][p]+ kmlc.eights[5][p]) : 1;
		maxd = (totd==1) ? totd : 20;
		WLDwin.push((maxd * kmlc.eights[3][p])/totd);
		WLDloose.push((maxd * kmlc.eights[4][p])/totd);
		WLDdraw.push((maxd * kmlc.eights[5][p])/totd);
		
		var aavg = kmlc.eights[6][p]/(kmlc.eights[0][p] +kmlc.eights[1][p]+ kmlc.eights[2][p]) ;
		var davg = kmlc.eights[7][p]/(kmlc.eights[3][p] +kmlc.eights[4][p]+ kmlc.eights[5][p]) ;
		avg8AD.push( (aavg>0)?aavg:0 );
		avg8AD.push( (davg>0)?davg:0 );
		
	}
	var barEights =	"http://chart.apis.google.com/chart?chxr=0,0,15&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y,r&chbh=a,2,4&chs=200x120&cht=bvs&chco=BF3069|BF3069|30BF69|30BF69|9E30BF|9E30BF|cebf30|cebf30|3069BF|3069BF|9A6654|9A6654|30B1BF|30B1BF,333333,da94a6|da94a6|94cAa6|94cAa6|b894cA|b894cA|d0ca94|d0ca94|94a6cA|94a6cA|bA9482|bA9482|a4d0dA|a4d0dA&chds=0,15,0,30,0,15&chd=t:"+WLDwin+"|"+WLDdraw+"|"+WLDloose +"&&chm=N,000000,3,-1,9,1,s::-15chdlp=b&chg=14.29,25,2,2&chma=12,0,0,20&chtt=(10)+WLD+of+8v8+rolls&chts=000000,11";
		
	//"http://chart.googleapis.com/chart?chxr=0,0,15&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y,r&chbh=a,2,4&chs=200x120&cht=bvs&chco=BF3069|BF3069|30BF69|30BF69|9E30BF|9E30BF|cebf30|cebf30|3069BF|3069BF|9A6654|9A6654|30B1BF|30B1BF,333333,da94a6|da94a6|94cAa6|94cAa6|b894cA|b894cA|d0ca94|d0ca94|94a6cA|94a6cA|bA9482|bA9482|a4d0dA|a4d0dA&chds=0,15,0,30,0,15&chd=t:0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,4,2,2,2,2,2,2,1,2,6,7,9,11&chdlp=b&chg=14.29,25,2,2&chma=12,0,0,20&chm=N,000000,3,-1,9,1,s::-15&chtt=(10)+WLD+of+8v8+rolls&chts=000000,11"
	
	
	$('#chart5L').attr('src', barEights);	
}

///////############> +-rolls stats <###########################################################################################################################
kmlc.updateAvgRollStat = function(){
//									0		 1		 2					 3				4		 5		  6		7		8
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//		kmlc.avgPerAttDefArray =	[	[	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	], [	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	]	];
	var DA = (kmlc.lastRoll[3] == kmlc.playerNR) ? 0 : 1;
	var sR = kmlc.lastRoll[DA] -1;
	kmlc.avgPerAttDefArray[DA][1][sR]++;
	kmlc.avgPerAttDefArray[DA][2][sR] += kmlc.lastRoll[DA+4];		
	kmlc.avgPerAttDefArray[DA][0][sR] = (kmlc.avgPerAttDefArray[DA][1][sR] >= sR+1 ) ? sR+1 : kmlc.avgPerAttDefArray[DA][2][sR] / kmlc.avgPerAttDefArray[DA][1][sR];		
}
kmlc.updateAvgRollBar = function(){

	var barAvgPerRollUser = "http://chart.apis.google.com/chart?chxp=0,12,24,36,48&chxr=0,0,48|1,1,8&chxs=0,333333,9,0,lt,333333|1,333333,9,0,l,333333&chxt=y,x&chbh=8,0,6&chs=200x120&cht=bvg&chco="+kmlc.userColor1+","+kmlc.userColor2+",000000&chds=0,48,0,48,0,48,0,48&chd=t2:"+kmlc.avgPerAttDefArray[0][0]+"|"+kmlc.avgPerAttDefArray[1][0]+"|3.5,7,10.5,14,17.5,21,24.5,28&chdlp=b&chg=12.5,12.5,2,2&chma=5&chm=H,666666,2,,1:22,-1|H,666666,3,,1:22,-1|H,666666,4,,1:22,&chtt=(4)+Average+per+Att/Def+Roll&chts=000000,10";
		$('#chart4Re').attr('src', barAvgPerRollUser);	
	//kmlc.chart4Re.src = barAvgPerRollUser;
}

///////############> win/loose/draw bar per player <###########################################################################################################			
kmlc.updateWLDdata = function(){	
//	kmlc.WLDarray = [ [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0], [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0] ];
//	attker win(0 , loose(1 , draw(2, defender win(3, loose(4, draw(5
	
	if (kmlc.lastRoll[6]){	//attacker wins
		kmlc.WLDarray[0][kmlc.lastRoll[2]]++;	//attacker +1 win
		kmlc.WLDarray[4][kmlc.lastRoll[3]]++;	//defender +1 loss
	}else if (kmlc.lastRoll[4] == kmlc.lastRoll[5]){	//draw
		kmlc.WLDarray[2][kmlc.lastRoll[2]]++;	//draw attacker = loss	//attacker +1 draw
		kmlc.WLDarray[5][kmlc.lastRoll[3]]++;	//draw defender = win	//defender +1 draw
	}else if (!kmlc.lastRoll[6]){	//defender wins
		kmlc.WLDarray[1][kmlc.lastRoll[2]]++;	//attacker +1 loss
		kmlc.WLDarray[3][kmlc.lastRoll[3]]++;	//defender +1 win
	}
}
kmlc.updateWLDbar = function(){	
	var WLDwin = [];
	var WLDloose = [];
	var WLDdraw = [];
	var maxa, tota, maxd, totd;
	for (p=0;p<7;p++){
		tota =  (kmlc.WLDarray[0][p] +kmlc.WLDarray[1][p]+ kmlc.WLDarray[2][p] > 15) ? (kmlc.WLDarray[0][p] +kmlc.WLDarray[1][p]+ kmlc.WLDarray[2][p]) : 1;
		maxa = (tota==1) ? tota : 20;
		WLDwin.push((maxa * kmlc.WLDarray[0][p])/tota);
		WLDloose.push((maxa * kmlc.WLDarray[1][p])/tota);
		WLDdraw.push((maxa * kmlc.WLDarray[2][p])/tota);
		
		totd =  (kmlc.WLDarray[3][p] +kmlc.WLDarray[4][p]+ kmlc.WLDarray[5][p] > 15) ? (kmlc.WLDarray[3][p] +kmlc.WLDarray[4][p]+ kmlc.WLDarray[5][p]) : 1;
		maxd = (totd==1) ? totd : 20;
		WLDwin.push((maxd * kmlc.WLDarray[3][p])/totd);
		WLDloose.push((maxd * kmlc.WLDarray[4][p])/totd);
		WLDdraw.push((maxd * kmlc.WLDarray[5][p])/totd);
	}
	
	
	var barWLD = "http://chart.apis.google.com/chart?chxr=0,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y,r&chbh=a,2,4&chs=200x90&cht=bvs&chco=BF3069|BF3069|30BF69|30BF69|9E30BF|9E30BF|cebf30|cebf30|3069BF|3069BF|9A6654|9A6654|30B1BF|30B1BF,333333,da94a6|da94a6|94cAa6|94cAa6|b894cA|b894cA|d0ca94|d0ca94|94a6cA|94a6cA|bA9482|bA9482|a4d0dA|a4d0dA&chds=0,20,0,20,0,20&chd=t:"+WLDwin+"|"+WLDdraw+"|"+WLDloose +"&chdlp=b&chg=14.29,25,2,2&chma=12&chtt=(9)+win%2Floose%2Fdraw+of+att%2Fdef+rolls&chts=000000,11";
	
		$('#chart4L').attr('src', barWLD);	
	//kmlc.chart4L.src = barWLD;
}

///////############> average per att/def dice per sort of roll user <##########################################################################################		
kmlc.updateAvgADperDiceStat = function(){	
//									0		 1		 2					 3				4		 5		  6		7		8
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);		
		
//		kmlc.AvPeDiU = [	[ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0] ], [ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0]] 	];
//			[att / def]	[current average / counter / total result] [1...8,avg]
		var DA;
		if (kmlc.lastRoll[3] == kmlc.playerNR){	DA = 1;
		}else if (kmlc.lastRoll[2] == kmlc.playerNR){	DA=0;	}
		var dices = kmlc.lastRoll[DA];
				
		kmlc.AvPeDiU[DA][1][dices-1] += dices;	
		kmlc.AvPeDiU[DA][2][dices-1] += kmlc.lastRoll[4+DA];
		kmlc.AvPeDiU[DA][0][dices-1] = (kmlc.AvPeDiU[DA][2][dices-1] > 0) ? (kmlc.AvPeDiU[DA][2][dices-1] / kmlc.AvPeDiU[DA][1][dices-1]) : 0;
		
		//average:
		kmlc.AvPeDiU[DA][1][8] += dices;
		kmlc.AvPeDiU[DA][2][8] += kmlc.lastRoll[4+DA];
		kmlc.AvPeDiU[DA][0][8] = (kmlc.AvPeDiU[DA][2][8] > 0) ?  (kmlc.AvPeDiU[DA][2][8] / kmlc.AvPeDiU[DA][1][8]) : 0;
}
kmlc.updateAvgADperDiceBar = function(){	
	var barAvgPerDiceUser = "http://chart.apis.google.com/chart?chxl=1:|1|2|3|4|5|6|7|8|avg&chxr=0,1,6|1,1,9&chds=0,1,6&chxs=0,000000,9,0,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=8,0,4&chs=200x120&cht=bvg&chco="+kmlc.userColor1+","+kmlc.userColor2+"&chd=t:"+kmlc.AvPeDiU[0][0]+"|"+kmlc.AvPeDiU[1][0]+"&chg=11.11,20,2,2&&chds=1,6&chm=h,666666,0,0.5:0.5,1,-1&chtt=(5)+average+of+att%2Fdef+dice,+user+only&chts=000000,10";
	//kmlc.chart5Re.src = barAvgPerDiceUser;	
		$('#chart5Re').attr('src', barAvgPerDiceUser);	
}

///////############> history rolls DATA<#######################################################################################################################						
kmlc.updateHistData = function(){			//(2)
//									0		1		2				3				4			5		  6		7		8
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);

	kmlc.HattDice.push(kmlc.lastRoll[0]);
	kmlc.HdefDice.push(kmlc.lastRoll[1]);
	kmlc.HattBar.push((kmlc.lastRoll[4] / kmlc.lastRoll[0])-1);
	kmlc.HdefBar.push(1-(kmlc.lastRoll[5] / kmlc.lastRoll[1]) );
	kmlc.HistColA.push(kmlc.getColorNR(kmlc.lastRoll[2],kmlc.lastRoll[6]));
	kmlc.HistColD.push(kmlc.getColorNR(kmlc.lastRoll[3],(!kmlc.lastRoll[6])));
	if(kmlc.HattDice.length > 25){
		kmlc.HattDice.shift();
		kmlc.HdefDice.shift();
		kmlc.HattBar.shift();
		kmlc.HdefBar.shift();
		kmlc.HistColA.shift();
		kmlc.HistColD.shift();
	}
	
	if (kmlc.lastRoll[3] == kmlc.playerNR || kmlc.lastRoll[2] == kmlc.playerNR){
		kmlc.HattDiceU.push(kmlc.lastRoll[0]);
		kmlc.HdefDiceU.push(kmlc.lastRoll[1]);
		kmlc.HattBarU.push((kmlc.lastRoll[4] / kmlc.lastRoll[0])-1);
		kmlc.HdefBarU.push(1-(kmlc.lastRoll[5] / kmlc.lastRoll[1]) );
		kmlc.HistColAU.push(kmlc.getColorNR(kmlc.lastRoll[2],kmlc.lastRoll[6]));
		kmlc.HistColDU.push(kmlc.getColorNR(kmlc.lastRoll[3],(!kmlc.lastRoll[6])));
		if(kmlc.HattDiceU.length > 25){
			kmlc.HattDiceU.shift();
			kmlc.HdefDiceU.shift();
			kmlc.HattBarU.shift();
			kmlc.HdefBarU.shift();
			kmlc.HistColAU.shift();
			kmlc.HistColDU.shift();
		}
	}
}
///////############> history rolls BAR<############################################################################################################################			
kmlc.updateHistBar = function(){			//(2)
	if (kmlc.histAllOrUser){			
		var fullHistBar = "http://chart.apis.google.com/chart?chxl=0:|6|3.5|1|3.5|6&chxr=0,-6,6&chxs=0,333333,9,0,l,333333&chxt=y&chbh=a,1,1&chs=200x150&cht=bvs&chco="+kmlc.HistColA.slice(-25).toString().replace(/,/g, "|")+","+kmlc.HistColD.slice(-25).toString().replace(/,/g, "|")+"&chds=-5,5,-5,5,1,8,1,8&chd=t2:"+kmlc.HattBar.slice(-25)+"|"+kmlc.HdefBar.slice(-25)+"|"+kmlc.HattDice.slice(-25)+"|"+kmlc.HdefDice.slice(-25)+"&chg=20,0,2,2&chma=0,0,0,30&chm=h,333333,0,0.5:0.5,1|N,000000,2,-1,10,1,s::-58|N,000000,3,-1,10,1,s::-70|h,666666,0,0.25:0.25:1,1,-1|h,666666,0,0.75:0.75,1,-1&chtt=(2)+Roll+History&chts=000000,11";
	}else if(!kmlc.histAllOrUser){
		var fullHistBar = "http://chart.apis.google.com/chart?chxl=0:|6|3.5|1|3.5|6&chxr=0,-6,6&chxs=0,333333,9,0,l,333333&chxt=y&chbh=a,1,1&chs=200x150&cht=bvs&chco="+kmlc.HistColAU.slice(-25).toString().replace(/,/g, "|")+","+kmlc.HistColDU.slice(-25).toString().replace(/,/g, "|")+"&chds=-5,5,-5,5,1,8,1,8&chd=t2:"+kmlc.HattBarU.slice(-25)+"|"+kmlc.HdefBarU.slice(-25)+"|"+kmlc.HattDiceU.slice(-25)+"|"+kmlc.HdefDiceU.slice(-25)+"&chg=20,0,2,2&chma=0,0,0,30&chm=h,333333,0,0.5:0.5,1|N,000000,2,-1,10,1,s::-58|N,000000,3,-1,10,1,s::-70|h,666666,0,0.25:0.25:1,1,-1|h,666666,0,0.75:0.75,1,-1&chtt=(2)+Roll+History&chts=000000,11";		
	}

		$('#chart2R').attr('src', fullHistBar);	
}

///////############> avg per dice per player <#################################################################################################################	
kmlc.updateADavgStat = function(){	
//										0		1			2				3				4			5		6	 7		8
//			kmlc.lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//			kmlc.playerAvgDice [playerNR] [0)current average Attack, 1)total result att, 2)counter of dice,	  3)total result def, 4)counter of dice, 5)current average Defend ]

//	[att/def] [playernr] [counter/result/

//		kmlc.playerAvgDice=[	[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	,[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	];
		
	var At = kmlc.lastRoll[2];
	var Df = kmlc.lastRoll[3];
	//att
	kmlc.playerAvgDice[0][2][At] += kmlc.lastRoll[0]; //counter dice rolled	//2
	kmlc.playerAvgDice[0][1][At] += kmlc.lastRoll[4];	//result dice	//1
	if(kmlc.playerAvgDice[0][2][At] > 0){
		kmlc.playerAvgDice[0][0][At] = kmlc.playerAvgDice[0][1][At] / kmlc.playerAvgDice[0][2][At];
	}
	//def
	kmlc.playerAvgDice[1][2][Df] += kmlc.lastRoll[1]; //counter dice rolled	//2
	kmlc.playerAvgDice[1][1][Df] += kmlc.lastRoll[5];	//result dice	//1
	if(kmlc.playerAvgDice[1][2][Df] > 0){
		kmlc.playerAvgDice[1][0][Df] = kmlc.playerAvgDice[1][1][Df] / kmlc.playerAvgDice[1][2][Df];
	}
	//avg
	kmlc.playerAvgDice[0][2][7] += kmlc.lastRoll[0];
	kmlc.playerAvgDice[0][1][7] += kmlc.lastRoll[4];
	if (kmlc.playerAvgDice[0][2][7] > 0){
		kmlc.playerAvgDice[0][0][7] = kmlc.playerAvgDice[0][1][7] / kmlc.playerAvgDice[0][2][7];
	}
	kmlc.playerAvgDice[1][2][7] += kmlc.lastRoll[1];
	kmlc.playerAvgDice[1][1][7] += kmlc.lastRoll[5];
	if (kmlc.playerAvgDice[1][2][7] > 0){
		kmlc.playerAvgDice[1][0][7] = kmlc.playerAvgDice[1][1][7] / kmlc.playerAvgDice[1][2][7];
	}
}
kmlc.updateADavgBar = function(){		//(3)
	
	//check for min max values to scale barchart:
	var max3= 0;
	var min3 = 100;
	for (ll=6;ll>-1;ll--){
	//for (ll=0;ll<7;ll++){
		//for(r=0;r<2;r++){
			if (kmlc.playerAvgDice[0][0][ll] > 0){	//def
				if (kmlc.playerAvgDice[0][0][ll] > max3) max3=kmlc.playerAvgDice[0][0][ll];
				if (kmlc.playerAvgDice[0][0][ll] < min3) min3=kmlc.playerAvgDice[0][0][ll];
			}
			if (kmlc.playerAvgDice[1][0][ll] > 0){	//def
				if (kmlc.playerAvgDice[1][0][ll] > max3) max3=kmlc.playerAvgDice[1][0][ll];
				if (kmlc.playerAvgDice[1][0][ll] < min3) min3=kmlc.playerAvgDice[1][0][ll];
			}
		//}
	}
	
	if (min3 > (7-max3)) {
		max3 = Math.ceil(max3*2)/2;
		min3 = 7-max3;
	}else if (min3 < (7-max3)) {
		min3 = Math.floor(min3*2)/2;
		max3 = 7-min3;
	}
	var numOffset1, numOffset2;
	switch (min3){
		case 1.5: numOffset1=16;	numOffset2=6;
		break;
		case 2: numOffset1=38;	numOffset2=28;
		break;
		case 2.5: numOffset1=79;	numOffset2=69;
		break;
		case 3: numOffset1=200;	numOffset2=190;
		break;
		default: numOffset1=4;	numOffset2=-6;
	}
	
//// bar chart for average roll per color
	var barChart1 = "http://chart.apis.google.com/chart?chxr=0,"+min3+","+max3+"&chxs=0,000000,11,1,lt,676767&chxt=y&chbh=a,0,7&chs=200x120&cht=bvg&chco=BF3069|30BF69|9E30BF|CEBF30|3069BF|9A6654|30B1BF|333333,DA94A6|94CAA6|B894CA|D0CA94|94A6CA|BA9482|A4D0DA|666666|CCCCCC&chds="+min3+","+max3+","+min3+","+max3+"&chd=t:"+kmlc.playerAvgDice[0][0]+"|"+kmlc.playerAvgDice[1][0]+"&chg=11.11,20,2,2&chma=0,0,0,24&chm=h,666666,0,0.5:0.5,1,-1|N*2*,000000,0,-1,9,1,s:3:"+numOffset1+"|N*2*,000000,1,-1,9,1,s:-3:"+numOffset2+"&chtt=(3)+average+of+att%2Fdef+dice&chts=000000,12";

	//kmlc.chart3R.src = barChart1;		
			//GM_log("tag "+barChart1);

		$('#chart3R').attr('src', barChart1);	

}

///////############> all luck percentage per player <############################################################################################################################
kmlc.updateLuckStats = function(){		//(1)
//	[	allluck 	perc[0,0,0,0, 0,0,0, 0,0]	counters[0,0,0,0, 0,0,0, 0,0]	arrays[[],[],[],[], [],[],[], [],[]]	]
//		kmlc.playerLuck =[  [ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ]  ];	
//		kmlc.playerLuck [all / att / def] [current perc, counter, array] [player nr]

	var vsA = kmlc.lastRoll[0];
	var vsD = kmlc.lastRoll[1];
	var resA = kmlc.lastRoll[4];
	var resD = kmlc.lastRoll[5];
	var WLD = kmlc.lastRoll[6];
	// calculating luck of the Roll:
	var luckRollA = 0;	
	if (WLD){
		luckRollA = 100 - kmlc.rollStats[vsA-2][vsD-1];	
	}else if(!WLD){
		luckRollA = 0 - kmlc.rollStats[vsA-2][vsD-1];
	}			
	var luckRollD = 0;	
	if (!WLD){
		luckRollD = kmlc.rollStats[vsA-2][vsD-1];
	}else if(WLD){
		luckRollD = 0 - (100 - kmlc.rollStats[vsA-2][vsD-1]);	
	}
	
	//luck players
	kmlc.playerLuck[0][1][kmlc.lastRoll[2]]++;
	kmlc.playerLuck[0][2][kmlc.lastRoll[2]] = ( (kmlc.playerLuck[0][2][kmlc.lastRoll[2]] *(kmlc.playerLuck[0][1][kmlc.lastRoll[2]]-1))+ luckRollA) / kmlc.playerLuck[0][1][kmlc.lastRoll[2]];
	//										(	(							current avg	* counter-1										) + new roll	) / counter				
	kmlc.playerLuck[0][1][kmlc.lastRoll[3]]++;	
	kmlc.playerLuck[0][2][kmlc.lastRoll[3]] = (( kmlc.playerLuck[0][2][kmlc.lastRoll[3]] *(kmlc.playerLuck[0][1][kmlc.lastRoll[3]]-1))+luckRollD ) / kmlc.playerLuck[0][1][kmlc.lastRoll[3]];	
			
	//luck att def:			*experimental*
	kmlc.playerLuck[1][1][kmlc.lastRoll[2]]++;
	kmlc.playerLuck[1][2][kmlc.lastRoll[2]] = (( kmlc.playerLuck[1][2][kmlc.lastRoll[2]] *(kmlc.playerLuck[1][1][kmlc.lastRoll[2]]-1))+luckRollA ) / kmlc.playerLuck[1][1][kmlc.lastRoll[2]];	
			
	kmlc.playerLuck[2][1][kmlc.lastRoll[3]]++;	
	kmlc.playerLuck[2][2][kmlc.lastRoll[3]] = (( kmlc.playerLuck[2][2][kmlc.lastRoll[3]] *(kmlc.playerLuck[2][1][kmlc.lastRoll[3]]-1))+luckRollD ) / kmlc.playerLuck[2][1][kmlc.lastRoll[3]];
				
	//avg att/def
	kmlc.playerLuck[1][1][7]++;
	kmlc.playerLuck[1][2][7] = (( kmlc.playerLuck[1][2][7] *(kmlc.playerLuck[1][1][7]-1))+luckRollA ) / kmlc.playerLuck[1][1][7];
				
	kmlc.playerLuck[2][1][7]++;	
	kmlc.playerLuck[2][2][7] = (( kmlc.playerLuck[2][2][7] *(kmlc.playerLuck[2][1][7]-1))+luckRollD ) / kmlc.playerLuck[2][1][7];
	
	kmlc.playerLuck[0][0][kmlc.lastRoll[2]] = (kmlc.playerLuck[0][1][kmlc.lastRoll[2]] != 0) ? (kmlc.playerLuck[0][0][kmlc.lastRoll[2]] = (100+( kmlc.playerLuck[0][2][kmlc.lastRoll[2]] ) ) /2) : 0;
	kmlc.playerLuck[0][0][kmlc.lastRoll[3]] = (kmlc.playerLuck[0][1][kmlc.lastRoll[3]] != 0) ? (kmlc.playerLuck[0][0][kmlc.lastRoll[3]] = (100+( kmlc.playerLuck[0][2][kmlc.lastRoll[3]] ) ) /2) : 0;

	//att/def luck//		
	kmlc.playerLuck[1][0][kmlc.lastRoll[2]] = (kmlc.playerLuck[1][1][kmlc.lastRoll[2]] != 0) ? (kmlc.playerLuck[1][0][kmlc.lastRoll[2]] = (100+( kmlc.playerLuck[1][2][kmlc.lastRoll[2]] ) ) /2) : 0;
	kmlc.playerLuck[2][0][kmlc.lastRoll[3]] = (kmlc.playerLuck[2][1][kmlc.lastRoll[3]] != 0) ? (kmlc.playerLuck[2][0][kmlc.lastRoll[3]] = (100+( kmlc.playerLuck[2][2][kmlc.lastRoll[3]] ) ) /2) : 0;
	//avg att/def luck:
	kmlc.playerLuck[1][0][7] = (100+( kmlc.playerLuck[1][2][7])) /2;
	kmlc.playerLuck[2][0][7] = (100+( kmlc.playerLuck[2][2][7])) /2;
}
kmlc.updateLuckBar = function(){	//(1)
	var maxL= 0;
	var minL = 100;
	for (ll=6;ll>-1;ll--){
		if (kmlc.playerLuck[0][0][ll] > 0){
			if (kmlc.playerLuck[0][0][ll] > maxL) maxL=kmlc.playerLuck[0][0][ll];
			if (kmlc.playerLuck[0][0][ll] < minL) minL=kmlc.playerLuck[0][0][ll];
		}
	}
	
	if (minL > (100-maxL)) {
		maxL = Math.ceil(maxL/5)*5;
		minL = 100-maxL;
	}else if (minL < (100-maxL)) {
		minL = Math.floor(minL/5)*5;
		maxL = 100-minL;
	}
	var barAvgLuckPerUser ="http://chart.apis.google.com/chart?chof=png&chxl=1:||||players||||all|grey&chxr=0,"+minL+","+maxL+"|1,1,9&chds="+minL+","+maxL +	"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=13,0,6&chs=200x120&cht=bvg&chco=BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC&chd=t:"+ kmlc.playerLuck[0][0] +"&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1|N*0*,000000,0,-1,11&chtt=(1)+Luck+Percentage&chts=000000,11";

	$('#chart1R').attr('src', barAvgLuckPerUser);	
}

///////############> att/def luck percentage per player <############################################################################################################################
kmlc.luckNAD = function(){		//(8)
			
	var maxL= 0;
	var minL = 100;
	//for (ll=0;ll<7;ll++){
	for (ll=6;ll>-1;ll--){
		if (kmlc.playerLuck[1][0][ll] > 0){
			if (kmlc.playerLuck[1][0][ll] > maxL) maxL=kmlc.playerLuck[1][0][ll];
			if (kmlc.playerLuck[1][0][ll] < minL) minL=kmlc.playerLuck[1][0][ll];
		}
		if (kmlc.playerLuck[2][0][ll] > 0){
			if (kmlc.playerLuck[2][0][ll] > maxL) maxL=kmlc.playerLuck[2][0][ll];
			if (kmlc.playerLuck[2][0][ll] < minL) minL=kmlc.playerLuck[2][0][ll];
		}
	}	
		
	if (minL > (100-maxL)) {
		maxL = Math.ceil(maxL/5)*5;
		minL = 100-maxL;
	}else if (minL < (100-maxL)) {
		minL = Math.floor(minL/5)*5;
		maxL = 100-minL;
	}
		var barAllAttDefluck ="http://chart.apis.google.com/chart?chxl=1:||||players||||all|grey&chxr=0,"+minL+","+maxL+"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=a,1,4&chs=200x120&cht=bvg&chco=BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC,BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC,da94a6|94cAa6|b894cA|d0ca94|94a6cA|bA9482|a4d0dA|666666|CCCCCC&chds="+minL+","+maxL+"&chd=t:"+ kmlc.playerLuck[0][0]+"|"+kmlc.playerLuck[1][0]+"|"+kmlc.playerLuck[2][0] +"&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=(8)all+%2B+att%2Fdef+luck&chts=000000,11";
	//	kmlc.chart3L.src = barAllAttDefluck;	
	$('#chart3L').attr('src', barAllAttDefluck);	
}
	
///////############> +-rolls stats <############################################################################################################################			
kmlc.updatePMrollsStat = function(){		//(6)(7)
//			var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//		kmlc.pmRollsArray = [ [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ],[ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ] ];
//			kmlc.pmRollsArray [all/user] [win,loose,draw] [-7 ... 7]

	var wld = (kmlc.lastRoll[6]) ? 0 : ((kmlc.lastRoll[4]==kmlc.lastRoll[5]) ? 2 : 1);	//if win > 0 // if loss > 1 if draw > 2
	
	if( kmlc.lastRoll[2] == kmlc.playerNR || kmlc.lastRoll[3] == kmlc.playerNR ){
		kmlc.pmRollsArray[1][wld][kmlc.lastRoll[0]-kmlc.lastRoll[1]+7]++;
	}else{
		kmlc.pmRollsArray[0][wld][kmlc.lastRoll[0]-kmlc.lastRoll[1]+7]++;
	}
}
kmlc.updatePMrollsBar = function(){		//(6)(7)
	var barDataRolla0 = [];//new Array();
	var barDataRolla1 = [];//new Array();
	var barDataRolla2 = [];//new Array();
	var barDataRollu0 = [];//new Array();
	var barDataRollu1 = [];//new Array();
	var barDataRollu2 = [];//new Array();
	var tot;
	barDataRolls1 = kmlc.pmRollsArray[0][0];
	var lim=20;//more than 20 > calc perc
	for (c=0;c<15;c++){		
		//all players
		tot=kmlc.pmRollsArray[0][0][c] + kmlc.pmRollsArray[0][1][c]+kmlc.pmRollsArray[0][2][c];
		if (tot > lim){
			barDataRolla0.push((lim*kmlc.pmRollsArray[0][0][c])/tot);
			barDataRolla1.push((lim*kmlc.pmRollsArray[0][1][c])/tot);
			barDataRolla2.push((lim*kmlc.pmRollsArray[0][2][c])/tot);
		}else{
			barDataRolla0.push(kmlc.pmRollsArray[0][0][c] );
			barDataRolla1.push(kmlc.pmRollsArray[0][1][c] );
			barDataRolla2.push(kmlc.pmRollsArray[0][2][c] );
		}
		// user only
		tot=kmlc.pmRollsArray[1][0][c] + kmlc.pmRollsArray[1][1][c]+kmlc.pmRollsArray[1][2][c];
		if (tot > lim){
			barDataRollu0.push((lim*kmlc.pmRollsArray[1][0][c])/tot);
			barDataRollu1.push((lim*kmlc.pmRollsArray[1][1][c])/tot);
			barDataRollu2.push((lim*kmlc.pmRollsArray[1][2][c])/tot);
		}else{
			barDataRollu0.push(kmlc.pmRollsArray[1][0][c] );
			barDataRollu1.push(kmlc.pmRollsArray[1][1][c] );
			barDataRollu2.push(kmlc.pmRollsArray[1][2][c] );
		}
	}
			
	var barChart2 = "http://chart.apis.google.com/chart?chxr=0,-7,7|2,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,l,676767|2,333333,9,0,l,676767&chxt=x,r,y&chbh=a,2,4&chs=200x120&cht=bvs&chco=55DD55,333333,DD5555&chds=0,20,0,20,0,20&chd=t:"+barDataRolla0+"|"+barDataRolla2+"|"+barDataRolla1 +"&chdl=won|lost|draw&chdlp=b&chma=12&chg=6.667,20,2,2&chtt=(6)+win%2Floss%2Fdraw+of+att+rolls%2C+all+players&chts=000000,11";
	$('#chart1L').attr('src', barChart2);	

	var barChart2U = "http://chart.apis.google.com/chart?chxr=0,-7,7|2,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,l,676767|2,333333,9,0,l,676767&chxt=x,r,y&chbh=a,2,4&chs=200x100&cht=bvs&chco=55DD55,333333,DD5555&chds=0,20,0,20,0,20&chd=t:"+barDataRollu0+"|"+barDataRollu2+"|"+barDataRollu1 +"&chdlp=b&chma=12&chg=6.667,20,2,2&chtt=(7)+win%2Floss%2Fdraw+of+att+rolls%2C+all+players&chts=000000,11";
	$('#chart2L').attr('src', barChart2U);	
}
	
///////############> other functions+stuff <####################################################################################################################################					
kmlc.moreChartsToggle = function(){		// MOAAARRRRR charts.	
	if (GM_getValue("extendToggle")){
		GM_setValue("extendToggle",false);
		$("#kmlc_LeftExtra").remove();
		$("#kmlc_RightExtra").remove();
	}else{
		GM_setValue("extendToggle",true);
		kmlc.addExtend();
	}	 
}
kmlc.addExtend = function(){
	//Right Extra
	$('#kmlc_BasePanel').append('<div id="kmlc_RightExtra"></div>');
	
	var empty4 = "http://chart.apis.google.com/chart?chxp=0,12,24,36,48&chxr=0,0,48|1,1,8&chxs=0,333333,9,0,lt,333333|1,333333,9,0,l,333333&chxt=y,x&chbh=8,0,6&chs=200x120&cht=bvg&chco=333333,888888&chds=0,48,0,48,0,48,0,48&chd=t2:1,2,3,4,5,6,7,8|1,2,3,4,5,6,7,8|3.5,7,10.5,14,17.5,21,24.5,28&chdlp=b&chg=12.5,12.5,2,2&chma=5&chm=H,666666,2,,1:22,-1&chtt=(4)+Average+per+Att/Def+Roll&chts=000000,10";
	var empty5 = "http://chart.apis.google.com/chart?chxl=1:|1|2|3|4|5|6|7|8|avg&chxr=0,1,6|1,1,9&chds=0,1,6&chxs=0,000000,9,0,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=8,0,4&chs=200x120&cht=bvg&chco=333333,888888&chd=t:0,3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5|3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5&chg=11.11,20,2,2&chds=1,6&chm=h,666666,0,0.5:0.5,1,-1&chtt=(5)+average+of+att%2Fdef+dice,+user+only&chts=000000,10";

	$('#kmlc_RightExtra').append('<img id="chart4Re" src='+empty4+'></img>');
	$('#kmlc_RightExtra').append('<img id="chart5Re" src='+empty5+'></img>');

//// LEFT Panel:
	if(GM_getValue("kmlc_pos2top")!=undefined) {
		$('body').append('<div id="kmlc_LeftExtra" style="z-index:1001; position:fixed; top: '+GM_getValue("kmlc_pos2top")+'; left: '+GM_getValue("kmlc_pos2left")+'; border:1px solid #888888; background:#f0f0f0; color:#000; padding:5px; width:200px; height:auto; text-align:center;"><div id="kmlc_drag2" style="border-bottom: 1px solid #AAAAAA; margin-bottom:5px; font-size:9px;">Draggable Area</div></div>');
	}else{
		$('body').append('<div id="kmlc_LeftExtra" style="z-index:1001; position:fixed; top: 89px; left: 10px; border:1px solid #888888; background:#f0f0f0; color:#000; padding:5px; width:200px; height:auto; text-align:center;"><div id="kmlc_drag2" style="border-bottom: 1px solid #AAAAAA; margin-bottom:5px; font-size:9px;">Draggable Area</div></div>');
	}
	$('#kmlc_drag2').mousedown(function(event){ kmlc.mdowner(event,$('#kmlc_LeftExtra') )});
	$('#kmlc_drag2').mouseover(function(){ $('#kmlc_drag2').css("cursor","move")});

	var empty6 = "http://chart.apis.google.com/chart?chxr=0,-7,7|2,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,l,676767|2,333333,9,0,l,676767&chxt=x,r,y&chbh=a,2,4&chs=200x120&cht=bvs&chco=55DD55,333333,DD5555&chds=0,20,0,20,0,20&chd=t:0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0&chdl=won|lost|draw&chdlp=b&chma=12&chg=6.667,20,2,2&chtt=(6)+win%2Floss%2Fdraw+of+att+rolls,+all+players&chts=000000,11";
	var empty7 = "http://chart.apis.google.com/chart?chxr=0,-7,7|2,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,l,676767|2,333333,9,0,l,676767&chxt=x,r,y&chbh=a,2,4&chs=200x100&cht=bvs&chco=55DD55,333333,DD5555&chds=0,20,0,20,0,20&chd=t:0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0&chdlp=b&chma=12&chg=6.667,20,2,2&chtt=(7)+win%2Floss%2Fdraw+of+att+rolls,+all+players&chts=000000,11";
	var empty8 = "http://chart.apis.google.com/chart?chxl=1:||||players||||all|grey&chxr=0,0,100&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=a,1,4&chs=200x120&cht=bvg&chco=BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC,BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC,da94a6|94cAa6|b894cA|d0ca94|94a6cA|bA9482|a4d0dA|666666|CCCCCC&chds=30,70&chd=t:50,50,50,50,50,50,50,50,50|50,50,50,50,50,50,50,50,0|50,50,50,50,50,50,50,50,50&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=(8)all+%2B+att%2Fdef+luck&chts=000000,11";
	var empty9 = "http://chart.apis.google.com/chart?chxr=0,0,15&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y,r&chbh=a,2,4&chs=200x90&cht=bvs&chco=&chds=0,15,0,30,0,15&chd=t:0|0|0&chdlp=b&chg=14.29,25,2,2&chma=12&chtt=(9)+win%2Floose%2Fdraw+of+att%2Fdef+rolls&chts=000000,11";

	$('#kmlc_LeftExtra').append('<img id="chart1L" src='+empty6+'></img>');
	$('#kmlc_LeftExtra').append('<img id="chart2L" src='+empty7+'></img>');
	$('#kmlc_LeftExtra').append('<img id="chart3L" src='+empty8+'></img>');
	$('#kmlc_LeftExtra').append('<img id="chart4L" src='+empty9+'></img>');
	
	//$('#kmlc_LeftExtra').append('<img id="chart5L" src='+empty9+'></img>');
}
kmlc.addGHchartSection = function(idtag,numbersON){
	var empty10 = "http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,0,100&chds=0,100&chxt=y&chbh=a,0,1&chs=200x120&cht=bvg&chco=&chd=t:0&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=game+history:+luck+percentages&chts=000000,11";
	var empty11 = "http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,0,100&chds=0,100&chxt=y&chbh=a,0,1&chs=200x100&cht=bvg&chco=&chd=t:0&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
	
	$('#'+idtag).append('<img id="chart5L" src='+empty10+'></img>');
	$('#'+idtag).append('<img id="chart6L" src='+empty10+'></img>');
	$('#'+idtag).append('<img id="chart7L" src='+empty11+'></img>');
	$('#'+idtag).append('<div id="divbox5R"></div>');
	
	$('#divbox5R').append("<select name='gameHist01' id='GameHistSelection1'>\
		<option selected value=1>luck</option>\
		<option value=4>avg</option>\
		<option value=7>WDL</option>\
		<option value=8>coco</option>\
		<option value=9>place</option>\
	</select>\
	<select type='select' name='gameHist02' id='GameHistSelection2'>\
		<option selected value=7000>tables</> <option value=0>0's</>\
		<option value=100>100's</> <option value=500>500's</>\
		<option value=2000>2000's</> <option value=5000>5000's</>\
		<option value=6000>tournies</> <option value=8000>all</>\
	</select>\
	<select type='select' name='gameHist03' id='GameHistSelection3'>\
		<option selected value=10>all</> <option value=0>red</>\
		<option value=1>green</> <option value=2>purple</>\
		<option value=3>yellow</> <option value=4>blue</>\
		<option value=5>brown</> <option value=6>teal</>\
	</select>"+
	"numbers:<input type='checkbox' id='numberMode'>");
	
if(numbersON){
	$("#numberMode").prop('checked',true);
}
	
	$("#divbox5R").change(kmlc.updateGameHist);
}

///////############> data storage functions <######################################################################################################################################				

kmlc.storeMData = function(score,place,rounds){
	//if (kmlc.tableStatus[2]=="tournament"){
//		score = 0;
//		kmlc.getCurrentLogs().forEach(function(node) {
//			node.className="tagged"
//			var content = node.textContent;
//			GM_log("node test"+content);
//			if(content.indexOf(user+" finishes the tournament") != -1) {
//				place = content.split(" ")[(content.split(" ").indexOf("tournament")+1)];
//				score -= parseFloat(dojo.query(".iogc-info")[0].innerHTML.split("◆")[0]);			
//				if(content.indexOf("and wins") != -1) {
//					score = content.split(" ")[(content.split(" ").indexOf("wins")+1)]
//					score += score.substring(0,score.length-4).replace(",","");
//				}
//				GM_log("tourney: "+content);
//			}
//		})
//		
//		GM_log("tourney: S:"+score+" P:"+place);
//
//	}
		
	//time and date stuff:
	var d = new Date();
	var year = d.getYear();
	var month = d.getMonth()+1;
	var day = d.getDate();

	//get localStorage of the month:
	var dataObject = kmlc.getMData(year,month);
	var gameNR = Object.size(dataObject)+1;

	//collect all data in one array:
	var gameTime = gt = (d.getTime() - kmlc.startTime)/1000;
	var S = Math.floor(gt % 60);
	gt /= 60;
	var M = Math.floor(gt % 60);
	gt /= 60;
	var H = Math.floor(gt % 24);
	GM_log("gameTime = "+H+":"+M+":"+S+" rounds:"+rounds);
	var tableType = (kmlc.tableStatus.indexOf("tournament") != -1) ? 6000 : kmlc.tableStatus.split(" ")[2];
	var tdr =  (kmlc.AvPeDiU[0][1][8] + kmlc.AvPeDiU[1][1][8]); // ?????
	//GM_log("game over. score="+score +",place="+place);
	var gameResult = new Array(tableType, kmlc.playerNR,  kmlc.roundDec(kmlc.playerLuck[0][0][kmlc.playerNR],1),  kmlc.roundDec(kmlc.playerLuck[1][0][kmlc.playerNR],1),  kmlc.roundDec(kmlc.playerLuck[2][0][kmlc.playerNR],1), 	 kmlc.playerAvgDice[0][1][kmlc.playerNR], kmlc.playerAvgDice[1][1][kmlc.playerNR],	kmlc.playerAvgDice[0][2][kmlc.playerNR], kmlc.playerAvgDice[1][2][kmlc.playerNR] ,kmlc.WLDarray[0][kmlc.playerNR], kmlc.WLDarray[2][kmlc.playerNR], kmlc.WLDarray[1][kmlc.playerNR], kmlc.WLDarray[4][kmlc.playerNR],kmlc.WLDarray[5][kmlc.playerNR],kmlc.WLDarray[3][kmlc.playerNR], score, parseFloat(place.charAt(0)), Math.ceil(gameTime), month, day, rounds);
	
	//GM_log("GAMERESULT: tt: "+tableType+" player: "+ kmlc.playerNR+" luck: "+ kmlc.roundDec(kmlc.playerLuck[0][0][kmlc.playerNR],1)+" = "+ kmlc.roundDec(kmlc.playerLuck[1][0][kmlc.playerNR],1)+" / "+ kmlc.roundDec(kmlc.playerLuck[2][0][kmlc.playerNR],1)+" avg: "+kmlc.playerAvgDice[0][0][kmlc.playerNR]+" / "+ kmlc.playerAvgDice[1][0][kmlc.playerNR]+" total result: "+	 kmlc.playerAvgDice[0][1][kmlc.playerNR]+" / "+ kmlc.playerAvgDice[1][1][kmlc.playerNR] +" dice rolled: "+	 kmlc.playerAvgDice[0][2][kmlc.playerNR]+" / "+ kmlc.playerAvgDice[1][2][kmlc.playerNR] +"att WLD:"+kmlc.WLDarray[0][kmlc.playerNR]+" / "+ kmlc.WLDarray[2][kmlc.playerNR]+" / "+ kmlc.WLDarray[1][kmlc.playerNR]+" def WLD "+ kmlc.WLDarray[4][kmlc.playerNR]+" / "+ kmlc.WLDarray[5][kmlc.playerNR]+" / "+ kmlc.WLDarray[3][kmlc.playerNR])

//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]	[gametime]	[month, date, game]		[rounds]
//									0								1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16	  17		18		19		20			21
	
	//add new game data:
	dataObject["G"+gameNR] = gameResult;
	//store it:
	localStorage.setItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month, JSON.stringify(dataObject));
	
	GM_log("test localStorage.getItem test:"+ localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month) );
//	GM_log("test localStorage.getItem 2"+ localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month)[3] );


////how to access localStorage example:
//var jssstest = eval('(' + localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month) +')');
//GM_log("test localStorage.getItem 3"+ jssstest["G"+3][4] );
	kmlc.startTime = null;
	dataObject=null;

}
kmlc.getMData = function(year,month){
	var dataObject;
	if (localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month)){
		var dataString = localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month);
	//	GM_log("kmlc.getMData dataString= "+dataString+" localkey:"+localStorage.key(1));
		dataObject =  eval('(' + dataString +')');
	}else{
		dataObject ={};
	}
	return dataObject;
}

///////############> other functions <############################################################################################################################						

kmlc.countSeated = function(){	//count how many ppl sit on a tourney table	//TODO
	var num = 7;
	for(var i=6;i>-1;i--){
		$(".iogc-PlayerPanel"+i).each(function(index) {
			if ($(this).text() == ""){	num--;	}
			GM_log("countSeated ["+i +"]: "+$(this).text()+" num="+num);
		})
	}
	return num;
}

kmlc.checkSeated = function(){	//check if user is seated on table.
	var bool = false;
	$(".iogc-PlayerPanel-name").each(function(index) {
		if ($(this).text() == kmlc.user){	bool= true;}
	})
	return bool;
}

kmlc.checkPlayer = function (){	//get playerNR of user
	for(var i=6;i>-1;i--){
		$(".iogc-PlayerPanel"+i).each(function(index) {
			if ($(this).text().indexOf(kmlc.user) != -1){
				kmlc.playerNR = i;
				kmlc.userColor1 = kmlc.getColorNR(i,true);
				kmlc.userColor2 = kmlc.getColorNR(i,false);	
			}
		GM_log("checkplayer ["+i +"]: "+$(this).text()+" user:"+kmlc.user);
		})
	}
		GM_log("kmlc.playerNR>>> "+kmlc.playerNR);
}

kmlc.getNrPlayer = function(con){	return con.slice(con.indexOf("span class=")+1).split("")[12];	}

kmlc.getColorNR = function(numb,AorD,WorL){
var color;
	switch (numb){
		case 0: color = (AorD) ? "BF3069" : "da94a6";
		break;
		case 1: color = (AorD) ? "30BF69" : "94cAa6";
		break;
		case 2: color = (AorD) ? "9E30BF" : "b894cA";
		break;
		case 3: color = (AorD) ? "cebf30" : "d0ca94";
		break;
		case 4: color = (AorD) ? "3069BF" : "94a6cA";
		break;
		case 5: color = (AorD) ? "9A6654" : "bA9482";
		break;
		case 6: color = (AorD) ? "30B1BF" : "a4d0dA";
		break;
		case 8:	color =  "CCCCCC";
		break;
		default: color="000000";
	}	
	return color;
}

kmlc.newScale1 = function(){	//chart2R
	if ($('#allNotUser').prop('checked') == true){
		kmlc.histAllOrUser = true;
	}else if ($('#userNotAll').prop('checked') == true){
		kmlc.histAllOrUser = false;
	}
	kmlc.updateHistBar();
}

kmlc.tagAllRows = function() {	$(".iogc-MessagePanel-messages tr:not(.tagged)").each(function(index) {$(this).addClass("tagged")}); };

kmlc.roundDec = function(number, decimalPlaces){
	return Math.round(number*Math.pow(10, decimalPlaces))/Math.pow(10, decimalPlaces);
}

//// extended encoding for charts:
kmlc.extendedEncode = function(arrVals, maxVal) {
	var EXTENDED_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
	var EXMAPL = EXTENDED_MAP.length;
	var chartData = '';

	for(i = 0, len = arrVals.length; i < len; i++) {
		// In case the array vals were translated to strings.
		var numericVal = new Number(arrVals[i]);
		// Scale the value to maxVal.
		var scaledVal = Math.floor(EXMAPL * EXMAPL * numericVal / maxVal);
		
		if(scaledVal > (EXMAPL * EXMAPL) - 1) {
			chartData += "..";
		} else if (scaledVal < 0) {
			chartData += '__';
		} else {
		// Calculate first and second digits and add them to the output.
		var quotient = Math.floor(scaledVal / EXMAPL);
		var remainder = scaledVal - EXMAPL * quotient;
		chartData += EXTENDED_MAP.charAt(quotient) + EXTENDED_MAP.charAt(remainder);
		}
	}
	return chartData;
}

/////// settings pop up:
kmlc.addSettings = function(){
	$('body').append('<div id="kmlc_formDIV" style="z-index:1111; position:absolute; top:'+((window.innerHeight/2)-200)+'px; left:'+((window.innerWidth/2)-200)+'px; width:400px; height:200px; background-color:#f0f0f0; border: 1px solid #888888; text-align:center; font-size:11px;display:none;"> </div>');
	
	$('#kmlc_formDIV').append("<form id='fff'><hr> Luck Chart & Averages Plugin Settings<hr>"+
	"Enter desired time interval at which the plugin checks+calculates new data. This could be something between 100-9000.(kakku recommends 1000-ish for now) <br/>Feel free to experiment with this. if you have found your favorite setting tell kakku man about it please <br/> You will need to refresh for it to take effect!</br>"+
	"Set TimeInterval:<input type='text' id='kmlcform_speed' value='1499' /><br/>"+
	"<div><button id='kmlc_formCancel' tabindex='0' type='button' class='gwt-Button'>Cancel</button> <button id='kmlc_formOK' tabindex='0' type='button' class='gwt-Button'>OK</button></div><hr>"+
	"Delete this months locally saved data:<button id='form_resetDATA' tabindex='0' type='button' class='gwt-Button iogc-GameWindow-standUpButton'>reset</button></br><hr>"+
	" </form>");
	
	$("#form_resetDATA").click( kmlc.resetAllData);
	$("#kmlc_formCancel").click( kmlc.showHideForm);
	$("#kmlc_formOK").click( kmlc.changeSettings);
}
kmlc.showHideForm = function() {
    if( $("#kmlc_formDIV").css("display") == "none" ){
        $("#kmlc_formDIV").show();
		var curSpeed = GM_getValue("kmlc_speed") ? GM_getValue("kmlc_speed") : 1500;
		$('#kmlcform_speed').value = curSpeed;
	GM_log('show > '+curSpeed)
    } else {
        $("#kmlc_formDIV").hide();
    }
}	
kmlc.changeSettings = function(form){ 
	var newSpeed = $('#kmlcform_speed').value;
	GM_log("new timeInterval= "+newSpeed+" , refresh to let it take effect. ");
	kmlc.showHideForm();
	if (newSpeed!=null && newSpeed!=""){
		GM_setValue("kmlc_speed",newSpeed);
	}
}
/////draggable functions:
kmlc.mdowner = function(event, elem) {
	kmlc.dragThis = elem;
	$('body').mousemove(function(event){ kmlc.mmover(event)});
	$('body').mouseup(function(event){ kmlc.mupper(event)});
	clickX=event.pageX;
	clickY=event.pageY;
	itemX = kmlc.dragThis.css("left");
	itemY = kmlc.dragThis.css("top");
    kmlc.Xoffset = clickX - parseFloat(itemX);
    kmlc.Yoffset = clickY - parseFloat(itemY);
}
kmlc.mmover =function(event) {
	kmlc.x=event.pageX - kmlc.Xoffset;
	kmlc.y=event.pageY -kmlc.Yoffset;
	kmlc.dragThis.css("left", kmlc.x+"px");     
	kmlc.dragThis.css("top", kmlc.y+"px");
}
kmlc.mupper =function() {
	$("body").unbind();
	kmlc.dragThis.css("left", kmlc.x+"px");
	kmlc.dragThis.css("top", kmlc.y+"px");
	//store position:
	if(kmlc.dragThis.attr("id")=='kmlc_BasePanel' ){
		GM_log("works1")
		GM_setValue("kmlc_pos1left",kmlc.dragThis.css("left"));
		GM_setValue("kmlc_pos1top",kmlc.dragThis.css("top"));
	}else if(kmlc.dragThis.attr("id")=='kmlc_LeftExtra'){
		GM_log("works1")
		GM_setValue("kmlc_pos2left",kmlc.dragThis.css("left"));
		GM_setValue("kmlc_pos2top",kmlc.dragThis.css("top"));		
	}else{
		GM_log("works not > "+kmlc.dragThis.attr("id"))
	}
}

$(document).ready(function(){
	//if (window.top != window.self)  return; //-- Don't run on frames or iframes
	window.setTimeout(kmlc.init, 2550); 
});