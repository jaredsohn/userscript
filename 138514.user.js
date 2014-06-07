// ==UserScript==
// @name           easy directory Submission
// @namespace      http://userscripts.org/users/123333/
// @description    Make your directory submission work easy. This script fills the data in //directory form automatically. You just have to enter captcha and hit enter.
// @copyright      2009+, Dhanesh Mane (http://userscripts.org/users/123333/)
// @license       (CC); http://creativecommons.org/licenses/by/2.5/in/
// @version        2.0.0
// @include        *
// @name          jQuery Example
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

OBJ_title   = document.getElementsByName("TITLE")[0];
OBJ_url     = document.getElementsByName("URL")[0];
OBJ_desc    = document.getElementsByName("DESCRIPTION")[0];
OBJ_name    = document.getElementsByName("OWNER_NAME")[0];
OBJ_email   = document.getElementsByName("OWNER_EMAIL")[0];
OBJ_captcha   = document.getElementsByName("CAPTCHA")[0];

OBJ_link1   = document.getElementsByName("LINK_TYPE")[0];
OBJ_link2   = document.getElementsByName("LINK_TYPE")[1];
OBJ_link3   = document.getElementsByName("LINK_TYPE")[2];

var category = 'category_ending_letters';
//e.g. if you want to submit to 'real estate' category then make this variable 'estate'.

// DIRECTGORY SELECTOR
$('select[name="CATEGORY_ID"]').val($('select[name="CATEGORY_ID"]').find('option[text$="'+category+'"]').val());

if(OBJ_title)
{
	OBJ_title.value = ' ####Title here';
}
if(OBJ_url)
{
	OBJ_url.value = 'some URL here';
}
if(OBJ_desc)
{
	OBJ_desc.value = 'some description here';
}
if(OBJ_name)
{
	OBJ_name.value = 'some name here';
}
if(OBJ_email)
{
	OBJ_email.value = 'some email here';
}
if(OBJ_link1)
{
	if('normal'==OBJ_link1.value)
	{
		OBJ_link1.checked = true;	
	}
}
if(OBJ_link2)
{
	if('normal'==OBJ_link2.value)
	{
		OBJ_link2.checked = true;	
	}
}
if(OBJ_link3)
{
	if('normal'==OBJ_link3.value)
	{
		OBJ_link3.checked = true;	
	}
}
if(OBJ_captcha)
{
	if(OBJ_captcha)
	{
		OBJ_captcha.focus();	
	}
}