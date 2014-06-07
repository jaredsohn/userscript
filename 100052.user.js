// ==UserScript==
// @name           WoLogComp
// @namespace      Armata
// @include        http://www.worldoflogs.com/reports/*/details/*
// ==/UserScript==

document.load=main();

function main(){
  var table_ = document.getElementsByTagName('table');
  for (i=0;i<table_.length;i++){
    if (table_[i].className=='spellDetailsTable'){
      table_[i].innerHTML+='<tr><td colspan="29" id="container_ID"><textarea name="comments" cols="400" rows="20" id="textbox" onchange="var table_ = document.getElementsByTagName(\'table\');for (i=0;i<table_.length;i++){if (table_[i].className==\'spellDetailsTable\'){      table_[i].innerHTML+=\'<tr><td>\'+document.getElementById(\'textbox\').value+\'</td></tr>\';document.getElementById(\'textbox\').style.display=\'none\';break;}}">'+table_[i].innerHTML+'</textarea></td></tr>'
      break;
    }
  }
}

//var table_ = document.getElementsByTagName(\'table\');for (i=0;i<table_.length;i++){if (table_[i].className==\'spellDetailsTable\'){      table_[i].innerHTML+=\'<tr><td>\'+document.getElementById(\'textbox\').value+\'</td></tr>\';break;}}