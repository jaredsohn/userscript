// ==UserScript==
// @author          Paranoya
// @name            Remove Dead Friends
// @namespace       Remove Dead Friends
// @description     Check your friends list and remove the dead and banned accounts
// @version         1.0.9 
// @match           http://www.erepublik.com/*/citizen/profile/*
// @match           https://www.erepublik.com/*/citizen/profile/*
// @include         http://www.erepublik.com/*/citizen/profile/*
// @include         https://www.erepublik.com/*/citizen/profile/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @downloadURL     http://userscripts.org/scripts/source/156727.user.js
// @updateURL       http://userscripts.org/scripts/source/156727.meta.js
// ==/UserScript==

var friends_timeout;
var friends_remove_timeout;

var friends_config          = {
    remove: true, list: [], citizen: null, 
    amount: 0, html: null, friend: null, friend_object: null,
    scroll_wrapper: 300, scroll_content: 300, scroll_active: false, scroll_margin:0, scroll_step:300
};
var friends_image_loading   = "data:image/gif;base64,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";

function friends_loading() {
    if (typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(friends_loading, 100); 
        return false;
    } else {
        friends_init();
    }
    return true;
}
friends_loading();


function friends_init() {
    if (typeof unsafeWindow == 'undefined') {unsafeWindow = window;}
    friends_init_styles();
    friends_init_blocks();
    friends_init_events();
}

function friends_get_list() {
    friends_config.list     = [];
    friends_config.citizen  = parseFloat(unsafeWindow.flc.getVariable("citizen_id"));
    friends_config.amount   = parseFloat($('.citizen_activity h4.friends_title a').text()
        .replace('Friends (', "").replace(')', "") // English version
        .replace('Пријатели (', "").replace(')', "") // Macedonian version
        .replace('Приятели (', "").replace(')', "") // Bulgarian version
        .replace('Amigos (', "").replace(')', "") // Brazilian, Spanish, Portuguese version
        .replace('Freunde (', "").replace(')', "") // German version
        .replace('Amis (', "").replace(')', "") // French version
        .replace('Φίλοι (', "").replace(')', "") // Greek version
        .replace('Prijatelji (', "").replace(')', "") // Croatian, Slovenian version 
        .replace('Barátok (', "").replace(')', "") // Hungarian version 
        .replace('Teman (', "").replace(')', "") // Indonesian version 
        .replace('Amici (', "").replace(')', "") // Italian version 
        .replace('Znajomi (', "").replace(')', "") // Polish version 
        .replace('Prieteni (', "").replace(')', "") // Romanian version 
        .replace('Друзья (', "").replace(')', "") // Russian version 
        .replace('Shokët (', "").replace(')', "") // Albanian version 
        .replace('Пријатељи (', "").replace(')', "") // Serbian version
        .replace('Arkadaşlar (', "").replace(')', "") // Turkish version
        .replace('好友 (', "").replace(')', "") // Taiwanian version
        .replace('Друзі (', "").replace(')', "") // Ukranian version
        .replace('朋友们 (', "").replace(')', "") // Chinese version
        .replace('الأصدقاء (', "").replace(')', "") // Arabic version
        .replace('دوستان (', "").replace(')', "") // Iranian version
    );
        
    if (isNaN(friends_config.amount)) {
        $('#friends_popup .overlay').hide();
        $('#friends_popup .message').css('height', 'auto');
        $('#friends_popup .text').css('height', 'auto').css('position', 'relative')
        .html('Error: You have 0 friends or you use unsupported erepublik language version.');
        return false;
    }
    
    $('#friends_popup .overlay').show();
    $('#friends_popup .overlay #total_friends_checked').text('0');
    $('#friends_popup .message').css('height', '300px');
    $('#friends_popup .text').css('height', '300px').css('position', 'absolute').html('<ul id="friedns_dead_list"></ul>');
    
    friends_config.scroll_margin = 0;
    $('#friends_popup .action').css('display', 'none').removeClass('confirm').find('span').text('Delete all');
    $('#friends_popup .inner .more_details').css('display', 'none');
    window.clearTimeout(friends_timeout);
    friends_parse_responce(1, Math.ceil(friends_config.amount/20));
    return true;
}

