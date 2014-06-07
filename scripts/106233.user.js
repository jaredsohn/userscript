// ==UserScript==
// @name           D2L-AddParticipants
// @namespace      Trevor Pemberton
// @description    Adds additional controls to add participant search. Uses jQuery1.3.2
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// @include        https://courselink.uoguelph.ca/d2l/lms/classlist/admin/participants/participants_add_existing.d2l*
      
// ==/UserScript==

//Role ids:
//72 - instruct build grade
//118 - instruct facilitator
//87 - TA build grade
//86 - TA grade

$("input[name='gridUsers_cb']").each(
  function (){
    id = $(this).attr('value');
    id2 = id.substring(id.search(/_/)+1,id.length)   
    $(this).before("<a href='#' class='magicClick' value='"+id2+"_72'>IBG</a>&nbsp;");
    $(this).before("<a href='#' class='magicClick' value='"+id2+"_118'>IF</a>&nbsp;");
    $(this).before("<a href='#' class='magicClick' value='"+id2+"_87'>TABG</a>&nbsp;");
    $(this).before("<a href='#' class='magicClick' value='"+id2+"_86'>TAG</a>&nbsp;");
  }
)  

$("a.magicClick").click( function(event){
  event.preventDefault();
  idSrc = $(this).attr('value');
  idVal = idSrc.substring(0, idSrc.search(/_/));
  idRole = idSrc.substring(idSrc.search(/_/)+1, idSrc.length);
  $("select[name='role"+idVal+"']").val(idRole); //72 is role id for Instruct build grade
  $("select[name='section"+idVal+"'] option:first").next().attr('selected','selected'); //default to first section
  userCheckBox = $("input[name='gridUsers_cb']").filter("input[value*='"+idVal+"']"); 
  if ( userCheckBox.is(":checked") == false ){
      userCheckBox.click(); //throws an error because of dom security...but still works
  }
  
})