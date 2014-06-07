// ==UserScript== 
// @name        Eintracht Frankfurt add old userbox Firefox
// @namespace   eintracht_frankfurt_add_user_box_to_side_bar
// @description Add the old user box to the sidebar Only for Firefox
// @include     http://www.eintracht.de/* 
// @version     2.0
// ==/UserScript== 
$(document).ready(function() { 
    
    $('.span24').css('width', '1180px');
    $('.container').css('width', '1200px');
    $('.ads.scyscraper').css('left', '1250px');
    $('.online-list.unstyled').css('width', '198px');
    $('.online-list.unstyled').css('margin', '0 0 0 0px');
    $('.tooltip-activator.userlink.boy').css('width', '150px');
    $('.tooltip-activator.userlink.girl').css('width', '150px');
    $('.tooltip-activator.userlink.moderator').css('width', '150px');
    $('.tooltip-activator.userlink.admin').css('width', '150px');
    $('.tooltip-activator.userlink.boy').css('max-width', '150px');
    $('.tooltip-activator.userlink.girl').css('max-width', '150px');
    $('.tooltip-activator.userlink.moderator').css('max-width', '150px');
    $('.tooltip-activator.userlink.admin').css('max-width', '150px');

    var div_box_span = $('<div class="box span6"></div>');
    var div_box_span_userlist = $('<div class="box span6"></div>');
    var div_box_login = $('<div class="box_login"></div>');
    var div_box_headline = $('<div class="box-headline"></div>');
    var div_box_headline_h2 = $('<h2></h2>');
    var div_box_overlay = $('<div class="box-overlay"></div>');
    var div_box_content = $('<div class="box-content"></div>');
    var div_box_footer = $('<div class="box-footer"></div>');
    
    var div_right_sidebar = $('<div class="span6 sidebar"></div>');
    
    $.ajax({
        url: "/_ajax/content/profile.php",
        success: function(html){
            var returning_html = $(html);
            var headline_text = returning_html.children().filter('a').html();
            div_box_headline_h2.html(headline_text);
            
            var content_text = returning_html.children().filter('ul').html();
            
            content_text = content_text.replace("txt_nickname","box_txt_nickname"); 
            content_text = content_text.replace("txt_password","box_txt_password");
            content_text = content_text.replace(/doCommunityLogin/g,"doBoxCommunityLogin");
            var div_box_content_ul = $('<ul class="dropdown-menu-login"></ul>');
            div_box_content_ul.html(content_text);
            div_box_content_ul.appendTo(div_box_content);
            //alert(returning_html.children().filter('a').html());
            
            div_box_headline_h2.appendTo(div_box_headline);
            div_box_headline.appendTo(div_box_login);
            div_box_overlay.appendTo(div_box_login);
            //div_box_content.html(html);
            div_box_footer.appendTo(div_box_content);
            div_box_content.appendTo(div_box_login);
            div_box_login.appendTo(div_box_span);
            
            $('#navigation').after(div_box_span);
            
            //var div_sidebar = $('div.span6.sidebar');
            div_box_span.appendTo(div_right_sidebar);
            
            $('.span18.content').after(div_right_sidebar);
            //alert(div_sidebar);
            
            var userlist = $('.online-user-list');
            var userlist_clone = userlist.clone();
            userlist_clone.appendTo(div_box_span_userlist);
            div_box_span_userlist.appendTo(div_right_sidebar);
            
            userlist.parent().css('display', 'none');
        }
    });
                    
    addGlobalStyles();
    addNewLoginFunction();
    
});

function addNewLoginFunction()
{
    var scriptCode = new Array();   // this is where we are going to build our new script
    
    // here's the build of the new script, one line at a time
    scriptCode.push('function doBoxCommunityLogin() {');
    scriptCode.push('$.ajax({');
    scriptCode.push('    url: "/_ajax/meine_eintracht/header/",');
    scriptCode.push('    type: "POST",');
    scriptCode.push('    data: {"login" : 1, "cookie" : ($("#chk_cookie:checked").length ? 1 : 0), "user" : $("#box_txt_nickname").val(), "pass" : $("#box_txt_password").val()},');
    scriptCode.push('    success: function(transport){');
    scriptCode.push('        document.location.reload();');
    scriptCode.push('    }');
    scriptCode.push('});');
    scriptCode.push('return false;');
    scriptCode.push('}');
    
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
    
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script); 
}

function addGlobalStyles()
{
    var head, style;

    head = document.getElementsByTagName('head')[0];

    if (!head) { return; }
    
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.box .box_login .box-overlay { height: auto; }';
    head.appendChild(style);
    
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.box .box_login .box-content { height: auto; }';
    head.appendChild(style);
    
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.box .box_login .box-content .dropdown-menu-login { list-style: none; }';
    head.appendChild(style);
    
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.box .box_login .box-content .dropdown-menu-login input[type="text"], input[type="password"] { width: 150px; }';
    head.appendChild(style);

}