// ==UserScript==
// @name          OutOfMilk.com Category-List Manager Scrolling Fix
// @version       0.1.2
// @description   Fixes the jQuery UI Draggable bug revolving around dragged item getting offset when scrolling.
// @namespace     http://userscripts.org/users/377329
// @author        Jonathan Brochu (http://userscripts.org/users/377329)
// @license       GPLv3 or later (http://www.gnu.org/licenses/gpl-3.0.en.html)
// @include       http://www.outofmilk.com/ManageCategories.aspx*
// @grant         none
// ==/UserScript==

/***
 * History:
 *
 * 0.1.2  Changes made:
 *        - Fixed previously noted z-index issue. Now, everytime a category
 *          name is being dragged it is made the topmost element on the page.
 *          This is not the most elegant of solutions (i.e. re-check all
 *          z-indices everytime), but it is the best we can do considering
 *          we don't have control over the page.
 *        (2013-04-05)
 * 0.1.1  Changes made:
 *        - Removed the unneeded library @include (jQuery v1.8.2), since now
 *          it conflicts anyway with the (new?) version of the library being
 *          used on the page.
 *        - Tweaked @include to allow for URL params and anchors.
 *        NOTE: The (probably updated) version of the jQuery library used by
 *              the site/page recently introduced issues with the z-order of
 *              items being dragged (i.e. the dragged item might disappear
 *              when scrolling, but it can be made to re-appear after being
 *              dragged all-the-way to the bottom and then back up the page).
 *              This issue still needs further investigation.
 *        (2013-04-02)
 * 0.1.0  First implementation. (2013-02-17)
 *
 */

(function() {
    // constants
    var USERSCRIPT_NAME = 'OutOfMilk.com Category-List Manager Scrolling Fix';
    
    // reference some outside objects
    window.console = window.console || (function() {
        if (typeof(unsafeWindow) == 'undefined') return { 'log': function() {} };
        return unsafeWindow.console;
    })();
    
    // re-implement jQuery.ui.draggable
    if (jQuery.ui.draggable) {
        jQuery.ui.draggable.prototype._mouseDrag = function(event, noPropagation) {
            
            // Compute the helpers position
/* --> */   /* Added: */ var currentRelativeOffset = this._getRelativeOffset();
            this.position = this._generatePosition(event);
            this.positionAbs = this._convertPositionTo("absolute");
            
            // Call plugins and callbacks and use the resulting position if something is returned
            if (!noPropagation) {
                var ui = this._uiHash();
                if(this._trigger("drag", event, ui) === false) {
                    this._mouseUp({});
                    return false;
                }
                this.position = ui.position;
            }
            
            if(!this.options.axis || this.options.axis !== "y") {
                /* Original line:
                 * this.helper[0].style.left = this.position.left + "px";
                 * 
                 * Updated line, using currentRelativeOffset:
                 */
/* --> */       this.helper[0].style.left = this.position.left + (this.offset.relative.left - currentRelativeOffset.left) + "px";
            }
            if(!this.options.axis || this.options.axis !== "x") {
                /* Original line:
                 * this.helper[0].style.top = this.position.top + "px";
                 * 
                 * Updated line, using currentRelativeOffset:
                 */
/* --> */        this.helper[0].style.top = this.position.top + (this.offset.relative.top - currentRelativeOffset.top) + "px";
            }
            if($.ui.ddmanager) {
                $.ui.ddmanager.drag(this, event);
            }

            return false;
        };
    }
    
    // Unbind from previous draggable implementation
    $(".draggableItem").draggable("destroy");
    // Rebind to new implementation (as done in 'js/methods/categories/ManageCategories.js?v=...')
    $(".draggableItem").draggable({ revert: true });
    
    // 2013-04-04: Force every newly-clicked span.draggableItem to be the topmost item
    // Reference: http://stackoverflow.com/questions/4755631/css-javascript-make-element-top-most-z-index-top-most-modal-element
    try {
        $('span.draggableItem').each(function(){
            this.addEventListener('mousedown', function(){
                var highest_index = 0;
                $('[z-index]').each(function() {
                    if ($(this).attr('z-index') > highest_index) {
                         highest_index = $(this).attr('z-index');
                    }
                });
                $(this).attr('z-index', highest_index + 1);
            }, false);
        });
    } catch(err) {
        console.log(err);
    }
})();