// ==UserScript==
// @name          G-contacts sorter
// @namespace     g-sorter 
// @description   sorting google contacts by family (last) name (Only cyrilic)
// @include       http://www.google.com/contacts
// @exclude       
// ==/UserScript==

window.setBut = function(){
  sep = document.createElement('span');
  sep.innerHTML = ' | '
  sortBut = document.createElement('a');
  sortBut.href = '#';
  sortBut.className = 'cmgr-link';
  sortBut.innerHTML = 'Sort by Last Name';
  sortBut.addEventListener('click', function(){sortFunc();return false;}, true);
  window.frames[0].document.getElementById('Node36').appendChild(sep);
  window.frames[0].document.getElementById('Node36').appendChild(sortBut);
}
var namesArr = new Array();
window.sortFunc = function(){
  var container = window.frames[0].document.getElementById('manager-contact-list').childNodes[0];
  var namesEl = container.getElementsByClassName('row');
  i = 0;
  if(!namesArr[0]){
    while(i < namesEl.length){
      fullName = namesEl[i].childNodes[1].innerHTML;
      if(/^\s*[А-Я][а-я]{1,}/i.test(fullName) && fullName.indexOf(' ', 1) != -1){
        fName = fullName.slice(fullName.indexOf(' ', 1));
        name = fullName.slice(0, fullName.indexOf(' ', 1));
        //console.log()
        if(/^\s[А-Я][а-я]{3,}/.test(fName))
          namesEl[i].childNodes[1].innerHTML = fName+' '+name;
      }
      var newName = namesEl[i].childNodes[1].innerHTML;
      namesArr[i] = {name:newName,divEl:namesEl[i]};
      i++;
    }
    function compareNames(a, b) {
      var nameA = a.name.toLowerCase( );
      var nameB = b.name.toLowerCase( );
      if (nameA < nameB) {return -1}
      if (nameA > nameB) {return 1}
      return 0;
    }
    
    namesArr.sort(compareNames);
  
  }
  
  container.innerHTML = '';
 
  i = 0;
  while(i < namesArr.length){
    for(info in namesArr[i]){
      container.appendChild(namesArr[i].divEl);
    }
    i++;
  }
  i = 0;
}
window.setTimeout(sortFunc, 4000);
window.setTimeout(setBut, 4000);