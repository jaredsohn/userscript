// ==UserScript==
// @name            Baidu Keys Extended
// @namespace       lvtuantuan1988@gmail.com
// @description     Use VIM-like keys to browse baidu search and edit search keywords
// @include         http://www.baidu.com/s*
// @version         1.0.1
// ==/UserScript==

var keysEnable = true;
var replaceEnable = false;
var help = -1;
var searchBar = -1;
var selectedResult = -1;
var lastReplace = -1;
var resultNodes = new Array();
var tabMode = GM_getValue("tabMode");
var gotoMode = false;

function xpath(query)
{
    return document.evaluate(
            query, 
            document, 
            null, 
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
    );
}

// Class Result 
function Result(resultNode, resultUrl, resultCache)
{
    this.resultNode = resultNode;
    this.resultUrl = resultUrl;
    this.resultCache = resultCache;
}

// Go to this result, and also disable google tracking 
Result.prototype.browserTo = function(flag) {
    url = flag?this.resultUrl:this.resultCache;

    if (!url)
        return;

    if (!tabMode)
        document.location = url;
    else
        GM_openInTab(url);
} 

Result.prototype.focus = function() {
    offsetTop = this.resultNode.parentNode.parentNode.parentNode.offsetTop;

    if (window.pageYOffset+100 > offsetTop
     || window.pageYOffset+window.innerHeight < offsetTop+100) {
       window.scrollTo(0, offsetTop - window.innerHeight/2); 
    }
    
    this.resultNode.setAttribute("style", "padding:10px;-moz-border-radius: 10px;-moz-opacity:0.2;background-color:#D3e1f9;");
}

Result.prototype.blur = function() {
    this.resultNode.setAttribute("style", "padding-left:10px;");
}

function replace()
{
    keywords = searchBar.value;
    var space = new Array();
    space[0] = 0;
    cspace = 1;

    for (i = 0; i < keywords.length; i++) {
        if(keywords.charAt(i)==" " && keywords.charAt(i+1)!=" ") {
            space[cspace++]=i;
        }
    }

    space[cspace] = keywords.length;

	if (lastReplace+2 > space.length) 
        lastReplace = 0;
    if (lastReplace < 0)
        lastReplace = space.length - 2;

	start = space[lastReplace];
	end = space[lastReplace+1];

	while (keywords.charAt(start) == " " || keywords.charAt(start) == '"') {
		start++;
	}

	while (keywords.charAt(end-1) == " " || keywords.charAt(end-1) == '"') {
		end--;
	}

	searchBar.selectionStart=start;
	searchBar.selectionEnd=end;
}

function init() 
{
    // Disable shortcut in input
    inputs = xpath("//input[@name='wd']");

    for (i = 0; i < inputs.snapshotLength; i++) {
        if (searchBar == -1)
            searchBar = inputs.snapshotItem(i);

        inputs.snapshotItem(i).addEventListener("focus", function(evt){
            keysEnable = false;
        }, false);
    }

    //FIXME
    // Result nodes
    nodes = xpath("//td[@class='f']");

    for (i = 0; i < nodes.snapshotLength; i++) {
        if (i < 10) {
            nr = (i+1) % 10;
            numFont = document.createElement("font");
            numFont.id = "_nr";
            numFont.style.color="#ffffff";
            numFont.style.backgroundColor= tabMode?"#0CAE1A":"#0E38DA";
            numFont.style.padding = "0px 5px";
            numFont.style.marginRight = "3px";
            numFont.innerHTML = nr;

            resultNode = nodes.snapshotItem(i);
            
            res = resultNode.getElementsByTagName("a");
            resultCache = "";
            for (j = 0; j < res.length; j++) {
                url = res[j].href;
                if (j == 0)
                    resultUrl = url;

                if (url.indexOf("http://cache.baidu.com")==0)
                    resultCache = url;
            }

            resultNode.insertBefore(numFont, resultNode.firstChild);
            resultNode.setAttribute("style", "padding-left:10px;");
            resultNodes.push(new Result(resultNode, resultUrl, resultCache));
        }
    }
}

// Key table
const KEY_H = 72;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;

