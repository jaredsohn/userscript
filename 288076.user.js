// ==UserScript==
// @name              OACT splits grabber
// @version           1.4.2
// @namespace         http://watsons.id.au/tampermonkey/
// @description       extract split results from OA web site
// @match             http://act.orienteering.asn.au/gfolder/results/*
// @grant             none
// @copyright         2011+, GPL
// ==/UserScript==
//
// Author: Arthur Watson
// Date:   January 2014
//
// Purpose: View splits from OACT website under control of user.
//
// Description:
//      1. use the tampermonkey add-on in Google Chrome to run this script
//
// Environment:
//      Chrome web browser  --> tampermonkey add-on,
//      Firefox web browser --> greasemonkey add-on,
//                          --> javascript enabled

//"use strict";
/*jslint
   browser: true, continue: true, indent: 2, regexp: true, white: true, sloppy: true
*/

  // string variables, replacement body, script and css
  var
  visualiseBody = function() {/*
    <div class="header">
    <h1>OACT Event - Splits Visualiser.</h1>
    <h2 id="description"></h2>
    <input type="hidden" id="eventdata" />
    </div>
    <table valign="top">
    <tr>
    <td><button class="splits" type="button" onclick="loadCourses();">1. Load Courses and Classes</button></td>
    </tr>
    <tr>
      <td>
      <table>
        <tr>
        <td><p>You may select any number of<br />classes from the same course.</p></td>
        <td>Select the runners whose splits<br />you want to compare.</p></td>
        </tr>
        <tr>
          <td><select class="select" multiple="multiple" id="courseclasslist" ></select></td>
          <td><select class="select" multiple="multiple" id="runnerlist" ></select></td>
        </tr>
        <tr>
          <td><button class="splits" type="button" onclick="showRunners();">2. Show Eligible Runners</button></td>
          <td><button class="splits" yype="button" onclick="showGraph();">3. Show Split Comparisons"</button></td>
        </tr>
      </table>
      </td>
    </tr>
    <tr>
      <td>
      <table>
        <tr><td id="prettyrunnerlist"></td></tr>
        <tr><td id="svg"></td></tr>
      </table>
      </td>
    </tr>
    </table>
*/}.toString().slice( 16, -3),

  visualiseCSS = function () {/*
* {
  background: white;
  color: blue;
  margin: 0;
  padding: 0;
}

td.prettyrunnerlist {
  text-align: right;
  vertical-align: top;
  border-right: 1px solid white;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: lighter;
  font-size: smaller;
}

div.header {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

h1, h2 {
  text-align: center;
}

#wrapper {
  width: 1400;
}

select.select {
  background: white;
  width: 100%;
  height: 150px;
  margin-right: 10px;
  }

td {
  margin-right: 10px;
}

button.splits {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #ffffff;
  padding: 10px 20px;
  background: -moz-linear-gradient(
    top,
    #42aaff 0%,
    #003366);
  background: -webkit-gradient(
    linear, left top, left bottom,
    from(#42aaff),
    to(#003366));
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  border: 1px solid #003366;
  -moz-box-shadow:
    0px 1px 3px rgba(000,000,000,0.5),
    inset 0px 0px 1px rgba(255,255,255,0.5);
  -webkit-box-shadow:
    0px 1px 3px rgba(000,000,000,0.5),
    inset 0px 0px 1px rgba(255,255,255,0.5);
  box-shadow:
    0px 1px 3px rgba(000,000,000,0.5),
    inset 0px 0px 1px rgba(255,255,255,0.5);
  text-shadow:
    0px -1px 0px rgba(000,000,000,0.7),
    0px 1px 0px rgba(255,255,255,0.3);
  margin-bottom: 10px;
}

option[selected] {
  background: black;
  color: white;
}
*/}.toString().slice( 15, -3),

  visualiseScript = function() {/*
var
  myevent,
  courseIndex = 0,
  regex = /(\d+)_(\d+)/,
  o_colour,
  h_colour = "#ff1493";  // Hot Pink

  function svg_highlight( e) {
    var
      evt = window.event || e,
      thisId,
      results,
      primaryId,
      secondaryId,
      realTarget,
      nameId,
      nameElement,
      i,
      otherLines;

    o_colour = evt.target.getAttribute( "stroke");
    thisId = evt.target.getAttribute( "id");
    results = regex.exec( thisId);
    primaryId = results[ 1];
    secondaryId = results[ 2];
    thisId = 'line' + primaryId +'_' + secondaryId;
    realTarget = document.getElementById( thisId);
    realTarget.setAttribute( "stroke-width", "2");
    //realTarget.setAttribute( "stroke", h_colour);

    // now make other lines not with the same primary id semi-opaque
    otherLines = document.getElementsByClassName( 'splitline');
    for ( i = 0; i < otherLines.length; i += 1) {
      if ( regex.exec( otherLines[ i].getAttribute( 'id'))[ 1] !== primaryId) {
        otherLines[ i].style.opacity = 0.5;
      }
    }

    // highlight the name
    nameId = 'name_' + primaryId;
    nameElement = document.getElementById( nameId);
    nameElement.setAttribute( 'font-weight', 'bold');
  }

  function svg_restore( e) {
    var
      evt = window.event || e,
      thisId,
      results,
      primaryId,
      secondaryId,
      realTarget,
      nameId,
      nameElement,
      i,
      otherLines;

    thisId = evt.target.getAttribute( "id");
    results = regex.exec( thisId);
    primaryId = results[ 1];
    secondaryId = results[ 2];
    thisId = 'line' + primaryId +'_' + secondaryId;
    realTarget = document.getElementById( thisId);
    realTarget.setAttribute( "stroke-width", "1");
    realTarget.setAttribute( "stroke", o_colour);
    // now make other lines normal opacity
    otherLines = document.getElementsByClassName( 'splitline');
    for ( i = 0; i < otherLines.length; i += 1) {
      if ( otherLines[ i].getAttribute( 'id') !== thisId) {
        otherLines[ i].style.opacity = 1.0;
      }
    }

    // unhighlight the name
    nameId = 'name_' + primaryId;
    nameElement = document.getElementById( nameId);
    nameElement.setAttribute( 'font-weight', 'normal');

  }

function loadCourses() {
  var
    element = document.getElementById( 'courseclasslist'),
    eventdata,
    i,
    j,
    optionRow,
    optionGroup,
    groupId = 0,
    courseAgeClasses;

  // get the event data
  eventdata = document.getElementById( 'eventdata').value;
  // remove first and last characters, a ".
  eventdata = eventdata.slice( 1, -1);
  // replace /" with "
  eventdata = eventdata.replace( /\\"/g, '"');

  myevent = JSON.parse( eventdata);

  // set the description
  document.getElementById( 'description').textContent = myevent.description;

  for ( i = 0; i < myevent.courses.length; i += 1) {

    // add an optiongroup for each course
    optionGroup = document.createElement( 'optgroup');
    optionGroup.setAttribute( 'label', myevent.courses[ i].name);
    optionGroup.setAttribute( 'id', parseInt( groupId, 10));
    element.appendChild( optionGroup);

    // get list of age classes for course
    courseAgeClasses = [];
    for ( j = 0; j < myevent.courses[ i].runners.length; j += 1) {
      if ( courseAgeClasses.indexOf( myevent.courses[ i].runners[ j].ageclass) < 0) {
        courseAgeClasses.push( myevent.courses[ i].runners[ j].ageclass);
      }
    }
    // show classes for each course
    for ( j = 0; j < courseAgeClasses.length; j += 1) {
      optionRow = document.createElement( 'option');
      optionRow.setAttribute( 'value', courseAgeClasses[ j]);
      optionRow.setAttribute( 'id', parseInt( groupId, 10));
      optionRow.textContent = courseAgeClasses[ j];
      optionGroup.appendChild( optionRow);
    }
    groupId += 1;
  }
  return true;
}


function insertSelector( ageClasses) {
  var ageClassList = document.getElementById( 'ageclasslist'),
      optionRow,
      i;

  // remove any previous entries
  while ( ageClassList.firstChild) {
    ageClassList.removeChild( ageClassList.firstChild);
  }

  ageClassList.setAttribute( 'size', ageClasses.length);

  for ( i = 0; i < ageClasses.length; i += 1) {
    optionRow = document.createElement( 'option');
    optionRow.setAttribute( 'value', ageClasses[ i]);
    optionRow.textContent = ageClasses[ i];
    ageClassList.appendChild( optionRow);
  }
}

function showAgeClasses( ) {
  var courseList = document.getElementById( 'courselist'),
      courseAgeClasses = [],
      i;

  for ( i = 0; i < courseList.options.length; i += 1) {
    if ( courseList.options[ i].selected) {
      courseIndex = i;
    }
  }


  courseAgeClasses = [];
  for ( i = 0; i < myevent.courses[ courseIndex].runners.length; i += 1) {
    if ( courseAgeClasses.indexOf( myevent.courses[ courseIndex].runners[ i].ageclass) < 0) {
      courseAgeClasses.push( myevent.courses[ courseIndex].runners[ i].ageclass);
    }
  }

  insertSelector( courseAgeClasses);

  return true;
}

function showRunners() {
  var ageClassList = document.getElementById( 'courseclasslist'),
      runnerList = document.getElementById( 'runnerlist'),
      selectedClasses = [],
      optionRow,
      rowValue,
      idValue = '',
      i;

  for ( i = 0; i < ageClassList.options.length; i += 1) {
    if ( ageClassList.options[ i].selected) {
      selectedClasses.push( ageClassList.options[ i].value);
      if ( idValue === '') {
        idValue = ageClassList.options[ i].id;
      }
      else if ( ageClassList.options[ i].id !== idValue) {
        alert( 'You have selected multiple classes from different courses.\nWe cannot compare these splits.\nOnly select from the same course.');
        return;
      }
    }
  }

  // remove any previous entries
  while ( runnerList.firstChild) {
    runnerList.removeChild( runnerList.firstChild);
  }

  courseIndex = parseInt( idValue, 10);
  for ( i = 0; i < myevent.courses[ courseIndex].runners.length; i += 1) {
    if ( selectedClasses.indexOf( myevent.courses[ courseIndex].runners[ i].ageclass) > -1) {
      optionRow = document.createElement( 'option');
      rowValue = myevent.courses[ courseIndex].runners[ i].name;
      optionRow.setAttribute( 'value', rowValue);
      rowValue = myevent.courses[ courseIndex].runners[ i].Pl + ' ' +
                 myevent.courses[ courseIndex].runners[ i].name + ' ' +
                 myevent.courses[ courseIndex].runners[ i].ageclass + ' ' +
                 myevent.courses[ courseIndex].runners[ i].club + ' ' +
                 myevent.courses[ courseIndex].runners[ i].time;
      optionRow.textContent = rowValue;
      runnerList.appendChild( optionRow);
    }
  }

  runnerList.setAttribute( 'size', runnerList.options.length);
}

function strTimeToSec( t) {
  // convert [h:]:mm:ss to seconds
  var sec = 0,
      items = [],
      i;

  items = t.split( ':');
  for ( i = 0; i < items.length; i += 1) {
    items[ i] = parseInt( items[ i], 10);
    sec += items[ i] * Math.pow( 60, ( items.length - 1 - i));
  }

  return sec;
}

function pad( str, max) {
  return str.length < max ? pad( "0" + str, max) : str;
}

function secToStrTime( t) {
  // convert seconds to mmm:ss
  var min,
      sec;

  min = ( Math.floor( t / 60)).toString();
  sec = pad( (t - ( min* 60)).toString(), 2);

  return min + ':' + sec;
}

function bestSplits() {
  // get the shortest splits for all runners on this course
  var allSplits = [],
      bestSplitsArray = [],
      i,
      j;

  //gather all the splits but ignore empty ones
  for ( i = 0; i < myevent.courses[ courseIndex].runners.length; i += 1) {
    if ( myevent.courses[ courseIndex].runners[ i].splits.length === myevent.courses[ courseIndex].controlcodes.length) {
      allSplits.push( myevent.courses[ courseIndex].runners[ i].splits);
    }
  }

  // go columnwise to get the shortest on each leg
  for ( i = 0; i < myevent.courses[ courseIndex].controlcodes.length; i += 1) { // all splits
    // initialise the best splits member here
    bestSplitsArray[ i] = 99999;
    for ( j = 0; j < allSplits.length; j += 1) {          // all runners
    // look out for zero splits from team members
      if ( strTimeToSec( allSplits[ j][ i]) > 0 && strTimeToSec( allSplits[ j][ i]) < bestSplitsArray[ i]) {
        bestSplitsArray[ i] = strTimeToSec( allSplits[ j][ i]);
      }
    }
    bestSplitsArray[ i] = secToStrTime( bestSplitsArray[ i]);
  }
  return bestSplitsArray;
}

function findRunner( name) {
  // courseIndex is a global
  var i;

  for ( i = 0; i < myevent.courses[ courseIndex].runners.length; i += 1) {
    if ( name === myevent.courses[ courseIndex].runners[ i].name) {
      return myevent.courses[ courseIndex].runners[ i];
    }
  }
  return '';
}

function prettifyRunner( runner) {
  // pretty up the runner for display
  var prettyRunner = '';

  prettyRunner = '<tr>';
  prettyRunner += '<td class="pretty">' + runner.name + '</td>';

  if ( runner.hasOwnProperty( 'Cl.')) {
    prettyRunner += '<td class="pretty">' + runner.ageclass + '</td>';
  }
  else {
    prettyRunner += '<td class="pretty">&nbsp;</td>';
  }

  prettyRunner += '<td class="pretty">';

  prettyRunner += runner.splits.join( '</td><td class="pretty">');
  prettyRunner += '</td><td class="pretty">' + runner.time + '</td></tr>';

  return prettyRunner;
}

function decideVerticalTicks( maxTime, minTime) {
  // decide which minutes marks to put a tick on
  // for the vertical scale
  // return an array of 2-tuples with tick-seconds and display text

  var
    vertMinutes,
    vertSeconds,
    vertTicks,
    skip,
    i;

  vertMinutes = Math.ceil(( maxTime - minTime) / 60);
  vertSeconds = vertMinutes * 60;

  if ( vertMinutes <= 6) {
    skip = 1;
  }
  else if ( vertMinutes <= 11) {
    skip = 2;
  }
  else if ( vertMinutes <= 31) {
    skip = 5;
  }
  else {
    skip = 15;
  }
  vertTicks = [];

  for ( i = 0; i < vertMinutes; i += skip) {
    vertTicks.push( i);
  }

  if ( vertTicks.slice( -1)[ 0] === vertMinutes - skip) {
    vertTicks.push( vertMinutes);
  }
  return vertTicks;
}


function generateGraph( runners) {
  // generate the SVG
  var svgText = '',
      svgHeight = 400,
      svgWidth  = 1200,
      xStartPos = 10,  // start the baseline a little from the edge
      yStartPos = 40,  // and down far enough for the text plus tag line
      tagLength = 10,
      lineColours = [ 'blue', 'black', 'red', 'purple', 'green'],
      //yMaxSize = 350,  // max height
      xMaxSize = 1100,  // max width
      fontFamily= 'liberation',
      fontSize = 12,
      fontSizePx = 12,
      fontFill = 'blue',
      fontStroke = 'blue',
      thisColour,
      thisDeficit,
      xBaseEnd,
      interControlDistance,
      multiPoints,
      x1,
      y1,
      prevy1,
      yText,
      yTag1,
      yTag2,
      xPos,
      xTag1,
      xTag2,
      thisCode,
      i,
      j,
      maxTime,
      minTime,
      verticalScale,
      vertTicks,
      vAxisEnd;

  //svgText = '<svg xmlns="http://www.www.w3.org/2000/svg" version="1.1" viewPort="0 0 600 300" preserveAspectRatio="xMidyMid meet" >\n';
  svgText = '<svg width="' + svgWidth + '" height="' + svgHeight + '" viewBox="0 0 ' + svgWidth + ' ' + svgHeight + '">\n';
  svgText += '<g style="stroke: black" >\n';

  xBaseEnd = xMaxSize - xStartPos - 250;  // leave room for names at right hand side
  interControlDistance = xBaseEnd / ( myevent.courses[ courseIndex].controlcodes.length -1);

  svgText += '<line x1="' + xStartPos + '" y1="' + yStartPos + '" x2="' + ( xBaseEnd + xStartPos + interControlDistance) + '" y2="' + yStartPos + '" stroke-width="1" />\n';

  yText = yStartPos - 25; // top of text
  yTag1 = yStartPos - tagLength; // top of tag line(s)
  yTag2 = yStartPos;             // bottom of tag line(s)
  xPos  = xStartPos;  // x pos of first tag

  for ( i = -1; i < myevent.courses[ courseIndex].controlcodes.length; i += 1) {
    // draw the control number and the tag line
    if ( i < 0) { // draw the start
      thisCode = 'S';
    }
    else {
      thisCode = myevent.courses[ courseIndex].controlcodes[ i];
    }
    xTag1 = xPos;
    xTag2 = xTag1;
    svgText += '<text x="' + xPos +
               '" y="' + yText +
               '" font-family="' + fontFamily +
               '" font-size="' + fontSize +
               '" stroke="' + fontStroke +
               '" fill="' + fontFill +
               '" >' + thisCode + '</text>\n';

    svgText += '<line x1="' + xTag1 +
               '" y1="' + yTag1 +
               '" x2="' + xTag2 +
               '" y2="' + yTag2 +
               '" stroke-width="1" />\n';

    xPos += interControlDistance;
  }

  maxTime = strTimeToSec( runners.slice( -1)[ 0].time); // the slowest runner in the selection
  minTime = strTimeToSec( runners[ 0].time);  // the 'best' time
  verticalScale = ( svgHeight - 100) / ( Math.ceil(( maxTime - minTime) / 60) * 60); // pixels per second, upped to next minute
  vertTicks = decideVerticalTicks( maxTime, minTime);

  // add a vertical axis
  if (( vertTicks.slice( -1)[ 0] * 60) > (maxTime - minTime)) {
    vAxisEnd = vertTicks.slice( -1)[ 0] * 60 * verticalScale;
  }
  else {
    vAxisEnd = ( maxTime - minTime) * 60 * verticalScale;
  }

  x1 = xPos - interControlDistance;
  svgText += '<line x1="' + x1 +
             '" y1="' + yStartPos +
             '" x2="' + x1 +
             '" y2="' + ( yStartPos + vAxisEnd)  +
             '" stroke-width="1" />\n';

  // add the tick marks and text
  for ( i = 0; i < vertTicks.length; i += 1) {
    svgText += '<line x1="' + x1 +
               '" y1="' + ( yStartPos + ( vertTicks[ i] * 60 * verticalScale)) +
               '" x2="' + ( x1 + 5) +
               '" y2="' + ( yStartPos  + ( vertTicks[ i] * 60 * verticalScale)) +
               '" stroke-width="1" />\n';

    svgText += '<text x="' + (x1 -25) +
               '" + y="' + ( yStartPos + ( vertTicks[ i] * 60 * verticalScale)) +
               '" font-family="' + fontFamily +
               '" font-size="' + fontSize +
               '" stroke="' + fontStroke +
               '" fill="' + fontFill + '">' +
               parseInt( vertTicks[ i], 10) + ':00</text>\n';

  }

  prevy1 = yStartPos - ( fontSizePx + 1);
  for ( i = 0; i < runners.length; i += 1) {
    y1 = yStartPos;  // set the first virtual point at the start
    x1 = xStartPos;
    multiPoints = [[ x1, y1]];
    for ( j = 0; j < runners[ i].splits.length; j += 1) {
      x1 += interControlDistance;
      y1 += (( strTimeToSec( runners[ i].splits[ j]) - strTimeToSec( runners[ 0].splits[ j])) * verticalScale);
      multiPoints.push( [ x1, y1]);
    }

    // arrange highlighting
    svgText += '<g onmouseover="svg_highlight( evt)" onmouseout="svg_restore( evt)">\n';

    // add the runner's performance if not 'Lickety Splits'
    if ( i > 0) {
      thisColour = lineColours[ i % lineColours.length];
      for ( j = 0; j < multiPoints.length - 1; j += 1) {
        // draw individual lines for each leg so that we can popup tooltips
        svgText += '<line class="splitline" id="line' + i +'_' + j +
                '" x1="' + multiPoints[ j][ 0] +
                '" y1="' + multiPoints[ j][ 1] +
                '" x2="' + multiPoints[ j + 1][ 0] +
                '" y2="' + multiPoints[ j + 1][ 1] +
                '" stroke="' + thisColour +
                '" stroke-width="1" >' +
                '  <title>' + secToStrTime( strTimeToSec( runners[ i].splits[ j]) - strTimeToSec( runners[ 0].splits[ j])) + '</title>' +
                '</line>\n';

      }
    }

    // add the runner's name and time deficit
    if ( i > 0) {
      thisDeficit = ' [-' + ( secToStrTime( strTimeToSec( runners[ i].time) - strTimeToSec( runners[ 0].time))) + ']';
    }
    else {
      thisDeficit = '';
    }
    if ( y1 < ( prevy1 + fontSizePx + 1)) {  // trying to reduce clutter of names overwriting each other
      y1 = prevy1 + fontSizePx + 1;
    }
    if ( i === 0) {
      thisColour = 'blue';
    }
    svgText += '<text id="name_' + i +
               '"x="' + ( x1 + 10) +
               '" y="' + y1 +
               '" font-family="' + fontFamily +
               '" font-size="' + fontSize +
               '" stroke="' + thisColour +
               '" fill="' + thisColour + '">' +
               '<title>' + runners[ i].club + '</title>' +
               runners[ i].name + thisDeficit + '</text>\n';
    prevy1 = y1;
    svgText += '</g>\n';
  }
  svgText += '</g>\n';
  svgText += '</svg>\n';

  return svgText;
}

function showGraph() {
  var showRunners = document.getElementById( 'runnerlist'),
      selectedRunners = [],
      svg = document.getElementById( 'svg'),
      pretty = document.getElementById( 'prettyrunnerlist'),
      prettyRunner = '',
      thisRunner,
      bestRunner = {},
      bestTime = 0,
      headerRow01,
      headerRow02,
      i;

  // set up best runner
  bestRunner.name = '"Lickety Splits"';
  bestRunner.club = '';

  // work out 'best' splits ...
  bestRunner.splits = bestSplits();
  //... and time
  for ( i = 0; i < bestRunner.splits.length; i += 1) {
    bestTime += strTimeToSec( bestRunner.splits[ i]);
  }
  bestRunner.time = secToStrTime( bestTime);

  // add the 'best' runner to the list
  selectedRunners.push( bestRunner);
  prettyRunner = '<table class="selectedRunners">';

  // add header rows
  headerRow01 = '<tr><th>&nbsp;</th><th>&nbsp;</th>';
  headerRow02 = '<tr><th>&nbsp;</th><th>&nbsp;</th>';
  for ( i = 0; i < myevent.courses[ courseIndex].controlcodes.length; i += 1) {
    headerRow01 += '<th>' + ( i + 1) + '</th>';
    headerRow02 += '<th>(' + myevent.courses[ courseIndex].controlcodes[ i] + ')</th>';
  }
  headerRow01 += '<th>Total</th></tr>\n';
  headerRow02 += '<th>&nbsp;</th></tr>\n';

  prettyRunner += headerRow01;
  prettyRunner += headerRow02;

  prettyRunner += prettifyRunner( bestRunner);

  for ( i = 0; i < showRunners.options.length; i += 1) {
    if ( showRunners.options[ i].selected) {
      thisRunner = findRunner( showRunners.options[ i].value);  // the runner's name
      selectedRunners.push( thisRunner);
      prettyRunner += prettifyRunner( thisRunner);
    }
  }
  prettyRunner += '</table>';
  pretty.innerHTML = prettyRunner;

  svg.innerHTML = generateGraph( selectedRunners);

  return;
}
*/}.toString().slice( 15, -3);

