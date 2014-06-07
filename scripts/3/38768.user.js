{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Coup D' Bungie\par
// @namespace      http://www.example.com/\par
// @description    Nondesript\par
// @include        http://*bungie.net/Forums/posts.aspx*\par
// @include        http://*bungie.net/fanclub/*Forums/posts.aspx*\par
// ==/UserScript==\par
\par
\par
// Created By: ADDIsBetter, This is an ediit of CAVX's Coup D' Bungie!\par
//Extenders\par
Array.prototype.contains = function(uda_Element)\par
\{\par
    for (var udv_I = 0; udv_I < this.length; udv_I++)\par
    \{\par
        if (this[udv_I] === uda_Element)\par
        \{\par
            return true;\par
        \}\par
    \}\par
    return false;\par
\};\par
\par
var udv_PosterIdArray = [];\par
var udv_PostElementArray = [];\par
var udv_UserAvatarElementArray = [];\par
var udv_DebugAlertCurrent = 1;\par
var udv_DisplayTitleBarImages = false;\par
var udv_UserData = [\par
    // [0]UserName, [1]UserTitle, [2]UserTitleColor, [3]UserBarImage, [4]UserBarBackgroundColor, [5]UserBarBorderColor, [6]UserPostColor, [7]UserAvatarImage, [8] OPTIONAL UserAvatarImageHeight\par
\tab ["ADDIsBetter", "Group God", "#FFFFF", "", "#000000", "#FFFFFF", "#83B164", ""],\par
\tab ["ADHDIsBetter", "Group God", "#FFFFF", "", "#000000", "#FFFFFF", "#83B164", ""],\par
\tab ["Four Shot Fiend", "Administrator", "#FFFFF", "", "#000000", "#FFFFFF", "#83B164", ""],\par
\tab ["ADHD Is Amazing", "Administrator", "#FFFFF", "", "#000000", "#FFFFFF", "#83B164", ""]\par
        // [0]UserName, [1]UserTitle, [2]UserTitleColor, [3]UserBarImage, [4]UserBarBackgroundColor, [5]UserBarBorderColor, [6]UserPostColor, [7]UserAvatarImage, OPTIONAL [8]UserAvatarImageHeight\par
];\par
\par
\par
// User Defined Functions\par
function getCookie(uda_Name)\par
\{\par
\tab var results = document.cookie.match(uda_Name + '=(.*?)(;|$)');\par
\tab if (results)\par
\tab\tab return (unescape(results[1]));\par
\tab else\par
\tab\tab return null;\par
\}\par
\par
function udf_Initialize()\par
\{\par
    // Begin [Fix "Topic Not Found"]\par
    if (document.getElementById("ctl00_mainContent_postRepeater1_ctl00_ctl00_noRecords"))\par
    \{\par
        var pageNumber = queryString("postRepeater1-p");\par
        var pageNumberFix = pageNumber - 1;\par
        var loc = window.location.toString();\par
        window.location = loc.replace(pageNumber,pageNumberFix);\par
    \}\par
    // End\par
    var udv_Debug = false;\par
    var udv_Style = document.createElement("style");\par
    udv_Style.type = "text/css";\par
    var udv_Script = document.createElement("script");\par
    udv_Script.language = "javascript";\par
    udv_Script.type = "text/javascript";\par
\tab udv_Script.innerHTML = "function udf_ToggleUserStyle(box, id) \{" +\par
\tab                            "var found = false; var i = 0;" +\par
\tab                            "var oldCookie = String(getCookie('scriptBlockList'));" +\par
\tab                            "if (oldCookie == 'null') \{" +\par
\tab\tab                            "oldCookie = '';" +\par
\tab                            "\};" +\par
\tab                            "var newCookie = oldCookie.split(',');" +\par
\par
\tab                            "for (i = 0; i < newCookie.length; i++) \{" +\par
\tab\tab                            "if (id == newCookie[i]) \{" +\par
\tab\tab\tab                            "found = true;" +\par
\tab\tab\tab                            "i = newCookie.length;" +\par
\tab\tab                            "\};" +\par
\tab                            "\};" +\par
\par
\tab                            "var exdate = new Date();" +\par
\tab                            "exdate.setDate(exdate.getDate() + 100);" +\par
\par
\tab                            "if (box.checked) \{" +\par
\tab\tab                            "if (!found) \{" +\par
\tab\tab\tab                            "newCookie.push(id);" +\par
\tab\tab\tab                            "setCookieWithExpires('scriptBlockList', newCookie, exdate);" +\par
\tab\tab                            "\};" +\par
\tab                            "\} else \{" +\par
\tab\tab                            "arrStart = newCookie.slice(0,i-1);" +\par
\tab\tab                            "arrFin = newCookie.slice(i,newCookie.length);" +\par
\tab\tab                            "newCookie = arrStart.concat(arrFin);" +\par
\tab\tab                            "setCookieWithExpires('scriptBlockList', newCookie, exdate);" +\par
\tab                            "\}" +\par
\tab                        "\}";\par
\tab document.getElementById("ctl00_Head1").appendChild(udv_Script);\par
    var udv_UserParseArray = [];\par
    var udv_DashboardAvatar = document.getElementById("ctl00_dashboardNav_dashboardAvatar");\par
    var udv_ProfileAvatar = document.getElementById("ctl00_mainContent_imgSelectedAvatar");\par
    for (var udv_J = 0; udv_J < udv_UserData.length; udv_J++)\par
    \{\par
        if (udv_DashboardAvatar && udv_UserData[udv_J][7])\par
        \{\par
            udv_DashboardAvatar.src = udv_UserData[udv_J][7];\par
        \}\par
    \}\par
    for (var udv_I = 1; udv_I < 26; udv_I++)\par
    \{\par
        var udv_PostData_UserId;\par
        var udv_PostData_UserIdParsed;\par
        var udv_PostData_UserIdElement;\par
        var udv_PostData_UserBarElement;\par
        var udv_PostData_UserInfoElement;\par
        var udv_PostData_UserPostElement;\par
        var udv_PostData_UserTitleElement;\par
        var udv_PostData_UserAvatarElement;\par
        var udv_PostData_UserGamertagElement;\par
        var udv_PostElement = "";\par
        var udv_PosterId = "";\par
        var udv_PostId = "";\par
        if (udv_I.toString().length == 1) \{ udv_PostId = "0" + udv_I; \}\par
        else \{ udv_PostId = udv_I; \}\par
        if (udv_PostData_UserIdElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_usernameLink"))\par
        \{\par
            udv_PostElementArray[udv_I - 1] = udv_PostData_UserIdElement;\par
            udv_PostData_UserId = udv_PostData_UserIdElement.innerHTML;\par
            udv_PosterIdArray[udv_I - 1] = udv_PostData_UserId;\par
            udv_PostData_UserBarElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_author_header");\par
            udv_PostData_UserInfoElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_userDiv");\par
            udv_PostData_UserPostElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_PostBlock");\par
            udv_PostData_UserTitleElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_UserTitleBlock");\par
            udv_PostData_UserAvatarElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_userAvatar");\par
\par
            // Begin [Insert "Extra Info"] - Idea By Assassin073\par
            if (udv_PostData_UserGamertagElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_gamertagLinkFloat"))\par
            \{\par
                var udv_GamertagName = udv_PostData_UserGamertagElement.innerHTML;\par
                if (udv_GamertagName != "[none]")\par
                \{\par
                    var udv_GamertagName = udv_PostData_UserGamertagElement.innerHTML;\par
                    udv_PostData_UserInfoElement.childNodes[1].innerHTML += "<li>" +\par
                                                                                "extra info: " + "<a href='http://www.bungie.net/Stats/Halo3/Default.aspx?player=" + udv_GamertagName + "'>Service Record</a> | <a href='http://www.bungie.net/stats/PlayerStatsHalo3.aspx?player=" + udv_GamertagName + "'>Career Stats</a> | <a href='http://www.bungie.net/stats/Halo3/FileShare.aspx?gamertag=" + udv_GamertagName + "'>File Share</a> | <a href='http://www.bungie.net/stats/PlayerStatsHalo3.aspx?player=" + udv_GamertagName + "'>Game History</a>" +\par
                                                                            "</li>";\par
                \}\par
            \}\par
            // End\par
\par
        \}\par
        \par
        \par
        \par
        for (var udv_J = 0; udv_J < udv_UserData.length; udv_J++)\par
        \{\par
            if (udv_PostData_UserId == udv_UserData[udv_J][0] && document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_usernameLink"))\par
            \{\par
                if (udv_Debug == true) \{ alert("User Settings Match: " + udv_PostData_UserId + "\\r\\nElement Title: " + udv_PostData_UserTitleElement.id + "\\r\\nUser Bar: " + udv_PostData_UserBarElement.id + "\\r\\nPost ID: " + udv_PostId); \}\par
                udv_PostData_UserTitleElement.innerHTML = udv_UserData[udv_J][1];\par
                udv_PostData_UserIdParsed = udv_PostData_UserId.replace(/ /g, "__");\par
                udv_PostData_UserTitleElement.id = udv_PostData_UserIdParsed + "_UserTitleBlock";\par
                udv_PostData_UserBarElement.id = udv_PostData_UserIdParsed + "_author_header";\par
                udv_PostData_UserPostElement.id = udv_PostData_UserIdParsed + "_PostBlock";\par
                \par
                // Begin [Insert "Disable User Style" Check Box]\par
                var udv_Checked = "";\par
                var udv_DisabledStyleArray = getCookie("scriptBlockList");\par
                if (udv_DisabledStyleArray != null)\par
                \{\par
                    if (udv_DisabledStyleArray.contains(udv_PostData_UserIdParsed) == true) \{ udv_Checked = "checked='checked'"; \}\par
                    else \{ udv_Checked = ""; \}\par
                \}\par
                udv_PostData_UserInfoElement.childNodes[3].innerHTML += "<li>" +\par
                                                                            "<input id='UserStyleCheckBox_" + udv_PostData_UserIdParsed + "' type='checkbox' onchange='udf_ToggleUserStyle(this, \\"" + udv_PostData_UserIdParsed + "\\");' " + udv_Checked + " />" +\par
                                                                            "<label style='position: absolute; margin-top: 3px;' for='UserStyleCheckBox_" + udv_PostData_UserIdParsed + "'>Disable User Style</label>" +\par
                                                                        "</li>";\par
                // End\par
                \par
                \par
                \par
                if (udv_UserData[udv_J][7] != "")\par
                \{\par
                    udv_PostData_UserAvatarElement.src = udv_UserData[udv_J][7];\par
                    if (udv_UserData[udv_J][8])\par
                    \{\par
                        udv_PostData_UserAvatarElement.height = udv_UserData[udv_J][8];\par
                    \}\par
                    udv_UserAvatarElementArray[udv_I - 1] = udv_PostData_UserAvatarElement;\par
                \}\par
                if (udv_UserParseArray.contains(udv_UserData[udv_J][0]) == false)\par
                \{\par
                    var Temp = "background: url(" + udv_UserData[udv_J][3] + ") !important;";\par
                    if (udv_DisplayTitleBarImages == false)\par
                    \{\par
                        Temp = "";\par
                    \}\par
                    udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_UserTitleBlock \{ color: " + udv_UserData[udv_J][2] + " ! important; \}\\r\\n";\par
                    udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_author_header \{ " + Temp + " background-color: " + udv_UserData[udv_J][4] + " ! important; border: solid 1px " + udv_UserData[udv_J][5] + " ! important; \}\\r\\n";\par
                    udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_PostBlock \{ color: " + udv_UserData[udv_J][6] + " ! important; \}\\r\\n";\par
                    udv_UserParseArray[udv_J] = udv_PostData_UserId;\par
                \}\par
            \}\par
        \}\par
    \}\par
    document.getElementById("ctl00_Head1").appendChild(udv_Style);\par
\}\par
\par
function IDA() //Insert Debug Alert\par
\{\par
    if (arguments[0])\par
    \{\par
        alert(udv_DebugAlertCurrent + " - C: " + arguments[0]);\par
    \}\par
    else\par
    \{\par
        alert(udv_DebugAlertCurrent);\par
    \}\par
    udv_DebugAlertCurrent++;\par
\}\par
\par
function queryString(parameter)\par
\{ \par
  var loc = location.search.substring(1, location.search.length);\par
  var param_value = false;\par
\par
  var params = loc.split("&");\par
  for (i=0; i<params.length;i++) \{\par
      param_name = params[i].substring(0,params[i].indexOf('='));\par
      if (param_name == parameter) \{\par
          param_value = params[i].substring(params[i].indexOf('=')+1)\par
      \}\par
  \}\par
  if (param_value) \{\par
      return param_value;\par
  \}\par
  else \{\par
      return "";\par
  \}\par
\}\par
\par
udf_Initialize();\par
}
