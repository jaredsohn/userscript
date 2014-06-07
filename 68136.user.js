#
// ==UserScript==
#
// @name        Facebook Mafia Wars Autoplayer
#
// @namespace   mafiawars
#
// @description Autoplayer for the facebook application - Mafia Wars
#
// @include     http://mwfb.zynga.com/mwfb/*
#
// @include     http://apps.facebook.com/inthemafia/*
#
// @include     http://apps.new.facebook.com/inthemafia/*
#
// @version     1.0.13
#
// ==/UserScript==
#
 
#
 
#
var SCRIPT = {
#
  url: 'http://userscripts.org/scripts/source/64720.user.js',
#
  version: '1.0.13',
#
  build: '50',
#
  name: 'inthemafia',
#
  appID: 'app10979261223',
#
  ajaxPage: 'inner2',
#
  presentationurl: 'http://userscripts.org/scripts/show/64720',
#
  controller: '/remote/html_server.php?&xw_controller=',
#
  action: '&xw_action=',
#
  city: '&xw_city=',
#
  opponent: '&opponent_id=',
#
  user: '&user_id='
#
};
#
 
#
// Load the iframe
#
if (window.location.href.match(/facebook/))  {
#
  // Get FB name
#
  var fbName = document.getElementById("fb_menu_account");
#
  if (fbName && fbName.firstChild)
#
    GM_setValue('FBName', fbName.firstChild.innerHTML);
#
 
#
  checkLanguage();
#
 
#
  var iFrameCanvas = xpathFirst('//iframe[contains(@src,"mwfb.zynga.com")]');
#
  if (iFrameCanvas)
#
    window.location.href = iFrameCanvas.src;
#
  return;
#
}
#
 
#
// Handle Blank pages (click back if encountered)
#
if (!document.body) {
#
  return back();
#
}
#
 
#
// Register debugOnOff with Greasemonkey
#
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Turn Debugging Log On/Off', debugOnOff);
#
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Clear Saved Values', function() { clearSettings(); loadHome(); });
#
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Display Stats Window', function() { toggleStats(); });
#
 
#
//
#
// Define Spend object and methods.
#
//
#
 
#
// Constructor for Spend objects.
#
function Spend(name, spendFlag, startFlag, keepMode, keepValue,
#
               useMode, useValue, icon, burnFlag, lastFloor, lastCeiling) {
#
  // Initialize GM name containers
#
  this.name = name;
#
  this.spendFlag = spendFlag;
#
  this.startFlag = startFlag;
#
  this.burnFlag = burnFlag;
#
  this.keepMode = keepMode;
#
  this.keepValue = keepValue;
#
  this.useMode = useMode;
#
  this.useValue = useValue;
#
  this.lastFloor = lastFloor;
#
  this.lastCeiling = lastCeiling;
#
  this.icon = icon;
#
  this.canBurn = false;
#
 
#
  // Calculate the spend limit
#
  this.getSpendValue = function (maxVal, spendMode, spendValue) {
#
    switch (parseInt(spendMode)) {
#
      case SCHEME_PERCENT: return Math.round(maxVal * parseInt(spendValue) * .01);
#
      case SCHEME_POINTS: return parseInt(spendValue);
#
    }
#
  }
#
}
#
 
#
// Update the upper and lower limits of spending
#
Spend.prototype.refreshLimits = function (maxVal, canLevel) {
#
  // Subtract one or else spending will never run.
#
  this.floor   = Math.min(this.getSpendValue (maxVal,
#
                                              GM_getValue(this.keepMode, 0),
#
                                              GM_getValue(this.keepValue, 0)),
#
                          maxVal - 1);
#
 
#
  // The max value is the limit for ceiling
#
  this.ceiling = Math.min(this.getSpendValue (maxVal,
#
                                              GM_getValue(this.useMode, 0),
#
                                              GM_getValue(this.useValue, 0)),
#
                          maxVal);
#
 
#
  // Check if burning is enabled
#
  this.canBurn = isChecked(this.burnFlag) && canLevel;
#
}
#
 
#
// Toggle spending accordingly and log changes
#
Spend.prototype.toggleSpending = function (maxVal, curVal) {
#
  // Log any change to the floor.
#
  if (this.floor != GM_getValue(this.lastFloor)) {
#
    GM_setValue(this.lastFloor, this.floor);
#
    if (this.floor > 1) {
#
      addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> ' + this.name +
#
               ' is set to keep above <strong>' + this.floor + '</strong>.</span>');
#
    }
#
  }
#
 
#
  // Log any change to the ceiling.
#
  if (this.ceiling != GM_getValue(this.lastCeiling)) {
#
    GM_setValue(this.lastCeiling, this.ceiling);
#
    if (this.ceiling > this.floor) {
#
      addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> ' + this.name +
#
               ' refill level set to <strong>' + this.ceiling + '</strong>.</span>');
#
    }
#
  }
#
 
#
  // Determine whether spending needs to start or stop.
#
  if (curVal >= this.ceiling && !GM_getValue(this.startFlag)) {
#
    GM_setValue(this.startFlag, true);
#
  } else if (curVal <= this.floor && this.ceiling > this.floor &&
#
             GM_getValue(this.startFlag)) {
#
    GM_setValue(this.startFlag, false);
#
    addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> Refilling ' + this.name +
#
             ' to <strong>' + this.ceiling + '</strong>.</span>');
#
  }
#
}
#
 
#
//
#
// Define Player object and methods.
#
//
#
 
#
// Determine whether two player objects refer to the same player.
#
Player.prototype.match = function(player) {
#
  if (!player) return false;
#
  if (this.id && player.id)
#
    return (this.id == player.id);
#
  if (this.profile && this.profile == player.profile)
#
    return true;
#
  if (this.profileAttack && this.profileAttack == player.profileAttack)
#
    return true;
#
  if (this.attack && this.attack == player.attack)
#
    return true;
#
  return false;
#
}
#
 
#
// Update this player object's properties with the properties of another.
#
Player.prototype.update = function(player) {
#
  if (!this.match(player)) return false;
#
  for (var prop in player) {
#
    this[prop] = player[prop];
#
  }
#
  return true;
#
}
#
 
#
// Constructor for Player objects.
#
function Player(name) {
#
}
#
 
#
 
#
//
#
// Define PlayerList object and methods.
#
//
#
 
#
// Get this player list's array of player objects.
#
PlayerList.prototype.get = function(forceRefresh) {
#
  if (this.name && (forceRefresh || !this.list.length)) {
#
    // Load the list from storage.
#
    var ids = getSavedList(this.name);
#
 
#
    // Convert the ID list (strings) into a player list (objects).
#
    this.list = [];
#
    for (var i = 0, l=ids.length; i < l; ++i) {
#
      var p = new Player();
#
      p.id = ids[i];
#
      this.list.push(p);
#
    }
#
  }
#
 
#
  return this.list;
#
}
#
 
#
PlayerList.prototype.set = function(list) {
#
  if (list) {
#
    this.list = list;
#
  }
#
 
#
  if (this.name) {
#
    // Build an array of player ID's.
#
    var a = [];
#
    for (var i = 0, l=this.list.length; i < l; ++i) {
#
      var player = this.list[i];
#
      if (player && player.id) {
#
        a.push(player.id);
#
      }
#
    }
#
 
#
    // Store the list.
#
    setSavedList(this.name, a);
#
  }
#
}
#
 
#
PlayerList.prototype.add = function(player, max) {
#
  if (!player) return false;
#
 
#
  // If the player is already in the list, just update it.
#
  var l = this.list.length;
#
  for (var i = 0; i < l; ++i) {
#
    if (this.list[i].update(player)) {
#
      return false;
#
    }
#
  }
#
 
#
  // No match. Just push it into the array.
#
  this.list.push(player);
#
 
#
  // Shorten the array if it has become too large.
#
  if (max > 0) {
#
    while (max < this.list.length) {
#
      var player = this.list.shift();
#
      DEBUG('Removed player ' + player.id + ' from ' + this.name + '.');
#
    }
#
  }
#
 
#
  return true;
#
}
#
 
#
PlayerList.prototype.remove = function(player) {
#
  if (!player) return false;
#
 
#
  // If the player is in the list, remove it.
#
  var l = this.list.length;
#
  for (var i = 0; i < l; ++i) {
#
    if (this.list[i].match(player)) {
#
      this.list.splice(i, 1);
#
      return true;
#
    }
#
  }
#
 
#
  // No match.
#
  return false;
#
}
#
 
#
PlayerList.prototype.indexOf = function(player) {
#
  var l = this.list.length;
#
  for (var i = 0; i < l; i++) {
#
    if (this.list[i].match(player))
#
      return i;
#
  }
#
  return -1;
#
}
#
 
#
PlayerList.prototype.debug = function() {
#
  var l = this.list.length;
#
  var str = 'PlayerList name=' + this.name + ', length=' + l + '\n';
#
  for (var i = 0; i < l; ++i) {
#
    var p = this.list[i];
#
    str += i + ': id=' + p.id;
#
    if (p.name) str += ', name=' + p.name;
#
    if (p.level) str += ', level=' + p.level;
#
    if (p.mafia) str += ', mafia=' + p.mafia;
#
    str += '\n';
#
  }
#
  return str;
#
}
#
 
#
// Constructor for PlayerList objects.
#
function PlayerList(name) {
#
  this.name = name;
#
  this.list = [];
#
  this.get();
#
}
#
 
#
 
#
//create data uris for mini icon usage
#
var searchIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVR42mNkgIJ12/cacLCzlTIwMtkwMzNx/Pnz58qfP3/n+Ls5LGfAAxhBxMZdBxKFBflnqirKs4oKCTAwMjIyfP' +
#
                    '/xk+HmvYcMj54+X/n9x4/oCD+Pv1gNWLVlp6GYiMhJQ20NVm4uDoTMfwaGf///MZy5fIPh9Zs3tf5uji1YDdi67/BSaUnJKDUFGQYmJiaw7SDd//79Z/j77x/Di9fvGO4+ePTh4+fP4mE+br8wDNh+4OhDTRVlOU' +
#
                    'F+XgYOdlaIAUDbQZp//vrN8OrtB4b3Hz8yPHzy1BhowDkMA3YePPZCR0NNnJebk4GdlRXsiv9A+PfvP4Yv374zfPryjeHdhw+gsLAK9nQ+js0Lewy1NZ15ebgYWFlYGFiYmcDO//P3L8M3YEB+/faD4eHTp3+ePH' +
#
                    '8pFuXv+R7DAGD0hasoyK1QlkeEwf//EBf8+PWL4e37jwy37z9Y7uNsF4UvGherKcnHyEtLMjAzM4MNALng5Zt3DM9fvWa4/+BhSWyIfy9OAxav28LEy81VwsvDUyolLioCcsW7Dx9/vf/4adWLl6+vXzt/qmXz+r' +
#
                    'WHGJmYfG7evPkFwwAYmL96IwsTI6MG0BXsQFfcjg3y+QQSNzO3OMzLL2Dz9OH9o0A/ety4ceMLVgNwAR1tbT5efv4dXDx8lk8fPTgKFPIEGvKZaAMghmgBDRHAMIRoA3AZQpIBUEN4gYbsBBny8O7tvSQbAA0TXg' +
#
                    '4u7g2fP33YBwCb9/irlkMH+QAAAABJRU5ErkJgggo=' +
#
                    '" />';
#
 
#
var lootbagIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhEAAQAIQfALq3nMG8k8TAmbSvfMnFoTg3LYmEWhMSDaumeM7Lqrm0hNXStXl2Vnp4ab65jaeha4+Nery2irexgmhnW9HNrsvIpdjVurGrd9fUuktKQcK9otPQsrOwkiAfHG' +
#
                    'poSv///yH5BAEAAB8ALAAAAAAQABAAAAWB4CeOk1Y0UHeMrHgAUZU4Wds2gcKo9thxl0ePNUlUKoPVEGLZYDaBZK9gsTwJgcig11h4KQSHQiJscSjoRFgi2bIOsoRxPXCPDoQ4QSAeXFp4BIICAQ5tfywFAouEDh' +
#
                    'FtBm8Bk4xZCgoPSh8ZARcKk4UKjgiaHyoFDAaqBh4MpCIhADs=' +
#
                    '" />';
#
 
#
var tabSelectedImage =    '<img src="' +
#
                    'data:image/gif;base64,' +
#
                    'R0lGODlhZAAyALMAACIODyUQESYTFCkWGCwZHTMgJDckKDAdIDooLT4sMUw6QEY0OkEvNVJBSFlIUGFQWSH5BAAAAAAALAAAAABkADIAQAT/sC3EWBNFJYDcOoiiEMbSFIWjHJaGII9RxgwrURamcR4okiaUyuYK' +
#
                    'jUqn1KqVeMVmNYbJ0FQMDonEwKBgFBAJxRexMGQUBikDYTaREI2BoEsILxbX7Lb7DY/LZ2kLCRlgYi+AIoJrBiEFd2ZkCAECBgcEcgQFVwgFJCgElwmYLwcFZgaahAShCAICCQYCpjKvmpyeZp6ipAi0p5+7db0H' +
#
                    'ja0yB7SYBwIAAQMDAACsAAKYr9YBlATbBALQ4M6Y1dfglNDS1NaZ39De3wTOB+AFzNzb3fDO6OuvA97OnDWrNlBAAGmUEBqsdlDbQYHSXgWk9DAhwYgPJw60+CqjRYoM/52B5PjQYMWSKKVVU1nwpEKWCDOKxEgz' +
#
                    'IsyQDp8dHLgSp0M5DYNqQ8iy4cKZF0dKPBgt6VGVRQW6dGq02c6SVhdSstpzqUMpGBoQKjHilANoHgiEKJOAgYJOCRw0aqAhwR25BNwyCFBA7KkFZQ2cHZB2LRW3cOVqKayALeICcefWvYOAhKVTNcZUNsXgm4Yt' +
#
                    'TU6lQcGlHpjKjxIUS2MKsqUXmwt0HvCZSicZXk4doq3FtujcXGSUOvBWLZ5vBQyy4vavACVP1i6xGrDpyqblxTDVu2Runjvmmp7Ho27vlvVvpryFWk5dDvT1clIFWI9wQNWITeXss/pMGrqt+p3jX/80OglUUFML' +
#
                    '6feNSd80BI1VAfYHwH8KQuPgTUiRJNVQBfHUElQZ8TQURDiZtNNLUm14IolamURUTy+O2GJDPYE0Y0Ai8hQQUjeuOBRFRtG4UZAYNmMcA/8MkYAEjYRRhwIN1KGCIGKs8UA9DsglBZQLHJnkCkuWYciTUcaFxpay' +
#
                    'wTBCGGVOiaaVWGrJZTENvJCFGJApYI1YT04wQZRpLCECG2GIEWgAcMgFhh957jmKHZIA6hYLCzjwaGORkjCpW2+98FYbnbwVCwHFhdDJF3gccMcjfNi1AGQZaAHZAp5VRgYDMhSi1lsokHHFqoB54Wqadv36arCz' +
#
                    'vkrIEm21ooX/KQl8w0Zl1CXwzKiNyGAJcKOk+RquyTRiTRZYRKKdtQNgywYy3GriRSrZskvaKFRcQsZrbLBiSSjJzFePHNS9YoY1qWByi71bbALCN5ZckQw0lvg7D3ICJ0fCdAerJUclFhfcXDUyBGBKMZnMo4kt' +
#
                    'rGwTzSyZYByKcvZ4go47r3jyzCXwcLNONfOIFx3GzmlyDXusMDOfN//YckA6/+j0jTgGLRh1fvbNB/CDBvVMjkHmPEOgN+d0ZPXTXpNzdTYDalMOUGz/Y98sHemHokRO8YdgVnS7WCBILLZkIjYi3b2UV3enqI3d' +
#
                    'KoU4VVcfznQ4iiMmXlPkBb0EZED2RdQ4/+Wa17SjQzHZJFJQG5VO0+OQjyhjTKRbrvePH+GN+kc8BgVi6CUSWXuGp8s0lVac4w58iJrndFXqk4vY+eEOKY8U8iGRuKNXHjlP/U0WAaBFB7G41SULDsyS1pJoZOEA' +
#
                    'nWXStYAUDXhBglgDcB/o9wyEf8D4dFERF/p1NIB/+fszQAPS1xj2MeB9FqgBFeJAALpcQQKoQsMLGmCKAUKGLmgQjGke4IDKJLAYS/qHAw8AQTJIEA4VPAH5DgGYRqCwLyrEoAwcYBo+qUY2KyChFQSIK9kAKi6E' +
#
                    '6AGnYHMCUg3BAA+gYCoAkwwH8tAMFiABEFPwgSGyIYpUsBQVWTCoCf+iQAF44RRr+oKkELgvA6EQgQ+aQAW2CEYGUCqLBIrhlly0L3580MQIiLOCELDRLraxVBr76II2UuGNAhTVq8yABeJ0wk5StAJxVEOGLMQi' +
#
                    'g4CJ4BHaZ4ZifeEtIABDJK+gARAMIgvBIQudSllJVGKShYPoS2WC4yssUCAUayAlvnDFALtcwi1P0kNqPPGIf6zPXc1iAQJ0GUpe+jIva8pgM9PwTGCGgVxiCGW3rPEqFKTLFbKxBLS0Q7/bZEsDE9CErwiQzkNW' +
#
                    'JgBNwAC4xkmdcoqGDXWCDDlxaU42GAo2BywXIS4BAu34YhfL3MIy61APbdUjL5jI1j/chwoQyGb/E19IDwggttCBOvSXmFDoPzyKDNOcAgzfiOdDTyYyA0DDFCBjRjGISQJrnOIKjNxMJwjq0lm4NBTVgWklZGoG' +
#
                    'oclCEy6dKVFpetSbngIUDKXOZZwhs24841+suE4ooOHNZEjHZMnQlxxMcTTnWIM5WL1FVrmqsLD+Q61bpc51TMHVoplnGdcQmX2ucLWlzUKm73kYUHrWnre+AxPaIOzE/uHXl1nnZiYjD88Aq55QaCNpDrOqRPrh' +
#
                    'tnPEAwCXmNDaypEcro12HysrB2L1cdbLIk1mL31aaN3WDvVEg7aJbcY/zHaOzFmDaV4DhzX8AZ5wLEhte+1ZO3YSj/nYIrVA/xnuM0Ia3Ae940EWgsdBrnFcfygkbFKjCDcmdLbMbWU/wQXQdxcEFPXqY2x77Yhy' +
#
                    'mHK1y0qNQimaEN5cR6AAEa4i5iXbiPx7lI0V7hkmQrBA+rvfyy5PQVGRHoJSMru7Ne8oMqoITxD0YAwTKHrA8xBTdLcTHf2OSD66z/NgZGLhnc5FjgPdSGo0pNHBpHrC07Dk6pY8qGC4xtFLCOWEouMXLQUisYtR' +
#
                    'VPgmo6yo+McigbHi8ttkwx05c1QxUH1Cx7clB294NznK9aDiZeL5xMzZA7PohOzkHWPYzMPjEO5gt7rELe5DxqPxhkYnZyQnWHU+sZ5QwvwhGNfII9mj8FOX+UNnQvNZRfwx8p07F+Q65+12EV705ITEks1xOimR' +
#
                    'E12G8GwiPU8oSD/ysZ3nhmofla7Vps4J74b0O9ZF2XU5+duqbcwjW8/OyYP+9Z5BLI0IAAA7' +
#
                    '" />';
#
 
#
var playIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR42l1TSU9TURT+Xt9UaIHWAqUMJY2tSIwS41QEjXFhTFy54B/wF9iUhAUJxAQTt0RJkJUxLli6c6ELNcTEKV' +
#
                    'GCYShWfNRHh1faN7aeexkinuTm3pt77ne+851zBPxnW1tbCVmSxxVVuU3XRKPRAK0N0zRf2ba9kEwmN/71F44O2WxWlCRpGj5x4sPXVXk9m0OlWuVvweZmJOLduDiYclzbmnNddyqVSnnHAD+3t0VFUV9ktT/336' +
#
                    'x8RGtLEKqiwOfz0WsD9XoDpmWhXNnH6OUhREPBZWIzxkA4gKZpM7/+FDMrn78hEg5BlmVIokgABwQZgOu5sG0HeqGIKxcGEQ6os4lEYlLY2dlJSIq6+vL1e7k9HIaqKvyzKAogLQ4B6nBcD7bjwLJs5PcKuDNyya' +
#
                    'ntVwYEXddn1nO7Gb1ooCXQTAAyOVl49vw5boyO4kwySYkKTEh4Xp1SsWHsVxEJtaA7HJwVjLLx9tPaZjrQ5Kdsma+AKok3//gJP/f39+N6Oo1otJPfD6uCas3E2XjXO8EwjN9ffmSjHadCqJkWahTdILGWlpag+p' +
#
                    'sQaGmjyC66OtsxfO0q2iMRNFGa+b0iBuJdGgFUfn/fzEXDbUEuFqNXKpex+HQJ/qZmBFpD8FwXsc4IRobTiB0yKZQMnO7u0IRKpfJ2bVtL+xWZq65QBaq1Kh48fASBysg0uHVzFD2xGC+pRZWoNw72eEfonVAsFm' +
#
                    'f0cjVTpsgqfVZkCY5jY35hEffu3sHQ+XNcPIdY2I7LK8F2JnhAwqyQz+cTlOvq6lZOZgAyAYhEkTURY8PMozK6ngeXgdCybBepvi7HKJcGeKcUCoUZ061ncprOGRz0gY/netRIRyCMQQ/pIXjObCwWm+Qeu5omqn' +
#
                    '7/i5rt3s/t6jy66PsHoNHgzcRSYZ9FeMuWaY71xePe8TAxEFlRpiVZmdBLhlwy9nn3MZMlEW3BAMKtAceq1eZsx57q7e31TkzjkTFNaBbGaTKPx5lsg4aHjzPRPjHOfwGdsIJvkkplkQAAAABJRU5ErkJgggo=' +
#
                    '" />';
#
 
#
var infoIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADPUlEQVR42l3Te2wMQRwH8O++aTV1WjmttueupSIedWiaqJL7QyQETdoQJyIIEsQrErlS0Wg9KooQkYq/LogSCeKt8Q' +
#
                    'wSjcQj+INzrfbu2nu0d1drd293ze4FZZJNdnZmPzO/38yPwn/N5/PbOY5dJwiCS9N1u64DFHSfKIrtsqycmzChxDd0PvX7xe/3MzTNNiRF7PK2dXDPX/kQjSbNsVGjMjG73IEVNWUKz6aaNVWtLy0dr/4BOju7GJ' +
#
                    '7n224/+VZ9/OxjWMgP3DAO+u9VyIsiKeiPDmLr+irMK8+7JstyrYGYQE8g2HjnWaen5fxT5FizkaJpVDpt2La83ASOnm7HK38ErKYhHBzAtjWVqHKObhpf4qijurt77AmJ/rx4y0UuZ8xIKAwNjaYwf+Y47HNXmE' +
#
                    'B9yz087IyCUTVwBIkE+nGlpVYRKKmUCofDjQe8bzztb/xghwsAAUCArEwBedkZJhDoSyChpACNxKKqUEUZrrIibK2e2ETF4/EX5Z5bFRkCC8gyARhIZKJragFOrp1tAjsO3ca9njgEhnRSGiDwEKUUHu11vaRiA/' +
#
                    'GgY/t1q91hhdY/gO+RQYQHFbjnlMC7ea4JrG+4idYPQeRm8CjIyQRtyYbvSxAfDy0IpYGdN6w2xxh86fuBRKTf3Ka7shjejZVp4MAttH7qI6ExyMrNRnFuJvxfA/h4kADJZPKFs/5uRYIbhkDSCIGEQm6P25kP7+' +
#
                    'oZaeDwfbR+F83cIKUiL4tHliziuWceCSEWa/Rc+eA52xGERtFmDozHPbMA3pXT0kDzwzRATsDYHa1r2OC0om5hcRPV29tnj0jU52n773Myy5nbBLkH7lmF8K6angaOPEBr1480oKngFQUde1zKCOpnqXmRItFY46' +
