// Comment Links for FetLife
// version 1.5
// 2009-12-30
//
// ==UserScript==
// @name          Comment Link for FetLife
// @description   Creates a URL to link to each individual comment in FetLife Posts.
// @include       http://fetlife.com/*
// @include       http://www.fetlife.com/*
// ==/UserScript==
//
// Icon for permalink origionally produced by: http://avi.alkalay.net/2007/05/blog-icons.html
// PNG to Base64 via: http://www.abluestar.com/utilities/encode_base64/index.php



var allLinks, thisLink, linkName, commentNumber, newURL, divComID, divCom, type;

var permaLinkIMG = 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD' +
    '/oL2nkwAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAAAd0SU1FB9kMHgQfORmFBKAAAAIaSURBVDjLpZO/S1' +
    'VhGICf9zvfuSeVQI2rGKSkNfTLUKhBiLQaAoe2jKYWIxrDJYf+AglbimxoysGGGlpacigayoyEosI0i' +
    'Ei8hYne2znf+e55G1TQex2CXni2733ej/eH2FxjAzAEDAJ5/i0KwD1gxAJDDSLDfVFId5SxU4QaESIR' +
    'LCCAAh5IVClqxlRi8k/jdPinKmJzjYv9UZg/FikdgdBkAn5knm9++9KhQCDwOjFMxK5ggPz+nLLHwPm' +
    'ZkEM9hosLOXp3WJwKcQUrmVDM4HCuDJA3AAGwyxgWr8LoM8/dJse+U4ZLnSFOhaSC1cxgRQAwAGVgzm' +
    'c034aWQPmUGkaeeGoPwJkIYq1mIwyAU/iQGiaPegZOhiiwnMGDhym97yytgVYJUt0kKOlah8dLyuqcM' +
    'nza0mJg4HhIaQKaA+VcjeJUSdYpbRYAxKqUVLkxm/LqhaPNZtT1wMpjeO8MXd0h19ssTpVYleVKwYY5' +
    'VuV+UfmSGuoGYWza89GXufbcUdskXKhl/V3VD7byJi3z6IjjcrdFgN+ZcnPK0z+ToyMItjYRIEaruFN' +
    'UluaV0c6IDmt46z1fzyp7w4opZIAgJMoWYlWuLCS8nHWMfg4Za49oHRdm07UcYG2V+6Iw32iE76nnj+' +
    'q2K9xlAw6GhvmyUkD4lSmTSVoITFBTv5TpiXpjaM8Ju62hZRswUEBxAgtlmHaeBG7J/57zX8t1I96WN' +
    'Bz0AAAAAElFTkSuQmCC';

//     Set the variable "href" with the page's URL, removing any existing bookmarks.
var href = window.location.href;
href = href.replace(/#(.)*/, "");

//     Set the variable "type" to what type of comment link is needed.
//         discussion_post = Group discussion posts
//         pictures = User/Profile Picture comments
//         blog = user/profile journal/blog/writings comments
type = href.toLowerCase();
type = type.replace(/\?(.)*/, "");
type = type.replace("http://fetlife.com/", "");
type = type.replace("users/", "");
type = type.replace("groups/", "");
type = type.replace(/[0-9]+\//, "");
type = type.replace(/\/[0-9]+/, "");
type = type.replace("group_posts", "discussion_post");
type = type.replace("posts", "blog");


// ----------========For Forum/Group Posts.=========-----------
if (type=="discussion_post") {
    CommentDiv = document.getElementById('group_post_comments');
    allLinks = document.evaluate(
        '//a[@name]',
        CommentDiv,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        linkName = thisLink.getAttribute("name");
        if (!(linkName=="responses")) {
            commentNumber = linkName.replace("group_comment_", "");
            divComID = "group_post_comment_" + commentNumber;
            divCom = document.getElementById(divComID);
            var makeLink = document.createElement("span");
            newURL = href + '#' + linkName;
            makeLink.innerHTML = '<style>#Mack123:hover {background: none; background' +
                '-color: none;}</style> <a id="Mack123" href="' + newURL + '"><img ' +
                'style="margin: 0px; padding: 0px; position: relative; ' +
                'top: 20px; left: 580px;" src="'+permaLinkIMG+'" alt="Permalink to ' +
                'the post below." title="Permalink to the post below."></a></span>';
            divCom.parentNode.insertBefore(makeLink, divCom);
        }
    }
}

// ----------========For Image Comments.=========-----------
if (type=="pictures") {
    CommentDiv = document.getElementById('comments');
    allLinks = document.evaluate(
        '//a[@name]',
        CommentDiv,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 1; i < allLinks.snapshotLength; i++) {
        if (i % 2 == 1) {
            thisLink = allLinks.snapshotItem(i);
            linkName = thisLink.getAttribute("name");
            commentNumber = linkName.replace("comment_", "");
            divComID = "group_post_comment_" + commentNumber;
            divCom = document.getElementById(divComID);
            var makeLink = document.createElement("span");
            newURL = href + '#' + linkName;
            makeLink.innerHTML = '<style>#Mack123:hover {background: none; background' +
                '-color: none;}</style> <a id="Mack123" href="' + newURL + '"><img ' +
                'style="margin: 0px; padding: 0px; position: relative; ' +
                'top: 5px; left: 0px;" src="'+permaLinkIMG+'" alt="Permalink to ' +
                'the post below." title="Permalink to the post below."></a></span>';
            thisLink.parentNode.insertBefore(makeLink, thisLink);
        }
    }
}

// ----------========For Blog/Journal Comments.=========-----------
if (type=="blog") {
    CommentDiv = document.getElementById('post_comments_container');
    allLinks = document.evaluate(
        '//a[@name]',
        CommentDiv,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        linkName = thisLink.getAttribute("name");
        commentNumber = linkName.replace("post_comment_", "");
        divComID = "comment_" + commentNumber;
        divCom = document.getElementById(divComID);
        var makeLink = document.createElement("span");
        newURL = href + '#' + linkName;
        makeLink.innerHTML = '<style>#Mack123:hover {background: none; background' +
            '-color: none;}</style> <a id="Mack123" href="' + newURL + '"><img ' +
            'style="margin: 0px; padding: 0px; position: relative; ' +
            'top: 20px; left: 420px;" src="'+permaLinkIMG+'" alt="Permalink to ' +
            'the post below." title="Permalink to the post below."></a></span>';
        divCom.parentNode.insertBefore(makeLink, divCom);
    }
}




// --------====Code that didn't quite work below=====------
//      -------====Maybe I can use it later.====-------
/*
var addLoc, childClass, childClass2;
    var children = document.getElementById(divComID).childNodes;
	for (var q=0; q < children.length; q++) {
                childClass = children[q].className;
                if (childClass == 'span-14 last') {
                     alert('made it this far');
                     var children2 = children.childNodes;
                         alert(children2.lenth);
                         for (var p=0; p < children2.lenth; p++) {
                             childClass2 = children2[p].className;
                              alert(childClass2);
                         }
                }
		if (childClass == 'timestamp') {
                        alert('test3');
			addLoc = children[q];
                        var makeLink = document.createElement("span");
                        makeLink.innerHTML = '<a href="' + href + "#" + commentNumber +
                        '">Link to this post</a></span>';
                        addLoc.parentNode.insertBefore(makeLink, add.nextSibling);
                        alert('test4');
                        break;
		}
	}
        }



var makeLink = document.createElement("span");
makeLink.innerHTML = '<a href="blah">Here</a>' +
*/