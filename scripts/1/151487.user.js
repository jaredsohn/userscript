// ==UserScript==
// @name           Quake Live cm/360 to sensitivity
// @version        1
// @namespace      http://userscripts.org/users/kry
// @description    This script lets you use kry_cm360 to input the cm/360 you'd want to use and calculates your new sensitivity from it. Requires the use of m_cpi.
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

/************************************************************
Licensed for unlimited modification and redistribution
as long as this notice is kept intact.
Quake Live cm/360 to sensitivity script made by kry
************************************************************/

// contentEval taken from http://userscripts.org/scripts/show/100842
function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();';
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

// Adding console commands originally by drayan. Thank you for your awesome userscripts!
contentEval(function () {
	if (typeof quakelive != 'object') { return; }
	var commands = {
		kry_cm360:{
			params:true,
			dft:'cm/360 you would like to use. type kry_cm360 help for help',
			fn:function (val) {
                if (val=="help")
                {
                    qz_instance.SendGameCommand('echo ^1Usage of kry_cm360:;');
                    qz_instance.SendGameCommand('echo ^11. ^7set your m_cpi:;');
                    qz_instance.SendGameCommand('echo ^1- ^7use the cpi / dpi setting you use with your mouse;');
                    qz_instance.SendGameCommand('echo ^12. ^7set your m_yaw and m_pitch:;');
                    qz_instance.SendGameCommand('echo ^1- ^7these both should be at 0.022 for accurate cm/370;');
                    qz_instance.SendGameCommand('echo ^1- ^7if you would like to use different horizontal and vertical sens, change m_pitch;');
                    qz_instance.SendGameCommand('echo ^13. ^7if using in_mouse -1, set your windows sensitivity to 6/11:;');
                    qz_instance.SendGameCommand('echo ^1- ^7I would recommend using in_mouse 2 for raw mouse input;');
                    qz_instance.SendGameCommand('echo ^14. ^7apply the cm/360 you would like to use;');
                    qz_instance.SendGameCommand('echo ^1- ^7cm/360 means how much you would like to move your mouse for a full circle;');
                    qz_instance.SendGameCommand('echo ^1- ^7if you are just changing to use m_cpi, google sensitivity cm360 calculator to know your current cm/360;');
                    qz_instance.SendGameCommand('echo ^1- ^7when you know the value you would like to use, apply it to kry_cm360 (for example kry_cm360 36);');
                    qz_instance.SendGameCommand('echo ^1---;');
                    qz_instance.SendGameCommand('echo ^7Sometimes fine tuning is good to be made with sensitivity;');
                    qz_instance.SendGameCommand('echo ^7Purpose of this script is only to help;');
                    qz_instance.SendGameCommand('echo ^1Trivia: ^7using m_cpi means your sensitivity is degrees per cm;');
                    qz_instance.SendGameCommand('echo ^1Script made by ^7kr^1y;');
                }
                else if (val>0 || val<0)
                {
                    // added possibility of negative sens for some reason :>
                    val = parseInt(val);
                    var newsens = 360 / val;
                    qz_instance.SendGameCommand('echo ^7Your sensitivity with ^1' + val + '^7cm/360 now is set to ^1' + newsens + '^7;');
                    qz_instance.SendGameCommand('seta sensitivity ' + newsens + ';');
                    qz_instance.SendGameCommand('echo ^1If you have set sensitivity in autoexec, remember to update that;');
                }
			}
		},
        kry_sensitivity:{
			params:true,
			dft:'calculates your cm/360 fron sensitivity - only for info',
			fn:function (val) {
                if (val>0 || val<0)
                {
                    val = parseInt(val);
                    var cm360 = 360 / val;
                    qz_instance.SendGameCommand('echo ^1If using values said in kry_cm360 help;');
                    qz_instance.SendGameCommand('echo ^7sensitivity ^1' + val + ' ^7would mean:;');
                    qz_instance.SendGameCommand('echo ^1' + cm360 + '^7cm/360:;');
                }
			}
		}
	};
	var oldLaunchGame = LaunchGame,ready;
	LaunchGame = function (params, server) {
		ready = false;
		var i;
		for (i in commands) {
			if (commands[i].params) {
				params.Append('+set ' + i + ' "^7"');
				params.Append('+set ' + i + ' "' + commands[i].dft + '"');
			} else {
				commands[i].dft = 0;
				params.Append('+set GM_qlfc_' + i + ' "0"');
				params.Append('+alias ' + i + ' "set GM_qlfc_' + i + ' 1"');
			}
		}
		return oldLaunchGame.apply(this, arguments);
	}
    var oldOnCommNotice = OnCommNotice;
	OnCommNotice = function (error, data) {
		if (error == 0) {
			var msg = quakelive.Eval(data);
			if (msg.MSG_TYPE == 'serverinfo') {
				ready = true;
			}
		}
		return oldOnCommNotice.apply(this, arguments);
	}
	var oldOnCvarChanged = OnCvarChanged;
	OnCvarChanged = function (name, value, replicate) {
		var i;
		for (i in commands) {
			if ((commands[i].params && name == i) || (!commands[i].params && name == 'GM_qlfc_' + i)) {
				if (value != commands[i].dft) {
					if (ready) {
						commands[i].fn(value);
					}
					qz_instance.SendGameCommand('set ' + name + ' "' + commands[i].dft + '";');
				}
				replicate = 0;
			}
		}
		return oldOnCvarChanged.apply(this, arguments);
	}
});
