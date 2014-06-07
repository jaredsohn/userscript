// ==UserScript==
// @name            Prasačia chripka mäkčenizátor  [based on Facebook - Customize Word "Friend" script]
// @namespace     
// @description     Replaces any instances of the word "prasačia" with prasačia
// ==/UserScript==

(function () {
          
            var replacements, regex, key, textnodes, node, s;
          
          
          replacements = {
            "prasac": "prasač",
            "Prasac": "Prasač",
            };
          regex = {};
          for ( key in replacements ) {
            regex[key] = new RegExp(key, 'g');
          }
          
          textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
          for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
            node = textnodes.snapshotItem(i);
            s = node.data;
            for ( key in replacements ) {
              s = s.replace( regex[key] , replacements[key] );
            }
            node.data = s;
          }
          
          })();
          