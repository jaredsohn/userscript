// ==UserScript==
// @name       ClockingIT Grouped Hour Totals
// @namespace  http://igdit.com
// @version    0.1
// @description  Appends the combined total/estimated task hours next to each grouping in a view, as set by View >> Group By (based on tasks listed in '1w 1d 1h 1m' format)
// @match      http://*.clockingit.com/tasks/list*
// @copyright  2013+, Eric Dooley
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

function _timePartsToMins(parts) {
    taskMins = 0;
    for(var i = 0; i < parts.length; i++) {
        var reg = /([0-9]+)([wdhm])/g;
        var mch = reg.exec(parts[i]);
        var num = parseInt(mch[1]);
        var factor = 1;
        if(mch[2] == 'h') {
            factor = 60;
        } else if(mch[2] == 'd') {
            factor = 8*60;
        } else if(mch[2] == 'w') {
            factor = 5*8*60;
        }
            
            taskMins += num * factor;
    }
    return taskMins;
}

$('.task-group').each(function() {
    var groupEstim = 0;
    var groupActual = 0;
    $(this).find('.task-name').each(function() {
        var match, regex, str;
        str = $(this).find('span[id^="todo"]').next().text();
        regex = /\(([0-9wdhm ]+) \/ ([0-9wdhm ]+)\)/g;
        match = regex.exec(str);
        if(match) {
            groupActual += _timePartsToMins(match[1].split(' '));
            groupEstim += _timePartsToMins(match[2].split(' '));
        }
    });
    var overtime = '';
    if(groupActual > groupEstim) {
        overtime = ' class="overtime"';
    }
    actualHrs = Math.round((groupActual / 60.0) * 100) / 100;
    estimHrs = Math.round((groupEstim / 60.0) * 100) / 100;
    $(this).find('.tag_header').attr('style', 'display:inline').after('<span' + overtime + '> (' + actualHrs + 'h / ' + estimHrs + 'h)</span>');
});
