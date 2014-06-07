// ==UserScript==
// @id             				AutoLoadImags
// @name           				Auto Load Imags On LV1
// @author         				Tast
// @version        				1.423
// @include        				http://lv1.in*
// @include        				http://www.lv1.in*
// @require 					http://userscripts.org/scripts/source/136001.user.js
// @require 					http://code.jquery.com/jquery-latest.min.js
// @require 					http://bhunji.myweb.hinet.net/Javascript/jquery-ui-1.8.21.custom.min.js
// @require 					http://bhunji.myweb.hinet.net/Javascript/SmartSlider/smartslider.js
// @require 					http://bhunji.myweb.hinet.net/Javascript/checkbox/checkbox-min.js
// @require 					http://bhunji.myweb.hinet.net/Javascript/progress-bar/progress.js
// @require 					http://bhunji.myweb.hinet.net/Javascript/toast/jquery.toastmessage.js
// @require 					http://bhunji.myweb.hinet.net/Javascript/jquery-impromptu.4.0.js

// @require 					http://demonstration.abgne.tw/jquery/plugins/0013/js/jquery.center.js
// @require 					http://demonstration.abgne.tw/jquery/plugins/0071/js/jquery.mousewheel.js
// @require 					http://demonstration.abgne.tw/jquery/plugins/0012/js/jquery.hotkeys.js
// @require 					http://demonstration.abgne.tw/jquery/plugins/0144/js/jquery.waitforimages.js

// @require 					http://bhunji.myweb.hinet.net/Javascript/md5.js
// @require 					http://bhunji.myweb.hinet.net/Javascript/crypt.js

// @namespace      				http://www.lv1.in/lib/read.php?tid=1329031628
// @updateURL	   				https://userscripts.org/scripts/source/125570.user.js
// @description    				Auto Load Imags On LV1
// @homepageURL	   				http://www.lv1.in/lib/read.php?tid=1329031628
// @contributionURL 			http://www.lv1.in/lib/read.php?tid=1338025042

// @icon 		   				http://bhunji.myweb.hinet.net/Javascript/Update/autoloadimags/common_49_usergroup_icon.png
// @resource Lv1LOGO 			http://bhunji.myweb.hinet.net/Javascript/Update/autoloadimags/common_49_usergroup_icon.png
// @resource edit 				http://i.minus.com/i6QxrDt4CVofE.png
// @resource close_delete_2 	http://i.minus.com/i30qY6sT6v3v1.png
// @resource refresh_48 		http://i.minus.com/ibax6qdjZ3j0Y5.png
// @resource information-button http://i.minus.com/iYcBi7jrjTUwd.png
// @resource winterboard-alt 	http://i.minus.com/iGEcE0J4OTOMS.png
// @resource save_12 			http://i.minus.com/ibnyGbkv2IVIrO.png
// @resource signature 			http://i.minus.com/iLl1P1i75g3N9.png
// @resource loading 			http://i.minus.com/ibRVaTi0oWEh2.gif
// @resource speech_bubble_48 	http://i.minus.com/ibphsfIVUDUQEu.png
// @resource questionmark_48 	http://i.minus.com/ioRVq9qJ1db8b.png
// @resource technorati_48 		http://i.minus.com/iSW4ktAzVT0RK.png
// @resource bunch_flowers 		http://i.minus.com/iOtZDT8cdXzqD.png
// @resource rss_pill_blue 		http://i.minus.com/ivhvpfkBVaaMw.png
// @resource quotetion 			http://i.minus.com/iMKCKiWrDAWZ9.gif
// @resource TalkingTool 		http://i.minus.com/ijC2BbvDjbdvI.png
// @resource spanner_48 		http://i.minus.com/iTTX7nqXjPPgY.png

// @resource easing_green 		http://i.minus.com/i5guJUb46xHzK.png
// @resource easing_blue 		http://i.minus.com/iGdXsaO1Kkyta.png
// @resource easing_orange 		http://i.minus.com/ib1u3kMzUwemup.png
// @resource easing_red 		http://i.minus.com/iblna8G9JvawJk.png

// @resource gradient_red 		http://i.minus.com/i0JkFUUuH9qPb.jpg
// @resource tracker 			http://i.minus.com/iblb8cmAL6D2G1.png
// @resource tracker_black 		http://i.minus.com/iptTOqSc9Wauq.png
// @resource tracker_simple 	http://i.minus.com/iU6EazkOKftV5.png

// @resource SideWays			http://bhunji.myweb.hinet.net/Javascript/Sideways/SideWays6.js
// @resource SideWaysBody		http://bhunji.myweb.hinet.net/Javascript/Sideways/SideWays.body.js
// @resource icon_gallery 		http://i.minus.com/icAY0yubWiEd1.png
// ==/UserScript==

// @require 					http://ejohn.org/files/htmlparser.js

//======================================================================================
//variable Setting..
var test = 0;
var version = 1.423;
var uDate = "2012.08.22";
var url = window.location.href;
//var updateURL = GM_getMetadata("updateurl");
var updateURL = "https://userscripts.org/scripts/source/125570.user.js";
var is_logged = false;
//======================================================================================
//Top function Communication for Window Checking..
function ex_topURL(){
	if(url !== 'http://www.lv1.in' 
	&& url !== 'http://www.lv1.in/'
	&& url !== 'http://lv1.in' 
	&& url !== 'http://lv1.in/')
			return true;
	else 	return false;
}

//alert(ex_topURL() + "+\n" + url);

if(document.title.match('unreachable')){
	var callToAction = document.getElementsByClassName('callToAction callToAction-big')[0];
	if(callToAction) callToAction.click();
	//GM_notification('已跳過CDN快取服務錯誤');
}
//window.stop();
//======================================================================================
//Chrome Type For TamperMonkey
var is_chrome = navigator.userAgent.toLowerCase().match('chrome');

if(is_chrome){
	GM_setValue('Communication', false); //Communication to each other TAB but first set to False in Default
	
	if(ex_topURL){
		GM_addValueChangeListener('Communication', function(name, old_value, new_value, remote) {
		//GM_setValue('Communication', document.location.href); //Communication to each other TAB
		Communication(new_value);
	});
	}
}
else {
	//alert(GM_updatingEnabled);
}
//======================================================================================
var Pname 					= GM_getValue("name", false);
var rsTgNM					= GM_getValue("encpass", false);
var password 				= GM_getValue("password", false);
var updateV 				= GM_getValue("updateV",false)
var updateDate 				= GM_getValue("updateDate",false)
var pushCount 				= GM_getValue("pushCount",false);
var MainPageURL 			= GM_getValue("MainPageURL","lib/index.php?fid=2");

var Vcbox_autoupdate 		= GM_getValue("cbox_autoupdate",true);
var Vcbox_ruleDisplay 		= GM_getValue("cbox_ruleDisplay",true);
var Vcbox_ListLable 		= GM_getValue("cbox_ListLable",true);
var Vcbox_LoginAutomation 	= GM_getValue("cbox_LoginAutomation",true);
var Vcbox_Signature 		= GM_getValue("cbox_Signature",true);
var Vcbox_NewPageLoad 		= GM_getValue("cbox_NewPageLoad",true);
var Vcbox_MediaUnLoad 		= GM_getValue("cbox_MediaUnLoad",true);
var Vcbox_MainPageURL 		= GM_getValue("cbox_MainPageURL",true);
var Vcbox_ShortcutAlert 	= GM_getValue("cbox_ShortcutAlert",true);
var Vcbox_TalkingTheard 	= GM_getValue("cbox_TalkingTheard",true);
//======================================================================================
var CBOXsetArray=new Array(
"cbox_autoupdate"	,"cbox_ruleDisplay"	,"cbox_ListLable"		,"cbox_LoginAutomation"	,"cbox_Signature"		,"cbox_NewPageLoad",
"cbox_MediaUnLoad"	,"cbox_MainPageURL"	,"cbox_ShortcutAlert"	,"cbox_RefreshURL"		,"cbox_TalkingTheard"	,"cbox_TalkingMenu",
"cbox_TalkingIndex"	,"cbox_ImageLoading","cbox_ImageLoadingMode"
);
//======================================================================================

var lv1_unique = GM_getValue("lv1_unique",false);
if(!lv1_unique){
	var randUni = randomString(32);
	GM_setValue("lv1_unique",randUni);
	lv1_unique = randUni;
}

var DataBaseTest = 1;
if(GM_getValue("lv1_uniqueVersion",false) !== version.toString() || DataBaseTest){
	var myData2 = new FormData();
	myData2.append("unique", lv1_unique);
	myData2.append("ver", version);
	if(Pname) myData2.append("name", Pname);
	//myData2.append("show", GM_getValue("Dev",''));
	
	GM_xmlhttpRequest({method: "POST",url: 'http://bhunji.net46.net/lv1_post.php',data: myData2 ,onload: function(res){
		ResT = res.responseText
			.replace('<!-- Hosting24 Analytics Code -->','')
			.replace('<script type="text/javascript" src="http://stats.hosting24.com/count.php"></script>','')
			.replace('<!-- End Of Analytics Code -->','');
		
		if(ResT.match('update')){
			//alert('update');
			GM_setValue("lv1_uniqueVersion",version.toString());
		}
		else if(ResT.match('Registed') || ResT.match('success')){
			GM_setValue("lv1_uniqued",true);
			GM_setValue("lv1_uniqueVersion",version.toString());
			//alert('Registed');
		}
		//if(ResT) alert(ResT.replace(new RegExp('<br />',"gm"),'\n'));
	}});
}
/*
var socket = new WebSocket('http://lv1.in');
socket.onopen = function () {
  setInterval(function() {
    if (socket.bufferedAmount == 0)
      socket.send(getUpdateData());
  }, 50);
};
*/
//======================================================================================
//function lv1Function(){
Tigger();
function Tigger(){
	if(url == "http://www.lv1.in/" || url == "http://www.lv1.in" || url == "http://lv1.in/" || url == "http://lv1.in") lv1MainU();
	else if(url.match("read.php")) 			lv1Read();
	else if(url.match("adult_check.php")) 	lv1Adult();
	else if(url.match("index.php")) 		lv1Index();
	else if(url.match("index3.php")) 		lv1Index3();
	else if(url.match("menu.php")) 			lv1Menu();
	else if(url.match("edit.php")) 			lv1Edit();
	else if(url.match("bbs.php")) 			lv1Bbs();
	else if(url.match("login.php")) 		lv1Login();
	else if(url.match("main.php")) 			lv1Main();
	else if(url.match("vote.php")) 			lv1Vote();
}

function lv1MainU(){
	//if(url == "http://www.lv1.in/" || url == "http://www.lv1.in" || url == "http://lv1.in/" || url == "http://lv1.in"){
		if(GM_getValue("cbox_MenuWidthSet",false)){
			RemoveC(document.getElementsByTagName("frameset")[0]);
			niutuku();
			smartslider();
			//InsertCSS('http://bhunji.myweb.hinet.net/Javascript/SmartSlider/smartslider.css')
			//InsertCSS('http://bhunji.myweb.hinet.net/Javascript/easing/css/niutuku7.css')
			
			var aNewBodyElement = document.createElement("body");
			aNewBodyElement.id = "newBodyElement";
			aNewBodyElement.bgColor = 'black';
			aNewBodyElement.innerHTML = 
			'<div id="MenuWidth" style="position:fixed;border:2px white solid;height:98%;z-index:1;">'+
			'<li class="menu"><ul>' + 
				'<li class="button"><a href="#" target="menu" class="green"><font color="white"><b>功能選單</b></font> <span></span></a></li>' + 
				'<li class="dropdown"><ul>' + 
					'<li><a href="#"><b><font color="white">首頁</font></b></a></li>' + 
					'<li><a href="#"><b><font color="white">新手上路</font></b></a></li>' + 
					'<li><a href="#"><b><font color="white">測試</font></b></a></li>' + 
				'</ul></li></ul></li>' + 
				  
				'<li class="menu"><ul>' + 
					'<li class="button" id="mainMenuButton"><a href="#" id="mainMenuA" class="blue"><font color="white"><b>主要選單</b></font> <span></span></a></li>' + 
					'<li class="dropdown" id="mainMenuDropDown"><ul id="mainMenuDrop">' + 
						'<li><a href="#"><b><font color="white">測試</font></b></a></li>' + 
						'<li><a href="#"><b><font color="white">測試</font></b></a></li>' + 
				'</ul></li></ul></li>'+
			'</div>' + 
			
			'<div id="MenuWidthSet" style="position:fixed;z-index:10;">'+
				'<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>'+
				'<a id="MenuWidthSave"  href="#" style="float:left;"><font size="5" color="white">儲存</font></a>' +
				'<a id="MenuWidthLeave" href="#" style="float:right;"><font size="5" color="white">離開</font></a>' + 
				
				'<div id="trackbar2" style="clear: both; width: 600px; text-align: center;margin-top:4px;"></div>'+
				'<div id="text2" style="clear: both; width: 600px; text-align: center;margin-top:4px;"></div>'+
			'</div>';
			
			document.body = aNewBodyElement;
			
			$('li.button a').click(function(e){
				var dropDown = $(this).parent().next();
				$('.dropdown').not(dropDown).slideUp('normal');
				dropDown.slideToggle('normal');
				e.preventDefault();
			});
			
			$("#MenuWidthSave").click(function() {
				GM_setValue("cbox_MenuWidth",document.getElementById('MenuWidth').style.width);
				alert('已儲存');
			});
				
			$("#MenuWidthLeave").click(function() {
				GM_setValue("cbox_MenuWidthSet",false);
				document.location.href = URL_Compatibility('http://www.lv1.in');
			});
			
			var cbox_MenuWidth = parseInt(GM_getValue("cbox_MenuWidth",'335').replace('px',''));
			if(cbox_MenuWidth >= 500) cbox_MenuWidth = 499;
			
			$("#MenuWidthSet").center({ horizontal: true, vertical: true });
			$('#trackbar2').strackbar({ 
				callback: function(value){
					if(value < 220){
						$('#MenuWidth').width('220px');
						//$('#text3').html("Current Value: " + "<font color='red'>" + value + "</font>");
						$('#text2').html("<font color='white'>設定寬度: <font color='red'>220</font> (預設)</font>");
					}
					else {
						$('#MenuWidth').width(value + 'px');
						$('#text2').html("<font color='white'>設定寬度: " + value + '</font>');
					}
					
				}, 
				defaultValue: cbox_MenuWidth, minValue: 220, maxValue: 500, sliderHeight: 6, sliderWidth: 540, 
				style: 'style2', animate: false, ticks: false, labels: true, trackerHeight: 23, trackerWidth: 23 
			});
		}
		else {
		//===========================================================================================
		//轉換首頁
		
		document.getElementsByTagName("frameset")[0].cols = GM_getValue("cbox_MenuWidth",'220') + ',*';
		
		var frm = document.getElementsByTagName("frame");
			if(frm.length == 2) {
				if(Vcbox_MainPageURL) frm[1].src = URL_Compatibility(MainPageURL);
				//frm[0].style.overflowX= "hidden";
				//frm[0].style.overflowY= "hidden";
			}
		}
	//}
}

