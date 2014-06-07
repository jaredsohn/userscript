// ==UserScript==
// @name                WME Junction Angle info
// @namespace           http://userscripts.org/users/508112
// @description         Show the angle between two selected (and connected) segments
// @include             /^https:\/\/(www|editor-beta)\.waze\.com\/(.{2,6}\/)?editor\/.*$/
// @updateURL           https://userscripts.org/scripts/source/160864.user.js
// @version             1.5.9
// @grant               none
// @copyright		2013 Michael Wikberg <michael@wikberg.fi>
// @license CC-BY-NC-SA
// ==/UserScript==

/**
 * Copyright 2014 Michael Wikberg <waze@wikberg.fi>
 * WME Junction Angle Info extension is licensed under a Creative Commons
 * Attribution-NonCommercial-ShareAlike 3.0 Unported License.
 *
 * Contributions by:
 *     2014 Paweł Pyrczak "tkr85" <support@pyrczak.pl>
 *     2014 "AlanOfTheBerg" <alanoftheberg@gmail.com>
 *     2014 "berestovskyy" <?>
 */

function run_ja() {

    var junctionangle_version = "1.5.9";
    var junctionangle_debug = 1;	//0: no output, 1: basic info, 2: debug 3: crazy debug
    var $;
    var ja_features = [];

    function ja_bootstrap() {
        try {
            if ((typeof window.Waze.map != undefined) && (undefined != typeof window.Waze.map.events.register) && (undefined != typeof window.Waze.selectionManager.events.register ) && (undefined != typeof window.Waze.loginManager.events.register)) {
                setTimeout(junctionangle_init, 500);
            } else {
                setTimeout(ja_bootstrap, 1000);
            }
        } catch (err) {
            setTimeout(ja_bootstrap, 1000);
        }
    }

    function ja_log(ja_log_msg, ja_log_level) {
        if (ja_log_level <= junctionangle_debug) {
            if (typeof ja_log_msg == "object") {
                //ja_log(arguments.callee.caller.toString(), ja_log_level);
                console.log(ja_log_msg);
            }
            else {
                console.log("WME Junction Angle: " + ja_log_msg);
            }
        }
    }

    function junctionangle_init() {

        //Listen for selected nodes change event
        window.Waze.selectionManager.events.register("selectionchanged", null, ja_calculate);

        window.Waze.model.segments.events.on({
            "objectschanged": ja_calculate,
            "objectsremoved": ja_calculate
        });
        window.Waze.model.nodes.events.on({
            "objectschanged": ja_calculate,
            "objectsremoved": ja_calculate
        });

        //HTML changes after login, even though the page is not reloaded. Better do init again.
        window.Waze.loginManager.events.register("afterloginchanged", null, junctionangle_init);

        /**
         * Make some style settings
         */
        var ja_style = new window.OpenLayers.Style({
            fillColor: "#ffcc88",
            strokeColor: "#ff9966",
            strokeWidth: 2,
            label: "${angle}",
            fontWeight: "bold",
            pointRadius: 10,
            fontSize: "10px"
        }, {
            rules: [
                new window.OpenLayers.Rule({
                    symbolizer: {
                    }
                }),
                new window.OpenLayers.Rule({
                    filter: new window.OpenLayers.Filter.Comparison({
                        type: window.OpenLayers.Filter.Comparison.EQUAL_TO,
                        property: "ja_type",
                        value: "junction"
                    }),
                    symbolizer: {
                        pointRadius: 13,
                        fontSize: "12px",
                        fillColor: "#4cc600",
                        strokeColor: "#183800"
                    }
                })
            ]
        });

        //Add support for translations. Default (and fallback) is "en".
        //Note, don't make typos in "acceleratorName", as it has to match the layer name (with whitespace removed
        // to actually work. Took me a while to figure that out...
        I18n.translations.en.layers.name["junction_angles"] = "Junction Angles";

        switch(window.I18n.locale) {
            case 'sv':
                I18n.translations.sv.layers.name["junction_angles"] = "Korsningsvinklar";
                break;
            case 'fi':
                I18n.translations.fi.layers.name["junction_angles"] = "Risteyskulmat";
                break;
        }

        layername = I18n.translate("layers.name.junction_angles","bar");

        //try to see if we already have a layer
        if (window.Waze.map.getLayersByName(layername).length == 0) {

            // Create a vector layer and give it your style map.
            ja_mapLayer = new window.OpenLayers.Layer.Vector(layername, {
                displayInLayerSwitcher: true,
                uniqueName: "junction_angles",
                shortcutKey: "S+j",
                accelerator: "toggle" + layername.replace(/\s+/g,''),
                className: "junction-angles",
                styleMap: new window.OpenLayers.StyleMap(ja_style)
            });

            window.Waze.map.addLayer(ja_mapLayer);
            ja_log("version " + junctionangle_version + " loaded.", 0);

            ja_log(window.Waze.map, 3);
            ja_log(window.Waze.model, 3);
            ja_log(window.Waze.loginManager, 3);
            ja_log(window.Waze.selectionManager, 3);
            ja_log(ja_mapLayer, 3);
            ja_log(window.OpenLayers, 3);
        } else {
            ja_log("Oh, nice.. We already had a layer?", 3);
        }
    }

    function ja_calculate() {
        //clear old info
        ja_mapLayer.destroyFeatures();

        //try to show all angles for all selected segments
        if (window.Waze.selectionManager.selectedItems.length == 0) return 1;
        ja_log("Checking junctions for " + window.Waze.selectionManager.selectedItems.length + " segments", 2);
        var ja_nodes = [];

        for (i = 0; i < window.Waze.selectionManager.selectedItems.length; i++) {
            ja_log(window.Waze.selectionManager.selectedItems[i], 3);
            switch (window.Waze.selectionManager.selectedItems[i].type) {
                case "node":
                    ja_nodes.push(window.Waze.selectionManager.selectedItems[i].fid);
                    break;
                case "segment":
                    //segments selected?
                    if (window.Waze.selectionManager.selectedItems[i].attributes.fromNodeID != null &&
                        ja_nodes.indexOf(window.Waze.selectionManager.selectedItems[i].attributes.fromNodeID) == -1) {
                        ja_nodes.push(window.Waze.selectionManager.selectedItems[i].attributes.fromNodeID);
                    }
                    if (ja_nodes.indexOf(window.Waze.selectionManager.selectedItems[i].attributes.toNodeID != null &&
                        ja_nodes.indexOf(window.Waze.selectionManager.selectedItems[i].attributes.toNodeID) == -1)) {
                        ja_nodes.push(window.Waze.selectionManager.selectedItems[i].attributes.toNodeID);
                    }
                    break;
                default:
                    ja_log("Found unknown item type: " + window.Waze.selectionManager.selectedItems[i].type, 1);
            }
        }

        ja_features = [];

        for (i = 0; i < ja_nodes.length; i++) {
            node = window.Waze.model.nodes.get(ja_nodes[i]);
            if (node == null || !node.hasOwnProperty('attributes')) {
                //Oh oh.. should not happen?
                ja_log(ja_nodes, 2);
                ja_log(window.Waze.model, 3);
                ja_log(window.Waze.model.nodes, 3);
                continue;
            }
            //check connected segments
            segments = node.attributes.segIDs;
            ja_log(node, 2);

            //ignore of we have less than 2 segments
            if (segments.length <= 1) {
                ja_log("Found only " + segments.length + " connected segments at " + ja_nodes[i] + ", not calculating anything...", 2);
                continue;
            }

            ja_log("Calculating angles for " + segments.length + " segments", 2);

            angles = [];
            selected_segments = 0;

            for (j = 0; j < segments.length; j++) {
                s = window.Waze.model.segments.get(segments[j]);
                a = ja_getAngle(ja_nodes[i], s);
                ja_log("j: " + j + "; Segment " + segments[j] + " angle is " + a, 3);
                angles[j] = [a, segments[j], s != null ? s.isSelected() : false];
                if (s != null ? s.isSelected() : false) selected_segments++;
            }

            ja_log(angles, 2);
            //sort angle data (ascending)
            angles.sort(function (a, b) {
                return a[0] - b[0]
            });
            ja_log(angles, 3);
            ja_log(selected_segments, 3);

            switch (window.Waze.map.zoom) {
                case 9:
                    ja_label_distance = 4;
                    break;
                case 8:
                    ja_label_distance = 8;
                    break;
                case 7:
                    ja_label_distance = 15;
                    break;
                case 6:
                    ja_label_distance = 25;
                    break;
                case 5:
                    ja_label_distance = 40;
                    break;
                case 4:
                    ja_label_distance = 80;
                    break;
                case 3:
                    ja_label_distance = 140;
                    break;
                case 2:
                    ja_label_distance = 300;
                    break;
                case 1:
                    ja_label_distance = 400;
                    break;
            }
            ja_log("zoom: " + window.Waze.map.zoom + " -> distance: " + ja_label_distance, 2);

            //if we have two connected segments selected, do some magic to get the turn angle only =)
            if (selected_segments == 2) {
                ja_selected = [];
                ja_extra_space_multiplier = 1;

                for (j = 0; j < angles.length; j++) {
                    if (angles[j][2]) {
                        ja_selected.push(angles[j]);
                    }
                }

                a = ((ja_selected[1][0] - ja_selected[0][0]) + 360) % 360;
                ha = (360 + (ja_selected[0][0] + ja_selected[1][0]) / 2) % 360;

                ja_log(a, 3);
                if (a < 60) {
                    ja_log("Sharp angle", 2);
                    ja_extra_space_multiplier = 2;
                }

                if (a > 180) {
                    //a2 = a - 180;
                    ha = ha + 180;
                }


                ja_log("Angle between " + ja_selected[0][1] + " and " + ja_selected[1][1] + " is " + a + " and position for label should be at " + ha, 3);

                //put the angle point
                ja_features.push(new window.OpenLayers.Feature.Vector(
                    new window.OpenLayers.Geometry.Point(
                        node.geometry.x + (ja_extra_space_multiplier * ja_label_distance * Math.cos((ha * Math.PI) / 180)),
                        node.geometry.y + (ja_extra_space_multiplier * ja_label_distance * Math.sin((ha * Math.PI) / 180))
                    )
                    , { angle: Math.round(Math.abs(180 - a)) + "°", ja_type: "junction" }
                ));
            }
            else {
                //get all segment angles
                for (j = 0; j < angles.length; j++) {
                    a = (360 + (angles[(j + 1) % angles.length][0] - angles[j][0])) % 360;
                    ha = (360 + ((a / 2) + angles[j][0])) % 360;

                    ja_log("Angle between " + angles[j][1] + " and " + angles[(j + 1) % angles.length][1] + " is " + a + " and position for label should be at " + ha, 3);
                    //push the angle point
                    ja_features.push(new window.OpenLayers.Feature.Vector(
                        new window.OpenLayers.Geometry.Point(
                            node.geometry.x + (ja_label_distance * Math.cos((ha * Math.PI) / 180)), node.geometry.y + (ja_label_distance * Math.sin((ha * Math.PI) / 180))
                        )
                        , { angle: Math.round(a) + "°", ja_type: "generic" }
                    ));
                }
            }
        }

        ja_log(ja_features, 2);
        //Update the displayed angles
        ja_mapLayer.addFeatures(ja_features);
    }

    function ja_points_equal(point1, point2) {
        return (point1.x == point2.x && point1.y == point2.y);
    }

    function ja_get_first_point(segment) {
        return segment.geometry.components[0];
    }

    function ja_get_last_point(segment) {
        return segment.geometry.components[segment.geometry.components.length - 1];
    }

    function ja_get_second_point(segment) {
        return segment.geometry.components[1];
    }

    function ja_get_next_to_last_point(segment) {
        return segment.geometry.components[segment.geometry.components.length - 2];
    }

    //get the absolute angle for a segment end point
    function ja_getAngle(ja_node, ja_segment) {
        if (ja_node == null || ja_segment == null) return null;
        if (ja_segment.attributes.fromNodeID == ja_node) {
            ja_dx = ja_get_second_point(ja_segment).x - ja_get_first_point(ja_segment).x;
            ja_dy = ja_get_second_point(ja_segment).y - ja_get_first_point(ja_segment).y;
        } else {
            ja_dx = ja_get_next_to_last_point(ja_segment).x - ja_get_last_point(ja_segment).x;
            ja_dy = ja_get_next_to_last_point(ja_segment).y - ja_get_last_point(ja_segment).y;
        }
        ja_log(ja_node + " / " + ja_segment + ": dx:" + ja_dx + ", dy:" + ja_dy);
        ja_angle = Math.atan2(ja_dy, ja_dx);
        return (360 + (ja_angle * 180 / Math.PI)) % 360;
    }

    ja_bootstrap();
}

//Dynamically create, add and run the script in the real page context
var DLscript = document.createElement("script");
DLscript.textContent = '' +
    run_ja.toString() + ' \n' +
    'run_ja();';
DLscript.setAttribute("type", "application/javascript");
document.body.appendChild(DLscript);
