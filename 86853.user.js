// ==UserScript==
// @name Stanford Video MMS Commander
// @description Displays (selected, for easy copy-paste) a mencoder command to save the current video to disk.
// @license This SW may not be used to violate Stanford's terms of use.
// @namespace http://bullseyelabs.com
// @include https://myvideosu.stanford.edu/player/slplayer.aspx*
// ==/UserScript==

/* set up my namespace */
if (typeof(bullseyelabs) == 'undefined') var bullseyelabs = {};

bullseyelabs.svmmsc = {
  exe: 'mencoder',
  opts: '-ovc copy -oac copy -O',

  gainPrivilegeEvt: 'bullseyelabsSvmmscGainPrivilege',

  mms_path: null,
  class_abrv: null,
  video_date: null,
  filename: null,
  cmd: null,

  init: function() {
    var o = document.getElementById('WMPlayer');
    var domain_and_path = o.data.substring('http://'.length);
    var parts = domain_and_path.split('/');

    var d = parts[3];
    var year = '20' + d.substring(0,2);
    var month = d.substring(2,4);
    var day = d.substring(4,6);

    this.mms_path = 'mms://' + domain_and_path;
    this.class_abrv = parts[2];
    this.video_date = year + '-' + month + '-' + day;
    this.filename = this.class_abrv + '_' + this.video_date + '.avi';
    this.cmd = [this.exe, this.mms_path, this.opts, this.filename].join(' ');
    return this.cmd;
  },

  /* this handler allows us to jump from unpriviledged to priviledged */
  display: function() {
    var d = document.createElement('div');
    var s_tit = document.createElement('h2');
    var s_cont = document.createElement('p');
    s_tit.innerHTML = "SVMMS Commander save video command:";
    s_cont.innerHTML = this.cmd;
    d.appendChild(s_tit);
    d.appendChild(s_cont);
    d.style.backgroundColor = 'lightgrey';
    d.style.padding = '5px 10px';
    s_cont.style.fontSize = '10px';
    s_cont.style.padding = '10px';
    d.style.MozBorderRadius = '40px';

    document.body.insertBefore(d, document.body.firstElementChild);

    /* set the selection to cover that new elem */
    var range = document.createRange();
    range.selectNodeContents(s_cont);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  },

  onLoadHandler: {
    handleEvent: function(evt) {
      bullseyelabs.svmmsc.init();
      bullseyelabs.svmmsc.display();
    },
  },

};

window.addEventListener('load', bullseyelabs.svmmsc.onLoadHandler, false);

