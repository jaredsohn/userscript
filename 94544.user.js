// ==UserScript==
// @name           kakku man's stats improve
// @description    calculates TAPL TAZD etc on the fly and makes table sortable
// @description    version 0.1.3
// @namespace      kdice
// @include        	*kdice.com/leaderboardAll*
// @include			*kdice.com/monthStats*
// @include			*kdice.com/profile/*/stats
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @require        http://autobahn.tablesorter.com/jquery.tablesorter.min.js
// @version        0.1.3
// ==/UserScript==

kmsi = {}

kmsi.checkUD = function(dat){
	answer = $(dat).find('.tagline').text().split(">")
	var ver = answer[answer.indexOf('kmsi')+1];
	
	if(kmsi.VERSION != ver){
	GM_log("confirm update??");
		if(confirm("version "+ ver +" of kakku man's Stat Improver is available!\nDo you want to upgrade now?"))	window.location = "http://userscripts.org/scripts/source/94544.user.js";
	}
	GM_log("checked for update=="+ver+" ? "+kmsi.VERSION);
}


kmsi.init = function() {
	GM_log("initiate stat improver started...");
	
//check version:
	kmsi.VERSION = "0.1.3";
	var now = new Date().getTime()
	if(GM_getValue("kmsi_checkUpdate")!=undefined && now-parseFloat(GM_getValue("kmsi_checkUpdate")) > 86400000){	//daily check
		$.get("http://kdice.com/profile/45032677", function(data){ 		kmsi.checkUD(data); 		});
	}
	GM_setValue("kmsi_checkUpdate", now.toString());

	var pnlinks = "";
	var statTable;
	var playerstat;
			
	if(window.location.href.indexOf("monthStats") != -1){
		playerstat= false;
		statTable = $('.wide.stats');
		pnlinks = $('#mainpage td:first-child div:first-child').html();
		pnlinks = pnlinks.slice(0,pnlinks.indexOf("<h3>"));	
	} else if(window.location.href.indexOf("stats") != -1 && window.location.href.indexOf("profile") != -1 ){
		playerstat = true;
		statTable = $('.section:last .wide.stats');
		pnlinks = "";
	} else {
		playerstat= false;
		statTable = $('.wide.stats');
		pnlinks = $(".pages").html(); 
	}
	
//adding links panel:	
	$('body').append('<div id="statAddonDiv" style="text-align:left;">'+
		'<a href="/leaderboard" class="notcurrent">• LEADERBOARD</a></br>'+
		'<a href="/leaderboardAll" class="current"><img src="http://static.iogc.org/date.gif" style="padding-right: 3px; textalign:left">This Month</a></br>'+
		'<a href="/monthStats" class="notcurrent"><img src="http://static.iogc.org/date_go.gif" style="padding-right: 3px;" align="absmiddle">Month Archives</a></br>'+
		'<a href="/careerStat" class="notcurrent"><img src="http://static.iogc.org/coins.gif" style="padding-right: 3px;" align="absmiddle">Career</a></br>'+
		'<hr>' +  pnlinks + '</br></br><hr>'+
		'<div style="font-size: 10px;"><b>Stat Improver </b><a href="http://userscripts.org/scripts/source/94544.user.js" title="Version of this GM script, click to check for a new version." > version:'
		+kmsi.VERSION+'</a>'+
		'</br>Set min.game threshold: <button id="statSettings" tabindex="0" type="button" class="gwt-Button"  style="font-size:9px; float:right;">X</button></br>'+
	'</div>');
	$('#statSettings').click(function(){kmsi.settings()});
		
// some styling:
	$("<style type='text/css'>\
		.highest {	color: rgb(88, 166, 255); font-weight: bold; font-size: 13; 	}\
		.lowest {	color: rgb(255, 0, 0); font-weight: bold; font-size: 12;	}\
		#yui-b {	margin-right: auto !important; 	}\
		#statAddOnDiv { 	font-size: 13px; position: fixed; bottom: 300px; right: 0px; width: 140px; padding: 5px; background-color: #f0f0f0; border-top: 1px solid #cccccc; z-index: 1001; 	}\
		.totavg { 	border: 1px solid #58A6FF; 	}\
		.odd { 	background:#F2F4F6; 	}\
		#mainpage { 	border-width:0; 	}\
	</style>").appendTo("head");
			
//		
//	//	rank	name	score	games 	ppg		best/worst	max/min		kills	dom		att/def		luck	1st ---- 7th 
//	//	0		1		2		3		4		5			6			7		8		9			10		11-12-13-14-15-16-17
//	
	worst = [	1000000,	// rank/month 0
	1000000,	// name/rank 1
	1000000,	// score 2
	5000,		//	games  3
	100000,		//	ppg	4
	1000000,	//	best/worst 5
	100000,		//	max/min	6
	100000,		//	kills	7
	100,		// dom	8
	100,		// att	9
	10000,		// luck	10
	100,		// 1st 11..
	100,	100,	100,	100,	100,	100,	// 7th ..17
	100000,		// ASR	18
	100000,		// ASRm	19
	100,		// kill 20
	100000,		// TAZD 23
	100000,		// TAZD* 24
	1000000];	//	ersatz 25
	
	best = [	// best OR most
	0,	// rank/month 0
	0,		// name/rank 1
	0,		// score 2
	0,		//	games  3
	0,		//	ppg	4
	0,		//	best/worst 5
	0,		//	max/min	6
	0,		//	kills	7
	0,		// dom	8
	0,		// att	9
	0,		// luck	10
	0,		// 1st 11..
	0,	0,	0,	0,	0,	0,	// 7th ..17
	0,		// ASR	18
	0,		// ASRm	19
	0,		// kill 20
	0,		// TAZD 23
	0,		// TAZD* 24
	0];		// ersatz 25
	
	winners = [0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0,	0,0,0 ];	
	losers = [0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0,	0,0,0,0,0,	0,0,0 ];	
	
	var minG = (GM_getValue("kmsi_minGames")!=undefined) ? GM_getValue("kmsi_minGames") : 35;	
	var expTAZD = [7.2, 7.9, 10.2, 14, 17.5, 20.3, 22.9];
	
	//fixing zebra:
	statTable.find(".list-odd").removeClass('list-odd');

	//repositioning thead
	var headers = statTable.find("tbody tr:first-child").html();
	statTable.prepend('<thead>'+headers+'</thead>');
	statTable.find("tbody tr:first-child").remove();
	
	statTable.find('thead tr').append('<th>ASR</th><th>ASRm</th><th>KPPK</th><th>TAZD</th><th>TAZD+</th><th>ersatz</th>');
	statTable.find('thead th').css("padding-left","3px");
	statTable.css("width","114%")			

				
	var totP =0, totG = 0,totM=0,totK=0,totD = 0,totPpg = 0,totA=0,totL=0,totE = 0, tot1=0, tot2=0, tot3=0, tot4=0, tot5=0, tot6=0, tot7=0, totcount=0;

//get data from table:
	statTable.find('tbody tr').each(function(index0,tr){
		var row = $('td',tr).map(function(index, td) {
			return parseFloat($(this).text().replace("%","").replace(/,/g, "").replace("◆", "").replace(".","").replace("st","").replace("nd","").replace("rd","").replace("th","") );
		});
	
		// sum of 1st-7th %'s
		var sumperc =  (row[11]+row[12]+row[13]+row[14]+row[15]+row[16]+row[17]);
			////	(Sum of (expected %-actual %)squared/expected%) x square root of games x 1000.  --> TAPL TAZD TAZD*
		var sum=0, sum2=0, sum3=0;
		for (var p=6; p>=0; p--){
			var dif = ( row[p+11] - expTAZD[p] );
			var np = (dif < 0) ? -1 : 1;

			sum += Math.pow( ( 14 - row[p+11]), 2) / 14;
			sum2 += Math.pow( ( expTAZD[p] - row[p+11]), 2) / expTAZD[p];
				
			if (p<3){	sum3 += np * ( Math.pow( dif, 2) / expTAZD[p] );
			}else {		sum3 -= np * ( Math.pow( dif, 2) / expTAZD[p] );
			}

		}
		//var tapl = Math.floor(10*sum * Math.sqrt(row[3]) / Math.sqrt(sumperc/100) );
		var tazd = Math.floor(10*sum2 * Math.sqrt(row[3]) / Math.sqrt(sumperc/100) );
		var mtazd = (row[3] >= 300) ? Math.floor(10*sum3 * Math.sqrt(300) / Math.sqrt(sumperc/100) ) : Math.floor(10*sum3 * Math.sqrt(row[3]) / Math.sqrt(sumperc/100) );
			
		////	((games*PPG)(4*1st percentage+3*2nd+2*3rd+4th-6th-2*7th)/100)+(games/25) 
		var ASRm = ( (4 * row[11]) + (3 * row[12]) + (2 * row[13]) + (row[14]) - (row[16]) + (-2 * row[17]) ) / 100;
		var ASR = Math.floor( ( ( row[3] * row[4] * ASRm ) / 100 + ( row[3] / 25 ) )  );
		ASRm = Math.floor(ASRm*100)/100;
						
		//// (kill / possible kills ) ==>  kill% = ( ( kills*100	/ 	( total possible kills = possible kills per game * games)
		var kill = Math.floor( 	(row[7]*1000  / (		( (row[11]*6 +row[12]*5 + row[13]*4 + row[14]*3 +row[15]*2+ row[16])/sumperc)	* 	row[3] 	* 	(sumperc/100) 	) )	)/10;			
		
		////	ERSATZ:		score - ( games * ppg)
		ersatz =  row[2] - (row[3]*row[4]);
			
		//exeptions:
		if(row[3] < 35){
			ASR = "-";
			ASRm ="-";
			tazd="-";
			mtazd="-";
		}
		zkillz =(row[3]==0)? "-" : kill+"%";	
		
		if(playerstat){
			totP += row[2];
			totG += row[3];
			totPpg +=row[4];
			totM += row[6];
			totK += row[7];
			totD += row[8]*row[3];
			totA += row[9]*row[3];
			totL += row[3]*(row[10]);
			totE += ersatz;
			tot1 += row[3]*(row[11]);
			tot2 += row[3]*(row[12]);
			tot3 += row[3]*(row[13]);
			tot4 += row[3]*(row[14]); 
			tot5 += row[3]*(row[15]);
			tot6 += row[3]*(row[16]);
			tot7 += row[3]*(row[17]);
			totcount++;
		}
			
// putting data into table
		$(this).append('<td>'+ASR+'</td><td>'+ASRm+'</td><td>'+zkillz+'</td><td>'+tazd+'</td><td>'+mtazd+'</td><td>'+kmsi.addComma(ersatz)+'◆</td>');
		
//checking for best / worst:
		if(row[3] >	minG){
			for (var b=17;b>0;b--){
				if(b<=13 && b>1){
					if(best[b] < row[b] && row[b] > 0 && (row[b] != 100)){ 	best[b] = row[b]; winners[b] = index0;	}
					if(worst[b] > row[b] && row[b] != 0  ){ 	worst[b] = row[b]; losers[b] = index0;	}
				}else if (b>13 || b==1){
					if(best[b] < row[b] && row[b] > 0 && (row[b] != 100)){ 	best[b] = row[b]; losers[b] = index0;		}
					if(worst[b] > row[b]  ){ 	worst[b] = row[b]; winners[b] = index0;	}
				}
			}
			if(best[18] < ASR) { best[18] = ASR; winners[18] = index0;}
			if(best[19] < ASRm){  best[19] = ASRm; winners[19] = index0;}
			if(best[20] < kill){  best[20] = kill; winners[20] = index0;}
			if(best[21] < tazd){  best[21] = tazd; winners[21] = index0;}
			if(best[22] < mtazd){  best[22] = mtazd; winners[22] = index0;}
			if(best[23] < ersatz){  best[23] = ersatz; winners[23] = index0;}
			if(worst[18] > ASR) { worst[18] = ASR; losers[18] = index0;}
			if(worst[19] > ASRm){  worst[19] = ASRm; losers[19] = index0;}
			if(worst[20] > kill){  worst[20] = kill; losers[20] = index0;}
			if(worst[21] > tazd){  worst[21] = tazd; losers[21] = index0;}
			if(worst[22] > mtazd){  worst[22] = mtazd; losers[22] = index0;}
			if(worst[23] > ersatz){  worst[23] = ersatz; losers[23] = index0;}
		}
		if(row[3] < worst[3]){ worst[3] = row[3]; losers[3] = index0;}
				
	});


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
			
		////	((games*PPG)(4*1st percentage+3*2nd+2*3rd+4th-6th-2*7th)/100)+(games/25) 
		var tASRm = ( (4 * tot1) + (3 * tot2) + (2 * tot3) + (tot4) - (tot6) + (-2 * tot7) ) / 100;
		var tASR = Math.floor( ( ( totG * totPpg * tASRm ) / 100 + ( totG / 25 ) )  );
		tASRm = Math.floor(tASRm*100)/100;
		
		//// (kill / possible kills ) ==>  kill% = ( ( kills*100	/ 	( total possible kills = possible kills per game * games)
		var KPPKtot = Math.floor( 	(totK*1000  / (		( ((tot1/totG)*6 +(tot2/totG)*5 + (tot3/totG)*4 + (tot4/totG)*3 +(tot5/totG)*2+ (tot6/totG))/sumperc2)	* 	totG 	* 	(sumperc2/100) 	) )	)/10;			
			
		statTable.find('tbody').append('<tr class="list-item totavg">\
			<td>average (total)</td>\
			<td>-</td>\
			<td>'+kmsi.addComma(Math.round(totP/totcount))+'◆ ('+kmsi.addComma(totP)+'◆)</td>\
			<td>'+Math.round(totG/totcount)+' ('+totG+')</td>\
			<td>'+Math.round((totP-totE)/totG)+'</td>\
			<td><span style="color:#080">+0</span>/<span style="color:#800">-0</span></td>\
			<td>'+kmsi.addComma(Math.round(totM/totcount))+'◆ ('+kmsi.addComma(totM)+'◆)</td>\
			<td>'+Math.round(totK/totcount)+' ('+totK+')</td>\
			<td>'+Math.floor(totD/totG)+'%</td>\
			<td>'+Math.floor(totA/totG)+' : '+(100-Math.floor(totA/totG))+'</td>\
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
			<td>'+kmsi.addComma(Math.round(totE/totcount))+'◆ ('+kmsi.addComma(totE)+'◆)</td>\
		</tr>');
	}

	//		<td>'+tASR+'</td>\
	//		<td>'+tASRm+'</td>\
	//		<td>'+ttazd+'</td>\
	//		<td>'+tmtazd+'</td>\
	
//highlight highest/lowest
$.each(losers, function(index, value) { 
	if(index > 1 || playerstat && index ==1){
		//GM_log("lowest: k:"+index+" v:"+value);
		statTable.find('tbody tr:eq('+value+')').find('td:eq('+index+')').addClass('lowest');
	}
});
$.each(winners, function(index, value) { 
	if(index > 1 || playerstat && index ==1){
		//GM_log("highest: k:"+index+" v:"+value);
		statTable.find('tbody tr:eq('+value+')').find('td:eq('+index+')').removeClass('lowest').addClass('highest');
	}
});

	var tables = statTable;//$(".section:last .wide.stats");		
	tables.addClass("tablesorter");
	  
    // adding custom parsers:
	$.tablesorter.addParser({
    	id: "monthYear",
    	is: function(s) {
    	    return false; 
    	},
    	format: function(s) {
    	    return s.split(" ")[1]+" "+s.split(" ")[0];
    	},
    	type: "numeric/text"
	});
	$.tablesorter.addParser({
    	id: "maxmin",
    	is: function(s) {
    	    return false; 
    	},
    	format: function(s) {
			////GM_log("weird test:: "+ s.split(">")[1].split("<")[0].replace('+', '').replace('-', ''))
    	    return s.split(">")[1].split("<")[0].replace('+', '').replace('-', '');
		},
		type: "digit"
	});
	$.tablesorter.addParser({
    	id: "linkednames",
    	is: function(s) {
    	    return false; 
    	},
    	format: function(s) {
    	    return s.replace(new RegExp(/<.*?>/g),"").toLowerCase();
		},
		type: "text"
	});
	$.tablesorter.addParser({
    	id: "colscore",
    	is: function(s) {
    	    return false; 
    	},
    	format: function(s) {
			//GM_log("weird test:: "+ s.replace(new RegExp(/<.*?>/g),"")+" > "+s.innerHTML);//.split(">")[1].split("<")[0])
    	    return s.replace(new RegExp(/<.*?>/g),"");//s.split(">")[1].split("<")[0];
		},
		type: "digit"
	});
if (playerstat){
    tables.tablesorter({ 
		widgets: ['zebra'],
		headers: {
			0: { sorter: 'monthYear' }, 
			1: { sorter: 'digit' },
			2: { sorter: 'digit' },
	     	5: { sorter: 'maxmin' },
	     	6: { sorter: 'digit' },
			23: { sorter: 'digit' }
		 },
        // define a custom text extraction function 
        textExtraction: function(node) { 
			return node.innerHTML.replace(",",""); 
        } 
    }); 
}else{
	tables.tablesorter({ 
		widgets: ['zebra'],
		sortInitialOrder: 'desc',
		headers: {
			0: { sorter: 'digit' }, 
			1: { sorter: 'linkednames' },
			2: { sorter: 'digit' },
	     	5: { sorter: 'maxmin' },
	     	6: { sorter: 'digit' },
			23: { sorter: 'digit' }
		 },
        // define a custom text extraction function 
        textExtraction: function(node) { 
			return node.innerHTML.replace(/,/g,""); 
        } 
    }); 	
}
	
	kmsi.showHistory();
	GM_log("kakku man's stat improver initiated succesfully.");
}