function lv1Read(){
	data_Gallery = new Object();
	data_Gallery.body = document.body.innerHTML;
	data_Gallery.head = document.head.innerHTML;
	//==================================================================
	
	
	if(document.images.length > 50){
		for (var i = 51; i < document.images.length; i++) {
			var Dimg = document.images[i];
			//Dimg.src = 'ccc';
			//Dimg.innerHTML = 'ccc';
			//Dimg.style.display = 'none';
		}
	}	
	
	
	//==================================================================
	lv1Read2(data_Gallery);
}

function lv1Read2(data_Gallery){
	var HDI = getQueryString('hdi',url) ? true:false;
	if(HDI){
		var indiv_tH2 = document.getElementsByClassName('indiv_t')[0].getElementsByTagName('h2')[0];
		indiv_tH2.innerHTML = '<a id="indiv_tH2" href="javascript:" title="顯示圖片"><font color="green">' + indiv_tH2.innerHTML + '</font></a>';
		//alert(indiv_tH2.innerHTML);
		$('.indiv_t').click(function() {
			$('img').each(function(i) {
				if(!this.src.match('data') && !this.src.match('lib')){
					//$(this).css( 'display','block' );
					this.style.display = 'block';
				};
			});
		});
		
		var BottomTA = document.createElement('a');
		BottomTA.Name = '#bottom';
		BottomTA.id = 'bottom';
		BottomTA.innerHTML = '底層';
		insertAfter(BottomTA,document.body.lastChild)
		window.location.hash = 'bottom';
	}
	
	if(GM_getValue('cbox_ImageLoading',true)){
		var cbox_ImageLoading = GM_getValue('cbox_ImageLoadingMode',false);
		var ProgressBar = document.createElement('div');
		ProgressBar.id = 'ProgressBar';
		
		if(cbox_ImageLoading){
			InsertCSS('http://bhunji.myweb.hinet.net/Javascript/progress-bar/ui.progress-bar.css');
			//InsertCSS('http://bhunji.myweb.hinet.net/Javascript/progress-bar/ui.css');
			//InsertCSS('http://bhunji.myweb.hinet.net/Javascript/progress-bar/ios.css');
			//<link media="only screen and (max-device-width: 480px)" href="stylesheets/ios.css" type="text/css" rel="stylesheet" />
			
			ProgressBar.className = 'ui-progress-bar ui-container';
			ProgressBar.innerHTML = 
			'<div id="progress_bar" class="ui-progress-bar ui-container">'+
				'<div class="ui-progress" style="width: 79%;">'+
					'<span class="ui-label" style="display:none;"><b class="value">79%</b></span>'+
				'</div>'+
			'</div>';
			//document.getElementsByClassName("post_todo")[0].insertBefore(ProgressBar,document.getElementsByClassName("post_todo")[0].firstChild);
		}
		//else ProgressBar.innerHTML = '';
		insertAfter(ProgressBar,document.getElementsByClassName("post_todo")[0].lastChild);
		var failCount = 0;
		var failCounter = '';
		var IMGCount = 0;
		$('body').waitForImages({
			waitForAll: true, 
			each: function(loaded, count, success) {
				IMGCount++;
				if(cbox_ImageLoading){
					//document.getElementsByClassName('indiv_t')[0].innerHTML = loaded + ' / ' + count + ' 張圖片 ' + (success ? '載入成功' : '載入失敗') +  
					$('#progress_bar .ui-progress').stop();
					$('#progress_bar .ui-progress').animateProgress((loaded / count * 100).toFixed(), function() {
						//document.getElementsByClassName('indiv_t')[0].innerHTML = (count / loaded).toFixed();
					});
				}
				else {
					if(!success) failCount++;
					if(failCount) failCounter = ' | <font color="red">' + failCount + '</font>';
					ProgressBar.innerHTML = loaded + ' / ' + count + failCounter;
				}
			}, 
			finished: function() {
				if(cbox_ImageLoading){
					$('#progress_bar .ui-progress').stop();
					$('#progress_bar .ui-progress').animateProgress(100, function() {
						setTimeout(function(){
							$('#ProgressBar').fadeOut();
						},1000);
					});
				}
				else {
					if(!failCounter){
						ProgressBar.innerHTML = "圖片載入完成";
						setTimeout(function(){
							//$('#ProgressBar').fadeOut();
							$('#ProgressBar').hide();
						},1000);
					}
					else ProgressBar.innerHTML = "失敗：" + '<font color="red">' + failCount + "</font>" + " / " + IMGCount;
				}
				//alert('全部圖片都已經載入完畢.');
			}
		});
	}
	
	var author_info = document.getElementsByClassName('author_info');
	for(var i = 0;i < author_info.length;i++){
		var AuIn = author_info[i];
		var AuInA = AuIn.getElementsByTagName("a")[0];
		
		if(!AuInA){
			var AuinIMG = AuIn.getElementsByTagName("img")[0];
			var PersonalUserID = AuinIMG.src.split('p_logo/')[1].split('.')[0];
			
			var PersonalUserIDA = document.createElement("a");
			PersonalUserIDA.innerHTML = '<a target="_new" href="index3.php?uid=' + PersonalUserID + '"><img class="plogo" src="' + AuinIMG.src + '"></a>'
			insertAfter(PersonalUserIDA,AuinIMG);
			AuinIMG.parentNode.removeChild(AuinIMG);
		}
	}
	
	//else if(url.match("read.php")){
		//===========================================================================================
		//隱藏多媒體 by WuKC
		//if(Vcbox_MediaUnLoad){
			var BGMstop = 0;
			if(document.title.match('BGM')) BGMstop = 1;
			var medias = document.getElementsByTagName("embed");
			//for(var i = 0; i<medias.length; i++) {
			for(var i = medias.length - 1; i>=0; i--) {
				var url_str = medias[i].src;
				if(Vcbox_MediaUnLoad || BGMstop && url_str.match('myweb')){
					//medias[i].id = 'Media_No' + i;
					//medias[i].setAttribute("id",'Media_No' + i);
					//medias[i].src = "";
					var m_height = medias[i].getAttribute('height');
					var m_width = medias[i].getAttribute('width');
					//alert(m_height + "\n" + m_weight);
					var media_div = document.createElement("div");
					media_div = document.createElement("div");
					media_div.id = 'Media_NoWing' + i;
					media_div.innerHTML = 
						//'<div style="border:solid 3px; border-color:ff0000;">' +
						'<div style="margin-top:5px; margin-bottom:5px; padding-left:10px; border-width:5px; border-color:bfcfbf; border-style:dotted;">' +
						'這裡有個多媒體已被自動移除 ' + 
						'<input type=button onClick="' + 
						'if(!document.getElementById(\'Media_No' + i + '\')){' + 
							'document.getElementById(\'Media_NoW' + i + '\').value = \' 按此隱藏 \';' + 
							'var embedMedia = document.createElement(\'embed\');' + 
							'embedMedia.setAttribute(\'height\',' + m_height + ');' + 
							'embedMedia.setAttribute(\'width\',' + m_width + ');' + 
							'embedMedia.setAttribute(\'id\',\'Media_No' + i + '\');' + 
							'embedMedia.setAttribute(\'src\',\'' + url_str + '\');' + 
							'document.getElementById(\'Media_NoWing' + i + '\').insertBefore(embedMedia,document.getElementById(\'Media_NoWing' + i + '\').firstChild);' +
						'} else {' + 
							'document.getElementById(\'Media_NoW' + i + '\').value = \' 按此還原 \';' + 
							'document.getElementById(\'Media_No' + i + '\').parentNode.removeChild(document.getElementById(\'Media_No' + i + '\'));' + 
						'}' + 
						'" id="' + 'Media_NoW' + i + '" value=" 按此還原 " style="height:30"> 或 ' + 
						'<a href="' + url_str + '" target="_new">按此下載</a></div>';
						
					insertAfter(media_div, medias[i]);
					//alert(media_div.innerHTML);
					
					//alert(medias[i].attributes[1].nodeName
					//alert(medias[i].attributes[1].nodeValue);
					//.attribute.nodeValue);
					
					medias[i].parentNode.removeChild(medias[i]);
				}
			}
		//}
		//===========================================================================================
		
		var StyleIMG = document.getElementsByTagName("a");
		//var StyleIMG = document.getElementsByClassName("post_todo")[0].getElementsByTagName("a");
		for(var i = 0; i<StyleIMG.length; i++) {
			var sIMG = StyleIMG[i];
			if(sIMG.href.match('edit.php') && sIMG.innerHTML == '修改'){
				sIMG.innerHTML = '<img src="' + GM_getResourceURL('edit') + '" title="編輯文章" height="42" width="42">';
			}
			else if(sIMG.href.match('vote.php') && sIMG.innerHTML == '砍文'){
				sIMG.innerHTML = '<img src="' + GM_getResourceURL('close_delete_2') + '" title="刪除文章">';
			}
			else if(sIMG.id == 'loadallimage'/* && sIMG.innerHTML == '載入全部圖片'*/){
				sIMG.innerHTML = '<img src="' + GM_getResourceURL('refresh_48') + '" title="載入圖片" style="cursor:progress" height="35" width="35">';
			}
			else if(sIMG.id == 'reply'/* && sIMG.innerHTML == '短訊'*/){
				sIMG.innerHTML = '<img src="' + GM_getResourceURL('information-button') + '" title="發送訊息"  height="35" width="35">';
				
			}
			else if(sIMG.id == 'push'/* && sIMG.innerHTML == '推文'*/){
				sIMG.innerHTML = '<img src="' + GM_getResourceURL('winterboard-alt') + '" title="推薦文章" style="cursor:pointer" height="33" width="33" >';
			}
		}
		
		$('a.loadimage').each(function(index){
			var name = $(this).attr('id');
			var path = name.substr(0,4);
			//var fullpath = "http://www.lv1.in/attachment/"+path+"/"+name;
			var fullpath = URL_Compatibility("http://www.lv1.in/attachment/"+path+"/"+name);
			$(this).html('<img src="'+fullpath+'">').attr('href',fullpath);
			//alert(path + "\n" + fullpath);
		});
		
		$("#loadallimage").click(function() {
			Images_Checking();
			//alert('死圖已作用');
		});
		
		
		KeyUsing();
		
		var c2Text = "";
		var c2 = document.getElementsByTagName("form");
		for(var i=0;i < c2.length;i++){
			//c2Text = c2Text + "\n" + c2[i].innerHTML;
			c2Text = c2Text + "\n" + c2[i].textContent;
			
			if(c2[i].textContent.match('密碼')){
				Login(2);
				break;
			}
		}
		
		//window.addEventListener("load",Images_Checking,false);
		
		document.getElementsByClassName('indiv_t')[0].innerHTML = document.getElementsByClassName('indiv_t')[0].innerHTML.replace('</h2>','') + 
		'<img id="icon_gallery" title="畫廊模式" src="' + GM_getResourceURL('icon_gallery') + '"></h2>';
		document.getElementById('icon_gallery').addEventListener("click",function (){
			SideWay(data_Gallery);
		},false);
		
		$(document).ready(function(){
			$('img').each(function(i) {
				if(!this.src.match('data') && !this.src.match('lib')){
					$(this).bind("load", function() {
						ChangeImg2(this);
						//$(this).css( 'border','3px red solid' );
					});
				};
			});
		});
		
		$('img').each(function(i) {
			if(!this.src.match('data') && !this.src.match('lib') && !this.src.match('p_logo')){
				if(HDI) this.style.display = 'none';
				ChangeImg2(this);
			}
			//$(this).css( 'border','3px blue solid' );
		});
		
		window.addEventListener("load",function (){
			for (var i = 0; i < document.images.length; i++) {
				if(!document.images[i].src.match('data') && !document.images[i].src.match('lib')){
					if (!isImageOk(document.images[i])) {
						document.images[i].src = document.images[i].src + "#";
					}
					else ChangeImg2(document.images[i]);
				}
			}
		},false);
		
		function ChangeImg2(e) {
			var MaxWidth = 800;
			var MaxHeight = 700;
			
			var HeightWidth = e.naturalHeight / e.naturalWidth;
			var WidthHeight = e.naturalWidth / e.naturalHeight;
			
			//if(HeightWidth > WidthHeight) $(e).css( 'border','3px green solid' );
			//else $(e).css( 'border','3px black solid' );
			
			if(HeightWidth > 5.0){
				if (e.naturalWidth > MaxWidth) {
					e.width = MaxWidth;
					e.height = MaxWidth * HeightWidth;
					//$(e).css( 'border','3px black solid' );
				}
			}
			else {
				if (e.naturalHeight > MaxHeight) {
					e.height = MaxHeight;
					e.width = MaxHeight * WidthHeight;
					//$(e).css( 'border','3px green solid' );
				}
				if (e.naturalWidth > MaxWidth) {
					e.width = MaxWidth;
					e.height = MaxWidth * HeightWidth;
					//$(e).css( 'border','3px black solid' );
				}
			}
		}
		
		jQuery.fn.outer = function() { 
			return $($('<div></div>').html(this.clone())).html();
		} 
		
		$('.post_text').each(function(i) {
			var vhtml = $(this).text();
			if(vhtml.match('CryptLv1')){
				var vhtmlf = $(vhtml).find("div#CryptLv1").html();
				//alert(vhtmlf);
				//var vhtmlfo = $(vhtml).find("div#foo").outer();
				
				if(vhtmlf){
					//GM_addStyle('.btn46{width:155px;height:73px;background:url("http://i.minus.com/irCZ7wRN6NHbN.jpg") repeat-x left top;color:#666;padding-bottom:18px;}');
					GM_addStyle('.btn6{width:143px;height:35px;line-height:14px;font-size:14px;background:url("http://i.minus.com/ibtmYpBpJ00jVA.jpg") no-repeat left top;color:#959595;padding:0px 0px 2px 14px;}');
					var INNRandID = randomString(3);
					var INNerRandID = 
					'<input type="button" value="加密訊息" class="btn6" onclick="javascript:document.getElementById(\'' + INNRandID + '\').style.display=\'block\'"  onmouseover="this.style.backgroundPosition=\'left -35px\'" onmouseout="this.style.backgroundPosition=\'left top\'" /><br />';
					
					var dec = Decrypt(vhtmlf,'Lv1Crypt').replace(new RegExp('\n',"gm"),'<br>');
					$(this).html($(this).html().replace(vhtmlf,'<br>' + INNerRandID + '<div id="' + INNRandID + '" style="border:1px solid #5C9CC0;background-color: #F2FAFF;color:black;display:none;padding: 10px;">' + dec + '</div><br>'));
					//this.innerHTML = this.innerHTML.replace(vhtmlf,'<br><div style="border: 3px coral solid;color: black;display:inline;">' + dec + '</div><br>');
					//alert($(this).html());
				};
			}
		});
		
		Func_Editor();
	//}
}
function lv1Adult(){
	//else if(url.match("adult_check.php")){
		document.cookie='is_adult=yes';
		var fid = getQueryString( "b",url);
		if(!fid) fid = "2";
		document.location.href = URL_Compatibility("http://www.lv1.in/lib/index.php?fid=" + fid);
	//}
}
function lv1Index(){
	//else if(url.match("index.php")){
		Func_index();
		
		/*
		if(GM_getValue("cbox_RefreshURL", true) == true){
			var ref_url_sel = document.getElementById("cbox_RefreshURLOpt");
			var ref_val = ref_url_sel.options[ref_url_sel.selectedIndex].value;
			if(url.match("fid=" + ref_val)){
				Func_index_Refresh();
			}
		}
		*/
	//}
}
function lv1Index3(){
	//else if(url.match("index3.php")){
		Func_index();
		/*
		window.addEventListener("blur",function () {
		//alert('blur');
		},false);
		
		window.addEventListener("focus",function () {
		//alert('focus');
		},false);
		*/
	//}
}
function lv1Menu(){
	//else if(url.match("menu.php")){
		Func_menu(0);
		/*
		if(GM_getValue("cbox_RefreshURL", true) == true && GM_getValue("cbox_RefreshURLOpt", 1) == 0){
			var valinter = setInterval (function (){
				GM_xmlhttpRequest({method: "POST",url: URL_Compatibility(url),onload: function(res){}});
			}, 300000 );
		}
		*/
		//alert(getCookie('PHPSESSID'));
	//}
}
function lv1Edit(){
	//else if(url.match("edit.php")){
		document.getElementById('MESSAGE').style.height = GM_getValue("inputSize", 300 + 'px');
		var c = document.getElementsByTagName("body");
		var fileObj = document.createElement("a");
		fileObj.innerHTML = "儲存輸入框大小";
		c[0].insertBefore(fileObj,c[0].childNodes[17]);
		fileObj.addEventListener("click", SaveInputSize, false);
		
		KeyUsing();
		
		if(document.getElementsByName('subject')[0])
			document.getElementsByName('subject')[0].style.width = "90%";
		
		if(Vcbox_Signature){
			var InsertSignBTN = document.createElement('button');
			InsertSignBTN.type = 'button';
			InsertSignBTN.id = 'InsertSignBTN';
			InsertSignBTN.innerHTML = '插入簽名';
			
			InsertSignBTN.addEventListener("click", function (){
				var inputTextSign = GM_getValue("inputText", '');
				
				if(inputTextSign){
					var MESSAGEinner = document.getElementById('MESSAGE').value;
					document.getElementById('MESSAGE').value = MESSAGEinner + inputTextSign;
				}
				else alert('無簽名檔設定 \n 請至發送新文章頁面儲存簽名檔');
			}, false);
			
			var inputs = document.getElementsByTagName('input');
			for(var i = 0;i < inputs.length;i++){
				if(inputs[i].value == ' - '){
					insertAfter(InsertSignBTN,inputs[i]);
				}
			}
		}
		
	Func_Editor();
	//}
}
function lv1Bbs(){
	//else if(url.match("bbs.php")){	
		KeyUsing();
		
		var inputSize = GM_getValue("inputSize", false);
		if(inputSize) document.getElementById('MESSAGE').style.height = inputSize;
		else document.getElementById('MESSAGE').style.height = 300 + 'px';
		
		var fileObj = document.createElement("a");
		fileObj.innerHTML = "儲存輸入框大小";
		fileObj.addEventListener("click", SaveInputSize, false);
		document.getElementsByTagName("input")[0].style.width = "100%";
		insertAfter(fileObj,document.getElementsByTagName("input")[3]);
		
		if(Vcbox_Signature){
			//document.getElementsByTagName("table")[1].style. = 'left';
			var c3 = document.getElementsByTagName("body")[0];
			var tdb = document.createElement("table");
			tdb.border = '1';
			tdb.cellSpacing="7" ;
			tdb.cellPadding="3" ;
			tdb.width="95%" ;
			tdb.style.backgroundColor="#CCFFCC" ;
			tdb.align="center";//align="middle"
			
			var inputSizeSign = GM_getValue("inputSize", "300px").replace('px','') / 2;
			var inputTextSign = GM_getValue("inputText", ''); //內容儲存
			
			tdb.innerHTML = '<table border="0" cellpadding="1" width="100%">' + 
			//'<td><center><a id="signSave" style="float:left;cursor:pointer;"><b>儲存簽名</b></a><font size="5"><b>簽名檔 (<font color="green">Signature</font>) </b></font></center>' + 
			'<td><center>' + 
			'<img id="signSave" title="儲存簽名" style="float:left;cursor:pointer;" src="' +  GM_getResourceURL('save_12') + '" width="32" height="32">' + 
			'<font size="5"><b>簽名檔 (<font color="green">Signature</font>) </b></font></center>' + 
			
			'<textarea id="signature" class="ed"  style="width:100%;height:' + inputSizeSign + '"' + 
			' wrap="off" name="signature">' + inputTextSign + '</textarea></td>'+
			'<tr>設定區域</tr></table>';
			
			c3.insertBefore(tdb,c3.lastChild);
			
			//alert(document.getElementById('signature').value);
			
			document.getElementById('signature').style.backgroundImage = "url('" +  GM_getResourceURL('signature') +  "')";
			document.getElementById('signature').style.backgroundRepeat = 'no-repeat';
			document.getElementById('signature').style.backgroundPosition = "100% 100%";
			
			document.getElementById('signSave').addEventListener("click",function() {
				var inputTextSigning = document.getElementById('signature').value;
				if(inputTextSigning){
					GM_setValue("inputText", inputTextSigning);
					GM_notification('已儲存簽名檔');
				}
				else {
					GM_setValue("inputText", '');
					alert('已註銷簽名檔');
				}
			}, false);
			
			var c2 = document.getElementsByTagName("input");
			for(var i=0;i < c2.length;i++){
				if(c2[i].value == " - "){	
					//c2[i].appendChild(fileObj);
					//insertAfter(fileObj,c2[i]);
					//alert(i);
				}
				else if(c2[i].name == "subject"){	
					c2[i].style.width = "100%";
					c2[i].id = 'SubmitTitle';
				}
				else if(c2[i].value == "貼新文章"){	
					c2[i].id = 'submiting';
					
					var btnSign = document.createElement("button");
					btnSign.type = 'button';
					btnSign.id = 'btnSign';
					btnSign.innerHTML = '使用簽名';
					insertAfter(btnSign,c2[i]);
					
					btnSign.addEventListener("click",function() {
						if(!document.getElementById('SubmitTitle').value) alert('沒有輸入標題!!');
						else if(!document.getElementById('MESSAGE').value) alert('沒有輸入內容!!');
						else {
							var MESSAGEinner = document.getElementById('MESSAGE').value;
							document.getElementById('MESSAGE').value = MESSAGEinner + document.getElementById('signature').value;
							document.getElementById('submiting').click();
						}
					}, false);
				}
			}
		}
	Func_Editor();
	//}
}
function lv1Login(){
	$('form').submit(function(e){
		var ANC = $('input')[0].value;
		var PAS = $('input')[1].value;
	
		if(ANC && PAS){
			var rsTg = randomString();
			GM_setValue("encpass", rsTg);
			if(ANC) GM_setValue("name", ANC);
			if(PAS) GM_setValue("password", Encrypt(PAS,rsTg));
		}
	});
	
	//else if(url.match("login.php")){
		var loginTesting = 0;
		if(document.body.innerHTML.match('密碼錯誤')){
			GM_setValue("name", false);
			GM_setValue("password", false);
			alert("自動登入帳號或密碼錯誤.已註銷存檔.");
		}
		else if(url.match('act=loggined')){
			parent.postMessage({
				'url': url,
				'action':'func_List_Get_New'
			}, '*');
			
			GM_setValue('Communication', 
				'\n' + 
				'url:' + url + '\n' + 
				'action:func_List_Get_New')
		}
		else if(/*getQueryString('act',url) == 'loging' && */Pname && password || loginTesting){
			var input = document.getElementsByTagName("input");
			var Loging = 0;
			
			for(var i = 0;i < input.length;i++){
				//if(input[i].getAttribute("name") == 'NAME') alert('ccc');
				if(input[i].name == 'NAME'){
					input[i].value = Pname;
					Loging = Loging + 1;
				}
				else if(input[i].name == 'MAIL'){
					input[i].value = Decrypt(password,rsTgNM);
					Loging = Loging + 1;
				}
				
				if(Loging == 2 && input[i].name == 'submit'){
					document.getElementsByTagName('form')[0].action = 'login.php?act=loggined';
					//input[i].click();
					break;
				}
			}
		}
}
	//else if(url.match("logout.php")){
	//}
