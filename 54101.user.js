// ==UserScript==
// @name           Custom Bungie.net Quick Group Links (ONI Ghost)
// @author         Sy
// @contributor         Robby118 - Gave me the idea... (Robby's idea originally)
// @contributor         Luke35120 - Showed me how to do the drop box
// @version        Custom for ONI Ghost
// @namespace      http://www.bungie.net/
// @description    This script displays your groups in a dropdownbox, less messy :P
// @include        http://*bungie.net/*
// Ohai! i assume your here to edit mah script?
// ==/UserScript==


var url = document.location.toString();
if (url.match("http://.*bungie.net/settings*."))
{
    loadWebcamWatcherSettings();
}
else
{
    loadWebcamWatcher();
}

function loadWebcamWatcher()
{
    var webcamWatcherDiv = document.createElement("div");
    var temp = "";
    var v;
    var d;
    var h;
    var visHeight;
    
    if (GM_getValue("webcamV", "block") == "block")
    {
        v = "visible";
        d = "block";
        h = GM_getValue("BWWDefaultSizeHeight", "68px");
        visHeight = GM_getValue("BWWDefaultSizeHeight", "40px");
    }
    else if (GM_getValue("webcamV", "block") == "none")
    {
        v = "hidden";
        d = "none";
        h = "10px";
    }
    webcamWatcherDiv.id = "webcamWatcher";
    webcamWatcherDiv.setAttribute("style", "position: fixed; " + GM_getValue("locationY", "bottom") + ": 100px; " + GM_getValue("locationX", "right") 

+ ": 5px; visibility: visible; display: block; border: solid 1px white; height: " + h + "; width: " + GM_getValue("BWWDefaultSizeWidth", "170px") + 

"; z-index: 100;"); // 280px, 320px
    webcamWatcherDiv.innerHTML = "<div class='boxA' style='background-repeat: repeat-x; width: 99%; margin-top: 0px;'>" +
                                 "    <ul>" +
                                 "        <li>" +
                                 "            <h3>GROUP<span style='float: right; top: 2px; position: absolute; right: 5px;'></span></h3> " +
                                 "        <li>" +
                                 "            <h4><a href='http://www.bungie.net/Account/Profile.aspx?page=Chapters'>My Groups</a></h4>" +
                                 "        </li><div align='center'><select name='Grouplinks' id='Grouplinks2' onchange='window.location = this.value;' size='1'><option value='http://www.bungie.net'>List of Groups</option><option value=''>-----</option><option value=''>Fav Groups</option><option value=''>-----</option><option value='http://www.bungie.net/fanclub/308401/Forums/topics.aspx?forumID=315076'>CDB</option><option value='http://www.bungie.net/Fanclub/224201/Forums/topics.aspx?forumID=230640'>FV2</option><option value='http://www.bungie.net/fanclub/281877/Forums/topics.aspx?forumID=288461'>RHO</option><option value='http://www.bungie.net/fanclub/145210/Forums/topics.aspx?forumID=151205'>OTK</option><option value='http://www.bungie.net/fanclub/38923/Forums/topics.aspx?forumID=41411'>TBC</option><option value='http://www.bungie.net/fanclub/191711/Forums/topics.aspx?forumID=197898'>SIP</option><option value='http://www.bungie.net/fanclub/281417/Forums/topics.aspx?forumID=288001'>TSM</option><option value='http://www.bungie.net/fanclub/309340/Forums/topics.aspx?forumID=316015'>L45</option><option value=''-----</option><option value=''>Other Groups</option><option value=''>-----</option><option value='http://www.bungie.net/fanclub/aoa/Group/GroupHome.aspx'>USA AOA</option><option value='http://www.bungie.net/fanclub/spamzorz/Group/GroupHome.aspx'>Spam R Us</option><option value='http://www.bungie.net/fanclub/coup/Group/GroupHome.aspx'>Coup d' Bungie</option></select>" +
                                 "        </li>" +

                                 "    </ul>" +

                                 "</div>";
    $("aspnetForm").parentNode.insertBefore(webcamWatcherDiv, $("aspnetForm"));
    $("W" + GM_getValue("webcam", 1)).defaultSelected = true;
    if (GM_getValue("webcamV", "block") == "none")
    {
        $("BWWSizeUp").innerHTML = "";
        $("BWWSizeDown").innerHTML = "";
        $("BWWSizeStart").innerHTML = "";
        $("BWWSizeSave").innerHTML = "";
        $("BWWWebcamToggleDisplay").innerHTML = "[\u2193]";
        visHeight = GM_getValue("BWWDefaultSizeHeight", "40px");
    }
    else if (GM_getValue("webcamV", "block") == "block")
    {
        visHeight = GM_getValue("BWWDefaultSizeHeight", "40px");
    }
    $("BWWSizeUp").addEventListener("click", function()
    {
        var heightFinal = parseInt(webcamWatcherDiv.style.height.substring(webcamWatcherDiv.style.height.indexOf("p"), 0)) + 162;
        var widthFinal = parseInt(webcamWatcherDiv.style.width.substring(webcamWatcherDiv.style.width.indexOf("p"), 0)) + 216;
        visHeight = heightFinal + "px";
        webcamWatcherDiv.style.height = visHeight;
        webcamWatcherDiv.style.width = widthFinal + "px";
    }, true);
    $("BWWSizeDown").addEventListener("click", function()
    {
        var heightFinal = parseInt(webcamWatcherDiv.style.height.substring(webcamWatcherDiv.style.height.indexOf("p"), 0)) - 162/3 ;
        var widthFinal = parseInt(webcamWatcherDiv.style.width.substring(webcamWatcherDiv.style.width.indexOf("p"), 0)) - 216/3;
        visHeight = heightFinal + "px";
        webcamWatcherDiv.style.height = visHeight;
        webcamWatcherDiv.style.width = widthFinal + "px";
    }, true);
    $("BWWSizeStart").addEventListener("click", function()
    {
        webcamWatcherDiv.style.height = GM_getValue("BWWDefaultSizeHeight", "40px");
        webcamWatcherDiv.style.width = GM_getValue("BWWDefaultSizeWidth","40px");
        visHeight = GM_getValue("BWWDefaultSizeHeight", "40px");
    }, true);
    $("BWWSizeSave").addEventListener("click", function()
    {
        alert("Default Starting Size Saved!");
        GM_setValue("BWWDefaultSizeWidth", webcamWatcherDiv.style.width);
        GM_setValue("BWWDefaultSizeHeight", webcamWatcherDiv.style.height);
    }, true);
    $("BWWToggleWebcamSelect").addEventListener("click", function()
    {
        var WS = $("BWWWebcamSelect");
        WS.style.visibility = (WS.style.visibility == "visible" ? "hidden" : "visible");
        
    }, true);
    $("BWWWebcamSelect").addEventListener("change", function()
    {
        GM_setValue("webcam", $("BWWWebcamSelect").options[$("BWWWebcamSelect").selectedIndex].value);
        $("BWWCamera").src = "http://www.bungie.net/Inside/Webcam.ashx?camera=" + GM_getValue("webcam", 1);
    }, true);
    $("BWWWebcamToggleDisplay").addEventListener("click", function()
    {
    }, true);
}

