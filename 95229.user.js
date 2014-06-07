// ==UserScript==
// @name           Eventum Whiteboard
// @namespace      Eventum
// @description    Provides a simplified SCRUM whiteboard connected to Eventum
// @include        http://*/service/list.php*
// ==/UserScript==

/*
* Changelog:
*
* version 1.1.3
* - more stats numbers on the small screen
* - security ; anonimized base domain url
* version 1.1.2
* - corrected press here link since it had parameters too specific to Eventum installations
* - fix bug with undefined array of names
*
* version 1.1.1
* - get the state of the whiteboard in order to remain open/ closed even with the refresh
* - added some more parameters to 'press here' button now using uses
*   only error category ;sorts by last update and reduces limit to 1500
* - turn off the debug
* - control over the 
*
* version 1.1
* - Fixed a index on field order 
* - added loggin /debuging messages with several levels of warning
* 
* version 1.0 
* - Added an extra graph 
*
* version 0.9brc2
* - add open new window behavior
*
* version 0.81
* - track (issue with border) user issues shared with other developers
* - assigned user(s) now show in the issue header
* - visual grouping if issues  by timeline (last 24h, 7 days, ancient)
* - graphics with priorities (pie) and user assignment progress
* - Fix quote problem in description
*
* version 0.8
* -dummy release
*
* version 0.71
* - hack for an independent monitor visualization... this should be replaced with a configuration in the future
*
* version 0.7
* - added daily update check
* - fixed the onmouseover to show a description and some extra visualization  css issues
*
* version 0.6
* - first release
*/

//globals
const version="1.2.0" ;
const release = "alpha";
var $;
var userName='        ';

// if you want to debug and test it, you can use wbLog easily by turning on $debug_on = 1..4
var type_of_log = new Array('', 'Warning', 'Debug', 'Critical');
var debug_on=0; 

var config = new Array();
config['UPDATE_CHECK']='http://lcabral.homedns.org/public/WhiteBoard/update.xml';
config['UPDATE_URL']='http://userscripts.org/scripts/source/95229.user.js';
config['CONTACT']='';
config['ALLOW_CONFIG'] = "MAX_COLUMN_ITENS LANGUAGE MAX_COLUMN_ITENS RESET_LINK GRAPH_MAX_WEEKS ALLOW_DEBUG";
config['ALLOW_DEBUG'] = "0";
// if you want to use starting in exapanded mode ( everytime the pages refresh) turn this to true
// none | whiteboard | graph
config['EXPANDED_MODE'] = 0;
config['MAX_COLUMN_ITENS']=200;
config['GRAPH_MAX_WEEKS']=10;

config['RESET_LINK']='';

var columns = new Array();
columns['BackLog']=0;
columns['Processing']=0;
columns['Done']=0;
columns['ChangeOrder'] =0;


var myColumns = new Array();
myColumns['BackLog']=0;
myColumns['Processing']=0;
myColumns['Done']=0;
myColumns['last7']=0;

var priorities = new Array();
priorities['P1']=0;
priorities['P2']=0;
priorities['P3']=0;
priorities['P4']=0;
priorities['P5']=0;

var statuslog = new Array();

var Nstats = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

var max_issues  = 1500;
var weeks = 10;
var stats_period = 7; 
var graph_max_days = weeks*7;

var userlog = new Array();

var expireCookie = new Date();
var issues =  new Array();

//Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
		GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

//Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

//All your GM code must be inside this function
function letsJQuery() {
	wbLog('starting config');

	StartupConfig();
	wbLog('reading update');
	checkUpdate();

	wbLog('Draw whiteboard');
	addGlobalStyle(defaultCSS);
	drawWhiteBoard();
	
	wbLog('get CSV');
	getCSVIssues();
	wbLog('Finished all');
	if(config['EXPANDED_MODE'] >= 1 ){
		//show the white screen 
		$('#SCRUMWhiteBoard').show();	
	} 
		
}


