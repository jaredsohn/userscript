// ==UserScript==
// @name           YouTube SnipMP3 Button
// @namespace      DustinJD
// @description    Adds a "MP3" Button to YouTube videos to take you to SnipMP3.com to download the MP3 of the video.
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @author         DustinJD
// @credit         Original userscript by Guile93 moddified by me.
// @version        1.0
// ==/UserScript==

var video=window.location.href;
var newLink = document.createElement("a");
newLink.href="http://www.snipmp3.com/?url="+video;
newLink.target="_blank";
var new_img = document.createElement("img");
new_img.class="yt-uix-tooltip-reverse  yt-uix-button yt-uix-button-default yt-uix-tooltip";
new_img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAdCAYAAAD2DA/hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAANMSURBVFhH5Zg9aFRBEMc3giAiRMHCa0SRiBYWuUaUIGiRIunSBGwEU16hYCNoqWBpc50RbIRYpEsKCwUJSpqksFAMItichYVBEcFC3+/lJszN7dc77k7iDTyO483uzn8+/jP7xv4U4kZI9o0Q1hLqyAEeI6U3Pn11t5+u7wZ7ojbumtenKgV/dfOze7j6tlxTP3nUPbh6vmu9PSd2AHvcmDnnaocPRu3gzFfvWu7Hr9+7eocO7HfNhSnvWm+Et1rblcCizKH9FJxzrfnSLb54H9yWM3G0Bosy/1nLOyt9SWmM4xmELL356HwBAMy95Y1k9K3DgoBjnrWn6HLIBU3akba+x+7ReLzWUXK8l/IR3fkLp9zClTNdaYzDdAYEAa94UiUXTI7e6YInqHPfs3xrujRei84gm6ro8gD6SeNy11qwiAQB45XG4lrSdl+dJBclFIg+xt8sSEuLREpHF+egq4X/muzIVimLaA23vv1M2q69l1SuqDAzebxjxYeCTAEtEeUX5/hksigXLd/bLJ4krRhj4+leGL0KbmpcZOvLdgmQCMoT2ssydzKlRSEUQaI/iHS2AIiqyMSx8Wxf2a5RO7LTz70R1l4FFExnxda3JZlsyyKKsL+OlLYrtIxA0K70OrhAajqZ0my89LobsDWkivdznVGlt+McHgYOOwRpLggC1gxp68Ea4hsjU6DYY/r+SvTRe9ydq0e39A0/1DttSksQ8KWztQ4G1CD7PUamnANBYU9V8bXWIGC8M6vawrN2HVuyCrWFqsbF9HP4QVqVvWwAWmeo97akbzuknQi1YG8mpAyH6JtQzm0JRzFt+UR6qB0oqjhR2806sTOLtOQgezMBWOr6FjIyNlqmemwOcDu0SBkmAdvxTg4DaC9klWNsP3RszW+2b3NJwHjKV6fzFzvn134YOYw9koAxgq8HVmzKDMNYzmCU1e0sNELaTiK8kAW41zodhBP4/KTteRT4ImLH3vqJnZk8CzCK+t5qm/kggMX21BkHMCLOOMkIzKRlGZqhBUdVAqy/TPzriPs4hRTm3uu70moCy47wsKOYOi+3R1uu2bOAmaye35n1fsciAyk73tu2Wk5aKW/uhfcy63PvjZXcfwM4Nyh/ATtxoONw950lAAAAAElFTkSuQmCC"
new_img.title="DL with SnipMP3";
new_img.alt="DL with SnipMP3";
newLink.appendChild(new_img);
var b1=document.getElementById("watch-actions-right");
var b2=document.getElementsByClassName("watch-view-count")[0];
if(b1){
    b1.appendChild(newLink);
}else{
    b2.appendChild(newLink);
}