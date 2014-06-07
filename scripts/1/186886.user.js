// ==UserScript==
// @name            RunKeeperPaceToSpeed
// @description     Change pace values in speed values by simple clic in RunKeeper (and vice versa).
// @author          Thibault
// @version         0.7
// @homepageURL     http://userscripts.org/scripts/show/186886
// @supportURL      http://userscripts.org/scripts/discuss/186886
// @include         *runkeeper.com/user/*/activity/*
// @run-at          document-end
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

// This script requires jQuery ;)
var $ = unsafeWindow.jQuery;
  
/*
ATTENTION
This script does *not* work on Google Chrome as a simple extension.
Please, use the *Tampermonkey* extension if you want to run it on Google Chrome.
*/

// Chose if you want a manual or automatic config
AutoConfig = 'enabled';
// enabled: a monkey head is displayed on the activity pages, use it to configure this script ;)
// disabled: you have to give manually the value to the DoubleColumSplit and DefaultDataView in the below "MANUAL CONFIG AREA" ;(

// MANUAL CONFIGURATION AREA
if ( AutoConfig == 'disabled'  ) {

  // Displayed type of data at load ('default', 'pace' or 'speed')
  DefaultDataView = 'default';
  // default: default choice by RunKeeper ('speed' for Cycling activities, 'pace' for Running and other activities)

  // Double column view in Splits Data table ('yes' or 'no')
  DoubleColumnSplit = 'no';
  // yes: The twice data will apear at the same time, in two different columns.
  // no: The data will switch between "pace" and "speed" on click on one of the clickable element (at the same time of the averageData).
  
}
// END OF MANUAL CONFIGURATION AREA

// AUTOCONFIGPANEL

// For the reloading of the entire page (in case of new config data saved)
NewConfigSaved = 0;