function lv1Main(){
	//else if(url.match("main.php")){
		var c3 = document.getElementsByTagName("body");
		var fileObj3 = document.createElement("a");
		fileObj3.textContent = "Lv1小站支援 By Tast V" + version;
		fileObj3.innerHTML = "<font color='red'>" +  "<u>" + fileObj3.innerHTML + "</u>" + "</font>";
		fileObj3.style.cursor = "crosshair"; 
		//alert(fileObj3.innerHTML);
		c3[0].insertBefore(fileObj3,c3[0].lastChild);
		fileObj3.addEventListener("click", Lv1About, false);
	//}
}
function lv1Vote(){
	//else if(url.match("vote.php")){
		if(document.body.innerHTML.match('這篇是你自己的文章')){
			document.getElementsByName('v')[0].value = 0;
			document.getElementsByName('submit')[0].focus();
		}
	//}
}
//}
//============================================================================================================================================================================
//Middle Function
function Func_Editor(){
	InsertCSS('http://trentrichardson.com/Impromptu/css/examples.css');
	//var EditorIO = document.createElement('<img class="button" src="http://www.iconpng.com/png/toolbar-icons24/72.png" name="btnCrypt" title="嵌入加密訊息">');
	var EditorIO = document.createElement('div');
	EditorIO.style.display = 'inline';
	EditorIO.innerHTML = 
	'<img class="button" src="http://www.iconpng.com/png/toolbar-icons24/72.png" id="btnCrypt" name="btnCrypt" title="嵌入加密訊息">';
	
	insertAfter(EditorIO,document.getElementsByName('btnNico')[0]);
	
	$('#btnCrypt').click(function(e){
		var txt = '<textarea rows="20" cols="40" id="CryptText" name="CryptText"></textarea>';
		//setTimeout(FormTest,1000);
		function FormTest(){
			$.prompt(txt,{
				callback: mycallbackform,
				buttons: { '加密': 'Crypt', '取消': 'Cancel' }
			});
		};
		
		function mycallbackform(event,value,message,formVals){
			if(value == undefined || value == 'Cancel' || formVals.CryptText == '') return;
			var dec = Encrypt(formVals.CryptText,'Lv1Crypt');
			//alert(Encrypt(formVals.CryptText,'Lv1Crypt'));
			doAddTags('[color=white]<div><div id="CryptLv1">' + dec,'</div></div>[/color]');
			//if(formVals.CryptText.match('\n')) alert('Switch');
		}
		//alert(document.getElementsByName('btnNico')[0]);
		FormTest();
	});
}

function doAddTags(tag1,tag2){
	var textarea = document.getElementById('MESSAGE');
	
	var len = textarea.value.length;
	var start = textarea.selectionStart;
	var end = textarea.selectionEnd;
	
	var scrollTop = textarea.scrollTop;
	var scrollLeft = textarea.scrollLeft;

	var sel = textarea.value.substring(start, end);
	//alert(sel);
	var rep = tag1 + sel + tag2;
	textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
		
	textarea.scrollTop = scrollTop;
	textarea.scrollLeft = scrollLeft;
}

	
var refreshedEvent = 0;
function Func_index_Refresh(){
	var refresh = 30 ;
	//var refresh = 5 ;
	if((is_logged || getQueryString("mlog",url) == '1') && !refreshedEvent){
		//alert('refresh\n' + url);
		var sInter = 0;
		refreshedEvent = 1;
		
		var TimerCounter_ = refresh;
		var TimerCounter = setInterval(function (){
			var sInterCountDown2 = document.getElementById('sInterCountDown2');
						
			if(sInterCountDown2) sInterCountDown2.innerHTML = TimerCounter_;
			else {
				var divSC = document.getElementsByTagName('div');
				for(var i = 0;i < divSC.length;i++){
					if(divSC[i].innerHTML.match('回到首頁')){
						divSC[i].innerHTML = divSC[i].innerHTML + "<a title='計時秒數(First)' id='sInterCountDown2' style='float:left'>" + TimerCounter_ + "</a>";
						break;
					}
				}
			}
			
			if(TimerCounter_ <= 0) TimerCounter_ = refresh;
			else TimerCounter_ = TimerCounter_ - 1;
		},1000);
		
		var TimerCounterDown_2;
		var valinter = setInterval ( function (){
			if(TimerCounter) clearInterval(TimerCounter);
			if(TimerCounterDown_2) clearInterval(TimerCounterDown_2);
			var fileObj3 = document.createElement("img");
			fileObj3.src = GM_getResourceURL('loading');
			fileObj3.title = "正在載入主題列表..";
			fileObj3.id = "lv1IDimgLoading";
			
			fileObj3.style.position = "absolute";
			fileObj3.style.cursor = "help";
			//fileObj3.style.bottom = "0px";
			fileObj3.style.left = '0px';
			
			document.getElementById('lv1Tast').insertBefore(fileObj3,document.getElementById('lv1Tast').lastChild);
			
			GM_xmlhttpRequest({method: "POST",url: URL_Compatibility(url),onload: function(res) {
				//if(sInter >= 3) clearInterval(valinter);
				
				if(res.responseText.match('LV1討論區')){
					document.body.innerHTML = res.responseText.replace(new RegExp('<br>',"gm"),'');
					
					Func_index();
					
					var TimerCounter_2 = refresh - 1;
					TimerCounterDown_2 = setInterval(function (){
						var sInterCountDown = document.getElementById('sInterCountDown');
						
						if(sInterCountDown) sInterCountDown.innerHTML = TimerCounter_2;
						else {
							var divSC = document.getElementsByTagName('div');
							for(var i = 0;i < divSC.length;i++){
								if(divSC[i].innerHTML.match('回到首頁')){
									divSC[i].innerHTML = divSC[i].innerHTML + "<a title='計時秒數' id='sInterCountDown' style='float:left'>" + TimerCounter_2 + "</a>";
									break;
								}
							}
						}
						
						if(TimerCounter_2 <= 0) TimerCounter_2 = refresh - 1;
						else TimerCounter_2 = TimerCounter_2 - 1;
					},1000);
					
					if(fileObj3) fileObj3.parentNode.removeChild(fileObj3);
				}
				
				sInter = sInter + 1;
				var sInterCounter = document.getElementById('sInter');
				if(sInterCounter){
					sInterCounter.innerHTML = sInter;
				}
				else {
					var divSC = document.getElementsByTagName('div');
					for(var i = 0;i < divSC.length;i++){
						if(divSC[i].innerHTML.match('回到首頁')){
							divSC[i].innerHTML = divSC[i].innerHTML + "<a title='載入次數' id='sInter' style='float:right'>" + sInter + "</a>";
							break;
						}
					}
				}
			}});
		}, refresh * 1000 );
	}
}

