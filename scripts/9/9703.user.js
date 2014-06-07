// ==UserScript==
// @name           Bookmark
// @namespace      http://zhekanax.livejournal.com/
// @include        http://*
// ==/UserScript==
lenta=document.createElement("img");
lenta.src="data:image/gif;base64,R0lGODlhrQItAIQeAAFEcF+OrQA6YwBUiRNNdO7090NvjpS2zKjE1jNlhwE/amKfxAlDawBLe9jk7BhQdgRgmCl5qhdsoMna5SZafQlGcQ5JcT6GsXumwrnQ3xlFYh1fiQBHdgIzUv///////yH5BAEAAB8ALAAAAACtAi0AAAX+4CeOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8O4EccBgFngMIs7v+/+AgYAIGRl0eIgXFwsTgo6PkJGSk0GGE4YHB4h4iop7lKChoqOkfJkTl5qbnRGtEZ+lsbKztLVLeg6pdquKrhISB7bCw8TFxienDhmqiQu9Eb/RGMfU1dbXgQcIDsqHvBe+0RASGA7Y5+jp6lvJy9/grdES4xD1jOv4+fr7QHTcc3cSPYMmj149CK/4KVzIsGEJf6kEDix4sOLBew4zatx4jE6hO3YCwiMobp5Fi8D+zHFcybLlJAQLAjrrpMhZyZM4K0YI5rKnz59sDigKECFBBhILJPQyeXIABKcDoj6F+jQChkZAs2rdigXDhgsbHmjAilRCvHpQqap9OpWtUwgBDqjkSreu3SEbNiTQwJeniQASDECTGrWw4cJTD0OVEAAB2buQI0tuEaBCggcdMgdQEeGrhA2KQ4sWfeHA0cmoU0NGQEDB3swdNqtAkPeChNG4c0f9iku1798sMTDoIIAC5swGWhyoDVq3c9yM9QCfTn0dggSZBXTQgB35CwwQElxIMKBBVPPl06c3z369+/bt1Q/gra26/fuzMDwQoB12h+7/xbDAA4F1xh588L3+p2CCDRzooHuCBWAHArDgZ+GFbWSAgQEVKMCff5nx5Z0Myz0QgQEbNKjiiiy26OKLMMa44gaCGSChHX7RQCGFGPbo4w11BGBAgxwAYCR//fkngAEjzoCAAQMkUFR5MlZp5ZUwcqAlB1i6GKWULnjV5ZhklmnmmWimqeaabLbp5ptwxinnnHTWSaaWDWxppAIeJukfBRrEhkMA8xmAop2IxkjjBrKxMOSWkEYq6aSUVmrppZhmqummnHbq6aeghirqqKSWauqpqKaq6qqsVmokAHx+COJ2FHQwTQ5eFZpAiq32eumiOc7m67DEFmvsscgmq+yyzDbrLABF7tknkkr+dsBkhThM4NUDNKL4gLOnPoAiDAZE++q56Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/AAcs8MDt8jltdsTxhx0QGSxAQQN6GbBrBeYSPDAHu8ZAgMUcd+zxxyCHLPLIJJds8snxKiBtrEi2zJ8BGhCxYQPcGpoABRujTC8HBpz2gs5ABy300EQXbfTRSMO659JKG8yyy/w9kECjRCAQAAUccJuAxGG9qrLSYH8tNtNjh0322WanrUAFVLuANgAMGBk33HIDUAHdd8edt914962333xXIPjghBdu+OGIJ6744ow37vjjkEcuuQUVUG555ZhfrnnmnG/ueef+oG8u+eikl2766ainjjjge7fO+utzx1433WrDqjKftufutNNQC0AAzExYnQAAFlCwtcTGWbD78sw37/zz0CcXQwUMpG7B9dhnr/323GtPgAXfhw/++OKXT/755odPwPrst+/++/DHL//89Ndv//34s/8AAfv3z/8DAAygAAdIwAIa8IAC5J8C/Ze/BjrwgRCMoATRR8H0VfCC3+ueBjeovcRRznHVi5sI6caA25lwdwKYFpKMRwBsMWFDDwAA/xKwNRoCUHnQy6EOdfgAGVBgcJrjIAfVJ8EiOhCBSEyiEpfIxCY68YlQjKIUp0jFKlrxik80ohbxdz4hapBzgwv+IQPGOEYFlNB5KUQSAwhAAQMYx4VRwEAAErA2NtLQZhRI3hl3yEfoCaBtLAiAGclISEJS75AhRKQFGLDIzzmycl6MpCS9aMFKkm+LmMxkBP3HyQV6spOg/KQoQ8lATZrylBDEoCozOMlWujJ7oQsdI2eJyFomspC4LKQZc5hGRj7AeG58AAMAqQWJ8ckCADReDW9mnP0t0kOxiiY0p5lCakqzmilkABxTkIE+GuyM4ORTCcc5yHKW8ZzkHKc6zblOdLJzkLmMpzznSc962vOe+MynPvfJz376858ADahAB0rQd7rzoO1Mp0ETustw7vKh3lyeABiZvQDmUZkSu5nUMMUVLDEEyY0TReYvlXk8Gl40gI1kAH9UmMaWsbSHMAiABkZKw+MZ6qY4zalOd8rTnvr0p0ANqlCHStSiGvWoSE2qUpfK1KY69alQjapUp4rUmpo0jyhVaRvj8ocACOlm/GHk/y5qVZxa1aoXTWsepfeCAFigd3CNq1znSte62vWueM2rXvfK17769a+ADaxgB0vYwhr2sIi1KwPOaiMJZcJnosiEV78KVjXm8n8EpAAxf8TZzrJkm54NrWhHS9rSmva0qE2talfL2ta69rWwjW0aQgAAOw==";
lenta.style.position="absolute";
lenta.style.cursor="move";
lenta.style.top="0px";
move=0;
removed=1;
lenta.addEventListener("click",function(e){
	move=move?0:1;
},true);
lenta.addEventListener("dblclick",function(e){
	removebookmark()
},true);
document.body.addEventListener("mousemove",function(e){
	if(move){
		lenta.style.top=e.pageY;
		lenta.style.left=e.pageX;
	}
},true);

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}


function newbookmark(){
	document.body.appendChild(lenta);
	lenta.style.top=document.body.scrollTop+20+"px";
	removed=0;
}

function gotobookmark(){
	if(parseInt(lenta.style.top))
		window.scrollTo(0,parseInt(lenta.style.top)-100);
}

function removebookmark(){
	document.body.removeChild(lenta);
	eraseCookie("GM_BOOKMARK_X"+window.location);
	eraseCookie("GM_BOOKMARK_Y"+window.location);
	removed=1;
}


window.setInterval(function(){
	if(!removed){
		eraseCookie("GM_BOOKMARK_X"+window.location);
		eraseCookie("GM_BOOKMARK_Y"+window.location);
		createCookie("GM_BOOKMARK_X"+window.location,lenta.style.left,100);
		createCookie("GM_BOOKMARK_Y"+window.location,lenta.style.top,100);
	}
},500)

if(readCookie("GM_BOOKMARK_X"+window.location)&&readCookie("GM_BOOKMARK_Y"+window.location)){
	document.body.appendChild(lenta);
	lenta.style.top=readCookie("GM_BOOKMARK_Y"+window.location);
	lenta.style.left=readCookie("GM_BOOKMARK_X"+window.location);
	removed=0;
}

GM_registerMenuCommand("add bookmark",newbookmark);
GM_registerMenuCommand("go to bookmark",gotobookmark);
GM_registerMenuCommand("remove bookmark",removebookmark);

gotobookmark();