#
                    'XXQc+my28BlgBkJ0vL8nGiZooJ7D7zFBe7CUBWBjnOU8umYsmkkU2FBfl1JhAKhRheENouvA5Vb7/6DrJx3hQ1pFR0My886R4jaM1kyzVJkmpttiL1TzEZCMvxDb2ivuvko2/czfdBdMVEc6zQMhyLJluxucqmWF' +
#
                    'i1OaXI9UVFhX+LaWgzcmKUM8dxLkXV7cY3htJ9pJTbJVk+NzY/759y/gUON2pDlqRajwAAAABJRU5ErkJgggo=' +
#
                    '" />';
#
 
#
var attackIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhDQANANU/AKJRAP/LNP/dNP/KIv2uAMmHAOyXAP/pfP/eQ7VkAfisAEA8LOWNAP+9CkgkDeejAIhIA92OAP/ODmtEDf/EAf+9ADErHF02Df/PE/y3ALVrAGMyCv/mhk9LLy' +
#
                    'ccFhsYGf/TJaeRO9PCav/fYqeWLP/UE//hRv+0DvC6QqeDDrWiHPecAP/GCtGeAoVXCvDcXKebSdOwWLF3CP/ic//sdvWnAIRuDWMtB3toDXYuAnU/CqJgAm9KDXBZDXtrLf///yH5BAEAAD8ALAAAAAANAA0AAA' +
#
                    'Z3wJ+wAxP+FiqjkkY6vnBK48HkEwl6xo4UIUCUbEJLaMbhjEASTBrd+qUGgQGLQs8UIB6hb9Co+CsPOx9CCzEBDRmJCg8FPEcoJzU1BAQ1ERo7Gi4yExc8BgYMEQk3Dg4bSisJEAkADlFCDDkfF66wFgl5PzqoQk' +
#
                    'EAOwo=' +
#
                    '" />';
#
 
#
var influenceIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhEAAQAOZiAOPt8dDg5sLU2gwODlhbXCstLbTJ0VhcXa66vtLg5ePu80dLTNXj6cra3svZ38DT2snX28vW2ubv8sfX3ePt8LHEzNbk8SMnKFRdYLnIztPh6A8PENvj5rTGzX' +
#
                    'J7ftnn7ODs9rvP1tzp797q7+rx9MbV2dLd5JqrsdTh5xkcHNLh5+Tx9Nbh5s3b3t3q7qe5wWxydIaPk5KYmdvl6NTj6cXX3XuGiu709svc4+Pv82BqbcLV3CgrLMHT2d3q9NDc4NHh7d7r8Mzb4Ts9PuXs78LQ0z' +
#
                    'g/Qu33+cfP0uDr7rnK0N3o6q25vtbk6NHh5/D3+tPg5d3o7dfl7eTs79Tj5dbl6g0ODg8PDwsMDeTv89fm61FXWOHt7tfj59He43uFicfY3bjM1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
#
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGIALAAAAAAQABAAAAd9gGKCg4SFhoeIiYqLRkVgEw1hVAJSAUoLglZfNUsUFgYCXCsgJEktHlg6TT8RHE' +
#
                    'APKCMvJllHUzMYAzE9XV4+OwBOGVFBTwAygzYaATQqCh8SDgk3MIVbVSFCIi4sJ0QEhwcQUAxaFUhDiTwlOTgdBYsXCEwpi4IbV/b6+4EAOw==' +
#
                    '" />';
#
 
#
var closeButtonIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA2lJREFUOMu9VF9oW1UY/917zv3XJC7p0j4YFTTS2RJwrB' +
#
                    'AGe9hgT0P6KlTX+DBh6WAi00otDhZlXcKwBspo+9i8+DSHvraQMlYznViVjuYhbWY3blNzk9zk3mubP/deH0buGoJuE/SDD8453+/8zvedc74f8B8Y8zTAuXNnjxeLlUy1quPQITf6+nzs0TePvHrxg8tbz0WamJ' +
#
                    '4KLqd/zDWbLbAsC4ZhwLKsE7csC5SyOH0qTD759Kr1j6Tl4n3mw0tfvLb9sJAjhIBSCkopCCEghDg40zRhmiZarRYCL/qHk1/Gai/0vp5rx8lB0sJuJbj9sJDjOA6iKEIURfA8D57n0T6EEAKO45y5pv15/s7qD1' +
#
                    '+vrf32qM3j1HQ9/lnP79s7OUEQIEmSQ0gpBcMwYJjHRbXHlFLwPA9RFFFUqpmvZmLHuzK1wTUIoRBFEYIgoF6vIxwOY3BwECsrK8jn81AUBW63GyMjI9B1HYZhgGVZsCyL/AP5/Ww2G3MyTc5ccds2IAgCbNvG7u' +
#
                    '4uNjc3kclkMDo6WolGo7BtG5IkIZFIYGhoCEtLS5BlGfV63bnzuRvXRCfTQOAl6Mb+ZcuyUCwWUSqVYFkWFEXB1taWNDU1hWw2i0gkgmAwiEgkgr29Pei6jmazCUEQwPM8Go3mt3fv3pMpABQVtW6aJsrlMnRd7/' +
#
                    'gey8vLWFxcRDwerwDA2NiYr1arOXFVVfE4sQBUVbsHgGEBoNFoQlVVGIbhlHLQ0+k0PB6PD4BvZ2enK65pGiqVCpot68nrM4wNTdOcRzrofr8fs7OzmJ+fhyzLSKVSXRhBEKDrOjhKnpD2+b3HKKWQJKnLk8kkCo' +
#
                    'UCUqkUpqenEQgEMDk52YXjOA79/d6TAEABIBwO/bp+P4eenp6OdhwfH8fAwACi0ShcLhdkWcbc3BwmJiawsbGB1dXVjvs/dvSN7502fZS/I7z97sS+1+sDx3EOKBQKwTAM5PP5js2hUAgAsL6+7qxRSnDz5jdMR+' +
#
                    '8nZ65wK7d/abhcrn8ld2+dOeF95+yFapegfPzRRY9a3asdFI9nsYWFhQ4e2iF5iet2PH71sFLSS+1ef5q98nL/8DPp6Xe3Frmf1nINy7L/lowQFrHY58xzK//t9C32wfYf4XJZy+jGPtwuEb29nuHIe+d/xv9tfw' +
#
                    'FATFKTqjXpOQAAAABJRU5ErkJggg==' +
#
                    '" />';
#
 
#
var updateGoodIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADaElEQVR42lWTX2gcVRTGvzv/dibZmezOrLObmNrGVttKpLKWKGit+NLaB4sU8tAiRPDBFhUf+iBRKiKhvolQoQUtTf' +
#
                    '8kuytRWzRUCqVYaggl2+oiphZTXKPtNknTpMnu/Llzx7MRH3Lh4zAP3++ee843DHSGhkuFqVr9BYbYA2N+QpM8x1R8XU94kqZT1b2krvkJRfF8HvkiijwWR35jaWmQNQFfnhkZO1SafjZmEiAxhFYSjZ6tMJgAEx' +
#
                    'ECHkDwEHJI4hHUiGPgGRPJxemDK4Avhr79vXCdPyboKwaDLMtofXoLJElCJGLUI4G7YYT7AYfwSVQ/zSsQ1V/eXgEcOX129psbzCEHdFmCSsp0b0TC0CHiGB4Blghwm4z1kANBhE+eUnG3MrafDRdL0m0pFZybjG' +
#
                    'S1ebMiQVNkuOsfgZm2/uuAzA/IPEO3/+OH8BshjvYYqJYvv9kE2FejzNzx6x6ycoyMocHUVeTW5JDrdNEg81w9wEw9xPSyjxsk7oX4cWcqrl678kYTsOFSmL15fIrBqS/DSahIkpxMCu1r22mAAvfJcK8RoEZ1iq' +
#
                    'qgemVHMvrr14nX2VDxq57vvNz4cE1H29IismS2mpBWA+lcBhIEnnMDLPgT8MI5xMwm2Gb0dYL/OVl5jRWKpZeH5t3R72cUaIGHtKIglVBgaCpSTht6n5jDscmjELRShYbLaaCm3IL3N+0V83/c6WWFQnHfpXup0+' +
#
                    'M1AZ/eu1Bv7lxAp430vdiB0fAIHB1IqYBKMelp34bnH34JBy4exscb+/rZ1yMj74Rh+FlM64qoYU3TEEsKtQuI9Q8wPn8WdsJBLDzYRgZv5T/Cqd9GcPXOOWzLvPozK5fLXRSFrUIINwiCbOD73Zzz3SRpYc0tCs' +
#
                    '9F9G4+hgu3ziCf245lruFUpR9dbRy28srsSpD+Pz+cP/+453mXVU11FVkB1i7i2uwAut092LmhfyVUAz/tgywmaB4m8g99UF4FKJWK76mKethqs5BOpeFkbZSqB+g5N7EltxeR1I3K3/30v4GG/CR2dR56dxVg8M' +
#
                    'SJdclk61jatnN22obR0gLZCnBh+kMKUgVcyFBYBDeZx/aOg6OMa7tXAZrn5OCgbVnWftM0dxiG8ShjTDOSiZqcWRTL4WyHqblVS2k/yUPxeVfHJv4vpD6OQ8IRFmYAAAAASUVORK5CYIIK' +
#
                    '" />';
#
 
#
var pausedMessageImage = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAAAaCAYAAACuJFCeAAAAAXNSR0IArs4c6QAAFUBJREFUeNrtXHmUVcWd/uq+1/2abuimabohNIoedfQ4J4K4EI2OC1lm0FEmBh0wEkVFMo7GYH' +
#
                    'I8QYUwrSGbtAnJETWEwTVEyWQCRGMSgyK7oiBi3Gh6ofd+3f2Wfsu9t77549V9r+59972GYDLnIHVOnV5q+9VXv6/qV1W/ugLHw7CB5EIAVQAqAAQA2ABiAPoAdAohnjuO0vHgozezAIwHUANgJIAgAAvAEICoEO' +
#
                    'KHokjhs1WhcgClSvEEAAnABJAAEBdC7PyYhD1XKXiZEhRK2KRq5/WjrP881Z8RAEKqjQAAQ0Wh/R5UfS5XZSrVzzKVbioC9gJoB9AqhHjhGFemswCMUmMUAlCi4afrkVQTlKnGbkgI8donkHz/AuAEABMAjFXYBQ' +
#
                    'EQQApAHEA8WKDwNABjAIxWBR1SCAVuWlUwSPKfhBCvHqWwFwGoVqtMuRpcqEEcUu1c9NcOJMmLtf44RCpVfTI8MaBiqco3Qsk0Qv0Pqv9l6ncHzGNZmaaoWXyMmozKNRI6uEEpl0PAlJqkoyRnCCF+9wnjYLXCa6' +
#
                    'xGwFJtYUkBSAYLFB4LYJwCvUopnwO2A24MQL9KO9rgzBKj1QyrK3ocwMBRtuPUryuQTsCAh4RBbRUMqVgKIc7xaOZaTdGO5VCl8KtTGI7SJrGARkAo/bDU2A0BiADoJ3mdEGLtJ4iAtSqOhRDXefTmTYWRlUdA0z' +
#
                    'Q/b9t2bSAQGAegFnPmfA7PPvtpV6avfGU/nnxyq2PSkbxJCLH6KIQ9UZF9NIRY4BF2pRrw8qOsfyyAaghxa8FcZWUSNTVpTJ0ax2239eGKK5KKiI655Q1jlKKZx7gyVaoZvRZC3F8wVyhko6YmhbPOGsAttxzANd' +
#
                    'e0AogqAleSvFUI8fgnhIDjFQHHFFgdJQCZtwe0LOtaIcSJhmFMkKnUOGPChC8hHC5zZaqpSaGj408oKRkAEAYQFkIsITlfKaRU5og3CJ89VqVa+aoBjIIQV3sI+L9qEPvVShhRM2tazbZ6W0Jb0Zz6q1TdGRNXiC' +
#
                    'sOG8Jbb43iscci2VleiDqPbLvUQUw3gB6FRUztfSwlHzX5+LewED2/UzMFKYR4juSXtb2aE+kxGbNmkdq37dJM0H9X+5mJEOLOw5Zszpw2PP30HjVmg9r4xVRbJgDbtm3pKKRt2zIUCv3KsqxZgUBA+Mit69Jfg4' +
#
                    '+zT3WiLYT4H9XPf/Oxhrx1OXhJIcSvVblrlUVQofS5RlmQdQBqIMR5Hr3pceRwdaKnp+eKMWPGTAQwyTCMCXjiiTPx1a+e59utX/7yPVx33SEN3JgyxcwiBNT3WSXKrKxQK2lmlRPiAo+w25xTI9VGXGvHIaC3DX' +
#
                    '0PV6HqHgVgJIQ431N/CwADpimweXMIN95YjdbW3Gr36KNxzJ9vZYZcVHnKvqf6P6BiVMmX9iHg35KE8NQvPT+FjxLrSuiYjAnVh4gi4StKwW5SVsSJEGKeB4OPFH4GXn01hBtvHIu2tpxl1djYhLvuala4OPgMKQ' +
#
                    'JaUkrbMAxbSqnLQ8MwIKU0DMMQzs8jJF4hjLwTj65D+hmA4dOWi4AatiVqm+Ic2jmT/mg16Z/uwSziO4tYljVLCHGyQ0B+8YsXiZdeGgsAmDTJhBACBw9mwL3yyijWr29SYDqkcBSvGAGFRkD9oKMMQAhCnOER9i' +
#
                    '/azJxQP3UFL0TAoM9BSghC/IOn/l4X2Bs3luDKK0dm0889V2LXrqQiYLmnbJtzGqxhkNQmh/8vAurk060D4aNIlnZiGVOTaRjAoBBigyLgAgCTFAHneDBo107IgfXrS3DVVdXZ9MmTk3jrrQ8945dyxlBm2OWMo5' +
#
                    'RS0iEgACGlzK6Azv8+RnxsjfTeBaIYAaUPaUMaCR0iVqhFZaIHs+yZQdDH1q8CUMWOjjHYtKkmm3LDDSkIIdDQkCnz0ksj0dtbjbFjy1Rj6aziCXGhp8HNWQUQ4rOetP0ASiDEab6w5RNyT7ad7dvL8NBD47FjRy' +
#
                    'W6u0Mggbq6NC64IIq77+7GtGmWRvRS7XTVtXNxAX3ppW7Q333XKLD/gyJ2ZrXdvr0aTz5Zji1bynHgQBnicQMjRkjU1ydw2WX9WLy4DRMmmACIyZOnYO/e3Go6b14rVq06kP170aKJWLbslOzfZ5wRxbvv7na1vH' +
#
                    'fvCPzwh/XYsmU0OjvLYFkCtbUpXHJJGEuWtOD00xMeAgJCfM6D5Xo0NNTjiSdOQmtrJdLpAKS8TxEkpeUManthb9CvqAQuv9yd+sEHIQCV2L59NJ5+egQ2bx6BAwdCDj6Gg8/997egvj5lGAZJOqavMAKByz0yv6' +
#
                    'L155KCaQDws5/VYc2a8Xj//ZGIxYIIhWycdNIQLrxwAHPnduLiiyO+W5g9e8rxox+diC1bqn2wbVbYugmYTpdg8eIT8cwzdejqKkV9vYVbb03gnnv8zgcCeeS2LGumbdsLbdteIaX8DR944AABEiANg2xqGmBTU4' +
#
                    'SGwez/GxujJNtJtpBsIvkhyfez6U4k31XxLz5pbSQ78v5fKJIHSX7ExsYuBoOyYL5gUPLhh3uz9ZM9JMM+9cVdMRYbcqVXVJBkimTKp2yEZJhk97Byjxtn8sCBD0i+w7VrW1xpEyakSb6TjRdfHHWlNza2u9JXrm' +
#
                    'xjKFS47yNHWtyw4QDJvST3ZKM33+zZ7T59WkLya2pf4xDhTpIPkXzeJ3+Y5CDJKMkoYzG37OXlkmTPsPjU1aX50Ud/kVK+reTeK6V826e9HA7F0u6/v/MwdGkPybdc8ZFHWg4D2480XPeSfIdXXx3xzT9vXtqnXd' +
#
                    'OJOgHn2rb9Hdu2/1tK+Qd55plxp4C85BJTKVuMl15qZSs6+2yLZD/JPpLdJDvzyCSEQ7JDJA/5CNOn6oiQjPqkx1TagBrsHm7aFHZNBJ/+dJpNTV1sbu7iWWelXRPHq68OqrIZ+fPrH1IxQ8CNGxOu9HPPtUkmSS' +
#
                    'YLlM3IN326yeeei7Cjo5em2cW2ti4uWOBu74YbYiTbaNttPOMM98Bs3txNso2JxCGWlUltwCUHB9tItpJs5datXQwEcuXq6y3u3t3Jzs5DPP/8nIxVVTZbW9tINqtJ66CvMv3kJ/vZ2/sCySdJNpL8Nsmb1YGEQ8' +
#
                    'A7FAHX+WAwkB07MpaH3znnWCQHOH26yeefj7Kjo28YfFpcMV+XWrMxX5Zc2vjxlitt3boeJpNtbG09xFWrejltWtKFDXmQW7a0+2Dbwc7OtiLYtvCpp/pcbU2ebLG5Ocrm5jinTLF95LScmLu8se07bdtulFKuk9' +
#
                    'u3v+kqsHp1XCnaENescSvO3r1DagAcRe93pQcCDsnCBVagqFL+IZIJn/SERpAoyQivusotw4YN0Wz9Gza4SXz11aaSPdOG/woYo2lG+MorMU6a5AbssceSRcomlXxxbaLI4TA0NODKP3GinZVz9Wq38t1xR4JkmC' +
#
                    '++GPHMoEmSvdk4c6Z7JV61KppN27TJ3d5ddw2piTEzOXrlf/jhJinln0mus237UZL/Zdv27SRnkfyCRsD/IPmjIivgAE1zkK+8Ei+AX0SLOj79Pvj0uGK+LuWwyJcll1ZS4k5bvjzGffv6mU73etrozsaZM5NHiG' +
#
                    '0PyV5On+7Wx40bHX1N8He/Sw9LQMuybjZNc6llWaullL+Xt9zSlc08apRkLBbJEjAWS7CyUhfE1BQwlreKZUCLFFnhcuTzX2WSmqJnOlZb6zYRwuFY1gQKh2Me00Zqq1zisE1dgJw/f4i23ZtdoYvJ9tprSc6ebf' +
#
                    'LUUyXLyzOztTd/SQmzOJlmjCedJDXlk7TtGL/5TfeA7dwZ1xR3kHV17r63tubS4vFBV9qZZ9pZZSf78uTp7HyD5Au2ba+xbft7ytS8luR0jyfMbSR/QPJXR4TfbbcladsDJAe5eXOcs2ebPOUUexh8BqWUg1LKTJ' +
#
                    '8K61KkwJYgE88+2/KVKRQiL7rI5Jo1cYVNLh45tpm0MWO8+pjI6nM47Ld1STsx40uVSt1rWdZPpZTrZDK5WdbUmIcNcl2dZDqt76NiPqBFsyZKYQIWWwETLlMxGHTnsayYS7HzBzUnX7G+hEKSEyemOXPmIDdubF' +
#
                    'V72ma1z+0paL4+80zKZRIX33fkBmfFCtNjhqY4eXJuBZk61c5Oao5iefteLGb2X4NZ8z1fllellM/btv1j27a/WcQV7WaS3yX57LD4nXCCyS99KcYXX+zJ7r2ffjp2BPhECpLMrUvRAtZUJm7bFue4cbJoW0uXul' +
#
                    'fnI8c2s6joZmtGH3OLimkmik3cwaGhoQYhRJWUcgyAkWLt2nFGX1/wsA93u7sFNm4UmDnT8k2XMncEHIn45bCHOVq2847vq6uJnp5cmWiUGD2a6nd3XdXV9K0jp13NmjtZUrvHNDRXtBGa76fr7AqAwNKlIdVP5+' +
#
                    '4rhQULLJSUAMFghY8zQibefDPR0AB0dzundkHs3WtojgCm50ohv+/FwtCQ8Byd5+UQQkRI9kcike4iNZla9OL3gXad4VxBBVynz9/5zmgPPgksWGAqfCqLXJwX0yVR9NL9M5+x8dFHcfz2twFs2RLAe+8Z2L49gF' +
#
                    'gsV27lyhIsXpwsqFeHhy1RVUWEw159lOp3owCeAEAjGAzWGoYxxjCMUQDKxFNP1bqyvvxyD8gOkJ0gu0B2o6mpD4ZW7y9+EdCuIUyEQvoAAYODmbumN97wU4K0duyddtWbAT3tqhtIY9o0tyJs3cps2tat7jYyeV' +
#
                    'M+R+tOiChvli4AhwC0AGhWP9uUl0tY3Y95Q6bOAwfcQs+fn0BZmYn9+2XRy+ARI4A777Q15wYD6ggeI0cS11/v3Jelszidf37ac8zfD7JPi2EVM3/ruOWvbHEpZRTAQHV19ROHQcBC+PUrnDqQeR3SrvAMA4igqS' +
#
                    'ngwSeOsrI09u+3C+hDLpaW0qVLAwNmEV0yXbGiIo3ZsxP46U9j+MMfBrF//wDcnieGK//555vDYKvH3qyMU6Z49VFm07Zt8+tj9k7U0JyTS9DeXoo//zl3P3XyyWlcdtmAuqCNKU+GKE46aRAXX5xzQH7xxRJ0d6' +
#
                    'fUpfwQTjnFLdDPfy7Q15fC/feH/OYSLcZRW+sW+I9/tD15Eli4cBBCm6gWLQqhuTmN1tY07r03t1IZBrBwYb/mLOD3aiGslOcQgIMAPgTwgfp5UJGwSymZv+zjxrllXrsWCIfTWLiwtMCKnrskv/12icrK/FzXXp' +
#
                    'vGqFEJ7aI/Mwbf+EbY1fc5c8qxa5cJ00wgEkli504Ty5YZmDx5lAe3ofwrVhE1DCNiGEZkmPne1JwhvKFfw69ZYdas/s6QsLbW9HhRAeFwEgsX+jnYJ1zx1FPdltWqVQb6+pIFdClX7rzzRmLFCgP79plIJBKIx5' +
#
                    'N44QX36lpfb2l6Ec/D9vrrK7Brl6Vha2HZsoDCNtfWTTdFXfUuWhRCS0sKLS0pLFrkJ2c8O6aWZT1rWdY6KeUGed9977ls1W9/u5XkTpI7SG5XcQfJXXz88SZX3gcf7CC5j+Q7bGxs97Wbb7jBbx/ytop7Sb7N+f' +
#
                    'N7iuwPcvc83/9+OwOBwjZ+ICD5gx8c0u7C3iL5pk+dz5F8hOTSAvufpSr9uQL3SG/zgQf87zFnzYoUODWMZE/JyCS/9a38A4MdO7rUHnQfyd0kd6mxeJ3LlrUU7XuurX0K2z0kd/uk/5jkt9TDURTZA/4rydtJLv' +
#
                    'Op4xmFz3c9ZR4kuZLkc7z33nd95bvmmv4C+rA3G5cvbzsCXSp8R+iNhkE+8khL3j3g977XdpjYuuWcMWPAN9+cOX5yvknyDZKvC8uyHhdClAAoFaeeOkM0NVVljFODeP/9l8UppyQ0typnDxPE0FApxo+/HNFoxj' +
#
                    'vitNNieP/917P7uSVL6rFqVT26uspQV5fEjTe2o6GhDYGA13vhZZftnkgEcM89k7BhQx3a20cglTK0vO53h1u2VGD58nps316F3t5Q1lF82rRB3H13Ky66KOrxdCCE+IKn/RXKkbpLCPGYj/LNz3q2C/GfnsQ/Zd' +
#
                    '2XGhrq8eijmf6OHZvGl7/cg4ce6kAo5HXE7UDuKVTG5enllwOYPj2kuW+l8dZbBzTLY0itQsy62W3dOhrLl5+InTur0d0dgmUZqKw0cfLJQ7jggkHMmdODCy+Mudyu8vu+FIfxoJjk5wDUA/gUhFjmSWxUq2CvEO' +
#
                    'IR/eQ0+xwHqMZ9952F1atPQ3d3OWpqUrjmmk40Nh5EKHRpUX0ABJYsOQGrVk08DF3K6ce2bRV45pmx2Lq1Ck1NFRgcDCIQIGpq0pgyJYI77mjFjBn9vp4wW7dWorFxInbsGO2L7ezZ3fjsZ6MuOVMpA4sWTcKzz3' +
