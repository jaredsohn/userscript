// ==UserScript==
// @name           IWBTF Scriptmonkey add-on
// @namespace      http://userscripts.org/scripts/show/117485
// @description    A few changes to the IWBTG forum that I think it needs. 
// @include        *kayin.pyoko.org/iwbtg/forums/*
// @version        0.60
// @icon           http://dl.dropbox.com/u/35421925/moon.gif
// @grant          none
// ==/UserScript==
version = '"Cool Beans" (0.60)';


//config - feel free to change this next stuff!

/*
/  Whether or not this program should bother to edit
/  text styling. This must be enabled to use any of
/  the next stuff. (1 to enable this, 0 to disable)
*/
var textStyling = 1;
/*
/  This is the list of colors that are "banned",
/  These banned colors will instead be changed to the
/  newColorToReplaceBannedColors instead.
/  you can just add colors seperated with "," here.
/  I'm afraid that I think you must write them as rgb(75, 91, 138)
/  or as the color name, like 'blue'. I don't think the hex is any use.
*/
// First off, wether or not to bother to ban colors.
// (1 to enable the banning of colors, 0 to disable it)
var enableBanningColors = 1;
// The list of colors to be banned, see above
var bannedTextColors = ['blue','#0000FF','#4B5B8A', '#30488C',
'rgb(0, 0, 255)', 'rgb(75, 91, 138)', 'rgb(48, 72, 140)'];
// here you can set the color that text of a banned color should
// change to, you can use anything here. rgb (as above), hex or names.
var newColorToReplaceBannedColors = 'black';
// set the minimum font size (in pts), text above this size will
// change to this size. (measured in points, -1 to disable the
// minimum font size resizing.
var minFontSize = 7;
// This is the end of the text styling options.

/*
/  Whether or not this program should change the smiley list
/  on the reply page to the new one I made with [img]http://i51.tinypic.com/eg60kz_th.gif[/img] and
/  a new improved order. (1 to enable the new list, 0 to disable it)
*/
var useNewSmileylist = 1;
/*
/  The size to make the reply boxes on the forum.
/  (measured in rows, -1 to disable this feature)
*/
var textBoxSize = 20;
// should iron tree be fixed? (1 to fix it, 0 to leave it as it is)
var fixIronTree = 1;
// turn on word filters? (1 for on, 0 for off)
var wordFilters = 0;
// words to filter in your posts, you can make your own smileys!
// to make your own smileys just filter them to the image you want.
var filteredWords = ['blue', 'pink'];
// what to filter the words to, the first element in the above will be
// filtered to the first element below. Both filteredWords and 
// whatToFilterTo will have no effect if wordFilters is turned off (0).
var whatToFilterTo = ['green', 'red'];
// should ever youtube video linked be changed into an embedded flash video?
// you can also change the html code used to embed it. (1 to convert the videos
// and 0 to leave them as just links)
var shouldEmbedYoutubeLinks = 1;
// The code used to embed the links, where "link" is the original youtube link
// for example you may want to go and spoiler the videos
var embedOnYoutubeStartingCode = '<iframe width="480" height="360" src="http://www.youtube.com/embed/';
// next the code for the video will be added and then the ending code
var embedOnYoutubeEndingCode = '" frameborder="0" allowfullscreen></iframe>';
// The max number of links the embed per page. If you set this to 5 and then
// a page has 6 links to youtube on it, only the first 5 will be embeded.
// this is useful to prevent lag and spamming of youtube links.
var maxYoutubeLinksToEmbedPerPage = 4;
// should we go and make all broken images desplay the url?
// this is mostly just useful for reading that hidden img text.
var showBrokenImageUrls = 1;
// fix the spoiler on a reply, turns out it's a broken image.
// (1 to fix the spoiler image, 0 to leave it as it is, which
// will be silly if you are also showing broken image urls as it
// will show the spoilers url)
var shouldFixSpoilerImage = 1;
/*
/  Here you can have your online time show with months or years.
*/
var giveTimeLoggedInInYears = 1;
var giveTimeLoggedInInMonths = 0;
/*
/  Whether or not make a pop-up saying "awesome" appear whenever
/  this program is run (every page on the fourm that loads)
/  this is only really useful for debugging and checking that the
/  script is working. (1 to enable, 0 to disable)
*/
var awesomePopup = 0;
/*
/  Here you can choose if you want to overwrite the default "hello"
/  text at the top of the screen. This is just an easter egg really
/  and also has the advantage of being the last thing in the program
/  to run, therefore it works as a good check to make sure that therefore
/  have been no errors in the whole program. If the "hello" text is changed
/  to what you changed it to then you know that there were no errors.
/  it's also ALOT less annoying than awesomePopup. (set to 'disabled' to 
/  disable this feature or to anything else to enable it, e.g.
/  setting it to 'Konichiwa' will have it say "Konichiwa <your username here>"
/  at the top of the screen).
*/
var helloOverwrite = 'You\'re Awesome';

