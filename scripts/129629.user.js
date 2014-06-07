scr_meta=<><![CDATA[
// ==UserScript==
// @name           kaskusBetaQuickReplyPreview
// @namespace      com.orangdalam.blogsome
// @version        1.1.3
// @description    quick reply for kaskus beta
// @include        http://livebeta.kaskus.us/thread/*
// @include        http://livebeta.kaskus.us/post/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://kkcdn-static.kaskus.us/css_v0.1/js/editor/jquery.markitup.js
// @require        http://kkcdn-static.kaskus.us/css_v0.1/js/editor/kaskus_bbcode.js
// @author         Adamantoi
// @co-author      sandi_okta (Kaskus UID:241759)
// ==/UserScript==
]]></>.toString();
//
// Changelog:
// V 1.1.3(25-March-2012)
// Emoticons 
// Quote fonts, spoiler
// Opera support 
// Show all spoiler with CTRL+G or CTRL+K
//
// V 1.1.2.1 (23-March-2012)
// Restructure code
// Quote now inlcuding images and links 
//
// V 1.1.2 (20-March-2012)
// QR bugs fixed
// Show all spoiler (CTRL+K)
// 
// V 1.1.1 (18-March-2012)
// Multi QQ added (text mode only)
// Restyle UI
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

    

$(document).ready(function()    {
	
	//################ attach recapcay script #################
	var myscript2= document.createElement('script');
	myscript2.setAttribute('src','http://www.google.com/recaptcha/api/js/recaptcha_ajax.js');
	document.body.appendChild(myscript2);
	
	//################### Init Setup ################################
    $("div.quick-reply").remove();
	var jimat = document.getElementById('securitytoken').value;
	var postURL = $('a.new-reply').attr('href');
	var target = document.getElementById("thread-footer");
	var capcayKey = "6LfHgr0SAAAAAJpO_2DyRtpHECySrGkF_XINc5-d";
	//var target = document.getElementsByTagName("new-reply");
	var qr = document.createElement("div");
	
	qr.innerHTML=''+
'<div id="QR-wrap">'+
'<div>'+
	'<form method="post" name="postreply" action="'+postURL+'">'+			
		'<input type="hidden" value="'+jimat+'" name="securitytoken">'+			
		'<fieldset id="pilset">'+
			'<table id="meja-qr">'+
			'<tr>'+
				'<td>'+
						'<div class="reply-message" id="pesan">'+
						'<div class="message">'+
							//############### reply text area ###################
							'<textarea id="reply-message" rows="250" name="message" class="markItUpEditor"></textarea>'+
						'</div>'+
						'</div>'+
				'</td>'+
					//########## insert capcay ############
					'<td width="40%">'+
						'<div class="capcay_div">'+
							'<fieldset class="fieldset">'+
							 	'<div dir="ltr">'+
								'<div style="" id="recaptcha_widget_div" class="recaptcha_nothad_incorrect_sol recaptcha_isnot_showing_audio">'+ 
								//##### gbr capcay asli ###############
									'<div id="div_gbrCapcay">'+
										'<img id="gbrCapcay" src="http://kkcdn-static.kaskus.us/images/477924_20120312043814.jpg">'+
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
								 //########## tombol preview ############
							  '<input type="submit" accesskey="r" value="Preview Quick Reply" name="preview" class="button medium blue" style="float:right" id="previewQuick">'+
							  //########## tombol submit ############
							  '<input type="submit" accesskey="s" value="Post Quick Reply" name="sbutton" class="button medium blue" style="float:right">'+
							  //############ tips ###########
							  '<div class=pesan><p>Tips:</p><p>*Gunakan CTRL+Q untuk akses quick reply secara cepat</p><p>*Jika muncul gambar capcay, klik saja</p><p>*Setelah ketik postingan, tekan TAB biar langsung isi capcay, setelah isi capcay tekan enter</p><p>*Buka semua spoiler dengan CTRL+G / CTRL+K</p></div>'+
							'</fieldset>'+
						'</div>'+
					//################ end capcay ##########################
					'</td></tr>'+
					'<tr><td colspan="2"></td></tr>'+
			'</table>'+
		'</fieldset>'+					
	'</form>'+
'</div>'+
'</div>'+
	'<a href="#" name="aQR" id="aQR"></a>'
	;
	
	$("#previewQuick").click(function(){
	
		var previewQuick = '<div class="quick-reply" style="background: #fff;">'+
				'<div class="reply-header">'+
				'<h2>Preview</h2>'+
			'</div>'+
   
	'<div class="article">'+
		'<div id="thread-content">'+
			'<div class="post-wrapper">'+
				'<div class="post-entry">'+
					'<div class="entry-content" id="preview">'+
						'<h1>'+
						'</h1>'+
					'</div>'+
				'</div>'+	
			'</div>'+
		'</div>'+	
	'</div>'+
				
			'</div>';
		var teksarea = $("#reply-message").html();
		var hasilPrev = $("#QR-wrap").next();
			$.ajax({
					type:"POST",
					url: "http://livebeta.kaskus.us/post_reply/"+postURL,
					data: teksarea,//hasilLocation,
					cache: true,
					success: function(teksarea)
					{
						//document.getElementById("econtentboxInfo").innerHTML = econtentbox;
						hasilPrev.html(teksarea);
					}
				});
	}
	
	var emotContainer = document.createElement("div");
	emotContainer.innerHTML=''+
	'<div id="div_emotWrapper" style="background:rgb(238, 238, 238)">'+
	'<div class="emotButtonWrapper"><span id="smiliesText">SMILIES:</span> <a class="emotTab" id="kecil" href="javascript:void(0);">Kecil</a> <a class="emotTab" id="besar" href="javascript:void(0);">Besar</a></div>'+
	'<div id="div_emotSmall" class="emotContainer">'+
	'<div id="div_emotSmallNew">'+
	'<img class="emots" title="Cendol (S)" alt=":cendols" src="http://kkcdn-static.kaskus.us/images/smilies/cendols.gif">'+
	'<img class="emots" title="Bata (S)" alt=":batas" src="http://kkcdn-static.kaskus.us/images/smilies/batas.gif">'+
	'<img class="emots" title="Blue Guy Cendol (S)" alt=":cendolb" src="http://kkcdn-static.kaskus.us/images/smilies/s_sm_cendol.gif">'+
	'<img class="emots" title="Blue Guy Bata (S)" alt=":bata" src="http://kkcdn-static.kaskus.us/images/smilies/s_sm_batamerah.gif">'+
	'<img class="emots" title="I Love Indonesia (S)" alt=":iloveindonesias" src="http://kkcdn-static.kaskus.us/images/smilies/iloveindonesias.gif">'+
	'<img class="emots" title="I Love Kaskus (S)" alt=":ilovekaskuss" src="http://kkcdn-static.kaskus.us/images/smilies/iluvkaskuss.gif">'+	
	'<img class="emots" title="Cek PM (S)" alt=":cekpms" src="http://kkcdn-static.kaskus.us/images/smilies/cekpms.gif">'+
	'<img class="emots" title="Bookmark (S)" alt=":bookmarks" src="http://kkcdn-static.kaskus.us/images/smilies/bookmark-kecil.gif">'+
	'<img class="emots" title="Add Friend (S)" alt=":addfriends" src="http://kkcdn-static.kaskus.us/images/smilies/add-friend-kecil.gif">'+
	'<img class="emots" title="Kiss (S)" alt=":kisss" src="http://kkcdn-static.kaskus.us/images/smilies/kisss.gif">'+
	'<img class="emots" title="Malu (S)" alt=":malus" src="http://kkcdn-static.kaskus.us/images/smilies/malus.gif">'+
	'<img class="emots" title="Ngakak (S)" alt=":ngakaks" src="http://kkcdn-static.kaskus.us/images/smilies/ngakaks.gif">'+
	'<img class="emots" title="Shutup (S)" alt=":shutups" src="http://kkcdn-static.kaskus.us/images/smilies/shutup-kecil.gif">'+
	'<img class="emots" title="Takut (S)" alt=":takuts" src="http://kkcdn-static.kaskus.us/images/smilies/takuts.gif">'+
	'<img class="emots" title="Betty (S)" alt=":bettys" src="http://kkcdn-static.kaskus.us/images/smilies/mahos.gif">'+
	'<img class="emots" title="Berbusa (S)" alt=":berbusas" src="http://kkcdn-static.kaskus.us/images/smilies/berbusa-kecil.gif">'+
	'<img class="emots" title="Bingung (S)" alt=":bingungs" src="http://kkcdn-static.kaskus.us/images/smilies/bingungs.gif">'+
	'<img class="emots" title="Cape d... (S)" alt=":capedes" src="http://kkcdn-static.kaskus.us/images/smilies/capedes.gif">'+
	'<img class="emots" title="Hammer (S)" alt=":hammers" src="http://kkcdn-static.kaskus.us/images/smilies/hammers.gif">'+
	'<img class="emots" title="Mad (S)" alt=":mads" src="http://kkcdn-static.kaskus.us/images/smilies/mads.gif">'+
	'<img class="emots" title="Najis (S)" alt=":najiss" src="http://kkcdn-static.kaskus.us/images/smilies/najiss.gif">'+
	'<img class="emots" title="Repost (S)" alt=":reposts" src="http://kkcdn-static.kaskus.us/images/smilies/reposts.gif">'+
	'<img class="emots" title="Sundul Gan (S)" alt=":sundulgans" src="http://kkcdn-static.kaskus.us/images/smilies/sundulgans.gif">'+
	'<img class="emots" title="Blue Guy Peace" alt=":Yb" src="http://kkcdn-static.kaskus.us/images/smilies/s_sm_peace.gif">'+
	'<img class="emots" title="Blue Guy Smile (S)" alt=":)b" src="http://kkcdn-static.kaskus.us/images/smilies/s_sm_smile.gif">'+
	'<img class="emots" title="Army (S)" alt=":armys" src="http://kkcdn-static.kaskus.us/images/smilies/army-kecil.gif">'+
	'</div>'+
	'<div id="div_emotSmallOld">'+
	'<img class="emots" title="Wink" alt=";)" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/13.gif">'+
	'<img class="emots" title="Wowcantik" alt=":wowcantik" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/001.gif">'+
	'<img class="emots" title="televisi" alt=":tv" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/44.gif">'+
	'<img class="emots" title="thumbsup" alt=":thumbup" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/47.gif">'+
	'<img class="emots" title="thumbdown" alt=":thumbdown" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/48.gif">'+
	'<img class="emots" title="Thinking" alt=":think:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/006.gif">'+
	'<img class="emots" title="Tai" alt=":tai" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/shit-3.gif">'+
	'<img class="emots" title="table" alt=":table:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/39.gif">'+
	'<img class="emots" title="Matahari" alt=":sun:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/008.gif">'+
	'<img class="emots" title="siul" alt=":siul" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/020.gif">'+
	'<img class="emots" title="Shutup" alt=":shutup:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/5.gif">'+
	'<img class="emots" title="shakehand" alt=":shakehand" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/49.gif">'+
	'<img class="emots" title="rose" alt=":rose:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/34.gif">'+
	'<img class="emots" title="Roll Eyes (Sarcastic)" alt=":rolleyes" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/01.gif">'+
	'<img class="emots" title="ricebowl" alt=":ricebowl:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/32.gif">'+
	'<img class="emots" title="rainbow" alt=":rainbow:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/e02.gif">'+
	'<img class="emots" title="raining" alt=":rain:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/60.gif">'+
	'<img class="emots" title="present" alt=":present:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/40.gif">'+
	'<img class="emots" title="phone" alt=":Phone:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/41.gif">'+
	'<img class="emots" title="Peace" alt=":Peace:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/005.gif">'+
	'<img class="emots" title="Paw" alt=":Paws:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/paw.gif">'+
	'<img class="emots" title="Stick Out Tongue" alt=":p" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/6.gif">'+
	'<img class="emots" title="Onigiri" alt=":Onigiri" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/rice.gif">'+
	'<img class="emots" title="Embarrassment" alt=":o" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/07.gif">'+
	'<img class="emots" title="norose" alt=":norose:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/35.gif">'+
	'<img class="emots" title="Nohope" alt=":nohope:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/q11.gif">'+
	'<img class="emots" title="Ngacir" alt=":ngacir:" src="http://kkcdn-static.kaskus.us/images/smilies/ngacir.gif">'+
	'<img class="emots" title="Moon" alt=":moon:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/007.gif">'+
	'<img class="emots" title="Metal" alt=":metal" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/q17.gif">'+
	'<img class="emots" title="medicine" alt=":medicine:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/33.gif">'+
	'<img class="emots" title="Belo" alt=":matabelo:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/004.gif">'+
	'<img class="emots" title="Malu" alt=":malu" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/1.gif">'+
	'<img class="emots" title="Mad" alt=":mad" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/12.gif">'+
	'<img class="emots" title="linux2" alt=":linux2:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/26.gif">'+
	'<img class="emots" title="kucing" alt=":kucing:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/28.gif">'+
	'<img class="emots" title="kiss" alt=":kissmouth" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/36.gif">'+
	'<img class="emots" title="kisssing" alt=":kissing:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/014.gif">'+
	'<img class="emots" title="Kagets" alt=":kagets:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/3.gif">'+
	'<img class="emots" title="Hi" alt=":hi:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/hi.gif">'+
	'<img class="emots" title="heart" alt=":heart:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/37.gif">'+
	'<img class="emots" title="Hammer" alt=":hammer:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/8.gif">'+
	'<img class="emots" title="Gila" alt=":gila:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/crazy.gif">'+
	'<img class="emots" title="Genit" alt=":genit" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/q03.gif">'+
	'<img class="emots" title="fuck" alt=":fuck:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/fuck-4.gif">'+
	'<img class="emots" title="fuck3" alt=":fuck3:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/fuck-8.gif">'+
	'<img class="emots" title="fuck2" alt=":fuck2:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/fuck-6.gif">'+
	'<img class="emots" title="frog" alt=":frog:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/frog.gif">'+
	'<img class="emots" title="Forum Music" alt=":fm:" src="http://kkcdn-static.kaskus.us/images/smilies/smileyfm329wj.gif">'+
	'<img class="emots" title="flower" alt=":flower:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/e03.gif">'+
	'<img class="emots" title="exclamation" alt=":exclamati" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/52.gif">'+
	'<img class="emots" title="mail" alt=":email" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/43.gif">'+
	'<img class="emots" title="EEK!" alt=":eek" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/4.gif">'+
	'<img class="emots" title="doctor" alt=":doctor" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/18.gif">'+
	'<img class="emots" title="Big Grin" alt=":D"  src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/14.gif">'+
	'<img class="emots" title="Cool" alt=":cool:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/05.gif">'+
	'<img class="emots" title="Confused" alt=":confused" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/7.gif">'+
	'<img class="emots" title="coffee" alt=":coffee:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/31.gif">'+
	'<img class="emots" title="clock" alt=":clock" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/42.gif">'+
	'<img class="emots" title="Buldog" alt=":buldog" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/woof.gif">'+
	'<img class="emots" title="breakheart" alt=":breakheart" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/38.gif">'+
	'<img class="emots" title="Bikini" alt=":bikini" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/vana-bum-vanaweb-dot-com.gif">'+
	'<img class="emots" title="Busa" id="15" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/q20.gif">'+
	'<img class="emots" title="babi" alt=":babi:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/27.gif">'+
	'<img class="emots" title="army" alt=":army" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/24.gif">'+
	'<img class="emots" title="anjing" alt=":anjing:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/29.gif">'+
	'<img class="emots" title="angel" alt=":angel:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/017.gif">'+
	'<img class="emots" title="Amazed" alt=":amazed:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/amazed.gif">'+
	'<img class="emots" title="Ngacir Tubrukan" alt=":tabrakan:" src="http://kkcdn-static.kaskus.us/images/smilies/tabrakan.gif">'+
	'<img class="emots" title="afro" alt=":afro:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/kribo.gif">'+	
	'<img class="emots" title="Pasangan Smiley" alt=":kimpoi:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/smiley_couple.gif">'+
	'<img class="emots" title="Kaskus Lovers" alt=":ck" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/kaskuslove.gif">'+
	'<img class="emots" title="Angkat Beer" alt=":beer:" src="http://kkcdn-static.kaskus.us/images/smilies/sumbangan/smiley_beer.gif">'+
	'<img class="emots" title="Bingung" alt=":bingung:" src="http://kkcdn-static.kaskus.us/images/smilies/bolakbalik.gif">'+

	'</div></div>'+
	'<div id="div_emotBig" class="emotContainer">'+
	'<img class="emots emots_big" title="Ultah" alt=":ultah" src="http://kkcdn-static.kaskus.us/images/smilies/ultah.gif">'+
	'<img class="emots emots_big" title="Traveller" alt=":travel" src="http://kkcdn-static.kaskus.us/images/smilies/traveller.gif">'+
	'<img class="emots emots_big" title="Toast" alt=":toast" src="http://kkcdn-static.kaskus.us/images/smilies/toastcendol.gif">'+
	'<img class="emots emots_big" title="Takut" alt=":takut" src="http://kkcdn-static.kaskus.us/images/smilies/takut.gif">'+
	'<img class="emots emots_big" title="Sundul" alt=":sup2" src="http://kkcdn-static.kaskus.us/images/smilies/sundul.gif">'+
	'<img class="emots emots_big" title="Sorry" alt=":sorry" src="http://kkcdn-static.kaskus.us/images/smilies/sorry.gif">'+
	'<img class="emots emots_big" title="Shakehand2" alt=":shakehand2" src="http://kkcdn-static.kaskus.us/images/smilies/shakehand2.gif">'+
	'<img class="emots emots_big" title="Selamat" alt=":selamat" src="http://kkcdn-static.kaskus.us/images/smilies/selamat.gif">'+
	'<img class="emots emots_big" title="Salah Kamar" alt=":salahkamar" src="http://kkcdn-static.kaskus.us/images/smilies/salah_kamar.gif">'+
	'<img class="emots emots_big" title="Request" alt=":request" src="http://kkcdn-static.kaskus.us/images/smilies/request.gif">'+
	'<img class="emots emots_big" title="Purple Repost" alt=":repost2" src="http://kkcdn-static.kaskus.us/images/smilies/s_sm_repost2.gif">'+
	'<img class="emots emots_big" title="Blue Repost" alt=":repost" src="http://kkcdn-static.kaskus.us/images/smilies/s_sm_repost1.gif">'+
	'<img class="emots emots_big" title="Recommended Seller" alt=":recsel" src="http://kkcdn-static.kaskus.us/images/smilies/recseller.gif">'+
	'<img class="emots emots_big" title="Rate 5 Star" alt=":rate5" src="http://kkcdn-static.kaskus.us/images/smilies/rate5.gif">'+
	'<img class="emots emots_big" title="Peluk" alt=":peluk" src="http://kkcdn-static.kaskus.us/images/smilies/peluk.gif">'+
	'<img class="emots emots_big" title="No Sara Please" alt=":nosara" src="http://kkcdn-static.kaskus.us/images/smilies/nosara.gif">'+
	'<img class="emots emots_big" title="No Hope" alt=":nohope" src="http://kkcdn-static.kaskus.us/images/smilies/nohope.gif">'+
	'<img class="emots emots_big" title="Ngakak" alt=":ngakak" src="http://kkcdn-static.kaskus.us/images/smilies/ngakak.gif">'+
	'<img class="emots emots_big" title="Ngacir2" alt=":ngacir2" src="http://kkcdn-static.kaskus.us/images/smilies/ngacir2.gif">'+
	'<img class="emots emots_big" title="Ngacir" alt=":ngacir" src="http://kkcdn-static.kaskus.us/images/smilies/ngacir3.gif">'+
	'<img class="emots emots_big" title="Najis" alt=":najis" src="http://kkcdn-static.kaskus.us/images/smilies/najis.gif">'+
	'<img class="emots emots_big" title="Mewek" alt=":mewek" src="http://kkcdn-static.kaskus.us/images/smilies/mewek.gif">'+
	'<img class="emots emots_big" title="Marah" alt=":marah" src="http://kkcdn-static.kaskus.us/images/smilies/marah.gif">'+
	'<img class="emots emots_big" title="Malu" alt=":malu" src="http://kkcdn-static.kaskus.us/images/smilies/malu.gif">'+
	'<img class="emots emots_big" title="Kaskus Radio" alt=":kr" src="http://kkcdn-static.kaskus.us/images/smilies/kaskus_radio.gif">'+
	'<img class="emots emots_big" title="Kiss" alt=":kiss" src="http://kkcdn-static.kaskus.us/images/smilies/cewek.gif">'+
	'<img class="emots emots_big" title="Kimpoi" alt=":kimpoi" src="http://kkcdn-static.kaskus.us/images/smilies/kimpoi.gif">'+
	'<img class="emots emots_big" title="I Love Kaskus" alt=":ilovekaskus" src="http://kkcdn-static.kaskus.us/images/smilies/s_sm_ilovekaskus.gif">'+
	'<img class="emots emots_big" title="I Love Indonesia" alt=":iloveindonesia" src="http://kkcdn-static.kaskus.us/images/smilies/I-Luv-Indonesia.gif">'+
	'<img class="emots emots_big" title="Hoax" alt=":hoax" src="http://kkcdn-static.kaskus.us/images/smilies/hoax.gif">'+
	'<img class="emots emots_big" title="Hot News" alt=":hn" src="http://kkcdn-static.kaskus.us/images/smilies/hotnews.gif">'+
	'<img class="emots emots_big" title="Hammer2" alt=":hammer" src="http://kkcdn-static.kaskus.us/images/smilies/hammer.gif">'+
	'<img class="emots emots_big" title="Games" alt=":games" src="http://kkcdn-static.kaskus.us/images/smilies/games.gif">'+
	'<img class="emots emots_big" title="DP" alt=":dp" src="http://kkcdn-static.kaskus.us/images/smilies/dp.gif">'+
	'<img class="emots emots_big" title="cystg" alt=":cystg" src="http://kkcdn-static.kaskus.us/images/smilies/cystg.gif">'+
	'<img class="emots emots_big" title="Cool" alt=":cool" src="http://kkcdn-static.kaskus.us/images/smilies/cool2.gif">'+
	'<img class="emots emots_big" title="Blue Guy Cendol (L)" alt=":cendolbig" src="http://kkcdn-static.kaskus.us/images/smilies/s_big_cendol.gif">'+
	'<img class="emots emots_big" title="Cek PM" alt=":cekpm" src="http://kkcdn-static.kaskus.us/images/smilies/cekpm.gif">'+
	'<img class="emots emots_big" title="Cape d..." alt=":cd" src="http://kkcdn-static.kaskus.us/images/smilies/capede.gif">'+
	'<img class="emots emots_big" title="Bola" alt=":bola" src="http://kkcdn-static.kaskus.us/images/smilies/bola.gif">'+
	'<img class="emots emots_big" title="Bingung" alt=":bingung" src="http://kkcdn-static.kaskus.us/images/smilies/bingung.gif">'+
	'<img class="emots emots_big" title="Betty" alt=":betty" src="http://kkcdn-static.kaskus.us/images/smilies/s_sm_maho.gif">'+
	'<img class="emots emots_big" title="Turut Berduka" alt=":berduka" src="http://kkcdn-static.kaskus.us/images/smilies/berduka.gif">'+
	'<img class="emots emots_big" title="Blue Guy Bata (L)" alt=":batabig" src="http://kkcdn-static.kaskus.us/images/smilies/s_big_batamerah.gif">'+
	'<img class="emots emots_big" title="Baby Girl" alt=":babygirl" src="http://kkcdn-static.kaskus.us/images/smilies/babygirl.gif">'+
	'<img class="emots emots_big" title="Baby Boy 1" alt=":babyboy1" src="http://kkcdn-static.kaskus.us/images/smilies/babyboy1.gif">'+
	'<img class="emots emots_big" title="Baby Boy" alt=":babyboy" src="http://kkcdn-static.kaskus.us/images/smilies/babyboy.gif">'+
	'<img class="emots emots_big" title="Angel" alt=":angel" src="http://kkcdn-static.kaskus.us/images/smilies/angel1.gif">'+
	'<img class="emots emots_big" title="2 Jempol" alt=":2thumbup" src="http://kkcdn-static.kaskus.us/images/smilies/jempol2.gif">'+
	'<img class="emots emots_big" title="Sundul Up" alt=":sup:" src="http://kkcdn-static.kaskus.us/images/smilies/fd_5.gif">'+
	'<img class="emots emots_big" title="Repost" alt=":repost:" src="http://kkcdn-static.kaskus.us/images/smilies/fd_7.gif">'+
	'<img class="emots emots_big" title="Kemana TSnya?" alt=":kts:" src="http://kkcdn-static.kaskus.us/images/smilies/fd_6.gif">'+
	'<img class="emots emots_big" title="Kaskus Banget" alt=":kbgt:" src="http://kkcdn-static.kaskus.us/images/smilies/fd_4.gif">'+
	'<img class="emots emots_big" title="Thread Kacau" alt=":kacau:" src="http://kkcdn-static.kaskus.us/images/smilies/fd_8.gif">'+
	'<img class="emots emots_big" title="Jangan ribut disini" alt=":jrb:" src="http://kkcdn-static.kaskus.us/images/smilies/fd_1.gif">'+
	'<img class="emots emots_big" title="Cape deeehh" alt=":cd:" src="http://kkcdn-static.kaskus.us/images/smilies/fd_2.gif">'+
	'<img class="emots emots_big" title="Bukan IGO" alt=":bigo:" src="http://kkcdn-static.kaskus.us/images/smilies/fd_3.gif">'+

	
	''+
	'</div></div>'
	;
	
	//############### CTRL+Q ################
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
	//############## CTRL+G / CTRL+K################
	$(document).keyup(function (e) {
		if(e.which == 17) isCtrl=false; //CTRL
		}).keydown(function (e) {
			if(e.which == 17) isCtrl=true;
			if((e.which == 71 && isCtrl == true) || (e.which == 75 && isCtrl == true)) //G or K
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
	function showCapcay(timer){
		setTimeout(function(){
				if(window.opera != undefined) {
					var unsafeWindowS=window;
				}
				else{
					var unsafeWindowS=unsafeWindow;
				} 
				Recaptcha = unsafeWindowS.Recaptcha; 
				//Recaptcha = location.assign("javascript:Recaptcha();void(0)");
				Recaptcha.create(capcayKey,"recaptcha_widget_div",{theme:"red"})
		},timer);
	}
	
	function buttonQRClick(el){
		el.addEventListener("click",function(){
			
			var postParent = $(this).parents().eq(2); //get post-entry div
			var postId = postParent.attr("id");
			var userName = postParent.find(".fn").text();
			userName = userName.replace("[$]","");
			var $entryContent = postParent.find(".entry-content").clone();
			// clear non-content post
			$entryContent.find(".post-quote").empty();
			$entryContent.find(".edited").empty();
			$entryContent.find("h1").empty();
			
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
				el.setAttribute('class','button_qr button active'); 
			}
		}, false);
	}//end function buttonQRClick
	
	function assignEmotClick(){
		$("img.emots").on("click",function(){
			var emotCode=$(this).attr("alt");
			insertAtCursor(emotCode);
		});
		
	}
	
	function parseHTMLtoBB($content){
		$content.find('b').each(function(){
			var text = $(this).text();
			$(this).replaceWith("[B]"+text+"[/B]");
		});
		$content.find('em').each(function(){
			var text = $(this).text();
			$(this).replaceWith("[I]"+text+"[/I]");
		});
		$content.find('u').each(function(){
			var text = $(this).text();
			$(this).replaceWith("[U]"+text+"[/U]");
		});
		$content.find('font').each(function(){
			var text = $(this).text();
			var size = $(this).attr('size');
			var color = $(this).attr('color');
			var face = $(this).attr('face');
			if(size!=undefined){
				$(this).replaceWith('[size="'+size+'"]'+text+'[/size]');
			}
			else if(color!=undefined){
				$(this).replaceWith('[color='+color+']'+text+'[/color]');
			}
			else if(face!=undefined){
				$(this).replaceWith('[FONT="'+face+'"]'+text+'[/FONT]');
			}
		});
		$content.find('img').each(function(){
			var src = $(this).attr('src');
			$(this).replaceWith("[IMG]"+src+"[/IMG]");
		});
		$content.find('a').each(function(){
			var src = $(this).attr('href');
			var text = $(this).text();
			$(this).replaceWith('[URL="'+src+'"]'+text+'[/URL]');
		});
		$content.find('#bbcode_spoiler_content').each(function(){
			var text = $(this).text();
			$(this).replaceWith('[SPOILER="open"]'+text+'[/SPOILER]');
			//alert($(this).text());
		});
		$content.find('#bbcode_div').each(function(){
			$(this).replaceWith("");
		});
		
		return $content;
	}
	
	function addQQButton(){
		var btnQQ = document.createElement("a");
		var btnMQQ = document.createElement("a");
		var linkText = document.createTextNode("QQ");
		var linkText2 = document.createTextNode("Multi QQ");
		btnQQ.setAttribute('class','button_qr button');
		btnQQ.setAttribute('id','btnQQ');
		btnQQ.appendChild(linkText);
		btnMQQ.setAttribute('class','button_qr button multi-quote');
		btnMQQ.setAttribute('id','btnMQQ');
		btnMQQ.appendChild(linkText2);
		
		for(var i=0;i<document.getElementsByTagName('*').length;i++){
			if(document.getElementsByTagName('*')[i].className == 'entry-footer'){
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
		$("#content-wrapper").append(qr);
	}
	
	function enableMarkItUp(){
		$('#reply-message').markItUp(kaskusBbcodeSettings);
	}
	
	function showEmotList(){
		$("#QR-wrap").append(emotContainer);	
	}
	
	function assignCSS(){
		addStyle(""+
		"#pilset{background-color:#EEEEEE;}"+
		"#recaptcha_table,#recaptcha_area{width:310px!important;margin-left:28px;margin-bottom:10px}"+
		"#meja-qr tr td,#meja-qr tr{border:0 none!important;}"+
		"#recaptcha_image{padding:0px 0px!important;}"+
		".pesan{font-size:10px; padding-top:10px; clear:both;}"+
		"#gbrCapcay{cursor:pointer; border:3px solid rgb(135,5,0)}"+
		".capcay_div{padding-right:5px; padding-top:75px;}"+
		"#QR-wrap{background: none repeat scroll 0 0 rgba(255, 255, 255, 0.624); border: 1px solid #CCCCCC; "+
			"border-radius: 5px 5px 5px 5px; bottom: -5px; box-shadow: 0 0 1px #CCCCCC; width:935px; "+
			"margin:5px auto 14px; padding:5px}"+
		"#reply-message{width:500px!important}"+
		".emots{cursor:pointer;margin:2px;}"+
		".emots_big{height:40px}"+
		".emotContainer{padding:5px 25px; display:none}"+
		".emotButtonWrapper{padding:5px 30px;}"+
		" #smiliesText{color:rgb(136,136,136); font-size:12px}"+
		".emotTab{font-size:12px;background:#F49011;padding:5px 10px;border-radius:5px 5px 0px 0px;"+
			"color:white;}"
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
	
	function autoUpdate(){
		// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
		CheckScriptForUpdate={
		id:"128092", // Script id on Userscripts.org
		days:3, // Days to wait between update checks
		name:/\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],version:/\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],time:new Date().getTime()|0,call:function(a){GM_xmlhttpRequest({method:"GET",url:"https://userscripts.org/scripts/source/"+this.id+".meta.js",headers:{"User-agent":window.navigator.userAgent,Accept:"application/atom+xml,application/xml,text/xml"},onload:function(b){CheckScriptForUpdate.compare(b,a)}})},compare:function(b,a){this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(b.responseText)[1];this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(b.responseText)[1];if((this.xversion!=this.version)&&(confirm("Versi terbaru script "+this.xname+" telah tersedia. Agan mau update?"))){GM_setValue("updated",this.time);GM_openInTab("http://userscripts.org/scripts/source/"+this.id+".user.js")}else{if((this.xversion)&&(this.xversion!=this.version)){if(confirm("Matikan fitur auto update?")){GM_setValue("updated","off");GM_registerMenuCommand("Auto Update "+this.name,function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call("return")});alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}else{GM_setValue("updated",this.time)}}else{if(a){alert("No updates available for "+this.name)}GM_setValue("updated",this.time)}}},check:function(){if(GM_getValue("updated",0)==0){GM_setValue("updated",this.time)}if((GM_getValue("updated",0)!="off")&&(+this.time>(+GM_getValue("updated",0)+(1000*60*60*24*this.days)))){this.call()}else{if(GM_getValue("updated",0)=="off"){GM_registerMenuCommand("Enable "+this.name+" updates",function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call(true)})}else{GM_registerMenuCommand("Check "+this.name+" for updates",function(){GM_setValue("updated",new Date().getTime()|0);CheckScriptForUpdate.call(true)})}}}};if(self.location==top.location&&GM_xmlhttpRequest){CheckScriptForUpdate.check()};
	}
	
	function Mainkan(){
		autoUpdate();
		assignCSS();
		addQQButton();
		showQR();
		enableMarkItUp();
		showEmotList();
		assignEmotClick();
		showCapcay(7000);
		$("#gbrCapcay").click(function(){
			showCapcay(100);
		});
		$("#besar").click(function(){
			$("#div_emotBig").fadeToggle('slow');
			$("#div_emotSmall").hide();
			window.location.hash="aQR";
		});
		$("#kecil").click(function(){
			$("#div_emotSmall").fadeToggle('slow');
			$("#div_emotBig").hide();
			window.location.hash="aQR";
		});
		
	}
	//################ START #######################
	Mainkan();
	

});//end onReady