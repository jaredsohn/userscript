// ==UserScript==

// @name           PPS for Firefox

// @namespace      liu.wanfang@gmail.com

// @description    pps for firefox in the totem-pps V2.5.1

// @include        http://kan.pps.tv/play/*

// @include        http://kan.pps.tv/play_list*

// ==/UserScript==



function GmOnMouseOver(evt)

{

	if(document.getElementById('GmShowBig').value == "影院模式")

	{

		document.getElementById('GmShowBlack').style.opacity = "1";

	}	

}

function GmOnMouseOut(evt)

{

	if(document.getElementById('GmShowBig').value == "影院模式")

	{

		document.getElementById('GmShowBlack').style.opacity = "0.1";

	}

}

function GmOnClick(evt)

{

	var t = document.getElementById('GmShowBlack');

	if(evt.target.value == "影院模式")

	{

		evt.target.value = "恢复"

		t.style.left = '-250px';

		t.style.top = '-200px';

		t.style.width = '1640px';

		t.style.height = '1400px';

		t.style.background = 'rgba(0,0,0,0.6)';



		document.getElementById('GmShowPlayBorder').style.left = '124px';

		document.getElementById('GmShowPlay').style.width = '712px';

		

		document.getElementById('GmShowLeft').style.top = '200px';

		document.getElementById('GmShowLeft').style.paddingLeft = '220px';



		for(i=0;i<d.length;i++)

		{

			if( d[i].className.substring(0,7) == "adsense" || d[i].className == "rBar" )

			{

				d[i].style.display = 'none';

			}

			else if( d[i].className == "main" )

			{

				d[i].style.background = "url(http://kan.pps.tv/style_v5/img/onlineSee.jpg)";

			}

		}

	}

	else

	{

		evt.target.value = "影院模式"

		t.style.left = '40px';

		t.style.top = '26px';

		t.style.width = '670px';

		t.style.height = '574px';

		t.style.background = 'rgba(0,0,0,0.4)';

		

		document.getElementById('GmShowPlayBorder').style.left = '180px';

		document.getElementById('GmShowPlay').style.width = '500px';

		

		document.getElementById('GmShowLeft').style.top = '0px';

		document.getElementById('GmShowLeft').style.paddingLeft = '0px';



		for(i=0;i<d.length;i++)

		{

			if( d[i].className.substring(0,7) == "adsense" || d[i].className == "rBar" )

			{

				d[i].style.display = '';

			}

		}

	}

}

function GmConOnClick(evt)

{

	if(evt.target.value == "隐藏控制")

	{

		evt.target.value = "显示控制"

		document.getElementById('GmShowPlayBorder').style.height = "448px";

	}

	else

	{

		evt.target.value = "隐藏控制"

		document.getElementById('GmShowPlayBorder').style.height = "auto";

	}

}



var o = document.getElementById('showplayer');

if( o != undefined )

{

	var pps = o.innerHTML.match(/pps:\/\/.*?rmvb|pps:\/\/.*?wmv/);

	var s = "<div id='GmShowBlack' style='position:absolute;top:26px;left:40px;-moz-border-radius:40px;width:670px;height:574px;background:rgba(0,0,0,0.4);z-index:1000;opacity:0.1;'>";

	s += "<div id='GmShowLeft' style='position:absolute;left:40px;width:50px;height:442px;z-index:1001;padding:190px 180px 0px 0px;'>";

	s += "<input Id='GmShowBig' type='button' value='影院模式' style='height:65px;width:65px;background:rgba(0,0,0,0.4);-moz-border-radius:10px;color:#FFFFFF;border:1px outset #000000;margin:10px;'/>";

	s += "<input Id='GmShowCon' type='button' value='隐藏控制' style='height:65px;width:65px;background:rgba(0,0,0,0.4);-moz-border-radius:10px;color:#FFFFFF;border:1px outset #000000;margin:10px;'/>";

	s += "</div></div>";

	s += "<div id='GmShowPlayBorder' style='position:absolute;top:84px;left:180px;z-index:1001;overflow-y:hidden;height:auto;'>";

	s += "<object id='GmShowPlay' data='"+pps+"' type='application/x-mplayer2' width='500' height='475' scr='"+pps+"' ShowControls='true' autostart='true' ShowTracker='true' style='z-index:1002;'><param name='playcount' value='infinite'></object>";

	s += "</div><div style='position:absolute;top:530px;background:#000;z-index:1000;width:432px;padding:34px;'>小贴士：如果您不能正常播放，请先安装totem-pps，在Debian和Ubuntu下的安装方法请参照：<a href='http://forum.ubuntu.org.cn/viewtopic.php?f=74&t=223582'>Ubuntu中文论坛•PPS Totem 插件完美运行</a></div>";

	o.innerHTML = s;



	var gsb = document.getElementById('GmShowLeft');

	gsb.addEventListener("mouseover",GmOnMouseOver,false);

	gsb.addEventListener("mouseout",GmOnMouseOut,false);



	document.getElementById('GmShowBig').addEventListener("click",GmOnClick,false);

	document.getElementById('GmShowCon').addEventListener("click",GmConOnClick,false);

}



var reg1 = new RegExp("/play_next\(\'\d*\'\);/","g");

var t;

var reg2 = new RegExp("return false;","g");

var reg3 = new RegExp('onclick=\".*?\"',"g");



if( document.getElementById('onlineSee') != null )

{

	t = document.getElementById('onlineSee').innerHTML.replace(reg1,"");

	t = t.replace(reg2,"");

	document.getElementById('onlineSee').innerHTML = t;

}



if( document.getElementById('onlineSeeFrame') != null )

{

	t = document.getElementById('onlineSeeFrame').innerHTML.replace(reg3," onclick=\"parent.document.getElementById('GmShowPlayBorder').innerHTML='<object id=GmShowPlay data='+this.nextSibling.href+' type=application/x-mplayer2 width=500 height=475 scr='+this.nextSibling.href+' ShowControls=true autostart=true ShowTracker=true style=z-index:1002;><param name=playcount value=infinite></object>';parent.document.getElementById('play_row_value_var').innerHTML=this.innerHTML;return false;\" ");

	document.getElementById('onlineSeeFrame').innerHTML = t;

}



var d = document.getElementsByTagName('div');

for(i=0;i<d.length;i++)

{

	if( d[i].className == "main" )

	{

		d[i].style.backgroundPosition = "top left";

	}

}



setTimeout("clearInterval(_inter);",800);