//var spoilerQuoteTrains = 1;
// end of config, start of "real" program.



if (textStyling == 1) {
    //lets try make a few changes to silly text formatting
    var spans=document.getElementsByTagName('span')
    for (var iii=0;iii<spans.length;iii++) {
	if (enableBanningColors == 1)
		//lets make the banned text colors readible
		for (var jjj=0;jjj<bannedTextColors.length;jjj++)
		    if (spans[iii].style.color == bannedTextColors[jjj])
			spans[iii].style.color = newColorToReplaceBannedColors;
	if (minFontSize != -1) {
	//resize tiny text
	var fontSize = spans[iii].style.fontSize;
	if ((fontSize.indexOf("pt") != -1)&& (parseInt(fontSize) < minFontSize))
	    spans[iii].style.fontSize = minFontSize + "pt";
	}
    }
}
//lets set yourUrl to reflect our current url
var yourUrl = location.href;
if (yourUrl.indexOf('http://') == 0)
    yourUrl = yourUrl.substring(7, yourUrl.length);
//we must show the scriptmonkey version on the page about it
if (yourUrl.split('14446')[0] == 'kayin.pyoko.org/iwbtg/forums/index.php?topic=') {
    var youHaveScriptMonkey = document.createElement("span");
    youHaveScriptMonkey.innerHTML = 'Yay you have ScriptMonkey installed!';
    var versionNumber = document.createElement("span");
    versionNumber.innerHTML = 'Version you have installed: ' + version;
    
    var youDontHaveScriptMonkeyBanner = document.querySelector('img[src="http://img69.imageshack.us/img69/9968/youdonthavescriptmonkey.png"]');
    if (youDontHaveScriptMonkeyBanner != null)
	youDontHaveScriptMonkeyBanner.parentNode.replaceChild(youHaveScriptMonkey,youDontHaveScriptMonkeyBanner);
    var installItBanner = document.querySelector('img[src="http://img408.imageshack.us/img408/7466/clickheretoinstallscrip.png"]');
    if (installItBanner != null)
	installItBanner.parentNode.parentNode.replaceChild(versionNumber,installItBanner.parentNode);
}
    
if (shouldFixSpoilerImage == 1) {
    var spoiler = document.querySelector('img[src="http://kayin.pyoko.org/iwbtg/forums/Themes/default/images/bbc/spoiler.gif"]');
    if (spoiler != null)
	spoiler.src = 'http://img210.imageshack.us/img210/5997/spoilerr.png';
}

