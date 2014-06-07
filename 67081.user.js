//
// CharazayMonkey
// @author  Lukasz Wachowicz
// @mail    vachacz@gmail.com
// @version 2.0.3
//
// Copyright 2011, Lukasz Wachowicz
//
// ==UserScript==
// @name           CharazayMonkey
// @namespace      http://charazay.com/cbmmonkey
// @description    Add new features to Charazay basketball manager.
// @include        http://charazay.com/*
// @include        http://*.charazay.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addScript(scriptPath, callback) {
  var script = document.createElement("script");
  script.setAttribute("src", scriptPath);
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    if (callback) {
       script.textContent = "(" + callback.toString() + ")();";
    }
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// ------------------------------------------------------------
// Run CharazayMonkey
// ------------------------------------------------------------

addScript("http://code.jquery.com/jquery-1.7.1.min.js", function() {
  jQuery.noConflict();
  (function($) {
    CBM = {}

    CBM.insertCbmMonkeyLogo = function () {
   	$("body").append("<div style='bottom: 0px; position: fixed; width: 100%; background: white; padding: 2px; border-top: 1px solid black;'><b>CharazayMonkey 2.0</b></div>");
    }

    CBM.adjustCSS = function () {
        $("#mc").width("912px");
        $(".container_12").css("max-width", "960px");
        $("#site-info").css("margin-left", "970px");
        $(".mc-ls").width("690px");
        $(".mc-ml, .mc-mr").width("36.5em");
        $("body").css("line-height", "120%");
        $("div.player").width("33%").css({"padding-left": "70px", "padding-right": "70px"});
    }

    CBM.addLeftMenu = function() {
        $("#content .container_12").append($("<div/>", { "id": "left-menu" }));
        $("#left-menu").css({
            "position": "fixed", "margin-left": "-170px", "top": "108px", "width": "160px"
        });

        var name0 = $("<div>Tools</div>").wrap("<div class='rc-t'/>").parent();
        var menu0 = $("<ul/>").append(
            $("<li/>").append($("span.infoblock:eq(1) > a").clone()),
            $("<li/>").append($("span.infoblock:eq(2) > a").clone())
        );
        var name1 = $("#mainmenu > li:eq(0) > a").clone().wrap("<div class='rc-t'/>").parent();
        var menu1 = $("#mainmenu > li:eq(0) > ul").clone();
        var name2 = $("#mainmenu > li:eq(1) > a").clone().wrap("<div class='rc-t'/>").parent();
        var menu2 = $("#mainmenu > li:eq(1) > ul").clone();

        var quickMenu = $("<div/>", { id: "left-menu-quick", class: "rc-s"}).append(name0, menu0);
        var teamMenu = $("<div/>", { id: "left-menu-team", class: "rc-s"}).append(name1, menu1);
        var officeMenu = $("<div/>", { id: "left-menu-office", class: "rc-s"}).append(name2, menu2);

        $("#left-menu-team > a, #left-menu-office > a").css({
           "font-weight": "bold", "font-size": "15px"
        });

        $("#left-menu").append(quickMenu, teamMenu, officeMenu);
    }

    CBM.addPlayerTable = function() {
        var rowClass = "odd";
        var playerTable = $("<table id='customPlayerView'/>");
        playerTable.append($("<thead><tr height='20px'><th>Name</th><th>%</th><th/><th>Age</th><th>SI</th><th>cm</th><th>kg</th><th>BMI</th></tr></thead>"));
        playerTable = playerTable.append($("<tbody/>"));

        $("img.FAPercent").parent("p").each(function() {
            var player  = $("a.highlight", this).clone().removeClass("highlight");
            var fatigue = $("img.FAPercent", this).clone();
            var flag    = $("a > img[src*='language']", this).clone();

            // BMI
            var heightWeight = $(this).contents().get(-1).data;
            var split = heightWeight.split(",");
            var height = split[0].split(":")[1];
            var weight = split[1].split(":")[1] + "." + split[2];
            var bmi = countBMI(height, weight);

            // age and SI
            var ageAndSI = $(this).contents().get(-3).data;
            var split = ageAndSI.split(",");
            var age   = split[0].split(":")[1];
            var si    = split[1].split(":")[1];

            var tr = playerTable.append(
                $("<tr/>", { class: rowClass })
                  .append(
                    $("<td/>").append(player),
                    $("<td/>").append(fatigue),
                    $("<td/>").append(flag),
                    $("<td/>", { width: "30px", align: "right"}).append(age),
                    $("<td/>", { width: "70px", align: "right"}).append(si),
                    $("<td/>", { width: "40px", align: "right"}).append(height),
                    $("<td/>", { width: "60px", align: "right"}).append(weight),
                    $("<td/>", { width: "50px", align: "right"}).append(bmi)
                  )
            );
            rowClass = rowClass == "odd" ? "even" : "odd";
        });
        $("img.FAPercent:first")
            .parents("div.mc-ls")
            .prepend(playerTable.append($("<br/>")));
    }

    countBMI = function(height, weight) {
	var heightFloat = parseFloat(height);
	var weightFloat = parseFloat(weight);
	var bmi = 10000 * weightFloat / (heightFloat * heightFloat);
	return round(bmi, 1);
    }

    round = function(number, precision) {
	var round = Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
	return round.toFixed(1);
    }

    CBM.showAvarages = function() {
	var statTable = $("#career_totals").clone()
           .attr("id", "career_avarages")
           .css({ "box-shadow": "2px 2px 0 #E1E1E1", "border": "1px solid #BBB" });

        $("thead", statTable)
           .css("background", "url('/images/adminique/box-header.gif') repeat-x scroll 0 0 white");

        $("tr", statTable).each(function() {
            var matchCount = $("td:eq(3)", this).text();

            var tr = $(this);
            $.each([4,8,9,10,11,12,13,14,15,16,17], function(index, column) {
                $("td:eq(" + column + ")", tr).text(function(index, text) {
                     return countAvarage(text, matchCount);
                });
            });

            $.each([5,6,7], function(index, column) {
                $("td:eq(" + column + ")", tr).text(function(index, text) {
                     return countShotEfficiency(text, matchCount);
                });
            });
        });

        $("#career_totals").parent()
            .append($("<br><div class='mc-t'>Avarages</div><br>"), statTable);
    }

    countAvarage = function(value, matchCount) {
	value = value.replace(/\./, "");
	return round(parseInt(value) / parseInt(matchCount), 1);
    }

    countShotEfficiency = function(value, matchCount) {
	var split = value.split("-");
	if (split[1] == "0") {
             return "-";
	}
	var efficiency = 100 * (split[0] / split[1]);
	return round(efficiency, 1) + "%";
    }

    CBM.insertCbmMonkeyLogo();
    CBM.adjustCSS();
    CBM.addLeftMenu();
    CBM.addPlayerTable();
    CBM.showAvarages();
  })(jQuery);
});

