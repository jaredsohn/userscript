// ==UserScript==
// @name        WME Adds
// @namespace   WME_ADD
// @include     https://*.waze.com/editor/*
// @version     0.0.3
// ==/UserScript==

var version = "v0.0.3";
if ('undefined' == typeof __WME_ADD_SCOPE_RUN__) {
    (function page_scope_runner() {
        // If we're _not_ already running in the page, grab the full source
        // of this script.
        var my_src = "(" + page_scope_runner.caller.toString() + ")();";

        // Create a script node holding this script, plus a marker that lets us
        // know we are running in the page scope (not the Greasemonkey sandbox).
        // Note that we are intentionally *not* scope-wrapping here.
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.textContent = "var __WME_ADD_SCOPE_RUN__ = true;\n" + my_src;

        // Insert the script node into the page, so it will run, and immediately
        // remove it to clean up.  Use setTimeout to force execution "outside" of
        // the user script scope completely.
        setTimeout(function() {
            document.body.appendChild(script);
            document.body.removeChild(script);
        }, 500);
    })();

    // Stop running, because we know Greasemonkey actually runs us in
    // an anonymous wrapper.
    return;
}
//  
// CLASS DEFINITIONS FILE  
//  
var WME_ADD_UNKNOWN = -987;

var FRONT_ABBREVS = ["S", "N", "E", "W"]
var END_ABBREVS = ["Ave", "Blvd", "Cir", "Ct", "Dr", "Hts", "Ln", "Loop", "Pkwy", "Pl", "Rd", "St", "Trl", "Way"]

function SelectSection(hdr, iD, slctns) {
    this.header = hdr;
    this.id = iD;
    this.selections = slctns;
}

function isTrafficRelevant(roadType) {
    switch(roadType) {
        //"Streets"
        case 1:
        //"Primary Street"
        case 2:
        //"Freeways",
        case 3:
        //"Ramps",
        case 4:
        //"Major Highway",
        case 6:
        //"Minor Highway",
        case 7:
        //"Service Road"
        case 21:
            return true;
        default:
            return false;
    }
}

function isOneWay(segment) {
    return ((segment.attributes.fwdDirection + segment.attributes.revDirection) == 1);
}

function getSegmentSpeed(segment) {
    var speedToUse = 0;
    var oneWay = isOneWay(segment);
    if (oneWay && segment.attributes.fwdDirection) {
        speedToUse = segment.attributes.fwdCrossSpeed;
    } else if (oneWay && segment.attributes.revDirection) {
        speedToUse = segment.attributes.revCrossSpeed;
    } else {
        // take average?  we could do a max, or a min, or ...
        speedToUse = (segment.attributes.revCrossSpeed + segment.attributes.fwdCrossSpeed) / 2;
    }
    if (!isNaN(speedToUse)) {
        speedToUse *= 0.621;
        // convert from km/h to MPH
        speedToUse = Math.ceil(speedToUse / 5) * 5;
        // round up to the nearest 5 mph
        speedToUse = Math.round(speedToUse);
        // may not be necessary
    }
    return speedToUse;
}

// CLASS DEFINITIONS
function LineBearing(dist, bear) {
    this.distance = dist;
    this.bearing = bear;
}

function getDistance(p1, p2) {

    var y1 = p1.y;
    var x1 = p1.x;

    var y2 = p2.y;
    var x2 = p2.x;

    var dLat = y2 - y1;
    var dLon = x2 - x1;
    var d = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLon, 2));

    // http://mathforum.org/library/drmath/view/55417.html
    var bearing = 0;
    if (dLon > 0) {
        if (dLat > 0) {
            bearing = calcTan(dLon, dLat);
        }
        if (dLat < 0) {
            bearing = 180 - calcTan(-1 * dLon, dLat);
        }
        if (dLat == 0) {
            bearing = 90;
        }
    }
    if (dLon < 0) {
        if (dLat > 0) {
            bearing = -1 * calcTan(-1 * dLon, dLat);
        }
        if (dLat < 0) {
            bearing = calcTan(dLon, dLat) - 180;
        }
        if (dLat == 0) {
            bearing = 270;
        }
    }
    if (dLon == 0) {
        if (dLat > 0) {
            bearing = 0;
        }
        if (dLat < 0) {
            bearing = 180;
        }
        if (dLat == 0) {
            bearing = 0;
        }
    }
    bearing += 360;
    bearing = bearing % 360;

    return new LineBearing(d, bearing);

}

function getComponentsProperties(comps) {
    var compSegs = [];
    for (var i = 1; i < comps.length; i++) {
        var p1 = compToPoint(comps[i - 1]);
        var p2 = compToPoint(comps[i]);
        var dist = getDistance(p1, p2);
        compSegs.push(dist);
    }
    return compSegs;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function compToPoint(comp) {
    return new Point(comp.x, comp.y);
}

Point.prototype.getLineTo = function(p2) {
    var lat1 = this.latitude;
    var lon1 = this.longitude;

    var lat2 = p2.latitude;
    var lon2 = p2.longitude;

    var dLat = lat2 - lat1;
    var dLon = lon2 - lon1;
    var d = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLon, 2));

    var bearing = 0;
    // North / South
    if (dLon == 0) {
        bearing = dLat < 0 ? 180 : 0;
    } else {
        bearing = (Math.tan(dLat / dLon) / (2 * Math.PI)) * 360;
    }
    //    return new LineBearing(d, bearing);
}
function WazeLineSegment(segment, street) {
    this.cityID = street.cityID;
    var city = wazeModel.cities.get(this.cityID);
    this.geometry = segment.geometry;
    this.attributes = segment.attributes;
    this.line = getId(segment.geometry.id);
    this.streetName = null;
    this.noName = street.isEmpty;
    this.noCity = city == null || city.isEmpty;
    this.state = this.noCity ? null : wazeModel.states.get(city.stateID);
    this.oneWay = ((this.attributes.fwdDirection + this.attributes.revDirection) == 1);
    // it is 1-way only if either is true
    this.noDirection = (!this.attributes.fwdDirection && !this.attributes.revDirection);
    // Could use the .attribute.allowNoDirection?
    this.updatedOn = new Date(this.attributes.updatedOn);
    this.updatedBy = this.attributes.updatedBy;
    this.fwdSpeed = Math.abs(this.attributes.fwdCrossSpeed);
    this.revSpeed = Math.abs(this.attributes.revCrossSpeed);
    this.length = this.attributes.length;
    this.roadType = this.attributes.roadType;
    this.segment = segment;
}

WazeLineSegment.prototype.getStreetName = function() {

    if (!this.streetName) {
        var sid = this.segment.attributes.primaryStreetID;
        var street = wazeModel.streets.get(sid);
        if (sid && street.name !== null) {
            this.streetName = street.name;
        } else {
            this.streetName = "";
        }
    }
    return this.streetName;
};

function WazeNode(wazeNode, attachedSegments) {
}

function WMEFunction(acheckboxId, aText) {
    this.checkboxId = acheckboxId;
    this.text = aText;
}

WMEFunction.prototype.getCheckboxId = function() {
    return this.checkboxId;
};
WMEFunction.prototype.getBackground = function() {
    return '#fff';
};

WMEFunction.prototype.build = function(checkValue) {
    var checkStr = checkValue ? "checked" : "";
    return '<input style="" type="checkbox" id="' + this.getCheckboxId() + '" ' + checkStr + '/> ' + this.text;
};
WMEFunction.prototype.init = function() {
    console.log("init");
    getId(this.getCheckboxId()).onclick = highlightAllSegments;
};
WMEFunction.prototype.getModifiedAttrs = function(wazeLineSegment) {
    return new Object();
};

function WMEFunctionExtended(acheckboxId, aText) {
    WMEFunction.call(this, acheckboxId, aText);
}

extend(WMEFunctionExtended.prototype, WMEFunction.prototype);

WMEFunctionExtended.prototype.getSelectId = function() {
    return this.getCheckboxId() + 'Select';
}

