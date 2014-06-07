// ==UserScript==
// @name           GN font size control hack
// @namespace      http://news.yahoo.com/
// @include        *news.yahoo.com/*
// @description    Add a font size controller to article page that can enable you controlling the font-size of 5 levels
// @require http://userscript-updater-generator.appspot.com/?id=116416
/* @reason
Updated the font-size control button style and indicator for CN, EN and KR
@end */
// ==/UserScript==

if(document.getElementsByClassName('yom-art-hd')[0]) //execut if existing art header
{

function adjContentStyle(node, curStyle, newStyle)
{

removeClass(node, curStyle)
addClass(node, newStyle);

}


function enlarge_fontsize()
{
    

    var cur_font_size = fontsize_settings[current_fontsize_setting];
    var new_font_size = fontsize_settings[current_fontsize_setting+1];
    var node = document.getElementsByClassName('yom-art-content');


if(current_fontsize_setting<5 && node[0])
    {

adjContentStyle(node[0],cur_font_size, new_font_size);
current_fontsize_setting++;
}


adjButtonState();
GM_setValue('GMFontSizeSetting',current_fontsize_setting);
  
}


function reduce_fontsize()
{

    var cur_font_size = fontsize_settings[current_fontsize_setting];
    var new_font_size = fontsize_settings[current_fontsize_setting-1];
    var node = document.getElementsByClassName('yom-art-content');


if(current_fontsize_setting>1 && node[0])
    {
adjContentStyle(node[0],cur_font_size, new_font_size);
current_fontsize_setting--;
}

adjButtonState();
GM_setValue('GMFontSizeSetting',current_fontsize_setting);

}


function adjButtonState()
{
    
    var reduce_button = document.getElementsByClassName('reduce-font-size-button');
    var enlarge_button = document.getElementsByClassName('enlarge-font-size-button');
    var disabled='disabled';

if(current_fontsize_setting==1 && reduce_button[0])
{
    addClass(reduce_button[0], disabled);
} else
{
    removeClass(reduce_button[0], disabled);
} 

if(current_fontsize_setting==5 && enlarge_button[0])
{
    addClass(enlarge_button[0], disabled);
} else
{
    removeClass(enlarge_button[0], disabled);
} 


}



function addClass(ele, cls) {

        if (!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) ele.className += " " + cls;
        
    }

function removeClass(ele, cls) {
        if (ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }





function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.font-size-control { 	float: right; 	position: relative; 	margin-top: -30px; 	user-select: none;      -moz-user-select: none;      -khtml-user-select: none;      -webkit-user-select: none;      -o-user-select: none; } .font-size-control ul { 	float: right; } .font-size-control li { 	text-align: center; 	line-height: 22px; 	float: left; 	cursor: pointer; 	width: 24px; 	height: 22px; 	margin: 0px; 	border: 1px solid #BCC0C4; 	-moz-border-radius: 3px; 	-webkit-border-radius: 3px; 	border-radius: 3px; 	background: white; 	background: -moz-linear-gradient(top,white 0,white 50%,#F7F7F7 50%,#E7E7E7 100%); 	background: -webkit-gradient(linear,left top,left bottom,color-stop(0%,white), color-stop(50%,white), color-stop(50%,#F7F7F7), color-stop(100%,#E7E7E7)); 	background: -webkit-linear-gradient(top,white 0,white 50%,#F7F7F7 50%,#E7E7E7 100%); 	background: -o-linear-gradient(top,white 0,white 50%,#F7F7F7 50%,#E7E7E7 100%); 	background: -ms-linear-gradient(top,white 0,white 50%,#F7F7F7 50%,#E7E7E7 100%); 	background: linear-gradient(top,white 0,white 50%,#F7F7F7 50%,#E7E7E7 100%); } .font-size-control .reduce-font-size-button { -webkit-border-top-right-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-topright: 0px; -moz-border-radius-bottomright: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; 	font-size: 90%; 	width:23px; } .font-size-control .enlarge-font-size-button { -webkit-border-top-left-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-topleft: 0px; -moz-border-radius-bottomleft: 0px; border-top-left-radius: 0px; border-bottom-left-radius: 0px;    	font-size: 90%; 	margin-left: -1px; } .font-size-control .disabled { 	background-color: #f7f7f7; 	background-image: -moz-linear-gradient(bottom,#fff 39%,#f7f7f7 40%,#e7e7e7 100%); 	background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.39,#fff), color-stop(0.40,#f7f7f7), color-stop(1,#e7e7e7)) }  .font-size-smaller {font-size:87.7%;} .font-size-small {font-size:94%;} .font-size-normal {font-size:100%;} .font-size-large {font-size:112.5%;} .font-size-larger {font-size:119%;}');


var current_fontsize_setting = 3;
var fontsize_settings = new Array("","font-size-smaller", "font-size-small", "font-size-normal", "font-size-large", "font-size-larger");


if(!GM_getValue('GMFontSizeSetting'))
{
	GM_setValue('GMFontSizeSetting',current_fontsize_setting);
}
else
{
	
    current_fontsize_setting=GM_getValue('GMFontSizeSetting');
    
}






//browser language detection
var fontSizeControlStr = new Array("-A","+A");
var userLang = (navigator.language) ? navigator.language : navigator.userLanguage;
userLang = userLang.substring(0,2);

switch(userLang)
{
	case 'zh':
	fontSizeControlStr= new Array("小","大");
	break;
	case 'kr':
	fontSizeControlStr= new Array("가-","가+");
	break;
	case 'en':
	default:
	fontSizeControlStr= new Array("-A","+A");


}

var fontSizeControl=document.createElement('div');
fontSizeControl.className='font-size-control';
fontSizeControl.innerHTML=' <ul class="font-size-controller"> <li  class="reduce-font-size-button"><a  title="reduce font-size">'+fontSizeControlStr[0]+'</a></li> <li  class="enlarge-font-size-button"><a  title="enlarge font-size">'+fontSizeControlStr[1]+'</a></li> </ul>';

document.getElementsByClassName('yom-art-hd')[0].appendChild(fontSizeControl);
adjContentStyle(document.getElementsByClassName('yom-art-content')[0],'', fontsize_settings[current_fontsize_setting])
adjButtonState();

document.getElementsByClassName('reduce-font-size-button')[0].addEventListener("click", reduce_fontsize,true);
document.getElementsByClassName('enlarge-font-size-button')[0].addEventListener("click", enlarge_fontsize,true);

}



