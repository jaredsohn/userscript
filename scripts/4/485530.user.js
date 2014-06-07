// ==UserScript==
// @name       OChat
// @namespace  http://ochat.crypt-msg.de/
// @version    0.9.5
// @description  Ochat - An Ogame Ally Chat which gets displayed ingame
// @include        http://*.ogame.*/game/index.php?*page=*
// @include        http://*-*.ogame.gameforge.com/game/index.php?page=*
// @grant       GM_listValues
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @copyright  2014+, Mertyr
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @updateURL  http://ojobs.crypt-msg.de/OChat.js
// ==/UserScript==
var OJconfig;
var mouseDragging = null;
var lastAllyMsg = 0;
var allyChatTimer;
var allyChatRate;
var panelIsOpen = 0;
var allyChatIsOpen = 0;
var register = 0;

var devTrigger = 0;
var devAlert = 0;

jQuery.fn.exists = function() {return this.length>0;};
jQuery.fn.slider = function() {
    $(this).children("h3").each(function(index, element){
        $(element).css("font-weight", "600");
        $(element).css("text-align", "center");
        $(element).css("height", "20px");
        $(element).css("line-height", "20px");
        $(element).css("margin-bottom", "2px");
        $(element).css("border", "1px solid #CCCCCC");
        $(element).css("border-radius", "5px");
        
        $(element).next().css("height", "auto");
        $(element).next().css("line-height", "20px");
        $(element).next().css("margin-bottom", "2px");
        $(element).next().css("border", "1px solid #999999");
        $(element).next().css("border-radius", "5px");
        
        $(element).next().hide();
        $(element).click(function(event) {
            $(this).next().toggle();
        });
    });
};

function OJgetCurrentUniverse()
{
    var url = document.URL;
    url = url.replace("http://s", "");
    url = url.replace(/\.ogame\.gameforge\.com\/.*/, "");
    return url;
}

function api(action, func, data)         //data starts with "&key=value&key2=....."
{
    if(typeof data === 'undefined')
    {
        data = "";
    }
    if(action == "login" || action == "register")
    {
        data = "action=" + action + data;
    }
    else
    {
        var uni = OJgetCurrentUniverse();
        var name = OJconfig["userName_" + uni];
        var passHash =  OJconfig["password_" + uni];
        var hashed = 0;
        if(typeof OJconfig["hashed_" + uni] !== 'undefined')
        {
            hashed = OJconfig["hashed_" + uni];
        }
        data = "hashed=" + hashed + "&name=" + name + "&passHash=" + passHash + "&uni=" + uni + "&action=" + action + data;
    }
    var url = "http://ojobs.crypt-msg.de/api.php";
    if(devTrigger == 1)
    {
        url = "http://localhost/ojobs/api.php";
    }
    GM_xmlhttpRequest({
        method: "POST",
         url: url,
         data:data,
         headers: {
         "Content-Type": "application/x-www-form-urlencoded"
         },
         onabort: function(response) {
             alert("abort" + response.responseText);
         },
         onerror: function(response) {
             alert("error" + response.responseText);
         },
         ontimeout: function(response) {
             alert("timeout" + response.responseText);
         },
         onload: function(response) {
             if(devAlert == 1)
             {
                 //$("#OJobs_panel").append("<span>" + response.responseText + "</span><br/>\n");
                 alert(response.responseText);
             }
             func(response);
             var json = JSON.parse(response.responseText);
             return json;
         }
        });
}

function OJReadMetas(uni)
{
    if(typeof uni === 'undefined')
    {
        uni = OJgetCurrentUniverse();
    }
   var metas = document.getElementsByTagName('meta'); 
   var result = new Array();
   for (i=0; i<metas.length; i++) { 
       var name = metas[i].getAttribute("name");
      if (name == "ogame-player-id") { 
         result["ogameId_" + uni] = metas[i].getAttribute("content"); 
      }
      else if (name == "ogame-player-name") { 
         result["userName_" + uni] = metas[i].getAttribute("content"); 
      } 
      else if (name == "ogame-alliance-tag") { 
         result["alliance_" + uni] = metas[i].getAttribute("content"); 
      } 
   } 
    result.forEach(function(i) {
        alert("###" + i + "_" + result.getAttribute(i));
    });
   return result;
}

