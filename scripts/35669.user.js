// ==UserScript==
// @name           FoFilter
// @namespace      http://www.cws.org
// @description    Craigslist Forum Filter
// @include        http://*.craigslist.org/forums/?act=DF&forumID=*
// ==/UserScript==

(function() {

function getIndentLevel(subject)
{
  var
     test, result;

  // replies start with '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

  //GM_log('"' + subject + '"');

  if (subject.substr(0, 30) == '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;') {
    test = subject.substr(30);  
  }
  else if (subject.substr(0, 7) == ' : . . ') {
    test = subject;
  }
  else {
    return 0;
  }

  result = 0;

  //GM_log('"' + test + '"');
  // then count the ' : . . ' at the front to get the indent level
  while (test.substr(0, 7) == ' : . . ') {
    result++;
    test = test.substr(7);
  }
   
  return result;
}

function getHandle(subject)
{
  var 
    pos,
    item,
    handle;

    // look for handle parameter
    pos = subject.indexOf('<a href="?act=su&amp;handle=');
    if (pos < 0) {
      return '';
    }
    handle = subject.substr(pos+28);
    // look for closing "
    pos = handle.indexOf('"');
    if (pos < 0) {
      return '';
    }
    return handle.substr(0, pos);
}

function CheckFilteredHandles(handle, list)
{
  if (handle == '') {
    return false;
  }
  for (var h = 0; h < list.length; h++) {
    if (handle == list[h]) {
      return true;
    }
  }
  return false;
}

function ExtractNumber(subject, start, end)
{
  var
    pos,
    result;

  pos = subject.indexOf(start);
  if (pos >= 0) {
    pos += start.length;
    pos2 = subject.indexOf(end, pos);
    if (pos2 > pos) {
      //GM_log(subject.substring(pos, pos2));
      result = new Number(subject.substring(pos, pos2));
      if (result != NaN) {
        return result;
      }
    }
  }
  return 0;
}

function PostRating(subject)
{
  //the rating is the sum of the +/- ratings

  var
    pos,
    pos2,
    test,
    minus,
    plus;
  
  minus = 0;
  plus = 0;

  minus = ExtractNumber(subject, '&nbsp;&nbsp;<em>-', '</em>');  
  plus = ExtractNumber(subject, '<font color="#009900"><b>+', '</b>');
  return plus - minus;  
}

var
  subjectLists,
  thisTable,
  level,
  filterLevel,
  subjectLines,
  subjectLine,
  newLines,
  rating,
  filterRating,
  filteredHandles,
  filtered,
  filterReplies,
  filterReason;

filterReplies = GM_getValue('filterReplies', true);
filterAnon = GM_getValue('filterAnon', true);
showFiltered = GM_getValue('showFiltered', false);

line = GM_getValue('filteredHandles', '');
filteredHandles = line.split(',');
filterRating = GM_getValue('filterRating', -128);

// cap this at -1
if (filterRating > -1) {
  filterRating = -1;
  GM_setValue('filterRating', filterRating);
}

if (filterRating == -128)
{
  // I'm going to assume that this means there are no
  // parameters set, and set them here to make things
  // easy.
  GM_setValue('filterReplies', filterReplies);
  GM_setValue('filterAnon', filterAnon);
  GM_setValue('showFiltered', showFiltered);

  GM_setValue('filteredHandles', filteredHandles.toString());
  filterRating = -127;
  GM_setValue('filterRating', filterRating);
}

// The subject tree is in a single TD element
// contained in a table of class 'fbod threads'.

// Get a list of the TD elements we're interested in

subjectLists = document.evaluate(
    "//table[@class='fbod threads']/tbody/tr/td",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < subjectLists.snapshotLength; i++) {
    thisTable = subjectLists.snapshotItem(i);

    // There is a BR tag after each subject line.
    // Split at the BR tags

    subjectLines = thisTable.innerHTML.split('\n');

    // initialize new subject list
    newLines = '';

    filterLevel = 0;
    level = 0;

    for (var j = 0; j < subjectLines.length; j++) {

        // The subject line we're checking is in subjectLines[j]

        // get the indent level
        //if (showFiltered || filterReplies) {
          level = getIndentLevel(subjectLines[j]);
        //} 

        // initialize filter flag for this line.
        // It starts out true if it's a filtered reply.

        if (filterLevel && level >= filterLevel) {
            filtered = true;
            filterReason = '(reply to filtered message)';
        }
        else {
            filtered = false;
            filterLevel = 0;
        }

        // am I filtering anons?
        if (!filtered && filterAnon) {
            // anon handles have a span with class 'hnd anon'.  Look for that.
            if (subjectLines[j].indexOf('<span class="hnd anon">') >= 0) {
                filtered = true;
                filterReason = '(anon message)';
            }
        }

        if (!filtered) {
          // get the handle name
          handle = getHandle(subjectLines[j]);
          if (CheckFilteredHandles(handle, filteredHandles)) {
            filtered = true;
            filterReason = '(handle: ' + handle + ')';
          } 
        }

        if (!filtered && filterRating < 0) {
          rating = PostRating(subjectLines[j]);
          if (rating <= filterRating) {
            filtered = true;
            filterReason = '(rating: ' + rating + ')';
          }
        }
        
        if (!filtered) {
          // this line is not filtered.  Add it to the new list.
          newLines += subjectLines[j] + '\n';
        }
        else {
          //newLines += subjectLines[j] + '\n';
          if (filterReplies && filterLevel == 0) {
            // filtering replies, set filterLevel to current indent level.
            filterLevel = level+1;
          }
          if (showFiltered || !filterReplies) {

            // put up something to
            // to show that the message was filtered, and 
            // indent it to make things look nice.

            if (level) {
              newLines += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
              for (var l = 0; l < level; l++) {
                newLines += ' : . . ';
              }
            }
            newLines += '--- filtered --- ' + filterReason + '<br>\n';
          }
        }
        
    }

    // display the filtered subjects
    thisTable.innerHTML = newLines;

}

})();
