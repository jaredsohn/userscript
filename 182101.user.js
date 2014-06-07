// ==UserScript==
// @name           FastFM
// @description    Get an icon after every link to a Last.FM Artist page, and click it to quickly embed a player in your browser.
// @version        2.0.1
// @namespace      http://www.w3.org/1999/xhtml
// @exclude        http://www.last.fm/*
// @exclude        http://www.lastfm*
// @author         Vector
// @greetings      Peti :)
// ==/UserScript==


/* ---------- settings ---------- */
// which player to show by default
var fastfm_default = 'playlist'; // (playlist / radio)
// start playing automatically
var fastfm_autostart = true; // (true / false)
// jump to the next track in playlist automatically
var fastfm_autonext = true; // (true / false)
// position of the FastFM box from top in pixels
var fastfm_position_top = '10'; // (integer)
// position of the FastFM box from left in pixels (negative number goes from right to left)
var fastfm_position_left = '-10'; // (integer)


// which links to use to get the artists //todo: array to get more
var fastfm_href = 'http://www.last.fm/music/';
// the flash player
var fastfm_player = 'http://cdn.last.fm/webclient/s12n/s/50/lfmPlayer.swf';
// javascripts for the player
var fastfm_player_allowscriptaccess = 'never'; // never or always
var fastfm_extra_js = [];
//fastfm_extra_js[0] = 'http://cdn.last.fm/javascript/release-lastfm/122710/lib/prototype.js';
//fastfm_extra_js[1] = 'http://cdn.last.fm/javascript/release-lastfm/122710/lib/scriptaculous.js';
//fastfm_extra_js[2] = 'http://cdn.last.fm/javascript/release-lastfm/122710/lib/ufo.js';
//fastfm_extra_js[3] = 'http://cdn.last.fm/javascript/release-lastfm/122710/LFM.js';
//fastfm_extra_js[4] = 'http://cdn.last.fm/javascript/release-lastfm/122710/components.js';
//fastfm_extra_js[5] = 'http://cdn.last.fm/javascript/release-lastfm/122710/flash.js';


