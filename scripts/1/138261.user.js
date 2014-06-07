// ==UserScript==
// @name Github Expand Diff
// @description A user/Greasemonkey script for Chrome and Firefox that allows you to expand the missing lines in a Github diff.
// @match https://github.com/*/commit/*
// @match https://github.com/*/pull/*
// @match https://github.com/*/compare/*
// @version 1.5
// ==/UserScript==

(function () {
    var codeGaps = findCodeGaps(), // Array of missing code meta objects
        fileDoms = {}, // Cache of fetched full files
        parseNode = createParseNode(), // Hidden DOM element used for parsing fetched file DOM
        LOADING_HTML = '<span style="font-size: 1.6em">&#8987;</span> Loading...';

    // Every code gap gets a click listener
    for (var i=0; i<codeGaps.length; ++i) {
        bindClick(codeGaps[i]);
    }

    /**
     * Creates a hidden DOM node for parsing the file view HTML
     * @returns {HTMLElement}
     */
    function createParseNode () {
        var parseNode = document.createElement('span');
        parseNode.style.display = 'none';
        parseNode.id = 'gde-parseNode';
        return parseNode;
    }

    /**
     * Finds the missing lines of code and returns an array of code gap meta objects
     * @returns {Array}
     */
    function findCodeGaps () {
        var codeGaps = [],
            files = getFileNodes();

        for (var i=0; i<files.length; ++i) {
            var fileLine = 0,
                lines = getLineNodes(files[i]),
                fileUrl = getFileUrl(files[i]),
                lastLineNode = createLastLineNode(files[i]);

            for (var j=0; j<lines.length; ++j) {
                var lineNumber = getLineNumber(lines[j]);
                if ('...' === lineNumber) {
                    var nextLineNumber = getLineNumber(lines[j+1]);

                    codeGaps.push({
                        lineNode: lines[j],
                        startLine: fileLine + 1,
                        endLine: parseInt(nextLineNumber, 10) - 1,
                        fileUrl: fileUrl
                    });
                } else {
                    fileLine = parseInt(lineNumber, 10);
                }
            }
            var tbodies = files[i].getElementsByTagName('tbody');
            if (tbodies && tbodies.length) {
                tbodies[0].appendChild(lastLineNode);
                codeGaps.push({
                    lineNode: lastLineNode,
                    startLine: fileLine + 1,
                    fileUrl: fileUrl
                });
            }
        }
        return codeGaps;
    }

    /**
     * Returns an array of file nodes on the page
     * @returns {Array}
     */
    function getFileNodes () {
        var fileNodes = [],
            filesNode = document.getElementById('files');
        if (filesNode) {
            fileNodes = filesNode.getElementsByClassName('file');
        }
        return fileNodes;
    }

    /**
     * Given a file node, returns all of the file's line nodes
     * @param fileNode
     * @returns {NodeList}
     */
    function getLineNodes (fileNode) {
        var lines = fileNode.getElementsByTagName('tr');
        return lines;
    }

    /**
     * Returns the url of the "View file" button link
     * @param fileNode
     * @returns {*}
     */
    function getFileUrl (fileNode) {
        var metaNodes = fileNode.getElementsByClassName('meta'),
            miniButtonNodes;

        if (!metaNodes) {
            return null;
        }

        miniButtonNodes = metaNodes[0].getElementsByClassName('minibutton');

        if (!miniButtonNodes) {
            return null;
        }

        /**
         * Find the last minibutton, so that extra buttons added to the start (such as
         * the "Open in GitHub for Mac" button) are not fetched by accident instead.
         */
        return miniButtonNodes[miniButtonNodes.length - 1].href;
    }

    /**
     * Injects a code gap after the final line of code in the diff view so that we can
     * expand the last lines of the file
     * @returns {HTMLElement}
     */
    function createLastLineNode () {
        var lastLineNode = document.createElement('tr');
        lastLineNode.setAttribute('class', 'file-diff-line gc');
        lastLineNode.innerHTML = '<td class="diff-line-num" data-line-number="..."><span class="line-num-content">...</span></td><td class="diff-line-num" data-line-number="..."><span class="line-num-content">...</span></td><td class="diff-line-code"></td>';
        return lastLineNode;
    }

    /**
     * Given a line node, returns the line number
     * @param lineNode
     * @returns {*}
     */
    function getLineNumber (lineNode) {
        var lineNumbers;

        if (!lineNode) {
            return null;
        }

        lineNumbers = lineNode.getElementsByTagName('td');
        if (lineNumbers && lineNumbers.length === 3) {
            if (lineNumbers[1].children[0]) {
                return lineNumbers[1].children[0].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
            } else {
                // Legacy
                return lineNumbers[1].firstChild.nodeValue.replace(/^\s+|\s+$/g, '')
            }
        }

        return null;
    }

    /**
     * Binds a click event to a code gap to expand the missing lines
     * @param codeGap
     */
    function bindClick (codeGap) {
        codeGap.lineNode.onclick = function (e) {
            var code,
                codeNode = codeGap.lineNode.getElementsByClassName('diff-line-code')[0];
            if (!codeNode) {
                // Legacy
                codeNode = codeGap.lineNode.getElementsByClassName('line')[0];
            }
            e.preventDefault();
            e.stopPropagation();

            if (codeGap.open) {
                codeNode.innerHTML = codeGap.oldLine;
                codeGap.open = false;
            } else {
                codeGap.oldLine = codeNode.innerHTML;
                codeNode.innerHTML = LOADING_HTML;
                getCode(codeGap, function (code) {
                    codeNode.innerHTML = codeGap.newLine = code;
                });
                codeGap.open = true;
            }
        };
    }

    /**
     * Fetches and parses the full file contents and returns the missing lines of code
     * @param codeGap
     * @param cb
     */
    function getCode (codeGap, cb) {
        if (!fileDoms[codeGap.fileUrl]) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (4 === xhr.readyState) {
                    var response = xhr.responseText.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
                    fileDoms[codeGap.fileUrl] = response;
                    cb(parseDom(codeGap, fileDoms[codeGap.fileUrl]));
                }
            };
            xhr.open('GET', codeGap.fileUrl, true);
            xhr.send();
        } else {
            cb(parseDom(codeGap, fileDoms[codeGap.fileUrl]));
        }
    }

    /**
     * Given a code gap and a DOM node of the full file contents, returns the missing lines
     * of code
     * @param codeGap
     * @param dom
     * @returns {string}
     */
    function parseDom (codeGap, dom) {
        var code = '',
            domParseNode;

        parseNode.innerHTML = dom;
        domParseNode = document.body.appendChild(parseNode);
        if (undefined === codeGap.endLine) {
            var lastLineRegex = /([0-9]*) lines \(([0-9]*) sloc\)/i,
                file = domParseNode.getElementsByClassName('file')[0],
                metaNode = file.getElementsByClassName('meta')[0];
            codeGap.endLine = metaNode.innerHTML.match(lastLineRegex)[1];
        }
        for (var i=codeGap.startLine; i<=codeGap.endLine; ++i) {
            var lineNode = document.getElementById('LC' + i),
                line = lineNode ? lineNode.innerHTML : '';
            code += '<div class="diff-line-code"><pre>' + line + '</pre></div>\n';
        }
        document.body.removeChild(domParseNode);
        parseNode.innerHTML = '';
        return code;
    }
})();