// ==UserScript==
// @name           GreasyThug
// @namespace      http://strd6.com
// @description    GearsMonkey + jQuery
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js

// ==/UserScript==

/** -GreasyThug-
 *  
 *  I've been called a greasy thug, too. It never stops hurting. 
 *  So here's what we're gonna do: We're gonna grease ourselves up 
 *  real good and trash that place with a baseball bat. - Homer
 */

/* 
jquery.event.drag.js ~ v1.4 ~ Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)  
Liscensed under the MIT License ~ http://threedubmedia.googlecode.com/files/MIT-LICENSE.txt
*/
(function(H){H.fn.drag=function(K,J,I){if(J){this.bind("dragstart",K)}if(I){this.bind("dragend",I)}return !K?this.trigger("drag"):this.bind("drag",J?J:K)};var D=H.event,B=D.special,F=B.drag={not:":input",distance:0,which:1,setup:function(I){I=H.extend({distance:F.distance,which:F.which,not:F.not},I||{});I.distance=G(I.distance);D.add(this,"mousedown",E,I)},teardown:function(){D.remove(this,"mousedown",E);if(this===F.dragging){F.dragging=F.proxy=null}C(this,true)}};function E(K){var J=this,I,L=K.data||{};if(L.elem){J=K.dragTarget=L.elem;K.dragProxy=F.proxy||J;K.cursorOffsetX=L.pageX-L.left;K.cursorOffsetY=L.pageY-L.top;K.offsetX=K.pageX-K.cursorOffsetX;K.offsetY=K.pageY-K.cursorOffsetY}else{if(F.dragging||(L.which>0&&K.which!=L.which)||H(K.target).is(L.not)){return }}switch(K.type){case"mousedown":H.extend(L,H(J).offset(),{elem:J,target:K.target,pageX:K.pageX,pageY:K.pageY});D.add(document,"mousemove mouseup",E,L);C(J,false);return false;case !F.dragging&&"mousemove":if(G(K.pageX-L.pageX)+G(K.pageY-L.pageY)<L.distance){break}K.target=L.target;I=A(K,"dragstart",J);if(I!==false){F.dragging=J;F.proxy=K.dragProxy=H(I||J)[0]}case"mousemove":if(F.dragging){I=A(K,"drag",J);if(B.drop){B.drop.allowed=(I!==false);B.drop.handler(K)}if(I!==false){break}K.type="mouseup"}case"mouseup":D.remove(document,"mousemove mouseup",E);if(F.dragging){if(B.drop){B.drop.handler(K)}A(K,"dragend",J)}C(J,true);F.dragging=F.proxy=L.elem=null;break}}function A(L,J,K){L.type=J;var I=D.handle.call(K,L);return I===false?false:I||L.result}function G(I){return Math.pow(I,2)}function C(J,I){if(!J){return }J.unselectable=I?"off":"on";J.onselectstart=function(){return I};if(document.selection&&document.selection.empty){document.selection.empty()}if(J.style){J.style.MozUserSelect=I?"":"none"}}})(jQuery);

// Load Google Gears JS
(function() {
  var script = document.createElement('script');
  script.src = 'http://code.google.com/apis/gears/gears_init.js';
  document.getElementsByTagName('head')[0].appendChild(script);
})();

/*
  GreasyThug
  Everything from here on down 
  Copyright (c) 2009, STRd6 (http://strd6.com)  
  Liscensed under the MIT License 
*/

/**
 *  Scorpio handles all the database connectivity.
 */
