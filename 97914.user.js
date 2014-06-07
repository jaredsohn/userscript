// karmalease addon for leprosorium.ru
// version 0.11
// Copyright (c) 2011-2013, Be3HOrNM
// Released under the GPL license
// main script here http://userscripts.org/scripts/show/94408
// --------------------------------------------------------------------
// #48684
// ==UserScript==
// @name           Karmalease
// @namespace      karmalease
// @description    Karmalease for leprosorium.ru
// @include        http://*leprosorium.ru/my/inbox/*
// @include        http://*leprosorium.ru/comments/*
// ==/UserScript==
// Add jQuery
var go2=0, interval1, karmalist, ii, howmuch;


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
	$('#textarea1').val( ii + ' INF: '+userid+', login:'+msg.login+', karma:'+msg.karma+', posts:'+msg.posts+
		', comm:'+msg.comments+', votehim:'+msg.karmavote+', voteme:'+msg.hiskarmavote+', status:'+msg.status+'\n'+tVal); 

if(( karmavote1 == '0' || karmavote1 == '1' ) && status1 == 'OK' ){
 $.ajax({
   type: "post",
   url: "http://leprosorium.ru/karma",
   data: "wtf="+wtf+"&u_id="+userid+"&value=1",
   dataType: "json",
   success: function(msg){  var tVal =$('#textarea1').val(); $('#textarea1').val( ii + ' ADD: '+userid+' '+msg+'\n'+tVal); }
 });

 $.ajax({
   type: "post",
   url: "http://leprosorium.ru/karma",
   data: "wtf="+wtf+"&u_id="+userid+"&value=2",
   dataType: "json",
   success: function(msg){  var tVal =$('#textarea1').val(); $('#textarea1').val( ii + ' ADD: '+userid+' '+msg+'\n'+tVal); }
	});
    }
  }
});

}



function sort_users(a,b){
		return (a.username < b.username) ? -1 : 1;
}

function unique_users(arr) {  
     var ret = [arr[0]];  
     for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate  
         if (arr[i-1].username !== arr[i].username) {  
             ret.push(arr[i]);  
         }  
     }  
     return ret;  
 }  


function Match(text, pattern){
	var m = text.match(pattern);
	if (m == null) 
		return null;
	return m[1];
}

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

