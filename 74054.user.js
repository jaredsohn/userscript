{\rtf1\ansi\ansicpg1252\cocoartf949\cocoasubrtf460
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name          DS Smilies-BB-Codes-List\
// @version       2.3\
// @author        Samuel Essig (http://c1b1.de)\
// @description   F\'c3\'bcgt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies und Icons ausw\'c3\'a4hlen kann, au\'c3\'9ferdem die BB-Codes f\'c3\'bcr Berichte und Code. Seit Version 2 k\'c3\'b6nnen Texte gespeicherter werden.\
// @namespace     c1b1.de\
// @homepage      http://c1b1.de\
// @copyright     2009, Samuel Essig (http://c1b1.de)\
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode\
\
// @include       http://*.die-staemme.de/*forum.php*answer=true*\
// @include       http://*.die-staemme.de/*forum.php*edit_post_id*\
// @include       http://*.die-staemme.de/*forum.php*mode=new_thread*\
// @include       http://*.die-staemme.de/*forum.php*mode=new_poll*\
\
// @include       http://*.die-staemme.de/*screen=memo*\
\
// @include       http://*.die-staemme.de/*screen=mail*mode=new*\
// @include       http://*.die-staemme.de/*screen=mail*mode=view*\
\
// @include       http://*.die-staemme.de/*screen=ally*mode=overview*\
// @include       http://*.die-staemme.de/*screen=ally*mode=properties*\
\
\
\
\
// @include       http://*.tribalwars.net/*forum.php*answer=true*\
// @include       http://*.tribalwars.net/*forum.php*edit_post_id*\
// @include       http://*.tribalwars.net/*forum.php*mode=new_thread*\
// @include       http://*.tribalwars.net/*forum.php*mode=new_poll*\
\
// @include       http://*.tribalwars.net/*screen=memo*\
\
// @include       http://*.tribalwars.net/*screen=mail*mode=new*\
// @include       http://*.tribalwars.net/*screen=mail*mode=view*\
\
// @include       http://*.tribalwars.net/*screen=ally*mode=overview*\
// @include       http://*.tribalwars.net/*screen=ally*mode=properties*\
\
\
\
\
\
// @include       http://*.tribalwars.nl/*forum.php*answer=true*\
// @include       http://*.tribalwars.nl/*forum.php*edit_post_id*\
// @include       http://*.tribalwars.nl/*forum.php*mode=new_thread*\
// @include       http://*.tribalwars.nl/*forum.php*mode=new_poll*\
\
// @include       http://*.tribalwars.nl/*screen=memo*\
\
// @include       http://*.tribalwars.nl/*screen=mail*mode=new*\
// @include       http://*.tribalwars.nl/*screen=mail*mode=view*\
\
// @include       http://*.tribalwars.nl/*screen=ally*mode=overview*\
// @include       http://*.tribalwars.nl/*screen=ally*mode=properties*\
\
\
\
\
\
// @include       http://*.staemme.ch/*forum.php*answer=true*\
// @include       http://*.staemme.ch/*forum.php*edit_post_id*\
// @include       http://*.staemme.ch/*forum.php*mode=new_thread*\
// @include       http://*.staemme.ch/*forum.php*mode=new_poll*\
\
// @include       http://*.staemme.ch/*screen=memo*\
\
// @include       http://*.staemme.ch/*screen=mail*mode=new*\
// @include       http://*.staemme.ch/*screen=mail*mode=view*\
\
// @include       http://*.staemme.ch/*screen=ally*mode=overview*\
// @include       http://*.staemme.ch/*screen=ally*mode=properties*\
\
\
\
\
\
// @exclude       http://forum.die-staemme.de/*\
// ==/UserScript==\
\
/*\
\
\
*/\
const ver = '2.3';\
\
const lang = \{\
\
\
  'de' : \{\
\
'buildings' : 'Geb\'c3\'a4ude',\
'units' : 'Einheiten',\
'bigunits' : 'Einheiten (gro\'c3\'9f)',\
'villages' : 'D\'c3\'b6rfer',\
'ressources' : 'Ressourcen',\
'points' : 'Punkte',\
'arrows' : 'Pfeile',\
'messages' : 'Nachrichten',\
'leaders' : 'F\'c3\'bchrung',\
'others' : 'Andere',\
'report_url' : 'Gib die URL zum Bericht an:',\
'linkreport' : 'Bericht verlinken',\
'directreport' : 'Bericht direkt anzeigen',\
'convertcoords' : 'Koordinaten in BB-Codes umwandeln',\
'search' : 'Suchen . . . ',\
'searchterm' : 'Suchbegriff',\
'noresults' : 'Kein Treffer :(',\
'personaltexts' : 'Pers\'c3\'b6nliche Texte',\
'noentries' : 'Bisher keine Eintr\'c3\'a4ge',\
'editentry' : 'Bearbeiten',\
'editpersonalentries' : 'Pers\'c3\'b6nliche Texte bearbeiten',\
'del' : 'L\'c3\'b6schen',\
'confirm_delete' : 'Soll dieser Eintrag wirklich gel\'c3\'b6scht werden?',\
'newentry' : 'Neu',\
'close' : 'Schlie\'c3\'9fen',\
'editpersonaltext' : 'Pers\'c3\'b6nlichen Text bearbeiten',\
'newpersonaltext' : 'Neuer pers\'c3\'b6nlicher Text',\
'title' : 'Titel:',\
'text' : 'Text:',\
'ok' : 'OK',\
'cancel' : 'Abbrechen'\
\
    \},\
\
\
  'nl' : \{\
\
'buildings' : 'Buildings',\
'units' : 'Units',\
'bigunits' : 'Units (big)',\
'villages' : 'Villages',\
'ressources' : 'Ressources',\
'points' : 'Points',\
'arrows' : 'Arrows',\
'messages' : 'Mail',\
'leaders' : 'Duke',\
'others' : 'Others',\
'report_url' : 'Please type in the URL of the publicized report:',\
'linkreport' : 'Link report',\
'directreport' : 'Direct link report',\
'convertcoords' : 'Convert co-ordinates to BB-Codes',\
'search' : 'Search . . . ',\
'searchterm' : 'Search for: ',\
'noresults' : 'No results :(',\
'personaltexts' : 'Personal texts',\
'noentries' : 'Currently no entries',\
'editentry' : 'Edit',\
'editpersonalentries' : 'Edit personal texts',\
'del' : 'Delete',\
'confirm_delete' : 'Do you really want to delete this text?',\
'newentry' : 'New',\
'close' : 'Close',\
'editpersonaltext' : 'Edit personal text',\
'newpersonaltext' : 'New personal text',\
'title' : 'Title:',\
'text' : 'Text:',\
'ok' : 'OK',\
'cancel' : 'Cancel'\
\
  \},\
\
\
  'en' : \{\
\
'buildings' : 'Buildings',\
'units' : 'Units',\
'bigunits' : 'Units (big)',\
'villages' : 'Villages',\
'ressources' : 'Ressources',\
'points' : 'Points',\
'arrows' : 'Arrows',\
'messages' : 'Mail',\
'leaders' : 'Duke',\
'others' : 'Others',\
'report_url' : 'Please type in the URL of the publicized report:',\
'linkreport' : 'Link report',\
'directreport' : 'Direct link report',\
'convertcoords' : 'Convert co-ordinates to BB-Codes',\
'search' : 'Search . . . ',\
'searchterm' : 'Search for: ',\
'noresults' : 'No results :(',\
'personaltexts' : 'Personal texts',\
'noentries' : 'Currently no entries',\
'editentry' : 'Edit',\
'editpersonalentries' : 'Edit personal texts',\
'del' : 'Delete',\
'confirm_delete' : 'Do you really want to delete this text?',\
'newentry' : 'New',\
'close' : 'Close',\
'editpersonaltext' : 'Edit personal text',\
'newpersonaltext' : 'New personal text',\
'title' : 'Title:',\
'text' : 'Text:',\
'ok' : 'OK',\
'cancel' : 'Cancel'\
\
  \},\
\
\};\
\
\
const url = document.location.href;\
\
var l_matched = url.match(/\\/\\/(\\D\{2\})\\d+\\./)[1];\
const languagecode = l_matched?l_matched:'en';\
\
\
const say = lang[languagecode];\
\
\
var smilies = new Array(\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_biggrin.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_smile.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_wink.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cool.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_razz.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_eek.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_surprised.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_twisted.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_evil.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_confused.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_neutral.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_sad.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cry.gif',\
'http://forum.die-staemme.de/images/phpbb_smilies/icon_mrgreen.gif',\
'\\n',\
'http://www.faszination-aegypten.de/forum/images/smilies/Spam0.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/2/32.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/2/40.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/2/37.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/2/36.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/8.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/2/31.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/4.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/22.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/20.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/27.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/23.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/2/34.gif',\
'http://www.mysmilie.de/english/green/smilies/ugly/17.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em16.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em17.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em18.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em19.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em1500.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em2100.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em2200.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em2300.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em2400.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em2700.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em2700.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em2900.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em3000.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em3300.gif',\
'http://twbbcodes.pytalhost.com/images/smileys/em3400.gif');\
\
var ds_icons = new Array(\
\
new Array(\
say.buildings,\
'graphic/buildings/main.png',\
'graphic/buildings/barracks.png',\
'graphic/buildings/stable.png',\
'graphic/buildings/garage.png',\
'graphic/buildings/snob.png',\
'graphic/buildings/smith.png',\
'graphic/buildings/place.png',\
'graphic/buildings/statue.png',\
'graphic/buildings/church.png',\
'graphic/buildings/market.png',\
'graphic/buildings/wood.png',\
'graphic/buildings/stone.png',\
'graphic/buildings/iron.png',\
'graphic/buildings/farm.png',\
'graphic/buildings/storage.png',\
'graphic/buildings/hide.png',\
'graphic/buildings/wall.png'\
),\
\
new Array(\
say.units,\
'graphic/unit/unit_archer.png',\
'graphic/unit/unit_axe.png',\
'graphic/unit/unit_catapult.png',\
'graphic/unit/unit_heavy.png',\
'graphic/unit/unit_knight.png',\
'graphic/unit/unit_light.png',\
'graphic/unit/unit_marcher.png',\
'graphic/unit/unit_priest.png',\
'graphic/unit/unit_ram.png',\
'graphic/unit/unit_snob.png',\
'graphic/unit/unit_spear.png',\
'graphic/unit/unit_spy.png',\
'graphic/unit/unit_sword.png'\
),\
\
new Array(\
say.bigunits,\
'graphic/unit_big/archer.png',\
'graphic/unit_big/axe.png',\
'graphic/unit_big/catapult.png',\
'graphic/unit_big/heavy.png',\
'graphic/unit_big/knight.png',\
'graphic/unit_big/light.png',\
'graphic/unit_big/marcher.png',\
'graphic/unit_big/ram.png',\
'graphic/unit_big/snob.png',\
'graphic/unit_big/spear.png',\
'graphic/unit_big/spy.png',\
'graphic/unit_big/sword.png'\
),\
\
\
new Array(\
say.villages,\
'graphic/map/b1.png',\
'graphic/map/b1_left.png',\
'graphic/map/b2.png',\
'graphic/map/b2_left.png',\
'graphic/map/b3.png',\
'graphic/map/b3_left.png',\
'graphic/map/b4.png',\
'graphic/map/b4_left.png',\
'graphic/map/b5.png',\
'graphic/map/b5_left.png',\
'graphic/map/b6.png',\
'graphic/map/b6_left.png'\
),\
\
new Array(\
say.ressources,\
'graphic/eisen.png',\
'graphic/holz.png',\
'graphic/lehm.png',\
'graphic/res.png'\
),\
\
new Array(\
say.points,\
'graphic/dots/blue.png',\
'graphic/dots/brown.png',\
'graphic/dots/green.png',\
'graphic/dots/grey.png',\
'graphic/dots/red.png',\
'graphic/dots/yellow.png'\
),\
\
new Array(\
say.arrows,\
'graphic/forwarded.png',\
'graphic/group_jump.png',\
'graphic/group_left.png',\
'graphic/group_right.png',\
'graphic/links2.png',\
'graphic/rechts2.png',\
'graphic/links.png',\
'graphic/rechts.png',\
'graphic/oben.png',\
'graphic/unten.png',\
'graphic/pfeil.png',\
'graphic/villages.png',\
'graphic/overview/up.png',\
'graphic/overview/down.png',\
'graphic/map/map_ne.png',\
'graphic/map/map_nw.png',\
'graphic/map/map_se.png',\
'graphic/map/map_sw.png'\
),\
\
new Array(\
say.messages,\
'graphic/answered_mail.png',\
'graphic/deleted_mail.png',\
'graphic/new_mail.png',\
'graphic/read_mail.png'\
),\
\
new Array(\
say.leaders,\
'graphic/ally_rights/diplomacy.png',\
'graphic/ally_rights/forum_mod.png',\
'graphic/ally_rights/found.png',\
'graphic/ally_rights/internal_forum.png',\
'graphic/ally_rights/invite.png',\
'graphic/ally_rights/lead.png',\
'graphic/ally_rights/mass_mail.png'\
),\
\
new Array(\
say.others,\
'graphic/ally_forum.png',\
'graphic/face.png',\
'graphic/gold.png',\
'graphic/klee.png',\
'graphic/rabe.png',\
'graphic/rename.png',\
'graphic/command/attack.png',\
'graphic/command/back.png',\
'graphic/command/cancel.png',\
'graphic/command/return.png',\
'graphic/command/support.png',\
'graphic/unit/def.png',\
'graphic/unit/def_archer.png',\
'graphic/unit/def_cav.png',\
'graphic/unit/speed.png',\
'graphic/unit/att.png',\
'graphic/forum/forum_admin_unread.png',\
'graphic/forum/thread_close.png',\
'graphic/forum/thread_closed_unread.png',\
'graphic/forum/thread_delete.png',\
'graphic/forum/thread_open.png',\
'graphic/forum/thread_unread.png'\
)\
\
);\
\
\
var icon_smilies = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACoFBM\\\
VEUAAACvsrfb0bHNwJS5ur7Zz7DJvJSusrbe1LStsbbKvJG4sAuyqgrVzK7c0rKvpwrQxJ7IuI/TyKKU\\\
jQfDs411bwns4Rm0rArf0xK0rAu3rwvNwZvFvA66si7e1J706Rje1LDRyJ7VzBHKwA7c0RTYzqC7snmz\\\
qgv79Brb0q779yva0Jnb0RHw6l9sZwmwqA3CuRCYkBfb0bDe1bDs53Lt5nP26xf78xweHQW2rXTXzRGn\\\
oA0ZGASRigyxqBCooAiRiiLNxJzc07Lw6lz68xv16Rbu4hXUyRMKCgOlng3SyRGbkwze1KyEfgm4sAys\\\
sLXf1a6im1359TTWzJ3y6y6fmA/r4BTm2xSnnhAjIgWyqg7OxQ+jmw0gHgWVjgu2rgyelQbd0hWBew7V\\\
yovr3xTn3BPJvxCSiw26sV/LwA67sg7k3Jr49DP89BqwqAqlnQeBexjy5xbMwYLZzhKwpxCclA/WzBHS\\\
yBHOxA/KwQ7GvA7Btw28tAzj2pqupwv17DKFfwiBexDJvxbJvIgKCQKspA+FfwzQxhDMww7Jvw7FvA3B\\\
uA28swzp3RSxqAppYwmHgAeFfRyimiTMv5HOwZfKu5K3rTCKhAy9tA7Hvg3DuQ3Atw28sw2zqgqYjwh0\\\
bgqXkAaPhzbGvRmzqVa1rAqblAqPiQ2/tg6+tgy6sguzrAq1rBGjmguTjAmJgQ2roWrGuYaclCOIggl/\\\
eQuhmgqvpgqRiQlybAuOiAuJgjHFuIu4rHOUjB2mnQmakgt4cgl1cAp9dgtzbQp2cAmWjwiTjAiHfyK5\\\
rn+7r3mSii6Rig+YkQaXjweVjQiUjQaTjAeIgRKRijy8sIGMhDLGuo24rXeimVGTizeNhS6TiziimVW3\\\
rHrIu5CGgAqupwy1rQpMLoSeAAAAAXRSTlMAQObYZgAAAWlJREFUeF5VzFOzK1EQgNG9xzOxk2Pbtm3b\\\
tm1b17Zt27b9V85k8nLzvXTXqq4GACP/C0JIYgBAAY7ohQswAHGKK8nE0dqe23AaQISdZsPOo0qrCeM6\\\
cyFFIakcpnln+Jouqy0sbTfaeFAId+np5WBXXhHr5Obiynf3F+qwsanZJ8TvVEBgUDAvNCxci3hEZFR0\\\
THZcfELiVHKKSJaOsyjNzGrPyc3LLygsKi4pFZV9krIorlRWVatrao3qG/78/dfS2iYmATTs6Ozq7unt\\\
6x8YHDIYUYyNG0IAicmD0zOzc/MLi0s8zcrq2gaCRWbTVqNt23fs3LWbp9mzd9/+AwzJInro8JGjx46f\\\
MDipOq04c/YcQ2vx/AX+xUuXVfwrV69dl924qUP01u07d+/df/Dw0eMnT5+hDOQQff7i5avXb96+e//h\\\
I4pqfxKb2T5/+frt+4+fv36zO8GiXLJFL4kcAwCjSb1oDKwDMvtwyB3q78QAAAAASUVORK5CYII=';\
\
var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL\\\
e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ\\\
REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF\\\
EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E\\\
rkJggg==';\
\
var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n\\\
mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf\\\
mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf\\\
ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS\\\
TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM\\\
NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a\\\
zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E\\\
rkJggg==';\
\
var icon_code = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkYLjfIjVsA\\\
AAKeSURBVDjLnZRLSFRhFMd/3zejTir2cqNYZDkKPibMR20isVJa9bAWCe0q2rSQamPhIre5L4g2QZsWhVFmiESJoab5GEYszUc6YabkjPNq5t6vxXWuDs5YeeAP3+N//t+5555zBED7\\\
m07lCwb5HxMIc61QpNls1NZUC/GstU3lZwewWiRSCrZiuq6IaDqzSzuQAFaLNC/i4deyl67uQUKhMLqu8PuDdHUPsuILoOuKqMZKIGgISik2RXtHNzcaW0hJSUJKwYfeYa5ebza/Kgql\\\
lCH4N+vpc1JRVrS2/+jEUWLHZkuJzasQ/ybY2++ksqx43QMjHC4vicv9q+DUtJv5H0tUlhuCXq+P0bFJDlcUx//7z1rbVOGeUMzhpct3cI19BUCLaASCIdLTU40S0XV8/iBpqTaENOLp\\\
f/8EAOdMMlaA3yFPjGDd6aNULTkAePr8Ldsz0jh18ggArzt68Hh81J0+ZvLX/DMNQS0SiRGsra4w148ev6T+/AkunKkC4MWrLo4fK6P+/AmTE/UXYjWHmqbFxeSUm5+Lyxw6aEfTNDxe\\\
H6Ofpyl15MXlC4QRYSQcipvgvk8udu/KICdrJ5FwiP5PLgAK83MS+liNvtTMg4bbD8z15Mw8kYjGrab7AMy6F7FaLTQ2PzRKREpamq/E9PSGsrFYpAn390Wys3abd7NzC+RkZ8Zw1ptS\\\
qxGut3t3jRe/zS3wrttJ082LHMjNxuP1c/JcIw3XzlJZVpCwbhMWdv/QONszUtm/LwuAwZEJpBQ4inITi23WegNDXygtyUMIY6QNDI9TWLAXmy05oaCZQ4VlAwaGJig9aI/dO+xxuVGY\\\
rZcpXCQlSaTFsrUBq2mEwzr+lFJjjre/6VQrgSBiawMbpSB9m43amuqkP9SuNod5SVyuAAAAAElFTkSuQmCC';\
\
var icon_icons = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkaKOydSuwA\\\
AAMgSURBVDjLnZRPaBxlGMZ/839md5P9Y3Y3TTZry9pNtJVqD4b2EDWH1JMnteCpXgpBBO2hooeCBW+CJ/UiVFDw4CEQClsVzCUWqlbBGpVgUvxTaNxm081kd2Z35pvxMO402yyCeU/D\\\
937P8z3zvs/7SgALi7UwJOT/hIQUf4eEJE2TU3OzirSwWAurYw6qIiPLEvuJIAjxRcBfjQwqgKrIcWKvFJ0w6ACgqAaB6A4kVRWZHceNCAcpO/7cZbJTZYRrs3njx+jQ/Qnf6/DL1Q8H\\\
koZhiDwoMfPaZazcNsK16drbWIUpAMxciaNTVc6+/PbgukpSpHB3vHi+Rv7403hff8x0/k8SBy0sEzbqw+juXbZEFsdp4PhJLLW1h7RP4cmzy/zhjDG5/hmPlZKMFrMcO1KlWjnIo1MV\\\
XjhdBiBhWpx//cJAlXKvGUEQYv9+g+bKAoaukc0Mc/ihKhMHyhQeSDOSL5LPZRgvejhdGVVP8+ZbH8XYXkNVgG5nGwBtaILnj9xFsXQeHC9SKpVI6QZWIo9xu8746G2efOJvbm342G0H\\\
4fsxNoqRSKHw/SjZFHzzm42m6qSSSVK6QS6bjq837Xs1Mw2d764vx1jh+0jSvwqFEACIts3E2BjPzu5waGKD8uF1tFwJgIcbdb692qC+2WI83+C9S9+zG9ubHhXA9yLjaumoR7bd5dUL\\\
Na4srQGQHjIBePfiU2w1nZjskclKjI0NHjFHr2QmhzGNFvWtJG+8Mg3AlaU1mrbbBzo3/wwrq00kORljezPd58OECyThy+UmS9c0DlVmmK/MANBuOTjOHdyO4NbNLSR5CNMw7puU+3z4\\\
6cWjAHS9Do7r0m45MZkf3FNyp5vEEwHTJ078t7EBDowWMNSAhCHT2kUqRNB3T1Nk5k6W+8kkaS/hmdPH+HX1JqlwMz7reB6+EDiuj9sRmIbO6to6vt/o/+VeDUOUvsSl98+BJPPS/DsU\\\
CyNksgUArq+4XPthk08+OIMsBwNXsrSwWAtHpJ/RNBlZUfa3YIXA8wLaxuPRHv/8i6/CHcdF2t/CJgwhZZmcmpuV/wER7Et6eXrxhgAAAABJRU5ErkJggg==';\
\
var icon_convertCoords = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\\\
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANiSURBVDhPnZVdaFtlGMd/5+Tkc2maNBubTWzW1JTQ6kDprhRBalFECU7GvBoDZTL1wiHb\\\
wEtBL3Y5ZFgmeDfGrLMbtEOddirKtBCUdjE2nTbFNetam6YfyUl6kuP7npK5kkLUB55zzvue//M/z/t8HWVwcFDZ2xmrres6/0UUlHtwE5MdLhefDl1oVT7/\\\
4msz3LbclEuzqU0xMws+tLWSzr8B2+1aU0KLyzRNVHXTffmsKP8cpc6w3d527NJeux9cf5Z3qctLd7gzlbZs1Zad1t3uduH3Omnb3dHAKW0azmGRCp37NcnN\\\
775k9Idf6B8YIBxaI/nHOhPfXCayy0Xi2DtEu2INpFsiXauZXDt3mrdef5uy02eRRQIKe8wcHaEeXko8TmK/n+yCTjo1xdgHx/htcmILqeWhJJJy+vIwzkWT\\\
pR4fLk8rj7QrREOtrBX+5NKFs+RWFXoDFdq8KgPPPkN+vpvs2EVqvQ/fI1VlIOdULxczScZv/MTRN14h2tvJyaGz9MTCBO0lC1yw7aTvyado3xMkFuvFMIq0\\\
BHfj69xHWV+1VIpaz3CpXKKnP86Jax9ze+E2gbCf886QBZKkmXmDB7w1Fh1xHnv6BTbKOmfO5/CGuqlVDUtl+BuqtSSAZaGFYoGqVuVD/z6LdCKVZfnmKJXZ\\\
7xn+0cGr7/7O0YSHGVEFp87kGBkPiN4RWZYXz0KacrGMYX2pSlEvUTUM8ht58jnRRZ1wONEnPL3Be9OHcczeFXGvcvBkBrc7iNu5SjozR3fkQVTZhwpVDnV1\\\
8ej0ogiWapFV1iv8lSxwfP9Brs9HOPBiP0euPm95WyyV0cuGcKBmrT0eFw7HZgVq9QzLFwMvH6J1PM251HUKqWU+OfUm7qAfnohjbGwa66UVqjUbNs3O/e0d\\\
DHgR+UUZGh4xO7zT1pekKKIN797Kkvp2BKp52nwOUUIt6MVVllYqvD8mjtUSR7PvELEu81A0zPHXniMeTDJTiKJ8duWqGfJMWWSyGmUnK6pqZSw7OYk5lxWG\\\
szidHSjtETy79nLgxM9i7earj/osu7rMrnShXLoyaoY9mS0vtlvYNNt221v2sivRzV42aQ5WlOYYya7JSVsRWWsmptFQsg0mkssafnJqy+Eo4/Z/RGbXK8aa\\\
+AV4/was4VDzReWIEgAAAABJRU5ErkJggg==';\
\
var icon_usertexts = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\\\
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMpSURBVDhPjVVNb9NAEH3rtWM7SZOmBTWqgKqBVAJa4ILEmQP8XCQuCA6cOKKWUyVKJShq\\\
y1cp+awTfy1vNm3iNgeYyNpde+ftm5k3GwXa6zdvzXA0kul/m4Ka7jUwqAQBnj976qgXL1+ZjdWoAKTgqC6y1ANMB8b4yLMOHB3CcXKugVF0CpMreOEavNLC\\\
1PfwdBGurFztTF/+PnXR+f0dWv1Af3gdnjnAWdpCUNpDkq9D4xvHFR76CzfWciyHM99BNJoAOs6M/uHPGn4ct7G+6iBzH6Lma7J6At98QH3xCZLBRyw2t5AM\\\
9xGrGlnPUmVI3zIsmtYajx63cWP1LhJTQ9Vvo1pvIks2EFaWGe4dVBYWObbwaX+frodTd6WYrquARmVYai7h8/EvvN9+h+OTDkqBRn15BX7god5Ygus6KFer\\\
AAGu2hwglIOS76Hb7SFg5eRRkhIW45JxXUzVxTcbcp7Pdps84xq4eesmxxyNpYZlkjE/mnslrAsz3Me6XzrHAsbj3myTYek9jfbGhgUseR4ialRg+mQdj8eo\\\
1WpoNHgQ4Yq+wLVJUbI0nQLmWYo0ybGzs4OvBwcWMM8ySLHqBDI8pLXesswNjyn6Cnmbw4wOF4/k0NEKw+GQXxQGHIMwRL/ft3m1OS6VbE4FoOgr3WNDTpPx\\\
jGGaIElzlCsVJEmCwA/Q63UJWmboEUG7uN1qne9Xl3zlpQUk8SkgW4CAIws2GAxsqL7vo0qZVHhItVzGSrOJXHpwEvTUV3p6TtgwGUP20Grfwf0HW2w5n2dQ\\\
sA5TwVHLnI9U12IWTNbzgMqlcDW+Hx/ZUMMgtBUXdmIT2bAclJr8rto8IHWYpgYxK392FvHicK18pE/FXeaka6tZkK/FFebzgNxsmFMpyrejI2QclbwjYHIu\\\
ryFzm1CPvc4fzC4vyeh5Dic9MCFfLUuBMtTqddzb3ERE2ezt7lKLOcbRwDLzXOYw7qPkkjnTU7RJp0RjeJ7oT+PawglOvmwjjkVjMVQ2YiFSVtpD6MacG4pd\\\
I1VnVAfDJ3MRfsJmkFtbOkrxLyCXy7HQppdO/ddCqlsN7V+A/gtSUG0hEZwMIwAAAABJRU5ErkJggg==';\
\
var icon_search = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAB41BMVEXlEmuusrbZz7CtsbavsrfKvJG5ur7JvJTb0bGssLX+343Ds43Iuo/VzK7GvqrUy66zr63Gvq23tLPF2+6ms87b5vLE0ebG\\\
xszMw6vY5/OopKrUyq296fvR8Pvd9frg9vvX8/u41O7O0NrWzK3BuaWyrrGZz/qz4vvE7PrO8PvP8PvI7vu45vuoweXMxr+ZlZdtlNKMxfuvrrCy4Pu86Py+6vy35PzOxKjMw6jKydDVy66Dgo9e\\\
h8lml9qHt+mZyPCfyuyZw+iXw+yTxvZ4s/a1vM3RyK2Kh49pjMd+p9qTt9ykxN2tyt1+j7mfwd2Otd50puLAwszRyKyspZhrgLCQtd2qyd/A2d7M4t/L4d671d+jw96Rr9bHwsHXza6p2vzCtI1y\\\
coeGnr+30dDP39Ld49La49LJ3dGqw9G4vM+0rZ+LpM6vpIhsbIuToLPQ3tPn49Li5NS8ycuqrcKzs8WyrKS6pXi8r4iHgYWDgpSRkaKWlaSgnKGjm4ufmJGwnY7xyGTMo0+i1PzAs428sIy/so2w\\\
nnbUix+GuvH75pDQpU2xh0jrnR3833zIoFK0h0TomRz+4I384oXTqU7IuY2th03pmxzgwXjItoi4iUPDhiyklpDEuJaryt7AsIq5p4K7rYxDXc45AAAAAXRSTlMAQObYZgAAARNJREFUeF5l0FOz\\\
xGAMgOHkQ9vFsW3btm3btm3bxk897WJ2d85zlzcXmQmAgGYYYyjIzeofASghxMPaNt7ezoYYUFBJUmqQo4Obk7OLq6SnAioFuE94enn7+Pr5p+gjlWNgVXBIaFh4RGRUtCnGxMbtJyQmJfecpqUb\\\
I8nIzMrOyc3LLygsKjYeIiWlZeUVlV/VNbV19YaIpKGxqbmlta29o7OrWxcRkPf29Q8MDg2PjI6Ncx0GTBQnp6ZnZufmFxaXlkUFAsqrldW19Y3Nre2d3T2tPCKouOLg8EjLj0/UZ+fyQOVocnGp\\\
vrpWIuNmbm7v7h8eGSA39/SsfnlFQNHC2/vHJ4KgsfD986tRXk/RAhXgD5aaN2cW9YgDAAAAAElFTkSuQmCC';\
\
\
Array.prototype.remove = function()\
  \{\
  for(var i = 0,l = arguments.length; i < l; i++)\
    \{\
    var x = this[arguments[i]];\
    if (x)\
      this.splice(x,1);\
    \}\
  return this;\
  \}\
\
\
const forum = url.indexOf('forum.php') != -1 && (url.indexOf('answer=true') != -1 || url.indexOf('mode=new_thread') != -1 || url.indexOf('edit_post_id') != -1 || url.indexOf('mode=new_poll') != -1);\
const memo = url.indexOf('screen=memo') != -1;\
const mail = url.indexOf('screen=mail') != -1 && (url.indexOf('mode=new') != -1 || url.indexOf('mode=view') != -1);\
const answer = url.indexOf('view=') != -1;    // Diff. of mail\
const ally = url.indexOf('screen=ally') != -1 && (url.indexOf('mode=overview') != -1 || url.indexOf('mode=properties') != -1);\
\
const gm = typeof(GM_setValue) != 'undefined';\
\
if(document.getElementById('message') || document.getElementById('intern') || document.getElementById('desc_text'))\
  \{\
  // Host\
  var root = 'http://' + document.location.host;\
\
  // Div\
  if(ally && document.getElementById('desc_text'))\
    var mainDiv = document.getElementById('bb_row').getElementsByTagName('div')[0];\
  else if(ally && document.getElementById('bb_row'))\
    var mainDiv = document.getElementById('bb_row').getElementsByTagName('div')[0];\
  else if(memo && document.getElementById('bbcodes'))\
    var mainDiv = document.getElementById('bbcodes').getElementsByTagName('div')[0];\
  else if(forum || memo || ally)\
    var mainDiv = document.getElementsByTagName('form')[0].getElementsByTagName('div')[0];\
  else if(answer)\
    var mainDiv = document.getElementById('message').parentNode.parentNode.getElementsByTagName('div')[0];\
  else if(mail)\
    var mainDiv = document.getElementById('message').parentNode.parentNode.previousElementSibling.getElementsByTagName('div')[0];\
\
\
  // Restore Scroll Position\
  if(document.getElementById('message')) \{\
    var left,top;\
    var store = function() \{\
      top = this.scrollTop;\
      left = this.scrollLeft;\
      \};\
    var update = function() \{\
      this.scrollTop = top;\
      this.scrollLeft = left;\
      \};\
\
    document.getElementById('message').addEventListener('mouseover',update,false);\
    document.getElementById('message').addEventListener('mouseout',store,false);\
    \}\
\
\
  // Additional Style\
  var css = '#bb_icons td a \{ display:none;  \} #bb_icons img \{ max-width:40px; max-height:40px; \} .tdbutton \{ color:DarkBlue; font-family:"Courier New"; text-decoration:underline; \}';\
\
  if (typeof GM_addStyle == "undefined")\
    \{\
    var head = document.getElementsByTagName("head")[0];\
    var style = document.createElement("style");\
    style.type = "text/css";\
    style.appendChild(document.createTextNode(css));\
    head.appendChild(style);\
    \}\
  else\
    \{\
    GM_addStyle(css);\
    \}\
\
  // Add button method\
  mainDiv.addButton = function(title,img,fct,node)\
    \{\
    var a = document.createElement('a');\
    a.setAttribute('title',title);\
    a.setAttribute('href','#');\
    a.addEventListener('click',fct,false);\
\
    var div = document.createElement('div');\
    div.setAttribute('style','float:left; background:url('+img+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');\
\
    a.appendChild(div);\
\
    if(node)\
      this.insertBefore(a,node);\
    else\
      this.insertBefore(a,document.getElementById('bb_sizes'));\
    return this;\
    \}\
\
  // Infotext\
  var a = document.createElement('a');\
  a.setAttribute('href','http://userscripts.org/scripts/show/39879');\
  a.setAttribute('title','Script Homepage: Updates, News, ... ');\
  a.setAttribute('style','font-weight:bold; font-size:7pt; color:#0082BE; font-family:Broadway,Verdana,Arial; ');\
  a.appendChild(document.createTextNode('DS Smilies-BB-Codes-List (ver'+ver+')'));\
  mainDiv.appendChild(a);\
\
  // Remove original report button\
  if(forum || memo || ally || mail)\
    \{\
    mainDiv.removeChild(mainDiv.getElementsByTagName('a')[10]);\
    \}\
\
\
  // Smilies' Box\
  if(forum || memo)\
    \{\
    var table = document.createElement('table');\
    table.setAttribute('id','bb_smilies');\
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 24px; left: 200px; ');\
\
    var tr = document.createElement('tr');\
\
    var td = document.createElement('td');\
    td.setAttribute('style','padding:2px;');\
\
    for(var i = 0; i < smilies.length; i++)\
      \{\
      if(smilies[i] == '\\n')\
        \{\
        var br = document.createElement('br');\
        td.appendChild(br);\
        continue;\
        \}\
\
\
      var img = new Image();\
      img.setAttribute('src',smilies[i]);\
      img.setAttribute('style','vertical-align:middle; ');\
      img.setAttribute('alt','[img]'+smilies[i]+'[/img]');\
\
      var a = document.createElement('a');\
      a.setAttribute('href','#');\
      a.setAttribute('style','vertical-align:middle; ');\
      a.addEventListener('click',function() \{\
        insert(this.title,'');\
        toggle('bb_smilies');\
        return false;\
      \},false);\
      a.setAttribute('title','[img]'+smilies[i]+'[/img]');\
      a.appendChild(img);\
\
      td.appendChild(a);\
      \}\
\
    tr.appendChild(td);\
    table.appendChild(tr);\
    mainDiv.appendChild(table);\
    \}\
\
  // Icons' Box\
  if(forum || memo)\
    \{\
    var table = document.createElement('table');\
    table.setAttribute('id','bb_icons');\
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 24px; left: 200px; ');\
\
    for(var i = 0; i < ds_icons.length; i++)\
      \{\
      var tr = document.createElement('tr');\
\
      var td = document.createElement('td');\
      td.style.fontSize = '7pt';\
      td.style.cursor = 'pointer';\
      td.appendChild(document.createTextNode(ds_icons[i][0]+':'));\
      td.addEventListener('click',toggleLine,false);\
      tr.appendChild(td);\
\
\
      var td = document.createElement('td');\
      td.setAttribute('style','padding:2px;');\
\
      for(var x = 1; x < ds_icons[i].length; x++)\
        \{\
        var img = new Image();\
        img.setAttribute('src',ds_icons[i][x]);\
        img.setAttribute('style','padding:1px; border:solid 1px black; -moz-border-radius:5px 0px;');\
        img.setAttribute('alt','[img]'+ds_icons[i][x]+'[/img]');\
\
        var a = document.createElement('a');\
        a.setAttribute('href','#');\
        a.setAttribute('style','padding:2px; margin-right:1px;  margin-bottom:2px; ');\
        a.style.fontSize = '';\
        a.addEventListener('click',function() \{\
          insert(this.title,'');\
          toggle('bb_icons');\
          return false;\
        \},false);\
        a.setAttribute('title','[img]'+root+'/'+ds_icons[i][x]+'[/img]');\
        a.appendChild(img);\
\
        td.appendChild(a);\
        \}\
      tr.appendChild(td);\
      table.appendChild(tr);\
      \}\
\
    mainDiv.appendChild(table);\
    \}\
\
  // ##### Buttons #####\
\
  // Code      [code]  [/code]\
  if(forum || memo || mail || ally)\
    \{\
    mainDiv.addButton('Code',icon_code,function() \{\
      insert('[code]','[/code]');\
      return false;\
      \}\
    ,mainDiv.getElementsByTagName('a')[4]);\
    \}\
\
  // Icons\
  if(forum || memo)\
    \{\
    mainDiv.addButton('Icons',icon_icons,function() \{\
      toggle('bb_icons');\
      return false;\
      \});\
    \}\
\
\
  // Smilies\
  if(forum || memo)\
    \{\
    mainDiv.addButton('Smilies',icon_smilies,function() \{\
      toggle('bb_smilies');\
      return false;\
      \});\
    \}\
\
  // Report Direct     [report]  [/report]\
  if(forum || memo || ally || mail)\
    \{\
    mainDiv.addButton(say.linkreport,icon_report_link,function() \{\
      var url = prompt(say.report_url,'');\
      if(url != '')\
        \{\
        if(url.indexOf('=') != -1)\
          \{\
          url = url.split('=').pop();\
          insert('[report]'+url+'[/report]','');\
          \}\
        else\
          \{\
          url = url.split('/').pop();\
          insert('[report]'+url+'[/report]','');\
          \}\
        \}\
      else\
        insert('[report]','[/report]');\
      return false;\
      \});\
    \}\
\
  // Report link      [report_display]  [/report_display]\
  if(forum || memo || ally || mail)\
    \{\
    mainDiv.addButton(say,icon_report_direct,function() \{\
      var url = prompt(say.directreport,'');\
      if(url != '')\
        \{\
        if(url.indexOf('=') != -1)\
          \{\
          url = url.split('=').pop();\
          insert('[report_display]'+url+'[/report_display]','');\
          \}\
        else\
          \{\
          url = url.split('/').pop();\
          insert('[report_display]'+url+'[/report_display]','');\
          \}\
        \}\
      else\
        insert('[report_display]','[/report_display]');\
      return false;\
      \});\
    \}\
\
\
  // Convert Coords to BB-Codes\
  if(forum || memo || mail || ally)\
    \{\
    mainDiv.addButton(say.convertcoords,icon_convertCoords,function() \{\
      document.getElementById('message').value = document.getElementById('message').value.replace(/(\\(\\d\{1,3\}\\|\\d\{1,3\}\\))(?!\\[\\/village\\])/g,'[village]$1[/village]');\
      document.getElementById('message').value = document.getElementById('message').value.replace(/(\\d\{1,3\}\\|\\d\{1,3\})(?!.*\\[\\/village\\])/g,'[village]($1)[/village]');\
      return false;\
      \});\
    \}\
\
\
  // Search function\
  if(forum || memo || mail || ally)\
    \{\
    mainDiv.addButton(say.search,icon_search,function() \{\
      var key = prompt(say.searchterm,'');\
      var text = document.getElementById('message').value;\
      var ar = text.split('\\n');\
      var foundInRenderedLine = -1;\
      var foundInRealLine = -1;\
      var cols = 80;\
      for (var i=x=0; i < ar.length; i++,x++)\
        \{\
        if(foundInRenderedLine == -1 && ar[i] && ar[i].indexOf(key) != -1)\
          \{\
          foundInRealLine = i;\
          if(ar[i].length > cols)\
            \{\
            var a = 0;\
            var part = ar[a].substr((cols*a),cols);\
            while(part)\
              \{\
              if(part.indexOf(key) != -1)\
                \{\
                break;\
                \}\
              a++;\
              part = ar[a].substr((cols*a),cols);\
              \}\
            foundInRenderedLine = x + a;\
            \}\
          else\
            \{\
            foundInRenderedLine = x;\
            \}\
\
          break;\
          \}\
        else if(ar[i] && ar[i].length > cols)\
          \{\
          x+=parseInt(ar[i].length / cols);\
          \}\
        \}\
\
      if(foundInRenderedLine != -1)\
        \{\
        var  x = foundInRenderedLine*17;      // Pixel from top (1 line = 17 pixel)\
        top = x;\
        alert(foundInRenderedLine);\
        document.getElementById('message').scrollTop = x;\
        \}\
      else\
        \{\
        alert(say.noresults);\
        \}\
\
      return false;\
      \});\
    \}\
\
\
  // User Texts\
  if(gm && (forum || memo || mail || ally))\
    \{\
    mainDiv.addButton(say.personaltexts,icon_usertexts,function() \{\
      // User Texts' Box\
      show_userTextsBox(mainDiv);\
      toggle('user_texts');\
      return false;\
      \});\
    \}\
\
  \}\
