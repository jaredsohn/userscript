// ==UserScript==
// @name                        Kronos css
// @namespace                   Lord Script
// @description                 Based on Kronos.
// @author                      Lord1982
// ==/UserScript==

/**** Fixes to the game's own broken css ****/

/* center the city names in the city dropdown again */
#cityNav .citySelect .dropbutton,
#cityNav .citySelect .optionList li {
  text-align: center;
}

/* Don't let the warehouse tooltips grow wider than necessary: */
#container #cityResources li .tooltip {
  padding: 4px 5px;
  white-space: nowrap;
  width: auto;
}
#container #cityResources li .tooltip .ellipsis {
  margin-left: 3px;
  position: relative;
}

/* Port view breaks its own tear-down resource costs: */
#port #container #mainview .contentBox01h .content ul.resources li {
  padding-left: 32px;
}

/* Fixes the shadow on the ugly tooltips */
#WzTtShDwR, #WzTtShDwB {
  background-color: #000 !important;
  opacity: 0.25 !important;
}

/* Fixes the chopped-off resource icons in military loot reports */
#militaryAdvisorReportView #battleReportDetail li {
  padding: 6px 0 2px 32px;
}

/* Fixes the broken warehouse tooltips in port view */
#port #container ul.resources li .tooltip .textLabel {
  position: static;
}

/* Fixes the layout of resource costs in shipyard/barracks */
#shipyard #container #mainview .unit .resources li,
#barracks #container #mainview .unit .resources li {
  float: none;
  padding-bottom: 5px;
}

/* Don't let the message padding / spacing be so *huuuuge* */
#diplomacyAdvisor #container #container2 #mainview table#messages td {
  /*max-width: 100px;*/
  padding: 2px 0;
  margin: 0 10px;
}
#diplomacyAdvisor #container #container2 #mainview table#messages td.reply {
  padding: 10px 0;
}
#diplomacyAdvisor #container #container2 #mainview table#messages td.msgText {
  padding: 2px 10px;
}

/* move ship indicator to the right?
#missionSummary .transporters {
  position: absolute;
  left: 518px;
  top: 6px;
  margin: 0;
}
*/

#wineends {
  top: 9px;
  right: 0;
  width: 4em;
  margin-right: -5em;
  position: absolute;
}

/**** Our own hacks ****/

/* rounded tab corners */
.militaryAdvisorTabs #tabz td.selected a,
.militaryAdvisorTabs #tabz td a:hover {
  background: #FEF7E5;
  -moz-border-radius: 10px 10px 0 0;
}

/* blue links draw so much attention */
li.owner a { color: inherit; }

#island #container #mainview #islandfeatures .wine {
  left: 165px;
  top: 150px;
}

/* don't overflow the upgrade pane when we add a whole date + timestamp: */
#container #resUpgrade.upgrading .time { font-weight:normal; white-space:pre; }
#container #resUpgrade.upgrading .time#upgradeCountDown { font-weight: bold; }

/* Our island resource column looks: */
#diplomacyAdvisor #mainview #messages .tradegood {
  background-position: center;
  background-repeat: no-repeat;
  height: 23px;
  width: 20px;
}

#diplomacyAdvisor #mainview #messages th.tradegood {
  background-image: url(/skin/layout/icon-island.gif);
  background-position: 0 2px;
}

#diplomacyAdvisor #mainview #messages .tradegood.W {
  background-image: url(/skin/resources/icon_worldmap_wine.gif);
}
#diplomacyAdvisor #mainview #messages .tradegood.M {
  background-image: url(/skin/resources/icon_marble.gif);
}
#diplomacyAdvisor #mainview #messages .tradegood.C {
  background-image: url(/skin/resources/icon_glass.gif);
}
#diplomacyAdvisor #mainview #messages .tradegood.S {
  background-image: url(/skin/resources/icon_worldmap_sulfur.gif);
}

#diplomacyAdvisor #mainview #messages .tt {
  white-space: nowrap;
  font-size: 11px;
}



/* the rounded corners around level numbers, and resources needed to build */

