// ==UserScript==
// @name        NicovideoUploadProgress
// @namespace   https://github.com/segabito/
// @description ニコニコ動画の動画投稿フォームに、アップロード状態がわかるプログレスバーをつける (Chrome/Fx用)
// @include     http://www.upload.nicovideo.jp/upload*
// @include     http://upload.nicovideo.jp/upload*
// @version     121122
// @grant       none
// ==/UserScript==


(function() {
  var style = [
    '#upload { display: none; }',
    '.uploadProgressForm {',
      'width: 432px;',
    '}',
    '.uploadProgressForm .uploadStatus {',
      'font-size: 80%;',
    '}',
    '.progressBarContainer {',
      'visibility: hidden;',
      'background: url("/img/jp/index/percent_bg.png") no-repeat scroll 0 0 transparent;',
      'margin: 4px 0 0;',
      'overflow: hidden;',
      'padding: 2px 16px 14px;',
      'width: 400px; height: 30px; position: relative;',
    '}',
    '.progressBarContainer .progressBarInner {',
      'width: 50%; height: 4px;',
    '}',
    '.progressFormSubmitButton {',
      'background: #191F1F url(\'/img/jp/upload/bg_submit.png\') repeat-x top; ',
      'color:#FCC; ',
      'font-size:16px; ',
      'padding:4px; ',
      'border:solid 3px; ',
      'border-color:#999F9F #696F6F #393F3F; ',
      'border-radius: 8px;',
      'cursor: pointer;',
    '}',
    '.progressBarContainer .progressFinishWait {',
      'position: absolute; ',
      'display: none; ',
      'margin: auto auto; ',
    '}',
    'body.upload_finish .progressBarContainer .progressFinishWait,body.upload_result .progressBarContainer .progressFinishWait {',
      'display: inline-block;',
      'background: none repeat scroll 0 0 white;',
      'border: 1px solid blue;',
      'color: black;',
      'cursor: wait;',
      'display: inline-block;',
      'font-weight: bolder;',
      'left: 100px;',
      'margin: 0 auto;',
      'opacity: 0.7;',
      'padding: 1px;',
      'text-align: center;',
      'top: 4px;',
      'width: 200px;',
      'z-index: 300;',
    '}',
    'body.uploading     .progressBarContainer {',
    '}',
    'body.upload_finish .progressBarContainer, body.upload_finish .uploadStatus, body.upload_finish .data_input {',
      'cursor: wait;',
    '}',
    'body.upload_finish .uploadProgressForm {',
    '}',
    'body.uploading .progressFormSubmitButton, body.upload_finish .progressFormSubmitButton {',
      'cursor: wait !important; ',
      'opacity: 0.5; ',
    '}',
    'body.upload_result input, body.upload_result button {',
      //'visibility: hidden;',
      'opacity: 0.3;',
      'cursor: not-allowed;',
    '}',
  ''].join('\n');


  var ProgressBar = (function() {
    var imgBar = document.createElement('img');
    var s      = document.createElement('span');
    var wait   = document.createElement('span');

    imgBar.className = 'progressBarInner';
    imgBar.src = '/img/jp/index/percent_bar_0.png';

    wait.className = 'progressFinishWait';
    wait.innerHTML = '処理中';

    var self = {
      initialize: function(container) {
        this.container = container;
        this.container.className = 'progressBarContainer';


        this.container.appendChild(wait);
        this.container.appendChild(imgBar);
      },
      percent: function(p) {
        if (p >= 97) {
          p = 100;
          document.body.className = 'upload_finish';
        } else {
        }
        imgBar.style.width  = p + '%';
      },
      hide: function() { this.container.style.visibility = 'hidden'; },
      show: function() { this.container.style.visibility = 'visible'; }

    };

    return self;
  })();
  window.ProgressBar = ProgressBar;


  function init() {
    var originalForm      = document.forms[0],
        originalFileInput = document.getElementById('upload'),
        originalSubmit    = document.getElementsByName('submitbtn')[0];
    var container  = document.createElement('div');
    var info       = document.createElement('span');
    var fileSelect = document.createElement('input');
    var submit     = document.createElement('button');
    var bar        = document.createElement('div');

    originalForm.onsubmit = function() { return false; }

    container.className = 'uploadProgressForm';
    info.className = 'uploadStatus';

    fileSelect.type      = 'file';
    submit.innerHTML = '本ページ記載内容および利用規約に同意し動画を投稿';
    submit.className = 'progressFormSubmitButton';

    ProgressBar.initialize(bar);


    container.appendChild(fileSelect);
    container.appendChild(bar);
    container.appendChild(info);

    submit.addEventListener('click', function() {
      if (submit.disabled) {
        return;
      }
      if (uploadbtnd_str_switch(fileSelect, '本当によろしいですか？', 'アップロードするファイルを選択してください')) {
        submit.disabled = true;
        onSubmit(originalForm, fileSelect, info);
      } else {
        submit.disabled = false;
      }
      return false;
    });

    addStyle(style);
    originalFileInput.parentNode.appendChild(container);
    originalSubmit.parentNode.appendChild(submit);
    originalSubmit.style.display = 'none';
  };

  function uploadbtnd_str_switch(inp, str1,str2){
    if(inp.value == ""){
      alert(str2);
      return false;
    }
    var ret = confirm(str1);
    if (ret==true ){
      return true;
    }else{
      return false;
    }
  }

  function onSubmit(form, inp, info) {
    if (inp.files.length < 1) return;

    var file = inp.files[0], maxSize = parseInt(form.elements['MAX_FILE_SIZE'].value, 10);
    if (file.size > maxSize) {
      alert('ファイルサイズオーバーです   (あと' +(file.size - maxSize) + 'バイト)');
      return false;
    }
    inp.style.display = 'none';
    ProgressBar.show();

    info.innerHTML = ['',
              'file: ', file.name, '<br>',
              'size:',  file.size, '<br>',
              'type:',  file.type, '<br>',
    ''].join('');


    xhr("POST", form.action).send(fd(form, file));
    return false;
  }


  function fd(form, file) {
    var fd = new FormData();
    fd.append('MAX_FILE_SIZE',  form.elements['MAX_FILE_SIZE'].value);
    fd.append('cmd',     form.elements['cmd'].value);
    fd.append('uniq_id', form.elements['uniq_id'].value);
    var screen = form.elements['screen'];
    for (var i = 0; i < screen.length; i++) {
      var f = screen[i];
      if (f.checked) {
        fd.append('screen', f.value.toString());
        break;
      }
    }
    if (form.elements['notify_pc']) {
      fd.append('notify_pc',     form.elements['notify_pc'].value);
      fd.append('notify_mobile', form.elements['notify_mobile'].value);
    }
    fd.append('filename', file);
    return fd;
  }

  function xhr(m, a) {
    var xhr = new XMLHttpRequest();
      xhr.upload.onprogress = function(e) {
        var per = Math.round(e.loaded / e.total * 100);
        ProgressBar.percent(per);
      }
    document.body.className = 'uploading';
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        //document.body.className = document.body.className.replace(' uploading ', '');
        var res = xhr.responseText.replace(/[\r\n]/g, '');
        document.body.className = 'upload_result';
        if (xhr.status != 200) {
          alert('ファイルのアップロード中にエラーが発生しました。 status:' + xhr.status + '\n' + res);
          location.replace('/upload');
          return;
        }
        if ((/<!--エラー--><p.*?>(.*?)<\/p>/).test(res)) {
          var err = RegExp.$1;
          alert(err);
          location.replace('/upload');
        } else {
          location.replace('/edit');
        }
      }
    }
    xhr.open(m, a);
    return xhr;
  }

  function addStyle(styles) {
    var st = document.createElement('style');
    st.type = 'text/css';
    var tx = ''+styles+'';
    tx = document.createTextNode(tx)
    st.appendChild(tx);
    var head = document.getElementsByTagName('head');
    head = head[0];
    head.appendChild(st);
  };

  init();
})();