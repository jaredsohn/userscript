// ==UserScript==
// @name         G-Time
// @version      1.52
// @description  simulates a live server clock and other extras
// @include      http://playstarfleet.com/*
// @include      http://starfleet-fb-vip1.bluefrogsrv.com/*
// @include      http://playstarfleetextreme.com/*
// @include      http://starfleet-fb-e-vip2.bluefrogsrv.com/*
// @include      http://uni2.playstarfleet.com/*
// @include      http://starfleet-fb-uni2-vip1.bluefrogsrv.com/*
// @include      http://uni2.playstarfleetextreme.com/*
// @include      http://uni3.playstarfleet.com/*
// @include      http://starfleet-fb-e-vip2.bluefrogsrv.com/*
// @include      http://fb.stardriftempires.com/*
// @include      http://stardriftempires.com/*
// @include      http://nova.playstarfleet.com/*
// @include      http://apps.facebook.com/sfc_nova/*
// @include      http://conquest.playstarfleet.com/*
// ==/UserScript==
// ----------------------------------------------------------------------------
// Written by Sandor Clegane
//
// This script is provided as-is.  If it is useful to you, great.  It was my
// intention to write this script as clearly as possible and document it
// thoroughly, allowing the community to extend and maintain this script at
// large to suit a wider audience.
//
// Special thanks goes to FatBuddah (SFCO) for all of his help and consultation, and
// Kronin of Snipe (SFC Nova) for maintaining it while I was on hiatus
//
// Changelog
// ---------
// 04/07/2014 - v1.52
//            - fixed bug with time on Heph deploy popup
// 04/02/2014 - v1.51
//            - updated to work with Uni3
// 09/23/2013 - v1.50
//            - Code cleanup
// 04/22/2013 - v1.47
//            - Updated to work with Conquest.  Note, this version will NOT be maintained
// 04/22/2013 - v1.46
//            - adjusted size of time display in top bar to work with Firefox
// 04/03/2013 - v1.45
//            - fixed broken return times on fleet popups for encounters (NPCs)
// 09/27/2012 - v1.44
//            - Changed styling of top 2 clocks. When the Quests system was rolled out,
//              the clock image kept getting resized
// 08/28/2012 - v1.43
//            - added "Return:" field to assemble fleet dialog and pop-up
// 08/21/2012 - v1.42
//            - updated to support new user interface that was rolled out on 8/21/2012
//              by Kronin (Snipe in Nova)
// 03/25/2012 - v1.41
//            - added support for Starfleet Commander Nova
// 11/04/2001 - v1.40
//            - modified script to use the live game time supplied by BFG
//            - general code cleanup
// 11/01/2001 - v1.35
//            - fixed page load time after BFG HTML change
//            - fixed main panel times to remain persistent when tasks complete
// 10/01/2011 - v1.34
//            - bug fixed with heph deploy popup
// 09/23/2011 - v1.33
//            - Adjusted script to accomodate new BFG overview format
// 09/07/2011 - v1.32
//            - Added heph recall timer
//            - Added ETA to heph deployment pop-up
// 09/04/2011 - v1.31
//            - Arrival times now show up on the "assemble fleet" pop-up
//              from the galaxy page
// 08/30/2011 - v1.30
//            - added support for Star Drift Empires
//            - added support for Facebook launch
//            - added ability to enable/disable display of individual times on
//              fleet screen
// 08/08/2011 - v1.21
//            - fixed bug on oracle scan page
// 08/07/2011 - v1.20
//            - added local ETA time to all pages with arrival countdowns
//            - restored 'logout' link
//            - renamed 'G-Time' field to "Game:"
//            - standardized time color scheme: orange is game time,
//              yellow is local time
// 08/01/2011 - v1.19
//              added live local time below live game time.  local time is in
//              yellow
// 07/29/2011 - v1.18
//              another fix to try and play nice with Mentat
// 07/28/2011 - now compatible with Mentat script.  The mentat native time
//              code has been removed, allowing GTime to work in conjunction
//              Future update will incorporate GTime in Mentat
//            - add local date to arrival times on the "Assemble fleet"
//              section of the Fleets page as well as to the Fleets page,
//              Home page and Heph page, if the arrival time is not the same
//              day as today
//            - added local time ETA to "Home" page (not all planets)
//              NOTE: if the page updates because of a fleet arrival, the
//                    ETA will disappear.  Click home again to get it back
// 07/27/2011 - Local time ETA color is now yellow, game time ETA is white
//            - Heph screen now shows local as well as game time ETA
//            - Harvest and Transport missions on the "Assemble Fleet"
//              section will now show return ETA and not just ETA
//              at first leg
//            - fixed NaN problem with times > 100 hours
// 07/26/2011 - v1.10
//              restricted local time ETA to fleet page only.  Was causing
//              other pages to look bad
//            - add local time ETA to fleets
//            - added a more cross-browser friendly way to dynamically load
//              jQuery
//                Thanks again goes to FatBuddha
//            - added support for Chrome
//                Thanks to FatBuddha (SFC Orig) for fixing my botched
//                attempt at a Chrome port!
// 07/25/2011 - replaced "logout" link with time of last refresh
//            - initial release
//
// ----------------------------------------------------------------------------