addScript("http://autobahn.tablesorter.com/jquery.tablesorter.min.js", function() {
   jQuery.noConflict();
   (function($) {
      CBM = {}

      CBM.sortableTables = function() {
        var style = $('<style>'
          +'th.header { background-image: url(http://tablesorter.com/themes/blue/bg.gif); cursor: pointer; background-repeat: no-repeat; background-position: center left; padding-left: 20px; border-right: 1px solid #dad9c7; margin-left: -1px; }'
          +'th.headerSortUp { background-image: url(http://tablesorter.com/themes/blue/asc.gif); background-color: #A35050; color: white; text-shadow: 0px 0px 0 white;}'
          +'th.headerSortDown { background-image: url(http://tablesorter.com/themes/blue/desc.gif); background-color: #A35050; color: white; text-shadow: 0px 0px 0 white;}'
          +'</style>');
        $('html > head').append(style);

        $("table#players").tablesorter(); 
        $("table#history").tablesorter(); 
        $("table#hometeam").tablesorter(); 
        $("table#awayteam").tablesorter();
        $("table#career_totals").tablesorter();
        $("table#standings").tablesorter();
        $("table#customPlayerView").tablesorter();
        $("table#career_avarages").tablesorter();
      }

      CBM.sortableTables();
   })(jQuery);
});

addScript("http://plugins.jquery.com/files/jquery.uitablefilter.js_.txt", function() {
   jQuery.noConflict();
   (function($) {

      filterable = function(selector) {
         var $table = $(selector);
         var FilterText = "";
         var ColumnArray = $(selector + " thead th").map(function() {
            return $(this).text();
         }).get(); 
 
         for (i = 0; i < ColumnArray.length; i++) {
            $(selector + " tbody tr").find("td:eq(" + i + ")").click( function() {
               var clickedText = $(this).text();
               FilterText = ((FilterText == clickedText) ? "" : clickedText );
               var ColumnHeader = ColumnArray[this.cellIndex];
               $.uiTableFilter( $table, FilterText, ColumnHeader); 
            });
         }
      }

      filterable("#career_totals");
      filterable("#career_avarages");

   })(jQuery);
});
