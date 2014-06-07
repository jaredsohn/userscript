// ==UserScript==
// @name        Gtsmile
// @namespace   SmileyGtPlus Fr
// @description Insertion de Smiley
// @version     1.2
// @author      Traduit par Deathange
// @include     http://*.guerretribale.fr/*game.php*&screen=mail&mode=*
// @include		http://*.guerretribale.fr/*game.php*&screen=mail&mode=view&view=*&group_id=*
// @include		http://*.guerretribale.fr/*game.php*&screen=forum&screenmode=view_thread*
// @include		http://*.guerretribale.fr/*game.php*&screen=forum*
// ==/UserScript==


var smilies = new Array(
/*Smiley de base type BB forum */
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
/* Smiley supplémentaire selon vos goûts. Rajout de smiley possible selon le schema :
 'Url Img', */
'http://img3.imagebanana.com/img/5lkccrs7/Markt.gif',
'http://forum.tribalwars.net/tribalwars_v2/statusicon/forum_new.gif');

/* Clef Icone */
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

if(document.getElementById('message'))
  {
  // Conteneur smiley
  var table = document.createElement('table');
  table.setAttribute('id','bb_smilies');
  table.setAttribute('style','display:none; clear:both; position:absolute top: 1em; left: 1%; width: 18%; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 14px; left: 100px; ');

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

  // Smiley
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

/* Permet l'insertion dans les champs textes */
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