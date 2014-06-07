// ==UserScript==
// @name          Nu Compact
// @namespace     http://www.cs.vu.nl/~mvermaat/
// @description   Remove pictures from frontpage stories keeping just links
// @include       http://www.nu.nl/
// ==/UserScript==


/*
    Nu Compact

    Version: 0.1, 2005-05-29

    http://www.cs.vu.nl/~mvermaat/greasemonkey

    Martijn Vermaat, mvermaat@cs.vu.nl


    Pictures added to stories on nu.nl have nothing to do with
    the stories most of the time. They occupy a lot of space
    and prevent me from having the entire frontpage in one
    screen.
    Nu Compact removes the pictures on the frontpage, by
    transforming stories with pictures to plain links.


    Nu Compact is Open Source and licensed under the new
    BSD License, found at:
    http://www.opensource.org/licenses/bsd-license.php
*/



/*
    Wrap the whole thing in an anonymous function to avoid
    nameclashes with existing Javascript.
*/
(function() {


function rewritePicturizedStories() {

    var stories, story, link, links, newLink, header;

    var sections = [
            {color: 'a9d9ff', title: 'Algemeen'},
            {color: 'ffbdbd', title: 'Economie'},
            {color: 'cac6f7', title: 'Internet'},
            {color: 'bde7bd', title: 'Sport'}
    ];

    // Find containers for picturized stories
    stories = document.evaluate("//tr[(@valign='top') or (@bgcolor='#ffbdbd') or " +
                                "(@bgcolor='#cac6f7') or (@bgcolor='#bde7bd')]",
                                document,
                                null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                null);

    for (var i = 0; i < stories.snapshotLength; i++) {

        story = stories.snapshotItem(i);

        // The link containing url and title of story
        link = document.evaluate(".//td[@valign]//a[@class='link']",
                                 story,
                                 null,
                                 XPathResult.FIRST_ORDERED_NODE_TYPE,
                                 null).singleNodeValue;

        // Placeholder for plain links to stories
        links = document.evaluate("./following::td/div",
                                  story,
                                  null,
                                  XPathResult.FIRST_ORDERED_NODE_TYPE,
                                  null).singleNodeValue;

        // Create new link container div
        newLink = document.createElement('div');

        // Ok, this is ugly
        newLink.innerHTML =
            '<b><img src="/img/pijl_trans.gif" border="0" alt="" width="4" height="9"' +
            ' hspace="4" vspace="0"> <a class="link" href="' + link.getAttribute('href') +
            '"> ' + link.firstChild.nodeValue + '</a></b><br>';

        // Add plain link for this story
        links.insertBefore(newLink, links.firstChild);

        // Empty original section for story (including the picture)
        while (story.firstChild) {
            story.removeChild(story.firstChild);
        }

        // Create a section header
        header = document.createElement('td');
        header.style.background = '#' + sections[i].color;
        header.style.width = '364px';
        header.appendChild(document.createTextNode(sections[i].title));

        // Place section header
        story.appendChild(header);

    }

}


rewritePicturizedStories();


/*
    End of wrapper function (see top of script).
*/
})();
