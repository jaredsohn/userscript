// ==UserScript==
// @name          Chat por nivel
// @description   Ordena el chat por nivel, poniendo al nivel más alto al principio y al nivel más bajo al final
// @include       http://www.kongregate.com/games/*/*
// @exclude       http://www.kongregate.com/games/*/*/*
// ==/UserScript==

var mywindow;
try { mywindow = unsafeWindow; }
catch (e) { mywindow = window; }

mywindow.ChatRoom.prototype.userSorter = function() {
      compare_users    = function(user1, user2) {
        if (user1.variables.level>user2.variables.level) { return -1; }
        if (user1.variables.level<user2.variables.level) { return 1; }
        return 0;
      };
    
    return(
      function(user1, user2) {
        return (compare_users(user1, user2));
      }
    );
}