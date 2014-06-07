// ==UserScript==

// @name 		   Torrentz + IMDB Ratings
// @description    Show movie ratings from IMDB, easy download link and some other features.
// @version		   1.1
// @include        http://www.torrentz.eu/*?f=*
// @include        http://torrentz.eu/*?f=*
// @include        http://www.torrentz.eu/*?q=*
// @include        http://torrentz.eu/*?q=*
// @include        https://www.torrentz.eu/*?f=*
// @include        https://torrentz.eu/*?f=*
// @include        https://www.torrentz.eu/*?q=*
// @include        https://torrentz.eu/*?q=*
// @exclude		   http://torrentz.eu/i
// @require  	   https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require		   https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// @require		   http://dl.dropbox.com/u/54148080/jquery.qtip.min.js




// ==/UserScript==

try{

////////////// FUN??ES - IN?CIO /////////////////



function pegaNome(nReal){

var pos = 0;
var b = -1;

for(a=-1;a<nomes.length;a++){
while(pos != -1){
pos = nomes.indexOf(nReal, a + 1);
a = pos;
lengthDup[pos] = pos;

}
}

// Coloca o nome na array
nomes[i] = nReal;

// Coloca a dl dos nomes que tem ano na array
dls[i] = dl;
}

function getElementsByClass(searchClass,node,tag) {

	var classElements = new Array();

	if ( node == null )

		node = document;

	if ( tag == null )

		tag = '*';

	var els = node.getElementsByTagName(tag);

	var elsLen = els.length;

	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");

	for (i = 0, j = 0; i < elsLen; i++) {

		if ( pattern.test(els[i].className) ) {

			classElements[j] = els[i];

			j++;

		}

	}

	return classElements;

}

function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}

addStyleSheet('@import "http://dl.dropbox.com/u/54148080/jquery.qtip.min.css";');

