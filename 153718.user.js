// ==UserScript==
// @name          SoundsliceIntoYoutube
// @icon          data:image/gif;base64,R0lGODlhMAAwAPMIAOtoQeppQetpQepqQepoQuikQemkQeilQv///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAwADAAAATVMMlJq704680n+l0oJl+JjChmmmnrgSTsoiVVz+Mdn3jOS7oeJxgUaorGEDLZWTI3zlRgSq1aA0BZoWDgerteL+ZKnr5+4PRWzU3Knso3fCifH3/Ssp56nhj+gIFje3t9CWBbiYmDhGVZaImIa3ZRdhWVlo+ZdHhJAoQvE5GKf6NrWxifhTt+iqaukRkEs7QEfJoSB14HvL2+vWA4dZuXw8SGxxaYIo1VyF1qbF2MzYZh0adtRsuZ3JbGyd5CROBw5Mm4rOFv4uMw7e4rncfy6MXz9scRADs=
// @fullname      Soundslice.com button for youtube.
// @description   This script add a links to soundslice on youtube videos, if there are tabs for them.
// @author        Alexey Berezuev
// @homepage      http://freelansim.ru/freelancers/berezuev
// @include       http://youtube.*/*
// @include       http://*.youtube.*/*
// @include       https://youtube.*/*
// @include       https://*.youtube.*/*
// @exclude       http://*.youtube.*/js/*_watch_request_ad.html
// ==/UserScript==

//adding jquery function
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

//start of us
function main() {
  //start getting video_id
  var video_id = window.location.search.split('v=')[1];
	var ampersandPosition = video_id.indexOf('&');
	if(ampersandPosition != -1) {
	  video_id = video_id.substring(0, ampersandPosition);
	}
  //end getting video_id

  //cheking for tabs.
  SSUri = 'http://www.soundslice.com/yt/' + video_id;
	APIuri = SSUri + '/json/';
  $.ajax({
     type: "GET",
     url: APIuri,
     async: false,
     dataType: "json",
     success: function(data){
      if (data.tracks[0]){
        header = document.getElementById('watch-headline-title').getElementsByTagName('span')[0];
        header.innerHTML = (header.innerHTML + '<button type="submit" class="yt-uix-button yt-uix-button-hh-default" onclick="location.href=\''+ SSUri+'\'" role="button"><span class="yt-uix-button-content"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAcVJREFUeNqllD0sQ1EUx+95r0w29ZUYDBJGA5tEW4uNzUfTqE0ni4bFJBKChBAdLERLREUkJBrKGzp0M1g6EB2a9BGDwaZ91/9GI+9d70lf3eTXc27uef+e8849j1gNi3PeC9MFjomoZD7z1CA2DJMEj2AIhGoWhJiI3wZjoBXMyjGKywQHxA/KPK1kuCYHuC05DPYqoimYlBxA5s1rxDfHuNL9O8jIe2N363CLoE8/9A8rNnEGN97kknXxsIzBKIsz0YwcMst9/4uRl0F2BUvJzTFt37EhMXYNExd+W1BbcYrzvEb8z3+/Nso27aSjcPrBuJ4InKHdPabOJ9tCWvRHkDif+kuuxHgeZhTcoNy34oFv05K5ynTHphSnfR3mfX0dKzVuaQVkcY/tcvHInyZiDc73lH1Y3qFKZCm//ElJiC3B7QTnikEPFd92KYz2qpmOVbBb7UUl3L1JuwNDofeW7dtLuCLr0EsioHLG2+U4VWFPzRNaxjQpFLYTVMv8wjRq2ks8cALXK8eVOb+CyVT7MTgAi25m02MjMgMjShXXYUSM2r8EsTbEiIFBy6j9Q1AIzFcmY8jtB9hO0A+CYAHZZdwKfgFKZqret3AB9gAAAABJRU5ErkJggg==" valign="middle" /> Soundslice</span></button>');
      }
 }
});
}

// load jQuery and execute the main function
addJQuery(main);

