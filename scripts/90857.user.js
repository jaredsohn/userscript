// ==UserScript==
// @name            NicerKongregate
// @namespace       http://www.brainassassin.com/
// @description     Makes Kongregate a nicer place (removes a few ads and re-arranges stuff).
// @include         http://www.kongregate.com/
// @include         http://www.kongregate.com/game*
// @include         http://www.kongregate.com/forums*
// @include         http://www.kongregate.com/badges*
// @include         http://www.kongregate.com/*-games*
// @include         http://www.kongregate.com/collabs*
// @include         http://www.kongregate.com/games/*/*
// @include         http://www.kongregate.com/accounts/*
// @include         http://www.kongregate.com/my_favorites*
// @include         http://www.kongregate.com/badge_quests/*
// @include         http://www.kongregate.com/announcements*
// @include         http://www.kongregate.com/accounts/leaders*
// @include         http://www.kongregate.com/accounts/*/fans*
// @include         http://www.kongregate.com/accounts/*/friends*
// @include         http://www.kongregate.com/accounts/*/rewards*
// @include         http://www.kongregate.com/accounts/*/favorites
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version         1.1.1
// ==/UserScript==

var badgeCache = {};
var sPrefix = "Kongregate.com | ";
var css = "#category .category_badges_listing {background-color:#CCCCCC;} \
           #category .badge_row {background-color:#FFD8D8;} \
           #category .badge_completed {background-color:#E8FFD8;} \
           DIV.adcontainer {display:none;} \
           #category .badges_set1 {width:auto;} \
           #category .badges_set1 .badge_row {float:left;} \
           #category .category_listing_header {min-height:29px; padding:0 6px;} \
           #category .category_listing_header h1 {padding:4px 0 0 1px; margin:0;} \
           #filter_by {width:100px !important;} \
           #sort_order {width:140px !important;} \
           #category .category_listing_header select {height:17px;} \
           #feature .homepageads, .horizontal_ad, .adspacer, #primarywrap div[id$='-ad-slot'], .adcontainer {display:none !important;} \
           .badge_difficulty {-moz-border-radius:8px 8px 8px 8px; float:right; height:13px; left:31px; position:absolute; top:31px; width:13px;} \
           .badge_EASY, .badge_MEDI, .badge_HARD, .badge_IMPO {-moz-border-radius:8px 8px 8px 8px; float:right; height:13px; left:31px; position:absolute; top:31px; width:13px; background:none no-repeat scroll 0 0 #990000;} \
           .badge_EASY {background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAAA8SURBVChTY5zJwPCfgVQA0kQqZkDW8B8PQFaHVRMhmwdYE7rX0J07wM4jK/SwRRfOeCJkA0weJSCI1QQAHchGyXwV0W0AAAAASUVORK5CYII=');} \
           .badge_MEDI {background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAABtSURBVChTY5zJwPCfgVQA0kQqZkDW8B8K9kREgA06mJoKE0IxGKumq9OngxWBaBhANhyrJpDCpXJycA0gBkFNx4uL/8Mw0TZtdnICq93u60u881aoqYEVr9bXJ14TthAl6CfaayI2ZaDEE7GaAMP4ZCfVTVDwAAAAAElFTkSuQmCC');} \
           .badge_HARD {background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAAAySURBVChTY5zJwPCfgVQA0kQqZkDW8B8KCIkNRU0wvyHTyP4cin4iKZ6ITRkoAUGsJgBsoFeFJkDXCAAAAABJRU5ErkJggg==');} \
           .badge_IMPO {background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAAA2SURBVChTY5zJwPCfgVQA0kQqZkDX8B8HQFaHoQkmCdOLzRWjmqDRQ52AoCie8KUSnM7DpwkAE6s4cbWZc84AAAAASUVORK5CYII=');} \
           .badgeInfo {position:absolute; border:thin solid black; width:91px; height:13px; background-color:red; color:#ffffff; font:0.9em 'Lucida Grande',Verdana,Arial,Sans-serif;} \
           .notBadginated, .badginated {border:1px solid #000000; height:13px; left:0; position:relative; top:0; width:13px;} \
           .badginated {background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAABOSURBVChTY1SrZ/jPQCoAaSIVM5CqAewymCavKdr/8YG5R3vhLsKqCWQAzLCEha5ws2Bi1NOE7kxkp+H008A5D+RcrKFHSnxRFrmk2AQAm4Bgs3hq5XkAAAAASUVORK5CYII=') no-repeat scroll 0 0 #267F00;} \
           .notBadginated {background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAABOSURBVChTY5zJwPCfgVQA0kQqZiBVA9hlME2rtLX/4wMXe3vhLsKqCWQAzLAtrq5ws2Bi1NOE7kxkp+H008A5D+RcrKFHSnxRFrmk2AQAPXxbUD16cWwAAAAASUVORK5CYII=') no-repeat scroll 0 0 #990000;}";