WMEFunctionExtended.prototype.buildExtended = function() {
    return '';
}

WMEFunctionExtended.prototype.build = function(checkValue) {
    return WMEFunction.prototype.build.call(this, checkValue) + '<br />' + this.buildExtended();
};

WMEFunctionExtended.prototype.getSelectFieldChangeFunction = function() {
    var that = this;
    return function() {
        getId(that.getCheckboxId()).checked = "checked";
        highlightSegments();
    };
};

function EventPublisher() {
    this.subscribers = [];
}

EventPublisher.prototype = {
    subscribe : function(fn) {
        this.subscribers.push(fn);
    },
    unsubscribe : function(fn) {
    },
    post : function(thisObj) {
        for (var i = 0, j = this.subscribers.length; i < j; i++) {
            this.subscribers[i].call(thisObj);
        };
    }
};

function HighlightSegmentMonitor() {
    var eventPublisher = new EventPublisher();
    var latestSegment = null;
    this.subscribe = function(fn) {
        eventPublisher.subscribe(fn);
    }
    this.updateLatestSegment = function(latest) {
        latestSegment = latest;
        eventPublisher.post(latest);
    }
    this.getLatestSegment = function() {
        return latestSegment;
    }
}

var highlightSegmentMonitor = new HighlightSegmentMonitor();

//  
// UTILITY DEFINITIONS FILE  
//  

////  UTIL FUNCTIONS
function extend(target, source) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    for (var propName in source) {
        // Invoke hasOwnProperty() with this = source
        if (hasOwnProperty.call(source, propName)) {
            target[propName] = source[propName];
        }
    }
    return target;
}

function getScaledHex(index, maximum, startColor, endColor) {
    if (index >= maximum) {
        index = maximum - 1;
    }
    var colorVal = startColor + ((endColor - startColor) * (index / (maximum - 1)));

    colorVal = Math.round(colorVal);

    // convert from decimal to hexadecimal
    var colorHex = colorVal.toString(16);

    // pad the hexadecimal number if required
    if (colorHex.length < 2) {
        colorHex = "0" + colorHex;
    }
    return colorHex;
}

function getScaledColour(index, maximum) {
    var blueHex = "00";

    var startGreen = 0;
    var endGreen = 255;

    var startRed = 255;
    var endRed = 0;

    return "#" + getScaledHex(index, maximum, startRed, endRed) + getScaledHex(index, maximum, startGreen, endGreen) + blueHex;
}

function generateTopDownGradient(top, bottom) {
    var stylizer = "background-color: " + top + ";"
    stylizer += "background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%," + top + "), color-stop(100%, " + bottom + "));";
    stylizer += "background-image: -webkit-linear-gradient(top, " + top + ", " + bottom + ");";
    stylizer += "background-image: -moz-linear-gradient(top, " + top + ", "  + bottom + ");";
    stylizer += "background-image: -ms-linear-gradient(top, " + top + ", " + bottom + ");";
    stylizer += "background-image: -o-linear-gradient(top, " + top + ", " + bottom + ");";
    stylizer += "background-image: linear-gradient(top, " + top + ", " + bottom + ");";
    return stylizer;
}


function calcTan(dLon, dLat) {
 return (Math.atan(dLon/dLat) / (2 * Math.PI)) * 360;
}
//  
// COMPONENT SELECTION CLASS  
//  
/** GEOMETRY **/

function getBearingDiff(bearing1, bearing2) {
    // normalize the first angle to 0, and subtract the same from the second;
    var normalizeAngle = bearing1;
    bearing1 -= normalizeAngle;
    var diffAngle = bearing2 - normalizeAngle;

    if (diffAngle < -180) {
        diffAngle += 360;
    } else if (diffAngle > 180) {
        diffAngle -= 360;
    }
    return diffAngle;
}

function rightTurn(bearing1, bearing2) {
    return getBearingDiff(bearing1, bearing2) > 0;
}

var MIN_DISTANCE_BETWEEN_COMPONENTS = 1.5;
var MIN_LENGTH_DIFF = 0.005;

function between(value, min, max) {
    if (max < min) {
        var temp = min;
        min = max;
        max = temp
    }
    var between = value > min && value < max;
    //    console.log("between? " + min + " " + value + " " + max + " = " + between);
    return between;
}

var ZIG_ZAG_MAX_DIST = 30;
var ZIG_ZAG_MAX_ANGLE = 3;
var negate_ZIG_ZAG_MAX_ANGLE = -1 * ZIG_ZAG_MAX_ANGLE;
var MIN_ANGLE_DIFF = 0.7;

function subtleZigZags(segmentProperties) {
    // detect zig zagging...
    var segmentChain = [];
    for (var i = 0; i < segmentProperties.length; i++) {
        var currentSegment = segmentProperties[i];
        segmentChain.push(currentSegment);
        if (segmentChain.length < 3) {
            continue;
        }
        if (currentSegment.distance > ZIG_ZAG_MAX_DIST) {
            segmentChain = [];
            continue;
        }
        var origSegment = segmentChain[segmentChain.length - 3];
        var pastSegment = segmentChain[segmentChain.length - 2];
        var bearing1 = origSegment.bearing;
        var bearing2 = pastSegment.bearing;
        var bearing3 = currentSegment.bearing;

        var bearDiff1 = getBearingDiff(bearing1, bearing2);
        var bearDiff2 = getBearingDiff(bearing2, bearing3);

        if ((between(bearDiff1, 0, ZIG_ZAG_MAX_ANGLE) && between(bearDiff2, 0, negate_ZIG_ZAG_MAX_ANGLE)) || (between(bearDiff1, 0, negate_ZIG_ZAG_MAX_ANGLE) && between(bearDiff2, 0, ZIG_ZAG_MAX_ANGLE))) {
            return true;
        }
    }
    return false;
}

function checkForLowAngles(segmentProperties) {
    if (segmentProperties.length < 2) {
        return;
    }
    for (var i = 0; i < segmentProperties.length - 1; i++) {
        var currentSegment = segmentProperties[i];
        var nextSegment = segmentProperties[i + 1];
        var bearing1 = currentSegment.bearing;
        var bearing2 = nextSegment.bearing;
        var bearDiff1 = getBearingDiff(bearing1, bearing2);
        if (Math.abs(bearDiff1) < MIN_ANGLE_DIFF) {
            return true;
        }
    }
    return false;
}

// Check for subtle zig-zags on longer components where the end result of the zig-zag is almost nothing

// Check for sharp zig-zags on very short components where the end result of the zig-zag is almost nothing

// OR

// Check for issues when (angle / length) reaches a threshold.  So sharp angles reach the threshold with small lengths;

// --

// Take the difference between the total sum and the sum of the components.  Take the the differene to create an average distance per component. If that average exceeds a trheshoold...

// // //

// On major streets, checks to see that there aren't places where the street can't continue due to turn restrictions.

var highlightLowAngles = new WMEFunction("_cbHighlightLowAngles", "Low Angles");
highlightLowAngles.getModifiedAttrs = function(wazeLineSegment) {
	var components = wazeLineSegment.geometry.components;
	if (components.length <= 2) {
		return new Object();
	}
	var foundIssue = false;
	var segmentProperties = getComponentsProperties(wazeLineSegment.geometry.components);

	if (checkForLowAngles(segmentProperties)) {
		foundIssue = true;
	}

	var modifications = new Object();
	if (foundIssue) {
		modifications.color = "#BE0";
		modifications.opacity = 0.5;
	}
	return modifications;
};
highlightLowAngles.getBackground = function() {
    return 'rgba(187,238,0,0.5)';
};

/*
 *
 */
