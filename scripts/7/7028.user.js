// ==UserScript==
// @name           Google side links
// @namespace      http://ajnasz.hu/google-side-links
// @description    Add the links of the following search results into a side box
// @include        http://*.google.*/search*
// @include        http://images.google.*/images*
// ==/UserScript==



(function() {

  /**
   * add style for the sidebox
   */
  addSideLinksStyle = function()
  {
    if(!window.sideStyle)
    {
      css = '#general {top:20px;} #extra {bottom:10px;}'
        + '.sidebox {position:fixed;right:0px;border-top:1px solid #00c;border-bottom:1px solid #00c;border-left:1px solid #00c;background-color:#fff;padding:4px;-moz-opacity:0.5;}'
        + 'div.sidebox:hover {-moz-opacity:1;}'
        + 'div.sidebox ul {list-style:none;padding:0;margin:0;}'
        + 'div.sidebox li {width:75px;margin:0;padding:0;}'
        + 'div.sidebox a {font-size: 12px;display:block;width:100%;padding:2px;font-weight:bold;}'
        + 'div.sidebox a:hover {background-color: #E5ECF9;}'
        + '.curr {color:#00c;font-weight: bold;font-size:13px;}';
      GM_addStyle(css);
      window.sideStyle = true;
    }
  }
  /**
   * append the sidebox to the google search page
   */
  addSideLinksBox = function()
  {
    var f = document.createElement('div');
    f.setAttribute('class', 'sidebox');
    f.setAttribute('id', 'general');
    document.body.appendChild(f);
  }
  /**
   * generate and add the sidelinks
   */
  addGeneralLinks = function()
  {
    var f = document.getElementById('general');
    var nav = document.getElementById('navbar');
    if(!nav) { return; }
    var l = '<span class="curr">Current: '+nav.getElementsByTagName('span')[0].innerHTML+'</span>';

    var links = nav.getElementsByTagName('a');
    var tmpLink = null;
    l += '<ul>';
    for (var i=0; i<links.length; i++) {
      tmpLink = links[i].cloneNode(true);
      if(tmpLink.firstChild.className == 'nr')
      {
        tmpLink.removeChild(tmpLink.firstChild);
      }
      l += '<li><a href="'+links[i]+'">'+tmpLink.innerHTML+'</a></li>';
    }
    l += '</ul>';
    f.innerHTML = l;
  }

  addSideLinksStyle();
  addSideLinksBox();
  addGeneralLinks();
})();


