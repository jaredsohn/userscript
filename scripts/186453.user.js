// ==UserScript==
// @name        新浪秀场自动回复
// @namespace   http://userscripts.org/users/softiger
// @description 在新浪秀场自动回复指定对话。
// @author      softiger
// @version     0.1
// @downloadURL https://userscripts.org/scripts/source/186453.user.js
// @updateURL   https://userscripts.org/scripts/source/186453.meta.js
// @include     http://ok.sina.com.cn/9*
// @grant       none
// @history     0.1 Initial release.
// ==/UserScript==

var ul_i = 3;
var count = 15;
var reply_i = 0;
var chkqqh = 0;
var myInterval = setInterval(function(){myTimer()},3000);
var flag = 1;
var diff = 2;
var el_privatelogs = document.getElementById ("privatelogs");
var el_chkqqh = document.getElementById("chkqqh");

function myStopInterval() {
    clearInterval(myInterval);
}

function autoReply (ul_tag) {
    if ( reply_i == 0 ) {
	reply_i = 1;
	if ( el_chkqqh.checked ) {
	    el_chkqqh.click();
	    chkqqh = 1;
	}
	var replyInterval = setInterval (function() {
	    ul_tag.getElementsByClassName ("user")[0].click();
	    document.getElementById ("fsxx").click();
	    document.getElementById ("txtmsg").value = reply_i;
	    document.getElementById ("btnsend").click();
            reply_i++;
	    if ( reply_i > 5 ) {
		clearInterval(replyInterval);
		if ( chkqqh == 1 ) {
		    el_chkqqh.click();
		    chkqqh = 0;
		}
                reply_i = 0;
	    }
	},4000);
    }
    else
	setTimeout(function(){autoReply(ul_tag)},21000);
}

function simulateMouseOver (elem) {
    if ( document.createEvent ) {
        var evObj = document.createEvent ('MouseEvents');
        evObj.initEvent ( 'mouseover', true, false );
        elem.dispatchEvent (evObj);
    }
    else if ( document.createEventObject ) {
        elem.fireEvent ('onmouseover');
    }
}

function myTimer() {
    var el_ul = el_privatelogs.getElementsByTagName ("ul")[ul_i];
    if ( el_ul ) {
	var str_el_ul = el_ul.innerHTML;
	var n1 = str_el_ul.lastIndexOf ("做任务");
	var n2 = str_el_ul.lastIndexOf ("求回复");
	var n3 = str_el_ul.lastIndexOf ("说：1234");
	if ( n1 != -1 || n2 != -1 || n3 != -1 ) {
	    autoReply (el_ul);
	    if ( flag == 4 ) {
		myStopInterval();
		myInterval = setInterval(function(){myTimer()},3000);
                flag = 1;
                diff = 2;
                count = 12;
	    }
	}
	if ( ul_i < 49 )
            ul_i++;
	else {
	    simulateMouseOver ( el_privatelogs );
	    document.getElementById ("pmgd_config").getElementsByTagName ("a")[0].click();
	    if ( !el_privatelogs.getElementsByTagName ("ul")[ul_i] )
		ul_i = 1;
	}
	if ( count < 12 ) {
            count = count + flag + diff;
            if ( count >= 12 && flag == 4 ) {
		myStopInterval();
		myInterval = setInterval(function(){myTimer()},3000);
                flag = 1;
                diff = 2;
            }
	}
    }
    else {
	if ( count > 0 ) {
            count = count - flag;
            if ( count <= 0 && flag == 1 ) {
		myStopInterval();
		myInterval = setInterval(function(){myTimer()},12000);
                flag = 4;
                diff = 0;
            }
	}
    }
}