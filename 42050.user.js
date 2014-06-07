// ==UserScript==
// @name           ACG Forum View
// @namespace      forumview
// @description    A dirty hack: provides links to the printable version of threads; currently works on vbulletin, discuz and phpwind, which should cover 90% of major acg forum. (deprecated)
// @include        http://*.popgo.net/bbs/forumdisplay.php*
// @include        http://popgo.net/bbs/forumdisplay.php*
// @include        http://bbs.saraba1st.com/forum*
// @include        http://www.saraba1st.com/forum*
// @include        http://bbs.sumisora.com/thread*
// @include        http://www.sumisora.com/bbs/thread*
// @version        1.2.2
// ==/UserScript==

function forumprint(event){
  Items = document.getElementsByTagName('a');
  //vbulletin
  rexa = /showthread\.php/i;
  rexb = /goto|pagenumber|page|post/i;
  //discuz
  rexc = /thread-/i;
  rexd = /-1-1\.html/i;
  rexe = /viewthread\.php/i;
  rexf = /page/i;
  //phpwind
  rexg = /read\.php/i;
  rexh = /page|thread/i;
  rexi = /read-htm-tid/i;
  rexj = /a_ajax/i;
  //discuz nt
  rexl = /showtopic-/i;
  rexm = /archiver/i;
  var i = 0;
  //quick fix to avoid looping forever, not fixing the actual problem...
  while (i < Items.length && i < 1000) {
    var thread = Items[i];
    //vbulletin
    if(rexa.test(thread.href) && !rexb.test(thread.href)) {
      var url = thread.href.replace(/showthread\.php\?/i, "printthread.php?perpage=500&");
      var newnode = thread.parentNode.parentNode;
      var newlink = document.createElement('a');
      newlink.href = url;
      newlink.target = '_blank';
      newlink.appendChild(document.createTextNode('[print]'));
      if(newnode.id == "") {
        newnode.appendChild(newlink);
      }
    }
    //discuz
    if((rexc.test(thread.href) && rexd.test(thread.href)) || (rexe.test(thread.href) && rexf.test(thread.href))) {
      var url = thread.href.replace(/thread/i, "archiver/tid");
      var urla = thread.href.replace(/thread-/i, "viewthread.php\?action=printable&tid=");
      var urla = urla.replace(/-1-1\.html/i,"")
      var newnode = thread.parentNode;
      var newlink = document.createElement('a');
      var newlinka = document.createElement('a');
      newlink.href = url;
      newlink.target = '_blank';
      newlink.appendChild(document.createTextNode('[archive]'));
      newlinka.href = urla;
      newlinka.target = '_blank';
      newlinka.appendChild(document.createTextNode('[print]')); 
      if(newnode.id !== "") {
        newnode.appendChild(newlink);
        newnode.appendChild(newlinka);
      }
    }
    //phpwind
    if((rexg.test(thread.href) && !rexh.test(thread.href)) || (rexi.test(thread.href) && !rexh.test(thread.href))) {
      var url = thread.href.replace(/read\.php\?tid\=/i, "simple/index.php\?t");
      var url = url.replace(/read\.php\?tid\-/i, "simple/index.php\?t");
      var url = url.replace(/read-htm-tid-/i, "simple/index.php\?t");
      var url = url.replace(/\.html/i, "");
      url += "\.html"; 
      var newnode = thread.parentNode;
      var newlink = document.createElement('a');
      newlink.href = url;
      newlink.target = '_blank';
      newlink.appendChild(document.createTextNode('[simple]'));
      if(rexj.test(thread.id)) {
        newnode.appendChild(newlink);
      }
    }
    //discuz nt
    //to do
    i++;
  }
}

forumprint();