// ==UserScript==
// @name           Google Pagerank
// @description    New pageranking
// @version        1.6
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://*
// @exclude        http://google.com/*
// @exclude        http://*.jsfiddle.net/*
// @exclude 	   http://*.jshell.net/*
// @exclude 	   http://*.twitter.com/*
// @exclude 	   http://*.facebook.com/*
// @exclude 	   http://*.yahoo.com/*

// ==/UserScript==

window.config =
{
    width : 100,
    height : 14,
	//domain : window.location.href,
	base : (window.location.href).split(/\/+/g)[1],
	version : 16  //16 = 1.6;;; 160 = 16.0
};
window.styles =
{
    bottomleft : "position:fixed !important;bottom:2px !important;left:1px !important;",
    bottomright : "position:fixed !important;bottom:2px !important;right:1px !important;",
	topleft : "position:fixed !important;top:2px !important;left:1px !important;",
    topright : "position:fixed !important;top:2px !important;right:1px !important;"
};
//add menu
GM_registerMenuCommand("More Site Info", moreinfo);
function moreinfo(){
	GM_addStyle("#Gpr_Moreinfo{font:10pt Verdana,Arial,Helvetica,sans-serif!important;text-align:center;background-color:#FFF;left:"+ ((window.innerWidth - 300)/2 - 20) +"px;top:"+ ((window.innerHeight - 350)/2 - 20) +"px;width:300px;height:350px;padding:10px;border:1px double black;position:absolute;z-index:9999;}");

	var moreinfo= '<div id="Gpr_Moreinfo"><center>This has not been completed.<br />'+
		'<table border="0">'+
		'<tr><td>Alexa</td><td>'+window.config.alexa+'</td></tr>'+
		'<tr><td>DMOZ</td><td>'+window.config.dmoz+'</td></tr>'+
		'</table><br />'+
		'<input type=\'button\' value=\'Cancel\' id=\'devoptcan\' style=\'margin-left:30px;\' /></center></div>'; 	
	$('body').append(moreinfo);
	eventmod(document.getElementById('devoptcan'),'click', optcan);
}
GM_registerMenuCommand("Change Position", position);
function position(){
	var opt = document.createElement('div');
	opt.id="devopts";
	opt.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#FFF;left:"+ ((window.innerWidth - 300)/2 - 20) +"px;top:"+ ((window.innerHeight - 350)/2 - 20) +"px;width:300px;height:350px;padding:10px;border:1px double black;position:absolute;z-index:9999;");
	var pos="";var ins2="";
	if(GM_getValue("position")){pos=GM_getValue("position");}
	
	var checkd=new Array("","","","");
	if(!GM_getValue("position")){GM_setValue("position",2);}
	checkd[parseInt(GM_getValue("position"))]="checked";
	opt.innerHTML="<h2 align='center'>Options</h2>"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Position</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'>"+
	"<input type='radio' name='dev_time' "+checkd[0]+" value='0'> Top Left<br />"+
	"<input type='radio' name='dev_time' "+checkd[1]+" value='1'> Top Right<br />"+
	"<input type='radio' name='dev_time' "+checkd[2]+" value='2'> Bottom Left<br />"+
	"<input type='radio' name='dev_time' "+checkd[3]+" value='3'> Bottom Right<br />"+
	"</div><br style='clear:both;' />"+
	"<input type='button' value='Save' id='devoptsav' style='margin-left:30px;' />"+
	"<input type='button' value='Cancel' id='devoptcan' style='margin-left:30px;' />";
	document.body.appendChild(opt);	
	// document.getElementById('devoptsav').addEventListener('click', optsav, false);
	eventmod(document.getElementById('devoptsav'),'click', optsav);
	// document.getElementById('devoptcan').addEventListener('click', optcan, false);
	eventmod(document.getElementById('devoptcan'),'click', optcan);
	//GM_log("This is an example of GM_log");
}

//Add Style//
GM_addStyle(".Gpr_bar_outshell{ z-index:9999; border-radius:5px; border: solid 1px; width: "+window.config.width+"px; height: 14px; "+pos(GM_getValue('position'))+" background-color:#FFFFFF;}");
GM_addStyle(".Gpr_bar_innershell{ background-color: #0a0; height: 14px; background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent), color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent) ); background-image: -webkit-linear-gradient( -45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent ); background-image: -moz-linear-gradient( -45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent ); background-image: -ms-linear-gradient( -45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent ); background-image: -o-linear-gradient( -45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent ); }");
GM_addStyle(".Gpr_text_innershell{ position:relative; top:-15px; text-align:center; color:#000; font-weight:bold;}");

function pos(num){
		switch(num){
			case "0":
				return window.styles.topleft;
			break;
			case "1":
			    return window.styles.topright;
			break;			
			case "2":
			    return window.styles.bottomleft;
			break;			
			case "3":
			    return window.styles.bottomright;
			break;
		}
}

function optsav(){
	//alert('saved');
	GM_setValue("position", $('input:radio[name=dev_time]:checked').val());

	$('#devopts').hide(1500).remove();
	GM_addStyle(".Gpr_bar_outshell{ border-radius:5px; border: solid 1px; width: "+window.config.width+"px; height: 14px; "+pos(GM_getValue('position'))+" background-color:#FFFFFF;}");
}
function optcan(){
	$('#devopts, #Gpr_Moreinfo').hide(700).remove();
}

function eventmod(obj, event, callback){
	var bef="obj.";
	if(window.opera){
		bef+="on"+event+"=callback";
	}else{
		if(document.addEventListener){
			bef+="addEventListener('"+event+"',callback)";
		}else{	
			bef+="attachEvent('on"+event+"',callback)";
		}
	}
	eval(bef);
}


//Cookie Functions
function setCookie(name,value,days) { //days = hours
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*1000));  //24*60*60*1000
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}
//End of cookie functions//

if(!getCookie('GprExisting')){
			GM_xmlhttpRequest({
				method: "GET",
				url: 'http://www.nukewarz.com/javascript/pagerank.php?version='+window.config.version+'&url='+config.base,
				headers: {"User-Agent": "Mozilla/4.0 (compatible; GoogleToolbar 2.0.114-big; Windows XP 5.1)"},	
				onload: function(response){
					var temp = jQuery.parseJSON(response.responseText);
					window.config.alexa=temp.alexa;
					window.config.pagerank=temp.pagerank;
					window.config.dmoz=temp.dmoz;
					
					var percent = (100*temp.pagerank/10);
					var style='<div id="GprExist" class="Gpr_bar_outshell"><div class="Gpr_bar_innershell" style="width:'+percent+'%"> &nbsp;</div><div class="Gpr_text_innershell">'+percent+'%</div></div>';
						$('body').append('<br />'+style);	
				}
			});
	setCookie('GprExisting', 'true', 5); //stores for 5 seconds
}