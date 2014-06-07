// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

start = function(groupName) {
  commonInit(null, groupName, function(members) {
    var offset = 0;

    // apps[appId] => {name, price}
    var apps = {};
    var curr = {};

    // members are only cached if the group has less than 200 members.
    var cacheMembers = g.supportLocalStorage && members.length < g.cacheMembersCount;
    var sortTimer = null;

    function processCurrentMember(data) {
      processNext();
      var url = /^\d{17}$/.test(data.profile) ? ('profiles/' + data.profile) : ('id/' + data.profile);
      var linktext = '<a href="http://steamcommunity.com/' + url + '/" target="_blank"' +
        (data.star ? ' class="star"' : '') + '>' + data.name + '</a>';
      for(var i = 0; i < data.games.length; ++ i) {
        var game = data.games[i];
        var obj = $('#g' + game);
        $('.cnt', obj).text(parseInt($('.cnt', obj).text()) + 1);

        $('.ppl', obj).append(linktext);
      }
      if(sortTimer == null) {
        sortTimer = setTimeout(sortStuff, 0);
      }
    }
    
    function sortStuff() {
      sortTimer = null;
      $('#games > div').sortElements(function(a, b){
        var pa = parseInt($('.cnt', a).text());
        var pb = parseInt($('.cnt', b).text());
        return pa < pb ? 1 : pa > pb ? -1 : $('.n a', a).text() > $('.n a', b).text() ? 1 : -1;
      });
    }

    function checkGameInfo(data) {
      var toFetch = [];
      for(var i = 0; i < data.games.length; ++ i) {
        if(!apps[data.games[i]]) {
          if(g.supportLocalStorage) {
            var storedObject = localStorage['game-' + data.games[i]];
            if(storedObject) {
              var obj = JSON.parse(storedObject);
              apps[data.games[i]] = obj;
              createGame(data.games[i], obj);
              continue;
            }
          }
          toFetch[toFetch.length] = data.games[i];
        }
      }
      
      if(toFetch.length > 0) {
        curr[data.profile] = data;
        io.emit('games?', {fetch: toFetch, profile: data.profile});
      } else {
        processCurrentMember(data);
      }
    }

    function updateCounter() {
      document.getElementById('peoplec').innerHTML = offset + '/' + members.length + ' &mdash; ';
    }

    function processNext() {
      var e = members[offset];
      if(e == null) return;
      ++ offset;

      if(cacheMembers) {
        var storedMember = localStorage['u-' + e];
        if(storedMember) {
          var timestamp = storedMember.substr(0, 13);
          if(parseInt(timestamp) > g.now) {
            var obj = JSON.parse(storedMember.substr(13));
            checkGameInfo(obj);
            updateCounter();
            return;
          }
          localStorage['u-' + e] = null;
        }
      }
      io.emit('?', e);
    }

    io.on('u', function(data) {
      checkGameInfo(data);
      updateCounter();

      if(cacheMembers && !data.ignore) {
        var timestamp = new Date();
        timestamp.setDate(timestamp.getDate() + g.cacheMembersInDays);
        localStorage['u-' + data.profile] = timestamp.getTime() + JSON.stringify(data);
      }
    });

    io.on('games!', function(data) {
      for(var i in data.games) {
        apps[i] = data.games[i];
        createGame(i, apps[i]);
        if(g.supportLocalStorage) {
          localStorage['game-' + i] = JSON.stringify(apps[i]);
        }
      }
      var d = curr[data.profile];
      curr[data.profile] = null;
      processCurrentMember(d);
    });

    function createGame(id, data) {
      $('#games').append('<div id="g' + id + '"><a href="http://store.steampowered.com/app/' + id + '" target="_blank"><img src="' + data.image + '"/></a><div class="r"><div class="cnt">0</div><div class="pr">' + data.price + '</div><div class="n f"><a href="http://store.steampowered.com/app/' + id + '" target="_blank">' + data.name + '</a></div></div></div>');
    }

    updateCounter();
    processNext();
  });
};