.rounded {
  background-color: #FDF8C1;
  -moz-border-radius: 1em;
  border: 2px solid #918B69; /*"#B1AB89"*/
  border-radius: 1em;
  font-family: Sylfaen, "Times New Roman", sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  width: 18px;
  cursor: pointer;
  height: 15px;
  visibility: visible;
  top: 10px;
  left: 25px;
  z-index: 50;
}

/* extra class for resources needed to build */
.resource-list {
  top: 32px;
  width: auto;
  height: 23px;
  white-space: pre;
  padding: 3px 5px 0;
  z-index: 1000;
}

.resource-list img { display: inline; }

/* correct positioning of the rounded corners around resource level numbers */
#islandfeatures .wood .rounded {
  margin-top: 9px;
  margin-left: -18px;
}
#islandfeatures .wine .rounded {
  margin-left: 8px;
  margin-top: 0px;
}
#islandfeatures .marble .rounded {
  margin-top: 18px;
  margin-left: 0px;
}
#islandfeatures .crystal .rounded {
  margin-top: 9px;
  margin-left: -8px;
}
#islandfeatures .sulfur .rounded {
  margin-top: 4px;
  margin-left: 10px;
}

/* The annotation about town hall's population */
#townhallfits {
  top: 1px;
  display: inline;
  margin-left: 4px;
  position: relative;
  vertical-align: top;
}

/* The smallish ellipsises, all over the place */
.ellipsis:before { content: "("; }
.ellipsis:after  { content: ")"; }
.ellipsis {
  bottom: 1px;
  margin-left: 1px;
  position: absolute;
  white-space: nowrap;
  font-size: 10px;
}

/* and the ones we add in port view: */
.ellipsis.price {
  position: static;
  vertical-align: top;
  margin-left: 3px;
  white-space: nowrap;
}
.ellipsis.buyable:hover {
  text-decoration: underline;
  cursor: pointer;
}

/* Our island quick links */
#changeCityForm .viewIsland a.island-link:hover { outline: 1px solid #FFF; }

#changeCityForm .viewIsland a.island-link {
  background: url(/skin/layout/icon-island.gif) no-repeat 0 1px;
  padding: 1px 8px 5px 9px;
  display: inline;
  height: 10px;
  width: 13px;
}

#changeCityForm .viewIsland #islandLinks {
  position: absolute;
  left: 43px;
  top: -20px;
}

#container #mainview table.table01 tr.own {
  background-color: #DEFF83;
}
#container #mainview table.table01 tr.own.alt {
  background-color: #CAE877;
}

.citySelect .optionList.expanded a.ellipsis:hover {
  text-decoration: underline;
}

/* in the ship movement view, don't pad the table so brutally much */
#merchantNavy #container #mainview table.table01 td {
  padding: 4px 0px;
}
#merchantNavy #container #mainview table.table01 td:first-child,
#merchantNavy #container #mainview table.table01 th:first-child {
  padding-left: 10px;
}
#merchantNavy #container #mainview table.table01 td:last-child,
#merchantNavy #container #mainview table.table01 th:last-child {
  padding-right: 10px;
}

#merchantNavy .arrow {
  vertical-align: text-top;
}

#container #container2 #cityResources .underline {
  position: relative;
  width: 57px; /* kissy wide menu should override to 75px */
  top: -6px;
}

#container #container2 #cityResources li.marble {
  background-position: 4px 3px;
}
#container #container2 #cityResources li.glass {
  background-position: 4px 4px;
}
#container #container2 #cityResources li.sulfur {
  background-position: 2px 3px;
}

.underline {
  left: 0;
}

#merchantNavy #mainview .underline {
  position: absolute;
  margin: 0 3px;
  bottom: -2px;
}

#container #container2 .underline div {
  background-image: none;
  height: 2px;
  float: left;
  width: 0;
  left: 0;
}

#merchantNavy #mainview .goods {
  display: inline;
  position: relative;
  bottom: 1px;
}

#merchantNavy .only.wood   { color: #BC9D3D; }
#merchantNavy .only.wine   { color: #94C; }
#merchantNavy .only.marble { color: #887663; }
#merchantNavy .only.glass  { color: #7DBFE0; }
#merchantNavy .only.sulfur { color: #E1BC4D; }

