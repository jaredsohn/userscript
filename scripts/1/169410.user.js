// ==UserScript==
// @name            forums.bgdev.org
// @author          TNT
// @description     Add ajax functionality to mark forums as read.
// @icon            https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config_icon_large.png
// @include         http://forums.bgdev.org/
// @include         http://forums.bgdev.org/index.php*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require         http://tnt-soft.net/js/jquery.timers.js
// @resource        0 http://tnt-soft.net/images/numbers/0.gif
// @resource        1 http://tnt-soft.net/images/numbers/1.gif
// @resource        2 http://tnt-soft.net/images/numbers/2.gif
// @resource        3 http://tnt-soft.net/images/numbers/3.gif
// @resource        4 http://tnt-soft.net/images/numbers/4.gif
// @resource        5 http://tnt-soft.net/images/numbers/5.gif
// @resource        6 http://tnt-soft.net/images/numbers/6.gif
// @resource        7 http://tnt-soft.net/images/numbers/7.gif
// @resource        8 http://tnt-soft.net/images/numbers/8.gif
// @resource        9 http://tnt-soft.net/images/numbers/9.gif
// @resource        loading http://tnt-soft.net/images/numbers/loading.gif
// @resource        left  http://tnt-soft.net/images/numbers/left.gif
// @resource        right http://tnt-soft.net/images/numbers/right.gif
// @grant           GM_getResourceURL
// @version         1.0.3
// @run-at          document-end
// ==/UserScript==

forums = [];
load_index = 0;
process_index = 0;
timeout = 500;
links = $('table[id^="cat_"] > tbody > tr > td:first-child.row4 > a:first-child');
if(links.length > 0){
    links.each(function(index, el){
        // mark forum as read
        $(el).on('click', click_handler);
        title = $(el).attr('title');
        new_title = title + ' (via AJAX)';
        $(el).attr('title', new_title);

        // badges
        forum_url = $(el).parent('td.row4').next('td.row4').find('b:first-child > a').attr('href');
        selector = '#ipbwrapper > form > div.tableborder > table > tbody > tr > td.row4:nth-child(3) > a[href$="getnewpost"]';
        match = forum_url.match(/showforum=([\d]+)$/m);
        forum_url += '&rand='+Math.random();
        if (match != null) {
            forums[forums.length] = {
                id: match[1],
                url: forum_url
            };
            $(el).attr('link', match[1]);
        }
    });

    if(forums.length > 0){
        // start processing badges
        $(document.body).everyTime(timeout, 'load', load_results);
    }
}

function click_handler(e){
    e.preventDefault();
    this_el = $(this);
    url = this_el.attr('href');
    img = this_el.children('img');
    img_url = img.attr('src');
    match = img_url.match(/^(.+\/)([\w]+)_(\w+\.\w+)$/m);
    if(match != null){
        loader = $('<img />');
        loader.attr('id', 'loader');
        loader.attr('width', 28);
        loader.attr('height', 28);
        loader.attr('src', GM_getResourceURL('loading'));
        this_el.css('display', 'none').after(loader);
        $.ajax({
            url: url,
            type: 'GET',
            global: false,
            success: function(){
                this_el.remove();
                loader.attr('border', 0);
                loader.attr('alt', 'No New Posts');
                loader.attr('src', match[1]+match[2]+'_no'+match[3]);
            },
            error: function(){
                loader.remove();
                this_el.css('display', 'inline').removeAttr('style');
            }
        });
    }
}

function load_results(){
    if(forums[load_index] != undefined){
        result_div = $('<div />');
        result_div.attr('id', 'result_div_'+forums[load_index]['id']);
        result_div.css('display', 'none');
        $(document.body).append(result_div);
        // load page fragment
        result_div.load(forums[load_index]['url']+' '+selector);
        load_index++;
    }
    else{
        $(document.body).stopTime('load', load_results);
        $(document.body).everyTime(timeout, 'process', process_results);
    }
}

function process_results(){
    if(forums[process_index] != undefined){
        result_div = $('#result_div_'+forums[process_index]['id']);
        cnt = result_div.children('a').length;
        if(cnt > 0){
            cnt_str = cnt.toString();
            if(typeof cnt_str == 'string'){
                counter = $('<div />');
                counter.css({
                    'position': 'absolute',
                    'top': '-6px',
                    'left': '0px'
                });
                tmp_img = $('<img />');
                tmp_img.attr('src', GM_getResourceURL('left'));
                counter.append(tmp_img);
                for(i=0; i<cnt_str.length; i++){
                    tmp_img = $('<img />');
                    tmp_img.attr('src', GM_getResourceURL(cnt_str.charAt(i)));
                    counter.append(tmp_img);
                }
                tmp_img = $('<img />');
                tmp_img.attr('src', GM_getResourceURL('right'));
                counter.append(tmp_img);
                $('a[link="'+forums[process_index]['id']+'"]').css('position', 'relative').append(counter);
            }
        }
        process_index++;
    }
    else{
        $(document.body).stopTime('process', process_results);
    }
}