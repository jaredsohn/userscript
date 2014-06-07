// ==UserScript==
// @name           Google Analytics - Manage profiles annotations
// @version        0.2.5
// @license        GPLv3 : http://www.gnu.org/licenses/gpl-3.0.txt
// @author         Vincent Giersch <mail@vincent.sh>
// @description    Manage annotations of Google Analytics profiles (multiple copy, delete and CSV export). Works only on Google Analytics V5.
// @include        https://www.google.com/analytics/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/gierschv/jQuery-plugin-fireEvent/master/jquery.fireEvent.js
// ==/UserScript==

(function() {
    "use strict";

    var dumpAnnotations = function() {
        var dumpAnnotationsProcess = function() {
            var annotationsArray = [];
            $('#AnnotationsDrawer_list > tbody:eq(1) > tr').each(function(idx, elem) {
                if ($(elem).find('input[type="checkbox"]').attr('checked') !== undefined)
                {
                    annotationsArray.push({
                        date: $(elem).find('td:eq(1)').text(),
                        text: $(elem).find('td:eq(2) > span:eq(1)').text(),
                        isPrivate: $(elem).find('td:eq(2) > span:eq(0)').css('display') === 'block'
                    });
                }
            });
            if (annotationsArray.length === 0) {
                return false;
            }
            localStorage.setItem('annotations', JSON.stringify(annotationsArray));
            $('#AnnotationManagerWrapper').html(' |&nbsp; ' + annotationsArray.length + ' annotations are into localstorage.');
        };

        dumpAnnotationsProcess();
        return false;
    };

    var showAnnotations = function() {
        var annotationsArray = localStorage.getItem('annotations');
        if (!annotationsArray) {
            return false;
        }
        var str = "List of annotations stored in localstorage :\n";
        annotationsArray = JSON.parse(annotationsArray);
        for (var i = 0 ; i < annotationsArray.length ; i++)
        {
            str += annotationsArray[i].date;
            if (annotationsArray[i].isPrivate) {
                str += " [private]";
            }
            str += ": " + annotationsArray[i].text + "\n";
        }
        alert(str);
        return false;
    };

    var exportAnnotations = function() {
        var outputCSV = "Date,Text,Creator,Is Private\r\n", line = "";
        $('#AnnotationsDrawer_list > tbody:eq(1) > tr').each(function(idx, elem) {
            if ($(elem).find('input[type="checkbox"]').attr('checked') !== undefined)
            {
                line = '"' + $(elem).find('td:eq(1)').text() + '"';
                line += ',"' + $(elem).find('td:eq(2) > span:eq(1)').text().replace(/"/g, '""') + '"';
                line += ',"' + $(elem).find('td:eq(4)').text() + '"';
                line += ',"' + ($(elem).find('td:eq(2) > span:eq(0)').css('display') === 'block' ? 'Yes' : 'No') + '"';
                line += "\r\n";
                outputCSV += line;
            }
        });
        window.open('data:text/csv;charset=utf8,' + encodeURIComponent(outputCSV));
    };

    var pasteAnnotationsFill = function(annotation)
    {
        var form = $('#AnnotationsDrawer_list form');
        $(form).find('input[name="date"]').val(annotation.date);
        $(form).find('textarea[name="text"]').val(annotation.text);
        if (annotation.isPrivate) {
            $(form).find('input[name="access"]').val('PRIVATE');
        }
        $(form).find('textarea[name="text"]').fireEvent('click', { button:1 });
        $(form).find('td:eq(6) a:eq(0)').fireEvent('click', { button:1 });
    };

    var pasteAnnotations = function() {
        var annotationsArray = localStorage.getItem('annotations');
        if (!annotationsArray) {
            return false;
        }
        annotationsArray = JSON.parse(annotationsArray);
        var pasteAnnotationsCurrent = 0;
        $(document).bind('DOMAttrModified', function(event) {
            if (event.newValue.indexOf('disabled') >= 0)
            {
                pasteAnnotationsFill(annotationsArray[pasteAnnotationsCurrent]);
                pasteAnnotationsCurrent++;
                if (pasteAnnotationsCurrent === annotationsArray.length)
                {
                    $(document).unbind('DOMAttrModified');
                    return true;
                }
                $('#AnnotationDrawer_controls td:eq(1) a:eq(0)').fireEvent('click', { button:1 });
                return true;
            }
        });

        $('#AnnotationDrawer_controls td:eq(1) a:eq(0)').fireEvent('click', { button:1 });
    };

    var cancelCpyAnnotations = function() {
        localStorage.removeItem('annotations');
        $('#AnnotationManagerWrapper').remove();
        displayLinks();
    };

    var removeAnnotations = function() {
        if (!confirm('Remove these annotations ?')) {
            return false;
        }
        unsafeWindow.orig_confirm = unsafeWindow.confirm;
        unsafeWindow.confirm = function() { return true; };
        $('#AnnotationsDrawer_list > tbody:eq(1) > tr').each(function(idx, elem) {
            if ($(elem).find('input[type="checkbox"]').attr('checked') !== undefined)
            {
                $(this).find('a').fireEvent('click', { button:1 });
                $('#AnnotationsDrawer_list > tbody:eq(1) form td:eq(6) div div:eq(1) a').fireEvent('click', { button:1 });
            }
        });
        unsafeWindow.confirm = unsafeWindow.orig_confirm;
        return true;
    };

    var displayLinks = function() {
        $('#AnnotationManagerWrapper').remove();
        $('.AnnotationManager_chckbx').remove();

        var annotationsArray = localStorage.getItem('annotations');
        if (annotationsArray && (annotationsArray = JSON.parse(annotationsArray).length) > 0)
        {
            $('#AnnotationDrawer_controls td:eq(1)').append('<span id="AnnotationManagerWrapper">\
                                                                            &nbsp;&nbsp; | &nbsp;&nbsp; <a id="AnnotationManager_paste" onclick="return false;" href="#">Paste ' +
                                                                            annotationsArray + ' annotation(s)</a>\
                                                                            &nbsp;&nbsp; | &nbsp;&nbsp; <a id="AnnotationManager_show" onclick="return false;" href="#">Show annotation(s) in localstorage</a>\
                                                                            &nbsp;&nbsp; | &nbsp;&nbsp; <a id="AnnotationManager_cancelcpy" onclick="return false;" href="#">Cancel copy</a>\
                                                                            </span>');
            $('#AnnotationManager_paste').click(pasteAnnotations);
            $('#AnnotationManager_show').click(showAnnotations);
            $('#AnnotationManager_cancelcpy').click(cancelCpyAnnotations);
            return true;
        }

        $('#AnnotationDrawer_controls td:eq(1)').append('<span id="AnnotationManagerWrapper">\
                                                        | &nbsp;&nbsp;<a id="AnnotationManager_copy" onclick="return false;" href="#">Copy annotation(s)</a>\
                                                        &nbsp;&nbsp; | &nbsp;&nbsp;<a id="AnnotationManager_remove" onclick="return false;" href="#">Remove annotation(s)</a>\
                                                        &nbsp;&nbsp; | &nbsp;&nbsp;<a id="AnnotationManager_export" onclick="return false;" href="#">Export annotation(s) as CSV</a>\
                                                        &nbsp;&nbsp; |&nbsp;\
                                                            Select :\
                                                            <a id="AnnotationManager_select_all" onclick="return false;" href="#">All</a>\
                                                            &nbsp;&nbsp;| &nbsp;&nbsp;<a id="AnnotationManager_select_none" onclick="return false;" href="#">None</a>\
                                                        </span>');
        $('#AnnotationsDrawer_list > tbody:eq(1) > tr').append('<td class="AnnotationManager_chckbx"><input type="checkbox" /></td>');

        $('#AnnotationManager_select_all').click(function(){ $('.AnnotationManager_chckbx > input[type="checkbox"]').attr('checked', true); });
        $('#AnnotationManager_select_none').click(function(){ $('.AnnotationManager_chckbx > input[type="checkbox"]').attr('checked', false); });

        $('#AnnotationManager_copy').click(dumpAnnotations);
        $('#AnnotationManager_remove').click(removeAnnotations);
        $('#AnnotationManager_export').click(exportAnnotations);

        return true;
    };

    $(document).bind('DOMNodeInserted', function(event) {
        if (event.target.id.indexOf('AnnotationDrawer') >= 0 || /* Init */
            event.target.className.indexOf('Vp editable') >= 0) /* New element */ {
            displayLinks();
        }
    });
})();