.underline .goods.wood   { background-color: #BC9D3D; }
.underline .goods.wine   { background-color: #94C; }
.underline .goods.marble { background-color: #887663; }
.underline .goods.glass  { background-color: #7DBFE0; }
.underline .goods.sulfur { background-color: #E1BC4D; }
.underline .goods.safe   { background-color: green; }
.underline .goods.loot   { background-color: pink; }
.underline .goods.last   { opacity: 0.3; }


/* plunder/blockade view */

#militaryscore {
  width: 66px;
  float: right;
  margin-top: 1px;
  margin-right: 34px;
  text-align: center;
}

div.cost {
  float: right;
  margin-right: 70px;
  width: 84px;
}

div.cost div {
  background-position: 0 4px;
  background-repeat: no-repeat;
  padding-left: 20px;
}

#offense { background-image: url(/skin/layout/sword-icon-report.gif); }
#defense { background-image: url(/skin/layout/shield-icon-report.gif); }

/**** Top panel improvements ****/

/* how much gold this city makes per hour; overwrites the action point arrow */
#income {
  background: transparent url(/skin/layout/bg_header.jpg) scroll -383px -66px;
  position: absolute;
  text-align: right;
  width: 54px;
  left: -1px;
  top: 38px;
}

/* abuses the corruption coin for negative incomes -- have a better one? */
#coin { position: absolute; width: 0px; }
#coin.positive { left: 54px; top: 34px; }
#coin.negative { left: 50px; top: 32px; }
#coin.positive:after { content: url(/skin/resources/icon_gold.gif); }
#coin.negative:after { content: url(/skin/icons/corruption_24x24.gif); }

/* don't overflow the city names onto new lines */
#cityNav .citySelect .optionList li {
  overflow: hidden;
  white-space: nowrap;
}

/* properly center city names in the city name dropdown */
#cityNav .citySelect .dropbutton, #cityNav .citySelect .optionList li {
  padding-right: 22px;
  position: relative;
}

#cityNav .citySelect .optionList li a.ellipsis:hover {
  text-decoration: underline;
}
#cityNav .citySelect .optionList li a.ellipsis {
  color: #542C0F;
  display: inline;
  position: absolute;
  margin-left: 3px;
  background: none;
}
#cityNav .citySelect .optionList li a.ellipsis.last {
  top: -2px;
}

html body div#container div#container2 a.text {
  text-decoration: underline;
  font-size: 12px;
  color: #542C0F;
}
html body div#container div#container2 a.text:hover {
  text-decoration: underline;
}


/* clearly mark when the shown city is not the city in the select box */
#cityNav .citySelect .dropbutton.not-mainview {
  opacity: 0.5;
}
#cityNav .citySelect .dropbutton.not-mainview.expanded {
  opacity: 1.0;
}


/* Get proper stacking, so names don't look silly near the marble quarry */
#island #container #mainview ul#islandfeatures li.marble { z-index: 400; }

/* Get proper stacking, so names don't hide behind the vineyard */
#island #container #mainview ul#islandfeatures li.wine { z-index: 0; }

/* As we make links of the resource pane, we need to keep the colours: */
#container #cityResources .resources a			{ color: #542C0F; }
#container #cityResources .resources .disabled a	{ color: #999999; }
#container #cityResources .resources .storage_full	{ color: #CC0000; }
#container #cityResources .resources .storage_danger	{ color: #CC3300; }

#container #cityResources #action-points {
  top: -49px;
  left: -67px;
}

/* city resources table */
#cityNav #citypanel {
  z-index: 1;
  display: none;
  cursor: default;
  position: absolute;
  width: 157px;
  left: 189px;
  top: 6px;
}

#cityNav #citypanel td, #cityNav #citypanel th {
  padding: 0;
  margin: 0;
}

#cityNav #citypanel tr td {
  background: url(/skin/layout/select_citynav.jpg) no-repeat -35px -96px;
  line-height: 24px;
  height: 24px;
  padding: 0 2px; /* makes it at least somewhat bearable in Firefox 2 */
}

