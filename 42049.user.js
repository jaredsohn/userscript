// ==UserScript==
// @name           KingsAge Fast Link
// @version        0.4
// @description    Este es un script en el que tu puedes agregar links hacia sitios diferentes, se guardan en un menú arriba.
// @author         Sora101, for the KingsAge system by Kyler
// @e-mail         evilteam@techis.org
// @include        http://s*.kingsage.es/game.php*
// ==/UserScript==

<HTML>
 <HEAD>
 </HEAD>
 <BODY>
  <SCRIPT language="Javascript" type="text/javascript">

   // Este genial Script fue desarrollado por Tukzone, SirMatrix y Unknow, 
   // todos usuarios del Foro.. Gracias a ellos por su colaboración

  function storeCaret(text) { 
   if (text.createTextRange) {
    text.caretPos = document.selection.createRange().duplicate();
   }
  }

  function meter(text) {
   var postopic = document.PostTopic.Message;
   if (postopic.createTextRange && postopic.caretPos) {      
    var caretPos = postopic.caretPos;      
    caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? 

text + ' ' : text;
   }
   else postopic.value += text;
   postopic.focus(caretPos)
  }

  function codigo(accion) {
   switch(accion) {
    case "url":
     url = prompt("URL de el Enlace", "http://");
     if(url) {
      url="[ a]"+url+"[ /a]";
      meter(url);
     }
     break;
    case "bold":
     negras = prompt("Texto en Negritas", "");
     if(negras) {
      negras="[ b]"+negras+"[ /b]";
      meter(negras);
     }
     break;
    case "italics":
     italics = prompt("Texto en Italicas", "");
     if(italics) {
      italics="[ i]"+italics+"[ /i]";
      meter(italics);
     }
     break;
    case "code":
     code="[ code]  [ /code]";
     meter(code);
     break;
    case "quote":
     quote="[ quote]  [ /quote]";
     meter(quote);
     break;
    default:
     meter(accion);
     break;
   }
  }

  function textCounter(field, countfield, maxlimit) {
   if (field.value.length > maxlimit)
    field.value = field.value.substring(0, maxlimit);
   else 
    countfield.value = maxlimit - field.value.length;
  }
 </script>
 <form name="PostTopic">
  Nombre de usuario:
  <INPUT TYPE="text" NAME="UserName" SIZE="12" MAXLENGTH="25" 

VALUE='Kaopectate'> 
  Password:
  <input maxLength="13" name="Password" size="12" type="password" 

VALUE='**********'>
  Mensaje:
  <textarea 

onKeyDown="textCounter(this.form.Message,this.form.remLen,2000);" 

onKeyUp="javascript:storeCaret(this); 

textCounter(this.form.Message,this.form.remLen,2000);" name="Message" 

onchange="javascript:storeCaret(this);" 

onclick="javascript:storeCaret(this);" rows="10" wrap="VIRTUAL" cols="45">
  </textarea>
  <a href="javascript:codigo('url')">Enlace</a> 
  <a href="javascript:codigo('bold')">negrita</a>
  <a href="javascript:codigo('italics')">italica</a> 
  <a href="javascript:codigo('code')">codigo</a>
  <a href="javascript:codigo('quote')">citar</a>
  Tiene
  <input readonly type=text name=remLen size=5 maxlength=3 value="2000">
  caracteres para su mensaje.
 </form>
</BODY>
</HTML>  