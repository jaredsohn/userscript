// ==UserScript==
// @name           GLB My Threads
// @namespace      file:///C:/Users/Millwell/Desktop/GLB/GLBMyThreads.js
// @description    Adds a "My Threads" section to forum thread list pages in Goal Line Blitz.
// @include        http://goallineblitz.com/game/forum_thread_list.pl?forum_id=*
// @include        http://goallineblitz.com/game/forum_thread_list.pl?team_id=*
// @version        2010.04.12
// @author         Gongadan
// ==/UserScript==

// This script adds a section to the bottom of the forum thread list of the first X threads that I
// started in this forum within the next Y pages.
// Script does not function if there is only one page of forum posts (exits gracefully)

// GLOBALS--Modify as needed
var gMaxPages	= 3; // how many pages (beyond current page) you want to check for your threads
var gMaxThreads	= 10; // the maximum number of your threads to locate and put on the page
var userName;

function getElementsByClassName(classname, par) {
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
}

function doItAll() {
  // first, check to see if we want to do anything at all.  If there's only one page, do nothing
  var pageButtons = getElementsByClassName('page_selector', document);
  if (pageButtons.length < 2)
    return;

  // Need our username before we can run this, so we get that first and run everything after the onload
  GM_xmlhttpRequest({ 
      method: 'GET',
      url: 'http://goallineblitz.com/game/home.pl',
      headers: {
        'User-agent': navigator.userAgent,
        'Accept': 'text/xml'
      },
      onload: function(response){
        userName = response.responseText.split('User Name:')[1].split('value">')[1].split('<')[0];

        // run myThreads once you have the username
        myThreads();
      }
  });

  // build and place a new table
  var location = document.getElementById('threads');
  var myTable = document.createElement('table');
  myTable.setAttribute('id','myThreads');
  myTable.setAttribute('cellspacing','0');
  myTable.setAttribute('cellpadding','0');
  myTable.setAttribute('width','100%');
  var headerBar = document.createElement('tr');
  headerBar.setAttribute('class','nonalternating_color thread_head');

  var headerTD = document.createElement('td');
  headerTD.setAttribute('class','thread_status_head');
  headerTD.innerHTML = '&nbsp;';
  headerBar.appendChild(headerTD);

  headerTD = document.createElement('td');
  headerTD.setAttribute('class','thread_status_head');
  headerTD.innerHTML = 'Page';
  headerBar.appendChild(headerTD);

  headerTD = document.createElement('td');
  headerTD.setAttribute('class','thread_title_head');
  headerTD.innerHTML = 'My First ' +
    '<input id="maximumThreads" style="width: 20px;" type="text" value=' + gMaxThreads + '> ' +
    'Threads on This or the Next ' +
    '<input id="maximumPages" style="width: 20px;" type="text" value=' + gMaxPages + '> Page';
  if (gMaxPages != 1)
    headerTD.innerHTML += 's';
  headerBar.appendChild(headerTD);

  headerTD = document.createElement('td');
  headerTD.setAttribute('class','last_post_head');
  headerTD.innerHTML = 'Last Post';
  headerBar.appendChild(headerTD);

  headerTD = document.createElement('td');
  headerTD.setAttribute('class','post_count_head');
  headerTD.innerHTML = 'Posts';
  headerBar.appendChild(headerTD);

  myTable.appendChild(headerBar);

  // put it after the page selectors
  location = location.nextSibling;
  location = location.nextSibling;
  location = location.nextSibling;
  location = location.nextSibling;
  location = location.nextSibling;
  location = location.nextSibling;

  location.parentNode.insertBefore(myTable,location);

  // add event listeners
  var maxThreadsInput = document.getElementById('maximumThreads');
  maxThreadsInput.addEventListener('change', startOver, false);
  var maxPagesInput = document.getElementById('maximumPages');
  maxPagesInput.addEventListener('change', startOver, false);

  // build a temporary area to use later
  var tempArea = document.createElement('div');
  tempArea.setAttribute('id', 'myThreadTemp');
  tempArea.setAttribute("style","visibility: hidden; display:none;");
  location.parentNode.appendChild(tempArea);
}

