// ==UserScript==
// @name remove this
// @namespace renevier.fdn.fr
// @author arno <arenevier@fdn.fr>
// @licence GPL/LGPL/MPL
// @description remove all you don't need when displaying a document.
// ==/UserScript==

/*
 * that script can be used to remove any element on a document. To select an
 * element, click on it while maintaining Control key pressed. You can select
 * more than one element at once. You can cancel your selection at any time by
 * clicking on the document without holding control key.
 *
 * When you have finished selecting items, just press delete or backspace key
 * to delete you selection.
 * 
 * To undo a set of deletions, use Ctrl-Z
 */

var gRemoved = [];
var gSelected = [];

function selectedItem(aNode) {
    this.init(aNode);
}
selectedItem.prototype = {
    init: function(aNode) {
        this.node = aNode;
        this.savedOutlineStyle = aNode.style.outline;
        aNode.style.outlineWidth = "black";
        aNode.style.outlineStyle = "dashed";
        aNode.style.outlineColor = "invert";
    },
    unselect: function() {
        this.node.style.outline = this.savedOutlineStyle;
    },
    suppress: function() {
        // save neighbourhood. If we undo deletion, we will replace node only
        // if neighbourhood is the same. Otherwise, it may be a sign that too
        // many things have changed on page layout, and we cannot reliably
        // replace deleted element
        if (this.node.previousSibling) {
            this.previousSibling = this.node.previousSibling;
        }
        if (this.node.nextSibling) {
            this.nextSibling = this.node.nextSibling;
        }
        if (this.node.parentNode) {
            this.parentNode = this.node.parentNode;
            this.node.parentNode.removeChild(this.node);
            return true;
        } else { // no parent node. node has already been removed from document.
            return false;
        }
    },
    isStillValid: function() {
        if (!this.parentNode)
            return false;
        if (!this.previousSibling && !this.nextSibling) {
            return (this.parentNode.childNodes.length == 0)
        }
        if (!this.previousSibling) {
            return (this.parentNode.firstChild == this.nextSibling);
        } else if (!this.nextSibling) {
            return (this.parentNode.lastChild == this.previousSibling);
        } else {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                var child = this.parentNode.childNodes[i];
                if (child == this.previousSibling) {
                    return (child.nextSibling == this.nextSibling);
                }
            }
        }
        return false;
    }
}

function removeAction() {
    this.init();
}
removeAction.prototype = {
    init: function() {
        this.items = new Array();
    },
    add: function(aItem) {
        this.items.push(aItem);
    },
    undo: function() {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.isStillValid()) {
                item.unselect();
                item.parentNode.insertBefore(item.node, item.nextSibling);
            }
        }

    }
}

function click(evt) {
    if (evt.button != 0) // 0: left click
        return;

    if (evt.ctrlKey) { // click while holding Ctrl key
        // checks if item is already selected
        for (var i = 0; i < gSelected.length; i++) {
            if (gSelected[i].node == evt.target) {
                // item is already selected, unselect it;
                gSelected[i].unselect();
                gSelected.splice(i, 1);
                evt.preventDefault();
                return;
            }
        }
        // item is not selected yet: select it
        gSelected.push(new selectedItem(evt.target));
        evt.preventDefault();
    } else { // normal click
        if (gSelected.length) {
            gSelected.forEach(function(item) { item.unselect()});
            gSelected = [];
            evt.preventDefault();
        }
    }
}

function keyup(evt) {
    if (evt.keyCode == 8 || // backspace
        evt.keyCode == 46) // delete
        {
            if (!gSelected.length)
                return;
            var action = new removeAction();
            gSelected.forEach(function(item) { 
                if (item.suppress())
                    action.add(item);
            });
            gRemoved.push(action);
            gSelected = [];
            evt.preventDefault();
        }
}

function keydown(evt) {
    if(String.fromCharCode(evt.keyCode) == 'Z' && evt.ctrlKey) { // Ctrl-Z
        gRemoved.pop().undo();
    }
}

window.addEventListener("click", click, true);
window.addEventListener("keyup", keyup, true);
window.addEventListener("keydown", keydown, true);
