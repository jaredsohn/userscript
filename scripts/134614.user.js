// ==UserScript==
// @name           Quake Live Message Beep
// @namespace      http://userscripts.org/users/469998
// @description    Generates a beep when you get a web message on Quake Live
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum/*
// ==/UserScript==

var beep = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAACAGnIsAAAAALKNi%2BYBHgF2b3JiaXMAAAAAAUSsAAAAAAAAAHcBAAAAAAC4AU9nZ1M\
AAAAAAAAAAAAAgBpyLAEAAABgEQSsEDv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8kDdm9yYmlzKwAAAFhpcGguT3JnIGxpYl\
ZvcmJpcyBJIDIwMTIwMjAzIChPbW5pcHJlc2VudCkAAAAAAQV2b3JiaXMpQkNWAQAIAAAAMUwgxYDQkFUAABAAAGAkKQ6TZkkppZShKHmYlEhJKaWUxTCJm\
JSJxRhjjDHGGGOMMcYYY4wgNGQVAAAEAIAoCY6j5klqzjlnGCeOcqA5aU44pyAHilHgOQnC9SZjbqa0pmtuziklCA1ZBQAAAgBASCGFFFJIIYUUYoghhhhi\
iCGHHHLIIaeccgoqqKCCCjLIIINMMumkk0466aijjjrqKLTQQgsttNJKTDHVVmOuvQZdfHPOOeecc84555xzzglCQ1YBACAAAARCBhlkEEIIIYUUUogppph\
yCjLIgNCQVQAAIACAAAAAAEeRFEmxFMuxHM3RJE%2FyLFETNdEzRVNUTVVVVVV1XVd2Zdd2ddd2fVmYhVu4fVm4hVvYhV33hWEYhmEYhmEYhmH4fd%2F3fd\
%2F3fSA0ZBUAIAEAoCM5luMpoiIaouI5ogOEhqwCAGQAAAQAIAmSIimSo0mmZmquaZu2aKu2bcuyLMuyDISGrAIAAAEABAAAAAAAoGmapmmapmmapmmapmm\
apmmapmmaZlmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVlAaMgqAEACAEDHcRzHcSRFUiTHciwHCA1ZBQDIAAAIAEBSLMVyNEdzNMdzPM\
dzPEd0RMmUTM30TA8IDVkFAAACAAgAAAAAAEAxHMVxHMnRJE9SLdNyNVdzPddzTdd1XVdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVgdCQV\
QAABAAAIZ1mlmqACDOQYSA0ZBUAgAAAABihCEMMCA1ZBQAABAAAiKHkIJrQmvPNOQ6a5aCpFJvTwYlUmye5qZibc84555xszhnjnHPOKcqZxaCZ0JpzzkkM\
mqWgmdCac855EpsHranSmnPOGeecDsYZYZxzzmnSmgep2Vibc85Z0JrmqLkUm3POiZSbJ7W5VJtzzjnnnHPOOeecc86pXpzOwTnhnHPOidqba7kJXZxzzvl\
knO7NCeGcc84555xzzjnnnHPOCUJDVgEAQAAABGHYGMadgiB9jgZiFCGmIZMedI8Ok6AxyCmkHo2ORkqpg1BSGSeldILQkFUAACAAAIQQUkghhRRSSCGFFF\
JIIYYYYoghp5xyCiqopJKKKsoos8wyyyyzzDLLrMPOOuuwwxBDDDG00kosNdVWY4215p5zrjlIa6W11lorpZRSSimlIDRkFQAAAgBAIGSQQQYZhRRSSCGGm\
HLKKaegggoIDVkFAAACAAgAAADwJM8RHdERHdERHdERHdERHc%2FxHFESJVESJdEyLVMzPVVUVVd2bVmXddu3hV3Ydd%2FXfd%2FXjV8XhmVZlmVZlmVZlm\
VZlmVZlmUJQkNWAQAgAAAAQgghhBRSSCGFlGKMMcecg05CCYHQkFUAACAAgAAAAABHcRTHkRzJkSRLsiRN0izN8jRP8zTRE0VRNE1TFV3RFXXTFmVTNl3TN\
WXTVWXVdmXZtmVbt31Ztn3f933f933f933f933f13UgNGQVACABAKAjOZIiKZIiOY7jSJIEhIasAgBkAAAEAKAojuI4jiNJkiRZkiZ5lmeJmqmZnumpogqE\
hqwCAAABAAQAAAAAAKBoiqeYiqeIiueIjiiJlmmJmqq5omzKruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6QGjIKgBAAgBAR3IkR3IkRVI\
kRXIkBwgNWQUAyAAACADAMRxDUiTHsixN8zRP8zTREz3RMz1VdEUXCA1ZBQAAAgAIAAAAAADAkAxLsRzN0SRRUi3VUjXVUi1VVD1VVVVVVVVVVVVVVVVVVV\
VVVVVVVVVVVVVVVVVVVVVVVVXVNE3TNIHQkJUAABkAACNBBhmEEIpykEJuPVgIMeYkBaE5BqHEGISnEDMMOQ0idJBBJz24kjnDDPPgUigVREyDjSU3jiANw\
qZcSeU4CEJDVgQAUQAAgDHIMcQYcs5JyaBEzjEJnZTIOSelk9JJKS2WGDMpJaYSY%2BOco9JJyaSUGEuKnaQSY4mtAACAAAcAgAALodCQFQFAFAAAYgxSCi\
mFlFLOKeaQUsox5RxSSjmnnFPOOQgdhMoxBp2DECmlHFPOKccchMxB5ZyD0EEoAAAgwAEAIMBCKDRkRQAQJwDgcCTPkzRLFCVLE0XPFGXXE03XlTTNNDVRV\
FXLE1XVVFXbFk1VtiVNE01N9FRVE0VVFVXTlk1VtW3PNGXZVFXdFlXVtmXbFn5XlnXfM01ZFlXV1k1VtXXXln1f1m1dmDTNNDVRVFVNFFXVVFXbNlXXtjVR\
dFVRVWVZVFVZdmVZ91VX1n1LFFXVU03ZFVVVtlXZ9W1Vln3hdFVdV2XZ91VZFn5b14Xh9n3hGFXV1k3X1XVVln1h1mVht3XfKGmaaWqiqKqaKKqqqaq2baq\
urVui6KqiqsqyZ6qurMqyr6uubOuaKKquqKqyLKqqLKuyrPuqLOu2qKq6rcqysJuuq%2Bu27wvDLOu6cKqurquy7PuqLOu6revGceu6MHymKcumq%2Bq6qb\
q6buu6ccy2bRyjquq%2BKsvCsMqy7%2Bu6L7R1IVFVdd2UXeNXZVn3bV93nlv3hbJtO7%2Bt%2B8px67rS%2BDnPbxy5tm0cs24bv637xvMrP2E4jqVnmrZ\
tqqqtm6qr67JuK8Os60JRVX1dlWXfN11ZF27fN45b142iquq6Ksu%2BsMqyMdzGbxy7MBxd2zaOW9edsq0LfWPI9wnPa9vGcfs64%2FZ1o68MCcePAACAAQ\
cAgAATykChISsCgDgBAAYh5xRTECrFIHQQUuogpFQxBiFzTkrFHJRQSmohlNQqxiBUjknInJMSSmgplNJSB6GlUEproZTWUmuxptRi7SCkFkppLZTSWmqpx\
tRajBFjEDLnpGTOSQmltBZKaS1zTkrnoKQOQkqlpBRLSi1WzEnJoKPSQUippBJTSam1UEprpaQWS0oxthRbbjHWHEppLaQSW0kpxhRTbS3GmiPGIGTOScmc\
kxJKaS2U0lrlmJQOQkqZg5JKSq2VklLMnJPSQUipg45KSSm2kkpMoZTWSkqxhVJabDHWnFJsNZTSWkkpxpJKbC3GWltMtXUQWgultBZKaa21VmtqrcZQSms\
lpRhLSrG1FmtuMeYaSmmtpBJbSanFFluOLcaaU2s1ptZqbjHmGlttPdaac0qt1tRSjS3GmmNtvdWae%2B8gpBZKaS2U0mJqLcbWYq2hlNZKKrGVklpsMeba\
Wow5lNJiSanFklKMLcaaW2y5ppZqbDHmmlKLtebac2w19tRarC3GmlNLtdZac4%2B59VYAAMCAAwBAgAlloNCQlQBAFAAAQYhSzklpEHLMOSoJQsw5J6lyT\
EIpKVXMQQgltc45KSnF1jkIJaUWSyotxVZrKSm1FmstAACgwAEAIMAGTYnFAQoNWQkARAEAIMYgxBiEBhmlGIPQGKQUYxAipRhzTkqlFGPOSckYcw5CKhlj\
zkEoKYRQSiophRBKSSWlAgAAChwAAAJs0JRYHKDQkBUBQBQAAGAMYgwxhiB0VDIqEYRMSiepgRBaC6111lJrpcXMWmqttNhACK2F1jJLJcbUWmatxJhaKwA\
A7MABAOzAQig0ZCUAkAcAQBijFGPOOWcQYsw56Bw0CDHmHIQOKsacgw5CCBVjzkEIIYTMOQghhBBC5hyEEEIIoYMQQgillNJBCCGEUkrpIIQQQimldBBCCK\
GUUgoAACpwAAAIsFFkc4KRoEJDVgIAeQAAgDFKOQehlEYpxiCUklKjFGMQSkmpcgxCKSnFVjkHoZSUWuwglNJabDV2EEppLcZaQ0qtxVhrriGl1mKsNdfUW\
oy15pprSi3GWmvNuQAA3AUHALADG0U2JxgJKjRkJQCQBwCAIKQUY4wxhhRiijHnnEMIKcWYc84pphhzzjnnlGKMOeecc4wx55xzzjnGmHPOOeccc84555xz\
jjnnnHPOOeecc84555xzzjnnnHPOCQAAKnAAAAiwUWRzgpGgQkNWAgCpAAAAEVZijDHGGBsIMcYYY4wxRhJijDHGGGNsMcYYY4wxxphijDHGGGOMMcYYY4w\
xxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYW2uttdZaa6211lprrbXWWmutAEC%2FCgcA%2FwcbVkc4KRoLLDRkJQAQDgAAGM\
OYc445Bh2EhinopIQOQgihQ0o5KCWEUEopKXNOSkqlpJRaSplzUlIqJaWWUuogpNRaSi211loHJaXWUmqttdY6CKW01FprrbXYQUgppdZaiy3GUEpKrbXYY\
ow1hlJSaq3F2GKsMaTSUmwtxhhjrKGU1lprMcYYay0ptdZijLXGWmtJqbXWYos11loLAOBucACASLBxhpWks8LR4EJDVgIAIQEABEKMOeeccxBCCCFSijHn\
oIMQQgghREox5hx0EEIIIYSMMeeggxBCCCGEkDHmHHQQQgghhBA65xyEEEIIoYRSSuccdBBCCCGUUELpIIQQQgihhFJKKR2EEEIooYRSSiklhBBCCaWUUko\
ppYQQQgihhBJKKaWUEEIIpZRSSimllBJCCCGUUkoppZRSQgihlFBKKaWUUkoIIYRSSimllFJKCSGEUEoppZRSSikhhBJKKaWUUkoppQAAgAMHAIAAI%2Bgk\
o8oibDThwgNQaMhKAIAMAABx2GrrKdbIIMWchJZLhJByEGIuEVKKOUexZUgZxRjVlDGlFFNSa%2BicYoxRT51jSjHDrJRWSiiRgtJyrLV2zAEAACAIADAQI\
TOBQAEUGMgAgAOEBCkAoLDA0DFcBATkEjIKDArHhHPSaQMAEITIDJGIWAwSE6qBomI6AFhcYMgHgAyNjbSLC%2BgywAVd3HUghCAEIYjFARSQgIMTbnjiDU\
%2B4wQk6RaUOAgAAAAAAAQAeAACSDSAiIpo5jg6PD5AQkRGSEpMTlAAAAAAA4AGADwCAJAWIiIhmjqPD4wMkRGSEpMTkBCUAAAAAAAAAAAAICAgAAAAAAAQ\
AAAAICE9nZ1MABC4zAAAAAAAAgBpyLAIAAACCO1oyFDAXOD0YFhgtLjomKCglJiYnLZB7%2FIZvzVABNyymfxFwPEf9oc9MOpNf%2FIEPfOADH%2FiGb%2F\
yNv%2FGCBU%2BePHliHza2sWgAJJdfe7P78lEFU9zauwAA6KOsF71oCwD6ST7U%2B6d38QHPE%2F0JSP8ABAAAAAAAYM3zPIf5%2FHlDmBgrTq1%2B5fmvO\
m7smaqNg%2BXf%2F%2Ft%2FfxF8CbY5XvOP9%2BniUXBOsyUEfgAAAAAAAAAA0IPBYMDg1psF%2F%2F7%2F%2F6uXcwoAwNjFq3sv%2BvfeT%2Ff8qN7xew\
7sPx%2FUkj8e2qkDYYrbDACAmgl0FlZRKqSQYwD8kl93t7vroB7GuOn5BABAx3ztpJUWHJNf99DuDP4VprjVkwYAgI9iq8aLXhwAHJPf99rNQFhOvwXcQHG\
wEWHPiB2d2z1FXJFvf%2ByzX%2Bl1%2FlMVFXmbJLNL6xsAlIbDlADAgeX0b8DxHOlGol4x2eOsxv4l1TvigA%2F5J1yfybcd8X63zGplsv9oAHopnvIvGV\
NZ%2BYX3Afahh2EYhmEYhuH%2FPwUAAAAAANR3d%2FvpZZstp84mPNOLs%2FXH48e%2F%2Ft9XZ3EBAAB%2BKZ74l1RVCcH7FAL9BgACAAAAAAAAEF0FmJA\
pZ%2FtSyLkKF5UEAJ4ZntWXtFCJgvepgH4DAIUBAAAAAAAA8psMAQAR6cb0kXXvUC6xAAB%2BCV6Up%2FRQiYT3qQr6DQBUAAAAAAAAgPWoCwAT0r1NfenK\
x5YHqwEAXvldlJd0FRIJ31MN9gUADQAAAAAAAKDsIADBlJp7MqXU%2BAnnBR7ZndWXNFeJgu8pAP0GAAYAAAAAAADw%2F3YDwLeLHb7tFzlvQzsAfrgdlZc\
kFxK54nuKwL4AIAAAAAAAAADzu0sBIBWqCqVCuWKD0woemB3Dl5QQGgXfXQv6DQA0AAAAAAAAQL%2FvAQBEpBvTjaxXnm6OBQC%2BR53sl1QvjYL3roB9AU\
AFIGAAFAAAAFByJgBCui%2Bryqpc7HSvHgQ80DTsBw9%2BxjxyN6n%2BqP%2B47TLoNwDQEALfT4TQiikAAMD27zSMlRZmtvI81blyyZH1Fp0DAPW39sy%2\
Fl3%2BQjd90cd5GORUqIAFe%2BZLmp9lZ3dTdguQbvvwHtb2V6EoQ2DJkqVwtlmqW5IjYpXCLslfJ7yh8hM62lyLlL6rYQnpVS2iuJ68NpXpji6aPRUu7%2\
FcUuLWhoNgCeZbxlThHhruaDZKfeh2N16RdmAYygKjIDDAAATA6%2F%2Fs9XM9MaP9QrD6fMt%2Fn5Sy%2B%2B%2Bv%2B%2FK5fms63hS0qe8ewPVqDk2Z9\
pbSaAxcW%2F%2Fv3FxcW%2Ff6KLi8iXlDzj2UtKnlFSUuclJXg9Pz%2B7bzfcrgtwnOMAcH0NcKqCnQA%3D';

var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQU\
AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAARdJREFUOE%2FN0q9rgkEcx3F13eCwLAkODWPC\
%2FoNhsIqaTSIsiMJgYzCeRwwatImmNZNpCrJ%2FwKBNo4LNZvJHWBBE39%2BHGxzPFJ%2FBgsKLu%2FP53ueOu3O5LvpnmuYN3vRNMg4jeXbjFN1jjuVPM\
X0f7rCS9mQIH2NYY28L6DB%2BRQkdK4COFznklTLtVk22AhBQEx%2B08Td9vwQ8asUywU4CrtWObmmHSKEvraMAtVPZfhZ1FPGBl78EtJhQQBUVNPHuKIBC\
D2aI4hNP6CIjAXJAPXwpI9s5yBnIlY4h17hBCAtEfl0lf16hoYVY78AwDFmsBjmLBCZwH30LfJDiZ%2BygP6Q44yCmSDt5jbLSwPaU5drbJ1c%2Fm%2FrfB\
QfPuiCaG%2BPrxAAAAABJRU5ErkJggg%3D%3D';

var mute = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAALGPC%2FxhBQAAAAlwSFlzAAAOw\
gAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAABx0lEQVQ4T5WTS0sCURTHpV0t%2BwA%2B8bEoUQM3gmCLPoEkrnTj\
A6RGrXyMj00UVNSiVRRUBK2EvkEFbmzXrkVBCwOJNlEmkWXT%2F4xnTCeDGvhxH3P%2B%2F3vuvedqNKpP0GqdYAdcgzZDfZpzquN7Y%2FwcBXvgE0i%2FQ\
P92KXbAiMVVFr2i3QQuMR7Xl3K5IvV5jv5JSYvlasCEV6ZV62CC3Mvl8iSog0caY94LXpTMklZrRc6C90ypkbsinoHwCUhkwOKmLNbr3wSd7p2NnBrBYNin\
QdrtPkPwPFgBbRZLYiRCwhYLWjTGFuisJMFoPCSDOxoUEglabQAxGqWg7qGiXfB4goipZf3%2BJXnOZGrQFuR0SoXCMLFyG818KFSFOAK2cbDLnNHHUANeu\
SvuZuCF8AgIYL2Uz699G6i2oBLLZwDRCLgB0%2BAkFwyu8hbuNUmz%2BZgGiz7fbT4cruFMOryyRGZ0C3yll2jHwXPSZjuQ68Fmq6ivUbmqNotlA6Xq0N8Q\
Y7FTXCOVuITWpdQClWfvwHjPaQg6%2FQbZQGAOogbFphyOc%2FU7%2BFHKxUxmtiSKFxBMgS0uNilltz%2BgEseGvQfK5P%2BPqd%2BJS%2FvPz%2FkLiW5\
rFPxGFSUAAAAASUVORK5CYII%3D';

// contentEval taken from http://userscripts.org/scripts/show/100842
function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')("' + beep + '","' + icon + '","' + mute + '");';
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function (beep, icon, mute) {
	if (typeof quakelive != 'object') { return; }
	var prefs = {enable:true,backgroundOnly:false,muteActiveChat:true,muteWhenInGame:true,useDefaultBeep:true,customBeep:''};
	var prefText = {enable:'Enable message beep',backgroundOnly:'Background only',muteActiveChat:'Mute active chat',muteWhenInGame:'Mute when in-game',useDefaultBeep:'Use default beep'};
	var tmp = amplify.store('GM_messagebeep'),i;
	for (i in tmp) {
		if (typeof prefs[i] != 'undefined') {
			prefs[i] = tmp[i];
		}
	}
	var audio = new Audio(prefs['useDefaultBeep'] ? beep : prefs['customBeep']);
	function setBeep(customBeep) {
		if (customBeep) {
			prefs['useDefaultBeep'] = false;
			audio.src = prefs['customBeep'] = customBeep;
		} else {
			prefs['useDefaultBeep'] = true;
			prefs['customBeep'] = '';
			audio.src = beep;
		}
		audio.load();
		amplify.store('GM_messagebeep', prefs);
	}
	$('body').append('<ul id="GM_mbeepmenu" class="contextMenu" style="width:160px"></ul>');
	var oldOnRosterUpdated = quakelive.mod_friends.roster.UI_OnRosterUpdated;
	quakelive.mod_friends.roster.UI_OnRosterUpdated = function () {
		var ret = oldOnRosterUpdated.apply(this, arguments);
		quakelive.mod_friends.node.find('#im-header span').css('top', '9px')
		.append('<img id="GM_mbeepicon" style="margin-left:5px;vertical-align:middle;position:relative;top:-1px;right:-1px" src="' + (prefs['enable'] ? icon : mute) + '"/>')
		.find('#GM_mbeepicon').bind('mousedown', function (event) { event.button = 2; })
		.contextMenu({menu:'GM_mbeepmenu',onBeforeShow:function (menu) {
			var tmp = '';
			for (i in prefText) {
				tmp += '<li id="GM_mbeep_' + i + '"><a href="#' + i + '">' + (prefs[i] ? '&#x2714; ' : '&#x2718; ') + prefText[i] + '</a></li>';
			}
			menu.html(tmp);
			if (prefs['enable']) {
				$('#GM_mbeepmenu li').removeClass('disabled');
			} else {
				$('#GM_mbeepmenu li').addClass('disabled');
				$('#GM_mbeep_enable').removeClass('disabled');
			}
			if (quakelive.IsGameRunning()) { $('#GM_mbeep_useDefaultBeep').addClass('disabled'); }
		}}, function (setting, menu) { // Selection handler
			if (setting == 'useDefaultBeep') {
				if (!prefs[setting]) { setBeep(); return; }
				var loaded;
				qlPrompt({title:'Select file:',body:'<input id="GM_mbeepfile" type="file" accept="audio/*"><div id="GM_qlmb_fileinfo"></div>',ok:function () {
					setBeep(loaded);
					qlHidePrompt();
				}});
				$('#GM_mbeepfile').change(function () {
					loaded = undefined;
					var file = this.files[0];
					if (!file) { return; }
					var tmp = new Audio();
					if (file.size > 1024*250) {
						$('#GM_qlmb_fileinfo').html('<span style="color:red">File is too large (250kB max)</span>');
					} else if (!tmp.canPlayType(file.type)) {
						$('#GM_qlmb_fileinfo').html('<span style="color:red">Unsupported filetype</span>');
					} else {
						$('#GM_qlmb_fileinfo').text('Loading file ' + file.name + '...');
						var reader = new FileReader();
						reader.onloadend = function (obj) {
							if (reader.readyState != 2) {
								$('#GM_qlmb_fileinfo').html('<span style="color:red">Error reading file</span>');
							} else {
								tmp.src = obj.target.result;
								tmp.addEventListener('error',function () { $('#GM_qlmb_fileinfo').html('<span style="color:red">File could not be decoded</span>'); },false);
								tmp.addEventListener('loadeddata',function () {
									loaded = obj.target.result;
									$('<a/>', {href:'javascript:void(0)',text:'Click here to test'}).appendTo($('#GM_qlmb_fileinfo').html('')).click(function () { tmp.play(); })
								},false);
								tmp.load();
							}
						}
						reader.readAsDataURL(file);
					}
				});
			} else {
				prefs[setting] = prefs[setting] ? false : true;
				$('#GM_mbeepicon').attr('src',prefs['enable'] ? icon : mute);
				amplify.store('GM_messagebeep', prefs);
			}
		});
		return ret;
	}
	var userCheckedMessage = false,pageActive = true,oldOnMessage = IM_OnMessage;
	IM_OnMessage = function (message_json) {
		var selected = quakelive.mod_friends.roster.selectedContact,isActive = userCheckedMessage && selected && quakelive.Eval(message_json).who == selected.jid.bare && pageActive;
		if (prefs['enable'] && (!(quakelive.IsGameRunning() && quakelive.cvars.GetIntegerValue('r_fullscreen') || pageActive) || !prefs['backgroundOnly']) &&
			(!prefs['muteActiveChat'] || !isActive) && (!prefs['muteWhenInGame'] || !quakelive.IsGameRunning())) {
			if (audio.readyState > 1) { audio.currentTime = 0; }
			audio.play();
		}
		var ret = oldOnMessage.apply(this, arguments);
		if (!selected && quakelive.mod_friends.roster.selectedContact) {
			userCheckedMessage = false;
			$('#im').mousedown(function () { userCheckedMessage = true; });
		}
		return ret;
	}
	$(window).blur(function () { pageActive = false; });
	$(window).focus(function () { pageActive = true; });
	
	// Should fix a QL bug which manifests as a missing "friends online" count and chat tip after logging in.
	var oldFinishAnimateVert = quakelive.mod_friends.roster.UI_FinishAnimateVert;
	quakelive.mod_friends.roster.UI_FinishAnimateVert = function () {
		var ret = oldFinishAnimateVert.apply(this, arguments);
		quakelive.mod_friends.roster.UI_OnRosterUpdated();
		quakelive.mod_friends.roster.DisplayChatAreaHelp();
		return ret;
	}
});