\
\
  // User Texts' Box\
  function show_userTextsBox(mainDiv)\
    \{\
    if(document.getElementById('user_texts'))\
      return;\
\
    var div = document.createElement('div');\
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 24px; left: 200px; ');\
    div.setAttribute('id','user_texts');\
\
    var table = document.createElement('table');\
\
    var tr = document.createElement('tr');\
    var th = document.createElement('th');\
    th.appendChild(document.createTextNode(say.personaltexts));\
    tr.appendChild(th);\
    table.appendChild(tr);\
\
    var texts = getTexts();\
    for(var i = 0,len = texts.length; i < len; i++)\
      \{\
      var tr = document.createElement('tr');\
      var td = document.createElement('td');\
      td.appendChild(document.createTextNode(texts[i].name));\
      td.addEventListener('click',function(i) \{ return function() \{\
        insert(texts[i].value,'');\
        toggle('user_texts');\
       \} \}(i),false);\
      td.setAttribute('class','tdbutton');\
      tr.appendChild(td);\
      table.appendChild(tr);\
      \}\
\
    if(len == 0)\
      \{\
      var tr = document.createElement('tr');\
      var td = document.createElement('td');\
      td.setAttribute('style','color:Silver; font-family:Courier,sans-serif; ');\
      td.appendChild(document.createTextNode(say.noentries));\
      tr.appendChild(td);\
      table.appendChild(tr);\
      \}\
\
\
    var tr = document.createElement('tr');\
    var td = document.createElement('td');\
    td.appendChild(document.createTextNode(say.editentry));\
    td.setAttribute('class','tdbutton');\
    td.setAttribute('style','border-top:solid black 2px; ');\
    td.addEventListener('click',function() \{\
      // User Texts Edit Box\
      show_userTextsEditBox(mainDiv);\
\
      toggle('user_texts');\
      toggle('user_texts_edit');\
      return false;\
    \},false);\
    tr.appendChild(td);\
    table.appendChild(tr);\
\
    div.appendChild(table);\
\
    mainDiv.appendChild(div);\
    \}\
\
  // User Texts Edit Box\
  function show_userTextsEditBox(mainDiv)\
    \{\
    if(document.getElementById('user_texts_edit'))\
      return;\
\
    var div = document.createElement('div');\
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 24px; left: 200px; ');\
    div.setAttribute('id','user_texts_edit');\
