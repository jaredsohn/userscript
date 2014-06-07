// ==UserScript==
// @name          choudhary
// @namespace     http://userscripts.org/
// @version       1
// @description   trial
// @include       http://web.337.com/en/pay/game/*
// @include       http://web.337.com/en/pay/game/*
// ==/UserScript==
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Pay Center - 337</title>
    <meta name="description" content="">
    <meta name="author" content="">
	<link href="http://337.eleximg.com/337/v3static/css/web337.css?131029008" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="http://337.eleximg.com/337/v3static/css/profile.css?1306281034" />
 
    <link rel="shortcut icon" href="http://337.eleximg.com/337/v3static/ico/favicon.ico">
    
<link href="http://337.eleximg.com/337/v3static/css/pay_game_1.0.css?20130925001" rel="stylesheet" type="text/css"/>

    <script>
	//add google analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-39391247-1', '337.com');
    ga('send', 'pageview');
	</script>
</head>
<body>



	<div class="header_view" style="height:45px;position:relative;z-index:1000;">
    <div id="station-nav-wrapper">
        <div class="station-nav-list clearfix">
            <div class="website-logo"><a href="http://web.337.com/en/"><i class="logo-bg"></i></a></div>
            <div class="nav-list-fixed-center">
                <div class="nav-list-left">
                    <ul class="clearfix">
                        <li><a id="url_games_337" href="http://us.337.com" target="_blank"><span class="small-game icon-list pngFix"></span></a></li>
                        <li><a href="http://web.337.com/en" class="active"><span class="web-game icon-list pngFix"></span></a></li>
                    </ul>
                </div>
                <div class="nav-list-middle">
                    <ul class="clearfix">
                        <li><a class="" href="http://web.337.com/en/vip">Gold Member</a></li>
                        <li><a class="" href="http://support.337.com/en">Support</a></li>
                        <li><a class="inActive" href="http://web.337.com/en/pay/game/">Recharge</a></li>
                        <li><a class="" href="http://web.337.com/en/event/">Activity</a></li>
                        <li><a  href="http://forum.337.com/en/" target="_blank">Forum</a></li>
                    </ul>
                </div>
            </div>
            <div class="nav-list-right">

                                    <ul id="my_view" class="clearfix set">
                        <li id="login-list">
                            <a class="login-list-inner" href="http://web.337.com/en/user/profile">
                                <img class="login-user-image" alt="choudhary.ma" src="http://graph.facebook.com/100002971262211/picture?type=large"/>
							<span class="login-user-name">
							<xmp>choudhary.ma</xmp>

							</span>
                                                                <img class="login-slide" src="http://337.eleximg.com/337/v3static/img/primaryStation/slide.png" alt=""/>
                            </a>
                        </li>
                                                                        <div id="before-login" >
                            <ul style="display:none" id="logged-in-content" class="clearfix">
                                <li class="first"><a href="http://web.337.com/en/user/edit/"><span class="login-setting icon-list-set"></span>Account settings</a></li>
                                <li class="first"><a href="" onclick="javascript:elex.user.logout();return false;"><span class="login-logout icon-list-set"></span>Exit</a></li>
                                
                            </ul>
                                                    </div>
                    </ul>

            </div>
        </div>
    </div>
</div>


