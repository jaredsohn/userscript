// ==UserScript==
// @name       Mashup Mapa da Prova - QC
// @namespace  http://rioseeds.com/
// @version    0.3
// @description  Liga as questões do mapa da prova com uma busca para os comentários no Questões de Concurso
// @match      http://app.mapadaprova.com.br/sessoes/*
// @match      http://www.questoesdeconcursos.com.br/questoes/*
// @copyright  2013+, Diogo
// ==/UserScript==


/*
 * 0.3 clear question title from html tags
 * 0.2 minimal workround, changed tag name of question title
 * 0.1 initial version
 */

var SEARCH_URL = 'http://www.google.com/search?btnI=1&q=site%3Awww.questoesdeconcursos.com.br%2Fquestoes%20';

var questionList = document.getElementsByClassName("grid_19 questao");

for (var question = null, i = 0; (question = questionList[i]); i++) {

    whereToInsert = question.getElementsByClassName("grid_5");
    
    var questionTitle = question.getElementsByClassName("grid_16 enunciado_me texto_principal")[0].innerHTML;
        questionTitle = questionTitle.replace(/(\r\n|\n|\r)/gm," ");
	    questionTitle = questionTitle.replace(/<br>/gi," ");
	    questionTitle = questionTitle.replace(/(<([^>]+)>)/ig," ");

    var completeURL = SEARCH_URL + questionTitle;

    var elmNewContent = document.createElement('a');
	elmNewContent.href = completeURL;
    elmNewContent.target = "_blank"
    elmNewContent.appendChild(document.createTextNode('C'));

    whereToInsert[0].appendChild(elmNewContent);     
}

/*
//auto click nos comentários do Questões de Concursos
var candidates = document.getElementsByTagName("a");
for (var cand = null, i = 0; (cand = candidates[i]); i++) {
	if (cand.href.match(/coment/i) ) { 
      	cand.click();
    } 
}
*/