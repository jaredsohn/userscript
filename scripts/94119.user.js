// ==UserScript==
// @name           EasyForm
// @namespace      Tedeschi
// @autor          Danilo Françoso Tedeschi
// @description    Com apenas 1 linha voce maskara, restringi, conferi o formulario, //executa funcoes quando estiver errado, e muito mais/With only a line you mask, restrict, check forms, exec functions when it's filled wrong
// ==/UserScript==

/*
Testado no IE5.5+, Firefox, Chrome, Opera
*/
	if ( !window.Element )//isto é para o IE6 que nao aceita o objeto Element
{
        Element = function(){}

        var __createElement = document.createElement;
        document.createElement = function(tagName)
        {
                var element = __createElement(tagName);
                for(var key in Element.prototype)
                        element[key] = Element.prototype[key];
                return element;
        }

        var __getElementById = document.getElementById
        document.getElementById = function(id)
        {
                var element = __getElementById(id);
                for(var key in Element.prototype)
                        element[key] = Element.prototype[key];
                return element;
        }
}
/*
THIS FUNCTION ONLY RETURN THE TEXT SELECTED
*/
Element.prototype.selection = function(){
	if(window.getSelection)
	return this.value.substring(this.selectionStart,this.selectionEnd);
	else
	return document.selection.createRange().text;
}
	
	/*
	ISSO É PARA DESCOBRIR A CURSOR DO MOUSE NO INPUTTEXT, SE VC NAO INFORMAR NENHUM PARAMETRO ELA IRA RETORNAR A POS-CURSOR,
	SE VC DEFINIR O PRIMEIRO PARAMETRO ELA IRA SETAR O CURSOR NA REFERIDA POS, SE VC INFORMAR TBM 0 SEGUNDO PARAMETRO ELA IRA SELECIONAR O TEXTO DESDE O INICIO DO PARAMETRO1 ATE O PARAMETRO2
	THIS FUNCTION IS TO FIND THE CURSOR POSITION OUT ON THE INPUT ELEMENT, IF YOU DON'T NOTICE NO PARAMETER IT'LL RETURN JUST THE CURSOR POSITIOM,
	IF YOU DIFINE FIRST PARAMETER IT'LL SET THE CURSOR ON THIS, IF YOU ALSO NOTICE THE SECOND PARAMETER IT'LL SELECT THE TEXT BEGINING IN THE PARAMETER 1 AND ENDDING ON THE SECOND PARAMETER
	MADE BY DANILO F. TEDESCHI 20/12/2010
		*/
Element.prototype.cursorPos = function(pos,pos2){//esta é uma funcao para descobrir aonde o user esta com o cursor se nao tiver nenhum paramatro informado, se tiver ele seta o cursor no pos, se pos2 tiver informado ele seleciona do pos ao pos2
	if(this.tagName.toLowerCase()=='input' || this.tagName.toLowerCase()=='textarea'){ 
	if(pos==null)
	if(window.getSelection)
	return this.selectionStart;
	else{//aqui é paro o IE
		var r = document.selection.createRange();
		if(r==null)return 0;
		var range = this.createTextRange();
		var range2 = range.duplicate();
		range.moveToBookmark(r.getBookmark());  
		range2.setEndPoint('EndToStart', range);
		return range2.text.length;  
		}
	else{//se foi informada a variavel pos
		if(pos2==null)pos2=pos;
		if(window.getSelection){//se for mozilla chrome, etc
			this.selectionStart = pos;
			this.selectionEnd = pos2;
			}else{//se for IE
				var c = this.createTextRange();
				parseInt(pos);
				c.collapse(true);//precisa se nao nao da certo
					c.moveStart("character",pos);
					c.moveEnd("character",pos2-pos);
					c.select();
				}
		
		}
	
	}
	
	};
	
	/*
	FIM DAS FUNCOES DE CURSOR 
	*/
	
	
	/*
	|
	|
	|AQUI COMECA A MASKIT
	|
	|
	*/
	//THE CORE OF IT
	
	
		/*
	VERSAO 1.0 BETA
	POR FAVOR EM CASO DE ERRO OU SUGESTOES CONTATO-->danilof.t2@hotmail.com
	IT'S THE CORE OF MASK HERE ARE THE CODE TO SET THE MASK. ENJOY IT!
	MADE BY DANILO F. TEDESCHI 20/12/2010
	*/
