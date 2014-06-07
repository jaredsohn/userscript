// ==UserScript==
// @name           Rllmuk Forum Jump
// @namespace      https://github.com/insin/greasemonkey
// @description    Replaces the (not) Quick Navigation widget at the foot of topics with a forum jump dropdown
// @include        http://rllmukforum.com/*
// @include        http://www.rllmukforum.com/*
// ==/UserScript==

var quickNav, topicControls

quickNav = document.querySelector('div.topic_controls #quickNavLaunch')
if (!quickNav) {
  topicControls = document.querySelector('div.topic_controls.clear')
  if (!topicControls) {
    return
  }
}

var jumpHTML =
 '<select>\
     <option value="http://www.rllmukforum.com/index.php?/forum/43-rllmuk-news/" style="font-weight: bold;">rllmuk News</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/7-rllmuk-supporters-club/">---Rllmuk Supporters\' Club</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/79-election-2011/">------Election 2011</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/69-election-2010/">------Election 2010</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/9-announcements-and-feedback/">---Announcements and Feedback</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/62-archive/">------Archive</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/44-rllmuk-gaming/" style="font-weight: bold;">rllmuk Gaming</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/3-discussion/">---Discussion</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/17-online/">---Online</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/39-halo/">------Halo</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/48-tournament/">---------Tournament</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/40-steam/">------Steam</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/41-world-of-warcraft/">------World of Warcraft</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/57-eve-online/">------Eve Online</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/59-call-of-duty/">------Call of Duty</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/60-football-league/">------Football League</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/65-street-fighter-4/">------Street Fighter 4</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/68-online-racing/">------Online Racing</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/77-starcraft-2/">------Starcraft 2</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/16-retro-arcade-gaming/">---Retro &amp; Arcade Gaming</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/51-poker-room/">---Poker Room</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/25-development/">---Development</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/23-high-scores/">---High Scores</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/22-reviews/">---Reviews</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/78-gaming-unplugged/">---Gaming Unplugged</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/46-rllmuk-community/" style="font-weight: bold;">rllmuk Community</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/14-off-topic/">---Off Topic</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/4-ask-the-forum/">---Ask the Forum</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/63-building-pcs/">------Building PCs</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/29-film-tv-radio/">---Film, TV &amp; Radio</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/31-music/">---Music</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/64-arts-literature/">---Arts &amp; Literature</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/42-creative-design/">---Creative Design</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/38-food-drink/">---Food &amp; Drink</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/70-health-and-fitness/">---Health and Fitness</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/24-meets/">---Meets</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/45-market-place/" style="font-weight: bold;">Market Place</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/11-trading/">---Trading</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/27-wanted/">---Wanted</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/32-bargains/">---Bargains</option>\
     <option value="http://www.rllmukforum.com/index.php?/forum/66-feedback/">---Feedback</option>\
  </select>'

var span = document.createElement('span')
span.innerHTML = jumpHTML
var jump = span.firstChild
jump.addEventListener('change', function(e) {
  window.location.href = this.value
})

if (quickNav) {
  quickNav.parentNode.replaceChild(span, quickNav)
}
else if (topicControls) {
  var div = document.createElement('div')
  div.className = 'topic_controls clear'
  div.style.textAlign = 'right'
  div.style.marginTop = '3px'
  div.appendChild(span)
  topicControls.parentNode.insertBefore(div, topicControls.nextElementSibling)
}
