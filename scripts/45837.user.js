// ==UserScript==
        // @name           Balazs Szabo
        // @namespace      http://viktornagy.com/greasemonkey/balazs_szabo
        // @copyright      2009, Viktor Nagy (http://viktornagy.com)
        // @licence        MIT license; http://www.opensource.org/licenses/mit-license.php
        // @description    Overwrites the senders' name so you won't get distracted and will escape judging the other's opinion
        // @homepage       http://viktornagy.com/blog/2009/04/04/are-you-tired-your-own-preconceptions/
        // @include        https://mail.google.com/*
        // ==/UserScript==
        
        var newName = 'Egy Masik';
        var filteredLabel = 'Ashram';
        var checkTimer = 1000;
        
        function BalazsSzabo(gmail) {
            
            // ThreadList view
            this.filterList = function() {
                // this is the actual message list table
                var listNode = gmail.getActiveViewElement().childNodes[0].childNodes[4].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[8]
                if(listNode.hasChildNodes()) {
                    for (var i=0; i<listNode.childNodes.length; i++) {
                        this.processMessageInList_(listNode.childNodes[i])
                    }
                }
            }
            
            this.processMessageInList_ = function(msg) {
                var labels = this.getItemLabels_(msg.childNodes[4].getElementsByClassName('av'))
                for (var i=0; i<labels.length; i++) {
                    if (labels[i] == filteredLabel) {
                        this.setSenders_(msg)
                    }
                }
            }
            
            this.getItemLabels_ = function(elems) {
                var labels = new Array();
                if (elems.length>0) {
                    for (var i=0; i<elems.length; i++) {
                        if(elems.item(i).hasChildNodes()) {
                            for (var j=0; j<elems.item(i).childNodes.length; j++) {
                                labels[i] = elems.item(i).childNodes[j].nodeValue
                            }
                        }
                    }
                }
                return labels;
            }
            
            this.setSenders_ = function(msg) {
              // for read messages
              this.setSender_(msg.childNodes[2].getElementsByClassName('yP'))
              // for unread messages
              this.setSender_(msg.childNodes[2].getElementsByClassName('zF'))
            }
            
            this.setSender_ = function(senders) {
              for(var i=0; i<senders.length; i++) {
                for (var j=0; j<senders.item(i).childNodes.length; j++) {
                  if(senders.item(i).childNodes[j].nodeValue!='me') {
                    senders.item(i).childNodes[j].nodeValue = newName
                  }
                }
              }
            }
                    
            // Conversation view
            this.filterConversation = function() {
              var baseElem = gmail.getActiveViewElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[1]
              var labels = baseElem.childNodes[0].getElementsByClassName('hN')
              for(var i=0;i<labels.length;i++) {
                for(var j=0;j<labels[i].childNodes.length;j++) {
                  if (labels[i].childNodes[j].nodeValue == filteredLabel) {
                    // the shrinked message authors
                    var senders = baseElem.childNodes[1].childNodes[0].getElementsByClassName('gD')
                    for (var k=0; k<senders.length; k++) {
                      if (senders[k].firstChild.nodeValue)
                        senders[k].firstChild.nodeValue = newName
                    }
                    // the last and starred messages
                    var last = baseElem.childNodes[1].childNodes[0].getElementsByClassName('iw')
                    for(var k=0; k<last.length; k++) {
                        last[k].childNodes[2].childNodes[0].childNodes[0].nodeValue = newName
                    }
                  }
                }
              }
            }
        
            // The routing method
            this.setViewType = function() {
                var str = '';
                switch (gmail.getActiveViewType()) {
                  case 'tl': initialized.filterList(); break;
                  case 'cv': initialized.filterConversation(); break;
        /*          case 'co': str = 'Compose'; break;
                  case 'ct': str = 'Contacts'; break;
                  case 's': str = 'Settings'; break;
                  default: str = 'Unknown';
        */        }
              }
        
            // run it regularly
            var timer = setInterval(this.setViewType, checkTimer);
            // and run it when we definitely need it
            gmail.registerViewChangeCallback(this.setViewType);
            
            return true;
        }
        
        var initialized = false;
        
        function initialize(gmail) {
          if(!initialized) {
            // Timeout needed to ensure gmail API object is fully initialized.
            setTimeout( function(gmail) { initialized = new BalazsSzabo(gmail); }, 0, gmail);
          }
        };
        
        window.addEventListener('load', function() {
            if (unsafeWindow.gmonkey) {
              unsafeWindow.gmonkey.load('1.0', function(gmail) {
                initialize(gmail);
              });
            }
          }, true);
        
        