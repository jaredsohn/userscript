// ==UserScript==
// @name           Hudson Build On Build Result Pages
// @namespace      http://enjoyxstudy.com/
// @description    build command and history on build pages.
// @author         onozaty
// @include        http://localhost:8080/job/*
// ==/UserScript==
(function(){

  var w = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

  var baseURL = /^(.+)\/job\//.exec(location.href)[1];
  var jobURL  = /^(.+\/job\/.+)\/[0-9]+/.exec(location.href)[1];
  var imgURL  = /^(.+\/images)\//.exec(document.getElementById('tasks').getElementsByTagName('img')[0].src)[1];

  // build link
  var buildScript = 'javascript:new Ajax.Request("' + jobURL + '/build?delay=0sec", {method:"post"});'
               + 'hoverNotification("Build scheduled",document.getElementById("tasks").lastChild);'
               + 'void(0);';

  buildLinkDiv = document.getElementById('tasks').appendChild(document.createElement('div'));
  buildLinkDiv.className = 'task';

  var buildLink1 = document.createElement('a');
  buildLink1.href = buildScript;
  var buildImg = buildLink1.appendChild(document.createElement('img'));
  buildImg.src = imgURL + '/24x24/clock.gif';
  buildImg.style.margin = '2px';
  buildLinkDiv.appendChild(buildLink1);

  var buildLink2 = document.createElement('a');
  buildLink2.appendChild(document.createTextNode('Build Now'));
  buildLink2.href = buildScript;
  buildLink2.style.marginLeft = '4px';
  buildLinkDiv.appendChild(buildLink2);

  // build history
  var historyWrapper = document.createElement('div');
  document.getElementById('navigation').appendChild(historyWrapper);

  GM_xmlhttpRequest({
    method: 'get',
    overrideMimeType: 'text/plain; charset=utf-8',
    url: jobURL + '/buildHistory/',
    onload: function(res){
      historyWrapper.innerHTML = res.responseText;
      var buildHistory = document.getElementById('buildHistory');
      var imgs = buildHistory.getElementsByTagName('img');
      for (var i =0, len = imgs.length; i < len; i++) {
        imgs[i].src = imgURL + imgs[i].src.substr(baseURL.length);
      }

      w.updateBuildHistory(jobURL + '/buildHistory/ajax', buildHistory.rows.length - 1);
    }
  });

})();
