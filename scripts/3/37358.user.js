// ==UserScript==
// @name           WebAdvisor Processor
// @namespace      http://sites.google.com/site/burtonradons/
// @include        https://camlink1.camosun.bc.ca/WebAdvisor/WebAdvisor?*
// @include        https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?*
// @include        https://webadv.uwinnipeg.ca/WebAdvisor/WebAdvisor?*
// @description    Makes WebAdvisor, the interface for registering as a student at many Canadian Colleges and Universities, suck slightly less.
// @version	       0.1.1
// ==/UserScript==

var ScriptName = "WebAdvisor Processor";
// 0.0.9 - Nicer-looking tables when searching for sections.
// Added preliminary support for University of Guelph, University of Winnipeg
// 0.1.0 - When searching for sections, if you click on a row it's added to a trial schedule, so that any other sections that are excluded go red, and the trial section is printed on the table when hovering over other sections.
// 0.1.1 - De-broke Firefox

// Todo:
// - Merge registered classes rather than deleting them, so that stuff like the extended schedule is retained.
// - Load class information when (more...) and stuff like that is found.
// - Hover to show extra class information.
// - Look up registered classes automatically.
// - Option to filter out incompatible sections.
// - 12H clock option.
// - Show schedules on the register and drop classes page.
// - Use section headers to identify tables (i.e. "Current Registrations" instead of "GROUP_Grp_WSS_COURSE_SECTIONS_2").
// - Click on registered sections to hide them to see how your schedule would work with it dropped.

// Prerequisites forms:
// "Prerequisite(s): ..."
//
// '"[Grade]" in [A]' or '[Grade] in [A]', where Grade is C or C+, as in '"C" in Biol 12' or '"C" in ENGL 092 and 094'
// ', or [B]'
// '[DEPT A] and [B]', like 'ENGL 092 and 096'
// '[A], or assessment'
// '; and [A]'
// '[A] or [B]', like 'MATH 100 or MATH 108'
//
// 'Biol 12'
// 'English 11'
// 'English 12'
// 'English 12 First Peoples'
// 'Foundations of Math & Pre-calculus 10'
// 'Principles of Math 10'
    
/// Copy all of the properties in the provided object into this object.
function addProperties(target, properties) {
    for(var property in properties)
        if(properties.hasOwnProperty(property))
            target[property] = properties[property];
};

var tokenIndex = /[?&]TOKENIDX\=(\d+)/.exec(document.URL)[1];
if(window.name != tokenIndex) {
    window.name = tokenIndex; // Spoofing iframes
    return;
}

var dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var dayAbbrevs = ["M", "Tu", "W", "Th", "F"];
	dayAbbrevs.M = 0; dayAbbrevs.Tu = 1; dayAbbrevs.W = 2; dayAbbrevs.Th = 3; dayAbbrevs.F = 4;
var isDay = {M: 1, Tu: 1, W: 1, Th: 1, F: 1};

function isSpace(ch) { return ch == 32 || ch == 9 || ch == 10 || ch == 13 || ch == 160; }

var colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0], [255, 0, 255], [0, 255, 255], [255, 128, 0], [255, 0, 128], [128, 255, 0], [0, 255, 128], [128, 0, 255], [0, 128, 255]];
var colorWhite = [255, 255, 255], colorBlack = [0, 0, 0];
function lerp(from, to, blend, max) { return(from *(max - blend) + to * blend) / max; }
function colorBlend(from, to, blend) { blend = blend < 0 ? 0 : blend > 255 ? 255 : blend; return [Math.floor(lerp(from [0], to [0], blend, 255)), Math.floor(lerp(from [1], to [1], blend, 255)), Math.floor(lerp(from [2], to [2], blend, 255))]; }
function colorToRGB(color) { return "rgb(" + color [0] + ", " + color [1] + ", " + color [2] + ")"; }
function colorIndex(index) { return index > colors.length ? colorWhite : colors [index]; }

function dateToString(date) { return "'" + date.toJSON() + "'"; }

/// Cut up a query string of the form "?a=b&c=d", returning an object like {a="b", c="d"}.
function queryStringSplit(string) {
	var result = {};
	if(string [0] == "?") string = string.slice(1);
	var segments = string.split("&");

	for(var index = 0; index < segments.length; index ++) {
		var phrase = segments [index].split("=");
		if(phrase.length == 2)
			result [unescape(phrase[0])] = result[unescape(phrase[1])];
	}

	return result
}

/// Find a submit button as a child of the node, or in document.body if node is undefined.
function findSubmitButton(node) {
	if(arguments.length == 0)
		node = document.body;
	for(var child = node.firstChild; child; child = child.nextSibling) {
		if(child.nodeName == "INPUT" && (child.name == "SUBMIT" || child.name == "SUBMIT2"))
			return child;
		var result = findSubmitButton(child);
		if(result) return result;
	}
}

cookies = {  
  getItem: function (sKey) {  
    if (!sKey || !this.hasItem(sKey)) { return null; }  
    return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));  
  },  
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {  
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/.test(sKey)) { return; }  
    var sExpires = "";  
    if (vEnd) {  
      switch (typeof vEnd) {  
        case "number": sExpires = "; max-age=" + vEnd; break;  
        case "string": sExpires = "; expires=" + vEnd; break;  
        case "object": if (vEnd.hasOwnProperty("toGMTString")) { sExpires = "; expires=" + vEnd.toGMTString(); } break;  
      }  
    }  
    document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");  
  },  
  removeItem: function (sKey) {  
    //if (!sKey || !this.hasItem(sKey)) { return; }  
    var oExpDate = new Date();  
    oExpDate.setDate(oExpDate.getDate() - 1);  
    document.cookie = escape(sKey) + "=; expires=" + oExpDate.toGMTString() + ";";  
  },  
  hasItem: function (sKey) { return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }  
};  

/// Save all changes.
function save() {
	for(var index = 0; index < save.list.length; index ++)
		save.list[index]()
}
save.list = []

function MMdDDdYYYY_toDate(text) {
	return new Date(Number(text.slice(6, 10)), Number(text.slice(0, 2) - 1), Number(text.slice(3, 5)))
}

// Convert time of the form 02:32PM to its decimal form 1432.
function MMcHHmm_toDecimal(text) {
	var hour = Number(text.slice(0, 2))
	var minute = Number(text.slice(3, 5))
	var pm =(text.slice(5, 7) == "PM")
	
	if(hour == 12)
		hour = pm ? 12 : 0
	else if(pm)
		hour += 12
	return minute + hour * 100
}

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// Extension properties

addProperties(Array.prototype, {
    /// Get whether the array contains the item.
    contains: function(item) { return this.indexOf(item) >= 0; },
    
    /// Remove the item from the array if it's within it; returns whether anything was removed.
    remove: function(item) { var index = this.indexOf(item); if(index < 0) return false; this.splice(index, 1); return true; },
    
    pickle: function(itemPickler) {
        var text = "[";
        if(itemPickler) {
            for(var index = 0; index < this.length; index++) {
                if(index) text += ",";
                text += itemPickler(this[index]);
            }
        } else {
            for(var index = 0; index < this.length; index++) {
                if(index) text += ",";
                text += this[index].pickle();
            }
        }
        text += "]";
        return text;
    }
});

addProperties(Object.prototype, {
    /// (type, callback, capture) Callback is invoked as callback(propertyValue, propertyName, this)
    forEachOwnPropertyValue: function methodObject_forEachOwnPropertyValue(callback, thisArg) {
        if(thisArg)
            callback = callback.bind(thisArg);
        for(var name in this)
            if(this.hasOwnProperty(name))
                callback(this[name], name, this);
    },
    
    /// () Pickle the object into a string. For POD this should just return the toString().
    pickle: function methodObject_pickle() {
        if(this instanceof Number)
            return this.toString();
        if(this instanceof String)
            return '\'' + escape(this) + '\'';
        if(this instanceof Boolean)
            return this ? "true" : "false";
        throw "Cannot pickle " + typeof(this) + ", constructor " + this.constructor;
    },
    
    /// () Pickle a reference to this object. For POD this just returns the same as pickle.
    pickleReference: function methodObject_pickleReference() { return this.pickle(); },
});