var Scorpio = function() {
  var db;

  var createTables = function(db) {
    db.execute('CREATE TABLE IF NOT EXISTS config (key VARCHAR(16) PRIMARY KEY, value VARCHAR(16))');
    db.execute('CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY, code TEXT)');
    db.execute('CREATE TABLE IF NOT EXISTS scripts (id INTEGER PRIMARY KEY, code TEXT, active BOOLEAN DEFAULT 0)');
  }
  
  var dropTables = function(db) {
    db.execute('DROP TABLE IF EXISTS config');
    db.execute('DROP TABLE IF EXISTS history');
    db.execute('DROP TABLE IF EXISTS scripts');
  }
  
  /** Create and return an object with properties named for the current result set
    row's fieldNames and values.
  */
  function rowToObject(row) {
    var fields = row.fieldCount();
    var object = {};
    
    for(var i = 0; i < fields; i++) {
      object[row.fieldName(i)] = row.field(i);
    }
    
    return object;
  }
  
  function TableInterface(table, options) {
    options = options || {};
    var primaryKey = options.primaryKey || 'id';
  
    return {
      all: function() {
        var rs = db.execute('SELECT * FROM ' + table);
        
        var results = [];
        
        while(rs.isValidRow()) {
          results.push(rowToObject(rs));
          rs.next();
        }
        rs.close();
        
        return results;
      },
      
      create: function(object) {
        var fields = [];
        var values = [];
        var placeholders = [];
        
        $.each(object, function(key, value) {
          fields.push(key);
          values.push(value);
          placeholders.push('?');
        });
        
        db.execute(
          'INSERT INTO ' + table + 
          ' (' + fields.join(', ') + ') ' +
          'VALUES(' + placeholders.join(', ') + ')',
          values
        );
      },
      
      deleteAll: function() {
        db.execute('DELETE FROM ' + table);
      },
      
      find: function(id) {
        var rs = db.execute(
          'SELECT * FROM ' + table + 
          ' WHERE ' + primaryKey + ' = ?', [id]
        );
        
        var result = null;
        
        if(rs.isValidRow()) {
          result = rowToObject(rs);
        }
        rs.close();
        
        return result;
      }
    }
  };

  var self = {
    init: function() {
      db = google.gears.factory.create('beta.database', '1.0');
      db.open('scorpio');
      
      createTables(db);
      
      self.db = db;
    },
    
    reset: function() {
      if(!db) {
        self.init();
      }
      
      dropTables(db);
      createTables(db);
    },
    
    loadConfig: function() {
      var rs = db.execute('SELECT key, value FROM config');
      var config = {};
      
      while(rs.isValidRow()) {
        config[rs.field(0)] = rs.field(1);
        rs.next();
      }
      rs.close();
      
      return config;
    },
    
    storeConfig: function(config) {
      for(var key in config) {
        var value = config[key];
        db.execute('INSERT OR REPLACE INTO config (key, value) VALUES(?, ?)', [key, value]);
      }
    },
    
    loadHistory: function() {
      var rs = db.execute('SELECT code FROM history ORDER BY id ASC');
      var history = [];
      
      while(rs.isValidRow()) {
        history.push(rs.field(0));
        rs.next();
      }
      rs.close();
      
      return history;
    },
    
    storeHistory: function(code) {
      db.execute('INSERT INTO history (code) VALUES(?)', [code]);
    },
    
    deleteScript: function(id) {
      db.execute('DELETE FROM scripts WHERE id = ?', [id]);
    },
    
    scripts: new TableInterface('scripts')
  };
  
  return self;
}();

/**
  Speakeasy abstracts the GM_xmlhttprequest and handles communication with the remote script server.
 */
var Speakeasy = function() {
  var baseUrl = 'http://67.207.139.110:9000/';
  
  function generateArrayDataTransfer(objectType, callback) {
    return function(responseData) {
      var dataArray = eval('(' + responseData + ')');
      var elements = $.map(dataArray, function(element) {
        return element[objectType];
      });
      callback(elements);
    };
  }
  
  function makeRequest(resource, options) {
    var method = options.method || 'GET';
    var url = baseUrl + resource + '.js';
    var headers = {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/json,application/atom+xml,application/xml,text/xml'
    };
    var data = $.param(options.data || '');
    var onSuccess = options.onSuccess || (function(){});
    
    if(method == 'POST') {
      headers['Content-type'] = 'application/x-www-form-urlencoded';
    } else if(method == 'GET') {
      if(data) {
        url += '?' + data;
      }
    }
    
    GM_xmlhttpRequest({
      method: method,
      url: url,
      headers: headers,
      data: data,
      
      onload: function(responseDetails) {
        if(responseDetails.status == 200) {
          onSuccess(responseDetails.responseText);
        } else {
          console.warn(url + ' - ' + responseDetails.status + ':\n\n' + responseDetails.responseText);
        }
      }
    });
  }
  
  function allAnnotations(url, callback) {
    var dataTransfer = generateArrayDataTransfer('annotation', callback);
    
    makeRequest('annotations', {data: {url: url}, onSuccess: dataTransfer});
  }
  
  function allScripts(callback) {
    var dataTransfer = generateArrayDataTransfer('script', callback);
    
    makeRequest('scripts', {onSuccess: dataTransfer});
  }
  
  function script(id, callback) {
    var dataTransfer = function(responseData) {
      var script = eval('(' + responseData + ')').script;
      callback(script);
    }
    makeRequest('scripts/' + id, {onSuccess: dataTransfer});
  }
  
  function createAnnotation(annotation) {
    makeRequest('annotations', {
      method: 'POST',
      data: {
        'annotation[url]': annotation.url,
        'annotation[top]': annotation.top,
        'annotation[left]': annotation.left,
        'annotation[text]': annotation.text
      }
    });
  }
  
  function create(code) {
    makeRequest('scripts', {
      method: 'POST', 
      data: { 
        'script[code]': code
      }
    });
  }

  var self = {
    allAnnotations: allAnnotations,
    createAnnotation: createAnnotation,
    allScripts: allScripts,
    script: script,
    executeScript: function(id){
      self.script(id, function(script) {
        eval(script.code);
      });
    },
    create: create
  };
  
  return self;
}();