\
    var table = document.createElement('table');\
\
    var tr = document.createElement('tr');\
    var th = document.createElement('th');\
    th.setAttribute('colspan','4');\
    th.appendChild(document.createTextNode(say.editpersonalentries));\
    tr.appendChild(th);\
    table.appendChild(tr);\
\
    var texts = getTexts();\
    for(var i = 0,len = texts.length; i < len; i++)\
      \{\
      var tr = document.createElement('tr');\
\
      var td = document.createElement('td');\
      td.appendChild(document.createTextNode(texts[i].name));\
\
      tr.appendChild(td);\
\
      var td = document.createElement('td');\
      td.setAttribute('style','font-size:x-small; font-family:monospace;');\
\
      var text = texts[i].value.substring(0,250);\
      if(text != texts[i].value)\
        text += '...';\
\
      text = text.split('\\n');\
      /*\
      for each(var value in text)\
        \{\
        td.appendChild(document.createTextNode(value));\
        td.appendChild(document.createElement('br'));\
        \}\
      */\
\
      for(var attr in text)\
        \{\
        if(typeof(text[attr]) != 'function')\
          \{\
          td.appendChild(document.createTextNode(text[attr]));\
          td.appendChild(document.createElement('br'));\
          \}\
        \}\
\
      tr.appendChild(td);\
\
      var td = document.createElement('td');\
      td.setAttribute('class','tdbutton');\
      td.setAttribute('title','Bearbeiten');\
      td.appendChild(document.createTextNode('E'));\
      td.addEventListener('click',function(i) \{ return function() \{\
        var re = workWithEntry(texts,i);\
        mainDiv.appendChild( re );\
       \} \}(i),false);\
      tr.appendChild(td);\
\
\
      var td = document.createElement('td');\
      td.setAttribute('class','tdbutton');\
      td.setAttribute('title',say.del);\
      td.appendChild(document.createTextNode('X'));\
      td.addEventListener('click',function(i) \{ return function() \{\
       var c = confirm(say.confirm_delete);\
       if(c)\
         \{\
         texts.remove(i);\
         setTexts(texts);\
         if(document.getElementById('user_texts'))\
           \{\
           document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));\
           \}\
         if(document.getElementById('user_texts_edit'))\
           \{\
           document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));\
           \}\
         show_userTextsBox(mainDiv);\
         show_userTextsEditBox(mainDiv);\
         toggle('user_texts_edit');\
         \}\
