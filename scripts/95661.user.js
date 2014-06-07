// ==UserScript==
// @name           Urban Dictionary Indexer
// @namespace      http://www.wurbo.com/
// @description    Indexes terms from Urban Dictionary
// @include        http://www.urbandictionary.com/browse.php?*
// @author         KnifeySpooney (http://www.spogg.com/knifeyspooney)
// ==/UserScript==


/** Init **/

var pages = "ABCDEFGHIJKLMNOPQRSTUVWXYZ*".split("");
var idx = 0; // index for character used
var pid = 0; // page number for section
var key = "&index=yes";

var console;
var counter;
var button;

var working = true;
var done = false;

// do not run script on xmlhttprequest'ed pages
if (new RegExp(key).test(document.location) === false) {
    if (document.body.className == "browse_controller")
        insertBar();
}

/** Indexing functions **/

function start() {
    var body = document.body;
    body.innerHTML = "";
    body.removeAttribute("class");
    body.style.textAlign = "center";
    body.style.padding = "0";
    body.style.backgroundColor = "white";
    
    counter = document.createElement("p");
    counter.style.fontSize = "1.3em";
    body.appendChild(counter);
    
    button = document.createElement("input");
    button.setAttribute("type", "button");
    button.value = "Pause";
    button.addEventListener("click", function(){toggleWorking();}, false);
    body.appendChild(button);
    
    var div = document.createElement("div");
    div.style.width = "800px";
    div.style.height = "600px";
    div.style.margin = "5px auto";
    
    console = document.createElement("textarea");
    console.style.width = "100%";
    console.style.height = "100%";
    
    div.appendChild(console);
    body.appendChild(div);
    
    requestNextPage();
}

function close() {
    document.body.removeChild(document.getElementById("_GM_bar"));
}

function load(page, num) {
    var seed = "&seed="+parseInt((new Date().getTime()) / 1000); //prevent caching
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.urbandictionary.com/browse.php?character='+page+'&page='+num+key+seed,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',
        },
        onload: function(responseDetails) {
            index(responseDetails.responseText);
            requestNextPage();
        }
    });
}

function requestNextPage() {
    if (working) {
        if (done) {
            pid = 0;
            idx++;
            if (idx >= pages.length) {
                alert("Indexing complete.");
                return; //quit
            }
        }
        if (idx < pages.length) {
            counter.innerHTML = "Searching page "+pages[idx]+pid;
            load(pages[idx], pid);
        }
    }
}

function index(html) { //searches all <a> tags for class="urbantip"
    html = html.substring(html.indexOf("<body"), html.indexOf("</html>")); //only want <body>
    var root = document.createElement("div");
    root.innerHTML = html;
    
    var storage = new Array();
    
    var a = root.getElementsByTagName("a");
    for (var i=0; i<a.length; i++) {
        if (/^urbantip$/i.test(a[i].className))
            storage.push(a[i].innerHTML);
    }
    done = (html.indexOf('disabled next_page') >= 0) ? true : false;
    
    console.value += "==== Page "+pages[idx]+pid+" ====\n";
    console.value += storage.join('\n').stripX()+'\n';
    pid++;
}

String.prototype.stripX = function() {
    return this.replace(/\&amp;/g, '&').replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');
}


/** Event handlers **/

function toggleWorking() {
    if (working) {
        working = false;
        button.value = "Resume";
    } else {
        working = true;
        button.value = "Pause";
        requestNextPage();
    }
}


/** Message bar **/

function insertBar() {
    // create a div on top of page with a button to start indexing
    var bar = document.createElement("div");
    bar.id = "_GM_bar";
    bar.style.position = "fixed";
    bar.style.backgroundColor = "rgba(255, 54, 54, 0.5)";
    bar.style.borderBottom = "1px solid rgba(0, 0, 0, 0.5)";
    bar.style.width = "100%";
    bar.style.top = "0px";
    bar.style.left = "0px";

    var box = document.createElement("div"); //holds message
    box.style.width = "600px";
    box.style.margin = "3px auto";
    bar.style.textAlign = "center";

    var elm = document.createElement("span"); //message
    elm.style.color = "white";
    elm.style.textShadow = "#000 0 0 3px";
    elm.style.fontWeight = "bold";
    elm.style.fontSize = "1.2em";
    elm.style.clear = "both";
    elm.innerHTML = "Would you like to begin indexing Urban Dictionary?";
    box.appendChild(elm);

    elm = document.createElement("input"); //accept button
    elm.setAttribute("type", "button");
    elm.setAttribute("value", "Start");
    elm.style.marginLeft = "10px";
    elm.addEventListener("click", function(){start();}, false);
    box.appendChild(elm);

    elm = document.createElement("input"); //close button
    elm.setAttribute("type", "button");
    elm.setAttribute("value", "Not now");
    elm.style.marginLeft = "3px";
    elm.addEventListener("click", function(){close();}, false);
    box.appendChild(elm);

    bar.appendChild(box);

    document.body.appendChild(bar);
}