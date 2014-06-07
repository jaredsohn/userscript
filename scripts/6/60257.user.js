// ==UserScript==
// @name          Chase OFX downloader
// @namespace     http://axley.net/userscripts
// @description   Automates chase.com OFX file downloads for every eligible account.  One click to download all available OFX files one after the other instead of manually.  Also adds useful features not present in the site, such as remembering the date you last downloaded, the last ofx download format, and auto-populates the current date.  Also adds a button to every page to make it easy to actually find the transaction download page.
// @include       https://*.chase.com/*
// ==/UserScript==

// keys for retrieving user settings later
var LATEST_DOWNLOAD_DATE_KEY = "net.axley.ofx.LatestDownloadDate";
var OFX_FILE_FORMAT_IDX_KEY = "net.axley.ofx.OFXFileFormatIdx";
// jquery 1.2.5 but it will do for now
var ChaseJQueryUrl = "https://www.chase.com/ccpmweb/shared/document/jquery.js";

var acctIdxPositionMap = new Object();
var DownloadQueue = [];

//
// This function iterates through the download transactions page and builds
// an association between the account indexes for each drop-down option and
// the drop-down order they are in.  Used to iterate through all of the
// items in the drop-down.
function build_acct_idx_position_map() {

    if (DownloadQueue.length == 0) {
        var acctList = document.getElementById('UserAccounts');

        for (var n = 1; n < acctList.length; n++) {
            acctIdxPositionMap[acctList[n].value] = n;
            DownloadQueue.unshift(acctList[n].value);
        }
    }
}

///
/// Uses jquery POST to pre-query the download and returns false if the
/// error page was encountered, true otherwise.  Useful for skipping downloads
/// without data or for accounts that don't have transaction download.
/// presumes that the form is already configured.
function will_ofx_download_succeed(formId) {

    $form = $('#' + formId);
    
    // need to set this for postback to work
    $('#__EVENTTARGET').val('BtnDownloadActivity');

    var result = false;
    var regex = new RegExp('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML');

    $.ajax({
        type: "POST",
        url: $form.attr('action'),
        data: $form.serialize(),
        async: false,
        dataType: "html",
        cache: false,
        success: function(data, textStatus) {
            result = !regex.test(data);
        }
    });

    return result;
}

// take another item off the queue and click the submit button to initiate
// a download.  Returns 0 when no more items are on the queue.
function download_next_ofx() {

    var acctList = document.getElementById('UserAccounts');
    var submitBtn = document.getElementById('BtnDownloadActivity');

    var nextIdx;
    while(nextIdx = DownloadQueue.shift()) {

        var $form = $('#DownloadActivity');
        // force download to a new window
        $form.attr("target", "_blank");

        // select the account
        acctList.selectedIndex = acctIdxPositionMap[nextIdx];
        if (will_ofx_download_succeed('DownloadActivity')) {
            submitBtn.click();
        }
    }
}

//
// This function is what adds the button to the download activity page for
// downloading all OFX files at once
function create_download_all_ofx_button() {

    // add it next to the other download buttons
    var matches = getElementsByClassName("tanButtonRow");
    // get the child div
    var nextNode = getElementsByClassName("NotPrintable", matches[0]);

    var dlbutton = document.createElement("input");
        dlbutton.setAttribute('id', 'GM_dlbutton');
        dlbutton.setAttribute('class', 'buttonFwd');
        dlbutton.setAttribute('type', 'button');
        dlbutton.setAttribute('title', 'Download All OFX');
        dlbutton.value = 'Download All OFX';
        dlbutton.addEventListener("click", do_downloads, false);
    nextNode[0].appendChild(dlbutton);
}

//
// This function creates the button for quickly getting to the download 
// transactions page from any page.
function create_goto_download_transactions_page_button() {
    // add it above the My Accounts area of the page
    var headerbar = getElementsByClassName("headerbardate");

    var gotobutton = document.createElement("input");
        gotobutton.setAttribute('id', 'GM_gotobutton');
        gotobutton.setAttribute('class', 'buttonFwd');
        gotobutton.setAttribute('type', 'button');
        gotobutton.setAttribute('title', 'Download Transactions');
        gotobutton.value = 'Download Transactions';
        gotobutton.addEventListener("click", function() { document.location="https://banking.chase.com/AccountActivity/AccountActivityForm.aspx"; }, false);
    if (headerbar[0]) {
        headerbar[0].appendChild(gotobutton);
    }
}

// This function is what kicks off the whole affair when the download all OFX
// button is clicked.
// registers the function with a window property so it will persist
window.do_downloads = function do_downloads() {
    // assume that the user has actually selected the appropriate 
    // options for downloading.  Persist them as defaults for next time.
    save_default_options();

    build_acct_idx_position_map();
    
    download_next_ofx();
}

