// ==UserScript==
// @name          DreamWorld Auto Use Skill
// @namespace     http://diveintogreasemonkey.org/download/
// @description   No need to wait for the powerbar anymore!
// @include       http://*playmage.com/*
// @include       http://*kongregate.com/games/kingk/dream-world*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

function contentEval(source) {
	if ('function' == typeof source) source = '(' + source + ')();'

	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	document.body.appendChild(script);
	document.body.removeChild(script);
}

function loop() {
	if (document.getElementById("transdiv")) return;                       
	var useskl=document.getElementById('skbt');
	if(useskl!=null){
		contentEval(function(){ window.startPB = function(){ 
			location.href = "javascript:(" + encodeURI( function() {
				if (document.getElementById("skillselected").value < 0) {
				showAlert("Please select a skill first."); ;return;}

				sendRequest("/dream/battle?skill=" + document.getElementById("skillselected").value + "&power=" + 100, stateChange2, 400); 
			}) + ")()";
		}});
	}
}


function loop1() {
	if (document.getElementById("transdiv")) return;                       

	var pp = document.body.innerHTML + '';
	if(pp.indexOf('Restore 1 energy') == -1) return;

	var els = document.getElementsByTagName('*');
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\\\s)'+'btn50'+'(\\\\s|$)');
	for (var i = 0, j = 0; i < elsLen && j == 0; i++) {
		if (pattern.test(els[i].className)) {
			fstr=els[i].attributes[0].value;
			if(fstr.indexOf('healer?buy=mp') != -1){
				els[i].setAttribute('onclick', 'newbuymist();');
//				alert(els[i].attributes[0].value);
				contentEval(function(){ window.newbuymist = function(){ 
					location.href = "javascript:(" + encodeURI( function() {
//						alert('new f');
						loadDivEquip('/dream/healer?buy=mp');
						setTimeout(function(){
						requestPending=false;
//						alert('timeout f');
						var els1 = document.getElementsByTagName('*');
						var elsLen1 = els1.length;
						var pattern1 = new RegExp('(^|\\\\s)'+'btn40'+'(\\\\s|$)');
						for (i = 0, j = 0; i < elsLen1; i++) {
							if ( pattern1.test(els1[i].className)  && j == 0) {
								fstr=els1[i].onclick+'';
								if(fstr.indexOf('use=') != -1){
									els1[i].onclick();
									j++;
								}
							}
						}}, 150);
					}) + ")()";
				}});

/*				els[i].onclick = function(){
					location.href = "javascript:(" + encodeURI( function() {
						alert('new f');
						loadDivEquip('/dream/healer?buy=mp');
						setTimeout(function(){
						requestPending=false;
						alert('timeout f');
						var els1 = document.getElementsByTagName('*');
						var elsLen1 = els1.length;
						var pattern1 = new RegExp('(^|\\\\s)'+'btn40'+'(\\\\s|$)');
						for (i = 0, j = 0; i < elsLen1; i++) {
							if ( pattern1.test(els1[i].className)  && j == 0) {
								fstr=els1[i].onclick+'';
								if(fstr.indexOf('use=') != -1){
									els1[i].onclick();
									j++;
								}
							}
						}}, 150);
					}) + ")()";
				};*/
				j++;
			}
		}
	}
	
}
setInterval(loop, 500);
setInterval(loop1, 500);