addProperties(String.prototype, {
    /// (prefix) Returns whether this string starts with the prefix string.
    startsWith: function methodString_startsWith(prefix) { return this.lastIndexOf(prefix, 0) == 0; },
    
    /// (prefix) If the string starts with the prefix, return a string with it removed; otherwise just return this string.
    sliceOffPrefix: function methodString_sliceOffPrefix(prefix) { return this.startsWith(prefix) ? this.slice(prefix.length) : this; },
});

if(!Document.prototype)
	Document.prototype = {};
addProperties(Document.prototype, {
    createElementWithHtml: function(elementName, html) { var element = this.createElement(elementName); element.innerHTML = html; return element; },
    
    // Create an element with the given name that contains a text node with the given text, then return the outer element.
    createElementWithText: function(elementName, text) { var span = this.createElement(elementName); span.appendChild(this.createTextNode(text)); return span; },
    
    // Create a document fragment containing the HTML content expressed as a string.
    createHTMLFragment: function(html) {
        var fragment = this.createDocumentFragment();
        var div = this.createElement("div");
        div.innerHTML = html;
        while(div.firstChild)
            fragment.appendChild(div.firstChild);
        return fragment;
    },
});

if(!Node.prototype)
	Node.prototype = {};
addProperties(Node.prototype, {
    /// Add an event listener that will be called once, and then be removed.
    addSingleEventListener: function methodNode_addSingleEventListener(type, callback, capture) {
        var self = this;
        
        function methodNode_addSingleEventListener_listener(event) {
            try { callback(event); }
            finally { self.removeEventListener(type, methodNode_addSingleEventListener_listener, capture); }
        }
        
        self.addEventListener(type, methodNode_addSingleEventListener_listener, capture);
    },
    
    /// Append a new element with the given name, and return it.
    appendElement: function(elementName) { return this.appendChild(this.ownerDocument.createElement(elementName)); },
    
    appendElementWithHTML: function(elementName, html) { return this.appendChild(this.ownerDocument.createElementWithHtml(elementName, html)); },

    /// Append a new element with the given name and text content, and return it.
    appendElementWithText: function(elementName, text) { return this.appendChild(this.ownerDocument.createElementWithText(elementName, text)); },
    
    appendHTML: function(html) { return this.appendChild(this.ownerDocument.createHTMLFragment(html)); },

    appendTextNode: function(text) { return this.appendChild(this.ownerDocument.createTextNode(text)); },
    
    /// Return the ancestor (possibly including this node) that has the provided className, or null if not found.
    findAncestorWithClass: function(className) { return (this['className'] == className) ? this : this.parentNode ? this.parentNode.findAncestorWithClass(className) : null; },
    
    insertNext: function(node) { return this.parentNode.insertAfter(node, this); },
    insertAfter: function(node, before) { this.insertBefore(node, before != null ? before.nextSibling : this.firstChild); },
    
    // Remove all children from this node.
    removeAllChildren: function() { var child; while(child = this.lastChild) this.removeChild(child); },
});

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// Error handling
    
/// This gathers a list of errors in the page that indicate there are problems with the script or with the way Camlink has developed.
var Errors = {
    /// List of errors.
    _list: [],
    
    /// Add an error to the list of errors.
    add: function(text) { Errors._list.push(text); },
    
    /// Create a div element that lists the errors, if any; it there are none, this returns null.
    createDiv: function() {
        var list = Errors._list;
        
        if(list.length == 0)
            return;
        var div = document.createElement('div');
        div.style.color = "red";
        div.style.textAlign = "left";
        var mail = "mailto:burton.radons@gmail.com?subject=Camlink%20Processor%20Errors&body=";
        mail += escape('title:' + Page.current.id + '\n');
        list.forEach(function(item) { mail += escape(item + '\n'); });
        div.appendHTML("There have been some errors while applying the " + ScriptName + '. If you could click this link <a href=\"' + mail + '\">burton.radons@gmail.com</a> and send the e-mail it links to, I\'ll fix the script. Thanks!');
        var ul = div.appendElement('ul');
        list.forEach(function(item) { ul.appendElementWithText('li', item); });         
        return div;
    },
    
    report: function() {
        var div = Errors.createDiv();
        if(div) {
            var screenTitle = document.getElementById('screenTitle');
            
            if(screenTitle != null)
                screenTitle.appendChild(div);
            else
                document.body.insertBefore(div, document.body.firstChild);
        }
    },
    
    /// If test is false, report an error as the message. Returns test.
    assert: function(test, message) {
        if(!test)
            this.add(message);
        return test;
    }
};

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// Site management.
function Site(name, prefix, urlPattern, properties) {
    this.name = name;
    this.prefix = prefix;
    this.urlPattern = urlPattern;
    addProperties(this, properties);
}