#
                    '4KPT0hjBuXwty5HWhoaEUw6JXz9w6nhG3bDdqGuUQphqH87qicZU21waZSuBItBop4rB+pz6LQXjTodR2p57ufQ7Ke5jwqHlJ7ux4A3UKI9X6zv/Jqr0XusxTeF/XCR/aAdhih+whWaIc6mToaGkJYvDhHwIcf7s' +
#
                    'DXv96szON+tc9KKdmDRbD3YkXPIYzudB1R9Xch81mN14oQ8ALl3V+rHIzLkfs0R1zJ2CeE+I1W5krkHqM6D6GLvaTH30AfhtM7qfnrQhs3w6fNQvrlJ+fhjIMNwAqSbBZClBiGUSKlLDEMQ39gKQ3DcAbNFEI8qh' +
#
                    'xz8wj7VxLQz2vfGKYzR1K39HEMd9IcB2TnqVNfoXNeBVZSkXWE5v8Y8Hlp4P20hXOK6vjZjgZgQ0oiHC7Dpk0BrFhRoj31sjBvXpt2MNQlhFiklPprmpN56REQUHc+dvod10g4OAyuUTXWUk1azqc5LEVm56mRvr' +
#
                    '/cQPLzKv+AZ+IyChDw49aHj+M1RLFJYjg5UcAB3BkHUwCAaZr/rMzQIIBAIBAQtm0jEAhkveV1E0V976K0yCyMAkIM925tls+MdzhvwIrVLYUQz5O8xpPHedk/BCAmhNhdZAWYityj4GKrn5eEQaWsI+E8aHUeae' +
#
                    '7ZU4spU07Na2zVqg8xb94HADrVQcYhIcRKTZYZw6yAxZTO1lZ/51MaUSHE28NqLvmPyH1TR/86gvPNnjcLlLsQuW/9lBaR+ePUh2LXGnlk8HkPOJyMRyqn3wpoCSHWH83bquPhSKdfsgHApwCMw+7dE3DOOVMz7z' +
#
                    'FCxOmnJ3D33a2YO/egdqrYou+rjodjLwSPQ/B3De3ZmXLqVAlyALnv3zgfoMruy9TP4+E4AY+Hjyl0aearrfZPpYqUzgeowtre79fHITu2w3ET9O9vhs5RZqj3U3UOAfsU+dYcR+vYD/8HshtVUk4+/YMAAAAASU' +
#
                    'VORK5CYII=' +
#
                    '" />';
#
 
#
var experienceIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhEAAQAOZyAAABAQBAUAARFQAFBgAUGQANEHvl/wMJCwBIWwBLXgAZIABLXQArNAUOED/Z/0Ta/wAbIgBDVAArNSnX/wB5lwBedUrb/xHQ/wB4lgYQEwA3RQTC8gCEpgCy3h' +
#
                    'PE8Ifm/wBgeBZ+lYbn/wAvOyhSXAC/7wBfdwCPsyU6QFOSogAiKinU/wDG+ABbcgAGCCTT/wTO/wGbwkDZ/3nk/wDC8gMFBV/h/znY/wARFjHV/16Pmyx2iAAKDAAKDQBJWwAICgBmfxU4QAEDBEfK6gCiywA7SQ' +
#
                    'BngRFEUQ3P/yXE6SE8QgB0kgOjyy7X/xjR/yg7QB0uMhxCSxU9RxtvhAI6SA7Q/3nM4QBuigB6mRc4QAo3QQBiewA0QQKfx0nb/wB3lQUSFQBlfwGgyAONsAACAwCWvSk7QAAqNRrR/QTB8RvO+1Pc/wIJCwjQ/x' +
#
                    'rL+AA8SwidwgCFqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHIALAAAAAAQABAAAAeagHKCg3INGYSIiCQ7iY1yKUNCjoQ1VhZUk4NQIl5jiWBRSihPZjozD25HWUFaRQ' +
#
                    'QHUzI2Bh8GazkvTRMeXRUFgiNMajcOK05IG2UgKogFSywXVTAlJwg4jnBtNB1EWFyObElpcVcYFGE8jVJoHAEMPkZfGo0hMQECcgILQCYAiGRiEvQY9ONNCwiIJGxxkehMBH+DFAxwRGBiIAA7Cg==' +
#
                    '" />';
#
 
#
var badIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADW0lEQVR42l2TW2gUVxzGv7Nz2yS7m2xMNpusuWxq3EKLfSsJjVDEtlgLIuQiWJGKF4qlVFpL2bRpDN2l1FYRxZcGBL' +
#
                    'VaDaIkD5XapIJIQl+KNj4ktFm7ZrOX7H1mNzszOzM9O9G09j8cGGbO9zvn+18I/hfhUMjLctxBXhC2EV33GoYBg5BQaXV1WlXksc7NvtB/95NnL08eP2ZYhhnlCtLxJ1cucisz9yGnk+Y/oX4DGnt64dmzVy1yws' +
#
                    'myrg9v8vm0dcBSOMzwPD8u3bm9e+HcaVid9WAF6zrdoKssl1DKpNF19CNwW1+/qShKfwVi7kksLweKUz/7F8+fQbWrCbzNDr0g/QugBIvNBkUSUUjE0fn+hyA9vcGOrq4hEo1EvNaCNP9g3yBnc7vhenMH3O/ux9' +
#
                    '8jn0NZ/GvNwgub0P7lV4hcuoDknduQYjG8dOGyKrKcj6SSyUD67Hf+/G+zqKpvQNf578E6alEW84gOD4EQguYTATB2O7WQwdyh/SBFCY5Xu1H13pEgEfP5mfDAO91cTTU1SlDV2UkFQSpwQKMQQh8LFcvZLB4e+w' +
#
                    'C1mRTA0K2FIlwXx2eJmM3Gwm+91uTwbYQmGdCTUTDtLWg59yO9SZ1poSJ+cHgPGmPLsDQ0w1JDIC4swT0xFScSBSxRQM2LHmjpRWh5CcLmLXB/ew3MU4CSyyL+ySDUhYf0mx2M0wtpPgLX5DQFSNJMvO/tbsYiQp' +
#
                    'ejsG55Ga7R62BsTvNkmgLwtXXUTgaxLwag/DEHi9AMTbej7vKNWZLNZALymW/84sQlMM02tF65T0+pN8Vzn/ajpVGD67MbNCdOlHNp/DnQCzYhwr5rH4xDR4NkJZHwVou5+ejgGxwsMux9e+E46MfcMeo5/7tpgW' +
#
                    '17BU0nruHR6a9hnfwBLHi4rv6k5nirz+yVbCoVwK8T/pUALRtnYJVeuUbP0O552kk6TSTrBEnmwNAGbhgKQO7eHnS3tg6tdWI8xgiCMG7cvbU7dWoEel41QZVymUFFhkrLaeOw4eMRqD07bpbkUn9re4e2PkwVCM' +
#
                    '9xo7yUOl6cHOOK935BORZZs+D2oHrrdlh3HlCLguOkopaHN7a1ac9N47NI0pxUxpmubdDK3sogGBYmRIdnWpXlMbfH89w4/wNi4WxKCJsyDQAAAABJRU5ErkJgggo=' +
#
                    '" />';
#
 
#
var pauseIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEUlEQVR42l1TW08TQRg92+7sFlqwFZCL0LBCRV8Eg1wMmhiMGmOMQYNPxsSEv+ALJjyQwIt/wcTE+EYUTLwbeUADCK' +
#
                    'J4SbRyL1ZYytLSLe1eW2cHIeqXTHY3O3PmnO87h8N/tbS0JBGedAmi0E4/pVwuB7oWNE0bNgzjTm1t7cLf+7mdl0gk4uZ5vhcu982pr2EyH4kilU6zf778fEjBChw9HDItQ79tWVZPKBSydwF+Li+7BUEciMjrHW' +
#
                    '8mp1FY4IMoCHC5XPRvDtlsDpquI5nawolj9Sj1+wYpm04HhAHIstz3az3RPfn5G4oCfhBCwLvdFGCboANg2RYMw4QST6DpyGEEvGK/JEm3uJWVFYkXxPCzkXekOBCAKAoQCA+epwCc6w9AFqZlwzBN6LqB2EYcZ9' +
#
                    'sazcxWqo5TFKVvPrrWrSRUFHjzKQDB95k5/FqV0dLYwFROfJhGWUkxDh0MUSkG1K00ivwFqAj4+jk1qY59mlls9eZ5qFq6neMwOvEeM3MLOHf6FGvSi+ER1FRXoa21GX+mgnRGw6Fg2Tinqurql9lIaclePzKajg' +
#
                    'xt1tvRcczOzePC+bOMwdPnL3FAqsbJtuPwiCLyqMzYRgJ1wTKZAqRWvy9GSwN7fKxZDr1Xr4cRDv/AlcsdrAcPBodQR+mfOd3OZDos45sqaipKZC6VSo3NLMutHoGwrgt0Ao8eP8HUx2ncuH6NAdy9dx+NDfW4dP' +
#
                    'ECdDqJLJXgPIMl/nEukUj0Kcl0d5LeLNLDzgTGJyaZhKuXL7G+DDwcQm1NDVqam9gkDNNiTLw8+rlYLCaJnrxweClKHABCAQj1gNtZru0x2nSMlm2DOhAGXbphIVRVZqrJzTrmlHg83qdZ2e6orGx7gAG4mNYdI+' +
#
                    '2AOAz27ysCZ5v95eXlt9iONVl2ix7PQMawOqJrCrOwc/suQC7HzGTbWXbYDXtQ17TOqmDQ3g2TA0IEoZcnwk1lUyWb6hZzn1OEunKPz4tAodfUM5nbhmn0VFZW2v+kcaecntAsdNFk7saZ1gIND4szpf1PnH8DjE' +
#
                    'h/b2bB2sAAAAAASUVORK5CYIIK' +
#
                    '" />';
#
 
#
var defenseIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhDQANANU/AFFzrH2m60V0ukhrpazH/CQ0TYuv8U19yVeK3Cc7Wl+Q4F2O3S1MfFCAzBgdJRsjMjtinj9loVp4r22a52aFvzlPdIGYwk2AzneUzVN/x2iDt8ja/ZS29mOAtT' +
#
                    '9dj9Pi/jFShI6hxHef6G2Nx0VdiDlLaePs/rrR/SxEaaWwxYCh4lWH1198slqJ1mN5oqLA93uSv05ihUJkm0JusF+IyzRdm22b6DdfnGWV5HSg7YKq9Hul8Iiv+K/J/M3e/v///yH5BAEAAD8ALAAAAAANAA0AAA' +
#
                    'Z4wJTp4ysaiwRMaHPqOZ9OlcZC4PCu2OuoA3txdOAwmMJycQy7tHonkkhiBkNuTs/hAKRSIDCx+f0TNAAVDjiGh4YKAAMFPx4tCwqSCgsZAzI/Pw8HDSsInw0REQmZPygzAgcXAhAQDKWZCTezswwOsJkPDDUgja' +
#
                    'VBADsK' +
#
                    '" />';
#
 
#
var staminaIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhEAAQANU/ANVbbJmZmkVHRikpKVV5Wq2fnux4itCxt8fIx76WnBYWFjU1NYyNjaVweJOSlNxqdysVF3t6fgcGBnR0daOhp76/vnZze7lcZOaMmq6Bh7KtrpN8hIJCSaCXmI' +
#
                    'GFi6qurmVjYm1jZGhpapOLjHRoa1EpLnJvdt9KUeyQoZ+foLKJkeBpfE5QUO/w8FRJTOJTXpSVmudVZNHR0sdkb91wfICAgIR0d7t3g2VeZamnq7NWXPJugGRWXH9BR4BfXAAAACH5BAEAAD8ALAAAAAAQABAAAA' +
#
                    'aJwJ9wSCwaj0OJUFBTiByBQIohWAxSFeEA8SFUWjJExOKBRSZCBYlAGBU6HQvFQclFhJtXiMVAaDQmA0UDADsJAiA8LjgBCkUJJzE+IgsiCgMTSkMDNAYABJcDCgQOmkI2KwYNggsCLI5FGQ8oKrCmRTcPGAe3Rw' +
#
                    '0XM7xIQyU9HDrDQxDLvcnOQkEAOwo=' +
#
                    '" />';
#
 
#
var huhIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADW0lEQVR42l2Te0xTVxzHv+f2PniMlQpLAaXY8oxhg5FIXNjQNHGSOTFN6EzmH8THZqJuzixspnUs0wGLxkf2yIIxZn' +
#
                    '843IaOTM3mNCE4fCaii84QTKAWJrTYUqBl13tv7707PUaHO8lJzuv3Ob/vL78vwf9GIBB0CgK/WZIkt2GaTtMECMyALMu9qqodLSsrCcx/T54sgsGgheP4PQkZLce7B4TL1wOYmkqwuwULMlFX68LbTdWayCf3G7' +
#
                    'reWl5eqj8FjI6OWURR7P7tj/uew50XYaMBQpoA88kvdKEpGqan5rDj3XqsqM3vUVXVm4IwwPhEqO3cpVHfoWP9yLFbsajAhuY1VSh15MDCEYwEo+jquYl7oRlEwjP4YOOrqK95ob20xOUnDx6MO+MKN9T43gkhJy' +
#
                    '8bz2dn4MSnjbBlpT1TG01LYlNLN4YTjxCdmMbJQ15NIko5iUQibZ8fv+XrvRUEny6huaES76+tZkF7v+lFPEPCvg11bP9913Uc7L8HXVbhrnZgh6einczOzl6t9f26LEPiAVXFYpp+cUE2JN6Cb3++iXc8L6NjfS' +
#
                    '0DfHXkIr67Mw5IImQlib5P3NdIbGY25Np52u502WFMz+Dv6BwicxpAtfs9VdjrrQEhBAN/jsF74AKstEaczYrAcAiDXzSEHwM+PGMvcuVh+OE/iEenAV1HXUUe+v2vs+BzfUN4q/MK4oKArFwrinMzERyZwGAHBS' +
#
                    'QSias1rb8viwtpmEiogIVKod3TvHQhWt+oYKmv/OgXjGRksqyQ1JGfJSJLlXHZt4JKiMXafCfv+joHQjAIRwEWNpeX5uIVh5UBjp0fwiRHzw2DZceZBrbU2OFfXdxOJicfOqMKGar67IKg8gL9hT7kOHQ0LsGulS' +
#
                    'UMULXlR9wW0x8DDB2ipmFgt1t7jjwqZ40UnYq1/XAj5Nv2022AVh80k49XlWHra04GaNh1GoO8RKVRAO2Hr9e9hLVLstsLFxX4GSAcDltESeruuhH27Dx1B6qRchCZZxWT1UWk24NNL6Kp0tajKIq3qMihPzVTCs' +
#
                    'IL4p5J2Wz5su++cPavEMZiMrsrtKXjzUo7ttcXaTZe35/U1FaHo/A/M80fqZqk7CwIglvTTabBQswAtXKvoqpHFxbkP2PnfwFXFV5DkrUSVwAAAABJRU5ErkJgggo=' +
#
                    '" />';
#
 
#
var updateBadIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADcElEQVR42lWSa2gcVRiG3zO3nenOTHZ2N3uRxrZaK8WAVWsqSKOIEItoqAWlrYKiQiJWiwhKQPFSafWHIlhRsKUp7W' +
#
                    'Z3a2yUukR/haYlaYtrNVTSC0HXxbCXpJt2L3M949mIP/LBy8vAvM855/s+AlapkWx6rtTsJfBNEGIFJM6MaIIlywGTk2TmsqnKkhUQBNNyPYt6nkl8z2rV68OkDTh0fHTq3WzxAZ9wAEfg6CpaPZuhEApCPdiuDe' +
#
                    'o64B0m14Poufhoiwb1RvHNZcA3qbEr6YvuHZR9+SDgeR7B++4Gx3HwqI+mR1F2PNRsF9RiYv7ZvQJo4fc9y4Avjn1fPXmZRFgCMs9BZIp234mAIoP6PkwGqDPAPAs2HRewPRzYJKI8MzVIRjJZbp4L2T/MerzYPl' +
#
                    'ngIAk8YrffCs3Q/7sBC99k4Qo7/R/LgdVy8FWPgkJ+cqANCF/woguHL5qI8z6iigRNFpHoSiCxOoYWCy80bVSaDooNC5eZXNPB6cdCfuHXsy+1AesnnPjVw3MEkWYDkYAIlSkSDSG5JskaSFFjgcWWjRLzOeaU+d' +
#
                    'k+1fv70i8vkFTmRM8pM3FupCSjo34DcRbW25CgAiMRBQeKRwwLG66cQXCpjLIWw8+xe7BrDXH/mp15jqQz2W2p67HcjxUBkm3CEASEAgIUSUQo0oGh6DyErz8GRyk41lzKGupLEjpfeZ3OVipPk3Q6s3tiMXTsXI' +
#
                    'nCYu9darZnTiGziQw8mMRDx99H8vEnlgFL4zmEt+9Aq1ZD9cxp6K/uHSLfjY6+5jjO5z4bl8cuLDG6zwlgz8T9jQr8sTQi255E58uDaJyfRrBnC65+sh/e9CSkHTt/I/l8fh1bhc2U0pht23Hbsrpd1+1n4u669g' +
#
                    'f86Rzc4p/o/PAg1K19KOdGUT/wFsTVa+H19leXF+n/+ml8fINpmpOiJMYEXsDGagnOoX3o2P0sjOeHUJ04iejDT6H65RDq344hMPBOfgUgm828LQrifr1DhxEykDBCsAafgdK7FTfZNIQLKQQffRGLhRrkSzOQ3/' +
#
                    't07wrA8JEja1U1OGWEw4mwEYayahUijetofLAHznwR4NlPbJPFrnUIvrEvZyta/wpAu44OD4d1XR/UNK1PUZTbCCGSKgml5MI16i9UbuGj8QK6Nh51PP9gvHuT+y+285cc/rnNdQAAAABJRU5ErkJgggo=' +
#
                    '" />';
#
 
#
var processIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADhklEQVR42nVTbWxTZRQ+7/3qvbe77W1X0q7r1i0q/KCMtQsdDscSidkH1GEd/tAtmkwHw0Wz6B+dwcQsmiEyBzMm6D' +
#
                    'aSZcHIDGNCXIjRoWFKYjrBNoyW6Uqh7b3Yfdkv6Mf13RINBjnJ++PkPec55zznOQgeYoPHjzkZhjHlcjlf58FX5x8Wh+53RoY+30aSVJei5Ns1Wu14SWlpc8DvfyORSJzZYNhwKJ6I97zQ2hb+X4B33n6rwPV0c2' +
#
                    'izzSae+3qyWxTFequ1rGFu7loPRdNVDE27s9nsd7v3uHY9ADB4bKBJpWI9Gq2mbe8z7sOyJClrf3lFgbvptBJbjEEmk1XuyFJNKpnMEASZf7619dd1gP6PjphqduzwcxwPweDCdG3tThduFTL3MoAIjI+h1nzMRU' +
#
                    'aW5EmSJPYmk0lPNBKpfrljv4I+7Our2FKxZczuqLKp1WqQZRlEUQs3AjckRVH8hQZDFUWS/BpINBoFgiDgr5XVc6HQzbau115fRgP9R0VB0NBGk2nCbrfXkBQFsx7P+UQi3vJsy770xUs/WAp1+kscz5XeXpZASW' +
#
                    'UvRhflAyvR2K2O9v1xNH76yyWj0Sjq9YXAcRyw+F29csXR0Ng4uzbj996Z7rPhmb6pm5fprJIHhqCgqaQa6tCmKddTuxvR2YkzS7hNTLoIQoEAPB7j+tw1xxO1O2d/CvyyZ8D/1WQwEUICA0BjSgx8EVQUVoJPDu' +
#
                    'SfM9btQp8MHhdxIl1WXjZhNJpqdHo95kE6n7ybbIlwsQsnAiO1Fp4FgaaAxtUPVvbArfgSvHv5feh89KVv0MnhoQpzcfGYimVtLMuCxVICeOcQjoQlH/pZH0l9Sz9u6YTphdPgND8JjqIGeG/mTShRx8DINEloZG' +
#
                    'jIhKv7EVqXxLTZXOyiMQDCbP+WnobfV4bBtfEIiKwVCmgtDHsH4M7KKeAZFh4ROhfWs8ZGR5vwnj2CRmgrMpsP8xyviDoR5fkMnPS6QUUqsG/zCUjmNPDFVTdwVA4yigbc5Z9+9q+UP+jtLXBu3x4iSEKMhMPdOp' +
#
                    '2ufpuzusG3egF+DPUCgQgAwooFdR1Hs1BXeuhPPVHueOCYsO67UqlUOz6e8Uq7vfmP4PyocRNnD6xO2ZbTIdCxZbBRW++hFPWLj5m3ev8DcL993H/USVGUSaVifK90HJiXF29vRYiwZHP3gkUGq/efuL8BeLNcQJ' +
#
                    'E3FaMAAAAASUVORK5CYIIK' +
#
                    '" />';
#
 
#
var energyPackIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhGAAYAOZ/AFcqAO96APLpzPXHMv3012g2AIZRAvniksS3nue6RHZCAPvoqfjXa9KdAO9pAPO+EbCJKePXw51oAbGVZS8oD2FbR/767NurF/bSXe+UAPPELdOsQ++HANC/q6' +
#
                    '2PTQwIAufEV3JbErF8AOW9N49hIfTBG/bZeNvEiubTl/TEJvzsu/DLUtW9cKVyAaJ3MLiEAtq5VfXcjcZ4MbyJAOKtAdmlAO65Dd2oAPn4+PXLP/K/FSUUAO2+ItaiAPLu6+u2CXRoP+PJeOfJZvzwysqVAO/JS6' +
#
                    'NuBEUdAP745v39/f778LWAAOvm4at2APDFQfG8EOaxBMSRAPXy8O9fAKRyDjcyIbSBC////++kALOEGtvMt+izBuK2MOXbt+3iyZ5uG/n39t+tDPHPX+3ALfCjDLOlduvGTcCNAPbhnMueD1hKHd3AZNVNAMKFI+' +
#
                    'OyD++6AOXPhr+njN3SybiGDO/IAI1gAP734fC+Gs+gH6J8AO+sAOPATevSf+Pa0uG0IQAAACH5BAEAAH8ALAAAAAAYABgAAAf/gH+Cg38fVUBlKHATQFUfhJCDHxURFkqXFkgEC2tqj5GCFAgWFpsYAzkmC0NDBx' +
#
                    'AUoFUCSUMrbjc9uTU1F2sofH6whBQCSjE8NTNNEszNLTMsQls7kghKB3c3SxFX3d7eJ0FOeZ8VBAQDP0Qu3Q5T71NsOBEvCSZpAIVdFgw6NEtxrshwQPAdDikkXoQxwaWFITsEcthoIEFKkgABHGTEkeSIgRc3Vp' +
#
                    'gRsQOInQUpoMyYkEQGB4wBuiWZ6aXHGDEiAHiwYOJJjRZyrmTgQPQlxita5tS4w2BJgT0WMEyEcKVNhqtDiV5BYIQIFB0YRCgYYYfBxBNXcKhNgPVKHCMN7KA8KVHESAEIBA7woEFEQoEkOLBgIZNkQpMGW57oSM' +
#
                    'GlzpEQKlSkuyH2ihM9V8B4ENHjx5MHDzRcMLCDAgMVGPy96MDkzRUfLqx0/vyghAYrBT58SHMATYobTXzQucLExYwbnkE/SDEawCMAI9BgAN6tz5czN2zQrs2jBQBqhepsiJHgTJIIVKLQ0A5aRwkeuI98+rOjxY' +
#
                    'YgMNJEabD+gfsSKcBXgHOQ7FBHFjAIAYITGqSQwgADiGYEAARGskMBBkCwAQhiiFEEF3hQoQAA8oEiyAc7AFCAAga0OCCFO8xnYiEoHkHhETHKOEggADsK' +
#
                    '" />';
#
 