function user_func()
{
  // need to bookkeep relative deltas for accurate timekeeping
  var t_heph = new Date();
  var t_gam = new Date();
  var t_serv = new Date();
  var fleet_dialog_visible = false;
  var heph_dialog_visible = false;

  // make sure only one instance of G-Time is running and that Eljer's
  // TimeLive script is not running (conflicts with G-Time)
  if(window["gtime_installed"]
     || window["timelive_installed"])
  {
    if (window["timelive_installed"])
    {
      alert("G-Time is not compatible with Eljer's TimeLive script")
    }

    return;
  }

  window["gtime_installed"] = true;

  function process($)
  {
    function setCallback()
    {
      this.updateCallback =
        function()
        {
          updateDisplay();
        };

        // set our recurring function call
        setInterval(function(thisScope) {thisScope.updateCallback();},
                    500, // 1/2 second
                    this);
    }

    // ------------------------------------------------------------------------

    function updateDisplay()
    {
      // update game time
      t_serv = $('#system_time_value').html();

      if (t_serv != null)
      {
        t_gam = new Date();
        var substr = t_serv.split(':');
        t_gam.setUTCHours(substr[0]);
        t_gam.setUTCMinutes(substr[1]);
        t_gam.setUTCSeconds(substr[2]);
      }

      // update game and local time on the main panel
      processGameTime();

      // process heph deploy pop-up
      processHephDeployPopup();

      // process heph recall timer
      if (path == "/roaming_planet_move/moving")
      {
        processHephRecall();
      }

      // update fleet arrival times, if applicable
      updateFleetArrival();

      if (path == "/overview")
      {
        processOverview();
      }
    }

    // ------------------------------------------------------------------------

    function fixTime(i)
    {
      if (i < 10)
      {
        i = '0' + i;
      }

      return i;
    }

    // ------------------------------------------------------------------------

    function time2ms(t_in)
    {
      // parse time into hh/mm/ss
      var t_dur = t_in.split(':');

      // convert time format to milliseconds
      return t_dur[0] * 3600000 + t_dur[1] * 60000 + t_dur[2] * 1000;
    }

    // ------------------------------------------------------------------------

    function processGameTime()
    {
      // make sure we only do this when necessary
      if ($('.local_time_table').html() == null)
      {
        // setup system time display for our display purposes
      var t_sys = $('.topbar .system_time');
      $('.system_time_table').css({'margin-top': '-9px'});
      $('#system_time_value').css({'color': 'orange'});
      $('#system_time_value').css({'font-size': '85%'});

        // set up local time display
        var l_time = '<div class="local_time_table">'
                   + '<div class="time">'
                      + '<div id="local_time_value" class="amount" style="color: yellow;font-size:85%"></div>'
                   + '</div>'
                   + '</div>'

       $('.system_time_table').after(l_time);
      }

      $('#system_time_value').html(
                                       fixTime(t_gam.getUTCHours()) + ':'
                                       + fixTime(t_gam.getUTCMinutes()) + ':'
                                       + fixTime(t_gam.getUTCSeconds()));
      $('#local_time_value').html(
                                         fixTime(t_gam.getHours()) + ':'
                                         + fixTime(t_gam.getMinutes()) + ':'
                                         + fixTime(t_gam.getSeconds()));

      // retrieve local storage for checkbox states
      var game_on_state = localStorage.getItem('gtime_game_on');
      var local_on_state = localStorage.getItem('gtime_local_on');

      // display or hide time elements based on initial checkbox states
      $('.gameTimeNormal').css('display',
                               game_on_state === 'on' ? 'inline'
                                                             : 'none');
      // display or hide time elements based on initial checkbox states
      $('.localTimeNormal').css('display',
                                local_on_state === 'on' ? 'inline'
                                                             : 'none');
    }

    // ------------------------------------------------------------------------

    function processFleets()
    {
      var update = function()
                   {
                     var t_count = $(this).find('.countdown');

                     if (t_count.html() != null)
                     {
                       processFleetArrival(t_count);
                     }

                     processFleetRecall($(this))
                   };

      $('.task_timer').each(update);
    }

    // -------------------------------------------------------------

   function processFleetArrival(item)
   {
     var t_eta = new Date(t_gam.getTime()
                                    + time2ms(item.html()));

     var eta_str  = '<span class="gameTimeNormal \
                                  fleet_eta_game"><br/>'
                  + fixTime(t_eta.getUTCHours()) + ':'
                  + fixTime(t_eta.getUTCMinutes()) + ':'
                  + fixTime(t_eta.getUTCSeconds())
                  + '</span>';

     var eta_str2 = '<span class="localTimeNormal \
                                  fleet_eta_local"><br/>'
                  + fixTime(t_eta.getHours()) + ':'
                  + fixTime(t_eta.getMinutes())+ ':'
                  + fixTime(t_eta.getSeconds());

     if (t_gam.getDate() != t_eta.getDate())
     {
       eta_str2 += ' '
                 + fixTime(t_eta.getMonth() + 1) + '/'
                 + fixTime(t_eta.getDate());
     }

     eta_str2 += '</span>';

     // Add game time and local time ETA to all countdowns
     item.after(eta_str + eta_str2);
   }

   // -------------------------------------------------------------------------

   function processFleetRecall(item)
   {}

   // -------------------------------------------------------------------------

    function processOverview()
    {
      var update = function()
                   {
                     var t_count = $(this).find('.countdown');

                     if (t_count.html() == null)
                     {
                       return;
                     }

                     // modify existing CSS to accommodate new data
                     var timer = $(this).find('.js_timer');

                     if ($(this).find('#game_time').html() != null)
                     {
                       return;
                     }

                     timer.css({'height' : '1.2em',
                                'padding-right' : '2px',
                                'text-align' : 'left'});

                    // create new ETA date object
                    var t_eta = new Date(t_gam.getTime() +
                                                      time2ms(t_count.html()));

                    var eta_string1 = ' <span style="color: orange;">'
                                    + fixTime(t_eta.getUTCHours()) + ':'
                                    + fixTime(t_eta.getUTCMinutes()) + ':'
                                    + fixTime(t_eta.getUTCSeconds())
                                    + '</span>';

                    var eta_string2 = "";

                     // add local date if the arrival is not the same day
                     if (t_gam.getDate() != t_eta.getDate())
                     {
                       eta_string2 += ' <span style="color: #FFFF00;">'
                                    + fixTime(t_eta.getMonth() + 1) + '/'
                                    + fixTime(t_eta.getDate())
                                    + '</span>';
                     }

                     eta_string2 += ' <span style="color: #FFFF00;">'
                                  + fixTime(t_eta.getHours()) + ':'
                                  + fixTime(t_eta.getMinutes()) + ':'
                                  + fixTime(t_eta.getSeconds())
                                  + '</span>';

                     // Add game time and local time ETA to all countdowns
                     var bar_text = timer.find('.bar .timer_text');
                     var time_info = '<div id="game_time"\
                                       style="position:absolute;\
                                                top:1px;\
                                                right:1px;\
                                              line-height:1em;\
                                              z-index:2;\
                                              font-size: .9em">'
                                   + eta_string1
                                   + '</div>'
                                   + '<div id="local_time"\
                                       style="position:absolute;\
                                         bottom:0px;\
                                         right:1px;\
                                       line-height:1em;\
                                       z-index:2;\
                                       font-size: .9em">'
                                   + eta_string2
                                   + '</div>';

                     bar_text.css({'padding-top' : '.1em',
                                   'padding-left' : '.3em'});
                     bar_text.after(time_info);
                  };

      $('.task_timer').each(update);
    }

    // ------------------------------------------------------------------------

    function processHephDeployPopup()
    {
      var dialog = $('.roaming_planet_ #confirm_popup');

      if(dialog.length==0)
      {
        heph_dialog_visible = false;
      }
      else if (!heph_dialog_visible)
      {
        // adds "Arrival:" field
        heph_dialog_visible = true;


        $('.content').after('<div class="arrival">\
                               <span class="label">Arrival:</span>\
                               <span class="gameTimeNormal">\
                                 <span class="heph_arrival_game"></span>\
                               </span>\
                               <span class ="localTimeNormal">\
                                 <span class="heph_arrival_local"></span>\
                               </span><br/>\
                             </div><br/>');
      }

      if ($('#rap_time').html() != null)
      {
        var t_dur = time2ms($('#rap_time').html());
        var t_eta = new Date(t_gam.getTime() + t_dur);
        var eta_str = fixTime(t_eta.getUTCHours()) + ':'
                    + fixTime(t_eta.getUTCMinutes()) +':'
                    + fixTime(t_eta.getUTCSeconds());

        var eta_str2 = fixTime(t_eta.getHours()) +':'
                    + fixTime(t_eta.getMinutes()) +':'
                    + fixTime(t_eta.getSeconds());

        // add local date if return time is not today
        if (t_gam.getDate() != t_eta.getDate())
        {
          eta_str2 += ' '
                   + fixTime(t_eta.getMonth() + 1) + '/'
                   + fixTime(t_eta.getDate());
        }

        // Add game and local time arrival info
        $('.heph_arrival_game').html(eta_str);
        $('.heph_arrival_local').html(eta_str2);
      }
    }

    // ------------------------------------------------------------------------

    function processHephRecall()
    {
      if(/Returning to orbit:/.test($('.task_timer').html()))
      {
        $('.heph_recall_game').html('-');
        $('.heph_recall_local').html('-');
      }
      else
      {
        var journey_time = t_gam.getTime() - t_heph.getTime();
        var t_ret = new Date(t_gam.getTime() + journey_time);

        var eta_str = fixTime(t_ret.getUTCHours()) + ':'
                          + fixTime(t_ret.getUTCMinutes()) +':'
                          + fixTime(t_ret.getUTCSeconds());

        var eta_str2 = fixTime(t_ret.getHours()) +':'
                           + fixTime(t_ret.getMinutes()) +':'
                           + fixTime(t_ret.getSeconds());

        // add local date if return time is not today
        if (t_gam.getDate() != t_ret.getDate())
        {
          eta_str2 += ' '
                    + fixTime(t_ret.getMonth() + 1) + '/'
                    + fixTime(t_ret.getDate());
        }

        $('.heph_recall_game').html(eta_str);
        $('.heph_recall_local').html(eta_str2);
      }
    }

    // ------------------------------------------------------------------------

    function processOptions()
    {
      $('#flash_messages').after('<div id="g_time_option" class="table_container">\
            <table class="option">\
              <tbody>\
                <tr>\
                  <td class="name"><h3>G-Time</h3></td>\
                  <td class="form">Game: <input type="checkbox" id="game_on"/><br/>\
                                   Local: <input type="checkbox" id="local_on"/><br/></td>\
                  <td class="info"><div class="icon"></div><div class="description">Allows you to toggle display of Game Time and Local Time, using the G-Time extension</div></td>\
                </tr>\
              </tbody>\
            </table></div>');

      // retrieve local storage for checkbox states
      var game_on_state = localStorage.getItem('gtime_game_on');
      var local_on_state = localStorage.getItem('gtime_local_on');

      // set checkbox status based on local storage
      $('#game_on').attr('checked',
      game_on_state === 'on' ? true : false);

      $('#local_on').attr('checked',
      local_on_state === 'on' ? true : false);

      // check box event handlers
      $('#game_on').click(function() {
      $('.gameTimeNormal').toggle(this.checked);
      localStorage.setItem('gtime_game_on',
                this.checked ? 'on' : 'off');
      });

      $('#local_on').click(function() {
      $('.localTimeNormal').toggle(this.checked);
      localStorage.setItem('gtime_local_on',
                this.checked ? 'on' : 'off');
      });
    }

    // -------------------------------------------------------------------------

    function updateFleetArrival()
    {
      var dialog = $("#assign_fleet:visible");

      if(dialog.length==0)
      {
        fleet_dialog_visible = false;
      }
      else if (!fleet_dialog_visible)
      {
        fleet_dialog_visible = true;

        // adds "Arrival:" field
        $('.duration').after('<div class="fleet_arrival">\
                              <span class="label">Arrival:</span>\
                                <span class="gameTimeNormal">\
                                  <span class="fleet_arrival_game"></span>\
                                </span>\
                                <span class ="localTimeNormal">\
                                  <span class="fleet_arrival_local"></span>\
                                </span>\
                              <br/>\
                            </div>');

        // adds "Return:" field
        $('.fleet_arrival').after('<div class="fleet_return">\
                                   <span class="label">Return:</span>\
                                     <span class="gameTimeNormal">\
                                       <span class="fleet_return_game"></span>\
                                     </span>\
                                   <span class ="localTimeNormal">\
                                     <span class="fleet_return_local"></span>\
                                   </span>\
                                  <br/>\
                                 </div>');
      }

      //var fleet_arrival = $('.select_fleet .duration .value #task_duration');
      var fleet_arrival = $('.select_fleet .normal .duration .value');

      if (fleet_arrival.html() == null)
      {
        return;
      }

      if(/-/.test(fleet_arrival.html()))
      {
        $('.fleet_arrival_game').html('-');
        $('.fleet_arrival_local').html('-');
        $('.fleet_return_game').html('-');
        $('.fleet_return_local').html('-');
      }
      else
      {
        var mission = getMissionType();

        var t_arr_ms = time2ms($('.select_fleet #task_duration').html());
        var t_ret_ms = 0;

        // for some missions, double the time to compute the return ETA
        switch(mission)
        {
        case "Harvest":
        case "Espionage":
        case "Transport":
        case "Colonize":
        case "Attack":
        case "Trade":
          t_ret_ms = t_arr_ms * 2;
          break;
        case "Warp":
        case "Deploy":
        case "Defend": // for now ignore this.
        default:
          break;
        };

        // create new arrival date object
        var t_arr_eta = new Date(t_gam.getTime() + t_arr_ms);
        var t_ret_eta = new Date(t_gam.getTime() + t_ret_ms);

        // arrival time
        var eta_arr_str = fixTime(t_arr_eta.getUTCHours()) + ':'
                        + fixTime(t_arr_eta.getUTCMinutes()) +':'
                        + fixTime(t_arr_eta.getUTCSeconds());

        var eta_arr_str2 = fixTime(t_arr_eta.getHours()) +':'
                         + fixTime(t_arr_eta.getMinutes()) +':'
                         + fixTime(t_arr_eta.getSeconds());

        // add local date if arrival time is not today
        if (t_gam.getDate() != t_arr_eta.getDate())
        {
          eta_arr_str2 += ' '
                       + fixTime(t_arr_eta.getMonth() + 1) + '/'
                       + fixTime(t_arr_eta.getDate());
        }

        // return time
        var eta_ret_str;
        var eta_ret_str2;

        if (t_ret_ms == 0)
        {
          eta_ret_str  = '-';
          eta_ret_str2 = '-';
        }
        else
        {
          eta_ret_str = fixTime(t_ret_eta.getUTCHours()) + ':'
                      + fixTime(t_ret_eta.getUTCMinutes()) +':'
                      + fixTime(t_ret_eta.getUTCSeconds());

          eta_ret_str2 = fixTime(t_ret_eta.getHours()) +':'
                       + fixTime(t_ret_eta.getMinutes()) +':'
                       + fixTime(t_ret_eta.getSeconds());

          // add local date if return time is not today
          if (t_gam.getDate() != t_ret_eta.getDate())
          {
            eta_ret_str2 += ' '
                         + fixTime(t_ret_eta.getMonth() + 1) + '/'
                         + fixTime(t_ret_eta.getDate());
          }
        }

        // Add game and local time arrival/return info
        $('.fleet_arrival_game').html(eta_arr_str);
        $('.fleet_arrival_local').html(eta_arr_str2);
        $('.fleet_return_game').html(eta_ret_str);
        $('.fleet_return_local').html(eta_ret_str2);
      }
    }

    // ------------------------------------------------------------------------

    function getMissionType()
    {
      var mission;
      // first see if we can get the mission type from the mission options of
      // of the "assemble" fleet panel of the fleets page

      // callback function to get selected mission type
      var mission_type = function(option)
                         {
                           if (option.checked)
                           {
                             mission = option.value;
                           }
                         };

      // select mission from radio buttons on the assemble fleet pane
      $$('#suitable_missions .mission_option input').each(mission_type);

      if (mission == null)
      {
        // could not find mission type.  Now see if this is an "assemble fleet"
        // pop-up i.e. from the galaxy page or a link
       var test = $('.assign_fleet form');
       test = test.attr('action');

       if (test.indexOf('/battle/fight') == 0
           || test.indexOf('/encounter/attack') == 0)
       {
         mission = "Attack";
       }
       else if (test.indexOf('/harvest/harvest') == 0)
       {
         mission = "Harvest";
       }
       else if (test.indexOf('/espionage/espionage') == 0
                || test.indexOf('/encounter/espionage') == 0)
       {
         mission = "Espionage";
       }
       else if (test.indexOf('/transport/transport') == 0)
       {
         mission = "Transport";
       }
       else if (test.indexOf('/colonize/colonize') == 0)
       {
         mission = "Colonize";
       }
       else if (test.indexOf('/trade/trade') == 0)
       {
         mission = "Trade";
       }
       else if (test.indexOf('/group_defend/defend') == 0)
       {
         // TODO for group defend, we should factor in the loiter time
         //      in orbit to get correct return time
         mission = "Defend";
       }
      }

      return mission;
    }

    // --------------------------------------------------------------------------
    // Main executable code
    // --------------------------------------------------------------------------

    // make sure we're actually on an SFC page
    if ($('.system_time_table .time .amount').html() == null)
    {
      return;
    }

    // save our current page info for later use
    var path = location.pathname;

    // set up some CSS
    $("<style type='text/css'>\
       .gameTimeNormal {\
          color: #FFA500;\
          position: relative;\
          z-index: 2;\
          display:none\
        }\
        </style>").appendTo("head");
    $("<style type='text/css'>\
       .localTimeNormal {\
          color: #FFFF00;\
          position: relative;\
          z-index: 2;\
          display:none\
        }\
        </style>").appendTo("head");

    // set up recurring update function
    setCallback();

    // refresh display with our initial time data
    updateDisplay();

    // process current page
    if (path == "/fleet" || path == "/fleet/index/fleets_nav"
        || path.indexOf("/scan/show") >= 0)
    {
      processFleets();
    }
    else if( path == "/options")
    {
      processOptions();
    }
    else if (path == "/"
             || path == "/roaming_planet_move/moving")
    {
      if (path == "/roaming_planet_move/moving")
      {
        var cancel_deploy =
                     $('.task_timer .additional_content .active .enabled');
        if(cancel_deploy.html() != null)
        {
          //add display spans
          var eta_str  = '<span>Recall return time: </span>'
          var eta_str2 = '<span class="gameTimeNormal">\
                            <span class="heph_recall_game">-</span>\
                          </span>';
          var eta_str3 = '<span class="localTimeNormal">\
                            <span class="heph_recall_local">-</span>\
                          </span>';

          cancel_deploy.before(eta_str
                               + eta_str2 + ' '
                               + eta_str3);

          // compute heph launch time
          var text = $('.task_timer').text();
          var progress =
                   parseInt(text.match(/makeTimer\(.*?, (\d+)/i)[1],10)*1000;

          t_heph = new Date(t_gam.getTime() - progress);
        }
      }

      processOverview();
    }
  }

  if(typeof(jQuery) !== 'undefined')
  {
    process(jQuery);
  }
  else
  {
    // if jQuery isn't already loading
    if(!window["jQuery_loading"])
    {
      window["jQuery_loading"] = true;

      // load jQuery dynamically
      var script=document.createElement('SCRIPT');
      script.type='text/javascript';
      script.src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    // wait until jQuery has loaded
    var interval = setInterval(function()
                               {
                                 if(typeof(jQuery) !== 'undefined')
                                 {
                                   clearInterval(interval);
                                   //Call process(), but disable jQuery outside
                                   // of this function (interferes with Prototype
                                   // library
                                   process(jQuery);
                                   jQuery.noConflict();
                                 }
                               }, 10);
  }
}

// load user function into client
var script = document.createElement("script");
script.textContent = "(" + user_func.toString() + ")()";
document.body.appendChild(script);