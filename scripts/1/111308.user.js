// ==UserScript==
// @name           JavaScript Evaluator
// @namespace      JavaScriptEvaluator
// @include        *
// @include        about:blank
// ==/UserScript==

if (window.self === window.top) {
    var VER = '0.9.3a'
    var CONSOLE_HEIGHT_PX = 150;

    var frame = document.createElement('div');
    var icon = document.createElement('div');
    var frameInner = document.createElement('div');
    var input = document.createElement('input');
    var output = document.createElement('div');
    
    var debugMode = false;
    var maximized = false;
    
    var scriptHistory = {
        statements : [],
        marker : -1,
        currentStatement : ''
    };

    var addOutput = function(text, style) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(text));
        
        style = style || {};
        for (var s in style) {
            if (style.hasOwnProperty(s)) {
                p.style[s] = style[s];
            }
        }
        p.style.fontFamily = output.style.fontFamily;
        p.style.fontSize = output.style.fontSize;
        p.style.whiteSpace = 'pre';
        
        output.appendChild(p);
        p.scrollIntoView(true);
    };
    var runScript = function() {
        var script = '' + input.value; 
        if (script.lastIndexOf(';') === (script.length - 1)) {
            script = script.substr(0, script.length - 1);
        }        
        if (script.length > 0) {
            scriptHistory.statements.push(script);
            scriptHistory.marker = scriptHistory.statements.length;
            scriptHistory.current = '';
       
            var out = '', style = {};
       
            try {
                var func = new Function('return (' + script + ')');                       
                var result = func();
                
                if (result !== undefined && result !== null && result !== '') { 
                    out += result; 
                }
                else if (debugMode) {
                    if (result === undefined) out += ('' + script + ' returns undefined');
                    if (result === null) out += ('' + script + ' returns null');
                    if (result === '') out += ('' + script + ' returns empty string');
                    style.color = '#808080';
                }
                
                input.value = '';
            }
            catch(e) { 
                if (e.hasOwnProperty('name') || e.hasOwnProperty('message')) {
                    if (e.hasOwnProperty('name'))       out += (e.name + ': ');
                    if (e.hasOwnProperty('message'))    out += e.message;
                }
                else out += e.toString();
                style.color = '#ff0000';
            }
        
            if (out.length > 0) {
                addOutput(out, style);
            }
        }
    };
    
    var getHistory = function(offset) {
        var h = scriptHistory.marker + offset;
        if (scriptHistory.statements.length > h && h > -1) {
            if (scriptHistory.current === '') {
                scriptHistory.current = input.value;
            }
            input.value = scriptHistory.statements[h];
            scriptHistory.marker = h;
        }
        else {
            input.value = scriptHistory.current;
            scriptHistory.marker = scriptHistory.statements.length;
        }
    };
    
    var minimize = function() {
        maximized = false;
        input.removeEventListener('keypress', inputOnKeyPress, false);
        frameInner.style.display = 'none';
        frame.style.top = '0px';
        frame.style.left = '0px';
        frame.style.width = '30px';
        frame.style.height = '30px';
        frame.style.opacity = 0.4;
        frame.style.cursor = 'pointer';
        frame.setAttribute('title', 'JavaScript Evaluator (double-click to open)');
        icon.style.display = 'block';
        icon.style.marginTop = ('' + ((frame.offsetHeight - icon.offsetHeight) / 2) + 'px');
    };
    var maximize = function() {
        maximized = true;
        frame.style.width = '100%';
        frame.style.height = '' + CONSOLE_HEIGHT_PX + 'px';
        frame.style.opacity = 0.8;
        frame.style.cursor = 'normal';
        frame.setAttribute('title', '');
        icon.style.display = 'none';
        frameInner.style.display = 'block';
        output.style.height = '' + (CONSOLE_HEIGHT_PX - input.offsetHeight) + 'px';
        input.addEventListener('keypress', inputOnKeyPress, false);
        input.focus();
    };
    
    var write = function(o) {
        if (o === undefined) { return 'undefined'; }
        else if (o === null) { return 'null'; }
        else if (o.constructor === Array) {
            var j = '[';
            for (var i = 0, len = o.length; i < len; i++) {
                j += (
                    ((j === '[') ? '' : ',') + 
                    ((o[i] !== undefined && o[i] !== null && o[i].constructor === String) ? ('\"' + o[i] + '\"') : write(o[i]))
                );
            }
            j += ']';
            return j;
        }
        else if (o.constructor === Object) {
            var j = '{';
            for (var p in o) { if (o.hasOwnProperty(p) && o[p] !== undefined) {
                j += (
                    ((j === '{') ? '' : ',') + 
                    ('\"' + p + '\":') + 
                    ((o[p] !== null && o[p].constructor === String) ? ('\"' + o[p] + '\"') : write(o[p]))
                );
            } }
            j += '}';
            return j;            
        }
        else return o.toString();
    };
    var toggleTransparency = function() {
        frame.style.opacity = ((frame.style.opacity === '1') ? 0.8 : 1);
        return 'Transparency is now ' + ((frame.style.opacity === '1') ? 'off' : 'on');
    };
    var toggleDebug = function() {
        debugMode = !!!debugMode; 
        return 'Debug mode is now ' + (!!debugMode ? 'on' : 'off');     
    };
    var clear = function() {
        var p = output.getElementsByTagName('p');
        for (var i = p.length - 1; i >= 0; i--) {
            output.removeChild(p[i]);
        }
    };
	var help = function() {
		addOutput(
			[
				'Built-in commands:',
				' - write(obj)\t\t:: output a value, or an object\'s JSON representation',
				' - clear()\t\t:: clears the output window',
				' - toggleDebug()\t:: enable/disable verbose debug output',
				' - toggleTransparency()\t:: enable/disable console transparency',
				' - exit()\t\t:: closes the console (as will pressing escape or double-clicking the console)'
			].join('\n'), 
			{ color:'#0000ff' }
		);
	};
    
    var keyEvents = {
        /* enter */     '13' : function() { runScript(); },
        /* escape */    '27' : function() { minimize(); },
        /* up */        '38' : function() { getHistory(-1); },
        /* down */      '40' : function() { getHistory(1); }
    };
    
    var inputOnKeyPress = function(e) {
		if (input.value === '' && String.fromCharCode(e.charCode) === '?') {
            e.stopPropagation();
            e.preventDefault();
			help();
            return false;
		}
        if (keyEvents.hasOwnProperty('' + e.keyCode)) {
            var func = keyEvents['' + e.keyCode];
            e.stopPropagation();
            e.preventDefault();
            func();
            return false;
        }
    };
    var frameOnClick = function(e) { return (!!maximized) ? minimize() : maximize(); };
      
    var buildConsole = function() {
        var randomId = Math.floor(Math.random() * (99999 - 10001) + 10000);
        frame.setAttribute('id', 'JavaScriptEvaluator$frame$' + randomId);
        frame.setAttribute('class', 'JavaScriptEvaluator$frame');
        frame.style.position = 'fixed';
        frame.style.backgroundColor = '#aaaaaa';
        frame.style.zIndex = 99999;
        frame.style.display = 'none';
        frame.addEventListener('dblclick', frameOnClick, false);
        frameInner.setAttribute('id', 'JavaScriptEvaluator$frameInner$' + randomId);
        frameInner.setAttribute('class', 'JavaScriptEvaluator$frameInner');
        frameInner.style.top = '0px';
        frameInner.style.left = '0px';
        frameInner.style.width = '100%';
        frameInner.style.height = '100%';
        icon.setAttribute('id', 'JavaScriptEvaluator$icon$' + randomId);
        icon.setAttribute('class', 'JavaScriptEvaluator$icon');
        icon.appendChild(document.createTextNode('JSE'));
        icon.style.color = '#000000';
        icon.style.fontFamily = 'monospace';
        icon.style.fontWeight = 'bold';
        icon.style.fontSize = '10px';
        icon.style.textAlign = 'center';
        output.style.fontFamily = input.style.fontFamily = 'monospace';
        output.style.fontSize = input.style.fontSize = '12px';    
        output.style.width = input.style.width = '100%';
        input.setAttribute('id', 'JavaScriptEvaluator$input$' + randomId);
        input.setAttribute('class', 'JavaScriptEvaluator$input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Enter javascript code...');
        input.style.display = 'block';
        input.style.bottom = '0px';
        output.setAttribute('id', 'JavaScriptEvaluator$output$' + randomId);
        output.setAttribute('class', 'JavaScriptEvaluator$output');
        output.style.overflowY = 'scroll';
        output.style.backgroundColor = '#ffffff';
        frameInner.appendChild(output);
        frameInner.appendChild(input);
        frame.appendChild(icon);
        frame.appendChild(frameInner);
        document.body.appendChild(frame);
        frame.style.display = 'block';
                
        window.write = write;
        window.toggleDebug = toggleDebug;
        window.toggleTransparency = toggleTransparency;
        window.clear = clear;
		window.exit = minimize;
        
        addOutput(
            'JavaScript Evaluator for GreaseMonkey (v' + VER + '); \u00A9 jimbobmcgee, 2011' + 
            (((new Date()).getFullYear() !== 2011) ? ('-' + (new Date()).getFullYear()) : '') +
            '\nPress \'?\' for help...',
            { color:'#0000ff' }
        );
    };
    
    buildConsole();
    minimize();
}