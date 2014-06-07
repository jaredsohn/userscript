// ==UserScript==
// @name	Automatic last read bookmark
// @namespace	http://www.lysator.liu.se/~jhs/userscript
// @description	For comics, for instance, where you visit once in a while and never seem to remember how far you had read the last time, this user script will remember where you left off, and let you pick up from there when you get back to the site, by always keeping track of the highest comic number you have seen, and adding a "[Last read]" link in the top left corner when you return to the site later on. While the bookmark was designed to work with Megatokyo, Sinfest and Qwantz, it should work just as well on any comic using increasing numbers in the URL for its archive pages if you add domains for other comics sites using Greasemonkey's Tools -> Manage User Scripts editor. Feel free to comment on what comic URLs you add, and I'll try to update the @include:s, once in a while, so new users won't have to repeat your manual labour. Also note that if your last read strip was number 19, and you then view yesterday's strip 2109, then the last read bookmark for that comic will be 2109. To wipe 2109 and pick up at 19 again, go there and issue the manual override command Tools -> User Script Commands -> Set last read bookmark to this page. Technical details: the [Last read] indicator will appear on all pages throughout the site, except on the latest strip you have read or later, where a "[Next comic]" link is placed instead, to go to the last bookmark of the next comic the script is tracking. Note that this does not include the index page (typically at the root of the site), which does not have a number, so you won't risk breaking your bookmark, when just entering the site.
// @include	http://www.megatokyo.com/*
// @include	http://www.sinfest.net/*
// @include	http://www.qwantz.com/*
// @include	http://megatokyo.com/*
// @include	http://www.xkcd.com/*
// @include	http://sinfest.net/*
// @include	http://qwantz.com/*
// @include	http://xkcd.com/*
// @include     http://inktank.com/*
// @include     http://seraph-inn.com/*
// @include     http://hokus-pokus.se/*
// @include     http://www.giantitp.com/*
// @include     http://www.phdcomics.com/*
// @include     http://www.shamusyoung.com/*
// @include     http://www.smbc-comics.com/*
// @include     http://questionablecontent.net/*
// @include     http://www.girlgeniusonline.com/*
// ==/UserScript==

// hostname => pathname+query of last read comic strip
var bookmarks = eval( GM_getValue( 'bookmarks', '({})' )||'({})' );
var skips_more_than_one = /^www.(shamusyoung|girlgeniusonline).com$/i;
var bookmarked = false; // keep state for whether bookmarked this time around

var site_host = location.hostname;//.replace( /^www\./i, '' );
var this_page = location.pathname + location.search;
var last_read = bookmarks[site_host] || '';

// store bookmark as the last read page for this domain
function set_bookmark(bookmark) {
  if( !bookmark.match( /\d/ ) )
    return alert( 'No number in URL! Aborting.' );
  bookmarked = true;
  bookmarks[site_host] = bookmark || this_page;
  GM_setValue( 'bookmarks', bookmarks.toSource() );
}

// makes wildcard regexp out of the last group of numbers, dashes and slashes
function generate_regexp_for( pathquery ) {
  var re = pathquery.replace( /(.*?)([-\d\/]+)(\D*)$/, function( t, a, num, z )
  {
    var esc = /([\]\[\\|+*?^$()-])/g;
    return a.replace( esc, '\\$1' ) + '([-\\d/]+)' + z.replace( esc, '\\$1' );
  });
  return new RegExp( '^'+ re +'$' );
}

function add_link(href, text, title) {
  var a = document.createElement( 'a' );
  a.innerHTML = text;
  a.href = href;
  a.style.color = '#000';
  a.style.opacity = '0.7';
  a.style.position = 'fixed';
  a.style.background = '#FFF';
  a.style.top = a.style.left = a.style.padding = '2px';
  a.title = title;
  document.body.appendChild( a );
}

function add_link_to_next_comic() {
  var sites = [], site;
  for( site in bookmarks )
    sites.push( site );
  if( sites.length < 2 )
    return;
  site = sites[(sites.indexOf( site_host ) + 1) % sites.length];
  add_link( 'http://'+ site + bookmarks[site], '[Next comic]',
	    'Jump to next comic site\'s last read bookmark' );
}

function add_link_to_last_read(href) {
  add_link( href, '[Last read]', 'Automatic last read bookmark' );
}

function init() {
  GM_registerMenuCommand('Set last read bookmark to this page', set_bookmark);
  var read_page = last_read || this_page;
  if( !read_page.match( /\d/ ) )
    return;
  read_page = generate_regexp_for( read_page );
  var cur = this_page.match( read_page );
  var old = last_read.match( read_page );
  if (cur) { // visiting a comic archive page?
    // ~FIXME: higher number won't cut it for silly non-ISO dates, for instance
    var cur_num = cur ? parseInt( cur = cur[1], 10 ) : NaN;
    var old_num = old ? parseInt( old = old[1], 10 ) : NaN;
    if (isNaN( cur_num ) || isNaN( old_num ) || cur == old) // complex id:s?
      set_bookmark( this_page ); // (i e dates) -- just always bookmark'em!
    else if (cur_num >= old_num) {
      var skip = cur_num - old_num - 1;
      if (!skip ||
          location.hostname.match(skips_more_than_one) ||
          confirm('You just skipped past '+ skip +' numbers from ' +
                  'your bookmark.\n\nDo you still want to place ' +
                  'your last read bookmark here?'))
	set_bookmark( this_page );
    }
  }
  if (bookmarked)
    add_link_to_next_comic();
  else
    add_link_to_last_read( last_read );
}

init();
