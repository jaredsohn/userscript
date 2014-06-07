// ==UserScript==
// @name           Munin filterer
// @namespace      http://userscripts.org/users/63609
// @include        htt*://*/munin/*
// ==/UserScript==
var jqelem = document.createElement('script');
jqelem.src = 'http://jquery.com/src/jquery-latest.js'; jqelem.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jqelem);

function _wait_for_jquery_load() { //wait for jQuery to be interpreted and usable
  if(!unsafeWindow.jQuery)
    window.setTimeout(_wait_for_jquery_load,75);
  else {
    $=unsafeWindow.jQuery; //to be sure (TODO: verify this is necessary)
    
    // The intent is leave only the images that allow a quick, basic overview.
    //  Removes the images for detail statistics but leaves the links,
    //  so that you can still get to the details you'ld want.
    // 
    // This list is preliminary:
    $("img[@src*='inode']").parent().empty();
    $("img[@src*='-open_files']").parent().empty();
    $("img[@src*='-io_bytes']").parent().empty();
    $("img[@src*='-io_ops']").parent().empty();
    $("img[@src*='-io_busy']").parent().empty();
    $("img[@src*='-ntp_']").parent().empty();
    $("img[@src*='-irqstats']").parent().empty();
    $("img[@src*='-interrupts']").parent().empty();
    $("img[@src*='-swap']").parent().empty();
    $("img[@src*='-entropy']").parent().empty();
    $("img[@src*='-vmstat']").parent().empty();
    $("img[@src*='-iostat']").parent().empty();
    $("img[@src*='-processes-']").parent().empty();
    $("img[@src*='-forks']").parent().empty();
    $("img[@src*='-if_eth']").parent().empty();
    $("img[@src*='-if_eri']").parent().empty();
    $("img[@src*='-if_bge']").parent().empty();
    $("img[@src*='-if_err']").parent().empty();
    $("img[@src*='-exim_']").parent().empty();
    $("img[@src*='-postfix_']").parent().empty();
    $("img[@src*='-sendmail_']").parent().empty();
    $("img[@src*='-mysql_slowqueries']").parent().empty();
    $("img[@src*='-mysql_threads']").parent().empty();
    $("img[@src*='-mysql_bytes']").parent().empty();
    $("img[@src*='-mysql_isam']").parent().empty();
    $("img[@src*='-paging_']").parent().empty();
  }
};
_wait_for_jquery_load();