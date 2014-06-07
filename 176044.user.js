// ==UserScript==
// @name        OKCupidHacks
// @namespace   overkill_gm
// @description my stupid okcupid hacks: visit history
// @homepage    http://userscripts.org/scripts/show/176044
// @include     http*://*.okcupid.com/*
// @version     0.2.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require     https://rawgithub.com/timrwood/moment/2.1.0/min/moment.min.js
// @grant       GM_addStyle
// ==/UserScript==

// Profile History
function ProfileHistory() {
  // properties
  this.data = null;
  this.last = 0;

  // init
  this.load();
}

// load data from storage backend
ProfileHistory.prototype.load = function() {
  var visited = unsafeWindow.localStorage.getItem('visited') || '{}';
  visited = JSON.parse(visited);
  this.data = visited;
  this.last = visited.last || 0;
};

// save data to storage backend
ProfileHistory.prototype.save = function() {
  console.log('saving', this.data);
  this.data.last = this.last;
  unsafeWindow.localStorage.setItem('visited', JSON.stringify(this.data))
};

ProfileHistory.prototype.push = function(profile) {
  var id = +profile.userid;
  if (id === this.last) {
    // don't create
    console.log('you were just looking at ' + profile.screenname)
    return;
  }
  if (!this.data[id]) {
    this.data[id] = {id: id, visits: [], visible: []};
  }
  this.data[id].screenname = profile.screenname;  // always update the screenname
  this.data[id].visits.push(Date.now());
  this.last = id;
  this.save();
};

// mark `last` as a public visit. Only useful if you're private browsing under A List
ProfileHistory.prototype.mark = function() {
  // assert Number(unsafeWindow.Profile.userid) === this.last
  var entry = this.data[this.last],
      timestamp = entry.visits[entry.visits.length - 1];
  if (entry.visible.indexOf(timestamp) === -1) {
    entry.visible.push(timestamp);
    this.save();
  }
}

// get the history data for an id
ProfileHistory.prototype.getHistoryForId = function(id) {
  id = Number(id);
  var raw_data = this.data[id] || {};
  return this.data[id] || [];
};

// get the history data for a screenname
ProfileHistory.prototype.getHistoryForName = function(screenname) {
  var key, value;
  // can't use `for each ... in` if we want chrome compatibility
  for (key in this.data) {
    value = this.data[key];
    if (value.screenname === screenname) {
      return value;
    }
  }
};

// remove a visit from history.
//
// Useful if you have many visits in a short time span and just want to record
// one of them.
//
// wishlist: if no `time`, clear all from `id`
// withlist: if no `id`, clear all
ProfileHistory.prototype.cleanEntry = function(id, time) {
  var entry = this.data[id], idx;
  idx = entry.visits.indexOf(time);
  if (idx >= 0) {
    entry.visits.splice(idx, 1);
  }
  idx = entry.visible.indexOf(time);
  if (idx >= 0) {
    entry.visible.splice(idx, 1);
  }
  this.save();
};


// format timestamps for readability
var visitStr = function(x){ return moment(new Date(x)).format('MM-DD H:mm'); };

// build visit history html
var buildHistoryHTML = function(visitData, className){
  className = className || '';
  var $container = $('<div class="' + className + '"/>');
  var $list = $('<ul/>').appendTo($container);
  visitData.visits.forEach(function(x){
    var isVisible = visitData.visible.indexOf(x) !== -1,
        $item = $('<li data-time="' + x + '" data-userid="' + visitData.id + '">' +
                  '<p>' + (isVisible ? '<span class="bullet">•</span> ' : '') + visitStr(x) + '</p>' +
                  '</li>');
    $item
      .on('dblclick', function(){
        profilehistory.cleanEntry(visitData.id, x);
        $item.remove();
      })
      .prependTo($list);
  });
  $container.prepend('<h4>Last Visited ' + visitData.screenname + '</h4>')
  return $container;
};


// profile page logic
var profileView = function() {
  var p = unsafeWindow.Profile;
  if (!p) return;
  if (p.self_view) {
    console.log('stop looking at yourself')
    return;
  }

  profilehistory.push(p);

  $('#visit_button .btn').on('click', function() {
    profilehistory.mark(p);
  });

  var visitData = profilehistory.getHistoryForId(p.userid);
  buildHistoryHTML(visitData, "section favorites")
    .appendTo($('#left_bar > div.block_outer_wrapper'));
};


// ********************
// * match page logic *
// ********************
var matchView = function() {
  var appendRowHistory = function(){
    var $this = $(this);
    if ($this.hasClass('has_history')) {
      return;
    }
    var name = $this.find('div.username > a').html().trim(),
        visitData = profilehistory.getHistoryForName(name);
    if (!visitData) {
      // assume that visitData.visits.length > 0
      return;
    }
    $this.addClass('has_history');
    var $container = buildHistoryHTML(visitData);
    $container.appendTo($this.find('div.essay'));
  };

  $('#match_results div.match_row').each(appendRowHistory);
  $('#match_results').on("DOMNodeInserted", "div.match_row", function(e){
    if (e.target == this){
      appendRowHistory.call(this);
    }
  });
  GM_addStyle('div.match_row { background: lightcyan; } div.has_history { background: #FAFAFA; } ');
};


// main() and route

// disable call to actions
GM_addStyle('#likeonfacebook, #upgrade_form { display: none; }');


// make clicking on user activity take you directly to their photos
$('#match_results').on('click', 'p.activity', function(e){
  var href = $(this).closest('div.user_info').find('a').attr('href');
  window.open(href.replace('?', '/photos?') + '_indirect');
});
GM_addStyle('div.match_row p.activity { cursor: pointer; }');


var profilehistory = new ProfileHistory();  // unsafeWindow.zz = profilehistory;
var bodyId = {
      p_match: matchView,
      p_profile: profileView
    },
    action;
if (action = bodyId[document.body.id]) { action(); }


// Who ignored you recently
/*
GM_addStyle(
  '#user_pane.hastips #pane_tips { height: auto !important; }' +
  '#pane_tips .thumbs { overflow: visible; }' +
  '#pane_tips .thumbs a.match { float: none; }' +
  '.pane .card { position: static; }' +
  '#user_pane.rows_1 .thumbs, #user_pane.rows_2 .thumbs, #user_pane.rows_3 .thumbs { height: auto; }' +
  '#pane_tips .thumbs a.match { display: block !important; position: relative; transition-property: width; transition-duration: 100ms; }' +
  '#pane_tips .thumbs a.match:hover { height: auto; width: 100%; }' +
  '#pane_tips .thumbs a.match img { height: auto; width: 100%; }' +
  '#pane_tips .thumbs a.match > q { position: absolute; left: 3.2em; top: 0; }' + // XXX
  '#pane_tips .thumbs a.unread > q { color: white; }' +
  '#pane_tips .thumbs a.match .history { display: none; line-height: 1; }' +
  '#pane_tips .thumbs a.match:hover .history { display: block; }' +
  ''
);
$('#pane_tips .thumbs a.match img')
  .attr('src', function() {
    return this.src.replace('60x60', '160x160');  // 82x82 160x160
  })
  .each(function() {
    var $a = $(this).parent(),
        name = $a[0].id.substr(3);
        visitData = profilehistory.getHistoryForName(name);
    $a.append('<q>' + name + '</q>');
    if (visitData) {
      $a.append(buildHistoryHTML(visitData, 'history'));
    } else {
      $a.addClass('unread');
    }
  });
*/
