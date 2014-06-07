// ==UserScript==
// @name           Tokyo Toshokan: My Torrents
// @namespace      derbenni
// @description	   Save all searches for later use and highlight torrents in the list that match against these searches.
// @include        http://tokyotosho.info/*
// @include        http://www.tokyo-tosho.net/*
// @version        1.0.0
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

/**
 *
 * @returns {Number}
 */
String.prototype.hashCode = function() {
  var hash = 0;

  if (this.length == 0) {
    return hash;
  }

  for(var index = 0; index < this.length; index++) {
    var character = this.charCodeAt(index);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash;
  }
  return hash;
}

window.tokyotoshokan = {};

/**
 *
 * @constructor
 * @param {string} localStorageKey
 */
window.tokyotoshokan.Storage = function(localStorageKey) {

  /**
   *
   * @returns {Object}
   */
  var loadFromLocalStorage = function() {
    var data = JSON.parse(localStorage[localStorageKey] || '{}');
    return data;
  };

  /**
   *
   * @param {Object} value
   * @returns {void}
   */
  var saveToLocalStorage = function(data) {
    localStorage[localStorageKey] = JSON.stringify(data);
  };

  /**
   *
   * @param {Object} value
   * @returns {window.tokyotoshokan.Storage}
   */
  this.create = function(value) {
    var data = loadFromLocalStorage();
    var key = '' + new Date().getTime() + ''.hashCode();
    var existing = false;

    for(var index in data) {
      if(data[index]['term'] === value['term']) {
        existing = true;
        this.update(index, value);
        break;
      }
    }

    if(!existing) {
      data[key] = value;
      saveToLocalStorage(data);
    }
    return this;
  };

  /**
   *
   * @param {string} key
   * @returns {Object}
   */
  this.read = function(key) {
    var data = loadFromLocalStorage();
    return data[key];
  };

  /**
   *
   * @returns {Object}
   */
  this.readAll = function() {
    var data = loadFromLocalStorage();
    return data;
  };

  /**
   *
   * @param {string} key
   * @param {Object} value
   * @returns {window.tokyotoshokan.Storage}
   */
  this.update = function(key, value) {
    var data = loadFromLocalStorage();
    data[key] = value;
    saveToLocalStorage(data);
    return this;
  };

  /**
   *
   * @param {string} key
   * @returns {window.tokyotoshokan.Storage}
   */
  this.remove = function(key) {
    var data = loadFromLocalStorage();
    delete data[key];
    saveToLocalStorage(data);
    return this;
  };
};

/**
 *
 * @constructor
 */
window.tokyotoshokan.DateFormatter = function() {

  /**
   *
   * @param {Number|string|Date} time
   * @returns {string}
   */
  this.timeAgo = function(time){
    switch(typeof time) {
      case 'number':
        break;

      case 'string':
        time = +new Date(time);
        break;

      case 'object':
        if(time.constructor === Date) time = time.getTime();
        break;

      default:
        time = +new Date();
    }

    var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];

    if(time === 0) {
      return 'Never';
    }

    var seconds = (+new Date() - time) / 1000;
    var token = 'ago';
    var list_choice = 1;

    if(seconds == 0) {
      return 'Just now'
    }

    if(seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }

    var i = 0;
    var format;

    while(format = time_formats[i++])
      if(seconds < format[0]) {
        if(typeof format[2] == 'string') {
          return format[list_choice];
        }else {
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
      }
    return time;
  }

  /**
   *
   * @param {Date} date
   * @returns {string}
   */
  this.formatDate = function(date) {
    var dateString = ''
    + date.getUTCFullYear() + '-'
    + ('0' + (date.getUTCMonth() + 1)).slice(-2) + '-'
    + ('0' + date.getUTCDate()).slice(-2)
    + ' '
    + ('0' + date.getUTCHours()).slice(-2) + ':'
    + ('0' + date.getUTCMinutes()).slice(-2)
    + ' UTC'

    return dateString;
  }
};

/**
 *
 * @constructor
 */
