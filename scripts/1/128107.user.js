// ==UserScript==
// @name          LOR report
// @description   LOR report (with jQuery)
// @exclude http*://*linux.org.ru/forum/*/
// @exclude http*://*linux.org.ru/news/*/
// @exclude http*://*linux.org.ru/gallery/*/
// @exclude http*://*linux.org.ru/polls/*/ 
// @include http*://*linux.org.ru/forum/*/*
// @include http*://*linux.org.ru/news/*/*
// @include http*://*linux.org.ru/gallery/*/*
// @include http*://*linux.org.ru/polls/*/* 
// ==/UserScript==
//
// License: GNU GPL v3 or later
// Copyright (C) 2012 tli
//
// The JavaScript code in this page is free software: you can
// redistribute it and/or modify it under the terms of the GNU
// General Public License (GNU GPL) as published by the Free Software
// Foundation, either version 3 of the License, or (at your option)
// any later version.  The code is distributed WITHOUT ANY WARRANTY;
// without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
//
// As additional permission under GNU GPL version 3 section 7, you
// may distribute non-source (e.g., minimized or compacted) forms of
// that code without the copy of the GNU GPL normally required by
// section 4, provided you include this license notice and a URL
// through which recipients can access the Corresponding Source.
// Based on LOR TreeView
// Author:  thelonelyisland (http://www.linux.org.ru/people/thelonelyisland/profile)
// 
//
// Version: 1.1
//
const INDENT = '7px';


const DAYS = 3;
const COOKIENAME = "report";

var jq;
var st;

if (typeof(GM_log) == 'function') {
    jq = unsafeWindow.$;
    st = unsafeWindow.setTimeout;
} else {
    jq = $;
    st = setTimeout;
}
//start: Сообщить модератору (based on http://infoman.name/userscripts)

jq.GMReport = {
    topicnum: null
}

GMReportFunctions = {
    // Save topic number in cache
    savetopicnum: function() {
        createCookie("topicnum",jq.GMReport.topicnum,DAYS)
        createCookie("topictime", new Date().getTime().toString(),DAYS);
    },

    fetchtopicnum: function() {
        jq.GMReport.topicnum = -1;
        var req = new XMLHttpRequest();
        req.open('GET', location.protocol + '//www.linux.org.ru/group.jsp?group=4068', true);
        req.onreadystatechange = function (e) {
            if (req.readyState == 4) {
                if(req.status == 200)
                {
                    jq(req.responseText).find("img[alt='Прикреплено']").each(function()
                    {
                        var link = jq(this).next("a");
                        if (/Ссылки.*некор/i.test(link.html()))
                        {
                            jq.GMReport.topicnum = /linux-org-ru\/(\d+)/.exec(link.attr("href"))[1];
                            GMReportFunctions.savetopicnum();
                        }
                    });
                }
                else
                {
                    alert("Cannot get reports topic number");
                }
            }
        }
        req.send(null);
    },

    // Get topic number for sending reports
    gettopicnum: function() {
        if (jq.GMReport.topicnum == null)
        {
            var num = readCookie("topicnum");
            var time = new Number(readCookie("topictime"));
            var cur = new Date().getTime();
            if ((num != null) && ((cur - time) < 7200000))
            {
                jq.GMReport.topicnum = num;
            }
            else
            {
                GMReportFunctions.fetchtopicnum();
            }
        }
        if (jq.GMReport.topicnum == -1)
        {
            st(GMReportFunctions.gettopicnum, 100);
        }
        if (jq.GMReport.topicnum > 0)
        {
            letsGo();
        }
    }
}

GMReportFunctions.gettopicnum();

// All your GM code must be inside this function
function letsGo() {
    jq("div.reply").each(function()
    {
        var div = jq(this);
        if (/^[^Ответ]/.test(div.html()))
        {
            div.append("[<a class='lor-report-msg' href='javascript:{/*Сообщить модератору (страница не будет перезагружена)*/}'>Сообщить модератору</a>]");
        }
    });
    jq("a.lor-report-msg").click(function() {
		// hack: why .unbind() doesn't work
	  if (jq(this).html() == "Просмотреть") { return true; }
		//
      var comment = prompt("Please provide a comment about this message", "Нацпол");
      if (comment === null) { return false; }
      // Constructing message for posting
      var msgtext = null;
      var reportlink = jq(this);
      reportlink.parent().parent().parent().parent().children("div").children("a:first").each(function() {
        if (!msgtext) { msgtext = comment + " : " + this.href; }
     });
      var message = {
            session: /JSESSIONID=(\w+)/.exec(document.cookie)[1],
            topic:    jq.GMReport.topicnum,
            title:    "",
            msg:      msgtext,
            mode:     "quot",
            autourl:  1,
            texttype: 0
      }
      jq.post(location.protocol + "//www.linux.org.ru/add_comment.jsp", message, function(data) {
       var allmsgs = jq(data).find("article.msg");
       var reportnum = /\d+/.exec(allmsgs.eq(allmsgs.length - 1).attr("id"))[0];
       reportlink.unbind().attr("href", location.protocol + "//www.linux.org.ru/jump-message.jsp?msgid=" + jq.GMReport.topicnum + "&cid=" + reportnum).html("Просмотреть");
      })
 });
}

//end: Сообщить модератору


function createCookie(name,value,days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
       var nameEQ = name + "=";
       var ca = document.cookie.split(';');
       for(var i=0; i<ca.length; i++) {
               var c = ca[i];
               while (c.charAt(0)==' ') c = c.substring(1,c.length);
               if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
       }
       return null;
}


//get from Cookie or GM stored thread's message counter
function getCounter(msg_id, update) {
    var count = null;
    var str = readCookie(COOKIENAME);
    if (str) {
        var flag = 0;
        var d = new Date();
        var nowtime = d.getTime();
        var newarr = new Array;
        var arr = str.split("_");
        var j;
        var k = 0;
        newarr[k++] = "";
        for (var i=1; i<arr.length; i+=3){
            if (arr[i] == msg_id) {
                // found
                j = i+1;
                count = arr[j];
            } //if
            j = i+2;
            if (arr[j] > nowtime) {
                j=i;
                newarr[k++] = arr[j++];
                newarr[k++] = arr[j++];
                newarr[k++] = arr[j++];
            } else {
                flag = 1; // will purge expired records
            } //if

        } //for
        if (flag) {
            str = newarr.join("_");
            createCookie(COOKIENAME, str, DAYS);
        }
    } //if(str)
    if (!count) {
        if (update) {
            count = jq("div.comment article.msg").length;
        } else {
            count = 0;
        }
    }
    return count;
}

var urlhash = document.location.hash;
if (urlhash) {
    urlhash = urlhash.split('#')[1];
    document.getElementById(urlhash).scrollIntoView();
}