// ==UserScript==
// @name           Orkut Autoup
// @namespace      Autoup
// @include        http://*.orkut.*/CommTopics?*
// @include        http://*.orkut.*/CommMsgs?*
// @include        http://www.orkut.com.br/Main#CommTopics?
// @author         
// @profile        
// ==/UserScript==

function attTpc(tpc){
	GM_setValue("topicos",String(tpc));
}

if( !GM_getValue("topicos") )
	attTpc("");

function getTopicos(str){
	tpc = GM_getValue("topicos").split(",");

	if( str )
		return String(tpc);
	else
		return tpc
}

tid = location.href.match(/tid=(\d+)/);
if( tid )tid = tid[1];

function criaBotao(valor,func,col){
	q = document.createElement("a");
	q.className = "btn";
	q.addEventListener("click",func,false);
	q.innerHTML = valor;
	q.href = "javascript:;";

	s = document.createElement("span");
	s.className = "grabtn";

	p = document.createElement("span")
	p.className = "btnboxr";
	p.innerHTML = "<img alt=\"0\" src=\"http://img1.orkut.com/img/b.gif\" height=\"0\" width=\"5\">";

	eval(col)
}

function Up(c,m,tpc,cs){
	if( document.getElementById("captcha") )	
		document.getElementById("log").removeChild(document.getElementById("captcha"));	
	to = encodeURIComponent(unsafeWindow.JSHDF["CGI.POST_TOKEN"]);
	si = encodeURIComponent(unsafeWindow.JSHDF["Page.signature.raw"]);
	r = new XMLHttpRequest;
	r.open("POST","/CommMsgPost?cmm="+c+"&tid="+tpc,true);	
	r.setRequestHeader("Content-type","application/x-www-form-urlencoded");	
	r.onreadystatechange = function(){
		if( r.readyState == 4 ){	
			if(r.status == 200){	
				if( r.responseText.match("CaptchaImage") ){	
					trataCaptcha();	
				}else if( r.responseText.match("impedido") ){	
					document.getElementById("log").innerHTML += "<font color=\"white\">VOCE CAIU NO FILTRO! :(</font>";	
				}else{
					titulo_topico = r.responseText.match(/<h1>([^<]+)/)[1];	

					if( titulo_topico == "Novo tópico" )
						document.getElementById("log").innerHTML += "<b><font color=\"white\">ERRO: O TÓPICO \""+getTopicos()[x]+"\" NÃO EXISTE! :(</font></b><br />";
					else
						document.getElementById("log").innerHTML += "<b>Topico: \""+titulo_topico+"\" - <font color=\"gray\">Post enviado com sucesso!</font></b><br />";
					

					if( x<getTopicos().length-1 ){	
						x++;
					}else{	
						x = 0;	
						document.getElementById("log").innerHTML += "<b><font color=\"silver\">Todos os topicos foram upados, Reiniciando!</font></b><br /><br />"	
					};

					s = int*60;
					contar = function(){
						if(s != 0){	
							document.getElementById("until").innerHTML = --s;	
							setTimeout(function(){contar()},1000)
						}else{
							Up(cmm,msg,getTopicos()[x],"")
						}
					};
					contar()	
				}	
			}else{
				alert(r.status)
			}
		}
	};
	r.send("POST_TOKEN="+to+"&signature="+si+"&cs="+cs+"&subjectText=&bodyText="+escape(m)+" \n[silver]+[/silver]&Action.submit")	
}

function trataCaptcha(){
	i = document.createElement("img");	
	i.src = "/CaptchaImage?xid="+Math.random();	
	t = document.createElement("input");	
	t.type = "text";	
	t.id="cs";	
	b = document.createElement("input");	
	b.type = "button";	
	b.value = "Enviar!";	
	b.addEventListener("click",function(){
		if(document.getElementById("cs").value == ""){
			alert("Digite o captcha para continuar.")
		}else{
			Up(cmm,msg,getTopicos()[x],document.getElementById("cs").value)
		}
	},false);
	captcha = document.createElement("div");	
	captcha.id="captcha";	
	with(captcha.style){	
		border = "1px solid #4b4949";	
		width = "200px";	
		height = "130px";	
		textAlign = "center";	
		position = "absolute";	
		top = "10px";	
		left = "10px";	
		align = "center";	
		backgroundColor = "white"	
	};	
	with(captcha){	
		appendChild(i);	
		innerHTML += "<br /><br />";	
		appendChild(t);	
		appendChild(b)	
	};
	document.getElementById("log").appendChild(captcha)	
}

