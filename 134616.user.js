// ==UserScript==
// @name           Quake Live Auto-Config
// @namespace      http://userscripts.org/users/469998
// @description    Executes different config files depending on map and gametype
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum/*
// ==/UserScript==

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

contentEval(function () {
	if (typeof quakelive != 'object') { return; }
	var latched = {cvars:['r_allowextensions','r_allowsoftwaregl','r_aspectratio','r_bloompasses','r_colorbits',
		'r_colormiplevels','r_customheight','r_customwidth','r_depthbits','r_detailtextures','r_displayrefresh',
		'r_enablebloom','r_enablecolorcorrect','r_enablepostprocess','r_ext_compiled_vertex_array','r_ext_compressed_textures',
		'r_ext_gamma_control','r_ext_multitexture','r_ext_texture_env_add','r_floatingpointfbos','r_fullbright','r_gldriver',
		'r_ignorefastpath','r_ignorehwgamma','r_inbrowsermode','r_intensity','r_mapoverbrightbits','r_mapoverbrightcap',
		'r_maskminidriver','r_mode','r_overbrightbits','r_picmip','r_roundimagesdown','r_simplemipmaps','r_singleshader',
		'r_stencilbits','r_stereo','r_subdivisions','r_texturebits','r_vertexlight'],changes:[]},
		currentGame = {id:'',gametype:'',map:''},
		oldLaunchGame = LaunchGame,ready;
	LaunchGame = function (params, server) {
		ready = false;
		return oldLaunchGame.apply(this, arguments);
	}
	var oldOnCommNotice = OnCommNotice;
	OnCommNotice = function (error, data) {
		if (error == 0) {
			var msg = quakelive.Eval(data),gid;
			if (msg.MSG_TYPE == 'serverinfo' && (gid = (msg.sv_gtid || 0) + '.' + msg.mapname) != currentGame.id) {
				currentGame.gametype = ['ffa', 'duel', 'sp', 'tdm', 'ca', 'ctf', '1fctf', , 'har', 'ft', 'dom', 'a&d', 'rr'][msg.g_gametype];
				currentGame.id = gid;
				latched.changes = [];
				currentGame.map = msg.mapname;
				ready = true;
				qz_instance.SendGameCommand('set GM_autoconfig 0; exec autoexec.cfg;');
			}
		}
		return oldOnCommNotice.apply(this, arguments);
	}
	quakelive.AddHook('OnGameExited', function () { currentGame = {id:'',gametype:'',map:''}; });
	var oldOnCvarChanged = OnCvarChanged;
	OnCvarChanged = function (name, value, replicate) {
		if (name == 'GM_autoconfig') {
			if (ready) {
				var i;
				if (parseInt(value)) {
					for (i in latched.changes) {
						qz_instance.SendGameCommand('clearcvar ' + latched.cvars[i] + ';');
					}
					switch (value) {
					case '1':
						qz_instance.SendGameCommand('exec autoconf\\' + currentGame.gametype + '.cfg; set GM_autoconfig 2;');
						break;
					case '2':
						qz_instance.SendGameCommand('exec autoconf\\' + currentGame.map + '.cfg; set GM_autoconfig 3;');
						break;
					case '3':
						qz_instance.SendGameCommand('exec autoconf\\' + currentGame.map + '.' + currentGame.gametype + '.cfg; set GM_autoconfig 0;');
					}
				} else if (latched.changes.length) {
					for (i in latched.changes) {
						qz_instance.SendGameCommand('seta ' + latched.cvars[i] + ' "' + latched.changes[i] + '";');
					}
					qz_instance.SendGameCommand('vid_restart;');
					latched.changes = [];
				}
			}
			replicate = 0;
		} else if (quakelive.cvars.GetIntegerValue('GM_autoconfig')) {
			var i;
			for (i in latched.cvars) {
				if (name.toLowerCase() == latched.cvars[i]) {
					if (value) {
						latched.changes[i] = value;
					}
					break;
				}
			}
		}
		return oldOnCvarChanged.apply(this, arguments);
	}
});