function Func_index(){
	//if(document.body.innerHTML.match('<b>Warning</b>:  mysql_connect()')){
	if(!document.getElementsByTagName("table")[0]){
		//alert();
		return;
	}
	
	document.cookie='is_adult=yes';
	
	if(getQueryString('mlog',url) == '1') is_logged = true;

	var brsC = document.getElementsByTagName('br');
	var ibrsC = brsC.length;
	//for(var i = ibrsC - 1; i > ibrsC - 20;i--){
	for(var i = ibrsC - 1; i > 0 ;i--){
		//alert(brsC[i] + "\n" + i + "\n" + brsC.length);
		brsC[i].parentNode.removeChild(brsC[i]);
	}
	/*
	jQuery(".thumbImage").hover(function(e){
	jQuery("body").append("<div id='preview'><img src='"+ this.src +"' alt='圖片預覽' /></div>");
	setTimeout(function(){jQuery("#preview").center(true).fadeIn("slow");}, 500);
},function(){
	jQuery("#preview").fadeOut();
	jQuery("#preview").remove();
});
	*/
	var SubChecking = 0;
		var IIMGs = '';
		var indexIMG = document.getElementsByTagName('img');
		for(var i = 0;i < indexIMG.length;i++){
			if(indexIMG[i].src.match('rss_bu.gif')){ // RSS
				indexIMG[i].src = GM_getResourceURL('rss_pill_blue');
				indexIMG[i].height = 25;
				indexIMG[i].width = 25;
			}
			else if(indexIMG[i].src.match('thread_3.gif')){ //已讀
				if(Vcbox_ListLable) indexIMG[i].src = GM_getResourceURL('speech_bubble_48');
				SubChecking = SubChecking + 1;
				
				AttrForHideImage(indexIMG[i],0);
			}
			else if(indexIMG[i].src.match('thread_2.gif')){ //未讀
				if(Vcbox_ListLable) indexIMG[i].src = GM_getResourceURL('questionmark_48');
				AttrForHideImage(indexIMG[i],2);
			}
			else if(indexIMG[i].src.match('thread_1.gif')){ //新回覆
				if(Vcbox_ListLable) indexIMG[i].src = GM_getResourceURL('technorati_48');
				SubChecking = SubChecking + 1;
				AttrForHideImage(indexIMG[i],1);
			}
			
			indexIMG[i].title = indexIMG[i].alt; //使說明正確顯示
			//IIMGs = IIMGs + "\n" + indexIMG[i].alt;
		}
		//if(IIMGs) alert(IIMGs);
	var TestC = 0;
	function AttrForHideImage(tar,type){
		var HideImageInn = $(tar.parentNode).find('a');
		//HideImageInn.attr( 'href' ,HideImageInn.attr( 'href') + '?hdi=1');
		
		if(!type) HideImageInn.css( 'color','blue');
		else if(type == 1) HideImageInn.html('<font color="green"><b>' + HideImageInn.html() + '</b></font>');
			//HideImageInn.css( 'color','green');
		
		$(tar).attr('onClick','javascript:window.open("' + HideImageInn.attr( 'href') + '?hdi=1' + '","_blank")');
		
		if(!TestC){
			//alert(HideImageInn.attr( 'href'));
			//alert(getQueryString('tid',HideImageInn.attr( 'href')));
			TestC = 1;
		}
		//http://lv1.in/lib/read.php?fid=2&tid=1341391751
	}
	
	if(!SubChecking && !is_logged && url.match('index.php')){
		//alert('check');
		parent.postMessage({
			'url': url,
			'action':'func_List_Get_New_log'
		}, '*');
						
		GM_setValue('Communication', 
			'\n' + 
			'url:' + url + '\n' + 
			'action:func_List_Get_New_log'
		);
	}
	else if(SubChecking) is_logged = true;
	
	//var now = new Date();
	//now = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();
	/*
	var LnksLog = document.getElementsByTagName('a');
	for(var i = 0;i < LnksLog.length;i++){
		if(LnksLog[i].href.match('page')) LnksLog[i].href = LnksLog[i].href + '&mlog=1';
	}
	*/
	//if(Vcbox_ruleDisplay == true) document.getElementById("list").style.display = "none";
	//CheckVersion(0);
	if(url.match('index3.php')){
		var PerSonTxt = document.getElementsByTagName("font")[0].innerHTML.split('<b>')[1].split('</b>')[0];
		var PerSonURL = "<a href='" + document.location.href + "'>" + PerSonTxt + "</a>";
		document.body.innerHTML = document.body.innerHTML.replace(new RegExp(PerSonTxt,"gm"),PerSonURL);
	}
	if(Vcbox_ruleDisplay == true) document.getElementsByTagName("table")[0].style.display = "none";
	var NewTheard = document.getElementsByTagName("table")[1].innerHTML;
	document.getElementsByTagName("table")[1].innerHTML = NewTheard.replace(new RegExp("<br>","gm"), '');
	
	var c = document.getElementsByTagName("body");
	var divVersion = document.createElement("div");
	divVersion.style.display = 'block';
	//divVersion.style.display = 'inline';
	//divVersion.style.position = 'absolute';
	divVersion.style.position = 'relative';
	divVersion.style.zIndex = '1002';
	divVersion.innerHTML = '<div style="text-align:center;background-color:#EFEFEF;z-index:1002;position:relative;display:block;"><a id="lv1Tast" style="cursor:crosshair;">Lv1小站腳本支援 by Tast V'  + version + '</div>';
	
	document.body.innerHTML = document.body.innerHTML.replace(new RegExp("目前在","gm"), divVersion.innerHTML + "目前在");
	
	//c[0].insertBefore(divVersion,c[0].childNodes[5]); //Nodes 10 / 5
	document.getElementById('lv1Tast').addEventListener("click", Lv1About, false);
	
	if(updateV && version > updateV) var CVSion = "Beta 測試開發版本";
	else if(TFversion()) var CVSion = "點我更新至 : " + updateV;
	else var CVSion = "";
	
	if(CVSion){
		var fileObj2 = document.createElement("a");
		fileObj2.textContent = CVSion;
		fileObj2.innerHTML = " - " + "<font color='red'>" +  "<u>" + "<a id='versionInstall' style='color:red;'>" + fileObj2.innerHTML + "</a>" + "</u>" + "</font>";
		fileObj2.style.cursor = "pointer"; 
		if(TFversion()){
			if(!is_chrome) fileObj2.href = updateURL;
		}
		insertAfter(fileObj2,document.getElementById('lv1Tast'));
		if(is_chrome) document.getElementById('versionInstall').addEventListener("click", function (){GM_openInTab(updateURL);}, false);
	}
	
	if(Vcbox_NewPageLoad){
		var itemsPost = document.getElementsByClassName('item');
		for(var i = 0;i < itemsPost.length;i++){
			item = itemsPost[i];
			if(item.href.match("read.php"))
				item.target = '_blank';
		}
	}
	
	DivSetting();
}

function Func_menu(type){
	document.head.innerHTML = 
	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+
	'<title>LV1討論區</title>'+
	'<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>'+
	'<base target="main">';
	
	niutuku();
	
	var menuStyleBody = 
    '<li class="menu"><ul>' + 
	'<li class="button"><a href="#" target="menu" class="green"><font color="white"><b>功能選單</b></font> <span></span></a></li>' + 
	'<li class="dropdown"><ul>' + 
		'<li><a href="main.php"> <!--style="float:right"--><b><font color="white">首頁</font></b></a>    ' + 
		'<a href="lib/faq.html"><b><font color="Lime">新手上路</font></b></a>    ' + 
		'<a target="_new" href="http://www.google.com/cse/home?cx=007788467501766930510:2gpq9pwlmae&hl=zh-TW"><b><font color="white">站內搜尋</font></b></a></li>' + 
		'<li><a id="SetMenuWidth" href="#" target="menu"><b><font color="Aqua">設定選單寬度</font></b></a></li>' + 
		'<li><embed class=" " src="http://bhunji.net46.net/musicbar.php" wmode="opaque" quality="high" bgcolor="black" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" height="24" width="88%"></li>'+
	'</ul></li></ul></li>' + 
      
	'<li class="menu"><ul>' + 
		'<li class="button" id="mainMenuButton"><a href="#" target="menu" id="mainMenuA" class="blue"><font color="white"><b>主要選單</b></font> <span></span></a></li>' + 
        '<li class="dropdown" id="mainMenuDropDown"><ul id="mainMenuDrop">' + 
			'<li><a href="lib/index.php?fid=7"><b><font color="white">軟件版</font></b></a></li>' + 
			'<li><a href="lib/index.php?fid=4"><b><font color="white">連署版</font></b></a></li>' + 
			'<li><a href="lib/index.php?fid=6"><b><font color="white">創作版</font></b></a></li>' + 
			'<li><a href="lib/index.php?fid=5"><b><font color="white">P2P版</font></b></a></li>' + 
			'<li><a href="lib/index.php?fid=3"><b><font color="white">站務版</font></b></a></li>' + 
			'<li><a href="lib/index.php?fid=1"><b><font color="white">聊天版</font></b></a></li>' + 
			'<li><a href="lib/index.php?fid=2"><b><font color="white">貼圖版</font></b></a></li>' + 
			'<li><a href="lib/index.php?fid=8"><b><font color="white">H GAME版</font></b></a></li>' + 
	'</ul></li></ul></li>';
	
	var WithLoginMethod = '';
	if(Pname && password){
		WithLoginMethod = '<li><a href="#" id="setLoginMenu" target="menu"><b><font color="orange">取消自動登入</font></b></a></li>';
	}
	else {
		WithLoginMethod = '<li><a href="#" id="setLoginMenu" target="menu"><b><font color="orange">設定自動登入</font></b></a></li>';
	}
	var CHeckingForLogin = false;
	if(document.body.innerHTML.match('logout.php')){
		//var PersonalName = document.body.innerHTML.split('新手上路</b></a>\n<hr>\n<b>')[1].split('</b> 歡迎回來')[0];
		var PersonalPM = '';
		var PersonalPost = '';
		var PersonalPostInner = '';
		
		var links = document.getElementsByTagName("a");
		for(var i = 0; i<links.length; i++) {
			if(links[i].href.match("pm_view.php")){
				//alert(links[i].innerHTML);
				var mes = parseInt(links[i].innerHTML.split('(')[1].split(')')[0]);
				if(mes > 0){
					//links[i].innerHTML = "<b><a id='newPM' style='color:red'>新</a>短訊</b>( <a style='color:red;'><b>" + mes + "</b></a> )";
					PersonalPM = "<font color='red'><b>新</b></font>短訊( <font color='red'><b>" + mes + "</font> )";
				}
				else PersonalPM = '短訊(0)';
			}
			else if(links[i].href.match("index3.php")){
				PersonalPost = links[i].href;
				PersonalPostInner = links[i].innerHTML.replace('<b>','').replace('</b>','');
				
				if(!Pname){
					Pname = PersonalPostInner;
					GM_setValue("name", PersonalPostInner);
				}
			}
		}
		
		document.body.innerHTML = menuStyleBody.replace('<ul id="mainMenuDrop">','<ul id="mainMenuDrop">' + 
			'<li><a href="lib/profile.php"><b><font color="white">個人狀態</font></b></a><a>  <a href="lib/pm_view.php"><b><font color="white">' + PersonalPM + '</font></b></a> </a><a href="lib/logout.php" target="menu" ><font color="red"><b> 登出 </b></font></li>' + 
			//'<li><a href="lib/pm_view.php"><b><font color="white">' + PersonalPM + '</font></b></a></li>' + 
			'<li><a href="' + PersonalPost + '"><b><font color="white">' + PersonalPostInner  + '</font></b></a></li>'
		).replace('站內搜尋</font></b></a></li>','站內搜尋</font></b></a></li>' + WithLoginMethod);
	}
	else {
		CHeckingForLogin = true;
		document.body.innerHTML = menuStyleBody.replace('<ul id="mainMenuDrop">','<ul id="mainMenuDrop">' + 
			'<li><a href="lib/regist.php"><b><font color="white">註冊</font></b></a><a>   </a><a href="lib/login.php" target="menu"><b><font color="red">登入</font></b></a></li>'
		).replace('站內搜尋</font></b></a></li>','站內搜尋</font></b></a></li>' + WithLoginMethod);
	}
	var setLoginMenu = document.getElementById('setLoginMenu');
	if(setLoginMenu){
		if(Pname && password)
				setLoginMenu.addEventListener("click", AutoLogout, false);
		else 	setLoginMenu.addEventListener("click", AutoLogin, false);
	}
	
	$('#SetMenuWidth').click(function(e){
		GM_setValue("cbox_MenuWidthSet",true);
		window.parent.location.href = URL_Compatibility('http://www.lv1.in');
	});
	
	$('li.button a').click(function(e){
		var dropDown = $(this).parent().next();
		$('.dropdown').not(dropDown).slideUp('normal');
		dropDown.slideToggle('normal');
		e.preventDefault();
	});
	
	setTimeout(function (){
		$('#mainMenuDropDown').show('fast');
	},1000);
	
	DivSetting();
	LOGO();
	Func_Personal();
	
	if(Pname && password && CHeckingForLogin){
		var links = document.getElementsByTagName("a");
		for(var i = 0; i<links.length; i++) {
			if(links[i].href.match("login.php")){
				var fileObj3 = document.createElement("img");
				//fileObj3.src = GM_getResourceURL('loading');
				fileObj3.src = GM_getResourceURL('loading');
				//fileObj3.src = GM_getResourceURL('preview');
				fileObj3.title = "正在自動登入...";
				fileObj3.id = "lv1IDimgLoading";
				
				fileObj3.style.position = "absolute";
				fileObj3.style.cursor = "help";
				fileObj3.style.bottom = "0px";
				fileObj3.style.right = '0px';
				
				document.body.insertBefore(fileObj3,document.body.lastChild);
				Login(0);
				break;
			}
		}
	}
	
	$("body").show(500);
}

function Func_Personal(){
	if(document.body.innerHTML.match('歡迎回來')){
		var MenuURLs = document.getElementsByTagName("a");
					
		for(var i = 0;i < MenuURLs.length;i++){
			if(MenuURLs[i].href.match('index3.php')){
				if(is_chrome){
					GM_setValue('Communication', 
					'\n' + 
					'url:' + url + '\n' + 
					'action:func_PerSonal_URL' + '\n' + 
					'data_name:' +  MenuURLs[i].textContent.split('(')[0]  + '\n' + 
					'data_url:' + MenuURLs[i].href )
					//alert(MenuURLs[i].textContent.split('(')[0]  + '\n' + MenuURLs[i].href);
				}
				else {
					parent.postMessage({
						'url': url,
						'action':'func_PerSonal_URL',
						'data_name': MenuURLs[i].textContent.split('(')[0],
						'data_url':MenuURLs[i].href
					}, '*');
				}
				break;
			}
		}
	}
}

