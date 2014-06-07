// ==UserScript==
// @name           Travian: notes
// @Author         jf
// @email          szoftverhiba@gmail.com
// @namespace      http://userscripts.org
// @version        7.12.25
// @include        http://*.travian.*/dorf1.php*
// @include        http://*.travian.*/dorf2.php*
// @include        http://*.travian.*/karte.php*
// @include        http://*.travian.*/karte2.php*
// @include        http://*.travian.*/statistiken.php*
// @include        http://*.travian.*/berichte.php*
// @include        http://*.travian.*/nachrichten.php*
// @exclude        http://forum.travian.*
// ==/UserScript==

var reg = /karte.php\?[d|z]=([0-9]*)[\S]*/;
var karte2 = document.location.href.indexOf('karte2.php') != -1 ? true : false;

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function $(id){
  return document.getElementById(id);
}

function trans(str){
  var tld = location.hostname.substring(location.hostname.lastIndexOf('.')+1,location.hostname.length);
  
  switch(tld){
    case "at":
    case "de":
    case "org":
      lang = "de";
      break;
    case "bg":
      lang = "bg";
      break;
    case "cz":
      lang = "cz";
      break;
    case "hu":
      lang = "hu";
      break;
    case "nl":
      lang = "nl";
      break;
    case "no":
      lang = "no";
      break;
    case "pl":
      lang = "pl";
      break;
    case "pt":
    case "br":
      lang = "pt";
      break;
    case "se":
      lang = "se";
      break;
    case "sk":
      lang = "sk";
      break;
    case "tr":
      lang = "tr";
      break;
    default:
      lang = "en";
  }

  if(lang == "en"){
    return str;
  }

  var langs = [];
  
  langs['bg'] = [];
  langs['bg']['Note'] = 'Бележка';
  langs['bg']['Save'] = 'Запази';
  langs['bg']['Delete'] = 'Изтрии';
  langs['bg']['Close'] = 'Затвори';
  langs['bg']['Lock'] = 'Заключи';
  langs['bg']['Unlock'] = 'Отключи';
  
  langs['cz'] = [];
  langs['cz']['Note'] = 'Poznámka';
  langs['cz']['Save'] = 'Uložit';
  langs['cz']['Delete'] = 'Smazat';
  langs['cz']['Close'] = 'Zavřít';
  
  langs['de'] = [];
  langs['de']['Note'] = 'Notiz';
  langs['de']['Save'] = 'Speichern';
  langs['de']['Delete'] = 'Löschen';
  langs['de']['Close'] = 'Schließen';

  langs['hu'] = [];
  langs['hu']['Note'] = 'Jegyzet';
  langs['hu']['Save'] = 'Mentés';
  langs['hu']['Delete'] = 'Törlés';
  langs['hu']['Close'] = 'Bezárás';
  langs['hu']['Lock'] = 'Rögzítés';
  langs['hu']['Unlock'] = 'Feloldás';
  
  langs['nl'] = [];
  langs['nl']['Note'] = 'Kladblok';
  langs['nl']['Save'] = 'Opslaan';
  langs['nl']['Delete'] = 'Verwijder';
  langs['nl']['Close'] = 'Sluit';
  langs['nl']['Lock'] = 'Zet vast';
  langs['nl']['Unlock'] = 'Ontkoppel';
  
  langs['no'] = [];
  langs['no']['Note'] = 'Huskelapp';
  langs['no']['Save'] = 'Lagre';
  langs['no']['Delete'] = 'Slett';
  langs['no']['Close'] = 'Lukk';
  
  langs['pl'] = [];
  langs['pl']['Note'] = 'Notes';
  langs['pl']['Save'] = 'Zapisz';
  langs['pl']['Delete'] = 'Usuń';
  langs['pl']['Close'] = 'Zamknij';
  langs['pl']['Lock'] = 'Zablokuj';
  langs['pl']['Unlock'] = 'Odblokuj';
  
  langs['pt'] = [];
  langs['pt']['Note'] = 'Nota';
  langs['pt']['Save'] = 'Guardar';
  langs['pt']['Delete'] = 'Remover';
  langs['pt']['Close'] = 'Fechar';
  langs['pt']['Lock'] = 'Bloquear';
  langs['pt']['Unlock'] = 'Desbloquear';
  
  langs['se'] = [];
  langs['se']['Note'] = 'Notering';
  langs['se']['Save'] = 'Spara';
  langs['se']['Delete'] = 'Ta bort';
  langs['se']['Close'] = 'Stäng';
  langs['se']['Lock'] = 'Lås';
  langs['se']['Unlock'] = 'Lås upp';
  
  langs['sk'] = [];
  langs['sk']['Note'] = 'Poznámka';
  langs['sk']['Save'] = 'Uložiť';
  langs['sk']['Delete'] = 'Zmazať';
  langs['sk']['Close'] = 'Zavrieť';
  langs['sk']['Lock'] = 'Zablokovať';
  langs['sk']['Unlock'] = 'Odblokovať';
  
  langs['tr'] = [];
  langs['tr']['Note'] = 'Not Bırak';
  langs['tr']['Save'] = 'Kaydet';
  langs['tr']['Delete'] = 'Sil';
  langs['tr']['Close'] = 'Kapat';
  langs['tr']['Lock'] = 'Kilitle';
  langs['tr']['Unlock'] = 'Kilidi aç';
  
  if(langs[lang][str] != null){
    return langs[lang][str];
  }
  return str;
}

