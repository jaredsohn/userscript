// karmadroch for leprosorium.ru
// version 0.931
// Copyright (c) 2011-2013, Be3HOrNM
// Released under the GPL license
// --------------------------------------------------------------------
// #48684
// ==UserScript==
// @name leprokarmadroch
// @description karmadroch v0.931 for leprosorium.ru
// @ujs:category site: automation
// @ujs:documentation n/a
// @ujs:download n/a
// @include http://*leprosorium.ru/users/*
// ==/UserScript==

var ii=0, ij=0, go1=0, go2=0, interval1, interval2, wtf, startkarma, howmuch, howlong, karmavote1, status1, 
	karmavote2, status2, incr, doplus, whoplus, karmajson, myid, shift;


xpathOneEx = function(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
xpathOne = function(query) {
    return xpathOneEx(query, document);
}
xpathMany = function(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


getkarmausers = function() {
	var bodyHtml = document.body.innerHTML, sum1="",sum2="";
	var myid= Match(bodyHtml, /button:this, id:([0-9]+)/);
	var tVal, username1,karmajson;
	var a = Array();
		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://leprosorium.ru/karmactl",
			data: "view="+myid,
			dataType: "json",
			success: function(msg){
				karmajson = msg;
			}
		});
		$.ajaxSetup({async:true});

	var jsonlength = karmajson.votes.length;

	for (var i = 0; i < jsonlength ; i++) {
	tVal = $('#usernames1').val(); 
	if(karmajson.votes[i].attitude =='1' || karmajson.votes[i].attitude =='2' )
		sum1=sum1 + karmajson.votes[i].login+' , ';
	if(karmajson.votes[i].attitude =='-1' || karmajson.votes[i].attitude =='-2' )
		sum2=sum2 + karmajson.votes[i].login+' , ';

	}
		$('#usernames1').val(sum1);
		$('#usernames2').val(sum2);
	return false;
}



function Match(text, pattern){
	var m = text.match(pattern);
	if (m == null) 
		return null;
	return m[1];
}


function postplus(wtf,userid){
karmavote1 = 2 ;
status1 ='OK';

 $.ajax({
   type: "get",
   url: "http://leprosorium.ru/api/lepropanel/"+userid,
   dataType: "json",
   success: function(msg){  
	karmavote1 = msg.karmavote;
	status1 = msg.status;
	var tVal =$('#textarea1').val(); 
	$('#textarea1').val('INF: '+userid+', login:'+msg.login+', karma:'+msg.karma+', posts:'+msg.posts+
		', comm:'+msg.comments+', votehim:'+msg.karmavote+', voteme:'+msg.hiskarmavote+', status:'+msg.status+'\n'+tVal); 

if(( karmavote1 == '0' || karmavote1 == '1' ) && status1 == 'OK' ){
 $.ajax({
   type: "post",
   url: "http://leprosorium.ru/karma",
   data: "wtf="+wtf+"&u_id="+userid+"&value=1",
   dataType: "json",
   success: function(msg){  var tVal =$('#textarea1').val(); $('#textarea1').val('ADD: '+userid+' '+msg+'\n'+tVal); }
 });

 $.ajax({
   type: "post",
   url: "http://leprosorium.ru/karma",
   data: "wtf="+wtf+"&u_id="+userid+"&value=2",
   dataType: "json",
   success: function(msg){  var tVal =$('#textarea1').val(); $('#textarea1').val('ADD: '+userid+' '+msg+'\n'+tVal); }
	});
    }
  }
});

}


