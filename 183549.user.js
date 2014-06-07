// ==UserScript==
// @name        Title Scroll
// @namespace   koganei
// @description Will change your title on Wikipedia to reflect the current heading
// @include     http://en.wikipedia.org/*
// @version     1
// @grant       none
// ==/UserScript==

var koganeiTitleScrollPlugin = function() {

    /**
     *
     * Whether we should currently show the custom header
     */
    var _showHeader = false;
    
    /**
     *
     * The current custom heading that we've added
     */
    var _currentHeading = "";

    /**
     *
     * The spacer between the heading and the original title
     */
    var _spacer = " | ";

    /**
     *
     * The original title. Assumes it doesn't change.
     */
    var _originalTitle = document.title;
    
    /**
     *
     * The current vertical scroll coordinate
     */
    var _scrollY;
    
    /**
     * helper function
     * gets the first text of a node
     */
     var getText = function(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var curNode = node.childNodes[i];
            if (curNode.nodeName === "#text") {
                return curNode.nodeValue;
            }
        }
        
     };
    

    /**
     *
     * gets the heading at _scrollY
     */
    var getCurrentHeading = function() {
    
        // the custom heading to return
        var heading = ""; 
        
        // the header elements
        var headers = document.querySelectorAll(
            "#bodyContent h1 .mw-headline," +
            "#bodyContent h2 .mw-headline," +
            "#bodyContent h3 .mw-headline," +
            "#bodyContent h4 .mw-headline," +
            "#bodyContent h5 .mw-headline"
        );
        
        var closest = {
            y: 0,
            el: null
        };
        
        for(var i in headers) {
            if(!headers.hasOwnProperty(i)) { continue; }
            
            var header = headers[i];
            
            // we search for the closest to the current _scrollY
            // I don't know if we can assume that they're in order,
            // to test
            
            if(header.offsetTop > closest.y && header.offsetTop <= _scrollY) {
                closest.y = header.offsetTop;
                closest.el = header;
            }
        }
        
        if(!closest.el) return "";

        return getText(closest.el);
    };
    
    var changeTitle = function(newHeading) {
        var windowTitle = document.title;
        
        if(newHeading != "") {
            // save
            _currentHeading = newHeading;
            
            // replace the title
            document.title = newHeading + _spacer + _originalTitle;
        } else {
            document.title = _originalTitle;
        }
    };
    
    
    /**
     *
     * The global update function, gets called once every frame while scrolling
     */
    var update = function() {
        var newHeading = getCurrentHeading();    

        // skip the update if no change is to be done
        if(newHeading == _currentHeading) { return; }
        
        changeTitle(newHeading);    
    };
    
    /*
     *
     * We prepare the animation frame for all browsers
     */
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    
    // set the loop
    var loop = function() {
        requestAnimFrame(loop);
        if(_showHeader) {
            _showHeader = false;
            update();
        }
    };
    
    document.addEventListener("scroll", function(e) {
        _showHeader = true;
        _scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    });
    
    loop();
    
};

document.addEventListener("DOMContentLoaded", koganeiTitleScrollPlugin);