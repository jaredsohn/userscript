// ==UserScript==
// @name          DS Smilies-BB-Codes-List
// @version       1.9
// @author        Samuel Essig (http://c1b1.de)
// @description   Fügt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies und Icons auswÃ¤hlen kann, außerdem die BB-Codes für Berichte und Code.
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*.die-staemme.de/*forum.php*answer=true*
// @include       http://*.die-staemme.de/*forum.php*mode=new_thread*
// @include       http://*.die-staemme.de/*forum.php*edit_post_id*
// @exclude       http://forum.die-staemme.de/*
// @include       http://ch*.staemme.ch/*forum.php*answer=true*
// @include       http://ch*.staemme.ch/*forum.php*mode=new_thread*
// @include       http://ch*.staemme.ch/*forum.php*edit_post_id*
// @include       http://ch*.staemme.ch/*forum.php*mode=new_poll*

// @include       http://ch*.staemme.ch/*screen=memo*

// @include       http://ch*.staemme.ch/*screen=ally*mode=overview*
// @include       http://ch*.staemme.ch/*screen=ally*mode=properties*

// ==/UserScript==

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

If you have any questions, comments,
ideas, etc, feel free to contact me
and I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en


##################### Description ####################


Funktioniert mit Firefox 2+ (GM 0.8+) und Opera 9+

Screenshot:
http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.smilies_bb-codes_0.png ( First Version )
http://s3.amazonaws.com/uso_ss/1407/large.png ( Version 1.7 )
http://s3.amazonaws.com/uso_ss/1406/large.png ( Version 1.7 )
http://s3.amazonaws.com/uso_ss/1405/large.png ( Version 1.8 )
http://s3.amazonaws.com/uso_ss/1408/large.png ( Version 1.8 )

*/

var smilies = new Array(
'http://forum.meinskype.de/images/smiles/emoticon-0100-smile.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0101-sadsmile.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0102-bigsmile.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0103-cool.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0105-wink.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0106-crying.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0107-sweating.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0109-kiss.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0110-tongueout.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0111-blush.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0112-wondering.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0113-sleepy.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0114-dull.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0115-inlove.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0116-evilgrin.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0117-talking.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0118-yawn.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0119-puke.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0121-angry.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0122-itwasntme.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0123-party.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0124-worried.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0127-lipssealed.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0128-hi.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0130-devil.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0131-angel.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0132-envy.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0134-bear.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0135-makeup.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0136-giggle.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0137-clapping.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0138-thinking.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0139-bow.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0140-rofl.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0141-whew.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0142-happy.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0144-nod.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0145-shake.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0146-punch.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0148-yes.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0149-no.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0150-handshake.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0152-heart.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0153-brokenheart.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0154-mail.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0155-flower.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0157-sun.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0158-time.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0162-coffee.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0165-muscle.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0166-cake.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0167-beer.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0168-drink.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0169-dance.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0170-ninja.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0172-mooning.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0174-bandit.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0176-smoke.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0178-rock.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0179-headbang.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0181-fubar.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0184-tmi.gif',
'http://forum.meinskype.de/images/smiles/emoticon-0187-surprised.gif',
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
'http://twbbcodes.pytalhost.com/images/smileys/em3400.gif');