function postplusmutual(wtf,userid,plus){
karmavote2 = 2 ;
status2 ='OK';

 $.ajax({
   type: "get",
   url: "http://leprosorium.ru/api/lepropanel/"+userid,
   dataType: "json",
   success: function(msg){  
	karmavote2 = msg.karmavote;
	status2 = msg.status;
	var tVal =$('#textarea2').val(); 
	$('#textarea2').val('INF: '+eval(ij+2)+ ', ' +userid+', login:'+msg.login+', karma:'+msg.karma+', posts:'+msg.posts+
		', comm:'+msg.comments+', votehim:'+msg.karmavote+', voteme:'+msg.hiskarmavote+', status:'+msg.status+'\n'+tVal); 

	if(plus == '1'){
		var val1=1,val2=2;
		} else {
		var val1=3,val2=4;
	};
//alert('val1='+val1+ ' val2='+val2+' karmavote2='+karmavote2+' status2='+status2 );
if(( karmavote2 != '2') && status2 == 'OK' ){
 $.ajax({
   type: "post",
   url: "http://leprosorium.ru/karma",
   data: "wtf="+wtf+"&u_id="+userid+"&value="+val1,
   dataType: "json",
   success: function(msg){  var tVal =$('#textarea2').val(); $('#textarea2').val('ADD: '+userid+' '+msg+'\n'+tVal); }
 });

 $.ajax({
   type: "post",
   url: "http://leprosorium.ru/karma",
   data: "wtf="+wtf+"&u_id="+userid+"&value="+val2,
   dataType: "json",
   success: function(msg){  var tVal =$('#textarea2').val(); $('#textarea2').val('ADD: '+userid+' '+msg+'\n'+tVal); }
	});
    }
  }
});

}



   function appendcontrol() {
	var qwe1='<div style="position:absolute;width:260px;background-color:#eaeaea;border:1px #ddd solid;left:2px;text-align:left;font-size:0.8em;">Если вы видите это, то вы знаете толк в жизни. Но вот на всякий случай памятка. Перебирать профили можно по <i>возрастанию</i> и по <i>убыванию.</i> Значение поля <b>Конечный id</b> используется только для задания нижней границы диапазона, если вы используете рандомный метод. И да, еще раз: 1 секунда - это 1000 мс.</div> \
<div id="toolbar0" style="text-align:right;">Начальный id:<input type="text" id="startkarma" value=""><br> \
Конечный id:<input type="text" id="endkarma" value="" disabled="disabled" style="background-color:#eee"><br> \
Сколько профилей:<input type="text" id="howmuch" value="10" ><br> \
Задержка, мс:<input type="text" id="howlong" value="5000" ></div> \
<div class="toolbar"> \
<span id="toolbar1" class="ui-widget-header ui-corner-all"> \
	<button id="help">help</button> \
	<button id="play">play</button> \
	<button id="clearlog">clearlog</button> \
	<span id="repeat1">  \
<input type="radio" name="repeat1" value="1"	id="radio1"><label for="radio1">По возрастанию</label><input \
type="radio" name="repeat1" value="-1"	id="radio2" checked="checked"><label for="radio2">По убыванию</label><input \
type="radio" name="repeat1" value="rand"	id="radio3" disabled="disabled"><label for="radio3">Random</label></span> \
</span> \
</div><style> \
#toolbar0{padding:10px 0px; padding-top: 0px;}#toolbar0{margin-bottom:10px;}#toolbar1{padding:10px 4px;} \
#toolbar1{margin-bottom:10px;}#toolbar2{padding:10px 4px;} \
#toolbar2{margin-bottom:10px;line-height:41px;}#textarea1{margin-top:10px;}#textarea2{margin-top:10px;} .ui-widget{font-size: 0.8em;}</style> \
<textarea wrap="hard" readonly="yes" cols=120 rows=5 id="textarea1" style="font-size:9px">=== console log started. ===</textarea>';

	var qwe3='<div class="toolbar" style="text-align:center">Смещение:<input type="text" id="shift" value="0"><br> \
	<span id="toolbar2" class="ui-widget-header ui-corner-all" > \
	<button id="help1">help1</button> \
	<button id="play1">play1</button> \
	<button id="clearlog1">clearlog1</button> \
</span> \
</div> \
<textarea wrap="hard" readonly="yes" cols=120 rows=5 id="textarea2" style="font-size:9px">=== console log started. ===</textarea>'; 


	var qwe2 = '<div id="myid"  title="Лепрокармадроч v0.931"><div id="tabs"> \
	<ul> \
		<li><a href="#tabs-1">Кармадроч</a></li> \
		<li><a href="#tabs-2">Взаимный отсос</a></li> \
		<li><a href="#tabs-3">Список Шиндлера</a></li> \
		<li><a href="#tabs-4">Спаржа</a></li> \
	</ul> \
	<div id="tabs-1">' + qwe1 + '</div> \
	<div id="tabs-2"> \
		<p>Тут можно живенько-быренько присунуть в ответ только тем, кто потрогал карму профилю, где вы сейчас(и например ваш), без разбору плюсанули или минусанули. \
У вас ведь теперь скоро будет столько кармы, что обойти каждого вручную будет настоящей проблемой. А позабыть о ком-то, \
кто был добр с вами - очень неправильно. Глупый бот не оставит в стороне ни одного вашего кармадруга &mdash; будет здорово. \
Значение задержки межды запросами для вашего удобства берется из первой вкладки. Отсчет начинается с <b>конца</b>, то есть с самых недавних юзернеймов, \
что логично, ибо зачем начинать с тех, о ком уже позаботился когда-то давно. <i>(Смещение пропускает указанное количество юзернеймов <b>с конца</b>. \
Не совсем удобно все это, но мы работаем над этим.)</i></p><p>' + qwe3 + '</p> \
	</div> \
	<div id="tabs-3"> \
		<p>Список Шиндлера - небольшая утилита, позволяющая получить списки юзернеймов, кто потрогал карму профиля в котором вы сейчас находитесь.\
Это как никогда пригодится для составления списка адресатов для инбокса.</p> \
Очень спорная ситуация возникает с теми, кто вам поставил <i>одновременно</i> и плюс и минус. Вроде, должны идти к тем кто плюсанул. Ну и вот, кто плюсанул: \
<textarea wrap="hard" readonly="yes" id="usernames1" cols=120 style="font-size:9px" ></textarea>А это те, кто поставил минус. <textarea wrap="hard" readonly="yes" style="font-size:9px" cols=120 id="usernames2"></textarea> \
		<div style="text-align: center;" class="toolbar"><span class="ui-widget-header ui-corner-all"> \
			<button id="shin1">Получить</button> \
		</span></div> \
	</div> \
	<div id="tabs-4"> \
		<p>Этот раздел для непосвященных пока остается восхитительной тайной. Но если вы будете держать руку на пульсе, \
 то скоро вы узнаете о легендарной спарже и о том, как ею воспользоваться в недокументированных целях.</p> \
<p>Между тем, у нас хорошие новости для вас: еще два новых аддона к этому мощному скрипту. Первый - <i>Юзернейм аггрегатор</i>, собирает юзернеймы в одну строчку \
через запятую в одно удобное окошко под жепками. Эту строчку потом очень удобно скармливать второму нашему боту - <i>Лепроспамботу</i>. Этот не менее мощный скрипт преднезначен для массовой индивидумальной рассылки инбоксов. Иногда это очень важно написать кучу одинаковых инбоксиков разным людям так, чтобы они не знали ничего о других.</p> \
<p>Итак, <a href="http://userscripts.org/scripts/show/97117">Лепроспамбот: легкий как перышко.</a> и <a href="http://userscripts.org/scripts/show/97086">Юзернейм аггрегатор, дешевый и сердитый.</a></p> \
	</div> \
</div></div>';	
	var divTag = document.createElement("div");
	divTag.innerHTML = qwe2;
	document.body.appendChild(divTag);

	var bodyHtml = document.body.innerHTML;
	wtf = Match(bodyHtml, /VoteBlockUser.wtf = "([0-9a-z]+)"/);
	myid= Match(bodyHtml, /button:this, id:([0-9]+)/);
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
		$( "#repeat1" ).buttonset();
		$( "#shin1" ).button() .click(getkarmausers);




		$( "#play1" ).button({text: false,icons: {primary: "ui-icon-play"}})
		.click(function() {
			var options;
			if ( $( this ).text() == "play1" ) {
				go2=0;
				options = {label: "stop1",icons: {primary: "ui-icon-stop"}
				};
			} else {
				go2=1;
				options = {label: "play1",icons: {primary: "ui-icon-play"}
				};
			}
			$( "#play1" ).button( "option", options );
		});


		$( "#clearlog1" ).button({text: false,	icons: {primary: "ui-icon-trash"}});
		$( "#help1"	).button({text: false,	icons: {primary: "ui-icon-help"	}});

    }

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {

            var GM_Head2 = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ2 = document.createElement('link');
            GM_JQ2.href= 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/jquery-ui.css';
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
		ii=0;
		incr = parseInt($("#repeat1 input[type='radio']:checked")[0].value);
		startkarma = parseInt($('#startkarma').val());
		howmuch = parseInt($('#howmuch').val());
		howlong =parseInt($('#howlong').val());
			if( startkarma.length < 1){
				alert(howlong+ ' Startkarma is wrong.');
				return(false);};
			if( howlong < 1001){
				alert(howlong+ ' milliseconds is too small, set more.');
				return(false);};
			if( wtf.length < 30){
				alert('Check wtf value. Are you logged in?');
				return(false);};

	var tVal = $('#textarea1').val(); 	
	$('#textarea1').val('=== karmadroch started. === \n'+tVal);	
	interval1 = setInterval(function() {
	postplus(wtf,ii + startkarma);	
	if (Math.abs(ii) == howmuch) $( "#play" ).click();
	ii+=incr;
	}, howlong); 	
	return(false);}

