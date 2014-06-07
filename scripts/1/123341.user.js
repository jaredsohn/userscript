// ==UserScript==
// @name           Dirty Genderiser
// @author         Constantine
// @namespace      http://userscripts.org/users/248610
// @description    Наглядность половой принадлежности
// @include        http://dirty.ru/comments/*
// @include        http://*.dirty.ru/comments/*
// @include        http://*.d3.ru/comments/*
// @include        http://d3.ru/comments/*
// @run-at         document-end
// @version        1.0.2
// ==/UserScript==

(function(){
	
	var femaleContainer;
	var maleContainer;
	var gaugeContainer;
	var filterObject;
	var femaleCount = 0;
	var maleCount = 0;
	var endLeft;
	var endRight;
	var prcLeft;
	var prcRight;
	var blueBackground = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODcxNzY3RkUzRjgzMTFFMThDQTZBRTA0OTc4MDZFNUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODcxNzY3RkYzRjgzMTFFMThDQTZBRTA0OTc4MDZFNUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NzE3NjdGQzNGODMxMUUxOENBNkFFMDQ5NzgwNkU1RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NzE3NjdGRDNGODMxMUUxOENBNkFFMDQ5NzgwNkU1RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv1ompgAAADySURBVHjajFIxDsIwDIxTF6qqIMRHmfkC/2pXRgZGHtABGIDWJrYT0koMjazUsc/Xix1o29YtXuB2h+SzGsR4DuYdztcHIDC7UQNegQCySzXLTsFYDC/9y6VDyPmA81qQ/sUUU4LuX2TokaICIVZjTpZq8PGBVQEwuUg2NxGvR7zdKbAO7N4fjfhIbFKMOwg3egyrVK8uJAGme4qmLAmbqtKwI5Iv/LhNwrwA99uq8JIgEkhsyLyDhpZbbmowDrKepIZkdGpfOGLTxOigaA//ppP6iOCfdb1aV+Xo4nT8fO42SHOwPR2Zeemr6rpuOforwACVCapxoM0c3QAAAABJRU5ErkJggg==";
	var pinkBackground = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NDNDUzODUzRkI2MTFFMTg2NTdFRkVCQUYwQTUyNjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NDNDUzODYzRkI2MTFFMTg2NTdFRkVCQUYwQTUyNjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3Q0M0NTM4MzNGQjYxMUUxODY1N0VGRUJBRjBBNTI2NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3Q0M0NTM4NDNGQjYxMUUxODY1N0VGRUJBRjBBNTI2NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psdakn8AAADrSURBVHjajFLNDoIwDO5Gl4gg8al8R3wfOHj0BTx49EJiDCEwZtcOGMa/79B03df155uqqgr+hjqobD5YgOQdyc5sdzoDIrgRnOOAYqvDPcW9dTA6smgvVz4GqAmBvAa2bUvRkcFPBypZx9VW7K7rkDrh62WaKUcSZh+bprHWktf3/cwTxK9KfRSQZ4yJ+35hh07SNJUqcd8fpyyKQmsdt/htyk3O6tA6+W0PStbKr5yWPcWlMsK+COxh8E6SLBqJLl5Mq9nxu4NdBvlW1PI8rVa6S5wdPJbl3ehbah4m+f2r6rqWaf7BU4ABAOl71Dhk0sq9AAAAAElFTkSuQmCC";
	var blueLeft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAPCAYAAAAoAdW+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZEQUE2MzI0MDRCMTFFMUI2NDg4RUI3ODFFRUUyQkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZEQUE2MzM0MDRCMTFFMUI2NDg4RUI3ODFFRUUyQkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENkRBQTYzMDQwNEIxMUUxQjY0ODhFQjc4MUVFRTJCRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENkRBQTYzMTQwNEIxMUUxQjY0ODhFQjc4MUVFRTJCRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhfQUeIAAAGJSURBVHjaRJDPSyJhGMe/8/qOM828M9NYBu7241DKLkRBZHQoIpQ96l+wf4LQoVNXz3uKTh37AyLpGLuXGAgJoS6JUUpJSaOmsuOOpm9vgewXPjyHL5+Hh0finGMUx3HCYqQESUGcjop8Pp+oPnuZ499P6XPnEbXaX+DDLBQKif3D04voxi+OyAHf2bviZ06D01KpFK48tjIHRw9rpbKNn7tbWN8O4eltACrMVO5PLX1zrwM/FmBHx3DX6EENSKCe5yXPL/vA0iwwbcL7x+HyIfQgAfV9P37PGRCzAEXFzesQMwaBORCmOHSOrsygH7GwasmwtSAClABEmIqiVJZn+/N9puILC2JSl6HJBCqVQAzDyG8yF1O6hkmmwGIaxg31E2JZ1ll8ooeIX4FtMYR1ihALYJwRENM0c4vfYydLg2sMH67Qk3qYsIGQIJDNZj1Zll80im/tW+drq1aEP3iDJtZLo8e7rpuoVquZYrGYLpfLqNfr/8uPNJvNcKfTSbXb7WS3242/CzAAHxOYPDTw59MAAAAASUVORK5CYII=";
	var blueRight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAPCAYAAAAoAdW+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkU3NzI2RkU0MDRCMTFFMUFDNkVERTA5NzkzODJBQjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkU3NzI2RkY0MDRCMTFFMUFDNkVERTA5NzkzODJBQjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGRTc3MjZGQzQwNEIxMUUxQUM2RURFMDk3OTM4MkFCNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGRTc3MjZGRDQwNEIxMUUxQUM2RURFMDk3OTM4MkFCNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqW3B3gAAAGUSURBVHjaPFFPaxpxFJzfn11dq6u7EXHd0og1RkpSC41nL20vBfMxcvTUu18h5N5jIMd4qsGF1EshEnpoJaGaqGk1VdNGIW7dVXazKaUPhnkw8w4zjxx/rLcpQYMxVhMEoZLP58f4N2z/KLH7oX690f9lFSU2yzjL2VjX9c5fsVo9LHNXw/uDC5x1b7J+YZYNP3I6mqZ12Oudd+XVjQikhI7j6giDkakr0igci8oGHc8cXP62oaxJwJssWlcyPn11tpvNZpHezl3ceAbTYzyWgedP8KUdwHA4fEVHfwiuTeB84gA+P5AJo0dkTKfTPAVlYJxDCYjYivoALQz6Qodpmqs8FPBBWLoQRQfEM74kDMuFCYlJPR4J+TH3RMH2gpE5Fi6HOmghpsUaPBKksJdAwCKgPAir30DsroV0+m2Nqgqw4sEmNqzLU0S/V7H5bP0wl8tVuGVO8KP9DZPzz/D97GI9/fSkUCjsybI8JqVSyfUWKIqCVCr1cLGXTCaNh26JYRhtURQbqqrW4vF4xeP/X7kXYAAjAJOh6R3dcgAAAABJRU5ErkJggg==";
	var pinkLeft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAPCAYAAAAoAdW+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUIyN0M3Qjg0MDRDMTFFMTlERUZFQzc4MEUxRTE4QTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUIyN0M3Qjk0MDRDMTFFMTlERUZFQzc4MEUxRTE4QTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQjI3QzdCNjQwNEMxMUUxOURFRkVDNzgwRTFFMThBMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQjI3QzdCNzQwNEMxMUUxOURFRkVDNzgwRTFFMThBMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgkf8o0AAAF2SURBVHjaRFBNSwJRFD0zvvGDUUcnJpXMTKGlmzCKFi50rdv+QW6EoP8RRNAPCFoFQQUtpLWQim5SIts4IYEzMjTjF1HzmjcgXTjcxbnnHM7lKKVYTaPRUJxVdlBykCcrotVqFfWRVWs+titm/QqapgFM2e12izfn188nO/v0SIjS+vEppbd1SgaDgbIYfNa6l2d7mjpEtVpFoVDAz/c3iOfXLg/vHiqqqiKXyyGZTLqWhBAQv2GWep02UqkUZFnGcrkEx3Hw+XzgA1+z/Hw+RzwehyAIrsqyLEynUxDBpluZTAaSJCGRSEAURXg8HvA8D2KLgWE6nc76/X5EIhGEQiHX0s38UaKtWCyWZV3D4TCCwaBLsgieU+Sn2MaG+whmzZQM7IgXJenee7h7x67H4zFs24agyODW18B7vV7Nt715IRUOmjOnRr/fx6j3ClgzcKvH67penKgfNaPzUpm8veNL1/9JNoZhKE7HsmmapcVikf8TYAAkj5azpp7eOgAAAABJRU5ErkJggg==";
	var pinkRight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAPCAYAAAAoAdW+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUVEQUM4NDM0MDRDMTFFMTg1NjdCQUQ0MTQzOTgzQ0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUVEQUM4NDQ0MDRDMTFFMTg1NjdCQUQ0MTQzOTgzQ0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RURBQzg0MTQwNEMxMUUxODU2N0JBRDQxNDM5ODNDQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RURBQzg0MjQwNEMxMUUxODU2N0JBRDQxNDM5ODNDQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkpjKOEAAAGBSURBVHjaPFE7T8JgFD1f+7W1FFparEJAfEQig8FErQMuDobBQeOkk7/Ewf9A4g9wcFEHcEUdDAsYHdQ4+IoQQ0JNDPKQCLa2jXqTs9xzz7kn95JisfgAoOyg4CCfTqdN/BbZ5FRb13XImS0srMznImNa1jCME5dkrw/zO5Rlcbq3i7erm6QcmUx+Cd/P4XD4md1e39hJJBJw1ednBXze30UnZgyly+OEaTabME0TsVgMqVQKlUoFL7njNfbbWmU6nQ7cgW63C03TEI/HcXt5gYH3j2Wm1WrhT81xHJxdcAVio21QhmHAOoEkSfKsa7Ua3B5n2aPU5/OB53kPbtMtVVVhSeILlWUZvV7PIwkhsG0biqKgr6tl6vf70e/3PdK1bzQaGI5GQXStwJChEDhdg2VZqNfrEAQB/OJcTlKUPEWzjdfHJ1SrVRBKEckslYTxkazjZNL9owMog4MITU0iODud88VHssFg0LstKZVKD6Iolp1ghUAgkHeS/n/lR4ABACAEgqK/qlMKAAAAAElFTkSuQmCC";

	initGauge = function () {
		var footer = document.getElementsByClassName('b-post_footer_opts')[0];
		gaugeContainer = document.createElement("span");
		with (gaugeContainer) {
			style.cssFloat = "left";
			style.position = "absolute";
		}
		
		var t = document.createElement("table");
		t.setAttribute("cellpadding", 0);
		t.setAttribute("cellspacing", 0);
		var tr = document.createElement("tr");
		
		femaleContainer = document.createElement("td");
		femaleContainer.id = 'femaleContainer';
		with (femaleContainer) {
			style.color = "red";
			style.padding = "0 4px 0 4px";
			innerHTML = 0;
		}
		tr.appendChild(femaleContainer);

		endLeft = document.createElement("td");
		with (endLeft) {
			style.backgroundImage = "url(" + blueLeft + ")";
			style.width = "7px";
			style.height = "15px";
		}
		tr.appendChild(endLeft);
		
		var td = document.createElement("td");
		td.style.width = '100px';
		
		prcLeft = document.createElement("div");
		with (prcLeft) {
			style.width = "1px";
			style.height = "15px";
			style.cssFloat = "left";
			style.display = "none";
			style.backgroundImage = "url(" + pinkBackground + ")";
		}
		td.appendChild(prcLeft);

		prcRight = document.createElement("div");
		with (prcRight) {
			style.width = "100px";
			style.height = "15px";
			style.cssFloat = "right";
			style.backgroundImage = "url(" + blueBackground + ")";
		}
		td.appendChild(prcRight);
		tr.appendChild(td);

		endRight = document.createElement("td");
		with (endRight) {
			style.backgroundImage = "url(" + blueRight + ")";
			style.width = "7px";
			style.height = "15px";
		}
		tr.appendChild(endRight);

		maleContainer = document.createElement("td");
		with (maleContainer) {
			style.color = "blue";
			style.padding = "0 4px 0 4px";
			innerHTML = 0; // init value
		}
		tr.appendChild(maleContainer);

		t.appendChild(tr);

		gaugeContainer.appendChild(t);
		footer.insertBefore(gaugeContainer, document.getElementsByClassName('vote')[0]);
		initialized = true;
	}

	setGauge = function () {
		try {
			var cc = document.getElementsByClassName('c_footer');
//			GM_log('TOTAL NODES: ' + cc.length);
			femaleCount = 0;
			maleCount = 0;
			for (var i=0; i<cc.length; i++) {
				var color = "Transparent";
				if (/Написала/.test(cc[i].innerHTML)) {
					femaleCount++;
					color = "#f00";
				} else {
					maleCount++;
					color = "#00f";
				}
				var userNode = cc[i].getElementsByClassName('c_user')[0];
				userNode.style.color = color;
				userNode.style.textDecoration = 'none';
			}
			femaleContainer.firstChild.nodeValue = femaleCount;
			maleContainer.firstChild.nodeValue = maleCount;
			if (femaleCount > 0) {
				endLeft.style.backgroundImage = 'url(' + pinkLeft + ')';
				var fw = Math.round(100*femaleCount/(femaleCount+maleCount));
				prcLeft.style.display = 'block';
				prcLeft.style.width = fw + 'px';
				if (maleCount) {
					prcRight.style.width = (100-fw) + 'px';
					endRight.style.backgroundImage = 'url(' + blueRight + ')';
				} else {
					prcRight.style.display = 'none';
					endRight.style.backgroundImage = 'url(' + pinkRight + ')';
				}
			} else {
				endLeft.style.backgroundImage = 'url(' + blueLeft + ')';
				prcLeft.style.display = 'none';
				prcRight.style.display = 'block';
				prcRight.style.width = '100px';
				endRight.style.backgroundImage = 'url(' + blueRight + ')';
			}
			if (cc.length == 0) {
				gaugeContainer.style.filter = 'url(#grayscale)';
			} else {
				gaugeContainer.style.filter = '';
			}
		} catch (e) {
			GM_log('ERROR: ' + e);
		}
	}
	
	setFilter = function () {
    	var filter = document.getElementById('grayscale');
		// sanity check
    	if (!filter) {
	        // svgDocument = e.target.ownerDocument;
	        var svgns = 'http://www.w3.org/2000/svg';
	        var svg = document.createElementNS(svgns, 'svg');
	        var filter = document.createElementNS(svgns, 'filter');
	        filter.setAttributeNS(null, 'id', 'grayscale');
	        var cm = document.createElementNS(svgns, 'feColorMatrix');
	        cm.setAttributeNS(null, 'type', 'matrix');
	        cm.setAttributeNS(null, 'values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
	        filter.appendChild(cm);
	        svg.appendChild(filter);
	        document.body.appendChild(svg);
    	}
	}
	
// functional
	setFilter();
	
	initGauge();
	
	setGauge();

	// mark(document.getElementsByClassName('dd'));
	// mark(document.getElementsByClassName('b-post_footer_opts'));

	// If DOM changed
	document.addEventListener('DOMNodeInserted', setGauge, false);
//    window.addEventListener('pageshow', setFilter);


})();