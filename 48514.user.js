// ==UserScript==
// @name           Service Icons In FriendFeed
// @description    Adds service icons to entries on FriendFeed
// @namespace      http://userscripts.org/users/66726
// @author         Azeem Arshad
// @include        http://friendfeed.com*
// ==/UserScript==

$ = unsafeWindow.jQuery;
var service_icons = {};

function set_icon(entry, icon) {
    entry.find('.info')
    .css('padding-left', '20px')
    .css('background', 'transparent url('+icon+') no-repeat scroll left center');
    entry.data('service_icon_isset', true);
}

function apply_icons() {
    var entry = $(this),
        service, service_name, icon, eid;
    
    if(entry.data('service_icon_isset'))
        return
    
    service = entry.find('.service');
    if(!service.size())
        icon = service_icons['FriendFeed'];
    else {
        service_name = service.text();
        if(service_name in service_icons)
            icon = service_icons[service_name];
        else if(service_name == 'Bookmarklet')
            icon = service_icons['FriendFeed'];
        else {
            eid = entry.attr('eid');
            $.getJSON("http://friendfeed.com/api/feed/entry/" + eid + "?callback=?", function(data) {
                var icon;
                icon = data.entries[0].service.iconUrl;
                set_icon(entry, icon);
            });
            return
        }
    }
    set_icon(entry, icon)
}

$.getJSON('http://friendfeed.com/api/services?callback=?', function(data) {
    for(id in data.services)
        service_icons[data.services[id].name] = data.services[id].iconUrl;
    
    old_prepend = $.fn.prepend; 
    $.fn.prepend = function() {
        var r = old_prepend.apply(this, arguments),
            element = $(this);
        if(element.is('#feed'))
            element.find('.entry:first').each(apply_icons);
        return r;
    }
    
    old_after = $.fn.after;
    $.fn.after = function() {
        var r = old_after.apply(this, arguments),
            element = $(this);
        if(element.hasClass('entry'))
            element.nextAll('.entry').each(apply_icons);
        return r;
    }
    
    $('.entry').each(apply_icons)
});