/* current line */
#cityNav #citypanel .current td:first-child {
  padding-left: 6px;
  background-position: 0px -122px;
}
#cityNav #citypanel .current td {
  background-position: -35px -122px;
}
#cityNav #citypanel .current td:last-child {
  background-position: -125px -122px;;
}

.framed { display: none; }

/* current and first line */
#cityNav #citypanel .first.current td:first-child {
  padding-left: 6px;
  background-position: 0px -172px;
}
#cityNav #citypanel .first.current td {
  background-position: -35px -172px;
}
#cityNav #citypanel .first.current td:last-child {
  background-position: -125px -172px;
}

/* current and last line */
#cityNav #citypanel .current:last-child td:first-child {
  padding-left: 6px;
  background-position: 0px -200px;
}
#cityNav #citypanel .current:last-child td {
  background-position: -35px -200px;
}
#cityNav #citypanel .current:last-child td:last-child {
  background-position: -125px -200px;
}

/* first line */
#cityNav #citypanel .first td:first-child {
  padding-top: 2px;
  background-position: 0px -72px;
}
#cityNav #citypanel .first td {
  padding-top: 2px;
  background-position: -35px -72px;
}
#cityNav #citypanel .first td:last-child {
  padding-top: 2px;
  background-position: -125px -72px;
}

/* last line*/
#cityNav #citypanel tr:last-child td:first-child {
  padding-bottom: 2px;
  background-position: 0px -146px;
}
#cityNav #citypanel tr:last-child td {
  padding-bottom: 2px;
  background-position: -35px -146px;
}
#cityNav #citypanel tr:last-child td:last-child {
  padding-bottom: 2px;
  background-position: -125px -146px;
}

/* common */
#cityNav #citypanel tr td:first-child {
  background-position: 0px -98px;
}
#cityNav #citypanel tr td {
  background-position: -35px -98px;
}
#cityNav #citypanel tr td:last-child {
  background-position: -125px -98px;
}

#cityNav #citypanel tr:first-child th.building {
  position: relative;
  text-align: center;
  min-width: 27px; /* also adjust "td.building a" below, if changed */
}

#cityNav #citypanel tr:first-child th.building img {
  margin-top: 2px;
}

#cityNav #citypanel tr:first-child th.building.wall img {
  clip: rect(4px, 37px, 23px, 16px);
  position: absolute;
  margin-left: -26px;
  top: -3px;
}

/* Show building levels larger, hover extra jumbo large */
#cityNav #citypanel tr td.building a {       font-size: 16px; width: 27px; }
#cityNav #citypanel tr td.building a:hover { font-size: 22px; }

#cityNav #citypanel tr:first-child th {
  background-position: center center;
  background-repeat: no-repeat;
  min-width: 45px;
  height: 24px;
  top: 2px;
}

#cityNav #citypanel tr td   {
  position: relative;
}
#cityNav #citypanel tr td * {
  position: absolute;
  margin-top: -12px;
  z-index: 100;
  width: 45px; /* same as above min-width */
}

#cityNav #citypanel tr:first-child th.p {
  background-image: url(/skin/resources/icon_citizen.gif);
}
#cityNav #citypanel tr:first-child th.w {
  background-image: url(/skin/resources/icon_wood.gif);
}
#cityNav #citypanel tr:first-child th.W {
  background-image: url(/skin/resources/icon_wine.gif);
}
#cityNav #citypanel tr:first-child th.M {
  background-image: url(/skin/resources/icon_marble.gif);
}
#cityNav #citypanel tr:first-child th.C {
  background-image: url(/skin/resources/icon_glass.gif);
}
#cityNav #citypanel tr:first-child th.S {
  background-image: url(/skin/resources/icon_sulfur.gif);
}

#cityNav #citypanel tr td:first-child {
  padding-left: 6px;
}

#cityNav #citypanel tr td:last-child {
  padding-right: 6px;
  min-width: 27px;
}

#cityNav .citySelect #citypanel {
  z-index: 1;
  /*display: none;*/
  left: 189px;
  top: 6px;
  width: 157px;
}

