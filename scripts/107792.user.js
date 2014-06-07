// ==UserScript==
// @name           BitGamer Buffer
// @namespace      http://bitgamer.su/
// @description    Show buffer on BitGamer
// @include        http*://*bitgamer.su/*
// ==/UserScript==

var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function readableFileSize(size) {
    var i = 0;
    if(size<0) { size*=-1; var neg = true; }
    while(size >= 1024) {
        size /= 1024;
        i++;
    }
    return (neg?"-":"") + size.toFixed(2) + ' ' + units[i];
}

var match = document.body.getElementsByClassName('cooltop')[0].innerHTML.match(/Downloaded: <font(.*?)&nbsp;([0-9.]+)(.*?)([A-Z]+)<\/font>/);

if(match)
{
  var down = match[2]*Math.pow(1024,units.indexOf(match[4]));
  match = document.body.getElementsByClassName('cooltop')[0].innerHTML.match(/Ratio: <font(.*?)>([0-9.]+)<\/font>/);
  if(match && down > 0)
  {
    var buffer = "<span class=\"buffer\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANS"
    + "UhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjxJREFUeNqUUk1PU0EUPTNv2ldQKS0RWjARF"
    + "/RDYoLuFKJLN0aNYWFC3Lgh7ow/wp0munBpYoxE96Yu2CgbjKkQqRiwKUr6AdhXpKV9fW8+3jhF/4CTTHJz79xz7j1niNYa/3vYfG7uKOg1BzKAOroKo"
    + "BSCi78xwT2TJ0EQPNOBBtPQl7n0SY8wMA+0ggtN1gjIkFDilGk6Fgn13SBQVxsHrQO31V1gYRr+kB7JQOkAMKBNt4md37XnlhVKx+ND0xQUsf4YLMNcU"
    + "Osvyu1qwAyKfy190+YBh6GH067ja6Vwd6O2ganUFBhj8ASHGR4j+w4rlyuPWLt7aL9aeQlpCtFIDNnEJFLJDNa2Ctje3UZlrwplwKInoiiWii7nfJ4JK"
    + "bIlp0i4LyC76mJ933k4fXZmZDQ+huXV5Yov+S3hyttKBA+kFrOU0neMc1UVXk8ADWIR59vPdTWRTGFiLIWlj0uqc+jWhCeaxOzmtrsNr+OD3HkzK23Lt"
    + "rjHcbxvAAFXGAhFcT57AVvlLax8We35gWRiDPl8vl75UbnOaEDlzLkrlpHdKKjgHDTw+VMew/EExk+PI5PJwvM8aEtDSHmyur3zmrU7HXtlMw/+z8hmu"
    + "4Xdxt7b3GLuTHI4MRmJ9CE5mkQ4YmNzfRNm98fM9/25QrFAe0IIX0JK2SKSvK/Va6Ol76W08GR0cDA2Twm59Gunfp9Q+pQRQhbssA2ijY3aAiUUUkmEQ"
    + "qEW6ScbPhFw9pwh4YtFy2JPzF/CHwEGAHnGRclkphHfAAAAAElFTkSuQmCC\" alt=\"Buffer\" /> "+readableFileSize(match[2]*down-down)+"</span>";
    document.getElementsByClassName("cooltop")[0].innerHTML+=buffer;
    document.getElementsByClassName("bottom")[0].innerHTML+="&nbsp;&nbsp;"+buffer;
  }
}