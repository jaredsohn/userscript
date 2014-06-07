// ==UserScript==
// @name           Direct Trading @ ICICI Direct
// @namespace      niraxar.googlepages.com
// @description    A new convenient menu for stock traders on the LBS (Low Bandwidth Site) of ICICIdirect.com
// @include        https://*.icicidirect.com/*lbs*
// @version        0.0.3
// @date           2009-06-06
// ==/UserScript==

// creator - Niraj Prasad, email = np1@nirajp.8k.com
// creation date - June 1st, 2009



var referr = document.referrer;


var giventable = document.getElementsByTagName('table');
var mymenu = document.createElement("div");
mymenu.innerHTML = 
    '<div id="niraxIDtable"><br><br><br><br><br><br><br><br>' +
    '<table border="0" cellpadding="15" width="500"><caption><b>New Menu (by <i>Niraj</i>)</b></caption><tbody>' +
    '<tr>' +
    '    <td><a href="https://secure.icicidirect.com/trading/Equity/Trading.asp">Main Site</a></td>' + 
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/Customer/Trading.asp">Main Menu (ICICIdirect)</a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/logout.asp">Logout</a></td>' +
    '</tr><tr>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/equity/Trading_FBS.asp"> Fast Buy / Sell</a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/equity/order_book.asp">Order Book</a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/equity/Trading_Trade_book.asp">Trade Book</a></td>' +
    '</tr><tr>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/equity/Trading_SLTP_Order.asp">MarginPLUS Order</a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/equity/Trading_OpenPositions.asp">MarginPLUS Positions</a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/equity/trading_margin_positions.asp">Margin Positions</a></td>' +
    '</tr><tr>' + 
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/equity/trading_demat_balance.asp">Demat Balance</a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/equity/trading_modify_alloc.asp">Modify Allocation</a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/lbs/port/portfolio_tracker.asp">Portfolio</a></td>' +
    '</tr><tr>' + 
    '    <td><a href="https://secure.icicidirect.com/trading/equity/trading_security_prjn.asp" target="daughter">BTST <br> (new tab) </a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/equity/trading_demat_balance.asp" target="daughter">Demat Allocation <br> (new tab)</a></td>' +
    '    <td><a href="https://secure.icicidirect.com/trading/portfolio/portfolio_tracker.asp" target="daughter">Detailed Portfolio <br> (new tab)</a></td>' +
    '</tr>' +
    '</tbody></table>' +
    '</div>'; // display a table of 3 rows
document.body.insertBefore(mymenu, giventable.nextSibling);