function friends_parse_responce(current, total) {
    if (current <= total) {
        GM_xmlhttpRequest({
            method  : 'Get',
            url     : 'http://www.erepublik.com/en/main/citizen-friends/' + friends_config.citizen + '/'+ current,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            onload:function(data) {
                if (data.responseText) {
                    friends_config.html = $('.friends_area #friends_list table.lister tbody tr', data.responseText);                    
                    if (friends_config.html.length > 0) {
                        $('#friends_popup .text').css('height', '300px').css('opacity', '0.2');
                        
                        friends_config.html.each(function() {
                            friends_config.friend_object = $(this);
                            friends_config.friend = { };
                            friends_config.friend.id       = friends_config.friend_object.attr('id').replace("friend_", "");
                            friends_config.friend.title    = friends_config.friend_object.find('td.friend_info a').attr('title');
                            friends_config.friend.profile  = friends_config.friend_object.find('td.friend_info a').attr('href');
                            friends_config.friend.image    = friends_config.friend_object.find('td.friend_info a img').attr('src');
                            friends_config.friend.remove   = friends_config.friend_object.find('td.actions a#' + friends_config.friend.id + '.remove').attr('href');
                            friends_config.friend.dead     = false;
                            
                            if (friends_config.friend_object.hasClass('dead')) {
                                friends_config.friend.dead     = true;
                                friends_config.list.push(friends_config.friend);
                                friends_list_item('friedns_dead_list', friends_config.friend);                            
                            }
                        });
                        
                        var checked_friends = parseFloat($('#friends_popup .overlay #total_friends_checked').text());
                        $('#friends_popup .overlay #total_friends_checked').text(parseFloat(checked_friends + friends_config.html.length));
                        
                        window.clearTimeout(friends_timeout);
                        friends_timeout = window.setTimeout(function() {friends_parse_responce(current+1, total)}, 1000);
                    } else {
                        $('#friends_popup .overlay').hide();
                        $('#friends_popup .message').css('height', 'auto');
                        $('#friends_popup .text').css('height', 'auto').css('position', 'relative')
                        .html('Error: There was an error while checking your friends list.<br/>Please try again or try few minutes later.');
                        
                        window.clearTimeout(friends_timeout);
                    }
                }
            },
            onerror:function(data) {
                $('#friends_popup_close').click();
            }
        });
    } else if (current > total) {        
        window.clearTimeout(friends_timeout);
        
        friends_event_remove();
        
        $('#friends_popup .overlay').hide();
        $('#friends_popup .text').css('position', 'relative').css('opacity', '1');
        
        if (friends_config.list.length == 0) {
            $('#friends_popup .message').css('height', 'auto');
            $('#friends_popup .text').css('height', 'auto').css('position', 'relative')
                .html('You dont have dead friends in your list.');
        } else {
            $('#friends_popup .action').css('display', 'block');
            $('#friends_popup .action span').append(' (' + friends_config.list.length + ')')
            $('#friends_popup .inner .more_details').css('display', 'block');
        }
    }
}

function friends_list_item(element, item) {
     if (typeof item !== 'undefined') {
         $('#' + element).find('li#friend_dead_item_' + item.id).html('').remove();
         
         $('#' + element).append('<li id="friend_dead_item_' + item.id + '"><div class="clear clearfix"></div></li>');
         $('#friend_dead_item_' + item.id).prepend('<a id="friens_remove_action" class="friens_upgrade_action" rel="' + friends_config.friend.remove + '" href="javascript:;"></a>');
            $('#friend_dead_item_' + item.id).find('a.friens_upgrade_action').append('<span class="upgrade_title" style="">Remove</span>');
            $('#friend_dead_item_' + item.id).find('a.friens_upgrade_action').append('<img alt="" src="http://www.erepublik.com/images/modules/manager/check.png" class="upgrade_check">');
            
            
         $('#friend_dead_item_' + item.id).prepend('<a target="_blank" class="friends_dead_item" title="'+ item.title+'" href="'+ item.profile+'"></a>');
            $('#friend_dead_item_' + item.id).find('a.friends_dead_item').append('<img width="40" height="40" src="' + item.image + '"/>');
            $('#friend_dead_item_' + item.id).find('a.friends_dead_item').append('<strong>' + item.title + '</strong>');
     } 
}

