// ==UserScript==
// @name           YouTube Video Controller Opaquer
// @description    A video controller opaquer for YouTube video pages.
// @namespace      http://userscripts.org/users/57930
// @include        http://*.youtube.com/watch?*
// @version        1.0b
// ==/UserScript==


(function() {
    var controllerMaskOpacity = 0.7 ;
    /**
      *   between 0 to 1.0
      *   (default: 0.7)
      */
    
    var controllerMaskColor = 'white' ;
    /**
      *   color name OR color hex
      *   (default: 'white')
      */
    
    var controllerMaskTurnOnDelayTime = 300 ;
    var controllerMaskTurnOffDelayTime = 900 ;
    /**
      *   milliseconds
      *   (default: 300 and 900)
      */
    
    
    var controllerMaskHeight = 25;
    var doc = document;
    var moviePlayer = doc.getElementById('movie_player');
    moviePlayer.setAttribute('wmode', 'transparent');
    moviePlayer.parentNode.style.position = 'relative';
    GM_addStyle('.watch-this-vid-longform {padding-top: 0px !important;}');
    var controllerMask = doc.createElement('div');
    controllerMask.id = 'controller_mask';
    controllerMask.style.position = 'absolute';
    controllerMask.style.background = controllerMaskColor;
    controllerMask.style.height = controllerMaskHeight + 'px';
    controllerMask.style.width = moviePlayer.clientWidth + 'px';
    controllerMask.style.top = (moviePlayer.clientHeight + moviePlayer.offsetTop - controllerMaskHeight) + 'px';
    controllerMask.style.marginLeft = moviePlayer.marginLeft + 'px';
    controllerMask.style.marginRight = moviePlayer.marginRight + 'px';
    controllerMask.style.display = 'block';
    controllerMask.style.opacity = controllerMaskOpacity;
    moviePlayer.parentNode.appendChild(controllerMask);
    
    var timeoutID = null;
    var toggleControllerMask = function(displayStyle, delayTime) {
        if (timeoutID) return;
        if (controllerMask.style.display == displayStyle) return;
        timeoutID = window.setTimeout(function() {
            controllerMask.style.display = displayStyle;
            timeoutID = null;
        },
        delayTime);
    };
    var cancelSetTimeout = function() {
        if (!timeoutID) return false;
        window.clearTimeout(timeoutID);
        timeoutID = null;
        return true;
    };
    
    controllerMask.addEventListener('mouseover', function() {
        toggleControllerMask('none', controllerMaskTurnOnDelayTime);
    }, false);
    controllerMask.addEventListener('mouseout', function() {
        cancelSetTimeout() || toggleControllerMask('block', controllerMaskTurnOnDelayTime);
    }, false);
    moviePlayer.addEventListener('mouseout', function() {
        toggleControllerMask('block', controllerMaskTurnOffDelayTime);
    }, false);
    moviePlayer.addEventListener('mousemove', function(e) {
        if (e.layerY - moviePlayer.offsetTop < moviePlayer.clientHeight - controllerMaskHeight) {toggleControllerMask('block', controllerMaskTurnOffDelayTime);}
        else {cancelSetTimeout();}
    }, false);
    moviePlayer.addEventListener('mouseover', function(e) {
        if (e.layerY - moviePlayer.offsetTop >= moviePlayer.clientHeight - controllerMaskHeight) cancelSetTimeout();
    }, false);
})();