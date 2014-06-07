// ==UserScript==
// @name           No retweet
// @namespace      http://code.kjonigsen.net
// @description    Filters retweets from twitter and moves them to the sidebar
// @include        http://twitter.com/
// ==/UserScript==


/* container nodes */

var retweetNode = document.createElement("div");
retweetNode.setAttribute("id", "retweets");
retweetNode.style.margin = "1em";

retweetNode.innerHTML = "<hr /><label>Retweets</label><hr />";

var retweetStatuses = document.createElement("ol");
retweetStatuses.setAttribute("style", "list-style-type: none;");
retweetNode.appendChild(retweetStatuses);

/* identify nodes */

var spans = new List(document.getElementsByTagName("span"));
var retweets = spans.filter(isRetweetNode);
var tweetNode = retweets.map(firstLiTypeNode);

/* move and reformat nodes */

tweetNode.foreach(moveTweet);

/* blank out images */

var allNodes = tweetNode.flatten(function (node) {
    return node.childNodes;
}, function (nodes) {
    return nodes.length == 0;
});

var imageNodes = allNodes.filter(function (node) {
    return node.tagName == "IMG";
});

imageNodes.foreach(function (node) {
    node.parentNode.style.display = "none"; // blank out containing anchor
});

/* blank out actions as they cause weird lines in the sidebar */

var actions = tweetNode.map(getActionNode);
actions.foreach(function (node) {
    node.style.display = "none";
});

/* present retweets in the sidebar */

var rssNode = document.getElementById("rssfeed");
rssNode.appendChild(retweetNode);

/*
 * utility functions
 */

// node identification

function isRetweetNode(node) {
    return (node.className == "big-retweet-icon" || (node.className == "entry-content" && node.innerHTML.indexOf("RT @") == 0));
}

function firstLiTypeNode(node) {
    return firstNodeOfType("LI", node);
}

function firstNodeOfType(nodeType, node) {
    if (node.tagName == nodeType) {
        return node;
    }

    var parent = node.parentNode;
    if (parent == null) {
        return null;
    }
    return firstNodeOfType(nodeType, parent);
}

function getActionNode(node) {
    var body = firstSubNodeWithClass("status-body", node);
    var content = firstSubNodeWithClass("status-content", body);
    // big retweets does not have a status-content span.
    if (content == null) {
        content = body;
    }
    var actions = firstSubNodeWithClass("actions", content);

    return actions;
}

function firstSubNodeWithClass(className, node) {
    var nodes = node.childNodes;

    if (node == null || nodes.length == 0) {
        return null;
    }

    for (var i = 0; i < nodes.length; i++) {
        var currentNode = nodes[i];
        if (currentNode.className == className) {
            return currentNode;
        }
    }

    return null;
}

// dom manipulation

function moveTweet(node) {
    node.parentNode.removeChild(node);
    retweetStatuses.appendChild(node);

    /// just adding them causes weird spacing
    var lineBreak = document.createElement("br");
    node.appendChild(lineBreak);
}



/*
* List-class code
*/