function loadWebcamWatcherSettings()
{
    var p = queryString("previousPage");
    var settingsHeader = $tag("h2")[4];
    var settingsBody = $class("newsblurb");
    var settingsFooter = $class("arrow1");
    document.title = "Bungie Webcam Watcher Settings";
    settingsHeader.innerHTML = "Bungie Webcam Watcher Settings";
    settingsBody.innerHTML = '<fieldset style="width: 275px;">' +
                                 '<legend>Display Settings</legend>' +
                                 '<table style="width: 100%;">' +

                                 '</table>' +
                             '</fieldset>' +
                             '<br/>' +
                             '<a id="saveChanges" href="' + p + '">Save Changes</a>';
    $("saveChanges").addEventListener("click", function()
    {
        GM_setValue("locationX", $("select1").options[$("select1").selectedIndex].value);
        GM_setValue("locationY", $("select2").options[$("select2").selectedIndex].value);
        GM_setValue("webcam", $("select3").options[$("select3").selectedIndex].value);
        //document.location.reload(true);
    }, true);
    
    $("X" + GM_getValue("locationX", "Right")).defaultSelected = true;
    $("Y" + GM_getValue("locationY", "Bottom")).defaultSelected = true;
    $("W" + GM_getValue("webcam", 1)).defaultSelected = true;
    
    settingsFooter.innerHTML += "<li>" +
                                "    <a href='" + p + "'>Return to Previous Page</a>" +
                                "</li>";
}

function $(id)
{
    return document.getElementById(id);
}

function $tag(tag)
{
    return document.getElementsByTagName(tag);
}

function $class(_class)
{
    var elements = $tag("*");
    var returnElements = [];
    var j = 0;
    for (var i = 0; i < elements.length; i++)
    {
        if (elements[i].className == _class)
        {
            returnElements[j] = elements[i];
            j++;
        }
    }
    if (returnElements.length == 1)
    {
        return returnElements[0];
    }
    return returnElements;
}

function queryString(parameter) { 
  var loc = location.search.substring(1, location.search.length);
  var param_value = false;

  var params = loc.split("&");
  for (i=0; i<params.length;i++) {
      param_name = params[i].substring(0,params[i].indexOf('='));
      if (param_name == parameter) {
          param_value = params[i].substring(params[i].indexOf('=')+1)
      }
  }
  if (param_value) {
      return param_value;
  }
  else {
      return "";
  }
}