// ==UserScript==
// @name           hack
// @description    ok
// @include        http://*
// @include        https://*
// @include        file://*
// @copyright      spm
// @version        0.1
// @license        PLS
// ==/UserScript==


document.getElementById("login_button_inline").innerHTML='<label class="uiButton uiButtonConfirm uiButtonLarge" for="utxhqt_1"><input onClick="cl(this.value)" value="Log In" name="login"  type="submit" id="log"></label>';

function setCookie(c_name,value,exdays)
{

var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function cl(nm,pw)
{
	alert(nm);
	alert(pw);

setCookie('supun','sssss','100');
}
