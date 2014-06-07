/*

TradeMe PhotoView Redux


//Shows thumbnails for all listings in TradeMe

 Version 0.23 (27 April 2014)
 Author: tbird81 / JimBob Baggins
 Licence: Will be free to edit as you choose, but i'd like to sort it out a bit first
 Gui: {333eb056-63c4-4e4b-9589-85a0d46d22b0}

// Future improvements
For me to think about:
	- DieNicelies for GM functions.
	- Convert to normal xmlhttprequest
	- More resilience
Fix the pop ups since TradeMe's changes.

// Risks
Risks of using this software:
	- Your incoming traffic may slightly increase because more pictures are loaded.
	- This software may slow down the loading of TradeMe listings pages.
	- You might forget that other people don't have this script, so may under-promote your auction.
	- TradeMe may change its site without notice, rendering this script useless.

Changes:
	- v0.23 Open homes bug fixed.
	- v0.22 Big Zooms!  
	- v0.21 TM Server change...    
	- v0.20 Chrome's GM_xmlhttpRequest issue bypassed (will probably be resolved by them in due course)...
	- v0.15 Stuffed up the href link on the image brought forward.
	- v0.08 Sorry about the vary slow update!!! Should work with new trademe. I'm not sure what I was doing wrong.
	- v0.07 Fixed snippets.
	- v0.06 Updated image folder. Prior versions will not work.
	- v0.05 Displays an enlarged image when the mouse hovers over a thumbnail
	- v0.04 Now adds snippets of information about items.
	- v0.04 Uses maxHeight and maxWidth styles to confine picture to 85x64px
	- v0.03 Remove an unneeded loop!
	- v0.02 Made the User-agent the same as the browser.
	- v0.02 Exits search for images once first thumbnail has been found	.
	- v0.02 Exits search for images once matching icon is found.
	- v0.02 Changed some variable names to make more sense.
*/
// ==UserScript==
// @name           TradeMe PhotoView Redux
// @namespace      http://www.girlza.com/
// @include        http://www.trademe.co.nz/*
// @description    Show thumbnails for all listings in TradeMe
// @grant metadata
// ==/UserScript==
//This allows you to turn off unnecessary features
var showThumbs = true;
var showSnippets = true;
var showZoom = true;



//Open Homes were bugging out
var z = document.getElementsByClassName('openhomes')
for (var i = 0; i < z.length; i++) {
    if (z[i].tagName == "LI") {
        z[i].style.width = '170px';
        z[i].style.textAlign = 'center';
        z[i].childNodes[1].style.width = '170px';
        z[i].childNodes[1].style.textAlign = 'center';
    }

}


//The prototype for the callback function that allows me to remember what link I was loading!
Function.prototype.bind = function (thisObject) {
    var method = this;
    var oldargs = [].slice.call(arguments, 1);
    return function () {
        var newargs = [].slice.call(arguments);
        return method.apply(thisObject, oldargs.concat(newargs));
    };
}

var allImgs, thisImg;
var globalTimer;

//First we load all the images of that little camera
allImgs = document.evaluate(
    "//img", //the name of the little camera icon
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


//Then we go through them one-by-one
for (var i = 0; i < allImgs.snapshotLength; i++) {

    if (allImgs.snapshotItem(i).src.indexOf('hasPhoto_160x120.png') > -1 || allImgs.snapshotItem(i).src.indexOf('https://trademe.tmcdn.co.nz/photoserver/') > -1) {

        thisImg = allImgs.snapshotItem(i); //the photos exist but no thumbnail
        thisImg.setAttribute('thumbnailnumber', i);
        //We need to request the page that the icon links to, to get it's thumbnail
        if (thisImg.parentNode.href) {

            var oReq = new XMLHttpRequest();
            oReq.open("GET", thisImg.parentNode.href);
            oReq.addEventListener("load", cbReplaceWithPhoto.bind({
                specificIcon: thisImg.parentNode
            }), false);
            oReq.send();

        }
    }
}

//Set the style up in the <HEAD> tag
var head = document.getElementsByTagName('head')[0];

style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.enlargement {visibility:hidden;position:absolute;z-index:100;top:20px;left:90px;}\r\n.enlargement img {}';
head.appendChild(style);

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}


