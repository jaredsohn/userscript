// ==UserScript==
// @id             www.edu.xunta.es/fprofe@cafi
// @name           Engadir funcionalidades a fprofe
// @version        1.0
// @namespace      http://www.edu.xunta.es/centros/cafi
// @author         Víctor Lourido Estévez
// @description    Permite engadir enlaces ao listaxe de inscritos de fprofe
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        https://www.edu.xunta.es/fprofe/procesaMatricula.do*
// @run-at         document-end
// ==/UserScript==


(function($){
	$.fn.extend({
        addLinks: function() {
			return this.each(function() {
				var id_persona = $('td[title="Seleccionado"] input', $(this)).attr('value');
				var dni = $('td:eq(1)', $(this)).text();
				var nombre =  $('td:eq(2) span:eq(0)', $(this)).text().trim();
				nombre = nombre.replace("(*)","");				
				var link = '<a href="https://www.edu.xunta.es/fprofe/seleccionAlumnos.do?DIALOG-EVENT-actividades=actividades'
							+ '&id_personas=' + id_persona 
							+ '&cod_tipo_documento=1&dni=' + dni
							+ '&nombre=' + nombre + '" target="alumnos"></a>';
							
				$('td:eq(0)', $(this)).wrapInner(link);
				$('td:eq(1)', $(this)).wrapInner('<a href="javascript:busca_dni(\'' + dni + '\')"></a>');
			});
        }
    });
})(jQuery);

try {

	// Generamos la función que permite crear un form y enviar sus datos por POST
    var scriptCode = new Array();
    
    scriptCode.push('function busca_dni(dni) {');
    scriptCode.push(' method = "post";');
    scriptCode.push(' var form = document.createElement("form");');
    scriptCode.push(' form.setAttribute("method", method);');
    scriptCode.push(' form.setAttribute("target", "cursos");');
    scriptCode.push(' form.setAttribute("action", "https://www.edu.xunta.es/fprofe/preparaBusquedaPersoas.do");');
    scriptCode.push(' var params = {"paxina" : "buscar", "resultadosPaxina" : "20", "id_personas" : "", "cod_tipo_documento" : "1", "DIALOG-EVENT-buscar" : "Buscar", "nome" : "", "doi" : dni };');
    scriptCode.push(' for(var key in params) {');
    scriptCode.push('  var hiddenField = document.createElement("input");');
    scriptCode.push('  hiddenField.setAttribute("type", "hidden");');
    scriptCode.push('  hiddenField.setAttribute("name", key);');
    scriptCode.push('  hiddenField.setAttribute("value", params[key]);');
    scriptCode.push('  form.appendChild(hiddenField);');
    scriptCode.push(' }');
    scriptCode.push(' document.body.appendChild(form);');
    scriptCode.push(' form.submit();');
    scriptCode.push('}');

    var script = document.createElement('script');
    script.innerHTML = scriptCode.join('\n');
    scriptCode.length = 0;

    document.getElementsByTagName('head')[0].appendChild(script); 

    $('#capaInscritos tbody tr').addLinks();
} catch (e) {
}
