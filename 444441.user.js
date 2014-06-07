// ==UserScript==
// @name       IMOS Style
// @namespace  http://spencerlarry.com/
// @version    0.1
// @description
// @match      https://imos.ldschurch.org/*
// @exclude    https://imos.ldschurch.org/help/*
// @copyright  2014+, spencerlarry.com
// ==/UserScript==


GM_addStyle ( "\
	#navigation ul li a:hover { color: black; background: -webkit-linear-gradient(top, #FFFFFF, #F5F5F5);}\
    #hd .utility-links a:link{text-decoration:none;font-size:13px;}\
	div#doc2{background:white;}\
    #hd .utility-links .divider{padding:0 1px;}\
	#navigation ul li a {\
		background: -webkit-linear-gradient(top, #F4F4F4, #E7E7E7);\
		font-size:16px;\
		text-decoration: none;\
		color: #585858;\
		padding: 3px 0 3px 8px;\
        margin: 0 0 0 5px;\
        display: block;\
        border-bottom: 0px solid #DFE4EF;\
        width: 160px;\
		margin-top:5px;\
        border-style: solid;\
        border-width: 1px;\
        border-color: #C4C4C4;\
        text-align: left;\
		font-family: 'Calibri', sans-serif;\
		border-radius:3px;\
" );
//background:#394D6F;
document.getElementById("hd-content").style.cssText = "background-color:;margin-top:-15px;height:90px;width: 1056px;margin-left: -16px;";
document.getElementsByClassName('site-identification')[0].style.cssText = "background-image: url(https://imos.ldschurch.org/help/en/office/images/imoslogo.png);height: 30px;background-position-y: -7px;background-position-x: 7px;;width: 310px;";
document.getElementById("site-title-en").style.cssText = "color: white;font-family: Calibri;font-size: 32px;margin-left: -55px;margin-bottom: -20px;margin-top: 20px;padding: 2px;position: absolute;";
document.getElementById('site-title-en').innerHTML="Mexico City Northwest Mission";
document.getElementById("hd").style.cssText = "border:;";
document.getElementById('logoutForm:signOutLink').style.cssText = "background: -webkit-linear-gradient(top, #FFFFFF, #F5F5F5);color:black;padding-left:3px;padding-right:3px;text-decoration:none;color:#585858;border-style: solid;border-width:1px; border-color:#C4C4C4;border-radius:3px;font-size:14px;margin-left:-5px;margin-right:-4px;";
document.getElementById('user-name').style.cssText = "font-family: 'Calibri light'; font-size:14px;padding-left:0px;";
document.getElementById("hd-menu-options").style.cssText="text-decoration:none;font-size:12px;";
document.getElementsByClassName('utility-links')[0].style.cssText = "padding-left:0px;box-shadow: 0px 1px #7D7D7D;border-radius: 6px;background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#6F6F6F), color-stop(100%,#555555));border:1px solid rgb(29, 49, 49);padding: 5px;";
document.getElementById('hd').style.cssText="background:transparent;border-top:0px;text-decoration:none;border-left:0px;border-right:0px;padding-top:15px;";
document.getElementsByClassName('divider')[0].style.opacity="0";
document.getElementsByClassName('divider')[1].style.opacity="0";
document.getElementsByClassName('divider')[2].style.opacity="0";
document.getElementsByClassName('divider')[3].style.opacity="0";
document.getElementsByClassName('divider')[4].style.opacity="0";