function drawWhiteBoard(){
	var board = document.createElement('div');
	var body = document.getElementsByTagName("body")[0];
	$(board).attr('id','SCRUMWhiteBoard');
	board.innerHTML= defaultBoard ;
	body.appendChild(board);

	var header = document.createElement('div');
	$(header).attr('class','rounded button');
	$(header).attr('id','WBMainButton');
	
	var userA= $('b:contains(:)').html().split(': ');
	userName = userA[1];
	usershort = userName.replace(/(\w)[^\s,]+[ ,]?/g,'$1');

	$(header).html('<b>FIX WhiteBoard v.'+version+'</b>: ');

	$(header).bind('click',  function(e){
	
		if(config['EXPANDED_MODE'] == 0 ){
			//show the white screen 
			$('#SCRUMWhiteBoard').show();	
		} 
		if(config['EXPANDED_MODE'] == 1 ){
			//show the graph
			$('#graph').show();
		}	
		config['EXPANDED_MODE']++;
			// hide everything
		if(config['EXPANDED_MODE']>=3){
			$('#SCRUMWhiteBoard').hide();
			config['EXPANDED_MODE'] = 0
			$('#graph').hide();
		}
		setCookie('EXPANDED_MODE', config['EXPANDED_MODE']);
			
	});
	$('#SCRUMWhiteBoard').after(header);
		

	//page reloads ever few minutes this will mantain the board open
}



//collect CSV data from CSV URL
function getCSVIssues(){
	$.post('csv.php',{csv_data: document.getElementsByName('csv_data')[0].value}, function(data) {
		issues = data.split('\n');

		//prepare the a multi-column array
		indexes(issues.shift());
		for (var i=0 ; i < issues.length ; i++){
			issues[i] = issues[i].split('\t');

			issues[i][IPRIORITY] = issues[i][IPRIORITY] ? issues[i][IPRIORITY] : 'P5';
			// convert change date to seconds
			var changed = issues[i][ILAST_ACTION_DATE].match(/[\d]+/g);
			if(changed){
				issues[i][ILAST_ACTION_DATE2]=86400 * changed[0] + 3600 * changed[1]  ;
			}
		}

		drawIssues ();
		$('#WBMainButton').append( "<br><span title=Processing>"+(columns['Processing']+columns['BackLog'])+"</span>");
		$('#WBMainButton').append( "| <span title=Errors>"+(columns['Processing']+columns['BackLog']-columns['ChangeOrder'])+"</span>");
		$('#WBMainButton').append( "| <span title='Change Orders'>"+columns['ChangeOrder']+"</span>");
		$('#WBMainButton').append( "| <span title=Closed>"+ columns['Done']+"</span>");
		$('#WBMainButton').append( "| <span title='Assigned to me'>"+ myColumns['Processing']+"</span>");
		$('#WBMainButton').append( "| <span title='My closed'>"+myColumns['Done']+"</span>");
		$('#WBMainButton').append( "| <span title='I closed last 7days'>"+myColumns['last7']+"</span>");
		$('#WBMainButton').append( "<br> " + reset_link);


		//$('#WBMainButton').append( '<br>ongoing ' +(columns['Processing']+columns['BackLog']) + ' [B '+columns['BackLog']+' | P'+columns['Processing']+' | M '+ myColumns['Processing'] +'| CR '+columns['ChangeOrder']+'| Bugs '+(columns['Processing']+columns['BackLog']-columns['ChangeOrder']+'| CR '+(columns['Processing']+columns['BackLog']-)+ '] / Done ' + columns['Done'] + ' ('+myColumns['Done'] + ')<br>' + reset_link );)+ '] / Done ' + columns['Done'] + ' ('+myColumns['Done'] + ')<br>' + reset_link );
	});
}

function indexes(index){

  window.ICATEGORY = 0;
  var indexes = index.split('\t');
 wbLog('get indexes('+indexes.length+') from '+ index);
  for ( i=0 ; i < indexes.length ; i++){
	iname= indexes[i].toUpperCase().replace(/ /g,'_');
	eval ('window.I' + iname + '=' +i+';');
	wbLog('index I' + iname +' registered as ' + i, 3);
  }
  eval ('window.ILAST_ACTION_DATE2=' +i+';');
	wbLog('index ILAST_ACTION_DATE2 registered as ' + i, 3);

}

