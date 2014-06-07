// ==UserScript==
// @name           autosubmit
// @description    autosubmit
// @include        *
// @require  http://code.jquery.com/jquery-1.8.0.min.js
// @version       1.0
// @history       1.0 Initial release       
// ==/UserScript==
var ONE_SECOND_IN_MILLISECOND=1000;
var ONE_MINUTE_IN_SECOND=60;
var TIME_UNIT_SECOND="s";
var TIME_UNIT_MILLISECOND="ms";
var TIME_UNIT_MINUTE="m";

function AutoSubmit(time,timeUnit){
		if (!timeUnit)timeUnit=TIME_UNIT_SECOND;
		var nTimeInMs=time;
		//Don't use the break; instructions into the following switch
		switch(timeUnit){
				case TIME_UNIT_MINUTE:
					nTimeInMs *=ONE_MINUTE_IN_SECOND;
				case TIME_UNIT_SECOND:
					nTimeInMs *=ONE_SECOND_IN_MILLISECOND; 
				case TIME_UNIT_MILLISECOND:
					//Do nothing;				
			}
		this.timer=window.setTimeout(
					function(){
							$('.next a').click();
					}
					,nTimeInMs);
	}
	
$(document).ready(function(){
  AutoSubmit(Math.floor((Math.random()*60)+30)*1000,"ms");
});