function executar(){
	cmm = location.href.match(/cmm=(\d+)/)[1];
	msg = prompt("Mensagem do Up: ","[B][GREEN]UUUUU[/b]");
	int = prompt("Intervalo entre um post e outro: ","0");	
	x = 0;

	if( msg != null && int!=null && msg != "" && int != "" && int.match(/^\d+$/) ){	
		d = document.createElement("div");	
		d.id = "log";	
		with(d.style){	
			border = "2px solid #4b4949";
			backgroundColor = "#333333";
			width = "400px";
			height = "300px";
			position = "fixed";
			left = "50%";
			top = "50%";
			textAlign = "center";
			paddingTop = "30px";
			marginTop = "-175px";
			marginLeft = "-200px";
			overflow = "scroll"
		};
		document.body.appendChild(d);

		u = document.createElement("div");	
		u.id = "until";
		with(u.style){
			textAlign = "center";
			backgroundColor = "#333333";
			border = "2px solid #4b4949";
			borderBottom = "none";
			position = "fixed";
			width = "50px";
			height = "15px";
			top = "50%";
			left = "50%";
			marginTop = "-209px";	
			marginLeft = "150px"
		};

		h = document.createElement("div");
		h.id = "cabecalho";
		with(h.style){
			textAlign = "center";
			border = "2px solid #4b4949";
			borderBottom = "none";
			backgroundColor = "##333333";
			width = "400px";
			height = "20px";
			position = "fixed";
			marginTop = "-50px";
			marginLeft = "-2px";
			borderBottom = "none"
		};
		h.innerHTML = "Log de Posts";
		
		document.getElementById("log").appendChild(h);
		document.getElementById("log").appendChild(u);
		Up(cmm,msg,getTopicos()[x],'')
	}else{	
		alert("Erro: Você deve preencher os campos corretamente!")
	}
}

function removerautoup(){
	topicos = getTopicos();
	for(var v in topicos){
		if(topicos[v] == tid){
			topicos.splice(v,1);
			attTpc(topicos);
			trocaBotao("add autoup",removerautoup,addautoup)
		}
	}
}

function addautoup(){
	topicos = getTopicos();
	if(topicos[0] == "")
		topicos.splice(0,1);

	topicos.push(tid);
	attTpc(topicos);
	trocaBotao("remover autoup",addautoup,removerautoup);
}

function edit(){
	a = prompt("Insira as tids dos tópicos separadas por vírgulas.\n\nEx:\n5486994177453273761,5483774944695010481",getTopicos());
	if( a != null ){
		if( a.match(/^[0-9,]*$/) )
			attTpc(a);
		else
			alert("Erro: Sintaxe errada.")
	}
}

function trocaBotao(newinner,from,to){
	z = document.getElementsByClassName("rf")[2].childNodes[document.getElementsByClassName("rf")[2].childNodes.length-2].firstChild;
	z.innerHTML = newinner;
	z.removeEventListener("click",from,false);
	z.addEventListener("click",to,false)
}

if(location.href.match("CommTopics")){
	criaBotao("autoup",executar,"document.getElementsByClassName('parabtns lf')[0].appendChild(s);document.getElementsByClassName('grabtn')[6].appendChild(q);document.getElementsByClassName('parabtns lf')[0].appendChild(p)")
	criaBotao("edit tids",edit,"document.getElementsByClassName('parabtns lf')[0].appendChild(s);document.getElementsByClassName('grabtn')[7].appendChild(q);document.getElementsByClassName('parabtns lf')[0].appendChild(p)")
}else{
	where = "document.getElementsByClassName('rf')[2].appendChild(s);document.getElementsByClassName('grabtn')[document.getElementsByClassName('grabtn').length-2].appendChild(q);document.getElementsByClassName('rf')[2].appendChild(p)";
	if(getTopicos(1).match(tid)){
		criaBotao("",removerautoup,where)
	}else{
		criaBotao("",addautoup,where)
	}
}