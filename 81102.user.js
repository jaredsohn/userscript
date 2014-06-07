// ==UserScript==
// @name                UnReal
// @namespace           UnReal
// @description         Hides most obvious Real ID threads on the General Discussion forums. Threads started by blues are not hidden.
// @include             http*://forums.worldofwarcraft.com/board.html*
// @version             1.0
// ==/UserScript==

(function() {
    if (window !== window.top || document.title.indexOf('General Discussion') == -1) {
        return;
    }

    function xpath(path, root) {
        return document.evaluate(path, root, null, XPathResult.ANY_TYPE, null);
    }

    var _threads = xpath('.//tr[@class="rows"]', document);
    var threads = [];

    while (thread = _threads.iterateNext()) {
        threads.push(thread);
    }

    var _table = threads[0].parentNode;

    for (var i = threads.length; i--;) {
        var thread = threads[i];

        if (xpath('.//span[@title="Blizzard Rep"]', thread).iterateNext()) {
            continue;
        }

        var title = xpath('.//a[@class="active"]', thread).iterateNext().innerHTML;

        if (/real( |\-)?(id|i\.d\.)|reald|first( |\-)?name|last( |\-)?name|real( |\-)?name|forum|cancelling|privacy|constitutional|facebook|activision|illegal/i.test(title)) {
            _table.removeChild(thread);
        }
    }

    var _style = document.createElement('style');
    _style.setAttribute('type', 'text/css');
    _style.innerHTML = [
        'tr.rows:nth-child(even) > td { border-color: #000 #000 #252525 #252525; background-image: url("data:image/gif;base64,R0lGODlhAQAUAKIAACMjIyEhIR4eHiIiIh8fHyAgICQkJCUlJSH5BAAAAAAALAAAAAABABQAAAMLKEJUHmEMAIw9+CQAOw=="); background-color: #252525; }',
        'tr.rows:nth-child(odd) > td { border-color: #000 #000 #161616 #161616; background-image: url("data:image/gif;base64,R0lGODlhAQAUALMAAAwMDBMTExEREQ4ODgsLCxYWFhAQEA0NDRQUFBISEg8PDxUVFQAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABQAAAQOkIBzhlLGiJQCQktYFBEAOw=="); background-color: #161616; }'
    ].join('');

    var _head = document.getElementsByTagName('head')[0];
    _head.appendChild(_style);
})();