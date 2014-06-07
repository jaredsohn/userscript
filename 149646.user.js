// ==UserScript==
// @name           Asana Inbox Notification Icon Change
// @version        1.2.1
// @description    Notifies the user (for pinned tabs where there's no title) they have a notification by changing the icon color.
// @include        https://app.asana.com/*
// ==/UserScript==

//Code borrowed from ... Facebook Notification Icon Change from Ed G

var favicons = ['data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wP///8k////Rf///0X///9F////Rf///0X///9F////Rf///0X///9F////JP///xv///9F////Rf///yf///8t9+nTUdydP7rXjyP01o0f/9aNH//WjR//15En6NydP7rcnT+62ZYx0f///0X///9FLLtXrg+yQNz///9F////RdiULN3WjR//2JQs3d+lTqLfpU6i36VOotiULN3WjR//1o0f/9mWMdH///9F////OV7Lf39CwmmX////Rf///0XWjR//2pk3xf///0X///9F////Rf///0X///9F6MCDdNePI/TZljHR////Rf///x7///9F////Rf///yr///9F1o0f/9eRJ+jsypdo////Rf///0X///9F////Rf///0XZljHR2ZYx0f///0X///85Xst/f0LCaZb///9F////Rd+lTqLWjR//1o0f/9eRJ+jZljHR36VOot+lTqLowIN02ZYx0dmWMdH///9F////RSy7V64PskDd////Rf///yT///9F6MCDdN2hRq7ZljHR1o0f/9aNH//WjR//1o0f/9aNH//ZljHR////Rf///yH///9FAAAAAP///zD///9C6MCDdPHXsVz///9F////Rf///0X///9F6MCDdNydP7rWjR//2ZYx0f///0X///8q29rZadva2aL///9C////RdeRJ+jXkSfo9+nTUf///0X///9F////Rf///0X36dNR15En6NmWMdH///9F////Rdva2ebb2tn/////Rf///0Xhq1mX1o0f/9ePI/TdoUau36VOot+lTqLcnT+6148j9NaNH//hq1mX////Rf///yrb2tlp29rZov///0L///8V////ReOwZIvYlCzd1o0f/9aNH//WjR//1o0f/9iULN3jsGSL////Rf///xX///8G////Ff///xj///8JAAAAAP///xL///9F////Rf///0X///9F////Rf///0X///9F////Rf///xIAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAP//AAD//wAAwBkAAIAdAACfnwAAn50AAICZAADgHwAA/x0AAJ+ZAACAHQAAwD8AAP//AAD//wAA//8AAA==',
                'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIR/eECEf3oAhH97gIR/e/yEf3v8hH97/IR/e8CEf3rAhH95wIR/e/wAAAAAApyNAAKgghwCnI0AAAAAAAAAAACEf3sAhH97/IR/e4CEf3pAhH96AIR/egCEf3rAhH97/IR/e/yEf3v8AAAAAAKgghwCtNP8AqCCHAAAAAAAAAAAhH97/IR/esAAAAAAAAAAAAAAAAAAAAAAAAAAAIR/eICEf3tAhH97/AAAAAACnISYAqCCHAKchJgAAAAAAAAAAIR/e/yEf3uAhH94wAAAAAAAAAAAAAAAAAAAAAAAAAAAhH96AIR/e/wAAAAAApyNAAKgghwCnI0AAAAAAAAAAACEf3oAhH97/IR/e/yEf3uAhH97AIR/egCEf3oAhH95QIR/ekCEf3v8AAAAAAKgghwCtNP8AqCCHAAAAAAAAAAAAAAAAIR/eQCEf3pAhH97AIR/e/yEf3v8hH97/IR/e/yEf3v8hH97/AAAAAACnISYAqCCHAKchJgAAAAAAAAAAIR/eQCEf3iAAAAAAAAAAAAAAAAAAAAAAIR/eQCEf3oAhH97wIR/e/wAAAAAApyNAAKgghwCnI0AAAAAAAAAAACEf3v8hH97AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIR/esCEf3v8AAAAAAKgghwCtNP8AqCCHAAAAAAAAAAAhH96QIR/e/yEf3uAhH96QIR/egCEf3oAhH96gIR/e4CEf3v8hH96wAAAAAACnISYAqCCHAKchJgAAAAAAAAAAAAAAACEf3oAhH97gIR/e/yEf3v8hH97/IR/e/yEf3uAhH96AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
		];

function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

function trim(str) {
    return str.match(/^\W*(.*?)\W*$/)[1];
}

function remove(node) {
    if (node.parentNode)
        node.parentNode.removeChild(node);
}

function processPage() {
    var total = 0;

    var icon = $('.feed-icon', null, true);
    if (!icon) { count = 0 } else {
        count = (icon[0].className.indexOf('unread') >= 0) ? 1 : 0; 
    }
    total = total + count;

    if (total > 0) {
        total = 1;
    }

    var head = document.getElementsByTagName('head')[0];
    var lns = head.getElementsByTagName('link');

    for (var i = 0; i < lns.length; i++) {
        v = lns[i];
        var relval = trim(v.getAttribute('rel'));
        if (relval == 'shortcut icon' || relval == 'icon')
            remove(v);
    }
    var newln = document.createElement('link');

    newln.setAttribute('rel', 'icon');
    newln.setAttribute('href', favicons[total]);
    head.appendChild(newln);

}
processing = setInterval(processPage, 1000);
processPage();
