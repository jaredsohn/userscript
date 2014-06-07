scr_meta=<><![CDATA[
// ==UserScript==
// @name           kaskus Beta Quick Reply
// @namespace      addemo
// @version        1.1.4.3
// @description    quick reply for kaskus beta
// @include        http://livebeta.kaskus.co.id/thread/*
// @include        http://livebeta.kaskus.co.id/post/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://kkcdn-static.kaskus.co.id/css_v0.1/js/editor/jquery.markitup.js
// @require        http://kkcdn-static.kaskus.co.id/css_v0.1/js/editor/kaskus_bbcode.js
// @author         addemo
// @co-author      addemo
// ==/UserScript==
]]></>.toString();
//
// Changelog:
// V 1.1.4.3 (30-Juni-2012)
// Kasbet fix due to new skin
// 
// V 1.1.4.2 (20-Juni-2012)
// Quote dalam quote (1 level only)
//
// V 1.1.4.1 (16-Juni-2012)
// Fix new line in Quote
//
// V 1.1.4 (15-Juni-2012)
// Paste Post Sebelumnya
//
// V 1.1.3.9 (11-Juni-2012)
// judul spoiler dalam quote sekarang sudah benar
// quote video youtube
// 
// V 1.1.3.8 (10-Juni-2012)
// Another domain fix
//
// V 1.1.3.7 (27-Mei-2012)
// Kaskus domain fix
//
// V 1.1.3.6 (25-April-2012)
// Upload for chrome fix
// Post timer delay info
//
// V 1.1.3.5 (16-April-2012 )
// Fitur Upload
// Automatically parse link and youtube video
// Siggy off bug fix
//
// V 1.1.3.4 (7-April-2012 Sore)
// Siggy off bug fix
//
// For full changelog, please visit: http://userscripts.org/scripts/show/128092

    
//################ attach recapcay script #################
	var myscript2= document.createElement('script');
	myscript2.setAttribute('src','http://www.google.com/recaptcha/api/js/recaptcha_ajax.js');
	document.body.appendChild(myscript2);
	
	var ajax_file_upload = document.createElement('script');
	ajax_file_upload.setAttribute('src','http://kkcdn-static.kaskus.co.id/css_v0.1/js/ajaxfileupload.js');
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
	var temp_min_time = MINIMUM_TIME;
	var timer;
	var IMG_PPS = "http://kkcdn-static.kaskus.co.id/images/2012/06/15/477924_20120615025448.png";
	//################### Init Setup ################################
	
    $("div.quick-reply").remove();
	var jimat = document.getElementById('securitytoken').value;
	var postURL = $('#act-post').attr('href');
	var target = document.getElementById("thread-footer");
	var capcayKey = "6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d";
	//var target = document.getElementsByTagName("new-reply");
	var qr = document.createElement("div");
	
	qr.innerHTML=''+
	'<a href="#" name="aQR" id="aQR"></a>'+
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
					'<a tabindex="99" id="btnSettings" class="kanan transparan" href="javascript:void(0);"><img src="http://kkcdn-static.kaskus.co.id/images/2012/06/26/4098625_20120626050027.png" title="Settings"></a>'+
					'<div id="timer_div" class="timer">&nbsp</div>'+	
						'<div class="capcay_div">'+
							'<fieldset class="fieldset">'+
							 	'<div dir="ltr">'+
								'<div style="" id="recaptcha_widget_div" class="recaptcha_nothad_incorrect_sol recaptcha_isnot_showing_audio">'+ 
								//##### gbr capcay asli ###############
									'<div id="div_gbrCapcay">'+
										'<img id="gbrCapcay" src="http://kkcdn-static.kaskus.co.id/images/477924_20120312043814.jpg"><div class="clear_both"></div>'+
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
							  '<input type="submit" accesskey="r" value="Post Quick Reply" name="sbutton" class="button medium blue" style="float:right">'+
							  '<input type="submit" accesskey="s" value="Preview Post" name="preview" class="button medium white" style="float:right;margin:0px 5px;">'+							  
							  '<input type="checkbox" value="1" checked="checked" name="parseurl" style="display:none">'+
							  //############ tips ###########
							  '<div class=pesan><p>Tips:</p><p>*Save siggy dahulu sebelum melakukan preview</p><p>*Jika muncul gambar capcay, klik saja</p><p>*Setelah ketik postingan, tekan TAB biar langsung isi capcay, setelah isi capcay tekan enter</p><p>*Buka semua spoiler dengan SHIFT+A</p></div>'+
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
	'</div>'//end of all emot wrapper
	
	;
	//######################### Shortcuts ########################
	
	//############### CTRL+Q Go to QR ################
	var isCtrl = false;
	var togel = false;
	$(document).keyup(function (e) {
		if(e.which == 17) isCtrl=false; //CTRL
		}).keydown(function (e) {
			if(e.which == 17) isCtrl=true;
			if(e.which == 81 && isCtrl == true) //Q
			{
				window.location.hash="aQR";
				document.getElementById('reply-message').focus();
				return false;
			}
	});
	
	//############### CTRL+Enter Submit post################
	var isCtrl = false;
	var togel = false;
	$(document).keyup(function (e) {
		if(e.which == 17) isCtrl=false; //CTRL
		}).keydown(function (e) {
			if(e.which == 17) isCtrl=true;
			if(e.which == 13 && isCtrl == true) //enter
			{
				$("#postreply").submit();
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
				Recaptcha.create(capcayKey,"recaptcha_widget_div",{theme:"red"});
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
			var $entryContent = postParent.find(".entry").clone();
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
				window.location.hash="aQR";
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
	
	function parseHTMLtoBB($content){
		
		// clear non-content post
		$content.find(".edited").empty();
		$content.find("h1").empty();//post title
		$content.find('span.post-quote span:first-child').empty();//remove quote header text
		
		//quote 1 level
		var arrow = "http://kkcdn-static.kaskus.co.id/images/2012/06/20/477924_20120620080717.png";
		$content.find('span.post-quote span:last-child').replaceWith(function(){
			$(this).find('span.post-quote').empty();//empty next level quote			
			var quote = "[quote]"+$(this).html()+"[/quote]";		
			return quote;
		});
		$content.find('a.jump').replaceWith(function(){
			return ' [URL="'+$(this).attr('href')+'"]'+'[img]'+arrow+'[/img]'+'[/URL]';
		});
		//quote all level
		// $content.find('span.post-quote span:last-child').reverse().replaceWith(function(){
			// var quote = "[quote]"+$(this).html()+"[/quote]";		
			// return quote;
		// });
		
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
			return "[youtube]"+code[4]+"[/youtube]";
			
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
		
		//font
		$content.find('font').reverse().replaceWith(function(){
			var size = $(this).attr('size');
			var color = $(this).attr('color');
			var face = $(this).attr('face');
			if(size!=undefined){
				return'[size="'+size+'"]'+$(this).html()+'[/size]';
				
			}
			if(color!=undefined){
				return '[color="'+color+'"]'+$(this).html()+'[/color]';
				
			}
			if(face!=undefined){
				return '[font="'+face+'"]'+$(this).html()+'[/font]';
				
			}
		});
		
		return $content;
	}
	
	//jquery function
	jQuery.fn.reverse = [].reverse;//reverse

	function addQQButton(){
		var btnQQ = document.createElement("a");
		var btnMQQ = document.createElement("a");
		var linkText = document.createTextNode("QQ");
		var linkText2 = document.createTextNode("Multi QQ");
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
	}
	
	function assignCSS(){
		addStyle(""+
		"#recaptcha_table,#recaptcha_area{width:310px!important;margin-left:28px;margin-bottom:10px}"+
		"#meja-qr tr td,#meja-qr tr{border:0 none!important;}"+
		"#meja-qr{margin-bottom:0px !important}"+
		"#recaptcha_image{padding:0px 0px!important;}"+
		".pesan{font-size:10px; padding-top:10px; clear:both;}"+
		"#gbrCapcay{cursor:pointer; border:3px solid rgb(135,5,0);float:right;margin-bottom:5px}"+
		".capcay_div{padding-right:5px; }"+
		"#QR-wrap{background: none repeat scroll 0 0 rgba(255, 255, 255, 0.624); border: 1px solid #CCCCCC; "+
			"border-radius: 5px 5px 5px 5px; bottom: -5px; box-shadow: 0 0 1px #CCCCCC; width:930px; "+
			"margin:5px auto 14px; padding:5px}"+
		"#QR-wrap2{border-radius: 5px 5px 5px 5px;"+
			"background:-moz-linear-gradient(center top , #FFFFFF 0%, #EEEEEE 100%) repeat scroll 0 0 transparent;"+
			"background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, white), color-stop(100%, #EEE))}"+
		"#reply-message{width:500px!important; height:300px !important;}"+
		".emots{cursor:pointer;margin:2px;}"+
		".emots_big{height:40px}"+
		".emotContainer{padding:5px 25px; display:none}"+
		".emotButtonWrapper{padding:5px 15px;}"+
		" #smiliesText{color:rgb(136,136,136); font-size:12px}"+
		".emotTab{font-size:12px;background:#F49011;padding:5px 10px;border-radius:5px 5px 0px 0px;"+
			"color:white; text-shadow:-1px -1px #B76B0E; margin-right:10px;position:relative;}"+
		"#div_emotWrapper .emotTab img{position:absolute;left:-9px;top:-10px}"+
		"#div_emotWrapper{margin-top:-15px;}"+
		"#uploadImageWrapper{margin-left:20px;margin-top:10px;padding-bottom:10px}"+
		"#siggyWrapper{margin-left:20px;margin-top:10px;padding-bottom:10px}"+
		".orangeBorder{border:3px solid rgb(244, 144, 17)}"+
		".blueTrans{background:none repeat scroll 0pt 0pt rgba(69, 123, 183, 0.4) !important}"+
		".orangeTrans{background:none repeat scroll 0pt 0pt rgba(244, 144, 17, 0.4) !important}"+
		".oranye{background:#F49011}"+
		"#btnSaveSiggy{float:right;margin-right:30px;margin-top:5px;display:none}"+
		".clear_both{clear:both; !important}"+
		".rbSiggy{margin-left:15px !important;}"+
		".options{font-size:10px;}"+
		"#siggyContent{margin-top:10px;}"+
		".timer{font-family:impact; color:#457BB7; text-align:right; padding-right:10px; margin-top:45px;}"+
		"#pesan{position:relative;}"+
		"#div_fitur{position:absolute; left:230px; top:31px}"+
		".fitur-separator{background-color:#CCCCCC; height:16px; margin:3px 10px 0px 0px; overflow:hidden; width: 1px; float:left;}"+
		".cursor{cursor:pointer}"+
		".kanan{float:right;}"+
		".transparan{opacity:0.6} .transparan:hover{opacity:1}"+
		"#btnSettings{margin-top:5px}"+
		".jarak5{margin-left:5px}"+
		"#pilset{margin-bottom:5px !important; padding-top:5px !important;}"+
		".markItUpHeader{width:498px !important;}"+
		".blue{color:rgb(255,255,255) !important}"+
		".clear_left{float:none !important; clear:left !important}"
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
			myField.value = myField.value.substring(0, startPos)+ myValue+ myField.value.substring(endPos, myField.value.length);
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
	
	function showCapcay(timer) {
		var script = document.createElement('script');
    	script.setAttribute("type", "application/javascript");
    	var perintah = 'Recaptcha.create("6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d","recaptcha_widget_div",{theme:"red"});';
    	script.textContent = perintah;
    	setTimeout(function(){document.body.appendChild(script);},timer);

	}
		
	function autoUpdate(){
		// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
		CheckScriptForUpdate={
		id:"128092", // Script id on Userscripts.org
		days:1, // Days to wait between update checks
		name:/\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],version:/\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],time:new Date().getTime()|0,call:function(a){GM_xmlhttpRequest({method:"GET",url:"https://userscripts.org/scripts/source/"+this.id+".meta.js",headers:{"User-agent":window.navigator.userAgent,Accept:"application/atom+xml,application/xml,text/xml"},onload:function(b){CheckScriptForUpdate.compare(b,a)}})},compare:function(b,a){this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(b.responseText)[1];this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(b.responseText)[1];if((this.xversion!=this.version)&&(confirm("Versi terbaru script "+this.xname+" telah tersedia. Agan mau update?"))){GM_setValue("updated",this.time);GM_openInTab("http://userscripts.org/scripts/source/"+this.id+".user.js")}else{if((this.xversion)&&(this.xversion!=this.version)){if(confirm("Matikan fitur auto update?")){GM_setValue("updated","off");GM_registerMenuCommand("Auto Update "+this.name,function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call("return")});alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}else{GM_setValue("updated",this.time)}}else{if(a){alert("No updates available for "+this.name)}GM_setValue("updated",this.time)}}},check:function(){if(GM_getValue("updated",0)==0){GM_setValue("updated",this.time)}if((GM_getValue("updated",0)!="off")&&(+this.time>(+GM_getValue("updated",0)+(1000*60*60*24*this.days)))){this.call()}else{if(GM_getValue("updated",0)=="off"){GM_registerMenuCommand("Enable "+this.name+" updates",function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call(true)})}else{GM_registerMenuCommand("Check "+this.name+" for updates",function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call(true)})}}}};if(self.location==top.location&&GM_xmlhttpRequest){CheckScriptForUpdate.check()};
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
		url:'http://livebeta.kaskus.co.id/misc/upload_image',
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
		//var pesan = "Next post in: "+sisa+" seconds";			
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
	
	function Mainkan(){
		//############### variable setup #######################
		var DEFAULT_SIGGY = '[RIGHT][IMG]http://s19.postimage.org/jlht9n34v/po0.gif[/IMG][IMG]http://cektkp.com/smileytext/?txt=was%20here[/IMG][/RIGHT]';
		var temp_siggy = "\n";
		var use_siggy = "1";
		var siggy1 = DEFAULT_SIGGY;
		var siggy2 = DEFAULT_SIGGY;
		var siggy3 = DEFAULT_SIGGY;
		var lastTimePost = 0;
		var pps_text = "";
		//############### local storage setup #################
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
		showCapcay(10000);
		$("#gbrCapcay").click(function(){
			showCapcay(100);
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
			$("#div_emotBig").fadeToggle('slow');			
			window.location.hash="aQR";
		});
		$("#kecil").click(function(){
			$("#div_emotBig").hide();
			$("#siggyWrapper").hide();
			$("#uploadImageWrapper").hide();
			$("#div_emotSmall").fadeToggle('slow');			
			window.location.hash="aQR";
		});
		$("#unggah").click(function(){
			$("#div_emotSmall").hide();	
			$("#div_emotBig").hide();
			$("#siggyWrapper").hide();			
			$("#uploadImageWrapper").toggle();
			window.location.hash="aQR";
		});
		$("#siggy").click(function(){
			$("#div_emotSmall").hide();	
			$("#div_emotBig").hide();
			$("#uploadImageWrapper").hide();
			$("#siggyWrapper").toggle();
			if(getUseSiggy()=="0"){
				$("#btnEditSiggy").hide();
			}
			window.location.hash="aQR";
			updateSiggyContent();
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
	    
	    //################# Settings #######################
	    $("#btnSettings").click(function(){
	    	alert("Maap gan, setting belum bisa dipake :o");
	    });
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
	    
		//########## on submit ############
		$("#postreply").submit(function(){
			var minimalChars = $("#reply-message").val();
			var pps = minimalChars;
			if(getUseSiggy()!="0")
				minimalChars += "\n\n\n\n"+getTempSiggy();
			
			if(minimalChars.length<6){
				alert("Posting harus lebih dari 5 karakter gan");
				$("#reply-message").focus();
				return false;
			}
			//if(getTimeDiff()<MINIMUM_TIME){
			//	var jeda = MINIMUM_TIME-getTimeDiff();
			//	alert("Silahkan tunggu "+jeda+" detik lagi baru posting");
			//	return false
			//}
			$("#reply-message").val(minimalChars);
			setPPS(pps);
			//timer
			var now = new Date();
			now = Math.floor(now/1000);
			setLastTimePost(now);
			
			return true;
		});
		
	}
	//################ START #######################
	Mainkan();
	
});//end onReady