function OJReadConfig()
{
    OJconfig = new Array();
    GM_listValues().forEach(function(val) {
        OJconfig[val] = GM_getValue(val);
    });
    var metas = OJReadMetas();
    for(var m in metas) 
    {
        OJconfig[m] = metas[m];
    }
    OJconfig["uni"] = OJgetCurrentUniverse();
    if(typeof OJconfig["userName_" + OJconfig["uni"]] == 'undefined' && $("#playerName").children("span").html().replace(/\s*/g, "") != undefined)
    {
       OJconfig["userName_" + OJconfig["uni"]] = $("#playerName").children("span").html().replace(/\s*/g, "");
    }
    OJconfig["panelIsOpen_" + OJconfig["uni"]] = "0";
    OJconfig["panelIsOpen_" + OJconfig["uni"]] = "0";
    if(typeof OJconfig["panelIsOpen_" + OJconfig["uni"]] == 'undefined')
    {
        OJconfig["panelIsOpen_" + OJConfig["uni"]] = "0";
    }
    if(typeof OJconfig["allyChatIsOpen_" + OJconfig["uni"]] === 'undefined')
    {
        OJconfig["allyChatIsOpen_" + OJconfig["uni"]] = "0";
    }
    if(typeof OJconfig["allyChat_refresh_" + OJconfig["uni"]] === "undefined")
    {
        OJconfig["allyChat_refresh_" + OJconfig["uni"]] = 10;
        GM_setValue("allyChat_refresh_" + OJconfig["uni"], 10);
    }
    if(typeof OJconfig["allyChat_fontSize_" + OJconfig["uni"]] === "undefined")
    {
        OJconfig["allyChat_fontSize_" + OJconfig["uni"]] = 12;
        GM_setValue("allyChat_fontSize_" + OJconfig["uni"], 12);
    }
}

function OJobsAllyChatSend(message)
{
    var func = function(response) {
        result = JSON.parse(response.responseText);
        if(result.status >= 1)
        {
            $("#OJobs_allyChat_input").val("");
        }
        else
        {
            $("#OJobs_allyChat_input").val(result.message);
        }
    };
    api("allyChat_send", func, "&message=" + message);
}

function OJobsAllyChatGetMessages()
{
    var func = function(response) {
        if(allyChatIsOpen != "1")
        {
           clearTimeout(allyChatTimer);
        }
        else
        {
            result = JSON.parse(response.responseText);
            if(result.status == 1)
            {
                for (var key in result.messages) {
                    var id = result.messages[key].id;
                    var from = result.messages[key].name;
                    var message = result.messages[key].message;
                    var at = result.messages[key].at;
                    $("#OJobs_allyChat_log").append("<span title=\"" + at + "\" class=\"OJobs_allyChat_from\" ><b>" + from + ":</b>&nbsp;</span>" + message + "<br />\n");
                    if(id > lastAllyMsg)
                    {
                        lastAllyMsg = id;
                    }
                }
                if(result.messages.length > 0)
                {
                    $(".OJobs_allyChat_from").css("cursor", "pointer");
                    $("#OJobs_allyChat_log").scrollTop($("#OJobs_allyChat_log")[0].scrollHeight);
                }
            }
            else
            {
                alert(result.message);
            }
            allyChatTimer = setTimeout(function() {OJobsAllyChatGetMessages()}, OJconfig["allyChat_refresh_" + OJconfig["uni"]]*1000);
        }
    };
    api("allyChat_getMessages", func, "&lastMsg=" + lastAllyMsg);
}

