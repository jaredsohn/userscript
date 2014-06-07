// ==UserScript==
// @name          MathYssy
// @description	  Apply Mathjax to Yssy
// @include       http://bbs.sjtu.edu.cn/bbscon*
// @include       https://bbs.sjtu.edu.cn/bbscon*
// @include       http://bbs.sjtu.edu.cn/bbstcon*
// @include       https://bbs.sjtu.edu.cn/bbstcon*
// ==/UserScript==


function loadScript(url) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.setAttribute("src",url);
    document.head.appendChild(script); // run the script
}

loadScript("https://d3eoax9i5htok0.cloudfront.net/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML");

var pres = document.getElementsByTagName("pre");
for(var i = 0;i<pres.length;++i){
	var regex = /\[\[MATH[\s\S]*\]\]/m;
	var target = pres[i].innerHTML;
	var match=regex.exec(target);
	if(match==null) return;
	var result = match[0];
	var lines = result.split("\n");
	var markup = '<div class="mathjax">';
	for(var j=1;j<lines.length-1;++j){
		markup+=lines[j]+"\n";
	}
	markup+="</div>";
	pres[i].parentNode.innerHTML = '<div class="pre">'+target.replace(result,markup).replace(/\n/,"\n<br>")+"</div>";
}

