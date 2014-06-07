// ==UserScript==
// @name        Strims - Filter group
// @namespace   gintd.userscripts.strims.filter_group
// @author      gintd
// @include     *strims.pl*
// @downloadURL https://userscripts.org/scripts/source/170844.user.js
// @updateURL   https://userscripts.org/scripts/source/170844.meta.js
// @version     0.2.0
// @grant       none
// ==/UserScript==

if (document.domain != "strims.pl")
  return;

function main()
{

  function filterStrimContent(strimHref)
  {
    $("ul.in_strim > li")
      .hide()
      .filter(":has(.content_info_basic a[href='"+strimHref+"'])")
      .show();
  }

  function showAllStrimContent()
  {
    $("ul.in_strim > li")
      .show();
  }

  $(document).ready(function()
  {
    if (page_template.section_type == "g" && page_template.section_part == "contents")
    {
      var currentStrimCount = $("ul.in_strim > li").length;
      var currentStrimSelected = null;
      var intervalId = null;
      
      $(".section_list_right_box .strim_list_name a").click(
        function(event)
        {
          event.preventDefault();
          
          var strimAlreadySelected = $(this).closest("li").hasClass("background_green");
          $(".section_list_right_box li").removeClass("background_green");
          
          if (strimAlreadySelected)
          {
            showAllStrimContent();
            currentStrimSelected = null;
          }
          else
          {
            $(this).closest("li").addClass("background_green");
            currentStrimSelected = $(this).attr("href");
            filterStrimContent(currentStrimSelected);
          }
        });
      
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
                currentStrimCount = $("ul.in_strim > li").length;
                filterStrimContent(currentStrimSelected);
              }
            }, 1000);
        });
    }
  });
}

function addJQuery(callback)
{
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

if (typeof $ == 'undefined')
{
  /*--- Create a proper unsafeWindow object on browsers where it doesn't exist
      (Chrome, mainly).
      Chrome now defines unsafeWindow, but does not give it the same access to
      a page's javascript that a properly unsafe, unsafeWindow has.
      This code remedies that.
  */
  var bGreasemonkeyServiceDefined = false;

  try
  {
      if (typeof Components.interfaces.gmIGreasemonkeyService === "object")
      {
          bGreasemonkeyServiceDefined = true;
      }
  }
  catch (err)
  {
      //Ignore.
  }

  if (typeof unsafeWindow === "undefined" || ! bGreasemonkeyServiceDefined)
  {
      unsafeWindow = (function(){
        var dummyElem = document.createElement('p');
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