<div id="select-nation">
    <div class="header">Select Your Language<a href="javascript:void(0);" class="close"></a></div>
    <div class="content">
        <ul class="clearfix" id="setlanguage">
            <li><a lang_id="pt_BR" lang="pt" href="javascript:void(0);"><span class="nation1 nation-flag"></span>Brasil</a></li>
            <li><a lang_id="en_US" lang="en" href="javascript:void(0);"><span class="nation9 nation-flag"></span>Argentina</a></li>
            <li><a lang_id="en_US" lang="en" href="javascript:void(0);"><span class="nation2 nation-flag"></span>American</a></li>
            <li><a lang_id="es_ES" lang="es" href="javascript:void(0);"><span class="nation10 nation-flag"></span>España</a></li>
            <li><a lang_id="en_US" lang="en" href="javascript:void(0);"><span class="nation3 nation-flag"></span>UK</a></li>
            <li><a lang_id="pt_BR" lang="pt" href="javascript:void(0);"><span class="nation11 nation-flag"></span>Portugal</a></li>
            <li><a lang_id="tr_TR" lang="tr" href="javascript:void(0);"><span class="nation4 nation-flag"></span>Türkiye</a></li>
            <li><a lang_id="pl_PL" lang="pl" href="javascript:void(0);"><span class="nation12 nation-flag"></span>Polska</a></li>
            <li><a lang_id="th_TH" lang="th" href="javascript:void(0);"><span class="nation5 nation-flag"></span>ประเทศไทย</a></li>
            <li><a lang_id="zh_CN" lang="zh" href="javascript:void(0);"><span class="nation13 nation-flag"></span>中文（简体）</a></li>
            <li><a lang_id="zh_TW" lang="tw" href="javascript:void(0);"><span class="nation6 nation-flag"></span>中文（繁體）</a></li>
            <li><a lang_id="de_DE" lang="de" href="javascript:void(0);"><span class="nation14 nation-flag"></span>Deutschland</a></li>
            <li><a lang_id="ar_AR" lang="ar" href="javascript:void(0);"><span class="nation7 nation-flag"></span>مصر</a></li>
            <li><a lang_id="en_US" lang="en" href="javascript:void(0);"><span class="nation15 nation-flag"></span>Canada</a></li>
            <li><a lang_id="en_US" lang="en" href="javascript:void(0);"><span class="nation8 nation-flag"></span>日本</a></li>
            <li><a lang_id="en_US" lang="en" href="javascript:void(0);"><span class="nation16 nation-flag"></span>France</a></li>
        </ul>
    </div>
</div>

<div id="header-bg-black" style="display:none;"></div>

<!-- test for:en-->



<div class="main_wrap">

	    
        <div class="container box">
        <div class="sidebar-view-gradient"></div>
        <div class="row">
        	<div class="sidebar span3 pull-left" >
                <div class="user-panel">
                    <div class="avatar pull-left">
                        <img src="http://graph.facebook.com/100002971262211/picture?type=large" class="img-polaroid user-avatar" />
                    </div>
                    <div class="user-info pull-left">
                        <div class="username fbuser">
                        <xmp style="margin:0px;">choudhary.ma</xmp>
                        </div>
						
						                        <p class="credits">999999</p>
                    </div>
					<div class="vip_lottery_btn">
						<a href="http://web.337.com/en/vip/lottery/" class="href_css">
						<i class="gift_icon"></i></a>
						<span>Lottery</span>
					</div>

                </div>
                
                               <div id="left_nav">
                    <h4 style="cursor: pointer;">Recharge</h4>
                    <ul class="navigation">
                        <li class="payments selected">
                            <a href="http://web.337.com/en/pay/game/">
                                <span  class="sidebar-item">Web Game</span>
                            </a>
                        </li>
                        <li class="payments ">
                            <a href="http://web.337.com/en/pay/mobile_game/">
                                <span  class="sidebar-item">Mobile</span>
                            </a>
                        </li>
                        <li class="payments ">
                            <a href="http://web.337.com/en/pay/vip/">
                                <span  class="sidebar-item">Gold Member</span>
                            </a>
                        </li>
                        <li class="payments ">
                            <a href="http://web.337.com/en/pay/center/">
                                <span  class="sidebar-item">Credits</span>
                            </a>
                        </li>
                        <li class="payments ">
                            <a href="http://web.337.com/en/pay/history/">
                                <span  class="sidebar-item">Transaction Records</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>            <div class="main pull-right">
                

