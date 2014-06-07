// ==UserScript==
// @name        download rtfd
// @description add download buttons(pdf, epub) to readthedocs.org docs
// @namespace   http://notimportant.org
// @homepage    http://notimportant.org
// @author      Sean Lee
// @include     http://*.readthedocs.org/en/*
// @include     http://readthedocs.org/docs/*
// @version     0.0.2
// ==/UserScript==

addDownloadLink = function() {
  var getUrl,
      projectName,
      epubUrl,
      pdfUrl;
  getProjectName = function() {
    var url = window.location.href;
    var firstPart = window.location.host.split('.')[0];
    if (firstPart === 'readthedocs') {
      return url.split('/')[4];
    }
    else {
      return firstPart;
    }
  };

  getUrl = function(format, projectName) {
      return "http://media.readthedocs.org/" + format + "/" +
            projectName + "/latest/" + projectName + "." + format;
    };

  projectName = getProjectName();
  epubUrl = getUrl('epub', projectName);
  pdfUrl = getUrl('pdf', projectName);

  $link = $('<li class="right"><a href="' + pdfUrl +'" >PDF</a></li>'+
            '<li class="right"><a href="' + epubUrl +'" >ePub</a></li>');

  $('.related ul').append($link);


};
// Content Script Injection, see http://wiki.greasespot.net/Content_Script_Injection
function contentEval( source ) {
    if ('function' == typeof source) {
        source = '(' + source + ')();';
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(addDownloadLink);