xpathOneEx = function(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
xpathOne = function(query) {
    return xpathOneEx(query, document);
}
xpathMany = function(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

addButton1 = function(title, onClick) {
	var elButton = document.createElement('div');
	var elButton1 = document.createElement('div');
	elButton.setAttribute('style','margin:20px;');
	elButton.innerHTML = "<button id='opener'>" + title + "</button>";
	elButton.childNodes[0].addEventListener("click", onClick, false);
	panel = xpathOne('//*[@id="tags_add"]')
	panel.appendChild(elButton);
	elButton1.innerHTML = '<div class="demo"> \
<div id="dialog" title="Кармализ v0.11"> \
<div id="tabs"> \
	<ul> \
		<li><a href="#tabs-1">Кармализ</a></li> \
		<li><a href="#tabs-2">Спаржа</a></li> \
	</ul> \
	<div id="tabs-1"> \
<p>C помощью этого скрипта можно разом присунуть плюсики в карму всем, кто отписался в посте или инбоксе, где вы сейчас. \
Это наиболее эффективный способ надрочить карму, и вычислить таких людей, как вы просто невозможно. \
Ведь вы выбираете юзернеймов, которые пишут в постах - они живые, активные, \
быстро отреагируют на ваши плюсы. Не то, что в том скрипте, Кармадроче, который ходит по дохлым профилям. \
Мы назвали этот метод - кармализ. Лизни мне карму, %username%!</p> \
<div class="toolbar" style="text-align:center">Задержка, мс:<input type="text" id="shift" value="5000"><br> \
	<span id="toolbar2" class="ui-widget-header ui-corner-all" > \
	<button id="help1">help1</button> \
	<button id="play1">play1</button> \
	<button id="clearlog1">clearlog1</button> \
</span> \
</div> \
<textarea wrap="hard" readonly="yes" cols=120 rows=5 id="textarea1" style="font-size:9px">=== console log started. ===</textarea> \
	</div> \
	<div id="tabs-2"> \
		<p>Ну и мы подобрались к самому сладкому. Этот скрипт - логическое продолжение цикла ботов, направленных своими острями на лепру. \
Вы заходите в пост или инбокс и плюсуете карму всем, кто отписался в посте. Если скрипт кармадроч можно было сравнить \
с анальным совокуплением, то этот скрипт - всего лишь ласки языком. Дотронься нежно до кармы каждого, пощекочи её ласково. \
Лизни каждого юзернейма в посте. (Правда пока эта шляпа для инбоксов не работает - перекрываются имена функций с лепроспамботом)</p> \
<p>Ну а теперь о планах: доделать скрипт для работы в инбоксах, и прикрутить к каждому камменту пимпочку плюсануть/минусануть \
карму, по аналогии с плюс/минус рейтинг. Будет круто, следите за обновлениями.</p> \
		<p>Ads: <a href="http://userscripts.org/scripts/show/94408">Поставь скрипт лепрокармадроч!</a></p> \
		<p>Ads: <a href="http://userscripts.org/scripts/show/97117">Лепроспамбот, легкий как перышко. </a></p> \
		<p>Ads: <a href="http://userscripts.org/scripts/show/97086">Юзернейм аггрегатор, дешевый и сердитый. </a></p> \
	</div> \
</div> \
</div><style> \
#toolbar0{padding:10px 0px; padding-top: 0px;}#toolbar0{margin-bottom:10px;}#toolbar1{padding:10px 4px;} \
#toolbar1{margin-bottom:10px;}#toolbar2{padding:10px 4px;} \
#toolbar2{margin-bottom:10px;line-height:41px;}#textarea1{margin-top:10px;}#textarea2{margin-top:10px;} .ui-widget{font-size: 0.8em;}</style>';
	panel.appendChild(elButton1);
}

sortComments1 = function() {

	var tVal, id1, username1,karmajson;
	var comments = xpathMany("//div[@id='js-commentsHolder']/div[contains(@class,'post')]");
	var a = Array();
	var b = Array();
	for (var i = 0; i <= comments.snapshotLength; i++) {
		var elm = comments.snapshotItem(i);
		username1 = $("div.post div.dd div.p")[i].getElementsByTagName("a")[1].attributes["href"].value.replace("\/users\/", ''); //		username1 = xpathOneEx("div//div[@class='p']/a", elm).innerHTML;
		id1 = parseInt($("div.dd div.p a.u")[i].attributes["onclick"].value.match(/u(\d+)/)[1]); //		id1 = xpathOneEx("div//div[@class='p']/a", elm).getAttribute("usernum");
		a[i] = {'username': username1, 'id': id1};
	};

	a=a.sort(sort_users);
	a=unique_users(a);
  	for (i = 0; i < a.length; i++) {
//		$('#usernames1').val($('#usernames1').val() + a[i].username + ', ');
	};

  	for (i = 0; i < a.length; i++) {
//		$('#usernames1').val($('#usernames1').val() + a[i].id + ', ');
	};
	karmalist=a;
		howmuch = karmalist.length;
		var tVal = $('#textarea1').val();	
		$('#textarea1').val('Usernames in this post: '+ howmuch +'. \n'+tVal);	
	return false;

}

function gso1() {	
	var tVal = $('#textarea1').val(); 	
	$('#textarea1').val('=== Karmalease started. === \n'+tVal);	

	tVal = $('#textarea1').val();	
	$('#textarea1').val('Taking your wtf.. \n'+tVal);	


	if(document.getElementById('greetings')!=null){
		var block = document.getElementById('greetings').innerHTML;
		var username_ = block.match(/<a href="(http:\/\/.*?)\/users\/(.*)">(.*)<\/a>(.*)/i)[3];
	};
		$.ajaxSetup({async:false});
		 $.ajax({
			type: "get",
			url: "http://leprosorium.ru/users/"+username_,
			dataType: "html",
			success: function(html){ 
				wtf = Match(html, /VoteBlockUser.wtf = "([0-9a-z]+)"/);
				}
		});
		$.ajaxSetup({async:true});

	tVal = $('#textarea1').val();	
	$('#textarea1').val('Seems to be OK. \n'+tVal);	

		var howlong = parseInt($('#shift').val());
			if( howlong < 1001){
				alert(howlong+ ' milliseconds is too small, set more.');
				return(false);};

		howmuch = karmalist.length;
	ii=0;
	interval1 = setInterval(function() {
		postplus(wtf, karmalist[ii].id);
		if (ii++ == howmuch-1)
			$( "#play1" ).click();
	}, howlong); 	

	return(false);}


function gso2() {	
	var tVal = $('#textarea1').val();	
	$('#textarea1').val('=== Karmalease stopped. === \n'+tVal);	
	clearInterval(interval1); 
	return(false); }

function gso3() {	
	$('#textarea1').val('=== clear === \n');	
	return(false); }

function gso4() {	
	window.open('http://userscripts.org/scripts/show/97914'); 
	self.focus();
	return(false); }

function Match(text, pattern){
	var m = text.match(pattern);
	if (m == null) 
		return null;
	return m[1];
}

function letsJQuery() {

	addButton1('Кармализ', sortComments1);
	$( "#dialog" ).dialog({ autoOpen: false,minWidth: 570, minHeight: 350 });
	$( "#tabs" ).tabs();
	$( "#opener" ).button()
		.click(function() {
			$( "#dialog" ).dialog( "open" );
			return false;});
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

		var submit5 = document.getElementById('play1');
		var submit6 = document.getElementById('clearlog1');
		var submit7 = document.getElementById('help1');
		submit5.addEventListener('click',function (e) {
			if(go2==1) gso2(); else gso1();},true);
		submit6.addEventListener('click',function (e) {gso3();},true);
		submit7.addEventListener('click',function (e) {gso4();},true);

}