Element.prototype.maskIt = function(tipo,funcoes){
	if(/[^9aAdmYxX\W]/.test(tipo))return true;//se dar true é pq tem caracteres invalidos na maskara(tipo)
	
	if(this.tagName.toLowerCase()=='input' || this.tagName.toLowerCase()=='textarea'){ 
	var t=true;
	if(!funcoes) var funcoes={'m':null,'funcao1':null,'funcao2':null};//that's JSON man!!!
	
	var d = funcoes.m ? funcoes.m : null; 
	
	this.regExp = makeregexp(tipo,d);//essa funcao esta logo acima feita por mim tambem
	
	this.tipo = tipo;
	var vBug = false;
	if(/\W/.test(tipo))//testa se existe algum divisor
	
	this.divisors = /\W/.exec(tipo);else{//c nao tiver nenhum o user só quer restrigir o tipo de entrada de dados
		var reg='';
		if(tipo.indexOf('9')!=-1)
		reg="[0-9]";else
		if(tipo.indexOf('a')!=-1)
		reg="[a-z]";else
		if(tipo.indexOf('A')!=-1)
		reg = "[A-Z]";else
		if(tipo.indexOf('x')!=-1)
		reg = "[0-9a-z]";else
		if(tipo.indexOf('X')!=-1)
		reg = "[0-9A-Z]";
		if(d!=null)
		this.divisors = new RegExp(reg,"i");else
		this.divisors = new RegExp(reg);
		t = false;
		
	
	}
	if(!t){
		this.onkeypress = function(e){
			var keynum,keychar;
			e = e||window.event;
			if(window.event){keynum = e.keyCode;}else if(e.which){keynum = e.which;}
			keynum = parseInt(keynum);
			if(keynum!=8 && !isNaN(keynum) && keynum!=37 && keynum!=39 && keynum!=38 && keynum!=40 && keynum!=86 && keynum!=88 && keynum!=67 && keynum!=46)
			keychar = String.fromCharCode(keynum);else return true;//isso é especialmente p/ o firefox que reconhece o backspace no evento keypress é o unico
			
				if(!this.divisors.test(keychar))
				return false;else
				if(this.value.length>=tipo.length){
					var c='';
					if(window.getSelection){
						c = this.value;
						c = c.substring (this.selectionStart,this.selectionEnd);//it works on Firefox and Google Chrome yeap
						}else
						if(document.selection){
							c = document.selection.createRange();
							c = c.text;
							}
					
					if(c.length>0)
					return true;
					return false;}
					return true;
			
			};//fim do !t
	}
	else{//aqui é o else se houver divisor
	
	/*
	AQUI É QUANDO EXISTIR DIVISORES
	*/
	
	this.onkeypress = function(e)
	{		
			if(vBug)return false
			var keynum,keychar;
			e = e||window.event;
			if(window.event){keynum = e.keyCode;}else if(e.which){keynum = e.which;}
			keynum = parseInt(keynum);
			//if(keynum==46) return false;
			if(keynum!=8 && !isNaN(keynum) && keynum!=37 && keynum!=39 && keynum!=38 && keynum!=40 && keynum!=86 && keynum!=88 && keynum!=67 && keynum!=46)
			keychar = String.fromCharCode(keynum);else return true;//isso é especialmente p/ o firefox e pro Opera que reconhece o backspace no evento keypress é o unico    		
				if(/^\W+$/.test(this.value))
				this.value ='';
				
				var leng = this.cursorPos();
				var val='';
				var c=leng;
				
				//aqui é onde o algoritmo coloca os divisores no text
				
				if(this.value.length==0 || /\W/.test(tipo.charAt(leng))){//se for o primeiro char ou o user voltou apagando e esta digitando no lugar de um divisor
				while(/\W/.test(tipo.charAt(c))){
				val+=tipo.charAt(c);c++;
				}
				if(this.value.length+val.length==tipo.length)
				keychar='';
				val = val+keychar;
				var cAux = c;
				if(/\W/.test(tipo.charAt(cAux+1)))
				while(/\W/.test(tipo.charAt(cAux+1))){
				val += tipo.charAt(cAux+1);cAux++;
				}
				
				}
				else if(/\W/.test(tipo.charAt(c+1))){
				while(/\W/.test(tipo.charAt(c+1))){
				val = tipo.charAt(c+1);c++;
				}
				val = keychar+val;
				c= leng;//como ele vai para frente da onde esta o tipo que ele esta digitando tems que retornar o c para o leng
				}
				else
				val = keychar;
				
				var reg = charExp(tipo,this.value,c);//esta FUNCAO ESTA LOGO acima é para descobrir a espressao para um digito especificamente
				
				
				if(d!=null)//maiusculo
				reg = new RegExp(reg,"i");
				else
				reg = new RegExp(reg);
				//alert(reg);
				
				if((!reg.test(keychar)) && keynum!=8){//aqui é senao der match com a exp e o keynum é <> de 8, ou seja, ele nao esta apagando o texto
				
				if(keychar==tipo.charAt(leng))
				if(this.value.charAt(leng+1)!='')//bom se temalguma coisa na frente quer dizer q ele voltou o cursor entao só move it
				this.cursorPos(leng+1);//se o user digitar os divisor da maskara ele move o cursor p/ frente
				
				else
				this.value+=keychar;//else se tiver em branco na frente pode adicionar o keychar
				
				return false;//se caiu aqui tem q retorna false
				}
				var tipoAux = tipo;
						
			
				/*
				AQUI É QUANDO O KRA DIGITAR UM DIGITO FORA DO LUGAR
				*/
				if(this.value.length!=leng){//se o cursr estiver fora do lugar
				
				
				var p1 = this.value.substring(0,leng);
				
				
				if(this.selection()!=''){
					
					var selecionado = this.selection();//isto é uma funcao minha up there
					var p2 = this.value.substring(leng+selecionado.length,this.value.length);//atribui o que esta depois do periodo selecionado
					selecionado = selecionado.replace(/\w/g,'');//deleta todos os caracteres validos que nao sejam divisores
					if(p2=='')selecionado='';//se ele secionar do final p/ dentro entao pode apagar toda a selecao que nao vai dar problema
					p2=selecionado+p2;//junta tudo na p2
					if(p2==''){
					while(/\W/.test(tipo.charAt(leng))){//ele devolve os divisor ao p1
					p1+=tipo.charAt(leng);leng++;}
					if(/\W/.test(tipo.charAt(leng+1)))
					while(/\W/.test(tipo.charAt(leng+1))){
					p2 += tipo.charAt(leng+1);leng++;}
					}
					this.value = p1+keychar+p2;//joga tudo no campo
					//alert(this.value.charAt(leng));
					while(/\W/.test(tipo.charAt(leng+1)))
					leng++;
					this.cursorPos(leng+1);//coloca o cursor na posicao certa, pq com esta operacao naturalmente o cursor iria p/ o final
					return false;//retorna false pois ja colocamos o keychar no campo "manualmente"
					}
					
					
					

				
				var qtD=0;//qtidade divisores
				var qtP=0;//qtidade dentro entre este divisore que esta preenchido
				var qtPa=0;
				var qtdTipo = 0;
				for(var i=0;i<leng;i++)
				if(/\W/.test(this.value.charAt(i))){
				qtD++;qtPa=i+1;} 
				
				while(/\w/.test(this.value.charAt(qtPa))){
				qtP++;qtPa++;}
				
				qtPa=0;
				lengTipo = 0;
				for(i=0;i<tipo.length;i++){
				if(/\W/.test(tipo.charAt(i))){
				qtPa++;
				if(qtPa==qtD){
				lengTipo = i+1;
				break;}
				}
				}
				i=0;
				
				//alert(lengTipo);
				
				while(/\w/.test(tipo.charAt(lengTipo+i))){
				qtdTipo++;
				i++;}
				
				if(/\W/.test(tipo.charAt(leng)) && qtdTipo==qtP){//se estiever digitando no divisor só move o cursor
				this.cursorPos(leng+1);
				return false;}				
				
								
				if(qtdTipo!=qtP)//se eles forem diferentes quer dizer que faltam digitos p/ completar a maskara
				leng--;//ele diminui p/ nao deletar o divisor qdo for fazer o substr
				//alert(qtdTipo+'-'+qtP);
				var p2 = this.value.substring(leng+1,this.value.length);
				
				this.value = p1+keychar+p2;
				
				if(qtdTipo!=qtP)//aqui ele volta ao normal o leng
				leng++;
				if(qtdTipo-qtP<=1)
				while(/\W/.test(tipo.charAt(lengTipo+qtdTipo))){leng++;lengTipo++;}
				//ou seja se ja estiver completa a maskara no input q esta sendo digitado se der 1 é pq so faltava 1 char pra completar ja qe o user digitou nao falta mais
				//leng++;else break;//se nao estiver do nothing
				
				this.cursorPos(leng+1);//posiciona o cursor corretamente!!it's done
				return false;
				}//fim do if se o cursor estiver fora do lugar
				
				if(this.value.length>=tipo.length)
				return false;
				this.value +=val;
				return false;
				
				
				
				};//fim do if que confere se o elemento é um input ou textarea
		}
			//fim da function onkeypress
			/*
			este EVENTO SÓ FOI GERADO PARA CAPTURAR QDO O USER DIGITA BACKSPACE OU DELETE, PQ O EVENTTO KEYPRESS NAO CAPTURA ESTAS TECLAS, MAS SÓ QUEU É MAIS COMPARIVEL E DIFERENCIA MAIUSCULAS DE MINUSCULAS
			*/
this.onkeydown = function(e){
	var keynum;
	var leng = this.cursorPos();
			e = e||window.event;
			if(window.event){keynum = e.keyCode;}else if(e.which){keynum = e.which;}//keychar = String.fromCharCode(keynum);
			var shif;
			if(e.modifiers)
			shif = e.modifiers & Event.SHIFT_MASK;
			else
			shif = e.shiftKey;
			
			if(keynum==192){keychar="'";vBug = true;}else
			if(keynum==190){keychar='.';vBug = true;}else
			if(keynum==53 && shif){
			keychar = '%';
			vBug = true;
			}else
			if(keynum==57 && shif){
			keychar = '(';
			vBug = true;
			}else
			if(keynum==55 && shif){
			keychar = '&';
			vBug = true;
			}else
			vBug = false;
			if(vBug)return false;
			
			
			if(keynum==8 || keynum==46){
				//alert(keynum);
				if(this.value.charAt(leng)=='' && /\W/.test(this.value.charAt(leng-2))){//este if é para apagar os divisores quando o user estiver apagando o campo do final p/ o comeco
				
				leng -=2;
				while(/\W/.test(this.value.charAt(leng))){
				this.value = this.value.substring(0,leng+1);leng--;
				}//fimwhile
				}else{
				
					var selecionado = this.selection();
					if(selecionado!=''){//AQUI É SE ELE DELETAR COM O TEXT SELECIONADO
						if(selecionado.length==this.value.length)this.value='';
					var p1 = this.value.substr(0,leng);
					var pDelet = this.value.substr(leng,selecionado.length);
					var p2 = this.value.substring(leng+selecionado.length,this.value.length);
					if(p2=='')pDelet = '';//se ele estiver selecionando desde o final do texto entao pode deletar tudo que nao vai ter problema
					pDelet = pDelet.replace(/\w/g,'');
					this.value = p1+pDelet+p2;
					this.cursorPos(leng);
					return false;
					}
					if(keynum==46){
					var cont=1;
					while(/\W/.test(this.value.charAt(leng+cont))){
					
					cont++;
					}

					if(this.value.charAt(leng+cont)=='')
					this.value = this.value.substring(0,leng)+this.value.substring(leng+cont+1,this.value.length);

					}
					
					if(keynum==8)var aLeng = leng-1;else var aLeng = leng;//aqui é para posicionar depois do backspace ou delete
					if(/\W/.test(this.value.charAt(aLeng))){//se o user tentar apagar um divisor
					
					if(leng == tipo.length)return true;
					
					if(this.value.charAt(leng+1)=='')
					return true;
					//alert(this.value.charAt(aLeng));
						while(/\W/.test(this.value.charAt(aLeng))){//se ele tentar ele move o cursor até o proximo digito normal
						if(keynum==8)this.cursorPos(aLeng--);else this.cursorPos(++aLeng);}//fim do while
						return false;
					
					}//fim do else
					
										}
			}//fim do if para conferir se o user digitou backspace ou delete
	};
		
	}//aqui o fim do if para saber se é um InputElemnt
		
			
			this.onblur = function(){//no onchange ele confere e aplica a maskara mais no caso do usuario dar um contr+v dentro do campo pois nao ativa o evento keypress, so this is it!
			if(this.value.length>0){
			var funcao1 = funcoes.funcao1;
			var funcao2 = funcoes.funcao2;
 			if(this.checkIt()){
			if(funcao2)
			funcao2(this);
			}
			else 
			if(funcao1)
			funcao1(this);
			}
			};	
		
		
	};//fim do maskIt()
	//here comes 2.o version
	
	/*
	|
	|
	|
	|FIM DA MASKIT AQUI VAI COMECAR A CHECKIT
	|
	|
	|
	*/
	
	
	/*
ESTA FUNCAO É PARA CHECAR COM A EXPRESSAO REGULAR SE O CAMPO ESTA PREENCHIDO CORRETAMENTE, ISTO É PARA O CASO DE O USER COPIAR O VALOR DIRETO P/O CAMPO
*/		
	