if ( AutoConfig == 'enabled' ) {

  // DefaultDataView defined value ("default" if undefined)
  DefaultDataView = GM_getValue("RKPTS_DefaultDataView","default");
  
  // Default DoubleColumnSplit defined value
  DoubleColumnSplit = GM_getValue("RKPTS_DoubleColumnSplit", "no");

  // This "if" section is for the case where you'd use other user.script made by me (RunKeeper MyMaps, in development)
  if ( $('.toolItem.userscript.mobileHover').length == 0 ) {
 
    // CSS of AutoConfigPanel (Style)
    ConfigStyle = '<style type="text/css">'
                // MonkeyHead Menu Title
                + '#homeNavContainer .navButtons .toolbar .toolItem.userscript {'
                + '  background-image:url(\'http://img827.imageshack.us/img827/1751/9w1.png\');'
                + '}'
                + '#homeNavContainer .navButtons .toolbar .toolItem.userscript:active {'
                + '  background-color:#1596D2;'
                + '}'
                // ConfigPanel
                + '#fuzzydiv {'
                + '  position:fixed;'
                + '  width: 100%;'
                + '  height: 100%;'
                + '  z-index: 2000;'
                + '  background-color: #DDDDDD;'
                + '  overflow:auto;'
                + '}'
                + '.configpanel#pacetospeed {'
                + '  width: 800px;'
                + '  margin: auto;'
                + '  margin-top: 50px;'
                + '  margin-bottom: 50px;'
                + '  position: relative fixed;'
                + '  background-color: #ffffff;'
                + '  border: 1px solid #dddddd;'
                + '}'
                + '#pts_config_area {'
                + '  width: 800px;'
                + '  height: 400px;'
                + '}'
                // Clickable elements when mouse over
                + '.ClickableDiv:hover {'
                + 'cursor:pointer;'
                + 'background-color:#daf3ff;'
                + '-webkit-border-radius:5px;'
                + '-moz-border-radius:5px;'
                + 'border-radius:5px;'
                + '}'
                + '</style>'
                   
    $('head').append(ConfigStyle);
    
    // HTML elements of AutoConfigPanel
    ConfigNav = '<div class="toolItem userscript mobileHover">'
              + '  <ul class="subNav">'
              + '  </ul>'
              + '</div>'
              
    $(ConfigNav).insertAfter($(".toolItem.search.mobileHover"));
  }
  
  ConfigLink = '    <li><div class="subNavItem"><span>PaceToSpeed</span></div></li>'
              
  $('.toolItem.userscript.mobileHover .subNav').append(ConfigLink);
  
  DisplayConfigPanel = (function() {
  
    $('#fuzzydiv').remove();
    
    ConfigPanel = '<div id="fuzzydiv">'
                + ' <div class="configpanel" id="pacetospeed">'
                + '  <div id="pts_config_area">'
                + '    <h2 class="pageHeader">User.Script - PaceToSpeed Configuration</h2>'
                + '    <div class="mainColumnPadding">'
                + '      <form action="" class="form-horizontal">'
                + '        <div class="control-group" id="settingsPaceToSpeed_DefaultDataView">'
                + '          <label class="control-label" for="pacetospeed">DefaultDataView:</label>'
                + '            <div class="controls">'
                + '              <div class="selector" id="uniform-pacetospeed" style="">'
                + '                <span style="text-transform: capitalize;">'+DefaultDataView+'</span>'
                + '                <select id="DefaultDataView" name="DefaultDataView" style="opacity: 0; width: 73px;">'
                + '                  <option value="default">Default</option>'
                + '                  <option value="pace">Pace</option>'
                + '                  <option value="speed">Speed</option>'
                + '                </select>'
                + '              </div>'
                + '              <span class="help-inline">Default: let RunKeeper choose (speed for cycling activities, pace for the other activities)</span>'
                + '            </div>'
                + '          </div>'
                + '        <div class="control-group" id="settingsDoubleColumnSplit">'
                + '          <label class="control-label" for="pacetospeed">DoubleColumnSplit:</label>'
                + '          <div class="controls">'
                + '            <div class="selector" id="uniform-pacetospeed" style="">'
                + '              <span style="text-transform: capitalize;">'+DoubleColumnSplit+'</span>'
                + '              <select id="DoubleColumnSplit" name="DoubleColumnSplit" style="opacity: 0; width: 73px;">'
                + '                <option value="yes">Yes</option>'
                + '                <option value="no">No</option>'
                + '              </select>'
                + '            </div>'
                + '            <span class="help-inline">If yes, displays the twice pace and speed data at the same time in the splits table.</span>'
                + '          </div>'
                + '        </div>'
                + '      </form>'
                + '    </div>'
                + '  </div>'
                + '  <div id="mapControls" style="bottom: 0px;">'
                + '    <button style="margin-top:7px; margin-left:10px;" class="component ctaButton mini secondary" type="button">'
                + '      <div class="buttonText">Save</div>'
                + '    </button>'
                + '    <button style="margin-top:7px; margin-left:10px;" class="component ctaButton mini secondary" type="button">'
                + '      <div class="buttonText">Cancel</div>'
                + '    </button>'
                + '  </div>'
                + ' </div>'
                + '</div>';
                
    $('body').prepend(ConfigPanel);
    
    $('div#fuzzydiv select#DefaultDataView option[value="'+DefaultDataView+'"]').attr('selected','selected');
    $('div#fuzzydiv select#DoubleColumnSplit option[value="'+DoubleColumnSplit+'"]').attr('selected','selected');
    
    $('select').change(function() {
      $(this).parent().children('span').html($(this).children(":selected").html());
    });
    
    $('body').css({
      'overflow':'hidden',
    });
    
  });

  SaveConfig = (function() {
  
    NewDefaultDataView = $('select#DefaultDataView').parent().children('span').html().toLowerCase();
    NewDoubleColumnSplit = $('select#DoubleColumnSplit').parent().children('span').html().toLowerCase();
    
    // NE FONCTIONNE PAS (LES GM_getValue SONT UNDEFINED)
    if ( NewDefaultDataView != DefaultDataView || NewDoubleColumnSplit != DoubleColumnSplit ) {
      // setTimeout is usefull because of a Firefox GreaseMonkey problem with jQuery "click"
      setTimeout(function() {
        GM_setValue("RKPTS_DefaultDataView", NewDefaultDataView);
        GM_setValue("RKPTS_DoubleColumnSplit", NewDoubleColumnSplit);
      },0);
      // We will reload the activity page when the page will be closed
      NewConfigSaved = 1;
    }
    
    ConfigSaved = '<div class="configpanel" id="pacetospeed">'
                + ' <div id="pts_config_area">'
                + '   <h2 class="pageHeader">User.Script - PaceToSpeed Configuration Saved!</h2>'
                + '   <div class="mainColumnPadding">'
                + '         <p>Configuration saved!</p>'
                + '   </div>'
                + ' </div>'
                + ' <div id="mapControls" style="bottom: 0px;">'
                + '   <button style="margin-top:7px; margin-left:10px;" class="component ctaButton mini secondary" type="button">'
                + '     <div class="buttonText">Close</div>'
                + '   </button>'
                + '   <button style="margin-top:7px; margin-left:10px;" class="component ctaButton mini secondary" type="button">'
                + '     <div class="buttonText">Back to config</div>'
                + '   </button>'
                + ' </div>'
                + '</div>';
                
    $('.configpanel#pacetospeed').replaceWith(ConfigSaved);
    
    $('body').css({
      'overflow':'hidden',
    });
  
  });
  
  CloseConfigPanel = (function() {
    $('#fuzzydiv').remove();
    $('body').css({
      'overflow':'auto',
    });
    if ( NewConfigSaved == 1 ) {
      document.location.reload(true);
    }
  });
  
  // ConfigPanel opening
  $(document).on('click','li:contains("PaceToSpeed"),button:contains("Back to config")', DisplayConfigPanel);
  // Saving config
  $(document).on('click', 'button:contains("Save")', SaveConfig);
  // Click on buttons in the panel
  $(document).on('click', 'button:contains("Cancel"),button:contains("Close")', CloseConfigPanel);
}
// END OF AUTOCONFIGPANEL
    
