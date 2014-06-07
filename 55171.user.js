// ==UserScript==
// @name           filtro_commentarios_blogger
// @namespace      http://userscripts.org
// @description    Filtro de comentÃ¡rios no Blogger
// @include        http://ktreta.blogspot.pt/*
// @author         Ludwig Krippahl
// ==/UserScript==
// This script is public domain

// Changes
// Minor change on 13/9/2009 to work with embedded comments pages.
// Major update on 14/4/2012 to work with new blogger comments. Many thanks to JC for the code.
// Minor update on 16/4/2012, adding the option to remove comments instead of replacing the text

// Para usar em todas as paginas de comentarios do Blogger deve substituir o include por
// To use in all Blogger pages replace the include value with
// http://*.blogspot.*

// Variaveis com as definicoes do script
// Settings variables

// Comentadores a substituir. Para varios nomes deve ficar:
// (Commenters to replace; indicate the commenter's names)
// var Replace = ['nome 1','nome 2','nome 3'];

var Replace = ['perspectiva','Bernard'];

// Texto a substituir nos comentários destes comentadores.
// Text to replace in these commenters' comments.

var ReplaceText='bla bla bla';  

// Comentários a remover; lista dos nomes dos comentadores.
// (Comments to remove; commenters' names.
// var Remove = ['nome 1','nome 2','nome 3'];
// nota: os comentários removidos desaparecem por completo, incluindo o nome do comentador.
// note: removed comments disappear completely, including the commenter's name.

var Remove = [];

// O script comeca aqui:

window.addEventListener("load", CheckElements, false);

function IsToBeFiltered(Text, Names){   
    var Found = false;	
    for (var i=0; i<Names.length; i++) {
      if (Text.indexOf(Names[i])!=-1) {
        Found = true;
        break;
        }
    }
    return Found;    
}

function CheckElements() {    
    var holder = document.getElementById( 'comment-holder' );    
    if( !holder ) return false;
    var cites = holder.getElementsByTagName( 'cite' );
    for( var i = cites.length - 1; i >= 0; --i ) {
      var cite = cites[ i ];      
      if (IsToBeFiltered(cite.childNodes[0].childNodes[0].nodeValue, Replace)) {
        var comment = cite.parentNode.parentNode;
        var contents = comment.getElementsByClassName('comment-content');
        contents[0].innerHTML=ReplaceText;        
      }	 
      if (IsToBeFiltered(cite.childNodes[0].childNodes[0].nodeValue, Remove)) {
        var comment = cite.parentNode.parentNode.parentNode;
        comment.parentNode.removeChild(comment);        
      }	 
    }
}	