function friends_init_events() {
    $('#friends_remove_button').click(function() {
        window.clearTimeout(friends_timeout);
        window.clearTimeout(friends_remove_timeout);
        friends_config.remove = true;        
        
        $('#friends_overlay').show();
        $('#friends_popup').show();
        
        friends_get_list();
    });
    
    $('#friends_popup_close').click(function() {
        window.clearTimeout(friends_timeout);
        window.clearTimeout(friends_remove_timeout);
        
        friends_config.remove = false;
        $('#friends_overlay').hide();
        $('#friends_popup').hide();
    });
    
    $('#friends_popup .inner .more_details.scroll-up').click(function() {
        if (friends_config.scroll_active) {
            return false;
        }
            
        friends_config.scroll_content = parseFloat($('#friends_popup .text').find('ul#friedns_dead_list').height());
        if (isNaN(friends_config.scroll_content)) {
            friends_config.scroll_content = 0;
        }
        
        if (friends_config.scroll_content > friends_config.scroll_wrapper) {            
            friends_config.scroll_margin = friends_config.scroll_margin + friends_config.scroll_step;
            
            if (friends_config.scroll_margin >= 0) {
                friends_config.scroll_margin = 0;
            }
            
            friends_config.scroll_active = true;
            $('#friends_popup .text').find('ul#friedns_dead_list').animate({
                marginTop: friends_config.scroll_margin
            }, 500, function() {
                friends_config.scroll_active = false;
            });
            return true;
        }
    });
    
    $('#friends_popup .inner .more_details.scroll-down').click(function() {
        if (friends_config.scroll_active) {
            return false;
        }
        
        friends_config.scroll_content = parseFloat($('#friends_popup .text').find('ul#friedns_dead_list').height());
        if (isNaN(friends_config.scroll_content)) {
            friends_config.scroll_content = 0;
        }
        
        if (friends_config.scroll_content > friends_config.scroll_wrapper) {            
            friends_config.scroll_margin = friends_config.scroll_margin - friends_config.scroll_step;
            
            if (parseFloat(friends_config.scroll_margin - friends_config.scroll_step) <= parseFloat("-" + friends_config.scroll_content)) {
                friends_config.scroll_margin = parseFloat("-" + ((friends_config.scroll_content+2)-friends_config.scroll_step));
            }
            
            friends_config.scroll_active = true;
            $('#friends_popup .text').find('ul#friedns_dead_list').animate({
                marginTop: friends_config.scroll_margin
            }, 500, function() {
                friends_config.scroll_active = false;
            });
            return true;            
        }
    });
    
    $('#friends_popup .action').click(function() {
        if ($(this).hasClass('confirm')) {
            $(this).hide();
            $('#friends_popup .inner .more_details').hide();
            $('#friends_popup .message').css('height', 'auto');
            $('#friends_popup .text').css('height', 'auto').css('position', 'relative')
                .html('Removing all friends ... Friends deleted: <span id="friends_auto_deleted_count">0</span>');

            friends_event_remove_all(0);
        } else {
            $(this).addClass('confirm').find('span').text('Confirm');
        }
    })
}

function friends_event_remove() {
    $("a[id^=friens_remove_action]").click(function() {
        var element = $(this);
        GM_xmlhttpRequest({
            method  : 'POST',
            url     : 'http://www.erepublik.com' + element.attr('rel'),
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            onload:function(data) {
                if (element.hasClass('removed') == false) {
                    var list_item = element.parent();
                    list_item.slideUp(800, function() {
                        list_item.remove();
                    })
                }
                element.addClass('removed');
            }
        });        
    });
}

function friends_event_remove_all(current) {
    if (friends_config.remove == false) {
        return false;
    }
    if (current < friends_config.list.length) {
        var element = friends_config.list[current];
        if (element.remove) {
            GM_xmlhttpRequest({
                method  : 'POST',
                url     : 'http://www.erepublik.com' + element.remove,
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                onload:function(data) {
                    $('#friends_popup .text #friends_auto_deleted_count').text(current+1);
                    
                    friends_remove_timeout = window.setTimeout(function() { 
                        friends_event_remove_all(current+1);
                    }, 1000);
                }
            });
        }
    } else {        
        window.clearTimeout(friends_remove_timeout);
        friends_config.list = [];
        
        $('#friends_popup .message').css('height', 'auto');
        $('#friends_popup .text').css('height', 'auto').css('position', 'relative')
            .html('All friends removed. You dont have dead friends in your list.');
    }
}