#
var energyIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhDQANANU/AEs+IPfHHj0zIPesHveqHmhPIPfCHvfAHi8uIfexHve4HktEIPe9HvfEHve7HveoHvfFHiAiIWhZIPeuHiAgIS8wIdqfHqGBH/fWHvfiHve6HlpWIMyYH/fJHv' +
#
                    'e3HsyXH+nGHr6SH/fbHj05IOmfHoV0H/ezHlpEIFpPIK+hH/fMHve0Hsy0H9q0HmhUIKGSH6GWH/fKHvfUHvevHtqqHve5HvfPHvepHvfIHve+Hve2HoV9Hz0xIGhYIEs9IP///yH5BAEAAD8ALAAAAAANAA0AAA' +
#
                    'ZgwJ+wMCDcHg8ST8i0JGaT4okpdCl0K1OiQBXSGA6NggMA+ATCXsNwOIBrng/61+oEIOtDLkRhLhYoMTh3F11CJTY2KhKGPwgYMiAjjT8vIiwIlBUZKRGUPzA7n0Iboz9BADsK' +
#
                    '" />';
#
 
#
var killedMobsterIcon = '<img src="' +
#
                    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgND' +
#
                    'RgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAoACkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEA' +
#
                    'wUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp' +
#
                    '6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhc' +
#
                    'RMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0' +
#
                    'tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDy3UJ501CVUmkVRjADEDoKtGzvRawSR3UssspH7lFYtgqGzn0AZc9PvDrzirfrnUJfXj+QrXgvotRN1CYB9mWKWVo/PchGEeE4BA4IQcg9K' +
#
                    'VCnF0oaLZfkelmWKrrG1kpu3PLq+7GI8EIaGaeISC35kaSRx5pPTKEj5Qc9DyMVD9kuWhkki1BJSkZl2L5oLKCMkblAOM5PPQGn6LbiXXtNjPR7uJT/AN9itbRZ/tiGW/u1Kw3aSMZ5wCYpEdZgNxycqqDAyelbe' +
#
                    'ygvsr7ji+t4j/n5L72c7DNOZ4w0zkFhkFvetms5reGK+228zTQq42SsmwsM9SvOD7Vo15GaRUZRsrH3nCFWpUo1eeTeq3d+hj3kJkvZAAxLEKAvUkgDjHetOx02K1S5srfyxPIqpeTKNywruDCMYyXclRkDJ4IHR' +
#
                    'jW7o2reF9HP2i+057zUR02Qlth56l2CdMfdH61oTeJLeC2trm00qRtKmkw6i62CFud0flooAO0kj5sEYI6HbpRxddxUKdFuyWrsk/Q+QzKnD67Wbl9uX/pTMyx8P6g95p93oum3KXMMu5oL90iZihDLJtbHysOCB' +
#
                    'nBU8nINXJ/h1ew6lJCZ/Lt2JaEQQPOyx5ON5+VQcYzgmkl12806/sbhrqyXTblXVZbC1KTJHkoWHmZcEEkgAlSVIyRms+f7TdXN1oPiDUJJpPM3W93POzokmOCST/qpBjntlW6bgduXH1Hq4xX3v/I4b0V0bLM+g' +
#
                    'aBp9vIbjUma9WPMcUl3Hy+BgGOPLA5J6nHHpWNStot1YW4neGEQ7whkhnjlUMQSASjHBIU9fQ0lcGPpTpyjzz5mz7zg+SlRq2VtV+RSlgke4dgmVOMHI9K2tEW2FlqNvfXTW6TCIEBSxkRWLsFwCA/ChS2B8zZI7' +
#
                    'lFOGZVYwUElp6/5nVX4TwderOtKcrybb1XV3/lKV9PLqF287xLGCAqRKcrGgGFQewAA/U8mrv8AaaNb2yzaRZ3E9vCIRPO8hLKCduVV1HAIXkHhRRRV/wBq1v5V+P8AmY/6nYH+ef3x/wDkSObVLy4t2tiLeG2Zl' +
#
                    'YxW9vHErEZwTtUFsZPUnrVaiiuTEYqWIacklbsezleU0ctjKFFt82utv0SP/9kK' +
#
                    '" />';
#
 
#
var goodIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADA0lEQVR42o2TWWgTURSG/8nMnUlsNTFNTNN0IVpbu6i0GFD0xQ2xD4pCq2JBpa2CBVFwI2KqYgISX3wRtSrqq2ARBL' +
#
                    'F1AZG2UrTigxIJxEbSNm3aLE06yUwm42TEuDyIBwYu95zz3bPMT+EvC4x9tROG6eQ4blNOztnVSxkBPs2/FAThdk11TeD3eOrnYSw4Rmto+lJCw5+6/vEReREcQTgVU32WBQZsrnLgSMNOUScw3pwkuWqX10oFQP' +
#
                    'BbkGZZ9mHf+OtdF4buoKTIAC1hf+FlIC0ImFGAPes6sL3E0adU05qHqCHjkxPux5NvnBdH7sKmN0FLA1XFZnjXn1XzDz7vQSqbREZ5MxSPwOU4hK2GZs9ye/U5KjQesicY3rfpSTdZYTBjMQF0tIzKhVZ4NnhVwN' +
#
                    '6n3WAQVyAUolnAF5tG/7ZropbX1FKRmYj7qq/X+X5yFKU6gmJCKRXQsBbbcHKNWwV0DByDnsTBSxKSIjDBi2i2NKG7Yp+Hmkskhk4O719r4BagiLVBx+jAagj0rB4HGo+rgPODHpg4AWIui4Q4j5QQQlxIw9PUO0' +
#
                    'zF52KTZwZbLE2mJdjTcAt6zox/2dfEBHo/dGFqPgb3mkdhFeB622JpNJrQVn8Ti7jS/wIkhChcTX1hKplMDnlH29cayBQ04KChGOVjUVq8Grvrfszg8tBpGJlPyMn5NiRIcgaxrBkn6pUWorGo+2nontMfuaGsXS' +
#
                    'q8ZNTZcdTRr56PDuxAGfe54JNkGtWmI9hobPNQ09NTdpHlfTdH2wmNCVDUvwGy8lMJshWHV90X5ZSyxvzlbHTW7Z8fcT7zO5WAuAoxaCvQvurBjy286YKF9avJOUqP7cvcKNc0emxl5edUQDgcpjkt9zDIv9s1EL' +
#
                    'iCZCagzEEulJxPlJUGi1g7tiw9jTLNyr50Ot1aWVklFcSUh7AsuZQj6VOfZgbIl9lXSGRCqm8hZ0ONcSPqFm8WczzjFQXBVV5R+UtMv1t+JoSQToYhipwlVc6UTAUEUVDlbLWW/SHn7/7NSUl252Y9AAAAAElFTk' +
#
                    'SuQmCCCg==' +
#
                    '" />';
#
 
#
var mafiaHatIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhGAASANU/AKysrDg4OJSUlIuLi1tbW3Jycnx9fUtMTK0nMqKiokJCQqhqcMbGxhUVFU0gJKWlpWI0OCQjI5tGTk0PFF5JSpdmamxsbGZlZYgtNJ+fn4aGhpmZmYKCgol5ew' +
#
                    'cHB7Ozsra2tlFRUJiLjGpqamBgYFVWVj0mJ4+QkFtTU1NUVGBiYk1HSJqjom5vb5ZbX6+vr2dnZzYHC7hLVDEwMXh1daipqWxeX28XHkdHR5h/gbYgLL+/v6Gnp5KYmJycnAAAACH5BAEAAD8ALAAAAAAYABIAAA' +
#
                    'b/wJ9w+PMYj0gjcSk0BjSPR+2x4ZQiDSWz2CgwHhyaRuADgD6jiGf7a4QYvgKB0OIIEi+AQNHYehoDH3IlKhoJDwIGJCVXWUR/DRkgBmIbCYkXITglIzAKWFwNBAkMDC8PlwYtJJoKIQQHKhcBHhERAiAAOyAvCS' +
#
                    'cGFiQErQopBzgHIQ0RPr2SLzUZA6oXJAcKAQErJZowEQUAGWR5Dz6/BTAEOAEzMw4owy0zAuInIlIJG9MFFyXrMyYmhChxwEAAAQJO9HCxgAeLHtNaqCihAOAEE/5IaMDBgcMAARV0yFiQowMNGxQgTJgQw0SIYh' +
#
                    'kIBLCgysAAFwh0IECA4cbKVYs4UgQgUcPCnxEcWhCAYaCDCwkYMECAQAEeDgUaABBY0+bCAA2ZShBQoUIYQQUFAZyYscTDDAsINaCDcQFGAQ0ZXmhQwHVLgwCcWhQYPKJEgD5MggAAOwo=' +
#
                    '" />';
#
 
#
var plussignIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhEAAQALMPAO3r6wxTAGmvZqjQppHFj4O8gANoAACCAJ3JmkqiRzCXLQB3ABGOEl6pWv38/P///yH5BAEAAA8ALAAAAAAQABAAAART8MlJqwUuO2CpG0ghON30hQ1ZPmeRqB' +
#
                    'SmDYTwahxbEDxRNIyDcKFyCI7HBGPBNBiKiigjuHAaAoGi8NDEerMSWcaJ1Wwsjmt5xfrCOg43W3xmsyMAOwo=' +
#
                    '" />';
#
 
#
var cashIcon =    '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhEAAQAKU/AHS3k3W0OxIbEtW8BTN7S9XquYnDlVKSNFObXEpzVmelcPXkAXCNXpzUpWyoRPbbAChtEcfFJqm9c7jaimOXe5iiGWyqiVaHboe3Y4i9k0h4YGWTaK3Wd0V5Ey' +
#
                    'dCJZzKbDxkIluPc+Lxz6nUb2JbD+zMA5XCXJG9cj+MW3rAmnCxhVB/Zk+bckBTSN7bAsrDBMa/E9XDD1NcLkt2J6u5PMrlqGOOaIS7V6TObKjIf22NC4K6TmOHKJ6rQfLPAP///yH5BAEAAD8ALAAAAAAQABAAAA' +
#
                    'aMwJ9wSCwaj8hkUXBgMARKUKAm+mB4HZnxEJiIODkJBLKggTxDAgKzM/U6EFdE8rmdZp7VikCoDHQvc14FIwcEIYgrMAsPFQ44BQUcDgo2CRQUFzAPCwkoCA4mAQgNCT8CHhoxPg8bFhYsCAoNBlBDJAMlCgC8AA' +
#
                    'YZaEYCLRQAKSkZG0qnCQAqtsvRSUEAOw==" />';
#
 
#
var cashCubaIcon = '<img src="data:image/gif;base64,R0lGODlhEAALANU/AMa6tcCbk7lpirKkmxRvU+Tc1ChYKlclM8zDuiu1J+LSzFmYYxX1AHQzUnBsbB0XF9PGu8Jcje3i3t/X0NrMxLt1puvh2Av1AfHP4eq508psmPPm49qKtdZ3qY1ebu3j2bQ7cBjVBWaHZ9RvpbNce7tTf9e/uuDOygLeCMm2q9C0rguNMDCLOlFKSmpTVJiYmKtids5soJtFXcaAoOWoyFWYV4x5egTKBRzsA9LCwdLKxtjGwpI0TuTV0ahEaAAAACH5BAEAAD8ALAAAAAAQAAsAAAaFwN/vwfN4HsKk8ncA0TAaQYNgWP5kIA6mM3sRCJfF4ZBMqWYlweKLqlU06YYLMaEMWKHVTVTRZkYwFBATEwgJFwwOPjEZGR0CPRMABQWGDBcAEAEkEREnGzo/DgAACQwMOZQTJgobEi1KBiE4Oxa2FhISNlZDAwUWHx8SALxKDggWCkg/QQA7" width="16" height="11"/>'
#
 
#
var cashMoscowIcon = '<img src="data:image/gif;base64,R0lGODlhEAAQANU6ACkFBt4aIvFCSdoaIaITGV8LDvNhZq8VG/mtsPbbAChtEekbI8AXHfFITvvIyu8oL/JRV7kWHNwaIfXkAca/E/AwOOcbI8fFJvA4P5iiGfJNU/A0O/NZX/aBhX0PE/V2e9W8Be8tNPFGTL0WHcrDBPLPAPNbYeAaIt7bAoMPFIgQFeQbIveanUV5E/JYXmJbD7MVG+zMA22NC9XDD+8kLM0YH4EPE5IRFvA5QJ6rQQAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAQABAAAAaMQJ1wSCwaj8hkERAZDABKT4Dl0GwIKZsxEvg4DKaGQjFZeQpDQmBDw+RaCtSloQmJbgUGg0DIgGQkc14ILhEETgMMFBMJGRIQCAgGEg8nBwsLNRQJEwcjARIYAQEdBzoABTAzJQkWFRUDAQ8dBlBDLyAxDwK8AgYcaEYAKgsCEBAcFkqnBwI4tsvRSUEAOw==" width="16" height="11"/>'
#
 
#
var healthIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhEAAQAMQfAKkAE4oAELYAFawAFJEAEYYAD////7UAFZcAEZIAEaAAEp0AEo4AELIAFbAAFJsAErkAFZoAEpQAEbEAFJgAEq4AFKsAFIwAEKQAE7gAFaYAE6MAE7sAFbsAFr' +
#
                    'wAFgAAACH5BAEAAB8ALAAAAAAQABAAAAVm4CeOZGkaaGqShsdlgrGOBiQcjTx/Bu4MOlbKMKlYAEOdoZM5/ACajWJBVUIOkwEAM41QEAiloFHZKh4ISYJAUDotmjMiwbgEAsrhYs5IniISDHg7PBQJFwVBKwYIBA' +
#
                    'GJhEmKhCshADsK' +
#
                    '" />';
#
 
#
var foundIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADC0lEQVR42o2SbUhTYRSAz3vvdjc3l7p0OXXmQsnhRzBLi/IrI1KhlFBJg0ApRCItK8u0EjQViuhHQT9TIpH8kaFUwq' +
#
                    'IgI1MpDcNMxT40m86Vus9739vRZmi/fOHhwOE9z3k/DoF1rvPpGQnaqYmGX6y09Grfu4GVPFlPcUnFFTlxOY+oZqefka9jIeLCfKq30zFVNTB0b43gQsOtTRh0iByRICylNNDlsPtJZTIXIcwX+6x5gFgt+d6fh0' +
#
                    'zXXrzsJ57CIs9pzMg0MrOUF0URqCBE2G2LAQqltxkIkbmdziRWwvZcrz7X8u8KKEjEkOUpnET4pe6iSP0FQYhlGNZMCBF4t2uSd7uH5V6KucbK0z2rBTkYNiNBSAfixu4W7K5zOuzpcoWyEwUah90Ww8nkHxiGGW' +
#
                    'm8WNa9WpCKIRbZhXQiFAWz2NGIm92cTDaLOQPD0mGFUvmaERl5RXFh72pBtkegRVqxWEmpsID3Peqr9u2NMujzxpmpuHnRxvlJVN+2KnQteMGazB1prhVBHobtSAjyBAVSkVJOLufCohK3pDUOPzBSQkHCMsALFF' +
#
                    'SsAs5E5pgUhDuwImAwFHskUyigLMsI2+Mi9zXONO3eiJ/qKwWQ4q54bSLsCd4LJaZ6qIsuPPf/HOzHEIpIOU6i1e9Rlff87lCoZRtBpA5Qe/nDSWMNNH9sg7c/2iHRP/v9sqD8St0m/C4dy3kxWLks0wT4SIMTbM' +
#
                    '+tLpM013AXusbvgzEwGRZ5DpoHK0Hvw4NacnBmWXCs6HiFxfwz7nH7o9zVJ+oaefipf7o2IlpzGA6EVy59DdR1F+B49uF7qMAYUPV3EnfG7wgODAvPDNKFtd65UW8tq67lQjfr1DvjI2teLVw94XCPwLbAfBCYaB' +
#
                    'j8XokDCeDFxUBGyOWyNW9QWnEpS0bEm59GRy/qDbHdyUlxC4ZoTZvpa22K2TYIPGVBQgTQeBshOehsJ+G5Q2sEaSlJvvbFxTdW69ypoZGxp0u57+ZxjmGh1OKaKJh3moNVnObLBom2iXfT2/qgSP4PU3k9tCVxAe' +
#
                    '4AAAAASUVORK5CYIIK' +
#
                    '" />';
#
 
#
var warningIcon = '<img src="' +
#
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgUlEQVR42pWST0gUURzHv29n/7S7rpuhlroW/kFdobQ8qBgdxItWB6NDkVAdukREWdShEr3YHyiicwQlJRJJEP2hOo' +
#
                    'Vmapq1qbEuaWq7Cu6s6+7OjLuz7zU7I1aYZXP5vWHm++Hzvu8R/OURJ15YGZWZJXePsNo/ZLUPYc9jS0ykQ0yWKKen2+1bG8T/AoS+tLf4J4UmeVFEaqaueX3Z8ZY1AxZGbm+e9y2OJttDFqoAeB+N2NMNRWm7mq' +
#
                    'bXBOAHb7YHJkMHHPnzYDEJYwNMsdA/yKi7deifgOCnqzu9I+E3jnyeuH0S5KiEApsE9wBYdpGlKrO+rWdVwMLHZl2El/pEPliWlRfAjYdALCbiTG0QnveA2Wbqs9qNFVkHn7A/Avjes0fH+4N3nBVz0FEB1zoAWQ' +
#
                    'GcqwtCDkvoeUZQXLnh8JZjb++tAPi7T9v8EwG3ycRvSncEwaR5NN8NKR2EcGmvABbX4duoEYJg86bnpBXmnugP/waYfXnkytd+//mSqilQYQosGsHlTgPMBuBkjWIcJ6CyDl3PzXCWp7XmN7ouLANmnzbkTrrmhr' +
#
                    'McnnW2pO8AUwKUoMtDYOKAsgxOMSCqBT/DYdxtlnJKHMV5p96Nq4CJttrO6aGx+m2VXk0nUREjGJll6rooRa8aJABMJhjoNsJRkPrIefHzfuLt2F3teuV5XVrpJWYrU7NY6rixnVPn9X3QwgokARLDBIO9RuYsz6' +
#
                    '4mrtaSD8Kct7Rwx6KyHy3JmFZNnFDVRBfVa2GasNBg7mEOJmvyIBlqyuOn3ZGUFVeK/TqJOjU7srRFICPTwBPf/ZokvSV5I8D9PJPlMFH7VN/p0poSDRKniIYCMz8A9QcpP1oZxJMAAAAASUVORK5CYIIK' +
#
                    '" />';
#
 
#
var chickenIcon = '<img src="' +
#
                    'data:image/gif;base64,R0lGODdhEAAQAMYAAAQCBKSKBHQCBEQ2FNTKDEwCBDQyTCQaBIyKvHxiDMzOzExOTBwaNCQCBFw+BPTmBHx6fPS+BDQmBExKfLy+BCQmJKSm3Hx+BAwOHMyaBKQCBExKHDwmDDQyZB' +
#
                    'waHPTy9FxaXPz+BKSWBDQyPPzKBGQCBJyavIRuDExOZCQmNCQWFGROBPzyBMQCBDw+ZBweHAwKDLSKBEwyBFQCBHxmBNze3FRSVDQCBGQ+DPzmBHx+fFxajLy+vJxyBBQSFLQCBBwaJPz+/PzWBJyazCwqRDw+dA' +
#
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
#
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAHi4AAgoMAL4SHiDclM4iNGi0FjYcwLT+SkyUCMJeDJhUNE4Obgh6EFiguRRg6hoQeNUEQPgg7qz' +
#
                    'wKhzpBuhUGGx48t4QwNrsfCyI5AwoKpYQ+IDogEiE5MT6XEgEPIUIRGT0Ho4QEFxQsJD0OOByNEisJJwkyHtiIIxYmLhISHkQdHeyJYkCwYMFBgQAAOw==" />';
#
 
#
var hideIcon =    '<img src="' +
#
                    'data:image/gif;base64,R0lGODlhEAAQANU/AP////8zM/f39+3t7YCAgOXl5fX19fT09BkZGdPT0xUVFbS0tMvLy4eHh/9LS/v7++Hh4aAVEtvb2/j4+M9NTKQWFMcuLDw8PMMcGkpKSrq6uqQVFKkXFawYFs' +
#
                    'YcGqAUEqcmI5GRkf7+/qenp6+vr/Pz87u7uwMDA/9ra/5ycmNjY2lpaf5HR8gdGs3Nzf+Hh8AbGtLS0vr6+psUEdjY2NnZ2dJOTP/b26MWE+fn56cWFL0bGKsXFa4YFp0UEgAAACH5BAEAAD8ALAAAAAAQABAAAA' +
#
                    'aYwJ9wSCwaA8ikkRhoeTyYwFKoQNkoFpiUqFCNCoJwgbCTIhDCDOAhAAAMgwQhREgwSD+FyO2G1wYCEwYQDEIPfAIDEoAAMm8JQhp8BTk0A3wAAgVCDm4CBAQml3wHmz8BNwApAT08BAUHsS4EQw0ADQEdOjgRLG' +
#
                    'dFFwAxATwVID5bRSclAA4cGx8zyUULAC9JSFMrAAtTQkEAOw==" />';
#
 
#
var blackBgImage =    '<img src="' +
#
                    'data:image/gif;base64,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' +
#
                    '" />';
#
 
#
var generalTabImage =     '<img src="http://playerscripts.com/images/mwap_graphics/generaltabimage.png" />';
#
 
#
var bgTabImage =    '<img src="' +
#
                    'data:image/png;base64,' +
#
                    '/9j/4AAQSkZJRgABAQEAYABgAAD/4QA2RXhpZgAASUkqAAgAAAACAAEDBQABAAAAJgAAAAMDAQABAAAAAAAAAAAAAACghgEAj7EAAP/bAEMACAYGBwYFCAcHBwkJCAoM' +
#
                    'FA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy' +
#
                    'MjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAfQCWAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0B' +
#
                    'AgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImK' +
#
                    'kpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJ' +
#
                    'Cgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZ' +
#
                    'WmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEA' +
#
                    'AhEDEQA/APn+iiigAooooAKKKKACiiigAooopgFFFFABRRRSAKKKKYBRRRSABSmkpapbWAQUtFFOwhKKWkpNWGFFFFIAooopAFFFFMBaSiloASilxQBVKLYBSU40lDVt' +
#
                    'ADFFFFOwhKKDRUWGFFFFABRRRQAUUUUAFFFLTSuAYooopgJRS0lSAUUUuKaVwEopaM07JbgJRiijNToAuKSjNLkelUkmAlFKRSUmmgCiiikAUUUUgCiiigAooooAKKKK' +
#
                    'ACiiigAooooAKKKKACiiimAUUUUAFFFFIAooooAKKKKACiiigAooooAKKKKYBS0maWmgCiiiqEFFFFDASilxmkxipaYwoooqQCiilxVJNgJS0YxRT5bCFBozSUnWq9o9' +
#
                    'gsFLRilxUpNsBKM0UlJsYUUUUgCilxRiq5WAlLilFIafLpcQYoxRRStcYlFLSUtgDNLSUUrgLxRSUU+bS1gFzSZNFFK7AKKKKQBRS0hp2AKKKKQCg0vBptFWpdGICKKX' +
#
                    'rRihx6oYlFLRU2ASilxSYoswCiiikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRTAKKKKACiiikAUUUUAFFFFAC0lFFMAooopAFFFFABRRRRcApaSimgFzRn1pKKfMwF4o+' +
#
                    'lJS4p3v0AM0ZpKKVwFpQKbS5NVGSW4h3A9zSU2jNN1L9AsOFIaTNFS5K1hi4pKKKnQBRRSUtNAFFFJTTAWlpKM00xBRRmkpPyGGc0UtFK1wEopaSk1YAooopAFFFFMBa' +
#
                    'SlpKYBRRRSAKKKKLAFFFFAC0UgpapMAoxRmiq0EFFFFIApKWik7MBKKWkqWhhRRRSAKKKKACiiigAooooAKKKKYBRRRQAUUUUWAKKKKACiiigAopaKdgEopaSlYAoooo' +
#
                    'AKKKKLAFFLSUAFAoooQC0UUVa1EFJTuKSk0gEopcUYqeVsYlFFFIAooooAKKKKYBSigClxVKL3EJSUtJSYwooopAFFFFAC0ZpKKfMAZoooo3AKKKMUrAFFL0pKbVgAUU' +
