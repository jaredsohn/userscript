// ==UserScript==
// @name           antiveinx2
// @namespace      antiveinx2
// @description    Oculta los post de veinx en MV. Permite alternar entre mostrarlos y ocultarlos con un nuevo boton que aparece debajo de los enlaces a las páginas del post.
// @include        http://www.mediavida.com/*
// ==/UserScript==
 
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
		var posts_selection = $(".autor").filter(" :contains(Veinx)").parent();
		posts_selection.hide();
		posts_selection.before("<div id='barra' style='text-align: center;margin-right: auto;margin-left: auto;border: 2px solid #555; background-color: #ccc;width: 780px;padding: 5px;'><span style='color: #CF1A1A;'><strong>Post ocultado por pesado.<\/strong><\/span><\/div>");
		$("#scrollpages").append("<div id='botonocultar' style='text-align: center;margin-right: auto;margin-left: auto;border: 2px solid #555; background-color: #ccc;width: 30px;height: 30px;'>X<\/div>");
		$("#botonocultar").click(function () { 
			if($(".autor").filter(" :contains(Veinx)").parent().is(":hidden")) {
				jQuery('div').remove('#barra');
				posts_selection.slideDown();
			} else {
				posts_selection.slideUp();
				posts_selection.before("<div id='barra' style='text-align: center;margin-right: auto;margin-left: auto;border: 2px solid #555; background-color: #ccc;width: 780px;padding: 5px;'><span style='color: #CF1A1A;'><strong>Post ocultado por pesado.<\/strong><\/span><\/div>");

			}
		});
}

// load jQuery and execute the main function
addJQuery(main);