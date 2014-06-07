// ==UserScript==
// @name           D2jsp Forums Helper
// @namespace      http://asbands.d2jsp.org/
// @description    Adds random features to d2jsp forums browsing
// @include        http://forums.d2jsp.org/topic.php?*
// @include        http://forums.d2jsp.org/pm.php?*
// ==/UserScript==
var __num__ = 0;
var collapseOldPosts = false;

function rollPosts(posterRegex, cutoffDate) {
 var posts = document.getElementsByTagName('fieldset').wrappedJSObject;
 for (var i = 0; i < posts.length; i++) {
     var post = posts.item(i);
     var posterName = getPoster(post);
     if (posterName) {
         var div = document.createElement('div');
         post.id = 'post_' + __num__;
         div.id = 'div_' + __num__;
         var link = document.createElement('a');
         link.id = 'lnk_' + __num__;
         link.innerHTML = '+';
         div.appendChild(link);
         div.style.cssFloat = 'left';

         post.parentNode.insertBefore(div, post);
         if (isBadPoster(post, posterRegex)) collapsePost(post, link);
         else if (collapseOldPosts && isPostOlder(post, cutoffDate)) collapsePost(post, link);
         else expandPost(post, link);

         __num__ = __num__ + 1;
     }
 }
}

function getPoster(post) {
 var legend = post.firstChild;
 if (!legend) return null;
 else {
     var link = legend.firstChild;
     if (!link) return null;
     else return link.innerHTML;
 }
}

function getPostTime(post) {
 var infoDiv = post.childNodes[2];
 var dateString = infoDiv.childNodes[5].innerHTML;

 return parseDate(dateString);
}

function parseDate(dateString) {
 dateString = dateString.substring(dateString.indexOf(' ') + 1);
 //    extract month
 var monthString = dateString.substring(0, dateString.indexOf(' '));
 month = getMonth(monthString);
 dateString = dateString.substring(monthString.length + 1);
 //    extract day of month
 var day = dateString.substring(0, dateString.indexOf(' '));
 dateString = dateString.substring(day.length + 1);
 //    extract the year
 var commaIdx = dateString.indexOf(',');
 var spaceIdx = dateString.indexOf(' ');
 var year = dateString.substring(0, commaIdx);
 if (commaIdx + 1 != spaceIdx) {
     year = dateString.substring(0, spaceIdx);
     dateString = dateString.substring(year.length + 1);
 } else {
     dateString = dateString.substring(year.length + 2);
 }
 //    extract the hour and minute
 var hour = dateString.substring(0,2);
 var mins = dateString.substring(3,5);

 var d = new Date();
 d.setFullYear(year, month, day);
 d.setHours(hour);
 if (dateString.substring(5,6) == 'p') d.setHours(d.getHours() + 12);
 d.setMinutes(mins);
 return d;
}

function getMonth(m) {
 if (matches(m, /Jan/i)) { return 0; }
 if (matches(m, /Feb/i)) { return 1; }
 if (matches(m, /Mar/i)) { return 2; }
 if (matches(m, /Apr/i)) { return 3; }
 if (matches(m, /May/i)) { return 4; }
 if (matches(m, /Jun/i)) { return 5; }
 if (matches(m, /Jul/i)) { return 6; }
 if (matches(m, /Aug/i)) { return 7; }
 if (matches(m, /Sep/i)) { return 8; }
 if (matches(m, /Oct/i)) { return 9; }
 if (matches(m, /Nov/i)) { return 10; }
 if (matches(m, /Dec/i)) { return 11; }
}

function isPostOlder(post, cutoff) {
 var postTime = getPostTime(post) - 0;//    get it into long mode
 return postTime < cutoff;
}

function matches(name, regex) {
 return name.search(regex) != -1;
}

function isBadPoster(post, regex) {
 var name = getPoster(post);
 if (name) return matches(name, regex);
 else return false;
}

function togglePost(post, header) {
 if (post.style.visibility == 'collapse') expandPost(post, header);
 else collapsePost(post, header);
}

function collapsePost(post, header) {
 var posterName = getPoster(post);
 post.style.visibility = 'collapse';
 header.innerHTML = '+ ' + posterName + getPostTime(post);
}

function expandPost(post, header) {
 post.style.visibility = 'visible';
 header.innerHTML = '&mdash;';
}

//    adds the click listener, which allows us to intercept user clicks
document.addEventListener('click', function(event) {
     var target = event.target;
     //    is the user clicked on one of the created links
     if (matches(target.id, /^lnk_/)) {
         //    flip the post associated with the link
         var postId = 'post_' + target.id.substring(4);//4 = length of 'lnk_'
         var post = document.getElementById(postId).wrappedJSObject;
         togglePost(post, target);
     }
 }, true);

function getAutohideRegex() {
 var hideRegexString = GM_getValue('hideRegex');
 var regex = null;
 if (!hideRegexString) {
     hideRegexString = prompt('You have not yet specified a regular expression to automatically hide users.  Please input one now (or blank to not autohide).', 'Nevada');
     if (hideRegexString.length > 0) {
         regex = new RegExp(hideRegexString);
         GM_setValue('hideRegex', hideRegexString);
     } else GM_setValue('@@NONE');
 } else if (hideRegexString != '@@NONE') {
     regex = new RegExp(hideRegexString);
 }
 return regex;
}

function resetAutohideRegex() {
 var regexString = prompt('Please set the regular expression used to select users to automatically hide (or blank not to hide any).','Nevada');
 if (regexString.length > 0) GM_setValue('hideRegex', regexString);
 else GM_setValue('hideRegex', '@@NONE');
}

function onScriptLoad() {
 var purl = '' + window.location;
 purl = purl.substring(purl.indexOf('t=') + 2, purl.indexOf('f=') - 1);
 if (GM_registerMenuCommand) GM_registerMenuCommand('Set D2jsp Forums Autohide', resetAutohideRegex);
 var lastTime = GM_getValue('time_' + purl);
 if (lastTime) {
     lastTime = parseDate(lastTime);
     collapseOldPosts = true;
 }
 GM_setValue('time_' + purl, '' + new Date());

 var regex = getAutohideRegex();
 if (regex) rollPosts(regex, lastTime - 6*60*60*1000);//cutoff time is six hours later
}

onScriptLoad();