// ==UserScript==
// @id             what-wiki-headline-nav
// @name           What.CD: Wiki Headline Navigation
// @namespace      hateradio)))
// @author         hateradio
// @version        1.1
// @description    This script adds a full navigation to wiki articles.
// @homepage       http://userscripts.org/scripts/show/103861
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFNTRFQTVDQjA2OEJFMDExOUE5RUM5NTQ4ODBERUY1NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMTVCQzM1MzhCMDgxMUUwQTJCOUQ0RUZFNDU2N0M3NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMTVCQzM1MjhCMDgxMUUwQTJCOUQ0RUZFNDU2N0M3NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTRFQTVDQjA2OEJFMDExOUE5RUM5NTQ4ODBERUY1NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTRFQTVDQjA2OEJFMDExOUE5RUM5NTQ4ODBERUY1NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgmuAmQAAAR4SURBVHjazFc5TxxJFH7d08O94hhuiLgEiDPglLgEBCCRrAg24G8gBySECJEjsdiBjTezYwIEQtwgJE5BwCVkbAyGRdzHdPfW95gamjmwkWC8JYqZ6n7zju9971WV8uXb91CbqvypquofCpH4e91hmibphqF//br36Z+3f/+raTb1r5CQkHd2TSNFVV7dA0M44HQ6KSExKU8s32jiX5hms5Fds5FA4bUBIMMwBQziU9cdYhmhAXZVRA7jgXCAFJNUQ0EubGJlD4DFp4dmuoghZyBIaLX1P0DA4tHvQMDLgcXFRRoYGKCtrS0WaG5upsbGRkpJSWGSKspDofb29lJdXR1lZGSQTVSS9d3GxgbrWV5eptraWqqvr6esrCww/ukU5OfnU2trK+m6zvWKz6CgILq7u3skd3FxQVNTUzQ4OEjn5+csZx1paWkUGxtLoaGh7KTD4WB95IGylwOIorCwkH9sGAatr6/T9fW1V3rGx8fp9PSUZmdnaX9/38tB6FlZWaGCggLSRJMDQpikPG51qi8OIOLy8nJWglScnJy4I5RyExMT/Ozs7IxGRkbo8vKSI5TvNzc36fDwkBEVnZbCwsLYEauOewfosQPyRWVlJTuA9draGt3c3LBBrBExcoucYg0UkBKgIHUsLCww7OBHcHAwG/dlx28Z4ocJCQnuaKQDGIg+NzeXyQUnj4+PaWlpiWWk4unpaSoqKmLYwQOG38cAJb08wwTjS0tL2cDq6ipDLCMcGhpinuTk5FB8fDw/g0GJAhDa3t6mvLw8jtxut/soQdPKAfIJj+TB1dUVo3B7e8tlCkNAALltampyE253d5dlJPxJSUlsHNE/1k+/1gmRBlQDhAExqmFycpKKi4sZVjhQVVVF4eHhLDM/P8/OQhbwA0XI+IPfhQD5TIFMQ1lZGX8H6Y6OjmhmZoZTA2hRLVFRUVRSUsIyo6Oj3BPm5uaY/ZDxZL4XCf0ZlwJwQBINTQcRJSYmMrRQjnctLS3uVPX391N0dDQT2Df8rumvD3jO9PR0iouLY+GxsTGGFg0K0auutpqcnMycwAAXsrOzvWT8IvCzzQMRAHLZyQAtIoNy2fvxHO1WymRmZrrZryhPH/J+igCGdAClB8L5aiwVFRVckjExMcx+yPiF/7nnAVkNNTU1FBERwW3V8/gGh6qrqxkhvLeyH2Xb1tbGOyRS8+zzAIx1dHTwj63Rew5suQcHB9TX10d7e3vU2dlJPT097BCQAzL3+wU9DwHkEdCi5ICAv7qOjIyknZ0d3rxwVhgeHmZCom+4t2OXvl/mgJww6m9TkbO7u5ubFdp2V1cXO43mhC09NTXVbdi8h+A+BS953Gpvb+coGxoaOF1IHVq1zLs8NVnT9+JnQhhFiUpdVoOMAK+NhzOhIRbiqiamSi9yJHXBbM2z9btpuOxJB3Td0J1in4eQqgTgasZ3Q510p5PPcNrRj8NPRowjRzHNOAGN7bUvyCY7cHeztrL8Xiyd2uePH37gloqLIu5qAbyToCYv/hNgAC9KqBiQJfAfAAAAAElFTkSuQmCC
// @icon64         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM4NTYzRTkwOEIwNjExRTA4MTBDQkRCNEQwNDQ1NEVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM4NTYzRTkxOEIwNjExRTA4MTBDQkRCNEQwNDQ1NEVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Qzg1NjNFOEU4QjA2MTFFMDgxMENCREI0RDA0NDU0RUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qzg1NjNFOEY4QjA2MTFFMDgxMENCREI0RDA0NDU0RUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5XenNiAAAJ/UlEQVR42uxbWWwUSRKN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
// @include        http*://*what.cd/wiki.php*
// @run-at         document-end
// @modified       30 May 2011
// @since          29 May 2011
// ==/UserScript==

var Wiki = {
	spans: document.querySelectorAll("span.size7,span.size5, span.size3"),
	sidebar : document.querySelector('.sidebar'),
	setnav : function(txt){
		this.d = document.createElement('div');
		this.d.id = 'wikinav'; this.d.className = 'box pad';
		this.u = document.createElement('ul');
		this.d.appendChild(this.u);
		this.sidebar.insertBefore(this.d,this.sidebar.querySelector('.box').nextSibling);
		this.sidebar.style.position = 'relative';
	},
	addtonav: function(txt,id,n){
		var li = document.createElement('li'), a = document.createElement('a');
		li.className = 'wikinav_'+n; a.href = '#'+encodeURIComponent(id); a.textContent = txt;
		li.appendChild(a);
		this.u.appendChild(li);
	},
	getnav : function(){
		var i = 0, span, hn, size, m, n;
		if(this.spans.length > 0){this.setnav(); this.setcss();}
		for(i; i < this.spans.length; i++){ span = this.spans[i];
			size = span.className.match(/\bsize(\d)\b/); size = parseInt(size[1],10);
			switch(size){
				case 3 : hn = 'h3'; n = 3; break;
				case 5 : hn = 'h2'; n = 2; break;
				case 7 : hn = 'h1'; n = 1; break;
				default: continue;
			}
			hn = document.createElement(hn);
			span.parentNode.insertBefore(hn,span);
			span.removeAttribute('class');
			hn.appendChild(span);
			hn.id = '_'+i+'-'+span.textContent.substring(0,20).replace(/\s|\.|&|#|\+/g,'').toLowerCase();
			this.addtonav(span.textContent,hn.id,n);
		}
	},
	setcss : function(){
		var s = document.createElement('style'),
		css = '\n\n#wiki .main_column h1,#wiki .main_column h2, #wiki .main_column h3 { font-weight:normal; border-radius: 2px; text-align: left; padding: 1px 5px; background:url(http://whatimg.com/images/07795061177988579383.png); } \
#wiki h1 {font-size: 30px} #wiki h2 {font-size: 27px} #wiki h3 {font-size: 16px} \
#wikinav ul {margin: auto 0px} #wikinav ul li { list-style-type: none; } .wikinav_1 {padding-left: 0px} .wikinav_2 {padding-left: 15px} .wikinav_3 {padding-left: 30px}';
		s.textContent = css;
		document.body.appendChild(s);
	}
};
Wiki.getnav();