// what icon to use after the links
var fastfm_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAYAAAB24g05AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAK7wAACu8BfXaKSAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjMxN4N3hgAAAhBJREFUKFOVkV1Ik2EUx58+CIpkYcvPzXBuhq3M2Oxd75oyolpBFuEKiqjLLrsp8G4Q3UTQTQR5URTp/Ji6l9piM0OLkUxXovtIGXObY6tIQ5mb5ujfed/Qrj3w4znn/M//+eDZ8vt8QzNj7AFxjNhM+Gn4Lsufq88QiPFqTHE1CF4yY+osh7ChBgmjBmlTLZK0inXwymkErSelXPSIXhanItxYja+2O1hbzmI9lqLTmLjeghBpExeakU3MbmjLqSQmqRfjVGCRo1UIXG2RxDmvG8NNDfBZLViMRbEy/xNDeg0SQi9yP77Dc+o4PraeQS6dQvReG0Qv8x+sxMzzdvwpFDBk0OKzthJj1PPduCxtOmZrw6zgwFo+D9/tWxjk6+GtLcNoXQUmtQqwEXUJ4i4BK78W4FGVIEDiODGoKUc2k0bG/wlvzBwWIqGNJ8SdDoxwh+DXlIG9q9qL6c6Xkug8oMCH/XIJt7IYoWf/biaYGiEoivHWqIP/vk2aDT99jPfkZd7yPRi+eU1qhl69QFd1BV7zekTan6BXf5iunsO3wDicvA6dpTJ0mwworK5ipscON3mZZ18R+uW78eXRQ+m09ZgPBeFQK+G1XsRi/P8PiPrSXBIu8wm45EVg3Tu2pwj0yHbCriiF0MSjS6WEnep+2S70ER2U9+mOYIC0ASMn1aJH9LKObVstRIbAJhE9lr9Gg50XnERO4AAAAABJRU5ErkJggg==';
// what stylesheet to use in the icon
var fastfm_icon_style = 'margin: 1px 0 0 2px;'; // (css)
// what settings icon to use
var fastfm_settings_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAL8SURBVHjaYvz//z8DNnDmzJnkP3/+xPz9+5fh9+/fSxwcHOZiUwcQQIzIBly6dEkTqOEpEH8Ban4hJycnCpI/ceLEay4uLgmgGA/QMOmgoKDrMD0AAcSEpHk2UOMVoKKbQEXiQPz358+fDCDMxsb2FyT269evm0B8ZcmSJbNh+gACCGzAxYsXq7m5uVPk5eWZBAUFQTbdBmLxHz9+MHz//p3h379/IANvA+UlgF5hEhERSenp6akG6QUIIBYQATSV6cWLFyC/MIJsFBcX52ZiYgL5HWyLpqYmSJwbJPfw4UOGQ4cO/QcaDrYcIIDgYXDs2LFWfn7+KpCtoID7+PEjw6NHjxhYWVkZFBUVGVhYWMAGfvv2DeTdtrKyMrALAAKIERhAZ4HOFQNibgkJCcGvX78yvH//HmTgcSC7jp2dnQHorSYTExNLkGVArzLs37//PdCwr0A9rwACiAVIGKiqqjK9ffsWbCvIxpcvXzIAvVDX0dGxB2TL7NmzQWK7gRYwgNRZWVkJAr0p2NfXJwUQQEwgZ4H8BjQI7HSQLTw8PAxA78CjF6QGJA8MTLAaYJgxgFwK8g5AALE8efLkAhCIAZ3Jra+vLwgKdWlpaZBNTbNmzQJrBuImSUlJsEZQ4AKj8f2XL1++AsVfAQQQPBDXrl3bClRUBbIJFGAghY8fPwbbKCUlBaZBhoNsBoZB27Rp08CBCBBA4KhYs2ZNLdD0SgEBAbBmYMJhAKY8BmC8MygoKIADDhSYHBwc4BgBhlNlRkZGLUgvQACB0wEwDP4BA4iRk5MTlKgY7t69+xXoAi57e3tGkL+XLVv2n5GR8ZuFhQW3qKgog5CQECMwKv+B9AIEENwLTU1Ns9+9e5cEdOIroAIjXl7ecx4eHqBUCYqFF8D0YQQ07Bww4MSAfp+3bdu2VJA+gACC54W6ujqQgA7Q+epAb7wEKmb+9OkTw+vXr0EuZAbKvQSKq4PUwDSDAEAAMeLKznl5eclAzTGgKAY6fwkwkLFmZ4AAAwDzKLPEVR9s/QAAAABJRU5ErkJggg==';


/* ---------- text ---------- */
var text = [];
text['collapse_expand'] = 'Collapse / Expand the panel.';
text['menu_close'] = 'close';
text['close_the_panel'] = 'Close the panel...';
text['settings_title'] = 'Settings!';
text['settings_alt'] = 'Settings!';
text['menu_playlist'] = 'playlist';
text['menu_radio'] = 'radio';
text['playlist_and_samples'] = ' playlist and samples!';
text['and_similar_artists_radio'] = ' and similar artists radio!';
text['settings'] = 'Settings';
text['default'] = 'Default:';
text['playlist'] = 'Playlist';
text['radio'] = 'Radio';
text['auto_start'] = 'Auto-start:';
text['auto_next'] = 'Auto-next:';
text['position_from_top'] = 'Position from top:';
text['position_from_left_right'] = 'Position from left / right:';
text['apply'] = 'Apply';
text['menu_state_0'] = 'collapse';
text['menu_state_1'] = 'expand';
text['menu_state_2'] = 'collapse';


