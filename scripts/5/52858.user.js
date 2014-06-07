

// ==UserScript==
// @name           jijie's
// @namespace      http://itsmejijie.blogspot.com/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

var Ovr2='';
if(typeof document.compatMode!='undefined' && document.compatMode!='BackCompat')
{
   cot_t1_DOCtp="_top:expression(document.documentElement.scrollTop+document.documentElement.clientHeight-this.clientHeight);_left:expression(document.documentElement.scrollLeft + document.documentElement.clientWidth - offsetWidth);}";
}
else
{
   cot_t1_DOCtp="_top:expression(document.body.scrollTop+document.body.clientHeight-this.clientHeight);_left:expression(document.body.scrollLeft + document.body.clientWidth - offsetWidth);}";
}

if(typeof document.compatMode!='undefined'&&document.compatMode!='BackCompat')
{
   cot_t1_DOCtp2="_top:expression(document.documentElement.scrollTop-20+document.documentElement.clientHeight-this.clientHeight);}";
}
else
{
   cot_t1_DOCtp2="_top:expression(document.body.scrollTop-20+document.body.clientHeight-this.clientHeight);}";
}


var adi_top_rightCSS='#adi_top_right{position:fixed;';
adi_top_rightCSS=adi_top_rightCSS+'_position:absolute;';
adi_top_rightCSS=adi_top_rightCSS+'top:0px;';
adi_top_rightCSS=adi_top_rightCSS+'right:0px;';
adi_top_rightCSS=adi_top_rightCSS+'clip: inherit;';
adi_top_rightCSS=adi_top_rightCSS+cot_t1_DOCtp;

var cot_tl_popCSS='#cot_tl_pop {background-color: transparent;';
cot_tl_popCSS=cot_tl_popCSS+'position:fixed;';
cot_tl_popCSS=cot_tl_popCSS+'_position:absolute;';
cot_tl_popCSS=cot_tl_popCSS+'height:194px;';
cot_tl_popCSS=cot_tl_popCSS+'width: 244px;';
cot_tl_popCSS=cot_tl_popCSS+'border: thin solid #000000;';
cot_tl_popCSS=cot_tl_popCSS+'right: 100px;';
cot_tl_popCSS=cot_tl_popCSS+'top: 30px;';
cot_tl_popCSS=cot_tl_popCSS+'overflow: hidden;';
cot_tl_popCSS=cot_tl_popCSS+'visibility: hidden;';
cot_tl_popCSS=cot_tl_popCSS+'z-index: 100;';
cot_tl_popCSS=cot_tl_popCSS+cot_t1_DOCtp2;

document.write('<style type="text/css">'+adi_top_rightCSS+cot_tl_popCSS+'</style>');

function cot_tl_bigPopup(url)
{
   newwindow=window.open(url,'name');

   if(window.focus)
   {
      newwindow.focus()
   }
   return false;
}

function cot(cot_tl_theLogo,cot_tl_LogoType,LogoPosition,theAffiliate)
{
   var cot_tl_bigBaseURL= "http://itsmejijie.blogspot.com/";
   document.write('<div id="adi_top_right">');
   document.write('<a href='+cot_tl_bigBaseURL+' onClick="return cot_tl_bigPopup(\''+cot_tl_bigBaseURL+'\')"><img src='+cot_tl_theLogo+' border="0" ></a>');document.write('</div>');
}