function drawIssues(){
	var inColumn = new Array();
	for( var a in columns){
		columns[a]=0;
		inColumn[a]=0;
		$('#h'+a).html();
		$('#i'+a).html();
	}
var x=0;
var alert_on=0;
	for (var i=0 ; i < issues.length ; i++){
x++;
		var iEnt = issues[i];
		var priority = iEnt[IPRIORITY];
		if( !statuslog[iEnt[ISTATUS]] )  statuslog[iEnt[ISTATUS]]=0;
		 statuslog[iEnt[ISTATUS]]++;
		//prep chart data
		if(priority) 	priorities[priority]++;

		//define wich column to place issue
		var category = iEnt[ICATEGORY].replace(/ /, '_').toLowerCase();
		var WBCol= iEnt[IASSIGNED] ? "Processing" :"BackLog";

		WBCol= iEnt[ISTATUS] != 'Discovery' && iEnt[ISTATUS] != 'Escalated' ? "Done" : WBCol;

		columns[WBCol]++;
//if(alert_on++ <5)
//alert(category);

		if(WBCol != 'Done' && category == 'change_order' ) 
			columns['ChangeOrder']++;
	
		wbLog('item '+i+' ['+iEnt[IPRIORITY]+'/'+WBCol+']',2);

		var classes = 'iWidget rounded error' + priority + ' cat_' + category;

		// graphical clues to issues assigned to me
		if(iEnt[IASSIGNED].indexOf(userName)>=0 ){
			myColumns[WBCol]++;
			classes += ' assignedMe';
		}
		var name = "";
		var names = new Array();
		if( iEnt[IASSIGNED]){
			name = iEnt[IASSIGNED].replace(/(\w)[^\s,]+[ ,]?/g,'$1');
			name='<br><span style="font-size:xx-small">['+name+']</span>';
			//prep chart data
 			names= name.replace(/.*\[/,"").replace(/\].*/,"").split(' ');
			nday = parseInt(iEnt[ILAST_ACTION_DATE2]/86400);
		}
		// user log only refers to finished issues by users  
		if(WBCol == 'Done' ){
			for(var j=0; j< names.length; j++){
			   if(! userlog[names[j]])		userlog[names[j]] = new Array();
			   if(! userlog[names[j]][nday])	userlog[names[j]][nday]=0;
			   userlog[names[j]][nday]+=1;
			}
		}
		
	   	if(usershort == name && WBCol == 'Done' && nday <=7){
			myColumns['last7']++;
	    	}
		if( !(inColumn[WBCol]++ > config['MAX_COLUMN_ITENS'] && WBCol == 'Done')){
			// build element
			wbLog('building element' ,2);
			var iWig =  document.createElement('div');
			$(iWig).attr('id', iEnt[IISSUE_ID]);
			$(iWig).attr('class', classes);
			var content = '<span class=iWigHeader> '+ iEnt[IISSUE_ID] + ' <b>' + priority + '</b> ' + name + '</span>'+
			'<div class="rounded error'+priority+' iWigDesc" id="iD' + iEnt[IISSUE_ID] +'"><i>'+ iEnt[ISUMMARY].replace('"', "&quot;") + '</i><br>'+
			'Assigned: <u>'+ iEnt[IASSIGNED] + '</u><br>'+
			iEnt[ILAST_ACTION_DATE] + '<br>' +
			'<b>' + iEnt[ICATEGORY] + ' / ' + iEnt[ISTATUS] + '</b><br>' +
			'</div>';
			//Today
			if(iEnt[ILAST_ACTION_DATE2]<86400){
				$(iWig).appendTo($('#i'+WBCol + '0'));
			}else if (iEnt[ILAST_ACTION_DATE2]<86400*7){
				// last week
				$(iWig).appendTo($('#i'+WBCol+ '1'));
			}else{
				// longer than 1 week
				$(iWig).appendTo($('#i'+WBCol+ '2'));
			}
			$(iWig).html(content);
		}
	}
	$('.iWidgetHeader').bind('click', function(){document.location.href='view.php?id=' + $(this).attr('id')});
	$('.iWigDesc').bind('click', function(){
		window.open('view.php?id=' + $(this).parent().attr('id'), 'window_'+$(this).attr('id'));
	});
	$('.iWidget').bind('mouseover', function(){
		var id= $(this).attr('id');
		$('#iD'+ id).show()});
		$('.iWidget').bind('mouseout', function(){
			var id= $(this).attr('id');
			$('#iD'+ id).hide()});
			// finish up with some headers and counters
			for( var a in columns){
				$('#h'+a).html("<b>"+a+"</b> (" + (columns[a] < 100 ? columns[a] : '>100') + ")");
			}


  charts();
}


