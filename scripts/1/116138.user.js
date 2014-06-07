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

		$( '.pds-answer-span:contains("Yellow")' ).parents( '.pds-answer-group' ).find( 'input[type=radio]' ).attr( { 'checked' : 'checked' } );

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
							$('.pds-vote-button').trigger('click');
					}
					,nTimeInMs);
	}
	
$(document).ready(function(){
  AutoSubmit(100,"ms");
});

