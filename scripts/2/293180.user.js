// ==UserScript==
// @name        [CFM] Quick menu
// @namespace   @Jordynl
// @description Cheese for Mice quick menu.
// @include     http://cheese.formice.com/forum/*
// @version     1
// @grant       none
// ==/UserScript==

$(".breadBoxTop").before('\
    <div class="secret_menu">\
        <ul id="nav" class="drop">\
          <li><B>CFM Quick Menu</B>\
            <ul>\
              <li><a href="http://cheese.formice.com/mice-leaderboard">Top Mice ➭</a>\
                <ul>\
                  <li><a href="http://cheese.formice.com/stat-change">Stats Change</a></li>\
                </ul>\
              </li>\
              <li><a href="http://cheese.formice.com/tribe-leaderboard">Top Tribes</a></li>\
              <li><a href="http://cheese.formice.com/search">Search ➭</a>\
                <ul>\
              <li><a href="http://cheese.formice.com/advanced-search">Advanced Search</a>\
                </ul>\
              </li>\
              <li><a href="http://cheese.formice.com/maps">Maps ➭</a>\
                <ul>\
                  <li><a href="/maps?list=P0">Standard Maps </a></li>\
                  <li><a href="/maps?list=P1">Protected Maps </a></li>\
                  <li><a href="/maps?list=P3">Bootcamp Maps </a></li>\
                  <li><a href="/maps?list=P4">Shaman Maps </a></li>\
                  <li><a href="/maps?list=P5">Art Maps </a></li>\
                  <li><a href="/maps?list=P6">Mechanism Maps </a></li>\
                  <li><a href="/maps?list=P7">No Shaman Maps </a></li>\
                  <li><a href="/maps?list=P8">Shaman Co-op Maps </a></li>\
                  <li><a href="/maps?list=P9">Miscellaneous Maps </a></li>\
                  <li><a href="/maps?list=P10">Survivor Maps </a></li>\
                  <li><a href="/maps?list=P13">Bootcamp Maps (P13) </a></li>\
                  <li><a href="/maps?list=P17">Racing Maps </a></li>\
                  <li><a href="/maps?list=P18">Defilante Maps </a></li>\
                  <li><a href="/maps?list=P22">Tribe House Maps </a></li>\
                  <li><a href="/maps?list=P32">Dual Shaman Maps </a></li>\
                  <li><a href="/maps?list=P41">Minigame Maps </a></li>\
                  <li><a href="/maps?list=P42">Racing Test Maps </a></li>\
                  <li><a href="/maps?list=P44">Deleted Maps</a></li>\
                </ul>\
                </li>\
              <li><a href="#">Game Info ➭</a>\
                <ul>\
                  <li><a href="http://cheese.formice.com/staff">Staff</a></li>\
                  <li><a href="http://cheese.formice.com/titles>Titles</a></li>\
                  <li><a href="http://cheese.formice.com/quotes3">Quotes</a></li>\
                  <li><a href="http://cheese.formice.com/skill-tree">Shaman Skill</a></li>\
                  <li><a href="http://cheese.formice.com/wiki/Main_Page">Wiki</a></li>\
                  <li><a href="http://cheese.formice.com/stats">Stats ➭</a>\
                    <ul>\
                      <li><a href="http://cheese.formice.com/currently-online">Community Stats</a></li>\
                      <li><a href="http://cheese.formice.com/stats">Mouse Stats</a></li>\
                      <li><a href="http://cheese.formice.com/bans">Bans</a></li>\
                      <li><a href="http://cheese.formice.com/transformice-stats">Transformice Stats</a></li>\
                    </ul>\
                  </li>\
                  <li><a href="http://cheese.formice.com/interviews">Interviews ➭</a>\
                    <ul>\
                      <li><a href="http://cheese.formice.com/interviews/tribe">Tribe Interviews</a></li>\
                    </ul>\
                  </li>\
                  <li><a href="http://cheese.formice.com/stat-visualizer">Graph ➭</a>\
                    <ul>\
                      <li><a href="http://cheese.formice.com/stat-visualizer">Mice</a></li>\
                      <li><a href="http://cheese.formice.com/tribe-stat-visualizer">Tribes</a></li>\
                    </ul>\
                  </il>\
                  <li><a href="http://cheese.formice.com/transformod-qa">Transformice Q&A</a></li>\
                  <li><a href="http://cheese.formice.com/online-mods">Online Mod List</a></li>\
                  <li><a href="http://cheese.formice.com/irc">IRC Webchat</a></li>\
                </ul>\
              </li>\
            </ul>\
          \
          <li>Online staff\
            <ul>\
              <li><a href="http://cheese.formice.com/online-mods">Online Moderators</a></li>\
              <li><a href="http://cheese.formice.com/mapcrew/online">Online Mapcrew</a></li>\
              <li><a href="http://cheese.formice.com/sentinel/online">Online Sentinels</a></li>\
              <li><a href="http://cheese.formice.com/helpers/online">Online Helpers</a></li>\
            </ul>\
          </li>\
        </ul>\
    </div>\
');

$("head").after('\
<style>\
ul#nav { width: 99.2%; text-decoration: none; padding: 3px; font: 13px/1.231 arial,helvetica,clean,sans-serif; font-family: arial,helvetica,clean,sans-serif; font-style: normal; font-variant: normal; font-weight: normal; font-size: 13px; ine-height: 1.231; font-size-adjust: none; font-stretch: normal; -x-system-font: none; -moz-font-feature-settings: normal; -moz-font-language-override: normal;}\
ul.drop a { display:block; color: #00243E; font-size: 14px; text-decoration: none;}\
ul.drop, ul.drop li, ul.drop ul { list-style:  block; margin: 0; padding: 0; background: #E6EAEE; color: #00243E;}\
ul.drop { position: relative; z-index: 597; float: left; border: 5px #232323; border-radius: 5px;}\
ul.drop li { float: left; line-height: 1.3em; vertical-align: middle; zoom: 1; padding: 5px 10px; }\
ul.drop li.hover, ul.drop li:hover { position: relative; z-index: 599; cursor: default;   }\
ul.drop ul { visibility: hidden; position: absolute; top: 100%; left: 0; z-index: 598; width: 195px; background: #D4E1EE; border: 1px solid #232323; }\
ul.drop ul li { float: none; }\
ul.drop ul ul { top: -1px; left: 100%; }\
ul.drop li:hover > ul {\
visibility: visible;\
opacity: 0.9;\
}\
.secret_menu{\
height: 33px;\
background: #E6EAEE !important;\
border: 1px solid rgba(49, 102, 158, 0.2);\
border-top-left-radius: 10px;\
border-top-right-radius: 10px;\
border-radius: 5px;\
margin: 2px;\
}\
');