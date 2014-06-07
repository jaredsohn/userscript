// ==UserScript==
// @name        chat for bridge
// @namespace   public
// @description chat
// @include     *//www.bridge-of-love.com/index.php?app=member
// @include     *//chat.bridge-of-love.com/lady.php*
// @version     1.3.1
// ==/UserScript==
$(document).ready(function(){
	var check_date = new Date();
	if(check_date.getDate()<23 && check_date.getDate()>12){
	var sending_interval;//setInterval in button 'start'
	var timeout_minutes;
	var timeout;//time to sending
	var timeout_fun;//setTimout in function timer()
	var message;
	var start_send;
	var start_send_interval;
	var stop_send;
	var now_time;
	var real_time;
	var end_time;
	var countdown;//differ between end_time and realtime
	var count_send = 0;
	var man_online;
	var man_black;
	var black_list = [];
	var count_id_black = 0;
	$('head').append('<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0Bw5ANapI_ulBa0lrdTlBN2lrS1E/">');
	$('head').append('<link rel="stylesheet" type="text/css" href="https://googledrive.com/host/0Bw5ANapI_ulBVnhOUl9rR0RHOVU/">');
	$('a.active.r15').remove();
	$('.nav_main').append($('<li><a href="http://chat.bridge-of-love.com/lady.php"  class="active r15" title="Чат"><strong>Чат</strong></a></li>'));
	$('.b-header').append('<div id="g-main"><div class="buttons"><a class="button green">Start</a><a class="button pink">Stop</a></div><div id="second_block"><div class="div_timeout"><span>Интервал</span><input id="inp_timeout" type="text" size="3" value="2"> мин.</div><div id="g-timer"></div></div><div id="div_mes"><input id="message" type="text" size="9" value="Hello"><div id="count_send">Рассылок: </div></div><div id="div_list"><button id="clean_list">Очистить чёрный список</button><div class="select-and-input"><select id="select_black" name="selectName" onchange="parentNode.getElementsByTagName(\'input\')[0].value=value"><option value="Value1"></option></select><input type="text" id="input_black" name="inputText"/></div><div><button id="add_li">+</button><button id="del_li">-</button></div></div></div>');
	var i_c = 0;
	function createCookie(name,value,days) {
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
    	document.cookie = name+"="+value+expires+"; path=/";
	}
 
	function readCookieByVal(val){
		var i_c_l = readCookie("i_c");
		i_c_l = parseInt(i_c_l);
	    var c;
	    for(var i=0; i<i_c_l;i++){
    		c = readCookie("id"+i);
    		c = ""+c;
    		val = ""+val;
    		if(c==val){
    			return i;
    		} 
    	}		
	}

	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}

	function eraseCookie(name) {
		var i_c_l = readCookie("i_c");
		i_c_l = parseInt(i_c_l);
    	for(var i=0; i<i_c_l;i++){
    		createCookie(("id"+i),"",-1);
    	}
	}

	function eraseOneCookie(i) {
		offset_l(i);
    	//createCookie(("id"+i),"",-1);
	}

	function offset_l(ii){
		var off_cookie;
		var i_c_l = readCookie("i_c");
		i_c_l = parseInt(i_c_l);
		for(var i=ii; i<i_c_l; i++){
			off_cookie = readCookie("id"+(i+1));
			createCookie("id"+i,off_cookie,30);
		}
		createCookie(("id"+(i+1)),"",-1);
	}

	
	function getBlack(){
		while((readCookie("id"+i_c)!= null) && i_c < 10){
			black_list[i_c] = readCookie("id"+i_c);
			$('#select_black').append("<option value='"+black_list[i_c]+"'>"+black_list[i_c]+"</option>");
			i_c += 1;
		}
		createCookie("i_c",i_c,30);
		var i_c_l = readCookie("i_c");
		i_c_l = parseInt(i_c_l);
	}
	getBlack();

	$('#clean_list').on('click',function(){
		eraseCookie();
	})

	$('#add_li').on('click',function(){
		var i_c_l = readCookie("i_c");
		i_c_l = parseInt(i_c_l);
		man_black = $('#input_black').val();
		if(black_list.indexOf(man_black) == -1){
			black_list.push(man_black);
			$('#select_black').append("<option value='"+man_black+"'>"+man_black+"</option>");
			c_name = "id"+i_c_l;
			createCookie(c_name,man_black,30);
			//createCookie("i_c",i_c_l,30);
			i_c += 1;
		}
	});

	$('#del_li').on('click',function(){
		var to_del = $('#input_black').val()
		var c = readCookieByVal(to_del);
		eraseOneCookie(c);
	});

	$('.green').on('click',function(){
		$('.pink').click();
		$(this).css('color','green');
		$('.pink').css('color','black');
		timeout_minutes = $('#inp_timeout').val();
		message = $('#message').val();
		if(timeout_minutes>0 && timeout_minutes <61){
			timeout = timeout_minutes * 60;
			now_time = new Date();
			end_time = now_time.getTime() + timeout * 1000;
			sending();
			start_send();			
		}
		else alert("Time must be between 1-60");

	});
	$('.pink').on('click',function(){
		$(this).css('color','red');
		$('.green').css('color','black');
		stop_send();
		document.getElementById("g-timer").innerHTML = "Остановлено";
		man_online = $('div.b-online-profiles li').find('a.name');

	});	

	function sending(){
		man_online = $('div.b-online-profiles li').find('a.name');
		var parsed;
		if(man_online.length == 0){
			alert("Дождитесь, пока появятся 'Мужчины онлайн' (должно быть > 0), после этого нажмите Start");
		}
		for (var i=0; i < man_online.length; i++){
			parsed = "" + man_online[i];
			parsed = parsed.substring(40);
			parsed = parsed.substring(0,5);
			if(black_list.indexOf(parsed) == -1){
			man_online[i].click();
			$('.message-box textarea').text(message);
			var send = $('.button-box a').get(0);
			send.click();
			var t = $('.outgoing_text').find('span');
			}
		}
		count_send += 1;
		document.getElementById("count_send").innerHTML = "Рассылок: " + count_send;	
	}

	function timer(){
		real_time = new Date();
		real_time = real_time.getTime();
		if(countdown == 0){
			sending();
			now_time = new Date();
			end_time = now_time.getTime() + timeout * 1000;
		}
		countdown = end_time - real_time;
		countdown = countdown/1000;
		countdown = countdown - (countdown%1);
		var convert = convert_seconds(countdown);
		var mins = convert[0];
		var sec = convert[1];
		document.getElementById("g-timer").innerHTML = "Следующая рассылка: " +mins+":"+sec;
	}

	function start_send(){
		start_send_interval = setInterval(timer,1000);
	}
	function stop_send(){
		clearInterval(start_send_interval);
	}

	function convert_seconds(sec){
		if(sec < 60){
			minutes = "00";
			seconds = sec;
		}
		else{
			minutes = sec / 60;
			minutes = minutes - (minutes%1);
			seconds = sec-minutes*60;
			if(seconds<0) seconds = 60 + seconds;
		}
		if(minutes<10 && minutes != "00") minutes = "0" + minutes;
		if(seconds<10) seconds = "0" + seconds;
		result = [minutes,seconds];
		return result;
	} 
		
}
});