var icon_smilies = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACoFBM\
VEUAAACvsrfb0bHNwJS5ur7Zz7DJvJSusrbe1LStsbbKvJG4sAuyqgrVzK7c0rKvpwrQxJ7IuI/TyKKU\
jQfDs411bwns4Rm0rArf0xK0rAu3rwvNwZvFvA66si7e1J706Rje1LDRyJ7VzBHKwA7c0RTYzqC7snmz\
qgv79Brb0q779yva0Jnb0RHw6l9sZwmwqA3CuRCYkBfb0bDe1bDs53Lt5nP26xf78xweHQW2rXTXzRGn\
oA0ZGASRigyxqBCooAiRiiLNxJzc07Lw6lz68xv16Rbu4hXUyRMKCgOlng3SyRGbkwze1KyEfgm4sAys\
sLXf1a6im1359TTWzJ3y6y6fmA/r4BTm2xSnnhAjIgWyqg7OxQ+jmw0gHgWVjgu2rgyelQbd0hWBew7V\
yovr3xTn3BPJvxCSiw26sV/LwA67sg7k3Jr49DP89BqwqAqlnQeBexjy5xbMwYLZzhKwpxCclA/WzBHS\
yBHOxA/KwQ7GvA7Btw28tAzj2pqupwv17DKFfwiBexDJvxbJvIgKCQKspA+FfwzQxhDMww7Jvw7FvA3B\
uA28swzp3RSxqAppYwmHgAeFfRyimiTMv5HOwZfKu5K3rTCKhAy9tA7Hvg3DuQ3Atw28sw2zqgqYjwh0\
bgqXkAaPhzbGvRmzqVa1rAqblAqPiQ2/tg6+tgy6sguzrAq1rBGjmguTjAmJgQ2roWrGuYaclCOIggl/\
eQuhmgqvpgqRiQlybAuOiAuJgjHFuIu4rHOUjB2mnQmakgt4cgl1cAp9dgtzbQp2cAmWjwiTjAiHfyK5\
rn+7r3mSii6Rig+YkQaXjweVjQiUjQaTjAeIgRKRijy8sIGMhDLGuo24rXeimVGTizeNhS6TiziimVW3\
rHrIu5CGgAqupwy1rQpMLoSeAAAAAXRSTlMAQObYZgAAAWlJREFUeF5VzFOzK1EQgNG9xzOxk2Pbtm3b\
tm1b17Zt27b9V85k8nLzvXTXqq4GACP/C0JIYgBAAY7ohQswAHGKK8nE0dqe23AaQISdZsPOo0qrCeM6\
cyFFIakcpnln+Jouqy0sbTfaeFAId+np5WBXXhHr5Obiynf3F+qwsanZJ8TvVEBgUDAvNCxci3hEZFR0\
THZcfELiVHKKSJaOsyjNzGrPyc3LLygsKi4pFZV9krIorlRWVatrao3qG/78/dfS2iYmATTs6Ozq7unt\
6x8YHDIYUYyNG0IAicmD0zOzc/MLi0s8zcrq2gaCRWbTVqNt23fs3LWbp9mzd9/+AwzJInro8JGjx46f\
MDipOq04c/YcQ2vx/AX+xUuXVfwrV69dl924qUP01u07d+/df/Dw0eMnT5+hDOQQff7i5avXb96+e//h\
I4pqfxKb2T5/+frt+4+fv36zO8GiXLJFL4kcAwCjSb1oDKwDMvtwyB3q78QAAAAASUVORK5CYII=';

var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL\
e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ\
REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF\
EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E\
rkJggg==';

var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n\
mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf\
mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf\
ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS\
TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM\
NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a\
zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E\
rkJggg==';

var icon_code = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkYLjfIjVsA\
AAKeSURBVDjLnZRLSFRhFMd/3zejTir2cqNYZDkKPibMR20isVJa9bAWCe0q2rSQamPhIre5L4g2QZsWhVFmiESJoab5GEYszUc6YabkjPNq5t6vxXWuDs5YeeAP3+N//t+5555zBED7\
m07lCwb5HxMIc61QpNls1NZUC/GstU3lZwewWiRSCrZiuq6IaDqzSzuQAFaLNC/i4deyl67uQUKhMLqu8PuDdHUPsuILoOuKqMZKIGgISik2RXtHNzcaW0hJSUJKwYfeYa5ebza/Kgql\
lCH4N+vpc1JRVrS2/+jEUWLHZkuJzasQ/ybY2++ksqx43QMjHC4vicv9q+DUtJv5H0tUlhuCXq+P0bFJDlcUx//7z1rbVOGeUMzhpct3cI19BUCLaASCIdLTU40S0XV8/iBpqTaENOLp\
f/8EAOdMMlaA3yFPjGDd6aNULTkAePr8Ldsz0jh18ggArzt68Hh81J0+ZvLX/DMNQS0SiRGsra4w148ev6T+/AkunKkC4MWrLo4fK6P+/AmTE/UXYjWHmqbFxeSUm5+Lyxw6aEfTNDxe\
H6Ofpyl15MXlC4QRYSQcipvgvk8udu/KICdrJ5FwiP5PLgAK83MS+liNvtTMg4bbD8z15Mw8kYjGrab7AMy6F7FaLTQ2PzRKREpamq/E9PSGsrFYpAn390Wys3abd7NzC+RkZ8Zw1ptS\
qxGut3t3jRe/zS3wrttJ082LHMjNxuP1c/JcIw3XzlJZVpCwbhMWdv/QONszUtm/LwuAwZEJpBQ4inITi23WegNDXygtyUMIY6QNDI9TWLAXmy05oaCZQ4VlAwaGJig9aI/dO+xxuVGY\
rZcpXCQlSaTFsrUBq2mEwzr+lFJjjre/6VQrgSBiawMbpSB9m43amuqkP9SuNod5SVyuAAAAAElFTkSuQmCC';

