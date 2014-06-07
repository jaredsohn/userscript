// ==UserScript==
// @name           test
// @version        0.49
// @license        GPLv3 : http://www.gnu.org/licenses/gpl-3.0.txt
// @author         test
// @description    test
// @include        https://www.google.com/analytics/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/gierschv/jQuery-plugin-fireEvent/master/jquery.fireEvent.js
// ==/UserScript==

(function() {
    var dumpAnnotations = function() {
        var dumpAnnotationsProcess = function() {
            var annotationsArray = [];
            $('.C_ANNOTATIONS_LIST > tbody:eq(1) > tr').each(function(idx, elem) {
                if ($(elem).find('input[type="checkbox"]').attr('checked') != undefined)
                {
                    annotationsArray.push({
                        date: $(elem).find('.C_ANNOTATIONS_DATE').text(),
                        text: $(elem).find('.C_ANNOTATIONS_TEXT > span:eq(1)').text(),
                        isPrivate: $(elem).find('.C_ANNOTATIONS_ACCESS_LABEL').css('display') == 'block'
                    });
                }
            });
            localStorage.setItem('annotations', JSON.stringify(annotationsArray));
            $('.C_ANNOTATIONS_MANAGER_WRAPPER').html(' |&nbsp; ' + annotationsArray.length + ' annotations are into localstorage.')
                                               .removeClass('C_ANNOTATIONS_LINKS_DISPLAYED');
        };

        dumpAnnotationsProcess();
        return false;
    };

    var showAnnotations = function() {
        var annotationsArray = localStorage.getItem('annotations');
        if (!annotationsArray)
            return false;
        var str = "List of annotations stored in localstorage :\n";
        annotationsArray = JSON.parse(annotationsArray);
        for (var i = 0 ; i < annotationsArray.length ; ++i)
        {
            str += annotationsArray[i].date;
            if (annotationsArray[i].isPrivate)
                str += " [private]"
            str += ": " + annotationsArray[i].text + "\n";
        }
        alert(str);
        return false;
    };

    var exportAnnotations = function() {
        var outputCSV = "Date,Text,Creator,Is Private\r\n", line = "";
        $('.C_ANNOTATIONS_LIST > tbody:eq(1) > tr').each(function(idx, elem) {
            if ($(elem).find('input[type="checkbox"]').attr('checked') != undefined)
            {
                line = '"' + $(elem).find('.C_ANNOTATIONS_DATE').text() + '"';
                line += ',"' + $(elem).find('.C_ANNOTATIONS_TEXT > span:eq(1)').text().replace(/"/g, '""') + '"';
                line += ',"' + $(elem).find('.C_ANNOTATIONS_CREATOR').text() + '"';
                line += ',"' + ($(elem).find('.C_ANNOTATIONS_ACCESS_LABEL').css('display') == 'block' ? 'Yes' : 'No') + '"';
                line += "\r\n";
                outputCSV += line;
            }
        });
        window.open('data:text/csv;charset=utf8,' + encodeURIComponent(outputCSV));
    };
    
    var pasteAnnotationsFill = function(annotation)
    {
        var form = $('.C_ANNOTATIONS_TABLE_WRAPPER > form');
        $(form).find('input[name="date"]').val(annotation.date);
        alert(annotation.date);
        $(form).find('textarea[name="text"]').val("brrrr");
        if (annotation.isPrivate)
            $(form).find('input[name="access"]').val('PRIVATE');
        $(form).find('textarea[name="text"]').fireEvent('click', {button:1});
        $('.C_ANNOTATIONS_SAVE_BUTTON').fireEvent('click', {button:1});
    }

    var pasteAnnotations = function() {
        var annotationsArray = localStorage.getItem('annotations');
        if (!annotationsArray)
            return false;
        annotationsArray = JSON.parse(annotationsArray);

     
                annotationsArray.push({
                     date: "Oct 22, 2011",
                    text: "yes",
                    isPrivate: 0
                });
                  annotationsArray.push({
                    date: "Oct 22, 2011",
                    text: "yess sss s",
                    isPrivate: 0
                });

                annotationsArray.push({
                     date: "Oct 22, 2011",
                    text: "yee ss",
                    isPrivate: 0
                });

        var pasteAnnotationsCurrent = 0;
        $(document).bind('DOMAttrModified', function(event) {
            if (event.newValue == 'C_ANNOTATIONS_CREATE_NEW C_ANNOTATIONS_BUTTON disabled')
            {
                pasteAnnotationsFill(annotationsArray[pasteAnnotationsCurrent]);
                pasteAnnotationsCurrent++;
                if (pasteAnnotationsCurrent == annotationsArray.length)
                {
                    $(document).unbind('DOMAttrModified');
                    return true;
                }
                $('.C_ANNOTATIONS_CREATE_NEW').fireEvent('click', {button:1});
                return true;
            }
        });
       
        $('.C_ANNOTATIONS_CREATE_NEW').fireEvent('click', {button:1});
    };
    
    var cancelCpyAnnotations = function() {
        localStorage.removeItem('annotations');
        $('.C_ANNOTATIONS_MANAGER_WRAPPER').remove();
        displayLinks();
    };
    
    var removeAnnotations = function() {
        if (!confirm('Remove these annotations ?'))
            return false;
        unsafeWindow.orig_confirm = unsafeWindow.confirm;
        unsafeWindow.confirm = function() { return true; };
        $('.C_ANNOTATIONS_LIST > tbody:eq(1) > tr').each(function(idx, elem) {
            if ($(elem).find('input[type="checkbox"]').attr('checked') != undefined)
            {
                $(this).find('.C_ANNOTATIONS_EDIT_CELL > a').fireEvent('click', {button:1});
                $('.C_ANNOTATIONS_DELETE_BUTTON:eq(1)').fireEvent('click', {button:1});
            }
        });
        unsafeWindow.confirm = unsafeWindow.orig_confirm;
        return true;
    };
    
    var displayLinks = function() {
        if ($('.C_ANNOTATIONS_LINKS_DISPLAYED').length > 0)
            return false;
        $('.C_ANNOTATIONS_MANAGER_WRAPPER').remove();
        
        var annotationsArray = localStorage.getItem('annotations');
        if (annotationsArray && (annotationsArray = JSON.parse(annotationsArray).length) > 0)
        {
            $('.C_ANNOTATIONS_CREATE_NEW').parent().append('<span class="C_ANNOTATIONS_MANAGER_WRAPPER C_ANNOTATIONS_LINKS_DISPLAYED">\
                                                            |&nbsp;<a class="C_ANNOTATIONS_PASTE C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">Paste ' +
                                                                annotationsArray + ' annotation(s)</a>\
                                                            |&nbsp;<a class="C_ANNOTATIONS_SHOW C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">Show annotation(s) in localstorage</a>\
                                                            |&nbsp;<a class="C_ANNOTATIONS_CANCELCPY C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">Cancel copy</a>\
                                                            </span>');
            $('.C_ANNOTATIONS_PASTE').click(pasteAnnotations);
            $('.C_ANNOTATIONS_SHOW').click(showAnnotations);
            $('.C_ANNOTATIONS_CANCELCPY').click(cancelCpyAnnotations);
            return true;
        }
        
        $('.C_ANNOTATIONS_CREATE_NEW').parent().append('<span class="C_ANNOTATIONS_MANAGER_WRAPPER C_ANNOTATIONS_LINKS_DISPLAYED">\
                                                        | <a class="C_ANNOTATIONS_COPY C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">Copy annotation(s)</a>\
                                                        | <a class="C_ANNOTATIONS_REMOVE C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">Remove annotation(s)</a>\
                                                        | <a class="C_ANNOTATIONS_EXPORT C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">Export annotation(s) as CSV</a>\
                                                        |&nbsp;\
                                                            Select :\
                                                            <a class="C_ANNOTATIONS_SELECT_ALL C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">All</a>\
                                                            | <a class="C_ANNOTATIONS_SELECT_NONE C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">None</a>\
                                                        </span>');
        $('.C_ANNOTATIONS_LIST > tbody:eq(1) > tr').append('<td class="C_ANNOTATIONS_COPY_CHCKBX"><input type="checkbox" /></td>');

        $('.C_ANNOTATIONS_SELECT_ALL').click(function(){ $('.C_ANNOTATIONS_COPY_CHCKBX > input[type="checkbox"]').attr('checked', true); });
        $('.C_ANNOTATIONS_SELECT_NONE').click(function(){ $('.C_ANNOTATIONS_COPY_CHCKBX > input[type="checkbox"]').attr('checked', false); });
        
        $('.C_ANNOTATIONS_COPY').click(dumpAnnotations);
        $('.C_ANNOTATIONS_REMOVE').click(removeAnnotations);
        $('.C_ANNOTATIONS_EXPORT').click(exportAnnotations);
        
        return true;
    };

    $(document).bind('DOMNodeInserted', function(event) {
        if (event.target.className.indexOf('C_ANNOTATIONS') >= 0)
        {
            if (event.target.className.indexOf('editable') >= 0)
            {
                $('.C_ANNOTATIONS_MANAGER_WRAPPER').remove();
                $('.C_ANNOTATIONS_COPY_CHCKBX').remove();
            }
            displayLinks();
        }
    });
})();