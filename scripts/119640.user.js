// ==UserScript==
// @id             BeeMP3 Skip Wait
// @name           BeeMP3 Skip Wait
// @version        1.0
// @namespace      beemp3_skip_wait
// @author         SEGnosis
// @description    Skips the wait for beemp3.com
// @include        http://beemp3.com/download.php*
// @run-at         document-end
// @icon data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD////9/////f////3+/v793Obs/bHM1f2YxM39hLK7/YKyvP16rLf9lLK8/dHb4v3+/v79/////f////3////9/////f////3+/v79sMXP/Yq21f2czt79dp+k/XCVnP1wkpj9dpug/ZjG2/13o8L9pLrF/f7+/v3////9/////f////3+/v79wtLX/XKhrv2Kn7n9gaO8/Z/S1/2HsbX9k8LG/ZzM0v1vjaf9dYSR/UZkc/2ks7r9/v7+/f////319vb9X11d/U92hf2Nm579v8TE/aiur/2TvML9bYaH/Yuurv2gz9P9mZ+g/cTFxv2anZ39KTtF/Xp7e/39/f39ho6Q/QMBAf03SlH9vMPE/YGHh/05Pz/9hqCm/cX4+P3J/Pz9kbK4/SMjJP1TVFT9zc7N/TMzNP0FAwT9f4WH/VFTVP0BAQH9Ok1T/dTb3P1GTE39nqOk/XmQlv3C9fb9y/79/Yuqrv1mZ2f9TE1O/eLj4v00NDX9AQEB/S0uL/1QUlP9AQEB/SJRX/22xcn9o6qr/X2DhP2Ztrz9x/r6/cv+/f2ZwMX9kpSU/amqqf24vL79ERwj/QEBAf0sLS79VFZX/QEBAf0gWmz9PaK+/Yuyvv2dtr/9nsvQ/cr+/f3K/v39suLm/W2Tof1ripr9Gl17/QUpOv0BAQH9LC4v/Z6ipP0EAgL9cIKI/TvK7f0rvOH9LLfb/VTR6/163/D9btzv/TvP7/0SueX9CqrX/Q6n1f0zTFj9BgQF/a21uP3o7e79HiQo/d7i5P2x5fL9O9r7/Tja/f032f39Mdj9/S7X/P0t1vz9Jtb8/R3Q+f11wtz9xsrM/URJS/39/v79/////Y+Rkv3R1Nb9/f7+/YnC0P1l2u79Zub9/WLl/f1h5f39YeX9/VjP5f1nrcL9+fv9/aSlpv23v8L9/////bvV3/319/f9XWBj/e7y8/2hxND9jdPk/Xnh8/2L7vz9iu78/XnZ7P2EwdT9f62//cXLzP1gam399fn6/aTCz/2Jydz9pMrX/dja2/1OVVj9ZJ6y/fn9/v3i8/f9uuLt/cHi7P3c7fL9/P3+/UNziP1BTlL97PHy/ZG3yP1Zob79tt7p/XC40v2/2uP9scHG/R4zO/1+jZH91eDj/fn8/f31+fr90tbY/Xt/gf0lQk79ts7V/azI1f1Clr39pc3Z/f7+/v233en9aK/I/YrG1/2m0+H9oqqs/VVbXv1PWl79Ulpd/Whvcv28xcf9odDg/XCtw/1Dja/9l8nY/f3+/v3////9/v7+/c7l6/2IvMv95vP2/f////3////9/////f////3////9/////dXn7P1OjaT9stLd/f7+/v3////9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
// ==/UserScript==

function getScript(scriptSource) {
	var script = document.createElement('script');
	var head = document.getElementsByTagName('head')[0];
	
	if(scriptSource.indexOf("http") == 0){
		script.src=scriptSource;
	}
	else
		script.innerHTML = scriptSource;
	
	script.type = "text/javascript";
	head.appendChild(script);
}

getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");

setTimeout(function(){
	getScript("http://segnosis.net/user scripts/beemp3_no_wait/beemp3.js");
},1000);

$("a").click(function(e){
	e.preventDefault();
	console.log("TEST");
});