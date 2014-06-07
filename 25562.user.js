// Version 1.0
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           LOR improver
// @namespace      http://regolit.com
// @description    Changes default value of formatting text dropdown menu.
// @include        http://*.linux.org.ru/add_comment.jsp*
// @include        http://*.linux.org.ru/add.jsp*
// @include        http://linux.org.ru/add_comment.jsp*
// @include        http://linux.org.ru/add.jsp*
// ==/UserScript==

(function ()
{
    /*
     * Other possible values:
     *
     * 'quot' - TeX paragraphs w/quoting
     * 'tex' - TeX paragraphs w/o quoting
     * 'ntobr' - User line break
     * 'html' - Ignore line breaks
     * 'pre' - Preformatted text
     */
    var default_option = 'ntobr';

    var a_mode = document.getElementsByName('mode');
    var len = a_mode.length;
    var i;
    var res = '';
    for (i=0; i<len; i++) {
        var e = a_mode[i];
        if ('SELECT' == e.tagName) {
            var opt_len = e.options.length;
            var j;

            for (j=0; j<opt_len; j++) {
                var option = e.options.item(j);
                if (default_option == option.value) {
                    option.selected = true;
                    break;
                }
            }
        }
        break;
    }

})();
