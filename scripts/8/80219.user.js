// ==UserScript==
// @name           Bungie Webcam Watcher
// @author         Greg J. Brown
// @version        1.3
// @namespace      http://www.bungie.net/
// @description    Displays webcams in the bungie.net forums. Version 1.3
// @include        http://*bungie.net/Forums/posts.aspx*
// @include        http://*bungie.net/Forums/topics.aspx*
// @include        http://*bungie.net/fanclub/*Forums/posts.aspx*
// @include        http://*bungie.net/fanclub/*Forums/topics.aspx*
// @include        http://*bungie.net/settings/*
// ==/UserScript==

var url = document.location.toString();
if (url.match("http://.*bungie.net/settings*."))
{
    //loadWebcamWatcherSettings();
    var S = queryString("settings");
    (S != false && S == "BWW") ? loadWebcamWatcherSettings() : false;
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
        h = GM_getValue("BWWDefaultSizeHeight", "218px");
        visHeight = GM_getValue("BWWDefaultSizeHeight", "218px");
    }
    else if (GM_getValue("webcamV", "block") == "none")
    {
        v = "hidden";
        d = "none";
        h = "40px";
    }
    webcamWatcherDiv.id = "webcamWatcher";
    webcamWatcherDiv.setAttribute("style", "position: fixed; " + GM_getValue("locationY", "top") + ": 5px; " + GM_getValue("locationX", "left") + ": 5px; visibility: visible; display: block; border: solid 1px white; height: " + h + "; width: " + GM_getValue("BWWDefaultSizeWidth", "240px") + "; z-index: 100;"); // 280px, 320px
    webcamWatcherDiv.innerHTML = "<div class='boxA' style='background-repeat: repeat-x; width: 99%; margin-top: 0px;'>" +
                                 "    <ul>" +
                                 "        <li>" +
                                 "            <h3>Webcam Watcher<span style='float: right; top: 3px; position: absolute; right: 5px;'><a id='BWWSizeUp' href='#'>[+]</a> <a id='BWWSizeDown' href='#'>[-]</a> <a id='BWWSizeStart' href='#'>[o]</a> <a id='BWWSizeSave' href='#'>[s]</a></span></h3> " +
                                 "        </li>" +
                                 "        <li>" +
                                 "            <h4><a href='http://www.bungie.net/settings/?settings=bww&previousPage=" + document.location + "'>Settings</a> - <a id='BWWToggleWebcamSelect' href='#'>Webcam</a></h4><a id='BWWWebcamToggleDisplay' href='#' style='float: right; position: absolute; right: 5px; top: 17px;'>[\u2191]</a>" +
                                 "        </li>" +
                                 "    </ul>" +
                                 "    <select id='BWWWebcamSelect' style='position: absolute; top: 38px; right: 1px; background-color: #012942; border: 1px solid #404040; color: #FFFFFF; visibility: hidden;'><option id='W0' value='0'>Camera 1</option><option id='W1' value='1'>Path Of Doom</option><option id='W2' value='2'>Really Random Camera</option></select>" +
                                 "    <center><img id='BWWCamera' src='http://www.bungie.net/Inside/Webcam.ashx?camera=" + GM_getValue("webcam", 1) + "' style='width: 100%; height: 100%; visibilty: " + v + "; display: " + d + ";'/><center>" +
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
        visHeight = GM_getValue("BWWDefaultSizeHeight", "218px");
    }
    else if (GM_getValue("webcamV", "block") == "block")
    {
        visHeight = GM_getValue("BWWDefaultSizeHeight", "218px");
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
        webcamWatcherDiv.style.height = GM_getValue("BWWDefaultSizeHeight", "218px");
        webcamWatcherDiv.style.width = GM_getValue("BWWDefaultSizeWidth","240px");
        visHeight = GM_getValue("BWWDefaultSizeHeight", "218px");
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
        $("BWWWebcamToggleDisplay").innerHTML = ($("BWWWebcamToggleDisplay").innerHTML == "[\u2191]" ? "[\u2193]" : "[\u2191]");
        $("BWWSizeUp").innerHTML = ($("BWWSizeUp").innerHTML == "[+]" ? "" : "[+]");
        $("BWWSizeDown").innerHTML = ($("BWWSizeDown").innerHTML == "[-]" ? "" : "[-]");
        $("BWWSizeStart").innerHTML = ($("BWWSizeStart").innerHTML == "[o]" ? "" : "[o]");
        $("BWWSizeSave").innerHTML = ($("BWWSizeSave").innerHTML == "[s]" ? "" : "[s]");
        $("BWWCamera").style.display = ($("BWWCamera").style.display == "block" ? "none" : "block");
        webcamWatcherDiv.style.height = (webcamWatcherDiv.style.height == "40px" ? visHeight : "40px");
        GM_setValue("webcamV", $("BWWCamera").style.display);
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
                                     '<tbody>' +
                                         '<tr>' +
                                             '<td style="width: 25%;">Location X:</td>' +
                                             '<td style="width: 50%;">' +
                                                 '<select style="width: 100%;" id="select1" size="1">' +
                                                     '<option id="XLeft" value="Left">Left</option>' +
                                                     '<option id="XRight" value="Right">Right</option>' +
                                                 '</select>' +
                                             '</td>' +
                                         '</tr>' +
                                         '<tr>' +
                                             '<td style="width: 25%;">Location Y:</td>' +
                                             '<td style="width: 50%;">' +
                                                 '<select style="width: 100%;" id="select2" size="1">' +
                                                     '<option id="YTop" value="Top">Top</option>' +
                                                     '<option id="YBottom" value="Bottom">Bottom</option>' +
                                                 '</select>' +
                                             '</td>' +
                                         '</tr>' +
                                         '<tr>' +
                                             '<td style="width: 25%;">Webcam:</td>' +
                                             '<td style="width: 50%;">' +
                                                 '<select style="width: 100%;" id="select3" size="1">' +
                                                     '<option id="W0" value="0">Camera 1</option>' +
                                                     '<option id="W1" value="1">Path Of Doom</option>' +
                                                     '<option id="W2" value="2">Really Random Camera</option>' +
                                                 '</select>' +
                                             '</td>' +
                                         '</tr>' +
                                     '</tbody>' +
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
    
    $("X" + GM_getValue("locationX", "Left")).defaultSelected = true;
    $("Y" + GM_getValue("locationY", "Top")).defaultSelected = true;
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