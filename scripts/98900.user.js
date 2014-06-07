// ==UserScript==
// @name PLAY Captcha Helper
// @author 
// @include *google.com/recaptcha/api/noscript?k=*
// @version 1.0
// ==/UserScript==



var challengeIDs = new Array();
var answers = new Array();

	// PASTE CAPTCHAS BELOW

challengeIDs[0]="03AHJ_VuslJ3n88tA8D4pakaQ7dQHYktSMpaPT92DGVyMknzCNcE9NypPC-vBNgeXGPhD_4FUIr98ykQq74oO81DSrAs9IpzSV2q1O4uCugBr-H2ZI5-YS691Rn0g-lRofKWfnhLRXHISgdsSP44ySd45CH3W2_z9zzg"; answers[0]="currents feseldel"; challengeIDs[1]="03AHJ_Vusj4pxuqAyF-FOWgyCQ00f7B8oAQ6-mdTH7BEL5cELU7TnfsHVRmH62XJW0hpfSnkVPStMwRJw5rYVNydoGvyGT7z0mDrCzkAtrdmwnN6RTbx0GjgDfpo_7iL20HKTIcKTk1HH66zKyclPMevvWMaHblVaTnA"; answers[1]="and scales"; challengeIDs[2]="03AHJ_VusJ29D9AKEcJUASZAl28-3qJIU_Mc2bbxsFdTQCqA5ShRLZCVCNPBvE9uTaVkd-ZIEK3NfTsBItwBI4DnPY3EDc08aLkXjIF5ZJ-aEUJVHgFOyq9gVenSLC2DM8HAB8lMerLiETFdt6NAGEXMn_9mRyGIEWOg"; answers[2]="gurgel 1537"; challengeIDs[3]="03AHJ_Vuv6wrN_7-z53q4lAE-zM6FeGfF83WRNXNY1IifnDhNGWFqo8-nB4UXoOtxEBeDWZASevkR_nIGefhOBsTCWwpcixCmFwqSAEJWWNgYgSXyH9ia9KTaoV6CRXoFJHuBE6ZZBcybYZ6-rFUEceG5x3C_Qy8w3Tg"; answers[9]="pateager ifugao"; challengeIDs[10]="03AHJ_VutxAybUnjNW0uY_UHjrW_M7NX4tjMn1eeh9tAF_yQWBmTsFVPF8ILjJiRJITjNmR37-ERlq-5P8a1oyxeQX7kY5Amq604Qcc2RpnRMAX5s9dBMBvFLWJK5JQIqQJhu-ypg5fXiFrHwg03Hxo7Y7ONsDKjK5ZQ"; answers[10]="appear doculing"; challengeIDs[11]="03AHJ_VuveKOG8L3XXICybwQ6BH6KRbK2dvCHE6uNG7haokuDDudARajHKvb2FmEL6LESIHGMZOp-5jvNYIiy9bsyqOKfgaYBhJRM_x0pDqT6R5IK0qXpCu-qRrgCu99IjB_3draQ4j2hYKGdMc3B1mSFF6xLD0L9JDg"; answers[11]="belguzed loka"; challengeIDs[12]="03AHJ_VuuH15hPI8fnPfMMGRISjEP6Q43HwBwfY0q3NGY7jTpM8MkfYgtiucNsvZjpEK4lhCQVjeOwlwkSNN8rVN_xeDAyo37-KdsrOb7vEb1iWCnVUyKnVkiovV5kpGWHgSM579AfGUtimXLsB7kMi2ZJ2r6Qz-BHfw"; answers[12]="farse illca"; challengeIDs[13]="03AHJ_VuuCK-pCzo5V1kYOaNFKH9dLSQv6tUx1lntMzokUxf6_qXWtvdqiBqeO0lXGBKehzrM6N99BwfNrsbfYUx62SSjfVP7qvtEmq9hMBBcVk0huN2tDf07U3F1IINCIRq16HTbl29flx8E_ZTsFlPi-PQ4YdnEngg"; answers[13]="flew annette "; challengeIDs[14]="03AHJ_Vut69xXJGJx1BO6sPrBeBZrDcFLnmgNdfuMqoixM1FkIytDUT7qGG_izRYOhiLvfezw_qEJRKWd0wvMXT-Cw3wcCX6n67FaatoSDzeyYxHlrlZvwfke6UbCuZ1w2TVm12nQgPU9hh2wSHN0jWOrYx9kjYdDRvg"; answers[14]="howpon hudson"; challengeIDs[15]="03AHJ_VusX9spTWXzuMPlENOzSZi8T0m8NCnsHke72nyFXV-v2_d6Uwm2ibTBKCVGB089RU9ZjgyKugyQAjrcSCweJVMR9z806e58DXWY8zQfyFumxL3kOFHUWxlJ0EkuFFApR3UJyiNbAuQeKsO9IlkijsY48kuMjPw"; answers[15]="mitiona kerekou"; challengeIDs[16]="03AHJ_VutyNEg40TuM9lSx-ibfMw8AU3pL3i0asUU2mUKPEhphMk8PIN8Sf3HbR9FL6EvoBkfQFko7toRyYqHoGb-TZ2A8bDD7SqcCofHcit5f6nHlxKdoXnfuq4uYoL3N6_IxQeQ8l67HCZE5FKHoQSG3AsJWwSx7_w"; answers[16]="general cominime"; challengeIDs[17]="03AHJ_VutAx6J4zS5JFoV6eEaU395amCuZQuCIpM3h0CnIFp8hlHUo-l20ncF_U2q_ABtWkUK8AlJR58z9lzWBRuTWjp5cLLp6HczjZnnluN15GNpU46PqnCoJN1w7O0c7e2KFDVITHt3-wSLRuZJCVOqEbihK2094GA"; answers[17]="own maritra"; challengeIDs[18]="03AHJ_VusQU2TnltPiAWBFhcFYMiZhowsNjHDpTxrdJmBMNoE4zy2a1kKgBk-EYIju8_mQJD-6oe5xoCjLVFTVjlNMMDEwLbF9JZYnZmIBZNCGe_19q4AboAI3f_I3Pp4WrCvYzkx7AAinagawxfTaKlVSx6bZ8a5Ufg"; answers[18]="rpk froark"; challengeIDs[19]="03AHJ_Vut1OyevCZnxPAxIdIyqfL5w3o7KCmhiZU_vkwepB680KdyUtQnGSyXtHmCpXm9Fcy7rzrfK_4CDvtJAVHhSZtpEabbU_4LX901pTOb8-S7O9yfKOXZzsUuw-gPB8-DOU7yPjf8xH5AMPc9QVXwwB8fAFhPRRw"; answers[19]="gone raminiul"; challengeIDs[20]="03AHJ_Vut6ACe4_B8DcsdGbRxiUpJyTzTLGyVWfh1NA13q8S3ra2xmQiEc4h_gwMr9yvqtxmcctbQc-lpdezs7dHgLU7mU6svBGCCZr1W7ESQBzl0YEk4JeJ_1B8Lb_Hx49aBGm3N9AlXXoFSejE44YwfitZvHsHCasQ"; answers[20]="stern nogres"; challengeIDs[21]="03AHJ_VusD9CzTF3UNWNufwQp25dqbGaELJaMmnsX3oC3mUuSZPdAUP86GOiqPYWfmyheys_wdhIiXYVPX9Y0uSmqObclgFIoAdRnYJchallengeIDs[22]="03AHJ_VutwpzT6qzwcJH3uvxqZcHX1az8eA2uIrDzENzIUqyOTnnE7H3XHlXkcsVP2hDPCmRrby33ADSXZO5V9XKe1sZJlVROpb0WE3DxNHcaDwWZK385XPiNgxL1IKBxL706EImVYEa4gxYyflNL0ePLwXXJpD3bcqg"; answers[22]="bergen isfiers"; challengeIDs[23]="03AHJ_VusEnqMu7wwbnLay99CaUMBu1rBVQ3dKDWS0e87owNbjasxx2cMDby3HBKfq0cvEg6IEWc0UG4HRLsn5-h-AGdQ66I3LI3reXji-rfASa78Z5uQB3h6p0ML4xOr5C-MIiNvEETb1O2E0psh3-sEnbYRwKAeO6g"; answers[23]="havolin"; challengeIDs[24]="03AHJ_VutnWTHyTXxmgQzv9bpNNVQLgaNm6pWSuTSbpri4zTfjWWEGZRXClPaSiI-CqhRAMY8YCNgDeWJKgLLYrKd2tkb7RhiP0uBAtbGqcGQiDCmlzPDiJ_nZ_Hx-6Fnbc7wDIXxzsrK4yv7KviEsLQRaU6GNw952_Q"; answers[24]="Bindesc xxvia"; challengeIDs[25]="03AHJ_VuuIVzJSb1FPqswHQ7VGynbOXbA0cLdB3mSa5cIk66zEAa32OJ12lD5tcW2wyUdbyl_VVqSi2GwXKIpYDowUdQn4_OP0oM4GIdXfszI14oqqtqw_ioxdgD8VmAeeefupb_FJY4lPNg6kE-VVcjpCPuWX1sDgeQ"; answers[25]="actual maticky"; challengeIDs[26]="03AHJ_VuuCFzEUr-8GiW_kT9Bcn-C0AcdV9QXYWCw4l27K5pPI_IU_4qIQ_p0aK7NaS8wqsF00ebXCsxidwdORTbaJVKmjOkHUvx-Nk4v0uKGtHRhxyAxlk-B8DtGYImMJDKGVJKrFQitBdjtucPxw1NsWFv5sMRP7Uw"; answers[26]="qadpin malizu";

