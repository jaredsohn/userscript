// ==UserScript==
// @name          telio-warn-unpaid-bills
// @namespace     http://coffeebreaks.org/userscripts
// @description	  Telio won't display unpaid bills on the front page. It's not possible. You bet it is.
// @include       http://www.telio.no/*
// @include       http://www.telio.ch/*
// @include       https://ordre.telio.ch/*
// @exclude       http://gmail.google.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

const TELIO_STYLES = [
  "#unpaid-bills-msg {",
  "  padding: 10px;",
  "}",
].join("\n");



// shorthand Note: I don't really need unsafeWindow. Just to see if 
// Telio wants to play nice or not..
function newNode(type) {return unsafeWindow.document.createElement(type);}
function newText(text) {return unsafeWindow.document.createTextNode(text);}
function getNode(id) {return unsafeWindow.document.getElementById(id);}

const TELIO_UNPAID_BILLS_URL = 
"https://ordre.telio.ch/mypages/index.php?" +
  "page=Invoice:ViewAllPage";

function injectUnpaidBills() {
  if (!getNode("StatusPanel")) return;

  GM_addStyle(TELIO_STYLES);

  var navNode = getNode("StatusPanel");

  var billsNode = newNode("span");

  billsNode.id = "unpaid-bills-msg"

  billsNode.innerHTML =
      '<span id="bills-unread-count"></span>' + 
      ' unpaid bill(s)';
  navNode.insertBefore(billsNode, navNode.childNodes[1]);
}

function updateUnreadCount() {
  var unreadCountNode = getNode("bills-unread-count");
  var msgNode =  getNode("unpaid-bills-msg");
  if (!unreadCountNode) return;
  if (!msgNode) return;

  // alert("updating count");

  GM_xmlhttpRequest({
    method: "GET",
    url: TELIO_UNPAID_BILLS_URL,
    onload: function(details) {
      var unpaidBillsCount = -1; // take legend into account
      var idx = 0;
      while (idx > -1) {
        idx = details.responseText.indexOf("circle-unfilled.gif", idx);
        if (idx == -1) {
          break;
        }
        unpaidBillsCount++;
        idx += 10; // beurk...
      }

      unreadCountNode.innerHTML = "" + unpaidBillsCount;
      if (unpaidBillsCount > -1) {
        msgNode.style.background="red";
      }
    }
  });
}

injectUnpaidBills();
updateUnreadCount();