function alertTest(){
if(arrayDomains.length == arrayRatings.length){
arrayRatings = arrayRatings.filter(Boolean);
arrayRatingsSorted = arrayRatings.slice();
arrayRatingsSorted.sort(mySorting);
var contador = 0;
for(i=0;i<todasDt.length;i++){
if(todasDt[i].parentNode.style.display != 'none'){
todasDt[i].parentNode.parentNode.insertBefore(arrayRatingsSorted[contador][0], todasDt[i].parentNode);
contador++;
escuroClaro(todasDt[i].parentNode,"#F6F6F6","#DEDEDE");
transparente(todasDt[i].parentNode,"10");
}
}
$(document).ready(function() {
$('img.imagem').each(function() {
$(this).qtip({
   content: {
      text: 'Loading...', // Loading text...
	  title: 'Best Comment',
      ajax: {
         url: $(this).attr('comment'), // URL to the JSON script
         type: 'GET', // POST or GET
         dataType: 'html', // Tell it we're retrieving JSON
         success: function(data, status) {
         var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');
            html.innerHTML = data;
            doc.appendChild(html);
		  	 
var testa = getElementsByClass('comment', doc, '*');
var votes = new Array();
for(i=0;i<testa.length;i++){
var votos = testa[i].firstChild.nextSibling.firstChild.innerHTML;
var nome = testa[i].firstChild.firstChild.innerHTML;
var data = testa[i].firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
var comentario = testa[i].lastChild.innerHTML;
if(votos == null){
votos = '0';
}
votes[i] = [votos, nome, data, comentario ];
}

votes = votes.sort(function mySorting(a,b) {
a = parseInt(a[0]);
b = parseInt(b[0]);
return a == b ? 0 : (a < b ? 1 : -1)
});
		if(votes == ""){
		this.set('content.text', 'No comments!');
		} 
		else{
				// alert(data.getElementById('votes'));
				var content = votes[0][3];
				var title = votes[0][1]+" ("+votes[0][2]+")"+" "+votes[0][0]+" votes";
	 
				// Now we set the content manually (required!)
				this.set('content.text', content);
				this.set('content.title.text', title);
			}
         }
      }
   }
});
});
});
juntaDuplicados();
clearInterval(testando);
}
}

		//Fun??o pra sortear a arrayRatings
		function mySorting(a,b) {
			a = a[1];
			b = b[1];
			return a == b ? 0 : (a < b ? 1 : -1)
		}
		
		
		// Fun??o para colocar o ?cone do Download
		function download(){
		
			// Colocar ?cone do download
			var magnet = document.createElement('img');
			var link = document.createElement('a');
			magnet.style.position = 'relative';
			magnet.style.right = '20px';
			magnet.style.left = '4px';
			magnet.style.bottom = '17px';
			magnet.setAttribute("src", "http://images.findicons.com/files/icons/2015/24x24_free_application/24/load.png");
			magnet.setAttribute("title", "Download");
			var regExp = /^\/[0-9a-z]{40}$/;
			var getLink = todasDt[i].firstChild.nextSibling.getAttribute('href').match(regExp);
			var torrentzLink = 'torrentz.eu' + getLink;
			if(getLink !== null){
			getLink = getLink.toString().toUpperCase();
			}
			link.appendChild(magnet);
			link.setAttribute('href', 'http://torrage.com/torrent'+getLink+'.torrent');
			todasDt[i].parentNode.insertBefore(link, todasDt[i].nextSibling );
			
			var comment = document.createElement('img');
			comment.style.position = 'relative';
			comment.style.right = '20px';
			comment.style.left = '1px';
			comment.style.bottom = '17px';
			comment.setAttribute("src", "http://findicons.com/files/icons/811/developer_kit/24/chat_bubble_alt.png");
			comment.setAttribute("title", "Top Comment");
			comment.setAttribute("comment", getLink);
			comment.setAttribute("class", "imagem");
			todasDt[i].parentNode.insertBefore(comment, todasDt[i].nextSibling );

		}

		// Fun??o para colocar as notas
		function loopDomains ( numX ) {
			startXmlHttp ( arrayDomains [ numX ], numX );
			if (++numX < arrayDomains.length) loopDomains (numX );
			}

			function startXmlHttp ( url, numero ) {
			GM_xmlhttpRequest({
			method: 'GET', url: "http://www.imdbapi.com/?t=" + url[0] + url[1],
			onreadystatechange: function (responseDetails) {
			todasDt[numero].firstChild.innerHTML = "Retrieving";
			if (responseDetails.status == 200) {
			var imdbData = responseDetails.responseText;
			var imdbJSON = eval("(" + imdbData + ")");
			if(imdbJSON.Rating == null || imdbJSON.Rating == 'N/A'){
			todasDt[numero].parentNode.style.display = 'none';
			}
			else{
			todasDt[numero].firstChild.innerHTML = imdbJSON.Rating;
			todasDt[numero].firstChild.setAttribute('title',imdbJSON.Votes+' Votes');
			todasDt[numero].firstChild.setAttribute('href','http://www.imdb.com/title/'+imdbJSON.ID+'/');
			arrayRatings[numero] = [todasDt[numero].parentNode,[todasDt[numero].firstChild.innerHTML]];
			}
			}
			},
			});
		}

		// Fun??o para deixar uma linha escura outra clara
		function escuroClaro(el,cor1,cor2){
			if (taEscuro == 0){
			el.style.background = cor1;
			taEscuro = 1;
			}
			else{
			el.style.background = cor2;
			taEscuro = 0;
			}
		}
		
		function transparente(el,value){
		    el.parentNode.style.background = '#F2F2F2';
			el.style.opacity = value/10;
			el.style.filter = 'alpha(opacity=' + value*10 + ')';
		}

		// Fun?ao para toglar 
			function toggle(target1){
				if (target1.style.display == 'none') {
					target1.style.display = 'block'
					escuroClaro(target1,"#FFFE99","#FFFEC9");
					target1.firstChild.firstChild.style.marginLeft = '40px';	
				} 
				else {
					target1.style.display = 'none'
				}
			}

		// Fun??o que pega a quantidade de duplicados que tem e manda pra toglar
			function teste(){

			var quant = this.innerHTML.match(/\d+/);
			var current = 'this.parentNode.parentNode.nextSibling';
			for(i=0;i<quant;i++){
			toggle(eval(current));
			current = current + '.nextSibling';
			}
			}

		// Fun??o pra eliminar valores duplicados na array
			function eliminateDuplicates(arr) {
			  var i,
				  len=arr.length,
				  out=[],
				  obj={};

			  for (i=0;i<len;i++) {
				obj[arr[i]]=0;
			  }
			  for (i in obj) {
				out.push(i);
			  }
			  return out;
			}

		//Fun??o pra achar valores duplicados
			function find_duplicates(arr) {
			  var len=arr.length,
				  out=[],
				  counts={};

			  for (var i=0;i<len;i++) {
				var item = arr[i];
				var count = counts[item];
				counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
			  }

			  for (var item in counts) {
				if(counts[item] > 1)
				  out.push(item);
			  }

			  return out;
			}		

