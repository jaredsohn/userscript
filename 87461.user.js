// ==UserScript==
// @name           Script smiles from Pink Dream
// @namespace      Script smiles from Pink Dream
// @description    Script smiles from Pink Dream
// @include        http://*.tribalwars.*/*forum.php*answer=true*
// @include        http://*.tribalwars.*/*forum.php*mode=new_thread*
// @include        http://*.tribalwars.*/*forum.php*edit_post_id*
// @exclude        http://forum.tribalwars.*/*
// ==/UserScript==


// {$ dsScript $}
// version = 1.8.1
// author = (c) C1B1SE
// clients = firefox , opera
// areas = .de
// worlds = all
// premium = works
// description[de] = F�gt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies ausw?hlen kann, au?erdem die BB-Codes f�r Berichte.
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.smilies_bb-codes_0.png
// {$ /dsScript $}

/*
DS Smilies-BB-Codes-List

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

You may change string values if it's necessary for your language area.
Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.
*/

var smilies = new Array(
'http://i1239.photobucket.com/albums/ff518/abdullah40/1238.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1226.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1222.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1216.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1214.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1212.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1210.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1209.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1208.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1207.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1206.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1205.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1200.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1199.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1186.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1183.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1182.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/1177.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/972.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/935.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/904.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/900.gif',
'http://www.plapl.com/images/smilies/23.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/898.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/868.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/684.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/654.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/649.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/648.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/642.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/637.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/636.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/634.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/631.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/626.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/617.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/606.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/566.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/549.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/476.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/474.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/473.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/472.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/431.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/420.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/417.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/414.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/400.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/386.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/368.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/354.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/353.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/293.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/292.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/144.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/135.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/133.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/125.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/121.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/113.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/110.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/103.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/82.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/68.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/61.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/46.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/44.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/40.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/39.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/36.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/34.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/33.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/30.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/29.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/28.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/27.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/26.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/23.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/20.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/18.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/17.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/14.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/11.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/10.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/9.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/7.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/6.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/5.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/3.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/3-1.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/2.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/--1.gif',
'http://i1239.photobucket.com/albums/ff518/abdullah40/-.gif');

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

var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL'+
'e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ'+
'REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF'+
'EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E'+
'rkJggg==';

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
  a.setAttribute('title','Bericht verlinken');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    var url = prompt('����� ������� ��� ��� ���:','');
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
    var url = prompt('������ ������� ��� ��� ����  :','');
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