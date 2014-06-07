// ==UserScript==
// @name           Bungie.net Quick Group Links
// @author         Sy
// @contributor         Robby118 - Gave me the idea... (Robby's idea originally)
// @contributor         Luke35120 - Showed me how to do the drop box
// @version        "\(O.o)/"
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
        h = GM_getValue("BWWDefaultSizeHeight", "40px");
        visHeight = GM_getValue("BWWDefaultSizeHeight", "40px");
    }
    else if (GM_getValue("webcamV", "block") == "none")
    {
        v = "hidden";
        d = "none";
        h = "35px";
    }
    webcamWatcherDiv.id = "";
    webcamWatcherDiv.setAttribute("style", "position: fixed; " + GM_getValue("locationY", "bottom") + ": 5px; " + GM_getValue("locationX", "right") 

+ ": 185px; visibility: visible; display: block; border: solid 1px white; height: " + h + "; width: " + GM_getValue("BWWDefaultSizeWidth", "170px") + 

"; z-index: 100;"); // 280px, 320px
    webcamWatcherDiv.innerHTML = "<div class='boxA' style='background-repeat: repeat-x; width: 99%; margin-top: 0px; margin-left: 0px;; width: 99%;'>" +
                                 "    <ul>" +
                                 "        <li>" +

                                 "        <li>" +
                                 "            <h5><left><a href='http://www.bungie.net/Account/Profile.aspx?page=Chapters'>My Groups</a></left></h5>" +
                                 "        </li><div align='left'><select name='Grouplinks' id='Grouplinks2' onchange='window.location = this.value;' size='1'><option value='http://www.bungie.net'>My Groups</option><option value=''>-----</option><option value='http://admin.bungie.net/fanclub/atlas/Group/GroupHome.aspx'>Atlas</option><option value='http://admin.bungie.net/fanclub/180229/Forums/topics.aspx?forumID=186375'>AvatarArt</option><option value='http://admin.bungie.net/fanclub/44685/Forums/topics.aspx?forumID=48005'>Brothers in Christ</option><option value='http://admin.bungie.net/fanclub/283784/Forums/topics.aspx?forumID=290370'>BUNGLE</option><option value='http://admin.bungie.net/fanclub/118020/Forums/topics.aspx?forumID=123992'>CompoundIntelligence</option><option value='http://admin.bungie.net/fanclub/265354/Forums/topics.aspx?forumID=271893'>Duardos Group</option><option value='http://admin.bungie.net/fanclub/205793/Forums/topics.aspx?forumID=212039'>GreaseMonkeys</option><option value='http://admin.bungie.net/fanclub/147763/Forums/topics.aspx?forumID=153758'>H3ITWP</option><option value='http://admin.bungie.net/fanclub/1467/Forums/topics.aspx?forumID=1476'><b>HFCS</b></option><option value='http://admin.bungie.net/fanclub/258294/Forums/topics.aspx?forumID=264807'>Index</option><option value='http://admin.bungie.net/fanclub/maclife/Group/GroupHome.aspx'>Mac Life</option><option value='http://admin.bungie.net/fanclub/306163/Group/GroupHome.aspx'>Major League Serious</option><option value='http://admin.bungie.net/fanclub/693/Forums/topics.aspx?forumID=702'>Mehve's Aerie</option><option value='http://admin.bungie.net/fanclub/259549/Forums/topics.aspx?forumID=266064'>Pax 09</option><option value='http://www.bungie.net/fanclub/336659/Forums/topics.aspx?forumID=343419'>The Priory of Duardo</option><option value='http://www.bungie.net/fanclub/212474/Forums/topics.aspx?forumID=218821'>Theme Builders</option><option value='http://www.bungie.net/fanclub/321650/Forums/topics.aspx?forumID=328348'>Theorist Cave</option><option value='http://admin.bungie.net/fanclub/215486/Forums/topics.aspx?forumID=221838'>Waaahmbulance</option><option value=''>-----</option><option value=''>-----</option><option value=''>-----</option>" +
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
        $("BWWWebcamToggleDisplay").innerHTML = "";
        visHeight = GM_getValue("BWWDefaultSizeHeight", "20px");
    }
    else if (GM_getValue("webcamV", "block") == "block")
    {
        visHeight = GM_getValue("BWWDefaultSizeHeight", "20px");
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
        webcamWatcherDiv.style.width = GM_getValue("BWWDefaultSizeWidth","300px");
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