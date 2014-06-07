// ==UserScript==
// @name          LOR TreeView
// @description   Make tree view for LOR threads (with jQuery)
// @exclude http*://*linux.org.ru/forum/*/
// @exclude http*://*linux.org.ru/news/*/
// @exclude http*://*linux.org.ru/gallery/*/
// @exclude http*://*linux.org.ru/polls/*/
// @include http*://*linux.org.ru/forum/*/*
// @include http*://*linux.org.ru/news/*/*
// @include http*://*linux.org.ru/gallery/*/*
// @include http*://*linux.org.ru/polls/*/* 
// @grant GM_log
// @UpdateURL http://userscripts.org/scripts/source/15985.user.js
// @version 7.15
// ==/UserScript==
//
// License: GNU GPL v3 or later
// Copyright (C) 2012 sdio
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
//
// Author:  sdio (http://www.linux.org.ru/people/sdio/profile)
// Contributed by: 
//  kodx ( http://kodx.org )
//  ZaWertun ( http://www.linux.org.ru/people/ZaWertun/profile )
//
//

// change color of links 
var ALTERLINKS = 1;
// use quick answer form 
var USE_QUICK_ANSWER = 1;

var THEME;
// set the default theme in case autodetect fail
THEME = 'tango';
//THEME = 'white'
//THEME = 'black';

//----------------------------------------------------------------
var COLOR = new Array;
COLOR['white']  = 'black';
COLOR['white2'] = 'black';
COLOR['black']  = 'white';
COLOR['tango']  = 'white';
COLOR['swamp']  = 'black';

// Length of the BACKGROUNDS array may be any, so change it as you want
var BACKGROUNDS = new Array;
BACKGROUNDS['white']  = ['#ccf', '#ffc', '#cfc', '#fcc', '#cff', '#fcf', '#ccc'];
BACKGROUNDS['white2'] = ['#ccf', '#ffc', '#cfc', '#fcc', '#cff', '#fcf', '#ccc'];
BACKGROUNDS['black']  = ['#006', '#330', '#303', '#033', '#300', '#030', '#333'];
BACKGROUNDS['tango']  = ['#452830','#284542','#283145','#452845'];
BACKGROUNDS['swamp']  = ['#C0C3B1', '#B0B8A1', '#A0A895','#909580'];

var POPUPBG = new Array;
POPUPBG['white']  = 'yellow';
POPUPBG['white2'] = 'yellow';
POPUPBG['black']  = 'grey';
POPUPBG['tango']  = 'grey';
POPUPBG['swamp']  = 'yellow';

var POPUPBRD = new Array;
POPUPBRD['white']  = 'black';
POPUPBRD['white2'] = 'black';
POPUPBRD['black']  = 'white';
POPUPBRD['tango']  = 'white';
POPUPBRD['swamp']  = 'black';

// Indentation per reply level
const INDENT = '10px';


const DAYS = 3;
const COOKIENAME = "TreeView";


var options = {
    // target: '#quickanswerdiv',
    // post-submit callback
    success: showResponse,
    cache: false
};

var jq;
var st;

if (typeof(GM_log) == 'function') {
    // For FF, Mozilla (with greasemonkey sandbox)
    jq = unsafeWindow.$;
    st = unsafeWindow.setTimeout;
    unsafeWindow.ctrl_enter = function(e, form) {
        if (((e.keyCode == 13) || (e.keyCode == 10)) && (e.ctrlKey)) {
            jq("#quickanswerform").ajaxForm(options).submit();
        }
    }

    unsafeWindow.jump = function(link) {
        return 1;
    }

    unsafeWindow.image_onload = function(elem){
        var width = elem.naturalWidth;
        if (width < 320) {
            elem.style.width = '';
        }
    }
        unsafeWindow.onbeforeunload = null;


} else {
    // For Epiphany, Opera
    jq = $;
    st = setTimeout;
    function ctrl_enter(e, form) {
        if (((e.keyCode == 13) || (e.keyCode == 10)) && (e.ctrlKey)) {
            jq("#quickanswerform").ajaxForm(options).submit();
        }
    }

    function jump(link) {
        return 1;
    }
    function image_onload(elem){
        var width = elem.naturalWidth;
        if (width < 320) {
            elem.style.width = '';
        }
    }
        window.onbeforeunload = null;
}

