// ==UserScript==
// @name           IS Colorful Timetable
// @author         Witiko <witiko@mail.muni.cz>
// @description    Rozšíření pro práci s rozvrhem v systému IS
// @include        */auth/rozvrh/rozvrh_zobrazeni.pl?*
// @namespace      http://witiko.blogspot.com/
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/387911.meta.js
// @downloadURL    http://userscripts.org/scripts/source/387911.user.js
// @version        1.2.0.2
// ==/UserScript==

/* We set up global constants */
const PREFIXES = {
         HASH_TABLE: "colorfulTimeTable",
                CSS: "colorfulTimeTable",
          DATA_ATTR: "colorfulTimeTable"
       }, AJAX_TIMEOUT = 30,
                DAY_MS = 86400000,
             MINUTE_MS = 60000,
              HOUR_MIN = 60,
   TIMEFLOW_REFRESH_MS = MINUTE_MS,
  TIMETABLE_TIMEZONE_H = 1, LIGHTNESS = {
                CELL_NO_HOVER: 90,
                CELL_HOVER:    93,
                CREDITS_TEXT:  35
              }, RULES = {
                TIMETABLE: "#rozvrh_tabulka",
                 INJECTEE: "form h3",
                SUBJ_CELL: "b > a"
              }, IMAGES = {
             NOTIFICATION: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIPFg0RAfYVtAAABKBJREFUOBEBlQRq+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAACAAAADQAAABsAAAAwAAAADAAAAO0AAADXAAAA4wAAAPQAAAD/AAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAsAAABDAAAAUgAAAAIAAADqAAAA+wAAAAYAAAAYAAAA7QAAALIAAADCAAAA+gAAAAAAAAAAAAAAAAQAAAAAAAAACwAAAGIAAAA7AAAAvwAAAMIAAADgAAAA/gAAAAIAAAAkAAAARQAAAGQAAAAaAAAAqQAAAPkAAAAAAAAAAAAAAAACAAAATgAAAKgAAABHAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAF0AAACoAAAAPQAAAAEAAAAAAAAAAAMAAAANAAAAbwAAAMUAAACsAAAA/QAAAAAAAAAWAAAASQAAAOwAAAD1AAAA/AAAAN4AAAAfAAAAKgAAAMgAAAD7AAAAAAIAAAAcAAAABQAAAMIAAAD9AAAAAAAAAAAAAAAZAAAAVAAAABkAAAAAAAAAAAAAAPQAAADEAAAAIwAAAA4AAAAAAAAAAAIAAAApAAAA6wAAAOEAAAAAAAAAAAAAAAAAAAD7AAAA9wAAAPsAAAAAAAAAAAAAAAAAAADbAAAA8AAAABsAAAAAAAAAAAIAAAASAAAA/QAAAP0AAAAAAAAAAAAAAAAAAAD6AAAA7gAAAPoAAAAAAAAAAAAAAAAAAAD0AAAA+AAAAA4AAAAAAAAAAAIAAADlAAAACAAAAAkAAAAAAAAAAAAAAAAAAAD8AAAA8QAAAPwAAAAAAAAAAAAAAAAAAAARAAAACwAAAOsAAAAAAAAAAAIAAADYAAAAFgAAACMAAAAAAAAAAAAAAAAAAADlAAAAlAAAAOUAAAAAAAAAAAAAAAAAAAAmAAAADAAAAOkAAAAAAAAAAAIAAADqAAAA4wAAAEkAAAAOAAAAAAAAAAAAAAAsAAAAlgAAACwAAAAAAAAAAAAAABQAAABDAAAAzwAAAPEAAAAAAAAAAAMAAAD7AAAA+AAAAEsAAAAIAAAA3wAAAPgAAADqAAAAuAAAAOMAAAD/AAAAFgAAAGAAAAAqAAAApQAAAOQAAAAAAAAAAAMAAAAAAAAA6AAAAAYAAABIAAAAIwAAAAMAAAD8AAAA+gAAABYAAAA0AAAAXQAAACcAAAClAAAAxAAAAP4AAAAAAAAAAAEAAAAAAAAAAAAAAAcAAAAzAAAARAAAACkAAAD2AAAA9gAAAAoAAAAKAAAAzwAAALYAAADYAAAA/AAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAACAAAAA0AAAARAAAAGwAAAOIAAADyAAAA8QAAAPkAAAAAAAAAAAAAAAAAAAAAAAAAANcGWDdwV+DAAAAAAElFTkSuQmCC",
                  STRIPES: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIZCyANVFErdAAAIABJREFUaAUBQie92AEAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH///8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+7DIWYtAAAHTUlEQVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAABAQESAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAEBARIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAQEBEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPUPx3RKzoEcAAAAAElFTkSuQmCC"
              };

