// ==UserScript==
// @name smileys for gamer.ru
// @author iShift (Shift)
// @version 1.0
// @include http://*gamer.ru*
// @description Smiles for gamer.ru
// @namespace http://google.ru
// ==/UserScript==

                                        
                                        
                                        
                                        (function() {
                                        
                                        if (window.location.hostname.match(/gamer.ru/)) {   
                                        
                                        var map = [
                                          ['grin',       /:D|:\)\)+|=\)\)+/gi],
                                          ['grin',       /\)\)\)+/gi],
                                          ['smiley',     /:\)+|:-\)+|=\)+|:-\]|:\]|=\]/gi],
                                          ['wink',       /;\)+|;-\)+/gi],
                                          ['tongue2',    /:-[pр]|:[pр]|:-[PР]|:[PР]/gi],
                                          ['blank',      /:-\||:\||=\|/gi],
                                          ['sad',        /:\(+|:-\(+|=\(+|:-\[|:\[|=\[/gi],
                                          ['nice',       /^_^/gi],
                                          ['kiss',       /[:;]-\*|[:;]\*/gi]
                                        ];
                                        
                                        // http://spbgu.ru/forums/index.php?act=legends&CODE=emoticons&s=
                                        map = [
                                          ['smile',    /:\)\)+|=\)\)+/gi],
                                          ['smile',    /\)\)\)+/gi],
                                          ['biggrin',    /:D+/gi],
                                          ['smile',      /:\)+|:-\)+|=\)+|:-\]|:\]|=\]/gi],
                                          ['wink',       /;\)+|;-\)+/gi],
                                          ['tongue',     /:-[pр]|:[pр]|:-[PР]|:[PР]/gi],
                                          ['mellow',     /:-\||:\||=\|/gi],
                                          ['sad',        /:\(+|:-\(+|=\(+|:-\[|:\[|=\[/gi],
                                          ['blush2',     /\^_\^/gi],
                                          ['kiss2',      /[:;]-\*|[:;]\*/gi]
                                        ]
                                        
                                        //var substRegex = /([\u0410-\u042f\u0430-\u044f]\s*)([.,?!\)]+)/gi;
                                        
                                        function replacer (m, m1, m2) {
                                          //if (Math.random() > 0.5) {
                                        //  return m1 + pickRandomWord() + m2;
                                        //  } else return m;
                                        } 
                                        
                                        function xform(s) { 
                                          //return s.replace(substRegex, replacer); 
                                          s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                                          for (var i = 0; i < map.length; i++) 
                                          {
                                          
                                            s = s.replace(map[i][1], ' <img ' +
                                                                               'style="margin-bottom:-0.3em;"  ' +
                                                                               'src="http://www.spbgu.ru/forums/html/emoticons/' +
                                                                                map[i][0] +'.gif" alt="" />')
                                                                                
                                            /*s = s.replace(map[i][1], '<img ' +
                                                                               'style="margin-bottom:-0.2em;"  ' +
                                                                               'src="http://www.jms101.btinternet.co.uk/' +
                                                                               'full_sets/gold/circular_subtle_std/' + 
                                                                                map[i][0] +'.gif" alt="" />')*/
                                          }
                                          return s;
                                        } 
                                        
                                        function smilize_node(text_node, p) {
                                          var s = text_node.data;
                                          
                                          var parent = p;
                                          if (!p) parent = text_node.parentNode;
                                          
                                          if (s.match(/\.write/)) {
                                            //alert(s);
                                            return;
                                          }
                                          
                                          try {
                                            // we need this 'cos node is text node.
                                            //var parent = text_node.parentNode;
                                            var new_node = document.createElement("span");
                                            var new_content = xform(s);
                                            if (new_content != s) {
                                              new_node.innerHTML = new_content;
                                              parent.replaceChild(new_node, text_node);
                                            }
                                          }catch(e) {    
                                            //alert(e);
                                          }
                                        }
                                        
                                        // replace in body text 
                                        if (document.evaluate) { 
                                          //with XPath support
                                          var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
                                          for (var i = 0; i < textnodes.snapshotLength; i++) { 
                                             node = textnodes.snapshotItem(i); 
                                             //node.data = xform(node.data);
                                             smilize_node(node, null);
                                          }
                                        } else {
                                          // no XPath -- do recursive
                                          function processNode(node, parent) {
                                              // is this a text node?
                                              if (node.nodeType == 3) {
                                                  //node.data = xform(node.data);
                                                  smilize_node(node, parent);
                                              } else  if (node.nodeType == 1) {
                                                var i;                   
                                                for (i = 0; i < node.childNodes.length; i++) {
                                                    processNode(node.childNodes[i], node);
                                                }
                                            }
                                          }
                                          processNode(document.body, document.body);
                                        }
                                        
                                        } // if (window.location.hostname.match(...))
                                        
                                        })();
                                        