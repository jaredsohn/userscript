// ==UserScript==
// @name           vkontakte duplicate track remover mod
// @namespace      http://vkontakte.ru
// @description    Removes duplicate tracks on pages containing audio on vkontakte.ru
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

function isDuplicate(id, all) {

  var title = trim(document.getElementById("title"+id).textContent.toLowerCase());
  var artist = trim(document.getElementById("performer"+id).textContent.toLowerCase());
  var duration = document.getElementById("title"+id).parentNode.nextSibling.textContent;
  var str = document.getElementById("imgbutton"+id).getAttribute("onclick");

  // return operate(68772826,4430,1127854,'6f9f06e44c00',466)
  // return operate(68772826,'http://cs4430.vkontakte.ru/u1127854/audio/6f9f06e44c00.mp3',466);
  var re = /['|\/]([0-9a-zA-Z]{12})['|\.]/;
  var arr = re.exec(str);
  if(!arr){
    return false;
  }
  var track_id = arr[1];

  for (var i=0; i<all.length; i++)
  {
    var item = all[i];
    if ((trim(item.title.toLowerCase())==title && trim(item.artist.toLowerCase())==artist && item.duration==duration) || item.track_id==track_id) return true;
  }
  
  all.push({"artist":artist, "title":title, "duration":duration, "track_id":track_id});
  
  return false;
}



function removeDuplicates() {
  var allSongs = [];

  var parent = document.getElementById("audios");   
  if (!parent) {
    parent = document.getElementById("results");
  }
  if(parent){
    var audios = parent.getElementsByTagName("div");
    re=/audio(\d+)/;
    var duplicates = [];
    for (var i=0;i<audios.length;i++) {
      var m = audios[i].id.match(re);
      if (!m) continue;
      var id = m[1];
      if (isDuplicate(id, allSongs)) {
        duplicates.push(id);
        continue;
      }
    }
    var duplicatesCount = 0;
    for(var i in duplicates){
      var audioDiv = document.getElementById("audio"+duplicates[i]);
      if(audioDiv){
        audioDiv.parentNode.removeChild(audioDiv);
        duplicatesCount++;
      }
    }
    var msg = " Удалено " + duplicatesCount + " дубликатов.";
    var searchSummary = document.getElementById("searchSummary");
    if (searchSummary) {
      searchSummary.innerHTML += msg;
    }
  }
}

function trim(string) {
  return string.replace(/(^\s+)|(\s+$)/g, "");
}

removeDuplicates();
