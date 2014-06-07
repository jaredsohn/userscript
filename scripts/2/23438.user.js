// ==UserScript==
// @name           Google Account Multi-Login
// @namespace      http://bestorkuteditor.blogspot.com
// @description    Replaces "Sign Out" link on Google pages with a select box of accounts.
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        http://google.tld/*
// @include        https://google.tld/*
// @exclude        http*://mail.google.tld/*ui=1*
// ==/UserScript==

// Begin Script Update Checker code
var version_scriptURL = "http://userscripts.org/scripts/source/16341.user.js"; // Change 

this URL to point to a permanent copy of your own script.
var version_timestamp = 1200722351000; // Used to differentiate one version of the script 

from an older one. Use the Date.getTime() function to get a value for this.
if(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new 

Date().getTime())){GM_xmlhttpRequest({method:"GET",url:version_scriptURL+"?"+new 

Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setVal

ue("lastUpdate",new 

Date().getTime()+"");if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.respons

eText)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey 

script 

\""+xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g,"")+".\"\

nWould you like to go to the install page now?")){GM_openInTab(version_scriptURL);}}}});}
// End Script Update Checker code

if (document.domain.indexOf("google.") == -1) return;

// Load persistent user data
if (!GM_getValue)
    {alert("You need the newest version of Greasemonkey to run this script. Please 

upgrade."); return;}
usernames = GM_getValue("usernames", "").split(",");
passwords = GM_getValue("passwords", "").split(",");
autologin = GM_getValue("autologin", "");
if (typeof(autologin) == "boolean") // For backwards compatibility with older versions of 

the script
{
    var al = new Array(usernames.length);
    for (var i = 0; i < usernames.length; i++)
        {al[i] = "false";}
    autologin = al;
    GM_setValue("autologin", al.join(","));
}
else
    {autologin.split(",");}

function makeUserList(prefix, suffix, numbered)
{
    if (usernames[0] == "")
        return "";
    a = "";
    for (i = 0; i < usernames.length; i++)
    {
        a += prefix;
        if (numbered)
            a += (i+1) + ") "
        a += usernames[i] + suffix;
    }
    return a;
}

function getService()
{
    if (document.domain.indexOf("docs.google") != -1)
        {return "writely";}
    else if (document.location.href.indexOf("/webmasters/") != -1)
        {return "sitemaps";}
    else if (document.location.href.indexOf("/calendar/") != -1)
        {return "cl";}
    else
        {return "mail";}
}

function onSelectChange()
{
    var i = this.selectedIndex - 2;
    var len = this.length;
    if ((i < len - 5) && ( i >= 0))
    {
        var un = usernames[i];
        var pw = passwords[i];
        var al = autologin[i];
        if (pw == "")
            {pw = prompt('Password for ' + un + ":");}
        if (pw != null)
        {
            this.parentNode.Email.value = un;
            this.parentNode.Passwd.value = pw;
            this.parentNode.PersistentCookie.value = al;
            this.parentNode.submit();
        }
    }
    else if (i == len - 5)
    {
        var u = prompt('Username:');
        if (u != null)
            {var p = prompt('Password (leave blank to prompt every time):');}
        if ((u != null) && (p != null))
        {
            if ((u.indexOf(',') != -1) || (p.indexOf(',') != -1))
                {alert('Usernames and passwords cannot contain commas.');}
            else
            {
                var a = confirm('Turn on autologin for this account?') + "";
                if ((usernames[0] == "") || (GM_getValue("usernames", "") == ""))
                    {var u2 = u; var p2 = p; var a2 = a;}
                else
                {
                    var u2 = GM_getValue('usernames') + ',' + u;
                    var p2 = GM_getValue('passwords') + ',' + p;
                    var a2 = GM_getValue('autologin') + ',' + a;
                }
                GM_setValue('usernames', u2); usernames = u2.split(',');
                GM_setValue('passwords', p2); passwords = p2.split(',');
                GM_setValue('autologin', a2); autologin = a2.split(',');
                for (var j = 0; j < 4; j++)
                    {this.options[len - j] = new Option(this.options[len-j-1].text);}
                this.options[len-4] = new Option(u);
                this.options[len-3].disabled = "disabled";
                alert('Account added.');
            }
        }
        this.selectedIndex = 0;
    }
    else if (i == len - 4)
    {
        if (usernames[0] == "")
            {alert("No accounts to remove.");}
        else
        {
            u = parseInt(prompt('Enter the number of the account to be removed:' + 

makeUserList("\n", "", true)));
            if (isNaN(u)) {}
            else if ((u < 1) || (u > usernames.length))
                {alert('Invalid option.')}
            else
            {
                u = usernames[u-1];
                var un = GM_getValue('usernames').split(',');
                var pw = GM_getValue('passwords').split(',');
                var al = GM_getValue('autologin').split(',');
                var j = -1;
                for (var k = 0; k < un.length; k++)
                    {if(un[k]==u) j=k;}
                if (j == -1)
                    {alert('Account appears to have already been removed. Refresh the page 

to update account list.');}
                else
                {
                    un.splice(j, 1);
                    pw.splice(j, 1);
                    al.splice(j, 1);
                    GM_setValue('usernames', un.join(',')); usernames = un;
                    GM_setValue('passwords', pw.join(',')); passwords = pw;
                    GM_setValue('autologin', al.join(',')); autologin = al;
                    this.remove(j+2);
                    alert('Account removed.');
                }
            }
        }
        this.selectedIndex = 0;
    }
    else if (i == len - 3)
    {
        if (document.domain.indexOf("mail.google") != -1)
            {var s = 'https://mail.google.com/mail/?logout';}
        else if (document.domain.indexOf("docs.google") != -1)
            {var s = 'https://docs.google.com/logout';}
        else if (document.location.href.indexOf("/calendar/") != -1)
            {var s = 'https://www.google.com/calendar/logout';}
        else
            {var s = 'http://www.google.com/accounts/Logout?continue=' + 

escape(window.location.href.split("#")[0]);}
        document.location.href = s;
    }
}

function initialize()
{
    selectBox = document.createElement("span");
    selectBox.innerHTML = '<form name="gmLoginForm" 

action="https://www.google.com/accounts/ServiceLoginAuth" method="post" 

style="display:inline;"><select style="font-family:arial,san-serif; font-size:7pt; 

position:relative; top:2px; padding:0px; height:13px;" name="gmSelectLogin"><option>Change 

User...</option><option disabled="disabled">&#8212;&#8212;</option>' + 

makeUserList('<option>', '</option>', false) + '<option 

disabled="disabled">&#8212;&#8212;</option><option>Add Account...</option><option>Remove 

Account...</option><option>Sign Out</option></select><input type = "hidden" name="continue" 

value="' + window.location.href.split("#")[0] + '" /><input type="hidden" 

name="PersistentCookie" /><input type="hidden" name="Email" /><input type="hidden" 

name="Passwd" /><input type="hidden" name="service" value="' + getService() + '" /></form>';
    
    if (frames.length == 0)
        {var f = new Array(window);}
    else
    {
        var f = new Array(frames.length + 1);
        for (var k = 0; k < frames.length; k++)
            {f[k] = frames[k];}
        f[f.length] = window;
    }
    for (var j = 0; j < f.length; j++)
    {
        try
        {
            var links = f[j].document.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++)
            {
                if (links[i].innerHTML.toLowerCase().indexOf("sign out") != -1)
                {
                    links[i].parentNode.replaceChild(selectBox, links[i]);
                    

f[j].document.forms.namedItem("gmLoginForm").elements.namedItem("gmSelectLogin").addEventLis

tener('change', onSelectChange, true);
                }
            }
        }
        catch (err) {}
    }
}

window.addEventListener('load', initialize, false);
