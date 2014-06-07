// ==UserScript==
// @name           AppleLinks
// @namespace      pendevin
// @description    Brings back glorious System 7.
// @include        http://endoftheinter.net/*
// @include        http://boards.endoftheinter.net/*
// @include        http://archives.endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        https://boards.endoftheinter.net/*
// @include        http://archives.endoftheinter.net/*
// ==/UserScript==

var css="\
		body {\
			font-size: 8pt\
		}\
		\
		table.classic tr td {\
			background: #CFCFCF;\
			color: #000000;\
			font-size: 8pt;\
		}\
		\
		textarea {\
			font-size: 9pt;\
		}\
		\
		textarea.locked {\
			background: #CFCFCF;\
		}\
		\
		/* other body styles */\
		body.regular,\
		body.classic {\
			margin: 0px;\
		}\
		\
		body.regular .body {\
			padding: 9px;\
		}\
		\
		img {\
			border: 0px;\
		}\
		\
		a {\
			color: #000000;\
		}\
		\
		a:visited {\
			color: #000099;\
		}\
		\
		a span.m {\
			position: relative;\
			top: -3px!important;\
			top: 0px;\
			height: 10px;\
			font-size: 6pt;\
			margin: 0px 1px;\
			padding-left: 10px;\
			border-bottom: 2px dotted #000000;\
		}\
		\
		a:visited span.m {\
			border-bottom: 2px dotted #000099;\
		}\
		\
		a span.m span {\
			font-size: 0px;\
		}\
		\
		ins {\
			background-color: #ddffdd;\
			border: 1px solid green;\
			text-decoration: none;\
		}\
		ins.pair {\
			border-left: 0px solid red;\
		}\
		ins img {\
			border: 3px solid green;\
		}\
		\
		del {\
			background-color: #ffdddd;\
			border: 1px solid red;\
			text-decoration: none;\
		}\
		del.pair {\
			border-right: 0px solid red;\
		}\
		del img {\
			border: 3px solid red;\
		}\
		\
		#register label {\
			font-weight: bold;\
		}\
		\
		em {\
			color: #FF0000;\
			font-style: normal;\
		}\
		\
		input [type='text'] {\
			border: 1px solid;\
			padding: 4px 1px;\
		}\
		\
		h1, h2, h3 {\
			background-color: white;\
			font-weight: bold;\
			margin: 3px 0px;\
			text-align: center;\
		}\
		\
		h1 {\
			font-size: 24pt;\
			font-style: italic;\
			margin-top: 12px;\
		}\
		\
		h2 {\
			font-size: 12pt;\
		}\
		\
		h3 {\
			font-size: 12pt;\
			text-align: left;\
			margin: 0px;\
		}\
		\
		small {\
			font-size: 8pt;\
		}\
		\
		.message, div.message-top {\
			padding: 0px 3px;\
			font-size: 9pt;\
		}\
		\
		table.message-body tr td.message, div.message, table.message-body tr td.userpic {\
			background: white;\
			overflow: visible;\
		}\
		\
		div.message-top {\
			background: #eee;\
		}\
		\
		.spoiler_closed .caption {\
			white-space: nowrap;\
		}\
		.spoiler_closed .spoiler_on_open {\
			display: none;\
		}\
		.spoiler_opened .spoiler_on_close {\
			display: none;\
		}\
		\
		table.classic {\
			border-collapse: collapse;\
			width: 100%;\
		}\
		\
		table.classic tr td {\
			padding: 2px;\
		}\
		\
		table.classic tr th {\
			padding: 1px!important;\
			background: #4B73AA;\
			color: black;\
			margin-bottom: 2px;\
			text-align: left;\
			font-weight: bold;\
			font-size: 11.5pt;\
		}\
		\
		table.classic tr th.title {\
			color: #000000;\
			font-size: 24pt;\
			font-style: italic;\
		}\
		\
		div.userbar a, div.infobar a, div.pager a table.classic tr th a, table.grid tr th a {\
			color: black;\
			text-decoration: none;\
		}\
		\
		div.userbar a:visited, div.infobar a:visited, div.pager a:visited, table.classic tr th a:visited, table.grid tr th a:visited {\
			color: black;\
			text-decoration: none;\
		}\
		\
		div.userbar a:hover, div.infobar a:hover, div.pager a:hover, table.classic tr th a:hover, table.grid tr th a:hover {\
			color: white;\
			background-color: black;\
			text-decoration: none;\
		}\
		\
		div.userbar a:active, div.infobar a:active, div.pager a:hover, table.classic tr th a:active, table.grid tr th a:active {\
			color: black;\
			text-decoration: none;\
		}\
		\
		table.grid {\
			width: 100%;\
			border-collapse: collapse;\
			border: hidden;\
			margin: 0px;\
		}\
		/*\
		table.grid tr td, table.grid tr th {\
			border: 2px solid #CFCFCF;\
			border-width: 0px 2px 2px 0px;\
		}\
		*/\
		\
		table.grid tr td {\
			font-size: 12px;\
			padding: 0px 3px 1px 3px;\
		}\
		\
		table.grid tr th {\
			background: #ddd;\
			font-size: 12px;\
			text-align: center;\
			font-weight: bold;\
		}\
		\
		table.grid tr td.sticky {\
			font-weight: bold;\
		}\
		\
		table.grid tr td.closed, span.closed {\
			background-image: url('data:image/gif;base64,R0lGODlhCwANALMAANDQ/4SEhAAAAEJC/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAALAA0AAAQmEEhBqbx2igs29xPXfSJYnZYQrCxLue8aB6oq2/Q8tzeKdiANIAIAOw==')!important;\
			background-position: 3px center;\
			background-repeat: no-repeat;\
			padding-left: 18px;\
		}\
		\
		table.grid tr td.devil, span.devil {\
			background-image: url('data:image/gif;base64,R0lGODlhFQASAMQAAAAAAP////7+2f7+3srGesK+ds7Kfv76nv76pv76qv76sv76uv76vvryluDahvLqkv72nf76xf76yv76zubeitbOgsK6dv760v8AAHkAAP7+/gICAv///wAAAAAAAAAAACH5BAEAABwALAAAAAAVABIAAAWXICeOpAiUaGqeassBGKvK3GbbdAmfwDYIF0nENsPEBj/BJLJQIDYzwEVAXTI2CEgDmtpMg0xF4tB4cEubiES4ESPINsd5tGHYm4m3TbOp3DB0CoJiNxp8GwQbW0YiWAmFhnsbBThGgBsQEBuGh5wbFlwZgI1bnZGfc6KNFHKekxagJaJGfQY3sLBzIxm8GTa4ubotN0QoIQA7')!important;\
			background-position: 3px center;\
			background-repeat: no-repeat;\
			padding-left: 27px;\
		}\
		\
		span.title-modicon {\
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAC7mlDQ1BJQ0MgUHJvZmlsZQAAeAGFVM9rE0EU/jZuqdAiCFprDrJ4kCJJWatoRdQ2/RFiawzbH7ZFkGQzSdZuNuvuJrWliOTi0SreRe2hB/+AHnrwZC9KhVpFKN6rKGKhFy3xzW5MtqXqwM5+8943731vdt8ADXLSNPWABOQNx1KiEWlsfEJq/IgAjqIJQTQlVdvsTiQGQYNz+Xvn2HoPgVtWw3v7d7J3rZrStpoHhP1A4Eea2Sqw7xdxClkSAog836Epx3QI3+PY8uyPOU55eMG1Dys9xFkifEA1Lc5/TbhTzSXTQINIOJT1cVI+nNeLlNcdB2luZsbIEL1PkKa7zO6rYqGcTvYOkL2d9H5Os94+wiHCCxmtP0a4jZ71jNU/4mHhpObEhj0cGDX0+GAVtxqp+DXCFF8QTSeiVHHZLg3xmK79VvJKgnCQOMpkYYBzWkhP10xu+LqHBX0m1xOv4ndWUeF5jxNn3tTd70XaAq8wDh0MGgyaDUhQEEUEYZiwUECGPBoxNLJyPyOrBhuTezJ1JGq7dGJEsUF7Ntw9t1Gk3Tz+KCJxlEO1CJL8Qf4qr8lP5Xn5y1yw2Fb3lK2bmrry4DvF5Zm5Gh7X08jjc01efJXUdpNXR5aseXq8muwaP+xXlzHmgjWPxHOw+/EtX5XMlymMFMXjVfPqS4R1WjE3359sfzs94i7PLrXWc62JizdWm5dn/WpI++6qvJPmVflPXvXx/GfNxGPiKTEmdornIYmXxS7xkthLqwviYG3HCJ2VhinSbZH6JNVgYJq89S9dP1t4vUZ/DPVRlBnM0lSJ93/CKmQ0nbkOb/qP28f8F+T3iuefKAIvbODImbptU3HvEKFlpW5zrgIXv9F98LZua6N+OPwEWDyrFq1SNZ8gvAEcdod6HugpmNOWls05Uocsn5O66cpiUsxQ20NSUtcl12VLFrOZVWLpdtiZ0x1uHKE5QvfEp0plk/qv8RGw/bBS+fmsUtl+ThrWgZf6b8C8/UXAeIuJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABpUlEQVQoFWP8//8/AykgOdp7588fn93+MEoyMJGiMT3OfbmEOJ9bU0sXw7179xhYiNEcF+aYIC4qmMvIwGCkJCcG18KylJHxLJBnBBcBMrYH2cK5TExMDOJiggwy0hIM8rIiDC9evWVgZmYGy4NsNopOqIArBjFcmmIZmFhQHfX390+GXz+/Mjy4c42BFSrHogBSvWAfiISDK778cDY64+XLtwwq6gZgYZICDN0glgdAEWs00TfvPjKgRyEzIyMDEzMTw89fv+CqQR47t5ThFGqAbWeHK0AEmCQ4wH7++cPw+89fsDxL9P//xuF+Tv9jw+3gGj4s2MUQsef4rZj//9VBgqCoYmBgzL1+466RqZEGw9+/EM1g54Gc6Oli+//GxYP/c5O9gdz/DEsYGPaDaGScFuu2vKow4v/da8f/mxqa/McIMH4+brALgC5yBDOQiJmLdka+ePlpV11NGYOSkhID3GSQzS8eXf2/cErx/9wk77PINuJiw21mY2Vh+PD+DYO5rR/Qe6gpDslyFCY8GQHTbXpra9vMn99/MYiLcp1DUYWDAwCFZbkwsxyT5gAAAABJRU5ErkJggg==')!important;\
			background-position: 0px center;\
			background-repeat: no-repeat;\
			padding-left: 18px;\
		}\
		\
		table.search {\
			border: solid 2px #DDE3Eb;\
			width: 100%;\
			border-collapse: collapse;\
			border: hidden;\
		}\
		\
		table.search tr th, table.search tr td {\
			background: #DDE3Eb;\
			font-size: 9.5pt;\
			font-weight: normal;\
			padding: 2px 5px;\
			text-align: left;\
			border-width: expression(((this.parentNode.rowIndex==0)?'0px ':'2px ')+\
															 ((this.parentNode.cells.length==(this.cellIndex+1))?'0px ':'2px ')+\
															 ((this.parentNode.rowIndex==this.parentNode.parentNode.rows.length-1)?'0px ':'2px ')+\
															 ((this.cellIndex==0)?'0px':'2px'));\
		}\
		\
		table.search tr td {\
			background: transparent;\
		}\
		\
		.pr {\
			font-family: monospace;\
			white-space: pre;\
		}\
		\
		.pr br {\
			display: none;\
		}\
		\
		div.poll {\
			padding: 0px 6px;\
		}\
		\
		table.poll {\
			padding: 0px 6px;\
			border: 0px;\
			width: 100%;\
			font-size: 12pt;\
		}\
		\
		table.poll div {\
			height: 20px;\
			background: #2E5A7F;\
		}\
		\
		div.graph {\
			border: 1px solid #000000;\
			background: #2E5A7F;\
			height: 150px;\
			width: 540px;\
			overflow: visible;\
		}\
		\
		div.graph span {\
			background: #DDE3Eb;\
			float: left;\
		}\
		\
		div.mysql {\
			background-image: url('data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///7q6u6ipq8bJzX+Fi4+SlaSmqJ2focjKzKqrrHiCiZWYmmWCknOHkm9+h1N9k1yKomCInXmit32itpG2yYaouWmBjqfI2W+FkFmZuEZ4kGGNoYOxxm+UpoOrvW2LmYaqu4equ1Or0FKZtV+NoIvI4KTS5qvO3SCHryyVukaqzUqhwGW31FymwHTB3HK50na71Hi81X7F3nm91ZLL4KjY6YOhrCCMsCOJrC2Rsy2QsjWVtkGcu0WlxUWfvlClwlmtyVWivFajvVumwGKwymi1z3bE33G91XK603mww4nH3I3M4Y3L4I/K3pDL35nW6pXQ5JzS5JXJ2ZLE1JPE1KfY6Lbm9brAwkyet2W61G2ZppLD0pPE05/Q37Hi8XmapMXv+7K8v6ewssHHyHuJifDx8e3u7sTKybrHusLaucfdvv39/fr6+vn5+ff39+/v7+vr6+Xl5dnZ2cPDw7+/v////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHYALAAAAAAQABAAAAebgAGCggkUIiGIFh8gb4ODYFNdVVRcXh4HjoJoWUJDRC5GEQOZgiU4OTs8PxACpAEEKTo9QEEaZWlqa22OHCosRTAyMUhaIxeOZD4tSTRLNU5MJg9yjmMNDh1NUlZfJwtxmW1xc0pRNmEoBXCuAVgzT1cYBrvsNy9QFQxs7AFnJEcTEPATJGaFBAUDBW3ZUCdhADMZ6DgM4AZcwkAAOw==');\
			background-position: 0px center;\
			background-repeat: no-repeat;\
			font-family: monospace;\
			margin: 1em 0px;\
			padding-left: 18px;\
		}\
		\
		iframe.upload_form {\
			border: none;\
			height: 100%;\
			width: 100%;\
		}\
		\
		div.upload_form {\
			height: 300px;\
			width: 600px;\
		}\
		\
		div.imgs {\
			overflow: visible;\
		}\
		\
		div.img {\
			float: left;\
			margin-right: 10px;\
		}\
		\
		div.img span {\
			display: block;\
			padding-top: 3px;\
			overflow: hidden;\
			text-align: center;\
			width: 150px;\
		}\
		\
		div.img div {\
			height: 150px;\
			line-height: 150px;\
			text-align: center;\
			width: 160px;\
		}\
		\
		div.img div * {\
			border: none;\
			vertical-align: middle;\
		}\
		\
		.image_grid .grid_block {\
			float: left;\
			width: 220px;\
			height: 200px;\
			margin: 0px 5px;\
			padding: 5px 0px;\
			text-align: center;\
			position: relative;\
		}\
		\
		.image_grid .grid_block .block_desc {\
			width: 220px;\
			overflow: hidden;\
			background: #eee;\
			position: absolute;\
			bottom: 0px;\
			padding: 3px;\
		}\
		\
		.filter-container {\
			overflow: hidden;\
			width: 600px;\
		}\
		\
		.filter-column {\
			float: left;\
			text-align: center;\
			width: 200px;\
		}\
		\
		.filter-column .input {\
			width: 180px;\
		}\
		\
		.img-placeholder {\
			background-image: url(data:image/gif;base64,R0lGODlhEAAQAIABAMzMzP///yH5BAEAAAEALAAAAAAQABAAAAIfhG+hq4jM3IFLJhoswNly/XkcBpIiVaInlLJr9FZWAQA7);\
			display: -moz-inline-block;\
			display: inline-block;\
		}\
		* html .img-placeholder {\
			background-image: url('/images/placeholder.gif');\
		}\
		.img-loaded {\
			display: -moz-inline-block;\
			display: inline-block;\
		}\
		.quoted-message {\
			margin-left: 0px;\
			padding-left: 6px;\
			border-left: 2px solid #6896D5;\
		}\
		.message .message-top {\
			background-color: transparent;\
			padding-left: 0px;\
		}\
		\
		table.message-body {\
			border-collapse: collapse;\
			margin: 0px;\
		}\
		table.message-body td.message {\
			vertical-align: top;\
			width: 100%;\
		}\
		table.message-body td.userpic {\
			border-left: 2px solid #CFCFCF;\
			padding: 2px;\
			vertical-align: top;\
		}\
		table.message-body td.userpic div.userpic-holder {\
			width: 150px;\
			overflow: hidden;\
			text-align: center;\
		}\
		\
		/* quickpost nub */\
		.quickpost {\
			background: #CFCFCF;\
			position: fixed;\
			bottom: 0px;\
			right: 1px;\
			z-index: 10;\
		}\
		* html .quickpost {\
			display: none;\
		}\
		\
		.quickpost input {\
			margin-bottom: 0px;\
		}\
		\
		.quickpost-expanded .quickpost {\
			background-image: url('data:image/gif;base64,R0lGODlhBwAHAIABAJ2dnf///yH5BAEAAAEALAAAAAAHAAcAAAILTGCnhsj5oEszwgIAOw==');\
			background-position: 3px 2px;\
			background-repeat: no-repeat;\
			border-top: 1px solid #2E5A7F;\
			width: 100%;\
		}\
		\
		.quickpost-preview .message-container {\
			padding: 3px 0px;\
		}\
		\
		.quickpost-preview .quickpost-buttons {\
			padding-bottom: 12px;\
		}\
		\
		.quickpost .quickpost-nub {\
			position: absolute;\
			bottom: 0px;\
			right: 0px;\
			background: #DDE3Eb;\
			border: 1px solid #2E5A7F;\
			border-width: 1px 0px 0px 1px;\
			display: block;\
			text-align: center;\
			font-size: 15pt;\
			text-decoration: none;\
			line-height: 1em;\
			height: 1em;\
			width: 1em;\
		}\
		\
		.quickpost .quickpost-grip {\
			position: absolute;\
			left: 0px;\
			top: 0px;\
			width: 15px;\
			height: 15px;\
			text-decoration: none;\
		}\
		\
		.quickpost .quickpost-canvas {\
			height: 100%;\
			padding: 4px 10px 8px 10px;\
			overflow: auto;\
		}\
		\
		.quickpost .quickpost-body {\
			margin-right: 170px;\
		}\
		\
		.quickpost .has-upload-form .quickpost-body {\
			margin-right: 350px;\
		}\
		\
		.quickpost .quickpost-canvas textarea {\
			height: 280px;\
			margin: 4px 0px;\
			width: 100%;\
			resize: none;\
		}\
		\
		.quickpost .quickpost-canvas div.upload_form {\
			float: right;\
			margin-top: 10px;\
			width: 350px;\
		}\
		\
		.quickpost .quickpost-nub .close,\
		.quickpost .quickpost-canvas,\
		.quickpost .quickpost-grip,\
		.quickpost-preview .quickpost-body,\
		.quickpost-expanded .quickpost-nub .open {\
			display: none;\
		}\
		\
		.quickpost-expanded .quickpost-nub .close {\
			display: inline;\
		}\
		.quickpost-expanded .quickpost-canvas,\
		.quickpost-expanded .quickpost-grip {\
			display: block;\
		}\
		\
		/* pretty shadows */\
		.quoter-bottom {\
			height: 16px;\
			padding-left: 16px;\
			position: absolute;\
		}\
		\
		.quoter-bottom .quoter-hl {\
			background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAN5JREFUeNqEk90OgjAMhbuVERJJ/LnzAbgyvv+joYDOMynkWDEu+UK39Zx1XQgicgYduICrfTtb/zsCiKACNWjADrRgDw7gBI42b22/sfykZqRkVOJEpjWtl5xsPMGkVEW0JDVBonjJExNPxrBssIk3Y3E59WHiscAVeJNAsHg07uCmLpHJVPKTTh2K0Oi5PH4ZFmc6faDTCz2XqHT3pXE1vUii9fXqbBB+NLByc+6bhJyzBAwzia6pSpVFt//WewNxCd7Qv8xsMEdhq5n+ihzLeoUP1bfR1v+zjpcAAwD8CTQVcp++VQAAAABJRU5ErkJggg==') no-repeat;\
			position: absolute;\
			left: 0px;\
			top: 2px;\
			height: 14px;\
			width: 16px;\
		}\
		\
		.quoter-bottom .quoter-hr {\
			background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPVJREFUeNp8VAEOgyAQw8X/f2Af2N+M2Wa2oCLeTlNIU3WXNAho6ZU7GzMLHE3TbAt3xxvoHR3GF9a+juiYHOkWzmNxZBpXh2EMeK6ntzhZYwYSiAoZE9VoHQ9sJnw4AjOhkDBRVdMivxUvFpIIjKQoCVHJwDaSgTbLyZHMG2HgcuJRVfLEZJGUotzCTGoOJD0mmVK6ImIlKxvbkVkLKZoA9ifJTR2UGHmTSNUkt5UlpepJoMVMqSXxim8nMMlAi0qUpXLzlScfZpUSL7gsNO+9vU6ikJhA+2blvilKJmkFO2ky06YrKvbOd5x1soU/YfL/+AkwAHjI1Km7v+MrAAAAAElFTkSuQmCC') no-repeat;\
			position: absolute;\
			right: -17px;\
			top: 0px;\
			height: 14px;\
			width: 17px;\
		}\
		\
		.quoter-bottom .quoter-hc {\
			background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEdJREFUeNpiZGBg+M9AImAE4uVQmmjAAsRfSbUJpOkTOZrek6PpLTkBEUqOJidyNBmSo0mZHE3i5GjiI0cTOzmamEjVBBBgAF2DBp6DHQgQAAAAAElFTkSuQmCC') repeat-x;\
			height: 14px;\
			margin-top: 2px;\
			width: 100%;\
		}\
		\
		.quoter-right {\
			width: 13px;\
			padding-top: 13px;\
			position: absolute;\
		}\
		\
		.quoter-right .quoter-vt {\
			background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOpJREFUeNp8kkkSgjAQRZMwCGo5rN27ce8B9EKe2isgYIgd+R2/lNhVr5KCft2ZjDHmINh/hBAME+MqlEIh5CAT3Jwc4yashKVQCwsU0QJuKsaPR6ESBsKDsew4Dpi/pRM6eOKJDh55AzoFG0Mmd+GCxJ7Gjgp4WsFoC2f8jImt8MC8oyIqhhztd0hucXLWfEL3ExSV9qjeQDKUxEuzehAxtjhmFfRAerqzdDAqbSZCi/0UGPmukrQmocMFNzOvI0k1CQ06FBAyFuLoMKmwp5KeEAtfnVQqZx6tpZwUjp5T9mMP+p+XZ14CDABXdFkIys3DVgAAAABJRU5ErkJggg==') no-repeat;\
			position: absolute;\
			left: 0px;\
			top: 0px;\
			height: 13px;\
			width: 16px;\
		}\
		\
		.quoter-right .quoter-vc {\
			background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADVJREFUeNpiZGBg+A/Ec4H4ExC/B+K3QPwaSr+Hin8B4u9A/BOIfzMxkAFGNY1qGihNAAEGAKNpDB7LfXRNAAAAAElFTkSuQmCC') repeat-y;\
			height: 100%;\
			width: 13px;\
		}\
		\
		.quoter-button {\
			position: absolute;\
			right: 12px;\
			display: block;\
			background: #4B73AA;\
			border: 1px solid #2E5A7F;\
			border-width: 0px 1px 1px 1px;\
			color: #DDE3EB;\
			text-align: center;\
			font-family: 'Times New Roman';\
			font-size: 18px;\
			text-decoration: none;\
			line-height: 1.25em;\
			height: 1.2em;\
			width: 1.2em;\
			opacity: 0.75;\
			filter:alpha(opacity=75);\
		}\
		\
		.quoter-button:hover {\
			opacity: 100;\
			filter: none;\
		}\
		\
		a.quoter-button:visited {\
			color: #DDE3EB}\
		\
		.quoter-button sub,\
		.quoter-button sup {\
			position: relative;\
			vertical-align: middle;\
		}\
		\
		.quoter-button sub {\
			top: 1px;\
		}\
		.quoter-button sup {\
			top: -1px;\
		}\
		\
		/* new stuff below here */\
		/* Mac system fonts */\
		@font-face {\
			font-family: Chicago;\
			src: url('http://static.endoftheinter.net/style/chicago.ttf');\
		}\
		\
		@font-face {\
				font-family: 'Chicago Bold';\
				src: url('http://static.endoftheinter.net/style/chicaco-bold.ttf');\
		}\
		\
		* {\
				font-family: 'Chicago', 'Monaco', 'Consolas', 'Courier', Monospace !important;\
		}\
		\
		textarea, input[type='text'], .message, .quoted-message {\
				font-family: 'Monaco', 'Consolas', 'Courier', Monospace !important;\
		}\
		\
		\
		div.scanline-overlay {\
			position: fixed;\
			top: 0px;\
			left: 0px;\
			width: 100%;\
			height: 100%;\
			pointer-events: none;\
			background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100% );\
			background-size: 100% 2px;\
		}\
		\
		body {\
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVBhXY2BgYPj//z8ICwsLAwAqVgY0vYzMYAAAAABJRU5ErkJggg==);\
			background-repeat: repeat;\
		}\
		\
		div.menubar {\
			position: fixed;\
			top: 0;\
			left: 0;\
			right: 0;\
			margin: 0;\
			z-index: 10;\
			padding: 0;\
			border-top-left-radius: 5px;\
			border-top-right-radius: 5px;\
			border-bottom: 1px solid black;\
			background-color: white;\
			overflow: hidden;\
			height: 19px;\
		}\
		\
		div.menubar a {\
			float: left;\
			border-style: none;\
			font-size: 12px;\
			margin-left: 4px;\
			padding: 2px 6px;\
			text-decoration: none;\
		}\
		\
		div.menubar a.menu-user {\
			float: right;\
			margin-right: 12px;\
		}\
		\
		div.menubar a:hover {\
			color: white;\
			background-color: black;\
		}\
		\
		div.menubar a.menu-home {\
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABsSURBVDhPpVIBCgAhCGv9/8/dGQSel26RECS0tU0x3moX1S+wE0oJADQ7WZUEC1i5pApYRIgherkGjn208lEQvbJeCnH9aGp2dmgGbMwyQTZOmUDaAzYyKQP/KLt7Nb89YKGVe3AKPtqDjPwBUWotD1ZOYeoAAAAASUVORK5CYII=);\
			background-position: 8px 2px;\
			background-repeat: no-repeat;\
			margin-left: 12px;\
			width: 20px;\
			height: 16px;\
		}\
		div.menubar-background {\
			background-color: black;\
			position: fixed;\
			top: 0px;\
			left: 0px;\
			right: 0px;\
			height: 7px;\
		}\
		\
		div.menubar a:hover.menu-home {\
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABvSURBVDhPrZOBCsAgCER1///PNmPBZalLCoSi3nVqMRHJG+XxlMkPTAVEhDS8EQoMkJlrAkpFcN+3RUS7Ctu1tTIJRLkO0DpKi4jgLp3fAqUuIOS1866DtGWb97A4QBFvjqkt7+D0b9ytwenter4Bm6kcJcjtzaAAAAAASUVORK5CYII=);\
			background-color: black;\
		}\
		\
		div.userbar, div.pager {\
			margin: 0px;\
			background: white;\
			padding: 8px 0px 4px 0px;\
			text-align: center;\
		}\
		\
		div.userbar {\
			font-weight: bold;\
			font-size: 14px;\
		}\
		\
		div.pager {\
			font-size: 10px;\
		}\
		\
		div.window-header {\
			background-color: white;\
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACgAAAAARCAYAAAARrvWoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAOQSURBVHhe7d1BDoQwCABA8f9/7rYeNzG2GmMI0zMiHTwSjNbP5hAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKpBPZU1SqWAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQOAQMAPoQCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAQoHoNZ/+Anj8HThihMyd1fi5rKIIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBf4HoQ3unA4AjeAwAXoQcOWfjtIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBB4LjC1AXBlAHBlY+Dz8mUgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQI1BWwArNl3tyZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB5AI2ACZvoPIJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoKaADYA1++7WBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJBcwAbA5A1UPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUFLABsGbf3ZoAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEkgvYAJi8gconQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgZoCNgDW7LtbEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBygakNgLN3bK1tESOlQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLwpcLkB8M2Xy02AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjcE9jvPeYpAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4EsBA4Bf6ns3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBC4KfADiC1v9Gjs11oAAAAASUVORK5CYII=);\
			background-position: 0px 1px;\
			background-repeat: no-repeat;\
			border-top: 1px solid black;\
			border-bottom: 1px solid black;\
			font-size: 12px;\
			margin-top: 24px;\
			padding: 0px;\
			text-align: center;\
			height: 19px;\
		}\
		div.window-header span.window-header-title {\
			display: inline-block;\
			background-color: white;\
			font-size: 12px;\
			padding: 0px 7px;\
			margin-top: 1px;\
		}\
		div.window-header div.window-header-right {\
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAALCAYAAACd1bY6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABXSURBVDhPY/wPBIyMjAzEAqByBlzqGWGGgRShA5AmZHF0Prp6JmJdhKwOZCg2TJZhINdiw2QZRheXwSMAV9hhiwCyYpNQ7NI0NvGmM1JdRjDM0A3ElwMAgq5dFPt3n/8AAAAASUVORK5CYII=);\
			background-repeat: no-repeat;\
			background-position: 100% 4px;\
			width: 20px;\
			height: 17px;\
			float: right;\
		}\
		\
		div.userbar, div.infobar, .message-container, div.pager, table.grid {\
			border-top: 1px solid black;\
			border-bottom: 1px solid black;\
			margin-top: 2px;\
		}\
		\
		div.window-shadow {\
			border-left: 1px solid black;\
			border-right: 1px solid black;\
			box-shadow: black 1px 1px 0px 0px;\
			margin-bottom: 4px;\
			background-color: white;\
		}\
		\
		.userbar a {\
			border-radius: 4px;\
			border: 1px solid black;\
			padding: 2px 8px 0px 8px;\
			text-decoration: none;\
			font-size: 11px;\
			margin: 2px 6px;\
		}\
		\
		.userbar a:active {\
			background-color: black;\
			color: white;\
		}\
		\
		.infobar {\
			border-top: 1px solid black;\
			font-family: Geneva, sans-serif;\
			font-size: 11px;\
			margin: 0;\
			padding-left: 8px;\
			background: white;\
		}\
		\
		tr.zebra_0 {\
			background-color: white;\
		}\
		tr.zebra_1 {\
			background-color: #eee;\
		}\
		.memcache, .mysql {\
			background-color: white;\
		}\
		\
		div.stats {\
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAATCAAAAAC8DNITAAAC92lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAACjPY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmQEMEpOLCxwDAnxA7Lz8vFQGVMDIwPDtGohkYLisCzKLgTTAmgy0GEgfAGKjlNTiZCD9BYjTy0sKgOKMMUC2SFI2mF0AYmeHBDkD2S0MDEw8JakVIL0MzvkFlUWZ6RklCoaWlpYKjin5SakKwZXFJam5xQqeecn5RQX5RYklqSlAtVA7QIDXJb9EwT0xM0/ByECVgcoAFI4QFiJ8EGIIkFxaVAYPSgYGAQYFBgMGB4YAhkSGeoYFDEcZ3jCKM7owljKuYLzHJMYUxDSB6QKzMHMk80LmNyyWLB0st1j1WFtZ77FZsk1j+8Yezr6bQ4mji+MLZyLnBS5Hri3cmtwLeKR4pvIK8U7iE+abxi/Dv1hAR2CHoKvgFaFUoR/CvSIqIntFw0W/iE0SNxK/IlEhKSd5TCpfWlr6hEyZrLrsLbk+eRf5PwpbFQuV9JTeKq9VKVA1Uf2pdlC9SyNUU0nzg9YB7Uk6qbpWeoJ6r/SPGCwwrDWKMbY1kTdlNn1pdsF8p8USywlWdda5NnG2gXau9tYOxo46TmrOSi4KrvJuCu7KHuqeul4m3jY+7r7Bfgn++QH1gRODlgbvCrkY+jKcKUIu0ioqIroiZmbsnrgHCWyJuklhyQ0pa1JvpnNkWGRmZs3NvpjLnmefX1GwqfBdsXZJVumqsjcV+pUlVbtqGGu96qbWP2zUa6ppPtsq11bYfrRTuquo+3Sval9j/92JNpNmT/47NX7a4RkaM/tnfZ+TMPf0fPMFSxeJLG5d8m1Z5vJ7K0NWnV7jsnbfessN2zaZbN6y1WTb9h1WO/fvdt1zdl/Y/gcHcw79PNJ+TPz4ipPWp86dST776/yki9qXjl5JvPrv+pybNrfu3qm/p3z/xMO8x2JP9j/LfCHy8uDr/Lfy7y58aPpk+vnV1wXfw38K/Dr1p/Wf4///AA0ADzRT2wXrAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsIAAA7CARUoSoAAAABFSURBVBjTvZAxDgAgCAPPQYn+/781UYiRxc1uHC0JBeTCpQvozNrbBXgC/QFUaLcDKwkwsqPvR4kT1f8+EfMIqZ1oKAAT5R+8gmgbHMwAAAAASUVORK5CYII=');\
			background-repeat: no-repeat;\
			border: 1px solid black;\
			border-radius: 4px;\
			background-color: white;\
			height: 19px;\
			padding-left: 20px;\
			padding-right: 8px;\
			display: inline-block;\
		}\
		div.stats small {\
			position: relative;\
			top: 2px;\
		}\
		\
		div.sticky {\
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAATCAAAAAC8DNITAAAC92lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAACjPY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmQEMEpOLCxwDAnxA7Lz8vFQGVMDIwPDtGohkYLisCzKLgTTAmgy0GEgfAGKjlNTiZCD9BYjTy0sKgOKMMUC2SFI2mF0AYmeHBDkD2S0MDEw8JakVIL0MzvkFlUWZ6RklCoaWlpYKjin5SakKwZXFJam5xQqeecn5RQX5RYklqSlAtVA7QIDXJb9EwT0xM0/ByECVgcoAFI4QFiJ8EGIIkFxaVAYPSgYGAQYFBgMGB4YAhkSGeoYFDEcZ3jCKM7owljKuYLzHJMYUxDSB6QKzMHMk80LmNyyWLB0st1j1WFtZ77FZsk1j+8Yezr6bQ4mji+MLZyLnBS5Hri3cmtwLeKR4pvIK8U7iE+abxi/Dv1hAR2CHoKvgFaFUoR/CvSIqIntFw0W/iE0SNxK/IlEhKSd5TCpfWlr6hEyZrLrsLbk+eRf5PwpbFQuV9JTeKq9VKVA1Uf2pdlC9SyNUU0nzg9YB7Uk6qbpWeoJ6r/SPGCwwrDWKMbY1kTdlNn1pdsF8p8USywlWdda5NnG2gXau9tYOxo46TmrOSi4KrvJuCu7KHuqeul4m3jY+7r7Bfgn++QH1gRODlgbvCrkY+jKcKUIu0ioqIroiZmbsnrgHCWyJuklhyQ0pa1JvpnNkWGRmZs3NvpjLnmefX1GwqfBdsXZJVumqsjcV+pUlVbtqGGu96qbWP2zUa6ppPtsq11bYfrRTuquo+3Sval9j/92JNpNmT/47NX7a4RkaM/tnfZ+TMPf0fPMFSxeJLG5d8m1Z5vJ7K0NWnV7jsnbfessN2zaZbN6y1WTb9h1WO/fvdt1zdl/Y/gcHcw79PNJ+TPz4ipPWp86dST776/yki9qXjl5JvPrv+pybNrfu3qm/p3z/xMO8x2JP9j/LfCHy8uDr/Lfy7y58aPpk+vnV1wXfw38K/Dr1p/Wf4///AA0ADzRT2wXrAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsIAAA7CARUoSoAAAABFSURBVBjTvZAxDgAgCAPPQYn+/781UYiRxc1uHC0JBeTCpQvozNrbBXgC/QFUaLcDKwkwsqPvR4kT1f8+EfMIqZ1oKAAT5R+8gmgbHMwAAAAASUVORK5CYII=');\
			background-repeat: no-repeat;\
			background-position: 0px -1px;\
			border-radius: 4px;\
			border: 1px solid black;\
			height: 17px;\
			padding-left: 20px;\
			padding-right: 8px;\
			display: inline-block;\
		}\
	";