function friends_init_blocks() {
    $('ul.citizen_menu').append('<li><a id="friends_remove_button" title="Remove dead friends" href="javascript:;">Remove dead friends</a></li>');
    $('body').append('<div id="friends_overlay" class="lb_overlay js_lb_overlay"></div>');    
    $('body').append('<div id="friends_popup" class="solid_pop stripped"></div>');
    $('#friends_popup').append('<a id="friends_popup_close" class="close close_pop_up" href="javascript:;">Close</a>');
    $('#friends_popup').append('<div class="content"><div class="fixer"></div></div>');
        $('#friends_popup .content .fixer').append('<h1>Remove Dead Friends</h1>');
        $('#friends_popup .content .fixer').append('<div class="inner"><div class="message"></div></div>');
            $('#friends_popup .inner .message').append('<div class="overlay"></div>');
                $('#friends_popup .inner .message .overlay').append('<div class="info-text"></div>');
                    $('#friends_popup .inner .message .overlay .info-text').append('Loading ... <br/> ');
                    $('#friends_popup .inner .message .overlay .info-text').append('Friends checked: <span id="total_friends_checked">0</span>');
            $('#friends_popup .inner .message').append('<div class="text"></div>');
            
            $('#friends_popup .inner').append('<a class="more_details scroll-up" title="Scroll up" href="javascript:;"><span>Up</span></a>');
            $('#friends_popup .inner').append('<a class="more_details scroll-down" title="Scroll down" href="javascript:;"><span>Down</span></a>');
            
        $('#friends_popup .content .fixer').append('<div class="clear"></div><a class="action" title="" href="javascript:;"><span>Delete all</span></a>');
    $('#friends_popup').append('<div class="bottom"></div>');
}

