// ==UserScript==
// @name          TW Smilies-BB-Codes-List-The END
// @include       http://*.tribalwars.*/*forum.php*answer=true*
// @include       http://*.tribalwars.*/*forum.php*mode=new_thread*
// @include       http://*.tribalwars.*/*forum.php*edit_post_id*
// @exclude       http://forum.tribalwars.*/*
// ==/UserScript==

// {$ dsScript $}
// version = 2.0.0
// author = (c) UMAR1410
// clients = firefox , opera
// areas = .de
// worlds = all
// premium = works
// description[de] = Fügt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies ausw?hlen kann, au?erdem die BB-Codes für Berichte.
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.smilies_bb-codes_0.png
// {$ /dsScript $}

/*
TW Smilies-BB-Codes-List-The END
(c) by UMAR1410
         umar525@gmail.com
         http://cocsis.com

Screenshot:
http://cocsis.com/tw-smails/Screenshot.gif ( Version 1.0.0 )
*/
	
var smilies = new Array(
'http://cocsis.com/tw-smails/END.png',
'http://cocsis.com/tw-smails/01.gif',
'http://cocsis.com/tw-smails/02.gif',
'http://cocsis.com/tw-smails/03.gif',
'http://cocsis.com/tw-smails/04.gif',
'http://cocsis.com/tw-smails/05.gif',
'http://cocsis.com/tw-smails/06.gif',
'http://cocsis.com/tw-smails/07.gif',
'http://cocsis.com/tw-smails/08.gif',
'http://cocsis.com/tw-smails/09.gif',
'http://cocsis.com/tw-smails/10.gif',
'http://cocsis.com/tw-smails/11.gif',
'http://cocsis.com/tw-smails/12.gif',
'http://cocsis.com/tw-smails/13.gif',
'http://cocsis.com/tw-smails/14.gif',
'http://cocsis.com/tw-smails/15.gif',
'http://cocsis.com/tw-smails/16.gif',
'http://cocsis.com/tw-smails/17.gif',
'http://cocsis.com/tw-smails/18.gif',
'http://cocsis.com/tw-smails/19.gif',
'http://cocsis.com/tw-smails/20.gif',
'http://cocsis.com/tw-smails/21.gif',
'http://cocsis.com/tw-smails/22.gif',
'http://cocsis.com/tw-smails/23.gif',
'http://cocsis.com/tw-smails/24.gif',
'http://cocsis.com/tw-smails/25.gif',
'http://cocsis.com/tw-smails/26.gif',
'http://cocsis.com/tw-smails/27.gif',
'http://cocsis.com/tw-smails/28.gif',
'http://cocsis.com/tw-smails/30.gif',
'http://cocsis.com/tw-smails/31.gif',
'http://cocsis.com/tw-smails/32.png',
'http://cocsis.com/tw-smails/33.png',
'http://cocsis.com/tw-smails/34.png',
'http://cocsis.com/tw-smails/35.png',
'http://cocsis.com/tw-smails/36.png',
'http://cocsis.com/tw-smails/37.png',
'http://cocsis.com/tw-smails/38.png',
'http://cocsis.com/tw-smails/40.png',
'http://cocsis.com/tw-smails/41.png',
'http://cocsis.com/tw-smails/42.png',
'http://cocsis.com/tw-smails/43.png',
'http://cocsis.com/tw-smails/44.png',
'http://cocsis.com/tw-smails/45.png',
'http://cocsis.com/tw-smails/46.png',
'http://cocsis.com/tw-smails/48.gif',
'http://cocsis.com/tw-smails/49.gif',
'http://cocsis.com/tw-smails/50.gif',
'http://cocsis.com/tw-smails/51.gif',
'http://cocsis.com/tw-smails/53.gif',
'http://cocsis.com/tw-smails/54.gif',
'http://cocsis.com/tw-smails/55.gif',
'http://cocsis.com/tw-smails/56.gif',
'http://cocsis.com/tw-smails/57.gif',
'http://cocsis.com/tw-smails/58.gif',
'http://cocsis.com/tw-smails/59.gif',
'http://cocsis.com/tw-smails/60.gif',
'http://cocsis.com/tw-smails/62.gif',
'http://cocsis.com/tw-smails/64.gif',
'http://cocsis.com/tw-smails/65.gif',
'http://cocsis.com/tw-smails/66.gif',
'http://cocsis.com/tw-smails/67.gif',
'http://cocsis.com/tw-smails/68.gif',
'http://cocsis.com/tw-smails/69.gif',
'http://cocsis.com/tw-smails/70.gif',
'http://cocsis.com/tw-smails/71.gif',
'http://cocsis.com/tw-smails/72.gif',
'http://cocsis.com/tw-smails/73.gif',
'http://cocsis.com/tw-smails/74.gif',
'http://cocsis.com/tw-smails/75.gif',
'http://cocsis.com/tw-smails/76.gif',
'http://cocsis.com/tw-smails/77.gif',
'http://cocsis.com/tw-smails/78.gif',
'http://cocsis.com/tw-smails/79.gif',
'http://cocsis.com/tw-smails/80.gif',
'http://cocsis.com/tw-smails/81.gif',
'http://cocsis.com/tw-smails/82.gif',
'http://cocsis.com/tw-smails/83.gif',
'http://cocsis.com/tw-smails/84.gif',
'http://cocsis.com/tw-smails/85.gif',
'http://cocsis.com/tw-smails/86.gif',
'http://cocsis.com/tw-smails/87.gif',
'http://cocsis.com/tw-smails/88.gif',
'http://cocsis.com/tw-smails/89.gif',
'http://cocsis.com/tw-smails/90.gif',
'http://cocsis.com/tw-smails/91.gif',
'http://cocsis.com/tw-smails/92.gif',
'http://cocsis.com/tw-smails/93.gif',
'http://cocsis.com/tw-smails/94.gif',
'http://cocsis.com/tw-smails/95.gif',
'http://cocsis.com/tw-smails/96.png',
'http://cocsis.com/tw-smails/97.png',
'http://cocsis.com/tw-smails/98.png',
'http://cocsis.com/tw-smails/99.png',
'http://cocsis.com/tw-smails/100.png',
'http://cocsis.com/tw-smails/101.png',
'http://cocsis.com/tw-smails/102.png',
'http://cocsis.com/tw-smails/103.png',
'http://cocsis.com/tw-smails/104.png',
'http://cocsis.com/tw-smails/105.png');