function OJCreateContent()
{
    $("#OJobs_panel").append("<div id=\"OJobs_slider\">");
    $("#OJobs_slider").append("<h3>Config</h3><div id=\"OJobs_config\"></div>");
    $("#OJobs_slider").append("<h3>Ally-Chat</h3><div id=\"OJobs_allyChat\"></div>");
    $("#OJobs_slider").slider();
    
    $("#OJobs_config").append("<table><tr><td>" + 
                               "AllyChat-Refresh:&nbsp;</td><td><textarea id=\"OJobs_config_allyChat_refresh\" \" /></textarea>" + 
                               "</td></tr><tr><td>" + 
                               "AllyChat-FontSize:&nbsp;</td><td><textarea id=\"OJobs_config_allyChat_fontSize\" /></textarea>" + 
                               "</td></tr></table>");
    
    $("#OJobs_allyChat").append("<div id=\"OJobs_allyChat_log\"></div>");
    $("#OJobs_allyChat").children(0).css("height", "280px");
    $("#OJobs_allyChat").append("<textarea id=\"OJobs_allyChat_input\" ></textarea>");
    $("#OJobs_allyChat_input").css("width", "70%").css("height", "1em").css("min-height", "1em").css("max-height", "1em");
    $("#OJobs_allyChat").append("<button id=\"OJobs_allyChat_send\">Send</button>");
    
    $("#OJobs_allyChat_log").css("overflow", "auto");
    $("#OJobs_allyChat_log").css("word-wrap", "break-word");
    
    $("#OJobs_allyChat_input").css("margin-left", "3px");
    
    allyChatRate = OJconfig["allyChat_refresh_" + OJconfig["uni"]];
    $("#OJobs_config_allyChat_refresh").val(allyChatRate);
    $("#OJobs_config_allyChat_refresh").change(function(event) {
        if($("#OJobs_config_allyChat_refresh").val() < 3)
        {
            $("#OJobs_config_allyChat_refresh").val("3");
        }
        allyChatRate =  $("#OJobs_config_allyChat_refresh").val();
        OJconfig["allyChat_refresh_" + OJconfig["uni"]] = allyChatRate;
        GM_setValue("allyChat_refresh_" + OJconfig["uni"], allyChatRate);
    }).css("height", "1em").css("min-height", "1em").css("max-height", "1em");
    $("#OJobs_config_allyChat_fontSize").val(OJconfig["allyChat_fontSize_" + OJconfig["uni"]]);
    $("#OJobs_allyChat").css("fontSize", OJconfig["allyChat_fontSize_" + OJconfig["uni"]] + "px");
    $("#OJobs_config_allyChat_fontSize").change(function(event) {
       OJconfig["allyChat_fontSize_" + OJconfig["uni"]] =  $("#OJobs_config_allyChat_fontSize").val();
        GM_setValue("allyChat_fontSize_" + OJconfig["uni"], $("#OJobs_config_allyChat_fontSize").val());
        $("#OJobs_allyChat").css("fontSize", OJconfig["allyChat_fontSize_" + OJconfig["uni"]] + "px");
    }).css("height", "1em").css("min-height", "1em").css("max-height", "1em");
    var OJAllySend = function(event) {
        event.preventDefault();
        if($("#OJobs_allyChat_input").val() != "")
        {
            var result = OJobsAllyChatSend($("#OJobs_allyChat_input").val());
            event.preventDefault();
        }
    };
    $("#OJobs_allyChat_send").click(function(event) {
        OJAllySend(event);
    });
    $("#OJobs_allyChat_input").keydown(function(event) {
        if(event.keyCode == 13)
        {
           OJAllySend(event);
        }
    });
    $("#OJobs_allyChat").prev().click(function(event) {
        allyChatIsOpen = (allyChatIsOpen+1)%2;
        if(allyChatIsOpen == 1)
        {
            OJconfig["allyChatIsOpen_" +"uni"] = "1";
            GM_setValue("allyChatIsOpen_" + OJconfig["uni"], "1");
            OJobsAllyChatGetMessages();
        }
        else
        {
            OJconfig["allyChatIsOpen_" +"uni"] = "0";
            GM_setValue("allyChatIsOpen_" + OJconfig["uni"], "0");
        }
    });
    if(GM_getValue("allyChatIsOpen_" + OJconfig["uni"]) == 1)
    {
        $("#OJobs_allyChat").prev().click();
    }
}

