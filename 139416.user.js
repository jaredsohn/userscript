// ==UserScript==
// @name       GitHub Files View Enhancement 
// @namespace  jpi
// @version    0.8
// @description  
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match      https://github.etsycorp.com/*/pull/*
// @match      https://github.etsycorp.com/*/commit/*
// @match      https://github.etsycorp.com/*/compare/*
// @match      https://*github.com/*/pull/*
// @match      https://*github.com/*/commit/*
// @match      https://*github.com/*/compare/*
// @copyright  2012
// ==/UserScript==
(function($) {
    var filelist = new Array(),
        diff_data = new Array(),
        viewed_comments = {
            comments: new Array(),
            counts: new Array()
        },
        current_index = 0;
        files_url_regex = /(files|commit[^s]|compare)/,
        created_reload_container = false,
        reload_container_style = {
            'position': 'fixed',
            'bottom' : '5px',
            'right' : '5px',
            'padding' : '10px',
            'border' : '1px solid black',
            'width' : '300px',
            'display' : 'none',
            'z-index' : '100',
            'background-color' : 'white'
        };
 
    // constants
    var POLLING_TIME = 5000;
    function parseFiles() {
        $('#toc li a').filter(function () {
            return ! $(this).parent().hasClass('diffstat');
        }).each(function (index) {
            filelist[index] = {
                href: $(this).attr('href'),
                text: $(this).html(),
                elem: $(this)
            };
        });
    }
    function moveFiles() {
        $('#toc').wrapInner('<div style="position:fixed; width: 38%; top: 60px; left: 0px; z-index: 100; height: 90%; overflow: scroll;" />');
        $('#toc').addClass('open');
        $('p .minibutton.js-details-target').hide();
    }
    function adjustPageMargins() {
        if (String(window.location).match(files_url_regex)) {
            $('.container').css('margin-right', '0px');
        } else {
            $('.container').css('margin-right', 'auto');
        }
        var sheet = document.styleSheets[0];
        var rules = sheet.cssRules;
        sheet.insertRule('.line-comments .clipper { width: 99% }', rules.length);
    }

    function adjustPageMarginsClick(event) {
        if ($(event.target).data('container-id') == 'files_bucket') {
            $('.container').css('margin-right', '0px');
        } else {
            $('.container').css('margin-right', 'auto');
        }
        var sheet = document.styleSheets[0];
        var rules = sheet.cssRules;
        sheet.insertRule('.line-comments .clipper { width: 99% }', rules.length);
    }
    function showFile(index) {
        var old_file_link = $("a[href=" + filelist[current_index].href + "]"),
            new_file_link = $("a[href=" + filelist[index].href + "]"),
            old_file = $(filelist[current_index].href),
            new_file = $(filelist[index].href);
        old_file.hide();
        old_file_link.css('font-weight', 'normal');
        new_file.show();
        new_file_link.css('font-weight', 'bold');
        current_index = index;
        window.scrollTo(0, new_file.offset().top);
    }
    function iterateFiles(func) {
        $.each(filelist, function (index, value) {
            func(index, value);
        });
    }
    function hideAllFiles() {
        iterateFiles(function (index, value) {
            $(value.href).hide();
        });
    }
    function updateCommentCount() {
        iterateFiles(function (index, value) {
            var comment_count = $(value.href + " .commit-comment-header").length;
            if (comment_count > 0) {
                value.elem.html(
                    value.text.replace(/\//,'/&shy;') + " (" + getReadCommentCount(index) + '/' + comment_count +  ")"
                );
            }
        });
    }
    function getReadCommentCount(index) {
        initReadComment(index);
        return viewed_comments.counts[index];
    }
    function initReadComment(index) {
        if (! viewed_comments.counts[index]) {
            viewed_comments.counts[index] = 0;
        }
        if (! viewed_comments.comments[index]) {
            viewed_comments.comments[index] = new Array();
        }
    }
    function setReadComment(index, comment_id) {
        initReadComment(index);
        if (! viewed_comments.comments[index][comment_id]) {
            viewed_comments.comments[index][comment_id] = true;
            viewed_comments.counts[index]++;
        }
    }
    function updateReadCommentCounts() {
        var docViewTop = $(window).scrollTop(),
            docViewBottom = docViewTop + $(window).height();
            
        iterateFiles(function (index, value) {
            $(value.href + ":visible div.js-comment.comment").filter(function () {
                var thisTop = $(this).offset().top,
                    thisBottom = thisTop + $(this).height();
                
                return (
                    thisTop >= docViewTop && 
                    thisBottom <= docViewBottom
                );
            }).each(function () {
                var comment_id = parseInt($(this).attr('id').substr(1));
                if (comment_id > 0) {
                    setReadComment(index, comment_id);
                }
            });
        });
        updateCommentCount();
    }
    function renderFilesMod() {
        adjustPageMargins();
        moveFiles();
        hideAllFiles();
        showFile(current_index);
        updateReadCommentCounts();
    }
    function attachEvents() {
        iterateFiles(function (index, value) {
            value.elem.click(function () { 
                showFile(index);
                return false;
            });
        });
        $('ul.js-hard-tabs li a').click(adjustPageMarginsClick);
        $(window).scroll(updateReadCommentCounts);
        setTimeout(pollForNewComments, POLLING_TIME);
        console.log('Set polling time');
    }
    function pollForNewComments() {
        console.log('Polling...');
        $.ajax({
            url: window.location,
            success: function(data) {
                var $data = $(data),
                    comment_count = $('table.diff-table .commit-comment-header').length,
                    new_comment_count = $data.find('div#diff-comment-data .commit-comment-header').length;
                if (comment_count != new_comment_count) {
                    console.log('found new comments' + comment_count + ' ' + new_comment_count);
                    storeDiffData($data);
                    alertForReload(new_comment_count - comment_count);
                }
                setTimeout(pollForNewComments, POLLING_TIME);
            },
            error: function() {
                setTimeout(pollForNewComments, POLLING_TIME);
            }
        });
    }
    function alertForReload(new_comment_count) {
        prepareReloadContainer();
        var reload_container = $('#reload');
        reload_container.html('Comments have been updated.<br/>');
        reload_container.append('<a href="#" id="reload-link">Reload</a>');
        $('#reload-link').click(reloadDiffData);
        $('#reload').css('display', 'block');
    }
    function prepareReloadContainer() {
        if (!created_reload_container) {
            $('body').append('<div id="reload"></div>');
            var reload_container = $('#reload');
            reload_container.css(reload_container_style);
            created_reload_container = true;
        }
    }
    function storeDiffData(elem) {
        diff_data = new Array();
        var diff_comment_data = elem.find("#diff-comment-data");
        $('#diff-comment-data').html(diff_comment_data.html());
        elem.find('div[id^=diff-]').each(function (index) {
            diff_data[index] = {
                id: $(this).attr('id'),
                html: $(this).html(),
            };
        });
    }
    function reloadDiffData() {
        $.each(diff_data, function (index, value) {
            $('#' + value.id).html(value.html);
        });
        // This next blip is copied from github since they didn't functionalize it.
        $(function() {
            var a;
            if (!document.getElementById("diff-comment-data"))
                return;
            return a = {}, $("#files.diff-view > .file > .meta").each(function() {
                return a[$(this).attr("data-path")] = this
            }), $("#diff-comment-data > table").each(function() {
                var b, c, d, e;
                return c = $(this).attr("data-path"), d = $(this).attr("data-position"), b = $(a[c]).closest(".file"), e = b.find(".data table tr[data-position='" + d + "']"), e.after($(this).find("tr").detach()), b.addClass("has-inline-notes show-inline-notes")
            }), $("#diff-comment-data > div").each(function() {
                var b;
                return b = $(this).attr("data-path"), $(a[b]).closest(".file").find(".file-comments-place-holder").replaceWith($(this).detach())
            })
        }), $(document).on("change", ".js-show-inline-comments-toggle", function() {
            return $(this).closest(".file").toggleClass("show-inline-notes", this.checked)
        }), $(document).on("change", "#js-inline-comments-toggle", function() {
            return $("#comments").toggleClass("only-commit-comments", !this.checked)
        });
        // end copy from github source
        // TODO: Find a better way to do this
        updateReadCommentCounts();
        $('#reload').css('display', 'none');
    }
    parseFiles();
    renderFilesMod();
    attachEvents();
})(jQuery);
