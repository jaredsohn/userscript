// ==UserScript==
// @name           kaskusBetaQuickReply_SO
// @namespace      kaskusBetaQuickReply_SO
// @version        1.1.2
// @description    quick reply for kaskus beta
// @include        http://livebeta.kaskus.co.id/thread/*
// @include        http://livebeta.kaskus.co.id/post/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://kkcdn-static.kaskus.co.id/css_v0.1/js/editor/jquery.markitup.js
// @require        http://kkcdn-static.kaskus.co.id/css_v0.1/js/editor/kaskus_bbcode.js
// @require        http://kkcdn-static.kaskus.co.id/css_v0.1/js/jquery.cookie.js

// @author         Adamantoi
// @co-author      sandi_okta (Kaskus UID:241759)
// ==/UserScript==
//
// still messy code, will update regularly ^_^!
// Changelog:
// V 1.1.1
// Add SMILIES
// Update Cheker for New Version
//
// V 1.1.0
// Multi Quote for Firefox, Opera, Chrome
// Ctrl - Q for Quick Multi Quote
// Fix captcha in Opera
//
// V 1.0.3
// Markitup bbcode (by: sandi_okta)
// QR reposition
//
// V 1.0.2.1 (15-March-2012)
// Bug Fix (ctrl+q, quote)
//
// V 1.0.2 (14-March-2012)
// Quick Quote (only text) (by: sandi_okta)
//
// V 1.0.1
// - Show capcay by clicking real capcay

// */



