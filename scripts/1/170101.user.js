// ==UserScript==
// @name        Strims - Subscription Settings
// @namespace   gintd.userscripts.strims.subscription_settings
// @author      gintd
// @include     *strims.pl*
// @downloadurl https://userscripts.org/scripts/source/170101.user.js
// @updateurl   https://userscripts.org/scripts/source/170101.meta.js
// @version     0.3.1
// @grant       none
// ==/UserScript==

function main()
{

  var subscriptionSettings =
  {
    init: function()
      {
        subscriptionSettingsWrapper.init();
        subscriptionSettingsButton.init();
        subscriptionSettingsList.init();
        
        $(document).on("click", "#light_switch", subscriptionSettings.updateStyle);
        this.updateStyle();
      },
    
    updateStyle: function()
      {
        setTimeout(function()
          {
            subscriptionSettingsWrapper.updateStyle();
            subscriptionSettingsButton.updateStyle();
            subscriptionSettingsList.updateStyle();
          }, 500);
      }
  };

  var subscriptionSettingsWrapper =
  {
    init: function()
      {
        if (typeof this.jQObject != 'undefined')
          return false;
        
        this.jQObject = $("<div class=\"strim_subscr_settings_wrapper\"></div>");
        
        if ($("div.strim a.strim_subscribe.selected").hasClass("no_display"))
          this.jQObject.addClass("no_display");
        
        this.jQObject.insertAfter($("div.strim .strim_subscribe_wrapper"));
        
        $(document).on("click", "div.strim a.strim_subscribe", function()
          {
            subscriptionSettingsWrapper.get().toggleClass("no_display");
            
            if (! subscriptionSettingsWrapper.get().hasClass("no_display"))
              subscriptionSettings.updateStyle();
          });
      },
    
    updateStyle: function()
      {
        var margin = (parseInt($("div.strim a.strim_subscribe.selected").css("margin-right")) +
          parseInt($("div.strim .strim_subscribe_wrapper").css("padding-right")));
        
        subscriptionSettingsWrapper.get()
          .css(
            {
              "float": "left",
              "height": $("div.strim .strim_subscribe_wrapper").css("height"),
              "margin-left": "-"+margin+"px",
              "margin-right": margin+"px"
            });
      },

    get: function(){ return this.jQObject; }
  };

  var subscriptionSettingsButton =
  {
    init: function()
      {
        if (typeof this.jQObject != 'undefined')
          return false;
        
        this.jQObject = $("<a class=\"strim_subscr_settings button fixed green small\" title=\"Ustaw opcje subskrypcji\"></a>")
          .attr("href", page_template.url_options.replace(/^\/ajax/i, "").replace(/\/ustawienia$/i, "/subskrypcje"))
          .append($("<span class=\"icon\"></span>"))
          .appendTo(subscriptionSettingsWrapper.get());
        
        $(document).on("click", "div.strim a.strim_subscr_settings", function(event)
          {
            event.preventDefault();
            subscriptionSettingsList.display();
          });
      },
    
    updateStyle: function()
      {
        function getSubscribeStyle(prop)
        {
          return $("div.strim a.strim_subscribe.selected").css(prop);
        }

        subscriptionSettingsButton.get()
          .css(
            {
              "width": "20px",
              "height": getSubscribeStyle("height"),
              "display": "block",
              "border-left-width": "0px",
              "border-radius":
                "0px " +
                getSubscribeStyle("border-top-right-radius") + " " +
                getSubscribeStyle("border-bottom-right-radius") + " 0px",
              "background-color": getSubscribeStyle("background-color")
            })
          .find("span.icon")
          .css(
            {
              "width": "12px",
              "height": "12px",
              "display": "block",
              "margin-top": ((parseInt(getSubscribeStyle("height"))-14)/2)+"px",
              "background-image": "url('http://i.imgur.com/sjtohjJ.png')"
            });
      },

    get: function(){ return this.jQObject; }
  };

  var subscriptionSettingsList =
  {
    init: function()
      {
        if (typeof this.jQObject != 'undefined')
          return false;
        
        this.jQObject = $("<ul class=\"strim_subscr_settings_list no_display\"></ul>")
          .append($("\
<li><label><input name=\"limit\" type=\"radio\" value=\"2\">Jeszcze więcej</label></li>\
<li><label><input name=\"limit\" type=\"radio\" value=\"1\">Więcej</label></li>\
<li><label><input name=\"limit\" type=\"radio\" value=\"0\">Domyślnie</label></li>\
<li><label><input name=\"limit\" type=\"radio\" value=\"-1\">Mniej</label></li>\
<li><label><input name=\"limit\" type=\"radio\" value=\"-2\">Jeszcze mniej</label></li>\
<li><label><input name=\"notifications\" type=\"checkbox\">Powiadomienia</label></li>"))
          .appendTo(subscriptionSettingsWrapper.get());
        
        var blinker = function(e, c)
        {
          function f()
          {
            e.addClass(c);
            setTimeout(function(){ e.removeClass(c); }, 1500);
          }
          return f;
        };
        
        $(document).on("change", "div.strim ul.strim_subscr_settings_list input[type='radio']", function(event)
          {
            var target = $(event.target);
            var li = target.closest("li");
            $.get("/ajax/s/"+page_template.section_name+"/limit?token="+page_template.token+"&limit="+target.attr("value"))
              .done(blinker(li, "background_green"))
              .fail(blinker(li, "background_red"));
          });
        
        $(document).on("change", "div.strim ul.strim_subscr_settings_list input[type='checkbox']", function(event)
          {
            var target = $(event.target);
            var li = target.closest("li");
            var action = target.prop("checked") ? "monitoruj" : "niemonitoruj";
            $.get("/ajax/s/"+page_template.section_name+"/"+action+"?token="+page_template.token+"&limit="+target.attr("value"))
              .done(blinker(li, "background_green"))
              .fail(blinker(li, "background_red"));
          });
        
        $(document).on("click", "div.strim a.strim_subscribe.selected", function()
          {
            subscriptionSettingsList.loaded = false;
          });
      },
    
    display: function()
      {
        var list = this.get();
        
        function _hideOnClick(e)
        {
          var target = $(e.target);
          if (! target.closest(list).length)
          {
            subscriptionSettingsButton.get().removeClass("focus");
            list.addClass("no_display");
            $(document).off("click", _hideOnClick);
          }
        }
        
        function _display()
        {
          list.removeClass("no_display");
          subscriptionSettingsButton.get().addClass("focus");
          $(document).on("click", _hideOnClick);
        }
    
        if (list.hasClass("no_display"))
        {
          if (! this.loaded)
            this.loadContent(_display);
          else
            _display();
        }
      },
    
    loaded: false,
    
    loadContent: function(callback)
      {
        $.ajax({
          url: subscriptionSettingsButton.get().attr("href"),
          crossDomain: true,
          success: function(data)
          {
            var row = $(data).find("#user_subscriptions_page table tr:has(td.name a[href='/s/"+page_template.section_name+"'])");
            
            subscriptionSettingsList.get()
              .find("li input[type='radio']")
              .eq( row.find("td.limit select.important_limit_select").prop("selectedIndex") )
              .prop("checked", true);
              
            subscriptionSettingsList.get()
              .find("li input[type='checkbox']")
              .prop("checked", row.find("td.notifications input.strim_notifications_checkbox").prop("checked"));
            
            subscriptionSettingsList.loaded = true;
            callback();
          }
        }); 
      },
    
    updateStyle: function()
      {
        var strimGroupList = $("div.strim ul.strim_group_list");
        
        if (strimGroupList.length == 0)
          var styles =
            {
              borderStyles:
                { "border": "1px solid rgb(200, 200, 200)",
                  "border-top": "1px solid rgb(200, 200, 200)" },
              boxShadow: "0px 6px 4px -4px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#ffffff"
            };
        else
          var styles =
            {
              borderStyles: getBorderStyles(strimGroupList),
              boxShadow: strimGroupList.css("box-shadow"),
              backgroundColor: $("li a", strimGroupList).css("background-color")
            };
          
        subscriptionSettingsList.get()
          .css(styles.borderStyles).css(
            {
              "width": "160px",
              "position": "absolute",
              "z-index": "50",
              "box-shadow": styles.boxShadow,
              "background-color": styles.backgroundColor
            })
          .find("label")
          .css(
            {
              "display": "block",
              "padding-bottom": "1px"
            })
          .last()
          .css(
            {
              "margin-top": "2px",
              "padding-top": "1px",
              "border-top": styles.borderStyles["border-top"]
            });
      },

    get: function(){ return this.jQObject; }
  };

  function getBorderStyles(e)
  {
    var borderStyles = {};
    
    var Ds = ["left","right","top","bottom"];
    var Ps = ["width","style","color"];
    
    var propName = "";
    var propNameShort = "";
    
    for(var d = 0; d < Ds.length; ++d)
    {
      propNameShort = "border-"+Ds[d];
      borderStyles[propNameShort] = "";
      
      for(var p = 0; p < Ps.length; ++p)
      {
        propName = propNameShort+"-"+Ps[p];
        borderStyles[propNameShort] += e.css(propName)+" ";
      }
    }
      
    return borderStyles;
  }

  $(document).ready(function()
  {
    if ($("div.strim .strim_subscribe_wrapper").length != 0)
      subscriptionSettings.init();
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
