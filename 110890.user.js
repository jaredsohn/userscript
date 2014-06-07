// ==UserScript==
// @id             fnDB
// @name           fnDB
// @version        2.3
// @namespace      http://prancing-uboot.net/fnDB/
// @author         nadyja
// @description    data dodania do WTS
// @include        http://www.filmweb.pl/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://prancing-uboot.net/fnDB/js/taffy.db.js
// @require        http://prancing-uboot.net/fnDB/js/json2.js
// @require        http://prancing-uboot.net/fnDB/js/jquery.rightClick.js
// @require        http://prancing-uboot.net/fnDB/js/jquery-ui-1.8.16.custom.min.js
// @run-at         document-end
// ==/UserScript==

scriptName='fnDB Update';
scriptId='110890';
scriptVersion=2.3;
scriptUpdateText='Rozbicie na podtabele';


// TODO
/* 
 * usuwanie
 * inline jakbardzo edit
 * DB
 *      ratings backup
 *      watch & wts
 * imdb Combine
 * watch date inline edit
*/


var movieTaffy=[];
var debug;
var ajax='http://prancing-uboot.net/fnDB/api.php';
var ajaxBase=ajax;
//ajaxBase='http://localhost/fnDB/api.php';

window.addEventListener('load', function() {    
   $('head').append('<link href="http://prancing-uboot.net/fnDB/style.css" type="text/css" rel="stylesheet" />');
   debug = {
        debugMode:0,
        error:function(msg) {alert('[fwSync]'+msg);},
        info:function(msg,priority) {GM_log(msg);},
        warn:function(msg,priority) {if(priority<=this.debugMode) alert(msg);}
    }
   $( "#dialog:ui-dialog" ).dialog( "destroy" );
   var user_login=GM_getValue("fndb_login",''); 
   var user_pass=GM_getValue("fndb_pass",'');  
   ajaxBase=ajax+'?login='+user_login+'&pass='+user_pass;
   if($('table.wantToSeeSee').length>0) wtsList();
   if($('.wantToSeeBox').length>0) filmPage();

}, false);

