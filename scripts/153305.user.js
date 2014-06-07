// ==UserScript==
// @id             twitchtvchatpauser@phob.net
// @name           Twitch.TV Chat Pauser
// @version        0.25
// @namespace      phob.net
// @author         wn
// @description    Adds a Pause and Resume feature to TwitchTV chat
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/153305.meta.js
// ==/UserScript==


// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }

  // Create a script node holding this source code.
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function() {

  // Only run on the main window
  if (self !== top) {
    return;
  }

  var $ = jQuery;
  $(document).ready(function() {
    // Pause/Resume control CSS
    // Images courtesy of http://www.famfamfam.com/lab/icons/silk/
    $("body").append(
        $("<style type='text/css'>")
           .text("#twitchtvchatpauser { position: absolute; display: block; top: 0; right: 20px; width: 20px; height: 20px; cursor: pointer }"
               + ".ttcpPause { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0"
                                  + "RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHoSURBVDjLpVM9awJBEB2DKIoocoI2goXVgVhoYam9bep0XqX+DU1pZ6Eh"
                                  + "pZ2FYGsnot2BqJUgaiGCd/j9tZlZvc2ZjyZZGPZmb+bNe49dC2MM/rOsXw9Go1EcQdMYSYwIDbheryruLdwb0Wi0Z663mBlgs4J5TpIk"
                                  + "2el0gt1u5+f7/R7W6zXMZrM+gpRisVhZNBEAxXA4VAaDgYbFjBbtuq4zTdPYbrfjZ5vNhnU6Ha3dbitGH2dwp/0eCoVkmrparQSweYjP"
                                  + "54PtdgvdbpeYvKRSqd4TFWCSJtpGc6FQgEqlKpqLxVeoVt8AGQFJCwaDMrJJCxPJMPpBWhEMboPZ/ZvxbwMMG8Hr9VJtks4MBhGafjgc"
                                  + "HigbAIRhnBGAy+WC8/kcEQBmrdR0+3402VxzPB7hdDqBmYFK5thstjsAExI+81szSV0ulwSgCoDL5dIigxwOBy+SJN+DBHLfYEE10+mU"
                                  + "JLSEiai9MR6Pn1Gb7Pf7QVEy4p7QBcpkbrnb7Yb5fA6qqvYxbQgGiUSih66W8JLoRM/j8YDVauWm0k5BzXgTodls6uhBCUF7365yvV5X"
                                  + "UFsuHA7LgUCAA6E8WCwWMJlM+GTMS/l8vvzjW6BVq9XiSDuNQPwxoVZuMkYLmTSy2ezvj+kv6wM24KX3CYk6PAAAAABJRU5ErkJggg=="
                                  + ") no-repeat; background-size: 20px }"
               + ".ttcpPause:hover { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/I"
                                  + "NwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJjSURBVDjLpZNLbxJhFIb7A/wF/A5YunTDzuqmO+PdsDFx"
                                  + "0dSVpJq4aIyQmUIU06a1gUqCJlXb1Ehb6QhiGgsdKFNAwAIOhWEcBobLUI5zPpgRLzsneRfz5bzPec93mQCAiXGdc4FJk0WTVdPUSNbR"
                                  + "munP+nHjGU3muy8lW+DjMR3ZTzMHiUMhziaF3b0U82InR0/76zaswdrfACPzWV+obI8fZjm+JoGs9EA9HRA1Wl0oVeoQ3mO5hc2sHWt1"
                                  + "iA4wo5lNfZXbHRXwU7p9qMs9EDQ1O32yJitd2I3GZM/6EULMBIBzYWzsrJurUhcqP7rAi0OVxQ6U6h0DsrkV5m6v8DiOCQGWAPONxti6"
                                  + "+eKDENxyJw3z5OwOXHclSBr8UrnvQPkjNHoRYA1/OWJwZoyKpgv3EZAgXYtCWwNsE0Ct0QOppcKJqMDi6msGvQiYih0kBNwsLEAAdryh"
                                  + "AY5rbaJJ+zZcm2dJOvzvqqew4l0V0EsA+3GWALAAu+qRsbhQbcP5e0G4Sg8B+C+1erC49NwAWD98TjKi3IGGog47ksgs5E8UyFUUDfCe"
                                  + "AHBj8WTSRREoj9cYweINZuhCqQaDAZAOGBeV5RUiNF+mWDJerz+ArU9JsLvfGptouuOr2oKhKCdIbeMkdKXLLeM40ZzRujufLHNX3Onh"
                                  + "MeoXiXoVt6+9C8l8vUmSiE2VpMEx8PjQnC7WweHxyTPU+q+LNH6V57xR+7J/jYvEMlDgJbInOHMyL8BGKA5z1AI37Xzz91Uef0w3n+Vt"
                                  + "s0836EeuJYaadwuPnbTw0OFhZhwB+hKd+vdj+p/n/BMZPwxzcSL1lgAAAABJRU5ErkJggg==) }"
               + ".ttcpResume { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl"
                                  + "0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHiSURBVDjLpZPLquJAEIbPQ+Wd8gAZnTirPIGIgiLoxo2iCxeuBJGgogg"
                                  + "q3trLwoX3a9R4QVGxpv/mJCJzOMMwDUVCur+/qv7qfBDRx//EHx/6/b7U6/W0brerdzodgzFmtFotvdlsavV6XfpWgMMyh9l6vabz+Uy"
                                  + "Px0PE6XSixWJBtVqNVSoV+UuBT9i8Xq+EhefhcCDTNOlyuYhvEC2Xy2apVJLfBD7LZha82+1ou91SPp8nwzBos9kQqrJEdF1n2WxWsgV"
                                  + "4v5p1wIIBOp0/KZfLCXi5XIrAGgwGlEqlNFuAm6VDGaUCtLI6HE4RPKOA4QP8QIJEIqHbAu1224BZ+/1ewMi4Wq047BDhcv2iarVKs9l"
                                  + "MCN1uN4pGo4YtwMckBFC+BeMgYFV1kaL8EHvT6dSuIhKJvAQajYYOx9GG1SsOqqr6Bk8mEzGZ4XBI4XD41QKfr4bN5/MpwPl8LspVFEX"
                                  + "A2BuPxzQajeh+v1OxWKRgMPgykc9VKhQKDB5gIRsCsAUiKxLgncOMh/R2kTKZjJxOp024j4PH49GuBpcJmSHCQdPn88lfXuVkMinH43H"
                                  + "GWxItwBP0jLljlBxkHo9H/vZnisViUigU0gKBgO73+w2v12twSHe73Rp/l/76N/5r/AZGRj/URbdFDAAAAABJRU5ErkJggg==) "
                                  + "no-repeat; background-size: 20px }"
               + ".ttcpResume:hover { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/"
                                  + "INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJfSURBVDjLpZNNbxJRFIb7A/wF/A5YunTDrpouujNxY8L"
                                  + "GxEVTVyU11UVjCmEsUUyb1gYqEWuqtqmRWukUimksH6UMHwIW6FCYwWFgYBjKcc6FGam68ybvZuY87/m4544BwNiobiyCQZVJlVnV5FD"
                                  + "m4TfDn/Gj4DVVxgdvBIvv4IwKHafp2MkpF40nuP2jJP1qL0dNeXkLxmDsFYMhfN0TKFujp1mGrQkgSl1QLvtEjZYMpQoPwaM4s7STtWK"
                                  + "sZqIZGBGOJ7+L7Y4CeCS5B7zYBU5Vs9Mj30RJhv1wRHRtpdDESAywLywbM2twVZCh8lOGt+EKsHUZyvUOlPiObrKzG2TurbHYjgENTD7"
                                  + "6B4Vlj8II3noYgI3DCoHPam0iPMncOTi8IQpZNDAHv6Vo7BlLRVDLenN2j+h1iCVwodoGoaXARV2C5fV3NLJoMBmJnXA4rFqjS2DMWOT"
                                  + "aKvyZaOJRCPwxDnIViRjJyiWsudc5ZInBcTRODLB8DcZAAs8dwPiMn/zLstKwii4sr7zUDcxfviboutiBhqTovWLgxBx9Bc6ct8jNpIt"
                                  + "1cLjcegsmtz9DFUo16PeBgPkLiZQ7PvOJwAimyy1IlVrQ7fVh9zABVucHfYiG+56qxR8IM5wwmDJmQyGsgclSkyTIqNntz1aZO8704Bq"
                                  + "1RXJsRK2bHwMiyw8C601FrwaXCTOnizzYXB5x2rH1e5FGV3neHbauejeZUCQDBVYgM8GeE3kOtgNRmHcsMVP293+v8uhjuvsib5l9vk0"
                                  + "9WVyhHU+d3IKd4h7bXPS0zUfdppL/fkz/85x/AR14FVfMwp4lAAAAAElFTkSuQmCC) }")
    );

    // Add the Pause/Resume control
    //$("#chat_lines").append("<span id='twitchtvchatpauser'>");
    $("#twitch_chat").append("<span id='twitchtvchatpauser'>");

    $("#twitchtvchatpauser").attr({
        title: "Pause"
      , class: "ttcpPause"
    }).data({
        paused: false
      , queue: []
      , oldInsert: CurrentChat.insert_with_lock
    }).on("click", function() {
      var $this = $(this)
        , paused = $this.data("paused")
        ;

      // Toggle state
      $this.toggleClass("ttcpPause ttcpResume")
           .data("paused", !paused)
           .attr("title", paused ? "Pause" : "Resume");

      // If resuming, call the old function to insert each queued chat message
      if (paused) {
        var q = $this.data("queue")
          , oldInsert = $this.data("oldInsert")
          , t
          ;

        //console.log("displaying " + q.length + " queued messages");
        while (t = q.shift()) {
          oldInsert.apply(CurrentChat, t);
        }
      }

      return false;
    });


    // Wrap CurrentChat.insert_with_lock() to queue chat inserts when paused
    CurrentChat.insert_with_lock = function() {
      var $ttcp = $("#twitchtvchatpauser")
        , args = Array.prototype.slice.call(arguments)
        ;

      if ($ttcp.data("paused")) {
        var newLen = $ttcp.data("queue").push(args);
        //console.log("Added message to queue.  New length: " + newLen);
      }
      else {
        $ttcp.data("oldInsert").apply(CurrentChat, args);
      }
    }
  });
}); // end of call to contentEval