/* ---------- init ---------- */
// beállítások begyüjtése sütikből
if(_cookie('fastfm_default') != '') fastfm_default = (_cookie('fastfm_default') == 'radio') ? 'radio' : 'playlist';
if(_cookie('fastfm_autostart') != '') fastfm_autostart = (_cookie('fastfm_autostart') == 'true') ? true : false;
if(_cookie('fastfm_autonext') != '') fastfm_autonext = (_cookie('fastfm_autonext') == 'true') ? true : false;
if(_cookie('fastfm_position_top') != '' && !isNaN(_cookie('fastfm_position_top'))) fastfm_position_top = _cookie('fastfm_position_top');
if(_cookie('fastfm_position_left') != '' && !isNaN(_cookie('fastfm_position_left'))) fastfm_position_left = _cookie('fastfm_position_left');

//fastfm_init();//bi
if(window.attachEvent) window.attachEvent('onload', fastfm_init);
else window.addEventListener('load', fastfm_init, false);


/* ---------- functions ---------- */
function fastfm_init()
{
  // ikonok kihelyezése
  var links = document.getElementsByTagName('a');
  var c = 0;
  for(i in links)
  {
    if(links[i].href)
    {
      var artist_link = links[i].href.toLowerCase().indexOf(fastfm_href);
      if(artist_link != -1)
      {
        c++;
        var artist = unescape(unescape(links[i].href.substr(artist_link + fastfm_href.length).split('/')[0]));

        var icon = document.createElement('IMG');
        icon.setAttribute('rel', escape(artist).replace(/</g, '%3C').replace(/>/g, '%3E'));
        icon.setAttribute('title', artist.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\+/g, ' ') + ' @ Last.FM');
        icon.setAttribute('src', fastfm_icon);
        icon.setAttribute('align', 'top');
        icon.style.cssText = fastfm_icon_style;
        icon.setAttribute('style', fastfm_icon_style);

        if(icon.attachEvent) icon.attachEvent('onclick', fastfm_pop);
        else icon.addEventListener('click', fastfm_pop, false);

        var next = links[i];
        do next = next.nextSibling;
        while (next && next.nodeType != 1 && next.nodeType != 3);

        links[i].setAttribute('target', '_blank');
        links[i].parentNode.insertBefore(icon, next);
      }
    }
  }

  if(c > 0) // vannak linkek
  {
    // külső javascriptek behívása
    for(var i in fastfm_extra_js) add_js(fastfm_extra_js[i]);

    var fastfm_box_style = 'width: 300px; height: 232px; margin: 0; padding: 0; position: fixed; right: 10px; top: 10px; z-index: 271; display: none; color: gray; letter-spacing: 5px; font-face: Georgia, serif; font-size: 8px; font-weight: 900; text-transform: uppercase; overflow: hidden;';

    fastfm_box_style += ' top: ' + fastfm_position_top + 'px;';
    fastfm_box_style += (fastfm_position_left < 0) ? ' right: ' + Math.abs(fastfm_position_left) + 'px;' : ' left: ' + fastfm_position_left + 'px;';

    var fastfm_box = document.createElement('DIV');

    fastfm_box.setAttribute('id', 'fastfm_box');

    fastfm_box.style.cssText = fastfm_box_style;
    fastfm_box.setAttribute('style', fastfm_box_style);

    document.body.insertBefore(fastfm_box, null);
  }
}

function fastfm_pop(event)
{
  var elem = event.srcElement || event.currentTarget;
  var artist = unescape(elem.getAttribute('rel'));

  if(fastfm_default == 'radio') fastfm_playlist(artist, true);
  else fastfm_playlist(artist, false);
}

