// ==UserScript==
// @name Orkut - Formatacao
// @author Luiz Fernando da Silva Armesto 
// @version 0.1.1a-hugo-1
// @description Inclui barra de formatacao de texto, com visualizacao imediata, no Orkut (Icones criados por Eduardo Suarez para a Orkut Toolbar)
// @ujs:category general: plus
// @ujs:published 26/11/2005
// @ujs:modified 04/08/2006 - 15:45 (Horario de Brasilia)
// @ujs:documentation http://my.opera.com/Luiz%20Fernando/
// @ujs:download http://my.opera.com/Luiz%20Fernando/homes/gm/orkut_formatacao.user.js
// @include http://*orkut.com*
// @include *file*
// ==/UserScript==

/*************** Caso esteja aparecendo uma versao antiga do script clique no botao atualizar do Firefox **************/

/*                             Este script e melhor visualizado com fonte monoespacada                                */


/* Icones criados por Eduardo Suarez (http://www.orkut.com/Profile.aspx?uid=8445713867525943721) para a Orkut Toolbar */



//----------- Inicio das configuracoes padrao ------------------------------------------------------------//

var iniciarNegrito = false;
var iniciarItalico = false;
var iniciarSublinhado = false;
var iniciarCor = 0; // 0=padrao; 1=aqua, 2=blue, 3=teal, 4=navy, 5=violet, 6=purple, 7=red, 8=fuchsia, 9=pink, 10=orange, 11=yellow, 12=gold, 13=green, 14=lime, 15=olive, 16=maroon, 17=gray, 18=silver
var ativarBotaoLinkSimples = false;

var mostrarAviso = true;
var AtivarDebug = 0;

//----------- Fim das configuracoes padrao ---------------------------------------------------------------//

/******************************************************
 *                                                    *
 *      Este script e distribuido sob Copyleft        *
 *                                                    *
 *   Pode ser utilizado, modificado e distribuido     *
 *   livremente. Programas ou outros scripts que      *
 *   incluam qualquer trecho deste devem ser          *
 *   distribuidos livremente, podendo conter licenca  *
 *   especifica, compativel com o conceito Copyleft.  *
 *                                                    *
 ******************************************************
 *                                                    *
 *   Recomenda-se que utilize o seguinte formato de   *
 * versao para modificacoes que mantenham o nome do   *
 * script:   NO-ID-NM    , onde                       *
 * NO: Numero da versao do script original            *
 * ID: Sigla que identifique quem o modificou         *
 * NM: Numero da versao do script modificado          *
 *                                                    *
 * exemplo: Orkut - Formatacao (GM) 0.1.0-mickey-1    *
 *                                                    *
 * Ou seja, versao "1" da modificacao feita pelo      *
 * "Mickey" no script "Orkut - Formatacao (GM) 0.1.0" *
 *                                                    *
 * Isto evita confusoes, entre elas que sejam         *
 * lancadas duas versoes diferentes com o mesmo       *
 * numero.                                            *
 *                                                    *
 * No cabecalho inclua o nome do autor da modificacao *
 * no item @author, apos o nome do autor original.    *
 * Exemplo:                                           *
 * @author Luiz F. S. Armesto (modificado por Mickey) *
 *                                                    *
 ******************************************************/

