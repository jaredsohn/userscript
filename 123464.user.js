// ==UserScript==
// @name           Putao.Ajax.Uploader
// @namespace      Putao.Ajax.Uploader
// @description    Putao.Ajax.Uploader, alternative way of uploading images for `pt.sjtu.edu.cn`
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match          https://pt.sjtu.edu.cn/forums.php?action=reply&*
// @match          https://pt.sjtu.edu.cn/forums.php?action=newtopic&*
// @match          https://pt.sjtu.edu.cn/forums.php?action=quotepost&*
// ==/UserScript==

function recent(sCurrent){
	var sBase='1.7';
	//$([]).on() works on 1.6 and after
	var aBase=sBase.split('.');
	var aCurrent=sCurrent.split('.');
	for(var i=0;i<aBase.length;++i){
		//console.log([parseInt(aBase[i]||0),parseInt(aCurrent[i]||0)]);
		if(parseInt(aBase[i]||0,10)>parseInt(aCurrent[i]||0,10)){
			return false;
		}
	}
	return true;
}
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main(){
	jQuery(function($){
		(function ($) {
		/*
		 * Default text - jQuery plugin for html5 dragging files from desktop to browser
		 *
		 * Author: Weixi Yen
		 *
		 * Email: [Firstname][Lastname]@gmail.com
		 * 
		 * Copyright (c) 2010 Resopollution
		 * 
		 * Licensed under the MIT license:
		 *   http://www.opensource.org/licenses/mit-license.php
		 *
		 * Project home:
		 *   http://www.github.com/weixiyen/jquery-filedrop
		 *
		 * Version:  0.1.0
		 *
		 * Features:
		 *      Allows sending of extra parameters with file.
		 *      Works with Firefox 3.6+
		 *      Future-compliant with HTML5 spec (will work with Webkit browsers and IE9)
		 * Usage:
		 * 	See README at project homepage
		 *
		 */
			jQuery.event.props.push("dataTransfer");
			var opts = {},
				default_opts = {
					url: '',
					refresh: 1000,
					paramname: 'userfile',
					maxfiles: 25,
					maxfilesize: 1,
					// MBs
					data: {},
					drop: empty,
					dragEnter: empty,
					dragOver: empty,
					dragLeave: empty,
					docEnter: empty,
					docOver: empty,
					docLeave: empty,
					beforeEach: empty,
					afterAll: empty,
					rename: empty,
					error: function (err, file, i) {
						alert(err);
					},
					uploadStarted: empty,
					uploadFinished: empty,
					progressUpdated: empty,
					speedUpdated: empty
				},
				errors = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge"],
				doc_leave_timer, stop_loop = false,
				files_count = 0,
				files;

			$.fn.filedrop = function (options) {
				opts = $.extend({}, default_opts, options);

				this.bind('drop', drop).bind('dragenter', dragEnter).bind('dragover', dragOver).bind('dragleave', dragLeave);
				$(document).bind('drop', docDrop).bind('dragenter', docEnter).bind('dragover', docOver).bind('dragleave', docLeave);
			};

			function drop(e) {
				opts.drop(e);
				files = e.dataTransfer.files;
				if (files === null || files === undefined) {
					opts.error(errors[0]);
					return false;
				}

				files_count = files.length;
				upload();
				e.preventDefault();
				return false;
			}

			function getBuilder(filename, filedata, boundary) {
				var dashdash = '--',
					crlf = '\r\n',
					builder = '';

				$.each(opts.data, function (i, val) {
					if (typeof val === 'function') val = val();
					builder += dashdash;
					builder += boundary;
					builder += crlf;
					builder += 'Content-Disposition: form-data; name="' + i + '"';
					builder += crlf;
					builder += crlf;
					builder += val;
					builder += crlf;
				});

				builder += dashdash;
				builder += boundary;
				builder += crlf;
				builder += 'Content-Disposition: form-data; name="' + opts.paramname + '"';
				builder += '; filename="' + encodeURIComponent(filename) + '"';
				builder += crlf;

				builder += 'Content-Type: application/octet-stream';
				builder += crlf;
				builder += crlf;

				builder += filedata;
				builder += crlf;

				builder += dashdash;
				builder += boundary;
				builder += dashdash;
				builder += crlf;
				return builder;
			}

			function progress(e) {
				if (e.lengthComputable) {
					var percentage = Math.round((e.loaded * 100) / e.total);
					if (this.currentProgress != percentage) {

						this.currentProgress = percentage;
						opts.progressUpdated(this.index, this.file, this.currentProgress);

						var elapsed = new Date().getTime();
						var diffTime = elapsed - this.currentStart;
						if (diffTime >= opts.refresh) {
							var diffData = e.loaded - this.startData;
							var speed = diffData / diffTime; // KB per second
							opts.speedUpdated(this.index, this.file, speed);
							this.startData = e.loaded;
							this.currentStart = elapsed;
						}
					}
				}
			}



			function upload() {
				stop_loop = false;
				if (!files) {
					opts.error(errors[0]);
					return false;
				}
				var filesDone = 0,
					filesRejected = 0;

				if (files_count > opts.maxfiles) {
					opts.error(errors[1]);
					return false;
				}

				for (var i = 0; i < files_count; i++) {
					if (stop_loop) return false;
					try {
						if (beforeEach(files[i]) != false) {
							if (i === files_count) return;
							var reader = new FileReader(),
								max_file_size = 1048576 * opts.maxfilesize;

							reader.index = i;
							if (files[i].size > max_file_size) {
								opts.error(errors[2], files[i], i);
								filesRejected++;
								continue;
							}

							reader.onloadend = send;
							reader.readAsBinaryString(files[i]);
						} else {
							filesRejected++;
						}
					} catch (err) {
						opts.error(errors[0]);
						return false;
					}
				}

				function send(e) {
					// Sometimes the index is not attached to the
					// event object. Find it by size. Hack for sure.
					if (e.target.index == undefined) {
						e.target.index = getIndexBySize(e.total);
					}

					var xhr = new XMLHttpRequest(),
						upload = xhr.upload,
						file = files[e.target.index],
						index = e.target.index,
						start_time = new Date().getTime(),
						boundary = '------multipartformboundary' + (new Date).getTime(),
						builder;

					newName = rename(file.name);
					if (typeof newName === "string") {
						builder = getBuilder(newName, e.target.result, boundary);
					} else {
						builder = getBuilder(file.name, e.target.result, boundary);
					}

					upload.index = index;
					upload.file = file;
					upload.downloadStartTime = start_time;
					upload.currentStart = start_time;
					upload.currentProgress = 0;
					upload.startData = 0;
					upload.addEventListener("progress", progress, false);

					xhr.open("POST", opts.url, true);
					xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' + boundary);

					xhr.sendAsBinary(builder);

					opts.uploadStarted(index, file, files_count);

					xhr.onload = function () {
						if (xhr.responseText) {
							var now = new Date().getTime(),
								timeDiff = now - start_time,
								result = opts.uploadFinished(index, file, xhr.responseText, timeDiff);
							filesDone++;
							if (filesDone == files_count - filesRejected) {
								afterAll();
							}
							if (result === false) stop_loop = true;
						}
					};
				}
			}

			function getIndexBySize(size) {
				for (var i = 0; i < files_count; i++) {
					if (files[i].size == size) {
						return i;
					}
				}

				return undefined;
			}

			function rename(name) {
				return opts.rename(name);
			}

			function beforeEach(file) {
				return opts.beforeEach(file);
			}

			function afterAll() {
				return opts.afterAll();
			}

			function dragEnter(e) {
				clearTimeout(doc_leave_timer);
				e.preventDefault();
				opts.dragEnter(e);
			}

			function dragOver(e) {
				clearTimeout(doc_leave_timer);
				e.preventDefault();
				opts.docOver(e);
				opts.dragOver(e);
			}

			function dragLeave(e) {
				clearTimeout(doc_leave_timer);
				opts.dragLeave(e);
				e.stopPropagation();
			}

			function docDrop(e) {
				e.preventDefault();
				opts.docLeave(e);
				return false;
			}

			function docEnter(e) {
				clearTimeout(doc_leave_timer);
				e.preventDefault();
				opts.docEnter(e);
				return false;
			}

			function docOver(e) {
				clearTimeout(doc_leave_timer);
				e.preventDefault();
				opts.docOver(e);
				return false;
			}

			function docLeave(e) {
				doc_leave_timer = setTimeout(function () {
					opts.docLeave(e);
				}, 200);
			}

			function empty() {}

			try {
				if (XMLHttpRequest.prototype.sendAsBinary) return;
				XMLHttpRequest.prototype.sendAsBinary = function (datastr) {
					function byteValue(x) {
						return x.charCodeAt(0) & 0xff;
					}
					var ords = Array.prototype.map.call(datastr, byteValue);
					var ui8a = new Uint8Array(ords);
					this.send(ui8a.buffer);
				}
			} catch (e) {}

		})(jQuery);
		jQuery.fn.extend({
			insertAtCaret: function (myValue) {
				return this.each(function (i) {
					if (document.selection) {
						//For browsers like Internet Explorer
						this.focus();
						sel = document.selection.createRange();
						sel.text = myValue;
						this.focus();
					} else if (this.selectionStart || this.selectionStart == '0') {
						//For browsers like Firefox and Webkit based
						var startPos = this.selectionStart;
						var endPos = this.selectionEnd;
						var scrollTop = this.scrollTop;
						this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
						this.focus();
						this.selectionStart = startPos + myValue.length;
						this.selectionEnd = startPos + myValue.length;
						this.scrollTop = scrollTop;
					} else {
						this.value += myValue;
						this.focus();
					}
				})
			}
		});
		/* function getUrlVars(){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		} */
		//$('.post').html('<input type="submit" value="发表文章"><input type="reset" value="内容复原">');
		$('<style type="text/css">.clearfix:after{content:".";display:block;clear:both;visibility:hidden;line-height:0;height:0}#dropbox{color:#fff;font-size:13px;width:800px;padding:10px 0;background:none repeat scroll 0 0 #111;border-radius:3px 3px 3px 3px;box-shadow:0 0 4px rgba(0,0,0,0.3) inset, 0 -3px 2px rgba(0,0,0,0.1);overflow:hidden;margin:5px auto 30px}#dropbox a,#dropbox a:link,#dropbox a:visited,#dropbox a:hover{color:inherit}#dropbox .message{display:block;text-align:center}#dropbox .message i{color:#CCC;font-size:10px}#dropbox .preview{float:left;position:relative;text-align:center;width:200px}#dropbox .preview img{box-shadow:0 0 2px #000;display:block;margin:auto;max-height:180px;max-width:170px}#dropbox .imageHolder{display:block;position:relative;height:180px;padding:20px 10px 10px 10px}#dropbox .uploaded{display:none;height:100%;left:0;position:absolute;top:0;width:100%}#dropbox .preview.done .uploaded{display:block}#dropbox .progressHolder{background-color:#252F38;box-shadow:0 0 2px #000;margin:0 10px}#dropbox .progress{-moz-transition:all .25s ease 0;background-color:#2586D0;box-shadow:0 0 1px rgba(255,255,255,0.4) inset;height:10px;width:0}#dropbox .preview.done .progress{width:100%!important}.addAllBar{margin:auto;width:180px;text-align:center;cursor:pointer;padding:5px 0;border:1px solid #fff;border-radius:5px;}.addAllBar:hover{box-shadow:0 0 4px #fff;}</style>').appendTo("head");
		$('<div id="dropbox" class="clearfix"><div class="message">Drop images here to upload.<br /><i><a href="http://opengg.me/">Authored by MiaoMiao.</a></i></div></div>').appendTo($('input#qr').parent());
		var dropbox = $('#dropbox'),
			message = $('.message', dropbox);
		var textarea = $('textarea#body');
		var imgurls = [];
		var posted=[];
		var addAllBar = $('<div class="addAllBar">Click here to Add all images to your post.<br /><span class="dropbox_uploaded"></span> / <span class="dropbox_count"></span></div>').appendTo(dropbox).hide().on('click', function () {
			textarea.insertAtCaret('\n[img=' + imgurls.join(']\n\n[img=') + ']\n');
			$.merge(posted, imgurls);
		});
		var waitingBar=$('<div class="addAllBar">Uploading, please wait and don\'t close this tab.<br /><span class="dropbox_uploaded"></span> / <span class="dropbox_count"></span></div>').appendTo(dropbox).hide();
		//var board=getUrlVars().board;
		var amountLimit=8;
		var uploaded=0;
		$('form#compose').submit(function(e){
			function arr_unique(arr) {
				var arrVal = arr;
				var uniqueArr = [];
				for (var i = arrVal.length; i--; ) {
					var val = arrVal[i];
					if ($.inArray(val, uniqueArr) === -1) {
						uniqueArr.unshift(val);
					}
				}
				return uniqueArr;
			}
			posted=arr_unique(posted);
			if(posted.length<imgurls.length){
				if(!confirm('上传的图片未全部贴出，你确定要发布这个帖子吗？')){
					if(e.preventDefault){
						e.preventDefault();
					}
					return false;
				}
			}
		});
		dropbox.filedrop({
			// The name of the $_FILES entry:
			paramname: 'file',

			maxfiles: 10000,
			maxfilesize: 2,
			url: 'picbucket-upload.php',
			/* data: {
				board: board
			}, */
			drop:function(e){
				var n=e.dataTransfer.files.length;
				$('.dropbox_count').html(n);
				n>amountLimit?alert('你上传的文件过多，全部预览可能会占用较多系统资源，只显示部分预览'):false;
				addAllBar.hide();
				waitingBar.show();
			},
			uploadFinished: function (i, file, response) {
				if (response.indexOf('URL') !== -1) {
					var imgholder = $.data(file);
					var imgurl = response.match('<img src="https:\/\/pt\.sjtu\.edu\.cn\/picbucket\/[^"]+')[0].replace('<img src="','');
					//console.log(response);
					//console.log($(response));
					//console.log($(response).find('img'));
					//console.log($(response).find('img')[0]);
					//console.log(imgurl);
					//imgholder.add
					//$('<div/>').appendTo(imgholder).on('click',function(){textarea.insertAtCaret(imgurl)});
					//console.log([imgholder,textarea]);
					if(imgurl.length>0){
						$('.dropbox_uploaded').html(++uploaded);
						imgurls.push(imgurl);
						if(imgholder.length>0){
							imgholder.on('click', function () {
								textarea.insertAtCaret('\n[img=' + imgurl + ']\n');
								posted.push(imgurl);
							});
							$.data(file).addClass('done');
						}
					}
				}
				// response is the JSON object that post_file.php returns
			},
			error: function (err, file) {
				switch (err) {
				case 'BrowserNotSupported':
					showMessage('Your browser does not support HTML5 file uploads!');
					break;
				case 'TooManyFiles':
					alert('Too many files! Please select 5 at most! (configurable)');
					break;
				case 'FileTooLarge':
					alert(file.name + ' is too large! Please upload files up to 2mb (configurable).');
					break;
				default:
					console.log([file, err]);
					break;
				}
			},
			afterAll:function(){addAllBar.show();waitingBar.hide();},
			// Called before each upload is started
			beforeEach: function (file) {
				/* if (!file.type.match(/^image\//)) {
					console.log(file.type);

					// Returning false will cause the
					// file to be rejected
					return false;
				} */
			},

			uploadStarted: function (i, file, len) {
				i<amountLimit?createImage(file):false;
			},

			progressUpdated: function (i, file, progress) {
				var imgholder=$.data(file);
				imgholder.length>0?$.data(file).find('.progress').width(progress):false;
			}

		});

		var template = '<div class="preview">'
						+ '<span class="imageHolder">'
							+ '<img />'
							+ '<span class="uploaded"></span>'
						+ '</span>'
						+ '<div class="progressHolder">'
							+ '<div class="progress"></div>'
						+ '</div>'
					+ '</div>';


		function createImage(file) {

			var preview = $(template),
				image = $('img', preview);

			var reader = new FileReader();

			image.width = 100;
			image.height = 100;

			reader.onload = function (e) {

				// e.target.result holds the DataURL which
				// can be used as a source of the image:
				image.attr('src', e.target.result);
			};

			// Reading the file as a DataURL. When finished,
			// this will trigger the onload function above:
			reader.readAsDataURL(file);

			message.hide();
			preview.appendTo(dropbox);

			// Associating a preview container
			// with the file, using jQuery's $.data():
			$.data(file, preview);
		}

		function showMessage(msg) {
			message.html(msg);
		}
	});
}

((typeof jQuery!=='undefined')&&recent(jQuery.fn.jquery)&&!jQuery.browser.webkit)?main():addJQuery(main);