/* We set up global variables */
var colors = [
      {
        name: "red",
        hue: 0,
        saturation: 100
      }, {
        name: "green",
        hue: 120,
        saturation: 100
      }, {
        name: "blue",
        hue: 240,
        saturation: 100
      }
    ], hueOffset = 0,
    satOffset = 0,
    dynamicCSSRules = [],
    hashTableManager,
    globalHashTableManager;

/* We set up the prototype methods */
setUpPrototypeMethods();

/* We retrieve the query values */
getSearchQueryValues(function(query) {

  /* We apply the constant CSS rules */
  applyCSS(
    "(!@!keyframes slide { 0% { background-position: 0px, right top; } 100% { background-position: 50px, right top; } }!)",
    ".$cell { (!transition: background-color 0.2s ease-in-out;!) }",
    ".$cell.$curr { (!animation: slide 5s linear infinite;!) }",
    ".$cell.$notification { background-image: url('" + IMAGES.NOTIFICATION + "'); background-repeat: no-repeat; background-position: right top; }",
    ".$cell.$curr { background-image: url('" + IMAGES.STRIPES + "'); background-repeat: repeat; background-position: left top; }",
    ".$cell.$curr.$notification { background-image: url('" + IMAGES.STRIPES + "'), url('" + IMAGES.NOTIFICATION + "'); background-repeat: repeat, no-repeat; background-position: left top, right top; }",
    RULES.INJECTEE + " .$total{ color: black; }",
    RULES.INJECTEE + " .$credits { float: right; opacity: 0; (!transition: opacity 0.2s ease-in-out;!) }",
    "html.$showCredits " + RULES.INJECTEE + " .$credits { opacity: 1; }"
  );

  /* We apply the dynamic CSS rules */
  applyDynamicCSSRules();

  /* We create a hash table manager */
  hashTableManager = getPersistentHashTableManager(
    PREFIXES.HASH_TABLE + ":" + query.fakulta + ":" + query.studium + ":" + query.obdobi
  ); globalHashTableManager = getPersistentHashTableManager(PREFIXES.HASH_TABLE);

  /* If it's not yet been displayed, we display the tutorial */
  globalHashTableManager.get("options", "seenTutorial", function(seen) {
    if(seen) return;
    globalHashTableManager.set("options", "seenTutorial", "true");
    showTutorial();
  });

  /* We preprocess the timetable and retrieve its cells */
  preprocessTimetable(query, function(cells) {

    /* We set up the time monitor */
    timeFlow();

    /* We set up the cells */
    setUpCells(cells, function() {

      /*addEventListener("keydown", function(e) {
        console.log((e || event).keyCode);
      }, false);*/

      /* We set up a mouse listener */
      var x = -1, y = -1;
      addEventListener("mousemove", function(e) {
        e = e || event;
        x = e.pageX || e.clientX;
        y = e.pageY || e.clientY;
      }, false);

      /* We set up the key listener */
      addEventListener("keydown", function(e) {
        e = e || event;
        keydownCallback(
          document.elementFromPoint(x - pageXOffset, y - pageYOffset),
          e.keyCode || e.which
        );
      }, false);

      /* Processing the keydown event */
      function keydownCallback(el, key) {

        /* Element-independent key bindings */
        switch(key) {

          case 88: // 'X', showing the credits
            globalHashTableManager.get("options", "showCredits", function(value) {
              if(value) globalHashTableManager.remove("options", "showCredits");
              else globalHashTableManager.set("options", "showCredits", "true");
            }); return;

        }

        /* Batch element selection key bindings */
        var timeflowEl; if(key !== 65) {  // 'A', batch note addition unsupported
          if(timeflowEl = (getParentByClass(el, parseCSSRule("$day"))
                        || getParentByClass(el, parseCSSRule("$hour")))) {
            for(var k in cells) {
              var cell = cells[k];
              if((timeflowEl.classList.contains(parseCSSRule("$day")) &&
                 !(+cell.getAttribute(parseDataAttr("y-from")) <= +timeflowEl.getAttribute(parseDataAttr("y-from"))
                && +cell.getAttribute(parseDataAttr("y-to"))   <= +timeflowEl.getAttribute(parseDataAttr("y-from"))) &&
                 !(+cell.getAttribute(parseDataAttr("y-from")) >= +timeflowEl.getAttribute(parseDataAttr("y-to"))
                && +cell.getAttribute(parseDataAttr("y-to"))   >= +timeflowEl.getAttribute(parseDataAttr("y-to")))) ||
                 (timeflowEl.classList.contains(parseCSSRule("$hour")) &&
                 !(+cell.getAttribute(parseDataAttr("x-from")) <= +timeflowEl.getAttribute(parseDataAttr("x-from"))
                && +cell.getAttribute(parseDataAttr("x-to"))   <= +timeflowEl.getAttribute(parseDataAttr("x-from"))) &&
                 !(+cell.getAttribute(parseDataAttr("x-from")) >= +timeflowEl.getAttribute(parseDataAttr("x-to"))
                && +cell.getAttribute(parseDataAttr("x-to"))   >= +timeflowEl.getAttribute(parseDataAttr("x-to"))))) {
                keydownCallback(cell, key);
              }
            }
          }
        }

        /* Cell-depenent key bindings */
        var cellEl; if(cellEl = getParentByClass(el, parseCSSRule("$cell"))) switch(key) {

          case 81: // 'Q', setting to red
            hashTableManager.get("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")), function(color) {
              if(color == "red") hashTableManager.remove("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")));
              else hashTableManager.set("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")), "red");
            }); break;

          case 87: // 'W', setting to green
            hashTableManager.get("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")), function(color) {
              if(color == "green") hashTableManager.remove("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")));
              else hashTableManager.set("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")), "green");
            }); break;

          case 69: // 'E', setting to blue
            hashTableManager.get("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")), function(color) {
              if(color == "blue") hashTableManager.remove("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")));
              else hashTableManager.set("colors", cellEl.getAttribute(parseDataAttr("code-full-unique")), "blue");
            }); break;

          case 83: // 'S', clearing the color
            hashTableManager.remove("colors", cellEl.getAttribute(parseDataAttr("code-full-unique"))); break;

          case 65: // 'A', adding a note
            hashTableManager.get("notes", cellEl.getAttribute(parseDataAttr("code-full-unique")), function(note) {
              if(note = prompt(
                cellEl.getAttribute(parseDataAttr("code-full-unique")) + " – Zadejte poznámku:", note || ""
              )) hashTableManager.set(
                "notes", cellEl.getAttribute(parseDataAttr("code-full-unique")), note
              );
            }); break;

          case 68: // 'D', deleting a note
            hashTableManager.remove("notes", cellEl.getAttribute(parseDataAttr("code-full-unique")), "red"); break;

        }

      }

    });

  });

});