function friends_init_styles() {    
    GM_addStyle("#friends_overlay { display:none; height: 1754px; position: absolute; width: 100%; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 20003; background: none repeat scroll 0% 0% black; opacity: 0.5; }");
    
    GM_addStyle("#friends_popup { display: none; left: 50%; margin-left: -274px; z-index: 20004; position: fixed; top: 30%; margin-top: -150.5px; }");
    GM_addStyle("#friends_popup .content .inner { margin-top: 0px; margin-bottom:30px; }");
    GM_addStyle("#friends_popup .content .fixer { margin-bottom:0px; }");
    GM_addStyle("#friends_popup .content .message { margin: 0px; height:300px; width:459px; }");
    GM_addStyle("#friends_popup .content .text { position:absolute; padding:0px; margin:0px; display:block; vertical-align:top; color:white; width:459px; height:300px; max-height:300px; overflow:hidden; }");
    GM_addStyle("#friends_popup .content .overlay { cursor:wait; text-align:center; z-index:2; position:absolute; padding:0px; margin:0px; display:block; vertical-align:top; color:white; width:459px; height:300px; max-height:300px; overflow:hidden; }");
    GM_addStyle("#friends_popup .content .overlay .info-text { font-weight:normal; text-shadow:1px 1px 1px #000; margin-top:130px; }");
    GM_addStyle("#friends_popup .content .script-author { color:#CCC; width:480px; text-align:center; font-size:11px; text-shadow:1px 1px 1px #000; margin:-10px 0px 0px 31px; float: left; }");
    GM_addStyle("#friends_popup .content .script-author a { color:#FFF; }");
    
    GM_addStyle("#friends_popup { float: left; width: 548px; }");
    GM_addStyle("#friends_popup .close { background-image: url('/images/modules/manager/close_pop.png?1337588804'); background-position: center top; background-repeat: no-repeat; float: left; height: 22px; position: absolute; right: 13px; text-indent: -9999px; top: 13px; width: 22px; }");
    GM_addStyle("#friends_popup .close:hover { background-position: center bottom; }");
    GM_addStyle("#friends_popup .bottom { height:20px; }");
    GM_addStyle("#friends_popup .action { display:none; margin-top:20px; }");
    GM_addStyle("#friends_popup .action.confirm { display:none; margin-top:20px; }");
    GM_addStyle("#friends_popup .action.confirm span { border-bottom:3px solid #8C1716; background-color: #9F2A29; background-image: -webkit-gradient(linear, left bottom, left top, color-stop(1, #CD5756), color-stop(0, #9F2A29)); background-image: -webkit-linear-gradient(center bottom, #CD5756 0%, #9F2A29 100%); background-image: -moz-linear-gradient(top, #CD5756 0%, #9F2A29 100%); background-image: -o-linear-gradient(top, #CD5756 0%, #9F2A29 100%); background-image: -ms-linear-gradient(top, #CD5756 0%, #9F2A29 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#CD5756', endColorstr='#9F2A29',GradientType=1 ); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr='#CD5756', endColorstr='#9F2A29')'; background-image: linear-gradient(top, #CD5756 0%,#9F2A29 100%); -webkit-transition: background 0.1s; -moz-transition: background 0.1s; -o-transition: background 0.1s; -ms-transition: background 0.1s; transition: background 0.1s; }");
    GM_addStyle("#friends_popup .action.confirm:hover span { background-color: #B32F2E; background-image: -webkit-gradient(linear, left bottom, left top, color-stop(1, #D36B6A), color-stop(0, #B32F2E)); background-image: -webkit-linear-gradient(center bottom, #D36B6A 0%, #B32F2E 100%); background-image: -moz-linear-gradient(top, #D36B6A 0%, #B32F2E 100%); background-image: -o-linear-gradient(top, #D36B6A 0%, #B32F2E 100%); background-image: -ms-linear-gradient(top, #D36B6A 0%, #B32F2E 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#D36B6A', endColorstr='#B32F2E',GradientType=1 ); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr='#D36B6A', endColorstr='#B32F2E')'; background-image: linear-gradient(top, #D36B6A 0%,#B32F2E 100%); }");
    
    GM_addStyle("#friends_popup .more_details { display:none; margin:0px 2px -33px auto; width:50px }");
    GM_addStyle("#friends_popup .more_details.scroll-up { margin:0px 65px -33px auto; }");
    GM_addStyle("#friends_popup .more_details span { padding:5px 0px; }");
    
    GM_addStyle("#friedns_dead_list > li { width:458px; margin-left: 1px; margin-bottom:2px; width: 458px; height: 58px; float:none; display:block; background-color: #848B9E; background-image: url('/images/modules/manager/noiz.png?1333974834'); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-gradient(linear, left bottom, left top, color-stop(1, #9AA3B2), color-stop(0, #848B9E)); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-linear-gradient(center bottom, #9AA3B2 0%, #848B9E 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-moz-linear-gradient(top, #9AA3B2 0%, #848B9E 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-o-linear-gradient(top, #9AA3B2 0%, #848B9E 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-ms-linear-gradient(top, #9AA3B2 0%, #848B9E 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#9aa3b2e', endColorstr='#848b9e',GradientType=1 ); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr='#9aa3b2', endColorstr='#848b9e')'; background-image: url('/images/modules/manager/noiz.png?1333974834'),linear-gradient(top, #9AA3B2 0%,#848B9E 100%); -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; box-shadow: rgba(255, 255, 255, 0.2) 0 1px 0 inset,rgba(0, 0, 0, 0.4) 0 1px 1px,rgba(0, 0, 0, 0.1) 0 0 10px inset; text-align: center; position: relative; float: none; }");
    GM_addStyle("#friedns_dead_list > li:hover { background-color: #8D93A5; background-image: url('/images/modules/manager/noiz.png?1333974834'); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-gradient(linear, left bottom, left top, color-stop(1, #A3ABB9), color-stop(0, #8D93A5));background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-linear-gradient(center bottom, #A3ABB9 0%, #8D93A5 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-moz-linear-gradient(top, #A3ABB9 0%, #8D93A5 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-o-linear-gradient(top, #A3ABB9 0%, #8D93A5 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-ms-linear-gradient(top, #A3ABB9 0%, #8D93A5 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#a3abb9e', endColorstr='#8d93a5',GradientType=1 ); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr='#a3abb9', endColorstr='#8d93a5')'; background-image: url('/images/modules/manager/noiz.png?1333974834'),linear-gradient(top, #A3ABB9 0%,#8D93A5 100%); }");
    GM_addStyle('#friedns_dead_list > li a.friends_dead_item { margin:5px 0px 0px 10px; white-space:nowrap; line-height:44px; float: left; }');
    GM_addStyle('#friedns_dead_list > li a.friends_dead_item strong { color:white; }');
    GM_addStyle('#friedns_dead_list > li a.friends_dead_item img { width: 40px; transition: all 0.1s ease 0s; padding: 1px; margin-right: 10px; image-rendering: optimizequality; height: 40px; float: left; box-shadow: 0 0 2px rgba(0, 0, 0, 0.1); border-radius: 3px 3px 3px 3px; border: 1px solid #E4E4E4; background: none repeat scroll 0 0 #FFFFFF; }');
    GM_addStyle('#friedns_dead_list > li a.friends_dead_item:hover img { box-shadow: 0 0 4px rgba(0, 0, 0, 0.3); }');
    
    GM_addStyle("#friedns_dead_list > li a.friens_upgrade_action { float:right; width: 100px; display: block; text-align: center; font-size: 11px; color: white; padding: 8px 0px; font-weight: bold; text-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0; margin: 13px 13px 0px auto; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px,rgba(255, 255, 255, 0.3) 0 1px 0 inset; -moz-background-clip: padding-box; -webkit-background-clip: padding-box; background-clip: padding-box; background-color: #9F2A29; background-image: url('/images/modules/manager/noiz.png?1333974834'); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-gradient(linear, left bottom, left top, color-stop(1, #CD5756), color-stop(0, #9F2A29)); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-linear-gradient(center bottom, #CD5756 0%, #9F2A29 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-moz-linear-gradient(top, #CD5756 0%, #9F2A29 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-o-linear-gradient(top, #CD5756 0%, #9F2A29 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-ms-linear-gradient(top, #CD5756 0%, #9F2A29 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cd5756e', endColorstr='#9f2a29',GradientType=1 ); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr='#cd5756', endColorstr='#9f2a29')';  background-image: url('/images/modules/manager/noiz.png?1333974834'),linear-gradient(top, #CD5756 0%,#9F2A29 100%); border: 1px solid #A53D3B; border-top: 1px solid #C45855; border-bottom: 2px solid #7C2322; }");
    GM_addStyle("#friedns_dead_list > li a.friens_upgrade_action:hover { background-color: #B32F2E; background-image: url('/images/modules/manager/noiz.png?1333974834'); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-gradient(linear, left bottom, left top, color-stop(1, #D36B6A), color-stop(0, #B32F2E)); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-linear-gradient(center bottom, #D36B6A 0%, #B32F2E 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-moz-linear-gradient(top, #D36B6A 0%, #B32F2E 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-o-linear-gradient(top, #D36B6A 0%, #B32F2E 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-ms-linear-gradient(top, #D36B6A 0%, #B32F2E 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d36b6ae', endColorstr='#b32f2e',GradientType=1 ); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr='#d36b6a', endColorstr='#b32f2e')'; background-image: url('/images/modules/manager/noiz.png?1333974834'),linear-gradient(top, #D36B6A 0%,#B32F2E 100%); }");
    GM_addStyle('#friedns_dead_list > li a.friens_upgrade_action span {  }');
    GM_addStyle('#friedns_dead_list > li a.friens_upgrade_action img { display:none }');
    
    GM_addStyle("#friedns_dead_list > li a.friens_upgrade_action.removed {  border-width:0px; background-color: #8890A1; background-image: url('/images/modules/manager/noiz.png?1333974834'); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-gradient(linear, left bottom, left top, color-stop(1, #7E8593), color-stop(0, #8890A1)); background-image: url('/images/modules/manager/noiz.png?1333974834'),-webkit-linear-gradient(center bottom, #7E8593 0%, #8890A1 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-moz-linear-gradient(top, #7E8593 0%, #8890A1 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-o-linear-gradient(top, #7E8593 0%, #8890A1 100%); background-image: url('/images/modules/manager/noiz.png?1333974834'),-ms-linear-gradient(top, #7E8593 0%, #8890A1 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#7e8593e', endColorstr='#8890a1',GradientType=1 ); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr='#7e8593', endColorstr='#8890a1')'; background-image: url('/images/modules/manager/noiz.png?1333974834'),linear-gradient(top, #7E8593 0%,#8890A1 100%); box-shadow: rgba(0, 0, 0, 0.2) 0 1px 0 inset,rgba(255, 255, 255, 0.2) 0 1px; cursor: default;  }");
    GM_addStyle('#friedns_dead_list > li a.friens_upgrade_action.removed span { display:none }');
    GM_addStyle('#friedns_dead_list > li a.friens_upgrade_action.removed img { display:inline; margin-bottom:-8px; margin-top:-7px; }');
}