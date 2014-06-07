// ==UserScript==
// @name          Tibia Enhancement
// @include       http://www.tibia.com/community/?subtopic=character*
// @include       http://www.tibia.com/community/?subtopic=guilds*
// @include       http://forum.tibia.com/*
// @include       http://forum.tibia.com/forum/?action=new_post*
// @include       http://forum.tibia.com/forum/?action=new_thread*
// @include       http://forum.tibia.com/forum/?action=quote
// @include       http://forum.tibia.com/forum/?action=report_post&postid=*
// @include        http://www.tibia.com/community/?subtopic=killstatistics
// @author        Utwo (webcoding.ueuo.com/blog)
// @description   All Tibia script in one + Link from Tibia character to TibiaML
// @version       0.0
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tibia Enhancement", and click Uninstall.
//
// --------------------------------------------------------------------
//Start Tibia monster checker
    var wordArray = ["Ashmunrah","dryads","Rahemos","lavaholes","mechanical fighters","hell holes","mad technomancers","Sharptooth","Splasher","Inky","Thalas","Total","shredderthrowers","flamethrowers","players","Zugurosh","zombies","Yalaharis","Yakchal","wyverns","wyrms","witches","wisps","wolves","wild warriors","werewolves","Webster","wasps","war wolves","warlocks","Vashresamun","vampire","valkyries","Ushuriel","Ungreez","toads","tigers","tortoises","thieves","The weakened Count","The Pit Lord","The Obliverator","The Masked Marauder","The Hairy One","The Hag","The Dark Dancer","The Count","terror","tarantulas","Svoren","stalkers","squirrels","spit nettles","spirits of","spectres","sons of","snakes","smugglers","slimes","Slim","skunks","skeleton","sibangs","serpent","seagulls","scorpions","scarabs","rotworms","Rocky","rift","rats","rabbits","quara","Pythius","priestesses","poachers","plaguethrowers","plaguesmiths","pirate","pigs","phantasms","parrots","pandas","Orcus","orc","Omruc","Norgle","nomads","nightstalkers","nightmare","necromancer","mutated","mummies","Morik","monks","Massacre","Mahrdis","magicthrowers","Overlords","Azerus","minotaur","merlkins","blobs","elementals","Marziel","marid","mammoths","magic pillars","mad scientists","Madareth","lost souls","lizard","lions","liches","Lersatio","Latrivan","larvas","Kreebosh","Koshei","kongras","juggernauts","troll","infernalists","ice witches","hydras","hyaenas","huskies","hunters","heroes","hellspawns","hellhounds","Achad","Hellgorak","haunted","hands of cursed fate","grim","Grimgor","gozzler","Golgordan","goblin","Gnorre","gladiators","acid blobs","amazons","the cult","ancient scarabs","Annihilon","Arthei","assassins","Avalanche","Axeitus Headbanger","frogs","badgers","bandits","banshees","barbarian","bats","bears","behemoths","beholders","betrayed","black knights","sheep","blightwalkers","crabs","Bloodpaw","djinns","bog raiders","bonebeasts","Boreth","Bovinus","braindeaths","bugs","butterflies","carniphi","carrion","cats","cave rats","centipedes","chakoya","chickens","cobras","cockroaches","Colerian","crazed","crocodiles","crypt shamblers","spiders","cursed gladiators","cyclop","golem","Darakan","dark","death blobs","Deathbringer","deathspawns","deer","defiler","demon","destroyers","diabolic","Dipthrah","penguin","diseased","dogs","dragon","Drasilla","dreadbeasts","dwarf","dworc","earth elementals","efreet","elder","(elemental forces)","elephants","elf","elves","energy","Fallen","fire","flamingoes","frost","Frost","furies","gang m","gargo","gazer","ghost","ghoul"]

    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
   
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() {
        for(i in wordArray) {
            $("TD:contains('" + wordArray[i] + "')").each(function() {
                $(this.parentNode).remove();
            });   
        }
    }
//stop tibia monster checker
//Start Forum expand
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getIgnoredPlayers() {
   var ignored = [];

   var cnt = GM_getValue('count', -1);

   if (cnt < 0) return ignored;

   for (var c = 0; c < cnt; c++) {
      if (GM_getValue('player'+c, '') == '')
          break;

      ignored.push(GM_getValue('player'+c));
   }

   return ignored;
}

window.ignored = [];