Element.prototype.checkIt = function(){
	if(this.tagName.toLowerCase()=='input' || this.tagName.toLowerCase()=='textarea'){
		if(this.regExp){
			
			var maiusc = false;
			if(this.regExp.toString().charAt(this.regExp.toString().length-1)=='i')//descobre se tem o modificador de maiusc ou nao
			maiusc = true;
			
			
			if(this.regExp.test(this.value))
			return true;
			var reg='';
			
			if(this.tipo2){//se exixtir a propriedade tipo2 é pq nao é maskara e sim o testIt
			if(this.tipo2=='user')return false; //aqui é para expressoes definidas pelo user entao nao tem como mexe-las
			var tipo2Aux = this.tipo2.toString();
			tipo2Aux = new RegExp('[^'+tipo2Aux.substring(2,tipo2Aux.length-1),"g");
			this.value = this.value.replace(tipo2Aux,'');
			
			if(this.regExp.test(this.value))
			return true;
			return false;
			
			}
			//este for e pra nao precisar executar o resto do codigo se o user estiver digitando normalmente e sair(blur) do campo
			for(var i=0;i<this.value.length;i++){
			if(/\W/.test(this.tipo.charAt(i)))
			if(this.tipo.charAt(i)!=this.value.charAt(i))
			break;
			
			reg = charExp(this.tipo,this.value,i);
			if(maiusc)
			reg = new RegExp(reg,'i');
			else 		
			reg = new RegExp(reg);
			
			if(!reg.test(this.value.charAt(i)))
			break;
			}
			
			
			if(i==this.value.length)return false;//aqui é se deu tudo ok no for de prevencao acima
			
			
			var text = this.value.replace(/\W/g,'');//aqui eu retiro todos os divisors
			var i2;
			var div = this.tipo.split(/\w/);
			var divAux=new Array();
			var valor='';
			for(i=0;i<div.length;i++)//limpar o array que vem do split
			if(div[i]!='')
			divAux.push(div[i]);
			
			div = divAux;//aqui a var div tem os divisores
			
			
			for(var i=0;i<this.tipo.length;i++){//esse for eu vor percorrer cada caracter
			
			
			if(/\W/.test(this.tipo.charAt(i))){
			valor+=this.tipo.charAt(i);
			i++;
			if(i>=this.tipo.length)
			break;
			}
			if(text=='')break;//se nao sobro mais nada no text ele da o break 
			
			reg = charExp(this.tipo,text,i);//function feita por mim too
			
			if(maiusc)
			reg = new RegExp(reg,'i');
			else 		
			reg = new RegExp(reg);
			i2 = 0;
			do{
			if(reg.test(text.charAt(i2))){//se ele acha um valor compativel na variavel text ele joga pro valor(a text é o que foi digitado no input)
			valor+=text.charAt(i2);
			break;}
			i2++;
			}while(!reg.test(text.charAt(i2-1)) && i2<text.length);//ele continua no loop se o valor atual nao foi conpativel com a reg
			
			
			text = text.substring(i2+1,text.length);//ele corta o que foi achado pra tras, pra fora
			
			
			
			}
			this.value = valor;
			if(this.regExp.test(this.value))
			return true;
			return false;//este return vai acontecer nao por caracteres indevidos mais sim por numero de caracteres menor do que a maskara
			}else return true;
	}
	
	};//fim do checkIt		*/
	
	
	
		function makeregexp(mask,d){
		var r='';
		var rAux='';
		var i2=1;
		var reg='';
		if(mask.indexOf('d')!=-1 && mask.indexOf('m')!=-1 && mask.indexOf('y')!=-1){//aqui se o padrao é de data let's do that!!!
		rAux = ["([012][0-9]|3[01])","(0[0-9]|1[012])","([12][0-9]{3})"];//a primeira expressao é o dia depois o mes depois o ano
		i2='';
		for(var i=0;i<mask.length;i++){
			if(/\w/.test(mask.charAt(i))){
				if(mask.charAt(i)=='d' && i2!='d'){r+=rAux[0];i2='d';}else
				if(mask.charAt(i)=='m' && i2!='m'){r+=rAux[1];i2='m';}else
				if(mask.charAt(i)=='y' && i2!='y'){r+=rAux[2];i2='y';}
				}else{r+= mask.charAt(i).replace(/[\W]/g, '\\$&');}
			}//fim do for
			return new RegExp("^"+r+"$");
			}else{//aqui é se nao for data 
		for(var i=0;i<mask.length;i++){
			if(rAux==mask.charAt(i))
			i2++;else if(r!=''){
				if(i2==1)
				reg+=r;else
				reg+=r+"{"+i2+"}";
				i2=1;
				r='';
				}
				if(mask.charAt(i)=='9')r='[0-9]';else
				if(mask.charAt(i)=='a')r='[a-z]';else
				if(mask.charAt(i)=='A'){r='[A-Z]';}else
				if(mask.charAt(i)=='A' || mask.charAt(i)=='a' && d=='i')r='[a-zA-Z]';
				else
				if(mask.charAt(i)=='x')r='[\w]';else
				r=mask.charAt(i).replace(/[\W]/g, '\\$&');
				
			rAux = mask.charAt(i);
			
		}//fim do for
		if(i2==1)
			reg+=r;else
			reg+=r+"{"+(i2)+"}";
			reg = "^"+reg+"$";
			
			}//fim do else qdo o padrao nao é uma data
			if(d!=null) return new RegExp(reg,'i');//aqui é se existir o anulador de diferenciar maiusc e minusc
			return new RegExp(reg);
			
		}//fim da function makeregexp
		
		//esta funcao é para achar a expressao p/ cada caracter do tipo(maskIt)
		function charExp(tipo,valor,c){
		var reg='';
		var char = tipo.charAt(c);
				if(char=='9')
				reg="[0-9]";else
				if(char=='a')
				reg="[a-z]";else
				if(char=='A')
				reg = "[A-Z]";else
				if(char=='x')
				reg = "[0-9a-z]";else
				if(char=='X')
				reg = "[0-9A-Z]";else
				if(char=='d'){
					if(tipo.charAt(c-1)=='d'){//isso quer dizer que este é o segundo digito do dia
						if(valor.charAt(c-1)=='3')reg ="[01]";
						else reg = "[0-9]";
						}else
						reg = "[0123]";
						
					}//fim do d
					else
				if(char=='m'){
					if(tipo.charAt(c-1)=='m'){
						if(valor.charAt(c-1)=='1')reg="[012]";else
						reg="[0-9]";
						}else
						reg = "[01]";
					}else
					if(tipo.charAt(c)=='y')//no ano esta tudo liberado
					reg="[0-9]";
					return reg;
		
		}
	function checkForm(id,funcao,funcao2){
	var contaErros = 0;
	var formul;
	if(id==null)//isto é para pegar o formulario se o user nao informou nada
	formul = document.getElementsByTagName('form')[0];
	else if(typeof(id)=='object')formul = id;//se o user informar o objeto em si this.form
	else
	formul = document.getElementById(id);
	
		for(var i=0;i<formul.elements.length;i++){
		if(formul.elements[i].type == 'text' || formul.elements[i].type == 'password' || formul.elements[i].tagName.toLowerCase()=='textarea')
			if(!formul.elements[i].checkIt()){
			contaErros++;
			funcao(formul.elements[i]);
			}
			else
			funcao2(formul.elements[i]);
			}
	if(contaErros<1)
	return true;
	return false;
	}
	

	
	
	
	
	
	
	
	
	
	
	//FIM DAS FUNCOES AUXILIARES
	
	/* 
Esta funcao por enquanto tem um padrao definido url
como parametro voce pode colocar uma Expressao regular ou o tipo de dados que voce queira restringir no teste
no segundo parametro opcional vc pode informar como objeto JSON {'prop':'value'} funcao1 qdo estiver errado 
funcao2 certo
min minimo de char
max maximo de char
tipos = int,str
voce pode colocar um - p/ especificar caracteres a mais exe.: int+abcdef este seria um padrao para hexadecimal ou int+str+-/\()
obs.: ele so testa no evento de onchange 
*/

