// ==UserScript==
// @name           autosubmityh
// @description    autosubmityh
// @include        http://ph.news.yahoo.com/pitongpinoy/*
// @version       1.0
// @history       1.0 Initial release       
// ==/UserScript==
var ONE_SECOND_IN_MILLISECOND=1000;
var ONE_MINUTE_IN_SECOND=60;
var TIME_UNIT_SECOND="s";
var TIME_UNIT_MILLISECOND="ms";
var TIME_UNIT_MINUTE="m";

///<summary>
///Start the timer to submit
///</summary>
///<param name="time">Time before to submit the form</param>
///<param name="timeUnit">Unit use to defines the time(s/ms/m)</param>
function AutoSubmit(time,timeUnit){
                 document.getElementById("2c829cc6-bd93-333b-91d6-b3a012000a4e-choice1").checked = True;
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
							var btn=document.getElementById("yui_3_5_1_1_1344878910933_1233");
							if (btn.length>0)btn[0].click();						
						}
					,nTimeInMs);
	}
	
window.onload = AutoSubmit(2500,"ms");