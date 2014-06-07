// ==UserScript==
// @name        Strims - X-Post Button
// @namespace   gintd.userscripts.strims.x_post_button
// @author      gintd
// @include     *strims.pl*
// @downloadurl https://userscripts.org/scripts/source/169879.user.js
// @updateurl   https://userscripts.org/scripts/source/169879.meta.js
// @version     0.4.0
// @grant       none
// ==/UserScript==
    
function main()
{
  
  function addXPostButton()
  {
    var xpost = {};
    xpost.id = $(".content_wrapper a.anchor").attr("id");
    xpost.url = $(".content_wrapper ul.content_info_url a").attr("href");
    xpost.title = $(".content_wrapper h2.content_header > a.content_title").text() +
      " (x-post z " + $(".section_right_box h2.section_right_box_name").text().replace(/^\s+|\s+.*/g, "") + ")";
    
    var addContentDiv = $(".add_right_box");
    var xpostContentDiv = addContentDiv.clone();
    
    $("a > span.icon_plus", xpostContentDiv)
      .css({
        '-webkit-transform' : 'rotate(45deg)',
           '-moz-transform' : 'rotate(45deg)',  
            '-ms-transform' : 'rotate(45deg)',  
             '-o-transform' : 'rotate(45deg)',  
                'transform' : 'rotate(45deg)',
      });
    
    $("a", xpostContentDiv)
      .attr("href", "/dodaj#xpost=" + xpost.id)
      .removeClass("disabled")
      .click(function()
        {
          saveXPostData(xpost);
        })
      .contents()[1].nodeValue = "X-postuj treść";

    $("p", xpostContentDiv).text("Przeklej treść do innego strimu.")
      .css({"min-height": $("p", addContentDiv).height()});
    
    xpostContentDiv.insertAfter(addContentDiv);
  }

  function fillForm()
  {
    var xpostId = /(#|&)xpost=(.+)(&|$)/.exec(location.hash)[2];
    var xpost = loadXPostData(xpostId);
    
    if (xpost != null)
    {
      $("#input_title").text(xpost.title);
      $("#input_url").text(xpost.url);
      $("#input__external_strim").focus();
    }
  }

  function saveXPostData(xpost)
  {
    sessionStorage.setItem("xpost_" + xpost.id, JSON.stringify(xpost));
  }

  function loadXPostData(xpostId)
  {
    var xpost = JSON.parse(sessionStorage.getItem("xpost_" + xpostId));
    sessionStorage.removeItem("xpost_" + xpostId);
    return xpost;
  }

  $(document).ready(function()
  {
    if ($("#content_page").length == 1)
    {
      addXPostButton();
    }
    else if (/\/dodaj#xpost=/.test(location.href))
    {
      fillForm();
    }
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
