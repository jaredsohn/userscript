// ==UserScript==
// @name           Kaskus QR Beta Siggy
// @namespace      com.orangdalam.blogsome
// @version        1.1.7.6
// @description    Free Siggy Added
// @include        *//www.kaskus.co.id/thread/*
// @include        *//www.kaskus.co.id/post/*
// @include        *//www.kaskus.co.id/lastpost/*
// @include        http://kaskus.co.id/thread/*
// @include        http://kaskus.co.id/post/*
// @include        http://kaskus.co.id/lastpost/*
// @grant          GM_log
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require        http://cdn.kaskus.com/themes_2.0/js/editor/jquery.markitup.js
// @require        http://cdn.kaskus.com/themes_2.0/js/editor/kaskus_bbcode.js
// @publisher      Nicola Ananda
// ==/UserScript==
//
//
// Changelog:
// V 1.1.7.6 (4-8-2013)
// Fix scripts reference links
// Fix auto update
// Fix Recaptcha layout
// Recaptcha color changed to white theme
//
// V 1.1.7.5 (26-7-2013)
// Support HTTPS
//
// V 1.1.7.4
// Auto update enabled
//
// V 1.1.7.3
// Auto update Removed temporarily
//
// V 1.1.7.2 (23-Desember-2012)
// Update checker script change due to FF 17 error.
//
// V 1.1.7.1 (17-November-2012)
// Quick quote font color rgba fixed
// Quick quote font size fixed
// Settings and Help info added
// Use latest JQuery script
//
// V 1.1.7 (17-November-2012)
// Quick quote engine improved (color,font,align,code)
//
// V 1.1.6.3 (7-November-2012)
// Disabled multi level quote
// Post style color tag fix (thanks to DutyCorp)
// Removed unsupported font type in post style
// Should also work on kaskus.co.id (without wwww)
//
// For full changelog, please visit: http://userscripts.org/scripts/show/128092

// ############### GM related codes ##################

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}
//var GM_log = function (){};
//################ attach recapcay script #################
	var myscript2= document.createElement('script');
	myscript2.setAttribute('src','http://www.google.com/recaptcha/api/js/recaptcha_ajax.js');
	document.body.appendChild(myscript2);
	
	var ajax_file_upload = document.createElement('script');
	ajax_file_upload.setAttribute('src','http://cdn.kaskus.com/themes_2.0/js/ajaxfileupload.js');
	document.body.appendChild(ajax_file_upload);
	
