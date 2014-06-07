// ==UserScript==
// @name         Google Suggest
// @version      1.0
// @description  Displays suggestions when you start typing in google search
// @include      http://www.google.co.in/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
 
(function () {
  // add style to the list
  addGlobalStyle('
     body{font-family:verdana;font-size:14px;}
     .list {list-style:none;margin:0px;padding:0px;}
     .list li{width:100%;border-color:#CCCCCC;border-style:solid;border-width:0 1px 1px;height:28px;}
     .list li a{display:block;color:black;text-decoration:none;padding:5px 5px !important;cursor:pointer;}
     .selected{background:#678FD6;border:1px solid #5F5F5F;}
     .selected span{background:#678FD6;color:white;}
  ');
 
     // create empty list and attach to DOM
     offset  = $("input[title='Google Search']").offset();
     $("<div id='suggestions'>").appendTo("body")
     .css("background","#eeeeee")
     .css("width",$("input[title='Google Search']").width()+13)
     .css("position","absolute")
     .css("top",offset.top + $("input[title='Google Search']").height()+6)
     .css("left",offset.left)
     .css("border-top","1px solid #CCCCCC")
     .css("height","auto")
     .fadeTo("slow","0.8");
 
    $(".lst").keyup(function(event){
      var str = $(".lst").val();
      if(str.length)
      {
        if(event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 13)
        {
          // this is the Greasemonkey's way to make a Ajax call
          GM_xmlhttpRequest({
            method: "GET",
            url: "http://google.com/complete/search?output=toolbar&q="+str,
            headers: {
                "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
                "Accept": "application/atom+xml,application/xml,text/xml",
            },
            onload: function(responseDetails) {
                // clear previous result
                $("#suggestions").html("
<ul class="list">");
                i = 0;
                $(responseDetails.responseText).find("CompleteSuggestion").each(function(){
                    data = $(this).find("suggestion").attr("data");
                    data = data.replace(str,"<strong>"+str+"</strong>");
                    if(i < 15)
                        $(".list").append("
<li><a>"+data+"</a>");
                    i++;
                });
                $("#suggestions").append("</li>
</ul>
 
");
            }
          });
        }
        else
        {
            // code to handle up and down button keystrokes
            $("li .selected").removeClass("selected");
            switch (event.keyCode)
            {
             case 40:
             {
                  found = 0;
                  $("li").each(function(){
                     if($(this).attr("class") == "selected")
                        found = 1;
                  });
                  if(found == 1)
                  {
                    var sel = $("li[class='selected']");
                    // check if his is a last element in the list
                    // if so then add selected class to the first element in the list
                    if(sel.next().text() == "")
                        $("li:first").addClass("selected");
                    else
                        sel.next().addClass("selected");
                    // remove class selected from previous item
                    sel.removeClass("selected");
                    // set value in textbox
                  }
                  else
                    $("li:first").addClass("selected");
                  $("input[title='Google Search']").val($("li.selected").text());
                 }
             break;
             case 38:
             {
                  found = 0;
                  $("li").each(function(){
                     if($(this).attr("class") == "selected")
                        found = 1;
                  });
                  if(found == 1)
                  {
                    var sel = $("li[class='selected']");
                    // check if his is a last element in the list
                    // if so then add selected class to the first element in the list
                    if(sel.prev().text() == "")
                        $("li:last").addClass("selected");
                    else
                        sel.prev().addClass("selected");
                    // remove class selected from previous item
                    sel.removeClass("selected");
                  }
                  else
                    $("li:last").addClass("selected");
                  $("input[title='Google Search']").val($("li.selected").text());
             }
             break;
             case 13:
                $("#suggestions").trigger("click");
             break;
            }
         }
      }
        else
            $("#suggestions").html("");
    });
 
    // hide list contents on enter key press
    $(document).keydown(function(event){
       if(event.keyCode == 13)
         $("#suggestions").html("");
    });
 
    // code to handle mouseover event
    $("#suggestions").mouseover(function(){
        $(this).find("li").hover(
          function()
          { $(this).addClass("selected") },
          function()
          { $(this).removeClass("selected") }
        );
    });
 
    $("#suggestions").click(function(){
        var data = $(this).find("li.selected").html();
        data = data.replace("<a>","");
        data = data.replace("</a>","");
        data = data.replace("<strong>","");
        data = data.replace("</strong>","");
        $("input[title='Google Search']").val(data);
        $("#suggestions").html("");
        $("input[value='Google Search']").trigger("click");
    });
 
    // bind DOM click event to ul element which is added at runtime
    $("ul").live("click",function () {
        var text = $(this).text();
        $("input[title='Google Search']").val(text);
    });
 })();
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}