// check that this is a splits result from Stephan Kramer SportSoftware

function getResultHeaders( headerRow) {
  var i = 0,
      count = 0,
      headers = {},
      t = '',
      cells = headerRow.querySelectorAll( 'th');

  for ( i = 0; i < cells.length; i += 1) {
    t = cells[ i].textContent;
    if ( t.length > 0) {
      headers[ t] = i;
      count += 1;
    }
    else {
      break;
    }
  }
  headers.length = count;
  return headers;
}

function zeroPad( number, size) {
  number = number.toString();
  while (number.length < size) {
      number = "0" + number;
  }
  return number;
}

function getEventData() {
// preliminary scan through the results page to get:
//    1. the name and date of the event
//    2. the names of the course
//    3. how many controls in each
//    4. how many runners in each
  var event,
      //headerTable,
      eventDescription,
      courseNameCells,
      courseLengthCells,
      courseNumberOfControlCells,
      courseName,
      courseLength,
      courseNumberOfControls,
      courseNumberOfRunners,
      courseNamePattern = /\s+\(\d+\)$/,  // to get the number of runners in the parenthised bit at the end
      runners,
      i;

  event = {};

  eventDescription = document.querySelector( 'div#reporttop table tr td nobr').textContent;
  event.description = eventDescription ;

  courseNameCells            = document.querySelectorAll( 'td#c00');
  courseLengthCells          = document.querySelectorAll( 'td#c01');
  courseNumberOfControlCells = document.querySelectorAll( 'td#c02');

  event.courses = [];

  for ( i = 0; i < courseNameCells.length; i += 1) {
    event.courses[ i] = {};
    // course name field is <course_name> <(no_of_runners)>
    courseName = courseNameCells[ i].textContent;
    runners = courseNamePattern.exec( courseName);
    courseName = courseName.replace( runners[ 0], '');
    courseName = courseName.replace( /\s+/, '_');
    runners = /\d+/.exec( runners[ 0]);
    courseNumberOfRunners = runners[ 0];

    event.courses[ i].name = courseName;
    event.courses[ i].numberofrunners = courseNumberOfRunners;
    event.courses[ i].ageclasses = [];

    // take the Km off the end of the length
    courseLength = courseLengthCells[ i].textContent;
    courseLength = courseLength.replace( /\s+km/i, '');

    event.courses[ i].length = courseLength;

    // and take off the 'C' and the end of this field
    courseNumberOfControls= courseNumberOfControlCells[ i].textContent;
    courseNumberOfControls = courseNumberOfControls.replace( /\s+c/i, '');

    event.courses[ i].controls = courseNumberOfControls;
  }
  return event;
}