Site.prototype = {
    getValue: function(name, defaultValue) { return eval(GM_getValue(this.prefix + name, defaultValue)); },
    setValue: function(name, value) { GM_setValue(this.prefix + name, value); },
    
    dayTranslator: {
        M: 'M', Mo: 'M', Mon: 'M', Mond: 'M', Monday: 'M',
        Tu: 'Tu', Tue: 'Tu', Tues: 'Tu', Tuesday: 'Tu',
        W: 'W', We: 'W', Wed: 'W', Wedn: 'W', Wednesday: 'W',
        Th: 'Th', Thu: 'Th', Thur: 'Th', Thurs: 'Th', Thursday: 'Th',
        F: 'F', Fr: 'F', Fri: 'F', Frid: 'F', Friday: 'F'
    },
    
    meetingTypeTranslator: {
        Lecture: 'Lecture', LEC: 'Lecture',
        Laboratory: 'Laboratory', LAB: 'Laboratory', Lab: 'Laboratory',
        Seminar: 'Seminar', SEM: 'Seminar'
    },
    
    /// A map of building names to shortened forms that can be used in the schedule.
    shortBuildingNames: {},
    
    /// This returns an array of meetings by splitting a meeting list into its components.
    splitMeetingList: function(text) { throw "not implemented"; },
    
    getSectionId: function Site_getSectionId(desc) {
        var pattern = /^\w+[-*]\w+[-*]\w+/;
        var match = pattern.exec(desc);
        if(match == null) {
            if(!desc)
                error_descIsNull();
            Errors.add("Cannot parse section id '" + desc + "'.");
            return null;
        }
        return match[0];
    },
    
    splitSection: function(section, desc) {
        var pattern = /^(\w+)[-*](\w+)[-*](\w+)( \(\d+\))? (.*)/;
        var match = pattern.exec(desc);
        var department = match[1], number = match[2], suffix = match[3], id = match[4], name = match[5].trim();
        
        section.suffix = suffix;
        section.course = Course.find(department, number, name);
        section.code = section.course.code + '*' + section.suffix;
        section.number = id && id.length ? /\((\d+)\)/.exec(id)[1] : '';
    },
    
    splitDate: function(output, outputName, text) {
        var match = /^\d\d\d\d\/\d\d\/\d\d/.exec(text) || /^\d\d\/\d\d\/\d\d\d\d/.exec(text), date;
        if(match) {
            output[outputName] = new Date(match[0]);
            return text.slice(match[0].length);
        }
        Errors.add("Could not match date format for: " + text);
        return text;
    },
    
    splitMeetingList: function(text, term) {
        var list = [];
        list.conflictsWith = Meeting.prototype.conflictsWith;
        list.abbreviated = false;
        
        while(text.length) {
            var meeting = new Meeting();
            // ex: "2012/09/06-2012/12/14 LEC Mon, Wed, Fri 09:30AM - 10:20AM, LA, Room 204".
            
            // 1: type (LEC|LAB|SEM)
            var pattern = /^ (\w+) /;
            text = this.splitDate(meeting, 'startDate', text);
            if(text[0] == '-')
                text = text.slice(1);
            text = this.splitDate(meeting, 'endDate', text);
            var match = pattern.exec(text), match2 = null, match3 = null;

            // 1: days (Mon, Tues, Wed, Thur, Fri), 2: start time (09:30AM), 3: end time (10:20AM)
            var pattern2 = /(\w+(?:, \w+)*) (\d\d\:\d\d(?:AM|PM)) - (\d\d\:\d\d(?:AM|PM)), /;
            var tba = /^Days TBA, Times TBA, Room TBA|^Study Days to be Announced, Times to be Announced, Room to be Announced|^Days to be Announced, Times to be Announced, Room to be Announced/, tbaMatch;
            
            if(match != null) {
                text = text.slice(match[0].length);
                if(tbaMatch = tba.exec(text)) {
                    text = text.slice(tbaMatch[0].length).trim();
                    continue;
                } else {
                    match2 = pattern2.exec(text);
                    if(match2 != null) {
                        text = text.slice(match2[0].length);
                        
                        var tbaRoom = "Room TBA";
                        
                        if(text.startsWith(tbaRoom)) {
                            text = text.slice(tbaRoom.length);
                            meeting.building = "TBA";
                            meeting.room = "";
                        } else {
                            // 1: Building (LA), 2: Room (204)
                            var match3 = /^([a-zA-Z0-9 ]+), Room (\S+)/.exec(text);
                            
                            if(match3 == null)
                                match2 = null;
                            else {
                                meeting.building = match3[1];
                                meeting.room = match3[2];
                                text = text.slice(match3[0].length);
                            }
                        }
                    }
                }
            }
            
            if(!match2) {
                text = text.trim();
                if(text.length > 0)
                    Errors.add("Could not parse meeting format '" + text + "'.");
                break;
            } else {
                meeting.startTime = MMcHHmm_toDecimal(match2[2]);
                meeting.endTime = MMcHHmm_toDecimal(match2[3]);
                meeting.type = this.meetingTypeTranslator[match[1]];
                var days = meeting.days = match2[1].split(", ");
                for(var index = 0; index < days.length; index++) {
                    days[index] = this.dayTranslator[days[index]];
                    days[days[index]] = true;
                }
                
                text = text.trim();
                list.push(meeting);
            }
        }
        
        return list;
    },    
};

addProperties(Site, {
    /// The currently active site.
    current: null,
    
    /// The list of handled sites.
    list: [
        new Site("Camosun College", "", /http(s?)\:\/\/camlink[^.]*\.camosun\.bc\.ca\/.*/, {
            // Short building names.
            shortBuildingNames: {
                'Dental Bldg': 'D',
                'Ewing Bldg': 'E',
                'Fisher Bldg': 'F',
                'Wilna Thomas Bldg': 'W',
                'Young Bldg': 'Y',
            },
            
            splitMeetingList: function(text, term) {
                var list = [];
                list.conflictsWith = Meeting.prototype.conflictsWith;
                list.abbreviated = false;
                
                var lastStartDate, lastEndDate, lastType;
                
                // For example, "09-04-2012 - 12-08-2012 Lecture W, F 02:30PM - 03:50PM, Fisher Bldg, Room 100  AND  Laboratory Tu 06:30PM - 09:20PM, Fisher Bldg, Room 224"
                // Or, "09-04-2012 - 12-08-2012 Lecture F 11:30AM - 01:20PM, Wilna Thomas Bldg, Room 102 Seminar F 01:30PM - 02:20PM, Wilna Thomas Bldg, Room 102"
                
                while(text.length) {
                    var item = new Meeting();
                    text = text.trim();
                    text = text.sliceOffPrefix("AND ");
                    text = text.trim();
                    
                    if(text.startsWith("(more)...")) {
                        list.abbreviated = true;
                        break;
                    }
             
                    if(/^[0-9]/.test(text)) {
                        var split = text.indexOf(" - ");
                        if(split < 0) { GM_log("Malformed meeting text: \"" + text + "\""); break }
                    
                        lastStartDate = MMdDDdYYYY_toDate(text.slice(0, split));
                        lastEndDate = MMdDDdYYYY_toDate(text.slice(split + 3, split + 13));
                        text = text.slice(split + 14); // cut down to "Lecture F 11:30AM - 01:20PM, Wilna Thomas Bldg, Room 102 Seminar F 01:30PM - 02:20PM, Wilna Thomas Bldg, Room 102"
                    }
                    
                    item.startDate = lastStartDate;
                    item.endDate = lastEndDate;
                    //item.type = lastType;
                    
                    split = text.indexOf(" ");
                    var commaSplit = text.indexOf(",");
                    if(commaSplit >= 0 && commaSplit < split)
                        split = commaSplit;
                    item.type = text.slice(0, split); // Get the type of the meeting ("Lecture")
                    
                    if(isDay[item.type]) {
                        item.type = lastType;
                    } else {
                        text = text.slice(split + 1); // cut down to "F 11:30AM - 01:20PM, Wilna Thomas Bldg, Room 102 Seminar F 01:30PM - 02:20PM, Wilna Thomas Bldg, Room 102"
                        lastType = item.type;
                    }
                    
                    // Cut out the weekdays, in the form "M, Tu, W, Th, F ".
                    while(true) {
                        var commaSplit = text.indexOf(",");
                        var spaceSplit = text.indexOf(" ");
                        split = (commaSplit < 0 || spaceSplit < commaSplit) ? spaceSplit : commaSplit;
                        var day = text.slice(0, split);
                        
                        item.days[day] = true;
                        item.days.push(day);
                        if(commaSplit < 0 || spaceSplit < commaSplit) {
                            text = text.slice(spaceSplit + 1);
                            break
                        } else
                            text = text.slice(commaSplit + 2);
                    }
                    
                    if(item.days.length == 0)
                        break;
                    
                    // Now down to "11:30AM - 01:20PM, Wilna Thomas Bldg, Room 102 Seminar F 01:30PM - 02:20PM, Wilna Thomas Bldg, Room 102"
                    // Cut out the start and end times, in the form 09:30AM - 12:20PM. This is converted into decimal, so they become 930 and 1220.
                    item.startTime = MMcHHmm_toDecimal(text.slice(0, 7));
                    item.endTime = MMcHHmm_toDecimal(text.slice(10, 17));
                    text = text.slice(19);
                        
                    // Now down to "Wilna Thomas Bldg, Room 102 Seminar F 01:30PM - 02:20PM, Wilna Thomas Bldg, Room 102"
                    var buildingSlice = ", Room ";
                    split = text.indexOf(buildingSlice);
                    item.building = text.slice(0, split);
                    text = text.slice(split + buildingSlice.length);
                        
                    // Now down to "102 Seminar F 01:30PM - 02:20PM, Wilna Thomas Bldg, Room 102"
                    var next = 0;
                    while(next < text.length && !isSpace(text.charCodeAt(next)))
                        next ++;
                    item.room = Number(text.slice(0, next));
                    text = text.slice(next + 1);
                    // Now down to "Seminar F 01:30PM - 02:20PM, Wilna Thomas Bldg, Room 102".
                        
                    list.push(item);
                }
            
                return list;
            }
        }),
        
        new Site("University of Winnipeg", "uwinnipeg", /http(s?)\:\/\/webadv\.uwinnipeg\.ca\/.*/, {
            meetingTypeTranslator: {Lecture: 'Lecture', Lab: 'Laboratory'},
        }),
        
        new Site("University of Guelph", "uoguelph", /http(s?)\:\/\/webadvisor\.uoguelph\.ca\/.*/, {
            meetingTypeTranslator: {LEC: 'Lecture', LAB: 'Laboratory', SEM: 'Seminar'},
            sectionPatternSplitter: '\\*',
        }),
    ]
});