var icon_icons = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkaKOydSuwA\
AAMgSURBVDjLnZRPaBxlGMZ/839md5P9Y3Y3TTZry9pNtJVqD4b2EDWH1JMnteCpXgpBBO2hooeCBW+CJ/UiVFDw4CEQClsVzCUWqlbBGpVgUvxTaNxm081kd2Z35pvxMO402yyCeU/D\
937P8z3zvs/7SgALi7UwJOT/hIQUf4eEJE2TU3OzirSwWAurYw6qIiPLEvuJIAjxRcBfjQwqgKrIcWKvFJ0w6ACgqAaB6A4kVRWZHceNCAcpO/7cZbJTZYRrs3njx+jQ/Qnf6/DL1Q8H\
koZhiDwoMfPaZazcNsK16drbWIUpAMxciaNTVc6+/PbgukpSpHB3vHi+Rv7403hff8x0/k8SBy0sEzbqw+juXbZEFsdp4PhJLLW1h7RP4cmzy/zhjDG5/hmPlZKMFrMcO1KlWjnIo1MV\
XjhdBiBhWpx//cJAlXKvGUEQYv9+g+bKAoaukc0Mc/ihKhMHyhQeSDOSL5LPZRgvejhdGVVP8+ZbH8XYXkNVgG5nGwBtaILnj9xFsXQeHC9SKpVI6QZWIo9xu8746G2efOJvbm342G0H\
4fsxNoqRSKHw/SjZFHzzm42m6qSSSVK6QS6bjq837Xs1Mw2d764vx1jh+0jSvwqFEACIts3E2BjPzu5waGKD8uF1tFwJgIcbdb692qC+2WI83+C9S9+zG9ubHhXA9yLjaumoR7bd5dUL\
Na4srQGQHjIBePfiU2w1nZjskclKjI0NHjFHr2QmhzGNFvWtJG+8Mg3AlaU1mrbbBzo3/wwrq00kORljezPd58OECyThy+UmS9c0DlVmmK/MANBuOTjOHdyO4NbNLSR5CNMw7puU+3z4\
6cWjAHS9Do7r0m45MZkf3FNyp5vEEwHTJ078t7EBDowWMNSAhCHT2kUqRNB3T1Nk5k6W+8kkaS/hmdPH+HX1JqlwMz7reB6+EDiuj9sRmIbO6to6vt/o/+VeDUOUvsSl98+BJPPS/DsU\
CyNksgUArq+4XPthk08+OIMsBwNXsrSwWAtHpJ/RNBlZUfa3YIXA8wLaxuPRHv/8i6/CHcdF2t/CJgwhZZmcmpuV/wER7Et6eXrxhgAAAABJRU5ErkJggg==';

