// ==UserScript==
// @name         babblefilter
// @author       Fidel
// @include      http://www.rabble.ca/babble/*
// @include      http://rabble.ca/babble/*
// @description  Hides and unhides posts 
// @exclude
// ==/UserScript==
 
(function()  {

// Cursor control functions
    var curPointer = function(event) {
        event.target.style.cursor = 'pointer';
        event.preventDefault();
    };

    var curDefault = function(event) {
        event.target.style.cursor = 'default';
        event.preventDefault();
    };

//------------------
function Decode (encString) {


  var output = encString;
  var binVal, thisString;
  var myregexp1 = /(%[^%]{2})/;
  while ((match = myregexp1.exec(output)) != null
             && match.length > 1
             && match[1] != '') {
    binVal = parseInt(match[1].substr(1),16);
    thisString = String.fromCharCode(binVal);
    output = output.replace(match[1], thisString);
  }

  return output;
}


//------------------
// Add or delete babbler in cookie
var addRemoveUser = function(event) {

// indexes into 'author-name-line author-name' href. These nums may need adjusting in future if usernames become longer
var indexstart=40, indexstop=85, tt=0; 

        // Parse current cookie
        for(j = 0; j < document.cookie.split('; ').length; j++ ) {
            var oneCookie = document.cookie.split('; ')[j].split('=');
            if (oneCookie[0] == cookieName) {
                users = oneCookie[1].split(', ');
                break;
            }
        }

var cookieuser = escape(event.target.parentNode.innerHTML.substring(indexstart,indexstop));
var temp = cookieuser.split("%20%3E");  
var temp3 = [];

                
               
cookieuser = temp[0];

 
temp5 = Decode(cookieuser);

for(var gg=0;gg<temp5.length;gg++) {
 if(temp5[gg] == '>') {
  tt = gg + 1;
  break; 
  }
}

// get everything between the html tags ">xxx...<"
var aa=0;
var done=1;
if(!tt) {
  alert("Log in to rabble");
  return;
}
for(var v=tt; v<temp5.length; v++) {
  
 if(temp5[tt] == '<')
   break;

temp3[aa] = temp5[tt];
tt = tt+1;
aa = aa+1;
} 
 


// rejoin to make string for comparing w string names from page
newstr4 = temp3.join('');

var myRegExp = new RegExp(",","g");
str = newstr4.replace(myRegExp, '');
str = str.replace(/\(|\)/g, '');

                  

        notFound = true;
        for (var j = 0; j < users.length; j++) {
            if (users[j] == str) {
                users.splice(j, 1);
                notFound = false;
            } 
                        
                
        }
        
        if (notFound) 
           users.push(str);
 
        
        if (users.length > 0) {
            var date = new Date();
            var days = 365;
            date.setTime(date.getTime() + (days*24*60*60*1000));
            var expires = '; expires=' + date.toGMTString();
            var value = users.join(', ');
            document.cookie = cookieName + '=' + value + expires + '; path=/';
        } else {
            document.cookie = cookieName + '=;expires=Sun, 25-May-1984 00:00:01 GMT; path=/';
        }
        window.alert(unescape(str) + ' has been ' + (notFound ? 'added to ' : 'removed from ')
            + 'your lowbies list.' + '\n' 
                        + 'Reload page to view changes.');
        event.preventDefault();
    };
//------------------ 
    // Toggle display of user's post
    var togglePost = function(event) {
        
        var displayState = event.target.getAttribute('displaystate');


        if (displayState != 'none')
            displayState = 'none';
        else
            displayState = '';
        event.target.setAttribute('displaystate', displayState);
        containingRow = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        var innerTags = containingRow.firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('*');
        event.target.setAttribute('displaystate', displayState);
        for (var b = 0; b < innerTags.length; b++) {
            var tagClass = innerTags[b].getAttribute('class');
            if (tagClass == 'forum-comment-right clearfix' || tagClass =='content' || tagClass =='quote-msg')
                innerTags[b].style.display = displayState;
                               
        }
        event.preventDefault();
    };
//------------------main
        
// variables to point into the DOM - allDivs points to an array of authors names
var allDivs, thisDiv, thisDiv2, str2, results, containingrow, allquotes;

// regular expression for replacing any and all commas in user name with nothing
    var myRegExp = new RegExp(",","g");
    var myRegExp2 = new RegExp("/\(|\)/g");
    var sPath = window.location.pathname;    
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

    // Get stored hidden users from cookie
    var users = [];
        var thisDiv;
    var cookieName = "Hidebabbler";
    for (var i = 0; i < document.cookie.split('; ').length; i++) {
        var oneCookie = document.cookie.split('; ')[i].split('=');
        if (oneCookie[0] == cookieName) {
            users = oneCookie[1].split(', ');
            break;
        }
    }

            
    
    
// get an array of all usernames in page
allDivs = document.evaluate(  "//div[@class='author-pane-line author-name']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
allquotes = document.evaluate(  "//div[@class='bb-quote']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
results = allDivs;


// For each and every babbler name in page...        
       for (var i = 0; i < allDivs.snapshotLength; i++) { 
          thisDiv = allDivs.snapshotItem(i);   
          str = thisDiv.innerHTML.replace(myRegExp, '');
           str = str.replace(/\(|\)/g, '');
// ...compare with each name stored in Hidebabbler cookie 
           for (var s = 0; s < users.length; s++) {
             if (str.match(users[s])) {           
             // Move pointer up 6 elements in DOM tree to forum-comments-left and down 4 to contents,& hide it
                thisDiv = thisDiv.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                 thisDiv = thisDiv.firstChild.nextSibling.nextSibling.nextSibling;
                thisDiv.style.display = 'none';
                
             }
                               
           }     
       }



user = allDivs.snapshotItem(0).innerHTML;

          var aResult;


 
            // Add relevant event handlers
 for(var z=0;z<results.snapshotLength;z++) {
                         thisDiv=results.snapshotItem(z);
                         
  if(!thisDiv.innerHTML.match(/Michelle/) && (!thisDiv.innerHTML.match(/oldgoat/) && (!thisDiv.innerHTML.match(/Makwa/) && (!thisDiv.innerHTML.match(/Maysie/))) && (!thisDiv.innerHTML.match(/jrose/) && (!thisDiv.innerHTML.match(/Lou Arab/) && (!thisDiv.innerHTML.match(/Rebecca West/) && (!thisDiv.innerHTML.match(/Catchfire/))))))) {
                      
            var toggle = document.createElement('span');
            toggle.setAttribute('title', "click to add or remove this poster from your ignore list");
            toggle.appendChild(document.createTextNode('[x]'));
            toggle.style.fontSize = "7pt";
                        toggle.style.color = "blue";
            toggle.addEventListener('mouseover', curPointer, true);
            toggle.addEventListener('mouseout', curDefault, true);
            toggle.addEventListener('click', addRemoveUser, true);
            thisDiv.insertBefore(toggle, results[z]);
                                              
 
            // Find the first element in row
            var elem = thisDiv;
            while (elem.nodeType != 1)
                elem = elem.nextSibling;
 
            // Create a span for toggle link
            var span = document.createElement('span');
            span.setAttribute('title', "doubleclick");
            span.appendChild(document.createTextNode('off/on'));
            span.appendChild(document.createElement('br'));
            span.setAttribute('class', 'gensmallbold');
            span.style.textDecoration = 'underline';
                        span.style.color = "blue";
            span.setAttribute('displaystate', 'none');
            span.addEventListener('mouseover', curPointer, true);
            span.addEventListener('mouseout', curDefault, true);
            span.addEventListener('click', togglePost, true);

            // Insert the span after the username and before the <br>
                    
            thisDiv.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.insertBefore(span, results[z]);
            // Insert <br> after username
            thisDiv.insertBefore(document.createElement('br'), results[z]);
  }

 }


// For each quoted message in page...        
      for (var f = 0; f < allquotes.snapshotLength; f++) { 
         thisDiv2 = allquotes.snapshotItem(f);   
          str2 = thisDiv2.innerHTML.replace(myRegExp, '');
          str2 = str2.replace(/\(|\)/g, '');
// ...compare with each name stored in Hidebabbler cookie 
           for (var v = 0; v < users.length; v++) {
             if (str2.match(users[v])) {  
             // Move pointer up 1 element in DOM tree to 'quote-msg',& hide it
                thisDiv2 = thisDiv2.firstChild.nextSibling;               
                thisDiv2.style.display = 'none';
             }
                               
           }     
       }

                    
})();