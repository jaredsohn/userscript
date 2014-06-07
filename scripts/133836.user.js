// ==UserScript==
// @name         m2o Reloaded DownloadHelper
// @namespace    m2o_reloaded_downloadhelper.suxsem.org
// @include      http://www.m2o.it/reloaded/index.php*
// @include      http://m2o.it/reloaded/index.php*
// @author       Suxsem
// @description  Use this script to easily download podcasts from m2o reloaded.
// ==/UserScript==

var html = document.body.innerHTML;
var url = html.substring(html.indexOf('src="http://download.m2o.it/reloaded/')+'src="http://download.m2o.it/reloaded/'.length, html.indexOf('" type="audio/mp3"'));
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<a href="http://download.m2o.it/reloaded/'+url+'" target="_blank">Right click on this link and click on "Save as" to download the Podcast!</a><br>';
var elmFoo = document.getElementById('mep_0');
elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);