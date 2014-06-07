// ==UserScript==
// @name        Static Compass
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description creates compass poiting to the currently selected base (compass points from the center of the screen).
// @version     1.0.1c
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL   http://cnc.appshive.net/center/compass.meta.js
// @downloadURL http://cnc.appshive.net/center/compass.user.js
// ==/UserScript==

(function () {
var CompassMain = function () {
try {
function createCompass() {
console.log('Compass loaded');qx.Class.define('Compass', {
type: 'singleton',
extend: qx.core.Object,
members: {
needle: null,
ctx: null,
background: null,
size: 50,
initialize: function () {
try {
this.background = new Image();this.background.src = 'data:image/png;base64,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'
this.needle = new Image();this.needle.src = 'data:image/png;base64,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';var ec = document.createElement('canvas');document.body.appendChild(ec);ec.width = 70;ec.height = 90;ec.style.position = 'absolute';ec.style.top = '35px';ec.style.left = '140px';ec.style.zIndex = 999999;this.ctx = ec.getContext('2d');phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);} catch (e) {
console.log("Compass.initialize: ", e);}
},
displayCompass: function () {
try {
var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();var	cityCoordX = currentCity.get_PosX();var	cityCoordY = currentCity.get_PosY();var region = ClientLib.Vis.VisMain.GetInstance().get_Region();var zoom = region.get_ZoomFactor();var targetCoordX = region.get_ViewWidth() / 2;var targetCoordY = region.get_ViewHeight() / 2;var gridW = region.get_GridWidth();var gridH = region.get_GridHeight();var viewCoordX = (region.get_PosX() + targetCoordX / zoom - zoom * gridW / 2) / gridW;var viewCoordY = (region.get_PosY() + targetCoordY / zoom - zoom * gridH / 2) / gridH;var dx = viewCoordX - cityCoordX;var dy = cityCoordY - viewCoordY;var distance = Math.sqrt(dx * dx + dy * dy);var ctx = this.ctx;ctx.clearRect(0, 0, 70, 90);ctx.save();ctx.font = '18px Tahoma';ctx.fillStyle = '#FCDE7E';ctx.translate(35, 35);ctx.drawImage(this.background, -35, -35);var dtext = Math.round(10 * distance) / 10;ctx.fillText(dtext, -dtext.toString().length * 9 / 2, 40);ctx.rotate(dy > 0 ? Math.asin(dx / distance) + Math.PI : -Math.asin(dx / distance));ctx.drawImage(this.needle, - this.size / 2, - this.size / 2);ctx.restore();} catch (e) {
console.log("displayCompass", e);}
}
}
});}
} catch (e) {
console.log('createCompass: ', e);}
function CompassCheckLoaded() {
try {
if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
createCompass();window.Compass.getInstance().initialize();} else {
window.setTimeout(CompassCheckLoaded, 1000);}
} catch (e) {
console.log('CompassCheckLoaded: ', e);}
}
if (/commandandconquer\.com/i.test(document.domain)) {
window.setTimeout(CompassCheckLoaded, 1000);}
}
try {
var CompassScript = document.createElement('script');CompassScript.innerHTML = "(" + CompassMain.toString() + ')();';CompassScript.type = 'text/javascript';if (/commandandconquer\.com/i.test(document.domain)) {
document.getElementsByTagName('head')[0].appendChild(CompassScript);}
} catch (e) {
console.log('Compass: init error: ', e);}
})();