window.tokyotoshokan.ListSorter = function(storage) {

  /**
   *
   * @param {jQuery} $table
   * @returns {void}
   */
  this.sortByLastSearch = function($table) {
    storage.update('sorting', 'sortByLastSearch');

    $('tr.mytorrent', $table).sort(function(a, b) {
      a = new Date($(a).data('value')['lastSearch']).getTime();
      b = new Date($(b).data('value')['lastSearch']).getTime();

      // compare
      if(a > b) {
        return -1;
      }else if(a < b) {
        return 1;
      }
      return 0;
    }).appendTo($table);
  };

  /**
   *
   * @param {jQuery} $table
   * @returns {void}
   */
  this.sortByAddedDate = function($table) {
    storage.update('sorting', 'sortByAddedDate');

    $('tr.mytorrent', $table).sort(function(a, b) {
      a = new Date($(a).data('value')['added']).getTime();
      b = new Date($(b).data('value')['added']).getTime();

      // compare
      if(a > b) {
        return -1;
      }else if(a < b) {
        return 1;
      }
      return 0;
    }).appendTo($table);
  };

  /**
   *
   * @param {jQuery} $table
   * @returns {void}
   */
  this.sortByTerm = function($table) {
    storage.update('sorting', 'sortByTerm');

    $('tr.mytorrent', $table).sort(function(a, b) {
      a = $(a).data('value')['term'];
      b = $(b).data('value')['term'];

      return a.localeCompare(b);
    }).appendTo($table);
  };

  /**
   *
   * @param {jQuery} $table
   * @returns {void}
   */
  this.sort = function($table) {
    var sorting = storage.read('sorting');

    if(typeof(this[sorting]) === 'function') {
      this[sorting]($table);
    }else {
      this.sortByTerm($table);
    }
  };
}

/**
 *
 * @constructor
 */
window.tokyotoshokan.ListCreator = function(storage, dateFormatter, listSorter) {

  /**
   *
   * @param {jQuery} $input
   * @returns {void}
   */
  this.updateInputWidth = function($input) {
    var size = $input.val().length;

    $input.attr('size', size);
    $input.css('width', 'auto');
  }

  /**
   *
   * @param {string} key
   * @param {Object} value
   * @returns {jQuery}
   */
  this.createItem = function(key, value) {
    var self = this;

    var $item = $('<tr class="mytorrent"></tr>').data({
      'key': key,
      'value': value
    });

    var $cellOne = $('<td class="data"></td>');
    var $cellTwo = $('<td class="actions"></td>');

    var $input = $('<input type="text" value="' + value['term'] + '" />');
    var $link = $('<a href="/search.php?terms=' + encodeURIComponent(value['term']) + '">' + value['term'] + '</a>');
    var $added = $('<span class="timestamp">Added: <i>' + dateFormatter.formatDate(new Date(value['added'])) + '</i></span>');
    var $lastSearch = $('<span class="timestamp">Last search: <i>' + dateFormatter.timeAgo(value['lastSearch']) + '</i></span>');
    var $edit = $('<span class="edit">Edit</a>');
    var $remove = $('<span class="remove">Remove</a>');

    $input.keyup(function() {
      self.updateInputWidth($input);
    });
    this.updateInputWidth($input);

    $link.click(function() {
      value['lastSearch'] = new Date();
      storage.update(key, value);
    });

    $edit.click(function() {
      $link.replaceWith($input);
      $input.focus();
      $edit.hide();

      $input.keypress(function(event) {
        var code = event.keyCode || event.which;
        var inputValue = $(this).val();

        if(code == 13) {
          event.preventDefault();

          if(inputValue !== value['term']) {
            value['term'] = inputValue;
            value['lastSearch'] = 0;
            storage.update(key, value);
          }

          $link.attr('href', '/search.php?terms=' + encodeURIComponent(inputValue)).text(inputValue);
          $input.replaceWith($link);
          $edit.show();
        }
      });
    });

    $remove.click(function() {
      if(confirm('Are you sure to delete this?')) {
        storage.remove(key);
        $item.remove();
      }
    });

    $cellOne.append($link);
    $cellOne.append('<br>');
    $cellOne.append($added);
    $cellOne.append($lastSearch);

    $cellTwo.append($edit);
    $cellTwo.append($remove);

    $item.append($cellOne);
    $item.append($cellTwo);

    return $item;
  }

  /**
   *
   * @param {jQuery} $table
   * @returns {jQuery}
   */
  this.createSortButtons = function($table) {
    var $cell  = $('<div class="sorting">Sort by: </div>');

    var $buttonSortAlphabetically = $('<a href="#">Alphabetically</a>');
    var $buttonSortAddedDate = $('<a href="#">Date added</a>');
    var $buttonSortLastSearch = $('<a href="#">Last search</a>');

    $buttonSortAlphabetically.click(function(event) {
      event.preventDefault();
      listSorter.sortByTerm($table);
    });

    $buttonSortAddedDate.click(function(event) {
      event.preventDefault();
      listSorter.sortByAddedDate($table);
    });

    $buttonSortLastSearch.click(function(event) {
      event.preventDefault();
      listSorter.sortByLastSearch($table);
    });

    $cell.append($buttonSortAlphabetically);
    $cell.append(' | ');
    $cell.append($buttonSortAddedDate);
    $cell.append(' | ');
    $cell.append($buttonSortLastSearch);

    return $cell;
  };

  /**
   *
   * @param {Object} data
   * @param {jQuery} $target
   * @returns {void}
   */
  this.createList = function(data, $target) {
    var $mytorrents = $('<div id="mytorrents"></div>');
    var $table = $('<table cellspacing="0"></table>');

    var $headingRow = $('<tr class="heading"></tr>');
    var $headingCell = $('<td colspan="2">My Searches</td>');

    $headingRow.append($headingCell);
    $headingCell.append(this.createSortButtons($table));
    $table.append($headingRow);

    for(var key in data) {
      $table.append(this.createItem(key, data[key]));
    }

    listSorter.sort($table);

    $mytorrents.append($table);
    $target.before($mytorrents);
  };
};

