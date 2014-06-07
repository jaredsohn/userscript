// ==UserScript== 
// @name          Useless EOL
// @version       2.0
// @namespace     dummy
// @description Ignora trolles
// @include       http://www.elotrolado.net/hilo_*
// @include       http://www.elotrolado.net/foro_*
// @match         http://www.elotrolado.net/hilo_*
// @match         http://www.elotrolado.net/foro_*
// ==/UserScript== 

var ignore = new Array(); // CASE SENSITIVE
;
ignore[0] = "Ferran8R";
ignore[1] = "central98";
ignore[2] = "josele69";
ignore[3] = "Krucial";
ignore[4] = "Sartor" ;
ignore[5] = "Markitous" ;
ignore[6] = "supermario" ;
ignore[7] = "DevilKenMasters";
ignore[8] = "Take";
ignore[9] = "monkeyPS2";
ignore[10] = "AbeLiyO";
ignore[11] = "johny_chaparron";
ignore[12] = "reberes";
ignore[13] = "fearDarkie";
ignore[14] = "manolillolo+";
ignore[15] = "marx666";
ignore[16] = "carmelero";
ignore[17] = "Hereze";
ignore[18] = "mi_novia_PS2";
ignore[19] = "xa8vi";
ignore[20] = "mamaun";
ignore[21] = "abarth";

if (location.href.indexOf("http://www.elotrolado.net/hilo_") == 0) {
	var post;
	var quote;

	var postCount = 0;
	var userCount = 0;
	var quoteCount = 0;

	var useless = 0;

	var postAuthor = "";
	var quoteAuthor = "";

	var post = document.getElementsByClassName("post");
	for (postCount = 0; postCount < post.length; postCount++) {
		useless = 0;
		try {
			postAuthor = post[postCount].getElementsByClassName("author")[0].getElementsByTagName("a")[0].innerHTML;
			for (userCount = 0; userCount < ignore.length; userCount++) {
				if (postAuthor == ignore[userCount]) {
					post[postCount].innerHTML = "<center><b></b></center>";
					useless = 1;
					break;
				};
			};
			if (!useless) {
				try {
					var quote = post[postCount].getElementsByClassName("content")[0].getElementsByTagName("blockquote");
					for (quoteCount = 0; quoteCount < quote.length; quoteCount++) {
						quoteAuthor = quote[quoteCount].getElementsByTagName("cite")[0].innerHTML;
						for (userCount = 0; userCount < ignore.length; userCount++) {
							if (quoteAuthor.indexOf(ignore[userCount]) == 0) {
								quote[quoteCount].innerHTML = "<center><b></b></center>";
								break;
							};
						};
					};
				} catch(e) { };
			};
		} catch(e) { };
	}
} else if (location.href.indexOf("http://www.elotrolado.net/foro_") == 0) {
	var post;

	var postCount = 0;
	var userCount = 0;

	var post = document.getElementsByClassName("row");
	for (postCount = 0; postCount < post.length; postCount++) {
		try {
			postAuthor = post[postCount].getElementsByTagName("dt")[0].getElementsByTagName("a");
			postAuthor = postAuthor[postAuthor.length - 1].innerHTML;
			console.log(postAuthor);
			for (userCount = 0; userCount < ignore.length; userCount++) {
				if (postAuthor == ignore[userCount]) {
					post[postCount].innerHTML = "<center><b></b></center>";
					useless = 1;
					break;
				};
			};
		} catch(e) { };
	};
};