// leprospambot for leprosorium.ru
// version 0.11
// Copyright (c) 2011-2013, Be3HOrNM
// Released under the GPL license
// --------------------------------------------------------------------
// #48684
// ==UserScript==
// @name           leprospambot
// @description leprospambot for leprosorium.ru
// @ujs:category site: automation
// @ujs:documentation n/a
// @ujs:download n/a
// @include http://*leprosorium.ru/my/inbox/*
// ==/UserScript==
// ==UserScript==

var wtf, go1, interval1;
var myString = new String ( 'wef,wef');
var myStringList = myString.split(',');


function postmessage(trimmed,message1){
	var answer1;
	var xx= Math.floor(Math.random()*48);
	var yy= Math.floor(Math.random()*16);
		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://leprosorium.ru/my/inbox/write",
			data: "comment="+message1+"&imageField.x="+xx+"&imageField.y="+yy+"&run=01&whom="+trimmed+"&wtf="+wtf,
			dataType: "json",
		});
		$.ajaxSetup({async:true});
}



function TrimString(string){
return string.replace(/(^\s+)|(\s+$)/g, "");
}


function Match(text, pattern){
	var m = text.match(pattern);
	if (m == null) 
		return null;
	return m[1];
}


   function appendcontrol() {
	var qwe1='<div><textarea wrap="hard" cols=78 rows=5 id="textarea2" style="font-size:11px" \
	onClick="javascript: if (this.value==\'Список юзернеймов вставлять сюда.\') this.value=\'\';">Список юзернеймов вставлять сюда.</textarea><br/> \
<textarea wrap="hard" cols=78 rows=5 id="textarea3" style="font-size:11px" \
	onClick="javascript: if (this.value==\'Привет! Хорошо пишешь, нравится.\') this.value=\'\';">Привет! Хорошо пишешь, нравится.</textarea><br/> \
Задержка, мс:<input type="text" id="howlong" value="2000" ></div><br/> \
<div class="toolbar"> \
<span id="toolbar1" class="ui-widget-header ui-corner-all"> \
	<button id="help">help</button> \
	<button id="play">play</button> \
	<button id="clearlog">clearlog</button> \
</span></div><style> \
#toolbar0{padding:10px 0px; padding-top: 0px;}#toolbar0{margin-bottom:10px;}#toolbar1{padding:10px 4px;} \
#toolbar1{margin-bottom:10px;}#toolbar2{padding:10px 4px;} \
#toolbar2{margin-bottom:10px;line-height:41px;}#textarea1{margin-top:10px;}#textarea2{margin-top:10px;} .ui-widget{font-size: 0.8em;}</style> \
<textarea wrap="hard" readonly="yes" cols=90 rows=5 id="textarea1" style="font-size:9px">=== console log started. ===</textarea>';

	var qwe2 = '<div id="myid"  title="Лепроспамбот v0.11"><div id="tabs"> \
	<ul> \
		<li><a href="#tabs-1">Лепроспамбот</a></li> \
		<li><a href="#tabs-2">About</a></li> \
	</ul> \
	<div id="tabs-1">' + qwe1 + '</div> \
	<div id="tabs-2"><p>Тут должна была быть инструкция, но она опазывает. Ха-ха.</p> \
<p>Куда уж проще - верхнее окно, туда вставляете список юзернеймов или их номеров, через запятую, всё как в обычном инбоксе. \
Вводите осторожно, перепроверьте, а то как бы чего не вышло, скрипт же не может проверить на валидность юзернейм. \
Второе окно - это текст сообщения. Короче 20 символов не разрешается, как бы вот так мы заботимся о вас. \
Проверьте скрипт у себя на машине, может у вас отправка работает криво, и инбоксы будут уходить битые, \
вы же понимаете что это теперь касается и других.</p> \
		<p>Ads: <a href="http://userscripts.org/scripts/show/94408">Поставь скрипт лепрокармадроч!</a></p> \
		<p>Ads: <a href="http://userscripts.org/scripts/show/97086">Юзернейм аггрегатор, дешевый и сердитый. </a></p> \
		</div> \
	</div> \
	</div>';	
	var bodyHtml = document.body.innerHTML;
	wtf = Match(bodyHtml, /inboxHandler.wtf = '([0-9a-z]+)'/);
	var divTag = document.createElement("div");
	divTag.innerHTML = qwe2;
	document.body.appendChild(divTag);
	$( "#myid" ).dialog({ minWidth: 570, minHeight: 350 });
	$( "#tabs" ).tabs();


		$( "#play" ).button({text: false,icons: {primary: "ui-icon-play"}})
		.click(function() {
			var options;
			if ( $( this ).text() == "play" ) {
				go1=0;
				options = {label: "stop",icons: {primary: "ui-icon-stop"}
				};
			} else {
				go1=1;
				options = {label: "play",icons: {primary: "ui-icon-play"}
				};
			}
			$( "#play" ).button( "option", options );
		});
		$( "#clearlog" ).button({text: false,	icons: {primary: "ui-icon-trash"}});
		$( "#help"     ).button({text: false,	icons: {primary: "ui-icon-help"	}});

    }


// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {

            var GM_Head2 = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ2 = document.createElement('link');
            GM_JQ2.href= 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/le-frog/jquery-ui.css';
            GM_JQ2.type = 'text/css';
	    GM_JQ2.rel = 'stylesheet';
            GM_JQ2.async = true;
            GM_Head2.insertBefore(GM_JQ2, GM_Head2.firstChild);


            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);


            var GM_Head1 = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ1 = document.createElement('script');
            GM_JQ1.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js';
            GM_JQ1.type = 'text/javascript';
            GM_JQ1.async = true;
            GM_Head1.insertBefore(GM_JQ1, GM_Head1.firstChild);


        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 1000);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }



function gso1() {	
		var ii=0;
		var trimmed;
		var tVal ;
		var howlong = parseInt($('#howlong').val());
		var message1 = new String ( $('#textarea3').val() );
		myString = $('#textarea2').val() ;
		myStringList = myString.split(',');
		var howmuch = myStringList.length ;


			if( message1.length < 20){
				alert('Your message is shorter then 20. Now is ' + message1.length);
				return(false);};

			if( howlong < 499){
				alert(howlong+ ' milliseconds is too small, set more.');
				return(false);};
			if( wtf.length < 30){
				alert('Check wtf value. Are you logged in?');
				return(false);};



	tVal = $('#textarea1').val(); 	
	$('#textarea1').val('=== leprospambot started. === \n'+tVal);	
	interval1 = setInterval(function() {
	trimmed = TrimString ( myStringList[ii] );

	if ( trimmed.length > 1 ){
		postmessage(trimmed,message1);
		tVal = $('#textarea1').val(); 	
		$('#textarea1').val( ii + '. ' + trimmed + ' \n' + tVal); 	
	};

	if (Math.abs(++ii) == howmuch) $( "#play" ).click();
		}, howlong); 	


	return(false);
}



function gso2() {	
	var tVal = $('#textarea1').val();	
	$('#textarea1').val('=== leprospambot stopped. === \n'+tVal);	
	clearInterval(interval1); 
	return(false); }

function gso3() {	
	$('#textarea1').val('=== clear === \n');	
	return(false); }

function gso4() {	
	window.open('http://userscripts.org/scripts/show/97117'); 
	self.focus();
	return(false); }


    function letsJQuery() {
		appendcontrol();

		var submit1 = document.getElementById('play');
		var submit3 = document.getElementById('clearlog');
		var submit4 = document.getElementById('help');
		submit1.addEventListener('click',function (e) {
			if(go1==1) gso2(); else gso1() ;},true);
		submit3.addEventListener('click',function (e) {gso3();},true);
		submit4.addEventListener('click',function (e) {gso4();},true);

    }