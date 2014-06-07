
// ==UserScript==
// @name          getPink
// @description    Rewrite filehost links to getPink links
// @author        X0rbit
// @include        http://*
// @version        0.2b
// ==/UserScript==

function gp_replace_links() {
  var obj = document.getElementsByTagName('body')[0];
  var body = obj.innerHTML;

  body = body.replace(/http:\/\/rapidshare.com\/files\//g, 'http://getpink.net/rapidshare.com/files/');
  body = body.replace(/http:\/\/www.rapidshare.com\/files\//g, 'http://getpink.net/rapidshare.com/files/');
  body = body.replace(/http:\/\/netload.in\/date/g, 'http://getpink.net/netload.in/date');
  body = body.replace(/http:\/\/www.netload.in\/date/g, 'http://getpink.net/netload.in/date');
  body = body.replace(/http:\/\/fileserve.com\/file\//g, 'http://getpink.net/fileserve.com/file/');
  body = body.replace(/http:\/\/www.fileserve.com\/file\//g, 'http://getpink.net/fileserve.com/file/');
  body = body.replace(/http:\/\/hotfile.com\/dl\//g, 'http://getpink.net/hotfile.com/dl/');
  body = body.replace(/http:\/\/www.hotfile.com\/dl\//g, 'http://getpink.net/hotfile.com/dl/');
  body = body.replace(/http:\/\/megaupload.com\/\?d=/g, 'http://getpink.net/megaupload.com/?d=');
  body = body.replace(/http:\/\/www.megaupload.com\/\?d=/g, 'http://getpink.net/megaupload.com/?d=');
  body = body.replace(/http:\/\/sharecash.org\/download.php\?file=/g, 'http://getpink.net/sharecash.org/download.php?file=');
  body = body.replace(/http:\/\/www.sharecash.org\/download.php\?file=/g, 'http://getpink.net/sharecash.org/download.php?file=');
  body = body.replace(/http:\/\/megavideo.com\/\?v=/g, 'http://getpink.net/megavideo.com/?v=');
  body = body.replace(/http:\/\/www.megavideo.com\/\?v=/g, 'http://getpink.net/megavideo.com/?v=');
  body = body.replace(/http:\/\/megavideo.com\/\?d=/g, 'http://getpink.net/megavideo.com/?d=');
  body = body.replace(/http:\/\/www.megavideo.com\/\?d=/g, 'http://getpink.net/megavideo.com/?d=');

    if (obj.innerHTML != body) {
      obj.innerHTML = body;
  }
}

gp_replace_links();