function List(array) {
    /// <summary>
    ///    Simple minimal list-class for use in Greasemonkey-scripts whicj
    ///    supports basic addition, iteration and other features.
    /// </summary>
    /// <param name="array" type="Array">
    ///    If provided, used to populate the dictionary.
    /// </param>
    this.items = [];

    if (typeof (array) != 'undefined') {
        this.items = array;
    }

    this.length = function () {
        /// <summary>
        ///    Returns the number of items in the current list.
        /// </summary>
        /// <returns type="number" integer="true" />
        return this.items.length;
    };

    this.add = function (value) {
        /// <summary>
        ///    Adds the provided value to the end of the list.
        /// </summary>
        /// <param name="value" type="Object" mayBeNull="true">
        ///    Value to get added to the list.
        /// </param>
        this.items[this.length()] = value;
    }

    this.find = function (value) {
        /// <summary>
        ///    Looks for the specified value and returns its index
        ///    in the list. If not found, -1 is returned.
        /// </summary>
        /// <param name="value" type="Object">
        ///    Object to search for in the List.
        /// </param>
        /// <returns type="number" integer="true" />
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] == key) {
                return i;
            }
        }
        return -1;
    };

    this.contains = function (value) {
        /// <summary>
        ///    Checks if the provided value is found in the List-object.
        /// </summary>
        /// <returns type="boolean" />
        return (this.find(value) != -1);
    };

    this.sort = function () {
        /// <summary>
        ///    Sorts the data in the list using standard Array-sorting as provided by the JS-engine.
        ///    Will sort the actual collection and not return a new, sorted List.
        /// </summary>
        this.items.sort();
    };

    this.clear = function () {
        /// <summary>
        ///    Clears the content of a collection. Useful when working on collections contained in collections
        ///    and you want to avoid creating new objects to replace the existing ones.
        /// </summary>
        this.items = [];
    };

    /*
    * set processing features
    */

    this.foreach = function (func) {
        /// <summary>
        ///    Iterates over the list and executes the provided function
        ///    for every list-item.
        /// </summary>
        /// <param name="func" type="function">
        ///    The following types of function can be provided:
        ///    function(value), function(value,index)
        /// </param>
        /// <returns type="List" />

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            func(item, i);
        }

        return this;
    };

    this.map = function (func) {
        /// <summary>
        ///    Creates a new List-object from the old list based on the
        ///    provided transformation-function.
        /// </summary>
        /// <param name="func" type="function">
        ///    The following types of function can be provided:
        ///    function(value), function(value,index)
        /// </param>
        /// <returns type="List" />

        var results = new List();

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var newItem = func(item, i);
            results.add(newItem);
        }

        return results;
    };

    this.filter = function (func) {
        /// <summary>
        ///    Iterates over the list and filters items based on the provided function.
        ///    The filtered results is returned as a new List-instance.
        /// </summary>
        /// <param name="func" type="function">
        ///    Function must evaluate to true or false. The following types of function can be provided:
        ///    function(value), function(value,index)
        /// </param>
        /// <return type="List" />
        var results = new List();

        this.foreach(function (node, index) {
            if (func(node, index)) {
                results.add(node);
            }
        });

        return results;
    };

    this.distinct = function () {
        /// <summary>
        ///    Returns a new List containing only the distinct values found in the original list.
        ///    Requires the list to be pre-sorted and eliminates null-data.
        /// </summary>
        /// <returns type="List" />

        var results = new List();

        var previous = null;

        this.foreach(function (node) {
            if (node != previous) {
                results.add(node);
            }
            previous = node;
        });

        //        // clean implementation
        //        // requires no pre-sorted data and does not eliminate null-data, but will be slow on large sets
        //        this.foreach(function (node) {
        //            if (false == results.contains(node)) {
        //                results.add(node);
        //            }
        //        });

        return results;
    };

    this.flatten = function(extractor, terminationCriteria) {
        /// <summary>
        ///    Iterates over the list and recursively digs into the list creating a flattened view of the data.
        ///    Terminates recursion when terminationCriteria evaluates to true. Returns a new List-object with the
        ///    flattened nodes.
        /// </summary>
        /// <param name="extractor" type="function">
        ///    Function used to extract subNodes. Should return an array of nodes.
        /// </param>
        /// <param name="terminationCriteria" type="function">
        ///    Function must evaluate to true or false given the array from the extractor.
        ///    The following types of function can be provided: function(array)
        /// </param>
        /// <return type="List" />
        
        var flattened = new List();

        var flatten = function(flattenedNodes, tree) {

            tree.foreach(function(node) {
                var subNodes = extractor(node);

                if (false == terminationCriteria(subNodes))
                {
                    flatten(flattenedNodes, new List(subNodes));
                }
                else
                {
                    flattenedNodes.add(node);
                }
            });
        };

        flatten(flattened, this);
        return flattened;
    };
}

List.__class = true;
