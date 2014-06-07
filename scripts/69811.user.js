// ==UserScript==
// @name           wish list
// ==/UserScript==



/*************************************************************************
ChuckACrap V1.0 released 18, December 2009
Author : Arun Nava

Parts of this code are gotten from Spockholm's RepeatGift tool specifically 
the part where we check for http response states in the state_change method.

His script can be found at www.spockholm.com/mafia/bookmarklets.php

Got the idea for Unframing from the UnframeMW bookmarlet written by Vern

But my code is different so it may not work the same.

/**************************************************************************

ChuckACrap V1.0b released 23, December 2009

Features : 
>Choosing receiver from either profile page or list box
>Fixed refreshing of page by pressing the close button


*************************************************************************/

/**************************************************************************

ChuckACrap V2.0 released 19, January 2009

Features : 
>Quantity fetching not done for each item separately and changed to POST instead of GET
>Improved UI
>Forced 2 second delay
>Alphabetical Sorting of Loot and boosts and categorizing of Collection items by city and collection type
>Hangup recovery code added for quantity fetching and gifting


*************************************************************************/


javascript:(function(){

try{

	var frame=document.getElementsByName('mafiawars');

	if(frame.length>0 || (!frame)){
		if(confirm('You need to break out the mw-frame first.\nPress OK to do it now.')){
			window.location.href=document.getElementsByName('mafiawars')[0].src;
			return;
		}
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



var wish_url;
var count=1,sent=0;
var xmlHTTP;
var stop=true;
var userid=/uid': ([0-9]+)/.exec(document.body.innerHTML)[1];


var gift_button_count;


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

			'<tr class="sexy_table1"><table class="sexy_table1" style="background-color:black; height:40px"><th width=70% style="font-size:20px; padding-left:15px;">Wishlist Chucker beta </th>'+
			'<th style="font-size:13px"> <a id="Website" href="http://arun-nav.yolasite.com" target="_blank">Arun\'s Mafia Wars Helpers</a></th>'+
			'<th width=2% align=center>  <a href="#" id="close"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></th>'+
			'</tr></table>'+
			'</tr>'+

			'<tr>'+
			'<table class="sexy_table1" width=100%  style="background-color:black; height:40px">'+
			'<tr style="height:40px"><th width="20%">Number of times :</th><th width="30%"><input type=text id="quantity" value="1" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></th>'+
			'<tr style="height:40px"><th><input type="button" id="begin" class="sexy_button" value="START CHUCKING"></th><th><input type="button" id="stop" class="sexy_button" value="STOP CHUCKING"></th></tr>'+
			'</table>'+
			'</tr>'+

			'<tr class="sexy_table1" style="height:70px">'+
			'<table class="sexy_table1" width=100% style="background-color:black; height:40px">'+
			'<tr><th width=10% style="height:40px">Log :</th><th id="logger"></th></tr>'+
			'<tr><th></th><th id="logged" style="height:30px"></th></tr>'+
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
	stop=false;
	sent=0;
	count=parseInt(document.forms.something.quantity.value);
	logmsg('Starting up....');
	post_request();

}



function post_request(){

	xmlHTTP=get_xmlHTTP();


	if(sent<count && stop!=true){
		xmlHTTP.open('GET',wish_url,true);
		xmlHTTP.onreadystatechange = state_change;
		xmlHTTP.send(null);
	}
	else{
		logmsg(message+' <font color=#33FF00>x'+sent+'</font>','false');
		logmsg('Stopped..','true');
	}

}

function state_change(){

	if(xmlHTTP.readyState==4){
		if(xmlHTTP.status==200){
			responseText = xmlHTTP.responseText;
			if(/You\sgave/i.exec(responseText)){

				message = /class="message_body">([^<]+)/.exec(responseText)[1];
				sent++;

				logmsg(message+' <font color=#33FF00>x'+sent+'</font>','false');
				
				try{
					if(/Gift\sall/i.exec(responseText)[0]){
						wish_url = eval(/wl_gift_all_url\s=\s"([^;]+)/.exec(xmlHTTP.responseText)[0]);
						wish_url = "http://mwfb.zynga.com/mwfb/"+wish_url+"&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id="+userid+"&sf_xw_sig="+local_xw_sig;
					}
					else{ throw '';}
				}
				catch(err){
					logmsg('Can\'t gift all, Check wishlist please. Stopping...','true');
					return;
				}

				if(responseText.match(/Send\sGift/ig).length != gift_button_count){
					logmsg('Ran out of some item, Stopping...','true');
					return;
				}


				post_request();
			}
			else if (/The\swishlist\sof\sthis\suser\shas\sbeen\supdated/i.exec(xmlHTTP.responseText)){
				logmsg('Wishlist changed, stopping. Refresh recipient\'s profile page and retry please..','true');
				return;
			}
		}
	
	}

}

function stopchucking(){
	logmsg('Stopping....','true');
	stop=true;
}

function close_gifter(){

	try{
		xmlHTTP.onreadystatechange=null;
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
		document.getElementById('logged').innerHTML+=document.getElementById('logger').innerHTML+'<br>';
	}

	document.getElementById('logger').innerHTML='<font color=#666666>['+hr+':'+min+']</font> '+message;

}


document.getElementById("close").onclick=close_gifter;

document.getElementById("begin").onclick=chuckwishlist;
document.getElementById("stop").onclick=stopchucking;

try{
	if(/Gift\sall/i.exec(document.body.innerHTML)[0]){
		wish_url = eval(/wl_gift_all_url\s=\s"([^;]+)/.exec(document.body.innerHTML)[0]);
		wish_url = "http://mwfb.zynga.com/mwfb/"+wish_url+"&xw_client_id=8&ajax=1&liteload=0&sf_xw_user_id="+userid+"&sf_xw_sig="+local_xw_sig;
	}
	else{ throw ''; }
}
catch(err){
	alert('Ensure you are at recipient\'s profile page, wishlist is set correctly and Gift All button is visible');
	document.getElementById('content_row').removeChild(document.getElementById('wisher_div'));
}





gift_button_count = document.body.innerHTML.match(/Send\sGift/ig).length;



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