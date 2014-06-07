// ==UserScript==
// @name           Cleaner SquidU
// @namespace      http://userscripts.org/users/56976
// @description    Tidies up the SquidU Forum interface
// @include        http://squidu.com/forum/*
// @include        http://www.squidu.com/forum/*
// @author         thefluffanutta
// ==/UserScript==

function $(id)
{
  return document.getElementById(id);
}

function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}

// attempt to extract the login name
welcome = $('brdwelcome').innerHTML;
start = welcome.indexOf('<strong>');
stop  = welcome.indexOf('</strong>');

// don't hide links on index or post pages
var hiderules = true;
if (location.pathname == '/forum/'
 || location.pathname.indexOf('/forum/index') == 0
 || location.pathname.indexOf('/forum/post') == 0)
  hiderules = false;

if (start>0 && stop>0) {
  // hide the banner and rules (unless # in URL)
  if (location.hash == '') {
    //$('brdtitle').style.display = 'none';
    if (hiderules)
      $('announce').style.display = 'none';
  }

  lensmaster = welcome.substr(start+8, stop-start-8);

  // highlight own threads in search and forum lists
  if (location.pathname.indexOf('/forum/search') == 0 ||
      location.pathname.indexOf('/forum/viewforum') == 0) {
    rows = getElementsByClassName('tcl', $('vf'));
    for (var i=0,j=rows.length; i<j; i++) {
      if (rows[i].innerHTML.indexOf('by&nbsp;'+lensmaster) > 0) {
        rows[i].parentNode.style.background = '#ffa';
      }
    }
  }

  // highlight own posts and quotes in thread view
  if (location.pathname.indexOf('/forum/viewtopic') == 0) {
    rows = getElementsByClassName('postleft');
    for (var i=0,j=rows.length; i<j; i++) {
      if (rows[i].innerHTML.indexOf('/lensmasters/'+lensmaster) > 0) {
        post = getElementsByClassName('postmsg', rows[i].parentNode)[0];
        post.style.background = '#ffa';
        post.parentNode.style.background = '#ffa';
      }
    }

    rows = getElementsByClassName('incqbox');
    for (var i=0,j=rows.length; i<j; i++) {
      if (rows[i].innerHTML.indexOf('<h4>'+lensmaster+' wrote:') >= 0) {
        rows[i].style.background = '#ffa';
        rows[i].parentNode.style.background = '#ffa';
      }
    }
  }
}