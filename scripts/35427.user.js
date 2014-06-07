/* (This line hides js comments from css syntax highlighting)  :vim:syn=css:
// ==UserScript==
// @name           Userscripts.org - Face icons, CSS tweaks
// @namespace      http://khopis.com/scripts
// @description    Some style tweaks for userscripts.org
// @include        http://userscripts.org/*
// @include        http://*.userscripts.org/*
// @copyright      2008 by Adam Katz
// @license        AGPL v3+
// @version        1.5
// @license2       unlimited license for Jesse Andrews and Userscripts.org
// ==/UserScript==
/*
 * This script is basically a demo, a candidate for inclusion on the site.
 * Obviously, the HTML/CSS would be used on the site, not this JavaScript.
 * (How, you ask?  Use "View Generated Source" via the Web Developer add-on
 * to firefox at https://addons.mozilla.org/en-US/firefox/addon/60 )
 *
 * I had to do a bit of forcing due to inheritance issues.  That can be
 * resolved by using a greater-than to limit that inheritance.  (Generally,
 * adding "!important" should not be needed within a site.)
 *
 *
 * This script started as a proposal for the drop-down menu you now see
 * on your username up top (when you are logged in).  Back then, it included
 * some JS insertion code.  These days, it is mostly CSS.
 */

/* convert default gravatar "pattern" icons */
var iconType = "wavatar";  // choices are:  wavatar, monsterid, identicon
//var iconType = escape("http://userscripts.org/images/gravatar_default.png"); // or you can use an image URL like the old default monkey
var icons = document.evaluate("//img[contains(@src,'gravatar.com/avatar')]",
              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<icons.snapshotLength; i++) {
  var iconI = icons.snapshotItem(i);
  iconI.src = iconI.src.replace(/\bd(efault)?=[^&]*/, "default=" + iconType);
}

/* put script-nav tab counts inside the link 
 * (so the LI contains only the A, enabling us to make the A fill the tab) */
var scriptNav = document.getElementById("script-nav");
if (scriptNav) {
  var tabs = scriptNav.getElementsByTagName("li");
  for (var i=0; tabs && i<tabs.length; i++) {
    var span = tabs[i].getElementsByTagName("span");
    var link = tabs[i].getElementsByTagName("a");
    if (span && span[0] && link && link[0]) {
      link[0].appendChild(document.createTextNode(" "));
    link[0].appendChild(span[0]); // this acts as a cut+paste
    }

    // add a Versions tab after the Source Code tab
    if ( tabs[i].innerHTML.match(/Source Code/) ) {
      var vers = document.createElement("li");
      var versA;
      if (location.href.match(/\/versions\//) ) {
        versA = document.createElement("div");
        vers.className = "current";
      } else {
        versA = document.createElement("a");
        versA.href = "/scripts/versions/" + location.href.match(/[0-9]+$/);
      }
      versA.appendChild(document.createTextNode("Versions"));
      vers.appendChild(versA);
      scriptNav.insertBefore(vers, tabs[i+1]);
    } // end if for Versions

  } // end for loop
}


// /* This double-comment hides the CDATA call from CSS highlighting in vim

// The following multi-line string requires E4X (Moz is ok, IE/Opera is not).
// You can learn more about E4X at http://userscripts.org/guides/4
GM_addStyle( (<r><![CDATA[


  /***** SHOW VISITED LINKS *****/
  #full_description a:link, td.body a:link       { color:#06b !important; }
  #full_description a:visited, td.body a:visited { color:#039 !important; }
  #full_description a:hover, td.body a:hover     { color:#004 !important; }
  #full_description a:active, td.body a:active   { color:#0ff !important; }
  .sh_comment + .sh_url > a { color:#2e2; } /* subtler links for comments */
  .sh_comment + .sh_url > a:visited { color:#8b8; }
  .sh_comment + .sh_url > a:hover { color:#080; }
  
  /***** FIX LINKS IN TABLES AND H3 *****/
  #full_description th a, td.body th a, h3 a { color:#ff7 !important; }
  #full_description th a:visited, td.body th a:visited, h3 a:visited
    { color:#ffc !important; }
  #full_description th a:hover, td.body th a:hover, h3 a:hover
    { color:#ff0 !important; }
  
  /***** BETTER WRAPPING *****/
  pre.sh_javascript   { width:99% !important; padding-right:0 !important; }
  textarea[cols="40"] { width:100%; }
  div.comment         { clear:both; }
  
  /***** BETTER HOME MENU *****/
  #homeBox > a:after { content: "▼"; } /* arrow on heading cues user to menu */
  /* This makes the heading's underline disappear when you are in the menu and
   * not selecting the heading (so the underline follows the pointer), thus
   * emphasizing the fact that the heading is a page on its own.  */
  #homeBox:hover > a { text-decoration:none!important; }
  #homeBox:hover > a:hover { text-decoration:underline!important; }
  /* Add a border to the parts of the menu that sink below the orange banner
   * ... this fails to line up perfectly at some font sizes :-(  */
  #homeMenu { margin-left:-0.6em !important; padding:0.3em 0 0 !important;
    border:solid #888 !important; border-width:0 0 2px !important;
    -moz-opacity:0.95 !important; } /* opacity:0.95  still does not work */
  #homeBox > #homeMenu > li { margin:0 !important; padding:0 0.5em !important;
    border:solid #888 !important; border-width:0 2px !important; }
  #homeBox > #homeMenu > li:first-child { border-color:#f18705 !important; }

  /***** BETTER SCRIPT NAV TABS *****/
  #script-nav li { border:solid #f8f8f8; border-width:1px 1px 0;
                   padding:0; height:23px; }
  #script-nav li:hover { background:#fff; border-color:#999; height:24px; }
  /* make the A fill the whole tab, move padding to inside the A */
  #script-nav li a { display:block!important; padding:0 7px; }
  #script-nav li.current { padding:0 8px; } /* no A here, use LI for padding */

  /***** EMPTY SPACE FOR REPLY BOX TO OVERLAP *****/
  div#reply[style=""] + * + *, div#edit[object_id] + * + * + * + *
    { margin-bottom:15em; }
  div#edit[object_id][style="display: none;"] + * + * + * + *
    { margin-bottom:0; }
  /* (yeah, that's a hell of a hack, easier for the pop-up JS code than for CSS)
   * bug: if you edit a post, cancel, then reply, there is no margin */

]]></r>) + "" ); // concatinating with empty string casts the E4X into a string