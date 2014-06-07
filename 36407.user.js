    // ==UserScript==
    // @name          phpBB User Hide
    // @include       */viewtopic.php*
    // @description   Hides/unhides a user's posts
    // @exclude
    // ==/UserScript==

    (function() {
       // Get stored hidden users from cookie
       var users = [];
       var cookieName = "phpUserHide";
       for (var i = 0; i < document.cookie.split('; ').length; i++) {
          var oneCookie = document.cookie.split('; ')[i].split('=');
          if (oneCookie[0] == cookieName) {
             users = oneCookie[1].split(', ');
             break;
          }
       }

       // Find all the usernames in the page
       var results = document.evaluate("//span[@class='name']/b", document, null,
          XPathResult.ANY_TYPE, null);
       var resultNodes = [];
       var aResult;
       while (aResult = results.iterateNext())
          resultNodes.push(aResult);

       // Loop through every user post on the page
       for (var i in resultNodes) {
          var containingRow = resultNodes[i].parentNode.parentNode.parentNode;
          // Format whitespace
          var user = encodeURI(resultNodes[i].innerHTML);

          // Flag whether the user is in our hide list
          var notFound = true;
          for (var j = 0; j < users.length; j++) {
             if (users[j] == user) {
                notFound = false;
             }
          }

          // Add relevant event handlers to user's name
          // On double-click, add or remove this user from the stored user list in the cookie
          var toggler = document.createElement('span');
          toggler.title = "click to add or remove this user from your hide list";
          toggler.appendChild(document.createTextNode('[X] '));
          toggler.namenode = resultNodes[i];
          toggler.onmouseover = function(event) { event.target.style.cursor = 'pointer'; };
          toggler.onmouseout = function(event) { event.target.style.cursor = 'default'; };
          toggler.style.fontSize = "7pt";
          toggler.onclick = function(event) {
             for(j = 0; j < document.cookie.split('; ').length; j++ ) {
                var oneCookie = document.cookie.split('; ')[j].split('=');
                if (oneCookie[0] == cookieName) {
                   users = oneCookie[1].split(', ');
                   break;
                }
             }
             var user = encodeURI(event.target.namenode.innerHTML);
             notFound = true;
             for (var j = 0; j < users.length; j++) {
                if (users[j] == user) {
                   users.splice(j, 1);
                   notFound = false;
                }
             }
             if (notFound)
                users.push(user);
             if (users.length > 0) {
                var date = new Date();
                var days = 365;
                date.setTime(date.getTime() + (days*24*60*60*1000));
                var expires = '; expires=' + date.toGMTString();
                var value = users.join(', ');
                document.cookie = cookieName + '=' + value + expires + '; path=/';
             } else {
                document.cookie = cookieName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
             }
             alert(decodeURI(user) + ' has been ' + (notFound ? 'added to' : 'removed from')
                + ' your hide list\n'
                + 'You must refresh the page to view the changes.');
          };
          resultNodes[i].parentNode.insertBefore(toggler, resultNodes[i]);

          // If this user isn't in our hide list, skip to the next user
          if (notFound)
             continue;

          // Find the first element node (td) in the containing row
          var elem = containingRow.firstChild;
          while (elem.nodeType != 1)
             elem = elem.nextSibling;

          // Create a span to control toggling
          var span = document.createElement('span');
          span.appendChild(document.createTextNode('Toggle Display'));
          span.appendChild(document.createElement('br'));
          span.setAttribute('class', 'gensmallbold');
          span.style.textDecoration = 'underline';
          span.setAttribute('displaystate', 'none');
          span.onmouseover = function(event) { event.target.style.cursor = 'pointer'; };
          span.onmouseout = function(event) { event.target.style.cursor = 'default'; };
          span.onclick = function(event) {
             var displayState = event.target.getAttribute('displaystate');
             if (displayState == 'none')
                displayState = '';
             else
                displayState = 'none';
             event.target.setAttribute('displaystate', displayState);

             containingRow = event.target.parentNode.parentNode;
             var innerTags = containingRow.getElementsByTagName('*');
             for (var i = 0; i < innerTags.length; i++) {
                var tagClass = innerTags[i].getAttribute('class');
                if (tagClass == 'postbody' || tagClass == 'postsig' || tagClass == 'postdetails')
                   innerTags[i].style.display = displayState;
             }
          };

          // Insert the span after the username and before the <br>
          elem.insertBefore(span, elem.firstChild.nextSibling.nextSibling);
          // Insert a <br> after the username and before the span
          elem.insertBefore(document.createElement('br'), elem.firstChild.nextSibling.nextSibling);

          var innerTags = containingRow.getElementsByTagName('*');
          for (var i = 0; i < innerTags.length; i++) {
             var tagClass = innerTags[i].getAttribute('class');
             if (tagClass == 'postbody' || tagClass == 'postsig' || tagClass == 'postdetails')
                innerTags[i].style.display = 'none';
          }
       }
    })();