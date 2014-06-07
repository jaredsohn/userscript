/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/**
* @version 1.0.13
* @package Facebook Mafia Wars Autoplayer
* @authors: CharlesD, Eric Ortego, Jeremy, Liquidor, AK17710N, KCMCL,
            Fragger, <x51>, CyB, int1, Janos112, int2str, Doonce, Eric Layne,
            Tanlis, Cam, vmzildjian, csanbuenaventura, Scrotal, rdmcgraw, moe
* @created: March 23, 2009
* @credits: Blannies Vampire Wars script
            http://userscripts.org/scripts/show/36917
*/

// ==UserScript==
// @name        Facebook Mafia Wars Autoplayer
// @namespace   mafiawars
// @description Autoplayer for the facebook application - Mafia Wars
// @include     http://www.facebook.com/*
// @include     http://mwfb.zynga.com/mwfb/*
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @version     1.0.13
// ==/UserScript==


var SCRIPT = {
  url: 'http://userscripts.org/scripts/source/64720.user.js',
  version: '1.0.13',
  build: '49',
  name: 'inthemafia',
  appID: 'app10979261223',
  ajaxPage: 'inner2',
  presentationurl: 'http://userscripts.org/scripts/show/64720',
  controller: '/remote/html_server.php?&xw_controller=',
  action: '&xw_action=',
  city: '&xw_city=',
  opponent: '&opponent_id=',
  user: '&user_id='
};

// Load the iframe
if (window.location.href.match(/facebook/))  {
  // Get FB name
  var fbName = document.getElementById("fb_menu_account");
  if (fbName && fbName.firstChild)
    GM_setValue('FBName', fbName.firstChild.innerHTML);

  checkLanguage();

  var iFrameCanvas = xpathFirst('//iframe[contains(@src,"mwfb.zynga.com")]');
  if (iFrameCanvas)
    window.location.href = iFrameCanvas.src;
  return;
}

// Handle Blank pages (click back if encountered)
if (!document.body) {
  return back();
}

// Register debugOnOff with Greasemonkey
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Turn Debugging Log On/Off', debugOnOff);
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Clear Saved Values', function() { clearSettings(); loadHome(); });
GM_registerMenuCommand('FB Mafia Wars Autoplayer - Display Stats Window', function() { toggleStats(); });

//
// Define Spend object and methods.
//

// Constructor for Spend objects.
function Spend(name, spendFlag, startFlag, keepMode, keepValue,
               useMode, useValue, icon, burnFlag, lastFloor, lastCeiling) {
  // Initialize GM name containers
  this.name = name;
  this.spendFlag = spendFlag;
  this.startFlag = startFlag;
  this.burnFlag = burnFlag;
  this.keepMode = keepMode;
  this.keepValue = keepValue;
  this.useMode = useMode;
  this.useValue = useValue;
  this.lastFloor = lastFloor;
  this.lastCeiling = lastCeiling;
  this.icon = icon;
  this.canBurn = false;

  // Calculate the spend limit
  this.getSpendValue = function (maxVal, spendMode, spendValue) {
    switch (parseInt(spendMode)) {
      case SCHEME_PERCENT: return Math.round(maxVal * parseInt(spendValue) * .01);
      case SCHEME_POINTS: return parseInt(spendValue);
    }
  }
}

// Update the upper and lower limits of spending
Spend.prototype.refreshLimits = function (maxVal, canLevel) {
  // Subtract one or else spending will never run.
  this.floor   = Math.min(this.getSpendValue (maxVal,
                                              GM_getValue(this.keepMode, 0),
                                              GM_getValue(this.keepValue, 0)),
                          maxVal - 1);

  // The max value is the limit for ceiling
  this.ceiling = Math.min(this.getSpendValue (maxVal,
                                              GM_getValue(this.useMode, 0),
                                              GM_getValue(this.useValue, 0)),
                          maxVal);

  // Check if burning is enabled
  this.canBurn = isChecked(this.burnFlag) && canLevel;
}

// Toggle spending accordingly and log changes
Spend.prototype.toggleSpending = function (maxVal, curVal) {
  // Log any change to the floor.
  if (this.floor != GM_getValue(this.lastFloor)) {
    GM_setValue(this.lastFloor, this.floor);
    if (this.floor > 1) {
      addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> ' + this.name +
               ' is set to keep above <strong>' + this.floor + '</strong>.</span>');
    }
  }

  // Log any change to the ceiling.
  if (this.ceiling != GM_getValue(this.lastCeiling)) {
    GM_setValue(this.lastCeiling, this.ceiling);
    if (this.ceiling > this.floor) {
      addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> ' + this.name +
               ' refill level set to <strong>' + this.ceiling + '</strong>.</span>');
    }
  }

  // Determine whether spending needs to start or stop.
  if (curVal >= this.ceiling && !GM_getValue(this.startFlag)) {
    GM_setValue(this.startFlag, true);
  } else if (curVal <= this.floor && this.ceiling > this.floor &&
             GM_getValue(this.startFlag)) {
    GM_setValue(this.startFlag, false);
    addToLog('info Icon', this.icon + '<span style="color:#04B4AE;";> Refilling ' + this.name +
             ' to <strong>' + this.ceiling + '</strong>.</span>');
  }
}

//
// Define Player object and methods.
//

// Determine whether two player objects refer to the same player.
Player.prototype.match = function(player) {
  if (!player) return false;
  if (this.id && player.id)
    return (this.id == player.id);
  if (this.profile && this.profile == player.profile)
    return true;
  if (this.profileAttack && this.profileAttack == player.profileAttack)
    return true;
  if (this.attack && this.attack == player.attack)
    return true;
  return false;
}

// Update this player object's properties with the properties of another.
Player.prototype.update = function(player) {
  if (!this.match(player)) return false;
  for (var prop in player) {
    this[prop] = player[prop];
  }
  return true;
}

// Constructor for Player objects.
function Player(name) {
}


//
// Define PlayerList object and methods.
//

// Get this player list's array of player objects.
PlayerList.prototype.get = function(forceRefresh) {
  if (this.name && (forceRefresh || !this.list.length)) {
    // Load the list from storage.
    var ids = getSavedList(this.name);

    // Convert the ID list (strings) into a player list (objects).
    this.list = [];
    for (var i = 0, l=ids.length; i < l; ++i) {
      var p = new Player();
      p.id = ids[i];
      this.list.push(p);
    }
  }

  return this.list;
}

PlayerList.prototype.set = function(list) {
  if (list) {
    this.list = list;
  }

  if (this.name) {
    // Build an array of player ID's.
    var a = [];
    for (var i = 0, l=this.list.length; i < l; ++i) {
      var player = this.list[i];
      if (player && player.id) {
        a.push(player.id);
      }
    }

    // Store the list.
    setSavedList(this.name, a);
  }
}

PlayerList.prototype.add = function(player, max) {
  if (!player) return false;

  // If the player is already in the list, just update it.
  var l = this.list.length;
  for (var i = 0; i < l; ++i) {
    if (this.list[i].update(player)) {
      return false;
    }
  }

  // No match. Just push it into the array.
  this.list.push(player);

  // Shorten the array if it has become too large.
  if (max > 0) {
    while (max < this.list.length) {
      var player = this.list.shift();
      DEBUG('Removed player ' + player.id + ' from ' + this.name + '.');
    }
  }

  return true;
}

PlayerList.prototype.remove = function(player) {
  if (!player) return false;

  // If the player is in the list, remove it.
  var l = this.list.length;
  for (var i = 0; i < l; ++i) {
    if (this.list[i].match(player)) {
      this.list.splice(i, 1);
      return true;
    }
  }

  // No match.
  return false;
}

PlayerList.prototype.indexOf = function(player) {
  var l = this.list.length;
  for (var i = 0; i < l; i++) {
    if (this.list[i].match(player))
      return i;
  }
  return -1;
}

PlayerList.prototype.debug = function() {
  var l = this.list.length;
  var str = 'PlayerList name=' + this.name + ', length=' + l + '\n';
  for (var i = 0; i < l; ++i) {
    var p = this.list[i];
    str += i + ': id=' + p.id;
    if (p.name) str += ', name=' + p.name;
    if (p.level) str += ', level=' + p.level;
    if (p.mafia) str += ', mafia=' + p.mafia;
    str += '\n';
  }
  return str;
}

// Constructor for PlayerList objects.
function PlayerList(name) {
  this.name = name;
  this.list = [];
  this.get();
}


//create data uris for mini icon usage
var searchIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVR42mNkgIJ12/cacLCzlTIwMtkwMzNx/Pnz58qfP3/n+Ls5LGfAAxhBxMZdBxKFBflnqirKs4oKCTAwMjIyfP' +
                    '/xk+HmvYcMj54+X/n9x4/oCD+Pv1gNWLVlp6GYiMhJQ20NVm4uDoTMfwaGf///MZy5fIPh9Zs3tf5uji1YDdi67/BSaUnJKDUFGQYmJiaw7SDd//79Z/j77x/Di9fvGO4+ePTh4+fP4mE+br8wDNh+4OhDTRVlOU' +
                    'F+XgYOdlaIAUDbQZp//vrN8OrtB4b3Hz8yPHzy1BhowDkMA3YePPZCR0NNnJebk4GdlRXsiv9A+PfvP4Yv374zfPryjeHdhw+gsLAK9nQ+js0Lewy1NZ15ebgYWFlYGFiYmcDO//P3L8M3YEB+/faD4eHTp3+ePH' +
                    '8pFuXv+R7DAGD0hasoyK1QlkeEwf//EBf8+PWL4e37jwy37z9Y7uNsF4UvGherKcnHyEtLMjAzM4MNALng5Zt3DM9fvWa4/+BhSWyIfy9OAxav28LEy81VwsvDUyolLioCcsW7Dx9/vf/4adWLl6+vXzt/qmXz+r' +
                    'WHGJmYfG7evPkFwwAYmL96IwsTI6MG0BXsQFfcjg3y+QQSNzO3OMzLL2Dz9OH9o0A/ety4ceMLVgNwAR1tbT5efv4dXDx8lk8fPTgKFPIEGvKZaAMghmgBDRHAMIRoA3AZQpIBUEN4gYbsBBny8O7tvSQbAA0TXg' +
                    '4u7g2fP33YBwCb9/irlkMH+QAAAABJRU5ErkJgggo=' +
                    '" />';

var lootbagIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAIQfALq3nMG8k8TAmbSvfMnFoTg3LYmEWhMSDaumeM7Lqrm0hNXStXl2Vnp4ab65jaeha4+Nery2irexgmhnW9HNrsvIpdjVurGrd9fUuktKQcK9otPQsrOwkiAfHG' +
                    'poSv///yH5BAEAAB8ALAAAAAAQABAAAAWB4CeOk1Y0UHeMrHgAUZU4Wds2gcKo9thxl0ePNUlUKoPVEGLZYDaBZK9gsTwJgcig11h4KQSHQiJscSjoRFgi2bIOsoRxPXCPDoQ4QSAeXFp4BIICAQ5tfywFAouEDh' +
                    'FtBm8Bk4xZCgoPSh8ZARcKk4UKjgiaHyoFDAaqBh4MpCIhADs=' +
                    '" />';

var tabSelectedImage =    '<img src="' +
                    'data:image/gif;base64,' +
                    'R0lGODlhZAAyALMAACIODyUQESYTFCkWGCwZHTMgJDckKDAdIDooLT4sMUw6QEY0OkEvNVJBSFlIUGFQWSH5BAAAAAAALAAAAABkADIAQAT/sC3EWBNFJYDcOoiiEMbSFIWjHJaGII9RxgwrURamcR4okiaUyuYK' +
                    'jUqn1KqVeMVmNYbJ0FQMDonEwKBgFBAJxRexMGQUBikDYTaREI2BoEsILxbX7Lb7DY/LZ2kLCRlgYi+AIoJrBiEFd2ZkCAECBgcEcgQFVwgFJCgElwmYLwcFZgaahAShCAICCQYCpjKvmpyeZp6ipAi0p5+7db0H' +
                    'ja0yB7SYBwIAAQMDAACsAAKYr9YBlATbBALQ4M6Y1dfglNDS1NaZ39De3wTOB+AFzNzb3fDO6OuvA97OnDWrNlBAAGmUEBqsdlDbQYHSXgWk9DAhwYgPJw60+CqjRYoM/52B5PjQYMWSKKVVU1nwpEKWCDOKxEgz' +
                    'IsyQDp8dHLgSp0M5DYNqQ8iy4cKZF0dKPBgt6VGVRQW6dGq02c6SVhdSstpzqUMpGBoQKjHilANoHgiEKJOAgYJOCRw0aqAhwR25BNwyCFBA7KkFZQ2cHZB2LRW3cOVqKayALeICcefWvYOAhKVTNcZUNsXgm4Yt' +
                    'TU6lQcGlHpjKjxIUS2MKsqUXmwt0HvCZSicZXk4doq3FtujcXGSUOvBWLZ5vBQyy4vavACVP1i6xGrDpyqblxTDVu2Runjvmmp7Ho27vlvVvpryFWk5dDvT1clIFWI9wQNWITeXss/pMGrqt+p3jX/80OglUUFML' +
                    '6feNSd80BI1VAfYHwH8KQuPgTUiRJNVQBfHUElQZ8TQURDiZtNNLUm14IolamURUTy+O2GJDPYE0Y0Ai8hQQUjeuOBRFRtG4UZAYNmMcA/8MkYAEjYRRhwIN1KGCIGKs8UA9DsglBZQLHJnkCkuWYciTUcaFxpay' +
                    'wTBCGGVOiaaVWGrJZTENvJCFGJApYI1YT04wQZRpLCECG2GIEWgAcMgFhh957jmKHZIA6hYLCzjwaGORkjCpW2+98FYbnbwVCwHFhdDJF3gccMcjfNi1AGQZaAHZAp5VRgYDMhSi1lsokHHFqoB54Wqadv36arCz' +
                    'vkrIEm21ooX/KQl8w0Zl1CXwzKiNyGAJcKOk+RquyTRiTRZYRKKdtQNgywYy3GriRSrZskvaKFRcQsZrbLBiSSjJzFePHNS9YoY1qWByi71bbALCN5ZckQw0lvg7D3ICJ0fCdAerJUclFhfcXDUyBGBKMZnMo4kt' +
                    'rGwTzSyZYByKcvZ4go47r3jyzCXwcLNONfOIFx3GzmlyDXusMDOfN//YckA6/+j0jTgGLRh1fvbNB/CDBvVMjkHmPEOgN+d0ZPXTXpNzdTYDalMOUGz/Y98sHemHokRO8YdgVnS7WCBILLZkIjYi3b2UV3enqI3d' +
                    'KoU4VVcfznQ4iiMmXlPkBb0EZED2RdQ4/+Wa17SjQzHZJFJQG5VO0+OQjyhjTKRbrvePH+GN+kc8BgVi6CUSWXuGp8s0lVac4w58iJrndFXqk4vY+eEOKY8U8iGRuKNXHjlP/U0WAaBFB7G41SULDsyS1pJoZOEA' +
                    'nWXStYAUDXhBglgDcB/o9wyEf8D4dFERF/p1NIB/+fszQAPS1xj2MeB9FqgBFeJAALpcQQKoQsMLGmCKAUKGLmgQjGke4IDKJLAYS/qHAw8AQTJIEA4VPAH5DgGYRqCwLyrEoAwcYBo+qUY2KyChFQSIK9kAKi6E' +
                    '6AGnYHMCUg3BAA+gYCoAkwwH8tAMFiABEFPwgSGyIYpUsBQVWTCoCf+iQAF44RRr+oKkELgvA6EQgQ+aQAW2CEYGUCqLBIrhlly0L3580MQIiLOCELDRLraxVBr76II2UuGNAhTVq8yABeJ0wk5StAJxVEOGLMQi' +
                    'g4CJ4BHaZ4ZifeEtIABDJK+gARAMIgvBIQudSllJVGKShYPoS2WC4yssUCAUayAlvnDFALtcwi1P0kNqPPGIf6zPXc1iAQJ0GUpe+jIva8pgM9PwTGCGgVxiCGW3rPEqFKTLFbKxBLS0Q7/bZEsDE9CErwiQzkNW' +
                    'JgBNwAC4xkmdcoqGDXWCDDlxaU42GAo2BywXIS4BAu34YhfL3MIy61APbdUjL5jI1j/chwoQyGb/E19IDwggttCBOvSXmFDoPzyKDNOcAgzfiOdDTyYyA0DDFCBjRjGISQJrnOIKjNxMJwjq0lm4NBTVgWklZGoG' +
                    'oclCEy6dKVFpetSbngIUDKXOZZwhs24841+suE4ooOHNZEjHZMnQlxxMcTTnWIM5WL1FVrmqsLD+Q61bpc51TMHVoplnGdcQmX2ucLWlzUKm73kYUHrWnre+AxPaIOzE/uHXl1nnZiYjD88Aq55QaCNpDrOqRPrh' +
                    'tnPEAwCXmNDaypEcro12HysrB2L1cdbLIk1mL31aaN3WDvVEg7aJbcY/zHaOzFmDaV4DhzX8AZ5wLEhte+1ZO3YSj/nYIrVA/xnuM0Ia3Ae940EWgsdBrnFcfygkbFKjCDcmdLbMbWU/wQXQdxcEFPXqY2x77Yhy' +
                    'mHK1y0qNQimaEN5cR6AAEa4i5iXbiPx7lI0V7hkmQrBA+rvfyy5PQVGRHoJSMru7Ne8oMqoITxD0YAwTKHrA8xBTdLcTHf2OSD66z/NgZGLhnc5FjgPdSGo0pNHBpHrC07Dk6pY8qGC4xtFLCOWEouMXLQUisYtR' +
                    'VPgmo6yo+McigbHi8ttkwx05c1QxUH1Cx7clB294NznK9aDiZeL5xMzZA7PohOzkHWPYzMPjEO5gt7rELe5DxqPxhkYnZyQnWHU+sZ5QwvwhGNfII9mj8FOX+UNnQvNZRfwx8p07F+Q65+12EV705ITEks1xOimR' +
                    'E12G8GwiPU8oSD/ysZ3nhmofla7Vps4J74b0O9ZF2XU5+duqbcwjW8/OyYP+9Z5BLI0IAAA7' +
                    '" />';

var playIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR42l1TSU9TURT+Xt9UaIHWAqUMJY2tSIwS41QEjXFhTFy54B/wF9iUhAUJxAQTt0RJkJUxLli6c6ELNcTEKV' +
                    'GCYShWfNRHh1faN7aeexkinuTm3pt77ne+851zBPxnW1tbCVmSxxVVuU3XRKPRAK0N0zRf2ba9kEwmN/71F44O2WxWlCRpGj5x4sPXVXk9m0OlWuVvweZmJOLduDiYclzbmnNddyqVSnnHAD+3t0VFUV9ktT/336' +
                    'x8RGtLEKqiwOfz0WsD9XoDpmWhXNnH6OUhREPBZWIzxkA4gKZpM7/+FDMrn78hEg5BlmVIokgABwQZgOu5sG0HeqGIKxcGEQ6os4lEYlLY2dlJSIq6+vL1e7k9HIaqKvyzKAogLQ4B6nBcD7bjwLJs5PcKuDNyya' +
                    'ntVwYEXddn1nO7Gb1ooCXQTAAyOVl49vw5boyO4kwySYkKTEh4Xp1SsWHsVxEJtaA7HJwVjLLx9tPaZjrQ5Kdsma+AKok3//gJP/f39+N6Oo1otJPfD6uCas3E2XjXO8EwjN9ffmSjHadCqJkWahTdILGWlpag+p' +
                    'sQaGmjyC66OtsxfO0q2iMRNFGa+b0iBuJdGgFUfn/fzEXDbUEuFqNXKpex+HQJ/qZmBFpD8FwXsc4IRobTiB0yKZQMnO7u0IRKpfJ2bVtL+xWZq65QBaq1Kh48fASBysg0uHVzFD2xGC+pRZWoNw72eEfonVAsFm' +
                    'f0cjVTpsgqfVZkCY5jY35hEffu3sHQ+XNcPIdY2I7LK8F2JnhAwqyQz+cTlOvq6lZOZgAyAYhEkTURY8PMozK6ngeXgdCybBepvi7HKJcGeKcUCoUZ061ncprOGRz0gY/netRIRyCMQQ/pIXjObCwWm+Qeu5omqn' +
                    '7/i5rt3s/t6jy66PsHoNHgzcRSYZ9FeMuWaY71xePe8TAxEFlRpiVZmdBLhlwy9nn3MZMlEW3BAMKtAceq1eZsx57q7e31TkzjkTFNaBbGaTKPx5lsg4aHjzPRPjHOfwGdsIJvkkplkQAAAABJRU5ErkJgggo=' +
                    '" />';

var infoIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADPUlEQVR42l3Te2wMQRwH8O++aTV1WjmttueupSIedWiaqJL7QyQETdoQJyIIEsQrErlS0Wg9KooQkYq/LogSCeKt8Q' +
                    'wSjcQj+INzrfbu2nu0d1drd293ze4FZZJNdnZmPzO/38yPwn/N5/PbOY5dJwiCS9N1u64DFHSfKIrtsqycmzChxDd0PvX7xe/3MzTNNiRF7PK2dXDPX/kQjSbNsVGjMjG73IEVNWUKz6aaNVWtLy0dr/4BOju7GJ' +
                    '7n224/+VZ9/OxjWMgP3DAO+u9VyIsiKeiPDmLr+irMK8+7JstyrYGYQE8g2HjnWaen5fxT5FizkaJpVDpt2La83ASOnm7HK38ErKYhHBzAtjWVqHKObhpf4qijurt77AmJ/rx4y0UuZ8xIKAwNjaYwf+Y47HNXmE' +
                    'B9yz087IyCUTVwBIkE+nGlpVYRKKmUCofDjQe8bzztb/xghwsAAUCArEwBedkZJhDoSyChpACNxKKqUEUZrrIibK2e2ETF4/EX5Z5bFRkCC8gyARhIZKJragFOrp1tAjsO3ca9njgEhnRSGiDwEKUUHu11vaRiA/' +
                    'GgY/t1q91hhdY/gO+RQYQHFbjnlMC7ea4JrG+4idYPQeRm8CjIyQRtyYbvSxAfDy0IpYGdN6w2xxh86fuBRKTf3Ka7shjejZVp4MAttH7qI6ExyMrNRnFuJvxfA/h4kADJZPKFs/5uRYIbhkDSCIGEQm6P25kP7+' +
                    'oZaeDwfbR+F83cIKUiL4tHliziuWceCSEWa/Rc+eA52xGERtFmDozHPbMA3pXT0kDzwzRATsDYHa1r2OC0om5hcRPV29tnj0jU52n773Myy5nbBLkH7lmF8K6angaOPEBr1480oKngFQUde1zKCOpnqXmRItFY46' +
                    'XXQc+my28BlgBkJ0vL8nGiZooJ7D7zFBe7CUBWBjnOU8umYsmkkU2FBfl1JhAKhRheENouvA5Vb7/6DrJx3hQ1pFR0My886R4jaM1kyzVJkmpttiL1TzEZCMvxDb2ivuvko2/czfdBdMVEc6zQMhyLJluxucqmWF' +
                    'i1OaXI9UVFhX+LaWgzcmKUM8dxLkXV7cY3htJ9pJTbJVk+NzY/759y/gUON2pDlqRajwAAAABJRU5ErkJgggo=' +
                    '" />';

var attackIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhDQANANU/AKJRAP/LNP/dNP/KIv2uAMmHAOyXAP/pfP/eQ7VkAfisAEA8LOWNAP+9CkgkDeejAIhIA92OAP/ODmtEDf/EAf+9ADErHF02Df/PE/y3ALVrAGMyCv/mhk9LLy' +
                    'ccFhsYGf/TJaeRO9PCav/fYqeWLP/UE//hRv+0DvC6QqeDDrWiHPecAP/GCtGeAoVXCvDcXKebSdOwWLF3CP/ic//sdvWnAIRuDWMtB3toDXYuAnU/CqJgAm9KDXBZDXtrLf///yH5BAEAAD8ALAAAAAANAA0AAA' +
                    'Z3wJ+wAxP+FiqjkkY6vnBK48HkEwl6xo4UIUCUbEJLaMbhjEASTBrd+qUGgQGLQs8UIB6hb9Co+CsPOx9CCzEBDRmJCg8FPEcoJzU1BAQ1ERo7Gi4yExc8BgYMEQk3Dg4bSisJEAkADlFCDDkfF66wFgl5PzqoQk' +
                    'EAOwo=' +
                    '" />';

var influenceIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAOZiAOPt8dDg5sLU2gwODlhbXCstLbTJ0VhcXa66vtLg5ePu80dLTNXj6cra3svZ38DT2snX28vW2ubv8sfX3ePt8LHEzNbk8SMnKFRdYLnIztPh6A8PENvj5rTGzX' +
                    'J7ftnn7ODs9rvP1tzp797q7+rx9MbV2dLd5JqrsdTh5xkcHNLh5+Tx9Nbh5s3b3t3q7qe5wWxydIaPk5KYmdvl6NTj6cXX3XuGiu709svc4+Pv82BqbcLV3CgrLMHT2d3q9NDc4NHh7d7r8Mzb4Ts9PuXs78LQ0z' +
                    'g/Qu33+cfP0uDr7rnK0N3o6q25vtbk6NHh5/D3+tPg5d3o7dfl7eTs79Tj5dbl6g0ODg8PDwsMDeTv89fm61FXWOHt7tfj59He43uFicfY3bjM1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGIALAAAAAAQABAAAAd9gGKCg4SFhoeIiYqLRkVgEw1hVAJSAUoLglZfNUsUFgYCXCsgJEktHlg6TT8RHE' +
                    'APKCMvJllHUzMYAzE9XV4+OwBOGVFBTwAygzYaATQqCh8SDgk3MIVbVSFCIi4sJ0QEhwcQUAxaFUhDiTwlOTgdBYsXCEwpi4IbV/b6+4EAOw==' +
                    '" />';

var closeButtonIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA2lJREFUOMu9VF9oW1UY/917zv3XJC7p0j4YFTTS2RJwrB' +
                    'AGe9hgT0P6KlTX+DBh6WAi00otDhZlXcKwBspo+9i8+DSHvraQMlYznViVjuYhbWY3blNzk9zk3mubP/deH0buGoJuE/SDD8453+/8zvedc74f8B8Y8zTAuXNnjxeLlUy1quPQITf6+nzs0TePvHrxg8tbz0WamJ' +
                    '4KLqd/zDWbLbAsC4ZhwLKsE7csC5SyOH0qTD759Kr1j6Tl4n3mw0tfvLb9sJAjhIBSCkopCCEghDg40zRhmiZarRYCL/qHk1/Gai/0vp5rx8lB0sJuJbj9sJDjOA6iKEIURfA8D57n0T6EEAKO45y5pv15/s7qD1' +
                    '+vrf32qM3j1HQ9/lnP79s7OUEQIEmSQ0gpBcMwYJjHRbXHlFLwPA9RFFFUqpmvZmLHuzK1wTUIoRBFEYIgoF6vIxwOY3BwECsrK8jn81AUBW63GyMjI9B1HYZhgGVZsCyL/AP5/Ww2G3MyTc5ccds2IAgCbNvG7u' +
                    '4uNjc3kclkMDo6WolGo7BtG5IkIZFIYGhoCEtLS5BlGfV63bnzuRvXRCfTQOAl6Mb+ZcuyUCwWUSqVYFkWFEXB1taWNDU1hWw2i0gkgmAwiEgkgr29Pei6jmazCUEQwPM8Go3mt3fv3pMpABQVtW6aJsrlMnRd7/' +
                    'gey8vLWFxcRDwerwDA2NiYr1arOXFVVfE4sQBUVbsHgGEBoNFoQlVVGIbhlHLQ0+k0PB6PD4BvZ2enK65pGiqVCpot68nrM4wNTdOcRzrofr8fs7OzmJ+fhyzLSKVSXRhBEKDrOjhKnpD2+b3HKKWQJKnLk8kkCo' +
                    'UCUqkUpqenEQgEMDk52YXjOA79/d6TAEABIBwO/bp+P4eenp6OdhwfH8fAwACi0ShcLhdkWcbc3BwmJiawsbGB1dXVjvs/dvSN7502fZS/I7z97sS+1+sDx3EOKBQKwTAM5PP5js2hUAgAsL6+7qxRSnDz5jdMR+' +
                    '8nZ65wK7d/abhcrn8ld2+dOeF95+yFapegfPzRRY9a3asdFI9nsYWFhQ4e2iF5iet2PH71sFLSS+1ef5q98nL/8DPp6Xe3Frmf1nINy7L/lowQFrHY58xzK//t9C32wfYf4XJZy+jGPtwuEb29nuHIe+d/xv9tfw' +
                    'FATFKTqjXpOQAAAABJRU5ErkJggg==' +
                    '" />';

var updateGoodIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADaElEQVR42lWTX2gcVRTGvzv/dibZmezOrLObmNrGVttKpLKWKGit+NLaB4sU8tAiRPDBFhUf+iBRKiKhvolQoQUtTf' +
                    '8kuytRWzRUCqVYaggl2+oiphZTXKPtNknTpMnu/Llzx7MRH3Lh4zAP3++ee843DHSGhkuFqVr9BYbYA2N+QpM8x1R8XU94kqZT1b2krvkJRfF8HvkiijwWR35jaWmQNQFfnhkZO1SafjZmEiAxhFYSjZ6tMJgAEx' +
                    'ECHkDwEHJI4hHUiGPgGRPJxemDK4Avhr79vXCdPyboKwaDLMtofXoLJElCJGLUI4G7YYT7AYfwSVQ/zSsQ1V/eXgEcOX129psbzCEHdFmCSsp0b0TC0CHiGB4Blghwm4z1kANBhE+eUnG3MrafDRdL0m0pFZybjG' +
                    'S1ebMiQVNkuOsfgZm2/uuAzA/IPEO3/+OH8BshjvYYqJYvv9kE2FejzNzx6x6ycoyMocHUVeTW5JDrdNEg81w9wEw9xPSyjxsk7oX4cWcqrl678kYTsOFSmL15fIrBqS/DSahIkpxMCu1r22mAAvfJcK8RoEZ1iq' +
                    'qgemVHMvrr14nX2VDxq57vvNz4cE1H29IismS2mpBWA+lcBhIEnnMDLPgT8MI5xMwm2Gb0dYL/OVl5jRWKpZeH5t3R72cUaIGHtKIglVBgaCpSTht6n5jDscmjELRShYbLaaCm3IL3N+0V83/c6WWFQnHfpXup0+' +
                    'M1AZ/eu1Bv7lxAp430vdiB0fAIHB1IqYBKMelp34bnH34JBy4exscb+/rZ1yMj74Rh+FlM64qoYU3TEEsKtQuI9Q8wPn8WdsJBLDzYRgZv5T/Cqd9GcPXOOWzLvPozK5fLXRSFrUIINwiCbOD73Zzz3SRpYc0tCs' +
                    '9F9G4+hgu3ziCf245lruFUpR9dbRy28srsSpD+Pz+cP/+453mXVU11FVkB1i7i2uwAut092LmhfyVUAz/tgywmaB4m8g99UF4FKJWK76mKethqs5BOpeFkbZSqB+g5N7EltxeR1I3K3/30v4GG/CR2dR56dxVg8M' +
                    'SJdclk61jatnN22obR0gLZCnBh+kMKUgVcyFBYBDeZx/aOg6OMa7tXAZrn5OCgbVnWftM0dxiG8ShjTDOSiZqcWRTL4WyHqblVS2k/yUPxeVfHJv4vpD6OQ8IRFmYAAAAASUVORK5CYIIK' +
                    '" />';

var pausedMessageImage = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAAAaCAYAAACuJFCeAAAAAXNSR0IArs4c6QAAFUBJREFUeNrtXHmUVcWd/uq+1/2abuimabohNIoedfQ4J4K4EI2OC1lm0FEmBh0wEkVFMo7GYH' +
                    'I8QYUwrSGbtAnJETWEwTVEyWQCRGMSgyK7oiBi3Gh6ofd+3f2Wfsu9t77549V9r+59972GYDLnIHVOnV5q+9VXv6/qV1W/ugLHw7CB5EIAVQAqAAQA2ABiAPoAdAohnjuO0vHgozezAIwHUANgJIAgAAvAEICoEO' +
                    'KHokjhs1WhcgClSvEEAAnABJAAEBdC7PyYhD1XKXiZEhRK2KRq5/WjrP881Z8RAEKqjQAAQ0Wh/R5UfS5XZSrVzzKVbioC9gJoB9AqhHjhGFemswCMUmMUAlCi4afrkVQTlKnGbkgI8donkHz/AuAEABMAjFXYBQ' +
                    'EQQApAHEA8WKDwNABjAIxWBR1SCAVuWlUwSPKfhBCvHqWwFwGoVqtMuRpcqEEcUu1c9NcOJMmLtf44RCpVfTI8MaBiqco3Qsk0Qv0Pqv9l6ncHzGNZmaaoWXyMmozKNRI6uEEpl0PAlJqkoyRnCCF+9wnjYLXCa6' +
                    'xGwFJtYUkBSAYLFB4LYJwCvUopnwO2A24MQL9KO9rgzBKj1QyrK3ocwMBRtuPUryuQTsCAh4RBbRUMqVgKIc7xaOZaTdGO5VCl8KtTGI7SJrGARkAo/bDU2A0BiADoJ3mdEGLtJ4iAtSqOhRDXefTmTYWRlUdA0z' +
                    'Q/b9t2bSAQGAegFnPmfA7PPvtpV6avfGU/nnxyq2PSkbxJCLH6KIQ9UZF9NIRY4BF2pRrw8qOsfyyAaghxa8FcZWUSNTVpTJ0ax2239eGKK5KKiI655Q1jlKKZx7gyVaoZvRZC3F8wVyhko6YmhbPOGsAttxzANd' +
                    'e0AogqAleSvFUI8fgnhIDjFQHHFFgdJQCZtwe0LOtaIcSJhmFMkKnUOGPChC8hHC5zZaqpSaGj408oKRkAEAYQFkIsITlfKaRU5og3CJ89VqVa+aoBjIIQV3sI+L9qEPvVShhRM2tazbZ6W0Jb0Zz6q1TdGRNXiC' +
                    'sOG8Jbb43iscci2VleiDqPbLvUQUw3gB6FRUztfSwlHzX5+LewED2/UzMFKYR4juSXtb2aE+kxGbNmkdq37dJM0H9X+5mJEOLOw5Zszpw2PP30HjVmg9r4xVRbJgDbtm3pKKRt2zIUCv3KsqxZgUBA+Mit69Jfg4' +
                    '+zT3WiLYT4H9XPf/Oxhrx1OXhJIcSvVblrlUVQofS5RlmQdQBqIMR5Hr3pceRwdaKnp+eKMWPGTAQwyTCMCXjiiTPx1a+e59utX/7yPVx33SEN3JgyxcwiBNT3WSXKrKxQK2lmlRPiAo+w25xTI9VGXGvHIaC3DX' +
                    '0PV6HqHgVgJIQ431N/CwADpimweXMIN95YjdbW3Gr36KNxzJ9vZYZcVHnKvqf6P6BiVMmX9iHg35KE8NQvPT+FjxLrSuiYjAnVh4gi4StKwW5SVsSJEGKeB4OPFH4GXn01hBtvHIu2tpxl1djYhLvuala4OPgMKQ' +
                    'JaUkrbMAxbSqnLQ8MwIKU0DMMQzs8jJF4hjLwTj65D+hmA4dOWi4AatiVqm+Ic2jmT/mg16Z/uwSziO4tYljVLCHGyQ0B+8YsXiZdeGgsAmDTJhBACBw9mwL3yyijWr29SYDqkcBSvGAGFRkD9oKMMQAhCnOER9i' +
                    '/azJxQP3UFL0TAoM9BSghC/IOn/l4X2Bs3luDKK0dm0889V2LXrqQiYLmnbJtzGqxhkNQmh/8vAurk060D4aNIlnZiGVOTaRjAoBBigyLgAgCTFAHneDBo107IgfXrS3DVVdXZ9MmTk3jrrQ8945dyxlBm2OWMo5' +
                    'RS0iEgACGlzK6Azv8+RnxsjfTeBaIYAaUPaUMaCR0iVqhFZaIHs+yZQdDH1q8CUMWOjjHYtKkmm3LDDSkIIdDQkCnz0ksj0dtbjbFjy1Rj6aziCXGhp8HNWQUQ4rOetP0ASiDEab6w5RNyT7ad7dvL8NBD47FjRy' +
                    'W6u0Mggbq6NC64IIq77+7GtGmWRvRS7XTVtXNxAX3ppW7Q333XKLD/gyJ2ZrXdvr0aTz5Zji1bynHgQBnicQMjRkjU1ydw2WX9WLy4DRMmmACIyZOnYO/e3Go6b14rVq06kP170aKJWLbslOzfZ5wRxbvv7na1vH' +
                    'fvCPzwh/XYsmU0OjvLYFkCtbUpXHJJGEuWtOD00xMeAgJCfM6D5Xo0NNTjiSdOQmtrJdLpAKS8TxEkpeUManthb9CvqAQuv9yd+sEHIQCV2L59NJ5+egQ2bx6BAwdCDj6Gg8/997egvj5lGAZJOqavMAKByz0yv6' +
                    'L155KCaQDws5/VYc2a8Xj//ZGIxYIIhWycdNIQLrxwAHPnduLiiyO+W5g9e8rxox+diC1bqn2wbVbYugmYTpdg8eIT8cwzdejqKkV9vYVbb03gnnv8zgcCeeS2LGumbdsLbdteIaX8DR944AABEiANg2xqGmBTU4' +
                    'SGwez/GxujJNtJtpBsIvkhyfez6U4k31XxLz5pbSQ78v5fKJIHSX7ExsYuBoOyYL5gUPLhh3uz9ZM9JMM+9cVdMRYbcqVXVJBkimTKp2yEZJhk97Byjxtn8sCBD0i+w7VrW1xpEyakSb6TjRdfHHWlNza2u9JXrm' +
                    'xjKFS47yNHWtyw4QDJvST3ZKM33+zZ7T59WkLya2pf4xDhTpIPkXzeJ3+Y5CDJKMkoYzG37OXlkmTPsPjU1aX50Ud/kVK+reTeK6V826e9HA7F0u6/v/MwdGkPybdc8ZFHWg4D2480XPeSfIdXXx3xzT9vXtqnXd' +
                    'OJOgHn2rb9Hdu2/1tK+Qd55plxp4C85BJTKVuMl15qZSs6+2yLZD/JPpLdJDvzyCSEQ7JDJA/5CNOn6oiQjPqkx1TagBrsHm7aFHZNBJ/+dJpNTV1sbu7iWWelXRPHq68OqrIZ+fPrH1IxQ8CNGxOu9HPPtUkmSS' +
                    'YLlM3IN326yeeei7Cjo5em2cW2ti4uWOBu74YbYiTbaNttPOMM98Bs3txNso2JxCGWlUltwCUHB9tItpJs5datXQwEcuXq6y3u3t3Jzs5DPP/8nIxVVTZbW9tINqtJ66CvMv3kJ/vZ2/sCySdJNpL8Nsmb1YGEQ8' +
                    'A7FAHX+WAwkB07MpaH3znnWCQHOH26yeefj7Kjo28YfFpcMV+XWrMxX5Zc2vjxlitt3boeJpNtbG09xFWrejltWtKFDXmQW7a0+2Dbwc7OtiLYtvCpp/pcbU2ebLG5Ocrm5jinTLF95LScmLu8se07bdtulFKuk9' +
                    'u3v+kqsHp1XCnaENescSvO3r1DagAcRe93pQcCDsnCBVagqFL+IZIJn/SERpAoyQivusotw4YN0Wz9Gza4SXz11aaSPdOG/woYo2lG+MorMU6a5AbssceSRcomlXxxbaLI4TA0NODKP3GinZVz9Wq38t1xR4JkmC' +
                    '++GPHMoEmSvdk4c6Z7JV61KppN27TJ3d5ddw2piTEzOXrlf/jhJinln0mus237UZL/Zdv27SRnkfyCRsD/IPmjIivgAE1zkK+8Ei+AX0SLOj79Pvj0uGK+LuWwyJcll1ZS4k5bvjzGffv6mU73etrozsaZM5NHiG' +
                    '0PyV5On+7Wx40bHX1N8He/Sw9LQMuybjZNc6llWaullL+Xt9zSlc08apRkLBbJEjAWS7CyUhfE1BQwlreKZUCLFFnhcuTzX2WSmqJnOlZb6zYRwuFY1gQKh2Me00Zqq1zisE1dgJw/f4i23ZtdoYvJ9tprSc6ebf' +
                    'LUUyXLyzOztTd/SQmzOJlmjCedJDXlk7TtGL/5TfeA7dwZ1xR3kHV17r63tubS4vFBV9qZZ9pZZSf78uTp7HyD5Au2ba+xbft7ytS8luR0jyfMbSR/QPJXR4TfbbcladsDJAe5eXOcs2ebPOUUexh8BqWUg1LKTJ' +
                    '8K61KkwJYgE88+2/KVKRQiL7rI5Jo1cYVNLh45tpm0MWO8+pjI6nM47Ld1STsx40uVSt1rWdZPpZTrZDK5WdbUmIcNcl2dZDqt76NiPqBFsyZKYQIWWwETLlMxGHTnsayYS7HzBzUnX7G+hEKSEyemOXPmIDdubF' +
                    'V72ma1z+0paL4+80zKZRIX33fkBmfFCtNjhqY4eXJuBZk61c5Oao5iefteLGb2X4NZ8z1fllellM/btv1j27a/WcQV7WaS3yX57LD4nXCCyS99KcYXX+zJ7r2ffjp2BPhECpLMrUvRAtZUJm7bFue4cbJoW0uXul' +
                    'fnI8c2s6joZmtGH3OLimkmik3cwaGhoQYhRJWUcgyAkWLt2nFGX1/wsA93u7sFNm4UmDnT8k2XMncEHIn45bCHOVq2847vq6uJnp5cmWiUGD2a6nd3XdXV9K0jp13NmjtZUrvHNDRXtBGa76fr7AqAwNKlIdVP5+' +
                    '4rhQULLJSUAMFghY8zQibefDPR0AB0dzundkHs3WtojgCm50ohv+/FwtCQ8Byd5+UQQkRI9kcike4iNZla9OL3gXad4VxBBVynz9/5zmgPPgksWGAqfCqLXJwX0yVR9NL9M5+x8dFHcfz2twFs2RLAe+8Z2L49gF' +
                    'gsV27lyhIsXpwsqFeHhy1RVUWEw159lOp3owCeAEAjGAzWGoYxxjCMUQDKxFNP1bqyvvxyD8gOkJ0gu0B2o6mpD4ZW7y9+EdCuIUyEQvoAAYODmbumN97wU4K0duyddtWbAT3tqhtIY9o0tyJs3cps2tat7jYyeV' +
                    'M+R+tOiChvli4AhwC0AGhWP9uUl0tY3Y95Q6bOAwfcQs+fn0BZmYn9+2XRy+ARI4A777Q15wYD6ggeI0cS11/v3Jelszidf37ac8zfD7JPi2EVM3/ruOWvbHEpZRTAQHV19ROHQcBC+PUrnDqQeR3SrvAMA4igqS' +
                    'ngwSeOsrI09u+3C+hDLpaW0qVLAwNmEV0yXbGiIo3ZsxP46U9j+MMfBrF//wDcnieGK//555vDYKvH3qyMU6Z49VFm07Zt8+tj9k7U0JyTS9DeXoo//zl3P3XyyWlcdtmAuqCNKU+GKE46aRAXX5xzQH7xxRJ0d6' +
                    'fUpfwQTjnFLdDPfy7Q15fC/feH/OYSLcZRW+sW+I9/tD15Eli4cBBCm6gWLQqhuTmN1tY07r03t1IZBrBwYb/mLOD3aiGslOcQgIMAPgTwgfp5UJGwSymZv+zjxrllXrsWCIfTWLiwtMCKnrskv/12icrK/FzXXp' +
                    'vGqFEJ7aI/Mwbf+EbY1fc5c8qxa5cJ00wgEkli504Ty5YZmDx5lAe3ofwrVhE1DCNiGEZkmPne1JwhvKFfw69ZYdas/s6QsLbW9HhRAeFwEgsX+jnYJ1zx1FPdltWqVQb6+pIFdClX7rzzRmLFCgP79plIJBKIx5' +
                    'N44QX36lpfb2l6Ec/D9vrrK7Brl6Vha2HZsoDCNtfWTTdFXfUuWhRCS0sKLS0pLFrkJ2c8O6aWZT1rWdY6KeUGed9977ls1W9/u5XkTpI7SG5XcQfJXXz88SZX3gcf7CC5j+Q7bGxs97Wbb7jBbx/ytop7Sb7N+f' +
                    'N7iuwPcvc83/9+OwOBwjZ+ICD5gx8c0u7C3iL5pk+dz5F8hOTSAvufpSr9uQL3SG/zgQf87zFnzYoUODWMZE/JyCS/9a38A4MdO7rUHnQfyd0kd6mxeJ3LlrUU7XuurX0K2z0kd/uk/5jkt9TDURTZA/4rydtJLv' +
                    'Op4xmFz3c9ZR4kuZLkc7z33nd95bvmmv4C+rA3G5cvbzsCXSp8R+iNhkE+8khL3j3g977XdpjYuuWcMWPAN9+cOX5yvknyDZKvC8uyHhdClAAoFaeeOkM0NVVljFODeP/9l8UppyQ0typnDxPE0FApxo+/HNFoxj' +
                    'vitNNieP/917P7uSVL6rFqVT26uspQV5fEjTe2o6GhDYGA13vhZZftnkgEcM89k7BhQx3a20cglTK0vO53h1u2VGD58nps316F3t5Q1lF82rRB3H13Ky66KOrxdCCE+IKn/RXKkbpLCPGYj/LNz3q2C/GfnsQ/Zd' +
                    '2XGhrq8eijmf6OHZvGl7/cg4ce6kAo5HXE7UDuKVTG5enllwOYPj2kuW+l8dZbBzTLY0itQsy62W3dOhrLl5+InTur0d0dgmUZqKw0cfLJQ7jggkHMmdODCy+Mudyu8vu+FIfxoJjk5wDUA/gUhFjmSWxUq2CvEO' +
                    'IR/eQ0+xwHqMZ9952F1atPQ3d3OWpqUrjmmk40Nh5EKHRpUX0ABJYsOQGrVk08DF3K6ce2bRV45pmx2Lq1Ck1NFRgcDCIQIGpq0pgyJYI77mjFjBn9vp4wW7dWorFxInbsGO2L7ezZ3fjsZ6MuOVMpA4sWTcKzz3' +
                    '4KPT0hjBuXwty5HWhoaEUw6JXz9w6nhG3bDdqGuUQphqH87qicZU21waZSuBItBop4rB+pz6LQXjTodR2p57ufQ7Ke5jwqHlJ7ux4A3UKI9X6zv/Jqr0XusxTeF/XCR/aAdhih+whWaIc6mToaGkJYvDhHwIcf7s' +
                    'DXv96szON+tc9KKdmDRbD3YkXPIYzudB1R9Xch81mN14oQ8ALl3V+rHIzLkfs0R1zJ2CeE+I1W5krkHqM6D6GLvaTH30AfhtM7qfnrQhs3w6fNQvrlJ+fhjIMNwAqSbBZClBiGUSKlLDEMQ39gKQ3DcAbNFEI8qh' +
                    'xz8wj7VxLQz2vfGKYzR1K39HEMd9IcB2TnqVNfoXNeBVZSkXWE5v8Y8Hlp4P20hXOK6vjZjgZgQ0oiHC7Dpk0BrFhRoj31sjBvXpt2MNQlhFiklPprmpN56REQUHc+dvod10g4OAyuUTXWUk1azqc5LEVm56mRvr' +
                    '/cQPLzKv+AZ+IyChDw49aHj+M1RLFJYjg5UcAB3BkHUwCAaZr/rMzQIIBAIBAQtm0jEAhkveV1E0V976K0yCyMAkIM925tls+MdzhvwIrVLYUQz5O8xpPHedk/BCAmhNhdZAWYityj4GKrn5eEQaWsI+E8aHUeae' +
                    '7ZU4spU07Na2zVqg8xb94HADrVQcYhIcRKTZYZw6yAxZTO1lZ/51MaUSHE28NqLvmPyH1TR/86gvPNnjcLlLsQuW/9lBaR+ePUh2LXGnlk8HkPOJyMRyqn3wpoCSHWH83bquPhSKdfsgHApwCMw+7dE3DOOVMz7z' +
                    'FCxOmnJ3D33a2YO/egdqrYou+rjodjLwSPQ/B3De3ZmXLqVAlyALnv3zgfoMruy9TP4+E4AY+Hjyl0aearrfZPpYqUzgeowtre79fHITu2w3ET9O9vhs5RZqj3U3UOAfsU+dYcR+vYD/8HshtVUk4+/YMAAAAASU' +
                    'VORK5CYII=' +
                    '" />';

var experienceIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAOZyAAABAQBAUAARFQAFBgAUGQANEHvl/wMJCwBIWwBLXgAZIABLXQArNAUOED/Z/0Ta/wAbIgBDVAArNSnX/wB5lwBedUrb/xHQ/wB4lgYQEwA3RQTC8gCEpgCy3h' +
                    'PE8Ifm/wBgeBZ+lYbn/wAvOyhSXAC/7wBfdwCPsyU6QFOSogAiKinU/wDG+ABbcgAGCCTT/wTO/wGbwkDZ/3nk/wDC8gMFBV/h/znY/wARFjHV/16Pmyx2iAAKDAAKDQBJWwAICgBmfxU4QAEDBEfK6gCiywA7SQ' +
                    'BngRFEUQ3P/yXE6SE8QgB0kgOjyy7X/xjR/yg7QB0uMhxCSxU9RxtvhAI6SA7Q/3nM4QBuigB6mRc4QAo3QQBiewA0QQKfx0nb/wB3lQUSFQBlfwGgyAONsAACAwCWvSk7QAAqNRrR/QTB8RvO+1Pc/wIJCwjQ/x' +
                    'rL+AA8SwidwgCFqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHIALAAAAAAQABAAAAeagHKCg3INGYSIiCQ7iY1yKUNCjoQ1VhZUk4NQIl5jiWBRSihPZjozD25HWUFaRQ' +
                    'QHUzI2Bh8GazkvTRMeXRUFgiNMajcOK05IG2UgKogFSywXVTAlJwg4jnBtNB1EWFyObElpcVcYFGE8jVJoHAEMPkZfGo0hMQECcgILQCYAiGRiEvQY9ONNCwiIJGxxkehMBH+DFAxwRGBiIAA7Cg==' +
                    '" />';

var badIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADW0lEQVR42l2TW2gUVxzGv7Nz2yS7m2xMNpusuWxq3EKLfSsJjVDEtlgLIuQiWJGKF4qlVFpL2bRpDN2l1FYRxZcGBL' +
                    'VaDaIkD5XapIJIQl+KNj4ktFm7ZrOX7H1mNzszOzM9O9G09j8cGGbO9zvn+18I/hfhUMjLctxBXhC2EV33GoYBg5BQaXV1WlXksc7NvtB/95NnL08eP2ZYhhnlCtLxJ1cucisz9yGnk+Y/oX4DGnt64dmzVy1yws' +
                    'myrg9v8vm0dcBSOMzwPD8u3bm9e+HcaVid9WAF6zrdoKssl1DKpNF19CNwW1+/qShKfwVi7kksLweKUz/7F8+fQbWrCbzNDr0g/QugBIvNBkUSUUjE0fn+hyA9vcGOrq4hEo1EvNaCNP9g3yBnc7vhenMH3O/ux9' +
                    '8jn0NZ/GvNwgub0P7lV4hcuoDknduQYjG8dOGyKrKcj6SSyUD67Hf+/G+zqKpvQNf578E6alEW84gOD4EQguYTATB2O7WQwdyh/SBFCY5Xu1H13pEgEfP5mfDAO91cTTU1SlDV2UkFQSpwQKMQQh8LFcvZLB4e+w' +
                    'C1mRTA0K2FIlwXx2eJmM3Gwm+91uTwbYQmGdCTUTDtLWg59yO9SZ1poSJ+cHgPGmPLsDQ0w1JDIC4swT0xFScSBSxRQM2LHmjpRWh5CcLmLXB/ew3MU4CSyyL+ySDUhYf0mx2M0wtpPgLX5DQFSNJMvO/tbsYiQp' +
                    'ejsG55Ga7R62BsTvNkmgLwtXXUTgaxLwag/DEHi9AMTbej7vKNWZLNZALymW/84sQlMM02tF65T0+pN8Vzn/ajpVGD67MbNCdOlHNp/DnQCzYhwr5rH4xDR4NkJZHwVou5+ejgGxwsMux9e+E46MfcMeo5/7tpgW' +
                    '17BU0nruHR6a9hnfwBLHi4rv6k5nirz+yVbCoVwK8T/pUALRtnYJVeuUbP0O552kk6TSTrBEnmwNAGbhgKQO7eHnS3tg6tdWI8xgiCMG7cvbU7dWoEel41QZVymUFFhkrLaeOw4eMRqD07bpbkUn9re4e2PkwVCM' +
                    '9xo7yUOl6cHOOK935BORZZs+D2oHrrdlh3HlCLguOkopaHN7a1ac9N47NI0pxUxpmubdDK3sogGBYmRIdnWpXlMbfH89w4/wNi4WxKCJsyDQAAAABJRU5ErkJgggo=' +
                    '" />';

var pauseIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEUlEQVR42l1TW08TQRg92+7sFlqwFZCL0LBCRV8Eg1wMmhiMGmOMQYNPxsSEv+ALJjyQwIt/wcTE+EYUTLwbeUADCK' +
                    'J4SbRyL1ZYytLSLe1eW2cHIeqXTHY3O3PmnO87h8N/tbS0JBGedAmi0E4/pVwuB7oWNE0bNgzjTm1t7cLf+7mdl0gk4uZ5vhcu982pr2EyH4kilU6zf778fEjBChw9HDItQ79tWVZPKBSydwF+Li+7BUEciMjrHW' +
                    '8mp1FY4IMoCHC5XPRvDtlsDpquI5nawolj9Sj1+wYpm04HhAHIstz3az3RPfn5G4oCfhBCwLvdFGCboANg2RYMw4QST6DpyGEEvGK/JEm3uJWVFYkXxPCzkXekOBCAKAoQCA+epwCc6w9AFqZlwzBN6LqB2EYcZ9' +
                    'sazcxWqo5TFKVvPrrWrSRUFHjzKQDB95k5/FqV0dLYwFROfJhGWUkxDh0MUSkG1K00ivwFqAj4+jk1qY59mlls9eZ5qFq6neMwOvEeM3MLOHf6FGvSi+ER1FRXoa21GX+mgnRGw6Fg2Tinqurql9lIaclePzKajg' +
                    'xt1tvRcczOzePC+bOMwdPnL3FAqsbJtuPwiCLyqMzYRgJ1wTKZAqRWvy9GSwN7fKxZDr1Xr4cRDv/AlcsdrAcPBodQR+mfOd3OZDos45sqaipKZC6VSo3NLMutHoGwrgt0Ao8eP8HUx2ncuH6NAdy9dx+NDfW4dP' +
                    'ECdDqJLJXgPIMl/nEukUj0Kcl0d5LeLNLDzgTGJyaZhKuXL7G+DDwcQm1NDVqam9gkDNNiTLw8+rlYLCaJnrxweClKHABCAQj1gNtZru0x2nSMlm2DOhAGXbphIVRVZqrJzTrmlHg83qdZ2e6orGx7gAG4mNYdI+' +
                    '2AOAz27ysCZ5v95eXlt9iONVl2ix7PQMawOqJrCrOwc/suQC7HzGTbWXbYDXtQ17TOqmDQ3g2TA0IEoZcnwk1lUyWb6hZzn1OEunKPz4tAodfUM5nbhmn0VFZW2v+kcaecntAsdNFk7saZ1gIND4szpf1PnH8DjE' +
                    'h/b2bB2sAAAAAASUVORK5CYIIK' +
                    '" />';

var defenseIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhDQANANU/AFFzrH2m60V0ukhrpazH/CQ0TYuv8U19yVeK3Cc7Wl+Q4F2O3S1MfFCAzBgdJRsjMjtinj9loVp4r22a52aFvzlPdIGYwk2AzneUzVN/x2iDt8ja/ZS29mOAtT' +
                    '9dj9Pi/jFShI6hxHef6G2Nx0VdiDlLaePs/rrR/SxEaaWwxYCh4lWH1198slqJ1mN5oqLA93uSv05ihUJkm0JusF+IyzRdm22b6DdfnGWV5HSg7YKq9Hul8Iiv+K/J/M3e/v///yH5BAEAAD8ALAAAAAANAA0AAA' +
                    'Z4wJTp4ysaiwRMaHPqOZ9OlcZC4PCu2OuoA3txdOAwmMJycQy7tHonkkhiBkNuTs/hAKRSIDCx+f0TNAAVDjiGh4YKAAMFPx4tCwqSCgsZAzI/Pw8HDSsInw0REQmZPygzAgcXAhAQDKWZCTezswwOsJkPDDUgja' +
                    'VBADsK' +
                    '" />';

var staminaIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQANU/ANVbbJmZmkVHRikpKVV5Wq2fnux4itCxt8fIx76WnBYWFjU1NYyNjaVweJOSlNxqdysVF3t6fgcGBnR0daOhp76/vnZze7lcZOaMmq6Bh7KtrpN8hIJCSaCXmI' +
                    'GFi6qurmVjYm1jZGhpapOLjHRoa1EpLnJvdt9KUeyQoZ+foLKJkeBpfE5QUO/w8FRJTOJTXpSVmudVZNHR0sdkb91wfICAgIR0d7t3g2VeZamnq7NWXPJugGRWXH9BR4BfXAAAACH5BAEAAD8ALAAAAAAQABAAAA' +
                    'aJwJ9wSCwaj0OJUFBTiByBQIohWAxSFeEA8SFUWjJExOKBRSZCBYlAGBU6HQvFQclFhJtXiMVAaDQmA0UDADsJAiA8LjgBCkUJJzE+IgsiCgMTSkMDNAYABJcDCgQOmkI2KwYNggsCLI5FGQ8oKrCmRTcPGAe3Rw' +
                    '0XM7xIQyU9HDrDQxDLvcnOQkEAOwo=' +
                    '" />';

var huhIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADW0lEQVR42l2Te0xTVxzHv+f2PniMlQpLAaXY8oxhg5FIXNjQNHGSOTFN6EzmH8THZqJuzixspnUs0wGLxkf2yIIxZn' +
                    '843IaOTM3mNCE4fCaii84QTKAWJrTYUqBl13tv7707PUaHO8lJzuv3Ob/vL78vwf9GIBB0CgK/WZIkt2GaTtMECMyALMu9qqodLSsrCcx/T54sgsGgheP4PQkZLce7B4TL1wOYmkqwuwULMlFX68LbTdWayCf3G7' +
                    'reWl5eqj8FjI6OWURR7P7tj/uew50XYaMBQpoA88kvdKEpGqan5rDj3XqsqM3vUVXVm4IwwPhEqO3cpVHfoWP9yLFbsajAhuY1VSh15MDCEYwEo+jquYl7oRlEwjP4YOOrqK95ob20xOUnDx6MO+MKN9T43gkhJy' +
                    '8bz2dn4MSnjbBlpT1TG01LYlNLN4YTjxCdmMbJQ15NIko5iUQibZ8fv+XrvRUEny6huaES76+tZkF7v+lFPEPCvg11bP9913Uc7L8HXVbhrnZgh6einczOzl6t9f26LEPiAVXFYpp+cUE2JN6Cb3++iXc8L6NjfS' +
                    '0DfHXkIr67Mw5IImQlib5P3NdIbGY25Np52u502WFMz+Dv6BwicxpAtfs9VdjrrQEhBAN/jsF74AKstEaczYrAcAiDXzSEHwM+PGMvcuVh+OE/iEenAV1HXUUe+v2vs+BzfUN4q/MK4oKArFwrinMzERyZwGAHBS' +
                    'QSias1rb8viwtpmEiogIVKod3TvHQhWt+oYKmv/OgXjGRksqyQ1JGfJSJLlXHZt4JKiMXafCfv+joHQjAIRwEWNpeX5uIVh5UBjp0fwiRHzw2DZceZBrbU2OFfXdxOJicfOqMKGar67IKg8gL9hT7kOHQ0LsGulS' +
                    'UMULXlR9wW0x8DDB2ipmFgt1t7jjwqZ40UnYq1/XAj5Nv2022AVh80k49XlWHra04GaNh1GoO8RKVRAO2Hr9e9hLVLstsLFxX4GSAcDltESeruuhH27Dx1B6qRchCZZxWT1UWk24NNL6Kp0tajKIq3qMihPzVTCs' +
                    'IL4p5J2Wz5su++cPavEMZiMrsrtKXjzUo7ttcXaTZe35/U1FaHo/A/M80fqZqk7CwIglvTTabBQswAtXKvoqpHFxbkP2PnfwFXFV5DkrUSVwAAAABJRU5ErkJgggo=' +
                    '" />';

var updateBadIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADcElEQVR42lWSa2gcVRiG3zO3nenOTHZ2N3uRxrZaK8WAVWsqSKOIEItoqAWlrYKiQiJWiwhKQPFSafWHIlhRsKUp7W' +
                    'Z3a2yUukR/haYlaYtrNVTSC0HXxbCXpJt2L3M949mIP/LBy8vAvM855/s+AlapkWx6rtTsJfBNEGIFJM6MaIIlywGTk2TmsqnKkhUQBNNyPYt6nkl8z2rV68OkDTh0fHTq3WzxAZ9wAEfg6CpaPZuhEApCPdiuDe' +
                    'o64B0m14Poufhoiwb1RvHNZcA3qbEr6YvuHZR9+SDgeR7B++4Gx3HwqI+mR1F2PNRsF9RiYv7ZvQJo4fc9y4Avjn1fPXmZRFgCMs9BZIp234mAIoP6PkwGqDPAPAs2HRewPRzYJKI8MzVIRjJZbp4L2T/MerzYPl' +
                    'ngIAk8YrffCs3Q/7sBC99k4Qo7/R/LgdVy8FWPgkJ+cqANCF/woguHL5qI8z6iigRNFpHoSiCxOoYWCy80bVSaDooNC5eZXNPB6cdCfuHXsy+1AesnnPjVw3MEkWYDkYAIlSkSDSG5JskaSFFjgcWWjRLzOeaU+d' +
                    'k+1fv70i8vkFTmRM8pM3FupCSjo34DcRbW25CgAiMRBQeKRwwLG66cQXCpjLIWw8+xe7BrDXH/mp15jqQz2W2p67HcjxUBkm3CEASEAgIUSUQo0oGh6DyErz8GRyk41lzKGupLEjpfeZ3OVipPk3Q6s3tiMXTsXI' +
                    'nCYu9darZnTiGziQw8mMRDx99H8vEnlgFL4zmEt+9Aq1ZD9cxp6K/uHSLfjY6+5jjO5z4bl8cuLDG6zwlgz8T9jQr8sTQi255E58uDaJyfRrBnC65+sh/e9CSkHTt/I/l8fh1bhc2U0pht23Hbsrpd1+1n4u669g' +
                    'f86Rzc4p/o/PAg1K19KOdGUT/wFsTVa+H19leXF+n/+ml8fINpmpOiJMYEXsDGagnOoX3o2P0sjOeHUJ04iejDT6H65RDq344hMPBOfgUgm828LQrifr1DhxEykDBCsAafgdK7FTfZNIQLKQQffRGLhRrkSzOQ3/' +
                    't07wrA8JEja1U1OGWEw4mwEYayahUijetofLAHznwR4NlPbJPFrnUIvrEvZyta/wpAu44OD4d1XR/UNK1PUZTbCCGSKgml5MI16i9UbuGj8QK6Nh51PP9gvHuT+y+285cc/rnNdQAAAABJRU5ErkJgggo=' +
                    '" />';

var processIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADhklEQVR42nVTbWxTZRQ+7/3qvbe77W1X0q7r1i0q/KCMtQsdDscSidkH1GEd/tAtmkwHw0Wz6B+dwcQsmiEyBzMm6D' +
                    'aSZcHIDGNCXIjRoWFKYjrBNoyW6Uqh7b3Yfdkv6Mf13RINBjnJ++PkPec55zznOQgeYoPHjzkZhjHlcjlf58FX5x8Wh+53RoY+30aSVJei5Ns1Wu14SWlpc8DvfyORSJzZYNhwKJ6I97zQ2hb+X4B33n6rwPV0c2' +
                    'izzSae+3qyWxTFequ1rGFu7loPRdNVDE27s9nsd7v3uHY9ADB4bKBJpWI9Gq2mbe8z7sOyJClrf3lFgbvptBJbjEEmk1XuyFJNKpnMEASZf7619dd1gP6PjphqduzwcxwPweDCdG3tThduFTL3MoAIjI+h1nzMRU' +
                    'aW5EmSJPYmk0lPNBKpfrljv4I+7Our2FKxZczuqLKp1WqQZRlEUQs3AjckRVH8hQZDFUWS/BpINBoFgiDgr5XVc6HQzbau115fRgP9R0VB0NBGk2nCbrfXkBQFsx7P+UQi3vJsy770xUs/WAp1+kscz5XeXpZASW' +
                    'UvRhflAyvR2K2O9v1xNH76yyWj0Sjq9YXAcRyw+F29csXR0Ng4uzbj996Z7rPhmb6pm5fprJIHhqCgqaQa6tCmKddTuxvR2YkzS7hNTLoIQoEAPB7j+tw1xxO1O2d/CvyyZ8D/1WQwEUICA0BjSgx8EVQUVoJPDu' +
                    'SfM9btQp8MHhdxIl1WXjZhNJpqdHo95kE6n7ybbIlwsQsnAiO1Fp4FgaaAxtUPVvbArfgSvHv5feh89KVv0MnhoQpzcfGYimVtLMuCxVICeOcQjoQlH/pZH0l9Sz9u6YTphdPgND8JjqIGeG/mTShRx8DINEloZG' +
                    'jIhKv7EVqXxLTZXOyiMQDCbP+WnobfV4bBtfEIiKwVCmgtDHsH4M7KKeAZFh4ROhfWs8ZGR5vwnj2CRmgrMpsP8xyviDoR5fkMnPS6QUUqsG/zCUjmNPDFVTdwVA4yigbc5Z9+9q+UP+jtLXBu3x4iSEKMhMPdOp' +
                    '2ufpuzusG3egF+DPUCgQgAwooFdR1Hs1BXeuhPPVHueOCYsO67UqlUOz6e8Uq7vfmP4PyocRNnD6xO2ZbTIdCxZbBRW++hFPWLj5m3ev8DcL993H/USVGUSaVifK90HJiXF29vRYiwZHP3gkUGq/efuL8BeLNcQJ' +
                    'E3FaMAAAAASUVORK5CYIIK' +
                    '" />';

var energyPackIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhGAAYAOZ/AFcqAO96APLpzPXHMv3012g2AIZRAvniksS3nue6RHZCAPvoqfjXa9KdAO9pAPO+EbCJKePXw51oAbGVZS8oD2FbR/767NurF/bSXe+UAPPELdOsQ++HANC/q6' +
                    '2PTQwIAufEV3JbErF8AOW9N49hIfTBG/bZeNvEiubTl/TEJvzsu/DLUtW9cKVyAaJ3MLiEAtq5VfXcjcZ4MbyJAOKtAdmlAO65Dd2oAPn4+PXLP/K/FSUUAO2+ItaiAPLu6+u2CXRoP+PJeOfJZvzwysqVAO/JS6' +
                    'NuBEUdAP745v39/f778LWAAOvm4at2APDFQfG8EOaxBMSRAPXy8O9fAKRyDjcyIbSBC////++kALOEGtvMt+izBuK2MOXbt+3iyZ5uG/n39t+tDPHPX+3ALfCjDLOlduvGTcCNAPbhnMueD1hKHd3AZNVNAMKFI+' +
                    'OyD++6AOXPhr+njN3SybiGDO/IAI1gAP734fC+Gs+gH6J8AO+sAOPATevSf+Pa0uG0IQAAACH5BAEAAH8ALAAAAAAYABgAAAf/gH+Cg38fVUBlKHATQFUfhJCDHxURFkqXFkgEC2tqj5GCFAgWFpsYAzkmC0NDBx' +
                    'AUoFUCSUMrbjc9uTU1F2sofH6whBQCSjE8NTNNEszNLTMsQls7kghKB3c3SxFX3d7eJ0FOeZ8VBAQDP0Qu3Q5T71NsOBEvCSZpAIVdFgw6NEtxrshwQPAdDikkXoQxwaWFITsEcthoIEFKkgABHGTEkeSIgRc3Vp' +
                    'gRsQOInQUpoMyYkEQGB4wBuiWZ6aXHGDEiAHiwYOJJjRZyrmTgQPQlxita5tS4w2BJgT0WMEyEcKVNhqtDiV5BYIQIFB0YRCgYYYfBxBNXcKhNgPVKHCMN7KA8KVHESAEIBA7woEFEQoEkOLBgIZNkQpMGW57oSM' +
                    'GlzpEQKlSkuyH2ihM9V8B4ENHjx5MHDzRcMLCDAgMVGPy96MDkzRUfLqx0/vyghAYrBT58SHMATYobTXzQucLExYwbnkE/SDEawCMAI9BgAN6tz5czN2zQrs2jBQBqhepsiJHgTJIIVKLQ0A5aRwkeuI98+rOjxY' +
                    'YgMNJEabD+gfsSKcBXgHOQ7FBHFjAIAYITGqSQwgADiGYEAARGskMBBkCwAQhiiFEEF3hQoQAA8oEiyAc7AFCAAga0OCCFO8xnYiEoHkHhETHKOEggADsK' +
                    '" />';

var energyIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhDQANANU/AEs+IPfHHj0zIPesHveqHmhPIPfCHvfAHi8uIfexHve4HktEIPe9HvfEHve7HveoHvfFHiAiIWhZIPeuHiAgIS8wIdqfHqGBH/fWHvfiHve6HlpWIMyYH/fJHv' +
                    'e3HsyXH+nGHr6SH/fbHj05IOmfHoV0H/ezHlpEIFpPIK+hH/fMHve0Hsy0H9q0HmhUIKGSH6GWH/fKHvfUHvevHtqqHve5HvfPHvepHvfIHve+Hve2HoV9Hz0xIGhYIEs9IP///yH5BAEAAD8ALAAAAAANAA0AAA' +
                    'ZgwJ+wMCDcHg8ST8i0JGaT4okpdCl0K1OiQBXSGA6NggMA+ATCXsNwOIBrng/61+oEIOtDLkRhLhYoMTh3F11CJTY2KhKGPwgYMiAjjT8vIiwIlBUZKRGUPzA7n0Iboz9BADsK' +
                    '" />';

var killedMobsterIcon = '<img src="' +
                    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgND' +
                    'RgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAoACkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEA' +
                    'wUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp' +
                    '6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhc' +
                    'RMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0' +
                    'tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDy3UJ501CVUmkVRjADEDoKtGzvRawSR3UssspH7lFYtgqGzn0AZc9PvDrzirfrnUJfXj+QrXgvotRN1CYB9mWKWVo/PchGEeE4BA4IQcg9K' +
                    'VCnF0oaLZfkelmWKrrG1kpu3PLq+7GI8EIaGaeISC35kaSRx5pPTKEj5Qc9DyMVD9kuWhkki1BJSkZl2L5oLKCMkblAOM5PPQGn6LbiXXtNjPR7uJT/AN9itbRZ/tiGW/u1Kw3aSMZ5wCYpEdZgNxycqqDAyelbe' +
                    'ygvsr7ji+t4j/n5L72c7DNOZ4w0zkFhkFvetms5reGK+228zTQq42SsmwsM9SvOD7Vo15GaRUZRsrH3nCFWpUo1eeTeq3d+hj3kJkvZAAxLEKAvUkgDjHetOx02K1S5srfyxPIqpeTKNywruDCMYyXclRkDJ4IHR' +
                    'jW7o2reF9HP2i+057zUR02Qlth56l2CdMfdH61oTeJLeC2trm00qRtKmkw6i62CFud0flooAO0kj5sEYI6HbpRxddxUKdFuyWrsk/Q+QzKnD67Wbl9uX/pTMyx8P6g95p93oum3KXMMu5oL90iZihDLJtbHysOCB' +
                    'nBU8nINXJ/h1ew6lJCZ/Lt2JaEQQPOyx5ON5+VQcYzgmkl12806/sbhrqyXTblXVZbC1KTJHkoWHmZcEEkgAlSVIyRms+f7TdXN1oPiDUJJpPM3W93POzokmOCST/qpBjntlW6bgduXH1Hq4xX3v/I4b0V0bLM+g' +
                    'aBp9vIbjUma9WPMcUl3Hy+BgGOPLA5J6nHHpWNStot1YW4neGEQ7whkhnjlUMQSASjHBIU9fQ0lcGPpTpyjzz5mz7zg+SlRq2VtV+RSlgke4dgmVOMHI9K2tEW2FlqNvfXTW6TCIEBSxkRWLsFwCA/ChS2B8zZI7' +
                    'lFOGZVYwUElp6/5nVX4TwderOtKcrybb1XV3/lKV9PLqF287xLGCAqRKcrGgGFQewAA/U8mrv8AaaNb2yzaRZ3E9vCIRPO8hLKCduVV1HAIXkHhRRRV/wBq1v5V+P8AmY/6nYH+ef3x/wDkSObVLy4t2tiLeG2Zl' +
                    'YxW9vHErEZwTtUFsZPUnrVaiiuTEYqWIacklbsezleU0ctjKFFt82utv0SP/9kK' +
                    '" />';

var goodIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADA0lEQVR42o2TWWgTURSG/8nMnUlsNTFNTNN0IVpbu6i0GFD0xQ2xD4pCq2JBpa2CBVFwI2KqYgISX3wRtSrqq2ARBL' +
                    'F1AZG2UrTigxIJxEbSNm3aLE06yUwm42TEuDyIBwYu95zz3bPMT+EvC4x9tROG6eQ4blNOztnVSxkBPs2/FAThdk11TeD3eOrnYSw4Rmto+lJCw5+6/vEReREcQTgVU32WBQZsrnLgSMNOUScw3pwkuWqX10oFQP' +
                    'BbkGZZ9mHf+OtdF4buoKTIAC1hf+FlIC0ImFGAPes6sL3E0adU05qHqCHjkxPux5NvnBdH7sKmN0FLA1XFZnjXn1XzDz7vQSqbREZ5MxSPwOU4hK2GZs9ye/U5KjQesicY3rfpSTdZYTBjMQF0tIzKhVZ4NnhVwN' +
                    '6n3WAQVyAUolnAF5tG/7ZropbX1FKRmYj7qq/X+X5yFKU6gmJCKRXQsBbbcHKNWwV0DByDnsTBSxKSIjDBi2i2NKG7Yp+Hmkskhk4O719r4BagiLVBx+jAagj0rB4HGo+rgPODHpg4AWIui4Q4j5QQQlxIw9PUO0' +
                    'zF52KTZwZbLE2mJdjTcAt6zox/2dfEBHo/dGFqPgb3mkdhFeB622JpNJrQVn8Ti7jS/wIkhChcTX1hKplMDnlH29cayBQ04KChGOVjUVq8Grvrfszg8tBpGJlPyMn5NiRIcgaxrBkn6pUWorGo+2nontMfuaGsXS' +
                    'q8ZNTZcdTRr56PDuxAGfe54JNkGtWmI9hobPNQ09NTdpHlfTdH2wmNCVDUvwGy8lMJshWHV90X5ZSyxvzlbHTW7Z8fcT7zO5WAuAoxaCvQvurBjy286YKF9avJOUqP7cvcKNc0emxl5edUQDgcpjkt9zDIv9s1EL' +
                    'iCZCagzEEulJxPlJUGi1g7tiw9jTLNyr50Ot1aWVklFcSUh7AsuZQj6VOfZgbIl9lXSGRCqm8hZ0ONcSPqFm8WczzjFQXBVV5R+UtMv1t+JoSQToYhipwlVc6UTAUEUVDlbLWW/SHn7/7NSUl252Y9AAAAAElFTk' +
                    'SuQmCCCg==' +
                    '" />';

var mafiaHatIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhGAASANU/AKysrDg4OJSUlIuLi1tbW3Jycnx9fUtMTK0nMqKiokJCQqhqcMbGxhUVFU0gJKWlpWI0OCQjI5tGTk0PFF5JSpdmamxsbGZlZYgtNJ+fn4aGhpmZmYKCgol5ew' +
                    'cHB7Ozsra2tlFRUJiLjGpqamBgYFVWVj0mJ4+QkFtTU1NUVGBiYk1HSJqjom5vb5ZbX6+vr2dnZzYHC7hLVDEwMXh1daipqWxeX28XHkdHR5h/gbYgLL+/v6Gnp5KYmJycnAAAACH5BAEAAD8ALAAAAAAYABIAAA' +
                    'b/wJ9w+PMYj0gjcSk0BjSPR+2x4ZQiDSWz2CgwHhyaRuADgD6jiGf7a4QYvgKB0OIIEi+AQNHYehoDH3IlKhoJDwIGJCVXWUR/DRkgBmIbCYkXITglIzAKWFwNBAkMDC8PlwYtJJoKIQQHKhcBHhERAiAAOyAvCS' +
                    'cGFiQErQopBzgHIQ0RPr2SLzUZA6oXJAcKAQErJZowEQUAGWR5Dz6/BTAEOAEzMw4owy0zAuInIlIJG9MFFyXrMyYmhChxwEAAAQJO9HCxgAeLHtNaqCihAOAEE/5IaMDBgcMAARV0yFiQowMNGxQgTJgQw0SIYh' +
                    'kIBLCgysAAFwh0IECA4cbKVYs4UgQgUcPCnxEcWhCAYaCDCwkYMECAQAEeDgUaABBY0+bCAA2ZShBQoUIYQQUFAZyYscTDDAsINaCDcQFGAQ0ZXmhQwHVLgwCcWhQYPKJEgD5MggAAOwo=' +
                    '" />';

var plussignIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQALMPAO3r6wxTAGmvZqjQppHFj4O8gANoAACCAJ3JmkqiRzCXLQB3ABGOEl6pWv38/P///yH5BAEAAA8ALAAAAAAQABAAAART8MlJqwUuO2CpG0ghON30hQ1ZPmeRqB' +
                    'SmDYTwahxbEDxRNIyDcKFyCI7HBGPBNBiKiigjuHAaAoGi8NDEerMSWcaJ1Wwsjmt5xfrCOg43W3xmsyMAOwo=' +
                    '" />';

var cashIcon =    '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAKU/AHS3k3W0OxIbEtW8BTN7S9XquYnDlVKSNFObXEpzVmelcPXkAXCNXpzUpWyoRPbbAChtEcfFJqm9c7jaimOXe5iiGWyqiVaHboe3Y4i9k0h4YGWTaK3Wd0V5Ey' +
                    'dCJZzKbDxkIluPc+Lxz6nUb2JbD+zMA5XCXJG9cj+MW3rAmnCxhVB/Zk+bckBTSN7bAsrDBMa/E9XDD1NcLkt2J6u5PMrlqGOOaIS7V6TObKjIf22NC4K6TmOHKJ6rQfLPAP///yH5BAEAAD8ALAAAAAAQABAAAA' +
                    'aMwJ9wSCwaj8hkUXBgMARKUKAm+mB4HZnxEJiIODkJBLKggTxDAgKzM/U6EFdE8rmdZp7VikCoDHQvc14FIwcEIYgrMAsPFQ44BQUcDgo2CRQUFzAPCwkoCA4mAQgNCT8CHhoxPg8bFhYsCAoNBlBDJAMlCgC8AA' +
                    'YZaEYCLRQAKSkZG0qnCQAqtsvRSUEAOw==" />';

var cashCubaIcon = '<img src="data:image/gif;base64,R0lGODlhEAALANU/AMa6tcCbk7lpirKkmxRvU+Tc1ChYKlclM8zDuiu1J+LSzFmYYxX1AHQzUnBsbB0XF9PGu8Jcje3i3t/X0NrMxLt1puvh2Av1AfHP4eq508psmPPm49qKtdZ3qY1ebu3j2bQ7cBjVBWaHZ9RvpbNce7tTf9e/uuDOygLeCMm2q9C0rguNMDCLOlFKSmpTVJiYmKtids5soJtFXcaAoOWoyFWYV4x5egTKBRzsA9LCwdLKxtjGwpI0TuTV0ahEaAAAACH5BAEAAD8ALAAAAAAQAAsAAAaFwN/vwfN4HsKk8ncA0TAaQYNgWP5kIA6mM3sRCJfF4ZBMqWYlweKLqlU06YYLMaEMWKHVTVTRZkYwFBATEwgJFwwOPjEZGR0CPRMABQWGDBcAEAEkEREnGzo/DgAACQwMOZQTJgobEi1KBiE4Oxa2FhISNlZDAwUWHx8SALxKDggWCkg/QQA7" width="16" height="11"/>'

var cashMoscowIcon = '<img src="data:image/gif;base64,R0lGODlhEAAQANU6ACkFBt4aIvFCSdoaIaITGV8LDvNhZq8VG/mtsPbbAChtEekbI8AXHfFITvvIyu8oL/JRV7kWHNwaIfXkAca/E/AwOOcbI8fFJvA4P5iiGfJNU/A0O/NZX/aBhX0PE/V2e9W8Be8tNPFGTL0WHcrDBPLPAPNbYeAaIt7bAoMPFIgQFeQbIveanUV5E/JYXmJbD7MVG+zMA22NC9XDD+8kLM0YH4EPE5IRFvA5QJ6rQQAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAQABAAAAaMQJ1wSCwaj8hkERAZDABKT4Dl0GwIKZsxEvg4DKaGQjFZeQpDQmBDw+RaCtSloQmJbgUGg0DIgGQkc14ILhEETgMMFBMJGRIQCAgGEg8nBwsLNRQJEwcjARIYAQEdBzoABTAzJQkWFRUDAQ8dBlBDLyAxDwK8AgYcaEYAKgsCEBAcFkqnBwI4tsvRSUEAOw==" width="16" height="11"/>'

var healthIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQAMQfAKkAE4oAELYAFawAFJEAEYYAD////7UAFZcAEZIAEaAAEp0AEo4AELIAFbAAFJsAErkAFZoAEpQAEbEAFJgAEq4AFKsAFIwAEKQAE7gAFaYAE6MAE7sAFbsAFr' +
                    'wAFgAAACH5BAEAAB8ALAAAAAAQABAAAAVm4CeOZGkaaGqShsdlgrGOBiQcjTx/Bu4MOlbKMKlYAEOdoZM5/ACajWJBVUIOkwEAM41QEAiloFHZKh4ISYJAUDotmjMiwbgEAsrhYs5IniISDHg7PBQJFwVBKwYIBA' +
                    'GJhEmKhCshADsK' +
                    '" />';

var foundIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADC0lEQVR42o2SbUhTYRSAz3vvdjc3l7p0OXXmQsnhRzBLi/IrI1KhlFBJg0ApRCItK8u0EjQViuhHQT9TIpH8kaFUwq' +
                    'IgI1MpDcNMxT40m86Vus9739vRZmi/fOHhwOE9z3k/DoF1rvPpGQnaqYmGX6y09Grfu4GVPFlPcUnFFTlxOY+oZqefka9jIeLCfKq30zFVNTB0b43gQsOtTRh0iByRICylNNDlsPtJZTIXIcwX+6x5gFgt+d6fh0' +
                    'zXXrzsJ57CIs9pzMg0MrOUF0URqCBE2G2LAQqltxkIkbmdziRWwvZcrz7X8u8KKEjEkOUpnET4pe6iSP0FQYhlGNZMCBF4t2uSd7uH5V6KucbK0z2rBTkYNiNBSAfixu4W7K5zOuzpcoWyEwUah90Ww8nkHxiGGW' +
                    'm8WNa9WpCKIRbZhXQiFAWz2NGIm92cTDaLOQPD0mGFUvmaERl5RXFh72pBtkegRVqxWEmpsID3Peqr9u2NMujzxpmpuHnRxvlJVN+2KnQteMGazB1prhVBHobtSAjyBAVSkVJOLufCohK3pDUOPzBSQkHCMsALFF' +
                    'SsAs5E5pgUhDuwImAwFHskUyigLMsI2+Mi9zXONO3eiJ/qKwWQ4q54bSLsCd4LJaZ6qIsuPPf/HOzHEIpIOU6i1e9Rlff87lCoZRtBpA5Qe/nDSWMNNH9sg7c/2iHRP/v9sqD8St0m/C4dy3kxWLks0wT4SIMTbM' +
                    '+tLpM013AXusbvgzEwGRZ5DpoHK0Hvw4NacnBmWXCs6HiFxfwz7nH7o9zVJ+oaefipf7o2IlpzGA6EVy59DdR1F+B49uF7qMAYUPV3EnfG7wgODAvPDNKFtd65UW8tq67lQjfr1DvjI2teLVw94XCPwLbAfBCYaB' +
                    'j8XokDCeDFxUBGyOWyNW9QWnEpS0bEm59GRy/qDbHdyUlxC4ZoTZvpa22K2TYIPGVBQgTQeBshOehsJ+G5Q2sEaSlJvvbFxTdW69ypoZGxp0u57+ZxjmGh1OKaKJh3moNVnObLBom2iXfT2/qgSP4PU3k9tCVxAe' +
                    '4AAAAASUVORK5CYIIK' +
                    '" />';

var warningIcon = '<img src="' +
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgUlEQVR42pWST0gUURzHv29n/7S7rpuhlroW/kFdobQ8qBgdxItWB6NDkVAdukREWdShEr3YHyiicwQlJRJJEP2hOo' +
                    'Vmapq1qbEuaWq7Cu6s6+7OjLuz7zU7I1aYZXP5vWHm++Hzvu8R/OURJ15YGZWZJXePsNo/ZLUPYc9jS0ykQ0yWKKen2+1bG8T/AoS+tLf4J4UmeVFEaqaueX3Z8ZY1AxZGbm+e9y2OJttDFqoAeB+N2NMNRWm7mq' +
                    'bXBOAHb7YHJkMHHPnzYDEJYwNMsdA/yKi7deifgOCnqzu9I+E3jnyeuH0S5KiEApsE9wBYdpGlKrO+rWdVwMLHZl2El/pEPliWlRfAjYdALCbiTG0QnveA2Wbqs9qNFVkHn7A/Avjes0fH+4N3nBVz0FEB1zoAWQ' +
                    'GcqwtCDkvoeUZQXLnh8JZjb++tAPi7T9v8EwG3ycRvSncEwaR5NN8NKR2EcGmvABbX4duoEYJg86bnpBXmnugP/waYfXnkytd+//mSqilQYQosGsHlTgPMBuBkjWIcJ6CyDl3PzXCWp7XmN7ouLANmnzbkTrrmhr' +
                    'McnnW2pO8AUwKUoMtDYOKAsgxOMSCqBT/DYdxtlnJKHMV5p96Nq4CJttrO6aGx+m2VXk0nUREjGJll6rooRa8aJABMJhjoNsJRkPrIefHzfuLt2F3teuV5XVrpJWYrU7NY6rixnVPn9X3QwgokARLDBIO9RuYsz6' +
                    '4mrtaSD8Kct7Rwx6KyHy3JmFZNnFDVRBfVa2GasNBg7mEOJmvyIBlqyuOn3ZGUFVeK/TqJOjU7srRFICPTwBPf/ZokvSV5I8D9PJPlMFH7VN/p0poSDRKniIYCMz8A9QcpP1oZxJMAAAAASUVORK5CYIIK' +
                    '" />';

var chickenIcon = '<img src="' +
                    'data:image/gif;base64,R0lGODdhEAAQAMYAAAQCBKSKBHQCBEQ2FNTKDEwCBDQyTCQaBIyKvHxiDMzOzExOTBwaNCQCBFw+BPTmBHx6fPS+BDQmBExKfLy+BCQmJKSm3Hx+BAwOHMyaBKQCBExKHDwmDDQyZB' +
                    'waHPTy9FxaXPz+BKSWBDQyPPzKBGQCBJyavIRuDExOZCQmNCQWFGROBPzyBMQCBDw+ZBweHAwKDLSKBEwyBFQCBHxmBNze3FRSVDQCBGQ+DPzmBHx+fFxajLy+vJxyBBQSFLQCBBwaJPz+/PzWBJyazCwqRDw+dA' +
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAHi4AAgoMAL4SHiDclM4iNGi0FjYcwLT+SkyUCMJeDJhUNE4Obgh6EFiguRRg6hoQeNUEQPgg7qz' +
                    'wKhzpBuhUGGx48t4QwNrsfCyI5AwoKpYQ+IDogEiE5MT6XEgEPIUIRGT0Ho4QEFxQsJD0OOByNEisJJwkyHtiIIxYmLhISHkQdHeyJYkCwYMFBgQAAOw==" />';

var hideIcon =    '<img src="' +
                    'data:image/gif;base64,R0lGODlhEAAQANU/AP////8zM/f39+3t7YCAgOXl5fX19fT09BkZGdPT0xUVFbS0tMvLy4eHh/9LS/v7++Hh4aAVEtvb2/j4+M9NTKQWFMcuLDw8PMMcGkpKSrq6uqQVFKkXFawYFs' +
                    'YcGqAUEqcmI5GRkf7+/qenp6+vr/Pz87u7uwMDA/9ra/5ycmNjY2lpaf5HR8gdGs3Nzf+Hh8AbGtLS0vr6+psUEdjY2NnZ2dJOTP/b26MWE+fn56cWFL0bGKsXFa4YFp0UEgAAACH5BAEAAD8ALAAAAAAQABAAAA' +
                    'aYwJ9wSCwaA8ikkRhoeTyYwFKoQNkoFpiUqFCNCoJwgbCTIhDCDOAhAAAMgwQhREgwSD+FyO2G1wYCEwYQDEIPfAIDEoAAMm8JQhp8BTk0A3wAAgVCDm4CBAQml3wHmz8BNwApAT08BAUHsS4EQw0ADQEdOjgRLG' +
                    'dFFwAxATwVID5bRSclAA4cGx8zyUULAC9JSFMrAAtTQkEAOw==" />';

var blackBgImage =    '<img src="' +
                    'data:image/gif;base64,R0lGODlhZACQANUAADMtIiciGgwLCTQtIh4aFgkIBxAPDFNIMwYGBRkWEkM6Kl5SPEI5KmJUPVBFMjQuIlBGMiYgGSciGQEBAWFSPB0ZFRgVEVJGM0U6KjYvIwABACYhGSgjGkM7LFJFMx4aFQICAgAAADYtIiUgGRgWEUU7LBoXEg0LCRgVEgEBAAIBARURDgMCAgICAQQDAwABAQQEAxUSDhQSDh0aFhMRDgMDAx0aFRUSDxUTDxUTDh4ZFUA4KhYUDx0ZFh4ZFlJGNCH5BAAAAAAALAAAAABkAJAAAAb/wERngDAEFIITZVDgMAYElGlhMC4CBclhE9twDiDDYJZaNTgFFANQDDAEAgogq4AmSFTDhtJtXrgcEg5hABUaMlcFCRhEBhwKJwILTCMKADMWZwg2TzIVBD8nBg4MBQQXAxsfjwRFHRUuMhQmBgQAGwhNECwFCxwIBE84NgQQAgYQpRUQAxwzTgQnRQwELjENCbXNuRyDBQ24NgoPMcQQog4dph5EtgcIJg4DKwQcD45TcBQOegAMDwgSOHNR4IKIApw20IhRgY0OABAQWDgwwFOEAY4SLNDHj0MGf0RIcLBB0MOcDwwCxLhhC9gDBwEPiLhhg4MIIxYWnEgwYB4J/xIXCghQgOEEgTr3RhkoYAFCAgQbSnwoUIuBCwQKrBZgkGHngAwxLEwUuqPojH8AqvArQGPfUyczqH5QcBUD3QKWdgIYgINEgqBD38ywBMDFBYAJAASgR+ABCQEEDhgwsePBhwoDAKBAIMPGABUGPNg4EYPDHAM4ILhwQRHeAw6ebCUQUIGfhRIiCBAIEACCDAQcUk0wcICAgBwSmBiIcWA1BIAmAHCgh9kCbduPiszwQMDAHwEBAADAcSMBg0gDJCM4Eu3EEQFbAcAwUGLDDT0KitiAYIN4gBOmARADDRYwsBQAC2RQQAwLYEBVARs8AN8TLhigABcGSJBfLRB05/+ABAKY9sANKxFgingoSGCBOhk+AKElCdBAAgAkyCCABDgUIAMGMuCgm4QGzDDABAh0ENcHGQxgQgAFUhUAExJwRcsHGCRlywQ0YABBDDHMQMAAonypAlZxeTYACUwqQJVpBWDWQC4iMBEDAxXIQAMBEgQZAz83/GOBLQLQYMA9aAjAwAwwWJABiFSxUYB4C2JQZzkc1ELDBVUAUAcCQ6EhwwZpFXDDATq4YEIq8BngKKQ0KFABDTLMEIABFZhQHA0NCRBDDhsYIEBmOGwQwAYoyJCYEWkZkEMAj9RiwQAE6VaDGBzoCqgMn/o6ADm8BUCCtjtQJYNVIKQEjGIBwND/ZqlibCCADF++K8OsJ/R0A2/RaBqXBQ8QoAMBMgwQQ4Zd3cABBxWMQkIRD8hglAAA2CiDCa0Y4BlBCkxlgmW6xVARsrqCykQO1BhgVGEC4KBAAjomUPEMhRVQQgUFzFhBBTPEMGKGc9CQkgv1igAeAMY9k2cPvwK4WwGKVPNrAjoYgACNEg2AwjEJpFsvmOHZIIANXtRiaDVGbdACAg+YgIBIH1QBsQUBZWCBKAlsALR47hVyQgUc9GqfcRYkkKcEqzD95IkzkHBCUQL41Urj0JoiUC4E0EDQeCeIlWcAFUjA9AYK2mLDBxVuYJxQuACHC3j1UB4DQXw1jkKlG8j6/zkTR1XhAtHzVZBNFRGYTENSJJjA9ANwdxFDASessIFQJviFgCgjgOBCvxXO8LsjJnu8FAkEqJ1hBcfkEIFQJ8xgcgKBT++I9VBUSMD2s+o6wLuQIQD06hvMVkUCfcIaCmZHORm0AEK+EoAL5jcBAdgHDgKYAQJqAB5OceAxVTBBwDAjvrpdZTFFAJgFCjABApBgAifgAgQ/oD/3WDABopiMDBRgAamtIAcDWwqIjlExEyGABxKwUQwSEINcQKYFppJBEWGwtwkkSmq7us9SOHACUUiwFjEqwAo4sDysgQAYU+mPAeAGNAJMwAXZQEAMlFiFJkSCVkXwgQFWY4AbRP9rKQaQgcmWokcDQM16DPzaUnKxMBfoCg5Ms1yFcnBHqggqCcDR3xgNoK4ZSKMKy7NRAARAwRsgUkd0jIG6+kOVgcEBKpw5ZQEQwEI0Ls8ANMgFEXNEFRwggIkJmAAIaHCCVYJAKASZzYJUiQAJ1oAEOapC85hnHCMmAAQgsIEMQPDGGLTglwosgAngw0tprLIC+iMiVXxFy1/6SigIuMEXRTGfPSIAGAo8BtPeaQAQTIAqq6GKBrBUgAOeUwCcOZsogDYwHclyKUyj5C9/k9B8GiAF/DQnfACqTvdRUFC6rAILirBKI2ogDAa4p69et1EFqnGV8CEhR2FgvZCC9Iv/gzQiQdZWoWwmgAUVOgFBeumCGqxApUtxQUszaoCNxhSYq0zAVYqwVAXCIAlXAeZ83sk0nRJEABCVmgsmcDYSVqgAS53jO08AA0MClGmrROo8i8BSoRBpelzNhQq+CgN6NnU1kcjFPA2JgHV2FGhClVpJ9ceCpYwJPixloj3fiYAzcmoCLJDGF+HzTqCVlXlLTagk0bmarSpwNe+cK1xbAJ8QGFKnTPusUGqgLhL+EqzMQ0BXSejEvnJKALp85xl52oIGbpVTLI0qV5l2Vdnq9Sr21OkZP0vVFmwUBhNAIXQ55QKc5iIE2MQpVXYLVv0J4IuVpepi+4rcLxYgBCFg/6xjcbvRXOTWBRogrQvOFt5cLFalANXfGeuqgsg2Vl2yFe4Xa6CByG6Vmsb9K1w5pT8NAFQDV3FBWa8yJvjOlAXRJWEKcuHcj4IVBHWFQX+vogENSMO0EyyrumCA0++yYK4fvuwLHBuCA1b3KtBtQV0/6t7aWg+xEv6uUBGgAl26dpXWhehqUvBLoVoPASywp2NL/E4ezxeajYXskckr4bLuU39M1p/1VqPLHWvgndglbF9rAFpo1gAB+yzAhOHjgrl2tq0sQOKN62w9Eobgwy0I81ZZUNboflED6d3qamBQ1l/mua6O7Wx8qxtd/apr0GSGLAJCQCQQ2JjHLNU0hv8jnAIIb5VIQl3NYkEw17oS+ZfXnIAKQFADTvdVl06GrAtSkIJCoxqnq4nyPbfKY3tOOLpL7jSuoVnpIe+zrCHY6J5/OYEaeFqXRJqAaYNbg+gmFpokfqs9Pb3rfdpzo+Bmdm8bq4FGq3qrEM3zPoV6xp7q0novMDeucSplcNf4KiGoMK3nCoJ5Yzi6tTatC2zdAuyWtchnDAFEoWtoEKAXxIhmqQZUwOLonrHUXu4vEqWs44zD14keBwELQvDRk9sTwiBIwchlbT0VKLngXF34GVmtglgjm+XQnLfF99kCm4cABg2/d8rNffL5RveanK72BHh9xgkQHQYzji6ihQr/UZVHNwVO1jk0OU1pj7vc4sgutaf1HXWLFxm+EA40oiH7AuwW/KMs6Draz1jisUNW5SU++D67bW4VSByyFx+6PXtLc6gjG9GevqbMtc1Vq9McvdiGsOGx3Xb0Rlvb5i4xhIFu9cnvE7JzXziTWf303s7d8B+dQL45n4JayxzyDZ8r4wff9lJzvrcBn7Xse076vlM+9B8tOJNVMPeYc/rlrvf44Yfegtx33ermTkGNA/2ClyPa5rqcPnpZgGGW75PTjNf23nsLUYhrXeKuD3rUsa/1zEM2usy3eMApL/+vI/qj2ldgc6d1p4doKxd7RKd1EGV1EIdo16QBy/cCKVBk//uUAit3b883dSxndRk4f+ZnT9HWcN1Hf5SnSxowYy1weipAgdqnbTXGfB7HazWmdhBogtgmfcQWfr4ncVEGUebGaSxQg3dHgNG1clGnbyU2a/+ndX4XdLFXdzZ4cSVocQtYauUXehA3fpbncbGHftIXcxsXc7oEcVJWYgR4dwXYdSyHYft0cOoHdM6HXZAHe2ZoeSnoe/R3gPY0gVL2hl1nhioggUEnfEWIcx9XgPcHUZyGaExmeS9Wh2oHAjP2crMmht4XhRs3dcsnhQHHagMIdAcHfH+3T+22f1NnaGaYd7p0cHe3giy3eTAYXRsoe7HncVvYcKGHirG3gFx4cf+8RoH7BHsvh3+nN3Sod4PYdYqyaGilNmt/iG285oNWN4IbR4EsF2g1toVbGIRPuH2nF4O7GHW8yHJymI2ZGIv6x1VmKIkXB3kl6G3DaIvSN4FTF45sCHkQ+FFzmIQuqIQQiHM1KHcgWIsFBnoFxmk15oDaiHLaVmQQZ4GOeH3yaIYl1ojoVWRUx40gKI+NCI5fN5H9RYJ12Hb/KHsTKWVKeH+2WGLRZ4vYVWrO5XHAKIubiH+UB3uy5o6Fh4SnFwIvkILvt4eZ536YB4U2F18l2IBiSID6aHfu15BumHSch4qWR3rzJ3qKp3x7KGUsN3kFl28LV2P6R4rJyGlFhl7/+ph8E2l59kSBrciW2LeLB6l2ryiLmah9w4iSH3V43FhkdTeQeWeBzNd1K8h8+yeIdsiF3LiMbLh6agd69YeADyhrsgiFxUeZAXh3D5iM3zeREreUnwiNouh/cvh38FePOWl1KYh8CJl888d/zVdqnImKVSiXOliByfeNeKmJE8lr+pd3ZomYG1hwG3iCa2eLjahvKYd5xviUOAl7jUmEd8eGN1iENVh6upQCI0iPU3eJgOh7dzeMB5d/60h12Od31Ol3TVl930h/aBl9A0mAUZaAz+d28cmA2qaGBcZ81Ml+Cwh5aCeUQadtbjiFZpiChKiFePl/8XiUOTmbFFhk/4spd0HpnpnXk+9nl/aUdcpojG73YlYHgsmJip1odVsFhJanhGsImSyQb6YlhcZXjC14dy8ab1H3lynqe8AJdn3XdzjndJu3cEU2hC+3kfeHfj7piV1oh5+pfGzYiS3IhhvZXwaYh/T4fymYkKv3mRyIkOH3g2qJlqfYlhJ6eKtJmQ3Ig5E4gBxIgOnXh3t5hGZ5jbJomCKajLJ4hEx2mekXjLwIeRqJnfV4kDV2geWHeWhZftLXo92nmW2qjbJ5gbL3hwg4jA/5kuVog22piIRnghRpgTgXb6H3jHZpaLNYkuu4hCy5d5roet/4kBsHeS0YiB81mLrEoTBKmQRqeP89F4NUqI5j6IWQyWu7uIASR3wIWHmuSH3YqXjumazMd3rgaXyGppjruIV9F4SVZ25B+HZ4WK3nJ3uX+XL714YBOqZoh2EteIrNWI8DmZeo6YKAt633toDw9ZCm2olEF4oDaIZHOI92+YhcaKqhd4QFua55+pIYqnXU2IBlaqPIKJTL6Knhd6sq2YJkSZ12GV+7qYLFCIkwyaYauIdzuqhMZnwv4JDBSJye2pRpqageF2oFWJilin0Hx5n4CHTFV4CfR46nmHVDV36N+JieN3Qcm4y8WHVJSZkbKYbpx4Xn547rWoN5d7Ac2ZY5SamNGYY4SYLTF6M2mX9j2obxepn/LtlwoDqRPQmRr5mEA6h96bmQNfiadjqmDRmDixh1VqmrU6eKUEuczCaTYehxUgmCZUqRSGmKRXuN3KiIiWt5bzt5NWZ+oGepLpiW16ar0ginX7mMIipz0Wq0bymSZXmD/FmMdal+2NeAOauy5TqifWqM/Pd1D9iF4hiiawiUWXh4gaeNWBmigAuZtmh4QNeeqHp9wRiUn7lyk+d7MHh72Td3cPiaEJWl2amFH1uACIh+pDiyhjiyRgewzhpz7feZxBt+h2d15MeLhteHBfqr6WiTNauz6XugQAh+fSiH2jtrXHqtnVmRGEmp8Kp1ixmYZ4hz6jprK5d/2ld9SVuD/4g2m/cZeEA5jOwpfHUYrrLIeuqbciLpmvY3r6V5ljSnfc6okqgqgFx6lTzbh3WKekRXvzhLme/pgBgpp5YbdQeIeCpJeYxncxaHgje5gtFVd5g7hPOLlMqJu2a5rqTne7v5gYv6ftwYfeknjg0ocy1aq3g4Y3v5k+cawZcbj6AXbfk2n5VXgt/4gXrqqSDoiVCbkJiqqe4HYY4oeqBHfl56gUN4puJKsAq4hxvHjRXYqFeZnO1JkxyIxDCZnyaYhdD6dS+WgUy4gYxXdJR8eNp3sk6snwPcncWntTiZge03dRjZhuPKhR4KsuTHdvd2enD3kcMYcOj1AorqfSyYZ/9eCIQFh8H7t4h3ibOUyGqY573Vi6779AL3+pEmCITm1m94uIG3m6GL7LtPx5xvy5mviZbke5ZpSManF4SieoO7OLDNTHzAurXH94RE3JWu15Ip+r2gh43Iqc0Ti33663oqm6/qGG91V45kTHDK+KrCm8L3mKlBiF22OrIGCbnVW3iqeZ4GiYvxpZDteWp0W5CTKJFEDJlFG6GOHJ4LWa1Q68b+J3yziIdUa7aUWZBEp29/mqxnC4fyaJKlx4Z17LgrKLXQ6JKK+JQ6yXlP6cXGuqSau5T1iF1J6sIM2Id7Z6RgGLXA187tuHr5OLvSOI9KLcdRO6WXu5rVV9M+jJn/SJyBogd8e6l2CHuqyYphK8hkEuip1jjBiEzExLvTyQqni2mSguyET1p/bgyUXDh7u2mT5Ei+m/nX8njYK6mG2GakGqi/0MRrLRmL1qt8nPaXrMp/URqp2wiy5Ip4FGl3uom0iHiPbum8xod5O2yzgi1rpgdZWVjAG9jRRCiMS0h/SffJcvifsraaL2ess/mLhjeJMRqSS5d9fxvGCtx78fXa9MeI+nyP8olzonic95myecqxsbeR/hmDelydIozUQIvNKvnE5Wi1A+uWKVqCW0yxdVuHIXp8ZdiTs1l//NuGg1t6HVasX0eXGBisx/p/L5Z1sBdteEmFrqe3i5qN/9LZd0C8kAvalDZYdFXZqVFduWj3g84YhhmMuv9Z1/HZd1I5qffZ2JV7qrYMmWJ4lhBKwJvXW2cJhlyVssScxtIKdMSqgMjqhvkriQV5rLg44jIt32FIp8qZf9gcjIGHc3lpiDCQwWPYvRK3pOR6yk3oiB/6wsBcofNdop9YYNbNlly5zB3afPuqi7ImzYBNutFHgU+H5vZ9iTTMpf/ppxD5jZm4wwjM3uMooc2YdBVceqRodJT4frdnjvL7pUw5ugx9gmsOtfpof4BthBc6ls5342YXj+1pePTIa+pKjTTYdx07Y9GK1gFHisiH1t43ye3ogL5Z0xTX6VYukS55fv/FZ7AmyLbD28O8CYYbareQiOeeKrA2mdfxJqhJunm6mpBirrY0qekK2I+GGbevyruw3dLw2rbUrIWvGaIxzWSRKL8oSpVCnZ1m6JvMzoFNGXQ72NOxWs7LGde56uInq5YrCZdMOJIXioDdl4/izLoV+nxK2XngCILa3bGp+7/298N7eXqTyN/T6YIf+bK6+34IWbrbjdjOd6gyufHjKIU+aLhpOp3MK8gYqZrr6KIazu1N69kLyMim3bKLjNS7iYePaZJDOrV5XrDdG940HLeyuJoqWtPrHnhiSn/OusTRBulKb3xUB9xfSo+WrLr7De7ObLAD+uSLCLi9XNL/LKD/tFjdEY9+CCy8E0jd+JysrlrdyFuv7avntMlVmZx5+uvSJe2u2rh/yqeOTD7DHKiuvovD7S2jP5jG70jAsFmdxIjr2rzTyS7TvmqTVKeVmlh49ZuJQti/H4/3QCl4bnq3qgyBeeaZ0a6MinyR8U3pNMnsfy/25/jHI2nUtqit1qjUaglxvNqHSTdrzH6APrikLp7PaCjR4RrNSkycqg6zcVmkTN29nHudHbja+gjq6bu6Ek3JuHvkV4rIXKjWZimSsGuLv9qQ3ld9+cZqJmx5JzuKMul5wriFno607GmR317GS8mCghysmAkEmhAolWKBNBqQKqSZqF4TZXLCSjqb/yDihDsJTVqaKLEI6lY1KW5KKf2CQuwJW+tcD+d2qTrcbkmfpMyaquK+UkKOUlQCNVjmJpa4hgjhvhjPXuyyCLmo+szUzCaR7NIi48yEIt0Ym5xUitBSVFk9a1lk11rgqgBZWEJU2pTCAqWckvCcBu3oRv+46liLGF+YJh0BaSH/qLyUth7Vjr4S1TyfrJxahEdT3YiyID1hEUMDv1jZ457ukbuEaNKnBSNEnrjp0Vcq0piAYLgwYTjozB0jSY58y/OEWZdRggRyFAYu2qFlXj6GjDdvUbRveoTworOnnhFELYJBFDhypj5wU8Kxm/BCn88mIdohRKNNybAuQobco/8CwiEgDS4AlVKTqteXXJHkMJyjRgVVfWlqld0Jblq9UHqeqkEUjKzAQaIWTTICCNMQbNG8rAMjyostQoguyimMqg3hNXC0oQMFMMSLP5d8ymmnwZstQatYaEqn5U3hjFxgrMoKyFwSiuM0uApXOjbpKsPO4mYkpNkgFSxiOUsEzcvvLSFcxDbIJcwbdqOQXEqDDVA2TyfTQWRGBbcquDtDuYo4T09eyGhuz/k4Sd2nL2F+K/0iRpWK3WX+wXwiVgjnJIwMImaTgHhzrTqnGGMljmAEoquWLlx4xJmK2NiNmGV4Y2OvZaJwQ0IxABFtM4reesuRo1qYCS6sFouImzf/HMMEoGSauc+XveBS74xTSpGwwrfqES8SA3N8YYntqNmEsxYnSUqLilRbkDrrBMIksrKqW0MNU56wCxN8+nLioLEoOgMpWMAZIg0WCjpjkY+SUlCaU5C5LJ8Cg6JiIKt2RKkyyDahSLYpIlmvC8fUU6y0+S47UZQmwtwNj9I4Og+y+1TpsAwprrFvjwDHgahSSH8ZJgVeiDxrjjBoQcJTZISxq0WBCG2huQ8rgnWL7Ix55ME8aMGolz9S6DAZVof8z7VeDgXjlFyI5AJaLVURJhhTErEikPwmrNagackEBxU5FtyVlNW6jA4Vn7pgYhMjjsoOsvrW448dNiS8REXd/9ytIj9fbpmKTvV6qWUaWm4y5qlk9oztEZXQKnioKoxpJh1X2AAlIe2Es83gYGJBoosOGWonPpI8XGWJzGAx0Mw52eFuLjdEenimjeI5cCFCHsFyDqTWUQWdK0rBaVFZaH14YTWHgIxYVdfQhFke0UKJrz2YRgKvsnaDAity4tjy1K7Qm0g11awYmptqosNCCZA5SigvGQlpQrBh2ghJW1cSYdIvSgP7hB2nShITozTQ6WczCQFGiUg+5iHEwLOEY6yzRx7jWbQ9FImPGWaT47K++eChbaRlO/r8vU8L++9cjAq7qx5U5dRiKxgWWW5I58CADk2NsoR4SYWYU/nsvv9VqkcJssRlgpYpY5ulEFYkmrV4Zt5jxtR0YH+Cb2eXZB4WIqJnYwp2iYTlksKCHb7ZhmJ27Yqgs5wgQr6iD+h0baxWJjpaZPUNojRDTKOZ3KnqhDegRIUYZ4ABe3ZEIkQFZEsB3F+ylOamj2zvK8C5gi8qUw8RwgFHFekbkoCEN2/IyAuLw1xEvlEExlHQC5jpmzTmQLetZCeACpLRQRSVNyiNwkJMY5MJG8esMq0DCwj0if8GUgq3EYs14TtDOwhBlAz+BAlGAkw6HLKbB6Vuco5SwvrEhQwSwfBaYMGWjyRFwEMppDPRGMZ5pIClNKAqIfrYUilA0IIoWCkkC7q4Wn/IgKpJsaseURmPXYrQk23hKSMIVIxkQEMzuzBrEmU5iDzcNyR0CIJmgPKQIOc4CoV4xyMhicWLnGCFkAhrJK/zWeCcg0YYRg8tldEHyTKWFSuRjyPbIQbk2tCLxIlCCKF64RQm6JqkMA4Yf4yJwjwRhZ10xmJ7sN0+IpEiLHWiNmk8ysYKQifeiMxgcGCCFViYrCHZIj9Ma6A1WtYUNAlDBZtx1lOWQRbe8ElS2fgVOgQjsmgEAQA7' +
                    '" />';

var bgTabImage =    '<img src="' +
                    'data:image/png;base64,' +
                    '/9j/4AAQSkZJRgABAQEAYABgAAD/4QA2RXhpZgAASUkqAAgAAAACAAEDBQABAAAAJgAAAAMDAQABAAAAAAAAAAAAAACghgEAj7EAAP/bAEMACAYGBwYFCAcHBwkJCAoM' +
                    'FA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy' +
                    'MjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAfQCWAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0B' +
                    'AgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImK' +
                    'kpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJ' +
                    'Cgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZ' +
                    'WmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEA' +
                    'AhEDEQA/APn+iiigAooooAKKKKACiiigAooopgFFFFABRRRSAKKKKYBRRRSABSmkpapbWAQUtFFOwhKKWkpNWGFFFFIAooopAFFFFMBaSiloASilxQBVKLYBSU40lDVt' +
                    'ADFFFFOwhKKDRUWGFFFFABRRRQAUUUUAFFFLTSuAYooopgJRS0lSAUUUuKaVwEopaM07JbgJRiijNToAuKSjNLkelUkmAlFKRSUmmgCiiikAUUUUgCiiigAooooAKKKK' +
                    'ACiiigAooooAKKKKACiiimAUUUUAFFFFIAooooAKKKKACiiigAooooAKKKKYBS0maWmgCiiiqEFFFFDASilxmkxipaYwoooqQCiilxVJNgJS0YxRT5bCFBozSUnWq9o9' +
                    'gsFLRilxUpNsBKM0UlJsYUUUUgCilxRiq5WAlLilFIafLpcQYoxRRStcYlFLSUtgDNLSUUrgLxRSUU+bS1gFzSZNFFK7AKKKKQBRS0hp2AKKKKQCg0vBptFWpdGICKKX' +
                    'rRihx6oYlFLRU2ASilxSYoswCiiikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRTAKKKKACiiikAUUUUAFFFFAC0lFFMAooopAFFFFABRRRRcApaSimgFzRn1pKKfMwF4o+' +
                    'lJS4p3v0AM0ZpKKVwFpQKbS5NVGSW4h3A9zSU2jNN1L9AsOFIaTNFS5K1hi4pKKKnQBRRSUtNAFFFJTTAWlpKM00xBRRmkpPyGGc0UtFK1wEopaSk1YAooopAFFFFMBa' +
                    'SlpKYBRRRSAKKKKLAFFFFAC0UgpapMAoxRmiq0EFFFFIApKWik7MBKKWkqWhhRRRSAKKKKACiiigAooooAKKKKYBRRRQAUUUUWAKKKKACiiigAopaKdgEopaSlYAoooo' +
                    'AKKKKLAFFLSUAFAoooQC0UUVa1EFJTuKSk0gEopcUYqeVsYlFFFIAooooAKKKKYBSigClxVKL3EJSUtJSYwooopAFFFFAC0ZpKKfMAZoooo3AKKKMUrAFFL0pKbVgAUU' +
                    'UtACUUtJSsAUZoopAFFFFMApaSii4BRRRRcBaKSincApaSloATNFLRQAlFFFSAUUUUAFFFFABRRRTAKKKKQBRRRTAWikoouAUUZooAXFLSCjNWrJaiA0lFFS3cYUUUUg' +
                    'ClxRRT0AKM0lFF+wBRRRSAKKXFBp20AKKSjNFwAUtKB70vFaRixCUmaDSUpS7AKeaSlFFS9dRhRiiihWEJSgUUU0knqA7gUmabRTdR9AsLSUUVm3cYUUUYoAKKKKACig' +
                    'UtNIBKWjNGM1SXYQDmlpOlJQpJAKTSUUVF7jCiiihALRSUU7oBaSijFG4BRRRUgFFFFABRRRQAUUUUwCiiikAUZoopgLSUUUXAKKKKQBRRRQAUUooqrAJRRilpWASiil' +
                    'osAlGKWiq5QEpaKKEAGkpaMUPVgJRS4FGKXIwEopcUmKVmAUUtFO1wEoxS0U+UBKWjFFPlYgJpKKKhu4wooopAFFFFABRRRQAUUUUAFLSUuaaYBRRRVXEJRRRUjCilpK' +
                    'LALSUUUXAKKKKACiiigBaSiii4BRRRQAUtJRRsAuKSlFGKq11dAJRRRUgFFFFABRRRQAYopc0dadk9gEoooqQCiiigAooooAKKKKYBRRRQAUUUUgCiiigApc0lFO7AXN' +
                    'JRRRcBaKSinzALS4ptLmqjJdRC4pKN1BOacnG10AUUlFRzDFpRSZpMmqUkhDqSjJpd3tVc0ZbgJijNG6jNS3HoAtGabRRzsLC5pCc0UVLk2MKKKKQBRRRSAKKKKACiii' +
                    'nYApcUlLTSAKTiiihsBaSiik3cAooopAFLSUU7gLn1pKKKbbYBRRRikrgFFLSU2rAFFFFIAooooAKKKKQBS5pKKadgFxSUuaODVWT2ASiiipYBRRRSAKKKKACiiincAo' +
                    'oooQC0lLRTASiiikAUUUUAFFFFABRRRQAUtJRQgFxSUtFOwCUUUVIBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFO4BRS0lFgCjNHWijUAooooAKKWiiwCUuKKKdkAdaXb6m' +
                    'm5op3XYBcgdKTNFFJtsAooopAFLSUoFNXYCUU7GKOKrk7iuNopcUlQ1YYUUUUAFFFFABRRRSAKKKKYBRRRSAKKKKACiiigAooooAKKKKYBRRRSAKKKKACiiigAooooAK' +
                    'KKKAFpKKKdwCiiigAooooAKKKKACiiigAoooouAUUuKMU1FsBKKXFFFmgCiikptiCilzRSa7DEpc0lFK4C9aSilp6MBKKXFJScWgCiiigApaSlHNOPYAxSU7bSYqnTYr' +
                    'iUtGKMVNmMSilxSUNNbgFFFFIBaSilpgJRRRSAM0UUUXAKM0UUALmjNJRT5mAUUUVIBRRRTAKKKXFFgEooooAKKKKLAFFLikxRYAooooAKKWkosAUtGKKpIApKWinyiE' +
                    'ooIoqLWGFFFFABRRRQAUUUUgCiiigAooooAKKKKdwCiiigAooopAFFFFMAzS5pKKLsBcijNJRT5mwFFFJRRcApaKKaQgpKWihoBKKKKgYuaMg0lFUpMAopc0lL0AKKUA' +
                    'GjinZgAbFOzmmUA4q41GtGKw4ikpc5pDVSs9UAUUUVmAUYoozRoMSiilxUgFJilxRVW7gJRS0YpWASiiloSTASinZ9qaaGkgCiilxQotgJRRRSAKXNJRQgCilFFVytgJ' +
                    'S0UUJWEFFFFMAoopKkYUtJTgacVfcBKWikqr2EFFFFK4C02nUYqnG4DaKUijFRysYlFBoqWAUUUUgCiiigAooooAKKKKACiiimAUUUUAFFLRRYBKKKKQBRS0lOwBRRRQ' +
                    'AUZooouAuaXNNopqbQDsA9KbiilzTvF7gJiil4o4osgEpcUUnSlawBRRRSYBRRRSAKXrSUVSdgFPBoozSU7pCFopKKTdxhS0lFCfYBc0vBptFUpiFoNFFJu4CUUuKKOU' +
                    'YUYozzS5qkovdiEpKcT7U2pkknoMKMUUtSAmKXpRRTAM0CkpaakAUUUVTEFFFFTcYUUlLRcApKKKTYBRRRSAKWkooAXNGaSinzMBcmlzTRRT5mAtJSig02rq6EJRRiio' +
                    'sMKKKKQBRRRQAUUUUAFFFFMAooopAFFFFMAxS0lGaegBRRRSAKKKKACiiigAooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFLjPekoqk7bgLikpc0daGk9gEopaTND' +
                    '0AKKKKVwClBxSUUJ21AXOaM0lFPmYBRRRUgLmjNJS1SYADRx6UlFNSsA7IpOtJRQ5sBcUlFFS2mAZooooAKM0UUbALRSUUXAKKKKQBRRRQAUUUUwCiigUALSUUUAKKWm' +
                    '0oNXBrqJi0hFFLVPUBtLiikrMYuKTFGaXNACUUuaKQCUUUuM00m9gEopdp70UOLW4CUUtJSAKKKKQBRRRTAKWiko2AKKKKACilop2ASilopWASiiigAxRRS0wEoxS0U0' +
                    'kAYoxRSUnYBaKSijQAopaSlYAozS0lGwBRRRQAUUUUgCiilqkAlFFFIApaSii4BQKKKEAUUGihoAooooAKKKKQBRRRQAUUUYpgFFFFIAooooAKKKKACiiimAUtJRQAUU' +
                    'UUgCiiigBaKQUtWmIKSlooaASiiipGFFFFABRRRQAUUUUgCiiimAUUUUAFFFFIAoooFMAooooAKWkooTAXFJRS07XASjNLijFPlYCUU6kocbAJRRRUgFFFFABRRRQAUU' +
                    'UtABSUvWkptAFFLRQkAmKKKWiyAKOtFJQ2AUUUVIBRRRQAUUUUwCilFJQ11AKKKKACiiigAooopAFLSUUIANFLSU2uoBRRRSAKKKKdgCiiigAooopAFFFFABRRRTQBS0' +
                    'lLTQBRRRVCCkpaKTQCUUUVIwooopAFGKKUGqVuoCYopaKfKAlFBoqbAFFFFABRRRSQAaKKKbAKKKMUWAKKXFLiqUGwEzS0lFVdoQUUUVO4CUUtFLlGJRS0UrAJRRRQwC' +
                    'iiigApaSlprsAlFFLijUAoxRRTYCGig0VLAKKKWiwCUUtIaLAFFFFIApaSlzVJgGKSlzRTaXQBKKXFJipAKKMUUAFFFFFgClpKKEAUU8ISKay4q3SmldoVxKKKKi4woo' +
                    'opAFFFFMAooopAFLRSVQBRRRSQC0UlLVJgFFFFFxBRRRRYBKKKKkYUUUUgCiilxTV2AlFOxSYqnFgJRS4pKloAooooAKWilq4xuITFFKaSh2WiAM0ZNFGKTbYxKKKKm4' +
                    'BmlpKWmmAUUUUwCkpaSkwFpKKKW4BRRRSAWikop3AWiiiq2AKKQUtIBKKKWhK4BRRRTsIKKKKAEopaMUrDEooopAFLSUU0AuKKM0Zp3QgopM0ZpXQwxRRRSuAUo460lF' +
                    'NO2oC5pKKKTbAKKKKQBRRRQAUUUUwFxR0pKKaaQCmkoopN3AKKKKQC0UlFUpALRSUU7oBaKSilcAoopcUkrgJRS7aMU+VgJS5NGKSlqgFzS7qbRmrjUkhWFOTSUuaKTS' +
                    'eoCU7rSUU46ALik6UZpKHJdADNFFLU6jEooopXAKKKKQBRRRQAUtJS1SAKKKKPUAxRmikxRfsAUUtJRYApelFFC0ADSUUUN3AKXNJRSTAKXNJRQpNbALuozSUVXPJgLm' +
                    'kzRRU3YBk0UUUrgFFFFABRRRQAUUUUAFFFFABRRRQAUUGimwCiiikAUUUtMBKKKBQAUUUtACUUppKACilpKGAUUUUgCiiigAooooAKKKKYBRRRQA4Gim0oNaRnfRisLS' +
                    'GiiiWoCUUGis9hhS0lFCYC5pM0UUOTAKKKKQC0lFFO9wFpKKXNG4CUUUUMAooopAFKDSUU07AOppozS1fxbCEpaCR6UvHahR8wEooopNAFJS0UhiUUtFFgEoooqQCiii' +
                    'gAooooAX60hGKKUHsapWejASilIxSUmmtwCiiigBaSiii4BRRRSAKKKKAClpKWqXcBKKKKkAooopgFFFFABRRS0wEpaKKAEooopAFFFBoAKKKKACiiikAUUUUwCiiikA' +
                    'UUUUAFFFFMApc0lFNSaAWkoopN3AKKKKACiiikAUUUYpgFFFFIAooooAKWkpaaASiiigAooopAFGaKKdwCiiikAUtJQDVJ9wFpKKKGAUtFFFgEopaSk0AUUUUAFFFFIA' +
                    'ooooAUHjFJRS9RVXbQCUUUuKFFsBKKdwKMj0p8i7gNoxS7vYUmc0mkgCiiikAtJS0lNgFFFFSAUUUUwCiiimAUUUUgFoNJRmmAUUUUgClpKWmgEooopAFFFFABRRS0WA' +
                    'SiiikAUUUUwCiiikAUUUuKdgEopcUU7AJiilop2uAlGKeAKcEHc1rHDylsK5Hg0u04zipCyr0FMLk1cqdOmtZXYrtiUlFFYN3GFJRRUDClFJRQgCilozTAMUlFFIAooo' +
                    'pAFGKKWmkAlFLSUWAKKWkoYBS0lKKaYBRSGihMBaMUUvSqSuIbRTutJik4MdxKKMUVNgClFJRQnZgFFFGKLAFFFL0osAlFFFABS0UU0u4BSUUUgCiiigAooooAUUUlLT' +
                    'ASiiikAUUUUAFFFFABS0lLTQCGiloxRYBKWiihAFJS0lD0AKKKKkAooopgGKXFJRTTS3QDtpoxTc0uTWilDsLUdijFN3Gl3ValBhqGKMUu4UEjrRaO6EJ0oLGkJzSVnK' +
                    'o9kOwUUUVkMKXikopp2AdmkpKKfM2AUUuKSkAUUUUALSYooouAUUUtOwBSUUUNgLRSUtC10ASlopKQBRRRQAtJRRTuAZopaSgBc0ZpKKFJoBaSlpKGAUUuKSlYAoopeB' +
                    'TAOlJR1oobvoAuDRjFGaXqKpRi1oIbmiiioYwooopAFFFFNAFLikpaYBRRRQAUUUUAJijFLRmmkgExRS9aDSaASl60lAoiwCiloosAUUUlMBaSiipuAUUUUgCiiimAUU' +
                    'UYosAUUUUAFFFFFwCiiikAUUUUwCiiigAooooAKKKKAFoooqrCEopaKVhiUUuKMUrAJRS0U7AJRRRSAKKKM0aAFGaKKACiilxRa4CUYpcUVSj3AKSlpME0NdgFozRtPo' +
                    'aTB9KLNdAFpQO5oHHakJzVK0VdiAmkopahtyGJRRiikwCiiikAUUUtNAJRS0lDVgCiiikAUtJS00AlFFFAC0UmaWmAUlFFAC0UUdKpCCkooqG7jCgUUUIBaM0Uu2rSb2' +
                    'EJSYp2B60Yp8jC42ilpKhxsMKKKKkAooooAKKKKACiiigAooooAKKKKYBRRRQAtFJRRcApaSigBaSjNFGgC0UCiqQhKWikpDClpKKACiiikwCiiikAUUUUAFLijFL0q1' +
                    'HuISnDigAGg1vGPKrsQmaSlxSGs5X6jCjNFFRqAbj607zG9abSU1VnHaTCyFJJ6mkopam7lqxiUtFFNaALSYooyad11EGKKSip0GLSUUUgFooFGKpJsBKKWkqWrAFLSU' +
                    'tNAJRilxRRZgFFFFVYQUUnelpbsBegpp5pSaSiUugwoooxUgFLSUUALRmiiqvbYQUtNzS5pqdgsKabRRUylcYUUUVIBRRRQAUUUUwCiiiiwBRRRSAKKKKACiiigAoooo' +
                    'AKKKKACiiigAoopapAFFFJRcAooopAFFFFIAooopgFOAxSCjNVGy1AKM0lFLmfQBSxNJRRScm9wFBozSUU1NoAozRRSuwCiiikAUZoooAKKKKYBRRRQAtJRRRcAooopA' +
                    'FLmkopptAO60YptFXzJ7iFxRSUVN12GLmjNJRRzMBc0maKUDNGrAAM0uMdaOnNIWJGCeK0tGK13EJRRRWIwpaSimgClFJS00AUlFFJsAoopcUWYCUUUUgCiiigAooooA' +
                    'KKKWmAUUUU7gGKSlooaASijFFKwBRRRSAKKKKACiiigAooopgFKKSihMBaM0lFO4C0lFFK9wCilxRimosBMU4L60lGatKK3EKQKbRmiolK+wxaSiildAFFFLRYBMUuKS' +
                    'jNNWAWkoopMAooooAKKKMUWAKKXFGKfIwuJRS0U+UQYpcUZpCaq0UAhoopagYhoooqWAUYopaaASilpKYC0UoXNLs960VOT2QriDFO3ADpSFSByKYavmdLSwtxScnNGK' +
                    'M0ZrG6erGHFLgGm0oNOMl1QBx3FKNtBGRmm078j2AkwtNIHrTaWqdRSVrBYTFLilxSdKnltuA7ikNFA5q276IBtFKVxSVi4tPUYUUUVIBRRRQAUUUUwCiiigBRRSUUwF' +
                    'ozSUUXAKKKKQBRRiiiwBRRRQAUUUUAFFFFABRS0U1EBKWiinyiDNLTaKOYBc0lFFS3cYUUUUAFFFFIAooooAKKKWmAYB6UYpKM1V12AKUCijNCS6gFLSUtWhAKWm0uap' +
                    'SVrMA60lLmg0mr6oBKSiismMKKWjFCVwExRS0U3EBKKKKmwBTgtAwKQmtFyx1YhSaTcaSipc5DsKST1NJRRUtt7gFFFFIAooooAUHFB5pKWrT6MBKUUGkpbMB1BFNpcm' +
                    'rU09GKwlFFFZ31GOzSGkoqnK6AKKKKgAooooAKKKKACiiigAooopgFFFLQkAYoooqrCCiiiqQC4pMUtG70p+71ATpSUUVm3fYYUtLimmm4uIC0UlLmlcAooop3AMUlLR' +
                    'RZAJRS4pKmzAKKKKACiloxTsAlFLikpWAKMUUUwCiilxSAKO9GKKpoAzRmkopczAXNJRRSuAUuaSihMApaKKpIQuKM0lJTcrbALS8DrTaKSlboA7K+lJx2NJRT579AsF' +
                    'FLRU2GJRS0lIAxRSiinYBKKKKQBRRRQAUUUUALSUtJTAKKKKQBRRRRYAooopAFFFFDAKKKKAClpKKpAFFLSUNAFFLRQkAUZpKKLsBaKSlppiCiikobAM0UUtTa+4xKKX' +
                    'NJR6AKDQaSlFXF30YhKKDRUMYUUUUAFFFFIAzS5pKKabQC4pKKKLgLRRRVIQUlLRRuMQUuKSlpAJS5pKKV7bALmkzRRRdgFFFGKLAFGKXpSZp2S3AKUNj6UlFClZ3QDu' +
                    'KSkopudxWCiiipGFLSUopoAoooq9EIKKKKlgBpKKKkYtFJmincBaMUcmlwapJy2QhMUlLg0uPWjlYDaKWipsMSloopgFJS0lJgLSdqWlxmmot7ANopSpFJScWtwCiiip' +
                    'AKKKKACiiigBQaKSiqUgFopKWncQUlLRQ0AlFFFSMKKKKAFpKKKLgFFFFIAoFFFPYBTSUo9KKpq+ohKKKKkYUUUUgCiiimAUtJRQAuaSiii9wClpKWmgCkpaSgAopaSk' +
                    'AUUUYoAKXNFJTAKKKKVgCiiikAUUUtNAGKSlBpSBjir5U1dCG0UUVAwooopXAKKAKdgCqUbgNpadRurWNOPViuNwfSnBD1NO3DFMJzVunTjre4rsDwaNxo4NNxUOTjts' +
                    'MfvppOaSis5VJS3YWFFFAooWoxKKdSUOLASlFJilApJAKBQaKStXtZCCjmiiosrAJRRRWYwooooAKKKKYBRRRQAUUUUAGaXNJRTUmgFzSYooobuAUUUVIBRRRQAUUtFO' +
                    'wCUUUUgCndabRVRlYBTSUtFNoBKUUlFTsAtFFFP1AKSiik9QCiiiiwBSikxRigBaKKKYBSUUUnqAUUtJigAooooAKKBRQAUUUUAFFFFIAoBxRRT2AdwfY00jmilB9aq6' +
                    'luISjFLmihpIYUtNooUgHUlJRT5xC59KTNFFS5NjFopKUUJgJS4opOlFrAOApabmjNaKcUKwpoFANL1qkk9QAUtJS5ArWLXUQ2kxQzZpyjdWSSnLliMbSU8oRTcEVnOE' +
                    'ov3kCYlFFFZjCiiigAooooAKKKKACiiigAooooAKKKKADFFLiiqsAmKWiko0QBRRRSAKKKKACiiikAUZooppsAoooo1AKKKKQBQKKKaAWkpc0lNgLRQKKpaiEpaKKVhi' +
                    'UopQKO9NR6sQlFFFJoAxSUtFKwxKU0lKOlCXQBKKXFGKFFsBKKWiiwCUUuKMUcrASiiipAKKKKYBRS0lDAKKKKQBRRRQAUCiihMB1IaSl61pfm0EJRS4NGKnlYxKUHFI' +
                    'RiihNxYCk0lFFJyb3AKKKKQChiO9KWzTaKv2krWuFgoooqACiiigAooooAKKKKACiiigApaKKqIBRRRVMQUUUUuoCd6KKKkYUCiigBaSiimwCiiikwCiiihALR2ooqmA' +
                    'lFFFQAvakoopsAFBooo6AFFFFAC0UUVaELSUUVT6AFFFFSAUtFFNAFITRRTlsA4cikNFFXPZCEooorIYd6WiiriAhpKKKyluMKKKKSAKKKKGAUUUUgCiiigAooooAKKK' +
                    'KAJB0ppNFFdc/hJ6jaKKK5SgooooAKKKKQBRRRTAKKKKQH//2Q==" />';

var checkedIcon = '<img src="data:image/gif;base64,' +
                  'R0lGODlhEAAQAOYAAAAAAP///1pdWVlcWF5hXV1gXFteWi0xKz5CPCcpJmNnYVPwAFLuAFHsAFHq' +
                  'AFDoAE/mAE/kAE7iAEvYAEnUAEXIAETGAETEAEPCAELAAEG8AD+2AD60AD2yAD2wADusADuqADii' +
                  'ADOUAC+IAC6EACyAACt+ACt8AD6vAS6DAS6CASyAASp5AUW5CEODIkJ3JVKRMVGOMFOSMlKQMVSU' +
                  'M1GLMl6TQ1mJP2WYSlJ0PzM1MYODg4KCgoGBgX9/f35+fn19fXt7e3p6enl5eXh4eHZ2dnV1dXNz' +
                  'c3Jycl9fX11dXVtbW1paWllZWVhYWFdXV1ZWVlNTU09PTzk5OTQ0NDAwMC0tLSgoKCQkJCIiIiEh' +
                  'IR8fHx0dHRsbG////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
                  'BAEAAF4ALAAAAAAQABAAAAergF6Cg4SFhoeIiYqLSY1KS09PUFFSLi+ESTs8PT4/QUJDNBUYhEs8' +
                  'nUBBQ0QyFgsQHINPP56rRjAYDAwbI4M5OEJERUczuQ0cKYQtEzZHSDEZDg4cKjqDGBAMKDc1Gg4P' +
                  'HSoEVoMaFAsPFxUQDx4rBUpXhB4VDQ4QER4lBktMWIQIQmiAIOGDCQFNnDzJQmiKAhEeQJwYoHAS' +
                  'F0JUqhwgwSIBFi1buHDpIigQADs=" />';

var unCheckedIcon = '<img src="data:image/gif;base64,' +
                    'R0lGODlhEAAQAOYAAAAAAP///4ODg4KCgoGBgX9/f35+fn19fXt7e3p6enl5eXh4eHZ2dnV1dXNz' +
                    'c3JycnFxcXBwcG5ubm1tbWxsbGtra2lpaWhoaGdnZ2VlZWRkZGNjY2JiYmFhYWBgYF9fX11dXVxc' +
                    'XFtbW1paWllZWVhYWFdXV1ZWVlNTU1BQUE9PT05OTkpKSkhISEVFRUREREFBQT4+Pjo6Ojk5OTU1' +
                    'NTQ0NDMzMzAwMC0tLSoqKigoKCcnJyQkJCIiIiEhIR8fHx0dHRsbG////wAAAAAAAAAAAAAAAAAA' +
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
                    'BAEAAEIALAAAAAAQABAAAAeUgEKCg4SFhoeIiYqLH40gIiYmJygqKyyEHwIDBAUGCAkKDA4uhCID' +
                    'nQcICgsNDxEwhCYGnqutEBIUMoQnnwuitxQVFzSEKaEOrhMUFhgZNoQrrRG4FhcZHB44hC3A1dcd' +
                    'HyA6hC8TFcwaGx6PIzyEMd7YICEkJSY9hDPXHh8hIvaTgBCqcQNHDh07ePj4AQRIEEGBAAA7" />';

var running;                    // Is the autoplayer running?
var innerPageElt;               // The currently visible inner page
var cashNYElt;                  // NY cash DOM element
var cashCubaElt;                // Cuba cash DOM element
var cashMoscowElt;              // Moscow cash DOM element
var cash;                       // Cash array of values by city
var healthElt, health;          // Health DOM element and value
var maxHealthElt, maxHealth;    // Maximum health DOM element and value
var energyElt, energy;          // Energy DOM element and value
var maxEnergyElt, maxEnergy;    // Maximum energy DOM element and value
var staminaElt, stamina;        // Stamina DOM element and value
var maxStaminaElt, maxStamina;  // Maximum stamina DOM element and value
var influenceElt, influence;    // influence DOM element and value
var maxInfluenceElt, maxInfluence;  // Maximum influence DOM element and value
var levelElt, level;            // Level DOM element and value
var curAttack;                  // Current Attack stat value
var curDefense;                 // Current Defense stat value
var curExpElt, curExp;          // Experience DOM element and value
var lvlExpElt, lvlExp;          // Level up experience DOM element and value
var energyPackElt, energyPack;  // Is an energy pack waiting?
var ptsToNextLevel;             // Experience to next level up
var mafia;                      // Mafia size
var invites;                    // Number of mafia invitations
var staminaFlag = false;        // Is stamina incremented?
var stats;                      // Skill points
var city;                       // Current city (0=New York, 1=Cuba, 2=Moscow)
var skipStaminaSpend = false;   // Skip stamina actions for now?
var clickAction;                // Action being attempted with click simulation
var clickContext;               // Context for clickAction
var modificationTimer;          // Timer used to wait for content changes
var helpWar = false;            // Helping a friend's war?
var idle = true;                // Is the script currently idle?
var shakeDownFlag = false;      // Flag so shake down again doesnt get interrupted
var lastOpponent;               // Last opponent fought (object)
var suspendBank = false;        // Suspend banking for a while
var newStaminaMode;             // New stamina mode for random fighting

if (!initialized) {
  var settingsOpen = false;
  var statsOpen = false;
  var didJobCalculations = false;
  var scratchpad = document.createElement('textarea');
  var defaultClans = ['{', '[', '(', '<', '?', '«', '™', '?', '?'];
  var defaultPassPatterns = ['LOST', 'punched', 'Whacked', 'you were robbed', 'ticket'];
  var defaultFailPatterns = ['WON','heal','help','properties','upgraded'];
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var xJob = ''; // Keep track of previously failed job

  var debug = isChecked('enableDebug');
  var filter = isChecked('filterLog');

  // Regular expression for cash matching.
  const REGEX_CASH = /[A-Z]?\$[\d,]*\d/;

  // Define how stamina can be used.
  const STAMINA_HOW_FIGHT_RANDOM = 0;  // Random fighting.
  const STAMINA_HOW_FIGHT_LIST   = 1;  // List fighting.
  const STAMINA_HOW_HITMAN       = 2;  // Hitman.
  const STAMINA_HOW_RANDOM       = 3;  // Random spending of stamina in random cities.

  var staminaSpendChoices = [];
  staminaSpendChoices[STAMINA_HOW_FIGHT_RANDOM] = 'Fight random opponents';
  staminaSpendChoices[STAMINA_HOW_FIGHT_LIST]   = 'Fight specific opponents';
  staminaSpendChoices[STAMINA_HOW_HITMAN]       = 'Collect hitlist bounties';
  staminaSpendChoices[STAMINA_HOW_RANDOM]       = 'Whack \'em y\'all mafia!';

  // Define Bounty Selection options
  const BOUNTY_SHORTEST_TIME  = 0;  // Select qualified bounties with shortest time.
  const BOUNTY_LONGEST_TIME   = 1;  // Select qualified bounties with longest time on the hitlist.
  const BOUNTY_HIGHEST_BOUNTY = 2;  // Select qualified bounties with the highest bounty.
  const BOUNTY_RANDOM         = 3;  // Select random qualified bounty.
  var bountySelectionChoices = [];
  bountySelectionChoices[BOUNTY_SHORTEST_TIME]  = 'Shortest time';
  bountySelectionChoices[BOUNTY_LONGEST_TIME]   = 'Longest time';
  bountySelectionChoices[BOUNTY_HIGHEST_BOUNTY] = 'Highest bounty';
  bountySelectionChoices[BOUNTY_RANDOM]         = 'No preference (random)';

  // Define war modes
  const WAR_HOW_RANDOM = 0;  // Random war.
  const WAR_HOW_LIST   = 1;  // List warring
  var warModeChoices = ['War a random friend', 'War friends from a list'];

  // Define AutoStat allocation mode
  const AUTOSTAT_TARGET        = 0;
  const AUTOSTAT_RATIO_LEVEL   = 1;
  const AUTOSTAT_RATIO_ATTACK  = 2;
  const AUTOSTAT_RATIO_DEFENSE = 3;
  const AUTOSTAT_RATIO_HEALTH  = 4;
  const AUTOSTAT_RATIO_ENERGY  = 5;
  const AUTOSTAT_RATIO_STAMINA = 6;

  // Auto Stat mode arrays
  var autoStatDescrips  = ['Level', 'Attack', 'Defense', 'Health', 'Energy', 'Stamina', 'Influence'];
  var autoStatModes     = ['autoStatAttackMode', 'autoStatDefenseMode', 'autoStatHealthMode',
                           'autoStatEnergyMode', 'autoStatStaminaMode', 'autoStatInfluenceMode'];
  var autoStatPrios     = ['autoStatAttackPrio', 'autoStatDefensePrio', 'autoStatHealthPrio',
                           'autoStatEnergyPrio', 'autoStatStaminaPrio', 'autoStatInfluencePrio'];
  var autoStatFallbacks = ['autoStatAttackFallback', 'autoStatDefenseFallback', 'autoStatHealthFallback',
                           'autoStatEnergyFallback', 'autoStatStaminaFallback', 'autoStatInfluenceFallback'];
  var autoStatBases     = ['autoStatAttackBase', 'autoStatDefenseBase', 'autoStatHealthBase',
                           'autoStatEnergyBase', 'autoStatStaminaBase', 'autoStatInfluenceBase'];
  var autoStatRatios    = ['autoStatAttackRatio', 'autoStatDefenseRatio', 'autoStatHealthRatio',
                           'autoStatEnergyRatio', 'autoStatStaminaRatio', 'autoStatInfluenceRatio'];

  // Number Scheme
  const SCHEME_PERCENT = 0;
  const SCHEME_POINTS = 1;

  var numberSchemes = ['percent','points'];

  // Burn constants
  const BURN_ENERGY = 0;
  const BURN_STAMINA = 1;

  var burnOptions = ['Energy','Stamina'];

  // Array of lottery bonus items
  var autoLottoBonusList = ['A random collection item', 'A free ticket', '+5 stamina points', '1 skill point', '+20 energy points', '1-5 Godfather points'];

  // Stat Ordinal constants
  const ATTACK_STAT  = 0;
  const DEFENSE_STAT = 1;
  const HEALTH_STAT  = 2;
  const ENERGY_STAT  = 3;
  const STAMINA_STAT = 4;
  const INFLUENCE_STAT = 5;

  // Define city variables.
  const NY     = 0;
  const CUBA   = 1;
  const MOSCOW = 2;

  // Constants to access city attributes
  const CITY_NAME        = 0;
  const CITY_CASH        = 1;
  const CITY_LEVEL       = 2;
  const CITY_CASH_ICON   = 3;
  const CITY_CASH_CSS    = 4;
  const CITY_AUTOBANK    = 5;
  const CITY_BANKCONFG   = 6;
  const CITY_SELLCRATES  = 7;
  const CITY_CASH_SYMBOL = 8;

  // Add city variables in this format
  // Name, Icon, Icon CSS, Auto bank config, Min cash config, Sell Crates config

  // Array container for city variables
  var cities = new Array(
    ['New York', undefined, 0, cashIcon, 'cash Icon', 'autoBank', 'bankConfig', 'autoSellCratesNY', '$'],
    ['Cuba', undefined, 35, cashCubaIcon, 'cashCuba Icon', 'autoBankCuba', 'bankConfigCuba', 'autoSellCrates', 'C$'],
    ['Moscow', undefined, 70, cashMoscowIcon, 'cashMoscow Icon', 'autoBankMoscow', 'bankConfigMoscow', 'autoSellCratesMoscow', 'R$']
  );

  // Spend objects
  var SpendStamina = new Spend ('Stamina', 'staminaSpend', 'useStaminaStarted',
                                'selectStaminaKeepMode', 'selectStaminaKeep',
                                'selectStaminaUseMode', 'selectStaminaUse', staminaIcon,
                                'allowStaminaToLevelUp', 'staminaFloorLast', 'staminaCeilingLast');
  var SpendEnergy  = new Spend ('Energy', 'autoMission', 'useEnergyStarted',
                                'selectEnergyKeepMode', 'selectEnergyKeep',
                                'selectEnergyUseMode', 'selectEnergyUse', energyIcon,
                                'allowEnergyToLevelUp', 'energyFloorLast', 'energyCeilingLast');

  // Force Heal options
  var healOptions = new Array(
    ['forceHealOpt3','Heal if stamina can be spent'],
    ['forceHealOpt4','Heal if stamina is full'],
    ['forceHealOpt5','Heal after 5 minutes']
  );

  // Define all jobs. The array elements are:
  // job description, unadjusted energy cost, job number, tab number, city, unadjusted exp payout
  var missions = new Array(
    ['Mugging',1,1,1,NY,1],
    ['Corner Store Hold-up',3,2,1,NY,3],
    ['Warehouse Robbery',5,3,1,NY,5],
    ['Auto Theft',7,4,1,NY,8],
    ['Beat Up Rival Gangster',2,5,1,NY,2],
    ['Rob a Pimp',3,8,1,NY,3],
    ['Collect on a Loan',2,37,1,NY,2],
    ['Collect Protection Money',2,6,2,NY,2],
    ['Rough Up Dealers',2,7,2,NY,2],
    ['Take Out a Rogue Cop',3,9,2,NY,3],
    ['Perform a Hit',3,10,2,NY,3],
    ['Bank Heist',10,11,2,NY,13],
    ['Jewelry Store Job',15,12,2,NY,20],
    ['Hijack a Semi',8,38,2,NY,9],
    ['Destroy Enemy Mob Hideout',5,13,3,NY,5],
    ['Kill a Protected Snitch',5,14,3,NY,5],
    ['Bust a Made Man Out of Prison',5,15,3,NY,5],
    ['Asian Museum Break-in',18,16,3,NY,22],
    ['Fight a Haitian Gang',6,17,3,NY,6],
    ['Clip the Irish Mob\'s Local Enforcer',10,39,3,NY,11],
    ['Steal a Tanker Truck',8,40,3,NY,9],
    ['Federal Reserve Raid',25,18,4,NY,30],
    ['Smuggle Thai Gems',7,19,4,NY,8],
    ['Liquor Smuggling',30,22,4,NY,35],
    ['Run Illegal Poker Game',20,26,4,NY,33],
    ['Wiretap the Cops',30,28,4,NY,45],
    ['Rob an Electronics Store',24,41,4,NY,26],
    ['Burn Down a Tenement',18,42,4,NY,22],
    ['Distill Some Liquor',10,23,4,NY,12],
    ['Manufacture Tokens',10,24,4,NY,12],
    ['Get Cheating Deck',10,25,4,NY,12],
    ['Overtake Phone Central',10,27,4,NY,12],
    ['Repel the Yakuza',13,29,5,NY,18],
    ['Disrupt Rival Smuggling Ring',15,30,5,NY,20],
    ['Invade Tong-controlled Neighborhood',25,31,5,NY,30],
    ['Sell Guns to the Russian Mob',25,32,5,NY,35],
    ['Protect your City against a Rival Family',35,33,5,NY,50],
    ['Assassinate a Political Figure',35,34,5,NY,50],
    ['Exterminate a Rival Family',40,35,5,NY,58],
    ['Obtain Compromising Photos',28,43,5,NY,32],
    ['Frame a Rival Capo',26,44,5,NY,33],
    ['Steal an Air Freight Delivery',32,45,6,NY,36],
    ['Run a Biker Gang Out of Town',35,46,6,NY,40],
    ['Flip a Snitch',25,47,6,NY,30],
    ['Steal Bank Records',30,48,6,NY,36],
    ['Loot the Police Impound Lot',60,49,6,NY,60],
    ['Recruit a Rival Crew Member',30,50,6,NY,39],
    ['Dodge an FBI Tail',20,51,6,NY,27],
    ['Whack a Rival Crew Leader',28,52,6,NY,38],
    ['Influence a Harbor Official',50,53,7,NY,65],
    ['Move Stolen Merchandise',36,54,7,NY,50],
    ['Snuff a Rat',44,55,7,NY,62],
    ['Help a Fugitive Flee the Country',40,56,7,NY,57],
    ['Dispose of a Body',25,57,7,NY,36],
    ['Ransom a Businessman\'s Kids',60,58,7,NY,70],
    ['Fix the Big Game',50,59,7,NY,60],
    ['Steal an Arms Shipment',45,60,7,NY,66],
    ['Extort a Corrupt Judge',24,61,8,NY,36],
    ['Embezzle Funds Through a Phony Company',50,62,8,NY,70],
    ['Break Into the Armory',50,63,8,NY,60],
    ['Rip Off the Armenian Mob',50,64,8,NY,68],
    ['Muscle in on a Triad Operation',45,65,8,NY,68],
    ['Ambush a Rival at a Sit Down',55,66,8,NY,80],
    ['Order a Hit on a Public Official',35,67,8,NY,55],
    ['Take Over an Identity Theft Ring',36,68,8,NY,52],
    ['Settle a Beef... Permanently',40,69,9,NY,64],
    ['Buy Off a Federal Agent',35,70,9,NY,50],
    ['Make a Deal with the Mexican Cartel',40,71,9,NY,60],
    ['Blackmail the District Attorney',44,72,9,NY,66],
    ['Shake Down a City Council Member',85,73,9,NY,124],
    ['Make Arrangements for a Visiting Don',40,74,9,NY,60],
    ['Take Control of a Casino',70,75,9,NY,110],
    ['Travel to the Old Country',52,76,9,NY,82],
    ['Rob Your Cab Driver',12,1,1,CUBA,16],
    ['Secure A Safehouse',36,2,1,CUBA,49],
    ['Intimidate The Locals',52,3,1,CUBA,70],
    ['Silence a Noisy Neighbor',32,4,1,CUBA,44],
    ['Smuggle In Some Supplies',34,5,1,CUBA,45],
    ['Set Up A Numbers Racket',44,6,1,CUBA,60],
    ['Establish Contact With The FRG',38,7,1,CUBA,50],
    ['Take Out The Local Police Chief',41,8,1,CUBA,55],
    ['"Persuade" A Local To Talk',51,41,1,CUBA,69],
    ['Assault A Snitch\'s Hideout',56,42,1,CUBA,75],
    ['Transport A Shipment of US Arms',42,9,2,CUBA,59],
    ['Meet With The FRG Leadership',38,10,2,CUBA,54],
    ['Hold Up A Tour Bus',45,11,2,CUBA,65],
    ['Ambush A Military Patrol',51,12,2,CUBA,72],
    ['Capture An Army Outpost',56,13,2,CUBA,79],
    ['Sneak A Friend Of The Family Into The Country',35,14,2,CUBA,50],
    ['Ransack A Local Plantation',43,15,2,CUBA,61],
    ['Burn Down A Hacienda',58,16,2,CUBA,82],
    ['Offer "Protection" To A Nightclub',38,17,3,CUBA,56],
    ['Rob The Banco Nacional Branch',52,18,3,CUBA,77],
    ['Shake Down A Hotel Owner',40,19,3,CUBA,58],
    ['Bring The Local Teamsters Under Your Control',46,20,3,CUBA,68],
    ['Help The FRG Steal A Truckload Of Weapons',51,21,3,CUBA,74],
    ['Hijack A Booze Shipment',45,22,3,CUBA,67],
    ['Pillage A Shipyard',52,23,3,CUBA,76],
    ['Take Over The Docks',60,24,3,CUBA,88],
    ['Muscle In On A Local Casino',44,25,4,CUBA,67],
    ['Establish A Loansharking Business',49,26,4,CUBA,74],
    ['Eliminate A Rival Family\'s Agent',42,27,4,CUBA,64],
    ['Pass On Some Intel To The FRG',45,28,4,CUBA,67],
    ['Execute A Regional Arms Dealer',50,29,4,CUBA,76],
    ['Sink A Competing Smuggler\'s Ship',52,30,4,CUBA,78],
    ['Gun Down An Enemy Crew At The Airport',56,31,4,CUBA,85],
    ['Assassinate An Opposing Consigliere',62,32,4,CUBA,93],
    ['Raid The Arms Depot',53,33,5,CUBA,81],
    ['Supply The FRG With Some Extra Muscle',46,34,5,CUBA,70],
    ['Capture The Airport',56,35,5,CUBA,85],
    ['Knock Off A Visiting Head Of State',52,36,5,CUBA,79],
    ['Set Up A High Volume Smuggling Operation',55,37,5,CUBA,85],
    ['Blow Up A Rail Line',50,38,5,CUBA,77],
    ['Attack The Army Command Post',58,39,5,CUBA,88],
    ['Storm The Presidential Palace',70,40,5,CUBA,106],
    ['Arrange A New York Drug Shipment',62,43,6,CUBA,95],
    ['Launder Money Through A Resort',72,44,6,CUBA,110],
    ['Loot The National Museum',78,45,6,CUBA,117],
    ['Send Some Help Home To New York',64,46,6,CUBA,98],
    ['Take Over The Havana Reconstruction',82,47,6,CUBA,123],
    ['Help Get An Associate A No Bid Contract',56,48,6,CUBA,85],
    ['Trans-Ship A Container Full of Refugees',48,49,6,CUBA,73],
    ['Meet With "The Russian"',58,50,6,CUBA,89],
    ['Smuggle Consumer Electronics for the Vory',46,1,1,MOSCOW,61],
    ['Arrange A Drug Shipment for the Mafiya',40,2,1,MOSCOW,53],
    ['Fight Off An Ultra-National Gang',112,3,1,MOSCOW,115],
    ['Kidnap A Local Gang Leader for the Vory',47,4,1,MOSCOW,63],
    ['Collect The Ransom',50,5,1,MOSCOW,64],
    ['Receive Vory Intel On Dmitri',40,6,1,MOSCOW,54],
    ['Kill A Local Gang Leader for the Mafiya',47,7,1,MOSCOW,63],
    ['Collect the Hit Payoff',56,8,1,MOSCOW,76],
    ['Buy Mafiya Intel On Dmitri',52,9,1,MOSCOW,74],
    ['Threaten A Gang\'s Supplier',58,10,1,MOSCOW,79],
    ['Hijack An Arms Shipment From A Militant Gang',67,11,1,MOSCOW,90],
    ['Hospitalize Some Nationalists',76,12,1,MOSCOW,104],
    ['Confront Gang Leader Dmitri Leonov',76,13,1,MOSCOW,104],
    ['Bribe An Election Official',57,14,2,MOSCOW,77],
    ['Silence A Political Critic',53,15,2,MOSCOW,73],
    ['Violently Break Up A Campaign Rally',137,16,2,MOSCOW,141],
    ['Fix A Local Election for the Vory',66,17,2,MOSCOW,91],
    ['Extract A Favor From The Winner',97,18,2,MOSCOW,128],
    ['Catch Karpov Accepting A Bribe',77,19,2,MOSCOW,105],
    ['Abduct A Candidate\'s Wife for the Mafiya',66,20,2,MOSCOW,89],
    ['"Convince" The Candidate To Withdraw',90,21,2,MOSCOW,126],
    ['Kill An Investigative Reporter',75,22,2,MOSCOW,107],
    ['Pay Off The Port Authority In Arkhangelsk',57,23,2,MOSCOW,77],
    ['Re-route An Equipment Shipment',80,24,2,MOSCOW,106],
    ['Circulate Damaging Photos',99,25,2,MOSCOW,137],
    ['Take Down Party Boss Karpov',76,26,2,MOSCOW,109],
    ['Case The RossijaBanc Building',65,31,3,MOSCOW,88],
    ['Map Out The Escape Route',80,32,3,MOSCOW,108],
    ['Rob The RossijaBanc Central Repository',165,33,3,MOSCOW,172],
    ['Take A Guard Hostage During Your Escape',82,34,3,MOSCOW,112],
    ['Use The Guard\'s Keys To Access the Bank Armory',105,35,3,MOSCOW,140],
    ['"Borrow" The Guard\'s Uniform After Releasing Him',88,36,3,MOSCOW,117],
    ['Execute A Bank Guard During Your Escape',82,37,3,MOSCOW,112],
    ['Steal The Bank President\'s Car Keys',99,38,3,MOSCOW,132],
    ['Strip A Uniform Off The Corpse',91,39,3,MOSCOW,121],
    ['Blackmail A Secretary For An Exec\'s Itinerary',96,40,3,MOSCOW,129],
    ['Dispose Of A RossijaBanc Exec At Sea',89,41,3,MOSCOW,118],
    ['Replace A Guard With Your Own Man',118,42,3,MOSCOW,165],
    ['Manage An Escort Service Catering to Soldiers',111,44,4,MOSCOW,151],
    ['Support The Habit Of A Procurement Officer',125,45,4,MOSCOW,170],
    ['Ransack A Defense Contractor\'s Office',198,46,4,MOSCOW,210],
    ['Fly To The Siberian Military District',118,47,4,MOSCOW,161],
    ['Rob A Troop Convoy',108,48,4,MOSCOW,143],
    ['Intercept The Base\'s Pay Shipment',105,49,4,MOSCOW,143],
    ['Travel To The Volga Military District',118,50,4,MOSCOW,161],
    ['Arrange The Sale Of Weapons-Grade Explosives',119,51,4,MOSCOW,158],
    ['Capitalize On An Officer\'s Gambling Problem',107,52,4,MOSCOW,146],
    ['Make Connections With An Arms Dealer',123,53,4,MOSCOW,168],
    ['Transport Some Stolen Military Hardware',125,54,4,MOSCOW,165],
    ['Buy Off The General\'s Command Team',134,55,4,MOSCOW,188],
    ['Stop A Terrorist Attack In Moscow',116,61,5,MOSCOW,159],
    ['Discover Who Was Responsible',124,62,5,MOSCOW,170],
    ['Hunt Down A Ural Liberation Front Contact',215,63,5,MOSCOW,230],
    ['Infiltrate The ULF Cell',132,64,5,MOSCOW,181],
    ['Help "Plan" The Next Attack',121,65,5,MOSCOW,160],
    ['Sabotage The Plan From The Inside',127,66,5,MOSCOW,174],
    ['Discover The Location Of The Next ULF Attack',132,67,5,MOSCOW,181],
    ['Kill A Lookout',127,68,5,MOSCOW,170],
    ['Stop The ULF Attack',131,69,5,MOSCOW,180],
    ['Torture A ULF Lieutenant',120,70,5,MOSCOW,164],
    ['Look For The Boss\' Mountain Hideout',135,71,5,MOSCOW,180],
    ['Start An Avalanche Above The Terrorist Camp',145,72,5,MOSCOW,205],
    ['Foil The Sabotage Of Your Moscow Holdings',130,74,6,MOSCOW,180],
    ['Acquire Classified Files On Crime Syndicates',122,75,6,MOSCOW,169],
    ['Gun Down Some Russian Muscle',238,76,6,MOSCOW,258],
    ['Attack A Mafiya Business',136,77,6,MOSCOW,188],
    ['Hijack A Mafiya Cargo',134,78,6,MOSCOW,179],
    ['Threaten A Mafiya Moneyman\'s Family',128,79,6,MOSCOW,176],
    ['Burn Down A Vory Safehouse',136,80,6,MOSCOW,188],
    ['Hit A Vory Nightclub',128,81,6,MOSCOW,171],
    ['Break Into An Architect\'s Office',134,82,6,MOSCOW,185],
    ['Take Over A West-Bound Trafficking Pipeline',140,83,6,MOSCOW,194],
    ['Ship Black-Market Caviar To London',137,84,6,MOSCOW,189],
    ['Assault The Mansion Walls',148,85,6,MOSCOW,211]
  );

  var missionTabs = [];
  missionTabs[NY] = new Array(
    'Street Thug (Levels 1-4)',
    'Associate (Levels 5-8)',
    'Soldier (Levels 9-12)',
    'Enforcer (Levels 13-17)',
    'Hitman (Levels 18-24)',
    'Capo (Levels 25-34)',
    'Consigliere (Levels 35-59)',
    'Underboss (Levels 60-99)',
    'Boss (Levels 100+)'
  );
  missionTabs[CUBA] = new Array(
    'El Soldado (Levels 35-59)',
    'El Capitan (Levels 60-84)',
    'El Jefe (Levels 85-109)',
    'El Patron (Levels 110-129)',
    'El Padrino (Levels 130-150)',
    'El Cacique (Levels 151+)'
  );
  missionTabs[MOSCOW] = new Array(
    'Baklany',
    'Boets',
    'Brigadir',
    'Avtoritet',
    'Vor',
    'Pakhan'
  );

  var requirementJob = new Array(
    ['Liquor', 'Distill Some Liquor'],
    ['Tokens', 'Manufacture Tokens'],
    ['Wiretap Device', 'Overtake Phone Central'],
    ['1 Wiretap Device', 'Overtake Phone Central'],
    ['Cards', 'Get Cheating Deck'],
    ['Untraceable Cell Phone', 'Rob an Electronics Store'],
    ['Concealable Camera', 'Rob an Electronics Store'],
    ['Computer Set-Up', 'Rob an Electronics Store'],
    ['Blackmail Photos', 'Obtain Compromising Photos'],
    ['Illegal Transaction Records', 'Steal Bank Records'],
    ['.22 Pistol', 'Beat Up Rival Gangster'],
    ['Revolver', 'Beat Up Rival Gangster'],
    ['9mm Semi-Automatic', 'Rob a Pimp'],
    ['Butterfly Knife', 'Collect Protection Money'],
    ['Brass Knuckles', 'Rough Up Dealers'],
    ['Tactical Shotgun', 'Perform a Hit'],
    ['.45 Revolver', 'Take Out a Rogue Cop'],
    ['C4', 'Destroy Enemy Mob Hideout'],
    ['Stab-Proof Vest', 'Kill a Protected Snitch'],
    ['Automatic Rifle', 'Bust a Made Man Out of Prison'],
    ['Lucky Shamrock Medallion', 'Clip the Irish Mob\'s Local Enforcer'],
    ['Semi-Automatic Shotgun', 'Fight a Haitian Gang'],
    ['Firebomb', 'Steal a Tanker Truck'],
    ['Armored Truck', 'Smuggle Across the Border'],
    ['Grenade Launcher', 'Repel the Yakuza'],
    ['.50 Caliber Rifle', 'Disrupt Rival Smuggling Ring'],
    ['Armored Car', 'Invade Tong-controlled Neighborhood'],
    ['RPG Launcher', 'Sell Guns to the Russian Mob'],
    ['Bodyguards', 'Protect your City against a Rival Family'],
    ['Night Vision Goggles', 'Assassinate a Political Figure'],
    ['Napalm', 'Exterminate a Rival Family'],
    ['Prop plane', 'Steal an Air Freight Delivery'],
    ['Chopper', 'Run a Biker Gang Out of Town'],
    ['Luxury Yacht', 'Influence a Harbor Official'],
    ['GX9', 'Ransom a Businessman\'s Kids'],
    ['Bookie\'s Holdout Pistol', 'Fix the Big Game'],
    ['Multi-Purpose Truck', 'Break Into the Armory'],
    ['BA-12 Assault Rifle', 'Rip Off the Armenian Mob'],
    ['Falsified Documents', 'Take Over an Identity Theft Ring'],
    ['Federal Agent', 'Buy Off a Federal Agent'],
    ['Private Jet', 'Make a Deal with the Mexican Cartel'],
    ['Police Cruiser', 'Blackmail the District Attorney'],
    ['Armoured Limousine', 'Shake Down a City Council Member'],
    ['Cigarette Boat', 'Take Over The Docks'],
    ['TNT', 'Raid The Arms Depot'],
    ['Si-14 Cargo Plane', 'Capture The Airport'],
    ['Armored State Car', 'Storm The Presidential Palace'],
    ['Untraceable Cell Phone', 'Arrange A Drug Shipment for the Mafiya'],
    ['Concealable Camera', 'Smuggle Consumer Electronics for the Vory'],
    ['Dossier on Dmitri', 'Receive Vory Intel On Dmitri'],
    ['Dossier on Dmitri', 'Buy Mafiya Intel On Dmitri'],
    ['Ballistic Knife', 'Silence A Political Critic'],
    ['Severnyy Olen Snowbike', 'Extract A Favor From The Winner'],
    ['Set of Photos of Karpov', 'Kill An Investigative Reporter'],
    ['Set of Photos of Karpov', 'Catch Karpov Accepting A Bribe'],
    ['RAS-15', '"Convince" The Candidate To Withdraw'],
    ['Officer Corps Paycheck', 'Capitalize On An Officer\'s Gambling Problem'],
    ['Officer Corps Paycheck', 'Intercept The Base\'s Pay Shipment'],
    ['Bank Guard Uniform', 'Strip A Uniform Off The Corpse'],
    ['Bank Guard Uniform', '"Borrow" The Guard\'s Uniform After Releasing Him'],
    ['Stick of Dynamite', 'Sabotage The Plan From The Inside'],
    ['Stick of Dynamite','Stop The ULF Attack'],
    ['Mansion Details','Break Into An Architect\'s Office'],
    ['Mansion Details', 'Threaten A Mafiya Moneyman\'s Family']

  );

  // FIXME: Should this be selectable by users?
  // These jobs pays 5, 3, 2, 1 exp respectively.
  var expBurners = [2, 1, 4, 0];

  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
  String.prototype.ltrim = function() {
    return this.replace(/^\s+/, '');
  }
  String.prototype.rtrim = function() {
    return this.replace(/\s+$/, '');
  }
  String.prototype.untag = function() {
    return this.replace(/<[^>]*>/g, '');
  }

  Array.prototype.searchArray = function(target, index) {
    // To use this method, "this" must be an array of arrays. Each array
    // contained in "this" has one of its elements (specified by the
    // "index" parameter) compared against the target parameter. An array
    // is returned that contains the indices of "this" in which a match
    // was found.
    //
    // NOTE: "target" can be a regular expression. If the array element
    //       is a string, it is compared for a pattern match.
    var returnArray = [];
    for (var i = 0, iLength = this.length; i<iLength; ++i) {
      if (typeof(target) == 'function' &&
          typeof(this[i][index]) == 'string') {
        // Assume target is a regex to be matched against the string.
        if (target.test(this[i][index])) {
          returnArray.push(i);
        }
      } else if (this[i][index] === target) {
        returnArray.push(i);
      }
    }
    return returnArray.length? returnArray : false;
  }

  // Array.unique() - Remove duplicate values
  Array.prototype.unique = function() {
    var a = [];
    var l = this.length;
    for (var i=0; i < l; ++i) {
      for (var j = i + 1; j < l; ++j) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

  // Check for missing settings.
  if (GM_getValue('autoClick') == undefined) {
    saveDefaultSettings();
    addToLog('info Icon', 'If you want to perform jobs, fighting, and other actions automatically, please adjust your settings.');
  }

  // Check for a version change.
  if (GM_getValue('version') != SCRIPT.version ||
      GM_getValue('build') != SCRIPT.build) {
    handleVersionChange();
  }

  // Set the initial run state.
  if (typeof GM_getValue('isRunning') != 'boolean') {
    // FIXME: Perhaps it should be false, and instead pop up an alert
    //        asking the user to check the settings?
    GM_setValue('isRunning', false);
  }
  running = GM_getValue('isRunning');

  var Reload = new Animate();
  Reload.desc = 'reload';
  var Autoplay = new Animate();
  Autoplay.desc = 'auto-play';
  Autoplay.fx = loadHome;

  // Get player lists.
  var fightListInactive = new PlayerList('fightListInactive');
  var fightListActive   = new PlayerList('fightListActive');
  var fightListNew      = new PlayerList('fightListNew');
  var fightListAvoid    = new PlayerList('fightListAvoid');

  // This line is optional, but it makes the menu display faster.
  customizeMasthead();
  customizeLayout();

  // Add event listeners.
  setListenContent(true);
  setListenFBNotifications(true);
  setListenAutoSkip(true);

  // Make sure the modification timer goes off at least once.
  setModificationTimer();

  var initialized = true;
  DEBUG('Completed initialize.');

  // Check language.
  if (GM_getValue('language') != 'en') {
    DEBUG('Language is "' + GM_getValue('language') + '".');
    addToLog('warning Icon', 'Unfortunately, only the English version of the game is fully supported. If you experience problems, set your Facebook language to English and try again.');
  }
}

function Animate() {
  this.TOUT = null;
  this.desc = '';
  this.fx = null;
  this.delay = null;
}

Animate.prototype.clearTimeout = function() {
  if (this.TOUT) {
    DEBUG('Clearing ' + this.desc + ' timer ' + this.TOUT + '.');
    clearTimeout(this.TOUT);
    this.TOUT = null;
  }
}

Animate.prototype.setTimeout = function(fx, delay) {
  this.clearTimeout();
  this.fx = fx;
  this.delay = delay;
  // Make the handler clear TOUT. This prevents attempts
  // to clear timers that have already gone off.
  var obj = this;
  this.TOUT = window.setTimeout(function () { obj.TOUT = null; fx(); }, delay);
  DEBUG('Started ' + this.desc + ' timer ' + this.TOUT +
        ', delay=' + delay/1000 + ' sec.');
}

Animate.prototype.start = function() {
  if (running && settingsOpen === false) {
    this.setTimeout(this.fx, this.delay);
  } else if (settingsOpen === true) {
    DEBUG('Settings box open. Not starting ' + this.desc + ' timer.');
  } else {
    DEBUG('Autoplayer paused. Not starting ' + this.desc + ' timer.');
  }
}

// Set up auto-reload (if enabled).
autoReload();

if (!refreshGlobalStats()) {
  handleUnexpectedPage();

  // Stop the script. (The timer will still go off and reload.)
  return;
}

refreshSettings();

if (GM_getValue('logOpen') == 'open') {
  showMafiaLogBox();
}
return;

///////////////////////////////////////////////////////////////////////////////
//   End of top-level code. Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////

function doAutoPlay () {
  // Set the default auto-play timer function and delay.
  Autoplay.fx = goHome;
  Autoplay.delay = getAutoPlayDelay();

  var previouslyIdle = idle;
  idle = false;

  //Dont let healing interrupt shake down again
  if (running && shakeDownFlag) {
    if (collectRacket()) return;
  }

  if (running) {
    if (autoHelp()) return;
  } 

  // Auto-heal
  if (running &&
      isChecked('autoHeal') &&
      health < GM_getValue('healthLevel', 0) &&
      health < maxHealth &&
      (health > 19 || (SpendStamina.canBurn && stamina > 0) || canForceHeal())) {
    autoHeal();
    return;
  }

  // Check top mafia bonus
  if (running && (!timeLeftGM('topMafiaTimer') || isUndefined('selectEnergyBonus') || isUndefined('selectExpBonus'))) {
    getTopMafiaInfo();
  }

  // Determine whether a job and/or fight/hit could be attempted.
  var autoMissionif = running && canMission();
  var autoStaminaSpendif = running && !skipStaminaSpend && canSpendStamina();
  var energyMaxed = (autoMissionif && energy >= maxEnergy);
  var staminaMaxed = (autoStaminaSpendif && stamina >= maxStamina);
  var maxed = energyMaxed || staminaMaxed;

  // Check if energy / stamina burning is prioritized
  if (isChecked('burnFirst') && !maxed && (autoMissionif || autoStaminaSpendif)) {
    var spendFirst = GM_getValue('burnOption');
    if (autoMissionif && spendFirst == BURN_ENERGY) autoStaminaSpendif = false;
    if (autoStaminaSpendif && spendFirst == BURN_STAMINA) autoMissionif = false;
  }

  // Auto-accept
  if (running && !maxed && invites > 0 &&
      isChecked('acceptMafiaInvitations')) {
    if (autoAccept()) return;
  }

  // Click attack if on warNav
  if (running && onWarNav() && (isChecked('autoWar') || helpWar )) {
    if (autoWarAttack()) return;
  }

  // Player updates
  if (running && !maxed && isChecked('logPlayerUpdates')) {
    if (autoPlayerUpdates()) return;
  }

  // Racketing
  if (running && !maxed && isChecked('racketCollect') && !timeLeftGM('nextRacket')) {
    if (collectRacket()) return;
  }

  // Auto-take for properties (NY)
  if (running && !maxed && isChecked('collectNYTake') && !timeLeftGM('nextNYTake')) {
      if (collectNYTake()) return;
  }

  // Auto-bank flag
  var canBank = isChecked(cities[city][CITY_AUTOBANK]) && !suspendBank &&
                cities[city][CITY_CASH] >= parseInt(GM_getValue(cities[city][CITY_BANKCONFG]));

  // Auto-sell business output
  if (running && !maxed) {
    for (var i = 0, iLength = cities.length; i < iLength; ++i) {
      if (level >= cities[i][CITY_LEVEL] &&
          isChecked(cities[i][CITY_SELLCRATES]) &&
          GM_getValue('sellHour' + cities[i][CITY_NAME], -1) != new Date().getHours()) {

        // Deposit first if selling output on another city
        if (city != i && canBank) if (autoBankDeposit()) return;

        // Sell crates
        if (autoSellCrates(i)) return;
      }
    }
  }

  // Auto-bank
  if (running && !maxed && canBank) {
    if (autoBankDeposit()) return;
  }

  // Auto-stat
  if (running && !maxed && stats > 0 && isChecked('autoStat') && !parseInt(GM_getValue('restAutoStat')) ) {
    if (autoStat()) return;
  }

  // Auto-buy properties
  if (running && !maxed && isChecked('autoBuy')) {
    if (propertyBuy()) return;
  }

  // Auto-lotto
  if (running && !maxed && isChecked('autoLottoOpt')) {
    if (autoLotto()) return;
  }

  // Auto-war
  if (running && !maxed && isChecked('autoWar')) {
    if (autoWar()) return;
  }

  // Auto-giftwaiting
  if (running && !maxed && GM_getValue('autoGiftWaiting')) {
    if (autoGiftWaiting()) return;
  }

  // Auto-energypack
  var ptsFromEnergyPack = maxEnergy * 1.25 * getEnergyGainRate();
  var ptsToLevelProjStaminaUse = ptsToNextLevel - stamina*getStaminaGainRate();
  var autoEnergyPackWaiting = running && energyPack &&
                              ptsFromEnergyPack <= ptsToLevelProjStaminaUse &&
                              isChecked('autoEnergyPack');

  if (autoEnergyPackWaiting && energy <= 2) {
    DEBUG('ptsToNextLevel=' + ptsToNextLevel +
          'ptsToLevelProjStaminaUse=' + ptsToLevelProjStaminaUse);
    addToLog('energyPack Icon', 'This energy pack should give you approximately ' + parseInt(ptsFromEnergyPack) + ' xp of your ' + parseInt(ptsToLevelProjStaminaUse) + ' projected remaining xp.' );

    if (!energyPackElt){
      DEBUG('Cant find energy pack to click');
    } else {
      Autoplay.fx = function() {
        clickAction = 'energypack';
        clickElement(energyPackElt);
        DEBUG('Clicked to use energy pack');
      }
      Autoplay.start();
      return;
    }
  }

  // Do jobs or fight/hit. Give priority to spending stamina if it needs
  // to be burned and using one won't level up. Give priority to jobs if
  // within one stamina of leveling, or if an energy pack is waiting, or
  // if energy is fuller than than stamina (in percentage terms)
  // Prioritize burning of energy if level-up within reach.
  if ((autoMissionif && SpendEnergy.canBurn) || (autoMissionif &&
       !(autoStaminaSpendif && SpendStamina.canBurn && ptsToNextLevel > 6) &&
       (ptsToNextLevel <= 6 || autoEnergyPackWaiting || energy/maxEnergy >= stamina/maxStamina))) {
    autoMission();
    return;
  }
  if (autoStaminaSpendif) {
    if (autoStaminaSpend()) return;

    // Attempt failed. Let some other action happen before trying again
    skipStaminaSpend = true;
  }
  if (autoMissionif) {
    autoMission();
    return;
  }

  // Auto-send energy pack
  if (running && isChecked('sendEnergyPack')) {
    if (autoSendEnergyPack()) return;
  }

  // If we reach this point, the script is considered to be idle. Anything the
  // script might do when there is nothing else to do should go below here.
  idle = true;

  // If not previously idle, check the home page.
  if (running && !previouslyIdle) {
    DEBUG('Now idle. Checking the home page.');
    Autoplay.fx = goHome;
    Autoplay.start();
    return;
  }

  // If fight/hit is being skipped, turn it back on and go to the home page
  if (running && staminaFlag && skipStaminaSpend) {
    skipStaminaSpend = false;
    staminaFlag = false;
    Autoplay.start();
    return;
  }

  // Idle in preferred city
  if (running && idle && isChecked('idleInCity') && city != GM_getValue('idleLocation', NY)) {
    DEBUG('Idling. Moving to ' + cities[GM_getValue('idleLocation', NY)][CITY_NAME] + '. ');
    if ((level < 35) && (GM_getValue('idleLocation', NY) == CUBA)) {
      addToLog('warning Icon', 'WARNING: Current level does not allow travel to Cuba.');
      DEBUG('Idling. Staying in NY.');
    } else if ((level < 70) && (GM_getValue('idleLocation', NY) == MOSCOW)) {
      addToLog('warning Icon', 'WARNING: Current level does not allow travel to Moscow.');
      DEBUG('Idling. Staying in NY.');
    } else {
      goLocation(GM_getValue('idleLocation',NY));
    }
    return;
  }
}

function getAutoPlayDelay() {
  return Math.floor(parseFloat(GM_getValue('d1', '3')) + parseFloat((GM_getValue('d2', '5'))-parseFloat(GM_getValue('d1', '3')))*Math.random())*1000;
}

function autoReload() {
  if (isChecked('autoClick')) {
    Reload.fx    = function() {
      // Try the "nice" way first, but reload completely if that doesn't work.
      goHome();
      Reload.fx = loadHome;
      Reload.delay = 10000;
      Reload.start();
    };
    Reload.delay = Math.floor(parseFloat(GM_getValue('r1', '30')) +
                   parseFloat((GM_getValue('r2', '110')) -
                   parseFloat(GM_getValue('r1', '30')))*Math.random())*1000;
    Reload.start();
  }
}

function onMafiaWarsApp() {
  // Return true if we're on the home page, false otherwise.
  if (window.location.href == 'http://www.facebook.com/home.php?filter=app_10979261223') {
    return true;
  }
  return false;
}

function autoHelp() {
  // Make sure we're on the home page.
  if (!onMafiaWarsApp()) {
    alert('redirecting to fb page.');
    document.location = 'http://www.facebook.com/home.php?filter=app_10979261223';
    return true;
  }
  
  // do stuff here
  alert('autoHelp()');

  // Make sure we're on the home page.
  if (!onHome()) {
    alert('done with autohelp');
    loadHome();
    return true;
  }

  // return false if there's no more help
  return false;
}

function autoAccept() {
  // Load My Mafia
  if (!onMyMafiaNav()) {
    Autoplay.fx = goMyMafiaNav;
    Autoplay.start();
    return true;
  }

  // Get the "accept all" link.
  elt = xpathFirst('.//a[contains(., "accept all")]', innerPageElt);
  if (!elt) {
    DEBUG('Can\'t find accept link to click. Using fallback method.');
    loadAccept();
    return true;
  }

  // Accept all invitations.
  Autoplay.fx = function() {
    clickAction = 'accept';
    clickElement(elt);
    DEBUG('Clicked to accept.');
  };
  Autoplay.start();
  return true;
}

function autoSendEnergyPack() {
  if (timeLeftGM('energyAllTimeLeft') > 0) return false;

  // Make sure we're on the home page.
  if (!onHome()) {
    Autoplay.fx = goHome;
    Autoplay.start();
    return true;
  }

  // Reset the timer.
  setGMTime('energyAllTimeLeft','1 hour');

  // Send energy packs.
  var sendPackButton = xpathFirst('.//div[@class="energy_all_prompt"]//a[contains(., "Send")]', innerPageElt);
  if (sendPackButton) {
    clickElement(sendPackButton);
    addToLog('info Icon','You have sent energy packs to your Mafia.');
    return true;
  } else {
      DEBUG('WARNING: Can\'t find inner button to send mafia energy pack.');
      return false;
  }

  return false;
}

function autoHeal() {
  // NOTE: In the interest of time, delays are waived.
  Autoplay.delay = 0;

  // Make sure we're in the preferred city.
  var healLocation = parseInt(GM_getValue('healLocation', NY));

  if (healLocation != cities.length && city != healLocation) {
    Autoplay.fx = function() { goLocation(healLocation); }
    Autoplay.start();
    return;
  }

  // Use our custom instant-heal element (if present).
  healElt = xpathFirst('.//a[contains(., "Heal your character")]', innerPageElt);
  if (!healElt) {
    var healElt = document.getElementById('ap_heal');
    if (!healElt) {
      DEBUG('WARNING: Can\'t find instant-heal link.');
      // Go to the hospital.
      var hospitalElt = xpathFirst('//a[@class="heal_link"]');
      if (hospitalElt) {
        Autoplay.fx = function() {
          clickElement(hospitalElt);
          DEBUG('Clicked to go to hospital.');
        };
        Autoplay.start();
      } else {
        addToLog('warning Icon', 'WARNING: Can\'t find hospital link.');
      }
      return;
    }
  }

  // Found a heal link. Click it.
  Autoplay.fx = function() {
    clickAction = 'heal';
    clickElement(healElt);
    DEBUG('Clicked to heal.');
  };
  Autoplay.start();

  return;
}

function autoSellCrates(sellCity) {
  // Go to the correct city.
  if (city != sellCity) {
    Autoplay.fx = goLocation(sellCity);
    Autoplay.start();
    return true;
  }

  // Go to the businesses.
  if (!xpathFirst('.//div[@class="business_description"]', innerPageElt)) {
    Autoplay.fx = goBusinessesNav;
    Autoplay.start();
    return true;
  }

  // Sell anything we can.
  elt = xpathFirst('.//div[@class="business_sell_row"]/div[@class="business_sell_button"]//a', innerPageElt);
  if (elt) {
    Autoplay.fx = function() {
      clickAction = 'sell output';
      clickElement(elt);
      DEBUG('Clicked to sell output.');
    };
    Autoplay.start();
    return true;
  }

  // Nothing to sell.
  GM_setValue('sellHour' + cities[sellCity][CITY_NAME], new Date().getHours());
  DEBUG('All business output in ' + cities[sellCity][CITY_NAME] + ' sold. Checking again in an hour.');

  // Visit home after selling all output
  Autoplay.fx = goHome;
  Autoplay.start();
  return true;
}

// Collect Racket
function collectRacket() {
  // Go to NY first
  if (city != NY) {
    Autoplay.fx = goNY;
    Autoplay.start();
    return true;
  }

  if (!onPropertyNav()) {
    if (onRacketNav()) {
      //addToLog('info Icon', 'Check racket');
      if(isChecked('racketReshakedown')) {
        var elt = xpathFirst('.//a/span[@class="sexy_influence" and contains(.,"Shake Down Again")]', innerPageElt);
        if(elt) {
          shakeDownFlag= false;
          //<div class="zy_progress_bar_outer" title=""><div class="zy_progress_bar_text">100% Mastered</div>
          var mastered=xpathFirst('.//div[@class="zy_progress_bar_text" and contains(.,"100% Mastered")]', innerPageElt);
          if(mastered && !isChecked('racketPermanentShakedown')) {
            addToLog('info Icon', 'Racket is 100% mastered');
            return false;
          } else {
            Autoplay.fx = function() {
              clickAction = 'shakedown again';
              addToLog('info Icon', 'Shake down again');
              clickElement(elt);
            };
            Autoplay.start();
          }
          return true;
        }
      }
      //<a><div class="zy_progress_bar_outer" title=""><div class="zy_progress_bar_text">

      elt = xpathFirst('.//a/div[@class="zy_progress_bar_outer"]/div[@class="zy_progress_bar_text" and contains(.,"Ready to Collect")]', innerPageElt);
      if(elt) {
        if(isChecked('racketReshakedown')) {
          shakeDownFlag= true;
        }
        Autoplay.fx = function() {
          clickAction = 'collect racket';
          addToLog('info Icon', 'Collect racket');
          clickElement(elt);
        };
        Autoplay.start();
        return true;
      } else {
        // no racket comeback again 15 minutes
        setGMTime("nextRacket", "0:15:00");
      }
    } else {
      Autoplay.fx = goPropertyNav;
      Autoplay.start();
      return true;
    }

    return false;
  } else {
   //turning off rackets
   GM_setValue("racketReshakedown", 0);
   GM_setValue("racketPermanentShakedown", 0);
   GM_setValue("racketCollect", 0);
   DEBUG("Turning off racket options. We're on properties page.");
  }
}

// Collect NY take
function collectNYTake() {
  // Go to the correct city.
  if (city != NY) {
    Autoplay.fx = goNY;
    Autoplay.start();
    return true;
  }

  if (!onRacketNav()) {
    if (onPropertyNav()) {
      var takeTimer = xpathFirst('.//span[@id="prop_eng_timer_span"]', innerPageElt);
      if (takeTimer) {
        var prodReadyIn = timeLeft(takeTimer.innerHTML);
        if (prodReadyIn == 0 || prodReadyIn >= 10500) { //If the timer says between 0 or 2:55:00
          var elt = xpathFirst('.//a[contains(., "Collect take")]', innerPageElt);
          if (elt) {
            Autoplay.fx = function() {
              clickAction = 'collect ny take';
              clickElement(elt);
              DEBUG('Collecting NY Take');
              setGMTime("nextNYTake", "3:00:00");
              if (GM_getValue("tempAutoBuy")) {
                GM_setValue("autoBuy", GM_getValue("tempAutoBuy"));
                GM_setValue("tempAutoBuy", 0);
                DEBUG("Turning auto buy back on.");
              }
            };
            Autoplay.start();
            return true;
          } else {
            // Nothing to collect.
            setGMTime("nextNYTake", takeTimer.innerHTML);
            var d = new Date();
            d.setMilliseconds(0);
            d.setTime(d.getTime()+(timeLeft(takeTimer.innerHTML)*1000));
            DEBUG('The take has been collected. Coming back at: ' + d);
            return false;
          }
        } else {
          //It's more than 5 minutes after a take being ready, so we'll come back when the next take is ready.
          setGMTime("nextNYTake", takeTimer.innerHTML);
          var d = new Date();
          d.setMilliseconds(0);
          d.setTime(d.getTime()+(timeLeft(takeTimer.innerHTML)*1000));
          DEBUG('Take will be available at: ' + d);
          if (GM_getValue("autoBuy")) {
            GM_setValue("tempAutoBuy", GM_getValue("autoBuy"));
            GM_setValue("autoBuy", 0);
            DEBUG('Turning auto buy off till next take is collected.');
          }
          return false;
        }
      } else {
        //Disabling collect NY take
        GM_setValue("collectNYTake", 0);
        DEBUG('Turning off collect NY Take. Player does not have take timer.')
      }
    } else {
      Autoplay.fx = goPropertyNav;
      Autoplay.start();
      return true;
    }
  } else {
    GM_setValue("collectNYTake", 0);
    DEBUG('Turning off collect NY Take. Player does not have take timer.')
  }
}

function autoPlayerUpdates() {
  // Get the updates.
  var pUpdates = xpath('.//div[@class="update_item"]', innerPageElt);
  var pUpdatesLen = pUpdates.snapshotLength;
  var logPlayerUpdatesCount = GM_getValue('logPlayerUpdatesCount');
  if (logPlayerUpdatesCount == undefined) {
    // The settings must have been cleared. Assume all updates were read.
    logPlayerUpdatesCount = pUpdatesLen;
    GM_setValue('logPlayerUpdatesCount', logPlayerUpdatesCount);
  }

  // Are there are less updates than we've already seen?
  // FIXME: This could be better. Need to also detect the case where we are
  //        on the home page with zero updates showing and a non-zero count.
  if (pUpdatesLen > 0 && logPlayerUpdatesCount > pUpdatesLen) {
    // The player updates must have been cleared.
    DEBUG('Player updates were unexpectedly cleared.');
    logPlayerUpdatesCount = 0;
    GM_setValue('logPlayerUpdatesCount', 0);
  }

  // Process new updates.
  if (logPlayerUpdatesCount < pUpdatesLen) {
    DEBUG('Parsing new player updates.');
    for (var i = pUpdatesLen - logPlayerUpdatesCount - 1; i >= 0; i--) {
      if (!parsePlayerUpdates(pUpdates.snapshotItem(i))) return true;
      GM_setValue('logPlayerUpdatesCount', ++logPlayerUpdatesCount);
    }
  }

  // Clear the updates.
  if (pUpdatesLen > GM_getValue('logPlayerUpdatesMax', 20) &&
      logPlayerUpdatesCount == pUpdatesLen) {
    Autoplay.fx = goDeleteNews;
    Autoplay.start();
    return true;
  }

  return false;
}

function autoStat() {
  // Load profile
  if (!onProfileNav()) {
    Autoplay.fx = goMyProfile;
    Autoplay.start();
    return true;
  }

  if (onProfileNav()) {
    // Array containers for status settings
    var curStats = [curAttack,curDefense,maxHealth,maxEnergy,maxStamina,maxInfluence];
    var modeStats = [level,curAttack,curDefense,maxHealth,maxEnergy,maxStamina,maxInfluence];
    var statFallbacks = new Array(curStats.length);

    var maxPtDiff = 0;
    var statIndex = 0;
    var statPrio = autoStatPrios.length;
    for (var i = 0, iLength = curStats.length; i < iLength; ++i) {
      // Calculate the Points needed to reach target stat
      var ratio = new Number(GM_getValue(autoStatRatios[i]));
      var base = new Number(GM_getValue(autoStatBases[i]));
      var curStatPrio = new Number(GM_getValue(autoStatPrios[i]));
      var curStatDiff = Math.max (0, ratio * modeStats[GM_getValue(autoStatModes[i])] + base - curStats[i]);

      // Account for priority
      if ((curStatDiff > 0 && curStatPrio < statPrio) || (curStatDiff > maxPtDiff && curStatPrio <= statPrio)) {
        maxPtDiff = curStatDiff;
        statIndex = i;
        statPrio = curStatPrio;
      }

      // Fallback method
      statFallbacks[i] = isChecked(autoStatFallbacks[i]) ? i : '';
    }

    // Disable auto-stat when status goals are reached and autoStatDisable is checked
    if (maxPtDiff <= 0 && isChecked('autoStatDisable')) {
      addToLog('info Icon', 'All status goals met, please update your goals.');
      GM_setValue('autoStat', 0);
      return false;
    }

    // Increment the status corresponding to the nextStat variable (fallback)
    if (maxPtDiff <= 0) {
      if (statFallbacks.join('') != '') {
        DEBUG('Status GOALS reached, using fallback method.');
        var nextStat = parseInt(GM_getValue('nextStat', ATTACK_STAT));

        // Search for next Stat to increment
        while (statFallbacks.indexOf(nextStat) == -1)
          nextStat = (nextStat + 1) % curStats.length;

        DEBUG('Next stat in fallback mode: ' + autoStatDescrips[nextStat + 1]);
        statIndex = nextStat;
      } else {
        // Do not call autoStat until next level Up
        DEBUG('Status GOALS reached, waiting till next level up.');
        GM_setValue('restAutoStat', 1);
        return false;
      }
    } else {
      DEBUG('Next stat to increment : ' + autoStatDescrips[statIndex + 1] + ' (' + maxPtDiff + ' points to goal) ');
      GM_setValue('restAutoStat', 0);
    }

    // Add stats to the attribute farthest from the goal
    // (or the nextStat if fallback kicked in)
    var upgradeElt;
    switch (statIndex) {
      case ATTACK_STAT    : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=attack")]', innerPageElt);         break;
      case DEFENSE_STAT   : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=defense")]', innerPageElt);        break;
      case HEALTH_STAT    : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=max_health")]', innerPageElt);     break;
      case ENERGY_STAT    : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=max_energy")]', innerPageElt);     break;
      case INFLUENCE_STAT : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=max_influence"])', innerPageElt);  break;
      case STAMINA_STAT   : upgradeElt = xpathFirst('.//a[contains(@href,"upgrade_key=max_stamina")]', innerPageElt);    break;

      default             :
        // Disable auto-stats when maxPts calculated is NaN
        GM_setValue('autoStat', 0);
        addToLog('warning Icon', 'BUG DETECTED: Invalid calculated maxPts value "' + maxPts + '". Auto-stat disabled.');
        return false;
    }

    if (!upgradeElt){
      DEBUG('Couldnt find link to upgrade stat.');
      return false;
    }

    // Use click simulation
    Autoplay.fx = function() {
      clickAction = 'stats';
      clickElement(upgradeElt);
      DEBUG('Clicked to upgrade: ' + autoStatDescrips[statIndex + 1]);
    }
    Autoplay.start();
    return true;
  } else {
    // Disable auto-stats when profile page cannot be loaded
    GM_setValue('autoStat', 0);
    addToLog('warning Icon', 'BUG DETECTED: Unable to load Profile page, autostat disabled.');
  }
}

// Calculate job cost and reward
function calcJobinfo() {
  var energyBonus = 1 - (GM_getValue('selectEnergyBonus', 0) / 100);
  var expBonusMultiplier = 1 + (GM_getValue('selectExpBonus', 0) / 100);
  missions.forEach(function(mission) {
    var cost = mission[1];
    if (cost > 5) {
      // Adjust for energy bonus.
      cost = Math.floor(cost * energyBonus);
    }
    var reward = mission[5];
    if (isChecked('hasPrivateIsland')) {
      // Adjust for private island.
      reward = Math.round(reward * 1.05);
    }
    // Adjust for mastermind.
    reward = Math.floor(reward * expBonusMultiplier);
    //var job_ratio = Math.round(reward / cost * 100) / 100;
    mission[6] = reward;
    //mission[7] = job_ratio;
    mission[8] = cost;
  });
  didJobCalculations = true;
}

// Get reward to cost ratio:
function calcJobratio(job) {
  if (!didJobCalculations) calcJobinfo();
  return Math.round(missions[job][6] / missions[job][8] * 100) / 100;
}

// Retreive if and how much energy can be salvaged for the next level (eg after spending an energy pack)
function canSalvageEnergy(job) {
  if (energy <= maxEnergy) return false;
  if (!didJobCalculations) calcJobinfo();
  var amount = energy - (Math.ceil((lvlExp - curExp) / missions[job][6]) * missions[job][8]) - maxEnergy;
  if (amount > 0) return amount;
  else return false;
}

function canMission() {
  if (!isChecked('autoMission')) return false;

  if (!didJobCalculations) calcJobinfo();
  if (isChecked('multipleJobs') &&
      getSavedList('jobsToDo').length == 0) {

    var availableJobs = eval(GM_getValue("availableJobs", "({0:{},1:{},2:{}})"));
    var masteredJobs = eval(GM_getValue("masteredJobs", "({0:{},1:{},2:{}})"));
    var expLeft = lvlExp - curExp;
    var ratio = Math.round(expLeft / energy * 100) / 100;
    var multiple_jobs_list = getSavedList('selectMissionMultiple');
    var multiple_jobs_ratio_sorted = [];
    var jobs_selection = [];
    var singleJobLevelUp = [];
    var enoughEnergy = false;
    var canSalvage = false;

    // mission mastery code
    var mastery_jobs_list = getSavedList('masteryJobsList');
    for (var i=0, iLength=mastery_jobs_list.length; i < iLength; ++i) {
      // Filters jobs on the ignorelist
      var job = mastery_jobs_list[i];

      // Only push jobs that does not exist on the main list
      if (multiple_jobs_list.indexOf(job) == -1) {
        multiple_jobs_list.push(job);
        // Tag job as mastery
        missions[job][9] = true;
      }
    }

    for (var i=0, iLength= multiple_jobs_list.length; i < iLength; ++i) {
      var job = multiple_jobs_list[i];
      var mission = missions[job];
      // This should enable us to use mastery jobs for single job level ups
      var singleJobLevelUpPossible = false;

      // Ignore jobs that are not yet available
      if (availableJobs[mission[4]][mission[3]] != null &&
         availableJobs[mission[4]][mission[3]].indexOf(parseInt(job)) == -1) {
        continue;
      }

      // Determine the job's experience-to-energy ratio.
      mission[7] = calcJobratio(job);
      if (mission[8] <= energy) {
        enoughEnergy = true;
        if (mission[6] >= expLeft) {
          singleJobLevelUp.push(job);
          singleJobLevelUpPossible = true;
        }
      }

      // Ignore mastered jobs unless it can do a single job level up
      if (masteredJobs[mission[4]][mission[3]] != null &&
          masteredJobs[mission[4]][mission[3]].indexOf(parseInt(job)) != -1 &&
          singleJobLevelUpPossible == false) {
        continue;
      }

      // Can salvage energy with this job
      if (!canSalvage && canSalvageEnergy(job)) canSalvage = true;
      multiple_jobs_ratio_sorted.push(job);
    }

    multiple_jobs_ratio_sorted.sort(function(a, b) { return missions[b][7] - missions[a][7]; });
    if (!enoughEnergy) return false;

    var doJob;

    // Don't do expBurners or biggest exp job if energy can be salvaged
    if (singleJobLevelUp.length > 0 && !canSalvage) {
      singleJobLevelUp.sort(function(a, b) { return missions[b][6] - missions[a][6]; });
      // One job is enough to level up. Pick the one that pays the most.
      doJob = singleJobLevelUp[0];

      if (isChecked('endLevelOptimize')) {
        // Burn up exp before leveling up to maximize energy
        for (var i=0, iLength=expBurners.length; i < iLength; ++i) {
          var expBurner = expBurners[i];
          if ( (energy - missions[singleJobLevelUp[0]][8]) > missions[expBurner][8] &&
             expLeft > Math.floor(missions[expBurner][6] * 1.5) ) {
            doJob = expBurner;
            break;
          }
        }
      }
    } else {
      // Can't level up. Pick a job we can do whose ratio is high enough.
      for (var i=0; i < multiple_jobs_ratio_sorted.length; i++) {
        if (energy >= missions[multiple_jobs_ratio_sorted[i]][8] &&
            ratio <= missions[multiple_jobs_ratio_sorted[i]][7]) {
          jobs_selection.push(multiple_jobs_ratio_sorted[i]);
        }
      }
      if (jobs_selection.length == 0) {
        // No jobs meet the ratio necessary to level up. Go with the highest.
        doJob = multiple_jobs_ratio_sorted[0];
      } else {
        // Pick the one with the lowest ratio.
        if (!canSalvage) {
          doJob = jobs_selection[jobs_selection.length-1];
        // Energy can be salvaged, pick the one with the highest ratio
        } else {
          doJob = jobs_selection[0];
        }
      }
    }
    if (GM_getValue('selectMission') != doJob) {
      if (doJob == undefined) {
        addToLog('info Icon', 'No jobs selected. Disabling automission.');
        GM_setValue('autoMission', 0);
        return false;
      } else {
        addToLog('info Icon', 'Switching job to ' + missions[doJob][0] + '.');
        GM_setValue('selectMission', doJob);
      }
    }
  }

  if (energy < calcEnergyCost()) {
    DEBUG('Skipping jobs: energy=' + energy + ', cost=' + calcEnergyCost());
    return false;
  }

  // If spending energy will set energy below Energy floor, skip jobs
  var nextJobEnergy =  missions[GM_getValue('selectMission', 1)][8];
  if (energy - nextJobEnergy < SpendEnergy.floor && !SpendEnergy.canBurn) {
    DEBUG('Not spending energy: energy=' + energy +
          ', floor=' + SpendEnergy.floor +
          ', nextJobEnergy=' + nextJobEnergy +
          ', burn=' + SpendEnergy.canBurn);
    return false;
  }

  if (energy < SpendEnergy.ceiling && !SpendEnergy.canBurn &&
      !GM_getValue('useEnergyStarted')) {
    DEBUG('Rebuilding energy: energy=' + energy +
          ', ceiling=' + SpendEnergy.ceiling + ', burn=' + SpendEnergy.canBurn);
    return false;
  }

  return true;
}

function autoMission() {
  var jobno       = missions[GM_getValue('selectMission', 1)][2];
  var tabno       = missions[GM_getValue('selectMission', 1)][3];
  var cityno      = missions[GM_getValue('selectMission', 1)][4];

  if (SpendEnergy.floor &&
      isChecked('allowEnergyToLevelUp') &&
      GM_getValue('autoEnergyBurn') !== SpendEnergy.canBurn) {
    GM_setValue('autoEnergyBurn', SpendEnergy.canBurn);
    if (SpendEnergy.canBurn) {
      addToLog('process Icon', energyIcon + '<span style="color:#009966; font-weight: bold;">Burning through energy reserve to level up.</span>');
    } else {
      DEBUG('Not within reach of a level up. Energy burning is off.');
    }
  }

  // Go to the correct city.
  if (city != cityno) {
    Autoplay.fx = function() { goLocation(cityno); };
    Autoplay.start();
    return;
  }

  // Go to the correct job tab.
  if (!onJobTab(tabno)) {
    Autoplay.fx = function() { goJobTab(tabno); };
    Autoplay.start();
    return;
  }

  // Buy requirements first, if any
  if (buyJobRowItems(innerPageElt)) {
    Autoplay.delay = 0;
    Autoplay.start();
    return;
  }

  // Do the job
  Autoplay.fx = function() { goJob(jobno); };
  Autoplay.start();
}

function currentJobTab() {
  var elt = xpathFirst('.//li[contains(@class, "tab_on")]//a', innerPageElt);
  if (!elt || !elt.getAttribute('onclick').match(/tab=(\d+)/)) {
    return -1;
  }
  return parseInt(RegExp.$1);
}

function onJobTab(tabno) {
  return currentJobTab() == parseInt(tabno) ? true : false;
}

function canForceHeal() {
  if(!isChecked('hideInHospital'))
    return true;

  // Heal when stamina can be spent
  if (isChecked('forceHealOpt3') && canSpendStamina(1))
    return true;

  // Heal when stamina is full
  if (isChecked('forceHealOpt4') && stamina >= maxStamina)
    return true;

  // Heal after 5 minutes
  if (isChecked('forceHealOpt5') && GM_getValue('healWaitStarted') && !timeLeftGM('healWaitTime')) {
    return true;
  }

  return false;
}

function canSpendStamina(minHealth) {
  if (!stamina) return false;
  if (!isChecked('staminaSpend')) return false;

  if (!minHealth) {
    // Up to 28 damage can be received in a fight.
    minHealth = 29;
  }

  if (health < minHealth) {
    DEBUG('Not spending stamina: health=' + health + ', minimum=' + minHealth);
    return false;
  }

  if (stamina <= SpendStamina.floor && !SpendStamina.canBurn) {
    DEBUG('Not spending stamina: stamina=' + stamina +
          ', floor=' + SpendStamina.floor + ', burn=' + SpendStamina.canBurn);
    return false;
  }

  if (stamina < SpendStamina.ceiling && !SpendStamina.canBurn &&
      !GM_getValue('useStaminaStarted')) {
    DEBUG('Rebuilding stamina: stamina=' + stamina +
          ', ceiling=' + SpendStamina.ceiling + ', burn=' + SpendStamina.canBurn);
    return false;
  }

  return true;
}

function autoFight(how) {
  // Go to the correct city.
  var loc = GM_getValue('fightLocation', NY);
  if (city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  // Make sure we're on the fight tab.
  if (!onFightTab() && !autoFight.profileSearch) {
    Autoplay.fx = goFightTab;
    Autoplay.start();
    return true;
  }

  // Get an opponent.
  var opponent;
  if (autoFight.profileSearch && onProfileNav()) {
    opponent = autoFight.profileSearch;
    autoFight.profileSearch = undefined;
    lastOpponent = undefined;
    opponent.profileAttack = xpathFirst('.//a[contains(., "Attack")]', innerPageElt);
    DEBUG('Attacking from profile');
  } else if (how == STAMINA_HOW_FIGHT_LIST) {
    var id = parseInt(GM_getValue('fightList', ''));
    if (!id) {
      // The user-specified list is empty or invalid.
      addToLog('warning Icon', 'Can\'t fight because the list of opponents is empty or invalid. Turning automatic fighting off.');
      GM_setValue('staminaSpend', 0);
      return false;
    }
    opponent = new Player();
    opponent.id = String(id);
    DEBUG('Attacking from fight list');
  } else {
    // Check for any new opponents.
    opponent = findFightOpponent(innerPageElt);
    DEBUG('Attacking from find fight list');

    // For stealth mode fights, if we don't have a new opponent then
    // choose one of the inactive opponents we've already fought.
    if ((!opponent || opponent === -1) &&
        isChecked('fightStealth')) {
      var l = fightListInactive.get();
      if (l.length) {
        opponent = l[Math.floor(Math.random() * l.length)];
        opponent.profileAttack="";//stop TOS screen
        DEBUG('Attacking from inactive list');
      }
    }

    if (opponent === -1) {
      DEBUG('No opponents even after seeing the fight list.');
      return false;
    }

    if (!opponent) {
      // Go to the fight list to find opponents.
      addToLog('process Icon', 'No opponents. Going to fight list.');
      Autoplay.fx = goFightNav;
      Autoplay.start();
      return true;
    }
  }
  if (!opponent) return false;

  var attackElt = opponent.profileAttack;
  if (!attackElt && opponent.attack && opponent.attack.scrollWidth > 0) {
    attackElt = opponent.attack;
  }

  // Just click the "Attack Again" button if it's there
  if (lastOpponent && lastOpponent.attackAgain && opponent.match(lastOpponent)) {
    attackElt = lastOpponent.attackAgain;
    DEBUG('Clicking "Attack Again"!');
  }

  if (!attackElt) {
    if (opponent.id && !onProfileNav()) {
      // Go to the opponent's profile.
      autoFight.profileSearch = opponent;
      Autoplay.fx = goProfileNav(opponent);
      Autoplay.start();
      return true;
    }
    DEBUG('No way to attack opponent, id=' + opponent.id);
    return false;
  }

  // Attack!
  Autoplay.fx = function() {
    clickAction = 'fight';
    clickContext = opponent;
    clickElement(attackElt);
    DEBUG('Clicked to fight: name=' + opponent.name +
          ', id=' + opponent.id + ', level=' + opponent.level +
          ', mafia=' + opponent.mafia);
  };
  Autoplay.delay = getAutoPlayDelay();
  Autoplay.start();

  return true;
}

function autoHitman() {
  // Go to the correct city.
  var loc = GM_getValue('hitmanLocation', NY);
  if (city != loc) {
    Autoplay.fx = function() { goLocation(loc); };
    Autoplay.start();
    return true;
  }

  // Make sure we're on the hitlist tab.
  if (!onHitlistTab()) {
    Autoplay.fx = goHitlistTab;
    Autoplay.start();
    return true;
  }

  // Get the list of targets.
  var opponents = getHitlist(innerPageElt);
  if (!opponents) return false;

  // Get the targets that are acceptable.
  DEBUG('Applying criteria to displayed targets.');
  var blacklist = getSavedList('hitmanListAvoid').concat(getSavedList('fightListAvoid'));
  var bountyMin = parseCash(GM_getValue('hitmanBountyMin', 0));
  var avoidNames = isChecked('hitmanAvoidNames');
  var blacklistCount = 0;
  var bountyCount = 0;
  var namesCount = 0;
  var opponentsQualified = [];
  for (var i = 0, iLength=opponents.length; i < iLength; i++) {
    var opponent = opponents[i];
    if (blacklist.indexOf(opponent.id) != -1) {
      blacklistCount++;
      continue;
    }
    var bounty = parseCash(opponent.bounty);
    if (bounty && bounty < bountyMin) {
      bountyCount++;
      continue;
    }
    if (avoidNames && isFamily(decodeHTMLEntities(opponent.name))) {
      namesCount++;
      continue;
    }
    opponentsQualified.push(opponent);
  }
  DEBUG(bountyCount + ' disqualified on bounty, ' +
        namesCount + ' on name, ' + blacklistCount + ' on blacklist.');

  if (!opponentsQualified.length) return false;

  // Pick a target based on saved settings.
  var bountyIndex = 0;

  switch (GM_getValue('bountySelection', BOUNTY_HIGHEST_BOUNTY)) {
    case BOUNTY_LONGEST_TIME:
      bountyIndex = (opponentsQualified.length - 1);
      break;

    case BOUNTY_HIGHEST_BOUNTY:
      var bigBounty = 0;
      for (var i = 0, iLength=opponentsQualified.length; i < iLength; i++) {
        if (parseCash(opponentsQualified[i].bounty) > bigBounty) {
          bountyIndex = i;
          bigBounty = parseCash(opponentsQualified[i].bounty)
        }
      }
      break;

    case BOUNTY_RANDOM:
      bountyIndex = Math.floor(Math.random() * opponentsQualified.length);
      break;

    case BOUNTY_SHORTEST_TIME:
    default:
      bountyIndex = 0;
  }
  Autoplay.fx = function() {
    clickAction = 'hitman';
    clickContext = opponentsQualified[bountyIndex];
    clickElement(clickContext.attack);
    DEBUG('Clicked to hit ' + clickContext.name +
          ' (' + clickContext.id + ').');
  };
  Autoplay.delay = 0;
  Autoplay.start();
  return true;
}

function getStaminaMode() {
  var how = GM_getValue('staminaSpendHow');

  // If fighting randomly, assign randomly chosen mode
  if (how == STAMINA_HOW_RANDOM) {
    if (newStaminaMode == undefined)
      newStaminaMode = Math.floor(Math.random()*(staminaSpendChoices.length - 1));
    how = newStaminaMode;
  }
  else {
    newStaminaMode = undefined;
  }

  return how;
}

function autoStaminaSpend() {
  if (!isChecked('staminaSpend')) return false;

  if (SpendStamina.floor &&
      isChecked('allowStaminaToLevelUp') &&
      GM_getValue('autoStamBurn') !== SpendStamina.canBurn) {
    GM_setValue('autoStamBurn', SpendStamina.canBurn);
    if (SpendStamina.canBurn) {
      addToLog('process Icon', staminaIcon + '<span style="color:#009966; font-weight: bold;">Burning through stamina reserve to level up.</span>');
    } else {
      DEBUG('Not within reach of a level up. Stamina burning is off.');
    }
  }

  var how = getStaminaMode();
  switch (how) {
    case STAMINA_HOW_FIGHT_RANDOM:
    case STAMINA_HOW_FIGHT_LIST:
      return autoFight(how);

    case STAMINA_HOW_HITMAN:
      return autoHitman(how);

    default:
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized stamina setting: ' +
               'staminaSpendHow=' + how);
  }

  return false;
}

function autoBankDeposit(amount) {
  // Make sure we're at the bank.
  var formElt = xpathFirst('.//form[@id="bank_deposit"]', innerPageElt);
  if (!formElt) {
    Autoplay.fx = goBank;
    Autoplay.start();
    return true;
  }

  // Set the amount (if provided).
  if (amount) {
    var amountElt = xpathFirst('.//input[@type="text"]', formElt);
    if (!amountElt) {
      addToLog('warning Icon', 'BUG DETECTED: No text input at bank.');
      return false;
    }
    amountElt.value = amount;
  }

  // Make the deposit.
  var submitElt = xpathFirst('.//input[@type="submit"]', formElt);
  if (!submitElt) {
    addToLog('warning Icon', 'BUG DETECTED: No submit input at bank.');
    return false;
  }
  Autoplay.fx = function() {
    clickAction = 'deposit';
    submitElt.click();
    DEBUG('Clicked to deposit.');
  }
  Autoplay.start();
  return true;
}

function autoBankWithdraw(amount) {
  // Make sure we're at the bank.
  var formElt = xpathFirst('.//form[@id="bank_withdraw"]', innerPageElt);
  if (!formElt) {
    Autoplay.fx = goBank;
    clickAction = 'withdraw';
    clickContext = amount;
    Autoplay.start();
    return true;
  }

  // Set the amount (if provided).
  if (amount) {
    var amountElt = xpathFirst('.//input[@type="text"]', formElt);
    if (!amountElt) {
      addToLog('warning Icon', 'BUG DETECTED: No text input at bank.');
      return false;
    }
    amountElt.value = amount;
  }

  // Make the withdrawal.
  var submitElt = xpathFirst('.//input[@type="submit"]', formElt);
  if (!submitElt) {
    addToLog('warning Icon', 'BUG DETECTED: No submit input at bank.');
    return false;
  }
  Autoplay.fx = function() {
    clickAction = 'withdraw';
    submitElt.click();
    DEBUG('Clicked to withdraw.');
  }
  Autoplay.start();
  return true;
}

// Returns a non-empty array of the displayed opponents, or undefined.
function getHitlist(element, forceRefresh) {
  // If the list was already seen, don't read it again.
  if (!forceRefresh && getHitlist.opponents) {
    if (!getHitlist.opponents.length) return;
    return getHitlist.opponents;
  }
  getHitlist.opponents = [];

  // Get each target in the displayed list.
  var rows = $x('.//table[@class="hit_list"]//tr', element);
  for (var i = 0, iLength=rows.length; i < iLength; ++i) {
    // Get the data cells in the row.
    var rowData = rows[i].getElementsByTagName('td');
    if (rowData.length < 5) continue;

    // Get the target's profile and attack links.
    var opponent = {
      attack:  xpathFirst('.//a', rowData[4]),
      payer:   xpathFirst('.//a', rowData[1]),
      profile: xpathFirst('.//a', rowData[0]),
      time:    rowData[3].innerHTML.untag().trim()
    };
    if (!opponent.profile || !opponent.attack) continue;

    // Get the target's id, name, title, and bounty.
    opponent.id = decodeID(opponent.profile.getAttribute('onclick').split('user=')[1].split('\'')[0]);
    if (!opponent.id) continue;
    opponent.name = opponent.profile.innerHTML;
    if (opponent.profile.previousSibling &&
        opponent.profile.previousSibling.nodeValue.match(/\w+(?: \w+)*/)) {
      opponent.title = RegExp.lastMatch;
    }
    if (rowData[2].innerHTML.match(REGEX_CASH)) {
      opponent.bounty = RegExp.lastMatch;
    }

    getHitlist.opponents.push(opponent);
  }
  DEBUG(getHitlist.opponents.length + ' hitlist target(s) found.');

  if (!getHitlist.opponents.length) return;

  //for (var i = 0; i < getHitlist.opponents.length; i++) {
  //  var opponent = getHitlist.opponents[i];
  //  GM_log('Saw id=' + opponent.id +
  //         ', title=' + opponent.title +
  //         ', name=' + opponent.name +
  //         ', bounty=' + opponent.bounty +
  //         ', time=' + opponent.time);
  //}

  return getHitlist.opponents;
}

// Returns a non-empty array of the displayed opponents, or undefined.
function getDisplayedOpponents(element, forceRefresh) {
  // If the list was already seen, don't read it again.
  if (!forceRefresh && getDisplayedOpponents.opponents) {
    if (!getDisplayedOpponents.opponents.length) return;
    return getDisplayedOpponents.opponents;
  }
  getDisplayedOpponents.opponents = [];
  var fight = true;

  // First, look for a traditional fight table (one with real links).
  var links = $x('.//table[@class="main_table fight_table"]//a[contains(@onclick, "opponent_id")]', element);

  // Get each potential opponent in the displayed list.
  for (var i = 0, iLength=links.length; i < iLength; i++) {
    var linkElt = links[i];
    var opponent = new Player();
    var row     = linkElt.parentNode.parentNode;
    var rowData = row.getElementsByTagName('td');
    nameAndLevel = row;

    // Get the opponent's details.
    opponent.profile = nameAndLevel.getElementsByTagName('a')[0];
    if (!opponent.profile) continue;
    opponent.id      = decodeID(opponent.profile.getAttribute('onclick').split('user=')[1].split('\'')[0]);
    if (!opponent.id) continue;
    opponent.attack  = linkElt;
    opponent.mafia   = rowData[1] ? parseInt(rowData[1].innerHTML) : 0;
    opponent.level   = parseInt(nameAndLevel.innerHTML.split('Level ')[1]);
    opponent.name    = opponent.profile.innerHTML;
    if (opponent.profile.previousSibling &&
        opponent.profile.previousSibling.nodeValue.match(/\w+(?: \w+)*/)) {
      opponent.title = RegExp.lastMatch;
    }
    if (!opponent.level) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read opponent level.');
      addToLog('warning Icon', 'Row contents: '+ row.innerHTML);
    } else if (!opponent.mafia) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read opponent mafia.');
      addToLog('warning Icon', 'Row contents: '+ row.innerHTML);
    } else {
      getDisplayedOpponents.opponents.push(opponent);
    }
  }

  if (!getDisplayedOpponents.opponents.length) {
    // No traditional list was found. Look for a newer-style list.

    //var ids = unsafeWindow['a10979261223_fight_list_ids'];
    //GM_log('ids=' + ids);

    // Find level elements.
    var levelElts = $x('.//table[@class="main_table fight_table"]//td/span[contains(@id, "fight_view_level_")]', element);
    for (var i = 0, iLength=levelElts.length; i < iLength; ++i) {
      var levelElt = levelElts[i];
      if (!levelElt.innerHTML.match(/evel (\d+)/i)) continue;

      // Found an opponent.
      var opponent = new Player();
      opponent.level = parseInt(RegExp.$1);
      var row = levelElt.id.match(/\d+$/);
      var rowElt = levelElt.parentNode.parentNode;
      opponent.profile = xpathFirst('.//*[@id="fight_view_namelink_' + row + '"]/a', rowElt);
      if (!opponent.profile) continue;
      opponent.name = opponent.profile.firstChild.innerHTML;
      opponent.title = xpathFirst('.//*[@id="fight_view_title_' + row + '"]', rowElt).innerHTML;
      opponent.mafia = parseInt(xpathFirst('.//*[@id="fight_view_groupsize_' + row + '"]', rowElt).innerHTML);
      opponent.attack = xpathFirst('.//*[@id="fight_view_action_' + row + '"]/a', rowElt);
      getDisplayedOpponents.opponents.push(opponent);
    }
  }

  if (fight && !getDisplayedOpponents.opponents.length) {
    // Look for a hybrid fight table (mix of links & non-links).
    var links = $x('.//table[@class="main_table fight_table"]//a[contains(@onclick, "reg_fight_view_attack")]', element);

    // Get each potential opponent in the displayed list.
    for (var i = 0, iLength=links.length; i < iLength; ++i) {
      var linkElt = links[i];
      var opponent = new Player();
      var row     = linkElt.parentNode.parentNode;
      var rowData = row.getElementsByTagName('td');
      nameAndLevel = row;

      // Get the opponent's details.
      opponent.profile = nameAndLevel.getElementsByTagName('a')[0];
      if (!opponent.profile) continue;
      opponent.id      = decodeID(opponent.profile.href.split('user=')[1].split('\'')[0]);
      if (!opponent.id) continue;
      opponent.attack  = linkElt;
      opponent.mafia   = rowData[1] ? parseInt(rowData[1].innerHTML) : 0;
      opponent.level   = parseInt(nameAndLevel.innerHTML.split('Level ')[1]);
      opponent.name    = opponent.profile.innerHTML;
      if (opponent.profile.previousSibling &&
          opponent.profile.previousSibling.nodeValue.match(/\w+(?: \w+)*/)) {
        opponent.title = RegExp.lastMatch;
      }
      if (!opponent.level) {
        addToLog('warning Icon', 'BUG DETECTED: Unable to read opponent level.');
        addToLog('warning Icon', 'Row contents: '+ row.innerHTML);
      } else if (!opponent.mafia) {
        addToLog('warning Icon', 'BUG DETECTED: Unable to read opponent mafia.');
        addToLog('warning Icon', 'Row contents: '+ row.innerHTML);
      } else {
        getDisplayedOpponents.opponents.push(opponent);
      }
    }
  }

  if (!getDisplayedOpponents.opponents.length) return;

  DEBUG(getDisplayedOpponents.opponents.length + ' opponents listed.');
  //for (var i = 0; i < getDisplayedOpponents.opponents.length; ++i) {
  //  var opponent = getDisplayedOpponents.opponents[i];
  //  GM_log('Saw id=' + opponent.id +
  //         ', mafia=' + opponent.mafia +
  //         ', level=' + opponent.level +
  //         ', title=' + opponent.title +
  //         ', name=' + opponent.name);
  //}

  return getDisplayedOpponents.opponents;
}

// Searches the fight table in the subtree of the given element for new
// random targets. Returns a new opponent, or undefined.
function findFightOpponent(element) {
  // Don't bother searching if we still have plenty.
  var newOpponents = fightListNew.get();
  var len = newOpponents.length;
  if (len >= 50) {
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Check the fight table.
  var opponents = getDisplayedOpponents(element);
  if (!opponents) {
    // No opponents displayed on this page.
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Get the user's criteria for opponents.
  var opponentLevelMax = parseInt(GM_getValue('fightLevelMax', 100));
  var opponentMafiaMax = parseInt(GM_getValue('fightMafiaMax', 501));
  var opponentMafiaMin = parseInt(GM_getValue('fightMafiaMin', 1));
  var avoidNames = isChecked('fightAvoidNames');

  // Make any relative adjustments (if enabled).
  if (GM_getValue('fightLevelMaxRelative', false)) {
    opponentLevelMax = opponentLevelMax + level;
  }
  if (GM_getValue('fightMafiaMaxRelative', false)) {
    opponentMafiaMax = opponentMafiaMax + mafia;
  }
  if (GM_getValue('fightMafiaMinRelative', false)) {
    opponentMafiaMin = mafia - opponentMafiaMin;
  }
  if (opponentMafiaMin > 501) {
    opponentMafiaMin = 501;
  }

  // Show which players to blacklist.
  var avoidLosers = (isChecked('fightStealth') ||
                     newOpponents.length);
  DEBUG(fightListNew.debug());
  DEBUG(fightListAvoid.debug());
  if (avoidLosers) {
    DEBUG(fightListInactive.debug());
    DEBUG(fightListActive.debug());
  }

  // Figure out which opponents are acceptable.
  DEBUG('Applying criteria to displayed opponents: ' +
        'level <= ' + opponentLevelMax + ', mafia between ' +
        opponentMafiaMin + ' and ' + opponentMafiaMax + '.');
  var levelMaxCount = 0;
  var mafiaMaxCount = 0;
  var mafiaMinCount = 0;
  var namesCount = 0;
  var blacklistCount = 0;
  for(var i = 0, iLength=opponents.length; i < iLength; ++i) {
    var opponent = opponents[i];
    if (opponent.level > opponentLevelMax) {
      levelMaxCount++;
      continue;
    }
    if (opponent.mafia > opponentMafiaMax) {
      mafiaMaxCount++;
      continue;
    }
    if (opponent.mafia < opponentMafiaMin) {
      mafiaMinCount++;
      continue;
    }
    if (avoidNames && isFamily(decodeHTMLEntities(opponent.name))) {
      namesCount++;
      continue;
    }
    if (!opponent.id) continue;

    // Check against previous opponents.
    var idx = fightListAvoid.indexOf(opponent);
    if (idx != -1) {
      // We can't fight them, but update their info.
      fightListAvoid.get()[idx].update(opponent);
      blacklistCount++;
      continue;
    }
    if (avoidLosers) {
      idx = fightListInactive.indexOf(opponent);
      if (idx != -1) {
        fightListInactive.get()[idx].update(opponent);
        blacklistCount++;
        continue;
      }
      idx = fightListActive.indexOf(opponent);
      if (idx != -1) {
        fightListActive.get()[idx].update(opponent);
        blacklistCount++;
        continue;
      }
    }
    if (!fightListNew.add(opponent)) {
      blacklistCount++;
      continue;
    }
    // This opponent is new and acceptable.
    DEBUG('Found new fight opponent: name=' + opponent.name +
          ', id=' + opponent.id + ', level=' + opponent.level +
          ', mafia=' + opponent.mafia);
  }
  DEBUG(levelMaxCount + ' disqualified on max level, ' +
        mafiaMaxCount + ' on max mafia, ' +
        mafiaMinCount + ' on min mafia, ' +
        namesCount + ' on name, ' +
        blacklistCount + ' on blacklist.');

  newOpponents = fightListNew.get();
  if (!newOpponents.length) return -1;

  if (newOpponents.length > len) {
    fightListNew.set();
  }

  return newOpponents[Math.floor(Math.random() * newOpponents.length)];
}

function setFightOpponentActive(player) {
  if (!player) return;

  // Add the opponent to the active list.
  DEBUG('Marking fight opponent active, id=' + player.id);
  fightListActive.add(player, 10);
  fightListActive.set();

  // Remove the opponent from the other fight lists.
  if (fightListInactive.remove(player))
    fightListInactive.set();
  if (fightListNew.remove(player))
    fightListNew.set();
  if (fightListAvoid.remove(player))
    fightListAvoid.set();
}

function setFightOpponentInactive(player) {
  if (!player) return;

  // Add the opponent to the inactive list.
  DEBUG('Marking fight opponent inactive, id=' + player.id);
  fightListInactive.add(player, 10);
  fightListInactive.set();

  // Remove the opponent from the other fight lists.
  if (fightListActive.remove(player))
    fightListActive.set();
  if (fightListNew.remove(player))
    fightListNew.set();
  if (fightListAvoid.remove(player))
    fightListAvoid.set();
}

function setFightOpponentAvoid(player) {
  if (!player) return;

  // Add the opponent to the avoid list.
  DEBUG('Marking fight opponent avoid, id=' + player.id);
  fightListAvoid.add(player, 50);
  fightListAvoid.set();

  // Remove the opponent from all other fight lists.
  if (fightListActive.remove(player))
    fightListActive.set();
  if (fightListInactive.remove(player))
    fightListInactive.set();
  if (fightListNew.remove(player))
    fightListNew.set();

  // Only remove the first occurence from the user-supplied list.
  removeSavedListItem('fightList', player.id);
}

function setHitmanOpponentAvoid(opponent) {
  if (!opponent) return;

  // Add the opponent to the avoid list.
  DEBUG('Marking hitlist opponent ' + opponent + ' avoid.');
  addSavedListItem('hitmanListAvoid', opponent, 100);
}

function toggleSettings() {
  if (settingsOpen === false) {
    // Stop any running timers so the settings box won't disappear.
    Autoplay.clearTimeout();
    Reload.clearTimeout();

    settingsOpen = true;
    createSettingsBox();
    showSettingsBox();
  } else {
    settingsOpen = false;
    //hideSettingsBox();
    destroySettingsBox();

    // Restart the timers.
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload();
  }
}

function toggleStats() {
  if (settingsOpen === true) {
    toggleSettings();
  }
  if (statsOpen === false) {
    statsOpen = true;
    if (!document.getElementById('statsWindow')) {
      createStatWindow();
    }
    showStatsWindow();
    // Stop any running timers so the settings box won't disappear.
    Autoplay.clearTimeout();
    Reload.clearTimeout();
  } else {
    statsOpen = false;
    hideStatsWindow();
    Autoplay.delay = 150;
    Autoplay.start();
    autoReload();
  }
}

function showSettingsBox() {
  var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
  if (settingsBoxContainer) {
    settingsBoxContainer.style.display = 'block';
  }
}

function showMafiaLogBox() {
  if (!document.getElementById('mafiaLogBox')) {
    createLogBox();
  } else {
    var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
    mafiaLogBoxDiv.style.display = 'block';
  }
  if (!debug && GM_getValue('logOpen') != 'open' &&
      !isChecked('autoLog')) {
    alert('Logging is not enabled. To see new activity here, please open your settings and check "Enable logging" in the General tab.');
  }
  GM_setValue('logOpen', 'open');
}

function showStatsWindow() {
  var statsWindowContainer = document.getElementById('sWindowGenDialogPopDialog');
  if (statsWindowContainer) {
    statsWindowContainer.style.display = 'block';
  }
}

function hideSettingsBox() {
  var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
  if (settingsBoxContainer) {
    settingsBoxContainer.style.display = 'none';
  }
}

function destroySettingsBox() {
  var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
  if (settingsBoxContainer) {
    settingsBoxContainer.parentNode.removeChild(settingsBoxContainer);
  }
}

function hideMafiaLogBox() {
  var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
  mafiaLogBoxDiv.style.display = 'none';
  GM_setValue('logOpen', 'closed');
}

function hideStatsWindow() {
  var statsWindowContainer = document.getElementById('sWindowGenDialogPopDialog');
  if (statsWindowContainer) {
    statsWindowContainer.style.display = 'none';
  }
}

function upgradeFightRobTab() {
  // Get the fight/rob tab settings that need to change.
  var autoFightOn = isChecked('autoFight');
  var useFightList = isChecked('rFightList');
  var list = GM_getValue('fightList', '');
  var levelMax = parseInt(GM_getValue('fightLevel', 100));
  var mafiaMax = parseInt(GM_getValue('fightmafiaSize', 501));
  var mafiaMin = parseInt(GM_getValue('fightmafiaMinSize', 1));
  var levelMaxRelative = GM_getValue('fightLevelRelative', 0);
  var mafiaMaxRelative = GM_getValue('fightMafiaRelative', 0);
  var mafiaMinRelative = GM_getValue('fightMafiaMinRelative', 0);
  var avoidNames = GM_getValue('clanMember', 0);
  var removeStronger = GM_getValue('fightRemoveStronger', 'checked');
  var loc = NY;
  if (isChecked('fightLocationCUBA')) {
    loc = CUBA;
  } else if (isChecked('fightLocationMOSCOW')) {
    loc = MOSCOW;
  }

  // Spend stamina automatically?
  if (autoFightOn || autoRobOn) {
    GM_setValue('staminaSpend', 'checked');
  }

  // How?
  if (autoFightOn) {
    if (useFightList) {
      GM_setValue('staminaSpendHow', STAMINA_HOW_FIGHT_LIST);
    } else {
      GM_setValue('staminaSpendHow', STAMINA_HOW_FIGHT_RANDOM);
    }
  }

  // Other settings
  GM_setValue('fightLocation', loc);
  GM_setValue('fightLevelMax', levelMax);
  GM_setValue('fightLevelMaxRelative', levelMaxRelative);
  GM_setValue('fightMafiaMax', mafiaMax);
  GM_setValue('fightMafiaMaxRelative', mafiaMaxRelative);
  GM_setValue('fightMafiaMin', mafiaMin);
  GM_setValue('fightMafiaMinRelative', mafiaMinRelative);
  GM_setValue('fightAvoidNames', avoidNames);
  GM_setValue('fightList', list);
  GM_setValue('fightRemoveStronger', removeStronger);
  GM_setValue('hitmanLocation', loc);
  GM_setValue('hitmanAvoidNames', avoidNames);
}

function handleVersionChange() {
  addToLog('updateGood Icon', 'Now running version ' + SCRIPT.version + ' build ' + SCRIPT.build);
  GM_setValue('version', SCRIPT.version);
  GM_setValue('build', SCRIPT.build);

  // Check for invalid settings and upgrade them.

  // In an old version, the bonus had been up to 15%.
  var val = GM_getValue('selectEnergyBonus');
  if (val > 11) {
    GM_setValue('selectEnergyBonus', 11);
    didJobCalculations = false;
  }

  // In an old version, there was no cap. But it definitely must be under 100,
  // and it probably wouldn't work properly with more than 75.
  var val = parseInt(GM_getValue('logPlayerUpdatesMax', '100'));
  if (isNaN(val) || val > 75) {
    GM_setValue('logPlayerUpdatesMax', '75');
  }

  // Heal location used to be radio buttons.
  if (GM_getValue('healLocation') == undefined) {
    var loc = NY;
    if (isChecked('healLocationCuba')) {
      loc = CUBA;
    } else if (isChecked('healLocationMoscow')) {
      loc = MOSCOW;
    }
    GM_setValue('healLocation', loc);
  }

  // Set the stamina keep and stamina usage threshold
  if (GM_getValue('selectStaminaKeepMode') == undefined) {
    GM_setValue('selectStaminaKeep', Math.round((1 - parseInt(GM_getValue('selectStaminaKeep', 0)) * .10)*100));
    GM_setValue('selectStaminaUse', Math.round((1 - parseInt(GM_getValue('selectStaminaUse', 0)) * .10)*100));
  }

  // Handle force healing changes
  if (GM_getValue('hideInHospital') == undefined) {
    GM_setValue('hideInHospital',0);
    if (isChecked('forceHealOpt2'))
      GM_setValue('hideInHospital','checked');
    if (isChecked('forceHealOpt1'))
      GM_setValue('hideInHospital',0);
  }

  // Handle filtering changes
  if (GM_getValue('filterPass') == undefined) {
    // Set to accept patterns filter
    if (GM_getValue('filterOpt') == undefined) {
      GM_setValue('filterOpt',0);
    }

    // Get old accept filter patterns
    if (GM_getValue('logFilterPass').length > 0) {
      GM_setValue('filterPass',GM_getValue('logFilterPass'));
    }

    // Get old accept filter patterns
    if (GM_getValue('logFilterFail').length > 0) {
      GM_setValue('filterFail',GM_getValue('logFilterFail'));
    }

    // Get patterns
    if (GM_getValue('filterPatterns').length > 0) {
      if (GM_getValue('filterOpt') == 0)
        GM_setValue('filterPass',GM_getValue('filterPatterns'));
      else
        GM_setValue('filterFail',GM_getValue('filterPatterns'));
    }
  }

  // In an old version, there was robbing
  val = GM_getValue('staminaSpendHow');
  if (val > 3) {
    GM_setValue('staminaSpendHow', Math.min(val, 2));
  }

  // Upgrade fight/rob tab (builds 522 and under) to stamina tab settings.
  if (GM_getValue('staminaSpend') == undefined &&
      GM_getValue('autoFight') != undefined) {
    upgradeFightRobTab();
    addToLog('process Icon', 'Upgraded stamina tab settings.');
  }

  // Upgrade Misc Tab settings
  clearOldCheckBoxStatuValues()
}

function clearOldCheckBoxStatuValues() {
  // Clear old checkbox values

  for (var i = 0, iLength=autoStatBases.length; i < iLength; i++)
    if (isNaN (parseInt (GM_getValue(autoStatBases[i]))))
      GM_setValue(autoStatBases[i], 0);

  for (var i = 0, iLength=autoStatRatios.length; i < iLength; i++)
    if (isNaN (parseInt (GM_getValue(autoStatRatios[i]))))
      GM_setValue(autoStatRatios[i], 0);

}

function saveDefaultSettings() {
  // Assume all settings have been cleared and set defaults.
  // For groups of radio buttons, one must be checked and all others cleared.
  // For checkboxes, no need to default if the option should be off.

  // General tab.
  GM_setValue('autoClick', 'checked');
  GM_setValue('r1', '30');
  GM_setValue('r2', '110');
  GM_setValue('autoHeal', 'checked');
  GM_setValue('healthLevel', '50');
  GM_setValue('forceHealOpt1', 'checked');
  GM_setValue('healLocation', NY);
  GM_setValue('bankConfig', '50000');
  GM_setValue('bankConfigCuba', '50000');
  GM_setValue('bankConfigMoscow', '50000');
  GM_setValue('autoPauseBefore', 'checked');
  GM_setValue('autoPauseAfter', 0);
  GM_setValue('autoPauseExp', '50');
  GM_setValue('autoLog', 'checked');
  GM_setValue('autoLogLength', '300');
  GM_setValue('logPlayerUpdates', 'checked');
  GM_setValue('logPlayerUpdatesMax', '25');
  GM_setValue('d1', '3');
  GM_setValue('d2', '5');
  GM_setValue('idleLocation', NY);
  GM_setValue('autoHelp', 'checked');
  GM_setValue('autoLottoBonusItem',3);
  GM_setValue('autoWarTargetList', '');
  GM_setValue('warMode', 0);

  // Misc Tab
  GM_setValue('autoStat', 0);
  GM_setValue('autoStatDisable', 0);

  for (var i = 0, iLength=autoStatModes.length; i < iLength; ++i)
    GM_setValue(autoStatModes[i], 0);

  for (var i = 0, iLength=autoStatPrios.length; i < iLength; ++i)
    GM_setValue(autoStatPrios[i], 0);

  for (var i = 0, iLength=autoStatBases.length; i < iLength; ++i)
    GM_setValue(autoStatBases[i], 0);

  for (var i = 0, iLength=autoStatRatios.length; i < iLength; ++i)
    GM_setValue(autoStatRatios[i], 0);

  for (var i = 0, iLength=autoStatFallbacks.length; i < iLength; ++i)
    GM_setValue(autoStatFallbacks[i], 0);

  GM_setValue('filterLog', 0);
  GM_setValue('filterOpt', 0);
  GM_setValue('filterPass', defaultPassPatterns.join('\n'));
  GM_setValue('filterFail', defaultFailPatterns.join('\n'));

  // Energy tab.
  GM_setValue('estimateJobRatio', '1');

  // Stamina tab.
  GM_setValue('staminaSpendHow', STAMINA_HOW_FIGHT_RANDOM);
  GM_setValue('fightLocation', NY);
  GM_setValue('fightLevelMax', 100);
  GM_setValue('fightMafiaMax', 501);
  GM_setValue('fightMafiaMin', 1);
  GM_setValue('fightStealth', 'checked');
  GM_setValue('fightAvoidBodyguards', 'checked');
  GM_setValue('fightAvoidNames', 'checked');
  GM_setValue('fightRemoveStronger', 'checked');
  GM_setValue('hitmanLocation', NY);
  GM_setValue('hitmanAvoidNames', 'checked');
  GM_setValue('clanName', defaultClans.join('\n'));
  GM_setValue('selectStaminaKeep', 0);
  GM_setValue('selectStaminaUse', 0);
  GM_setValue('selectEnergyKeep', 0);
  GM_setValue('selectEnergyUse', 0);

  // Property tab.
  GM_setValue('buyMinAmount', '0');

  // Other settings.
  GM_setValue('logOpen', 'open');

  addToLog('process Icon', 'Options reset to defaults.');
}

function saveSettings() {
/*
  //FIXME: works once then crashes... not good

  // Transfer statLog to graphBox
  if (typeof(GM_getValue('statLog') != 'undefined')) {
    GM_setValue('graphBox', GM_getValue('statLog'));
    GM_deleteValue('statLog');
  }
*/

  var autoHealOn  = (document.getElementById('autoHeal').checked === true);
  var healthLevel = parseInt(document.getElementById('healthLevel').value);
  if (autoHealOn && (!healthLevel || healthLevel < 1)) {
    alert('Health level for automatic healing must be 1 or more.');
    return;
  }

  // Validate the settings and alert the user if the settings are invalid.
  var logPlayerUpdates = (document.getElementById('logPlayerUpdates').checked === true);
  var logPlayerUpdatesMax = parseInt(document.getElementById('logPlayerUpdatesMax').value);
  if (logPlayerUpdates && (isNaN(logPlayerUpdatesMax) || logPlayerUpdatesMax < 0 || logPlayerUpdatesMax > 75)) {
    alert('The maximum number of player updates must be between 0 and 75.');
    return;
  }
  var autoBankOn      = (document.getElementById('autoBank').checked === true);
  var autoBankCubaOn  = (document.getElementById('autoBankCuba').checked === true);
  var autoBankMoscowOn  = (document.getElementById('autoBankMoscow').checked === true);
  var bankConfig      = document.getElementById('bankConfig').value;
  var bankConfigCuba      = document.getElementById('bankConfigCuba').value;
  var bankConfigMoscow      = document.getElementById('bankConfigMoscow').value;
  var bankConfigInt   = parseInt(bankConfig);
  var bankConfigCubaInt   = parseInt(bankConfigCuba);
  var bankConfigMoscowInt   = parseInt(bankConfigMoscow);
  if (autoBankOn && (isNaN(bankConfigInt) || bankConfigInt < 10)) {
    alert('Minimum auto-bank amount must be 10 or higher.');
    return;
  }

  GM_setValue('idleLocation', document.getElementById('idleLocation').selectedIndex);

  if (autoBankCubaOn && (isNaN(bankConfigCubaInt) || bankConfigCubaInt < 10)) {
    alert('Minimum Cuba auto-bank amount must be 10 or higher.');
    return;
  }
  if (autoBankMoscowOn && (isNaN(bankConfigMoscowInt) || bankConfigMoscowInt < 10)) {
    alert('Minimum Moscow auto-bank amount must be 10 or higher.');
    return;
  }
  var estimateJobRatio = parseFloat(document.getElementById('estimateJobRatio').value);
  var autoEnergyPackOn = (document.getElementById('autoEnergyPack').checked === true );

  // Validate the estimated job ratio setting.
  if (autoEnergyPackOn) {
    if (isNaN(estimateJobRatio)) {
      alert('Please enter a number between 0 and 3 for your estimated job xp to energy ratio');
      return;
    }
  }

  // Validate and save energy limits settings.
  var selectEnergyUse = document.getElementById('selectEnergyUse').value;
  var selectEnergyKeep = document.getElementById('selectEnergyKeep').value;
  if (isNaN(selectEnergyUse) || isNaN(selectEnergyKeep)) {
    alert('Please enter numeric values for Energy reserve and Energy threshold.');
    return;
  }

  GM_setValue ('selectEnergyUse', selectEnergyUse);
  GM_setValue ('selectEnergyKeep', selectEnergyKeep);
  GM_setValue ('selectEnergyUseMode', document.getElementById('selectEnergyUseMode').selectedIndex);
  GM_setValue ('selectEnergyKeepMode', document.getElementById('selectEnergyKeepMode').selectedIndex);

  // Validate the auto-stat setting.
  var autoStatOn = (document.getElementById('autoStat').checked === true);
  for (var i = 0, iLength=autoStatBases.length; i < iLength; ++i) {
    if (autoStatOn && isNaN(document.getElementById(autoStatBases[i]).value)) {
      alert('Please enter valid numbers for auto-stat ' + autoStatDescrips[i+1] + ' (Misc tab). : ' + document.getElementById(autoStatBases[i]).value);
      return;
    }
  }

  for (var i = 0, iLength=autoStatRatios.length; i < iLength; ++i) {
    if (autoStatOn && isNaN(document.getElementById(autoStatRatios[i]).value)) {
      alert('Please enter valid numbers for auto-stat ' + autoStatDescrips[i+1] + ' (Misc tab).');
      return;
    }
  }

  // Validate the stamina tab.
  var staminaTabSettings = validateStaminaTab();
  if (!staminaTabSettings) return;
  //var testStaminaTab = function() {
  //  var s = validateStaminaTab();
  //  GM_log('s='+s);
  //  for (var setting in s) {
  //    GM_log(setting + '=' + s[setting]);
  //  }
  //}
  //testStaminaTab();

  //
  // All settings are valid. Save them.
  //
  GM_setValue('restAutoStat', 0);
  for (var i = 0, iLength=autoStatBases.length; i < iLength; ++i)
    GM_setValue(autoStatBases[i], document.getElementById(autoStatBases[i]).value);
  for (var i = 0, iLength=autoStatRatios.length; i < iLength; ++i)
    GM_setValue(autoStatRatios[i], document.getElementById(autoStatRatios[i]).value);
  for (var i = 0, iLength=autoStatModes.length; i < iLength; ++i)
    GM_setValue(autoStatModes[i], document.getElementById(autoStatModes[i]).value);
  for (var i = 0, iLength=autoStatPrios.length; i < iLength; ++i)
    GM_setValue(autoStatPrios[i], document.getElementById(autoStatPrios[i]).value);

  var filterOpt = document.getElementById('filterOpt').value;
  GM_setValue(filterOpt == 0 ? 'filterPass' : 'filterFail', document.getElementById('filterPatterns').value);
  GM_setValue('filterOpt', filterOpt);

  GM_setValue('healLocation', document.getElementById('healLocation').value);
  GM_setValue('burnOption', document.getElementById('burnOption').value);

  if (document.getElementById('hasPrivateIsland').checked !== isChecked('hasPrivateIsland')) {
    didJobCalculations = false;
  }

  // Place all checkbox element saving here
  saveCheckBoxElementArray(['autoClick','autoLog','logPlayerUpdates','hideAttacks',
                            'autoMission','autoBank','autoBankMoscow','allowEnergyToLevelUp',
                            'autoBankCuba','autoHeal','forceHealOpt3','forceHealOpt4','forceHealOpt5',
                            'hideInHospital','autoStat','autoStatDisable','autoStatAttackFallback',
                            'autoStatDefenseFallback','autoStatHealthFallback','autoStatEnergyFallback',
                            'autoStatStaminaFallback','autoStatInfluenceFallback', 'hourlyStatsOpt',
                            'autoGiftSkipOpt','autoBuy','autoSellCrates','autoEnergyPack',
                            'hasHelicopter', 'hasPrivateIsland', 'hasGoldenThrone','isManiac',
                            'sendEnergyPack', 'autoAskJobHelp','autoPause','hideAds', 'idleInCity',
                            'moveEmailBar','acceptMafiaInvitations','autoLottoOpt', 'multipleJobs',
                            'leftAlign','filterLog','autoHelp','autoSellCratesMoscow','collectNYTake',
                            'endLevelOptimize','racketCollect','racketReshakedown', 'racketPermanentShakedown',
                            'autoWar','autoWarPublish','autoWarResponsePublish','autoWarRewardPublish',
                            'autoGiftWaiting','burnFirst','autoLottoBonus','autoWarHelp','fbwindowtitle',
                            'autoWarBetray', 'hideGifts']);

  if (document.getElementById('masterAllJobs').checked === true) {
    GM_setValue('repeatJob', 0);
  } else {
    GM_setValue('repeatJob', 'checked');
  }

  var selectProperties = '';
  if (saveCheckBoxElement('abandoned'))
    selectProperties += 'Abandoned Lot';
  if (saveCheckBoxElement('commercial'))
    selectProperties += 'Commercial Block';
  if (saveCheckBoxElement('downtown'))
    selectProperties += 'Prime Downtown Lot';
  if (saveCheckBoxElement('beachfront'))
    selectProperties += 'Beachfront Property';
  if (saveCheckBoxElement('mike'))
    selectProperties += 'Mafia Mike\'s';
  if (saveCheckBoxElement('rent'))
    selectProperties += 'Rent House';
  if (saveCheckBoxElement('restaurant'))
    selectProperties += 'Italian Restaurant';
  if (saveCheckBoxElement('apartment'))
    selectProperties += 'Apartment Complex';
  if (saveCheckBoxElement('valu'))
    selectProperties += 'Valu-Mart';
  if (saveCheckBoxElement('tourist'))
    selectProperties += 'Marina Tourist Shops';
  if (saveCheckBoxElement('office'))
    selectProperties += 'Office Building';
  if (saveCheckBoxElement('hotel'))
    selectProperties += '5-Star Hotel';
  if (saveCheckBoxElement('casino'))
    selectProperties += 'Mega Casino';

  GM_setValue('selectProperties', selectProperties);
  GM_setValue('estimateJobRatio', document.getElementById('estimateJobRatio').value);

  if (saveCheckBoxElement('autoPauseBefore')) {
    GM_setValue('autoPauselvlExp', lvlExp);
    GM_setValue('autoPauseActivated', false);
  }

  if (saveCheckBoxElement('autoPauseAfter')) {
    GM_setValue('autoPauselvlExp', lvlExp);
  }

  GM_setValue('notificationHandle', document.getElementById('notificationHandle').selectedIndex);
  GM_setValue('bankConfig', bankConfig);
  GM_setValue('bankConfigCuba', bankConfigCuba);
  GM_setValue('bankConfigMoscow', bankConfigMoscow);
  GM_setValue('r1', document.getElementById('r1').value);
  GM_setValue('r2', document.getElementById('r2').value);
  GM_setValue('d1', document.getElementById('d1').value);
  GM_setValue('d2', document.getElementById('d2').value);
  GM_setValue('propertyId', '12');
  GM_setValue('healthLevel', healthLevel);
  GM_setValue('autoPauseExp', document.getElementById('autoPauseExp').value);
  GM_setValue('autoLogLength', document.getElementById('autoLogLength').value);
  GM_setValue('logPlayerUpdatesMax', logPlayerUpdatesMax);
  GM_setValue('buyMinAmount', document.getElementById('buyMinAmount').value);
  GM_setValue('autoAskJobHelpMinExp', document.getElementById('autoAskJobHelpMinExp').value);
  GM_setValue('autoAskJobHelpMessage', document.getElementById('autoAskJobHelpMessage').value);
  GM_setValue('autoLottoBonusItem', document.getElementById('autoLottoList').selectedIndex);
  GM_setValue('autoWarTargetList', document.getElementById('autoWarTargetList').value);
  GM_setValue('warMode', document.getElementById('warMode').selectedIndex);

  var multiple_jobs_list = [];
  var mastery_jobs_list = [];
  selectedTierValue = document.getElementById('selectTier').value.split('.');
  masteryCity = parseInt(selectedTierValue[0]);
  masteryTier = parseInt(selectedTierValue[1]);
  for (var i = 0, iLength = missions.length; i < iLength; i++) {
    if (document.getElementById(missions[i][0]).checked) {
      multiple_jobs_list.push(i);
    }
    if (masteryCity == missions[i][4] &&
        masteryTier == missions[i][3]) {
      mastery_jobs_list.push(i);
    }
  }
  setSavedList('selectMissionMultiple', multiple_jobs_list);
  setSavedList('masteryJobsList', mastery_jobs_list);
  GM_setValue('selectMission', document.getElementById('selectMissionS').selectedIndex);
  GM_setValue('selectTier', document.getElementById('selectTier').value);

  // Save the stamina tab settings.
  for (var key in staminaTabSettings) {
    //GM_log('Setting GM value \'' + key + '\'=' + staminaTabSettings[key]);
    GM_setValue(key, staminaTabSettings[key]);
  }

  // Clear the job state.
  setSavedList('jobsToDo', []);
  setSavedList('itemList', []);

  // Clear lists for mastered and available jobs.
  GM_setValue('masteredJobs', "({0:{},1:{},2:{}})");
  GM_setValue('availableJobs', "({0:{},1:{},2:{}})");

  // Clear the fight/hit state.
  fightListNew.set([]);
  skipStaminaSpend = false;

  toggleSettings();
  updateLogStats();
}

function updateMastheadMenu() {
  var menuElt = document.getElementById('ap_menu');
  if (!menuElt) return;

  var elt = document.getElementById('pauseButton');
  if (running) {
    if (elt) return;

    // Remove the resume button and paused image.
    elt = document.getElementById('resumeButton');
    if (elt) {
      elt.parentNode.removeChild(elt);
    }
    elt = document.getElementById('ap_pause_img');
    if (elt) {
      elt.parentNode.removeChild(elt);
    }

    // Show a pause button.
    elt = makeElement('span', null, {'id':'pauseButton'});
    elt.appendChild(document.createTextNode('Pause'));
    elt.addEventListener('click', pause, false);
    menuElt.insertBefore(elt, menuElt.firstChild);
  } else {
    // Remove the pause button.
    if (elt) {
      elt.parentNode.removeChild(elt);
    }

    // Show a resume button and paused image.
    elt = document.getElementById('resumeButton');
    if (elt) return;
    elt = makeElement('span', null, {'id':'resumeButton'});
    elt.appendChild(document.createTextNode('Resume'));
    menuElt.insertBefore(elt, menuElt.firstChild);
    elt.addEventListener('click', unPause, false);
    makeElement('div', menuElt.parentNode, {'id':'ap_pause_img', 'style':'background: transparent url(' + stripURI(pausedMessageImage) + ') no-repeat scroll 20px; position: absolute; top: 0; left: 0; bottom: 0; width: 250px'});
  }
}

function pause() {
  if (GM_getValue('isRunning') === false) {
    // Must have been paused already. Make sure the log is current.
    refreshLog();
  }

  // Update the running state.
  GM_setValue('isRunning', false);
  running = false;

  // Clear all timers.
  Autoplay.clearTimeout();
  Reload.clearTimeout();

  addToLog('pause Icon', 'Autoplayer is paused. Log & stats do not track manual activity.');
  updateMastheadMenu();
}

function unPause() {
  if (GM_getValue('isRunning') === true) {
    // Must have been resumed already. Make sure the log is current.
    refreshLog();
  }

  // Clear lists for mastered and available jobs.
  GM_setValue('masteredJobs', "({0:{},1:{},2:{}})");
  GM_setValue('availableJobs', "({0:{},1:{},2:{}})");

  // Update the running state.
  GM_setValue('isRunning', true);
  running = true;

  addToLog('play Icon', 'Autoplayer resuming...');
  updateMastheadMenu();

  // Set up auto-reload.
  autoReload();

  // Kick off play.
  Autoplay.fx = goHome;
  Autoplay.delay = 150;
  Autoplay.start();
}

function calcEnergyCost() {
  if (!didJobCalculations) calcJobinfo();
  return missions[GM_getValue('selectMission', 1)][8];
}

function isFamily(username) {
  var patterns = getSavedList('clanName');
  for (var i = 0, iLength=patterns.length; i < iLength; ++i) {
    var pattern = patterns[i];
    if (pattern && username.indexOf(pattern) != -1) {
      return true;
    }
  }
  return false;
}

// Can be enhanced by regular expressions but will "regular" folks get it?
function isLoggable(line) {
  // Do not filter logs if in DEBUG mode OR
  // if log filtering is disabled
  var filterOpt = parseInt(GM_getValue('filterOpt', 0));
  if (!line || debug || !isChecked('filterLog') || isNaN(filterOpt))
    return true;

  if (line.indexOf('Log filtering') != -1 || line.indexOf('"good">Patterns ') != -1) return true;

  var logPatterns = getSavedList(filterOpt == 0 ? 'filterPass' : 'filterFail');

  // Log if line ONLY contains any pattern from list
  for (var i = 0, iLength=logPatterns.length; i < iLength; ++i) {
    var pattern = logPatterns[i];
    if (pattern && line.indexOf(pattern) != -1) {
      return (filterOpt == 0);
    }
  }

  return (filterOpt == 1);
}

function addToLog(icon, line) {
  if (!debug && !isChecked('autoLog')) {
    // Logging is turned off.
    return;
  }

  // Do not log anything if log filter condition is met
  if (!isLoggable(line)) {
    return;
  }

  // Create a datestamp, formatted for the log.
  var currentTime = new Date();
  var m_names = new Array('Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec');
  var timestampdate = m_names[currentTime.getMonth()] + ' ' + currentTime.getDate();

  // Create a timestamp, formatted for the log.
  var hours = currentTime.getHours();
  if (hours >= 12) {
    hours = hours - 12;
    var ampm = ' PM';
  } else {
    var ampm = ' AM';
  }
  if (hours == 0) {
    hours = 12;
  }
  var timestamptime = hours + ':' +
    (currentTime.getMinutes() < 10 ? 0 : '') +
    currentTime.getMinutes() + ':' +
    (currentTime.getSeconds() < 10 ? 0 : '') +
    currentTime.getSeconds() +
    ampm;

  // Get a log box to work with.
  var logBox = document.getElementById('logBox');
  if (!logBox) {
    if (!addToLog.logBox) {
      // There's no log box, so create one.
      addToLog.logBox = document.createElement('div');
      addToLog.logBox.innerHTML = GM_getValue('itemLog', '');
    }
    logBox = addToLog.logBox;
  }
  var logLen = logBox.childNodes.length;

  // Determine whether the new line repeats the most recent one.
  var repeatCount;
  if (logLen) {
    var elt = logBox.firstChild.childNodes[1];
    if (elt && elt.innerHTML.untag().indexOf(String(line).untag()) == 0) {
      if (elt.innerHTML.match(/\((\d+) times\)$/)) {
        repeatCount = parseInt(RegExp.$1) + 1;
      } else {
        repeatCount = 2;
      }
      line += ' (' + repeatCount + ' times)';
    }
  }

  // Create the new log entry.
  var lineToAdd = document.createElement('div');
  lineToAdd.className = 'logEvent ' + icon;
  lineToAdd.innerHTML = '<div class="eventTime">' + timestampdate + '<br/>' +
                        timestamptime + '</div><div class="eventBody">' +
                        line + '</div><div class="clear"></div>';

  // Put it in the log box.
  if (repeatCount) {
    logBox.replaceChild(lineToAdd, logBox.firstChild);
  } else {
    logBox.insertBefore(lineToAdd, logBox.firstChild);

    // If the log is too large, trim it down.
    var logMax = parseInt(GM_getValue('autoLogLength', 300));
    //GM_log('logLen=' + logLen + ', logMax=' + logMax);
    if (logMax > 0) {
      while (logLen-- > logMax) {
        logBox.removeChild(logBox.lastChild);
      }
    }
  }

  // Save the log.
  GM_setValue('itemLog', logBox.innerHTML);
}

function updateLogStats(newHow) {
  var fightCount = document.getElementById('fightCount');
  if (!fightCount) return;
    fightCount.firstChild.nodeValue = makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0));
  document.getElementById('fightWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('fightWinCountInt', 0));
  var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('fightWinPct').firstChild.nodeValue =  (isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%';
  document.getElementById('fightLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('fightLossCountInt', 0));
  var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1)
    document.getElementById('fightLossPct').firstChild.nodeValue =  (isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%';

  var hitmanCount = document.getElementById('hitmanCount');
  if (!hitmanCount) return;
  document.getElementById('hitmanCount').firstChild.nodeValue = makeCommaValue(parseInt(GM_getValue('hitmanWinCountInt', 0)) + parseInt(GM_getValue('hitmanLossCountInt', 0)));
  document.getElementById('hitmanWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('hitmanWinCountInt', 0));
  var hitmanWinPct = (GM_getValue('hitmanWinCountInt', 0)/(GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('hitmanWinPct').firstChild.nodeValue =  (isNaN(hitmanWinPct)) ? '0.0%' : hitmanWinPct + '%';
  document.getElementById('hitmanLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('hitmanLossCountInt', 0));
  var hitmanLossPct = (GM_getValue('hitmanLossCountInt', 0)/(GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('hitmanLossPct').firstChild.nodeValue =  (isNaN(hitmanLossPct)) ? '0.0%' : hitmanLossPct + '%';

  document.getElementById('totalWinDollars').firstChild.nodeValue = '$' + makeCommaValue(parseInt(GM_getValue('totalWinDollarsInt', 0)));  //Accomodates up to $999,999,999,999
  document.getElementById('totalLossDollars').firstChild.nodeValue = '$' + makeCommaValue(parseInt(GM_getValue('totalLossDollarsInt', 0)));
  document.getElementById('totalExp').firstChild.nodeValue = makeCommaValue(GM_getValue('totalExpInt', 0));

  //FIXME: These values currently only get refreshed when stamina is spent,
  //       which isn't often enough. Perhaps other stats that only need to
  //       be refreshed after stamina is spent would be more useful anyway?
  //       And the xps to next level stat already appears in the main window.
  var rate = getStaminaGainRate();
  document.getElementById('expRate').firstChild.nodeValue = rate.toFixed(2);
  document.getElementById('expToNext').firstChild.nodeValue = makeCommaValue(ptsToNextLevel);
  document.getElementById('stamToNext').firstChild.nodeValue = rate? (ptsToNextLevel / rate).toFixed(0): 'n/a';
}

function logFilterOnOff() {
  // Toggle logFilter flag
  filter = toggleCheckElt('filterLog');

  // Change filter color
  var filterElt = document.getElementById('ap_filter_log');
  if (filterElt) {
    filterElt.style.color = 'rgb(' + (filter ? '255' : '100') + ', 0, 0)';
  }

  // Log/Show Message
  var accept = GM_getValue('filterOpt') != 1;
  var patterns = getSavedList(accept ? 'filterPass' : 'filterFail');
  var msgLog = filter ? '<span class="good">Patterns ' + (accept ? 'accepted' : 'rejected') +
                        ': </span> ' + patterns.join(', ') : 'Log filtering disabled.';
  addToLog('info Icon', msgLog);
  if (GM_getValue('logOpen') != 'open') {
    alert(msgLog);
  }
}

function debugOnOff() {
  var debugElt = document.getElementById('ap_debug_log');
  var filterElt = document.getElementById('ap_filter_log');

  if (isChecked('enableDebug')) {
    addToLog('info Icon', 'Debug logging disabled.');
    GM_setValue('enableDebug', 0);
    debug = false;
    if (GM_getValue('logOpen') != 'open') {
      alert('Debug logging disabled.');
    } else {
      if (debugElt) debugElt.style.color = 'rgb(100, 0, 0)';
      if (filterElt) filterElt.style.display = 'block';
    }
  } else {
    GM_setValue('enableDebug', 'checked');
    debug = true;
    showMafiaLogBox();
    addToLog('info Icon', 'Debug logging enabled.');
    if (debugElt) debugElt.style.color = 'rgb(255, 0, 0)';
    if (filterElt) filterElt.style.display = 'none';

    debugDumpSettings();
  }
}

function DEBUG(line, level) {
  var level = (level == null) ? 0 : level;
  if (debug) {
    addToLog('info Icon', line);
    GM_log(line, level);
  }
}

function CyclePropertyList() {
  DEBUG('CyclePropertyList(): '+ GM_getValue('propertyId', ''));
  if (GM_getValue('propertyId') <= 6) {
    CyclePropertyList();
    var i = 12; //back to casinos
  } else {
    var i = GM_getValue('propertyId') - 1;
  }
  GM_setValue('propertyId', i);
}

function refreshLog() {
  var logBox = document.getElementById('logBox');
  if (logBox) {
    logBox.innerHTML = GM_getValue('itemLog', '');
  }
}

function clearLog() {
  GM_setValue('itemLog', '');

  //reset the log box
  var logBox = document.getElementById('logBox');
    logBox.innerHTML = '';
}

function clearStats() {
  //reset log statistics
  GM_setValue('fightWinCountInt', 0);
  GM_setValue('fightLossCountInt', 0);
  GM_setValue('hitmanWinCountInt',0);
  GM_setValue('hitmanWinDollarsInt','0');
  GM_setValue('hitmanLossCountInt',0);
  GM_setValue('hitmanLossDollarsInt','0');

  GM_setValue('totalExpInt', 0);
  GM_setValue('totalWinDollarsInt', '0');
  GM_setValue('totalLossDollarsInt', '0');

  GM_setValue('lastHitXp', 0);
  GM_setValue('totalHits', 0);
  GM_setValue('totalXp', 0);
  GM_setValue('currentHitXp', 0);
  GM_setValue('currentHitDollars','0');



  //ATK
  //New tracking stats for NY
  GM_setValue('hourlyStats', '0');
  GM_setValue('fightExpNY', 0);          //Number of exper. points earned from fights in NY
  GM_setValue('fightWinsNY', 0);         //Count of fights won in NY
  GM_setValue('fightWin$NY', '0');       //$ won from fights in NY
  GM_setValue('fightLossesNY', 0);       //Count of fights lost in NY
  GM_setValue('fightLoss$NY', '0');      //$ lost from fights in NY
  GM_setValue('fightLossBGCHNY', 0);     //NY Bodyguard Critical Hit losses
  GM_setValue('fightLossBGCH$NY', '0');  //NY$ lost by Bodyguard Critical Hit
  GM_setValue('fightLossCHNY', 0);       //NY Critical Hit fight losses
  GM_setValue('fightLossCH$NY', '0');    //$ lost from Critical Hit in NY fights
  GM_setValue('fightLossStrongNY', 0);   //Too Strong loss type count from NY fights
  GM_setValue('fightLossStrong$NY', '0');//$ lost from Too Strong in NY fights
  //New tracking stats for Cuba
  GM_setValue('fightExpCuba', 0);        //Number of exper. points earned from fights in Cuba
  GM_setValue('fightWinsCuba', 0);       //Count of fights won in Cuba
  GM_setValue('fightWin$Cuba', '0');     //Cuban pesos won from fights
  GM_setValue('fightLossesCuba', 0);     //Count of fights lost in Cuba
  GM_setValue('fightLoss$Cuba', '0');    //Cuban pesos lost from fights
  GM_setValue('fightLossBGCHCuba', 0);   //Bodyguard Critical Hit loss type count from Cuba fights
  GM_setValue('fightLossBGCH$Cuba', '0');//$ lost from Bodyguard Critical Hit in Cuba fights
  GM_setValue('fightLossCHCuba', 0);     //Critical Hit loss type count from Cuba fights
  GM_setValue('fightLossCH$Cuba', '0');  //$ lost from Critical Hit in Cuba fights
  GM_setValue('fightLossStrongCuba', 0); //Too Strong loss type count from Cuba fights
  GM_setValue('fightLossStrong$Cuba', '0');//$ lost from Too Strong in Cuba fights
  //New tracking stats for Moscow
  GM_setValue('fightExpMoscow', 0);        //Number of exper. points earned from fights in Moscow
  GM_setValue('fightWinsMoscow', 0);       //Count of fights won in Moscow
  GM_setValue('fightWin$Moscow', '0');     //Moscown pesos won from fights
  GM_setValue('fightLossesMoscow', 0);     //Count of fights lost in Moscow
  GM_setValue('fightLoss$Moscow', '0');    //Moscown pesos lost from fights
  GM_setValue('fightLossBGCHMoscow', 0);   //Bodyguard Critical Hit loss type count from Moscow fights
  GM_setValue('fightLossBGCH$Moscow', '0');//$ lost from Bodyguard Critical Hit in Moscow fights
  GM_setValue('fightLossCHMoscow', 0);     //Critical Hit loss type count from Moscow fights
  GM_setValue('fightLossCH$Moscow', '0');  //$ lost from Critical Hit in Moscow fights
  GM_setValue('fightLossStrongMoscow', 0); //Too Strong loss type count from Moscow fights
  GM_setValue('fightLossStrong$Moscow', '0');//$ lost from Too Strong in Moscow fights
  updateLogStats();
}

function clearHitStats () {
  GM_setValue('lastHitXp', 0);
  GM_setValue('totalHits', 0);
  GM_setValue('totalXp', 0);
  GM_setValue('currentHitXp', 0);
}

function minBankCheck() {
  // Don't allow zero value in autobank setting.
  var amount = parseInt(document.getElementById('bankConfig').value);
  if (isNaN(amount) || amount < 1) {
    alert('Minimum auto-bank amount must be 1 or higher');
    document.getElementById('bankConfig').focus();
  }

  var amountCuba = parseInt(document.getElementById('bankConfigCuba').value);
  if (isNaN(amountCuba) || amountCuba < 1) {
    alert('Minimum Cuba auto-bank amount must be 1 or higher');
    document.getElementById('bankConfigCuba').focus();
  }

  var amountMoscow = parseInt(document.getElementById('bankConfigMoscow').value);
  if (isNaN(amountMoscow) || amountMoscow < 1) {
    alert('Minimum Moscow auto-bank amount must be 1 or higher');
    document.getElementById('bankConfigMoscow').focus();
  }
}

function takeAction(link, action, context) {
  if (!link) {
    addToLog('warning Icon', 'BUG DETECTED: No link passed to takeAction().');
    return;
  }

  DEBUG('Action set to: ' + action);
  GM_xmlhttpRequest({ method: 'GET',
    url: link,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    onload: function(responseDetails) { handleResponse(responseDetails, action, context); },
    onerror: function(responseDetails) { addToLog('warning Icon', 'error status '+ responseDetails.status); }
  });
}

function createLogBox() {
  // Define CSS styles.
  makeElement('style', document.getElementsByTagName('head')[0], {'type':'text/css'}).appendChild(document.createTextNode(
    '#mafiaLogBox div.mouseunderline:hover{text-decoration:underline}' +
    '#mafiaLogBox .logEvent{border-bottom:1px solid #333; padding:4px 0px}' +
    '#mafiaLogBox .eventTime{color:#888; font-size: 10px; width:75px;  float:left}' +
    '#mafiaLogBox .eventBody{width:330px; float:right}' +
    '#mafiaLogBox .eventTime,#mafiaLogBox .eventIcon,#mafiaLogBox .eventBody{}' +
    '#mafiaLogBox .eventBody .good {color:#52E259;font-weight:bold;}' +
    '#mafiaLogBox .eventBody .bad {color:#EC2D2D;font-weight:bold;}' +
    '#mafiaLogBox .eventBody .warn {color:#EC2D2D;}' +
    '#mafiaLogBox .eventBody .money {color:#00CC00;font-weight:bold;}' +
    '#mafiaLogBox .eventBody .expense {color:#FFD927;}' +
    '#mafiaLogBox .eventBody .loot {color:#FF6633;}' +
    '#mafiaLogBox .eventBody .user {color:#FFD927;}' +
    '#mafiaLogBox .eventBody .attacker {color:#EC2D2D;}' +
    '#mafiaLogBox .eventBody .job {color:#52E259;font-weight:bold;}' +
    '#mafiaLogBox .clear{clear:both}' +
    '#mafiaLogBox .logEvent.Icon{background-repeat: no-repeat; background-position: 75px}' +
    '#mafiaLogBox .logEvent.process.Icon{background-image:url(' + stripURI(processIcon) + ')}' +
    '#mafiaLogBox .logEvent.search.Icon{background-image:url(' + stripURI(searchIcon) + ')}' +
    '#mafiaLogBox .logEvent.warning.Icon{background-image:url(' + stripURI(warningIcon) + ')}' +
    '#mafiaLogBox .logEvent.info.Icon{background-image:url(' + stripURI(infoIcon) + ')}' +
    '#mafiaLogBox .logEvent.lootbag.Icon{background-image:url(' + stripURI(lootbagIcon) + ')}' +
    '#mafiaLogBox .logEvent.found.Icon{background-image:url(' + stripURI(lootbagIcon) + ')}' +
    '#mafiaLogBox .logEvent.updateGood.Icon{background-image:url(' + stripURI(updateGoodIcon) + ')}' +
    '#mafiaLogBox .logEvent.updateBad.Icon{background-image:url(' + stripURI(updateBadIcon) + ')}' +
    '#mafiaLogBox .logEvent.pause.Icon{background-image:url(' + stripURI(pauseIcon) + ')}' +
    '#mafiaLogBox .logEvent.play.Icon{background-image:url(' + stripURI(playIcon) + ')}' +
    '#mafiaLogBox .logEvent.good.Icon{background-image:url(' + stripURI(goodIcon) + ')}' +
    '#mafiaLogBox .logEvent.bad.Icon{background-image:url(' + stripURI(badIcon) + ')}' +
    '#mafiaLogBox .logEvent.experience.Icon{background-image:url(' + stripURI(experienceIcon) + ')}' +
    '#mafiaLogBox .logEvent.experience.Icon{background-image:url(' + stripURI(experienceIcon) + ')}' +
    '#mafiaLogBox .logEvent.health.Icon{background-image:url(' + stripURI(healthIcon) + ')}' +
    '#mafiaLogBox .logEvent.cash.Icon{background-image:url(' + stripURI(cashIcon) + ')}' +
    '#mafiaLogBox .logEvent.cashCuba.Icon{background-image:url(' + stripURI(cashCubaIcon) + ')}' +
    '#mafiaLogBox .logEvent.cashMoscow.Icon{background-image:url(' + stripURI(cashMoscowIcon) + ')}' +
    '#mafiaLogBox .logEvent.energyPack.Icon{background-image:url(' + stripURI(energyPackIcon) + ')}'
  ));


  var mafiaLogBox = makeElement('div', document.body, {'id':'mafiaLogBox', 'style':'position: fixed; right: 30px; top: 10px; bottom: 10px; width: 450px; background: black url(http://mwdirectfb3.static.zynga.com/mwfb/graphics/MW_FB_Background_760.gif); text-align: left; padding: 5px; border: 1px solid; border-color: #FFFFFF; z-index: 98; font-size: 12px;'});

  var logClrButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; left: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    logClrButton.appendChild(document.createTextNode('clear log'));
    logClrButton.addEventListener('click', clearLog, false);

  var logClrStatsButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; left: 85px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    logClrStatsButton.appendChild(document.createTextNode('clear stats'));
    logClrStatsButton.addEventListener('click', clearStats, false);

  var closeLogButton = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'style':'position: absolute; right: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    closeLogButton.appendChild(document.createTextNode('close'));
    closeLogButton.addEventListener('click', hideMafiaLogBox, false);

  var title = 'Click to toggle log filtering';
  var filterElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_filter_log', 'style':'display:'+(debug ? 'none' : 'block')+'; position: absolute; right: 160px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(' + (filter ? '255' : '100') + ', 0, 0);'});
    filterElt.appendChild(document.createTextNode('filter'));
    filterElt.addEventListener('click', logFilterOnOff, false);

  var title = 'Click to toggle debug log';
  var debugElt = makeElement('div', mafiaLogBox, {'class':'mouseunderline', 'title':title,'id':'ap_debug_log', 'style':'position: absolute; right: 80px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(' + (debug ? '255' : '100') + ', 0, 0);'});
    debugElt.appendChild(document.createTextNode('debug'));
    debugElt.addEventListener('click', debugOnOff, false);

  var logBox = makeElement('div', mafiaLogBox, {'id':'logBox', 'style':'position: absolute; overflow: auto; right: 0px; top: 20px; bottom: 68px; width: 448px; background-color: #111111; font-size:11px; color: #BCD2EA; text-align: left; padding: 5px; border: 1px solid;'});
    logBox.innerHTML = GM_getValue('itemLog', '');

  //Change Stats Displayed based on current stamina burner
  //fight Stats are currently default for leftmost portion of Stats
  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fights:'));
  makeElement('div', mafiaLogBox, {'id':'fightCount', 'style':'position: absolute; right: 340px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0))));
  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Won:'));
  makeElement('div', mafiaLogBox, {'id':'fightWinCount', 'style':'position: absolute; right: 340px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0))));
  var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'fightWinPct', 'style':'position: absolute; right: 295px; bottom: 18px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%'));
  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; bottom: 3px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Lost:'));
  makeElement('div', mafiaLogBox, {'id':'fightLossCount', 'style':'position: absolute; right: 340px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightLossCountInt', 0))));
  var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'fightLossPct', 'style':'position: absolute; right: 295px; bottom: 3px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 175px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Hits:'));
  makeElement('div', mafiaLogBox, {'id':'hitmanCount', 'style':'position: absolute; right: 185px; bottom: 33px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue((GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)))));
  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 175px; bottom: 18px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Succ:'));
  makeElement('div', mafiaLogBox, {'id':'hitmanWinCount', 'style':'position: absolute; right: 185px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('hitmanWinCountInt', 0))));
  var hitmanWinPct = (GM_getValue('hitmanWinCountInt', 0)/(GM_getValue('hitmanWinCountInt', 0) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'hitmanWinPct', 'style':'position: absolute; right: 140px; bottom: 18px; font-size: 10px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(hitmanWinPct)) ? '0.0%' : hitmanWinPct + '%'));
  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 175px; bottom: 3px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fail:'));
  makeElement('div', mafiaLogBox, {'id':'hitmanLossCount', 'style':'position: absolute; right: 185px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('hitmanLossCountInt', 0))));
  var hitmanLossPct = (GM_getValue('hitmanLossCountInt', 0)/(GM_getValue('hitmanWinCountInt', 1) + GM_getValue('hitmanLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'hitmanLossPct', 'style':'position: absolute; right: 140px; bottom: 3px; font-size: 10px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(hitmanLossPct)) ? '0.0%' : hitmanLossPct + '%'));

  makeElement('div', mafiaLogBox, {'id':'totalWinDollars', 'style':'position: absolute; right: 5px; bottom: 18px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode('$' + makeCommaValue(parseInt(GM_getValue('totalWinDollarsInt', 0)))));  //Accomodates up to $999,999,999,999
  makeElement('div', mafiaLogBox, {'id':'totalLossDollars', 'style':'position: absolute; right: 5px; bottom: 3px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode('$' + makeCommaValue(parseInt(GM_getValue('totalLossDollarsInt', 0)))));
  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Exp Gained:'));
  makeElement('div', mafiaLogBox, {'id':'totalExp', 'style':'position: absolute; right: 329px; bottom: 50px; font-size: 10px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('totalExpInt', 0))));
  makeElement('hr', mafiaLogBox, {'style':'position: absolute; left: 0; bottom: 42px; height: 1px; border: 0px; width: 90%; margin-left: 5%; color: #666666; background-color: #666666'});
  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 5px; bottom: 33px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Total $ Won/Lost'));
  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 267px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Gain Rate:'));
  var rate = getStaminaGainRate();
    makeElement('div', mafiaLogBox, {'id':'expRate', 'style':'position: absolute; right: 240px; bottom: 50px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(rate.toFixed(2)));
  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 175px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Nxt Lvl In:'));
  makeElement('div', mafiaLogBox, {'id':'expToNext', 'style':'position: absolute; right: 141px; bottom: 50px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(makeCommaValue(ptsToNextLevel)));
  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 36px; bottom: 50px; font-size: 10px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Stam Req\'d to Lvl:'));
  makeElement('div', mafiaLogBox, {'id':'stamToNext', 'style':'position: absolute; right: 2px; bottom: 50px; font-size: 10px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(rate? (ptsToNextLevel / rate).toFixed(0) : 'n/a'));
}

function createSettingsBox() {
  if (document.getElementById('settingsBox')) return;

  if (!document.getElementById('ap_settings_css')) {
    makeElement('style', document.getElementsByTagName('head')[0], {'id':'ap_settings_css', 'type':'text/css'}).appendChild(document.createTextNode(
      '#settingsBox #tabNav div{border-right:1px solid #000;float:left;padding:0 7px;position:static;text-align:center}' +
      '#settingsBox #tabNav div.selected{background-image:url(' + stripURI(tabSelectedImage) + ')}' +
      '#settingsBox #tabNav div a{color:#fff;font-weight:700}' +
      '#settingsBox .sexy_button{position:absolute;background-image:url(' + stripURI(blackBgImage) + ');border:1px solid #AAAAAA;color:#D0D0D0;cursor:pointer;display:block;float:left;font-size:13px;font-weight:700;padding:2px;text-decoration:none;width:auto}' +
      '#settingsBox .sexy_button button{background:transparent;border:1px none #FFF;color:#D0D0D0;cursor:pointer;font-size:13px;font-weight:700;margin:0}' +
      '#settingsBox .sexy_button button:hover{color:#D0D0D0;font-weight:700;text-decoration:none}' +
      '#settingsBox .tabcontent{display:none;height:420px;top:40px;width:600px}' +
      '#settingsBox div,#settingsBox select,#settingsBox textarea{position:absolute}' +
      '#settingsBox label {font-weight: normal; color: #BCD2EA}' +
      '#settingsBox #generalTab div, #socialTab div, #displayTab div, ' +
      '#settingsBox #energyTab div {position: static;}' +
      '#settingsBox #generalTab span, #socialTab span, #displayTab span, ' +
      '#settingsBox #energyTab span {position: static; vertical-align: middle}' +
      '#settingsBox #generalTab select, #socialTab select, #displayTab select, ' +
      '#settingsBox #energyTab select {position: static;}' +
      '#settingsBox #generalTab textarea, #socialTab textarea, #displayTab textarea, ' +
      '#settingsBox #energyTab textarea {position: static;}' +
      '#settingsBox #generalTab input[type=radio], #socialTab input[type=radio], #displayTab input[type=radio], ' +
      '#settingsBox #energyTab input[type=radio] {vertical-align: middle}' +
      '#settingsBox #generalTab input[type=checkbox], #socialTab input[type=checkbox], #displayTab input[type=checkbox], ' +
      '#settingsBox #energyTab input[type=checkbox] {vertical-align: middle}' +
      '#settingsBox #generalTab input, #socialTab input, #displayTab input, ' +
      '#settingsBox #energyTab input {position: static; margin: 0;}' +
      '#settingsBox #generalTab .lhs, #socialTab .lhs, #displayTab .lhs, ' +
      '#settingsBox #energyTab .lhs {position: static; width: 35%; float: left; text-align: right; padding: 3px;}' +
      '#settingsBox #generalTab .rhs, #socialTab .rhs, #displayTab .rhs, ' +
      '#settingsBox #energyTab .rhs {position: static; float: left; padding: 3px;}' +
      '#settingsBox #generalTab .single, #socialTab .single, #displayTab .single, ' +
      '#settingsBox #energyTab .single {position: static; text-align: center}' +
      '#settingsBox #generalTab .hide, #socialTab .hide, #displayTab .hide, ' +
      '#settingsBox #energyTab .hide {clear: both; visibility: hidden;}' +
      '#settingsBox #staminaTab div {position: static;}' +
      '#settingsBox #staminaTab span {position: static; vertical-align: middle}' +
      '#settingsBox #staminaTab select {position: static;}' +
      '#settingsBox #staminaTab textarea {position: static;}' +
      '#settingsBox #staminaTab input {position: static; margin: 0;}' +
      '#settingsBox #staminaTab .lhs {position: static; width: 40%; float: left; text-align: right; padding: 5px;}' +
      '#settingsBox #staminaTab .rhs {position: static; float: left; padding: 5px;}' +
      '#settingsBox #staminaTab .single {position: static; text-align: center}' +
      '#settingsBox #staminaTab .hide {clear: both; visibility: hidden;}'
    ));
  }

  // This creates the settings box just like a facebook popup
  var elt = makeElement('div', document.body, {'class':'generic_dialog pop_dialog', 'id':'GenDialogPopDialog'});
  elt = makeElement('div', elt, {'class':'generic_dialog_popup', 'style':'top: 30px; width: 540px;'});
  elt = makeElement('div', elt, {'class':'pop_content popcontent_advanced', 'id':'pop_content'});
  var settingsBox = makeElement('div', elt, {'style':'border: 2px; position: fixed; left: 329px; top: 30px; width: 600px; height: 500px; font-size: 14px; z-index: 100; padding: 5px; border: 1px solid #A0A0A0; color: #BCD2EA; background: black', 'id':'settingsBox'});
  //End settings box

  makeElement('img', settingsBox, {'src':stripURI(closeButtonIcon), 'style':'position: absolute; top: 3px; right: 3px; cursor: pointer;'}).addEventListener('click', toggleSettings, false);

  // NOTE: Use the 1st line below to center the button bar, or the 2nd line
  //       to put the bar on the left side.
  //elt = makeElement('div', settingsBox, {'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; text-align: center'});
  elt = makeElement('div', settingsBox, {'style':'position: static; width: 100%; text-align: left'});

  var tabNav = makeElement('div', elt, {'id':'tabNav', 'style':'position: static; display: inline-block; background: transparent url(' + stripURI(blackBgImage) + ') repeat-x scroll 0 0; border: 1px solid #AAAAAA; fontsize: 13px; line-height: 28px; height: 32px;'});
    var generalTabLink = makeElement('div', tabNav, {'class':'selected', 'id':'General_Tab'});
      makeElement('a', generalTabLink, {'href':'#', 'rel':'generalTab'}).appendChild(document.createTextNode('General'));
    var displayTabLink = makeElement('div', tabNav, {'id':'Display_Tab'});
      makeElement('a', displayTabLink, {'href':'#', 'rel':'displayTab'}).appendChild(document.createTextNode('Display'));
    var socialTabLink = makeElement('div', tabNav, {'id':'Social_Tab'});
      makeElement('a', socialTabLink, {'href':'#', 'rel':'socialTab'}).appendChild(document.createTextNode('Social'));
    var autostatTabLink = makeElement('div', tabNav, {'id':'Autostat_Tab'});
      makeElement('a', autostatTabLink, {'href':'#', 'rel':'autostatTab'}).appendChild(document.createTextNode('Autostat'));
    var energyTabLink = makeElement('div', tabNav, {'id':'Energy_Tab'});
      makeElement('a', energyTabLink, {'href':'#', 'rel':'energyTab'}).appendChild(document.createTextNode('Energy'));
    var staminaTabLink = makeElement('div', tabNav, {'id':'Stamina_Tab'});
      makeElement('a', staminaTabLink, {'href':'#', 'rel':'staminaTab'}).appendChild(document.createTextNode('Stamina'));
    var moneyTabLink = makeElement('div', tabNav, {'id':'Money_Tab'});
      makeElement('a', moneyTabLink, {'href':'#', 'rel':'moneyTab'}).appendChild(document.createTextNode('Money'));
    var aboutTabLink = makeElement('div', tabNav, {'id':'About_Tab'});
      makeElement('a', aboutTabLink, {'href':'#', 'rel':'aboutTab'}).appendChild(document.createTextNode('About'));

  // Create General tab.
  var generalTab = createGeneralTab();
  settingsBox.appendChild(generalTab);

  // Create Display tab.
  var displayTab = createDisplayTab();
  settingsBox.appendChild(displayTab);

  // Create Social tab.
  var socialTab = createSocialTab();
  settingsBox.appendChild(socialTab);

  // Create Autostat tab.
  var autostatTab = createAutostatTab();
  settingsBox.appendChild(autostatTab);

  // Create energy tab.
  var energyTab = createEnergyTab();
  settingsBox.appendChild(energyTab);

  // Create stamina tab.
  var staminaTab = createStaminaTab();
  settingsBox.appendChild(staminaTab);

  // Create money tab.
  var moneyTab = createMoneyTab();
  settingsBox.appendChild(moneyTab);

  // Create about tab.
  var aboutTab = createAboutTab();
  settingsBox.appendChild(aboutTab);

  // Create save button
  var saveButton = makeElement('span', settingsBox, {'class':'sexy_button', 'style':'left: 10px; bottom: 10px;'});
  makeElement('button', saveButton).appendChild(document.createTextNode('Save Settings'));
  saveButton.addEventListener('click', saveSettings, false);

  // Create Update button
  var updateButton = makeElement('span', settingsBox, {'class':'sexy_button', 'style':'right: 10px; bottom: 10px;'});
  makeElement('button', updateButton).appendChild(document.createTextNode('Check for Updates'));
  updateButton.addEventListener('click', updateScript, false);

  // FIXME: Is it necessary to recreate this stuff repeatedly? Or is it just
  //        a memory leak?
  // Tab code from:http://www.dynamicdrive.com/dynamicindex17/tabcontent.htm converted into a data URI
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript', 'src':
    "data:application/x-javascript;base64,Ly8qKiBUYWIgQ29udGVudCBzY3JpcHQgdjIuMC0gqSBEeW5hbWljIERyaXZlIERIVE1MIGNvZGUgbGlicmFyeSAoaHR0cDovL3d3dy5keW5hbWljZHJpdmUuY29tKQ0KLy8qKiBVcGRhdGVkIE9jdCA3dGgsIDA3IHRvIHZlcnNpb24gMi4wLiBDb250YWlucyBudW1lcm91cyBpbXByb3ZlbWVudHM6DQovLyAgIC1BZGRlZCBBdXRvIE1vZGU6IFNjcmlwdCBhdXRvIHJvdGF0ZXMgdGhlIHRhYnMgYmFzZWQgb24gYW4gaW50ZXJ2YWwsIHVudGlsIGEgdGFiIGlzIGV4cGxpY2l0bHkgc2VsZWN0ZWQNCi8vICAgLUFiaWxpdHkgdG8gZXhwYW5kL2NvbnRyYWN0IGFyYml0cmFyeSBESVZzIG9uIHRoZSBwYWdlIGFzIHRoZSB0YWJiZWQgY29udGVudCBpcyBleHBhbmRlZC8gY29udHJhY3RlZA0KLy8gICAtQWJpbGl0eSB0byBkeW5hbWljYWxseSBzZWxlY3QgYSB0YWIgZWl0aGVyIGJhc2VkIG9uIGl0cyBwb3NpdGlvbiB3aXRoaW4gaXRzIHBlZXJzLCBvciBpdHMgSUQgYXR0cmlidXRlIChnaXZlIHRoZSB0YXJnZXQgdGFiIG9uZSAxc3QpDQovLyAgIC1BYmlsaXR5IHRvIHNldCB3aGVyZSB0aGUgQ1NTIGNsYXNzbmFtZSAic2VsZWN0ZWQiIGdldCBhc3NpZ25lZC0gZWl0aGVyIHRvIHRoZSB0YXJnZXQgdGFiJ3MgbGluayAoIkEiKSwgb3IgaXRzIHBhcmVudCBjb250YWluZXINCi8vKiogVXBkYXRlZCBGZWIgMTh0aCwgMDggdG8gdmVyc2lvbiAyLjE6IEFkZHMgYSAidGFiaW5zdGFuY2UuY3ljbGVpdChkaXIpIiBtZXRob2QgdG8gY3ljbGUgZm9yd2FyZCBvciBiYWNrd2FyZCBiZXR3ZWVuIHRhYnMgZHluYW1pY2FsbHkNCi8vKiogVXBkYXRlZCBBcHJpbCA4dGgsIDA4IHRvIHZlcnNpb24gMi4yOiBBZGRzIHN1cHBvcnQgZm9yIGV4cGFuZGluZyBhIHRhYiB1c2luZyBhIFVSTCBwYXJhbWV0ZXIgKGllOiBodHRwOi8vbXlzaXRlLmNvbS90YWJjb250ZW50Lmh0bT90YWJpbnRlcmZhY2VpZD0wKSANCg0KLy8vL05PIE5FRUQgVE8gRURJVCBCRUxPVy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLw0KDQpmdW5jdGlvbiBkZHRhYmNvbnRlbnQodGFiaW50ZXJmYWNlaWQpew0KCXRoaXMudGFiaW50ZXJmYWNlaWQ9dGFiaW50ZXJmYWNlaWQgLy9JRCBvZiBUYWIgTWVudSBtYWluIGNvbnRhaW5lcg0KCXRoaXMudGFicz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJpbnRlcmZhY2VpZCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImEiKSAvL0dldCBhbGwgdGFiIGxpbmtzIHdpdGhpbiBjb250YWluZXINCgl0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlPXRydWUNCgl0aGlzLmhvdHRhYnNwb3NpdGlvbnM9W10gLy9BcnJheSB0byBzdG9yZSBwb3NpdGlvbiBvZiB0YWJzIHRoYXQgaGF2ZSBhICJyZWwiIGF0dHIgZGVmaW5lZCwgcmVsYXRpdmUgdG8gYWxsIHRhYiBsaW5rcywgd2l0aGluIGNvbnRhaW5lcg0KCXRoaXMuY3VycmVudFRhYkluZGV4PTAgLy9JbmRleCBvZiBjdXJyZW50bHkgc2VsZWN0ZWQgaG90IHRhYiAodGFiIHdpdGggc3ViIGNvbnRlbnQpIHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkNCgl0aGlzLnN1YmNvbnRlbnRpZHM9W10gLy9BcnJheSB0byBzdG9yZSBpZHMgb2YgdGhlIHN1YiBjb250ZW50cyAoInJlbCIgYXR0ciB2YWx1ZXMpDQoJdGhpcy5yZXZjb250ZW50aWRzPVtdIC8vQXJyYXkgdG8gc3RvcmUgaWRzIG9mIGFyYml0cmFyeSBjb250ZW50cyB0byBleHBhbmQvY29udGFjdCBhcyB3ZWxsICgicmV2IiBhdHRyIHZhbHVlcykNCgl0aGlzLnNlbGVjdGVkQ2xhc3NUYXJnZXQ9ImxpbmsiIC8va2V5d29yZCB0byBpbmRpY2F0ZSB3aGljaCB0YXJnZXQgZWxlbWVudCB0byBhc3NpZ24gInNlbGVjdGVkIiBDU1MgY2xhc3MgKCJsaW5rcGFyZW50IiBvciAibGluayIpDQp9DQoNCmRkdGFiY29udGVudC5nZXRDb29raWU9ZnVuY3Rpb24oTmFtZSl7IA0KCXZhciByZT1uZXcgUmVnRXhwKE5hbWUrIj1bXjtdKyIsICJpIik7IC8vY29uc3RydWN0IFJFIHRvIHNlYXJjaCBmb3IgdGFyZ2V0IG5hbWUvdmFsdWUgcGFpcg0KCWlmIChkb2N1bWVudC5jb29raWUubWF0Y2gocmUpKSAvL2lmIGNvb2tpZSBmb3VuZA0KCQlyZXR1cm4gZG9jdW1lbnQuY29va2llLm1hdGNoKHJlKVswXS5zcGxpdCgiPSIpWzFdIC8vcmV0dXJuIGl0cyB2YWx1ZQ0KCXJldHVybiAiIg0KfQ0KDQpkZHRhYmNvbnRlbnQuc2V0Q29va2llPWZ1bmN0aW9uKG5hbWUsIHZhbHVlKXsNCglkb2N1bWVudC5jb29raWUgPSBuYW1lKyI9Iit2YWx1ZSsiO3BhdGg9LyIgLy9jb29raWUgdmFsdWUgaXMgZG9tYWluIHdpZGUgKHBhdGg9LykNCn0NCg0KZGR0YWJjb250ZW50LnByb3RvdHlwZT17DQoNCglleHBhbmRpdDpmdW5jdGlvbih0YWJpZF9vcl9wb3NpdGlvbil7IC8vUFVCTElDIGZ1bmN0aW9uIHRvIHNlbGVjdCBhIHRhYiBlaXRoZXIgYnkgaXRzIElEIG9yIHBvc2l0aW9uKGludCkgd2l0aGluIGl0cyBwZWVycw0KCQl0aGlzLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCXZhciB0YWJyZWY9IiINCgkJdHJ5ew0KCQkJaWYgKHR5cGVvZiB0YWJpZF9vcl9wb3NpdGlvbj09InN0cmluZyIgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiaWRfb3JfcG9zaXRpb24pLmdldEF0dHJpYnV0ZSgicmVsIikpIC8vaWYgc3BlY2lmaWVkIHRhYiBjb250YWlucyAicmVsIiBhdHRyDQoJCQkJdGFicmVmPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmlkX29yX3Bvc2l0aW9uKQ0KCQkJZWxzZSBpZiAocGFyc2VJbnQodGFiaWRfb3JfcG9zaXRpb24pIT1OYU4gJiYgdGhpcy50YWJzW3RhYmlkX29yX3Bvc2l0aW9uXS5nZXRBdHRyaWJ1dGUoInJlbCIpKSAvL2lmIHNwZWNpZmllZCB0YWIgY29udGFpbnMgInJlbCIgYXR0cg0KCQkJCXRhYnJlZj10aGlzLnRhYnNbdGFiaWRfb3JfcG9zaXRpb25dDQoJCX0NCgkJY2F0Y2goZXJyKXthbGVydCgiSW52YWxpZCBUYWIgSUQgb3IgcG9zaXRpb24gZW50ZXJlZCEiKX0NCgkJaWYgKHRhYnJlZiE9IiIpIC8vaWYgYSB2YWxpZCB0YWIgaXMgZm91bmQgYmFzZWQgb24gZnVuY3Rpb24gcGFyYW1ldGVyDQoJCQl0aGlzLmV4cGFuZHRhYih0YWJyZWYpIC8vZXhwYW5kIHRoaXMgdGFiDQoJfSwNCg0KCWN5Y2xlaXQ6ZnVuY3Rpb24oZGlyLCBhdXRvcnVuKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gbW92ZSBmb3dhcmQgb3IgYmFja3dhcmRzIHRocm91Z2ggZWFjaCBob3QgdGFiICh0YWJpbnN0YW5jZS5jeWNsZWl0KCdmb3dhcmQvYmFjaycpICkNCgkJaWYgKGRpcj09Im5leHQiKXsNCgkJCXZhciBjdXJyZW50VGFiSW5kZXg9KHRoaXMuY3VycmVudFRhYkluZGV4PHRoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGgtMSk%2FIHRoaXMuY3VycmVudFRhYkluZGV4KzEgOiAwDQoJCX0NCgkJZWxzZSBpZiAoZGlyPT0icHJldiIpew0KCQkJdmFyIGN1cnJlbnRUYWJJbmRleD0odGhpcy5jdXJyZW50VGFiSW5kZXg%2BMCk%2FIHRoaXMuY3VycmVudFRhYkluZGV4LTEgOiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoLTENCgkJfQ0KCQlpZiAodHlwZW9mIGF1dG9ydW49PSJ1bmRlZmluZWQiKSAvL2lmIGN5Y2xlaXQoKSBpcyBiZWluZyBjYWxsZWQgYnkgdXNlciwgdmVyc3VzIGF1dG9ydW4oKSBmdW5jdGlvbg0KCQkJdGhpcy5jYW5jZWxhdXRvcnVuKCkgLy9zdG9wIGF1dG8gY3ljbGluZyBvZiB0YWJzIChpZiBydW5uaW5nKQ0KCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zW2N1cnJlbnRUYWJJbmRleF1dKQ0KCX0sDQoNCglzZXRwZXJzaXN0OmZ1bmN0aW9uKGJvb2wpeyAvL1BVQkxJQyBmdW5jdGlvbiB0byB0b2dnbGUgcGVyc2lzdGVuY2UgZmVhdHVyZQ0KCQkJdGhpcy5lbmFibGV0YWJwZXJzaXN0ZW5jZT1ib29sDQoJfSwNCg0KCXNldHNlbGVjdGVkQ2xhc3NUYXJnZXQ6ZnVuY3Rpb24ob2Jqc3RyKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gc2V0IHdoaWNoIHRhcmdldCBlbGVtZW50IHRvIGFzc2lnbiAic2VsZWN0ZWQiIENTUyBjbGFzcyAoImxpbmtwYXJlbnQiIG9yICJsaW5rIikNCgkJdGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PW9ianN0ciB8fCAibGluayINCgl9LA0KDQoJZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldDpmdW5jdGlvbih0YWJyZWYpeyAvL1JldHVybnMgdGFyZ2V0IGVsZW1lbnQgdG8gYXNzaWduICJzZWxlY3RlZCIgQ1NTIGNsYXNzIHRvDQoJCXJldHVybiAodGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PT0oImxpbmtwYXJlbnQiLnRvTG93ZXJDYXNlKCkpKT8gdGFicmVmLnBhcmVudE5vZGUgOiB0YWJyZWYNCgl9LA0KDQoJdXJscGFyYW1zZWxlY3Q6ZnVuY3Rpb24odGFiaW50ZXJmYWNlaWQpew0KCQl2YXIgcmVzdWx0PXdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cCh0YWJpbnRlcmZhY2VpZCsiPShcXGQrKSIsICJpIikpIC8vY2hlY2sgZm9yICI%2FdGFiaW50ZXJmYWNlaWQ9MiIgaW4gVVJMDQoJCXJldHVybiAocmVzdWx0PT1udWxsKT8gbnVsbCA6IHBhcnNlSW50KFJlZ0V4cC4kMSkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXgsIHdoZXJlIGluZGV4IChpbnQpIGlzIHRoZSBzZWxlY3RlZCB0YWIncyBpbmRleA0KCX0sDQoNCglleHBhbmR0YWI6ZnVuY3Rpb24odGFicmVmKXsNCgkJdmFyIHN1YmNvbnRlbnRpZD10YWJyZWYuZ2V0QXR0cmlidXRlKCJyZWwiKSAvL0dldCBpZCBvZiBzdWJjb250ZW50IHRvIGV4cGFuZA0KCQkvL0dldCAicmV2IiBhdHRyIGFzIGEgc3RyaW5nIG9mIElEcyBpbiB0aGUgZm9ybWF0ICIsam9obixnZW9yZ2UsdHJleSxldGMsIiB0byBlYXNpbHkgc2VhcmNoIHRocm91Z2gNCgkJdmFyIGFzc29jaWF0ZWRyZXZpZHM9KHRhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpKT8gIiwiK3RhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpLnJlcGxhY2UoL1xzKy8sICIiKSsiLCIgOiAiIg0KCQl0aGlzLmV4cGFuZHN1YmNvbnRlbnQoc3ViY29udGVudGlkKQ0KCQl0aGlzLmV4cGFuZHJldmNvbnRlbnQoYXNzb2NpYXRlZHJldmlkcykNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMudGFicy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIGFsbCB0YWJzLCBhbmQgYXNzaWduIG9ubHkgdGhlIHNlbGVjdGVkIHRhYiB0aGUgQ1NTIGNsYXNzICJzZWxlY3RlZCINCgkJCXRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT0odGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIik9PXN1YmNvbnRlbnRpZCk%2FICJzZWxlY3RlZCIgOiAiIg0KCQl9DQoJCWlmICh0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlKSAvL2lmIHBlcnNpc3RlbmNlIGVuYWJsZWQsIHNhdmUgc2VsZWN0ZWQgdGFiIHBvc2l0aW9uKGludCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlkZHRhYmNvbnRlbnQuc2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQsIHRhYnJlZi50YWJwb3NpdGlvbikNCgkJdGhpcy5zZXRjdXJyZW50dGFiaW5kZXgodGFicmVmLnRhYnBvc2l0aW9uKSAvL3JlbWVtYmVyIHBvc2l0aW9uIG9mIHNlbGVjdGVkIHRhYiB3aXRoaW4gaG90dGFic3Bvc2l0aW9uc1tdIGFycmF5DQoJfSwNCg0KCWV4cGFuZHN1YmNvbnRlbnQ6ZnVuY3Rpb24oc3ViY29udGVudGlkKXsNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMuc3ViY29udGVudGlkcy5sZW5ndGg7IGkrKyl7DQoJCQl2YXIgc3ViY29udGVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnN1YmNvbnRlbnRpZHNbaV0pIC8vY2FjaGUgY3VycmVudCBzdWJjb250ZW50IG9iaiAoaW4gZm9yIGxvb3ApDQoJCQlzdWJjb250ZW50LnN0eWxlLmRpc3BsYXk9KHN1YmNvbnRlbnQuaWQ9PXN1YmNvbnRlbnRpZCk%2FICJibG9jayIgOiAibm9uZSIgLy8ic2hvdyIgb3IgaGlkZSBzdWIgY29udGVudCBiYXNlZCBvbiBtYXRjaGluZyBpZCBhdHRyIHZhbHVlDQoJCX0NCgl9LA0KDQoJZXhwYW5kcmV2Y29udGVudDpmdW5jdGlvbihhc3NvY2lhdGVkcmV2aWRzKXsNCgkJdmFyIGFsbHJldmlkcz10aGlzLnJldmNvbnRlbnRpZHMNCgkJZm9yICh2YXIgaT0wOyBpPGFsbHJldmlkcy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIHJldiBhdHRyaWJ1dGVzIGZvciBhbGwgdGFicyBpbiB0aGlzIHRhYiBpbnRlcmZhY2UNCgkJCS8vaWYgYW55IHZhbHVlcyBzdG9yZWQgd2l0aGluIGFzc29jaWF0ZWRyZXZpZHMgbWF0Y2hlcyBvbmUgd2l0aGluIGFsbHJldmlkcywgZXhwYW5kIHRoYXQgRElWLCBvdGhlcndpc2UsIGNvbnRyYWN0IGl0DQoJCQlkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbGxyZXZpZHNbaV0pLnN0eWxlLmRpc3BsYXk9KGFzc29jaWF0ZWRyZXZpZHMuaW5kZXhPZigiLCIrYWxscmV2aWRzW2ldKyIsIikhPS0xKT8gImJsb2NrIiA6ICJub25lIg0KCQl9DQoJfSwNCg0KCXNldGN1cnJlbnR0YWJpbmRleDpmdW5jdGlvbih0YWJwb3NpdGlvbil7IC8vc3RvcmUgY3VycmVudCBwb3NpdGlvbiBvZiB0YWIgKHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkpDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoOyBpKyspew0KCQkJaWYgKHRhYnBvc2l0aW9uPT10aGlzLmhvdHRhYnNwb3NpdGlvbnNbaV0pew0KCQkJCXRoaXMuY3VycmVudFRhYkluZGV4PWkNCgkJCQlicmVhaw0KCQkJfQ0KCQl9DQoJfSwNCg0KCWF1dG9ydW46ZnVuY3Rpb24oKXsgLy9mdW5jdGlvbiB0byBhdXRvIGN5Y2xlIHRocm91Z2ggYW5kIHNlbGVjdCB0YWJzIGJhc2VkIG9uIGEgc2V0IGludGVydmFsDQoJCXRoaXMuY3ljbGVpdCgnbmV4dCcsIHRydWUpDQoJfSwNCg0KCWNhbmNlbGF1dG9ydW46ZnVuY3Rpb24oKXsNCgkJaWYgKHR5cGVvZiB0aGlzLmF1dG9ydW50aW1lciE9InVuZGVmaW5lZCIpDQoJCQljbGVhckludGVydmFsKHRoaXMuYXV0b3J1bnRpbWVyKQ0KCX0sDQoNCglpbml0OmZ1bmN0aW9uKGF1dG9tb2RlcGVyaW9kKXsNCgkJdmFyIHBlcnNpc3RlZHRhYj1kZHRhYmNvbnRlbnQuZ2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQpIC8vZ2V0IHBvc2l0aW9uIG9mIHBlcnNpc3RlZCB0YWIgKGFwcGxpY2FibGUgaWYgcGVyc2lzdGVuY2UgaXMgZW5hYmxlZCkNCgkJdmFyIHNlbGVjdGVkdGFiPS0xIC8vQ3VycmVudGx5IHNlbGVjdGVkIHRhYiBpbmRleCAoLTEgbWVhbmluZyBub25lKQ0KCQl2YXIgc2VsZWN0ZWR0YWJmcm9tdXJsPXRoaXMudXJscGFyYW1zZWxlY3QodGhpcy50YWJpbnRlcmZhY2VpZCkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXggZnJvbTogdGFiY29udGVudC5odG0%2FdGFiaW50ZXJmYWNlaWQ9aW5kZXgNCgkJdGhpcy5hdXRvbW9kZXBlcmlvZD1hdXRvbW9kZXBlcmlvZCB8fCAwDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLnRhYnMubGVuZ3RoOyBpKyspew0KCQkJdGhpcy50YWJzW2ldLnRhYnBvc2l0aW9uPWkgLy9yZW1lbWJlciBwb3NpdGlvbiBvZiB0YWIgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIikpew0KCQkJCXZhciB0YWJpbnN0YW5jZT10aGlzDQoJCQkJdGhpcy5ob3R0YWJzcG9zaXRpb25zW3RoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGhdPWkgLy9zdG9yZSBwb3NpdGlvbiBvZiAiaG90IiB0YWIgKCJyZWwiIGF0dHIgZGVmaW5lZCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQkJdGhpcy5zdWJjb250ZW50aWRzW3RoaXMuc3ViY29udGVudGlkcy5sZW5ndGhdPXRoaXMudGFic1tpXS5nZXRBdHRyaWJ1dGUoInJlbCIpIC8vc3RvcmUgaWQgb2Ygc3ViIGNvbnRlbnQgKCJyZWwiIGF0dHIgdmFsdWUpDQoJCQkJdGhpcy50YWJzW2ldLm9uY2xpY2s9ZnVuY3Rpb24oKXsNCgkJCQkJdGFiaW5zdGFuY2UuZXhwYW5kdGFiKHRoaXMpDQoJCQkJCXRhYmluc3RhbmNlLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCQkJCXJldHVybiBmYWxzZQ0KCQkJCX0NCgkJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmV2IikpeyAvL2lmICJyZXYiIGF0dHIgZGVmaW5lZCwgc3RvcmUgZWFjaCB2YWx1ZSB3aXRoaW4gInJldiIgYXMgYW4gYXJyYXkgZWxlbWVudA0KCQkJCQl0aGlzLnJldmNvbnRlbnRpZHM9dGhpcy5yZXZjb250ZW50aWRzLmNvbmNhdCh0aGlzLnRhYnNbaV0uZ2V0QXR0cmlidXRlKCJyZXYiKS5zcGxpdCgvXHMqLFxzKi8pKQ0KCQkJCX0NCgkJCQlpZiAoc2VsZWN0ZWR0YWJmcm9tdXJsPT1pIHx8IHRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHBhcnNlSW50KHBlcnNpc3RlZHRhYik9PWkgfHwgIXRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT09InNlbGVjdGVkIil7DQoJCQkJCXNlbGVjdGVkdGFiPWkgLy9TZWxlY3RlZCB0YWIgaW5kZXgsIGlmIGZvdW5kDQoJCQkJfQ0KCQkJfQ0KCQl9IC8vRU5EIGZvciBsb29wDQoJCWlmIChzZWxlY3RlZHRhYiE9LTEpIC8vaWYgYSB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIHRhYiBpbmRleCBpcyBmb3VuZA0KCQkJdGhpcy5leHBhbmR0YWIodGhpcy50YWJzW3NlbGVjdGVkdGFiXSkgLy9leHBhbmQgc2VsZWN0ZWQgdGFiIChlaXRoZXIgZnJvbSBVUkwgcGFyYW1ldGVyLCBwZXJzaXN0ZW50IGZlYXR1cmUsIG9yIGNsYXNzPSJzZWxlY3RlZCIgY2xhc3MpDQoJCWVsc2UgLy9pZiBubyB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIGluZGV4IGZvdW5kDQoJCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zWzBdXSkgLy9KdXN0IHNlbGVjdCBmaXJzdCB0YWIgdGhhdCBjb250YWlucyBhICJyZWwiIGF0dHINCgkJaWYgKHBhcnNlSW50KHRoaXMuYXV0b21vZGVwZXJpb2QpPjUwMCAmJiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoPjEpew0KCQkJdGhpcy5hdXRvcnVudGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXt0YWJpbnN0YW5jZS5hdXRvcnVuKCl9LCB0aGlzLmF1dG9tb2RlcGVyaW9kKQ0KCQl9DQoJfSAvL0VORCBpbnQoKSBmdW5jdGlvbg0KDQp9IC8vRU5EIFByb3RvdHlwZSBhc3NpZ25tZW50"
  }).appendChild(document.createTextNode(
    '/***********************************************\n' +
    '* Tab Content script v2.2- © Dynamic Drive DHTML code library (www.dynamicdrive.com)\n' +
    '* This notice MUST stay intact for legal use\n' +
    '* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code\n' +
    '***********************************************/\n'
  ));
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript'}).appendChild(document.createTextNode(
    'var tabs=new ddtabcontent("tabNav"); //enter ID of Tab Container\n' +
    'tabs.setpersist(true); //toogle persistence of the tabs\' state\n' +
    'tabs.setselectedClassTarget("linkparent"); //"link" or "linkparent"\n' +
    'tabs.init();'
  ));


  DEBUG('Menu created.');
}

// Create General Tab
function createGeneralTab() {
  var elt, title, id, label;
  var generalTab = makeElement('div', null, {'id':'generalTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', generalTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:125%;'});

  // Refresh option
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check this to refresh MWAP between the indicated time interval.';
  id = 'autoClick';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, id);
  makeElement('img', lhs, {'style':'padding-left: 5px; vertical-align: middle;','src':stripURI(energyIcon)});
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Refresh every:'));

  makeElement('input', rhs, {'type':'text','value':GM_getValue('r1', '30'), 'id':'r1', 'size':'1', 'style':'vertical-align: middle; text-align: center'});
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' to '));
  makeElement('input', rhs, {'type':'text','value':GM_getValue('r2', '110'), 'id':'r2', 'size':'1', 'style':'vertical-align: middle; text-align: center'});
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' seconds '));

  // Delay option
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Set the delay interval between actions.';
  label = makeElement('label', lhs, {'title':title});
  label.appendChild(document.createTextNode('Delay between actions:'));

  makeElement('input', rhs, {'type':'text', 'value':GM_getValue('d1', '3'), 'id':'d1', 'size':'1', 'style':'text-align: center'});
  rhs.appendChild(document.createTextNode(' to '));
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue('d2', '5'), 'id':'d2', 'size':'1', 'style':'text-align: center'});
  rhs.appendChild(document.createTextNode(' seconds'));

  // Auto-pause
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check this to enable auto-pause before or after level up.';
  id = 'autoPause';
  var autoPause = makeElement('input', lhs, {'type':'checkbox', 'style':'vertical-align: middle;', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(' Enable auto-pause:'));
  autoPause.addEventListener('click', clickAutoPause, false);

  id = 'autoPauseBefore';
  title = ' Before level up ';
  makeElement('input', rhs, {'type':'radio', 'style':'vertical-align: middle;', 'name':'r3', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(title));

  id = 'autoPauseAfter';
  title = ' After level up ';
  makeElement('input', rhs, {'type':'radio', 'style':'vertical-align: middle;', 'name':'r3', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(title));

  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoPauseExp';
  lhs.appendChild(document.createTextNode('Experience left to pause at:'));
  makeElement('input', rhs, {'style':'vertical-align: middle; text-align: right;','type':'text', 'value':GM_getValue(id, '50'), 'id':id, 'size':'2'});

  // Healing options
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Heal when health lands below indicated health.';
  id = 'autoHeal';
  makeElement('input', lhs, {'style':'vertical-align: middle;','type':'checkbox', 'id':id, 'value':'checked'}, id, 'checked');
  makeElement('img', lhs, {'style':'padding-left: 5px; vertical-align: middle;','src':stripURI(healthIcon)});
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Heal in:'));
  id = 'healLocation';
  var healLocation = makeElement('select', rhs, {'id':id});
  for (var i = 0, iLength=cities.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(cities[i][CITY_NAME]));
    healLocation.appendChild(choice);
  }
  var choice = document.createElement('option');
  choice.value = i;
  choice.appendChild(document.createTextNode('Active City'));
  healLocation.appendChild(choice);

  healLocation.selectedIndex = GM_getValue('healLocation', NY);
  makeElement('label', rhs, {'title':title}).appendChild(document.createTextNode(' when health falls below '));
  makeElement('input', rhs, {'style':'vertical-align: middle; text-align: center','type':'text', 'value':GM_getValue('healthLevel', '50'), 'id':'healthLevel', 'size':'1'});
  makeElement('label', rhs, {'title':title}).appendChild(document.createTextNode(' points'));

  // Hide in hospital
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Hide in hospital while health is below 20';
  id = 'hideInHospital';
  var hideInHosp = makeElement('input', rhs, {'style':'vertical-align: middle;', 'type':'checkbox', 'title':title, 'id':id, 'value':'checked'}, id);
  makeElement('img', rhs, {'style':'padding-left: 5px; vertical-align: middle;','src':stripURI(hideIcon)});
  title = hideInHosp.checked ? ' Hide in hospital but...' : ' Hide in hospital';
  makeElement('label', rhs, {'id':'hideLabel', 'for':id, 'title':title}).appendChild(document.createTextNode(title));

  elt = makeElement('div', rhs, {'style':'position: relative; line-height: 150%; left: 17px;','id':'hideOpts'});
  for (var i = 0, iLength=healOptions.length; i < iLength; i++) {
    id = healOptions[i][0];
    title = healOptions[i][1];
    var optElt = makeElement('div', elt);
    makeElement('input', optElt, {'style':'vertical-align: middle;', 'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
    label = makeElement('label', optElt, {'for':id, 'title':title});
    label.appendChild(document.createTextNode(' ' + title));
  }
  elt.style.display = hideInHosp.checked ? '' : 'none';

  var hideHandler = function() {
    var hideOpts = document.getElementById('hideOpts');
    var hideLabel = document.getElementById('hideLabel');
    if (!hideOpts) return false;
    if (this.checked) {
      hideOpts.style.display = '';
      hideLabel.firstChild.nodeValue = ' Hide in hospital but...';
    } else {
      hideOpts.style.display = 'none';
      hideLabel.firstChild.nodeValue = ' Hide in hospital';
    }
  }
  hideInHosp.addEventListener('click', hideHandler, false);

  // Idle-in location
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check to idle in preferred city';
  id = 'idleInCity';
  makeElement('input', lhs, {'style':'vertical-align: middle;','type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id,'title':title}).appendChild(document.createTextNode(' When idle, fly to:'));
  var idleLocation = makeElement('select', rhs, {'id':'idleLocation'});
  var choice;
  for (var i = 0, iLength=cities.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(cities[i][CITY_NAME]));
    idleLocation.appendChild(choice);
  }
  idleLocation.selectedIndex = GM_getValue('idleLocation', NY);

  // Auto-lotto
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoLottoOpt';
  title = ' Play the Daily Chance';
  lottoTitle = 'Play free auto-generated lottery ticket daily'
  makeElement('input', rhs, {'style':'vertical-align: middle;','type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':lottoTitle}).appendChild(document.createTextNode(title));

  // Lotto selector
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = ' Collect lotto bonus at: '
  id = 'autoLottoBonus';
  makeElement('input', lhs, {'style':'vertical-align: middle;','type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(title));

  id = 'autoLottoList';
  var lottoBonusSelect = makeElement('select', rhs, {'id':id});
  for (var i = 0, iLength = autoLottoBonusList.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(autoLottoBonusList[i]));
    lottoBonusSelect.appendChild(choice);
  }
  lottoBonusSelect.selectedIndex = GM_getValue('autoLottoBonusItem', 0);

  // Hourly-stat
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'hourlyStatsOpt';
  title = ' Enable hourly stats updates [Beta] ';
  makeElement('input', rhs, {'style':'vertical-align: middle;','type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(title));

  // Burn option
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check to prioritize burning of either energy or stamina';
  id = 'burnFirst';
  makeElement('input', lhs, {'style':'vertical-align: middle;','type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Spend all:'));
  var burnOpt = makeElement('select', rhs, {'id':'burnOption'});
  var choice;
  for (var i = 0, iLength=burnOptions.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(burnOptions[i]));
    burnOpt.appendChild(choice);
  }
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' first if both are not maxed'));
  burnOpt.selectedIndex = GM_getValue('burnOption', BURN_ENERGY);

  return generalTab;
}

// Create Display Tab
function createDisplayTab() {
  var elt, title, id, label;
  var displayTab = makeElement('div', null, {'id':'displayTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', displayTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:125%;'});

  // Logging option
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoLog';
  title = 'Check this to enable logging.';
  makeElement('input', lhs, {'style':'vertical-align: middle;','type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Enable logging:'));
  id = 'autoLogLength';
  makeElement('input', rhs, {'type':'text', 'id':id, 'value':GM_getValue(id, '300'), 'size':'2', 'style':'text-align: left'});
  rhs.appendChild(document.createTextNode(' max # of messages in log'));

  // Player updates
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'logPlayerUpdates';
  title = 'Send Player Updates to Mafia Log.';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Log Player Updates:'));
  id = 'logPlayerUpdatesMax';
  makeElement('input', rhs, {'type':'text', 'id':id, 'value':GM_getValue(id, '25'), 'size':'2', 'style':'text-align: left'});
  rhs.appendChild(document.createTextNode(' max # of updates'));

  // Log filtering
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check this to enable log-filtering';
  id = 'filterLog';
  makeElement('input', lhs, {'type':'checkbox', 'title':title, 'id':id, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id}).appendChild(document.createTextNode(' Enable log-filtering:'));

  id = 'filterOpt';
  var filterOpt = makeElement('select', rhs, {'id':id});
  var filterOptions = ['Accept patterns','Reject patterns'];
  var choice;
  for (var i = 0, iLength=filterOptions.length; i < iLength; ++i) {
    choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(filterOptions[i]));
    filterOpt.appendChild(choice);
  }
  filterOpt.selectedIndex = GM_getValue(id, 0);

  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'filterPatterns';
  var filterText = makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 8em;', 'id':id, 'title':'Enter each pattern on a separate line.'});
  filterText.appendChild(document.createTextNode(''));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));

  // Handle filterMode changes
  var filterHandler = function() {
    var defaultFilter = filterOpt.selectedIndex == 0 ? defaultPassPatterns.join('\n') : defaultFailPatterns.join('\n');
    var fitlerId = filterOpt.selectedIndex == 0 ? 'filterPass' : 'filterFail';
    filterText.firstChild.nodeValue = GM_getValue(fitlerId, defaultFilter);
  }
  filterHandler();
  filterOpt.addEventListener('change', filterHandler, false);

  // Ads
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'hideAds';
  title = 'Hide advertisements';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Hide ads'));

  // Safe house gifts
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'hideGifts';
  title = 'Hide Safe House Gifts';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id, 'checked');
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Hide safe house gift links'));

  // Email bar
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'moveEmailBar';
  title = 'Move email options to the bottom';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Move email options to the bottom'));

  // Alignment
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'leftAlign';
  title = 'Align game to the left';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Align game to the left'));

  // Summarize Attacks
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'hideAttacks';
  title = 'Only Show Summary of Attacks';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Summarize attacks from Player Updates'));

  // Set Facebook account to window title
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'fbwindowtitle';
  title = 'Set window title to name on Facebook account';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id,'title':title}).appendChild(document.createTextNode(' Set window title to name on Facebook account'));

  return displayTab;
}

// Create Social Tab
function createSocialTab() {
  var elt, title, id, label;
  var socialTab = makeElement('div', null, {'id':'socialTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', socialTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:125%;'});

  // Auto-ask for job help
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check if you want to ask for help automatically with jobs.';
  id = 'autoAskJobHelp';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, id);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Ask for job help at:'));
  title = 'Enter the minimum experience to ask for job help, or 0 for no minimum.';
  id = 'autoAskJobHelpMinExp';
  makeElement('input', rhs, {'type':'text', 'value':GM_getValue(id, '0'), 'title':title, 'id':id, 'size':'2'});
  rhs.appendChild(document.createTextNode(' minimum experience'));

  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Enter a message to publish to your wall when asking for help with a job. If you don\'t want to publish to your wall, leave this blank.';
  id = 'autoAskJobHelpMessage';
  lhs.appendChild(document.createTextNode('Message to publish:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 6em;', 'id':id, 'title':title}).appendChild(document.createTextNode(GM_getValue(id, 'Help!')));;;

  // Auto-accept mafia invitations
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Automatically accept mafia invitations.';
  id = 'acceptMafiaInvitations';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Accept mafia invitations'));

  // Auto-help on jobs/wars
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  label = makeElement('label', lhs);
  label.appendChild(document.createTextNode(' Automatically help: '));
  title = 'Automatically help on jobs.';
  id = 'autoHelp';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' On Jobs '));
  title = 'Automatically help on wars.';
  id = 'autoWarHelp';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' On Wars '));


  // Betray friends in wars
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Betray a random friend?';
  id = 'autoWarBetray';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Betray friends in wars'));

  // Skip gift wall posts
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'autoGiftSkipOpt';
  title = 'Check this to skip publishing of wall posts.';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'style':'vertical-align: middle', 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id}).appendChild(document.createTextNode(' Skip gift wall posts'));

  // Option for clicking the gift waiting
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  title = 'Click the gift waiting option';
  id = 'autoGiftWaiting';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, id);
  makeElement('label', rhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Automatically click the gift waiting option'));

  // Undo notifications
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  notificationStopTitle = 'Handles undoing notification pop-ups alerting other users.';
  notificationID = 'notificationHandle';
  var notificationLabel = makeElement('label', lhs);
  notificationLabel.appendChild(document.createTextNode('Undo which notifications:'));
  var notificationHandle = makeElement('select', rhs, {'id':notificationID, 'title':notificationStopTitle}, 'notificationLabel');
  var choice = document.createElement('option');
  choice.value = 0;
  choice.appendChild(document.createTextNode('None'));
  notificationHandle.appendChild(choice);
  choice = document.createElement('option');
  choice.value = 1;
  choice.appendChild(document.createTextNode('Fight'));
  notificationHandle.appendChild(choice);
  choice = document.createElement('option');
  choice.value = 2;
  choice.appendChild(document.createTextNode('All'));
  notificationHandle.appendChild(choice);
  if (GM_getValue('notificationHandle', 'unk') == 'unk') {
    GM_setValue('notificationHandle', 1);
  }
  notificationHandle.selectedIndex = GM_getValue('notificationHandle', 1);

  // War - Automatically declare a war
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Declare war against this opponent';
  id = 'autoWar';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Automatically declare war: '));

  // Publish war declaration
  title = 'Automatically publish this war to your mafia so they can help';
  id = 'autoWarPublish';
  makeElement('br', lhs, {'class':'hide'});
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish war declaration '));

  // Publish call for back up
  title = 'Automatically publish the call for help to your mafia';
  id = 'autoWarResponsePublish';
  makeElement('br', lhs, {'class':'hide'});
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish call for help'));

  // Publish reward
  title = 'Automatically publish that you rewarded your mafia for helping';
  id = 'autoWarRewardPublish';
  makeElement('br', lhs, {'class':'hide'});
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', lhs, {'for':id, 'title':title}).appendChild(document.createTextNode(' Publish reward'));

  // War mode
  id = 'warMode';
  var warModes = makeElement('select', rhs, {'id':id});
  for (var i = 0, iLength=warModeChoices.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(warModeChoices[i]));
    warModes.appendChild(choice);
  }
  warModes.selectedIndex = GM_getValue('warMode', 0);
  makeElement('div', rhs, {'class':'hide', 'style':'height: 5px;'});

  // War - autowar targets
  title = 'Enter opponents facebook ID';
  id = 'autoWarTargetList';
  var warList = makeElement('textarea', rhs, {'style':'width: 12em; height: 6em;', 'id':id, 'title':'Enter each Facebook ID on a separate line.'});
  warList.appendChild(document.createTextNode(GM_getValue('autoWarTargetList', '')));
  makeElement('br', rhs, {'class':'hide'});
  var warListLabel = makeElement('font', rhs, {'style':'font-size: 10px;'});
  warListLabel.appendChild(document.createTextNode('Enter each target on a separate line.'));

  // Hide list if war mode is random
  var warModeHandler = function () {
    warList.style.display = warModes.selectedIndex == 0 ? 'none' : '';
    warListLabel.style.display = warList.style.display;
  }
  warModeHandler();
  warModes.addEventListener('change', warModeHandler, false);

  return socialTab;
}

// Create Autostat Tab
function createAutostatTab() {
  var elt, title, id, label;
  var autostatTab = makeElement('div', null, {'id':'autostatTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  var statDiv = makeElement('div', autostatTab, {'style':'position: absolute; width: 100%; left: 10px; top: 10px;'});

  id = 'autoStat';;
  var autoStats = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; left: 20px;'});
  makeElement('input', autoStats, {'type':'checkbox','style':'vertical-align: middle', 'id':id, 'value':'checked'}, id);
  makeElement('img', autoStats, {'style':'vertical-align: middle;','src':stripURI(plussignIcon)});
  makeElement('label', autoStats, {'for':id, 'title':title, 'style':'vertical-align: middle;'}).appendChild(document.createTextNode(' Enable auto-stat'));

  title = ' Disable AutoStat when status goals are reached';
  id = 'autoStatDisable';
  var divStatDisable = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; left: 200px; '});
  makeElement('input', divStatDisable, {'type':'checkbox', 'style':'vertical-align: middle;', 'id':id, 'title':title, 'value':'checked'}, id);
  makeElement('label', divStatDisable, {'for':id, 'title':title}).appendChild(document.createTextNode(title));


  // Display Adjustments
  var xTop = 30;
  var yLeft = 10;

  var yLeftCur = yLeft + 10;
  var xTopCur = xTop;

  // Status Labels
  var yLeftCur = yLeft + 10;
  var xTopCur = xTop + 2;

  // Stat labels
  for (var i = 0, iLength=autoStatRatios.length; i < iLength; ++i ) {
    var div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;'});
    div.appendChild(document.createTextNode(autoStatDescrips[i + 1]));

    xTopCur += 25;
  }

  // Status ratio
  var yLeftCur = yLeft + 75;
  var xTopCur = xTop;

  for (var i = 0, iLength=autoStatRatios.length; i < iLength; ++i ) {
    var title = 'Please set ratio of' + autoStatDescrips[i + 1] + ' stat';
    var id = autoStatRatios[i];
    var div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;'});
    div.appendChild(document.createTextNode(' = '));
    makeElement('input', div, {'type':'text', 'style':'width: 40px;', 'value':GM_getValue(id, 0), 'id':id, 'size':'1'});
    div.appendChild(document.createTextNode(' x '));

    xTopCur += 25;
  }

  // Status Allocation Mode Settings
  var yLeftCur = yLeft + 150;
  var xTopCur = xTop;

  for (var i = 0, iLength=autoStatModes.length; i < iLength; ++i ) {
    var title = 'Please select where to base ' + autoStatDescrips[i + 1] + ' stat';
    var id = autoStatModes[i];
    var sel = makeElement('select', statDiv, {'id':id, 'title':title, 'style':'position: absolute; width:60px; top: ' + xTopCur + 'px; left: ' + yLeftCur + 'px;'});
    xTopCur += 25;
    for (var j = 0, jLength=autoStatDescrips.length; j < jLength; ++j) {
      var choice = document.createElement('option');
      choice.value = j;
      choice.appendChild(document.createTextNode(autoStatDescrips[j]));
      sel.appendChild(choice);
    }
    sel.selectedIndex = GM_getValue(autoStatModes[i], 0);
  }

  // Status base
  var yLeftCur = yLeft + 215;
  var xTopCur = xTop;

  for (var i = 0, iLength=autoStatBases.length; i < iLength; ++i ) {
    var id = autoStatBases[i];
    var div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;'});
    div.appendChild(document.createTextNode(' + '));
    makeElement('input', div, {'type':'text', 'style':'width: 40px;', 'value':GM_getValue(id, 0), 'id':id, 'size':'1'});
    xTopCur += 25;
  }

  // Left-over points
  var yLeftCur = yLeft + 280;
  var xTopCur = xTop;

  for (var i = 0, iLength=autoStatFallbacks.length; i < iLength; ++i ) {
    var title = 'Check this to distribute points to ' + autoStatDescrips[i + 1] + ' when goals are reached';
    var id = autoStatFallbacks[i];
    var div = makeElement('div', statDiv, {'style':'position: absolute; top: ' + xTopCur + 'px; left:' + yLeftCur + 'px; '});
    makeElement('input', div, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, autoStatFallbacks[i]);
    var label = makeElement('label', div, {'for':id, 'title':title});
    label.appendChild(document.createTextNode(' ' + autoStatDescrips[i+1] + ' as fallback'));
    xTopCur += 25;
  }

  // Priority Settings
  title = 'Please select priority level for stat distribution';
  var yLeftCur = yLeft + 460;
  var xTopCur = xTop;

  for (var i = 0, iLength=autoStatPrios.length; i < iLength; ++i ) {
    var id = autoStatPrios[i];
    var sel = makeElement('select', statDiv, {'id':id, 'title':title,'style':'position: absolute; top: ' + xTopCur + 'px; left: ' + yLeftCur + 'px;'});
    xTopCur += 25;
    for (var j = 0, jLength=autoStatRatios.length; j < jLength; ++j) {
      var choice = document.createElement('option');
      choice.value = j;
      choice.appendChild(document.createTextNode('Priority ' + (j + 1)));
      sel.appendChild(choice);
    }
    sel.selectedIndex = GM_getValue(autoStatPrios[i], 0);
  }

  return autostatTab;
}

// Create Energy Tab
function createEnergyTab() {
  var elt, title, id, label;
  var energyTab = makeElement('div', null, {'id':'energyTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', energyTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:125%;'});

  // How to spend energy
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Spend energy automatically.';
  id = 'autoMission';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, 'autoMission');
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend energy to:'));
  title = ' Master jobs one at a time';
  id = 'masterAllJobs';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  var masterAllJobs = makeElement('input', label, {'type':'radio', 'name':'r5', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'});
  masterAllJobs.defaultChecked = true;
  label.appendChild(document.createTextNode(title));
  makeElement('br', rhs);
  title = ' Perform any combination of jobs';
  id = 'multipleJobs';
  label = makeElement('label', rhs, {'for':id, 'title':title});
  var multipleJobs = makeElement('input', label, {'type':'radio', 'name':'r5', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, id);
  label.appendChild(document.createTextNode(title + ' '));
  var unChkAll = makeElement('input', label, {'id':'unCheckAll','style':'font-size: 9px; display : ' + ((GM_getValue('multipleJobs') == 'checked') ? '':'none'),'type':'button', 'value':'Uncheck All'});

  //
  // Job selector.
  //
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = '...set by handler...';
  id = 'selectMission';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('...set by handler...'));

  var selectMissionM = makeElement('div', rhs, {'id':id + 'M', 'title':title, 'style':'overflow: auto; width: 300px; height: 150px; border:1px solid #999999; padding: 2px 2px 2px 2px'});
  var selectMissionS = makeElement('select', rhs, {'id':id + 'S', 'title':title});
  var selectMissionLabel = label;

  // Optimize at end level option
  var jobOptions = makeElement('div', lhs, {'id':'jobOptions'});
  id = 'endLevelOptimize';
  title = 'Optimize at end level' ;
  makeElement('br', jobOptions);
  makeElement('input', jobOptions, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, id);
  label = makeElement('label', jobOptions, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' ' + title));

  // Master tier selection pull down.
  var selectTierDiv = makeElement('div', list);
  var lhs = makeElement('div', selectTierDiv, {'class':'lhs'});
  var rhs = makeElement('div', selectTierDiv, {'class':'rhs'});
  makeElement('br', selectTierDiv, {'class':'hide'});
  title = 'Master Tier';
  id = 'selectTier';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Master tier:'));
  var selectTier = makeElement('select', rhs, {'id':id, 'title':title});
  choiceTier = document.createElement('option');
  choiceTier.text = 'Do not master anything';
  choiceTier.value = '0.0';
  selectTier.appendChild(choiceTier);

  // Create the rows of the list.
  var cityno = -1;
  var tabno = -1;
  var divChoice;
  var chkImg;
  var choiceM;
  var choiceS;
  var label;
  //var energyBonus = 1 - (GM_getValue('selectEnergyBonus', 0) / 100);
  //var expBonusMultiplier = 1 + (GM_getValue('selectExpBonus', 0) / 100);

  var chkHandler = function () {
    var eltId = this.getAttribute('chkId');
    var chkElt = document.getElementById(eltId);
    var chkImgElt = document.getElementById('img' + eltId);

    if (chkElt) {
      if(chkElt.checked) {
        chkElt.checked = '';
        chkImgElt.src=stripURI(unCheckedIcon);
      } else {
        chkElt.checked = 'checked';
        chkImgElt.src=stripURI(checkedIcon);
      }
    }
  }

  var tmpListArray = getSavedList('selectMissionMultiple');

  if (!didJobCalculations) calcJobinfo();
  for (var i = 0, iLength=missions.length; i < iLength; ++i) {
    var mission = missions[i];
    if (mission[4] != cityno) {
      // Add a row for the city.
      cityno = mission[4];
      choiceM = makeElement('div');
      choiceM.innerHTML = '=== ' + cities[cityno][CITY_NAME].toUpperCase() + ' MISSIONS ===';
      choiceM.className = 'ap_optgroup1';
      selectMissionM.appendChild(choiceM);

      choiceS = document.createElement('optgroup');
      choiceS.label = '=== ' + cities[cityno][CITY_NAME].toUpperCase() + ' MISSIONS ===';
      choiceS.className = 'ap_optgroup1';
      selectMissionS.appendChild(choiceS);

      choiceTier = document.createElement('optgroup');
      choiceTier.label = cities[cityno][CITY_NAME].toUpperCase();
      choiceTier.className = 'ap_optgroup1';
      selectTier.appendChild(choiceTier);
    }
    if (mission[3] != tabno) {
      // Add a row for the tab.
      tabno = mission[3];
      choiceM = makeElement('div');
      choiceM.innerHTML = missionTabs[cityno][tabno - 1];
      choiceM.className = 'ap_optgroup2';
      selectMissionM.appendChild(choiceM);

      choiceS = document.createElement('optgroup');
      choiceS.label = missionTabs[cityno][tabno - 1];
      choiceS.className = 'ap_optgroup2';
      selectMissionS.appendChild(choiceS);

      choiceTier = document.createElement('option');
      choiceTier.text = missionTabs[cityno][tabno - 1];
      choiceTier.value = cityno + '.' + tabno;
      selectTier.appendChild(choiceTier);
      if (GM_getValue('selectTier') == choiceTier.value) {
        choiceTier.selected = true;
      }
    }

    // Determine the job's experience-to-energy ratio.
    var ratio = calcJobratio(i);

    // Add a row for the job.
    id = missions[i][0];
    title = mission[0] + ' (' + parseFloat(ratio) + ')';

    // Get the check state of the box
    var checkState = false;
    if (tmpListArray.indexOf(String(i)) != -1) {
      checkState = true;
    }

    // Multiple job choices
    divChoice = makeElement('div', null, {'class':'ap_option', 'chkid':id});
    divChoice.addEventListener('click', chkHandler, false);
    makeElement('img', divChoice, {'style':'width: 15px; height: 15px;', 'id':'img' + id, 'src': checkState ? stripURI(checkedIcon) : stripURI(unCheckedIcon)});
    choiceM = makeElement('input', divChoice, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; display: none', 'value':'checked'});
    choiceM.checked = checkState;
    divChoice.appendChild(document.createTextNode(' ' + title));
    selectMissionM.appendChild(divChoice);

    // Single job choices
    var choiceS = document.createElement('option');
    choiceS.text = mission[0] + ' (' + parseFloat(ratio) + ')';
    choiceS.className = 'ap_option';
    selectMissionS.appendChild(choiceS);
  }
  selectMissionS.selectedIndex = GM_getValue('selectMission', 1);

  // Uncheck ALL handler
  var unChkHandler = function () {
    var eltChoice;
    var eltChoiceImg;
    var eltId;
    for (var i = 0, iLength=missions.length; i < iLength; ++i) {
      eltId = missions[i][0];
      eltChoice = document.getElementById(eltId);
      eltChoiceImg = document.getElementById('img' + eltId);
      if (eltChoiceImg && eltChoice.checked) eltChoiceImg.src = stripURI(unCheckedIcon);
      if (eltChoice && eltChoice.checked) eltChoice.checked = false;
    }
  }
  unChkAll.addEventListener('click', unChkHandler, false);

  // Handler to change selection style (multiple vs. single)
  var handler = function() {
    if (multipleJobs.checked) {
      var labelText = 'Job selection:';
      var title = 'Select one or more jobs to perform. Jobs will be performed in an automatically optimized order.';
      selectMissionLabel.firstChild.nodeValue = labelText;
      selectMissionLabel.title = title;
      selectMissionM.title = title;
      selectMissionM.style.display = '';
      selectMissionS.style.display = 'none';
      jobOptions.style.display = '';
      selectTierDiv.style.display = '';
    } else {
      var labelText = 'Next job to master:';
      var title = 'Select the next job to master. Once mastered, another job will be picked automatically.';
      selectMissionLabel.firstChild.nodeValue = labelText;
      selectMissionLabel.title = title;
      selectMissionS.title = title;
      selectMissionM.style.display = 'none';
      selectMissionS.style.display = '';
      jobOptions.style.display = 'none';
      selectTierDiv.style.display = 'none';
    }

    var unChkElt = document.getElementById('unCheckAll');
    if (unChkElt) unChkAll.style.display = multipleJobs.checked ? '' : 'none';
  }
  handler();

  masterAllJobs.addEventListener('change', handler, false);
  multipleJobs.addEventListener('change', handler, false);

  // Spend energy packs?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Spend energy packs if it will not waste any energy, as determined by the estimated job ratio setting and your stamina statistics.';
  id = 'autoEnergyPack';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'autoEnergyPack');
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend energy packs:'));

  // Estimated xp-to-energy ratio for jobs.
  title = 'Estimate the average experience-to-energy ratio of the jobs you will be performing. For example, a job that paid 10 experience points and required 5 energy would have a ratio of 2. Enter 0 if you prefer to have energy packs fire regardless of waste.';
  id = 'estimateJobRatio';
  label = makeElement('label', rhs, {'for':id, 'title':title, 'style':'vertical-align:middle'});
  label.appendChild(document.createTextNode('Estimated job ratio '));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':4, 'style':'vertical-align:middle; width: 30px; border: 1px solid #781351', 'value':GM_getValue('estimateJobRatio', '1'), 'size':'1'});

  // Periodically send energy packs?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Periodically send energy packs to your fellow mafia members.';
  id = 'sendEnergyPack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, 'sendEnergyPack');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Send energy packs to my mafia'));

  // Horizontal line
  //var item = makeElement('div', list);
  //makeElement('hr', item, {'style':'width: 100%'});

  // Maniac character type?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check this box if your character type is Maniac (as opposed to Fearless or Mogul).';
  id = 'isManiac';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'isManiac', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Character type is Maniac'));

  // Mastery items owned.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Check the mastery items you already own.',
  label = makeElement('label', lhs, {'title':title});
  label.appendChild(document.createTextNode('Job mastery items owned:'));
  title = 'Check this if you were awarded the Helicopter for mastering all Consigliere jobs.';
  id = 'hasHelicopter';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'hasHelicopter');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Helicopter  '));
  title = 'Check this if you were awarded the Private Island for mastering all Underboss jobs.';
  id = 'hasPrivateIsland';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'hasPrivateIsland');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Private Island  '));
  title = 'Check this if you were awarded the Golden Throne for mastering all Boss jobs.';
  id = 'hasGoldenThrone';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'hasGoldenThrone');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Golden Throne'));

  // Spend energy option
  var item = makeElement('div', list, {'class':'single'});
  title = 'Start spending energy when energy level is reached';
  id = 'selectEnergyUse';
  item.appendChild(document.createTextNode('Start spending energy when '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectEnergyUseMode';
  item.appendChild(document.createTextNode(' '));
  var elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' of energy has accumulated.'));

  // Stamina to reserve for manual play
  var item = makeElement('div', list, {'class':'single'});
  title = 'Suspend automatic play below this level of energy.';
  id = 'selectEnergyKeep';
  item.appendChild(document.createTextNode('Reserve '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectEnergyKeepMode';
  item.appendChild(document.createTextNode(' '));
  var elt = makeElement('select', item, {'id':id, 'title':title});
    for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' of energy for manual play.'));

  // Level up
  var item = makeElement('div', list, {'class':'single'});
  title = 'Ignore minimum energy settings if a level up is within reach.';
  id = 'allowEnergyToLevelUp';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, id);
  label = makeElement('label', item, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Don\'t reserve energy if within reach of the next level.'));

  return energyTab;
}

// Create Stamina Tab
function createStaminaTab() {
  var elt, title, id, label;
  var staminaTab = makeElement('div', null, {'id':'staminaTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  // Container for a list of settings.
  var list = makeElement('div', staminaTab, {'style':'position: relative; top: 10px; margin-left: auto; margin-right: auto; width: 95%; line-height:125%;'});

  //
  // How to spend stamina (fight/hitlist).
  //
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});

  title = 'Spend stamina automatically.';
  id = 'staminaSpend';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, 'staminaSpend');
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Spend stamina to:'));

  id = 'staminaSpendHow';
  var staminaSpendHow = makeElement('select', rhs, {'id':id});
  for (var i = 0, iLength=staminaSpendChoices.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(staminaSpendChoices[i]));
    staminaSpendHow.appendChild(choice);
  }

  // Bordered container for varying settings content.
  var staminaTabSub = makeElement('div', list, {'id':'staminaTabSub', 'style':'position: static; border: 1px inset #FFD927; margin-left: auto; margin-right: auto; margin-top: 5px; margin-bottom: 5px;'});

  // Spend stamina option
  var item = makeElement('div', list, {'class':'single'});
  title = 'Start spending stamina when stamina level is reached';
  id = 'selectStaminaUse';
  item.appendChild(document.createTextNode('Start spending stamina when '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectStaminaUseMode';
  item.appendChild(document.createTextNode(' '));
  var elt = makeElement('select', item, {'id':id, 'title':title});
  for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' of stamina has accumulated.'));

  // Stamina to reserve for manual play
  var item = makeElement('div', list, {'class':'single'});
  title = 'Suspend automatic play below this level of stamina.';
  id = 'selectStaminaKeep';
  item.appendChild(document.createTextNode('Reserve '));
  makeElement('input', item, {'type':'text', 'id':id, 'title':title, 'style':'width: 2em; ', 'value':GM_getValue(id, '0')});
  id = 'selectStaminaKeepMode';
  item.appendChild(document.createTextNode(' '));
  var elt = makeElement('select', item, {'id':id, 'title':title});
    for (i = 0, iLength = numberSchemes.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(numberSchemes[i]));
    elt.appendChild(choice);
  }
  elt.selectedIndex = GM_getValue(id, 0);
  item.appendChild(document.createTextNode(' of stamina for manual play.'));

  // Level up
  var item = makeElement('div', list, {'class':'single'});
  title = 'Ignore minimum stamina settings if a level up is within reach.';
  id = 'allowStaminaToLevelUp';
  makeElement('input', item, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle', 'value':'checked'}, 'allowStaminaToLevelUp');
  label = makeElement('label', item, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Don\'t reserve stamina if within reach of the next level.'));

  //
  // Settings for random fighting
  //

  // Container for a list of settings.
  var list = makeElement('div', staminaTabSub, {'id':'fightRandomSub', 'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; line-height:125%; display: none;'});

  // Location setting
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Fight in:'));
  id = 'fightRandomLoc';
  var fightRandomLoc = makeElement('select', rhs, {'id':id});
  for (var i = 0, iLength=cities.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(cities[i][CITY_NAME]));
    fightRandomLoc.appendChild(choice);
  }
  fightRandomLoc.selectedIndex = GM_getValue('fightLocation', NY);

  //rehit on money gain
  title = 'Reattack until iced if money gained';
  id = 'staminaReattack';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle;margin-left: 0.5em;', 'value':'checked'}, id);
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'vertical-align: middle;margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('While gaining '));
  title = 'Reattack if this amount is gained';
  id = 'reattackThreshold';
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':6, 'style':'width: 45px; border: 1px solid #781351', 'value':GM_getValue(id, '65000'), 'size':'1'});
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'vertical-align: middle;margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('bucks'));

  // Maximum level.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Avoid opponents higher than this level.';
  id = 'fightLevelMax';
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Maximum level:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':5, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('fightLevelMax', '100'), 'size':'1'});

  // Maximum level relative?
  title = 'Make the maximum level be relative to your own. For example, if your level is 10, and maximum level is set to 5, opponents higher than level 15 will be avoided.';
  id = 'fightLevelMaxRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'fightLevelMaxRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Add my level'));

  // Maximum mafia size.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'fightMafiaMax';
  title = 'Avoid opponents with mafia sizes larger than this.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Maximum mafia:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('fightMafiaMax', '501'), 'size':'1'});

  // Maximum mafia relative?
  title = 'Make the maximum mafia size be relative to your own. For example, if you have 300 mafia members, and maximum mafia is set to 50, opponents with more than 350 mafia members will be avoided.';
  id = 'fightMafiaMaxRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'fightMafiaMaxRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Add my mafia size'));

  // Minimum mafia size.
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'fightMafiaMin';
  title = 'Avoid opponents with mafia sizes smaller than this.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Minimum mafia:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 30px; border: 1px solid #781351', 'value':GM_getValue('fightMafiaMin', '1'), 'size':'1'});

  // Maximum mafia relative?
  title = 'Make the minimum mafia size be relative to your own. For example, if you have 300 mafia members, and minimum mafia is set to 50, opponents with less than 250 mafia members will be avoided.';
  id = 'fightMafiaMinRelative';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle; margin-left: 0.5em;', 'value':'checked'}, 'fightMafiaMinRelative');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Subtract from my mafia size'));

  // Use stealth fighting?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Prefer opponents who won\'t be notified of your attacks.';
  id = 'fightStealth';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightStealth', 'checked');
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Use fight stealth'));

  // Avoid Top Mafia bodyguards?
  title = 'Avoid opponents known to be Top Mafia bodyguards. This may ' +
          'decrease the frequency of losses due to critical hits.';
  id = 'fightAvoidBodyguards';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightAvoidBodyguards', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Avoid Top Mafia bodyguards'));

  // Family names
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Avoid random opponents whose names contain specific patterns.';
  id = 'fightAvoidNames';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightAvoidNames', 0);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Avoid mafia families:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 8em;', 'id':'fightClanName', 'title':'Enter each pattern (such as a clan name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('clanName', defaultClans.join('\n'))));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));
  // End of options specific to random fighting


  //
  // Settings for list fighting
  //

  // Container for a list of settings.
  var list = makeElement('div', staminaTabSub, {'id':'fightListSub', 'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; line-height:125%; display: none'});

  // Location setting
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Fight in:'));
  id = 'fightListLoc';
  var fightListLoc = makeElement('select', rhs, {'id':id});
  for (var i = 0, iLength=cities.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(cities[i][CITY_NAME]));
    fightListLoc.appendChild(choice);
  }
  fightListLoc.selectedIndex = GM_getValue('fightLocation', NY);

   //rehit on money gain
  title = 'Reattack until iced if money gained';
  id = 'staminaReattackList';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align: middle;margin-left: 0.5em;', 'value':'checked'}, 'staminaReattack');
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'vertical-align: middle;margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('While gaining '));
  title = 'Reattack if this amount is gained';
  id = 'reattackThresholdList';
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'maxlength':6, 'style':'width: 45px; border: 1px solid #781351', 'value':GM_getValue('reattackThreshold', '65000'), 'size':'1'});
  label = makeElement('label', rhs, {'for':id, 'title':title,'style':'vertical-align: middle;margin-left: 0.5em;'});
  label.appendChild(document.createTextNode('bucks'));

  // Opponent list
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Fight these opponents:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 180px; height: 105px;', 'id':'fightList', 'title':'Enter each opponent\'s ID (not their name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('fightList', '')));
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each Facebook ID on a separate line.'));

  // Remove stronger opponents?
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Remove stronger opponents from the list automatically.';
  id = 'fightRemoveStronger';
  makeElement('input', rhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'fightRemoveStronger', 'checked');
  label = makeElement('label', rhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Remove stronger opponents'));

  // End of options specific to list fighting

  //
  // Settings for hitman
  //

  // Container for a list of settings.
  var list = makeElement('div', staminaTabSub, {'id':'hitmanSub', 'style':'position: static; margin-left: auto; margin-right: auto; width: 100%; line-height:125%; display: none'});

  // Location setting
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Collect bounties in:'));
  id = 'hitmanLoc';
  var hitmanLoc = makeElement('select', rhs, {'id':id});
  for (var i = 0, iLength=cities.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(cities[i][CITY_NAME]));
    hitmanLoc.appendChild(choice);
  }
  hitmanLoc.selectedIndex = GM_getValue('hitmanLocation', NY);

  // Minimum bounty
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  id = 'hitmanBountyMin';
  title = 'Ignore targets with bounties below this measly amount.',
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode('Minimum bounty:'));
  makeElement('input', rhs, {'type':'text', 'id':id, 'title':title, 'style':'width: 7em; border: 1px solid #781351', 'value':GM_getValue('hitmanBountyMin', '0')});

  // Bounty selection
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  lhs.appendChild(document.createTextNode('Prefer targets with:'));
  id = 'bountySelection';
  var bountySelection = makeElement('select', rhs, {'id':id});
  for (var i = 0, iLength=bountySelectionChoices.length; i < iLength; ++i) {
    var choice = document.createElement('option');
    choice.value = i;
    choice.appendChild(document.createTextNode(bountySelectionChoices[i]));
    bountySelection.appendChild(choice);
  }
  bountySelection.selectedIndex = GM_getValue('bountySelection', BOUNTY_HIGHEST_BOUNTY);

  // Family names
  var item = makeElement('div', list);
  var lhs = makeElement('div', item, {'class':'lhs'});
  var rhs = makeElement('div', item, {'class':'rhs'});
  makeElement('br', item, {'class':'hide'});
  title = 'Avoid random opponents whose names contain specific patterns.';
  id = 'hitmanAvoidNames';
  makeElement('input', lhs, {'type':'checkbox', 'id':id, 'title':title, 'style':'vertical-align:middle', 'value':'checked'}, 'hitmanAvoidNames', 0);
  label = makeElement('label', lhs, {'for':id, 'title':title});
  label.appendChild(document.createTextNode(' Avoid mafia families:'));
  makeElement('textarea', rhs, {'style':'position: static; width: 15em; height: 8em;', 'id':'hitmanClanName', 'title':'Enter each pattern (such as a clan name) on a separate line.'}).appendChild(document.createTextNode(GM_getValue('clanName', defaultClans.join('\n'))));;
  makeElement('br', rhs);
  makeElement('font', rhs, {'style':'font-size: 10px;'}).appendChild(document.createTextNode('Enter each name pattern on a separate line.'));
  // End of options specific to hitman


  // Handler for switching sub-areas.
  var handleSpendChanged = function() {
    // Hide all but the selected sub-area.
    for (var i = 0, iLength=staminaSpendHow.length - 1; i < iLength; ++i) {
      if (i != staminaSpendHow.selectedIndex) {
        staminaTabSub.childNodes[i].style.display = 'none';
      }
    }

    if (staminaSpendHow.selectedIndex < staminaSpendHow.length - 1)
      staminaTabSub.childNodes[staminaSpendHow.selectedIndex].style.display = 'block';
  }
  staminaSpendHow.selectedIndex = GM_getValue('staminaSpendHow', 0);
  handleSpendChanged();
  staminaSpendHow.addEventListener('change', handleSpendChanged, false);

  return staminaTab;
}

// Create Money tab
function createMoneyTab () {
  var elt, title, id, label;
  var moneyTab = makeElement('div', null, {'id':'moneyTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  var autoBuy = makeElement('div', moneyTab, {'style':'top: 25px;'});
  makeElement('input', autoBuy, {'type':'checkbox', 'id':'autoBuy', 'value':'checked'}, 'autoBuy');
  autoBuy.appendChild(document.createTextNode('Enable Auto-buy'));

  var selectProperties = makeElement('div', moneyTab, {'style':'top: 50px;'});
  selectPropertiesTitle = makeElement('span', selectProperties, {'style':'margin-left:6px;'});
  selectPropertiesTitle.appendChild(document.createTextNode('Select the properties you want to buy:'));
  makeElement('br', selectProperties);

  var propItems = new Array(
    ['abandoned', 'Abandoned Lot *'],
    ['commercial', 'Commercial Block *'],
    ['downtown','Prime Downtown Lot *'],
    ['beachfront','Beachfront Property *'],
    ['mike','Mafia Mike\'s *'],
    ['rent','Rent House *'],
    ['restaurant','Italian Restaurant'],
    ['apartment','Apartment Complex'],
    ['valu','Valu-Mart'],
    ['tourist','Marina Tourist Shops'],
    ['office','Office Building'],
    ['hotel','5-Star Hotel'],
    ['casino','Mega Casino']
  );

  propItems.forEach(function(propItem) {
    makeElement('br', selectProperties);
    makeElement('input', selectProperties, {'type':'checkbox', 'id':propItem[0], 'value':'checked'}, propItem[0], 'checked');
    selectProperties.appendChild(document.createTextNode(propItem[1]));
  });

  makeElement('br', selectProperties);
  makeElement('br', selectProperties);
  selectPropertiesNote = makeElement('span', selectProperties, {'style':'margin-left:21px'});
  selectPropertiesNote.appendChild(document.createTextNode('* Properties that cannot be robbed'));

  title = 'Never spend below this amount of cash';
  var buyMinAmount = makeElement('div', moneyTab, {'style':'top: 50px; right: 10px;'});
  buyMinAmount.appendChild(document.createTextNode('Minimum cash: '));
  makeElement('input', buyMinAmount, {'type':'text', 'style':'width: 80px;', 'title':title, 'value':GM_getValue('buyMinAmount', '0'), 'id':'buyMinAmount', 'size':'5'});

  var autoSellCrates = makeElement('div', moneyTab, {'style':'top: 150px; right: 10px;'});
  autoSellCrates.appendChild(document.createTextNode('Sell Cuban business output'));
  makeElement('input', autoSellCrates, {'type':'checkbox', 'id':'autoSellCrates', 'value':'checked'}, 'autoSellCrates');

  var autoSellCratesMoscow = makeElement('div', moneyTab, {'style':'top: 175px; right: 10px;'});
  autoSellCratesMoscow.appendChild(document.createTextNode('Sell Moscow business output'));
  makeElement('input', autoSellCratesMoscow, {'type':'checkbox', 'id':'autoSellCratesMoscow', 'value':'checked'}, 'autoSellCratesMoscow');

  var collectNYTake = makeElement('div', moneyTab, {'style':'top: 200px; right: 10px;'});
  collectNYTake.appendChild(document.createTextNode('Automatically collect NY 3 hour take'));
  makeElement('input', collectNYTake, {'type':'checkbox', 'id':'collectNYTake', 'value':'checked'}, 'collectNYTake');

  // Racketing

  var racketCollect = makeElement('div', moneyTab, {'style':'top: 225px; right: 10px;'});
  racketCollect.appendChild(document.createTextNode('Automatically collect racket'));
  makeElement('input', racketCollect, {'type':'checkbox', 'id':'racketCollect', 'value':'checked'}, 'racketCollect');

  var racketReshakedown = makeElement('div', moneyTab, {'style':'top: 250px; right: 10px;'});
  racketReshakedown.appendChild(document.createTextNode('Shake down again'));
  makeElement('input', racketReshakedown, {'type':'checkbox', 'id':'racketReshakedown', 'value':'checked'}, 'racketReshakedown');

  var racketPermanentShakedown = makeElement('div', moneyTab, {'style':'top: 275px; right: 10px;'});
  racketPermanentShakedown.appendChild(document.createTextNode('Shake down again permanently'));
  makeElement('input', racketPermanentShakedown, {'type':'checkbox', 'id':'racketPermanentShakedown', 'value':'checked'}, 'racketPermanentShakedown');

  var xTop = 325;
  for (var i = 0, iLength = cities.length; i < iLength; ++i) {
    id = cities[i][CITY_AUTOBANK];
    title = 'Enable ' + cities[i][CITY_NAME] + ' banking ';
    var curBank = makeElement('div', moneyTab, {'style':'top: '+(i*25 + xTop)+'px; right: 10px;'});
    makeElement('input', curBank, {'style':'vertical-align: middle;','type':'checkbox', 'id':id, 'value':'checked'}, id);
    makeElement('label', curBank, {'for':id}).appendChild(document.createTextNode(title));
    makeElement('img', curBank, {'style':'vertical-align: middle;','src':stripURI(cities[i][CITY_CASH_ICON])});
    id = cities[i][CITY_BANKCONFG];
    title = 'Minimum deposit amount in ' + cities[i][CITY_NAME];
    makeElement('input', curBank, {'type':'text', 'style':'width: 80px;margin-left:5px; text-align: right', 'title':title, 'value':GM_getValue(id, '50000'), 'id':id, 'size':'5'});
    curBank.addEventListener('change', minBankCheck, false);
  }

  return moneyTab;
}

// Create About tab
function createAboutTab () {
  var elt, title, id, label;
  var aboutTab = makeElement('div', null, {'id':'aboutTab', 'class':'tabcontent', 'style':'background-image:url(' + stripURI(bgTabImage) + ')'});

  var versionInfo = makeElement('div', aboutTab, {'style':'top: 25px;font-size: 18px; font-weight: bold;'});
  versionInfo.appendChild(document.createTextNode('Version '+ SCRIPT.version));
  makeElement('br', versionInfo);
  versionInfo.appendChild(document.createTextNode('Build '+SCRIPT.build));

  var devs = makeElement('div', aboutTab, {'style':'top: 75px; left: 10px; font-size: 12px; font-weight: bold;'});
  devs.appendChild(document.createTextNode('Contributors:'));
  devList = makeElement('span', devs, {'style':'position: relative; left: 15px;'});

  var devNames = ['CharlesD', 'Eric Ortego', 'Jeremy', 'Liquidor', 'AK17710N', 'Fragger',
                 '<x51>', 'CyB', 'int1', 'Janos112', 'int2str', 'Doonce', 'Eric Layne', 'Tanlis',
                 'Cam', 'csanbuenaventura', 'vmzildjian', 'Scrotal', 'Bushdaka', 'rdmcgraw', 'moe', 'KCMCL'];

  // Append developer names
  devNames.forEach(function(devName) {
    makeElement('br', devList);
    devList.appendChild(document.createTextNode(devName));
  });

  return aboutTab;
}

// Validates the settings on the stamina tab. If all settings are valid, an
// object containing each key and value to be saved is returned.
function validateStaminaTab() {
  var elt, id;

  var checked = function(id) {
    return document.getElementById(id).checked === true? 'checked' : 0;
  }

  // Create an empty object to hold the settings.
  var s = {};

  // Get the common settings.
  s.staminaSpend = checked('staminaSpend');
  s.staminaSpendHow = document.getElementById('staminaSpendHow').selectedIndex;
  s.selectStaminaUse = document.getElementById('selectStaminaUse').value;
  s.selectStaminaUseMode = document.getElementById('selectStaminaUseMode').selectedIndex;
  s.selectStaminaKeep = document.getElementById('selectStaminaKeep').value;
  s.selectStaminaKeepMode = document.getElementById('selectStaminaKeepMode').selectedIndex;
  s.allowStaminaToLevelUp = checked('allowStaminaToLevelUp');

  if (isNaN(s.selectStaminaUse) || isNaN(s.selectStaminaKeep)) {
    alert('Please enter numeric values for Stamina reserve and Stamina threshold.');
  }

  // The method of getting and verifying the rest of the settings depends
  // on how stamina will be spent.
  switch (s.staminaSpendHow) {
    case STAMINA_HOW_FIGHT_RANDOM: // Random fighting
      // Get the settings.
      s.fightLocation = document.getElementById('fightRandomLoc').selectedIndex;
      s.fightLevelMax = parseInt(document.getElementById('fightLevelMax').value);
      s.fightLevelMaxRelative = checked('fightLevelMaxRelative');
      s.fightMafiaMax = parseInt(document.getElementById('fightMafiaMax').value);
      s.fightMafiaMaxRelative = checked('fightMafiaMaxRelative');
      s.fightMafiaMin = parseInt(document.getElementById('fightMafiaMin').value);
      s.fightMafiaMinRelative = checked('fightMafiaMinRelative');
      s.fightStealth = checked('fightStealth');
      s.fightAvoidBodyguards = checked('fightAvoidBodyguards');
      s.fightAvoidNames = checked('fightAvoidNames');
      s.clanName = document.getElementById('fightClanName').value;
      s.reattackThreshold = parseInt(document.getElementById('reattackThreshold').value);
      s.staminaReattack = checked('staminaReattack');

      // Validate reattack settings.
      if (isNaN(s.reattackThreshold)) {
        alert('Please enter the threshold for reattacking opponents.');
      } else if (s.reattackThreshold < 0) {
        alert('Please enter a reattack threshold of zero or more.');
      }

      // Validate the maximum level settings.
      if (isNaN(s.fightLevelMax)) {
        alert('Please enter a maximum level for fighting.');
        return;
      } else if (s.fightLevelMaxRelative && s.fightLevelMax < 0) {
        alert('Please enter a maximum relative level of zero or more.');
        return;
      } else if (!s.fightLevelMaxRelative && s.fightLevelMax < level) {
        addToLog('warning Icon', 'Maximum level for fighting is set to ' + s.fightLevelMax + '. Setting to current level of ' + level + '.');
        s.fightLevelMax = level;
      } else if (!s.fightLevelMaxRelative && level >= 180 &&
                 s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a maximum fight level of 200 at the very least. If necessary, lower the maximum mafia size to compensate.');
        return;
      } else if (s.fightLevelMaxRelative && level >= 180 &&
                level + s.fightLevelMax < 200) {
        alert('Once you reach level 180, only opponents of level 180 and up are displayed. In order to find random opponents, please enter a relative fight level of at least ' + (200 - s.fightLevelMax) + '. If necessary, lower the maximum mafia size to compensate.');
        return;
      }

      // Validate the maximum mafia size settings.
      if (isNaN(s.fightMafiaMax)) {
        alert('Please enter a maximum mafia size for fighting.');
        return;
      } else if (!s.fightMafiaMaxRelative && (s.fightMafiaMax < 1)) {
        alert('Please enter a maximum mafia size of one or more for fighting.');
        return;
      } else if (s.fightMafiaMaxRelative && (s.fightMafiaMax + mafia < 1)) {
        alert('Please enter a larger relative mafia size for fighting.');
        return;
      }

      // Validate the minimum mafia size settings.
      if (isNaN(s.fightMafiaMin)) {
        alert('Please enter a minimum mafia size for fighting.');
        return;
      } else if (!s.fightMafiaMinRelative && (s.fightMafiaMin < 1)) {
        alert('Please enter a minimum mafia size of one or more for fighting.');
        return;
      } else if (s.fightMafiaMinRelative && (mafia - s.fightMafiaMin < 1)) {
        alert('Please enter a smaller relative mafia size for fighting.');
        return;
      }
      break;

    case STAMINA_HOW_FIGHT_LIST: // List fighting
      // Get the settings.
      s.fightLocation = document.getElementById('fightListLoc').selectedIndex;
      s.fightList = document.getElementById('fightList').value;
      s.fightRemoveStronger = document.getElementById('fightRemoveStronger').checked === true? 'checked' : 0;
      s.reattackThreshold = parseInt(document.getElementById('reattackThresholdList').value);
      s.staminaReattack = checked('staminaReattackList');
            // Validate reattack settings.
      if (isNaN(s.reattackThreshold)) {
        alert('Please enter the threshold for reattacking opponents.');
      } else if (s.reattackThreshold < 0) {
        alert('Please enter a reattack threshold of zero or more.');
      }

      // Validate the fight list.
      var list = s.fightList.split('\n');
      if (!list[0]) {
        alert('Enter the Facebook ID of at least one opponent to fight.');
        return;
      }
      break;

    case STAMINA_HOW_HITMAN: // Hitlist bounty collection ("auto-hitman")
      // Get the settings.
      s.hitmanLocation = document.getElementById('hitmanLoc').selectedIndex;
      s.hitmanBountyMin = document.getElementById('hitmanBountyMin').value;
      s.bountySelection = document.getElementById('bountySelection').selectedIndex;
      s.hitmanAvoidNames = checked('hitmanAvoidNames');
      s.clanName = document.getElementById('hitmanClanName').value;

      // Validate the minimum bounty.
      var min = parseCash(s.hitmanBountyMin);
      if (isNaN(min) || min < 0) {
        alert('Please enter a minimum bounty amount.');
        return;
      }
      break;

    case STAMINA_HOW_RANDOM: // Random stamina spending
      break;

    default:
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized stamina setting: ' +
               'staminaSpendHow=' + s.staminaSpendHow);
  }

  return s;
}

function createStatWindow() {
  if (settingsOpen === true) {
    toggleSettings()
  };

  makeElement('style', document.getElementsByTagName('head')[0], {'type':'text/css'}).appendChild(document.createTextNode(
    '#statsWindow #sWindowTabNav div{border-right:1px solid #000;float:left;padding:0 7px;position:static;text-align:center}' +
    '#statsWindow #sWindowTabNav div.selected{background-image:url(' + stripURI(tabSelectedImage) + ')}' +
    '#statsWindow #sWindowTabNav div a{color:#fff;font-weight:700}' +
    '#statsWindow .sexy_button{position:absolute;background-image:url(' + stripURI(blackBgImage) + ');border:1px solid #FFD927;color:#FFD927;cursor:pointer;display:block;float:left;font-size:14px;font-weight:700;padding:5px;text-decoration:none;width:auto}' +
    '#statsWindow .sexy_button button{background:transparent;border:medium none #FFF;color:#FFD927;cursor:pointer;font-size:14px;font-weight:700;margin:0}' +
    '#statsWindow .sexy_button button:hover{color:#BCD2EA;font-weight:700;text-decoration:none}' +
    '#statsWindow .tabcontent{display:none;}' +
    '#statsWindow label {font-weight: normal; color: #BCD2EA}'
  ));

  // This creates the stats box just like a facebook popup
  var elt = makeElement('div', document.body, {'class':'generic_dialog pop_dialog', 'id':'sWindowGenDialogPopDialog'});
  elt = makeElement('div', elt, {'class':'generic_dialog_popup', 'style':'top: 30px; width: 620px;'});
  elt = makeElement('div', elt, {'class':'pop_content popcontent_advanced', 'id':'pop_content'});
  var statsWindow = makeElement('div', elt, {'style':'position: fixed; left: 329px; top: 30px; z-index: 101; width: 600px; height: 540px; font-size: 14px; color: #BCD2EA; background: black no-repeat scroll 0 110px', 'id':'statsWindow'});
  //End settings box

  var statsWindowTopBG = makeElement('div', statsWindow, {'style':'background: black; height: 40px;'});
    var statsWindowTitle = makeElement('div', statsWindowTopBG, {'style':'font-size: 18px; font-weight: bold;'});
      statsWindowTitle.appendChild(document.createTextNode('Player Stats '));
      makeElement('br', statsWindowTitle);
    //makeElement('img', statsWindowTopBG, {'src':stripURI(mwLogoSmall), 'style':'position: absolute; top: 0px; right: 25px;'});
    makeElement('img', statsWindowTopBG, {'src':stripURI(closeButtonIcon), 'style':'position: absolute; top: 0px; right: 0px; cursor: pointer;'}).addEventListener('click', toggleStats, false);


  // NOTE: This container is for placing the buttons horizontally.
  elt = makeElement('div', statsWindow, {'style':'text-align: left'});
  // Make the button bar.
  var sWindowTabNav = makeElement('div', elt, {'id':'sWindowTabNav', 'style':'position: static; display: inline-block; background: transparent url(' + stripURI(blackBgImage) + ') repeat-x scroll 0 0; border: 1px solid #FFFFFF; fontsize: 13px; line-height: 28px; height: 30px;'});
    var graphTabLink = makeElement('div', sWindowTabNav, {'class':'selected'} );
      makeElement('a', graphTabLink, {'href':'#', 'rel':'graphTab'}).appendChild(document.createTextNode('Graphs'));
    var statTabLink = makeElement('div', sWindowTabNav );
      makeElement('a', statTabLink, {'href':'#', 'rel':'statTab'}).appendChild(document.createTextNode('Stats'));


  var graphTab = makeElement('div', statsWindow, {'id':'graphTab', 'class':'tabcontent'});
    var graphBox = makeElement('div', graphTab, {'id':'graphBox', 'style':'position: static; overflow: auto; height: 443px; width: 578px; background-color: #111111; font-size:10px; color: #BCD2EA; text-align: center; margin: 5px; padding: 5px; border: 1px inset;'});
      graphBox.innerHTML = GM_getValue('graphBox', 'Enable Stats with the Checkbox on the General tab of the AutopPlay settings.<br><br>Stats will populate after the 2nd hour of running.');

  var statTab = makeElement('div', statsWindow, {'id':'statTab', 'class':'tabcontent'});
    //var autoClick = makeElement('div', statTab, {'style':'top: 25px;'});
    //makeElement('img', autoClick, {'style':'position: absolute; top: 5px; left: 200px', 'src':stripURI(energyIcon)});


//Tab code from:http://www.dynamicdrive.com/dynamicindex17/tabcontent.htm converted into a data URI
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript', 'src':
    "data:application/x-javascript;base64,Ly8qKiBUYWIgQ29udGVudCBzY3JpcHQgdjIuMC0gqSBEeW5hbWljIERyaXZlIERIVE1MIGNvZGUgbGlicmFyeSAoaHR0cDovL3d3dy5keW5hbWljZHJpdmUuY29tKQ0KLy8qKiBVcGRhdGVkIE9jdCA3dGgsIDA3IHRvIHZlcnNpb24gMi4wLiBDb250YWlucyBudW1lcm91cyBpbXByb3ZlbWVudHM6DQovLyAgIC1BZGRlZCBBdXRvIE1vZGU6IFNjcmlwdCBhdXRvIHJvdGF0ZXMgdGhlIHRhYnMgYmFzZWQgb24gYW4gaW50ZXJ2YWwsIHVudGlsIGEgdGFiIGlzIGV4cGxpY2l0bHkgc2VsZWN0ZWQNCi8vICAgLUFiaWxpdHkgdG8gZXhwYW5kL2NvbnRyYWN0IGFyYml0cmFyeSBESVZzIG9uIHRoZSBwYWdlIGFzIHRoZSB0YWJiZWQgY29udGVudCBpcyBleHBhbmRlZC8gY29udHJhY3RlZA0KLy8gICAtQWJpbGl0eSB0byBkeW5hbWljYWxseSBzZWxlY3QgYSB0YWIgZWl0aGVyIGJhc2VkIG9uIGl0cyBwb3NpdGlvbiB3aXRoaW4gaXRzIHBlZXJzLCBvciBpdHMgSUQgYXR0cmlidXRlIChnaXZlIHRoZSB0YXJnZXQgdGFiIG9uZSAxc3QpDQovLyAgIC1BYmlsaXR5IHRvIHNldCB3aGVyZSB0aGUgQ1NTIGNsYXNzbmFtZSAic2VsZWN0ZWQiIGdldCBhc3NpZ25lZC0gZWl0aGVyIHRvIHRoZSB0YXJnZXQgdGFiJ3MgbGluayAoIkEiKSwgb3IgaXRzIHBhcmVudCBjb250YWluZXINCi8vKiogVXBkYXRlZCBGZWIgMTh0aCwgMDggdG8gdmVyc2lvbiAyLjE6IEFkZHMgYSAidGFiaW5zdGFuY2UuY3ljbGVpdChkaXIpIiBtZXRob2QgdG8gY3ljbGUgZm9yd2FyZCBvciBiYWNrd2FyZCBiZXR3ZWVuIHRhYnMgZHluYW1pY2FsbHkNCi8vKiogVXBkYXRlZCBBcHJpbCA4dGgsIDA4IHRvIHZlcnNpb24gMi4yOiBBZGRzIHN1cHBvcnQgZm9yIGV4cGFuZGluZyBhIHRhYiB1c2luZyBhIFVSTCBwYXJhbWV0ZXIgKGllOiBodHRwOi8vbXlzaXRlLmNvbS90YWJjb250ZW50Lmh0bT90YWJpbnRlcmZhY2VpZD0wKSANCg0KLy8vL05PIE5FRUQgVE8gRURJVCBCRUxPVy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLw0KDQpmdW5jdGlvbiBkZHRhYmNvbnRlbnQodGFiaW50ZXJmYWNlaWQpew0KCXRoaXMudGFiaW50ZXJmYWNlaWQ9dGFiaW50ZXJmYWNlaWQgLy9JRCBvZiBUYWIgTWVudSBtYWluIGNvbnRhaW5lcg0KCXRoaXMudGFicz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJpbnRlcmZhY2VpZCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImEiKSAvL0dldCBhbGwgdGFiIGxpbmtzIHdpdGhpbiBjb250YWluZXINCgl0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlPXRydWUNCgl0aGlzLmhvdHRhYnNwb3NpdGlvbnM9W10gLy9BcnJheSB0byBzdG9yZSBwb3NpdGlvbiBvZiB0YWJzIHRoYXQgaGF2ZSBhICJyZWwiIGF0dHIgZGVmaW5lZCwgcmVsYXRpdmUgdG8gYWxsIHRhYiBsaW5rcywgd2l0aGluIGNvbnRhaW5lcg0KCXRoaXMuY3VycmVudFRhYkluZGV4PTAgLy9JbmRleCBvZiBjdXJyZW50bHkgc2VsZWN0ZWQgaG90IHRhYiAodGFiIHdpdGggc3ViIGNvbnRlbnQpIHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkNCgl0aGlzLnN1YmNvbnRlbnRpZHM9W10gLy9BcnJheSB0byBzdG9yZSBpZHMgb2YgdGhlIHN1YiBjb250ZW50cyAoInJlbCIgYXR0ciB2YWx1ZXMpDQoJdGhpcy5yZXZjb250ZW50aWRzPVtdIC8vQXJyYXkgdG8gc3RvcmUgaWRzIG9mIGFyYml0cmFyeSBjb250ZW50cyB0byBleHBhbmQvY29udGFjdCBhcyB3ZWxsICgicmV2IiBhdHRyIHZhbHVlcykNCgl0aGlzLnNlbGVjdGVkQ2xhc3NUYXJnZXQ9ImxpbmsiIC8va2V5d29yZCB0byBpbmRpY2F0ZSB3aGljaCB0YXJnZXQgZWxlbWVudCB0byBhc3NpZ24gInNlbGVjdGVkIiBDU1MgY2xhc3MgKCJsaW5rcGFyZW50IiBvciAibGluayIpDQp9DQoNCmRkdGFiY29udGVudC5nZXRDb29raWU9ZnVuY3Rpb24oTmFtZSl7IA0KCXZhciByZT1uZXcgUmVnRXhwKE5hbWUrIj1bXjtdKyIsICJpIik7IC8vY29uc3RydWN0IFJFIHRvIHNlYXJjaCBmb3IgdGFyZ2V0IG5hbWUvdmFsdWUgcGFpcg0KCWlmIChkb2N1bWVudC5jb29raWUubWF0Y2gocmUpKSAvL2lmIGNvb2tpZSBmb3VuZA0KCQlyZXR1cm4gZG9jdW1lbnQuY29va2llLm1hdGNoKHJlKVswXS5zcGxpdCgiPSIpWzFdIC8vcmV0dXJuIGl0cyB2YWx1ZQ0KCXJldHVybiAiIg0KfQ0KDQpkZHRhYmNvbnRlbnQuc2V0Q29va2llPWZ1bmN0aW9uKG5hbWUsIHZhbHVlKXsNCglkb2N1bWVudC5jb29raWUgPSBuYW1lKyI9Iit2YWx1ZSsiO3BhdGg9LyIgLy9jb29raWUgdmFsdWUgaXMgZG9tYWluIHdpZGUgKHBhdGg9LykNCn0NCg0KZGR0YWJjb250ZW50LnByb3RvdHlwZT17DQoNCglleHBhbmRpdDpmdW5jdGlvbih0YWJpZF9vcl9wb3NpdGlvbil7IC8vUFVCTElDIGZ1bmN0aW9uIHRvIHNlbGVjdCBhIHRhYiBlaXRoZXIgYnkgaXRzIElEIG9yIHBvc2l0aW9uKGludCkgd2l0aGluIGl0cyBwZWVycw0KCQl0aGlzLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCXZhciB0YWJyZWY9IiINCgkJdHJ5ew0KCQkJaWYgKHR5cGVvZiB0YWJpZF9vcl9wb3NpdGlvbj09InN0cmluZyIgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiaWRfb3JfcG9zaXRpb24pLmdldEF0dHJpYnV0ZSgicmVsIikpIC8vaWYgc3BlY2lmaWVkIHRhYiBjb250YWlucyAicmVsIiBhdHRyDQoJCQkJdGFicmVmPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmlkX29yX3Bvc2l0aW9uKQ0KCQkJZWxzZSBpZiAocGFyc2VJbnQodGFiaWRfb3JfcG9zaXRpb24pIT1OYU4gJiYgdGhpcy50YWJzW3RhYmlkX29yX3Bvc2l0aW9uXS5nZXRBdHRyaWJ1dGUoInJlbCIpKSAvL2lmIHNwZWNpZmllZCB0YWIgY29udGFpbnMgInJlbCIgYXR0cg0KCQkJCXRhYnJlZj10aGlzLnRhYnNbdGFiaWRfb3JfcG9zaXRpb25dDQoJCX0NCgkJY2F0Y2goZXJyKXthbGVydCgiSW52YWxpZCBUYWIgSUQgb3IgcG9zaXRpb24gZW50ZXJlZCEiKX0NCgkJaWYgKHRhYnJlZiE9IiIpIC8vaWYgYSB2YWxpZCB0YWIgaXMgZm91bmQgYmFzZWQgb24gZnVuY3Rpb24gcGFyYW1ldGVyDQoJCQl0aGlzLmV4cGFuZHRhYih0YWJyZWYpIC8vZXhwYW5kIHRoaXMgdGFiDQoJfSwNCg0KCWN5Y2xlaXQ6ZnVuY3Rpb24oZGlyLCBhdXRvcnVuKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gbW92ZSBmb3dhcmQgb3IgYmFja3dhcmRzIHRocm91Z2ggZWFjaCBob3QgdGFiICh0YWJpbnN0YW5jZS5jeWNsZWl0KCdmb3dhcmQvYmFjaycpICkNCgkJaWYgKGRpcj09Im5leHQiKXsNCgkJCXZhciBjdXJyZW50VGFiSW5kZXg9KHRoaXMuY3VycmVudFRhYkluZGV4PHRoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGgtMSk%2FIHRoaXMuY3VycmVudFRhYkluZGV4KzEgOiAwDQoJCX0NCgkJZWxzZSBpZiAoZGlyPT0icHJldiIpew0KCQkJdmFyIGN1cnJlbnRUYWJJbmRleD0odGhpcy5jdXJyZW50VGFiSW5kZXg%2BMCk%2FIHRoaXMuY3VycmVudFRhYkluZGV4LTEgOiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoLTENCgkJfQ0KCQlpZiAodHlwZW9mIGF1dG9ydW49PSJ1bmRlZmluZWQiKSAvL2lmIGN5Y2xlaXQoKSBpcyBiZWluZyBjYWxsZWQgYnkgdXNlciwgdmVyc3VzIGF1dG9ydW4oKSBmdW5jdGlvbg0KCQkJdGhpcy5jYW5jZWxhdXRvcnVuKCkgLy9zdG9wIGF1dG8gY3ljbGluZyBvZiB0YWJzIChpZiBydW5uaW5nKQ0KCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zW2N1cnJlbnRUYWJJbmRleF1dKQ0KCX0sDQoNCglzZXRwZXJzaXN0OmZ1bmN0aW9uKGJvb2wpeyAvL1BVQkxJQyBmdW5jdGlvbiB0byB0b2dnbGUgcGVyc2lzdGVuY2UgZmVhdHVyZQ0KCQkJdGhpcy5lbmFibGV0YWJwZXJzaXN0ZW5jZT1ib29sDQoJfSwNCg0KCXNldHNlbGVjdGVkQ2xhc3NUYXJnZXQ6ZnVuY3Rpb24ob2Jqc3RyKXsgLy9QVUJMSUMgZnVuY3Rpb24gdG8gc2V0IHdoaWNoIHRhcmdldCBlbGVtZW50IHRvIGFzc2lnbiAic2VsZWN0ZWQiIENTUyBjbGFzcyAoImxpbmtwYXJlbnQiIG9yICJsaW5rIikNCgkJdGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PW9ianN0ciB8fCAibGluayINCgl9LA0KDQoJZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldDpmdW5jdGlvbih0YWJyZWYpeyAvL1JldHVybnMgdGFyZ2V0IGVsZW1lbnQgdG8gYXNzaWduICJzZWxlY3RlZCIgQ1NTIGNsYXNzIHRvDQoJCXJldHVybiAodGhpcy5zZWxlY3RlZENsYXNzVGFyZ2V0PT0oImxpbmtwYXJlbnQiLnRvTG93ZXJDYXNlKCkpKT8gdGFicmVmLnBhcmVudE5vZGUgOiB0YWJyZWYNCgl9LA0KDQoJdXJscGFyYW1zZWxlY3Q6ZnVuY3Rpb24odGFiaW50ZXJmYWNlaWQpew0KCQl2YXIgcmVzdWx0PXdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cCh0YWJpbnRlcmZhY2VpZCsiPShcXGQrKSIsICJpIikpIC8vY2hlY2sgZm9yICI%2FdGFiaW50ZXJmYWNlaWQ9MiIgaW4gVVJMDQoJCXJldHVybiAocmVzdWx0PT1udWxsKT8gbnVsbCA6IHBhcnNlSW50KFJlZ0V4cC4kMSkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXgsIHdoZXJlIGluZGV4IChpbnQpIGlzIHRoZSBzZWxlY3RlZCB0YWIncyBpbmRleA0KCX0sDQoNCglleHBhbmR0YWI6ZnVuY3Rpb24odGFicmVmKXsNCgkJdmFyIHN1YmNvbnRlbnRpZD10YWJyZWYuZ2V0QXR0cmlidXRlKCJyZWwiKSAvL0dldCBpZCBvZiBzdWJjb250ZW50IHRvIGV4cGFuZA0KCQkvL0dldCAicmV2IiBhdHRyIGFzIGEgc3RyaW5nIG9mIElEcyBpbiB0aGUgZm9ybWF0ICIsam9obixnZW9yZ2UsdHJleSxldGMsIiB0byBlYXNpbHkgc2VhcmNoIHRocm91Z2gNCgkJdmFyIGFzc29jaWF0ZWRyZXZpZHM9KHRhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpKT8gIiwiK3RhYnJlZi5nZXRBdHRyaWJ1dGUoInJldiIpLnJlcGxhY2UoL1xzKy8sICIiKSsiLCIgOiAiIg0KCQl0aGlzLmV4cGFuZHN1YmNvbnRlbnQoc3ViY29udGVudGlkKQ0KCQl0aGlzLmV4cGFuZHJldmNvbnRlbnQoYXNzb2NpYXRlZHJldmlkcykNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMudGFicy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIGFsbCB0YWJzLCBhbmQgYXNzaWduIG9ubHkgdGhlIHNlbGVjdGVkIHRhYiB0aGUgQ1NTIGNsYXNzICJzZWxlY3RlZCINCgkJCXRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT0odGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIik9PXN1YmNvbnRlbnRpZCk%2FICJzZWxlY3RlZCIgOiAiIg0KCQl9DQoJCWlmICh0aGlzLmVuYWJsZXRhYnBlcnNpc3RlbmNlKSAvL2lmIHBlcnNpc3RlbmNlIGVuYWJsZWQsIHNhdmUgc2VsZWN0ZWQgdGFiIHBvc2l0aW9uKGludCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlkZHRhYmNvbnRlbnQuc2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQsIHRhYnJlZi50YWJwb3NpdGlvbikNCgkJdGhpcy5zZXRjdXJyZW50dGFiaW5kZXgodGFicmVmLnRhYnBvc2l0aW9uKSAvL3JlbWVtYmVyIHBvc2l0aW9uIG9mIHNlbGVjdGVkIHRhYiB3aXRoaW4gaG90dGFic3Bvc2l0aW9uc1tdIGFycmF5DQoJfSwNCg0KCWV4cGFuZHN1YmNvbnRlbnQ6ZnVuY3Rpb24oc3ViY29udGVudGlkKXsNCgkJZm9yICh2YXIgaT0wOyBpPHRoaXMuc3ViY29udGVudGlkcy5sZW5ndGg7IGkrKyl7DQoJCQl2YXIgc3ViY29udGVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnN1YmNvbnRlbnRpZHNbaV0pIC8vY2FjaGUgY3VycmVudCBzdWJjb250ZW50IG9iaiAoaW4gZm9yIGxvb3ApDQoJCQlzdWJjb250ZW50LnN0eWxlLmRpc3BsYXk9KHN1YmNvbnRlbnQuaWQ9PXN1YmNvbnRlbnRpZCk%2FICJibG9jayIgOiAibm9uZSIgLy8ic2hvdyIgb3IgaGlkZSBzdWIgY29udGVudCBiYXNlZCBvbiBtYXRjaGluZyBpZCBhdHRyIHZhbHVlDQoJCX0NCgl9LA0KDQoJZXhwYW5kcmV2Y29udGVudDpmdW5jdGlvbihhc3NvY2lhdGVkcmV2aWRzKXsNCgkJdmFyIGFsbHJldmlkcz10aGlzLnJldmNvbnRlbnRpZHMNCgkJZm9yICh2YXIgaT0wOyBpPGFsbHJldmlkcy5sZW5ndGg7IGkrKyl7IC8vTG9vcCB0aHJvdWdoIHJldiBhdHRyaWJ1dGVzIGZvciBhbGwgdGFicyBpbiB0aGlzIHRhYiBpbnRlcmZhY2UNCgkJCS8vaWYgYW55IHZhbHVlcyBzdG9yZWQgd2l0aGluIGFzc29jaWF0ZWRyZXZpZHMgbWF0Y2hlcyBvbmUgd2l0aGluIGFsbHJldmlkcywgZXhwYW5kIHRoYXQgRElWLCBvdGhlcndpc2UsIGNvbnRyYWN0IGl0DQoJCQlkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbGxyZXZpZHNbaV0pLnN0eWxlLmRpc3BsYXk9KGFzc29jaWF0ZWRyZXZpZHMuaW5kZXhPZigiLCIrYWxscmV2aWRzW2ldKyIsIikhPS0xKT8gImJsb2NrIiA6ICJub25lIg0KCQl9DQoJfSwNCg0KCXNldGN1cnJlbnR0YWJpbmRleDpmdW5jdGlvbih0YWJwb3NpdGlvbil7IC8vc3RvcmUgY3VycmVudCBwb3NpdGlvbiBvZiB0YWIgKHdpdGhpbiBob3R0YWJzcG9zaXRpb25zW10gYXJyYXkpDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoOyBpKyspew0KCQkJaWYgKHRhYnBvc2l0aW9uPT10aGlzLmhvdHRhYnNwb3NpdGlvbnNbaV0pew0KCQkJCXRoaXMuY3VycmVudFRhYkluZGV4PWkNCgkJCQlicmVhaw0KCQkJfQ0KCQl9DQoJfSwNCg0KCWF1dG9ydW46ZnVuY3Rpb24oKXsgLy9mdW5jdGlvbiB0byBhdXRvIGN5Y2xlIHRocm91Z2ggYW5kIHNlbGVjdCB0YWJzIGJhc2VkIG9uIGEgc2V0IGludGVydmFsDQoJCXRoaXMuY3ljbGVpdCgnbmV4dCcsIHRydWUpDQoJfSwNCg0KCWNhbmNlbGF1dG9ydW46ZnVuY3Rpb24oKXsNCgkJaWYgKHR5cGVvZiB0aGlzLmF1dG9ydW50aW1lciE9InVuZGVmaW5lZCIpDQoJCQljbGVhckludGVydmFsKHRoaXMuYXV0b3J1bnRpbWVyKQ0KCX0sDQoNCglpbml0OmZ1bmN0aW9uKGF1dG9tb2RlcGVyaW9kKXsNCgkJdmFyIHBlcnNpc3RlZHRhYj1kZHRhYmNvbnRlbnQuZ2V0Q29va2llKHRoaXMudGFiaW50ZXJmYWNlaWQpIC8vZ2V0IHBvc2l0aW9uIG9mIHBlcnNpc3RlZCB0YWIgKGFwcGxpY2FibGUgaWYgcGVyc2lzdGVuY2UgaXMgZW5hYmxlZCkNCgkJdmFyIHNlbGVjdGVkdGFiPS0xIC8vQ3VycmVudGx5IHNlbGVjdGVkIHRhYiBpbmRleCAoLTEgbWVhbmluZyBub25lKQ0KCQl2YXIgc2VsZWN0ZWR0YWJmcm9tdXJsPXRoaXMudXJscGFyYW1zZWxlY3QodGhpcy50YWJpbnRlcmZhY2VpZCkgLy9yZXR1cm5zIG51bGwgb3IgaW5kZXggZnJvbTogdGFiY29udGVudC5odG0%2FdGFiaW50ZXJmYWNlaWQ9aW5kZXgNCgkJdGhpcy5hdXRvbW9kZXBlcmlvZD1hdXRvbW9kZXBlcmlvZCB8fCAwDQoJCWZvciAodmFyIGk9MDsgaTx0aGlzLnRhYnMubGVuZ3RoOyBpKyspew0KCQkJdGhpcy50YWJzW2ldLnRhYnBvc2l0aW9uPWkgLy9yZW1lbWJlciBwb3NpdGlvbiBvZiB0YWIgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmVsIikpew0KCQkJCXZhciB0YWJpbnN0YW5jZT10aGlzDQoJCQkJdGhpcy5ob3R0YWJzcG9zaXRpb25zW3RoaXMuaG90dGFic3Bvc2l0aW9ucy5sZW5ndGhdPWkgLy9zdG9yZSBwb3NpdGlvbiBvZiAiaG90IiB0YWIgKCJyZWwiIGF0dHIgZGVmaW5lZCkgcmVsYXRpdmUgdG8gaXRzIHBlZXJzDQoJCQkJdGhpcy5zdWJjb250ZW50aWRzW3RoaXMuc3ViY29udGVudGlkcy5sZW5ndGhdPXRoaXMudGFic1tpXS5nZXRBdHRyaWJ1dGUoInJlbCIpIC8vc3RvcmUgaWQgb2Ygc3ViIGNvbnRlbnQgKCJyZWwiIGF0dHIgdmFsdWUpDQoJCQkJdGhpcy50YWJzW2ldLm9uY2xpY2s9ZnVuY3Rpb24oKXsNCgkJCQkJdGFiaW5zdGFuY2UuZXhwYW5kdGFiKHRoaXMpDQoJCQkJCXRhYmluc3RhbmNlLmNhbmNlbGF1dG9ydW4oKSAvL3N0b3AgYXV0byBjeWNsaW5nIG9mIHRhYnMgKGlmIHJ1bm5pbmcpDQoJCQkJCXJldHVybiBmYWxzZQ0KCQkJCX0NCgkJCQlpZiAodGhpcy50YWJzW2ldLmdldEF0dHJpYnV0ZSgicmV2IikpeyAvL2lmICJyZXYiIGF0dHIgZGVmaW5lZCwgc3RvcmUgZWFjaCB2YWx1ZSB3aXRoaW4gInJldiIgYXMgYW4gYXJyYXkgZWxlbWVudA0KCQkJCQl0aGlzLnJldmNvbnRlbnRpZHM9dGhpcy5yZXZjb250ZW50aWRzLmNvbmNhdCh0aGlzLnRhYnNbaV0uZ2V0QXR0cmlidXRlKCJyZXYiKS5zcGxpdCgvXHMqLFxzKi8pKQ0KCQkJCX0NCgkJCQlpZiAoc2VsZWN0ZWR0YWJmcm9tdXJsPT1pIHx8IHRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHBhcnNlSW50KHBlcnNpc3RlZHRhYik9PWkgfHwgIXRoaXMuZW5hYmxldGFicGVyc2lzdGVuY2UgJiYgc2VsZWN0ZWR0YWI9PS0xICYmIHRoaXMuZ2V0c2VsZWN0ZWRDbGFzc1RhcmdldCh0aGlzLnRhYnNbaV0pLmNsYXNzTmFtZT09InNlbGVjdGVkIil7DQoJCQkJCXNlbGVjdGVkdGFiPWkgLy9TZWxlY3RlZCB0YWIgaW5kZXgsIGlmIGZvdW5kDQoJCQkJfQ0KCQkJfQ0KCQl9IC8vRU5EIGZvciBsb29wDQoJCWlmIChzZWxlY3RlZHRhYiE9LTEpIC8vaWYgYSB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIHRhYiBpbmRleCBpcyBmb3VuZA0KCQkJdGhpcy5leHBhbmR0YWIodGhpcy50YWJzW3NlbGVjdGVkdGFiXSkgLy9leHBhbmQgc2VsZWN0ZWQgdGFiIChlaXRoZXIgZnJvbSBVUkwgcGFyYW1ldGVyLCBwZXJzaXN0ZW50IGZlYXR1cmUsIG9yIGNsYXNzPSJzZWxlY3RlZCIgY2xhc3MpDQoJCWVsc2UgLy9pZiBubyB2YWxpZCBkZWZhdWx0IHNlbGVjdGVkIGluZGV4IGZvdW5kDQoJCQl0aGlzLmV4cGFuZHRhYih0aGlzLnRhYnNbdGhpcy5ob3R0YWJzcG9zaXRpb25zWzBdXSkgLy9KdXN0IHNlbGVjdCBmaXJzdCB0YWIgdGhhdCBjb250YWlucyBhICJyZWwiIGF0dHINCgkJaWYgKHBhcnNlSW50KHRoaXMuYXV0b21vZGVwZXJpb2QpPjUwMCAmJiB0aGlzLmhvdHRhYnNwb3NpdGlvbnMubGVuZ3RoPjEpew0KCQkJdGhpcy5hdXRvcnVudGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXt0YWJpbnN0YW5jZS5hdXRvcnVuKCl9LCB0aGlzLmF1dG9tb2RlcGVyaW9kKQ0KCQl9DQoJfSAvL0VORCBpbnQoKSBmdW5jdGlvbg0KDQp9IC8vRU5EIFByb3RvdHlwZSBhc3NpZ25tZW50"
  }).appendChild(document.createTextNode(
    '/***********************************************\n' +
    '* Tab Content script v2.2- © Dynamic Drive DHTML code library (www.dynamicdrive.com)\n' +
    '* This notice MUST stay intact for legal use\n' +
    '* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code\n' +
    '***********************************************/\n'
  ));
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript'}).appendChild(document.createTextNode(
    'var statTabs=new ddtabcontent("sWindowTabNav"); //enter ID of Tab Container\n' +
    'statTabs.setpersist(true); //toogle persistence of the tabs\' state\n' +
    'statTabs.setselectedClassTarget("linkparent"); //"link" or "linkparent"\n' +
    'statTabs.init();'
  ));
  DEBUG('Stat Menu Created.');
}

function clickAutoPause() {
  if (this.checked) {
    // check to ensure at least one radio box is checked
    // enable Before level up by default
    if (document.getElementById('autoPauseBefore').checked === false &&
        document.getElementById('autoPauseAfter').checked === false) {
      document.getElementById('autoPauseBefore').checked = true;
    }
  }
}

function handleUnexpectedPage() {
  DEBUG('Unexpected page.');

  // Handle "try again" error pages.
  var tryAgainElt = document.getElementById('try_again_button');
  if (tryAgainElt) {
    var delay = 10;
    var p = document.createElement('p');
    var wait = function() {
      if (!delay) return tryAgainElt.click();
      p.innerHTML = 'You will automatically try again in ' +
                    delay-- + ' seconds.';
      window.setTimeout(wait, 1000);
    }
    DEBUG('Service interruption: "Try Again" button seen.');
    tryAgainElt.parentNode.appendChild(document.createElement('br'));
    tryAgainElt.parentNode.appendChild(p);
    wait();
    return;
  }

  // Skip "free boost" pages.
  var elt = xpathFirst('//a[contains(., "Skip")]');
  if (elt) {
    Autoplay.fx = function() {
      clickElement(elt);
      DEBUG('Clicked "skip".');
    }
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return;
  }

  // Start a timer to reload the page if nothing else happens.
  Autoplay.fx = function() {
    // Unrecognized page.
    if (!document.body) {
      DEBUG('No body. Possible redirect, white out or slow load?');
    } else {
      DEBUG('Can\'t read page. Possible white out?');
    }
    loadHome();
  }
  Autoplay.delay = 10000;
  Autoplay.start();
}

function handleModificationTimer() {
  // The timer has gone off, so assume that page updates have finished.
  //GM_log('Changes finished.');
  modificationTimer = undefined;

  var mastheadElt = document.getElementById('mw_masthead');
  if (!mastheadElt || !mastheadElt.scrollWidth || !refreshGlobalStats()) {
    handleUnexpectedPage();
    return;
  }
  refreshSettings();

  // Find the visible inner page.
  var pageChanged = false;
  var prevPageElt = innerPageElt;
  var contentRowElt = document.getElementById('content_row');
  var result = xpath('./*[contains(@id, "inner_page")]', contentRowElt);
  for (var i = 0, iLength=result.snapshotLength; i < iLength; i++) {
    var elt = result.snapshotItem(i);
    if (elt.style.display != 'none') {
      innerPageElt = elt;
      break;
    }
  }
  if (!innerPageElt) return;

  // Make sure our private AJAX page exists and isn't visible.
  var ajaxID = SCRIPT.ajaxPage;
  var elt = xpathFirst('//div[@id="' + ajaxID + '"]');
  if (!elt) {
    elt = makeElement('div', innerPageElt.parentNode, {'id':ajaxID});
  }
  elt.style.display = 'none';

  // Determine if the displayed page has changed.
  if (!xpathFirst('./div[@id="inner_page"]', innerPageElt)) {
    setListenContent(false);
    makeElement('div', innerPageElt, {'id':'inner_page', 'style':'display: none'});
    setListenContent(true);
    DEBUG('New inner page content: ' + innerPageElt.id);
    pageChanged = true;
  } else if (prevPageElt != innerPageElt) {
    DEBUG('Switched inner page to: ' + innerPageElt.id);
    pageChanged = true;
  }

  // Handle changes to the inner page.
  if (pageChanged) {
    try {
      innerPageChanged();
    } catch(ex) {
      addToLog('warning Icon', ex);
    }
  }
}

function setModificationTimer() {
  if (modificationTimer) window.clearTimeout(modificationTimer);
  modificationTimer = window.setTimeout(handleModificationTimer, 500);
  //GM_log('Modification timer set.');
}

function handleDOMSubtreeModified(e) {
  if (ignoreElement(e.target)) return;
  logElement(e.target, 'subtree');
}

function handleContentModified(e) {
  if (ignoreElement(e.target)) return;
  //logElement(e.target, 'content');
  setModificationTimer();
}

function handlePublishNotificationsInternal(e) {
  //if (!ignoreElement(e.target)) logElement(e.target, 'handlePublishNotifications');

  var popup = e.target;

  if (running && popup && popup.innerHTML &&
      (popup.id == 'pop_content' ||
       popup.innerHTML.indexOf('pop_content') != -1 ||
       popup.innerHTML.indexOf('feedform_user_message') != -1) ) {

    // Close "No Network" popups.
    if (popup.innerHTML.match(/no network/i)) {
      var elt = xpathFirst('.//input[@value="Okay"]', popup);
      if (elt) {
        clickElement(elt);
        DEBUG('Clicked to skip "no network" popup.');
      }
    }

    // Close "minor issue" popups.
    if (popup.innerHTML.match(/minor issue/i)) {
      var elt = xpathFirst('.//input[@value="Okay"]', popup);
      if (elt) {
        clickElement(elt);
        DEBUG('Clicked to skip "minor issue" popup.');
      }
    }

    // Publishing/skipping posts
    var skipPost = xpathFirst('.//input[@value="Skip"]', popup);
    if (skipPost) {

      // Gift post
      var giftCheck = xpathFirst('.//div[contains(., "sent")]/a[contains(@href, "sendgiftshort")]', popup);
      if (giftCheck && isChecked('autoGiftSkipOpt')) {
        clickElement(skipPost);
        DEBUG('Clicked to skip gift publishing.');
        return;
      }

      // Daily chance
      var lottoCheck = xpathFirst('.//div[contains(., "prizes are given away each week")]', popup);
      if (lottoCheck && isChecked('autoLottoOpt')) {
        clickElement(skipPost);
        DEBUG('Clicked to skip lotto publishing.');
        return;
      }

      // Job Help
      var jobHelpCheck = xpathFirst('.//div[contains(.,"requested help")]', popup);
      if (jobHelpCheck && isChecked('autoAskJobHelp')) {
        var msg = GM_getValue('autoAskJobHelpMessage');
        var msgElt = document.getElementById("feedform_user_message");
        var publishPost = xpathFirst('.//input[@value="Publish"]', popup);
        if (msg && msgElt && publishPost) {
          msgElt.value = msg;
          clickElement(publishPost);
          DEBUG('Clicked to publish job help request.');
          return;
        } else {
          clickElement(skipPost);
          DEBUG('Clicked to skip job help request publishing.');
          return;
        }
      }

      // War Reward
      var warRewardCheck = xpathFirst('.//div[contains(.,"rewarded their friends with")]', popup);
      if (warRewardCheck && isChecked('autoWar')) {
        var publishPost = xpathFirst('.//input[@value="Publish"]', popup);
        if (publishPost && isChecked('autoWarRewardPublish')) {
          clickElement(publishPost);
          DEBUG('Clicked to publish war reward notice.');
          return;
        } else {
          // Dont publish the post
          clickElement(skipPost);
          DEBUG('Clicked to skip war reward notice publishing.');
          return;
        }
      }

      // War back up request
      var warHelpCheck = xpathFirst('.//div[contains(.,"needs help to win their War")]', popup);
      if (warHelpCheck && isChecked('autoWar')) {
        var publishPost = xpathFirst('.//input[@value="Publish"]', popup);
        if (publishPost && isChecked('autoWarResponsePublish')) {
          clickElement(publishPost);
          DEBUG('Clicked to publish war backup request.');
          return;
        } else {
          // Dont publish the post
          clickElement(skipPost);
          DEBUG('Clicked to skip war backup request publishing.');
          return;
        }
      }

      // War Declaration
      var warDeclareCheck = xpathFirst('.//div[contains(.,"and has Declared War")]', popup);
      if (warDeclareCheck && isChecked('autoWar')) {
        var publishPost = xpathFirst('.//input[@value="Publish"]', popup);
        if (publishPost && isChecked('autoWarPublish')) {
          clickElement(publishPost);
          DEBUG('Clicked to publish war declaration.');
          return;
        } else {
          // Dont publish the post
          clickElement(skipPost);
          DEBUG('Clicked to skip war declaration publishing.');
          return;
        }
      }
    }
  }
}

function handlePublishNotifications(e) {
  // Wrapping the call with setTimeout is necessary to make Greasemonkey
  // API calls available (such as GM_getValue).
  setTimeout(function() { handlePublishNotificationsInternal(e) }, 0);
}

function handleFBNotificationsInternal(e) {
  //logElement(e.target, 'handleFBNotifications');

  var parentElt = e.target.parentNode;
  if (!parentElt) return;

  // Watch for sent notifications and get rid of some of them.
  if (parentElt.className == 'Beeps') {
    filterNotifications(e.target);
  }
}

function handleFBNotifications(e) {
  // Wrapping the call with setTimeout is necessary to make Greasemonkey
  // API calls available (such as GM_getValue).
  setTimeout(function() { handleFBNotificationsInternal(e) }, 0);
}

// Turns on/off the high-level event listener for the game.
function setListenContent(on) {
  var elt = document.getElementById('mainDiv');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMSubtreeModified', handleContentModified, false);
  } else {
    elt.removeEventListener('DOMSubtreeModified', handleContentModified, false);
  }
}

// Turns on/off the event listener for publish pop-ups.
function setListenAutoSkip(on) {
  if (!document.body) return;
  if (on) {
    document.body.addEventListener('DOMNodeInserted', handlePublishNotifications, false);
  } else {
    document.body.removeEventListener('DOMNodeInserted', handlePublishNotifications, false);
  }
}

// Turns on/off the event listener for Facebook notifications.
function setListenFBNotifications(on) {
  var elt = document.getElementById('presence_bar_right');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMNodeInserted', handleFBNotifications, false);
  } else {
    elt.removeEventListener('DOMNodeInserted', handleFBNotifications, false);
  }
}

// Turns on/off the event listener for the stats section of the page.
function setListenStats(on) {
  var elt = document.getElementById('game_stats');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMNodeInserted', statsInserted, false);
  } else {
    elt.removeEventListener('DOMNodeInserted', statsInserted, false);
  }
}

function statsInserted(e) {
  //if (!ignoreElement(e.target)) logElement(e.target, 'statsInserted');

  // Check for a change in a particular statistic. This is where we'll
  // notice some types of changes that happen without user or script
  // actions, such as earning energy.
  var parentElt = e.target.parentNode;
  if (!parentElt) return;
  if (parentElt == energyElt) {
    energy = parseInt(e.target.nodeValue);
    energyElt.style.textDecoration = (energy == maxEnergy)? 'blink' : 'none';
    setLevelUpRatio();
  } else if (parentElt == staminaElt) {
    var newStamina = parseInt(e.target.nodeValue);
    if (stamina != newStamina) {
      stamina = newStamina;
      staminaFlag = true;
    }
    staminaElt.style.textDecoration = (stamina == maxStamina)? 'blink' : 'none';
  } else if (parentElt == cashNYElt && city == NY) {
    cities[NY][CITY_CASH] = parseCash(e.target.nodeValue);
  } else if (parentElt == cashCubaElt && city == CUBA) {
    cities[CUBA][CITY_CASH] = parseCash(e.target.nodeValue);
  } else if (parentElt == cashMoscowElt && city == MOSCOW) {
    cities[MOSCOW][CITY_CASH] = parseCash(e.target.nodeValue);
  } else if (parentElt == healthElt) {
    // NOTE: At one time, health was updated on with a timer. Leave
    //       this here in case it goes back to being that way.
    health = parseInt(e.target.nodeValue);
    healthElt.style.textDecoration = (health > 19 && health < 29)? 'blink' : 'none';
  }
}

function innerPageChanged() {
  // Reset auto-reload (if enabled).
  autoReload();

  // Customize the display.
  setListenContent(false);
  customizeMasthead();
  customizeLayout();
  customizeStats();
  customizeNames();
  if (!customizeHome() &&
      !customizeJobs() &&
      !customizeProfile() &&
      !customizeHitlist()) {
    if (onPropertyNav()) {
      // Property
      propertyGet();
    } else {
      customizeFight();
    }
  }
  setListenContent(true);

  // Check for deleted news.
  if (xpathFirst('.//td[text()="News deleted"]', innerPageElt)) {
    DEBUG('The player updates were cleared.');
    GM_setValue('logPlayerUpdatesCount', 0);
  }

  // If a click action was taken, check the response.
  if (clickAction) {
    var action = clickAction;
    var context = clickContext;
    clickAction = undefined;
    clickContext = undefined;
    if (!logResponse(innerPageElt, action, context)) {
      // No further action was taken. Kick off auto-play.
      doAutoPlay();
    }
  } else {
    // Kick off auto-play.
    doAutoPlay();
  }
}

function refreshGlobalStats() {
  // NOTE: In this function, only elements displayed in and above the
  //       navigation bar should be examined. Everything in the inner page
  //       (what is displayed below the navigation bar) should instead be
  //       examined via innerPageChanged().

  var cityElt = document.getElementById('mw_city_wrapper');
  if (!cityElt) return false;

  // Set all the element globals. They change.
  cashNYCElt = document.getElementById('user_cash_nyc');
  cashCubaElt = document.getElementById('user_cash_cuba');
  cashMoscowElt = document.getElementById('user_cash_moscow');
  healthElt = document.getElementById('user_health');
  maxHealthElt = document.getElementById('user_max_health');
  energyElt = document.getElementById('user_energy');
  maxEnergyElt = document.getElementById('user_max_energy');
  staminaElt = document.getElementById('user_stamina');
  maxStaminaElt = document.getElementById('user_max_stamina');
  influenceElt = document.getElementById('user_influence');
  maxInfluenceElt = document.getElementById('user_max_influence');
  levelElt = document.getElementById('user_level');
  curExpElt = document.getElementById('user_experience');
  lvlExpElt = document.getElementById('exp_for_next_level');

  // Update basic player information.
  switch(cityElt.className){
    case 'mw_city1':
     city = NY;
     cities[NY][CITY_CASH] = parseCash(cashNYCElt.innerHTML);
     break;
  case 'mw_city2':
     city = CUBA;
     cities[CUBA][CITY_CASH] = parseCash(cashCubaElt.innerHTML);
     break;
  case 'mw_city3':
     city = MOSCOW;
     cities[MOSCOW][CITY_CASH] = parseCash(cashMoscowElt.innerHTML);
     break;
  }

  health = parseInt(healthElt.innerHTML);
  maxHealth = parseInt(maxHealthElt.innerHTML);
  energy = parseInt(energyElt.firstChild.nodeValue);
  maxEnergy = parseInt(maxEnergyElt.innerHTML);
  stamina = parseInt(staminaElt.firstChild.nodeValue);
  maxStamina = parseInt(maxStaminaElt.innerHTML);
  if (maxInfluenceElt) {
    influence = parseInt(influenceElt.firstChild.nodeValue);
    maxInfluence = parseInt(maxInfluenceElt.innerHTML);
  }

  // Remove this when influence stat is released to public
  if (isNaN(influence))
    influence = 0;
  if (isNaN(maxInfluence))
    maxInfluence = 0;

  level = parseInt(levelElt.innerHTML);
  curExp = parseInt(curExpElt.innerHTML);
  lvlExp = parseInt(lvlExpElt.innerHTML);
  ptsToNextLevel = lvlExp - curExp;

  // Get the mafia size and pending invites.
  // NOTE: Using contains() for compatibility with "Exp Remaining" script.
  var mafiaLinks = xpath('//div[contains(@class, "mafia_link")]//a');
  mafia = mafiaLinks.snapshotItem(1);
  mafia = document.getElementById('user_group_size');
  if (mafia) {
    mafia = parseInt(mafia.innerHTML.untag());
  }
  if (!mafia || mafia < 1) {
    addToLog('warning Icon', 'BUG DETECTED: Unable to read mafia size.');
  }
  invites = mafiaLinks.snapshotItem(2);
  if (invites && invites.innerHTML.untag().match(/\+(\d+)/)) {
    invites = parseInt(RegExp.$1);
  } else {
    invites = 0;
  }

  // Get the skill points waiting to be spent.
  var skillElt = document.getElementById('user_skill');
  if (skillElt) {
    stats = parseInt(skillElt.innerHTML);
    if (isNaN(stats)) {
      stats = 0;
    }
  } else {
    stats = 0;
  }

  // Update current level so the next if will work
  if (isUndefined('currentLevel')) {
    GM_setValue('currentLevel', level);
    GM_setValue('restAutoStat', 0);
  }

  // Show congratulations if level has increased.
  if (running && level > GM_getValue('currentLevel')) {
    GM_setValue('currentLevel', level);
    addToLog('experience Icon', '<span style="color:#00FFCC;"> Congratulations on reaching level <strong>' + level + '</strong>!</span>');
    GM_setValue('restAutoStat', 0);
  }

  // Trick auto-buy into checking the property page if mafia has grown.
  if (running && mafia && mafia != GM_getValue('currentMafia')) {
    GM_setValue('currentMafia', mafia);
    GM_setValue('buyCost', 1);
  }

  //ATK
  // Check if hourly stats need updating.
  if (isChecked('hourlyStatsOpt')) {
    var currentTime = new Date();
    if (GM_getValue('hourOfDay') != currentTime.getHours()) {
      updateHourlyStats();
    }
  }

  return true;
}

function refreshSettings() {
  // NOTE: In this function, only elements displayed in and above the
  //       navigation bar should be examined. Everything in the inner page
  //       (what is displayed below the navigation bar) should instead be
  //       examined via innerPageChanged().

  // Refresh spend ceiling, floor and burn condition
  var canLevel = ptsToNextLevel < stamina * getStaminaGainRate() + energy * getEnergyGainRate();
  SpendStamina.refreshLimits (maxStamina, canLevel);
  SpendEnergy.refreshLimits (maxEnergy, canLevel);

  // Log and toggle burning
  if (running) {
    if (isChecked(SpendStamina.spendFlag)) SpendStamina.toggleSpending(maxStamina, stamina);
    if (isChecked(SpendEnergy.spendFlag)) SpendEnergy.toggleSpending(maxEnergy, energy);
  }

  // Auto-pause reset
  if (GM_getValue('autoPauseActivated') === true &&
      isChecked('autoPauseBefore') &&
      GM_getValue('autoPauselvlExp') < lvlExp) {
    GM_setValue('autoPauselvlExp', lvlExp);
    GM_setValue('autoPauseActivated', false);
  }

  // Auto-pause logic
  if (running && isChecked('autoPause')) {
    if (isChecked('autoPauseBefore') &&
        GM_getValue('autoPauseExp', '') >= lvlExp - curExp &&
        GM_getValue('autoPauseActivated', false) === false) {
      addToLog('pause Icon', 'Auto-pause in effect. Experience threshold reached.');
      GM_setValue('autoPauseActivated', true);
      pause();
    } else if (isChecked('autoPauseAfter') &&
               GM_getValue('autoPauselvlExp', '') < lvlExp) {
      addToLog('pause Icon', 'Auto-pause in effect. Leveled up.');
      GM_setValue('autoPauselvlExp', lvlExp);
      pause();
    }
  }
}

function getStaminaGainRate() {
  var expGained    = GM_getValue('totalExpInt', 0);
  var staminaSpent = GM_getValue('fightWinCountInt', 0) +
                     GM_getValue('fightLossCountInt', 0) +
                     GM_getValue('hitmanWinCountInt',0) +
                     GM_getValue('hitmanLossCountInt',0);
  if (!expGained || !staminaSpent) return 0;

  return expGained / staminaSpent;
}

function getEnergyGainRate() {
  var rate = parseFloat(GM_getValue('estimateJobRatio', '1.0'));
  return rate? rate : 0;
}

function checkLanguage() {
  GM_setValue('language', document.documentElement.lang);
  return;
}

function customizeLayout() {
  var mainFrame = xpathFirst('//div[@id="mainDiv"]');
  if (!mainFrame) return;

  mainFrame.setAttribute('style', 'overflow: auto; width: 100%; height: 100%; position: absolute;', 0);
  var mainCont = xpathFirst('//div[@id="mw_city_wrapper"]');

  // Left align.
  if (isChecked('leftAlign')) {
    if (mainCont) {
      mainCont.setAttribute("style", "margin:0; float: left", 0);
    }
  }

  // Deal with ads.
  if (isChecked('hideAds')) {
    var adsTop = xpathFirst('//iframe[contains(@src, "zbar")]');
    if (adsTop) {
      adsTop.setAttribute("style", "margin:0; height:0; display:none", 0);
    }
    var freeGifts = xpathFirst('//div/a/img[@alt="Free Holiday Gifts!"]');;
    if (freeGifts) {
      freeGifts.setAttribute("style", "margin:0; height:0; display:none", 0);
    }
  }

  if (isChecked('hideGifts')) {
    // Deal with safe houses
    var safeHouse = xpathFirst('.//a/img[@alt="Gift Safe House"]');
    if (safeHouse) safeHouse.setAttribute("style", "margin:0; height:0; display:none", 0);

    // Deal with free gifts
    var msgs = $x('.//td[@class="message_body"]');
    for (var i = 0, iLength=msgs.length; i < iLength; ++i) {
      if (msgs[i].innerHTML.match(/You have gifts available to send./)) {
        msgs[i].setAttribute("style", "margin:0; height:0; display:none", 0);
        break;
      }
    }
  }

  // Deal with the email bar.
  if (isChecked('moveEmailBar')) {
    var emailBar = xpathFirst('//table[@class="fb_email_prof_header"]');
    if (emailBar && mainCont)
      mainCont.appendChild(emailBar);
  }

  // Handle Unknown error
  var unkError = xpathFirst('//div[@id="error_dialog" and contains(.,"Unknown Error")]');
  if (unkError) {
    DEBUG('Unknown error encountered, reloading...');
    window.location.reload();
  }
}

function customizeMasthead() {
  // Document title
  document.title = "Mafia Wars on Facebook";
  if (isChecked('fbwindowtitle')) {
    if (GM_getValue('FBName'))
      document.title = GM_getValue('FBName');
  }

  if (document.getElementById('ap_menu')) return;

  // Get the masthead.
  var mastheadElt = document.getElementById('mw_masthead');
  if (!mastheadElt) return;

  // Set custom styles with CSS.
  if (!document.getElementById('nodeInsertedCss')) {
    makeElement('style', document.getElementsByTagName('head')[0], {'id':'nodeInsertedCss', 'type':'text/css'}).appendChild(document.createTextNode(
      '#ap_menu span:hover{text-decoration:underline}'+
      '#ap_menu span{font-size: 12px; font-weight: bold; cursor: pointer; color: #FFD927}' +
      '.ap_optgroup1 {background-color: #FFFF77; text-align: center; color: #000000; font-weight: bold; font-size: 11px}' +
      '.ap_optgroup2 {background-color: #996633; text-align: center; color: #FFFFFF; font-size: 10px}' +
      '.ap_option    {font-size: 10px; cursor: default;}' +
      '.ap_option:hover {background-color:#660000;}'
    ));
  }

  // Make the SMS Mobile link go away
  var smsElt = xpathFirst('//div[@class="mw_sms"]', innerPageElt);
  if (smsElt) {
  smsElt.setAttribute("style", "margin:0; height:0; display:none", 0);
  }

  // Make a container for the autoplayer menu.
  var mwapTitle = 'MWAP ' + SCRIPT.version + ' (Build ' + SCRIPT.build + ')';
  makeElement('div', mastheadElt, {'style':'position: absolute; top: 24px; right: 17px; text-align: left; font-size: 11px; font-weight: bold; color: #FFFFFF'}).appendChild(document.createTextNode(mwapTitle));
  var menuElt = makeElement('div', mastheadElt, {'id':'ap_menu', 'style':'position: absolute; top: 38px; right: 17px; text-align: left;'});

  // Settings Link
  menuElt.appendChild(document.createTextNode(' | '));
  var lobjAutoPlay = makeElement('span', menuElt, {'id':'autoPlay'});
  lobjAutoPlay.appendChild(document.createTextNode('Settings'));
  lobjAutoPlay.addEventListener('click', toggleSettings, false);

  // View log button.
  menuElt.appendChild(document.createTextNode(' | '));
  var lobjViewLogButton = makeElement('span', menuElt);
  lobjViewLogButton.appendChild(document.createTextNode('Log'));
  lobjViewLogButton.addEventListener('click', showMafiaLogBox, false);

  // Show resume or paused based on if we are running or not.
  updateMastheadMenu();
}

function customizeStats() {
  // Don't watch the stats area while we're making changes to it.
  setListenStats(false);

  // Make health icon clickable for instant healing.
  var healLinkElt = document.getElementById('ap_heal');
  var healImgElt = xpathFirst('//img[@alt="Health"]');
  if (healImgElt && !healLinkElt) {
    healLinkElt = makeElement('a', null, {'id':'ap_heal', 'title':'Click to heal immediately.'})
    healImgElt.parentNode.insertBefore(healLinkElt, healImgElt);
    healLinkElt.appendChild(healImgElt);
  }

  if (healLinkElt) {
    healLinkElt.href = 'http://apps.facebook.com/' + SCRIPT.name +
                       SCRIPT.controller + 'hospital' +
                       SCRIPT.action + 'heal' +
                       SCRIPT.city + (city + 1);

    // Substitute the "hide" icon if currently hiding in the hospital.
    var hideImgElt = healLinkElt.childNodes[1];
    if (running && healImgElt && health < 20 &&
        isChecked('hideInHospital')) {
      healImgElt.style.display = 'none';
      if (!hideImgElt) {
        hideImgElt = makeElement('img', healLinkElt, {'class':'icon', 'width':'16', 'height':'16', 'title':'Currently hiding in the hospital. Click to heal immediately.', 'src':stripURI(hideIcon)});
      }
      hideImgElt.style.display = '';
    } else if (hideImgElt) {
      hideImgElt.style.display = 'none';
      healImgElt.style.display = '';
    }

    // Substitute AJAX navigation if code is available.
    var hospitalElt = xpathFirst('//a[@class="heal_link"]');
    if (hospitalElt) {
      healLinkElt.setAttribute("onclick", hospitalElt.getAttribute("onclick").replace(/view/, 'heal'));
      if (!running) {
        // Make instant heal work without switching pages.
        healLinkElt.setAttribute("onclick", healLinkElt.getAttribute("onclick").replace(/'inner_page'/, "'" + SCRIPT.ajaxPage + "'"));
      }
    }
  }

  // Show points until next level.
  var elt = xpathFirst('//span[@class="stat_title" and contains(text(), "Experience")]');
  if (elt) {
    elt.innerHTML = 'Experience (' + (ptsToNextLevel > 0? '-' : '+') +
                    Math.abs(ptsToNextLevel) + ')';
  }

  // Blink maxed out energy or stamina.
  energyElt.style.textDecoration = (energy == maxEnergy)? 'blink' : 'none';
  staminaElt.style.textDecoration = (stamina == maxStamina)? 'blink' : 'none';

  // Blink dangerous health levels.
  healthElt.style.textDecoration = (health > 19 && health < 29)? 'blink' : 'none';

  // Once health is below 20, set the timer (this is for the conditional healing logic)
  if (health < 20 && GM_getValue('healWaitStarted') != true) {
    setGMTime('healWaitTime', '05:00');
    GM_setValue('healWaitStarted', true);
  }

  setListenStats(true);
}

function customizeNames() {
  var elts = $x('.//a[contains(@onclick, "user=")]', innerPageElt);
  for (var i = 0, iLength=elts.length; i < iLength; ++i) {
    var elt = elts[i];
    if (!elt.innerHTML.replace(/\xAD/g, '').trim()) {
      if (elt.getAttribute('onclick').match(/user=(\d+)/)) {
        elt.innerHTML = chickenIcon + ' Chicken ' + RegExp.$1;
      } else {
        elt.innerHTML = chickenIcon + ' Chicken';
      }
    }
  }

  var elts = $x('.//span[contains(@id, "_fight_view_name_")]', innerPageElt);
  for (var i = 0, iLength=elts.length; i < iLength; ++i) {
    var elt = elts[i];
    if (!elt.innerHTML.untag().trim()) {
      elt.innerHTML = chickenIcon + ' Chicken';
    }
  }
}

function customizeHome() {
  if (!onHome()) return false;

  // Set xJob
  xJob = '';

  // Is an energy pack waiting to be used?
  energyPackElt = xpathFirst('.//a/span[(@class="sexy_pack_use" or @class="sexy_energy2_use") and contains(text(), "Use energy pack")]', innerPageElt);
  energyPack = energyPackElt? true : false;

  // Display a message next to the energy pack button.
  if (energyPackElt) {
    var energyGainRate = getEnergyGainRate();
    var ptsFromEnergyPack = maxEnergy * 1.25 * energyGainRate;
    var ptsNeeded = ptsToNextLevel - energy * energyGainRate -
                    stamina * getStaminaGainRate();
    var txt = ' XP from Energy Pack = ' + parseInt(ptsFromEnergyPack) +
              ', Projected XP needed = ' + parseInt(ptsNeeded);
    var linkElt = energyPackElt.parentNode;
    linkElt.parentNode.appendChild(document.createElement('br'));
    linkElt.parentNode.appendChild(document.createTextNode(txt));
  }

  // Fetch Player Stats
  getPlayerStats();

  return true;
}

function getPlayerStats() {
  var statElt = $x('.//*[@class="profile_stat_number"]', innerPageElt);

  // Fetch defense and attack values from old home format
  if (!(statElt == null)) {
    if (!(statElt[0] == null))
      curAttack  = parseInt(statElt[0].innerHTML);
    if (!(statElt[1] == null))
      curDefense = parseInt(statElt[1].innerHTML);
  }

  // Some players would have the beta homepage (flash updates)
  // Try retrieving Attack/Defense details from mw_* tags in javascript
  if (isNaN (curDefense) || isNaN(curAttack)) {
    var pJavaScripts = xpath("//script[@type='text/javascript']");
    var tempStat;

    for (var i=0, iLength=pJavaScripts.snapshotLength; i < iLength; ++i ) {
      tempStat = pJavaScripts.snapshotItem(i).innerHTML.match(/"mw_attack", "([0-9]+)/);
      if (tempStat) {
        curAttack = tempStat[1];
      }
      tempStat = pJavaScripts.snapshotItem(i).innerHTML.match(/"mw_defense", "([0-9]+)/);
      if (tempStat) {
        curDefense = tempStat[1];
        return true;
      }
    }
  }

  return true;
}

function customizeProfile() {
  // Make sure we're on a profile.
  var statsTable = xpathFirst('.//td[@class="stats_left"]', innerPageElt);
  if (!statsTable) return false;

  var statsDiv = xpathFirst('.//a[contains(., "Sucker Punch")]/..', innerPageElt);
  if (statsDiv) {
    // On another player's profile page. Add extra options.
    var tabElt = xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(text(), "Profile")]', innerPageElt);
    if (tabElt && tabElt.getAttribute('onclick').match(/user=(\d+)/)) {
      id = RegExp.$1;

      // See if this player is in our mafia.
      var removeElt = xpathFirst('.//a[contains(., "Remove from Mafia")]', statsDiv);

      // Facebook profile
      //makeElement('br', statsDiv);
      makeElement('a', statsDiv, {'href':'http://www.facebook.com/profile.php?id=' + id}).appendChild(document.createTextNode('Facebook Profile'));
      statsDiv.appendChild(document.createTextNode(' | '));

      // Add as Facebook friend
      makeElement('a', statsDiv, {'href':'http://www.facebook.com/addfriend.php?id=' + id}).appendChild(document.createTextNode('Add as Friend'));

      if (!removeElt) {
        // Not currently in mafia. Show option to add.
        statsDiv.appendChild(document.createTextNode(' | '));
        makeElement('a', statsDiv, {'href':'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'war' + SCRIPT.action + 'add' + SCRIPT.city + (city + 1) + '&friend_id=' + id}).appendChild(document.createTextNode('Add to Mafia'));
      }

      // Promote
      statsDiv.appendChild(document.createTextNode(' | '));
      makeElement('a', statsDiv, {'href':'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'group' + SCRIPT.action + 'view' + SCRIPT.city + (city + 1) + '&promote=yes&uid=' + id}).appendChild(document.createTextNode('Promote'));

      if (removeElt) {
        // In my mafia. Show options to add/remove from war list.
        statsDiv.appendChild(document.createTextNode(' | '));
        var el = makeElement('a', statsDiv, {'id':id});
        var warList = getSavedList('autoWarTargetList');
        if (warList.indexOf(id) != -1) {
          el.appendChild(document.createTextNode('Remove from War List'));
          el.addEventListener('click', clickWarListRemove, false);
        } else {
          el.appendChild(document.createTextNode('Add to War List'));
          el.addEventListener('click', clickWarListAdd, false);
        }
      }

      if (!removeElt) {
        // Not in mafia. Show options to add/remove from fight lists.
        statsDiv.appendChild(document.createTextNode(' | '));
        var el = makeElement('a', statsDiv, {'id':id});
        var fightList = getSavedList('fightList');
        if (fightList.indexOf(id) != -1) {
          el.appendChild(document.createTextNode('Remove from Fight List'));
          el.addEventListener('click', clickFightListRemove, false);
        } else {
          el.appendChild(document.createTextNode('Add to Fight List'));
          el.addEventListener('click', clickFightListAdd, false);
        }
      }
    }
  } else {
    // On our own profile page.
    profileFix();
  }

  return true;
}

function customizeJobs() {
  // Extras for jobs pages.
  var jobTable = xpathFirst('.//table[@class="job_list"]', innerPageElt);
  if (!jobTable) return false;

  var availableJobs = eval(GM_getValue("availableJobs", "({0:{},1:{},2:{}})"));
  var masteredJobs = eval(GM_getValue("masteredJobs", "({0:{},1:{},2:{}})"));
  var currentTab = currentJobTab();
  availableJobs[city][currentTab] = [];
  masteredJobs[city][currentTab] = [];

  // Display an experience to energy payoff ratio for each job.
  var bestJobs = [], worstJobs = [];
  var bestRatio = 0, worstRatio = 10;
  var reselectJob = false;
  var jobInfo = xpath('.//td[@class="job_name"]', innerPageElt);
  var energies = xpath('.//td[@class="job_energy"]/span[@class="bold_number"]', innerPageElt);
  var rewards = xpath('.//td[@class="job_reward"]/span[@class="bold_number"]', innerPageElt);
  var monies = xpath('.//td[@class="job_reward"]/span[@class="money"]/strong', innerPageElt);
  var requiredItems = xpath('.//td[@class="job_required_items"]', innerPageElt);
  var jobButton = xpath('.//td[@class="job_action"]', innerPageElt);
  var masteryLevel;
  var masteredJobsCount = 0;
  for (var i = 0, iLength = energies.snapshotLength; i < iLength; ++i) {
    // Determine available jobs
    if (isChecked('multipleJobs') &&
        GM_getValue('isRunning') === true) {
      var jobName = jobInfo.snapshotItem(i).innerHTML.split('<br>')[0].trim().replace(/<[/]*fb:intl>/gi, '');
      var jobMatch = missions.searchArray(jobName, 0)[0];

      if (jobMatch != undefined) {
        // FIXME: Try to buy the required items if the item is store bought.
        //        If job loot, should we add the job that drops it on selectMissionMultiple?

        // Ignore mastered jobs
        if (jobInfo.snapshotItem(i).innerHTML.match(/Level\s+(\d+)\s+Mastered/i)) {
          if (missions[jobMatch][9] == true) {
            masteredJobs[city][currentTab].push(jobMatch);
            DEBUG('The job ' + missions[jobMatch][0] + ' is already mastered (Level ' + masteryLevel + '). Adding to ignore list.');
          }
          masteryLevel = parseInt(RegExp.$1);
          if (masteryLevel == 3) masteredJobsCount++
        }

        // Ignore locked jobs
        if (jobButton.snapshotItem(i).innerHTML.indexOf('sexy_button_locked') == -1) {
          availableJobs[city][currentTab].push(jobMatch);
        } else {
          DEBUG('Job ' + missions[jobMatch][0] + '(' + jobMatch + ') is not available yet. Skipping.');
        }
      }
    }

    var elt = energies.snapshotItem(i);
    var cost = parseInt(elt.firstChild.nodeValue);
    var reward = parseInt(rewards.snapshotItem(i).firstChild.nodeValue);
    var ratio = Math.round(reward / cost * 100) / 100;

    makeElement('br', elt.parentNode);
    makeElement('span', elt.parentNode, {'style':'color:#666666; font-size: 10px'}).appendChild(document.createTextNode('Pays ' + ratio + 'x'));

    if (monies.snapshotItem(i)) {
      var currency = cities[city][CITY_CASH_SYMBOL];
      var money = parseCash(monies.snapshotItem(i).firstChild.nodeValue);
      var mratio = makeCommaValue(Math.round(money / cost));

      makeElement('span', monies.snapshotItem(i).parentNode, {'style':'color:#666666; font-size: 10px'}).appendChild(document.createTextNode(' (' + currency + mratio + ')'));
    }

    // Keep track of the best & worst payoffs.
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestJobs = [elt];
    } else if (ratio == bestRatio) {
      bestJobs.push(elt);
    }
    if (ratio < worstRatio) {
      worstRatio = ratio;
      worstJobs = [elt];
    } else if (ratio == worstRatio) {
      worstJobs.push(elt);
    }

    // Calculate time left for each job and display under the do job button
    var timePerEnergy = isChecked('isManiac') ? 3 : 5;
    timePerEnergy = isChecked('hasHelicopter') ? timePerEnergy - .5: timePerEnergy;
    timePerEnergy = isChecked('hasGoldenThrone') ? timePerEnergy/2: timePerEnergy;
    if (cost > energy) {
      jobTimeLeft = (cost - energy) * timePerEnergy;
      if (jobTimeLeft < 60)
        jobTimeLeftText = 'Time: < ' + (Math.round((jobTimeLeft) * 10) / 10) + ' min';
      else {
        jobTimeLeft = Math.round((jobTimeLeft/60) * 100) / 100;
        if (jobTimeLeft < 24)
          jobTimeLeftText = 'Time: < ' + jobTimeLeft + ' hr';
        else
          jobTimeLeftText = 'Time: < ' + Math.round(jobTimeLeft/24) + ' days';
      }
    } else {
      jobTimeLeftText = 'Time: 0 min';
    }
    makeElement('br', jobButton.snapshotItem(i));
    makeElement('span', jobButton.snapshotItem(i), {'style':'color:#666666; font-size: 10px'}).appendChild(document.createTextNode(jobTimeLeftText));
  }

  // Highlight the best and worst jobs.
  if (worstRatio != bestRatio) {
    while (bestJobs.length) {
      elt = bestJobs.pop().parentNode;
      makeElement('br', elt);
      elt = makeElement('span', elt, {'style':'color:#52E259; font-size: 10px'});
      makeElement('img', elt, {'src':stripURI(goodIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      elt.appendChild(document.createTextNode(' BEST'));
    }
    while (worstJobs.length) {
      elt = worstJobs.pop().parentNode;
      makeElement('br', elt);
      elt = makeElement('span', elt, {'style':'color:#EC2D2D; font-size: 10px'});
      makeElement('img', elt, {'src':stripURI(badIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      elt.appendChild(document.createTextNode(' WORST'));
    }
  }

  // Show the experience to energy ratio needed to level up.
  elt = makeElement('div', null, {'id':'level_up_ratio', 'style':'text-align:center; display:none'});
  makeElement('img', elt, {'src':stripURI(infoIcon), 'style':'vertical-align:middle'});
  elt.appendChild(document.createTextNode(''));
  jobTable.parentNode.insertBefore(elt, jobTable);

  setLevelUpRatio();
  if(reselectJob) canMission();
  GM_setValue("availableJobs", availableJobs.toSource());
  GM_setValue("masteredJobs", masteredJobs.toSource());

  if (isChecked('multipleJobs') &&
      GM_getValue('isRunning') === true &&
      GM_getValue('selectTier') != '0.0') {
    selectedTierValue = GM_getValue('selectTier').split('.');
    masteryCity = parseInt(selectedTierValue[0]);
    masteryTier = parseInt(selectedTierValue[1]);
    if (city == masteryCity &&
        masteryTier == currentTab &&
        jobInfo.snapshotLength <= masteredJobsCount) {
      selectTier = cities[masteryCity][0] + ' - ' + missionTabs[masteryCity][masteryTier - 1];
      addToLog('info Icon', 'Tier ' + selectTier + ' is already mastered. Moving on to the next tier.');

      // Move on the the next tier.
      if (missionTabs[masteryCity].length == masteryTier) {
        // We have mastered all tiers. Disable tier mastery logic.
        if (cities.length == (masteryCity + 1)) {
          GM_setValue('selectTier', '0.0');
        // Next City
        } else {
          masteryCity++;
          masteryTier = 1;
        }
      // Next Tier
      } else {
        masteryTier++;
      }

      if (GM_getValue('selectTier') != '0.0') {
        var mastery_jobs_list = [];
        for (var i = 0, iLength = missions.length; i < iLength; i++) {
          if (masteryCity == missions[i][4] &&
              masteryTier == missions[i][3]) {
            mastery_jobs_list.push(i);
          }
        }
        setSavedList('masteryJobsList', mastery_jobs_list);
        GM_setValue('selectTier', masteryCity + '.' + masteryTier);
      }
    }
  }

  return true;
}

function customizeFight() {
  var opponents = getDisplayedOpponents(innerPageElt, true);
  if (!opponents) return false;

  // Customize the opponent list.
  var blacklist = getSavedList('fightListAvoid');
  for (var i = 0, iLength=opponents.length; i < iLength; ++i) {
    var opponent = opponents[i];
    if (!opponent.profile || !opponent.id) continue;

    // Mark targets that should be avoided.
    if (blacklist.indexOf(opponent.id) != -1) {
      var parentElt = opponent.profile.parentNode;
      var elt = makeElement('img', null, {'src':stripURI(badIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already lost to this opponent during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }
  }
}

function customizeHitlist() {
  // Extras for hitlist.
  if (!onHitlistTab()) return false;

  // Get the displayed opponents.
  var opponents = getHitlist(innerPageElt, true);
  if (!opponents) return true;

  // Customize the opponent list.
  var blacklist = getSavedList('hitmanListAvoid').concat(getSavedList('fightListAvoid'));
  var kills = getSavedList('hitmanListKilled');
  for (var i = 0, iLength=opponents.length; i < iLength; ++i) {
    var opponent = opponents[i];
    if (!opponent.profile) continue;

    // Mark targets that should be avoided.
    if (blacklist.indexOf(opponent.id) != -1) {
      var parentElt = opponent.profile.parentNode;
      var elt = makeElement('img', null, {'src':stripURI(badIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already lost to this opponent during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }

    // Mark targets on which bounties have already been collected.
    if (kills.indexOf(opponent.id) != -1) {
      var parentElt = opponent.profile.parentNode;
      var elt = makeElement('img', null, {'src':stripURI(lootbagIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle', 'title':'You have already collected a bounty on this target during automatic play.'});
      parentElt.insertBefore(elt, parentElt.firstChild);
    }
  }

  return true;
}

function filterNotifications(elt) {
  var handleCheck = GM_getValue('notificationHandle', 1);
  if (!handleCheck) return;

  // Get all beeps (pop-ups about notifications).
  var beeps = xpath('.//div[@class="UIBeep_Title"]', elt);
  for (var i = 0, iLength=beeps.snapshotLength; i < iLength; i++) {
    var beepElt = beeps.snapshotItem(i);
    if (beepElt && beepElt.innerHTML.indexOf('You sent a notification')) {
      // A notification was sent.
      var undoElt = xpathFirst('.//a[@class="undo_link"]', beepElt);
      if (!undoElt) continue;

      // Cancel certain types of notifications.
      if (beepElt.innerHTML.match(/fought you/i)) {
          clickElement(undoElt);
          addToLog('info Icon', 'Canceled attack notification.');
      } else if (handleCheck == 2) {
          //FIXME: Should make sure it is a Mafia Wars notification.
          clickElement(undoElt);
          addToLog('info Icon', 'Canceled notification.');
      }
    }
  }
}

function setLevelUpRatio() {
  var elt = document.getElementById('level_up_ratio');
  if (elt) {
    if (energy) {
      var ratio = Math.round((lvlExp - curExp) / energy * 100) / 100;
      elt.childNodes[1].nodeValue = ' A ' + (ratio > 10? '>10' : ratio) + 'x pay ratio would be needed to level up on energy alone.';
      elt.style.display = 'block';
    } else {
      elt.style.display = 'none';
    }
  }
}

// Callback for clicking 'Add to Fight List' on profile page.
function clickFightListAdd() {
  addSavedListItem('fightList', this.id);
  this.firstChild.nodeValue = 'Remove from Fight List';
  this.removeEventListener('click', clickFightListAdd, false);
  this.addEventListener('click', clickFightListRemove, false);
  var el = document.getElementById('fightList');
  if (el) {
    el.value = GM_getValue('fightList', '');
  }
}

// Callback for clicking 'Remove from Fight List' on profile page.
function clickFightListRemove() {
  while(removeSavedListItem('fightList', this.id));
  this.firstChild.nodeValue = 'Add to Fight List';
  this.removeEventListener('click', clickFightListRemove, false);
  this.addEventListener('click', clickFightListAdd, false);
  var el = document.getElementById('fightList');
  if (el) {
    el.value = GM_getValue('fightList', '');
  }
}

// Callback for clicking 'Add to War List' on profile page.
function clickWarListAdd() {
  addSavedListItem('autoWarTargetList', this.id);
  this.firstChild.nodeValue = 'Remove from War List';
  this.removeEventListener('click', clickWarListAdd, false);
  this.addEventListener('click', clickWarListRemove, false);
  var el = document.getElementById('autoWarTargetList');
  if (el) {
    el.value = GM_getValue('autoWarTargetList', '');
  }
}

// Callback for clicking 'Remove from War List' on profile page.
function clickWarListRemove() {
  while(removeSavedListItem('autoWarTargetList', this.id));
  this.firstChild.nodeValue = 'Add to War List';
  this.removeEventListener('click', clickWarListRemove, false);
  this.addEventListener('click', clickWarListAdd, false);
  var el = document.getElementById('autoWarTargetList');
  if (el) {
    el.value = GM_getValue('autoWarTargetList', '');
  }
}

function getJobRow(jobName, contextNode) {
  //FIXME: look up job in job table, and get the jobnumber, then search for the row  by job number
  var rowElt;
  try {
    if (jobName.indexOf('"') != -1 && jobName.indexOf("'") != -1){
      var quoteString= jobName;
      var longQuote='';
      while (quoteString.indexOf('"') != -1) {
        quoteString.match(/(.*?)\"(.*)/);
        if (RegExp.$1.length > longQuote.length){
          longQuote=RegExp.$1;
        }
        if (quoteString.indexOf('"') != -1 && RegExp.$2.length > longQuote.Length) {
          longQuote=RegExp.$2;
        }
        quoteString=RegExp.$2
      }

      quoteString= jobName;
      while (quoteString.indexOf("'") != -1) {
        quoteString.match(/(.*?)\'(.*)/);
        if (RegExp.$1.length > longQuote.length){
          longQuote=RegExp.$1;
        }
        if (quoteString.indexOf("'") != -1 && RegExp.$2.length > longQuote.Length) {
          longQuote=RegExp.$2;
        }
        quoteString=RegExp.$2
      }
      jobName=longQuote;
      DEBUG('Finding Job Row for String:'+jobName+'.');
    }

    var xQuote = (jobName.indexOf('"') != -1) ?  '\'' : '"';
    rowElt = xpathFirst('.//tr[contains(., ' + xQuote + jobName + xQuote + ') and contains(., "Do Job")]', contextNode);
    if (!rowElt) {
        rowElt = xpathFirst('.//tr[contains(., ' + xQuote + jobName + xQuote + ') and contains(., "Pick Vory")]', contextNode);
      }
    if (!rowElt) {
        rowElt = xpathFirst('.//tr[contains(., ' + xQuote + jobName + xQuote + ') and contains(., "Pick Mafiya")]', contextNode);
      }
    if (!rowElt) {
      addToLog('warning Icon', 'Unable to find job row for ' + jobName + '.');
    }
  } catch(ex) {
      addToLog('warning Icon', ex);
  }
  return rowElt;
}

function buyJobRowItems(element){
  var currentJob = missions[GM_getValue('selectMission', 1)][0];
  var currentJobRow = getJobRow(currentJob, element);
  if (!currentJobRow) return false;

  buyItemElts = xpath('.//a[contains(@onclick, "xw_action=buy_item")]',currentJobRow);
  if (buyItemElts.snapshotLength>0){
    addToLog('search Icon', 'Attempting to purchase required items.');
    for (var currentItem = 0, numItems=buyItemElts.snapshotLength; currentItem < numItems; ++currentItem) {
      Autoplay.fx = function() {
        clickAction = 'buy item';
        clickElement(buyItemElts.snapshotItem(currentItem));
        DEBUG('Clicked to buy item.');
      }
      break;
    }
    return true;
  }
  return false;
}

function setJobReqs (element) {
  // If we are here then we have already failed the job.
  addToLog('process Icon', 'Getting job requirements.');

  // Find the job row.
  var currentJob = missions[GM_getValue('selectMission', 1)][0];
  var currentJobRow = getJobRow(currentJob, element);
  if (!currentJobRow) return;

  var items = getSavedList('itemList');
  var jobs = getSavedList('jobsToDo', '');
  var necessaryItems = $x('.//div[@class="req_item need_item"]//img', currentJobRow);
  // Save the current job for later. The current job should not already
  // exist in the list, so check first.
  if (jobs.indexOf(currentJob) == -1) {
    jobs.push(currentJob);
    DEBUG('Saving ' + currentJob + ' for later.');
    setSavedList('jobsToDo', jobs);
  } else {
    DEBUG(currentJob + ' is already in the jobs to-do list.');
  }

  // Figure out which loot items are needed before this job can be attempted
  // again and, consequently, which jobs will have to be done to get them.
  if (necessaryItems.length > 0) {
    necessaryItems.forEach(
      function(i){
        DEBUG('Missing : ' +i.alt);
        requirementJob.forEach(
          function(j){
            if (j[0] == i.alt && j[1] != xJob) {
              jobs.push(j[1]);
              items.push(i.alt);
            }
          }
        );
      }
    );
    setSavedList('itemList', items.unique());
    setSavedList('jobsToDo', jobs);
  } else { addToLog('warning Icon', 'BUG DETECTED: Broken item detection.'); }
}

function popJob(){
  var jobs = getSavedList('jobsToDo', '');
  // Set the very next job to perform.
  var doJob = jobs.pop();
  setSavedList('jobsToDo', jobs);
  var i = 0;
  DEBUG('Will do job ' + doJob + ' next.');
  missions.forEach(
    function(f) {
      if (f[0] == doJob) {
        GM_setValue('selectMission', i);
        addToLog('process Icon', 'Switching job to ' + doJob + '.');
      }
      i++;
    }
  );
}

function jobProgress(element) {
  if (isChecked('multipleJobs')) {
    // Cycle jobs with the same ratio
    var availableJobs = eval(GM_getValue("availableJobs", "({0:{},1:{},2:{}})"));
    var multiple_jobs_list = getSavedList('selectMissionMultiple');
    var cycle_jobs = new Object();

    // Group selected jobs by ratio
    for (var i=0, iLength=multiple_jobs_list.length; i < iLength; ++i) {
      var job = multiple_jobs_list[i];
      var mission = missions[job];

      // Put non-available jobs at the end of the queue
      if (availableJobs[mission[4]][mission[3]] != null &&
          availableJobs[mission[4]][mission[3]].indexOf(parseInt(job)) == -1) {
        mission[7] = 0;
      }

      if (cycle_jobs[mission[7]] == null) {
        cycle_jobs[mission[7]] = [];
      }
      cycle_jobs[mission[7]].push(multiple_jobs_list[i]);
    }

    // Rebuild the job list array
    multiple_jobs_list = [];
    for (var i in cycle_jobs) {
      if (cycle_jobs[i].length > 1) {
        // Only cycle the current job's ratio group
        if (missions[GM_getValue('selectMission', 1)][7] == i) {
          cycle_jobs[i].push(cycle_jobs[i].shift());
        }
        for (var n = 0, nLength=cycle_jobs[i].length; n < nLength; ++n) {
          multiple_jobs_list.push(cycle_jobs[i][n]);
        }
      } else {
        multiple_jobs_list.push(cycle_jobs[i][0]);
      }
    }
    setSavedList('selectMissionMultiple', multiple_jobs_list);

    DEBUG('Exiting jobProgress function; multipleJobs is checked.');
    return;
  }

  if (isChecked('repeatJob')) {
    DEBUG('Exiting jobProgress function; repeatJob is checked.');
    return;
  }

  var selectMission = parseInt(GM_getValue('selectMission', 1));
  var currentJob = missions[selectMission][0];
  var jobno      = missions[selectMission][2];
  var tabno      = missions[selectMission][3];
  var cityno     = missions[selectMission][4];
  DEBUG('Calculating progress for ' + currentJob + '.');
  var currentJobRow = getJobRow(currentJob, element);

  // Calculate tier mastery.
  DEBUG("Checking mastery for each job.");
  var tierLevel;
  if (currentJobRow && currentJobRow.innerHTML.match(/level (\d+)/i)) {
    tierLevel = RegExp.$1
  }
  var tierJobs = $x('.//tr/td[@class="job_name"]', element);
  var tierPercent = 0;
  var jobCount = 0;
  tierJobs.forEach(
    function(f) {
      if (f.innerHTML.indexOf('Mastered') != -1) {
        tierPercent += 100;
        jobCount++;
      } else if (f.innerHTML.match(/Mastery\s+(\d+)%/i)) {
        tierPercent += parseInt(RegExp.$1);
        jobCount++;
      }
    }
  );
  if (tierJobs.length) {
    tierPercent = Math.floor(tierPercent / jobCount);
  }
  if (GM_getValue('tierCompleteStatus') != tierLevel + '|' + tierPercent) {
    GM_setValue('tierCompleteStatus', tierLevel + '|' + tierPercent);
    addToLog('info Icon', 'Job tier level ' + tierLevel + ' is ' +
             tierPercent + '% complete.');
  }

  // Calculate job mastery.  If we cant find the current job, then assume its mastered and disappeared in moscow
  DEBUG("Checking current job mastery.");
  var currentJobMastered;
  if (currentJobRow) currentJobMastered = currentJobRow.innerHTML.indexOf('Mastered');
  if (!currentJobMastered ||currentJobMastered > 0) {
    var jobList = getSavedList('jobsToDo');
    if (!jobList.length) {
      addToLog('info Icon', 'You have mastered <span class="job">' + currentJob + '</span>.');
      DEBUG('Checking job tier mastery.');
      if (tierPercent == 100) {
        // Find the first job of the next tier.
        // NOTE: This assumes that the missions array is sorted by city and
        //       then by tier.
        var nextTierJob;
        for (var i = selectMission + 1, iLength=missions.length; i < iLength; ++i) {
          if (missions[i][4] != cityno) {
            nextTierJob = i;
            addToLog('info Icon', 'You have mastered the final job tier in ' +
                     cities[cityno][CITY_NAME] + '! Moving to the next tier in ' +
                     cities[missions[nextTierJob][4]][CITY_NAME] + '.');
            break;
          }
          if (missions[i][3] != tabno) {
            nextTierJob = i;
            addToLog('info Icon', 'Current job tier is mastered. Moving to next tier in ' + cities[cityno][CITY_NAME] + '.');
            break;
          }
        }
        if (!nextTierJob) {
          addToLog('info Icon', 'You have mastered all jobs!');
        } else {
          GM_setValue('selectMission', nextTierJob);
          addToLog('info Icon', 'Job switched to <span class="job">' + missions[GM_getValue('selectMission', 1)][0] + '</span>.');
        }
      } else {
          // Find the first unmastered job of this next tier.
          var findMastery = function(v, i, a) { return (a[i].innerHTML.indexOf('Mastery') > 0)? 1:0; };
          var nonMasteredJobs = tierJobs.filter(findMastery);
          var jobName = nonMasteredJobs[0].innerHTML.split('<br>')[0].trim();

          // Handle pre-Bangkok job names
          if (nonMasteredJobs[0].innerHTML.match(/Asian Museum Break-in/))
            jobName = 'Asian Museum Break-in';
          if (nonMasteredJobs[0].innerHTML.match(/Smuggle Thai Gems/))
            jobName = 'Smuggle Thai Gems';
          if (nonMasteredJobs[0].innerHTML.match(/Repel the Yakuza/))
            jobName = 'Repel the Yakuza';

          var matches = missions.searchArray(jobName, 0);
          if (!matches) {
            addToLog('warning Icon', 'BUG DETECTED: ' + jobName +
                     ' not found in mission array.');
            return;
          }
          GM_setValue('selectMission', matches[0]);
          addToLog('info Icon', 'Job switched to <span class="job">' + missions[GM_getValue('selectMission', 1)][0] + '</span>.');
      }
    } else {
      DEBUG("There are jobs in the to-do list.");
    }
  } else {
    DEBUG("Job is not mastered. Checking percent of mastery.");
    var jobPercentComplete = currentJobRow.innerHTML.split('Mastery ')[1].split('%')[0];
    if (GM_getValue('jobCompleteStatus') != (currentJob + '|' + String(jobPercentComplete))) {
      GM_setValue('jobCompleteStatus', (currentJob + '|' + String(jobPercentComplete)));
      addToLog('info Icon', '<span class="job">' + currentJob + '</span> is ' + jobPercentComplete + '% complete.');
    }
  }
  return;
}

function jobLoot(element) {
  var lootbag = [];

  // See what loot was gained.
  var messages = $x('.//td[@class="message_body"]', element);
  var numMessages = messages.length;
  for (var i = 1; i < numMessages; i++) {
    var innerNoTags = messages[i].innerHTML.untag();
    if (innerNoTags.match(/You\s+gained(?:\s+an?)?\s+(.+)\./) ||
        innerNoTags.match(/found(?:\s+an?)?\s+(.*?)\s+on\s+the/i) ||
        innerNoTags.match(/earned(?:\s+an?)?\s+(.*?)\.\s+you\s+/i)) {
      var loot = RegExp.$1;
      addToLog('lootbag Icon', '<span class="loot">'+' Found ' + loot + ' in the job.' + '</span>');
      lootbag.push(loot);
    }
  }

  var items = getSavedList('itemList');
  if (typeof(items[0]) == 'undefined' || items.length == 0) {
    DEBUG('No items in required item list.');
    return;
  }
  DEBUG('Found ' + lootbag.length + ' item(s) on this job.');

  var itemFound = false;
  var itemName;
  // NOTE: The single equal sign is intentional in this while() condition.
  while (itemName = lootbag.pop()) {
    DEBUG('Looking for ' + itemName + ' in needed items list.');
    DEBUG('We need ' + items.length + ' item(s).');
    for (var j = 0, jLength=items.length; j < jLength; j++) {
      if (itemName.indexOf(items[j]) != -1 ) {
        // we found some needed loot
        itemFound = true;
        addToLog('found Icon', itemName + ' is the item we were looking for!');
        removeSavedListItem('itemList', itemName);
        removeJobForItem('jobsToDo', itemName);
        popJob();
      }
    }
  }
  if (!itemFound) {
    var jobResult;
    for (var i = 0, numItems=items.length; i < numItems; ++i) {
      jobResult = requirementJob.searchArray(items[i], 0);
      if (jobResult === false) {
        addToLog('warning Icon', 'BUG DETECTED: ' + items[i] + ' not found in requirementJob array.');
      } else {
        if (missions[GM_getValue('selectMission', 1)][0] != requirementJob[jobResult][1]) {
          DEBUG(items[i] + ' cannot be found doing this job.');
        }
      }
      DEBUG(items[i] + ' not found.');
    }
  }
}

function debugDumpSettings() {
  // Use showIfUnchecked() to show 0 value as "un-checked", or showIfSelected()
  // to show 0 value as "not selected" (for radio buttons).

  var getJobList = function(listName){
    var multiple_jobs_list = getSavedList(listName);
    var jobNames = [];
    for (var i=0, numJobs=multiple_jobs_list.length; i < numJobs; ++i) {
      jobNames.push(missions[multiple_jobs_list[i]][0]);
    }
    return jobNames.join(', ');
  };

  var ratioJobs = getJobList('selectMissionMultiple');
  var selectTier = 'None';
  if (GM_getValue('selectTier') != '0.0') {
    selectedTierValue = GM_getValue('selectTier').split('.');
    selectTier = cities[parseInt(selectedTierValue[0])][0] + ' - ' + missionTabs[NY][parseInt(selectedTierValue[1]) - 1];
  }

  DEBUG('[code]>  >  >  >  >  BEGIN SETTINGS DUMP  <  <  <  <  <<br>' +
        'Script Version: <strong>' + SCRIPT.version + ' build ' + SCRIPT.build + '</strong><br>' +
        'Language: <strong>' + GM_getValue('language') + '</strong><br>' +
        'Player current level: <strong>' + level + '</strong><br>' +
        'Player points to next level: <strong>' + ptsToNextLevel + '</strong><br>' +
        'Player mafia size: <strong>' + mafia + '</strong><br>' +
        'Player attack: <strong>' + curAttack + '</strong><br>' +
        'Player defense: <strong>' + curDefense + '</strong><br>' +
        'Player health: <strong>' + health + '/' + maxHealth + '</strong><br>' +
        'Player energy: <strong>' + energy + '/' + maxEnergy + '</strong><br>' +
        'Player stamina: <strong>' + stamina + '/' + maxStamina + '</strong><br>' +
        'Player influence: <strong>' + influence + '</strong><br>' +
        'Player skill points: <strong>' + stats + '</strong><br>' +
        'Energy pack waiting? <strong>' + energyPack + '</strong><br>' +
        'Current location: <strong>' + cities[city][CITY_NAME] + '</strong><br>' +
        'Player NY cash: <strong>' + (cities[NY][CITY_CASH] == undefined? 'unknown' : '$' + makeCommaValue(cities[NY][CITY_CASH])) + '</strong><br>' +
        'Player Cuba cash: <strong>' + (cities[CUBA][CITY_CASH] == undefined? 'unknown' : 'C$' + makeCommaValue(cities[CUBA][CITY_CASH])) + '</strong><br>' +
        'Player Moscow cash: <strong>' + (cities[MOSCOW][CITY_CASH] == undefined? 'unknown' : 'R$' + makeCommaValue(cities[MOSCOW][CITY_CASH])) + '</strong><br>' +
        '-------------------General Tab-------------------<br>' +
        'Enable auto-refresh: <strong>' + showIfUnchecked(GM_getValue('autoClick'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate low: <strong>'+ GM_getValue('r1') + '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate high: <strong>' + GM_getValue('r2') + '</strong><br>' +
        'Enable auto-pause: <strong>' + showIfUnchecked(GM_getValue('autoPause')) + '</strong><br>' +
        '&nbsp;&nbsp;-After level up: <strong>' + showIfSelected(GM_getValue('autoPauseAfter')) + '</strong><br>' +
        '&nbsp;&nbsp;-Before level up: <strong>' + showIfSelected(GM_getValue('autoPauseBefore')) + '</strong><br>' +
        '&nbsp;&nbsp;-Exp to pause at: <strong>'+ GM_getValue('autoPauseExp') + '</strong><br>' +
        'Delay rate low: <strong>'+ GM_getValue('d1') + '</strong><br>' +
        'Delay rate high: <strong>' + GM_getValue('d2') + '</strong><br>' +
        'Enable auto-heal: <strong>' + showIfUnchecked(GM_getValue('autoHeal')) + '</strong><br>' +
        '&nbsp;&nbsp;-Heal in : <strong>' + cities[GM_getValue('healLocation')][CITY_NAME] + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum health: <strong>' + GM_getValue('healthLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Hide in Hospital: <strong>' + showIfUnchecked(GM_getValue('hideInHospital')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal when stamina can be spent: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt3')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal when stamina is full: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt4')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;-Heal after 5 minutes: <strong>' + showIfUnchecked(GM_getValue('forceHealOpt5')) + '</strong><br>' +
        'Idle in City: <strong>' + showIfUnchecked(GM_getValue('idleInCity')) + '</strong><br>' +
        '&nbsp;&nbsp;Selected city: <strong>' + cities[GM_getValue('idleLocation', NY)][CITY_NAME] + '</strong><br>' +
        'Enable auto-lotto: <strong>' + showIfUnchecked(GM_getValue('autoLottoOpt')) + '</strong><br>' +
        'Enable collect lotto bonus: <strong>' + showIfUnchecked(GM_getValue('autoLottoBonus'))  + ' == ' + autoLottoBonusList[GM_getValue('autoLottoBonusItem', 0)] + '</strong><br>' +
        'Enable hourly stat: <strong>' + showIfUnchecked(GM_getValue('hourlyStatsOpt')) + '</strong><br>' +
        'Spend all: <strong>' + showIfUnchecked(GM_getValue('burnFirst')) + ' == ' + burnOptions[GM_getValue('burnOption')] + '</strong><br>' +
        '---------------------Display Tab--------------------<br>' +
        'Enable logging: <strong>' + showIfUnchecked(GM_getValue('autoLog')) + '</strong><br>' +
        '&nbsp;&nbsp;-Logging length: <strong>' + GM_getValue('autoLogLength') + '</strong><br>' +
        'Log player updates: <strong>' + showIfUnchecked(GM_getValue('logPlayerUpdates')) + '</strong><br>' +
        '&nbsp;&nbsp;-Updates length: <strong>' + GM_getValue('logPlayerUpdatesMax') + '</strong><br>' +
        'Left-align main frame: <strong>'+ showIfUnchecked(GM_getValue('leftAlign')) + '</strong><br>' +
        'Enable log-filtering: <strong>' + showIfUnchecked(GM_getValue('filterLog')) + '</strong><br>' +
        '&nbsp;&nbsp;Filter mode: <strong>' + GM_getValue('filterOpt') + '</strong><br>' +
        '&nbsp;&nbsp;Filter pass: <strong>' + GM_getValue('filterPass') + '</strong><br>' +
        '&nbsp;&nbsp;Filter fail: <strong>' + GM_getValue('filterFail') + '</strong><br>' +
        'Hide ads: <strong>'+ showIfUnchecked(GM_getValue('hideAds')) + '</strong><br>' +
        'Hide safe house gifts: <strong>'+ showIfUnchecked(GM_getValue('hideGifts')) + '</strong><br>' +
        'Move email options: <strong>'+ showIfUnchecked(GM_getValue('moveEmailBar')) + '</strong><br>' +
        'Summarize attacks from Player Updates: <strong>' + showIfUnchecked(GM_getValue('hideAttacks')) + '</strong><br>' +
        'Set window title to name on Facebook account: <strong>' + showIfUnchecked(GM_getValue('fbwindowtitle')) + '</strong><br>' +
        '---------------------Social Tab--------------------<br>' +
        'Automatically asks for job help: <strong>' + showIfUnchecked(GM_getValue('autoAskJobHelp')) + '</strong><br>' +
        'Minimum experience for job help: <strong>' + GM_getValue('autoAskJobHelpMinExp') + '</strong><br>' +
        'Message to post on wall for job help: <strong>' + GM_getValue('autoAskJobHelpMessage') + '</strong><br>' +
        'Accept mafia invitations: <strong>'+ showIfUnchecked(GM_getValue('acceptMafiaInvitations')) + '</strong><br>' +
        'Automatically Help on Jobs: <strong>' + showIfUnchecked(GM_getValue('autoHelp')) + '</strong><br>' +
        'Automatically Help on Wars: <strong>' + showIfUnchecked(GM_getValue('autoWarHelp')) + '</strong><br>' +
        'Undo notifications: <strong>'+ GM_getValue('notificationHandle') + '</strong><br>' +
        'Skip gift wall posts: <strong>' + GM_getValue('autoGiftSkipOpt') + '</strong><br>' +
        'Auto Gift Waiting: <strong>' + showIfUnchecked(GM_getValue('autoGiftWaiting'))  + '</strong><br>' +
        'Auto War: <strong>' + showIfUnchecked(GM_getValue('autoWar'))  + '</strong><br>' +
        '&nbsp;&nbsp;War Mode: <strong>' + warModeChoices[GM_getValue('warMode', 0)]  + '</strong><br>' +
        '&nbsp;&nbsp;Auto War Target List: <strong>' + GM_getValue('autoWarTargetList', 0) + '</strong><br>' +
        '&nbsp;&nbsp;Publish war declaration: <strong>' + showIfUnchecked(GM_getValue('autoWarPublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Publish call for backup: <strong>' + showIfUnchecked(GM_getValue('autoWarResponsePublish')) + '</strong><br>' +
        '&nbsp;&nbsp;Publish reward: <strong>' + showIfUnchecked(GM_getValue('autoWarRewardPublish')) + '</strong><br>' +
        '-------------------Autostat Tab--------------------<br>' +
        'Enable auto-stat: <strong>' + showIfUnchecked(GM_getValue('autoStat')) + '</strong><br>' +
        'Disable auto-stat: <strong>' + showIfUnchecked(GM_getValue('autoStatDisable')) + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Base: <strong>' + GM_getValue('autoStatAttackBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Base: <strong>' + GM_getValue('autoStatDefenseBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Base: <strong>' + GM_getValue('autoStatHealthBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Base: <strong>' + GM_getValue('autoStatEnergyBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Base: <strong>' + GM_getValue('autoStatStaminaBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Influence Base: <strong>' + GM_getValue('autoStatInfluenceBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Ratio: <strong>' + GM_getValue('autoStatAttackRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Ratio: <strong>' + GM_getValue('autoStatDefenseRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Ratio: <strong>' + GM_getValue('autoStatHealthRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Ratio: <strong>' + GM_getValue('autoStatEnergyRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Ratio: <strong>' + GM_getValue('autoStatStaminaRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Influence Ratio: <strong>' + GM_getValue('autoStatInfluenceRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Mode: <strong>' + GM_getValue('autoStatAttackMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Mode: <strong>' + GM_getValue('autoStatDefenseMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Mode: <strong>' + GM_getValue('autoStatHealthMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Mode: <strong>' + GM_getValue('autoStatEnergyMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Mode: <strong>' + GM_getValue('autoStatStaminaMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Influence Mode: <strong>' + GM_getValue('autoStatInfluenceMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Prio: <strong>' + GM_getValue('autoStatAttackPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Prio: <strong>' + GM_getValue('autoStatDefensePrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Prio: <strong>' + GM_getValue('autoStatHealthPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Prio: <strong>' + GM_getValue('autoStatEnergyPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Prio: <strong>' + GM_getValue('autoStatStaminaPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Influence Prio: <strong>' + GM_getValue('autoStatInfluencePrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Fallback: <strong>' + GM_getValue('autoStatAttackFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Fallback: <strong>' + GM_getValue('autoStatDefenseFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Fallback: <strong>' + GM_getValue('autoStatHealthFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Fallback: <strong>' + GM_getValue('autoStatEnergyFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina Fallback: <strong>' + GM_getValue('autoStatStaminaFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Influence Fallback: <strong>' + GM_getValue('autoStatInfluenceFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Rest AutoStat: <strong>' + GM_getValue('restAutoStat') + '</strong><br>' +
        '&nbsp;&nbsp;-Next Stat: <strong>' + GM_getValue('nextStat') + '</strong><br>' +
        '-------------------Energy Tab--------------------<br>' +
        'Enable auto-mission: <strong>' + showIfUnchecked(GM_getValue('autoMission')) + '</strong><br>' +
        '&nbsp;&nbsp;-Repeat Job: <strong>' + showIfUnchecked(GM_getValue('repeatJob')) + '</strong><br>' +
        '&nbsp;&nbsp;-Job selected: <strong>' + missions[GM_getValue('selectMission')][0] + '</strong><br>' +
        '&nbsp;&nbsp;-Multiple Jobs: <strong>' + showIfUnchecked(GM_getValue('multipleJobs')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Jobs: <strong>' + ratioJobs + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Mastery Tier: <strong>' + selectTier + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Optimize at end level: <strong>' + showIfUnchecked(GM_getValue('endLevelOptimize')) + '</strong><br>' +
        'Mastermind bonus: <strong>' + GM_getValue('selectExpBonus') + '%</strong><br>' +
        'Wheelman savings: <strong>' + GM_getValue('selectEnergyBonus') + '%</strong><br>' +
        'Enable auto-energy pack: <strong>' + showIfUnchecked(GM_getValue('autoEnergyPack')) + '</strong><br>' +
        'Estimated job ratio: <strong>' + GM_getValue('estimateJobRatio') + '</strong><br>' +
        'Has helicopter: <strong>' + showIfUnchecked(GM_getValue('hasHelicopter')) + '</strong><br>' +
        'Has private island: <strong>' + showIfUnchecked(GM_getValue('hasPrivateIsland')) + '</strong><br>' +
        'Has golden throne: <strong>' + showIfUnchecked(GM_getValue('hasGoldenThrone')) + '</strong><br>' +
        'Is Maniac: <strong>' + showIfUnchecked(GM_getValue('isManiac')) + '</strong><br>' +
        'Auto send energy pack: <strong>' + showIfUnchecked(GM_getValue('sendEnergyPack')) + '</strong><br>' +
        'Energy threshold: <strong>' + GM_getValue('selectEnergyUse') + ' ' + numberSchemes[GM_getValue('selectEnergyUseMode', 0)] + ' (refill to ' + SpendEnergy.ceiling + ')</strong><br>' +
        '&nbsp;&nbsp;-Energy use started: <strong>' + GM_getValue('useEnergyStarted') + '</strong><br>' +
        'Energy reserve: <strong>' + + GM_getValue('selectEnergyKeep') + ' ' + numberSchemes[GM_getValue('selectEnergyKeepMode', 0)] + ' (keep above ' + SpendEnergy.floor + ')</strong><br>' +
        '-------------------Stamina Tab-------------------<br>' +
        'Spend stamina: <strong>' + showIfUnchecked(GM_getValue('staminaSpend')) + '</strong><br>' +
        'How: <strong>' + staminaSpendChoices[GM_getValue('staminaSpendHow'), 0] + '</strong><br>' +
        '&nbsp;&nbsp;-Fight in: <strong>' + cities[GM_getValue('fightLocation', 0)][CITY_NAME] + '</strong><br>' +
        '&nbsp;&nbsp;-Reattack <strong>' + showIfUnchecked(GM_getValue('staminaReattack')) + '</strong><br>' +
        '&nbsp;&nbsp;-Reattack threshold:<strong>' + GM_getValue('reattackThreshold') + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight max level: <strong>' + GM_getValue('fightLevelMax') + ' (' + showIfRelative('fightLevelMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight max mafia: <strong>' + GM_getValue('fightMafiaMax') + ' (' + showIfRelative('fightMafiaMaxRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight min mafia: <strong>' + GM_getValue('fightMafiaMin') + ' (' + showIfRelative('fightMafiaMinRelative') + ')</strong><br>' +
        '&nbsp;&nbsp;-Random fight stealth: <strong>' + showIfUnchecked(GM_getValue('fightStealth')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight avoid bodyguards: <strong>' + showIfUnchecked(GM_getValue('fightAvoidBodyguards')) + '</strong><br>' +
        '&nbsp;&nbsp;-Random fight avoid names: <strong>' + showIfUnchecked(GM_getValue('fightAvoidNames')) + '</strong><br>' +
        '&nbsp;&nbsp;-List fight opponents: <strong>' + GM_getValue('fightList') + '</strong><br>' +
        '&nbsp;&nbsp;-List fight remove stronger: <strong>' + showIfUnchecked(GM_getValue('fightRemoveStronger')) + '</strong><br>' +
        '&nbsp;&nbsp;-Collect hitman bounties in: <strong>' + cities[GM_getValue('hitmanLocation', 0)][CITY_NAME] + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman min bounty: <strong>' + parseCash(GM_getValue('hitmanBountyMin')) + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman bounty selection: <strong>' + bountySelectionChoices[(GM_getValue('bountySelection'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Hitman avoid names: <strong>' + showIfUnchecked(GM_getValue('hitmanAvoidNames')) + '</strong><br>' +
        'Families list: <strong>' + GM_getValue('clanName') + '</strong><br>' +
        'Stamina threshold: <strong>' + GM_getValue('selectStaminaUse') + ' ' + numberSchemes[GM_getValue('selectStaminaUseMode', 0)] + ' (refill to ' + SpendStamina.ceiling + ')</strong><br>' +
        '&nbsp;&nbsp;-Stamina use started: <strong>' + GM_getValue('useStaminaStarted') + '</strong><br>' +
        'Stamina reserve: <strong>' + + GM_getValue('selectStaminaKeep') + ' ' + numberSchemes[GM_getValue('selectStaminaKeepMode', 0)] + ' (keep above ' + SpendStamina.floor + ')</strong><br>' +
        'Ignore reserve to level-up: <strong>' + showIfUnchecked(GM_getValue('allowStaminaToLevelUp')) + '</strong><br>' +
        '------------------Money Tab-------------------<br>' +
        'Enable auto-buy <strong>' + showIfUnchecked(GM_getValue('autoBuy')) + '</strong><br>' +
        '&nbsp;&nbsp;-Min cash: <strong>' + GM_getValue('buyMinAmount') + '</strong><br>' +
        'Sell Cuban business output: <strong>' + showIfUnchecked(GM_getValue('autoSellCrates')) + '</strong><br>' +
        'Sell Moscow business output <strong>' + showIfUnchecked(GM_getValue('autoSellCratesMoscow')) + '</strong><br>' +
        'Collect NY Take: <strong>' + showIfUnchecked(GM_getValue('collectNYTake')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next take availble at:' + GM_getValue('nextNYTake', 0) + '</strong><br>' +
        'Collect Racket: <strong>' + showIfUnchecked(GM_getValue('racketCollect')) + '</strong><br>' +
        'Shakedown again: <strong>' + showIfUnchecked(GM_getValue('racketReshakedown')) + '</strong><br>' +
        'Shakedown again permanently: <strong>' + showIfUnchecked(GM_getValue('racketPermanentShakedown')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next take availble at:' + GM_getValue('nextRacket', 0) + '</strong><br>' +
        'Enable auto-bank in NY: <strong>' + showIfUnchecked(GM_getValue('autoBank')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: $<strong>' + GM_getValue('bankConfig') + '</strong><br>' +
        'Enable auto-bank in Cuba: <strong>' + showIfUnchecked(GM_getValue('autoBankCuba')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: C$<strong>' + GM_getValue('bankConfigCuba') + '</strong><br>' +
        'Enable auto-bank in Moscow: <strong>' + showIfUnchecked(GM_getValue('autoBankMoscow')) + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum deposit: R$<strong>' + GM_getValue('bankConfigMoscow') + '</strong><br>' +
        '>  >  >  >  >  END SETTINGS DUMP  <  <  <  <  <[/code]');
}

// This function returns false if some further action has been taken and the
// caller should not make additional calls until that action has completed.
function parsePlayerUpdates(messagebox) {
  // Get the timestamp (e.g. "3 minutes ago")
  var minutesAgo = xpathFirst('div[@class="update_timestamp"]', messagebox);
  minutesAgo = minutesAgo? minutesAgo.innerHTML + ' ' : '';
  minutesAgo = minutesAgo.indexOf('0') == 0? '' : minutesAgo;

  // Get the text and links.
  var messageTextElt = xpathFirst('div[@class="update_txt"]', messagebox);
  if (!messageTextElt) {
    addToLog('warning Icon', 'BUG DETECTED: Unable to read update text.');
    return true;
  }
  var messageText = messageTextElt.innerHTML;
  var messageTextNoTags = messageText.untag();
  var links = messageTextElt.getElementsByTagName('a');

  if (messageTextNoTags.indexOf('attacked by') != -1) {
    // Attacked by some fool with a death wish.
    var user = linkToString(links[0], 'user');
    var result = 'Attacked';
    if (links[0] && links[0].nextSibling && links[0].nextSibling.nodeValue &&
        links[0].nextSibling.nodeValue.match(/\d+ times/i)) {
      result += ' ' + RegExp.lastMatch;
    }
    result += ' by ' + user;
    if (messageTextNoTags.match(/you won.*you gained .*?(\d+) experience points?.*?([A-Z]?\$[\d,]*\d)/i)) {
      // The fight was won.
      var cost = RegExp.$2;
      var experience = RegExp.$1;
      result += '<span class="good">' + ' WON ' + cost + '</span>' + ' and ' +
                '<span class="good">' + experience +' experience.</span>';
      cost = parseCash(cost);
      experience = parseInt(experience);

      if (isChecked('hideAttacks')) {
        DEBUG('Riding Hitlist fight won.');
        GM_setValue('currentHitXp', parseInt((GM_getValue('currentHitXp', 0)) + experience));
        GM_setValue('currentHitDollars', '' + (parseInt(GM_getValue('currentHitDollars', 0)) + cost));
        DEBUG(result);
        if (experience == 0) {
          DEBUG('Zero experience detected; turning off auto-heal.');
          GM_setValue('autoHeal', 0);
        }
      } else {
        addToLog('updateGood Icon', minutesAgo + result);
      }

//      NEEDS FIX - player updates need their own stats and a place to put them in the log (tabbed log
//      perhaps?)
//      The setValue commands below should not be updating auto-fight stats as it thows off
//      the gain rate, stamina req'd to level and ultimately  the auto-burn stamina for level up action.
//      Leaving in as placeholders. --AK17710N
//
//      GM_setValue('fightWinCountInt', (GM_getValue('fightWinCountInt', 1) + 1));
//      GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + experience);
//      GM_setValue('totalWinDollarsInt', (parseInt(GM_getValue('totalWinDollarsInt', 1)) + cost));
    } else if (messageTextNoTags.match(/you lost.*and losing .*?([A-Z]?\$[\d,]*\d)/i)) {
      // The fight was lost.
      var cost   = RegExp.$1;
      result += '<span class="bad">' + ' LOST ' + cost + '.</span>';
      cost = parseCash(cost);

      if (isChecked('hideAttacks')) {
        DEBUG('Ride Hitlist fight lost.');
        GM_setValue('currentHitDollars', '' + (parseInt(GM_getValue('currentHitDollars', 0)) - cost));
        DEBUG(result);
      } else {
        addToLog('updateBad Icon', minutesAgo + result);
      }

//      NEEDS FIX - player updates need their own stats and a place to put them in the log (tabbed log
//      perhaps?)
//      The setValue commands below should not be updating auto-fight stats as it thows off
//      the gain rate, stamina req'd to level and ultimately  the auto-burn stamina for level up action.
//      Leaving in as placeholders. --AK17710N
//
//      GM_setValue('fightLossCountInt', (GM_getValue('fightLossCountInt', 1) + 1));
//      GM_setValue('totalLossDollarsInt', '' + (parseInt(GM_getValue('totalLossDollarsInt', 1)) + cost));
    } else {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read update win/loss.');
    }

  } else if (messageTextNoTags.indexOf('You were snuffed') != -1) {
    // Death. Ouch.
    addToLog('updateBad Icon', minutesAgo + 'You <span class="bad">' + 'DIED' + '</span>.');

  } else if (messageTextNoTags.indexOf('You were knocked out') != -1) {
    // Hitlist ride has ended.
    var hitman = linkToString(links[0], 'user');
    var user = linkToString(links[1], 'attacker');
    var bounty = parseCash(messageTextNoTags.split(' who claimed the ')[1]);
    var result = 'Whacked by '+ hitman + ' who claimed the $' +
                 makeCommaValue(parseInt(bounty)) + ' bounty set by ' +
                 user + '.';

    if (isChecked('hideAttacks')) {
      DEBUG('Whacked riding hitlist.');
      GM_setValue('currentHitXp', parseInt(GM_getValue('currentHitXp', 0)) - 6);
      GM_setValue('totalHits', parseInt(GM_getValue('totalHits', 0)) + 1);
      GM_setValue('totalXp', parseInt(GM_getValue('totalXp', 0)) + parseInt(GM_getValue('currentHitXp', 0)));
      GM_setValue('lastHitXp', parseInt(GM_getValue('currentHitXp', 0)));
      GM_setValue('totalHitDollars', '' + (parseInt(GM_getValue('currentHitDollars', 0)) + parseInt(GM_getValue('totalHitDollars', 0))));
      if (GM_getValue('currentHitXp', 0) < 0) {
        var currentHitXp = '<span class="bad">LOST ' + GM_getValue('currentHitXp', 0) + '</span>';
      } else {
        var currentHitXp = '<span class="good">GAINED ' + GM_getValue('currentHitXp', 0) + '</span>';
      }
      if (parseInt(GM_getValue('currentHitDollars', 0)) < 0) {
        var currentHitDollars = '<span class="bad">' +
                                ' LOST $' + makeCommaValue(parseInt(GM_getValue('currentHitDollars', 0))) + '</span>';
        addToLog('updateBad Icon', minutesAgo + currentHitXp + ' experience and ' + currentHitDollars + ' on the hitlist.');
      } else {
        var currentHitDollars = '<span class="good">' +
                                ' WON $' + makeCommaValue(parseInt(GM_getValue('currentHitDollars', 0))) + '</span>';
        addToLog('updateGood Icon', minutesAgo + currentHitXp + ' experience and ' + currentHitDollars + ' on the hitlist.');
      }

      DEBUG('Hitlist total values set; now clearing current values.');
      GM_setValue('currentHitXp', 0);
      GM_setValue('currentHitDollars', '0');
      DEBUG('Ensure that autoHeal is enabled.');
      GM_setValue('autoHeal', 'checked');

    }
    addToLog('updateBad Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('You were punched') != -1) {
    // Punched by some wuss.
    var user = linkToString(links[0], 'attacker');
    var result = 'You were punched in the face by ' + user + '.';
    addToLog('updateBad Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('You fought as') != -1) {
    // Helped a fellow mafia member in a fight.
    var capo = linkToString(links[0], 'user');
    var user = linkToString(links[1], 'user');
    var cost = messageTextNoTags.match(REGEX_CASH);
    var result = 'You fought as ' + capo + "'s Capo and defeated " +
                 user + ', receiving ' + '<span class="good">' +
                 cost + '</span> for your efforts.';
    addToLog('updateGood Icon', minutesAgo + result);

  } else if (messageTextNoTags.indexOf('needs your help') != -1) {
    if (isChecked('autoHelp')) {
      // Help requested by a fellow mafia member.
      var userElt = xpathFirst('.//a[contains(@onclick, "give_help")]', messagebox);
      var elt = xpathFirst('.//a[contains(text(), "Click here to help")]', messagebox);
      if (elt) {
        // Help immediately.
        Autoplay.fx = function() {
          clickAction = 'help';
          clickContext = {
            user: linkToString(userElt, 'user'),
            help: linkToString(elt)
          };
          clickElement(elt);
          DEBUG('Clicked to help with a job.');
        };
        Autoplay.delay = 0;
        Autoplay.start();
        return false;
      } else {
        addToLog('warning Icon', 'BUG DETECTED: Unable to find help element.');
      }
    }

  } else if (messageTextNoTags.indexOf('went to war with') != -1) {
    if (isChecked('autoWarHelp')) {
      // War assist requested by a fellow mafia member.
      var userElt = xpathFirst('.//a[contains(@onclick, "controller=stats")]', messagebox);
      var elt = xpathFirst('.//a[contains(text(), "Help out your friends")]', messagebox);
      if (elt) {
        // Help immediately.
        Autoplay.fx = function() {
          clickContext = {
            user: linkToString(userElt, 'user'),
            help: linkToString(elt)
          };
          clickElement(elt);
          helpWar = true;
          DEBUG('Clicked to help war.');
        };
        Autoplay.delay = 0;
        Autoplay.start();
        return false;
      } else {
        addToLog('warning Icon', 'BUG DETECTED: Unable to find war help element.');
      }
    }

  } else if (messageTextNoTags.indexOf('claimed your $') != -1) {
    // Bounty claimed. Whoever was hitlisted is sleeping with the fishes.
    var hitman = linkToString(links[0], 'user');
    var user = linkToString(links[1], 'attacker');
    var result = hitman + ' claimed your ' +
                 messageTextNoTags.match(REGEX_CASH)[0] +
                 ' bounty on ' + user + '.';
    addToLog('updateGood Icon', minutesAgo + result);

  } else if (messageTextNoTags.match(/you earned.*achievement/i)) {
    // You earned an achievement.
    addToLog('updateGood Icon', minutesAgo + messageText);

  } else if (messageTextNoTags.match(/earned some great items/i)) {
    // Social reward, no need to collect. Ignore it.
    DEBUG(minutesAgo + messageText);

  } else if (messageTextNoTags.match(/earned the.*achievement/i)) {
    // Someone else earned an achievement. Who cares!
    DEBUG(minutesAgo + messageText);

  } else if (messageTextNoTags.match(/went to war with youxx/i)) {
    // Someone declared war on us!
    DEBUG(minutesAgo + messageText);

  } else {
    // Just copy the update text straight into the log.
    addToLog('info Icon', minutesAgo + messageText);
  }

  return true;
}

function profileFix() {
  var lists = $x('.//ul[@class="nice_list items_list clearfix"]', innerPageElt);
  if (lists.length < 3) return;

  // Count the number of items in each item list.
  var itemCount = [];
  for (var i = 0; i < 3; i++) {
    itemCount[i] = 0;
    var elts = $x('./li/div[2]', lists[i]);
    for (var j = elts.length - 1; j >= 0; --j) {
      if (elts[j].innerHTML.match(/(\d+)/))
        itemCount[i] += parseInt(RegExp.$1);
    }
  }

  var findWeapons = xpath('.//div[@class="title"]', innerPageElt);
  var greenText = 'color:#52E259;';
  var redText = 'color:#EC2D2D;';
  if ((findWeapons.snapshotLength > 5) && (findWeapons.snapshotLength < 10)) {
    for (locateBlock = 0, numWeapons=findWeapons.snapshotLength; locateBlock < numWeapons; ++locateBlock) {
      if (findWeapons.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Weapons')
        break;
    }

    if (findWeapons.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Weapons') {
      if ((mafia <= itemCount[0]) || (itemCount[0] > 500))
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':greenText});
      else
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':redText});
      j.appendChild(document.createTextNode('(' + itemCount[0] + ')'));
    }

    locateBlock = locateBlock + 1;
    if (findWeapons.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Armor') {
      if ((mafia <= itemCount[1]) || (itemCount[1] > 500))
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':greenText});
      else
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':redText});
      j.appendChild(document.createTextNode(' (' + itemCount[1] + ')'));
    }

    locateBlock = locateBlock + 1;
    if (findWeapons.snapshotItem(locateBlock).innerHTML.ltrim().rtrim() == 'Vehicles') {
      if ((mafia <= itemCount[2]) || (itemCount[2] > 500))
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':greenText});
      else
        j = makeElement('span', findWeapons.snapshotItem(locateBlock), {'style':redText});
      j.appendChild(document.createTextNode('(' + itemCount[2] + ')'));
    }
  }
}

function autoLotto() {
  Autoplay.delay = getAutoPlayDelay();

  var lottoButton = xpathFirst('.//a/span[contains(@class, "sexy_lotto") and contains(text(), "Play Now and Win Big")]', innerPageElt);
  if (lottoButton) {
    Autoplay.fx = function() {
      clickElement(lottoButton);
      DEBUG('Clicked to go to lotto.');
    };
    Autoplay.start();
    return true;
  }

  var weeklylottoCheck = xpathFirst('.//a/span[contains(@class, "sexy_lotto") and contains(text(), "See if you won")]', innerPageElt);
  if (weeklylottoCheck) {
    Autoplay.fx = function() {
      clickElement(weeklylottoCheck);
      DEBUG('Clicked to see lotto results.');
    };
    Autoplay.start();
    return true;
  }

  // Are we supposed to grab a mastery prize?
  if (isChecked('autoLottoBonus')) {
    // Grab the progress status
    var lottoProgress = xpath('.//div/span[contains(text(), "Ticket Mastery progress")]', innerPageElt);
    if (lottoProgress.snapshotLength != 0) {
      lottoProgress = lottoProgress.snapshotItem(0).parentNode.innerHTML;

      // This is the prize number
      var lottoPrize = parseInt(lottoProgress.substr(lottoProgress.indexOf("progress:") + 15, 1));
      DEBUG('Lotto Prize = ' + autoLottoBonusList[lottoPrize - 1]);

      // Is the current item the correct one?
      if (lottoPrize == (GM_getValue('autoLottoBonusItem', 0) + 1)) {
        // Grab the mastery button
        var bonusClaim = xpathFirst('.//a/span[contains(@class, "sexy_lotto") and contains(text(), "Claim Ticket Mastery Bonus")]', innerPageElt);
        if (bonusClaim) {
          Autoplay.fx = function() {
            clickElement(bonusClaim);
            addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Lotto</span>: Claimed bonus: ' + autoLottoBonusList[GM_getValue('autoLottoBonusItem', 0)]);
            DEBUG('Claimed lotto bonus item: ' + lottoPrize);
          };
          Autoplay.start();
          return true;
        }
        // Safety net. If we get here, then the page layout has changed and the buttons cannot be found
        DEBUG('Cannot click the lotto bonus button.');
        Autoplay.fx = goHome;
        Autoplay.start();
        return false;
      } else {
        DEBUG('Lotto bonus not matched.');
      }
    }
  }

  var randomTicket = xpathFirst('.//div[@class="sexy_button" and contains(text(), "Auto-Select Numbers")]', innerPageElt);
  if (randomTicket) {
    clickElement(randomTicket);
    var submitTicket = xpathFirst('.//span[@class="sexy_button"]/input[@class="sexy_lotto" and @type="submit" and @value="Submit Ticket(s)"]', innerPageElt);

    if (submitTicket) {
      var ticket = ' ';
      for (var i = 1; i < 6; i++) {
        var searchstring = './/div[@id="ticket_1_selected_' + i + '"]';
        lottonum = xpathFirst(searchstring, innerPageElt);
        ticket = ticket + lottonum.innerHTML;
        if (i<5)
          ticket = ticket + '-';
      }
      Autoplay.fx = function() {
    }
    // FIXME: It is a bug to reach this point?
    Autoplay.fx = goHome;
        clickElement(submitTicket);
        addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Lotto</span>: Played ticket' + ticket + '.');
      };
      Autoplay.start();
      return true;
    Autoplay.start();
    return true;
  }

  var lottoResults = xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(text(), "Results")]', innerPageElt);
  if (lottoResults) {
    var totalwinning = 0;
    var lottotable = xpath('.//table//tbody//tr//td[contains(text(), "Ticket #")]', innerPageElt);
    if (lottotable.snapshotLength == 0) {
      var noticketsEntered = xpath('.//center//div', innerPageElt);
      if ((noticketsEntered) && (noticketsEntered.snapshotLength>0) &&
         (noticketsEntered.snapshotItem(1).parentNode.innerHTML.indexOf("You didn't enter any tickets")!=-1))
        addToLog('info Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Lotto</span>: No tickets entered for the last drawing.');
      else
        addToLog('warning Icon', 'BUG DETECTED: Can\'t find lotto results.');
      return false;
    }
    var winningtickets = [0, 0, 0, 0, 0, 0];
    for (var j = 0, numTickets=lottotable.snapshotLength; j < numTickets; j++) {
      var eachticket = lottotable.snapshotItem(j).parentNode.innerHTML;
      var count = 0;
      for (var k = 0, ticketLength=eachticket.length; k < ticketLength; k++) {
        if (eachticket.substr(k, 'gold'.length) == 'gold')
          count++;
      }
      winningtickets[count] = winningtickets[count] + 1;
    }
    var lottoLog = '<span style="font-weight:bold;color:rgb(255,217,39);">Lotto winners</span>: ';
    var atleastOneWinner = false;
    for (var j = 1; j < 6; j++)
      if (winningtickets[j]>0) {
        atleastOneWinner = true;
        if (winningtickets[j] == 1)
          lottoLog += winningtickets[j] + ' ticket';
        else
          lottoLog += winningtickets[j] + ' tickets';
        if (j == 1)
          lottoLog +=  ' matching ' + j + ' number;';
        else
          lottoLog += ' matching ' + j + ' numbers;';
      }
    if (lottoLog[lottoLog.length-1]==';')
      lottoLog = lottoLog.substring(0, lottoLog.length-1)+'.';
    else if (!atleastOneWinner)
      lottoLog += 'no winning tickets.';
    addToLog('info Icon', lottoLog);

    // Log any displayed prizes.
    if (atleastOneWinner) {
      var prizes = $x('.//table[@class="messages"]//center', innerPageElt);
      for (var i = 0, numPrizes=prizes.length; i < numPrizes; ++i) {
        var description = prizes[i].innerHTML.untag().trim();
        if (description) {
          addToLog('good Icon', '<span style="font-weight:bold;color:rgb(255,217,39);">Prize</span>: ' + description);
        }
      }
    }

    Autoplay.fx = goHome;
    Autoplay.start();
    return true;
  }

  return false;
}

// Attack the first war opponent you can
function autoWarAttack() {

  // Betray logic
  if (isChecked('autoWarBetray')) {
    var betrayElts = $x('.//div//a[@class="sexy_button"]//span[contains(.,"Betray")]', innerPageElt);

    // Betray a random friend
    if (betrayElts && betrayElts.length > 0) {
      var betrayFriend = betrayElts[Math.floor(Math.random() * betrayElts.length)];
      Autoplay.fx = function() {
        clickAction = 'war';
        clickContext = betrayFriend;
        clickElement(betrayFriend);
        DEBUG('Clicked betray friend button.');
      };
      Autoplay.start();
      return true;
    }
  }

  // Click the last attack button found
  var attackElts = xpath('.//div//a[@class="sexy_button"]//span[contains(.,"Attack")]', innerPageElt);
  if (attackElts && attackElts.snapshotLength > 0) {
    var warAttackButton = attackElts.snapshotItem(attackElts.snapshotLength-1);
    Autoplay.fx = function() {
      clickAction = 'war';
      clickContext = warAttackButton;
      clickElement(warAttackButton);
      DEBUG('Clicked the war attack button.');
    };
    Autoplay.start();
    return true;
  }

  if (helpWar) {
    // Help attempt was processed. Increment the update count.
    GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));
    helpWar = false;
  }

  return false;
}

function autoWar() {
  var action = 'war';
  Autoplay.delay = getAutoPlayDelay();

  // Does the main page have a reward button?
  var warRewardButton = xpathFirst('.//a//span[contains(text(), "Reward your friends now")]', innerPageElt);
  if (warRewardButton) {
    Autoplay.fx = function() {
      clickAction = action;
      clickContext = warRewardButton;
      clickElement(warRewardButton);
      DEBUG('Clicked to reward my mafia.');
    };
    Autoplay.start();
    return true;
  }

  // Check the timer, do we even need to go further?
  if (timeLeftGM('warTimer') > 0) return false;

  // We need to be on the war page to go any further
  if (!onWarNav()) {
    Autoplay.fx = goWarNav;
    Autoplay.start();
    return true;
  }

  // Click Start a new war
  var warStartButton = xpathFirst('.//div//a[@class="sexy_button" and contains(text(),"Start a new war")]', innerPageElt);
  if (warStartButton) {
    Autoplay.fx = function() {
      clickAction = action;
      clickContext = warStartButton;
      clickElement(warStartButton);
      DEBUG('Clicked to start a new war.');
    };
    Autoplay.start();
    return true;
  }

  // We're on the page, does it have a reward button
  /*var warRewardButton = xpathFirst('.//div//a[@class="sexy_button" and contains(text(),"Reward Friends!")]', innerPageElt);
  if (warRewardButton) {
    Autoplay.fx = function() {
      clickAction = action;
      clickContext = warRewardButton;
      clickElement(warRewardButton);
      DEBUG('Clicked the war reward button.');
    };
    Autoplay.start();
    return true;
  }*/

  // We're on the page, grab the 'Call for Help!' button if it exists
  var warHelpMeButton = xpathFirst('.//div//a[@class="sexy_button" and contains(text(),"Call for Help")]', innerPageElt);
  if (warHelpMeButton) {
    Autoplay.fx = function() {
      clickAction = action;
      clickContext = warHelpMeButton;
      clickElement(warHelpMeButton);
      DEBUG('Clicked to get help with my war.');
    };
    Autoplay.start();
    return true;
  }

  // Check for a war that may already be under way!
  var warStatus = xpathFirst('.//span[contains(@id, "war_timer")]', innerPageElt);
  if (warStatus) {
    var warTimer = warStatus.innerHTML;
    setGMTime('warTimer', warTimer);
    DEBUG('War is not available yet, checking again after ' + warTimer + ' hours.');
  } else {
    // Get war Target
    var warFriendsList = $x('.//a[contains(@href, "xw_action=declare_war")]', innerPageElt);
    if (warFriendsList) {
      var warElt = warFriendsList[Math.floor(Math.random() * warFriendsList.length)];
    }

    // Html attributes has been changed by Zynga, disable autoWar
    if (!warElt || (warElt && !warElt.getAttribute('onclick').match(/target_id=(\d+)/))) {
      DEBUG('War elements changed by Zynga, disabling autoWar.');
      GM_getValue('autoWar', 0)
      return false;
    }
    warElt.target_id = RegExp.$1;

    // Create clickable element for war list
    if (GM_getValue('warMode', 0) == 1)  {
      var tmpWarTargets = GM_getValue('autoWarTargetList');
      if (tmpWarTargets) {
        tmpWarTargets = tmpWarTargets.split('\n');
        var thisAutoWarTarget = tmpWarTargets[0];

        // Fake the target id
        warElt.target_id = thisAutoWarTarget;
        warElt.setAttribute('onclick', warElt.getAttribute('onclick').replace(RegExp.$1, thisAutoWarTarget));

        DEBUG('Auto War Target = ' + thisAutoWarTarget);
      } else {
        // Target is not set, declare war on a random friend
        addToLog('warning Icon','Invalid war target (id='+thisAutoWarTarget+'). Declaring war on a random friend.');
      }
    }

    // War!!!
    Autoplay.fx = function() {
      clickAction = action;
      clickContext = warElt;
      clickElement(warElt);
      DEBUG('Clicked to start a new war.');
    };
    Autoplay.start();
    return true;
  }
}

function autoGiftWaiting() {
  var autoCheckButton = xpathFirst('.//table//tbody//tr//td//a[contains(text(), "Click here to see it")]', innerPageElt);
  if (autoCheckButton) {
    Autoplay.fx = function() {
      clickElement(autoCheckButton);
      DEBUG('Clicked to see the waiting gifts.');
    };
    Autoplay.start();
    return true;
  }

  return false;
}

// This function will retrieve the top mafia info
// FIXME: Create a TopMafia object should we need the TopMafia info to persist
function getTopMafiaInfo() {
  // Load My Mafia
  if (!onMyMafiaNav()) {
    Autoplay.fx = goMyMafiaNav;
    Autoplay.start();
    return true;
  }

  // Load My Mafia Tab
  if (!onMyMafiaTab()) {
    Autoplay.fx = goMyMafiaTab;
    Autoplay.start();
    return true;
  }

  // Get the wheelman bonus.
  var elt = xpathFirst('.//span[@class="good" and contains(text(), "Less Energy")]', innerPageElt);
  if (elt && elt.innerHTML.untag().match(/(\d+)%/)) {
    var bonus = parseInt(RegExp.$1);
    if (bonus && (bonus !== GM_getValue('selectEnergyBonus')) || (isUndefined('selectEnergyBonus'))) {
      GM_setValue('selectEnergyBonus', bonus);
      DEBUG('Set Wheelman bonus to ' + GM_getValue('selectEnergyBonus') + '%');
      didJobCalculations = false;
    }
  } else {
    if (isUndefined('selectEnergyBonus')) {
      GM_setValue('selectEnergyBonus', 0);
      addToLog('warning Icon', 'Can\'t find Wheelman bonus, setting Wheelman bonus to ' + GM_getValue('selectEnergyBonus') + '%');
      didJobCalculations = false;
    } else {
      addToLog('warning Icon', 'Can\'t find Wheelman bonus');
    }
  }

  // Get the mastermind bonus.
  var elt = xpathFirst('.//span[@class="good" and contains(text(), "More Experience")]', innerPageElt);
  if (elt && elt.innerHTML.untag().match(/(\d+)%/)) {
    var bonus = parseInt(RegExp.$1);
    if (bonus && (bonus !== GM_getValue('selectExpBonus')) || (isUndefined('selectExpBonus'))) {
      GM_setValue('selectExpBonus', bonus);
      DEBUG('Set Mastermind bonus to ' + GM_getValue('selectExpBonus') + '%');
      didJobCalculations = false;
    }
  } else {
    if (isUndefined('selectExpBonus')) {
      GM_setValue('selectExpBonus', 0);
      addToLog('warning Icon', 'Can\'t find Mastermind bonus, setting Mastermind bonus to ' + GM_getValue('selectExpBonus') + '%');
      didJobCalculations = false;
    } else {
      addToLog('warning Icon', 'Can\'t find Mastermind bonus');
    }
  }

  setGMTime('topMafiaTimer','1 hour');
  return true;
}

// This function returns false if nothing was done, true otherwise.
function propertyBuy() {
  var buyCost = parseInt(GM_getValue('buyCost', 0));
  var buyMinAmount = parseInt(GM_getValue('buyMinAmount', 0));

  // Make sure there something to buy and the amounts are valid.
  if (!buyCost || isNaN(buyMinAmount) || !cities[NY][CITY_CASH]) return false;

  // Make sure enough cash will be left over.
  if (buyCost > cities[NY][CITY_CASH] - buyMinAmount) return false;

  // Make sure we're in New York.
  if (city != NY) {
    Autoplay.fx = goNY;
    Autoplay.start();
    return true;
  }

  if (!onPropertyNav()) {
    if (onRacketNav()) {
      GM_setValue('autoBuy', 0);
      DEBUG("Turning property buy off. We have rackets.");
    } else {
      Autoplay.fx = goPropertyNav;
      Autoplay.start();
      return true;
    }
  }

  var buyType = GM_getValue('buyType', 0);
  var buyName = GM_getValue('buyName', '');
  var buySelection = GM_getValue('selectProperties', '');
  var buyRequired  = GM_getValue('buyRequired', '');
  var buySuccess = false;
  DEBUG('Auto-buy: name=' + buyName + ', id=' + buyType + ', cost=' + buyCost + ', req=' + buyRequired + ', mafia=' + mafia);
  if (buyType > 0 && (buyRequired || buySelection.indexOf(buyName) > -1)) {
    var buyamountSelects = xpathFirst('.//form[@id="propBuy_' + buyType + '"]/table/tbody/tr/td/select[@name="amount"]', innerPageElt);
    if (buyamountSelects && buyamountSelects.length) {
      buyamountSelects[buyamountSelects.length - 1].selected = true;
      var buyform = xpathFirst('.//form[@id="propBuy_' + buyType + '"]/table/tbody/tr/td[2]/span/input', innerPageElt);
      if (buyform) {
        buySuccess = true;
        buyform.click();
        return true;
      }
    }
  } else {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t buy ' + buyName + '.');
  }

  return false;
}

function onHome() {
  // Return true if we're on the home page, false otherwise.
  if (xpathFirst('.//div[@class="playerupdate_box"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onLottoNav() {
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Play")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onWarNav() {
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Declare War")]', innerPageElt)) {
    return true;
  }
  return false;
}

function onPropertyNav() {
  // Return true if we're on the property nav, false otherwise.
  if (city == NY && xpathFirst('.//input[@name="buy_props"]', innerPageElt)) {
    return true;
  }

  return false;
}

function onProfileNav() {
  // Return true if we're on the profile nav, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_off")]//a[contains(., "Achievements")]', innerPageElt)) {
    return true;
  }

  return false;
}

function onMyMafiaNav() {
  // Return true if we're on My Mafia nav, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_first")]//a[contains(., "Recruit")]', innerPageElt)) {
    return true;
  }

  return false;
}

function onRacketNav() {
  if (city == NY && xpathFirst('.//div[@class="racket_hood_name" and contains(.,"Little Italy")]', innerPageElt)) {
    return true;
  }

  return false;
}

function onFightTab() {
  // Return true if we're on the fight tab, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "Fight")]', innerPageElt)) {
    return true;
  }

  return false;
}

function onHitlistTab() {
  // Return true if we're on the hitlist tab, false otherwise.
  if (xpathFirst('.//table[@class="hit_list"]', innerPageElt)) {
    return true;
  }

  return false;
}

function propertyGet() {
//FIXME: Why is reloading necessary? If it is, then the caller should be
//       checking this function's return value. If it isn't necessary
//       then it should be removed.
  var reloadProperty = false;

  if (running) {
    // check for messages
    var messageCheck = xpathFirst('.//div[@class="message_float"]', innerPageElt);

    if (messageCheck) {
      messageCheck = messageCheck.innerHTML.untag();
      if (messageCheck.match(/you just bought (.*) for ([A-Z]?\$[\d,]*\d)/i)) {
        addToLog(cities[city][CITY_CASH_CSS], '<strong>Bought</strong> ' +
                 '<span class="good">' +
                 RegExp.$1 + '</span>' + ' for ' +
                 '<span class="expense">' + RegExp.$2 + '</span>.');
      } else {
        addToLog('warning Icon', 'Auto-buy error: ' + messageCheck);
      }
      reloadProperty = true;

    } else {
      var messageCheck = xpathFirst('.//td[@class="message_body"]', innerPageElt);
      if (messageCheck) {
        messageCheck = messageCheck.innerHTML.untag();
        if (messageCheck.match(/successfully sold (.*) for ([A-Z]?\$[\d,]*\d)/i)) {
          addToLog(cities[city][CITY_CASH_CSS], '<strong>Sold</strong> ' +
                   '<span class="bad">' +
                   RegExp.$1 + '</span>' + ' for ' +
                   '<span class="money">' + RegExp.$2 + '</span>.');
        } else {
          addToLog('info Icon', messageCheck);
        }
        reloadProperty = true;
      }
    }
  }

  var allPropertyRowsPath = './/table[@class="main_table"]/tbody/tr';
  var allPropertyRows = xpath(allPropertyRowsPath, innerPageElt);

  // get number of payments per day
  var tempObj = xpathFirst('.//div[contains(text(), "Cash Flow")]', innerPageElt);
  if (tempObj && tempObj.innerHTML.match(/every (.+) minutes/i)) {
    var payments = 1440 / parseInt(RegExp.$1);
  } else {
    var payments = 24;
  }

  if (allPropertyRows.snapshotLength > 0) {
    var allProperties = new Array();
    var bestProperty = { id:false, roi:0, row:0 };
    var selectProperties = GM_getValue('selectProperties');
    if (!selectProperties && isChecked('autoBuy')) {
      addToLog('warning Icon', 'Auto-buy cannot work because no properties have been selected in the Properties tab of the settings menu. Turning auto-buy off.');
      GM_setValue('autoBuy', 0);
    }

    for (var currentRow = 0, numRows=allPropertyRows.snapshotLength; currentRow < numRows; ++currentRow) {
      var currentRowHtml = allPropertyRows.snapshotItem(currentRow).innerHTML;

      if (/prop_[\w\d]+\.jpg/.test(currentRowHtml)) {
        var currentProperty = { id:0, roi:0, cost:0, name:'', row:0, path:'', income:0, mobsize:0, amount:0, owned:0, requiredId:0, requiredCost:0, requiredName:'' }
        var currentRowXpath = allPropertyRowsPath + "[" + (currentRow+1) + "]/";

        // get id
        var tempObj = xpathFirst(currentRowXpath + 'td[3]/table/tbody/tr/td[2]/form/table/tbody/tr/td/input[@name="property"]', innerPageElt);
        if (tempObj) {
          currentProperty.id = tempObj.value;
        }

        // get required mafia size
        tempObj = xpathFirst(currentRowXpath + "td[3]/table/tbody/tr[1]/td[1]", innerPageElt);
        if (tempObj) {
          currentProperty.mobsize = tempObj.innerHTML.match(/<strong>(\d+)<\/strong>/) ? parseInt(RegExp.$1) : 0;
        }

        // get max buy amount and select
        tempObj = xpathFirst('.//form[@id="propBuy_' + currentProperty.id + '"]/table/tbody/tr/td/select[@name="amount"]', innerPageElt);
        if (tempObj) {
          if (tempObj.length) {
            currentProperty.amount = tempObj.length;
            tempObj[currentProperty.amount - 1].selected = true;
          }
        }

        // get name & income
        tempObj = xpath(currentRowXpath + "td[2]/strong | " + currentRowXpath + "td[2]/div/strong", innerPageElt);
        if (tempObj.snapshotLength > 1) {
          currentProperty.name = tempObj.snapshotItem(0).innerHTML;
          currentProperty.income = parseCash(tempObj.snapshotItem(1).innerHTML);
        }

        //tempObj = xpath(currentRowXpath + "/td[3]/table/tbody/tr[2]/td | " + currentRowXpath + "td[2]/div/strong", innerPageElt);

        // get cost
        tempObj = xpathFirst(currentRowXpath + "td[3]/table/tbody/tr[1]/td", innerPageElt);
        if (tempObj) {
          tempObj = tempObj.innerHTML;
          if (tempObj) {
            // cost of required undeveloped space
            if (tempObj.match(/Built on: ([\w\s]+)/i)) {
              for (var j = 0, numProps=allProperties.length; j < numProps; ++j) {
                if (allProperties[j].name == RegExp.$1) {
                  var property = allProperties[j];
                  currentProperty.requiredCost = property.cost;
                  if (property.owned < currentProperty.amount) {
                    currentProperty.requiredId   = property.id;
                    currentProperty.requiredName = property.name;
                  }
                  break;
                }
              }
            }
            // cost of property
            if (tempObj.match(REGEX_CASH)) {
              currentProperty.cost = parseCash(RegExp.lastMatch);
            }
          }
        }

        // get number of owned
        tempObj = xpathFirst(currentRowXpath + "td[3]/table/tbody/tr[2]/td", innerPageElt);
        if (tempObj && tempObj.innerHTML.match(/(\d+)/)) {
          currentProperty.owned = RegExp.$1;
        } else {
          tempObj = xpathFirst(currentRowXpath + "td[2]/div/strong[2]", innerPageElt);
          if (tempObj && tempObj.innerHTML.match(/(\d+)/)) {
            currentProperty.owned = RegExp.$1;
          }
        }

        // calculate roi and check if its the highest
        if (currentProperty.income > 0 && currentProperty.cost > 0) {
          currentProperty.roi = currentProperty.income / (currentProperty.cost + currentProperty.requiredCost);
          if (selectProperties.indexOf(currentProperty.name) != -1 && bestProperty.roi < currentProperty.roi && mafia >= currentProperty.mobsize) {
            bestProperty = currentProperty;
            bestProperty.row  = currentRow;
            bestProperty.path = xpathFirst(currentRowXpath + "td[3]/table/tbody/tr[1]/td/strong", innerPageElt);
          }
        }

        // display roi & total income on page
        if (currentProperty.roi > 0) {
          var tempItem = xpath(currentRowXpath + 'td[2]/strong', innerPageElt).snapshotLength == 1 ? 0 : 1;
          var roiText = xpath(currentRowXpath + 'td[2]/div', innerPageElt);
          roiText = makeElement('div', roiText.snapshotItem(tempItem), {'style':'margin:10px 0 10px 0; font-size:13px'});
          roiText.appendChild(document.createTextNode('Total Income: $' + makeCommaValue(currentProperty.owned * currentProperty.income)));
          roiText.appendChild(document.createElement("br"));
          roiText.appendChild(document.createTextNode('ROI: '));
          makeElement('strong', roiText, { 'style':'color:#FFD927'}).appendChild(document.createTextNode(''+Math.round(currentProperty.roi*100000000)/100000));
          var roiTime = (1/currentProperty.roi) / payments; // days
          if (roiTime > 3652.5) { // display years
            roiTime /= 365.25;
            var roiTimeText = ' years)';
          } else if (roiTime > 365.25) { // display months
            roiTime /= 30.4375;
            var roiTimeText = ' months)';
          } else {
            var roiTimeText = ' days)';
          }
          roiText.appendChild(document.createTextNode(' (' + (Math.round(roiTime * 100) / 100) + roiTimeText));
        }

        allProperties.push(currentProperty);
      }
    }

    // highlight best property
    if (bestProperty.row > 0) {
      allPropertyRows.snapshotItem(bestProperty.row).style.backgroundColor="#020";
      best = makeElement('div', bestProperty.path, {'style':'color:#52E259; font-size: 10px; margin-top:10px'});
      makeElement('img', best, {'src':stripURI(goodIcon), 'width':'12', 'height':'12', 'style':'vertical-align:middle'});
      best.appendChild(document.createTextNode(' BEST'));
    }

    if (isChecked('autoBuy')) {
      if (bestProperty.amount) {
        // Display next property for auto-buy.
        if (bestProperty.requiredId > 0) {
          makeElement('div', xpathFirst('.//div[@class="text"]', innerPageElt), {'style':'margin-top:12px'}).appendChild(document.createTextNode('Next auto-buy property: ' + bestProperty.amount + 'x ' + bestProperty.requiredName + ' ($' + makeCommaValue(bestProperty.requiredCost * bestProperty.amount) + ') to build ' + bestProperty.name));
        } else {
          makeElement('div', xpathFirst('.//div[@class="text"]', innerPageElt), {'style':'margin-top:12px'}).appendChild(document.createTextNode('Next auto-buy property: ' + bestProperty.amount + 'x ' + bestProperty.name + ' ($' + makeCommaValue(bestProperty.cost * bestProperty.amount) + ')'));
        }

        // Remember the next property for auto-buy.
        if (bestProperty.requiredId > 0 && (GM_getValue('buyType', 0) != bestProperty.requiredId || GM_getValue('buyCost', 0) != bestProperty.requiredCost * bestProperty.amount)) {
          GM_setValue('buyName', bestProperty.requiredName);
          GM_setValue('buyType', bestProperty.requiredId);
          // Save as a string because 32-bit integers aren't big enough.
          GM_setValue('buyCost', '' + bestProperty.requiredCost * bestProperty.amount);
          GM_setValue('buyRequired', true);
          addToLog('process Icon', 'Next auto-buy property: ' + bestProperty.amount + 'x <span class="good">' + bestProperty.requiredName + '</span> (<span class="expense">$' + makeCommaValue(bestProperty.requiredCost * bestProperty.amount) + '</span>) to build ' + bestProperty.name);
        } else if (GM_getValue('buyType', 0) != bestProperty.id || GM_getValue('buyCost', 0) != bestProperty.cost * bestProperty.amount) {
          GM_setValue('buyName', bestProperty.name);
          GM_setValue('buyType', bestProperty.id);
          // Save as a string because 32-bit integers aren't big enough.
          GM_setValue('buyCost', '' + bestProperty.cost * bestProperty.amount);
          GM_setValue('buyRequired', false);
          addToLog('process Icon', 'Next auto-buy property: ' + bestProperty.amount + 'x <span class="good">' + bestProperty.name + '</span> (<span class="expense">$' + makeCommaValue(bestProperty.cost * bestProperty.amount) + '</span>)');
        }

        DEBUG('Next auto-buy: name=' + GM_getValue('buyName', '') + ', id=' + GM_getValue('buyType', '') + ', cost=' + GM_getValue('buyCost', '') + ', req=' + GM_getValue('buyRequired', '') + ', reqMafia=' + bestProperty.mobsize + ', mafia=' + mafia);
      } else {
        // Nothing available to buy.
        GM_setValue('buyCost', 0);
        makeElement('div', xpathFirst('.//div[@class="text"]', innerPageElt), {'style':'margin-top:12px'}).appendChild(document.createTextNode('Next auto-buy property: Nothing available for purchase.'));
        addToLog('process Icon', 'Next auto-buy property: Nothing available for purchase.');
      }
    }
  }

  if (reloadProperty == true) {
    Autoplay.fx = goPropertyNav;
    Autoplay.delay = getAutoPlayDelay();
    Autoplay.start();
    return true;
  }

  return false;
}

function loadHome() {
  document.location = 'http://apps.facebook.com/inthemafia/index.php';
}

function loadBank() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'bank' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadJobTab(tabno) {
  DEBUG('Switching to job tab ' + tabno + '.');
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'job' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1) +
                      '&tab=' + tabno +
                      '&bar=' + (tabno < 6? '0' : '1');
}

function loadFightNav() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'fight' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadPropertyNav() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'property' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadBusinessesNav() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'business' +
                      SCRIPT.action + 'view' +
                      SCRIPT.city + (city + 1);
}

function loadAccept() {
  var link = 'http://apps.facebook.com/' + SCRIPT.name +
             SCRIPT.controller + 'recruit' +
             SCRIPT.action + 'accept' +
             SCRIPT.user + 'all';

  if (document.location == link) {
    // Sometimes the "+XX" still displays after accepting by URL.
    DEBUG('Already invited; reloading to clear masthead.');
    loadHome();
    return;
  }

  // Accept all invitations.
  addToLog('process Icon', 'Accepting ' + invites + ' mafia ' +
           (invites > 1 ? ' invites.' : ' invite.'));
  window.location = link;
  return;
}

function loadDeleteNews() {
  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'index' +
                      SCRIPT.action + 'deletenews' +
                      SCRIPT.city + (city + 1);
}

function loadLocation(toCity) {
  var cityDest = parseInt(toCity);

  if (cityDest < 0 || cityDest >= cities.length) {
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized destination "' + cityDest + '".');
      return;
  }

  document.location = 'http://apps.facebook.com/' + SCRIPT.name +
                      SCRIPT.controller + 'travel' +
                      SCRIPT.action + 'travel' +
                      SCRIPT.city + (city + 1) +
                      '&destination=' + (cityDest + 1) +
                      '&from=index';
}

function goLinkElement(elt) {
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Null element passed to goLinkElement().');
    return;
  }

  clickElement(elt);
  DEBUG('Clicked element.');
}

function goHome() {
  // Find the visible home link.
  var elts = $x('//div[@class="nav_link home_link"]//a');
  var elt;
  for (var i = 0, numElts=elts.length; i < numElts; ++i) {
    if (elts[i].scrollWidth) {
      elt = elts[i];
      break;
    }
  }
  if (!elt) {
    DEBUG('Can\'t find home link to click. Using fallback method.');
    loadHome();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go home.');
}

function goProfileNav(player) {
  var elt = player.profile;
  if (!elt) {
    elt = xpathFirst('.//table[@class="main_table fight_table"]//a[contains(@href, "xw_controller=stats")]', innerPageElt);
    if (elt && elt.getAttribute('onclick').match(/user=(\w+)/)) {
      elt.setAttribute('onclick', elt.getAttribute('onclick').replace(RegExp.$1, player.id));
    } else {
      DEBUG("Couldnt find profile link");
      goFightNav();
      return;
    }
  }
  clickElement(elt);
  DEBUG('Clicked to load profile (id=' + player.id + ').');
}

function goMyProfile() {
  var elt = xpathFirst('.//div[@class="nav_link profile_link"]//a[contains(.,"Profile")]');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find Profile nav link to click.');
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to load my own profile.');
}

function goMyMafiaNav() {
  var elt = xpathFirst('.//div[@class="mafia_link"]//a[contains(.,"My Mafia")]');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find My Mafia nav link to click.');
    return;
  } else {
    var eltProfile = xpathFirst('.//div[@class="nav_link profile_link"]//a[contains(.,"Profile")]');
    if (eltProfile) {
      elt.setAttribute('onclick',eltProfile.getAttribute('onclick').replace(/xw_controller=stats/i,'xw_controller=recruit'));
    }
  }
  clickElement(elt);
  DEBUG('Clicked to load My Mafia nav.');
}

function goMyMafiaTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(., "My Mafia")]', innerPageElt);
  if (!elt) {
    goMyMafiaNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to My Mafia tab.');
}

function onMyMafiaTab() {
  // Return true if we're on the My Mafia tab, false otherwise.
  if (xpathFirst('.//li[contains(@class, "tab_on")]//a[contains(., "My Mafia")]', innerPageElt)) {
    return true;
  }

  return false;
}

function goWarNav() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(., "Declare War")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to Declare war.');
}

function goBank() {
  var elt = xpathFirst('//a[@class="bank_deposit"]');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find bank link to click. Using fallback method.');
    loadBank();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to bank.');
}

function goJobsNav() {
  var elt = xpathFirst('//div[@class="nav_link jobs_link"]/a');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find jobs nav link to click.');
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to jobs.');
}

function goJobTab(tabno) {
  var currentTab = currentJobTab();
  if (currentTab == -1) {
    // We're not even on a jobs page yet. Go there.
    goJobsNav();
    return;
  }
  if (currentTab == tabno) {
    DEBUG('Already on job tab ' + tabno + '.');
    return;
  }

  // No job tab. Make sure we're on the correct job bar.
  var barno = city == NY? (tabno < 6? 0 : 1) : 0;
  var currentBar = city == NY? (currentTab < 6? 0 : 1) : 0;
  if (currentBar != barno) {
    var elt = xpathFirst('.//ul[@id="jobs_bar' + barno + '"]//a[contains(@onclick, "&bar=' + barno + '")]', innerPageElt);
    if (!elt) {
      addToLog('warning Icon', 'BUG DETECTED: Can\'t find jobs bar ' + barno + ' link to click. Currently on job bar ' + currentBar + ', tab ' + currentTab + '.');
      return;
    }
    clickElement(elt);
    DEBUG('Clicked to go to job bar ' + barno + '.');
    return;
  }

  if (city == MOSCOW) {
    var elt = xpathFirst('.//ul[@id="jobs_bar' + barno + '"]//a[contains(@onclick, "&episode_tab=' + tabno + '")]', innerPageElt);
  } else {
    var elt = xpathFirst('.//ul[@id="jobs_bar' + barno + '"]//a[contains(@onclick, "&tab=' + tabno + '")]', innerPageElt);
  }
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Can\'t find job bar ' + barno + ', tab ' + jobno + ' link to click. Currently on job bar ' + currentBar + ', tab ' + currentTab + '.');
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to job tab ' + tabno + '.');
}

function goJob(jobno, context) {
  var elt = xpathFirst('.//table[@class="job_list"]//a[contains(@onclick, "job=' + jobno + '&")]', innerPageElt);

  if (elt) {
    clickAction = 'job';
    clickContext = context;
    clickElement(elt);
    DEBUG('Clicked job ' + jobno + '.');
  } else {
    xJob = missions[GM_getValue('selectMission')][0];
    setJobReqs (innerPageElt);
    popJob();
    goJobsNav();
  }
}

function goFightNav() {
  var elts = $x('//div[@class="nav_link fight_link"]//a');
  var elt;
  for (var i = 0, numElts=elts.length; i < numElts; ++i) {
    if (elts[i].scrollWidth) {
      elt = elts[i];
      break;
    }
  }
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find fight nav link to click. Using fallback method.');
    loadFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to fights.');
}

function goFightTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(., "Fight")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to fight tab.');
}

function goHitlistTab() {
  var elt = xpathFirst('.//div[@class="tab_content"]//a[contains(., "Hitlist")]', innerPageElt);
  if (!elt) {
    goFightNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to hitlist.');
}

function goPropertyNav() {
  var elts = $x('//div[@class="nav_link properties_link"]//a');
  var elt;
  for (var i = 0, numElts=elts.length; i < numElts; ++i) {
    if (elts[i].scrollWidth) {
      elt = elts[i];
      break;
    }
  }
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find properties nav link to click. Using fallback method.');
    loadPropertyNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to properties.');
}

function goBusinessesNav() {
  var elt = xpathFirst('//*[@id="nav_link_businesses"]//a');
  if (!elt) {
    addToLog('warning Icon', 'Can\'t find businesses nav link to click. Using fallback method.');
    loadBusinessesNav();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to go to businesses.');
}

function goDeleteNews() {
  var elt = xpathFirst('//a[contains(text(), "Clear Updates")]');
  if (!elt) {
    DEBUG('Can\'t find delete news link to click. Using fallback method.');
    loadDeleteNews();
    return;
  }
  clickElement(elt);
  DEBUG('Clicked to delete news.');
}

function goNY() {
  goLocation(NY);
}

function goCuba() {
  goLocation(CUBA);
}

function goMoscow() {
  goLocation(MOSCOW);
}

function goLocation(toCity) {
  if (toCity == city) {
    DEBUG('Already in ' + cities[toCity][CITY_NAME] + '.');
    return;
  }

  // Find and click the travel element for the given destination.
  var elt = xpathFirst('//div[@id="travel_menu"]//a[contains(., "' + cities[toCity][CITY_NAME] + '")]');

  if (elt) {
    clickElement(elt);
    DEBUG('Clicked to travel to ' + cities[toCity][CITY_NAME] + '.');
    return;
  }

  addToLog('warning Icon', 'Unable to find ' + cities[toCity][CITY_NAME] +
           ' travel link. Using fallback method.');
  loadLocation(toCity);
}

function handleResponse(responseDetails, action, context) {
  //  DEBUG('handleResponse: status='+ responseDetails.status);
  //  DEBUG('handleResponse: statusText='+ responseDetails.statusText);
  //  DEBUG('handleResponse: responseHeaders='+ responseDetails.responseHeaders);
  //  DEBUG('handleResponse: responseText='+ responseDetails.responseText);

  // Check for error pages.
  if (responseDetails.responseText.indexOf('Error while loading page') != -1) {
    DEBUG('Response: "Error while loading page..." (service interruption)');
    return;
  }
  if (responseDetails.responseText.indexOf('request was not processed') != -1) {
    DEBUG('Request was not processed.');
    return;
  }
  if (responseDetails.responseText.indexOf('Login to Facebook') != -1) {
    addToLog('warning Icon', '<span class="warn">WARNING:</span> Reached the Mafia Wars login page.');
    addToLog('warning Icon', '<span class="warn">Please adjust your browser\'s settings to allow third-party cookies.</span>');
    addToLog('warning Icon', '<span class="warn">Or is this Facebook user logged in on another computer?</span>');
    return;
  }

  // Interpret the response.
  var doc = document.createElement('div');
  doc.innerHTML = responseDetails.responseText;
  logResponse(doc, action, context);
}

//ATK
//Hourly Stats Tracking - Experimental Work in Progress
function updateHourlyStats() {
//Planned data package order:  [0]Hour of the Day |
//  [1]NY Fight Exp | [2]NY Fight Win Count   | [3]NY Fight Loss Count | [4]NY Fight $ Won | [5]NY Fight $Lost |
//  [6]NY Rob Exp   | [7]NY Rob Success Count | [8]NY Rob Fail Count   | [9]NY Rob $Won    | [10]NY Rob $Lost  |
//  [11]NY Fight Loss Crit Hit Count | [12]NY Fight Loss Bodyguard Count | [13]NY Fight Loss Too Strong Count |
//  Variables below not yet created
//  [x]NY Capo $US | [x]NY Assist Exp | [x]NY Assist $US |
//  [x]NY Attacked Exp(net after deaths) | [x]NY Attacked $Won | [x]NY Attacked $Lost |
//  [x]NY Robbed Exp                     | [x]NY Robbed $Won   | [x]NY Robbed $Lost   |
//  [x]NY Job Count | [x]NY Job Exp | [x]NY Job $Made |
//  >>> BEGIN CUBA <<<
//  [x]Cuba Fight Exp | [x]Cuba Fight Win Count | [x]Cuba Fight Loss Count | [x]Cuba Fight $C Won | [x]Cuba Fight $C Lost |
//  [x]Cuba Fight Loss Crit Hit Count | [x]Cuba Fight Loss Bodyguard Count | [x]Cuba Fight Loss Too Strong Count |
//  [x]Cuba Capo $C | [x]Cuba Assist Exp | [x]Cuba Assist $C |
//  [x]Cuba Attacked Exp(net after deaths) | [x]Cuba Attacked $C Won | [x]Cuba Attacked $C Lost |
//  [x]Cuba Robbed Exp                     | [x]Cuba Robbed $C Won   | [x]Cuba Robbed $C Lost   |
//  [x]Cuba Job Count | [x]Cuba Job Exp | [x]Cuba Job $C Made

//  Max potential storage 41 * 24 = 984 elements

  var currentTime = new Date();
  var currentHour = currentTime.getHours();

  var hrDataPack = "";
  hrDataPack = currentHour + '|' + GM_getValue('fightExpNY', 0) + '|' + GM_getValue('fightWinsNY', 0) + '|' +
     GM_getValue('fightLossesNY', 0) + '|' + GM_getValue('fightWin$NY', 0) + '|' + GM_getValue('fightLoss$NY', 0) + '|' +
     GM_getValue('fightLossCHNY', 0) + '|' + GM_getValue('fightLossBGCHNY', 0) + '|'+ GM_getValue('fightLossStrongNY', 0);

  if (GM_getValue('hourlyStats', '0') == '0') {
    GM_setValue('hourlyStats', hrDataPack);
  } else {
    //pull existing stored hourly stats
    var splitValues = GM_getValue('hourlyStats', '').split(',');
    if (splitValues.length < 24) {
      splitValues.push(currentHour + '|0|0|0|0|0|0|0|0');
    }else {
      if ((GM_getValue('hourOfDay')*1 == 23 && currentHour != 0 )|| currentHour -1 != GM_getValue('hourOfDay')*1 && GM_getValue('hourOfDay') != isNaN(GM_getValue('hourOfDay'))){
        //We missed some hours so we need to carry the last good values forward
        if (GM_getValue('hourOfDay')*1 > currentHour){
          var tempHour = currentHour + 24;
        }else{
          var tempHour = currentHour;
        }

        for (var i = GM_getValue('hourOfDay')*1 + 1; i < GM_getValue('hourOfDay')*1 + (tempHour - GM_getValue('hourOfDay')*1); i++){
          var valString = splitValues[GM_getValue('hourOfDay')];
          valString = valString.substring(valString.indexOf('|'), valString.length);
          if (i > 23){
            splitValues.push(String(i-24) + valString);
          }else {
            splitValues.push(i + valString);
          }
        }
      }
    }
    //create temp arrays
    var hourlyFightExpNY = new Array(24);     //position [1]
    var hourlyFightWinsNY = new Array(24);    //position [2]
    var hourlyFightLossesNY = new Array(24);  //position [3]
    var hourlyFightWin$NY = new Array(24);    //position [4]
    var hourlyFightLoss$NY = new Array(24);   //position [5]
    var hourlyLossCrHitNY = new Array(24);    //position [6]
    var hourlyLossBgCrHitNY = new Array(24);  //position [7]
    var hourlyLossStrongNY = new Array(24);   //position [8]

    // Organize Hourly stat data into ordered sets
    for (var i = 0; i < splitValues.length; i++){
      //check length of each datapack to ensure it is the right size and fills missing with zeroes
      //this addresses issues when adding new metrics to the datapackage
      if (splitValues[i].split('|').length < 9) {
        for (var n = splitValues[i].split('|').length; n < 9; n++){
          splitValues[i] += '|0';
        }
      }
      if (splitValues[i].split('|')[0] == currentHour) {
        //pull data from same time day prior for "25th" hour
        var fightExpNY25 = splitValues[i].split('|')[1]*1;
        var fightWinsNY25 = splitValues[i].split('|')[2]*1;
        var fightLossesNY25 = splitValues[i].split('|')[3]*1;
        var fightWin$NY25 = splitValues[i].split('|')[4]*1;
        var fightLoss$NY25 = splitValues[i].split('|')[5]*1;
        var fightLossCrHitNY25 = splitValues[i].split('|')[6];
        var fightLossBgCrHitNY25 = splitValues[i].split('|')[7];
        var fightLossStrongNY25 = splitValues[i].split('|')[8];
        //Insert current hour values
        hourlyFightExpNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[1]*1;
        hourlyFightWinsNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[2]*1;
        hourlyFightLossesNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[3]*1;
        hourlyFightWin$NY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[4]*1;
        hourlyFightLoss$NY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[5]*1;
        hourlyLossCrHitNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[6]*1;
        hourlyLossBgCrHitNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[7]*1;
        hourlyLossStrongNY[splitValues[i].split('|')[0]] = hrDataPack.split('|')[8]*1;
      } else {
        //populate other hourly data
        hourlyFightExpNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[1]*1;
        hourlyFightWinsNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[2]*1;
        hourlyFightLossesNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[3]*1;
        hourlyFightWin$NY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[4]*1;
        hourlyFightLoss$NY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[5]*1;
        hourlyLossCrHitNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[6]*1;
        hourlyLossBgCrHitNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[7]*1;
        hourlyLossStrongNY[splitValues[i].split('|')[0]] = splitValues[i].split('|')[8]*1;
      }
    }

//Prep Arrays for hourly graphing
    var fightExpNY = prepStatsArray(hourlyFightExpNY, currentHour);
    var fightWinsNY = prepStatsArray(hourlyFightWinsNY, currentHour);
    var fightLossesNY = prepStatsArray(hourlyFightLossesNY, currentHour);
    var fightWin$NY = prepStatsArray(hourlyFightWin$NY, currentHour);
    var fightLoss$NY = prepStatsArray(hourlyFightLoss$NY, currentHour);
    var fightLossCHNY = prepStatsArray(hourlyLossCrHitNY, currentHour);
    var fightLossBGCHNY = prepStatsArray(hourlyLossBgCrHitNY, currentHour);
    var fightLossStrongNY = prepStatsArray(hourlyLossStrongNY, currentHour);

//Add 25th hour data to beginning of graphing arrays
    fightExpNY.unshift(fightExpNY25);
    fightWinsNY.unshift(fightWinsNY25);
    fightLossesNY.unshift(fightLossesNY25);
    fightWin$NY.unshift(fightWin$NY25);
    fightLoss$NY.unshift(fightLoss$NY25);
    fightLossCHNY.unshift(fightLossCrHitNY25);
    fightLossBGCHNY.unshift(fightLossBgCrHitNY25);
    fightLossStrongNY.unshift(fightLossStrongNY25);

//create hour labels based on current hour
    var hourLabels = "";
    for (i = 0; i < 24; i += 2) {
      var ind;
      var hrdisp;
      ind = (currentHour *1) - i;
      if (ind < 0) {ind = 24 + ind;}
      if (ind > 11) {hrdisp = String((12 - ind) * -1) + 'p';} else {hrdisp = String(ind) + 'a';}
      hrdisp = (hrdisp == '0a') ? '12a' : hrdisp;
      hrdisp = (hrdisp == '0p') ? '12p' : hrdisp;
      hourLabels = '|' + hrdisp + hourLabels;
    }
    hourLabels = '|' + hourLabels.split('|')[12] + hourLabels;

//lets make some graphs!
    //statSpecs Array Format: [0]Min, [1]Max. [2]Avg [3]Sum [4]Valid Data Count
    var statSpecsArrayA = [];
    var statSpecsArrayB = [];

    var graphOutput = "";

    //Gain rate per hour
    gainRateNY = [];
    for (var i = 0; i < fightWinsNY.length; i++) {
      gainRateNY[i] = fightExpNY[i]/(fightWinsNY[i] + fightLossesNY[i]);
      if (isNaN(gainRateNY[i])) { gainRateNY[i] = 0; }
      gainRateNY[i] = Math.round(gainRateNY[i] * Math.pow(10,2))/Math.pow(10,2);
    }
    statSpecsArrayA = getStatSpecs(gainRateNY, 0);
    graphOutput = '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=NY+Fight+Gain+Rate+per+Hr+of+Day|Min.+=+' + String(statSpecsArrayA[0]) + '+++Max.+=+' +String(statSpecsArrayA[1]) + '+++Avg+=+' + String(statSpecsArrayA[2]) + '/hr&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,04B4AE,0,0,4|o,05E6DE,0,-1.0,6&chd=t:' + String(gainRateNY) + '"/>';

    //NY Fight XP gains per hour
    var diffArrayA = getArrayDiffs(fightExpNY);
    statSpecsArrayA = getStatSpecs(diffArrayA, 0);
    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=Total+NY+Fight+XP+Gained+per+Hr+of+Day|Min.+=+' + String(statSpecsArrayA[0]) + '+++Max.+=+' +String(statSpecsArrayA[1]) + '+++Avg+=+' + String(statSpecsArrayA[2]) + '/hr&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,92ED97,0,0,4|o,25DA2E,0,-1.0,6&chd=t:' + String(diffArrayA) + '"/>';

    //NY Fight Wins/Losses since reset chart
    var NYfightWinPct = (GM_getValue('fightWinsNY', 0)/(GM_getValue('fightWinsNY', 0) + GM_getValue('fightLossesNY', 0)))*100;
    if (isNaN(NYfightWinPct)){NYfightWinPct = 0;} else {NYfightWinPct = Math.round(NYfightWinPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYfightLosePct = (GM_getValue('fightLossesNY', 0)/(GM_getValue('fightWinsNY', 0) + GM_getValue('fightLossesNY', 0)))*100;
    if (isNaN(NYfightLosePct)) {NYfightLosePct = 0; } else {NYfightLosePct = Math.round(NYfightLosePct * Math.pow(10, 1))/Math.pow(10, 1);}

    //NY Fight Loss Type breakdown pie
    var NYStrongLossPct = (GM_getValue('fightLossStrongNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYStrongLossPct)){NYStrongLossPct = 0;}else{NYStrongLossPct = Math.round(NYStrongLossPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYCHLossPct = (GM_getValue('fightLossCHNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYCHLossPct)){NYCHLossPct = 0;}else{NYCHLossPct = Math.round(NYCHLossPct * Math.pow(10, 1))/Math.pow(10, 1);}
    var NYBGCHLossPct = (GM_getValue('fightLossBGCHNY', 0)/GM_getValue('fightLossesNY', 0))*100;
    if (isNaN(NYBGCHLossPct)){NYBGCHLossPct = 0;}else{NYBGCHLossPct = Math.round(NYBGCHLossPct * Math.pow(10, 1))/Math.pow(10, 1);}

    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=p3&chf=bg,s,111111&chts=BCD2EA,12&chco=52E259|EC2D2D&chdl=' + String(NYfightWinPct) + '%|'+ String(NYfightLosePct) + '%&chdlp=t&chtt=NY+Fight+Wins+vs+Losses|since+stats+reset&chs=157x150&chd=t:' + String(NYfightWinPct) + ',' + String(NYfightLosePct) + '"/>' +
                          '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=p3&chf=bg,s,111111&chts=BCD2EA,12&chco=EC2D2D&chdl=CH:' + String(NYCHLossPct) + '%|BG:'+ String(NYBGCHLossPct) + '%|TS:'+ String(NYStrongLossPct) + '%&chdlp=t&chtt=NY+Fight+Losses+by+Type&chs=157x150&chd=t:' + String(NYCHLossPct) + ',' + String(NYBGCHLossPct) + ',' + String(NYStrongLossPct) + '"/><br>' +
                          '<span style="color:#888888;">CH = Critical Hit &#166; BG = Bodyguard Critical Hit &#166; TS = Too Strong</span>';

    //NY Fight $ Won/lost line graph
    statSpecsArrayA = getStatSpecs(fightWin$NY, 0);
    statSpecsArrayB = getStatSpecs(fightLoss$NY, 0);
    if (statSpecsArrayB[0]*1 < statSpecsArrayA[0]*1) {
      statSpecsArrayA[0] = statSpecsArrayB[0];
    }
    if (statSpecsArrayB[1]*1 > statSpecsArrayA[1]*1) {
      statSpecsArrayA[1] = statSpecsArrayB[1];
    }
    graphOutput += '<br><br>' + '<IMG SRC="' + 'http://chart.apis.google.com/chart?cht=ls&chf=bg,s,111111&chts=BCD2EA,12&chtt=Total+NY+Fight+$+Won+vs.+Lost+by+Hr+of+Day&chs=315x150&chxt=x,y&chxl=0:' + hourLabels + '&chxtc=0,10|1,-300&chxr=1,' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chds=' + statSpecsArrayA[0] + ',' + statSpecsArrayA[1] + '&chm=D,92ED97,0,0,4|o,25DA2E,0,-1.0,6|D,F05C5C,1,0,4|o,D21414,1,-1.0,6&chd=t:' + String(fightWin$NY) + '|' + String(fightLoss$NY) + '"/>';

    //addToLog('info Icon', graphOutput);
    graphOutput = '<span style="color:#669999;">Stats as of: ' + currentTime.toLocaleString() + '</span><br>' + graphOutput;
    GM_setValue('graphBox', graphOutput);

//re-pack hourly stats and save to GM variable
    hrDataPack = [];
    for (i = 0; i < 24; i++){
      hrDataPack[i]= i + '|' + hourlyFightExpNY[i] + '|' + hourlyFightWinsNY[i] + '|' + hourlyFightLossesNY[i] + '|' +
          hourlyFightWin$NY[i] + '|' + hourlyFightLoss$NY[i] + '|' + hourlyLossCrHitNY[i] + '|' + hourlyLossBgCrHitNY[i] +
          '|' + hourlyLossStrongNY[i];
    }
    GM_setValue('hourlyStats', String(hrDataPack));

  }
  GM_setValue('hourOfDay', String(currentHour));
}

function prepStatsArray(workingArray, currentHour){
  for (var i = 0; i < workingArray.length; i++){
    if (isNaN(workingArray[i])) {
      workingArray[i] = 0;
    }
  }
  currentHour = currentHour * 1;
  var outputVals = [];
  for (i = 0; i < 24; i++){
    var ind;
    ind = currentHour - i;
    if (ind < 0) {ind = 24 + ind}
      outputVals.unshift(workingArray[ind]);
  }
  return outputVals;
}

//statSpecs Array
//Return Format: [0]Min, [1]Max. [2]Avg [3]Sum [4]Valid Count
function getStatSpecs(workingArray, includeZeroVals){
  var tempArray = [];
  var runningSum = 0;
  for (var i = 0; i < workingArray.length; i++) {
    if (workingArray[i] != 0 && includeZeroVals == 0) {
      tempArray.push(workingArray[i]);
      runningSum += workingArray[i];
    }else {
      runningSum += workingArray[i];
    }
  }
  if (includeZeroVals == 0) {
    tempArray.sort( function (a, b) { return a-b});
    var dataLen = tempArray.length;
    var dataMin = tempArray[0];
    var dataMax = tempArray[dataLen - 1];
  } else {
    workingArray.sort( function (a, b) { return a-b});
    var dataLen = workingArray.length;
    var dataMin = workingArray[0];
    var dataMax = workingArray[dataLen - 1];
  }
  var dataAvg = runningSum/dataLen;
  dataAvg = Math.round(dataAvg*Math.pow(10, 2))/Math.pow(10, 2);
//  alert("Sum: " + runningSum + "    len: " + dataLen + "   avg: " + dataAvg);
  return[dataMin, dataMax, dataAvg, runningSum, dataLen];
}

// This function gets the users gift ID and also sets the ID of
// the recipient of gifts.
function saveRecipientInfo() {
  var giftKey = document.body.innerHTML.match(/gift_key=([0-9a-f]+)/) ? RegExp.$1 : 'Not Found';
  GM_setValue("giftKey", giftKey);

  var recipientID = document.body.innerHTML.match(/recipients\[0\]=([0-9]+)/) ? RegExp.$1 : 'Not Found';
  GM_setValue("recipientID", recipientID);
  alert('Recipient:' + recipientID + '  Gift key:' + giftKey);
}

function takeFightStatistics(experience, cashStr, resultType) {
  var loc = city;
  var xp = parseInt(experience);
  var cashInt = parseCash(cashStr);

  if (xp) {
    // WON the fight.
    GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + xp);
    GM_setValue('fightWinCountInt', GM_getValue('fightWinCountInt', 0) + 1);
    GM_setValue('totalWinDollarsInt', '' + (parseInt(GM_getValue('totalWinDollarsInt', 0)) + cashInt));

    switch(loc) {
      case CUBA:
        // Fight Win Cuba Stats
        GM_setValue('fightWinsCuba', GM_getValue('fightWinsCuba', 0) + 1);
        GM_setValue('fightExpCuba', GM_getValue('fightExpCuba', 0) + xp);
        GM_setValue('fightWin$Cuba', '' + (parseInt(GM_getValue('fightWin$Cuba', 0)) + cashInt));
        break;
      case NY:
        // Fight Win NY Stats
        GM_setValue('fightWinsNY', GM_getValue('fightWinsNY', 0) + 1);
        GM_setValue('fightExpNY', GM_getValue('fightExpNY', 0) + xp);
        GM_setValue('fightWin$NY', '' + (parseInt(GM_getValue('fightWin$NY', 0)) + cashInt));
        break;
      case MOSCOW:
        // Fight Win Moscow Stats
        GM_setValue('fightWinsMOSCOW', GM_getValue('fightWinsMOSCOW', 0) + 1);
        GM_setValue('fightExpMOSCOW', GM_getValue('fightExpMOSCOW', 0) + xp);
        GM_setValue('fightWin$MOSCOW', '' + (parseInt(GM_getValue('fightWin$MOSCOW', 0)) + cashInt));
    }
  } else {
    // LOST the fight.
    GM_setValue('fightLossCountInt', GM_getValue('fightLossCountInt', 0) + 1);
    GM_setValue('totalLossDollarsInt', '' + (parseInt(GM_getValue('totalLossDollarsInt', 0)) + cashInt));

    switch (loc) {
      case CUBA:
        //Fight Loss Cuba Stats
        GM_setValue('fightLossesCuba', GM_getValue('fightLossesCuba', 0) + 1);
        GM_setValue('fightLoss$Cuba', '' + (parseInt(GM_getValue('fightLoss$Cuba', 0)) + cashInt));
        if (resultType == 2) {
          GM_setValue('fightLossBGCHCuba', GM_getValue('fightLossBGCHCuba', 0) + 1);
          GM_setValue('fightLossBGCH$Cuba', '' + (parseInt(GM_getValue('fightLossBGCH$Cuba', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCHCuba', GM_getValue('fightLossCHCuba', 0) + 1);
          GM_setValue('fightLossCH$Cuba', '' + (parseInt(GM_getValue('fightLossCH$Cuba', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrongCuba', GM_getValue('fightLossStrongCuba', 0) + 1);
          GM_setValue('fightLossStrong$Cuba', '' + (parseInt(GM_getValue('fightLossStrong$Cuba', 0)) + cashInt));
        }
        break;
      case NY:
        //Fight Loss NY Stats
        GM_setValue('fightLossesNY', (GM_getValue('fightLossesNY', 0) + 1));
        GM_setValue('fightLoss$NY', '' + (parseInt(GM_getValue('fightLoss$NY', 0)) + cashInt));
        if (resultType == 2) {
          GM_setValue('fightLossBGCHNY', GM_getValue('fightLossBGCHNY', 0) + 1);
          GM_setValue('fightLossBGCH$NY', '' + (parseInt(GM_getValue('fightLossBGCH$NY', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCHNY', GM_getValue('fightLossCHNY', 0) + 1);
          GM_setValue('fightLossCH$NY', '' + (parseInt(GM_getValue('fightLossCH$NY', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrongNY', GM_getValue('fightLossStrongNY', 0) + 1);
          GM_setValue('fightLossStrong$NY', '' + (parseInt(GM_getValue('fightLossStrong$NY', 0)) + cashInt));
        }
        break;
      case MOSCOW:
        //Fight Loss MOSCOW Stats
        GM_setValue('fightLossesMOSCOW', (GM_getValue('fightLossesMOSCOW', 0) + 1));
        GM_setValue('fightLoss$MOSCOW', '' + (parseInt(GM_getValue('fightLoss$MOSCOW', 0)) + cashInt));
        if (resultType == 2) {
          GM_setValue('fightLossBGCHMOSCOW', GM_getValue('fightLossBGCHMOSCOW', 0) + 1);
          GM_setValue('fightLossBGCH$MOSCOW', '' + (parseInt(GM_getValue('fightLossBGCH$MOSCOW', 0)) + cashInt));
        } else if (resultType == 1) {
          GM_setValue('fightLossCHMOSCOW', GM_getValue('fightLossCHMOSCOW', 0) + 1);
          GM_setValue('fightLossCH$MOSCOW', '' + (parseInt(GM_getValue('fightLossCH$MOSCOW', 0)) + cashInt));
        } else {
          GM_setValue('fightLossStrongMOSCOW', GM_getValue('fightLossStrongMOSCOW', 0) + 1);
          GM_setValue('fightLossStrong$MOSCOW', '' + (parseInt(GM_getValue('fightLossStrong$MOSCOW', 0)) + cashInt));
        }
        break;
      default:
        break;
    }
  }
}

function logFightResponse(rootElt, resultElt, context) {
  var how = getStaminaMode();
  lastOpponent = context;
  var inner = resultElt? resultElt.innerHTML : '';
  var innerNoTags = inner.untag();
  var messages = $x('.//td[@class="message_body"]', resultElt);
  var elt = messages[0]? messages[0].firstChild : undefined;

  if (resultElt.className == "fight_results") {
    // A fight took place. Results are in the "VS" format.

    var attackAgainElt = xpathFirst('.//a[contains(.,"Attack Again")]', resultElt);
    lastOpponent.attackAgain = attackAgainElt ? attackAgainElt : undefined;

    if (how == STAMINA_HOW_FIGHT_RANDOM) {
      // Look for any new opponents in the displayed list.
      findFightOpponent(rootElt);
    } else if (how == STAMINA_HOW_FIGHT_LIST) {
      cycleSavedList('fightList');
    }

    // Determine whether the opponent is alive and may see future attacks.
    if (inner.indexOf('Attack Again') != -1) {
      setFightOpponentActive(context);
    } else {
      setFightOpponentInactive(context);
    }

    // Get the opponent, experience & cash.
    if (!innerNoTags.match(/(\d+)\s*experience/i)) {
      addToLog('warning Icon', 'BUG DETECTED: Unable to read "vs" win/loss.');
      addToLog('warning Icon', 'Result content: ' + inner);
      return false;
    }
    var experience = parseInt(RegExp.$1);
    var cost = innerNoTags.match(REGEX_CASH)? RegExp.lastMatch : undefined;

    // Get the opponent's details.
    var opponentElt = xpathFirst('.//div[@class="fightres_opponent"]', resultElt);
    var user, userSize, userBoost;
    if (opponentElt) {
      elt = xpathFirst('.//div[@class="fightres_name"]/a', opponentElt);
      user = linkToString(elt, 'user');
      elt = xpathFirst('.//div[contains(@class, "fightres_group_size")]', opponentElt);
      if (elt) {
        userSize = elt.innerHTML.untag().trim();
      }
      elt = xpathFirst('.//div[@class="fightres_top3_boost"]//img',opponentElt);
      if (elt) {
        userBoost = elt.title;
      }
    }

    // Did we win or lose?
    var resultType;
    var result = 'Fought ' + user + '\'s mafia of ' + userSize;
    if (experience) {
      result += ' <span class="good">' + 'WON ' + cost + '</span>' + ' and ' +
                '<span class="good">' + experience + ' experience</span>.';
      addToLog('good Icon', result);
    } else {
      result += ' <span class="bad">' +
                'LOST ' + cost + '</span>.';
      resultType = 0;
      // Check for a critical hit.
      if (innerNoTags.match(/critical hit/i)) {
        resultType++;
        if (innerNoTags.match(/bodyguard/i)) {
          resultType++;
          result += ' <span class="warn">(bodyguard critical hit)</span>';
          if (how == STAMINA_HOW_FIGHT_RANDOM &&
              isChecked('fightAvoidBodyguards')) {
            setFightOpponentAvoid(context);
          }
        } else {
          result += ' <span class="warn">(critical hit)</span>';
        }
      } else {
        // Show any boost the opponent used.
        if (userBoost && userBoost.match(/[^(]+/)) {
          result += ' <span class="warn">('+RegExp.lastMatch.trim()+')</span>';
        }

        // Don't fight this opponent again.
        result += ' Too strong!';
        if (how == STAMINA_HOW_FIGHT_RANDOM ||
            isChecked('fightRemoveStronger')) {
          result += ' Avoiding.';
          setFightOpponentAvoid(context);
        }
      }
      addToLog('bad Icon', result);
    }

    // Check for any fatalities.
    if (innerNoTags.match(/body\s+count\s+to\s+(\d+)/i)) {
      addToLog('info Icon', killedMobsterIcon + ' You <span class="bad">' + 'KILLED' + '</span> ' + user + '. Your body count has increased to <span class="bad">' + RegExp.$1 + '</span>.');
    }
    if (innerNoTags.indexOf('You were snuffed') != -1) {
      addToLog('bad Icon', 'You <span class="bad">' + 'DIED' + '</span> in the fight.');
    }

    // Look for any loot.
    if (innerNoTags.match(/found (an? .*) while fighting/i)) {
      addToLog('lootbag Icon', '<span class="loot">'+' Found '+
               RegExp.$1 + ' in the fight.</span>');
    }

    // Update the statistics.
    takeFightStatistics(experience, cost, resultType);
    updateLogStats();

    // Click Attack Again immediately to milk our cash-cow
    if (experience && canSpendStamina() && ptsToNextLevel > 6) {
      var attackAgain = isChecked ('staminaReattack') && parseCash(cost) >= GM_getValue('reattackThreshold');
      if (attackAgain && attackAgainElt) {
        // Attack again immediately.
        Autoplay.fx = function() {
          clickAction = 'fight';
          clickContext = context;
          clickElement(attackAgainElt);
          DEBUG('Clicked to repeat the attack on ' + context.name +
                ' (' + context.id + ').');
        }
        Autoplay.delay = 0;
        Autoplay.start();
        return true;
      }
    }

  } else if (innerNoTags.indexOf('too weak') != -1) {
    addToLog('info Icon', '<span style="color:#FF9999;">' + 'Too weak to fight.'+ '</span>');
  } else if (innerNoTags.match(/you cannot fight|part of your mafia/i)) {
    if (context.id) {
      DEBUG('Opponent (' + context.id + ') is part of your mafia. Avoiding.');
      setFightOpponentAvoid(context);
    }
  } else {
    DEBUG('Unrecognized fight response:');
    DEBUG(inner);
  }

  randomizeStamina();
  return false;
}

// Spend Stamina successful, change fight location and spend mode
function randomizeStamina() {
  if (isSame('staminaSpendHow', STAMINA_HOW_RANDOM)) {
    var spendMode = Math.floor(Math.random()*(staminaSpendChoices.length - 1));
    var fightLoc = Math.floor(Math.random()*cities.length);
    var hitmanLoc = Math.floor(Math.random()*cities.length);

    // Randomize stamina spend mode
    if (spendMode != newStaminaMode) {
      newStaminaMode = spendMode;
      DEBUG('Stamina spending set to : ' + staminaSpendChoices[spendMode]);
    }

    // Randomize fight location
    if (!isSame('fightLocation', fightLoc)) {
      GM_setValue('fightLocation', fightLoc);
      DEBUG('Fight location set to : ' + cities[GM_getValue('fightLocation')][CITY_NAME]);
    }

    // Randomize hitman location
    if (!isSame('hitmanLocation', hitmanLoc)) {
      GM_setValue('hitmanLocation', hitmanLoc);
      DEBUG('Hitman location set to : ' + cities[GM_getValue('hitmanLocation')][CITY_NAME]);
    }
  }
}

// Interprets the response to an action that was taken.
//
// rootElt: An element whose descendents contain the response to interpret.
// action:  The action taken, such as 'fight', 'heal', 'hitlist', etc.
// context: (optional) Any further data needed to describe the action
// Returns: true if something has been done that will cause the inner page
//          to change, such as clicking somewhere or loading another page.
function logResponse(rootElt, action, context) {
  // Set default timer properties.
  Autoplay.fx = goHome;
  Autoplay.delay = getAutoPlayDelay();

  var messagebox = xpathFirst('.//div[@class="fight_results"]', rootElt);
  if (!messagebox) {
    messagebox = xpathFirst('.//table[@class="messages"]', rootElt);
  }

  if (action=='withdraw' && context) {
    autoBankWithdraw(context);
    Autoplay.start();
    return true;
  }
  if (!messagebox) {
    DEBUG('logResponse: HTML=' + rootElt.innerHTML);
    DEBUG('Unexpected response page: no message box found!');

    // If fighting from a user-specified list, cycle it.
    // Otherwise, the problem might repeat indefinitely.
    if (action == 'fight' &&
        GM_getValue('staminaSpendHow') == getStaminaMode()) {
      addToLog('warning Icon', 'Opponent ' + context.id +
               ' in your fight list may be invalid.');
      cycleSavedList('fightList');
    }

    return false;
  }

  // Since the attempted action received a response, stop skipping fight.
  skipStaminaSpend = false;

  var inner = messagebox? messagebox.innerHTML : '';
  var innerNoTags = inner.untag();
  //var xw_time = rootElt.innerHTML.match(/xw_time=[^&]*/i);
  //var xw_exp_sig = rootElt.innerHTML.match(/xw_exp_sig=[^&]*/i);

  switch (action) {
    case 'fight':
      return logFightResponse(rootElt, messagebox, context);
      break;

    case 'heal':
      if (innerNoTags.indexOf('doctor healed') != -1) {
        GM_setValue('healWaitStarted',false);
        var addHealth = inner.split('doctor healed <strong>')[1].split('health')[0];
        var cost = innerNoTags.match(REGEX_CASH);
        addToLog('health Icon', '<span style="color:#FF9999;">' + ' Health +'+ addHealth + ' for <span class="expense">' + cost + '</span>.</span>');
      } else if (innerNoTags.indexOf('You cannot heal so fast') != -1) {
        addToLog('warning Icon', '<span style="color:#FF9999;">' + 'Attempted to heal too quickly.' + '</span>');
      }

      // Returning home after healing ensures that the home page still gets
      // checked occasionally during sustained periods of stamina spending.
      Autoplay.start();
      return true;
      break;

    case 'job':
      xpGainElt = xpathFirst('.//dd[@class="message_experience"]', messagebox);
      if (xpGainElt) {
        // Job completed successfully.
        var result = 'You performed ' + '<span class="job">' +
                     missions[GM_getValue('selectMission')][0] +
                     '</span> earning <span class="good">' +
                     xpGainElt.innerHTML.toLowerCase() + '</span>';
        var cashGainElt = xpathFirst('.//dd[@class="message_cash"]', messagebox);
        if (cashGainElt) {
          result += ' and <span class="good">' + cashGainElt.innerHTML + '</span>';
        }
        result += '.';
        if (innerNoTags.indexOf('you spent no energy') != -1) {
          result += ' You spent 0 energy on this job.';
        }
        addToLog('process Icon', result);
        jobProgress(rootElt);
        jobLoot(rootElt);
        // Add message if job tier prize found.
        if (innerNoTags.match(/.*(An* .+ was added to your inventory[^.]*.)/i)) {
          addToLog('lootbag Icon', RegExp.$1);
        }

        // Ask for help if auto ask is on and enough experience was gained.
        var xpGain = parseInt(xpGainElt.innerHTML);
        var xpGainMin = parseInt(GM_getValue('autoAskJobHelpMinExp'));
        if (isChecked('autoAskJobHelp') &&
            (!xpGainMin || xpGain >= xpGainMin)) {
          var elt = xpathFirst('.//div[@class="message_buttons"]//span[@class="sexy_jobhelp"]', messagebox);
          if (elt) {
            Autoplay.fx = function() {
              clickElement(elt);
              addToLog('process Icon', 'Asked for help with <span class="job">' + missions[GM_getValue('selectMission')][0] + '</span>.');
            }
            Autoplay.start();
            return true;
          }
        }

        return false;
      } else if (innerNoTags.indexOf('You are not high enough level to do this job') != -1) {
        addToLog('warning Icon', 'You are not high enough level to do ' + missions[GM_getValue('selectMission', 1)][0] + '.');
        addToLog('warning Icon', 'Job processing will stop');
        GM_setValue('autoMission', 0);
      } else if (innerNoTags.match(/You need.*more energy.*requires.*?(\d+).*you only have.*?(\d+)/i)) {
        addToLog('warning Icon', missions[GM_getValue('selectMission', 1)][0] +
                 ' requires ' + RegExp.$1 + ' energy. You only have ' +
                 RegExp.$2 + '.');
        addToLog('warning Icon', 'Is your wheelman bonus set correctly?');
      } else {
        DEBUG('Unrecognized job response.');
      }
      Autoplay.start();
      return true;
      break;

    case 'hitman':
      // If the target is gone, there is nothing to do.
      if (innerNoTags.indexOf('someone else took out') != -1) {
        DEBUG(inner);
        return false;
      }

      var targetKilled = (innerNoTags.indexOf('You knocked out') != -1);
      if (innerNoTags.indexOf('You WON') != -1) {
        var cashGain = innerNoTags.match(/gained.*?([A-Z]?\$[\d,]*\d)/i);
        var cashWon = RegExp.$1
        var experience = innerNoTags.match(/\d+\s+experience\s+points?/i);
        addToLog('good Icon', 'Hit ' + linkToString(context.profile, 'user') +
                 ', <span class="good">WON ' + cashWon + '</span> and ' +
                 '<span class="good">' + experience + '</span>.');
        GM_setValue('hitmanWinCountInt',GM_getValue('hitmanWinCountInt',0)+1);
        GM_setValue('hitmanWinDollarsInt', '' + (parseInt(GM_getValue('hitmanWinDollarsInt', 1)) + parseCash(cashWon.split('$')[1])));
        GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + parseInt(experience));
        GM_setValue('totalWinDollarsInt', '' + (parseInt(GM_getValue('totalWinDollarsInt', 1)) + parseCash(cashWon.split('$')[1])));

        if (!targetKilled && canSpendStamina() && ptsToNextLevel > 6) {
          var elt = xpathFirst('.//a[contains(.,"Attack Again")]', messagebox);
          if (elt) {
            // Attack again immediately.
            Autoplay.fx = function() {
              clickAction = action;
              clickContext = context;
              clickElement(elt);
              DEBUG('Clicked to repeat the hit on ' + clickContext.name +
                    ' (' + clickContext.id + ').');
            }
            updateLogStats(STAMINA_HOW_HITMAN);
            Autoplay.delay = 0;
            Autoplay.start();
            return true;
          }
        }
      } else if (innerNoTags.indexOf('You LOST') != -1) {
        var t = innerNoTags.match(/LOST.*?([A-Z]?\$[\d,]*\d)/i);
        var cashLoss = RegExp.$1;
        var result = 'Hit ' + linkToString(context.profile, 'user') +
                     ' <span class="bad">LOST ' + cashLoss + '.</span>';
        GM_setValue('hitmanLossCountInt',GM_getValue('hitmanLossCountInt',0)+1);
        GM_setValue('hitmanLossDollarsInt', '' + (parseInt(GM_getValue('hitmanLossDollarsInt', 0)) + parseCash(cashLoss.split('$')[1])));
        GM_setValue('totalLossDollarsInt', '' + (parseInt(GM_getValue('totalLossDollarsInt', 0)) + parseCash(cashLoss.split('$')[1])));
        if (context.id) {
          // Add the opponent to the avoid list.
          setHitmanOpponentAvoid(context.id);
          result += ' Avoiding.';
        }
        addToLog('bad Icon', result);
      } else if (innerNoTags.indexOf('This player is currently part of your mafia') != -1) {
        if (context.id) {
          setHitmanOpponentAvoid(context.id);
        }
      } else {
        DEBUG(inner);
      }
      if (innerNoTags.indexOf('You were snuffed') != -1) {
        addToLog('updateBad Icon', 'You <span class="bad">DIED</span>.');
      }
      if (targetKilled) {
        if (context.id) {
          addSavedListItem('hitmanListKilled', context.id, 100);
        }
        addToLog('lootbag Icon', killedMobsterIcon +
                 ' You <span class="bad">KILLED</span> ' +
                 linkToString(context.profile, 'user') +
                 ' and collected the <span class="money">' +
                 context.bounty + '</span> bounty set by ' +
                 linkToString(context.payer, 'user') + '.');

        GM_setValue('hitmanWinCountInt',GM_getValue('hitmanWinCountInt',0)+1);
        GM_setValue('hitmanWinDollarsInt', '' + (parseInt(GM_getValue('hitmanWinDollarsInt', 1) + parseCash(context.bounty))));
        GM_setValue('totalExpInt', GM_getValue('totalExpInt', 0) + parseInt(experience));
        GM_setValue('totalWinDollarsInt', '' + (parseInt(GM_getValue('totalWinDollarsInt', 1)) + parseCash(context.bounty)));
      }
      updateLogStats(STAMINA_HOW_HITMAN);
      randomizeStamina();
      break;

    case 'war':
      // Remove invalid war targets
      if (innerNoTags.indexOf('Target user is not a friend') != -1 ||
        innerNoTags.indexOf('Target user does not exist') != -1) {
        removeSavedListItem('autoWarTargetList', context.id);
        addToLog('warning Icon', 'Invalid war target (id='+context.target_id+'). Removing from list.');
      }
      // Friend is already at war with somebody else
      else if (innerNoTags.indexOf('is already at war with someone else') != -1) {
        addToLog('info Icon', inner.split('.')[0] + '. Cycling warlist. ' );
        cycleSavedList('autoWarTargetList');
      }
      // Go back to war page after betrayal
      else if (innerNoTags.indexOf('You successfully betrayed') != -1) {
        addToLog(logIcon, inner.split('<br><br>')[0] + '</div>');
        setGMTime('warTimer', '00:00');
        break;
      }
      // Cycle war list after successful war declaration
      else if (innerNoTags.indexOf('You successfully declared war') != -1) {
        cycleSavedList('autoWarTargetList');
        addToLog('good Icon', inner);
      }
      // War attack result
      else if (innerNoTags.indexOf('WON') != -1 ||
               innerNoTags.indexOf('LOST') != -1) {
        var logIcon = innerNoTags.indexOf('LOST') != -1 ? 'bad Icon' : 'good Icon';
        addToLog(logIcon, inner.split('points.')[0] + 'points.</div>');
      }
      else {
        addToLog('info Icon', inner);
      }

      if (helpWar) {
        // Help attempt was processed. Increment the update count.
        GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));
        helpWar = false;
      }

      // Visit the War Tab again
      setGMTime('warTimer', '00:00');
      Autoplay.start();
      return true;
      break;

    case 'stats':
      if (innerNoTags.match(/You just upgraded your (\w+)/i)) {
        var stat = RegExp.$1.toLowerCase();
        switch (stat) {
          case 'attack':
            curAttack++;
            GM_setValue('nextStat' , DEFENSE_STAT)
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ attackIcon + ' attack.</span>');
            break;
          case 'defense':
            curDefense++;
            GM_setValue('nextStat' , HEALTH_STAT)
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ defenseIcon + ' defense.</span>');
            break;
          case 'health':
            maxHealth++;
            GM_setValue('nextStat' , ENERGY_STAT)
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ healthIcon + ' health.</span>');
            break;
          case 'energy':
            maxEnergy++;
            GM_setValue('nextStat' , STAMINA_STAT)
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ energyIcon + ' energy.</span>');
            break;
          case 'stamina':
            maxStamina++;
            GM_setValue('nextStat' , INFLUENCE_STAT)
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ staminaIcon + ' stamina.</span>');
            break;
          case 'influence':
            maxInfluence++;
            GM_setValue('nextStat' , ATTACK_STAT)
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded '+ influenceIcon + ' influence.</span>');
            break;
          default:
            addToLog('process Icon', '<span style="color:#885588;">'+'You upgraded ' + stat + '.</span>');
        }
      } else {
        DEBUG('Failed to increment stat.');
      }
      break;

    case 'accept':
      var accepts = innerNoTags.match(/You joined/gi);
      if (accepts) {
        addToLog('process Icon', 'Accepted ' + accepts.length + ' mafia ' +
                 (accepts.length > 1 ? ' invites.' : ' invite.'));
      } else {
        DEBUG('Unrecognized response for "accept" action.');
        DEBUG(inner);
      }
      break;

    case 'energypack':
      addToLog('energyPack Icon', 'Used an <span class="good">Energy Pack</span>.');
      DEBUG(inner);
      break;

    case 'help':
      DEBUG('Parsing job help.');

      // Help attempt was processed. Increment the update count.
      GM_setValue('logPlayerUpdatesCount', 1 + GM_getValue('logPlayerUpdatesCount', 0));

      var user = linkToString(messagebox.getElementsByTagName('a')[0], 'user');
      if (context && !user) {
        user = context.user;
      }
      if (innerNoTags.indexOf('not your friend') != -1 ||
          innerNoTags.indexOf('You need to be friends') != -1) {
        addToLog('info Icon', 'Failed to help' + (user? ' ' + user : '') +
                 ' with job. Reason: not friends.');
      } else if (innerNoTags.indexOf('You are too late') != -1) {
          addToLog('info Icon', 'You are too late to help ' +
                   (user? ' ' + user : '') + ' with this job.');
      } else if (innerNoTags.indexOf('Not Again') != -1) {
          addToLog('info Icon', 'Already helped ' + user + ' with this job.');
      } else if (innerNoTags.indexOf('You received') != -1 ||
                 innerNoTags.indexOf('You helped') != -1) {
          var cost = innerNoTags.match(REGEX_CASH);
          var experience = 0;
          if (innerNoTags.match(/(\d+)\s+experience\s+points?/i)) {
            experience = parseInt(RegExp.$1);
          }
          if (innerNoTags.indexOf('Special Bonus') != -1) {
            var loot = innerNoTags.split('gained a ')[1];
            addToLog('lootbag Icon', '<span class="loot">'+' Found a '+ loot.split('.<span')[0] + ' while helping on a job.</span>');
          }
          var result = 'You received ' + '<span class="good">' +
                   cost + '</span>' + ' and ' +
                   '<span class="good">' + experience + ' experience</span>' +
                   ' for helping ' + user + ' complete the job.';
          addToLog('updateGood Icon', result);
      } else if (innerNoTags.indexOf('25 friends') != -1) {
        addToLog('info Icon', 'Failed to help' + (user ? ' ' + user : '') + ' with job. Reason: already helped 25 friends for the day in that city.');
      } else {
        addToLog('info Icon', 'WARNING: Not sure what happened when ' +
                 'trying to help' + (user? ' ' + user : '') + '.' +
                 (context? ' ' + context.help : '') +
                 ' Perhaps you interfered by clicking on something?');
      }
      Autoplay.start();
      return true;
      break;

    case 'sell output':
      // Log any message from a sale of Cuban business output.
      if (inner.match(/sold|collected/i)) {
        addToLog(cities[city][CITY_CASH_CSS], inner);
      } else {
        DEBUG(inner);
      }
      break;

    case 'deposit':
      if (innerNoTags.match(/deposited/i)) {
        addToLog(cities[city][CITY_CASH_CSS], inner);
      } else {
        DEBUG(inner);
      }
      break;

    case 'withdraw':
      if (innerNoTags.match(/withdrew/i)) {
        addToLog(cities[city][CITY_CASH_CSS], inner);
      } else {
        DEBUG(inner);
      }
      break;

    case 'collect ny take':
      if (innerNoTags.match(/You just collected take for production of/i)) {
        var production = innerNoTags.match(/^You just collected take for production of \d+ worth \$[\d,]*./i);
        addToLog(cities[city][CITY_CASH_CSS], production);
      } else {
        DEBUG(inner);
      }
      break;

    // FIXME: Add parsing here
    case 'buy item':
      break;

    default:
      addToLog('warning Icon', 'BUG DETECTED: Unrecognized action "' +
               action + '".');
      DEBUG(inner);
  }

  return false;
}

//update the script (by Richard Gibson; changed by ms99 and blannie)
function updateScript() {
  try {
    if (!GM_getValue) {
      return;
    }
    GM_xmlhttpRequest({
      method: 'GET',
      url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
      onload: function(result) {
        if (result.status != 200) {
          return;
        }
        if (!result.responseText.match(/build:\s+'(\d+)/)) return;
        var theOtherBuild = parseInt(RegExp.$1);
        var runningBuild = parseInt(SCRIPT.build);
        var theOtherVersion = result.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 : '';
        if (theOtherBuild < runningBuild) {
          if (window.confirm('You have a beta version (build ' + runningBuild + ') installed.\n\nDo you want to DOWNGRADE to the most recent official release (version ' + theOtherVersion + ')?\n')) {
            //clearSettings();
            window.location.href = SCRIPT.url;
          }
          return;
        } else if (theOtherBuild > runningBuild ||
                   theOtherVersion != SCRIPT.version) {
          if (window.confirm('Version ' + theOtherVersion + ' is available!\n\n' + 'Do you want to upgrade?' + '\n')) {
            //clearSettings();
            window.location.href = SCRIPT.url;
          }
        } else {
          alert('You already have the latest version.');
          return;
        }
      }
    });
  } catch (ex) {
    addToLog('warning Icon', ex);
  }
}

///////////////////////////////////////////////////////////////////////////////
//                           UTILITY METHODS                                 //
///////////////////////////////////////////////////////////////////////////////


/******************************** General ********************************/

function clearSettings() {
  if (typeof GM_listValues == 'function' &&
      typeof GM_deleteValue == 'function') {
    var values = GM_listValues();
    for (var i in values) {
      GM_deleteValue(values[i]);
    }
  } else {
    alert('In order to do this you need at least GreaseMonkey version: 0.8.20090123.1. Please upgrade and try again.');
  }
}

/******************************** Array ********************************/

function getArrayDiffs(workingArray) {
  diffArray = [];
  for (var i = 1; i < workingArray.length; i++) {
    if (workingArray[i] - workingArray[i-1] < 0) {
      diffArray.push(0)
    } else {
      diffArray.push(workingArray[i] - workingArray[i-1]);
    }
  }
  diffArray.unshift(0);
  return diffArray;
}

// Save an array of strings. The strings must not contain "\n".
function setSavedList(listName, list) {
  GM_setValue(listName, list.join('\n'));
}

// Get an array of strings that was saved with setSavedList().
function getSavedList(listName) {
  var savedList = GM_getValue(listName, '');
  return savedList? savedList.split('\n') : [];
}

// Add an item to a list saved with setSavedList().
// If the size of the list is greater than the "max"
// parameter, the first item in the list is removed.
function addSavedListItem(listName, item, max) {
  var savedList = getSavedList(listName);

  // Only add if it isn't already there.
  if (savedList.indexOf(item) != -1) {
    return;
  }

  savedList.push(item);
  if (max > 0) {
    while (max < savedList.length) {
      var item = savedList.shift();
      DEBUG('Removing ' + item + ' from ' + listName + '.');
    }
  }
  setSavedList(listName, savedList);
}

// Remove an item from a list saved with setSavedList().
function removeSavedListItem(listName, item) {
  var savedList = getSavedList(listName);
  var idx = savedList.indexOf(item);
  if (idx != -1) {
    savedList.splice(idx, 1);
    setSavedList(listName, savedList);
    return true;
  }
  // No matches.
  return false;
}

function removeJobForItem(jobList, itemName){
  var jobs = getSavedList(jobList, '');
  var i=0;
  if (jobs.length>0){
    var job=jobs[jobs.length-1];
    requirementJob.forEach(
     function(j){
       if (j[1] == job) {
         if (requirementJob[i][0]==itemName) {
           removeSavedListItem(jobList,requirementJob[i][1]);
           DEBUG('removing job'+requirementJob[i][1]);
         }
       }
       i++;
     }
    );
  }
}

function cycleSavedList(listName) {
  // Move the first item to the end of the list.
  var opponents = GM_getValue(listName, '').split('\n');
  var first = opponents.shift();
  if (first) {
    opponents.push(first);
  }
  GM_setValue(listName, opponents.join('\n'));
}

/******************************** HTML/DOM ********************************/

function stripURI(img) {
  img = img.split('"')[1];
  return img.replace('" />', '');
}

function showIfUnchecked(setting) {
  if (setting == '0') {
    setting = 'unchecked';
  }
  return setting;
}

function showIfSelected(setting) {
  if (setting == '0') {
    setting = 'not selected';
  } else {
    setting = 'selected';
  }
  return setting;
}

function showIfRelative(key) {
  return GM_getValue(key) == 'checked'? 'relative' : 'absolute';
}

// Converts a link element to an HTML string with an optional CSS class.
function linkToString(link, className) {
  if (!link) return;

  // Decode ID
  var decBase64ID = function (strInput) {
    if (strInput.match(/user=/)) {
      var id = strInput.split('user=')[1].split('\'')[0]
      strInput = strInput.replace (id, decodeID(id));
    }
    return strInput;
  }

  var str = '<a';
  if (className)
    str += ' class="' + className + '"';
  var onclick = link.getAttribute('onclick');
  if (onclick)
    str += ' onclick="' + decBase64ID(onclick) + '"';

  str += ' href="' + decBase64ID(link.href) + '">' + link.innerHTML + '</a>';

  return str;
}

function decodeHTMLEntities(str) {
  if (!str) return str;

  scratchpad.innerHTML = str;
  return scratchpad.value;
}

function clickElement(elt) {
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Null element passed to clickElement().');
    return;
  }

  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

function ignoreElement(element) {
  var parentElt = element.parentNode;
  if (parentElt) {
    var id = parentElt.id;
    if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
      return true;
  }

  var id = element.id;
  if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
    return true;

  return false;
}

function logElement(element, heading) {
  if (!element) return;

  // Write information about the element to the javascript console.
  var elt = element;
  GM_log((heading? heading + ' ' : '') +
         'tag=' + elt.tagName +
         ', id=' + elt.id +
         ', class=' + elt.className +
         ', value=' + elt.nodeValue
  );
  elt = element.parentNode;
  if (elt) {
    GM_log((heading? heading + ' ' : '') +
           'parent tag=' + elt.tagName +
           ', id=' + elt.id +
           ', class=' + elt.className +
           ', value=' + elt.nodeValue
    );
  }
}

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function $x(p, c) {
  var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while (i = x.iterateNext()) r.push(i);
  return r;
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Toggle checkbox element and return true if it is checked
function toggleCheckElt(eltId) {
  if (isChecked(eltId)) {
    GM_setValue(eltId, '0');
    return false;
  } else {
    GM_setValue(eltId, 'checked');
    return true;
  }
}

// Save an array of checkbox elements
function saveCheckBoxElementArray(arrayEltIds) {
  for (var i=0; i<arrayEltIds.length; i++)
    saveCheckBoxElement(arrayEltIds[i])
}

// Save checkbox element and return true if it is checked
function saveCheckBoxElement(eltId) {
  if (document.getElementById(eltId).checked === true) {
    GM_setValue(eltId, 'checked');
    return true;
  } else {
    GM_setValue(eltId, 0);
    return false;
  }
}

// Check if a GM value is the same as the passed value
function isSame (gmName, gmValue) {
  return GM_getValue(gmName) == gmValue;
}

// Check if a GM value is checked
function isChecked (gmName) {
  return isSame (gmName, 'checked');
}

// Check if a GM value is undefined
function isUndefined (gmName) {
  return isSame (gmName, undefined);
}

function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
}

/******************************** CASH PARSING ********************************/

// Parse a monetary value such as "C$50,000" and return an integer.
function parseCash(cash) {
  var c = cash;
  if (typeof(c) == 'string') {
    c = c.trim().replace(/[A-Z$,'']/g, '');
  }
  return parseInt(c);
}

function makeCommaValue(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

/******************************** DATE/TIME ********************************/

// reads a date string from a stored GM value and converts it to seconds since 1970
function getGMTime(GMvalue) {
  var tempVal = GM_getValue(GMvalue, 0);
  var d = Date.parse(tempVal);
  return d/1000;
}

// takes a string input in the form of a countdown 'MM:SS', 'HH:MM:SS', 'MM minutes and SS seconds' and stores the
// time when the countdown is zero in a GM value.  Also takes an input of 'now' and stores the current time.
function setGMTime(GMvalue, countdownStr) {
  var d = new Date();
  d.setMilliseconds(0);

  if (countdownStr != 'now')
    d.setTime(d.getTime()+(timeLeft(countdownStr)*1000));

  GM_setValue(GMvalue, d.toString());
}

// returns the number of seconds left until a date stored in a GM value
function timeLeftGM(GMvalue) {
  var timeToCompare = getGMTime(GMvalue);

  var d = new Date();
  d.setMilliseconds(0);

  return Math.max(timeToCompare-(d.getTime()/1000), 0);
}

// takes a string input in the form of 'MM:SS', 'HH:MM:SS', or 'MM minutes and SS seconds' and returns the number of seconds it represents
function timeLeft(timeToConvert) {
  if (!timeToConvert)
    return 0;

  var returnVal = 0;

  var temp = new Array();
  temp = timeToConvert.split(':');

  if (temp.length == 2)  // MM:SS
    returnVal = ((parseInt(temp[0]) * 60) + parseInt(temp[1]));
  else if (temp.length == 3) // HH:MM:SS
    returnVal = ((parseInt(temp[0]) * 60 * 60) + (parseInt(temp[1]) * 60) + parseInt(temp[2]));
  else if (temp.length == 1) {  // 'HH hours and MM minutes and SS seconds'
    temp = timeToConvert.split(' and ');
    for (i = 0; i < temp.length; i++) {
      spaceIndex = temp[i].indexOf(' ');
      if (spaceIndex != -1) {
        firstPart = temp[i].substring(0, spaceIndex);
        secondPart = temp[i].substring(spaceIndex+1, temp[i].length);
        if ((secondPart == 'minutes') || (secondPart == 'minute'))
          returnVal = returnVal + (parseInt(firstPart) * 60);
        else if ((secondPart == 'seconds') || (secondPart == 'second'))
          returnVal = returnVal + (parseInt(firstPart));
        else if ((secondPart == 'hours') || (secondPart == 'hour'))
          returnVal = returnVal + (parseInt(firstPart * 60 * 60));
      }
    }
  }
  return(returnVal);
}

/******************************** Base64 DECODING ********************************/

function decodeID (strID) {
  // Unescape and clean up the ID first (for %3D string, non-base 64 strings etc)
  strID = unescape (strID);
  if (isNaN(strID)) {
    strID = decode64(strID);
  }
  return strID;
}

// Function to decode strings from Base64
function decode64(input) {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;

  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  var base64test = /[^A-Za-z0-9\+\/\=]/g;
  if (base64test.exec(input)) {
    DEBUG('Invalid character(s) found in input (' + input +'). Expect errors in decoding.');
  }
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  do {
     enc1 = keyStr.indexOf(input.charAt(i++));
     enc2 = keyStr.indexOf(input.charAt(i++));
     enc3 = keyStr.indexOf(input.charAt(i++));
     enc4 = keyStr.indexOf(input.charAt(i++));

     chr1 = (enc1 << 2) | (enc2 >> 4);
     chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
     chr3 = ((enc3 & 3) << 6) | enc4;

     output = output + String.fromCharCode(chr1);

     if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
     }
     if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
     }

     chr1 = chr2 = chr3 = "";
     enc1 = enc2 = enc3 = enc4 = "";

  } while (i < input.length);

  return output;
}