function getRunnerData( runnersRowIndex, rowCells, resultHeaders, runnersData) {
  //  grab name, ageclass and time from the first runner row
  //  the club from the second
  // the indices are in the result headers in the event object
  if ( runnersRowIndex === 0) {
    // get name, ageclass and time
    runnersData.Pl       = rowCells[ resultHeaders.Pl].textContent;
    runnersData.name     = rowCells[ resultHeaders.Name].textContent;
    runnersData.ageclass = rowCells[ resultHeaders[ 'Cl.']].textContent;
    runnersData.time     = rowCells[ resultHeaders.Time].textContent;

  }
  else if ( runnersRowIndex === 1) {
    // get the club, in the same position as name in row 0
    runnersData.club = rowCells[ resultHeaders.Name].textContent;  // club is in same position as name in the previous row
  }
  return runnersData;
}

function getRunnerSplits( rowCells, resultHeadersLength, runnersSplits) {
  // get the splits from odd numbered rows
  var i;

  for ( i = resultHeadersLength; i < rowCells.length; i += 1) {
    if ( rowCells[ i].textContent.length > 0) {
      runnersSplits.push( rowCells[ i].textContent);
    }
    else {
      break;
    }
  }
  return runnersSplits;
}

function extractResults( event, rows, courseIndex, columnLength) {
  // the first row tuple has the control numbers
  // then we have tuples of double the length for the results which have
  // split and cumulative times on alternating rows
  // also there are short rows which we will ignore
  // also stop scanning when we get to non-finishers, ie the time is not in the correct format
  var cellLength,
      controlsPerRow,
      rowsForControls,
      rowsForRunner,
      rowCells,
      controlCodes,
      thisCode,
      controlCodePattern,
      runnersSplits,
      runnersData,
      splitsIndex,
      runnersIndex,
      runnersRowIndex,
      resultHeaders,
      rowContent,
      i,
      j;

  // check that the column length and number of cells tally
  cellLength = rows[ 0].querySelectorAll( 'td').length;
  if ( columnLength === cellLength) {
    event.checkCellLength[ courseIndex] = true;
  }
  else {
    event.checkCellLength[ courseIndex] = false;
    return event;
  }

  controlsPerRow = columnLength - event.courses[ courseIndex].resultHeaders.length;
  rowsForControls = Math.ceil(( parseInt( event.courses[ courseIndex].controls, 10) + 1) / controlsPerRow);  // need an extra cell for last control to finish
  rowsForRunner = rowsForControls * 2;
  //alert( 'course ' + event.courses[ courseIndex].name + ': columns ==> ' + columnLength + ', rowsForControls ==> ' + rowsForControls + ', rowsForRunners ==> ' + rowsForRunner);

  controlCodes = [];
  controlCodePattern = /\(\d+/;

  for ( i = 0; i < rowsForControls; i += 1) {
    rowCells = rows[ i].querySelectorAll( 'td');
    for ( j = event.courses[ courseIndex].resultHeaders.length; j < rowCells.length; j += 1) {
      thisCode = rowCells[ j].textContent;
      if ( controlCodePattern.test( thisCode)) {
        thisCode = controlCodePattern.exec( thisCode);
        thisCode = thisCode[ 0].replace( '(', '');
      }
      controlCodes.push( thisCode);
      if( /F/.test( thisCode)) { break;}  // no more controls after the finish
    }
    if( /F/.test( thisCode)) { break;} // and break from the outer loop
  }
  event.courses[ courseIndex].controlcodes = controlCodes;

  // now get the runners' results
  splitsIndex = 0;
  runnersIndex = 0;
  runnersRowIndex = 0;
  resultHeaders = event.courses[ courseIndex].resultHeaders;
  event.courses[ courseIndex].runners = [];

  for ( i = rowsForControls; i < rows.length; i += 1) {
    rowCells = rows[ i].querySelectorAll( 'td');
    if( rowCells.length < columnLength) { continue;}  // there are short rows used as spacers that can be ignored

    // also some rows  that indicate controls visited that weren't on the course
    // these have an attribute of style="font-style: italic;"
    rowContent = '';
    for ( j = resultHeaders.length; j < columnLength; j += 1) {
      if ( rowCells[ j].getAttribute( 'style') === 'font-style: italic;') {  // set the content to empty string
        rowCells[ j].textContent = '';
      }
      if ( /\-+/.test( rowCells[ j].textContent)) { // make unknowns ( '-----' ) zero time
        rowCells[ j].textContent = '0:00';
      }
      if ( !/\d+:\d+/.test( rowCells[ j].textContent)) { // set non-times to empty string
        rowCells[ j].textContent = '';
      }
      rowContent += rowCells[ j].textContent;
    }

    if ( rowContent.length < 1) {
      continue;
    }

    if( /\d+/.test( rowCells[ 0].textContent)) { // this should be the runners place
      // start a new runner
      runnersRowIndex = 0;
      runnersData = {};
      runnersSplits = [];
      runnersData = getRunnerData( runnersRowIndex, rowCells, resultHeaders, runnersData);
    }

    if ( runnersRowIndex === 1) {
      runnersData = getRunnerData( runnersRowIndex, rowCells, resultHeaders, runnersData);
    }

    if( runnersRowIndex % 2 !== 0) {
      // for odd rows just get the splits
      runnersSplits = getRunnerSplits( rowCells, resultHeaders.length, runnersSplits);
    }

    // increment the runner row index
    runnersRowIndex += 1;

    if ( runnersRowIndex === rowsForRunner) {
      if ( runnersSplits.length === ( parseInt( event.courses[ courseIndex].controls, 10) + 1)) {
        runnersData.splits = runnersSplits;  // add the splits to the runner

        // add the ageclass to the course if not there already
        if ( event.courses[ courseIndex].ageclasses.indexOf( runnersData.ageclass) < 0) {
          // add the ageclass to the course
          event.courses[ courseIndex].ageclasses.push( runnersData.ageclass);
        }
        event.courses[ courseIndex].runners.push( runnersData); // add the runner to the course
      }
      runnersRowIndex = 0;  // reset the runner row index
      runnersData = {};     // and the data and splits
      runnersSplits = [];
    }
    else if ( runnersRowIndex > rowsForRunner) {
      continue;
    }
  }

  return event;
}

function getResults( event) {
  // now go through the page and grab the runner sin each course by ageclass
  //   so we get:
  //    ageClass[ i] = [ runner[ 0], runner[ 1], ... runner[ max]],
  //     runner[ i]   = { name: 'name', 'time', splits: []}
  //       splits       = [ split[ 0], split[ 1], ... split[ F]]

  // how the page is organised:
  //  there are groups of three tables for each course:
  //    1. table with one row of course info, we've already got this but it is useful as a place marker.
  //    2. a table with one row of headers for the results, this will tell us how many headers there
  //       are since sometimes some fields are optional. Note that these are 'th' not 'td'.
  //    3. a table with the results, the first rows in this are the control numbers so the number of controls
  //       in this course is useful since we can work out how many rows we need for the headers plus the controls.
  //       we can get the width of the table from the number of cells but there is also a 'col' group that is
  //       convenient.
  //      Some of the rows here are short and must just be spacers so we need to drop them so that we can
  //      run through the runner data without hiccuping.
  //      Some results of team members don't have split times just '---' so we can ignore them too.
  //      Once we reach runners with a time not in a [hh:]mm:ss format we can stop since we can't compare
  //      non finishers.
  // method:
  //  get all relevant tables by querySelector( table[width]:not([width=""]"), the first is the reporttop which
  //  we've already looked at. so start at the second. There shoudl be three per course.
  //  check that this is a course description by it having a 'td#c00'. if not abort and report an error.
  //  do a couple of nextSibling to get the results headers table.
  //  work out how many headers there are.
  //  do a nextSibling to get the results.
  //  count the columns, either by the count of querySelectorAll( 'col') and / or count the 'td's in a row.
  //  do both and check that we get the same answer, abort if we don't with an error message.
  var tables,
       rows,
       //cells,
       courseIndex,
       //resultHeaders,
       columnLength,
       i;

  tables = document.querySelectorAll( 'table[width]:not([width=""])');

  // check that there are three times number of courses plus one
  if (( event.courses.length * 3 + 1) === tables.length) {
    event.checkCourseNumber = true;
  }
  else {
    //console.log( 'There are ' + tables.length + ' tables, and ' + event.courses.length + ' courses, there should be ' + ( event.courses.length * 3 + 1) + ' tables!.');
    event.checkCourseNumber = false;
    return event;
  }

  // preset the courseIndex
  courseIndex = -1;

  // initialise some event properties
  event.checkCellLength = [];

  // run through the tables
  for ( i = 1; i < tables.length; i += 1) {
    // check which table we are processing
    rows = tables[ i].querySelectorAll( 'tr');
    if ( rows[ 0].querySelector( 'td#c00') !== null) {
      // this is the course info header, set the index and skip
      courseIndex += 1;
    }
    else if ( rows[ 0].querySelector( 'th') !== null &&
              rows[ 0].querySelector( 'th').textContent === 'Pl') {
      // this is the results header, so count the header cells and
      // evaluate their indices
      event.courses[ courseIndex].resultHeaders = getResultHeaders( rows[ 0]);
      //alert( 'result headers for course ' + event.courses[ courseIndex].name + ': ' + JSON.stringify( event.resultHeaders[ courseIndex]));
    }
    else if ( rows[ 0].querySelector( 'td#c11') !== null) {
      // now we have the results table
      columnLength = tables[ i].querySelectorAll( 'col').length;
      event = extractResults( event, rows, courseIndex, columnLength);
    }
  }
  return event;
}

function setupNewWindow( oEvent) {
  var
    splitsVisualiserOACT = window.open( '', 'visualiserOACT', 'width=1200,height=800,menubar=no,titlebar=no,location=no'),
    head,
    scriptElement,
    cssElement;

    head = splitsVisualiserOACT.document.querySelector( 'head');

    splitsVisualiserOACT.document.title = 'OACT Event - Splits Visualiser';

  if ( !splitsVisualiserOACT.document.querySelector( 'head script')) {
    // add the scripts inline
    scriptElement = splitsVisualiserOACT.document.createElement( 'script');
    scriptElement.type = 'text/javascript';
    scriptElement.textContent = visualiseScript;
    head.appendChild( scriptElement);
  }

  if ( !splitsVisualiserOACT.document.querySelector( 'head style')) {
    // add the css inline
    cssElement = splitsVisualiserOACT.document.createElement( 'style');
    cssElement.type = 'text/css';
    cssElement.textContent = visualiseCSS;
    head.appendChild( cssElement);
  }

  // clear out the body
  splitsVisualiserOACT.document.body.innerHTML = '';

  // rewrite the body
  splitsVisualiserOACT.document.body.innerHTML = visualiseBody;
  splitsVisualiserOACT.document.getElementById( 'eventdata').setAttribute( 'value', JSON.stringify( oEvent));
  splitsVisualiserOACT.document.body.onload = function(){ loadCourses();};

}

// main routine
( function() {

  var
    oEvent,
    splitsVisualiserOACT,
    splitsButton,
    i,
    splitsStyle,
    splitsStyleText = function() {/*
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #ffffff;
  padding: 10px 20px;
  background: -moz-linear-gradient(
    top,
    #42aaff 0%,
    #003366);
  background: -webkit-gradient(
    linear, left top, left bottom,
    from(#42aaff),
    to(#003366));
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  border: 1px solid #003366;
  -moz-box-shadow:
    0px 1px 3px rgba(000,000,000,0.5),
    inset 0px 0px 1px rgba(255,255,255,0.5);
  -webkit-box-shadow:
    0px 1px 3px rgba(000,000,000,0.5),
    inset 0px 0px 1px rgba(255,255,255,0.5);
  box-shadow:
    0px 1px 3px rgba(000,000,000,0.5),
    inset 0px 0px 1px rgba(255,255,255,0.5);
  text-shadow:
    0px -1px 0px rgba(000,000,000,0.7),
    0px 1px 0px rgba(255,255,255,0.3);
  margin-bottom: 10px;
*/}.toString().slice( 15, -3);

  // only get splits from Orienteering ACT
  if ( !document.URL.match( /splits/i)) {
    return false;
  }

  //sessionStorage.removeItem( 'results');

  oEvent = getEventData();
  oEvent = getResults( oEvent);

  splitsVisualiserOACT = window.open( '', 'visualiserOACT', 'width=1200,height=800,menubar=no,titlebar=no,location=no');
  if ( splitsVisualiserOACT) {
    setupNewWindow( JSON.stringify( oEvent));
  }
  else {
    splitsButton = document.createElement( 'button');
    splitsButton.setAttribute( 'class', 'splits');
    splitsButton.setAttribute( 'style', splitsStyleText);
    splitsButton.id = 'splitsButton';
    splitsButton.textContent = 'Allow Visualiser to Popup.';
    splitsButton.onclick = function(){ setupNewWindow( JSON.stringify( oEvent)); document.body.removeChild( document.getElementById( 'splitsButton'));};
    document.body.insertBefore( splitsButton, document.body.firstChild);
    alert( 'You have popups blocked!\nPlease click the "Visualiser" button to show the splits\nand/or allow popups from *.act.orienteering.asn.au.');
  }

  return true;

}());