function gso2() {	
	var tVal = $('#textarea1').val();	
	$('#textarea1').val('=== karmadroch stopped. === \n'+tVal);	
	clearInterval(interval1); 
	return(false); }

function gso3() {	
	$('#textarea1').val('=== clear === \n');	
	return(false); }

function gso4() {	
	window.open('http://userscripts.org/scripts/show/94408'); 
	self.focus();
	return(false); }


function gso51() {	
	var tVal = $('#textarea2').val();	
	$('#textarea2').val('=== Mutual petting stopped. === \n'+tVal);	
	clearInterval(interval2); 
	return(false); }


function gso6() {	
	$('#textarea2').val('=== clear === \n');	
	return(false); }

function gso52() {	
	var tVal = $('#textarea2').val(); 	
	$('#textarea2').val('=== Mutual petting started. === \n'+tVal);	

		howlong = parseInt($('#howlong').val());
		shift = parseInt($('#shift').val());
		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://leprosorium.ru/karmactl",
			data: "view="+myid,
			dataType: "json",
			success: function(msg){
				karmajson = msg;
			tVal = $('#textarea2').val(); 	
			$('#textarea2').val('=== Karmalist download ok. === \n'+tVal);	
			}
		});
		$.ajaxSetup({async:true});
	var jsonlength = karmajson.votes.length;
	ij=jsonlength;
			tVal = $('#textarea2').val(); 	
			$('#textarea2').val('=== Total usernames in this %username% karma: ' + ij + ' === \n'+tVal);	

	ij--; ij=ij-shift;
	interval2 = setInterval(function() {


postplusmutual(wtf,karmajson.votes[ij].uid,1);
//	if (whoplus){
//		if (karmajson.votes[ij].attitude == 1 || karmajson.votes[ij].attitude == 2 ) 
//				postplusmutual(wtf,karmajson.votes[ij].uid,doplus);
//				alert(karmajson.votes[ij].uid+' '+doplus);
//		} else {
//			if (karmajson.votes[ij].attitude == -1 || karmajson.votes[ij].attitude == -2 ) 
//				postplusmutual(wtf,karmajson.votes[ij].uid,doplus);
//				alert(karmajson.votes[ij].uid+' '+doplus);
//			};


	if (0 == ij--) $( "#play1" ).click();
	}, howlong); 	
	return(false);}


// All your GM code must be inside this function
    function letsJQuery() {
		appendcontrol();
		var submit1 = document.getElementById('play');
		var submit3 = document.getElementById('clearlog');
		var submit4 = document.getElementById('help');
		submit1.addEventListener('click',function (e) {
			if(go1==1) gso2(); else gso1() ;},true);
		submit3.addEventListener('click',function (e) {gso3();},true);
		submit4.addEventListener('click',function (e) {gso4();},true);


		var submit5 = document.getElementById('play1');
		var submit6 = document.getElementById('clearlog1');
		var submit7 = document.getElementById('help1');
		submit5.addEventListener('click',function (e) {
			if(go2==1) gso51(); else gso52();},true);
		submit6.addEventListener('click',function (e) {gso6();},true);
		submit7.addEventListener('click',function (e) {gso4();},true);


    }