/**
 *
 * @constructor
 */
window.tokyotoshokan.Styler = function() {

  /**
   *
   * @returns {void}
   */
  this.addStyles = function() {
    var css = '#mytorrents {padding:0 0 20px 0;}';
    css += '#mytorrents strong {display:block; padding:0; margin:0 0 5px 0;}';
    css += '#mytorrents table {width:100%; border-collapse:collapse;}';
    css += '#mytorrents table tr:nth-child(2n) {background:#e5e5e5;}';
    css += '#mytorrents table .heading {border-top:1px solid #000; text-align:center;}';
    css += '#mytorrents table .actions {text-align:right;}';
    css += '#mytorrents a {font-size:10pt;}';
    css += '#mytorrents i {font-style:normal;}';
    css += '#mytorrents .timestamp {margin:0; color:#888; font-size:8pt;}';
    css += '#mytorrents .timestamp:after {content:" | "}';
    css += '#mytorrents .timestamp:last-child:after {content:""}';
    css += '#mytorrents .edit, #mytorrents .remove {display:inline-block; width:16px; height:16px; margin:0 0 0 5px; text-indent:9999px; cursor:pointer;}';
    css += '#mytorrents .edit {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH8SURBVDjLjZPfS1NhGMdXf0VEQhDUhdCN4X0IYT8ghIJQM0KoC4vushZddLELKyRhQQkSFIKEGEkUCI2oxVhepG5zi1xbc0u3cDs7Z+ec/ezT+x62scmmHvhwDrzP93Pe57znsQE2cR0SdAm6d+GwYL/M1LBVBV35fF4plUqVcrlMK8Q6TqdzYrukJuiW4Vwuh67rdbLZLJlMhmQyaUnigVlC05f4+dbB0tQplp92DsnwPimQBaZpUigUrLtE0zQURSGVSqHF37DhGkVZeQdagszKLJ7HvZtNAhmuIQWGYaCqKps/ZkivPqCwPs/Gp0cYvjnKUTe+F9fMJoFoo96zfJZ9K+sLpP33qRhujPANtr7dJPhqmO/PBxX3+PljTYLtqImPpH13qZge9LUrmLEB1FU7sZd9jJw5MljNthYk/KLnxdFqeAjzdz9Z/z3Ck2fRE36qx9pakAjME1y4Lbb9GTMyTD52GUXsZO3ZadTkL6umrSD4ZZrAezvLH54Q915EjwywtXSH8FQf+t+I9V12FLwe6wE1SmjyAi77Qb6Kt3rGe9H+hKzwrgLH9eMUPE4K3gm8jpPMjRwlHfNTLBbr7Cjo7znA2NVOXA/PsThzi2wyah1pI+0E/9rNQQsqMtM4CyfE36fLhb2ERa0mB7BR0CElexjnGnL0O2T2PyFunSz8jchwAAAAAElFTkSuQmCC);}';
    css += '#mytorrents .remove {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGqSURBVDjLlZM7S0JhGMfVox+gqYZuQkMETYZNQmi2+QGKligiCBoalFragoqGzDM41NRQQy4VKDhUSyC0NLR1EeKIt7wePV7/vc/BI97NF36cA+f9/97neQ6vCoCKrVGGgWHswyRDQxkFVU1gkCQpWSqVKuVyGZ1g3+Fyuc5aJYrASOFsNgtRFOukUikkEgmEw2FZEgqFwPN8k4SWmgS0IZ/Po1AoyE8ik8kgmUwiEonIglwuBzrE7XbLkjYBhRVIQIF0Oo1oNNrWUm0m6iYBa6O+gd6pb6WVWCwmVyIIQndBK40SqoTmEY/H/y9olFA7NBMSDSQgisWiPBeSEAMLqIrvWyde1mbgt+jwtDIBfl7D9xRQSCHoOceb3YT8wymq716I17sIbM9WfGbtTl8Blf+8OoUcC8NpAxxDwKEe0eMF+Ba5z75/gaCyq68eNK7EwQj8Zm21UVDtNoPH5XFkL9YBFpLsKvwyglscfFbuR7kLc2zKItvc8TJ93ZwgsDkNwaFHZE+Hjw01/DZtxWvl9hXBGEl6XeXLpWH+zsIJVPa9hQtfmbgjyv4BPlWugike25IAAAAASUVORK5CYII=);}';
    css += '#mytorrents input {display:inline-block; width: 75%;}';
    css += '.listing .highlight {background:#bdd;}';

    $('<style>').prop('type', 'text/css').html(css).appendTo('head');
  };
};