/* current building is being upgraded */
#cityNav #citypanel a.being-upgraded {
  font-style: italic;
  text-decoration: underline;
}


/**** Warehouse spy report view ***/

#safehouseReports #mainview td.boats {
  position: relative;
}

#safehouseReports #mainview td.boats > div {
  background: url(/skin/layout/btn_transports.jpg) no-repeat scroll 0 0;
  position: absolute;
  width: 108px;
  height: 53px;
  top:  4px;
  left: 400px;
  font-weight: bold;
  text-align: center;
}

#safehouseReports #mainview td.boats div div.loot {
  font-size:   18px;
  margin-top:  9px;
  margin-left: 64px;
}
#safehouseReports #mainview td.boats div div.all {
  margin-left: 64px;
}

/**** Loot view ****/

/* frees up tons of space for stuff in the loot table (maybe less pretty) */
#militaryAdvisorCombatReports #mainview table.operations td {
  padding: 0;
}

#mainview #finishedReports table.operations tr.today {
  background-color: rgba(255,128,128,0.2);
}

#mainview #finishedReports table.operations tr.today.warn {
  background-color: rgba(255,128,128,0.3);
}

#mainview #loot-report td.subject {
  white-space: nowrap;
}

#loot-report {
  border-collapse: separate;
  border-spacing: 1px;
}

#loot-report th {
  background-color: #E0B16D;
  border: 1px solid #BB9765;
  padding: 1px 3px 3px;
  white-space: nowrap;
  font-size: large;
}

#loot-report th.filter {
  font-size: 11px;
  text-align: center;
}
#loot-report th.filter span {
  padding-right: 1px;
  background: white;
}
#loot-report th.filter input {
  font-size: 11px;
  border: none;
  width: 34px;
  padding: 0;
}
#loot-report th.filter #vT    { width: 38px; }
#loot-report th.filter #vbash { width: 12px; } /* background-color: #E0B16D;*/
#loot-report td:first-child + th + th + th + th + th + th + th + th + th + th,
#loot-report td:first-child + td + td + td + td + td + td + td + td + td + td,
#loot-report th.filter #vbash { text-align: center; }
#loot-report th.filter #opbash { display: none; }

#loot-report td.date {
  white-space: nowrap;
}

#loot-report td.warn {
  font-size: 14px;
  font-weight: bolder;
  color: red;
}

#loot-report .number {
  text-align: right;
  white-space: nowrap;
}

#loot-report .time {
  font-size: 11px;
  text-align: center;
  white-space: nowrap;
}

#loot-report .number input {
  margin: 0 4px 2px;
  opacity: 0.7;
}


/**** Build queue related stuff ****/


#q .barracks .img {   left: 0px; top: -33px; width: 100px; height: 76px;
  background-image: url(skin/img/city/building_barracks.gif);
}
#q .port .img {      left:-65px; top: -35px; width: 104px; height: 90px;
  background:url(skin/img/city/building_port.gif) -59px 0;
}
#q .shipyard .img { left: -22px; top: -20px; width: 129px; height: 100px;
  background-image:url(skin/img/city/building_shipyard.gif);
}
#q .shipyard a {    left: -20px; top: -10px; width: 110px; height: 70px; }
#q .museum .img {   left: -8px;  top: -38px; width: 105px; height: 85px;
  background-image:url(skin/img/city/building_museum.gif);
}
#q .warehouse .img { left: 0px;  top: -33px; width: 126px; height: 86px;
  background-image:url(skin/img/city/building_warehouse.gif);
}