function OJLogout()
{
    var uni = OJgetCurrentUniverse();
    GM_deleteValue("userName_" + uni);
    GM_deleteValue("password_" + uni);
    GM_deleteValue("hashed_" + uni);
    
    delete OJconfig["userName_" + uni];
    delete OJconfig["password_" + uni];
    delete OJconfig["hashed_" + uni];
    
    $("#OJUsernameSpan").remove();
    $("#OJobs_slider").remove();
    $("#OJobs_loginForm").show();
    
    allyChatIsOpen = 0;
    $("#OJobs_allyChat").hide();
}

function OJLogin(force, hidden)
{
    var uni = OJgetCurrentUniverse();
    var name;
    var passHashed;
    var hashed;
    var hashed = 0;
    if(typeof force === 'undefined')
    {
        force = 0;
    }
    if(force != 1 && typeof OJconfig["userName_" + uni] !== 'undefined' && OJconfig["userName_" + uni].length > 0)
    {
        name = OJconfig["userName_" + uni];
    }
    else
    {
        name = $("#OJobs_loginText").val();
    }
    if(force != 1 && typeof OJconfig["hashed_" + uni] !== 'undefined' && OJconfig["hashed_" + uni] == 1 && $("#OJobs_loginPass").val().length < 1)
    {
        passHashed = OJconfig["password_" + uni];
        hashed = 1;
    }
    else
    {
        if(force != 1 && typeof OJconfig["password_" + uni] !== 'undefined' && OJconfig["password_" + uni].length > 0 && $("#OJobs_loginPass").val().length < 1)
        {
            passHashed = OJconfig["password_" + uni];
            hashed = 0;
        }
        else
        {
            passHashed = $("#OJobs_loginPass").val();
        }
    }
    var func = function(response) {
        var result = JSON.parse(response.responseText);
        if(result.status >= 1)
        {
            GM_setValue("userName_" + uni, result.name);
            GM_setValue("password_" + uni, result.passHash);
            GM_setValue("hashed_" + uni, "1");
            OJconfig["userName_" + uni] = result.name;
            OJconfig["password_" + uni] = result.passHash;
            OJconfig["hashed_" + uni] = "1";
            $("#OJobs_loginForm").hide();
            $("#OJobs_loginDiv").first().before("<span id =\"OJUsernameSpan\">Angemeldet:&nbsp;<b>" + result.name + "</b>&nbsp;<i id=\"OJLogout\">Logout<span id=\"OJobs_deleteUserSpan\" style=\"float: right;\">Delete</span><span style=\"clear: right;\"></span></i><br /></span>\n");
            $("#OJLogout").click(function (event) {
                OJLogout();
            }).css("cursor", "pointer");
            $("#OJobs_deleteUserSpan").click(function (event) {
                var ays = prompt("Soll der OJobs-Account wircklich gelöscht weden?(\"YES\")");
               if(ays == "YES")
               {
                  OJDeleteUser(ays);
               }
            }).css("cursor", "pointer");
            OJCreateContent();
        }
        else
        {
            if(typeof hidden === "undefined")
            {
               alert("Falsche Benutzerdaten!");
            }
            else if(hidden != 1)
            {
               alert("Falsche Benutzerdaten!");
            }
            OJLogout();
        }
    };
    var result = api("login", func, "&hashed=" + hashed + "&name=" + name + "&passHash=" + passHashed + "&uni=" + uni);
}