<div class="pay_info pay_myself_info">
    <div class="pay_form_tit">
        <h3 class="step1"><i class="step_icon_1"></i>Please select the game information</h3>
    </div>
    <div class="pay_form">
        <div class="pay_form_content">
            <div class="pay_form_input">
                <label>Game Name:</label>
                <span class="pay_form_gamename">
                    <a class="name" id="chooseName" href="javascript:void(0);">Game Name</a>
                    <div class="pay_form_gamelist" style="display:none;">
                        <div class="gamelist_icon">
                            <a class="close" href="javascript:void(0);">x</a>
                            <div class="arrow"></div>
                        </div>
                        <div class="gamelist_nav">
                        </div>
                        <div>
                                                        <div class="pay_form_show_tip"><i class="show_tip"></i>You haven't played any games</div>
                                                    </div>
                    </div>
                </span>
            </div>
            <div class="pay_form_input">
                <label>Choose Server:</label>
                <div class="pay_form_server">
                    <ul class="server_top">
                        <li class="played">Recent server</li>
                    </ul>
                    <div class="server_show">
                        <div class="pay_form_show_tip"><i class="show_tip"></i>Please select the game</div>
                        <ul id="server_list" style="display:none;">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="pay_form_input"  id="role_name_line">
                <label>Game Role：</label>
                <p id="ajax_loading" style="padding:5px 0 12px 0;display:none;">
                    <span class="ajaxLoading" id="setLoading">
                        <img src="http://337.eleximg.com/337/v3static/img/loading.gif?1304030000" alt="ajax loading" />
                    </span>
                    <span>We are trying to get your game info...</span>
                </p>
                <div class="pay_form_role">
                    <ul>
                        <li class="off"><i></i><span id="game_role_name" data="">N/A</span></li>
                    </ul>
                </div>
            </div>
            <div class="pay_form_btn">
                <button class="next1" type="submit" id="next_button" disabled="disabled">Next</button>
            </div>
        </div>
    </div>
</div>

            </div>
        </div>
    </div>
</div>



	<div id="elexFooter">
<div class="inFooter">
<div class="contentCurve"></div>
<div class="copyright">
<span>337.com &copy; 2013</span>
</div>
<div class="navigationGrid">
	<div class="item"><a href="mailto:web+en@337.com">Contact us</a></div>
	<div class="item"><a target="_blank" href="http://web.337.com/en/tos" title="Review our terms and policies.">Terms</a></div>
	<div class="item"><a target="_blank" href="http://web.337.com/en/privacy" title="Learn about your privacy and 337.">Privacy</a></div>
	<div class="item"><a href="javascript:void(0);" class="btn-set-lang" title="Use 337 in another language.">English(US)</a>
    	<div class="new_select_language">
			<div class="arrow"></div>
			<div class="country-dropdown-overlay" style="display: block;"></div>
			<div class="popover">
				<h4>Select Your Language</h4>
				<ul>
					<li class="lang_li"><a lang_id="en_US" lang="en" href="javascript:void(0);"><span class="nation_en nation-flag"></span>English(US)<img src="http://337.eleximg.com/337/v3static/img/account/selected.png"></a></li>
					<li class="lang_li"><a lang_id="es_ES" lang="es" href="javascript:void(0);"><span class="nation_es nation-flag"></span>Español</a></li>
					<li class="lang_li"><a lang_id="pt_BR" lang="pt" href="javascript:void(0);"><span class="nation_pt nation-flag"></span>Português</a></li>
					<li class="lang_li"><a lang_id="tr_TR" lang="tr" href="javascript:void(0);"><span class="nation_tr nation-flag"></span>Türkçe</a></li>
					<li class="lang_li"><a lang_id="pl_PL" lang="pl" href="javascript:void(0);"><span class="nation_pl nation-flag"></span>Polski</a></li>
					<li class="lang_li"><a lang_id="th_TH" lang="th" href="javascript:void(0);"><span class="nation_th nation-flag"></span>ภาษาไทย</a></li>
					<li class="lang_li"><a lang_id="zh_CN" lang="zh" href="javascript:void(0);"><span class="nation_zh nation-flag"></span>中文(简体)</a></li>
					<li class="lang_li"><a lang_id="zh_TW" lang="tw" href="javascript:void(0);"><span class="nation_tw nation-flag"></span>中文(繁體)</a></li>
					<li class="lang_li"><a lang_id="de_DE" lang="de" href="javascript:void(0);"><span class="nation_de nation-flag"></span>Deutsch</a></li>
					<li class="lang_li"><a lang_id="ar_AR" lang="ar" href="javascript:void(0);"><span class="nation_ar nation-flag"></span>‏العربية</a></li>
					<li class="lang_li"><a lang_id="ko_KR" lang="ko" href="javascript:void(0);"><span class="nation_ko nation-flag"></span>‏한국어</a></li>
					<li class="lang_li"><a lang_id="ru_RU" lang="ru" href="javascript:void(0);"><span class="nation_ru nation-flag"></span>Русский</a></li>
				
				</ul>
			</div>
		</div>
	</div>
</div>
</div>
</div>

<!--<div class="country-dropdown-overlay"></div>
		
-->

<!--{/if}-->
<div id="fb-root"></div>

