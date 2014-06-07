// ==UserScript==
// @name         Penncal
// @version      1.0
// @description  Add ical download to upenn calendar
// @require      http://eligrey.github.io/FileSaver.js/FileSaver.js
// @match        https://*.upenn.edu/reports/academic_affairs/list_classes_all.php?*
// @grant        none
// ==/UserScript==

$(function() {
  
    /**
     * DATE HELPERS
     */
    
    var lpad = function(n) {
        return ('0' + n).slice(-2);
    };
    
    var fmt_date = function(d) {
        return d.getFullYear() + '-' + lpad(d.getMonth() + 1) + '-' + lpad(d.getDate());
    };
    
    var date_sec = function(d) {
        return Math.floor(d.getTime() / 1000);
    };
    
    /**
     * EVENT HANDLERS
     */
    
    var download_calendar = function() {
        var ds = new Date(Date.parse(download_selection.find('#download_start_date').val()));
        var de = new Date(Date.parse(download_selection.find('#download_end_date').val()));
        if (!ds || !de) {
            download_selection.find('#download_start_date').val(fmt_date(download_start));
            download_selection.find('#download_end_date').val(fmt_date(download_end));
            return;
        }
        
        var qyear = now.getMonth() > 6 ? now.getFullYear() : now.getFullYear() - 1;
        var rURL = 'classdata.php?syear=' + qyear + '&course=ALL&sid=' + sid + '&start=' + date_sec(ds) + '&end=' + date_sec(de);
        $.getJSON(rURL, build_calendar);
    };
    
    var build_calendar = function(data) {
        var result = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//penncal\n'
        var dtre = /(-|:)/g
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var event = data[i];
            var entry = 'BEGIN:VEVENT\n'
            + 'DTSTART:' + event.start.replace(dtre, '') + '\n'
            + 'DTEND:' + event.end.replace(dtre, '') + '\n'
            + 'SUMMARY:' + event.title + '\n'
            + 'END:VEVENT\n';
            result += entry;
        }
        result += 'END:VCALENDAR';
        var blob = new Blob([result], {type: 'text/plain'});
        saveAs(blob, 'penncal.ics');
    };
    
    /**
     * DOM MANIPULATION
     */
    
    // Make elements for insertion
    var calendar_selection = $('#calendar_selection');
    var download_selection = $('<div id="download_selection" class="sixcol">' + 
                               '<strong>Download iCalendar:</strong><br>' +
                               'Start Date: <input type="text" class="input_field_gray hasDatepicker" id="download_start_date" name="download_start_date"><br>' +
                               'End Date: <input type="text" class="input_field_gray hasDatepicker" id="download_end_date"   name="download_end_date"  ><br>' +
                               '<button class="submit_button_small">Download</button>' +
                               '</div>');
    download_selection.find('button').click(download_calendar);
    
    var sid = calendar_selection.find('[name=sid]').val();
    var now = new Date();
    var download_start = new Date(now.getFullYear(), now.getMonth() > 6 ? 7 : 0);
    var download_end = new Date(now.getMonth() > 6 ? now.getFullYear() + 1 : now.getFullYear(), now.getMonth() > 6 ? 0 : 6);
    download_selection.find('#download_start_date').val(fmt_date(download_start));
    download_selection.find('#download_end_date').val(fmt_date(download_end));
    calendar_selection.before(download_selection);
    
});