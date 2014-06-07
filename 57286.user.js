// ==UserScript==
// @name           enableFullScreen
// @namespace      *
// @description    Enables flash FullScreen ability
// @include        *
// ==/UserScript==

document.onLoad = enableFullScreen();

function enableFullScreen()
{
  // personal tuning
  var quality = 'low';
  var quality_change = false;
  var wmode = 'window';
  var wmode_change = false;

  // embeds tuning
  var allEmbeds = document.getElementsByTagName('embed');
  for (var i in allEmbeds)
  {
    var e = allEmbeds[i].cloneNode(true);
    
    var adr = trim(e.src);
    // enabling fullscreen button in youtube
    if (adr.search('youtube.com') >= 0 && adr.search('fs=1') < 0)
    {
      adr += '&fs=1';
    }
    e.src = adr;

    e.setAttribute('allowfullscreen', 'true');
    if(quality_change){
      e.setAttribute('quality', quality);
    }
    if(wmode_change){
      e.setAttribute('wmode', wmode);
    }
    
    allEmbeds[i].parentNode.replaceChild(e, allEmbeds[i]);
  }
  
  // objects tuning
  var allObjects = document.getElementsByTagName('object');
  for (var i in allObjects)
  {
    var o = allObjects[i].cloneNode(true);

    if (o.getAttribute('data') != "")
    {
      var adr = trim(o.getAttribute('data'));
      // enabling fullscreen button in youtube
      if (adr.search('youtube.com') >= 0 && adr.search('fs=1') == -1)
      {
        adr += '&fs=1';
      }
      o.setAttribute('data', adr);
    }

    var allParams = o.getElementsByTagName('param');
    var afs_set, q_set, wm_set;
    for (var j = 0; j < allParams.length; j++)
    {
      if (allParams[j].getAttribute('name').toLowerCase() == 'movie')
      {
        var adr = trim(allParams[j].value);
        // enabling fullscreen button in youtube
        if (adr.search('youtube.com') >= 0 && adr.search('fs=1') == -1)
        {
          adr += '&fs=1';
        }
        allParams[j].value = adr;
      }
      if (allParams[j].getAttribute('name').toLowerCase() == 'allowfullscreen')
      {
        afs_set = true;
        allParams[j].value = 'true';
      }
      if(quality_change){
        if (allParams[j].getAttribute('name').toLowerCase() == 'quality')
        {
          q_set = true;
          allParams[j].value = quality;
        }
      }
      if(wmode_change){
        if (allParams[j].getAttribute('name').toLowerCase() == 'wmode')
        {
          wm_set = true;
          allParams[j].value = wmode;
        }
      }
    }
    if(!afs_set){
      with (o.appendChild(document.createElement('param'))){
        setAttribute('name', 'allowfullscreen'), setAttribute('value', 'true');
      }
    }
    if(quality_change){
      if(!q_set){
        with (o.appendChild(document.createElement('param'))){
          setAttribute('name', 'quality'), setAttribute('value', quality);
        }
      }
    }
    if(wmode_change){
      if(!wm_set){
        with (o.appendChild(document.createElement('param'))){
          setAttribute('name', 'wmode'), setAttribute('value', wmode);
        }
      }
    }
    
    allObjects[i].parentNode.replaceChild(o, allObjects[i]);
  }
}

function trim(string) {
  return string.replace(/(^\s+)|(\s+$)/g, "");
}