var highlightExcessComponents = new WMEFunction("_cbHighlightHighExcessComponents", "Excess Components");
highlightExcessComponents.getModifiedAttrs = function(wazeLineSegment) {
	var components = wazeLineSegment.geometry.components;
	if (components.length <= 2) {
		return new Object();
	}
	var foundIssue = false;
	var segmentProperties = getComponentsProperties(wazeLineSegment.geometry.components);

	// If the space between components is really small, we note that as an issue
	var lengthSum = 0;
	for (var i = 0; i < segmentProperties.length; i++) {
		var componentLength = segmentProperties[i].distance;
		lengthSum += componentLength;
	}
	// if there is more than just a beginning and end component, and the difference from the total length is really small, this fits this category.
	var pStart = compToPoint(components[0]);
	var pEnd = compToPoint(components[components.length - 1]);
	var totalDist = getDistance(pStart, pEnd).distance;
	var lengthDiff = lengthSum - totalDist;

	var numXtraComps = components.length - 2;
	// NEW
	var avgDiffPerSeg = lengthDiff / numXtraComps;
	var avgLengthPerSeg = lengthSum / numXtraComps;
	if (avgDiffPerSeg < 0.03) {
		foundIssue = true;
	} else if (avgLengthPerSeg < 3) {
		foundIssue = true;
	} 
	var modifications = new Object();
	if (foundIssue) {
		modifications.color = "#FFD105";
		modifications.opacity = 0.5;
	}
	return modifications;
};
highlightExcessComponents.getBackground = function() {
    return 'rgba(255,209,5,0.5)';
}; 

var highlightCloseComponents = new WMEFunction("_cbHighlightCloseComponents", "Close Components");
highlightCloseComponents.getModifiedAttrs = function(wazeLineSegment) {
    var components = wazeLineSegment.geometry.components;
    if (components.length <= 2) {
        return new Object();
    }
    var foundIssue = false;
    var segmentProperties = getComponentsProperties(wazeLineSegment.geometry.components);
    var issueColor = "#B00";

    // If the space between components is really small, we note that as an issue
    for (var i = 0; i < segmentProperties.length; i++) {
        var componentLength = segmentProperties[i].distance;
        if (componentLength < MIN_DISTANCE_BETWEEN_COMPONENTS) {
            foundIssue = true;
        }
    }
    var modifications = new Object();
    if (foundIssue) {
        modifications.color = issueColor;
        modifications.opacity = 0.7;
    }
    return modifications;
};
highlightCloseComponents.getBackground = function() {
    return 'rgba(187,0,0,0.7)';
};

var highlightZigZagsComponents = new WMEFunction("_cbHighlightZigZagsComponents", "Subtle Zig-Zags");
highlightZigZagsComponents.getModifiedAttrs = function(wazeLineSegment) {
    var components = wazeLineSegment.geometry.components;
    if (components.length <= 2) {
        return new Object();
    }
    var foundIssue = false;
    var segmentProperties = getComponentsProperties(wazeLineSegment.geometry.components);
    var issueColor = "#E10";

    if (subtleZigZags(segmentProperties)) {
        foundIssue = true;
    }
    var modifications = new Object();
    if (foundIssue) {
        modifications.color = issueColor;
        modifications.opacity = 0.5;
    }
    return modifications;
};
highlightZigZagsComponents.getBackground = function() {
    return 'rgba(238,16,0,0.5)';
};

//  
// USER SELECTIONS DEFINITIONS FILE  
//  
var RoadTypeString = {
    1 : "Streets",
    2 : "Primary Street",
    3 : "Freeways",
    4 : "Ramps",
    5 : "Walking Trails",
    6 : "Major Highway",
    7 : "Minor Highway",
    8 : "Dirt roads",
    10 : "Pedestrian Bw",
    16 : "Stairway",
    17 : "Private Road",
    18 : "Railroad",
    19 : "Runway/Taxiway",
    20 : "Parking Lot Road",
    21 : "Service Road"
};

var speedColor = new WMEFunction("_cbHighlightSpeed", "Speed");
var MAX_THRESHOLD_SPEED = 100;
var MIN_WIDTH_SPEED = 4;
var MAX_WIDTH_SPEED = 10;
var MIN_OPACITY_SPEED = 0.4;
var MAX_OPACITY_SPEED = 0.99;

speedColor.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    var speedToUse = getSegmentSpeed(wazeLineSegment.segment);
    if (isNaN(speedToUse)) {
        speedToUse = 0;
    }
    var percentageWidth = Math.min(speedToUse, MAX_THRESHOLD_SPEED - 1) / MAX_THRESHOLD_SPEED;
    modifications.opacity = ((MAX_OPACITY_SPEED - MIN_OPACITY_SPEED) * percentageWidth) + MIN_OPACITY_SPEED;
    modifications.width = ((MAX_WIDTH_SPEED - MIN_WIDTH_SPEED) * percentageWidth) + MIN_WIDTH_SPEED;
    if (speedToUse < 1) {
        modifications.color = "#000";
        modifications.opacity = 0.2;
    } else {
        modifications.color = getScaledColour(speedToUse, 100);
    }
    return modifications;
};

/*
 * HIGHLIGHT NO CITY
 */
var highlightNoCity = new WMEFunction("_cbHighlightNoCity", "No City");
highlightNoCity.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    if (wazeLineSegment.noCity) {
        modifications.color = "#ff0";
        modifications.opacity = 0.3;
    }
    return modifications;
};
highlightNoCity.getBackground = function() {
    return 'rgba(255,255,0,0.3)';
};

/*
 * highlight UNNAMED
 */
var highlightNoName = new WMEFunction("_cbHighlightUnnamed", "Unnamed Street");
highlightNoName.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    if (wazeLineSegment.noName) {
        if (isTrafficRelevant(wazeLineSegment.attributes.roadType)) {
            modifications.color = "#424";
            modifications.opacity = 0.7;
        }
    }
    return modifications;
};
highlightNoName.getBackground = function() {
    return 'rgba(64,32,64,0.7)';
};

/*
 * highlight ALTERNATE NAME
 */
var highlightWithAlternate = new WMEFunction("_cbHighlightWithAlternate", "With Alternate Name");
highlightWithAlternate.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    if (wazeLineSegment.attributes.streetIDs && wazeLineSegment.attributes.streetIDs.length > 0) {
        modifications.color = "#FFFF00";
        modifications.opacity = 0.7;
    }
    return modifications;
};
highlightWithAlternate.getBackground = function() {
    return 'rgba(256,256,0,0.7)';
};

/*
 * highlight CONST ZN
 */
var highlightConstZn = new WMEFunction("_cbHighlightConstZn", "CONST ZN Street");
highlightConstZn.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();

    if (!wazeLineSegment.noName && wazeLineSegment.getStreetName().indexOf('CONST ZN') != -1) {
        modifications.color = "#FFBB00";
        modifications.opacity = 0.7;
    }
    return modifications;
};
highlightConstZn.getBackground = function() {
    return 'rgba(255,187,0,0.7)';
};

function getCurrentHoverSegment() {
    return highlightSegmentMonitor.getLatestSegment();
}

/*
 * highlight SAME NAME
 */
var highlightSameName = new WMEFunction("_cbHighlightSameName", "Same Street Name");
highlightSameName.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    var segment = getCurrentHoverSegment();
    if (segment != null) {
        var highlightedStreetID = segment.attributes.primaryStreetID;
        if (wazeLineSegment.attributes.primaryStreetID === highlightedStreetID) {
            if (wazeLineSegment.segment.fid !== segment.fid) {
                modifications.dasharray = "5 15";
            }
            modifications.color = "#0ad";
            modifications.opacity = 0.5;
        }
    }
    return modifications;
};
highlightSameName.getBackground = function() {
    return 'rgba(0,160,208,0.5)';
};

/*
 * highlight TOLL
 */
var highlightToll = new WMEFunction("_cbHighlightToll", "Toll");
highlightToll.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    if (wazeLineSegment.attributes.fwdToll) {
        modifications.color = wazeLineSegment.attributes.locked ? "#ff0000" : "#00f";
        modifications.opacity = 0.5;
        modifications.dasharray = "5 15";
    }
    return modifications;
};
highlightToll.getBackground = function() {
    return 'rgba(0,0,255,0.5)';
};

