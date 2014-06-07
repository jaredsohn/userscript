// ==UserScript==
// @name		Sort Oracle CALPAGE Wiki Links
// @namespace	http://www.megacoder.com
// @include		http://wiki.us.oracle.com/calpg/*
// @include		https://wiki.us.oracle.com/calpg/*
// @require     http://code.jquery.com/jquery-1.8.0.min.js
// @description Show page links in some order, any order, order in the court!
// @author		Tommy Reynolds
// @license		GPLv2; aw, c'mon, you know you want it :D
// ==/UserScript==
// vim: noet sw=4 ts=4

/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode;
 *   })
 *
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){

    var sort = [].sort;

    return function(comparator, getSortable) {

        getSortable = getSortable || function(){return this;};

        var placements = this.map(function(){

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function() {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });

    };

})();

// Here begins our tale...

$(document).ready(function() {
    $('ul#navibar li.wikilink a').sortElements(
        // The 'a' and 'b' args should be the <a href...>title</a> objects
        // which form the tabs of the page.
        function(a,b){
            return $(a).text().toLowerCase() > $(b).text().toLowerCase() ? 1 : -1;
        },
        function(){
            return this.parentNode;
        }
    );
    $('ul#navibar li.userlink a').sortElements(
        // The 'a' and 'b' args should be the <a href...>title</a> objects
        // which form the tabs of the page.
        function(a,b){
            return $(a).text().toLowerCase() > $(b).text().toLowerCase() ? 1 : -1;
        },
        function(){
            return this.parentNode;
        }
    );
});
