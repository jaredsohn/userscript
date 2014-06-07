// ==UserScript==
// @name           Bitbucket Following Repository Shortcuts
// @namespace      http://endflow.net/
// @description    Adds following repository links to the header menu.
// @version        0.1.1
// @include        http://bitbucket.org/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-06-20] 0.1.0 initial version
//                 [2009-07-07] 0.1.1 availabled on anywhere

(function(){
// Bitbucket utilities {{{
var BB = {
    isLoggedin: function(){
        return 0 < $x('id("userimage")').length;
    },
    username: function(){
        return $x('id("userimage")')[0].parentNode.href.toString()
            .split('/').filter(function(s)s!='').reverse()[0];
    },
    dropdownize: function(id){
        with(unsafeWindow){
            $('#' + id).hoverIntent(
                function(){
                    $(this).addClass('has-dropdown-on');
                    $('ul:first',this).css('display','block');
                },
                function(){
                    $(this).removeClass('has-dropdown-on');
                    $('ul:first',this).css('display','none');
                }
            );
        }
    }
}
// }}}

// Storage {{{
var Storage = {
    EXPIRE: 24 * 60 * 60 * 1000, // 1 day
    isExpired: function(truefn, falsefn, thisObj){
        var expired = true;
        var updated = GM_getValue('updated');
        if(updated && updated != ''){
            updated = parseInt(updated);
            var cur = (new Date()).getTime();
            if(cur < updated + Storage.EXPIRE)
                expired = false;
        }
        if(expired)
            truefn && truefn.call(thisObj);
        else
            falsefn && falsefn.call(thisObj);
        return expired;
    },
    save: function(text){
        GM_setValue('data', text);
        var cur = (new Date()).getTime();
        GM_setValue('updated', cur.toString());
    },
    load: function(){
        var text = GM_getValue('data');
        if(text && text != '')
            return eval(text);
        return null;
    },
    clear: function(){
        GM_setValue('data', '');
        GM_setValue('updated', '');
    }
}
// }}}

// Main {{{
// guard (only logged in user)
if(!BB.isLoggedin()){
//    console.log('Need to login.');
    return;
}

// add GM menu
GM_registerMenuCommand('Bitbucket Following Repo Shortcuts - clear cache', Storage.clear);

// load or fetch repos data
var repos = [];
Storage.isExpired(function(){
//    console.log('Expired or nothing.');
    repos = $x('//li[@class="following"]/a[contains(@href, "overview") and not (contains(@href, "' + BB.username() + '"))]')
        .map(function(repo){return repo.href.toString()});
    if(0 < repos.length)
        Storage.save(repos.toSource());
}, function(){
//    console.log('Chache availabled.');
    repos = Storage.load();
}, this);

// build drop-down menu
if(repos.length == 0){
//    console.log('No repositories.');
    return;
}
var account = $x('id("header-nav")/ul/li[child::a[text()="Account"]]')[0];
var followings = $n('li', {className: 'has-dropdown', id: 'followings-dropdown'}, [
    $n('a', {innerHTML: 'Followings'}), $n('ul', {style: 'display: none;'}, repos.map(function(url){
        var m = url.match(/^http:\/\/bitbucket\.org\/([^\/]+)\/([^\/]+)/);
        if(m.length != 3) return null;
        return $n('li', {className: 'header-nav-repo',
            innerHTML: '<nobr><a href="' + url + '">' + m[1] + ' / ' + m[2] + '</a></nobr>'});
    }).filter(function(item){
        return item != null;
    }))
]);
account.parentNode.insertBefore(followings, account);
BB.dropdownize('followings-dropdown');
// }}}

// Util {{{
function $x(x,c){c=c||document;var res=c.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function $n(t,o,c){var e = document.createElement(t);if(o){for(var k in o){
if(k=='style'||k=='onclick'){e.setAttribute(k,o[k])}else{e[k]=o[k]}}
}if(c){c.forEach(function(ch){e.appendChild(ch)})}return e}
})();
// }}}

// vim: set fdm=marker sw=4 ts=4 et:

