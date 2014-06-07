// ==UserScript==
// @name        Split Screen Google Translate (en)
// @namespace   http://hyperlogos.org/
// @description Displays Google-translated version next to original
// @include     *
// @version     1
// ==/UserScript==

(function () {
    function splitrans() {
        var initialResize = true;
        
        function resizeFrames(f1width) {
            /* Resize the first iframe */
            f1.width = f1width;
            /* Resize and reposition the second iframe */
            f2.width = window.innerWidth - f1width - 5; 
            f2.style.left = f1width + 4 + 'px';
        }
        
        function windowResize() {
            var f1ratio, f2ratio;
            
            if (initialResize)
                /* Initially, make the frames have equal width */
                f1ratio = f2ratio = 0.5;
            else {
                /* 
                 * Calculate what percentage of window width is occupied by each 
                 * frame
                 */ 
                f1ratio = f1.width / (parseInt(f1.width) + parseInt(f2.width));
                f2ratio = f2.width / (parseInt(f1.width) + parseInt(f2.width));
            }
            
            resizeFrames(Math.floor(f1ratio * window.innerWidth) - 5);

            initialResize = false;

            /* Adjust document body height */
            body.style.height = window.innerHeight + 'px';
        }
        
        /* Do nothing if we're already in an iframe */
        if (window != window.top)
            return;

        /* Get current location */
        var loc = window.location + "";
        
	/* Create google translate location */
	var loctrans = "http://translate.google.com/translate?hl=en&sl=auto&tl=en&u=" + encodeURI(loc) ;

        /*
         * The contents won't be loaded if the location of the iframe is exactly
         * the same as the main document (that's probably to protect against
         * infinite nesting of iframes), so we need to modify it slightly.
         */
        if (loc.match(/\?/))
            loc = loc.replace(/\?/, '?%20=&');
        else
            loc = loc + '?';
        
        /* Put in the content */
        document.documentElement.innerHTML = '<head></head>' +
            '<body><iframe id="f1"></iframe><iframe id="f2"></iframe>' +
            '<div id="ov">&nbsp;</div></body>';
        
        /* Add styles */
        GM_addStyle('body { margin: 0; padding: 0; height: 100%; ' +
                'width: 100%; background: #bbb; overflow: hidden; ' +
                'cursor: col-resize; }');
        GM_addStyle('#f1, #f2 { height: 100%; position: absolute; border: none; }');
        GM_addStyle('#ov { width: 100%; height: 100%; position: absolute; ' +
                'z-index: 999; display: none; }');
        GM_addStyle('#f1 { border-right: solid 1px #ddd; }');
        GM_addStyle('#f2 { border-left: solid 1px #999; }');

        var body = document.querySelector('body'),  /* Document body */
            f1 = document.querySelector('#f1'),     /* First iframe */
            f2 = document.querySelector('#f2'),     /* Second iframe */
            ov = document.querySelector('#ov');     /* Overlay */

        /* Load the content in the two iframes */
        f1.src = loc ; f2.src = loctrans;
    
        /* Do the initial resize */
        windowResize();
        /* Listen for window resize events */
        window.addEventListener('resize', windowResize, false);
        
        /*
         * Allow the user to resize the iframes by dragging the horizontal space
         * between them. While the user is resizing, a transparent overlay is
         * displayed over the two iframes to catch mouse events.
         */
        
        var startX;
        
        function resizeStart(event) {
            /* Enable mousemove/mouseup event handlers */
            ov.addEventListener('mousemove', resizeMove, true);
            ov.addEventListener('mouseup', resizeEnd, true);
            startX = event.pageX - f1.width;
            /* Display the overlay */
            ov.style.display = 'block';
        }
        
        function resizeMove(event) {
            /* 
             * Make sure each iframe is at least 100 pixels wide (minus startX)
             */
            var x = Math.min(Math.max(event.pageX, 100),
                    window.innerWidth - 100);
            resizeFrames(x - startX);
        }
        
        function resizeEnd(event) {
            /* Disable mousemove/mouseup event handlers */ 
            ov.removeEventListener('mousemove', resizeMove, true);
            ov.removeEventListener('mouseup', resizeEnd, true);
            /* Hide the overlay */
            ov.style.display = 'none';
        }
        
        /* Listen for a mousedown event to start the resizing */
        body.addEventListener('mousedown', resizeStart, false);
    }
    
    /* Make the split command available in the user script commands menu */
    GM_registerMenuCommand('Split Screen Google Translate', splitrans, 'T');
})();