// ==UserScript==
// @name           Reddit Context Helper
// @namespace      redditcontext
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$('li.first>a.bylink').each(function(){
        $(this).hover(function(){
                                    append_context_helper(this);
                                });
    });

function append_context_helper(obj)
{
    context_div = $('<div></div>');
    context_div.attr('id','context_picker');
    context_div.css({'display':'inline'});

    $("#context_picker").remove(); // get rid of any previously created context_pickers, otherwise they will multiply like rabbits
    $(obj).parent('li').append(context_div); // we're hovering over the permalink link, but want to attach our list to the li element it lives in

    lis = $('<ul></ul>');
    lis.css({'border':'1px solid orangered','display':'inline', 'margin':'1px'});

    ancestor_count = $(obj).parents('.child').length; // count how deeply nested we are

    if (ancestor_count < 1) return false; // top level, never mind

        for (i=1; i <= ancestor_count; i++)
        {
            $(lis).append('<li>'+ i +'</li>');
        }

    $(context_div).append(lis);

    var orig_link = $(obj).attr('href');

    $('#context_picker li').each(function(){
                                context_num = $(this).text();
                                context_href = orig_link + '?context=' + context_num;
                                context_link = '<a href="' + context_href + '">' + context_num + '</a>';
                                $(this).html(context_link)
                                       .hover(function(){
                                                        $(this).css({'background-color':'#CCC',
                                                                     'color':'#00F'
                                                                     });
                                                        },
                                              function(){
                                                        $(this).css({'background-color':'#FFF',
                                                                     'color':'#888'
                                                                     });
                                                        })
                                            });
}