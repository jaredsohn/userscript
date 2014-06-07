// ==UserScript==
// @name        Confirm Domain
// @namespace   http://www.skynet-prj.com
// @description This greasemonkey script check domain.
// @grant       none
// @include     http*://mail.google.com/mail/*
// @version     v20130509-2
// ==/UserScript==

var MYDOMAIN = "sample.com";  // ここを自社ドメインに修正してください。

/****** 以下修正しちゃだめです **************************************/

var gaRetries = 0;
var ccField;
var toField;
var bccField;
var ccOld = "";
var toOld = "";
var bccOld = "";
var SENDBTN1 = "T-I J-J5-Ji Bq nS T-I-KE L3";
var SENDBTN2 = "T-I J-J5-Ji Bq nS T-I-ax7 L3";
var SENDBTN3 = "T-I J-J5-Ji aoO T-I-atl L3";
var stopBubbleFlag = false;
var root;
var errorFlag;

String.prototype.trim = function() {
    return this.replace(/^[\s　]+|[\s　]+$/g, "");
}

Array.prototype.uniq = function() {
    var o = {}
        , i
        , l = this.length
        , r = [];
    
    for (i = 0; i < l; i += 1) o[this[i]] = this[i];
    for (i in o) r.push(o[i]);
  
    return r;
}

function checkDomain(target) {
    var adrsCount;
    var domainList = new Array(MYDOMAIN);

    var adrsField = "";
    var goFlag = 0;
    for (i = 0;i < root.getElementsByName("to").length;i++) {
        var tmpStr = root.getElementsByName("to").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
        var cmpStr = tmpStr.replace(/[\s　]/g,"");
        if (cmpStr !== "") {
            if (goFlag === 0) {
                adrsField = tmpStr;
            } else {
                adrsField = adrsField + "," + tmpStr;
            }
            goFlag = 1;
        }
    }
    for (i = 0;i < root.getElementsByName("cc").length;i++) {
        var tmpStr = root.getElementsByName("cc").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
        var cmpStr = tmpStr.replace(/[\s　]/g,"");
        if (cmpStr !== "") {
            if (goFlag === 0) {
                adrsField = tmpStr;
            } else {
                adrsField = adrsField + "," + tmpStr;
            }
            goFlag = 1;
        }
    }
    for (i = 0;i < root.getElementsByName("bcc").length;i++) {
        var tmpStr = root.getElementsByName("bcc").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
        var cmpStr = tmpStr.replace(/[\s　]/g,"");
        if (cmpStr !== "") {
            if (goFlag === 0) {
                adrsField = tmpStr;
            } else {
                adrsField = adrsField + "," + tmpStr;
            }
            goFlag = 1;
        }
    }
    adrsField = adrsField.replace(/\n/g,",");

    var adrsStr = "   ";
    var domainStr = "   ";

    errorFlag = 0;
    if (goFlag === 1) {
        var tmpArray = adrsField.split(",");
        var adrsArray = tmpArray.uniq();
        var errorAdrs;
        for (var i = 0,adrsCount = 0;i < adrsArray.length;i++) {
            var tmpAdrs = adrsArray[i];
            tmpAdrs = tmpAdrs.trim();
            if (tmpAdrs === "") {
                continue;
            }
            errorAdrs = tmpAdrs;
            if (!tmpAdrs.match("^[0-9A-Za-z._\-]+@[0-9A-Za-z.\-]+$")) {
                errorFlag = 1;
                break;
            }
            var domainArray = tmpAdrs.split("@");
            var cmpLocal;
            var cmpDomain;
            if (domainArray.length === 2) {
                cmpLocal  = domainArray[0].toLowerCase();
                cmpDomain = domainArray[1].toLowerCase();
                if ((cmpDomain.match(/^\.|\.$|\.\./)) ||
                    (cmpLocal.match(/^\.|\.$|\.\./))) {
                    errorFlag = 1;
                    break;
                }
                if ((tmpAdrs.length   > 256)  ||
                    (cmpLocal.length  > 64)   ||
                    (cmpDomain.length > 255)) {
                    errorFlag = 2;
                    break;
                }
            } else {
                errorFlag = 1;
                break;
            }
            if ((tmpAdrs !== "") && (cmpDomain !== MYDOMAIN)) {
                adrsStr = adrsStr + "\n   " + tmpAdrs;
                for (j = 0;j < domainList.length;j++) {
                    if (domainList[j] === cmpDomain) {
                        break;
                    }
                }
                if (j === domainList.length) {
                    domainList.push(cmpDomain);
                    domainStr = domainStr + "\n   " + cmpDomain;
                }
                adrsCount++;
            }
        }
        if (errorFlag === 0) {
            if (adrsCount > 0) {
                replaceBtnName3(target);
                if (confirm("「" + MYDOMAIN +"」以外に送信しようとしていますが、よろしいですか？\n\nアドレス:\n" + adrsStr + "\n\nドメイン:\n" + domainStr + "\n\nよろしければOKボタンを押した後、「本当に送信」ボタンを押してください。")) {
                    stopBubbleFlag = true;
                    replaceBtnName1(target);
                } else {
                    stopBubbleFlag = false;
                    replaceBtnName2(target);
                }
            } else {
                replaceBtnName3(target);
                if (confirm("「" + MYDOMAIN + "」以外へは送信されません。\n\nよろしければ、OKボタンを押した後、「本当に送信」ボタンを押してください。")) {
                    stopBubbleFlag = true;
                    replaceBtnName1(target);
                } else {
                    stopBubbleFlag = false;
                    replaceBtnName2(target);
                }
            }
        } else if (errorFlag === 1) {
            alert("「" + errorAdrs + "」 不正なメールアドレスです。");
            stopBubbleFlag = false;
            replaceBtnName2(target);
        } else if (errorFlag === 2) {
            alert("「" + errorAdrs + "」 メールアドレスが長すぎます。");
            stopBubbleFlag = false;
            replaceBtnName2(target);
        } else {
            stopBubbleFlag = false;
            replaceBtnName2(target);
        }
    } else {
        alert("送信先メールアドレス（To,Cc,Bcc)が記入されていません。");
        stopBubbleFlag = false;
        replaceBtnName2(target);
    }
}

