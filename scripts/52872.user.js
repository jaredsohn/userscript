// ==UserScript==
// @name rEdit
// @namespace http://resources.zetaboards.com/index/
// @description Adds rEdit to the majority of ZetaBoards boards
// @include http://if.invisionfree.com/*
// @include http://*.zetaboards.com/*
// @include http://zathyusnb.com/*
// @include http://bigboardsresources.com/*
// @include http://hogwartsnewzealand.com/*
// @include http://forums.planetnexus.net/*
// ==/UserScript==
var $ = unsafeWindow.jQuery || jQuery, main_url = unsafeWindow.main_url || main_url;

if (location.href.indexOf("announcement") === -1) {
    var hold = null;
    $('img[src*=edit]').attr('alt', 'Edit Post');
    $("img[alt*=Edit]").each(function () {
        $(this).parents("tr.c_postfoot").prev().prev().children(".c_post").unbind('dblclick').dblclick(function () {
            var length = $(this).find('.quickedit').length, mode, type, sd, ast, f, xc, t, qhash, p, pg, x, post, title, tags, description;
            if ($('.quickedit').length >= 1 && length === 0) {
                alert("You may only have one rEdit open at a time!");
                return false;
            } else if (length === 1) {
                if (confirm("Do you want to close this rEdit?")) {
                    $(this).html(hold);
                    window.onbeforeunload = null;
                }
            } else if (length === 0) {
                hold = this.innerHTML;
                $(this).html("<textarea name='post' style='padding-bottom:1px;height:223px;' id='c_post-text' class='quickedit' rows='1' readonly='true'>Loading Post...</textarea><span style='float:left; padding-top:10px;'><button type='button' id='me'>Submit</button> <button type='button' id='cancelthat'>Cancel</button></span>");
                $.get($(this).parent().next().next().find('.c_footicons img[alt*=Edit]').parents("a").attr('href'), function (d) {
                    mode = $('input[name=mode]', d).val();
                    type = $('input[name=type]', d).val();
                    sd = $('input[name=sd]', d).val();
                    ast = $('input[name=ast]', d).val();
                    f = $('input[name=f]', d).val();
                    xc = $('input[name=xc]', d).val();
                    t = $('input[name=t]', d).val();
                    qhash = $('input[name=qhash]', d).val();
                    p = $('input[name=p]', d).val();
                    title = $('input[name=title]', d).val();
                    tags = $('input[name=tags]', d).val();
                    description = $('input[name=description]', d).val();
                    $('.quickedit').val($("#c_post-text", d).val()).attr('readonly', false);
                    window.onbeforeunload = function () {
                        return "You currently have a quickedit box open. If you continue off the page, your browser will not save your edit.";
                    };
                });
                $('#me').click(function (e) {
                    e.preventDefault();
                    if ($('.quickedit').attr('readonly') === true) {
                        alert('You haven\'t even edited your post yet!');
                    } else {
                        $('.quickedit').attr('readyonly', true).css("background", "url(http://209.85.62.24/313/104/0/p239313/loadingAnimation.gif) no-repeat bottom right");
                        var post = $('.quickedit').val();
                        $.post(main_url + 'post/?', { mode: mode, type: type, sd: sd, ast: ast, f: f, xc: xc, t: t, qhash: qhash, p: p, title: title, tags: tags,  description: description, emo: 1, post: post}, function (d) {
                            var xhr = new XMLHttpRequest();
        
                            xhr.open('POST', main_url + 'tasks/', true);
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            xhr.setRequestHeader("Accepts", "*/*");
                            
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4 && xhr.status === 200) {
                                    $('.quickedit').parent().html(xhr.responseText);
                                    window.onbeforeunload = null;
                                }
                            };
                            
                            xhr.send($.param({ task: 5, post: post }));
                        });
                    }
                });
                $('#cancelthat').click(function (e) {
                    e.preventDefault();
                    $('.quickedit').parent().html(hold);
                    window.onbeforeunload = null;
                });
            }
        });
    });
}