// globalStorage functions
// more info: http://perfectionorvanity.com/2007/05/23/zapisywanie-danych-w-userjs/
var saveData = globalStorage.namedItem('travianmapnotes.notes.' + document.domain);

gsWrite = function(key, value) {
  saveData.setItem(key, value);
};

gsRead = function(key, defVal) {
  var data = saveData.getItem(key);
  return (data) ? data.value : defVal;
};

gsDelete = function(key) {
  saveData.removeItem(key);
};

function createNoteContainer(){
  var noteDiv = document.createElement('div');
  noteDiv.setAttribute('id','notecontainer');
  if(!GM_getValue('traviannotes.lock', false)){
    noteDiv.setAttribute('style','display:none;');
    var lockdisplay = "display:block;";
    var unlockdisplay = "display:none;";
  }else{
    if(!karte2){
      var x = GM_getValue('traviannotes.xpos',0);
      var y = GM_getValue('traviannotes.ypos',0);
    }else{
      var x = GM_getValue('traviannotes.karte2.xpos',0);
      var y = GM_getValue('traviannotes.karte2.ypos',0);
    }
    var lockdisplay = "display:none;";
    var unlockdisplay = "display:block;";
    noteDiv.setAttribute('style','display:block;left:' + x + 'px;top:' + y + 'px');
  }
  
  noteDiv.innerHTML = '<a href="#" onclick="closeNote();return false;" id="btCloseNote" class="notebutton" title="' + trans('Close') + '">' + trans('Close') + '</a>';
  noteDiv.innerHTML += '<a href="#" onclick="lockNote(true);return false;" id="btLockNote" class="notebutton" title="' + trans('Lock') + '" style="' + lockdisplay + '">' + trans('Lock') + '</a>';
  noteDiv.innerHTML += '<a href="#" onclick="lockNote(false);return false;" id="btUnlockNote" class="notebutton" title="' + trans('Unlock') + '" style="' + unlockdisplay + '">' + trans('Unlock') + '</a>';
  noteDiv.innerHTML += '<a href="#" onclick="saveNote();return false;" id="btSaveNote" class="notebutton" title="' + trans('Save') + '">' + trans('Save') + '</a>';
  noteDiv.innerHTML += '<a href="#" onclick="deleteNote();return false;" id="btDeleteNote" class="notebutton" title="' + trans('Delete') + '">' + trans('Delete') + '</a>';
  noteDiv.innerHTML += '<input type="hidden" name="noteid" id="noteid" value="" />';
  noteDiv.innerHTML += '<textarea cols="40" rows="20" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;width:100%;height:250px;margin:3px 0;padding:0;border:0;background-color:transparent;" name="notecontent" id="notecontent"></textarea>';
  
  noteDiv.addEventListener('mousedown',function(e){
    if(!GM_getValue('traviannotes.lock', false)){
      if(e.target.id == 'notecontainer'){
        var offsetX = e.pageX-$('notecontainer').offsetLeft;
        var offsetY = e.pageY-$('notecontainer').offsetTop;
        unsafeWindow.onmousemove = function(e){
          $('notecontainer').style.left = (e.pageX-offsetX) + 'px';
          $('notecontainer').style.top = (e.pageY-offsetY) + 'px';
        }
      }
    }
  },false);
  
  noteDiv.addEventListener('mouseup',function(e){
    delete unsafeWindow.onmousemove;
    if(GM_getValue('traviannotes.lock', false)){
      unsafeWindow.lockNote(true);
    }
  },false);
  
  
  document.body.appendChild(noteDiv);
  
}