function StartupConfig(){
	expireCookie.setDate(expireCookie.getDate()+7);
	for (var prop in config){
		var tmp =  getCookie(prop);
		if (tmp){ 
			config[prop]=tmp;
			wbLog('Reading config ['+prop+'] = '+tmp);
		}
	}
}

function getCookie(c_name){
	c_name = 'WB_' + c_name ;
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start = c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1)
			c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

function setCookie(c_name,value){
	config[c_name]= value;
	c_name = 'WB_' + c_name ;

	wbLog('Setting cookie config ['+c_name+'] = '+value);
	document.cookie=c_name+ "=" + escape(value)+
	((expireCookie==null) ? "" : ";expires="+expireCookie.toUTCString());
}


function checkUpdate(){
	var updateDate = eval(getCookie('updateDate'));
	var currentDate = new Date();

	// if the last updateDate is more than 86 400 000 msec (1 day) ago - check for updates
	if(config['UPDATE_URL'] &&
	(!updateDate || currentDate.getTime() - updateDate.getTime() > 86400000)){
		// set the new updateDate
		setCookie('updateDate',uneval(currentDate));
		// make the version request
		var details = new Object();
		details.method = 'GET';
		details.url = config['UPDATE_CHECK'];
		details.onload = function(response) {parseUpdateXMLResponse(response.responseText)};
		GM_xmlhttpRequest(details);
	}
}

function parseUpdateXMLResponse(xmlString){
	var updateNode;
	var xmlDoc = (new DOMParser()).parseFromString(xmlString, "application/xml");
	var string = '';
	var change = xmlDoc.getElementsByTagName('changelog')[0];

	var versions = change.getElementsByTagName('version');
	var currentVersion = 0;
	var currentVersionIndex;
	for(var j = 0;j< versions.length;j++){
		if(versions[j].getAttribute('number') > currentVersion){
			currentVersion = versions[j].getAttribute('number');
			currentVersionIndex = j;
		}
	}
	if (currentVersion > version){
		updateNode = versions[currentVersionIndex];
	}
	if(updateNode){
		var confirmString = 'There is a new version of ' + config['APP_NAME'] + '.\n\t'+version+' -> '+updateNode.getAttribute('number')+'\nChanges:\n';
		var changes = updateNode.getElementsByTagName('change');
		for(var j = 0;j< changes.length;j++){
			confirmString += '\t+ '+changes[j].textContent+'\n';
		}
		confirmString += '\nDo you want to update?';
		if (confirm(confirmString)) {
			GM_openInTab(config['UPDATE_URL']);
		}
	}
}


