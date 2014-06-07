// ==UserScript==
// @name			RDB-Helper
// @namespace		http://univie.ac.at
// @description		Einige kleine Hilfe iZm der RDB
// @include			http://recherche.rdb.at/action/lookUpDocument*
// @include			http://recherche.rdb.at/action/searchDocument*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version			1.0
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

////////////////////////////////////////
//
// wandelt die ergebnisliste in eine liste mit links um, sodass man die Ergebnisse mit dem Scrollrad öffnen kann
//
////////////////////////////////////////
             
//$('<b>blah</b>').insertBefore('#comboorigplace');


$('.tablerechtdgray').each
(
  function(i,e)
  {
    docid = $(this).find('input').val();
    link=$(this).find('a');
    oncl=link.attr('onclick');
    if(oncl)
    {
      lh=oncl.slice(25,-4);link.removeAttr('onclick').attr('href',lh);
    };
  }
);


////////////////////////////////////////
//
// macht den iframe automatisch groß    
//
////////////////////////////////////////
   
$('<input type="button" id="iframebutton" value="iframe entfernen" />').insertAfter('.h1Corr');   

/*   
$('<input type="button" id="iframebutton" value="iframe entfernen" />&nbsp;<input type="button" id="resizeiframebutton" value="iframe Größe ändern auf:" /><input type="value=" size="4" id="new_size" />').insertAfter('.h1Corr');
*/

$('#iframebutton').click(function() {
			removeiframe();
});

/*
$('#resizeiframebutton').click(function() {
			resizeiframe();
});
*/

var ifr = $('#rdbdoc'); 

/*
$(window).mousemove(function(e){
  $('#new_size').val(e.pageX);   
     
  //alert(e.pageX);
  /*
  var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
  var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
  $("span:first").text("( e.pageX, e.pageY ) : " + pageCoords);
  $("span:last").text("( e.clientX, e.clientY ) : " + clientCoords);
  
});   
*/       

function removeiframe()
{
  // def vars            
  cont = ifr.contents();
  
  // change font style
  cont.find('head').append('<style type="text/css">pre, p {font-family: Verdana}</style>');
  
  // change size of iframe
  ifr.height(cont.find('body').height()+100);
  
  $('#iframebutton').attr('disabled', 'disabled');
  
  
  /*
  //ifrcont = document.getElementById('rdbdoc').contentWindow.document.body.innerHTML;
  ifrcont = $("#rdbdoc").contents().find("body").html();
  $('<div id="cont">'+ifrcont+'</div>').insertBefore('iframe');
  ifr.remove();
  */
}

/*
function resizeiframe()
{
  $('#cont').css('width', $('#new_size').val()+'px');
}
*/

/*
ifr=document.getElementById('rdbdoc').contentWindow.document.body.innerHTML;
ifr=ifr
  .split("\n\n").join('<br%20/><br%20/>')
  .split('%C2%A7%20').join('%C2%A7&nbsp;')
  .split('Abs%20').join('Abs&nbsp;')
  .split('<pre>').join('<p%20style="margin-left:50px;text-align:justify;font-family:Verdana;width:700px;line-height:1.5">')
  .split('<p>').join('<p%20style="margin-left:50px;text-align:justify;font-family:Verdana;width:500px;line-height:1.5">');
document.write(ifr);stop();  

*/