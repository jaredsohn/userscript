// ==UserScript==
// @name           eRep Fast Message Service
// @namespace      erep_fms
// @include        http://www.erepublik.com/*/citizen/profile/*
// @include        http://www.erepublik.com/*/organization/*
// @version        v1 (2/9/10)
// ==/UserScript==

var input, captchaHTML, challengeCode;

captchaHTML = "";
challengeCode = "";
sesCode = "";

var sendPM = function()
{
    var postdata = "", first = 1;
    
    input["message_body"] = document.getElementById('msgbody').value;
    input["message_subject"] = document.getElementById('msgsubj').value;
    if(captchaHTML=="")
    {
        input["recaptcha_response_field"] = "1";
    }
    else
    {
        input["recaptcha_challenge_field"] = challengeCode;
        input["recaptcha_response_field"] = document.getElementById('captchafield').value;
    }
    
    for(var val in input)
    {
        if(first!=1)
            postdata += "&"
        else
            first=0;
        
        postdata = postdata + val + "=" + encodeURIComponent(input[val]);
    }

    GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.erepublik.com/en/messages/compose/" + document.getElementById('author').value,
        data: postdata,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
            document.getElementById('loadingimg').style.display = 'none';
            if(response.finalUrl == "http://www.erepublik.com/en/messages/inbox/1")
            {
                document.getElementById('messageDiv').innerHTML = "The message was sent successfully.";
            }
            else 
            {
                document.getElementById('messageDiv').innerHTML = "Failed. (Headless chicken?)<br /><textarea style=\"display:none;\">Trackback: " + response.responseText.replace(/textarea/g, "testarea") + "</textarea>";
                alert(response.finalUrl);
            }
        }
    });
}

var messageBox = function()
{
    document.getElementById('loadingimg').style.display = 'none';
    document.getElementById('messageDiv').innerHTML = '\
    <table style="margin: 3px auto;">\
        <tr>\
            <td align="right">\
                Subject: \
            </td>\
            <td>\
                <input type="text" id="msgsubj" style="width:400px;" />\
            </td>'
        + captchaHTML +
       '</tr>\
        <tr>\
            <td align="right">\
                Body: \
            </td>\
            <td>\
                <textarea id="msgbody" style="width:400px;"></textarea>\
            </td>\
        </tr>\
        <tr>\
            <td colspan="2">\
                <input type="button" id="sendmsg" value="Send" />\
            </td>\
        </tr>\
    </table>';
    
    if(captchaHTML!="")
    {
        document.getElementById('reloadcaptcha').addEventListener('click', reloadCaptcha, false);
    }
    
    document.getElementById('messageDiv').style.display = 'block';   
    document.getElementById('sendmsg').addEventListener('click', sendPM, false);
}

