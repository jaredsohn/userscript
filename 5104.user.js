// ==UserScript==
// @name             Show Keybind In Gmail
// @namespace        http://espion.just-size.jp/archives/05/136155838.html
// @include          http://mail.google.com/mail/*
// @include          https://mail.google.com/mail/*
// ==/UserScript==

const HELPURL = 'https://mail.google.com/support/bin/answer.py?answer=6594';
const LOADING = 'data:image/gif;base64,'+
      'R0lGODlhEAAQAPMAAP///2Zm/4uL/tfX/pWV/q6u/uPj/ra2/sfH/uvr/szM'+
      '/tjY/vHx/tvb/gAAAAAAACH+FU1hZGUgYnkgQWpheExvYWQuaW5mbwAh+QQB'+
      'AAAAACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAEPBDI'+
      'Sau9dggxMBVBIHgTKJKSxpFGURgoUBBEEc913L6xlCCIRAxxOCCGRQRjsWBg'+
      'fsGFQrGISamxZdMSAQAh+QQACgABACwAAAAAEAAQAAAEPhDIOYQYM2sRgtCT'+
      'URQG54FSQRBFdaGAysKZSNJAgiAJLiGHA8IHAAqJOh5RwlgsGMSFQrGITqu+'+
      '5nPJ7UYAACH5BAAKAAIALAAAAAAQABAAAAQ+EMhpSjEz60JI0VOCIAnnDYIw'+
      'ZMhxINUlBIHAukg215lIZiiVhLFYMECghUKxQGqUTGeGaJRar9isdst1RgAA'+
      'IfkEAAoAAwAsAAAAABAAEAAABD4QyJkQSjNrdA7SE7MsDOcZRWFki6Is1VUQ'+
      'RMG6SzbXmUhmKBVoCBgIBANiRhAICJQTphMqMSKp2Kx2y91GAAAh+QQACgAE'+
      'ACwAAAAAEAAQAAAEPRDIydZiM+ul1NIgwHkJgiQhUF3IcSBp1r7xVJ51ZhSF'+
      'kQMFAqHwCw5/u15tIBAMfoJAQACVUnNM528biwAAIfkEAAoABQAsAAAAABAA'+
      'EAAABDwQyEmrvdiytViei6IsnxSOJbB1qZQgSJIix4HM9V2+8WcUBUOqQCAU'+
      'MAOBYEA0YgSBgOAXfEYFqeTSEgEAIfkEAAoABgAsAAAAABAAEAAABDwQyEmr'+
      'vTjrzbufzLIw3KIoS3mmWzhKgyAMVIIgCSUEgUAhhwNCxxMYCgUDUEiJzQoE'+
      'QsGGw0ClnGPSEgEAIfkEAAoABwAsAAAAABAAEAAABDsQyEmrvTjrzXsdgjBw'+
      'QhAIpIluoOgZRWFQzLIwVEEQBbUoikVuV0ggEIlfkAKTIQ4HRO2GeUY5RqQl'+
      'AgA7AAAAAAAAAAAA';

function gmailHelp(html) {
   var start = html.indexOf('h3') - 1;
   var end   = html.indexOf('xx-small', start);
   return html.substr(start, end - start);
}

var Element = function() {
      this.initialize.apply(this, arguments);
};

Element.prototype = {
   initialize: function() {
      var div = document.createElement('div');

      with(div.style) {
         bottom   = 0;
         left     = 0;
         display  = 'none';
         position = 'fixed';
         color    = "#000";
         backgroundColor = "#FFF";
         zIndex   = 100;
         overflow = 'auto';
      }

      document.body.appendChild(div);

      this.elm = div;
      this.style = {};
   },

   callback: function(a) {
      return a;
   },

   load: function() {
      this.load = function() { };

      var self = this;

      with(this.elm.style) {
         height = '70%';
         width  = '60%';
      }

      for(var i in this.style) {
         this.elm.style[i] = (this.style[i]);
      }

      this.elm.innerHTML =
         '<div align="center"><img width="32" src="'+LOADING+'"> loading...</div>';

      GM_xmlhttpRequest({
         method: 'GET',
         url: HELPURL,
         onload: function(resp) {
            self.elm.innerHTML = self.callback(resp.responseText);
         },
         onerror: function() {
            self.elm.innerHTML = 'HTTP Load Error';
         }
      });
   },

   toggle: function() {
      this.load();
      this.elm.style.display = this.elm.style.display ? '' : 'none';
   }
};

function main() {
   var obj = new Element();
   obj.callback = gmailHelp;
   obj.style.width = '60%';
   obj.style.left  = '20%';
   obj.style.padding = '1em';

   document.addEventListener(
      'keypress',
      function(e) {
         var target = e.target.tagName;
         if(target == 'INPUT' || target == 'TEXTAREA') return;
         if(e.charCode == 63)
            obj.toggle();
      },
      false
   );
}

main();