function fastfm_playlist(artist, radio)
{
  var fastfm_box = document.getElementById('fastfm_box');
  fastfm_box.style.display = '';
  var autostart = (fastfm_autostart) ? '&autostart=true' : '';
  var autonext = (fastfm_autonext) ? '' : '&FOD=true';

  if(radio) var mode = '&lfmMode=radio&url=lastfm://artist/' + escape(artist) + '/similarartists';
  else var mode = '&lfmMode=playlist';

  var flashvars = 'lang=en' + mode + '&resname=' + escape(artist) + '&restype=artist' + autostart + autonext;

  var fastfm_player_box = document.getElementById('fastfm_player');
  if(!fastfm_player_box)
  {
    fastfm_box.innerHTML = ''
      + '<div style="clear: both; height: 10px;">'
      +   '<div style="width: 100px; text-align: left; float: left;">'
      +     '<span onmouseover="this.style.color=\'lightgray\';" onmouseout="this.style.color=\'gray\';" style="cursor: pointer;" id="fastfm_mode" title="">&nbsp;</span>'
      +   '</div>'
      +   '<div style="width: 100px; text-align: center; float: left;">'
      +     '<span onmouseover="this.style.color=\'lightgray\';" onmouseout="this.style.color=\'gray\';" style="cursor: pointer;" id="fastfm_state" title="' + text['collapse_expand'] + '">&nbsp;</span>'
      +   '</div>'
      +   '<div style="width: 100px; text-align: right; float: left;">'
      +     '<span onmouseover="this.style.color=\'lightgray\';" onmouseout="this.style.color=\'gray\';" style="cursor: pointer;" id="fastfm_close" onclick="document.getElementById(\'fastfm_box\').style.display=\'none\';" title="' + text['close_the_panel'] + '">' + text['menu_close'] + '</span>'
      +   '</div>'
      + '</div>'
      + '<div id="fastfm_player" style="clear: both; overflow: hidden;">'
      + '</div>'// ' + flashvars + '
      + '<div id="fastfm_settings_button" style="width: 20px; height: 16px; margin: 64px 0pt 0pt; padding: 0pt 0pt 0px 4px; position: relative; z-index: 314; top: -83px; cursor: pointer;">'
      +   '<img style="margin: 0; padding: 0;" alt="' + text['settings_alt'] + '" src="' + fastfm_settings_icon + '" title="' + text['settings_title'] + '" />'
      + '</div>'
      + '<div id="fastfm_settings_panel" style="display: none; height: 145px; position: relative; top: -240px; border: 4px solid #3a3a3a; background-color: #101010; letter-spacing: normal; font-size: 10px; font-weight: normal; text-transform: none; word-spacing: 3px; padding: 0 5px 5px 10px;">'
      + '</div>';

    var state_button = document.getElementById('fastfm_state');
    if(state_button.attachEvent) state_button.attachEvent('onclick', fastfm_state);
    else state_button.addEventListener('click', fastfm_state, false);

    fastfm_player_box = document.getElementById('fastfm_player');

    var fastfm_settings_button = document.getElementById('fastfm_settings_button');
    if(fastfm_settings_button.attachEvent) fastfm_settings_button.attachEvent('onclick', function () { document.getElementById('fastfm_settings_panel').style.display = (document.getElementById('fastfm_settings_panel').style.display == '') ? 'none' : ''; });
    else fastfm_settings_button.addEventListener('click', function () { document.getElementById('fastfm_settings_panel').style.display = (document.getElementById('fastfm_settings_panel').style.display == '') ? 'none' : ''; }, false);
  }
  fastfm_player_box.innerHTML = '<embed id="lfmPlayer" width="300" height="220" align="middle" swliveconnect="true" name="lfmPlayer" allowfullscreen="false" allowscriptaccess="' + fastfm_player_allowscriptaccess + '" flashvars="' + flashvars + '" bgcolor="#88a" wmode="transparent" quality="high" menu="false" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + fastfm_player + '" type="application/x-shockwave-flash" />';

  var mode_button = document.getElementById('fastfm_mode');
  if(radio)
  {
    mode = false;
    mode_button.innerHTML = text['playlist'];
    mode_button.setAttribute('title', artist.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\+/g, ' ') + text['playlist_and_samples']);
  }
  else
  {
    mode = true;
    mode_button.innerHTML = text['radio'];
    mode_button.setAttribute('title', artist.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\+/g, ' ') + text['and_similar_artists_radio']);
  }
  if(mode_button.attachEvent) mode_button.attachEvent('onclick', function () { fastfm_playlist(artist, mode); });
  else mode_button.addEventListener('click', function () { fastfm_playlist(artist, mode); }, false);

  fastfm_settings(false);
  fastfm_state(false);
}

