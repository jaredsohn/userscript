// ==UserScript==
// @name           10k Tools Enhancer
// @namespace      yijiang
// @include        http://stackoverflow.com/*
// @exclude        http://stackoverflow.com/reputation
// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function ($) {
    
    function Storage(name, extentions) {
        this.storageName = name;
    
        if (localStorage[this.storageName] != null) {
            this.items = JSON.parse(localStorage[this.storageName]);
        } else {
            this.items = {};
        }
    
        this.add = function (id, data) {
            this.items[id] = data;
            localStorage[this.storageName] = JSON.stringify(this.items);
        }
    
        this.remove = function (id) {
            items[id] = undefined;
            localStorage[this.storageName] = JSON.stringify(this.items);
        }
        
        for(var i in extentions){
            this[i] = extentions[i];
        }
    };
    
    // Keeps track of flags using localStorage
    var lastUpdate = parseInt(localStorage['tenkmod:lastflagupdate'], 10) || 0,
        flags = new Storage('tenkmod:flags'),
        now = new Date().getTime();
    
    if(now - lastUpdate > 300000){
        localStorage['tenkmod:lastflagupdate'] = now;
        
        function getFlags(n){
            $.get('http://stackoverflow.com/tools/flagged', {
                    page: n
                }, function(data){
                var page = $(data);
                
                page.find('.default-view-post-table > tbody > tr:not(.loaded-body)').each(function(){
                    var t = $(this),
                        f = t.find('td:first-child table tr:first-child td');
                    
                    flags.add(t.children('td:eq(1)').attr('id').split('-')[3], {
                        offensive: f.eq(0).text(),
                        spam: f.eq(1).text()
                    });
                });
                
                if(page.find('.pager span:contains(' + (n+1) + ')').length) getFlags(n+1);
            });
        };
        
        getFlags(1);
    }
    
    if (window.location.pathname.match(/^\/questions\/[\d]+\//)) {
        // Shifts "edit tags" button to somewhere more comfortable
        $(window).load(function () {
            $('#edit-tags').insertAfter('.post-menu a:eq(1)').before('<span class="lsep">|</span>');
        });
        
        // Adds flaged count to posts
        $('.post-menu a[id^=flag-post-]').each(function(){
            var f = flags.items[this.id.substring(10)];
            
            if(f){
                $(this).text(function(i, t){
                    // Vodoo - please do not remove the '+' in front of the inner bracket
                    return (t + ' (' + +(+f.offensive + +f.spam) + ')');
                }).click(function(){
                    console.log($(this).siblings('.flag-menu').find('form label'));
                });
            }
        });
    }
});