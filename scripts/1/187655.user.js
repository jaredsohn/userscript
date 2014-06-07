// ==UserScript==
// @name           yamli-ar
// @namespace      http://yamli.com
// @description    yamli arabtechies 2014
// ==/UserScript==
YAMLIAT = {
current_id: 0,
nextId: function() {
	return "yamliat_"+YAMLIAT.current_id++
},
getInputs: function(root) {
	var inputs = [];
	block_inputs = document.getElementsByTagName('textarea');
	for (i=0; i < block_inputs.length; i++) {
		inputs.push(block_inputs[i]);
	}
	line_inputs = document.getElementsByTagName('input');
	for (i=0; i < line_inputs.length; i++) {
		if (line_inputs[i].type == "text") {
			inputs.push(line_inputs[i]);
		}
	}
	for (i=0; i < inputs.length; i++) {
		if (!inputs[i].id) {
			inputs[i].id = YAMLIAT.nextId();
		}
	}
	return inputs;
},
loadJsFile: function(url, callback){
	file = document.createElement('script');
	file.type = "text/javascript";
	file.src = url;
	document.body.appendChild(file);	
	if (callback) {
		file.onload = callback;
	}
}
}
YAMLIAT.loadJsFile("http://api.yamli.com/js/yamli_api.js", function() {
	if (typeof(Yamli) == "object" && Yamli.init( { uiLanguage: "ar" , startMode: "onOrUserDefault", assumeDomReady: true } ))
	{
	inputs = YAMLIAT.getInputs();
	for (i=0; i < inputs.length; i++) {
  		Yamli.yamlify( inputs[i].id, { settingsPlacement: "bottomLeft" } );
	}
	}
});