function fastfm_settings(load)
{
  if(load == false)
  {
    fastfm_default = (_cookie('fastfm_default') == 'radio') ? 'radio' : 'playlist';
    fastfm_autostart = (_cookie('fastfm_autostart') == 'true') ? true : (_cookie('fastfm_autostart') == 'false') ? false : fastfm_autostart;
    fastfm_autonext = (_cookie('fastfm_autonext') == 'true') ? true : (_cookie('fastfm_autonext') == 'false') ? false : fastfm_autonext;
    fastfm_position_top = (_cookie('fastfm_position_top') == '' || isNaN(_cookie('fastfm_position_top'))) ? fastfm_position_top : _cookie('fastfm_position_top');
    fastfm_position_left = (_cookie('fastfm_position_left') == '' || isNaN(_cookie('fastfm_position_left'))) ? fastfm_position_left : _cookie('fastfm_position_left');
  }
  else
  {
    fastfm_default = (document.getElementById('fastfm_default_radio').checked == true) ? 'radio' : 'playlist';
    fastfm_autostart = (document.getElementById('fastfm_autostart').checked == true) ? true : false;
    fastfm_autonext = (document.getElementById('fastfm_autonext').checked == true) ? true : false;
    fastfm_position_top = (isNaN(document.getElementById('fastfm_position_top').value)) ? fastfm_position_top : document.getElementById('fastfm_position_top').value;
    fastfm_position_left = (isNaN(document.getElementById('fastfm_position_left').value)) ? fastfm_position_left : document.getElementById('fastfm_position_left').value;

    set_cookie('fastfm_default', fastfm_default);
    set_cookie('fastfm_autostart', fastfm_autostart);
    set_cookie('fastfm_autonext', fastfm_autonext);
    set_cookie('fastfm_position_top', fastfm_position_top);
    set_cookie('fastfm_position_left', fastfm_position_left);

    var fastfm_box = document.getElementById('fastfm_box');
    fastfm_box.style.top = fastfm_position_top + 'px';
    if(fastfm_position_left < 0)
    {
      fastfm_box.style.right = Math.abs(fastfm_position_left) + 'px';
      fastfm_box.style.left = 'auto';
    }
    else
    {
      fastfm_box.style.left = fastfm_position_left + 'px';
      fastfm_box.style.right = 'auto';
    }
  }

  var fastfm_default_radio_check = (fastfm_default == 'radio') ? ' checked="checked"' : '';
  var fastfm_default_playlist_check = (fastfm_default == 'playlist') ? ' checked="checked"' : '';
  var fastfm_autostart_check = (fastfm_autostart == true) ? ' checked="checked"' : '';
  var fastfm_autonext_check = (fastfm_autonext == true) ? ' checked="checked"' : '';
  var fastfm_position_top_num = fastfm_position_top;
  var fastfm_position_left_num = fastfm_position_left;

  var fastfm_settings_panel = document.getElementById('fastfm_settings_panel');
  fastfm_settings_panel.innerHTML = '<strong style="line-height: 22px">' + text['settings'] + ' @ ' + document.location.host + '</strong><br/>'
    +   text['default'] + ' <input id="fastfm_default_playlist" style="border: 1px solid #1a1a1a; margin: 3px 0 0 0;" type="radio" name="fastfm_default" value="playlist"' + fastfm_default_playlist_check + '/> ' + text['playlist'] + ' <input id="fastfm_default_radio" style="border: 1px solid #1a1a1a; margin: 3px 0 0 10px;" type="radio" name="fastfm_default" value="radio"' + fastfm_default_radio_check + '/> ' + text['radio'] + '<br/>'
    +   text['auto_start'] + ' <input id="fastfm_autostart" style="border: 1px solid #1a1a1a; margin: 2px 0 1px 0;" type="checkbox" name="fastfm_autostart" value="true"' + fastfm_autostart_check + '/><br/>'
    +   text['auto_next'] + ' <input id="fastfm_autonext" style="border: 1px solid #1a1a1a; margin: 2px 0 1px 0;" type="checkbox" name="fastfm_autonext" value="true"' + fastfm_autonext_check + '/><br/>'
    +   text['position_from_top'] + ' <input id="fastfm_position_top" style="border: 1px solid #1a1a1a; width: 40px; margin: 0 0 2px 2px; padding: 0;" type="text" name="fastfm_position_top" value="' + fastfm_position_top_num + '" maxlength="5"/>px<br/>'
    +   text['position_from_left_right'] + ' <input id="fastfm_position_left" style="border: 1px solid #1a1a1a; width: 40px; margin: 0 0 2px 2px; padding: 0;" type="text" name="fastfm_position_left" value="' + fastfm_position_left_num + '" maxlength="5"/>px<br/>'
    +   '<input id="fastfm_settings_ok" style="height: 18px; margin: 8px 0 0 0;" type="button" name="fastfm_settings_ok" value="' + text['apply'] + '"/>';

  var fastfm_settings_ok = document.getElementById('fastfm_settings_ok');
  if(fastfm_settings_ok.attachEvent) fastfm_settings_ok.attachEvent('onclick', fastfm_settings);
  else fastfm_settings_ok.addEventListener('click', fastfm_settings, false);
}

