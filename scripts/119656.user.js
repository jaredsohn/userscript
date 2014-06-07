// ==UserScript==
// @name           BRChan - Marmelos
// @namespace      http://*brchan.org
// @include        http://www.brchan.org/*
// ==/UserScript==


// Marmelar o que foi postado por você?
var mPosts = true;

// Marmelar o que foi postado no chan?
var mChan = true;

// Novos marmelos?
var nMarmelos = true;

// Marmelos definidos pelo usuário. Não remova a primeira linha, filho da puta sem costumes.
var marmelos = new Array();
marmelos["foda-se"] = "fornique-se";
marmelos["foda"] = "fornicação";
marmelos["preto"] = "judeu";
marmelos["preta"] = "judia";
marmelos["negra"] = "teutã";
marmelos["negro"] = "teutão";
marmelos["4chan"] = "/pinto/";
marmelos["VT"] = "PICA DE BIBA";
marmelos["suicidar"] = "pendurar o saco na parede";
marmelos["me matar"] = "pendurar o saco na parede";
marmelos["suicidio"] = "churrasco no banheiro";
marmelos["suicídio"] = "churrasco no banheiro";
marmelos["mara"] = "kosher";
marmelos["lula"] = "fhc";
marmelos["serra"] = "alckimin";
marmelos["filtro"] = "marmelo";
marmelos["holocausto"] = "festa no apê";
marmelos[" ­"] = "- hahahaha, esquece, eu gosto de chupar pinto -";
marmelos["orkut"] = "FORO DE SÃO PAULO";
marmelos["55chan"] = "orkut";
marmelos["celular"] = "cefhr";
marmelos["desu"] = "~";
marmelos["xd"] = "Xd swastika.gif";
marmelos["sexo casual"] = "DotA com a irmã do Bobby";
marmelos["sexo oral"] = "DotA de Scourge";
marmelos["sexo anal"] = "DotA de Sentinels";
marmelos["sexo"] = "DotA";
marmelos["punho dos brother"] = "FIST FUCKING NA MINHA ";
marmelos["konrad"] = "k";
marmelos["moot"] = "Mutley";
marmelos["lockerz"] = "Herbalife";
marmelos["aviva"] = "Marco Túlio";
marmelos["zoucas"] = "Liliane";
marmelos["underage"] = "criança";
marmelos["sakura"] = "Cipião";
marmelos["xakura"] = "Gaio";
marmelos["sakurinha"] = "Múcio Cévola";
marmelos[" fio "] = " parênquima paliçádico ";

if(nMarmelos == true){
	marmelos["facebook"] = "porta-retrato";
	marmelos["twitter"] = "pássaro";
}

// Essa função precisa ser modificada.
// Quando um post for feito com "NEGRO", a resposta deve ser "TEUTÃO" e não "teutão", como acontece.
// Caso algum anão possa fazer tal modificação, por favor, enviem para o email:
// scorciapinogeorg@gmail.com
// Ou enviem uma mensagem diretamente pelo userscripts.org

function marmelarTexto(texto){
	for (marmelo in marmelos){
		texto = texto.replace(new RegExp(marmelo, "gi"), marmelos[marmelo]);
	}
	return texto;
}


var botao = document.getElementsByTagName("input")[6];

function marmelarPost(){	
	document.getElementsByTagName("textarea")[0].value = marmelarTexto(document.getElementsByTagName("textarea")[0].value);
}


if(mPosts == true){
	botao.addEventListener("click", marmelarPost, true);
}

if(mChan == true){
	document.body.innerHTML = marmelarTexto(document.body.innerHTML);
}









