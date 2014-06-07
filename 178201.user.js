// ==UserScript==
// @name A Dark Room Helper
// @namespace http://github.com/taeram/
// @version 0.0.1
// @description Helper for A Dark Room
// @match http://adarkroom.doublespeakgames.com/
// @copyright 2013 Jesse Patching
// @license MIT http://opensource.org/licenses/MIT
// @updateURL https://gist.github.com/taeram/5891567/raw/a-dark-room.user.js
// ==/UserScript==
 
$('body')
.append('<script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js"></script>')
.append('<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>');
 
// Add the CSS
$('<style>' +
'.helper-buttons {' +
'position: absolute;' +
'left: 0px;' +
'top: 0px;' +
'border: 1px solid black;' +
'padding: 5px' +
'}' +
'h2.title {' +
'margin-top: 5px;' +
'margin-bottom: 5px;' +
'}' +
'.btn {' +
'display: inline-block;' +
'padding: 2px 6px;' +
'margin-bottom: 0;' +
'font-size: 13px;' +
'font-weight: normal;' +
'line-height: 1.428571429;' +
'text-align: center;' +
'white-space: nowrap;' +
'vertical-align: middle;' +
'cursor: pointer;' +
'border: 1px solid transparent;' +
'border-radius: 4px;' +
'-webkit-user-select: none;' +
'-moz-user-select: none;' +
'-ms-user-select: none;' +
'-o-user-select: none;' +
'}' +
'.btn-primary {' +
'color: #ffffff;' +
'background-color: #428bca;' +
'border-color: #357ebd;' +
'}' +
'.btn-success {' +
'color: #ffffff;' +
'background-color: #5cb85c;' +
'border-color: #4cae4c;' +
'}' +
'</style>').appendTo('body');
 