kmsi.settings = function(){
	var minG = (GM_getValue("kmsi_minGames")!=undefined) ? GM_getValue("kmsi_minGames") : 35;
	GM_setValue("kmsi_minGames", prompt("set minimal games to?",minG) );	
}

//extra functions
kmsi.addComma = function(nStr){	// adds a comma like 1234 => 1,234
	nStr = nStr.toString();
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + "," + '$2');
	}
	return nStr;
}
kmsi.suffixer = function(n){	// adds a comma like 1234 => 1,234
	n=n+'';
	var l=n.length, r=parseInt(n.substring(l-2,l)), i = n % 10;
	return ((r < 11 || r > 19) && (i < 4)) ? ['th','st','nd','rd'][i] : 'th';
}
kmsi.sechms = function(secs){
	var m = (secs / 60) | 0;
	return (m < 10 ? "0" + m : m) 
		+ "m:"
		+ ( ( secs %= 60 ) < 10 ? "0" + secs : secs)
		+ "s";
}
kmsi.colrblock =function(c){
	var color;
	switch	(c){
		case 0: color =  "BF3069"; break;
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


/// 	------------	 show locally stored games history		---------->
kmsi.showHistory = function(){
	if(window.location.href.indexOf("stats")!= -1){	//check if on stats page
		var profileNR = window.location.href.split("/")[4];
		var marray=["","January","February","March","April","May","June","July","August","September","October","November","December"];
	
		var d=new Date();
		var year = d.getYear();
		var yearN = d.getFullYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
		
		if(localStorage.getItem('kmlc_'+profileNR+'_y'+year+'_m'+month)!= undefined){
			$('#profile').append('<h3>Game History</h3>	<div id="GHcharts"></div> 	<div id="GHtdiv" class="section">	<div id="GHsel">get data from the past:<select><option value="kmlc_'+profileNR+'_y'+year+'_m'+month+'">'+yearN+' '+marray[month]+'</option></select>	<button id="GHgo">GO</button></div>	<table id="GHtab" class="wide stats tablesorter"></table></div>');
			$('#GHgo').click(function(){kmsi.GHgoshow()});
	
			for(var i=0;i<localStorage.length;i++){
				var k = localStorage.key(i)
				if(k.indexOf(profileNR) != -1){
	//				GM_log("test keys!: "+ k +" m= "+ marray[parseFloat(k.split("_m")[1])] );
					$('#GHsel select').append('<option value='+k+'>20'+k.split("_m")[0].split("_y1")[1]+' '+marray[parseFloat(k.split("_m")[1])]+'</option>')
				}
			}
		}
		kmsi.GHgoshow();
	}
}
kmsi.GHgoshow = function(){
	$('#GHtdiv table').remove();
	var keysel = $('#GHsel option:selected').val();
	var dataString = localStorage.getItem(keysel);
	var	dataObject =  eval('(' + dataString +')');

	var size=0,key;	
	for (key in dataObject) {
		if (dataObject.hasOwnProperty(key)==true) 	size++;
	}
	
	$('#GHtdiv').append('<table id="GHtab" class="wide stats tablesorter"></table>');
	$('#GHtab').append('<thead> <th>Game</th> <th>Table</th> <th>Color</th> <th>Place</th>  <th>score15</th>  <th>Luck</th>  <th>rounds</th>  <th>gameTime</th> \
	   <th>avg/dice</th> <th>avgA</th> <th>avgD</th> <th>diceRolled</th>  </thead>');
	$('#GHtab').append('<tbody></tbody>');
	
//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]	[gametime]	[month, date, game]		[rounds]
//									0								1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16	  17		18		19		20			21
	for(var g=size;g>0;g--){		//	<td></td>
		$('#GHtab tbody').append('<tr class="list-item">\
			<td>'+g+'</td>\
			<td>'+(dataObject["G"+g][0]=="6000"?"tourney":dataObject["G"+g][0])+'</td>\
			<td><div style="margin:0 5px 0 5px; color:'+kmsi.colrblock(dataObject["G"+g][1])+'; background-color:'+kmsi.colrblock(dataObject["G"+g][1])+'">'+dataObject["G"+g][1]+'</div></td>\
			<td>'+dataObject["G"+g][16]+kmsi.suffixer(dataObject["G"+g][16])+'</td>\
			<td><span style="color:#'+(dataObject["G"+g][15]>=0?"080":"800")+'">'+kmsi.addComma(dataObject["G"+g][15])+'</span></td>\
			<td>'+dataObject["G"+g][2]+'%</td>\
			<td>'+dataObject["G"+g][20]+'</td>\
			<td>'+kmsi.sechms(dataObject["G"+g][17])+'</td>\
			<td>'+Math.round(100*(dataObject["G"+g][6]+dataObject["G"+g][5])/(dataObject["G"+g][8]+dataObject["G"+g][7]))/100+'</td>\
			<td>'+Math.round(100*dataObject["G"+g][5]/dataObject["G"+g][7])/100+'</td>\
			<td>'+Math.round(100*dataObject["G"+g][6]/dataObject["G"+g][8])/100+'</td>\
			<td>'+(dataObject["G"+g][7]+dataObject["G"+g][8])+'</td>\
		</tr>')	
	}
	
	 $('#GHtab').tablesorter({ 
		widgets: ['zebra'],
		headers: {
			4: { sorter: 'colscore' },
	     	6: { sorter: 'digit' },
			23: { sorter: 'digit' }
		 },
        // define a custom text extraction function 
        textExtraction: function(node) { 
			return node.innerHTML.replace(",",""); 
        } 
    }); 
	
}
kmsi.getMData = function(year,month,profileNR){
	var dataObject;
	if (localStorage.getItem('kmlc_'+profileNR+"_y"+year+"_m"+month)){
		var dataString = localStorage.getItem('kmlc_'+profileNR+"_y"+year+"_m"+month);
		GM_log("kmlc.getMData dataString= "+dataString+" localkey:"+localStorage.key(1));
		dataObject =  eval('(' + dataString +')');
	}else{
		dataObject ={};
	}
	return dataObject;
}


$(document).ready(function() {
	if (window.top != window.self)  //-- Don't run on frames or iframes
	    return;
	
	window.setTimeout(kmsi.init, 400);
});