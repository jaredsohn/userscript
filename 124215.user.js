// ==UserScript==
// @name			besøkerscript
// @namespace		Skybyen
// @include			*skybyen.no*
// @require			http://code.jquery.com/jquery-1.3.2.min.js
// @version        2.0.5
// ==/UserScript==

var SUC_script_num = 120143, version = '2.0.4'; 

try{function updateCheck(forced){
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0'))             + 86400000       <= (new Date().getTime()))){
			try{
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp){
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1){
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version){
								if(confirm('Det finnes en oppdatering til "'+script_name+'."\nVil du gå til installasjons siden nå?')){
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('Ingen oppdatering til "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err){
				if (forced)
					alert('En feil oppstod under sjek av oppdatering:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}
	

$(document).ready(function(){
	
var hasSearched = false;

function doSearch(){
	hasSearched = true;
	delete counts;
	counts = 2;
	console.log('counts: ' + counts);
	$("#search-results").html("<div style='text-align: center;'><img src='http://skybyen.no/images/ajaxSpinner.gif' /></div>");
	var pos = 1;
	
	$.ajax({
		type: "POST",
		url: "/search/search/doSearch",
		
		data: "online=" + $("#online").val() + "&ageFrom=" + $("#ageFrom").val() + "&ageTo=" + $("#ageTo").val() + "&username=" + $("#username").val() + "&gender=" + $("#gender").val() + "&city=" + $("#city").val() + "&county=" + $("#county").val() + "&status=" + $("#status").val() + "&orientation=" + $("#orientation").val() + "&seeking=" + $("#seeking").val() + "&seeking=" + $("#seeking").val() + "&pos=" + pos,

		success: function(msg) {
			$("#search-results").html(msg);
			startbyll();
		}
	});
}
	
var counts = 2;

function last_msg_funtion(){
var ID=$(".searchRow-1048742:last").attr("id");

	if( ID == counts && ID < 10)
	{
		counts++;
		$('div#last_msg_loader').html('<img src="http://skybyen.no/images/ajaxSpinner.gif">');
		$.ajax({
			type: "POST",
			url: "/search/search/doSearch",
	
			data: "online=" + $("#online").val() + "&ageFrom=" + $("#ageFrom").val() + "&ageTo=" + $("#ageTo").val() + "&username=" + $("#username").val() + "&gender=" + $("#gender").val() + "&city=" + $("#city").val() + "&county=" + $("#county").val() + "&status=" + $("#status").val() + "&orientation=" + $("#orientation").val() + "&seeking=" + $("#seeking").val() + "&seeking=" + $("#seeking").val() + "&pos=" + ID,
	
			success: function(msg)
			{
				if (msg != "")
				{
					$(".searchRow-1048742:last").after(msg);
				}
				$('div#last_msg_loader').empty();			
			}
		});
	}
};

function sendKissTo(userId){
	$.ajax({
		type: "POST",
		url: "/flirttools/kisses/insertNew/" + userId
	});
}

function sendMsg(userId){
	$.ajax({
		type: "POST",
		url: "/messages/newmsg/insertnew/"+userId+"",
		data: "message=" + $("#BYLLpm").val() + "&sendNotif=false"
	});
}
function maksprofiler(antall){
	var stand = 720;
	if(isNaN(antall)){
		return	stand;
	}
	else if(antall > 720 || antall < 1){
		return	stand;
	}
	else {
		return antall;
	}
}


var form = '<form style="width:98.3% !important; margin-top:10px; margin-bottom:5px; color:#000; font-size:14px; float:left"><span style="color:#00ff00; font-weight:bold; font-size:16px;">Skybyll:</span><br/>Besøk maks <input type="text" id="BYLLantall" name="BYLLantall" style="width:20px;" /> profiler. (Høyeste sum er 720. Ikke tall eller blank = 720)<br/><input style="width:20px; margin-top:8px; padding-top:5px;" type="checkbox" id="BYLLkyss" name="BYLLkyss"> Kryss av om du vil at skybyll skal gi kyss! <br /><input style="width:20px; margin-top:8px; padding-top:5px;" type="checkbox" id="BYLLmelding" name="BYLLmelding" value="ok"> Kryss av om du vil at skybyll skal gi en privat melding fra deg. <br /><br/><div id="BYLLmeldingDIV" style="display:none;"><textarea id="BYLLpm" name="BYLLpn" style="height:200px; width:98.3% !important;">Din tekst her!</textarea></div></form>';	
var byllknapp = ''+form+'<a id="startbyll" style="height: 22px; line-height: 22px; margin-top:10px; width:95.5% !important;" href="javascript:void(0);" class="btn primary">Byll</a><br/><div style="width:100%; text-align:center; margin-top:5px;">Byllescript fra <a href="">Biroman</a><br/> <iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fskybyll&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=276039659086971" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:150px; height:21px;" allowTransparency="true"></iframe></div>';	
var infoongo ='<div id="bylleinfo" style="width:100%; text-align:center;"><span id="byllstat"></span>Skybyll besøker nå <span id="byllnavn"></span>, og har besøkt <span id="byllantall"></span> profiler. <span id="byllferdig"></span></div>';	
var brukernavn = $('.udii-welcome').text();
brukernavn = $.trim(brukernavn);
		
$(byllknapp).insertAfter($('#scm-right'));

var sendmelding = 0, sendkyss = 0, besokdelay = 200;

$('#BYLLmelding').click(function() {	
	$("#BYLLmeldingDIV").toggle("slow");
	if($('#BYLLmelding').is(':checked')){
		sendmelding = 1;
		besokdelay = 500;
	}
	else {sendmelding = 0; besokdelay = 500}
});
$('#BYLLkyss').click(function() {
	if($('#BYLLkyss').is(':checked')){
		sendkyss = 1;
		if (sendmelding == 0){
			besokdelay = 400;
		}
	}
	else {sendkyss = 0; besokdelay = 200;}
});


var byllkjort = 0, Antoppstart = 0, teller = 0, setmaksprofiler;	
	
$('#startbyll').click(function() {
	if (byllkjort === 1) {
		$("#byllferdig").html('');
	}
	else {
		$(infoongo).insertBefore($('#search-results'));
		byllkjort = 1;	
	}
	
	var maksp = $('#BYLLantall').val();
	setmaksprofiler = maksprofiler(maksp);
	
	$('#byllstat').html('<iframe src="http://skybyll.mikromann.no/byll.php?byll=ok&u='+brukernavn+'&ver='+version+'&kyss='+sendkyss+'&melding='+sendmelding+'&antall='+setmaksprofiler+'" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:1px; height:1px;" allowTransparency="true"></iframe>');
	
	doSearch();
});

		
function startbyll() {
	var nysok = 78, xantallny = 2, i = 0, timer = setInterval(visit, besokdelay);
	
	function bylldone(){
		$("#byllnavn").html('');
		$("#byllferdig").html('<br/>Ferdig med bylling! Velg nye søkekriterier og klikk på byll igjen for ny byllerunde.').css('color', '#FF0000');
		Antoppstart = Antoppstart + i - 1;
		clearInterval(timer);
		}
	
	function visit() {
		if(i == nysok){
			
			last_msg_funtion();
			nysok = 80*xantallny-2;
			xantallny++;
			
		}
		if(i < setmaksprofiler){
			
			var profile = $('div[class^="user-Large-thumb-info"]').eq(i++);
			var profilnavn = $('a:first', profile).text();
			
			if(profilnavn == ''){bylldone();}
			else {
				$.get($('a:first', profile).attr('href'));		
				$(profile).css('background-color', '#c0c0c0');
				teller = Antoppstart+i;
				
				var profilid = $('a:first', profile).attr('href').replace('/', '');
				
				if(sendkyss === 1){sendKissTo(profilid);}
				if(sendmelding === 1){sendMsg(profilid);}
				
				$("#byllnavn").html(profilnavn).css('color', '#FF0000');
				$("#byllantall").html(teller).css('color', '#FF0000');
			}
		}
		else {
			bylldone();
		}
	}
}

//Slett post
var LinkSlett = '<li><a id="ByllSlettAlle" href="javascript:void(0);">Slett Alle</a></li>', LinkLes = '<li><a id="ByllLesAlle" href="javascript:void(0);">Les Alle</a></li>', teller, tellerx = 0;
	
$(LinkSlett).insertAfter($('ul.submenu li:last-child'));
$(LinkLes).insertAfter($('ul.submenu li:last-child'));

$('#ByllSlettAlle').click(function() {
	var SkalSlette = confirm("Vil du slette alle postene? Det er ingen vei tilbake!");
    if (SkalSlette){
       SlettAllePoster();
    }
});
$('#ByllLesAlle').click(function() {	
	var settlest = confirm("Merk alle som lest?");
    if (settlest){
       MerkLestAllePoster();
	}
});
function MerkLestAllePoster(){	
	var looper = setInterval(leserpm, 10);

	function leserpm(){
		var pm = $('div[id^="setRead"]').eq(teller++);
		var pmid = $(pm).attr('id').replace('setRead', '');
		setAsRead(pmid);
	}
}
function SlettAllePoster(){	
	var looperx = setInterval(slettpm, 10);
		
	function slettpm(){
		var pmx = $('div[id^="delConv"]').eq(tellerx++);
		var pmidx = $(pmx).attr('id').replace('delConv', '');

		deleteCovnersation(pmidx);
	}
}
function setAsRead(msgId){
	$("#setRead"+msgId).html("<img src='http://skybyen.no/images/ajaxSpinner.gif' />");
	$.ajax({
	  type: "POST",
	  url: "/messages/actions/setAsRead/" + msgId,
	  success: function(msg) {
		  $("#setRead"+msgId).html(msg);
		  $("#msgNewIcn" + msgId).text('');
		  newPendingMsgsAjx();
	  }
	});

}
function deleteCovnersation(conversationId){
  $("#delConv"+conversationId).html("<img src='http://skybyen.no/images/ajaxSpinner.gif' />");
  $.ajax({
      type: "POST",
      url: "/messages/actions/deleteMsg/" + conversationId,
      success: function(msg) {
          $("#delConv"+conversationId).html(msg);
      }
  });

}
function newPendingMsgsAjx(){
	$.ajax({
	 type: "POST",
	 url: "/messages/actions/pendingAjax",
	 success: function(result) {
		 if(result)
		 {
		 	$("#ud-item-inbox").html('<a href="/messages" class="btn secondary">Innboks<span class="ud-item-notification ud-item-notification-single">' + result +'</span></a>');
			if(result == 1)
			{
				$("title").text('Skybyen.no | ' + result + ' ny melding');
			}
			else
			{
				$("title").text('Skybyen.no | ' + result + ' nye meldinger');
			}
		 }
		 if(!result)
		 {
		 	$("#ud-item-inbox").html('<a href="/messages" class="btn">Innboks</a>');
		 	$("title").text(defaultPageTitle);
		 }
	 }
	});
}
//Skybyll fiks
$('#lolpics-site-top').css('display','none');
$('#advert-top').css('display','none');
$('.advert-side').css('display','none');


var menulink = '<li ><a href="http://skybyll.mikromann.no"> <span class="menu-last-item">Skybyll</span></a></li>';
$(menulink).insertAfter($('#main-menu ul li:last-child'));


//shoutbox
var getbox = '<iframe height="800px" width="177px" src="http://skybyll.mikromann.no/chat.php?u='+brukernavn+'" scrolling="no" frameborder="0" border:none; overflow:hidden; width:185px; height:800px;" allowTransparency="true"></iframe>';

$(getbox).insertAfter($('#sb-avatar'));

});