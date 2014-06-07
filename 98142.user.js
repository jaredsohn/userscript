// ==UserScript==
// @name           twitter.com tweaker
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @match          http://twitter.com/*
// @match          https://twitter.com/*
// ==/UserScript==


function tweetfilter() {

  var version = '1.0.9';

  var DEBUG = false;  //turn on debug. firefox with firebug advised.

  var css = { //css classes added to tweets
    filtered: 'tf',
    links: 'tfl',      //tweet contains links
    retweet: 'tfrt',    //is a retweet
    reply: 'tfre',      //is a reply
    mentionsme: 'tfmm', //mentions me
    media: 'tfa',       //contains video or picture
    me: 'tfi',          //your own tweets
    mutual: 'tmu',      //mutual friend
    user: 'tfu-',       //tweet autor, screenname is added
    rtuser: 'tfru-',    //retweeted by, screenname is added
    matching: 'tfm-'   //matches a filter, search id is added
  };

  var options = {}; /* loaded options for filter */
  var optiondefaults = { /* default option settings */
    /* options changing the global layout */
    'global-hide-topbar': false,     /* auto-hide top bar */
    /* options changing the dashboard */
    'dashboard-hide-detail': false,  /* compact activities */
    'dashboard-hide-wtf': true,     /* hide who to follow */
    'dashboard-hide-trends': true,  /* hide trends */
    'dashboard-hide-ad': true,       /* hide ad */
    'dashboard-hide-options': false, /* hide filter options */
    'dashboard-hide-filters': false, /* hide filter keywords */
    'dashboard-fixed': false,        /* fixed dashboard */
    'dashboard-show-matchcount': false, /* show (tweet)match count for each query */
    /* options changing the stream */
    'stream-filter-disabled': true, /* disable filter */
    'stream-filter-invert': false,   /* invert filter */
    'stream-filter-me': false,       /* filter my posts */
    'stream-filter-replies': false,  /* filter replies to me */
    'stream-filter-allreplies': false,  /* filter all replies */
    'stream-filter-links': false,  /* filter all tweets with links */
    'stream-filter-retweets': false, /* filter all retweets */
    'stream-filter-media': false,    /* filter all media */
    'stream-show-navigation': true,  /* show draggable top/bottom link menu */
    'stream-show-via': true,         /* show tweet source */
    'stream-show-tab': true,         /* show "filtered"-tab */
    'stream-show-br': true,          /* show line breaks in tweets */
    'stream-add-selection': true,    /* show add to filter menu after simple text selection in tweets */
    'stream-expand-new': false,       /* expand new tweets */
    'stream-expand-links': false,    /* show expanded links */
    'stream-small-links': false,     /* show small links */
    'stream-highlight-replies':true, /* highlight replies to me */
    'stream-show-mutual':false        /* show mutual friends */
  };

  var nextid = 1;    /* next unique id for query to avoid multiple timeline parsing. always incremented */
  var queries = [];  /* parsed queries */

  var relationshipspending = {};  /* not api checked */
  var relationshipsfetching = {}; /* currently checking with api */
  var relationships = {};  /* friend status. every user appearing in timeline will be checked once per hour (when he writes a new tweet) */

  var status = { //current statuses of tweetfilter
    streamnavigation: false,     //is stream-navigation visible
    ticking: false,
    csscreated: false,          //style containers created
    tabcreated: false,          //tab in home menu created
    widgetcreated: false,       //widget created
    widgetattached: false,      //widget attached to dashboard
    changingstream: false,
    componentsfound: false, //all dashboard components found
    parsingstream: false, // currently parsing cached stream
    topbarfound: false,         //events bound to top bar
    userid: 0,  //current user id
    settingsloaded: false,      //have settings been loaded
    stream: '',   //stream cachekey
    streamns: '', //stream namespace
    tweetstream: false, //has current stream tweets
    filterstream: false //should current stream be filtered
  };


  var streams = {};

  var catching = { //which events are catched
    resolveurl: false, //data from url resolver
    fetchtweets: false, //tweet data from api
    tweetclick: false
  };

  var tickclock = -1;

  var ticking = { //what should be done in tick event
    parsestream: 0,  //parse cached stream and pick up items from html stream
    findcomponents: 0, //find dashboard components
    processlinks: 0, //expand links in tweets
    findnewtweets: 0, //find not yet processed tweets
    findnewtweetsbar: 0, //find new tweets bar
    addstreamnavigation: 0,
    fetchrelationships: 0, //check mutual friends
    attachwidget: 0
  };

/*

streams to filter:

  twttr.streams.Home, twttr.streams.List

streams with tweets:

  twttr.streams.Home
  twttr.streams.Mentions
  twttr.streams.RetweetsByOthers
  twttr.streams.RetweetsByYou
  twttr.streams.YourTweetsRetweeted
  twttr.streams.Search
  twttr.streams.List
  twttr.streams.User
  twttr.streams.Favorites


streams with users:

  twttr.streams.Friends (following)
  twttr.streams.Followers (followers)
  twttr.streams.ListMembers (list following)
  twttr.streams.ListFollowers (list follower)

other streams:

  twttr.streams.OwnLists (list of own lists)
  twttr.streams.Memberships (list following you)
  (...)

*/

 var filter_streams = [ //streams to filter
  'twttr.streams.Home' //, 'twttr.streams.List'
 ];

 var tweet_streams = [ //streams with tweets: can show via, mutual friend status
  'twttr.streams.Home',
  'twttr.streams.Mentions',
  'twttr.streams.RetweetsByOthers',
  'twttr.streams.RetweetsByYou',
  'twttr.streams.YourTweetsRetweeted',
  'twttr.streams.Search',
  'twttr.streams.List',
  'twttr.streams.User',
  'twttr.streams.Favorites'
 ];

  var user = {id: 0}; /* current user info */
  var expanded = {}; /* expanded urls */
  var widget = false; /* domlink to widget container */
  var undefined; //dummy for easier undefined check

  var initretries = 10; //try 10 times (~10s) to initialize, then give up.

  function initialize() {
                                                                                                    _('initialize');
    //check for black bar.
    if ($ == undefined) {
      reinitialize();
    }
    findtopbar();
    if (!status.topbarfound) {
      reinitialize();
    }
    createcss();      //create style elements
    if (streamsready()) {
      streamchanged(); //try starting up
    } else {
                                                                                                    _W('streams not ready. reinit.');
      reinitialize();
    }
  }

  function streamsready() {
    return twttr != undefined && twttr.hasOwnProperty('currentUser') && twttr.hasOwnProperty('app') && twttr.app.hasOwnProperty('currentPage') &&
           twttr.app.currentPage().hasOwnProperty('streamManager') && twttr.app.currentPage().streamManager.hasOwnProperty('streams') &&
           twttr.app.currentPage().streamManager.streams.hasOwnProperty('current');
  }

  function reinitialize() {
                                                                                                    _W('reinitialize:'+initretries);
    if (initretries--) window.setTimeout(initialize, 1000); //reinitialize
  }

  function streamchanged() {
    //check if black bar is present
    if (status.changingstream) {
                                                                                                    _W('double execution : streamchanged');
      return;
    }
    status.changingstream = true;
    if (status.topbarfound) {
      if (streamsready()) {
                                                                                                    _('user and app found!');
        loadsettings();
        var currentstream = twttr.app.currentPage().streamManager.streams.current;
        var activestream = currentstream._cacheKey;
                                                                                                    _I('active stream: '+activestream+', previous: '+status.stream);
        if (status.stream != activestream) { //stream was switched
          window.scrollTo(0,0);
          status.streamns = currentstream._namespace; //current stream namespace
                                                                                                    _I('stream namespace: '+status.streamns);
          status.filterstream = $.inArray(status.streamns, filter_streams) > -1; //can stream be filtered
          status.tweetstream = $.inArray(status.streamns, tweet_streams) > -1;  //has stream tweets
          status.stream = activestream; //detect stream switch with real cache key name: in (uncached) searches is the whole query
                                                                                                    _('cache stream: '+currentstream._shouldCache);
          if (status.tweetstream) { //process only streams with tweets
            createwidget();  //create widget
            createtab();  //attempt to create tab.

            status.streamname = currentstream._shouldCache ? activestream : 'current'; //not all streams are cached, some (like search) are only populated in "current"
            if (!currentstream._shouldCache || !streams.hasOwnProperty(activestream)) { //to avoid multiple processing, save (cached) stream properties
              streams[status.streamname] = {found: 0}; //reset stream properties (causing full scan)
            }
                                                                                                    _('stream cache: '+status.streamname);
            currentstream.unbind('newItemsCountChanged didTweet doneLoadingMore streamEnd', triggerparser);
            currentstream.bind('newItemsCountChanged didTweet doneLoadingMore streamEnd', triggerparser);
            var streamnode = twttr.app.currentPage().streamManager.streams.current.$node; //stream container, linked in twitter app cache
            if (status.filterstream && !streamnode.data('filter-delegated')) {
                                                                                                    _('delegating stream events');
              streamnode.delegate('a[data-filter-menu]', 'mousedown', show_filter_menu)
                   .delegate('a[data-filter-add]', 'mousedown', click_filter_add)
                   .delegate('ul.tweetfilter-menu', 'mouseleave', leave_filter_menu)
                   .delegate('span.tweet-source a[href]', 'click', click_via_link)
                   .delegate('div.stream-item', 'mouseup click', select_tweet_text);
              streamnode.data('filter-degated', 1);
            }
          } else {
                                                                                                    _W('not a tweet stream:'+status.streamns);
            currentstream.unbind('newItemsCountChanged didTweet doneLoadingMore streamEnd', triggerparser);
            ticking.parsestream = false;
          }
                                                                                                    _W('firing parsestream (1)')
          resume();
          status.changingstream = false;
          return;
        } else {
           ticking.parsestream = false;
                                                                                                    _W('stream not changed!');
           status.changingstream = false;
          return;
        }
      } else                                                                                        _W('twttr object incomplete!');
    } else                                                                                          _W('top bar not found!');
                                                                                                    _('current user or app not found, retrying.');
    status.changingstream = false;
    window.setTimeout(streamchanged, 500);
  }

  function triggerparser() {
    ticking.parsestream = true;
  }

  function parsetweet(data) {
    var processitem = false;
    if (!data.hasOwnProperty('$node')) { //link to item not saved
      //var streamnode = twttr.app.currentPage().streamManager.streams.current.$node; //stream container, linked in twitter app cache
      var item = $('#_'+data.id);
      if (!item.length) { //itemid not indexed yet
        item = $('div.stream-item-content[data-retweet-id='+data.id+']'); //first look for retweet id
        if (item.length) {
          item = item.parent();
          item.attr('id', '_'+data.id);
          data.$node = item;
        } else {
          item = $('div.stream-item[data-item-id='+data.id+']'); //then look for item id
          if (item.length) {
            item.attr('id', '_'+data.id);
            data.$node = item;
          } else {
                                                                                                    _W('item not found: '+data.id);
          }
        }
      }
      if (data.hasOwnProperty('$node')) {
                                                                                                    _('new $node added:'+data.id);
        //add classes, via, etc. to tweet item
        processitem = true;
      }
    }
    if (!data.hasOwnProperty('filter')) {
                                                                                                    _('new filter added:'+data.id);
      data.filter = {};
      var user_screen_name = data.user.screenName;
      data.filter.source = data.filter.plainsource = data.source;
      if (data.filter.plainsource.indexOf('<') > -1) {
        data.filter.plainsource = data.filter.plainsource.replace(/<\S[^><]*>/g, '').toLowerCase(); //remove any html
      }
      data.filter.text = decodehtml(data.text);
      data.filter.userid = data.user.id;
      data.filter.username = user_screen_name.toLowerCase();
      data.filter.userwebsite = data.user.url;
      data.filter.mentions = '';
      data.filter.css = css.filtered+' '+css.user+data.filter.username;
      var rt_status = data.hasOwnProperty('retweetingStatus') ? data.retweetingStatus : false;
      if (rt_status) {
        data.filter.isrt = true;
        data.filter.css += ' '+css.retweet;
        data.filter.rtuser = rt_status.user.screenName.toLowerCase();
        data.filter.css += ' '+css.rtuser+data.filter.rtuser;
        if (rt_status.user.following) {
          getrelationship(data.filter.rtuser);
        }
      } else {
        data.filter.isrt = false;
        if (data.user.following) {
          getrelationship(data.filter.username);
        }
      }
      if (data.filter.username == user.name || (data.filter.isrt && data.filter.rtuser == user.name)) {
        data.filter.css += ' '+css.me;
      }
      if (data.isReply) {
                                                                                                    _('is a reply: '+data.id);
        data.filter.isreply = true;
        data.filter.css += ' '+css.reply;
      }
      var len = data.entities.user_mentions.length;
      // remove (known) mentions from tweet text to avoid interference with simple searches
      for (var m=0, mention; m<len; m++) {
        mention = data.entities.user_mentions[m].screen_name.toLowerCase();
        if (mention == user.name) {
          data.filter.css += ' '+css.mentionsme;
                                                                                                     _('found mention of '+user.name);
        }
        data.filter.mentions += (!!m ? "\n" : '') + mention;
        data.filter.text = data.filter.text.split('@'+mention).join('');
      }
      // attach urls to tweet text
      len = data.entities.urls.length;
      if (len) {
        data.filter.haslinks = true;
        data.filter.css += ' '+css.links;
      }
      if (data.hasOwnProperty('expandedurls')) {
                                                                                                    _W('found expandedurls in tweet data!');
        data.filter.text += data.expandedurls;
        delete data['expandedurls'];
      }
      data.filter.text = data.filter.text.toLowerCase();
                                                                                                    _(data.filter);
      var filtercss = checktweet(data);
      if (filtercss) data.filter.css += ' '+filtercss;
    }
    if (processitem) {
                                                                                                    _('processing item!');
      if (data.$node.find('span.media:not([data-media-class=general])').length) {
        data.filter.css += ' '+css.media;
      }
      var tweettext = data.$node.find('div.tweet-text');
      var htmltext = tweettext.html();
      if (htmltext.indexOf("\n") > -1) {
        tweettext.html(htmltext.replace(/\n/g, '<br />')); //insert line breaks
      }
      if (status.filterstream) {
        data.$node.find('span.tweet-actions').append('<span class="tweetfilter-add"><i>+</i> <a data-filter-menu="'+data.id+'" title="add to filter">Filter</a></span>');
      }
      data.$node.find('span.tweet-actions').before('<span id="_v'+data.id+'" class="tweet-source">via '+data.source+'</span>');
      data.$node.addClass(data.filter.css);
    }
    return data.hasOwnProperty('$node');
  }

  function parsestream() {
    if (status.parsingstream || status.changingstream) {
                                                                                                    _W('double call parsestream or changing stream!');
      return;
    }
    status.parsingstream = true;
                                                                                                    _('parse stream '+status.stream);
    var streamstatus = streams[status.streamname]; //attention here, streamname is "current" in uncached streams
    var currentstream = twttr.app.currentPage().streamManager.streams.current;
    var itemcount = currentstream.items.length;
    if (itemcount && streamstatus.found != itemcount) {
                                                                                                    _('found '+itemcount+' items');
      //sinceid changed: process items from top to bottom
      if (options['stream-expand-new'] && $('div#new-tweets-bar').length) {
        $('div#new-tweets-bar').trigger('click');
        ticking.parsestream = true;
        status.parsingstream = false;
        return;
      }
                                                                                                    _W('New Tweets!');
      streamstatus.count = itemcount;
      var i, data;
                                                                                                    _('stream '+status.stream+' : '+currentstream.items.length+' items');
      for (i=0; i<itemcount; i++) {
        data = currentstream.items[i];
        if (!data.hasOwnProperty('$node')) {
          if (parsetweet(data)) {
            streamstatus.found++;
          }
        }
      }
      if (streamstatus.count == itemcount) {
                                                                                                    _W('nothing left, stopping parsestream!');
        ticking.parsestream = false;
        status.parsingstream = false;
        ticking.processlinks = 3;
      } else {
                                                                                                    _('continue tick: '+streamstatus.count+', '+itemcount);
      }
      refreshcounter();
    } else {
                                                                                                    _W('stopping tick! items: '+itemcount);
      ticking.parsestream = false;
    }
    status.parsingstream = false;
                                                                                                    _(streamstatus);
  } //parsestream


  function event_tick() {
                                                                                                    _('tick!');
    tickclock = ++tickclock % 2;
    switch(tickclock) {
      case 1:
        if (ticking.processlinks === true || ticking.processlinks > 0) {
          processlinks();
          if (typeof ticking.processlinks == 'number') {
            ticking.processlinks--;
          }
        }
        if (options['stream-show-mutual'] && ticking.fetchrelationships) {
          fetchrelationships();
        }
      case 0:
        if (streamsready()) {
          if (status.stream != twttr.app.currentPage().streamManager.streams.current._cacheKey) {
            streamchanged();
          }
        }
        if (!status.componentsfound && ticking.findcomponents) {
          findcomponents();
          if (!status.componentsfound) {
            if (++ticking.findcomponents > 30) {
                                                                                                    _W('not all components found, giving up after 15 retries!')
              ticking.findcomponents = 0;
            }
          }
        } else ticking.findcomponents = 0;
        if (ticking.addstreamnavigation) {
          addstreamnavigation();
          if (ticking.addstreamnavigation > 10) {
                                                                                                    _W('add stream navigation failed after 10 retries');
            ticking.addstreamnavigation=0;
          }
        }
        if (ticking.parsestream === true) {
          parsestream();
                                                                                                    _F('parse stream, runs left:', ticking.parsestream);
        }
    }

    window.setTimeout(event_tick, 500);
  }


  function resume() {
                                                                                                    _I('filter resuming!')
    ticking.parsestream = status.tweetstream;
    expanded = {};
    if (status.filterstream) {
      ticking.findcomponents=1; //scan dashboard components and activate options, place widget
    }
    applycss(['filter', 'layout', 'widget', 'mutual']);
    //in and outside home timeline
    if (!ticking.processlinks) { //show expanded links
      if (!status.resolvingurl) {
        $(document).bind('ajaxSuccess', urlresolved); //watch for resolved link data
        status.resolvingurl = true;
      }
      ticking.processlinks=3;
    }
    if (!ticking.addstreamnavigation) {
      ticking.addstreamnavigation=1;
    }
    if (!status.ticking) {
      status.ticking = true;
      event_tick();
    }
  }

  var components = [
     { //trends list
       css: 'trends',
       found: false,
       path: 'div.trends-inner',
       option: 'dashboard-hide-trends'
     },
     { //who to follow
       css: 'wtf',
       found: false,
       path: 'ul.recommended-followers',
       option: 'dashboard-hide-wtf'
     },
     { //your activities
       css: 'activities',
       found: false,
       path: 'div.your-activity:first',
       option: 'dashboard-hide-detail',
       callback: function(target) { //attach widget
         if (status.widgetcreated && !status.widgetattached) {
           target.find('hr.component-spacer').remove();
           target.after(widget);
           status.widgetattached = true;
           initializewidget();
         }
       }
     },
     { //advertising
       css: 'ad',
       found: false,
       path: 'div.definition p.promo',
       option: 'dashboard-hide-ad'
     }
  ];

  //attempts to find dasboard components if one is missing.
  function findcomponents() {
    if (!status.componentsfound) {
      var i,len=components.length;
      var allfound = true; //optimistic
      for (i=0;i<len;i++) {
        if (!components[i].found) {
          var component = $(components[i].path).closest('div.component');
          if (component.length) {
            components[i].found=true;
            enableoption(components[i].option);
            component.addClass(components[i].css);
            if (defined(components[i]['callback'], 'function')) {
              components[i].callback(component);
            }
          } else {
            allfound = false;
          }
        }
      }
      status.componentsfound = allfound;
    }
  }

  //look for black bar and bind events
  function findtopbar() {
                                                                                                    _('findtopbar');
    if (!status.topbarfound && typeof $ != 'undefined' && $('div#top-stuff').length) {
                                                                                                    _('finding topbar!');
       /* auto hide top bar feature */
      $('div#top-stuff').mouseenter(function() {
        if (options['global-hide-topbar']) {
          $('body').addClass('show-topbar');
        }
      }).mouseleave(function() {
        if (options['global-hide-topbar'] && $('input#search-query').get(0) != document.activeElement) {
          $('body').removeClass('show-topbar');
        }
      });
      $('input#search-query').blur(function() {
        if (options['global-hide-topbar']) {
          $('body').removeClass('show-topbar');
        }
      });
      status.topbarfound = true;
                                                                                                    _('top bar events attached!');
    }
  }

  function addstreamnavigation() {
    if (status.topbarfound) {
      var container = 'div#page-container';
      if (!$(container+' div.stream-navigation').length) {
                                                                                                    _('attachstreamnavigation');
        if ($(container).length) {
          $(container).append('<div class="stream-navigation">'+
                                      '<a class="back-to-top" title="to the top" href="#">&uarr; newest</a>'+
                                      '<img class="stream-end-bird" src="/phoenix/favicon.ico" />'+
                                      '<a class="bottom" title="to the bottom" href="#" onclick="var h = document.documentElement.scrollHeight - document.documentElement.clientHeight; window.scrollTo(0, h-10); window.scrollTo(0, h); return false;">older &darr;</a>'+
                                    '</div>');
          $('div.stream-navigation').draggable({axis: "x"});
        }
        return;
      } else {
        if ($('div.dashboard').length) {
          var offset = $('div.dashboard').offset();
          $('div.stream-navigation').css('left', (offset.left+10)+'px');
          ticking.addstreamnavigation=0;
        }
                                                                                                    _I('stream navigation already present.')
      }
    }
  }

  function createtab() {
    if (!status.tabcreated) {
                                                                                                    _('createtab');
      var timelinetab = $('div.home-header ul.stream-tabs li.stream-tab-home');
      if (timelinetab.length) {
        timelinetab.after(
        '<li class="stream-tab stream-tab-filtered">\n\
           <a class="tab-text" href="/" title="Filtered tweets">Filtered</a>\n\
         </li>');
        $('div.home-header ul.stream-tabs').delegate('li.stream-tab-home,li.stream-tab-filtered', 'click', function(e) {
          var filtered = $(this).is('.stream-tab-filtered');
          setoption('stream-filter-invert', filtered, true);
          e.stopPropagation(); //bubbling this event causes lags. new tweets are always loaded with twitter's auto refresh.
          if (!status.streamns != 'twttr.streams.Home') {
            window.location.hash = '#'; //currently outside of home time line - set hash to trigger page switch
          }
          return false;
        });
        status.tabcreated = true;
      }
    }
    setstreamtitle();
  }

  function setstreamtitle() {
    if (status.streamns == 'twttr.streams.Home') {
                                                                                                    _('setstreamtitle');
      var activetab = options['stream-filter-invert'] && !options['stream-filter-disabled'] ? 'filtered' : 'home';
      var filteredtitle = '<h2>Filtered Tweets</h2>';
      if (activetab == 'filtered') {
        $('div.stream-title').html(filteredtitle);
      } else if (status.streamns == 'twttr.streams.Home') {
        $('div.stream-title').empty();
      }
    }
  }

  function createwidget() {
    if (!status.widgetcreated) {
      widget = $([
        '<div class="component tweetfilter">',
          '<h2 class="sidebar-title">',
            '<span>',
              '<a class="title-link toggle" data-option="stream-filter-invert" title="invert filter">',
                'Filtered <span class="user-stat-link"><span id="tweetfilter-filtered-count">0</span> / <span id="tweetfilter-item-count">0</span></span>',
              '</a>',
              '<span class="tweetfilter-menu">',
                '<a class="option toggle hide-filters" title="filter queries" data-option="dashboard-hide-filters">Filter</a>',
                '<a class="option toggle hide-options" data-option="dashboard-hide-options">Options</a>',
              '</span>',
            '</span>',
            '<span>',
              '<input id="tweetfilter-word-add" value="+ Add to filter" /><br />',
              '<a target="_blank" class="version" href="http://userscripts.org/scripts/show/49905" title="Tweetfilter on userscripts.org"><span>Tweetfilter '+version+'</span></a>',
            '</span>',
          '</h2>',
          '<div class="tweetfilter-words">',
            '<ul class="tweetfilter-list">',
              '<li class="keywords" title="filter keyword">',
                '<ul></ul>',
              '</li>',
              '<li class="excluded" title="exclude keywords">',
                '<ul></ul>',
              '</li>',
              '<li class="users" title="filter user">',
                '<ul></ul>',
              '</li>',
              '<li class="sources" title="filter via">',
                '<ul></ul>',
              '</li>',
            '</ul>',
          '</div>',
          '<div class="tweetfilter-options">',
            '<ul>',
              '<li class="filter"><h3>Options</h3>',
                '<ul>',
                  '<li><label><input type="checkbox" data-option="stream-filter-disabled" title="show all tweets" /> disable filter</label></li>',
                  '<li><label><input type="checkbox" data-option="stream-filter-invert" title="invert filter" /> invert filter</label></li>',
                  '<li><label><input type="checkbox" data-option="stream-filter-replies" title="don\'t skip tweets mentioning me" /> filter replies to me</label></li>',
                  '<li><label><input type="checkbox" data-option="stream-filter-me" title="don\'t skip my tweets" /> filter my posts</label></li>',
                  '<li><label><input type="checkbox" data-option="stream-filter-retweets" title="filter all retweets" /> filter all retweets <sup id="tweetfilter-count-retweet">0</sup></label></li>',
                  '<li><label><input type="checkbox" data-option="stream-filter-media" title="filter tweets with pictures and videos" /> filter all media <sup id="tweetfilter-count-media">0</sup></label></li>',
                  '<li><label><input type="checkbox" data-option="stream-filter-allreplies" title="filter all replies" /> filter all replies <sup id="tweetfilter-count-replies">0</sup></label></li>',
                  '<li><label><input type="checkbox" data-option="stream-filter-links" title="filter tweets with links" /> filter all links <sup id="tweetfilter-count-links">0</sup></label></li>',
                  '<li><label><input type="checkbox" data-option="dashboard-show-matchcount" title="show count of tweets matching the query" /> show match count</label></li>',
                  '<li><label><input type="checkbox" data-option="stream-show-tab" title="show filtered tab" /> show filtered tab</label></li>',
                  '<li><label><input type="checkbox" data-option="stream-add-selection" title="show add selection menu" /> add selection menu</label></li>',
                  '<li><label><input type="checkbox" data-option="stream-show-navigation" title="show/hide stream navigation" /> stream navigation</label></li>',
                '</ul>',
              '</li>',
              '<li class="timeline">',
                '<ul>',
                  '<li><label><input type="checkbox" title="highlight tweets mentioning me" data-option="stream-highlight-replies" /> highlight replies to me</label></li>',
                  '<li><label><input type="checkbox" title="show who follows me back" data-option="stream-show-mutual" /> show mutual friends</label></li>',
                  '<li><label class="disabled"><input type="checkbox" title="show tweet source" data-option="stream-show-via" /> show via in tweets</label></li>',
                  '<li><label class="disabled"><input type="checkbox" title="show line breaks in tweets" data-option="stream-show-br" /> show line breaks</label></li>',
                  '<li><label><input type="checkbox" title="immediately show new tweets" data-option="stream-expand-new" /> expand new tweets</label></li>',
                  '<li><label><input type="checkbox" title="expand shortened links in tweets" data-option="stream-expand-links" /> expand links</label></li>',
                  '<li><label><input type="checkbox" title="smaller link size" data-option="stream-small-links" /> small links</label></li>',
                '</ul>',
              '</li>',
              '<li class="ui">',
                '<ul>',
                  '<li><label><input type="checkbox" data-option="dashboard-fixed" /> fixed dashboard</label></li>',
                  '<li><label class="disabled"><input type="checkbox" data-option="dashboard-hide-detail" disabled="disabled" /> compact activities</label></li>',
                  '<li><label class="disabled"><input type="checkbox" data-option="dashboard-hide-wtf" disabled="disabled" /> hide who to follow</label></li>',
                  '<li><label class="disabled"><input type="checkbox" data-option="dashboard-hide-trends" disabled="disabled" /> hide trends</label></li>',
                  '<li><label class="disabled"><input type="checkbox" data-option="dashboard-hide-ad" disabled="disabled" /> hide ad</label></li>',
                  '<li><label><input type="checkbox" data-option="global-hide-topbar" /> auto-hide top bar</label></li>',
                '</ul>',
              '</li>',
            '</ul>',
          '</div>',
          '<hr class="component-spacer" />',
        '</div>'
        ].join("\n")
      );
      status.widgetcreated = true;
    }
  }

/* add listeners */
  function initializewidget() {
                                                                                                    _('initializewidget');
    if (status.widgetattached && !status.widgetinitialized) {
                                                                                                    _('attachwidget');
      //set input field active on focus, catch enter
      $('input#tweetfilter-word-add').live('focus', function() {
        var input = $(this);
        if (!input.hasClass('active')) {
          input.addClass('active').val('');
        }
      }).live('blur', function() {
        var input = $(this);
        if (!input.val()) {
          input.removeClass('active').val('+ Add to filter');
        }
      });
      /* options menu */
      $('div.tweetfilter').delegate('input', 'keydown keypress keyup', function(e) {
        if (e.type == 'keydown' && e.which == 13) {
          /* add query to filter by pressing enter */
          addquery($('input#tweetfilter-word-add').val());
          $('input#tweetfilter-word-add').val('').focus();
        }
        e.stopPropagation();
      }).delegate('[data-option]', 'click', function() {
        var sender = $(this);
        var optionname = sender.attr('data-option');
        if (sender.is('input[type=checkbox]')) {
          status = sender.is(':checked');
          setoption(optionname, status, true);
        } else if (sender.hasClass('toggle')) {
          var status = !options[optionname];
          setoption(optionname, status, true);
        }
        return sender.is('input');
      }).delegate('[data-queryid]', 'click', function() {
        if ($(this).is('input')) {
          setquerystatus($(this).attr('data-queryid')*1, $(this).is(':checked'));
          return true;
        } else {
          setquerystatus($(this).attr('data-queryid')*1, -1);
          return false;
        }
      });
      status.widgetinitialized = true;
      /* apply options to widget */
      refreshlist();
      for (var option in options) {
        setoption(option, options[option], false);
      }
    }
  }

  function click_via_link(e) {
                                                                                                    _('click_via_link');
    window.open(e.target.getAttribute('href'));
    return false;
  }


  function select_tweet_text(e) {
                                                                                                    _(e);
    if (e.which == 1) {
                                                                                                    _('click_tweet');
      switch(e.type) {
        case 'mouseup':
          catching.tweetclick = false;
          if (options['stream-add-selection'] && !options['stream-filter-disabled'] && e.target.getAttribute('class') == 'tweet-text') {
            var selection = '';
            if (window.getSelection) {
             selection = window.getSelection();
            } else if (document.getSelection) {
             selection = document.getSelection();
            } else if (document.selection) {
             selection = document.selection.createRange().text;
            }
            selection = selection.toString().replace(/^[\s\?\.\,\;\)\("'\:\-\!]+/g,'').replace(/[\s\?\.\,\;\)\("'\:\-\!]+$/g,'').replace(/\r?\n+/g, ' ');
            if (selection.length) {
              catching.tweetclick = true;
              $('ul.tweetfilter-menu').remove();
              var menu = $('<ul class="tweetfilter-menu selection drop-down">'+
                           '<li class="selection"><i>+</i> <a data-filter-add="'+selection+'" title="filter tweets containing '+selection+'">'+selection+'</a></li>'+
                         '</ul>').css({'position':'fixed', 'top':(e.clientY-10)+'px', 'left': (e.clientX-10)+'px'});
              if ($.browser.opera || $.browser.msie) {
                if (window.getSelection) {
                  selection = window.getSelection();
                  selection.removeAllRanges ();
                }
                else {
                  if (document.selection.createRange) {
                    var range = document.selection.createRange();
                    document.selection.empty();
                  }
                }
                $(e.target).append(menu);
                return true;
              } else {
                $(e.target).append(menu);
                e.stopPropagation();
                return false;
              }
              //menu
            }
          }
          break;
        case 'click':
          return !catching.tweetclick;
          break;
      }
    }
    return true;
  }

  function leave_filter_menu() {
                                                                                                    _('leave_filter_menu');
    $(this).remove();
  }

  function click_filter_add(e) {
    if (e.which == 1) { //left mouse click
                                                                                                    _('click_filter_add');
      addquery(e.target.getAttribute('data-filter-add'));
      $('ul.tweetfilter-menu').remove();
      e.stopImmediatePropagation();
      return false;
    }
    return true;
  }

  function show_filter_menu(e) {
                                                                                                      _('show_filter_menu');
    $('div.stream ul.tweetfilter-menu').remove();
    var link = $(e.target);
    var item = link.closest('div.stream-item');
    link.parent().prepend(getmenu(item, link.attr('data-filter-menu')));
    e.stopImmediatePropagation();
    return false;
  }

  function refreshlist() {
                                                                                                    _('refreshlist');
    var listitems = {
      users: '',
      keywords: '',
      sources: ''
    };
    for (var i=0,len=queries.length; i<len; i++) {
      var query = queries[i];
      var action = '';
      if (!options['stream-filter-invert']) {
        action = query.enabled ? 'show' : 'hide';
      } else {
        action = query.enabled ? 'hide' : 'show';
      }
      action = action + ' tweets';
      if (query.user) {
        action += ' from';
      } else if (query.source) {
        action += ' via';
      } else {
        action += ' containing';
      }
      var listitem = [
      '<li>',
        '<label title="'+action+' '+encodehtml(query.label)+'">',
          '<input type="checkbox" data-queryid="'+query.id+'"'+(!query.enabled ? '' : ' " checked="checked"')+'" />',
           encodehtml(query.label),
        '</label>',
        '<sup id="tweetfilter-count-'+query.id+'">0</sup>',
        '<a data-queryid="'+query.id+'" title="remove from filter">x</a>',
      '</li>'
      ];
      if (query.user) {
        listitems.users += listitem.join("\n");
      } else if (query.source) {
        listitems.sources += listitem.join("\n");
      }else {
        listitems.keywords += listitem.join("\n");
      }
    }
    for (var which in listitems) {
      if (listitems[which].length) {
        $('div.tweetfilter-words li.'+which).show().children('ul').html(listitems[which]);
      }else {
        $('div.tweetfilter-words li.'+which).hide().children('ul').empty();
      }
    }
  }

  function createcss() {
    if (!status.csscreated) {
      $('head').append( //create style containers
        '<style id="tweetfilter-widget" type="text/css"></style>\n\
         <style id="tweetfilter-layout" type="text/css"></style>\n\
         <style id="tweetfilter-mutual" type="text/css"></style>\n\
         <style id="tweetfilter-filter" type="text/css"></style>'
      );
      status.csscreated = true;
    }
  }

 //twitter api resolved shortened urls
  function urlresolved(event, request, settings) {
    if (settings.url.indexOf('urls/resolve') > -1) {
                                                                                                    _('urlresolved');
      var expandedlinks = JSON.parse(request.responseText);
      for (var url in expandedlinks) {
        if (expanded[url]) {
          expanded[url] = expandedlinks[url];
          $('a.twitter-timeline-link[data-shortened-url="'+url+'"]').removeClass('expanded'); //multiple shortened links
        }
      }
      ticking.processlinks=3;
    } else if (settings.url.indexOf('/related_results/') > -1) {
                                                                                                    _('relatedresults');
      ticking.processlinks=3;
    }
  }

  function processlinks() {
                                                                                                   _('processlinks');
                                                                                                   _(expanded);
    var showexpanded = options['stream-expand-links'];
    var links = $('a.twitter-timeline-link:not(.'+(showexpanded ? 'expanded':'shortened')+')');
    if (links.length) {
                                                                                                    _(links.length+' links found');
      for (var l=0, len=links.length; l<len; l++) {
        var link = links.eq(l);
        var shorturl = link.attr('href');
        var expandedurl;
        if (expanded.hasOwnProperty(shorturl)) {
          expandedurl = expanded[shorturl];
        } else {
          expandedurl = link.attr('data-expanded-url');
          if (expandedurl) {
            expanded[shorturl] = expandedurl;
          }
        }
        if (expandedurl && expandedurl != shorturl) {
          link.attr('data-shortened-url', shorturl);
          link.attr('data-expanded-url', expandedurl);
          if (showexpanded) {
            link.html(expandedurl);
            link.removeClass('shortened').addClass('expanded');
          } else {
            link.html(shorturl);
            link.addClass('shortened').removeClass('expanded');
          }
          var itemid;
          var item = link.closest('div.stream-item');
          if (item.length) {
            if (item.attr('id')) {
              itemid=item.attr('id').substr(1);
            } else {
              itemid = item.find('div.stream-item-content').attr('data-retweet-id');
              if (!itemid) itemid = item.attr('data-item-id');
              if (!itemid) return;
            }
            if (streamsready()) {
              var items = twttr.app.currentPage().streamManager.streams.current.items;
              len = items.length;
              for (var i=0;i<len;i++) {
                if (items[i].id == itemid) {
                  if (items[i].hasOwnProperty('filter')) {
                    items[i].filter.text += "\n"+expandedurl.toLowerCase();
                                                                                                    _I('processlinks: item found for '+expandedurl);
                    var filtercss = checktweet(items[i]);
                    if (filtercss) {
                      items[i].filter.css += filtercss;
                      items[i].$node.addClass(filtercss);
                    }
                  } else {
                    if (!items[i].hasOwnProperty('expandedurls')) {
                      items[i].expandedurls = '';
                    }
                                                                                                     _I('processlinks: caching in item expanded urls: '+expandedurl)
                    items[i].expandedurls += "\n"+expandedurl.toLowerCase();
                  }
                  break;
                }
              }
            } else {
                                                                                                    _F('processlinks: streams not ready', expandedurl);
            }
          }
        }
      }
      refreshcounter();
    }
  }

  function refreshuser() {
                                                                                                    _('refreshuser');
    var refreshcss = false;
    if (user.id != twttr.currentUser.id) {
      status.settingsloaded = false;
      options = {};
      relationships = {};
      refreshcss = true;
    }
    user = {
      screenname: twttr.currentUser.screenName,
      name: twttr.currentUser.screenName.toLowerCase(),
      id: twttr.currentUser.id,
      color: {
        background: '#'+twttr.currentUser.profileBackgroundColor,
        link: '#'+twttr.currentUser.profileLinkColor,
        border: '#'+twttr.currentUser.profileSidebarBorderColor,
        fill: '#'+twttr.currentUser.profileSidebarFillColor,
        text: '#'+twttr.currentUser.profileTextColor,
        darktext: '#444',
        lighttext: '#999'
      }
    }
    if (refreshcss) {
      applycss(['widget']);
    }
  }

  //load settings from local storage
  function loadsettings() {
                                                                                                    _('loadsettings');
    refreshuser();
    if (!status.settingsloaded) {
      var settings = storage.get(':TWEETFILTER:', {});
      if (!defined(settings[user.id])) {
        settings[user.id] = {};
      }
      settings = settings[user.id];
      queries = [];
      if (!defined(settings.queries)) {
        settings.queries = [];
      }
      for (var q=0,len=settings.queries.length;q<len;q++) {
        addquery(settings.queries[q].query, settings.queries[q].enabled);
      }
      options = $.extend({}, optiondefaults);
      if (!defined(settings.options)) {
        settings.options = {};
      }
      for (var option in settings.options) {
        if (defined(optiondefaults[option], 'boolean')) {
          options[option] = settings.options[option];
        }
      }
      if (defined(settings.relationships)) {
        relationships = settings.relationships;
      }
      savesettings();
      status.settingsloaded = true;
    }
  }

  //save settings in local storage
  function savesettings() {
                                                                                                    _('savesettings');
    var settings = storage.get(':TWEETFILTER:', {});
    deleteexpiredrelationships();
    settings[user.id] = {
      queries: [],
      options: options,
      relationships: relationships
    };
    for (var q in queries) {
      settings[user.id].queries.push({
        query: queries[q].query,
        enabled: queries[q].enabled
      });
    }
    storage.set(':TWEETFILTER:', settings);
  }


  function addquery(query, enabled) {
    if (status.settingsloaded && options['stream-filter-disabled']) {
      return false;
    }
    if (!defined(enabled, 'boolean')) {
      enabled = true;
    }
    var queryid = false;
    var query_lc = query.toLowerCase();
    var len = queries.length;
    for (var i=0; i<len; i++) {
      if (queries[i].query.toLowerCase() == query_lc) {
        queryid = queries[i].id; //return query index
      }
    }
    if (queryid) {
      setquerystatus(queryid, true);
    } else { //new query: parse query, then tweets
      var search = {
        id: nextid++,                 //unique id
        enabled: enabled,             //status
        query: query,                 //raw query
        iquery: query.toLowerCase(),  //lowercase query
        search: query.toLowerCase(),  //what to (really) search for
        label: null,                  //label shown in ui, case sensitive
        sortby: query,
        regex: null,                  //regular expression match, if applicable
        mention: false,               //search for user mention
        exact: false,                 //word search: search contains lowercase query (without quotes)
        user: false,                  //user search: search contains lowercase username (without @@)
        source: false,                //via search: search contains lowercase source (without :@)
        simple: false                 //simple search: search contains lowercase query
      }
      var types = {
        exact: /^"(.+)"$/,
        user: /^@@([A-Za-z0-9_]{1,20})/,
        mention: /^@([A-Za-z0-9_]{1,20})/, //fake/mistyped mentions are still in tweet text
        source: /^:@(.+)$/,
        hashtag: /(#[^#\s]+)/,
        simple: /(.+)/
      }
      var matches;
      for (var type in types) {
        matches = search.query.match(types[type]);
        if (matches) {
          search.label = matches[1]; //preserve case for labels
          search.search = search.sortby = matches[1].toLowerCase(); //always do case insensitive search
          if (type !== 'hashtag') {
            search[type] = true;
          } else {
            search.sortby = search.search.substr(1);
            search.simple = true;
          }
          switch(type) {
            case 'user':
            case 'mention':
              search.label = '@'+matches[1];
            break;
            case 'exact':
              search.regex = regescape(search.search) //escape for regular expression
              search.regex = '(?:^|[\\s\\.\\!\\)\\}\\]\\?])('+search.regex+')(?:[\\s\.\\!\\)\\}\\]\\?]|$)';
              search.label = '"'+matches[1]+'"';
            break;
          }
          break;
        }
      }
      queries.push(search);
      queries.sort(function(a, b) { //sort the filter list
        return ((a.sortby < b.sortby) ? -1 : ((a.sortby > b.sortby) ? 1 : 0));
      });
      if (status.settingsloaded) {
        savesettings();
        refreshlist();
        if (!search.user) {
          var data, filtercss;
          var items = twttr.app.currentPage().streamManager.streams.current.items;
          len=items.length;
          for (i=0;i<len;i++) {
            data = items[i];
            filtercss=checktweet(data);
            if (filtercss) {
              data.filter.css += filtercss;
              data.$node.addClass(filtercss);
            }
          }
        }
        if (enabled) {
          applycss(['filter']);
        } else {
          refreshcounter();
        }
      }
      return search.id;
    }
    return false;
  }

  function setquerystatus(queryid, status) { //status: true/false: toggle, -1: delete
    if (options['stream-filter-disabled']) {
      return;
    }
    for (var i in queries) {
      if (queries[i].id == queryid) {
        if (status == -1) { //delete
          var queryenabled = queries[i].enabled;
          queries.splice(i, 1);
          savesettings();
          refreshlist();
          if (queryenabled) { //only refresh if query was enabled
            applycss(['filter']);
          } else {
            refreshcounter();
          }
        } else { //enable or disable
          if (queries[i].enabled != status) {
            queries[i].enabled = status;
            savesettings();
            refreshlist();
            applycss(['filter']);
          }
        }
        break;
      }
    }
  }

  //check tweet for any match or a specific search object (except user type)
  function checktweet(data, search) {
    if (!data.hasOwnProperty('filter')) {
                                                                                                    _W('cant check, not filtered yet!');
      return false;
    }
    var searches;
    if (defined(search)) {
      searches = [search];
    } else {
      searches = queries;
    }
    var filtercss = '';
    for (var s=0, len=searches.length; s<len; s++) {
      if (!searches[s].user && //user match already done by default added css classes and refresh
        (
          (searches[s].simple && (data.filter.text.indexOf(searches[s].search) > -1)) ||
          (searches[s].exact && (data.filter.text.indexOf(searches[s].search) > -1 && data.filter.text.match(searches[s].regex))) ||
          (searches[s].mention && ((data.filter.mentions.indexOf(searches[s].search) > -1) || (data.filter.text.indexOf(searches[s].search) > -1))) || //fake or mistyped mentions remain in the tweet text
          (searches[s].source && (data.filter.plainsource.indexOf(searches[s].search) > -1))
        )) {
        if (data.filter.css.indexOf(' '+css.matching+searches[s].id+' ') == -1) {
          filtercss += css.matching+searches[s].id+' ';
        }
      }
    }
    return filtercss;
  }

  //check mutual status with tweet autor
  function getrelationship(screenname) {
                                                                                                    _F('getrelationship', screenname);
    if (relationships.hasOwnProperty(screenname)) {
      var rs = relationships[screenname];
      if (rs.expires > parseInt(new Date().getTime() / 1000)) {
        return relationships[screenname];
      } else {
        delete relationships[screenname];
        relationshipspending[screenname] = {};
        if (!ticking.fetchrelationships) {
          ticking.fetchrelationships = options['stream-show-mutual'];
        }
        return -1;
      }
    } else if (!relationshipspending.hasOwnProperty(screenname) && !relationshipsfetching.hasOwnProperty(screenname)) {
      relationshipspending[screenname] = {};
    }
    if (!ticking.fetchrelationships && options['stream-show-mutual']) {
                                                                                                    _W('init relationships tick')
      ticking.fetchrelationships = true;
    }
    return -1;
  }

  function fetchrelationships() {
    for (var screenname in relationshipspending) {
      relationshipsfetching[screenname] = relationshipspending[screenname];
      delete relationshipspending[screenname];
      twttr.currentUser.relationshipWith(screenname, {
        success: function(relationship) {
                                                                                                    _I('fetched relationship with '+screenname);
          relationshipfetched(screenname, relationship);
        },
        error: function() {
          relationshiperror(screenname);
        }
      });
      return;
    }
  }

  function relationshiperror(screenname) {
    relationshipspending[screenname] = relationshipsfetching[screenname];
    delete relationshipsfetching[screenname];
    ticking.fetchrelationships = true;
  }

  function relationshipfetched(screenname, relation) {
                                                                                                    _F('relationshipfetched', screenname);
    if (!relationships.hasOwnProperty(screenname)) {
      relationships[screenname] = {};
    }
    var rs = relationships[screenname];
    rs.mutual = relation.followedBy && relation.following;
    rs.expires = parseInt(new Date().getTime() / 1000) + 3600;
                                                                                                    _I('got relationship with '+screenname+' : '+rs.mutual);
    delete relationshipsfetching[screenname];
    if (emptyobj(relationshipspending)) {
                                                                                                    _W('stopping relationships tick')
      ticking.fetchrelationships = false;
    }
    if (rs.mutual && status.ticking) {
      applycss(['mutual'])
    }
  }


  function deleteexpiredrelationships() {
                                                                                                    _('deleteexpiredrelationships');
    var now = parseInt(new Date().getTime() / 1000);
    for (var f in relationships) { //clean up expired users, don't save them
      if (relationships[f].expires <= now) {
        delete relationships[f];
      }
    }
  }


  function refreshcounter() {
    var items = $('div.stream-items > div.stream-item[id]');
    $('#tweetfilter-item-count').html(items.length); //all tweets in timeline
    //this is also a fail check: if counter in filtered and timeline does not match, something went wrong.
    $('#tweetfilter-filtered-count').html(items.filter(options['stream-filter-invert'] && !options['stream-filter-disabled'] ? ':visible' : ':hidden').length); //filtered (hidden) tweets
    if (options['dashboard-show-matchcount']) { //show count for each filter
      for (var q=0, query; query=queries[q]; q++) {
        if (query.user) { //user filter: count tweets by this user
          $('#tweetfilter-count-'+query.id).html(items.filter('.'+css.user+query.search).length);
        } else { //count tweets with match
          $('#tweetfilter-count-'+query.id).html(items.filter('.'+css.matching+query.id).length);
        }
      }
      $('#tweetfilter-count-retweet').html(items.filter('.'+css.retweet).length);
      $('#tweetfilter-count-media').html(items.filter('.'+css.media).length);
      $('#tweetfilter-count-replies').html(items.filter('.'+css.reply).length);
      $('#tweetfilter-count-links').html(items.filter('.'+css.links).length);
    }
  }

  //get or set an option
  function setoption(option, status, clicked) {
                                                                                                     _('set option '+option+' to '+status+', clicked: '+clicked);
    var type = option.substr(0, option.indexOf('-'));
    var name = option.substr(option.indexOf('-')+1);
    if (!defined(clicked)) clicked = false;
    if (status === null) status = !options[option];
    var refresh = type == 'stream' ? ['filter'] : ['layout'];
    switch(option) {
      case 'global-hide-topbar':
        $('body').toggleClass(name, status);
        break;
      case 'stream-expand-new':
        if (status) {
          var newtweetsbar = $('div#new-tweets-bar');
          if (newtweetsbar.length) newtweetsbar.trigger('click');
        }
        refresh = ['layout'];
        break;
      case 'dashboard-hide-filters':
      case 'dashboard-hide-options':
        widget.toggleClass(name, status);
        refresh = [];
        break;
      case 'stream-show-mutual':
        refresh = ['layout', 'mutual'];
      break;
      case 'stream-show-tab':
      case 'stream-show-br':
      case 'stream-show-via':
      case 'stream-compact-tweets':
      case 'stream-small-links':
      case 'stream-show-navigation':
      case 'stream-highlight-replies':
        refresh = ['layout'];
        break;
      case 'stream-expand-links':
        $('div.main-content a[data-'+(status ? 'expanded' : 'shortened')+'-url]').each(function() {
          var linkhtml = $(this).html();
          $(this).html($(this).attr('data-'+(status ? 'expanded' : 'shortened')+'-url'));
          $(this).attr('data-'+(status ? 'shortened' : 'expanded')+'-url', linkhtml);
        });
        refresh = [];
       break;
    }
    if (status.settingsloaded && option == 'stream-filter-invert' && options['stream-filter-disabled']) {
      return false; //don't invert the filter while it is disabled
    }
    options[option] = status; //set option
    if (option == 'stream-show-mutual') {
      ticking.fetchrelationships = !!status;
    }
    if (option == 'stream-filter-disabled') {
      widget.find('ul.tweetfilter-list input,li.filter input')
                   .not('[data-option=stream-filter-disabled],[data-option=stream-show-navigation],[data-option=dashboard-show-matchcount]')
                   .attr('disabled', status);
      setstreamtitle();
      refresh = ['filter', 'layout'];
    }
    if (!clicked || option == 'stream-filter-invert') {
      widget.find('input[data-option='+option+']').attr('checked', status);
    }
    if (clicked && option == 'stream-filter-invert') {
      window.scrollTo(0,0); //scroll to top when switching between timeline and filtered
    }
    if (option == 'stream-filter-invert' || option == 'stream-show-tab') {
      setstreamtitle();
    }
    if (clicked) {
      savesettings();
      applycss(refresh);
    } else {
                                                                                                    _W('setoption not applying css: '+option);
    }
    return status;
  }

  function getmenu(item, itemid) {
                                                                                                    _('getmenu');
    var menu = '<ul class="tweetfilter-menu drop-down">';
    var username = item.find('a.tweet-screen-name').html();
    menu += '<li class="user"><a data-filter-add="@@'+username+'" title="filter tweets from @'+username+'">@'+username+'</a></li>';
    var retweetuser = item.find('span.retweet-icon').next('em').html();
    if (retweetuser) {
      retweetuser = retweetuser.split(' ')[1];
      menu += '<li class="user"><a data-filter-add="@@'+retweetuser+'" title="filter tweets from @'+retweetuser+'">@'+retweetuser+'</a></li>';
    }
    var via = $('#_v'+itemid).html().substr(4);
    if (via) {
      via = via.replace(/<\S[^><]*>/g, '');
      menu += '<li class="source"><a data-filter-add=":@'+via+'" title="filter tweets via '+via+'">via '+via+'</a></li>';
    }
    var mentions = [];
    var hashtags = [];
    var domains = [];
    var linksmenu = '';
    var hashtagsmenu = '';
    var mentionsmenu = '';
    var links = item.find('div.tweet-text > a[class]'), link;
    if (links.length) {
      for (var l=0, len=links.length; l<len; l++) {
        link = links.eq(l);
        var linkclass = link.attr('class').replace(/^\s+/,'');
        if (linkclass.indexOf(' ') > -1) linkclass = linkclass.split(' ')[0];
        switch(linkclass) {
          case 'twitter-hashtag':
            var hashtag = link.html();
            if (hashtag && $.inArray(hashtag.toLowerCase(), hashtags) == -1) {
              hashtagsmenu += '<li class="hashtag"><a data-filter-add="'+hashtag+'" title="filter tweets tagged '+hashtag+'">'+hashtag+'</a></li>';
              hashtags.push(hashtag.toLowerCase());
            }
            break;
          case 'twitter-atreply':
            var mention = link.attr('data-screen-name');
            if (mention && $.inArray(mention, mentions) == -1) {
              mentionsmenu += '<li class="mention"><a data-filter-add="@'+mention+'" title="filter tweets mentioning @'+mention+'">@'+mention+'</a></li>';
              mentions.push(mention);
            }
            break;
          case 'twitter-timeline-link':
            var linkaddress = link.attr('data-expanded-url');
            if (!linkaddress) linkaddress = link.attr('title');
            if (!linkaddress) linkaddress = link.attr('href');
            if (linkaddress) {
              var domain = linkaddress.match(/^[a-z]+\:\/\/(?:www\.)?([^\/]+)/);
              if (domain && $.inArray(domain[1], domains) == -1) {
                domain = domain[1];
                linksmenu += '<li class="domain"><a data-filter-add="'+domain+'" title="filter tweets linking to '+domain+'">'+domain+'</a></li>';
                domains.push(domain);
              }
            }
            break;
        }
      }
    }
    return menu+mentionsmenu+hashtagsmenu+linksmenu+'</ul>';
  }

  //enable an option after required components were detected
  function enableoption(option) {
    if (defined(widget)) {
                                                                                                    _F('enableoption', option);
      var checkbox = widget.find('input[data-option='+option+']');
      if (checkbox.length) {
        checkbox.removeClass('disabled');
        checkbox.removeAttr('disabled');
      }
    }
  }

  //set style element contents
  function setcss(id, styles) {
                                                                                                    _F('setcss', id);
    id = 'tweetfilter-'+id;
    if ($.browser.msie) { //apparently jquery does not handle this correctly on IE
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].id == id) {
          document.styleSheets[i].cssText = styles;
        }
      }
    } else { //all others: directly set element contents
      $('style#'+id).html(styles);
    }
  }

  //build css from filter settings, filters and/or options and set it
  function applycss(which) {
                                                                                                    _F('applycss', which);
    var style = [];
    var name;
    for (var i in which) {
      style = [];
      name = which[i];
      switch(name) {
        case 'filter': //anything that hides/shows tweets
          if (!status.filterstream || !status.tweetstream || options['stream-filter-disabled']) {
            if (!status.filterstream) style.push('div.tweetfilter { display:none !important; }'); //hide the widget outside home timeline
            style.push('.main-content .stream-item span.tweetfilter-add, input#tweetfilter-word-add { display:none !important; }');
            setcss(name, style.join("\n"));
            refreshcounter();
            continue;
          }
          var hidecss = 'display:none;';
          var showcss = 'display:block;';
          var forceshowcss = 'display:block !important;';
          var forcehidecss = 'display:none !important;';
          var inverted = options['stream-filter-invert'];
          if (inverted) {
            style.push('li.stream-tab-home a.tab-text { border:1px solid transparent !important; background:none !important; font-weight:normal !important; }');
            style.push('li.stream-tab-home:hover a.tab-text { background: none repeat scroll 0 0 #EEEEEE !important; border-color: #EEEEEE !important; }');
            style.push('li.stream-tab-filtered a.tab-text,');
            style.push('li.stream-tab-filtered:hover a.tab-text { background: none repeat scroll 0 0 #FFFFFF; border-color: #EEEEEE #EEEEEE #FFFFFF; color: #333333; font-weight: bold; outline: medium none; }');
          }
          style.push('.main-content .stream-item { '+hidecss+' }'); //hide not processed
          style.push('.main-content .stream-item.'+css.filtered+' { '+(inverted ? hidecss : showcss)+' }'); //show processed
          var filters = [];
          for (var q=0,len=queries.length; q<len; q++) { //searches
            if (queries[q].enabled) {
              if (queries[q].user) { //user matches
                filters.push('.main-content .stream-item.'+css.user+queries[q].search);
                filters.push('.main-content .stream-item.'+css.rtuser+queries[q].search);
              } else {
                filters.push('.main-content .stream-item.'+css.matching+queries[q].id);
              }
            }
          }
          /* filter all retweets */
          if (options['stream-filter-retweets']) {
            filters.push('.main-content .stream-item.'+css.retweet);
          }
          if (options['stream-filter-allreplies']) {
            filters.push('.main-content .stream-item.'+css.reply);
          }
          if (options['stream-filter-links']) {
            filters.push('.main-content .stream-item.'+css.links);
          }
          /* filter all media */
          if (options['stream-filter-media']) {
            filters.push('.main-content .stream-item.'+css.media);
          }
          if (filters.length) {
            style.push(filters.join(', ')+' { '+(inverted ? showcss : hidecss)+' }');
          }
          if (!options['stream-filter-replies']) {
            style.push('.main-content .stream-item.'+css.mentionsme+' { '+(inverted ? forcehidecss : forceshowcss)+' }');
          }
          /* don't show new tweets bar when auto fetching */
          if (!options['stream-filter-me']) {
            style.push('.main-content .stream-item.'+css.me+' { '+(inverted ? forcehidecss : forceshowcss)+' }');
          }
          setcss(name, style.join("\n"));
          $('div.main-content').css('min-height', ($(window).height()+50)+'px'); //fix hidden vertical scrollbar
          break;
        case 'mutual':
          if (options['stream-show-mutual']) {
            for (var r in relationships) {
              if (relationships[r].mutual) {
                style.push('div.'+css.user+r+' div.stream-item-content, div.'+css.user+r+':hover div.stream-item-content');
              }
            }
            setcss(name, style.length ? style.join(', ') + //mutual friend corner icon
              ' { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAAGXRFWHRTb2Z0d2Fy'+
              'ZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqdJREFUeNqslNtLVFEUxr9z0ZlmnHGc0ZzwhoVaCSEImSkURiCSUD0YIYQ9FPQSFb74XO/1JwQ9TB'+
              'cmyrIIERJE7WITmrdRy0xNOEdHHefM5Vx2a2a6JzVqG9Y6nMXZv/2tby8Olp/XMKYGHjLGOPyPFehwRdjAEcaiC7cJat4qj0eaDVgbAN6dPgV1'+
              '0UNQfmtAjgHpTiA8BAyfPA595dEWgfFM0LjSyBhBGxuWFga7mOozbw4oUP4WaRmkdBRTXU11TFPaqX3rxoF8IifCAEP3EIPoNAD9xtGg/PYxQY'+
              'VNKYxfxfB0GDm7nKior8G4fxY3rzcc1qMj3Ru5KFLIJdTNShrkoIbCfSVUlvBhcgEejwxprqVGC/X0ENSSokKWUCit6FBoDDNc9gSwrCIT5y65Y'+
              'bEqWP7UUq2vPn1GUHtqHgpJ/3gxLVGKKkEUZgdxtlmFOTQPKycD8pnayHJfJ0HFlDwU0zl6aGSmjEW/hI5bc5ifCEOwUN0i4I0vhr72+v3QBvoJ'+
              'avqnQrdbhKFFEfy8BPfuPBhkxdVrCtpaFbReDsHrVZBXQh1wFytn/Pf673s9uesDxeTIuHMF7CxOx2CfRCqzcOJ8OZpbHLBZVJSVcLjQlo/S6r1'+
              'QJIb+zisV5WWO+A8l63cgFxgtijhs/PcWel9FEAqJqKorgH2H6evE01zGNEyPrOJ17zyqKjVsz82HqeDJSwh5tRzHqT+AYwS08794Mjwew9Skjg'+
              'zbNvBWM5imIxYMQzNiOHjAjCx7fHDDdFYO4Hrgg1h8iKDBJHCcgJn8Hya//0iKZlSshQwIZEmOS0QpeUiH//RVhAjZgPPOC4h7GgkqcYGJ9YFJ/'+
              'RTsLzWOXgwSxtP9OO7Gocc42V+0Iggwr7M1xUVQtkZQp4nZvb4vAgwAOI4c4iiR9ogAAAAASUVORK5CYII=); '+
              'background-repeat: no-repeat; background-position:bottom left; }' : '');
          } else setcss(name, '');
          break;
        case 'layout': //anything that does NOT hide/show tweets
          if (options['stream-filter-disabled'] || !options['stream-show-tab']) { //hide filtered tab when filter or option is disabled
           style.push('li.stream-tab-filtered { display:none !important; }');
          }
          if (!options['stream-show-navigation']) {
            style.push('div.stream-navigation { display:none !important; }');
          }
          /* don't show new tweets bar when auto fetching */
          if (options['stream-expand-new']) {
            style.push('div#new-tweets-bar, div.new-tweets-bar { display:none !important; }');
          }
          /* show mutual friends */
          if (options['stream-show-mutual']) {}
          if (!options['stream-show-br']) {
            /* show line breaks in tweets */
            style.push('.tweet-text br { display:none; }');
          }
          if (options['stream-small-links']) {
            /* show line breaks in tweets */
            style.push('a.twitter-timeline-link { font-size:12px;  line-height:14px; display:inline-block; max-width:440px; overflow:hidden; vertical-align:bottom; }');
            style.push('div.tweet-text-large a.twitter-timeline-link { line-height:14px; display:inline-block; max-width:430px; overflow:hidden; vertical-align:bottom; }');
          }
          if (!options['stream-show-via']) {
            /* show via in tweets */
            style.push('.main-content .stream-item .tweet-source { display:none; }');
          }
          if (options['dashboard-hide-detail']) {
            /* compact activities */
            style.push([
              'div.dashboard ul.inline-list,',
              'div.dashboard div.latest-favorite,',
              'div.dashboard div.recently-listed-in { display:none; }',
              'div.dashboard div.your-activity { height:auto !important; margin-bottom:0;}',
              ].join("\n"));
          }
          if (!options['dashboard-show-matchcount']) {
           style.push('div.tweetfilter-words ul ul li label { right:15px !important; }');
          }
          if (!options['dashboard-show-matchcount']) {
            style.push('div.tweetfilter-words sup, div.tweetfilter-options sup { display:none !important; }');
          }
          if (options['dashboard-hide-trends']) {
            /* hide trends */
            style.push('div.dashboard > div.component.trends { display:none; }');
          }
          if (options['dashboard-hide-wtf']) {
            /* hide who to follow */
            style.push('div.dashboard > div.component.wtf { display:none; }');
          }
          if (options['dashboard-hide-ad']) {
            /* hide ad */
            style.push('div.dashboard > div.component.ad { display:none; }');
          }
          if (options['dashboard-fixed']) {
            /* fixed dashboard */
            style.push('div.dashboard { position:fixed; margin-left:540px; }');
          }
          /* highlight replies to me */
          if (options['stream-highlight-replies'] && status.streamns != 'twttr.streams.Mentions') {
            var selector = 'div.main-content div.stream-item.'+css.mentionsme+' { ';
            //css linear gradient
            if ($.browser.opera) {
              selector += 'background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjpyZ2JhKDI1NSwyNTUsMTg3LDEpOyIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMSk7IiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZ3JhZGllbnQpIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiAvPjwvc3ZnPg==); }';
            } else if ($.browser.mozilla) {
              selector += 'background: -moz-linear-gradient( left, rgba(255,255,187,1), rgba(255,255,255,1) ); }';
            } else if ($.browser.webkit) {
              selector += 'background: -webkit-gradient( linear, left top, right top, color-stop( 0, rgba(255,255,187,1) ), color-stop( 1, rgba(255,255,255,1) ) ); }';
            } else  if ($.browser.msie) {
              selector += '-ms-filter: "progid:DXImageTransform.Microsoft.Gradient(GradientType=1,StartColorStr=#FFFFFFBB,EndColorStr=#FFFFFFFF)"; }';
            }
            style.push(selector);
          }
          if (options['global-hide-topbar']) {
            style.push([
              /* auto hide top bar */
              'body { background-position: top left !important; }',
              'body div#top-stuff { top: -35px; }',
              'body div#page-outer { padding-top: 25px; }',
              'body.show-topbar div#top-stuff { top: 0; }',
              'body.show-topbar { background-position: left 40px !important; }',
              'body.show-topbar div#page-outer { padding-top:60px; }',
              'body.hide-topbar div#details-pane-outer { margin-top:0 !important; }'
             // 'body.show-topbar div#details-pane-outer { margin-top:0 !important; }',
            ].join("\n"));
          }
          setcss(name, style.join("\n"));
          break;
        case 'widget':
         style = [
          'div.tweetfilter { clear:both; font-family:Arial,"Helvetica Neue",Helvetica,sans-serif; }',
          /* "Filtered"-Link */
          'div.tweetfilter a.stream-filter-invert { cursor:pointer; color: #text !important; }',
          'div.tweetfilter a.stream-filter-invert:hover { color: #link !important; }',
          'div.tweetfilter a.stream-filter-invert > span > span { font-size:13px; font-weight:bold; color:#link; }',
          /* Filter display toggle */
          'div.tweetfilter a.option { display:inline-block; margin-right:5px; background:#link; border:1px solid #link; color:#fill; cursor:pointer; padding: 0 5px; font-size:10px; -moz-border-radius: 7px; -webkit-border-radius:7px; border-radius:7px;}',
          'div.tweetfilter a.option:hover { border: 1px solid #link; text-decoration:none; }',
          'div.tweetfilter a.version { font-size:10px; line-height:24px; }',
          'div.tweetfilter span.tweetfilter-menu { display:block; } ',
          'div.hide-options.hide-filters span.tweetfilter-menu, ',
          'div.hide-options.hide-filters a.version { display:none; }',
          'div.hide-options.hide-filters:hover span.tweetfilter-menu { display:block; }',
          'div.hide-options.hide-filters:hover a.version { display:inline-block; }',
          'div.hide-options a.option.hide-options,',
          'div.hide-filters a.option.hide-filters { background:#fill; border: 1px solid #fill; color: #link; }',
          'div.tweetfilter h2, div.tweetfilter h3 { font-family:"Helvetica Neue",Helvetica,Arial,Sans-serif; color:#link; font-size:16px; font-weight:300; padding:0; overflow:hidden; margin:0; }',
          'div.tweetfilter h3 { font-size:14px; }',
          'div.tweetfilter a { cursor:pointer; }',
          'div.tweetfilter h2.sidebar-title > span { float:left; width: 50%; vertical-align:middle; }',
          /* "add to filter"-input */
          'div.tweetfilter input.switch { float:left; background:#fff; border:1px solid #lighttext; color:#text; }',
          'div.tweetfilter input.switch.add { }',
          'div.tweetfilter input.switch.exclude { background:#text; color:#fff; }',
          'input#tweetfilter-word-add { border:1px solid #lighttext; color:#lighttext; width:120px; padding:4px 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; }',
          'input#tweetfilter-word-add.active { border-color: #darktext; color:#darktext; }',
          /* filter word list */
          'div.hide-filters div.tweetfilter-words { display:none; }', /* collapse filter */
          'div.tweetfilter-words ul ul { margin:0; overflow:hidden; padding:2px 0; }',
          'div.tweetfilter-words ul ul * { margin:0; padding:0;}',
          'div.tweetfilter-words ul ul li { display:block; position:relative; float:left; line-height:20px; height:20px; width:33%; overflow:hidden; cursor:pointer; }',
          'div.tweetfilter-words ul ul li:hover { color:#link; }',
          'div.tweetfilter-words ul ul li label { white-space:nowrap; font-size:12px; position:absolute; left:0; right: 25px; overflow:hidden;   }',
          'div.tweetfilter-words ul li.users label { font-weight:bold; }',
          'div.tweetfilter-words ul li.sources label { font-style:italic; }',
          'div.tweetfilter-words ul ul li a {  font-size:10px; cursor:pointer; color:#text; position:absolute; right:5px; top:0; bottom:0; line-height:8px; }',
          'div.tweetfilter-words ul ul li:hover a { color:#link; text-decoration:none; }',
          'div.tweetfilter-words ul ul li sup,',
          'div.tweetfilter-options sup { font-size:9px; color: #link !important; }',
          'div.tweetfilter-words ul ul li sup { position:absolute; right: 13px; top:0; bottom:0; }',
          'div.tweetfilter-words ul ul input[type=checkbox] { width: 10px; height: 13px; padding: 0; left:4px; margin-right:5px; vertical-align: middle; position: relative; top: -1px; }',
          'ul.tweetfilter-list { padding-bottom:0; }',
          'a.tweetfilter-status { color:#lighttext; font-size:11px; margin-left:15px; }',
          'div.tweet-activity { width:100%; }',
          /* add to filter menu */
          '.main-content ul.tweetfilter-menu { display:block; width:auto !important; position:absolute; top: 12px; }',
          '.main-content ul.tweetfilter-menu li { font-size:11px; padding:3px 8px; white-space:nowrap; }',
          '.main-content ul.tweetfilter-menu li.user a { font-weight:bold; }',
          '.main-content ul.tweetfilter-menu li.source a { font-style:italic; }',
          '.main-content ul.tweetfilter-menu li.selection a { display:inline-block; margin-left:3px; }',
          '.main-content ul.tweetfilter-menu li.selection i { color:#lighttext; font-weight:bold; }',
          '.main-content ul.tweetfilter-menu li.selection:hover { background:transparent; }',
          '.main-content ul.tweetfilter-menu li.selection:hover a { color:#link; }',
          /* options menu */
          'div.hide-options div.tweetfilter-options { display:none; }', /* hide options */
          'div.tweetfilter-options { padding:0; margin: 0; overflow:hidden; }',
          'div.tweetfilter div.tweetfilter-options h3 { padding:5px 0; margin: 0; }',
          'div.tweetfilter-options > ul { list-style:none; padding:0; margin:0; overflow:hidden;  }',
          'div.tweetfilter-options ul ul { padding-left:5px;  overflow:hidden;  }',
          'div.tweetfilter-options * ul li { float:left; width:50%; }',
          'div.tweetfilter-options > ul:first-child { margin-right:10px; }',
          'div.tweetfilter-options > ul > li { line-height:1.5em; }',
          'div.tweetfilter-options > ul > li > label { color: #text; }',
          'div.tweetfilter-options li.timeline { padding-top: 5px;}',
          'div.tweetfilter-options li.ui { padding-top: 5px; }',
          /* back to top */
          'div.stream-navigation { position:fixed; z-index:10; bottom:0; background:white; padding: 2px 5px; border:1px solid #EBEBEB; -moz-box-shadow: 0 1px 4px #999999; -webkit-box-shadow: 0 1px 4px #999999; border-bottom:0; -moz-border-radius:5px 5px 0 0; -webkit-border-radius:5px 5px 0 0;}',
          'div.stream-navigation img { display:inline-block; cursor:move; line-height:30px; vertical-align:middle; margin:0 5px; }',
          'div.stream-navigation a { outline:0; }',
          /* via link */
          '.main-content .stream-item .tweet-source a { color:#lighttext; }',
          '.main-content .stream-item .tweet-source a:hover { color:#link; }',
          '.main-content .stream-item-content span.tweetfilter-add { visibility:hidden; position:relative; }',
          '.main-content .stream-item-content:hover span.tweetfilter-add, .main-content .focused-stream-item .stream-item-content span.tweetfilter-add { visibility:visible; }',
          /* add to filter links */
          '.main-content .stream-item span.tweetfilter-add a { font-size: 11px; color:#link; }',
          '.main-content .stream-item span.tweetfilter-add:hover i { color: #666; }',
          '.main-content .stream-item span.tweetfilter-add:hover a { color: #link; }',
          '.main-content .stream-item.'+css.reply+' { border-left: 3px solid #light; }',

          '.main-content .stream-item i.'+css.mutual+' { position:absolute; top:3px; left:0; color: #link; visibility:hidden; font-size: 18px; width: 14px; }',
          '.main-content .stream-item span.tweetfilter-add i { background:0 !important; color:#lighttext; margin-left:4px; text-indent:0 !important; text-align:center; font-weight:bold; font-style:normal; font-size:14px;}',
        ].join("\n");
        for (var c in user.color) {
          style = style.split('#'+c).join(user.color[c]);
        }
        setcss(name, style);
        break;
      }
    }
    if (which.length) {
      refreshcounter();
    }
  }

  function regescape(str) { //escape for regular expression
    return str.replace(/\.\*\+\?\|\(\)\[\]\{\}\\/g, '\\$1');
  }

  function encodehtml(str) {
    if (defined(str, "string")) {
      str = str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return str;
  }

  function decodehtml(str) {
    if (defined(str, "string")) {
      str = str.replace(/&gt;/ig, ">").replace(/&lt;/ig, "<").replace(/&#039;/g, "'").replace(/&quot;/ig, '"').replace(/&amp;/ig, '&');
    }
    return str;
  }


  var storage = {
    available: !!window.localStorage && !!JSON,

    get: function(name, defaultvalue) {
      if (storage.available) {
        var value = localStorage.getItem(name);
        return defined(value, 'string') ? JSON.parse(value) : defaultvalue;
      }
      return false;
    },

    set: function(name, value) {
      if (storage.available) {
        if (value === null) {
          localStorage.removeItem(name);
          return null;
        } else {
          localStorage.setItem(name, JSON.stringify(value));
          return storage.get(name);
        }
      }
      return false;
    }

  }; //storage


  /* debug functions */

  if (DEBUG) {
    function _E(msg) {try {if (defined(window.console)) console.log(msg)} catch (e) { }}
    function _W(msg) {try {if (defined(window.console)) console.warn(msg)} catch (e) { }}
    function _I(msg) {try {if (defined(window.console)) console.info(msg)} catch (e) { }}
    function _F(fctname, args) {try {if (defined(window.console)) console.log('function '+fctname+':', args)} catch (e) { }}
    function _(msg) {try {console.log(msg)} catch (e) { }}
  } else {
    var foo = function() {};
    var _E=foo, _W=foo, _I=foo, _F=foo, _=foo;
  }


  /* common purpose */

  function emptyobj(o) {
    for (var i in o) {
      return false;
    }
    return true;
  }

  function defined(v, t) {
    return (typeof t == 'string') ? typeof v == t : typeof v != 'undefined';
  }
                                                                                                    _('tweetfilter script attached.');
  initialize();

} //tweetfilter

if (window.top == window.self && //don't run in twitter's helper iframes
   window.location.toString().match(/^https?\:\/\/twitter\.com\//) && //only run on twitter.com
  !document.getElementById('tweetfilter_script'))  //don't inject multiple times (bookmarklet)
{
  var tweetfilter_script = document.createElement("script"); //create new <script> element
  tweetfilter_script.id = 'tweetfilter_script';
  tweetfilter_script.text ="(function"+ //closure function
    tweetfilter.toString().substr(20)+"\n"+ //attach our load function
  ')()'; //execute closure function
  document.body.appendChild(tweetfilter_script); //inject the script
}