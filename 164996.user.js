// ==UserScript==
// @name       WRMS
// @namespace  https://wrms.catalyst.net.nz/
// @version    0.1
// @description  Twitter bootstrap WRMS
// @match      https://wrms.catalyst.net.nz/*
// @copyright  2012+, You
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require    https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.js
// @resource   BootstrapCSS	https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css
// ==/UserScript==

(function ($) {
    if ($('#core-background').length) {
        return;
    }
    var css = GM_getResourceText ('BootstrapCSS');
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
    
    $('#searchbar').remove();
    
    $('#messages').addClass('alert').removeAttr('id');
    
    // Set body tag
    $('body').addClass('container');
    $('body > table').css('margin-top', '70px');
    
    $('#top_menu').attr('id', 'menu');
    $('#menu').addClass('navbar');
    $('#menu #tmnu').addClass('navbar-inner').removeClass('tmnu');
    $('#menu #tmnu span').remove();
    var menu = $('<ul class="nav"></ul>');
    
    $('#menu #tmnu a').each(function () {
       if ($(this).attr('href') == window.location.href) {
       		$(this).addClass('active');    
       }
       var item = $('<li></li>');
       $(this).removeAttr('class');
       item.append($(this).clone());
       $(this).remove();
       menu.append(item);
    });
    
    $('#menu #tmnu').append(menu);
    
    // Move the sidebar to a menu.
    var old_sidebar = $($('td.sidebarleft').html());
    
    var menu = $('<ul class="nav"></ul>');
    var item = $('<li></li>');
        
    item.append($('#topbar').html());
    menu.append(item);
    $('#topbar').remove();
    
    old_sidebar.find('a').slice(0,2).each(function () {
        var item = $('<li></li>');
        item.append($(this).removeAttr('class'));
        menu.append(item);
    });
    
    old_sidebar.find('a').slice(4,5).each(function () {
        var item = $('<li></li>');
        item.append($(this).removeAttr('class'));
        menu.append(item);
    });
    
    
    $('body').prepend($('<div class="navbar navbar-fixed-top"><div class="navbar-inner"><div class="container"></div></div></div>'));
    $('.navbar-inner .container').append(menu);

    var affix = $('<ul class="dropdown-menu"></ul>');
    old_sidebar.find('a').slice(8).each(function () {
        var item = $('<li></li>')
        item.append($(this).removeAttr('class'));
        affix.append(item);
    });
    
    menu.append('<li class="more dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">More<b class="caret"></b></a></li>');
    $('.navbar-inner .container').append($('<form class="navbar-search pull-right"><input type="text" class="search-query" placeholder="Search" id="nav-search"></form>'));
    $('.navbar-inner .container').find('form').submit(function () {
       var query = $('#nav-search').val();
       window.location.href = '/search#wrsearch_q=' + escape(query);
       return false;
    });
    
    $('li.more').append(affix);
    
    $('td.sidebarleft').remove();
    
    $('input[type="submit"]').removeAttr('class').addClass('btn btn-primary');
    
    $('td, th, tr').removeAttr('class').removeAttr('style').css({
        'text-align': 'left',
        color: '#333'
    });
    
    $('table table table.entry').addClass('table table-striped');
    
    $('#form > table').removeClass('data').addClass('table table condensed');
    
    $('input[name="brief"], textarea[name="detailed"]').addClass('input-xxlarge span7');
    
})(jQuery);