var msgs = -1;
var thread_id;
var topic = jq('div.messages article[id*="topic-"]');
if (topic.length) {
    thread_id = topic.attr('id').split('-')[1];
} else {
   alert('Error: can not detect thread ID.');
}

var cnt       = getCounter(thread_id, 0);
var newid     = new Array;


jq('link').each(function(){
    var found = this.href.match(/\/([^/]*)\/combined\.css/);
    if (found) {
        THEME = found[0].split('/')[1];
		if (THEME == 'tango') {
            var subtheme = readCookie("style_selected");
			if (subtheme == 'tango-swamp') {
				THEME = 'swamp';
			}
		}
    }
});


jq('<div id="popupContact"><br><h2><span id="popupMsgs">0</span> new messages</h2><br></div>').hide().appendTo('body');
jq("#popupContact").css({  
    "background-color": POPUPBG[THEME],
    "padding": "10px",
    "border": "1px solid " +  POPUPBRD[THEME],
    "position": "fixed",
    "top":  (document.documentElement.clientHeight - 200)/2,  
    "left": (document.documentElement.clientWidth  - 300)/2  
});  

jq('<div id="popupPreview"></div>').hide().appendTo('body');
jq("#popupPreview").css({  
    "text-align": "left",
    "background-color": POPUPBG[THEME],
    "padding": "5px",
    "border": "1px solid " +  POPUPBRD[THEME],
    "position": "fixed",
    "top":  (document.documentElement.clientHeight)/5,  
    "left": 50
});  

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
      var  url1 = reportlink.parent().parent().parent().parent().find("div.msg_body h1 a:first");
      if (url1.length == 0) {
		  url1 = reportlink.parent().find("li:nth-child(2) a:first");
      }

      if (!msgtext) {
          msgtext = comment + " : " + url1.get(0).href;
      }

      var message = {
            csrf: /CSRF_TOKEN="(.+)"/.exec(document.cookie)[1],
            topic:    jq.GMReport.topicnum,
            title:    "",
            msg:      msgtext
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

function jq_get(url, callback) {
    var data = {};
    var param = url.split('?')[1];
    var url = url.split('?')[0];
    if (param) {
        var params = param.split('&');
        for (var i=0; i<params.length; i++) {
            var key = params[i].split('=')[0];
            var val = params[i].split('=')[1];
            switch (key) {
            case 'msgid':
              data[key] = val;
              break;
            case 'page':
              data[key] = val;
              break;
            case 'filter':
              data[key] = val;
              break;
            }
        }
    }
    jq.ajaxSetup({cache: false});
    jq.get(url, data, callback);
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

function setCounter(msg_id, value) {
    var d = new Date();
    var expireat = d.getTime();
    expireat += DAYS * 24 * 60 * 60 * 1000;

    var flag = 0;
    var str = readCookie(COOKIENAME);
    if (str) {
        var arr = str.split("_");
        for (var i=1; i<arr.length; i+=3){
            if (arr[i] == msg_id) {
                // found
                arr[++i] = value;
                arr[++i] = expireat;
                flag = 1;
                break;
            }   
        }
    } else {
        str = "";
    }

    if (flag) {
        // updated
        str = arr.join("_");
    } else {    
        // new one
        str = str + "_" + msg_id + "_" + value + "_" + expireat;
    }
    createCookie(COOKIENAME, str, DAYS);
}

//
// callback function on UPDATE action
//
function onAjaxSuccess(data) {
    // data is html returned by server
    var up_div = jq(data).find('div.comment article.msg');

    // number of messages received from server
    var newmsgs = up_div.length;

    // [newmsgs > msgs] means that there are new messages
    if (newmsgs > msgs) {
        newid.length = 0;
        if (msgs > 0) {
            up_div.slice(msgs,newmsgs).each(doindent);
        } else {
            up_div.each(doindent);
        }
        // update message counter
        jq("#popupMsgs").text(newmsgs-msgs);
        msgs = jq('div.comment article.msg').length;
        setCounter(thread_id, msgs);
        cnt = msgs;

        jq('a._new_').remove();
        addNavigateLinks(newid);
        if (document.getElementById(newid[0]))  document.getElementById(newid[0]).scrollIntoView();
        newid.length = 0;

    } else {
        // no news
        // drop temp data
        jq("#popupMsgs").text('0');
    }
    jq("#popupContact").show();
    st('$("#popupContact").hide();',3000);
}


function quickAnswer(elem) {
    var topic;
    var replyto;
    var href = elem.search;
    var session = /CSRF_TOKEN="(.+)"/.exec(document.cookie)[1];
    
    var seltxt;
    try {
        seltxt = window.getSelection().toString();
    } catch(err){
        alert(err);
    }
    if (seltxt) {
        seltxt = '> ' + seltxt + "\n";
    }

    jq("#quickanswerdiv").remove();

    var formhtml1 = '<form id="quickanswerform" method="POST" action="add_comment.jsp"> <input type="hidden" name="csrf" value="' + session + '"/>  <input type="hidden" name="topic" value="';
    var formhtml2 = '<input type="text" name="title" size="73" value=""/><br> <textarea name="msg" cols="70" rows="10" onkeypress="return ctrl_enter(event, this.form);">'+seltxt+'</textarea><br> <input type="hidden" name="texttype" value="0"/><br><input type="submit" value="Отправить"/><input type="submit" value="Предпросмотр" name="preview"/></form>';

    if (href.match(/replyto=/)) {
        topic   = href.replace(/^.*topic=(\d+).*$/, "$1");
        replyto = href.replace(/^.*replyto=(\d+).*$/, "$1");
        formhtml1 = formhtml1 + topic + '"/> <input type="hidden" name="replyto" value="'+replyto+'"/>';
    } else {
        topic   = href.replace(/^.*topic=(\d+).*$/, "$1");
        formhtml1 = formhtml1 + topic + '"/>';
    }

    jq(elem).parent().append('<div id="quickanswerdiv">' + formhtml1 + formhtml2 + '</div>');

    jq("#quickanswerform").ajaxForm(options);

    jq("textarea[name=msg]").focus();

}


function showResponse(responseText, statusText) {
    // data is html returned by server
    var h1txt = jq(responseText).find('div.error').text();
    if (h1txt) {
        alert(h1txt);
		return;
    }

    h1txt = jq(responseText).find('p:contains("Ваше сообщение")').text();
    if (h1txt) {
        var rmsg = jq(responseText).find('div.messages');
        if (rmsg) {
            jq("#popupPreview").get(0).innerHTML = rmsg.get(rmsg.length - 1).innerHTML;
            jq("#popupPreview").show();
            st('$("#popupPreview").hide();',5000);
        }
    } else {

        //up_div.empty();
        jq("#quickanswerdiv").remove();
        jq_get(document.location.href, onAjaxSuccess);
    }
}

//add a link with "text", "url" and "id" after <<elem>> html object.
function addNavButton(elem, text, url, cls){
    var newA = document.createElement("a");
    newA.href = url;
    newA.className = cls;
    newA.textContent = text;
    newA.style.paddingLeft = "20px !important";
    newA.style.color = COLOR[THEME] + '!important';
    elem.appendChild(newA);
}

//add navigation links (First/Next/Prev/Last) for recently added messages
function addNavigateLinks(msg_array){
    var len = msg_array.length;
    //Add navigation buttons for new messages
    for (var i=0; i<len; i++){
        var msgTD = jq("#"+msg_array[i]+" div.title").get(0);
        if (msgTD) {
            //next message
            var nText = "[Next new]";
            var n = i + 1;
            if (n >= len) {
                n = 0;
                nText = "[First new]";
                var titleA = jq("div.title").get(0);
                if (titleA) {
                    addNavButton(titleA,
                                 nText,
                                 'javascript:document.getElementById("' + msg_array[n] + '").scrollIntoView()', "_new_"
                                );
                }
            }
            addNavButton(msgTD, nText, 'javascript:document.getElementById("' + msg_array[n] + '").scrollIntoView()', "_new_");

            //previous message
            var pText = "[Prev new]";
            var p = i - 1;
            if (p < 0) {
                p = len - 1;
                pText = "[Last new]";
            }
            addNavButton(msgTD,
                         pText,
                         'javascript:document.getElementById("' + msg_array[p] + '").scrollIntoView()', "_new_"
                        );
            }
        }
} 

// ---------------------------------------------------------------------
function doindent(index) {
    this.setAttribute("treelevel", "0");  // initial indent level
//    this.style.paddingBottom = "1px"; // style 
//    this.style.marginBottom  = "4px"; // style 
    var root;

    // store new id in array
    if ((msgs+index+1) >= cnt) {
        newid.push(this.id);
    }

    root = jq("div.comment").get(0);

    // remove subject
//  jq("h2", this).html('<hr>');

    var nick = jq("div.sign a:first",this).text();
    if (nick) {
        jq("div.title", this).append('[<a href="'+location.protocol+'//www.linux.org.ru/show-replies.jsp?output=rss&nick=' + nick + '" >' + nick + ' events</a>]');
    }
    // append [update page] link
    jq("div.title", this).append('<a href="#" class="updatepage">[update page]</a>');
    jq('a.updatepage', this).click(function(event) {
        jq_get(document.location.href, onAjaxSuccess);
        event.preventDefault();
    });
	var ign = jq('span.user-remark:contains("###"):first', this);
	if (ign.length) {
		ign.parent().parent().hide();
    		jq("div.title", this).append('<a href="javascript:{}" class="vtoggle">[show/hide]</a>');
			jq('a.vtoggle', this).click(function(event) {
		        jq('div[class*="msg_body"]:first', jq(this).parent().parent()).toggle();
        		event.preventDefault();
    		});

	}

    // do all links colored black 
    if (ALTERLINKS) {
        if (THEME != 'tango' || THEME != 'swamp') {
            jq("a", this).css('cssText', 'color: ' + COLOR[THEME] + ' !important');
        }
    }
    jq(".sign", this).css('cssText', 'text-align: left');

    // enumerate message
    jq("div.title", this).prepend('['+(msgs+index+1) + '] ');
//    jq("div.title a:first", this).each(function () {
//        this.setAttribute("class", "counter");
//    });

    // quick answer
    if (USE_QUICK_ANSWER) {
        jq('a:contains("Ответить на это сообщение")', this).click(function(event) {
            event.preventDefault();
            quickAnswer(this);
        });
    }
    
    // is a message answer to other (non root) message?
    var a = jq('div.title a[data-samepage="samePage"]', this);
    if (a.length) {
        // #Id of reply message <DIV> 
        var idr = a.attr('href').split('cid=')[1];
		idr='comment-'+idr;
		// "parent" message
		var idr_msg   = document.getElementById(idr);
		// child's indent level
		var idr_level = idr_msg.getAttribute("treelevel");
		idr_level++;

		// save child's indent level
		this.setAttribute("treelevel", idr_level);

		// move child to parent
		idr_msg.appendChild(this);
		// choose color accordingly to indent level
		var bgcolor = BACKGROUNDS[THEME][idr_level % BACKGROUNDS[THEME].length] + ' !important';
		// set background color to .title and .body
		jq('article#' + this.id + ', article#' + this.id +' div.title').css('cssText', "padding-bottom: 1px; margin-bottom: 4px; padding-left: 0px; padding-right: 0px; margin-left: " + INDENT + "; background-color: " + bgcolor);

    } else {
		if (msgs > -1) {
			root.appendChild(this);
		}
	}
}
// ---------------------------------------------------------------------


jq('#commentForm').remove();

function makeTree() {
    msgs = -1;
    jq(".updatepage,._new_").remove();

    jq("article.msg").each(doindent);
    idx = newid.shift(); // remove topic

    addNavigateLinks(newid);
    newid.length = 0;
    // set message counter
    msgs = jq('div.comment article.msg').length;
    setCounter(thread_id, msgs);
}

makeTree();

//var h1subj = jq('div.msg_body h1').get(0);
//h1subj.innerHTML = '<br><u>' + h1subj.innerHTML + '</u><br><br>';

var urlhash = document.location.hash;
if (urlhash) {
    urlhash = urlhash.split('#')[1];
    document.getElementById(urlhash).scrollIntoView();
}


// ---------------------------------------------------------------------

