// ==UserScript==
// @name twitch.tv & justin.tv download list
// @namespace twitch.tv
// @description Makes list of 30 min parts
// @include http://*.twitch.tv/*
// @include http://*.justin.tv/*
// ==/UserScript==

(function(){
  var head = document.getElementsByTagName("head")[0];
  var re = new RegExp('PP.archive_id\\s*=\\s*"(\\d+)"');
  var m = re.exec(head.innerHTML);
  if(m){
    var rec_id = m[1];
    var xml_url = 'http://api.justin.tv/api/broadcast/by_archive/' + rec_id + '.xml?onsite=true';
  }

  if (rec_id != null) {
    req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open("get", xml_url, true);
    console.log('Requesting url: ' + xml_url);
    req.send();

    function reqListener() {
      var used_div = document.getElementById('stats_and_actions') ? document.getElementById('stats_and_actions') : document.getElementById('share_box');
      if(!used_div){
        return;
      }
      var links_div = document.createElement("div");

      var xml = this.responseXML;
      
      var qs = ['best','720','480','360','240',];
      
      var nodes;
      for(var i=0; i<qs.length; i++){
        if(qs[i] == 'best'){
          nodes = xml.evaluate('/archives/archive/video_file_url/text()', xml);
        }else{
          nodes = xml.evaluate('/archives/archive/transcode_file_urls/transcode_'+qs[i]+'p/text()', xml);
        }

        var node = nodes.iterateNext();
        if(node){
          with (links_div.appendChild(document.createElement('p'))){
            textContent = qs[i];
          }
          
          while (node) {
            console.log('url: ' + node.nodeValue);

            with (links_div.appendChild(document.createElement('a'))){
              setAttribute('href', node.nodeValue), textContent = node.nodeValue;
            }
            links_div.appendChild(document.createElement('br'));

            node = nodes.iterateNext();
          }
          
          links_div.appendChild(document.createElement('br'));
        }
      }

      var parent_node = used_div.parentNode;
      parent_node.insertBefore(links_div, used_div);
    }
  }

})();