(function() {
    for(var index = 0; index < Site.list.length; index++) {
        var site = Site.list[index];
        
        Site[site.prefix || "camosun"] = site;
        
        if(!Site.current && site.urlPattern.test(document.URL))
            Site.current = site;
    }
    
    if(!Site.current)
        Errors.add("This site cannot be identified as something the " + ScriptName + " can process:\n" + document.URL);
})();

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// An individual page on the website.
function Page(titles, termSelectionId) {
    this.titles = titles;
    this.termSelectionId = termSelectionId;
}

Page.prototype = {
    titles: [], /// (String[]) List of document titles that can be matched to this page.
    termSelectionId: null, /// (String?) The id of the select box for the term, or null if there is none on this page.
};

addProperties(Page, {
    current: null, // The current page's Page.
    
    listByTitle: {},
    currentTermSelector: null, // The input element containing the current page's term selector, or null for none.
        
    tokenIndex: /[?&]TOKENIDX\=(\d+)/.exec(document.URL)[1], // The session index identifier as known by the server.
    
    /// (document) Find a page with the given method.
    find: function methodPage_find(document) {
        var title = (document || window.document).title;
        return Page.listByTitle[title] || new Page([title], null);
    },
});

/// The list of known pages.
Pages = {
    /// User is looking at the students main menu.
    menuStudents: new Page(["WebAdvisor for Students"], null),
    
    // Filling in the term selection for searching for a class schedule.
    scheduleTermSelect: new Page(["My Class Schedule"], "VAR4"),
    
    /// Looking at the schedule for a term.
    scheduleTerm: new Page(["Schedule"]),
    
    // Looking at a page containing information about a single section.
    sectionInformation: new Page(["Section Information"], null),
    
    /// Looking at the results of a sectionSearchCriteria.
    sectionSearch: new Page(["Search for Classes", "Search for Sections"], "VAR1"),
    
    /// Filling in the search criteria for searching for sections.
    sectionSearchCriteria: new Page(["Step 3. Build My Timetable", "Search for Course Sections"], "VAR1")
};

(function() {
    if(Page.tokenIndex == null)
        Errors.add("There is supposed to be a TOKENIDX field in the URL, but that can't be found.");
    
    Pages.forEachOwnPropertyValue(function(page) {
        page.titles.forEach(function(title) { Page.listByTitle[title] = page; });
    });
       
    Page.current = Page.find(document);
    
    var termSelectionId = Page.current.termSelectionId;
    if(termSelectionId) {
        var termSelector = Page.currentTermSelector = document.getElementById(termSelectionId);
        Errors.assert(termSelector, "This page is supposed to have a term selector with id " + termSelectionId + ", but it was not found.");
        if(termSelector && termSelector.nodeName != "SELECT") {
            Errors.add("The term selector with id " + termSelectionId + " should be a SELECT node, but is instead " + termSelector.nodeName);
            Page.currentTermSelector = null;
        }
    }
})();

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// Allows moving around as if you were the user.
function Browser() {
    var self = this;
    
    this.history = [];
    var iframe = this.iframe = document.createElement("iframe");
    this.hide();
    
    iframe.addEventListener('load', function(event) { self.loaded(this); });
    
    document.body.appendChild(this.iframe);
}

Browser.prototype = {
    iframe: null, /// HTMLIFrameElement that is used for navigating.
    document: null, /// HTMLDocument that is filled when we're on a page, null otherwise.
    page: null, /// Page that is filled when we're on a page, null otherwise.
    loading: false, /// Whether we're currently loading a page.
    window: null, /// Window that is filled when we're on a page (not supported in Chrome), null otherwise.
    history: [], /// List of URLs that have been loaded. The top element is what we're looking at now.
    
    /// () Go back to the most recent document. This handles Chrome's lack of a contentWindow for Tampermonkey. Returns whether this is possible with the current state.
    back: function methodBrowser_back() {
        if(this.loading)
            return false;
        this.history.pop();
        var url = this.history.pop();
        if(this.window) {
            this.window.history.back();
        } else {
            this.open(url);
        }
        return true;
    },
    
    hide: function methodBrowser_hide() {
        this.iframe.style.visibility = "hidden";
        this.iframe.width = "1";
        this.iframe.height = "1";
    },
    
    /// (event) Called whenever a new URL has been browsed to.
    loaded: function methodBrowser_loaded(event) {
        this.document = this.iframe.contentDocument;
        this.window = this.iframe.contentWindow;
        this.page = Page.find(this.document);
        this.loading = false;
        this.history.push(this.document.URL);
    },
    
    /// (url, onLoad) Open the URL. When loaded, onLoad is called. This returns whether the operation succeeded - it will fail if this is already loading.
    open: function methodBrowser_open(url, onLoad) {
        if(this.loading)
            return false;
        if(url.startsWith('?'))
            url = /^[^?]+/.exec(document.URL)[0] + url;
        this.loading = true;
        if(onLoad)
            this.iframe.addSingleEventListener('load', onLoad);
        this.iframe.src = url;
        return true;
    },
    
    show: function methodBrowser_show() {
        this.iframe.style.visibility = null;
        this.iframe.width = 640;
        this.iframe.height = 480;
    },
};

// Static properties
addProperties(Browser, {
    /// A browser that can have common use.
    common: new Browser(),
});

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// An individual meeting time, with a start and end date, the type, the start and end time, the week days, the building, and the room.
function Meeting(startDate, endDate, type, startTime, endTime, days, building, room) {
	if(startDate && startDate.klass == "Meeting") {
		var source = startDate
		
		this.startDate = new Date(source.startDate);
		this.endDate = new Date(source.endDate);
		this.startTime = source.startTime;
		this.endTime = source.endTime;
		this.days = source.days;
		this.building = source.building;
		this.room = source.room;
		this.type = source.type;
	} else {
		this.startDate = startDate;
		this.endDate = endDate;
		this.startTime = startTime;
		this.endTime = endTime;
		this.days = days || [];
		this.building = building;
		this.room = room;
		this.type = type;
	}
	
	for(var index = 0; index < this.days.length; index ++)
		this.days[this.days[index]] = true
}

