// ==UserScript==
// @name          tribalwars Smilies-BB-Codes-List -plapl.com
// @namespace     c1b1.de
// @include       http://ae7.tribalwars.ae/game.php?village=58340&screen=mail&mode=new
// @include       http://ae7.tribalwars.ae/game.php?village=58340&screen=forum&mode=new_thread&screenmode=view_forum&forum_id=32656
// @include       http://ae7.tribalwars.ae/game.php?village=58340&screen=forum&screenmode=view_thread&thread_id=90735&answer=true&page=last

// ==/UserScript==

// {$ dsScript $}
// version = 1.8.1
// author = (c) hamed
// clients = firefox , opera
// areas = .de
// worlds = all
// premium = works
// description[de] = Fügt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies auswählen kann, außerdem die BB-Codes für Berichte.
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.smilies_bb-codes_0.png
// {$ /dsScript $}

/*
TW Smilies-BB-Codes-List

(c) by C1B1SE
         wwwhamed2009@hotmail.com
        
You may change string values if it's necessary for your language area.
Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.
*/

var smilies = new Array(
'http://www.plapl.com/images/img/besmllah.gif',
'http://www.plapl.com/images/smilies/1.gif',
'http://www.plapl.com/images/smilies/2.gif',
'http://www.plapl.com/images/smilies/3.gif',
'http://www.plapl.com/images/smilies/4.gif',
'http://www.plapl.com/images/smilies/5.gif',
'http://www.plapl.com/images/smilies/6.gif',
'http://www.plapl.com/images/smilies/7.gif',
'http://www.plapl.com/images/smilies/8.gif',
'http://www.plapl.com/images/smilies/9.gif',
'http://www.plapl.com/images/smilies/10.gif',
'http://www.plapl.com/images/smilies/11.gif',
'http://www.plapl.com/images/smilies/12.gif',
'http://www.plapl.com/images/smilies/13.gif',
'http://www.plapl.com/images/smilies/14.gif',
'http://www.plapl.com/images/smilies/15.gif',
'http://www.plapl.com/images/smilies/16.gif',
'http://www.plapl.com/images/smilies/17.gif',
'http://www.plapl.com/images/smilies/18.gif',
'http://www.plapl.com/images/smilies/19.gif',
'http://www.plapl.com/images/smilies/20.gif',
'http://www.plapl.com/images/smilies/21.gif',
'http://www.plapl.com/images/smilies/23.gif',
'http://www.plapl.com/images/smilies/24.gif',
'http://www.plapl.com/images/smilies/25.gif',
'http://www.plapl.com/images/smilies/26.gif',
'http://www.plapl.com/images/smilies/27.gif',
'http://www.plapl.com/images/smilies/28.gif',
'http://www.plapl.com/images/smilies/29.gif',
'http://www.plapl.com/images/smilies/30.gif',
'http://www.plapl.com/images/smilies/31.gif',
'http://www.plapl.com/images/smilies/32.gif',
'http://www.plapl.com/images/smilies/33.gif',
'http://www.plapl.com/images/smilies/34.gif',
'http://www.plapl.com/images/smilies/35.gif',
'http://www.plapl.com/images/smilies/36.gif',
'http://www.plapl.com/images/smilies/37.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_biggrin.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_smile.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_wink.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cool.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_razz.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_eek.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_surprised.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_twisted.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_evil.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_confused.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_neutral.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_sad.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cry.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_mrgreen.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em16.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em17.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em18.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em19.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em1500.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2100.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2200.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2300.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2400.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2700.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2700.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2900.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3000.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3300.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3400.gif',
'http://plapl.com/images/icons/icon1.gif',
'http://plapl.com/images/icons/s14.gif',
'http://plapl.com/images/icons/s18.gif',
'http://plapl.com/images/icons/s1.gif',
'http://plapl.com/images/icons/s7.gif',
'http://plapl.com/images/icons/s15.gif',
'http://plapl.com/images/icons/s19.gif',
'http://plapl.com/images/icons/s10.gif',
'http://plapl.com/images/icons/s16.gif',
'http://ae1.tribalwars.ae/graphic/unit/unit_spear.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_sword.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_axe.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_archer.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_spy.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_light.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_marcher.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_heavy.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_ram.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_catapult.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_knight.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_snob.png',
'http://ae1.tribalwars.ae/graphic/buildings/barracks.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/stable.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/main.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/farm.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/garage.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/snob.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/smith.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/place.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/statue.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/market.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/wood.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/stone.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/iron.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/storage.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/wall.png?1',
'http://smilles.m7shsh.com/data/media/18/00db9337ef155724e7660a845faa4d96.gif',
'http://smilles.m7shsh.com/data/media/18/010.gif',
'http://smilles.m7shsh.com/data/media/18/85e442fc844ccce495d530dcae90afd6.gif',
'http://smilles.m7shsh.com/data/media/18/a69a75274604c24dc250db92cdeaa6b9.gif',
'http://smilles.m7shsh.com/data/media/18/e18e0b18f60eec83054c40305e5a1088.gif',
'http://smilles.m7shsh.com/data/media/18/6a26d86970d6bf5a0e8233f7544ef269.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_75.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_76.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_74.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_67.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_65.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_66.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_46.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_97.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_94.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_87.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_86.gif');


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