function checkClass(event) {
    var tgt;
    var tgClass = event.target.getAttribute ("class");
    if (tgClass == null) {
        tgClass = event.target.parentNode.getAttribute("class");
        tgt = event.target.parentNode;
    } else {
        tgt = event.target;
    }
    if ((tgClass.match (SENDBTN1)) ||
        (tgClass.match (SENDBTN2)) ||
        (tgClass.match (SENDBTN3))) {
        toField = "";
        var firstFlag = 0;
        for (i = 0;i < root.getElementsByName("to").length;i++) {
            var tmpStr = root.getElementsByName("to").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
            var cmpStr = tmpStr.replace(/[\s　]/g,"");
            if (cmpStr !== "") {
                if (firstFlag === 0) {
                    toField = tmpStr;
                } else {
                    toField = toField + "," + tmpStr;
                }
                firstFlag = 1;
            }
        }
        toField = toField.replace(/\n/g,",");
        toField = toField.toLowerCase();
        if (toField !== toOld) {
            stopBubbleFlag = false;
            toOld = toField;
        }
        ccField = "";
        var firstFlag = 0;
        for (i = 0;i < root.getElementsByName("cc").length;i++) {
            var tmpStr = root.getElementsByName("cc").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
            var cmpStr = tmpStr.replace(/[\s　]/g,"");
            if (cmpStr !== "") {
                if (firstFlag === 0) {
                    ccField = tmpStr;
                } else {
                    ccField = ccField + "," + tmpStr;
                }
                firstFlag = 1;
            }
        }
        ccField = ccField.replace(/\n/g,",");
        ccField = ccField.toLowerCase();
        if (ccField !== ccOld) {
            stopBubbleFlag = false;
            ccOld = ccField;
        }
        bccField = "";
        var firstFlag = 0;
        for (i = 0;i < root.getElementsByName("bcc").length;i++) {
            var tmpStr = root.getElementsByName("bcc").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
            var cmpStr = tmpStr.replace(/[\s　]/g,"");
            if (cmpStr !== "") {
                if (firstFlag === 0) {
                    bccField = tmpStr;
                } else {
                    bccField = bccField + "," + tmpStr;
                }
                firstFlag = 1;
            }
        }
        bccField = bccField.replace(/\n/g,",");
        bccField = bccField.toLowerCase();
        if (bccField !== bccOld) {
            stopBubbleFlag = false;
            bccOld = bccField;
        }
        if ((!stopBubbleFlag) || (tgt.innerHTML !== "<b>本当に送信</b>")) {
            event.stopPropagation();
            checkDomain(tgt);
        }
    }
}