/**
* This controls the interactive console for testing the Grease
*/
var IJC = function() {
  var WIDTH = '300px';
  
  function processSuccess(command, result, self) {
    // Clear Input
    input.val('');
    
    // Display output
    puts(command);
    puts(' => ' + result);
  }

  // Private Variables
  var callbacks = {keydown: [], command: [processSuccess]};
  
  var handle = $("<div class='handle'>Interactive JavaScript Console</div>")
    .css({
      'width': WIDTH,
      'padding':'2px 4px',
      'background-color': '#222'
    });
  
  var output = $("<div class='outputBuffer'></div>")
    .css({
      'padding': '4px',
      'height': '250px',
      'width': WIDTH,
      'overflow': 'auto'
    });
    
  var puts = function(text) {
    output.append(document.createTextNode(text));
    output.append('<br />');
    // Scroll to bottom
    output[0].scrollTop = output[0].scrollHeight;
  };
  
  var input = $("<input type='text'></input>")
    .css({
      'width': WIDTH
    })
    .keydown(function(event) {
      $.each(callbacks['keydown'], function(index, callback) {
        callback(event, self);
      });
    });
    
  var form = $("<form action='#' method='get'></form>")
    .css('padding', '2px')
    .append(input);
  
  form.submit( function() {
    var result = '';
    
    // Read Input
    var commandBuffer = input.val();
    
    // Execute
    try {
      result = eval(commandBuffer + ';');
      
      // Run Callbacks
      $.each(callbacks['command'], function(index, callback) {
        callback(commandBuffer, result, self);
      });
    } catch(e) {
      result = e.message;
      puts(result);
    }
    
    // Cancel default form behavior
    return false;
  });

  var chasis = $("<div class='ijc'></div")
    .append(handle)
    .append(output)
    .append(form)
    .css({
      'z-index': '1000',
      'position': 'absolute',
      'background-color': 'black',
      'color': 'green',
      'font-family': 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
      'font-weight': 'bold',
      'text-align': 'left'
    })
    .fadeTo("fast", 0.75)
    .bind('dragstart', function( event ) {
      return $(event.target).is('.handle');
    })
    .bind('drag', function( event ) {
      $( this ).css({
        top: event.offsetY,
        left: event.offsetX
      });
    })
    .bind('dragend', function( event ) {
      Scorpio.storeConfig({
        left: $( this ).css('left'),
        top: $( this ).css('top')
      });
    });

  var self = {
    attach: function(left, top) {
      $("body").append( chasis
        .css({
          'top': top, 
          'left': left
        })
      );
    }, 
    
    input: input,
    
    registerCallback: function(event, callback) {
      if(callbacks[event] != null) {
        callbacks[event].push(callback);
      }
    }
  };
  
  return self;
};

