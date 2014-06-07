// ==UserScript==
// @name           Wikipedia Presentation
// @namespace      http://phiffer.org/
// @description    Turn a Wikipedia article into a presentation
// ==/UserScript==

var wikipedia_presentation = {
    setup: function() {
        
        this.sections = [];
        this.pos = 0;
        
        var body = document.getElementsByTagName('body')[0];
        this.orig_markup = body.innerHTML;
        var markup = body.innerHTML;
        var start = 0;
        var end = markup.indexOf('<span class="editsection"');
        while (end != -1) {
            start = markup.indexOf('</span>', end);
            end = markup.indexOf('<span class="editsection"', start);
            if (end == -1) {
                end = markup.indexOf('<div class="printfooter">', start);
                this.sections.push(markup.substr(start, end - start));
                end = -1;
            }
            this.sections.push(markup.substr(start, end - start));
        }
        if (this.sections.length > 0) {
            var div = document.getElementById('bodyContent');
            var link = div.insertBefore(document.createElement('a'), div.firstChild);
            link.innerHTML = 'Start presentation';
            link.setAttribute('href', '#presentation');
            link.addEventListener('click', this.start, false);
        }
    },
    
    start: function() {
        var body = document.getElementsByTagName('body')[0];
        body.innerHTML = '';
        body.style.textAlign = 'center';
        
        var prev = body.appendChild(document.createElement('a'));
        prev.innerHTML = '&larr; Prev';
        prev.setAttribute('href', '#prev');
        prev.style.font = '11px verdana, sans-serif';
        prev.addEventListener('click', function() {
           wikipedia_presentation.prev();
        }, false);
        
        body.appendChild(document.createTextNode(' / '));
        
        var stop = body.appendChild(document.createElement('a'));
        stop.innerHTML = 'Exit';
        stop.setAttribute('href', '#exit');
        stop.style.font = '11px verdana, sans-serif';
        stop.addEventListener('click', function() {
           wikipedia_presentation.stop();
        }, false);
        
        body.appendChild(document.createTextNode(' / '));
        
        var next = body.appendChild(document.createElement('a'));
        next.innerHTML = 'Next &rarr;';
        next.setAttribute('href', '#next');
        next.style.font = '11px verdana, sans-serif';
        next.addEventListener('click', function() {
           wikipedia_presentation.next();
        }, false);
        
        var slide = body.appendChild(document.createElement('div'));
        slide.setAttribute('id', 'wikipedia_presentation');
        slide.style.width = '500px';
        slide.style.margin = '100px auto';
        slide.style.textAlign = 'left';
        slide.style.font = '2em verdana, sans-serif';
        
        slide.innerHTML = wikipedia_presentation.sections[0];
        var items = slide.getElementsByTagName('li');
        for (var i = 1; i < items.length; i++) {
            items[i].style.display = 'none';
        }
        
        document.addEventListener('keypress', wikipedia_presentation.keypress, false);
    },
    
    stop: function() {
        var body = document.getElementsByTagName('body')[0];
        body.innerHTML = wikipedia_presentation.orig_markup;
        body.style.textAlign = 'left';
        wikipedia_presentation.setup();
        document.removeEventListener('keypress', wikipedia_presentation.keypress, false);
    },
    
    keypress: function(event) {
        if (event.keyCode == 39) {
            wikipedia_presentation.next();
        } else if (event.keyCode == 37) {
            wikipedia_presentation.prev();
        }
    },
    
    prev: function() {
        this.pos--;
        if (this.pos == -1) {
            this.pos = this.sections.length - 1;
        }
        var slide = document.getElementById('wikipedia_presentation');
        slide.innerHTML = wikipedia_presentation.sections[this.pos];
    },
    
    next: function() {
        
        var slide = document.getElementById('wikipedia_presentation');
        var items = slide.getElementsByTagName('li');
        
        var hidden = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].style.display == 'none') {
                hidden++;
            }
        }
        
        if (hidden > 0) {
            items[items.length - hidden].style.display = 'list-item';
            return;
        }
        
        this.pos++;
        if (this.pos == this.sections.length) {
            this.pos = 0;
        }
        slide.innerHTML = wikipedia_presentation.sections[this.pos];
        var items = slide.getElementsByTagName('li');
        for (var i = 1; i < items.length; i++) {
            items[i].style.display = 'none';
        }
        
    }
};

wikipedia_presentation.setup();


