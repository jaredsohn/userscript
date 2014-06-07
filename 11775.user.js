// ==UserScript==
// @name             Use right pictures
// @author           Kai Jesussek
// @date             August 28, 2007
// @namespace        http://wie-ich.de/people/
// @include          http://wie-ich.de/people/*
// @include          http://www.wie-ich.de/people/*
// ==/UserScript==


//bilder klar sehen
document.body.innerHTML=document.body.innerHTML.replace(/javascript:pic/g,'javascript:blafoo');
bf = document.createElement("script");
Text = document.createTextNode('function blafoo(id){ document.picture.src="http://static.wie-ich.de/up/" + id + "-250.jpg";document.getElementById("becomepremium").style.display="none";document.getElementById("textpart" + old).style.display="none";old = id;document.getElementById("textpart" + old).style.display="block"; }');
bf.appendChild(Text);
document.body.appendChild(bf);

var css="input { background-color:black !important; color: #dddddd !important; }textarea { background-color:black !important; color: #dddddd !important; }select { background-color:black !important; color: #dddddd !important; }body               { background: #000000 !important; padding: 0 !important; margin: 0 !important; color: #ffffff !important;}a:link                  { color: red !important; text-decoration: none !important;}a:visited               { color: red !important; text-decoration: none !important;}a:hover { color: #ffcccc !important; text-decoration: underline !important;}img                { border: 0px !important;}form               { margin: 0px !important; padding: 0px !important;}td                 { background: #000000 !important; color: #ffffff !important; text-align: left !important; font-size: 11px !important;}h1, h2, h3         { color: white !important; margin: 0px !important; padding: 0px !important;}h3                 { font-weight: normal !important;}h4, h5             { color: #e04000 !important; padding: 0px !important; margin: 0px 0px 6px 8px !important;} /* #e04060 */h1                 { font-size: 14px !important;}h2, h3, h4, h5     { font-size: 11px !important;}table { border-width: 3px 3px 3px 3px !important; border-spacing: 0px !important; border-style: outset outset outset outset !important; border-color: red red red red !important;  border-collapse: collapse !important; background-color: black !important;}table th { border-width: 0px 0px 0px 0px  !important; padding: 0px 0px 0px 0px !important; border-style: none none none none !important; border-color: black black black black !important; background-color: black !important; -moz-border-radius: 0px 0px 0px 0px !important;}table td { border-width: 0px 0px 0px 0px !important; padding: 0px 0px 0px 0px !important; border-style: none none none none !important; border-color: black black black black !important; background-color: black !important; -moz-border-radius: 0px 0px 0px 0px;}}"
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}
