// ==UserScript==
// @name           GetFlix Grabber3
// @namespace      http://arantius.com/misc/greasemonkey/
// @description    Grab all the data about your NetFlix ratings.
// @include        http://www.netflix.com/*
// @include        http://dvd.netflix.com/*
// @include        http://movies.netflix.com/*
// @include        https://movies.netflix.com/*
// ==/UserScript==

var website=window.location.origin;

// Make sure the page is not in a frame
console.log (window.self);
console.log (window.top);
if(window.self !== window.top) {
  throw "";
}

// Add GM user script commands if possible
if(GM_registerMenuCommand) {
  GM_registerMenuCommand('Start GetFlix', startGetFlix);
  GM_registerMenuCommand('Stop GetFlix', stopGetFlix);
}

var log = GM_log || (window.console ? console.log : function(e) {return true;}),
    error = GM_log || (window.console ? console.error : function(e) {return true;});

var button1=document.createElement('button');
button1.setAttribute('style', 'margin-left: 6px; vertical-align: middle; font-size: 9pt;');
button1.appendChild(document.createTextNode('Start'));
button1.addEventListener('click', startGetFlix, false);

var button2=document.createElement('button');
button2.setAttribute('style', 'margin-left: 6px; vertical-align: middle; font-size: 9pt;');
button2.appendChild(document.createTextNode('Stop'));
button2.addEventListener('click', stopGetFlix, false);

var button3=document.createElement('button');
button3.setAttribute('style', 'margin-left: 6px; vertical-align: middle; font-size: 9pt;');
button3.appendChild(document.createTextNode('Close'));
button3.addEventListener('click', closebox, false);

var menu = document.createElement('li');
var span = document.createElement("span");

span.appendChild(document.createTextNode('GetFlix2: '));
span.setAttribute("style", "font-size: 15px; color: #FFFFFF; font-family: Arial; font-weight: bold; text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5); line-height: 1.2; vertical-align: middle;");
menu.setAttribute("id", "menubox");
menu.setAttribute('style', 'position: absolute; top: 37px; width: 245px; left: 57%; background-color: transparent; text-align: center;');
menu.appendChild(span);
menu.appendChild(button1);
menu.appendChild(button2);
menu.appendChild(button3);

document.getElementById("global-header").appendChild(menu);

function makeTextWindow() {

  if(document.getElementById("textwindow") !== null) return;

  var d = document.createElement("div");

  d.setAttribute("style", "background-color: #FFFFFF; position: absolute; top: 175px; width: 80%; left: 10%; z-index: 99999; border: 5px dotted #FF0000;");
  d.setAttribute("id", "textwindow");

  var t='<div style=width="400px";background-color:white;text-align:left;">' +
    '<table cellspacing="2" cellpadding="2">' +
    '<tr style="background-color:white; text-align:center;">' +
    '<td style="font-size:14pt"><strong>Netflix <em>Movie\'s You\'ve Rated</em> extractor</strong> </td></tr>' +
    '<tr><td align="center" id="td-buttons"></td></tr>' +
    '<tr style="background-color:white" ><td>Press <b>Start</b> to get your ratings. When finished ' +
    'cut and paste the results into Notepad and save the file as ratings.csv, which you can then import into a spreadsheet for analysis. Click the <b>Close</b> button to remove this text window.</td>' +
    '<td><div style="text-align: right;color:red;font-weight:bold;" id="fetchct">Fetching Page</div></td></tr>';

  t+='<tr><td align="center"><textarea style="color:black;font-size:10pt;" id="resultbox" rows="15" cols="80"></textarea></td></tr></table></div>';

  d.innerHTML = t;
  document.body.appendChild(d);
}

function startGetFlix() {
  makeTextWindow();
  // init a single-task queue
  actionQueue=[ ['getRatingsPage', 1] ];
  // and start the queue running!
  runQueue();
}

var stopRunning=0;
function stopGetFlix() {
  console.log ("Stop Script");
  actionQueue=[];
  // stop the queue from run next time runQueue gets called
  stopRunning=1;
}

var actionQueue=[];
function runQueue() {
  if (stopRunning) {
    console.log ("stopRunning = 1");
    return;
  }
  var action=actionQueue.shift();
  //console.log("Queue length: "+actionQueue.length+".  Running action "+action[0]);

  switch (action[0]) {
    case 'getRatingsPage':
      getRatingsPage(action[1]);
      break;
    case 'parseRatings':
      parseRatingsPage(action[1], action[2]);
      break;
    case 'saveRating':
      saveRating(action[1]);
      break;
  }
}

function getRatingsPage(pagenum) {
  if (pagenum == 1) {
    var url=website+'/MoviesYouveSeen';
    // reset the results
    var rf = document.getElementById('resultbox');
    rf.value = "";
  } else {
    if (website == "http://dvd.netflix.com") {var url=website+'/MoviesYouveSeen'+'?pageNum='+parseInt(pagenum, 10);}
    if (website == "http://movies.netflix.com") {var url=website+'/MoviesYouveSeen'+'?pn='+parseInt(pagenum, 10);}
  }
  var fc = document.getElementById('fetchct');
  fc.innerHTML = "Fetching Page " + pagenum;
  //console.info('Fetch:', url);
  GM_xmlhttpRequest({
    'method':'GET',
    'url':url,
    onload: function(xhr) {
      //console.log("getRatingsPage load status= "+xhr.status);
      actionQueue.push(['parseRatings', pagenum, xhr.responseText]);
      runQueue();
    }
  });
}

function parseRatingsPage(num, text) {
  //Search pattern used to verify you have rated a movie
  var ratingRegex = /You rated this movie[^\d]+(\d)/;
  var ratings = text.split(/class="list-title"/),
      blankArray = ["",""];
  // get rid of the HTML before the first one
  ratings.shift();
  var MovieRating = "";
  for (var i=0, rating=null; rating=ratings[i]; i++) {
    //Test to make sure movie is rated so you don't get a rating.match exception
    if(ratingRegex.test(rating)) {
      MovieRating=rating.match(ratingRegex)[1];
      var detail={
        'id':rating.match(/\/(\d+)\?trkid=/i)[1],
        'title':(rating.match(/"title"><a.*?>(.*?)</) || rating.match(/<span class="title "><a[^>]+>([^<]+)/i))[1],
        'year':(rating.match(/"list-titleyear"> \(([0-9]+)\)/i) || blankArray)[1],
        'genre':(rating.match(/"list-genre">(.+?)</i) || blankArray)[1],
        'rating':MovieRating
      };
      actionQueue.push(['saveRating', detail]);
    } else {
      var detail1={'title':(rating.match(/"title"><a.*?>(.*?)</) || rating.match(/<span class="title "><a[^>]+>([^<]+)/i))[1] };
      console.log ("Movie not rated = "+detail1.title+" on page "+num);
    }
  }
  //Test to see if more ratings pages
  if(/paginationLink-next|go to the next page/i.test(text)) {
    actionQueue.push(['getRatingsPage', num+1]);
    runQueue();
  } else { console.log ("Done extracting movie ratings"); }
}

function saveRating(detail) {
  //replace any commas in movie titles as this is being saved as a comma delimited .csv file
  var newtitle=detail.title.replace(/,/g,'');
  var rf = document.getElementById('resultbox');
  rf.value += (newtitle+","+detail.year+","+detail.genre+","+detail.rating+","+detail.id+"\n");
  runQueue();
}

function closebox() {
  document.body.removeChild(document.getElementById("textwindow"));
}