function displayLoginDialog(text) {
    if(!text) text='';
    debug.info('loginDialog',6);
    if($( "#dialog-form" ).length==0){
     $('head').append('<link href="http://prancing-uboot.net/fnDB/js/jquery-ui-1.8.16.custom.css" type="text/css" rel="stylesheet" />');
     var dialogDiv=$('<div id="dialog-form">'+
        '<form>'+
	'<fieldset>'+
		'<label for="name">Login</label>'+
		'<input type="text" name="fndb_login" id="fndb_login" class="text ui-widget-content ui-corner-all" />'+
		'<label for="password">Password</label>'+
		'<input type="password" name="fndb_pass" id="fndb_pass" value="" class="text ui-widget-content ui-corner-all" />'+
	'</fieldset>'+
	'</form>'+
        '</div>');
       $('body').append(dialogDiv);
       $( "#dialog-form" ).dialog({
			autoOpen: false,
			height: 200,
			width: 350,
			modal: true,
			buttons: {
				Login: function() {
                                    var user_login=$('#fndb_login').val();
                                    var user_pass=$('#fndb_pass').val(); 
                                    debug.info('login: '+user_login+ ' - '+user_pass,6);
                                    GM_setValue( "fndb_login", user_login );
                                    GM_setValue( "fndb_pass", user_pass );
                                    ajaxBase=ajax+'?login='+user_login+'&pass='+user_pass;
                                    debug.info('login success: '+ajaxBase,6);
                                    if($('table.wantToSeeSee').length>0) wtsList();
                                    if($('.wantToSeeBox').length>0) filmPage();
                                    $( this ).dialog( "close" );
                                    
					
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});
    }
   
   $( "#dialog-form" ).dialog({title: text});
   $( "#dialog-form" ).dialog( "open" );
}
var months=[];
months[0]='---';
months[1]='Stycznia';
months[2]='Lutego';
months[3]='Marca';
months[4]='Kwietnia';
months[5]='Maja';
months[6]='Czerwca';
months[7]='Lipca';
months[8]='Sierpnia';
months[09]='Września';
months[10]='Października';
months[11]='Listopada';
months[12]='Grudnia';

function filmPage() {
    debug.info('filmPage',6);
    var fwID=$('#filmId').html();
    $('.wantToSeeBox button').click(function() {ndbSetDateWTS(fwID,new Date().ymdString());});
    //$('.filmVotePanel .voteGroup button').click(function() { ndbSetDateSeen(fwID,new Date().ymdString());});
    $('.voteGroup').click(function() {
        var fwDate=$('.dateBox .dateLabel').html();
        fwDate=fwDate.split(" ");
        if(fwDate.length==3){
            var month=months.indexOf(fwDate[1]).toString();
             if(month.length == 1) month = "0" + month;
            fwDate=fwDate[2]+'-'+month+'-'+fwDate[0];
        }
        else fwDate="";
        var fndbDate=$('.voteGroup .fndbDateHolder').html();
       
        if(fwDate!=fndbDate) {
             debug.info('date change: '+fwDate +" "+fndbDate,6);
            //alert(fwDate);
            $('.voteGroup .fndbDateHolder').html(fwDate);
            if(fwDate!="") ndbSetDateSeen(fwID,fwDate+" 00:00:00"); 
            else ndbSetDateWTS(fwID,$('.wantToSeeBox .gwt-Label .stdButton .fndbDateHolder').html());
            
        }
    

});
   // $('.wantToSeeBox .wantToSeeVoting div').click(function() {ndbSetDateWTS(fwID,new Date().ymdString());});
   
    displayFilmBox();
    
}
function displayFilmBox() {
    var fwID=$('#filmId').html();
    if(fwID.length<=0) return;

        setTimeout(function(){
        GM_xmlhttpRequest({
        method: 'GET',
        url:ajaxBase+'&function=fetchWTS&fwID='+fwID,
        onload: function(response) {
            if (response.responseText.startsWith('ACCESS DENIED')) {displayLoginDialog(response.responseText);return;}
            ndbFilmRespond(response);
        }
        });
        },0);

}
function ndbFilmRespond(response) {
    var movieList=response.responseText.json2list();
    var movie=movieList[0];
    if(!movie) return;
    movie.title=$('.pageTitle a').attr('title');
    movie.titleOriginal=$('.origTitle').html();
    $('.origTitle span').each(function() {
        movie.titleOriginal=movie.titleOriginal.replace($(this).outerHTML(),'');
    });
    movie.titleOriginal=movie.titleOriginal.trim();
    if(movie.titleOriginal=='') movie.titleOriginal=movie.title;
    movie.stateHtml='';
    $('#fndbBox').remove();
    $('.fndbDateHolder').remove();
    var html='<div id="fndbBox">'+displayStatePanel(movie)+displayEditPanel(movie.fwID)+'</div>';
    $('.wantToSeeBox').after(html);
    $('.wantToSeeBox .gwt-Label .stdButton').append('<span class="fndbDateHolder">'+movie.wts_when.substring(0,10)+'</span>');
    $('.voteGroup .gwt-Label .stdButton').append('<span class="fndbDateHolder">'+movie.seen_when.substring(0,10)+'</span>');
    rehookList();
}
function wtsList() {
    debug.info('wtsList',6);
    movieTaffy = new TAFFY([]);
    setTimeout(function(){
    GM_xmlhttpRequest({
    method: 'GET',
    url:ajaxBase+'&function=readWTS',
    onload: function(response) {
        if (response.responseText.startsWith('ACCESS DENIED')) {displayLoginDialog(response.responseText);return;}
        ndbRespond(response);
    }
    });
    },0);
}

function ndbRespond(responseDetails) {
    debug.info('onload ndb',5);
    var movieList=responseDetails.responseText.json2list();
    //alert('ndb');
    for(i in movieList) combineRow(movieList[i],movieTaffy);
    parseFWList();
    movieTaffy.orderBy( [{"state":"asc"},{"stateHtml":"asc"},{"wts_when":"desc"}]); 
   
    displayList(movieTaffy);
}

function parseFWList() {
    //alert('fw');
    $('table.wantToSeeSee tbody tr').each(function() {
        var row=new Object();
        var src=$(this).find('td:nth-child(1) a:first-child img').attr('src').split('/');
        row.fwID=src[6];
        if(row.fwID=='ic') {
            src=$(this).find('td:nth-child(1) a:first-child').attr('href').split('-');
            row.fwID=src[src.length-1];
        }
        row.stateHtml=$(this).find('td:nth-child(5)').html();
        row.state=3;
        if(row.stateHtml.startsWith('<img')) row.state=4;
        if(row.stateHtml.startsWith('<a ')) row.state=0;

        row.title=$(this).find('td:nth-child(1) div a:first-child').html();
        row.titleOriginal=row.title;
        src=row.title=$(this).find('td:nth-child(1) div').html().split('<br>');
        if(src[1] && !src[1].startsWith('kraj')) {
            row.titleOriginal=src[1];
            }
        row.htmlTitle=$(this).find('td:nth-child(1)').html();
        row.htmlWts=$(this).find('td:nth-child(2)').html();
        combineRow(row,movieTaffy);
    });
}


function isNumeric(n) {return !isNaN(parseFloat(n)) && isFinite(n);}
function displayList() {
    $('table.wantToSeeSee tbody').remove();
    movieTaffy.forEach( function(movie) {
        var dateTD='<td class="ndbDate'+(movie.wts_when==''?'':' ndbHasDate')+'"><span>'+movie.wts_when+'</span>'+displayEditPanel(movie.fwID)+'</td>';
        var html='<tr id="'+movie.fwID+'">'+
            '<td>'+movie.htmlTitle+'</td>'+
            '<td>'+movie.htmlWts+'</td>'+
            '<td class="ndbState ndbState'+movie.state+'">'+displayStatePanel(movie)+'</td>'+
            dateTD+
            '</tr>';
	$('table.wantToSeeSee').append($(html));
	});
        if( $('table.wantToSeeSee tr th').length>4 ){
            $('table.wantToSeeSee tr th:nth-child(4)').remove();
            $('table.wantToSeeSee tr th:nth-child(3)').remove();
        }
    $('table.wantToSeeSee thead tr').html($(
    '<th class="header" title="title">tytuÄąâ€š (rok)<span></span></th>'+
    '<th class="header" title="rating">jak bardzo<span></span></th>'+
    '<th class="header" title="state">stan<span></span></th>'+
    '<th class="header" title="wts_when">data dodania<span></span></th>'));
    rehookList();
    }
function rehookList() {
    $('.editNdbDate input[type=button]').click(function() {
        ndbSetDateWTS($(this).attr('name'),$(this).attr('title'));
        $('table.wantToSeeSee tr#'+$(this).attr('name')+' .ndbDate span').html($(this).attr('title'));
        $('table.wantToSeeSee tr#'+$(this).attr('name')+' .ndbDate').addClass('ndbHasDate');
    });
    $('.editNdbState select').change(function() {
        //alert($(this).attr('name')+'|'+$(this).find('option:selected').val());
        ndbSetState($(this).attr('name'),$(this).find('option:selected').val());
        $('table.wantToSeeSee tr#'+$(this).attr('name')+' .ndbState').addClass('ndbHasState');
    });
     $('table.wantToSeeSee th').click(function() {
         if($(this).attr('title')=='wts_when') movieTaffy.orderBy({wts_when:"logicaldesc"}); 
         if($(this).attr('title')=='state') movieTaffy.orderBy({state:"logicaldesc"}); 
        displayList(movieTaffy);
        });
        
        $('#fndbBox').dblclick( function(e){
            $('.editNdbDate').toggle(); 
            return false;
        });
        
}
function displayEditPanel(fwID) {
   return '<div class="editNdbDate">'+
   '<input type="button" value="today"  name="'+fwID+'" title="'+new Date().ymdString()+'" />'+
   '<input type="button" value="august" name="'+fwID+'" title="'+new Date("2011-08").ymdString()+'" />'+
   '<input type="button" value="2011"   name="'+fwID+'" title="'+new Date("2011").ymdString()+'" />'+
   '<input type="button" value="else"   name="'+fwID+'" title="'+new Date("2010").ymdString()+'" />'+
   '</div>';
    }

function displayStatePanel(movie) {
   var html='';
   var sites = {
       		IMDb: {
			query:	'http://www.imdb.com/find?s=all&q='+movie.titleOriginal,
			favicon:'http://imdb.com/favicon.ico'
		},
		Mininova: {
			query:	'http://mininova.org/search/'+movie.titleOriginal+'/4/seeds',
			favicon:'http://mnstat.com/images/favicon.ico'
		},
		ThePirateBay: {
			query:	'http://thepiratebay.org/search/'+movie.titleOriginal+'/0/7/200',
			favicon:'http://thepiratebay.org/favicon.ico'
		},
		IsoHunt: {
			query:	'http://isohunt.com/torrents/'+movie.titleOriginal+'?iht=1&ihp=1&ihs1=2&iho1=d',
			favicon:'http://isohunt.com/favicon.ico'
		}
	}
        
        if(movie.state==3 || movie.state==6){
        for (var siteName in sites) {
   html+='<a class="search-ico" href="'+sites[siteName].query+'"><img src="'+sites[siteName].favicon+'" title="'+siteName+'"/></a>';
        }
        }
        
           if(movie.state==1){
          html+='<img src="http://prancing-uboot.net/fnDB/img/ready.png" title="ready" class="ico"/>';
        }
    if(movie.state==2){
          html+='<img src="http://prancing-uboot.net/fnDB/img/vuze.com.png" title="queued"  class="ico"/>';
        }
        html+='<div class="ndbStateValue">';

   //html+=movie.titleOriginal;
   html+=movie.stateHtml+'</div><div class="editNdbState">'+
       '<select name="'+movie.fwID+'">'+
   '<option value="3" '+(movie.state==3?'selected="selected"':'')+'> - </option>'+
   '<option value="2" '+(movie.state==2?'selected="selected"':'')+'>torrent queued</option>'+
   '<option value="1" '+(movie.state==1?'selected="selected"':'')+'>ready</option>'+
   '<option value="0" '+(movie.state==0?'selected="selected"':'')+'>now playing</option>'+
   '<option value="4" '+(movie.state==4?'selected':'')+'>not premiered</option>'+
   '<option value="5" '+(movie.state==5?'selected':'')+'>not anounced</option>'+
   '<option value="6" '+(movie.state==6?'selected="selected"':'')+'>unavailable</option>'+
   '</select>'+
   '</div>';
return html;
    }





function combineRow(row,taffy) {
        if(row.fwID===undefined) return;
        var find=taffy.get({fwID:{equal :row.fwID}});
        
	if(find=='') {
           // alert( 'xxx  |  '+row.state);
            taffy.insert({	
		fwID:row.fwID,
		wts_when:(row.wts_when=== undefined?'':row.wts_when),
                seen_when:(row.seen_when=== undefined?'':row.seen_when),
                state:row.state,
                stateHtml:row.stateHtml,
		title:row.title,
                titleOriginal:row.titleOriginal,
                htmlTitle:row.htmlTitle,
                htmlWts:row.htmlWts
		});
            }
	else { 
            // jeÄąÄ˝eli nadpisywany jest pusty - zostaw stary
           if(row.state==3 || row.state===undefined || row.state==null) {
            taffy.update({	
                htmlTitle:row.htmlTitle,
                titleOriginal:row.titleOriginal,
                htmlWts:row.htmlWts,
                stateHtml:'',
                title:row.title
            },{	
                fwID:row.fwID
            });
        } else {	
            taffy.update({	
                htmlTitle:row.htmlTitle,
                titleOriginal:row.titleOriginal,
                htmlWts:row.htmlWts,
                title:row.title,
                state:row.state,
                stateHtml:row.stateHtml
            },{	
                fwID:row.fwID
            });
        }}
}



function ndbSetDateWTS(fwID,wts_when){
	debug.info('ndbSetDateWTS: '+fwID+' '+wts_when);
	setTimeout(function(){
	GM_xmlhttpRequest({
    	method: 'GET',
	url:ajaxBase+'&function=setDateWTS&fwID='+fwID+'&wts_when='+wts_when,
    	onload: function(response) {
                        if (response.responseText.startsWith('ACCESS DENIED')) {displayLoginDialog(response.responseText);return;}
			if (!response.responseText.startsWith('OK')) {
					alert('ERROR: ' + response.responseText);
					}
			else debug.info('fndbSetDateWTS: OK');
                        displayFilmBox();
			}
	});
	},0);	
    return false;	
}
function ndbSetDateSeen(fwID,seen_when){
	debug.info('ndbSetDateSeen: '+fwID+' '+seen_when);
	setTimeout(function(){
	GM_xmlhttpRequest({
    	method: 'GET',
	url:ajaxBase+'&function=setDateSeen&fwID='+fwID+'&seen_when='+seen_when,
    	onload: function(response) {
                        if (response.responseText.startsWith('ACCESS DENIED')) {displayLoginDialog(response.responseText);return;}
			if (!response.responseText.startsWith('OK')) {
					alert('ERROR: ' + response.responseText);
					}
			else debug.info('fndbSetDateSeen: OK');
                        //displayFilmBox();
			}
	});
	},0);	
    return false;	
}
function ndbSetState(fwID,state){
	debug.info('ndbSetState: '+fwID+' '+state);
	setTimeout(function(){
	GM_xmlhttpRequest({
    	method: 'GET',
	url:ajaxBase+'&function=setState&fwID='+fwID+'&state='+state,
    	onload: function(response) {
            if (response.responseText.startsWith('ACCESS DENIED')) {displayLoginDialog(response.responseText);return;}
			if (!response.responseText.startsWith('OK')) {
					alert('ERROR: ' + response.responseText);
					}
			else debug.info('fwSetDate: OK');
                        displayFilmBox();
			}
	});
	},0);	
    return false;	
}
String.prototype.trim = function(){return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))}
String.prototype.json2list=function() {return eval("(" + this + ")").list;}
String.prototype.endsWith = function(str){return (this.match(str+"$")==str)}
String.prototype.startsWith = function(str){return (this.match("^"+str)==str)}
Date.prototype.ymdString = function() {
    var year = String(this.getFullYear());
    var month = String(this.getMonth() + 1);
    if (month.length == 1) month = "0" + month;
    var day = String(this.getDate());
    if (day.length == 1) day = "0" + day;
    var hours = String(this.getHours());
    if (hours.length == 1) hours = "0" + hours;
    var min = String(this.getMinutes());
    if (min.length == 1) min = "0" + min;
    var sec = String(this.getSeconds());
    if (sec.length == 1) sec = "0" + sec;
    return year + "-" + month + "-" + day+" "+hours+":"+min+":"+sec;
    }
$.fn.outerHTML = function(s) {
		return (s) 
			? this.before(s).remove() 
			: $('<p>').append(this.eq(0).clone()).html();
	}







	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain'},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
		    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
		    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
			    		GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
			    		newversion = document.createElement("div");
			    		newversion.setAttribute('id', 'gm_update_alert');
			    		newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			          		document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			    	}
	    		}
		});
	}