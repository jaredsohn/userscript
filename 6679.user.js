// ==UserScript==
// @name           Blog Annotations
// @namespace      http://lastword.blogspot.com
// @description    Saves little snippets/notes/pointers associated with a post, which can be viewed whenever one needs to
// @include        *blogger.com/post-edit.g*

// ==/UserScript==

var tit;

function $()
{
  for( var i = 0, node; i < arguments.length; i++ )
    if( node = document.getElementById( arguments[i] ) )
      return node;
}

function title(){
	tit = $('f-title').value;
}

title();

function return_data(){
	var back = GM_getValue(tit);
        if(back)
		$('annot').value = back;
	else
		$('annot').value = 'No notes yet!';
}

function save(){
	var text = $('annot').value;
	GM_setValue(tit, text);
}

var note = document.createElement('textarea');
note.id="annot";
note.setAttribute('rows','10');
note.setAttribute('style','font-family:"Tahoma"; font-size:8pt; border:1px solid gray; padding:1em; width:20em; position:fixed; right:2em; top: 10%; background-color:lightyellow');
note.innerHTML="Notes";
$('stuffform').appendChild(note);

window.addEventListener('load',function(){$('f-title').addEventListener('keyup',title,true);},false);
window.addEventListener('load',function(){$('annot').addEventListener('keyup',save,true);},false);
window.addEventListener('load',return_data, false);