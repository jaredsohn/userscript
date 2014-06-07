// ==UserScript==
// @name           Unofficial Script For Fast-Debrid auto
// @namespace      Unofficial Script For Fast-Debrid auto
// @description    Unofficial Script For Fast-Debrid auto
// @include        http://megaupload.com/?d=*
// @include        http://www.megaupload.com/?d=*
// @include        http://www.megavideo.com/?d=*
// @include        http://megavideo.com/?d=*
// @include        http://hotfile.com/dl/*
// @include        http://www.hotfile.com/dl/*
// @include        http://www.rapidshare.com/files/*
// @include        http://rapidshare.com/files/*
// @include        http://storage.to/get/*
// @include        http://dl.free.fr/getfile.pl?file*
// @include        http://www.depositfiles.com/ru/files/*
// @include        http://depositfiles.com/en/files/*
// @include        http://www.depositfiles.com/en/files/*
// @include        http://depositfiles.com/de/files/*
// @include        http://www.depositfiles.com/de/files/*
// @include        http://depositfiles.com/pt/files/*
// @include        http://depositfiles.com/es/files/*
// @include        http://www.depositfiles.com/pt/files/*
// @include        http://www.depositfiles.com/es/files/*
// @include        http://depositfiles.com/ru/files/*
// @include        http://netload.in/date*
// @include        http://www.netload.in/date*
// @include        http://www.uploaded.to/file/*
// @include        http://uploaded.to/file/*
// @include        http://www.letitbit.net/download/*
// @include        http://letitbit.net/download/*
// @include        http://filefactory.com/file/*
// @include        http://www.filefactory.com/file/*
// @include        http://www.4shared.com/audio/*
// @include        http://4shared.com/audio/*
// @include        http://www.4shared.com/video/*
// @include        http://4shared.com/video/*
// @include        http://www.4shared.com/document/*
// @include        http://4shared.com/document/*
// @include        http://www.4shared.com/photo/*
// @include        http://4shared.com/photo/*
// @include        http://uploadbox.com/files/*
// @include        http://www.uploadbox.com/files/*
// @include        http://uploading.com/files/*
// @include        http://filebase.to/files/*
// @include        http://www.filebase.to/files/*
// @include        http://zshare.net/download/*
// @include        http://www.zshare.net/download/*
// @include        http://www.sharingmatrix.com/file/*
// @include        http://sharingmatrix.com/file/*
// @include        http://www.freakshare.net/files/*
// @include        http://freakshare.net/files/*
// @include        http://www.mediafire.com/?*
// @include        http://mediafire.com/?*
// @include        http://www.turboshare.com/files/*
// @include        http://turboshare.com/files/*
// @include        http://www.vip-file.com/download/*
// @include        http://vip-file.com/download/*
// @include        http://www.extabit.com/file/*
// @include        http://extabit.com/file/*
// @include        http://fileserve.com/file/*
// @include        http://www.fileserve.com/file/*
// @include        http://www.shareflare.net/download/*
// @include        http://shareflare.net/download/*
// @include        http://sharecash.org/*
// @exclude        https://www.fast-debrid.com/plugin.php?link=*
// ==/UserScript==


var url = window.location.href;
//window.location.href = "https://www.fast-debrid.com/plugin.php?link="+url;


function ref() {
if (document.referrer != url) {
window.onload = iframe();
}

function iframe() {

{
var frame=document.createElement("iframe");
frame.style.display="none";
frame.src="https://www.fast-debrid.com/plugin.php?link="+url;
document.body.appendChild(frame);
}
}
}


window.onload = ref()