#
                    'UtACUUtJSsAUZoopAFFFFMApaSii4BRRRRcBaKSincApaSloATNFLRQAlFFFSAUUUUAFFFFABRRRTAKKKKQBRRRTAWikoouAUUZooAXFLSCjNWrJaiA0lFFS3cYUUUUg' +
#
                    'ClxRRT0AKM0lFF+wBRRRSAKKXFBp20AKKSjNFwAUtKB70vFaRixCUmaDSUpS7AKeaSlFFS9dRhRiiihWEJSgUUU0knqA7gUmabRTdR9AsLSUUVm3cYUUUYoAKKKKACig' +
#
                    'UtNIBKWjNGM1SXYQDmlpOlJQpJAKTSUUVF7jCiiihALRSUU7oBaSijFG4BRRRUgFFFFABRRRQAUUUUwCiiikAUZoopgLSUUUXAKKKKQBRRRQAUUooqrAJRRilpWASiil' +
#
                    'osAlGKWiq5QEpaKKEAGkpaMUPVgJRS4FGKXIwEopcUmKVmAUUtFO1wEoxS0U+UBKWjFFPlYgJpKKKhu4wooopAFFFFABRRRQAUUUUAFLSUuaaYBRRRVXEJRRRUjCilpK' +
#
                    'LALSUUUXAKKKKACiiigBaSiii4BRRRQAUtJRRsAuKSlFGKq11dAJRRRUgFFFFABRRRQAYopc0dadk9gEoooqQCiiigAooooAKKKKYBRRRQAUUUUgCiiigApc0lFO7AXN' +
#
                    'JRRRcBaKSinzALS4ptLmqjJdRC4pKN1BOacnG10AUUlFRzDFpRSZpMmqUkhDqSjJpd3tVc0ZbgJijNG6jNS3HoAtGabRRzsLC5pCc0UVLk2MKKKKQBRRRSAKKKKACiii' +
#
                    'nYApcUlLTSAKTiiihsBaSiik3cAooopAFLSUU7gLn1pKKKbbYBRRRikrgFFLSU2rAFFFFIAooooAKKKKQBS5pKKadgFxSUuaODVWT2ASiiipYBRRRSAKKKKACiiincAo' +
#
                    'oooQC0lLRTASiiikAUUUUAFFFFABRRRQAUtJRQgFxSUtFOwCUUUVIBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFO4BRS0lFgCjNHWijUAooooAKKWiiwCUuKKKdkAdaXb6m' +
#
                    'm5op3XYBcgdKTNFFJtsAooopAFLSUoFNXYCUU7GKOKrk7iuNopcUlQ1YYUUUUAFFFFABRRRSAKKKKYBRRRSAKKKKACiiigAooooAKKKKYBRRRSAKKKKACiiigAooooAK' +
#
                    'KKKAFpKKKdwCiiigAooooAKKKKACiiigAoooouAUUuKMU1FsBKKXFFFmgCiikptiCilzRSa7DEpc0lFK4C9aSilp6MBKKXFJScWgCiiigApaSlHNOPYAxSU7bSYqnTYr' +
#
                    'iUtGKMVNmMSilxSUNNbgFFFFIBaSilpgJRRRSAM0UUUXAKM0UUALmjNJRT5mAUUUVIBRRRTAKKKXFFgEooooAKKKKLAFFLikxRYAooooAKKWkosAUtGKKpIApKWinyiE' +
#
                    'ooIoqLWGFFFFABRRRQAUUUUgCiiigAooooAKKKKdwCiiigAooopAFFFFMAzS5pKKLsBcijNJRT5mwFFFJRRcApaKKaQgpKWihoBKKKKgYuaMg0lFUpMAopc0lL0AKKUA' +
#
                    'GjinZgAbFOzmmUA4q41GtGKw4ikpc5pDVSs9UAUUUVmAUYoozRoMSiilxUgFJilxRVW7gJRS0YpWASiiloSTASinZ9qaaGkgCiilxQotgJRRRSAKXNJRQgCilFFVytgJ' +
#
                    'S0UUJWEFFFFMAoopKkYUtJTgacVfcBKWikqr2EFFFFK4C02nUYqnG4DaKUijFRysYlFBoqWAUUUUgCiiigAooooAKKKKACiiimAUUUUAFFLRRYBKKKKQBRS0lOwBRRRQ' +
#
                    'AUZooouAuaXNNopqbQDsA9KbiilzTvF7gJiil4o4osgEpcUUnSlawBRRRSYBRRRSAKXrSUVSdgFPBoozSU7pCFopKKTdxhS0lFCfYBc0vBptFUpiFoNFFJu4CUUuKKOU' +
#
                    'YUYozzS5qkovdiEpKcT7U2pkknoMKMUUtSAmKXpRRTAM0CkpaakAUUUVTEFFFFTcYUUlLRcApKKKTYBRRRSAKWkooAXNGaSinzMBcmlzTRRT5mAtJSig02rq6EJRRiio' +
#
                    'sMKKKKQBRRRQAUUUUAFFFFMAooopAFFFFMAxS0lGaegBRRRSAKKKKACiiigAooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFLjPekoqk7bgLikpc0daGk9gEopaTND' +
#
                    '0AKKKKVwClBxSUUJ21AXOaM0lFPmYBRRRUgLmjNJS1SYADRx6UlFNSsA7IpOtJRQ5sBcUlFFS2mAZooooAKM0UUbALRSUUXAKKKKQBRRRQAUUUUwCiigUALSUUUAKKWm' +
#
                    '0oNXBrqJi0hFFLVPUBtLiikrMYuKTFGaXNACUUuaKQCUUUuM00m9gEopdp70UOLW4CUUtJSAKKKKQBRRRTAKWiko2AKKKKACilop2ASilopWASiiigAxRRS0wEoxS0U0' +
#
                    'kAYoxRSUnYBaKSijQAopaSlYAozS0lGwBRRRQAUUUUgCiilqkAlFFFIApaSii4BQKKKEAUUGihoAooooAKKKKQBRRRQAUUUYpgFFFFIAooooAKKKKACiiimAUtJRQAUU' +
#
                    'UUgCiiigBaKQUtWmIKSlooaASiiipGFFFFABRRRQAUUUUgCiiimAUUUUAFFFFIAoooFMAooooAKWkooTAXFJRS07XASjNLijFPlYCUU6kocbAJRRRUgFFFFABRRRQAUU' +
#
                    'UtABSUvWkptAFFLRQkAmKKKWiyAKOtFJQ2AUUUVIBRRRQAUUUUwCilFJQ11AKKKKACiiigAooopAFLSUUIANFLSU2uoBRRRSAKKKKdgCiiigAooopAFFFFABRRRTQBS0' +
#
                    'lLTQBRRRVCCkpaKTQCUUUVIwooopAFGKKUGqVuoCYopaKfKAlFBoqbAFFFFABRRRSQAaKKKbAKKKMUWAKKXFLiqUGwEzS0lFVdoQUUUVO4CUUtFLlGJRS0UrAJRRRQwC' +
#
                    'iiigApaSlprsAlFFLijUAoxRRTYCGig0VLAKKKWiwCUUtIaLAFFFFIApaSlzVJgGKSlzRTaXQBKKXFJipAKKMUUAFFFFFgClpKKEAUU8ISKay4q3SmldoVxKKKKi4woo' +
#
                    'opAFFFFMAooopAFLRSVQBRRRSQC0UlLVJgFFFFFxBRRRRYBKKKKkYUUUUgCiilxTV2AlFOxSYqnFgJRS4pKloAooooAKWilq4xuITFFKaSh2WiAM0ZNFGKTbYxKKKKm4' +
#
                    'BmlpKWmmAUUUUwCkpaSkwFpKKKW4BRRRSAWikop3AWiiiq2AKKQUtIBKKKWhK4BRRRTsIKKKKAEopaMUrDEooopAFLSUU0AuKKM0Zp3QgopM0ZpXQwxRRRSuAUo460lF' +
#
                    'NO2oC5pKKKTbAKKKKQBRRRQAUUUUwFxR0pKKaaQCmkoopN3AKKKKQC0UlFUpALRSUU7oBaKSilcAoopcUkrgJRS7aMU+VgJS5NGKSlqgFzS7qbRmrjUkhWFOTSUuaKTS' +
#
                    'eoCU7rSUU46ALik6UZpKHJdADNFFLU6jEooopXAKKKKQBRRRQAUtJS1SAKKKKPUAxRmikxRfsAUUtJRYApelFFC0ADSUUUN3AKXNJRSTAKXNJRQpNbALuozSUVXPJgLm' +
#
                    'kzRRU3YBk0UUUrgFFFFABRRRQAUUUUAFFFFABRRRQAUUGimwCiiikAUUUtMBKKKBQAUUUtACUUppKACilpKGAUUUUgCiiigAooooAKKKKYBRRRQA4Gim0oNaRnfRisLS' +
#
                    'GiiiWoCUUGis9hhS0lFCYC5pM0UUOTAKKKKQC0lFFO9wFpKKXNG4CUUUUMAooopAFKDSUU07AOppozS1fxbCEpaCR6UvHahR8wEooopNAFJS0UhiUUtFFgEoooqQCiii' +
#
                    'gAooooAX60hGKKUHsapWejASilIxSUmmtwCiiigBaSiii4BRRRSAKKKKAClpKWqXcBKKKKkAooopgFFFFABRRS0wEpaKKAEooopAFFFBoAKKKKACiiikAUUUUwCiiikA' +
#
                    'UUUUAFFFFMApc0lFNSaAWkoopN3AKKKKACiiikAUUUYpgFFFFIAooooAKWkpaaASiiigAooopAFGaKKdwCiiikAUtJQDVJ9wFpKKKGAUtFFFgEopaSk0AUUUUAFFFFIA' +
#
                    'ooooAUHjFJRS9RVXbQCUUUuKFFsBKKdwKMj0p8i7gNoxS7vYUmc0mkgCiiikAtJS0lNgFFFFSAUUUUwCiiimAUUUUgFoNJRmmAUUUUgClpKWmgEooopAFFFFABRRS0WA' +
#
                    'SiiikAUUUUwCiiikAUUUuKdgEopcUU7AJiilop2uAlGKeAKcEHc1rHDylsK5Hg0u04zipCyr0FMLk1cqdOmtZXYrtiUlFFYN3GFJRRUDClFJRQgCilozTAMUlFFIAooo' +
#
                    'pAFGKKWmkAlFLSUWAKKWkoYBS0lKKaYBRSGihMBaMUUvSqSuIbRTutJik4MdxKKMUVNgClFJRQnZgFFFGKLAFFFL0osAlFFFABS0UU0u4BSUUUgCiiigAooooAUUUlLT' +
#
                    'ASiiikAUUUUAFFFFABS0lLTQCGiloxRYBKWiihAFJS0lD0AKKKKkAooopgGKXFJRTTS3QDtpoxTc0uTWilDsLUdijFN3Gl3ValBhqGKMUu4UEjrRaO6EJ0oLGkJzSVnK' +
#
                    'o9kOwUUUVkMKXikopp2AdmkpKKfM2AUUuKSkAUUUUALSYooouAUUUtOwBSUUUNgLRSUtC10ASlopKQBRRRQAtJRRTuAZopaSgBc0ZpKKFJoBaSlpKGAUUuKSlYAoopeB' +
#
                    'TAOlJR1oobvoAuDRjFGaXqKpRi1oIbmiiioYwooopAFFFFNAFLikpaYBRRRQAUUUUAJijFLRmmkgExRS9aDSaASl60lAoiwCiloosAUUUlMBaSiipuAUUUUgCiiimAUU' +
#
                    'UYosAUUUUAFFFFFwCiiikAUUUUwCiiigAooooAKKKKAFoooqrCEopaKVhiUUuKMUrAJRS0U7AJRRRSAKKKM0aAFGaKKACiilxRa4CUYpcUVSj3AKSlpME0NdgFozRtPo' +
#
                    'aTB9KLNdAFpQO5oHHakJzVK0VdiAmkopahtyGJRRiikwCiiikAUUUtNAJRS0lDVgCiiikAUtJS00AlFFFAC0UmaWmAUlFFAC0UUdKpCCkooqG7jCgUUUIBaM0Uu2rSb2' +
#
                    'EJSYp2B60Yp8jC42ilpKhxsMKKKKkAooooAKKKKACiiigAooooAKKKKYBRRRQAtFJRRcApaSigBaSjNFGgC0UCiqQhKWikpDClpKKACiiikwCiiikAUUUUAFLijFL0q1' +
#
                    'HuISnDigAGg1vGPKrsQmaSlxSGs5X6jCjNFFRqAbj607zG9abSU1VnHaTCyFJJ6mkopam7lqxiUtFFNaALSYooyad11EGKKSip0GLSUUUgFooFGKpJsBKKWkqWrAFLSU' +
#
                    'tNAJRilxRRZgFFFFVYQUUnelpbsBegpp5pSaSiUugwoooxUgFLSUUALRmiiqvbYQUtNzS5pqdgsKabRRUylcYUUUVIBRRRQAUUUUwCiiiiwBRRRSAKKKKACiiigAoooo' +
#
                    'AKKKKACiiigAoopapAFFFJRcAooopAFFFFIAooopgFOAxSCjNVGy1AKM0lFLmfQBSxNJRRScm9wFBozSUU1NoAozRRSuwCiiikAUZoooAKKKKYBRRRQAtJRRRcAooopA' +
#
                    'FLmkopptAO60YptFXzJ7iFxRSUVN12GLmjNJRRzMBc0maKUDNGrAAM0uMdaOnNIWJGCeK0tGK13EJRRRWIwpaSimgClFJS00AUlFFJsAoopcUWYCUUUUgCiiigAooooA' +
#
                    'KKKWmAUUUU7gGKSlooaASijFFKwBRRRSAKKKKACiiigAooopgFKKSihMBaM0lFO4C0lFFK9wCilxRimosBMU4L60lGatKK3EKQKbRmiolK+wxaSiildAFFFLRYBMUuKS' +
#
                    'jNNWAWkoopMAooooAKKKMUWAKKXFGKfIwuJRS0U+UQYpcUZpCaq0UAhoopagYhoooqWAUYopaaASilpKYC0UoXNLs960VOT2QriDFO3ADpSFSByKYavmdLSwtxScnNGK' +
#
                    'M0ZrG6erGHFLgGm0oNOMl1QBx3FKNtBGRmm078j2AkwtNIHrTaWqdRSVrBYTFLilxSdKnltuA7ikNFA5q276IBtFKVxSVi4tPUYUUUVIBRRRQAUUUUwCiiigBRRSUUwF' +
#
                    'ozSUUXAKKKKQBRRiiiwBRRRQAUUUUAFFFFABRS0U1EBKWiinyiDNLTaKOYBc0lFFS3cYUUUUAFFFFIAooooAKKKWmAYB6UYpKM1V12AKUCijNCS6gFLSUtWhAKWm0uap' +
#
                    'SVrMA60lLmg0mr6oBKSiismMKKWjFCVwExRS0U3EBKKKKmwBTgtAwKQmtFyx1YhSaTcaSipc5DsKST1NJRRUtt7gFFFFIAooooAUHFB5pKWrT6MBKUUGkpbMB1BFNpcm' +
#
                    'rU09GKwlFFFZ31GOzSGkoqnK6AKKKKgAooooAKKKKACiiigAooopgFFFLQkAYoooqrCCiiiqQC4pMUtG70p+71ATpSUUVm3fYYUtLimmm4uIC0UlLmlcAooop3AMUlLR' +
#
                    'RZAJRS4pKmzAKKKKACiloxTsAlFLikpWAKMUUUwCiilxSAKO9GKKpoAzRmkopczAXNJRRSuAUuaSihMApaKKpIQuKM0lJTcrbALS8DrTaKSlboA7K+lJx2NJRT579AsF' +
#
                    'FLRU2GJRS0lIAxRSiinYBKKKKQBRRRQAUUUUALSUtJTAKKKKQBRRRRYAooopAFFFFDAKKKKAClpKKpAFFLSUNAFFLRQkAUZpKKLsBaKSlppiCiikobAM0UUtTa+4xKKX' +
#
                    'NJR6AKDQaSlFXF30YhKKDRUMYUUUUAFFFFIAzS5pKKabQC4pKKKLgLRRRVIQUlLRRuMQUuKSlpAJS5pKKV7bALmkzRRRdgFFFGKLAFGKXpSZp2S3AKUNj6UlFClZ3QDu' +
#
                    'KSkopudxWCiiipGFLSUopoAoooq9EIKKKKlgBpKKKkYtFJmincBaMUcmlwapJy2QhMUlLg0uPWjlYDaKWipsMSloopgFJS0lJgLSdqWlxmmot7ANopSpFJScWtwCiiip' +
#
                    'AKKKKACiiigBQaKSiqUgFopKWncQUlLRQ0AlFFFSMKKKKAFpKKKLgFFFFIAoFFFPYBTSUo9KKpq+ohKKKKkYUUUUgCiiimAUtJRQAuaSiii9wClpKWmgCkpaSgAopaSk' +
#
                    'AUUUYoAKXNFJTAKKKKVgCiiikAUUUtNAGKSlBpSBjir5U1dCG0UUVAwooopXAKKAKdgCqUbgNpadRurWNOPViuNwfSnBD1NO3DFMJzVunTjre4rsDwaNxo4NNxUOTjts' +
#
                    'MfvppOaSis5VJS3YWFFFAooWoxKKdSUOLASlFJilApJAKBQaKStXtZCCjmiiosrAJRRRWYwooooAKKKKYBRRRQAUUUUAGaXNJRTUmgFzSYooobuAUUUVIBRRRQAUUtFO' +
#
                    'wCUUUUgCndabRVRlYBTSUtFNoBKUUlFTsAtFFFP1AKSiik9QCiiiiwBSikxRigBaKKKYBSUUUnqAUUtJigAooooAKKBRQAUUUUAFFFFIAoBxRRT2AdwfY00jmilB9aq6' +
#
                    'luISjFLmihpIYUtNooUgHUlJRT5xC59KTNFFS5NjFopKUUJgJS4opOlFrAOApabmjNaKcUKwpoFANL1qkk9QAUtJS5ArWLXUQ2kxQzZpyjdWSSnLliMbSU8oRTcEVnOE' +
#
                    'ov3kCYlFFFZjCiiigAooooAKKKKACiiigAooooAKKKKADFFLiiqsAmKWiko0QBRRRSAKKKKACiiikAUZooppsAoooo1AKKKKQBQKKKaAWkpc0lNgLRQKKpaiEpaKKVhi' +
#
                    'UopQKO9NR6sQlFFFJoAxSUtFKwxKU0lKOlCXQBKKXFGKFFsBKKWiiwCUUuKMUcrASiiipAKKKKYBRS0lDAKKKKQBRRRQAUCiihMB1IaSl61pfm0EJRS4NGKnlYxKUHFI' +
#
                    'RiihNxYCk0lFFJyb3AKKKKQChiO9KWzTaKv2krWuFgoooqACiiigAooooAKKKKACiiigApaKKqIBRRRVMQUUUUuoCd6KKKkYUCiigBaSiimwCiiikwCiiihALR2ooqmA' +
#
                    'lFFFQAvakoopsAFBooo6AFFFFAC0UUVaELSUUVT6AFFFFSAUtFFNAFITRRTlsA4cikNFFXPZCEooorIYd6WiiriAhpKKKyluMKKKKSAKKKKGAUUUUgCiiigAooooAKKK' +
#
                    'KAJB0ppNFFdc/hJ6jaKKK5SgooooAKKKKQBRRRTAKKKKQH//2Q==" />';
#
 
#
var checkedIcon = '<img src="data:image/gif;base64,' +
#
                  'R0lGODlhEAAQAOYAAAAAAP///1pdWVlcWF5hXV1gXFteWi0xKz5CPCcpJmNnYVPwAFLuAFHsAFHq' +
#
                  'AFDoAE/mAE/kAE7iAEvYAEnUAEXIAETGAETEAEPCAELAAEG8AD+2AD60AD2yAD2wADusADuqADii' +
#
                  'ADOUAC+IAC6EACyAACt+ACt8AD6vAS6DAS6CASyAASp5AUW5CEODIkJ3JVKRMVGOMFOSMlKQMVSU' +
#
                  'M1GLMl6TQ1mJP2WYSlJ0PzM1MYODg4KCgoGBgX9/f35+fn19fXt7e3p6enl5eXh4eHZ2dnV1dXNz' +
#
                  'c3Jycl9fX11dXVtbW1paWllZWVhYWFdXV1ZWVlNTU09PTzk5OTQ0NDAwMC0tLSgoKCQkJCIiIiEh' +
#
                  'IR8fHx0dHRsbG////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
#
                  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
#
                  'BAEAAF4ALAAAAAAQABAAAAergF6Cg4SFhoeIiYqLSY1KS09PUFFSLi+ESTs8PT4/QUJDNBUYhEs8' +
#
                  'nUBBQ0QyFgsQHINPP56rRjAYDAwbI4M5OEJERUczuQ0cKYQtEzZHSDEZDg4cKjqDGBAMKDc1Gg4P' +
#
                  'HSoEVoMaFAsPFxUQDx4rBUpXhB4VDQ4QER4lBktMWIQIQmiAIOGDCQFNnDzJQmiKAhEeQJwYoHAS' +
#
                  'F0JUqhwgwSIBFi1buHDpIigQADs=" />';
#
 
#
var unCheckedIcon = '<img src="data:image/gif;base64,' +
#
                    'R0lGODlhEAAQAOYAAAAAAP///4ODg4KCgoGBgX9/f35+fn19fXt7e3p6enl5eXh4eHZ2dnV1dXNz' +
#
                    'c3JycnFxcXBwcG5ubm1tbWxsbGtra2lpaWhoaGdnZ2VlZWRkZGNjY2JiYmFhYWBgYF9fX11dXVxc' +
#
                    'XFtbW1paWllZWVhYWFdXV1ZWVlNTU1BQUE9PT05OTkpKSkhISEVFRUREREFBQT4+Pjo6Ojk5OTU1' +
#
                    'NTQ0NDMzMzAwMC0tLSoqKigoKCcnJyQkJCIiIiEhIR8fHx0dHRsbG////wAAAAAAAAAAAAAAAAAA' +
#
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
#
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
#
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
#
                    'BAEAAEIALAAAAAAQABAAAAeUgEKCg4SFhoeIiYqLH40gIiYmJygqKyyEHwIDBAUGCAkKDA4uhCID' +
#
                    'nQcICgsNDxEwhCYGnqutEBIUMoQnnwuitxQVFzSEKaEOrhMUFhgZNoQrrRG4FhcZHB44hC3A1dcd' +
#
                    'HyA6hC8TFcwaGx6PIzyEMd7YICEkJSY9hDPXHh8hIvaTgBCqcQNHDh07ePj4AQRIEEGBAAA7" />';
#
 
#
var running;                    // Is the autoplayer running?
#
var innerPageElt;               // The currently visible inner page
#
var cashNYElt;                  // NY cash DOM element
#
var cashCubaElt;                // Cuba cash DOM element
#
var cashMoscowElt;              // Moscow cash DOM element
#
var cash;                       // Cash array of values by city
#
var healthElt, health;          // Health DOM element and value
#
var maxHealthElt, maxHealth;    // Maximum health DOM element and value
#
var energyElt, energy;          // Energy DOM element and value
#
var maxEnergyElt, maxEnergy;    // Maximum energy DOM element and value
#
var staminaElt, stamina;        // Stamina DOM element and value
#
var maxStaminaElt, maxStamina;  // Maximum stamina DOM element and value
#
var influenceElt, influence;    // influence DOM element and value
#
var maxInfluenceElt, maxInfluence;  // Maximum influence DOM element and value
#
var levelElt, level;            // Level DOM element and value
#
var curAttack;                  // Current Attack stat value
#
var curDefense;                 // Current Defense stat value
#
var curExpElt, curExp;          // Experience DOM element and value
#
var lvlExpElt, lvlExp;          // Level up experience DOM element and value
#
var energyPackElt, energyPack;  // Is an energy pack waiting?
#
var ptsToNextLevel;             // Experience to next level up
#
var mafia;                      // Mafia size
#
var invites;                    // Number of mafia invitations
#
var staminaFlag = false;        // Is stamina incremented?
#
var stats;                      // Skill points
#
var city;                       // Current city (0=New York, 1=Cuba, 2=Moscow)
#
var skipStaminaSpend = false;   // Skip stamina actions for now?
#
var clickAction;                // Action being attempted with click simulation
#
var clickContext;               // Context for clickAction
#
var modificationTimer;          // Timer used to wait for content changes
#
var helpWar = false;            // Helping a friend's war?
#
var idle = true;                // Is the script currently idle?
#
var shakeDownFlag = false;      // Flag so shake down again doesnt get interrupted
#
var lastOpponent;               // Last opponent fought (object)
#
var suspendBank = false;        // Suspend banking for a while
#
var newStaminaMode;             // New stamina mode for random fighting
#
 