function send(name, year){
				var currentName = name;
				var currentYear = year;
				currentName = currentName.replace(/<\/?[^>]+(>|$)/g,'');
				var badWords = ['dvdrip','xvid','avi','ac3'];
				for(a=0;a<badWords.length;a++){
				if(currentName.indexOf(badWords[a]) != -1){
				currentName = currentName.replace(badWords[a], '');
				}
				}
				currentName = currentName.replace(/\s$/,'');
				arrayDomains[i] = [currentName, currentYear];
				loopDomains(i);
				download();
			}			
/////////// FUN??ES - FIM ////////////

////////// DECLARA��ES DE VARI�VEIS - IN�CIO ///////////

		// Procurar todas dt
		var todasDt = document.getElementsByTagName('dt');
		var taEscuro = new Boolean();
		var nomes = [];
		var dls = new Array();
		var lengthDup = new Array();
		var last = new Array();
		var first = new Array();
		var indexes = new Array();
		var arrayDomains = new Array();
		var arrayRatings = new Array();
		var arrayRatingsSorted = new Array();
		var escondidas;
		var duplicados = new Array();
		
		
////////// DECLARA��ES DE VARI�VEIS - FIM ///////////

	//Get rid of sponsored links
var sponsored = getElementsByClass('sponsored', document, '*');
sponsored[0].style.display = 'none';

for(i=0;i<todasDt.length;i++){

// Criar o elemento da nota
	var rating = document.createElement('a');
	var nota = document.createTextNode('');
	rating.style.color = '#A68803';
	rating.style.fontWeight = 'bold';
	rating.style.marginRight = '10px';
	rating.style.marginLeft = '58px';
	rating.appendChild(nota);

// Deixar transparente aquelas palavras que aparecem depois do nome do filme, Aumenta a margem de cima e desabilita o scroll
	todasDt[i].style.color = 'transparent';
	todasDt[i].style.marginTop = '15px';
	todasDt[i].style.overflow = 'hidden';

// Colocar o elemento que vai ficar a nota do lado de todos os links dos filmes
	todasDt[i].insertBefore(rating, todasDt[i].firstChild);

// Vamos pegar o nome do filme com todas aquelas palavras: XVID, DVDRIP, MAXSPEED, etc.
var nome = todasDt[i].firstChild.nextSibling.innerHTML.replace(/<.*?>/g,'').toString().toLowerCase();

// Pegar o Elemento dl
var dl = todasDt[i].parentNode;
dl.style.padding = '5px';

// Pegar o ano do fime, se houver
var ano = nome.match(/[0-9]{4}\s/);
// Usa essa variável se o nome do filme não tiver ano mas tiver a palavra dvdrip
var dvdrip = nome.match(/^.*?(?=\s\bdvdrip\b)/);

if(null !== ano){
// Pegar tudo que tiver antes do ano
var nomeReal = nome.match(/^.*?(?=\s[0-9]{4})/).toString();
pegaNome(nomeReal);

}

else if( null !== dvdrip){
// Pegar tudo que tiver antes do ano
var nomeReal = nome.match(/^.*?(?=\s\bdvdrip\b)/).toString();
pegaNome(nomeReal);
}

else{
dl.style.display = 'none';
}

// filtro
nomes = nomes.filter(Boolean);

}

