// ==UserScript==
// @name UTN FRRe: SysAcad - Extra Info Exámenes
// @namespace http://sysacadweb.frre.utn.edu.ar
// @author Sebastián J. Seba
// @version 1.2.8
// @description Muestra información ampliada sobre los exámenes tales como promedios generales, aplazos, cantAusentes y más.
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include http://sysacadweb.frre.utn.edu.ar/examenes.asp
// @include http://sysacadweb.frre.utn.edu.ar/examenes.asp?id=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @downloadURL https://userscripts.org/scripts/source/98262.user.js
// @updateURL https://userscripts.org/scripts/source/98262.meta.js
// @grant none
// ==/UserScript==


window.addEventListener('load', function() {
  var main = function() {
    var cantFinAprob = 0,
        cantFinDesap = 0,
        sumDesap = 0,
        sumAprobados = 0,
        cantAusentes = 0,
        promedios = 0,
        materias = {},
        ord_materias = [],
        bg_color_ap = '#00FF00',
        bg_color_des = '#FF6600',
        bg_color_aus = '#FFFF99',
        bg_color_hover = '#87CEFA',
        bg_color_aux = '#FFFFFF',
        notas = {
          'uno': 1,
          'dos': 2,
          'tres': 3,
          'cuatro': 4,
          'cinco': 5,
          'seis': 6,
          'siete': 7,
          'ocho': 8,
          'nueve': 9,
          'diez': 10
        };

    $('body table table table:first tr:not(:first-child)').each(function () {
      var $tr = $(this),
          strNota = $tr.find('td:nth-child(3)').text().replace(/^\s*|\s*$/g, ''),
          strCodMateria = $tr.find('td:nth-child(6)').text().replace(/^\s*|\s*$/g, ''),
          strNombreMateria = $tr.find('td:nth-child(2)').text(),
          nota;

      if (strNota !== 'Insc.') {
        if (strNota === 'Ausen.') {
          cantAusentes++;
        }
        else {
          nota = notas[strNota];

          if (nota >= 4){
            cantFinAprob++;
            sumAprobados += nota;
          }
          else {
            cantFinDesap++;
            sumDesap += nota;
          }

          if (typeof materias[strCodMateria] !== 'undefined' && materias[strCodMateria] !== null) {
            materias[strCodMateria][1] += 1;
          }
          else {
            materias[strCodMateria] = [strNombreMateria, 1];
          }
        }
      }
    });

    for (var key in materias) {
      if (materias.hasOwnProperty(key)) {
        ord_materias.push(materias[key]);
      }
    }

    ord_materias.sort(function(a, b) {
      return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0;
    });

    agregarTablas(ord_materias);

    promedios = calcularPromedio(cantFinAprob, cantFinDesap, sumAprobados, sumDesap);

    $('#promConAplazosVal').text(promedios.promConAp.rounded);
    $('#promSinAplazosVal').text(promedios.promSinAp.rounded);
    $('#promConAplazosValFull').text(promedios.promConAp.full);
    $('#promSinAplazosValFull').text(promedios.promSinAp.full);
    $('#finRendidosTotalVal').text(cantFinAprob + cantFinDesap);
    $('#finRendidosAprobadosVal').text(cantFinAprob);
    $('#finRendidosDesaprobadosVal').text(cantFinDesap);
    $('#fincantAusentesVal').text(cantAusentes);

    $('#hl_aprobados').click(function() {
      var highlight = $(this).prop('checked');

      $('body table table table:first tr:not(:first-child)').each(function() {
        var $tr = $(this),
            strNota = $tr.find('td:nth-child(3)').text().replace(/^\s*|\s*$/g, ''),
            bg_color = '#FFFFFF',
            nota;

        if (strNota !== 'Insc.') {
          if (strNota !== 'Ausen.') {
            nota = notas[strNota];
            if (nota >= 4) {
              bg_color = highlight ? bg_color_ap : '#FFFFFF';
              $tr.css({'background-color': bg_color});
            }
          }
        }
      });
    });

    $('#hl_desaprobados').click(function() {
      var highlight = $(this).prop('checked');

      $('body table table table:first tr:not(:first-child)').each(function() {
        var $tr = $(this),
            strNota = $tr.find('td:nth-child(3)').text().replace(/^\s*|\s*$/g, ''),
            bg_color = '#FFFFFF',
            nota;

        if (strNota !== 'Insc.') {
          if (strNota !== 'Ausen.') {
            nota = notas[strNota];
            if (nota < 4) {
                bg_color = highlight ? bg_color_des : '#FFFFFF';
                $tr.css({'background-color': bg_color});
            }
          }
        }
      });
    });

    $('#hl_cantAusentes').click(function() {
      var highlight = $(this).prop('checked');

      $('body table table table:first tr:not(:first-child)').each(function() {
        var $tr = $(this),
            strNota = $tr.find('td:nth-child(3)').text().replace(/^\s*|\s*$/g, ''),
            bg_color = '#FFFFFF';

        if (strNota === 'Ausen.') {
          bg_color = highlight ? bg_color_aus : '#FFFFFF';
          $tr.css({'background-color': bg_color});
        }
      });
    });

    $('body table table tbody tr').not(':first').hover(
      function() {
        $obj = $(this);
        bg_color_aux = $obj.css('background-color');
        $obj.css('background-color', bg_color_hover);
      },
      function() {
        $(this).css('background-color', bg_color_aux);
      }
    );
  };

  var calcularPromedio = function(cantAp, cantDes, sumAp, sumDes) {
    var promSinAplazoFull = sumAp / cantAp,
        promConAplazoFull = (sumAp + sumDes) / (cantAp + cantDes),
        promSinAplazo = Math.round((promSinAplazoFull * 100)) / 100,
        promConAplazo = Math.round((promConAplazoFull * 100)) / 100;

    return {promSinAp: {full: promSinAplazoFull, rounded: promSinAplazo},
            promConAp: {full: promConAplazoFull, rounded: promConAplazo}
    };
};

var agregarTablas = function(ord_materias) {
  var tablapromedios = '<table class="inftable" id="tablapromedios"><thead>' +
      '<tr><th class="tituloBloque" colspan="3">Promedio General</th></tr></thead><tbody>' +
      '<tr><td>Con aplazos</td><td id="promConAplazosVal" class="resultados"></td><td id="promConAplazosValFull" class="resultados"></td></tr>' +
      '<tr><td>Sin aplazos</td><td id="promSinAplazosVal" class="resultados"></td><td id="promSinAplazosValFull" class="resultados"></td></tr>' +
      '</tbody></table>',

      tablaexamenes = '<table class="inftable" id="tablaexamenes"><thead>' +
      '<tr><th class="tituloBloque" colspan="3">Ex&aacute;menes Finales</th></tr></thead><tbody>' +
      '<tr><td>Rendidos</td><td id="finRendidosTotalVal" class="resultados"></td></tr>' +
      '<tr><td>Aprobados</td><td id="finRendidosAprobadosVal" class="resultados"></td>' +
      '<td id="hlap"><div><input id="hl_aprobados" type="checkbox" name="highlight" />' +
      '<label for="hl_aprobados">Resaltar</label></div></td></tr>' +
      '<tr><td>Desaprobados</td><td id="finRendidosDesaprobadosVal" class="resultados"></td>' +
      '<td id="hldes"><div><input id="hl_desaprobados" type="checkbox" name="highlight" />' +
      '<label for="hl_desaprobados">Resaltar</label></div></td></tr>' +
      '<tr><td>Ausentes</td><td id="fincantAusentesVal" class="resultados"></td>' +
      '<td id="hlau"><div><input id="hl_cantAusentes" type="checkbox" name="highlight" />' +
      '<label for="hl_cantAusentes">Resaltar</label></div></td></tr>' +
      '</tbody></table>',

      tablamaterias = '<table class="inftable" id="tablamaterias"><thead>' +
      '<tr><th class="subtitulo">Materia</th><th class="subtitulo">Cantidad de veces rendida</th></tr></thead><tbody>';

  for (var j in ord_materias) {
    if (ord_materias.hasOwnProperty(j)) {
      tablamaterias += '<tr><td>' + ord_materias[j][0] + '</td>';
      tablamaterias += '<td class="resultados">' + ord_materias[j][1] + '</td></tr>';
    }
  }

  tablamaterias += '</tbody></table>';

  $('body table table table').after(tablapromedios +
    tablaexamenes + tablamaterias
  );

  $('.inftable').css({
    'margin': '8px 0 0 0',
    'width': '100%',
    'cellspacing': '0',
    'cellpading': '0',
    'border-width': '1px',
    'border-color': 'black',
    'border-style': 'solid',
    'background-color': '#FFFFFF',
  });

  $('.inftable').find('td').css({
    'border-width': '1px',
    'border-color': 'black',
    'border-style': 'solid',
    'width': '100%',
    'padding': '0 5px 0 5px',
  });

  $('.inftable').find('td.resultados').css({
    'text-align': 'center',
    'white-space': 'nowrap',
    'padding': '0 20px 0 20px',
  });


  $('.inftable').find('th').css({
    'border-width': '1px',
    'border-color': 'black',
    'border-style': 'solid',
    'white-space': 'nowrap',
    'text-align': 'center',
    'font-weight': 'bold',
    'background-color': '#F0F0F0',
    'padding': '0 10px 0 10px',
  });

  $('.inftable').find('div').css({
    'display': 'block',
    'clear': 'left',
    'width': '80px',
  });

  $('#hlap').css({'background-color': '#00FF00'});
  $('#hldes').css({'background-color': '#FF6600'});
  $('#hlau').css({'background-color': '#FFFF99'});
};

main();
});
