// ==UserScript==
// @name           Userscripts.org Group Tool
// @namespace      http://endflow.net/
// @description    various enhancement for group feature of Userscripts.org.
// @include        http://userscripts.org/scripts/show/*
// @include        http://userscripts.org/groups*
// @version        0.2.2
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-02-03] 0.1.0 first version
//                 [2009-02-03] 0.1.1 improved: prevent transition to group page
//                 [2009-02-03] 0.1.2 improved: show notification on succeed to add
//                 [2009-02-03] 0.1.3 improved: change to drop-down listbox
//                 [2009-02-03] 0.1.4 improved: handle error on failed to add
//                 [2009-02-03] 0.2.0 new: manage fav group from group list page
//                 [2009-04-26] 0.2.1 bugfixed: toggle function on click Heart icon
//                 [2009-04-26] 0.2.2 bugfixed: RegExp for matching URL

(function(){

//// This script consist of 3 parts
////  - [Core]   Launch following component
////  - [Widget] Sidebar widget for script page
////  - [Fav]    Favorite group manager for group or group list page

var Core = {
init: function(){
    if(location.href.search(/^http:\/\/userscripts\.org\/scripts\/show\/\d+/) == 0){
        Fav.prepare();
        Widget.ui();
    }else if(location.href.search(/^http:\/\/userscripts\.org\/groups\/?(\?page=\d+)?$/) == 0){
        Fav.ui();
    }
}
}

var Widget = {
html: <><![CDATA[
    <script type="text/javascript">
    function add_to_group(){
        var notify = $('usdogt_notify');
        new Ajax.Request('/groups/' + $('usdogt_list').value + '/scripts', {
            parameters: {
                authenticity_token: auth_token,
                script_id: /(\d+)\/?/.exec(location.href)[1]
            },
            onSuccess: function(){
                notify.className = 'notice';
                notify.innerHTML = '<span>Added successfully</span>';
            },
            onFailure: function(){
                notify.className = 'notice error';
                notify.innerHTML = '<span>Failed to add</span>';
            },
            onComplete: function(){notify.show();}
        });
    }
    </script>
    <input type="button" value="add" style="width: 40px;" onclick="add_to_group();"/>
    &nbsp;<span>to</span>&nbsp;
    <select id="usdogt_list"/>
]]></>,
ui: function(){
    var ref = $x('id("right")/form')[0].nextSibling;
    var right = $('right');

    var h6 = $n('h6');
    h6.innerHTML = 'Groups';
    right.insertBefore(h6, ref);

    var form = $n('p');
    form.innerHTML = this.html;
    right.insertBefore(form, ref);

    var list = $('usdogt_list');
    for(var k in Fav.groups){
        var opt = $n('option');
        opt.value = Fav.groups[k];
        opt.innerHTML = k;
        list.appendChild(opt);
    }

    var box = $n('p');
    box.id = 'usdogt_notify';
    box.style.display = 'none';
    right.insertBefore(box, form);
}
}

var Fav = {
groups: {},
prepare: function(){
    this.groups = eval(GM_getValue('groups')) || {
        'Flickr scripts': 13,
        'Google': 9,
        'Last.fm': 32,
        'NicoVideo': 39
    };
},
style: <><![CDATA[
.group .gfav
{
    background: transparent url(/images/heart.png) no-repeat scroll center center;
    padding-right: 18px;
}
.group .gunfav
{
    background: transparent url(/images/unheart.png) no-repeat scroll center center;
    padding-right: 18px;
}
]]></>,
ui: function(){
    GM_addStyle(this.style);
    this.prepare();

    var scope = this;
    var html = function(name, id){
        var js = "usdogt_exec(this, '" + name + "', '" + id + "');return false";
        if(scope.has(name))
            return '<a class="gunfav" title="Remove from favorites" href="" onclick="' + js + '"/>';
        return '<a class="gfav" title="Add to favorites" href="" onclick="' + js + '"/>';
    }

    // embed button handler to window scope
    unsafeWindow.usdogt_exec = function(el, name, id){
        el.className = (el.className == 'gfav') ? 'gunfav' : 'gfav';
        scope.has(name) ? scope.remove(name) : scope.add(name, id);
        el.parentNode.innerHTML = html(name, id);
    }

    // adds table header 'Favorites'
    var header = $n('th');
    header.className = 'la tiny';
    header.innerHTML = '<a href="">Favorites</a>';
    $x('id("group_list")/tbody/tr[not(@class)]')[0].appendChild(header);

    // add cells contains heart icon
    $x('id("group_list")/tbody/tr[@class="group"]').forEach(function(tr){
        var id = tr.innerHTML.match(/\/groups\/(\d+)/)[1];
        var name = $x('id("group_list")/tbody/tr/td/b/a[@href="/groups/' + id + '"]')[0].innerHTML;
        var cell = $n('td');
        cell.className = 'ca inv';
        cell.innerHTML = html(name, id);
        tr.appendChild(cell);
    });
},
add: function(name, id){
    this.groups[name] = id;
    this.store();
},
remove: function(name){
    delete this.groups[name];
    this.store();
},
has: function(name){
    return !!this.groups[name];
},
store: function(){
    var scope = this;
    setTimeout(function(){
        GM_setValue('groups', scope.groups.toSource());
    }, 0);
},
debug: function(){
    var buf = '[usdogt] ';
    for(var name in this.groups)
        buf += name + ': ' + this.groups[name] + ', ';
    console.log(buf);
}
}

// main
Core.init();

// utils
function $x(x,c){c=c||document;var r=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=r.iterateNext();nodes.push(i));return nodes}
function $(id){return document.getElementById(id)}
function $n(tagName){return document.createElement(tagName)}
})();