dls = dls.filter(Boolean);
lengthDup = lengthDup.filter(Boolean);

for(i=0;i<find_duplicates(nomes).length;i++){
var valorL = nomes.lastIndexOf(find_duplicates(nomes)[i]);
var valorF = nomes.indexOf(find_duplicates(nomes)[i]);
last[i] = valorL;
first[i] = valorF;
}

var altogether = last.concat(lengthDup, first);
altogether = eliminateDuplicates(altogether);
altogether.sort();

function juntaDuplicados(){
for	(i=0;i<altogether.length;i++){
var principal = altogether[i];
for(a=0;a<altogether.length;a++){
var atual = nomes[principal];
if(atual === nomes[altogether[a]] && altogether[a] != principal){
var header = nomes.lastIndexOf(nomes[altogether[a]]);
dls[header].parentNode.insertBefore(dls[altogether[a]], dls[header].nextSibling);
}
}
}
}
for	(i=0;i<altogether.length;i++){
var principal = altogether[i];
for(a=0;a<altogether.length;a++){
var atual = nomes[principal];
if(atual === nomes[altogether[a]] && altogether[a] != principal){
var header = nomes.lastIndexOf(nomes[altogether[a]]);
dls[header].parentNode.insertBefore(dls[altogether[a]], dls[header].nextSibling);
dls[altogether[a]].style.display = 'none';
indexes[a]= nomes.lastIndexOf(nomes[altogether[a]]);
}
}
}
// Eliminar os duplicados do indexes
indexes = eliminateDuplicates(indexes);



for(i=0;i<indexes.length;i++){
var index1 = indexes[i];
// Criar o link para mostrar os filmes duplicados
	var mostrar = document.createElement('a');
	var texto = document.createTextNode('');
	mostrar.appendChild(texto);
	mostrar.style.position = 'relative';
	dls[index1].firstChild.appendChild(mostrar);
if(!dls[index1].firstChild.firstChild.nextSibling.toString().match(/torrentz.eu\/z\//)){
			dls[index1].style.display = 'block';
	}

	
// Conta quantos filmes duplicados existem
var counter = 0;

for(a=0;a<altogether.length;a++){

if(nomes[index1] == nomes[altogether[a]] && index1 !== altogether[a]){

// Incrementa o contador
counter = counter + 1;

dls[index1].firstChild.lastChild.innerHTML = '+'+counter;
}
}
dls[indexes[i]].firstChild.lastChild.addEventListener('click', teste, false);
}

for(i=0;i<todasDt.length;i++){
if(todasDt[i].parentNode.style.display != 'none'){
// Deixar transparente
transparente(todasDt[i].parentNode,"5");
var currentDt = todasDt[i].firstChild.nextSibling.innerHTML.replace(/<.*?>/g,'').toString().toLowerCase();
if(null !== currentDt.match(/^.*?(?=[0-9]{4})/)){
var currentName = currentDt.match(/^.*?(?=[0-9]{4})/).toString().toLowerCase();
var currentYear = currentDt.match(/[0-9]{4}\s/);
send(currentName, currentYear);
}
else {
var currentName = currentDt.match(/^.*?(?=\s\bdvdrip\b)/).toString().toLowerCase();
var currentYear = "";
send(currentName, currentYear);
}
}
else{
download();
todasDt[i].style.backgroundPosition = '96.5%';
todasDt[i].style.marginLeft = "28px";
todasDt[i].nextSibling.style.marginLeft = "12px";
todasDt[i].removeChild(todasDt[i].firstChild);
}
}
var testando = setInterval(alertTest, 1000);
}
catch(e){
unsafeWindow.console.log(e);
}