/*

INSTRUCTIONS: 

unter" button and repeat steps 2-7.

Enjoy! ;-)


NOTE: CAPTCHAS ARE VALID UP TO 5 HOURS
IF YOU HAVE PROBLEMS VIEWING CAPTCHAS (http://www.google.com/recaptcha/api/noscript?k=6LffAwwAAAAAAHYaV40t4RX1Ngqv2ip1X84SlMQO) ON CHROME
TRY INSTALLING SCRIPT IN FIREFOX AND GENERATE CAPTCHA LIST THERE AND THEM FOLLOW OTHER STEPS NORMALLY
IF CAPTCHAS ARE FILLED BUT U GET NO PTZ THEN CLEAR YOUR CACHE AND COOKIES

























*/








function KeyCheck(i)
{

	if (i.keyCode == 96)
	{
		localStorage.clear();
		alert("Done");
	}
}
window.addEventListener('keydown', KeyCheck, true);
// Lockerz part



















 var cssStyles = '.p1 {padding: 5px 3px;} .clearBtn {border: 3px solid #e8630b; background: #f68941; }';
 cssStyles += '#helperBox {border: 4px solid #e8630b; padding: 12px 3px; background: #f68941; position: fixed; right 0px; top: 0%; float:right; height: 54px; width: 235px; font-size: 17px; font-family: fantasy; text-align: center; }';

 addGlobalStyle(cssStyles);
 



