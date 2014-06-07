// ==UserScript==
// @name       Reddit Sidebar Toggle
// @namespace  http://dearinternet.com
// @version    0.9
// @description  Adds a toggle arrow to the reddit sidebar.
// @match      http://*.reddit.com/*
// @copyright  2012+, Rohaq
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var arrow_left_data     = 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAYAAACjkdXHAAAABmJLR0QA/wD/AP+gvaeTAAAAoklEQVQ4y6XVsQ3DIBBA0Q/0zgIeBA+SPRiTCTwBEzBBGifBsYG7CxISFO+LAoFDOVJK63vtDHA7tiUY4BN4ANUb4AasAN4Kp3gEh3gGu1gCb7EUXrAGnrAWfrAFAngrbI+9NhMtLs0Uj5BzrjHGClRgOS79MnE7sAcAQ+CLDYEzVgauWBG4x8JAHwsCYzwJzPEgUES4Eyiqp/cnUIDi/vkxXnLjdxElITQPAAAAAElFTkSuQmCC';
var arrow_right_data    = 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAYAAACjkdXHAAAABmJLR0QA/wD/AP+gvaeTAAAAq0lEQVQ4y53V6wmEMBBF4bOXLSNbiIXYR0qZPrYQC9kUsn8SCJLHjIGgBr6j+MBXzjlRh5kVAkPABziAow95car4jAZUt48C6vbDAd2OQwEN1twBTdZdAS2uahvQ5p4sA3I8kWlAzvdhGHgH3sYWACDnfInYSN0kiks3Q7gAF/AFLjMregq9Zx5CD57CHV7CFd7CGXbBEXbDOw7BHodh+zAaJAIb/tUZ/mP8Aea1ZQPCC02PAAAAAElFTkSuQmCC';

var toggle_link_content = '<div style="float: right; padding: 3px; margin: 10px; border-style: solid; border-width: 1px; border-color: lightgray;"><a href="#" class="link_toggle_sidebar"></a></div>';

$('div.side > .spacer').hide();
$('div.side').append( toggle_link_content );
$('a.link_toggle_sidebar').html('<img src="data:image/png;base64,' + arrow_left_data + '">');

$('a.link_toggle_sidebar').click(function() {
    if ( $('div.side > .spacer').is(":visible") ) {
        $('a.link_toggle_sidebar').html('<img src="data:image/png;base64,' + arrow_left_data + '">');
    } else {
        $('a.link_toggle_sidebar').html('<img src="data:image/png;base64,' + arrow_right_data + '">');
    }
    $('div.side > .spacer').toggle();
});