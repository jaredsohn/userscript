// ==UserScript==
// @name           eRepublik Donate Logger
// @namespace      erepDonateLogger
// @author         eCitizen 81192
// @include        http://www.erepublik.com/en/economy/donate-money/*
// @include        http://www.erepublik.com/en/economy/donate-items/*
// @include        http://www.erepublik.com/en/citizen/profile/*
// @version        0.5
// ==/UserScript==


var currURL = location.href;
var arrURL = currURL.split('/');
var userID = arrURL[6];
var pageURL = arrURL[4];

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery;
		letsJQuery();
	}
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    try{
        //alert(pageURL);
        if (pageURL == "economy")
        {
            var info_message = $(".info_message").text();
            var D = new Date();
            var logDate = D.getFullYear() + "-" + (D.getMonth()+1) + "-" + D.getDate() + " " + D.toLocaleTimeString();
            if (info_message != "")
            {
                $(".info_message").text(info_message + "(logger worked.)");
                GM_setValue(logDate, $("img.citizen_avatar").attr("alt") + "|" + userID + "|" + info_message);
            }
        }else if (pageURL == "citizen")
        {
            var selfID = $('.user_info a').attr('href').split('/')[4];

            if (selfID == userID)
            {
                $('div.citizen_content').append('<fieldset id="DLog"><legend>v0.5 Donate Log:&nbsp;&nbsp;<button id="DonateLog_clear">clear</button></legend><div id="DonateLog"></div></fieldset>');
                var list = GM_listValues().sort();
                $('button#DonateLog_clear').click(function() {
                    var r=confirm("Donate log will be cleared! Continue?");
                    if (r==true)
                    {
                        setTimeout(function () {
                            for (var i=0; i<list.length; i++)
                            {
                                GM_deleteValue(list[i]);
                                //alert("delete "+list[i]);
                            }
                        }, 0);
                        $("div#DonateLog").html('');
                    }

                });
                //alert(list);
                for (var i=0; i<list.length; i++)
                {
                    var data = GM_getValue(list[i]);
                    $("div#DonateLog").append('<div>' + "["  +  list[i]  +  "] To&nbsp;"
                                               + '<a class="nameholder" title="' + data.split('|')[0] + '" href="/en/citizen/profile/' + data.split('|')[1] + '">' + data.split('|')[0] + '</a>:'
                                               + '<br/>' + data.split('|')[2]
                                               + '</div>');
                }
            }
        }
    } catch (e) {
        alert(e);
    }
}