// ==UserScript==
// @name           Porevo
// @author         Anonymous
// @description    Porevo
// @version        0.1
// @include        http://porevo.info/*
// @include        http://*.porevo.info/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        main();
    }
}

// All your GM code must be inside this function
function main() {

    //reloads 404 pages
    if(document.title == "404 Not Found") {
        window.location.reload();
    }

    //photo view
    if(document.location.toString().indexOf('view', 0) != -1) {
        $('#header').hide();
        $('.item_prop:first').hide();
        $('.wrap_menu').parent().hide();
        pic_id = getUrlVar('item');
        add_to_fav = '<a onclick="add_fav('+ pic_id +'); return false;" href="view.php?item='+ pic_id +'&amp;fav=add">Добавить фото в Избранное</a>';
        $('.select_p').html(add_to_fav);
    }

    //adds link to view on all pages
    else
    {
        if(document.location.toString() != 'http://porevo.info/') {

            //moving left column to right
            left_table = $('table#left');
            left_table.parent().html('');
            $('table#right:first').html(left_table);
            $('td#header').height('90px');
        }

        //adding direct link
        $('a').each(function() {
            href = $(this).attr('href');
            if(href.indexOf('view.php') > -1) {
                pic_id = href.substring(href.indexOf('=') + 1);
                pic_href = 'http://porevo.info/pic.php?id=' + pic_id + '&size=full';
                a = $('<a></a>').attr('href', pic_href).text('Посмотреть');
                $(this).parent().append(a);
            }
        });
    }
    
}

function getUrlVar(name){
    return getUrlVars()[name];
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
