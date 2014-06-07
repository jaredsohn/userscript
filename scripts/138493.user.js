// ==UserScript==
// @name           NewsBlur Favicon Count
// @description    Show the number of unread items in NewsBlur on the favicon. Enable unread count in title or no favicon count will display.
// @version        1.0
// @date           2012-7-15
// @author         Michael P. Geraci, based on GReaderFaviconAlerts by Peter Wooley
// @namespace      http://mgeraci.com, http://peterwooley.oom
// @include        http://*.newsblur.com/*
// @include        https://*.newsblur.com/*
// @include        http://*.newsblur.com/
// @include        http://newsblur.com/
// @include        https://newsblur.com/
// ==/UserScript==

if(typeof GM_getValue == 'undefined') {
  function GM_getValue(name, fallback) {
    return fallback;
  }
}

(function NewsBlurFaviconCount() {
  var self = this;

  this.construct = function() {
    this.head = document.getElementsByTagName("head")[0];
    this.pixelMaps = {
      numbers: {
        0: [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0]
        ],
        1: [
          [0,1,1,0,0],
          [1,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [1,1,1,1,1]
        ],
        2: [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [0,0,0,0,1],
          [0,0,0,1,0],
          [0,0,1,0,0],
          [0,1,0,0,0],
          [1,1,1,1,1]
        ],
        3: [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [0,0,0,0,1],
          [0,0,1,1,0],
          [0,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0]
        ],
        4: [
          [0,0,0,1,0],
          [0,0,1,1,0],
          [0,1,0,1,0],
          [1,0,0,1,0],
          [1,1,1,1,1],
          [0,0,0,1,0],
          [0,0,0,1,0]
        ],
        5: [
          [1,1,1,1,1],
          [1,0,0,0,0],
          [1,1,1,0,0],
          [0,0,0,1,0],
          [0,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0]
        ],
        6: [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,0],
          [1,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0]
        ],
        7: [
          [1,1,1,1,1],
          [0,0,0,0,1],
          [0,0,0,0,1],
          [0,0,0,1,0],
          [0,0,0,1,0],
          [0,0,1,0,0],
          [0,0,1,0,0]
        ],
        8: [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0]
        ],
        9: [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,1],
          [0,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0]
        ],
        i: [
          [0,0,0,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,0,0,0]
        ],
        o: [
          [0,0,0,0,0],
          [0,0,1,0,0],
          [0,1,0,1,0],
          [0,1,0,1,0],
          [0,1,0,1,0],
          [0,0,1,0,0],
          [0,0,0,0,0]
        ],
        '+': [
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,1,0,0],
          [0,1,1,1,0],
          [0,0,1,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0]
        ]
      }
    };

    this.timer = setInterval(this.poll, 500);
    this.poll();

    return true;
  }

  this.drawUnreadCount = function(unread, callback) {
    if(!self.textedCanvas) {
      self.textedCanvas = [];
    }

    if (!self.textedCanvas[unread]) {
      self.getUnreadCanvas(function(iconCanvas) {
        var textedCanvas = document.createElement('canvas');
        textedCanvas.height = textedCanvas.width = iconCanvas.width;
        var ctx = textedCanvas.getContext('2d');
        ctx.drawImage(iconCanvas, 0, 0);

        ctx.strokeStyle = "rgba(255,255,255,0.5)"
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillStyle = "#000";

        var count = unread.length;

        if (count > 2) {
          unread = "ioo+";
          count = unread.length;
        }

        var bgHeight = self.pixelMaps.numbers[0].length;
        var bgWidth = 0;
        var padding = count > 2 ? -1 : 1; // padding between digits
        var topMargin = 7; // canvas height from icon top

        // set the bg width
        if (count > 2) {
          bgWidth = 14
        } else {
          for (var index = 0; index < count; index++) {
            bgWidth += self.pixelMaps.numbers[unread[index]][0].length;
            if (index < count-1) {
              bgWidth += padding;
            }
          }
          bgWidth -= 1;
        }

        // background color
        //ctx.fillRect(textedCanvas.width-bgWidth-4,topMargin,bgWidth+2,bgHeight+2);

        var digit;
        var digitsWidth = bgWidth;

        // stroke
        for (var index = 0; index < count; index++) {
          digit = unread[index];

          if (self.pixelMaps.numbers[digit]) {
            var map = self.pixelMaps.numbers[digit];
            var height = map.length;
            var width = map[0].length;

            for (var y = 0; y < height; y++) {
              for (var x = 0; x < width; x++) {
                if (map[y][x]) {
                  ctx.strokeRect(12 - digitsWidth + x, y + topMargin + 0, 3, 3);
                }
              }
            }

            digitsWidth -= width + padding;
          }
        }

        // fill
        digitsWidth = bgWidth;
        for (var index = 0; index < count; index++) {
          digit = unread[index];

          if (self.pixelMaps.numbers[digit]) {
            var map = self.pixelMaps.numbers[digit];
            var height = map.length;
            var width = map[0].length;

            for (var y = 0; y < height; y++) {
              for (var x = 0; x < width; x++) {
                if(map[y][x]) {
                  ctx.fillRect(13 - digitsWidth + x, y+topMargin+1, 1, 1);
                }
              }
            }

            digitsWidth -= width + padding;
          }
        }

        self.textedCanvas[unread] = textedCanvas;

        callback(self.textedCanvas[unread]);
      });
    }

    if (self.textedCanvas[unread]){
      callback(self.textedCanvas[unread]);
    }
  }
  this.getIcon = function(callback) {
    self.getUnreadCanvas(function(canvas) {
      callback(canvas.toDataURL('image/png'));
    });
  }
  this.getUnreadCanvas = function(callback) {
    if(!self.unreadCanvas) {
      self.unreadCanvas = document.createElement('canvas');
      self.unreadCanvas.height = self.unreadCanvas.width = 16;

      var ctx = self.unreadCanvas.getContext('2d');
      var img = new Image();

      img.addEventListener("load", function() {
        ctx.drawImage(img, 0, 0);
        callback(self.unreadCanvas);
      }, true);

    img.src = '/media/img/favicon.png'
    } else {
      callback(self.unreadCanvas);
    }
  }
  this.getUnreadCount = function() {
    matches = self.getSearchText().match(/\((.*)\)/);
    return matches ? matches[1] : false;
  }
  this.getUnreadCountIcon = function(callback) {
    var unread = self.getUnreadCount();
    self.drawUnreadCount(unread, function(icon) {
      callback(icon.toDataURL('image/png'));
    });
  }
  this.getSearchText = function() {
    return document.title;
  }
  this.poll = function() {
    if(self.getUnreadCount()) {
      self.getUnreadCountIcon(function(icon) {
        self.setIcon(icon);
      });
    } else {
      self.getIcon(function(icon) {
        self.setIcon(icon);
      });
    }
  }

  this.setIcon = function(icon) {
    var links = self.head.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++)
      if ((links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
         links[i].href != icon)
        self.head.removeChild(links[i]);
      else if(links[i].href == icon)
        return;

    var newIcon = document.createElement("link");
    newIcon.type = "image/png";
    newIcon.rel = "shortcut icon";
    newIcon.href = icon;
    self.head.appendChild(newIcon);

    // Chrome hack for updating the favicon
    var shim = document.createElement('iframe');
    shim.width = shim.height = 0;
    document.body.appendChild(shim);
    shim.src = "icon";
    document.body.removeChild(shim);
  }

  this.toString = function() { return '[object NewsBlurFaviconCount]'; }

  return this.construct();
}());
