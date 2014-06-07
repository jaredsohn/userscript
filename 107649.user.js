// ==UserScript==
// @name            More Descriptive GitHub Datestamps
// @version         2011.07.22.002
// @namespace       http://glomerate.com
// @description     Changes "17 hours ago" to "Thu Jun 21 2011 at 3:12 pm"
// @include         *github.com*
// ==/UserScript==

(function(){

    exec(function() {

        $('time').each(function() {
            var formatted_date = formatTimeAndDate($(this).attr('datetime'));

            $(this).removeClass('js-relative-date').text(formatted_date);
        });

        function formatTimeAndDate(datestamp) {
            var d = new Date(datestamp);

            return formatDate(d) + ' at ' + formatTime(d);
        }

        function formatDate(d) {
            var today = new Date();
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            return today.toDateString() == d.toDateString() ?
                'Today' : yesterday.toDateString() == d.toDateString() ?
                'Yesterday' : d.toDateString();
        }

        function formatTime(d) {
            var hr = d.getHours();
            var min = d.getMinutes();
            var ampm = hr < 12 ? 'am' : 'pm';

            hr = hr == 0 ? 12 : hr > 12 ? hr - 12 : hr;

            return pad(hr) + ':' + pad(min) + ' ' + ampm;
        }

        function pad(i) {
            return i < 10 ? '0' + i : i;
        }

    });

    function exec(fn) {
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.textContent = '(' + fn + ')();';
        document.body.appendChild(script); // run the script
    }

})();