function createNoteIcon(noteid,note,x,y){

  var iconDiv = document.createElement('div');
  if(!karte2){
    iconDiv.setAttribute('style','left:' + x + 'px;top:' + y + 'px;');
  }else{
    iconDiv.setAttribute('style','left:' + (x-5) + 'px;top:' + (y-10) + 'px;');
  }
  
  iconDiv.setAttribute('id','icon-'+noteid);
  iconDiv.setAttribute('class','noteicon');
  iconDiv.setAttribute('title',note);
  //iconDiv.appendChild(img);
  iconDiv.addEventListener("click",function(e){
    var noteid = e.target.id.substring(5,e.target.id.length);
    unsafeWindow.openNote(noteid,e.pageX,e.pageY);
  },false);
  if(!karte2){
    $('map_content').appendChild(iconDiv);
  }else{
    document.body.appendChild(iconDiv);
  }
}

function createIcons(){
  var karte2 = document.location.href.indexOf('karte2.php') != -1 ? true : false;
  
  if(karte2){
    var areas = $x('html/body/map/area');
  }else{
    var areas = $x('id("map_content")/map/area');
  }

  areas.forEach(function(el,idx,ar){
    if(idx >= 8){
      if(!karte2){
        // .com szerveren nem lehet kattintani az oázison, azaz nincs href attribútum
        // (Lehet hogy csak akkor elérhető ha mar 10-es a hősök háza?)
        if(el.getAttribute('href')){
          var matches = reg.exec(el.getAttribute('href'));
        }
      }else{
        if(el.getAttribute('onclick')){
          var matches = reg.exec(el.getAttribute('onclick'));
        }
      }
      var noteid = 'note_' + matches[1];
      var note = gsRead(noteid,false);
      if(note){
        var coords = el.coords.split(',');
        createNoteIcon(noteid,note,Number(coords[2])-2,Number(coords[3])+22);
      }
    }
  });
}

unsafeWindow.closeNote = function(){
  if(!GM_getValue('traviannotes.lock',false)){
    $('notecontainer').style.display = 'none';
  }
}

unsafeWindow.lockNote = function(lock){
  if(lock){
    $('btLockNote').style.display = 'none';
    $('btUnlockNote').style.display = 'block';
    GM_setValue('traviannotes.lock', true);
    if(!karte2){
      GM_setValue('traviannotes.xpos', $('notecontainer').offsetLeft);
      GM_setValue('traviannotes.ypos', $('notecontainer').offsetTop);
    }else{
      GM_setValue('traviannotes.karte2.xpos', $('notecontainer').offsetLeft);
      GM_setValue('traviannotes.karte2.ypos', $('notecontainer').offsetTop);
    }
  }else{
    $('btLockNote').style.display = 'block';
    $('btUnlockNote').style.display = 'none';
    GM_setValue('traviannotes.lock', false);
  }
}

unsafeWindow.openNote = function(noteid,x,y){
  $('noteid').value = noteid;
  $('notecontent').value = gsRead(noteid,'');
  $('notecontainer').style.display = "block";
  //$('note_title').innerHTML = 'id: ' + noteid;
  
  if(!GM_getValue('traviannotes.lock',false)){
    if(x > unsafeWindow.innerWidth/2){
      var x = x - $('notecontainer').offsetWidth;
    }
    
    if(y > unsafeWindow.innerHeight/2){
      var y = y - $('notecontainer').offsetHeight;
    }else{
      var y = y + 8;
    }
    
    $('notecontainer').style.left = x + "px";
    $('notecontainer').style.top = y + "px";
  }
  
  $('notecontent').focus();
}

unsafeWindow.saveNote = function(){
  //alert($('noteid').value);
  gsWrite($('noteid').value,$('notecontent').value);
  if(!GM_getValue('traviannotes.lock',false)){
    unsafeWindow.closeNote();
  }
}

