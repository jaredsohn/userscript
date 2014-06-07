// ==UserScript==
// @name            GLB Trading Block Links
// @description     Adds a link to a team's trading block on the team profile page
// @include         http://goallineblitz.com/game/team.pl?team_id=*
// ==/UserScript==
function tb_links() {
modhtml(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[2]/DIV[4]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/(\d*)">Offer Trade<\/a>/i,'$1">Offer Trade</a>&nbsp;|&nbsp;<a href="/game/market_trade_block.pl?view_id=$1">Trading Block</a>',null);
};
window.addEventListener("load", function() { tb_links() }, false);
function modhtml(doc, element, m, r) {
    m = new RegExp(m);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(m, r);
    };
};
