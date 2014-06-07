// ==UserScript==
//
//Displayable Name of your script 
// @name           Tycoon Online Market Watcher
//
// brief description
// @description    Auto refresh the market and alert user if a defined goods is available to buy
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://userscripts.org/users/thangtran/
//
// Your name, userscript userid link (optional)   
// @author         ThangTran (http://userscripts.org/users/thangtran/) 
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://userscripts.org/users/thangtran/
//
//Version Number
// @version        1.5
//
// Urls process this user script on
// @include        http://tycoononline.*/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        http://code.jquery.com/jquery-2.0.3.min.js
//
// @history        1.0 first version
// @history        1.1 update "TOP" window title -> "Reload XXXs"
// @history        1.2 change to use jQuery ajax to reload Market page to avoid Google Chrome memory footprint
// @history        1.3 support multiple keywords
// @history        1.4 add sound notification
// @history        1.5 auto-redirect to Sales page when in Order page, auto-refresh in 1m when a goods is found on the market
//
// ==/UserScript==

// extend JavaScript
// credit: http://stackoverflow.com/questions/280634/endswith-in-javascript
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// library loader
var execute = function (a) {
    var b, c;
    if(typeof a === "function") {
        b = "(" + a + ")();";
    } else { b = a; }
    c = document.createElement("script");
    c.textContent = b;
    document.body.appendChild(c);
    return c;
};
var load = function (src, on_load, on_error) {
    var d;
    d = document.createElement("script");
    d.setAttribute("src", src);
    if (on_load) { d.addEventListener("load", on_load); }
    if (on_error != null) { d.addEventListener("error", on_error); }
    document.body.appendChild(d);
    return d;
};
//load("http://code.jquery.com/jquery-2.0.3.min.js", function () {execute(function(){$.noop();});});

//And of course your code!!
$(document).ready(function ()
{
    ProcessUrl(document.location.href);    
});

// process URL
function ProcessUrl(url)
{    
    if (url.endsWith("page=marketSales"))
    { 
        RenderMarketPanel();
        CheckMarket();
        return;
    }
    
    if (url.indexOf("page=ordersList") >= 0)
    { 
        // restart after 2 seconds
        setTimeout(CheckMarket, 2*1000);
        return;
    }
    
    if (url.endsWith("server.php"))
    {
        SetAutoReload("/frame_index.php?page=marketSales", 20);
        return;
    }
    
    var settings = ReadSettings();    
    
    if (url.endsWith("frame_index.php?page=ogiltig") && settings.username != "")
    {
        // auto login
        SetAutoReload(function ()
        {
            AutoLogin(settings.username, settings.password);
        }, 5);
        return;
    }
    
    // if at homepage
    if (url.endsWith("index2.php") && settings.username != "")
    {
        // auto login
        SetAutoReload("/frame_index.php?page=marketSales", 5);
        return;
    }
}

function SetAutoReload(url, time)
{
    top.document.title = "Reload after: " + time + "s. " + document.title;
    setTimeout(function ()
    {        
        if (url != null && typeof(url) === "string")
        {
            window.location.href = url;
        }
        else if (url == null)
        {
            window.location.reload();
        }
        else
        {
            // execute as function
            url();
        }
    }, time*1000);
}

// auto login with given username & password
function AutoLogin(username, password)
{
    window.location.href = "http://tycoononline.nu/loginKontroll.php?sidvariabel=PHPSESSID&userName=" + escape(username) + "&password=" + escape(password);
}

// render panel in the market
function RenderMarketPanel()
{
    // get last settings
    var settings = ReadSettings();    

    var container = $("b:contains('Step')");
    var panel = $("<div/>").css("border", "black solid 1px").css("margin", "5px").css("padding", "5px");
    var html = "<div><label>Keywords to watch: </label><input data-tomw-name='keywords' value='" + settings.keywords + "' style='width:350px'/></div>";
    html += "<div><label>Username (if you want to auto-login): </label><input data-tomw-name='username' value='" + settings.username +"' style='width:200px'/></div>";    
    html += "<div><label>Password (if you want to auto-login): </label><input data-tomw-name='password' type='password' value='" + settings.password +"' style='width:200px'/></div>";    
    panel.html(html);
    // genereate Save button
    var btnSave = $("<button/>").text("Save").click(SavePanelSettings);
    panel.append(btnSave);
    container.append(panel);
}

// check market
function CheckMarket()
{
    // get keywords
    var keywords = ReadSettings().keywords.split(",");
    
    // find HTML tag
    var tag = $("td[class=text8]").filter(function() 
                                          {
                                              // get html code
                                              var htmlCode = $(this).html();
                                              
                                              // for each keyword
                                              for (var i = 0; i < keywords.length; i++)
                                              {
                                                  if (htmlCode === "&nbsp;" + keywords[i].trim())
                                                  {
                                                      return true;
                                                  }
                                              }         
                                              
                                              return false;
                                          });
    
    // if found
    if (tag.length > 0)
    {
        //// should not too many
        //if (tag.length > 1)
        //{
        //    alert("ERROR: too many matches were found. Check console log for matched elements.");
        //    console.log(tag);
        //    return;
        //}
    
        // highlight it
        tag.css("font-weight", "bold");
        
        // show notification
        var notification = window.webkitNotifications.createNotification(
            "http://tycoononline.nu/favicon.ico", 
            "Tycoon Online Market Watcher", 
            "\"" + keywords + "\" found in the market! The Watcher has been stopped.");
        notification.show();
        
        // play sound
        var sound = new Audio("http://oringz.com/oringz-uploads/jingle-bells-sms.mp3");
        sound.play();
        
        // restart after 5 minutes
        setTimeout(CheckMarket, 1*60*1000);
        return;
    }
    
    // run this method after next 10s
    setTimeout(CheckMarket, 10*1000);
    
    // refresh it
    var container = $("table[cellpadding='1'][width='100%']");   
    container.html("Refreshing data...");
    container.load("/frame_index.php?page=marketSales table[cellpadding='1'][width='100%']");
}

// save settings
function SavePanelSettings()
{
    GM_setValue("keywords", $("input[data-tomw-name=keywords]").val());
    GM_setValue("username", $("input[data-tomw-name=username]").val());
    GM_setValue("password", $("input[data-tomw-name=password]").val());
    alert("Settings Saved.");
    SetAutoReload(null, 1);
}

// load settings
function ReadSettings()
{
    return { 
        keywords: GM_getValue("keywords", "Pigs"), 
        username: GM_getValue("username", ""),
        password: GM_getValue("password", "")
    };
}