#
if (!initialized) {
#
  var settingsOpen = false;
#
  var statsOpen = false;
#
  var didJobCalculations = false;
#
  var scratchpad = document.createElement('textarea');
#
  var defaultClans = ['{', '[', '(', '<', '◄', '«', '™', 'Ψ', 'Ξ'];
#
  var defaultPassPatterns = ['LOST', 'punched', 'Whacked', 'you were robbed', 'ticket'];
#
  var defaultFailPatterns = ['WON','heal','help','properties','upgraded'];
#
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
#
  var xJob = ''; // Keep track of previously failed job
#
 
#
  var debug = isChecked('enableDebug');
#
  var filter = isChecked('filterLog');
#
 
#
  // Regular expression for cash matching.
#
  const REGEX_CASH = /[A-Z]?\$[\d,]*\d/;
#
 
#
  // Define how stamina can be used.
#
  const STAMINA_HOW_FIGHT_RANDOM = 0;  // Random fighting.
#
  const STAMINA_HOW_FIGHT_LIST   = 1;  // List fighting.
#
  const STAMINA_HOW_HITMAN       = 2;  // Hitman.
#
  const STAMINA_HOW_RANDOM       = 3;  // Random spending of stamina in random cities.
#
 
#
  var staminaSpendChoices = [];
#
  staminaSpendChoices[STAMINA_HOW_FIGHT_RANDOM] = 'Fight random opponents';
#
  staminaSpendChoices[STAMINA_HOW_FIGHT_LIST]   = 'Fight specific opponents';
#
  staminaSpendChoices[STAMINA_HOW_HITMAN]       = 'Collect hitlist bounties';
#
  staminaSpendChoices[STAMINA_HOW_RANDOM]       = 'Whack \'em y\'all mafia!';
#
 
#
  // Define Bounty Selection options
#
  const BOUNTY_SHORTEST_TIME  = 0;  // Select qualified bounties with shortest time.
#
  const BOUNTY_LONGEST_TIME   = 1;  // Select qualified bounties with longest time on the hitlist.
#
  const BOUNTY_HIGHEST_BOUNTY = 2;  // Select qualified bounties with the highest bounty.
#
  const BOUNTY_RANDOM         = 3;  // Select random qualified bounty.
#
  var bountySelectionChoices = [];
#
  bountySelectionChoices[BOUNTY_SHORTEST_TIME]  = 'Shortest time';
#
  bountySelectionChoices[BOUNTY_LONGEST_TIME]   = 'Longest time';
#
  bountySelectionChoices[BOUNTY_HIGHEST_BOUNTY] = 'Highest bounty';
#
  bountySelectionChoices[BOUNTY_RANDOM]         = 'No preference (random)';
#
 
#
  // Define war modes
#
  const WAR_HOW_RANDOM = 0;  // Random war.
#
  const WAR_HOW_LIST   = 1;  // List warring
#
  var warModeChoices = ['War a random friend', 'War friends from a list'];
#
 
#
  // Define AutoStat allocation mode
#
  const AUTOSTAT_TARGET        = 0;
#
  const AUTOSTAT_RATIO_LEVEL   = 1;
#
  const AUTOSTAT_RATIO_ATTACK  = 2;
#
  const AUTOSTAT_RATIO_DEFENSE = 3;
#
  const AUTOSTAT_RATIO_HEALTH  = 4;
#
  const AUTOSTAT_RATIO_ENERGY  = 5;
#
  const AUTOSTAT_RATIO_STAMINA = 6;
#
 
#
  // Auto Stat mode arrays
#
  var autoStatDescrips  = ['Level', 'Attack', 'Defense', 'Health', 'Energy', 'Stamina', 'Influence'];
#
  var autoStatModes     = ['autoStatAttackMode', 'autoStatDefenseMode', 'autoStatHealthMode',
#
                           'autoStatEnergyMode', 'autoStatStaminaMode', 'autoStatInfluenceMode'];
#
  var autoStatPrios     = ['autoStatAttackPrio', 'autoStatDefensePrio', 'autoStatHealthPrio',
#
                           'autoStatEnergyPrio', 'autoStatStaminaPrio', 'autoStatInfluencePrio'];
#
  var autoStatFallbacks = ['autoStatAttackFallback', 'autoStatDefenseFallback', 'autoStatHealthFallback',
#
                           'autoStatEnergyFallback', 'autoStatStaminaFallback', 'autoStatInfluenceFallback'];
#
  var autoStatBases     = ['autoStatAttackBase', 'autoStatDefenseBase', 'autoStatHealthBase',
#
                           'autoStatEnergyBase', 'autoStatStaminaBase', 'autoStatInfluenceBase'];
#
  var autoStatRatios    = ['autoStatAttackRatio', 'autoStatDefenseRatio', 'autoStatHealthRatio',
#
                           'autoStatEnergyRatio', 'autoStatStaminaRatio', 'autoStatInfluenceRatio'];
#
 
#
  // Number Scheme
#
  const SCHEME_PERCENT = 0;
#
  const SCHEME_POINTS = 1;
#
 
#
  var numberSchemes = ['percent','points'];
#
 
#
  // Burn constants
#
  const BURN_ENERGY = 0;
#
  const BURN_STAMINA = 1;
#
 
#
  var burnOptions = ['Energy','Stamina'];
#
 
#
  // Array of lottery bonus items
#
  var autoLottoBonusList = ['A random collection item', 'A free ticket', '+5 stamina points', '1 skill point', '+20 energy points', '1-5 Godfather points'];
#
 
#
  // Stat Ordinal constants
#
  const ATTACK_STAT  = 0;
#
  const DEFENSE_STAT = 1;
#
  const HEALTH_STAT  = 2;
#
  const ENERGY_STAT  = 3;
#
  const STAMINA_STAT = 4;
#
  const INFLUENCE_STAT = 5;
#
 
#
  // Define city variables.
#
  const NY     = 0;
#
  const CUBA   = 1;
#
  const MOSCOW = 2;
#
 
#
  // Constants to access city attributes
#
  const CITY_NAME        = 0;
#
  const CITY_CASH        = 1;
#
  const CITY_LEVEL       = 2;
#
  const CITY_CASH_ICON   = 3;
#
  const CITY_CASH_CSS    = 4;
#
  const CITY_AUTOBANK    = 5;
#
  const CITY_BANKCONFG   = 6;
#
  const CITY_SELLCRATES  = 7;
#
  const CITY_CASH_SYMBOL = 8;
#
 
#
  // Add city variables in this format
#
  // Name, Icon, Icon CSS, Auto bank config, Min cash config, Sell Crates config
#
 
#
  // Array container for city variables
#
  var cities = new Array(
#
    ['New York', undefined, 0, cashIcon, 'cash Icon', 'autoBank', 'bankConfig', 'autoSellCratesNY', '$'],
#
    ['Cuba', undefined, 35, cashCubaIcon, 'cashCuba Icon', 'autoBankCuba', 'bankConfigCuba', 'autoSellCrates', 'C$'],
#
    ['Moscow', undefined, 70, cashMoscowIcon, 'cashMoscow Icon', 'autoBankMoscow', 'bankConfigMoscow', 'autoSellCratesMoscow', 'R$']
#
  );
#
 
#
  // Spend objects
#
  var SpendStamina = new Spend ('Stamina', 'staminaSpend', 'useStaminaStarted',
#
                                'selectStaminaKeepMode', 'selectStaminaKeep',
#
                                'selectStaminaUseMode', 'selectStaminaUse', staminaIcon,
#
                                'allowStaminaToLevelUp', 'staminaFloorLast', 'staminaCeilingLast');
#
  var SpendEnergy  = new Spend ('Energy', 'autoMission', 'useEnergyStarted',
#
                                'selectEnergyKeepMode', 'selectEnergyKeep',
#
                                'selectEnergyUseMode', 'selectEnergyUse', energyIcon,
#
                                'allowEnergyToLevelUp', 'energyFloorLast', 'energyCeilingLast');
#
 
#
  // Force Heal options
#
  var healOptions = new Array(
#
    ['forceHealOpt3','Heal if stamina can be spent'],
#
    ['forceHealOpt4','Heal if stamina is full'],
#
    ['forceHealOpt5','Heal after 5 minutes']
#
  );
#
 
#
  // Define all jobs. The array elements are:
#
  // job description, unadjusted energy cost, job number, tab number, city, unadjusted exp payout
#
  var missions = new Array(
#
    ['Mugging',1,1,1,NY,1],
#
    ['Corner Store Hold-up',3,2,1,NY,3],
#
    ['Warehouse Robbery',5,3,1,NY,5],
#
    ['Auto Theft',7,4,1,NY,8],
#
    ['Beat Up Rival Gangster',2,5,1,NY,2],
#
    ['Rob a Pimp',3,8,1,NY,3],
#
    ['Collect on a Loan',2,37,1,NY,2],
#
    ['Collect Protection Money',2,6,2,NY,2],
#
    ['Rough Up Dealers',2,7,2,NY,2],
#
    ['Take Out a Rogue Cop',3,9,2,NY,3],
#
    ['Perform a Hit',3,10,2,NY,3],
#
    ['Bank Heist',10,11,2,NY,13],
#
    ['Jewelry Store Job',15,12,2,NY,20],
#
    ['Hijack a Semi',8,38,2,NY,9],
#
    ['Destroy Enemy Mob Hideout',5,13,3,NY,5],
#
    ['Kill a Protected Snitch',5,14,3,NY,5],
#
    ['Bust a Made Man Out of Prison',5,15,3,NY,5],
#
    ['Asian Museum Break-in',18,16,3,NY,22],
#
    ['Fight a Haitian Gang',6,17,3,NY,6],
#
    ['Clip the Irish Mob\'s Local Enforcer',10,39,3,NY,11],
#
    ['Steal a Tanker Truck',8,40,3,NY,9],
#
    ['Federal Reserve Raid',25,18,4,NY,30],
#
    ['Smuggle Thai Gems',7,19,4,NY,8],
#
    ['Liquor Smuggling',30,22,4,NY,35],
#
    ['Run Illegal Poker Game',20,26,4,NY,33],
#
    ['Wiretap the Cops',30,28,4,NY,45],
#
    ['Rob an Electronics Store',24,41,4,NY,26],
#
    ['Burn Down a Tenement',18,42,4,NY,22],
#
    ['Distill Some Liquor',10,23,4,NY,12],
#
    ['Manufacture Tokens',10,24,4,NY,12],
#
    ['Get Cheating Deck',10,25,4,NY,12],
#
    ['Overtake Phone Central',10,27,4,NY,12],
#
    ['Repel the Yakuza',13,29,5,NY,18],
#
    ['Disrupt Rival Smuggling Ring',15,30,5,NY,20],
#
    ['Invade Tong-controlled Neighborhood',25,31,5,NY,30],
#
    ['Sell Guns to the Russian Mob',25,32,5,NY,35],
#
    ['Protect your City against a Rival Family',35,33,5,NY,50],
#
    ['Assassinate a Political Figure',35,34,5,NY,50],
#
    ['Exterminate a Rival Family',40,35,5,NY,58],
#
    ['Obtain Compromising Photos',28,43,5,NY,32],
#
    ['Frame a Rival Capo',26,44,5,NY,33],
#
    ['Steal an Air Freight Delivery',32,45,6,NY,36],
#
    ['Run a Biker Gang Out of Town',35,46,6,NY,40],
#
    ['Flip a Snitch',25,47,6,NY,30],
#
    ['Steal Bank Records',30,48,6,NY,36],
#
    ['Loot the Police Impound Lot',60,49,6,NY,60],
#
    ['Recruit a Rival Crew Member',30,50,6,NY,39],
#
    ['Dodge an FBI Tail',20,51,6,NY,27],
#
    ['Whack a Rival Crew Leader',28,52,6,NY,38],
#
    ['Influence a Harbor Official',50,53,7,NY,65],
#
    ['Move Stolen Merchandise',36,54,7,NY,50],
#
    ['Snuff a Rat',44,55,7,NY,62],
#
    ['Help a Fugitive Flee the Country',40,56,7,NY,57],
#
    ['Dispose of a Body',25,57,7,NY,36],
#
    ['Ransom a Businessman\'s Kids',60,58,7,NY,70],
#
    ['Fix the Big Game',50,59,7,NY,60],
#
    ['Steal an Arms Shipment',45,60,7,NY,66],
#
    ['Extort a Corrupt Judge',24,61,8,NY,36],
#
    ['Embezzle Funds Through a Phony Company',50,62,8,NY,70],
#
    ['Break Into the Armory',50,63,8,NY,60],
#
    ['Rip Off the Armenian Mob',50,64,8,NY,68],
#
    ['Muscle in on a Triad Operation',45,65,8,NY,68],
#
    ['Ambush a Rival at a Sit Down',55,66,8,NY,80],
#
    ['Order a Hit on a Public Official',35,67,8,NY,55],
#
    ['Take Over an Identity Theft Ring',36,68,8,NY,52],
#
    ['Settle a Beef... Permanently',40,69,9,NY,64],
#
    ['Buy Off a Federal Agent',35,70,9,NY,50],
#
    ['Make a Deal with the Mexican Cartel',40,71,9,NY,60],
#
    ['Blackmail the District Attorney',44,72,9,NY,66],
#
    ['Shake Down a City Council Member',85,73,9,NY,124],
#
    ['Make Arrangements for a Visiting Don',40,74,9,NY,60],
#
    ['Take Control of a Casino',70,75,9,NY,110],
#
    ['Travel to the Old Country',52,76,9,NY,82],
#
    ['Rob Your Cab Driver',12,1,1,CUBA,16],
#
    ['Secure A Safehouse',36,2,1,CUBA,49],
#
    ['Intimidate The Locals',52,3,1,CUBA,70],
#
    ['Silence a Noisy Neighbor',32,4,1,CUBA,44],
#
    ['Smuggle In Some Supplies',34,5,1,CUBA,45],
#
    ['Set Up A Numbers Racket',44,6,1,CUBA,60],
#
    ['Establish Contact With The FRG',38,7,1,CUBA,50],
#
    ['Take Out The Local Police Chief',41,8,1,CUBA,55],
#
    ['"Persuade" A Local To Talk',51,41,1,CUBA,69],
#
    ['Assault A Snitch\'s Hideout',56,42,1,CUBA,75],
#
    ['Transport A Shipment of US Arms',42,9,2,CUBA,59],
#
    ['Meet With The FRG Leadership',38,10,2,CUBA,54],
#
    ['Hold Up A Tour Bus',45,11,2,CUBA,65],
#
    ['Ambush A Military Patrol',51,12,2,CUBA,72],
#
    ['Capture An Army Outpost',56,13,2,CUBA,79],
#
    ['Sneak A Friend Of The Family Into The Country',35,14,2,CUBA,50],
#
    ['Ransack A Local Plantation',43,15,2,CUBA,61],
#
    ['Burn Down A Hacienda',58,16,2,CUBA,82],
#
    ['Offer "Protection" To A Nightclub',38,17,3,CUBA,56],
#
    ['Rob The Banco Nacional Branch',52,18,3,CUBA,77],
#
    ['Shake Down A Hotel Owner',40,19,3,CUBA,58],
#
    ['Bring The Local Teamsters Under Your Control',46,20,3,CUBA,68],
#
    ['Help The FRG Steal A Truckload Of Weapons',51,21,3,CUBA,74],
#
    ['Hijack A Booze Shipment',45,22,3,CUBA,67],
#
    ['Pillage A Shipyard',52,23,3,CUBA,76],
#
    ['Take Over The Docks',60,24,3,CUBA,88],
#
    ['Muscle In On A Local Casino',44,25,4,CUBA,67],
#
    ['Establish A Loansharking Business',49,26,4,CUBA,74],
#
    ['Eliminate A Rival Family\'s Agent',42,27,4,CUBA,64],
#
    ['Pass On Some Intel To The FRG',45,28,4,CUBA,67],
#
    ['Execute A Regional Arms Dealer',50,29,4,CUBA,76],
#
    ['Sink A Competing Smuggler\'s Ship',52,30,4,CUBA,78],
#
    ['Gun Down An Enemy Crew At The Airport',56,31,4,CUBA,85],
#
    ['Assassinate An Opposing Consigliere',62,32,4,CUBA,93],
#
    ['Raid The Arms Depot',53,33,5,CUBA,81],
#
    ['Supply The FRG With Some Extra Muscle',46,34,5,CUBA,70],
#
    ['Capture The Airport',56,35,5,CUBA,85],
#
    ['Knock Off A Visiting Head Of State',52,36,5,CUBA,79],
#
    ['Set Up A High Volume Smuggling Operation',55,37,5,CUBA,85],
#
    ['Blow Up A Rail Line',50,38,5,CUBA,77],
#
    ['Attack The Army Command Post',58,39,5,CUBA,88],
#
    ['Storm The Presidential Palace',70,40,5,CUBA,106],
#
    ['Arrange A New York Drug Shipment',62,43,6,CUBA,95],
#
    ['Launder Money Through A Resort',72,44,6,CUBA,110],
#
    ['Loot The National Museum',78,45,6,CUBA,117],
#
    ['Send Some Help Home To New York',64,46,6,CUBA,98],
#
    ['Take Over The Havana Reconstruction',82,47,6,CUBA,123],
#
    ['Help Get An Associate A No Bid Contract',56,48,6,CUBA,85],
#
    ['Trans-Ship A Container Full of Refugees',48,49,6,CUBA,73],
#
    ['Meet With "The Russian"',58,50,6,CUBA,89],
#
    ['Smuggle Consumer Electronics for the Vory',46,1,1,MOSCOW,61],
#
    ['Arrange A Drug Shipment for the Mafiya',40,2,1,MOSCOW,53],
#
    ['Fight Off An Ultra-National Gang',112,3,1,MOSCOW,115],
#
    ['Kidnap A Local Gang Leader for the Vory',47,4,1,MOSCOW,63],
#
    ['Collect The Ransom',50,5,1,MOSCOW,64],
#
    ['Receive Vory Intel On Dmitri',40,6,1,MOSCOW,54],
#
    ['Kill A Local Gang Leader for the Mafiya',47,7,1,MOSCOW,63],
#
    ['Collect the Hit Payoff',56,8,1,MOSCOW,76],
#
    ['Buy Mafiya Intel On Dmitri',52,9,1,MOSCOW,74],
#
    ['Threaten A Gang\'s Supplier',58,10,1,MOSCOW,79],
#
    ['Hijack An Arms Shipment From A Militant Gang',67,11,1,MOSCOW,90],
#
    ['Hospitalize Some Nationalists',76,12,1,MOSCOW,104],
#
    ['Confront Gang Leader Dmitri Leonov',76,13,1,MOSCOW,104],
#
    ['Bribe An Election Official',57,14,2,MOSCOW,77],
#
    ['Silence A Political Critic',53,15,2,MOSCOW,73],
#
    ['Violently Break Up A Campaign Rally',137,16,2,MOSCOW,141],
#
    ['Fix A Local Election for the Vory',66,17,2,MOSCOW,91],
#
    ['Extract A Favor From The Winner',97,18,2,MOSCOW,128],
#
    ['Catch Karpov Accepting A Bribe',77,19,2,MOSCOW,105],
#
    ['Abduct A Candidate\'s Wife for the Mafiya',66,20,2,MOSCOW,89],
#
    ['"Convince" The Candidate To Withdraw',90,21,2,MOSCOW,126],
#
    ['Kill An Investigative Reporter',75,22,2,MOSCOW,107],
#
    ['Pay Off The Port Authority In Arkhangelsk',57,23,2,MOSCOW,77],
#
    ['Re-route An Equipment Shipment',80,24,2,MOSCOW,106],
#
    ['Circulate Damaging Photos',99,25,2,MOSCOW,137],
#
    ['Take Down Party Boss Karpov',76,26,2,MOSCOW,109],
#
    ['Case The RossijaBanc Building',65,31,3,MOSCOW,88],
#
    ['Map Out The Escape Route',80,32,3,MOSCOW,108],
#
    ['Rob The RossijaBanc Central Repository',165,33,3,MOSCOW,172],
#
    ['Take A Guard Hostage During Your Escape',82,34,3,MOSCOW,112],
#
    ['Use The Guard\'s Keys To Access the Bank Armory',105,35,3,MOSCOW,140],
#
    ['"Borrow" The Guard\'s Uniform After Releasing Him',88,36,3,MOSCOW,117],
#
    ['Execute A Bank Guard During Your Escape',82,37,3,MOSCOW,112],
#
    ['Steal The Bank President\'s Car Keys',99,38,3,MOSCOW,132],
#
    ['Strip A Uniform Off The Corpse',91,39,3,MOSCOW,121],
#
    ['Blackmail A Secretary For An Exec\'s Itinerary',96,40,3,MOSCOW,129],
#
    ['Dispose Of A RossijaBanc Exec At Sea',89,41,3,MOSCOW,118],
#
    ['Replace A Guard With Your Own Man',118,42,3,MOSCOW,165],
#
    ['Manage An Escort Service Catering to Soldiers',111,44,4,MOSCOW,151],
#
    ['Support The Habit Of A Procurement Officer',125,45,4,MOSCOW,170],
#
    ['Ransack A Defense Contractor\'s Office',198,46,4,MOSCOW,210],
#
    ['Fly To The Siberian Military District',118,47,4,MOSCOW,161],
#
    ['Rob A Troop Convoy',108,48,4,MOSCOW,143],
#
    ['Intercept The Base\'s Pay Shipment',105,49,4,MOSCOW,143],
#
    ['Travel To The Volga Military District',118,50,4,MOSCOW,161],
#
    ['Arrange The Sale Of Weapons-Grade Explosives',119,51,4,MOSCOW,158],
#
    ['Capitalize On An Officer\'s Gambling Problem',107,52,4,MOSCOW,146],
#
    ['Make Connections With An Arms Dealer',123,53,4,MOSCOW,168],
#
    ['Transport Some Stolen Military Hardware',125,54,4,MOSCOW,165],
#
    ['Buy Off The General\'s Command Team',134,55,4,MOSCOW,188],
#
    ['Stop A Terrorist Attack In Moscow',116,61,5,MOSCOW,159],
#
    ['Discover Who Was Responsible',124,62,5,MOSCOW,170],
#
    ['Hunt Down A Ural Liberation Front Contact',215,63,5,MOSCOW,230],
#
    ['Infiltrate The ULF Cell',132,64,5,MOSCOW,181],
#
    ['Help "Plan" The Next Attack',121,65,5,MOSCOW,160],
#
    ['Sabotage The Plan From The Inside',127,66,5,MOSCOW,174],
#
    ['Discover The Location Of The Next ULF Attack',132,67,5,MOSCOW,181],
#
    ['Kill A Lookout',127,68,5,MOSCOW,170],
#
    ['Stop The ULF Attack',131,69,5,MOSCOW,180],
#
    ['Torture A ULF Lieutenant',120,70,5,MOSCOW,164],
#
    ['Look For The Boss\' Mountain Hideout',135,71,5,MOSCOW,180],
#
    ['Start An Avalanche Above The Terrorist Camp',145,72,5,MOSCOW,205],
#
    ['Foil The Sabotage Of Your Moscow Holdings',130,74,6,MOSCOW,180],
#
    ['Acquire Classified Files On Crime Syndicates',122,75,6,MOSCOW,169],
#
    ['Gun Down Some Russian Muscle',238,76,6,MOSCOW,258],
#
    ['Attack A Mafiya Business',136,77,6,MOSCOW,188],
#
    ['Hijack A Mafiya Cargo',134,78,6,MOSCOW,179],
#
    ['Threaten A Mafiya Moneyman\'s Family',128,79,6,MOSCOW,176],
#
    ['Burn Down A Vory Safehouse',136,80,6,MOSCOW,188],
#
    ['Hit A Vory Nightclub',128,81,6,MOSCOW,171],
#
    ['Break Into An Architect\'s Office',134,82,6,MOSCOW,185],
#
    ['Take Over A West-Bound Trafficking Pipeline',140,83,6,MOSCOW,194],
#
    ['Ship Black-Market Caviar To London',137,84,6,MOSCOW,189],
#
    ['Assault The Mansion Walls',148,85,6,MOSCOW,211]
#
  );
#
 
#
  var missionTabs = [];
#
  missionTabs[NY] = new Array(
#
    'Street Thug (Levels 1-4)',
#
    'Associate (Levels 5-8)',
#
    'Soldier (Levels 9-12)',
#
    'Enforcer (Levels 13-17)',
#
    'Hitman (Levels 18-24)',
#
    'Capo (Levels 25-34)',
#
    'Consigliere (Levels 35-59)',
#
    'Underboss (Levels 60-99)',
#
    'Boss (Levels 100+)'
#
  );
#
  missionTabs[CUBA] = new Array(
#
    'El Soldado (Levels 35-59)',
#
    'El Capitan (Levels 60-84)',
#
    'El Jefe (Levels 85-109)',
#
    'El Patron (Levels 110-129)',
#
    'El Padrino (Levels 130-150)',
#
    'El Cacique (Levels 151+)'
#
  );
#
  missionTabs[MOSCOW] = new Array(
#
    'Baklany',
#
    'Boets',
#
    'Brigadir',
#
    'Avtoritet',
#
    'Vor',
#
    'Pakhan'
#
  );
#
 
#
  var requirementJob = new Array(
#
    ['Liquor', 'Distill Some Liquor'],
#
    ['Tokens', 'Manufacture Tokens'],
#
    ['Wiretap Device', 'Overtake Phone Central'],
#
    ['1 Wiretap Device', 'Overtake Phone Central'],
#
    ['Cards', 'Get Cheating Deck'],
#
    ['Untraceable Cell Phone', 'Rob an Electronics Store'],
#
    ['Concealable Camera', 'Rob an Electronics Store'],
#
    ['Computer Set-Up', 'Rob an Electronics Store'],
#
    ['Blackmail Photos', 'Obtain Compromising Photos'],
#
    ['Illegal Transaction Records', 'Steal Bank Records'],
#
    ['.22 Pistol', 'Beat Up Rival Gangster'],
#
    ['Revolver', 'Beat Up Rival Gangster'],
#
    ['9mm Semi-Automatic', 'Rob a Pimp'],
#
    ['Butterfly Knife', 'Collect Protection Money'],
#
    ['Brass Knuckles', 'Rough Up Dealers'],
#
    ['Tactical Shotgun', 'Perform a Hit'],
#
    ['.45 Revolver', 'Take Out a Rogue Cop'],
#
    ['C4', 'Destroy Enemy Mob Hideout'],
#
    ['Stab-Proof Vest', 'Kill a Protected Snitch'],
#
    ['Automatic Rifle', 'Bust a Made Man Out of Prison'],
#
    ['Lucky Shamrock Medallion', 'Clip the Irish Mob\'s Local Enforcer'],
#
    ['Semi-Automatic Shotgun', 'Fight a Haitian Gang'],
#
    ['Firebomb', 'Steal a Tanker Truck'],
#
    ['Armored Truck', 'Smuggle Across the Border'],
#
    ['Grenade Launcher', 'Repel the Yakuza'],
#
    ['.50 Caliber Rifle', 'Disrupt Rival Smuggling Ring'],
#
    ['Armored Car', 'Invade Tong-controlled Neighborhood'],
#
    ['RPG Launcher', 'Sell Guns to the Russian Mob'],
#
    ['Bodyguards', 'Protect your City against a Rival Family'],
#
    ['Night Vision Goggles', 'Assassinate a Political Figure'],
#
    ['Napalm', 'Exterminate a Rival Family'],
#
    ['Prop plane', 'Steal an Air Freight Delivery'],
#
    ['Chopper', 'Run a Biker Gang Out of Town'],
#
    ['Luxury Yacht', 'Influence a Harbor Official'],
#
    ['GX9', 'Ransom a Businessman\'s Kids'],
#
    ['Bookie\'s Holdout Pistol', 'Fix the Big Game'],
#
    ['Multi-Purpose Truck', 'Break Into the Armory'],
#
    ['BA-12 Assault Rifle', 'Rip Off the Armenian Mob'],
#
    ['Falsified Documents', 'Take Over an Identity Theft Ring'],
#
    ['Federal Agent', 'Buy Off a Federal Agent'],
#
    ['Private Jet', 'Make a Deal with the Mexican Cartel'],
#
    ['Police Cruiser', 'Blackmail the District Attorney'],
#
    ['Armoured Limousine', 'Shake Down a City Council Member'],
#
    ['Cigarette Boat', 'Take Over The Docks'],
#
    ['TNT', 'Raid The Arms Depot'],
#
    ['Si-14 Cargo Plane', 'Capture The Airport'],
#
    ['Armored State Car', 'Storm The Presidential Palace'],
#
    ['Untraceable Cell Phone', 'Arrange A Drug Shipment for the Mafiya'],
#
    ['Concealable Camera', 'Smuggle Consumer Electronics for the Vory'],
#
    ['Dossier on Dmitri', 'Receive Vory Intel On Dmitri'],
#
    ['Dossier on Dmitri', 'Buy Mafiya Intel On Dmitri'],
#
    ['Ballistic Knife', 'Silence A Political Critic'],
#
    ['Severnyy Olen Snowbike', 'Extract A Favor From The Winner'],
#
    ['Set of Photos of Karpov', 'Kill An Investigative Reporter'],
#
    ['Set of Photos of Karpov', 'Catch Karpov Accepting A Bribe'],
#
    ['RAS-15', '"Convince" The Candidate To Withdraw'],
#
    ['Officer Corps Paycheck', 'Capitalize On An Officer\'s Gambling Problem'],
#
    ['Officer Corps Paycheck', 'Intercept The Base\'s Pay Shipment'],
#
    ['Bank Guard Uniform', 'Strip A Uniform Off The Corpse'],
#
    ['Bank Guard Uniform', '"Borrow" The Guard\'s Uniform After Releasing Him'],
#
    ['Stick of Dynamite', 'Sabotage The Plan From The Inside'],
#
    ['Stick of Dynamite','Stop The ULF Attack'],
#
    ['Mansion Details','Break Into An Architect\'s Office'],
#
    ['Mansion Details', 'Threaten A Mafiya Moneyman\'s Family']
#
 
#
  );
#
 
#
  // FIXME: Should this be selectable by users?
#
  // These jobs pays 5, 3, 2, 1 exp respectively.
#
  var expBurners = [2, 1, 4, 0];
#
 
#
  String.prototype.trim = function() {
#
    return this.replace(/^\s+|\s+$/g, '');
#
  }
#
  String.prototype.ltrim = function() {
#
    return this.replace(/^\s+/, '');
#
  }
#
  String.prototype.rtrim = function() {
#
    return this.replace(/\s+$/, '');
#
  }
#
  String.prototype.untag = function() {
#
    return this.replace(/<[^>]*>/g, '');
#
  }
#
 
#
  Array.prototype.searchArray = function(target, index) {
#
    // To use this method, "this" must be an array of arrays. Each array
#
    // contained in "this" has one of its elements (specified by the
#
    // "index" parameter) compared against the target parameter. An array
#
    // is returned that contains the indices of "this" in which a match
#
    // was found.
#
    //
#
    // NOTE: "target" can be a regular expression. If the array element
#
    //       is a string, it is compared for a pattern match.
#
    var returnArray = [];
#
    for (var i = 0, iLength = this.length; i<iLength; ++i) {
#
      if (typeof(target) == 'function' &&
#
          typeof(this[i][index]) == 'string') {
#
        // Assume target is a regex to be matched against the string.
#
        if (target.test(this[i][index])) {
#
          returnArray.push(i);
#
        }
#
      } else if (this[i][index] === target) {
#
        returnArray.push(i);
#
      }
#
    }
#
    return returnArray.length? returnArray : false;
#
  }
#
 
#
  // Array.unique() - Remove duplicate values
#
  Array.prototype.unique = function() {
#
    var a = [];
#
    var l = this.length;
#
    for (var i=0; i < l; ++i) {
#
      for (var j = i + 1; j < l; ++j) {
#
        // If this[i] is found later in the array
#
        if (this[i] === this[j])
#
          j = ++i;
#
      }
#
      a.push(this[i]);
#
    }
#
    return a;
#
  };
#
 
#
  // Check for missing settings.
#
  if (GM_getValue('autoClick') == undefined) {
#
    saveDefaultSettings();
#
    addToLog('info Icon', 'If you want to perform jobs, fighting, and other actions automatically, please adjust your settings.');
#
  }
#
 
#
  // Check for a version change.
#
  if (GM_getValue('version') != SCRIPT.version ||
#
      GM_getValue('build') != SCRIPT.build) {
#
    handleVersionChange();
#
  }
#
 
#
  // Set the initial run state.
#
  if (typeof GM_getValue('isRunning') != 'boolean') {
#
    // FIXME: Perhaps it should be false, and instead pop up an alert
#
    //        asking the user to check the settings?
#
    GM_setValue('isRunning', false);
#
  }
#
  running = GM_getValue('isRunning');
#
 
#
  var Reload = new Animate();
#
  Reload.desc = 'reload';
#
  var Autoplay = new Animate();
#
  Autoplay.desc = 'auto-play';
#
  Autoplay.fx = loadHome;
#
 
#
  // Get player lists.
#
  var fightListInactive = new PlayerList('fightListInactive');
#
  var fightListActive   = new PlayerList('fightListActive');
#
  var fightListNew      = new PlayerList('fightListNew');
#
  var fightListAvoid    = new PlayerList('fightListAvoid');
#
 
#
  // This line is optional, but it makes the menu display faster.
#
  customizeMasthead();
#
  customizeLayout();
#
 
#
  // Add event listeners.
#
  setListenContent(true);
#
  setListenFBNotifications(true);
#
  setListenAutoSkip(true);
#
 
#
  // Make sure the modification timer goes off at least once.
#
  setModificationTimer();
#
 
#
  var initialized = true;
#
  DEBUG('Completed initialize.');
#
 
#
  // Check language.
#
  if (GM_getValue('language') != 'en') {
#
    DEBUG('Language is "' + GM_getValue('language') + '".');
#
    addToLog('warning Icon', 'Unfortunately, only the English version of the game is fully supported. If you experience problems, set your Facebook language to English and try again.');
#
  }
#
}
#
 
