// ==UserScript==
// @name            Bandcamp Downloader
// @version         1.0
// @author          Jeppe Rune Mortensen (YePpHa)
// @description     It links to the free album download page if available and also links to the 128-bits (mp3) links.
// @include         *.bandcamp.com/*
// ==/UserScript==
function inject(t) {
  var script = document.createElement('script');
  script.appendChild(document.createTextNode('('+ t +')();'));
  (document.body || document.head || document.documentElement).appendChild(script);
}
inject(function(){
  var trackData = null,
    freeDownloadPage = null,
    IMAGE_DOWNLOAD = "data:image/png;base64,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";
  
  function injectFreeDownloadPageLink(url) {
    var docs = document.getElementsByTagName("h4"),
      i, dle, or;
    for (i = 0; i < docs.length; i++) {
      if (docs[i].className == "ft") {
        or = document.createElement("span");
        or.textContent = " or ";
        or.style.fontSize = "9px";
        dle = document.createElement("a");
        dle.textContent = "Download";
        dle.title = "Free Download Page (MP3 320, FLAC, MP3 VBR (V0), AAC, Ogg Vorbis, ALAC)";
        dle.href = url;
        docs[i].appendChild(or);
        docs[i].appendChild(dle);
        break;
      }
    }
  }
  
  function inject128BitDownloadLink(url) {
    var docs = document.getElementsByTagName("h4"),
      i, dle, or;
    for (i = 0; i < docs.length; i++) {
      if (docs[i].className == "ft") {
        or = document.createElement("span");
        or.textContent = " or ";
        or.style.fontSize = "9px";
        dle = document.createElement("a");
        dle.textContent = "Download MP3 128-bit";
        dle.title = "Download as MP3 128-bit (Right Click -> Save as)";
        dle.href = url;
        docs[i].appendChild(or);
        docs[i].appendChild(dle);
        break;
      }
    }
  }
  
  function init() {
    var tracks,i,track,e,c,c2,j;
    trackData = window.TralbumData;
    if (trackData.freeDownloadPage) {
      freeDownloadPage = trackData.freeDownloadPage;
      injectFreeDownloadPageLink(freeDownloadPage);
    } else if (trackData.trackinfo && trackData.trackinfo.length == 1 && trackData.trackinfo[0]) {
      inject128BitDownloadLink(trackData.trackinfo[0].file);
    }
    if (document.getElementById("track_table")) {
      tracks = document.getElementById("track_table").children[0];
      j = 0;
      for (i = 0; i < tracks.children.length; i++) {
        if (tracks.children[i].className == "lyricsRow") continue;
        
        track = trackData.trackinfo[j];
        
        c2 = document.createElement("span");
        
        c = document.createElement("span");
        c.textContent = " ";
        c2.appendChild(c);
        
        e = document.createElement("a");
        e.title = "Download as MP3 128-bit (Right Click -> Save as)";
        e.href = track.file;
        e.addEventListener("mouseover", function(){
          this.parentNode.children[2].style.display = "inline";
        }, false);
        e.addEventListener("mouseout", function(){
          this.parentNode.children[2].style.display = "none";
        }, false);
        c = document.createElement("img");
        c.src = IMAGE_DOWNLOAD;
        e.appendChild(c);
        c2.appendChild(e);
        
        c = document.createElement("span");
        c.textContent = "128-bit";
        c.style.display = "none";
        c2.appendChild(c);
        
        tracks.children[i].getElementsByTagName("span")[0].parentNode.parentNode.appendChild(c2);
        
        e = tracks.children[i].getElementsByTagName("span")[0].parentNode.parentNode.children[0];
        e.title = e.children[0].textContent;
        if (e.children[0].textContent.length > 23) {
          e.children[0].textContent = e.children[0].textContent.substring(0, 20) + "...";
        }
        
        j++;
      }
    }
  }
  
  init();
});