function OJDeleteUser(areYouSure)
{
    var func = function(response) {
        result = JSON.parse(response.responseText);
        if(result.status >= 1)
        {
            alert("Erfolgreich gelöscht!");
        }
        else
        {
            alert("Fehlgeschlagen:\n" + result.message);
        }
    };
    api("deleteUser", func, "&areYouSure=" + areYouSure);
}

function OJRegister()
{
    if(register == 0)
    {
        register = $("#OJobs_loginPass").val();
        alert("Bitte das Passwort im selben Feld wiederholen.");
    }
    else
    {
        if(register == $("#OJobs_loginPass").val())
        {
            var passHash = $("#OJobs_loginPass").val();
            var func = function(response) {
                result = JSON.parse(response.responseText);
                if(result.status >= 1)
                {
                    OJconfig["hashed_" + OJconfig["uni"]] = "0";
                    OJconfig["password_" + OJconfig["uni"]] = passHash;
                    OJLogin(0,1);
                }
                else
                {
                    alert("Anmeldung Fehlgeschlagen:\n" + result.message);
                }
            };
            api("register", func, "&hashed=0&name=" + OJconfig["userName_" + OJconfig["uni"]] + "&passHash=" + passHash + "&uni=" + OJconfig["uni"]);
            register = 0;
        }
        else
        {
            alert("Die Passwörter stimmen nicht überein.");
            register = 0;
        }
    }
    $("#OJobs_loginPass").val("");
}

function OJcreateMenu(hidden, event, hidden)
{
    var uni = OJgetCurrentUniverse();
    $("#box").append("<div id=\"OJobs_panel\"></div>");
    $("#OJobs_panel").css("position", "absolute");
    $("#OJobs_panel").width("300px");
    
    $("#OJobs_panel").css("z-index", "3001").css("right", "-158px").css("height", "auto").css("min-height", "300px").css("background-color", "#192026");
    
    //$("#OJobs_panel").css("margin-left", "133px");
    $("#OJobs_panel").css("padding-top", "20px").css("padding-left", "5px").css("padding-right", "5px").css("padding-bottom", "20px");
    
    $("#OJobs_panel").append("<div id=\"OJobs_loginDiv\"></div>");
    //$("#OJobs_loginDiv").append("<form id=\"OJobs_loginForm\"><input type=\"text\" id=\"OJobs_loginText\" tabindex=\"\" disabled=\"disabled\" value=\"" + OJconfig["userName_" + uni] + "\"/>" +
    $("#OJobs_loginDiv").append("<form id=\"OJobs_loginForm\"><input type=\"text\" id=\"OJobs_loginText\" tabindex=\"\" value=\"" + OJconfig["userName_" + uni] + "\"/>" +
                                 "<button id=\"OJobs_registerButton\" tabindex=\"3\" >Register</button><br />" +
                                 "<input type=\"password\" id=\"OJobs_loginPass\" tabindex=\"1\" />" +
                                 "<button id=\"OJobs_loginButton\" tabindex=\"2\">Login</button></form>");
    $("#OJobs_panel").append("<div id=\"OJobs_header\">Status: <b>BETA</b></div>");
    $("#OJobs_panel").append("<div id=\"OJobs_footer\">&nbsp;</div>");
    $("#OJobs_loginForm").submit(function(event){
        event.preventDefault();
    });
    $("#OJobs_loginButton").click(function (event) {
        OJLogin(1);
        $("#OJobsloginPass").val("");
        event.preventDefault();
    });
    $("#OJobs_loginPass").keydown(function(event)
                                   {
                                       if(event.keyCode == 13)
                                       {
                                           event.preventDefault();
                                       }
                                   });
    $("#OJobs_footer").css("bottom", "0px").css("width", "100%").css("position", "absolute").css("left", "0px").css("background-color", "#222329");
    $("#OJobs_header").css("top", "0px").css("width", "100%").css("position", "absolute").css("left", "0px").css("background-color", "#222329");
    $("#OJobs_header").css("cursor", "move");
    if(typeof OJconfig["userName_" + OJconfig["uni"]] !== 'undefined' && OJconfig["userName_" + OJconfig["uni"]].length > 0)
    {
        $("#OJobs_loginText").val(OJconfig["userName_" + OJconfig["uni"]]);
        if(OJconfig["hashed_" + OJconfig["uni"]] == 1)
        {
            if(typeof hidden === undefined)
            {
               OJLogin(0, 0);
            }
            {
               OJLogin(0, hidden);
            }
        }
    }
    $("#OJobs_registerButton").click(function (event) {
        OJRegister();
        event.preventDefault();
    });
    
    var offLeft = GM_getValue("offsetLeft_" + OJconfig["uni"]);
    var offTop = GM_getValue("offsetTop_" + OJconfig["uni"]);
    if(offLeft != '0')
    {
            $("#OJobs_panel").offset({
                top: offTop,
                left: offLeft
            });
    }
    $( document ).on("mousemove", function(e) {
        if (mouseDragging == 1) {
            $("#OJobs_panel").offset({
                top: e.pageY-10,
                left: e.pageX-100
            });
        }
    });
    $("#OJobs_header").mousedown(function(event) {
        mouseDragging = 1;
    });
    $("#OJobs_header").on("mouseup", function(event) {
        mouseDragging = 0;
        GM_setValue("offsetTop_" + OJconfig["uni"], $("#OJobs_panel").offset().top);
        GM_setValue("offsetLeft_" + OJconfig["uni"], $("#OJobs_panel").offset().left);
    });
    
}

