// ==UserScript==
// @name           TweetFastTweetFurious
// @namespace      http://distilledb.com
// @description    Has your honor been scandalously impugned by an insolent whelp? Show that monstrous cad how you feel by challenging them to a TweetsOfFury battle, post-haste. Throw down the e-gauntlet and give those foppish dandies a deserving taste of their own bitter medicine!
// @version        0.2
// @include        http://twitter.com/
// @include        http://twitter.com/home
// @include        http://tweetsoffury.com/battles/new*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js  
// ==/UserScript==

// Some commonly used values.
const tofBattleUri = "http://tweetsoffury.com/battles/new";
const tofVictimKey = "tofVictim";
const locationToF  = "tweetsoffury.com";
const locationTw   = "twitter.com";
const cssClass     = "greasemonkey-tweetfasttweetfurious";

initialize();
run();

function initialize() {
  // Load jQuery if needed.
  (function () {
    if(typeof unsafeWindow.jQuery == 'undefined') {
      // Recursively call anonymous function.
      window.setTimeout(arguments.callee, 50);
    }
    else {
      $ = unsafeWindow.jQuery;
    }
  })();
}

// On Twitter, decorate status messages; on ToF, populate forms based on
// challenged users.
function run() {
  if (visitingTwitter()) {
    findTargets().each(function() {decorateStatusMessage(this)});
  }
  else if (visitingTweetsOfFury()) {
    var victimName = GM_getValue(tofVictimKey, '');
    GM_setValue(tofVictimKey, '');

    // Automatically supply the target's name.
    $("#battle_opponent_username").val(victimName);
  }
}

// Gets the list of candidate statuses.
function findTargets() {
  return $(".status .meta");
}

// Adds the ToF challenge-this-user link to status messages.
function decorateStatusMessage(e) {
  var victim = getVictimName(e);

  var container = $("<span>");
  container.attr('class', cssClass);
  container.attr('style', 'display: none;');

  // Separate the element from the rest of the status message.
  var separator = $("<span> &mdash; </span>");

  // Link to the ToF battle page. Use unsafeWindow so that we can set the clicked user
  // with Greasemonkey's property store.
  var challengeLink = $("<a>");
  challengeLink.attr('href', 'http://tweetsoffury.com/battles/new');
  challengeLink.attr('title', 'challenge that scurvy cur, ' + victim + '!');

  // Use safeWrap and play nice.
  challengeLink.click(safeWrap(function() {
    GM_setValue(tofVictimKey, victim);
  }));

  // [Show/hide] the ToF logo on mouse[over/out].
  challengeLink.hover(function() { $(this).parent().find("img").show() },
    function() { $(this).parent().find("img").hide() });

  // To arms!
  var challengeMessage = $("<span>challenge!</span>");

  // Use the ToF icon (permission granted by @reagent, @kvigneau -- thanks!).
  var challengeMessageImage = $("<img>");
  challengeMessageImage.attr('src', 'http://tweetsoffury.com/favicon.ico');
  challengeMessageImage.attr('style', 'vertical-align: middle; margin: 0 3px; display: none;');

  // Put it all together.
  challengeLink.append(challengeMessage);
  container.append(separator).append(challengeLink).append(challengeMessageImage);
  $(e).append(container);

  // [Show/hide] the challenge link on mouse[over/out].
  $(".status").hover(function() { $(this).find("." + cssClass).show(); },
    function() { $(this).find("." + cssClass).hide(); });
}

// Get a Twitter username given their status element.
function getVictimName(e) {
  var screenNameElement = $(e).parent().find(".screen-name")[0];

  // Regular expression to parse out the user name.
  var reName = $(screenNameElement).attr('href').match(/^https?:\/\/[^/]+\/(.*)/);
  if (reName) {
    return reName[1];
  } else {
    return '';
  }
}

// Determine whether the current location is Twitter or TweetsOfFury.
function currentLocation() {
  var l = window.location.host;
  if (l.search(locationToF) >= 0) { return locationToF; }
  if (l.search(locationTw) >= 0) { return locationTw; }
  return "unknown";
}

// Returns true if we're at TweetsOfFury.
function visitingTweetsOfFury() {
  return currentLocation() == locationToF;
}

// Returns true if we're at Twitter.
function visitingTwitter() {
  return currentLocation() == locationTw;
}

// Exposes Greasemonkey API to a specific function.
function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}