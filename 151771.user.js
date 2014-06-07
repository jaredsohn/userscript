// ==UserScript==
// @name        test
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace   test
// @description test
// @include     http*://signup.live.com/signup.aspx*
// @version     1.1
// ==/UserScript==
var now = new Date();


$("#iFirstName").val('a');
$("#iLastName").val('a');
$("#iBirthDay")[0].selectedIndex = 1;
$("#iBirthMonth")[0].selectedIndex = 1;
$("#iBirthYear")[0].selectedIndex = 20;
$("#iGender")[0].selectedIndex = 1;
$("#imembernamelive").val(now.getSeconds()+"a"+now.getMinutes());
$("#iPwd").val('sdct7799');
$("#iRetypePwd").val('sdct7799');
$("#iSMSCountry")[0].selectedIndex = 52;
$("#iAltEmail").val('abc@gmail.com');
$("#iqsaswitch").click();
$("#iSQ")[0].selectedIndex = 1;
$("#iSA").val('abcde');
$("#iCountry").val("HK").change();
$(".spHipNoClear.hipInputText").focus();
//$("#iCountry").trigger('change');
//$("#iCountry")[0].selectedIndex = 97;


//document.getElementsByClassName('gbts')[0].click();

//document.getElementsByClassName('gsfi').textContent('jjjjjjj');