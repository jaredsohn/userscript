// ==UserScript==
// @name           HKWIC Alerter Fix
// @namespace      mailto:ch_xxvi@yahoo.com.hk?subject=About%20HKWIC%20Alerter%20Fix
// @include        http://www.weather.com.hk/cgi-bin/detect.pl*
// @include        http://weather.com.hk/cgi-bin/detect.pl*
// @include        http://www.weather.com.hk/detect/detect.pl*
// @include        http://weather.com.hk/detect/detect.pl*
// @description    Fix compatibility of HKWIC Alerter on Firefox
// ==/UserScript==


objBgsound = document.getElementsByTagName('bgsound');
if (objBgsound.length>0)
{
  wavefile = objBgsound[0].getAttribute('src');
  if (!wavefile) {
    // try possibility of MediaWrap convertion applied
    wavefile = document.getElementsByTagName('embed')[0].src;
  }
  newEmb = document.createElement('embed');
  newEmb.width = 0;
  newEmb.height = 0;
  newEmb.type = 'audio/wav';
  newEmb.setAttribute('autoplay', 'true');
  newEmb.src = 'http://www.weather.com.hk/cgi-bin/'+wavefile;
  document.body.appendChild(newEmb);
}