function makeRegTestIt(tipo,min,max){

if(tipo.indexOf('+')!=-1)//pra ver se tem mais de um tipo especificado
var tipos = tipo.split('+');
else
var tipos = [tipo];
var r ='[';//a var r é so o meio da expressao tipo de uma exp ^[0-9]{0,10}$ o r é só [0-9]
for(var i=0; i<tipos.length;i++){//for que percorre o split up there
if(tipos[i]=='int')
r+='0-9';
else
if(tipos[i]=='str')
//r+='a-z\u00C0-\u00ffA-Z';
r+='a-zA-Z\u00C0-\u00FF';
else
if(tipos[i]=='url')
return {'r1':/^http[s]?:\/\/(www.)?([a-zA-Z0-9]+\.)?[a-zA-Z0-9\-]+(.[a-z]{2,3}){1,3}$/,'r2':/[a-zA-Z0-9\-\.\/:]/};//se for url ele ja retorna 
else
r+=tipos[i].replace(/[\W]/g, '\\$&');//se nao for nenhum especificado é pq sao caracteres especiais adicionados

}

r+=']';//termina de montar o r
var r2 = r;// preserva o r na var r2
if(max){//comeca montar o quantificador
if(!min)r+='{0,'+max+'}';
else r+= '{'+min+','+max+'}';
}else
if(min)
r+='{'+min+',}';
else
r+= '+';
return {'r1':new RegExp('^'+r+'$'),'r2':new RegExp(r2)};//retorna um objeto onde o r1 é a expressao em si e o r2 é so o core 


}



