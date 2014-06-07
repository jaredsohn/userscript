// ==UserScript==
// @name        textInserter
// @namespace   //
// @include     *
// @version     1
// @run-at      document-start
// ==/UserScript==
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

var commands = {};

function insertText(toInsert)
{
  var box = document.activeElement;
  var selectStart = box.selectionStart;
  var selectEnd = box.selectionEnd;
  var preText = "";
  var postText = "";
  var innerText = "";
  var allText = box.value.split("");
  for(var i = 0; i < selectStart; i++)
  {
    preText = preText + allText[i];
  }
  for(var i = selectStart; i < selectEnd; i++)
  {
    innerText = innerText + allText[i];
  }
  for(var i = selectEnd; i < allText.length; i++)
  {
    postText = postText + allText[i];
  }
  if(toInsert.indexOf("%%") > -1)
  {
    toInsert = toInsert.replace("%%", innerText);
  }
  box.value = preText + toInsert + postText;
}

function add(newCom, newStr)
{
  commands[newCom + ""] = newStr;
}

function execute(com)
{
  insertText(commands[com]);
}

function menu()
{ 
  for(var com in commands)
  {
    GM_registerMenuCommand(com, 
      function(com){return function(){
        execute(com)
      }}(com)) 
  }
  GM_registerMenuCommand("Create new message", function(){createNew()});
}

function createNew()
{
  var inBox = document.createElement('div');
  inBox.setAttribute('id', 'newBox');
  inBox.innerHTML = '<span><label>Short Description</label><input type="text" id="desc"></input></span>'+
    '<span><label>Text to insert. use %% as a placeholder for highlighted text</label><textarea id="cont"></textarea></span>' +
    '<span class="buttonBox"><button id="go">Save</button><button id="stop">Cancel</button></span><span style="clear:both"></span>';
  var boxStyle = document.createElement('style');
  boxStyle.setAttribute('id', 'crStyle');
  boxStyle.innerHTML = '#newBox {height: 200px; width: 600px; background: #ccc; position:fixed; top: 50%; margin-left: -300px; left: 50%; margin-top: -100px;  box-shadow: 1px 1px 1px #000; padding: 10px; border-radius: 5px; border: 1px solid #555;z-index: 999;}'+
  '#newBox label{width: 100px; float:left;}'+
  '#newBox span{margin-bottom: 30px;float:left;width: 100%;}' +
  '#newBox input, #newBox textarea {width: 400px; margin-left: 10px}'+
  '#newBox .buttonBox{ text-align: center;}'+
  '#newBox textarea{height: 100px;}';
    
    document.body.appendChild(inBox);
    document.body.appendChild(boxStyle);

    document.getElementById('stop').onclick = function(){ 
      document.body.removeChild(document.getElementById('newBox'));
      document.body.removeChild(document.getElementById('crStyle'));  
    };
    
    document.getElementById('go').onclick = function(){
      var newDesc = document.getElementById('desc').value;
      var newCont = document.getElementById('cont').value;

      addMenuItem(newDesc, newCont);
 
      document.body.removeChild(document.getElementById('newBox'));
      document.body.removeChild(document.getElementById('crStyle'));
      }
}

function addMenuItem(desc, cont)
{ 
  commands[desc] = cont;
    GM_registerMenuCommand(desc, 
      function(desc){return function(){
        execute(desc)
      }}(desc))
      saveCommands();
}

function saveCommands()
{
  GM_setValue('commands', JSON.stringify(commands));
}


function init(){
  if(GM_getValue('commands') && GM_getValue('commands').length > 0)
  {
    commands = JSON.parse(GM_getValue('commands'));
  } else {commands = {};}
}

init();
menu();

