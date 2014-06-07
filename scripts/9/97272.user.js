// ==UserScript== 

// @name         User Hide for http://forum.szene1.at 

// @include      *forum.szene1.at/viewtopic.php* 

// @include      *forum.szene1.at/ftopic*.html 

// @description  Hides/unhides a user's posts and quotes 

// @exclude 

// ==/UserScript== 

 

// original file by Unarmed 

// found at: http://s93731204.onlinehome.us/firefox/greasemonkey/phpbb.ignore.user.js 

// modified for geoclub.de by London Rain 

// modified for phpBB3 by PHerison 

// modified for forum.szene1.at by pbammer


 

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

 

        // Cursor functions 

        var curPointer = function(event) { 

                event.target.style.cursor = 'pointer'; 

                event.preventDefault(); 

        }; 

        var curDefault = function(event) { 

                event.target.style.cursor = 'default'; 

                event.preventDefault(); 

        }; 

 

        // Add or remove a user from the cookie 

        var addRemoveUser = function(event) { 

                // Parse current cookie 

                for(j = 0; j < document.cookie.split('; ').length; j++ ) { 

                        var oneCookie = document.cookie.split('; ')[j].split('='); 

                        if (oneCookie[0] == cookieName) { 

                                users = oneCookie[1].split(', '); 

                                break; 

                        } 

                } 

                var user = escape(event.target.nextSibling.innerHTML) 

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

                window.alert(unescape(user) + ' has been ' + (notFound ? 'added to' : 'removed from') 

                        + ' your hide list\n' 

                        + 'You must refresh the page to view the changes.'); 

                event.preventDefault(); 

        }; 

        // Toggle display of user's post 

        var togglePost = function(event) { 

                var displayState = event.target.getAttribute('displaystate'); 

                if (displayState == 'none') 

                        displayState = ''; 

                else 

                        displayState = 'none'; 

                event.target.setAttribute('displaystate', displayState); 

 

                containingRow = event.target.parentNode.parentNode.parentNode.parentNode; 

                containingRow.firstChild.nextSibling.firstChild.nextSibling.nextSibling.style.display = displayState; 

                event.preventDefault(); 

        }; 

        // Toggle display of user's quote 

        var toggleQuote = function(event) { 

                var displayState = event.target.getAttribute('displaystate'); 

                if (displayState == 'none') 

                        displayState = ''; 

                else 

                        displayState = 'none'; 

                event.target.setAttribute('displaystate', displayState); 

 

                // Jump to quotecontent-<div> 

                var containingRow = event.target.parentNode.nextSibling; 

                containingRow.style.display = displayState; 

 

                event.preventDefault(); 

        }; 

 

        // Find all the usernames in the page 

        var results = document.evaluate("//b[@class='postauthor']", document, null, XPathResult.ANY_TYPE, null); 

        var resultNodes = []; 

        var aResult; 

        while (aResult = results.iterateNext()) 

                resultNodes.push(aResult); 

 

        // Loop through every user post on the page 

        for (var i in resultNodes) { 

                // containingRow = <table> 

                var containingRow = resultNodes[i].parentNode.parentNode.parentNode.parentNode; 

                // the info <tr> in the containing <table> 

                var infoRow = resultNodes[i].parentNode.parentNode; 

                // the message <tr> in the containing <table> 

                var msgRow = resultNodes[i].parentNode.parentNode.nextSibling.nextSibling; 

                // the postinfo <tr> in the containing <table> 

                var appendixRow = resultNodes[i].parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling; 

                // the username <td> in the containing <table> 

                var elem = resultNodes[i].parentNode; 

                // Format whitespace 

                var user = escape(resultNodes[i].innerHTML); 

 

                // Flag whether the user is in our hide list 

                var notFound = true; 

                for (var j = 0; j < users.length; j++) { 

                        if (users[j] == user) { 

                                notFound = false; 

                        } 

                } 

 

                // Add relevant event handlers to user's name and a toggler node 

                var toggler = document.createElement('span'); 

                toggler.setAttribute('title', "click to add or remove this user from your hide list"); 

                toggler.appendChild(document.createTextNode('[X] ')); 

                toggler.style.fontSize = "7pt"; 

                toggler.addEventListener('mouseover', curPointer, true); 

                toggler.addEventListener('mouseout', curDefault, true); 

                toggler.addEventListener('click', addRemoveUser, true); 

 

                // <td> with Username 

                elem.insertBefore(toggler, resultNodes[i]); 

 

                // If this user isn't in our hide list, skip to the next user 

                if (notFound) 

                        continue; 

 

                // Create a span to control toggling 

                var span = document.createElement('span'); 

                span.appendChild(document.createTextNode('Toggle Display')); 

                span.setAttribute('class', 'gensmallbold'); 

                span.style.textDecoration = 'underline'; 

                span.setAttribute('displaystate', 'none'); 

                span.addEventListener('mouseover', curPointer, true); 

                span.addEventListener('mouseout', curDefault, true); 

                span.addEventListener('click', togglePost, true); 

 

                // Insert a <br> after the username and the span 

                elem.appendChild(document.createElement('br')); 

                elem.appendChild(span); 

 

                var elemWidth = elem.offsetWidth; // user <td> width to restore later 

                msgRow.style.display = 'none'; // hide message <tr> 

                elem.style.width = (elemWidth-4) + 'px'; // 4 = padding-right-value: 2px; + padding-left-value: 2px; 

                elem.nextSibling.nextSibling.style.width = "0%"; // remove width-information from following <td> 

        } 

 

        // Find all the usernames quoted in the page 

        var results = document.evaluate("//div[@class='quotetitle']", document, null, XPathResult.ANY_TYPE, null); 

        var resultNodes = []; 

        var aResult; 

        while (aResult = results.iterateNext()) 

        { 

                resultNodes.push(aResult); 

        } 

        // Loop through every user quote on the page 

        for (var i in resultNodes) { 

                // Find username 

                var usermatch = resultNodes[i].innerHTML.match(/(.*) hat geschrieben:$/); 

                if (usermatch) 

                        var user = escape(usermatch[1]); 

                else 

                        continue; 

 

                // Flag whether the user is in our hide list 

                var notFound = true; 

                for (var j = 0; j < users.length; j++) { 

                        if (users[j] == user) { 

                                notFound = false; 

                        } 

                } 

 

                // If this user isn't in our hide list, skip to the next user 

                if (notFound) 

                        continue; 

 

                // Create a span to control toggling 

                var span = document.createElement('span'); 

                span.appendChild(document.createTextNode('Toggle Display')); 

                span.setAttribute('class', 'gensmallbold'); 

                span.style.textDecoration = 'underline'; 

                span.setAttribute('displaystate', 'none'); 

                span.addEventListener('mouseover', curPointer, true); 

                span.addEventListener('mouseout', curDefault, true); 

                span.addEventListener('click', toggleQuote, true); 

 

                resultNodes[i].appendChild(document.createTextNode(' ')); // space between username and toggler 

                resultNodes[i].appendChild(span); 

 

                // Hide the quote 

                resultNodes[i].nextSibling.style.display = 'none'; 

 

 

 

 

 

 

 

        } 

 

})();