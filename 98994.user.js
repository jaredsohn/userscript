// ==UserScript==
// @name           daniweb_msgs_mod
// @version        .1
// @namespace      daniweb_msgs_mod
// @description    modify daniweb inbox interface by adding a drop down menu of messages to upper-left
// @include        http://www.daniweb.com/*
// @include        http://daniweb.com/*
// ==/UserScript==
if ((document.body.innerHTML.indexOf(
	'<a href="/forums/usercp.php">User Control Panel'
) > -1) && (document.body.innerHTML.indexOf(
	'<a href="/forums/private.php">Private Messages'
) > -1)) {
	arr_tr = document.getElementsByTagName('tr');
	var msg_count = 0;
	var messages = new Array();
	for(var i_tr=0; i_tr < arr_tr.length; i_tr++) {
		var a_tr = arr_tr[i_tr];
		if(a_tr.innerHTML.indexOf('<tr')==-1) {
			if(a_tr.innerHTML.indexOf('pmid=')>-1) {
				arr_td = a_tr.getElementsByTagName('td');
				messages[msg_count] = new Array();
				messages[msg_count].replied = (arr_td[0].innerHTML.indexOf('pm_replied.gif')>-1);
				messages[msg_count].bNew = (arr_td[0].innerHTML.indexOf('pm_new.gif')>-1);
				var arr_div = arr_td[1].getElementsByTagName('div');
				var a_div = arr_div[0];
				var arr_span = arr_td[1].getElementsByTagName('span');
				messages[msg_count].dt_stamp = arr_span[0].innerHTML+' ';
				messages[msg_count].dt_stamp+= arr_span[1].innerHTML;
				messages[msg_count].from     = arr_span[2].innerHTML;
				messages[msg_count].href     = arr_div[0].getElementsByTagName('a')[0].getAttribute('href');
				messages[msg_count].title    = arr_div[0].getElementsByTagName('a')[0].innerHTML;
				//alert(messages[msg_count].from+':: '+messages[msg_count].replied+' : '+messages[msg_count].dt_stamp+' : '+messages[msg_count].href);
				msg_count++;
			}
		}
	}
	if (messages.length>0) {
		var oStats = document.getElementById('stats');
		var my_div = document.createElement('div');
		var strDiv = '<div id="harbl" '
		strDiv+= 'style="background-color:#ffffff;z-index:100;position:absolute;top:0px;left:0px;" '
		strDiv+= 'title="">M<ul style="display:none;"><li style="font-size:75%;">Bold=New, Italic=Replied</li>';
		for(var i=0;i<messages.length;i++){
			var strLi = '<li style="'
			if(messages[i].bNew){strLi+='font-weight:bold;'}
			if(messages[i].replied){strLi+='font-style:italic;'}
			strLi+='"><a href="'+messages[i].href+'">'
				+messages[i].from
				+': "'+messages[i].title+'['
				+messages[i].dt_stamp+']</a></li>';
			strDiv += strLi;
		}
		strDiv += '</ul></div>';
		my_div.innerHTML = strDiv
		my_div.style.textAlign = 'left';
		oStats.insertBefore(my_div, oStats.firstChild);
		document.getElementById('harbl').addEventListener('mouseover'
			, function () {
			if(!this.getElementsByTagName("ul")) return false;
			var ul = this.getElementsByTagName("ul");
			ul[0].style.display = "block";
			return true;}
			, false)
		document.getElementById('harbl').addEventListener('mouseout'
			, function () {
			if(!this.getElementsByTagName("ul")) return false;
			var ul = this.getElementsByTagName("ul");
			ul[0].style.display = "none";
			return true;} 
			, false)
	}
}