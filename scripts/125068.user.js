// ==UserScript==
// @name          سكربت الابتسامات البلاك بيري  وابتسامات اخرى2012 تم الحديث بتاريخ 7-2-2012 By:1750000
// @namespace     Anonymous User
// @description   لعيون قبيلة الفتح , By:1750000
// @include        http://ae*.tribalwars.ae/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
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
'http://www.bh30.com/vb3/images/ns/About_To_Cry.gif',
'http://www.bh30.com/vb3/images/ns/Angel.gif',
'http://www.bh30.com/vb3/images/ns/Angry_2.gif',
'http://www.bh30.com/vb3/images/ns/Angry_1.gif',
'http://www.bh30.com/vb3/images/ns/Angry_3.gif',
'http://www.bh30.com/vb3/images/ns/Soldier.gif',
'http://www.bh30.com/vb3/images/ns/Angry_4.gif',
'http://www.bh30.com/vb3/images/ns/Asking.gif',
'http://www.bh30.com/vb3/images/ns/Beaten.gif',
'http://www.bh30.com/vb3/images/ns/Being_Funny.gif',
'http://www.bh30.com/vb3/images/ns/Sleep.gif',
'http://www.bh30.com/vb3/images/ns/Bomb.gif',
'http://www.bh30.com/vb3/images/ns/Boss.gif',
'http://www.bh30.com/vb3/images/ns/Boy.gif',
'http://www.bh30.com/vb3/images/ns/Bye.gif',
'http://www.bh30.com/vb3/images/ns/Cry_1.gif',
'http://www.bh30.com/vb3/images/ns/Cry_2.gif',
'http://www.bh30.com/vb3/images/ns/Fighter.gif',
'http://www.bh30.com/vb3/images/ns/Hypno.gif',
'http://www.bh30.com/vb3/images/ns/Hello.gif',
'http://www.bh30.com/vb3/images/ns/Laught_1.gif',
'http://www.bh30.com/vb3/images/ns/Money.gif',
'http://www.bh30.com/vb3/images/ns/Magnify.gif',
'http://www.bh30.com/vb3/images/ns/Phone.gif',
'http://www.bh30.com/vb3/images/ns/Scream.gif',
'http://www.bh30.com/vb3/images/ns/Moon.gif',
'http://www.bh30.com/vb3/images/ns/Tongue.gif',
'http://www.bh30.com/vb3/images/ns/Yell.gif',
'http://www.bh30.com/vb3/images/ns/Slapped.gif',
'http://www.bh30.com/vb3/images/ns/Ok.gif',
'http://www.bh30.com/vb3/images/ns/In_Love.gif',
'http://www.bh30.com/vb3/images/ns/Thinking.gif',
'http://ae1.tribalwars.ae/graphic/unit/unit_spear_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_sword_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_axe_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_archer_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_snob_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_ram_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_catapult_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_spy_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_light_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_marcher_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_heavy_60.png?1',
'http://img29.imageshack.us/img29/556/33657262.png',
'http://img819.imageshack.us/img819/5943/74139180.png',
'http://img687.imageshack.us/img687/8972/68017989.png',
'http://img710.imageshack.us/img710/2571/74372725.png',
'http://img703.imageshack.us/img703/6138/55534031.png',
'http://img543.imageshack.us/img543/3838/41395604.png',
'http://img535.imageshack.us/img535/381/70208588.png',
'http://img705.imageshack.us/img705/415/15009047.png',
'http://img708.imageshack.us/img708/2309/73731145.png',
'http://img687.imageshack.us/img687/8916/56593358.png',
'http://img831.imageshack.us/img831/528/77150407.png',
'http://img826.imageshack.us/img826/9060/25775031.png',
'http://img857.imageshack.us/img857/1180/95418909.png',
'http://img854.imageshack.us/img854/2781/60021087.png',
'http://img842.imageshack.us/img842/8955/44719169.png',
'http://img688.imageshack.us/img688/96/95072032.png',
'http://img706.imageshack.us/img706/2564/94723158.png',
'http://img269.imageshack.us/img269/7207/93409550.png',
'http://img3.imageshack.us/img3/9631/41593860.png',
'http://img560.imageshack.us/img560/6610/94766817.png',
'http://img818.imageshack.us/img818/5190/74988099.png',
'http://img841.imageshack.us/img841/6908/52156380.png',
'http://img687.imageshack.us/img687/5053/75019009.png',
'http://img715.imageshack.us/img715/1858/11037902.png',
'http://img38.imageshack.us/img38/4705/60919031.png',
'http://img822.imageshack.us/img822/8223/37271118.png',
'http://img844.imageshack.us/img844/1504/22933813.png',
'http://img689.imageshack.us/img689/1395/48825911.png',
'http://img195.imageshack.us/img195/4103/27558141.png',
'http://img33.imageshack.us/img33/7693/82564536.png',
'http://img717.imageshack.us/img717/1338/76078309.png',
'http://img193.imageshack.us/img193/9026/12250128.png',
'http://img811.imageshack.us/img811/4783/54697797.png');


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