/*
 * highlight NO DIRECTION
 */
var highlightNoDirection = new WMEFunction("_cbHighlightNoDirection", "Unknown Direction");
highlightNoDirection.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    if (wazeLineSegment.noDirection) {
        modifications.color = "#00f";
        modifications.opacity = 0.3;
    }
    return modifications;
};
highlightNoDirection.getBackground = function() {
    return 'rgba(0,0,255,0.3)';
};

/*
 * highlight ONE WAY
 */
var highlightOneWay = new WMEFunction("_cbHighlightOneWay", "One Way");
highlightOneWay.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    if (wazeLineSegment.oneWay) {
        modifications.color = "#00f";
        modifications.opacity = 0.2;
    }
    return modifications;
};
highlightOneWay.getBackground = function() {
    return 'rgba(0,0,255,0.2)';
};
var highlightNoTerm = new WMEFunction("_cbHighlightNoTerm", "Unterminated");
highlightNoTerm.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    if (wazeLineSegment.attributes.toNodeID == null || wazeLineSegment.attributes.fromNodeID == null) {
        modifications.color = "#FC0";
        modifications.opacity = 0.7;
    }
    return modifications;
};
highlightNoTerm.getBackground = function() {
    return 'rgba(255,208,0,0.7)';
};

var highlightEditor = new WMEFunctionExtended("_cbHighlightEditor", "Specific Editor");
highlightEditor.getModifiedAttrs = function(wazeLineSegment) {
    var selectUser = getId(highlightEditor.getSelectId());
    var selectedUserId = selectUser.options[selectUser.selectedIndex].value;
    var updatedBy = wazeLineSegment.attributes.updatedBy;

    var modifications = new Object();
    if (updatedBy == selectedUserId) {
        modifications.color = "#00ff00";
        modifications.opacity = 0.5;
    }
    return modifications;
};
highlightEditor.buildExtended = function() {
    return '<select id="' + this.getSelectId() + '" name="' + this.getSelectId() + '"><br />';
}
highlightEditor.init = function() {
    getId(this.getCheckboxId()).onclick = highlightSegments;
    getId(this.getSelectId()).onchange = this.getSelectFieldChangeFunction();
}
highlightEditor.getBackground = function() {
    return 'rgba(0,255,0,0.5)';
};
var highlightRecent = new WMEFunctionExtended("_cbHighlightRecent", "Recently Edited");
highlightRecent.getModifiedAttrs = function(wazeLineSegment) {
    var numDays = getId(this.getSelectId()).value;
    if (numDays == undefined) {
        numDays = 0;
    }
    var tNow = new Date();
    var tDif = (tNow.getTime() - wazeLineSegment.updatedOn.getTime()) / 86400000;
    var modifications = new Object();

    if (numDays >= 0 && tDif <= numDays) {
        var heatScale = 0.75 / numDays;
        modifications.color = "#0f0";
        modifications.opacity = Math.min(0.999999, 1 - (tDif * heatScale));
    }
    return modifications;
};
highlightRecent.buildExtended = function() {
    return '<input type="number" min="0" max="365" size="3" value="7" id="' + this.getSelectId() + '" /> days';
}
highlightRecent.init = function() {
    getId(this.getCheckboxId()).onclick = highlightSegments;
    getId(this.getSelectId()).onfocus = populateUserList;
    getId(this.getSelectId()).onchange = highlightSegments;
};
highlightRecent.getBackground = function() {
    return 'rgba(0,255,0,0.7)';
};

/*
 * LOCKED segments
 */
var highlightLocked = new WMEFunctionExtended("_cbHighlightLocked", "Locked");
highlightLocked.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    if (wazeLineSegment.attributes.locked) {
        modifications.color = "#B00";
        modifications.opacity = 0.8;
    }
    return modifications;
};
highlightLocked.getBackground = function() {
    return 'rgba(176,0,0,0.8)';
};

var highlightRoadType = new WMEFunctionExtended("_cbHighlightRoadType", "Road Type");
highlightRoadType.roadTypeStrings = RoadTypeString;
highlightRoadType.getModifiedAttrs = function(wazeLineSegment) {

    var currentRoadTypeElement = getId(this.getSelectId());
    var currentRoadType = currentRoadTypeElement.options[currentRoadTypeElement.selectedIndex].value;
    if (currentRoadType == undefined) {
        currentRoadType = 0;
    }

    var modifications = new Object();
    if (currentRoadType == wazeLineSegment.attributes.roadType) {
        modifications.color = "#0f0";
        modifications.opacity = 0.5;
    }
    return modifications;
};
highlightRoadType.buildExtended = function() {
    return '<select id="' + this.getSelectId() + '" name="' + this.getSelectId() + '">';
}
highlightRoadType.init = function() {
    populateOption(this.getSelectId(), this.roadTypeStrings);
    getId(this.getCheckboxId()).onclick = highlightSegments;
    getId(this.getSelectId()).onchange = this.getSelectFieldChangeFunction();
};
highlightRoadType.getBackground = function() {
    return 'rgba(0,255,0,0.5)';
};

var highlightCity = new WMEFunctionExtended("_cbHighlightCity", "City");
highlightCity.getModifiedAttrs = function(wazeLineSegment) {

    var currentCityElement = getId(this.getSelectId());
    var currentCity = currentCityElement.options[currentCityElement.selectedIndex].value;
    if (currentCity == undefined) {
        currentCity = 0;
    }

    var modifications = new Object();
    if (currentCity == wazeLineSegment.cityID) {
        modifications.color = "#0f0";
        modifications.opacity = 0.5;
    } else if (currentCity == WME_ADD_UNKNOWN && wazeLineSegment.noCity) {
        modifications.color = "#0f0";
        modifications.opacity = 0.5;
    }
    return modifications;
};
highlightCity.buildExtended = function() {
    return '<select id="' + this.getSelectId() + '" name="' + this.getSelectId() + '">';
}
highlightCity.init = function() {
    getId(this.getCheckboxId()).onclick = highlightSegments;
    getId(this.getSelectId()).onchange = this.getSelectFieldChangeFunction();
};
highlightCity.getBackground = function() {
    return 'rgba(0,255,0,0.5)';
};

var highlightStreet = new WMEFunctionExtended("_cbHighlightStreet", "Street");
highlightStreet.getModifiedAttrs = function(wazeLineSegment) {

    var currentCityElement = getId(this.getSelectId());
    var currentCity = currentCityElement.options[currentCityElement.selectedIndex].value;
    if (currentCity == undefined) {
        currentCity = 0;
    }

    var modifications = new Object();
    if (currentCity == wazeLineSegment.cityID) {
        modifications.color = "#0f0";
        modifications.opacity = 0.5;
    } else if (currentCity == WME_ADD_UNKNOWN && wazeLineSegment.noCity) {
        modifications.color = "#0f0";
        modifications.opacity = 0.5;
    }
    return modifications;
};
highlightStreet.buildExtended = function() {
    return '<select id="' + this.getSelectId() + '" name="' + this.getSelectId() + '">';
}
highlightStreet.init = function() {
    getId(this.getCheckboxId()).onclick = highlightSegments;
    getId(this.getSelectId()).onchange = this.getSelectFieldChangeFunction();
};
highlightStreet.getBackground = function() {
    return 'rgba(0,255,0,0.5)';
};