// Add the templates
$('<script id="helper-template" type="text/template">' +
'<h2 class="title">The Room</h2>' +
'<button class="btn room-stoke <%= roomStoke ? \"btn-success\" : \"btn-primary\" %>">Stoke</button>' +
'<button class="btn room-build <%= roomBuild ? \"btn-success\" : \"btn-primary\" %>">Build</button>' +
'<button class="btn room-events <%= roomEvents ? \"btn-success\" : \"btn-primary\" %>">Events</button>' +
'<h2 class="title">Outside</h2>' +
'<button class="btn outside-gather <%= outsideGather ? \"btn-success\" : \"btn-primary\" %>">Gather</button>' +
'<button class="btn outside-events <%= outsideEvents ? \"btn-success\" : \"btn-primary\" %>">Events</button>' +
'<h2 class="title">World</h2>' +
'<button class="btn world-fight <%= worldFight ? \"btn-success\" : \"btn-primary\" %>">Fight</button>' +
'<button class="btn world-loot <%= worldLoot ? \"btn-success\" : \"btn-primary\" %>">Loot</button>' +
'</script>').appendTo('body');
 
 
setTimeout(function() {
var HelperView = Backbone.View.extend({
el: $('<div class="helper-buttons"></div>').appendTo('body'),
template: _.template($('#helper-template').html()),
events: {
"click .room-stoke": "toggle",
"click .room-build": "toggle",
"click .room-events": "toggle",
"click .outside-gather": "toggle",
"click .outside-events": "toggle",
"click .world-fight": "toggle",
"click .world-loot": "toggle"
},
initialize: function() {
_.bindAll(this, 'toggle', 'stockUp', 'addAllPerks', 'maxInventory', 'maxWorkers', 'upgradeEngines', 'render', 'parseEvents');
this.roomStoke = true;
this.roomBuild = true;
this.roomEvents = true;
this.outsideGather = true;
this.outsideEvents = true;
this.worldFight = true;
this.worldLoot = true;
this.isAutoLootEnabled = true;
setInterval(this.parseEvents, 100);
this.render();
},
toggle: function (e) {
if ($(e.target).attr('class').match(/room-stoke/)) {
this.roomStoke = !this.roomStoke;
} else if ($(e.target).attr('class').match(/room-build/)) {
this.roomBuild = !this.roomBuild;
} else if ($(e.target).attr('class').match(/room-events/)) {
this.roomEvents = !this.roomEvents
} else if ($(e.target).attr('class').match(/outside-gather/)) {
this.outsideGather = !this.outsideGather;
} else if ($(e.target).attr('class').match(/outside-events/)) {
this.outsideEvents = !this.outsideEvents;
} else if ($(e.target).attr('class').match(/world-fight/)) {
this.worldFight = !this.worldFight;
} else if ($(e.target).attr('class').match(/world-loot/)) {
this.worldLoot = !this.worldLoot;
}
this.render();
},
stockUp: function () {
World.BASE_WATER=999;
Path.DEFAULT_BAG_SPACE=999;
Path.outfit = {
bullets: 200,
bolas: 200,
'bone spear': 1,
'energy cell': 200,
charm: 1,
'cured meat': 200,
grenade: 150,
'iron sword': 1,
'laser rifle': 1,
rifle: 1,
'steel sword': 1,
torch: 10
};
},
addAllPerks: function () {
Engine.addPerk('barbarian');
Engine.addPerk('boxer');
Engine.addPerk('desert rat');
Engine.addPerk('evasive');
Engine.addPerk('gastronome');
Engine.addPerk('martial artist');
Engine.addPerk('precise');
Engine.addPerk('scout');
Engine.addPerk('slow metabolism');
Engine.addPerk('stealthy');
Engine.addPerk('unarmed master');
},
maxInventory: function () {
State.stores["alien alloy"] = 999999;
State.stores.bait = 999999;
State.stores.bullets = 999999;
State.stores['bone spear'] = 5;
State.stores.cloth = 999999;
State.stores.coal = 999999;
State.stores["cured meat"] = 999999;
State.stores["energy cell"] = 999999;
State.stores.fur = 999999;
State.stores.grenade = 999999;
State.stores.iron = 999999;
State.stores['iron sword'] = 999999;
State.stores.leather = 999999;
State.stores.meat = 999999;
State.stores.rifle = 5;
State.stores['laser rifle'] = 5;
State.stores.scales = 999999;
State.stores.steel = 999999;
State.stores['steel sword'] = 5;
State.stores.sulphur = 999999;
State.stores.teeth = 999999;
State.stores.wood = 999999;
},
maxWorkers: function () {
State.outside.population = 1000;
State.outside.workers['armourer'] = 100;
State.outside.workers["charcutier"] = 100;
State.outside.workers["hunter"] = 100;
State.outside.workers["steelworker"] = 100;
State.outside.workers["tanner"] = 100;
State.outside.workers["trapper"] = 100;
State.outside.workers["iron miner"] = 100;
State.outside.workers["coal miner"] = 100;
State.outside.workers["sulphur miner"] = 100;
Outside.updateWorkersView();
},
upgradeEngines: function () {
while ($('#engineRow .row_val').text() < 20) {
console.log('upgrading engines');
$('#engineButton').trigger('click');
}
while ($('#hullRow .row_val').text() < 50) {
console.log('upgrading hull');
$('#reinforceButton').trigger('click');
}
},
render: function() {
this.$el.html(this.template(this));
return this;
},
parseEvents: function () {
if (this.roomStoke) {
if (State.room.temperature.value <= 3 && !$('#stokeButton').hasClass('disabled')) {
console.log("Stoking fire");
$('#stokeButton').trigger('click');
}
}
if (this.roomBuild) {
for (var i in Room.Craftables) {
var item = Room.Craftables[i];
// Not active yet
if (item.button === null || $(item.button).length === 0) {
continue;
}
// Don't build weapons
if (item.type !== undefined && (item.type == 'weapon' || item.type == 'tool')) {
continue;
}
// Can we build it?
if (!$(item.button).hasClass('disabled')) {
// What's the cost?
var canPurchase = true;
var cost = item.cost();
for (var j in cost) {
if (State.stores[j] === undefined || State.stores[j] < cost[j]) {
canPurchase = false;
}
}
if (canPurchase) {
console.log("Buying a " + i);
$(item.button).trigger('click');
}
}
}
}
if (this.roomEvents) {
if ($('#event').length > 0) {
var eventTitle = $('#event .eventTitle').text();
// Investigate Room events
if (eventTitle == 'The Nomad') {
console.log("The nomad is in town!");
$('#goodbye').trigger('click');
} else if (eventTitle == 'Noises') {
console.log("Investigating " + eventTitle);
$('#investigate,#backinside,#leave').trigger('click');
} else if (eventTitle == 'The Beggar') {
console.log("Investigating " + eventTitle);
console.log("Kicking the Beggar out");
$('#deny').trigger('click');
} else if (eventTitle == 'The Mysterious Wanderer') {
console.log("Investigating " + eventTitle);
console.log("Kicking the Mysterious Wanderer out");
$('#deny').trigger('click');
} else if (eventTitle == 'The Scout') {
console.log("Investigating " + eventTitle);
$('#buyMap,#learn,#leave').trigger('click');
} else if (eventTitle == 'The Master') {
console.log("Investigating " + eventTitle);
$('#agree,#evasion,#precision,#force,#nothing,#deny').trigger('click');
}
}
}
if (this.outsideGather) {
// Make sure we visit the forest as soon as it becomes available and the stranger is ready to build
if (!State.seenForest && State.room.builder >= 3 && $('#location_outside').length > 0) {
console.log("Going outside for the first time");
$('#location_outside').trigger('click');
setTimeout(function () {
console.log("Going back inside");
$('#location_room').trigger('click');
}, 500);
}
if ($("#trapsButton").length > 0 && !$("#trapsButton").hasClass('disabled')) {
console.log("Collecting from traps");
$("#trapsButton").trigger('click');
}
if ($("#gatherButton").length > 0 && !$("#gatherButton").hasClass('disabled')) {
console.log("Gathering wood");
$("#gatherButton").trigger('click');
}
}
if (this.outsideEvents) {
if ($('#event').length > 0) {
var eventTitle = $('#event .eventTitle').text();
// Investigate Outside events
if (eventTitle == 'A Ruined Trap') {
console.log("Investigating " + eventTitle);
$('#track,#end').trigger('click');
} else if (eventTitle == 'A Beast Attack') {
console.log("Investigating " + eventTitle);
$('#end').trigger('click');
} else if (eventTitle == 'A Military Raid') {
console.log("Investigating " + eventTitle);
$('#end').trigger('click');
}
}
}
if (this.worldFight) {
if ($('#event .fighter').length > 0) {
if ($('#buttons .weaponButton').length > 0 && $('#enemy').data('hp') > 0) {
var enemy = Events.activeEvent().scenes[Events.activeScene].enemy;
console.log('Fighting ' + enemy);
$('#buttons .weaponButton').trigger('click');
if ($('#attack_bolas').length > 0) {
$('#attack_bolas').trigger('click');
}
}
if ($('#eat').length > 0 && World.health < World.getMaxHealth() - 10 || World.health < World.getMaxHealth() * 0.5) {
console.log('Healing');
$('#eat').trigger('click');
}
}
}
if (this.worldLoot) {
if ($('#event').length > 0) {
// Looting
if ($('#lootButtons .button').length > 0) {
if (!this.isAutoLootEnabled) {
return console.log("All full up, waiting for user to sort things out");
}
if (Path.getFreeSpace() >= 1) {
console.log('Looting the room');
return $('#lootButtons .button').trigger('click');
} else {
this.isAutoLootEnabled = false;
return console.log("Too full, not looting");
}
} else if (!this.isAutoLootEnabled) {
console.log("Proceeded to another event, re-enabling auto loot");
this.isAutoLootEnabled = true;
}
// Continuing to the next room
if ($('#attack,#enter,#descend,#continue').length > 0) {
console.log("Continuing to the next room");
return $('#attack,#enter,#descend,#continue').trigger('click');
}
// Leaving, nothing else for us here
if ($('#buttons .button').length === 1 && $('#leave,#leaveBtn').length > 0) {
console.log('Room is empty, leaving.');
return $('#leave,#leaveBtn').trigger('click');
}
} else if (!this.isAutoLootEnabled) {
console.log("Event is over, re-enabling auto loot");
isAutoLootEnabled = true;
}
}
}
});
var App = new HelperView();
}, 1000);