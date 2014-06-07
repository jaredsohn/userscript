// ==UserScript==
// @name           Chucker
// ==/UserScript==


/*
 Modified Script - original author credit:

 ChuckACrap V1.0 released 18, December 2009
 Author : Arun Nava

 Parts of this code are gotten from Spockholm's RepeatGift tool specifically
 the part where we check for http response states in the state_change method.

 His script can be found at www.spockholm.com/mafia/bookmarklets.php

 Got the idea for Unframing from the UnframeMW bookmarlet written by Vern

 But my code is different so it may not work the same.
 *************************************************************************/

var wish_url;
var count=1,sent=0;
var xmlHTTP;
var stop=true;
var retry_timer;
var session_update_count = 0;
var gift_button_count;

javascript:(function(){


try{

	var frame=document.getElementsByName('mafiawars');

	if(frame.length>0 || (!frame)){
		window.location.href=document.getElementsByName('mafiawars')[0].src;
		return;
	}

	else{
		document.body.parentNode.style.overflowY="scroll";
		document.body.style.overflowX="auto";
		document.body.style.overflowY="auto";
		if(typeof FB!='undefined'){
			FB.CanvasClient.stopTimerToSizeToContent;
			window.clearInterval(FB.CanvasClient._timer);
			FB.CanvasClient._timer=-1;
		}
	}
}
catch(err){}

try{


    var browser_name = navigator.appName;
    if(browser_name == "Microsoft Internet Explorer"){
        alert("Wishlist Chucker does not run on Internet Explorer, Please use a browser such as Firefox or Chrome");
        return;
    }


var userid=/uid': ([0-9]+)/.exec(document.body.innerHTML)[1];

//post_request(url);

var styles='<style type="text/css">'+
	'.sexy_table1{font-weight:bold; border:1px solid #666666; padding-left:10px; }'+
	'.sexy_error_table{font-size:17px; background-color:black; color:red; padding-left:10px}'+
	'.sexy_select{font-weight:bold; color:#D0D0D0; border: 1px solid #666666; background-color:black; width:100%; font-size:15px; }'+
	'.sexy_input{background-color:black; color:#D0D0D0; width:83%; font-size:15px; font-weight:bold; border: 1px solid #666666; padding-left:0.2em}'+
	'.sexy_start_gift{background:black; height:25px; border-width:0.5px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}'+
	'.sexy_stop_gift{background:black; height:25px; border-width:1px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}'+
	'.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 20px; font-weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}'+
	'.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid #FFD927; overflow: hidden;}'+
	'</style>';

var table_html='<form id="something">'+
			'<table width="745px">'+

			'<tr class="sexy_table1"><table class="sexy_table1" style="background-color:black; height:40px"><th width="50%" style="font-size:20px; padding-left:15px; text-align:left">Wishlist Chucker beta </th>'+
			'<th width="48%" style="font-size:12px; text-align:right"> <a id="Website" align="right" href="http://arun.keen-computing.co.uk" target="_blank">Arun\'s Mafia Wars Helpers</a> - <a id="Donate" href="http://arun.keen-computing.co.uk/?page_id=31" target="_blank">Donate</a></th>'+
			'<th width=2% align=center>  <a href="#" id="close"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></th>'+
			'</tr></table>'+
			'</tr>'+

			'<tr>'+
			'<table class="sexy_table1" width=100%  style="background-color:black; height:40px">'+
			'<tr style="height:40px"><th width="20%" style="text-align:left">Number of times :</th><th width="30%" style="text-align:left"><input type=text id="quantity" value="1" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></th>'+
			'<tr style="height:40px">' +
               '<th width="20%" colspan="2" style="text-align:left">' +
                    '<select id="speed_mode"> ' +
                    '<option value="slow">Slow</option> ' +
                    '<option value="slow">Fast</option> ' +
                    '<option value="slow">Turbo</option> ' +
                '</select> ' +
               'Speed mode (Slow is reliable, Fast is less reliable, Turbo is unreliable)</th>'+
			'<tr style="height:40px"><th><input type="button" id="begin" class="sexy_button" value="START CHUCKING"></th><th><input type="button" id="stop" class="sexy_button" value="STOP CHUCKING"></th></tr>'+
			'</table>'+
			'</tr>'+

			'<tr class="sexy_table1" style="height:70px">'+
			'<table class="sexy_table1" width=100% style="background-color:black; height:40px">'+
			'<tr><th width=10% style="height:40px; text-align:left">Log :</th><th id="logger" style="text-align:left"></th></tr>'+
			'<tr><th width=10% style="height:40px; text-align:left">&nbsp;</th><th id="logged" style="text-align:left"></th></tr>'+
			'</table>'+
			'</tr>'+

			'</table>'+
			'</form>';



var error_window='<table class="sexy_error_table" width=100% id="errormsg" border=2 rules=none bgcolor="black"></table><br>';


try{
	document.getElementById('content_row').removeChild(document.getElementById('wisher_div'));
}
catch(err){}

var content=document.getElementById('content_row');
var wisher_div=document.createElement("div");
wisher_div.id='wisher_div';

wisher_div.innerHTML = styles+error_window+table_html;

content.insertBefore(wisher_div,content.firstChild);




function chuckwishlist(){
    gift_button_count = document.body.innerHTML.match(/Send\sGift/ig).length;
    if(gift_button_count <= 1){
        alert('1. Ensure you are at recipient\'s profile page \n2. Wishlist is set\n3. You are in each other\'s Mafia\n4. You have sufficient quantity of the items on the recipient\'s wishlist');
    	document.getElementById('content_row').removeChild(document.getElementById('wisher_div'));
	   return;
    }
	stop=false;
	sent=0;
	count=parseInt(document.forms.something.quantity.value);
	logmsg('Starting up....');

    if(document.forms.something.speed_mode.selectedIndex == 2){
        sendInTurbo();
    } else {
        post_request();
    }

}


var turbo_sent = 0;
function sendInTurbo() {
    if(turbo_sent < count && stop!=true) {
        turbo_sent++;
        logmsg('Attempted to send wishlist items <font color=#33FF00>x'+turbo_sent+'</font>','false');
        post_request();
        setTimeout(sendInTurbo, 50);
    }
}

function post_request(){

	xmlHTTP=get_xmlHTTP();

	if(sent<count && stop!=true){
        retry_timer = setTimeout(function(){sent++;xmlHTTP.abort();logmsg('Hangup, Retrying...','true');post_request();},60000);
		xmlHTTP.open('GET',wish_url,true);

		xmlHTTP.onreadystatechange = state_change;
		xmlHTTP.send(null);
//        do_ajax('inner_page', wl_gift_all_url);
//        sent++;
//		logmsg('Wishlist items <font color=#33FF00>x'+sent+'</font>','false');
//		setTimeout(post_request,1000);
	}
	else{
	   clearTimeout(retry_timer);
		logmsg(message+' <font color=#33FF00>x'+sent+'</font>','false');
		logmsg('Stopped..','true');
	}

}

function state_change(){
    if(document.forms.something.speed_mode.selectedIndex == 1){
    	if(xmlHTTP.readyState==3){
            session_update_count++;
            clearTimeout(retry_timer);
            xmlHTTP.abort();
            sent++;
            logmsg('Attempted to send wishlist items <font color=#33FF00>x'+sent+'</font>','false');
            wish_url = "http://facebook.mafiawars.com/mwfb/"+wl_gift_all_url+"&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id="+userid+"&sf_xw_sig="+local_xw_sig;
            post_request();
            if(session_update_count >= 100){
                update_session();
            }
        }
    }

	if(xmlHTTP.readyState==4){
		if(xmlHTTP.status==200){
            session_update_count++;
            clearTimeout(retry_timer);
			response = xmlHTTP.responseText;
			if(/You\sgave/i.exec(response)){
				message = /class="message_body">([^<]+)/.exec(response)[1];
				sent++;

				logmsg(message+' <font color=#33FF00>x'+sent+'</font>','false');

				try{
					if(/Send\sGift/i.test(response)){
						wish_url = eval(/wl_gift_all_url\s=\s"([^;]+)/.exec(response)[0]);
						local_xw_sig = /local_xw_sig\s=\s'([^']+)/.exec(response)[1];
						wish_url = "http://facebook.mafiawars.com/mwfb/"+wish_url+"&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id="+userid+"&sf_xw_sig="+local_xw_sig;
					}
					else{ throw '';}
				}
				catch(err){
//				    alert(err);
					logmsg('Can\'t gift, Check wishlist please. Stopping...','true');
                    stop = true;
					return;
				}

				if(response.match(/Send\sGift/ig).length != gift_button_count){
					logmsg('Ran out of some item, Stopping...','true');
                    stop = true;
					return;
				}


                if(document.forms.something.speed_mode.selectedIndex == 0){
                    // if slow mode is on, this is the iterator.
    				post_request();
                }

                if(session_update_count >= 100){
                    update_session();
                }
			}
			else if (/The\swishlist\sof\sthis\suser\shas\sbeen\supdated/i.exec(response)){
	           clearTimeout(retry_timer);
				logmsg('Wishlist changed, stopping. Refresh recipient\'s profile page and retry please..','true');
                stop = true;
				return;
			}
		}

	}

}

function stopchucking(){
    clearTimeout(retry_timer);
	logmsg('Stopping....','true');
	stop=true;
}

function update_session(){
try{
    session_update_count=0;
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var links=document.evaluate( "//ul[@class=\"tabs clearfix\"]//li[@class=\"tab_on tab_first\"]//div[@class=\"tab_content\"]//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    links.snapshotItem(0).dispatchEvent(evt);
}
catch(err){alert(err);}
}

function close_gifter(){

    clearTimeout(retry_timer);
	try{
		xmlHTTP.abort();
	}
	catch(err){}

	document.getElementById('content_row').removeChild(document.getElementById('wisher_div'));

}

function get_xmlHTTP(){
	if(window.XMLHttpRequest)
		return new XMLHttpRequest();
	if(window.ActiveXObject)
		return new ActiveXObject('Microsoft.XMLHTTP');
	return;
}



function logmsg(message,newline){
	var hr = new Date().getHours();
	var min = new Date().getMinutes();

	hr= (hr<10?'0'+hr:hr);
	min = (min<10?'0'+min:min);

	if(newline=='true'){
		document.getElementById('logged').innerHTML = document.getElementById('logger').innerHTML+'<br>'+document.getElementById('logged').innerHTML;
	}

	document.getElementById('logger').innerHTML='<font color=#666666>['+hr+':'+min+']</font> '+message;

}


document.getElementById("close").onclick=close_gifter;
document.getElementById("begin").onclick=chuckwishlist;
document.getElementById("stop").onclick=stopchucking;

try{
//	if(/Gift\sall/i.exec(document.body.innerHTML)[0]){
//		wish_url = eval(/wl_gift_all_url\s=\s"([^;]+)/.exec(document.body.innerHTML)[0]);
    if(/Send Gift/.test(document.body.innerHTML)){
    	wish_url = "http://facebook.mafiawars.com/mwfb/"+wl_gift_all_url+"&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id="+userid+"&sf_xw_sig="+local_xw_sig;
   	}
   	else{
   	    throw '';
    }
}
catch(err){
	alert('Ensure you are at recipient\'s profile page, and Wishlist is set');
	document.getElementById('content_row').removeChild(document.getElementById('wisher_div'));
	return;
}

gift_button_count = document.body.innerHTML.match(/Send\sGift/ig).length;
if(gift_button_count <= 1){
    alert('1. Ensure you are at recipient\'s profile page \n2. Wishlist is set\n3. You are in each other\'s Mafia\n4. You have sufficient quantity of the items on the recipient\'s wishlist');
	document.getElementById('content_row').removeChild(document.getElementById('wisher_div'));
	return;
}

function alert_user(message){
	document.getElementById('errormsg').innerHTML+='<tr>'+message+'</tr>';
}




}
catch(err){alert(err);}


})();


function field_validate(key_code){

	if ((key_code>=48 && key_code<=57) || (key_code>=96 && key_code<=105) || key_code==8 || key_code==127 || key_code==37 || key_code==39 || key_code==9 || key_code==46){
		return true;
	}
	else{
		return false;
	}
}