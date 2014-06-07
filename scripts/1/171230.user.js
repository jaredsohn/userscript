// ==UserScript==
// @name leprokarmasliv
// @description Sliv for leprosorium.ru
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

function postminus(wtf,userid){
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
   data: "wtf="+wtf+"&u_id="+userid+"&value=3",
   dataType: "json",
   success: function(msg){  var tVal =$('#textarea1').val(); $('#textarea1').val('ADD: '+userid+' '+msg+'\n'+tVal); }
 });

 $.ajax({
   type: "post",
   url: "http://leprosorium.ru/karma",
   data: "wtf="+wtf+"&u_id="+userid+"&value=4",
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
	var qwe1='<div style="text-align:left;font-size:0.8em;">Список</div><br/> \
	<textarea wrap="hard" cols=120 rows=5 id="downvotelist" style="font-size:9px">45598</textarea> \
<div class="toolbar"> \
<span id="toolbar1" class="ui-widget-header ui-corner-all"> \
	<button id="help">help</button> \
	<button id="play">play</button> \
	<button id="clearlog">clearlog</button> \
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


	var qwe2 = '<div id="myid"  title="Слив">' + qwe1 + '</div>';	
	var divTag = document.createElement("div");
	divTag.innerHTML = qwe2;
	document.body.appendChild(divTag);

	var bodyHtml = document.body.innerHTML;
	wtf = Match(bodyHtml, /VoteBlockUser.wtf = "([0-9a-z]+)"/);
	myid= Match(bodyHtml, /button:this, id:([0-9]+)/);
	$( "#myid" ).dialog({ minWidth: 570, minHeight: 350 });

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
		howlong =3000;
			if( wtf.length < 30){
				alert('Check wtf value. Are you logged in?');
				return(false);};

	var tVal = $('#textarea1').val(); 	

	$('#textarea1').val('=== sliv started. === \n'+tVal);	
    var lines = $('#downvotelist').val().split(/\n/);
    var ids = [];
    for (var i=0; i < lines.length; i++) {
      // only push this line if it contains a non whitespace character.
      if (/\S/.test(lines[i])) {
        ids.push($.trim(lines[i]));
      }
    }
	interval1 = setInterval(function() {
	postminus(wtf,ids[ii]);	
	if (Math.abs(ii) == ids.length-1) $( "#play" ).click();
	ii+=1;
	}, howlong); 	
	return(false);}

function gso2() {	
	var tVal = $('#textarea1').val();	
	$('#textarea1').val('=== sliv stopped. === \n'+tVal);	
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

    }