// ==UserScript==
// @name           Netgear Textarea
// @namespace      http://192.168.1.1
// @description    Maximize the textarea log
// @include        http://192.168.1.1
// ==/UserScript==


String.prototype.pad = function(l, s, t){
    return s || (s = " "), (l -= this.length) > 0 ? (s = new Array(Math.ceil(l / s.length)
        + 1).join(s)).substr(0, t = !t ? l : t == 1 ? 0 : Math.ceil(l / 2))
        + this + s.substr(0, l - t) : this;
};

GM_addStyle(
	'textarea { font-family: "Consolas"; width: 100% !important; height: 100%; font-size: 12px; }'
);

textarea = document.getElementsByTagName('textarea')[0];

bod = document.getElementsByTagName('form')[0]

bod.innerHTML = '';

bod.appendChild(textarea);

arr = textarea.value.split("\n");
	  textarea.value = '';
var clean = [];
for ( var x =0; x<arr.length; x++ ){
	if ( arr[x] != '' ) {
		var line = arr[x].split("] ");
		clean[x] = line[0].replace(/\[ALLOW: /gi,"").toString().pad(50, ' ', 1) + "|" + line[1];
	}
}

clean.sort();

for ( var x =0; x<clean.length; x++ ){
	textarea.value+= clean[x] + "\n";
}