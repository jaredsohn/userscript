// ==UserScript==
// @id              google_keys_extended@google.com
// @name            Google Keys Extended
// @namespace       http://dango-akachan.appspot.com
// @description     Use VIM-like keys to browse Google.
// @author          tuantuan <dangoakachan@gmail.com>
// @homepage        http://dango-akachan.appspot.com
// @include         http://www.google.*/search*
// @include         https://www.ggssl.com/search*
// @version         2.0
// ==/UserScript==

(function() {
    /* Config Options */
    var tabMode = true; // Open in new tab by default, only support Firefox.
    var hideSidebar = false; // Don't hide sidebar by default.
    var delayTime = 300; // Delay time between key pressed down.

    /* Private Variables */
    var resultNodes = new Array();
    var selectedResult = -1;
    var timer = null;
    var key = "";
    var keyTables = {
        "KEY_QMARK": 63,
        "KEY_H": 72,
        "KEY_J": 74,
        "KEY_K": 75,
        "KEY_L": 76,
        "KEY_E": 69,
        "KEY_T": 84,
        "KEY_S": 83,
        "KEY_ESC": 27,
        "KEY_ENTER":13,
        "KEY_O": 79,
        "KEY_0": 48,
        "KEY_9": 57,
    };

    /* Utility Functions Start */

    // Using XPath
    function xpath(expr, root)
    {
        return document.evaluate(
                expr, 
                root || document, 
                null, 
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);
    }

    function x0(expr, root)
    {
        var x = xpath(expr, root);

        return x ? x.snapshotItem(0) : null;
    }

    /* Determine whether the element is assigned the given class */
    function hasClass(elem, cls)
    {
        return elem.className.match(
            new RegExp("(?:\\s|^)"+cls+"(?:\\s|$)"));
    }

    /* Add class to the element */
    function addClass(elem, cls)
    {
        if (!hasClass(elem, cls))
            elem.className += " " + cls;
    }

    /* Remove class from the element */
    function removeClass(elem, cls)
    {
        if (hasClass(elem, cls))
            elem.className = elem.className.replace(
                new RegExp("(?:\\s|^)"+cls+"(?:\\s|$)"), " ");
    }

    /* Add or remove class to from the element */
    function toggleClass(elem, cls)
    {
        if (hasClass(elem, cls))
            elem.className = elem.className.replace(
                new RegExp("(?:\\s|^)"+cls+"(?:\\s|$)"), " ");
        else
            elem.className += " " + cls;
    }

    /* Add customized css to current page */
    function addStyle(css)
    {
        if (typeof GM_addStyle !== "undefined")
            GM_addStyle(css);
        else {
            var head = document.getElementsByTagName("head")[0];
            var style = document.createElement("style");

            style.type = "text/css";
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    /* Open link in current or new tab */
    function openLink(aelem, flag)
    {
        if (flag && typeof GM_openInTab !== "undefined")
            GM_openInTab(aelem.href);
        else
            location.href = aelem.href;
    }

    /* Utility Functions End */

    /* Result Class Start */
    function Result(resultNode, resultUrl, resultCache)
    {
        this.resultNode = resultNode;
        this.resultUrl = resultUrl;
    }

    /* Prototype */
    Result.prototype.focus = function() {
        offsetTop = this.resultNode.offsetTop;

        if (window.pageYOffset+250 > offsetTop
            || window.pageYOffset+window.innerHeight < offsetTop+250)
            window.scrollTo(0, offsetTop - window.innerHeight/2); 
        
        addClass(this.resultNode, "focus");
    };

    Result.prototype.blur = function() {
        removeClass(this.resultNode, "focus");
    };

    /* Result Class End */

    /* Event Handler Start */

    /* Combined num keys */
    function checkKey(keyCode)
    {
        if (!keyCode) {
            var nr = parseInt(key);
            key = ""

            if (nr > resultNodes.length ||
                nr-1 == selectedResult)
                return;

            if (selectedResult != -1) 
               resultNodes[selectedResult].blur(); 

            selectedResult = nr - 1;
            resultNodes[selectedResult].focus();

            return;
        }

        key += String.fromCharCode(keyCode);
        timer = setTimeout(function() { checkKey(null); }, delayTime);
    }

    /* Shortcut keys handler */
    function keydownHandler(evt)
    {
        var keyCode = evt.keyCode || evt.which || evt.charCode;

        if (evt.target.tagName == "INPUT" && evt.target.name == "q") {
            if (evt.keyCode == keyTables.KEY_ESC)
                evt.target.blur();
            
            return;
        }

        if (keyCode >= keyTables.KEY_0 && keyCode <= keyTables.KEY_9) {  // 0,1,2...9
            if (timer) clearTimeout(timer);
            checkKey(keyCode);
        }

        switch (keyCode) {
            case keyTables.KEY_H: // Go to previous page
                prevNode = xpath("//td[@class='b'][1]/a");

                if (prevNode.snapshotLength != 0)
                    document.location = prevNode.snapshotItem(0).href;

                break;
            case keyTables.KEY_J: // Go to next result
                if (selectedResult != -1)
                   resultNodes[selectedResult].blur(); 

                if (selectedResult >= resultNodes.length-1)
                    selectedResult = 0;
                else 
                    selectedResult++;			

                resultNodes[selectedResult].focus();

                break;
            case keyTables.KEY_K: // Go to previous result
                if (selectedResult != -1)
                   resultNodes[selectedResult].blur(); 

                if (selectedResult <= 0)
                    selectedResult = resultNodes.length - 1;
                else 
                    selectedResult--;			

                resultNodes[selectedResult].focus();

                break;
            case keyTables.KEY_L: // Go to next page
                nextNode = xpath("//td[@class='b'][2]/a");

                if (nextNode.snapshotLength != 0)
                    document.location = nextNode.snapshotItem(0).href;

                break;
            case keyTables.KEY_E: // edit search string
                window.scrollTo(0, 0);
                x0("//input[@type='text' and @name='q']").focus();

                break;
            case keyTables.KEY_T: // Toggle tabMode 
                tabMode = !tabMode; 
                var nodes = xpath("//span[@class='gke_nr']"); 
                
                for (var i = 0, len=nodes.snapshotLength; i < len; i++)
                    nodes.snapshotItem(i).style.backgroundColor = tabMode?"#0E38DA":"#0CAE1A";

                break;
            case keyTables.KEY_S: // Toggle sidebar
                toggleSidebar();
                break;
            case keyTables.KEY_ENTER: // Open the selected result
            case keyTables.KEY_O:
                if (selectedResult != -1)
                    openLink(resultNodes[selectedResult].resultUrl, tabMode);

                break;
            case keyTables.KEY_ESC: // Quit help
                hideHelp()
                break;
            default:
                return;
        }

        evt.preventDefault();
    }

    /* Another shortcut keys handler */
    function keypressHandler(evt)
    {
        var keyCode = evt.keyCode || evt.which || evt.charCode;

        if (evt.target.tagName == "INPUT" && evt.target.name == "q")
            return;

        if (keyCode == keyTables.KEY_QMARK) {
            showHelp();
            evt.preventDefault();
        }
    }

    /* Event Handler End */

    /* Toggle show left sidebar */
    function toggleSidebar()
    {
        var sidebar = document.getElementById("leftnav");
        toggleClass(sidebar, "hidden");
    }

    /* Hide help information */
    function hideHelp()
    {
        var help = document.getElementById("gke_help");
       
        if (!help)
            return;

        addClass(help, "hidden");
    }

    /* Show help information */
    function showHelp()
    {
        var help = document.getElementById("gke_help");

        if (!help) {
            help = document.createElement("div");
            document.body.appendChild(help);

            help.id = "gke_help";
            help.className = "gke_help";
            help.innerHTML = "\
                <div title='Press ESC to quit' style='padding:1em' tabindex='-1'> \
                <table class='title'><tbody><tr><td class='ltd'>Google Keys Extended Help</td> \
                <td class='rtd'><a href='http://userscripts.org/scripts/show/77817' class='a1'>Homepage</a> | \
                <a class='a1' href='mailto:dangoakachan@gmail.com'>Contact me</a></td></tr> \
                </tbody></table><table class='content'><tbody> \
                <tr><td class='key'>0,1,2...9:</td><td class='use'>Jump to specified result.<td></td></tr> \
                <tr><td class='key'>enter/o:</td><td class='use'>Open selected result in current or new tab.<td></td></tr> \
                <tr><td class='key'>?/esc:</td><td class='use'>Show or hide help information.<td></td></tr> \
                <tr><td class='key'>esc:</td><td class='use'>Leave the search box.<td></td></tr> \
                <tr><td class='key'>j,k:</td><td class='use'>Go to next/previous result.<td></td></tr> \
                <tr><td class='key'>h,l:</td><td class='use'>Go to next/previous page.<td></td></tr> \
                <tr><td class='key'>t:</td><td class='use'>Toggle tab mode, open in current or new tab.<td></td></tr> \
                <tr><td class='key'>e:</td><td class='use'>Focus the search box.<td></td></tr> \
                <tr><td class='key'>s:</td><td class='use'>Show or hide sidebar.<td></td></tr> \
                </tbody></table></div>";
        } else
            removeClass(help, "hidden");
    }

    /* Initialize */
    function init()
    {
        var nr, resultNode, resultUrl, index, h3;
        var resNodes = xpath("//div[@id='res']//li[@class='g'" + 
            " or @class='g w0']");

        for (var i = 0, len = resNodes.snapshotLength; i < len; i++) {
            nr = (i+1) % (len+1);
            resultNode = resNodes.snapshotItem(i);
            resultUrl = x0("*//a", resultNode);

            resultNode.innerHTML = resultNode.innerHTML.replace(
                    /(<h3 class="r")/, 
                    "<span class='gke_nr'>"+nr+"</span>$1");

            resultNodes.push(new Result(resultNode, resultUrl));
        }

        /* Add CSS */
        addStyle(<r><![CDATA[
            .focus {
                padding: 5px;
                opacity: 0.8;
                border-radius: 5px;
                background-color: #d3e1f9;
                margin-left: -5px;
            }

            .hidden {
                display: none;
            }
        
            .gke_nr {
                color: #ffffff;
                background-color: #0E38DA;
                padding: 0 5px;
                margin-right: 3px;
            }

            .gke_help {
                position: fixed;
                top: 30%;
                left: 30%;
                width: 40%;
                opacity: 0.95;
                z-index: 100;
                color: #ffffff;
                font-weight: bold;
                background: none;
                -moz-border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAvCAYAAABAHIylAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAUlSURBVHja7JtPaBRXHMc/781OdnXNqinVlphK4iJoQWiLGIjgLV6UEBFLEcFzLr0JihdB8OjNkwdBWCkKIejFXIKYQkR6CS2Gsv5rjE0sSN11kzWz814P+ya+vMxGL4Xdzfzgx7x9O4edD9/fmzfz+67QWrNeCCGEO9Vg3MyhG4zRnwAg4r53oAgniRm3AhwdM7bnYmGtAWTBiSBI6yiduWaH5AJR1lE5czoO0ipAFhwbhGeltI4upGZWkA0ltI6h9Tk6ZxWkFUAOnChTVmaAHcBWIAukY8qtWeEAfAAqwDvgDVAFalYqK1cgCa11HBzPQPGBDuBrz/P6BgcH1aFDh6pHjx4t9/f3V2mhmJqayty/f7/z0aNHmfHxcRmG4TPgb2AZCAyk0IVkAxKOajqMSvbm8/kdV65c+efkyZNl2iDu3LnTef78+S+LxeIb4E+jrmVHTdoFFCknUk0G6NmzZ09vsVgsAoyMjBwYHx8fLpVKfUEQdLUSFN/33+ZyuWeDg4Oj165dmwbI5/P5p0+fPgdmTclFagoBpbXW9u3bs5STAbZ6nvdDoVCYP3XqVOnw4cM/Pnny5KdUKrUspQyFELqVAGmthVLKq9VqHfv27bs1OTn5S6FQyJ0+ffor4DezNlUtJYWA9pxbuG/KKgPsPnHiRPrSpUsLIyMjByYmJn5Op9NLUkq1du/Y/CGEQEqpPM+rzc/Pf//69evfz507Nzs9Pb1lZmYmBZSchVoDWlp3IumoqGtgYKAMcO/evTO+739oNdU0AKV93/8wNjZ2BmBgYKACbDfXnLK2MQJnL+MC6jx+/HgJoFKp9EgpQ9okpJRhuVzeDTA0NPQOyK0HCKfMIkjpfD4fACilsu2gHltFSqmsWaiDGDgrwpHOM5cNyGPjRCpOPa6ChLOL3kiAPOfahbsGxUESGwiQaPB8KaTzNB73amOjAIp7pYNc50XYRgS0hoUkifW3BAmCBFACKAGUAEoAJYASQAmgJBJACaD/F5DrgNAbiIOmgQNEOhO24yGcmZnpAJBSVkyLqG2e3oUQSwAvXrzwWW1gsFkgiXdAKKA6Nja2DSCbzc4qpdrmDWMYhl4ul3sOUCgUvgAWcdo9ERPZAI4C3k9OTnYBHDt27GYQBOl2UJHWWgRBkB4aGroJ8PDhw+3UTQ0qDpLdOIwsLpFpQRSLxXxvb++7CxcuvLx7965eWFj4TgihTbYcGKVUKgiCzP79+2/dvn174vr1611Xr17tA54B71nbWVVuTz4DbAY6qdtcdu/atWvn7Ozsr7CqN58PgmBbKwHyff/fXC5XtHvzPT09A69evVoAXlJvPZdNuVUxjg+3L58GNlH3/+RM7u3u7s5evnz5j7Nnz75thzXoxo0bXRcvXvx2bm6uQt3dUTJZAZaouz1qQOh2VSPjwiZgi1FSJ9Atpfymv79/4eDBg2+Hh4ffHDlyZLGVoDx48GDz6OjojsePH3dNTU3tVEr9BcwZ1ZRNiS1ZZbZSYo3cHZsNpKzJLdQdZjnzXQfN7VN0787LpnxK1B1m741iKma8GLMG6ZTWOlpwI99ezZwkrW2AMvNVPrZpU6ztqzUroOj3R9dWNWpZdFRju8z05zrMMlZ2NADU7B5FF1AEKcrPcphBY49ilL5J2/XaKgqKHK2ByWUr1/coRntvB5LrcvX52OC3e9nQ/D5p5UCqWVA+7XI1+wRqtVrik6aBT9r3fQAbUuK0jwPkQLJBbez/atiA7HBguUDa/t8+/w0Aop+YsD/C4DEAAAAASUVORK5CYII=") 13 13 15 / 14px 13px 15px repeat stretch;
            }

            .gke_help .title {
                width: 100%;
                font-size: 16px;
                padding-bottom: 10px;
            }

            .gke_help .content {
                width: 100%;
                font-size: 14px;
                border-top: 1px solid #999999;
                padding: 10px 10px 0px 10px;
            }
            
            .gke_help .ltd {
                text-align: left;
                font-size: 100%;
            }

            .gke_help .rtd {
                text-align: right;
            }

            .gke_help .a1,
            .gke_help .a1 visited,
            .gke_help .a1 hover {
                color: #349ABF !important;
                cursor: pointer;
                text-decoration: underline;
            }

            .gke_help .key {
                padding: 0.15em 1em;
                font-weight: bold;
                color: #F29603;
                text-align: right;
                width: 20%;
            }

            .gke_help .use {
                padding: 0.15em 1em;
                font-weight: normal;
                text-align: left;
            }
        ]]></r>.toString());

        if (hideSidebar)
            toggleSidebar();
    }

    init();
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keypress", keypressHandler, false);
    document.body.addEventListener("click", hideHelp, false);
})();