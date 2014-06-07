// ==UserScript==
// @name	books24x7_get_chapter
// @namespace	http://zhangtai.me
// @description	Change fonts on books24x7
// @author	Zhang Tai
// @version	1.1
// @include	http://www.books24x7.com/toc.aspx*
// ==/UserScript==

$(document).ready(function(){
    // Load jquery
    var script = document.createElement("script");
      script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
      script.addEventListener('load', function() {
        var script = document.createElement("script");
        document.body.appendChild(script);
      }, false);
      document.body.appendChild(script);
    
    // Add get chapter button
    $('#FullText6').append('<button id="btn-get-chapter">Get Chapter</button>"');
    $('#btn-get-chapter').click(function() { 
      var chapIDs = new Array();
      $('.b24-chaptertoc').each(function(){
        chapIDs.push($(this).attr('id'));
      });
    
      // Load the contents
      for (var i = 0; i < chapIDs.length; i++) {
        $('#' + chapIDs[i] + ' a:has(span)').each(function(){
          pageURL = $(this).attr('href');
          chunkid = pageURL.match(/\d{9}$/g);
          $('#TOCAnnotationAnchor').append("<div id='" + chunkid + "'></div>");
          $('#' + chunkid).load( pageURL + ' #ctl00_ContentPlaceHolder1_ContentPanel');
        });
      }
      return false;
    });
});