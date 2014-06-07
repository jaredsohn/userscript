// ==UserScript==
// @name           Bitbucket Strip Shortcuts
// @namespace      http://endflow.net/
// @description    Adds shortcuts for 'strip' operation to overview and changesets page on bitbucket.
// @version        0.1.1
// @include        http://bitbucket.org/*/*/
// @include        http://bitbucket.org/*/*/changesets/
// @include        http://bitbucket.org/*/*/admin/strip/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-07-07] 0.1.0 initial version
//                 [2009-07-08] 0.1.1 enable on overview page

(function(){
// BB: Bitbucket Utils {{{
var BB = {
    isAdmin: function(){
        if(location.href.toString().indexOf('/admin/') != -1) return true;
        var span = $x('id("tabs")/ul/li/a/span[contains(text(),"Admin")]');
        return span && 0 < span.length;
    },
    url: {
        strip: function(id){
            var m = boot.result;
            return 'http://bitbucket.org/' + m[1] + '/' + m[2] + '/admin/strip/?id=' + id;
        }
    }
}
// }}}

// Boot {{{
var Boot = function(){
//    console.log('Boot#new');
    this.result = null;
    this.comp = {
        // [Class Name(string)]: [URL Pattern(regex)]
        //   Item: /^http:\/\/wedata\.net\/items\/\d+$/,
        // [Label(string)]: [URL Pattern(regex), Callback(function)]
        //   home: [/^http:\/\/bitbucket\.org\/?$/, function(m){...}],
        overview: [/^http:\/\/bitbucket\.org\/([^\/]+)\/([^\/]+)\/(overview\/)?$/, UI.overview],
        changesets: [/^http:\/\/bitbucket\.org\/([^\/]+)\/([^\/]+)\/changesets\/$/, UI.changesets],
        strip: [/^http:\/\/bitbucket\.org\/([^\/]+)\/([^\/]+)\/admin\/strip\/\?id=(\d+|[0-9abcdef]{12})$/, UI.strip]
    };
}
Boot.prototype.init = function(){
//    console.log('Boot#init');
    var url = location.href.toString();
    for(var name in this.comp){
        var item = this.comp[name];
        if(item.constructor.toString() == [].constructor.toString()){
            this.result = url.match(item[0]);
            if(this.result){
//                console.log('Boot#init "label:regex,func" type matched: ' + url);
                item[1].call(null, this.result);
                return;
            }
        }else{
            this.result = url.match(item);
            if(this.result){
//                console.log('Boot#init "class:regex" type matched: ' + url);
                eval('new ' + name + '()').init();
                return;
            }
        }
    }
//    console.log('Boot#init: no matches');
}
// }}}

GM_addStyle(<><![CDATA[
.changesets-changeset table td {
    padding: 0 4px 0 !important;
}
.changesets-changeset .right {
    margin-top: -8px !important;
}
]]></>);

// UI {{{
var UI = {
    overview: function(m){
//        console.log('UI#overview');
        $x('//table[@class="maintable"]/tbody/tr[@class="header"]/th[@colspan="2"]')[0].setAttribute('colspan', '3');
        var trs = $x('//table[@class="maintable"]/tbody/tr[@class!="header"]');
        for(var i = 0, l = trs.length; i < l; i++){
            var r = $fc($nc(trs[i], 'td', 4), 'a').href.toString().match(/changeset\/([0-9abcdef]{12})\//);
            trs[i].appendChild($n('td', {className: 'shortlogs-changes-diff'}, [
                $n('a', {className: 'diff-radio', href: BB.url.strip(r[1]), innerHTML: 'strip', style: 'display: none;'})
            ]));
        }
    },
    changesets: function(m){
//        console.log('UI#changesets');
        var tbodies = $x('//div[contains(concat(" ", @class, " "), "changesets-changeset")]/div[@class="right"]/table/tbody');
        for(var i = 0, l = tbodies.length; i < l; i++){
            var r = $fc($fc(tbodies[i], 'tr'), 'td').innerHTML.match(/\d+/);
            tbodies[i].appendChild($n('tr', {}, [
                $n('td', {colspan: '2', innerHTML: '<a href="' + BB.url.strip(r[0]) + '">sprit from here</a>'})
            ]));
        }
    },
    strip: function(m){
//        console.log('UI#strip');
        $x('id("strip-repository")//table//input[@name="node"]')[0].value = m[3];
    }
}
// }}}

// Main {{{
if(!BB.isAdmin()) return;
var boot = new Boot();
boot.init();
// }}}

// Util {{{
function $x(x,c){c=c||document;var res=c.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function $n(t,o,c){var e = document.createElement(t);if(o){
for(var k in o){d=['style','onclick','colspan','rowspan'];
if(d.indexOf(k)!=-1){e.setAttribute(k,o[k])}else{e[k]=o[k]}}
}if(c){c.forEach(function(ch){e.appendChild(ch)})}return e}
function $fc(e,t){var c=e.firstChild;while(c){if(c.nodeType==1
&&c.nodeName.toUpperCase()==t.toUpperCase())return c;c=c.nextSibling}}
function $nc(e,t,n){var i=0;var c=e.firstChild;while(c){if(
c.nodeType==1&&c.nodeName.toUpperCase()==t.toUpperCase()){i++;
if(n==i)return c}c=c.nextSibling}}
// }}}
})();

// vim: set fdm=marker sw=4 ts=4 et:
