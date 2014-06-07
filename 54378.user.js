// ==UserScript==
// @name           Fix Merriam-Webster Audio
// @description    Listen to pronunciation on Merriam-Webster without popping up a window and with no plugin required.
// @version        0.0.3
// @include        http://merriam-webster.com/dictionary/*
// @include        http://*.merriam-webster.com/dictionary/*
// @include        http://merriam-webster.com/wdictionary/*
// @include        http://*.merriam-webster.com/wdictionary/*
// @include        http://m-w.com/dictionary/*
// @include        http://*.m-w.com/dictionary/*
// @include        http://m-w.com/wdictionary/*
// @include        http://*.m-w.com/wdictionary/*
// @include        http://merriam.com/dictionary/*
// @include        http://*.merriam.com/dictionary/*
// @include        http://merriam.com/wdictionary/*
// @include        http://*.merriam.com/wdictionary/*
// @include        http://webster.com/dictionary/*
// @include        http://*.webster.com/dictionary/*
// @include        http://webster.com/wdictionary/*
// @include        http://*.webster.com/wdictionary/*
// ==/UserScript==

var buttons = document.getElementsByClassName('au');
for (var i = 0, l = buttons.length; i < l; i++) {
	var onclick = buttons[i].getAttribute('onclick').match(/^return au\('(.+)', '(.+)'\);$/);
	if (onclick && onclick.length == 3) {
		var file = onclick[1];
		var word = onclick[2];
		var popupURL = '/cgi-bin/audio.pl?' + escape(file) + '=' + escape(word);
		var audioId = onclick[1];
		
		var newAudio = document.createElement('audio');
		newAudio.id = audioId;
		newAudio.autoplay = false;
		newAudio.controls = false;
		buttons[i].parentNode.insertBefore(newAudio, buttons[i])
		buttons[i].setAttribute('onclick', 'playAudio(this, \'' + audioId + '\', \'' + popupURL + '\'); return false');
		
		var script = document.createElement('script');
		script.type = 'application/javascript';
		script.innerHTML = playAudio;
		document.body.appendChild(script);
		
		var newImage = document.createElement('img');
		newImage.id = 'img_' + audioId;
		newImage.style.display = 'none';
		newImage.src = 'data:image/gif;base64,R0lGODlhEAALAOMAAP%2F%2F%2F%2F8AAP8AAP6Cgv5ycv6oqP68vP7Ozv7e3v6UlP7o6P5oaP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJCgAPACwAAAAAEAALAAAEJvDJSesTOOuNBynGgVhS94UjaYIieQkem1or6tatCp85zf0ZlysCACH5BAkKAA8ALAAAAAAQAAsAAAQm8MlJ6xM4641LGsSBWFL3hSNpgiJ5CR6bWivq1q0KnznN%2FRmXKwIAIfkECQoADwAsAAAAABAACwAABCbwyUnrEzjrjY8pyUBYUveFI2mCInkJHptaK%2BrWrQqfOc39GZcrAgAh%2BQQJCgAPACwAAAAAEAALAAAEK%2FDJSesTOOuNFTpGkQyE1X3hWFYnKJKm4LlqPKcwK6PvSrU434RD1FiOkwgAIfkECQoADwAsAAAAABAACwAABDDwyUnrEzjrjaVCh1EkA0F1zxeO5Sl4oEiaE6rKbf2mMUtLtt7MBVsNdZwkysJ8RAAAIfkECQoADwAsAAAAABAACwAABC%2FwyUnrEzjrjalCh1EkAyF10xeO5Sl4oEia15vGLI1KqtzWsNXMFfTpOMiMZTmJAAAh%2BQQJCgAPACwAAAAAEAALAAAEK%2FDJSesTOOuNrUKHUSQD0VVfOJYnlYqkKXggzM5ovcq0GreT145D1FiOkwgAIfkECQoADwAsAAAAABAACwAABCbwyUnrEzjrja1UyGEsROeBImla6FgK3tOq8Bm6azW%2F8c79mlgsAgAh%2BQQJCgAPACwAAAAAEAALAAAEIvDJSesTOOuNLV3EkHSeBIpkeY5CaYas%2B6ypR7fuze21LEUAIfkECQoADwAsAAAAABAACwAABCbwyUnrEzjrja1cxJAURueBImla6FgK3tOq8Bm6azW%2F8c79mlgsAgAh%2BQQJCgAPACwAAAAAEAALAAAEK%2FDJSesTOOuN7SJDUhgH0lVfOJYnlYqkKXggzM5ovcq0GreT145D1FiOkwgAIfkECQoADwAsAAAAABAACwAABC%2FwyUnrEzjrjekiQ1IYByJ10xeO5Sl4oEia15vGLI1KqtzWsNXMFfTpOMiMZTmJAAAh%2BQQJCgAPACwAAAAAEAALAAAEMPDJSesTOOuN5SJDUhgHQnXPF47lKXigSJoTqspt%2FaYxS0u23swFWw11nCTKwnxEAAAh%2BQQBCgAPACwAAAAAEAALAAAEK%2FDJSesTOOuNFxlJYRyI1X3hWFYnKJKm4LlqPKcwK6PvSrU434RD1FiOkwgAOw%3D%3D';
		buttons[i].parentNode.insertBefore(newImage, buttons[i]);
	}
}

function playAudio(button, audioId, popupURL) {
	var audio = document.getElementById(audioId);
	var image = document.getElementById('img_' + audioId);
	if (audio && image) {
		if (audio.src) {
			audio.play();
		}
		else {
			button.style.display = 'none';
			image.style.display = 'inline';
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4) {
					audio.src = ajax.responseText.match(/EMBED SRC="(.+)" HIDDEN/)[1];
					audio.play();
					image.style.display = 'none';
					button.style.display = 'inline';
				}
			}
			ajax.open('GET', popupURL, true);
			ajax.send(null);
		}
	}
}