String.prototype.trim = function(){
  var	str = this.replace(/^\s\s*/, ''),	ws = /\s/, i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
};

String.prototype.capitalize = function(){
  return this.replace(/(^|\s)([a-z])/g, function(m,p1,p2) {
    return p1+p2.toUpperCase();
  });
};

function improveHistory() {
  css += "\ntable[class='rewards'] thead tr:first-of-type {background-color:#990000; color:#ffffff; font-variant:small-caps; font-family:verdana,arial,sans-serif;} \
          body#report #secondary ul.pagination {margin:0;} \
          #report.mypoints #subwrap {padding:15px 0 0 0;} \
          #primarywrap {padding:0 0 15px 0;}";
  $('#secondary').find('table.rewards tr.summary').insertBefore('table.rewards tr.even:first-of-type');
}

// remove emty URLS (url = "http://")
function improveLeaders() {
  css += "\ntable[class='leaders'] thead tr:first-of-type {background-color:#990000; color:#ffffff; font-variant:small-caps; font-family:verdana,arial,sans-serif;} \n" +
         "#subwrap {padding:15px 0 0 0;}";
  $('table.leaders a[href="http://"]').replaceWith(function() { return this.innerHTML; });
}

// rearrange quick-pick and leaderboards
function improveMain() {
  css += "\n#leaderboards .tabset td {padding:3px 0;} \
          #leaderboards .freightheader {margin-top:0;} \
          #leaderboards {float:left; margin-left:10px;} \
          #leaderboards p.challenge_padding {text-align:right;} \
          #leaderboards .spritehome {background-image:url('data:image/png;base64,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');} \
          #home #leaderboards h2 a {background-position:0 0; margin-bottom:7px;} \
          #quick-pick-container {margin-bottom:18px; margin-left:10px; width:281px;} \
          dl.tabset dt.dormant a {height:25px;} \
          dl.tabset dt.active a {height:27px;}";
  $("#primarywrap").removeAttr("style");
  $('#quick-pick-container').insertAfter($('#featuredgame'));
  $('#leaderboards').insertAfter($('#quick-pick-container'));
  checkForBadges('#secondary');
  $('#update-button').find('a.spritehome.spriteall').bind('click', function() {
    var t = setTimeout(expandLink, 1300);
  });
}

function expandLink() {
  var $url = $('#random_game').find('a:first');
  if ($url.length) {
    if ($url.text().trim().indexOf("...") > -1) {
      var linkText = $url.get(0).pathname;
      linkText = linkText.substring(linkText.lastIndexOf("/") + 1).replace(/\-/g, " ");
      $url.text(linkText.capitalize());
    }
  }
};

// remove "Play:" from game title
// remove "Scores" from floating_game_holder header
// remove background from #primarywrap
function improveGames() {
  var $header = $('#gamepage_header h1');
  css +=  "\n#gamepage_header {height:60px;} \
           body#play #gamepage_header {height:40px;} \
           body#play #gamepage_header h1 {width:auto; height:25px;} \
           #gamepage_header .game_title {display:block;font-size:1.5em;font-weight:bold;}";

  if ($header.length) {
    $header.find('.game_title').insertBefore($header);
    $header.remove();
    $('#quicklinks').find('li.scores').remove();  
    checkForBadges('#recommendedgames');
  }
  $('#primarywrap').css('background', 'none');
}

// add icons displaying difficulty to the badge icons
// preserve sort order & filter
function improveBadges() {
  $('.badge_border', '#feature div.category_badges_listing').each(function() {
    var badge = getBadgeIcon($(this).parents('.badge_row').attr('title'));
    $('<div class="' + badge + '"></div>').appendTo($(this));
  });

  $('#browser_sidebar ul>li>a').click(function () {
    var filter = $('#filter_by option:selected').attr('value'), sortOrder = $('#sort_order option:selected').attr('value');
    // preserve sort order
    this.href += ((this.search!=""?"&":"?") + "sort=" + sortOrder);
    if (filter != "all") {
      // preserve filter
      if ($(this).parents('.browser_gamegroups').length == 0) this.href += "&filter_by=" + filter;
    }
  });
}

// add icons displaying difficulty to the badge icons on the profile page
function improveProfileBadges() {
  $('span.complete', '#achievements > .badge_list .badge_border').each(function() {
    var moText = $(this).attr("onMouseover").toString();
    var pattern = /(userbadges-[0-9]+_details)/;
    if (moText.match(pattern)) {
      var badge = getBadgeIcon($('#' + RegExp.$1 + ' .bd > .badge_name').text());
      $('<div class="' + badge + '"></div>').prependTo(this.parentNode);
    }
  });
}