Meeting.prototype = {
    building: '', // The building this takes place in.
    startDate: null, // The Date that the meetings start on.
    endDate: null, // The Date that the meetings end on.
    startTime: null, // The time that the meetings start at (in 0000 format, like 1330 for 1:30pm).
    endTime: null, // The time that the meetings end at (in 0000 format).
    days: [], // The list of days the meetings are on, like ['M', 'Tu'], merged with {M: true, Tu: true}.
    room: '', // The room this meeting is in.
    type: '', // The type of meeting - 'Lecture', 'Laboratory', 'Seminar'.
    
	pickle: function() {
		return "{klass:'Meeting',startDate:" + this.startDate.getTime() + ",endDate:" + this.endDate.getTime() + ",type:'" + this.type + "',startTime:" + this.startTime + ",endTime:" + this.endTime + ",days:[" + (this.days.length ? "'" + this.days.join("','") + "'" : "") + "],building:'" + this.building + "',room:" + this.room + "}"
	},
	
	toString: function() {
		function dateToString(date) { return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(); }
		function timeToString(time) { return(time < 10 ? "000" : time < 100 ? "00" : time < 1000 ? "0" : "") + String(time) }
		return dateToString(this.startDate) + " - " + dateToString(this.endDate) + " " + this.type + " " + this.days.join(", ") + " " + timeToString(this.startTime) + " - " + timeToString(this.endTime) + ", " + this.building + ", Room " + this.room 
	},
	
    // Return whether this meeting or list of meetings conflicts with the other meeting or list of meetings.
	conflictsWith: function(other) {
		if(this instanceof Array) {
			for(var index = 0; index < this.length; index++)
				if(this [index].conflictsWith(other))
					return true;
		} else if(other instanceof Array) {
			for(var index = 0; index < other.length; index++)
				if(this.conflictsWith(other[index]))
					return true;
		} else if(this.overlappingDates(other) && this.overlappingTimes(other) && this.overlappingDays(other)) {
            conflict = "overlapping dates " + this.pickle() + "\n:::: " + other.pickle();
            return true;
        }
            
            /*return this.overlappingDates(other)
			&& this.overlappingTimes(other)
			&& this.overlappingDays(other);*/
		
		return false
	},
	
	/// Return whether this meeting meets in an overlapping date range with the other meeting.
	overlappingDates: function(other) {
		var aStart = this.startDate.getTime(), aEnd = this.endDate.getTime();
		var bStart = other.startDate.getTime(), bEnd = other.endDate.getTime();
		
		if(aStart > bEnd) return false;
		if(aEnd < bStart) return false;
		return true;
	},
	
	/// Returns whether this meeting meets in an overlapping time range with the other meeting.
	overlappingTimes: function(other) {
		if(this.startTime > other.endTime) return false;
		if(this.endTime < other.startTime) return false;
		return true;
	},
	
	/// Returns whether this meeting meets on any of the same weekdays as the other meeting.
	overlappingDays: function(other) {
		for(var index = 0; index < this.days.length; index ++)
			if(other.days[this.days[index]] == true)
				return true;
		return false;
	},
};

addProperties(Meeting, {
    // Make a list of meeting object from JSON.
    getList: function(list) {
        var result = []
        
        for(var index = 0; index < list.length; index ++)
            result.push(new Meeting(list[index]))
        
        return result
    },

    /// Convert a schedule list from text form into a list of Meeting objects {startDate, endDate, type(Lecture, Laboratory, Seminar), days [M, Tu, W, Th, F], startTime, endTime, building, room}.
    splitList: function(text, term) {
        return Site.current ? Site.current.splitMeetingList(text, term) : [];
    },
});

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// An individual course, as in "BIOL-103".
function Course(department, number, name) {
	if(department.klass == "Course") {
		var source = department;
		this.department = source.department || source.school;
		this.number = source.number;
		this.name = source.name;
		this.code = source.code;
        this.hasInfo = source.hasInfo;
        this.description = source.description;
	} else {
		this.department = department;
		this.number = number;
		this.name = name;
		this.code = Course.code(department, number);
        Course.changed = true;
	}
	
	Course.list.push(this);
	Course.list[this.code] = this;
}

Course.prototype = {
    department: "", // The department of a course, like "CHEM".
    number: "", // The number of the course, like "150".
    name: "", // The name of the course, like "Physiological basis of life."
    
    hasInfo: false, /// (bool) Whether information about the course has been loaded.
    description: '', /// (string) A description of the course.
    
    getInfo: function Course_getInfo(sectionCell, callback, browser) {
        if(this.hasInfo) {
            callback(this);
            return true;
        } else {
            browser = browser || Browser.common;
            if(browser.loading)
                return false;
            
            var script = (((sectionCell.firstChild.nextSibling || {}).firstChild || {}).nextSibling || {}).onclick || '';
            var match = /javascript\:window\.open\(\'([^']+)\'/.exec(script);
            var url = match[1];
            var self = this;
            
            function methodSection_getInfo_callback() {
                if(browser.page == Pages.sectionInformation) {
                    var document = browser.document;
                    
                    self.hasInfo = true;
                    self.description = document.getElementById("VAR3").innerText;
                    Course.changed = true;
                    browser.iframe.removeEventListener('load', methodSection_getInfo_callback);
                    browser.document.getElementsByName('CLOSE WINDOW2')[0].click();
                    callback(self);
                }
            }
            
            browser.iframe.addEventListener('load', methodSection_getInfo_callback);
            
            return browser.open(url, methodSection_getInfo_callback);
        }
    },
    
	pickle: function Course_pickle() { return "{klass:'Course',department:'" + this.department + "',number:'" + this.number + "',name:'" + this.name + "',code:'" + this.code + "',hasInfo:" + this.hasInfo + ",description:" + this.description.pickle() + "}"; },
};

addProperties(Course, {
    changed: false,
    loaded: false,
    list: [],
    code: function Course_code(department, number) { return department + "-" + number; },
    
    find: function Course_find(department, number, name) {
        if(!number) {
            var split = department.indexOf("-");
            var end = department.indexOf(" ");
            if(end < 0) end = department.length;
            number = Number(department.slice(split + 1, end));
            name = department.slice(end);
            department = department.slice(0, split);
        }
        
        if(!Course.loaded) {
            Course.loaded = true;
            var list = Site.current.getValue("Courses", "[]");
            for(var index = 0; index < list.length; index ++) {
                var item = list[index];
                if(item.klass != "Course")
                    GM_log("Corrupt data - stored object is not a Course?");
                else
                    new Course(item);
            }
        }
        
        var found = Course.list[Course.code(department, number)];
        if(found) return found;
        return new Course(department, number, name);
    },
});

save.list.push(function() {
	if(!Course.changed)
		return;
	Course.changed = false;
    Site.current.setValue("Courses", Course.list.pickle())
});

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// An individual section, identified as "COMP-132-002A (43027) Programming Using Java"
function Section(desc) {
	if(desc.klass == "Section") {
		this.course = Course.find(desc.course);
		this.suffix = desc.suffix;
		this.code = desc.code;
		this.number = desc.number;
	} else {
        Site.current.splitSection(this, desc);
		Section.Changed = true;
	}
		
	Section.List[this.code] = this
	Section.List.push(this)
}

Section.prototype = {
	course: null, /// The Course for this section.
	suffix: "", /// The suffix identifying this section, such as 001A.
	code: "", /// The unique code identifying this section, such as COMP-132-001A.
	number: null, /// A numerically unique identifying code for this section.
    
	pickle: function Section_pickle() { return "{klass:'Section',course:'" + this.course.code + "',suffix:'" + this.suffix + "',code:'" + this.code + "',number:'" + this.number + "'}"; },
};

addProperties(Section, {
    Changed: false,
    List: [], // Both a list of sections and an associative array of the section codes(as in "COMP-132-002A").
    Loaded: false,
});

/// Retrieve a section using the full section descriptor(a la "COMP-132-002A(43027) Programming Using Java").
function GetSection(desc) {
    var id = Site.current.getSectionId(desc);
    if(!id)
        return null;

	if(!Section.Loaded) {
		Section.Loaded = true;
        var list = Site.current.getValue("Sections", "[]");
		for(var index = 0; index < list.length; index ++) {
			var item = list[index];
			if(item.klass != "Section")
				GM_log("Corrupt data - stored object is not a Section?");
			else
				new Section(item);
		}
	}
	
	var found = Section.List[id];
	if(found)
		return found;
	return new Section(desc);
}

