// ==UserScript==
// @name       Duolingo Review
// @namespace  http://code-poet.net
// @version    0.1
// @description  Helps review lessons and practices on Duolingo
// @match      http://www.duolingo.com/*
// @match      https://www.duolingo.com/*
// @copyright  2014, Vaughan Chandler, Creative Commons Attribution-ShareAlike 4.0 International License
// ==/UserScript==

// Inject the script when requirements are met.
function inject(f, ready) {
    var injectionInterval = window.setInterval(function() {
        if (ready.apply()) {
            window.clearInterval(injectionInterval);
            var script;
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.setAttribute('name', 'injected');
            script.textContent = '(' + f.toString() + ')(jQuery)';
            document.head.appendChild(script);
            console.log('Injected');
        } else {
            console.log('Not ready yet...');
        }
    }, 500);
}
inject(f, function() { return typeof jQuery !=='undefined' && duo && duo.SessionView; });

// The script to be injected.
function f($) {
    
    // Log the argument to the console.
    function l(a) { console.log(a); }
    
    
    // The original Duolingo functions.
    // Remember them because the custom functions will need to call them.
    var duolingoShowFailView = duo.SessionView.prototype.showFailView;
    var duolingoShowEndView  = duo.SessionView.prototype.showEndView;
    
    // Called when time runs and you didn't get any points.
    duo.SessionView.prototype.showFailView = function() {
        try { showReview(this.model.get('session_element_solutions'), '#session-element-container'); }
        catch(x) { l('Exception while showing review via showFailView(): ' + x.message); l(x.stack ? x.stack : 'no stack'); }
        duolingoShowFailView.apply(this, arguments);
    }
    
    // Calls after time runs out and you got points (shows the number of points you got this week, level progress, etc).
    // Also called after a lesson.
    duo.SessionView.prototype.showEndView = function() {
        try { showReview(this.model.get('session_element_solutions'), '.session-end-main'); }
        catch(x) { l('Exception while showing review via showEndView(): ' + x.message); l(x.stack ? x.stack : 'no stack'); }
        duolingoShowEndView.apply(this, arguments);
    }
    
    
    // This is the function that actually shows the questions and answers.
    // It must be passed this.model.get('session_element_solutions') from a function that has access to it.
    function showReview(solutions, elmSelector) {
        
        //l(solutions);
        
        var questions = [];
        for (var i=0; i<solutions.length; i++) {
            try {
                var q = new Q(solutions[i][0]);
                questions.push(q);
                if (!q.supported) { l('Unsupported question:'); l(solutions[i][0]); }
            } catch(x) { l('Exception while parsing question: ' + x.message); l(x.stack ? x.stack : 'no stack'); l(solutions[i][0]); }
        }
        
        // Because Duolingo uses Ajax the content may not be on the page when this function is ready to append to it (thus the interval).
        var endViewInterval = window.setInterval(function() {
            
            var elm = $(elmSelector);
            if (elm.length) {
                
                // Element found, clear the interval.
             	window.clearInterval(endViewInterval);
                
                // Add the table with it's headings.
                elm.append($(
                    '<div class="dr-table">'+
                    	'<div>'+
                    		'<span></span>'+
                    		'<span><strong>' + duo.user.get('username') + '</strong></span>'+
                    		'<span><strong>Duolingo</strong></span>'+
                    	'</div>'+
                    '</div>'
               	));
                
                // Append the rows to the table.
                for (var i=0; i<questions.length; i++) { $('.dr-table').append(questions[i].html()); }
                
                // The "fail view" page doesn't auto adjust the height of the element the table gets appended to.
                // The 370 accounts for the content that's there by default.
                // The "end view" page doesn't have "#app.player" so it's not affected.
                $('#app.player .player-main').height((370 + $('.dr-table').height()) + 'px');
                
            }
            
        }, 500);
        
    }
    
    
    // An object representing a question.
    function Q(solution) {
        
        var session = solution.get('session_element');
        
        var supportedTypes = [
            'translate',		// Text translation
            'name',				// Type what you see (pictures)
            'judge',			// Multiple choice with text
            'select',			// Multiple choice with text and pictures
            'reverse_speak',	// Say something after translating it to the language you're learning
            'speak',			// Read something in the language you're learning
            'listen',			// Type what you hear
            'form',				// Fill in the blank using a drop down
        ];
        
        this.solution = solution;
        
        this.type = solution.get('type');
        this.supported = $.inArray(this.type, supportedTypes) != -1;
        
        this.correct = solution.get('correct');
        this.correct_class = 'dr-' + (solution.get('correct') ? 'correct' : 'incorrect');
    	
        //
    	// Question
        //
    	if (session.get('sentence')) { // Used by translate. Format: 'answer'.
        	
            this.question = session.get('sentence');
            
        } else if (session.get('text')) { // Used by judge, speak and reverse_speak. Format: 'answer'.
        	
            this.question = session.get('text');
            
        } else if (session.get('images')) { // Used by name. Format: ['src1', 'src2'...]
            
            var buffer = [];
            for (var i=0; i<session.get('images').length; i++) { buffer.push('<img src="' + session.get('images')[i] + '" />'); }
            this.question = buffer.join(' ');
            
        } else if (session.get('hint')) { // Used by select. Format: 'answer'
            
            this.question = session.get('hint');
            
        } else if (session.get('tokens')) { // Used by form. Format: [{object}...] where object either has 'word' and 'display_value' attributes, or is a blank to be filled in by the user.
            
            var buffer = [];
            for (var i=0; i<session.get('tokens').length; i++) {
                if (session.get('tokens')[i].word && session.get('tokens')[i].display_value) { buffer.push(session.get('tokens')[i].display_value); }
                else { buffer.push('___'); }
            }
            this.question = buffer.join(' ');
            
        } else if (this.type=='listen') { // No textual question so show an icon.
            
            this.question = '♪';
            
        } else { // Failover
            this.question = '-';
        }
    	
    	//
    	// User's answer
    	//
        if (this.type=='speak' || this.type=='reverse_speak') { // No textual answer so show an icon.
            
            this.user_answers = ['♪'];
            
        } else if (solution.get('value')) { // Used by translate, listen and select. Format: 'answer'
            
            this.user_answers = [solution.get('value')];
            
        } else if (solution.get('word')) { // Used by name. Format: 'answer'. Also has another attribute 'article' with format: 'answer'.
            
            this.user_answers = [(solution.get('article') ? solution.get('article') + ' ' : '') + solution.get('word')];
            
        } else if (session.get('sentences')) { // Used by judge. Format: ?
         	
            this.user_answers = [];
            for (var i=0; i<session.get('sentences').length; i++) {
                if (solution.get('choices')[i]=='correct') { this.user_answers.push(session.get('sentences')[i].sentence); }
            }
            
        } else if (solution.get('sentence')) { // Used by form. Format: 'answer' (may contain extra whitespace)
            
            this.user_answers = [solution.get('sentence')];
            
        } else { // Failover.
            this.user_answers = ['-'];
        }
        
    	//
		// Duolingo's answer
    	//
    	if (solution.get('correct_solutions')) { // Used by translate, judge, select, name, form and listen. Format: ['answer 1', 'answer 2']
            
            this.duolingo_answers = solution.get('correct_solutions');
            
        } else if (session.get('stripped_text')) { // Used by speak and reverse_speak, but differently.
            
            // speak format: '<answer>'
            if (this.type=='speak') {
            	this.duolingo_answers = [session.get('stripped_text')];
            }
            
            // reverse_speak format: '<original>|<answer 1>|<answer 2>...'
            else if (this.type=='reverse_speak') {
            	this.duolingo_answers = session.get('stripped_text').split('|');
            	this.duolingo_answers.shift();
            }
            
        } else { // Failover.
            this.duolingo_answers = ['-'];
        }
        
    }
	// Debugging function.
    Q.prototype.log = function() {
    	l('Question = ' + this.question);
    	l('User answer = ' + this.user_answer);
    	l('Duolingo answer = ' + this.duolingo_answer);
        l('Correct = ' + (this.correct ? 'true' : 'false'));
        l('Supported = ' + (this.supported ? 'true' : 'false'));
    };
	// Return the HTML for a "row" representing the question and its answers.
    Q.prototype.html = function() {
        //l(this.solution);
        if (!this.supported) { return '<div>Unsupported type "' + this.type + '".</div>'; }
        return	'<div class="dr-type-' + this.type + '">'+
               		'<span>' + this.question + '</span>'+
                    '<span class="answer ' + this.correct_class + '"><span>' + this.user_answers.join('</span><span>') + '</span></span>'+
                	'<span class="answer"><span>' + this.duolingo_answers.join('</span><span>') + '</span></span>'+
                '</div>'
    }
    
    
    // Add CSS.
    document.head.appendChild($(
        '<style type="text/css">'+
        '.dr-table { display:table; margin:0px auto 20px; color:#3c3c3c; }'+
        '.dr-table > div { display:table-row; }'+
        '.dr-table > div > span { display:table-cell; padding:2px 6px; border-bottom:1px solid #efefef; vertical-align:top; }'+
        '.dr-table > div > span.dr-correct { color:#769c00; }'+
        '.dr-table > div > span.dr-incorrect { color:#e02804; }'+
        '.dr-table > div > span > span { display:block; border-top:1px dashed #f3f3f3; padding:2px; }'+
        '.dr-table > div > span > span:first-child { border-top:none; }'+
        '.dr-table img { max-height:70px; }'+
    	'</style>'
   	).get(0));
    
}
