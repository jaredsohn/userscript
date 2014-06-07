// ==UserScript==
// @name       AutoReply
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  autoreply for discuz
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

    var auto_reply_default_message = '支持楼主希望楼主多发精品好帖...........';

    function auto_reply_chinaunix(reply_message)
    {
            var pattern =
                    /<script\s+[^>]*>*.*<\/script>/;
            var html = document.documentElement.innerHTML;
            var find = html.match(pattern);
            if(find)
            {
                    //alert(find[0]);
                    var input_area = document.getElementById('fastpostmessage');
                    var button_submit = document.getElementById('fastpostsubmit');
                    var fastpostrefresh = document.getElementById('fastpostrefresh');
                    if(input_area && button_submit)
                    {
                            var new_message = "";
                            if(new_message == null)
                                    return;
                            new_message = new_message.replace(/(^\s*|\s*$)/g, "");
                            if(new_message == "")       
                                    new_message = auto_reply_default_message;
                            try
                            {
                                    localStorage['auto_reply_message'] = new_message;
                            }
                            catch(err)
                            {
                            }
                            if(fastpostrefresh)
                                    fastpostrefresh.checked = false;
                            input_area.innerText = new_message;
                            button_submit.click();
                    }
            }
    }
    try
    {
            var reply_message = '';
           
            try
            {
                    reply_message = localStorage['auto_reply_message'];
            }
            catch(err)
            {
            }
            if(!reply_message)
                    reply_message = auto_reply_default_message;
            reply_message = reply_message.replace(/(^\s*|\s*$)/g, "");
            if(reply_message == "")       
                    reply_message = auto_reply_default_message;
            auto_reply_chinaunix(reply_message);
    }
    catch(err)
    {
    }