var highlightShortSegments = new WMEFunctionExtended("_cbHighlightShortSegments", "Short");
highlightShortSegments.getModifiedAttrs = function(wazeLineSegment) {
    var length = getId(this.getSelectId()).value;
    if (length == undefined) {
        length = 0;
    }

    var modifications = new Object();
    if (wazeLineSegment.attributes.length < length) {
        modifications.color = "#f33";
        modifications.opacity = 0.8;
        modifications.width = 15;
    }
    return modifications;
};
highlightShortSegments.buildExtended = function() {
    return '<input type="number" min="0" max="100" value="5" size="3" id="' + this.getSelectId() + '" /> meters';
}
highlightShortSegments.init = function() {
    getId(this.getCheckboxId()).onclick = highlightSegments;
    getId(this.getSelectId()).onchange = highlightSegments;
    getId(this.getSelectId()).onchange = highlightSegments;
};
highlightShortSegments.getBackground = function() {
    return 'rgba(255,51,51,0.8)';
};
var highlightNull = new WMEFunction("_cbHighlightNull", "NULL");
highlightNull.getModifiedAttrs = function(wazeLineSegment) {
    var modifications = new Object();
    modifications.color = "#dd7700";
    modifications.opacity = 0.001;
    modifications.dasharray = "none";
    modifications.width = 8;
    return modifications;
};

var geometrySection = new SelectSection("Geometry", 'WME_geometry_section', [highlightExcessComponents, highlightLowAngles, highlightZigZagsComponents, highlightCloseComponents, highlightNoTerm, highlightShortSegments]);
var highlightSection = new SelectSection("Highlight Segments", 'WME_Segments_section', [highlightOneWay, highlightNoDirection, highlightToll, highlightNoName, highlightWithAlternate, highlightCity, speedColor, highlightRoadType, highlightSameName, highlightConstZn]);
var advancedSection = new SelectSection("Advanced", 'WME_Advanced_section', [highlightEditor, highlightRecent, highlightLocked]);

var selectSections = [highlightSection, geometrySection, advancedSection];

var allModifiers = [];
/**  The list of all modifiers to display **/
for (var i = 0; i < selectSections.length; i++) {
    allModifiers = allModifiers.concat(selectSections[i].selections);
}

var hoverDependentSections = [highlightSameName];
// var allModifiers = [geometrySection.selections, highlightSection.selections, advancedSection.selections];
//  
// POPUP DIALOG  
//  
var WME_ADD_Popup = document.createElement('div');
WME_ADD_Popup.id = 'WME_ADD_Popup';
getId('editor-container').appendChild(WME_ADD_Popup);

var InterstateRegEx = /^I-\d\d\d? /;

function showPopup(segment) {
//	var segment = getCurrentHoverSegment();
    if(segment != null) {
//        var cmpnnts = segment.geometry.components;
//        var compSegs = getComponentsProperties(cmpnnts);
        var popupClass = "";
		if(segment.attributes.locked) {
			popupClass += "locked";
		}
        var userString = "<div id='popup_container' class='" + popupClass + "'>";
        
        var sid = segment.attributes.primaryStreetID;
        var street = wazeModel.streets.get(sid);
        if(typeof street != 'undefined') {
            var isFreeway = false;
            var streetStyleClass = 'WME_ADD_streetSign';
			switch(segment.attributes.roadType) {
			case 3 : //freeway
                isFreeway = true;
                break;
			case 17: // Private Road
				streetStyleClass = 'WME_ADD_privateStreet';
				break;
			case 20: // Parking Lot Road
				streetStyleClass = 'WME_ADD_parkingLot';
				break;
			case 5:  //Walking Trails
			case 10: //Pedestrian Bw
				streetStyleClass = 'WME_ADD_trailSign';
                break;
			default: 
				break;
			}
            if(sid && street.name !== null) {
                var streetName = street.name; 
                var isInterstate = false;
                if(isFreeway) { // freeway
                    var regexMatch = streetName.match(InterstateRegEx);
                    if(regexMatch != null) {
                        isInterstate = true;
                        streetStyleClass = 'WME_ADD_interstate';
                        var interstateNum = regexMatch.first().substr(2).trim();
                        streetName = interstateNum;
                    }
                }
                
                // Add "Toll"
                if(segment.attributes.revToll || segment.attributes.fwdToll) {
                    userString += "<div id='WME_ADD_tollRoad'>Toll</div>"
                }

                // Add "One Way" arrow
                if(!isFreeway && isOneWay(segment)) {
                    userString += "<div style='background: #000; color:#fff;font-size:.92em;font-weight:bold;line-height:.7em;'>"
                    userString += "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAARCAAAAAC6bKD1AAABp0lEQVR4XpXRX0hTcRyH4dfDZDW0CSPWqoVnEQghXfQHodNVXYaRYGAXFVjkRRTBumgjCJMZWkMLgnkRWWIorYZhrVKSwv5ehLnFcSw4DaE11s1ghcnhF4yzc+487Ll/4cvnSyHzfLoGL7K/UXdgwztyBEtrhqfYaRdiYhOmV5KOnflVjqVOYHIAbF7PWtRWPKNdPT8wJIA5IRbiZTEn/n7Uksl3QuS/Lau5rFj8mdJE+bWoKJ2TjMOoeN+ZOMrhZCH4uPfRLCz13rp0b4auwVLH6rUZKhpvv2kBwEjGIveLy86QDh3RMMja289ZOS1N7dt9PhHCsP9LuN5K8s0055v2jsKNtjL4tF87X8qTBz0f+icHXFSt63tYZybeHDkvV2MQTjeAo3HPgeLWuFo34Qm0YdKHTgozOR46s8GPrwfiFy4DsqL4ljY+S07rWNLKxXJ1ZFDGMlFiBA/5tlMP9PsbHjTdwX135aabCv5dj6xYfznlAvqoCmIwjO8CPp1eBCvRWIu7Bf5cGdapJhJ2FCezZ79jSW3BxrYn3RKmgEphYaomX4v/Ae4Q1fDFrZZBAAAAAElFTkSuQmCC' />"
                    userString += "</div>"
                }
                

                userString += "<div id='popup_street_name' class='" + streetStyleClass + "'>";
                var streetNamePieces = streetName.split('/');
                for(var snpIndex = 0; snpIndex < streetNamePieces.length; snpIndex++) {
                    var prefixStr = "";
                    var suffixStr = "";
                    var steetNamePiece = streetNamePieces[snpIndex].trim();
                    for(var i = 0; i < FRONT_ABBREVS.length; i++) {
                        var strToMatch = FRONT_ABBREVS[i] + " ";
                        var startIndex = steetNamePiece.search(strToMatch)
                        if(startIndex == 0) {
                            prefixStr = "<span id='street_name_prefix'>" + steetNamePiece.slice(startIndex,strToMatch.length) + "</span>";
                            steetNamePiece = steetNamePiece.slice(strToMatch.length);
                            break;
                        }
                    }
                    for(var i = 0; i < END_ABBREVS.length; i++) {
                        var strToMatch = " " + END_ABBREVS[i];
                        var expectedIndex = steetNamePiece.length - strToMatch.length;
                        if(expectedIndex > 0 && steetNamePiece.search(strToMatch) == expectedIndex) {
                            suffixStr = "<span id='street_name_suffix'>" + steetNamePiece.slice(expectedIndex) + "</span>";
                            steetNamePiece = steetNamePiece.slice(0, expectedIndex);
                            break;
                        }
                    }
                    userString += prefixStr + steetNamePiece + suffixStr;
                    if(snpIndex != streetNamePieces.length - 1) {
                        userString += '<br />';
                    }
                }
                userString += "</div>";
            }
            var city = wazeModel.cities.get(street.cityID);
            if(city && city.name) {
                userString += "<div id='popup_street_city' class='" + streetStyleClass + "'>"
                userString += city.name;
                userString += "</div>"
            }
        }
        
        var speedToUse = getSegmentSpeed(segment);
        if(!isNaN(speedToUse)) {
            userString += "<div id='popup_speed'>"
            userString += "<div id='popup_speed_header'>SPEED<br />LIMIT</div><div id='popup_speed_value'>" + speedToUse + "</div>"
            userString += "</div>";
        }
        userString += "</div>"
        WME_ADD_Popup.innerHTML = userString;
    }
    else {
        WME_ADD_Popup.innerHTML = "";
    }
}//  
// CORE FILE  
//  

var DEBUG = false;

