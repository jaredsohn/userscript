// ==UserScript==
// @name           Moltar's first script!
// @namespace      shoecream@luelinks.net
// @description    This will adjust votehistory.php to have "check all" and "highlight same user" functions. Requires Firefox 3
// @include        http://links.endoftheinter.net/votehistory.php*
// @include        https://links.endoftheinter.net/votehistory.php*
// ==/UserScript==

// counter closure copied from mozilla documentation
var Counter = (function() {
      // moltar edit this
      var colors = new Array('yellow', 'cyan', 'lime', 'pink', '#9669FE', "#23819C");
      var privateCounter = 0;
      return {
         next: function() {
            if (privateCounter+1 == colors.length) {
               privateCounter = 0;
            } else {
               privateCounter++;
            }
            return colors[privateCounter];
         }
      }   
   })();




if (document.location.search.indexOf('link') > 0) {
   // apply "check all" button here
   var input = document.getElementsByTagName('input');
   input = input.wrappedJSObject;
   var checkboxes = new Array();
   var purgebutton;

   for (x in input) {
      if (x == 'length') break;
      if (input[x].type == 'checkbox') {
         checkboxes.push(input[x]);
      } else if (input[x].type == 'submit') {
         if (input[x].value == 'Purge') {
            purgebutton = input[x];
         }
      }
   }

   var checkall = document.createElement('input');
   checkall.type = 'button';
   checkall.value = 'Check all boxes';
   purgebutton.parentNode.nextSibling.nextSibling.appendChild(checkall);
   checkall.wrappedJSObject.onclick = function(e) {
      // not cross browser compat but this is a gs script so ignore it
      if (e.target.value == 'Check all boxes') {
         for (i in checkboxes) {
            checkboxes[i].checked = true;
         }
         e.target.value = 'Uncheck all boxes';
      } else {
         for (i in checkboxes) {
            checkboxes[i].checked = false;
         }
         e.target.value = 'Check all boxes';
      }
   };

   var table = document.getElementsByTagName('table');
   for (var i = 0; i < table.length; i++) {
      var anchor = table[i].getElementsByTagName('a');
      for (var j = 0; j < anchor.length; j++) {
         if (/profile\.php\?/.test(anchor[j].href)) {
            var div = document.createElement('div');
            var clone = anchor[j].cloneNode(false);
            clone.href = anchor[j].href.replace('profile', 'votehistory');
            clone.innerHTML = '[history]';
            div.setAttribute('style', 'float:right');
            div.appendChild(clone)
            anchor[j].parentNode.appendChild(div);
            }
      }
   }

} else {
   var h2 = document.getElementsByTagName('h2')[0];
   var prolink = document.createElement('a');
   prolink.href = document.location.href.replace('votehistory','profile');
   prolink.appendChild(document.createTextNode(h2.textContent));
   h2.removeChild(h2.firstChild);
   h2.appendChild(prolink);


   // we will create a 2D array that holds our vote history page data

   var votes = {};

   // we check for duplicate names

   var tr = document.getElementsByTagName('tr');

   var username = {};

   for (x=0;x < tr.length;x++) {
      if (x > tr.length-2) break;
      var td = tr[x].getElementsByTagName('td');

      // id
      if (td[0]) {
         var id = td[0].getElementsByTagName('input')[0].getAttribute('name');
         if (id) {
            votes[x] = {};
            votes[x]['id'] = +id.match(/purge(\d+)x/i)[1];            
            votes[x]['data'] = {};
            votes[x]['calc'] = {};
         }
      }
      /* title
      if (td[1] && td[1].textContent) {
         var text = td[1].textContent;
         text = text.replace(/[^a-z0-9\s-]/ig,'');
         text = text.toLowerCase();
         votes[x]['data']['title'] = text.split(/[\s-]+/);
      } */

      // username
      if (td[2]) {
         // TODO: change the user field into id numbers 4 speedz
         votes[x]['data']['user'] = td[2].textContent;
         var txt = td[2].textContent;
         // avoid NaN error for ++ operation on undef
         if (username[txt]) {
            username[txt]++;
         } else {
            username[txt] = 1;
         }
      }

      // rating
      if (td[3]) {
         votes[x]['data']['rating'] = +td[3].textContent;
      }

      // vote
      if (td[4]) {
         votes[x]['data']['vote'] = +td[4].textContent;
      }

      // time
      if (td[5]) {
         votes[x]['data']['time'] = new Date(td[5].textContent);
      }
   }

   //alert (votes.toSource());

   // second loop, messy i know but we can't backtrack in the first
   // loop unless we insert IDs
   
  var distance = function(array, index) {
      var max = 25;
      var start = index - max;
      var end = index + max;
      if (start < 0) start = 0;
      if (end > array.length) end = array.length;

      var rate = [0];
      for (i=start;i<=end;i++) {
         if (i==index) continue;
         if (array[i] == array[index]) {
            rate.push (1 / Math.pow(Math.abs (i-index),2));
      }
   }
   return (Math.max.apply(null,rate));
   }

   var time_func = function(element, index, array) {
      var num = 42.42;
      if (index == 0)
         return 0;
      var diff = (element - array[index-1])/1000;
      if (diff > 1800)
         return 0;
      return (Math.sqrt(-diff + 1800) / num);
   }

   var users = [''];

   // take a vertical slice here
   for (i in votes) {
      users.push(votes[i]['data']['user']);
   }

   var times = [];



   for (i in users) {
      var num = +i+1;
      if (num >= tr.length-1) break;
      
      votes[num]['calc']['user'] = distance(users,num);
   }

   for (i in votes) {
      times.push(votes[i]['data']['time']);
   }
   var diffs = times.map(time_func);

   //alert (times.toSource());

   //alert (votes.toSource());
   //
   var usercolors = {};
   for (i in votes) {
      if (votes[i].calc.user > 0) {
      var td = tr[i].getElementsByTagName('td')[2];
      if (!usercolors[td.textContent]) {
         usercolors[td.textContent] = Counter.next();
      }
      td.setAttribute('style','background-color:'+usercolors[td.textContent]+' !important;');
      td.setAttribute('title',votes[i].calc.user);
      }
   }

   for (i in diffs) {
      if (diffs[i] > 0) {
         var td = tr[+i+1].getElementsByTagName('td')[5];
         td.setAttribute('style','background-color:red !important;');
         td.setAttribute('title',diffs[i]);
      }
   }
}
