// ==UserScript==
// @name       Cool Toy Review Photo Archive Tweaks
// @namespace  http://metalfrog.us/scripts
// @version    0.0.2
// @description  Resizes the gallery image to fit within the viewport, and adds keyboard shortcuts to the CTR Photo Archive Galleries. Left and Right arrow keys navigate to the previous and next images, respectively, Home and I return to the index, and O opens the current image in a page.
// @match      *://*.cooltoyreview.com/*
// @copyright  2012+, Keith J. Frank, keithjfrank@gmail.com
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function () {
    // Key handling class, the selectors are fucking terrible in this shit HTML...
    var map = {
        keys: {
            index: {
                selector: 'img[title="Index page"]',
                code: [ 73, 36 ], // i, home
                newTab: false
            },
            prev: {
                selector: 'img[title="[< Previous]"]',
                code: [ 33, 37 ], // <-
                newTab: false
            },
            next: {
                selector: 'img[title="[Next >]"]',
                code: [ 34, 39 ], // ->
                newTab: false
            },
            open: {
                selector: 'table table table div img', // yup, as specific as I can get!
                code: 79, // o
                newTab: true
            }
        },

        // Check if a key/code pair is satisfied
        check: function (key, code) {
            if (key === code) {
                return true;
            }

            if (typeof key === 'object') {
                if (key.indexOf(code) > -1) {
                    return true;
                }
            }

            return false;
        }
    };

    // Image resize class
    var img = {
        resized: false,
        maxWidth: window.innerWidth - 40,
        maxHeight: window.innerHeight - 200,
        ratio: 0,
        origWidth: 0,
        origHeight: 0,
        newWidth: 0,
        newHeight: 0,

        init: function (i) {
            this.origWidth = i.width;
            this.origHeight = i.height;

            if (( this.origWidth > this.maxWidth ) || ( this.origHeight > this.maxHeight )) {
                var tmpWidth = Math.round((this.maxHeight / this.origHeight) * this.origWidth);
                var tmpHeight = Math.round((this.maxWidth / this.origWidth) * this.origHeight);
                
                this.newWidth = tmpWidth < this.maxWidth ? tmpWidth : this.maxWidth;
                this.newHeight = tmpHeight < this.maxHeight ? tmpHeight : this.maxHeight;
                
                // Pass off to resize function
            	this.resize(i);
            } else {
                this.newWidth = this.origWidth;
                this.newHeight = this.origHeight;
            }
        },

        resize: function (i) {
            i.width = this.newWidth;
            i.height = this.newHeight;

            this.resized = true;
        },

        restore: function (i) {
            i.width = this.origWidth;
            i.height = this.origHeight;

            this.resized = false;
        },

        toggle: function (i) {
            if (this.resized) {
                this.restore(i);
            } else {
                this.resize(i);
            }
        }
    };

    // Only work if on a gallery page, or we'll affect comment/search entry.
    if ($('img[title="Index page"]').length > 0) {
        // Fit image to view port, click to toggle between original and resized
        var image = document.images[ document.images.length - 1 ];

        // Remove title from image to stop that annoying fucking hover.
        image.title = '';

        img.init(image);

        $(image).click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            img.toggle(this);
        });

        // Keyboard Shortcut Handler
        $(window).keydown(function (e) {
            console.log(e.which);

            for (var key in map.keys) {
                if (map.keys.hasOwnProperty(key)) {
                    if (map.check(map.keys[key].code, e.which) === true) {
                        e.preventDefault();

                        // Stupid hack to get the image to open in a new tab...
                        if (key === 'open') {
                            $(map.keys[key].selector).closest('a')[0].href = image.src;
                        }

                        if (map.keys[key].newTab) {
                            window.open($(map.keys[key].selector).closest('a')[0].href);
                        } else {
                            $(map.keys[key].selector).closest('a')[0].click();
                        }

                        break;
                    }
                }
            }
        });
    }
});