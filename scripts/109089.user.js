// ==UserScript==
// @name        Travian4 - Quick action to my other village
// @description you can send army/resource by one click
// @license     GNU General Public License (GPL)
// @author      ww_start_t
// @version     1.0.1
// @include     http://*ts*.travian*.*/*
// @exclude     http://*.travian*.*/
// ==/UserScript==

/********************************************************************
---------------------------------------------------------------------
--->   This script was developed by Microsoft Visual Studio.
--->   Everyone is permitted to copy and distribute verbatim copies of this license document, but changing or editing it is not allowed.
---------------------------------------------------------------------
********************************************************************/

function C(value) { return parseInt(value) };
function ID(id) { return document.getElementById(id) };
function Xpath(path) { return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); };

var img = {
    attack: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGETotXvSOywAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACI0lEQVQokW3Lz0uTcQDH8c/3eR5jublfkZZrTNuWUTktDULE6FJ2KfKUB1uSByMaj0H3/oJ67BJEoOJBuoV16hBkOJY/xqPo09A9OpvP1G26Z9uzZ25j+3YMoje8jm+Eo4d0XkrRpKoHKKX4n6RaDMxLKRqOHlJGL9WwtqtD3M6PZ/IlP/4po5UfibG8sLarQy9VwTSZWZ6rFRBJ6IgktDcZ7e+U0cr+iKIJEaVAuGoBjWaWJ5RSrG4m/CtbKUGtWqwXm+tpZ6t5DAAVY3khohSIlc2pHedPjfm8jkkOAHze5qmceoQlWZnYrnMSQojQYGCgHJVQzSlodZt5n9cxBQAMAKTlRf9Vt03s9lh5LbWD1VgWxQqFoZxEt8fGX3PbxVR0wQ8A3La82THzfvqVz8m5rj8I8PJ+AXvpGMJyC9pd5+A9rePbzOvwarzy++GIbYUVxt8e2BrPinPB5VvHueRg2tiJuLwOk4GFWjEgu/alf11O79wbHB5uu3Q5xAHAGVPF1Ww3WCRpExfaZtF3tw8cy0JamIW0IcNhr7c0GSsuAOAS0o9A8OsnQYomSLFEVUIY9WQx3sJyddiIFWP7B2lL9ojYjJ8/TvTcPrayN7y20NKvfVKrUTx78XLUc6Vrci64fFOnDdk7A4OPe3t7fi6Ggvf3DjVSyyn9XJkxoVqtYejJKO9t75oCAKPp+QDHnYDT5RIBfB8aeWqd/vBOKDFG/AFEDxKNtU2dSAAAAABJRU5ErkJggg%3D%3D',
    sendRes: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGEgE3nWIm0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABO0lEQVQokX2Qv0tCURTHP9efkFTLoyLQhtTASVpqFiJabGtrtf6AQKKtJaS9waHGBh3EhgYlAhch0DsVZBJmWEmkYA49sttg7+Uz6Tudc8/9cDgfoZTCyP7u9m/zk9brEy6hSCSzwnhzDAJrkXkLkE4VcAn+xDEMpFMFc+gP+LirPFi2ANiMQsoaR8eX+AM+mp0e9/UGuYsi5ZsO8VhUjYSKstqHy2W67Rc2N1ZZiSyzGJ5GV8ICikERAFe5QzU1G6DZqCBlDYDr27pFhm0UYCQcngMgFPRatpnQ+emBBTDqQfDPTZpm2v838VhU2QDOTvbU82PbMmw2Kpa+KKvoqm/evrTgVl+fOpl8iY9Om3FPj27nzfwsZc0063basYsheztb66r1rpv9xJiLUNDLjDZJJl9C8zhJJLPiG9UDhfU4C7tHAAAAAElFTkSuQmCC',
    button: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wgFERssNYmTgQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACoElEQVQokX2SX0hTcRTHv797r9t0c5ta2kybZa4MymX2EGSoSPQHRISIHmRCYfaQaUTSW/QWJM4eKiQcIRSkgfkoRqYikuZuMrbVvDpR15yr3bk/us3d24NprFXn8ZzDh3M+5xBRFPGveHCvKano836DhIh42DVAtnPM/wDnqwoTcn29o5CQ5F7KzP0Qx21ecdW/3vw3QF/vKDiXAtG9Dbh81wQACVMAABWOCLAshcHOBzp9gYhhu8CyC3jSPYyqi3XILKmDZSmMcCQOsy2AtsaahDWpHCXdwggh2F1h2F3BDl9wCzTBcig7VQGpthL25TBS4iGszQ6iVJ+DqEgSQEQURcw4XIbPc6tGPq5SH85NE/X7la0ARNYZMNqXg2QXw0OXzmF6bBgAYP26mCCXbF9nbNJimOL8prSsfHIgOxXpMgq25TB4zwLOFm8g5DHvrPkniAIALzdpOF6YwZYdVLcEVxcw4/QjHBUgi3lQXbwJpSwOTd4xAIBerwUAHNHl/3YyzzlKurp67r9/2W4u0siRpZQi6nPCPMcjKycP6jQG7NAg3vS9Ay1RJZ23rbFGpI2dj1cysjXsyPinyo01zxWvXI9FzgKFlAa/KUPwywic7iBOl+sgxHgAgNvtxwTLgUlhQJNfz7ZHEdPmZspUVqsDukNvUX7uDBiahvXjAKyOOezbLUeqVIJQbMvJBMslTMO4rKPN44P9Ruusi6xHRJ4Qik9dXyqgmRTYuQBWPF7w3ylIqRgiUiUAoLa6FP1D0ztiyeuO2+KUzY14XMD1W3caIgLtHHjVbVKqMkjFhdoGGS0UPDM+MlEUISeLNbjU2p70+EyUUiAeF1B/taml6OiJFwAgV9ysYxgJ8rVaFsCH+ms31D3PnxojlDxJLAD8BK1JMFiOF3AbAAAAAElFTkSuQmCC'
};