// ErrorMessage, in case of bug ('bzzz')
ErrorMessage = "It seems the RunKeeper PaceToSpeed script doesn't correctly work. Please contact the developper to solve the problem, giving him the 'code error'. Thank you so much.";

// Clickable elements to run the script (always displayed)
ClickableDiv1 = '[id=averagePace], [id=averageSpeed]'; // Sorry for the "[id=...]" written but RunKeeper's developpers have no problem with #id sharing between elements...

// Clickable elements to run the script (only if DoubleColumnSplit is disabled)
ClickableDiv2 = '.labelHeader:contains("pace"), .labelHeader:contains("speed")';

// ClickableDiv composing
if ( DoubleColumnSplit == 'yes' ) { ClickableDiv = ClickableDiv1; }
else { ClickableDiv = ClickableDiv1+', '+ClickableDiv2; }
if ( DoubleColumnSplit != "yes" && DoubleColumnSplit != "no" ) { console.warn("CodeError: DoubleColumnSplit"); }

// Speed unit definition (Is the distance unit km or no matter whatever?)
DistanceUnit = $('#totalDistance').children('h5').text();
if ( DistanceUnit == "mi" ) { SpeedUnit = "mph"; } // Thank you Captain America!
else { SpeedUnit = "km/h"; } // International Units System (DistanceUnit == km)
if ( DistanceUnit != "km" && DistanceUnit != "mi" ) { console.warn("CodeError: DistanceUnit)"); }

// PaceData to SpeedData conversion function
ConvertPaceToSpeed = (function(PaceData) {
  PaceParts = PaceData.split( ':' );
  if ( PaceParts.length == 2 ) {
    MinData = parseInt( PaceParts.slice( 0, 1 ).join('') );
    SecData = parseInt( PaceParts.slice( 1, 2 ).join('') );
    SpeedData = Math.round( 6000 / ( MinData + SecData / 60 ) ) / 100;
    // Display numbers at the format AB.CD (and not AB.C if D = 0 or AB if C = 0 and D = 0) 
    if ( SpeedData % 1 == 0 ) { SpeedData = SpeedData+".00"; }
    else if ( ( SpeedData * 10 ) % 1 == 0 ) { SpeedData = SpeedData+"0"; }
  }
  return SpeedData;
});
    
// SpeedData to PaceData conversion function
ConvertSpeedToPace = (function(SpeedData) {
  DecPace = ( 1 / SpeedData ) * 60;
  MinData = parseInt( DecPace );
    if ( MinData == 0 ) { MinData = "0"; }
  SecData = Math.round( (DecPace - MinData) * 60);
    if ( SecData < 10 && SecData > 0 ) { SecData = "0"+SecData; }
    else if ( SecData == 0 ) { SecData = "00"; }
  PaceData = MinData+':'+SecData;
  return PaceData;
});
    
// PaceView to SpeedView change function
DisplayPaceToSpeed = (function() {
  // Convert #averagePace div in #averageSpeed div
  $('[id=averagePace]').children('h5').html('Average Speed ('+SpeedUnit+')');
  // Change Avarage Pace value by Avarage Speed value
  $('[id=averagePace]').children('h1').children('.value').html(AverageSpeedData);
  // Change Pace Splits Table Data by Speed Splits Table Data (only in "one by one data column" mode)
  if ( DoubleColumnSplit == 'no' ) {
    $(".labelHeader:contains('pace')").html('speed'); // Title of the data column
    if ( $('.span4.pace.micro-text').length > 1 ) { // Convert pace data in speed data
      $('.span4.pace.micro-text').each(function( index ) {
        $(this).html(SplitSpeedData[index]);
        $(this).removeClass('pace').addClass('speed');
      });
    }
  }
  $('[id=averagePace]').attr('Id', 'averageSpeed');
  DataType = 'speed'; // For the next time click ("switch effect")
});
    