if (useNewSmileylist == 1) {
    //Here we find then change the smileys list.
    var smileys = document.querySelector('a[href="javascript:void(0);"][onclick="replaceText(\' :)\', document.forms.postmodify.message); return false;"]');
    if (smileys != null) {
	smileys.parentNode.innerHTML =
	'<a href="javascript:void(0);" onclick="replaceText(\' :)\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/smiley.gif" alt="Smiley" title="Smiley" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :D\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/cheesy.gif" alt="Cheesy" title="Cheesy" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' ;D\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/grin.gif" alt="Grin" title="Grin" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' =(\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/sad.gif" alt="Sad" title="Sad" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :o\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/shocked.gif" alt="Shocked" title="Shocked" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' ???\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/huh.gif" alt="Huh?" title="Huh?" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' 9_9\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/rolleyes.gif" alt="Roll Eyes" title="Roll Eyes" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :P\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/tongue.gif" alt="Tongue" title="Tongue" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :-[\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/embarrassed.gif" alt="Embarrassed" title="Embarrassed" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :-X\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/lipsrsealed.gif" alt="Lips Sealed" title="Lips Sealed" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :-\\\\\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/undecided.gif" alt="Undecided" title="Undecided" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :\\\'(\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/cry.gif" alt="Cry" title="Cry" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' >:(\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/angry.gif" alt="" title="" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :fruit:\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/apples.gif" alt="It is Delicious" title="It is Delicious" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' :spikes:\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/spikes.gif" alt="These are not good for you" title="These are not good for you" align="bottom"></a>\n ' + 
	'<a href="javascript:void(0);" onclick="replaceText(\' [img]http://i51.tinypic.com/eg60kz_th.gif[/img]\', document.forms.postmodify.message); return false;"><img src="http://dl.dropbox.com/u/35421925/moon.gif" alt="Plotting your demise" title="Plotting your demise" align="bottom"></a>\n ' +
	'<a href="javascript:void(0);" onclick="replaceText(\' :kid:\', document.forms.postmodify.message); return false;"><img src="http://kayin.pyoko.org/iwbtg/forums/Smileys/iwbtg/kid.gif" alt="He wants to be the Guy!" title="He wants to be the Guy!" align="bottom"></a>\n';
    }
}

if (textBoxSize != -1) {
    //change the size of our text boxes.
    var textBox = document.querySelector('.editor');
    if (textBox != null)
	textBox.rows = textBoxSize;
}
if (fixIronTree == 1) {
    var ironTree = document.querySelector('img[src="http://kayin.pyoko.org/iwbtg/templogo.gif"][alt="I Wanna Be The Forums!"]');
    if (ironTree != null)
	ironTree.src = "http://img43.imageshack.us/img43/6426/templogo.gif";
}
if (shouldEmbedYoutubeLinks == 1) {
    var links = document.body.getElementsByTagName("a");
    if (links != null) {
	var linksChanged = 0;
	for (var iii=0;(iii<links.length) && linksChanged<maxYoutubeLinksToEmbedPerPage;iii++) {
	    var link = links[iii];
	    if ((link.href.indexOf("youtube.com") == 0) || (link.href.indexOf("www.youtube.com") == 0) || 
	      (link.href.indexOf("http://www.youtube.com") == 0) || (link.href.indexOf("http://youtube.com") == 0)) {
		if (link.href.indexOf("watch?v=") != -1) {
		    var youtubeVideoId = link.href.split("watch?v=")[1]
		    youtubeVideoId = youtubeVideoId.split("&")[0];
		    var youtubeVideo = document.createElement("span");
		    youtubeVideo.innerHTML = '<br>' + embedOnYoutubeStartingCode + youtubeVideoId + embedOnYoutubeEndingCode;
		    link.parentNode.insertBefore(youtubeVideo, link.nextSibling);
		    linksChanged++;
		}
	    }
	}
    }
}
function showBrokenImageUrlsFunction() {
    var images = document.body.getElementsByTagName("img");
    if (images != null)
	for (var iii=0;iii<images.length;iii++) {
	    if (!images[iii].complete || ((typeof images[iii].naturalWidth != "undefined") && images[iii].naturalWidth == 0)) {
		var theUrl = document.createElement("span");
		theUrl.innerHTML = images[iii].src;
		if (theUrl.innerHTML.indexOf('http://') == 0)
		    theUrl.innerHTML = theUrl.innerHTML.substring(7);
		if (theUrl.innerHTML != yourUrl)
		    images[iii].parentNode.replaceChild(theUrl,images[iii]);
	    }
	}
}
if (showBrokenImageUrls == 1)
    window.addEventListener ("load", showBrokenImageUrlsFunction, false);
//var tempTextBox = '';
function filterBeforeSubmit() {
    //lets filter these words!
    var textBox = document.querySelector('.editor');
    if (textBox != null) {
	//tempTextBox = textBox.value;
	for (var iii=0;iii<filteredWords.length;iii++)
	    textBox.value = textBox.value.replace(new RegExp(filteredWords[iii],"g"), whatToFilterTo[iii]);
    }
    return submitThisOnce(this);
}
//function returnTextBoxToNormal() {
//    alert("yay");
//    var textBox = document.querySelector('.editor');
//    if (textBox != null) {
//	textBox.value = tempTextBox;
//    }
//}
if (wordFilters == 1) {
    var postButton = document.getElementsByName("post");
    if (postButton.length != 0) {
	postButton[0].setAttribute("onclick", null);
	postButton[0].addEventListener("click", filterBeforeSubmit, true);
    }
    var previewButton = document.getElementsByName("preview");
    if (previewButton.length != 0) {
	previewButton[0].setAttribute("onclick", null);
	previewButton[0].addEventListener("click", filterBeforeSubmit, true);
	//previewButton[0].addEventListener("mouseup", returnTextBoxToNormal, true);
    }
    //incase it's already made changes lets run the ban list backwards
    var textBox = document.querySelector('.editor');
    if (textBox != null) {
	for (var iii=0;iii<whatToFilterTo.length;iii++)
	    textBox.value = textBox.value.replace(new RegExp(whatToFilterTo[iii],"g"), filteredWords[iii]);
    }
}


if (awesomePopup == 1) {
    //make a popup saying awesome appear so you know the script worked
    alert("awesome");
}

if (giveTimeLoggedInInYears == 1 || giveTimeLoggedInInMonths == 1) {
    var topText = document.querySelector('.middletext');
    if (topText != null) {
        timeText = topText.innerHTML.split("<br>")[2];
        nums = timeText.match(/[\d]+/g);
        if (nums.length == 3) {
            days = nums[0];
            hours = nums[1];
            minutes = nums[2];
            topText.innerHTML = topText.innerHTML.split("<br>")[0] + "<br>" + topText.innerHTML.split("<br>")[1]
                                + "<br>" + "Total time logged in: ";
            if (giveTimeLoggedInInYears == 1) {
                years = Math.floor(days / 365);
                if (years != 0) {
                    days = days - years * 365;
                    topText.innerHTML += years + " year";
                    if (years > 1) {
                        topText.innerHTML += "s";
                    }
                    topText.innerHTML += ", ";
                }
            }
            if (giveTimeLoggedInInMonths == 1) {
                months = Math.floor(days / 31);
                if (months != 0) {
                    days = days - months * 31;
                    topText.innerHTML += months + " month";
                    if (months > 1) {
                        topText.innerHTML += "s";
                    }
                    topText.innerHTML += ", ";
                }
            }
            topText.innerHTML += days + " days, " + hours + " hours, " + minutes + " minutes.<br>";
        }
    }    
}

if (helloOverwrite != 'disabled') {
    var helloTextAtTopOfPage = document.querySelector('span[style="font-size: 130%;"]');
    if (helloTextAtTopOfPage != null)
	helloTextAtTopOfPage.innerHTML = helloOverwrite + helloTextAtTopOfPage.innerHTML.substring(6);
}

/*
if (spoilerQuoteTrains == 1) {
    var posts = document.body.getElementsByClassName("post");
    if (posts != null) {
        for (var iii=0;(iii<posts.length);iii++) {
            var post = posts[iii];
            children = post.childNodes;
            for (var jjj=1;(jjj<children.length);jjj++) {
                child = children[jjj];
                alert(child.nodeType);
                var quotes = child.getElementsByClassName("quote");
                for (var kkk=0;(kkk<quotes.length);kkk++) {
                    quote = quotes[kkk];
                    alert(quote.innerHTML);
                }
            }
            //alert(quote.innerHTML);
            //alert(quote.nodeType);
            /*if ((link.href.indexOf("youtube.com") == 0) || (link.href.indexOf("www.youtube.com") == 0) || 
                (link.href.indexOf("http://www.youtube.com") == 0) || (link.href.indexOf("http://youtube.com") == 0)) {
                    if (link.href.indexOf("watch?v=") != -1) {
                        var youtubeVideoId = link.href.split("watch?v=")[1]
                        youtubeVideoId = youtubeVideoId.split("&")[0];
                        var youtubeVideo = document.createElement("span");
                        youtubeVideo.innerHTML = '<br>' + embedOnYoutubeStartingCode + youtubeVideoId + embedOnYoutubeEndingCode;
                        link.parentNode.insertBefore(youtubeVideo, link.nextSibling);
                        linksChanged++;
                    }
                }
        }
    }
}
*/



/* here's some crude find and replace stuff, we don't need it!
var code;
var temp;
code = document.body.innerHTML;
//lets make blue text black
//code = code.replace("<span style=\"color: blue;\">","<span style=\"color: black;\">");
//here's some alternative code, the above line is better but hey,
//these two below could still help you understand this better.
//temp = code.split("<span style=\"color: blue;\">");
code = temp.join("<span style=\"color: black;\">");

//code = code.replace("<span style=\"color: blue;\">","<span style=\"color: black;\">");

//lets make tiny text possible to read
temp = code.split("<span style=\"font-size: ");
for (var iii = 1; iii < temp.length; iii++) {
    //we loop through each of the splits dealing with each.
    //other than with the first (0)
    var temp2 = temp[iii].split("pt");
    if (temp2[0] < 7)
	temp2[0] = 7;
    temp[iii] = temp2.join("pt");
}
code = temp.join("<span style=\"font-size: ");

//awesome now lets finally put our changes back
document.body.innerHTML = code;
//end of crude find and replaceing
*/