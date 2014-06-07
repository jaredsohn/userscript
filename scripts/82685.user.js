// ==UserScript==
// @name           PSUT RegWeb Fixer
// @namespace      http://userscripts.org/users/199967
// @include        http://regweb.psut.edu.jo/*
// ==/UserScript==
/*
	Created By: Monir Abu Hilal
	E-mail: me[-at-]monirabuhilal.com
	Facebook: http://www.facebook.com/monir
	Twitter: http://www.twitter.com/MonirAbuHilal
	Website: http://www.monirabuhilal.com/
 */

// ---------------- JQUERY SCRIPT -------------------------

var $;
// Add jQuery
    (function(){
	//alert(unsafeWindow);
		//if(window.google != undifined){
			//var unsafeWindow = this['unsafeWindow'] || window;
		//}
		if( typeof (unsafeWindow) == 'undefined'){
			//alert("inside the if");
			unsafeWindow = window;
		}
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, 
				GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            //letsJQuery();
			doFixPSUT_RegWeb();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        //alert($); // check if the dollar (jquery) function works
        //alert($().jquery); // check jQuery version
    }

// [END]---------------- JQUERY SCRIPT -------------------------

function doFixPSUT_RegWeb() {
		// Temp for the AutoComplete
		var tempUserId = $("#ctl00_txtUserid").val();
		var tempUserPass = $("#ctl00_txtPass").val();
		
		
		$(".style11").html("");
		$("body").append( GetPsut_RegWeb_Style() );
		// Fix SideBar ----------------------------------------
		
		var sideBarTD = $('body > form > table > tbody > tr > td > table:eq(1) > tbody > tr > td:eq(1), body > form > div > table > tbody > tr > td > table:eq(1) > tbody > tr > td:eq(1)');
		sideBarTD.attr('style','').attr('class','');
		
		//$('table,tr,td', sideBarTD).attr('style','');
		var loginImage = $("img[src$='login_key.bmp']", sideBarTD);
		if ( loginImage != null ){
			loginImage.attr('style','');
			loginImage.attr('src','http://dryicons.com/images/icon_sets/luna_blue_icons/png/64x64/unlock.png');
			loginImage.addClass('loginIcon');
		}
		// [END] Fix SideBar ----------------------------------------
		
		var welcomeImage = $("img[src$='wel_MSG.bmp']");
		if ( welcomeImage != null ){
			welcomeImage.attr('style','width:293px; height:383px;');
			var welcomeImageTD = welcomeImage.parent().parent().parent().parent().parent();
			
			welcomeImageTD.attr('style','width:320px');
			welcomeImageTD.html( '<div class="divWelcomeMsg">' + welcomeImageTD.html() + '</div>');
		}
		
		
		var doc=content.document.getElementsByTagName("body");
		
		//$("div").attr('style',"font-family:tahoma !important; background:#EEEEEE;");
		
		$('#Object4', doc).css("display", "none");
		$('#Object1', doc).css("display", "none");
		
		$('#Object2', doc).css("display", "none");
		showLink('ctl00_ButLogin1','تسجيل الدخول'); // Login
		// 		  ctl00_lkdRegDate1
		showLink('ctl00_lkdRegDate','اوقات التسجيل'); // Registration Date
		showLink('ctl00_lkdEval','التقيم'); // Evaluation
		showLink('ctl00_lkdReg','التسجيل'); // Registration
		showLink('ctl00_lkdStExam','الامتحانات'); //Exams
		showLink('ctl00_lkdAddDrop','السحب والإضافة');//Add & Drop
		showLink('ctl00_lkdChangePass','تغيير كلمة السر'); // Change Password
		showLink('ctl00_lkdLogOut','الخروج'); // Logout
		
		$(".tableStyle a").each(function(i, value) {
			var currLink = $(value);
			if( currLink.html().trim() == 'اقرأ المزيد'){
				currLink.html( '[ المزيد ]');
				currLink.addClass("moreLink");
				currLink.parent().addClass("newsMarqueeItem");
				currLink.parent().prepend('<span class="newsArrow">» </span>');
			}
		});
		//var headerTD = $("param[value$='master.swf']").parent().parent();
		var headerTD = $("embed[src$='master.swf']").parent().parent();
		
		headerTD.html( GetPsut_RegWeb_Header() );
		headerTD.attr('style','');
		
		var footerTD = $("td[height='23']");
		footerTD.addClass("pageFooter");
		footerTD.html('<div class="divFooter">' + footerTD.text() + '<div class="footerTagLine">Redesigned &amp; Fixed By: <a href="http://www.monirabuhilal.com/">Monir Abu Hilal</a></div></div>');
		
		
		var MainFlashTD = $("param[value$='welcome.swf']").parent().parent();
		MainFlashTD.html('<img src="http://upload.wikimedia.org/wikipedia/ar/6/6a/Princess_Sumaya_University_logo.png" />');

		
		sideBarTD.addClass("sideBarTD");
		sideBarTD.html('<div class="sideBar">' + sideBarTD.html() + '</div>');
		
		var loginVald = $('span[id$="vldCustom"]', sideBarTD);
		if( loginVald.css("visibility") == 'hidden' ){
			loginVald.attr("style","display:none;");
		}
		else{
			loginVald.attr("style","").addClass("spanValidator");
		}
		
		$('#ctl00_btnHiddenFin').attr('disabled', 'disabled');
		
		//$('input[type="password"]').keypress(null);
		//input[type="password"]
		
		$('#ctl00_txtPass').keypress(function(event) {
			if (event.keyCode == '13') {
				//event.preventDefault();
				//alert("Enter Clicked!");
				
				window.location = $('a#ctl00_ButLogin1').attr("href");
				//alert("Clicked");
			}
		});

		
		// Restore the temp data for the AutoComplete
		$("#ctl00_txtUserid").val(tempUserId);
		$("#ctl00_txtPass").val(tempUserPass);
}

function showLink(id,txt){
/*
		var doc = content.document.getElementsByTagName("body");
    	$('#' + id, doc).attr('style','');
		$('#' + id, doc).text(txt);
*/
// [name^="news"]
	var currLink = $('#' + id); // $('a[id^="' + id + ' "]'); 
	
	currLink.attr('style','');
	currLink.text(txt);
	currLink.addClass("actionLink");
	//alert(currLink);
}


function GetPsut_RegWeb_Style(){
	var strCSS = '<style type="text/css">';
	strCSS += 'body{margin:0px; padding:0px;}';
	strCSS += 'body, label, div, .tableStyle, *{font-family:tahoma !important; font-size:12px; text-decoration:none !important;}';
	strCSS += '.tableStyle, .tableStyle div{background:#336699 !important; color:#333333;}.tableStyle a{color:#ffffff;}';
	strCSS += 'a:hover{text-decoration:underline !important}';
	strCSS += '.newsMarqueeItem{color:#ffffff !important; font-weight:bold;}';
	strCSS += '.newsArrow{font-size:16px; color:#ffCC00; line-height:0px;}';
	strCSS += '.moreLink{display:block; color:#D2E1F0 !important; margin-bottom:10px; font-weight:normal;}';
	strCSS += '.tableStyle{border:1px #ffffff solid !important; padding:0px; border:none !important;}';
	strCSS += '.divHeader{margin:0px;}';
	strCSS += '.logoHolder{padding:5px; border:0px #d0d0d0 solid; }';
	strCSS += '.divHeader{border:3px #ffffff solid; border-top:none; margin:0px 10px 10px 10px; box-shadow:0px 0px 5px #999999; border-radius:10px; -moz-border-radius:0px 0px 20px 20px; -moz-box-shadow:0 0 5px #999999;} ';
	strCSS += '.divHeader{background:-webkit-gradient( linear, left bottom, left top, color-stop(0.04, rgb(255,255,255)), color-stop(0.76, rgb(224,224,224)) ); background:-moz-linear-gradient( center bottom, rgb(255,255,255) 4%, rgb(224,224,224) 76% )}';
	strCSS += ".divHeader h1{font-size:36px; font-family:'Traditional Arabic' !important}";
	strCSS += ".divHeader h1{color: #113E56; margin:10px; text-shadow:2px 2px 3px #BABABA;}";
	strCSS += ".pageFooter{text-align:left; background:#ffffff; color:#333333 !important; text-shadow:1px 1px 1px #D0D0D0;}";
	strCSS += ".divFooter{padding:10px; background:-webkit-gradient( linear, left bottom, left top, color-stop(0.0, #ffffff)), color-stop(0.30, #f0f0f0), color-stop(0.70, #ffffff) );";
	strCSS += "background:-moz-linear-gradient( center bottom, #ffffff 0%, #f0f0f0 30%, #ffffff 70% ); margin-top:0px;}";
	strCSS += ".footerTagLine{color:#666666; float:right;} .footerTagLine a{ color:#336699; font-weight:bold; }";
	strCSS += ".sideBarTD{width:260px; vertical-align:top;}";
	strCSS += ".sideBar{border:3px #ffffff solid; background:#336699; margin: 10px; padding-bottom:10px; box-shadow:0px 0px 5px #999999; border-radius:20px; -moz-border-radius:0px 20px 0px 20px; -moz-box-shadow:0 0 5px #999999;}";
	strCSS += ".loginIcon{margin-bottom:10px;}";
	strCSS += ".divWelcomeMsg{ background:#F3F3F3; margin: 10px; padding:10px; box-shadow:0px 0px 5px #999999; border-radius:20px; -moz-border-radius:20px 0px 20px 0px; -moz-box-shadow:0 0 5px #999999; border:3px #ffffff solid;}";
	strCSS += ".spanValidator{border:3px #ffffff solid; color:#ff0000; margin:10px; background:#F0F0F0; -moz-box-shadow:0 0 5px #202020; display:block; padding: 5px;}";
	strCSS += ".actionLink{margin:5px;display:block !important;}";
	strCSS += '</style>';
	
	return strCSS;
}

function GetPsut_RegWeb_Header(){
	var strHTML = '<div class="divHeader"><table><tr><td>';
		strHTML += '<div class="logoHolder"><a href="/"><img src="http://upload.wikimedia.org/wikipedia/ar/6/6a/Princess_Sumaya_University_logo.png" height="120" border="0" /></a></div>'; //width="189" height="176" /></div>';
		strHTML += '</td><td>';
		strHTML += '<h1>موقع التسجيل - جامعة الأميرة سمية للتكنولوجيا</h1>';
		strHTML += '</td></tr></table></div>';
	
	return strHTML;
}