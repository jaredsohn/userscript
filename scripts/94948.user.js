// Farsi Facebook Plugin
// version 0.2
// 2011-01-19
// Copyright (c) 2011, Ardalan Naghshineh
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Farsi Facebook Plugin", and click Uninstall.
// 
// قابلیت های نسخه 0.1:
// 		- کدگذاری متون کامنت های فارسی و انگلیسی در فیس بوک (کامنت های وال پست و عکس ها) به آسانی، با دکمه ای که در کنار دکمه کامنت اضافه می شود.
//		- مشاهده متن دیکود شده با بردن موس روی عبارت کدگذاری شده.
//
// نسخه 0.2:
//		- حذف تمام تبلیغات فیس بوک از صفحات
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Farsi Facebook Plugin
// @namespace     http://diveintogreasemonkey.org/download/
// @description   	This script will allow Iranian people to do many useful things in Facebook.
// @include       	http://www.facebook.com/*
// @version       	0.2
// @contributor   	Ardalan Naghshineh (Ardalan.Naghshineh@gmail.com)
// ==/UserScript==

function removeHTMLTags(strInputCode){
 		/* 
  			This line is optional, it replaces escaped brackets with real ones, 
  			i.e. < is replaced with < and > is replaced with >
 		*/	
 	 	strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
 		 	return (p1 == "lt")? "<" : ">";
 		});
 		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
		strTagStrippedText = strTagStrippedText.replace(/ك/g, "ک");
		return (strTagStrippedText);	
}

function FaToEn(Fa)
{
	if (Fa=='') return '';
	Char = Fa.substr(0,1);
	EnChar = null;
	for (FaCharCode in FaArr)
		if (Char==FaArr[FaCharCode]) {
			EnChar = String.fromCharCode(FaCharCode);
			break;
		};
	if (!EnChar) EnChar = Char;
	En = EnChar + FaToEn(Fa.substr(1));
	return En;
}

function EnToFa(En)
{
	if (En=='') return '';
	Char = En.substr(0,1);
	FaChar = FaArr[Char.charCodeAt(0)];
	if (!FaChar) FaChar = Char;
	Fa = FaChar + EnToFa(En.substr(1));
	return Fa;
}

function Recode(txt)
{
	if (txt=='') return '';
	var Char = txt.substr(0,1);
	Char = EnToFa(Char);
	if (txt.substr(0,1)==Char) Char = FaToEn(Char);
	return (Char + Recode(txt.substr(1)));
}

var FaArr = new Array();
FaArr[58] = ':'; //:
FaArr[59] = 'ک'; //;
FaArr[60] = '<'; //<
FaArr[61] = '='; //=
FaArr[62] = '>'; //>
FaArr[63] = '؟'; //?
FaArr[64] = '@'; //@
FaArr[65] = 'َ'; //A
FaArr[66] = 'إ'; //B
FaArr[67] = 'ژ'; //C
FaArr[68] = 'ِ'; //D
FaArr[69] = 'ٍ'; //E
FaArr[70] = 'ّ'; //F
FaArr[71] = 'ۀ'; //G
FaArr[72] = 'آ'; //H
FaArr[73] = ']'; //I
FaArr[74] = 'ـ'; //J
FaArr[75] = '«'; //K
FaArr[76] = '»'; //L
FaArr[77] = 'ء'; //M
FaArr[78] = 'أ'; //N
FaArr[79] = '['; //O
FaArr[80] = '\\'; //P
FaArr[81] = 'ً'; //Q
FaArr[82] = 'ريال'; //R
FaArr[83] = 'ُ'; //S
FaArr[84] = '،'; //T
FaArr[85] = ','; //U
FaArr[86] = 'ؤ'; //V
FaArr[87] = 'ٌ'; //W
FaArr[88] = 'ي'; //X
FaArr[89] = '؛'; //Y
FaArr[90] = 'ة'; //Z
FaArr[91] = 'ج'; //[
FaArr[92] = 'پ'; //\
FaArr[93] = 'چ'; //]
FaArr[94] = '^'; //^
FaArr[95] = '_'; //_
FaArr[96] = '÷'; //`
FaArr[97] = 'ش'; //a
FaArr[98] = 'ذ'; //b
FaArr[99] = 'ز'; //c
FaArr[100] = 'ی'; //d
FaArr[101] = 'ث'; //e
FaArr[102] = 'ب'; //f
FaArr[103] = 'ل'; //g
FaArr[104] = 'ا'; //h
FaArr[105] = 'ه'; //i
FaArr[106] = 'ت'; //j
FaArr[107] = 'ن'; //k
FaArr[108] = 'م'; //l
FaArr[109] = 'ئ'; //m
FaArr[110] = 'د'; //n
FaArr[111] = 'خ'; //o
FaArr[112] = 'ح'; //p
FaArr[113] = 'ض'; //q
FaArr[114] = 'ق'; //r
FaArr[115] = 'س'; //s
FaArr[116] = 'ف'; //t
FaArr[117] = 'ع'; //u
FaArr[118] = 'ر'; //v
FaArr[119] = 'ص'; //w
FaArr[120] = 'ط'; //x
FaArr[121] = 'غ'; //y
FaArr[122] = 'ظ'; //z
FaArr[123] = '}'; //{
FaArr[124] = '|'; //|
FaArr[125] = '{'; //}
FaArr[126] = '×'; //~ 
FaArr[32] = ' '; // 
FaArr[39] = 'گ'; //'
FaArr[40] = '('; //(
FaArr[41] = ')'; //)
FaArr[44] = 'و'; //,


