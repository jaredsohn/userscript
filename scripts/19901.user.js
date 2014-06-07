// ==UserScript==
// @name           visualize twitterers
// @namespace      http://fuba.moaningnerds.org/
// @include        http://twitter.com/*
// ==/UserScript==

function count_users (do_sort) {
    var users = {};
    var posts = $X('//li[contains(@class, "hentry")]');
    var max = 0;
    
    for (var i=0;i<posts.length;i++) {
        var a = $X('.//a[contains(@class, "screen-name")]', posts[i])[0];
        var img = $X('.//a[contains(@class, "profile-pic")]//img', posts[i])[0];
        
        unsafeWindow.console.log([a, img]);
        
        var id = a.innerHTML;
        if (typeof(users[id]) == 'undefined') users[id] = {
            id: id,
            icon: img.src,
            url: a.href,
            count: 1
        }
        else {
            users[id].count++;
            if (max < users[id].count) max = users[id].count;
        }
    }
    
    var order = [];
    for (var i in users) {
        order.push(i);
    }
    if (do_sort) {
        order = order.sort(function (l, r) {
            return (users[l].count < users[r].count) ? 1 : -1
        });
    }
    
    return {
        'max': max,
        'order': order,
        'users': users,
    };
}

function stat_users (do_sort) {
    var c = count_users(do_sort);
    var unit = 300 / c.max;
    var p = document.createElement('p');
    p.className = 'statisticsdisp';
    var order = c.order;
    for (var i=0;i<order.length;i++) {
        var u = c.users[order[i]];
        p.innerHTML += [
            '<a href="',
            u.url,
            '" title="',
            u.id,
            ':',
            u.count,
            '"><img src="',
            u.icon,
            '" style="width:',
            parseInt(u.count * unit),
            'px">'
        ].join('');
    }
    document.body.appendChild(p);
    p.addEventListener('dblclick', function () {
        this.parentNode.removeChild(this);
    }, true);
}

GM_addStyle([
    '.statisticsdisp {',
        'display:block;position:fixed;height:100%;width:100%;',
        'top:0;left:0;background-color:#000;overflow:auto;z-index:1000;',
        'text-align:left;',
    '}',
    '.statisticsdisp img {float:left;}',
].join(''));

var section = document.createElement('div');
section.className = 'section';
var section_header = document.createElement('div');
section_header.className = 'section-header';
section_header.innerHTML += '<h1>Visualize</h1>';

var buttons = document.createElement('div');

var exec_button = document.createElement('a');
exec_button.appendChild(document.createTextNode('stat'));
exec_button.addEventListener('click', function () { stat_users(false) }, true);
buttons.appendChild(exec_button);

buttons.appendChild(document.createTextNode(' / '));

var exec_button_sort = document.createElement('a');
exec_button_sort.appendChild(document.createTextNode('stat(sort)'));
exec_button_sort.addEventListener('click', function () { stat_users(true) }, true);
buttons.appendChild(exec_button_sort);

section.appendChild(section_header);
section.appendChild(buttons);
document.getElementById('side').appendChild(section);


// $X() from http://lowreal.net/blog/2007/11/17/1
// $X(exp);
// $X(exp, context);
// $X(exp, type);
// $X(exp, context, type);
function $X (exp, context, type /* want type */) {
    if (typeof context == "function") {
        type    = context;
        context = null;
    }
    if (!context) context = document;
    var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
        var o = document.createNSResolver(context).lookupNamespaceURI(prefix);
        if (o) return o;
        return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
    });

    switch (type) {
        case String:
            return exp.evaluate(
                context,
                XPathResult.STRING_TYPE,
                null
            ).stringValue;
        case Number:
            return exp.evaluate(
                context,
                XPathResult.NUMBER_TYPE,
                null
            ).numberValue;
        case Boolean:
            return exp.evaluate(
                context,
                XPathResult.BOOLEAN_TYPE,
                null
            ).booleanValue;
        case Array:
            var result = exp.evaluate(
                context,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            );
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        case undefined:
            var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
            switch (result.resultType) {
                case XPathResult.STRING_TYPE : return result.stringValue;
                case XPathResult.NUMBER_TYPE : return result.numberValue;
                case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
                    // not ensure the order.
                    var ret = [];
                    var i = null;
                    while (i = result.iterateNext()) {
                        ret.push(i);
                    }
                    return ret;
                }
            }
            return null;
        default:
            throw(TypeError("$X: specified type is not valid type."));
    }
}
