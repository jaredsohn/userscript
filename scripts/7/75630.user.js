// ==UserScript==
// @name           Live Person Mailbox Enhancer
// @namespace      http://sohaibathar.com
// @description    Enhances the Mailbox page by showing the sum of Hired and Invoiced session fees.
// @include        http://www.liveperson.com/mailbox/list-messages.aspx*
// @include        http://www.liveperson.com/billing/billing-information/expert-earnings.aspx*
// @include        http://www.liveperson.com/session/offline/expert/offer-or-request-info.aspx*
// @include        http://www.liveperson.com/session/offline/expert/decline-email-request.aspx*
// ==/UserScript==

// I have cooked this up for myself in 10 minutes, so it is definitely not perfect.
// The mailbox has to be set to show all messages, otherwise, only the sessions on the
// current page are summed.
// I will add new features as time allows.
// Contact: sohaibathar+grease@gmail.com

var defaultName = "Sohaib";
/* GM_getValue("defaultName");
if(defaultName == null) {
    defaultName = prompt('enter your name for liveperson enhancer:', 'Sohaib');
    GM_setValue("defaultName", defaultName);
}
*/
var defaultEmail = "Hi,\n" +
"Please send all details including the requirements, your budget and the exact " +
"deadline, and I will get back to you as soon as I can.\n" +
"Thanks,\n" +
defaultName;
var defaultDeclineEmail = "Hi,\n" + 
"I am sorry for not being able to reply to your messages, " + 
"I was away from LivePerson for a while. I hope your problem was solved, " + 
"please do let me know if you still need my help now or in the future.\n" + 
"Thanks,\n" + 
defaultName;

var isDeclinePage = window.location.href.indexOf("decline-email-request.aspx") != -1;
var isReplyPage = window.location.href.indexOf("offer-or-request-info.aspx") != -1;
var isEarningPage = window.location.href.indexOf("expert-earnings.aspx") != -1;

//alert(isDeclinePage);
var mailBoxTag = null;
var earnBoxTag = null;
var earnBoxSum = null;

var mailBox = document.getElementsByTagName("h2");
var reasonDd = document.getElementById("ctl00_ctl00_AbsMP_BaseMP_ddlReason");

// set reason to busy if exists
if(reasonDd) {
    reasonDd.selectedIndex = 2;
}
for(i=0; i < mailBox.length; i++) {
    if(mailBox[i].innerHTML=="Mailbox") {
        mailBoxTag = mailBox[i];
    }
}

mailBox = document.getElementsByTagName("h1");
for(i=0; i < mailBox.length; i++) {
    if(mailBox[i].innerHTML=="My Earnings") {
        earnBoxTag = mailBox[i];
        break;
    }
}
// Get current earnings
earnBoxSum = document.getElementById("ctl00_ctl00_AbsMP_BaseMP_spnNextPayment");

if(mailBoxTag != null) { // we are in the mailbox
    var fees = document.getElementsByTagName("div");
    var totalHired = 0;
    var totalInvoiced = 0;
    var myCut = 0;
    var thisFee = 0;

    for(var i=0; i < fees.length; i++) {
        if(fees[i].innerHTML == "Fee") {
            fees[i].parentNode.parentNode.parentNode.style.backgroundColor = "lightgreen";
            // it is a child of the tag containing the actual fee
            // strip from $ to <
            $feeText = fees[i].parentNode.innerHTML.substring(1);
            thisFee = parseInt($feeText);
            totalHired += thisFee;
            if(thisFee > 500){
                myCut += 0.75 * thisFee;
            }
            else {
                myCut += 0.7 * thisFee;
            }
        }
        else if(fees[i].innerHTML == "Invoice Fee") {
            fees[i].parentNode.parentNode.parentNode.style.backgroundColor = "lightgray";
            // it is a child of the tag containing the actual fee
            // strip from $ to <
            $feeText = fees[i].parentNode.innerHTML.substring(1);
            thisFee = parseInt($feeText);
            totalInvoiced += thisFee;
            if(thisFee > 500){
                myCut += 0.75 * thisFee;
            }
            else {
                myCut += 0.7 * thisFee;
            }

        }
    }
    var earnbox = parseFloat(GM_getValue("earnboxEarnings"));
    if(earnbox == null || isNaN(earnbox))
        earnbox = 0;
    
    // display the fees in mailbox now
    mailBoxTag.innerHTML = "Mailbox <br/>" +
        "(H=$" + totalHired +
        ", I=$" + totalInvoiced +
        ", E=$" + earnbox +
        ", Sum ~ $" + ( Math.round(myCut*100)/100 + earnbox) +
        ")";    
    // save the value for the earnings page estimates
    GM_setValue("mailboxEarnings", Math.round(myCut));

} // mailbox tag exists

if(earnBoxTag != null) { // we are in earnings
    // the fee cell is earnboxtag
    var mbEarn = 0;
    if(GM_getValue("mailboxEarnings")!=null) {
        mbEarn = parseFloat(GM_getValue("mailboxEarnings"));
    } else {
        GM_setValue("mailboxEarnings", 0);
    }
    
    var pEarn = parseInt(earnBoxSum.innerHTML.replace(/[^\d\.-]/g,''));
    // set the expert earnings
    GM_setValue("earnboxEarnings", pEarn);    
    // alert(mbEarn);
    if(mbEarn != null) {
        earnBoxTag.innerHTML = earnBoxTag.innerHTML +
            " (MB=$" + mbEarn +
            // ", P=$" + pEarn +
            ", Sum ~ $" + Math.round(100*(pEarn+mbEarn))/100 +
            ")";
    } 
    // remove the Payment for Email session with  part as it is irritating
    var allLinks = document.getElementsByTagName("a");
    for(i=0; i < allLinks.length; i++) {
        if(allLinks[i].innerHTML.indexOf("Payment for Email session with ", 0) >=0) {
            allLinks[i].innerHTML = allLinks[i].innerHTML.replace("Payment for Email session with ","");
        }
    }
}
// set the fee to zero on the email reply page
var xpathResult = document.evaluate('//*[@id="ctl00_ctl00_AbsMP_BaseMP_txtFee"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
// alert('xpathResult.snapshotLength: ' + xpathResult.snapshotLength);
for (  i=0; i<xpathResult.snapshotLength; i++) {
    var feeTextBox = xpathResult.snapshotItem(i);
    // alert('i: ' + i);
    feeTextBox.value = '0';
}
// set the default text in the textarea
xpathResult = document.evaluate('//*[@id="ctl00_ctl00_AbsMP_BaseMP_txtMessage"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
// alert('xpathResult.snapshotLength: ' + xpathResult.snapshotLength);
for ( i=0; i<xpathResult.snapshotLength; i++) {
    var msgTextBox = xpathResult.snapshotItem(i);
    // alert('i: ' + i);
     if(isDeclinePage)
        msgTextBox.value = defaultDeclineEmail;
    else if(isReplyPage)
        msgTextBox.value = defaultEmail;
    msgTextBox.focus();
    msgTextBox.select();
}