<script src="http://337.eleximg.com/337/v3static/js/jquery.min.js?1304030000"></script>
<script src="http://337.eleximg.com/337/v3static/js/web337.min.js?20130923001"></script>
<script src="http://337.eleximg.com/337/v3static/js/xaauto.js?v=11#100002971262211,en,"></script>

<!--337 initialize-->
<script type="text/javascript">
//
var _menuArrObj = [];
var _functionResizeObj = [];
var _functionScrollObj = [];
var _errArrLog = [];

function headerMenu(obj){
    var me = $(obj).find(':first');
    var menu = me.siblings();
    var over = false;
    var hideTimer = function(){ if (!over) { menu.hide(); me.removeClass('inActive');}};
    $(obj).mouseover(function(){
        var top = $(obj).height() + 1;
        if (!over) { me.addClass('inActive').siblings().css('top',top); menu.show(); }
        over = true;
    });
    $(obj).mouseout(function(){ over = false; setTimeout(hideTimer, 50); });
    menu.mouseover(function(){ over = true; });
    menu.mouseout(function(){ over = false; setTimeout(hideTimer, 50); });
}

//
if($('#hasElexCn') == 0){
    if('en' =="zh" || 'en' =="tw"){
        $('head').append('<link href="http://337.eleximg.com/337/v3static/css/elexCh.css?1304030000" rel="stylesheet" type="text/css" />');
    }
}


//set config
    elex.config.set({
        baseUrl : 'http://web.337.com/en',
        wikiUrl : 'http://web.337.com/en/page',
        newUrl : 'http://web.337.com/en',
        appUrl : 'http://apps.337.com',
        cdnUrl : 'http://337.eleximg.com/337/v3static',
        static_vertion : '{WIKI_STATIC_VERSION}',
        apiUrl : 'http://api.337.com',
        uid : '54829903'
    });

//set language
elex.langs.set({
    //login
    close : 'Close',
    network_connect_fail : 'Failed to Connect. Please try again',
    email_be_used : 'This email has been used. Please change a new one',
    username_or_password_error : 'The username and password do not match.',
    play_now : 'Play Now',
    view_more : 'Show More',
    no_game_history : 'no game history.',
    no_permission : 'You do not have permission to do this operation!',
    upload_picture : 'Upload a photo',
    captchacode_check_error :'Captcha code error, please reenter!',
    select_your_language :'Select Your Language',
    goto_top : 'Back to top'
});

//clear old data
var exp = new Date();
exp.setTime(exp.getTime() - 1000);
document.cookie= "__utma=null;domain={$hl}.337.com;expires="+exp.toGMTString();
document.cookie= "__utmb=null;domain={$hl}.337.com;expires="+exp.toGMTString();
document.cookie= "__utmc=null;domain={$hl}.337.com;expires="+exp.toGMTString();
document.cookie= "__utmz=null;domain={$hl}.337.com;expires="+exp.toGMTString();
//clear error data
if(elex.cookie.get('__utmz') && elex.cookie.get('__utmz').indexOf('.337.com|utmccn=(referral)') >= 0) {
    elex.cookie.remove('__utma');
    elex.cookie.remove('__utmb');
    elex.cookie.remove('__utmc');
    elex.cookie.remove('__utmz');
}


var gamehistorybar_type = 'header_mygame';

//event: only is 'click' or 'over'.
$(document).ready(function(){

    /**************header打点*****************/
    $('.inLogo a').click(function(){
        _gaq.push(['_trackEvent', 'Header', 'Games', '337logo']);
    });
    $('.innav .game a').click(function(){
        _gaq.push(['_trackEvent', 'Header', 'Games', 'flashgame']);
    });
    $('.innav .wiki a').click(function(){
        _gaq.push(['_trackEvent', 'Header', 'Games', 'webgame']);
    });
    $('.innav .latestgames a').click(function(){
        _gaq.push(['_trackEvent', 'Header', 'Games', 'mygame']);
    });
    $('.innav .mygames a').click(function(){
        _gaq.push(['_trackEvent', 'Header', 'Games', 'mylike']);
    });
    /**************header打点 结束*****************/



    //
    window.onresize = function(){
        if(_menuArrObj.length > 0){
            for(menu = 0 ; menu < _menuArrObj.length ; menu++){
                elex.menu.comMenu(_menuArrObj[menu]);
            }
        }
        if(_functionResizeObj.length > 0){
            for(i = 0 ; i < _functionResizeObj.length ; i++){
                eval(_functionResizeObj[i]);
            }
        }
    }

    //
    window.onscroll = function(){
        if(_functionScrollObj.length > 0){
            for(i = 0 ; i < _functionScrollObj.length ; i++){
                eval(_functionScrollObj[i]);
            }
        }
    }

    //用户操作下拉菜单
    headerMenu('#inSelect');

    $(".show_tip_view .close").click(function(){
    	$(".show_tip_view").hide();
    	elex.cookie.set('337_vip_tips', 1);
    });
});


$('#elexFooter .btn-set-lang').click(function(){

	$('.new_select_language').css("opacity",1).show();
	//$('.new_select_language').stop().animate({opacity:1}, "fast").css("display","block");
	
});
$('#elexFooter .country-dropdown-overlay').click(function(){
	$('.new_select_language').stop().animate({opacity:1}, "fast").css('display','none');
});

G_curLang = 'en';

//语言初始化
$('#elexFooter .new_select_language .lang_li a').click(function(){

	var locale = $(this).attr("lang_id"),
		loginKey = elex.cookie.get(elex.config.get('cookieNameUser')),
		toLang = $(this).attr('lang'),
		curLang = G_curLang,
		l = location,
		href = l.href,
		host = l.protocol + '//' + l.host + '/';
	if(toLang == 'br'){
	    toLang = 'pt';
	}else if(toLang == 'us'){
	    toLang = 'en';
	}
	if(toLang == curLang){
		elex.dialog.close('setlang_id');
		return;
	}
	var data = {
	    loginkey : loginKey,
	    language : locale
	};
	var url = 'http://web.337.com/en/user/set_language';
	// alert(toLang);
	elex.request.post(url , data ,function(ret){
	    if(ret.status == "ok"){
	        var target = href;
	        if (href.substr(7, 4) == 'apps' || href.substr(7, 9) == 'test.apps') {}
	        else {
	            if(href.indexOf(host+curLang)==0){
	              //  alert(host+curLang);
	            	target = href.replace(host+curLang,host+toLang);
	            }
	            if(host == href){
	            	target = host + toLang + '/';
	            }
	        }
	        window.location.href = target;
	    }
	});


});

</script>

<script type="text/javascript">
var showLanguageView = function(){
	$("#select-nation").fadeIn();
	$("#header-bg-black").fadeIn();
	
};
	$(document).ready(function(){
		$("#select-nation .close").click(function(){
			$("#select-nation").fadeOut();
			$("#header-bg-black").fadeOut();
		});
		$('#my_view').mouseover(function(e){
			$('#before-login ul').show();
			$('.inMenuCont').css('top','35px');
			$('#login-list .login-list-inner').css('background-color','#07659E');
			
			
		});
		$('#my_view').mouseout(function(e){
			$('#before-login ul').hide();
			$('#login-list .login-list-inner').css('background-color','transparent');
		});
		$("#url_games_337").click(function(){
			XA.init({app:"web337",uid:"100003341665676"});
			XA.action('games_337_click.en');
		});
   });
</script>





<script>
    $('#note_close').click(function(){
        $('#note_box').slideUp();
    });

    $('[id="left_nav"]').find('h4').click(function(){
        $(this).siblings().slideToggle();
    });
</script>

