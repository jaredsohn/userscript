// ==UserScript==
// @name           Own3d.tv vod downloader
// @namespace      own3dtvdlbyjarppa
// @description    Adds download link to own3d.tv vods
// @include        http://www.own3d.tv/video/*
// ==/UserScript==


function getdlurl() {
  var baseregexp = new RegExp(/baseUrl:'(.+)',/);
  var hqurlregexp = new RegExp(/HQUrl: '(.+)',/);
  var queryregexp = new RegExp(/queryString: escape[(]['][?](.+)[&]ec_seek[=]/);
  
  var jscripts = document.getElementsByTagName('script');
  jscripts = jscripts[jscripts.length-2];
  var baseurl = baseregexp.exec(jscripts.innerHTML)[1];
  var hqurl = hqurlregexp.exec(jscripts.innerHTML)[1];
  var query = queryregexp.exec(jscripts.innerHTML)[1];
  var dlurl = baseurl + hqurl + "?" + query;
  return dlurl;
}

function startup() {
  var container = document.getElementById('GLOBAL-left-container');
  container = container.getElementsByTagName('div')[0];
  container = container.getElementsByTagName('div')[0];
  container = container.getElementsByTagName('div')[0];
  container.setAttribute('style','padding-left:30px; padding-right: 30px; height:auto; width:900px; margin-bottom:10px;');
  container = container.getElementsByTagName('div')[0];
  var dlurl = getdlurl();
  container.innerHTML = '<a class="sharebtn rounded" href=' + dlurl + '" style="margin-right: 30px; width:70px;">Download</a>' + container.innerHTML;
//  alert(container.innerHTML);
//  alert(jscripts.innerHTML);
}

window.addEventListener(
    'load', 
    function() { startup();},
    true);