jQuery(document).ready(function($) {
  var torrentSearchStorage = new window.tokyotoshokan.Storage('de.derbenni.tokyotoshokan.mytorrents');
  var settingsStorage = new window.tokyotoshokan.Storage('de.derbenni.tokyotoshokan.mytorrents.settings');
  var dateFormatter = new window.tokyotoshokan.DateFormatter();
  var listSorter = new window.tokyotoshokan.ListSorter(settingsStorage);
  var listCreator = new window.tokyotoshokan.ListCreator(torrentSearchStorage, dateFormatter, listSorter);
  var styler = new window.tokyotoshokan.Styler();
  var storedTorrentSearches = torrentSearchStorage.readAll();

  styler.addStyles();
  listCreator.createList(storedTorrentSearches, $('.listing'));

  $('form[action*="search.php"]').submit(function() {
    var value = {
      'term': $('[name="terms"]', this).val(),
      'added': new Date(),
      'lastSearch': new Date()
    };
    torrentSearchStorage.create(value);
  });

  $('[type="application/x-bittorrent"]').each(function() {
    var text = $(this).text().toLowerCase();

    for(var key in storedTorrentSearches) {
      var match = true;
      var words = storedTorrentSearches[key]['term'].split(' ');

      for(var index = 0; index < words.length; index++) {
        match = (match && text.indexOf(words[index].toLowerCase()) > -1);

        if(!match) {
          continue;
        }
      }

      if(match) {
        break;
      }
    }

    if(match) {
      var $rowOne = $(this).parents('tr');
      var $rowTwo = $rowOne.next();

      $rowOne.addClass('highlight');
      $rowTwo.addClass('highlight');
    }
  });
});