function charts(){
//return false;

	$(graph).html(reset_link);

	var url="http://chart.apis.google.com/chart?";
	
	//var graph = $('#SCRUMWhiteBoard').createElement('div');
	var graph = document.createElement('div');
	$(graph).attr('class','graph');
	$(graph).attr('id','graph');
	$(graph).html('<b>This is a test</b>');
	$('#SCRUMWhiteBoard').after(graph);
	
	//priority
	var pie=url + 'chs=350x150&chtt=Issues+priorities&cht=p3&chl=P1 (' + priorities['P1']+')|P2(' + priorities['P2']+')|P3(' + priorities['P3']+')|P4(' + priorities['P4']+')|P5(' + priorities['P5']+')&chco=ff00ff|ff6633|ffCC33|00ff00|99ff33&chd=t:' + priorities['P1']+','+ priorities['P2']+','+ priorities['P3']+','+ priorities['P4']+',' + priorities['P5'];
	pie= '<span><img src="'+pie+'" width=300 heigth=400/></span>';

	//users
	// userlog[names[j]][nday]
	var resU ;
	var resN ;
	var color;
	var maxi=0;
	var colors = new Array('616D7E','4C787E','806D7E','4E387E','151B8D','2B60DE','6960EC','9E7BFF','F6358A','E238EC','4E9258', 'FBB917','F87431','E41B17');
	var flag=false;
	var k=0;

	for (var i in userlog){
	  var acum =0;
	  for(j= graph_max_days; j>=0; j--){
	    var a = userlog[i][j] ? userlog[i][j] : 0;
	     acum = acum + a;
	  }
	  if(acum>maxi) maxi = acum;
	  if (acum <=0) 
		delete  userlog[i];
	}
	for (var i in userlog){
	  k++;
   	  if(!flag){
	    flag=true;
	    resU= i; resN='';color = colors[k];
	  }else{
	    resU+='|'+i; resN+='|' ; if(colors[k]) color += ','+colors[k];
  	  }
	  var sep='';
	  var acum =0;
	  for(j= graph_max_days; j>=0; j--){
	    var a = userlog[i][j] ? userlog[i][j] : 0;
	     acum = acum + a;
             if(graph_max_days < 30  || (graph_max_days<60  && j %  2 == 0) || j%3 == 0) {
	       resN+= sep +''+ parseInt(acum /maxi * 100) ;		
	       sep=',';
            }
	    // periodic stats	
	    Nstats[parseInt(j/stats_period)] += a ;
	  }
	  resU+="("+acum+")";
	}
	
	var lines= url + 'chs=600x300&chtt=Individual+performance&chxt=x,y&chxr=1,0,'+(maxi+5)+'&chg=14,20&chxl=0:|'+graph_max_days+'+days+ago|Today&chxp=0,0&chco='+color+'&chdl='+resU+'&cht=ls'+'&chd=t:'+resN;
	lines= '<span><img src="'+lines+'"/></span>';

	// status 
	var statN = '';
	var statU = '';
	flag=false;
	for (var i in statuslog){
	  if(!flag){
		statU=i+ "("+ statuslog[i]+")";;
		 statN=statuslog[i];
	  }else{
		statU += "|" + i + "("+ statuslog[i]+")"; 
		statN += "," + statuslog[i]; 
	  }
	flag=true;
	}
	var statusp='<span><img src="'+url + "chs=500x130&chtt=Issues+resolutions&cht=p3&chl="+ statU +"&chd=t:"+ statN + '"></span>'; 
	
	// periodical stats 
	Nstats = Nstats.splice(0,weeks).reverse();
	var performance = parseInt(( (Nstats[weeks-1]-Nstats[weeks-2]) / (Nstats[weeks-2]+Nstats[weeks-1]) * 100)+100) + "%" ;
	var unresolved = new Array(columns['BackLog']+columns['Processing']  - columns['ChangeOrder'] ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0).splice(0,weeks).reverse();
	var change_order = new Array( columns['ChangeOrder'] ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0).splice(0,weeks).reverse();
	var ch=columns['ChangeOrder'] > 0  ?  "|Change+Orders+("+columns['ChangeOrder']+')':'';
	var init_stat_g = "cht=bvs&chtt=Weekly+stats+until+date+"+ch+"&chs=350x"+(200 + weeks*15)+"&chxt=x,y&chxl=0:|Long+ago|Prev+Week&chxp=0,0&chm=N,000000,0,-1,11|N,000000,1,-1,11|t"+performance+",FF0000,0,"+(weeks-1)+",14,,b:5:-15&chdl=Closed("+stats_period+" days period)|Waiting/processing&chco="+color;
	var link_stat_g = url + init_stat_g + '&chd=t:'+ Nstats.join(',') +'|'+ unresolved.join(',');
	var period_stats = '<span><img src="'+ link_stat_g + '"/></span><br>';

	
	
	$(graph).append( reset_link + "<br><hr>" + pie + ' ' + statusp+'<br>'+lines + ' ' +period_stats );

	if(config['EXPANDED_MODE'] >= 2 ){
		//show the graph
		$('#graph').show();
	}
	
}

//CSS construction
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

// if you want to debug and test it, you can use wbLog easily by turning on $debug_on = 1..4
function wbLog(msg, type){
	if(!type) type= 1;
 	if(debug_on && debug_on >= type){
	  console.log('['+type_of_log[type]+'] ' + msg);
       }
}