#q .wall .img { width: 93px; height: 88px;
  background:url(skin/img/city/building_wall.gif) no-repeat -68px -16px;
}
#q .tavern .img {   left: -10px; top: -15px; width: 111px; height: 65px;
  background-image:url(skin/img/city/building_tavern.gif);
}
#q .palace .img {   left: -10px; top: -42px; width: 106px; height: 97px;
  background-image:url(skin/img/city/building_palace.gif);
}
#q .palaceColony .img {  left: -10px; top: -42px; width: 109px; height: 95px;
  background-image:url(skin/img/city/building_palaceColony.gif);
}
#q .academy .img {       left: -19px; top: -31px; width: 123px; height: 90px;
  background-image:url(skin/img/city/building_academy.gif);
}
#q .workshop .img { left: -19px; top: -31px; width: 106px; height: 85px;
  background-image:url(skin/img/city/building_workshop.gif);
}
#q .safehouse .img {     left: 5px;   top: -15px; width: 84px;  height: 58px;
  background-image:url(skin/img/city/building_safehouse.gif);
}
#q .branchOffice .img {  left: -19px; top: -31px; width: 109px; height: 84px;
  background-image:url(skin/img/city/building_branchOffice.gif);
}
#q .embassy .img {       left: -5px;  top: -31px; width: 93px;  height: 85px;
  background-image:url(skin/img/city/building_embassy.gif);
}
#q .townHall .img {      left: -5px;  top: -60px; width: 104px; height: 106px;
  background-image:url(skin/img/city/building_townhall.gif);
}

#q { margin: -20px 20px 125px; position:relative; }
#q li {
  float: left;
  margin: 0 40px 105px;
  position: absolute;
  width: 86px;
  height: 43px;
  position: relative;
}
#q li .rounded { margin-left: 19px; margin-top: 30px; }

#q li .timetofinish {
  z-index:500;
  position:absolute;
  top:86px;
  text-align:center;
  line-height:23px;
  height:23px;
  background-image:url(skin/layout/scroll_bg.gif);
  padding:0 16px;
  white-space: nowrap;
  font-size:10px;
  color:#50110a;
}
#q li .timetofinish .before {
  display: block; position: absolute; top:0; left:0; width:12px; height:23px;
  background-image: url(skin/layout/scroll_leftend.gif);
}
#q li .timetofinish .after {
  display: block; position: absolute; top:0; right:0; width:12px; height:23px;
  background-image: url(skin/layout/scroll_rightend.gif);
}

#value_inhabitants { white-space: nowrap }

#demo table.inside td div.stats {
  left: 50%;
  margin-left: -100%;
  padding-left: 3px;
  position: relative;
  white-space: nowrap;
  text-align: center;
  font-size: 12px;
}

#workshop-fleet #demo .upgrade .info .done,
#workshop-army #demo .upgrade .info .done {
  font-weight: normal;
}

#workshop-fleet #demo div.unitBuildCost,
#workshop-army #demo div.unitBuildCost {
  position: relative;
  margin-left: -20px;
  margin-right: 5px;
  bottom: -35px;
}

#workshop-fleet #demo div.unitBuildCost > div,
#workshop-army #demo div.unitBuildCost > div {
  position: absolute;
  width: 75px;
  bottom: 0;
}

#workshop-fleet #demo table.inside td.upgrade p,
#workshop-army #demo table.inside td.upgrade p {
  padding-bottom: 20px;
}

/**** World map view ****/

/* randomize coordinates dice */
#worldmap_iso #dice {
  top: 2px;
  left: 28px;
  width: 24px;
  height: 24px;
  display: block;
  position: absolute;
  background: url(http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/gfx/icons/dice-blue-big.png);
}

#worldmap_iso #dice:active {
  background: url(http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/gfx/icons/dice-yellow-big.png);
}

/* reusing the citycount box css for our resource level indicator */
#worldmap_iso #worldmap .tradegood .cities { top: 22px; left: 1px; }
#worldmap_iso #worldmap .tradegood4 .cities { top: 19px; }
#worldmap_iso #worldmap .tradegood .tradegood.wood .cities { top: 22px; }

#worldmap_iso #worldmap .tradegood .tradegood.wood {
  background-image: url(/skin/resources/icon_wood.gif);
  width: 25px;
  height: 20px;
}