var toggleFastPM = function()
{
    if(panel_opened)
    {
        document.getElementById('messageDiv').style.display = 'none';
        document.getElementById('messageDiv').innerHTML     = '';
        captchaHTML = "";
        challengeCode = "";
        sesCode = "";
        panel_opened = false;
    }
    else
    {
        document.getElementById('loadingimg').style.display = 'block';
        
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.erepublik.com/en/messages/compose/" + document.getElementById('author').value,
            onload: function(response) {
                if(response.status==200 && response.readyState == 4)
                {
                
                    input = new Array();
                    var matches = response.responseText.match(/<input type="hidden" id="_token" name="_token" value="([a-z0-9]+)" \/>/);
                    if(matches)
                        input["_token"] = matches[1];
                    else
                        return alert("Critical Error: Cannot find page token. Please contact with script writer.");

                    matches = response.responseText.match(/<input type="hidden" name="citizen_name" id="citizen_name" value="([A-Za-z0-9-_. ]{4,30})">/);
                    if(matches)
                        input["citizen_name"] = matches[1];
                    else
                        return alert("Critical Error: Cannot find \"citizen_name\". Please contact with script writer.");
                    
                    matches = response.responseText.match(/<input type="submit" name="commit" value="([A-Za-z0-9]+)" class="submit">/);
                    if(matches)
                        input["commit"] = matches[1];
                    else
                        return alert("Critical Error: Cannot find \"commit\". Please contact with script writer.");
                    
                    matches = response.responseText.match(/<div><label for="recaptcha_response_field">Complete the challenge:<\/label><\/div>/);
                    if(matches)
                    {
                        matches = response.responseText.match(/<script type="text\/javascript" src="http:\/\/api\.recaptcha\.net\/challenge\?k=([A-Za-z0-9\-_]+)"><\/script><noscript>/);
                        if(matches)
                        {
                            sesCode=matches[1];
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: 'http://api.recaptcha.net/challenge?k='+matches[1],
                                onload: function(response) {
                                    var matches = response.responseText.match(/challenge : '([a-zA-Z0-9\-_]+)'/);
                                    challengeCode = matches[1];
                                    
                                    captchaHTML = '<td rowspan="2"><img src="http://api.recaptcha.net/image?c=' + challengeCode + '" id="captchaImage" /><br /><input type="button" value="Reload" id="reloadcaptcha" /><input type="text" id="captchafield" /></td>';
                                    messageBox();
                                }
                            });
                        }
                        else
                            return alert("Critical Error: Problem while loading captcha. Please contact with script writer.");
                    }
                    else
                    {
                        messageBox();
                    }
                }
            }
        });
        
        panel_opened = true;
    }
}

var reloadCaptcha = function()
{
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://api.recaptcha.net/reload?c=' + challengeCode + '&k=' + sesCode +'&reason=r&type=image&lang=en',
        onload: function(response) {
            var matches = response.responseText.match(/Recaptcha\.finish_reload \('([a-zA-Z0-9\-_]+)'/);
            if(matches)
            {
                challengeCode = matches[1];
                document.getElementById('captchaImage').src = 'http://api.recaptcha.net/image?c=' + challengeCode;
            }
            else
                return alert("Critical Error: Problem while reloading captcha. Please contact with script writer.");
        }
    });
}

var toggleAutoOpen = function()
{
    if(GM_getValue('erep_fms_autoopen', false)) // if true
    {
        GM_setValue('erep_fms_autoopen', false);
        document.getElementById("toggle_auto_open").value = "Turn on automatic toggle";
    }
    else
    {
        GM_setValue('erep_fms_autoopen', true);
        document.getElementById("toggle_auto_open").value = "Turn off automatic toggle";
    }
}

var toggleDiv = document.createElement('div');
toggleDiv.setAttribute('id', 'toggleDiv');
toggleDiv.setAttribute('style', 'text-align: center;');
toggleDiv.innerHTML = '<input type="button" id="toggle_fast_pm" value="Toggle fast message panel" style="font-size: 10px;" /> <input type="button" id="toggle_auto_open" style="font-size: 10px;" value="Turn '+(GM_getValue('erep_fms_autoopen', false) ? "off" : "on")+' automatic toggle"><br /><br /><center><img alt="Embedded Image" width="16" height="16" src="data:image/gif;base64,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" style="display: none;" id="loadingimg" /></center>';
document.getElementById('container').insertBefore(toggleDiv, document.getElementById('content'));

document.getElementById('toggle_auto_open').addEventListener('click', toggleAutoOpen, false);

var messageDiv = document.createElement('div');
messageDiv.setAttribute('id', 'messageDiv');
messageDiv.setAttribute('style', 'text-align: center; display: none;');
document.getElementById('container').insertBefore(messageDiv, document.getElementById('content'));

var panel_opened = false;

if(GM_getValue('erep_fms_autoopen', false))
{
    toggleFastPM();
}

document.getElementById('toggle_fast_pm').addEventListener('click', toggleFastPM, false);