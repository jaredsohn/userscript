// ==UserScript==
// @name          MySpace Ignore Bulletins
// @version       21
// @date          2009-11-22
// @description   Blacklists or whitelists bulletins from friends you specify.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2006-2009 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/5618.js?maxage=5
// @include       http://home.myspace.com/index.cfm?*fuseaction=home*
// @include       http://home.myspace.com/index.cfm?*fuseaction=user*
// @include       http://bulletins.myspace.com/index.cfm?*fuseaction=bulletin*
// @exclude       http://bulletins.myspace.com/index.cfm?*fuseaction=bulletin.ShowMyBulletins*
// ==/UserScript==

/* CONFIGURATION:
After installing this script, you will see a set of controls on your bulletin page.
- Click "Config" or "Configure" to show and edit the IDs of the friends whose bulletins
  you want to blacklist or whitelist.
- Click "W" or "White" to show only the bulletins from the users on the list (whitelist).
- Click "B" or "Black" to hide bulletins from the users on the list (blacklist).
- Click "A" or "All" to show all of the bulletins.
You can also add or remove individual friends from the list when reading their bulletins.
(Look for the link that says "Add to blacklist/whitelist.")                            */

// Only edit below this line if you know what you're doing.

// For compatibility with other scripts, wrap everything in a function
window.gm_ignoreBulletins = function () {
   var location = window.location.host;
   var url = top.location.href;
   if (url.indexOf('fuseaction=bulletin.read') == -1) { // if it's a list of bulletins
      if (location.indexOf('bulletin') > -1) {
         var bulletinTable = document.getElementById('bulletin_inbox');
      } else {
         if (document.getElementById('home_bulletins')) { // classic view
            var bulletinTable = document.getElementById('home_bulletins').getElementsByTagName('table')[0];
         } else { // new home skin (updated november 2009)
            var bulletinTable = document.getElementsByTagName('table')[0];
         }
      }
      if (!GM_getValue('friends')) {
         GM_setValue('friends', 'nothing');
      }
      var friendsList = GM_getValue('friends', 'nothing').split(' ');
      var friends = new Array();
      var friendNames = new Array();
      for (var i = 0; i < friendsList.length; i++) {
         if (friendsList[i].indexOf(':') > -1) {
            var explodedFriend = friendsList[i].split(':');
            friendNames[i] = explodedFriend[0];
            friends[i] = explodedFriend[1];
         } else {
            friendNames[i] = '';
            friends[i] = friendsList[i];
         }
      }
      var show = GM_getValue('show', 'not_specified');
      var hitRows = new Array();
      var nonHitRows = new Array();
      var rows = bulletinTable.rows;

      function getRows() {
         for (var i = 1; i < rows.length; i++) {
            var bulletinLink = rows[i].getElementsByTagName('a')[1].href.toLowerCase();
            for (var j = 0; j < friends.length; j++) {
               var key = 'authorid=' + friends[j] + '&';
               if (bulletinLink.indexOf(key) > -1) {
                  hitRows[i] = '<tr>' + rows[i].innerHTML + '</tr>'; // add to HitRows
                  nonHitRows[i] = '0'; // keep 'em even
                  break;
               } // if this is the last loop-through and it's not a match
               if (j == (friends.length - 1)) {
                  nonHitRows[i] = '<tr>' + rows[i].innerHTML + '</tr>';
                  hitRows[i] = '0';
               }
            }
         }
      }
      getRows();
      showSelected();
   } else { // if it's an individual bulletin
      friendID = url.replace(/.*?authorID=(\d+).*/i, '$1');
      var link = document.createElement('a');
      link.href = '#';
      link.style.display = 'block';
      var friendsList = GM_getValue('friends');
      if (friendsList) {
         friendsList = GM_getValue('friends').split(' ');
         for (i = 0; i < friendsList.length; i++) {
            if (friendsList[i].indexOf(friendID) > -1) {
               link.innerHTML = '(Remove from blacklist/whitelist)';
               link.id = 'removeFromList';
               break;
            }
         }
      }
      if (!link.innerHTML) { // if there are no friends or they're just not on the list
         link.innerHTML = '(Add to blacklist/whitelist)';
         link.id = 'addToList';
      }
      var bulletinFrom = document.getElementById('read_from');
      var userName = bulletinFrom.getElementsByTagName('a')[0];
      userName.parentNode.insertBefore(link, userName.nextSibling);
      var addLink = document.getElementById('addToList');
      if (addLink) {
         addLink.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            var friendName = window.prompt('Enter a name for this friend, or leave blank. (If you don\'t enter one, this person\'s friend ID, not their name, will be shown in the blacklist/whitelist.)');
            if (friendName) {
               friendName = friendName.replace(/:/g, '');
               friendName = friendName.replace(/ /g, '_');
            } // now, if friendName wasn't obliterated...
            if (friendName == null) { // if they hit cancel, it's null
               return;
            } else if (friendName != '') {
               if (GM_getValue('friends') != 'nothing') {
                  var friends = GM_getValue('friends') + ' ' + friendName + ':' + friendID;
               } else {
                  var friends = friendName + ':' + friendID;
               }
            } else {
               if (GM_getValue('friends') != 'nothing') {
                  var friends = GM_getValue('friends') + ' ' + friendID;
               } else {
                  var friends = friendID;
               }
            }
            trimAndSubmit(friends);
         },
         true);
      }
      var removeLink = document.getElementById('removeFromList');
      if (removeLink) {
         removeLink.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            var confirmRemoveFriend = confirm('Remove this friend from blacklist/whitelist?');
            if (confirmRemoveFriend) {
               for (i = 0; i < friendsList.length; i++) {
                  if (friendsList[i].indexOf(friendID) > -1) {
                     friendsList[i] = '';
                     break;
                  }
               }
               var friends = friendsList.join(' ');
               trimAndSubmit(friends);
            }
         },
         true);
      }
   } // show rows of choice
   function showSelected() {
      bulletinTable.innerHTML = '<thead><tr>' + rows[0].innerHTML + '</tr></thead>';
      var showStartIndex = 1;
      if (show == 'not_specified') {
         for (var i = showStartIndex; i < nonHitRows.length; i++) {
            if (nonHitRows[i] != '0') {
               bulletinTable.innerHTML += nonHitRows[i];
            }
         }
      } else if (show == 'only_specified') {
         for (var i = showStartIndex; i < hitRows.length; i++) {
            if (hitRows[i] != '0') {
               bulletinTable.innerHTML += hitRows[i];
            }
         }
      } else if (show == 'all') {
         for (var i = showStartIndex; i < nonHitRows.length; i++) {
            if (nonHitRows[i] != '0') {
               bulletinTable.innerHTML += nonHitRows[i];
            } else {
               bulletinTable.innerHTML += hitRows[i];
            }
         }
      } // now add alternate coloring to rows for themes that support it
      for (i = 1; i < bulletinTable.rows.length; i++) {
         /*if (i % 2 == 0) bulletinTable.rows[i].className = 'even';
         else bulletinTable.rows[i].className = 'odd';*/
         bulletinTable.rows[i].className = ((i % 2 == 0) ? 'even' : 'odd');
         if (i == 1) bulletinTable.rows[i].className += ' first';
         else if (i == bulletinTable.rows.length - 1) bulletinTable.rows[i].className += ' last';
      }
      addListeners();
   } // add controls on top
   function addListeners() {
      if (location.indexOf('bulletin') > -1) {
         var onlyLink = "White";
         var hideLink = "Black";
         var allLink = "All";
         var configLink = "Configure";
      } else {
         var onlyLink = "W";
         var hideLink = "B";
         var allLink = "A";
         var configLink = "Config";
      }
      var bulletinTableHeaderShort = 'From (<a href="#" id="only_specified" title="Show bulletins only from specified friends (whitelist)" style="margin: 0px; display: inline">' + onlyLink + '</a>/<a href="#" id="not_specified" title="Hide bulletins from specified friends (blacklist)" style="margin: 0px; display: inline">' + hideLink + '</a>/<a href="#" id="all" title="Show bulletins from all friends" style="margin: 0px; display: inline">' + allLink + '</a>)<br /><div id="configContainer" style="display: inline; position: relative; z-index: 10000; padding: 0px">';
      var bulletinTableHeaderLong = bulletinTableHeaderShort + '<a href="#" id="config" title="Configure blacklist/whitelist" style="margin: 0px; padding: 0px; display: inline">' + configLink + '</a></div>'
      bulletinTable.rows[0].cells[0].innerHTML = bulletinTableHeaderLong;
      document.getElementById(show).style.backgroundColor = '#ff0';
      document.getElementById('only_specified').addEventListener('click', function (event) {
         event.stopPropagation(); // this line and the next prevent the default action (going to the link)
         event.preventDefault();
         GM_setValue('show', 'only_specified');
         show = 'only_specified';
         showSelected();
      },
      true);
      document.getElementById('not_specified').addEventListener('click', function (event) {
         event.stopPropagation();
         event.preventDefault();
         GM_setValue('show', 'not_specified');
         show = 'not_specified';
         showSelected();
      },
      true);
      document.getElementById('all').addEventListener('click', function (event) {
         event.stopPropagation();
         event.preventDefault();
         GM_setValue('show', 'all');
         show = 'all';
         showSelected();
      },
      true);
      document.getElementById('config').addEventListener('click', function (event) {
         event.stopPropagation();
         event.preventDefault();
         configA = document.getElementById('config');
         configTable = document.createElement('table');
         configTable.style.position = 'absolute';
         configTable.style.left = '30px';
         configTable.style.backgroundColor = "#fff";
         var row = document.createElement('tr');
         var cellTitle = document.createElement('td');
         cellTitle.style.fontWeight = 'bold';
         cellTitle.innerHTML = 'Friends&nbsp;to&nbsp;show/hide';
         cellTitle.style.overflow = 'visible';
         cellTitle.style.padding = '5px';
         row.appendChild(cellTitle);
         var cellClose = document.createElement('td');
         cellClose.style.width = '10px';
         cellClose.innerHTML = '<a href="#" id="close" title="Close" style="display: inline">X</a>';
         cellClose.style.overflow = 'visible';
         cellClose.style.padding = '5px';
         row.appendChild(cellClose);
         configTable.appendChild(row);
         var row = document.createElement('tr');
         var cellFriends = document.createElement('td');
         cellFriends.colSpan = '2';
         cellFriends.id = 'friendCell';
         if (friends[0] != 'nothing') {
            for (var i = 0; i < friendsList.length; i++) {
               if (friendNames[i] == '') {
                  cellFriends.innerHTML += '<a href="http://www.myspace.com/' + friends[i] + '" target="_blank" style="display: inline">' + friends[i] + '</a><br />';
               } else {
                  cellFriends.innerHTML += '<a href="http://www.myspace.com/' + friends[i] + '" target="_blank" style="display: inline">' + friendNames[i] + '</a><br />';
               }
            }
         } else {
            cellFriends.innerHTML = 'None';
         }
         cellFriends.style.overflow = 'visible';
         cellFriends.style.padding = '5px';
         row.appendChild(cellFriends);
         configTable.appendChild(row);
         var row = document.createElement('tr');
         var cellEditButton = document.createElement('td');
         cellEditButton.id = 'buttonRow';
         cellEditButton.style.textAlign = 'center';
         cellEditButton.colSpan = '2';
         cellEditButton.innerHTML = '<input type="button" value="Edit" id="edit" />';
         cellEditButton.style.overflow = 'visible';
         cellEditButton.style.padding = '5px';
         row.appendChild(cellEditButton);
         configTable.appendChild(row);
         configA.parentNode.insertBefore(configTable, configA.nextSibling);
         document.getElementById('close').addEventListener('click', function (event2) {
            event2.stopPropagation();
            event2.preventDefault();
            configTable.parentNode.removeChild(configTable);
            addListeners();
         },
         true);
         document.getElementById('edit').addEventListener('click', function (event2) {
            event2.stopPropagation();
            event2.preventDefault();
            document.getElementById('friendCell').innerHTML = '';
            var friendText = document.createElement('textarea');
            friendText.style.fontFamily = 'verdana,arial,sans-serif,helvetica';
            friendText.style.fontSize = '8pt';
            friendText.rows = '5';
            friendText.cols = '22';
            friendText.id = 'friendText';
            if (friends[0] != 'nothing') {
               for (var i = 0; i < friendsList.length; i++) {
                  if (i < friendsList.length - 1) {
                     friendText.value += friendsList[i] + ' ';
                  } else {
                     friendText.value += friendsList[i];
                  }
               }
            }
            document.getElementById('friendCell').innerHTML = '<span style="font-weight: normal">Separate each friend ID with a space. You can prefix each ID with a name and a colon (<i>Luke:42793928</i>) for convenience.</span><br />';
            document.getElementById('friendCell').appendChild(friendText);
            document.getElementById('buttonRow').innerHTML = '<input type="button" value="OK" id="ok" /> <input type="button" value="Cancel" id="cancel" />';
            document.getElementById('ok').addEventListener('click', function (event3) {
               var textareaValue = document.getElementById('friendText').value;
               trimAndSubmit(textareaValue);
            },
            true);
            document.getElementById('cancel').addEventListener('click', function (event3) {
               configTable.parentNode.removeChild(configTable);
               addListeners();
            },
            true);
         },
         true);
         var configNonLink = document.createTextNode(configLink);
         configA.parentNode.replaceChild(configNonLink, configA);
      },
      true);
   }

   function trimAndSubmit(input) {
      input += ''; // ghetto way of converting a number to a string (in case it's just a number)
      input = input.replace(/(^\s+|\s+$)/g, ''); // trim spaces on ends
      input = input.replace(/\s+/g, ' '); // change multiple or weird spaces to single regular spaces
      if (input != '') { // test for other invalid characters
         if (/^(([^\s:]+:)?\d+ )*([^\s:]+:)?\d+$/.test(input) == true) {
            GM_setValue('friends', input);
            window.location.reload();
         } else {
            alert('Please check your formatting. Each friend ID should be separated by a space. Friend names (optional) may not contain spaces; try underscores (_) instead.');
         }
      } else {
         GM_setValue('friends', 'nothing');
         window.location.reload();
      }
   }
} // end of function that does everything
gm_ignoreBulletins(); // call it
