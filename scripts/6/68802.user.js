// ==UserScript==
// @name           Ikariam IntelliMail
// @namespace      IKIM
// @description    Tries to make the Ikariam messaging system useful
// @version        0.07
// @include        http://s*.ikariam.*/*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/68732.user.js
// @history        0.02 - Real "First" Version, Subject alteration only!
// @history        0.02 - Works, but lacks support for all message types
// @history        0.03 - Hides formatted subjects in message body
// @history        0.04 - Works on outbox
// @history        0.05 - Rewrite, some extra goodies
// @history        0.06 - Comments added on request
// @history        0.06 - A few minor trimming tweaks
// @history        0.07 - *FIXED* Problem with "undefined" ranks in Alliance section
// ==/UserScript==

ScriptUpdater.check(68802, '0.07'); //  from 57756.user.js, handles all the update distribution

var trimOldText = true; //  In the future this will be part of the user config options, "hides" older messages (lines with prefix ">>")

function getFirstLine(str) {                       //  Used when there is no [subject], returns first line of actual content
  str = str.split('\n');                           //  Convert message string to array of lines
  for (var i=0; i<str.length; i++) {               //  Loop through lines
    if (str[i].length > 0 && str[i] != '<br/>') {  //  Check for content
      return str[i];                               //  First found content is returned, function exits
    }
  }
}

function isDiplo() {                                           //  Checks to make sure we are on a screen with messages
  var crumbs = C_API.xpath('//div[@id="breadcrumbs"]//span');  //  This span is the red banner just under the resources on the "main view" of the page
  //  Serves as a "mode" selector for the script, though currently only "diplo" is really used
  if (crumbs.snapshotItem(crumbs.snapshotLength-1).textContent == 'Diplomatic Advisor') { return 'diplo'; }
  else if (crumbs.snapshotItem(crumbs.snapshotLength-1).textContent == 'Write message') { return 'write'; }
  //  Failing the others we return a "default" value
  return 'other';
}

//  regex and return the view variable from the current page URL
function getView() { var m = /view=([a-zA-Z0-9]+)/.exec(window.location); if (m != null) { return m[1]; } return null; }
//  We need to use a different loop step to format the page.  Inbox messages are 3 rows each, outbox are only 1
function getStep() { if (getView() == 'diplomacyAdvisor') { return 3; } else { return 1; } }

//  Subject "tag" selector, takes the premade Ikariam subject, converts it to the new text, and adds color
function newSubject(pre) {
  switch (pre) {
    case 'Take back cultural goods treaty request': return '<b><font color="#00a000">CT</font></b>: Cancel';   break;
    case 'is offering a cultural goods treaty':     return '<b><font color="#00a000">CT</font></b>: Offer';    break;
    case 'Accept cultural treaty':                  return '<b><font color="#00a000">CT</font></b>: Accepted'; break;
    case 'Message':                                 return '<b><font color="#0000a0">PM</font></b>: ';         break;
    case 'Circular Message - Alliance':             return '<b><font color="#a00000">Alliance</font></b>: ';   break;
  }
  return pre;
}

//  Stub for later
function subjectFromMessage(msg) {

}

//  Not fully implemented, will add/change button functions in future version
function buttonTasks(btnRow) {
//btnRow(tr) -> td[0] -> span[0]{action btns} -> a[0]{answer}
//                                            -> a[1]{delete}
//                                            -> a[2]{report}
//                    -> span[1]{archive btns}
  var d = btnRow.getElementsByTagName('span');
  if (d[1] != undefined) {
    d[1].style.display = 'none';
    var btns = d[0].getElementsByTagName('a');
    var ansB = btns[0];
    var delB = btns[0];
    var repB = btns[0];
  }
}

//  Gather the messages from the current page
function getMessages() {
  var msgRows = C_API.xpath('//div[@class="content"]//table[@class="table01"]//tr'); //  Grab the message table
  var step = getStep();  //  Set the loop step according to which mailbox we are viewing
  for (var i=1; i<msgRows.snapshotLength-1; i+=step) {  //  Loop through message table rows
    var headRow   = msgRows.snapshotItem(i);            //  This is the row you always see regardless of box
    var headCells = headRow.getElementsByTagName('td'); //  Get the cells as an array
    var subject   = headCells[3];                       //  Easy reference to the one we want to work on
    var message   = msgRows.snapshotItem(i+1).getElementsByTagName('td')[0]; // Get message body
    if (step == 3) { buttonTasks(msgRows.snapshotItem(i+2)); }               // If step is 3, this is the inbox, alter buttons (future)
    if (subject != undefined) {                                              // Make sure subject was found, mostly here to silence errors
      subject.innerHTML = newSubject(subject.textContent);                   // Get the new subject prefix
      switch (subject.textContent) {                                         // Create or get the actual subject
        //  Currently PM and Alliance do the same thing for subjects, so there is no break
        case 'PM: ':
        case 'Alliance: ':
          firstLine = getFirstLine(message.textContent);     //  First line with something on it
          if (firstLine.indexOf('[') != -1)    {             //  Detect [subject] notation
            var subLine = firstLine.replace(/[\[\]]/g, '');  //  Remove the [] for display
            //  Hide the [subject] notation in message body
            message.innerHTML  = message.innerHTML.substr(1, message.innerHTML.indexOf('[')-1) + message.innerHTML.substr(message.innerHTML.indexOf(']')+1, message.innerHTML.length); 
          } else {
            //  No notation found, use the first 50 characters of the message
            var subLine = firstLine.substr(1, 50);  
          }
          //  Trim to prevent making the row into two lines
          if (subLine.length > 48) { subLine = subLine.substr(0, 45) + '...'; }
          subject.innerHTML += subLine;  //  Append the subject to the prefix
          if (trimOldText) {             //  Hide old messages?
            var s = '';                  //  "New" message 
            var m = message.innerHTML.split('\n');  //  Lines to array
            for (var n=0; n<m.length; n++) {        //  Loop through lines
              if (m[n+1]) {                         //  check the next line to see if it exists
                if (m[n+1].substr(3, 10) == '>&gt; &gt;') { break; }  //  If it does, and starts with >>, stop
              } 
              s += m[n];  //   Otherwise, add it to the "new" message
            }
            message.innerHTML = s;  //  Make the "new" message the message we see
            subject.setAttribute('title', message.textContent);  //  Make the new message textContent into the message title
          } 
          break;  //  end of case
      }
    }
  }
}

//  Eventually will display user opts menu
function openOptions() { }

//  Adds the link for the user opts menu to the current page  Not currently used
function insertSettingsLink() {
  var mTbl  = C_API.xpath('//div[@class="content"]//table[@class="table01"]//td[@class="selection"]').snapshotItem(0);
  var sLink = document.createElement('span');
  mTbl.appendChild(sLink);
  sLink.setAttribute('style', 'text-align:center; font-weight:normal; cursor:pointer; text-decoration:underline; float:right; padding-top:25px;');
  sLink.innerHTML = 'Message Preferences';
  sLink.addEventListener('click', openOptions, false);
}





//  Pick mode
var mode = isDiplo();
switch (mode) {
  case 'diplo':
    getMessages();
    //  insertSettingsLink();
    break;
  case 'write':
    break;
  case 'other':
    break;
}