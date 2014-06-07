// Priority Grace
// version 0.1
// 2006-11-12
// Copyright (c) 2006, Joseph Taylor
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          Priority Grace
// @author        Joseph Taylor
// @namespace     http://www.textninja.net
// @description   Allow the user to reorder their 43Things goals by clicking and dragging, rather than suffering through text input hell
// @include       http://www.43things.com/people/reorder_things*
// ==/UserScript==

/* ==================== */
/* = Snippets of Data = */
/* ==================== */

var XPathExpressions = {
    GOAL_FORM : ".//form[@action='/people/savereorder']",
    NECESSARY_HIDDEN_FIELDS : ".//input[@type='hidden'][contains(@name, 'old')]",
    GOAL_LINKS : ".//td[@class='reordergoals']/a",
};

/* =============== */
/* = Error Types = */
/* =============== */

function UnrecognizedHTMLError() {
    this.name = "UnrecognizedHTMLError";
    this.message = "I was unable to understand the source code at \"" + location.href + "\".\n";
    this.message += "Maybe it isn't a goal reordering page, or maybe Robot Co-op changed the layout since this script was last updated.";
}
UnrecognizedHTMLError.prototype = Error.prototype;

function InvalidUseOfConstructorError() {
    this.name = "InvalidUseOfConstructorError";
    this.message = "That's a constructor, not a function.";
}
InvalidUseOfConstructorError.prototype = Error.prototype;

function UniterableResultError() {
    this.name = "UniterableResultError";
    this.message = "The result type you've given cannot be iterated through, and thus cannot be turned into an array.";
}
UniterableResultError.prototype = Error.prototype;

function NotSoupedUpYetError() {
    this.name = "NotSoupedUpYetError";
    this.message = "Sorry, but to perform that operation the goal list must first be \"souped up\".";
}
NotSoupedUpYetError.prototype = Error.prototype;

/* ================================ */
/* = Built-in Object Enhancements = */
/* ================================ */

// XPathResult (This would normally be slapped on to the prototype, but since it's a user script, I won't)
var iterateIntoArray = function(xresult) {
    if (xresult.resultType == 5 || xresult.resultType == 6) {
        var returnedArray = [];
        var nextNode = null;
        while (nextNode = xresult.iterateNext()) {
            returnedArray.push(nextNode);
        }
        return returnedArray;
    } else {
        throw new UniterableResultError;
    }
}

/* =========================== */
/* = Simply & Useful Objects = */
/* =========================== */

function PastelColour(h) {
    // Private functions
    // =================
    var makeRGBString = function(r, g, b) {
        return "rgb(" + Math.floor(r * 255) + "," + Math.floor(g * 255) + "," + Math.floor(b * 255) + ")";
    }
    
    // Properties
    // ==========
    this.h = h;
    this.s = 0.2;
    this.v = 0.85;
    
    // Methods
    // =======
    this.darken = function() {
        this.v = this.v * 0.5;
        return this;
    }
    
    this.toString = function() { // Converts the hsb values into rgb, and returns a CSS formatted string
        var i;
        var r, g, b;
        var f, p, q, t;
        var h = this.h, s = this.s, v = this.v;
        if (s == 0) {
            r = g = b = v;
            return makeRGBString(r,g,b);
        }
        h /= 60;
        i = Math.floor(h);
        f = h - i;
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));
        switch  (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:
                r = v;
                g = p;
                b = q;
                break;
        }
        return makeRGBString(r,g,b);
    };
}

/* ============================ */
/* = The Meat of the Program  = */
/* ============================ */