var possibleWazeMapEvents = ["mouseout", "zoomend"];
var possibleControllerEvents = ["loadend"];
var possiblePendingControllerEvents = [];
var possibleSelectionModifyEvents = ["deactivate", "featuredeselected"];
var possibleSelectionEvents = ["selectionchanged"];
var possibleSelectionModifyHoverEvents = [];
var possibleActionEvents = [];


var webStorageSupported = ('localStorage' in window) && window['localStorage'] !== null;

function highlightAllSegments() {
    modifySegements(highlightNull);
    highlightSegments(allModifiers);
}

function highlightSegments(modifiers) {
    if(!modifiers) {
        modifiers = allModifiers;
    }
	for (var i = 0; i < modifiers.length; i++) {
		var segModGroup = modifiers[i];
		var isChecked = getId(segModGroup.getCheckboxId()).checked
		if (isChecked) {
			modifySegements(segModGroup);
		}
		if(webStorageSupported) {
			if(isChecked) {
				window.localStorage.setItem(segModGroup.checkboxId, 'checked');
			} else {
				window.localStorage.removeItem(segModGroup.checkboxId);
			}
		}
	}
	return true;
}

function enumerateAllModifiers(work) {
    for (var i = 0; i < allModifiers.length; i++) {
        var segModGroup = allModifiers[i];
        work(segModGroup);
    }
}

function modifySegements(modifier) {
    for (var seg in wazeModel.segments.objects) {
        var segment = wazeModel.segments.get(seg);
        var attributes = segment.attributes;
        var line = getId(segment.geometry.id);

        if (line != null) {
            var sid = attributes.primaryStreetID;
            if (sid == null)
                continue;
            var street = wazeModel.streets.get(sid);
			if(street == null) {
				continue;
			}
            var currentColor = line.getAttribute("stroke");
            var currentOpacity = line.getAttribute("stroke-opacity");
            var currentDashes = line.getAttribute("stroke-dasharray");
            var currentWidth = line.getAttribute("stroke-width");

            // check that WME hasn't highlighted this segment
            if (currentOpacity == 1 || currentWidth == 9) {
                continue;
            }

            var roadType = attributes.roadType;
            if (wazeMap.zoom <= 3 && (roadType < 2 || roadType > 7)) {
                if (currentOpacity > 0.1) {
                    line.setAttribute("stroke", "#dd7700");
                    line.setAttribute("stroke-opacity", 0.001);
                    line.setAttribute("stroke-dasharray", "none");
                }
                continue;
            }

            var wazeLineSeg = new WazeLineSegment(segment, street);
            var lineMods = modifier.getModifiedAttrs(wazeLineSeg);

            var newColor = lineMods.color ? lineMods.color : currentColor;
            line.setAttribute("stroke", newColor);

            if (lineMods.color && lineMods.color != currentColor) {
            }
            if (lineMods.opacity && lineMods.opacity != currentOpacity) {
                line.setAttribute("stroke-opacity", lineMods.opacity);
            }
            if (lineMods.dasharray && lineMods.dasharray != currentDashes) {
                line.setAttribute("stroke-dasharray", lineMods.dasharray);
            }
            if (lineMods.width && lineMods.width != currentWidth) {
                line.setAttribute("stroke-width", lineMods.width);
            }
        }
    }
}

// add logged in user to drop-down list
function initUserList() {
    var thisUser = loginManager.getLoggedInUser();
    var selectUser = getId(highlightEditor.getSelectId());
    var usrOption = document.createElement('option');
    var usrText = document.createTextNode(thisUser.userName + " (" + thisUser.rank + ")");
    usrOption.setAttribute('value', thisUser.id);
    usrOption.appendChild(usrText);
    selectUser.appendChild(usrOption);
}

function populateOption(selectId, optionsMap) {
    var select = getId(selectId);
    var currentId = null;
    if (select.selectedIndex >= 0) {
        currentId = select.options[select.selectedIndex].value;
    }
    select.options.length = 0;

    var foundSelected = false;
    for (var key in optionsMap) {
        var text = optionsMap[key];
        var selectOption = document.createElement('option');
        var selectText = document.createTextNode(text);
        if (currentId != null && key == currentId) {
            selectOption.setAttribute('selected', true);
            foundSelected = true;
        }
        selectOption.setAttribute('value', key);
        selectOption.appendChild(selectText);
        select.appendChild(selectOption);
    }

}

// populate drop-down list of Cities
function populateCityList() {
    var cityIds = new Object();
    cityIds[WME_ADD_UNKNOWN] = "No City";
    for (var cit in wazeModel.cities.objects) {
        var city = wazeModel.cities.get(cit);
        if (city && cityIds[city.id] == null && city.name != null && city.name.length > 0) {
            var cityName = city.name;
            var state = wazeModel.states.get(city.stateID);
            if(state && state.name != null && state.name.length > 0) {
                cityName += ', ' + state.name;
            }
            cityIds[city.id] = cityName;
        }
    }
    populateOption(highlightCity.getSelectId(), cityIds);  
}

// populate drop-down list of editors
function populateUserList() {
    var editorIds = new Object();
    for (var seg in wazeModel.segments.objects) {
        var segment = wazeModel.segments.get(seg);
        var updatedBy = segment.attributes.updatedBy;
        if (editorIds[updatedBy] == null) {
            var user = wazeModel.users.get(updatedBy);
            if (user == null || user.userName.match(/^world_|^usa_/) != null) {
                continue;
            }
            editorIds[updatedBy] = user.userName;
        }
    }
    populateOption(highlightEditor.getSelectId(), editorIds);
}

function getId(node) {
    return document.getElementById(node);
}

function createSectionHeader(title, opened) {
    var indicator = "&lt;&lt;"
    if(!opened) {
        indicator = "&gt;&gt;"
    }
    return '<span style="font-size:1.2em;"><b>' + title + '</b></span><span style="float:right;padding:0;margin:0 0 0 2px;border: 1px solid #999; background: #aaa; color:#fff;">' + indicator + '</span>'
}

function createSection(sectionItem) {
    var thisSectionItem = sectionItem;
    // advanced options
    var section = document.createElement('div');
    section.style.marginTop = "4px";
    section.style.padding = "4px";
    section.style.borderStyle = "solid";
    section.style.borderWidth = "1px";
    section.style.borderColor = "#aaa";
    section.id = thisSectionItem.id;
    var aheader = document.createElement('div');
    aheader.innerHTML = createSectionHeader(thisSectionItem.header, false);
    aheader.style.display = 'block';
    aheader.style.cursor = 'pointer';

    section.appendChild(aheader);
    
    var segmentsContainer = document.createElement('div');
    segmentsContainer.style.display = 'none';
    aheader.onclick = function() {
        if(segmentsContainer.style.display == 'block') {
            segmentsContainer.style.display = 'none';
            aheader.innerHTML = createSectionHeader(thisSectionItem.header, false);
        } else {
            segmentsContainer.style.display = 'block';
            aheader.innerHTML = createSectionHeader(thisSectionItem.header, true);
        }
    };
    section.appendChild(segmentsContainer);
    
    var modifiers = thisSectionItem.selections;
    for (var i = 0; i < modifiers.length; i++) {
        var segMod = modifiers[i];
        var segmentContainer = document.createElement('div');
        
        var segmentColor = document.createElement('div');
        segmentColor.innerHTML="▶";
        segmentColor.style.color = segMod.getBackground();
        segmentColor.style.textShadow = "1px 1px 2px #333";
        segmentColor.style.cssFloat = "left";
        segmentColor.style.height = "100%";
        segmentColor.style.lineHeight = "100%";
        segmentColor.style.verticalAlign = "middle";
        
        var segmentBuild = document.createElement('div');
		var isChecked = window.localStorage.getItem(segMod.getCheckboxId()) === 'checked';
        segmentBuild.innerHTML = segMod.build(isChecked);
        segmentBuild.style.paddingLeft = "1.5em";
        
        segmentContainer.appendChild(segmentColor);
        segmentContainer.appendChild(segmentBuild);
        //    segmentContainer.style.background = segMod.getBackground();
        segmentsContainer.appendChild(segmentContainer);
    }
    return section;
}