function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}

function putIgnoredPlayers(ignored) {
   var reallength = 0;

   for (var c = 0; c < ignored.length; c++) {
       if (ignored[c] !== undefined)
           reallength++;
   }

alert('Saving ' + reallength + ' players. Please refresh the page.');
   window.setTimeout(GM_setValue, 0, 'count', reallength);

   var realc = 0;

   for (var c = 0; c < ignored.length; c++) {
      if (ignored[c] !== undefined) {
          window.setTimeout(GM_setValue, 0, 'player'+realc, ignored[c]);
          realc++;
      }
   }
}

(function() {
    window.ignored = getIgnoredPlayers();

    var xpath_threadstarter = '//table/tbody/tr/td[4]/a/text()';
    var xpath_lastpost = '//table/tbody/tr/td[7]/font/a/text()';
    var xpath_post = '//table/tbody/tr/td[1]/div/b/a/text()';
    var xpath_reply = '//table/tbody/tr/td[1]/a/text()';

    var result = document.evaluate(xpath_threadstarter, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var msg = '';

    if (result.snapshotLength) {
        for (var c = 0; c < result.snapshotLength; c++) {
            var a_player = result.snapshotItem(c);
            var player = a_player.textContent.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
            msg += player + "\n";

            if (player in oc(window.ignored)) {
                a_player.parentNode.parentNode.parentNode.style.display = 'none';
            }
        }
    }

    var result = document.evaluate(xpath_lastpost, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var msg = '';

    if (result.snapshotLength) {
        for (var c = 0; c < result.snapshotLength; c++) {
            var a_player = result.snapshotItem(c);
            var player = a_player.textContent.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
            msg += player + "\n";

            if (player in oc(window.ignored)) {
                a_player.parentNode.parentNode.innerHTML = 'by &lt;IGNORED&gt;';
            }
        }
    }

    var result = document.evaluate(xpath_post, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var msg = '';

    if (result.snapshotLength) {
        for (var c = 0; c < result.snapshotLength; c++) {
            var a_player = result.snapshotItem(c);
            var player = a_player.textContent.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
            msg += player + "\n";

            if (player in oc(window.ignored)) {
                a_player.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                a_player.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.style.display = 'none';
            }
        }
    }

    var result = document.evaluate(xpath_reply, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var msg = '';

    if (result.snapshotLength) {
        for (var c = 0; c < result.snapshotLength; c++) {
            var a_player = result.snapshotItem(c);
            var player = a_player.textContent.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
            msg += player + "\n";

            if (player in oc(window.ignored)) {
                a_player.parentNode.parentNode.parentNode.style.display = 'none';
            }
        }
    }

    addGlobalStyle(
  '#erig_forumignorebox { position: absolute; top: 10px; left: 10px; margin: 0; height: 1em; width: 1em; border: solid 1px black; background-color: #fff; overflow: scroll; }'
+ '#erig_forumignorebox_inner { border-top: solid 1px black; padding-top: 1em; }'
+ '#erig_forumignorebox a {'
+ '  font-family: Verdana, Arial, Times New Roman, sans-serif;'
+ '  font-weight: bold;'
+ '  color: #004294;'
+ '  font-size: 0.8em;'
+ '  text-decoration: none;'
+ '}'
);

    erig_forumignorebox_toggle = function() {
        var a = document.getElementById('erig_forumignorebox_a');
        var inner = document.getElementById('erig_forumignorebox_inner');

        if (inner.style.display == '') {
            a.innerHTML = '+';
            inner.style.display = 'none';
            inner.parentNode.style.width = '1em';
            inner.parentNode.style.height = '1em';
        }
        else {
            a.innerHTML = '&mdash;';
            inner.style.display = '';
            inner.parentNode.style.width = '200px';
            inner.parentNode.style.height = '300px';
        }

        return false;
    }
    unsafeWindow.erig_forumignorebox_toggle = erig_forumignorebox_toggle;

    erig_forumignorebox_add = function() {
        var player = prompt('Please enter the name of the player you wish to ignore:');

        if (player) {
            window.ignored.push(player);
            putIgnoredPlayers(window.ignored);
        }

        return false;
    }
    unsafeWindow.erig_forumignorebox_add = erig_forumignorebox_add;

    erig_forumignorebox_del = function(c) {
        window.ignored[c] = undefined;
        putIgnoredPlayers(window.ignored);

        return false;
    }
    unsafeWindow.erig_forumignorebox_del = erig_forumignorebox_del;


    var box = document.createElement('div');
    box.innerHTML = '<div><a id="erig_forumignorebox_a" href="#" onclick="return erig_forumignorebox_toggle()">+</a></div><div id="erig_forumignorebox_inner" style="display: none">';

    for (var c = 0; c < window.ignored.length; c++) {
        box.innerHTML += window.ignored[c] + ' <a href="#" onclick="return erig_forumignorebox_del(' + c + ')">[del]</a><br />';
    }

    box.innerHTML += '<br /><a href="#" onclick="return erig_forumignorebox_add()">[add]</a></div>';
    box.id = 'erig_forumignorebox';

    document.body.appendChild(box);

//    alert(msg);
})();
// forum ignore
(function() {
//Forum expand
if (document.getElementById('ThemeboxesColumn')) {
        document.getElementById('ThemeboxesColumn').style.display = 'none';
    }

    if (document.getElementById('ContentColumn')) {
        document.getElementById('ContentColumn').style.marginLeft = 160;
        document.getElementById('ContentColumn').style.marginRight = -20;
    }

    if (document.getElementById('MenuColumn')) {
        document.getElementById('MenuColumn').style.marginLeft = -20;
    }
// stop Forum expand
// start tibia hosu view
var trs = document.getElementsByTagName('tr');
  var re = new RegExp('^(.+) \\((.+?)\\) (.+?)$');
  var fc;
  var world = '';
  var house = '';
  var city = '';
  var request;
  var house_code = null;
  
  httprecv = function() {
    if (request.readyState != 4) return;
    var text = request.responseText;
    var m;
    var h;
    house_code = null;
    text = text.replace(/\r|\n/g, '');
    house = house.replace(/(\xa0|&nbsp;| )/g, '&#160;');
    var regex = new RegExp('<TR(.*?)</FORM>', 'gi');
    var regex2 = new RegExp('<TD.*?>(.*?)</', 'i');
    var regex3 = new RegExp('<form(.*?)$', 'i');
    while((m = regex.exec(text)) != null) {
      h = regex2.exec(m[1]);
      h[1] = h[1].replace(/<NOBR>/gi, '');
      if (h[1] == house) {
        m = regex3.exec(m[1]);
        house_code = m[0];
        house_code = house_code.replace(/<td>|<tr>|<\/td>|<\/tr>/gi, '');
        break;
      }
    }
//    if (house_code != null) { fc.nextSibling.innerHTML = fc.nextSibling.innerHTML + "<p>" + house_code + "</FORM></p>"; }
    if (house_code != null) { fc.nextSibling.innerHTML = house_code + " " + fc.nextSibling.innerHTML + "</FORM>"; }
  }

  getworldtownhouses = function() {
    request = new XMLHttpRequest();
    request.onreadystatechange = httprecv;
    var params = "world=" + world + "&town=" + city + "&state=&order=&type=houses";
    var url = 'http://www.tibia.com/community/?subtopic=houses';
    request.open('POST', url);
    //Send the proper header information along with the request
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
    return false;
  }

  for (var i = 0; i < trs.length; i++) {
    if (trs[i].firstChild) {
      fc = trs[i].firstChild;

      if (fc.innerHTML == 'World:') {
        world = fc.nextSibling.textContent;
        fc.nextSibling.innerHTML = '<a href="/community/?subtopic=whoisonline&amp;world=' + world + '">' + world + '</a>';
      }
      if (fc.innerHTML == 'House:' && world) {
        var txt = fc.nextSibling.textContent;
        var matches = re.exec(txt);
        if (matches.length) {
          house = matches[1];
          city = matches[2];
          getworldtownhouses();
          break;
        }
      }
    }
  }
//stop tibia house view
// start tibia character search
   var getatr = document.getElementsByTagName('tr')
   var getaa = document.getElementsByTagName('a')   
   for (var i = 0; i < getatr.length; i++) {
      if (getatr[i].firstChild) {; var gotatr = getatr[i].firstChild
if (gotatr.innerHTML == 'Married to:') {
            var boname = gotatr.nextSibling.textContent; var finame = boname.split(','); var name = finame[0]; var lname = name.replace(/ /g,'_'); var delname = finame[1]
            if (delname) { gotatr.nextSibling.innerHTML = '<a href="/community/?subtopic=characters&name=' + lname + '">' + name + '</a> <span style="font-size: 10px">' + delname + '</span><br> <span style="font-size: 10px">[ Search character: <a href="http://en.tibiaml.com/character/' + lname + '">TibiaML</a>]</span>' }
            else { gotatr.nextSibling.innerHTML = '<a href="/community/?subtopic=characters&name=' + lname + '">' + name + '</a><br><span style="font-size: 10px">[ Search character: <a href="http://en.tibiaml.com/character/' + lname + '">TibiaML</a>]</span>' }
         }
if (gotatr.innerHTML == 'Residence:') {
            var boname = gotatr.nextSibling.textContent; var finame = boname.split('_'); var name = finame[0]; var lname = name.replace(/ /g,'_'); var delname = finame[1]
            if (delname) { gotatr.nextSibling.innerHTML = '<a href="/community/?subtopic=characters&name=' + lname + '">' + name + '</a> <span style="font-size: 10px">' + delname + '</span><br> <span style="font-size: 10px">[ Search place: <a href="http://tibia.wikia.com/wiki//' + lname + '">TibiaWiki</a>]</span>' }
            else { gotatr.nextSibling.innerHTML = '<a href="http://www.tibia.com/library/?subtopic=maps&region=' + lname + '">' + name + '</a><br><span style="font-size: 10px">[ Search place: <a href="http://tibia.wikia.com/wiki/' + lname + '">TibiaWiki</a>]</span>' }
         }

         if (gotatr.innerHTML == 'Name:') {
            var boname = gotatr.nextSibling.textContent; var finame = boname.split(','); var name = finame[0]; var lname = name.replace(/ /g,'_'); var delname = finame[1]
            if (delname) { gotatr.nextSibling.innerHTML = '<a href="/community/?subtopic=characters&name=' + lname + '">' + name + '</a> <span style="font-size: 10px">' + delname + '</span><br> <span style="font-size: 10px">[ Search character: <a href="http://en.tibiaml.com/character/' + lname + '">TibiaML</a>]</span>' }
            else { gotatr.nextSibling.innerHTML = '<a href="/community/?subtopic=characters&name=' + lname + '">' + name + '</a><br><span style="font-size: 10px">[ Search character: <a href="http://en.tibiaml.com/character/' + lname + '">TibiaML</a>]</span>' }
         }

         if (gotatr.innerHTML == 'World:') {
            var worname = gotatr.nextSibling.textContent
            gotatr.nextSibling.innerHTML = '<a href="http://www.tibia.com/community/?subtopic=whoisonline&world=' + worname + '">' + worname + '</a><br><span style="font-size: 10px">[ Search world: <a href="http://en.tibiaml.com/world/' + worname + '">TibiaML</a>]</span>'
       }  
      }

  }
//stop tibia charachter search
//start who's online
 var header;
    var request;
    var players = [];
    var oplayers = [];
    var oplayers_l = [];
    var oplayers_v = [];
    var players_o = [];
    var tab;

    hideonline = function() {
        var find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
        var result1 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var c = 0; c < result1.snapshotLength; c++) {
            player = result1.snapshotItem(c);
            player.parentNode.parentNode.parentNode.style.display = '';

            var player2 = player.textContent;
            player2 = player2.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');

            player.parentNode.parentNode.innerHTML = players_o[player2];
        }

        header.innerHTML = header.origHTML + ' (<a href="/" onclick="return showonline()" style="color: green">[Show Online]</a>) <span style="font-size: 9px">Guild Members: ' + members + '</span>';
        return false;
    }
    unsafeWindow.hideonline = hideonline;

    var find = '/html/body/div/div/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]';

    var result2 = document.evaluate(find, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var parent = result2.iterateNext();

    if (parent == null)
        return;

    function findworld(find) {
        var result3 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        var worldline = result3.iterateNext().textContent;
        var regex = new RegExp('The guild was founded on (.+?) on', 'g');
        if (worldline.match(regex)) {
            var m = regex.exec(worldline);
            if (m)
                return m[1];
        }
        else
            return '';
    }

    var world = findworld('text()[3]');
    if (world == '')
        world = findworld('text()[2]');
    if (world == '')
        return;

    tab = 2;

    var find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
    var result5 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (result5.snapshotLength == 0) {
        tab = 3;
        find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
        result5 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    for (var c = 0; c < result5.snapshotLength; c++) {
        player = result5.snapshotItem(c);
        player = player.textContent;
        player = player.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
        players[player] = player;
    }

    var members = result5.snapshotLength;

    var find = 'table[' + tab + ']/tbody/tr/td';
    var result4 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    header = result4.iterateNext();
    header.origHTML = header.innerHTML;
    header.innerHTML = header.origHTML + ' (<a href="/" onclick="return showonline()" style="color: green">[Show Online]</a>) <span style="font-size: 9px">Guild Members: ' + members + '</span>';

    httprecv = function() {
        if (request.readyState != 4)
            return;

        oplayers = [];
        oplayers_l = [];
        oplayers_v = [];

        var text = request.responseText;
        // subtopic=character&name=.+?>(.+?)</A></TD><TD.*?>(.+?)</TD><TD.*?>(.+?)</TD></TR>
        var regex = new RegExp('subtopic=characters&name=.+?">(.+?)<', 'g');
        var regex = new RegExp('subtopic=characters&name=.+?>(.+?)</A></TD><TD.*?>(.+?)</TD><TD.*?>(.+?)</TD></TR>', 'g');

        var matches = 0;

        while((m = regex.exec(text)) != null) {
            matches++;

            m[1] = m[1].replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');

            if (players[m[1]] != null) {
                oplayers[m[1]] = m[1];
                oplayers_l[m[1]] = m[2];

                var voc = m[3].replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
                if (voc == 'Knight')               voc = 'K';
                else if (voc == 'Elite Knight')    voc = 'EK';
                else if (voc == 'Paladin')         voc = 'P';
                else if (voc == 'Royal Paladin')   voc = 'RP';
                else if (voc == 'Sorcerer')        voc = 'S';
                else if (voc == 'Master Sorcerer') voc = 'MS';
                else if (voc == 'Druid')           voc = 'D';
                else if (voc == 'Elder Druid')     voc = 'ED';
                else if (voc == 'None')            voc = 'ROOK';
                else                               voc = '?';

                oplayers_v[m[1]] = voc;
            }
        }

        var onlinecount = 0;

        var find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
        var result6 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var c = 0; c < result6.snapshotLength; c++) {
            player = result6.snapshotItem(c);
            var player2 = player.textContent;
            player2 = player2.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');

            players_o[player2] = player.parentNode.parentNode.innerHTML;

            if (oplayers[player2] == null)
                player.parentNode.parentNode.parentNode.style.display = 'none';
            else {
                onlinecount++;
                player.parentNode.parentNode.innerHTML += ' <span style="font-size: 9px; color: black"> (' + oplayers_l[player2] + ' / ' + oplayers_v[player2] + ')</span>';
            }
        }

        header.innerHTML = header.origHTML + ' (<a href="/" onclick="return hideonline()" style="color: green">[Show All]</a>) <span style="font-size: 9px">Guild Members: ' + members + ' &nbsp; Guild Online: ' + onlinecount + ' &nbsp; Total Online on ' + world + ': ' + matches + '</span>';
    };

    showonline = function() {
        request = new XMLHttpRequest();
        request.onreadystatechange = httprecv;
        var time = new Date();
        time = time.getTime();

        var url = 'http://www.tibia.com/community/?subtopic=whoisonline&world=' + world + '&rand=' + time;
        request.open('GET', url);
        request.send(null);
        return false;
    }
    unsafeWindow.showonline = showonline;
//stop who's online guild
//start Tibia Forum post name
var select;
    var eles = document.forms[0].elements;
    for (var i = 0; i < eles.length; i++) {
        if (eles[i].name == 'forum_character') {
            select = eles[i];
            break;
        }
    }

    if (!select)
        return;

    var td = select.parentNode;
    var span = document.createElement('span');
    td.appendChild(span);
    span.innerHTML = ' <a href="#" onclick="return tfpn_setdefault()">[set as default]</a>';

    function tfpn_setdefault() {
        window.setTimeout(GM_setValue, 0, 'defaultchar', select.options[select.selectedIndex].value);
        return false;
    }

    var defaultchar = GM_getValue('defaultchar');

    if (defaultchar != '') {
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value == defaultchar) {
                select.selectedIndex = i;
                break;
            }
        }
    }

    unsafeWindow.tfpn_setdefault = tfpn_setdefault;
//stop Tibia Forum post name
})()