function Func_Talking(teaming){
	setTimeout(function(){
			Func_Talking2(teaming);
	},300);
}

function Func_Talking2(teaming){
	if(!Vcbox_TalkingTheard) return;
	//alert('Func_Talking2')

	var TalkingMSD = document.createElement('div');
	TalkingMSD.id = 'TalkingMSD';
	//TalkingMSD.style.zIndex = '1003';
	TalkingMSD.style.display = 'none';
	TalkingMSD.style.border = "0px solid black";
	//TalkingMSD.style.border = "2px solid white";
	
	if(url.match('menu.php') && GM_getValue("cbox_TalkingMenu",false) && !document.getElementById('TalkingMSD')){
		TalkingMSD.style.zIndex = '1';
		TalkingMSD.style.width = '100%';
		TalkingMSD.style.left = '-1px';
		//TalkingMSD.style.bottom = '-30px';
		//TalkingMSD.style.position = 'fixed';
		//TalkingMSD.style.position = 'absolute';
		TalkingMSD.style.position = 'relative';
		
		TalkingMSD.innerHTML = 
		'<iframe frameborder="0" width="95%" src="http://www7.cbox.ws/box/?boxid=432020&amp;boxtag=vzzstq&amp;sec=form" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="yes" name="cboxform" style="border:#cdcdcd 0px solid;border-top:0px" id="cboxform"></iframe>'+
		'<iframe frameborder="0" width="95%" height="360px" src="http://www7.cbox.ws/box/?boxid=432020&amp;boxtag=vzzstq&amp;sec=main" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="yes" name="cboxmain" style="border:#cdcdcd 0px solid;border-bottom:0px;" id="cboxmain"></iframe>';
		
		
		//document.body.insertBefore(TalkingMSD,document.body.lastChild);
		insertAfter(TalkingMSD, document.body.lastChild);
		
		document.getElementById('cboxmain').style.marginTop = '-45px';
		/*
		$("#cboxmain").mousewheel(function(event, delta) {
		 this.scrollTop -= (delta * 1);
		alert('ccc');
		
		 event.preventDefault();
	   });
	   */
		//alert($("#cboxmain").width());
		$("#cboxmain").mouseover(function() {
			MenuSetIN();
		});
		$("#cboxform").mouseover(function() {
			MenuSetIN();
		});
		$("#cboxmain").mouseout(function() 	{
			MenuDefault();
		});
		$("#cboxform").mouseout(function() 	{
			MenuDefault();
		});
		
		function MenuDefault(){
			//setTimeout(function (){
				$("#cboxmain").height('360px');
				$("#cboxmain").scrolling = 'no';
				$("#cboxmain").width('95%');
				$("#cboxform").width('95%');
			//},500);
		}
		function MenuSetIN(){
			$("li.button").width($("li.button").width() + 'px');
			$("#cboxmain").width($("#cboxmain").width() + 'px');
			$("#cboxform").width($("#cboxform").width() + 'px');
			$("#cboxmain").height('105%');
			$("#cboxmain").scrolling = 'auto';
		}
	}
	else if(!url.match('menu.php') && GM_getValue("cbox_TalkingIndex",true)  && !document.getElementById('TalkingMSD')){
		TalkingMSD.style.zIndex = '1003';
		
		if(document.getElementById('TalkingWidthSet'))
				document.getElementById('TalkingWidthSet').parentNode.removeChild(document.getElementById('TalkingWidthSet'));
		else 	//InsertCSS('http://bhunji.myweb.hinet.net/Javascript/SmartSlider/smartslider.css');
				smartslider();
				
		var TalkingWidthSet2 = document.createElement('div');
		TalkingWidthSet2.style.position = 'fixed';
		TalkingWidthSet2.style.zIndex = '1005';	
		TalkingWidthSet2.id = 'TalkingWidthSet';
		TalkingWidthSet2.innerHTML = 
			//'<div>' + 
				'<a href="#" id="TalkingWidthSave" style="float:left"><font color="orange" size="5">儲存</font></a>' + 
				'<a href="#" id="TalkingWidthClose" style="float:right"><font color="orange" size="5">關閉</a></font>' + 
			//'</div>' + 
			'<div id="trackbar3" style="clear: both; width: 600px; text-align: center;margin-top:4px;"></div>'+
			'<div id="text3" style="clear: both; width: 600px; text-align: center;margin-top:4px;"></div>';
		
		document.body.insertBefore(TalkingWidthSet2,document.body.lastChild);
		
		$("#TalkingWidthSet").center({ horizontal: true, vertical: true });
		
		//alert(parseInt(GM_getValue("cbox_TalkingWidth",'335').replace('px','')));
		var cbox_TalkingWidth = parseInt(GM_getValue("cbox_TalkingWidth",'335').replace('px',''));
		if(cbox_TalkingWidth >= 700) cbox_TalkingWidth = 699;
		
		$('#trackbar3').strackbar({ callback: onTick3, defaultValue: cbox_TalkingWidth, sliderHeight: 19, sliderWidth: 500, style: 'style3', animate: false, ticks: false, labels: true, trackerHeight: 23, trackerWidth: 23 ,minValue:335,maxValue:700});
		
		$('#TalkingWidthSet').hide();
		
		$("#TalkingWidthSave").click(function() {
			if(TalkingMSD.style.width >= 700) TalkingMSD.style.width = 699;
			GM_setValue("cbox_TalkingWidth",TalkingMSD.style.width);
			$('#TalkingWidthSet').hide();
		});
		
		$("#TalkingWidthClose").click(function() {
			$('#TalkingWidthSet').hide();
		});
		
		var DSmarginBottom = '-460px';
		TalkingMSD.style.width = GM_getValue("cbox_TalkingWidth",'335px');
		TalkingMSD.style.position = 'fixed'; //跟隨視窗
		
		var MethodBottom = '';
		var MethodTop = '';
		
		var TalkingPositionSet = GM_getValue("TalkingPosition",'1');
		if(TalkingPositionSet == '1'){
			TalkingMSD.style.bottom = '0px';
			TalkingMSD.style.left = '-1px';
			TalkingMSD.style.marginBottom = DSmarginBottom;
			
			MethodBottom = 
			'<img id="TalkingQuote" title="開啟關閉" 	align="left" src="' + GM_getResourceURL('quotetion') + '">' + 
			'<a id="TalkingQuoteA" title="新訊息" bgcolor="black" 		style="float:left;background-color:black;color:white;display:none"><b>新訊息</b></a>' + 
			'<img id="TalkingSpan" title="設定視窗" 	align="center" style="display:none;"  src="' + GM_getResourceURL('spanner_48') + '">' + 
			'<img id="TalkingTool"  title="聊天室位置"  align="right" style="display:none;"  src="' + GM_getResourceURL('TalkingTool') + '">';
		}
		else if(TalkingPositionSet == '2'){
			TalkingMSD.style.bottom = '0px';
			TalkingMSD.style.right = '-1px';
			TalkingMSD.style.marginBottom = DSmarginBottom;
			
			MethodBottom = 
			'<img id="TalkingQuote" title="開啟關閉" 	align="right" src="' + GM_getResourceURL('quotetion') + '">' + 
			'<a id="TalkingQuoteA" title="新訊息" bgcolor="black" 		style="float:right;background-color:black;color:white;display:none"><b>新訊息</b></a>' + 
			'<img id="TalkingSpan" title="設定視窗" 	align="center" style="display:none;"  src="' + GM_getResourceURL('spanner_48') + '">' + 
			'<img id="TalkingTool"  title="聊天室位置"  align="left" style="display:none;"  src="' + GM_getResourceURL('TalkingTool') + '">';
		}
		else if(TalkingPositionSet == '3'){
			TalkingMSD.style.top = '0px';
			TalkingMSD.style.left = '-1px';
			TalkingMSD.style.marginTop = DSmarginBottom;
			
			MethodTop = 
			'<img id="TalkingQuote" title="開啟關閉" 	align="left" src="' + GM_getResourceURL('quotetion') + '"/>' + 
			'<a id="TalkingQuoteA" title="新訊息" bgcolor="black" 		style="float:left;background-color:black;color:white;display:none"><b>新訊息</b></a>' + 
			'<img id="TalkingSpan" title="設定視窗" 	align="center" style="display:none;"  src="' + GM_getResourceURL('spanner_48') + '">' + 
			'<img id="TalkingTool"  title="聊天室位置"  align="right" style="display:none;"  src="' + GM_getResourceURL('TalkingTool') + '">';
		}
		else if(TalkingPositionSet == '4'){
			TalkingMSD.style.top = '0px';
			TalkingMSD.style.right = '-1px';
			TalkingMSD.style.marginTop = DSmarginBottom;
			
			MethodTop = 
			'<img id="TalkingQuote" title="開啟關閉" 	align="right" src="' + GM_getResourceURL('quotetion') + '">' + 
			'<a id="TalkingQuoteA" title="新訊息" bgcolor="black" 		style="float:right;background-color:black;color:white;display:none"><b>新訊息</b></a>' + 
			'<img id="TalkingSpan" title="設定視窗" 	align="center" style="display:none;"  src="' + GM_getResourceURL('spanner_48') + '">' + 
			'<img id="TalkingTool"  title="聊天室位置"  align="left" style="display:none;"  src="' + GM_getResourceURL('TalkingTool') + '">';
		}
		
		TalkingMSD.innerHTML = MethodBottom + 
		'<iframe frameborder="0" width="100%" height="305" src="http://www7.cbox.ws/box/?boxid=432020&boxtag=vzzstq&sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" name="cboxmain" style="border:#cdcdcd 1px solid;border-bottom:0px;" id="cboxmain"></iframe>' + 
		'<iframe frameborder="0" width="100%" src="http://www7.cbox.ws/box/?boxid=432020&boxtag=vzzstq&sec=form" marginheight="2" marginwidth="2" scrolling="no" allowtransparency="yes" name="cboxform" style="border:#cdcdcd 1px solid;border-top:0px;" id="cboxform"></iframe>' + 
		MethodTop;
		
		/*
		var CBoxResponse = '';
		GM_xmlhttpRequest({method: "GET",url: "http://www7.cbox.ws/box/?boxid=432020&boxtag=vzzstq&sec=main",
		onload: function(res) {
				CBoxResponse = res.responseText;
			}
		});
		//alert(CBoxResponse);
		
		TalkingMSD.innerHTML = MethodBottom + 
		'<div id="cboxmain" style="border:#cdcdcd 1px solid;border-bottom:0px;" width="100%" height="305">' + CBoxResponse + '</div>' + 
		//'<iframe frameborder="0" width="100%" src="http://www7.cbox.ws/box/?boxid=432020&boxtag=vzzstq&sec=form" marginheight="2" marginwidth="2" scrolling="no" allowtransparency="yes" name="cboxform" style="border:#cdcdcd 1px solid;border-top:0px;" id="cboxform"></iframe>' + 
		MethodTop;
		*/
		
		document.body.insertBefore(TalkingMSD,document.body.firstChild);
		//insertAfter(TalkingMSD,document.body.lastChild);
		
		//$.support.cors = true;
		/*
		$('#cboxform').bind('load', function(event, ui) {
			$(this).css('display','none');
			//document.getElementById('cboxform').style.display = 'none';
		});
		*/
		$('#TalkingTool').draggable({revert: true});
		
		$('#TalkingTool').bind('dragstart', function(event, ui) {
			TalkingPosition(0);
		});
		
		$('#TalkingTool').bind('dragstop', function(event, ui) {
			TalkingPosition(1);
		});
		
		var TalkingQuote = document.getElementById('TalkingQuote');
		TalkingQuote.addEventListener("click", function (){
			if(TalkingPositionSet == '1' || TalkingPositionSet == '2'){
				if(TalkingMSD.style.marginBottom == DSmarginBottom){
					TalkingQuote.style.backgroundColor = '';
					$('#TalkingQuoteA').hide();
					$('#TalkingTool').fadeTo(2000,1.0);
					$('#TalkingSpan').fadeTo(2000,1.0);
					$(TalkingMSD).animate({ marginBottom: "0px" }, 250);
				}
				else {
					$('#TalkingTool').fadeTo(1000,0.0);
					$('#TalkingSpan').fadeTo(1000,0.0);
					$(TalkingMSD).animate({ marginBottom: DSmarginBottom }, 250);
					$('#TalkingWidthSet').hide('slow');
				}
			}
			else if(TalkingPositionSet == '3' || TalkingPositionSet == '4'){
				if(TalkingMSD.style.marginTop == DSmarginBottom){
					TalkingQuote.style.backgroundColor = '';
					$('#TalkingQuoteA').hide();
					$('#TalkingTool').fadeTo(2000,1.0);
					$('#TalkingSpan').fadeTo(2000,1.0);
					$(TalkingMSD).animate({ marginTop: "0px" }, 250);
				}
				else {
					$('#TalkingTool').fadeTo(1000,0.0);
					$('#TalkingSpan').fadeTo(1000,0.0);
					$(TalkingMSD).animate({ marginTop: DSmarginBottom }, 250);
					$('#TalkingWidthSet').hide('slow');
				}
			}
		}, false);
		
		$("#TalkingSpan").click(function() {
			$("#TalkingWidthSet").toggle('normal');
		});
	}
	$(TalkingMSD).hide();
	
	if(!url.match('menu.php') && GM_getValue("cbox_TalkingIndex",true)){
		var TalkingQuoteEffect = '';
		var num_quotes = 9;
		var rand_no = Math.floor(num_quotes * Math.random());
		switch(rand_no) {
			case 8: TalkingQuoteEffect = "size"; 	break;
			case 1: TalkingQuoteEffect = "clip"; 	break;
			case 2: TalkingQuoteEffect = "drop"; 	break;
			case 4: TalkingQuoteEffect = "fold"; 	break;
			case 5: TalkingQuoteEffect = "puff"; 	break;
			case 6: TalkingQuoteEffect = "slide"; 	break;
			case 7: TalkingQuoteEffect = "scale"; 	break;
			case 0: TalkingQuoteEffect = "blind"; 	break;
			case 3: TalkingQuoteEffect = "explode"; break;
			//case 9: TalkingQuoteEffect = "pulsate"; break;
			default: TalkingQuoteEffect = "drop";
		}
		
		setTimeout(function(){
			$(TalkingMSD).show(TalkingQuoteEffect,{},1500);
		},teaming);
	}
	else {
		setTimeout(function(){
			$(TalkingMSD).show(500);
		},teaming);
	}
	
	setTimeout(function(){//首次10秒刷新
		var TalkingTheardCheckingInter = setInterval(function (){
			TalkingTheardChecking();
		},5 * 1000);
	},5 * 1000);
}