//This is the callback function that gets run when the itemDetailsPage has loaded
//It grabs the filename of the thumbnail, and replaces the icon with it.
function cbReplaceWithPhoto(rD) {

    //var targetstring="http://images.trademe.co.nz/photoserver/tq/";
    var targetstring = "https://trademe.tmcdn.co.nz/photoserver/tq/";


    //turn the text into a dom object
    var itemDetailsPage = document.createElement('div');
    itemDetailsPage.innerHTML = rD.target.responseText;
    var itemDetailsImgs = itemDetailsPage.getElementsByTagName('img');


    //Go through all images on the item page, and find the one that looks like a thumbnail
    for (var e = 0; e < itemDetailsImgs.length; e++) {
        isthumbImg = itemDetailsImgs[e];

        if (isthumbImg.src.substring(0, targetstring.length) == targetstring) {


            replacementImg = document.createElement("img"); //replace it with this
            replacementImg.src = isthumbImg.src //.replace('https://trademe.tmcdn.co.nz','http://images.trademe.co.nz')
            replacementImg.style.maxHeight = "120px";
            replacementImg.style.maxWidth = "160px";

            replacementImg.setAttribute('thumbnailnumber', this.specificIcon.childNodes[0].getAttribute('thumbnailnumber'));


            //replace the icon with the thumbnail
            if (showThumbs) {
                this.specificIcon.replaceChild(replacementImg, this.specificIcon.childNodes[0]);
            }

            //This handles the tooltip-like zoom function
            if (showZoom) {
                var zoomDiv = document.createElement('div');
                zoomDiv.setAttribute('id', "enlargement" + replacementImg.getAttribute('thumbnailnumber'));
                zoomDiv.setAttribute('class', 'enlargement');
                document.body.appendChild(zoomDiv);

                //When mouse goes over it starts a timer.
                replacementImg.addEventListener(
                    'mouseover',
                    function (event) {
                        var x = event.pageX;
                        var y = event.pageY
                        var divId = 'enlargement' + this.getAttribute('thumbnailnumber');

                        obj = document.getElementById(divId);

                        obj.innerHTML = "<img src='" + this.src.replace('/tq/', '/full/') + "'>";

                        var top = 0
                        var left = 0

                        var z = document.getElementById("container").offsetLeft + document.getElementById("mainContent").offsetLeft

                        obj.style.width = (z - 20) + 'px'
                        obj.style.minHeight = '100%';
                        obj.style.marginLeft = '20px';

                        obj.style.left = left + 'px'; //style coords need units
                        obj.style.top = (window.pageYOffset + 100) + 'px';

                        var img = document.getElementById(divId).childNodes[0]

                        img.style.top = "50px";
                        img.style.position = "absolute";
                        img.style.maxWidth = "100%";
                        img.style.border = '1px solid #000';
                        img.style.boxShadow = '0 0 17px #000';
                        img.style.mozBoxShadow = '0 0 17px #000';
                        img.style.webkitBoxShadow = '0 0 17px #000';


                        globalTimer = window.setTimeout( //after 700msec the pic will become visible
                            function () {
                                showPopupDiv(x, y, divId);
                            },
                            200);
                    },
                    true);
                //Hide image and reset timer once mouse moves out
                replacementImg.addEventListener('mouseout',
                    function (event) {
                        window.clearTimeout(globalTimer);
                        document.getElementById('enlargement' + this.getAttribute('thumbnailnumber')).style.visibility = 'hidden';
                    },
                    true);
            }

            e = itemDetailsImgs.length; //to stop checking once we've found first thumb (exits the loop)
        }
    }
}

/* Function to popup the hidden div */
function showPopupDiv(triggerX, triggerY, divId) {
    obj = document.getElementById(divId);
    obj.style.visibility = "visible"; //make it visible
}