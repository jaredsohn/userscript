// ==UserScript==
// @name        人人网关灯效果
// @id    offTheLight
// @author  lee
// @downloadURL    https://userscripts.org/scripts/source/163084.user.js
// @updateURL      https://userscripts.org/scripts/source/163084.meta.js
// @namespace   527836355@qq.com
// @include    *
// @version     1
// ==/UserScript==
if(window!=window.top)
return;
GM_addStyle('#deng-left,#deng-right,#deng-top,#deng-bottom{background:rgba(0,0,0,0.800)}'+
'#deng-overlay,#deng-center,#inner-top,#inner-bottom{-moz-user-select:-moz-none!important;}');
var kaiguan=document.createElement('div');
kaiguan.setAttribute('style','z-index:10000;position:fixed;top:10px;left:15px;width:50px;height:90px;');
var src='data:image/png;base64,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';
kaiguan.style.backgroundImage="url("+src+")";
document.body.appendChild(kaiguan);
var overlay=document.createElement('div');
overlay.style.display='none';
overlay.id='deng-overlay';
overlay.style.width='100%';
overlay.style.left='0px';
overlay.style.top='0px';
overlay.style.position='fixed';
overlay.innerHTML=
"<div id='deng-top' style='width:100%;left:0px;top:0px;position:absolute;z-index:1000'></div>\
<div id='deng-left' style='position:fixed;bottom:0px;left:0px;z-index:1000;width:200px;'></div>\
<div id='deng-right' style='position:fixed;right:0px;bottom:0px;z-index:1000'></div>\
<div id='deng-bottom' style='width:548px;position:fixed;bottom:0px;z-index:1000'></div>\
<div id='deng-center' style='position:absolute;width:0px;z-index:1000' >\
<img id='inner-top'  style='width:548;height:269px;position:fixed;z-index:1000'  src='http://imgsrc.baidu.com/forum/w%3D580/sign=1f85bf374a36acaf59e096f44cd88d03/5d6034a85edf8db11f79806a0823dd54564e746d.jpg'/>\
<img id='inner-left' style='widh:264px;heght:20px;position:fixed;z-index:1000' src='http://imgsrc.baidu.com/forum/w%3D580/sign=c327efa958ee3d6d22c687c373166d41/37d3d539b6003af3a89d206e342ac65c1038b69d.jpg'/>\
<img id='inner-right' style='widh:264px;heght:20px;position:fixed;z-index:1000'  src='http://imgsrc.baidu.com/forum/w%3D580/sign=c3e17bc542166d223877159c76230945/3b87e950352ac65c86229a7dfaf2b21193138a9d.jpg'/>\
<img id='inner-bottom' style='width:548px;height:259px;position:fixed;z-index:1000' src='http://imgsrc.baidu.com/forum/w%3D580/sign=9cabc34503087bf47dec57e1c2d3575e/6a600c338744ebf89b729831d8f9d72a6059a7b9.jpg'/>\
</div>";
document.body.appendChild(overlay);
var on=false;
if(GM_getValue('renrenSwitch')==true)
{on=true;overlay.style.display='block';};
kaiguan.onclick=function()
		{
		if(!on)
		{
		on=true;GM_setValue('renrenSwitch',true);overlay.style.display='block';
		} 


		else 
		{
		on=false;GM_setValue('renrenSwitch',false);overlay.style.display='none';
		}
		}
		;
window.addEventListener('mousemove',function(e)
										{
											var clientx=e.clientX;
											var clienty=e.clientY;
											var topheight=clienty-269-10;
											topheight=(topheight>0)?topheight:0;
											document.querySelector('#deng-top').style.height=topheight+'px';
											
											leftheight=window.innerHeight-topheight;
											leftheight=(leftheight>0)?leftheight:0;
											leftwidth=clientx-274;
											leftwidth=(leftwidth>0)?leftwidth:0;
											document.querySelector('#deng-left').style.height=leftheight+'px';
											document.querySelector('#deng-left').style.width=leftwidth+'px';
											rightwidth=document.body.clientWidth-clientx-274;
											rightwidth=(rightwidth>0)?rightwidth:0;
											document.querySelector('#deng-right').style.width=rightwidth+'px';
											document.querySelector('#deng-right').style.height=leftheight+'px';
											var bottomheight=window.innerHeight-clienty-259-10;
											bottomheight=(bottomheight>0)?bottomheight:0;
											document.querySelector('#deng-bottom').style.height=bottomheight+'px'
											document.querySelector('#deng-bottom').style.left=(clientx-274)+'px';
											document.querySelector('#inner-top').style.top=(clienty-269-10)+'px';
											document.querySelector('#inner-top').style.left=(clientx-274)+'px';
											document.querySelector('#inner-bottom').style.top=(clienty+10)+'px';
											document.querySelector('#inner-bottom').style.left=(clientx-274)+'px';
											document.querySelector('#inner-left').style.top=(clienty-10)+'px';
											document.querySelector('#inner-left').style.left=(clientx-274)+'px';
											document.querySelector('#inner-right').style.top=(clienty-10)+'px';
											document.querySelector('#inner-right').style.left=(clientx+10)+'px';

										
										
										},false);
										
										