var retTalking;
var retTalkingInn = '';
function TalkingTheardChecking(){
	if(typeof retTalking == 'object') retTalking.abort();
	retTalking = GM_xmlhttpRequest({method: "GET",url: "http://www7.cbox.ws/box/?boxid=432020&boxtag=vzzstq&sec=main",
		onload: function(res) {
			//alert($(res.responseText).find('tr')[0].id);
			
			var trFirst = $(res.responseText).find('tr')[0].id;
			if(retTalkingInn !== trFirst){
				if(retTalkingInn){
					TalkingQuoteToggle();
					document.getElementById('cboxmain').src = "http://www7.cbox.ws/box/?boxid=432020&boxtag=vzzstq&sec=main";
				}
				retTalkingInn = trFirst;
			}
			
			/*
			var ResT = res.responseText
				.split('<table id="mt" border="0" cellpadding="2" cellspacing="0" width="100%" class="hbtbl">')[1]
				.split('</table>')[0];
			
			if(ResT.match('<td class="stxt2">') || ResT.match('<td class="stxt">')){
				var ResTmd5 = hex_md5(ResT);
				if(retTalkingInn !== ResTmd5){
					if(retTalkingInn){
						TalkingQuoteToggle();
						//alert(retTalkingInn + "\n" + ResTmd5);
						document.getElementById('cboxmain').src = "http://www7.cbox.ws/box/?boxid=432020&boxtag=vzzstq&sec=main";
					}
					retTalkingInn = ResTmd5;
				}
			}
			*/
		}
	});
}

function TalkingQuoteToggle(){
if($('#TalkingQuote')){
							var TalkingMSD = document.getElementById('TalkingMSD');
							if(parseInt(TalkingMSD.style.marginTop.replace('px','')) < 0 || parseInt(TalkingMSD.style.marginBottom.replace('px','')) < 0){
								//$('#TalkingQuote').effect('shake', { times: 15,direction:'down',distance: 1 }, 10);
								$("#TalkingQuote").effect("pulsate", { times:3 }, 1000);
								document.getElementById('TalkingQuote').style.backgroundColor = 'black';
								$('#TalkingQuoteA').show();
							}
						}

}

function onTick3(value){
	if(value < 335){
		$('#TalkingMSD').width('335px');
		//$('#text3').html("Current Value: " + "<font color='red'>" + value + "</font>");
		$('#text3').html("設定寬度: <font color='red'>335</font> (預設)");
	}
	else {
		$('#TalkingMSD').width(value + 'px');
		$('#text3').html("設定寬度: " + value);
	}
}

function TalkingPosition(type){
	if(!type){
			var TalkingTarget1 = document.createElement('div'); //左下
			var TalkingTarget2 = document.createElement('div'); //右下
			var TalkingTarget3 = document.createElement('div'); //左上
			var TalkingTarget4 = document.createElement('div'); //右上

			TalkingTarget1.id = 'TalkingTarget1';
			TalkingTarget1.style.width = '335px';
			TalkingTarget1.style.height = '400px';
			TalkingTarget1.style.bottom = '0px';
			TalkingTarget1.style.left = '-1px';
			TalkingTarget1.style.border="3px dashed black";
			TalkingTarget1.style.position = 'fixed'; //跟隨視窗
			
			TalkingTarget2.id = 'TalkingTarget2';
			TalkingTarget2.style.width = '335px';
			TalkingTarget2.style.height = '400px';
			TalkingTarget2.style.bottom = '0px';
			TalkingTarget2.style.right = '-1px';
			TalkingTarget2.style.border="3px dashed black";
			TalkingTarget2.style.position = 'fixed'; //跟隨視窗
			
			TalkingTarget3.id = 'TalkingTarget3';
			TalkingTarget3.style.width = '335px';
			TalkingTarget3.style.height = '400px';
			TalkingTarget3.style.top = '0px';
			TalkingTarget3.style.left = '-1px';
			TalkingTarget3.style.border="3px dashed black";
			TalkingTarget3.style.position = 'fixed'; //跟隨視窗
			
			TalkingTarget4.id = 'TalkingTarget4';
			TalkingTarget4.style.width = '335px';
			TalkingTarget4.style.height = '400px';
			TalkingTarget4.style.top = '0px';
			TalkingTarget4.style.right = '-1px';
			TalkingTarget4.style.border="3px dashed black";
			TalkingTarget4.style.position = 'fixed'; //跟隨視窗
			
			document.body.insertBefore(TalkingTarget1,document.body.firstChild);
			document.body.insertBefore(TalkingTarget2,document.body.firstChild);
			document.body.insertBefore(TalkingTarget3,document.body.firstChild);
			document.body.insertBefore(TalkingTarget4,document.body.firstChild);
			
			var TalkingMSD = document.getElementById('TalkingMSD');
			
			$(TalkingTarget1).droppable({
				drop: function() {
					TalkingPosition(1);
					$('#TalkingTool').draggable("destroy" );
					GM_setValue("TalkingPosition",'1');
					TalkingMSD.parentNode.removeChild(TalkingMSD);
					Func_Talking(1);
				}
			});
			
			$(TalkingTarget2).droppable({
				drop: function() {
					TalkingPosition(1);
					$('#TalkingTool').draggable("destroy" );
					GM_setValue("TalkingPosition",'2');
					TalkingMSD.parentNode.removeChild(TalkingMSD);
					Func_Talking(1);
					
				}
			});
			
			$(TalkingTarget3).droppable({
				drop: function() {
					TalkingPosition(1);
					$('#TalkingTool').draggable("destroy" );
					GM_setValue("TalkingPosition",'3');
					TalkingMSD.parentNode.removeChild(TalkingMSD);
					Func_Talking(1);
				}
			});
			
			$(TalkingTarget4).droppable({
				drop: function() {
					TalkingPosition(1);
					$('#TalkingTool').draggable("destroy");
					GM_setValue("TalkingPosition",'4');
					TalkingMSD.parentNode.removeChild(TalkingMSD);
					Func_Talking(1);
				}
			});
	}
	else {
		var TalkingTarget1 = document.getElementById('TalkingTarget1');
		var TalkingTarget2 = document.getElementById('TalkingTarget2');
		var TalkingTarget3 = document.getElementById('TalkingTarget3');
		var TalkingTarget4 = document.getElementById('TalkingTarget4');
		
		TalkingTarget1.parentNode.removeChild(TalkingTarget1);
		TalkingTarget2.parentNode.removeChild(TalkingTarget2);
		TalkingTarget3.parentNode.removeChild(TalkingTarget3);
		TalkingTarget4.parentNode.removeChild(TalkingTarget4);
	}
}

//======================================================================================
//PostMessage
if(ex_topURL()){
	if(!is_chrome)
		parent.addEventListener("message", receiveMessage, false);
}
	
function receiveMessage(event){
	var eventTesting = 0;
	if(event.data.url == 'test' || eventTesting){
		//alert(event.data.url);
		alert(event.data.url + "\n" + document.location.href);
		return;
	}
	else if(event.data.url == url) return ;
	else if(event.data.chrome){
		//alert(data.url + '\n' + data.action + '\n' + data.data_name + '\n' + data.data_url + '\n' + 'Chrome is Using');
	}
	
	//alert(event.data.url + "\n" + document.location.href);
	//alert("ccc" + event.data + "\n" + event.source + "\n" + document.location.href + "\n" + event.origin);
	
	var funcEXEC = event.data.action;
	
	if(funcEXEC == 'func_BackSeting_none'){
		//document.getElementById("BackSeting").style.display = 'none';
		$('#BackSeting').fadeOut(300);
		//document.getElementById("BackSeting").fadeOut(300);
		
		if(document.getElementById("tsetting"))
			$('#tsetting').fadeOut(300);
			//document.getElementById("tsetting").style.display = 'none';	
			
		//alert(url);
	}
	else if(funcEXEC == 'func_BackSeting_block'){
		$('#BackSeting').fadeIn(300);
		$('#tsetting').fadeIn(300);
	}
	else if(funcEXEC == 'func_PerSonal_URL'){
		//alert(document.getElementById("sel_MainPageURL"));
		
		if(!document.getElementById("sel_MainPageURL").innerHTML.match('index3.php')){
			//alert(document.getElementById("sel_MainPageURL").innerHTML);
			var elSel = document.getElementById("sel_MainPageURL");
			var elOptNew = document.createElement('option');
			elOptNew.text = event.data.data_name;
			elOptNew.value = event.data.data_url;
			document.getElementById("sel_MainPageURL").add(elOptNew,elSel.options[0]);
		}
	}
	else if(funcEXEC == 'func_PerSonal_URL_Get'){
		Func_Personal();
	}
	else if(funcEXEC == 'func_save'){
		DivSettingSave();
		
		if(MainPageURL){
			var sel_MainPageURL = document.getElementById("sel_MainPageURL");
			for(var i = 0;i < sel_MainPageURL.options.length;i++){
				sel_MainPageURL.options[i].style.color = 'black';
			}
			sel_MainPageURL.options[sel_MainPageURL.selectedIndex].style.color = 'red';
		}
		
		//document.getElementById("BackSeting").style.display = 'none';
		$('#BackSeting').fadeOut(300);
		//document.getElementById("BackSeting").fadeOut(300);
		
		if(document.getElementById("tsetting"))
			$('#tsetting').fadeOut(300);
			//document.getElementById("tsetting").style.display = 'none';	
	}
	else if(funcEXEC == 'func_List_Get_New'){
		if(url.match('index.php')/* && !is_logged*/){
			var fileObj3 = document.createElement("img");
			fileObj3.src = GM_getResourceURL('loading');
			fileObj3.title = "正在載入主題列表..";
			fileObj3.id = "lv1IDimgLoading";
			
			fileObj3.style.position = "absolute";
			fileObj3.style.cursor = "help";
			//fileObj3.style.bottom = "0px";
			fileObj3.style.left = '0px';
				
			document.getElementById('lv1Tast').insertBefore(fileObj3,document.getElementById('lv1Tast').lastChild);
				
			GM_xmlhttpRequest({method: "POST",url: URL_Compatibility(url),onload: function(res) {
				if(res.responseText.match('LV1討論區')){
					document.body.innerHTML = res.responseText;
					Func_index();
					//setTimeout(Func_Talking,500);
					Func_Talking(500);
				}
			}});
			
			is_logged = true;
			//Func_index_Refresh();
		}
	}
	else if(funcEXEC == 'func_List_Get_New_log'){
		if(is_logged){
			parent.postMessage({
				'url': url,
				'action':'func_List_Get_New'
			}, '*');
						
			GM_setValue('Communication', 
				'\n' + 
				'url:' + url + '\n' + 
				'action:func_List_Get_New'
			);
		}
	}
}
//======================================================================================
//Chrome Communication with other document
function Communication(dataS){
	if(dataS == 'bfase' && !dataS.match('action')) return;
	
	var dataO = dataS.split('\n');

	data = new Object();
	data.chrome = true;
	data.url = "test";
	data.action = "";
	data.data_name = '';
	data.data_url = "";
	data.outside = false;
	
	for(var i = 1;i < dataO.length;i++){
		if(i == 1) data.url = dataO[1].split('url:')[1];
		else if(i == 2) data.action = dataO[2].split('action:')[1];
		else if(i == 3) data.data_name = dataO[3].split('data_name:')[1];
		else if(i == 4) data.data_url = dataO[4].split('data_url:')[1];
		else if(i >= 5) data.outside = true;
	}
	//alert(data.action);
	
	if(data.action){
		//alert(dataS);
		//alert(data.url + '\n' + data.action + '\n' + data.data_name + '\n' + data.data_url);
		
		event = new Object();
		event.data = data;
		receiveMessage(event);
	}
}
//======================================================================================
function DivSettingSave(){
	for(var i = 0; i < CBOXsetArray.length;i++){
		GM_setValue(CBOXsetArray[i],		document.getElementById(CBOXsetArray[i]).checked);
	}
	GM_setValue("cbox_RefreshURLOpt",	document.getElementById("cbox_RefreshURLOpt").selectedIndex);
}

function DivSettingRead(){
	for(var i = 0; i < CBOXsetArray.length;i++){
		document.getElementById(CBOXsetArray[i]).checked 		= GM_getValue(CBOXsetArray[i],true);
	}
	document.getElementById("cbox_RefreshURLOpt").selectedIndex = GM_getValue("cbox_RefreshURLOpt", 0);
}