CommandHistory = function(store) {
  var commandHistory = store.loadHistory();
  var historyIndex = commandHistory.length;
  
  function get(index) {
    index = index % commandHistory.length;
    if(index < 0) {
      index += commandHistory.length;
    }
    
    return commandHistory[index];
  }
    
  return {
    /** Adds an entry to the history and to the persistent storage */
    add: function(entry) {
      historyIndex = commandHistory.push(entry);
      store.storeHistory(entry);
    },
    
    /** Return the command at the given index, cycles around when negative */
    get: get,
    
    last: function() {
      return get(commandHistory.length - 1);
    },
    
    /** Loads the next or previous history entry into the console in 
     * response to the up or down arrow key being pressed.
     */
    arrowKeyEvent: function(event, console) {
      var originalIndex = historyIndex;
      
      if (event.keyCode == 38) {
        historyIndex -= 1;
      } else if (event.keyCode == 40) {
        historyIndex += 1;
      }
      
      if(historyIndex != originalIndex) {
        console.input.val(get(historyIndex));
      }
    }
  };
};

var remoteId = 1;

function executeRemoteScript() {
  //alert('test');
  Speakeasy.executeScript(remoteId);
}

function storePreviousAsRemote() {
  Speakeasy.create(commandHistory.last());
}

function enumerateRemote() {
  Speakeasy.allScripts(function(scripts) {
    var display = '';
    
    $.each(scripts, function(index, script) {
      display += script.id + ': ' + script.code + '\n';
    });
    
    alert(display);
  });
}

function createAnnotationForm(x, y) {
  var input = $("<input type='text'></input>");

  var element = $('<form action="#" method="get"></form>')
    .append(input)
    .css({
      'background-color': 'yellow',
      'position': 'absolute',
      'top': y,
      'left': x,
      'z-index': 999
    }).submit( function() {
      var text = input.val();
      var annotation = {top: y, left: x, text: text, url: currentUrl};
      Speakeasy.createAnnotation(annotation);
      element.remove();
      displayAnnotation(annotation);
      return false;
    });
    
  $('body').append(element);
}

function displayAnnotation(annotation) {
  var element = $('<div></div>')
    .append(document.createTextNode(annotation.text))
    .css({
      'background-color': 'yellow',
      'position': 'absolute',
      'top': annotation.top,
      'left': annotation.left,
      'z-index': 999
    });
    
  $('body').append(element);
}

/** Allows existing proctected methods to be called from the page console */
Function.prototype.safeCall = function() {
  var self = this, args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  setTimeout(function() {
    return self.apply(null, args);
  }, 0);
}

$(document).ready(function() {
  if(unsafeWindow.console) {
    console = unsafeWindow.console;
  }
  
  try {
    // Globals
    google = unsafeWindow.google;
    Scorpio.init();
    commandHistory = new CommandHistory(Scorpio);
    
    savePrevious = function() {
      Scorpio.scripts.create({
        code: commandHistory.last(),
        active: 1
      });
    }
    
    // Create menu items
    GM_registerMenuCommand("Execute Remote", executeRemoteScript);
    GM_registerMenuCommand("Store Previous as Remote", storePreviousAsRemote);
    GM_registerMenuCommand("Enumerate Remote", enumerateRemote);
    
    listScripts = function() {
      var scripts = "";
      $.each(Scorpio.scripts.all(), function(index, script) {
        scripts += script.id + '-' + script.active +': ' + script.code + "\n";
      });
      return scripts;
    }

    var config = Scorpio.loadConfig();
    var interactiveConsole = new IJC();
    interactiveConsole.attach(config.left || 0, config.top || 0);
    
    interactiveConsole.registerCallback('command', commandHistory.add)
    interactiveConsole.registerCallback('keydown', commandHistory.arrowKeyEvent);
    
    // Execute Active Local Micro-scripts
    $.each(Scorpio.scripts.all(), function(index, script) {
      if(script.active) {
        try{
          console.log(script.code);
          eval(script.code);
        } catch(e) {
          console.error(e);
        }
      }
    });
    
    // Attach all annotations
    var href = window.location.href;
    currentUrl = href.substring(href.indexOf('://') + 3);
    Speakeasy.allAnnotations(currentUrl, function(annotations) {
      $.each(annotations, function(index, annotation) {
        displayAnnotation(annotation);
      });
    });
    
    // Add annotation creation shizzy
    $('body').click(function(e) {
      if(e.ctrlKey) {
        createAnnotationForm(e.pageX, e.pageY);
      }
    });
  } catch(e) {
    console.error(e);
  }
});
