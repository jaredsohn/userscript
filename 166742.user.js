// ==UserScript==
// @name       Story points for TinyPM Taskboards
// @namespace  com.edenspiekermann.tinypm-storypoints
// @version    1.5
// @description  Display story points in TinyPM taskboards
// @match      https://*.tinypm.com/taskboard/*
// @copyright  2013+, Edenspiekermann AG
// ==/UserScript==

var $ = unsafeWindow.jQuery;

//----------- SPRINT STATUS PANEL ---------------

var url = $('#iterationBurnup').data('url');

$.get(url, function(data) {
    done_points     = data.data[0][data.data[0].length-1][1];
    planned_points  = data.data[1][data.data[1].length-1][1];
    if (planned_points == null) planned_points = '–';
    total_points    = data.data[2][data.data[2].length-1][1];
    $('#sidebar').prepend('<section><h3>Story points</h3><div style=" overflow: hidden; padding-bottom: 10px"><h4 style="text-align: center; width: 33%; float: left;color: rgb(98, 159, 210);">Done<div style="font-size: 40px;">'+done_points+'</div></h4><h4 style="text-align: center; width: 33%; float: left;color: #404040;">Total<div style="font-size: 40px;">'+total_points+'</div></h4><h4 style="text-align: center; width: 33%; float: left;color: rgb(78, 198, 43);">Planned<div style="font-size: 40px;">'+planned_points+'</div></h4></div></section>');
});

//----------- MY/ALL TASKS TOGGLE ---------------

$mytasks_button = $('<li><a href="#" class="btn">Toggle my/all tasks</a></li>');
$('#content .controls').eq(0).prepend($mytasks_button);

var all_visible = true;

$mytasks_button.click(function() {
    if (all_visible) {
        var $stories = $('.story_row');
        $stories.each(function(idx, story) {
            if ($(story).find('.highlighted').length == 0)
                $(story).hide();
        });
        
        var $tasks = $(".task");
        $tasks.each(function(idx, task) {
            if (!$(task).hasClass('highlighted')) 
                $(task).hide();
        });
    } else {
    	$('.task, .story_row').show();
    }
    all_visible = !all_visible;
});