save.list.push(function() {
	if(!Section.Changed)
		return;
	Section.Changed = false;
	Site.current.setValue("Sections", Section.List.pickle());
});

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
/// A registered class.
function Class(section, schedule, term) {
	if(section.klass == "Class") {
		this.section = GetSection(section.section);
		this.schedule = Meeting.getList(section.schedule);
        term = this.term = section.term;
	} else {
		this.section = section;
		this.schedule = schedule;
        this.term = term;
		Class.changed = true;
	}
    
    var termList = Class.getTermList();
    if(!termList[term]) {
        termList[term] = true;
        termList.push(term);
        Class.termListChanged = true;
    }
	
	Class.list.push(this)
}

Class.prototype = {
	section: undefined, /// Section this class is for.
	schedule: undefined, /// List of meetings from the section.
    term: undefined, /// Name of the term this class is for.
	pickle: function() { return "{klass:'Class',section:'" + this.section.code + "',schedule:" + this.schedule.pickle() + ",term:'" + this.term + "'}" },
    
    toString: function() {
        return "Class term " + this.term + ", section " + this.section + ", schedule " + this.schedule + ".";
    }
};

addProperties(Class, {
    loaded: false,
    changed: false, /// Indicates that the class list needs to be re-saved.
    list: [], /// List of registered classes, loaded with Class.getList().
    termList: [], /// List of terms that are known to have an up-to-date class list (hopefully), loaded with Class.getTermList().
    termListLoaded: false, // Indicates that the Class.termList has been loaded.
    termListChanged: false, // Indicates that the Class.termList has been changed.
    
    /// Construct an SVG table showing the classes' meeting times.
    buildScheduleTable: function methodClass_buildScheduleTable(classes, id, fontSize) {
        var hourMin = 24, hourMax = 0;
        var table = "";
        
        // Determine the hour range.
        for(var classIndex = 0; classIndex < classes.length; classIndex++) {
            var klass = classes[classIndex];
            var schedule = klass.schedule;
            
            for(var meetingIndex = 0; meetingIndex < schedule.length; meetingIndex++) {
                var meeting = schedule[meetingIndex];
                
                hourMin = Math.min(hourMin, Math.floor((meeting.startTime - 1) / 100));
                hourMax = Math.max(hourMax, Math.ceil(meeting.endTime / 100));
            }
        }
        
        var hourCount = hourMax - hourMin + 1, hourPercent = 100 / hourCount;
        
        function percentHour(hour) { return (hourPercent * (hour - hourMin)); }
        function percentTime(time) { return percentHour((time % 100) / 60 + Math.floor(time / 100)); }
        function hourName(hour) { return (hour < 10 ? "0" : "") + hour + "00"; }
        var rowHeight = 1.1;
    
        table += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"';
        if(id)
            table += ' id="' + id + '"';
        table += ' width="100%" height="' + (6 * rowHeight) + 'em" font-size="' + (fontSize || '10') + 'pt">';
        for(var hour = hourMin; hour <= hourMax; hour++) {
            table += '<rect x="' + percentHour(hour) + '%" y="0" width="' + hourPercent + '%" height="100%" fill="' + (hour % 2 ? "white" : "lightgray") + '"/>';
            table += '<text x="' + percentHour(hour + 0.5) + '%" y="' + rowHeight * 0.8 + 'em">';
            table += hourName(hour);
            table += '</text>';
        }
        
        for(var day = 1; day < 6; day++) {
            table += '<text x="0" y="' + (day + 0.8) * rowHeight + 'em">' + dayNames[day - 1] + '</text>';
            table += '<line x1="0" y1="' + day * rowHeight + 'em" x2="100%" y2="' + day * rowHeight + 'em" stroke="black" stroke-width="0.25"/>';
        }
        
        for(var classIndex = 0; classIndex < classes.length; classIndex++) {
            var klass = classes[classIndex];
            var schedule = klass.schedule;
            var classColor = klass.color || colorIndex(classIndex);
            var classInnerColor = klass.innerColor || colorToRGB(colorBlend(classColor, colorWhite, 128));
            var classOuterColor = klass.outerColor || colorToRGB(colorBlend(classColor, colorBlack, 128));
            var classBoxStyle = klass.boxStyle, classTextStyle = klass.textStyle;
            
            for(var meetingIndex = 0; meetingIndex < schedule.length; meetingIndex ++) {
                var meeting = schedule[meetingIndex];
                var meetingColor = meeting.color || classColor;
                var colorBorder = classOuterColor;
                var colorFill = classInnerColor;
                
                for(var meetingDayIndex = 0; meetingDayIndex < meeting.days.length; meetingDayIndex++) {
                    var meetingDay = dayAbbrevs[meeting.days[meetingDayIndex]];
                    
                    table += '<g>';
                    table += '<title>' + (klass.section.code + " " + klass.section.course.name + " - " + meeting.startTime + " to " + meeting.endTime + ' at ' + meeting.building + ' in ' + meeting.room) + '</title>';
                    table += '<rect x="' + percentTime(meeting.startTime) + '%"';
                    table += ' width="' + (percentTime(meeting.endTime) - percentTime(meeting.startTime)) + '%"';
                    table += ' y="' + (meetingDay + 1) * rowHeight + 'em" height="' + rowHeight + 'em"';
                    if(classBoxStyle)
                        table += ' style="' + classBoxStyle + '"';
                    table += ' fill="' + colorFill + '" stroke="' + colorBorder + '" opacity="0.75" stroke-width="' + (klass.borderWidth || '1px') + '"';
					table += '/>';
					
                    if(!klass.hideLabel) {
                        table += '<text x="' + percentTime(meeting.startTime) + '%"';
                        if(classTextStyle)
                            table += ' style="' + classTextStyle + '"';
                        table += ' y="' + (meetingDay + 1.8) * rowHeight + 'em">';
                        table += '<tspan>' + klass.section.course.code + '</tspan>';
                        
                        // Add in an optional meeting place text.
                        table += '<tspan name="scheduleShowRoomItem" visibility="collapse">@';
                        table += (Site.current.shortBuildingNames[meeting.building] || (meeting.building + ' ')) + meeting.room;
                        table += '</tspan>';
                            
                        table += '</text>';
                    }
                                   
                    table += '</g>';
                }
            }
        }
        
        table += '</svg>';
        return table;
    },
    
    buildScheduleTableWidget: function methodClass_buildScheduleTableWidget(classes, id, fontSize) {
        // Build the title.
        var table = '<div style=\"text-align: center\">Summary of schedule by weekday';
        
        table += '<div id="scheduleTableContainer" align="center" style="border: 2px solid black; margin-left: auto; margin-right: auto;">';
        
        table += Class.buildScheduleTable(classes, id, fontSize);
        table += '</div>';
        
        // Controls.
        table += '<div style="text-align: center">';
        table += '<input type="checkbox" ' +
            'onchange="' +
                "var checked = document.getElementById('scheduleShowRooms').checked, list = document.getElementsByName('scheduleShowRoomItem'), index;" +
                "for(index = 0; index &lt; list.length; index++)" +
                    "list[index].style.visibility = checked ? 'visible' : 'hidden';" +
            '" ' +
            'id="scheduleShowRooms"><label for="scheduleShowRooms">Show rooms</label></input>';
        var scheduleFontSizeHandler = "document.getElementById('scheduleTable').style.setProperty('font-size', document.getElementById('scheduleFontSize').value);";
        table += ';&nbsp;<input type="text" id="scheduleFontSize" value="10pt" size="4" oninput="' + scheduleFontSizeHandler + '"><label for="scheduleFontSize">Font size</label></input>';
        var scheduleWidthHandler = "document.getElementById('scheduleTableContainer').style.width = document.getElementById('scheduleWidth').value;";
        table += ';&nbsp;<input type="text" id="scheduleWidth" value="100%" size="4" oninput="' + scheduleWidthHandler + '"><label for="scheduleWidth">Width</label></input>';
        table += '</div>';
        table += '</div>';
        return table;
    },
    
    /// Remove all classes in the class list that match this term.
    clearTerm: function(term) {
        var list = Class.getList();
        
        for(var index = 0; index < list.length; index++) {
            if(list[index].term == term || list[index].term == null) {
                list.splice(index, 1);
                Class.changed = true;
                index--;
            }
        }
    },
    
    /// Return the list of registered classes.
    getList: function() {
        if(Class.loaded)
            return Class.list;
        Class.loaded = true;
        var list = Site.current.getValue("Classes", "[]");
        Class.list = [];
        for(var index = 0; index < list.length; index++)
            new Class(list[index]);
        return Class.list;
    },
    
    /// Get an array of classes that match the given term.
    getListFilteredByTerm: function(term) {
        var input = Class.getList();
        var output = [];
        
        for(var index = 0; index < input.length; index++)
            if(input[index].term == term)
                output.push(input[index]);
        return output;
    },
    
    /// Return the list of terms that have up-to-date class registrations.
    getTermList: function() {
        if(Class.termListLoaded)
            return Class.termList;
        Class.termListLoaded = true;
        var list = Class.termList = Site.current.getValue("Terms", "[]");
        for(var index = 0; index < list.length; index++)
            list[list[index]] = true;
        return list;
    },
    
    /// Return whether the given term has up-to-date class registrations.
    isTermKnown: function(term) {
        return Class.getTermList()[term] == true;
    },
    
    /// Read a table of classes.
    readList: function Class_readList(div, defaultTerm) {
        gatherColumns(div, function Class_readList_gatherColumns(columns, cells) {
            var scheduleIndex = "Meeting Information";
            
            var scheduleName = columns[scheduleIndex];
            var sectionName = columns["Section Name & Title"] || columns["Section Name and Title"] || columns["Course Name and Title"] || columns["Course Name & Title"];
                
            if(sectionName == "You are on the following waitlist(s):")
                return false;
                
            var term = columns["Term"] || defaultTerm;
            if(!sectionName)
                error_sectionNameIsNull();
            var section = GetSection(sectionName);
            if(!section)
                return;
            var schedule = Meeting.splitList(scheduleName, term);
            new Class(section, schedule, term);
        });
    }
});