GM_addStyle(css);

//reads a cookie registered for the local domain
function readCookie(name){
	var	nameEQ=name+"=";
	var	ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++){
		var	c=ca[i];
		if(c.indexOf(" ")==0)c=c.substring(1);
		if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//disable luelinks stylesheet
for(var i=0;(l=document.getElementsByTagName("link")[i]);i++)
	if(l.getAttribute("rel").indexOf("style")>=0)
		l.disabled=true;

//turn infobars into pagers
var infobars=document.getElementsByClassName('infobar');
for(var i=infobars.length-1;i>=0;i--)
	if(!infobars[i].textContent.match(/There (is|are) currently \d+/))
		infobars[i].className='pager';

//do shit with the menubar There is currently 1 person reading this board
var menubar=document.getElementsByClassName('menubar')[0];
var menubarBackground=document.createElement('div');
menubarBackground.className='menubar-background';
menubarBackground.textContent='\n';
menubar.parentNode.insertBefore(menubarBackground,menubar);
var menubarItems=[];
var menuLinks=menubar.getElementsByTagName('a');
for(var i=0;i<menuLinks.length;i++){
	if(menuLinks[i].textContent=='Home'){
		menubarItems[0]=menuLinks[i];
		menubarItems[0].className='menu-home';
		menubarItems[0].innerHTML='';
	}
	else if(menuLinks[i].textContent=='Boards')
		menubarItems[1]=menuLinks[i];
	else if(menuLinks[i].textContent=='Archives')
		menubarItems[2]=menuLinks[i];
	else if(menuLinks[i].textContent=='Wiki')
		menubarItems[3]=menuLinks[i];
	else if(menuLinks[i].textContent=='Stats')
		menubarItems[4]=menuLinks[i];
	else if(menuLinks[i].textContent=='User List')
		menubarItems[5]=menuLinks[i];
	else if(menuLinks[i].textContent=='Logout')
		menubarItems[6]=menuLinks[i];
	else if(menuLinks[i].textContent=='Help')
		menubarItems[8]=menuLinks[i];
}
menubarItems[7]=document.getElementById('userbar_pms');
if(menubarItems[7])
	menubarItems[9]=menubarItems[7].previousElementSibling;
else{
	menubarItems[9]=document.createElement('a');
	menubarItems[9].href='//endoftheinter.net/profile.php?user='+readCookie('userid');
	menubarItems[9].textContent=GM_getValue('username','Profile');
	if(menubarItems[9].textContent=='Profile'&&document.getElementById('userbar_pms'))
		menubarItems[9].textContent=menubarItems[7].previousElementSibling.textContent;
}
GM_setValue('username',menubarItems[9].textContent);
menubarItems[9].className='menu-user';
for(var i=0;i<menubarItems.length;i++)
	if(menubarItems[i]&&menubarItems[i].parentNode)
		menubarItems[i].parentNode.removeChild(menubarItems[i]);
menubar.innerHTML='';
for(var i=0;i<menubarItems.length;i++)
	if(menubarItems[i])
		menubar.appendChild(menubarItems[i]);

//do shit with page stats
var smalls=document.getElementsByTagName('small');
for(var i=0;i<smalls.length;i++)
	if(smalls[i].textContent.match(/Time Taken: [\d\.]+s sqlly stuff: /))
		stats=smalls[i];
if(stats){
	var statsWrapper=document.createElement('div');
	statsWrapper.className='stats';
	stats.parentNode.insertBefore(statsWrapper,stats);
	stats.parentNode.removeChild(stats);
	statsWrapper.appendChild(stats);
}

//do shit with the page title/window
var h1=document.getElementsByTagName('h1')[0];
var h2=document.getElementsByTagName('h2')[0]?document.getElementsByTagName('h2')[0]:h1;
var title=(h1?h1.textContent:'')+(h2!==h1?' > '+h2.textContent:'');
var shadow=document.createElement('div');
shadow.className='window-shadow';
var header=document.createElement('div');
header.className='window-header';
header.innerHTML='<span class="window-header-title">'+title+'</span><div class="window-header-right"></div>';
var body=h1.parentNode;
body.insertBefore(shadow,h1);
shadow.appendChild(header);
while(!(h2.nextSibling.tagName=='BR'&&h2.nextSibling.nextSibling.tagName=='BR'&&(h2.nextSibling.nextSibling.nextSibling==statsWrapper||h2.nextSibling.nextSibling.nextSibling.tagName=='SMALL'))){
	var child=h2.nextSibling;
	body.removeChild(child);
	shadow.appendChild(child);
}
body.removeChild(h1);
if(h2!==h1)
	body.removeChild(h2);

//do shit with stickys
if(location.pathname=='/showtopics.php'){
	rows=document.getElementsByClassName('grid')[0].rows;
	for(var i=1;i<rows.length;i++){
		if(rows[i].cells[0].lastChild.firstChild&&rows[i].cells[0].lastChild.firstChild.firstChild.tagName=='B'){
			unsafeWindow.console.log(rows[i]);
			var sticky=document.createElement('div');
			sticky.className='sticky';
			var b=rows[i].cells[0].lastChild.firstChild.firstChild;
			b.parentNode.insertBefore(sticky,b);
			b.parentNode.removeChild(b);
			sticky.appendChild(b);
		}
	}
}

//fix shit on the userbar
var userbar=document.getElementsByClassName('userbar')[0];
if(userbar){
	for(var i=userbar.childNodes.length-1;i>=0;i--)
		if(!userbar.childNodes[i].tagName||userbar.childNodes[i].textContent=='Help')
			userbar.removeChild(userbar.childNodes[i]);
	if(userbar.childNodes.length==0)
	userbar.parentNode.removeChild(userbar);
}

//zebra time
if(document.getElementsByClassName('grid')){
	var rows=document.getElementsByClassName('grid')[0].rows;
	for(var i=1;i<rows.length;i++){
		if(i%2==1)
			rows[i].className='zebra_0';
		else
			rows[i].className='zebra_1';
	}
}


//-----Improved version
//fuck with scrollbar
//transparency for the icon images
//figure out how to have the textured background while still using a background color
//allow the use of theme colors with applelinks
//make text in the pager bigger

//MODULES
//topic title on message top
//dramalinks
//better profile link
//a bunch of links for the menubar
//applelinks color scheme