Element.prototype.restrictIt = function(tipo,funcoes){
if(this.tagName.toLowerCase()=='input' || this.tagName.toLowerCase()=='textarea'){
 
 if(typeof(tipo)=='function' || typeof(tipo)=='object'){
 r = /.?/;
 this.regExp = tipo;
 this.tipo2 ='user';
 }else{
if(!funcoes) var funcoes={'min':null,'max':null,'funcao1':null,'funcao2':null};//that's JSON man!!!
if(tipo.indexOf('url')!=-1)tipo='url';
this.regExp=makeRegTestIt(tipo,funcoes.min,funcoes.max);
var r = this.regExp.r2;
this.regExp = this.regExp.r1;
this.tipo2 = r;
}
var vBug = false;

this.onkeypress = function(e){
var keynum,keychar;
			if(vBug)return false;
			e = e||window.event;
			if(window.event){keynum = e.keyCode;}else if(e.which){keynum = e.which;}
			keynum = parseInt(keynum);
			if(keynum!=8 && !isNaN(keynum) && keynum!=37 && keynum!=39 && keynum!=38 && keynum!=40 && keynum!=86 && keynum!=88 && keynum!=67 && keynum!=46)
			keychar = String.fromCharCode(keynum);else return true;
			
			//alert(keynum);
		
			if(!r.test(keychar)) return false;
			if(funcoes.max)
			if(this.value.length>=funcoes.max)return false;
};
this.onkeydown = function(e){
	var keynum,keychar;
	e = e||window.event;
			if(window.event){keynum = e.keyCode;}else if(e.which){keynum = e.which;}
			keynum = parseInt(keynum);
			keychar = String.fromCharCode(keynum);
			var shif;
			if(e.modifiers)
			shif = e.modifiers & Event.SHIFT_MASK;
			else
			shif = e.shiftKey;
		
			vBug = false;
			
			
			//alert(keynum);
			if(keynum==192){keychar="'";vBug = true;}
			if(keynum==190){keychar='.';vBug = true;}
			
			if(keynum==53 && shif){
			keychar = '%';
			vBug = true;
			//vetorDigitos = new Array();
			}else
			if(keynum==57 && shif){
			keychar = '(';
			vBug = true;
			//vetorDigitos = new Array();
			}else
			if(keynum==55 && shif){
			keychar = '&';
			vBug = true;
			//vetorDigitos = new Array();
			}
			
			
			///here you have to fix the shift and . charnum bugs, that's no indetfied  by keypress
			//alert(keychar);
			if(vBug){//alert(r);
			if(!r.test(keychar)){vBug = true;return false;}
			if(funcoes.max)
			if(this.value.length>=funcoes.max)return false;	
			vBug = false;
				}
			
			
	
			//if(typeof(keychar)!='undefined')
			//alert(keynum);
	};
this.onfocus = function(){
	
if(tipo=='url' && this.value.length==0)
			this.value = 'http://';
}
this.onblur = function(){
		if(this.value.length>0){
			var funcao1 = funcoes.funcao1;
			var funcao2 = funcoes.funcao2;
 			if(this.checkIt()){
			if(funcao2)
			funcao2(this);
			}
			else 
			if(funcao1)
			funcao1(this);
			
		}
};//fim do onchange


}
};//fim do testIt