var defaultCSS = '#SCRUMWhiteBoard {position: fixed;  bottom: 0px; border:1px solid red; background-color: #FFFFFF; width:100%; height:90%; margin:0px;display:none} '+
'.iWidget {width:100px; border: 2px solid #ffffff;margin:2px;float: left;font-size:small} '+
'.iWigDesc {border:1px solid #222222; position:absolute;float:left; width;250px;display:none;} '+
'.iWigHeader {white-space: nowrap;} '+
'#WhiteBoardTable {width:100%;height:100%;border: 1px solid black;padding:0px} '+
'.WhiteBoardCol {width:33%;height:95%;border: 1px solid black;padding:0px;margin:3px;vertical-align:top} '+
'.WhiteBoardHeader {width:33%;border: 1px solid black;padding:0px;margin:10px} '+
'.wbRow {border:1px dotted black; width: 100%; min-height:50px;display: table-row} ' +
'.errorP1 {background-color:#ff00ff} ' +
'.errorP2 {background-color:#ff6633} ' +
'.errorP3 {background-color:#ffCC33} ' +
'.errorP4 {background-color:#00ff00} ' +
'.errorP5 {background-color:#99ff33} ' +
'.cat_change_order {border:2px dotted red;} ' +
'.assignedMe{color:#000000;border:2px solid #000000} '+
'.rounded {padding-left:5px; -moz-border-radius: 8px; -webkit-border-radius: 8px;  -khtml-border-radius: 8px; border-radius: 8px} '+
'#WBMainButton{position:fixed;right:5px;bottom:0px;border:1px solid red; background-color: #00FFFF; width:350px;font-size:small}'+
'#graph {background-color: #FFEEFF;border:1px solid #222222;position:fixed;left:5px;bottom:0px;z-index:50;display:none} '+
'';

var defaultBoard= '<table id=WhiteBoardTable>'+
'<tr ><td class="WhiteBoardHeader .rounded" id=hBackLog></td>'+
'<td class="WhiteBoardHeader .rounded" id=hProcessing></td>'+
'<td class="WhiteBoardHeader .rounded"  id=hDone></tr>'+
'<tr><td class=WhiteBoardCol id=iBackLog><span class=wbRow id=iBackLog0></span><hr><span class=wbRow id=iBackLog1> </span><hr><span class=wbRow id=iBackLog2> </span></td>'+
'<td class=WhiteBoardCol id=iProcessing><span class=wbRow id=iProcessing0> </span><hr><span class=wbRow id=iProcessing1> </span><hr><span class=wbRow id=iProcessing2> </span></td>'+
'<td  class=WhiteBoardCol id=iDone><span  class=wbRow id=iDone0> </span><hr> <span class=wbRow id=iDone1> </span><hr> <span class=wbRow id=iDone2> </span></td></tr></table>'+
'';

var reset_link = "<b> Reset and maximize your search: <a href=http://support.fronter.com/service/list.php?rows="+ max_issues+"&sort_by=last_action_date&sort_order=desc&hide_closed=0&cat=search&pagerRow=0&created_date%5BYear%5D=&created_date%5BMonth%5D=&created_date%5BDay%5D=&created_date%5Bfilter_type%5D=&updated_date%5BYear%5D=&updated_date%5BMonth%5D=&updated_date%5BDay%5D=&updated_date%5Bfilter_type%5D=&last_response_date%5BYear%5D=&last_response_date%5BMonth%5D=&last_response_date%5BDay%5D=&last_response_date%5Bfilter_type%5D=&first_response_date%5BYear%5D=&first_response_date%5BMonth%5D=&first_response_date%5BDay%5D=&first_response_date%5Bfilter_type%5D=&closed_date%5BYear%5D=&closed_date%5BMonth%5D=&closed_date%5BDay%5D=&closed_date%5Bfilter_type%5D=&show_authorized_issues=&show_notification_list_issues=&custom_field=b%253A0%253B&reporter=&release=&keywords=&search_type=all_text&users=&category=&priority=&status= title='Clean search, show closed issues and show up to "+ max_issues+" issues in the same page'>Press here</a></b>";

var images = new Array();
images['sample'] = '<IMG SRC="data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUU lvONmOZtfzgFzByTB10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQ ZXZeYGejmJlZeGl9i2icVqaNVailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwv KOzrcd3iq9uisF81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7PHhhx4dbgYKAAA7"ALT="Larry">';

var lang_content = new Array();
lang_content['en'] = new Array();
lang_content['no'] = new Array();  