#
function Animate() {
#
  this.TOUT = null;
#
  this.desc = '';
#
  this.fx = null;
#
  this.delay = null;
#
}
#
 
#
Animate.prototype.clearTimeout = function() {
#
  if (this.TOUT) {
#
    DEBUG('Clearing ' + this.desc + ' timer ' + this.TOUT + '.');
#
    clearTimeout(this.TOUT);
#
    this.TOUT = null;
#
  }
#
}
#
 
#
Animate.prototype.setTimeout = function(fx, delay) {
#
  this.clearTimeout();
#
  this.fx = fx;
#
  this.delay = delay;
#
  // Make the handler clear TOUT. This prevents attempts
#
  // to clear timers that have already gone off.
#
  var obj = this;
#
  this.TOUT = window.setTimeout(function () { obj.TOUT = null; fx(); }, delay);
#
  DEBUG('Started ' + this.desc + ' timer ' + this.TOUT +
#
        ', delay=' + delay/1000 + ' sec.');
#
}
#
 
#
Animate.prototype.start = function() {
#
  if (running && settingsOpen === false) {
#
    this.setTimeout(this.fx, this.delay);
#
  } else if (settingsOpen === true) {
#
    DEBUG('Settings box open. Not starting ' + this.desc + ' timer.');
#
  } else {
#
    DEBUG('Autoplayer paused. Not starting ' + this.desc + ' timer.');
#
  }
#
}
#
 
#
// Set up auto-reload (if enabled).
#
autoReload();
#
 
#
if (!refreshGlobalStats()) {
#
  handleUnexpectedPage();
#
 
#
  // Stop the script. (The timer will still go off and reload.)
#
  return;
#
}
#
 
#
refreshSettings();
#
 
#
if (GM_getValue('logOpen') == 'open') {
#
  showMafiaLogBox();
#
}
#
return;
#
 
#
///////////////////////////////////////////////////////////////////////////////
#
//   End of top-level code. Automatic play is kicked off by doAutoPlay().    //
#
///////////////////////////////////////////////////////////////////////////////
#
 
#
function doAutoPlay () {
#
  // Set the default auto-play timer function and delay.
#
  Autoplay.fx = goHome;
#
  Autoplay.delay = getAutoPlayDelay();
#
 
#
  var previouslyIdle = idle;
#
  idle = false;
#
 
#
  //Dont let healing interrupt shake down again
#
  if (running && shakeDownFlag) {
#
    if (collectRacket()) return;
#
  }
#
 
#
  // Auto-heal
#
  if (running &&
#
      isChecked('autoHeal') &&
#
      health < GM_getValue('healthLevel', 0) &&
#
      health < maxHealth &&
#
      (health > 19 || (SpendStamina.canBurn && stamina > 0) || canForceHeal())) {
#
    autoHeal();
#
    return;
#
  }
#
 
#
  // Check top mafia bonus
#
  if (running && (!timeLeftGM('topMafiaTimer') || isUndefined('selectEnergyBonus') || isUndefined('selectExpBonus'))) {
#
    getTopMafiaInfo();
#
  }
#
 
#
  // Determine whether a job and/or fight/hit could be attempted.
#
  var autoMissionif = running && canMission();
#
  var autoStaminaSpendif = running && !skipStaminaSpend && canSpendStamina();
#
  var energyMaxed = (autoMissionif && energy >= maxEnergy);
#
  var staminaMaxed = (autoStaminaSpendif && stamina >= maxStamina);
#
  var maxed = energyMaxed || staminaMaxed;
#
 
#
  // Check if energy / stamina burning is prioritized
#
  if (isChecked('burnFirst') && !maxed && (autoMissionif || autoStaminaSpendif)) {
#
    var spendFirst = GM_getValue('burnOption');
#
    if (autoMissionif && spendFirst == BURN_ENERGY) autoStaminaSpendif = false;
#
    if (autoStaminaSpendif && spendFirst == BURN_STAMINA) autoMissionif = false;
#
  }
#
 
#
  // Auto-accept
#
  if (running && !maxed && invites > 0 &&
#
      isChecked('acceptMafiaInvitations')) {
#
    if (autoAccept()) return;
#
  }
#
 
#
  // Click attack if on warNav
#
  if (running && onWarNav() && (isChecked('autoWar') || helpWar )) {
#
    if (autoWarAttack()) return;
#
  }
#
 
#
  // Player updates
#
  if (running && !maxed && isChecked('logPlayerUpdates')) {
#
    if (autoPlayerUpdates()) return;
#
  }
#
 
#
  // Racketing
#
  if (running && !maxed && isChecked('racketCollect') && !timeLeftGM('nextRacket')) {
#
    if (collectRacket()) return;
#
  }
#
 
#
  // Auto-take for properties (NY)
#
  if (running && !maxed && isChecked('collectNYTake') && !timeLeftGM('nextNYTake')) {
#
      if (collectNYTake()) return;
#
  }
#
 
#
  // Auto-bank flag
#
  var canBank = isChecked(cities[city][CITY_AUTOBANK]) && !suspendBank &&
#
                cities[city][CITY_CASH] >= parseInt(GM_getValue(cities[city][CITY_BANKCONFG]));
#
 
#
  // Auto-sell business output
#
  if (running && !maxed) {
#
    for (var i = 0, iLength = cities.length; i < iLength; ++i) {
#
      if (level >= cities[i][CITY_LEVEL] &&
#
          isChecked(cities[i][CITY_SELLCRATES]) &&
#
          GM_getValue('sellHour' + cities[i][CITY_NAME], -1) != new Date().getHours()) {
#
 
#
        // Deposit first if selling output on another city
#
        if (city != i && canBank) if (autoBankDeposit()) return;
#
 
#
        // Sell crates
#
        if (autoSellCrates(i)) return;
#
      }
#
    }
#
  }
#
 
#
  // Auto-bank
#
  if (running && !maxed && canBank) {
#
    if (autoBankDeposit()) return;
#
  }
#
 
#
  // Auto-stat
#
  if (running && !maxed && stats > 0 && isChecked('autoStat') && !parseInt(GM_getValue('restAutoStat')) ) {
#
    if (autoStat()) return;
#
  }
#
 
#
  // Auto-buy properties
#
  if (running && !maxed && isChecked('autoBuy')) {
#
    if (propertyBuy()) return;
#
  }
#
 
#
  // Auto-lotto
#
  if (running && !maxed && isChecked('autoLottoOpt')) {
#
    if (autoLotto()) return;
#
  }
#
 
#
  // Auto-war
#
  if (running && !maxed && isChecked('autoWar')) {
#
    if (autoWar()) return;
#
  }
#
 
#
  // Auto-giftwaiting
#
  if (running && !maxed && GM_getValue('autoGiftWaiting')) {
#
    if (autoGiftWaiting()) return;
#
  }
#
 
#
  // Auto-energypack
#
  var ptsFromEnergyPack = maxEnergy * 1.25 * getEnergyGainRate();
#
  var ptsToLevelProjStaminaUse = ptsToNextLevel - stamina*getStaminaGainRate();
#
  var autoEnergyPackWaiting = running && energyPack &&
#
                              ptsFromEnergyPack <= ptsToLevelProjStaminaUse &&
#
                              isChecked('autoEnergyPack');
#
 
#
  if (autoEnergyPackWaiting && energy <= 2) {
#
    DEBUG('ptsToNextLevel=' + ptsToNextLevel +
#
          'ptsToLevelProjStaminaUse=' + ptsToLevelProjStaminaUse);
#
    addToLog('energyPack Icon', 'This energy pack should give you approximately ' + parseInt(ptsFromEnergyPack) + ' xp of your ' + parseInt(ptsToLevelProjStaminaUse) + ' projected remaining xp.' );
#
 
#
    if (!energyPackElt){
#
      DEBUG('Cant find energy pack to click');
#
    } else {
#
      Autoplay.fx = function() {
#
        clickAction = 'energypack';
#
        clickElement(energyPackElt);
#
        DEBUG('Clicked to use energy pack');
#
      }
#
      Autoplay.start();
#
      return;
#
    }
#
  }
#
 
#
  // Do jobs or fight/hit. Give priority to spending stamina if it needs
#
  // to be burned and using one won't level up. Give priority to jobs if
#
  // within one stamina of leveling, or if an energy pack is waiting, or
#
  // if energy is fuller than than stamina (in percentage terms)
#
  // Prioritize burning of energy if level-up within reach.
#
  if ((energy >= maxEnergy) || (stamina<2)) {
#
  if ((autoMissionif && SpendEnergy.canBurn) || (autoMissionif &&
#
       !(autoStaminaSpendif && SpendStamina.canBurn && ptsToNextLevel > 6) &&
#
       (ptsToNextLevel <= 6 || autoEnergyPackWaiting || energy/maxEnergy >= stamina/maxStamina))) {
#
    autoMission();
#
    return;
#
  }
#
  }
#
    if ((autoStaminaSpendif) || (stamina>0)) {
#
    if (autoStaminaSpend()) return;
#
 
#
    // Attempt failed. Let some other action happen before trying again
#
    skipStaminaSpend = true;
#
  }
#
  if (autoMissionif) {
#
    autoMission();
#
    return;
#
  }
#
 
#
  // Auto-send energy pack
#
  if (running && isChecked('sendEnergyPack')) {
#
    if (autoSendEnergyPack()) return;
#
  }
#
 
#
  // If we reach this point, the script is considered to be idle. Anything the
#
  // script might do when there is nothing else to do should go below here.
#
  idle = true;
#
 
#
  // If not previously idle, check the home page.
#
  if (running && !previouslyIdle) {
#
    DEBUG('Now idle. Checking the home page.');
#
    Autoplay.fx = goHome;
#
    Autoplay.start();
#
    return;
#
  }
#
 
#
  // If fight/hit is being skipped, turn it back on and go to the home page
#
  if (running && staminaFlag && skipStaminaSpend) {
#
    skipStaminaSpend = false;
#
    staminaFlag = false;
#
    Autoplay.start();
#
    return;
#
  }
#
 
#
  // Idle in preferred city
#
  if (running && idle && isChecked('idleInCity') && city != GM_getValue('idleLocation', NY)) {
#
    DEBUG('Idling. Moving to ' + cities[GM_getValue('idleLocation', NY)][CITY_NAME] + '. ');
#
    if ((level < 35) && (GM_getValue('idleLocation', NY) == CUBA)) {
#
      addToLog('warning Icon', 'WARNING: Current level does not allow travel to Cuba.');
#
      DEBUG('Idling. Staying in NY.');
#
    } else if ((level < 70) && (GM_getValue('idleLocation', NY) == MOSCOW)) {
#
      addToLog('warning Icon', 'WARNING: Current level does not allow travel to Moscow.');
#
      DEBUG('Idling. Staying in NY.');
#
    } else {
#
      goLocation(GM_getValue('idleLocation',NY));
#
    }
#
    return;
#
  }
#
}
#
 
#
function getAutoPlayDelay() {
#
  return Math.floor(parseFloat(GM_getValue('d1', '3')) + parseFloat((GM_getValue('d2', '5'))-parseFloat(GM_getValue('d1', '3')))*Math.random())*1000;
#
}
#
 
#
function autoReload() {
#
  if (isChecked('autoClick')) {
#
    Reload.fx    = function() {
#
      // Try the "nice" way first, but reload completely if that doesn't work.
#
      goHome();
#
      Reload.fx = loadHome;
#
      Reload.delay = 10000;
#
      Reload.start();
#
    };
#
    Reload.delay = Math.floor(parseFloat(GM_getValue('r1', '30')) +
#
                   parseFloat((GM_getValue('r2', '110')) -
#
                   parseFloat(GM_getValue('r1', '30')))*Math.random())*1000;
#
    Reload.start();
#
  }
#
}
#
 
