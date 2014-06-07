// ==UserScript==
// @name           OkCupid post titles
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Shows poster name and post title in OkCupid's stupid "this post" journal links.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/json.js
// @include        http://www.okcupid.com/*
// ==/UserScript==

var titles, storage, loading = {};
var posts_xpath = '//a[.="this post" and contains(@href,"/journal/")]';
$x(posts_xpath).filter(is_journal_link).forEach(name_post);

function is_journal_link(a) {
  return a.hostname == location.hostname &&
    /^\/profile\/[^\/]+\/journal\//.test(a.pathname);
}

// Journal link url path layout:
// /profile/<2:profile_name>/journal/<4:postid>[/5:munged-post-title]
function name_post(a) {
  var path = a.pathname.split("/").map(decodeURIComponent);
  var user = path[2];
  var post = path[4];
  if (!titles) load_posts();
  var update = partial(set_link_title, a, user, post);
  if ("string" == typeof titles[post]) {
    update(titles[post]);
  } else {
    if (loading[post]) {
      loading[post].push(a);
    } else {
      loading[post] = [];
      wget$X(a.href, update, '//a[starts-with(@href,"'+ a.pathname +'")]',
	     !"GM", !!"div");
    }
  }
}

function set_link_title(a, user, post, title, url) {
  //console.log("set_post_title(%x, %x, %x, %x)", a, user, post, title);
  if (typeof title != "string") { // got a DOMNode from wget$X
    titles[post] = title = title.textContent;
    //console.log("Loaded: %x from %x", title, url);
    save_posts();
  }
  title = title ? user +": "+ title : "an untitled post by "+ user;
  a.textContent = title;
  if (loading[post]) {
    for each (a in loading[post])
      a.textContent = title;
    delete loading[post];
  }
}

function partial(func /*, param 1, param 2, ... */) {
  var params = Array.prototype.slice.call(arguments, 1);
  return function( /* param1, ..., param n,   param n+1, ... */ ) {
    return func.apply(self, params.concat([].slice.call(arguments)));
  };
}

function load_posts() {
  storage = unsafeWindow.globalStorage[document.domain];
  titles = JSON.parse((storage.journaltitles || "{}") + "");
}

function save_posts() {
  var min = 5e3; // only serialize and save when calls are more than 5s apart
  var old = save_posts.last || 0;
  var now = (new Date).getTime();
  var d_t = now - old;
  if (d_t > min) {
    delete save_posts.timeout;
    //var t = (new Date).getTime();
    storage.journaltitles = JSON.stringify(titles);
    //t = (new Date).getTime() - t;
    //console.info("Encode and save took %xms", t);
  } else {
    var timeout = save_posts.timeout;
    if (timeout) clearTimeout(timeout);
    save_posts.timeout = setTimeout(save_posts, min);
  }
  save_posts.last = now;
}
