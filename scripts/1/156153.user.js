// ==UserScript==
// @name        multiquote FF
// @namespace   http://localhost
// @include     http://www.foros-fiuba.com.ar/viewtopic.php?*
// @version     2
// @description Al seleccionar parte de un post y hacerle click, se agrega la cita al mensaje de respuesta, con nombre de usuario incluido :D
// ==/UserScript==

prepareQuoteSelection = function()  {
  var selection;
	
  //Get the selected stuff
  if(window.getSelection)
    selection = window.getSelection();
  else if(typeof document.selection!="undefined")
    selection = document.selection;

  //Get a the selected content, in a range object
  var range = selection.getRangeAt(0);

  //If the range spans some text, and inside a tag, set its css class.
  if(range && !selection.isCollapsed)
  {
    if(selection.anchorNode.parentNode == selection.focusNode.parentNode)
    {
	//Encuentro el nombre del forero
	node = selection.anchorNode.parentNode;
	while(node.className.indexOf("row") == -1) node = node.parentNode;
	//Bueno, llegamos.
	node.parentNode
	nombres = document.getElementsByClassName("name");
	for (i=0; i< nombres.length; i++){
		if (node.parentNode == nombres[i].parentNode.parentNode)
			break;
	}
	if (i <  nombres.length){
		//encontré el indice
		user_name = nombres[i].textContent;
	}else{
		//no hubo suerte :(
		user_name = "";
	}
      var span = document.createElement('span');
      span.className = 'to_quote';
      range.surroundContents(span);
	  span.setAttribute("data-username", user_name);
	  span.onclick = function(){pasteQuote(this);} //sinceramente, eso del "this" funcionó sin que me diese cuenta :D
    }
  }
}

pasteQuote = function(obj){
	name = obj.getAttribute("data-username");
	document.post.message.value += '[quote="'+name+'"]'+obj.innerHTML+'[/quote]';
	obj.className = "";
	obj.onclick = function(){}
}

pbody = document.getElementsByClassName("postbody");
for(i=0; i< pbody.length; i++) pbody[i].onclick = function(){prepareQuoteSelection();}

