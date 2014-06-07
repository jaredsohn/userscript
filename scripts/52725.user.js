// ==UserScript==

    // @name            Reservierung/Reservation

    // @namespace      DSPHPBB

    // @include        http://*/game.php*

    // ==/UserScript==



    //***************************************************************************

    //*                              reservierung.user.js

    //*                            -------------------

    //*   author               : AZIM, Hathor, studentl

    //*   copyright            : (C) DSphpbb team

    //*   HP                   : www.dsphpbb.net

    //*

    //*   revision              2009/01/14 - 13:40:37

    //*

    //***************************************************************************/



    // Url zum Forum mit / am Ende

    // Url to the forum with a slash at the end

    var dsphpbburl='http://web590.jenny.webhoster.ag/s21/';



    // Url zum DS-Server mit / am Ende

    // Url to the DS server with a slash at the end

    var dsserver = 'http://de21.die-staemme.de';



    //Die Staemme Spielername, zum markieren eigener reservierter Doerfer - Sonderzeichen in HTML-Entry Format. Siehe Forum fuer weitere Infos

    //Tribal Wars playername, so your villages get marked

    var dsuser = 'TotalWar 101';



    //Benutzername in Forum

    //Username in the Forum

    var username = 'TotalWar 101';



    //MD5 Verschlusselte Password (Rueckgabe von: ajax.php?action=get_md5_pass)

    //MD5 encoded password (return value of: ajax.php?action=get_md5_pass&username=FORUMUSER&pass=FORUMPASS)

    var pass_md5 = '$H$9//OSdLjYJSqZZJWe13CR0gyfnfOT9.';



    if(window.frames[1])

    {

       var curloc = window.frames[1].location;

       var doc = window.frames[1].document;

       if(doc.location.href.search(/game.php/)<=0)

       {

          var curloc = window.frames[0].location;

          var doc = window.frames[0].document;

       }

    }

    else

    {

       var curloc = window.location;

       var doc = window.document;

    }



    var search = new RegExp(dsserver, 'i');

    if(curloc.href.search(search) < 0) return;



    if (/screen=map/.test(curloc.search))

    {

       var changed = 0;

       //auslesen des Kartenmittelpunktes

       var allDivs, thisDiv;

       allDivs = document.evaluate(

          "//input[@name='x' or @name='y']",

          document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

       var koords = new Array(2);

       for (var i = 0; i < allDivs.snapshotLength; i++)

       {

          thisDiv = allDivs.snapshotItem(i);

          koords[i] = parseInt(thisDiv.value);

       }

       window.setInterval(

       function()

       {

          if (!check()) return;

          GM_xmlhttpRequest

          ({

             method:'GET',

             url:dsphpbburl+'ajax.php?username='+username+'&pass_md5='+pass_md5+'&action=get_res&mkoor='+koords[0]+'|'+koords[1],

             onload: function(responseDetails)

             {

                eval("var reservedVillages="+responseDetails.responseText);

                var i,map;

                map = document.getElementById('mapOld').firstChild;

                if (!map) map = document.getElementById('mapNew').firstChild;

                var a = map.getElementsByTagName('a');

                for(i in a)

                {

                   if (/village=/.test(a[i].href))

                   {

                      var erg = a[i].href.match(/screen=info_village&id=\d+/)[0].match(/\d+/)[0];

                      var village = in_array(erg, reservedVillages);

                      if (village)

                      {

                         if (a[i].firstChild.tagName != "DIV")

                         {

                            if (a[i].firstChild.src != dsphpbburl+"images/villages/res.gif")

                            {

                               var url = "url(" + a[i].firstChild.src + ")";

                               a[i].parentNode.style.background = url;

                               // if village is my reservation

                               

                               if (village['user'] == dsuser) a[i].firstChild.src = dsphpbburl+"images/villages/myres.gif";

                               // if village is from a thread (unreserved)

                               else if (village['user'] == '' ) a[i].firstChild.src = dsphpbburl+"images/villages/thread.gif";

                               // if village is reserved by so other

                               else a[i].firstChild.src = dsphpbburl+"images/villages/res.gif";

                            }

                         }

                         else

                         {

                            if (a[i].firstChild.childNodes[1].firstChild.src != dsphpbburl+"images/villages/res.gif")

                            {

                               var url = "url(" + a[i].firstChild.childNodes[1].firstChild.src + ")";

                               a[i].parentNode.style.background = url;

                               // if village is my reservation

                               

                               if (village['user'] == dsuser) a[i].firstChild.childNodes[1].firstChild.src = dsphpbburl+"images/villages/myres.gif";

                               // if village is from a thread (unreserved)

                               else if (village['user'] == '' ) a[i].firstChild.childNodes[1].firstChild.src = dsphpbburl+"images/villages/thread.gif";

                               // if village is reserved by so other

                               else a[i].firstChild.childNodes[1].firstChild.src = dsphpbburl+"images/villages/res.gif";

                            }

                         }

                      }

                   }

                }

                changed = map;

             }

          });

       }, 2000);

    }



    if(/screen=info_village/.test(curloc.search))

    {

       //ermitteln der ID des aktuell ausgewählten Dorfes

       var el = curloc.search.match(/screen=info_village&id=\d+/)[0].match(/\d+/)[0];

       GM_xmlhttpRequest

       ({

             method:'GET',

             url:dsphpbburl+'ajax.php?username='+username+'&pass_md5='+pass_md5+'&action=get_res&vid='+el,

             onload: function(responseDetails)

             {

                if(responseDetails.status == 200)

                {

                   eval("var reservedVillages="+responseDetails.responseText);

                   var lang = new Array(3);

                   lang['comment'] = reservedVillages[0]['lang_comment'];

                   lang['reserved'] = reservedVillages[0]['lang_reserved'];

                   lang['reserve'] = reservedVillages[0]['lang_reserve'];

                   lang['available'] = reservedVillages[0]['lang_available'];

                   

                   var village = get_village(reservedVillages, curloc);

                   var allDivs, thisDiv;

                      allDivs = document.evaluate(

                         "//table[@class='vis left']//*/tr",

                         doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

                   thisDiv = allDivs.snapshotItem(5);

                   // Dorf wirklich reserviert

                   if(village && !village['free'] && village['user'] != "")

                   {

                      var tr = document.createElement('tr');

                      var td1 = document.createElement('td');

                      td1.innerHTML = lang['reserved']+':';

                      var td2 = document.createElement('td');

                      var link = document.createElement('a');

                      link.href = village['user_link'];

                      link.title = village['user'];

                      link.innerHTML = village['user'];

                      td2.appendChild(link);

                      tr.appendChild(td1);

                      tr.appendChild(td2);

       

                      thisDiv.parentNode.insertBefore(tr, allDivs.snapshotItem(5));

                      if(village['comment'])

                      {

                         var tr2 = document.createElement('tr');

                         var td11 = document.createElement('td');

                         td11.innerHTML = lang['comment']+':';

                         

                         var td21 = document.createElement('td');

                         td21.innerHTML = village['comment'];

                         tr2.appendChild(td11);

                         tr2.appendChild(td21);

                         thisDiv.parentNode.insertBefore(tr2, allDivs.snapshotItem(5));

                      }

                   } else if(village && !village['free'] && village['user'] == "")

                   {

                      // Reservierungsthread und frei

                      var tr4 = document.createElement('tr');

                      var td1 = document.createElement('td');

                      td1.innerHTML = lang['available']+':';

                      var td2 = document.createElement('td');

                      var a4 = document.createElement('a');

                      var koor = allDivs.snapshotItem(1).innerHTML.match(/(\d{1,3}\|\d{1,3})/);

                      a4.href = dsphpbburl+"ajax.php?username="+username+"&pass_md5="+pass_md5+"&action=add_res&koor="+RegExp.$1;

                      a4.innerHTML = lang['reserve'];

                      a4.target = "_blank";

                      td2.appendChild(a4);

                      tr4.appendChild(td1);

                      tr4.appendChild(td2);

                      thisDiv.parentNode.insertBefore(tr4, allDivs.snapshotItem(5));

                   

                   } else if(responseDetails.status == 200 && !village)

                   {

                      //Dorf frei

                      var tr3 = document.createElement('tr');

                      var td3 = document.createElement('td');

                      var td31 = document.createElement('td');

                      var a3 = document.createElement('a');

                      var koor = allDivs.snapshotItem(1).innerHTML.match(/(\d{1,3}\|\d{1,3})/);

                      a3.href = dsphpbburl+"ajax.php?username="+username+"&pass_md5="+pass_md5+"&action=add_res&koor="+RegExp.$1;

                      a3.innerHTML = lang['reserve'];

                      a3.target = "_blank";

                      td3.appendChild(a3);

                      tr3.appendChild(td3);

                      tr3.appendChild(td31);

                      thisDiv.parentNode.insertBefore(tr3, allDivs.snapshotItem(5));

                   }

                }

             }

       });

    }



    function check() {

       if (changed == 0) return true;

       var map;

       map = document.getElementById('mapOld').firstChild;

       if (!map) map = document.getElementById('mapNew').firstChild;

       return map != changed;

    }

    function in_array(el,arr) {

       var j;

       for (j in arr) {

          if (arr[j]['id'] == el) return arr[j];

       }

       return false;

    }

    function get_village(arr, loc) {

       var el = loc.search.match(/screen=info_village&id=\d+/)[0].match(/\d+/)[0];

       var j;

       for (j in arr)

          if (arr[j]['id'] == el) return arr[j];

       return false;

    }