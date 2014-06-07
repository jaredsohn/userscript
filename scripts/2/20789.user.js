// ==UserScript==
// @name           find your neighbors on favotter
// @namespace      http://fuba.moarningnerds.org/
// @include        http://favotter.matope.com/user.php?user=*&mode=fav
// ==/UserScript==

function count_users (you) {
    var entries = $X('//*[@class="info meta entry-meta"]');
    var coo = {};
    var max = 0;
    
    entries.forEach(function(d){
        var imgs=$X('.//img', d);
        
        var users=[];
        for(var i=0;i<imgs.length;i++){
            users.push(imgs[i].title)
        }
        if(users.filter(function(user){
            return(user==you)
        }).length>0) {
            imgs.forEach(function(img){
                var a = img.parentNode;
                var user = img.title;
                if (user!=you) {
                    if (typeof(coo[user]) == 'undefined') coo[user] = {
                        id: user,
                        icon: img.src.replace(/\_mini\./, '_normal.'),
                        url: a.href,
                        count: 1
                    }
                    else {
                        coo[user].count++;
                        if (max < coo[user].count) max = coo[user].count;
                    }
                }
            });
        }
    });
    
    var order = [];
    for (var i in coo) {
        order.push(i);
    }
    
    return {
        'max': max,
        'order': order,
        'users': coo,
    };
}

function stat_users (you) {
    var c = count_users(you);
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
    '.findyourneighbors {background-color: #000;position: fixed; top: 1px; left: 1px; z-index: 1000}',
    '.findyourneighbors a {color: #99FF66;font-weight: bold;}',
].join(''));


location.search.match(/user\=(\w+)/);
var you = RegExp.$1;

var buttons = document.createElement('div');
buttons.className = 'findyourneighbors';

var exec_button = document.createElement('a');
exec_button.appendChild(document.createTextNode("find "+you+"'s neighbors"));
exec_button.addEventListener('click', function () { stat_users(you) }, true);
buttons.appendChild(exec_button);

document.body.appendChild(buttons);


// theft from AutoPagerize
function $X(xpath, node) {
    var node = node || document
    var nodesSnapshot = document.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return (data.length >= 1) ? data : null
}
