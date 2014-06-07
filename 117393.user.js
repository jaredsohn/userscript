// <![CDATA[
// ==UserScript==
// @name          Simple Countdown Timer by Ardor
// @author        Ardor
// @version       2011-11-06
// @namespace     *
// @description   places a flash Timer in window
// @include       *
// ==/UserScript== 

/* for top window only */
if(window.parent==self)
{
var docBody = document.body;
var myTimer = document.createElement('object');
myTimer.id = "myTimer";
myTimer.border = 'no';
myTimer.style.position = 'fixed';
myTimer.style.zIndex = 10000;


/* Here u set prefered position u can use top, left , right or bottom */
myTimer.style.bottom = '20px';
myTimer.style.right = '5px';

myTimer.height = '100';
myTimer.width = '200';
myTimer.setAttribute('classid','clsid:d27cdb6e-ae6d-11cf-96b8-444553540000');
myTimer.setAttribute('data','http://www.usflashmap.com/component/cdt_new/cdt2_1.swf');
myTimer.setAttribute('wmode','transparent');
myTimer.setAttribute('type','application/x-shockwave-flash');
docBody.appendChild(myTimer);

var myParam = document.createElement('param');
myParam.name = 'sameDomain';
myParam.value= 'allowScriptAccess';
myTimer.appendChild(myParam);

myParam = document.createElement('param');
myParam.name = 'movie';
myParam.value= 'http://www.usflashmap.com/component/cdt_new/cdt2_1.swf';
myTimer.appendChild(myParam);

myParam = document.createElement('param');
myParam.name = 'base';
myParam.value= 'http://www.usflashmap.com/component/cdt_new/';
myTimer.appendChild(myParam);

myParam = document.createElement('param');
myParam.name = 'flashvars';
myParam.value= ' &timer=1& &time_template=1:ss;0:mm& &time_color=0x000000& &label_color=0x000000& &background_color=0xFFFFFF& &flare_view=true& &time_label=d:DAY;h:HOUR;m:MIN;s:SEC& &time_zone=Local time&       &event_time=year:2009;month:10;day:1;hour:0;minute:0;seconds:0& &event_duration=year:0;month:0;day:0;hour:0;minute:1;seconds:0& &event_recursion=hourly& &onpress_url=-&       &event_onpress_url=-& &title=End of Current  Hour& &event_title=End of Current  Hour& &sound_file=-&       &event_sound_file=-& ';
myTimer.appendChild(myParam);

myParam = document.createElement('param');
myParam.name = 'quality';
myParam.value= 'transparent';
myTimer.appendChild(myParam);

myParam = document.createElement('param');
myParam.name = 'wmode';
myParam.value= 'high';
myTimer.appendChild(myParam);

myParam = document.createElement('param');
myParam.name = 'scale';
myParam.value= 'noscale';
myTimer.appendChild(myParam);

}