var icon_smilies = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACoFBM'+
'VEUAAACvsrfb0bHNwJS5ur7Zz7DJvJSusrbe1LStsbbKvJG4sAuyqgrVzK7c0rKvpwrQxJ7IuI/TyKKU'+
'jQfDs411bwns4Rm0rArf0xK0rAu3rwvNwZvFvA66si7e1J706Rje1LDRyJ7VzBHKwA7c0RTYzqC7snmz'+
'qgv79Brb0q779yva0Jnb0RHw6l9sZwmwqA3CuRCYkBfb0bDe1bDs53Lt5nP26xf78xweHQW2rXTXzRGn'+
'oA0ZGASRigyxqBCooAiRiiLNxJzc07Lw6lz68xv16Rbu4hXUyRMKCgOlng3SyRGbkwze1KyEfgm4sAys'+
'sLXf1a6im1359TTWzJ3y6y6fmA/r4BTm2xSnnhAjIgWyqg7OxQ+jmw0gHgWVjgu2rgyelQbd0hWBew7V'+
'yovr3xTn3BPJvxCSiw26sV/LwA67sg7k3Jr49DP89BqwqAqlnQeBexjy5xbMwYLZzhKwpxCclA/WzBHS'+
'yBHOxA/KwQ7GvA7Btw28tAzj2pqupwv17DKFfwiBexDJvxbJvIgKCQKspA+FfwzQxhDMww7Jvw7FvA3B'+
'uA28swzp3RSxqAppYwmHgAeFfRyimiTMv5HOwZfKu5K3rTCKhAy9tA7Hvg3DuQ3Atw28sw2zqgqYjwh0'+
'bgqXkAaPhzbGvRmzqVa1rAqblAqPiQ2/tg6+tgy6sguzrAq1rBGjmguTjAmJgQ2roWrGuYaclCOIggl/'+
'eQuhmgqvpgqRiQlybAuOiAuJgjHFuIu4rHOUjB2mnQmakgt4cgl1cAp9dgtzbQp2cAmWjwiTjAiHfyK5'+
'rn+7r3mSii6Rig+YkQaXjweVjQiUjQaTjAeIgRKRijy8sIGMhDLGuo24rXeimVGTizeNhS6TiziimVW3'+
'rHrIu5CGgAqupwy1rQpMLoSeAAAAAXRSTlMAQObYZgAAAWlJREFUeF5VzFOzK1EQgNG9xzOxk2Pbtm3b'+
'tm1b17Zt27b9V85k8nLzvXTXqq4GACP/C0JIYgBAAY7ohQswAHGKK8nE0dqe23AaQISdZsPOo0qrCeM6'+
'cyFFIakcpnln+Jouqy0sbTfaeFAId+np5WBXXhHr5Obiynf3F+qwsanZJ8TvVEBgUDAvNCxci3hEZFR0'+
'THZcfELiVHKKSJaOsyjNzGrPyc3LLygsKi4pFZV9krIorlRWVatrao3qG/78/dfS2iYmATTs6Ozq7unt'+
'6x8YHDIYUYyNG0IAicmD0zOzc/MLi0s8zcrq2gaCRWbTVqNt23fs3LWbp9mzd9/+AwzJInro8JGjx46f'+
'MDipOq04c/YcQ2vx/AX+xUuXVfwrV69dl924qUP01u07d+/df/Dw0eMnT5+hDOQQff7i5avXb96+e//h'+
'I4pqfxKb2T5/+frt+4+fv36zO8GiXLJFL4kcAwCjSb1oDKwDMvtwyB3q78QAAAAASUVORK5CYII=';