function addQuickSend() {
    document.body.style.cursor = 'wait';
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", location.href, false);
    xhttp.send("");
    respText = xhttp.responseText;

    var xBody = document.createElement("xbody");
    xBody.setAttribute('id', 'xbody');
    xBody.setAttribute('style', 'display: none;');
    xBody.innerHTML = respText;
    document.body.parentNode.appendChild(xBody);

    var Length = ID('villageList').getElementsByTagName('div')[1].getElementsByTagName('ul')[0].getElementsByTagName('li').length;

    for (c = 0; c < Length; c++) {
        var Xp = Xpath("/html/xbody/div[@id='wrapper']/div[@class='bodyWrapper']/div[@id='mid']/div[@id='side_info']/div[@id='villageList']/div[@class='list']/ul/li[" + (c + 1) + "]/a").snapshotItem(0).getAttribute("title");

        var a = document.createElement('div');
        a.innerHTML = Xp;
        a.setAttribute('id', 'X_Y_Coord');
        a.setAttribute('style', 'display: none;');
        document.body.appendChild(a);

        var topA = '1';
        var topB = '1';
        if (c > 0) { topA = C(C(1) + C(C(18) * C(c))); topA = C(C(1) + C(C(18) * C(c))); };
        var RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');

        var x = ID('X_Y_Coord').getElementsByClassName('coordinateX')[0].innerHTML.replace(')', '').replace('(', '');
        var y = ID('X_Y_Coord').getElementsByClassName('coordinateY')[0].innerHTML.replace(')', '').replace('(', '');
        var xy = parseInt(1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));

        if (RTL == 'rtl') { dir = 'left'; } else if (RTL == 'ltr') { dir = 'right'; };
        var xStyleA = 'position: absolute; ' + dir + ': 137px; top: ' + topA + 'px; width: auto;';
        var xStyleB = 'position: absolute; ' + dir + ': 152px; top: ' + topB + 'px; width: auto;';

        var send_res = '<a id="QS(r' + c + ')" href="build.php?z=' + xy + '&gid=17" style="' + xStyleB + '"><img src="' + img.sendRes + '" /></a>';
        var send_arm = '<a id="QS(a' + c + ')" href="a2b.php?z=' + xy + '" style="' + xStyleA + '"><img src="' + img.attack + '" /></a>';

        Xpath("/html/body/div[@id='wrapper']/div[@class='bodyWrapper']/div[@id='mid']/div[@id='side_info']/div[@id='villageList']/div[2]/ul/li[" + (c + 1) + "]").snapshotItem(0).innerHTML += send_res + send_arm;
        ID('QS(r' + c + ')').style.top = ID('QS(a' + c + ')').style.top;
        ID('X_Y_Coord').parentNode.removeChild(ID('X_Y_Coord'));
    };
    ID('xbody').parentNode.removeChild(ID('xbody'));
    document.body.style.cursor = 'default';
    ID('showQS').parentNode.removeChild(ID('showQS'));
};

RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');
var dir, px, title;
if (RTL == 'rtl') { dir = 'left'; px = '75px'; title = "اظهار رموز ارسال موارد/قوات"; }
else if (RTL == 'ltr') { dir = 'right'; px = '35px'; title = "show send resource/army"; };

var IMG = document.createElement('img');
IMG.setAttribute('id', 'showQS');
IMG.setAttribute('title', title);
IMG.setAttribute('style', 'cursor: pointer; position: absolute; ' + dir + ': ' + px + '; top: 20px;');
IMG.setAttribute('src', img.button);
IMG.addEventListener('click', addQuickSend, true);
Xpath("//div[@id='villageList' and @class='listing']/div[1][@class='head']").snapshotItem(0).appendChild(IMG);