\
       \} \}(i),false);\
\
      tr.appendChild(td);\
      table.appendChild(tr);\
      \}\
\
    var tr = document.createElement('tr');\
\
    var td = document.createElement('td');\
    td.setAttribute('class','tdbutton');\
    td.appendChild(document.createTextNode(say.newentry));\
    td.addEventListener('click',function() \{\
      var re = workWithEntry(texts);\
      mainDiv.appendChild( re );\
      return false;\
    \},false);\
    tr.appendChild(td);\
\
    var td = document.createElement('td');\
    td.setAttribute('colspan','3');\
    td.setAttribute('class','tdbutton');\
    td.appendChild(document.createTextNode(say.close));\
    td.addEventListener('click',function() \{\
      toggle('user_texts_edit');\
      return false;\
    \},false);\
    tr.appendChild(td);\
\
    table.appendChild(tr);\
\
    div.appendChild(table);\
\
    mainDiv.appendChild(div);\
    \}\
\
  // User Texts Edit Box - Work with Entry\
  function workWithEntry(texts,n)\
    \{\
    var texts = texts;\
    if(typeof(n) != 'undefined')\
      \{\
      var header = say.editpersonaltext;\
      var name = texts[n].name;\
      var text = texts[n].value;\
      \}\
    else\
      \{\
      var header = say.newpersonaltext;\
      var name = '';\
      var text = '';\
      \}\
\
\
    var table = document.createElement('table');\
    table.setAttribute('id','user_texts_edit_entry');\
    table.setAttribute('style','clear:both; position:absolute; z-index:121; border: 2px solid #804000; background:#efe6c9; top: 24px; left: 200px; ');\
\
    var tr = document.createElement('tr');\
    var th = document.createElement('th');\
    th.setAttribute('colspan','2');\
\
    th.appendChild(document.createTextNode(header));\
\
    tr.appendChild(th);\
    table.appendChild(tr);\
\
    var tr = document.createElement('tr');\
\
    var td = document.createElement('td');\
    td.appendChild(document.createTextNode(say.title));\
    tr.appendChild(td);\
\
    var td = document.createElement('td');\
    var input = document.createElement('input');\
    input.setAttribute('type','text');\
    input.setAttribute('value',name);\
    input.setAttribute('size',64);\
    input.setAttribute('id','UserText_Name');\
    td.appendChild(input);\
    tr.appendChild(td);\
\
    table.appendChild(tr);\
\
\
    var tr = document.createElement('tr');\
\
    var td = document.createElement('td');\
    td.appendChild(document.createTextNode(say.text));\
    tr.appendChild(td);\
\
    var td = document.createElement('td');\
    var textarea = document.createElement('textarea');\
    textarea.setAttribute('cols','40');\
    textarea.setAttribute('rows','12');\
    textarea.setAttribute('id','UserText_Text');\
    textarea.appendChild(document.createTextNode(text));\
    td.appendChild(textarea);\
    tr.appendChild(td);\
\
    table.appendChild(tr);\
\
\
    var tr = document.createElement('tr');\
\
    var td = document.createElement('td');\
    td.setAttribute('class','tdbutton');\
    td.appendChild(document.createTextNode(say.ok));\
    td.addEventListener('click',function() \{\
      var data = \{\
        'name' : document.getElementById('UserText_Name').value,\
        'value' : document.getElementById('UserText_Text').value \};\
\
      if(typeof(n) != 'undefined')\
        \{\
        texts[n] = data;\
        \}\
      else\
        \{\
        texts.push(data);\
        \}\
\
      setTexts(texts);\
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\
\
\
      if(document.getElementById('user_texts'))\
        \{\
        document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));\
        \}\
      if(document.getElementById('user_texts_edit'))\
        \{\
        document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));\
        \}\
      show_userTextsBox(mainDiv);\
