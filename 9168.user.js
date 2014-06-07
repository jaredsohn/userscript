// FixForumHeader userscript by JD. http://jdk.phpkid.org

// ==UserScript==
// @name           FixJosForumHeader
// @namespace      JoS
// @description    Gives you control whether you want to see the (annoying, space wasting?) top header on the forum or not.
// @include        http://discuss.joelonsoftware.com/*
// ==/UserScript==

var userFriendlyDiv = document.createElement('div');
userFriendlyDiv.innerHTML = '<div style="border: 1px solid #0f0f0f; padding: 5px; background-color: #ccc">' +
                        '<a href="#" id="showHide">Show/Hide Main Bar</a>' +
                       '</div>';


var allTds;
allTds = document.evaluate(
    "//td[@class='discussSideBar']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


if(allTds.snapshotLength > 0)
{
    sidebar = allTds.snapshotItem(0).firstChild;
    if(sidebar)
        sidebar.parentNode.insertBefore(userFriendlyDiv, sidebar.nextSibling);
}

document.addEventListener('click', function(event) {

    if(event.target.id == "showHide")
    {
        toggle();
        event.stopPropagation();
        event.preventDefault();
    }

}, true);

///Setup is done.

//During page load, hide the main bar.
toggle();



function toggle()
{
    var divs = [ 'tbMain', 'tbTop'];

    for(var i=0; i < divs.length; i++)
    {
        var div = document.getElementById(divs[i]);
        if(div)
            div.style.display = (div.style.display == 'none') ? '' : 'none';
    }
}