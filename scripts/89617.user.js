// ==UserScript==
// @name           icampus.ac.kr VOD Lecture Watch (For GM,Opera,Chrome)
// @description    Enable to watch some VOD lectures in icampus.ac.kr (need Windows Media Player Plugin)
// @include        http://vod.icampus.ac.kr/*
// @include        http://vod.icampus.ac.kr:*/*
// @copyright      OLokLiR
// @version        0.600
// ==/UserScript==

//Fix HighDoubleMode
if(document.domain=='vod.icampus.ac.kr'&&/highdoublemode/i.test(document.URL)){
	var unsafeWindow=this['unsafeWindow']||window; //For Opera (Opera don't know unsafeWindow.)
	objectMediaExFix=function(_id, _url, _width, _height, _autostart, _uimode, _stretchToFit, _enableContextMenu, _volume, _fullscreen)
	{
		return "<OBJECT id='" + _id + "' name='" + _id + "' type='application/x-ms-wmp' width='" + _width + "' height='" + _height + "'>"    +"<PARAM NAME='autoStart' VALUE='" + _autostart + "'>"    +"<PARAM NAME='uimode' VALUE='" + _uimode + "'>"    +"<PARAM NAME='stretchToFit' VALUE='" + _stretchToFit + "'>"    +"<PARAM NAME='volume' VALUE='" + _volume + "'>"    +"<PARAM NAME='enableContextMenu' VALUE='" + _enableContextMenu + "'>"    +"<PARAM NAME='URL' VALUE='" + _url + "'>"    +"<PARAM NAME='WindowlessVideo' VALUE='0'>"    +"<PARAM NAME='fullScreen' VALUE='" + _fullscreen + "'><param name='allowScriptAccess' value='sameDomain' /></OBJECT>";
	}
	Fix_icampusVOD=function(){
		var unsafeWindow=this['unsafeWindow']||window;
		var ControlProgress=document.getElementById("ControlProgress");
		var ScreenLayer=document.getElementById("ScreenLayer");
		var VideoLayer=document.getElementById("VideoLayer");
		var table=document.getElementsByTagName("table")[0];
		if(unsafeWindow.document.body.getAttribute('_checkFixed')=='1'){return false;}
		unsafeWindow.document.body.setAttribute('_checkFixed','1');
		unsafeWindow.document.body.style.backgroundColor="#111";

		var width=1024;
		var height=768;
		if(screen.availWidth<1280){width=width-1280+screen.availWidth;}
		if(screen.availHeight<900){height=height-900+screen.availHeight;}
		if(height<(3/4*width)){width=parseInt(4/3*height)}
		var width2=220;
		var height2=165;
		if(screen.availWidth>1280){
			width2=width2-1280+screen.availWidth;
			if(width2>640){width2=640;}
			height2=parseInt(3/4*width2);
		}

		var play2='                                         \
		function play2(){                                   \
		    var _screen=document.getElementById("screen");  \
		    var _video=document.getElementById("video");    \
		    _screen.controls.play();                        \
		    _video.controls.currentPosition                 \
		    =_screen.controls.currentPosition;              \
		    _video.controls.play();                         \
		};';

		var pause2='                                        \
		function pause2(){                                  \
		    var _screen=document.getElementById("screen");  \
		    var _video=document.getElementById("video");    \
		    _screen.controls.pause();                       \
		    _video.controls.pause();                        \
		};';

		var stop2='                                         \
		function stop2(){                                   \
		    var _screen=document.getElementById("screen");  \
		    var _video=document.getElementById("video");    \
		    _screen.controls.stop();                        \
		    _video.controls.stop();                         \
		};';

		var goto2='                                                             \
		var pos=(event.clientX+window.pageXOffset-99)/'+(width-99)+';           \
		function goto2(pos){                                                    \
		    var _screen=document.getElementById("screen");                      \
		    var _video=document.getElementById("video");                        \
		    _screen.controls.currentPosition=pos*_screen.currentMedia.duration; \
		    _video.controls.currentPosition=pos*_video.currentMedia.duration;   \
		};';

		function volume2(level){
		    var fnc='                                                                    \
		    function _volume(){                                                          \
		    for(var i=1;i<'+level+'+1;i++){                                              \
		        document.getElementById("_volume"+i).style.backgroundColor="#555";       \
		    };                                                                           \
		    for(var i='+level+'+1;i<11;i++){                                             \
		        document.getElementById("_volume"+i).style.backgroundColor="#333";       \
		    };                                                                           \
		    document.getElementById("screen").settings.volume='+(level*10)+';};_volume();';
		    return fnc;
		}

		var controlbox="<div id='controlbox' style='width:"+width+"px;height:30px;position:absolute;left:0;top:"+height+"px;'>";
		controlbox+="<img src='http://files.myopera.com/oloklir/image_parts/play.png' style='position:absolute;top:0;left:0;width:30px;height:30px;background:#222;cursor:hand;font-size:10px;' alt='play' onclick='javascript:";
		controlbox+=play2;
		controlbox+="play2();'/>";
		controlbox+="<img src='http://files.myopera.com/oloklir/image_parts/pause.png' style='position:absolute;top:0;left:33px;width:30px;height:30px;background:#222;cursor:hand;font-size:10px;' alt='pause' onclick='javascript:";
		controlbox+=pause2;
		controlbox+="pause2();'/>";
		controlbox+="<img src='http://files.myopera.com/oloklir/image_parts/stop.png' style='position:absolute;top:0;left:66px;width:30px;height:30px;background:#222;cursor:hand;font-size:10px;' alt='stop' onclick='javascript:";
		controlbox+=stop2;
		controlbox+="stop2();'/>";
		controlbox+="<div style='position:absolute;top:2px;left:99px;width:"+(width-99)+"px;height:26px;background:#333;' onmousedown='javascript:";
		controlbox+=goto2;
		controlbox+="goto2(pos);'>";
		controlbox+="<div id='_nowpos' style='position:absolute;top:0;left:0;width:0;height:100%;background:#555;'></div><div id='_reppos' style='position:absolute;top:0;left:0;width:0;height:3px;background:#ff0;'></div></div></div>";

		var volumebox="<div style='width:220px;height:60px;position:absolute;left:"+width+"px;top:"+(height-60)+"px'>";
		volumebox+="<div style='position:absolute;left:8px;top:5px;width:85px; height:19px;padding-left:5px;padding-top:2px;font-size:13px;background:#222;font-family:verdana,sans-serif;color:#999;cursor:default;' onclick='javascript:function _volume(obj){var set=document.getElementById("+'"screen"'+").settings;if(set.mute){obj.innerHTML="+'"Mute : OFF"'+";set.mute=false;}else{obj.innerHTML="+'"Mute : <font color=red>ON</font>"'+";set.mute=true;}};_volume(this);'>Mute : OFF</div>";
		volumebox+="<div id='_volume1' style='position:absolute;top:30px;left:8px;width:18px;height:24px;background:#555;' onclick='javascript:"+volume2(1)+";'></div>";
		volumebox+="<div id='_volume2' style='position:absolute;top:30px;left:"+(8+20*1)+"px;width:18px;height:24px;background:#555;' onclick='javascript:"+volume2(2)+";'></div>";
		volumebox+="<div id='_volume3' style='position:absolute;top:30px;left:"+(8+20*2)+"px;width:18px;height:24px;background:#555;' onclick='javascript:"+volume2(3)+";'></div>";
		volumebox+="<div id='_volume4' style='position:absolute;top:30px;left:"+(8+20*3)+"px;width:18px;height:24px;background:#555;' onclick='javascript:"+volume2(4)+";'></div>";
		volumebox+="<div id='_volume5' style='position:absolute;top:30px;left:"+(8+20*4)+"px;width:18px;height:24px;background:#555;' onclick='javascript:"+volume2(5)+";'></div>";
		volumebox+="<div id='_volume6' style='position:absolute;top:30px;left:"+(8+20*5)+"px;width:18px;height:24px;background:#555;' onclick='javascript:"+volume2(6)+";'></div>";
		volumebox+="<div id='_volume7' style='position:absolute;top:30px;left:"+(8+20*6)+"px;width:18px;height:24px;background:#555;' onclick='javascript:"+volume2(7)+";'></div>";
		volumebox+="<div id='_volume8' style='position:absolute;top:30px;left:"+(8+20*7)+"px;width:18px;height:24px;background:#555;' onclick='javascript:"+volume2(8)+";'></div>";
		volumebox+="<div id='_volume9' style='position:absolute;top:30px;left:"+(8+20*8)+"px;width:18px;height:24px;background:#333;' onclick='javascript:"+volume2(9)+";'></div>";
		volumebox+="<div id='_volume10' style='position:absolute;top:30px;left:"+(8+20*9)+"px;width:18px;height:24px;background:#333;' onclick='javascript:"+volume2(10)+";'></div>";
		volumebox+="</div>";

		var titlebox="<div id='_titlebox' style='position:absolute;left:"+(width+5)+"px;top:"+(height2+35)+"px;width:"+(width2-10)+"px;font-size:13px;font-family:verdana,sans-serif;color:#999;'>"+unsafeWindow.document.getElementById('lblContentTitle').innerHTML+"</div>";
		var postext="<div id='_posText' style='position:absolute;left:"+(width+5)+"px;top:"+(height)+"px;width:"+(width2-10)+"px;font-size:13px;font-family:verdana,sans-serif;color:#999;'>/ 00:00</div>";
		var speedsel="<select id='_speed' style='display:block;position:absolute;left:"+(width+105)+"px;top:"+(height-55)+"px;width:110px;font-size:12px;font-family:verdana,sans-serif;' ";
		speedsel+="onchange='javascript:function _speed(spd){document.getElementById("+'"screen"'+").settings.rate=document.getElementById("+'"video"'+").settings.rate=parseFloat(spd);};_speed(this.value);'>";
		speedsel+="<option value='0.1'>0.1x (Stop?)</option>";
		speedsel+="<option value='0.2'>0.2x</option>";
		speedsel+="<option value='0.3'>0.3x</option>";
		speedsel+="<option value='0.4'>0.4x</option>";
		speedsel+="<option value='0.5'>0.5x (Half)</option>";
		speedsel+="<option value='0.6'>0.6x</option>";
		speedsel+="<option value='0.8'>0.8x</option>";
		speedsel+="<option value='1' selected='selected'>1.0x (Default)</option>";
		speedsel+="<option value='1.2'>1.2x</option>";
		speedsel+="<option value='1.4'>1.4x</option>";
		speedsel+="<option value='1.6'>1.6x</option>";
		speedsel+="<option value='1.8'>1.8x</option>";
		speedsel+="<option value='2'>2.0x (Double)</option>";
		speedsel+="<option value='2.2'>2.2x</option>";
		speedsel+="<option value='2.4'>2.4x</option>";
		speedsel+="<option value='2.6'>2.6x</option>";
		speedsel+="<option value='2.8'>2.8x</option>";
		speedsel+="<option value='3'>3.0x (Triple)</option>";
		speedsel+="<option value='3.5'>3.5x</option>";
		speedsel+="<option value='4'>4.0x (Too fast!)</option>";
		speedsel+="<option value='4.5'>4.5x</option>";
		speedsel+="<option value='5'>5.0x (!@#$%^&*!)</option>";
		speedsel+="</select>";

		var fullscreen="<div style='position:absolute;left:"+(width+5)+"px;top:"+(height-85)+"px;width:100px;text-align:center;height:19px;padding-top:2px;font-size:13px;background:#222;font-family:verdana,sans-serif;color:#999;cursor:default;' onclick='function _beFull(){var screen=document.getElementById("+'"screen"'+");screen.fullScreen=true;};_beFull();'>Fullscreen</div>";
		var uiMode="<div style='position:absolute;left:"+(width+115)+"px;top:"+(height-85)+"px;width:100px;text-align:center;height:19px;padding-top:2px;font-size:13px;background:#222;font-family:verdana,sans-serif;color:#999;cursor:default;' onclick='function _beFull(){var screen=document.getElementById("+'"screen"'+");if(screen.uiMode=="+'"none"'+"){screen.uiMode="+'"full"'+";}else{screen.uiMode="+'"none"'+"};};_beFull();'>UI on/off</div>";

		var goto3='                                                        \
		function goto3(){                                                  \
		    var timer1=document.getElementById("timemin2");                \
		    var timer2=document.getElementById("timesec2");                \
		    var _screen=document.getElementById("screen");                 \
		    var _video=document.getElementById("video");                   \
		    var time=parseFloat(timer1.value)*60+parseFloat(timer2.value); \
		    _screen.controls.currentPosition=time;                         \
		    _video.controls.currentPosition=time;                          \
		};';

		var setTime="<div style='position:absolute;left:"+(width+5)+"px;top:"+(height-130)+"px;width:210px;font-size:13px;font-family:verdana,sans-serif;color:#999;'>";
		setTime+="Set time to<br/>";
		setTime+="<input id='timemin2' type='text' value='0' style='width:25px;text-align:right;' onkeypress='javascript:if(event.keyCode==13){"+goto3+"goto3()};'/>min ";
		setTime+="<input id='timesec2' type='text' value='0' style='width:25px;text-align:right;' onkeypress='javascript:if(event.keyCode==13){"+goto3+"goto3()};'/>sec ";
		setTime+="<input type='button' value='set' style='width:35px;font-size:13px;font-family:verdana,sans-serif;' onclick='javascript:"+goto3+"goto3();'/></div>"

		var change2='                                                     \
		function _change(){                                               \
		    var _screen=document.getElementById("screen");                \
		    var _video=document.getElementById("video");                  \
		    var rate=parseFloat(document.getElementById("_speed").value); \
		    var pos=_screen.controls.currentPosition;                     \
		    var url1=_screen.URL;                                         \
		    var url2=_video.URL;                                          \
		    _screen.URL=url2;                                             \
		    _video.URL=url1;                                              \
		    _screen.controls.currentPosition=pos;                         \
		    _video.controls.currentPosition=pos;                          \
		    _screen.settings.rate=rate;                                   \
		    _video.settings.rate=rate;                                    \
		};';

		var changep="<div style='position:absolute;left:"+(width+5)+"px;top:0;width:210px;text-align:center;height:19px;padding-left:5px;padding-top:2px;font-size:13px;background:#333;font-family:verdana,sans-serif;color:#999;cursor:default;' onclick='javascript:";
		changep+=change2;
		changep+="_change();'>Change Screen &lt; &gt; VOD</div>";

		var repeat="<div style='position:absolute;left:"+(width+5)+"px;top:"+(height-170)+"px;width:95px;font-size:13px;font-family:verdana,sans-serif;color:#999;text-align:right;'>Repeat A-B<br/><input id='_repeatState' value='Repeating' type='button' style='position:absolute;top:20px;right:0;height:19px;font-size:13px;font-family:verdana,sans-serif;' onclick='javascript:";
		repeat+="function _rR(obj){if(obj.value=="+'"Repeating"'+"){obj.value="+'"Stopped"'+";}else{obj.value="+'"Repeating"'+";};};_rR(this);";
		repeat+="'/></div>";
		var repeatA="<div style='position:absolute;left:"+(width+105)+"px;top:"+(height-170)+"px;width:110px;font-size:13px;font-family:verdana,sans-serif;color:#999;'><input onclick='javascript:";
		repeatA+="function _rA(){document.getElementById("+'"_repeatA"'+").innerHTML=document.getElementById("+'"screen"'+").controls.currentPositionString;};_rA();";
		repeatA+="' type='button' style='width:30px;height:19px;font-size:13px;font-family:verdana,sans-serif;' value='A'/><span id='_repeatA'></span></div>";
		var repeatB="<div style='position:absolute;left:"+(width+105)+"px;top:"+(height-150)+"px;width:110px;font-size:13px;font-family:verdana,sans-serif;color:#999;'><input onclick='javascript:";
		repeatB+="function _rB(){document.getElementById("+'"_repeatB"'+").innerHTML=document.getElementById("+'"screen"'+").controls.currentPositionString;};_rB();";
		repeatB+="' type='button' style='width:30px;height:19px;font-size:13px;font-family:verdana,sans-serif;' value='B'/><span id='_repeatB'></span></div>";

		var c=unsafeWindow.document.URL;
		var c_name='CONTENTID=';
		var c_start=c.indexOf(c_name);
		if(c_start>-1){
			c_start=c_start+c_name.length;
			var c_end=c.indexOf('&',c_start);
			if(c_end==-1){c_end=c.length}
			c=c.substring(c_start,c_end);
		}
		else{
			c='0';
		}
		var cid=c;
		var expire=new Date();
		expire=new Date(expire.getTime()+60*60*24*31*10000);
		expire=expire.toGMTString();

		var mark2='javascript:                                             \
		function addBookmark(pos){                                         \
		    function sortNum(a,b){return a-b};                             \
		    var listElm=document.getElementById("_markList");              \
		    var list=new Array();                                          \
		    for(var i=0;i<listElm.childNodes.length;i++){                  \
		        if("input"==listElm.childNodes[i].tagName.toLowerCase()){  \
		            var t=listElm.childNodes[i].value;                     \
		            t=t.split(":");                                        \
		            t=Number(t[t.length-1])+60*Number(t[t.length-2])+3600*Number((t[t.length-3])?t[t.length-3]:0);\
		            list[list.length]=t;                                   \
		        };                                                         \
		    };                                                             \
		    pos=parseInt(pos);                                             \
		    if(pos<=0){return;};                                           \
		    for(var i=0;i<list.length;i++){if(list[i]==pos){return;}};     \
		    list[list.length]=pos;/*list=list.sort(sortNum);*/             \
		    listElm.innerHTML="";                                          \
		    for(var i=0;i<list.length;i++){                                \
		        var elm=document.createElement("input");                   \
		        var h=parseInt(list[i]>0?list[i]/3600:0);                  \
		        var m=parseInt(list[i]>0?list[i]%3600/60:0);               \
		        var s=parseInt(list[i]%60);                                \
		        h=(String(h).length<2&&h>0)?0+""+h+":":(h==0?"":h+":");    \
		        m=(String(m).length<2&&m>0)?0+""+m+":":(m==0?"00:":m+":"); \
		        s=(String(s).length<2&&s>0)?0+""+s:(s==0?"00":s);          \
		        elm.type="button";                                         \
		        elm.value=h+m+s;                                           \
		        elm.style.fontFamily="verdana, sans-serif";                \
		        elm.style.fontSize="11px";                                 \
		        elm.setAttribute("realValue",list[i]);                     \
		        elm.setAttribute("onclick","if(!document.getElementById('+"'_delmark'"+').checked){function goto(pos){document.getElementById('+"'screen'"+').controls.currentPosition=parseInt(pos);document.getElementById('+"'video'"+').controls.currentPosition=parseInt(pos);};goto(this.getAttribute('+"'realValue'"+'));}else{var _list=document.getElementById('+"'_markList'"+');var _c=new Array();_list.removeChild(this);for(var i=0;i<_list.childNodes.length;i++){(_list.childNodes[i].tagName.toLowerCase()=='+"'input'"+')?(_c[_c.length]=_list.childNodes[i].getAttribute('+"'realValue'"+')):null;};document.cookie='+"'"+'FIXBOOKMARKS'+cid+'='+"'"+'+escape(_c.join('+"','"+'))+'+"'"+';expires='+expire+"'"+';}");\
		        listElm.appendChild(elm);                                  \
		    };                                                             \
		    document.cookie="FIXBOOKMARKS'+cid+'="+escape(list.join(","))+";expires='+expire+'";\
		};addBookmark(document.getElementById("screen").controls.currentPosition);';

		var bookmark="<div style='position:absolute;left:"+(width+5)+"px;top:"+(height2+55)+"px;width:"+(width2-10)+"px;font-size:13px;font-family:verdana,sans-serif;color:#999;'>";
		bookmark+="<field id='_markList' style='display:block;width:100%;height:"+(height-height2-265)+"px;overflow-x:clip;overflow-y:scroll;'></field>";
		bookmark+="<label><input id='_delmark' type='checkbox'/>Delete</label><input id='_bookmark' type='button' value='SaveBookmark' style='font-size:13px;font-family:verdana,sans-serif;'/>";
		bookmark+="<br/><span style='font-size:9px;'>*Bookmarks are using Cookies</span></div>";

		table.style.display="none";
		ControlProgress.innerHTML="";
		ControlProgress.style.display="none";

		ScreenLayer.style.left="0px";
		ScreenLayer.style.top="0px";
		ScreenLayer.style.height=height+"px";
		ScreenLayer.innerHTML="<div id='_screenWrap' style='position:absolute;top:0;left:0;width:"+width+"px;height:"+height+"px;'>"+objectMediaExFix("screen", "", "100%", "100%", "true", "none", "true", "true", "80", "0")+"<div id='_videoWrap' style='position:absolute;top:30px;left:"+width+"px;width:"+width2+"px;height:"+height2+"px;'>"+objectMediaExFix("video", "", "100%", "100%", "true", "none", "true", "true", "0", "0")+"</div>"+controlbox+volumebox+titlebox+postext+speedsel+changep+fullscreen+uiMode+setTime+repeat+repeatA+repeatB+bookmark;
		VideoLayer.innerHTML="";
		VideoLayer.style.display="none";

		unsafeWindow.document.getElementById('_bookmark').setAttribute("onclick",mark2);
		if(unsafeWindow.document.cookie.length>0){
			c=unsafeWindow.document.cookie;
			c_name='FIXBOOKMARKS'+cid+'=';
			c_start=c.indexOf(c_name);
			if(c_start>-1){
				c_start=c_start+c_name.length;
				var c_end=c.indexOf(';',c_start);
				if(c_end==-1){c_end=c.length}
				c=unescape(document.cookie.substring(c_start,c_end));
			}
			else{
				c='';
			}
		}
		c=c.split(',');
		var listElm=unsafeWindow.document.getElementById('_markList');
		for(var i=0;i<c.length;i++){
			if(isNaN(parseInt(c[i]))){continue;}
			var elm=unsafeWindow.document.createElement("input");
			c[i]=parseInt(c[i]);
			var h=parseInt(c[i]>0?c[i]/3600:0);
			var m=parseInt(c[i]>0?c[i]%3600/60:0);
			var s=parseInt(c[i]%60);
			h=(String(h).length<2&&h>0)?0+""+h+":":(h==0?"":h+":");
			m=(String(m).length<2&&m>0)?0+""+m+":":(m==0?"00:":m+":");
			s=(String(s).length<2&&s>0)?0+""+s:(s==0?"00":s);
			elm.type="button";
			elm.value=h+m+s;
			elm.style.fontFamily="verdana, sans-serif";
			elm.style.fontSize="11px";
			elm.setAttribute("realValue",c[i]);
			elm.setAttribute("onclick","if(!document.getElementById('_delmark').checked){function goto(pos){document.getElementById('screen').controls.currentPosition=parseInt(pos);document.getElementById('video').controls.currentPosition=parseInt(pos);};goto(this.getAttribute('realValue'));}else{var _list=document.getElementById('_markList');var _c=new Array();_list.removeChild(this);for(var i=0;i<_list.childNodes.length;i++){(_list.childNodes[i].tagName.toLowerCase()=='input')?(_c[_c.length]=_list.childNodes[i].getAttribute('realValue')):null;};document.cookie='FIXBOOKMARKS"+cid+"='+escape(_c.join(','))+';expires="+expire+"';}");
			listElm.appendChild(elm);
		};

		var winWidth=width+width2+36;
		var winHeight=height+97;

		var intervalCommand="                                                                                     \
		var _nowpos=document.getElementById('_nowpos');                                                           \
		var _reppos=document.getElementById('_reppos');                                                           \
		var _posText=document.getElementById('_posText');                                                         \
		var _titlebox=document.getElementById('_titlebox');                                                       \
		var _screen=document.getElementById('screen');                                                            \
		var _video=document.getElementById('video');                                                              \
		var repeat=document.getElementById('_repeatState');                                                       \
		var repeatA=document.getElementById('_repeatA');                                                          \
		var repeatB=document.getElementById('_repeatB');                                                          \
		if(typeof _settingNow=='undefined'){                                                                      \
		    _settingNow=true;                                                                                     \
		    window.resizeTo("+winWidth+","+winHeight+");                                                          \
		};                                                                                                        \
		_nowpos.style.width=(_screen.controls.currentPosition/_screen.currentMedia.duration*"+(width-99)+")+'px'; \
		var _state='Undefined';                                                                                   \
		switch(_screen.playState){                                                                                \
		    case 1 : _state='Stopped';break;                                                                      \
		    case 2 : _state='Paused';break;                                                                       \
		    case 3 : _state='Playing';break;                                                                      \
		    case 4 : _state='ScanForward';break;                                                                  \
		    case 5 : _state='ScanReverse';break;                                                                  \
		    case 6 : _state='Buffering';break;                                                                    \
		    case 7 : _state='Waiting';break;                                                                      \
		    case 8 : _state='MediaEnded';break;                                                                   \
		    case 9 : _state='Transitioning';break;                                                                \
		    case 10 : _state='Ready';break;                                                                       \
		    case 11 : _state='Reconnecting';break;                                                                \
		    case 0 : _state='Undefined';break;                                                                    \
		};                                                                                                        \
		if(repeatA.innerHTML!==''&&repeatB.innerHTML!==''){                                                       \
		    var A=repeatA.innerHTML.split(':');                                                                   \
		    var B=repeatB.innerHTML.split(':');                                                                   \
		    A=Number(A[A.length-1])+60*Number(A[A.length-2])+3600*Number((A[A.length-3])?A[A.length-3]:0);        \
		    B=Number(B[B.length-1])+60*Number(B[B.length-2])+3600*Number((B[B.length-3])?B[B.length-3]:0);        \
		    _reppos.style.left=(Math.min(A,B)/_screen.currentMedia.duration*"+(width-99)+")+'px';                 \
		    _reppos.style.width=(Math.abs(A-B)/_screen.currentMedia.duration*"+(width-99)+")+'px';                \
		    if(repeat.value=='Repeating'){                                                                        \
		    if((_screen.controls.currentPosition<(A-10)||_screen.controls.currentPosition>B)&&A-10<B){            \
		    _screen.controls.currentPosition=A;_video.controls.currentPosition=A;}                                \
		    else if((_screen.controls.currentPosition<(B-10)||_screen.controls.currentPosition>A)&&B<A-10){       \
		    _screen.controls.currentPosition=B;_video.controls.currentPosition=B;}}                               \
		};                                                                                                        \
		_posText.innerHTML=_screen.controls.currentPositionString+' / '+_screen.currentMedia.durationString       \
			+ '<font color="+'"white"'+">('+_state+')</font>';";
		unsafeWindow.document.body.setAttribute('intervalCommand',intervalCommand);
		setTimeout("setInterval(document.body.getAttribute('intervalCommand'),10)",0); //To avoid Sandbox.(Greasemonkey, Chrome)
		return true;
	}
	window.addEventListener("load",Fix_icampusVOD,false); //Chrome ignores this.
	try{Fix_icampusVOD();}catch(e){} //For Chrome. (Chrome loads scripts too late.)
}
//Not using PopupDoubleMode
else if(document.domain=='vod.icampus.ac.kr'&&/popupdoublemode/i.test(document.URL)){
	var unsafeWindow=this['unsafeWindow']||window; //For Opera (Opera don't know unsafeWindow.)
	//Chrome can't access functions and variables of the webpage.
	unsafeWindow.opener=new Object();
	unsafeWindow.opener.close=function(){};
	unsafeWindow.close();
	window.close();
}
//Passing PlayerGate
else if(document.domain=='vod.icampus.ac.kr'&&/playergate/i.test(document.URL)){
	var unsafeWindow=this['unsafeWindow']||window; //For Opera (Opera don't know unsafeWindow.)
	var width=1024;
	var height=768;
	if(screen.availWidth<1280){width=width-1280+screen.availWidth;}
	if(screen.availHeight<900){height=height-900+screen.availHeight;}
	if(height<(3/4*width)){width=4/3*height}
	var width2=220;
	var height2=165;
	if(screen.availWidth>1280){
		width2=width2-1280+screen.availWidth;
		if(width2>640){width2=640;}
		height2=parseInt(3/4*width2);
	}
	width=width+width2+36;
	height=height+97;
	if(screen.availWidth<1280||screen.availHeight<900){
		window.open(document.URL.replace('PlayerGate','HighDoubleMode/MainFrame').replace('REGPNNO','AEGPNNO'),null,"scroll=no,location=no,left=0,top=0,width="+width+",height="+height);
		unsafeWindow.close();
		window.close();
	}
}
//Other Internet Explorer based plugin announcements fix
else if(document.domain=='vod.icampus.ac.kr'){
	obj=document.getElementsByTagName('object');
	for(var i=0;i<obj.length;i++){
		if(/6BF52A52-394A-11d3-B153-00C04F79FAA6/i.test(obj[i].getAttribute('classid')))
		{
			obj[i].removeAttribute('classid');
			obj[i].type='application/x-ms-wmp';
		}
	}
}