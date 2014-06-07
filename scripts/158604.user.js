// ==UserScript==
// @name           eRepublik Donate Logger - Fork
// @namespace      erepublikDonateLogger
// @author         eCitizen 81192
// @author         mablo
// @description    A logger for the donate history. Fork of http://userscripts.org/scripts/show/118439 
// @include        http://www.erepublik.com/en/economy/donate-money/*
// @include        http://www.erepublik.com/en/economy/donate-items/*
// @include        http://www.erepublik.com/en/citizen/profile/*
// @version        0.5.3
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
        if (pageURL == "economy")
        {
            var info_message = $(".info_message").text();
            var D = new Date();
            var logDate = D.getFullYear() + "-" + (D.getMonth()+1) + "-" + D.getDate() + " " + D.toLocaleTimeString();
            if (info_message != "")
            {
                $(".info_message").html("<tbody><tr><td>" + info_message + " (logger worked.)</td></tr></tbody>");
                GM_setValue(logDate, $("img.citizen_avatar").attr("alt") + "|" + userID + "|" + info_message);
            }
        }else if (pageURL == "citizen")
        {
            var selfID = $('#financier').attr('href').split('/')[4];

            if (selfID == userID)
            {
                $('div.citizen_content').append('<div class="clear"></div><h3>Donate Log (0.5.3):&nbsp;&nbsp;<button id="DonateLog_clear">clear</button></h3><div id="DonateLog" style="color: #666666"></div>');
                var list = GM_listValues().sort();
                $('button#DonateLog_clear').click(function() {
                    var r=confirm("Donate log will be cleared! Continue?");
                    if (r==true)
                    {
                        setTimeout(function () {
                            for (var i=0; i<list.length; i++)
                            {
                                GM_deleteValue(list[i]);
                            }
                        }, 0);
                        $("div#DonateLog").html('');
                    }

                });
                $("div#DonateLog").append('<table width="100%" border="0">');
                for (var i=0; i<list.length; i++)
                {
                    var data = GM_getValue(list[i]);
                    $("div#DonateLog").append('<tr><td width="120px" style="padding-right: 5px;">'  +  list[i]  +  '</td>'
                                               + '<td style="padding-right: 5px;"><a class="nameholder" title="' + data.split('|')[0] + '" href="/en/citizen/profile/' + data.split('|')[1] + '">' + data.split('|')[0] + '</a></td>'
                                               + '<td>' + data.split('|')[2] + '</td></tr>');
                }
                $("div#DonateLog").append('</table>');
            }
        }
    } catch (e) {
        alert(e);
    }
}