// ==UserScript==
// @name          PoliticsToRobbery
// @namespace     http://elusiveguy.com/
// @description	  Turns "politics" to "robbery" a la cloud-to-butt 
// @include       *
// @version       1.0.1
// ==/UserScript==

(function() {
var Program = {
    replaceFrom: 'politics',
    replaceTo: 'robbery',
    loaded: false,
    changeBufferTimer: null,

    main: function() {
        if (!this.loaded) {
            this.loaded = true;
            document.addEventListener('DOMSubtreeModified', this.domChanged, false);
            this.domChangedBuffered();
        }
    },

    domChanged: function() {
        if (this.changeBufferTimer) {
            clearTimeout(this.changeBufferTimer);
            this.changeBufferTimer = null;
        }
        this.changeBufferTimer = setTimeout(this.domChangedBuffered.bind(this), 222); //-- 222 milliseconds
    },

    domChangedBuffered: function() {
        // http://stackoverflow.com/a/1175796
        function replaceText(a, b, element) {    
            if (!element) element = document.body;    
            var nodes = element.childNodes;
            for (var n=0; n<nodes.length; n++) {
                if (nodes[n].nodeType == Node.TEXT_NODE) {
                    nodes[n].textContent = nodes[n].textContent.replace(a, b);
                } else {
                    replaceText(a, b, nodes[n]);
                }
            }
        }
        
        replaceText(new RegExp(this.replaceFrom, 'gi'), this.replaceTo);
    }
};

window.addEventListener('load', Program.main.bind(Program), false);
})();