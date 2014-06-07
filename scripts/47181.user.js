// ==UserScript==
// @name           ACG Forum View B
// @namespace      forumview
// @description    A dirty hack: provides links to the printable version of threads; currently works on vbulletin, discuz and phpwind, which should cover 90% of major acg forum. (deprecated)
// @include        http://*.popgo.net/bbs/forumdisplay.php*
// @include        http://popgo.net/bbs/forumdisplay.php*
// @include        http://bbs.saraba1st.com/*thread*
// @include        http://www.saraba1st.com/*thread*
// @include        http://www.stage1st.com/*thread*
// @include        http://www.sarabalst.com/*thread*
// @include        http://bbs.sumisora.com/thread*
// @include        http://www.sumisora.com/bbs/thread*
// @include        http://www.lightnovel.cn/forum.php?mod=forumdisplay*
// @version        1.2.2.9.1
// ==/UserScript==


function forumprint(event){
  Items = document.getElementsByTagName('a');
  //vbulletin
  rexa = /showthread\.php/i;
  rexb = /goto|pagenumber|page|post/i;
  //discuz
  rexc = /thread-/i;
  rexd = /-1-(.+?)\.html/i;
  rexe = /forum\.php/i;
  rexf = /page/i;
  rexz = /printable/i;
  //phpwind
  rexg = /read\.php/i;
  rexh = /-page-|\&page|thread/i;
  rexi = /read-htm-tid/i;
  rexj = /a_ajax/i;
  rexy = /_blank/i;
  //discuz nt
  rexl = /showtopic-/i;
  rexm = /archiver/i;
  var i = 0;

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
    if(rexc.test(thread.href) && rexd.test(thread.href)) {
      var url = thread.href.replace(/thread/i, "archiver/tid");
      url = url.replace(/-1-(.+?)\.html/i,".html")
      var urla = thread.href.replace(/thread-/i, "forum.php?mod=viewthread&action=printable&tid=");
      urla = urla.replace(/-1-(.+?)\.html/i,"")
      var newnode = thread.parentNode;
      var newlink = document.createElement('a');
      var newlinka = document.createElement('a');
      newlink.href = url;
      newlink.target = '_blank';
      newlink.appendChild(document.createTextNode('[archive]'));
      newlinka.href = urla;
      newlinka.target = '_blank';
      newlinka.appendChild(document.createTextNode('[print]')); 
      if(newnode.id != "" 
      || newnode.getAttribute('class') == "common" 
      || newnode.getAttribute('class') == "new" 
      || newnode.getAttribute('class') == "lock") {
        newnode.appendChild(newlink);
        newnode.appendChild(newlinka);
      }
    }//http://www.lightnovel.cn/forum.php?mod=viewthread&tid=345281&extra=page%3D1%26orderby%3Dlastpost
    if(rexe.test(thread.href) && rexf.test(thread.href) && !rexz.test(thread.href)) {
      var url = thread.href.replace(/forum\.php\?mod=viewthread&tid=/i, "archiver/tid-");
      url = url.replace(/\&extra/i, ".html?&extra");
      var urla = thread.href.replace(/=viewthread&tid=/i, "=viewthread&action=printable&tid=");
      var newnode = thread.parentNode;
      var newlink = document.createElement('a');
      var newlinka = document.createElement('a');
      newlink.href = url;
      newlink.target = '_blank';
      newlink.appendChild(document.createTextNode('[archive]'));
      newlinka.href = urla;
      newlinka.target = '_blank';
      newlinka.appendChild(document.createTextNode('[print]')); 
      if(newnode.id != "" 
      || newnode.getAttribute('class') == "common" 
      || newnode.getAttribute('class') == "new" 
      || newnode.getAttribute('class') == "lock") {
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
      if (( rexj.test(thread.id) || !rexy.test(thread.target) ) && newnode.getAttribute('class') != "tpage") {
        newnode.appendChild(newlink);
      }
    }
    //discuz nt
    //to do
    i++;
  }
}

forumprint();