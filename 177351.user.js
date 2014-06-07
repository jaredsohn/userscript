// ==UserScript==
// @name        I hate my friends
// @description for those of us who hate our friends
// @namespace http://github.com/hattmammerly/userscripts/
// @include *.facebook.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version 1.0
// ==/UserScript==
// Heavily based on http://userscripts.org/scripts/show/150411
// But updated and I don't advertise or secretly like my website's page.

function sleep(rem){ //rem for removed entries
    setInterval(function() {
        popup(rem);
    }, 1000);
}

function popup(rem) {
    $('div.dialog_body').html(rem + ' removed.');
}

var page = "";
//button placement:
if ($("#pagelet_timeline_medley_friends").length > 0) {
    $('#medley_header_friends').append("<div id=\"delete_buttons\" style=\"float:right;margin-left:5px;\"></label><label for=\"Ihavenofriends\" class=\"_11b uiButton uiToolbarButton\"><input type=\"submit\" id=\"mass_deleter\" value=\"Delete Selected Friends\"></label></div>");
    $('.stickyHeaderWrap .back').css('height', '60px');
    $('.fbTimelineSection.mtm').css('margin-top', '10px');
    page = "friends";
} 

set_timer();

$("#mass_deleter").live("click",function() { //well .live() is deprecated in 1.7 and removed in 1.9 but .click() seems to break groups (and only groups)
    var i = 0;
    $('.marked:checkbox:checked').each(function() {
        i = i + 1;
        var profileid = $(this).attr('id');
        var a = document.createElement('script');
        if (page === "friends") {
            a.innerHTML = "new AsyncRequest().setURI('/ajax/profile/removefriendconfirm.php').setData({ uid: " + profileid + ",norefresh:true }).send();";
        }
        document.body.appendChild(a);
    });

    alert('It probably worked.');

    if (i === 0) {
        alert('Select at least one entry to remove.\nContact me if it\'s broken');
    }
    sleep(i);
});

function set_timer() {
    set_checkboxes();
    t = setTimeout(function() {
    set_timer()
    }, 1000);
}

function set_checkboxes() {
    if (page === "friends") {
        friends_checkboxes();
    } 
}

function friends_checkboxes() {
    var search = false;
    $('li.fbProfileBrowserListItem.uiListItem').each(function(index) {
    search = true;
    });
    if (search) {
        $('div.fbProfileBrowserList ul li.fbProfileBrowserListItem.uiListItem').each(function(index) {
            var id = $(this).find('div.fsl a').attr('data-hovercard'); //hovercard attribute is a url ending with friend's id
            if (!id) {
                id = $(this).find('div.fsl a').attr('ajaxify'); 
            }
            if (!id) {
                id = '1';
            }
            var profileid = parseInt(/(\d+)/.exec(id)[1], 10); //extract bare id number from attribute
            if (!$(this).find('input').hasClass('marked')) {
                $(this).find('input').prepend('<input type="checkbox" class="marked" id="' + profileid + '">');
             }
        }); //all of that was search page code so we get to do that again for the main friends page
    } else {
        $('div.fsl').each(function(index) {
            if ($(this).hasClass('fwb')) {
                var id = $(this).find('a').attr('data-hovercard');
                if (!id) {
                    id = $(this).find('a').attr('ajaxify');
                }
                if (!id) {
                    id = '1';
                }
                var profileid = parseInt(/(\d+)/.exec(id)[1], 10);
                if (!$(this).children().hasClass('marked')) {
                    $(this).prepend('<input type="checkbox" class="marked" id="' + profileid + '">');
                }
            }
        });
    }
}