\
      return false;\
    \},false);\
    tr.appendChild(td);\
\
    var td = document.createElement('td');\
    td.setAttribute('class','tdbutton');\
    td.appendChild(document.createTextNode(say.cancel));\
    td.addEventListener('click',function() \{\
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\
      return false;\
    \},false);\
    tr.appendChild(td);\
\
    table.appendChild(tr);\
\
    return table;\
    \}\
\
\
function getTexts()\
  \{\
  var gm = GM_getValue('usertexts');\
\
  if(typeof(gm) == 'undefined' || gm == '' || !gm)\
    return new Array();\
\
  try\
    \{\
    var ar = JSON.parse( gm );\
    \}\
  catch(e)\
    \{\
    return new Array();\
    \}\
  return ar;\
  \}\
\
function setTexts(ar)\
  \{\
  var str = JSON.stringify(ar);\
  GM_setValue('usertexts',str);\
  \}\
\
\
function toggleLine(e)\
  \{\
  var elist = this.nextSibling.getElementsByTagName('a');\
  var n = elist[0].style.display=='inline'?'none':'inline';\
  for(var i = 0; i < elist.length; i++)\
    \{\
    elist[i].style.display = n;\
    \}\
  \}\
\
function toggle(id)\
  \{\
  var e = document.getElementById(id);\
  if(e.style.display == 'block')\
    e.style.display = 'none';\
  else\
    e.style.display = 'block';\
  \}\
