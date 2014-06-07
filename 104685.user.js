// ==UserScript==
// @name           MangaTraders - Colorize Downloads
// @version        1.2
// @author         telja
// @namespace      http://userscripts.org/
// @description    Colorize downloadlinks according to which server it is on (1-6,all)
// @include        http://www.mangatraders.com/manga/series/*
// @include        http://mangatraders.com/manga/series/*
// @include        http://www.mangatraders.com/profile/*
// @include        http://mangatraders.com/profile/*
// @include        http://www.mangatraders.com/releases/*
// @include        http://mangatraders.com/releases/*
// @grant none
// ==/UserScript==

// v1.0.1
// - Added 'all' server
// - lowercases the servername found in the alt text for image.
// - added usage information as the default for mangatraders is to use the flash-
//   based filelist (which cannot be colored).
// v1.0.2
// - can swap the servernumber image for text.
// v.1.1
// - can colorize the watch list (the one at http://www.mangatraders.com/profile/xxxxx
//   on the Watch List tab)
// - can colorize the releases list
// - no longer requires classic view
// v.1.2
// - can set the foreground color by adding a "foreground" property (or changing
//   it if it already exists) to serverColors[x]. Items without a foreground property
//   won't change the textcolor.
//   example: {server:'dl1',background:"#ffc3ce",foreground:"#000000"}
// - added grant statement
//   added dl6 server
(function() {
  // Servername must be lowercase!
  var serverColors=new Array(
  {server:'dl1',background:"#ffc3ce"},
  {server:'dl2',background:"#c7fbc8"},
  {server:'dl3',background:"#fff2d7"},
  {server:'dl4',background:"#e0ffff"},
  {server:'dl5',background:"#e6e6fa"},
  {server:'dl6',background:"#ffcaff"},
  {server:'all',background:"#e0e0e0"}
  );
  // If true, replaces the servernumber image with text.
  var replaceServerImage=false;
  // If true, colorizes the watched list.
  var colorizeWatchList=true;
  var colorizeReleases=true;
  // Style for servernumber text. Default is bolded black text.
  var replaceTextStyle='font-weight:700;color:#000000;margin-left:2px;margin-right:2px;';

  // ---- Do not edit below this line
  var docpath=document.location.pathname;
  function SetChildsTextColor(node,color){
    if(node){
      var nodes=node.querySelectorAll('td,a');
      if (nodes){
        for(var x=0;x<nodes.length;x++){
          nodes[x].style.color=color;
        }
      }
    }
  }

  function ServerColor(node){
    var alt;
    if (node){
      alt=node.getAttribute('alt');
      if (alt){
        alt=alt.toLowerCase();
        for(var x=0;x<serverColors.length;x++){
          if (alt==serverColors[x].server){
            var stylestr;
            node.setAttribute('title','Server: '+serverColors[x].server.toUpperCase());
            node.parentNode.parentNode.style.background=serverColors[x].background;
            if (serverColors[x].foreground) SetChildsTextColor(node.parentNode.parentNode,serverColors[x].foreground);
            if (replaceServerImage){
              var itm;
              itm=document.createElement('span');
              if (itm){
                itm.setAttribute('style',replaceTextStyle);
                itm.setAttribute('title','Server: '+serverColors[x].server.toUpperCase());
                itm.textContent=serverColors[x].server.replace(/^dl/,'');
                node.parentNode.replaceChild(itm,node);
              }
            }
            break;
          }
        }
      }
    }
  }

  function NodeInsertedListener(e){
    if (e.target){
      if (e.target.nodeName.toLowerCase()=='img'){
        ServerColor(e.target);
      }
    }
  }

  if ((colorizeWatchList) && (docpath.search(/\/profile\/\d+/i)>=0)){
    var watchedElement;
    watchedElement=document.querySelector('div#watched');
    if (watchedElement){
      watchedElement.addEventListener('DOMNodeInserted',NodeInsertedListener,false);
    }
  } else if ((colorizeReleases) && (docpath.search(/\/releases/i)>=0)){
    var nodes=document.querySelectorAll('div#dataTable table > tbody > tr > td > img');
    if ((nodes)&&(nodes.length>0)){
      for (var i=0;i<nodes.length;i++){
        ServerColor(nodes[i]);
      }
    } else{
      var releasesElement;
      releasesElement=document.querySelector('div#dataTable');
      if (releasesElement){
        releasesElement.addEventListener('DOMNodeInserted',NodeInsertedListener,false);
      }
    }
  } else {
    var nodes=document.querySelectorAll('div#files table > tbody > tr > td > img');
    if ((nodes)&&(nodes.length>0)){
      for (var i=0;i<nodes.length;i++){
        ServerColor(nodes[i]);
      }
    } else{
      var filesElement;
      filesElement=document.querySelector('div#files');
      if (filesElement){
        filesElement.addEventListener('DOMNodeInserted',NodeInsertedListener,false);
      }
    }
  }
})();