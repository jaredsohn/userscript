// ==UserScript==
// @name           Karachan - Buttony BBcode
// @description    Dodaje buttony z BBcode pod oknem postowania
// @version        1.0
// @namespace      http://userscripts.org/users/324269
// @include        http://www.karachan.org/*
// @include        http://karachan.org/*
// ==/UserScript==

var textBox = document.getElementsByName('message');
var textContainer = document.getElementById('rtContainer');

//BBcode jest dodawany na koncu i na poczatku zaznaczonego tekstu w oknie posta
function SelBB(target, startCode, endCode){
  if('selectionStart' in target){
    if(target.selectionStart != target.selectionEnd){
	   var newText = target.value.substring (0, target.selectionStart) + 
        startCode + target.value.substring  (target.selectionStart, target.selectionEnd) + endCode +
        target.value.substring (target.selectionEnd);
        target.value = newText;
	}else{
	  alert("Zaznaczenie musi obejmować przynajmniej jedną literę!");
	}
  }else{
    alert("Nie zaznaczyłeś żadnego tekstu!");
  }
}

//BBcode jest dodawany w miejscu kursora tekstowego
function simpleWordBB(target, code){
  if('selectionStart' in target){
    if(target.selectionStart == target.selectionEnd){
	  var newText = target.value.substring(0, target.selectionStart) + code + target.value.substring(target.selectionEnd);
	  target.value = newText;
	}
  }
}


//inb4 po chuj tak zrobiles, da sie szybciej - chce miec to ladnie poukladane
textContainer.innerHTML = document.getElementById('rtContainer').innerHTML + "<br /><input type='button' value='[ b ]' onclick='SelBB(document.getElementsByName("+"\"message\""+"), \"[b]\", \"[/b]\")' />";
textContainer.innerHTML = document.getElementById('rtContainer').innerHTML + "<input type='button' value='[ i ]' onclick='SelBB(document.getElementsByName("+"\"message\""+"), \"[i]\", \"[/i]\")' />";
textContainer.innerHTML = document.getElementById('rtContainer').innerHTML + "<input type='button' value='[ u ]' onclick='SelBB(document.getElementsByName("+"\"message\""+"), \"[u]\", \"[/u]\")' />";
textContainer.innerHTML = document.getElementById('rtContainer').innerHTML + "<input type='button' value='[ s ]' onclick='SelBB(document.getElementsByName("+"\"message\""+"), \"[s]\", \"[/s]\")' />";
textContainer.innerHTML = document.getElementById('rtContainer').innerHTML + "<input type='button' value='[ spoiler ]' onclick='SelBB(document.getElementsByName("+"\"message\""+"), \"[spoiler]\", \"[/spoiler]\")' />";