function OJdisplayMenu(hidden, event)
{
    if($("#OJobs_panel").exists() )
    {
        if($("#OJobs_panel").is(":visible"))
        {
            $("#OJobs_panel").hide();
            OJconfig["panelIsOpen_" + OJconfig["uni"]] = 0;
            GM_setValue("panelIsOpen_" + OJconfig["uni"], 0);
        }
        else
        {
            $("#OJobs_panel").show();
            OJconfig["panelIsOpen_" + OJconfig["uni"]] = 1;
            GM_setValue("panelIsOpen_" + OJconfig["uni"], 1);
        }
    }
    else
    {
        if(hidden == 1 && GM_getValue("panelIsOpen_" + OJconfig["uni"]) == 1)
        {
            OJconfig["panelIsOpen_" + OJconfig["uni"]] = 1;
            GM_setValue("panelIsOpen_" + OJconfig["uni"], 1);
            OJcreateMenu(1, null, hidden);
        }
        else
        {
            if(hidden == 0)
            {
                OJcreateMenu(0, event);
                OJconfig["panelIsOpen_" + OJconfig["uni"]] = 1;
                GM_setValue("panelIsOpen_" + OJconfig["uni"], 1);
            }
        }
    }
    if($("#OJobs_panel").exists())
    {
        GM_setValue("allyChatIsOpen_" + OJconfig["uni"], OJconfig["allyChatIsOpen_" + OJconfig["uni"]]);
    }
}

$( document ).ready(function() {
    OJReadConfig();
    var i = 0;
    var list = $("#bar").children("ul");
    var html = "<li><a href='#' id='OJobs_tb'>OChat</a></li>";
    list.append(html);
    $("#OJobs_tb").click(function(event) {
        OJdisplayMenu(0, event);
    });
    if(GM_getValue("panelIsOpen_" + OJconfig["uni"]) == "1")
    {
        OJdisplayMenu(1);
    }
    if(window.location.match(".*page=recources.*"))
    {
        //var <tr class=\"\">\n\n    <td valign=\"top\">\n        <span class=\"energyManagerIcon crystal\"></span>\n    </td>\n    <td class=\"label\"></td>\n    <td align=\"right\"></td>\n\n</tr>\n<tr class=\"alt\">\n\n    <td valign=\"top\"></td>\n    <td class=\"label\"></td>\n    <td align=\"right\"></td>\n\n</tr>\n
    }
});