// SpeedView to PaceView change function
DisplaySpeedToPace = (function() {
  // Convert #averageSpeed div in #averagePace div
  $('[id=averageSpeed]').children('h5').html('Average Pace');
  // Convert Avarage Speed value in Avarage Pace value
  $('[id=averageSpeed]').children('h1').children('.value').html(AveragePaceData);
  // Change Speed Splits Table by Pace Splits Table Data (only in "one by one data column" mode)
  if ( DoubleColumnSplit == 'no' ) {
    $(".labelHeader:contains('speed')").html('pace'); // Title of the data column
    if ( $('.span4.speed.micro-text').length > 1 ) { // Convert pace data in speed data
      $('.span4.speed.micro-text').each(function( index ){
        $(this).html(SplitPaceData[index]);
        $(this).removeClass('speed').addClass('pace');
      });
    }
  }
  $('[id=averageSpeed]').attr('Id', 'averagePace');
  DataType = 'pace'; // For the next time click ("switch effect")
});

// Original data type (pace or speed?)
if ( $('#averagePace').length > 0 && $('#averageSpeed').length == 0 ) { OriginalDataType = 'pace'; }
else if ( $('#averageSpeed').length > 0 && $('#averagePace').length == 0 ) { OriginalDataType = 'speed'; }
else { console.error("CodeError: OriginalDataType)"); }

DataType = OriginalDataType; // This value change after clicking on the Clickable element ("switch effect" : pace > speed > pace ...)

if ( OriginalDataType == 'pace' ) {
  // Average Pace +> Average Speed
  AveragePaceData = $('.statsBar #averagePace .value').text();
  AverageSpeedData = ConvertPaceToSpeed(AveragePaceData);
}

if ( OriginalDataType == 'speed' ) {
  // Average Speed +> Average Pace
  AverageSpeedData = $('.statsBar #averageSpeed .value').text();
  AveragePaceData = ConvertSpeedToPace(AverageSpeedData);
}

// Function to launch when the page is ready
WeAreReady = (function() {
  // Data type displayed on first load
  if ( DefaultDataView == 'speed' && OriginalDataType == 'pace' ) { DisplayPaceToSpeed(); }
  else if ( DefaultDataView == 'pace' && OriginalDataType == 'speed' ) { DisplaySpeedToPace(); }
    
  // If we click on one of the ClickableDiv
  $(ClickableDiv).click(function () {
    // CASE 1. PACE -> SPEED
    if ( DataType == 'pace' ) { DisplayPaceToSpeed(); }
    // CASE 2. SPEED -> PACE
    else if ( DataType == 'speed' ) { DisplaySpeedToPace(); }
  });

  // Clickable elements style when mouse over
  $(ClickableDiv).addClass('ClickableDiv');
});

// Is the activity a GPS recorded activity? (Splits data)
// GPS recorded
if ( $('#splitsBox').length > 0 ) {
  // This timer is because the Splits table is loaded by a JavaScript script (after the "document-end"), so we have to wait for it! ;)
  var timer = setInterval( function() {
    if ( $('#distanceSplits .pace').length > 1 || $('#distanceSplits .speed').length > 1 ) {
      clearInterval( timer );
      
      // Splits Table Data
      SplitPaceData = new Array();
      SplitSpeedData = new Array();
      
      if ( OriginalDataType == 'pace' ) {
        // Pace Split values +> Speed Split values
        if ( DoubleColumnSplit == 'yes' ) {
          $('<div class="span4 labelHeader">speed</div>').insertAfter($(".labelHeader:contains('pace')"));
        }
        $('.span4.pace.micro-text').each(function( index ){
          SplitPaceData[index] = $(this).text();
          SplitSpeedData[index] = ConvertPaceToSpeed(SplitPaceData[index]);
          if ( DoubleColumnSplit == 'yes' ) {
            $('<div class="span4 speed micro-text">'+SplitSpeedData[index]+'</div>').insertAfter($(this));
          }
        });
      }
      else if ( OriginalDataType == 'speed' ) {
        // Speed Split values +> Pace Split values
        if ( DoubleColumnSplit == 'yes' ) {
          $('<div class="span4 labelHeader">pace</div>').insertAfter($(".labelHeader:contains('speed')"));
        }
        $('.span4.speed.micro-text').each(function( index ){
          SplitSpeedData[index] = $(this).text();
          SplitPaceData[index] = ConvertSpeedToPace(SplitSpeedData[index]);
          if ( DoubleColumnSplit == 'yes' ) {
            $('<div class="span4 pace micro-text">'+SplitPaceData[index]+'</div>').insertAfter($(this));
          }
        });
      }
      
      // Double data splits table : columns' width equal
      if ( DoubleColumnSplit == 'yes' ) {
        $('.span4').css({
          'width':'25%',
          'padding-left':'0',
          'margin-left':'0',
          'text-align':'center'
        });
      }
      
      WeAreReady();
      
    }
  },1000);
}
// Manual entry activity
else { WeAreReady(); }