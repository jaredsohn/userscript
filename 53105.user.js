// ==UserScript==
// @name           Flic.kr Link
// @namespace      http://www.epyon-1.com/gm/
// @description    Add the Flic.kr Link just under stats
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

// Flic.kr Link
//
// flic.kr_link.user.js
// version 1.01
// 2009-07-03
//
//
/*

Like many of the little programs I write, I had a "problem" and wanted to solve it.
I wanted a convenient link on the photo page to cut and paste the short URL of FLickr Images.
Look at this URL for a nice photo my wife took:

http://www.flickr.com/photos/s_d/3665619548/

As a URL goes, not too bad, but suppose you wanted to insert the link in
Twitter or Facebook? It.s a little verbose.  Wouldn.t this be better?

http://flic.kr/p/6zVfZ3

Yep, I think so too and so does Flickr:
http://www.flickr.com/services/api/misc.urls.html#short
http://www.flickr.com/groups/api/discuss/72157616713786392/

This thread showed how to do it: http://www.flickr.com/groups/api/discuss/72157616713786392/

The FlickrBase58 function was written entirely
by 'Xenocryst @ Antares Scorpii'  http://www.flickr.com/people/antares/
Other than reformating, taken verbatim from link here
http://www.flickr.com/groups/api/discuss/72157616713786392/72157620673064673/

The Original way *I* wrote it was to retrieve the HTML, Parse it for
<link rev="canonical" type="text/html" href="http://flic.kr/p/6zVfZ3" >

And use that link. While fun, that's the wrong way to do it so I rewrote it to use
the function written by 'Xenocryst @ Antares Scorpii'  http://www.flickr.com/people/antares/

Stefan Dembowski
July 3rd, 2009

*/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flic.kr Link", and click Uninstall.
//
// --------------------------------------------------------------------
//
//
/////////////////////////////////////////////////////////////////////////////////////////////

//Simple Debug flag ("1" to turn on).
var SDMyDebug = 0;

var SDmyURL = new String();
SDmyURL = location.href;

SDAddTheLink(SDmyURL);


// ################################################################################
// ################################################################################

function SDAddTheLink(SDTheURL) {
    //

    var SDMyTempArray = new Array();
    var SDMyTempString = new String();


    /* NOTES: URL will be:
     http://www.flickr.com/photos/s_d/3664820893/
     http://www.flickr.com/photos/s_d/3664820893/in/photostream/
     http://flickr.com/photos/s_d/3664820893/
     http://flickr.com/photos/s_d/3664820893/in/photostream/
     */

    // Only want the first 6 elements from the split (Ugh. Should use RegEx but I'm lazy...)
    SDMyTempArray = SDTheURL.split("\/",6)
    var SDMyPhotoID = SDMyTempArray[5];

    SDMyTempString = SDMyTempArray.join("/");

    if(SDMyDebug) {
        console.log('Use of FlickrBase58 : http://flic.kr/p/'+FlickrBase58(SDMyPhotoID));
    } // End of if(SDMyDebug) {

    // Get the Element that we will place the link after
    var SDmyElement, newElement;
    SDmyElement = document.getElementById('moderation');

    // If the Element we want to insert the link before does not exist, don't proceed
    if (SDmyElement) {

        var myTempString = 'http://flic.kr/p/'+FlickrBase58(SDMyPhotoID);

        var myDiv = document.createElement('div');
        // myDiv.style.fontSize = 'smaller';
        // myDiv.style.fontSize = 'smaller';
        var myLink = document.createElement('a');
        myLink.setAttribute('href',myTempString);
        myLink.setAttribute('title',myTempString);
        myLink.appendChild(document.createTextNode(myTempString));


        myDiv.appendChild(document.createTextNode("The Flic.kr link: "));
        myDiv.appendChild(myLink);


        // Insert Just After 'moderation' div 'thetags' (Yes, Link and the text)
        SDmyElement.parentNode.insertBefore(myDiv, SDmyElement.nextSibling);

/*
        // Works but not best way and not compliant. Thanks to XA for tip. ;)
        var myTempString = new String();
        myTempString = 'http://flic.kr/p/'+FlickrBase58(SDMyPhotoID);

        var myLink = document.createElement('a');
        myLink.setAttribute('href',myTempString);
        myLink.setAttribute('text',myTempString);
        myLink.appendChild(document.createTextNode(myTempString));


        var myText = document.createElement('text');
        myText.appendChild(document.createTextNode("The Flic.kr link is: "));


        // Insert Just After 'moderation' div 'thetags' (Yes, Link and the text)
        SDmyElement.parentNode.insertBefore(myLink, SDmyElement.nextSibling);
        SDmyElement.parentNode.insertBefore(myText, SDmyElement.nextSibling);
*/

    } // End of if (SDmyElement) {

} // End of function SDAddTheLink() {

// ########################################################################

function FlickrBase58(num) {
    // Function written entirely by 'Xenocryst @ Antares Scorpii'  http://www.flickr.com/people/antares/
    // Other than reformating, taken verbatim from link here
    // http://www.flickr.com/groups/api/discuss/72157616713786392/72157620673064673/

    if(typeof num !== 'number') {
        num=parseInt(num);
    }

    var enc='', alpha='123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
    var div=num,mod;

    while(num>=58) {
        div=num/58;
        mod=num-(58*Math.floor(div));
        enc=''+alpha.substr(mod,1)+enc;
        num=Math.floor(div);
    } // while(num>=58) {

    return(div)?''+alpha.substr(div,1)+enc:enc;
} // End of function FlickrBase58(num) {


// ########################################################################


