// ==UserScript==
// @name           The BBCode Package 1.1
// @namespace      The Scripter
// @description    Enable images, Youtube, and Scratch projects for the Swell Forums.
// @include        http://the-swell-forums.punbb-hosting.com/viewtopic.php*
// ==/UserScript==
if (document.URL.indexOf('http://the-swell-forums.punbb-hosting.com/viewtopic.php') != -1) {

//replace img tags
 var bodyElement = document.getElementsByTagName("body")[0];
 var bodyInner = bodyElement.innerHTML;
 var imageurls = new Array();
 for (i=0;i<bodyInner.split(/\[img\]/i).length-1;i++) {
  imageurls[i] = bodyInner.split(/\[img\]/i)[i+1].split(/\[\/img\]/i)[0];
  if (imageurls[i].replace(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/i, "") != "") {
   imageurls[i] = 'http://img94.imageshack.us/img94/6045/invalidimage.png';
  }
 }
 var addImages = bodyInner;
 for (i=0;i<imageurls.length;i++) {
  addImages = addImages.replace(/\[img\](http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?\[\/img\]/i, '<img style="max-width: 510px;" src="' + imageurls[i] + '" />');
 }
 
 //replace youtube tags
 var youtubeids = new Array();
 for (i=0;i<addImages.split(/\[youtube\]/i).length-1;i++) {
  youtubeids[i] = addImages.split(/\[youtube\]/i)[i+1].split(/\[\/youtube\]/i)[0];
  if (youtubeids[i].replace(/[a-zA-Z0-9\-_]+/, "") != "") {
   youtubeids[i] = 'dQw4w9WgXcQ';
  }
 }
 var addYoutube = addImages;
 for (i=0;i<youtubeids.length;i++) {
  addYoutube = addYoutube.replace(/\[youtube\]([a-zA-Z0-9\-_]+)\[\/youtube\]/i, '<iframe width="510" height="315" src="http://www.youtube.com/embed/' + youtubeids[i] + '"frameborder="0" allowfullscreen></iframe>');
 }
 
//replace project tags
  var projectpath = new Array();
 for (i=0;i<addYoutube.split(/\[scratch=flash\]/i).length-1;i++) {
  projectpath[i] = addYoutube.split(/\[scratch=flash\]/i)[i+1].split(/\[\/scratch\]/i)[0];
  if (projectpath[i].replace(/[a-zA-Z0-9]+\/[0-9]+/i, "") != "") {
   projectpath[i] = 'Mike16112/675815';
  }
 }
 var addProjects = addYoutube;
 for (i=0;i<projectpath.length;i++) {
  addProjects = addProjects.replace(/\[scratch=flash\]([a-zA-Z0-9]+\/[0-9]+)\[\/scratch\]/i, '<object width="483" height="387" type="application/x-shockwave-flash" data="http://scratch.mit.edu/static/misc/PlayerOnly.swf"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="flashvars" value="project=http://scratch.mit.edu/static/projects/' + projectpath[i] + '.sb?version=1"></object>');
 }
 document.getElementsByTagName("body")[0].innerHTML = addProjects;