const KEY_R = 82;
const KEY_E = 69;
const KEY_A = 65;
const KEY_I = 73;
const KEY_T = 84;
const KEY_F = 70;
const KEY_B = 66;
const KEY_G = 71;
const KEY_C = 67;

const KEY_ENTER = 13;
function keydownHandler(evt)
{
    keyCode = evt.keyCode || evt.which || evt.charCode;

    if (replaceEnable) {
        if (keyCode == KEY_B) { // Go back a word
            lastReplace--;
            replace();
        } else if (keyCode == KEY_F) { // Go foward a word
            lastReplace++;
            replace();
        } else {
            searchBar.focus();
            replaceEnable = false;
        }

        return;
    }

    if (!keysEnable) {
        if (evt.target.tagName != "INPUT" || evt.target.name != "wd")
            searchBar.focus();

        return;
    }

    if (keyCode >= 48 && keyCode <=57) { //0,1,2,...9
        nr = (keyCode >= 49) ? keyCode-49 : 9;
        if (nr > resultNodes.length)
            return;

        if (selectedResult != -1)
           resultNodes[selectedResult].blur(); 

        selectedResult = nr; 
        resultNodes[selectedResult].focus();

        if (!gotoMode)
            resultNodes[selectedResult].browserTo(1);
    }

    if (evt.altKey == true && keyCode == KEY_A) { // Open all results
        for (nr in resultNodes)
            GM_openInTab(resultNodes[nr].resultUrl);

        return;
    }

    switch (keyCode) {
        case KEY_H: // Go to previous page
            prevNode = xpath("//div[@class='p']/a[1]/font");

            if (prevNode.snapshotLength != 0)
                document.location = prevNode.snapshotItem(0).parentNode.href;

            break;
        case KEY_J: // Go to next result
            if (selectedResult != -1)
               resultNodes[selectedResult].blur(); 

            if (selectedResult >= resultNodes.length-1)
                selectedResult = 0;
            else 
                selectedResult++;			

            resultNodes[selectedResult].focus();

            break;
        case KEY_K: // Go to previous result
            if (selectedResult != -1)
               resultNodes[selectedResult].blur(); 

            if (selectedResult <= 0)
                selectedResult = resultNodes.length - 1;
            else 
                selectedResult--;			

            resultNodes[selectedResult].focus();

            break;
        case KEY_L: // Go to next page
            nextNode = xpath("//div[@class='p']/a[last()]/font");

            if (nextNode.snapshotLength != 0)
                document.location = nextNode.snapshotItem(0).parentNode.href;
            break;
        case KEY_R: // replace
            window.scrollTo(0, 0);
            replaceEnable = true;
            lastReplace = 0;
            replace();

            break;
        case KEY_E: // edit search string
            window.scrollTo(0, 0);
            searchBar.selectionStart = 0;
            searchBar.selectionEnd = searchBar.value.length;
            keysEnable = false;

            break;
        case KEY_A: // append search keyword
            window.scrollTo(0, 0);
            searchBar.value += "  ";
            searchBar.selectionStart = searchBar.value.length - 1;
            searchBar.selectionEnd = searchBar.value.length;
            keysEnable = false;

            break;
        case KEY_I: // insert search keyword
            window.scrollTo(0, 0);
            searchBar.value = "  " + searchBar.value;
            searchBar.selectionStart = 0;
            searchBar.selectionEnd = 1;
            keysEnable = false;

            break;
        case KEY_C:
            if (selectedResult != -1)
                resultNodes[selectedResult].browserTo(0);

            break;
        case KEY_T: // Toggle tabMode 
            tabMode = !tabMode;
            GM_setValue("tabMode", tabMode);
            nodes = xpath("//*[@id='_nr']"); 
            
            for (i = 0; i < nodes.snapshotLength; i++)
                nodes.snapshotItem(i).style.backgroundColor = tabMode?"#0CAE1A":"#0E38DA";

            break;
        case KEY_G: // Goto result
            gotoMode = !gotoMode;
            nodes = xpath("//*[@id='_nr']"); 
            
            for (i = 0; i < nodes.snapshotLength; i++)
                nodes.snapshotItem(i).style.backgroundColor = gotoMode?"#EF9202":(tabMode?"#0CAE1A":"#0E38DA");

            break;
        case KEY_ENTER: // Open the selected result
            if (selectedResult != -1)
                resultNodes[selectedResult].browserTo(1);

            break;
    }
}