/* Function definitions */

  /* A persistent hash table implementation */
  /* The userscript version based on HTML5 localStorage */
  function getPersistentHashTableManager(prefix) {

    var listeners = {
      create : {},  // A new key has been created
      update : {},  // A key's value has been updated
      remove : {}   // A key has been removed
    };

    return {
      keys: keys,
      get: get,
      set: set,
      remove: remove,
      listen: listen
    };

    /* Retrieves all the keys of a given table */
    function keys(table, callback) {
      var k = localStorage.getItem(prefix + ":" + table);
      if(callback) callback(k ? k.split(",") : []);
    }

    /* Retrieves the value of a table's key */
    function get(table, key, callback) {
      if(callback) callback(localStorage.getItem(prefix + ":" + table + "@" + key));
    }

    /* Sets the value of a table's key */
    function set(table, key, value) {
      keys(table, function(k) {
        var i = k.indexOf(key);
        if( i === -1 ) {
          k.push(key);
        } else {
          var oldValue; get(table, key, function(val) {
            oldValue = val;
          });
        }

        localStorage.setItem(prefix + ":" + table, k.join(","));
        localStorage.setItem(prefix + ":" + table + "@" + key, value);

        if( i === -1 ) {
          if(listeners.create[table]) listeners.create[table].forEach(function(callback) {
            callback(key, null, value);
          });
        } else if(listeners.update[table]) listeners.update[table].forEach(function(callback) {
          callback(key, oldValue, value);
        });
      });
    }

    /* Removes a table's key */
    function remove(table, key) {
      keys(table, function(k) {
        var i = k.indexOf(key);
        if( i !== -1 ) {
          k.splice(i, 1);
          var oldValue; get(table, key, function(val) {
            oldValue = val;
          });
        }

        if(k.length) localStorage.setItem(prefix + ":" + table, k.join(","));
        else localStorage.removeItem(prefix + ":" + table);
        localStorage.removeItem(prefix + ":" + table + "@" + key);

        if(i !== -1) {
          if(listeners.remove[table]) listeners.remove[table].forEach(function(callback) {
            callback(key, oldValue, null);
          });
        }
      });
    }

    /* Starts listening for the hash table updates */
    function listen(events, table, callback) {
      events.forEach(function(event) {
        if(!callback || !(event in listeners)) return;
        if(!(table in listeners[event])) listeners[event][table] = [];
        listeners[event][table].push(callback);
      });
    }

  }

  /* Sets up the timetable cells */
  function setUpCells(cells, callback) {

    var tables = [{
          manager: hashTableManager,
          name: "notes",
          callback: function(key, value) {
            if(!(key in cells)) return;
            cells[key].classList.add(parseCSSRule("$notification"));
            cells[key].title = value.replace(/\\n/g, "\n");
          }
        }, {
          manager: hashTableManager,
          name: "colors",
          callback: function(key, value) {
            if(!(key in cells)) return;
            cells[key].classList.add(parseCSSRule("$" + value));
          }
        }, {
          manager: globalHashTableManager,
          name: "options",
          callback: function(key) {
            switch(key) {
              case "showCredits":  $("html").classList.add(parseCSSRule("$showCredits")); break;
              case "seenTutorial": /* Whether we've already seen the tutorial, needs no handling */ break;

              case "hueOffset": globalHashTableManager.get("options", "hueOffset", function(value) {
                                  hueOffset = +value;
                                  applyDynamicCSSRules();
                                }); break;

              case "satOffset": globalHashTableManager.get("options", "satOffset", function(value) {
                                  satOffset = +value;
                                  applyDynamicCSSRules();
                                }); break;

              default: console.log("Found an options key with a malformed value.", arguments);
            }
          }
        }], tablesDone = 0;

    tables.forEach(function(table) {
      forEachKey(table.manager, table.name, table.callback, function() {
        if(++tablesDone === tables.length) {
          preCallback();
        }
      });
    });

    /* A hash table key iterator */
    function forEachKey(manager, table, callback, finalCallback) {
      manager.keys(table, function(keys) {
        var done = 0;
        if(!keys.length) finalCallback();
        else keys.forEach(function(key) {
          manager.get(table, key, function(value) {
            callback(key, value);
            if(++done == keys.length) {
              finalCallback();
            }
          });
        });
      });
    }

    /* We set up the hash table listeners */
    function preCallback() {

      hashTableManager.listen(["update", "create"], "notes", function(key, oldValue, value) {
        if(!(key in cells)) return console.log("Received a note change event for a non-existant cell.", arguments);
        cells[key].title = value.replace(/\\n/g, "\n");
        cells[key].classList.add(parseCSSRule("$notification"));
      });

      hashTableManager.listen(["remove"], "notes", function(key, oldValue) {
        if(!(key in cells)) return console.log("Received a note removal event for a non-existant cell.", arguments);
        cells[key].removeAttribute("title");
        cells[key].classList.remove(parseCSSRule("$notification"));
      });

      hashTableManager.listen(["update", "create"], "colors", function(key, oldValue, value) {
        if(!(key in cells)) return console.log("Received a color change event for a non-existant cell.", arguments);
        if(oldValue) cells[key].classList.remove(parseCSSRule("$" + oldValue));
                     cells[key].classList.add(   parseCSSRule("$" +    value));
      });

      hashTableManager.listen(["remove"], "colors", function(key, oldValue) {
        if(!(key in cells)) return console.log("Received a color removal event for a non-existant cell.", arguments);
        cells[key].classList.remove(parseCSSRule("$" + oldValue));
      });

      hashTableManager.listen(["update", "create", "remove"], "colors", function() {
        printCredits(cells, hashTableManager, true);
      });

      globalHashTableManager.listen(["create", "update"], "options", function(key, oldValue, value) {
        switch(key) {
          case "showCredits": $("html").classList.add(parseCSSRule("$showCredits")); break;
          case "seenTutorial": /* Whether we've already seen the tutorial, needs no handling */ break;

          case "hueOffset": hueOffset = +value;
          case "satOffset": satOffset = +value;
                            applyDynamicCSSRules(); break;

          default: console.log("Received an options creation event with a malformed value.", arguments);
        }
      });

      globalHashTableManager.listen(["remove"], "options", function(key) {
        switch(key) {
          case "showCredits": $("html").classList.remove(parseCSSRule("$showCredits")); break;
          case "seenTutorial": /* Whether we've already seen the tutorial, needs no handling */ break;

          case "hueOffset":   hueOffset = 0;
          case "lightnessOffset": lightnessOffset = 0;
                              applyDynamicCSSRules(); break;

          default: console.log("Received an options removal event with a malformed value.", arguments);
        }
      });

      /* We return to the caller */
      if(callback) callback();

    }

  }

  /* Retrieves a table of GET search query values */
  function getSearchQueryValues(callback) {

    var query = parseSeachQueryValues();  // We retrieve the GET search query values
    if(!("typ" in query) || query.typ != "msu") return;  // We check whether we really are viewing the HTML timetable
    var requiredQueryValues = [ "fakulta", "studium", "obdobi" ];  // The GET search query values needed for the script to function
    if(!requiredQueryValues.every(function(value) {  // We check, whether we have all the GET search query values needed for the script to function
      return value in query;
    })) {

      /* If not, we need to retrieve them ourselves */
      var studentQuery = [];  // First, we retrieve as much of the GET search query values as we can from the current document
      mineForSearchQueryValues(document, requiredQueryValues, function(key, value) {
        studentQuery.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        if(!(key in query)) {  // If it wasn't known
          query[key] = value;  // We store it
          expandHash(key, value);  // We add it to the hash URL fragment to prevent loss of information on page reload
        }
      });

      curl("/auth/student?" + studentQuery.join(";"), function(doc) {  // We load the student page using all the GET search query values available to us
        if(mineForSearchQueryValues(doc, requiredQueryValues, function(key, value) {
          if(key in query) return;  // If it wasn't known
          query[key] = value;  // We store it
          expandHash(key, value);  // We add id to the hash URL fragment to prevent loss of information on page reload
        }) && callback) callback(query);  // If we succeed at retrieving all the required query values, we continue
      });

    } else if(callback) callback(query);  // If we have all the GET search query values needed, we continue

    /* Searches for the given GET search query values in the 'href' attributes of the links in the given document */
    function mineForSearchQueryValues(document, queries, callback) {
      return requiredQueryValues.every(function(value) {
        if(value in query) {
          callback(value, query[value]);
          return true;
        } else return [].some.call(document.getElementsByTagName("a"), function(a) {  // We search through all links on the page
          var index = a.href.indexOf("?");
          if(index === -1) return false;
          var match = a.href.substring(index + 1).match(new RegExp(value + "=([^&;]*)"));  // We are searching for a match for the given GET search query value
          if(match == null) return false;
          callback(value, match[1]);
          return true;
        });
      });
    }

    /* Appends a given GET search query tuple to the URL hash fragment */
    function expandHash(key, value) {
      location.hash += ( location.hash.length > 1 ? ";" : "" ) + encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }

    /* Retrieves a table of GET search query values */
    function parseSeachQueryValues() {
      query = {};
      (location.search.match(/\??([^\?]*)/)[1] + ";" + location.hash.match(/#?([^#]*)/)[1]).split(/;|&/).forEach(function(tuple) {
        tuple = tuple.split("=");
        if(!tuple[1]) return;
        tuple[0] = decodeURIComponent(tuple[0]);
        tuple[1] = decodeURIComponent(tuple[1]);
        if(!(tuple[0] in query)) {
          query[tuple[0]] = tuple[1];
        }
      }); return query;
    }

  }

  /* Prints the credit counts */
  function printCredits(cells, hashTableManager, refresh) {

    /* If we are refresing the credits and the element is not yet in place, we probably haven't downloaded the data yet */
    if(refresh && !$(RULES.INJECTEE).childNodes[1]) return;  // Thus, we ignore the call

    /* We calculate the credits */
    var codes = {
      total: []
    }, credits = {
      total: 0
    }; colors.forEach(function(c) {
      codes[c.name] = [];
      credits[c.name] = 0;
    }), length = 0, index = 0;

    for(var code in cells) ++length;
    for(var code in cells) {

      /* If we have already factored in the course, we ignore it */
      if(codes.total.indexOf(cells[code].getAttribute(parseDataAttr("code"))) === -1) {
        codes.total.push(cells[code].getAttribute(parseDataAttr("code")));
        credits.total += +cells[code].getAttribute(parseDataAttr("credits"));
      }

      (function(code) {hashTableManager.get("colors", code, function(color) {
        /* If we have already factored in the color, we ignore it */
        if( color && codes[color].indexOf(cells[code].getAttribute(parseDataAttr("code"))) === -1) {
          codes[color].push(cells[code].getAttribute(parseDataAttr("code")));
          credits[color] += +cells[code].getAttribute(parseDataAttr("credits"));
        } if(++index == length) cont();
      });})(code);

    }

    function cont() {

      /* We print out the credits */
      var topSpan = document.createElement("span");
      topSpan.classList.add(parseCSSRule("$credits"));

      var span = document.createElement("span");
      span.classList.add(parseCSSRule("$total"));

      var text = document.createTextNode(credits.total + " kr.");
      span.appendChild(text);
      topSpan.appendChild(span);

      var first = true; for(var color in credits) {

        if(color === "total" || credits[color] == 0) continue;

        if(!first) {
          text = document.createTextNode(" / ");
          topSpan.appendChild(text);
        } else {
          text = document.createTextNode(" (");
          topSpan.appendChild(text);
          first = false;
        }

        span = document.createElement("span");
        span.classList.add(parseCSSRule("$" + color));

        text = document.createTextNode(credits[color]);

        span.appendChild(text);
        topSpan.appendChild(span);

      }

      if(!first) {
        text = document.createTextNode(")");
        topSpan.appendChild(text);
      }

      with($(RULES.INJECTEE)) {
        refresh ? replaceChild(topSpan, childNodes[1])
                : appendChild(topSpan);
      }

    }

  }

  /* Preprocesses the timetable */
  function preprocessTimetable(query, parsedCallback) {
    cells = {}; (function(requests, completed) {
      var arr = [].filter.call($$(RULES.TIMETABLE + " td"), function(cell) {
        return $(cell, RULES.SUBJ_CELL);
      }); arr.forEach(function(cell) {  // We retrieve data for the subjects and store it in the cells
        cell.classList.add(parseCSSRule("$cell"));
        var link = $(cell, RULES.SUBJ_CELL);
        var subjCode; cell.setAttribute(parseDataAttr("code-full"), subjCode = link.childNodes[0].nodeValue);

          (function(suffix) {  // We store the cell with a unique name resolving possible collisions of multiple lessons of the same subject
            for(var key = subjCode; key in cells; suffix++) {
              key = subjCode + "." + suffix;
            } cells[key] = cell;
            cell.setAttribute(parseDataAttr("code-full-unique"), key);
          })(0);

                     cell.setAttribute(parseDataAttr("code"), subjCode = subjCode.match(/([^\/]+)/)[1]);
        var subject; cell.setAttribute(parseDataAttr("id"),   subject  = link.href.match(/\?.*id=([^&]+)/)[1]);
        post("/auth/student/student_ajax.pl", "fakulta=" + query.fakulta +  // We send an HTTP request for credit count
                                             ";obdobi="  + query.obdobi  +
                                             ";studium=" + query.studium,
                                              "fakulta="     + query.fakulta +
                                             "&obdobi="      + query.obdobi  +
                                             "&studium="     + query.studium +
                                             "&predmet="     + subject +
                                             "&predmet_kod=" + subjCode +
                                             "&op=predmet-rozcestnik&jazyk=cs", function(doc) {  // We process the response
                                               var kredity = $(doc, ".zapis_info li");
                                               if(kredity === null) return console.log("I failed at loading the credit count of the subject", {
                                                 predmet: subject,
                                                 predKod: subjCode,
                                                 doc: doc  // We store the credit count values
                                               }); cell.setAttribute(parseDataAttr("credits"), kredity.childNodes[0].nodeValue.match(/\d+/)[0]);
                                               if(++completed == arr.length) printCredits(cells, hashTableManager);
                                             });  // If that was the last request, we print the total credit count
      });
    })(0, 0);
    if(parsedCallback) parsedCallback(cells);
  }

  /* Allows the display of the current time by the timetable */
  function timeFlow() {

    /* We obtain and transform the day and time col and row respectively */
    var rows = [].slice.call($$(RULES.TIMETABLE + " tr"), 1),
        days = [].slice.call($$(RULES.TIMETABLE + " th"), 1).map(function(th) {
          switch(th.textContent) {
            case "Mon": case "Po": return new Day(1, +th.rowSpan, th);
            case "Tue": case "Út": return new Day(2, +th.rowSpan, th);
            case "Wed": case "St": return new Day(3, +th.rowSpan, th);
            case "Thu": case "Čt": return new Day(4, +th.rowSpan, th);
            case "Fri": case "Pá": return new Day(5, +th.rowSpan, th);
            default: console.log("Unknown name of a day", th.textContent);
          }
        }), hours = [].slice.call($(RULES.TIMETABLE + " tr").children, 1).map(function(tr) {
          var time = tr.textContent.split(":");
          return new Hour(time[0] * 60 + (+time[1]), +tr.getAttribute("colspan"), tr);
        }); hours.push(new Hour(hours[hours.length - 1].time + (hours[1].time - hours[0].time)));

    /* We set up additional time- and position-related data to the cells */
    (function() {
      var row = 0; days.forEach(function(day) {
        day.element.classList.add(parseCSSRule("$day"));
        day.element.setAttribute(parseDataAttr("y-from"), row);
        day.element.setAttribute(parseDataAttr("y-to"), row += (day.element.rowSpan || 1));
      }); var col = 0; hours.forEach(function(hour) {
        if(!hour.element) return;
        hour.element.classList.add(parseCSSRule("$hour"));
        hour.element.setAttribute(parseDataAttr("x-from"), col);
        hour.element.setAttribute(parseDataAttr("x-to"), col += (hour.element.colSpan || 1));
      });
    })(); forEachCell(function(row, rowEl, col, colEl) {
      colEl.setAttribute(parseDataAttr("x-from"), col);
      colEl.setAttribute(parseDataAttr("x-to"), col + (colEl.colSpan || 1));
      colEl.setAttribute(parseDataAttr("y-from"), row);
      colEl.setAttribute(parseDataAttr("y-to"), row + (rowEl.rowSpan || 1));
    });

    /* We set up the timeouts and intervals */
    forEachCell(displayCurrent);
    setInterval(function() {
      forEachCell(displayCurrent);
    }, TIMEFLOW_REFRESH_MS);

    /* Visually marks the subject in session */
    function displayCurrent(row, rowEl, col, colEl) {
      var date = new Date;
      var now = date.getTime() + ((HOUR_MIN * (TIMETABLE_TIMEZONE_H + (dst(date) ? 1 : 0)) + date.getTimezoneOffset()) * MINUTE_MS);
      if(getDate(row, col).getTime() <= now
      && getDate(row, col + colEl.colSpan).getTime() >= now) {
        if(!colEl.classList.contains(parseCSSRule("$curr"))) colEl.classList.add(parseCSSRule("$curr"));
      } else {
        if( colEl.classList.contains(parseCSSRule("$curr"))) colEl.classList.remove(parseCSSRule("$curr"));
      }
    }

    /* Cell iterator */
    function forEachCell(callback) {
      if(!callback) return;
      var row = 0; rows.forEach(function(rowEl) {
        var col = 0; [].forEach.call($$(rowEl, "td"), function(colEl) {
          if(colEl.classList.contains(parseCSSRule("$cell"))) {
            callback(row, rowEl, col, colEl);
          } col += colEl.colSpan || 1;
        }); row += rowEl.rowSpan || 1;
      });
    }

    /* Returns the time of a cell at the given coordinates */
    function getDate(row, col) {

      var date = new Date;

      var i = 0; for(; row >= days[i].rowSpan && i < days.length - 1; row -= days[i++].rowSpan);
      date.setTime(date.getTime() + DAY_MS * (days[i].day - date.getDay()));

      var i = 0; for(; col >= hours[i].colSpan && i < hours.length - 2; col -= hours[i++].colSpan);
      var mins = hours[i    ].time * ((hours[i].colSpan-col) / hours[i].colSpan)
               + hours[i + 1].time * ((col) / hours[i].colSpan);

      date.setHours(Math.floor(mins / 60));
      date.setMinutes(mins % 60);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;

    }

    /* This prototype represents a day cell in the timetable */
    function Day(day, rowSpan, element) {
      this.day = day || 0;
      this.rowSpan = rowSpan || 0;
      this.element = element || null;
    }

    /* This prototype represents a hour cell in the timetable */
    function Hour(time, colSpan, element) {
      this.time = time || 0;
      this.colSpan = colSpan || 0;
      this.element = element || null;
    }

  }

  /* We display the tutorial */
  function showTutorial() {
    alert("IS Colorful Timetable | Rychlý přehled:\n\n"
        + "  Ovládání:\n"
        + "    Q – Obarvi políčko, na které míří myš, na červeno\n"
        + "    W – Obarvi políčko, na které míří myš, na zeleno\n"
        + "    E – Obarvi políčko, na které míří myš, na modro\n"
        + "    S – Smaž obarvení políčka\n"
        + "    A – Přidej k políčku, na které míří myš, poznámku\n"
        + "    D – Odeber z políčka, na které míří myš, poznámku\n"
        + "    X – Zobraz / skryj výpis počtu kreditů\n\n"
        + "  Zajímavosti:\n"
        + "    Zaměřit myší lze i jednotlivé dny / hodiny\n"
        + "    Aktuálně probíhající hodiny jsou graficky vyznačeny");
  }

  /* A DOM query shorthand functions */
  function $(doc, query) {
    if(!query) {
      query = doc;
      doc = null;
    } return (doc || document).querySelector(query);
  } function $$(doc, query) {
    if(!query) {
      query = doc;
      doc = null;
    } return (doc || document).querySelectorAll(query);
  }

  /* A frontend function to reacquire and reapply dynamic CSS rules */
  function applyDynamicCSSRules() {
    createDynamicCSSRules(dynamicCSSRules);
    dynamicCSSRules.forEach(function(rule) {
      rule.applyCSS();
    });
  }

  /* (Re)creates a set of dynamic CSS rules */
  function createDynamicCSSRules(rules) {
    rules = rules || [];
    var i = 0; colors.forEach(function(c) {
      rules[i++] = new Rule(parseCSSRule(".$cell.$" + c.name + " { background-color: hsl(" + (c.hue + hueOffset) + "," + (c.saturation + satOffset) + "%," + LIGHTNESS.CELL_NO_HOVER + "%); }"));
      rules[i++] = new Rule(parseCSSRule(".$cell.$" + c.name + ":hover { background-color: hsl(" + (c.hue + hueOffset) + "," + (c.saturation + satOffset) + "%," + LIGHTNESS.CELL_HOVER + "%); }"));
      rules[i++] = new Rule(parseCSSRule(RULES.INJECTEE + " .$" + c.name + " { color: hsl(" + (c.hue + hueOffset) + "," + (c.saturation + satOffset) + "%," + LIGHTNESS.CREDITS_TEXT + "%); }"));
    }); return rules;
  }

  /* This prototype represents a dynamic CSS rule */
  function Rule(rule) {
    this.rule = rule;
    this.element = null;
  }


  /* Sets up prototype methods */
  function setUpPrototypeMethods() {

    /* (Re)applies the CSS rule */
    Rule.prototype.applyCSS = function() {
      if(!this.element) {
        this.element = document.createElement("style");
        this.element.setAttribute("type", "text/css");
        $("head").appendChild(this.element);
      } var rule = document.createTextNode(this.rule);
      if(this.element.childNodes.length) {
        this.element.replace(rule, this.element.childNodes[0]);
      } else {
        this.element.appendChild(rule);
      }
    };

  }

  /* Applies a set of CSS rules */
  function applyCSS() {
    [].forEach.call(arguments, function(cssText) {
        var style; with(style = document.createElement("style")) {
        type = "text/css";
        appendChild(document.createTextNode(parseCSSRule(cssText)));
      } $("head").appendChild(style);
    });
  }

  /* Returns parent element of a given cell / null */
  function getParentByClass(el, className) {
    for(; el && !el.classList.contains(className); el = el.parentElement);
    return el;
  }

  /* Parses a CSS rule */
  function parseCSSRule(rule) {
    return rule.replace(
      /\$/g, PREFIXES.CSS + "-"
    ).replace(
      /\(!([^!]*?)!?([^!]+?)!\)/g, "$1$2\n$1-webkit-$2\n$1-moz-$2\n$1-o-$2\n$1-ms-$2"
    );
  }

  /* Parses a data attribute name */
  function parseDataAttr(attr) {
    return "data-" + PREFIXES.DATA_ATTR + "-" + attr;
  }

  /* A pair of functions testing for the daylight saving time */
  function stdTimezoneOffset(date) {
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  function dst(date) {
    return date.getTimezoneOffset() < stdTimezoneOffset(date);
  }

  /* The frontend Ajax functions */
  function curl(url, callback) {
    ajax(url, "GET", {}, null, AJAX_TIMEOUT, callback);
  } function post(url, query, data, callback) {
    ajax(url + "?" + query, "POST", {
      "Content-Type" : "application/x-www-form-urlencoded"
    }, data, AJAX_TIMEOUT, callback);
  }

  /* The backend Ajax implementation */
  function ajax(url, method, headers, data, timeout, callback) {
    var xhr = new XMLHttpRequest, args = arguments,
        done = false, timeoutID = setTimeout(tryAgain, timeout * 1000);

    xhr.onreadystatechange = function() {
      if(done || xhr.readyState !== 4) return;                           // If we are already 'done', or if the request has not yet been processed, we ignore the callback
      clearTimeout(timeoutID); done = true;                              // Otherwise, we clear the timeout and set the 'done' flag
      if(!xhr.responseText || xhr.status !== 200) return tryAgain();     // If the response is empty, or if we receive an error status, we retry the request
      var doc = document.implementation.createHTMLDocument("");          // Otherwise, we turn the response into a DOM document and return it via a callback function
      doc.documentElement.innerHTML = xhr.responseText;
      if(callback) callback(doc);
    }; xhr.open(method, url, true); for(var i in headers) {              // We set the headers
       xhr.setRequestHeader(i, headers[i]);
    }  xhr.send(data);                                                   // We send the request

    function tryAgain() {                                                // If the time's out, we retry the request
      ajax.apply(this, args);
    }
  }
