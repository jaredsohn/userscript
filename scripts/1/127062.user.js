// ==UserScript==
// @name           Teste feio    
// @description    aprendizado]
// @namespace      http://userscripts.org/scripts/show/127062
// @include        http://board.br.ikariam.com/user/*-*/
// ==/UserScript==
// variáveis e algumas funções.

lang = document.getElementsByTagName('html')[0].getAttribute('xml:lang');
var div = document.getElementById("main");
var html="";
var text_area=document.createElement('textarea');
div.appendChild(text_area);

// Área de texto


var text_area2=document.getElementsByTagName("textarea")[0];
text_area2.readOnly=true;
text_area2.rows=10;
//ipt=document.createElement('input');
//div.appendChild(ipt);



//////////////////// Caixa de texto - fim

// Variáveis

var Tags1=document.getElementsByTagName("li");
b = Tags1.length;
countcontainer = new Number(0);
countcontainer2 = new Number(0);
countcontainer3 = new Number(0);
//varrendo a lista 'li'


for (i=0; i<Tags1.length; i++) {
countcontainer++;

     if (Tags1[i].className=="container-1"){ 
     
     countcontainer2= countcontainer2 +1;

//     a_check = Tags1[i].getElementsByTagName("a")[0].label;

// html2 = a_check + "\n";

// text_area2.value=html2;


     }  // Fechando if


     else if (Tags1[i].className=="container-2"){

      countcontainer3= countcontainer3 +1;


     
     }  // Fechando if
}// Fechando for



// email = Tags[mailto].getElementsByTagName("a")[0].span;/


// Gerando conteúdo da caixa


html = countcontainer+ "\n" + b + "\n" + countcontainer2 + "\n" + countcontainer3 + "\n" +

"[b]Link do Perfil - Perfil 1:[/b]" + "\n\n"+   //variavel perfil +

"[b]Nome de usuário no Fórum:[/b]"+ "\n" +            //variavel nick +
"[b]Email Cadastrado no Fórum:[/b]"+ "\n" +           //variavel e-mail +
"[b]E-mail MSN:[/b]"+ "\n\n" +                        //variavel msn +

"[b]Data de Registro no Fórum:[/b]"+ "\n"+            //variavel Registro +
"[b]Data de Último Acesso no Fórum:[/b]"+ "\n\n"+     //variavel ultimo acesso +

"[spoiler=Informações Pessoais]"+"[/spoiler]"+ "\n\n"      //variavel info +

// Avatar >>> li id= "userCardAvatar"
// Assinatura

;



text_area2.value=html;