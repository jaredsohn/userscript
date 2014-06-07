// ==UserScript==
// @name           Privat24Login
// @namespace      all
// @include        https://privat24.pbank.com.ua/p24/login*
// @include        https://privat24.pbank.com.ua/p24/otp_enter*
// ==/UserScript==

var tables = document.forms[0].getElementsByTagName('table');
var referer = gup('go');

if (document.forms[0].action == 'https://privat24.pbank.com.ua/p24/login') {
	document.forms[0].action = 'https://privat24.pbank.com.ua/p24/otp_enter';
	if (referer!='')
		document.forms[0].action+= '?go='+referer;
	var tr = tables[0].rows.length;
	var newRow = tables[0].insertRow(tr);

	newRow.innerHTML = '<td height="23">      <div class="p24login-greentitle">Введите номер Вашего мобильного телефона в международном формате (например +38092XXXXXXX)</div></td><td width="100%">          <input name="NewUserNameAsPhone" value="+НОМЕР ТЕЛЕФОНА" minlength="13" style="border: 1px solid rgb(180, 180, 180); width: 150px; height: 19px; background-color: rgb(255, 255, 255); font-family: \'Lucida Grande\',Geneva,Tahoma,Verdana,Arial,sans-serif; font-style: normal; font-variant: normal; font-weight: normal; font-size: 11px; line-height: normal; font-size-adjust: none; font-stretch: normal; color: rgb(85, 85, 85);" type="text"></td><td><input width="29" type="image" height="17" border="0" title="Войти" alt="Войти" onclick="this.form.submit();" src="img/p24login-submit.gif"/></td>';

}

if (document.forms[0].action == 'https://privat24.pbank.com.ua/p24/news') {
	if (referer=='')
		document.forms[0].action = 'https://privat24.pbank.com.ua/p24/rest';
	else
		document.forms[0].action = urldecode(referer);
}

elem = document.forms[0].getElementsByTagName('input');
if (elem.length>0)
	elem[0].focus();

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function urldecode( str ) {
   var ret = str;
    ret = ret.replace(/\+/g, '%20');
    ret = decodeURIComponent(ret);
    ret = ret.toString();
    return ret;
}
