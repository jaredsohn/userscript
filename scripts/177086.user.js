// ==UserScript==
// @name        NSBHelper
// @namespace   
// @description Na sosach helper
// @include     *0chan.hk/*
// @version     1
// @grant   none
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(function() {
function uibutton(text, fn, landing, id) {
    if(typeof landing === 'undefined') landing = ".postform nobr";
    var btn = $('.uibutton:first').clone().removeAttr('onclick');
    btn.find('span').text(text);
    if(typeof id !== 'undefined') {
        $(btn).attr('id', id);
    }
    $(btn).prependTo(landing).click(function() { fn(); return false });
}
var naSosachList = function() {
    this.sent = {};
    this.refresh = function() {
        var totalsent = 0;
        this.sent = JSON.parse(localStorage.getItem('sosachSent'));
        for(var board in this.sent) {
            totalsent += this.sent[board].length;
        }
        $("#ns").text('Отправлено на сосач: '+totalsent);
    }
    this.isSent = function(post) {
        var posts = this.sent[this_board_dir];
        for(var p in posts)
        {
            if(post === posts[p])
            {
                return true;
            }
        }
        return false;
    }
    this.send = function(post) {
        if(this.isSent(post)) return false;
        if(typeof this.sent[this_board_dir] === 'undefined') this.sent[this_board_dir] = [];
        this.sent[this_board_dir].push(post);
        localStorage.setItem('sosachSent', JSON.stringify(this.sent));
        this.refresh();
    }
}

ns = new naSosachList();

$(window).ready(function(){
    $('<li id="ns"></li>').prependTo(".rules ul");
    ns.refresh();
    uibutton('S&H', function() {
        markup('Сажа/скрыл.', '');
        $("#sage").attr('checked', true);
        var threadnum = $("[id^=thread]").attr('id').split('thread')[1].replace(/\D+/, '');
        togglethread(threadnum);
    });
    uibutton('Random', function() {
        $.get('http://0chan.hk/random.php', function(data) {
            $('textarea#message').val(data.replace(/(<br \/>)/mg, ''));
        });
    });
    uibutton('НСБ', function() {markup('На сосач, быдло.', '')});
    $('.postnode').each(function() {
        var num = $($(this).find('.reflink a')[1]).text().replace(/\s+/g, '');
        if(!ns.isSent(num)) {
            uibutton('ϟ', function() {
                $('textarea#message').val($('textarea#message').val()+'>>'+num+'\nНа сосач, быдло.\n');
                ns.send(num);
                $("#nsb"+num+this_board_dir).fadeOut('fast');
            }, $(this).find('.extrabtns'), "nsb"+num+this_board_dir);
        }
    });
});
});    


