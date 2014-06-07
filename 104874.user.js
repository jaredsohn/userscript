// ==UserScript==
// @namespace http://www.deeson.co.uk
// @name Sum effort in basecamp todo lists
// @version 1.0
// @description Sums the story points within a basecamp todo list. These are numbers in square brackets
// @include https://*.basecamphq.com/projects/*/todo_lists
// @include https://*.basecamphq.com/projects/*/todo_lists/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var story_point_regex = new RegExp(/\[(\d*)\]/);
var iteration_title_regex = new RegExp(/^Iteration|^Backlog/);

$(".list_wrapper").each(

	function(index) {
		var n = 0;
		var iteration_points = 0;
		var iteration_ref = null;
		
		$(".items > .item_wrapper", this).each(
			
			// run this for each task in the todo list
			function (index) {
				var record = $(this).attr("record");
				var iteration_el = $("span#item_wrap_" + record, this);
				var task_text = iteration_el.text();
				var reg_op = story_point_regex.exec(task_text);
				if (reg_op != null) {
					n = n + parseInt(reg_op[1]);
					if (iteration_ref != null) {
						iteration_points += parseInt(reg_op[1]);
					}
				} else {
					if (task_text.match(iteration_title_regex)) {
						if (iteration_ref != null) {
							iteration_ref.append(" [" + iteration_points + "]");
						}
						iteration_ref = iteration_el;
						iteration_points = 0;
					}
				}
			}
			
		);
		
		if (n > 0) {
			$(".list_title > h2 > span > a" ,this).append(" [" + n + "]");
			$(".title_text" ,this).append(" [" + n + "]");
		}
		
		if (iteration_ref != null && iteration_points > 0) {
			iteration_ref.append(" [" + iteration_points + "]");
		}
		iteration_ref = null;
		iteration_points = 0;	
	}

);

$(".page_header > h1").prepend("Agile ");