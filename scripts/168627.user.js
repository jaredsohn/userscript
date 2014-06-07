// ==UserScript==
// @name        Strims - Page preview
// @namespace   gintd.userscripts.strims.page_preview
// @author      gintd
// @include     *strims.pl*
// @downloadurl	https://userscripts.org/scripts/source/168627.user.js
// @updateurl	  https://userscripts.org/scripts/source/168627.meta.js
// @version     0.6.0
// @grant       none
// ==/UserScript==

function main()
{

  function addPagePreview()
  {

    var contentAnchor = $("a.anchor:first-of-type", this);

    var button = $("<a class=\"content_preview_show button fixed\"><span class=\"icon icon_play page\"></span></a>");
    var previewDiv = $("<div class=\"content_preview no_display\"></div>").css("padding-bottom", 5);
    
    $("h2", this).after(button);
    $(this).append(previewDiv);

    previewDiv.targetHeight = $(window).height() - previewDiv.parent().innerHeight() + contentAnchor.position().top - 5;
    previewDiv.targetHeight -= parseInt(previewDiv.css("padding-top")) + 5;

    button.click( function()
      {
        button.toggleClass("selected");
        previewDiv.toggleClass("no_display");
        
        if (button.hasClass("selected"))
        {
          if (previewDiv.frame == undefined)
          {
            $.ajax({
              url: "http://strims.pl/tb/" + contentAnchor.attr("id"),
              crossDomain: true,
              success: function(data)
              {
                previewDiv.height(previewDiv.targetHeight);
                
                previewDiv.frame = $(data).find("#content_frame")
                  .css({ "position": "relative", "padding-top": 0, "border": "1px solid" });
                
                if (previewDiv.frame.length == 0)
                {
                  previewDiv.height("auto");
                  previewDiv.text("Nie udało się załadować podglądu");                
                } else {
                  incrFrameKillerKiller();  
                  previewDiv.frame.load(incrFrameKillerKiller);
                  previewDiv.append(previewDiv.frame);
                }
              },
              error: function()
              {
                previewDiv.height("auto");
                previewDiv.text("Nie udało się załadować podglądu");
              }
            });
          } else {
            incrFrameKillerKiller();
            previewDiv.append(previewDiv.frame);
          }

          $('html, body').animate({ scrollTop: contentAnchor.offset().top - 5 }, "fast");

        } else {
          previewDiv.empty();
          decrFrameKillerKiller();
        }
        
        return false;
      });
  }

  function addPagePreviewStyle()
  {
    var buttonIcon =
      {
        day: "http://i.imgur.com/YVTVBKZ.png",
        night: "http://i.imgur.com/DRYHIXe.png"
      };
    
    var pagePreviewStyle = $("<style type=\"text/css\"></style>").appendTo("head");
    var lightSwitch = $("#light_switch");
    
    pagePreviewStyle.selectIcon = function()
      {
        if (lightSwitch.find("span.icon_light").hasClass("on"))
        {
          return buttonIcon.day;
        } else {
          return buttonIcon.night;
        }
      };
    
    pagePreviewStyle.update = function()
      {
        pagePreviewStyle.text("span.icon_play.page{width:20px;background-image:url(\""+pagePreviewStyle.selectIcon()+"\");}");
      };
      
    lightSwitch.click(pagePreviewStyle.update);
    
    pagePreviewStyle.update();
  }

  var currentStrimCount = $("ul.in_strim > li").length;
  var intervalId = null;
  
  $(document).on("click", ".pagination a.button.more",
    function(event)
    {
      if (intervalId != null)
        clearInterval(intervalId);
      
      intervalId = setInterval(
        function()
        {
          if (currentStrimCount < $("ul.in_strim > li").length)
          {
            clearInterval(intervalId);
            intervalId = null;
            $(".content:not(:has(.content_preview_show))").each(addPagePreview);
          }
        }, 1000);
    });

  var frameKillerKillerCount = 0;

  function incrFrameKillerKiller()
  {
    frameKillerKillerCount++;
    $(window).on("beforeunload", function() { return false; });
    setTimeout(decrFrameKillerKiller, 5000);
  }

  function decrFrameKillerKiller()
  {
    frameKillerKillerCount--;
    if (frameKillerKillerCount <= 0)
    {
      $(window).off("beforeunload");
      frameKillerKillerCount = 0;
    }
  }

  $(document).ready(function()
  {
    addPagePreviewStyle();
    
    $(".content:not(:has(.content_preview_show))").each(addPagePreview);
    
  });
}

function addJQuery(callback)
{
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

if (document.domain == "strims.pl")
  if (typeof $ == 'undefined')
  {
    if (typeof unsafeWindow === "undefined")
    {
        unsafeWindow = (function(){
          var dummyElem = document.createElement('a');
          dummyElem.setAttribute('onclick', 'return window;');
          return dummyElem.onclick();
        })();
    }
    
    if (unsafeWindow.jQuery)
    {
      var $ = unsafeWindow.jQuery;
      main();
    } else
    {
      addJQuery(main);
    }
  } else
  {
    main();
  }
