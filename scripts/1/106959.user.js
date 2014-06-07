// ==UserScript==
// @name          سكريبت ابتسامات حرب القبائل (ولاية بني ياس)
// @namespace     Anonymous User
// @description   سكريبت ابتسامات حرب القبائل من انشاء موقع tw4me.com خاص بالنسخة العربية
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

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
'http://www.hostk.info/upload/uploads/hostk13107454291.gif',
'http://www.hostk.info/upload/uploads/hostk13107454292.gif',
'http://www.hostk.info/upload/uploads/hostk13107454293.gif',
'http://www.hostk.info/upload/uploads/hostk13107454294.gif',
'http://www.hostk.info/upload/uploads/hostk13107454295.gif',
'http://www.hostk.info/upload/uploads/hostk13107454296.gif',
'http://www.hostk.info/upload/uploads/hostk13107454297.gif',
'http://www.hostk.info/upload/uploads/hostk13107454298.gif',
'http://www.hostk.info/upload/uploads/hostk13107454299.gif',
'http://www.hostk.info/upload/uploads/hostk131074542910.gif',
'http://www.hostk.info/upload/uploads/hostk131074542911.png',
'http://www.hostk.info/upload/uploads/hostk131074542912.gif',
'http://www.hostk.info/upload/uploads/hostk131074542913.gif',
'http://www.hostk.info/upload/uploads/hostk131074543014.gif',
'http://forum.tribalwars.ae/images/smilies/biggrin.gif',
'http://www.hostk.info/upload/uploads/hostk13107928821.gif',
'http://www.hostk.info/upload/uploads/hostk13107928832.gif',
'http://www.hostk.info/upload/uploads/hostk13107928833.gif',
'http://www.hostk.info/upload/uploads/hostk13107928834.gif',
'http://www.hostk.info/upload/uploads/hostk13107928835.gif',
'http://www.hostk.info/upload/uploads/hostk13107928836.gif',
'http://www.hostk.info/upload/uploads/hostk13107928837.gif',
'http://www.hostk.info/upload/uploads/hostk13107928838.gif',
'http://www.hostk.info/upload/uploads/hostk13107928839.gif',
'http://www.hostk.info/upload/uploads/hostk131079288310.gif',
'http://www.hostk.info/upload/uploads/hostk13107953951.gif',
'http://www.hostk.info/upload/uploads/hostk13107953952.gif',
'http://www.hostk.info/upload/uploads/hostk13107953953.gif',
'http://www.hostk.info/upload/uploads/hostk13107953954.gif',
'http://www.hostk.info/upload/uploads/hostk13107953956.gif',
'http://www.hostk.info/upload/uploads/hostk13107953967.gif',
'http://www.hostk.info/upload/uploads/hostk13107953968.gif',
'http://www.hostk.info/upload/uploads/hostk13107953969.gif',
'http://www.hostk.info/upload/uploads/hostk131079539610.gif',
'http://www.hostk.info/upload/uploads/hostk131079539611.gif',
'http://www.hostk.info/upload/uploads/hostk131079539612.gif',
'http://www.hostk.info/upload/uploads/hostk131079539613.gif',
'http://www.hostk.info/upload/uploads/hostk131079539614.gif',
'http://www.hostk.info/upload/uploads/hostk131079539615.gif',
'http://www.hostk.info/upload/uploads/hostk131079539616.gif',
'http://www.hostk.info/upload/uploads/hostk131079539717.gif',
'http://www.hostk.info/upload/uploads/hostk131079539718.gif',
'http://www.hostk.info/upload/uploads/hostk131079539719.gif',
'http://www.hostk.info/upload/uploads/hostk13107960261.gif',
'http://www.hostk.info/upload/uploads/hostk13111020061.gif',
'http://www.hostk.info/upload/uploads/hostk13107960263.gif',
'http://www.hostk.info/upload/uploads/hostk13107960274.gif',
'http://www.hostk.info/upload/uploads/hostk13107960275.gif',
'http://www.hostk.info/upload/uploads/hostk13107960276.gif',
'http://www.hostk.info/upload/uploads/hostk13107960277.gif',
'http://www.hostk.info/upload/uploads/hostk13107960278.gif',
'http://www.hostk.info/upload/uploads/hostk13107960279.gif',
'http://www.hostk.info/upload/uploads/hostk131079602710.gif',
'http://www.hostk.info/upload/uploads/hostk131079602711.gif',
'http://www.hostk.info/upload/uploads/hostk13107201731.gif',
'http://smailes.alwalhan-vip.com/smile_albums/20/1%20(27).gif',
'http://www.shooq4.net/upfiles/8Bv70174.gif',
'http://www.pic.m3m2.com/data/media/6/rm%20%2831%29.gif',
'http://www.pic.m3m2.com/data/media/6/rm%20%2833%29.gif',
'http://www.msnxmsn.com/up/uploads/images/msn-5efa429591.gif',
'http://www.msnxmsn.com/up/uploads/images/msn-65f50ac6ef.gif',
'http://www.msnxmsn.com/up/uploads/images/msn-35197ce05a.gif',
'http://www.msnxmsn.com/up/uploads/images/msn-937af6918e.gif',
'http://www.msgshit.com/images/msn_emoticons/Animated/msgshit_com_1876.gif',
'http://smailes.alwalhan-vip.com/smile_albums/20/1%20(27).gif',
'http://www.msgshit.com/images/msn_emoticons/Other/msgshit_com_2145.gif');


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
  table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat bottom right; top: 350px; left: 230px; ');

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
    var url = prompt('اضهار التقرير على شكل ربط:','');
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
    var url = prompt('أاضهار التقرير على شكل صوره  :','');
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