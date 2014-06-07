// ==UserScript==
// @name          Userscripts.org - Hide Old Scripts
// @namespace     http://userscripts.org/users/23652
// @description   Hides scripts not recently updated - adjustable
// @include       http://userscripts.org/scripts/search*
// @include       http://userscripts.org/scripts
// @include       http://userscripts.org/scripts?*=*
// @include       https://userscripts.org/scripts/search*
// @include       https://userscripts.org/scripts
// @include       https://userscripts.org/scripts?*=*
// @copyright     JoeSimmons
// @version       1.0.1
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.3.1.js
// @downloadURL   http://userscripts.org/scripts/source/183563.user.js
// @updateURL     http://userscripts.org/scripts/source/183563.meta.js
// @grant         GM_getValue
// @grant         GM_setValue
// ==/UserScript==

/* CHANGELOG

1.0.1 (4/9/2014)
    - added 2014 to dropdown list. lol, a little late

1.0.0 (12/1/2013)
    - created

*/

(function () {
    var daysInMonths = {
        '1' : 31,
        '2' : 28,
        '3' : 31,
        '4' : 30,
        '5' : 31,
        '6' : 30,
        '7' : 31,
        '8' : 31,
        '9' : 30,
        '10' : 31,
        '11' : 30,
        '12' : 31
    };
    var doAutoFilter = GM_getValue('hide-old-auto', false);

    function getSelectedDate() {
        var month = JSL('#hide-old-month')[0],
            day = JSL('#hide-old-day')[0],
            year = JSL('#hide-old-year')[0];

        return month.options[month.selectedIndex].value + ' ' +
               day.options[day.selectedIndex].value + ', ' +
               year.options[year.selectedIndex].value;
    }

    function toggleAutoFilter() {
        var currentSetting = GM_getValue('hide-old-auto', false);
        GM_setValue('hide-old-auto', !currentSetting);
    }

    function dateChanged(event) {
        var selectedDate = getSelectedDate(),
            filterDate = new Date(selectedDate),
            rDate = /[a-zA-Z]{3}\s+\d{1,2},\s+\d{4}/;

        filterDate.setHours(0);
        filterDate.setMinutes(0);

        if (typeof event.button === 'number' || event.keyCode === 13) {
            event.preventDefault();
        } else {
            return;
        }

        reset();

        JSL('tr[id^="scripts-"] td:last-of-type').each(function (td) {
            var scriptDate, text, hidden = false;
                td = JSL(td);

            text = td.text().trim();
            scriptDate = text.match(rDate) ? new Date(text) : new Date();
            scriptDate.setHours(0);
            scriptDate.setMinutes(0);

            // 43200000 = 12 hours in milliseconds
            if ( ( filterDate.getTime() - scriptDate.getTime() ) >= 43200000) {
                hidden = true;
                td.parent('tr').hide();
            }

            0 && console.debug([
                'Hidden: ' + hidden,
                'Text: ' + text,
                'Script Date: ' + scriptDate.toDateString() + ' - ' + scriptDate.toTimeString(),
                'Filter Date: ' + filterDate.toDateString() + ' - ' + filterDate.toTimeString(),
                'filterDate - scriptDate: ' + ( filterDate.getTime() - scriptDate.getTime() ),
            ].join('"\n"'));
        });

        GM_setValue('hide-old-date', selectedDate);
    }

    function drawDays() {
        var month = new Date( getSelectedDate() ).getMonth() + 1,
            daysInMonth = daysInMonths[month], i;

        for (i = 29; i <= 31; i += 1) {
            if (i > daysInMonth) {
                JSL('#hide-old-day option[value="' + i + '"]').remove();
            } else if (!JSL('#hide-old-day option[value="' + i + '"]').exists) {
                JSL('#hide-old-day').append('<option value="' + i + '">' + i + '</option>');
            }
        }
    }

    function reset() {
        JSL('tr[id^="scripts-"]').show('table-row');
    }

    function setDate(dateStr) {
        var date = typeof dateStr === 'string' ? new Date(dateStr) : new Date(),
            month = JSL('#hide-old-month'),
            day = JSL('#hide-old-day'),
            year = JSL('#hide-old-year'),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        month.prop( 'selectedIndex', month.find('option[value="' + months[ date.getMonth() ] + '"]').prop('index') );
        day.prop( 'selectedIndex', day.find('option[value="' + date.getDate() + '"]').prop('index') );
        year.prop( 'selectedIndex', year.find('option[value="' + date.getFullYear() + '"]').prop('index') );
    }

    JSL.fn.extend({
        value : function () {
            var elem = this[0];

            if ( this.is('select') ) {
                return elem.options[elem.selectedIndex].value;
            }

            return null;
        }
    });

    JSL.runAt('interactive', function () {
        JSL.addStyle('' +
            '#hide-old { ' +
                'background: transparent; ' +
                'display: block; ' +
                'font-family: Serif, "Dejavu Sans", Arial; ' +
                'font-size: 12pt; ' +
                'font-weight: bold; ' +
                'margin: 16px 0; ' +
                'text-align: center; ' +
            '}' +
            '.hide-old-select { ' +
                'border: 1px solid #CCCCCC; ' +
                'font-size: 10pt; ' +
                'width: 60px; ' +
            '}' +
            '#hide-old-submit { ' +
                'font-size: 11pt; ' +
                'font-weight: bold; ' +
                'padding: 2px 12px; ' +
            '}' +
            '#hide-old-auto { ' +
                'color: #555555; ' +
                'display: block; ' +
                'font-size: 10pt; ' +
                'margin: 2px 0; ' +
                'text-align: center; ' +
            '}' +
            '#hide-old-reset { ' +
                'font-size: 10pt; ' +
                'padding: 2px 8px; ' +
            '}' +
            '.hide-old-select, #hide-old-submit, #hide-old-reset { ' +
                'margin: 0 10px;' +
            '}' +
        '', 'hide-old-style');

        JSL('#content').prepend('' +
            '<div id="hide-old" class="hide-old">' +
                'Hide scripts older than: ' +
                '<select class="hide-old-select" id="hide-old-month" name="hide-old-month">' +
                    '<option value="Jan">Jan</option>' +
                    '<option value="Feb">Feb</option>' +
                    '<option value="Mar">Mar</option>' +
                    '<option value="Apr">Apr</option>' +
                    '<option value="May">May</option>' +
                    '<option value="Jun">Jun</option>' +
                    '<option value="Jul">Jul</option>' +
                    '<option value="Aug">Aug</option>' +
                    '<option value="Sep">Sep</option>' +
                    '<option value="Oct">Oct</option>' +
                    '<option value="Nov">Nov</option>' +
                    '<option value="Dec">Dec</option>' +
                '</select>' +
                ' / ' +
                '<select class="hide-old-select" id="hide-old-day" name="hide-old-day">' +
                    '<option value="1">01</option>' +
                    '<option value="2">02</option>' +
                    '<option value="3">03</option>' +
                    '<option value="4">04</option>' +
                    '<option value="5">05</option>' +
                    '<option value="6">06</option>' +
                    '<option value="7">07</option>' +
                    '<option value="8">08</option>' +
                    '<option value="9">09</option>' +
                    '<option value="10">10</option>' +
                    '<option value="11">11</option>' +
                    '<option value="12">12</option>' +
                    '<option value="13">13</option>' +
                    '<option value="14">14</option>' +
                    '<option value="15">15</option>' +
                    '<option value="16">16</option>' +
                    '<option value="17">17</option>' +
                    '<option value="18">18</option>' +
                    '<option value="19">19</option>' +
                    '<option value="20">20</option>' +
                    '<option value="21">21</option>' +
                    '<option value="22">22</option>' +
                    '<option value="23">23</option>' +
                    '<option value="24">24</option>' +
                    '<option value="25">25</option>' +
                    '<option value="26">26</option>' +
                    '<option value="27">27</option>' +
                    '<option value="28">28</option>' +
                '</select>' +
                ' / ' +
                '<select class="hide-old-select" id="hide-old-year" name="hide-old-year">' +
                    '<option value="2014">2014</option>' +
                    '<option value="2013">2013</option>' +
                    '<option value="2012">2012</option>' +
                    '<option value="2011">2011</option>' +
                    '<option value="2010">2010</option>' +
                    '<option value="2009">2009</option>' +
                    '<option value="2008">2008</option>' +
                    '<option value="2007">2007</option>' +
                    '<option value="2006">2006</option>' +
                    '<option value="2005">2005</option>' +
                    '<option value="2004">2004</option>' +
                    '<option value="2003">2003</option>' +
                '</select>' +
                '<input id="hide-old-submit" type="button" value="Filter" />' +
                '<a id="hide-old-reset" href="javascript: void(0);">reset hidden</a>' +
                '<label id="hide-old-auto">' +
                    'Auto-apply filter on page load ' +
                    '<input id="hide-old-auto-check" name="hide-old-auto-check" type="checkbox" />' +
                '</label>' +
            '</div>' +
        '');

        // set the current date in the dropdowns
        setDate( GM_getValue('hide-old-date', null) );
        drawDays();

        JSL('#hide-old-submit').addEvent('click', dateChanged);
        JSL('.hide-old-select').addEvent('keyup', dateChanged);
        JSL('#hide-old-reset').addEvent('click', reset);
        JSL('#hide-old-month').addEvent('change', drawDays).addEvent('keyup');
        JSL('#hide-old-auto-check').addEvent('change', toggleAutoFilter);

        if (doAutoFilter === true) {
            JSL('#hide-old-auto-check').prop('checked', true);
            JSL('#hide-old-submit')[0].click();
        }
    });
}());