save.list.push(function() {
	if(Class.changed) {
        Class.changed = false;
        Site.current.setValue("Classes", Class.list.pickle());
    }
    
    if(Class.termListChanged) {
        Class.termListChanged = false;
        Site.current.setValue("Terms", Class.termList.pickle(function(item) { return "'" + item + "'"; }));
    }
});

/// Search for the TABLE within the DIV, then its TBODY, then for each TR gather each column together with its textContent.
/// Call the function with call(columns, cells, HtmlTableRow row): the list of column texts by title, the list of column cells by title, and the row.
function gatherColumns(div, call) {
	for(var table = div.firstChild; table && !(table.nodeName == "TABLE" && table.summary != "Paged Table Navigation Area"); table = table.nextSibling);
	if(!table) return;
		
	for(var tbody = table.firstChild; tbody && tbody.nodeName != "TBODY"; tbody = tbody.nextSibling);
	if(!tbody) return
	
	var row;
    for(row = tbody.firstChild; row; row = row.nextSibling) {
        if(row.nodeName == "TR" && row.firstChild && row.firstChild.nextSibling && row.firstChild.nextSibling.className != "groupTitle")
            break;
    }
    
	var columnNames = [];
	
	while(true) {
		columnNames = [];
		var found = false;
		
		for(var th = row.firstChild; th; th = th.nextSibling) {
			if(th.nodeName != "TH")
                continue;
			columnNames.push(th.textContent.trim());
			found = true;
		}
		
		if(columnNames.length == 1 && columnNames[0] == "Schedule")
            found = false;
		if(found) break;
		for(row = row.nextSibling; row && row.nodeName != "TR"; row = row.nextSibling);
	}

	while(row) {
		for(row = row.nextSibling; row && row.nodeName != "TR"; row = row.nextSibling);
		if(!row) break;
		
		var columns = [];
		var tds = [];
		var index = 0;
		
		for(var td = row.firstChild; td; td = td.nextSibling) {
			for( ; td && td.nodeName != "TD"; td = td.nextSibling);
			if(!td) break;
			var text = td.textContent.trim();
			var columnName = columnNames[index++];
				
			columns[columnName] = text;
			tds[columnName] = td;
			
			tds.push(td);
			columns.push(text);
		}
		if(columns.length)
			if(call(columns, tds, row) == false)
				return;
	}
}

/// callback(info), where info is {
///    columns, cells, row,
///    string schedule, HtmlTableCell scheduleCell,
///    Section section, string sectionName, HtmlTableCell sectionCell,
///    string term,
///    Class[] classes} // Array of known registered classes in this term.
function gatherSectionColumns(div, callback) {
    var scheduleIndex = "Meeting Information";
    var sectionIndex = "Section Name and Title";
    var sectionIndexAlt = "Course Name and Title";
    var sectionIndexAlt2 = "Section Name & Title";
    var classesByTerm = {};
    
    gatherColumns(div, function gatherSectionColumns_callback(columns, cells, row) {
        var sectionName = columns[sectionIndex] || columns[sectionIndexAlt] || columns[sectionIndexAlt2];
        if(sectionName == "You are on the following waitlist(s):" || sectionName == "You do not have any preselected sections.")
            return false;
        
        var info = {};
        info.columns = columns;
        info.cells = cells;
        info.row = row;
        info.schedule = columns[scheduleIndex];
        info.scheduleCell = cells[scheduleIndex];
        info.term = columns["Term"];
        info.sectionName = sectionName;
        info.sectionCell = cells[sectionIndex] || cells[sectionIndexAlt] || cells[sectionIndexAlt2];
        info.section = GetSection(info.sectionName);
        if(!info.section)
            return;
        info.classes = classesByTerm[term] || (classesByTerm[term] = Class.getListFilteredByTerm(info.term));
        callback(info);
    });
}

///=========================================================================================================================
///=========================================================================================================================
///=========================================================================================================================
// Page processing.

