// ==UserScript==
// @name           JoinDOTA Match Resoults Sort
// @description    Moves currently viewed team to left side of match resoults. Adds color to match resoults background.
// @namespace      http://userscripts.org/users/extaliones
// @include        http://www.joindota.com/*/team/*
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @grant          none
// @version        0.1
// ==/UserScript==


$(function() {
  var team = $("#content h1 small").text()
  team = team.substr(1,team.length - 2)

  $(".item_small").each( function() {
    var spans = $(this).find("span")
    var team1 = $(spans[1])
    var team2 = $(spans[2])
    var resoult = $(spans[3])

    if (team1.text().trim().localeCompare(team) != 0) {
      resoult.text(resoult.text().split("").reverse().join(""))
      var team_img = team2.children("img").detach()
      team2.html("vs. ")
      team2.append(team1.children("img"))
      team2.append(" ")
      team2.append(team1.text().substr(1).trim())
      team1.html("")
      team1.append(team_img)
      team1.append(" ")
      team1.append(team)
    }

    var res = resoult.text().split(':')
    resoult.css("background-color", parseInt(res[0]) > parseInt(res[1]) ? "#106010" : "#993022")
  })
})
