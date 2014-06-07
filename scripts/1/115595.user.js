// ==UserScript==
// @id             shoutboxMancos
// @name           Shoutbox para Mancos
// @namespace      jotapdiez
// @description    Simil Chat para Mancos!!
// @version		   1.2
// @include        *.ogame.com.ar/game/index.php?page=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         jotapdiez
// ==/UserScript==

// Recent changes:
/*

22.10.2011 v1.2:
+ Eliminado codigo inutil


*/
var shoutboxMancos = function()
{
	var version = '1.2';
	var script_id = '115595';
	
	var Utils = {
		showUpdateMarker: function(newversion)
		{
			var btnAntiOptions = $('#links #menuTable').prepend( $('<li>').append( $('<a>').addClass('menubutton').attr('href','http://userscripts.org/scripts/source/'+script_id+'.user.js').attr('title','Actualizar shoutBox a la version '+newversion).html('<span style="color:yellow;">[!]</span> <span>ShoutBox v'+newversion+'</span>')));
		},
		
		handleUpdateResponse: function(response)
		{
			try {
				var newversion = response.responseText;
				if (!newversion) return;
				
				var index     = newversion.indexOf('@version');
				var end_index = newversion.indexOf('//', index);
				newversion    = newversion.substring(index, end_index).replace('@version','').replace(/\s/gi, '');
				
				var actual_ver_num = parseInt(version   .replace(/[^0-9]*/gi, ''));
				var newversion_num = parseInt(newversion.replace(/[^0-9]*/gi, ''));
				
				if (actual_ver_num < newversion_num)
					this.showUpdateMarker(newversion);
			} catch (e) { Utils.log(e) }
		},
		
		checkUpdate: function()
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+script_id+'.meta.js',
				onload: function(resp) { Utils.handleUpdateResponse(resp); }
			});
		}
	};
	
	
	var data = {
		nick: '',
		coords:''
	};
	var shoutBox = {
		createIframe: function()
		{
			var iframe = $('<iframe>').attr('src', "http://unknowngames.com.ar/index.html?nick="+data.nick+'&coords='+data.coords).css({'height':'280px','width':'320px'});
			$('#rechts').append( iframe );
		}
	};
	
	var Init =
	{
		load: function()
		{
			data.nick = $('#playerName .textBeefy').text();
			data.coords = $('#rechts a.active span.planet-koords').text();
		}
	};
	
	Init.load();
	Utils.checkUpdate();
	shoutBox.createIframe();
};

shoutboxMancos();