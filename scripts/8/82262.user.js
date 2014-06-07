// ==UserScript==
// @name           notabenoid line hightliter
// @namespace      script
// @description    Добавляет подсветку строчки, на которую вы навели в списке переводов
// @include        http://notabenoid.com/translate/*
// ==/UserScript==


var L2="table.L2 {width:100%;opacity:1!important;}\ntable.L2 th, table.L2 td {padding:3px 10px; border-bottom:1px solid #ccc; border-right:1px solid #ccc;  white-space:nowrap;}\ntable.L2 td.e {background:#ddd; border-right:0; border-left:1px solid #fff; border-bottom:1px solid #fff;}\ntable.L2 td.t {width:100%; white-space:normal; text-align:left;}\ntable.L2 .nb {font-weight:normal; white-space:nowrap;}\n"
var tr=".tr{background-color: rgba(19,245,7,0.26)}\n" //#13F507
var troff=".troff{background-color: rgba(255,255,255,1)}" //#fff

var css = document.createElement('style');
css.setAttribute('type', 'text/css');
css.setAttribute('rel', 'stylesheet');
css.innerHTML=L2 + tr + troff;
document.getElementsByTagName('head')[0].appendChild(css);

var css2=document.getElementsByClassName('L')[0];
css2.setAttribute("class","L2")

var lines=document.getElementsByTagName('tr');

for(var i=0;i<lines.length;i++)
	{
	 lines[i].setAttribute("className","this.className='troff'");

	 lines[i].setAttribute("onMouseOver","this.className='tr'");
	 lines[i].setAttribute("onMouseOut","this.className='troff'");
	}
/* Backup code for Emergency */
//table.L2 td {background:#fff;}\n

//	 lines[i].setAttribute("onMouseOver","this.bgColor='#D7961E';style.opacity='0.4'");
//	 lines[i].setAttribute("onMouseOut","this.bgColor='#fff'");
/* END of Backup*/