$(document).ready(function()    {
	//################ attach recapcay script ##########################
	var myscript2= document.createElement('script');
	myscript2.setAttribute('src','http://www.google.com/recaptcha/api/js/recaptcha_ajax.js');
	document.body.appendChild(myscript2);

	//################### Init Setup ################################

	var jimat = document.getElementById('securitytoken').value;
	var postURL = $('a.new-reply').attr('href');
	var target = document.getElementById("thread-footer");
	//var target = document.getElementsByTagName("new-reply");
	var qr = document.createElement("div");


	qr.innerHTML=
		'<form method="post" name="postreply" action="'+postURL+'">	'+
		'<input type="hidden" value="'+jimat+'" name="securitytoken">			'+
			'<fieldset id="pilset"> '+

//-               '<div id=frame_qrs>'+
			'<table id="meja-qr"><tr>'+
			'<td width="60%">'+
				'<div class="reply-messsage" id="pesan">'+
					'<div class="message">'+

					//############### reply text area ###################
					'<textarea id="reply-messsage" rows="250" name="message" style="width:500px!important" class="markItUpEditor"></textarea>'+

					'</div>'+
					'</div>'+
				'</div>'+
			'</td>'+
					//########## insert capcay ############
			'<td width="50%">'+
				'<div class="capcay_div">'+
					'<fieldset class="fieldset">'+
						'<div dir="ltr">'+
							'<div style="" id="recaptcha_widget_div" class="recaptcha_nothad_incorrect_sol recaptcha_isnot_showing_audio"> '+

								//##### gbr capcay asli ###############
								'<div id="div_gbrCapcay"><img id="gbrCapcay" src="http://kkcdn-static.kaskus.co.id/images/477924_20120312043814.jpg"></div>'+
								//########### capcay no script ########
								'<noscript><iframe src="http://api.recaptcha.net/noscript?k=6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d" height="300" width="400" frameborder="0"></iframe>'+
							   '<br />'+
							   '<textarea name="recaptcha_challenge_field" rows="3" cols="40">'+
							   '</textarea>'+
							   '<input type="hidden" name="recaptcha_response_field" value="manual_challenge" />'+
							   '</noscript>'+
							'</div>'+
					 	'</div>'+
					  	//########## tombol submit ############
					  	'<input type="submit" accesskey="s" value="Post Quick Reply" name="sbutton" class="button medium" style="float:right">'+
					  	//############ tips ###########
					  	'<div class=pesan><span id=spMQ></span><br/><p>Tips:</p><p>*Gunakan CTRL+Q untuk akses quick reply secara cepat</p><p>*Jika muncul gambar capcay, klik saja</p><p>*Setelah ketik postingan, tekan TAB biar langsung isi capcay, setelah isi capcay tekan enter</p><p>Versi 1.1.1 SO</p></div>'+
				//################ end capcay ##########################
					'</fieldset>'+
				'</div>'+
			'</td></tr>'+
			'<tr><td colspan="2"><span class=pesan>Smilies:</span> <div id=emotList></div></td></tr>'+
			'<tr><td colspan="2">'+
			'  <hr style="border:1px solid #cccccc;"><div id=loadEmot></div></td></tr>'+
			'</table>'+
//-					'</div>'+
			'<a href=# id=aQR name=aQR> </a>'
		'</form></div>';

	//########## Masukin QR ################
	$("#content-wrapper").append(qr);

	//################ CSS ##################
	GM_addStyle(".emotcss{cursor:pointer;font-size:11px;font-family: Verdana;} #pilset{background-color:#EEEEEE;border:1px solid #cccccc;} #frame_qr{border:1px solid #cccccc;} #recaptcha_table,#recaptcha_area{width:310px!important;margin-left:28px;margin-bottom:10px} #meja-qr tr td,#meja-qr tr{border:0 none!important;} #recaptcha_image{padding:0px 0px!important;} .pesan{font-size:10px; padding-top:10px; clear:both;} #gbrCapcay{cursor:pointer; border:3px solid rgb(135,5,0)} .capcay_div{padding-left:5px;padding-right:5px; padding-top:75px;}");

	//############### CTRL+Q ################
	var isCtrl = false;
	$(document).keyup(function (e) {
	if(e.which == 17) isCtrl=false;
	}).keydown(function (e) {
		if(e.which == 17) isCtrl=true;
		if(e.which == 81 && isCtrl == true)
		{
			eventQR();
			document.getElementById('reply-messsage').focus();
		return false;
		}
	});

	//############ real capcay klik ################
	$("#gbrCapcay").click(function(){
		setTimeout(function(){if(window.opera != undefined) {var unsafeWindowS=window;}else{var unsafeWindowS=unsafeWindow;} Recaptcha = unsafeWindowS.Recaptcha; Recaptcha.create("6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d","recaptcha_widget_div",{theme:"red"})},100);
	});
	//######### Show capcay if not lemot ###########
	setTimeout(function(){if(window.opera != undefined) {var unsafeWindowS=window;}else{var unsafeWindowS=unsafeWindow;} Recaptcha = unsafeWindowS.Recaptcha; Recaptcha.create("6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d","recaptcha_widget_div",{theme:"red"})},5000);

	//############# Add Quick Reply Button ###############################
	var btnQR = document.createElement("a");
	var btnMQR = document.createElement("a");
	var linkText = document.createTextNode("QQ");
	var linkText2 = document.createTextNode("Multi QQ");
	btnQR.setAttribute('class','button_qr button');
	btnQR.setAttribute('id','btnQR');
	btnQR.appendChild(linkText);
	btnMQR.setAttribute('class','button_qr button');
	btnMQR.appendChild(linkText2);

	for(var i=0;i<document.getElementsByTagName('*').length;i++){
		if(document.getElementsByTagName('*')[i].className == 'entry-footer'){
			btnQRClone = btnQR.cloneNode(true);
			//btnMQRClone = btnMQR.cloneNode(true);
			AddEventJumpToQR(btnQRClone);
			//AddEventCollect(btnMQRClone);
			//document.getElementsByTagName('*')[i].appendChild(btnMQRClone);
			document.getElementsByTagName('*')[i].appendChild(btnQRClone);
		}
	}

//-	onclick="insertAtCursor(document.getElementById(\'reply-messsage\'),\'Test text\')"

	function AddEventJumpToQR(el){
		el.addEventListener("click",function(){
			window.location.hash="aQR";
			var postParent = $(this).parents().eq(2); //get post-entry div
			var postId = postParent.attr("id");
			var userName = postParent.find(".fn").text();
			userName = userName.replace("[$]","");
			var entryContent = postParent.find(".entry-content").clone();
			entryContent.find(".post-quote").empty();
			entryContent.find(".edited").empty();
			entryContent.find("h1").empty();
			postId = postId.replace("post",";");
			var quote = "[QUOTE="+userName+postId+"]"+$.trim(entryContent.text())+"[/QUOTE]\n";
			$('#reply-messsage').text(quote).focus();
			$('#reply-messsage')[0].scrollHeight(9999999);
		}, false);
	}

	function AddEventCollect(el){
		el.addEventListener("click",function(){
			alert("QQ klik");
		},false);
	}

	//############# MULTIQUOTE ###############################

	var spMQ = document.getElementById('spMQ');
	var sMQ 	= document.createElement("span");
	sMQ.setAttribute('style','cursor:pointer');
	spMQ.appendChild(sMQ);
	var tMQ	= document.createTextNode("Fetch Multi Quote");

	sMQ.appendChild(tMQ);
	AddEventClickMQ(sMQ);

	function getCookie(c_name){
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)    {
				return unescape(y);
	    	}
	  	}
	}

	function AddEventClickMQ(el){

		el.addEventListener("click",function(){
			eventQR();
		}, false);
	}

	function eventQR(){
		if ( $.cookie('kaskus_multiquote') != null )	{
	      if(window.opera == undefined){

				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://livebeta.kaskus.co.id/post_reply/'+$('#thread_id').val()+'',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,text/xml',
					},
			    	onload: function (responseDetails) {

				      var dt = document.implementation.createDocumentType("html",
				           "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
				         doc = document.implementation.createDocument('', '', dt);
				         html = doc.createElement('html');
				      html.innerHTML = responseDetails.responseText;
				      doc.appendChild(html);
				      if (doc.getElementById('reply-messsage') != null){
				       	$('#reply-messsage').val($('#reply-messsage').val() +''+ doc.getElementById('reply-messsage').value);

							//-	var dataMQ = $.cookie('kaskus_multiquote').split(',');
							//-	alert($.cookie('kaskus_multiquote'));
							 var dataMQ =getCookie('kaskus_multiquote').split(',');
							for (var iC=0;iC < dataMQ.length ; iC++  )		{
								$('#mq_'+ dataMQ[iC]).attr('class','button multi-quote');
							}
							$.cookie( 'kaskus_multiquote',null, { expires: null, path: '/',  secure: false });
				      }else{
				      	EventQR_XML(responseDetails);
						}
					}
				});
			}else{
				// opera
				if( window.XMLHttpRequest ) {
					api_xml_http = new XMLHttpRequest();
				}
				else if( window.ActiveXObject ) {
					api_xml_http = new ActiveXObject( "MSXML2.XMLHTTP.3.0" );
				}
			    	var kata_kedua = '';
					var urlposting='http://livebeta.kaskus.co.id/post_reply/'+$('#thread_id').val()+'';

					api_xml_http.open("GET",urlposting,true);
					api_xml_http.send(null);

					api_xml_http.onreadystatechange=function() {

						if(api_xml_http.readyState==4){
							if (api_xml_http.status==200) {
								EventQR_XML(api_xml_http);
							}
						}
					}
			}
		}
	}

	function EventQR_XML(responseDetails){
			var xmlElem = document.createElement("xml");
			xmlElem.innerHTML = responseDetails.responseText;

			var xmlObj = document.implementation.createDocument("temp", "", null);
			for(var i=0; i<xmlElem.childNodes.length; i+=1) {
			  var imported = xmlObj.importNode(xmlElem.childNodes.item(i), true);
				if(xmlElem.childNodes.item(i).id == 'wrapper'){
					$('#reply-messsage').val($('#reply-messsage').val() +''+ xmlElem.childNodes.item(i).childNodes.item(5).childNodes.item(1).childNodes.item(3).childNodes.item(3).childNodes.item(3).childNodes.item(3).childNodes.item(1).innerHTML);
				}
			}
			var dataMQ =getCookie('kaskus_multiquote').split(',');
			for (var iC=0;iC < dataMQ.length ; iC++  )		{
				$('#mq_'+ dataMQ[iC]).attr('class','button multi-quote');
			}
			$.cookie( 'kaskus_multiquote',null, { expires: null, path: '/',  secure: false });
	}

	//########## UPDATE CHECKER ####################

		var SUC_script_num = 128450; // Change this to the number given to the script by userscripts.org (check the address bar)

		function updateCheck(forced)	{
			if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) //- Checks once a day (24 h * 60 m * 60 s * 1000 ms){
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
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){
									GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js');
									GM_setValue('SUC_current_version', remote_version);
								}
							}
