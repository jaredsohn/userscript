var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name Reddit de clutter
// @namespace redditdeclutter
// @description Some various changes to reddit
// @include http://reddit.com/*
// @include https://reddit.com/*
// @include http://*.reddit.com/*
// @include https://*.reddit.com/*
// @downloadURL https://userscripts.org/scripts/source/153293.user.js
// @version 1.0.8
// ==/UserScript==
function declutter() {


    localStorage.setItem('afterid', '');
    localStorage.setItem('str', '');


    $("head").prepend("<script type='text/javascript' src='http://creesch.github.com/reddit-declutter/sticky.js'></script>");






    //
    //
    // General functions and variables
    //
    //    
    function toast(sMessage) {
        var container = $(document.createElement("div"));
        container.addClass("toast");
        var message = $(document.createElement("div"));
        message.addClass("message");
        message.text(sMessage);
        message.appendTo(container);
        container.appendTo(document.body);
        container.delay(100).fadeIn("slow", function () {
            $(this).delay(2000).fadeOut("slow", function () {
                $(this).remove();
            });
        });
    }
    // let's get all stored variables we are going to need first
    var stylesetting = localStorage.getItem('stylesetting') || 'on';
    var stylesettingindividual = localStorage.getItem('stylesetting' + reddit.cur_site) || 'on';
    var modnotifications = localStorage.getItem('modnotifications') || 'on';
    var highlightsetting = localStorage.getItem('highlightsetting') || 'on';
    var removedcomment = localStorage.getItem('removedcomment') || 'border';
    var negativebackground100 = parseInt(localStorage.getItem('negativebackground100') || '-20', 10);
    var negativebackground90 = parseInt(localStorage.getItem('negativebackground90') || '-10', 10);
    var negativebackground50 = parseInt(localStorage.getItem('negativebackground50') || '-5', 10);
    var negativebackground30 = parseInt(localStorage.getItem('negativebackground30') || '0', 10);
    // going to need this later
    var modactionArr = new Array();
    // functions to determine some variables
    if (stylesetting == 'on') {
        var stylesettingchecked = 'checked';
    } else {
        var stylesettingchecked = '';
    }
    if (highlightsetting == 'on') {
        var highlightsettingchecked = 'checked';
    } else {
        var highlightsettingchecked = '';
    }
    if (modnotifications == 'on') {
        var modnotificationschecked = 'checked';
    } else {
        var modnotificationschecked = '';
    }

    function checked(type) {
        if (removedcomment == type) {
            var checkedoutput = 'checked';
            return checkedoutput;
        }
    }
    // check if we are on the frontpage and align the titles
    if (window.location.href == 'http://www.reddit.com/') {
        $("head").prepend("<style type='text/css'>.entry { margin-left:140px !important; }</style>");
    }
    // easy way to simulate the php html encode and decode functions
    function htmlEncode(value) {
        //create a in-memory div, set it's inner text(which jQuery automatically encodes)
        //then grab the encoded contents back out.  The div never exists on the page.
        return $('<div/>').text(value).html();
    }

    function htmlDecode(value) {
        return $('<div/>').html(value).text();
    }

    //
    //
    // Settings menu
    //
    //        
    // function that will be called from settings. Generates a list of all users that have mod actions.
    function getallmodactions() {
        var modlist = "<table class='moddedlist'><tr><th>Users</th><th>Total</th><th>Reset</th></tr>";
        for (var i = 0; i < localStorage.length; i++) {
            var keystore = localStorage.key(i)
            if (keystore.toLowerCase().indexOf("logaction_") >= 0) {
                var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                var moddeduser = keystore.substring(10);
                modactionArr[i] = keystore;
                modlist = modlist + "<tr style='border: 1px solid #4b515b;'><td style='padding: 2px;'><a href='javascript:void(0);'title='" + moddeduser + "'  class='dcmodlog' style='color: #FFFFFF;'>" + moddeduser + "</a></td><td>" + obj['total']['total'] + "</td><td><input id='c" + moddeduser + "' class='dccheckbox modcount' type='checkbox' name='" + moddeduser + "'></input><label class='dccheckbox' for='c" + moddeduser + "'><span class='dccheckbox'></span></label></td></tr>";
            }
        }
        $('#dcsettings-modcount').html(modlist + "</table>");
    }
    // Let's edit in a link to the settings menu    
    $('form.logout.hover').before('<a class="dcsettingsmenu" href="javascript:void(0)">dc Settings</a><span class="separator">|</span>');
    $(document).on('click', '.dcsettingsmenu', function () {
        $("#dchovermodlog").css('visibility', 'hidden');
        $('#dcsettings').attr('class', 'slideIn');
    });

    // We are also going to need the menu itself
    $('.footer-parent').prepend('<div id="dcsettings" class="">settings here</div>');
    $('#dcsettings').html(' \
<div id="dcsettingswindow">\
<div id="dcsettingsheader"><h1>reddit toolbox settings</h1><span class="DCCloseButton" id="DCClose">X</span></div>\
<div id="dcsettingswrapper">\
<div id="dcsettingsbody">\
<div class="dcsettings-category">\
<b>Declutter custom stylesheet:</b><br>\
<label class="checkbox dctoggle dcsetting" onclick="" style="width: 400px">\
    <input id="view" type="checkbox" name="customstyle" ' + stylesettingchecked + '>\
        <p>\
            <span>On</span>\
            <span>Off</span>\
        </p>\
        \
        <a class="slide-button"></a>\
    </label>\
    </div>\
    <div class="dcsettings-category">\
<b>Notification messages for moderationqueue (turn off if you mod very active subreddits):</b><br>\
<label class="checkbox dctoggle dcsetting" onclick="" style="width: 400px">\
    <input id="view" type="checkbox" name="modnotifications" ' + modnotificationschecked + '>\
        <p>\
            <span>On</span>\
            <span>Off</span>\
        </p>\
        \
        <a class="slide-button"></a>\
    </label>\
    </div>\
    <div class="dcsettings-category">\
<b>Negative comment highlighting:</b><br>\
<label class="checkbox dctoggle dcsetting" onclick="" style="width: 400px">\
    <input id="view" type="checkbox" name="negativecomment" ' + highlightsettingchecked + '>\
        <p>\
                    <span>On</span>\
            <span>Off</span>\
        </p>\
        \
        <a class="slide-button"></a>\
    </label>\
\<br>\
Thresholds:<br>\
<input type="text" class="dc-threshold" name="negativebackground30" value="' + negativebackground30 + '">&nbsp;&nbsp;<span class="dc-post-example" style="height:30px; overflow:hidden; background-image: url(http://creesch.github.com/reddit-declutter/comment_bg/30.png);">\
<p class="tagline"><a href="javascript:void(0)" class="author"><b>RandomUser</b></a>-X points <time>1 day</time> ago</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a metus ut dui blandit mollis. Quisque quam eros, porta in pellentesque eu, sodales eu nunc. \
</span><br><br>\
<input type="text" class="dc-threshold" name="negativebackground50" value="' + negativebackground50 + '">&nbsp;&nbsp;<span class="dc-post-example" style="height:30px; overflow:hidden; background-image: url(http://creesch.github.com/reddit-declutter/comment_bg/50.png);">\
<p class="tagline"><a href="javascript:void(0)" class="author"><b>RandomUser</b></a>-X points <time>1 day</time> ago</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a metus ut dui blandit mollis. Quisque quam eros, porta in pellentesque eu, sodales eu nunc. \
</span><br><br>\
<input type="text" class="dc-threshold" name="negativebackground90" value="' + negativebackground90 + '">&nbsp;&nbsp;<span class="dc-post-example" style="height:30px; overflow:hidden; background-image: url(http://creesch.github.com/reddit-declutter/comment_bg/90.png);">\
<p class="tagline"><a href="javascript:void(0)" class="author"><b>RandomUser</b></a>-X points <time>1 day</time> ago</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a metus ut dui blandit mollis. Quisque quam eros, porta in pellentesque eu, sodales eu nunc. \
</span><br><br>\
<input type="text" class="dc-threshold" name="negativebackground100" value="' + negativebackground100 + '">&nbsp;&nbsp;<span class="dc-post-example" style="height:30px; overflow:hidden; background-image: url(http://creesch.github.com/reddit-declutter/comment_bg/100.png);">\
<p class="tagline"><a href="javascript:void(0)" class="author"><b>RandomUser</b></a>-X points <time>1 day</time> ago</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a metus ut dui blandit mollis. Quisque quam eros, porta in pellentesque eu, sodales eu nunc. \
</span><br><br>\
</div> \
<div class="dcsettings-category">\
<b>Mod action related:</b><br>\
<input type="checkbox" class="dccheckbox" id="c1" name="dcresetmodcount" />\
<label for="c1" class="dccheckbox"><span class="dccheckbox"></span>Reset mod action counter</label> (after saving) <span class="dc-button" id="dc-edit">Individual edit</span> <br>\
Removed comments:    <div class="switch dcsetting" style="width:404px">\
    <input id="hide" name="removedcomment" type="radio" value="hide" ' + checked("hide") + '>\
                    <label for="hide" onclick="">Hide</label>\
                    <input id="border" name="removedcomment" type="radio" value="border" ' + checked("border") + '>\
                    <label for="border" onclick="">Red border</label>\
                    <span class="slide-button"></span>\
                    </div>\
</div>\
</div>\
<div id="dcsettings-footer">\
<div class="dcsettings-category"><p>\
<span class="dc-button" id="dc-save">Save</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="dc-button" id="dc-save-exit">Save and exit</span></p> \
</div>\
</div>\
</div>\
  <div id="dcsettings-modcount">mod list will be here<br></div>\
  </div>\
');
    // Load list of individual users that have been modded
    $(document).on('click', '#dc-edit', function () {
        $('#dcsettings-modcount').attr('class', 'slideIn');
        getallmodactions()
    });
    // Close the menu, saving nothing
    $(document).on('click', '#DCClose', function () {
        $('#dcsettings').attr('class', 'slideOut');
        $('#dcsettings-modcount').attr('class', 'slideOut');
        $("#dchovermodlog").css('visibility', 'hidden');
    });
    //     
    // Save function
    //
    function savesettings() {
        // check the nummeric fields if they actually contain numbers, range -9999 to 9999. Should be enough?
        var numberRegex = /^[-+]?\d{1,4}$/;
        var notanumber = false;
        //       $('input.modcount').each(function() {
        //         var negativecount = $(this).val();
        //
        //           if (numberRegex.test(negativecount)) {
        //              $(this).css('background-color', 'green');
        //           } else {
        //               notanumber = true;
        //               $(this).css('background-color', 'red');
        //           }
        //        });
        if (numberRegex.test($("input[name=negativebackground30]").val())) {
            var negativebackground30save = $("input[name=negativebackground30]").val();

            $("input[name=negativebackground30]").css('background-color', '#b6b6b6');
        } else {
            notanumber = true;
            $("input[name=negativebackground30]").css('background-color', 'red');

        }
        if (numberRegex.test($("input[name=negativebackground50]").val())) {
            var negativebackground50save = $("input[name=negativebackground50]").val();

            $("input[name=negativebackground50]").css('background-color', '#b6b6b6');
        } else {
            notanumber = true;
            $("input[name=negativebackground50]").css('background-color', 'red');
        }
        if (numberRegex.test($("input[name=negativebackground90]").val())) {
            var negativebackground90save = $("input[name=negativebackground90]").val();

            $("input[name=negativebackground90]").css('background-color', '#b6b6b6');
        } else {
            notanumber = true;
            $("input[name=negativebackground90]").css('background-color', 'red');
        }
        if (numberRegex.test($("input[name=negativebackground100]").val())) {
            var negativebackground100save = $("input[name=negativebackground100]").val();

            $("input[name=negativebackground100]").css('background-color', '#b6b6b6');
        } else {
            notanumber = true;
            $("input[name=negativebackground100]").css('background-color', 'red');
        }
        if (notanumber === true) {
            return false
        } else {
            // get the other variables we need.
            var customstylesave = $("input[name=customstyle]").is(':checked');

            var modnotificationssave = $("input[name=modnotifications]").is(':checked');

            var negativecommentsave = $("input[name=negativecomment]").is(':checked');

            var dcresetmodcountsave = $("input[name=dcresetmodcount]").is(':checked');

            var removedcommentsave = $("input[name=removedcomment]:checked").val();

            if (dcresetmodcountsave === true) {
                if (confirm("Are you sure that you want to clear all mod actions?")) {

                    getallmodactions();
                    $.each(modactionArr, function (index, value) {
                        localStorage.removeItem(value);
                    });
                } else {

                    return
                }
            } else {
                $('input.modcount').each(function () {
                    var negativeuser = $(this).attr('name');
                    if ($("input[name=" + negativeuser + "]").is(':checked')) {
                        localStorage.removeItem('logaction_' + negativeuser);
                    } else {
                        // Save all the things!           
                    }
                });
                // Save all the things!    
                localStorage.setItem('negativebackground30', negativebackground30save);
                localStorage.setItem('negativebackground90', negativebackground50save);
                localStorage.setItem('negativebackground90', negativebackground90save);
                localStorage.setItem('negativebackground100', negativebackground100save);
                if (customstylesave === true) {
                    var customstylesave2 = 'on';
                } else {
                    var customstylesave2 = 'off';
                }
                localStorage.setItem('stylesetting', customstylesave2);
                if (modnotificationssave === true) {
                    var modnotificationssave2 = 'on';
                } else {
                    var modnotificationssave2 = 'off';
                }
                localStorage.setItem('modnotifications', modnotificationssave2);


                if (negativecommentsave === true) {
                    var negativecommentsave2 = 'on';
                } else {
                    var negativecommentsave2 = 'off';
                }

                localStorage.setItem('highlightsetting', negativecommentsave2);
                localStorage.setItem('removedcomment', removedcommentsave);
                getallmodactions();
            }
        }
    }
    // save but do not close the menu. Give message on succes or on failure.
    $(document).on('click', '#dc-save', function () {
        if (savesettings() === false) {
            alert("I'm sorry, Dave, I'm afraid I can't do that.");
        } else {
            toast('Settings saved.');
        }
    });
    // Save and close the menu
    $(document).on('click', '#dc-save-exit', function () {
        if (savesettings() === false) {
            alert("I'm sorry, Dave, I'm afraid I can't do that.");
        } else {
            $('#dcsettings').attr('class', 'slideOut');
            $('#dcsettings-modcount').attr('class', 'slideOut');
            $("#dchovermodlog").css('visibility', 'hidden');
            location.reload();
        }
    });
    //
    //
    // Logging of modactions is done in this code block
    //
    //  

    // This function logs everthing that is needed, it will be triggerd when a ajax request is made related to either spam, removal or report.
    function logmodaction(logid, logexecuted) {

        $.getJSON('http://www.reddit.com/api/info.json?id=' + logid, function (logdata) {
            var loguser = logdata.data.children[0].data.author;
            var logr = logdata.data.children[0].data.subreddit;
            var logaction = localStorage.getItem('logaction_' + loguser) || '{}';

            logaction = JSON.parse(logaction);

            if (jQuery.isEmptyObject(logaction)) {

                logaction[logr] = {
                    "removed": 0,
                        "spammed": 0,
                        "reported": 0,
                        "total": 0
                };
                logaction.total = {
                    "removed": 0,
                        "spammed": 0,
                        "reported": 0,
                        "total": 0
                };
                logaction[logr][logexecuted] = 1;
                logaction.total[logexecuted] = 1;
                logaction[logr].total = 1;
                logaction.total.total = 1;
                localStorage.setItem('logaction_' + loguser, JSON.stringify(logaction));
            } else if (logaction.hasOwnProperty(logr)) {

                logaction[logr][logexecuted] = parseInt(logaction[logr][logexecuted], 10) + 1;


                logaction.total[logexecuted] = parseInt(logaction.total[logexecuted], 10) + 1;
                logaction[logr].total = parseInt(logaction[logr].total, 10) + 1;
                logaction.total.total = parseInt(logaction.total.total, 10) + 1;
                localStorage.setItem('logaction_' + loguser, JSON.stringify(logaction));
            } else {

                logaction[logr] = {
                    "removed": 0,
                        "spammed": 0,
                        "reported": 0,
                        "total": 0
                };
                logaction[logr][logexecuted] = 1;
                logaction[logr].total = 1;
                logaction.total[logexecuted] = parseInt(logaction.total[logexecuted], 10) + 1;
                logaction.total.total = parseInt(logaction.total.total, 10) + 1;
                localStorage.setItem('logaction_' + loguser, JSON.stringify(logaction));
            }


        });
    }
    // look for ajax calls that relate to removal of a comment or submission, triggers: logmodaction()
    $('body').ajaxSend(function (event, jqxhr, settings) {



        if (settings.url == '/api/remove') {
            var splitvar = settings.data
            splitvar = splitvar.replace(/=/g, '=\'');
            splitvar = splitvar.replace(/&/g, '\';') + '\';';

            var id;
            var executed;
            var spam;
            var r;
            var uh;
            var renderstyle;
            eval(splitvar);
            if (spam == 'False') {
                executed = 'removed';
            } else {
                executed = 'spammed';
            }
            logmodaction(id, executed);

        }
        if (settings.url == '/api/report') {

            var splitvar = settings.data
            splitvar = splitvar.replace(/=/g, '=\'');
            splitvar = splitvar.replace(/&/g, '\';') + '\';';

            var id;
            var executed;
            var spam;
            var r;
            var uh;
            var renderstyle;
            eval(splitvar);
            executed = 'reported';
            logmodaction(id, executed);
        } else {}
    });
    // Add a mod action count to the username
    $('.thing .entry .author').each(function () {
        var Modhistory = $(this).text()
        var usrmod = localStorage.getItem('logaction_' + Modhistory) || '{}';


        usrmod = JSON.parse(usrmod);
        if (jQuery.isEmptyObject(usrmod)) {

        } else {
            $(this).siblings('.userattrs').after('<span class="modactions">Mod actions: <a class="dcmodlog" href="javascript:void(0)" title="' + Modhistory + '">[' + usrmod['total']['total'] + ']</a></span>');
        }
    });

    //
    //
    // Everthing related to the counters and notifications
    //
    //

    $('.footer-parent').prepend('<div id="dchovermodlog"><span class="DCCloseButton" id="DCClose2">X</span><span id="hovercontent">text<span></div>');
    $(document).on('click', '.dcmodlog', function (e) {
        $("#dchovermodlog").css('visibility', 'visible');
        $("#dchovermodlog").show(2000);
        $("#dchovermodlog").offset({
            left: e.pageX,
            top: e.pageY
        });
        var loguser = $(this).attr('title');
        var logaction = localStorage.getItem('logaction_' + loguser) || '{}';



        logaction = JSON.parse(logaction);
        var breakdown = "";
        for (i in logaction) {
            if (i == 'total') {} else {



                breakdown = breakdown + '<tr><td><b>' + i + '</b></td><td style="background-color: rgba(225, 78, 0, 0.3);">' + logaction[i]['removed'] + '</td><td style="background-color: rgba(225, 78, 0, 0.1);">' + logaction[i].spammed + '</td><td style="background-color: rgba(225, 78, 0, 0.3);">' + logaction[i].reported + '</td><td>' + logaction[i].total + '</td></tr>';
            }
        }
        var totallogactions = '<tr><td><b>total</b></td><td style="background-color: rgba(225, 78, 0, 0.3);"><b><i>' + logaction["total"].removed + '</b></i></td><td style="background-color: rgba(225, 78, 0, 0.1);"><b><i>' + logaction["total"].spammed + '</b></i></td><td style="background-color: rgba(225, 78, 0, 0.3);"><b><i>' + logaction["total"].reported + '</b></i></td><td>' + logaction["total"].total + '</td></tr>';
        $('#hovercontent').html('<table style="padding: 2px;"><tr><td><b>Name</b></td><td style="background-color: rgba(225, 78, 0, 0.3);">removed</td><td style="background-color: rgba(225, 78, 0, 0.1);">spammed</td><td style="background-color: rgba(225, 78, 0, 0.3);">reported</td><td>total</td></tr>' + breakdown + totallogactions + '</table>');
    });
    $(document).on('click', '#DCClose2', function (e) {
        $("#dchovermodlog").css('visibility', 'hidden');
    });
    // we only use these variables during page load
    var dcunreadmessagecount = localStorage.getItem('dcunreadmessagecount') || '0';
    var dcmodqueuecount = localStorage.getItem('dcmodqueuecount') || '0';
    var dcmumoderatedcount = localStorage.getItem('dcmumoderatedcount') || '0';
    var dcmodmailcount = localStorage.getItem('dcmodmailcount') || '0';
    // toolbar, this will display all counters, quick links and other settings for the toolbox
    $('.footer-parent').prepend('<div id="dcbottombar" class="dctoolbar"><a class="dcsettingsmenu dctoolbar" href="javascript:void(0)">dc Settings</a> <span id="dctoolbarcounters"><a title="no mail" href="http://www.reddit.com/message/inbox/" class="nohavemail" id="dcmail"></a> <a href="http://www.reddit.com/message/unread" class="dctoolbar" id="dcmailCount">[' + dcunreadmessagecount + '] </a><a title="modqueue" href="http://www.reddit.com/r/mod/about/modqueue?limit=100" id="dcmodqueue"></a> <a href="http://www.reddit.com/r/mod/about/modqueue?limit=100" class="dctoolbar" id="dcqueueCount">[' + dcmodqueuecount + ']</a>  <a title="unmoderated" href="http://www.reddit.com/r/mod/about/unmoderated" id="dcunmoderated"></a><a href="http://www.reddit.com/r/mod/about/unmoderated" class="dctoolbar" id="dcunmoderatedcount">[' + dcmumoderatedcount + ']</a> <a title="modmail" href="http://www.reddit.com/message/moderator/unread/" id="dcmodmail" class="nohavemail"></a><a href="http://www.reddit.com/message/moderator/unread/" class="dctoolbar" id="dcmodmailcount">[' + dcmodmailcount + ']</a></span></div>');

    function dcgetmessages() {
        // get some of the variables we need to determine if there are new messages to display and counters to update.
        var dcunreadmessagecount = localStorage.getItem('dcunreadmessagecount') || '0';
        var dcmodqueuecount = localStorage.getItem('dcmodqueuecount') || '0';
        var dcmumoderatedcount = localStorage.getItem('dcmumoderatedcount') || '0';

        //
        // Messages
        //

        // the reddit api is silly sometimes, we want the title or reported comments and there is no easy way to get it, so here it goes: a silly function to get the title anyway. The $.getJSON is wrapped in a function to prevent if from running async outside the loop.
        function getcommentitle(unreadcontexturl, unreadcontext, unreaddcauthor, unreaddcbody_html) {
            $.getJSON(unreadcontexturl, function (jsondata) {

                var commenttitle = jsondata[0].data.children[0].data.title;
                $.sticky('<a href="http://www.reddit.com/message/unread/"><img src="http://www.redditstatic.com/mail.png" alt="new comment"></a> Comment: <br><div class="dc-post-example" style="width:100%"><p class="tagline"><b><a href="http://www.reddit.com/u/' + unreaddcauthor + '" target="_blank">' + unreaddcauthor + '</a> replied in <a href="http://www.reddit.com' + unreadcontext + '" target="_blank">' + commenttitle + '</a></b><p>' + unreaddcbody_html + '</div>');
            });
        }
        // getting unread messages
        var unreadmessages;
        $.getJSON('http://www.reddit.com/message/unread.json', function (json) {
            if (json.data.children == '') {

                dcunreadmessagecount = 0;
                $('#mailCount').html('');
                $('#dcmailCount').html('[0]');
                // here we wil set the new value for dcunreamessagedcount. a function call to change counters will also be here
                localStorage.setItem('dcunreadmessagecount', dcunreadmessagecount);
                $('#mail').attr('class', 'nohavemail');
                $('#mail').attr('title', 'no new mail!');
                $('#dcmail').attr('class', 'nohavemail');
                $('#dcmail').attr('title', 'no new mail!');
                $('#dcmail').attr('href', 'http://www.reddit.com/message/inbox');
            } else {

                // here we wil set the new value for dcunreadmessagecount, a function call to change counters will also be here.
                $('#mail').attr('class', 'havemail');
                $('#mail').attr('title', 'new mail!');
                $('#mailCount').html('[' + json.data.children.length + ']');
                $('#dcmail').attr('class', 'havemail');
                $('#dcmail').attr('title', 'new mail!');
                $('#dcmail').attr('href', 'http://www.reddit.com/message/unread');
                $('#dcmailCount').html('[' + json.data.children.length + ']');
                localStorage.setItem('dcunreadmessagecount', json.data.children.length);
                // make sure we haven't shown the unread messages before
                if (json.data.children.length > dcunreadmessagecount) {
                    var unreadmessagecounter = (json.data.children.length - dcunreadmessagecount);
                    var unreadmessageamount = json.data.children.length;

                    // go ahead and show the messages that haven't been shown yet
                    for (var i = 0; i < unreadmessagecounter; i++) {

                        // if it is a comment we use this code block                        
                        if (json.data.children[i].kind == 't1') {

                            var dccontext = json.data.children[i].data.context;
                            var dcbody_html = htmlDecode(json.data.children[i].data.body_html);


                            var dcauthor = json.data.children[i].data.author;
                            var dccontexturl = 'http://www.reddit.com' + dccontext.slice(0, -10) + '.json';
                            getcommentitle(dccontexturl, dccontext, dcauthor, dcbody_html);
                            // if it is a personal message (or some other id I don't know about)  we use this code block        
                        } else {

                            var dcauthor = json.data.children[i].data.author;
                            var dcbody_html = htmlDecode(json.data.children[i].data.body_html);
                            var dcsubject = htmlDecode(json.data.children[i].data.subject);
                            $.sticky('<a href="http://www.reddit.com/message/unread/"><img src="http://www.redditstatic.com/mail.png" alt="new pm" border="0"></a>  Personal message: <br><div class="dc-post-example" style="width:100%"><p class="tagline"><b>' + dcsubject + '</b> from <b><a href="http://www.reddit.com/u/' + dcauthor + '" target="_blank">' + dcauthor + '</a></b><p>' + dcbody_html + '</div>');
                        }
                    }
                    // break it up if there is nothing to be shown. This can be removed later, now here for debugging purposes
                } else {

                }
            }
        });
        //
        // Modqueue
        //

        // wrapper around $.getJSON so it can be part of a loop
        function procesmqcomments(mqlinkid, mqreportauthor, mqidname) {
            $.getJSON(mqlinkid, function (jsondata) {
                var infopermalink = jsondata.data.children[0].data.permalink;
                var infotitle = jsondata.data.children[0].data.title;
                var infosubreddit = jsondata.data.children[0].data.subreddit;
                infopermalink = infopermalink + mqidname.substring(3);

                $.sticky('<a href="http://www.reddit.com/r/mod/about/modqueue?limit=100"><img src="http://creesch.github.com/reddit-declutter/modqueue.png" alt="new comment in modqueue"></a>Modqueue - comment: <br><div class="dc-post-example" style="width:100%"><p class="tagline"><b><a href="http://www.reddit.com' + infopermalink + '" target="blank">' + mqreportauthor + '\'s comment in ' + infotitle + '</a><p><p class="tagline"> subreddit: ' + infosubreddit + '<p></div>');
            });
        }
        // getting modqueue
        $.getJSON('http://www.reddit.com/r/mod/about/modqueue.json?limit=100', function (json) {
            // check if there are items in the modqueue
            if (json.data.children == '') {

                dcmodqueuecount = 0;
                $('#dcmodqueuecount').html('[0]');
                // here we wil set the new value for dcmodqueuecount, disabled so it will keep showing messages for debugging. This will also be used in order to change the counters in the toolbar to the correct value.
                localStorage.setItem('dcmodqueuecount', dcmodqueuecount);
            } else {
                var mqitemsinqueue = json.data.children.length

                if (modnotifications == 'on') {
                    // check if it can come out and play or already did last time
                    if (json.data.children.length > dcmodqueuecount) {
                        var modqueecounter = (json.data.children.length - dcmodqueuecount);
                        var modqueecountersecond = (json.data.children.length - modqueecounter - 1);
                        var modqueeamount = json.data.children.length;

                        // loop through all items that haven't been shown yet
                        for (var i = (modqueeamount - 1); i > modqueecountersecond; i--) {

                            // message for a submission
                            if (json.data.children[i].kind == 't3') {

                                var mqpermalink = json.data.children[i].data.permalink;
                                var mqtitle = json.data.children[i].data.title;
                                var mqauthor = json.data.children[i].data.author;
                                var mqsubreddit = json.data.children[i].data.subreddit;
                                $.sticky('<a href="http://www.reddit.com/r/mod/about/modqueue?limit=100"><img src="http://creesch.github.com/reddit-declutter/modqueue.png" alt="new submission in modqueue"></a>Modqueue - submission: <br><div class="dc-post-example" style="width:100%"><p><b><a href="http://www.reddit.com' + mqpermalink + '" target="blank">' + mqtitle + '</a><p><p class="tagline">By: <a href="http://www.reddit.com/u/' + mqauthor + '" target="_blank">' + mqauthor + '</a> in ' + mqsubreddit + '<p></div>');
                                // message for a comment (or other freak id's
                            } else {


                                var reportauthor = json.data.children[i].data.author;

                                var idname = json.data.children[i].data.name;
                                var linkid = 'http://www.reddit.com/api/info.json?id=' + json.data.children[i].data.link_id;
                                //since we want to add some adition details to this we call the previous declared function
                                procesmqcomments(linkid, reportauthor, idname);
                            }
                        }
                        // here we wil set the new value for dcmodqueuecount, disabled so it will keep showing messages for debugging. This will also be used in order to change the counters in the toolbar to the correct value.
                    }
                }
                localStorage.setItem('dcmodqueuecount', json.data.children.length);
                $('#dcqueueCount').html('[' + json.data.children.length + ']');
            }
        });
        //
        // Unmoderated
        //

        // getting unmoderated, for now only a counter, otherwise it might be to much with the notifications


        $.getJSON('http://www.reddit.com/r/mod/about/unmoderated.json', function (json) {
            // check if there are items in the modqueue
            if (json.data.children == '') {

                dcmumoderatedcount = 0;
                $('#dcunmoderatedcount').html('[0]');
                // here we wil set the new value for dcmumoderatedcount, disabled so it will keep showing messages for debugging. This will also be used in order to change the counters in the toolbar to the correct value.
                localStorage.setItem('dcmumoderatedcount', dcmumoderatedcount);
            } else {
                var itemsinqueue = json.data.children.length

                $('#dcunmoderatedcount').html('[' + itemsinqueue + ']');
                // check if it can come out and play or already did last time
                localStorage.setItem('dcmumoderatedcount', json.data.children.length);
            }
        });

        // getting unmoderated, for now only a counter, otherwise it might be to much with the notifications
        $.getJSON('http://www.reddit.com/message/moderator/unread.json', function (json) {
            // check if there are items in the modqueue
            if (json.data.children == '') {

                dcmodmailcount = 0;
                $('#dcmodmailcount').html('[0]');
                $('#dcmodmail').attr('class', 'nohavemail');
                $('#dcmodmail').attr('title', 'no new mail!');
                $('#dcmodmail').attr('href', 'http://www.reddit.com/message/moderator/');



                localStorage.setItem('dcmodmailcount', dcmodmailcount);
            } else {

                $('#modmail').attr('class', 'havemail');
                $('#modmail').attr('title', 'new mail!');
                $('#dcmodmail').attr('class', 'havemail');
                $('#dcmodmail').attr('title', 'new mail!');
                $('#dcmodmail').attr('href', 'http://www.reddit.com/message/moderator/unread/');
                var dcmodmailcount = json.data.children.length

                $('#dcmodmailcount').html('[' + dcmodmailcount + ']');
                localStorage.setItem('dcmodmailcount', dcmodmailcount);
            }
        });

















    }
    // How often we check for new messages, this will later be adjustable in the settings. For now one one minute.
    var timer = setInterval(dcgetmessages, 60000);
    dcgetmessages();








    //
    //
    // css related code
    //
    //

    // either highlight removed comments or hide them
    if (removedcomment == "hide") {
        $("li:contains('[ removed by')").closest("div").css('display', 'none');
    } else {
        $("li:contains('[ removed by')").closest("div").css('border', '2px solid red');
    }
    // Replace the background for comments that meet the defined values.
    if (highlightsetting == 'on') {
        $('span.score.unvoted').each(function () {
            var textStr = $(this).text();
            var IntStr = parseInt(textStr, 10);
            if (IntStr < negativebackground100) {
                $(this).closest("div").css('background-image', 'url(http://creesch.github.com/reddit-declutter/comment_bg/100.png)');
            } else if (IntStr < negativebackground90) {
                $(this).closest("div").css('background-image', 'url(http://creesch.github.com/reddit-declutter/comment_bg/90.png)');
            } else if (IntStr < negativebackground50) {
                $(this).closest("div").css('background-image', 'url(http://creesch.github.com/reddit-declutter/comment_bg/50.png)');
            } else if (IntStr < negativebackground30) {
                $(this).closest("div").css('background-image', 'url(http://creesch.github.com/reddit-declutter/comment_bg/30.png)');
            }
        });
    }
    // toggle stylesheet if on for individual subreddits
    if (stylesetting == 'on') {
        function individualstylesetting() {
            if (stylesettingindividual == 'on') {
                localStorage.setItem('stylesetting' + reddit.cur_site, 'off');
            } else {
                localStorage.setItem('stylesetting' + reddit.cur_site, 'on');
            }
            location.reload();
        }
        $('<li><a href="javascript:;" accesskey="D" class="declutter-settings">Declutter style: ' + stylesettingindividual + '</a></li>').appendTo('.tabmenu').click(individualstylesetting);
    }
    // Load the stylesheet from Github if the user has the style turned on globally and for this sub
    if (stylesetting == 'on') {
        if (stylesettingindividual == 'on') {
            $("<link/>", {
                rel: "stylesheet",
                href: "http://creesch.github.com/reddit-declutter/reddit.css"
            }).appendTo("head");
        }
    }
    // Load the mandatory stylesheet from Github
    $("<link/>", {
        rel: "stylesheet",
        href: "http://creesch.github.com/reddit-declutter/dcstyles.css"
    }).appendTo("head");
}
// Add script to the page
document.addEventListener('DOMContentLoaded', function (e) {
    var s = document.createElement('script');
    s.textContent = "(" + declutter.toString() + ')();';
    document.head.appendChild(s)
});