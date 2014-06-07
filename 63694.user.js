// ==UserScript==
// @name           LOLWAT@TutoP6
// @namespace      http://dtc.com/
// @description    this is epic
// @version        1.0
// @include        http://tutoratp1.free.fr/posting.php?*
// @include        http://tutoratp1.free.fr/viewtopic.php?*
// @include        http://tutoratp1.free.fr/privmsg.php?*
// @history        EmoticonBar 1.2.1 fork
// ==/UserScript==


window.addEventListener("load", function(e) {

tagtype = 'html'; // default; alternative: 'bbcode'

// Emoticon definitions
function setemoticons(domname) {
  var editbar = document.getElementById(domname);
  if (editbar) {

    var bdiv = document.createElement('div');
    bdiv.setAttribute('align','center');
    bdiv.setAttribute('id','IzEmoticons');
    var buttons = "<div style='background-color:#ffffff;border:1px solid grey;width:95%;'>";
// pour ajouter un smiley , rajouter une ligne similaire à celle ci-dessous.
   buttons += emoticonButton("Huh?", "http://www.mysmiley.net/imgs/smile/sign/sign0035.gif");
   buttons += emoticonButton("ored", "http://img193.imageshack.us/img193/2901/redfacea.gif");
   buttons += emoticonButton("kzimir", "http://img193.imageshack.us/img193/1976/kzimir.gif");
   buttons += emoticonButton("nicarao", "http://img193.imageshack.us/img193/9025/nicarao.jpg");
   buttons += emoticonButton("whathasbeenseen", "http://img193.imageshack.us/img193/6093/what20has20been20seen.png");
   buttons += emoticonButton("lectrodz", "http://img193.imageshack.us/img193/6540/lectrodz.jpg");
   buttons += emoticonButton("meriadeck", "http://img130.imageshack.us/img130/601/meriadeck.jpg");
   buttons += emoticonButton("", "http://img704.imageshack.us/img704/2702/implosiondutibia.png");
   buttons += emoticonButton("", "http://img704.imageshack.us/img704/1139/lapattefolle.png");
   buttons += emoticonButton("", "http://img704.imageshack.us/img704/8854/cerveaudawanoel.jpg");
   buttons += emoticonButton("", "http://img39.imageshack.us/img39/4379/miaoulemalin.gif");
   buttons += emoticonButton("", "http://img39.imageshack.us/img39/3904/orly2.jpg");
   buttons += emoticonButton("", "http://img39.imageshack.us/img39/3904/orly2.jpg");
   buttons += emoticonButton("", "http://img39.imageshack.us/img39/5407/siluro.jpg");
   buttons += emoticonButton("", "http://img21.imageshack.us/img21/7362/aloy.jpg");
	buttons += emoticonButton("", "http://img42.imageshack.us/img42/2909/kaiserfleisher.gif");
	buttons += emoticonButton("", "http://img51.imageshack.us/img51/3693/ju1.png");
	buttons += emoticonButton("", "http://img245.imageshack.us/img245/9763/ju2.png");
	buttons += emoticonButton("", "http://img684.imageshack.us/img684/825/ju3.png");
	buttons += emoticonButton("", "http://img690.imageshack.us/img690/6152/ju4.png");
	buttons += emoticonButton("", "http://img51.imageshack.us/img51/1092/ju5.png");
	buttons += emoticonButton("", "http://img707.imageshack.us/img707/2770/ju6.png");
	buttons += emoticonButton("", "http://img691.imageshack.us/img691/3774/ju7.png");
	buttons += emoticonButton("", "http://img18.imageshack.us/img18/5392/redmoa.png");
	buttons += emoticonButton("", "http://img13.imageshack.us/img13/8854/cerveaudawanoel.jpg");
	buttons += emoticonButton("", "http://img12.imageshack.us/img12/796/s3r3g.png");
	buttons += emoticonButton("", "http://img442.imageshack.us/img442/9079/cerveaulent.gif");
    buttons += "</div>";

    bdiv.innerHTML += buttons;
    editbar.appendChild(bdiv);
  }
}

// Create a single emoticon element
function emoticonButton(name, url) {
  if (tagtype=='bbcode')
    return "<span id='IzEmoticons_"+name+"' title='" + name + "' onmousedown='(function() {var rich_edit = document.getElementById(\""+textar+"\");rich_edit.value+=\"[img]"+url+"[/img]\";})();'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
  else
    return "<span id='IzEmoticons_"+name+"' title='" + name + "' onmousedown='(function() {var rich_edit = document.getElementById(\""+textar+"\");rich_edit.value+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

// Create a separator (currently unused)
function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

// Check for a named element (divname) and, if found, initialize the
// corresponding textarea (txtname)
function initEmoticons(divname,txtname) {
  if ( document.getElementById(divname) ) {
    textar = txtname;
    setemoticons(divname);
    return true;
  }
  return false;
}

// Loader for UserScripts "Edit post" Ajax link
function usoEditInit() {
  window.setTimeout(function() {
    initEmoticons("edit","edit_post_body");
  },1000);
}

// MAIN: Check for the textarea to use and initialize it
var textar;    // global variable holding the textarea id
while (true) { // Loop known elements
  if ( window.location.href.match('http://tutoratp1.free.fr/') ) {
    tagtype = 'bbcode';
    ta = document.evaluate("//textarea[@class='post']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   if ( ta.snapshotLength ) {
     ta.snapshotItem(ta.snapshotLength-1).id = 'emoComment';
     ta.snapshotItem(ta.snapshotLength-1).parentNode.id = 'emoDiv';
     initEmoticons('emoDiv','emoComment');
   }
    break;
  }
}

}, false);