unsafeWindow.deleteNote = function(){
  if(location.search == "" || location.search.indexOf('z=') != -1){
    $('icon-' + $('noteid').value).style.display = 'none';
  }
  gsDelete($('noteid').value);
  $('notecontent').value = '';
  if(!GM_getValue('traviannotes.lock',false)){
    unsafeWindow.closeNote();
  }
}

window.addEventListener("load", function(e) {
  //alert('load');
  var iconEdit = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK5SURBVBgZBcFPaJZ1HADwz+95n3e6uTnREGdljRKtGCYiHTLxkIUmQeeCOnXzVnQIoi5BQV08TMo6GIiHiKI6ZEWgszzEmtpqSDP7s9ycm9NN977vnuf37fNJEWH/G6df6l676vki2YXVSCAhEpFVOU8uzMX36daNV88MH+oApIhw8O2zZz45vOuhokjrgoYAIALC7NKKEz8vmP67fee3XyfWjwwfakMJRSNt6yob68avaRQpkYhMHVlVheWV2r6tffYPjNi4eLyncWCodf7jI1Jr6sUSUkq9EdHoajQkIZALZOpEIWlPf27r4jndQy/oH9xp4c9tJk4de7eEIEGBlAgJREqKRP/yKXVcsH7r4+Ynf9eVOvrWbtK7YUt/CRBB2SBJIiW5Doqkd3nEllWj+gef1r56UldP8tfYhJt3UhTtuR0FRBAoU6FISYFGkaxePG1LfKv/gYNa/30oNW9o9vbpzvOOXj+wsvvwZ5cKCGSkRJGSIiWtK19af/uU/gef1ZoaVjRXdG7db+bMed173zJVD2QoIFdEkBG4fflrPYs/2vjIMzrTxzS6QvvWfWZGRs3tGZY2bFdnoICcQ0QQTI+e1L3wk5W82dWLR2Qtt+fvNnNuwuLeo1LvgNXNpK4CFFBn6iAysxc/8vCel636Z8SlL84a+2be+Hdjlh57R9WzWaDZKFSdCpSQq5AjvPlLx9DkrM74VwZ3POHm7JzJsUk/7PvU9Sv3yipwYlPTSjuDEqqqVtcMrG0a/+Oa9z8Ytnv7oOXNOyw9edyjffeIIIIL1yqRw0qrAiVU7ZyrnKNTS+te/9flFCYlkJdIS5UcRJEUOSnLlKs6V1DCSqueWdPVuOu1oc6aiCgEGdDfXYIIuptJSnKzkRbrKk9BCSnFe0+9cvq5lNLOED0AgkAIIEAr5zxaFk7A/5IUWNTkV3l/AAAAAElFTkSuQmCC';
  var iconClose = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLpZNraxpBFIb3a0ggISmmNISWXmOboKihxpgUNGWNSpvaS6RpKL3Ry//Mh1wgf6PElaCyzq67O09nVjdVlJbSDy8Lw77PmfecMwZg/I/GDw3DCo8HCkZl/RlgGA0e3Yfv7+DbAfLrW+SXOvLTG+SHV/gPbuMZRnsyIDL/OASziMxkkKkUQTJJsLaGn8/iHz6nd+8mQv87Ahg2H9Th/BxZqxEkEgSrq/iVCvLsDK9awtvfxb2zjD2ARID+lVVlbabTgWYTv1rFL5fBUtHbbeTJCb3EQ3ovCnRC6xAgzJtOE+ztheYIEkqbFaS3vY2zuIj77AmtYYDusPy8/zuvunJkDKXM7tYWTiyGWFjAqeQnAD6+7ueNx/FLpRGAru7mcoj5ebqzszil7DggeF/DX1nBN82rzPqrzbRayIsLhJqMPT2N83Sdy2GApwFqRN7jFPL0tF+10cDd3MTZ2AjNUkGCoyO6y9cRxfQowFUbpufr1ct4ZoHg+Dg067zduTmEbq4yi/UkYidDe+kaTcP4ObJIajksPd/eyx3c+N2rvPbMDPbUFPZSLKzcGjKPrbJaDsu+dQO3msfZzeGY2TCvKGYQhdSYeeJjUt21dIcjXQ7U7Kv599f4j/oF55W4g/2e3b8AAAAASUVORK5CYII=';
  var iconSave = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLpZPrS1NhHMf9O3bOdmwDCWREIYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW/n7MVMEiN64AsPD8/n83uucQDi/id/DBT4Dolypw/qsz0pTMbj/WHpiDgsdSUyUmeiPt2+V7SrIM+bSss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7vWO1D40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6+TwphA5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP5CyYD+UkG08+xt+4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU/rH5HW3PLsEwUYy+YCcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo+V3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptwQG+UAa7Ct3UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K+6kW49DKqS2DrEZCtfuI+9GrNHg4fMHVSO5kE7nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEptIOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXOIvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2+FxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag5YUFKl6Yrciw0VOlhOivv/Ff8wtn0KzlebrUYwAAAABJRU5ErkJggg==';
  var iconDelete = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==';
  var iconLock = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ/SURBVDjLbVJBaxNBGH2bpEkTmxi1NTRKTZtoQUHEWz0Igj2I4kG9eVNQhEBO7bEHc+yv8JAiHnr2B4gFqVrQRhObljQolBSTJqZJdnZmfbNr2rU68DEz33zfm/fejGHbNrxjaWlpRCk1J6WcYZxkgPGTsWJZ1mIul/vlrTe8AIVC4Qqbl5PJ5GQsFoPP5wP36PV6qNfr2OIg0L35+fm1fwDYPMLDj+l0OmOaJmq1Gjqdjr4dgUAAiUTCqSsWixvMXV5YWOjqvW+AxOSz8fHxjBAC5XJ5s91up7gO6tDrUqn0QwOTXYZSsoO+wGDB5EwkEkGlUgGb7mSz2apHajWfz9+sVqvFVCrl1P4PYExr5m16vYUjQ+c0O11DtmN/ebD95pG9UpnGzl7Y0Xz30ir8toAtLdiWG0JIvFi76piaGG7g9plVTD/5YLgMCPLg/g0YtMTwhznfApRBfsP6kAYJSKuN57Md5oXTsvHy7aEEfZMutHZfIRAahWGMsHAICMeZVsD+HmTrG8zudyhrH+HJLGyz7wEgRSh9k4nm+nvqPIb4xWuovV5k/2lMXJ9F8+s6ARqIpk6QsIQtTC+AcGTYpBqfvgBfcJTuKMi+xKfdMCZgIp6eRK8TYu2+w2oA4PwDm+5qVK218XmNLN7xxILqKfS7pGqTWekLmuVtV65STs8hA73RqJQQP5+CP3KKACamHj7FlGBDawfH00kEW0MuA8o9AmA6qMrSHqwTIAoM08hAkHkN0ES3UYfotBGdiNFu5cr2AmgJobOPET7nhxEMuU/o40soSjO7iHbbVNgnUen6pY0/AOCTbC7PuV44H0f8Cetg5g9zP5aU7loDcfwGcrKyzYdvwUUAAAAASUVORK5CYII=';
  var iconUnlock = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJpSURBVDjLdZLLaxNRFIe/O2kTqxmNxAopUjXWB7pwrUIXggs3oispCoqCFWG0G6H9D6Su3IjrQEAExYULF+LKlagUNL5qs4i0jRhokj6mM/dxXIyPIdgDh3s43Pvx+517lIiQjmq1etJaeyuKomPAFmPMC2PMvSAIXvKfUGlApVK57vv+/aGhIeV5HgArKyvMzc1Jq9W6MTk5+aAX0Jd6fCifz0+XSiXVaDRoNpsA+L5PqVRSYRhOl8vln/V6/XEa4P0put3uq2Kx6M/Pz9NsNi8GQaCCIFCLi4uXZmdnKRQK+bGxsTu9CrxUnTPGsLCwsBQEQfVPc2pqqgK0Op2OGhwczG9oAchYaxER23tpYmJikA1CiQiNV1fk2cxRjFNYazlz5A0Z0Yg1iElSa/vUddtPgfMKOe2J4eC1dypRIML45WMoPFRmAMVpcAr6NgECVvOxevEscBZg5Nwdvj28+c+CWAMIpvWIvtwOlMqD64eBAoiDtQ4jJ0aJw3mcWQPnkDhKAYwBJ2Bj2rW3eN4WCoeP8/35XcTtZHj0FO3PNeJwCX/PdkQsouM0QIMIYjWFgwfwsjtAOWxked8aYJiYwr69rK/mELMG4v4CPADRGhELVrP0YYZ27TV4BrfuiMIIJKb95RPtr43ErnOI1ikFWidUG1PYv4fM5iJ4MeUL45S1ge4Ptu0bItvtTxQ46QXE4BzOxLRrNTKbfdiUh74sOAPdNuHST/TqMv7wVgSX2E4DRCy5XVcZ2J1BZXPJF3r94CzEIX64jNUR4mwyL2NSgDii/uR2MgtjEKN/p/l7Ym2yWNYmtUsW9hfAtnFXLnJPWAAAAABJRU5ErkJggg==';
  
  var cssText = '.noteicon{width:16px;height:16px;position:absolute;z-index:1000;cursor:help;';
  cssText += 'background:transparent url(data:image/png;base64,' + iconEdit + ') no-repeat scroll left top;}';
  cssText += '.notebutton{width:16px;height:16px;display:block;float:left;text-indent:-1000px;overflow:hidden;outline:0;}';
  cssText += '#btSaveNote{background:transparent url(data:image/png;base64,' + iconSave + ') no-repeat scroll left top;}';
  cssText += '#btDeleteNote{background:transparent url(data:image/png;base64,' + iconDelete + ') no-repeat scroll left top;}';
  cssText += '#btCloseNote{background:transparent url(data:image/png;base64,' + iconClose + ') no-repeat scroll left top;float:right;}';
  cssText += '#btLockNote{background:transparent url(data:image/png;base64,' + iconUnlock + ') no-repeat scroll left top;float:right;}';
  cssText += '#btUnlockNote{background:transparent url(data:image/png;base64,' + iconLock + ') no-repeat scroll left top;float:right;}';
  cssText += '#notecontainer{width:200px;padding:3px;border:1px solid #efefef;background-color:#ffffe1;z-index:3000;position:absolute;display:none;cursor:move;}';
  var css = document.createTextNode(cssText);
  var style = document.createElement('style');
  style.setAttribute('type','text/css');
  style.setAttribute('media','screen');
  style.appendChild(css);
  document.getElementsByTagName("head")[0].appendChild(style);
  
  createNoteContainer();
  
  if(location.href.indexOf('karte.php') != -1){
  
    if(location.search != "" && location.search.indexOf('z=') == -1 && location.search.indexOf('newdid') == -1){
      var matches = reg.exec(document.location.href);
      //var noteid = 'd_' + matches[1] + '_' + 'c_' + matches[2];
      var noteid = 'note_' + matches[1];
      
      var noteLink = document.createElement('tr');
      noteLink.innerHTML = '<td><a href="#" id="">&raquo; ' + trans('Note') + '</a></td>';
      var tbl = $x('id("lmid2")/div[@class="map_details_actions"]/table[@class="f10"]/tbody')[0];
      noteLink.addEventListener("click",function(e){
        unsafeWindow.openNote(noteid,e.pageX,e.pageY);
      },false);
      tbl.appendChild(noteLink);
      
    }else{
      createIcons();
      
      //Modified function
      //original in unx.js
      unsafeWindow.T_Load = function(url,id){
        unsafeWindow.g=false;
  
        unsafeWindow.g=new XMLHttpRequest();
        if(unsafeWindow.g.overrideMimeType){
          unsafeWindow.g.overrideMimeType('text/xml');
        }
  
        if(!unsafeWindow.g){
          alert('Can not create XMLHTTP-instance');
          return false;
        }
        
        unsafeWindow.g.onreadystatechange=function(){
          unsafeWindow.al(id);
          //!!!
          createIcons();
        };
        unsafeWindow.g.open('GET',url,true);
        unsafeWindow.g.send(null);
      };
      
    }
  
  }
  
  
  if(location.href.indexOf('karte2.php') == -1){
    var navMenu = $x("id('navi_table')/tbody/tr[1]/td[@class='menu'][1]")[0];
    var globalNoteLink = document.createElement('a');
    globalNoteLink.innerHTML = trans('Note');
    globalNoteLink.setAttribute('href','#');
    globalNoteLink.addEventListener('click',function(e){
      unsafeWindow.openNote('note_global',e.pageX,e.pageY);
    }, false);
    
  
    navMenu.appendChild(globalNoteLink);
    navMenu.insertBefore(globalNoteLink, navMenu.firstChild);
  }else{
    createIcons();
  }
  

}, false);