// ==UserScript==
// @name           SCP Foundation: Add names to details pages
// @namespace      http://bonsaibudget.com/greasemonkey/scp-wiki/
// @description    Adds the descriptive names from the SCP series index page to the individual detail pages, and provides previous and next buttons to navigate through SCPs.
// @author         Katherine Semel
// @date           2011-09-02
// @version        2.1
// @include        /^http:\/\/scp-wiki\.wikidot\.com\/scp-[0-9]*/
// @include        /^http:\/\/www\.scp-wiki\.net\/scp-[0-9]*/
// ==/UserScript==

function addScripts(pageContent) {
    // Add the scripts
    var pageContent = pageContent;

    var script = document.createElement("script");
    script.type = 'text/javascript';
    script.textContent  = updateSCPDisplay.toString();
    script.textContent += getSCPname.toString();
    script.textContent += padnumberwithzeros.toString();
    document.head.appendChild(script);
}

function padnumberwithzeros(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function getSCPname(findSCP, pageContent) {
    var newtitle = '';
    // Grab the text following the /scp-000 reference...
    // ...up to the end of the LI
    // Title is between those indexes

    var startlink = pageContent.indexOf(findSCP);
    if (startlink > 0) {
        var endlink = pageContent.indexOf('</li>', startlink);
        var newtitle = pageContent.substring(startlink+findSCP.length+2, endlink);
        // Do a little cleanup
        newtitle = newtitle.replace('</a>','');
        newtitle = newtitle.replace(' - ',': ');
    }
    return newtitle;
}

function updateSCPDisplay(pageContent, scpDomain) {
    // Parse the page for the url of the page we are currently on
    var currentSCP = document.location.href;
    currentSCP = padnumberwithzeros(currentSCP.replace('http://'+scpDomain+'/scp-',''));

    // we should have a /scp-000 reference number now

    // Get the next and previous SCPs from the current
    var nextSCP = parseInt(currentSCP, 10) + 1;
        nextSCP = padnumberwithzeros(nextSCP, 3);
    var previousSCP = parseInt(currentSCP, 10) - 1;
        previousSCP = padnumberwithzeros(previousSCP, 3);

    // Get titles for current, next and previous SCPs
    var currentSCPtitle = getSCPname('/scp-' + currentSCP, pageContent);
    var nextSCPtitle = getSCPname('/scp-' + nextSCP, pageContent);
    var previousSCPtitle = getSCPname('/scp-' + previousSCP, pageContent);

    // Replace the <title>
    document.title = 'The SCP Foundation: ' + currentSCPtitle;

    // Replace the page-title with the cleaned up contents
    document.getElementById('page-title').innerHTML = currentSCPtitle;

    // Add Next and Previous Links
    var nextSCPlink = '<a href="http://'+scpDomain+'/scp-' + previousSCP + '">' + previousSCPtitle + '</a>';
    var previousSCPlink = '<a href="http://'+scpDomain+'/scp-' + nextSCP + '">' + nextSCPtitle + '</a>';

    var script = document.createElement("div");
    script.setAttribute('style', 'width:100%;height:35px;');
    script.innerHTML = '<div style="float:left">&laquo;&nbsp;' + nextSCPlink + '</div><div style="float:right">' + previousSCPlink + '&nbsp;&raquo;</div>';

    document.getElementById('page-title').parentNode.insertBefore(script, document.getElementById('page-title').nextSibling);
}

// Get the contents of the index page
var currentSCP = document.location.href;
if (currentSCP.indexOf('wikidot') > 0) {
    var scpDomain = 'scp-wiki.wikidot.com';
} else {
    var scpDomain = 'www.scp-wiki.net';
}

var currentSCP = document.location.href;
currentSCP = padnumberwithzeros(currentSCP.replace('http://'+scpDomain+'/scp-',''));
var increment = '';
if (currentSCP > 999){
    var increment = '-2';
}

GM_xmlhttpRequest({
    method: "GET",
    url: "http://"+scpDomain+"/scp-series"+increment,
    onload: function(response) {
        // Add our scripts to the head
        addScripts();

        // Run the updates
        updateSCPDisplay(response.responseText, scpDomain);
    }
});