// ==UserScript==
// @name        List edX Resources
// @namespace   http://userscripts.org/users/472402
// @grant       none
// @description Lists edx.org's lecture materials
// @include     https://www.edx.org/courses/*
// @include     http://www.edx.org/courses/*
// @version     2.30
// ==/UserScript==

var tags = document.querySelectorAll('div.seq_contents'),
	i = 0,
	il = tags.length,
	patterns = [
		{title: 'Videos', re: /streams="[^"]*/i, c: ',', links: [], url: 'https://www.youtube.com/watch?v='},
		{title: 'Subtitles', re: /href="[^"]*video-subtitles[^"]*/i, c: '"', links: [], url: ''},
		{title: 'Slides', re: /href="[^"]*lectureSlides[^"]*/i, c: '"', links: [], url: 'https://www.edx.org'},
		{title: 'Codes', re: /href="[^"]*lectureCode[^"]*/i, c: '"', links: [], url: 'https://www.edx.org'}
	],
	j = 0,
	jl = patterns.length,
	separator = '<br/>',
	src = '',
	output = '',
	test = '',
	dialog = $('<div title="Links" />');

for (; i < il; i++) {
	src = tags[i].innerHTML;
	for (j = 0; j < jl; j++) {
		test = patterns[j].re.exec(src);
		if (test !== null) {
			test = test.toString();
			if (patterns[j].title === 'Videos') {
				if (test.indexOf(patterns[j].c) > -1) {
					test = test.split(patterns[j].c);
					test = test[test.length - 1];
				}
				test = patterns[j].url + test.split(':')[1];
			} else {
				test = patterns[j].url + test.split(patterns[j].c)[1];
			}
			patterns[j].links.push('<a href="' + test + '">' + test + '</a>');
		}
	}
}

for (j = 0; j < jl; j++) {
	if (patterns[j].links.length > 0) {
		output += '<tr><th>' + patterns[j].title + '</th><td>' + patterns[j].links.join(separator) + '</td></tr>';
	}
}

if (output.length > 0) {
	$('<style type="text/css">' + [
		'#greasemonkeytable { line-height: 1.4; font-size: 12px; table-layout: normal; border-collapse: separate; border-spacing: 2px; }',
		'#greasemonkeytable td { padding: 2px 4px; }',
		'#greasemonkeytable th { padding: 2px 4px; background: #c3d9ff; }'
	].join('') + '</style>').appendTo('head');

	dialog.html('<table id="greasemonkeytable">' + output + '</table>').appendTo('body').dialog({
		resizable: true,
		width: 'auto',
		show: 'drop',
		hide: 'clip',
		buttons: {
			'Ok': function() {
				$(this).dialog('close');
			}
		}
	});
}
