// ==UserScript==
// @name          Stage6 Direct Download
// @namespace     stageme
// @description   A script to add a direct download link to dtage6.fivx.com
// @include       http://stage6.divx.com/*/video/*
// @include       http://stage6.com/*/video/*
// @include       http://www.stage6.divx.com/*/video/*
// @include       http://www.stage6.com/*/video/*
// ==/UserScript==


// script by RIP tuned by me

// Script by me
// email: me
// web: me

window.addEventListener("load", function(e) {

//alert('h');
//*
addarr = location.href.split("/");

id = addarr[addarr.length - 2];
//document.getElementsByTagName("embed")[0].id.match(/\d+/)

//alert(id);

///*
name = addarr[addarr.length - 1];

var ddLink = '<li style="background: url(http://includes.stage6.com/images/video/download.gif) 0px -25px no-repeat;"><a style="background:none;" href=" http://video.stage6.com/' + id + '/' + name + '.divx"  class="vid-channel function" id="video_control_add">Download</a></li>';

codeSnip = document.getElementById("share-video").innerHTML + ddLink;
document.getElementById("share-video").innerHTML = codeSnip;

var embdiv = "<a href='http://video.stage6.com/" + id + "/" + name + ".divx'><img src='http://images.stage6.com/videos/"+id+".jpg' width='100%'/></a>"
//alert(document.getElementById("divx-container"+id).innerHTML);
document.getElementById("divx-container"+id).innerHTML = embdiv;


Modalbox.hide();
//*/
}, false);