//-							else if (forced)
//-								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
		}
		GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){
			updateCheck(true);
		});
		updateCheck(true);


	$('#reply-messsage').markItUp(kaskusBbcodeSettings);

	//############### EMOT #########################

   var emotList = document.getElementById('emotList');
   var ArrEmotList = [
							 ['oik','Only in Kaskus']
							,['oiks','Only in Kaskus (Small)']
							,['ss','Standard Smilies']];

	for(var i_em=0;i_em<ArrEmotList.length;i_em++){
		var emotListSP 	= document.createElement("span");
		emotListSP.setAttribute('id',ArrEmotList[i_em][0]);
		emotListSP.setAttribute('class','emotcss');
		emotList.appendChild(emotListSP);
		var emotListT	= document.createTextNode(ArrEmotList[i_em][1] +" | ");
		emotListSP.appendChild(emotListT);
		OpenListEmot(emotListSP,ArrEmotList[i_em][0]);
	}

	function OpenListEmot(el,stt){
			el.addEventListener("click",function(){
				OpenGateEmot(stt);
			},false);
	}

	function OpenGateEmot(stt){
		var Emot_uri 	= 'http://kkcdn-static.kaskus.co.id/images/smilies/';
		var Emot_oik 	= [[Emot_uri+'ultah.gif',':ultah'],[Emot_uri+'traveller.gif',':travel'],[Emot_uri+'toastcendol.gif',':toast'],[Emot_uri+'jempol1.gif',':thumbup'],[Emot_uri+'takut.gif',':takut'],[Emot_uri+'fd_5.gif',':sup:'],[Emot_uri+'sundul.gif',':sup2'],[Emot_uri+'sorry.gif',':sorry'],[Emot_uri+'shakehand2.gif',':shakehand2'],[Emot_uri+'selamat.gif',':selamat'],[Emot_uri+'salah_kamar.gif',':salahkamar'],[Emot_uri+'request.gif',':request'],[Emot_uri+'fd_7.gif',' :repost:'],[Emot_uri+'s_sm_repost2.gif',':repost2'],[Emot_uri+'s_sm_repost1.gif',':repost'],[Emot_uri+'recseller.gif',':recsel'],[Emot_uri+'rate5.gif',':rate5'],[Emot_uri+'peluk.gif',':peluk'],[Emot_uri+'nosara.gif',':nosara'],[Emot_uri+'nohope.gif',':nohope'],[Emot_uri+'ngakak.gif',':ngakak'],[Emot_uri+'ngacir2.gif',':ngacir2'],[Emot_uri+'ngacir3.gif',':ngacir'],[Emot_uri+'najis.gif',':najis'],[Emot_uri+'mewek.gif',':mewek'],[Emot_uri+'matabelo1.gif',':matabelo'],[Emot_uri+'marah.gif',':marah'],[Emot_uri+'malu.gif',':malu'],[Emot_uri+'fd_6.gif',':kts:'],[Emot_uri+'kaskus_radio.gif',':kr'],[Emot_uri+'cewek.gif',':kiss'],[Emot_uri+'kimpoi.gif',':kimpoi'],[Emot_uri+'fd_4.gif',':kbgt:'],[Emot_uri+'fd_8.gif',':kacau:'],[Emot_uri+'fd_1.gif',':jrb:'],[Emot_uri+'s_sm_ilovekaskus.gif',':ilovekaskus'],[Emot_uri+'I-Luv-Indonesia.gif',':iloveindonesia'],[Emot_uri+'hoax.gif',':hoax'],[Emot_uri+'hotnews.gif',':hn'],[Emot_uri+'hammer.gif',':hammer'],[Emot_uri+'games.gif',':games'],[Emot_uri+'dp.gif',':dp'],[Emot_uri+'cystg.gif',':cystg'],[Emot_uri+'cool2.gif',':cool'],[Emot_uri+'s_big_cendol.gif',':cendolbig'],[Emot_uri+'cekpm.gif',':cekpm'],[Emot_uri+'fd_2.gif',':cd:'],[Emot_uri+'capede.gif',':cd'],[Emot_uri+'bola.gif',':bola'],[Emot_uri+'bingung.gif',':bingung'],[Emot_uri+'fd_3.gif',':bigo:'],[Emot_uri+'s_sm_maho.gif',':betty'],[Emot_uri+'berduka.gif',':berduka'],[Emot_uri+'s_big_batamerah.gif',':batabig'],[Emot_uri+'babygirl.gif',':babygirl'],[Emot_uri+'babyboy1.gif',':babyboy1'],[Emot_uri+'babyboy.gif',':babyboy'],[Emot_uri+'angel1.gif',':angel'],[Emot_uri+'jempol2.gif',':2thumbup']];
		var Emot_oiks 	= [[Emot_uri+'s_sm_peace.gif',':Yb'],[Emot_uri+'takuts.gif',':takuts'],[Emot_uri+'sundulgans.gif',':sundulgans'],[Emot_uri+'shutup-kecil.gif',':shutups'],[Emot_uri+'reposts.gif',':reposts'],[Emot_uri+'ngakaks.gif',':ngakaks'],[Emot_uri+'najiss.gif',':najiss'],[Emot_uri+'malus.gif',':malus'],[Emot_uri+'mads.gif',':mads'],[Emot_uri+'kisss.gif',':kisss'],[Emot_uri+'iluvkaskuss.gif',':ilovekaskuss'],[Emot_uri+'iloveindonesias.gif',':iloveindonesias'],[Emot_uri+'hammers.gif',':hammers'],[Emot_uri+'cendols.gif',':cendols'],[Emot_uri+'s_sm_cendol.gif',':cendolb'],[Emot_uri+'cekpms.gif',':cekpms'],[Emot_uri+'capedes.gif',':capedes'],[Emot_uri+'bookmark-kecil.gif',':bookmarks'],[Emot_uri+'bingungs.gif',':bingungs'],[Emot_uri+'mahos.gif',':bettys'],[Emot_uri+'berdukas.gif',':berdukas'],[Emot_uri+'berbusa-kecil.gif',':berbusas'],[Emot_uri+'batas.gif',':batas'],[Emot_uri+'s_sm_batamerah.gif',':bata'],[Emot_uri+'army-kecil.gif',':armys'],[Emot_uri+'add-friend-kecil.gif',':addfriends'],[Emot_uri+'s_sm_smile.gif',':)b']];
      var Emot_ss 	= [[Emot_uri+'sumbangan/13.gif',';)'],[Emot_uri+'sumbangan/001.gif',':wowcantik'],[Emot_uri+'sumbangan/44.gif',':tv'],[Emot_uri+'sumbangan/47.gif',':thumbup'],[Emot_uri+'sumbangan/48.gif',':thumbdown'],[Emot_uri+'sumbangan/006.gif',':think:'],[Emot_uri+'sumbangan/shit-3.gif',':tai'],[Emot_uri+'tabrakan.gif',':tabrakan:'],[Emot_uri+'sumbangan/39.gif',':table:'],[Emot_uri+'sumbangan/008.gif',':sun:'],[Emot_uri+'sumbangan/020.gif',':siul'],[Emot_uri+'sumbangan/5.gif',':shutup:'],[Emot_uri+'sumbangan/49.gif',':shakehand'],[Emot_uri+'sumbangan/34.gif',':rose:rose'],[Emot_uri+'sumbangan/01.gif',':rolleyes'],[Emot_uri+'sumbangan/32.gif',':ricebowl:'],[Emot_uri+'sumbangan/e02.gif',':rainbow:'],[Emot_uri+'sumbangan/60.gif',':rain:'],[Emot_uri+'sumbangan/40.gif',':present:'],[Emot_uri+'sumbangan/41.gif',':Phone:'],[Emot_uri+'sumbangan/005.gif',':Peace:'],[Emot_uri+'sumbangan/paw.gif',':Paws:'],[Emot_uri+'sumbangan/6.gif',':p'],[Emot_uri+'sumbangan/rice.gif',':Onigiri'],[Emot_uri+'sumbangan/07.gif',':o'],[Emot_uri+'sumbangan/35.gif',':norose:'],[Emot_uri+'sumbangan/q11.gif',':nohope:'],[Emot_uri+'ngacir.gif',':ngacir:'],[Emot_uri+'sumbangan/007.gif',':moon:'],[Emot_uri+'sumbangan/q17.gif',':metal'],[Emot_uri+'sumbangan/33.gif',':medicine:'],[Emot_uri+'sumbangan/004.gif',':matabelo:'],[Emot_uri+'sumbangan/1.gif',':malu'],[Emot_uri+'sumbangan/12.gif',':mad'],[Emot_uri+'sumbangan/26.gif',':linux2:'],[Emot_uri+'sumbangan/25.gif',':linux1:'],[Emot_uri+'sumbangan/28.gif',':kucing:'],[Emot_uri+'sumbangan/36.gif',':kissmouth'],[Emot_uri+'sumbangan/014.gif',':kissing:'],[Emot_uri+'sumbangan/smiley_couple.gif',':kimpoi:'],[Emot_uri+'sumbangan/3.gif',':kagets:'],[Emot_uri+'sumbangan/hi.gif',':hi:'],[Emot_uri+'sumbangan/37.gif',':heart:'],[Emot_uri+'sumbangan/8.gif',':hammer:'],[Emot_uri+'sumbangan/crazy.gif',':gila:'],[Emot_uri+'sumbangan/q03.gif',':genit'],[Emot_uri+'sumbangan/fuck-4.gif',':fuck:'],[Emot_uri+'sumbangan/fuck-8.gif',':fuck3:'],[Emot_uri+'sumbangan/fuck-6.gif',':fuck2:'],[Emot_uri+'sumbangan/frog.gif',':frog:'],[Emot_uri+'smileyfm329wj.gif',':fm:'],[Emot_uri+'sumbangan/e03.gif',':flower:'],[Emot_uri+'sumbangan/52.gif',':exclamati'],[Emot_uri+'sumbangan/43.gif',':email'],[Emot_uri+'sumbangan/4.gif',':eek'],[Emot_uri+'sumbangan/18.gif',':doctor'],[Emot_uri+'sumbangan/14.gif',':D'],[Emot_uri+'sumbangan/05.gif',':cool:'],[Emot_uri+'sumbangan/7.gif',':confused'],[Emot_uri+'sumbangan/31.gif',':coffee:'],[Emot_uri+'sumbangan/42.gif',':clock'],[Emot_uri+'sumbangan/kaskuslove.gif',':ck'],[Emot_uri+'sumbangan/woof.gif',':buldog'],[Emot_uri+'sumbangan/38.gif',':breakheart'],[Emot_uri+'bolakbalik.gif',':bingung:'],[Emot_uri+'sumbangan/vana-bum-vanaweb-dot-com.gif',':bikini'],[Emot_uri+'sumbangan/q20.gif',':berbusa'],[Emot_uri+'sumbangan/smiley_beer.gif',':beer:'],[Emot_uri+'sumbangan/30.gif',':baby:'],[Emot_uri+'sumbangan/27.gif',':babi:'],[Emot_uri+'sumbangan/24.gif',':army'],[Emot_uri+'sumbangan/29.gif',':anjing:'],[Emot_uri+'sumbangan/017.gif',':angel:'],[Emot_uri+'sumbangan/amazed.gif',':amazed:'],[Emot_uri+'sumbangan/kribo.gif',':afro:'],[Emot_uri+'sumbangan/15.gif',':)'],[Emot_uri+'sumbangan/06.gif',':(']];
		var EO;

		if(stt=='oik'){EO = Emot_oik;}else if(stt=='oiks'){EO = Emot_oiks;}else if(stt=='ss'){EO = Emot_ss;}

		var EmotMQ = document.getElementById('loadEmot');
		EmotMQ.innerHTML = '';
		for(var i=0;i<EO.length;i++){

		var EmotImgMQ 	= document.createElement("img");
		EmotImgMQ.setAttribute('id','emotklik_'+i+'');
		EmotImgMQ.setAttribute('src',EO[i][0]);
		EmotImgMQ.setAttribute('alt',EO[i][1]);
		EmotImgMQ.setAttribute('title',EO[i][1]);
		EmotImgMQ.setAttribute('style','cursor:pointer;');
		EmotMQ.appendChild(EmotImgMQ);
		EmotMQ.appendChild(document.createTextNode(" "));
		AddEventEmot(EmotImgMQ);
		}
	}


	function AddEventEmot(el){
		el.addEventListener("click",function(){
			insertAtCursor(el.alt);
		},false);
	}

});//end onReady

//############# SETTING ###############################

//- GM_addStyle opera
if (typeof GM_addStyle == undefined) {
	function GM_addStyle(css) {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			 var node = document.createElement("style");
			 node.type = "text/css";
			 node.appendChild(document.createTextNode(css));
			 heads[0].appendChild(node);
		}
	}
}

function insertAtCursor(myValue) {
	var myField = document.getElementById('reply-messsage');
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)+ myValue+ myField.value.substring(endPos, myField.value.length);
	} else {
		myField.value += myValue;
	}
}

function XML_Request(uri){
	var RR;
	if( window.XMLHttpRequest ) {
		api_xml_http = new XMLHttpRequest();
	}
	else if( window.ActiveXObject ) {
		api_xml_http = new ActiveXObject( "MSXML2.XMLHTTP.3.0" );
	}
 	var kata_kedua = '';
	var urlposting=uri;

	api_xml_http.open("GET",urlposting,false);
	api_xml_http.send(null);

	api_xml_http.onreadystatechange=function() {

		if(api_xml_http.readyState==4){
			if (api_xml_http.status==200) {
				api_xml_http.responseText;
		      if (typeof callback == "function") {
		        callback.apply(api_xml_http);
		      }
			}
		}
	}
  return api_xml_http.responseText;
}