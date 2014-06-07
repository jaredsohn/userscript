// ==UserScript==
// @name       Koszowiec
// @namespace  http://mongla.net
// @version    0.7
// @include    http://www.ufs.pt/forum/postings.php*
// @include    http://www.ufs.pt/forum/inlinemod.php*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

(function() {
    var css = "\n.wheatButton { vertical-align: top; display: inline-block; padding: 5px 6px 4px; background-color: #FFA502; color: black!important; text-decoration: none!important; border-radius: 4px; font-weight: bold; cursor: pointer; }\n}";
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }
})();

$(document).ready(function ()
                  {
                      $("<a>",
                        {
                            "class": "wheatButton",
                            text: "Do Kosza",
                            "id": "kosz",
                            value: "up",
                            type: "button",
                            style: "position: fixed; top: 160px; right: 85px;"
                        }).appendTo("body"); 
                      $('#kosz').click(function() {
                          kosz();
                      });
                      $("<a>",
                        {
                            "class": "wheatButton",
                            text: "Kosz Kont",
                            "id": "kont",
                            value: "up",
                            type: "button",
                            style: "position: fixed; top: 160px; right: 160px;"
                        }).appendTo("body"); 
                      $('#kont').click(function() {
                          kont();
                      });
                     $("<a>",
                        {
                            "class": "wheatButton",
                            text: "Upload Do Poprawy",
                            "id": "udp",
                            value: "up",
                            type: "button",
                            style: "position: fixed; top: 130px; right: 85px;"
                        }).appendTo("body"); 
                      $('#udp').click(function() {
                          udp();
                      });
                      $("<a>",
                        {
                            "class": "wheatButton",
                            text: "Niezatwierdzone",
                            "id": "niezatwierdzony",
                            value: "niezatwierdzony",
                            type: "button",
                            style: "position: fixed; top: 190px; right: 85px;"
                        }).appendTo("body"); 
                      $('#niezatwierdzony').click(function() {
                          niezatwierdzony();
                      });
                      $("<a>",
                        {
                            "class": "wheatButton",
                            text: "Dubel",
                            "id": "dubel",
                            value: "Dubel",
                            type: "button",
                            style: "position: fixed; top: 220px; right: 85px;"
                        }).appendTo("body"); 
                      $('#debul').click(function() {
                          dubell();
                      });
                      
                      function kosz()
                      {
                         $("select[id='destforumid']").val('21');
                         $("input[value='Przenieś wątek']").first().click()
                      }
                       function udp()
                      {
                         $("select[id='destforumid']").val('132');
                         $("input[value='Przenieś wątek']").first().click()
                      }
                       function niezatwierdzony()
                      {
                         $("select[id='destforumid']").val('507');
                         $("input[value='Przenieś wątek']").first().click()
                      }
                      function dubel()
                      {
                         $("select[id='destforumid']").val('501');
                         $("input[value='Przenieś wątek']").first().click()
                      }
                      function kont()
                      {
                         $("select[id='destforumid']").val('176');
                         $("input[value='Przenieś wątek']").first().click()
                      }
   })