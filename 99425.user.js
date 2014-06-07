// ==UserScript==
// @name           Redemption *accelerator*
// @description    -
// @include        http://simulator.bygray.net/*
// @include        http://tutudragon3.info/*
// @include 	   http://ptzplace.lockerz.com/*
// ==/UserScript==

if (document.getElementById("loginForm") != null) {
    document.onkeydown = keydown;
    function keydown(event) {
        var code;
        var e;
        if (document.all) {
            if (!event) {
                var e = window.event;
                code = e.keyCode;
            }
        } else if (event.which) {
            code = event.which;
            e = event;
        }
        if (code == 38) {
            document.getElementsByTagName("input")[0].value = '2nd@account.com';
            document.getElementsByTagName("input")[1].value = '2ndpass';
            document.getElementById("recaptcha_response_field").focus();
        }
    }
    setTimeout("document.loginForm.submit();", 4900);
}
if (document.getElementById("sorryPage") != null) {
    history.go(-1);
}
if (document.getElementById("intShippingInfo") != null) {
    function ReplaceContentInContainer(id, content) {
        var container = document.getElementById(id);
        container.innerHTML = content;
    }
    ReplaceContentInContainer("intShippingInfo", "Redemption Accelerated is currently enabled.");
}

if (document.getElementById("redeemPage") != null) {
    document.onkeydown = function () {
        if (event.keyCode == 9) {
            window.event.returnValue = false;
            document.getElementById('recaptcha_response_field').focus();

        }
    }
}
if (document.getElementById("thanksPage") != null) {
    document.onkeydown = function () {
        if (event.keyCode == 82) {
			var mylink = document.getElementsByTagName("a");
            location.href = mylink[0].href;

        }
    }
}

function getElementsByClass(node, searchClass, tag) {
    var classElements = new Array();
    if (node == null) node = document;
    if (tag == null) tag = '*';
    var els = node.getElementsByTagName(tag); // use "*" for all elements
    var elsLen = els.length;
    var pattern = new RegExp("\\b" + searchClass + "\\b");
    for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function hideByClass(theClass) {
    var el = getElementsByClass(document, theClass);
    var elLength = el.length;
    for (i = 0; i < elLength; i++) {
        el[i].style.display = "none";
    };
}
hideByClass("footer");

document.getElementById('users_ans').maxLength = "100";
document.getElementById('users_ans').onblur = function () {
    if (document.getElementById('users_ans').value.indexOf(' ') == -1) {} else {
        var a = document.getElementById('users_ans').value.split(' ')[1];
        var b = document.getElementById('users_ans').value.split(' ')[0];
        c = eval(a) + eval(b);
        document.getElementById('users_ans').value = c;
    }
    if (document.getElementById('users_ans').value.indexOf('+') == -1) {} else {
        var a = document.getElementById('users_ans').value.split('+')[1];
        var b = document.getElementById('users_ans').value.split('+')[0];
        c = eval(a) + eval(b);
        document.getElementById('users_ans').value = c;
    }
    if (document.getElementById('users_ans').value.indexOf('-') == -1) {} else {
        var a = document.getElementById('users_ans').value.split('+')[1];
        var b = document.getElementById('users_ans').value.split('+')[0];
        c = eval(a) + eval(b);
        document.getElementById('users_ans').value = c;
    }
    if (document.getElementById('users_ans').value.indexOf('=') == -1) {} else {
        var a = document.getElementById('users_ans').value.split('+')[1];
        var b = document.getElementById('users_ans').value.split('+')[0];
        c = eval(a) + eval(b);
        document.getElementById('users_ans').value = c;
    }
}