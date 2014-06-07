// ==UserScript==
// @name          TimeLine AutoPlay
// @namespace     http://userscripts.org/users/20715
// @description   AutoPlays a TimeLine
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include       *
// ==/UserScript==

$(function () {
  var
    _checkInterval = 2000,
    _skipInterval = 3000,
    _replayInterval = 6000;

  function _checkTimeLine() {
    return ($("#timelinejs").length === 1);
  }

  function _startLoop() {

    function _gotoNext() {
      console.log("Next Event in TimeLine");

      var $next = $("#timelinejs .nav-next:visible");
      if ($next.length !== 1) {
        return false;
      }

      $next.trigger("click");
      return true;
    }

    function _gotoStart() {
      console.log("Replay TimeLine");

      $("#timelinejs .navigation .back-home")
        .trigger("click");
    }

    (function _playForever() {

      if (_gotoNext()) {
        setTimeout(_playForever, _skipInterval);
        return;
      }

      _gotoStart();
      setTimeout(_playForever, _replayInterval);
    }());
  }

  (function _checkTimeLineExistance() {
    console.log("Checking!");

    if (_checkTimeLine()) {
      _startLoop();
      return;
    }

    setTimeout(_checkTimeLineExistance, _checkInterval);
  }());

});
