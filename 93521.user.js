// ==UserScript==
// @name      Grepolis HD
// @namespace hd.grepolis
// @description Use the whole browser canvas to display the Grepolis UI.
// @author    Peter Mauritius
// @include   http://*.grepolis.com/game/map?*
// @include   http://*.grepolis.com/game/town_overviews?*
// @include   http://*.grepolis.com/game/*

// @require   http://userscripts.org/scripts/source/57756.user.js
// @require   http://userscripts.org/scripts/source/62718.user.js

// @version   0.0.2

// @history   0.0.2 PA overviews fixed as good as possible
// @history   0.0.1 Initial version.
// ==/UserScript==

var uW;
if (typeof unsafeWindow === 'object') {
  uW = unsafeWindow;
} else {
  uW = window;
}
var $ = uW.jQuery;

Config.scriptName = "Grepolis HD";
Config.tabs = {
    "General": {
      html: '<p>Options to control Grepolis HD</p>',
      fields: {
        enabledMap: {
          type: 'checkbox',
          label: 'Sea Map',
          text: 'enable for sea map',
          value: true,
        },
        enabledTownOverviews: {
          type: 'checkbox',
          label: 'Overviews',
          text: 'enabled for town overviews',
          value: true,
        },
        removeOlympics: {
          type: 'checkbox',
          label: 'Remove Olympics',
          text: 'enable to remove olympic games from culture overview',
          value: true,
        },
        debug: {
          type: 'checkbox',
          label: 'Debug',
          text: 'enable debug mode',
          value: true,
        },
      }
    },
    "About": {
      html: '<p>Quick hack to make better use of HD displays. <strong>This is a pre alpha release. Be careful!</strong></p>',
    }
};

var action = getUrlParam("action");

ShiftLeft();
AdjustContent();

function SetWH(tgt, width, height) {
  $(tgt).width(width);
  $(tgt).height(height);
}

function SetCssLT(tgt, left, top) {
  $(tgt).css("left", left);
  $(tgt).css("top", top);
}

function AdjustBaseLayout(width, height) {
  SetWH($("#box"), '100%', '100%');

  $("#content_box,#content,#table_wrapper").each(function () {
    $(this).width(width);
    $(this).height(height);
  });
// if (Config.get('debug')) {
// $("#content_box").css("background", "#00FF00");
// }
  $("#content").css("left", "0");

  SetWH($("#main_area"), width, height);

  $("#bar_wrapper").css("left", "25%");
}

function ShiftLeft() {
  $("#box").css("width", "100%");
  $("#main_area").css("top", "0");
  $("#menu").css("top", "0");
  $(document.body).width("99%");
  $(document.body).height("99%");

  $(document.body).css("background", "#FFE09D");
// if (Config.get('debug')) {
// $(document.body).css("background", "#FF0000");
// }
}

function AdjustContent() {
  var width = $(window).width() - $("#menu").width() - 1;
  var height = $(window).height() - 1;

  if (uW.Game.controller == "map" && Config.get('enabledMap')) {
    AdjustBaseLayout(width, height);
    var map_info_left = $("#map_info_left");
    map_info_left.css("left", "2px");
    map_info_left.css("bottom", "110px");

  } else if (uW.Game.controller == "town_group_overviews" && Config.get('enabledTownOverviews')) 
  {     
  } else if ((uW.Game.controller == "town_overviews" || uW.Game.controller == "town_group_overviews") && Config.get('enabledTownOverviews')) {
    AdjustBaseLayout(width, height);

    $("#content").css("padding", "0");
    SetCssLT($(".game_inner_box"), "0px", "24px");

    if (action=="trade_overview" || action=="index") {
      var myHeight = height - $("#header").height() - $(".menu_inner").height() - 40;

      $(".game_list").css("max-height", myHeight);
      SetWH($("#trade_overview_towns"), "auto", myHeight);
      SetWH($("#trade_overview_wrapper"), width, height-240);
      $(".dropdown_border").css("background", "none");

      var trade_controls = $("#trade_controls")
      trade_controls.css("bottom", "110px");
      trade_controls.css("background", "none");

      var trade_movements_wrapper = $("#trade_movements_wrapper");
      trade_movements_wrapper.css("bottom", 225);
      trade_movements_wrapper.css("background", "none");

    } else 
    {
      $(".game_inner_box").each(function () {
        SetWH($(this), width, height - $("#header").height() - $(".menu_inner").height());
      });

      if (action=="command_overview") {
        var myHeight = height - $("#header").height() - $(".menu_inner").height() - 40;
        $(".game_list").css("max-height", myHeight);
        SetWH($(".game_list"), width, "");
        SetCssLT($("#place_defense"), 0, 25);
        $("#place_defense").css("max-height", "none");

      } else if (action=="culture_overview") {
        $("#culture_overview_wrapper, .game_list").each(function () {
          $(this).width(width);
          $(this).height(height - $("#header").height() - $(".menu_inner").height() -20);
        });
        var culture_points_overview_bottom = $("#culture_points_overview_bottom");
        culture_points_overview_bottom.width(width - 25);
        culture_points_overview_bottom.css("bottom", 100);
        $("#place_culture_bg").css("left", (width - 25) / 2 - $("#place_culture_bg").width() / 2);
        if (Config.get('removeOlymics')) 
          $(".celebration_wrapper li:nth-child(2)").toggle(false);

      } else if (action=="gods_overview") {
        $("#gods_overview_wrapper").height(height - 260);
        var gods_overview_bottom = $("#gods_overview_bottom");
        gods_overview_bottom.width(width - 25);
        gods_overview_bottom.css("bottom", 80);
        $("#gods_overview_towns").width("auto");

      } else if (action=="hides_overview") {
        SetWH($("#hides_overview_wrapper"), width, height-175);
        $("#hides_overview_towns").width("auto");

      } else if (action=="unit_overview") {
        $("#content").css("height", height-80);
        $("#table_wrapper").css("max-height", height-230);  
        $("#outer_troops").css("background", "#FFE09D");
        $(".game_list").width("100%");

        $(".special").css("display", "table-cell");
        $(".towninfo").width(132);
        $("#toggle").toggle(false);

      } else if (action=="building_overview") {
        $("#table_wrapper").css("max-height", height-200);  
        // $(".towninfo_wrapper br").remove();
        $(".special").css("display", "table-cell");
        $("#building_theater").css("margin-left", 0);
        $("#toggle").toggle(false);
      }
    }
  } else if (uW.Game.controller == "building_barracks" || uW.Game.controller == "building_docks") {
    // activate fight values of units
    $("#unit_order_show_values").addClass("unit_order_show unit_order_hide_values");
    $("#fight_values_box").css("display", "block");
  } else if (uW.Game.controller == "building_place") {
    AdjustBaseLayout(width, height);
    $(".game_inner_box, .game_list").each(function () {
      // $(this).width(width);
      $(this).height(height - $("#header").height() - $(".menu_inner").height());
    });
  } else {

  }
};


function getUrlParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( uW.location.href );

  if ( results == null )
    return "";
  else
    return results[1];
}

$(window).resize(function () {
  AdjustContent();
});

GM_registerMenuCommand('Grepolis HD Options', Config.show, undefined, undefined, undefined);
ScriptUpdater.check(93521, "0.0.2");