try {
	// Looking at schedule.
	var div = document.getElementById("GROUP_Grp_LIST_VAR6")
	if(div) {
		var term = document.getElementById('LIST_VAR11_1').innerText;
		
		Class.clearTerm(term);
		Class.readList(div, term);
		
		var table = Class.buildScheduleTableWidget(Class.getListFilteredByTerm(term), 'scheduleTable');
		document.getElementsByName("SUBMIT_OPTIONS")[0].insertNext(document.createHTMLFragment(table));
	}

	// Current registrations table.
	var div = document.getElementById("GROUP_Grp_WSS_COURSE_SECTIONS_2");
	if(div) {
		Class.changed = true;
		Class.list = [];
		Class.loaded = true;
		Class.readList(div);
	}

	// Searching for sections
	var div = document.getElementById("GROUP_Grp_WSS_COURSE_SECTIONS");
	if(div) {
		var hover = document.createElement("div");
		var sectionIndex = "Section Name and Title";
		var scheduleIndex = "Meeting Information";
		var unknownTerms = [];
		var sections = []; // Gathers the list of section column infos, along with a klass property.
		var testSections = []; // The list of sections that have been added temporarily.
		var browser = Browser.common;
		
		hover.style.visibility = "hidden";
		hover.style.width = "800px";
		hover.style.position = "absolute";
		hover.style.pointerEvents = "none";
		hover.style.border = "solid black 1px";
		hover.style.background = "white";
		hover.style.boxShadow = "5px 5px 10px 0px rgba(0, 0, 0, 0.5)";
			
		document.body.appendChild(hover);
		
		function isTestSection(info) { return testSections.contains(info.klass); }
		
		function updateSectionConflicts(info) {
			var conflicts = info.conflicts = [];
			
			function checkAll(list) {
				for(var index = 0; index < list.length; index++)
					if(info.klass.schedule.conflictsWith(list[index].schedule))
						conflicts.push(list[index].section.code);
			}
			
			checkAll(info.classes);
			if(!isTestSection(info))
				checkAll(testSections);
			info.hasConflicts = info.conflicts.length > 0;
			
			var background;
			
			if(isTestSection(info))
				background = "#BBE";
			else
				background = info.hasConflicts > 0 ? "#EBB" : "#BEB";
			info.scheduleCell.style.backgroundColor = background;

			return conflicts;
		}
		
		function updateConflicts() {
			sections.forEach(updateSectionConflicts);
		}
		
		function setScheduleStyle(info) {
			var box = 'stroke-width: 2px; stroke-linejoin: round; ';
			
			if(isTestSection(info)) {
				if(info.hasConflicts) {
					info.klass.boxStyle = box + 'fill: rgba(0, 0, 255, 0.2); stroke: blue;';
					info.klass.textStyle = 'fill: black;';
				} else {
					info.klass.boxStyle = box + "fill: blue; stroke: blue;";
					info.klass.textStyle = "fill: white;";
				}
			} else if(info.hasConflicts) {
				info.klass.boxStyle = box + "fill: rgba(255, 0, 0, 0.2); stroke: red;";
				info.klass.textStyle = "fill: transparent;";
			} else {
				info.klass.boxStyle = box + "stroke: black; fill: black;";
				info.klass.textStyle = "fill: white;";
			}
		}
		
		function hoverOverSchedule(info) {
			var html = "";
			
			if(info.hasConflicts)
				html += '<div style="text-align: center;">Conflicts with ' + info.conflicts.join(", ") + '</div>';
			else
				html += '<div style="text-align: center;">Click to ' + (isTestSection(info) ? 'remove' : 'add') + ' as a test section.</div>';
			
			var scheduleList = [].concat(info.classes, testSections);
			
			if(!isTestSection(info)) {
				scheduleList.push(info.klass);
				setScheduleStyle(info);
			}
			
			html += Class.buildScheduleTable(scheduleList, null, 8);
			hover.innerHTML = html;
			hover.style.visibility = "visible";
		}
			
		function hoverOverSection(info) {
			function hoverOverSection_callback(section) {
				var html = '';
				html += '<div>' + section.description + '</div>';
				hover.innerHTML = html;
				hover.style.visibility = "visible";
			}
			
			info.section.course.getInfo(info.sectionCell, hoverOverSection_callback);
		}
		
		// Move the hover section to just below the cursor.
		function hoverMove(e) {
			hover.style.left = Math.max(e.clientX - 400, window.pageXOffset) + "px";
			hover.style.top = (e.clientY + 20 + window.pageYOffset) + "px";
		}
		
		// Hide the hover section.
		function hoverHide() {
			hover.style.visibility = "hidden";
		}
			
		function addHoverMethods(element, onOver) {
			element.addEventListener('mousemove', hoverMove);
			element.addEventListener('mouseout', hoverHide);
			element.addEventListener('mouseover', onOver);
		}
		
		gatherSectionColumns(div, function(info) {
			sections.push(info);
			if(!Class.isTermKnown(info.term) && unknownTerms.indexOf(info.term) < 0)
				unknownTerms.push(info.term);
			
			info.klass = {
				schedule: Meeting.splitList(info.schedule, info.term),
				section: info.section,
			};
			
			updateSectionConflicts(info);
			
			// Click on meeting information cell to toggle its presence in the test section list.
			info.scheduleCell.addEventListener('click', function(e) {
				if(!testSections.remove(info.klass)) {
					testSections.push(info.klass);
					setScheduleStyle(info);
				}
				updateConflicts();
				hoverOverSchedule(info);
			});
			
			addHoverMethods(info.scheduleCell, function(e) {
				hoverOverSchedule(info);
			});
			
			addHoverMethods(info.sectionCell, function(e) {
				hoverOverSection(info);
			});
		});
		
		if(unknownTerms.length > 0) {
			var warning = div.insertBefore(document.createElement("div"), div.firstChild);
			warning.style.color = "red";
			warning.style.textAlign = "center";
			warning.innerHTML = "You need to update the known schedule for term[s] " + unknownTerms.join(", ") + " by looking at the 'Register & Drop Classes', 'Manage My Wait Lists', or 'My Class Schedule' pages.";
		}
	}

	// Tracks a term SELECT element and caches its value.
	(function() {
		var termSelect = Page.currentTermSelector;
		
		if(!termSelect || termSelect.nodeName != "SELECT")
			return;
		var termSaved = Site.current.getValue("TimetableTerm");
			
		termSelect.value = "";
		if(termSelect && termSaved)
			termSelect.value = termSaved;
			
		var submit = findSubmitButton(document.body)
		if(submit)
			submit.addEventListener("click", function() {
				if(termSelect && termSelect.value)
					Site.current.setValue("TimetableTerm", "'" + termSelect.value + "'");
			}, true);
	})();

	// Selecting a term to see the class schedule.
	(function() {
		if(Page.current == Pages.scheduleTermSelect) {
			var termSelector = Page.currentTermSelector;
			var panel = termSelector.findAncestorWithClass("mainPanel");
			var browser = new Browser();
			var termSelectionChangeLock = false;
			
			var tableDiv = panel.appendElement('div');
			
			function handleTermSelectionChange() {
				if(browser.page != Pages.scheduleTermSelect) {
					setTimeout(handleTermSelectionChange, 200);
					return;
				}
				
				var subselector = browser.document.getElementById(browser.page.termSelectionId);
				subselector.value = termSelector.value;
				browser.document.getElementsByName("SUBMIT2")[0].click();
			}
			
			function handleLoaded() {
				if(browser.page == Pages.scheduleTerm) {
					var scheduleId = "GROUP_Grp_LIST_VAR6";
					var schedule = browser.document.getElementById(scheduleId);
					if(schedule == null)
						Errors.add("Section registration does not have the expected table " + scheduleId + " or it's under a different name.");
					else {
						tableDiv.removeAllChildren();
						tableDiv.appendChild(schedule);
					
						Class.clearTerm(term);
						Class.readList(schedule, term);
			
						var table = Class.buildScheduleTableWidget(Class.getListFilteredByTerm(term), 'scheduleTable');
						tableDiv.appendHTML(table);
					}
					
					browser.back();
				}
			}
			
			termSelector.addEventListener('change', handleTermSelectionChange);
			browser.open(document.URL);
			browser.iframe.addEventListener('load', handleLoaded);
			
			handleTermSelectionChange();
		}
	})();
		
	// Closing the section information window without clicking the "CLOSE WINDOW" button
	// leaves a cookie that will not be removed. Eventually the website shuts down.
	// This removes the cookie when the window is unloaded, if it exists.
	if(Page.current == Pages.sectionInformation) {
		unsafeWindow.onunload = function() {
			var cookie = cookies.getItem("LASTTOKEN")
			if(cookie)
				cookies.removeItem(cookie)
		}
	}

	save();

	function unloadHandler() {
		save();
		window.removeEventListener('unload', unloadHandler);
	}

	window.addEventListener('unload', unloadHandler);
} catch(exception) {
	console.log("Exception");
	throw exception;
}

//<a href="HTTPS://camlink1.camosun.bc.ca/WebAdvisor/WebAdvisor?TOKENIDX=2840859158&amp;CONSTITUENCY=WBST&amp;type=P&amp;pid=ST-WESTS13A" onclick="javascript:checkClicks();" alt="@desc" onmouseover="window.status=''; return true;"><span>My Class Schedule</span></a>
Errors.report();