(function() { 
addEventListener('load', function(event) {

var versao = "0.1.1a";

var WYSIWYG = true;
var alerta  = false;
var SM, Barra, B, I, U, C, COR, L, TL, S, Cbar, IMG, SIG, SG, R, /**/F;
var assinaturaPadrao = 0;
var RTE_iniciado = false;
var Orkut_maxLength = 2048;
var inserirAssinatura = "";
var assinaturaAutomatica = false;
var assinaturasLength = 0;
var lembrarTipo = false;
var assinaturas = new Array();

if (location.hostname.indexOf('orkut.com') >-1 || location.hostname.indexOf('home') == -1) { // Verifica se esta na pagina do Orkut
	
	function Debug(mensagem) {  
		if (AtivarDebug == 1)
			alert(mensagem);
	}
	
	function CarregarConfig() {
		if (GM_getValue('iniciarNegrito') != null) 		iniciarNegrito 	= GM_getValue('iniciarNegrito');
		if (GM_getValue('iniciarItalico') != null) 		iniciarItalico 	= GM_getValue('iniciarItalico');
		if (GM_getValue('iniciarSublinhado') != null) 	iniciarSublinhado = GM_getValue('iniciarSublinhado');
		if (GM_getValue('iniciarCor') != null) 			iniciarCor 			= GM_getValue('iniciarCor');
		
		if (GM_getValue('lembrarTipo') != null) lembrarTipo = GM_getValue('lembrarTipo');
		if (GM_getValue('assinaturas') != null) assinaturasLength = GM_getValue('assinaturas');
		
		if (GM_getValue('assinatura_padrao') != null) assinaturaPadrao = GM_getValue('assinatura_padrao');
		for (var i=0; GM_getValue('assinatura_nome_'+i) != null && i < assinaturasLength; i++) {
			assinaturas[i] = new Array();
			assinaturas[i][0] = unescape(GM_getValue('assinatura_nome_'+i));
			assinaturas[i][1] = unescape(GM_getValue('assinatura_texto_'+i));
			assinaturas[i][2] = (assinaturaPadrao == i) ? 1 : 0;
		}
		if (GM_getValue('assinaturaAutomatica') != null) assinaturaAutomatica = GM_getValue('assinaturaAutomatica');
		if (assinaturaAutomatica && assinaturaPadrao > -1) inserirAssinatura = assinaturas[assinaturaPadrao][1];
	}
	CarregarConfig();
	
	var sorrisos = [
	["8)", "http://images3.orkut.com/img/i_cool.gif",     "Legal"    ],
	[":(", "http://images3.orkut.com/img/i_sad.gif",      "Triste"   ],
	[":x", "http://images3.orkut.com/img/i_angry.gif",    "Irritado" ],
	[":)", "http://images3.orkut.com/img/i_smile.gif",    "Rindo"    ],
	[";)", "http://images3.orkut.com/img/i_wink.gif",     "Piscando" ],
	[":D", "http://images3.orkut.com/img/i_bigsmile.gif", "Sorrisao" ],
	[":o", "http://images3.orkut.com/img/i_surprise.gif", "Surpreso" ],
	[":P", "http://images3.orkut.com/img/i_funny.gif",    "Engracado"],
	["/)", "http://images3.orkut.com/img/i_confuse.gif",  "Confuso"  ]
	];
	
	var cores = [	
			["padrao",  "Padrao",        "#000000"], //#000000
			["aqua",    "Azul-piscina",  "#00eeee"], //#00ffff
			["blue",    "Azul",          "#0000ff"], //#0000ff
			["teal",    "Azul-petroleo", "#008484"], //#008080
			["navy",    "Azul-marinho",  "#000084"], //#000080
			["violet",  "Violeta",       "#ff00ff"], //#ff00ff		
			["purple",  "Roxo",          "#840084"], //#800080
			["red",     "Vermelho",      "#ff0000"], //#ff0000
			["fuchsia", "Magenta",       "#ff00ff"], //#f0c0a0
			["pink",    "Rosa",          "#ffc0cb"], //#ffc0cb
			["orange",  "Laranja",       "#ffa500"], //#ffa500
			["yellow",  "Amarelo",       "#ffff00"], //#ffff00
			["gold",    "Amarelo-ouro",  "#ffd700"], //#ffd700
			["green",   "Verde",         "#008400"], //#008000
			["lime",    "Verde-limao",   "#00ff00"], //#00ff00
			["olive",   "Verde-oliva",   "#848400"], //#808000		
			["maroon",  "Marrom",        "#840000"], //#800000
			["gray",    "Cinza",         "#9c9c9c"], //#808080
			["silver",  "Prateado",      "#c6c6c6"]  //#c0c0c0
			];

	var imgB = 'data:image/png;base64,' + 
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMA' +
	'AAsTAAALEwEAmpwYAAAAB3RJTUUH1QsbASQac6e0WAAAAlFJREFUOMulkk1IVHEUxc//vXnz5o2ao6VB' +
	'CVJS6EbQRZvIErNtLYqCxK20adGiFpKLhFq1aVPQoq+N1kIoyECyhQQV1sJqMRKEMToOOl9vZt57/8/b' +
	'QgzEWeWBy72rw7k/DiMi7EUW9qjY9nF90Z+uhOo4cUVMaVhcwZZya3MJHQlKOexzZ8qdunap5xuAKgCw' +
	'7RfaXubmVSQHk0rBUxrlYgDjVxALBRoN0AyDRjJQfljOZ8tD6XcjX3ckKKWXJuym9jPC9iZ9oWGXNkCZ' +
	'9CtdLq6y5qN9giVPl6QGq4bNCDYmAJzfwUDeHv403NWWPhi3YCkNKA2z+edt+c34ndFzvVdbG1xAEyAj' +
	'GBnsrwcx2eFanmc0LKFgx5vQceLCOhH1tzfG7h5KuaCoCh0VwSuZ97sgAoCl9NZIBQ8MHmj24v1FmFCg' +
	'UAzBDJVUUHic/fnoCfCwjoFUsLiExSWEn0emnMdaxOFYHhwdR9x2U86+rv7O3ptB3R4wqWBHEnYkwGo1' +
	'iF8LY7mZsT6VW77MlARxhQbHGUokDk/VNbCEgs0F7EjAlgYxt7UG4Ht2YXKxu6PlowNCVOUgWRusZ9Dd' +
	'0+YeaIKBHQnEWQKdxwbyRHTq9Yffoy0J+6THABI1QIT+Lojjz37cWN0MBijgsLmAByDJaHbk1hwsZbCe' +
	'9VEtFqDDAniw+vTf29tNPHJlZs6E5bPgAaAlmDZgSoMpA0spQHJAcJ/Xsi8yK88fENHyjgR85cs9WVmb' +
	'huIxEIEZAoi2jIxhivuVfG5+CYAPYHNXgv/VX4xeSSRTbe3NAAAAAElFTkSuQmCC';
	
	var imgI = 'data:image/png;base64,' + 
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMA' +
	'AAsTAAALEwEAmpwYAAAAB3RJTUUH1QsbASQou3Dl2AAAAWxJREFUOMulk79LAnEYxp+vnuTRryEsGpzC' +
	'oLagOPoDCtoagsC5f6OloamloOaiIBqkJWgJoTJDKC7KoUywlCg09Xve9867U+9taFODDl94l5eHDw/v' +
	'+z6MiNBL+dBjSX/MAydpHomppf1Bcv2OsNxSUTjPLyXz7Xh54T8Omms7p99lo7GZymkjF2phVr2/y4tc' +
	'/LBDSUQdDYARkUREEzMbKRqLHtHA5NIigFC7tqsD+qWM7l59Kmi6IMcoiMx5FkDFyxLlh/eaIoQNWEYS' +
	'gEVELS+AIK9ZU0IzQJZZAGB7OWMfAIlrtgJDQ6P8mgTQ8AIYjqW+woZWH2KmrnH14BFA3QugP/FUVPRq' +
	'HTD4LQCHiDw5CFYr5rSo6EC9lgZgefnEOQAhZjfmZQAugjcAOIBAtz10AKLrlyvZPF+tlPg4mRwSk7cj' +
	'ylaYMbbXLXgdgET8+szRP9KuxWW4TeYjf8u19QwAGYBo17Ne4/wDTiTSQHTQu8sAAAAASUVORK5CYII=';
	
	var imgU = 'data:image/png;base64,' + 
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMA' +
	'AAsTAAALEwEAmpwYAAAAB3RJTUUH1QsbASQhwqxdfAAAAhZJREFUOMul0z9oU0EcwPHvvfeSphhrzWBB' +
	'jBUzOYiK0qnq5KKiIqIOugntrINDxTor2km3dhLqLIgd7CQiQmsH/yDS0Gi1Tds0JSZp3nv33v0cvJaU' +
	'Ril4cBzcj9/n/v1OiQj/0zw77ux5uVzuJKa4EjBTrKGKhbPVB6fHRCRx/uHEPS+Mbq9WfL7lS+iV8p3p' +
	'8b77IqKxO0gBbtvjr5Ptg+Pi7jtyHOgG2uwiqez155ez54Zl1+H+m0AOSIsIDoCI+CKy+2Am1XBUkrgw' +
	'NQvMikggIpGIJC71Ztu85A6USiwA8yJSA/4AtqlEZJQTxdYU0xxzQSkjawnrsWYAJ9Q4Omp9WyZGxQbM' +
	'xkvfCGiNClsDTiSoOAZj/gH4GtcPWwLKGBxtd/EXwNAIxQsFIG56YoB0R8pNKh2hokgBqhVQ9iuN5YQk' +
	'6DozdAxwbbwL2F8u1U8SNPBrhZ+AbAKUUsFcYe6JF2gymdzdp2P5E0Av0DM0MnXj9dvZa7pefLM89+o7' +
	'oNfz1kpZKeUAqT2nhvo8N/3IdVPkujo+OMZ0FqYXsmH1x6difrR/tZb/IiKlTYBFXGBbJnfhUHu6+yIm' +
	'xolFoka5OD8z+gJYAkrNNbIGHLXlrOz5NFAFKnYuCXQA223egu2/lIhw5eqz4WotOGDM1n7m4mJN+37l' +
	'1uePAxMewOT7dyNhsLTXGO1uBVDKNfV6vgoD/AbazA9SmDK0BwAAAABJRU5ErkJggg==';
		
	var imgL = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMA' +
	'AAsTAAALEwEAmpwYAAAAB3RJTUUH1QsbASQXDRbI5QAAAp9JREFUOMuNk11IU2EYx//v+djZ2Zxux835' +
	'VSk505vwohtJEcRCyUjFq0Sim0JI0oSouz4oCCKiu26CoCxJISzsgyIlENMggwrJSrJybtPpPs7Oztl7' +
	'zttFWBAu+t0/f/7Pj+chjDFsBiGEB2CzX3tf6yvM73aqWlNxLMZVWumZ+vLciYNt1S8AzArIjsN1YrQ3' +
	'nZvXH+IEL5dMI/wtisWIeoCGE1WyQGztrVXZA/LrTrZYVBjIUTUlpWnDZHZ8MLPw0Zki/q7pYFFzRYHc' +
	'COBS1gCJyZ0kwZTt6eRY3Q6l72JPTwiA1xbokHXP7uZwyF8DAFy2/cW0Ue+zMfCh9erQ5PyjG7dmzwLQ' +
	'eEooRxnSGmUAkK2BnCpU5LjXjdVoulwiOj59Xed8W/dfd7t2djgkJ+wSPwUAwobt0q6R2sK8nG67pjXt' +
	'OzQovCz1OJgowrRSiGkZxOK6s8DbeIUw0upTHFGvIo9sNHB4jt7rTRZt6/9OTa8VVGH4igFRgqRmIKZ0' +
	'6AkNiym1jFhcGWHWiknNy6dPNTwAAMHVdr5FKysdELaUKLFofDjn3XSNJNorBI3BpaogKxFDDS4nlwRo' +
	'1NCfE3C3nz7umwBg/WrgLug0/SVKoNA5tqfS0Td0JzQq6BJ4KQ9uwUTjrtLYhXOH/QB4APRvWQIHW12F' +
	'yHCkmHtyrNpp3Y0sDnI6wPHO3Iwjr4IG8gGAbTYMAJwYXYMrvAY/1XMAeH7M37waU+faGaw5RnlQak3+' +
	'41ohiMvBqdDrL+3jsrk39HlldebNUsDnb+rmdbO1QJF/284aYEYWHhLiDjyLxBveeuSGTFIHr1vgMuYK' +
	'Nf7Yzgavrn8I24X8Zc4wjFQ07jYSiTjLJO+D6mdeTR4fAmBsGN/0arO98//yExuZIV5jPgxzAAAAAElF' +
	'TkSuQmCC';

	var imgTL = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMA' +
	'AAsTAAALEwEAmpwYAAAAB3RJTUUH1QsbASQSfXw8agAAAy5JREFUOMt9kV9oG3UAx7/3N3fL/6T506ap' +
	'hqV2RTs6Zehs04HU0aGj6TYqbPRhL44+FDo39rzhmAhaZW8iTnRzKHZ0FKl0G6yCKWOtptM4hlNrqll7' +
	'd+0tzTW5u+RyP18m+GD2gc/rl++XL0UIwf9BURQDgBcu/LInFA2OOMt6f8vmJv2MbSykEp7vjqQ7bwFY' +
	'YtGYbe63pscMj/eERLNN9JYB+S8VK0p50JK1HSJL8UOv72gcEOw9vd+22JOush6o6PoktTR3pbb8q7NC' +
	'RY7eWW0eSIbFVwC82zDAQcTDlEYC242tmd6OwPj50VEJQBPfflA0/T0DshTpBgC60X7OqKZCPAEjFTul' +
	'+QffXry8dBaAzliURVsEhm4RAGjUQKxEA6IW9mFj3Ug4KBO/5Yv0s7ve+KjtqZ6DHckkXuhuvg0AFAAG' +
	'AN969OqeqNc1Iuh6f2cQ7LTHFWz2NnEvO2lUVjaws8X55+6uwA8Mwx5yig7V5xPG29p8lygAbv/xr8dI' +
	'c+KEYNWb7NUCfO0tcAsUjkU2kL/3E57fuQuUbaNq1mBZlpbLLWYI0aWJiYmPWXf67f36060n2XgssKmW' +
	'Jl25O92bnJAcfNGP6S8+wd2F7/Elz0NRFMTjcZTLZbcsywOpVAqZTGaehi98uB6JBRJR58zoS9FxXpJK' +
	'Qv5vPOexkZm7DlVVUSgUzhmGAUVRIMvypGVZP2ezWczOzvbQNPjeJEfwZgs9+/5uj02UlSsxov6Ynb+5' +
	'6uC34cCBQ4Zt258DQCgUQl9f3zKA48ViEVNTUxrNqY/glh8hYpkuAP7Cg88+vL+8ODR1o5SLJU/h/DsX' +
	'rgMQAEAQBHR1dfkBLAKI5nK5MZZbW70tLf4xNCfW90m/r28sZB+2hyL9I4xZfzUWdquiwE3+926O42hC' +
	'yHYA9wGArSvL31CUr/2mUtp71y/urW2ZYEwbdK2+Pvhax3uaVpgB0AoAhBCwLEs/buQAYDLl4j1ZYINr' +
	'dLVaraglX1XTSqS2dQ2WeebTi0e+Gh4e5vP5/CCAAa/Xi3g8LomiuJ5IJNYAaCCEPFEAMQDkX8PhMEmn' +
	'0x8QQiKEEPwDGk9zWa+6QpwAAAAASUVORK5CYII=';
	
	var imgS = 'data:image/png;base64,' + 
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMA' +
	'AAsTAAALEwEAmpwYAAAAB3RJTUUH1QsbAR86dHt7qAAAAsVJREFUOMtdk89rXHUUxT/3O+/lvZqZtE8n' +
	'M29UsLho6Y9Yzb4I1qVCzUYouHXnIlT/g27cuQvYjdBdq+BSsVSF4sJYB5IoYyOaYCYzmbxk0sm8H3kv' +
	'73tdjJHqgbs4F849h3u5oqoADnCJuB/iJcHxo5u3rRe5OJCulUyn/cy59vFVMo3k/Lt9/UcEIKrqAJfJ' +
	'Ni7r48Ulnktc8cce5jeYOsKuHaHrx2gZZBS1ox+WN8+9/imRqtqTAVfINuZ086Mlmd2u4m3AcQozMUgB' +
	'pcKywXbBPlHyJzr8ps3F63cYqKo1FP1Qf1lcknq3yqk/wTskdkYkaQ4oVCC+ZEma4LwsODMSzJ2lc2Oe' +
	'hoiIoUwCZmMX73fw92ivjqlWS6anIcsC2m2ozkDtqiX2AyqnoRbgWY86YBxt37wt58cep8YgOWE4Wc7C' +
	'wgIiB7RaD/7lldYBFf2O0wn+rWv60KZccLQauWLWwRQANJuQpgEiB3jePo3GU3y4Dy6YKYgt3lqPhhON' +
	'oG4SDCUAUQT1+hBjJs7GgO8P6f71AHcPGmeAimAcsIqY2nYJyznsKsnhJEGeB/wHFnY70HwN4p4BCzrx' +
	'w3FH/UzT0lPHoE0LQJ4/z5Q7xJjJIbor4BoIwxAtBmwPYDwmN4Kim3fnis+eTct7RnXZ6M4jFNDVb9Gf' +
	'v57U6v1Jb7jyqhb3Rb/6gPSVF3kDeMEh00iL2pEdDX0zFuot2PkJrrwV0u/3gYnz3krITGHorkLVkOc5' +
	'+0BPAPn+fWbnz9GZOiNB5SWoVIVxDkZAFcocnjlQeluwsamjDz/n+o9bPAa2RVUREfPlezTmztKpTOO1' +
	'muIbHxAwwNYA1v/Q7M1P8Pkf5OSxRMTcmKdhS+q33uZhbPFKIE1AlXzxC945zNnvDGifiFVVnKeIFZEd' +
	'YNcKF9Z6NKwiAEbQX3eIgB6TUFZVBeBv+MJf0VLe5Z0AAAAASUVORK5CYII=';
	
	var imgIMG = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
	'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAN4SURBVHjaYvj//z8DEbj/4aef3y6//PZtwcKFNYqK' +
	'igxr165lAAGAAGJiwA9YgZgfiM2WXHnPWbv1OufLF8/toyPDGLm4uMAKAAKI5devX01fPn/w+f//H1QP' +
	'CwPDfyaQrf/4+HkFvjCw8P/794//x9cfDN/efmCw8Qiz42Rnf37rwuF2oOKJAAHE+PDBg6c3HjyUEhAV' +
	'Zvjzh5EBZM7ff4wMf/7+ZdBTk2eYeeM7w5NXnxm+vv/K8OTxW6AhXxiYvnxmCNV8tb+oqNAJIAAAQQC+' +
	'/wQDAwQADhgmAOn8DQD1/fMA+/veAOzz2AD9Af8AG/gJAPHrAQDw5uYA6/D/APXm5AAN+vIAEwwLAPj4' +
	'+BEAAAAcAgBBAL7/BP3+AP34+/8A7/DxAOj1sADq/s0AAALgAPX39QCgwskAMhROAHNVOgBqmtQA7/Hx' +
	'AGJJD/TS0tLWtbXHzQAAABECiIWB6T8DCzPQ52xvGF6/OsTAzHeFgYXjG8NP5r8MW47dZLguxsdgamDD' +
	'wAh0tjAHM8PtO/ffdHb1NAA13wbitwABBAoxBjbGLwy//j5i+McpwsDODjSQ8w/Qz18YhLmAUchyh+H0' +
	'k8MMNWGKDLdvfWOYNnXVPaDG50B8BxTkAAHE9P/fPwZOFkYGWUFWBvY/Dxg+f/nL8J9Zh+H9TzYGTi42' +
	'hp8fHzLs2LOQ4cO/dwyXr15kOHDgwC6oAWAAEEAsDP+YGLhZfjOIsH5h4PvCyfDrszTDHwZxBuHP9gxi' +
	'v7gYhFSFGJhYeRnk5YUYxMTE/gP1PADiNzADAAIIGAaQ+NeRs2IQ4ZFj+PT+BUPX4lYGse/8DA4BbgwC' +
	'cgIMJjIODJ9+/GBgAIYLEDBCMRgABBALEzAt3vhwimHTseMM/xn/AM37yaAuLsBwdfdDhmtv9jH8BYbJ' +
	'gcdrGBTYjBhYmTgwkipAALGwAt3w4ftthp37FwGd/p2B6RcDw7/37Azc8sxAsRsMP0V5GX7++MPgosLC' +
	'oMTmgGEAQACx8PCIfJdj92Ao97Rh+PXnJwMT0HV/gSmSmeUfA/N/ZoafTF8Y/v9mYBATkGQ4e+QSI7oB' +
	'AAHEMnXqtLJjJ06H/fn9U5KDk4Pr16+f/xkZIJCJiZnhL9M3hv/AZM3EwML4+g0wTTMwfEI2ACCAkE2U' +
	'BmI+BlDCwA0YoQY8g6kDCDAAL7JjtaXwrQgAAAAASUVORK5CYII=';
	
	var imgC = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK' +
	'8AAACvABQqw0mAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAKSSURB' +
	'VDiNhdFLbExRHMfx77nnmokuPNpEdJAKqmgiGkQ8urKxQuJRFgiJBQvsmthYsCIiRIiERAgbIpG0hAgL' +
	'rdfC+zHo1Ks1ptqaqXnce869929hxJSEX/JfnJPz/yx+R4nIwtV385e+Fe14xwRURSGODXD8AG0s2rdQ' +
	'8kmnv9P9Nr3908V1J0Qkohz3aJdX/yEfjH/ck0XlsrjioiONNgHOQAbtWVwDrgUx+WXAWSD/C3A6vvhL' +
	'Pw8Z6OuB988PUhjaAwoVCeLlKT26tAa/9FhFEdqNLx8zbfk4KuJcSeWbv77rRn1MnraHNx5smJDQtXGF' +
	'CkJUCIU7p54EA6kNUSlHVMxSVdO4bhjg37+6VaWeHYpunjkGZCaOZKSyYRmIAGx/e2tXmOttNf2v92W7' +
	'269XAq45vrUDeAAgImNXnEv9LNEEEIQAAtgv11uPAnHADANExAf88nmcMhbHWLSxiA0owyFQLM+wuH9e' +
	'aD9A+xbHszQmRnGy88A2Lu9q4k7vHF6UBHfWXUbMPc+Flnag+BfgGIv2DNo3LK7vJVF7r4XMu8n0pKGj' +
	'CLHqlfi6zqhUf0ym3nIqdqcC0xuq46OrJEL7lrmznzOi7s1kZiahNg25HAxOQYbmN/UQ3wRQCdTsOP7w' +
	'SOpDdn1U9NGeIV7/hJdOmtyMImwuvwq30MsknhIt/bODZNvN7qawMADWoMKA28EglkEEoBFKCAqwFCjg' +
	'qZWVgFLKSyzYvdZkUzWIoCLhWub7hr6x0aLPDlhnHogHSzRuZ45qMp0w/TcgIga4UFloLK1SNlu1n1jD' +
	'HGKrwA7BKp8gn37Zl3x4BZr//sbK2AQdtCX2MrquhXisGfsKotw9qpNt+K03YCdKRP5l/Dc/AO3LTsrc' +
	'8J+ZAAAAAElFTkSuQmCC';
	
	var imgR = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK' +
	'8AAACvABQqw0mAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAM0SURB' +
	'VDiNhZNNa1xVAIafc+em82XSNonBSWtNTYtpaGNt0gqpgSJYqnahLlpUEMFNcCcuRPAPKK4EF4KCGxUU' +
	'I0itINhC0i6MNmnVxCRN2iRmZpKZZpKZ+zH3nnPPOS5SEFc+P+CF9+V5CZrKhk1lm1Fiwyix243oEiAA' +
	'rLVYaw9Lpb8Jo2SjXA38hi8/DkI5aK1NW2txpDREUqMSg9aGarVy7sLFl5/lXzaNZVwp3RU2k/zc0r03' +
	'SxuN07HUecBxnJTATTm0uA67WhzCwEudOnnqIuDeD9iXEiLtppw7dV/ihZa1de/9yd9uPgqkXQE4QuA4' +
	'AqMVtdomP1y+tAC0AiFwXAieQVCYnJrj7uIM2Ww+k89mvh8ZHtzvWsBYizEGhANWlK9e+XkWCIAWa8kl' +
	'2jyptcm+cHaQuUfaiJSmWCztfue9D991rbZoLB98fouUI/AaQeHEUy/tnro2JoHUStmbvz5dNl6o2NOa' +
	'5mR/D81Ys73t53xvW7iJNhgLb736OMKB6kaFge4Lr7x+bexLINPdmcudfqLwy+JK41ypGqASi9YGzw+Z' +
	'+fPmipsYi0oMKQcEguJ6hYXbtz1gD3BQOGK4vS1z6Eivw4HCA8TSEEmFUpIbkxOrrlKGWGk+HZtFJ4rS' +
	'6iwTl7+7MTo6mgaOzizWzqxVgofX1gNSjuBEXye+FxDHccP3G7GrtCaONa+dfwxjNL9O1kpffDQ1/8ZX' +
	'n5hY6vYH92YHjCatlKFSaxIrQ8MLaHj+CqBcpSxRrBGOwEHQ3rm/40j/gBwaGpK1elwNm0nGWih05una' +
	'm0Uqje+HePX6MhC6UhmiWPPtlSUAoqaf7u47OzI+Pn616R6szy5tza9vhkdzaZdcpoWBwx34fkht894S' +
	'0HSTZEfl8yM9CAFbtU325Y49Xa1WP3vu+WH3QFe+vlz2qdSabDViYqkJwoByefUuEDoy0cRS76wbJZRL' +
	'RRbmZv7u7+8/E8X6RTfl9GV3pWhvy9BTaEVKRRRJlm7/sVNh+vcFFudugdi5YBxF+qcfv75+/FjvxEO9' +
	'5u3i6p2OynoRqRTW7FirlJQLf017QCTuH+YQ/8UCy9Zazf/wD6fO5eh5RRq+AAAAAElFTkSuQmCC';
	
	var imgSIG = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK' +
	'8AAACvABQqw0mAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAJxSURB' +
	'VDiNpZM9aFRpFIaf745mMtfEmSQzoquk8BdZLLIoiKKVhSyIayMqFjbKNiIo2CoIFvYWbrX1VrvtggiC' +
	'opX/IomTqJlM5macyWTm5n7353zft4U6MKRyPfXh4T3Py1HOOX5k1n3P8oVzd8+c/S1/tViwM8C1gycu' +
	'NdS3BB8Xe01rXaKUEiBTikyhMiBVSqX1pXD64u9/n2pN7Rr9ZWE6OLzPlX6q9E73E9SbUXn3ZBHrHMY4' +
	'MnFkYhCxpOJ48TI4FG6rMNxo8+ljtmVhnvkzv3ae9gE6FucP51R+aB2ZWNLMkolFx4ZcaqhWm8SbSkw8' +
	'fQeAsdy5fut2sw+wzjXE2M3TrwO11FxFxCHGorXQamsezGsKLY0nBmAF+HNAonNUo9gWC/6QXypZjHVk' +
	'YtlYhNFSgdqzDuXap6+79t7L51fCAYCn1OxKL9k7NuH74xM+xjrS7Msp/9yfw6+3UGJQCmNM7Y81NeY8' +
	'r9qLROeHhDevGkQ6Q8wXoWWZYx8dZoHtOzd2F4MZbw3AH859iLQkUcHgj+bJrc/12xjxFWePB9x/klKe' +
	'HBlbbGQVYGYAUBkv1N/Pr4iOhcqmUYxxfQ9L7yKCdsT+owfYUN5FN+5MAY8HAJObRzpvq8tGx4ZHD+dI' +
	'EiFJDGGY8Phhm+LYz1y8fIBMLFu27jwN3B10kFOpiO3EibBjdwVjHJ7nkS+s5+ixPWRfhcZJhrH2yBoH' +
	'QKRTU4sTnSC9vI40q6s9wjAk0qvoSJMkKWLExnG8DCcB6P+CUsq7cvOvG550zsdhy0Q6/Bx2O0G3u9xo' +
	'fw6W6rW5YHFhtg0YYMU59+8A4P/Ofzj9gGYDySN8AAAAAElFTkSuQmCC';
	
	var imgO = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK' +
	'8AAACvABQqw0mAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAANvSURB' +
	'VDiNNZNLbBQFHMZ/Mzu73T6hL8CWYin0EbEVmqho0aRRlMRIjfjgQJTEaCR4Uk8eSPTgwcSEeDE+Dnrg' +
	'gAmJpGnUGKQkdqVgKY/alm7b7Wu77b5mdzqzs7OzO38PLF/yHb8v+b58nyIifqC2zADQbPwX77UWM52u' +
	'kbeM6USs9cRjV+v7H3EBGzCAPFAC0IB6YJ+TzO1OhVbaWo73rOsTsWdTodV38nETaz7Njhc6jqRCq21O' +
	'wrJbhnqul8UCeIqIdDsJ6+DKhXunzIV0X+Ph3b+kxteOZiZjT5jhNF6hROPAngvB5qpuayWzy8uXTg7+' +
	'/V4IUB4adNz55I8z1qL+adEsYK8ZWBGdpBh5k5xdTWVts7pNq+tpJh+3SKWSoXFv5oNv3ctzIuJqgFe9' +
	'd/u1xNXIG+npjfZN0fNJyc7pYoQNcksV+PO97HvTnnG6PIQtsftdKXYDq4qiFDVgf/vpQyz/fNufEdNb' +
	'9NavrEo8FJFYOCbpWExSqdd8R4aPawPn/fgOO7jDPxZHbpU7wHe6fejj9V/vv569u/n4qr4+M+mFL417' +
	'M2Nhic6a2OuAPisr0VPa0WBVTfWxStdfeF7tU3/3btwAXDU2En4lPb72nBFJkhVrasKbu74h6SVgE8iI' +
	'iCkiVV0fPfNvcFdNMoB2KKgEvgS2AQE18ddiLjG2jE2BAFoqJql1IAM4IuIBNUBLw9OtTYpPFUMsdNkC' +
	'aAAC6pq5+bWJ/VuQAG3qjoG3tUEREcc1nHqgqWQX9wKPmov6i1LymtKY8wsS/Y4HEPVs4fxP+1/qfb+u' +
	'rUFvqNne95Y2eNZzSq1abaATOOir1A4Y04ne3FLm1VLOVWxxJn4ojnwP6EDBJyKN89+MnylahWMIqJo6' +
	'kBhd6nD1fIO1nO3K3o0f2BiZO2mG03uS96JY5Gt9qFfmJRoBbA3IpibXbrmUogVxW32KD3VaG0JkyFcT' +
	'kFLOVexVg8RCjA1JkxbDTIvhPYyglP9Qdc7/7odVSsVnOXH+2anUNzYqdU/Kg+GQIjtdELfTxpm6WBz9' +
	'PCKx+8AaYPnKTuo17064XqmdulwaG96j7gwCA3HR2SLHTW/2q6QYoT9LExcjElsENgBLRDzlUsUXnHDO' +
	'qUAFUAlUvOx7qr1Rqeu3xK4CZNS7fTMrVrx85S0gJyJFgP8BKvH6yJtRWKwAAAAASUVORK5CYII=';
	
/**/var imgF = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
	'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAqUExURXsAUv//560AUnsAAKampv//3tYAUv9arYSE' +
	'hP//7wgICP///wAAAP///1BpMcMAAAAOdFJOU/////////////////8ARcDcyAAAAHNJREFUeNpcjlsS' +
	'wyAMA00IOAJx/+tWjkvaiT6Y8bJ+2HrF1vjmB2YEmwS4FAyMPwPA7trGCTQ+BjBJnHoeg9U56ZUBNKDw' +
	'6E7vR4JYEiTqNEpr0L8zh6bh3W4iUCREzZsEaALVuGi5hcqIExY5BV75CDAAj5kKF/SGVQcAAAAASUVO' +
	'RK5CYII=';
	
	var s  = false; 
	var sg = false; 
	var c  = false;
	
	document.addEventListener('click', function (e) {  
		if (s  == true) HideSmilies();
		if (sg == true) HideSign();
		if (c  == true) HideColor();
	}, true);
	
	function HideSmilies(e) { 
		var SM = document.getElementById('OKFT_SM');	
		var S  = document.getElementById('OKFT_S');	
		if (SM.style.visibility == "visible") {
			SM.style.visibility = "hidden";
			S.style.outline = "none;";
			S.style.backgroundColor = "transparent";
			s = false;
		}
	}
	
	function HideSign(e) { 
		var SG  = document.getElementById('OKFT_SG');	
		var SIG = document.getElementById('OKFT_SIG');	
		if (SG.style.visibility == "visible") {
			SG.style.visibility = "hidden";
			SIG.style.outline = "none;";
			SIG.style.backgroundColor = "transparent";
			sg = false;
		}
	}
	
	function HideColor(e) { 
		var CB = document.getElementById('OKFT_CB');	
		var C  = document.getElementById('OKFT_C');	
		if (CB.style.visibility == "visible") {
			CB.style.visibility = "hidden";
			C.style.outline = "none;";
			C.style.backgroundColor = "transparent";
			c = false;
		}
	}
	
	function GetPos(obj) {
		var top  = obj.offsetTop;
		var left = obj.offsetLeft;
		var parent = obj;
		while(parent = parent.offsetParent) {
			top  += parent.offsetTop;
			left += parent.offsetLeft;
		}
		return [top, left];
	}
	
	function ShowSmilies(obj) {  
		var SM = document.getElementById('OKFT_SM');	
		var pos  = GetPos(obj);
		var top  = pos[0];
		var left = pos[1];
		SM.style.top  = top  + 18;
		SM.style.left = left - 2;
		if (SM.style.visibility != "visible") {
			SM.style.visibility = "visible";
			SM.firstChild.focus()
			s = true;
		} else {
			HideSmilies();
		}
	}
	
	function ShowSign(obj) {  
		var SG = document.getElementById('OKFT_SG');	
		var pos  = GetPos(obj);
		var top  = pos[0];
		var left = pos[1];
		SG.style.top  = top  + 18;
		SG.style.left = left - 2;
		if (SM.style.visibility != "visible") {
			SG.style.visibility = "visible";
			SG.firstChild.focus()
		} else {
			HideSign();
		}
	}
	
	function ShowColor(obj) {  
		var C = document.getElementById('OKFT_CB');	
		var pos  = GetPos(obj);
		var top  = pos[0];
		var left = pos[1];
		C.style.top  = top  + 18;
		C.style.left = left - 2;
		if (C.style.visibility != "visible") {
			C.style.visibility = "visible";
			C.firstChild.focus()
			c = true;
		} else {
			HideColor();
		}
	}
	
	function CriarListaAssinaturas(SG) {
		for (var i = 0; i < assinaturas.length; i++) {
			S2 = document.createElement('input');
			S2.type = "button";
			S2.value = assinaturas[i][0];
			S2.setAttribute('i', i);
			S2.setAttribute('def', assinaturas[i][2]);
			S2.setAttribute('style', 'background-color:transparent; border:none; cursor:pointer; padding:3px; margin:2px; text-align:left; display:block; width:99%; height:20px;');
			S2.addEventListener('click', 		function (e) { code('SG', assinaturas[this.getAttribute('i')][1]); HideSign();}, true);
			S2.addEventListener('mouseover', function (e) { this.style.color = "navy";  this.style.textDecoration = "underline"; }, true);
			S2.addEventListener('mouseout', 	function (e) { this.style.color = "black"; this.style.textDecoration = "none";		 }, true);
			if (assinaturaPadrao == i) S2.style.fontWeight = "bold";
			SG.appendChild(S2);
		}
	}
	
	function ShowOptions() {  
		var ok, cancel, negrito, italico, sublinhado, cor, cor_o, lembrar, auto, ass, ass_o, incluir, deletar, nome, padrao, texto, salvar;
		var Opcoes = document.getElementById('OKFT_Options');
		var RTE   = document.getElementById('OKFT_RTE');
		var barra = document.getElementById('OKFT_Barra');
		var field = OKFT_PegaTextarea(document);
		var assinaturas_t = assinaturas;
		var asspadrao = assinaturaPadrao;
		CarregarConfig();
		if (Opcoes) {
			ok = document.getElementById('OKFT_Options_ok');
			cancel = document.getElementById('OKFT_Options_cancel');
			negrito = document.getElementById('OKFT_Options_negrito');
			italico = document.getElementById('OKFT_Options_sublinhado');
			sublinhado = document.getElementById('OKFT_Options_italico');
			cor = document.getElementById('OKFT_Options_cor');
			lembrar = document.getElementById('OKFT_Options_lembrar');
			auto = document.getElementById('OKFT_Options_auto');
			nome = document.getElementById('OKFT_Options_ass_nome');
			ass = document.getElementById('OKFT_Options_ass');
			padrao = document.getElementById('OKFT_Options_ass_padrao');
			texto = document.getElementById('OKFT_Options_ass_texto');
		} else {
			Opcoes = document.createElement('div');
			Opcoes.id = "OKFT_Options";
			Opcoes.setAttribute('style', "display:none; font-size:11px; padding:2px; border:1px solid #a1bbe4; position:absolute; background-color:" + ((field.parentNode.bgColor) ? field.parentNode.bgColor : "#bfd0ea") + ";")
			document.body.appendChild(Opcoes)
			ok = document.createElement('input');
			ok.id = "OKFT_Options_ok";
			ok.type = 'button';
			ok.value = 'OK';
			ok.addEventListener('click', function(e) { 
				GM_setValue('iniciarNegrito', negrito.checked);
				GM_setValue('iniciarItalico', italico.checked);
				GM_setValue('iniciarSublinhado', sublinhado.checked);
				GM_setValue('iniciarCor', cor.selectedIndex);
				GM_setValue('lembrarTipo', lembrar.checked);
				GM_setValue('assinaturaAutomatica', auto.checked);
				
				assinaturas = assinaturas_t;
				assinaturaPadrao = asspadrao;
				
				GM_setValue('assinaturas', assinaturas_t.length);				
				GM_setValue('assinatura_padrao', (assinaturas_t.length > 0) ? asspadrao : -1);
				for (var i=0; i < assinaturas_t.length; i++) {
					GM_setValue('assinatura_nome_'+i, escape(assinaturas_t[i][0]));
					GM_setValue('assinatura_texto_'+i, escape(assinaturas_t[i][1]));
				}
				i = assinaturas_t.length;
				while (GM_getValue('assinatura_nome_'+i)) {
					GM_setValue('assinatura_nome_'+i, "");
					GM_setValue('assinatura_texto_'+i, "");
					i++;
				}
				SG.innerHTML = "";
				CriarListaAssinaturas(SG);
				Opcoes.style.display = "none"; 
				if(WYSIWYG) RTE.contentWindow.focus(); else field.focus();
			}, true);
			ok.setAttribute('style', "border-width:1px; position:absolute;")
			cancel = document.createElement('input');
			cancel.id = "OKFT_Options_cancel";
			cancel.type = 'button';
			cancel.value = 'Cancelar';
			cancel.addEventListener('click', function(e) { Opcoes.style.display = "none"; if(WYSIWYG) RTE.contentWindow.focus(); else field.focus(); CarregarConfig();}, true);
			cancel.setAttribute('style', "border-width:1px; position:absolute;")
			var title1 = document.createElement('span');
			title1.setAttribute('style', "font-weight: bold");
			title1.appendChild(document.createTextNode("Inicializacao:"));
			Opcoes.appendChild(title1);
			Opcoes.appendChild(document.createElement('br'));
			negrito = document.createElement('input');
			negrito.id = "OKFT_Options_negrito";
			negrito.type = 'checkbox';
			negrito.value = "Negrito";
			Opcoes.appendChild(negrito);
			Opcoes.appendChild(document.createTextNode("Negrito "));
			italico = document.createElement('input');
			italico.id = "OKFT_Options_italico";
			italico.type = 'checkbox';
			italico.value = "Italico";
			Opcoes.appendChild(italico);
			Opcoes.appendChild(document.createTextNode("Italico "));
			sublinhado = document.createElement('input');
			sublinhado.id = "OKFT_Options_sublinhado";
			sublinhado.type = 'checkbox';
			sublinhado.value = "Sublinhado";
			Opcoes.appendChild(sublinhado);
			Opcoes.appendChild(document.createTextNode("Sublinhado  "));
			cor = document.createElement('select');
			cor.id = "OKFT_Options_cor";
			cor.value = "Cor";
			for (var i=0; i < cores.length; i++) {
				cor_o = document.createElement('option');
				cor_o.appendChild(document.createTextNode(cores[i][1]));
				cor_o.style.color = cores[i][2];
				cor_o.value = i;
				cor.appendChild(cor_o);
			}
			Opcoes.appendChild(cor);
			Opcoes.appendChild(document.createElement('br'));
			lembrar = document.createElement('input');
			lembrar.id = "OKFT_Options_lembrar";
			lembrar.type = 'checkbox';
			lembrar.value = "Lembrar";
			Opcoes.appendChild(lembrar);
			Opcoes.appendChild(document.createTextNode("Lembrar o tipo de edicao "));
			auto = document.createElement('input');
			auto.id = "OKFT_Options_auto";
			auto.type = 'checkbox';
			auto.value = "Automatica";
			Opcoes.appendChild(auto);
			Opcoes.appendChild(document.createTextNode("Assinatura automatica"));
			Opcoes.appendChild(document.createElement('br'));
			var title1 = document.createElement('span');
			title1.setAttribute('style', "font-weight: bold");
			title1.appendChild(document.createTextNode("Assinaturas:"));
			Opcoes.appendChild(title1);
			Opcoes.appendChild(document.createElement('br'));
			ass = document.createElement('select');
			ass.addEventListener('change', function(e) { 
				nome.value = assinaturas_t[ass.selectedIndex][0];
				texto.value = assinaturas_t[ass.selectedIndex][1];
				padrao.checked = (assinaturas_t[ass.selectedIndex][2] == 1); 
			}, true);
			ass.style.width = 200;
			ass.style.marginLeft = 3;
			ass.id = "OKFT_Options_ass";
			ass.value = "Assinaturas";
			Opcoes.appendChild(ass);
			Opcoes.appendChild(document.createTextNode(" "));
			incluir = document.createElement('input');
			incluir.id = "OKFT_Options_ass_incluir";
			incluir.type = 'button';
			incluir.value = 'Novo';
			incluir.addEventListener('click', function(e) { 
				ass.selectedIndex = -1;
				nome.value = "";
				padrao.checked = false;
				texto.value = "";
				nome.focus();
			}, true);
			incluir.setAttribute('style', "border-width:1px; background-color:" + document.body.bgColor + ";")
			Opcoes.appendChild(incluir);
			Opcoes.appendChild(document.createTextNode(" "));
			deletar = document.createElement('input');
			deletar.id = "OKFT_Options_ass_deletar";
			deletar.type = 'button';
			deletar.value = 'Deletar';
			deletar.addEventListener('click', function(e) { 
				if (confirm("Deseja remover a assinatura \"" + assinaturas_t[ass.selectedIndex][0] + "\"?") == true) {
					assinaturas_t.splice(ass.selectedIndex, 1);
					ass.remove(ass.selectedIndex);
					nome.value = "";
					padrao.checked = false;
					texto.value = "";
					if (ass.selectedIndex < asspadrao) asspadrao--;
				}
			}, true);
			deletar.setAttribute('style', "border-width:1px; background-color:" + document.body.bgColor + ";")
			Opcoes.appendChild(deletar);
			Opcoes.appendChild(document.createElement('br'));
			assinatura = document.createElement('div');
			assinatura.setAttribute('style', "border:1px solid #a1bbe4; background-color:" + document.body.bgColor + "; margin:4px; padding:4px; padding-top:0px;")
			Opcoes.appendChild(assinatura);
			assinatura.appendChild(document.createTextNode("Nome:"));
			assinatura.appendChild(document.createElement('br'));
			nome = document.createElement('input');
			nome.id = "OKFT_Options_ass_nome";
			nome.type = 'text';
			nome.style.width = 200;
			nome.value = "";
			assinatura.appendChild(nome);
			padrao = document.createElement('input');
			padrao.id = "OKFT_Options_ass_padrao";
			padrao.type = 'checkbox';
			padrao.value = "Padrao";
			assinatura.appendChild(padrao);
			assinatura.appendChild(document.createTextNode("Padrao"));
			assinatura.appendChild(document.createElement('br'));
			assinatura.appendChild(document.createTextNode("Texto:"));
			assinatura.appendChild(document.createElement('br'))
			texto = document.createElement('textarea');
			texto.id = "OKFT_Options_ass_texto";
			texto.value = "";
			texto.style.width  = ((WYSIWYG) ? RTE.clientWidth : field.clientWidth) - 6;
			texto.style.height = 65;
			assinatura.appendChild(texto);
			assinatura.appendChild(document.createElement('br'));
			salvar = document.createElement('input');
			salvar.id = "OKFT_Options_ass_salvar";
			salvar.type = 'button';
			salvar.value = 'Salvar Assinatura';
			salvar.addEventListener('click', function(e) { 
				if (ass.selectedIndex == -1) {
				  var ass_new = document.createElement('option');
					ass_new.text = nome.value;
					ass_new.value = assinaturas_t.length
					ass.add(ass_new, null);
					assinaturas_t.push([nome.value, texto.value, (padrao.checked == true) ? 1 : 0])
					ass.selectedIndex = assinaturas_t.length - 1;
				} else {
					assinaturas_t[ass.selectedIndex] = [nome.value, texto.value, (padrao.checked == true) ? 1 : 0]
					ass.options[ass.selectedIndex].textContent = nome.value;
				}
				if (padrao.checked == true) {
					if (asspadrao > -1) assinaturas_t[asspadrao][2] = 0;
					asspadrao = ass.selectedIndex;
				}
			
			}, true);
			salvar.setAttribute('style', "border-width:1px; background-color:white; margin-top:2px;")
			assinatura.appendChild(salvar);
			Opcoes.appendChild(cancel);
			Opcoes.appendChild(ok);
		}
		negrito.focus();
		negrito.checked = iniciarNegrito;
		italico.checked = iniciarItalico;
		sublinhado.checked = iniciarSublinhado;
		cor.selectedIndex = iniciarCor;
		auto.checked = assinaturaAutomatica;
		lembrar.checked = lembrarTipo;
		ass.innerHTML = "";
		for (var i=0; i < assinaturas.length; i++) {
			ass_o = document.createElement('option');
			ass_o.appendChild(document.createTextNode(assinaturas[i][0]));
			if (assinaturas[i][2] == 1)
				var asspadrao = i;
			ass_o.value = i;
			ass.appendChild(ass_o);
		}
		if (asspadrao > -1)
			ass.selectedIndex = asspadrao;
		if (assinaturas_t.length > 0) {
			nome.value = assinaturas[ass.selectedIndex][0];
			texto.value = assinaturas[ass.selectedIndex][1];
			padrao.checked = (assinaturas[ass.selectedIndex][2] == 1);
		}
		
		Opcoes.style.position = "absolute";
		var pos = GetPos(barra);
		Opcoes.style.top  = pos[0];
		Opcoes.style.left = pos[1];
		Opcoes.style.display = "block";
		Opcoes.style.width  = ((WYSIWYG) ? RTE.clientWidth : field.clientWidth) + 14;
		Opcoes.style.height = ((WYSIWYG) ? RTE.clientHeight : field.clientHeight) + barra.clientHeight + 65;
		ok.style.top  = Opcoes.clientHeight - ok.clientHeight - 10;
		ok.style.left = Opcoes.clientWidth  - ok.clientWidth  - 10;
		cancel.style.top  = Opcoes.clientHeight - cancel.clientHeight - 10;
		cancel.style.left = Opcoes.clientWidth  - ok.clientWidth  - cancel.clientWidth  - 20;
	}
	
	function Recuperar() {
		if (GM_getValue('ultimoTexto') == null) {
			alert("Nao e possivel recuperar o texto!")
			return
		}
		var field = OKFT_PegaTextarea(document);
		field.value = unescape(GM_getValue('ultimoTexto'));
		if (!WYSIWYG) return;
		Ffield.contentWindow.focus();
		Ffield.contentWindow.document.execCommand('selectall', false, null);
		Ffield.contentWindow.document.execCommand('delete', false, null);
		Ffield.contentWindow.document.execCommand('inserthtml', false, OKFT_Orkut2HTML(field.value));
		OKFT_Timer();
	}
	
	function Vcode(tagName, value) {
		oFfield = Ffield.contentWindow.document;
		oFfield.execCommand('styleWithCSS', false, false);
		Ffield.contentWindow.focus();
		if (tagName == "b")
			oFfield.execCommand('bold', false, '');
		if (tagName == "i")
			oFfield.execCommand('italic', false, '');
		if (tagName == "u")
			oFfield.execCommand('underline', false, '');
		if (tagName == "SG")
			oFfield.execCommand('inserthtml', false, '<br><br>' + OKFT_Orkut2HTML(value));
		if (tagName == "TL") {
			var zUrl = prompt("Digite o endereco do link:", "http://");
			if (!zUrl) { oFfield.execCommand('unlink', false, ''); return; }
			if (String.substring(Ffield.contentWindow.getSelection(), 0, 1).length != 1) {
				var texto = prompt("Digite o texto do link:", "");
				if (texto) {
					oFfield.execCommand('unlink', false, '');
					oFfield.execCommand('inserthtml', false, '<a href=\"' + zUrl + '\">' + texto + '</a>');
				}
			} 
			else {
				oFfield.execCommand('unlink', false, '');
				oFfield.execCommand('createlink', false, zUrl);
			}
		}	
		if (tagName == "link") {
			var zUrl;
			if (String.substring(Ffield.contentWindow.getSelection(), 0, 1).length == 1) zUrl = Ffield.contentWindow.getSelection();
			else zUrl = prompt("Digite o endereco do link:", "http://");
			if (zUrl) oFfield.execCommand('inserthtml', false, '<a href=\"' + zUrl + '\">' + zUrl + '</a>');
		}
		if (tagName == "C") {
			if (value == 0 || isNaN(parseInt(value))) {
				var oldB = oFfield.queryCommandState('bold');
				var oldI = oFfield.queryCommandState('italic');
				var oldU = oFfield.queryCommandState('underline');
				oFfield.execCommand('removeformat', false, null);
				if (oldB) oFfield.execCommand('bold', false, oldB);
				if (oldI) oFfield.execCommand('italic', false, oldI);
				if (oldU) oFfield.execCommand('underline', false, oldU);
			} else
				oFfield.execCommand('forecolor', false, cores[value][2]);
		}
		if (tagName == "SM")
			oFfield.execCommand('insertimage', false, value);
		if (tagName == "IMG") {
			var zUrl = prompt("Digite o endereco da imagem:\nObs.: e necessario um script para que as imagens sejam exibidas.", "http://");
			if (zUrl)
				oFfield.execCommand('insertimage', false, zUrl);
		}
/**/	if (tagName == "limpa") {
			formatado = OKFT_PegaTextarea(document).value;
			formatado = OKFT_LimpaFormatacao(formatado);
			oFfield.execCommand('selectall', false, null);
			oFfield.execCommand('delete', false, null);
			oFfield.execCommand('inserthtml', false, OKFT_Orkut2HTML(formatado));
		}
		OKFT_Timer();
	}
	
	function code(tagName, value) {  
		if (WYSIWYG) { 
			Vcode(tagName, value);
			return;
		}
		Ffield = OKFT_PegaTextarea(document);
		var sel = false;
		var selText = "";
		Ffield.focus();
		var comeco = Ffield.selectionStart;
		var fim = Ffield.selectionEnd;
		var posicao = comeco;
		var isSM = false;
		if (comeco != fim)
			selText = Ffield.value.substring(comeco, fim);
		if (value == null) value = "";
		
		if (tagName == "C") {
			if (value == 0 || isNaN(parseInt(value))) return;
			tagName = cores[value][0];
			value = "";
		} 
		if (tagName == "SG")
			selText = "\n\n" + value;
		if (tagName == "SM") {
			isSM = (tagName == "SM");
			if (value.indexOf("i_cool")     != -1) tagName = "8)";
			if (value.indexOf("i_sad")      != -1) tagName = ":(";
			if (value.indexOf("i_smile")    != -1) tagName = ":)";
			if (value.indexOf("i_wink")     != -1) tagName = ";)";
			if (value.indexOf("i_bigsmile") != -1) tagName = ":D";
			if (value.indexOf("i_surprise") != -1) tagName = ":o";
			if (value.indexOf("i_funny")    != -1) tagName = ":p";
			if (value.indexOf("i_angry")    != -1) tagName = ":x";
			if (value.indexOf("i_confuse")  != -1) tagName = "/)";
			value = "";
		}
		if (tagName == "link") {
			if (selText.length == 0) selText = prompt("Digite o endereco do link:", "http://");
			if (selText == null) return;
		}
		if (tagName == "TL") {
			tagName = "link";
			value = prompt("Digite o endereco do link", "http://");
			if (value == null) return;
			if (selText.length == 0) selText = prompt("Digite o texto do link:", "");
			if (selText == null) return;
		} 
		if (tagName == "IMG") {
			tagName = "img";
			selText = prompt("Digite o endereco da imagem:\nObs.: e necessario um script para que as imagens sejam exibidas.", "http://");
			if (selText == null) return;
		}
/**/	if (tagName == "limpa") {
			Ffield.value = OKFT_LimpaFormatacao(Ffield.value);
			setTimeout("counterUpdate('countedTextbox', 'countBody', " + Orkut_maxLength + ");", 10);
			return;
		}
		
		if (fim < Ffield.value.length || comeco != fim) {
			var antes = Ffield.value.substring(0, comeco);
			var depois = Ffield.value.substring(fim, Ffield.value.length);
			var inserir = ((tagName != "SG") ? "[" + tagName + (value ? "=" + value : "") + "]" : "") + (isSM ? "" : selText + ((tagName != "SG") ? "[/" + tagName + "]" : ""));
			Ffield.value = antes + inserir + depois;
			fim = comeco + inserir.length;
			if (tagName != "SG") Ffield.setSelectionRange(comeco + tagName.length + 2 + (value ? value.length + 1 : 0), fim - (isSM ? 0 : (tagName.length + 3)));
			Ffield.focus();
		} else {
			Ffield.value += ((tagName != "SG") ? "[" + tagName + (value ? "=" + value : "") + "]" : "") + selText  +  (isSM ? "" : ((tagName != "SG") ? "[/" + tagName + "]" : ""));
			if (tagName != "SG") Ffield.setSelectionRange(Ffield.value.length - ((isSM || tagName == "img" || tagName == "link") ? 0 : tagName.length + 3), Ffield.value.length - ((isSM || tagName == "img" || tagName == "link") ? 0 : tagName.length + 3));
		}
		(location.href.toLowerCase().indexOf("scrapbook.aspx")>-1)?setTimeout("counterUpdate('scrapText', 'countBody', 1024);", 10):setTimeout("updateCharCount('messageBody', 'charCount', " + Orkut_maxLength + ");", 10);
	}
		
	function criaBarra() {
		
		var field = OKFT_PegaTextarea(document);  
		var t = 0;
		if (!field) {
			if (location.href.toLowerCase().indexOf("commmsgs.aspx")  > -1)
				t = setTimeout(function () { criaBarra(); }, '1000');
			return false;  
		}
		
		field.form.addEventListener('submit', function (e) { GM_setValue('ultimoTexto', escape(field.value)); }, true);
		
		clearTimeout(t);
		t = 0;
		
		Barra = document.createElement('div');
		B   = document.createElement('input');
		I   = document.createElement('input');
		U   = document.createElement('input');
		COR = document.createElement('input');
		L   = document.createElement('input');
		TL  = document.createElement('input');
		S   = document.createElement('input');
		IMG = document.createElement('input');
		SIG = document.createElement('input');
		R   = document.createElement('input');
		O   = document.createElement('input');
/**/	F   = document.createElement('input');
		
		var S1, S2;
		
		B.type = "button";
		B.id = "OKFT_btt_B";
		B.title = "Negrito (Ctrl+B)";
		B.addEventListener('focus', 		function (e) { if (WYSIWYG) Ffield.contentWindow.focus(); else Ffield.focus(); }, true);
		B.addEventListener('click', 		function (e) { code("b"); }, true);
		B.addEventListener('mousedown', 	function (e) { if (WYSIWYG) { this.style.outline = "1px inset;"; this.style.backgroundColor = "#e5ecf4"; } }, true);
		B.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:5px;");
		B.style.background = "url(" + imgB + ") no-repeat";
		
		I.type = "button";
		I.id = "OKFT_btt_I";
		I.title = "Italico (Ctrl+I)";
		I.addEventListener('click', 		function (e) { code("i"); }, true);
		I.addEventListener('mousedown', 	function (e) { if (WYSIWYG) { this.style.outline = "1px inset;"; this.style.backgroundColor = "#e5ecf4"; } }, true);
		I.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px;");
		I.style.background = "url(" + imgI + ") no-repeat";
		
		U.type = "button";
		U.id = "OKFT_btt_U";
		U.title = "Sublinhado (Ctrl+U)";
		U.addEventListener('click', 		function (e) { code("u"); }, true);
		U.addEventListener('mousedown', 	function (e) { if (WYSIWYG) { this.style.outline = "1px inset;"; this.style.backgroundColor = "#e5ecf4"; } }, true);
		U.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px;");
		U.style.background = "url(" + imgU + ") 1px 0px no-repeat";
		
		COR.type = "button";
		COR.id = "OKFT_C";
		COR.title = "Selecionar Cor (Ctrl+T)";
		COR.addEventListener('click', 		function (e) { ShowColor(this); }, true);
		COR.addEventListener('mousedown', 	function (e) { this.style.outline = "1px inset;"; this.style.backgroundColor = "#e5ecf4"; }, true);
		COR.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:12px;");
		COR.style.background = "url(" + imgC + ") 2px 0px no-repeat";
		
		L.type = "button";
		L.title = "Link";
		L.addEventListener('click', 		function (e) { code("link"); }, true);
		L.addEventListener('mousedown', 	function (e) { this.style.outline = "1px inset;"; 	}, true);
		L.addEventListener('mouseup', 	function (e) { this.style.outline = "none;"; 		}, true);
		L.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:4px;");
		L.style.background = "url(" + imgL + ") no-repeat";
		
		TL.type = "button";
		TL.title = "Link com texto (Ctrl+L)";
		TL.addEventListener('click', 		function (e) { code("TL"); }, true);
		TL.addEventListener('mousedown', function (e) { this.style.outline = "1px inset;"; 	}, true);
		TL.addEventListener('mouseup', 	function (e) { this.style.outline = "none;"; 		}, true);
		TL.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:4px;");
		TL.style.background = "url(" + imgTL + ") 1px 0px no-repeat";
		
		IMG.type = "button";
		IMG.title = "Imagem (Ctrl+P)";
		IMG.addEventListener('click', 		function (e) { code("IMG"); }, true);
		IMG.addEventListener('mousedown', 	function (e) { this.style.outline = "1px inset;"; 	}, true);
		IMG.addEventListener('mouseup', 		function (e) { this.style.outline = "none;"; 		}, true);
		IMG.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:4px;");
		IMG.style.background = "url(" + imgIMG + ") 2px 0px no-repeat";
		
		S.type = "button";
		S.id = "OKFT_S";
		S.title = "Sorrisos (Ctrl+E)";
		S.addEventListener('click', 		function (e) { ShowSmilies(this);}, true);
		S.addEventListener('mousedown', 	function (e) { this.style.outline = "1px inset;"; this.style.backgroundColor = "#e5ecf4"; }, true);
		S.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:8px;");
		S.style.background = "url(" + imgS + ") 1px 0px no-repeat";
		
		SIG.type = "button";
		SIG.id = "OKFT_SIG";
		SIG.title = "Selecionar uma assinatura";
		SIG.addEventListener('dblclick', function (e) { if (assinaturaPadrao > -1) code("SG", assinaturas[assinaturaPadrao][1]);}, true);
		SIG.addEventListener('click',		function (e) { 
			if (assinaturas.length == 0) {
				if (confirm('Nao ha nenhuma assinatura definida! Deseja configurar agora?') == true)
					ShowOptions(this);
				this.style.outline = "none";
				this.style.backgroundColor = "transparent";
				return;
			} 
			ShowSign(this); 
			sg = true; 
		}, true);
		SIG.addEventListener('mousedown',function (e) { SIG.style.outline = "1px inset;"; SIG.style.backgroundColor = "#e5ecf4"; }, true);
		SIG.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; -moz-border-radius:4; margin:2px;");
		SIG.style.background = "url(" + imgSIG + ") no-repeat";
		
		R.type = "button";
		R.id = "OKFT_R";
		R.title = "Recuperar ultimo texto enviado (Ctrl+R)";
		R.addEventListener('click', 		function (e) { Recuperar(); }, true);
		R.addEventListener('mousedown', 	function (e) { this.style.outline = "1px inset;"; 	}, true);
		R.addEventListener('mouseup', 	function (e) { this.style.outline = "none;"; 		}, true);
		R.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:18px;");
		R.style.background = "url(" + imgR + ") 1px 0px no-repeat";
		
		O.type = "button";
		O.id = "OKFT_O";
		O.title = "Opcoes (Ctrl+O)";
		O.addEventListener('click', 		function (e) { ShowOptions(this); }, true);
		O.addEventListener('mousedown', 	function (e) { this.style.outline = "1px inset;"; 	}, true);
		O.addEventListener('mouseup', 	function (e) { this.style.outline = "none;"; 		}, true);
		O.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:3px;");
		O.style.background = "url(" + imgO + ") 2px -1px no-repeat";
		
/**/	F.type = "button";
		F.id = "OKFT_F";
		F.title = "Limpar Formatacao";
		F.addEventListener('click', 		function (e) { code("limpa"); }, true);
		F.addEventListener('mousedown', 	function (e) { this.style.outline = "1px inset;"; 	}, true);
		F.addEventListener('mouseup', 	function (e) { this.style.outline = "none;"; 		}, true);
		F.setAttribute('style', "-moz-outline-radius:4; cursor:pointer; border:none; margin:2px; margin-left:3px;");
		F.style.background = "url(" + imgF + ") 2px -1px no-repeat";
		
		var CORdisplay = document.createElement('div');
		CORdisplay.id = "OKFT_C_display";
		CORdisplay.title = "Selecionar Cor (Ctrl+T)";
		CORdisplay.addEventListener('click', function (e) { ShowColor(document.getElementById('OKFT_C')); }, true);
		CORdisplay.addEventListener('mousedown', function (e) { COR.style.outline = "1px inset;"; COR.style.backgroundColor = "#e5ecf4"; }, true);
		CORdisplay.setAttribute('style', 'cursor:pointer; -moz-border-radius:5; background-color:transparent; position:absolute; width:8px; height:8px;');
		
		Barra.appendChild(B);
		Barra.appendChild(I);
		Barra.appendChild(U);
		Barra.appendChild(COR);
		if (ativarBotaoLinkSimples) Barra.appendChild(L);
		Barra.appendChild(TL);
		Barra.appendChild(IMG);
		Barra.appendChild(S);
		Barra.appendChild(SIG);
		Barra.appendChild(R);
		Barra.appendChild(O);
/**/	Barra.appendChild(F);
		Barra.appendChild(document.createTextNode(' v.'+versao));
		Barra.appendChild(CORdisplay);
		
		SM = document.createElement('div');	
		SM.id = "OKFT_SM";
		SM.setAttribute('style', "visibility:hidden; border:solid 1px #A1BBE4; background:#e5ecf4; width:100px; padding:3px; position:absolute; left:520px;");
		for (var i = 0; i < sorrisos.length; i++) {
			S1 = document.createElement('input');
			S1.type = "button";
			S1.value = sorrisos[i][2];
			S1.title = sorrisos[i][0] + "   " + sorrisos[i][2];
			S1.setAttribute('url', sorrisos[i][1]);
			S1.setAttribute('style', 'border:none; cursor:pointer; padding:0px 3px 5px 19px; margin:2px 0px 2px 1px; text-align:left; width:99%; height:20px;');
			S1.style.background = "url(" + sorrisos[i][1] + ") 2px no-repeat";
			S1.addEventListener('click', 		function (e) { code("SM", this.getAttribute('url')); HideSmilies();}, true);
			S1.addEventListener('mouseover', function (e) { this.style.backgroundColor = "#bfd0ea"; 		}, true);
			S1.addEventListener('mouseout', 	function (e) { this.style.backgroundColor = "transparent"; 	}, true);
			S1.addEventListener('focus', 		function (e) { this.style.backgroundColor = "#bfd0ea"; 		}, true);
			S1.addEventListener('blur', 		function (e) { this.style.backgroundColor = "transparent"; 	}, true);
			SM.appendChild(S1);
		}
		Barra.appendChild(SM);
		
		SG = document.createElement('div');
		SG.id = "OKFT_SG";
		SG.setAttribute('style', "visibility:hidden; border:solid 1px #A1BBE4; background:#e5ecf4; min-width:151px; max-width:250px; max-height:200px; overflow:auto; padding:3px; position:absolute; left:520px;");
		SG.addEventListener('mouseover', function (e) { sg = false; }, true);
		SG.addEventListener('mouseout', 	function (e) { sg = true;  }, true);
		CriarListaAssinaturas(SG);
		Barra.appendChild(SG);
		
		Cbar = document.createElement('div');
		Cbar.id = "OKFT_CB";
		Cbar.setAttribute('style', "visibility:hidden; border:solid 1px #A1BBE4; background:#e5ecf4; width:100px; padding:3px; position:absolute; left:400px; width:96px");
		for (var i = 0; i < cores.length; i++) {
			Cbtt = document.createElement('input');
			Cbtt.type = "button";
			Cbtt.setAttribute('nome', "OKFT_C_" + cores[i][1]);
			Cbtt.value = (i == 0) ? cores[0][1] : i;
			Cbtt.setAttribute('style', "cursor:pointer; border:1px solid white; height:16px; text-align:center;");
			Cbtt.style.backgroundColor = cores[i][2];
			Cbtt.style.color = (i == 0) ? "white" : cores[i][2];
			Cbtt.style.width = (i == 0) ? 96 : 16;
			Cbtt.addEventListener('click', function (e) { 
				code("C", this.value); 
				Ctitle.setAttribute('nome', this.getAttribute('nome')); 
				CORdisplay.style.backgroundColor = (isNaN(parseInt(this.value)) || WYSIWYG==false) ? "transparent" : this.style.backgroundColor; 
				HideColor();
			}, true);
			Cbtt.addEventListener('mouseover', 	function (e) { document.getElementById('OKFT_C_title').innerHTML = this.getAttribute('nome').substring(7, this.getAttribute('nome').length); 		this.style.borderColor= "black";}, true);
			Cbtt.addEventListener('mouseout', 	function (e) { document.getElementById('OKFT_C_title').innerHTML = document.getElementById('OKFT_C_title').getAttribute('nome').substring(7, document.getElementById('OKFT_C_title').getAttribute('nome').length); 	this.style.borderColor= "white";}, true);
			Cbtt.addEventListener('focus', 		function (e) { this.style.borderColor= "black"; }, true);
			Cbtt.addEventListener('blur', 		function (e) { document.getElementById('OKFT_C_title').innerHTML = document.getElementById('OKFT_C_title').getAttribute('nome').substring(7, document.getElementById('OKFT_C_title').getAttribute('nome').length); 	this.style.borderColor= "white";}, true);
			Cbar.appendChild(Cbtt);
		}
		Ctitle = document.createElement('div');
		Ctitle.id 	= "OKFT_C_title";
		Ctitle.name = "OKFT_C_Padrao";
		Ctitle.setAttribute('style', "font-size:11px; text-align:center;");
		Ctitle.appendChild(document.createTextNode("Padrao"));
		Cbar.appendChild(Ctitle);
		Barra.appendChild(Cbar);
		Barra.id = "OKFT_Barra";
		Barra.setAttribute('style', "font-size:10px; color:#316fbd; border:outset 1px white; -moz-border-radius-topleft:8; -moz-border-radius-topright:8; padding:2px; margin-top:2px");
		Barra.style.width = field.clientWidth - ((field.clientWidth > 680) ? 30 : 0) - 2;
		if (!document.getElementById('OKFT_SM'))
			field.parentNode.insertBefore(Barra, field);
		if (!document.getElementById('OKFT_RTE'))
			var RTE = Ffield = OKFT_CriarRTE();
		
		var pos = GetPos(COR);
		CORdisplay.style.top  = pos[0] + 8;
		CORdisplay.style.left = pos[1] + 9;
	}
	criaBarra();
	
	var bttResp = document.getElementsByTagName("a");
	for (var i = 0; i < bttResp.length; i++) {
		if (bttResp[i].href.indexOf("CommMsgPost.aspx") > -1) {
			bttResp[i].addEventListener('click', function (e) { criaBarra(); }, true);
		}
	}
	
}
	function OKFT_Timer() {
		var btt;
		if (WYSIWYG) {
			(location.href.toLowerCase().indexOf("scrapbook.aspx")>-1)?setTimeout("counterUpdate('scrapText', 'countBody', 1024);", 10):setTimeout("updateCharCount('messageBody', 'charCount', " + Orkut_maxLength + ");", 10);

			oRTE = document.getElementById('OKFT_RTE').contentWindow.document;
			OKFT_PegaTextarea(document).value = OKFT_HTML2Orkut(oRTE.body.innerHTML);
			if (OKFT_PegaTextarea(document).value == '\n') 
				OKFT_PegaTextarea(document).value = "";
			
			if (oRTE.queryCommandState('bold') == true) {
				btt = document.getElementById('OKFT_btt_B');
				btt.style.outline = "1px inset;"; btt.style.backgroundColor = "#e5ecf4";
			} else {
				btt = document.getElementById('OKFT_btt_B');
				btt.style.outline = "none;"; btt.style.backgroundColor = "transparent";
			}
			if (oRTE.queryCommandState('italic') == true) {
				btt = document.getElementById('OKFT_btt_I');
				btt.style.outline = "1px inset;"; btt.style.backgroundColor = "#e5ecf4";
			} else {
				btt = document.getElementById('OKFT_btt_I');
				btt.style.outline = "none;"; btt.style.backgroundColor = "transparent";
			}
			if (oRTE.queryCommandState('underline') == true) {
				btt = document.getElementById('OKFT_btt_U');
				btt.style.outline = "1px inset;"; btt.style.backgroundColor = "#e5ecf4";
			} else {
				btt = document.getElementById('OKFT_btt_U');
				btt.style.outline = "none;"; btt.style.backgroundColor = "transparent";
			}
			
			for (var i=0; i <= 18; i++) {
				if (oRTE.queryCommandValue('forecolor').length < 1) {
					document.getElementById('OKFT_C_title').innerHTML = cores[0][1];
					document.getElementById('OKFT_C_display').style.backgroundColor = 'transparent';
					document.getElementById('OKFT_C_title').setAttribute('name', "OKFT_C_" + cores[0][1]);
				}
				if (cores[i][2] == oRTE.queryCommandValue('forecolor')) {
					document.getElementById('OKFT_C_title').innerHTML = cores[i][1];
					document.getElementById('OKFT_C_display').style.backgroundColor = oRTE.queryCommandValue('forecolor')
					document.getElementById('OKFT_C_title').setAttribute('name', "OKFT_C_" + cores[i][1]);
				}
			}
		}
	}
	
	function iniciarRTE(field, RTE) {
		RTE_iniciado = true;
		if (inserirAssinatura.length > 0 && field.value.length < 2)
				field.value += "\n\n" + inserirAssinatura;
			RTE.contentWindow.document.execCommand('selectall', false, null);
			RTE.contentWindow.document.execCommand('delete', false, null);
			if (field.value.length > 0) RTE.contentWindow.document.execCommand('inserthtml', false, OKFT_Orkut2HTML(field.value));
			OKFT_Colar(RTE.contentWindow.document);
			OKFT_Timer();
			if (iniciarCor > 0) code("C", iniciarCor);
			if (iniciarNegrito) code("b", "");
			if (iniciarItalico) code("i", "");
			if (iniciarSublinhado) code("u", "");
			RTE.contentWindow.focus();
			GM_setValue('tipo', 1);
	}

	function OKFT_CriarRTE() {
		var field = OKFT_PegaTextarea(document);
		var RTE = document.createElement('iframe');
		
		RTE.name = "OKFT_RTE";
		RTE.id = "OKFT_RTE";
		RTE.style.display = "none";
		RTE.style.width  = field.clientWidth - ((field.clientWidth > 680) ? 30 : 0);
		RTE.style.height = ((field.clientHeight < 160) ? 166 : field.clientHeight) + 10;
		field.style.width  = parseInt(RTE.style.width);
		field.style.height = parseInt(RTE.style.height);
		field.parentNode.insertBefore(RTE, field);
		if (WYSIWYG) {
			field.style.display = "none";
			RTE.style.display   = "block";
		}
		var oRTE = document.getElementById('OKFT_RTE').contentWindow.document;
		
		var frameHtml = "<html id=\"rich\">\n";
		frameHtml += "<head>\n";
		frameHtml += "<style>\n";
		frameHtml += "body {\n";
		frameHtml += "	font-family: Verdana, sans-serif;\n";
		frameHtml += "	font-size: 12px;\n";
		frameHtml += "	background: white;\n";
		frameHtml += "	margin: 3px;\n";
		frameHtml += "	padding: 0px;\n";
		frameHtml += "}\n";
		frameHtml += "</style>\n";
		frameHtml += "</head>\n";
		frameHtml += "<body>"; 
		oRTE.open(); 
		oRTE.write(frameHtml);
		oRTE.OKFT_addEventListener = oRTE.addEventListener;	
		oRTE.addEventListener = function(evento, funcao, a) { Debug(funcao); };
		oRTE.write(OKFT_Orkut2HTML(field.value)+"</body>\n</html>");
		oRTE.close();
		oRTE.designMode = "On"; 
		oRTE.execCommand('styleWithCSS', false, false);
		
		if (GM_getValue('lembrarTipo') == true && GM_getValue('tipo') == 0) {
				var tipo = 0;
				field.style.display = "block";
				RTE.style.display = "none";
				Ffield = field; 
				Ffield.focus();
				WYSIWYG = false;
		} else
			setTimeout(function() {iniciarRTE(field, RTE);}, 201);
		
		oRTE.OKFT_addEventListener('focus', function(e) {
			if (!RTE_iniciado)
				iniciarRTE(OKFT_PegaTextarea(document), document.getElementById('OKFT_RTE'));		
			HideSmilies();
			HideSign();
			HideColor();
		}, true);
		
		oRTE.OKFT_addEventListener('keyup', function(e) { OKFT_Timer(); }, true);
		
		oRTE.OKFT_addEventListener('keypress', function(e) {
			if (!e.ctrlKey && !e.altKey && e.charCode) {
				if (OKFT_PegaTextarea(document).value.length >= Orkut_maxLength) {
					OKFT_Timer();
					oRTE.execCommand('selectall', false, null);
					oRTE.execCommand('delete', false, null);
					oRTE.execCommand('inserthtml', false, OKFT_Orkut2HTML(OKFT_PegaTextarea(document).value.substring(0, Orkut_maxLength)));
					if (mostrarAviso)
						alert("O tamanho maximo permitido para o texto foi atingido!");
				}
			}
			if ((e.keyCode == 8 || e.keyCode == 46) && this.body.textContent.length == 0 && this.body.innerHTML.match(/<img/gi) == null && this.body.innerHTML.match(/<br.*<br/gi) == null) {
				OKFT_PegaTextarea(document).value = "";
				this.execCommand('selectall', false, null);
				this.execCommand('delete', false, null);
			}
			if (e.keyCode == 9) {
				document.getElementsByName("Action.submit")[0].focus();
			}
			if (e.ctrlKey) {
			var key = String.fromCharCode(e.charCode).toLowerCase();
			var cmd = '';
			switch (key) {
				case 'b': case 'n': cmd = "b"; break;
				case 'i': cmd = "i"; break;
				case 'u': case 's': cmd = "u"; break;
				case 't': ShowColor(document.getElementById('OKFT_C')); cmd = "1"; break;
				case 'l': cmd = "TL"; break;
				case 'p': cmd = "IMG"; break;
				case 'e': ShowSmilies(document.getElementById('OKFT_S')); cmd = "1"; break;
				case 'r': Recuperar(); cmd = "1"; break;
				case 'o': ShowOptions(); cmd = "1"; break;
				case 'z': try{this.execCommand((e.shiftKey) ? 'redo' : 'undo', false, null);  OKFT_Timer();}catch(e){} cmd = "1"; break;
				case 'v':
					setTimeout(function() { 
						if(oRTE.body.innerHTML.match(/(<(table|td|tr|li|dd|dt|dl|ul|ol|code|blockquote|hr|h[1-9]|div|span|embed|object|param|pre|script|form|input|textarea|[^>]*(face|size|style))|\n)/) != null) {
							OKFT_Colar(RTE.contentWindow.document);
							OKFT_Timer();
							OKFT_PegaTextarea(document).value = OKFT_HTML2Orkut(oRTE.body.innerHTML);
							oRTE.execCommand('selectall', false, null);
							oRTE.execCommand('delete', false, null);
							oRTE.execCommand('inserthtml', false, OKFT_Orkut2HTML(OKFT_PegaTextarea(document).value.substring(0, Orkut_maxLength)));
							if (OKFT_PegaTextarea(document).value.length >= Orkut_maxLength) {
								if (!alerta && mostrarAviso) {
									alerta = true;
									alert("O tamanho maximo permitido foi atingido e o texto sera truncado!");
									alerta = false;
								}
							}
						}
						OKFT_Timer();
					}, 100);
					break;
				};
					
			if (cmd) {
				if (cmd != "1")
					code(cmd, null);
				e.preventDefault();
				e.stopPropagation();
			}
			}
		}, true);
		oRTE.OKFT_addEventListener('mouseup', 	function(e) { OKFT_Timer();}, true);
		oRTE.OKFT_addEventListener('dragdrop', function(e) { 
			setTimeout(function() { 
				OKFT_Colar(RTE.contentWindow.document);
				OKFT_PegaTextarea(document).value = OKFT_HTML2Orkut(oRTE.body.innerHTML, true);
				oRTE.execCommand('selectall', false, null);
				oRTE.execCommand('delete', false, null);
				oRTE.execCommand('inserthtml', false, OKFT_Orkut2HTML(field.value.substring(0, Orkut_maxLength)));
				OKFT_Timer();
			}, 100);
		}, true);
		
		//OKFT_Timer();
		
		
		var turn = document.createElement('a');
		turn.href = "javascript: void(0);";
		turn.id = "OKFT_turn";
		turn.setAttribute('style', "text-decoration: none; font-size: 11px; background: #d4dded; padding: 2px; border: 1px outset #a3b7e2; -moz-border-radius-bottomleft: 8; -moz-border-radius-bottomright: 8;");
		turn.appendChild(document.createTextNode(((WYSIWYG) ? "Desativar" : "Ativar") + " edicao avancada."));
		turn.addEventListener('click', function (e) { 
			if (WYSIWYG) {
				field.style.display = "block";
				RTE.style.display = "none"; 
				Ffield = field; 
				Ffield.focus();
				WYSIWYG = false;
				GM_setValue('tipo', 0);
				btt = document.getElementById('OKFT_btt_B');
				btt.style.outline = "none;"; btt.style.backgroundColor = "transparent";
				btt = document.getElementById('OKFT_btt_I');
				btt.style.outline = "none;"; btt.style.backgroundColor = "transparent";
				btt = document.getElementById('OKFT_btt_U');
				btt.style.outline = "none;"; btt.style.backgroundColor = "transparent";
				this.innerHTML = "Ativar edicao avancada.";
			} else {
				field.style.display = "none";
				RTE.style.display = "block"; 
				Ffield = RTE; 
				WYSIWYG = true;
				GM_setValue('tipo', 1);
				setTimeout(function() {
				oRTE.execCommand('selectall', false, null);
				oRTE.execCommand('delete', false, null);
				if (field.value.length > 0) oRTE.execCommand('inserthtml', false, OKFT_Orkut2HTML(field.value));
				oRTE.execCommand('styleWithCSS', false, false); 
				Ffield.contentWindow.focus(); 
				OKFT_Timer();}, 10);
				this.innerHTML = "Desativar edicao avancada.";
			}
		}, true);
		field.parentNode.appendChild(turn, field);
		
		return RTE;
	}
	
	function OKFT_removeAttributes(node) {
		for (var i = 0; i < node.childNodes.length; i++) {
			var elemento = node.childNodes[i];
				if (elemento.attributes != null) {
			if (elemento.style.textDecoration == "underline") 
				elemento.innerHTML = "<u>" + elemento.innerHTML + "</u>";
			if (elemento.style.fontWeight.indexOf("bold") > -1 || parseInt(elemento.style.fontWeight) >= 600 ) 
				elemento.innerHTML = "<b>" + elemento.innerHTML + "</b>";
			if (elemento.style.fontStyle == "italic") 
				elemento.innerHTML = "<i>" + elemento.innerHTML + "</i>";
			if (elemento.style.color)
				var cor = elemento.style.color;
			
			var attributesLength = elemento.attributes.length;
			var k = 0;
			for ( var j = 0; j < attributesLength; j++)  {
				if (elemento.attributes[k].nodeName.toLowerCase().search(/(href|color|src)/) == 0 && elemento.nodeName.toLowerCase().search(/(font|img|a)/) == 0) {
					k++;
				} else
					elemento.removeAttribute(elemento.attributes[k].nodeName);
				if (elemento.nodeName.toLowerCase() == "font" && !elemento.hasAttributes('color'))
					elemento.innerHTML = "%$tyug#" + elemento.innerHTML + "%$tyug#";
				if (cor) {
					if (elemento.nodeName.toLowerCase() == "font")
						elemento.color = cor;
					else
						elemento.innerHTML = "<font color\"" + cor + "\">" + elemento.innerHTML + "</font>";
				}
		  }
		}
		if (elemento.childNodes.length > 0)
			OKFT_removeAttributes(elemento);
		
		}
	}
	function OKFT_RemoveScript(node) {
		for (var i = 0; i < node.childNodes.length; i++) {
			var elemento = node.childNodes[i];
			if (elemento.nodeName.toLowerCase() == "script") {
					elemento.parentNode.removeChild(elemento);
					i--;
			}
			if (elemento.childNodes.length > 0)
				OKFT_RemoveScript(elemento);
		}
	}
  
	function OKFT_Colar(doc) {
		OKFT_RemoveScript(doc.body);
		OKFT_removeAttributes(doc.body);
		ret = doc.body.innerHTML;
		
		ret = ret.replace(/<(h[1-9]|dt)>/ig,  "<br><b>" );
		ret = ret.replace(/<\/(h[1-9]|dt)>/ig,  "</b><br> " );
		ret = ret.replace(/<li>/ig,  "&#8226;&nbsp;" );
		ret = ret.replace(/<\/li>/ig,  "<br>" );	
		ret = ret.replace(/<div>/ig,  "<br>" );		 
		ret = ret.replace(/<[\/][u|o]l>/ig,  "<br> " );
		ret = ret.replace(/<em>/ig,  "<i>" );
		ret = ret.replace(/<\/em>/ig,  "</i>" );
		ret = ret.replace(/<hr>/ig,  "_______________________________________\n" );
		ret = ret.replace(/<(\/*tr|\/dd)>/ig,  "<br> " );
		ret = ret.replace(/<\/*p>/ig,  "<br>" );
		ret = ret.replace(/<(strong|big)>/ig,  "<b>" );
		ret = ret.replace(/<\/(strong|big)>/ig,"</b>");
		ret = ret.replace(/<font>\%\$tyug\#/ig,"");
		ret = ret.replace(/\%\$tyug\#<\/font>/ig,"");
		ret = ret.replace(/<!--[^>]*-->/ig,"");
		ret = ret.replace(/<a>/ig,"");
		ret = ret.replace(/<((a|img|font)[^>]*)>/ig,"{{$1}}");
		ret = ret.replace(/<(b|i|u|br)>/ig,"{{$1}}");
		ret = ret.replace(/<\/(b|i|u|br|a|img|font)>/ig,"{{/$1}}");
		ret = ret.replace(/<[^>]*>/ig,"");
		ret = ret.replace(/\{\{/ig,"<");
		ret = ret.replace(/\}\}/ig,">");
		ret = ret.replace(/\s\s/ig," ");
		ret = ret.replace(/\n/ig," ");
		ret = ret.replace(/\%\$tyug\#/ig,"");
		doc.body.innerHTML = ret;
	}

	function OKFT_HTML2Orkut(str, cola) {
		var ret = str;
		var pos = 0;
		var Cores = [];
		var n = 0;
		
		ret = ret.replace(/\[/gi,"&#91;");
		ret = ret.replace(/\]/gi,"&#93;");
		ret = ret.replace(/\s\s/ig," ");
		ret = ret.replace(/<br\/*>/ig,"\n");
		ret = ret.replace(/\&nbsp\;/ig," ");
		
		ret = ret.replace(/<font\ color=(\"[^\"]+\")>/ig,"[$1]");
		
		ret = ret.replace(/ border=[\"][0-9]+[\"]/ig, "");
		ret = ret.replace(/ (ilo-(full-src|ph-fix)|id|class|name|alt)=\"[^\"]*\"/ig, "");
		ret = ret.replace(/ height=[\"]*[0-9]+\%*[\"]*/ig, "");
		ret = ret.replace(/ width=[\"]*[0-9]+\%*[\"]*/ig, "");

		ret = ret.replace(/<img\ src=\"[^\"]*\/i_cool\.gif\">/ig,     "[8)]");
		ret = ret.replace(/<img\ src=\"[^\"]*\/i_sad\.gif\">/ig,      "[:(]");
		ret = ret.replace(/<img\ src=\"[^\"]*\/i_smile\.gif\">/ig,    "[:)]");
		ret = ret.replace(/<img\ src=\"[^\"]*\/i_wink\.gif\">/ig,     "[;)]");
		ret = ret.replace(/<img\ src=\"[^\"]*\/i_bigsmile\.gif\">/ig, "[:D]");
		ret = ret.replace(/<img\ src=\"[^\"]*\/i_surprise\.gif\">/ig, "[:o]");
		ret = ret.replace(/<img\ src=\"[^\"]*\/i_funny\.gif\">/ig,    "[:p]");
		ret = ret.replace(/<img\ src=\"[^\"]*\/i_angry\.gif\">/ig,    "[:x]");
		ret = ret.replace(/<img\ src=\"[^\"]*\/i_confuse\.gif\">/ig,  "[/)]");
		
		ret = ret.replace(/<img\ src=\"(data\:image\/[^\"]*)\"[\/]*>/ig, "");
		ret = ret.replace(/<img\ src=\"([^\"]*)\"[\/]*>/ig, "[img]$1[/img]");
		
		ret = ret.replace(/ target=\"[^\"]*\"/ig, "");
		ret = ret.replace(/ href=\"((Profile|Community|Comm(Msgs|Topics|Event)|ScrapBook|Album|Friends(List|Net))\.aspx\?[^\"]*)\"/ig, " href=\"http://www.orkut.com/$1\"");
		ret = ret.replace(/<a\ href=\"([^\"]*)\">/ig, "[link=$1]");
		ret = ret.replace(/<\/a>/ig,"[/link]");
	
		ret = ret.replace(/</g,"[");
		ret = ret.replace(/>/g,"]");
		
		while ((proximo = ret.search(/\[\"(\#......)\"\]/i)) >= 0) {
		  Cores[n++] = RegExp.$1;
		  fim = ret.search(/\[\/font\]/i);
		  ret = ret.replace(/\"(\#......)\"/i, '$1');
		  proximo = ret.search(/\[\"\#......\"\]/i);
			 if (proximo > fim) {
				ret = ret.replace(/\/font/i, "/" + Cores[--n]);
				Cores[n] = "";
			 } else if( proximo == -1 ) {
				while (n) {
					ret = ret.replace(/\/font/i, "/" + Cores[--n]);
					Cores[n] = "";
				} 
		  }
	  }
	  
		ret = ret.replace(/\#00eeee\]/ig,"aqua]");
		ret = ret.replace(/\#0000ff\]/ig,"blue]");
		ret = ret.replace(/\#ff00ff\]/ig,"fuchsia]");
		ret = ret.replace(/\#ffd700\]/ig,"gold]");
		ret = ret.replace(/\#9c9c9c\]/ig,"gray]");
		ret = ret.replace(/\#008400\]/ig,"green]");
		ret = ret.replace(/\#00ff00\]/ig,"lime]");
		ret = ret.replace(/\#840000\]/ig,"maroon]");
		ret = ret.replace(/\#000084\]/ig,"navy]");
		ret = ret.replace(/\#848400\]/ig,"olive]");
		ret = ret.replace(/\#ffa500\]/ig,"orange]");
		ret = ret.replace(/\#ffc0cb\]/ig,"pink]");
		ret = ret.replace(/\#840084\]/ig,"purple]");
		ret = ret.replace(/\#ff0000\]/ig,"red]");
		ret = ret.replace(/\#c6c6c6\]/ig,"silver]");
		ret = ret.replace(/\#008484\]/ig,"teal]");
		ret = ret.replace(/\#ff00ff\]/ig,"violet]");
		ret = ret.replace(/\#ffff00\]/ig,"yellow]");
		
		while (ret.match(/\[\"(aqua|blue|fuchsia|gold|gray|green|lime|maroon|navy|olive|orange|pink|purple|red|silver|teal|violet|yellow)\"\]/) != null) {
			ret = ret.replace(/\[\"(aqua|blue|fuchsia|gold|gray|green|lime|maroon|navy|olive|orange|pink|purple|red|silver|teal|violet|yellow)\"\]([^\[]*)\[\/font\]/i,"[$1]$2[/$1]");
	   }
		
		ret = ret.replace(/\[\#......\]/ig,"");
		ret = ret.replace(/\[\/\#......\]/ig,"");
		
		ret = ret.replace(/\&lt;/ig,"<");
		ret = ret.replace(/\&gt;/ig,">");
		
		return ret;
   }
	
	function OKFT_Orkut2HTML(str) {
		var ret = str;
			
		ret = ret.replace(/\>/gi,"&gt;");
		ret = ret.replace(/\</gi,"&lt;");
		ret = ret.replace(/\n/gi,"<br>");
		
		ret = ret.replace(/\[8\)\]/gi,  '<img src=\"' + sorrisos[0][1]  + '\" border=\"0\">');
		ret = ret.replace(/\[:\(\]/gi,  '<img src=\"' + sorrisos[1][1]  + '\" border=\"0\">');
		ret = ret.replace(/\[:x\]/gi,   '<img src=\"' + sorrisos[2][1]  + '\" border=\"0\">');
		ret = ret.replace(/\[:\)\]/gi,  '<img src=\"' + sorrisos[3][1]  + '\" border=\"0\">');
		ret = ret.replace(/\[;\)\]/gi,  '<img src=\"' + sorrisos[4][1]  + '\" border=\"0\">');
		ret = ret.replace(/\[:d\]/gi,   '<img src=\"' + sorrisos[5][1]  + '\" border=\"0\">');
		ret = ret.replace(/\[:o\]/gi,   '<img src=\"' + sorrisos[6][1]  + '\" border=\"0\">');
		ret = ret.replace(/\[:p\]/gi,   '<img src=\"' + sorrisos[7][1]  + '\" border=\"0\">');
		ret = ret.replace(/\[\/\)\]/gi, '<img src=\"' + sorrisos[8][1]  + '\" border=\"0\">');
		
		ret = ret.replace(/\s\s/ig," ");
		
		ret = ret.replace(/\[b\]/gi,  "<b>");
		ret = ret.replace(/\[\/b\]/gi,"</b>");
		
		ret = ret.replace(/\[u\]/gi,  "<u>");
		ret = ret.replace(/\[\/u\]/gi,"</u>");
		
		ret = ret.replace(/\[i\]/gi,  "<i>");
		ret = ret.replace(/\[\/i\]/gi,"</i>");
		
		ret = ret.replace(/\[aqua\]/gi,      "<font color='" + cores[1][2]  + "'>");
		ret = ret.replace(/\[blue\]/gi,      "<font color='" + cores[2][2]  + "'>"); 
		ret = ret.replace(/\[teal\]/gi,      "<font color='" + cores[3][2]  + "'>");  
		ret = ret.replace(/\[navy\]/gi,      "<font color='" + cores[4][2]  + "'>");  
		ret = ret.replace(/\[violet\]/gi,    "<font color='" + cores[5][2]  + "'>"); 
		ret = ret.replace(/\[purple\]/gi,    "<font color='" + cores[6][2]  + "'>");  
		ret = ret.replace(/\[red\]/gi,       "<font color='" + cores[7][2]  + "'>"); 
		ret = ret.replace(/\[fuchsia\]/gi,   "<font color='" + cores[8][2]  + "'>");
		ret = ret.replace(/\[pink\]/gi,      "<font color='" + cores[9][2]  + "'>"); 
		ret = ret.replace(/\[orange\]/gi,    "<font color='" + cores[10][2] + "'>");
		ret = ret.replace(/\[yellow\]/gi,    "<font color='" + cores[11][2] + "'>");  
		ret = ret.replace(/\[gold\]/gi,      "<font color='" + cores[12][2] + "'>");  
		ret = ret.replace(/\[green\]/gi,     "<font color='" + cores[13][2] + "'>");
		ret = ret.replace(/\[lime\]/gi,      "<font color='" + cores[14][2] + "'>");  
		ret = ret.replace(/\[olive\]/gi,     "<font color='" + cores[15][2] + "'>");
		ret = ret.replace(/\[maroon\]/gi,    "<font color='" + cores[16][2] + "'>");
		ret = ret.replace(/\[gray\]/gi,      "<font color='" + cores[17][2] + "'>");  
		ret = ret.replace(/\[silver\]/gi,    "<font color='" + cores[18][2] + "'>");
		ret = ret.replace(/\[\/(aqua|blue|teal|navy|violet|purple|red|fuchsia|pink|orange|yellow|gold|green|lime|olive|maroon|gray|silver)\]/gi,  "</font>");		
		
		ret = ret.replace(/\[img\]([^\[]*(jpg|jpeg|gif|png|bmp))\[\/img\]/gi,'<img src="$1" border="0">');
		
		ret = ret.replace(/\[link]([^\[]+)/gi,'<a href="$1">$1');
		ret = ret.replace(/\[\/link\]/gi,'</a>');
		ret = ret.replace(/\[link=([^\]]+)\]/gi,'<a href="$1">');
				
		return ret;
	}
	
	function OKFT_PegaTextarea(doc) {

		var isScrapBook = (location.href.toLowerCase().indexOf("scrapbook.aspx"    )  >-1);  
		var isTopics    = (location.href.toLowerCase().indexOf("commmsgpost.aspx"  )  >-1 || 
								 location.href.toLowerCase().indexOf("commtopicpost.aspx")  >-1 || 
								 location.href.toLowerCase().indexOf("commmsgs.aspx")  >-1);  
		var isMsgs      = (location.href.toLowerCase().indexOf("compose.aspx"      )  >-1);  
		var isEvents    = (location.href.toLowerCase().indexOf("commeventpost.aspx")  >-1);   
		
		var field;
		if (isScrapBook)   field = doc.getElementById("scrapText");
		else if (isTopics) field = doc.getElementById("messageBody");
		else if (isEvents) field = doc.getElementById("textboxBody");
		//else if (isMsgs) field = doc.getElementById("body");
		return field;
	}

/**/function OKFT_LimpaFormatacao(str) {
		//smiles: \:.|.\)
		var tags = new RegExp (/\[\/?(b|i|u|img|link|link.+?|aqua|blue|teal|navy|violet|purple|red|fuchsia|pink|orange|yellow|gold|green|lime|olive|maroon|gray|silver)\]/gim);
		return str.replace(tags,"");
	}
}, false);
})();

/* Changelog: ***************************************************************************
 * 
 * 0.1.0.2c
 * Bugfix.
 *
 * 0.1.0.2b
 * Bugfix.
 *
 * 0.1.0.1
 * Bugfix.
 * Incluida compatibilidade com o FastReply.
 *
 * 0.1.0
 * Primeira versao do script para o Firefox com Greasemonkey.
 *  
 */
 
 /*
	todo: mecanismo para salvar as configuracoes...
 */

/* Este script foi originalmente criado por Luiz Fernando da Silva Armesto, para o Opera 9 Beta (http://www.opera.com), portado 
 * para o Firefox 1.5.0.3 (http://www.mozilla.com/) com a extensao Greasemonkey 0.6.4 (http://greasemonkey.mozdev.org/) e editado
 * usando o SciTE 1.63 (http://www.scintilla.org/SciTE.html) no Kurumin Linux 5.0 (http://www.guiadohardware.net/linux/kurumin/).
 */
