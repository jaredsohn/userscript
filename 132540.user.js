    // ==UserScript==
// @name           Highlight torrent Links
// @namespace    http://userscripts.org/scripts/show/132540
// @author         AnyouLai
// @version        ∞
// @description    Highlights torrent Links
// @include        *
// @exclude        http://www.akiba-online.com/*
// @exclude        http://www.nyaa.eu/*
// @exclude        http://rapidshare.com/*
// @exclude        http://rapidshare.de/*
// @exclude        http://*.rapidshare.com/*
// @exclude        http://*.rapidshare.de/*
// @exclude        http://www.filefactory.com/*
// @exclude        http://filefactory.com/*
// @exclude        http://www.megaupload.com/*
// @exclude        http://megaupload.com/*
// @exclude        http://www.megarotic.com/*
// @exclude        http://megarotic.com/*
// @exclude        http://www.megaporn.com/*
// @exclude        http://megaporn.com/*
// @exclude        http://www.megavideo.com/*
// @exclude        http://megavideo.com/*
// @exclude        http://www.netload.in/*
// @exclude        http://netload.in/*
// @exclude        http://www.hotfile.com/*
// @exclude        http://hotfile.com/*
// @exclude        http://www.depositfiles.com/*
// @exclude        http://depositfiles.com/*
// @exclude        http://www.uploading.com/*
// @exclude        http://uploading.com/*
// @exclude        http://*mediafire.com/*
// @exclude        http://*megashares.com/*
// @exclude        http://*rapidshare.de/*
// @exclude        http://*netload.in/*
// @exclude        http://*crocko.com/*
// @exclude        http://*vip-file.com/*
// @exclude        http://*yourfilehost.com*
// @exclude        http://*sendspace.com*
// @exclude        http://*letitbit.net*
// @exclude        http://*zshare.net*
// @exclude        http://*uploadbox.com*
// @exclude        http://*vip-file.com*
// @exclude        http://*bitroad.net*
// @exclude        http://*link-protector.com*
// @exclude        http://*duckload.com*
// @exclude        http://*filepost.com*
// @exclude        http://*x7.to*
// @exclude        http://*turbobit.net/*
// @exclude        *xml_dump.php*
// @exclude        *phpMyAdmin*
// @exclude        *deleterecord.php*
// @exclude        http://www.google.com/reader/view/*cgi.4chan.org*
// @exclude        http://*extabit.com*
// @exclude        http://*shareflare.net*
// @exclude        http://*solidfile.com*
// @exclude        http://*gigapeta.com*
// @exclude        http://*rayfile.com*
// @exclude        http://rlc.hostei.com/rlc_server_side*
// @exclude        http://*turboshare.com*
// @exclude        http://*freakshare.net*
// @exclude        http://*freakshare.com*
// @exclude        http://*fileserve.com*
// @exclude        http://*narod.ru/disk/*
// @exclude        http://*files.mail.ru*
// @exclude        http://*enigmashare.com*
// @exclude        http://*filesonic.com*
// @exclude        http://bitshare.com*
// @exclude        http://cramit.in*
// @exclude        http://sharejunky.in*
// @exclude        http://veehd.com*
// @exclude        http://keepfile.com*
// @exclude        http://www.usershare.com*
// @exclude        http://oron.com*
// @exclude        http://www.imdb.com/list/*
// @exclude        http://filejungle.com*
// @exclude        http://www.wupload.com*
// @exclude        http://wupload.com*
// @exclude        http://*imdb*plotsummary
// ==/UserScript==

/*
Crayon Color
Red    = #FF6666
Orange = #FFCC66
Yello  = #FFFF66
Green  = #66FF66
Blue   = #66CCFF
Indigo = #5D76CB
Violet = #CC66FF
*/

var theLinks = document.links;
for(i=0; i<theLinks.length; i++) {
/* ============================== torrent ==============================*/
   if(theLinks[i].href.toLowerCase().indexOf('jptorrent.org/') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66FF66';
}
   if(theLinks[i].href.toLowerCase().indexOf('jandown.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66FF66';
}
   if(theLinks[i].href.toLowerCase().indexOf('mimima.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66FF66';
}
   if(theLinks[i].href.toLowerCase().indexOf('thepiratebay.org') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66FF66';
}
   if(theLinks[i].href.toLowerCase().indexOf('isohunt.com/torrent') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66FF66';
}
   if(theLinks[i].href.toLowerCase().indexOf('bitsnoop.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66FF66';
}   

/* ============================== TinyURL ==============================*/    
   if(theLinks[i].href.toLowerCase().indexOf('adf.ly') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#5D76CB';
}

/* ============================== forums ==============================*/    
   if(theLinks[i].href.toLowerCase().indexOf('nyaa.eu') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66CCFF';
}
   if(theLinks[i].href.toLowerCase().indexOf('nyaatorrents.org/?page') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66FF66';
}    
   if(theLinks[i].href.toLowerCase().indexOf('akiba-online') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66CCFF';
}
   if(theLinks[i].href.toLowerCase().indexOf('anime-sharing') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#66CCFF';
}

/* ==============================  BLOG  ==============================*/     
   if(theLinks[i].href.toLowerCase().indexOf('blogspot.jp') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FFCC66';
}  
   if(theLinks[i].href.toLowerCase().indexOf('torrent0av.blog.fc2.com/blog-entry') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FFCC66';
}     
   if(theLinks[i].href.toLowerCase().indexOf('idolex.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FFCC66';
}    
   if(theLinks[i].href.toLowerCase().indexOf('rula.us') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FFCC66';
}

/* ==============================   DDL   ==============================*/
   if(theLinks[i].href.toLowerCase().indexOf('rapidgator.net') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
    if(theLinks[i].href.toLowerCase().indexOf('rapidshare') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
   if(theLinks[i].href.toLowerCase().indexOf('filefactory.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
    if(theLinks[i].href.toLowerCase().indexOf('netload.in') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
   if(theLinks[i].href.toLowerCase().indexOf('hotfile.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
    if(theLinks[i].href.toLowerCase().indexOf('depositfiles.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
   if(theLinks[i].href.toLowerCase().indexOf('uploading.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
    if(theLinks[i].href.toLowerCase().indexOf('mediafire.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
    if(theLinks[i].href.toLowerCase().indexOf('vip-file.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('yourfilehost.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('sendspace.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('letitbit.net') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('zshare.net') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('uploadbox.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('bitroad.net') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('duckload.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('filepost.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('x7.to') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('turbobit.net') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('rayfile.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('turboshare.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('freakshare') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('fileserve.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('filesonic.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('bitshare.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('cramit.in') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('oron.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('wupload.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('filejungle.com') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}    if(theLinks[i].href.toLowerCase().indexOf('btbbt.biz') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FF6666';
}
}