#worldmap_iso #worldmap .island1 .tradegood.wood { left: 75px; top: 10px; }
#worldmap_iso #worldmap .island2 .tradegood.wood { left: 99px; top: 24px; }
#worldmap_iso #worldmap .island3 .tradegood.wood { left: 70px; top: 14px; }
#worldmap_iso #worldmap .island4 .tradegood.wood { left: 79px; top: -12px; }
#worldmap_iso #worldmap .island5 .tradegood.wood { left: 88px; top: -1px; }
#worldmap_iso #worldmap .island6 .tradegood.wood { left: -26px; top: -24px; }
#worldmap_iso #worldmap .island7 .tradegood.wood { left: 86px; top: 5px; }
#worldmap_iso #worldmap .island8 .tradegood.wood { left: -72px; top: 4px; }
#worldmap_iso #worldmap .island9 .tradegood.wood { left: -88px; top: 8px; }
#worldmap_iso #worldmap .island10 .tradegood.wood { left: 78px; top: 6px; }


/**** Library view ****/

#researchOverview #container #mainview ul { padding: 0 !important; }
#researchOverview #container #mainview li { padding-left: 0; position: relative }
/* Dependency hover checkboxes, or not */
a.dependent:before { content: "\2713 "; }
a.independent { padding-left: 9px; }

/* Research overview hacks */
a.dependent, a.independent { display: block; padding-left: 60px; }

ul.explored li, ul.unexplored li { position: relative; }

div.points:hover { text-decoration: underline; }

div.points {
  left: 0%;
  position: absolute;
  font-size: 10px;
  bottom: 1px;
  /*text-align: right;*/
}

hr#vr {
  position: absolute;
  width: 1px;
  top: 10px;
  background-color: #E3AE87;
  opacity: 0.4;
}


/**** Resource overview ****/

#mainview .city-resources {
  position: relative;
  min-height: 444px;
  text-align: center;
  line-height: 68px;
  font-size: 32px;
}

#mainview .city-resources iframe {
  float: right;
  overflow: hidden;
  display: block;
  height: 188px;
  width:  961px !important;
  margin-right: -18px;
  border: 0;
}

#mineLevel {
  font-size: 36px;
  font-weight: bold;
  font-family: Arial,Helvetica,sans-serif;
  text-align: center;
  position: absolute;
  width: 46px;
  left: 4px;
  top: 4px;
}

#breadcrumbs span#travel_time {
  display: inline;
  float: none;
}

/**** island view minimap ****/
#breadcrumbs #miniPane {
  position: absolute;
  right: -5px;
  top: 2px;
}

#breadcrumbs #miniPane a:active { opacity: 1.0; }
#breadcrumbs #miniPane a:hover  { opacity: 0.9; }
#breadcrumbs #miniPane a {
  opacity: 0.8;
  margin-left: 13px; /* temp hack for the alliance icon */
}
#breadcrumbs #miniPane img {
  height: 20px;
}

#breadcrumbs #miniMap {
  visibility: hidden;
  position: absolute;
  border-width: 0;
  width:   140px;
  height:  140px;
  bottom: -140px;
  left: 0;
}

/**** island view alliances ****/
#island #container #mainview #alliances {
  border-collapse: separate;
  position: absolute;
  background: #CCF;
  opacity: 0.7;
  padding: 4px;
  bottom: 0;
}

#island #container #mainview #alliances td {
  text-align: center;
}


/**** pillage view ****/
#ikafight iframe {
  border: none;
  overflow-x: hidden;
  height: 512px;
  width:  674px;
}

.k-target-city {
  float: right;
  font-size: 16px;
  text-align: center;
  margin-right: -15px;
}

.k-target-city .inactivity {
  font-style: italic;
  opacity: 0.4;
}


/**** resource view ****/
#tradegood.wine #mainview #setWorkers .workers {
  background-image: url(http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/gfx/worker_wine.png);
}
#tradegood.marble #mainview #setWorkers .workers {
  background-image: url(http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/gfx/worker_marble.png);
}
#tradegood.crystal #mainview #setWorkers .workers {
  background-image: url(http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/gfx/worker_crystal.png);
}
#tradegood.sulfur #mainview #setWorkers .workers {
  background-image: url(http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/gfx/worker_sulphur.png);
}


#embassy #container #mainview table.table01 td.online,
#embassy #container #mainview table.table01 td.offline {
  background-position: left center;
  padding-left: 18px;
}
