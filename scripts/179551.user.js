// ==UserScript==
// @name           FDUPT Extra Menu
// @author         kemege (chaoskmg@gmail.com)
// @namespace      kemege
// @version        0.3
// @description    Send PTP to members that have replied in a certain post.
// @include        http://pt.vm.fudan.edu.cn*
// @grant          none
// @icon           http://pt.vm.fudan.edu.cn/favicon.ico
// ==/UserScript==

var navbar, btnHelp;
var buddy_list, menu_list;
navbar = document.getElementById('menu_nav');
btnPM = document.getElementById('button_pm');
sf = document.getElementById('search_form');
buddy_list = [];
menu_list = {
    'Tracker': {
        'Active Torrents': 'action=profile;area=torrents',
        'Active Torrents By Upload': 'action=profile;area=torrents;active;sort=upload;desc',
        'Torrents History': 'action=profile;area=torrents;history',
        'Unread Posts': 'action=unread',
        'New Replies': 'action=unreadreplies'
    }
};
$.ajax({
    type: 'GET',
    url: 'http://pt.vm.fudan.edu.cn/index.php',
    data: {
        'action': 'profile',
        'area': 'lists',
        'sa': 'buddies'
    },
    processData: true,
    async: false,
    dataType: 'html',
    success: function (data) {
        table = $(data).find('table.bordercolor')[0];
        tbody = $(table).children()[0];
        rows = $(tbody).children();
        $.each($(rows), function () {
            if (this.tagName.toUpperCase() === 'TR') {
                if ($(this).children()[1].innerHTML.indexOf('Online') >= 0 || $(this).children()[1].innerHTML.indexOf('\u5728\u7ebf') >= 0)
                    buddy_list.push([
                        $(this).children()[0].textContent,
                        'on'
                    ]);
                else
                    buddy_list.push([
                        $(this).children()[0].textContent,
                        'off'
                    ])
            }
            ;
        })
    }
});
if (btnPM) {
    buddy_string = '';
    for (var i = 0; i < buddy_list.length; i++) {
        buddy_string += '<li><a href = "http://pt.vm.fudan.edu.cn/index.php?action=profile;user=' + buddy_list[i][0] + '"><span><img src="http://10.107.200.225/Themes/default/images/buddy_user' + buddy_list[i][1] + '.gif"> ' + buddy_list[i][0] + '</span></a></li>\n'
    }
    ;
    menu_buddy = document.createElement('li');
    menu_buddy.id = 'button_buddy';
    menu_buddy.innerHTML = '' + '<a class = "firstlevel" href = "javascript:void(0);"><span class = "firstlevel">Buddies</span></a>' + '<ul>' + buddy_string + '</ul>';
    navbar.insertBefore(menu_buddy, btnPM.nextSibling)
}
if (btnPM) {
    for (var i in menu_list) {
        menu_tab = document.createElement('li');
        menu_tab.id = 'button_' + i;
        menu = menu_list[i];
        menu_string = '<a class = "firstlevel" href = "javascript:void(0);"><span class = "firstlevel">' + i + '</span></a>\n<ul>\n';
        for (var i in menu_list[i]) {
            menu_string += '<li><a href = "http://pt.vm.fudan.edu.cn/index.php?' + menu[i] + '"><span>' + i + '</span></a></li>'
        }
        ;
        menu_string += '</ul>';
        menu_tab.innerHTML = menu_string;
        navbar.insertBefore(menu_tab, btnPM.nextSibling)
    }
    ;
}
if (sf) {
    navbar.parentNode.insertBefore(sf, navbar.nextSibling)
}

// check new PM periodically
var pmIndicator;
function checkNewPM() {
    $.ajax({
        type: 'GET',
        url: 'http://pt.vm.fudan.edu.cn/SSI.php',
        data: {
            'ssi_function': 'menubar'
        },
        processData: true,
        async: false,
        dataType: 'html',
        success: function (data) {
            pmmenu = $(data).find('li#button_pm')[0];
            pmlink = $(pmmenu).children()[0];
            if (pmlink.innerHTML.indexOf('<strong>')>0) {
                alert('You\'ve received a new PM!');
                clearInterval(pmIndicator);
            };
        }
    });
}
pmIndicator = setInterval(checkNewPM, 60000);