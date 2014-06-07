// ==UserScript==
// @name           Yet Another YouTube alternate Player (mplayerplug-in)
// @namespace      userscripts.org
// @description    replaces youtube's flash player with http://mplayerplug-in.sf.net
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/w*
// ==/UserScript==

var dUrl = document.URL;

var vidID = document.location.toString().split("v=")[1].split("&")[0];

var fv = document.getElementById('movie_player').getAttribute('flashvars');

var srcWithT = 'http://'+document.domain+'/get_video?video_id='+vidID+'&t='+fv.split("t=")[1].split("&")[0];

var pD = document.getElementById('watch-player-div');

var aLoader = 'R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQE'+
				'BDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F'+
				'VFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAA'+
				'EAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4'+
				'IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1'+
				'BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEv'+
				'qxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEE'+
				'TAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAF'+
				'eCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZI'+
				'EiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5L'+
				'coE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GI'+
				'LQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQp'+
				'BAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAIC'+
				'aRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik'+
				'7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAs'+
				'AAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYD'+
				'lEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmN'+
				'LQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN'+
				'8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HU'+
				'rY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkK'+
				'AAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pl'+
				'eBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQM'+
				'DAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv'+
				'4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQE'+
				'jsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAA'+
				'LAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJi'+
				'AIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooC'+
				'Bg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJK'+
				'EHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASP'+
				'g0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAA'+
				'EAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYY'+
				'PAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqY'+
				'YwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==';

		function handleErr(msg,url,l){

			return true;
			
		}
	
		onerror=handleErr;



		var sGetter = document.createElement('script');
		sGetter.type = "text/javascript";
		sGetter.innerHTML = "try{"+
							"var vidID1 = document.URL.split('v=')[1].split('&')[0];"+
							"var gM = document.getElementById('movie_player');"+
							"var getMp1 = gM.getAttribute('flashvars');"+
							"var srcWithT = 'http://'+document.domain+'/get_video?video_id='+vidID1+'&t='+getMp1.split('t=')[1].split('&')[0];"+
							"var httpRequest = new XMLHttpRequest();"+
							"httpRequest.onreadystatechange = function() { "+
							"	if(httpRequest.readyState == 4 && httpRequest.status == 303){"+
							"				var respHed = httpRequest.getResponseHeader('Location');"+						
							"				var spanna = document.createElement('span');"+
							"				spanna.id = 'spannaResphead';"+
							"				spanna.style.visibility = 'hidden';"+
							"				spanna.textContent = respHed;"+
							"				document.getElementsByTagName('body')[0].appendChild(spanna);"+
							"	}"+
							"};"+
							"httpRequest.open('HEAD', srcWithT, true);"+
							"httpRequest.send(null);"+
							"}"+
							"catch (err){"+
							"}";
		
document.getElementsByTagName('body')[0].appendChild(sGetter);


var loaderThere;

function timedCount(){

	var iCanHazSpanna = document.getElementById('spannaResphead');

	if( ( iCanHazSpanna && document.getElementById('tempLoader') )== null){
	
		pD.innerHTML = '<div id="tempLoader" style="position:relative;width:480px;height:395px;"><p style="position:relative;top:50%;left:40%;font-weight:bold;">Loading&nbsp; '+
						'<img style="position:relative;" src="data:image/gif;base64,'+aLoader+'" /></p></div>';			
	
		loaderThere = true;
	
		window.setTimeout(timedCount,5);
	
	}
	else if( ( iCanHazSpanna == null) && loaderThere){
	
		window.setTimeout(timedCount,5);
	
	}
	else if(iCanHazSpanna){
	
		//var spanTex = encodeURIComponent(iCanHazSpanna.textContent);
		var spanTex = iCanHazSpanna.textContent;
		
		pD.innerHTML = '<OBJECT classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" width="425" height="360" codebase="http://www.apple.com/qtactivex/qtplugin.cab" type="video/quicktime"><param name="src" value="' + spanTex +'"><param name="autoplay" value="true"><param name="controller" value="true"><param name="loop" value="true"><EMBED src="' + spanTex + '" width="425" height="350" autoplay="true" controller="true" loop="true" pluginspage="http://www.apple.com/quicktime/download/" type="video/quicktime"></EMBED></OBJECT> '

		clearTimeout();
	
	}
}

timedCount();

			

