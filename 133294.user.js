// ==UserScript==
// @name           FitocracyExport
// @namespace      FitocracyExport
// @description   Export workouts
// @include        http://www.fitocracy.com/*
// @include        https://www.fitocracy.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

var WorkoutExport = {
    Init: function()
    {
		if (window.location.href.indexOf("/entry/") > 0)
		{	
			// add date to top
			var bbCode = "[b]" + workoutDate.substring(0,10)  + "[/b]\n";
			bbCode += "\n";
			
			// default to imperial
			var setClass = '.set_user_imperial';
			
			// change to metric if it is hidden
			if ( $('.set_user_imperial').css('display') == "none" )
			{
				setClass = '.set_user_metric';
			}
			
			var workout = $('.action_detail').contents();
			
			$('.action_detail > li').each(function(index)
			{
				// save $(this)
				var tmpThis = $(this);
				
				// save exercise
				bbCode += "[b]" + $(this).children('.action_prompt').text().replace(':','') + "[/b]\n";
				
				// do the sets
				$(this).find(setClass).each(function()
				{
					var setText = $(this).text().replace(' reps', '');
					var setReps = setText.split(' x ')[0];
					var setWeight = setText.split(' x ')[1];
					
					// if our weight was undefined, use bodyweight
					if ( !setWeight )
					{
						setWeight = "BW";
					}
					else
					{
						// weight was defined, add 's' to the end
						// to pluralize weight (lbs instead of lb)
						setReps += "s";
					}
					
					// add PRs
					if( $(this).parent('li.pr').size() )
					{
						setReps += " (PR!)";
					}
					
					// contact together
					bbCode += setWeight + "x" + setReps + "\n";
				});
				
				// add comments if needed
				if ( $(this).find('.stream_note').size() )
				{
					bbCode += "[i]" + $(this).find('.stream_note').text() + "[/i]\n";
				}
				
				// newline formatting
				bbCode += "\n";
			});
			//alert(bbCode);
			// float the bbcode textarea at the top and trip leading/trailling whitespace
			$('#hero_copy_workout').after("<textarea style='width:300px;height:100%;position:absolute;'>" + bbCode.trim() + "</textarea>");
		}
	},
};

// grab date before styles load
var workoutDate = $(".action_time").text();

// add delay so styles are updated first
$(document).ready( function()
{
    // generate workout bbCode
	setTimeout(WorkoutExport.Init(),250);
});