const KEY_QMARK = 63; // ? question-mark 

function keypressHandler(evt)
{
    keyCode = evt.keyCode || evt.which || evt.charCode;

    if (keyCode == KEY_QMARK) {
        if (help == -1) {
            help = document.createElement("div");
            document.body.appendChild(help);

            help.className = "help";
            help.innerHTML = "<div role='alert' style='padding:1em' tabindex='-1'>"
                + "<table class='title'><tbody><tr>"
                + "<td class='ltd'>Google Keys Extended Help</td>"
                + "<td class='rtd'><a href='http://userscripts.org/scripts/show/77878' class='a1'>Homepage</a> | <a href='mailto:lvtuantuan1988@gmail.com'>Contact me</a></td>"
                + "</tr></tbody></table><table class='content'><tbody>"
                + "<tr><td class='key'>j,k:</td><td class='use'>Go to next/previous result<td></td></tr>"
                + "<tr><td class='key'>h,l:</td><td class='use'>Go to next/previous page<td></td></tr>"
                + "<tr><td class='key'>enter:</td><td class='use'>Go to selected result<td></td></tr>"
                + "<tr><td class='key'>c:</td><td class='use'>Go to selected result's cache content<td></td></tr>"
                + "<tr><td class='key'>0,1,2...9:</td><td class='use'>Jump to result<td></td></tr>"
                + "<tr><td class='key'>t:</td><td class='use'>Tab mode, open in current/new tab<td></td></tr>"
                + "<tr><td class='key'>g:</td><td class='use'>Go to but not open result<td></td></tr>"
                + "<tr><td class='key'>e:</td><td class='use'>Edit/Erase the current search keywords<td></td></tr>"
                + "<tr><td class='key'>a:</td><td class='use'>Append search keyword to the current<td></td></tr>"
                + "<tr><td class='key'>i:</td><td class='use'>Insert search keyword to the current<td></td></tr>"
                + "<tr><td class='key'>r:</td><td class='use'>Replace mode, use f/b key to select keyword<td></td></tr>"
                + "<tr><td class='key'>?:</td><td class='use'>Show help info<td></td></tr>"
                + "<tr><td class='key'>alt+a:</td><td class='use'>Open all results<td></td></tr>"
                + "</tbody></table></div>";

            GM_addStyle("\
                div.help{\
                    -moz-border-radius:10px 10px 10px 10px;\
                    background:none repeat scroll 0 50% #000000;\
                    color:#FFFFFF;\
                    font-weight:bold;\
                    position:fixed;\
                    top:10%;\
                    left:30%;\
                    width:40%;\
                    opacity:0.85;\
                    z-index:100;\
                }\
                table.title{\
                    border-color: gray;\
                    width:100%;\
                    padding-bottom: 10px;\
                }\
                table.content{\
                    border-top: 1px solid #999999;\
                    border-color: gray;\
                    padding: 10px 10px 0px 10px;\
                    width:100%;\
                }\
                td.ltd{\
                    text-align:left;\
                    font-size: 100%;\
                }\
                td.rtd{\
                    text-align:right;\
                    color: #dddd00;\
                }\
                .a1{\
                    color:#dddd00;\
                    cursor:pointer;\
                    text-decoration:underline;\
                }\
                td.key{\
                    padding: 0.15em 1em;\
                    font-weight:bold;\
                    color:#dddd00;\
                    text-align:right;\
                    width:20%;\
                }\
                td.use{\
                    padding:0.15em 1em;\
                    font-weight:normal;\
                    text-align:left;\
                }\
           ");
        }
        help.style.visibility = "";
    }
}

window.addEventListener("load", init, false);
window.addEventListener("keydown", keydownHandler, false);
window.addEventListener("keypress", keypressHandler, false);

window.addEventListener("click", function(evt) {
    if (evt.target.tagName != "INPUT" && evt.target.tagName != "A") {
        keysEnable = true;
        replaceEnable = false;

		if(help!=-1) {
			help.style.visibility="hidden";
		}
    }
}, false);