function toggleAddonVisible() {
    var visibleElement = getId("highlight-addon");
    if(visibleElement.style.display == "none") {
        visibleElement.style.display = "block";
    }
    else {
        visibleElement.style.display = "none";
    }
}

var stylizer = document.createElement('style');
stylizer.innerHTML = "#WME_ADD_addOnToggle{"
stylizer.innerHTML += generateTopDownGradient('#eeeeee', '#cccccc');
stylizer.innerHTML += "border: 1px solid #ccc; \
border-bottom: 1px solid #bbb; \
-webkit-border-radius: 3px; \
-moz-border-radius: 3px; \
-ms-border-radius: 3px; \
-o-border-radius: 3px; \
border-radius: 3px; \
color: #333; \
font: bold 11px 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Verdana, sans-serif;\
padding: 0.1em 0.2em; \
text-shadow: 0 1px 0 #eee; \
width: 120px; } "
stylizer.innerHTML += "#WME_ADD_addOnToggle:hover{ "
stylizer.innerHTML += generateTopDownGradient('#dddddd', '#bbbbbb');
stylizer.innerHTML += "border: 1px solid #bbb; \
border-bottom: 1px solid #999; \
cursor: pointer; \
text-shadow: 0 1px 0 #ddd; } "
stylizer.innerHTML += 
"#WME_ADD_addOnToggle:active{ \
    border: 1px solid #aaa; \
    border-bottom: 1px solid #888; \
    -webkit-box-shadow: inset 0 0 5px 2px #aaaaaa, 0 1px 0 0 #eeeeee; \
    -moz-box-shadow: inset 0 0 5px 2px #aaaaaa, 0 1px 0 0 #eeeeee; \
    box-shadow: inset 0 0 5px 2px #aaaaaa, 0 1px 0 0 #eeeeee; \
} "
stylizer.innerHTML += "#WME_ADD_Popup {background: #fff;position:absolute;bottom:48px;right:24px;}"
stylizer.innerHTML += "#WME_ADD_Popup #popup_container {text-align: center;font-size: 1.1em; margin: 1px; border:solid 1px #000;border-radius: 2px;}"
stylizer.innerHTML += "#WME_ADD_Popup #popup_container.locked {border:solid 2px #f00;}"

stylizer.innerHTML += "#WME_ADD_Popup #popup_container #popup_street_name {font-size:.8em; margin:0;padding:0;line-height:1em;}"
stylizer.innerHTML += "#WME_ADD_Popup #popup_container #popup_street_name #street_name_prefix {font-size: .6em;vertical-align:middle;}"
stylizer.innerHTML += "#WME_ADD_Popup #popup_container #popup_street_name #street_name_suffix {font-size: .65em;vertical-align:top;}"

stylizer.innerHTML += "#WME_ADD_Popup #popup_container #popup_street_city {font-size:.8em;margin:1px 0 0 0;padding:0;line-height:1em;}"
stylizer.innerHTML += "#WME_ADD_Popup .WME_ADD_parkingLot, #WME_ADD_Popup .WME_ADD_privateStreet {\
background-color:#aaa;\
color:#000;\
font-style:italic;\
}"
stylizer.innerHTML += "#WME_ADD_Popup .WME_ADD_parkingLotSign {\
height:21px;\
padding-right:17px;\
background-position:right center;\
background-repeat:no-repeat;\
background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAVCAYAAABR915hAAAACXBIWXMAAABPAAAATwFjiv3XAAACQElEQVR42sXWT2iUZxDH8c/srtu4zUGtVrBtpBaEokgNohR7CHjyYkvBkxXU2igpIoIgCB7EevQWxKiotILg0lLspdSqFy+CFMVDS0Gwaq0aSeK/YjTJ9LJqupBVE40Dz+Ed5nm/88wz83vf0OUe3vRs+xdXcRyd2Z5/GIMVXiC2gtn4GudjX6wZL/BwK0v7oiu+GC046kp9GWdGiG3Gx5g0bHe3Ju/nyrz/ouBS3fPpbM8VI2Z5MKZ55CcsAmmaBz7Hd6+01Lk6u7EK+dSpbVzuuNbNvcNcU8YFHPtjXh3s71cOjt3xniGH69rz7GjA9c21JLri1Aj9X1bSiqZh3n80qb4M8HRh+nMOYkobRzNKYxGQ+9LqbM/qaAWk/sT30N0g/pZwUujMtXl1LJJZDz7WSEBephW8Jntt4NIzm3dPzDXBtfwye+JQTPKgptNlF3JNXouuWJDr8mzsjVZFlwx62x1XNJvjLef8ZYKKluzI32N/vGvQfG843vDEUY2igqohm0C/DxVsVvSRAT/G9igLO2NPLMQ3PnBHWq+iRcEuvbaoaFHSEXtjqiFHhXke2tq41H2Woiq1RTXKtfkdlPprKh2oKDiMX7ItB/73x5IWK5pT+5gsEb7FAeGHxuAh67AUM/X5rPaCXsyQvs8N2Y9moQPLnyT3eDcbhJ21hHvxDlqlnwu4iRu1dftJmQ/EDNzSbqGJFkif4hF+028bPontUZL+zK/yVxzRYxnuKhpAn+suSp3SXZOdkGZhG3b8B9u3s4ceFzVrAAAAAElFTkSuQmCC');\
}"
stylizer.innerHTML += "#WME_ADD_Popup .WME_ADD_streetSign {background: #006F53; color:#fff;}"
stylizer.innerHTML += "#WME_ADD_Popup .WME_ADD_trailSign {background: #8C6019; color:#000; font-weight:bold;}"
stylizer.innerHTML += "#WME_ADD_Popup #popup_container #popup_street_name.WME_ADD_interstate {background-color: #006F53; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAAsTAAALEwEAmpwYAAADPElEQVR42rXWzWsTWxjH8e+cTgiTVNvEoi5sqvW1paCiFBciWKluAiKC4E7c6EKqCK5c+A8IbisqKCJuFAQ3roW6sCAl+NJILDY1jZnO5MWazOT1uYvJrVdvq6jTHwNz5uE5Hw4zzMzRRAQALMvqSCQYGiIQADRN8+rthnqdyUmUYv9+dH2ZhlpN3r5l9+5oNOrVde9ULpfDjx8b588TCjEwQG8vPT2EQjgOts3cHG/eUKkAhMMMDbFpE9EohkGlgmUxO8v0NI7z9e5d59QpwzAA5dFOLmdcuwawdy8bNpBO8/o1a9YwPc3Wreg6Y2Ps2MHZs+zZw65dGAavXvHoEZEIlQoHD3LkCNB59WrZND1TAYVCIXL7NrkcwPAwx49z8SKpFJUKPT0kk+g6tRojIwwOYll8+EAySTzO6CjFIhMT9PczMQGQyXTdv18qldp0q1zuuHWLpSSTbNny7bJYBNi8mRcvuHePkyfb9b4+Bgf594ZSq3nDwM2bDccBdMdxjGfPsKx2UyIBMDWF65JIYNscPcrLl4yPE4mwbx+Tk3z+TKvFgwd0dFCp0GhQLDIywtOnAJ8+BZ4/r584odm2/WWq6M7M419CA7HOgU4WFux16wT8PPr6xLZtlU5rto2/SafJ5zU1M4PvEeHdO1f5vmQvi4sB1WwGV8UmpAKB2mrAuu6qaFRWg167tqr6+/2nNY2dO4MqFmP9ep/p7dvp6kJpmvfN8jMeqILBYDzu+ksfO/Y1HA4jItmstXGjb295LCa5nCUiCggG1diYbw/z8uVmMKi3/2wiMju70Nvrw5K3bZNMZsEz23SpVHr4sPqXrqbJkyfO4uLid7SImKZ57txf0VeuiGmaS+A3utlsZrPW6OgfuvG4ZLMLrVZrGVpEXNf9+LFw6NBvu4cPy9xcoVar/Vf7jvb0TMY+ffo33DNnZH7edl33B+pHWkTq9XouZ46PN7u7f4FGo3LnTsM0zUaj8X9nGdqLbdup1JcLF8QwlkFDIbl0SVKpQj6fX0lYkRaRarVqWVYyWbh+XYaHRSlRSg4ckBs35P37vGVZ9Xr9J9O1pe3kSmk2m95uyLY1pYhEBOju7lZK/XziPwFBIyW1EjjMAAAAAElFTkSuQmCC'); background-repeat: no-repeat; background-position: center center; color:#fff;font-size:.92em;font-weight:bold;min-height:30px;vertical-align: 2px; line-height: 30px;margin: 0 auto;width: 100%}"
stylizer.innerHTML += ".WME_ADD_interstate#popup_street_city { display: none; }";
stylizer.innerHTML += "#WME_ADD_Popup #WME_ADD_tollRoad {background: #FFC500; color:#000;font-size: .8em; text-transform: uppercase; font-weight: bold;}"



