// ==UserScript==
// @id             ingress-intel-optimizer
// @name           Ingress Intel Optimizer
// @description    optimize loading speed, provide Google road map, show more portals, highlight neutral portals, show portal level, fix map offset in China
// @author         Breezewish
// @updateURL      https://userscripts.org/scripts/source/185013.meta.js
// @downloadURL    https://userscripts.org/scripts/source/185013.user.js
// @version        0.0.1.20140222.101500
// @run-at         document-start
// @include        http://www.ingress.com/intel*
// @include        https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

(function(window, undefined)
{

var imagePrefix = '//dn-iicc.qbox.me';

function setup()
{
    document.addEventListener('DOMContentLoaded', function()
    {

        // Remove YouTube Player
        nemesis.dashboard.YouTubePlayerLoader.prototype.loadPlayer_ = function()
        {
            this.whenPlayerLoaded_ = new goog.async.Deferred;
        }

        // Use GoogleRoad
        nemesis.dashboard.mapstyle.CUSTOM_MAP_STYLE = null;

        // Show more portals
        nemesis.dashboard.zoomlevel.ZOOM_TO_LOD_ = [8, 8, 8, 8, 7, 7, 6, 6, 5, 4, 4, 3, 3, 1, 1];

        // Fix Location
        // 1. Offset bounds
        // It seems that tile bounds needn't fix?
        /*
        var old_Tile_fromLatLng = nemesis.dashboard.mercator.Tile.fromLatLng;
        nemesis.dashboard.mercator.Tile.fromLatLng = function(a, lat, lng)
        {
            var GCJ02loc = WGS84_to_GCJ02_transformer.transform(lat, lng);
            return old_Tile_fromLatLng.apply(this, [a, GCJ02loc[0], GCJ02loc[1]]);
        }*/
        
        // 2. Offset portal loc
        nemesis.dashboard.data.Portal.prototype.getLatLng = function() {
            var GCJ02loc = WGS84_to_GCJ02_transformer.transform(this.lat, this.lng);
            return new google.maps.LatLng(GCJ02loc[0], GCJ02loc[1]);
        };

        // 3. Offset link and field loc
        var old_data_Point = nemesis.dashboard.data.Point;
        nemesis.dashboard.data.Point = function(guid, lat, lng) {
            var GCJ02loc = WGS84_to_GCJ02_transformer.transform(lat, lng);
            return new old_data_Point(guid, GCJ02loc[0], GCJ02loc[1]);
        };

        // 4. Show portal level & resize portal
        var resizeFactor = [0.75, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00];
        //resize
        nemesis.dashboard.render.PortalMarker.prototype.getPortalIcon_ = function() {
            return nemesis.dashboard.render.PortalMarker.getPortalIcon_(this.portal_.team, this.portal_.resonatorCount, this.portal_.level, this.scaleFactor_)
        };
        nemesis.dashboard.render.PortalMarker.getPortalIcon_ = function(team, res, level, scaleFactor) {
            var d = team.spriteNameString, e = nemesis.dashboard.render.PortalMarker.portalIcons_;
            var scaleFactorIcon = scaleFactor * resizeFactor[level];
            e[d] || (e[d] = {});
            e[d][res] || (e[d][res] = {});
            e[d][res][level] || (e[d][res][level] = {});
            e[d][res][level][scaleFactor] || (e[d][res][level][scaleFactor] = nemesis.dashboard.render.PortalMarker.createIcon_(team == nemesis.dashboard.data.Team.NEUTRAL ? imagePrefix + '/lv_0.png' : imagePrefix + '/' + team.spriteNameString + '_' + res + 'res.png', 60, scaleFactorIcon));
            return e[d][res][level][scaleFactor];
        };
        //show level
        nemesis.dashboard.render.PortalMarker.getGlowIcon_ = function(team, level, scaleFactor) {
            var d = team.spriteNameString, e = nemesis.dashboard.render.PortalMarker.glowIcons_;
            e[d] || (e[d] = {});
            e[d][level] || (e[d][level] = {});
            e[d][level][scaleFactor] || (e[d][level][scaleFactor] = nemesis.dashboard.render.PortalMarker.createIcon_(imagePrefix + '/lv_' + level.toString() + '.png', 60, Math.max(scaleFactor, 0.7)));
            return e[d][level][scaleFactor];
        };

    }, false);
}

//===================================================
//World Geodetic System ==> Mars Geodetic System
//https://on4wp7.codeplex.com/SourceControl/changeset/view/21483#353936
var WGS84_to_GCJ02 = function() {}

WGS84_to_GCJ02.prototype.a = 6378245.0;
WGS84_to_GCJ02.prototype.ee = 0.00669342162296594323;
WGS84_to_GCJ02.prototype.transform = function(wgLat, wgLon) {

    if (this.outOfChina(wgLat, wgLon)) {
        return [wgLon, wgLat];
    }
    
    dLat = this.transformLat(wgLon - 105.0, wgLat - 35.0);
    dLon = this.transformLon(wgLon - 105.0, wgLat - 35.0);
    radLat = wgLat / 180.0 * Math.PI;
    magic = Math.sin(radLat);
    magic = 1 - this.ee * magic * magic;
    sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * Math.PI);
    dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * Math.PI);
    mgLat = wgLat + dLat;
    mgLon = wgLon + dLon;

    return [mgLat, mgLon];

};
WGS84_to_GCJ02.prototype.outOfChina = function(lat, lon) {

    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;

    return false;

};
WGS84_to_GCJ02.prototype.transformLat = function(x, y) {

    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
    
    return ret;

};
WGS84_to_GCJ02.prototype.transformLon = function(x, y) {

    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
    
    return ret;

};

var WGS84_to_GCJ02_transformer = new WGS84_to_GCJ02();
setup();

})(window);