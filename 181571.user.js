 // ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

// ==UserScript==
// [url=home.php?mod=space&uid=38656]@name[/url]       DZ论坛自动回复
// @namespace  
// @version    1.0
// @description  DZ论坛自动回复
// @match      http://*/*
// @copyright  枫.feng
// ==/UserScript==

var rcontent = new Array("沙发！支持楼主的贴子……\n\n\n\n\n\n\n\n\n\n\n\n 关键词 http://www.xxx.com/","帖子不错，谢谢楼主发贴分享，大力支持！\n\n\n\n\n\n\n\n\n\n\n\n 关键词         http://www.xxx.com/","辛苦了！感谢楼主的无私奉献！\n\n\n\n\n\n\n\n\n\n\n\n 关键词 http://www.xxx.com/","如此好资源一定要强顶，多谢楼主每天更新！\n\n\n\n\n\n\n\n\n\n\n\n 关键词         http://www.xxx.com/");


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
                                    new_message = rcontent[Math.floor(Math.random()*rcontent.length)];
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
                    reply_message = rcontent[Math.floor(Math.random()*rcontent.length)];
            reply_message = reply_message.replace(/(^\s*|\s*$)/g, "");
            if(reply_message == "")       
                    reply_message = rcontent[Math.floor(Math.random()*rcontent.length)];
            auto_reply_chinaunix(reply_message);
    }
    catch(err)
    {
    }