stylizer.innerHTML += 
"#WME_ADD_Popup #popup_container #popup_speed { \
margin:.2em auto; \
padding:.2em; \
text-align:center; \
font-family:Arial, sans-serif; \
border:solid 1px #000; \
border-radius: .2em; \
width:3em; \
letter-spacing: 0.07em; \
}"
stylizer.innerHTML += "#WME_ADD_Popup #popup_container #popup_speed #popup_speed_header {font-size:0.65em;line-height:1.2em;margin:0.2em 0 0.4em;}"
stylizer.innerHTML += "#WME_ADD_Popup #popup_container #popup_speed #popup_speed_value {font-size:2.0em;font-weight:bold;margin:0.2em 0;}"


// add new box to the map
var addonContainer = document.createElement('section');
var clickBarContainer = document.createElement('div');
var clickBar = document.createElement('a');
clickBar.id = "WME_ADD_addOnToggle"
clickBar.innerHTML = 'Show / Hide';
clickBar.style.textAlign = 'center';
clickBar.onclick = toggleAddonVisible;
clickBarContainer.style.margin = '0 auto';
clickBarContainer.style.textAlign = 'center';
clickBarContainer.style.minHeight = '1.2em';
clickBarContainer.appendChild(clickBar);
addonContainer.appendChild(clickBarContainer);

var addon = document.createElement('section');
addon.id = "highlight-addon";

addon.innerHTML = '<b>WME Add</b> ' + version;

for(var i = 0; i < selectSections.length; i++) {
    addon.appendChild(createSection(selectSections[i]));
}

var section = document.createElement('div');
section.innerHTML = '<button type="button" id="_cbRefreshButton">Refresh</button> ';
addon.appendChild(section);

addonContainer.style.fontSize = "0.8em";
addonContainer.style.margin = "8px";
addonContainer.style.background = "#fff"
addonContainer.style.border = "silver solid 1px";
addonContainer.style.position = "absolute";
addonContainer.style.bottom = "24px";
addonContainer.style.clear = "all";
addonContainer.style.padding = "12px";
addonContainer.style.mozBorderRadius = "5px";
addonContainer.style.webkitBorderRadius = "5px";
addonContainer.style.borderRadius = "5px";
addonContainer.style.boxShadow = "2px 2px 5px #000"
addonContainer.appendChild(addon);


getId('editor-container').appendChild(stylizer);
getId('editor-container').appendChild(addonContainer);



// check for AM or CM, and unhide Advanced options
var advancedMode = false;
if (loginManager != null) {
    thisUser = loginManager.getLoggedInUser();
    if (thisUser != null && thisUser.normalizedLevel >= 4) {
        advancedMode = true;
//        initUserList();
        populateUserList();
        populateCityList();
    }
}

// setup onclick handlers for instant update:
getId('_cbRefreshButton').onclick = highlightAllSegments;
enumerateAllModifiers(function(seg) {
    seg.init();
});



function createWazeMapEventAction(actionName) {
    return function() {
        setTimeout(function() {
            highlightAllSegments();
//                    showPopup();

        }, 50);
        return true;
    };
}

function analyzeNodes() {
    var wazeNodes = new Object();
    for (var wazeNode in wazeModel.nodes.objects) {
        var attachedSegments = [];
        for(var wazeSegID in wazeNode.data.segIDs) {
            attachedSegments.push(wazeModel.segments.objects[wazeSegID]);
        }
        wazeNodes[wazeNode.fid] = new WazeNode(wazeNode, attachedSegments);
    }
}

function createEventAction(eventHolderName, actionName) {
    return function() {
        highlightAllSegments();
        populateUserList();
        populateCityList();
//        showPopup();
        return true;
    };
}

function createHighlighAction(eventHolderName, actionName) {
    return function(e) {
        highlightSegmentMonitor.updateLatestSegment(e.feature);
        showPopup(e.feature);
        highlightSegments(hoverDependentSections);
        return true;
    };
}

// trigger code when page is fully loaded, to catch any missing bits
window.addEventListener("load", function(e) {
    thisUser = loginManager.getLoggedInUser();
    if (!advancedMode && thisUser.normalizedLevel >= 4) {
        advancedMode = true;
        populateUserList();
        populateCityList();
    }
    for (var i = 0; i < possibleControllerEvents.length; i++) {
        var eventName = possibleControllerEvents[i];
        controller.events.register(eventName, this, createEventAction("controller", eventName));
    }
    for (var i = 0; i < possibleWazeMapEvents.length; i++) {
        var eventName = possibleWazeMapEvents[i];
        wazeMap.events.register(eventName, this, createWazeMapEventAction(eventName));
    }
    for (var i = 0; i < possiblePendingControllerEvents.length; i++) {
        var eventName = possiblePendingControllerEvents[i];
        pendingControl.events.register(eventName, this, createEventAction("pendingControl", eventName));
    }
    for (var i = 0; i < possibleSelectionModifyEvents.length; i++) {
        var eventName = possibleSelectionModifyEvents[i];
//        selectionManager.modifyControl.events.register(eventName, this, createEventAction("selectionManager.modifyControl", eventName));
    }
    for (var i = 0; i < possibleSelectionEvents.length; i++) {
        var eventName = possibleSelectionEvents[i];
        selectionManager.events.register(eventName, this, createEventAction("selectionManager", eventName));
    }
    for (var i = 0; i < possibleSelectionModifyHoverEvents.length; i++) {
        var eventName = possibleSelectionModifyHoverEvents[i];
  //      selectionManager.modifyControl.featureHover.control.events.register(eventName, this, createEventAction("selectionManager.modifyControl.featureHover.control", eventName));
    }
	for (var i = 0; i < possibleActionEvents.length; i++) {
		var eventName = possibleActionEvents[i];
		wazeModel.actionManager.events.register(eventName, this, createEventAction("wazeModel.actionManager", eventName));
	}
	selectionManager.selectControl.events.register("featurehighlighted", this, createHighlighAction("selectionManager.selectControl", "featurehighlighted"));

    if(DEBUG) {
        selectionManager.registerModelEvents("selectionChanged", this, function(){console.log("sm.blur")});
        selectionManager.events.register("touchstart", this, function(){console.log("sm.mc.touchstart")});
        selectionManager.layers[0].events.register("beforefeatureselected", this, function(){console.log("sm.mc.beforefeatureselected")});
        selectionManager.selectControl.events.register("featurehighlighted", this, function(e){console.log("sm.mc.featurehighlighted : ");});
//        selectionManager.modifyControl.featureHover.control.events.register("activate", this, function(){console.log("sm.mc.fh.c.activate")});
//        selectionManager.modifyControl.featureHover.control.events.register("mouseover", this, function(){console.log("sm.mc.fh.c.mouseover")});
//        selectionManager.modifyControl.featureHover.register("over", this, function(){console.log("sm.mc.fh.-e.over")});
    }
});

