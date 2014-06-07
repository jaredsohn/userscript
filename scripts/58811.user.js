// ==UserScript==
// @name           Sunshine Farm Friends
// @namespace      https://id.mixi.jp/asannou
// @description    サンシャイン牧場フレンズ（略してサフレ）は、仮想的なソーシャルグラフを構築し、サンシャイン牧場上だけのマイミク関係を提供します
// @include        http://*.app0.mixi-platform.com/gadgets/ifr?*&app_id=7157&*&view=canvas&*
// ==/UserScript==

var os = window.wrappedJSObject.opensocial;
var gadgets = window.wrappedJSObject.gadgets;
if (!os || !gadgets) return;

var CACHE_EXPIRE = 24 * 60 * 60 * 1000;

var getPeople = function() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://ido.nu/ayaya/safure.cgi?v=2&st=" + encodeURIComponent(window.wrappedJSObject.shindig.auth.getSecurityToken()),
        onload: function(response) {
            var ids = eval(response.responseText);
            var people = [];
            var request = os.newDataRequest();
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                request.add(request.newFetchPersonRequest(id), "person_" + id);
            }
            console.log("send");
            request.send(function(data) {
                console.log("done");
                for (var i = 0; i < ids.length; i++) {
                    var id = ids[i];
                    var item = data.get("person_" + id);
                    var person = item.getData();
                    if (person) people.push(person);
                }
                setTimeout(function() {
                    GM_setValue("people", uneval(people));
                    GM_setValue("expire", "" + (new Date().getTime() + CACHE_EXPIRE));
                    location.reload(true);
                }, 0);
            });
        },
    });
}

var deleteViewer = function() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://ido.nu/ayaya/safure.cgi?v=2&delete=1&st=" + encodeURIComponent(window.wrappedJSObject.shindig.auth.getSecurityToken()),
        onload: function(response) {
            GM_deleteValue("people");
            GM_deleteValue("expire");
            var view = gadgets.views.getSupportedViews()["home"];
            gadgets.views.requestNavigateTo(view);
        },
    });
}

var people = eval(GM_getValue("people"));
var expire = eval(GM_getValue("expire", 0));

if (!people || new Date(expire) < new Date()) {
    getPeople();
    return;
}
console.log(people);

var get = os.DataResponse.prototype.get;
os.DataResponse.prototype.get = function(key) {
    var responseItem = get.call(this, key);
    var rpc = responseItem.getOriginalDataRequest().rpc;
    if (rpc.method == "people.get" && rpc.params.userId[0] == "@viewer" && rpc.params.groupId == "@friends") {
        for (var i = 0; i < people.length; i++) {
            var person = os.Container.get().createPersonFromJson(people[i].fields_);
            people[i] = person;
        }
        var data = responseItem.getData();
        data.array_ = people;
        data.totalSize_ = people.length;
        console.log(responseItem);
    }
    return responseItem;
};

var helpDiv = document.createElement('div')
helpDiv.setAttribute('id', 'socialmonkey_help')
var linkDiv = document.createElement('div')

var links = {
    "Refresh cache": getPeople,
    "Delete account": deleteViewer,
};

for (var i in links) {
    var a = document.createElement('a');
    a.innerHTML = i;
    a.href = 'javascript:void(0)';
    a.addEventListener('click', links[i], false);
    linkDiv.appendChild(a);
    linkDiv.appendChild(document.createElement('br'));
}

helpDiv.appendChild(linkDiv);
document.body.appendChild(helpDiv);

GM_addStyle('#socialmonkey_help {padding:5px;position:fixed;bottom:3px;right:3px;background:#fff;color:#000;border:1px solid #ccc;;text-align:left;z-index:256;}');
GM_addStyle('#socialmonkey_help a {font-size:10px;font-weight:normal;line-height:150%;font-family:verdana;color:#258FB8;text-decoration:underline;}');