function DivSetting(){
	if(!url.match('menu.php')){
		var divBackGround = document.createElement("div");
		divBackGround.id = 'BackSeting';
		divBackGround.style.display = 'none';
		divBackGround.style.position = 'fixed';
		divBackGround.style.top = '0%';
		divBackGround.style.left = '0%';
		divBackGround.style.width = '200%'
		divBackGround.style.height = '200%'
		divBackGround.style.backgroundColor = 'black';
		divBackGround.style.zIndex = '1001';
		divBackGround.style.MozOpacity = '.50';
		divBackGround.style.opacity = '.50';
		divBackGround.style.filter = 'alpha(opacity=50)';
		
		var div = document.createElement("div");
		div.style.display = 'none';
		div.id = 'tsetting';
		div.style.position = 'fixed';
		div.style.margin = '-250px 0px 0px -200px';
		div.style.top = '50%';
		div.style.left = '50%';
		div.style.zIndex = '1002';
		div.style.backgroundColor = 'e5f8ff';
		div.style.overflow = 'visible';
		div.style.textAlign = 'left';
		div.style.border="3px dashed red";
		
		div.innerHTML = 
		"<center><b><font size='4px'>Lv1腳本設定</font> ( <a id='SetHelp' color='red' style='cursor:progress'><font color='red'>檢查更新</font></a> ) </b></center>" + 
		
		"&nbsp<font size='5px'>確認更新</font><input type='checkbox' safari='1' id='cbox_autoupdate'  style='vertical-align:middle; text-align:center; '  name='autoUpdate' value='autoUpdate'>" + 
		"<font color='green'> : 自動確認版本顯示更新訊息</font>&nbsp&nbsp" + '<br>' +
		
		"&nbsp<font size='5px'>隱藏規則</font><input type='checkbox' safari='1' id='cbox_ruleDisplay' style='vertical-align:middle; text-align:center; ' name='ruleDisplay' value='ruleDisplay'>" + 
		"<font color='green'> : 在主題列表中隱藏規則框</font>&nbsp&nbsp" + '<br>' + 
		
		"&nbsp<font size='5px'>閱讀標籤</font><input type='checkbox' safari='1' id='cbox_ListLable'  style='vertical-align:middle; text-align:center; ' name='ListLable' value='ListLable'>" + 
		"<font color='green'> : 主題列表圖示更換 ( 大 ) </font>&nbsp&nbsp" + '<br>' + 
		
		"&nbsp<font size='5px'>自動登入</font><input type='checkbox' safari='1' id='cbox_LoginAutomation'style='vertical-align:middle; text-align:center; ' name='LoginAutomation' value='LoginAutomation'>" + 
		"<font color='green'> : 自動登入開關(不影響帳密資料)</font>&nbsp&nbsp" + '<br>' + 
		
		"&nbsp<font size='5px'>使用簽名</font><input type='checkbox' safari='1' id='cbox_Signature' style='vertical-align:middle; text-align:center; ' name='Signature' value='Signature'>" + 
		"<font color='green'> : 是否使用簽名檔功能</font>&nbsp&nbsp" + '<br>' + 
		
		"&nbsp<font size='5px'>開新頁面</font><input type='checkbox' safari='1' id='cbox_NewPageLoad'   style='vertical-align:middle; text-align:center; ' name='NewPageLoad' value='NewPageLoad'>" + 
		"<font color='green'> : 點閱主題開新頁面,不覆蓋頁面</font>&nbsp&nbsp" + '<br>' + 
		
		"&nbsp<font size='5px'>隱藏媒體</font><input type='checkbox' safari='1' id='cbox_MediaUnLoad'   style='vertical-align:middle; text-align:center; ' name='cbox_MediaUnLoad' value='cbox_MediaUnLoad'>" + 
		"<font color='green'> : 隱藏多媒體,可選擇顯示</font>&nbsp&nbsp" + "By <a id='byWuKC'>WuKC</a>" + '<br>' + 
		
		"&nbsp<font size='5px'>轉換首頁</font><input type='checkbox' safari='1' id='cbox_MainPageURL'   style='vertical-align:middle; text-align:center; ' name='cbox_MainPageURL' value='cbox_MainPageURL'>" + 
		"<font color='green'> : 轉至</font>&nbsp&nbsp" + 
		
		"<select id='sel_MainPageURL'>" + 
		//PerSonalTarget + 
		URL_Compatibility("<option value='http://www.lv1.in/lib/index.php?fid=7'>軟件版</option>") + 
		URL_Compatibility("<option value='http://www.lv1.in/lib/index.php?fid=4'>連署版</option>") + 
		URL_Compatibility("<option value='http://www.lv1.in/lib/index.php?fid=6'>創作版</option>") + 
		URL_Compatibility("<option value='http://www.lv1.in/lib/index.php?fid=5'>P2P版</option>")  +
		URL_Compatibility("<option value='http://www.lv1.in/lib/index.php?fid=3'>站務版</option>") + 
		URL_Compatibility("<option value='http://www.lv1.in/lib/index.php?fid=1'>聊天版</option>") + 
		URL_Compatibility("<option value='http://www.lv1.in/lib/index.php?fid=2'>貼圖版</option>") + 
		URL_Compatibility("<option value='http://www.lv1.in/lib/index.php?fid=8'>H GAME版</option>") + 
		"<option value='" + Vcbox_MainPageURL + "'>自訂</option>" + 
		"</select>" + '<br>' + 
		
		"&nbsp<font size='5px'>自動載入</font><input type='checkbox' safari='1' id='cbox_RefreshURL' disabled style='vertical-align:middle; text-align:center; ' name='cbox_RefreshURL' value='cbox_RefreshURL'>" + 
		"<font color='green'> : 頁面</font>&nbsp&nbsp" + 
		"<select id='cbox_RefreshURLOpt'>" + 
		"<option value='m'>左側選單</option>" + 
		"<option value='7'>軟件版</option>" + 
		"<option value='4'>連署版</option>" + 
		"<option value='6'>創作版</option>" + 
		"<option value='5'>P2P版</option>" +
		"<option value='3'>站務版</option>" + 
		"<option value='1'>聊天版</option>" + 
		"<option value='2'>貼圖版</option>" + 
		"<option value='8'>H GAME版</option>" + 
		"</select>"  + "&nbsp By <a id='byWuKC2'>WuKC</a>" + '<br>' +
		
		"&nbsp<font size='5px'>按鍵提示</font><input type='checkbox' safari='1' id='cbox_ShortcutAlert' style='vertical-align:middle; text-align:center; ' name='cbox_ShortcutAlert' value='cbox_ShortcutAlert'>" + 
		"<font color='green'> : 快速鍵使用時詢問提示</font>&nbsp&nbsp" + '<br>' + 
		
		"&nbsp<font size='5px'>聊天版面</font><input type='checkbox' safari='1' id='cbox_TalkingTheard' style='vertical-align:middle; text-align:center; ' name='cbox_TalkingTheard' value='cbox_TalkingTheard'>" + 
		"<font color='green'> :&nbsp"  + "選單&nbsp" + 
		"<input type='checkbox' safari='1' id='cbox_TalkingMenu' style='vertical-align:middle; text-align:center;'>" + "&nbsp其他&nbsp" + 
		"<input type='checkbox' safari='1' id='cbox_TalkingIndex' style='vertical-align:middle; text-align:center;'>" +
		"</font>&nbsp&nbsp" + '<br>' + 
		
		"&nbsp<font size='5px'>圖片進度</font><input type='checkbox' safari='1' id='cbox_ImageLoading'   style='vertical-align:middle; text-align:center; ' name='ImageLoading' value='ImageLoading'>" + 
		"<font color='green'> : 進度條<input type='checkbox' jScroll='1' id='cbox_ImageLoadingMode'   style='vertical-align:middle; text-align:center; ' name='ImageLoadingMode' value='ImageLoadingMode'>純文字</font>&nbsp&nbsp" + '<br>' + 
		//"<font color='green'> : 開啟/關閉圖片進度條</font>&nbsp&nbsp" + '<br>' + 
		
		"<div><center><button id='cbox_Save'>儲存設定</button> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<font color='blue'>重整頁面設定生效</font>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + 
		"<button id='cbox_Cancel'>取消儲存</button></center></div>";
		
		var c3 = document.body;
		c3.insertBefore(divBackGround,c3.lastChild);
		c3.insertBefore(div,c3.lastChild);
		
		$(div).draggable();
		
		InsertCSS('http://bhunji.myweb.hinet.net/Javascript/checkbox/jquery.checkbox.css');
		InsertCSS("http://bhunji.myweb.hinet.net/Javascript/checkbox/jquery.safari-checkbox.css");
		
		//$('input:checkbox').checkbox({
		$('input[safari]:checkbox').checkbox({
			cls: 'jquery-safari-checkbox',
			empty: 'http://i.minus.com/dL41AKCrKf57t/empty.png'
		});
		
		$('input[jScroll]:checkbox').checkbox({
			empty: 'http://i.minus.com/dL41AKCrKf57t/empty.png'
		});
		
		document.getElementById("byWuKC").style.cursor= "url('" + GM_getResourceURL('bunch_flowers') + "'), pointer";
		document.getElementById("byWuKC2").style.cursor= "url('" + GM_getResourceURL('bunch_flowers') + "'), pointer";
		
		DivSettingRead();
		
		if(MainPageURL){
			var sel_MainPageURL = document.getElementById("sel_MainPageURL");
			for(var i = 0;i < sel_MainPageURL.options.length;i++){
				sel_MainPageURL.options[i].style.color = 'black';
				if(MainPageURL == sel_MainPageURL.options[i].value){
					sel_MainPageURL.selectedIndex = i;
					sel_MainPageURL.options[i].style.color = 'red';
					break;
				}
			}
			sel_MainPageURL.style.height = 25;
			//alert(sel_MainPageURL.offsetHeight);
		}
		
		GM_setValue('Communication', 
		'\n' + 
		'url:' + url + '\n' + 
		'action:func_PerSonal_URL_Get')
		
		document.getElementById("sel_MainPageURL").addEventListener("change", function() {
			if(document.getElementById("cbox_MainPageURL").checked){
				var e = document.getElementById("sel_MainPageURL");
				var strUser = e.options[e.selectedIndex].value;
				if(e.options[e.selectedIndex].text == '自訂'){
					var targetUser = prompt('請輸入首頁轉址目標','');
					if(targetUser){
						GM_setValue("MainPageURL",targetUser);
						strUser = targetUser;
					}
					else {
						for(var i = 0;i < e.options.length;i++){
							//e.options[i].style.color = 'black';
							if(MainPageURL == e.options[i].value){
								e.selectedIndex = i;
								//e.options[i].style.color = 'red';
								break;
							}
						}
					}
				}
				//GM_setValue("MainPageURL",strUser);
				//alert(strUser);
			}
		}, false);
		
		document.getElementById("byWuKC").addEventListener("click", function() {
			GM_openInTab(URL_Compatibility("http://www.lv1.in/lib/read.php?fid=1&tid=1334622775"));
		}, false);
		
		document.getElementById("byWuKC2").addEventListener("click", function() {
			GM_openInTab(URL_Compatibility("http://www.lv1.in/lib/read.php?fid=2&tid=1338399508"));
		}, false);
		
		document.getElementById("SetHelp").addEventListener("click", function() {
			CheckVersion(2);
		}, false);
		
		document.getElementById("cbox_Save").addEventListener("click", function() {
			DivSettingSave();
			
			if(document.getElementById("cbox_MainPageURL").checked){
				var e = document.getElementById("sel_MainPageURL");
				var strUser = e.options[e.selectedIndex].value;
				GM_setValue("MainPageURL",strUser);
				//alert(strUser);
			}
			
			//document.getElementById("tsetting").style.display = 'none';
			//document.getElementById("BackSeting").style.display = 'none';
			$('#BackSeting').fadeOut(300);
			$('#tsetting').fadeOut(300);
			
			if(is_chrome){
				GM_setValue('Communication', 
				'\n' + 
				'url:' + url + '\n' + 
				'action:func_BackSeting_none');
			}
			else {
				parent.postMessage({
					'url': url,
					'action':'func_BackSeting_none'
				}, '*');
			}
			
			if(MainPageURL){
				var sel_MainPageURL = document.getElementById("sel_MainPageURL");
				for(var i = 0;i < sel_MainPageURL.options.length;i++){
					sel_MainPageURL.options[i].style.color = 'black';
				}
				sel_MainPageURL.options[sel_MainPageURL.selectedIndex].style.color = 'red';
			}
			
			//GM_notification("設定已儲存.....");
			
			InsertCSS('http://bhunji.myweb.hinet.net//Javascript/toast/css/jquery.toastmessage.css');
			
			$().toastmessage('showToast', {
				//text     : 'Success Dialog which is sticky',
				text     : '設定已存檔.',
				sticky   : false,
				position : 'top-right',
				type     : 'success',
				closeText: '',
				close    : function () {
					//console.log("toast is closed ...");
				}
			});
		}, false);
		
		document.getElementById("cbox_Cancel").addEventListener("click", function() {
			//DivSetting();
			
			//document.getElementById("tsetting").style.display = 'none';
			//document.getElementById("BackSeting").style.display = 'none';
			$('#BackSeting').fadeOut(300);
			$('#tsetting').fadeOut(300);
			
			if(is_chrome){
				GM_setValue('Communication', 
				'\n' + 
				'url:' + url + '\n' + 
				'action:func_BackSeting_none');
			}
			else {
				parent.postMessage({
					'url': url,
					'action':'func_BackSeting_none'
				}, '*');
			}
		}, false);
		
		//alert(document.getElementById("cbox_Save"));
	}
	else if(url.match('menu.php')){
		var divBackGround = document.createElement("div");
		divBackGround.id = 'BackSeting';
		divBackGround.style.display = 'none';
		divBackGround.style.position = 'absolute';
		divBackGround.style.top = '0%';
		divBackGround.style.left = '0%';
		divBackGround.style.width = '100%'
		divBackGround.style.height = '100%'
		divBackGround.style.backgroundColor = 'black';
		divBackGround.style.zIndex = '1001';
		divBackGround.style.MozOpacity = '.50';
		divBackGround.style.opacity = '.50';
		divBackGround.style.filter = 'alpha(opacity=50)';
		
		var c3 = document.getElementsByTagName("body")[0];
		var divButton = document.createElement("div");
		divButton.id = 'divButton';
		divButton.style.zIndex = '1002';
		divButton.style.display = 'block';
		divButton.style.position = 'absolute';
		divButton.innerHTML = "<button id='SetDivButton'>Lv1腳本設定</button>";
		c3.insertBefore(divBackGround,c3.lastChild);
		insertAfter(divButton,c3.lastChild);
		
		var fileObj = document.getElementById("SetDivButton");
		
		//==============================================================================
		//設定紐特效
		
		fileObj.addEventListener("click", function() {
			$(fileObj).fadeOut(300);
			$(fileObj).fadeIn(300);
			
			if(document.getElementById("BackSeting").style.display == 'none'){
				if(is_chrome){
					GM_setValue('Communication', 
					'\n' + 
					'url:' + url + '\n' + 
					'action:func_BackSeting_block');
				}
				else {
					parent.postMessage({
						'url': url,
						'action':'func_BackSeting_block'
					}, '*');
				}
				
				//document.getElementById("BackSeting").style.display = 'block';
				$('#BackSeting').fadeIn(300);
				
				if(document.body.innerHTML.match('歡迎回來')){
					var MenuURLs = document.getElementsByTagName("a");
					
					for(var i = 0;i < MenuURLs.length;i++){
						if(MenuURLs[i].href.match('index3.php')){
							parent.postMessage({
								'url': url,
								'action':'func_PerSonal_URL',
								'data_name':MenuURLs[i].textContent.split('(')[0],
								'data_url':MenuURLs[i].href
							}, '*');
							break;
						}
					}
				}
			}
			else {//存檔
				document.getElementById("BackSeting").style.display = 'none';
				
				if(is_chrome){
					GM_setValue('Communication', 
					'\n' + 
					'url:' + url + '\n' + 
					'action:func_BackSeting_none');
					/*
					GM_setValue('Communication', 
					'\n' + 
					'url:' + url + '\n' + 
					'action:func_save');
					*/
				}
				else {
					parent.postMessage({
						'url': url,
						'action':'func_BackSeting_none'
					}, '*');
					/*
					parent.postMessage({
						'url': url,
						'action':'func_save'
					}, '*');
					*/
				}
			}
		}, false);
	}
}

function LOGO(){
	if(!document.getElementById('lv1IDimg')) setTimeout(LOGO2,1500);
}

function LOGO2(){
	var c3 = document.getElementsByTagName("body");
	if(!document.getElementById('lv1IDimg')) var fileObj3 = document.createElement("img");
	else var fileObj3 = document.getElementById('lv1IDimg');
	//fileObj3.src = "http://bhunji.myweb.hinet.net/Javascript/Update/autoloadimags/common_49_usergroup_icon.png";
	fileObj3.src = GM_getResourceURL("Lv1LOGO");
	fileObj3.title = "Lv1小站腳本支援 By Tast.";
	fileObj3.id = "lv1IDimg";
	
	fileObj3.height = 0; //99
	fileObj3.weight = 0; //89
	
	//fileObj3.style.position = "absolute";
	fileObj3.style.position = "fixed";
	fileObj3.style.cursor = "help";
	fileObj3.style.bottom = "0px";
	fileObj3.style.left = "0px";
	fileObj3.style.zIndex = '10';
	
	c3[0].insertBefore(fileObj3,c3[0].lastChild);
	$(fileObj3).animate({ "width": "44.5", "height": "49.5" });
	
	fileObj3.addEventListener("click", function (){
		if(confirm('給作者短訊留言?'))
			GM_openInTab(URL_Compatibility("http://www.lv1.in/lib/sendpm.php?msgto=bhunji"));
	}, false);
	
	var MOverCount = 0;
	
	fileObj3.addEventListener("mouseover", function (){
		if(TFversion()){
			document.getElementById('SetDivButton').innerHTML = '請更新支援腳本';
			document.getElementById('SetDivButton').style.color = 'blue';
		}
		else {
			document.getElementById('SetDivButton').innerHTML = '給作者短訊留言';
			document.getElementById('SetDivButton').style.color = 'red';
		}
		$(fileObj3).animate({ "width": "89", "height": "99" },"fast");
	}, false);
	  
	fileObj3.addEventListener("mouseout", function (){
		document.getElementById('SetDivButton').innerHTML = 'Lv1腳本設定';
		document.getElementById('SetDivButton').style.color = 'black';
		
		MOverCount = MOverCount + 1;
		if(MOverCount >= 5){
			$(fileObj3).animate({ "width": "44.5", "height": "49.5" },"slow");
			document.getElementById('SetDivButton').style.color = 'green';
			document.getElementById('SetDivButton').innerHTML = '按鈕表示:別亂玩啦XD';
			alert('按鈕表示 ： 別亂玩啦XD');
			MOverCount = 0;
		}
		else if(!TFversion()) $(fileObj3).animate({ "width": "44.5", "height": "49.5" },"fast");
	}, false);
	
	if(TFversion()){
		$(fileObj3).animate({ "width": "89", "height": "99" },"fast");
		//fileObj3.height = 99;
		//fileObj3.weight = 89;
		
		if(Vcbox_autoupdate){
			var LOGObreathing = 0;
			setInterval(function (){
				if(!LOGObreathing){
					LOGObreathing = 1;
					$(fileObj3).fadeTo(2000,0.0);
				}
				else {
					LOGObreathing = 0;
					$(fileObj3).fadeTo(2000,1.0);
				}
			},2000);
		}
		
		fileObj3.title = "小站腳本已有新版本，請更新~~";
	}
}

function Login(type){
	//alert(type);
	if(Pname && password){
		if(is_chrome){
			//if(!type) document.location.href = URL_Compatibility("http://www.lv1.in/lib/login.php?act=loging");
			$.post('lib/login.php', {'NAME':Pname,'MAIL':Decrypt(password,rsTgNM)}, function(data) {
				//alert(data);
				if(data == '<meta http-equiv="refresh" content="0;URL=../menu.php">'){
					is_logged = true;
					var fileObj3 = document.createElement("img");
					fileObj3.src = GM_getResourceURL('loading');
					fileObj3.title = "正在載入選單頁面";
					fileObj3.id = "lv1IDimgLoading";
							
					fileObj3.style.position = "absolute";
					fileObj3.style.cursor = "help";
					fileObj3.style.bottom = "0px";
						
					fileObj3.style.right = '0px';
					GM_xmlhttpRequest({method: "POST",url: URL_Compatibility("http://www.lv1.in/menu.php?bbs="),onload: function(res) {
						$("body").hide(0,function () {
							if(res.responseText.match('logout.php')){
								var ResT = res.responseText;
								//alert(res.responseText);
								document.body.innerHTML = ResT.split('<body onload="init();">')[1].split('</body>')[0];
								document.head.innerHTML = ResT.split('<head>')[1].split('</head>')[0];
										
								Func_menu(1);
								//setTimeout(Func_Talking,500);
								Func_Talking(500);
							}
							else RemoveC(fileObj3);
							/*
							document.body.innerHTML = res.responseText;
							Func_menu(1);
							//setTimeout(Func_Talking,500);
							Func_Talking(500);
							*/
						});
					}});
					GM_setValue('Communication', 
					'\n' + 
					'url:' + url + '\n' + 
					'action:func_List_Get_New');
				}
				else if(data.match("密碼錯誤")){
					GM_setValue("name", false);
					GM_setValue("password", false);
					alert("自動登入帳號或密碼錯誤.已註銷存檔.");
					if(!type) document.location.href = URL_Compatibility("http://www.lv1.in/menu.php?act=error");
				}
				else Login(0);
			});
			return ;
		}
		
		var myData = new FormData();
		myData.append("NAME", Pname);
		myData.append("MAIL", Decrypt(password,rsTgNM));
		
		var ret = GM_xmlhttpRequest({
			method: "POST",
			url: URL_Compatibility("http://www.lv1.in/lib/login.php"),
			data: myData,
			onload: function(res) {
				if(res.responseText.match("密碼錯誤")){
					GM_setValue("name", false);
					GM_setValue("password", false);
					alert("自動登入帳號或密碼錯誤.已註銷存檔.");
					if(!type) document.location.href = URL_Compatibility("http://www.lv1.in/menu.php?act=error");
				}
				else {
					is_logged = true;
					if(!type && !is_chrome){
						//document.location.href = URL_Compatibility("http://www.lv1.in/menu.php?act=logined");
						if(res.responseText == '<meta http-equiv="refresh" content="0;URL=../menu.php">'){
							var fileObj3 = document.createElement("img");
							fileObj3.src = GM_getResourceURL('loading');
							fileObj3.title = "正在載入選單頁面";
							fileObj3.id = "lv1IDimgLoading";
							
							fileObj3.style.position = "absolute";
							fileObj3.style.cursor = "help";
							fileObj3.style.bottom = "0px";
							
							fileObj3.style.right = '0px';
						
							GM_xmlhttpRequest({method: "POST",url: URL_Compatibility("http://www.lv1.in/menu.php?bbs="),onload: function(res) {
								$("body").hide(0,function () {
									if(res.responseText.match('logout.php')){
										var ResT = res.responseText;
										//alert(res.responseText);
										document.body.innerHTML = ResT.split('<body onload="init();">')[1].split('</body>')[0];
										document.head.innerHTML = ResT.split('<head>')[1].split('</head>')[0];
										
										Func_menu(1);
										//setTimeout(Func_Talking,500);
										Func_Talking(500);
									}
									//else RemoveC(fileObj3);
									else Login(0);
								});
								//alert(res.responseHeaders);
							}});
							
							parent.postMessage({
								'url': url,
								'action':'func_List_Get_New'
							}, '*');
						}
						/*
						else {
							document.getElementById('lv1IDimgLoading').src = 'http://www.iconpng.com/png/windows8_icons/error.png';
							Login(0);
						}
						*/
					}
					else if(type == 1 && !is_chrome) document.location.href = document.location.href;
					else if(type == 2) {
						//document.location.href = document.location.href;
						//var c2Text = "";
						var c2 = document.getElementsByTagName("form");
						for(var i=0;i < c2.length;i++){
							//c2Text = c2Text + "\n" + c2[i].innerHTML;
							//c2Text = c2Text + "\n" + c2[i].textContent;
							
							if(c2[i].textContent.match('密碼')){
								c2[i].innerHTML = c2[i].innerHTML.replace('名字： <input name="FROM" size="19">密碼<font size="1"> (可省略) </font>: <input name="mail" size="10" type="password"><br>','<font color="green">已成功自動登入</font>');
								break;
								//return true;
							}
						}
						//alert(c2Text);
					}
				}
			}
		});
	}
}

function CheckVersion(type){
	var CheckingVersion = 1;
	
	var d = new Date();
	var fDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	var now = new Date();
	now = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();
	
	if((updateDate !== fDate && Vcbox_autoupdate == true) || type == 1 || type == 2 || CheckingVersion){
		GM_setValue("updateDate", fDate);
		var ret = GM_xmlhttpRequest({
			method: "GET",
			url: "http://bhunji.myweb.hinet.net/Javascript/Update/autoloadimags/version.js" + "?time=" + now,
			onload: function(res) {
				var resT = getQueryString("lv1",res.responseText);
				if(resT){
					//alert(resT);
					GM_setValue("updateV", resT);
					if(!type){
						if(resT > version && GM_getValue('VerSionAlerted',false) !== resT){
							//alert('已有最新版本 : ' + resT);
							GM_notification('已有最新版本 : ' + resT);
							GM_setValue('VerSionAlerted',resT);
						}
					}
					else if(type == 2){
						if(resT > version){
							//alert('已有最新版本 : ' + resT);
							GM_notification('已有最新版本 : ' + resT);
							GM_setValue('VerSionAlerted',resT);
						}
						else if(resT < version){
							//alert('正在使用 Beta 測試版本 : ' + version + "\n" + '原始版本 : ' + resT);
							GM_notification('正在使用 Beta 測試版本 : ' + version + "    " + '原始版本 : ' + resT);
							
						}
						else if(resT == version){
							//alert('目前已是最新版');
							GM_notification('目前已是最新版');
							
						}
					}
				}
				if(type == 1 || test == 1){
					//alert(resT);
					GM_notification('版本：' + resT);
				}
			}
		});
	}
}

function TFversion(){
	if(updateV > version){
		return true;
	}
	else return false;
}

function Lv1About(){
	if(TFversion()) var NewVersion = "\n" + "\n" + "~~~~已有更新版本，請盡速更新~~~";
	else var NewVersion = "";
	
	var RST = confirm(
	"Lv1小站腳本支援 V" + version + "\n" + 
	" " + "\n" + 
	
	"功能說明:" + "\n" + 
	"    1.自動登入(可關閉)" + "\n" + 
	"    2.自動載入圖片" + "\n" + 
	"    3.隱藏規則顯示區." + "\n" + 
	"    4.擴大[修改、新文章]輸入框大小，且可儲存設定." + "\n" + 
	"    5.新增[修改、新文章]Ctrl+Enter快速鍵輸出." + "\n" + 
	"    6.新版本檢測功能." + "\n" + 
	"    7開啟單頁自動登入，不須通過登入頁面(完全自動)." + "\n" + 
	"    8.選單頁面左下角新增小圖示." + "\n" + 
	"    9.點閱主題直接開新頁面，不覆蓋當前頁面." + "\n" + 
	"  10.腳本設定視窗" + "\n" +
	"  11.首頁自動轉貼圖版(可選)" + "\n" +
	"  12.隱藏多媒體 by WuKC" + "\n" +
	"  13.快速鍵增加詢問訊息,免於特殊狀況" + "\n" +
	"  14.快速鍵Ctrl優先設計" + "\n" +
	"  15.手動檢查版本" + "\n" +
	
	" " + "\n" + 
	
	"Google Chrome" + "\n" + 
	"   1.For Chrome Beta Google 測試版開始 2012.05.24" + "\n" +
	"   2.修復但未完成小站支援LOGO" + "\n" +
	"   3.修正首頁跳轉沒有個人版選項" + "\n" +
	
	" " + "\n" + 
	
	"製作者:Tast" + "\n" + 
	"感謝使用" + "\n" + 
	uDate + "\n" + 
	" " + "\n" + 
	"點擊 [取消] 進入lv1小站腳本網頁" + NewVersion
	);
	
	if(!RST) GM_openInTab(URL_Compatibility("http://www.lv1.in/lib/read.php?tid=1329031628"));
}

function insertAfter(newEl, targetEl){
	var parentEl = targetEl.parentNode;
            
	if(parentEl.lastChild == targetEl)
			parentEl.appendChild(newEl);
	else	parentEl.insertBefore(newEl,targetEl.nextSibling);        
}

function SaveInputSize(){
	GM_setValue("inputSize", document.getElementById('MESSAGE').style.height);
	alert("已儲存=" + GM_getValue("inputSize", false));
}

function AutoLogin(){
	var ANC = prompt("登入帳號", "");
	if(ANC)
		var PAS = prompt("登入密碼", "");
	
	if(ANC && PAS){
		var rsTg = randomString();
		
		GM_setValue("encpass", rsTg);
		
		if(ANC) GM_setValue("name", ANC);
		if(PAS) GM_setValue("password", Encrypt(PAS,rsTg));
		//alert("自動登入設定成功.");
		document.location.href = URL_Compatibility("http://www.lv1.in/menu.php?act=in");
		GM_notification("自動登入設定成功.");
		
		//alert(Decrypt(Encrypt(PAS,rsTg),rsTg));
	}
}

function AutoLogout(){
	var result = confirm('確定取消自動登入?' + '\n' + '這將會取消存檔並自動登出');
	if(result){
		GM_setValue("name", false);
		GM_setValue("password", false);
		
		var ret = GM_xmlhttpRequest({
			method: "POST",
			//data: myData,
			url: URL_Compatibility("http://www.lv1.in/lib/logout.php"),
			onload: function(res) {
				document.location.href = URL_Compatibility("http://www.lv1.in/menu.php?act=out");
				GM_notification("已取消自動登入.....");
			}
		});
		//alert('已取消自動登入');
	}
}
function f_RCU() {
	updateDate = 0;
	GM_setValue("updateDate",false);
	//alert("Checking...");
	CheckVersion(1);
}

GM_registerMenuCommand("檢查更新", f_RCU);

function f_CSV() {
	alert(
	"帳號 = " + GM_getValue("name", false) + "\n" + 
	//"Password=" + GM_getValue("password", false) + "\n" + 
	"最新版本 = " + GM_getValue("updateV",false) + "\n" + 
	"更新檢查 = " + GM_getValue("updateDate",false) + "\n\n" + 
	"Cookies :" +
	function_LCS()
	);
}

function function_LCS() { 
	//alert(get_cookies_array());
	var CKSin = "";
	var cookies = get_cookies_array();
	for(var name in cookies) {
		//document.write( name + " : " + cookies[name] + "<br />" );
		//alert(name + " : " + cookies[name]);
		CKSin = CKSin + "\n" + name + " : " + cookies[name];
	}
	//alert(CKSin);
	
	return CKSin;
}
/*
function ReplaceAll(Source,Change,Target){
	return Source.replace(new RegExp(Change,"gm"),Target);
}
*/
function get_cookies_array() {
    var cookies = { };

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
		
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }
    return cookies;
}

GM_registerMenuCommand("顯示本端資訊", f_CSV);
	
//======================================================================================
//最後呼叫，降低網頁處理延遲
setTimeout(function () { //檢查更新
	CheckVersion(0);
},5 * 1000);

Func_Talking(1500);
/*
GM_registerMenuCommand("加密資料測試", Crying);

function Crying(){
	var Cry = prompt('加密資料','');
	var CryPass = prompt('密碼','');
	alert(Encrypt(Cry,CryPass));
};
GM_registerMenuCommand("解密資料測試", Cried);

function Cried(){
	var Cry = prompt('解密資料','');
	var CryPass = prompt('密碼','');
	alert(Decrypt(Cry,CryPass));
};
*/