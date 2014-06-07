// ==UserScript==
// @name        4chan Image Pre-loader
// @author      Goosk
// @version     0.2.1
// @namespace   fourchan_preloader
// @description Pre-load images in a thread continuously after activation.
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// @icon        http://static.4chan.org/image/favicon.ico
// @updateURL   https://raw.github.com/Goosk/4chan-Image-Pre-loader/master/preload.user.js
// ==/UserScript==


/**
 * Now compatible with the new HTML as of 2012-05-06
 */
(function() {
    var updateDelay = 10; // Time between updates in seconds
    var storageName = '4chan_imagepreloader'; // Name of the local storage
    var status = ((localStorage.getItem(storageName) == 2) ? 2 : 0);
    var messages = new Array('Off', 'On', 'Always on'); // Status messages
    
    /**
     * Add the controls used to toggle the status
     * to the end of the board list.
     */
    this.addHtml = function() {
        var html = "";
        var toggleHTML = document.createElement('div');
        var boardNav = document.getElementById('boardNavDesktop');
        
        html += '<span class="preloadControls">';
        html += '   <span>Pre-loading: </span>';
        html += '   <span><a href="javascript:void(0)" id="preloadToggle">'+ messages[status] +'</a></span>';
        html += '   <span><a href="javascript:void(0)" id="preloadAbout">(?)</a></span>';
        html += '</span>';
        
        toggleHTML.innerHTML = html;

        if(boardNav != null) {
            // Add the controls to the end of the board list
            boardNav.innerHTML = boardNav.innerHTML + html;
            
            // Event listener to toggle preloader status
            document.getElementById('preloadToggle').addEventListener('click', toggleLoad);
            
            // Event listener for displaying the help pop-up
            document.getElementById('preloadAbout').addEventListener('click', function() {
                var about = '';
                
                about += '# 4chan Preloader Help #\n\n';
                about += 'How to use:\n';
                about += 'Click the status to toggle how the preloader works.\n\n';
                about += 'Statuses and what they do:\n';
                about += '- \''+ messages[0] +'\': the preloader is not doing anything.\n';
                about += '- \''+ messages[1] +'\': it\'s preloading for this thread only.\n';
                about += '- \''+ messages[2] +'\': the preloader will automatically preload any images in any thread, in any tab.\n\n\n';
                about += 'Please report any problems you run into.';
                
                alert(about);
            });
        }
    }
    
    /**
     * Move on to the next status.
     */
    this.toggleLoad = function() {
        switch(status) {
            case 0: setStatus(1); break;
            case 1: setStatus(2); break;
            case 2: setStatus(0); break;
        }
        
        setStatus(status);
    }
    
    /**
     * Set the status of the preloader, update the
     * local storage with the new value and change
     * the status message to reflect the change.
     */
    this.setStatus = function(s) {
        status = s;
        // Update new status in local storage
        localStorage.setItem(storageName, s);
        
        // Update the message on the button
        document.getElementById('preloadToggle').innerHTML = messages[s];
    }
    
    /**
     * Find all images in the thread and preload them.
     * So much neater with the new HTML on the boards.
     */
    this.preload = function() {
        // All images in the thread
        var images = document.getElementsByClassName('fileThumb');
        
        // Loop through the images we found
        if(images.length > 0) {
            for(var i = 0; i < images.length; i++) {
                (new Image()).src = images[i];
            }
        }
    }
    
    addHtml(); // Add buttons on load
    if(status != 0) preload(); // Preload right away
    
    /**
     * Get status from local storage update our own if it needed
     */
    setInterval(function() {
        var s = localStorage.getItem(storageName);
        
        // Update status if it was previously on 'Always on' and changed
        // to another one, or if it wasn't and changed to 'Always on' in
        // another tab.
        if((status == 2 && s != 2) || (status != 2 && s == 2)) {
            setStatus(s);
        }
        
        if(status != 0) preload();
    }, updateDelay * 1000);
})();