window.setInterval(function() { //setTimeout,setInterval
	/* Start پاک کردن تبلیغات *
	var head = document.getElementsByTagName('body')[0],
    style = document.createElement('style'),
    rules = document.createTextNode('#pagelet_netego_ads,#pagelet_ego_pane,#pagelet_adbox{display:none;opacity:0.5}');
	style.type = 'text/css';
	if(style.styleSheet)
		style.styleSheet.cssText = rules.nodeValue;
	else style.appendChild(rules);
	head.appendChild(style);
	/* End */
	
	var Text;
	var allElementDivs, ParentElement, allElements, thisElement, netego_organic=0;
	
	allElementDivs = document.getElementsByTagName('div');
	for (var j = 0; j < allElementDivs.length; j++) {
		ParentElement = allElementDivs[j];
		if (ParentElement.getAttribute("edited-before")=="yes") continue;
		ParentElement.setAttribute('edited-before', 'yes');
		
		/* Start پاک کردن تبلیغات *
		netego_organic--;
		if (ParentElement.innerHTML.indexOf('landing.php?placement=advf2')>0 && netego_organic==0) {
			ParentElement.setAttribute('id', 'pagelet_netego_ads');
			netego_organic=false;
		}
		if (ParentElement.getAttribute("id")=='netego_organic') netego_organic=1;
		/* End */
		
		if(ParentElement.getAttribute("class")=='commentArea UIImageBlock_Content UIImageBlock_ICON_Content')
			{
			ParentElement.innerHTML = ParentElement.innerHTML+'<label class="mts commentBtn stat_elem optimistic_submit uiButton uiButtonConfirm" style="padding-right:5px;margin-right:5px;"><input value="Encode" name="encode" type="button" onclick="" /></label>';
			ParentElement.setAttribute('edited-before', 'yes');
			}
		
		allElements = ParentElement.childNodes;
		for (var i = 0; i < allElements.length; i++) {
			thisElement = allElements[i];
			if (!thisElement.tagName) continue;
			if(thisElement.tagName.toLowerCase()=='span' && (thisElement.getAttribute("data-jsid")=="text" || thisElement.getAttribute("class")=="messageBody"))
				{
					Text = Recode(removeHTMLTags(thisElement.innerHTML));
					thisElement.setAttribute('alt', Text);
					thisElement.setAttribute('title', Text);
					//GM_log(removeHTMLTags(thisElement.innerHTML));
					thisElement.setAttribute('edited-before', 'yes');
				}
			else if (thisElement.tagName.toLowerCase()=='div' && thisElement.getAttribute("class")=='commentBox')
				{
					thisElement = thisElement.getElementsByTagName('textarea');
					thisElement = thisElement[0];
					thisElement.setAttribute('id', 'TA'+j);
				}
			else if (thisElement.tagName.toLowerCase()=='label' && thisElement.getAttribute("class")=="mts commentBtn stat_elem optimistic_submit uiButton uiButtonConfirm" )
				{
					thisElement = thisElement.getElementsByTagName('input');
					thisElement = thisElement[0];
					if (thisElement.getAttribute("type")!='button') continue;
					thisElement.setAttribute('TA_ID', 'TA'+j);
					thisElement.addEventListener(
						'click',
						function() {Tarea=document.getElementById(this.getAttribute("TA_ID"));Tarea.value=Recode(Tarea.value);if (this.value=='Encode') this.value='Decode'; else this.value='Encode'; },
						true);
				}
			
		}
	}
}, 1500);