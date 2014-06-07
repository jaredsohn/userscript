// ==UserScript==
// @name        jenkins-console-ansi-color
// @description Add ansi color support for jenkins console
// @version     1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function () {
    // base on work of mmalecki (https://github.com/mmalecki/ansispan)

    var ansispan = function (str) {
        var start = str; 

        Object.keys(ansispan.foregroundColors).forEach(function (ansi) {
            var span = '<span style="color: ' + ansispan.foregroundColors[ansi] + '">';
            
            str = str.replace(
                new RegExp('\033\\[' + ansi + 'm', 'g'),
                span
            ).replace(
               new RegExp('\033\\[\\d+;' + ansi + 'm', 'g'),
               span
            );

		var span = '<span style="font-weight: bold; color: ' + ansispan.foregroundColors[ansi] + '">';

            str = str.replace(
                new RegExp('\033\\[' + ansi + ';1m', 'g'),
                span
            ).replace(
               new RegExp('\033\\[\\d+;' + ansi + ';1m', 'g'),
               span
            );
        });

        str = str.replace(/\033\[1m/g, '<b>').replace(/\033\[22m/g, '</b>');

	str = str.replace(/\033\[30;42m\033\[2K/g, '<span style="color: green">');

        str = str.replace(/\033\[3m/g, '<i>').replace(/\033\[23m/g, '</i>');

        str = str.replace(/(\033\[m)|(\033\[39m)|(\033\[0m)|(\033\[2K)/g, '</span>');

	if (start !== str) {
            return ansispan(str);
        }

	return str;
    };

    ansispan.foregroundColors = {
        '30': '#CCCCCC',
        '31': 'red',
        '32': 'green',
        '33': '#A58108',
        '35': 'purple',
        '36': '#168484',
        '37': 'white'
    };

    var colorContent = function ($element) {
            $element.addClass('consoleColored').html(
                ansispan($element.html())
            );
        },
        colorAllTimeout = function () {
            $('#main-panel pre:not(.consoleColored)').each(function () {
                colorContent($(this));
        });

        window.setTimeout(colorAllTimeout, 500);
    };

    $('head').append('');

    colorAllTimeout();
});