\
\
// Stolen Code:\
// http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/\
function insert(aTag, eTag)\
  \{\
  var input = document.getElementById('message');\
  input.focus();\
  if(typeof input.selectionStart != undefined)\
    \{\
    var start = input.selectionStart;\
    var end = input.selectionEnd;\
    var insText = input.value.substring(start, end);\
    input.value = input.value.substr(0,start) + aTag + insText + eTag + input.value.substr(end);\
    var pos;\
    if(insText.length == 0)\
      pos = start + aTag.length;\
    else\
      pos = start + aTag.length + insText.length + eTag.length;\
    input.selectionStart = pos;\
    input.selectionEnd = pos;\
    \}\
  \}\
\
\
/*\
\
var iframe;\
function createIframe()\
  \{\
  iframe = document.createElement('iframe');\
  iframe.setAttribute('src','http://de49.die-staemme.de/ad_sky.php');\
  document.getElementById('message').parentNode.appendChild(iframe);\
  \}\
\
function modIframe()\
  \{\
  iframe.contentDocument.body.parentNode.removeChild(iframe.contentDocument.body);\
  var body = document.createElement('body');\
  iframe.contentDocument.getElementsByTagName('html')[0].appendChild(body);\
  body.setAttribute('contentEditable',true);\
  body.addEventListener('click',clickedIframe,false);\
  \}\
\
function clickedIframe(event)\
  \{\
  var span = document.createElement('span');\
  span.setAttribute('style','font-weight:bold; ');\
\
  var sel = iframe.contentWindow.getSelection();\
  var range = sel.getRangeAt(0);\
  alert(range.surroundContents(span));\
  \}\
\
createIframe();\
window.setTimeout(modIframe,2000);\
\
\
*/}