<script type="text/javascript">
    var click_flag = false;
    var gkey = '';
    var serverkey = '';
    var role_id = '';
    $(document).ready(function(){
        $(".pull-left .navigation li").click(function(){
            $(this).addClass("selected").siblings().removeClass("selected");
        });

        $('#chooseName').click(function(){
            $('.pay_form_gamelist').toggle();
        });
        $('.gamelist_icon .close').click(function(){
            $('.pay_form_gamelist').hide();
        });
        $('.pay_menu li').click(function(){
            $(this).addClass('inActive').siblings().removeClass('inActive');
        });
        $('.pay_menu li').eq(0).click(function(){
            $('.pay_myself_info').show();
            $('.pay_help_info').hide();
            $('.pay_form_btn').show();
            $('.pay_form_others').hide();
        });

        $('.server_top li').click(function(){
            $(this).addClass('on').siblings().removeClass('on');
        });
        $('.gamelist_nav li').click(function(){
            $(this).addClass('on').siblings().removeClass('on');
            var index = $(this).index();
            $('.gamelist_show').eq(index).show().siblings().hide();
        });
        $('.gamelist_show li').click(function(){
            click_flag = false;
            //隐藏列表框
			$('.pay_form_role').html('<ul><li class="off"><i></i><span id="game_role_name" data="">N/A</span></li></ul>');
            $('.pay_form_btn .next1').removeClass('next_ok');
            $('.next1').attr('disabled','disabled');
            $('.pay_form_gamelist').hide();
            //改变游戏名称
            $('#chooseName').html($(this).html());
            gkey = $(this).attr('gkey');
            var tmp_server = eval('(' + $(this).attr('serverList') + ')');
            var iHtml = '';
            for(var i=0; i<tmp_server.length; i++)
            {
                if(parseInt(tmp_server[i].is_fb) == 1)
                {
                    iHtml += '<li class="fb" ><a href="javascript:void(0);" serverKey="'+ tmp_server[i].server_id +'">' + tmp_server[i].server_name + '</a></li>'
                }
                else
                {
                    iHtml += '<li ><a href="javascript:void(0);" serverKey="'+ tmp_server[i].server_id +'">' + tmp_server[i].server_name + '</a></li>'
                }
            }
            //生成html
            $('.pay_form_show_tip').hide();
            $('#server_list').html(iHtml).show();
            //服点击事件
            $('.server_show li a').click(function(){
                click_flag = true;

                $('.pay_form_role').html('<ul>N/A</ul>');
                $('.pay_form_btn .next1').removeClass('next_ok');
                $('.next1').attr('disabled','disabled');
                serverkey = $(this).attr('serverkey');
                $(this).addClass('selected').parent().siblings().children().removeClass('selected');
                $('.pay_form_role').show();
                var url = 'http://web.337.com/en/pay/getGameUserInfo';
                var params = {serverKey:serverkey};
                if(serverkey.indexOf('xlfc') >=0 || serverkey.indexOf('ddt') >=0 || serverkey.indexOf('btqz') >=0){

                    $('.pay_form_role').hide();
                    $('#ajax_loading').show();
                    elex.request.post(url,params,function(res){
	                    var clickUserFlag = true;
	                    var userHtml = '<ul>';
	                    if(res['role_name'] != undefined){
	                    	userHtml += '<li class="off"><i></i><span id="game_role_name" data="'+res['role_id']+'">'+res['role_name']+'</span></li>';
	                    }else if(res[0] != undefined && res[0]['role_name'] != undefined){
	                    	for(var i=0; i<res.length; i++)
	                        {
	                    		userHtml += '<li class="off"><i></i><span id="game_role_name" data="'+res[i]['role_id']+'">'+res[i]['role_name']+'</span></li>';
	                        }
	                    }else{
	                    	clickUserFlag = false;
	                    	userHtml += '<li class="off"><i></i><span id="game_role_name" data="">N/A</span></li>';
	                    }
	                    userHtml += '</ul>';
	                    $('.pay_form_role').html(userHtml);
	                    $('.pay_form_role #game_role_name').click(function(){
	                        if(clickUserFlag){
	                        	$(this).parent().removeClass('off').siblings().addClass('off');
		                        role_id = $(this).attr('data');
		                        if(role_id == 'undefined'){
		                        	role_id = '';
		                        }
		                        $('.pay_form_btn .next1').addClass('next_ok');
		                        $('.next1').removeAttr('disabled');
	                        }
	                    });
	                    if(clickUserFlag){
	                    	$('.pay_form_role #game_role_name').eq(0).click();
	                    }
		                $('#ajax_loading').hide();
		                $('.pay_form_role').show();
	                })
                }else{
                	role_id = '';
                	$('.pay_form_role').html('<ul><li class="off"><i></i><span id="game_role_name" data="">N/A</span></li></ul>');
                	$('.pay_form_btn .next1').addClass('next_ok');
                    $('.next1').removeAttr('disabled');
                }
            });
        });
        $('.gamelist_show li.active').click();
        $('#next_button').click(function(){
            var redirect_url = 'http://web.337.com/en/pay/gamepkg?gKey='+gkey+'&serverKey='+serverkey+'&role_id='+role_id;
            window.location.href = redirect_url;
        })
    });

</script>

</body>
</html>