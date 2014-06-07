// ==UserScript==
// @name		NewTwitter iOS Style Header - Blue
// @description	Makes Twitter Fly header turn blue and moves sidebar to right.
// @namespace	http://userscripts.org/users/Browno
// @include		http://twitter.com*
// ==/UserScript==

@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("twitter.com") {
.global-nav, .global-nav .well, .btn-tweet, .btn-tweet:hover, .btn-tweet:active, .nav .active > a, .nav .open .dropdown-toggle, .form-search.has-saved-searches.focus, .tweet .actions {
background-image: url("http://dl.dropbox.com/u/6897924/twitterbg.png")}
}

.global-nav .search-input {
color: #CCC;
background-color: #FFF;
}

nav li a {
position: relative;
font-size: 12px;
color: white;
text-shadow: 0 -1px 0 rgba(0, 0, 0, .75);
}


i {
background-image: url("http://dl.dropbox.com/u/6897924/twitterlinks.png");
}

.nav li a {
position: relative;
font-size: 12px;
color: white;
text-shadow: 0 -1px 0 rgba(0, 0, 0, .75);
}

.global-nav .highlight .search-input {
width: 165px;
background-color: white;
}

  .dashboard{
    float:right !important;
    margin-left:10px !important;
  }
}