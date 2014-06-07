// ==UserScript==
// @name           Prep MediaWiki Page for Word
// @description    This script modifies the "printable version" view of a MediaWiki wiki page (such as a Wikipedia article)  so that you can paste it cleanly into a Word template. When in printable view, press Ctrl+A (select all) and copy the page and paste it directly into Word.  
// @include        *printable=yes
// @version        0.0.4
// @copyright     2009, Will Findlay 
// ==/UserScript==

//Get rid of all the extra stuff Word doesn't need by searching for specific classes and ids and deleting them. It also deletes all javascript from the page.
//This script doesn't just hide items you don't want to display, it actually removes them completely from the HTML. This makes it easier for Word to import the content.

//Get rid of all [Edit] links
notes = document.evaluate("//*[@class='editsection']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of Wikipedia notices
notes = document.evaluate("//*[@class='siteNoticeUser notice-wrapper-licensingschol']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}


//Get rid of the Table of Contents
notes = document.evaluate("//*[@class='toc']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of BreadCrumbsTrail
notes = document.evaluate("//*[@id='BreadCrumbsTrail']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of print footer
notes = document.evaluate("//*[@class='printfooter']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}


//Get rid of the portlet (side navigation)
notes = document.evaluate("//*[@class='portlet']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

notes = document.evaluate("//*[@class='generated-sidebar portlet']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of the regular footer
notes = document.evaluate("//*[@id='footer']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}


//Get rid of the jump to navigation
notes = document.evaluate("//*[@id='jump-to-nav']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of the site subtitle
notes = document.evaluate("//*[@id='siteSub']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of the site subtitle
notes = document.evaluate("//*[@id='contentSub']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of the title of the document
//notes = document.evaluate("//*[@class='firstHeading']",document,null,6,null);
//for(var i=notes.snapshotLength-1; i>=0; i--) {
//notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
//}

//Get rid of Category links
notes = document.evaluate("//*[@id='catlinks']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of the left column
notes = document.evaluate("//*[@id='column-one']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}

//Get rid of the javascript in the document
notes = document.evaluate("//*[@type='text/javascript']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
}


//Get rid of the Navigation frame at the bottom
//notes = document.evaluate("//*[@class='NavFrame']",document,null,6,null);
//for(var i=notes.snapshotLength-1; i>=0; i--) {
//notes.snapshotItem(i).parentNode.removeChild(notes.snapshotItem(i));
//}

//add color tag to span tag and remove the class item to fix Word's frustrating tendency to drop the color when pasting
//this is a special tag we use to designate something as an instructor note.
notes = document.evaluate("//*[@class='inst']",document,null,6,null);
for(var i=notes.snapshotLength-1; i>=0; i--) {
addcolor = notes.snapshotItem(i).setAttribute('style','background-color: rgb(0, 255, 255);');
removeclass = notes.snapshotItem(i).removeAttribute('class');
} 