function getBadgeIcon(elmText) {
  var badge = "";
  if (elmText.search(/easy/i) > -1)
    badge = "badge_EASY";
  else if (elmText.search(/medium/i) > -1)
    badge = "badge_MEDI";
  else if (elmText.search(/hard/i) > -1)
    badge = "badge_HARD";
  else if (elmText.search(/impossible/i) > -1)
    badge = "badge_IMPO";
  return badge;
}

function setDocTitle(sTitle) {
  var sNewTitle = sPrefix, tmp;
  if (sTitle == "/")
    sNewTitle = sNewTitle.substring(0, 14);
  else if (sTitle.indexOf("/badges") > -1) {
    tmp = $('#browser_sidebar ul li.active a.browser_sprite').text();
    if (tmp == $('#browser_sidebar ul li:first a.browser_sprite').text())
      sNewTitle += tmp;
    else
      sNewTitle += tmp + " Badges";
  } else if (sTitle.indexOf("/card_album") > -1)
    sNewTitle += "Card Album";
  else if (sTitle.indexOf("/current_challenges") > -1)
    sNewTitle += "Current Challenges";
  else if (sTitle.indexOf("/games/") > -1)
    sNewTitle += $('#gamepage_header .game_title').text();
  else if (sTitle.indexOf("/games") > -1 || sTitle.indexOf("-games") > -1 || sTitle.indexOf("/my_favorites") > -1 || sTitle.indexOf("/game_groups/") > -1)
    sNewTitle += $('#browser_sidebar ul li.active a.browser_sprite').text();
  else if (sTitle.indexOf("/forums") > -1)
    sNewTitle += "Forums";
  else if (sTitle.indexOf("/accounts/") > -1) {
    if (sTitle.indexOf("/friends") > -1)
      sNewTitle += "My Friends";
    else if (sTitle.indexOf("/fans") > -1)
      sNewTitle += "My Fans";
    else if (sTitle.indexOf("/rewards") > -1)
      sNewTitle += "My Points";
    else if (sTitle.indexOf("/leaders") > -1)
      sNewTitle += "Point Leaders";
  } else if (sTitle.indexOf("/collabs") > -1)
    sNewTitle += "Art & Sound";
  document.title = sNewTitle;
}

function prepSite() {
  var path = location.pathname.toLowerCase().trim();
  if (path == "/")
    improveMain();
  else if (path == "/accounts/leaders")
    improveLeaders();
  else if (path.indexOf("/accounts/") > -1 && path.indexOf("/rewards") > -1)
    improveHistory();
  else if (path.indexOf("/accounts/") > -1 && path.indexOf("/favorites") > -1)
    checkForBadges('#feature');
  else if (path.indexOf("/accounts/") > -1)
    improveProfileBadges();
  else if (path.indexOf("/badge") > -1)
    improveBadges();
  else if (path.indexOf("/games/") > -1)
    improveGames();
  else {
    if (path.indexOf("games") > -1 || path.indexOf("my_favorites") > -1 || path.indexOf("/game_groups/") > -1) {
      checkForBadges('#feature');
    }
  }
  setDocTitle(location.pathname.toLowerCase());
}

// assign mouseover functions
function checkForBadges(context) {
  var $games = $(context).find('div.game.media');
  if ($games.length) $games.bind('mouseover', hasBadges);
}

// check whether a game has badges or not
function hasBadges() {
  var $me = $(this), URI = $me.find('a:first').get(0);

  if (badgeCache[URI]) return;
  badgeCache[URI] = 1;

  var $badgeInfo = $('<div class="badgeInfo"></div>').text('checking badges...').appendTo($me.find('dl.thumb dt'));
  GM_xmlhttpRequest({
    method: 'GET',
    url: URI,
    onload: function(responseDetails) {
      if (responseDetails.readyState == 4 && responseDetails.status == 200) {
        var pattern = /achievements_tab/;
        var hasAchievements = pattern.test(responseDetails.responseText);
        $badgeInfo.removeClass('badgeInfo').addClass(hasAchievements ? 'badginated' : 'notBadginated').text("");      
      }
    }
  });
}

function addNewStyle(myStyle) {
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(myStyle);
  } else if (typeof addStyle != "undefined") {
    addStyle(myStyle);
  } else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(myStyle));
      heads[0].appendChild(node);
    }
  }
}

if (unsafeWindow.top == unsafeWindow.self) {
  prepSite();
  addNewStyle(css);
}