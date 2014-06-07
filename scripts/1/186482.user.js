// ==UserScript==
// @name        Jenkins colored console
// @namespace   http://www.sapo.pt/
// @description Parses the build log output
// @include     http://*/job/*/console*
// @version     2
// @grant       none
// ==/UserScript==

addGlobalStyle(
    ".console-minor { color: #666 }" +
    ".console-normal { color: #000 }" +
    ".console-important { color: #08C }" +
    ".console-warning { color: #F0F }" +
    ".console-success { color: #080 }" +
    ".console-error { color: #F00 }"
);

var timer = setInterval(parse_console_blocks, 200);

var foundBlocksTimeout = 10;

var patterns = [
    { important: / 0 (Warning|Error)/ },
    { error: /\d Error/ },
    { warning: /\d Warning/ },
    
    { error: /FAILED/ },
    { error: / error / },
    { error: /^ERROR:/ },
    
    { important: /^Build started/ },
    { normal: /^\s*\d+&gt;/ },
    
    { success: /^Passed/ },
    { error: /^Failed/ },
    { error: /[^0] failed/ },
    { success: / 0 failed/ },
    { warning: /\[SKIP\]/ },
    
    { important: /xUnit\.net console test runner/ },
    { important: /Test Execution Command Line Tool/ },
    { important: /Build Engine/ },
    
    { success: /Build succeeded/ },
    { success: /Finished: SUCCESS/ }
];

function parse_console_blocks() {
    var consoleBlocks = $$("pre.console-output:not(.parsed), #out pre:not(.parsed)");
    
    var foundBlocks = consoleBlocks.length > 0;
    if(foundBlocks) {
        foundBlocksTimeout = 20;
    } else if(--foundBlocksTimeout <= 0) {
        //clearInterval(timer);
    }
    
    consoleBlocks.forEach(parse_console_block);
    
    function parse_console_block(block) {
        console.log("Processing text block", block);
        Element.addClassName(block, "parsed");
        
        var lines = block.innerHTML.split("\n");
        
        var html = [];
        
        var currentLine = 0;

        parse_block_chunk();

        function parse_block_chunk() {
            for(var i = 0; i < 20; ++i, ++currentLine) {
                if(currentLine >= lines.length) {
                    block.innerHTML = html.join("");
                    return;
                }

                var line = lines[currentLine];
                var cssClass = select_class(line);

                var indentMatch = /^(\s*)(.*)/.exec(line);
                
                html.push(
                    "<div class='console-" +
                    cssClass +
                    "' style='padding-left: " +
                    indentMatch[1].length +
                    "ex'>" +
                    indentMatch[2] +
                    "</div>");
            }
            
            setTimeout(parse_block_chunk, 0);
        }
    }
    
    function select_class(line) {
        for(var i = 0; i < patterns.length; ++i) {
            for(var type in patterns[i]) {
                var pattern = patterns[i][type];
                if(pattern.test(line)) {
                    return type;
                }
            }
        }
        return "minor";
    }
}

function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
