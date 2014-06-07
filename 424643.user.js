// ==UserScript==
// @name           Quake Live Race Leaders
// @description    Adds a "top10" command to the QL console to show the top 10 race scores
// @version        1.1
// @author         PredatH0r
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

/*

Use "top10 ." to get the top scores for the current map.
Use "top10 basesiege" to get the top scores for map "basesiege".
You can bind this script to a key (e.g. "P") by using: /bind p "top10 ."

The output mode can be configured by setting _race_outputMethod to either echo/print/say_team/say
If no _race_outputMethod is set, the _qlrd_outputMethod is used, which can be toggled by the QLrank.com Display script.
If neither is set, "echo" will be used.

Version 1.1
- removed clan tag from name

Version 1.0
- first version working with QLHM

*/

(function () {
  // external global variables
  var quakelive = window.quakelive;
  var qz_instance = window.qz_instance;
  var console = window.console;

  // constants
  var COMMAND = "top10";
  var INFO = '"Use \'^5' + COMMAND + ' .^7\' or \'^5' + COMMAND + ' ^7<^5mapname^7>\' to show top 10 race scores"';
  var CVAR_RACE_OUTPUTMETHOD = "_race_outputMethod";
  var CVAR_QLRD_OUTPUTMETHOD = "_qlrd_outputMethod";

  // local variables
  var oldOnCvarChanged;
  var oldLaunchGame;
  var activeServerReq = false;

  function log(msg) {
    if (quakelive.IsGameRunning())
      qz_instance.SendGameCommand("echo \"" + msg + "\"");
    else
      console.log(msg);
  };

  function init() {
    if (!oldOnCvarChanged) {
      oldOnCvarChanged = window.OnCvarChanged;
      oldLaunchGame = window.LaunchGame;
    }
    window.LaunchGame = launchGame;
    window.OnCvarChanged = onCvarChanged;
  }

  function launchGame(params, server) {
    params.Append('+set ' + COMMAND + ' "^7"');
    params.Append('+set ' + COMMAND + ' ' + INFO);
    return oldLaunchGame.apply(this, arguments);
  }

  function onCvarChanged(name, value, rsync) {
    try {
      if (name == COMMAND) {
        if (value && !activeServerReq) {
          activeServerReq = true;
          getData(value);
        }
        quakelive.cvars.Set(COMMAND, INFO);
        return;
      }
    } catch (e) {
      log(e);
      activeServerReq = false;
      return;
    }
    oldOnCvarChanged(name, value, rsync);
  }

  function getData(mapName) {
    try {
      if (mapName != "" && mapName != ".") {
        requestMapData(mapName);
        return;
      }

      quakelive.serverManager.RefreshServerDetails(quakelive.currentServerId, {
        cacheTime: 0,
        onSuccess: onServerDetailsRefreshed,
        onError: function() {
          log("^1Failed to update server info^7");
          activeServerReq = false;
        }
      });
    } catch (e) {
      log("getData: " + e);
      activeServerReq = false;
    }
  }

  function onServerDetailsRefreshed() {
    try {
      var server = quakelive.serverManager.GetServerInfo(quakelive.currentServerId);
      var map = server.map;
      requestMapData(map);
    } catch (e) {
      log("onServerDetailsRefreshed: " + e);
      activeServerReq = false;
    }
  }

  function requestMapData(map) {
    $.getJSON("/race/map/" + map, function (data) { processData(data, map); });
  }

  function processData(data, map) {
    try {
      var method = quakelive.cvars.Get(CVAR_RACE_OUTPUTMETHOD).value;
      if (!method)
        method = quakelive.cvars.Get(CVAR_QLRD_OUTPUTMETHOD).value;
      if (!method)
        method = "echo";

      var i;
      var count = data.scores.length;
      if (count > 10)
        count = 10;
      var renderState = { hasPersonal: false, output: [ ], lineLength: 0 };

      for (i = 0; i < count; i++) {
        var score = data.scores[i];
        renderScore(method, i+1, score, renderState);
      }

      if (data.personal && !renderState.hasPersonal) {
        renderScore(method, data.personal.rank + 1, data.personal, renderState);
      }

      var delay = method == "say" || method == "say_team" ? 1050 : 0;
      renderState.output.splice(0, 0, "^7Top 10 race results on ^3" + map + "^7");
      printLines(method, delay, renderState.output, 0);
    } catch (e) {
      log("processData:" + e);
      activeServerReq = false;
    }
  }

  function renderScore(method, rank, score, renderState) {
    try {
      var isPersonal = false;
      var color = "^2";
      if (score.name == quakelive.username) {
        color = "^1";
        isPersonal = true;
      }

      var name = /* score.PLAYER_CLAN ? score.PLAYER_CLAN + " " + score.name : */ score.name;

      var seconds = Math.floor(score.score / 1000);
      var millis = "00" + (score.score % 1000);
      millis = millis.substr(millis.length - 3, 3);
      var time = seconds + "." + millis;

      rank = rank < 10 ? "0" + rank : "" + rank;

      if (method == "echo") {
        var when = window.formatDate(new Date(score.date), 'yyyy-MM-dd HH:mm');
        renderState.output.push(color + rank + "^7 " + when + " " + color + time + "^7 " + name);
      }    
      else {
        var msg = " " + color + rank + "^7 " + name + " ^5" + time;
        if (renderState.output.length > 0 && renderState.output[renderState.output.length - 1].length + msg.length < 90) {
          renderState.output[renderState.output.length - 1] += msg;
        } else {
          renderState.output.push(msg);
        }
      }
      renderState.hasPersonal |= isPersonal;
    } catch (e) {
      log("renderScore:" + e);
    }
  }

  function printLines(method, delay, lines, index) {
    try {
      if (index >= lines.length) {
        activeServerReq = false;
        return;
      }

      qz_instance.SendGameCommand(method + " " + lines[index]);
      if (delay <= 0)
        printLines(method, delay, lines, index + 1);
      else
        window.setTimeout(function() { printLines(method, delay, lines, index + 1); }, delay);
    } catch (e) {
      log("printLines: " + e);
    }
  }

  init();
})();