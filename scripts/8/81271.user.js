// ==UserScript==
// @name           Google.co.nz News Sort By Date
// @namespace      http://userscripts.org/users/125692
// @description    Tries to make google.co.nz news sort by date by default by altering links
// @include        http://news.google.co.nz/news/section*
// @include        http://news.google.co.nz/nwshp*
// ==/UserScript==
//alters "all XX news articles" links to make those pages linked to sorted by date as the default sort by relevance
//sucks a great deal of arse
//makes many assumptions
// like all those links(and only those links) will be found with class 'more-coverage-text'
//only works on google.co.nz as those are the only pages set above in the // @include as i can't be arsed looking up
//how to fix that
//there is probably a much better way to do this.
//   by kiwimage
var morelinks = document.getElementsByClassName('more-coverage-text');
var thislink;
var morelinkslength=morelinks.length;
//for (var i = 0; i < morelinkslength; i++) {
for (var i = 0 , morelink; morelink = morelinks[i];i++){//supposed to be more efficient
    thislink = morelinks[i];
    if (thislink.href&&thislink.href.match(/\/news\/more\?/)){//href exists and probably one we are looking for
        //first we replace the /news/more? with /news/story?.we lose the related links bit but we can't sort by date
        //otherwise
        thislink.href=thislink.href.replace(/\/news\/more\?/,"/news/story?")
        //then we append the $scoring=n which makes it sort by date
        if (!thislink.href.match(/&scoring=n/i)) {//if link lacks &scoring=n append it
            thislink.href += '&scoring=n';
        }
    }
}