function checkAddress(event) {
    if (typeof (event.target.getAttribute) == 'function') {
        var tgName = event.target.getAttribute ("name");
        if (tgName === 'to') {
            toField = "";
            var firstFlag = 0;
            for (i = 0;i < root.getElementsByName("to").length;i++) {
                var tmpStr = root.getElementsByName("to").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
            	var cmpStr = tmpStr.replace(/[\s　]/g,"");
                if (cmpStr !== "") {
                    if (firstFlag === 0) {
                        toField = tmpStr;
                    } else {
                        toField = toField + "," + tmpStr;
                    }
                    firstFlag = 1;
                }
            }
            toField = toField.replace(/\n/g,",");
            toField = toField.toLowerCase();
            if (toField !== toOld) {
                stopBubbleFlag = false;
                toOld = toField;
            }
        } else if (tgName === 'cc') {
            ccField = "";
            var firstFlag = 0;
            for (i = 0;i < root.getElementsByName("cc").length;i++) {
                var tmpStr = root.getElementsByName("cc").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
	            var cmpStr = tmpStr.replace(/[\s　]/g,"");
                if (cmpStr !== "") {
                    if (firstFlag === 0) {
                        ccField = tmpStr;
                    } else {
                        ccField = ccField + "," + tmpStr;
                    }
                    firstFlag = 1;
                }
            }
            ccField = ccField.replace(/\n/g,",");
            ccField = ccField.toLowerCase();
            if (ccField !== ccOld) {
                stopBubbleFlag = false;
                ccOld = ccField;
            }
        } else if (tgName === 'bcc') {
            bccField = "";
            var firstFlag = 0;
            for (i = 0;i < root.getElementsByName("bcc").length;i++) {
                var tmpStr = root.getElementsByName("bcc").item(i).value.replace(/[^,]+<([^>]+)>/g, "$1");
	            var cmpStr = tmpStr.replace(/[\s　]/g,"");
                if (cmpStr !== "") {
                    if (firstFlag === 0) {
                        bccField = tmpStr;
                    } else {
                        bccField = bccField + "," + tmpStr;
                    }
                    firstFlag = 1;
                }
            }
            bccField = bccField.replace(/\n/g,",");
            bccField = bccField.toLowerCase();
            if (bccField !== bccOld) {
                stopBubbleFlag = false;
                bccOld = bccField;
            }
        }
    }
}

function replaceBtnName1(target) {
    target.innerHTML = "<b>本当に送信</b>";
}

function replaceBtnName2(target) {
    target.innerHTML = "<b>送信</b>";
}

function replaceBtnName3(target) {
    target.innerHTML = "<b>確認中</b>";
}

function confirmDomainInit () {
    root = document;
    try {
        document.addEventListener ("change",    function(event) { checkAddress(event);    } , true);
        document.addEventListener ("click",     function(event) { checkClass(event);      } , true);
        document.addEventListener ("mousedown", function(event) { checkClass(event);      } , true);
        document.addEventListener ("mouseup",   function(event) { checkClass(event);      } , true);
    }
    catch (ex) {
        GM_log ("ConfirmDomain: Exception '"+ ex.message);
        if (gaRetries < 3) {
            gaRetries ++;
            window.setTimeout (confirmDomainInit, 250);
        }
    }
}
window.setTimeout (confirmDomainInit, 750);