var captchaCount = answers.length;


if (localStorage.getItem('visited') == null)
{
	localStorage.setItem('captchaID', 0);
}


document.getElementById('video-contentContainer').innerHTML += "<div id='helperBox'>PLAY CAPTCHA HELPER<p class='p1'><form action='https://www.paypal.com/cgi-bin/webscr' method='post'><input type='hidden' name='cmd' value='_s-xclick'> <input type='hidden' name='hosted_button_id' value='86GXX49D2FP3G'><input type='image' src='https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif' border='0' name='submit'></form></p></div>";
document.getElementById('content-video-title').innerHTML += " - [USING CAPTCHA: " + (parseInt(localStorage.getItem('captchaID')) + 1) + " / " + captchaCount + "] <button id='clearStorage' class='clearBtn' onclick='localStorage.setItem(\"captchaID\", 0); alert(\"Done\");'>Reset Captcha Counter</button>";
localStorage.setItem('visited', true);
window.setInterval(checkforcaptcha, 7500);




































//=====================================================================
//=====================================================================
//=====================WHAT ARE YOU LOOKING FOR?=======================
//=====================================================================
//=====================================================================
else if (document.getElementById('recaptcha_challenge_field')){
    
    
var cssStylesG = "p,.recaptcha_input_area, input, a { display: none; }";
addGlobalStyle(cssStylesG);
    
    
    