var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n'+
'mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf'+
'mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf'+
'ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS'+
'TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM'+
'NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a'+
'zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E'+
'rkJggg==';


if(document.getElementById('message'))
  {
  // Smilies' Box
  var table = document.createElement('table');
  table.setAttribute('id','bb_smilies');
  table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 24px; left: 200px; ');

  var tr = document.createElement('tr');

  var td = document.createElement('td');
  td.setAttribute('style','padding:2px;');

  for(var i = 0; i < smilies.length; i++)
    {
    var img = new Image();
    img.setAttribute('src',smilies[i]);
    img.setAttribute('style','vertical-align:middle; ');
    img.setAttribute('alt','[img]'+smilies[i]+'[/img]');

    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.setAttribute('style','vertical-align:middle; ');
    a.addEventListener('click',function() {
      insert(this.title,'');
      toggle('bb_smilies');
      return false;
    },false);
    a.setAttribute('title','[img]'+smilies[i]+'[/img]');
    a.appendChild(img);

    td.appendChild(a);
    }

  tr.appendChild(td);
  table.appendChild(tr);
  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].appendChild(table);

  // Smilies
  var a = document.createElement('a');
  a.setAttribute('title','Smilies');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    toggle('bb_smilies');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_smilies+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

  // Report Direct
  var a = document.createElement('a');
  a.setAttribute('title','اظهار التقرير على شكل رابط');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    var url = prompt('اظهار التقرير على شكل رابط:','');
    if(url != '')
      {
      if(url.indexOf('=') != -1)
        {
        url = url.split('=').pop();
        insert('[report]'+url+'[/report]','');
        }
      else
        {
        url = url.split('/').pop();
        insert('[report]'+url+'[/report]','');
        }
      }
    else
      insert('[report]','[/report]');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_report_link+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

  // Report link
  var a = document.createElement('a');
  a.setAttribute('title','Bericht direkt anzeigen');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    var url = prompt('اظهار التقرير على شكل صوره  :','');
    if(url != '')
      {
      if(url.indexOf('=') != -1)
        {
        url = url.split('=').pop();
        insert('[report_display]'+url+'[/report_display]','');
        }
      else
        {
        url = url.split('/').pop();
        insert('[report_display]'+url+'[/report_display]','');
        }
      }
    else
      insert('[report_display]','[/report_display]');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_report_direct+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

  }

function toggle(id)
  {
  var e = document.getElementById(id);
  if(e.style.display == 'block')
    e.style.display = 'none';
  else
    e.style.display = 'block';
  }

// Stolen Code:
// http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/
function insert(aTag, eTag)
  {
  var input = document.getElementById('message');
  input.focus();
  if(typeof input.selectionStart != undefined)
    {
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var insText = input.value.substring(start, end);
    input.value = input.value.substr(0,start) + aTag + insText + eTag + input.value.substr(end);
    var pos;
    if(insText.length == 0)
      pos = start + aTag.length;
    else
      pos = start + aTag.length + insText.length + eTag.length;
    input.selectionStart = pos;
    input.selectionEnd = pos;
    }
  }