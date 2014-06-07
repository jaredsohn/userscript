// ==UserScript==
// @name           AvidApprover
// @namespace      zonyl-avidxchange-avidinvoice-approver
// @description    Fix for FireFox approver buttons
// @include        https://app.avidxchange.net/AvidSuite/AvidInvoice/Invoice/ManageInvoiceView.aspx
// ==/UserScript==


var allButtons, thisButton;
allButtons = document.evaluate(
    "//a[@class='AvidButton-text' and . = 'Save']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allButtons.snapshotLength; i++) {
    thisButton = allButtons.snapshotItem(i);
	thisButton.href = "javascript: theForm.__EVENTTARGET.value = 'modInvoiceProcessor$imgBtnSaveChanges$ctl07'; theForm.__EVENTARGUMENT.value =''; theForm.submit();";

}

var allButtons, thisButton;
allButtons = document.evaluate(
    "//a[@class='AvidButton-text' and . = 'Approve & Comment']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allButtons.snapshotLength; i++) {
    thisButton = allButtons.snapshotItem(i);
	thisButton.href = "javascript: theForm.__EVENTTARGET.value = 'modInvoiceProcessor$avbAppComment$ctl07'; theForm.__EVENTARGUMENT.value =''; theForm.submit();";

}

allButtons = document.evaluate(
    "//a[@class='AvidButton-text' and . = 'Approve']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allButtons.snapshotLength; i++) {
    thisButton = allButtons.snapshotItem(i);
	thisButton.href = "javascript: theForm.__EVENTTARGET.value = 'modInvoiceProcessor$imApprove$ctl07'; theForm.__EVENTARGUMENT.value =''; theForm.submit();";

}

allButtons = document.evaluate(
    "//a[@class='AvidButton-text' and . = 'Void']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allButtons.snapshotLength; i++) {
    thisButton = allButtons.snapshotItem(i);
	thisButton.href = "javascript: theForm.__EVENTTARGET.value = 'modInvoiceProcessor$imVoid$ctl07'; theForm.__EVENTARGUMENT.value =''; theForm.submit();";
}

allButtons = document.evaluate(
    "//a[@class='AvidButton-text' and . = 'Dispute']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allButtons.snapshotLength; i++) {
    thisButton = allButtons.snapshotItem(i);
	thisButton.href = "javascript: theForm.__EVENTTARGET.value = 'modInvoiceProcessor$imDispute$ctl07'; theForm.__EVENTARGUMENT.value =''; theForm.submit();";

}

allButtons = document.evaluate(
    "//a[@class='AvidButton-text' and . = 'Print']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allButtons.snapshotLength; i++) {
    thisButton = allButtons.snapshotItem(i);
	thisButton.href = "javascript: theForm.__EVENTTARGET.value = 'modInvoiceProcessor$imbtnPrint$ctl07'; theForm.__EVENTARGUMENT.value =''; theForm.submit();";

}
