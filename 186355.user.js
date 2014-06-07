// ==UserScript==
// @name          Slither Board for Little Golem
// @namespace     http://slither-board.appspot.com
// @description   Add a link to the Slither Board for Slither games on LG.
// @include       http://www.littlegolem.net/jsp/game/game.jsp?gid=*
// ==/UserScript==

if (document.title.startsWith("Slither"))
{
    // create the link
    var a = document.createElement('a');
    a.href = "http://slither-board.appspot.com/board?url=" + 
              encodeURI(document.URL);
    a.appendChild(document.createTextNode('Analyze this game on SlitherBoard'));

    // search for the <hr> tag (horizontal rule)
    var hrs = document.evaluate('//hr', document, null, 
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // pick the last of them (there should be only one anyway)
    var hr = hrs.snapshotItem(hrs.snapshotLength - 1);

    // add the link
    hr.parentNode.insertBefore(a, hr);
}