$(document).ready(function(){
	//################ Local storage check###################
	if(typeof(Storage)!=="undefined")
  	{
  		
  	}
	else
  	{
  		alert("Browser agan ga support local storage, silahkan upgrade browser ke versi terbaru");
  	}
	
	//################### Global Variables ##################
	var MINIMUM_TIME = 45;
	var postAttemp = 0;
	var temp_min_time = MINIMUM_TIME;
	var isPreview=false;
	var timer;
	var IMG_PPS = "http://kkcdn-static.kaskus.co.id/images/2012/06/15/477924_20120615025448.png";
	var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br>Phasellus pellentesque, urna quis venenatis dapibus, dui metus vehicula elit, sit amet posuere lectus tortor id augue.'+
	'<br><br>Maecenas sagittis ante ac felis tempus dapibus. Vivamus dui ante, euismod consequat mattis nec, cursus quis elit. Pellentesque condimentum dui ac nunc varius auctor. Nullam fringilla condimentum laoreet. Aenean dictum congue massa, eu tincidunt ante dictum at.';
	var styleTemplate = "{post}";
	var AJAXLOAD_IMAGE_URL = "http://kkcdn-static.kaskus.co.id/images/2012/09/09/477924_20120909032919.gif";
	var SETTING_IMAGE_URL = "http://kkcdn-static.kaskus.co.id/images/2012/06/26/4098625_20120626050027.png";
	//################### Init Setup ################################
	
    $("#quick-reply").remove();//remove default qr
	var jimat = document.getElementById('securitytoken').value;
	var postURL = $('#act-post').attr('href');
	var target = document.getElementById("thread-footer");
	var capcayKey = "6Lc7C9gSAAAAAMAoh4_tF_uGHXnvyNJ6tf9j9ndI";
	var qr = document.createElement("div");
	var celeng ="";
	qr.innerHTML=''+
'<div id="QR-wrap">'+
'<div id="QR-wrap2">'+
	'<form method="post" name="postreply" id="postreply" action="'+postURL+'">'+			
		'<input type="hidden" value="'+jimat+'" name="securitytoken">'+			
		'<fieldset id="pilset">'+
			'<table id="meja-qr">'+
			'<tr>'+
				'<td>'+
						'<div class="reply-message" id="pesan">'+
						
							//############### reply text area ###################
							'<div id="div_fitur"><div class="fitur-separator">----</div><img id="pps" class="cursor" src="'+IMG_PPS+'" title="Paste Post Sebelumnya"></div>'+
							'<textarea id="reply-message" rows="250" name="message" class="markItUpEditor"></textarea>'+
							//############## save siggy button #################
							'<a id="btnSaveSiggy" href="javascript:void(0);" class="button small oranye" >Save Siggy</a>'+
						
						'</div>'+
				'</td>'+
					//########## insert capcay ############
					'<td width="40%">'+
					'<div id="ajaxContainer" class="kanan">'+
					'<span id="ajaxStat" class="options" style="display:none">Posting...</span>'+
					'<a tabindex="99" id="btnSettings" class="transparan" href="javascript:void(0);"><img id="imgSetNLoad" src="http://kkcdn-static.kaskus.co.id/images/2012/06/26/4098625_20120626050027.png" title="Settings"></a>'+
					'</div>'+
					'<div id="capcayErrorMsg" class="redBox kanan" style="display:none">Recaptcha did not match</div>'+
					'<div id="timer_div" class="timer">&nbsp</div>'+	
						'<div class="capcay_div">'+
							'<fieldset class="fieldset">'+
							 	'<div dir="ltr">'+
								'<div style="" id="recaptcha_widget_div">'+ 
								//##### gbr jengkol ###############
									'<div id="div_gbrCapcay">'+
										'<img id="gbrCapcay" src="http://kkcdn-static.kaskus.co.id/images/2012/07/06/3049825_20120706050346.jpg"><div class="clear_both"></div>'+
									'</div>'+
									'<div id="recaptcha_widget" style="display:none">'+
									'<div id="recaptcha_image"></div>'+																	
									'<input type="text" id="recaptcha_response_field" name="recaptcha_response_field" />'+
									
									'</div>'+
								//########### capcay no script ########
								'<noscript>'+
									'<iframe src="http://api.recaptcha.net/noscript?k=6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d" height="300" width="400" frameborder="0"></iframe>'+
									'<br />'+
									'<textarea name="recaptcha_challenge_field" rows="3" cols="40">'+
									'</textarea>'+
									'<input type="hidden" name="recaptcha_response_field" value="manual_challenge" />'+
								'</noscript>'+
								'</div>'+
								'</div>'+
							  //########## tombol submit ############
							  '<input type="submit" accesskey="r" value="Beri Komeng" name="sbutton" class="button medium blue" style="float:right">'+
							  '<input type="submit" accesskey="s" value="Sample" name="preview" id="preview" class="button medium white" style="float:right;margin:0px 5px;">'+							  
							  '<input type="checkbox" value="1" checked="checked" name="parseurl" style="display:none">'+
							  //############ tips ###########
							  '<div class=pesan><p><strong>Quick Tips:</strong></p><ul class="listPesan"><li>Setelah ketik komen, tekan TAB untuk isi capcay, lalu tekan enter</li>'+
							  '<li>Klik semur jengkol jika capcay tidak muncul</li><li>Save siggy dahulu sebelum melakukan preview</li><li>Tidurlah Jika Capek Ngejunk *UpsX</li>'+
							  '<li>Sikatlah gigi sebelum tidur</li></ul></div>'+
							'</fieldset>'+
						'</div>'+
					//################ end capcay ##########################
					'</td></tr>'+
					//'<tr><td colspan="2"></td></tr>'+
			'</table>'+
		'</fieldset>'+					
		'</form>'+
'</div>'+
'</div>'
	;
	//##################### Tab Content ##############################
	var emotContainer = document.createElement("div");
	var uriSmilies = "http://kkcdn-static.kaskus.co.id/images/smilies/";
	var uriSumbangan = "http://kkcdn-static.kaskus.co.id/images/smilies/sumbangan/";
	emotContainer.innerHTML=''+
	'<div id="div_emotWrapper">'+
	'<div class="emotButtonWrapper">'+
		'<a class="emotTab" id="kecil" href="javascript:void(0);"><img src="http://kkcdn-static.kaskus.co.id/images/smilies/kisss.gif">Kecil</a>'+
		'<a class="emotTab" id="besar" href="javascript:void(0);"><img src="http://kkcdn-static.kaskus.co.id/images/smilies/iloveindonesias.gif">Besar</a>'+
		'<a class="emotTab" id="unggah" href="javascript:void(0);">Upload</a>'+
		'<a class="emotTab" id="siggy" href="javascript:void(0);">Siggy</a>'+
		'<a class="emotTab" id="gaya" href="javascript:void(0);">Style</a>'+
	'</div>'+//end of emotButtonWrapper
	'<div id="div_emotSmall" class="emotContainer">'+
	'<div id="div_emotSmallNew">'+
	'<img class="emots" title="Cendol (S)" alt=":cendols" src="'+uriSmilies+'cendols.gif">'+
	'<img class="emots" title="Bata (S)" alt=":batas" src="'+uriSmilies+'batas.gif">'+
	'<img class="emots" title="Blue Guy Cendol (S)" alt=":cendolb" src="'+uriSmilies+'s_sm_cendol.gif">'+
	'<img class="emots" title="Blue Guy Bata (S)" alt=":bata" src="'+uriSmilies+'s_sm_batamerah.gif">'+
	'<img class="emots" title="I Love Indonesia (S)" alt=":iloveindonesias" src="'+uriSmilies+'iloveindonesias.gif">'+
	'<img class="emots" title="I Love Kaskus (S)" alt=":ilovekaskuss" src="'+uriSmilies+'iluvkaskuss.gif">'+	
	'<img class="emots" title="Cek PM (S)" alt=":cekpms" src="'+uriSmilies+'cekpms.gif">'+
	'<img class="emots" title="Bookmark (S)" alt=":bookmarks" src="'+uriSmilies+'bookmark-kecil.gif">'+
	'<img class="emots" title="Add Friend (S)" alt=":addfriends" src="'+uriSmilies+'add-friend-kecil.gif">'+
	'<img class="emots" title="Kiss (S)" alt=":kisss" src="'+uriSmilies+'kisss.gif">'+
	'<img class="emots" title="Malu (S)" alt=":malus" src="'+uriSmilies+'malus.gif">'+
	'<img class="emots" title="Ngakak (S)" alt=":ngakaks" src="'+uriSmilies+'ngakaks.gif">'+
	'<img class="emots" title="Shutup (S)" alt=":shutups" src="'+uriSmilies+'shutup-kecil.gif">'+
	'<img class="emots" title="Takut (S)" alt=":takuts" src="'+uriSmilies+'takuts.gif">'+
	'<img class="emots" title="Betty (S)" alt=":bettys" src="'+uriSmilies+'mahos.gif">'+
	'<img class="emots" title="Berbusa (S)" alt=":berbusas" src="'+uriSmilies+'berbusa-kecil.gif">'+
	'<img class="emots" title="Bingung (S)" alt=":bingungs" src="'+uriSmilies+'bingungs.gif">'+
	'<img class="emots" title="Cape d... (S)" alt=":capedes" src="'+uriSmilies+'capedes.gif">'+
	'<img class="emots" title="Hammer (S)" alt=":hammers" src="'+uriSmilies+'hammers.gif">'+
	'<img class="emots" title="Mad (S)" alt=":mads" src="'+uriSmilies+'mads.gif">'+
	'<img class="emots" title="Najis (S)" alt=":najiss" src="'+uriSmilies+'najiss.gif">'+
	'<img class="emots" title="Repost (S)" alt=":reposts" src="'+uriSmilies+'reposts.gif">'+
	'<img class="emots" title="Sundul Gan (S)" alt=":sundulgans" src="'+uriSmilies+'sundulgans.gif">'+
	'<img class="emots" title="Blue Guy Peace" alt=":Yb" src="'+uriSmilies+'s_sm_peace.gif">'+
	'<img class="emots" title="Blue Guy Smile (S)" alt=":)b" src="'+uriSmilies+'s_sm_smile.gif">'+
	'<img class="emots" title="Army (S)" alt=":armys" src="'+uriSmilies+'army-kecil.gif">'+
	'</div>'+
	'<div id="div_emotSmallOld">'+
	'<img class="emots" title="Wink" alt=";)" src="'+uriSumbangan+'13.gif">'+
	'<img class="emots" title="Wowcantik" alt=":wowcantik" src="'+uriSumbangan+'001.gif">'+
	'<img class="emots" title="televisi" alt=":tv" src="'+uriSumbangan+'44.gif">'+
	'<img class="emots" title="thumbsup" alt=":thumbup" src="'+uriSumbangan+'47.gif">'+
	'<img class="emots" title="thumbdown" alt=":thumbdown" src="'+uriSumbangan+'48.gif">'+
	'<img class="emots" title="Thinking" alt=":think:" src="'+uriSumbangan+'006.gif">'+
	'<img class="emots" title="Tai" alt=":tai" src="'+uriSumbangan+'shit-3.gif">'+
	'<img class="emots" title="table" alt=":table:" src="'+uriSumbangan+'39.gif">'+
	'<img class="emots" title="Matahari" alt=":sun:" src="'+uriSumbangan+'008.gif">'+
	'<img class="emots" title="siul" alt=":siul" src="'+uriSumbangan+'020.gif">'+
	'<img class="emots" title="Shutup" alt=":shutup:" src="'+uriSumbangan+'5.gif">'+
	'<img class="emots" title="shakehand" alt=":shakehand" src="'+uriSumbangan+'49.gif">'+
	'<img class="emots" title="rose" alt=":rose:" src="'+uriSumbangan+'34.gif">'+
	'<img class="emots" title="Roll Eyes (Sarcastic)" alt=":rolleyes" src="'+uriSumbangan+'01.gif">'+
	'<img class="emots" title="ricebowl" alt=":ricebowl:" src="'+uriSumbangan+'32.gif">'+
	'<img class="emots" title="rainbow" alt=":rainbow:" src="'+uriSumbangan+'e02.gif">'+
	'<img class="emots" title="raining" alt=":rain:" src="'+uriSumbangan+'60.gif">'+
	'<img class="emots" title="present" alt=":present:" src="'+uriSumbangan+'40.gif">'+
	'<img class="emots" title="phone" alt=":Phone:" src="'+uriSumbangan+'41.gif">'+
	'<img class="emots" title="Peace" alt=":Peace:" src="'+uriSumbangan+'005.gif">'+
	'<img class="emots" title="Paw" alt=":Paws:" src="'+uriSumbangan+'paw.gif">'+
	'<img class="emots" title="Stick Out Tongue" alt=":p" src="'+uriSumbangan+'6.gif">'+
	'<img class="emots" title="Onigiri" alt=":Onigiri" src="'+uriSumbangan+'rice.gif">'+
	'<img class="emots" title="Embarrassment" alt=":o" src="'+uriSumbangan+'07.gif">'+
	'<img class="emots" title="norose" alt=":norose:" src="'+uriSumbangan+'35.gif">'+
	'<img class="emots" title="Nohope" alt=":nohope:" src="'+uriSumbangan+'q11.gif">'+
	'<img class="emots" title="Ngacir" alt=":ngacir:" src="'+uriSmilies+'ngacir.gif">'+
	'<img class="emots" title="Moon" alt=":moon:" src="'+uriSumbangan+'007.gif">'+
	'<img class="emots" title="Metal" alt=":metal" src="'+uriSumbangan+'q17.gif">'+
	'<img class="emots" title="medicine" alt=":medicine:" src="'+uriSumbangan+'33.gif">'+
	'<img class="emots" title="Belo" alt=":matabelo:" src="'+uriSumbangan+'004.gif">'+
	'<img class="emots" title="Malu" alt=":malu" src="'+uriSumbangan+'1.gif">'+
	'<img class="emots" title="Mad" alt=":mad" src="'+uriSumbangan+'12.gif">'+
	'<img class="emots" title="linux2" alt=":linux2:" src="'+uriSumbangan+'26.gif">'+
	'<img class="emots" title="kucing" alt=":kucing:" src="'+uriSumbangan+'28.gif">'+
	'<img class="emots" title="kiss" alt=":kissmouth" src="'+uriSumbangan+'36.gif">'+
	'<img class="emots" title="kisssing" alt=":kissing:" src="'+uriSumbangan+'014.gif">'+
	'<img class="emots" title="Kagets" alt=":kagets:" src="'+uriSumbangan+'3.gif">'+
	'<img class="emots" title="Hi" alt=":hi:" src="'+uriSumbangan+'hi.gif">'+
	'<img class="emots" title="heart" alt=":heart:" src="'+uriSumbangan+'37.gif">'+
	'<img class="emots" title="Hammer" alt=":hammer:" src="'+uriSumbangan+'8.gif">'+
	'<img class="emots" title="Gila" alt=":gila:" src="'+uriSumbangan+'crazy.gif">'+
	'<img class="emots" title="Genit" alt=":genit" src="'+uriSumbangan+'q03.gif">'+
	'<img class="emots" title="fuck" alt=":fuck:" src="'+uriSumbangan+'fuck-4.gif">'+
	'<img class="emots" title="fuck3" alt=":fuck3:" src="'+uriSumbangan+'fuck-8.gif">'+
	'<img class="emots" title="fuck2" alt=":fuck2:" src="'+uriSumbangan+'fuck-6.gif">'+
	'<img class="emots" title="frog" alt=":frog:" src="'+uriSumbangan+'frog.gif">'+
	'<img class="emots" title="Forum Music" alt=":fm:" src="'+uriSmilies+'smileyfm329wj.gif">'+
	'<img class="emots" title="flower" alt=":flower:" src="'+uriSumbangan+'e03.gif">'+
	'<img class="emots" title="exclamation" alt=":exclamati" src="'+uriSumbangan+'52.gif">'+
	'<img class="emots" title="mail" alt=":email" src="'+uriSumbangan+'43.gif">'+
	'<img class="emots" title="EEK!" alt=":eek" src="'+uriSumbangan+'4.gif">'+
	'<img class="emots" title="doctor" alt=":doctor" src="'+uriSumbangan+'18.gif">'+
	'<img class="emots" title="Big Grin" alt=":D"  src="'+uriSumbangan+'14.gif">'+
	'<img class="emots" title="Cool" alt=":cool:" src="'+uriSumbangan+'05.gif">'+
	'<img class="emots" title="Confused" alt=":confused" src="'+uriSumbangan+'7.gif">'+
	'<img class="emots" title="coffee" alt=":coffee:" src="'+uriSumbangan+'31.gif">'+
	'<img class="emots" title="clock" alt=":clock" src="'+uriSumbangan+'42.gif">'+
	'<img class="emots" title="Buldog" alt=":buldog" src="'+uriSumbangan+'woof.gif">'+
	'<img class="emots" title="breakheart" alt=":breakheart" src="'+uriSumbangan+'38.gif">'+
	'<img class="emots" title="Bikini" alt=":bikini" src="'+uriSumbangan+'vana-bum-vanaweb-dot-com.gif">'+
	'<img class="emots" title="Busa" alt=":berbusa:"src="'+uriSumbangan+'q20.gif">'+
	'<img class="emots" title="babi" alt=":babi:" src="'+uriSumbangan+'27.gif">'+
	'<img class="emots" title="army" alt=":army" src="'+uriSumbangan+'24.gif">'+
	'<img class="emots" title="anjing" alt=":anjing:" src="'+uriSumbangan+'29.gif">'+
	'<img class="emots" title="angel" alt=":angel:" src="'+uriSumbangan+'017.gif">'+
	'<img class="emots" title="Amazed" alt=":amazed:" src="'+uriSumbangan+'amazed.gif">'+
	'<img class="emots" title="Ngacir Tubrukan" alt=":tabrakan:" src="'+uriSmilies+'tabrakan.gif">'+
	'<img class="emots" title="afro" alt=":afro:" src="'+uriSumbangan+'kribo.gif">'+	
	'<img class="emots" title="Pasangan Smiley" alt=":kimpoi:" src="'+uriSumbangan+'smiley_couple.gif">'+
	'<img class="emots" title="Kaskus Lovers" alt=":ck" src="'+uriSumbangan+'kaskuslove.gif">'+
	'<img class="emots" title="Angkat Beer" alt=":beer:" src="'+uriSumbangan+'smiley_beer.gif">'+
	'<img class="emots" title="Bingung" alt=":bingung:" src="'+uriSmilies+'bolakbalik.gif">'+

	'</div></div>'+//end of emot small container
	'<div id="div_emotBig" class="emotContainer">'+
	'<img class="emots emots_big" title="Ultah" alt=":ultah" src="'+uriSmilies+'ultah.gif">'+
	'<img class="emots emots_big" title="Traveller" alt=":travel" src="'+uriSmilies+'traveller.gif">'+
	'<img class="emots emots_big" title="Toast" alt=":toast" src="'+uriSmilies+'toastcendol.gif">'+
	'<img class="emots emots_big" title="Takut" alt=":takut" src="'+uriSmilies+'takut.gif">'+
	'<img class="emots emots_big" title="Sundul" alt=":sup2" src="'+uriSmilies+'sundul.gif">'+
	'<img class="emots emots_big" title="Sorry" alt=":sorry" src="'+uriSmilies+'sorry.gif">'+
	'<img class="emots emots_big" title="Shakehand2" alt=":shakehand2" src="'+uriSmilies+'shakehand2.gif">'+
	'<img class="emots emots_big" title="Selamat" alt=":selamat" src="'+uriSmilies+'selamat.gif">'+
	'<img class="emots emots_big" title="Salah Kamar" alt=":salahkamar" src="'+uriSmilies+'salah_kamar.gif">'+
	'<img class="emots emots_big" title="Request" alt=":request" src="'+uriSmilies+'request.gif">'+
	'<img class="emots emots_big" title="Purple Repost" alt=":repost2" src="'+uriSmilies+'s_sm_repost2.gif">'+
	'<img class="emots emots_big" title="Blue Repost" alt=":repost" src="'+uriSmilies+'s_sm_repost1.gif">'+
	'<img class="emots emots_big" title="Recommended Seller" alt=":recsel" src="'+uriSmilies+'recseller.gif">'+
	'<img class="emots emots_big" title="Rate 5 Star" alt=":rate5" src="'+uriSmilies+'rate5.gif">'+
	'<img class="emots emots_big" title="Peluk" alt=":peluk" src="'+uriSmilies+'peluk.gif">'+
	'<img class="emots emots_big" title="No Sara Please" alt=":nosara" src="'+uriSmilies+'nosara.gif">'+
	'<img class="emots emots_big" title="No Hope" alt=":nohope" src="'+uriSmilies+'nohope.gif">'+
	'<img class="emots emots_big" title="Ngakak" alt=":ngakak" src="'+uriSmilies+'ngakak.gif">'+
	'<img class="emots emots_big" title="Ngacir2" alt=":ngacir2" src="'+uriSmilies+'ngacir2.gif">'+
	'<img class="emots emots_big" title="Ngacir" alt=":ngacir" src="'+uriSmilies+'ngacir3.gif">'+
	'<img class="emots emots_big" title="Najis" alt=":najis" src="'+uriSmilies+'najis.gif">'+
	'<img class="emots emots_big" title="Mewek" alt=":mewek" src="'+uriSmilies+'mewek.gif">'+
	'<img class="emots emots_big" title="Marah" alt=":marah" src="'+uriSmilies+'marah.gif">'+
	'<img class="emots emots_big" title="Malu" alt=":malu" src="'+uriSmilies+'malu.gif">'+
	'<img class="emots emots_big" title="Kaskus Radio" alt=":kr" src="'+uriSmilies+'kaskus_radio.gif">'+
	'<img class="emots emots_big" title="Kiss" alt=":kiss" src="'+uriSmilies+'cewek.gif">'+
	'<img class="emots emots_big" title="Kimpoi" alt=":kimpoi" src="'+uriSmilies+'kimpoi.gif">'+
	'<img class="emots emots_big" title="I Love Kaskus" alt=":ilovekaskus" src="'+uriSmilies+'s_sm_ilovekaskus.gif">'+
	'<img class="emots emots_big" title="I Love Indonesia" alt=":iloveindonesia" src="'+uriSmilies+'I-Luv-Indonesia.gif">'+
	'<img class="emots emots_big" title="Hoax" alt=":hoax" src="'+uriSmilies+'hoax.gif">'+
	'<img class="emots emots_big" title="Hot News" alt=":hn" src="'+uriSmilies+'hotnews.gif">'+
	'<img class="emots emots_big" title="Hammer2" alt=":hammer" src="'+uriSmilies+'hammer.gif">'+
	'<img class="emots emots_big" title="Games" alt=":games" src="'+uriSmilies+'games.gif">'+
	'<img class="emots emots_big" title="DP" alt=":dp" src="'+uriSmilies+'dp.gif">'+
	'<img class="emots emots_big" title="cystg" alt=":cystg" src="'+uriSmilies+'cystg.gif">'+
	'<img class="emots emots_big" title="Cool" alt=":cool" src="'+uriSmilies+'cool2.gif">'+
	'<img class="emots emots_big" title="Blue Guy Cendol (L)" alt=":cendolbig" src="'+uriSmilies+'s_big_cendol.gif">'+
	'<img class="emots emots_big" title="Cek PM" alt=":cekpm" src="'+uriSmilies+'cekpm.gif">'+
	'<img class="emots emots_big" title="Cape d..." alt=":cd" src="'+uriSmilies+'capede.gif">'+
	'<img class="emots emots_big" title="Bola" alt=":bola" src="'+uriSmilies+'bola.gif">'+
	'<img class="emots emots_big" title="Bingung" alt=":bingung" src="'+uriSmilies+'bingung.gif">'+
	'<img class="emots emots_big" title="Betty" alt=":betty" src="'+uriSmilies+'s_sm_maho.gif">'+
	'<img class="emots emots_big" title="Turut Berduka" alt=":berduka" src="'+uriSmilies+'berduka.gif">'+
	'<img class="emots emots_big" title="Blue Guy Bata (L)" alt=":batabig" src="'+uriSmilies+'s_big_batamerah.gif">'+
	'<img class="emots emots_big" title="Baby Girl" alt=":babygirl" src="'+uriSmilies+'babygirl.gif">'+
	'<img class="emots emots_big" title="Baby Boy 1" alt=":babyboy1" src="'+uriSmilies+'babyboy1.gif">'+
	'<img class="emots emots_big" title="Baby Boy" alt=":babyboy" src="'+uriSmilies+'babyboy.gif">'+
	'<img class="emots emots_big" title="Angel" alt=":angel" src="'+uriSmilies+'angel1.gif">'+
	'<img class="emots emots_big" title="2 Jempol" alt=":2thumbup" src="'+uriSmilies+'jempol2.gif">'+
	'<img class="emots emots_big" title="Sundul Up" alt=":sup:" src="'+uriSmilies+'fd_5.gif">'+
	'<img class="emots emots_big" title="Repost" alt=":repost:" src="'+uriSmilies+'fd_7.gif">'+
	'<img class="emots emots_big" title="Kemana TSnya?" alt=":kts:" src="'+uriSmilies+'fd_6.gif">'+
	'<img class="emots emots_big" title="Kaskus Banget" alt=":kbgt:" src="'+uriSmilies+'fd_4.gif">'+
	'<img class="emots emots_big" title="Thread Kacau" alt=":kacau:" src="'+uriSmilies+'fd_8.gif">'+
	'<img class="emots emots_big" title="Jangan ribut disini" alt=":jrb:" src="'+uriSmilies+'fd_1.gif">'+
	'<img class="emots emots_big" title="Cape deeehh" alt=":cd:" src="'+uriSmilies+'fd_2.gif">'+
	'<img class="emots emots_big" title="Bukan IGO" alt=":bigo:" src="'+uriSmilies+'fd_3.gif">'+
	''+
	'</div>'+//end of emot big wrapper
	//####################### Upload Image #######################
	'<div id="uploadImageWrapper" class="emotContainer">'+
	'<div class="upload-succes"> <div id="preview-image"> </div>'+
	'<div id="image-control"><div class="pesan">*Pilih file gambar, lalu klik upload</div>'+
	'<input id="browse" type="file" name="forumimg" ><br><input id="btnUnggah" type="button" value="Upload" class="button small white"></div></div>'+	
	'<div id="loading" style="display:none;margin:10px 5px"> '+
	'Sedang mengunggah... <img src="http://kkcdn-static.kaskus.co.id/images/smilies/bolakbalik.gif" alt="loading"/></div>'+
	'</div>'+ 
	//####################### siggy ##############################
	'<div id="siggyWrapper" class="emotContainer options">'+
	'<a id="btnEditSiggy" href="javascript:void(0);" class="button micro green">Edit Siggy</a>'+
	'<input type="radio" name="sig" id="sigOff" value="0" class="rbSiggy "/><label for="sigOff" class="clear_left">Off</label>'+
	'<input type="radio" name="sig" id="sig1" value="1" class="rbSiggy "/><label for="sig1" class="clear_left">Siggy 1</label>'+
	'<input type="radio" name="sig" id="sig2" value="2" class="rbSiggy"/><label for="sig2" class="clear_left">Siggy 2</label>'+
	'<input type="radio" name="sig" id="sig3" value="3" class="rbSiggy"/><label for="sig3" class="clear_left">Siggy 3</label>'+
	'<div id="siggyContent"></div>'+
	'</div>'+//end of siggy wrapper
	//################# Post Style ##################################
	'<div id="styleWrapper" class="emotContainer options">'+
	'<b>Post Style:</b>'+
	'<input type="radio" name="PostStyle" id="rbPostStyleOn"  class="rbSiggy"/><label for="rbPostStyleOn" class="clear_left jarak5">On</label>'+
	'<input type="radio" name="PostStyle" id="rbPostStyleOff"  class="rbSiggy"/><label for="rbPostStyleOff" class="clear_left jarak5">Off</label>'+
	'<br><br>'+
	'<div id="div_styleContainer">'+
	'<div id="div_styleSetting">'+
	'<b>Font type:</b><ul><li class="fontSelected"> None</li>'+
	'<ul id="fontTypeList" style="display:none"><li class="fontList"><font face="arial">Arial</font></li> <li class="fontList"><font face="arial black">Arial Black</font></li> <li class="fontList"><font face="Arial Narrow">Arial Narrow</font></li> <li class="fontList"><font face="Book Antiqua">Book Antiqua</font></li>'+
	'<li class="fontList"><font face="century gothic">Century Gothic</font></li><li class="fontList"><font face="comic sans ms">Comic Sans MS</font></li><li class="fontList"><font face="courier new">Courier New</font></li><li class="fontList"><font face="georgia">Georgia</font></li>'+
	'<li class="fontList"><font face="impact">Impact</font></li><li class="fontList"><font face="lucida console">Lucida Console</font></li><li class="fontList"><font face="times new roman">Times New Roman</font></li><li class="fontList"><font face="trebuchet ms">Trebuchet MS</font></li><li class="fontList"><font face="verdana">Verdana</font></li></ul>'+
	'</ul>'+//list fonts
	'<br><b>Font format:</b><br>'+
	'<input type="checkbox" name="cbBold" id="cbBold" class="rbSiggy"/><label for="cbBold" class="clear_left jarak5">Bold</label>'+
	'<input type="checkbox" name="cbItalic" id="cbItalic" class="rbSiggy"/><label for="cbItalic" class="clear_left jarak5">Italic</label>'+
	'<input type="checkbox" name="cbUnderline" id="cbUnderline" class="rbSiggy"/><label for="cbUnderline" class="clear_left jarak5">Underline</label>'+
	'<br><br><b>Alignment:</b></br>'+
	'<input type="radio" name="rbAlign" id="rbAlignLeft" class="rbSiggy"/><label for="rbAlignLeft" class="clear_left jarak5">Left</label>'+
	'<input type="radio" name="rbAlign" id="rbAlignCenter" class="rbSiggy"/><label for="rbAlignCenter" class="clear_left jarak5">Center</label>'+
	'<input type="radio" name="rbAlign" id="rbAlignRight" class="rbSiggy"/><label for="rbAlignRight" class="clear_left jarak5">Right</label>'+
	'<br><br><b>Text Color:</b></br>'+
	'<input type="text" id="txtChosenColor">'+
	'<ul><li class="kolorButton" title="yellow"><a href="javascript:void(0);">yellow</a></li><li class="kolorButton" title="orange"><a href="javascript:void(0);" >orange</a></li>'+
	'<li class="kolorButton" title="Red"><a href="javascript:void(0);">red</a></li><li class="kolorButton" title="Blue"><a href="javascript:void(0);" >blue</a></li><li class="kolorButton" title="Purple"><a href="javascript:void(0);" >purple</a></li>'+
	'<li class="kolorButton" title="Green"><a href="javascript:void(0);">green</a></li><li class="kolorButton" title="White"><a href="javascript:void(0);"  >white</a></li><li class="kolorButton" title="Gray"><a href="javascript:void(0);" >gray</a></li></ul>'+
	'<br><br>'+
	'</div>'+//end of div_styleSetting
	'<div id="div_wrapperStylePreview">'+
	'<b>Preview:</b>'+
	'<div id="div_stylePreview"> </div>'+
	'</div>'+//end of div_styleContainer
	'</div>'+//end of styleWrapper
	'</div>'//end of all emot wrapper
	
	;
	
	//######################## Setting and Helps #################
	$settingContainer=''+
	'<div id="div_setting" style="display:none;">'+
		'<h1>Quick Reply Hotkeys:</h1>'+
		'<ul><li><b>CTRL+Q</b> : Menampilkan Quick Reply</li><li><b>CTRL+Enter</b> : Submit post(cocok bagi donatur yang tidak perlu isi Capcay)</li><li><b>CTRL+G</b> : Membuka semua spoiler</li></ul>'+
		'<h1>Fitur Quick Reply:</h1>'+
		'<ul><li><b>Kecil (Tab)</b>, menampilkan semua emoticon ukuran kecil</li><li><b>Besar (Tab)</b>, menampilkan semua emoticon ukuran besar</li><li><b>Upload</b>, upload ya buat upload gambar gan :o</li><li><b>Siggy</b>, menambahkan signature/pesan di akhir postingan, terdiri dari 3 preset yang bisa di-customize sesuka hati (nb:beberapa sub-forum melarang memakai siggy, so beware)</li><li><b>Style</b>, sebagai template postingan yang mengatur jenis font, ukuran, hingga warna</li><li><b>PPS (Paste Post Sebelumnya)</b>, setiap postingan terakhir akan diingat oleh Quick Reply, tekan tombol ini <u>(ada di toolbar)</u> untuk menampilkan kembali di comment-box</li></ul>'+		
	'</div>';
	$('body').prepend($settingContainer);
	
	//######################### Shortcuts ########################
	var isCtrl = false;
	var togel = false;
	
	$(document).keyup(function (e) {
		if(e.which == 17) isCtrl=false; //CTRL
		}).keydown(function (e) {
			if(e.which == 17) isCtrl=true;
			if(e.which == 81 && isCtrl == true) //Q, goto QR
			{
				scrollToQR();
				$("#reply-message").focus();
				return false;
			}
			else if(e.which == 13 && isCtrl == true) //enter. submit
			{
				$("#postreply").submit();
				return false;
			}
			else if(e.which == 66 && isCtrl == true){//B, bold
				$("#reply-message").focus();
				var teks = "[B]";
				insertAtCursor(teks);
				return false;
			}
			else if(e.which == 73 && isCtrl == true){//I, italic
				$("#reply-message").focus();
				var teks = "[I]";
				insertAtCursor(teks);
				return false;
			}
			else if(e.which == 85 && isCtrl == true){//U, underline
				$("#reply-message").focus();
				var teks = "[U]";
				insertAtCursor(teks);
				return false;
			}
			else if((e.which == 71 && isCtrl == true)) //ctrl+G, open all spoiler
 			{
		 		if(togel == false){
					$("div#bbcode_inside_spoiler").each(function(){
		 			this.style.display="block";
		 			});
		 			togel=true;
		 		}
		 		else{
		 			$("div#bbcode_inside_spoiler").each(function(){
		 			this.style.display="none";
		 			});
		 			togel=false;
		 		}
		 		return false;
 			}
	});
	

	//############### functions ################
	
	function showCapcayUW(timer){//Unsafe Window
		setTimeout(function(){
				if(window.opera != undefined) {
					var unsafeWindowS=window;
				}
				else{
					var unsafeWindowS=unsafeWindow;
				} 
				Recaptcha = unsafeWindowS.Recaptcha; 
				//Recaptcha.create(capcayKey,"recaptcha_widget",{theme:"custom"});
				//$("#gbrCapcay").hide();
				//celeng = Recaptcha.get_challenge();
				Recaptcha.create(capcayKey,"recaptcha_widget_div",{theme:"white"});
		},timer);
	}
	
	function hideDefaultQRButton(){
		$("a.button_qr").each(function(){
			$(this).remove();
		});
	}
	
	function buttonQRClick(el){
		el.addEventListener("click",function(){
			
			var postParent = $(this).parents().eq(4); //get post div
			var postId = postParent.attr("id");
			var userName = postParent.find(".nickname").text();
			userName = userName.replace("[$]","");
			//insert to double span to fix span parsing in htmlToBb()
			var $entryContent = $("<span></span>").append(postParent.find(".entry").clone());
			$entryContent = $("<span></span>").append($entryContent);
			$entryContent = parseHTMLtoBB($entryContent);
			postId = postId.replace("post",";");
			var quote="";
			if($('#reply-message').val()==""){
					quote = $('#reply-message').val()+"[QUOTE="+userName+postId+"]"
						+$.trim($entryContent.text())+"[/QUOTE]\n";
					document.getElementById("reply-message").value = quote;
			}
			else{
					quote = $('#reply-message').val()+"\n\n[QUOTE="+userName+postId+"]"
						+$.trim($entryContent.text())+"[/QUOTE]\n";
					document.getElementById("reply-message").value = quote;	
			}
			
			if(el.getAttribute('id')=="btnQQ"){
				
				scrollToQR();
				$("#reply-message").focus();
				var len = $("#reply-message").val().length;
                document.getElementById("reply-message").setSelectionRange(len, len);
				document.getElementById("reply-message").scrollTop = document.getElementById("reply-message").scrollHeight;
			}
			else if(el.getAttribute('id')=="btnMQQ"){
				el.setAttribute('class','button_qr button blue small jarak5'); 
			}
		}, false);
	}//end function buttonQRClick
	
	function assignEmotClick(){
		$("img.emots").on("click",function(){
			var emotCode=$(this).attr("alt");
			insertAtCursor(emotCode);
		});	
	}
	
	function insertBBImage(obj){
		var emotCode=obj.attr("alt");
		insertAtCursor(emotCode);
	}
	
	function scrollToQR(){
		var pos = $('#QR-wrap').offset().top - 35;
		$('html,body').scrollTop(pos+100);
		$('html, body').animate({
			scrollTop : pos
		}, 500, 'swing');
				
	}
	
	function scrollToStyle(){
		var pos= $('#QR-wrap').offset().top + 200;
		$('html, body').animate({
			scrollTop : pos
		}, 500, 'swing');
	}
	function parseHTMLtoBB($content){
		
		// clear non-content post
		$content.find(".edited").empty();//remove edited
		$content.find("h1").empty();//post title
		//$content.find('span.post-quote span:first-child').empty();//remove quote header text (needed for multi level quote)
		$content.find(".post-quote").empty(); //remove quoted message, needed for 0 level quote
		$content.find("div.smallfont").empty();//remove php code header
		$content.find('div [style^="margin-bottom"]').empty();//remove code header
				
		//gambar
		$content.find('img').replaceWith(function(){
			return "[IMG]"+$(this).attr('src')+"[/IMG]";
		});
		
		//link
		$content.find('a').replaceWith(function(){
			return '[URL="'+$(this).attr('href')+'"]'+$(this).text()+'[/URL]';
		});
		
		//<br>
		$content.find('br').replaceWith(function(){
			return '\n';
		});
		
		//youtube
		$content.find("object").replaceWith(function(){
			var youtube = $(this).children('embed').attr('src');
			var code = youtube.split("/");
			return "[YOUTUBE]"+code[4]+"[/YOUTUBE]";
			
		})
		
		//spoiler
		$content.find('div.spoiler').reverse().replaceWith(function(){
			var spoil;
			var spoilName;
			$(this).children('#bbcode_div').replaceWith(function(){
				spoilName = $(this).children("i").text();
			});
			$(this).children('#bbcode_spoiler_content').replaceWith(function(){
				spoil = '[SPOILER="'+spoilName+'"]'+$.trim($(this).text())+'[/SPOILER]';
			});
			return spoil;
		});
		
		//code PHP
		$content.find('code').reverse().replaceWith(function(){
			return '[PHP]'+$(this).text()+'[/PHP]';
		});
		
		//code 
		$content.find('pre').reverse().replaceWith(function(){
			return '[CODE]'+$(this).text()+'[/CODE]';
		});
		
		//color
		$content.find('span [style^="color"]').reverse().replaceWith(function(){		
			var color = $(this).css('color');
			if(color.indexOf("rgb") !== -1) color = rgbToHex(color);
			return '[COLOR="'+color+'"]'+$(this).html()+'[/COLOR]';
		});
		
		//align
		$content.find('span [style^="display"]').reverse().replaceWith(function(){
			var rata = $(this).css('text-align');
			return '['+rata+']'+$(this).html()+'[/'+rata+']';
		});
		
		
		//font
		$content.find('span [style^="font-family"]').reverse().replaceWith(function(){
			var font = $(this).css('font-family');
			return '[FONT="'+font+'"]'+$(this).html()+'[/FONT]';
		});
		
		//size
		$content.find('span [style^="font-size"]').reverse().replaceWith(function(){
			var size = $(this).css('font-size');
			size = (size == "30px")? "7": (size == "20px")? "6": (size == "16px")? "5": (size == "12px")? "4": (size == "10px")? "3": (size == "9px")? "2": (size == "7px")? "1": "4"; 
			return '[SIZE="'+size+'"]'+$(this).html()+'[/SIZE]';
		});
		
		
		//bold
		$content.find('b').replaceWith(function(){
			return "[B]"+$(this).html()+"[/B]";
		});
		
		//italic
		$content.find('em').replaceWith(function(){
			return "[I]"+$(this).html()+"[/I]";
		});
		
		//underscore
		$content.find('u').replaceWith(function(){
			return "[U]"+$(this).html()+"[/U]";
		});
		return $content;
	}
	
	//jquery function
	jQuery.fn.reverse = [].reverse;//reverse

	function addQQButton(){
		var btnQQ = document.createElement("a");
		var btnMQQ = document.createElement("a");
		var linkText = document.createTextNode("Quick Reply");
		var linkText2 = document.createTextNode("Dobel Quick Reply (Multiple)");
		btnQQ.setAttribute('class','button small white jarak5');
		btnQQ.setAttribute('id','btnQQ');
		btnQQ.appendChild(linkText);
		btnMQQ.setAttribute('class','button small white jarak5');
		btnMQQ.setAttribute('id','btnMQQ');
		btnMQQ.appendChild(linkText2);
		
		for(var i=0;i<document.getElementsByTagName('*').length;i++){
			if(document.getElementsByTagName('*')[i].className == 'user-tools'){
				btnQQClone = btnQQ.cloneNode(true);
				btnMQQClone = btnMQQ.cloneNode(true);
				buttonQRClick(btnQQClone);
				buttonQRClick(btnMQQClone);
				document.getElementsByTagName('*')[i].appendChild(btnMQQClone);
				document.getElementsByTagName('*')[i].appendChild(btnQQClone);
			}
		}
	}//end function addQQbutton
	
	function showQR(){
		$("#forum-listing").after(qr);
	}
	
	function enableMarkItUp(){
		$('#reply-message').markItUp(kaskusBbcodeSettings);
	}
	
	function addTab(){
		$("#QR-wrap2").append(emotContainer);	
	}
	
	function removeBottomBanner(){
		$("div.banner-top-ads:eq(1)").remove();
		$("div.bottom-frame").remove();
	}
	
	function assignCSS(){
		addStyle(""+
		"::selection{background:#3396fe; color:white}::-moz-selection{background:#3396fe; color:white}"+
		"#recaptcha_table,#recaptcha_area{width:310px!important;margin-left:28px;margin-bottom:10px}"+
		"#meja-qr tr td,#meja-qr tr{border:0 none!important;}"+
		".recaptchatable, #recaptcha_area tr, #recaptcha_area td, #recaptcha_area th {line-height: 0;}"+
		"#meja-qr{margin-bottom:0px !important}"+
		"#recaptcha_image{padding:0px 0px!important;}"+
		"#div_emotWrapper .emotTab img{position:absolute;left:-9px;top:-10px}"+
		"#div_emotWrapper{margin-top:-15px;}"+
		"#uploadImageWrapper{margin-left:20px;margin-top:10px;padding-bottom:10px}"+
		"#siggyWrapper{margin-left:20px;margin-top:10px;padding-bottom:10px}"+
		"#gbrCapcay{cursor:pointer; border:3px solid rgb(135,5,0);float:right;margin-bottom:5px}"+
		"#QR-wrap{background: none repeat scroll 0 0 rgba(255, 255, 255, 0.624);"+
			"border-radius: 2px 2px 2px 2px; bottom: -5px; width:936px; "+
			"margin:5px auto 14px; padding:2px}"+
		"#QR-wrap2{border-radius: 5px 5px 5px 5px;"+
			"background:-moz-linear-gradient(center top , #FFFFFF 0%, #EEEEEE 100%) repeat scroll 0 0 transparent;"+
			"background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, white), color-stop(100%, #EEE))}"+
		"#reply-message{width:530px!important; height:300px !important;}"+
		"#btnSaveSiggy{float:right;margin-right:30px;margin-top:5px;display:none}"+
		"#siggyContent{margin-top:10px;}"+
		"#pesan{position:relative;}"+
		"#div_fitur{position:absolute; left:230px; top:31px}"+
		"#btnSettings{margin-top:5px}"+
		"#pilset{margin-bottom:5px !important; padding-top:5px !important;}"+
		"#div_setting{cursor:pointer; border-color:#C5D3DB; border-top-style:solid; border-bottom-style:solid; border-width:1px; color: white; padding: 30px 120px 30px 120px; box-shadow:  0px 0px 50px 20px rgba(50, 50, 50, 0.75)inset !important;  width:96%; height:400px; margin-top:-200px; background-color:#6a6a6a; position:fixed; top:50%; z-index:9999}"+
		"#div_setting h1{font-size:20px; margin-top:5px}"+
		"#div_setting ul{list-style-type: circle; list-style-position:inside;}"+
		
		".pesan{font-size:10px; padding-top:10px; clear:both;}"+
		".capcay_div{padding-right:5px; }"+	
		".emots{cursor:pointer;margin:2px;}"+
		".emots_big{height:40px}"+
		".emotContainer{padding:5px 25px; display:none}"+
		".emotButtonWrapper{padding:5px 15px;}"+
		" #smiliesText{color:rgb(136,136,136); font-size:12px}"+
		".emotTab{font-size:12px;background:#F49011;padding:5px 10px;border-radius:5px 5px 0px 0px;"+
			"color:white; text-shadow:-1px -1px #B76B0E; margin-right:10px;position:relative;}"+	
		".redBox{padding:5px; background:#E51717; color:white; border-radius:3px}"+
		".orangeBorder{border:3px solid rgb(244, 144, 17)}"+
		".blueTrans{background:none repeat scroll 0pt 0pt rgba(69, 123, 183, 0.75) !important}"+
		".orangeTrans{background:none repeat scroll 0pt 0pt rgba(244, 144, 17, 0.75) !important}"+
		".oranye{background:#F49011}"+
		".listPesan{list-style-type:circle; list-style-position:inside}"+	
		".clear_both{clear:both; !important}"+
		".rbSiggy{margin-left:15px !important;}"+
		".options{font-size:10px;}"+	
		".timer{font-family:impact; color:#457BB7; text-align:right; padding-right:10px; margin-top:45px;}"+
		".fitur-separator{background-color:#CCCCCC; height:16px; margin:3px 10px 0px 0px; overflow:hidden; width: 1px; float:left;}"+
		".cursor{cursor:pointer}"+
		".kanan{float:right;}"+
		".transparan{opacity:0.6} .transparan:hover{opacity:1}"+	
		".jarak5{margin-left:5px}"+	
		".markItUpHeader{width:528px !important;}"+
		".blue{color:rgb(255,255,255) !important}"+
		".clear_left{float:none !important; clear:left !important}"+
		".ajaxAnim{content:url('"+AJAXLOAD_IMAGE_URL+"')}"+
		// post style 
		".kolorButton{width:24px; height:24px; float:left; margin:1px 2px; border-radius:3px 3px 3px 3px; border: 1px solid #CCCCCC; cursor:pointer}"+
		".kolorButton:hover{border: 1px solid #000000;}"+
		".kolorButton a{display:none}"+
		'.fontSelected{position:relative; background:white; width:100px; padding:5px 10px 5px 10px; border:1px solid rgb(214,214,214); cursor:pointer}'+
		".fontList{border-bottom:1px solid rgb(214,214,214); padding:5px 10px 5px 10px; cursor:pointer}"+
		".fontList:hover{background:rgb(214,214,214)}"+
		"#fontTypeList{border:1px solid rgb(214,214,214); width:120px; background:rgb(246,246,246); position:absolute; z-index:99}"+
		"#div_wrapperStylePreview{ width:600px; height:225px;margin-left:275px}"+
		'#div_stylePreview{padding:30px 15px 30px 15px; background:#FAFAFA; border:1px solid rgb(214,214,214); height:135px; font-size:12px}'+
		"#div_styleSetting{width:250px; float:left;}"+
		"#txtChosenColor{font-weight:bold; width:115px !important; background:#b8c5cc}"
		);
	}
	
	function insertAtCursor(myValue) {
		var myField = document.getElementById('reply-message');
		if (document.selection) {
			myField.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
		}
		else if (myField.selectionStart || myField.selectionStart == '0') {
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			var textSelected = myField.value.substring(startPos, endPos);
			if(myValue == "[B]"){			
				myField.value = myField.value.substring(0, startPos)+"[B]"+textSelected+"[/B]"+ myField.value.substring(endPos, myField.value.length);
			}
			else if(myValue == "[I]"){			
				myField.value = myField.value.substring(0, startPos)+"[I]"+textSelected+"[/I]"+ myField.value.substring(endPos, myField.value.length);
			}
			else if(myValue == "[U]"){			
				myField.value = myField.value.substring(0, startPos)+"[U]"+textSelected+"[/U]"+ myField.value.substring(endPos, myField.value.length);
			}
			else{
				myField.value = myField.value.substring(0, startPos)+myValue+ myField.value.substring(endPos, myField.value.length);
			}
			
		} else {
			myField.value += myValue;
		}
	}
	
	function addStyle(css) {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			 var node = document.createElement("style");
			 node.type = "text/css";
			 node.appendChild(document.createTextNode(css));
			 heads[0].appendChild(node);
		}
	}
	
	function hideAllTab(){
		$("#div_emotSmall").hide();
		$("#div_emotBig").hide();
		$("#siggyWrapper").hide();
	}
	
	function BBC2HTML(S) {
	if (S.indexOf('[') < 0) return S;

		function X(p, f) {return new RegExp(p, f)}
		function D(s) {return rD.exec(s)}
		function R(s) {return s.replace(rB, P)}
		function A(s, p) {for (var i in p) s = s.replace(X(i, 'g'), p[i]); return s;}
		
		function P($0, $1, $2, $3) {
		  if ($3 && $3.indexOf('[') > -1) $3 = R($3);
		  switch ($1) {
		    case 'URL':case 'anchor':case 'email': return '<a '+ L[$1] + ($2||$3) +'">'+ $3 +'</a>';
		    case 'IMG': var d = D($2); return '<img src="'+ $3 +'"'+ (d ? ' width="'+ d[1] +'" height="'+ d[2] +'"' : '') +' alt="'+ (d ? '' : $2) +'" />';
		    case 'FLASH':case 'YOUTUBE': var d = D($2)||[0, 425, 366]; return '<object type="application/x-shockwave-flash" data="'+ Y[$1] + $3 +'" width="'+ d[1] +'" height="'+ d[2] +'"><param name="movie" value="'+ Y[$1] + $3 +'" /></object>';
		    case 'float': return '<span style="float: '+ $2 +'">'+ $3 +'</span>';
		    case 'left':case 'right':case 'center':case 'justify': return '<div style="text-align: '+ $1 +'">'+ $3 +'</div>';
		    case 'google':case 'wikipedia': return '<a href="'+ G[$1] + $3 +'">'+ $3 +'</a>';
		    case 'B':case 'I':case 'U':case 's':case 'sup':case 'sub':case 'h1':case 'h2':case 'h3':case 'h4':case 'h5':case 'h6':case 'table':case 'tr':case 'th':case 'td': return '<'+ $1 +'>'+ $3 +'</'+ $1 +'>';
		    case 'row': case 'r':case 'header':case 'head':case 'h':case 'col':case 'c': return '<'+ T[$1] +'>'+ $3 +'</'+ T[$1] +'>';
		    case 'acronym':case 'abbr': return '<'+ $1 +' title="'+ $2 +'">'+ $3 +'</'+ $1 +'>';
		  }
		  return '['+ $1 + ($2 ? '='+ $2 : '') +']'+ $3 +'[/'+ $1 +']';
		}
		
		var rB = X('\\[([A-z][A-Z0-9]*)(?:=([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'g'), rD = X('^(\\d+)x(\\d+)$');
		var L = {url: 'href="', 'anchor': 'name="', email: 'href="mailto: '};
		var G = {google: 'http://www.google.com/search?q=', wikipedia: 'http://www.wikipedia.org/wiki/'};
		var Y = {youtube: 'http://www.youtube.com/v/', flash: ''};
		var T = {row: 'tr', r: 'tr', header: 'th', head: 'th', h: 'th', col: 'td', c: 'td'};
		var C = {notag: [{'\\[': '&#91;', ']': '&#93;'}, '', ''], code: [{'<': '&lt;'}, '<code><pre>', '</pre></code>']};
		C.php = [C.code[0], C.code[1]+ '&lt;?php ', '?>'+ C.code[2]];
		var F = {font: 'font-family:$1', size: 'font-size:$1px', color: 'color:$1'};
		var U = {c: 'circle', d: 'disc', s: 'square', '1': 'decimal', a: 'lower-alpha', A: 'upper-alpha', i: 'lower-roman', I: 'upper-roman'};
		var I = {}, B = {};
		
		for (var i in C) I['\\[('+ i +')]((?:.|[\r\n])*?)\\[/\\1]'] = function($0, $1, $2) {return C[$1][1] + A($2, C[$1][0]) + C[$1][2]};
		for (var i in F) {B['\\['+ i +'=([^\\]]+)]'] = '<span style="'+ F[i] +'">'; B['\\[/'+ i +']'] = '</span>';}
		B['\\[list]'] = '<ul>'; B['\\[list=(\\w)]'] = function($0, $1) {return '<ul style="list-style-type: '+ (U[$1]||'disc') +'">'}; B['\\[/list]'] = '</ul>'; B['\\[\\*]'] = '<li>';
		B['\\[QUOTE(?:=([^\\]]+))?]'] = function($0, $1) {return '<div class="bb-quote">'+ ($1 ? 'Original Posted By '+ $1 +' wrote' : 'Quote') +':'}; B['\\[/QUOTE]'] = '</div>';
		B['\\[(hr|br)]'] = '<$1 />'; B['\\[sp]'] = '&nbsp;';
		return R(A(A(S, I), B));
	}
	
	
	function showCapcay(timer) {
		var script = document.createElement('script');
    	script.setAttribute("type", "application/javascript");
    	var perintah = 'Recaptcha.create("6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d","recaptcha_widget",{theme:"custom"});';
    	script.textContent = perintah;
    	setTimeout(function(){
    		document.body.appendChild(script);
    		$("#gbrCapcay").hide();}
    		,timer);	
	}
		
	function autoUpdate(){
		// Script Update Checker http://userscripts.org/scripts/show/20145
		//min ver
		/*
		 var SUC_script_num = 128092; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
		*/

		
		var SUC_script_num = 128092; // Change this to the number given to the script by userscripts.org (check the address bar)

		try
		{
			function updateCheck(forced)
			{
				if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
				{
					try
					{
						GM_xmlhttpRequest(
						{
							method: 'GET',
							url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
							headers: {'Cache-Control': 'no-cache'},
							onload: function(resp)
							{
								var local_version, remote_version, rt, script_name;
								
								rt=resp.responseText;
								GM_setValue('SUC_last_update', new Date().getTime()+'');
								remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
								local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
								if(local_version!=-1)
								{
									script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
									GM_setValue('SUC_target_script_name', script_name);
									if (remote_version > local_version)
									{
										if(confirm('Versi baru KaskusQuickReply telah tersedia. \nInstall sekaran?'))
										{
											GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
											GM_setValue('SUC_current_version', remote_version);
										}
									}
									else if (forced)
										alert('Belum ada update untuk "'+script_name+'."');
								}
								else
									GM_setValue('SUC_current_version', remote_version+'');
							}
						});
					}
					catch (err)
					{
						if (forced)
							alert('An error occurred while checking for updates:\n'+err);
					}
				}
			}
			GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
			{
				updateCheck(true);
			});
			updateCheck(false);
		}
		catch(err)
		{}
}
	var scriptUploadGambar = function uploadGambar()
	{
		$("#loading")
		.ajaxStart(function(){
			$(this).show();
		})
		.ajaxComplete(function(){
			$(this).hide();
		});
		
		$.ajaxFileUpload(
		{
		url:'http://www.kaskus.co.id/misc/upload_image',
		secureuri:false,
		fileElementId:'browse',
		dataType: 'json',
		success: function (data, status){
		if(data.status == 'ok'){
			$('#preview-image').append('<img class="unggahan" src="'+data.url+'" width="46" height="46" alt="[img]'+data.url+'[/img]" style="cursor: pointer; " />');
			var imgCode = '[img]'+data.url+'[/img]';
			var myField = document.getElementById('reply-message');
			myField.value += imgCode;
			$('#browse').val("");		
		}
		else{
			alert("Server kaskus lagi lemot gan, silahkan coba beberapa saat lagi");
			}		
		},
		error: function (data, status, e){
			alert(e);
			}
		}
		);
		
		return false;
	} 
	
	function callUploadGambar() {
		var script = document.createElement('script');
    	script.setAttribute("type", "application/javascript");
    	script.textContent = 'uploadGambar()';
    	document.body.appendChild(script);
    	
	}
	
	
	function injekUploadGambar(skrup){
		var script = document.createElement('script');
    	script.setAttribute("type", "application/javascript");
    	script.textContent = skrup.toString();
    	document.body.appendChild(script);
	}
	function updateSiggyContent(){
			$("#siggyContent").text(getSignature());
	}
	function storeSignature(siggy,status){
		localStorage.setItem("QR_siggy"+status,siggy);
		localStorage.setItem("QR_temp_siggy",siggy);
	}
	
	function getSignature(status){
		return localStorage.getItem("QR_temp_siggy");
	}
	function setUseSiggy(status){
		localStorage.setItem("QR_use_siggy",status);
	}
	function getUseSiggy(){
		return localStorage.getItem("QR_use_siggy");
	}
	function setTempSiggy(siggy){
		localStorage.setItem("QR_temp_siggy",siggy);
	}
	function getTempSiggy(){
		return localStorage.getItem("QR_temp_siggy");
	}
	function setSiggy1(siggy){
		localStorage.setItem("QR_siggy1",siggy);
	}
	function getSiggy1(){
		return localStorage.getItem("QR_siggy1");
	}
	function setSiggy2(siggy){
		localStorage.setItem("QR_siggy2",siggy);
	}
	function getSiggy2(){
		return localStorage.getItem("QR_siggy2");
	}
	function setSiggy3(siggy){
		localStorage.setItem("QR_siggy3",siggy);
	}
	function getSiggy3(){
		return localStorage.getItem("QR_siggy3");
	}
	function setRBSiggy(status){
		if (status=="0"){
			$("#sigOff").prop("checked",true);
		}
		else if (status=="1"){
			$("#sig1").prop("checked",true);
		}
		else if (status=="2"){
			$("#sig2").prop("checked",true);
		}
		else if (status=="3"){
			$("#sig3").prop("checked",true);
		}
	}
	function setLastTimePost(waktu){
		localStorage.setItem("QR_lastTimePost",waktu);
	}
	function getLastTimePost(){
		return localStorage.getItem("QR_lastTimePost");
	}
	function getTimeDiff(){
		var now = new Date();
		now = Math.floor(now/1000);
		var lastPost = localStorage.getItem("QR_lastTimePost");
		diff = now-lastPost
		return diff;
	}
	
	function showTimer(){//baekin
		timer = setInterval(decrementSecond,1000);			
	}
	
	function decrementSecond(){	
		var sisa = MINIMUM_TIME - getTimeDiff();		
		if(sisa<1){
			pesan = "";	
			$("#timer_div").html("&nbsp");
			clearInterval(timer);
		}	
		else{
			$("#timer_div").html(sisa);	
		}
	}
	
	function setPPS(pps){
		localStorage.setItem("QR_pps",pps);
	}
	function getPPS(){
		return localStorage.getItem("QR_pps");
	}	
	function setPostStyleStatus(status){
		localStorage.setItem("QR_postStyleStatus",status);
	}
	function getPostStyleStatus(){
		return localStorage.getItem("QR_postStyleStatus");
	}
	function setPostStyleSetting(setting){
		localStorage.setItem("QR_postStyleSetting",setting);
	}
	function getPostStyleSetting(){
		return localStorage.getItem("QR_postStyleSetting");
	}
	function setPostStyleTemplate(template){
		localStorage.setItem("QR_postStyleTemplate",template);
	}
	function getPostStyleTemplate(){
		return localStorage.getItem("QR_postStyleTemplate");
	}
	function setPostStyleSettings(){
		var styleSetting = getPostStyleSetting().split(",");
		if(styleSetting[0]=="0"){
			$("li.fontSelected").text("None");	
		}
		else{
			$("li.fontSelected").text(styleSetting[0]);
		}
		if(styleSetting[1]=="1"){
			$("#cbBold").prop("checked",true);
		}
		if(styleSetting[2]=="1"){
			$("#cbItalic").prop("checked",true);
		}
		if(styleSetting[3]=="1"){
			$("#cbUnderline").prop("checked",true);
		}
		if(styleSetting[4]=="0"){
			$("#rbAlignLeft").prop("checked",true);
		}
		if(styleSetting[4]=="1"){
			$("#rbAlignCenter").prop("checked",true);
		}
		else if(styleSetting[4]=="2"){
			$("#rbAlignRight").prop("checked",true);
		}
		if(styleSetting[5]!="0"){
			$("#txtChosenColor").val(styleSetting[5]);
			$("#txtChosenColor").css("color",styleSetting[5]);
		}
	}
	function updatePostStyleSetting(arrNum,value){
		var oldSetting = getPostStyleSetting().split(",");
		oldSetting[arrNum] = value;
		var newSetting="";
		//merge back
		for(i=0; i<6; i++){
			newSetting +=oldSetting[i]+",";
		}
		setPostStyleSetting(newSetting);
		updatePostStylePreview();
	}
	function updatePostStylePreview(){
		var setting = getPostStyleSetting().split(",");
		var temp = loremIpsum;
		var tempe = styleTemplate;
		if(setting[0]!="0"){
			temp = '<font face="'+setting[0]+'">'+ loremIpsum +'</font>';
			tempe = '[FONT="'+setting[0]+'"]'+tempe+'[/FONT]';
		}
		if(setting[1]=="1"){
			temp = '<b>'+temp+'</b>';
			tempe = '[B]'+tempe+'[/B]';
		}
		if(setting[2]=="1"){
			temp = '<i>'+temp+'</i>';
			tempe = '[I]'+tempe+'[/I]';
		}
		if(setting[3]=="1"){
			temp = '<u>'+temp+'</u>';
			tempe = '[U]'+tempe+'[/U]';
		}
		if(setting[4]=="1"){
			temp = '<div align="center">'+temp+'</div>';
			tempe = '[CENTER]'+tempe+'[/CENTER]';
		}
		else if(setting[4]=="2"){
			temp = '<div align="right">'+temp+'</div>';
			tempe = '[RIGHT]'+tempe+'[/RIGHT]';
		}
		if(setting[5]!="0"){
			temp = '<font color="'+setting[5]+'">'+temp+'</font>';
			tempe = '[color='+setting[5]+']'+tempe+'[/color]';
		}
		$("#div_stylePreview").html(temp);
		setPostStyleTemplate(tempe);
	}
	
	function rgbToHex(colorStr){
	    var hex = '#';
	    $.each(colorStr.substring(4).split(','), function(i, str){
	        var h = ($.trim(str.replace(')',''))*1).toString(16);
	        hex += (h.length == 1) ? "0" + h : h;
	    });
	    return hex;
	};
	function Mainkan(){
		//############### variable setup #######################
		var DEFAULT_SIGGY = '[B][RIGHT][FONT="Comic Sans MS"][size="3"][color=#FF0000]Or[/color][color=#CA0034]ig[/color][color=#950069]in[/color][color=#60009E]al[/color][color=#2B00D3] P[/color][color=#0408F6]os[/color][color=#1E3DC1]te[/color][color=#39728C]d [/color][color=#53A757]by[/color][color=#6EDB23] :[/color][color=#88ED00] N[/color][color=#A3B800]ic[/color][color=#BD8300]ol[/color][color=#D74F00]aa[/color][color=#F11A00]a[/color] [color=#CC9966](6[/color][color=#88BB22]04[/color][color=#77CC54]73[/color][color=#99CCFF]83[/color][color=#BBAA99])[/color][/size]
[size="1"][color=#CC9966]Wa[/color][color=#B2A54C]nt[/color][color=#99B233] b[/color][color=#7FBF19]e [/color][color=#66CC00]fr[/color][color=#72CC3F]ie[/color][color=#7FCC7F]nd[/color][color=#8CCCBF] w[/color][color=#99CCFF]it[/color][color=#A5BFD8]h [/color][color=#B2B2B2]me[/color][color=#BFA58C]? [/color][URL="http://www.kaskus.co.id/profile/beafriend/6047383"]click here![/URL][/size][/FONT][/RIGHT][/B]';
		var temp_siggy = "\n";
		var use_siggy = "1";
		var siggy1 = DEFAULT_SIGGY;
		var siggy2 = DEFAULT_SIGGY;
		var siggy3 = DEFAULT_SIGGY;
		var lastTimePost = 0;
		var pps_text = "";
		var styleSetting = "0,0,0,0,0,0";
		var styleTemplate = "template";
		//############### Siggy local storage setup #################
		if(getSignature()==null){
			storeSignature(DEFAULT_SIGGY);
		}
		if((getUseSiggy()==null) || (getUseSiggy()=="true")){//next update delete nih
			setUseSiggy(use_siggy);
		}
		if((getTempSiggy()==null)){
			setTempSiggy(DEFAULT_SIGGY);
		}
		if((getSiggy1()==null)||(getSiggy1()=="")){
			setSiggy1(siggy1);
		}
		if((getSiggy2()==null)||(getSiggy2()=="")){
			setSiggy2(siggy2);
		}
		if((getSiggy3()==null)||(getSiggy3()=="")){
			setSiggy3(siggy3);
		}
		
		//################# Post Timer Setup ##################
		if(getLastTimePost()==null){
			var now = new Date();
			now = Math.floor(now/1000);
			setLastTimePost(now);
		}
		
		//################# Post style local storage setup #############
		if((getPostStyleStatus()==null) || (getPostStyleStatus()=="")){
			setPostStyleStatus("0");
		}
		if((getPostStyleSetting()==null) || (getPostStyleSetting()=="")){
			setPostStyleSetting(styleSetting);
		}
		if((getPostStyleTemplate()==null) || (getPostStyleTemplate()=="")){
			getPostStyleTemplate(styleTemplate);
		}
		//############## call necessary functions #############
		injekUploadGambar(scriptUploadGambar);
		autoUpdate();
		assignCSS();
		hideDefaultQRButton();
		addQQButton();
		showQR();
		enableMarkItUp();
		addTab();
		assignEmotClick();
		setRBSiggy(getUseSiggy());
		showCapcayUW(10000);
		$("#gbrCapcay").click(function(){
			showCapcayUW(100);
		});
		updateSiggyContent();
		removeBottomBanner();
		//################ Siggy related code ##################
		$("#sigOff").click(function(){
			setUseSiggy(0);
			setTempSiggy("\n");
			updateSiggyContent();
			$("#btnEditSiggy").hide();
		})
		$("#sig1").click(function(){
			setUseSiggy(1);
			setTempSiggy(getSiggy1());
			updateSiggyContent();
			$("#btnEditSiggy").show();
		})
		$("#sig2").click(function(){
			setUseSiggy(2);
			setTempSiggy(getSiggy2());
			updateSiggyContent();
			$("#btnEditSiggy").show();
		})
		$("#sig3").click(function(){
			setUseSiggy(3);
			setTempSiggy(getSiggy3());
			updateSiggyContent();
			$("#btnEditSiggy").show();
		})
		
		$("#btnEditSiggy").click(function(){
			$("#btnSaveSiggy").show();
			$("#reply-message").val(getSignature());
			$("#reply-message").focus();
			$("#QR-wrap").addClass("orangeTrans");
		});
		
		$("#btnSaveSiggy").click(function(){
			var sig = $("#reply-message").val();
			$("#reply-message").removeClass("orangeBorder");
			$("#QR-wrap").removeClass("orangeTrans");
			$("#reply-message").val("");
			$(this).hide();
			storeSignature(sig,getUseSiggy());
			updateSiggyContent();
			alert ("Siggy berhasil disimpan");
		});
		
		//################ tabs clicks #########################
		$("#besar").click(function(){
			$("#div_emotSmall").hide();	
			$("#siggyWrapper").hide();	
			$("#uploadImageWrapper").hide();
			$("#styleWrapper").hide();	
			$("#div_emotBig").fadeToggle('slow');		
			//scrollToQR();				
		});
		$("#kecil").click(function(){
			$("#div_emotBig").hide();
			$("#siggyWrapper").hide();
			$("#uploadImageWrapper").hide();
			$("#styleWrapper").hide();
			$("#div_emotSmall").fadeToggle('slow');	
			//scrollToQR();					
		});
		$("#unggah").click(function(){
			$("#div_emotSmall").hide();	
			$("#div_emotBig").hide();
			$("#siggyWrapper").hide();		
			$("#styleWrapper").hide();	
			$("#uploadImageWrapper").toggle();
			//scrollToQR();			
		});
		$("#siggy").click(function(){
			$("#div_emotSmall").hide();	
			$("#div_emotBig").hide();
			$("#uploadImageWrapper").hide();
			$("#styleWrapper").hide();
			$("#siggyWrapper").toggle();			
			if(getUseSiggy()=="0"){
				$("#btnEditSiggy").hide();
			}
			//scrollToQR();			
			updateSiggyContent();
		});
		$("#gaya").toggle(function(){
			$("#div_emotSmall").hide();	
			$("#div_emotBig").hide();
			$("#uploadImageWrapper").hide();
			$("#siggyWrapper").hide();	
			$("#styleWrapper").show();
			if(getPostStyleStatus()=="0"){
				$("#rbPostStyleOff").prop("checked",true);
				$("#div_styleContainer").hide();
			}
			else{
				$("#rbPostStyleOn").prop("checked",true);
				setPostStyleSettings();
				updatePostStylePreview();
				$("#div_styleContainer").show();
				scrollToStyle();
			}
		}, function(){
			$("#styleWrapper").hide();
			scrollToQR();
		});
		//############### reply box on focus #######################
		$("#reply-message").focus(function(){
			$("#QR-wrap").addClass("blueTrans");
			clearInterval(timer);
			showTimer();
		});
		$("#reply-message").blur(function(){
			$("#QR-wrap").removeClass("blueTrans");
		});
		//############### upload image codes#########################
		//$("#browse").on("blur",function(){
			//ajaxFileUpload();
		//});
		$("#btnUnggah").on("click",function(){
			if($("#browse").val()==""){
				alert("Pilih file gambar dulu baru upload");
			}
			else{
				callUploadGambar();
			}
		});
	    $("#preview-image").on("click","img",function(event){
	    	insertAtCursor($(this).attr("alt"));
	    });
	    
	    //################# QR Settings #######################
	    $("#btnSettings").click(function(){
	    	$("#div_setting").toggle();
	    });
	    $("#div_setting").click(function(){
	    	$("#div_setting").hide();
	    })
	    //########## Fitur tambahan Markitup ###############
	    $("#pps").click(function(){
	    	//alert("taik");
	    	var pps=getPPS();
	    	if ((pps == "") || (pps == null)){   		
	    		alert("Post sebelumnya belum tersimpan")
	    	}
	    	else {
	    		insertAtCursor(pps);
	    		$("#reply-message").focus();
	    	}
	    })
	    
	    //############ Style related code ###############
	    $("#rbPostStyleOn").click(function(){
			setPostStyleStatus("1");
			setPostStyleSettings();
			$("#div_styleContainer").show();
			scrollToStyle();
		})
		
		$("#rbPostStyleOff").click(function(){
			setPostStyleStatus("0");
			$("#div_styleContainer").hide();
		})
		
	    $("li.kolorButton").each(function(){
	    	var warna = $(this).text();
	    	$(this).css("background-color",warna);
	    });
	    $("li.kolorButton").click(function(){
	    	var warna = $(this).text();
	    	$("#txtChosenColor").val(warna);
	    	$("#txtChosenColor").blur();
	    })
	    $("#txtChosenColor").blur(function(){
	    	$("#txtChosenColor").css("color",$("#txtChosenColor").val());
	    	updatePostStyleSetting(5,$("#txtChosenColor").val());
	    })
	    $("li.fontSelected").hover(function(){
	    	$("#fontTypeList").show();
	    },
	    function(){
	    	$("#fontTypeList").hide();
	    }
	    )
	    $("#fontTypeList").hover(function(){
	    	$("#fontTypeList").show();
	    },
	    function(){
	    	$("#fontTypeList").hide();
	    }
	    )
	    $("li.fontList").click(function(){
	    	var font = $(this).html();
	    	$("li.fontSelected").html(font);
	    	updatePostStyleSetting(0,$(this).text());
	    	$("#fontTypeList").hide();
	    })
	    $("#cbBold").click(function(){
	    	var cek = $(this).attr("checked");
	    	if(cek=="checked"){
	    		updatePostStyleSetting(1,"1");
	    	}
	    	else{
	    		updatePostStyleSetting(1,"0");
	    	}
	    })
	    $("#cbItalic").click(function(){
	    	var cek = $(this).attr("checked");
	    	if(cek=="checked"){
	    		updatePostStyleSetting(2,"1");
	    	}
	    	else{
	    		updatePostStyleSetting(2,"0");
	    	}
	    })
	    $("#cbUnderline").click(function(){
	    	var cek = $(this).attr("checked");
	    	if(cek=="checked"){
	    		updatePostStyleSetting(3,"1");
	    	}
	    	else{
	    		updatePostStyleSetting(3,"0");
	    	}
	    })
	    $("#rbAlignLeft").click(function(){
	    	updatePostStyleSetting(4,"0");
	    })
	    $("#rbAlignCenter").click(function(){
	    	updatePostStyleSetting(4,"1");
	    })
	    $("#rbAlignRight").click(function(){
	    	updatePostStyleSetting(4,"2");
	    })
	    //######### Preview click #########
	    $("#preview").click(function(){
	    	isPreview = true;
	    });
		//########## on submit ############
		$("#postreply").submit(function(){
			var minimalChars = $("#reply-message").val();
			var pps = minimalChars;
			if((getPostStyleStatus()=="1") && (postAttemp == 0)){
				var temp = getPostStyleTemplate();
				minimalChars = temp.replace("{post}", minimalChars);
			}
			if((getUseSiggy()!="0") && (postAttemp == 0))
				minimalChars += "\n\n\n\n"+getTempSiggy();
			
			if(minimalChars.length<6){
				alert("Posting harus lebih dari 5 karakter gan");
				$("#reply-message").focus();
				return false;
			}		
			
			$("#reply-message").val(minimalChars);
			setPPS(pps);
			
			if(isPreview==true){
				//var a = null;
				//alert(BBC2HTML(minimalChars));
				//a = BBC2HTML(minimalChars)
				//alert(a);
				//$("#div_emotWrapper").append(BBC2HTML(minimalChars));
				return true;
			}
			
			
			// ### posting via ajax
			capcayRespon = $("#recaptcha_response_field").val();
			// celeng = Recaptcha.get_challenge();
			// respong = Recaptcha.get_response();
			celeng = $("#recaptcha_challenge_field").val();
			respong = $("#recaptcha_response_field").val();
			$("#imgSetNLoad").attr("src",AJAXLOAD_IMAGE_URL);
			$("#ajaxStat").show();
			minimalChars= encodeURIComponent(minimalChars);
			datum = "message="+minimalChars+"&securitytoken="+jimat+"&recaptcha_challenge_field="+celeng+"&recaptcha_response_field="+respong+"&parseurl=1";
			GM_log("data:"+datum);
			GM_xmlhttpRequest({
  				method: "POST",
  				url: postURL,
  				data: datum,
  				headers: {
   						"Content-Type": "application/x-www-form-urlencoded"
  			},
  			onload: function(response) {
  				respon = response.responseText;
  				postAttemp = 1;
  				if(respon.search("Thank you") != -1){
  					GM_log("Post Success: ");
  					//timer
					var now = new Date();
					now = Math.floor(now/1000);
					setLastTimePost(now);	
  					//location.reload();	
  					var lastPage = postURL.replace("post_reply","lastpost");
  					window.location.href = lastPage;				
  				}
  				else if(respon.search("token was invalid") != -1){
  					GM_log("token invalid");
  					window.location.href = postURL;
  					
  				}
  				else if(respon.search("not match") != -1){//capcay salah
  					GM_log("Capcay false: ");			
  					$("#imgSetNLoad").attr("src",SETTING_IMAGE_URL);
  					$("#ajaxStat").hide();
  					$("#capcayErrorMsg").show().fadeOut(7000);				
  					var dt = document.implementation.createDocumentType("html","-//W3C//DTD HTML 4.01 Transitional//EN","http://www.w3.org/TR/html4/loose.dtd");
				    var doc = document.implementation.createDocument('', '', dt);
				    var htm = doc.createElement('html');
				    htm.innerHTML = respon;
				    doc.appendChild(htm);
				    jimat = doc.getElementsByName('securitytoken')[0].value;
  					Recaptcha.reload();
  				}
  				else{
  					window.location.href = postURL;
  					GM_log("gagal lain");		
  				}
  			}
			});
			return false;
		
		});
		
	}
	//################ START #######################
	Mainkan();
	
});//end onReady