var icon_convertCoords = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlz\
AAALEwAACxMBAJqcGAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANxSURBVDgRlZVfaFtVHMc/9+bm79I0\
aTY2m9g2qSmh1cGke1IEqUURJTgZ82kMlMnUB4dsAx8FfdjjkGGZ4NsYs85u0A512qko00JQ2sXYdK4prlnX2jT9k9yb3uR6zy2J\
LTVUD5xzfvf8ft/vOef351xpYGDA6IjEWFNV/k+TkOrmBga7XC4+G7yE9MWX3xjhlqW6spGg2ORGqvr69LwPZbWk8l+M7XalDmwk\
WFyGYSDLG8cXsiT9c5Ua8N/WarrNs8Arm41rsphFX1q8z/3JtIWRm3Zbs93twu910rK3bTOXJQvMtntYpKZi9rckt7//ipEff6Wv\
v59waJXk3TXGv71K+x4XiRPvEu2MbSPd4ulq1eDGhbO8/cY7aE6fRdYekNhn5GgLdfNy4gkSB/1k51XSqUlGPzzB7xPjW0itEwoi\
0c5eHcK5YLDY7cPlaeaxVoloqJnVwp9cuXSe3IpET6BMi1em/7lnyc91kR29TLXn0TqpLBw5K3u5nEkydutnjr/5KtGeCKcHz9Md\
CxO0lyzjgm03vU89Teu+ILFYD7pepCm4F19kP5q6YnVhKNciXNJKdPfFOXXjE+7N3yMQ9nPRGbLIBGlmTuchb5UFR5zHn3mRdU3l\
3MUc3lAX1YpuddP1bPGhQJdMQ83shWKBilLhI/9+i3Q8lWXp9gjlmR8Y+snBa+/9wfGEh2kzC86cyzE8FjBrx4yyGDzzabSihm7t\
VKGolqjoOvn1PPmcWUUROJroNa9/i/enjuKYeUC1WuHw6QxudxC3c4V0Zpau9oeRRR1KVDjS2cmBqQUoyBZZea3MX8kCJw8e5uZc\
O4de6uPY9Res0xZLGqqmmweoWt8ejwuHYyMDlVqEhab/lSM0j6W5kLpJIbXEp2fewh30w5Nx9PUNsFpaplK1YVPsbC7vYMCLGV+k\
waFho807Ze0kBskswwd3sqS+G4ZKnhafw0yhJtTiCovLZT4YNa/VFEex7zJ9rfFINMzJ158nHkwyXYgifX7tuhHyTFqEIhtFJUuy\
bJYeZCcmMGazJnAGp7MNqbUdz54ODp36xfx28/XHvRauNswsdyJduTZihD2Z2lrD2abYGupqiuxydKOWDXY2lqSdbQSxIl7ashm1\
nZqhb0vZbRDBpUzfzdAROYB4HIXfGrZyQ40VXa/5rIlfwN9/bVGxjYbxCgAAAABJRU5ErkJggg==';



if(document.getElementById('message'))
  {
  // Host
  var root = 'http://' + document.location.host;

  // Div
  var mainDiv = document.getElementsByTagName('form')[0].getElementsByTagName('div')[0];

  // Additional Style
  var css = '#bb_icons td a { display:none;  } #bb_icons img { max-width:40px; max-height:40px; }';

  if (typeof GM_addStyle == "undefined")
    {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    }
  else
    {
    GM_addStyle(css);
    }

  // Info
  var a = document.createElement('a');
  a.setAttribute('href','http://userscripts.org/scripts/show/39879');
  a.setAttribute('title','Script Homepage: Updates, News, ... ');
  a.setAttribute('style','font-weight:bold; font-size:7pt; color:#0082BE; font-family:Broadway,Verdana,Arial; ');
  a.appendChild(document.createTextNode('DS Smilies-BB-Codes-List (ver1.9)'));
  mainDiv.appendChild(a);

  // Remove original report button
  mainDiv.removeChild(mainDiv.getElementsByTagName('a')[9]);


  // Code      [code]  [/code]
  var a = document.createElement('a');
  a.setAttribute('title','Code');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    insert('[code]','[/code]');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_code+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  mainDiv.insertBefore(a,mainDiv.getElementsByTagName('a')[4]);


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
  mainDiv.appendChild(table);

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

  mainDiv.insertBefore(a,document.getElementById('bb_sizes'));

  
  // Report link      [report_display]  [/report_display]
  var a = document.createElement('a');
  a.setAttribute('title','Bericht direkt anzeigen');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    var url = prompt('Gib die URL zum Bericht an:','');
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

  mainDiv.insertBefore(a,document.getElementById('bb_sizes'));

  // Convert Coords to BB-Codes
  var a = document.createElement('a');
  a.setAttribute('title','Koordinaten in BB-Codes umwandeln');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    document.getElementById('message').value = document.getElementById('message').value.replace(/(\(\d{1,3}\|\d{1,3}\))(?!\[\/village\])/g,'[village]$1[/village]');
    document.getElementById('message').value = document.getElementById('message').value.replace(/(\d{1,3}\|\d{1,3})(?!.*\[\/village\])/g,'[village]($1)[/village]');

    document.getElementById('message');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_convertCoords+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  mainDiv.insertBefore(a,document.getElementById('bb_sizes'));
  }


function toggleLine(e)
  {
  var elist = this.nextSibling.getElementsByTagName('a');
  var n = elist[0].style.display=='inline'?'none':'inline';
  for(var i = 0; i < elist.length; i++)
    {
    elist[i].style.display = n;
    }
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