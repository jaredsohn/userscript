// ==UserScript==
// @name          IMDb Ft-betyg
// @namespace     DScript
// @description   Personliga betyg på IMDb
// @include       http://*imdb.com/title/tt*/
// ==/UserScript==

unsafeWindow.filmServiceCallback = { };

var FilmService = function(apiKey) {
	this.apiKey = apiKey;
	this.id = 'fs_'+(apiKey || 'xxxxx').substring(0, 5)+'_'+Math.random().toString().replace(/[\.,]/g,'');
	this.queue = [];
}

FilmService.prototype.isArray = function(obj) {
	if(!obj) return false;
	return (typeof obj == 'object') && (obj.toString().indexOf(',') >= 0);
}

FilmService.prototype.getAuthUrl = function(auth, target) {
	return ['http://www.filmtipset.se/login.cgi?accesskey=', this.apiKey, '&userkey=', auth, '&target=', encodeURIComponent(target) ].join('');
}

FilmService.prototype.constructUrl = function(action, auth, params, callback) {
	var base = 'http://www.filmtipset.se/api/api.cgi?accesskey='+this.apiKey+'&returntype=json&action='+action;

	if(callback)
		base += '&callback='+callback;

	if(auth) {
		if(typeof auth == 'number' || parseInt(auth).toString() == auth.toString())
			base += '&usernr='+auth;
		else
			base += '&userkey='+auth;
	}

	if(params) {
		var sparams = this.serialize(params);
		if(sparams.length > 0)
			base += '&'+sparams;
	}

	return base;
}

FilmService.prototype.bind = function(method) {
	var context = this;
	return function() { method.apply(context) };
}

FilmService.prototype.serialize = function(obj) {
	var str = [];

	for(var i in obj) {
		if(str.length > 0)
			str.push('&');

		var hasChildren = typeof obj[i] == 'object' && (obj[i].toString().indexOf('object') >= 0 || this.isArray(obj[i]));
		if(!hasChildren) {
			str.push(i);
			str.push('=');
			str.push(encodeURIComponent(obj[i]));
		}
	}

	return str.join('');
}

FilmService.prototype.get = function(action, auth, params, success, error) {
	if(!this.apiKey && typeof error == 'function')
	{
		error('Access key not set');
		return;
	}

	var callback = null;
	var req = { action: action, auth: auth, params: params };

	if(typeof success == 'function') {
		var callbackId = 'callback_'+this.id+'_'+Math.random().toString().replace(/[\.,]/g, '');
		var callback = 'window.filmServiceCallback.'+callbackId;

		unsafeWindow.filmServiceCallback[callbackId] = function(res) { success(res[0], req); }
	}

	try {
		var url = this.constructUrl(action, auth, params, callback);

		var siteHead = document.getElementsByTagName("head")[0];         

		if(!siteHead)
			throw('Document HEAD tag is missing');

		var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.src = url;
		siteHead.appendChild(newScript);
	} catch(ex) {
		if(typeof error == 'function')
		{
			if(typeof ex == 'string')
				error(ex, req);
			else
				error(ex.message, req);
		}
	}
}

var fs = new FilmService('xz1k2Kt3KvW70YNF04LmA');
var unr = GM_getValue('usernr', '');
fs.get('imdb', unr, { id: location.href.replace(/.*title\/tt(.*?)\//, "$1") }, function(res) {
	var grade = res.data[0].movie.grade;
	var ft = res.data[0].movie.filmtipsetgrade;

	var container = document.getElementsByClassName('starbar')[0].parentNode
	var newstuff = '<div class="starbar static"><div class="outer" style="width: 100px;"><div class="inner" style="width: '+(20*ft.value)+'px;"></div></div></div><div class="meta" style="top: 22px; left: 157px;"><b>'+(1*ft.value)+'/5</b> Officiellt betyg. '+ft.count+' röster</div><div class="bottom"> </div>';

	container.innerHTML += newstuff;

	if(grade.type == 'seen' || grade.type == 'calculated')
	{
		var gtype = grade.type == 'seen' ? 'Ditt' : 'Beräknat';
		newstuff = '<div class="starbar static"><div class="outer" style="width: 100px;"><div class="inner" style="width: '+(20*grade.value)+'px;"></div></div></div><div class="meta" style="top: 44px; left: 157px;"><b>'+(1*grade.value)+'/5</b> '+gtype+' betyg.</div><div class="bottom"> </div>';

		container.innerHTML += newstuff;
	}

	if(!unr) {
		container.innerHTML += '<div><a href="javascript:void(0);" id="gmChangeUser">Välj Filmtipset-användare för personliga betyg</a></div>';
	} else {
		container.innerHTML += ('<div><a href="javascript:void(0);" id="gmChangeUser">Betyg för: '+res.user.name+'</a></div>');
	}

	document.getElementById('gmChangeUser').addEventListener('click', function() {
		var uid = prompt('Medlemsnummer på filmtipset: ', unr);
		GM_setValue('usernr', uid);
		location.reload();
	}, false);
        
	container.style.height = '60px';
}, function(err) { alert(err); });