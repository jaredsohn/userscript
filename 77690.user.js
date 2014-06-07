// ==UserScript==
// @name        Download video from http://youtube.com/
// @version     2.16
// @date        2012-12-20
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/youtube_com.js
// @include     http://youtube.com/watch*
// @include     http://*.youtube.com/watch*
// @include     http://youtube.com/user*
// @include     http://*.youtube.com/user*
// @include     https://youtube.com/watch*
// @include     https://*.youtube.com/watch*
// @include     https://youtube.com/user*
// @include     https://*.youtube.com/user*
// ==/UserScript==

(function(){
  var showFormat = {
    'FLV': true,
    'MP4': true,
    'WebM': false,
    '3GP': false
  };

  var nextBtn = 'data:image/gif;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAI6hI+pEO0Pw5GrUlrVzWsb/GnhBzaJRyLmNE4lhrqqB6Yy09p6vOr4z3idWrXaz8iJcUbIDCwC7S0rBQA7',
    prevBtn = 'data:image/gif;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAI6hI+pEO0Pw5GrUlrVzWsnbGDeBDZTiJhkioYlyLSqq8lvHdMrm+t+DpsxRC3eScbBwZKjZDECdTg5BQA7';


  function getTitle()
  {
    if(window.yt && yt.config_ && yt.config_['VIDEO_TITLE'])
      return decodeURIComponent(yt.config_['VIDEO_TITLE']);

    var t = document.getElementById('watch-headline-title');
    if(t)
    {
      return t.innerText;
    }

    var meta = document.getElementsByTagName('meta');
    for(var i = 0; i < meta.length; i++)
    {
      var name = meta[i].getAttribute('name', false);
      if(name && name.toLowerCase() == 'title')
        return meta[i].getAttribute('content', false);
    }

    return '';
  }

  function getSwfArgs()
  {
    if(window.yt && yt.config_ && yt.config_['SWF_ARGS'])
      return yt.config_['SWF_ARGS'];

    var t = document.body.innerHTML.match(/[\"\'](?:swf_args|args)[\"\']\s*:\s*(\{[^\}]+\})/i);
    if(t && t.length > 1)
      return eval('(' + t[1] + ')');

    var e = document.getElementsByTagName('embed');
    for(var i = 0; i < e.length; i++)
    {
      var f = e[i].getAttribute('flashvars', false);
      if(f && f.search(/fmt_map=/i) != -1)
      {
        var swfargs = [];
        f = f.split('&');
        for(var j = 0; j < f.length; j++)
        {
          var p = f[j].split('=', 2);
          if(p.length == 2)
            swfargs[p[0]] = p[1];
          else if(p.length == 1)
            swfargs[p[0]] = '';
        }

        return swfargs;
      }
    }
  }

  function modifyTitle(t)
  {
    t = t.replace(/[\x2F\x5C\x3A\x7C]/g, '-');
    t = t.replace(/[\x2A\x3F]/g, '');
    t = t.replace(/\x22/g, '\'');
    t = t.replace(/\x3C/g, '(');
    t = t.replace(/\x3E/g, ')');
    t = t.replace(/(?:^\s+)|(?:\s+$)/g, '');
    return t;
  }

  function getDownloadLink(video_id, token, fmt)
  {
    return 'http://' + location.host + '/get_video?video_id=' + video_id + '&t=' + token + '&fmt=' + fmt + '&asv=';
  }

  function showLinks(l)
  {
    var title = getTitle(), titleAttr = '';
    if(title)
    {
      title = modifyTitle(title);
      titleAttr = '&title=' + encodeURIComponent(title);
    }

    var p = document.createElement('div');
    setStyle(p, {
      display: 'block',
      color: '#000',
      backgroundColor: '#e7eefa',
      border: '1px solid #c3d0ec',
      padding: '5px 0',
      textAlign: 'center'
    });

    var fmt_params = {
      '5': {format: 'FLV', quality: '240p'},
      '34': {format: 'FLV', quality: '360p'},
      '35': {format: 'FLV', quality: '480p'},
      '83': {format: 'FLV', quality: '480p', '3d': true},
      '18': {format: 'MP4', quality: '360p'},
      '82': {format: 'MP4', quality: '360p', '3d': true},
      '22': {format: 'MP4', quality: '720p'},
      '84': {format: 'MP4', quality: '720p', '3d': true},
      '37': {format: 'MP4', quality: '1080p'},
      '85': {format: 'MP4', quality: '1080p', '3d': true},
      '38': {format: 'MP4', quality: '4k'},
      '43': {format: 'WebM', quality: '360p'},
      '100': {format: 'WebM', quality: '360p', '3d': true},
      '44': {format: 'WebM', quality: '480p'},
      '101': {format: 'WebM', quality: '480p', '3d': true},
      '45': {format: 'WebM', quality: '720p'},
      '102': {format: 'WebM', quality: '720p', '3d': true},
      '46': {format: 'WebM', quality: '1080p'},
      '103': {format: 'WebM', quality: '1080p', '3d': true},
      '17': {format: '3GP', quality: '144p'},
      '36': {format: '3GP', quality: '240p'}
    };

    var order = [5, 34, 35, 18, 22, 37, 38, 43, 44, 45, 46, 17, 36];
    var order3d = [83, 82, 84, 85, 100, 101, 102];

    var s1 = {
      fontWeight: 'bold',
      whiteSpace: 'nowrap'
    };

    var s2 = {
      fontSize: '85%',
      fontWeight: 'normal',
      marginLeft: '3px',
      whiteSpace: 'nowrap'
    };

    var sep = false, hidden = false;
    for(var i = 0; i < order.length; i++)
    {
      var fmt = order[i].toString();
      if(l[fmt])
      {
        var a = document.createElement('a');
        a.href = l[fmt] + titleAttr;
        a.innerHTML = fmt_params[fmt].format;
        a.className = 'format-' + fmt_params[fmt].format;
        setStyle(a, s1);

        var s = document.createElement('span');
        s.innerHTML = fmt_params[fmt].quality;
        setStyle(s, s2);
        a.appendChild(s);

        if(!showFormat[fmt_params[fmt].format])
        {
          a.style.display = 'none';
          hidden = true;
        }
        else if(sep)
        {
          a.style.marginLeft = '15px';
        }

        p.appendChild(a);
        sep = true;
      }
    }

    s1.marginLeft = '15px';

    for(var i in l)
    {
      if(!fmt_params[i])
      {
        var a = document.createElement('a');
        a.href = l[i] + titleAttr;
        a.innerHTML = i;
        setStyle(a, s1);
        p.appendChild(a);
      }
    }


    if(hidden)
    {
      var btn = document.createElement('img');
      btn.src = nextBtn;
      setStyle(btn, {
        marginLeft: '15px',
        verticalAlign: 'middle',
        opacity: 0.4
      });

      btn.addEventListener('click', function(){
        var show = false;

        if(btn.className == 'show-all')
        {
          btn.className = '';
          btn.src = nextBtn;
        }
        else
        {
          btn.className = 'show-all';
          btn.src = prevBtn;
          show = true;
        }

        for(var i in showFormat)
        {
          if(!showFormat[i])
          {
            var a = document.querySelectorAll('a.format-' + i);
            if(a && a.length > 0)
            {
              for(var j = 0; j < a.length; j++)
              {
                if(show)
                {
                  var prev = a[j].previousSibling;
                  setStyle(a[j], {
                    display: '',
                    marginLeft: (prev && prev.tagName == 'A') ? '15px' : 0
                  });
                }
                else
                  setStyle(a[j], {display: 'none', marginLeft: 0});
              }
            }
          }
        }

        return false;
      }, false);

      p.appendChild(btn);

    }


    sep = false;
    for(var i = 0; i < order3d.length; i++)
    {
      var fmt = order3d[i].toString();
      if(l[fmt])
      {
        if(!sep)
        {
          p.appendChild(document.createElement('br'));
          p.appendChild(document.createTextNode('3D:'));
          sep = true;
        }

        var a = document.createElement('a');
        a.href = l[fmt] + titleAttr;
        a.innerHTML = fmt_params[fmt].format;
        a.className = 'format-' + fmt_params[fmt].format;
        setStyle(a, s1);

        var s = document.createElement('span');
        s.innerHTML = fmt_params[fmt].quality;
        setStyle(s, s2);
        a.appendChild(s);

        if(!showFormat[fmt_params[fmt].format])
          a.style.display = 'none';

        p.appendChild(a);
        sep = true;
      }
    }

    document.body.insertBefore(p, document.body.firstChild);
  }

  function onLoad()
  {
    var swfargs = getSwfArgs();
    if(!swfargs)
      return;

    var token = swfargs.t ? swfargs.t : swfargs.token;
    if(!token)
      return;

    var video_id = swfargs.video_id;
    if(!video_id)
    {
      var m = location.href.match(/\/watch\?(?:.+&)?v=([\w\-]+)/i);
      if(m && m.length > 1)
        video_id = m[1];
    }

    if(!video_id)
      return;

    var u = swfargs['fmt_url_map'];
    if(!u)
      u = swfargs['url_encoded_fmt_stream_map'];

    if(!u)
      return;

    var l = {};

    if(u.search(/url=http/i) > -1)
    {
      u = u.split(',');
      for(var i = 0; i < u.length; ++i)
      {
        var p = parseQuery(u[i]);
        if(p.url)
        {
          if(p.url.search(/(\?|&)sig(nature)?=/i) == -1)
          {
            if(p.sig)
              p.url += '&signature=' + encodeURIComponent(p.sig);
            else if(p.signature)
              p.url += '&signature=' + encodeURIComponent(p.signature);
          }

          if(p.url.search(/(\?|&)itag=/i) == -1)
          {
            if(p.itag)
              p.url += '&itag=' + encodeURIComponent(p.itag);
          }

          var fmt = p.url.match(/(?:\?|&)itag=(\d+)/i);
          if(fmt && fmt.length > 1)
          {
            p.url = p.url.replace(/(\?|&)sig=/i, '$1signature=').
              replace(/\\u0026/ig, '&').replace(/\\\//g, '/');

            l[fmt[1]] = p.url;
          }
        }
      }
    }
    else
    {
      u = decodeURIComponent(u);
      u = u.replace(/\\u0026/ig, '&').replace(/\\\//g, '/');
      u = u.replace(/,(\d+)\|/g, "\n$1|");
      u = u.split('\n');

      if(u && u.length > 0)
      {
        for(var i = 0; i < u.length; i++)
        {
          var t = u[i].split('|');
          if(t && t.length == 2)
          {
            l[t[0]] = t[1];
            if(t[0] == '18')
              fmt18 = true;
          }
        }
      }
    }

    showLinks(l);
    return;
  }


  function setStyle(node, style)
  {
    if(!node || !style)
      return;

    for(var i in style)
      node.style[i] = style[i];
  }


  function parseQuery(query)
  {
    var k = {};
    var re = /[?&]?([^=]+)(?:=([^&]*))?/g;
    while(m = re.exec(query))
    {
      if(m[1] && m[2])
        k[m[1]] = decodeURIComponent(m[2]);
      else if(m[1])
        k[m[1]] = '';
    };

    return k;
  }


  if(typeof(opera.version) == 'function' && opera.version() >= 9)
    document.addEventListener('DOMContentLoaded', onLoad, false);
  else
    document.addEventListener('load', onLoad, false);
})();