// I use recursion in this function to ensure that I get threads in order
function getForumPage(forumID, page) {
  GM_xmlhttpRequest({ 
      method: 'GET',
      url: 'http://goallineblitz.com/game/forum_thread_list.pl?forum_id=' + forumID + '&page=' + page,
      headers: {
        'User-agent': navigator.userAgent,
        'Accept': 'text/xml'
      },
      onload: function(response){
        document.getElementById('myThreadTemp').innerHTML = response.responseText;
        var location = document.getElementById('myThreadTemp');
        var threads = location.getElementsByClassName('thread');
        var myThreadLoc = document.getElementById('myThreads');

        for (var i = 0; i < threads.length; i++) {
          var myThreadText = "Started by: " + userName;
          if (threads[i].innerHTML.split(myThreadText)[1] != null) {
            var newThread = threads[i].cloneNode(true);

            var newTD = document.createElement('td');
            newTD.innerHTML = page;
            var titleTD = newThread.firstChild;
            titleTD = titleTD.nextSibling;
            titleTD = titleTD.nextSibling;
            newThread.insertBefore(newTD,titleTD);

            // need to figure out where to put it, because these might come back out of order
            var insertLoc = myThreadLoc.firstChild; // header row
            if (insertLoc) {
              insertLoc = insertLoc.nextSibling;
              if (insertLoc) {
                insertLoc = insertLoc.firstChild; // first element of first row (blank)
                insertLoc = insertLoc.nextSibling.nextSibling; // (page #)
              }
            }
            while (insertLoc && insertLoc.innerHTML <= page) {
              insertLoc = insertLoc.parentNode.nextSibling; // next row (thread)
              if (insertLoc)
                insertLoc = insertLoc.firstChild.nextSibling.nextSibling;
            }
            if (insertLoc) {
              myThreadLoc.insertBefore(newThread,insertLoc.parentNode);
            } else {
              myThreadLoc.appendChild(newThread);
            }
          }
        }
        // now hide all but the first gMaxThreads
        var hideLoc = myThreadLoc.firstChild; // header row
        for (var i = 0; i < (gMaxThreads + 1) && hideLoc; i++)
          hideLoc = hideLoc.nextSibling;
        while (hideLoc) {
          hideLoc.setAttribute("style","visibility: hidden; display:none;");
          hideLoc = hideLoc.nextSibling;
        }
      }
  });
}

function myThreads() {
  var pageButtons = getElementsByClassName('page_selector', document);
  var nextPage = parseInt(pageButtons[2].firstChild.href.split('page=')[1]);
  var forumID = parseInt(pageButtons[0].firstChild.href.split('forum_id=')[1].split('&')[0]);

  // first get the ones on THIS page
  var myThreadLoc = document.getElementById('myThreads');
  var threads = document.getElementById('threads').getElementsByClassName('thread');
  for (var i = 0; i < threads.length; i++) {
    var myThreadText = "Started by: " + userName;
    if (threads[i].innerHTML.split(myThreadText)[1] != null) {
      var newThread = threads[i].cloneNode(true);
      var newTD = document.createElement('td');
      newTD.innerHTML = nextPage - 1;
      var titleTD = newThread.firstChild;
      titleTD = titleTD.nextSibling;
      titleTD = titleTD.nextSibling;
      newThread.insertBefore(newTD,titleTD);
      myThreadLoc.appendChild(newThread);
    }
  }

  // now get the threads from other pages; we'll hide all but the first gMaxThreads after loading
  for (var i = 0; i < gMaxPages; i++)
    getForumPage(forumID, nextPage + i);
}

function startOver() {
  gMaxThreads = parseInt(document.getElementById('maximumThreads').value);
  gMaxPages = parseInt(document.getElementById('maximumPages').value);
  var myThreadsLoc = document.getElementById('myThreads');

  // clear out everything but the first row (header row)
  while (myThreadsLoc.firstChild.nextSibling != null)
    myThreadsLoc.removeChild(myThreadsLoc.firstChild.nextSibling);

  myThreads();
}

doItAll();
