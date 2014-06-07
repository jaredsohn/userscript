// ==UserScript==
// @name           Black Lion's Chatlinks beta 1.0
// @namespace      tradingpost-live.ncplatform.net
// @description    Allow you to get the chatlink code of each item on GW2 Trading Post
// @include        http*://tradingpost-live.ncplatform.net/*
// ==/UserScript==

//Check if the trading post is loaded
var readyStateCheckInterval = setInterval(function()
{
    if (document.readyState === "complete")
    {
      var script = document.createElement("script");
      script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
      script.addEventListener("load", function() {
          var script = document.createElement("script");
              script.textContent = "("+main.toString()+")();\n";
              script.textContent += copyItemCode.toString()+"\n";
              script.textContent += codeID.toString()+"\n";
          document.body.appendChild(script);
      }, false);
      document.body.appendChild(script);
      clearInterval(readyStateCheckInterval);
    }
}, 1000);

function main()
{
  if($("html").css("background-color") == "transparent" || $("html").css("background-color") == "rgba(0, 0, 0, 0)")
  {
    //Set the background color to darkgrey
    $("body").css("background-color","#333");
    
    //Display informations
    $("<div id='userscriptinfo' style='width:909px;height:100px;'><img src='http://projects.li/gw2/blacklion.png' style='float:left;' alt=''/><p><h5><u>Welcome in the Black Lion Company Trading Post.</u></h5> If you read this message it's because you have installed the Black Lion's Chatlinks userscript. This userscript allow you to <span class='rarity-Exotic'>get the chatlink code of any item, by simply click  on it's icon</span>. Remember, this trading post is the same that the one you can use ingame, but you can't sell or buy items !</p><span style='clear:both;font-style:italic;'> ~ ChaosKaizer</span><button id='closebtn' style='position:absolute;top:90px;right:0px;'>Close</button></div>").prependTo("body");
    $(".search").css("top","115px");
    $(".advanced-under").css("top","232px");

    //Handle close functions
    $("#closebtn").click(function(){
      $("#userscriptinfo").css("display","none");
      $(".search").css("top","4px");
      $(".advanced-under").css("top","117px");
    });
  }

  //Add mousedown event on every item icon
  $(".icon").live("mousedown", function(){copyItemCode(this);});
}

//Display a popup with the item code
function copyItemCode(element)
{
  var id = element.getAttribute("data-id");
  var code = codeID(id);
  window.prompt ("Ctrl+C to copy the code of this item.", code);
}

//Convert item id to base64 chatlinks usable in gw2 chatbox
//Thanks to streamchan.com/gw2id.html developer
function codeID(id)
{
  var code = "";
  code += String.fromCharCode(2);
  code += String.fromCharCode(1);
  code += String.fromCharCode(id % 256);
  code += String.fromCharCode(Math.floor(id / 256));
  code += String.fromCharCode(0);
  code += String.fromCharCode(0);
  code = "[&"+btoa(code)+"]";
  return code;
}