function fastfm_state(event)
{
  var state_button = document.getElementById('fastfm_state');
  var fastfm_player = document.getElementById('fastfm_player');
  var fastfm_settings_button = document.getElementById('fastfm_settings_button');
  var fastfm_box = document.getElementById('fastfm_box');
  //var fastfm_settings_panel = document.getElementById('fastfm_settings_panel');

  if(event == false)
  {
    var state = _cookie('fastfm_state');
    if(state == '0') state = 0;
    else if(state == '1') state = 1;
    else state = 2;
  }
  else
  {
    var state = fastfm_player.style.height;
    if(state == '1px') state = 2;
    else if(state == '64px') state = 1;
    else state = 0;
  }

  switch(state)
  {
    case 0:
      fastfm_player.style.height = '64px';
      fastfm_box.style.height = '74px';
      state_button.innerHTML = text['menu_state_0'];
      fastfm_settings_button.style.display = 'none';
      //fastfm_settings_panel.style.display = 'none';
      set_cookie('fastfm_state', '0');
      break;
    case 1:
      fastfm_player.style.height = '1px';
      fastfm_box.style.height = '10px';
      state_button.innerHTML = text['menu_state_1'];
      fastfm_settings_button.style.display = 'none';
      //fastfm_settings_panel.style.display = 'none';
      set_cookie('fastfm_state', '1');
      break;
    default:
      fastfm_player.style.height = '222px';
      fastfm_box.style.height = '232px';
      state_button.innerHTML = text['menu_state_2'];
      fastfm_settings_button.style.display = '';
      //fastfm_settings_panel.style.display = '';
      set_cookie('fastfm_state', '2');
  }
}

/* adott süti kinyerése */
function _cookie(name)
{
  var cookie_place = document.cookie.indexOf(name + '=');

  if(cookie_place != -1)
  {
    return document.cookie.substr(cookie_place + name.length + 1).split('; ')[0];
  }
  else
  {
    return '';
  }
}

/* süti beállítás / törlés */
function set_cookie(name, val, del)
{
  if(del) del = 'Thu, 01-Jan-1970 00:00:01 GMT';
  else del = 'Mon, 22 Aug 2087 03:14:15 GMT';

  document.cookie = name + '=' + val + '; expires=' + del + '; path=/';
}


/* javascript hozzáadása */
function add_js(src)
{
  var script = document.createElement('SCRIPT');

  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', src);

  document.getElementsByTagName('head')[0].appendChild(script);
}


/* " Magányra ítélt, Nagy darabok
     Vagyunk de én, Igent mondok
     Mert szép próbálkozás az élővilág... " */