var ElementFinder = {
    find : function(xpathExpression, contextNode) {
        var result = document.evaluate(XPathExpressions[xpathExpression], (contextNode || document.body), null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        result = iterateIntoArray(result);
        if (result.length > 0) {
            return result;
        } else {
            throw new UnrecognizedHTMLError;
        }
    }
};

var ElementWrapper = {
    GoalForm : function() {
        // Private Functions
        // =================
        var createListOfLinks = function(links) {
            var list = document.createElement("ol");
            list.className = "reorder_list";
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener("click", function(e) {
                    if (!confirm("Are you sure you want to navigate away from this page?  Any unsaved changes will be lost.")) {
                        e.preventDefault();
                    }
                }, false);
                // Choose a random background colour for our list item
                var backgroundColour = Utility.ColourGenerator.generateRandomPastelColour();
                // Create the list item
                var li = document.createElement("li");
                li.style.cursor = "move";
                li.style.backgroundColor = backgroundColour.toString();
                links[i].style.color = backgroundColour.darken().toString();
                links[i].style.textDecoration = "none";
                // li.style.color = backgroundColour.darken().toString(); // The foreground is a darker version of the background
                var goalNumber = /\d+$/.exec(links[i].href)[0];
                li.id = "goal_number_" + goalNumber;
                li.appendChild(links[i]);
                list.appendChild(li);
            }
            return list;
        };
    
        // Properties
        // ==========
        this.node = ElementFinder.find("GOAL_FORM")[0];
        this.node.id = "reorder_goals_form";
        this.node.className = "reorder_form"
        this.goalList = null;
    
        // Methods
        // =======
        this.updateHiddenFields = function() {
            if (!this.goalList) throw new NotSoupedUpYetError;
            var liElements = this.node.getElementsByTagName("li");
            for (var i = 0; i < liElements.length; i++) {
                var hidden = document.createElement("input");
                hidden.setAttribute("type", "hidden");
                hidden.name = "new_" + /\d+$/.exec(liElements[i].id)[0];
                hidden.value = i + 1;
                this.node.insertBefore(hidden, this.goalList);
            }
            return true;
        }
        
        this.soupUp = function() {
            var me = this;
            
            // Grab the hidden fields and links.  Make sure to clone them, since the originals are getting deleted
            var hiddenFields = ElementFinder.find("NECESSARY_HIDDEN_FIELDS", this.node);
            hiddenFields = Utility.NodeCloner.cloneAll(hiddenFields);
            var goalLinks = ElementFinder.find("GOAL_LINKS", this.node);
        
            // Grab the form's table
            var table = this.node.getElementsByTagName("table")[0];
        
            // Attach all the hidden fields to the form (outside the table)
            for (var i = 0; i < hiddenFields.length; i++) {
                this.node.insertBefore(hiddenFields[i], table);
            }
        
            // Replace the table of goals with a simple list
            this.goalList = createListOfLinks(goalLinks);
            this.goalList.id = "myListOfGoals";
            table.parentNode.replaceChild(this.goalList, table);
        
            // Create a save button, then append it to the end of the form
            var submitButton = document.createElement("input");
            submitButton.setAttribute("value", "Save");
            submitButton.setAttribute("type", "submit");
            this.node.appendChild(submitButton);
            
            // Using the scriptaculous API, make the goal list sortable
            unsafeWindow.Sortable.create(this.goalList.id, {});
            
            // Before the form is submitted, I need to update the hidden fields
            unsafeWindow.document.getElementById(this.node.id).onsubmit = function() {
                return me.updateHiddenFields();
            };
        }
    }
};

/* ============= */
/* = Utilities = */
/* ============= */

var Utility = {
    ScriptRunner: {
        run: function(scriptURL) {
            var script = document.createElement("script");
            script.src = scriptURL;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    },
    NodeCloner: {
        cloneAll: function(nodeArray, deepBoolean) {
            var returnedArray = [];
            for (var i = 0; i < nodeArray.length; i++) {
                returnedArray[i] = nodeArray[i].cloneNode(deepBoolean);
            }
            return returnedArray;
        }
    },
    ColourGenerator: {
        generateRandomPastelColour: function(lowerDegree, upperDegree) {
            var randomHue;
            if (arguments.length == 2) {
                randomHue = Math.floor(lowerDegree + Math.random() * (upperDegree - lowerDegree));
            } else {
                randomHue = Math.floor(Math.random() * 255);
            }
            return new PastelColour(randomHue);
        }
    }
};

/* ========= */
/* = Setup = */
/* ========= */

document.styleSheets[0].insertRule(".reorder_list { -moz-border-radius: 20px; background-color: #f0f0f0; border: solid 2px #ececec; list-style-type: none; margin: 0px; padding: 10px; }", 0);
document.styleSheets[0].insertRule(".reorder_list li { background-color: silver; padding: 5px; font-size: 1.2em; -moz-border-radius: 15px; margin: 10px 0px; text-align: center;  }", 0);
document.styleSheets[0].insertRule(".reorder_form input[type=submit] { display: table; margin-top: 10px; padding: 10px 30px; margin-left: auto; margin-right: auto; }", 0);
document.styleSheets[0].insertRule(".reorder_form a:hover { background-color: white; }", 0);

// Boot up the scriptaculous API
var libraries = ["effects.js", "dragdrop.js"];
for (var i = 0; i < libraries.length; i++) {
    Utility.ScriptRunner.run("http://www.43things.com/javascripts/" + libraries[i]);
}

/* ========== */
/* = Deploy = */
/* ========== */

window.addEventListener("load", function() {
    try {
        var goalForm = new ElementWrapper.GoalForm;
        goalForm.soupUp();
    } catch (e) {
        if (e instanceof UnrecognizedHTMLError) {
            var accountCreationForm = document.evaluate(".//form[@action='/account/create']", document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            if (accountCreationForm) {
                return;
            } else {
                throw e;
            }
        } else {
            throw e;
        }
    }
}, false);