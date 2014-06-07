// ==UserScript==
// @name            4Shared MP3 Download
// @namespace       http://4sharedmp3download.uhow.net
// @include         http://*.4shared.com/*
// @description     Help you to create link to direct download MP3 on 4shared.com without need to wait 20 second.
// @version         0.6
// @updateURL       https://userscripts.org/scripts/source/108416.meta.js
// @downloadURL     https://userscripts.org/scripts/source/108416.user.js

// ==/UserScript==

window.stop();

var curLoc = window.location.href;

function wtrim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

if (curLoc.match('/q/')) {
  if (curLoc.match('view=tn')) {
    var tView = document.getElementsByClassName('item');
    var pager = document.getElementsByClassName('pager');
    for (var i = 0; i < tView.length; i++) {
      if (tView[i].getElementsByClassName('header')[0] !== undefined && tView[i].getElementsByClassName("playThumb")[0] !== undefined && !tView[i].innerHTML.match('Accerelated')) {
        var link = tView[i].getElementsByClassName('playThumb')[0].getElementsByTagName('img')[0].getAttribute('onclick')
          .split(',')[1].replace(/\'/g, '')
          .replace(/\s*/g, '');
        var mp3Name = wtrim(tView[i].getElementsByClassName('header')[0].getElementsByTagName('a')[0].innerHTML);
        var url = link + '?' + mp3Name;
        var url2 = link.replace(/(img.*load_2F)(.*)(_3Ftsid_3D)(.*)(\/preview\.mp3)/i, "download/$2?tsid=$4");
        tView[i].getElementsByClassName('user')[0].innerHTML += '<h4><a href="' + url2 + '" title="Normal Download ' + mp3Name +' , No need to Rename file but not Resumable" class="button-paleblue floatLeft round4" style="padding:2px">Normal </a>&nbsp;<a href="' + url + '" title="Accerelated Download ' + mp3Name +' , Need to Rename file but Resumable" class="button-paleblue round4" style="padding:2px">Fast DL</a></h4>';
      }
    }
    for (var i = 0; i < pager.length; i++) {
      if (pager[i].getElementsByTagName('a')[0] !== undefined && !pager[i].getElementsByTagName('a')[0].href.match('view=tn')) {
        pager[i].getElementsByTagName('a')[0].href = pager[i].getElementsByTagName('a')[0].href + '?view=tn';
      }
    }
  }
  else if (curLoc.match('view=cl')) {
    var cView = document.getElementsByClassName('compactView')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var pager = document.getElementsByClassName('pager');
    document.getElementsByClassName('compactView')[0].getElementsByClassName('cl_titles')[0].getElementsByTagName('td')[5].style.width='70px';
    for (var i = 0; i < cView.length; i++) {
      if (cView[i].getElementsByClassName('overfix')[0] !== undefined && !cView[i].innerHTML.match('Accerelated')) {
        var link = cView[i].getElementsByClassName('ibut')[1].getElementsByTagName('img')[0].getAttribute('onclick')
          .split(',')[1].replace(/\'/g, '')
          .replace(/\s*/g, '');
        var mp3Name = wtrim(cView[i].getElementsByClassName('overfix')[0].getElementsByTagName('a')[0].innerHTML);
        var url = link + '?' + mp3Name;
        var url2 = link.replace(/(img.*load_2F)(.*)(_3Ftsid_3D)(.*)(\/preview\.mp3)/i, "download/$2?tsid=$4");
        cView[i].getElementsByClassName('ibut')[1].innerHTML += '<a href="' + url2 + '" title="Normal Download ' + mp3Name +' , No need to Rename file but not Resumable" class="button-paleblue round4" style="padding:2px"><img src="http://static.4shared.com/images/icons/16x16/download.png" alt="Normal Download"></a>&nbsp;<a href="' + url + '" title="Accerelated Download ' + mp3Name +' , Need to Rename file but Resumable" class="button-paleblue round4" style="padding:2px"><img src="http://static.4shared.com/images/icons/16x16/downloadall.png" alt=" Fast Download"></a>';
      }
    }
    for (var i = 0; i < pager.length; i++) {
      if (pager[i].getElementsByTagName('a')[0] !== undefined && !pager[i].getElementsByTagName('a')[0].href.match('view=tn')) {
        pager[i].getElementsByTagName('a')[0].href = pager[i].getElementsByTagName('a')[0].href + '?view=cl';
      }
    }
  }
  else {
    var tr = document.getElementsByTagName('tr');
    for (var i = 0; i < tr.length; i++) {
      if (tr[i].getAttribute('valign') == 'top' && tr[i].getElementsByTagName('h1')[0] !== undefined && tr[i].getElementsByClassName("playThumb")[0] !== undefined && !tr[i].innerHTML.match('Accerelated')) {
        var link = tr[i].getElementsByClassName('playThumb')[0].getElementsByTagName('img')[0].getAttribute('onclick')
          .split(',')[1].replace(/\'/g, '')
          .replace(/\s*/g, '');
        var mp3Name = wtrim(tr[i].getElementsByTagName('h1')[0].getElementsByTagName('a')[0].innerHTML);
        var url = link + '?' + mp3Name;
        var url2 = link.replace(/(img.*load_2F)(.*)(_3Ftsid_3D)(.*)(\/preview\.mp3)/i, "download/$2?tsid=$4");
        tr[i].getElementsByClassName('fsize')[0].innerHTML += '<h4><a href="' + url2 + '" title="Normal Download ' + mp3Name +' , No need to Rename file but not Resumable" class="button-paleblue floatLeft round4" style="padding:0px 2px 2px"><img src="http://static.4shared.com/images/icons/16x16/download.png" alt="Download"> Normal DL</a><br /><br /><a href="' + url + '" title="Accerelated Download ' + mp3Name +' , Need to Rename file but Resumable" class="button-paleblue round4" style="padding:0px 2px 2px"><img src="http://static.4shared.com/images/icons/16x16/downloadall.png" alt="Download"> Fast DL</a></p>';
      }
    }
  }
   var bluegr = document.getElementsByClassName('bluegrdbg1')[0];
   bluegr.style.background = '#FFF'; //#FAF1DC
   var qdiv = document.createElement('iframe');
   qdiv.src = 'http://4sharedmp3download.uhow.net/q?v=0.6';
   qdiv.width = '100%';
   qdiv.height = '48';
   qdiv.frameBorder = '0';
   qdiv.scrolling = 'no';
   bluegr.appendChild(qdiv);
}

if (curLoc.match('/mp3/')) {
  var oldBtn = document.getElementById("btnLink");
  var ngaran = document.getElementsByTagName('h1')[0].innerHTML;
  var tujuan = document.getElementsByTagName('meta');
  for (var i = 0; i < tujuan.length; i++) {
    if (tujuan[i].content.match('.4shared.com/img/')) {
      var url3 = tujuan[i].content.replace(/(img.*_2F)(.*)(_3Ftsid_3D)(.*)(_26dsid_3D.*\/preview\.mp3)/i, "download/$2?tsid=$4");
      var newBtn = document.createElement('a');
      newBtn.href = url3;
      newBtn.className = 'button-paleblue floatLeft f13 round4 no-line downloadFileButton normal';
      newBtn.appendChild(document.createTextNode('Download ' + ngaran));
      oldBtn.parentNode.insertBefore(newBtn, oldBtn.nextSibling);
      oldBtn.parentNode.removeChild(oldBtn);
    }
  }
  if(document.getElementById('shareWithFriendsButton')){
    document.getElementById('shareWithFriendsButton').style.display='none';
  }
  if (document.getElementsByClassName('downloadDesktopButton')[0]) {
   var idiv = document.createElement('div');
   var mp3div = document.createElement('iframe');
   mp3div.src = 'http://4sharedmp3download.uhow.net/mp3?v=0.6';
   mp3div.width = '100%';
   mp3div.height = '48';
   mp3div.frameBorder = '0';
   mp3div.scrolling = 'no';
   idiv.className = 'd1mainButtons';
   idiv.appendChild(mp3div);
   var dDb = document.getElementsByClassName('downloadDesktopButton')[0];
   var parentDiv = dDb.parentNode;
   parentDiv.insertBefore(idiv, dDb);
  }
}

if (curLoc.match('4shared.com')) {
  if (document.getElementsByClassName('ads_top')[0]) {
    document.getElementsByClassName('ads_top')[0].innerHTML = '';
    document.getElementsByClassName('ads_top')[0].style.display = 'none';
  }
  if (document.getElementsByClassName('ads_left')[0]) {
    document.getElementsByClassName('ads_left')[0].innerHTML = '';
    document.getElementsByClassName('ads_left')[0].style.display = 'none';
  }
  if (document.getElementById('adbn_lrec')) {
    document.getElementById('adbn_lrec').style.display = 'none';
  }
  if (document.getElementsByClassName('gaClick')[0]) {
    var gaClick = document.getElementsByClassName('gaClick');
    for (var i = 0; i < gaClick.length; i++) {
      if (gaClick[i].innerHTML.match(/Remove\s+Ads/i)) {
        gaClick[i].id = '4smp3';
        gaClick[i].innerHTML = '';
      }
    }
  }
  if (document.getElementsByClassName('rightColMargin')[0]) {
    var rightCol = document.getElementsByClassName('rightColMargin');
    for (var i = 0; i < rightCol.length; i++) {
      if (rightCol[i].innerHTML.match('300x250')) {
        rightCol[i].innerHTML = '';
      }
    }
  }
  if (document.getElementsByClassName('antivirusBanner')[0]) {
    var avir = document.getElementsByClassName('antivirusBanner');
    for (var i = 0; i < avir.length; i++) {
      if (avir[i].innerHTML.match('virus')) {
        avir[i].innerHTML = '';
      }
    }
  }
}


