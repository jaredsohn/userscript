// ==UserScript==
// @name        Image Posting for 4chan
// @namespace   very
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// @version     1.8
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
   var urlPattern = /https?:\/\/[^\s"'>]+|data:[^\s=]+=/;

   var namespace = 'very.aip.';
   function getValue(key, def) {
      key = namespace + key;
      return key in localStorage ? localStorage[key] : def;
   }
   function setValue(key, value) {
      key = namespace + key;
      localStorage[key] = value;
   }
   function deleteValue(key) {
      key = namespace + key;
      delete localStorage[key];
   }
   var xmlhttpRequest = function(options) {
      var asBuffer = (String(options.responseType).toLowerCase() === 'arraybuffer');
      var async = options.async = ('async' in options) ? !!options.async : true;
      if (this.GM_xmlhttpRequest && !asBuffer) {
         GM_xmlhttpRequest(options);
         return;
      }
      var xhr = new XMLHttpRequest();
      xhr.open(options.method, options.url, async);
      if (options.onprogress) {
         xhr.addEventListener('progress', options.onprogress.bind(xhr), false);
      }
      if (options.onerror) {
         if (this.GM_xmlhttpRequest && asBuffer) {
            xhr.addEventListener('error', function() {
               var oldOnload = options.onload;
               options.onload = function(e) {
                  if (!e.response) {
                     e.response = string2buffer(e.responseText);
                  }
                  oldOnload.call(this, e);
               };
               GM_xmlhttpRequest(options);
            }, false);
         } else {
            xhr.addEventListener('error', options.onerror.bind(xhr), false);
         }
      }
      if (options.onload) {
         xhr.addEventListener('load', function(e) {
            xhr.responseHeaders = xhr.getAllResponseHeaders();
            if (asBuffer) {
               if (!xhr.response) {
                  if (xhr.mozResponseArrayBuffer) {
                     xhr.response = xhr.mozResponseArrayBuffer;
                  } else {
                     xhr.response = string2buffer(e.responseText);
                  }
               }
            }
            options.onload.call(xhr, xhr);
         }, false);
      }
      if (asBuffer) {
         xhr.responseType = 'arraybuffer';
         xhr.overrideMimeType('text/plain; charset=x-user-defined');
      } else if (options.overrideMimeType) {
         xhr.overrideMimeType(options.overrideMimeType);
      }
      if ('data' in options) {
         xhr.send(options.data);
      } else {
         xhr.send();
      }
   };
   var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
   function string2Buffer(string) {
      var array = new Uint8Array(string.length);
      Array.prototype.map.call(string, String.prototype.charCodeAt, string);
      for (var i = 0, len = string.length; i < len; i++) {
         array[i] = string.charCodeAt(i) & 0xFF;
      }
      return array.buffer;
   }
   var eventSystem = {
      listeners: {},
      on: function(type, callback) {
         type = type.toLowerCase();
         if (!Object.prototype.hasOwnProperty.call(this.listeners, type)) {
            this.listeners[type] = [callback];
         } else {
            var l = this.listeners[type];
            if (l.indexOf(callback) < 0) {
               l.push(callback);
            }
         }
      },
      removeListener: function(type, callback) {
         type = type.toLowerCase();
         if (Object.prototype.hasOwnProperty.call(this.listeners, type)) {
            var l = this.listeners[type];
            var i = l.indexOf(callback);
            if (i >= 0) {
               if (l.length === 1) {
                  delete this.listeners[type];
               } else {
                  l.splice(i, 1);
               }
               return true;
            }
         }
         return false;
      },
      fire: function(type) {
         type = type.toLowerCase();
         if (Object.prototype.hasOwnProperty.call(this.listeners, type)) {
            var l = this.listeners[type].slice();
            var data = Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < l.length; i++) {
               l[i].apply(this, data);
            }
         }
      }
   };
   
   function getPageBackgroundColor() {
      var e;
      if (0 <= location.pathname.indexOf('/res/')) {
         e = document.createElement('div');
         e.className = 'reply';
      } else {
         e = document.body;
      }
      return getComputedStyle(e).backgroundColor;
   }

   function createProgress() {
      var progress = document.createElement('div');
      var bar = document.createElement('div');
      var text = document.createElement('div');
      progress.appendChild(bar);
      progress.appendChild(text);
      progress.style.display = 'none';
      progress.style.position = 'relative';
      progress.style.border = '1px solid black';
      progress.style.width = '300px';
      progress.style.height = '20px';
      bar.style.position = 'absolute';
      bar.style.width = '0%';
      bar.style.height = '100%';
      bar.style.backgroundColor = 'rgb(0,255,0)';
      text.style.display = 'table-cell';
      text.style.verticalAlign = 'middle';
      text.style.textAlign = 'center';
      text.style.position = 'absolute';
      text.style.width = '100%';
      text.style.height = '100%';
      text.textContent = '0%';
      return {
         node: progress,
         show: function() {
            progress.style.display = 'block';
         },
         hide: function() {
            progress.style.display = 'none';
         },
         set: function(p) {
            p = Math.floor(p * 100) + '%';
            bar.style.width = p;
            text.textContent = p;
         }
      };
   }

   function createPaintbox() {
      var filename = '', filetype = 'image/png';
      var paintbox = {
         quality: 0.95,
         backColor: 'white',
         foreColor: 'black',
         lineWidth: 4
      };
      var types = {
         'image/png': {ext: '.png'},
         'image/gif': {ext: '.gif'},
         'image/jpeg': {ext: '.jpg'},
         all: {ext: ['.png', '.gif', '.jpg']},
         byExt: {
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.jpg': 'image/jpeg'
         }
      };
      var canv = paintbox.node = document.createElement('canvas');
      var ctx = canv.getContext('2d');
      var uploadBuffer = null, uploadBufferType;
      var lastX, lastY, empty = true;
      paintbox.rotate = function(degrees) {
         var rad = degrees / 180 * Math.PI;
         var s = Math.sin(rad);
         var c = Math.cos(rad);
         var width = canv.width;
         var height = canv.height;
         var newWidth = Math.abs(width * c) + Math.abs(height * s);
         var newHeight = Math.abs(height * c) + Math.abs(width * s);
         paintbox.filter(function(buffer, ctx) {
            buffer.width = newWidth;
            buffer.height = newHeight;
            ctx.translate(newWidth * 0.5, newHeight * 0.5);
            ctx.rotate(rad);
            ctx.drawImage(canv, width * -0.5, height * -0.5);
         });
      };
      paintbox.mirror = function() {
         paintbox.filter(function(buffer, ctx) {
            var width = buffer.width = canv.width;
            buffer.height = canv.height;
            ctx.translate(width * 0.5, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(canv, width * -0.5, 0);
         });
      };
      paintbox.reduceColors = function() {
         GIF.reduceColors(canv, 8, true);
         uploadBuffer = null;
         paintbox.setFiletype('image/gif');
      };
      paintbox.setSize = function(x, y) {
         uploadBuffer = null;
         canv.width = x;
         canv.height = y;
         paintbox.clear();
         paintbox.fire('resize', x, y);
      };
      paintbox.clear = function() {
         ctx.fillStyle = paintbox.backColor;
         ctx.fillRect(0, 0, canv.width, canv.height);
         empty = true;
         uploadBuffer = null;
         paintbox.setFilename('');
         paintbox.setFiletype('image/png');
      };
      paintbox.startDrawing = function(x, y) {
         lastX = x;
         lastY = y;
      };
      paintbox.resumeDrawing = function(x, y) {
         if (x !== lastX || y !== lastY) {
            empty = false;
            uploadBuffer = null;
            ctx.strokeStyle = paintbox.foreColor;
            ctx.lineWidth = paintbox.lineWidth;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            lastX = x;
            lastY = y;
         }
      };
      paintbox.finishDrawing = function(x, y) {
         if (x !== lastX || y !== lastY) {
            empty = false;
            uploadBuffer = null;
            ctx.strokeStyle = paintbox.foreColor;
            ctx.lineWidth = paintbox.lineWidth;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
         }
      };
      paintbox.filter = function(filter) {
         var buffer = document.createElement('canvas');
         var bufferCtx = buffer.getContext('2d');
         filter(buffer, bufferCtx);
         var resized = false;
         if (buffer.width !== canv.width) {
            canv.width = buffer.width;
            resized = true;
         }
         if (buffer.height !== canv.height) {
            canv.height = buffer.height;
            resized = true;
         }
         uploadBuffer = null;
         if (!resized) {
            ctx.clearRect(0, 0, canv.width, canv.height);
         }
         ctx.drawImage(buffer, 0, 0);
         if (resized) {
            paintbox.fire('resize', canv.width, canv.height);
         }
      }
      paintbox.loadFile = function(file, callback) {
         var reader = new FileReader();
         var filename = file.name ? '' + file.name : '';
         var index = filename.lastIndexOf('.');
         if (1 <= index) {
            filename = filename.substring(0, index);
         }
         if (file.type === 'image/gif' && reader.readAsArrayBuffer) {
            reader.onload = function() {
               paintbox.loadGIFBuffer(reader.result, function() {
                  paintbox.setFilename(filename);
                  if (callback) callback();
               });
            };
            reader.readAsArrayBuffer(file);
         } else {
            reader.onload = function() {
               paintbox.loadDataUrl(reader.result, function() {
                  paintbox.setFilename(filename);
                  if (file.type in types && reader.readAsArrayBuffer) {
                     reader.onload = function() {
                        uploadBuffer = reader.result;
                        uploadBufferType = file.type;
                        if (callback) callback();
                     };
                     reader.readAsArrayBuffer(file);
                  } else {
                     if (callback) callback();
                  }
               });
            };
            reader.readAsDataURL(file);
         }
      };
      paintbox.loadGIFBuffer = function(buffer, callback) {
         var gif = new GIF().readHeader(new GIF.Reader(new Uint8Array(buffer)));
         paintbox.setSize(gif.width, gif.height);
         gif.readNextFrame();
         ctx.clearRect(0, 0, gif.width, gif.height);
         new GIF.Painter(gif, ctx).paint(0);
         empty = false;
         uploadBuffer = buffer;
         uploadBufferType = 'image/gif';
         paintbox.setFilename('');
         paintbox.setFiletype('image/gif');
         if (callback) callback();
      };
      paintbox.loadDataUrl = function(url, callback) {
         if (url.substring(0, 15) === 'data:image/gif;') {
            var data;
            if (url.substring(15, 22) === 'base64,') {
               data = url.substring(22);
               data = atob(data);
            } else {
               data = url.substring(15);
            }
            data = [].map.call(data, function(c) {
               return c.charCodeAt(0);
            });
            var gif = new GIF().readHeader(new GIF.Reader(data));
            paintbox.setSize(gif.width, gif.height);
            gif.readNextFrame();
            ctx.clearRect(0, 0, gif.width, gif.height);
            new GIF.Painter(gif, ctx).paint(0);
            empty = false;
            uploadBuffer = null;
            paintbox.setFilename('');
            paintbox.setFiletype('image/gif');
            if (callback) callback();
         } else {
            var img = new Image();
            img.onload = function() {
               paintbox.setSize(img.width, img.height);
               ctx.clearRect(0, 0, img.width, img.height);
               ctx.drawImage(img, 0, 0);
               empty = false;
               uploadBuffer = null;
               paintbox.setFilename('');
               paintbox.setFiletype(/^data:([^;]*);/.exec(url)[1]);
               if (callback) callback();
            };
            img.src = url;
         }
      };
      paintbox.loadUrl = function(url, progress, error, callback) {
         if (url.substring(0, 5) === 'data:') {
            paintbox.loadDataUrl(url, callback);
         } else {
            downloadImage(url, progress, error, function(e) {
               paintbox.loadDataUrl('data:' + e.contentType + ';base64,' + btoa(e.data), function() {
                  var m = /^https?:\/.*\/([^\/?#]+)(?:$|[?#])/.exec(url);
                  var filename = '';
                  if (m) {
                     filename = m[1];
                     var index = filename.lastIndexOf('.');
                     if (1 <= index) {
                        filename = filename.substring(0, index);
                     }
                  }
                  paintbox.setFilename(filename);
                  paintbox.setFiletype(e.contentType);
                  if (callback) callback();
               });
            });
         }
      };
      paintbox.isEmpty = function() {
         return empty;
      };
      paintbox.getFiletype = function() {
         return filetype;
      };
      paintbox.setFiletype = function(type) {
         type = '' + type;
         if (type in types && type !== filetype) {
            filetype = type;
            paintbox.fire('filetypeChange', filetype);
         }
      };
      paintbox.getFilename = function() {
         return filename;
      };
      paintbox.setFilename = function(name) {
         name = '' + name;
         if (name !== filename) {
            filename = name;
            paintbox.fire('filenameChange', filename);
         }
      }
      /*paintbox.setFilenameAndExtension = function(f) {
         if (f === null && filename !== null) {
            filename = null;
            paintbox.fire('filenamechange');
         } else if (f !== null) {
            var ext = f.slice(-4).toLowerCase();
            if (ext in types.all.ext) {
               if (ext !== )
            }
         }
         if (f === null || f.length <= 260 && 0 <= types.all.ext.indexOf(f.slice(-4).toLowerCase())) {
            filename = f;
         } else if (0 <= types.all.ext.indexOf(f.slice(-4).toLowerCase())) {
            filename = f.slice(0, 256) + f.slice(-4);
         } else if (f.length > 256) {
            filename = f.slice(0, 256) + types[paintbox.getFiletype()].ext;
         } else {
            filename = f + types[paintbox.getFiletype()].ext;
         }
         if (filename !== old) {
            paintbox.fire('filenameChange', filename, old);
         }
         return f === filename;
      };*/
      paintbox.appendTo = function(formdata, name) {
         var quality = paintbox.quality;
         var fname = filename;
         if (!fname) {
            fname = '' + Date.now();
         }
         fname += types[filetype].ext;
         if (uploadBuffer) {
            if (uploadBufferType === filetype) {
               appendBuffer(uploadBuffer);
               return;
            }
         }
         if (filetype === 'image/gif') {
            uploadBuffer = new Uint8Array(GIF.fromCanvas(canv).write(new GIF.Writer()).result).buffer;
            uploadBufferType = filetype;
            appendBuffer(uploadBuffer);
         } else {
            var canv2 = canv;
            if (filetype === 'image/jpeg') {
               canv2 = document.createElement('canvas');
               canv2.width = canv.width;
               canv2.height = canv.height;
               var ctx = canv2.getContext('2d');
               ctx.fillStyle = getPageBackgroundColor();
               ctx.fillRect(0, 0, canv.width, canv.height);
               ctx.drawImage(canv, 0, 0);
            }
            if (canv2.mozGetAsFile) {
               formdata.append(name, canv2.mozGetAsFile(fname, filetype));
            } else {
               uploadBuffer = string2Buffer(atob(canv2.toDataURL(filetype, quality).substring(('data:' + filetype + ';base64,').length)));
               uploadBufferType = filetype;
               appendBuffer(uploadBuffer);
            }
         }
         function appendBuffer(buffer) {
            var bb, blob;
            if (BlobBuilder && (bb = new BlobBuilder()).getFile) {
               bb.append(buffer);
               try {
                  formdata.append(name, bb.getFile(fname, filetype));
                  return;
               } catch (e) { }
               blob = bb.getBlob(filetype);
            } else {
               blob = new Blob([buffer], {type: filetype});
            }
            formdata.append(name, blob, fname);
         }
      };
      enhance(paintbox, eventSystem);
      paintbox.setSize(250, 250);
      paintbox.clear();
      return paintbox;
   }



   function createGui(paintbox) {
      var gui = {
         paintbox: paintbox
      };
      paintbox.on('resize', function(x, y) {
         glass.style.width = back.style.width = x + 'px';
         glass.style.height = back.style.height = y + 'px';
      });
      paintbox.node.style.position = 'absolute';
      paintbox.node.style.left = '0px';
      paintbox.node.style.top = '0px';
      var cont = gui.node = document.createElement('div');
      var workspace = gui.workspace = document.createElement('div');
      workspace.tabIndex = -1;
      workspace.style.position = 'relative';
      workspace.style.width = '300px';
      workspace.style.height = '50px';
      workspace.style.backgroundColor = 'rgb(200,200,200)';
      workspace.style.border = '1px solid black';
      workspace.style.overflow = 'scroll';
      workspace.style.resize = 'both';
      var back = gui.back = (function createBack() {
         var back = document.createElement('div');
         back.style.width = '250px';
         back.style.height = '250px';
         back.style.position = 'absolute';
         back.style.left = '0px';
         back.style.top = '0px';
         back.style.backgroundImage = 'url(' + paintDataURL(16, 16, function(ctx) {
            ctx.fillStyle = 'rgb(153,153,153)';
            ctx.fillRect(0, 0, 16, 16);
            ctx.fillStyle = 'rgb(102,102,102)';
            ctx.fillRect(0, 0, 8, 8);
            ctx.fillRect(8, 8, 8, 8);
         }) + ')';
         return back;
      }());
      var glass = gui.glass = (function createGlass() {
         var glass = document.createElement('div');
         glass.contentEditable = true;
         glass.style.width = '250px';
         glass.style.height = '250px';
         glass.style.position = 'absolute';
         glass.style.left = '0px';
         glass.style.top = '0px';
         glass.addEventListener('mousedown', onMouseDown, false);
         function onMouseDown(e) {
            if (e.button === 0) {
               glass.addEventListener('mousemove', onMouseMove, false);
               glass.addEventListener('mouseup', onMouseUp, false);
               paintbox.startDrawing(e.layerX, e.layerY);
            }
         }
         function onMouseMove(e) {
            paintbox.resumeDrawing(e.layerX, e.layerY);
         }
         function onMouseUp(e) {
            glass.removeEventListener('mousemove', onMouseMove, false);
            glass.removeEventListener('mouseup', onMouseUp, false);
            paintbox.finishDrawing(e.layerX, e.layerY);
         }
         glass.addEventListener('dragenter', onDrag, false);
         glass.addEventListener('dragexit', onDrag, false);
         glass.addEventListener('dragover', onDrag, false);
         glass.addEventListener('drop', onDrop, false);
         glass.addEventListener('input', onInput, false);
         glass.addEventListener('paste', onPaste, false);
         var error = document.getElementById('fileError');
         function onDrag(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
         }
         function onDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            var m, url, dt = e.dataTransfer;
            if (dt.files.length > 0) {
               paintbox.loadFile(dt.files[0]);
            } else if (url = dt.getData('text/x-moz-url-data')) {
               paintbox.loadUrl(url, progress, error);
            } else if (url = dt.getData('text/uri-list')) {
               paintbox.loadUrl(url, progress, error);
            } else if (m = dt.getData('text/html') || dt.getData('text/plain') || dt.getData('text')) {
               if (m = urlPattern.exec(m)) {
                  url = m[0];
                  paintbox.loadUrl(url, progress, error);
               }
            }
         }
         function onInput(e) {
            glass.blur();
            if (glass.firstChild !== null) {
               var img = glass.querySelector('img');
               if (img) {
                  paintbox.loadUrl(img.src, progress, error);
               } else {
                  var m = urlPattern.exec(glass.textContent);
                  if (m) {
                     paintbox.loadUrl(m[0], progress, error);
                  }
               }
               do {
                  glass.removeChild(glass.firstChild);
               } while (glass.firstChild !== null);
            }
         }
         function onPaste(e) {
            if (e.clipboardData) {
               var items = e.clipboardData.items;
               for (var i = 0; i < items.length; i++) {
                  if (items[i].type.lastIndexOf('image/', 0) === 0) {
                     paintbox.loadFile(items[i].getAsFile());
                     e.preventDefault();
                     return;
                  }
               }
            }
         }
         return glass;
      }());
      var menu = gui.menu = createMenu();
      var meta = gui.meta = createMeta();
      cont.appendChild(menu.node);
      cont.appendChild(workspace);
      
      workspace.appendChild(back);
      workspace.appendChild(paintbox.node);
      workspace.appendChild(glass);
      var fileUpload = document.createElement('input');
      fileUpload.type = 'file';
      fileUpload.tabIndex = -1;
      var hiddenDiv = document.createElement('div');
      hiddenDiv.style.width = '0px';
      hiddenDiv.style.height = '0px';
      hiddenDiv.style.overflow = 'hidden';
      hiddenDiv.appendChild(fileUpload);
      menu.node.appendChild(hiddenDiv);
      fileUpload.addEventListener('change', function(e) {
         if (fileUpload.files.length > 0) {
            var file = fileUpload.files[0];
            paintbox.loadFile(file);
         }
      }, false);
      menu.fileOpen.addEventListener('click', function(e) {
         e.preventDefault();
         fileUpload.click();
      }, false);
      menu.clear.addEventListener('click', function(e) {
         e.preventDefault();
         paintbox.setSize(250, 250);
         paintbox.clear();
      }, false);
      menu.rotate.addEventListener('click', function(e) {
         e.preventDefault();
         paintbox.rotate(90);
      }, false);
      menu.mirror.addEventListener('click', function(e) {
         e.preventDefault();
         paintbox.mirror();
      }, false);
      menu.reduceColors.addEventListener('click', function(e) {
         e.preventDefault();
         paintbox.reduceColors();
      }, false);
      meta.filename.addEventListener('change', function(e) {
         paintbox.setFilename(meta.filename.value);
      }, false);
      paintbox.on('filenameChange', function(filename) {
         meta.filename.value = filename;
      });
      meta.filetype.addEventListener('change', function(e) {
         paintbox.setFiletype(meta.filetype.value);
      }, false);
      paintbox.on('filetypeChange', function(filetype) {
         meta.filetype.value = filetype;
      });
      meta.filetype.value = paintbox.getFiletype();
      gui.reset = function() {
         paintbox.setSize(250, 250);
         paintbox.clear();
      };
      return gui;

      function paintDataURL(width, height, painter) {
         var canvas = document.createElement('canvas');
         canvas.width = width;
         canvas.height = height;
         var ctx = canvas.getContext('2d');
         painter(ctx);
         return canvas.toDataURL();
      }
   }

   function createMenu() {
      var menu = {};
      var cont = menu.node = document.createElement('div');
      var imgClear = new Image();
      imgClear.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAA10lEQVQ4je3Sy2rCUBSFYZ8wLxb6Hh1KR6UgFISCUCmirVSt15AqSkwlyUnO7e+oEoIWzJmU4oI12YMP9mY3Gtf8v/i+z6l6noczXM3PzAn/DXbCq7DSHE9Rbm3YWpAaktwSpYabVnxsbdhYyBUchGGXaIK94mMrGYTSDc6kJRaGzUGzjBSjjaQXFHTmuRscpYbwSzPbSYbrgpdVwdNU0HrP3OAgVky2ktfPgudFTnsieBhm3PVTN7i8+uNYcP+W0eyl3HYTN7j8AadaC67+67leDF/z9/MNSsBkmtZpS7IAAAAASUVORK5CYII=';
      var btnClear = menu.clear = document.createElement('button');
      btnClear.appendChild(imgClear);
      imgClear.style.margin = '-6px -10px';
      cont.appendChild(btnClear);
      var imgFileOpen = new Image();
      imgFileOpen.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAWUlEQVQ4je3QUQrAIAwD0Bzdo/Vm8WeUTpy0kg8ZBoII9YkCNyeGoVJ0tpdeEvEUXHlqepakeYeDY0t5wV89G8b6O/b/uDXQbL2WYCXqsBrFMyhHHU725q/pi/T/hP8F3fMAAAAASUVORK5CYII=';
      var btnFileOpen = menu.fileOpen = document.createElement('button');
      btnFileOpen.appendChild(imgFileOpen);
      imgFileOpen.style.margin = '-6px -10px';
      cont.appendChild(btnFileOpen);
      var imgRotate = new Image();
      imgRotate.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAANklEQVQ4y2NgGAWjAB0w4hD/T6Q6isF/LJZR3YJhajgTrWweNAb/JzZIGCkMX8YhlTJGwXAFACnxCgGnlDieAAAAAElFTkSuQmCC';
      var btnRotate = menu.rotate = document.createElement('button');
      btnRotate.appendChild(imgRotate);
      imgRotate.style.margin = '-6px -10px';
      cont.appendChild(btnRotate);
      var imgMirror = new Image();
      imgMirror.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAKUlEQVQ4y2NgGAWjYPiC/7RQ+58aDmGkgqH4zKO+i+kaxqNgFIwCKAAA+a8I+hwlsj8AAAAASUVORK5CYII=';
      var btnMirror = menu.mirror = document.createElement('button');
      btnMirror.appendChild(imgMirror);
      imgMirror.style.margin = '-6px -10px';
      cont.appendChild(btnMirror);
      var imgReduceColors = new Image();
      imgReduceColors.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAUklEQVQ4y+2TMQ4AIAgDgfD/L9fJrSAx6MRNBKFgjSLD8A0lOSS1IDHV9EBUi8Oi5cQKomFzhr3y2A/nKGyNisfZg1173IqRyXjh8b465osP/SyMBgwb6gEVNwAAAABJRU5ErkJggg==';
      var btnReduceColors = menu.reduceColors = document.createElement('button');
      btnReduceColors.appendChild(imgReduceColors);
      imgReduceColors.style.margin = '-6px -10px';
      cont.appendChild(btnReduceColors);
      return menu;
   }

   function createMeta() {
      var meta = {};
      meta.node = document.createElement('tr');
      var td = document.createElement('td');
      td.textContent = 'Meta';
      meta.node.appendChild(td);
      td = document.createElement('td');
      var table = meta.tableNode = document.createElement('table');
      td.appendChild(table);
      meta.node.appendChild(td);
      meta.add = function(description, node) {
         var tr = document.createElement('tr');
         var td = document.createElement('td');
         td.textContent = description;
         tr.appendChild(td);
         td = document.createElement('td');
         for (var i = 1; i < arguments.length; i++) {
            td.appendChild(arguments[i]);
         }
         tr.appendChild(td);
         meta.tableNode.appendChild(tr);
         return td;
      };
      var txtFilename = meta.filename = document.createElement('input');
      var selFiletype = meta.filetype = document.createElement('select');
      selFiletype.size = 1;
      selFiletype.add(new Option('.png', 'image/png'));
      selFiletype.add(new Option('.jpg', 'image/jpeg'));
      selFiletype.add(new Option('.gif', 'image/gif'));
      meta.add('Filename', txtFilename, selFiletype);
      return meta;
   }

   var postform = document.forms.post;
   if (!postform) {
      return;
   }
   var upfile = postform.elements.upfile;
   var com = postform.elements.com;
   var gui = createGui(createPaintbox());
   var progress = createProgress();

   var switcher = document.createElement('select');
   switcher.style.width = '100%';
   switcher.style.height = '100%';
   switcher.size = 1;
   switcher.add(new Option('File', 'file'));
   switcher.add(new Option('Image', 'image'));
   switcher.value = getValue('switcher', 'file');
   upfile.parentNode.previousSibling.innerHTML = '';
   upfile.parentNode.previousSibling.appendChild(switcher);
   upfile.parentNode.previousSibling.style.padding = '0px';
   switcher.addEventListener('change', onswitched, false);
   if (switcher.value !== 'file') onswitched();

   function onswitched() {
      setValue('switcher', switcher.value);
      if (switcher.value === 'file') {
         gui.node.parentNode.removeChild(gui.node);
         progress.node.parentNode.removeChild(progress.node);
         gui.meta.node.parentNode.removeChild(gui.meta.node);
         upfile.style.display = '';
         postform.removeEventListener('submit', onsubmit, false);
      } else if (switcher.value === 'image') {
         var td = upfile.parentNode;
         var tr = td.parentNode;
         var tbody = tr.parentNode;
         td.insertBefore(gui.node, upfile);
         td.insertBefore(progress.node, upfile);
         tbody.insertBefore(gui.meta.node, tr.nextSibling);
         upfile.style.display = 'none';
         postform.addEventListener('submit', onsubmit, false);
      }
   }

   function onsubmit(e) {
      if (e) e.preventDefault();
      document.getElementById('fileError').innerHTML = '';
      var fd = new FormData(postform);
      if (!gui.paintbox.isEmpty()) {
         gui.paintbox.appendTo(fd, 'upfile');
      }
      var xhr = new XMLHttpRequest();
      xhr.open('POST', postform.action, true);
      xhr.withCredentials = true;
      xhr.addEventListener('load', function(e) {
            progress.hide();
            var rt = xhr.responseText;
            var m;
            if (m = /<meta http-equiv="refresh" content="1;URL=((https?:\/\/boards\.4chan\.org\/[^\/]+\/res\/(\d+))(?:#p(\d+))?)"\/?>/.exec(rt)) {
               var url = m[1], threadId = m[3], postId = m[4] || m[3];
               if (location.href.substring(0, location.href.length - location.hash.length) === m[2]) {
                  if (document.getElementById('p' + postId)) {
                     if (location.hash === '#p' + postId) {
                        document.getElementById('p' + postId).scrollIntoView();
                     } else {
                        location.hash = '#p' + postId;
                     }
                     clearFields();
                  } else {
                     evalOnPage(
                        'if (window.ThreadUpdater) {\n' +
                        '   (function (id) {\n' +
                        '      var triesLeft = 3;\n' +
                        '      setTimeout(function update() {\n' +
                        '         if (triesLeft === 0 || document.getElementById(id)) {\n' +
                        '            location.hash = "#" + id;\n' +
                        '         } else if (!ThreadUpdater.dead) {\n' +
                        '            if (!ThreadUpdater.updating) {\n' +
                        '               ThreadUpdater.forceUpdate();\n' +
                        '               triesLeft--;\n' +
                        '            }\n' +
                        '            setTimeout(update, 500);\n' +
                        '         }\n' +
                        '      }, 1000);\n' +
                        '   }("p' + postId + '"));\n' +
                        '} else {\n' +
                        '   location.hash = "#p' + postId + '";\n' +
                        '   setTimeout(function() {\n' +
                        '      location.reload(true);\n' +
                        '   }, 1000);\n' +
                        '}'
                     );
                     clearFields();
                  }
               } else {
                  setTimeout(function() {
                     location.assign(url);
                  }, 1000);
               }
            } else if (m = /<span id="errmsg" style="color: red;">(.*?)<\/span>/.exec(rt)) {
               document.getElementById('fileError').innerHTML = m[0];
            } else {  // e.g. (rt === 'MySQL connection error')
               document.getElementById('fileError').textContent = rt;
            }
      }, false);
      xhr.upload.addEventListener('progress', function(e) {
         if (e.lengthComputable) {
            progress.set(e.loaded / e.total);
         } else {
            progress.hide();
         }
      }, false);
      xhr.addEventListener('error', function(e) {
         progress.hide();
         document.getElementById('fileError').textContent = 'Error';
      }, false);
      xhr.addEventListener('abort', function(e) {
         progress.hide();
      }, false);
      xhr.send(fd);
      progress.set(0);
      progress.show();
   }

   function clearFields() {
      com.value = '';
      upfile.value = '';
      gui.reset();
      evalOnPage('window.Recaptcha && Recaptcha.reload();');
   }

   function evalOnPage(code) {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.textContent = code;
      document.head.appendChild(script);
      document.head.removeChild(script);
   }

   function evalExternalOnPage(url, callback) {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', url);
      script.addEventListener('load', function onload() {
         script.removeEventListener('load', onload, false);
         document.head.removeChild(script);
         if (callback) {
            callback();
         }
      }, false);
      document.head.appendChild(script);
   }

   function downloadImage(url, progress, error, callback) {
      document.getElementById('fileError').innerHTML = '';
      xmlhttpRequest({
         method: 'GET',
         url: url,
         overrideMimeType: 'text/plain; charset=x-user-defined',
         onprogress: function(e) {
            if (e.lengthComputable) {
               progress.set(e.loaded / e.total);
            } else {
               progress.hide();
            }
         },
         onerror: function(e) {
            progress.hide();
            document.getElementById('fileError').innerHTML = '<span style="color: red;" id="errmsg">Error: Cannot load <a href="' + url + '">' + shortenURL(url, 30) + '</a>.</span>';
         },
         onload: function(response) {
            progress.hide();
            var data = (function clean(data) {
               var out = '';
               for (var i = 0; i < data.length; i++) {
                  out += String.fromCharCode(data.charCodeAt(i) & 0xff);
               }
               return out;
            }(response.responseText));
            var contentType = null;
            var headers = response.responseHeaders.split(/\r?\n/g);
            for (var i = 0; i < headers.length; i++) {
               var m = /^Content-Type:\s*([^\/;, ]+\/[^\/;, ]+)(?:;\s*charset=([^,; ]*))?$/i.exec(headers[i]);
               if (m) {
                  if (m[2]) {
                     contentType = m[1] + ';charset=' + m[2];
                  } else {
                     contentType = m[1];
                  }
                  break;
               }
            }
            if (!contentType) {
               contentType = guessContentType(data);
            }
            if (!contentType) {
               contentType = 'image/*';
            }
            callback({data: data, contentType: contentType});
         }
      });
      progress.set(0);
      progress.show();

      function guessContentType(data) {
         var magic = [
            ['bmp', [0x42, 0x4d]],
            ['gif', [0x47, 0x49, 0x46, 0x38]],
            ['jpeg', [0xff, 0xd8]],
            ['png', [0x89, 0x50, 0x4e, 0x47]]
         ];
         for (var i = 0; i < magic.length; i++) {
            if (magic[i][1].every(function(e, i) {return e === data.charCodeAt(i);})) {
               return 'image/' + magic[i][0];
            }
         }
         return null;
      }

      function shortenURL(url, maxLen) {
         var m = /^(?:[a-z]+:\/\/)?([^/]+)(\/.*?\/)([^/?#]+)(?:[#?].*)?$/.exec(url);
         if (m) {
            var domain = m[1], path = m[2], file = m[3];
            if (domain.length + path.length + file.length <= maxLen) {
               url = domain + path + file;
            } else if (6 <= path.length && domain.length + 5 + file.length <= maxLen) {
               var partLen = (maxLen - domain.length - file.length - 3) / 2;
               url = domain + path.substring(0, Math.ceil(partLen)) + '...' +  path.substr(-Math.floor(partLen)) + file;
            } else if (file.length <= maxLen) {
               url = file;
            } else {
               var partLen = (maxLen - 3) / 2;
               url = file.substring(0, Math.ceil(partLen)) + '...' +  file.substr(-Math.floor(partLen));
            }
         }
         return url;
      }
   }
   function enhance(obj) {
      for (var i = 1; i < arguments.length; i++) {
         var argument = arguments[i];
         for (var j in argument) {
            if (Object.prototype.hasOwnProperty.call(argument, j)) {
               if (argument[j] !== null && typeof argument[j] === 'object') {
                  obj[j] = {};
                  enhance(obj[j], argument[j]);
               } else {
                  obj[j] = argument[j];
               }
            }
         }
      }
   }

   var GIF = (function() {
      "use strict";

      var GIF = requireGIF();
      requireReader(GIF);
      requireWriter(GIF);
      requirePainter(GIF);
      requireCreator(GIF);
      return GIF;

      function requireGIF() {
         "use strict";

         var GIF = function GIF(data) {
            this.width = 0;
            this.height = 0;
            this.resolution = 3;
            this.background = 0;
            this.aspect = 0;
            this.frames = [];
            this.comments = [];
            this.loop = 0;
            this.complete = true;
            if (data) {
               this.read(new GIF.Reader(data));
            }
         }

         GIF.Frame = function Frame() {
            this.disposal = 0;
            this.delay = 0;
            this.left = this.top = this.width = this.height = 0;
            this.data = [];
            this.interlaced = false;
         };

         GIF.Frame.prototype.deinterlace = function() {
            if (this.interlaced) {
               var data = this.data, width = this.width, height = this.height;
               var lines = [], i, p = 0;
               for (i = 0; i < height; i += 8) {
                  lines[i] = data.slice(p, p += width);
               }
               for (i = 4; i < height; i += 8) {
                  lines[i] = data.slice(p, p += width);
               }
               for (i = 2; i < height; i += 4) {
                  lines[i] = data.slice(p, p += width);
               }
               for (i = 1; i < height; i += 2) {
                  lines[i] = data.slice(p, p += width);
               }
               this.data = Array.prototype.concat.apply([], lines);
               this.interlaced = false;
            }
         };

         return GIF;
      }

      function requireReader(GIF) {
         "use strict";

         GIF.prototype.read = function(reader) {
            reader = this.reader = reader || this.reader;
            this.readHeader();
            while (this.readNextFrame());
            return this;
         };

         GIF.prototype.readHeader = function(reader) {
            reader = this.reader = reader || this.reader;
            var v87a = '87a', v89a = '89a';
            var i, len, pack;
            /* HEADER */
            var signature = reader.string(3);
            if ('GIF' !== signature) {
               throw 'Not a GIF. (' + signature + ')';
            }
            var version = reader.string(3);
            if (v87a !== version && v89a !== version) {
               throw 'Unknown GIF version: ' + version;
            }
            /* LOGICAL SCREEN DESCRIPTOR */
            this.width = reader.u16();
            this.height = reader.u16();
            pack = reader.packed(3, 1, 3, 1);
            this.resolution = pack[2];
            this.background = reader.u8();
            this.aspect = reader.u8();
            if (pack[3]) {
               /* GLOBAL COLOR TABLE */
               this.sorted = !!pack[1];
               this.colors = [];
               for (i = 0, len = 2 << pack[0]; i < len; i++) {
                  this.colors[i] = reader.u24();
               }
            } else {
               delete this.sorted;
               delete this.colors;
            }
            this.frames = [];
            this.comments = [];
            this.loop = 0;
            this.complete = false;
            return this;
         };

         GIF.prototype.readNextFrame = function(reader) {
            if (this.complete) {
               return false;
            }
            reader = this.reader = reader || this.reader;
            var id, image, pack, i, len, size, gce, app;
            while (true) {
               id = reader.u8();
               if (0x2C === id) {
                  /* IMAGE DESCRIPTOR */
                  image = new GIF.Frame();
                  image.left = reader.u16();
                  image.top = reader.u16();
                  image.width = reader.u16();
                  image.height = reader.u16();
                  pack = reader.packed(3, 2, 1, 1, 1);
                  image.interlaced = !!pack[3];
                  if (pack[4]) {
                     /* LOCAL COLOR TABLE */
                     image.sorted = !!pack[2];
                     image.colors = [];
                     for (i = 0, len = 2 << pack[0]; i < len; i++) {
                        image.colors[i] = reader.u24();
                     }
                  }
                  /* TABLE BASED IMAGE DATA */
                  image.data = decompress(reader);
                  image.deinterlace();
                  if (gce) {
                     image.disposal = gce.disposal;
                     image.delay = gce.delay;
                     if (0 <= gce.transparent) {
                        image.transparent = gce.transparent;
                     }
                     gce = null;
                  }
                  this.frames.push(image);
                  if (this.fire) {
                     this.fire('progress');
                  }
                  break;
               } else if (0x3B === id) {
                  /* TRAILER */
                  this.complete = true;
                  delete this.reader;
                  if (this.fire) {
                     this.fire('ready');
                  }
                  break;
               } else if (0x21 === id) {
                  /* EXTENSION */
                  id = reader.u8();
                  if (0xF9 === id) {
                     /* GRAPHIC CONTROL EXTENSION */
                     gce = {};
                     size = reader.u8();
                     if (4 !== size) {
                        throw 'Graphic control extension with unknown block size: ' + size;
                     }
                     pack = reader.packed(1, 1, 3, 3);
                     gce.disposal = pack[2];
                     gce.delay = 10 * reader.u16();
                     gce.transparent = reader.u8();
                     if (!(1 === pack[0])) {
                        delete gce.transparent;
                     }
                     if (0 !== reader.u8()) {
                        throw 'Graphic control extension terminator missing.';
                     }
                  } else if (0xFE === id) {
                     /* COMMENT EXTENSION */
                     this.comments.push(String.fromCharCode.apply(String, reader.blocks().fully()));
                  } else if (0xFF === id) {
                     /* APPLICATION EXTENSION */
                     app = {};
                     size = reader.u8();
                     if (11 !== size) {
                        throw 'Application extension with unknown block size: ' + size;
                     }
                     app.identifier = reader.string(8); // reader(8)
                     app.authCode = reader.string(3); // reader(3)
                     app.data = reader.blocks().fully();
                     if ('NETSCAPE' === app.identifier && '2.0' === app.authCode && 1 === app.data[0] ||
                         'ANIMEXTS' === app.identifier && '1.0' === app.authCode && 1 === app.data[0]) {
                        this.loop = app.data[1] | app.data[2] << 8;
                        if (0 === this.loop) {
                           this.loop = Infinity;
                        }
                     }
                  } else {
                     reader.blocks().endBlocks();
                  }
               } else {
                  throw 'Unknown block type: 0x' + ('0' + id.toString(16).toUpperCase()).slice(-2);
               }
            }
            return !this.complete;

            function decompress(reader) {
               var symbolSize = reader.u8();
               if (symbolSize < 2 || 8 < symbolSize) {
                  throw 'Invalid code size ' + symbolSize;
               }
               reader.blocks();
               var maxSize = 12, clear = 1 << symbolSize, end = clear + 1,
                  symbolMask = clear - 1, size, limit, previous, current, hashes, codes, next,
                  symbolStack = [], lenStack = 0, dataOut = [], lenOut = 0, symbol;
               clearLoop: do {
                  hashes = [];
                  codes = [];
                  size = symbolSize + 1;
                  next = clear + 2;
                  limit = clear << 1;
                  do {
                     current = reader.bits(size);
                  } while (current === clear);
                  if (current < clear) {
                     previous = symbol = current;
                     dataOut[lenOut++] = symbol;
                     current = reader.bits(size);
                  }
                  while (current !== end) {
                     if (end < current || current < clear) {
                        var code, hash;
                        if (current < next) {
                           code = current;
                        } else if (current === next) {
                           code = previous;
                        } else {
                           throw 'Encountered unexpected code ' + current;
                        }
                        while (code > end) {
                           hash = hashes[code];
                           symbolStack[lenStack++] = hash & symbolMask;
                           code = hash >>> symbolSize;
                        }
                        dataOut[lenOut++] = symbol = code;
                        while (0 < lenStack) {
                           dataOut[lenOut++] = symbolStack[--lenStack];
                        }
                        if (current === next) {
                           dataOut[lenOut++] = code;
                        }
                        hash = (previous << symbolSize) | symbol;
                        hashes[next++] = hash;
                        previous = current;
                        if (next === limit && size < maxSize) {
                           size++;
                           limit = limit << 1;
                        }
                        current = reader.bits(size);
                     } else if (current === clear) {
                        continue clearLoop;
                     } else if (current !== end) {
                        throw 'Internal error (code: ' + current + ')';
                     }
                  }
               } while (current !== end);
               reader.endBlocks();
               return dataOut;
            }
         }

         GIF.Reader = function Reader(data) {
            var index = 0, len = data.length, inBlock = false, blockSize = 0,
               lenBitBuffer = 0, dataBitBuffer = 0, reader = {},
               fetch = function() {
                  var result;
                  if (len <= index) {
                     throw 'Input truncated';
                  }
                  result = data[index++];
                  if (inBlock) {
                     if (blockSize < 1) {
                        blockSize = result;
                        if (blockSize < 1) {
                           throw 'Block truncated';
                        }
                        if (len <= index) {
                           throw 'Input truncated';
                        }
                        result = data[index++];
                     }
                     blockSize--;
                  }
                  return result;
               }, u8 = reader.u8 = function() {
                  if (lenBitBuffer === 0) {
                     return fetch();
                  } else {
                     return bits(8);
                  }
               }, u16 = reader.u16 = function() {
                  if (lenBitBuffer === 0) {
                     return fetch() | fetch() << 8;
                  } else {
                     return bits(16);
                  }
               }, u24 = reader.u24 = function() {
                  if (lenBitBuffer === 0) {
                     return fetch() | fetch() << 8 | fetch() << 16;
                  } else {
                     return bits(24);
                  }
               }, bits = reader.bits = function(len) {
                  var bits;
                  while (lenBitBuffer < len) {
                     dataBitBuffer |= (fetch() & 0xFF) << lenBitBuffer;
                     lenBitBuffer += 8;
                  }
                  bits = dataBitBuffer & ~(-1 << len);
                  dataBitBuffer >>>= len;
                  lenBitBuffer -= len;
                  return bits;
               }, bytes = reader.bytes = function(len) {
                  var result = [];
                  if (lenBitBuffer === 0) {
                     while (len--) {
                        result.push(fetch());
                     }
                  } else {
                     while (len--) {
                        result.push(bits(8));
                     }         
                  }
                  return result;
               }, string = reader.string = function(len) {
                  return String.fromCharCode.apply(String, bytes(len));
               }, packed = reader.packed = function() {
                  var i, result = [];
                  for (i = 0; i < arguments.length; i++) {
                     result.push(bits(arguments[i]));
                  }
                  return result;
               }, blocks = reader.blocks = function() {
                  if (!inBlock) {
                     inBlock = true;
                     blockSize = 0;
                     lenBitBuffer = 0;
                     dataBitBuffer = 0;
                  }
                  return reader;
               }, fully = reader.fully = function() {
                  var result;
                  if (inBlock) {
                     inBlock = false;
                     result = [];
                     if (lenBitBuffer === 0) {
                        do {
                           while (0 < blockSize--) {
                              result.push(fetch());
                           }
                           blockSize = fetch();
                        } while (0 < blockSize);
                     } else {
                        do {
                           while (0 < blockSize--) {
                              result.push(bits(8));
                           }
                           blockSize = fetch();
                        } while (0 < blockSize);
                        result.push(dataBitBuffer);
                        lenBitBuffer = 0;
                        dataBitBuffer = 0;
                     }
                  } else {
                     result = bytes(len - index);
                     if (0 < lenBitBuffer) {
                        result.push(dataBitBuffer);
                        lenBitBuffer = 0;
                        dataBitBuffer = 0;
                     }
                  }
                  return result;
               }, endBlocks = reader.endBlocks = function() {
                  if (inBlock) {
                     inBlock = false;
                     if (0 < lenBitBuffer) {
                        lenBitBuffer = 0;
                        dataBitBuffer = 0;
                     }
                     do {
                        index += blockSize;
                        blockSize = fetch();
                     } while (0 < blockSize);
                  }
                  return reader;
               };
            return reader;
         };
      }

      function requireWriter(GIF) {
         "use strict";

         GIF.prototype.toDataURL = function() {
            return 'data:image/gif;base64,' + btoa(fromCharCodes(this.write(new GIF.Writer()).result));

            function fromCharCodes(array) {
               var len = array.length, string, i, chunkSize;
               var fromCharCode = String.fromCharCode;
               for (chunkSize = 0x10000; 0x100 <= chunkSize; chunkSize = chunkSize >> 1) {
                  try {
                     string = fromCharCode.apply(String, array.slice(0, chunkSize));
                  } catch (e) {
                     continue;
                  }
                  i = chunkSize;
                  while (i < len) {
                     string += fromCharCode.apply(String, array.slice(i, i += chunkSize));
                  }
                  return string;
               }
               string = '';
               for (i = 0; i < len; i++) {
                  string += String.fromCharCode(array[i]);
               }
               return string;
            }
         }

         GIF.prototype.write = function(writer) {
            var version, i, len, globalDepth,
               frames = this.frames || [],
               comments = this.comments || [];

            if (0 < comments.length ||
               0 < this.loop || 
               frames.some(function(frame) {
                  return frame.disposal || frame.delay || 0 <= frame.transparent;
               })) {
               version = '89a';
            } else {
               version = '87a';
            }

            /* HEADER */
            writer.write('GIF', version);

            /* LOGICAL SCREEN DESCRIPTOR */
            writer.write(
               16, this.width,
               16, this.height,
                3, this.colors ? bitLength(this.colors.length) - 1: 0,
                1, !!(this.colors && this.sorted),
                3, this.resolution,
                1, !!this.colors,
                8, this.background,
                8, this.aspect
            );
            if (this.colors) {
               /* GLOBAL COLOR TABLE */
               globalDepth = bitLength(this.colors.length)
               for (i = 0, len = 1 << globalDepth; i < len; i++) {
                  writer.u24(this.colors[i]);
               }
            }
            if (0 < this.loop) {
               writer.write(
                  8, 0x21,
                  8, 0xFF
               ).startBlocks().write(
                  'NETSCAPE',
                  '2.0'
               ).endBlocks(false).startBlocks().write(
                   8, 1,
                  16, this.loop
               ).endBlocks();
            }
            frames.forEach(function(frame) {
               var i, len, depth;
               if (frame.disposal || frame.delay || 0 <= frame.transparent) {
                  writer.write(
                      8, 0x21,
                      8, 0xF9
                  ).startBlocks().write(
                      1, 0 <= frame.transparent,
                      1, 0,
                      3, frame.disposal,
                      3, 0,
                     16, frame.delay / 10,
                      8, 0 <= frame.transparent ? frame.transparent : 0
                  ).endBlocks();
               }
               writer.write(
                   8, 0x2C,
                  16, frame.left,
                  16, frame.top,
                  16, frame.width,
                  16, frame.height,
                   3, frame.colors ? bitLength(frame.colors.length) - 1 : 0,
                   2, 0,
                   1, !!(frame.colors && frame.sorted),
                   1, frame.interlaced,
                   1, !!frame.colors
               );
               if (frame.colors) {
                  depth = bitLength(frame.colors.length);
                  /* LOCAL COLOR TABLE */
                  for (i = 0, len = 1 << depth; i < len; i++) {
                     writer.u24(frame.colors[i]);
                  }
               }
               /* TABLE BASED IMAGE DATA */
               compress(writer, frame.data, undefined && (depth || globalDepth));
            });
            comments.forEach(function(comment) {
               writer.write(
                   8, 0x21,
                   8, 0xFE
               ).startBlocks().write(
                  comment
               ).endBlocks();
            });
            writer.write(8, 0x3B);
            return writer;

            function bitLength(n) {
               var l;
               if (0x10 < n) {
                  if (0x40 < n) {
                     if (0x80 < n) {
                        l = 8;
                     } else {
                        l = 7;
                     }
                  } else {
                     if (0x20 <= n) {
                        l = 6;
                     } else {
                        l = 5;
                     }
                  }
               } else {
                  if (0x04 <= n) {
                     if (0x08 <= n) {
                        l = 4;
                     } else {
                        l = 3;
                     }
                  } else {
                     if (0x02 <= n) {
                        l = 2;
                     } else {
                        l = 1;
                     }
                  }
               }
               return l;
            }

            function compress(writer, data, depth) {
               var i = 0, len = data.length,
                  symbolSize = 2, clear = 4,
                  size, end,
                  code, codes = [], clearAt = 0x1000,
                  next, limit;
               if (depth) {
                  symbolSize = Math.max(2, depth);
                  clear = 1 << symbolSize;
               } else {
                  findSymbolSize: while (i < len) {
                     while (clear <= data[i++]) {
                        symbolSize++;
                        clear <<= 1;
                        if (symbolSize === 8) {
                           break findSymbolSize;
                        }
                     }
                  }
               }
               size = symbolSize + 1;
               end = clear + 1;
               next = clear + 2;
               limit = clear + clear;
               writer.u8(symbolSize).startBlocks().bits(size, clear);
               code = data[0];
               for (i = 1; i < len; i++) {
                  var symbol = data[i];
                  var hash = code << symbolSize | symbol;
                  if (hash in codes) {
                     code = codes[hash];
                  } else {
                     writer.bits(size, code);
                     if (next === limit) {
                        if (next === clearAt) {
                           codes = [];
                           writer.bits(12, clear);
                           size = symbolSize + 1;
                           next = clear + 2;
                           limit = clear + clear;
                        } else {
                           size++;
                           limit <<= 1;
                           codes[hash] = next++;
                        }
                     } else {
                        codes[hash] = next++;
                     }
                     code = symbol;
                  }
               }
               if (0 < len) {
                  writer.bits(size, code);
                  if (next === clearAt) {
                     writer.bits(12, clear);
                     size = symbolSize + 1;
                     next = clear + 2;
                     limit = clear + clear;
                  } else {
                     if (next === limit) {
                        size++;
                        limit = next + next;
                     }
                     codes[hash] = next++;
                  }
               }
               writer.bits(size, end).endBlocks();
            }
         }

         GIF.Writer = function Writer(maxBlockSize) {
            if (!(0 < maxBlockSize && maxBlockSize < 256)) {
               maxBlockSize = 255;
            }
            var blocks = false, blockStart, buffer = 0, bufferSize = 0,
               writer = {}, result = writer.result = [], index = 0,
               store = function(value) {
                  if (blocks && index - blockStart > maxBlockSize) {
                     result[blockStart] = index - blockStart - 1;
                     blockStart = index++;
                  }
                  result[index++] = value & 0xFF;
               }, write = writer.write = function() {
                  var i = 0, len = arguments.length;
                  while (i < len) {
                     if (typeof arguments[i] === 'string') {
                        byteString(arguments[i++]);
                     } else {
                        bits(arguments[i++], arguments[i++]);
                     }
                  }
                  return writer;
               }, u8 = writer.u8 = function(value) {
                  if (bufferSize === 0) {
                     store(value);
                  } else {
                     bits(8, value);
                  }
                  return writer;
               }, u16 = writer.u16 = function(value) {
                  if (bufferSize === 0) {
                     store(value);
                     store(value >> 8);
                  } else {
                     bits(16, value);
                  }
                  return writer;
               }, u24 = writer.u24 = function(value) {
                  if (bufferSize === 0) {
                     store(value);
                     store(value >> 8);
                     store(value >> 16);
                  } else {
                     bits(24, value);
                  }
                  return writer;
               }, u32 = writer.u32 = function(value) {
                  if (bufferSize === 0) {
                     store(value);
                     store(value >> 8);
                     store(value >> 16);
                     store(value >> 24);
                  } else {
                     bits(32, value);
                  }
                  return writer;
               }, bits = writer.bits = function(size, value) {
                  var sizeSum = bufferSize + size;
                  if (sizeSum <= 32) {
                     buffer = (value << bufferSize | buffer) & ~(-1 << sizeSum);
                     bufferSize = sizeSum;
                  } else {
                     store(value << bufferSize | buffer);
                     buffer = value >>> bufferSize;
                     bufferSize = sizeSum - 8;
                  }
                  while (8 <= bufferSize) {
                     store(buffer);
                     buffer >>>= 8;
                     bufferSize -= 8;
                  }
                  return writer;
               }, align = writer.align = function() {
                  if (bufferSize > 0) {
                     store(buffer);
                     buffer = 0;
                     bufferSize = 0;
                  }
                  return writer;
               }, bytes = writer.bytes = function(value) {
                  for (var i = 0, len = value.length; i < len; i++) {
                     u8(value[i]);
                  }
                  return writer;
               }, byteString = writer.byteString = function(value) {
                  for (var i = 0, len = value.length; i < len; i++) {
                     writer.u8(value.charCodeAt(i));
                  }
                  return writer;
               }, startBlocks = writer.startBlocks = function() {
                  align();
                  blocks = true;
                  blockStart = index++;
                  return writer;
               }, endBlocks = writer.endBlocks = function(terminate) {
                  align();
                  blocks = false;
                  var len = result[blockStart] = index - blockStart - 1;
                  if (terminate !== false && len > 0) {
                     u8(0);
                  }
                  return writer;
               };
            return writer;
         };
      }

      function requirePainter(GIF) {
         "use strict";

         GIF.Painter = function(gif, ctx) {
            this.gif = gif;
            this.ctx = ctx;
            this.disposal = null;
         };

         GIF.Painter.prototype.paint = function(i) {
            var gif = this.gif,
               frame = gif.frames[i],
               colors = frame.colors || gif.colors || this.colors,
               ctx = this.ctx,
               disp = this.disposal,
               left = frame.left,
               top = frame.top,
               width = frame.width,
               height = frame.height,
               data;
            if (disp) {
               if (disp.data) {
                  ctx.putImageData(disp.data, disp.left, disp.top);
               } else {
                  ctx.clearRect(disp.left, disp.top, disp.width, disp.height);
               }
            }
            if (frame.disposal === 3) {
               this.disp = {
                  left: left,
                  top: top,
                  data: ctx.getImageData(left, top, width, height)
               };
            } else if (frame.disposal === 2) {
               this.disp = {
                  left: left,
                  top: top,
                  width: width,
                  height: height
               };
            }
            data = ctx.getImageData(left, top, width, height);
            draw(data.data);
            ctx.putImageData(data, left, top);

            function draw(rgba) {
               var transparent = frame.transparent;
               var indices = frame.data;
               var len = indices.length;
               var i = 0, p = 0, c;
               if (colors !== null) {
                  while (i < len) {
                     c = indices[i++];
                     if (c !== transparent) {
                        c = colors[c];
                        rgba[p++] = c & 0xFF;
                        rgba[p++] = (c >> 8) & 0xFF;
                        rgba[p++] = (c >> 16) & 0xFF;
                        rgba[p++] = 0xFF;
                     } else {
                        rgba[p+3] = 0x00;
                        p += 4;
                     }
                  }
               } else {
                  // default color table
                  while (i < len) {
                     c = indices[i++];
                     if (c !== transparent) {
                        rgba[p++] = c;
                        rgba[p++] = c;
                        rgba[p++] = c;
                        rgba[p++] = 0xFF;
                     } else {
                        p += 4;
                     }
                  }
               }
            }
         };
      }

      function requireCreator(GIF) {
         "use strict";

         GIF.Frame.fromCanvas = function(canvas, bits) {
            var result = GIF.reduceColors(canvas, bits || 8, false);
            var frame = new GIF.Frame();
            frame.width = canvas.width;
            frame.height = canvas.height;
            frame.data = result.indices;
            frame.colors = result.palette;
            if ('transparent' in result) {
               frame.transparent = result.transparent;
            }
            return frame;
         };

         GIF.Frame.fromImage = function(image, bits) {
            var canvas = document.createElement('canvas');
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            canvas.getContext('2d').drawImage(image, 0, 0);
            return GIF.Frame.fromCanvas(canvas, bits);
         };

         GIF.fromCanvas = function(canvas, bits) {
            var gif = new GIF(),
               frame = gif.frames[0] = GIF.Frame.fromCanvas(canvas, bits);
            gif.width = frame.width;
            gif.height = frame.height;
            gif.colors = frame.colors;
            delete frame.colors;
            return gif;
         };

         GIF.fromImage = function(image, bits) {
            var canvas = document.createElement('canvas');
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            canvas.getContext('2d').drawImage(image, 0, 0);
            return GIF.fromCanvas(canvas, bits);
         };

         GIF.reduceColors = function(canvas, bits, apply) {
            var width = canvas.width,
               height = canvas.height,
               ctx = canvas.getContext('2d'),
               imageData = ctx.getImageData(0, 0, width, height),
               pixels = imageData.data,
               len = pixels.length,
               colors = [],
               map = {},
               hasTransparency = false,
               hasAlpha = false,
               maxColors = 1 << bits,
               palette = [],
               indices = [],
               result = {palette: palette, indices: indices},
               i, tree, transparent;
            if (width === 0 || height === 0) {
               return result;
            }
            findColors(pixels, colors, map);
            for (i = 3; i < len; i += 4) {
               if (pixels[i] !== 255) {
                  hasTransparency = true;
                  break;
               }
            }
            for (; i < len; i += 4) {
               if (pixels[i] !== 255 && pixels[i] !== 0) {
                  hasAlpha = true;
                  break;
               }
            }
            if (
               !hasTransparency && colors.length <= maxColors ||
               !hasAlpha && colors.length + 1 <= maxColors
            ) {
               colors.forEach(function(c, i) {
                  palette[i] = c[0] | c[1] << 8 | c[2] << 16;
               });
               if (hasTransparency) {
                  result.transparent = transparent = palette.length;
                  palette[transparent] = 0;
                  for (i = 0; i < len; i += 4) {
                     if (pixels[i + 3] === 0) {
                        indices.push(transparent);
                     } else {
                        indices.push(map[pixels[i] | pixels[i + 1] << 8 | pixels[i + 2] << 16]);
                     }
                  }
               } else {
                  for (i = 0; i < len; i += 4) {
                     indices.push(map[pixels[i] | pixels[i + 1] << 8 | pixels[i + 2] << 16]);
                  }
               }
            } else {
               if (hasTransparency) {
                  tree = medianCut(colors, maxColors - 1, palette);
                  result.transparent = transparent = palette.length;
                  palette[transparent] = 0;
               } else {
                  tree = medianCut(colors, maxColors, palette);
               }
               dither(indices, pixels, apply, tree, width, transparent);
               if (apply) {
                  ctx.putImageData(imageData, 0, 0);
               }
            }
            return result;

            function dither(indices, pixels, apply, tree, width, transparent) {
               var i, len, node, index = 0;
               var err1 = [], err2 = [], tmp, p = 0;
               var r, g, b, a, rgb = [];
               var errR, errG, errB, errA;
               width = width * 4;
               for (p = 0, len = width; p < len; p++) {
                  err1[p] = 0;
                  err2[p] = 0;
               }
               p = 0;
               for (i = 0, len = pixels.length; i < len; i += 4) {
                  r = pixels[i];
                  g = pixels[i + 1];
                  b = pixels[i + 2];
                  a = pixels[i + 3];
                  errR = err1[p];
                  errG = err1[p + 1];
                  errB = err1[p + 2];
                  errA = err1[p + 3];
                  err1[p] = err1[p + 1] = err1[p + 2] = err1[p + 3] = 0;
                  if (a + errA < 0x80) {
                     indices[index++] = transparent;
                     if (apply) {
                        pixels[i + 3] = 0x00;
                     }
                     errA = (a + errA) * 0.0625;
                     err2[p - 1] += errA * 3;
                     err2[p + 3] += errA * 5;
                     if (p + 4 < width) {
                        err1[p + 8] += errA * 7;
                        err2[p + 7] += errA;
                        p += 4;
                     } else {
                        tmp = err1;
                        err1 = err2;
                        err2 = tmp;
                        p = 0;
                     }
                  } else {
                     rgb[0] = r + errR;
                     rgb[1] = g + errG;
                     rgb[2] = b + errB;
                     node = tree;
                     do {
                        node = rgb[node.dimension] < node.median ? node.lower : node.higher;
                     } while (node.higher);
                     errR = r - node.r;
                     errG = g - node.g;
                     errB = b - node.b;
                     errA = a - 0xFF;
                     indices[index++] = node.index;
                     if (apply) {
                        pixels[i] = node.r;
                        pixels[i + 1] = node.g;
                        pixels[i + 2] = node.b;
                        pixels[i + 3] = 0xFF;
                     }
                     errR *= 0.0625;
                     errG *= 0.0625;
                     errB *= 0.0625;
                     errA *= 0.0625;
                     err2[p - 4] += errR * 3;
                     err2[p - 3] += errG * 3;
                     err2[p - 2] += errB * 3;
                     err2[p - 1] += errA * 3;
                     err2[p] += errR * 5;
                     err2[p + 1] += errG * 5;
                     err2[p + 2] += errB * 5;
                     err2[p + 3] += errA * 5;
                     if (p + 4 < width) {
                        err1[p + 4] += errR * 7;
                        err1[p + 5] += errG * 7;
                        err1[p + 6] += errB * 7;
                        err1[p + 7] += errA * 7;
                        err2[p + 4] += errR;
                        err2[p + 5] += errG;
                        err2[p + 6] += errB;
                        err2[p + 7] += errA;
                        p += 4;
                     } else {
                        tmp = err1;
                        err1 = err2;
                        err2 = tmp;
                        p = 0;
                     }
                  }
               }
            }

            function findColors(pixels, array, map) {
               var i, len, r, g, b, a, hash, index = 0;
               for (i = 0, len = pixels.length; i < len; i += 4) {
                  r = pixels[i];
                  g = pixels[i + 1];
                  b = pixels[i + 2];
                  a = pixels[i + 3];
                  if (0 < a) {
                     hash = r | g << 8 | b << 16;
                     if (!(hash in map)) {
                        array[index] = [r, g, b];
                        map[hash] = index++;
                     }
                  }
               }
            }

            function medianCut(colors, maxColors, palette) {
               var index = 0;
               return (function cut(colors, maxIndex, sort) {
                  var i, len = colors.length,
                     r, g, b,
                     min, minr, ming, minb,
                     max, maxr, maxg, maxb,
                     dr, dg, db,
                     dim, medianIndex, medianValue,
                     from, to;
                  if (len < 2) {
                     r = colors[0][0];
                     g = colors[0][1];
                     b = colors[0][2];
                     palette[index] = r | g << 8 | b << 16;
                     return {index: index++, r: r, g: g, b: b};
                  } else if (maxIndex - index < 2) {
                     r = g = b = 0;
                     for (i = 0; i < len; i++) {
                        r += colors[i][0];
                        g += colors[i][1];
                        b += colors[i][2];
                     }
                     r = Math.round(r / len);
                     g = Math.round(g / len);
                     b = Math.round(b / len);
                     palette[index] = r | g << 8 | b << 16;
                     return {index: index++, r: r, g: g, b: b};
                  }
                  minr = maxr = colors[0][0];
                  ming = maxg = colors[0][1];
                  minb = maxb = colors[0][2];
                  for (i = 1; i < len; i++) {
                     r = colors[i][0];
                     g = colors[i][1];
                     b = colors[i][2];
                     if (r < minr) {
                        minr = r;
                        if (minr === 0 && maxr === 255) break;
                     } else if (r > maxr) {
                        maxr = r;
                        if (maxr === 255 && minr === 0) break;
                     }
                     if (g < ming) {
                        ming = g;
                        if (ming === 0 && maxg === 255) break;
                     } else if (g > maxg) {
                        maxg = g;
                        if (maxg === 255 && ming === 0) break;
                     }
                     if (b < minb) {
                        minb = b;
                        if (minb === 0 && maxb === 255) break;
                     } else if (b > maxb) {
                        maxb = b;
                        if (maxb === 255 && minb === 0) break;
                     }
                  }
                  dr = maxr - minr;
                  dg = maxg - ming;
                  db = maxb - minb;
                  if (dr >= dg) {
                     dim = (dr >= db) ? 0 : 2;
                  } else if (dg >= db) {
                     dim = 1;
                  } else {
                     dim = 2;
                  }
                  if (dim !== sort) {
                     min = [minr, ming, minb][dim];
                     max = [maxr, maxg, maxb][dim];
                     bucketSort(colors, dim, min, max);
                     sort = dim;
                  }
                  from = to = medianIndex = len >> 1;
                  medianValue = colors[medianIndex][dim];
                  while(--from >= 0 && colors[from][dim] === medianValue);
                  from++;
                  while(++to < len && colors[to][dim] === medianValue);
                  if (to - from > 1) {
                     if (from >= len - to) {
                        medianIndex = from;
                     } else {
                        medianIndex = to;
                     }
                  }
                  return {
                     dimension: dim,
                     median: (colors[medianIndex][dim] + colors[medianIndex - 1][dim]) * 0.5,
                     lower: cut(colors.slice(0, medianIndex), (index + maxIndex) >> 1, sort),
                     higher: cut(colors.slice(medianIndex), maxIndex, sort)
                  };
               })(colors, maxColors);
            }

            function bucketSort(array, key, min, max) {
               var i, j, k, len = array.length,
                  element, bucket,
                  buckets = [];
               max++;
               for (i = max; min < i;) {
                  buckets[--i] = [];
               }
               for (i = len; i;) {
                  element = array[--i];
                  buckets[element[key]].push(element);
               }
               for (i = max, k = len; min < i;) {
                  bucket = buckets[--i];
                  for (j = bucket.length; j;) {
                     array[--k] = bucket[--j];
                  }
               }
            }
         };
      }
   }());
}());
