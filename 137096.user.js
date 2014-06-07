// ==UserScript==
// @name        Lupa Obscured
// @namespace   http://thatguywiththeglasses.com/
// @description Obscurus Lupa caused someone to get fired for no good reason. Now when ever I see that name it makes me angry. I would much prefer not to see it again, so this script attempts to remove all reference to her from the site. 
// @include     http://thatguywiththeglasses.com/
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     3
// ==/UserScript==

//If there are any other words you want gone, just add them to this list...
var KillFilter = ['Obscurus', 'Lupa'];

function BlockIt(txt) {
    var result = false;
    $(KillFilter).each(function () { if (txt.indexOf(this) > -1) result = true; });
    return result;
}

var IntervalIndex = null;

//I have tried to avoid collateral damage where possible, but use at your own discretion.
function TryBlockIt() {

    $('*').each(function () { //for every element of the page
        try {
            var elem = $(this);
            var txt = elem.text().toLowerCase(); //lets see what plain text is contained within this element
            if (BlockIt(txt)) { //If we find a kill word
                var tag = elem.prop('tagName'); //Lets find what kind of content we are dealing with
                if (tag == 'LI') { //list items are used throughout the main site navigation menu
                    if ($('.topdaddy', elem).length == 0) { //Don't drop the InkedReality list item
                        elem.remove(); //but lupas link is fair game, your gone!
                    }
                } else if (tag == 'TD') { //remove links from below the main video preview area
                    elem.remove(); //bye bye
                } else if (tag == 'DIV') { //divs are used all ove the place
                    if (elem.hasClass('feature-block-title3')) { //Here we are the slide show video title
                        elem = elem.parent(); //select our container
                        var i = $('.feature-block-title').index(elem); //find the index of the video so we can take a shortcut



                        $('div.desc-container').find('div:eq(' + i + ')'); //use the index to remove the video description
                        $('div.feature-pad:eq(' + i + ') span').html("<br />"); //use the index to remove more video descriptions, replace <br /> with your own message if you like.

                        //We could remove the image, but why not have some fun with it...
                        //however because it's a silde show, it may not be in the document yet. so lets wait until we can find it.
                        
                        IntervalIndex = setInterval(function () { //wait until the image gets inserted into our DOM
                            var VideoImage = $('div.image-full').find('img:eq(' + i + ')'); //Select the image from the collection, we may have to wait for it to show up because of the slideshow.
                            if (VideoImage.length = 1) { //the image has been found on our page (now we can stop waiting)
                                VideoImage.attr('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Blocked_cat.svg/363px-Blocked_cat.svg.png');
                                window.clearInterval(IntervalIndex); //Stop processing.
                            }
                        }, 100); //is .1 of a second too long ;)  

                        //Was trying to make this run in real time as soon as the image appears, rather than having to monitor via intervals, but found this was causing my browser to become unresponsive/crash, I may come back to look at this another day...
                        //$("div.imags-full").bind("DOMSubtreeModified", function () {//When we detect the image container has changed
                        //    $("div.imags-full").unbind("DOMSubtreeModified"); 
                        //    var VideoImage = $('div.image-full').find('img:eq(' + i + ')'); //Select the image from the collection, we may have to wait for it to show up because of the slideshow.
                        //    if (VideoImage.length = 1) { //the image has been found on our page (now we can stop waiting)
                        //        VideoImage.attr('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Blocked_cat.svg/363px-Blocked_cat.svg.png');
                        //        window.clearInterval(IntervalIndex); //Stop processing.
                        //    }
                        //});

                        elem.remove(); //say goodbye to the video title





                    }
                } else if (tag == 'P') {
                    elem.closest('.video').remove(); //Remove the video links
                } else if (tag == 'SPAN') {
                    elem.closest('.daddy').closest('li').remove(); //Remove other video links
                }
            }
        } catch (err) { }
    });
}

$(document).ready(function () {

    for (var i = 0; i < KillFilter.length; i++) { KillFilter[i] = KillFilter[i].toLowerCase(); }

    TryBlockIt();

});