//
// This function saves the last downloaded date, and also the user's last
// OFX download type so they can be recovered later.
function save_default_options() {
    var endDateInput = document.getElementById('ToDate');
    if (!isNullOrEmpty(endDateInput.value)) {
        GM_setValue(LATEST_DOWNLOAD_DATE_KEY, endDateInput.value);
    }
    var downloadTypes = document.getElementById('DownloadTypes');
    if (!isNullOrEmpty(downloadTypes.value)) { 
        GM_setValue(OFX_FILE_FORMAT_IDX_KEY, downloadTypes.selectedIndex);
    }
}

// checks the value and returns false if it is empty or undefined
// otherwise returns true
function isNullOrEmpty(value) {
    if (typeof(value) == "undefined" ||
        value == "") {
        return true;
    } else {
        return false;
    }
}

//
// function that uses dynamic HTML to safely load a remote javascript from
// a URL.
function dhtml_loadScript(url) {
    var scriptNode = document.createElement('script');
    scriptNode.setAttribute("type", "text/javascript");
    scriptNode.setAttribute("src", url);
    document.getElementsByTagName("head")[0].appendChild(scriptNode)
}

//
// This is a means for greasemonkey to wait for jquery to load
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(GM_wait,100); 
    } else { 
        $ = unsafeWindow.jQuery;
        chaseOFXScriptInit();
    }
}

// load jQuery
dhtml_loadScript(ChaseJQueryUrl);
// wait for jQuery to load
GM_wait();

// initialize the buttons and restore saved data
function chaseOFXScriptInit() {
    // need this to avoid calling this more than once when using date picker
    var checkPageElement = getElementsByClassName("tanButtonRow");
    if (checkPageElement.length > 0 && document.location.pathname == "/AccountActivity/AccountActivityForm.aspx") {

        // insert the download all ofx button
        create_download_all_ofx_button();

        // load default values for the download options
        build_acct_idx_position_map();
        load_default_form_options();
    } else {
        // inject the go to download page button
        create_goto_download_transactions_page_button();
    }
}

//
// Loads the last downloaded date from greasemonkey variables and the
// OFX file type used last then presets these options on the download form
// Also sets the end date to be today's date.
function load_default_form_options() {
    var fromDateInput = document.getElementById('FromDate');
    var toDateInput = document.getElementById('ToDate');
    var dateRangeOption = document.getElementById('SelectDateRange');
    var latestDownloadDate = GM_getValue(LATEST_DOWNLOAD_DATE_KEY);
    if (!isNullOrEmpty(latestDownloadDate)) {
        enable_date_fields();
        dateRangeOption.checked = true;
        fromDateInput.value = latestDownloadDate;

        // default the ending date to today
        toDateInput.value = today_mmddyyyy();
    }

    var downloadTypes = document.getElementById('DownloadTypes');
    var ofxFileFormatIdx = GM_getValue(OFX_FILE_FORMAT_IDX_KEY);
    if (!isNullOrEmpty(ofxFileFormatIdx)) {
        downloadTypes.selectedIndex = ofxFileFormatIdx;
    }
}

//
// returns a string containing the date in mmddyyyy format.  This is the format
// expected by the chase web form
function today_mmddyyyy() {
    var today=new Date()
    var mon = today.getMonth()+1;   if (mon < 10) { mon = "0" + mon; }
    var day = today.getDate();  if (day < 10) { day = "0" + day; }
    return mon + "/" + day + "/" + (today.getYear() + 1900)
}

//
// This implements some javascript and CSS functionality to actually allow 
// changing the date fields programmatically.  These are normally triggered
// by user interaction but this forces them enabled for our script to function
function enable_date_fields() {
    var fromDateInput = document.getElementById('FromDate');
    var toDateInput = document.getElementById('ToDate');
    fromDateInput.disabled = false;
    toDateInput.disabled = false;
    fromDateInput.style.backgroundColor = "White";
    toDateInput.style.backgroundColor = "White";
}

// TODO:  remove after rewriting in jQuery
function getElementsByClassName(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++) {
        if(re.test(els[i].className))a.push(els[i]);
    }
    return a;
}

//
// Pass this a radio button object and it will return the value of the
// checked radio button.
function getCheckedValue(radioObj) {
    if(radioObj) {
        var radioLength = radioObj.length;
        if(radioLength == undefined) {
            if(radioObj.checked) {
                return radioObj.value;
            } else {
                return "";
            }
        }
        for(var i = 0; i < radioLength; i++) {
            if(radioObj[i].checked) {
                return radioObj[i].value;
            }
        }
    }
    return "";
}
