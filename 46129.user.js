// ==UserScript==
// @name          iNaturalist Taxonomic Flickr Tagger
// @description   Adds a link to the iNaturalist Taxonomic Flickr Tagger to Flickr photo pages.
// @namespace     http://inaturalist.org/taxa/flickr_tagger
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// Based upon "Flickr on Black" by Simon Whitaker 
// (http://userscripts.org/scripts/show/9523).
// This script is also available on GitHub: 
// http://github.com/kueda/inat-taxonomic_flickr_tagger/
// ==/UserScript==

// The MIT License
// 
// Copyright (c) 2009 Ken-ichi Ueda
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(
  function(){
    if (document.getElementById("photo-sidebar-tags") && document.getElementById('thetags-wrapper')) {
      pid = location.pathname.split('/')[3];

      var container = document.createElement("div");
      container.setAttribute("id", "taxaonomictagadder");
      container.setAttribute("style", "margin-top: 10px");
      var link = '<a href="http://inaturalist.org/taxa/flickr_tagger?flickr_photo_id=' + pid + '" style="text-decoration: none;" target="_new">Add taxonomic tags from iNaturalist.org</a>';
      container.innerHTML = link;

      var tagList = document.getElementById('thetags-wrapper');
      tagList.appendChild(container);
    }
  }
)();