#
function autoAccept() {
#
  // Load My Mafia
#
  if (!onMyMafiaNav()) {
#
    Autoplay.fx = goMyMafiaNav;
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  // Get the "accept all" link.
#
  elt = xpathFirst('.//a[contains(., "accept all")]', innerPageElt);
#
  if (!elt) {
#
    DEBUG('Can\'t find accept link to click. Using fallback method.');
#
    loadAccept();
#
    return true;
#
  }
#
 
#
  // Accept all invitations.
#
  Autoplay.fx = function() {
#
    clickAction = 'accept';
#
    clickElement(elt);
#
    DEBUG('Clicked to accept.');
#
  };
#
  Autoplay.start();
#
  return true;
#
}
#
 
#
function autoSendEnergyPack() {
#
  if (timeLeftGM('energyAllTimeLeft') > 0) return false;
#
 
#
  // Make sure we're on the home page.
#
  if (!onHome()) {
#
    Autoplay.fx = goHome;
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  // Reset the timer.
#
  setGMTime('energyAllTimeLeft','1 hour');
#
 
#
  // Send energy packs.
#
  var sendPackButton = xpathFirst('.//div[@class="energy_all_prompt"]//a[contains(., "Send")]', innerPageElt);
#
  if (sendPackButton) {
#
    clickElement(sendPackButton);
#
    addToLog('info Icon','You have sent energy packs to your Mafia.');
#
    return true;
#
  } else {
#
      DEBUG('WARNING: Can\'t find inner button to send mafia energy pack.');
#
      return false;
#
  }
#
 
#
  return false;
#
}
#
 
#
function autoHeal() {
#
  // NOTE: In the interest of time, delays are waived.
#
  Autoplay.delay = 0;
#
 
#
  // Make sure we're in the preferred city.
#
  var healLocation = parseInt(GM_getValue('healLocation', NY));
#
 
#
  if (healLocation != cities.length && city != healLocation) {
#
    Autoplay.fx = function() { goLocation(healLocation); }
#
    Autoplay.start();
#
    return;
#
  }
#
 
#
  // Use our custom instant-heal element (if present).
#
  healElt = xpathFirst('.//a[contains(., "Heal your character")]', innerPageElt);
#
  if (!healElt) {
#
    var healElt = document.getElementById('ap_heal');
#
    if (!healElt) {
#
      DEBUG('WARNING: Can\'t find instant-heal link.');
#
      // Go to the hospital.
#
      var hospitalElt = xpathFirst('//a[@class="heal_link"]');
#
      if (hospitalElt) {
#
        Autoplay.fx = function() {
#
          clickElement(hospitalElt);
#
          DEBUG('Clicked to go to hospital.');
#
        };
#
        Autoplay.start();
#
      } else {
#
        addToLog('warning Icon', 'WARNING: Can\'t find hospital link.');
#
      }
#
      return;
#
    }
#
  }
#
 
#
  // Found a heal link. Click it.
#
  Autoplay.fx = function() {
#
    clickAction = 'heal';
#
    clickElement(healElt);
#
    DEBUG('Clicked to heal.');
#
  };
#
  Autoplay.start();
#
 
#
  return;
#
}
#
 
#
function autoSellCrates(sellCity) {
#
  // Go to the correct city.
#
  if (city != sellCity) {
#
    Autoplay.fx = goLocation(sellCity);
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  // Go to the businesses.
#
  if (!xpathFirst('.//div[@class="business_description"]', innerPageElt)) {
#
    Autoplay.fx = goBusinessesNav;
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  // Sell anything we can.
#
  elt = xpathFirst('.//div[@class="business_sell_row"]/div[@class="business_sell_button"]//a', innerPageElt);
#
  if (elt) {
#
    Autoplay.fx = function() {
#
      clickAction = 'sell output';
#
      clickElement(elt);
#
      DEBUG('Clicked to sell output.');
#
    };
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  // Nothing to sell.
#
  GM_setValue('sellHour' + cities[sellCity][CITY_NAME], new Date().getHours());
#
  DEBUG('All business output in ' + cities[sellCity][CITY_NAME] + ' sold. Checking again in an hour.');
#
 
#
  // Visit home after selling all output
#
  Autoplay.fx = goHome;
#
  Autoplay.start();
#
  return true;
#
}
#
 
#
// Collect Racket
#
function collectRacket() {
#
  // Go to NY first
#
  if (city != NY) {
#
    Autoplay.fx = goNY;
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  if (!onPropertyNav()) {
#
    if (onRacketNav()) {
#
      //addToLog('info Icon', 'Check racket');
#
      if(isChecked('racketReshakedown')) {
#
        var elt = xpathFirst('.//a/span[@class="sexy_influence" and contains(.,"Shake Down Again")]', innerPageElt);
#
        if(elt) {
#
          shakeDownFlag= false;
#
          //<div class="zy_progress_bar_outer" title=""><div class="zy_progress_bar_text">100% Mastered</div>
#
          var mastered=xpathFirst('.//div[@class="zy_progress_bar_text" and contains(.,"100% Mastered")]', innerPageElt);
#
          if(mastered && !isChecked('racketPermanentShakedown')) {
#
            addToLog('info Icon', 'Racket is 100% mastered');
#
            return false;
#
          } else {
#
            Autoplay.fx = function() {
#
              clickAction = 'shakedown again';
#
              addToLog('info Icon', 'Shake down again');
#
              clickElement(elt);
#
            };
#
            Autoplay.start();
#
          }
#
          return true;
#
        }
#
      }
#
      //<a><div class="zy_progress_bar_outer" title=""><div class="zy_progress_bar_text">
#
 
#
      elt = xpathFirst('.//a/div[@class="zy_progress_bar_outer"]/div[@class="zy_progress_bar_text" and contains(.,"Ready to Collect")]', innerPageElt);
#
      if(elt) {
#
        if(isChecked('racketReshakedown')) {
#
          shakeDownFlag= true;
#
        }
#
        Autoplay.fx = function() {
#
          clickAction = 'collect racket';
#
          addToLog('info Icon', 'Collect racket');
#
          clickElement(elt);
#
        };
#
        Autoplay.start();
#
        return true;
#
      } else {
#
        // no racket comeback again 15 minutes
#
        setGMTime("nextRacket", "0:15:00");
#
      }
#
    } else {
#
      Autoplay.fx = goPropertyNav;
#
      Autoplay.start();
#
      return true;
#
    }
#
 
#
    return false;
#
  } else {
#
   //turning off rackets
#
   GM_setValue("racketReshakedown", 0);
#
   GM_setValue("racketPermanentShakedown", 0);
#
   GM_setValue("racketCollect", 0);
#
   DEBUG("Turning off racket options. We're on properties page.");
#
  }
#
}
#
 
#
// Collect NY take
#
function collectNYTake() {
#
  // Go to the correct city.
#
  if (city != NY) {
#
    Autoplay.fx = goNY;
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  if (!onRacketNav()) {
#
    if (onPropertyNav()) {
#
      var takeTimer = xpathFirst('.//span[@id="prop_eng_timer_span"]', innerPageElt);
#
      if (takeTimer) {
#
        var prodReadyIn = timeLeft(takeTimer.innerHTML);
#
        if (prodReadyIn == 0 || prodReadyIn >= 10500) { //If the timer says between 0 or 2:55:00
#
          var elt = xpathFirst('.//a[contains(., "Collect take")]', innerPageElt);
#
          if (elt) {
#
            Autoplay.fx = function() {
#
              clickAction = 'collect ny take';
#
              clickElement(elt);
#
              DEBUG('Collecting NY Take');
#
              setGMTime("nextNYTake", "3:00:00");
#
              if (GM_getValue("tempAutoBuy")) {
#
                GM_setValue("autoBuy", GM_getValue("tempAutoBuy"));
#
                GM_setValue("tempAutoBuy", 0);
#
                DEBUG("Turning auto buy back on.");
#
              }
#
            };
#
            Autoplay.start();
#
            return true;
#
          } else {
#
            // Nothing to collect.
#
            setGMTime("nextNYTake", takeTimer.innerHTML);
#
            var d = new Date();
#
            d.setMilliseconds(0);
#
            d.setTime(d.getTime()+(timeLeft(takeTimer.innerHTML)*1000));
#
            DEBUG('The take has been collected. Coming back at: ' + d);
#
            return false;
#
          }
#
        } else {
#
          //It's more than 5 minutes after a take being ready, so we'll come back when the next take is ready.
#
          setGMTime("nextNYTake", takeTimer.innerHTML);
#
          var d = new Date();
#
          d.setMilliseconds(0);
#
          d.setTime(d.getTime()+(timeLeft(takeTimer.innerHTML)*1000));
#
          DEBUG('Take will be available at: ' + d);
#
          if (GM_getValue("autoBuy")) {
#
            GM_setValue("tempAutoBuy", GM_getValue("autoBuy"));
#
            GM_setValue("autoBuy", 0);
#
            DEBUG('Turning auto buy off till next take is collected.');
#
          }
#
          return false;
#
        }
#
      } else {
#
        //Disabling collect NY take
#
        GM_setValue("collectNYTake", 0);
#
        DEBUG('Turning off collect NY Take. Player does not have take timer.')
#
      }
#
    } else {
#
      Autoplay.fx = goPropertyNav;
#
      Autoplay.start();
#
      return true;
#
    }
#
  } else {
#
    GM_setValue("collectNYTake", 0);
#
    DEBUG('Turning off collect NY Take. Player does not have take timer.')
#
  }
#
}
#
 
#
function autoPlayerUpdates() {
#
  // Get the updates.
#
  var pUpdates = xpath('.//div[@class="update_item"]', innerPageElt);
#
  var pUpdatesLen = pUpdates.snapshotLength;
#
  var logPlayerUpdatesCount = GM_getValue('logPlayerUpdatesCount');
#
  if (logPlayerUpdatesCount == undefined) {
#
    // The settings must have been cleared. Assume all updates were read.
#
    logPlayerUpdatesCount = pUpdatesLen;
#
    GM_setValue('logPlayerUpdatesCount', logPlayerUpdatesCount);
#
  }
#
 
#
  // Are there are less updates than we've already seen?
#
  // FIXME: This could be better. Need to also detect the case where we are
#
  //        on the home page with zero updates showing and a non-zero count.
#
  if (pUpdatesLen > 0 && logPlayerUpdatesCount > pUpdatesLen) {
#
    // The player updates must have been cleared.
#
    DEBUG('Player updates were unexpectedly cleared.');
#
    logPlayerUpdatesCount = 0;
#
    GM_setValue('logPlayerUpdatesCount', 0);
#
  }
#
 
#
  // Process new updates.
#
  if (logPlayerUpdatesCount < pUpdatesLen) {
#
    DEBUG('Parsing new player updates.');
#
    for (var i = pUpdatesLen - logPlayerUpdatesCount - 1; i >= 0; i--) {
#
      if (!parsePlayerUpdates(pUpdates.snapshotItem(i))) return true;
#
      GM_setValue('logPlayerUpdatesCount', ++logPlayerUpdatesCount);
#
    }
#
  }
#
 
#
  // Clear the updates.
#
  if (pUpdatesLen > GM_getValue('logPlayerUpdatesMax', 20) &&
#
      logPlayerUpdatesCount == pUpdatesLen) {
#
    Autoplay.fx = goDeleteNews;
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  return false;
#
}
#
 
#
function autoStat() {
#
  // Load profile
#
  if (!onProfileNav()) {
#
    Autoplay.fx = goMyProfile;
#
    Autoplay.start();
#
    return true;
#
  }
#
 
#
  if (onProfileNav()) {
#
    // Array containers for status settings
#
    var curStats = [curAttack,curDefense,maxHealth,maxEnergy,maxStamina,maxInfluence];
#
    var modeStats = [level,curAttack,curDefense,maxHealth,maxEnergy,maxStamina,maxInfluence];
#
    var statFallbacks = new Array(curStats.length);
#
 
#
    var maxPtDiff = 0;
#
    var statIndex = 0;
#
    var statPrio = autoStatPrios.length;
#
    for (var i = 0, iLength = curStats.length; i < iLength; ++i) {
#
      // Calculate the Points needed to reach target stat
#
      var ratio = new Number(GM_getValue(autoStatRatios[i]));
#
      var base = new Number(GM_getValue(autoStatBases[i]));
#
      var curStatPrio = new Number(GM_getValue(autoStatPrios[i]));
#
      var curStatDiff = Math.max (0, ratio * modeStats[GM_getValue(autoStatModes[i])] + base - curStats[i]);
#
 
#
      // Account for priority
#
      if ((curStatDiff > 0 && curStatPrio < statPrio) || (curStatDiff > maxPtDiff && curStatPrio <= statPrio)) {
#
        maxPtDiff = curStatDiff;
#
        statIndex = i;
#
        statPrio = curStatPrio;
#
      }
#
 
#
      // Fallback method
#
      statFallbacks[i] = isChecked(autoStatFallbacks[i]) ? i : '';
#
    }
#
 
#
    // Disable auto-stat when status goals are reached and autoStatDisable is checked
#
    if (maxPtDiff <= 0 && isChecked('autoStatDisable')) {
#
      addToLog('info Icon', 'All status goals met, please update your goals.');
#
      GM_setValue('autoStat', 0);
#
      return false;
#
    }
#
 
#
    // Increment the status corresponding to the nextStat variable (fallback)
#
    if (maxPtDiff <= 0) {
#
      if (statFallbacks.join('') != '') {
#
        DEBUG('Status GOALS reached, using fallback method.');
#
        var nextStat = parseInt(GM_getValue('nextStat', ATTACK_STAT));
#
 
#
        // Search for next Stat to increment
#
        while (statFallbacks.indexOf(nextStat) == -1)
#
          nextStat = (nextStat + 1) % curStats.length;
#
 
#
        DEBUG('Next stat in fallback mode: ' + autoStatDescrips[nextStat + 1]);
#
        statIndex = nextStat;
#
      } else {
#
        // Do not call autoStat until next level Up
#
        DEBUG('Status GOALS reached, waiting till next level up.');
#
        GM_setValue('restAutoStat', 1);
#
        return false;
#
      }
#
    } else {
#
      DEBUG('Next stat to increment : ' + autoStatDescrips[statIndex + 1] + ' (' + maxPtDiff + ' points to goal) ');
#
      GM_setValue('restAutoStat', 0);
#
    }
#
 
#
    // Add stats to the attribute farthest from the goal
#
    // (or the nextStat if fallback kicked in)
#
    var upgradeElt;
#
    switch (statIndex) {
#
      case ATTACK_STAT    : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=attack")]', innerPageElt);         break;
#
      case DEFENSE_STAT   : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=defense")]', innerPageElt);        break;
#
      case HEALTH_STAT    : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=max_health")]', innerPageElt);     break;
#
      case ENERGY_STAT    : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=max_energy")]', innerPageElt);     break;
#
      case INFLUENCE_STAT : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=max_influence"])', innerPageElt);  break;
#
      case STAMINA_STAT   : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=max_stamina")]', innerPageElt);    break;
#
 
#
      default             :
#
        // Disable auto-stats when maxPts calculated is NaN
#
        GM_setValue('autoStat', 0);
#
        addToLog('warning Icon', 'BUG DETECTED: Invalid calculated maxPts value "' + maxPts + '". Auto-stat disabled.');
#
        return false;
#
    }
#
 
#
    if (!upgradeElt){
#
      DEBUG('Couldnt find link to upgrade stat.');
#
      return false;
#
    }
#
 
#
    // Use click simulation
#
    Autoplay.fx = function() {
#
      clickAction = 'stats';
#
      clickElement(upgradeElt);
#
      DEBUG('Clicked to upgrade: ' + autoStatDescrips[statIndex + 1]);
#
    }
#
    Autoplay.start();
#
    return true;
#
  } else {
#
    // Disable auto-stats when profile page cannot be loaded
#
    GM_setValue('autoStat', 0);
#
    addToLog('warning Icon', 'BUG DETECTED: Unable to load Profile page, autostat disabled.');
#
  }
#
}
#
 
#
// Calculate job cost and reward
#
function calcJobinfo() {
#
  var energyBonus = 1 - (GM_getValue('selectEnergyBonus', 0) / 100);
#
  var expBonusMultiplier = 1 + (GM_getValue('selectExpBonus', 0) / 100);
#
  missions.forEach(function(mission) {
#
    var cost = mission[1];
#
    if (cost > 5) {
#
      // Adjust for energy bonus.
#
      cost = Math.floor(cost * energyBonus);
#
    }
#
    var reward = mission[5];
#
    if (isChecked('hasPrivateIsland')) {
#
      // Adjust for private island.
#
      reward = Math.round(reward * 1.05);
#
    }
#
    // Adjust for mastermind.
#
    reward = Math.floor(reward * expBonusMultiplier);
#
    //var job_ratio = Math.round(reward / cost * 100) / 100;
#
    mission[6] = reward;
#
    //mission[7] = job_ratio;
#
    mission[8] = cost;
#
  });
#
  didJobCalculations = true;
#
}
#
 
#
// Get reward to cost ratio:
#
function calcJobratio(job) {
#
  if (!didJobCalculations) calcJobinfo();
#
  return Math.round(missions[job][6] / missions[job][8] * 100) / 100;
#
}
#
 
#
// Retreive if and how much energy can be salvaged for the next level (eg after spending an energy pack)
#
function canSalvageEnergy(job) {
#
  if (energy <= maxEnergy) return false;
#
  if (!didJobCalculations) calcJobinfo();
#
  var amount = energy - (Math.ceil((lvlExp - curExp) / missions[job][6]) * missions[job][8]) - maxEnergy;
#
  if (amount > 0) return amount;
#
  else return false;
#
}
#
 
#
function canMission() {
#
  if (!isChecked('autoMission')) return false;
#
 
#
  if (!didJobCalculations) calcJobinfo();
#
  if (isChecked('multipleJobs') &&
#
      getSavedList('jobsToDo').length == 0) {
#
 
#
    var availableJobs = eval(GM_getValue("availableJobs", "({0:{},1:{},2:{}})"));
#
    var masteredJobs = eval(GM_getValue("masteredJobs", "({0:{},1:{},2:{}})"));
#
    var expLeft = lvlExp - curExp;
#
    var ratio = Math.round(expLeft / energy * 100) / 100;
#
    var multiple_jobs_list = getSavedList('selectMissionMultiple');
#
    var multiple_jobs_ratio_sorted = [];
#
    var jobs_selection = [];
#
    var singleJobLevelUp = [];
#
    var enoughEnergy = false;
#
    var canSalvage = false;
#
 
#
    // mission mastery code
#
    var mastery_jobs_list = getSavedList('masteryJobsList');
#
    for (var i=0, iLength=mastery_jobs_list.length; i < iLength; ++i) {
#
      // Filters jobs on the ignorelist
#
      var job = mastery_jobs_list[i];
#
 
#
      // Only push jobs that does not exist on the main list
#
      if (multiple_jobs_list.indexOf(job) == -1) {
#
        multiple_jobs_list.push(job);
#
        // Tag job as mastery
#
        missions[job][9] = true;
#
      }
#
    }
#
 
#
    for (var i=0, iLength= multiple_jobs_list.length; i < iLength; ++i) {
#
      var job = multiple_jobs_list[i];
#
      var mission = missions[job];
#
      // This should enable us to use mastery jobs for single job level ups
#
      var singleJobLevelUpPossible = false;
#
 
#
      // Ignore jobs that are not yet available
#
      if (availableJobs[mission[4]][mission[3]] != null &&
#
         availableJobs[mission[4]][mission[3]].indexOf(parseInt(job)) == -1) {
#
        continue;
#
      }
#
 
#
      // Determine the job's experience-to-energy ratio.
#
      mission[7] = calcJobratio(job);
#
      if (mission[8] <= energy) {
#
        enoughEnergy = true;
#
        if (mission[6] >= expLeft) {
#
          singleJobLevelUp.push(job);
#
          singleJobLevelUpPossible = true;
#
        }
#
      }
#
 
#
      // Ignore mastered jobs unless it can do a single job level up
#
      if (masteredJobs[mission[4]][mission[3]] != null &&
#
          masteredJobs[mission[4]][mission[3]].indexOf(parseInt(job)) != -1 &&
#
          singleJobLevelUpPossible == false) {
#
        continue;
#
      }
#
 
#
      // Can salvage energy with this job
#
      if (!canSalvage && canSalvageEnergy(job)) canSalvage = true;
#
      multiple_jobs_ratio_sorted.push(job);
#
    }
#
 
#
    multiple_jobs_ratio_sorted.sort(function(a, b) { return missions[b][7] - missions[a][7]; });
#
    if (!enoughEnergy) return false;
#
 
#
    var doJob;
#
 
#
    // Don't do expBurners or biggest exp job if energy can be salvaged
#
    if (singleJobLevelUp.length > 0 && !canSalvage) {
#
      singleJobLevelUp.sort(function(a, b) { return missions[b][6] - missions[a][6]; });
#
      // One job is enough to level up. Pick the one that pays the most.
#
      doJob = singleJobLevelUp[0];
#
 
#
      if (isChecked('endLevelOptimize')) {
#
        // Burn up exp before leveling up to maximize energy
#
        for (var i=0, iLength=expBurners.length; i < iLength; ++i) {
#
          var expBurner = expBurners[i];
#
          if ( (energy - missions[singleJobLevelUp[0]][8]) > missions[expBurner][8] &&
#
             expLeft > Math.floor(missions[expBurner][6] * 1.5) ) {
#
            doJob = expBurner;
#
            break;
#
          }
#
        }
#
      }
#
    } else {
#
      // Can't level up. Pick a job we can do whose ratio is high enough.
#
      for (var i=0; i < multiple_jobs_ratio_sorted.length; i++) {
#
        if (energy >= missions[multiple_jobs_ratio_sorted[i]][8] &&
#
            ratio <= missions[multiple_jobs_ratio_sorted[i]][7]) {
#
          jobs_selection.push(multiple_jobs_ratio_sorted[i]);
#
        }
#
      }
#
      if (jobs_selection.length == 0) {
#
        // No jobs meet the ratio necessary to level up. Go with the highest.
#
        doJob = multiple_jobs_ratio_sorted[0];
#
      } else {
#
        // Pick the one with the lowest ratio.
#
        if (!canSalvage) {
#
          doJob = jobs_selection[jobs_selection.length-1];
#
        // Energy can be salvaged, pick the one with the highest ratio
#
        } else {
#
          doJob = jobs_selection[0];
#
        }
#
      }
#
    }
#
    if (GM_getValue('selectMission') != doJob) {
#
      if (doJob == undefined) {
#
        addToLog('info Icon', 'No jobs selected. Disabling automission.');
#
        GM_setValue('autoMission', 0);
#
        return false;
#
      } else {
#
        addToLog('info Icon', 'Switching job to ' + missions[doJob][0] + '.');
#
        GM_setValue('selectMission', doJob);
#
      }
#
    }
#
  }
#
 
#
  if (energy < calcEnergyCost()) {
#
    DEBUG('Skipping jobs: energy=' + energy + ', cost=' + calcEnergyCost());
#
    return false;
#
  }
#
 
#
  // If spending energy will set energy below Energy floor, skip jobs
#
  var nextJobEnergy =  missions[GM_getValue('selectMission', 1)][8];
#
  if (energy - nextJobEnergy < SpendEnergy.floor && !SpendEnergy.canBurn) {
#
    DEBUG('Not spending energy: energy=' + energy +
#
          ', floor=' + SpendEnergy.floor +
#
          ', nextJobEnergy=' + nextJobEnergy +
#
          ', burn=' + SpendEnergy.canBurn);
#
    return false;
#
  }
#
 
#
  if (energy < SpendEnergy.ceiling && !SpendEnergy.canBurn &&
#
      !GM_getValue('useEnergyStarted')) {
#
    DEBUG('Rebuilding energy: energy=' + energy +
#
          ', ceiling=' + SpendEnergy.ceiling + ', burn=' + SpendEnergy.canBurn);
#
    return false;
#
  }
#
 
#
  return true;
#
}
#
 
#
function autoMission() {
#
  var jobno       = missions[GM_getValue('selectMission', 1)][2];
#
  var tabno       = missions[GM_getValue('selectMission', 1)][3];
#
  var cityno      = missions[GM_getValue('selectMission', 1)][4];
#
 
#
  if (SpendEnergy.floor &&
#
      isChecked('allowEnergyToLevelUp') &&
#
      GM_getValue('autoEnergyBurn') !== SpendEnergy.canBurn) {
#
    GM_setValue('autoEnergyBurn', SpendEnergy.canBurn);
#
    if (SpendEnergy.canBurn) {
#
      addToLog('process Icon', energyIcon + '<span style="color:#009966; font-weight: bold;">Burning through energy reserve to level up.</span>');
#
    } else {
#
      DEBUG('Not within reach of a level up. Energy burning is off.');
#
    }
#
  }
#
 
#
  // Go to the correct city.
#
  if (city != cityno) {
#
    Autoplay.fx = function() { goLocation(cityno); };
#
    Autoplay.start();
#
    return;
#
  }
#
 
#
  // Go to the correct job tab.
#
  if (!onJobTab(tabno)) {
#
    Autoplay.fx = function() { goJobTab(tabno); };
#
    Autoplay.start();
#
    return;
#
  }
#
 
#
  // Buy requirements first, if any
#
  if (buyJobRowItems(innerPageElt)) {
#
    Autoplay.delay = 0;
#
    Autoplay.start();
#
    return;
#
  }
#
 
#
  // Do the job
#
  Autoplay.fx = function() { goJob(jobno); };
#
  Autoplay.start();
#
}
#
 
#
function currentJobTab() {
#
  var elt = xpathFirst('.//li[contains(@class, "tab_on")]//a', innerPageElt);
#
  if (!elt || !elt.getAttribute('onclick').match(/tab=(\d+)/)) {
#
    return -1;
#
  }
#
  return parseInt(RegExp.$1);
#
}
#
 
#
function onJobTab(tabno) {
#
  return currentJobTab() == parseInt(tabno) ? true : false;
#
}
#
 
#
function canForceHeal() {
#
  if(!isChecked('hideInHospital'))
#
    return true;
#
 
#
  // Heal when stamina can be spent
#
  if (isChecked('forceHealOpt3') && canSpendStamina(1))
#
    return true;