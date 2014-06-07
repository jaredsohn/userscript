// ==UserScript==
// @name           Auto up :)
// @namespace      LeaoZinho
// @description    auto upar os topicos de dica/auto e Fichas
// @include        http://www.orkut.tld/CommMsgs*
// ==/UserScript==
tpcos = ["[TEMP]","[FICHA TÉCNICA]","[OFF]","[ON]"];
tit = document.getElementsByTagName("h1")[0].innerHTML; 
tit2 = false;
uid = document.body.innerHTML.match(/uid=([^"]+)/)[1]; 
tpc = location.href.match(/tid=([^&]+)/)[1]; 
uids = GM_getValue("uids","0").split("|");
nids = GM_getValue("nids","0").split("|"); 
tpcs = GM_getValue("tpcs","0").split("|"); 
msg = "-----ATEN\xc7AO!-----";
msg += "\nSe voc\xea deseja upar\nqualquer t\xf3pico de tuto";
msg += "\nou dica automaticamente clique\nem ok, caso contrario\nclique em cancelar";
msg += "\n-----ATEN\xc7AO!-----";
mens = "[silver]clikei&Upei[/silver][;)]"; //Modifique a mensagem do up aqui

for(d in tpcos){
	if(tit.toUpperCase().indexOf(tpcos[d]) != -1){
		tit2 = true;
	};
};

if(GM_getValue("dia",50) != new Date().getDate()){
	GM_deleteValue("tpcs");
	GM_setValue("dia",new Date().getDate());
};

insere = function(){
	x = document.createElement("script");
	x.innerHTML = "function array_values(arr)\n";
	x.innerHTML += "{\n";
	x.innerHTML += "if (typeof arr == \"object\")\n";
	x.innerHTML += "{\n";
	x.innerHTML += "var str = \"\";\n";
	x.innerHTML += "for (var y in arr)\n";
	x.innerHTML += "str = str.concat(\"&\", y, \"=\", arr[y]);\n";
	x.innerHTML += "return str.substring(1,str.length);\n";
	x.innerHTML += "}\n";
	x.innerHTML += "};\n";
	x.innerHTML += "cmm = location.href.match(/cmm=([^&]+)/)[1];\n";
	x.innerHTML += "tpc = location.href.match(/tid=([^&]+)/)[1];\n";
	x.innerHTML += "sign = escape(JSHDF['Page.signature.raw']);\n";
	x.innerHTML += "post = JSHDF['CGI.POST_TOKEN'];\n";
	x.innerHTML += "var envia = {\n";
	x.innerHTML += "    \"POST_TOKEN\" : post,\n";
	x.innerHTML += "\"signature\" : sign,\n";
	x.innerHTML += "\"subjectText\" : encodeURIComponent(\"\"),\n";
	x.innerHTML += "\"bodyText\" : encodeURIComponent(\""+mens.replace(/(")/g,"\\$1").replace(/\n/g,"\\n");
	x.innerHTML += "\\n[silver]\"+Math.random()+\"[/silver]\"),\n";
	x.innerHTML += "\"Action.submit\" : \"Enviar+dados\"\n";
	x.innerHTML += "};\n";
	x.innerHTML += "x = new XMLHttpRequest;\n";
	x.innerHTML += "x.open(\"POST\",\"CommMsgPost?cmm=\"+cmm+\"&tid=\"+tpc,false);\n";
	x.innerHTML += "x.setRequestHeader(\"Content-type\",\"application/x-www-form-urlencoded; charset=UTF-8\");\n";
	x.innerHTML += "x.send(array_values(envia));";
	document.body.appendChild(x);
};

posta = function(){
	if(tit2){
		tpcs.push(tpc);
		tpcs = tpcs.join("|");
		GM_setValue("tpcs",tpcs);
		insere();
	};
};

lista = function(d,arr){
	for(c in arr){
		if(arr[c] == d){
			return false;
		};
	};
	return true;
};

if(lista(uid,uids) && lista(uid,nids) && tit2){
	if(confirm(msg)){
		uids.push(uid);
		uids = uids.join("|");
		GM_setValue("uids",uids);
		uids = GM_getValue("uids","0").split("|");
	}else{
		nids.push(uid);
		nids = nids.join("|");
		GM_setValue("nids",nids);
		nids = GM_getValue("nids","0").split("|");
	};
};


for(b in tpcs){
	if(tpcs[b] == tpc){
		uid = 1;
	};
};


for(a in uids){
	if(uids[a] == uid){
		posta();
	};
};