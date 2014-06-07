// ==UserScript==
// @id              idwsemotkaskus
// @name            Indowebster - Kaskus emot for IDWS
// @version         3.4 [20130714]
// @namespace       amzma@deviantart.com
// @author          AMZMA
// @description     Add emoticon at QuickReply box on IDWS
// @icon            http://puu.sh/CdXr
// @include         http://forum.indowebster.com/*
// @require         http://code.jquery.com/jquery.min.js
// @homepage        Teras

// ==/UserScript==

$(document).ready(function() {


	var hostKK = "http://i1222.photobucket.com/albums/dd481/AMZMA/Emoticon/small/";
	var styleEmotCon = 'background-color: #DFDFDF; border-top: 5px solid #DFDFDF; padding: 5px; margin-top: -5px; '
	var styleBlankTab = 'margin-top: -5px; background-color: #DFDFDF; border-top: 5px solid #DFDFDF; padding-bottom: 15px; '
	var styleTab1 = 'background-color: transparent; padding: 5px; border-radius: 15px 15px 0 0; margin-top: 5px;'
	var styleTab2 = 'style="background-color: #D3D3D3; border-radius: 15px 15px 0 0; padding: 5px 5px 5px 5px; margin-top: -5px; transform:rotateX(180deg);"'
	var emot0 = '<center><a href="javascript:void(0);" id="kecil" class="emotTab"><img src="http://puu.sh/CdXr"  id="kecilId" style="'+styleTab1+'"></a></center>';
	var emot01 = '<center><a href="javascript:void(0);" id="kecil01" class="emotTab"><img src="http://puu.sh/CdXr" '+styleTab2+'></a></center>';
	var emot1 = '<div id="emot" class="emotTab"></div>';
	var emotK = '<div id="kecilTab" class="emotCon" style="'+styleEmotCon+'display:none"><img class="emotClick"  title="Maho Red (S)" alt=":mahor" src="http://puu.sh/CdXr"> \
	<img class="emotClick"  title="BataCendol (S)" alt=":batacs" src="http://puu.sh/11fzo"> \
	<img class="emotClick"  title="CendolBata (S)" alt=":cendolcs" src="http://puu.sh/X8pE"> \
	<img class="emotClick"  title=":Yb -Blue Guy Peace" alt=":Yb" src="'+hostKK+'s_sm_peace.gif"> \
	<img class="emotClick"  title=":takuts -Takut (S)" alt=":takuts" src="'+hostKK+'takuts.gif"> \
	<img class="emotClick"  title=":sundulgans -Sundul Gan (S)" alt=":sundulgans" src="'+hostKK+'sundulgans.gif"> \
	<img class="emotClick"  title=":shutups -Shutup (S)" alt=":shutups" src="'+hostKK+'shutup-kecil.gif"> \
	<img class="emotClick"  title=":reposts -Repost (S)" alt=":reposts" src="'+hostKK+'reposts.gif"> \
	<img class="emotClick"  title=":ngakaks -Ngakak (S)" alt=":ngakaks" src="'+hostKK+'ngakaks.gif"> \
	<img class="emotClick"  title=":najiss -Najis (S)" alt=":najiss" src="'+hostKK+'najiss.gif"> \
	<img class="emotClick"  title=":malus -Malu (S)" alt=":malus" src="'+hostKK+'malus.gif"> \
	<img class="emotClick"  title=":mads -Mad (S)" alt=":mads" src="'+hostKK+'mads.gif"> \
	<img class="emotClick"  title=":kisss -Kiss (S)" alt=":kisss" src="'+hostKK+'kisss.gif"> \
	<img class="emotClick"  title=":ilovekaskuss -I Love Kaskus (S)" alt=":ilovekaskuss" src="'+hostKK+'iluvkaskuss.gif"> \
	<img class="emotClick"  title=":iloveindonesias -I Love Indonesia (S)" alt=":iloveindonesias" src="'+hostKK+'iloveindonesias.gif"> \
	<img class="emotClick"  title=":hammers -Hammer (S)" alt=":hammers" src="'+hostKK+'hammers.gif"> \
	<img class="emotClick"  title=":cendols -Cendol (S)" alt=":cendols" src="'+hostKK+'cendols.gif"> \
	<img class="emotClick"  title=":cendolb -Blue Guy Cendol (S)" alt=":cendolb" src="'+hostKK+'s_sm_cendol.gif"> \
	<img class="emotClick"  title=":cekpms -Cek PM (S)" alt=":cekpms" src="'+hostKK+'cekpms.gif"> \
	<img class="emotClick"  title=":capedes -Cape d... (S)" alt=":capedes" src="'+hostKK+'capedes.gif"> \
	<img class="emotClick"  title=":bookmarks -Bookmark (S)" alt=":bookmarks" src="'+hostKK+'bookmark-kecil.gif"> \
	<img class="emotClick"  title=":bingungs -Bingung (S)" alt=":bingungs" src="'+hostKK+'bingungs.gif"> \
	<img class="emotClick"  title=":bettys -Betty (S)" alt=":bettys" src="'+hostKK+'mahos.gif"> \
	<img class="emotClick"  title=":berdukas -Berduka (S)" alt=":berdukas" src="'+hostKK+'berdukas.gif"> \
	<img class="emotClick"  title=":berbusas -Berbusa (S)" alt=":berbusas" src="'+hostKK+'berbusa-kecil.gif"> \
	<img class="emotClick"  title=":batas -Bata (S)" alt=":batas" src="'+hostKK+'batas.gif"> \
	<img class="emotClick"  title=":bata -Blue Guy Bata (S)" alt=":bata" src="'+hostKK+'s_sm_batamerah.gif"> \
	<img class="emotClick"  title=":armys -Army (S)" alt=":armys" src="'+hostKK+'army-kecil.gif"> \
	<img class="emotClick"  title=":addfriends -Add Friend (S)" alt=":addfriends" src="'+hostKK+'add-friend-kecil.gif"> \
	<img class="emotClick"  title=":)b -Blue Guy Smile (S)" alt=":)b" src="'+hostKK+'s_sm_smile.gif"> \
	<img class="emotClick"  title=";) -Wink" alt=";)" src="'+hostKK+'13.gif"> \
	<img class="emotClick"  title=":wowcantik -Wowcantik" alt=":wowcantik" src="'+hostKK+'001.gif"> \
	<img class="emotClick"  title=":tv -televisi" alt=":tv" src="'+hostKK+'44.gif"> \
	<img class="emotClick"  title=":thumbup -thumbsup" alt=":thumbup" src="'+hostKK+'47.gif"> \
	<img class="emotClick"  title=":thumbdown -thumbdown" alt=":thumbdown" src="'+hostKK+'48.gif"> \
	<img class="emotClick"  title=":think: -Thinking" alt=":think:" src="'+hostKK+'006.gif"> \
	<img class="emotClick"  title=":tai -Tai" alt=":tai" src="'+hostKK+'shit-3.gif"> \
	<img class="emotClick"  title=":tabrakan: -Ngacir Tubrukan" alt=":tabrakan:" src="'+hostKK+'tabrakan.gif"> \
	<img class="emotClick"  title=":table: -table" alt=":table:" src="'+hostKK+'39.gif"> \
	<img class="emotClick"  title=":sun: -Matahari" alt=":sun:" src="'+hostKK+'008.gif"> \
	<img class="emotClick"  title=":siul -siul" alt=":siul" src="'+hostKK+'020.gif"> \
	<img class="emotClick"  title=":shutup: -Shutup" alt=":shutup:" src="'+hostKK+'5.gif"> \
	<img class="emotClick"  title=":shakehand -shakehand" alt=":shakehand" src="'+hostKK+'49.gif"> \
	<img class="emotClick"  title=":rose: -rose" alt=":rose:" src="'+hostKK+'34.gif"> \
	<img class="emotClick"  title=":rolleyes -Roll Eyes (Sarcastic)" alt=":rolleyes" src="'+hostKK+'01.gif"> \
	<img class="emotClick"  title=":ricebowl: -ricebowl" alt=":ricebowl:" src="'+hostKK+'32.gif"> \
	<img class="emotClick"  title=":rainbow: -rainbow" alt=":rainbow:" src="'+hostKK+'e02.gif"> \
	<img class="emotClick"  title=":rain: -raining" alt=":rain:" src="'+hostKK+'60.gif"> \
	<img class="emotClick"  title=":present: -present" alt=":present:" src="'+hostKK+'40.gif"> \
	<img class="emotClick"  title=":Phone: -phone" alt=":Phone:" src="'+hostKK+'41.gif"> \
	<img class="emotClick"  title=":Peace: -Peace" alt=":Peace:" src="'+hostKK+'005.gif"> \
	<img class="emotClick"  title=":Paws: -Paw" alt=":Paws:" src="'+hostKK+'paw.gif"> \
	<img class="emotClick"  title=":p -Stick Out Tongue" alt=":p" src="'+hostKK+'6.gif"> \
	<img class="emotClick"  title=":Onigiri -Onigiri" alt=":Onigiri" src="'+hostKK+'rice.gif"> \
	<img class="emotClick"  title=":o -Embarrassment" alt=":o" src="'+hostKK+'07.gif"> \
	<img class="emotClick"  title=":norose: -norose" alt=":norose:" src="'+hostKK+'35.gif"> \
	<img class="emotClick"  title=":nohope: -Nohope" alt=":nohope:" src="'+hostKK+'q11.gif"> \
	<img class="emotClick"  title=":ngacir: -Ngacir" alt=":ngacir:" src="'+hostKK+'ngacir.gif"> \
	<img class="emotClick"  title=":moon: -Moon" alt=":moon:" src="'+hostKK+'007.gif"> \
	<img class="emotClick"  title=":metal -Metal" alt=":metal" src="'+hostKK+'q17.gif"> \
	<img class="emotClick"  title=":medicine: -medicine" alt=":medicine:" src="'+hostKK+'33.gif"> \
	<img class="emotClick"  title=":matabelo: -Belo" alt=":matabelo:" src="'+hostKK+'004.gif"> \
	<img class="emotClick"  title=":malu: -Malu" alt=":malu:" src="'+hostKK+'1.gif"> \
	<img class="emotClick"  title=":mad -Mad" alt=":mad" src="'+hostKK+'12.gif"> \
	<img class="emotClick"  title=":linux2: -linux2" alt=":linux2:" src="'+hostKK+'26.gif"> \
	<img class="emotClick"  title=":linux1: -linux" alt=":linux1:" src="'+hostKK+'25.gif"> \
	<img class="emotClick"  title=":kucing: -kucing" alt=":kucing:" src="'+hostKK+'28.gif"> \
	<img class="emotClick"  title=":kissmouth -kiss" alt=":kissmouth" src="'+hostKK+'36.gif"> \
	<img class="emotClick"  title=":kissing: -kisssing" alt=":kissing:" src="'+hostKK+'014.gif"> \
	<img class="emotClick"  title=":kagets: -Kagets" alt=":kagets:" src="'+hostKK+'3.gif"> \
	<img class="emotClick"  title=":hi: -Hi" alt=":hi:" src="'+hostKK+'hi.gif"> \
	<img class="emotClick"  title=":heart: -heart" alt=":heart:" src="'+hostKK+'37.gif"> \
	<img class="emotClick"  title=":hammer: -Hammer" alt=":hammer:" src="'+hostKK+'8.gif"> \
	<img class="emotClick"  title=":gila: -Gila" alt=":gila:" src="'+hostKK+'crazy.gif"> \
	<img class="emotClick"  title=":genit -Genit" alt=":genit" src="'+hostKK+'q03.gif"> \
	<img class="emotClick"  title=":fuck: -fuck" alt=":fuck:" src="'+hostKK+'fuck-4.gif"> \
	<img class="emotClick"  title=":fuck3: -fuck3" alt=":fuck3:" src="'+hostKK+'fuck-8.gif"> \
	<img class="emotClick"  title=":fuck2: -fuck2" alt=":fuck2:" src="'+hostKK+'fuck-6.gif"> \
	<img class="emotClick"  title=":frog: -frog" alt=":frog:" src="'+hostKK+'frog.gif"> \
	<img class="emotClick"  title=":flower: -flower" alt=":flower:" src="'+hostKK+'e03.gif"> \
	<img class="emotClick"  title=":exclamati -exclamation" alt=":exclamati" src="'+hostKK+'52.gif"> \
	<img class="emotClick"  title=":email -mail" alt=":email" src="'+hostKK+'43.gif"> \
	<img class="emotClick"  title=":eek -EEK!" alt=":eek" src="'+hostKK+'4.gif"> \
	<img class="emotClick"  title=":doctor -doctor" alt=":doctor" src="'+hostKK+'18.gif"> \
	<img class="emotClick"  title=":D -Big Grin" alt=":D" src="'+hostKK+'14.gif"> \
	<img class="emotClick"  title=":cool: -Cool" alt=":cool:" src="'+hostKK+'05.gif"> \
	<img class="emotClick"  title=":confused -Confused" alt=":confused" src="'+hostKK+'7.gif"> \
	<img class="emotClick"  title=":coffee: -coffee" alt=":coffee:" src="'+hostKK+'31.gif"> \
	<img class="emotClick"  title=":clock -clock" alt=":clock" src="'+hostKK+'42.gif"> \
	<img class="emotClick"  title=":buldog -Buldog" alt=":buldog" src="'+hostKK+'woof.gif"> \
	<img class="emotClick"  title=":breakheart -breakheart" alt=":breakheart" src="'+hostKK+'38.gif"> \
	<img class="emotClick"  title=":bingung: -Bingung" alt=":bingung:" src="'+hostKK+'bolakbalik.gif"> \
	<img class="emotClick"  title=":bikini -Bikini" alt=":bikini" src="'+hostKK+'vana-bum-vanaweb-dot-com.gif"> \
	<img class="emotClick"  title=":berbusa -Busa" alt=":berbusa" src="'+hostKK+'q20.gif"> \
	<img class="emotClick"  title=":baby: -baby" alt=":baby:" src="'+hostKK+'30.gif"> \
	<img class="emotClick"  title=":babi: -babi" alt=":babi:" src="'+hostKK+'27.gif"> \
	<img class="emotClick"  title=":army -army" alt=":army" src="'+hostKK+'24.gif"> \
	<img class="emotClick"  title=":anjing: -anjing" alt=":anjing:" src="'+hostKK+'29.gif"> \
	<img class="emotClick"  title=":angel: -angel" alt=":angel:" src="'+hostKK+'017.gif"> \
	<img class="emotClick"  title=":amazed: -Amazed" alt=":amazed:" src="'+hostKK+'amazed.gif"> \
	<img class="emotClick"  title=":) -Smilie" alt=":)" src="'+hostKK+'15.gif"> \
	<img class="emotClick"  title=":( -Frown" alt=":(" src="'+hostKK+'06.gif" ></div>'


	$("#vB_Editor_QR").after('<div id="emotWrapper0"></div>');
	$("#emotWrapper0").append('<div id="emotWrapper"></div>');
	$("#emotWrapper").append(emot0);
	$("#kecil").after(emot1);
	$("#emot").append('<div id="blankTab" style="'+styleBlankTab+'"><br><img src="http://puu.sh/24Yrn" class="zIcon" style="animation: home 7s infinite; -moz-animation: home 7s infinite; -webkit-animation: home 7s infinite; -o-animation: home 7s infinite; width: 100%;"></img></div>',emotK);


	$("#kecil").click(function(){
		$("#kecilTab").slideToggle(500);
	});
	
	$("#kecilId").click(function(){
		$("#kecilId").toggleClass('kecilClass');
		$("#vB_Editor_QR").toggleClass('vB_Editor_QR');
		$("#emotWrapper0").toggleClass('emotWrapper');
		$("#blankTab").slideToggle(500);
	});
	
	
	GM_addStyle(
	'.vB_Editor_QR {width:61% !important;}\
	.emotWrapper {width: 37.8% !important;}\
	#vB_Editor_QR {float: left; width:90%;  margin-top: 5px;}\
	#emotWrapper {margin: 5px; border: 5px solid #D3D3D3; border-radius: 5px;}\
	#emotWrapper0 {float: right; width: 8.8%; margin-top: 15px; border: 1px solid #D3D3D3; border-radius: 5px;}\
	#emot {margin-left: auto; margin-right: auto; margin-top: 3px;} \
	.hfeed, .twt-glow, .zebra, div[class*=user-], tr \
	, .body_wrapper, .postbody, form#quick_reply textarea, #posting_rules \
	, .group, .qrcontainer.blockfoot, .blockfoot, .blocksubfoot { \
	background-color: /*black*/#DFDFDF !important; } \
	#cke_top_vB_Editor_QR_editor, .wysiwyg_block .formcontrols .blockrow \
	, .forumbit_nopost .forumbit_nopost .forumrow, .forumbit_post .forumrow \
	, .wgo_block .section, .threadbit .nonsticky, .threadbit .discussionrow \
	, .userinfo, .postbitlegacy .postdetails{background-color: #EFEFEF !important; } \
	.account-panel .user, #forum-listing .author, .username_container {text-align: center !important; } \
	.below_body {display: none !important;} \
	.kecilClass, .kecilClass:hover {background-color: #DFDFDF !important; animation: none !important; -moz-animation: none !important; -webkit-animation: none !important; -o-animation: none !important;} \
	@keyframes home { \
		0% { transform: rotate(0deg); transform-origin: center center; opacity: 0; } \
		10% { transform: rotate(180deg); opacity: 0.5; } \
		30% { transform: rotate(360deg); opacity: 0.7; } \
		45% { transform: rotate(0deg); opacity: 1; } \
		50% { transform-origin: center } \
		55% { transform: rotate(0deg); opacity: 1; } \
		70% { transform: rotate(360deg); opacity: 0.7; } \
		90% { transform: rotate(180deg); opacity: 0.5; } \
		100% { transform: rotate(0deg); transform-origin: center center; opacity: 0; } \
	} \
	@-moz-keyframes home { \
		0% { -moz-transform: rotate(0deg); -moz-transform-origin: center center; opacity: 0; } \
		10% { -moz-transform: rotate(180deg); opacity: 0.5; } \
		30% { -moz-transform: rotate(360deg); opacity: 0.7; } \
		45% { -moz-transform: rotate(0deg); opacity: 1; } \
		50% { -moz-transform-origin: center } \
		55% { -moz-transform: rotate(0deg); opacity: 1; } \
		70% { -moz-transform: rotate(360deg); opacity: 0.7; } \
		90% { -moz-transform: rotate(180deg); opacity: 0.5; } \
		100% { -moz-transform: rotate(0deg); -moz-transform-origin: center center; opacity: 0; } \
	} \
	@-webkit-keyframes home { \
		0% { -webkit-transform: rotate(0deg); -webkit-transform-origin: center center; opacity: 0; } \
		10% { -webkit-transform: rotate(180deg); opacity: 0.5; } \
		30% { -webkit-transform: rotate(360deg); opacity: 0.7; } \
		45% { -webkit-transform: rotate(0deg); opacity: 1; } \
		50% { -webkit-transform-origin: center } \
		55% { -webkit-transform: rotate(0deg); opacity: 1; } \
		70% { -webkit-transform: rotate(360deg); opacity: 0.7; } \
		90% { -webkit-transform: rotate(180deg); opacity: 0.5; } \
		100% { -webkit-transform: rotate(0deg); -webkit-transform-origin: center center; opacity: 0; } \
	} \
	@-o-keyframes home { \
		0% { -o-transform: rotate(0deg); -o-transform-origin: center center; opacity: 0; } \
		10% { -o-transform: rotate(180deg); opacity: 0.5; } \
		30% { -o-transform: rotate(360deg); opacity: 0.7; } \
		45% { -o-transform: rotate(0deg); opacity: 1; } \
		50% { -o-transform-origin: center } \
		55% { -o-transform: rotate(0deg); opacity: 1; } \
		70% { -o-transform: rotate(360deg); opacity: 0.7; } \
		90% { -o-transform: rotate(180deg); opacity: 0.5; } \
		100% { -o-transform: rotate(0deg); -o-transform-origin: center center; opacity: 0; } \
	} \
	.zIcon:hover {animation: hover 1s infinite !important;, -moz-animation: hover 1s infinite !important;, -webkit-animation: hover 1s infinite !important;, -o-animation: hover 1s infinite !important;} \
	@keyframes hover { \
		0% { transform: translateX(0%); } \
		15% { transform: translateX(-25%) rotate(-5deg); } \
		30% { transform: translateX(20%) rotate(3deg); } \
		45% { transform: translateX(-15%) rotate(-3deg); } \
		60% { transform: translateX(10%) rotate(2deg); } \
		75% { transform: translateX(-5%) rotate(-1deg); } \
		100% { transform: translateX(0%); } \
	} \
	@-moz-keyframes hover { \
		0% { -moz-transform: translateX(0%); } \
		15% { -moz-transform: translateX(-25%) rotate(-5deg); } \
		30% { -moz-transform: translateX(20%) rotate(3deg); } \
		45% { -moz-transform: translateX(-15%) rotate(-3deg); } \
		60% { -moz-transform: translateX(10%) rotate(2deg); } \
		75% { -moz-transform: translateX(-5%) rotate(-1deg); } \
		100% { -moz-transform: translateX(0%); } \
	} \
	@-webkit-keyframes hover { \
		0% { -webkit-transform: translateX(0%); } \
		15% { -webkit-transform: translateX(-25%) rotate(-5deg); } \
		30% { -webkit-transform: translateX(20%) rotate(3deg); } \
		45% { -webkit-transform: translateX(-15%) rotate(-3deg); } \
		60% { -webkit-transform: translateX(10%) rotate(2deg); } \
		75% { -webkit-transform: translateX(-5%) rotate(-1deg); } \
		100% { -webkit-transform: translateX(0%); } \
	} \
	@-o-keyframes hover { \
		0% { -o-transform: translateX(0%); } \
		15% { -o-transform: translateX(-25%) rotate(-5deg); } \
		30% { -o-transform: translateX(20%) rotate(3deg); } \
		45% { -o-transform: translateX(-15%) rotate(-3deg); } \
		60% { -o-transform: translateX(10%) rotate(2deg); } \
		75% { -o-transform: translateX(-5%) rotate(-1deg); } \
		100% { -o-transform: translateX(0%); } \
	} \
	#kecilId:hover, .emotClick:hover {animation: pulse 1s;, -moz-animation: pulse 1s;, -webkit-animation: pulse 1s;, -o-animation: pulse 1s;} \
	@keyframes pulse { \
		0% { transform: scale(1); }	 \
		50% { transform: scale(2); } \
		100% { transform: scale(1); } \
	} \
	@-moz-keyframes pulse { \
		0% { -moz-transform: scale(1); }	 \
		50% { -moz-transform: scale(2); } \
		100% { -moz-transform: scale(1); } \
	} \
	@-webkit-keyframes pulse { \
		0% { -webkit-transform: scale(1); }	 \
		50% { -webkit-transform: scale(2); } \
		100% { -webkit-transform: scale(1); } \
	} \
	@-o-keyframes pulse { \
		0% { -o-transform: scale(1); }	 \
		50% { -o-transform: scale(2); } \
		100% { -o-transform: scale(1); } \
	} \
	'
	);	

	$.fn.extend({
        insertAtCaret: function (myValue) {
            return this.each(function (i) {
                if (document.selection) {
                    //For browsers like Internet Explorer
                    this.focus();
                    sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                } else if (this.selectionStart || this.selectionStart == '0') {
                    //For browsers like Firefox and Webkit based
                    var startPos = this.selectionStart;
                    var endPos = this.selectionEnd;
                    var scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
            })
        }
    });
	
	$(".emotClick").click(function(event){
		var imgbbb = '[img]';
		var imgbba = '[/img]';
        	var emotiText = $(event.target).attr("src");
        	$(".cke_source").insertAtCaret(imgbbb + emotiText + imgbba);
    	});	
	$(".zIcon").click(function(event){
		var imgbbb = '[SIZE=2][FONT=Comic Sans MS][B][COLOR="#40E0D0"]';
		var troll = 'TROLOLOLOLOL';
		var imgbba = '[/COLOR][/B][/FONT][/SIZE]';
        	$(".cke_source").insertAtCaret(imgbbb + troll + imgbba);
    	});
	
	
});