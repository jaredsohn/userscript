
// ==UserScript==
// @name           UpUp.us Auto Choice
// @namespace      http://kol.upup.us/scripts/
// @description    Choose Stuff Automatically
// @include        http://*kingdomofloathing.com/choice.php*
// @include        http://*kingdomofloathing.com/account.php*
// ==/UserScript==

var playerName,advNumber,advName,choices,prefContent;
var radios=new Array();
var openEventListeners=new Array();
addEventListener(window, 'unload', destroyEventListeners, false);

function getPlayerName(callback) {
 if(unsafeWindow.top.playerName == undefined) {
  if(top.frames[1]&&top.frames[1].document&& (bolds=top.frames[1].document.getElementsByTagName('b'))) {
   if(bolds[0]) {
    playerName = bolds[0].textContent.toLowerCase();
    unsafeWindow.top.playerName=playerName;
      if(typeof callback == "function") {
     callback();
    }
   } else {
    GM_get('/charpane.php',parseName);
   }
  } else {
   GM_get('/charpane.php',parseName);
  }
 } else {
  playerName = unsafeWindow.top.playerName;
   if(typeof callback == "function") {
   callback();
  }
 }
 function parseName(txt) {
  playerName = /<a target=mainpane href="charsheet.php">(?:<b>)?([0-9a-zA-Z_]+)(?:<\/b>)?<\/a>/.exec(txt)[1].toLowerCase();
  unsafeWindow.top.playerName = playerName;
  if(typeof callback == "function") {
   callback();
  }
 }
}

function GM_get(page, callback)
{
 GM_xmlhttpRequest({
method: 'GET',
url: page,
onload:function(details) {
if( typeof callback=='function' ){
callback(details.responseText);
}
}
});
}

function sortByName(a,b) {
 var x = a.tempname;
 var y = b.tempname;
 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function accountItem(data) {
 var string = ' ('+((data.always)?'always':data.numLeft+' times')+')';
 var link = elc('a',{target:'_blank',href:'http://kol.coldfront.net/thekolwiki/index.php/'+escape(data.name.replace(/ /g,'_'))},data.name);
 var deleteButton = elc('span',{title:'Delete',style:{marginLeft:'.5em',cursor:'pointer',textDecoration:'underline'}},'X');
 var div = elc('div',null,[link,string,deleteButton]);
 addEventListener(deleteButton,'click',deleteItem,false);
 return div;
 function deleteItem() {
  if(!confirm('Are you sure you want to delete this item?'));
  div.parentNode.removeChild(div);
  var choices=eval(GM_getValue('choices_'+playerName,'({})'));
  delete choices[data.id];
  GM_setValue('choices_'+playerName, choices.toSource());
 }
}

function accountGo() {

 buildPrefs();
 return;
 
// prefContent = elc('div',{style:{margin:'0 auto',display:'table-cell',overflowY:'auto',overflowX:'hidden',maxHeight:'500px',textAlign:'left',lineHeight:'2em',padding:'5px'}});
// choices=eval(GM_getValue('choices_'+playerName,'({})'));
// 
// var choiceArray=new Array();
// for(a in choices) {
//  var temp=choices[a];
//  temp.id=a;
//  temp.tempname=temp.name.toLowerCase().replace(/^(a|an|the) /,'');
//  choiceArray.push(temp);
// }
// choiceArray.sort(sortByName);
// 
// for(var i=0,l=choiceArray.length;i<l;i++) {
//  var thisChoice=choiceArray[i];
//  var string = thisChoice.name + ' ('+((thisChoice.always)?'always':thisChoice.numLeft+' times')+')';
//  //thisChoice.name)+' ('+((thisChoice.always)?'Always':thisChoice.numLeft+' advs')+')'
//  var item = new accountItem(thisChoice);
//  prefContent.appendChild(item);
// }
// if(choiceArray.length) {
//  var clearAllButton = elc('input',{type:'button',className:'button',value:'Remove All'});
//  
//  addEventListener(clearAllButton,'click',clearAll,false);
//  prefContent.appendChild(clearAllButton);
// } else {
//  prefContent.appendChild(elc('span',null,'No Saved Choices'));
// }
// 
// var accountBlock = elc('div',{style:{border:'1px solid blue',width:'95%'}},[
//  elc('div',{style:{backgroundColor:'blue',color:'white',fontWeight:'bold',textAlignment:'center',padding:'5px'}},'Auto Choice'),
//  prefContent
// ]);
// 
// // var tgt = document.getElementsByTagName('center')[2];
// var tgt = document.getElementById("ro"); // rollover clock
// // if(tgt.lastChild.textContent.indexOf("This account will") != 0)tgt = document.getElementsByTagName('center')[3];
// tgt.parentNode.insertBefore(accountBlock,tgt);
}

// --------------------------------------------------------------

function buildPrefs()
{
    if (!document.querySelector('#privacy')) return;
    var scriptID = 'OTT_AC';
    var scriptName = 'AutoChoice';
    if (!document.querySelector('#scripts'))
    {
        //scripts tab is not built, do it here
        var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
        scripts.id = 'scripts';
        var a = scripts.appendChild(document.createElement('a'));
        a.href = '#';
        var img = a.appendChild(document.createElement('img'));
        img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
        img.align = 'absmiddle';
        img.border = '0';
        img.style.paddingRight = '10px';
        a.appendChild(document.createTextNode('Scripts'));
        a.addEventListener('click', function (e)
        {
            //make our new tab active when clicked, clear out the #guts div and add our settings to it
            e.stopPropagation();
            document.querySelector('.active').className = '';
            document.querySelector('#scripts').className = 'active';
            document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
            document.querySelector('#guts').appendChild(buildSettings());
            //click handler for everything in this section
//            document.querySelector('#' + scriptID).addEventListener('click', changeSettings, false);
        }, false);
    }
    else
    {
        //script tab already exists
        document.querySelector('#scripts').firstChild.addEventListener('click', function (e)
        {
            //some other script is doing the activation work, just add our settings
            e.stopPropagation();
            document.querySelector('#guts').appendChild(buildSettings());
            //click handler for everything in this section
//           document.querySelector('#' + scriptID).addEventListener('click', changeSettings, false);
        }, false);
    }
 function buildSettings()
 {
  //build our settings and return them for appending
  var guts = document.body.appendChild(document.createElement('div'));
  guts.id = scriptID;
  var subhead = guts.appendChild(document.createElement('div'));
  subhead.className = 'subhead';
  subhead.textContent = scriptName;

  
  prefContent = elc('div',{style:{margin:'0 auto',display:'table-cell',overflowY:'auto',overflowX:'hidden',maxHeight:'500px',textAlign:'left',lineHeight:'2em',padding:'5px'}});
  choices=eval(GM_getValue('choices_'+playerName,'({})'));
  
  var choiceArray=new Array();
  for(a in choices) {
   var temp=choices[a];
   temp.id=a;
   temp.tempname=temp.name.toLowerCase().replace(/^(a|an|the) /,'');
   choiceArray.push(temp);
  }
  choiceArray.sort(sortByName);
  
  for(var i=0,l=choiceArray.length;i<l;i++) {
   var thisChoice=choiceArray[i];
   var string = thisChoice.name + ' ('+((thisChoice.always)?'always':thisChoice.numLeft+' times')+')';
   //thisChoice.name)+' ('+((thisChoice.always)?'Always':thisChoice.numLeft+' advs')+')'
   var item = new accountItem(thisChoice);
   prefContent.appendChild(item);
  }
  if(choiceArray.length) {
   var clearAllButton = elc('input',{type:'button',className:'button',value:'Remove All'});
   
   addEventListener(clearAllButton,'click',clearAll,false);
   prefContent.appendChild(clearAllButton);
  } else {
   prefContent.appendChild(elc('span',null,'No Saved Choices'));
  }
  
  var accountBlock = elc('div',{style:{border:'1px solid blue',width:'95%'}},[
   elc('div',{style:{backgroundColor:'blue',color:'white',fontWeight:'bold',textAlignment:'center',padding:'5px'}},'Auto Choice'),
   prefContent
  ]);
  
  guts.appendChild(accountBlock);
  return guts;
 }

}   

// --------------------------------------------------------------

function clearAll() {
 if(!confirm('Are you sure you want to delete these items?'))return false;
 GM_setValue('choices_'+playerName,'({})');
 removeChildNodes(prefContent);
 prefContent.appendChild(elc('span',null,'No Saved Choices'));
}

function choiceGo() {
 choices=eval(GM_getValue('choices_'+playerName,'({})'));

 var curAdv = find('//form[starts-with(@name,"choiceform")]/input[@name="whichchoice"]');
 if(!curAdv)return false;
 advNumber = curAdv.value*1;
 if(!isInt(advNumber))return false;
 //if advNumber is set to auto, deincrement (if number), and go
 var current = choices[advNumber];
 if(current && (current.always || current.numLeft)) {
  //fail if can't find the choice
  var theForm = find('//form[starts-with(@name,"choiceform") and input[@name="option" and @value='+current.choice+']]');
  if(!theForm)return false;
  
  if(!current.always) {
   current.numLeft--;
   if(!current.numLeft) {
    //remove item;
    delete choices[advNumber];
    GM_setValue('choices_'+playerName,choices.toSource());
   }
  }
  
  theForm.submit();
 } else {
  GM_addStyle((<r><![CDATA[
   div.hiddenAutoChoose {
    width:11em;
    margin:.5em;
    padding:.5em;
    text-align:left;
    border:1px dashed silver;
   }
   div.hiddenAutoChoose input[type="button"] {
    margin:0 auto;
    display:block;
   }
   div.hiddenAutoChoose label {
    text-align:right;
    width:7.5em;
    margin-right:.6em;
    font-size:85%;
    display:block;
    float:left;
   }
  ]]></r>).toString());

  var forms = snap('//form[starts-with(@name,"choiceform")]');
  //don't bother saving information without an adventure title.
  var advTitle = find('//form[starts-with(@name,"choiceform")]/ancestor::table//td[@bgcolor="blue"]/b[1]');
  if(!advTitle)return false;
  advName = advTitle.firstChild.nodeValue;
  for(var i=0,l=forms.length;i<l;i++) {
   var form=forms[i];
   var mini=new miniform();
   form.appendChild(mini);
  }
 }
}

function miniform() {
 var radio = elc('input',{type:'radio',title:'Auto choose this button'});
 addEventListener(radio,'click',clearButtons,false);

 var howMany = elc('input',{type:'text',size:2,value:0});
 var always = elc('input',{type:'checkbox',title:'Always choose this item'});
 addEventListener(always,'click',disabler,false);
 var goButton=elc('input',{className:'button', type:'button',value:'Save and Go'});
 addEventListener(goButton,'click',saveAndGo,false);
 var hidden=elc('div',{className:'hiddenAutoChoose',style:{display:'none'}},[
  elc('label',null,'Do this x times'),
  howMany,
  elc('br'),
  elc('label',null,'Always Choose'),
  always,
  elc('br'),
  goButton
 ]);
 
 radios.push([radio,hidden]);
 return elc('documentfragment',null,[radio,hidden]);
 
 function disabler() {
  howMany.disabled=always.checked;
 }
 
 function saveAndGo() {
  if(isInt(howMany.value) || always.checked) {
   var choices=eval(GM_getValue('choices_'+playerName,'({})'));
   
   choiceSelection=radio.parentNode.elements.namedItem('option').value*1;
   var tempChoice = {name:advName,choice:choiceSelection};

   if(always.checked) {
    tempChoice.always=1;
   } else {
    tempChoice.numLeft = howMany.value*1;
   }
   choices[advNumber]=tempChoice;
   GM_setValue('choices_'+playerName,choices.toSource());
   var form=find('./ancestor::form[1]',radio);
   form.submit();
  } else {
   alert('Invalid number of adventures chosen');
  }
 }
 
 function clearButtons() {
  for(var i=0,l=radios.length;i<l;i++) {
   var button=radios[i][0];
   if(button!=radio) {
    button.checked=false;
    radios[i][1].style.display="none";
   }
  }
  hidden.style.display="block";
 }
}


//helper functions
function snap(xp,location) {
 if(!location)location=document;
 var result = document.evaluate(xp, location, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
 v=new Array();
 for ( var i=0 ; i < result.snapshotLength; i++ )
 {
  v.push(result.snapshotItem(i));
 }
 return v;
}
function find(xp,location) {
 if(!location)location = document;
 var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
 return temp.singleNodeValue;
}

function removeChildNodes(parent){
  while(parent.hasChildNodes()){
   parent.removeChild(parent.lastChild)
 }
}

//bulk modify a node
function elmod(item,props,what) {
 function appendify(child) {
  if(typeof child=="string") {
   item.appendChild(document.createTextNode(child));
  } else if (child.nodeType) {
   item.appendChild(child);
  }
 }
 
 if(what) {
  if(isArray(what)) {
   for(var i=0,l=what.length;i<l;i++) {
    var thisWhat=what[i];
    appendify(thisWhat);
   }
  } else {
   appendify(what);
  }
 }
 
 //add properties to item
 if(props && typeof props=="object") {
  for(a in props) {
   //parse style property
   if(a.trim().toLowerCase()=="style") {
    var attributes=props[a];
    if(typeof attributes == "object") {
     for(b in attributes) {
      item.style[b]=attributes[b];
     }
    } else {
     attributes=attributes.split(";");
     for(var i=0,l=attributes.length;i<l;i++) {
      var att=attributes[i].split(':');
      att[0]=att[0].trim();
      if(att[0]=="float") {
       att[0]="cssFloat";
      } else {
       att[0]=att[0].trim().replace(/-[a-z]/g,function(s){return s.charAt(1).toUpperCase()});
      }
      att[1]=att[1].trim();
      item.style[att[0]]=att[1];
     }
    }
   } else {
    item[a]=props[a];
   }
  }
 }
}

//create nodes
function elc(type,props,what) {
 var item;
 //generate item
 if(typeof type=="string") {
  if(type.toLowerCase()=='documentfragment') {
   item=document.createDocumentFragment();
  } else {
   item=document.createElement(type);
  }
 }
 elmod(item,props,what);
 return item
}

function isArray(obj) {
 return obj && typeof obj=="object" && obj.constructor.toString().indexOf("Array") != -1;
}

String.prototype.trim = function()  {
 return this.replace(/\s+|\s+$/g,"");
}
function isInt(num) {
 return (!isNaN(parseInt(num)) && parseInt(num).toString() == num);
}
function addEventListener(target, event, listener, capture) {
 openEventListeners.push( [target, event, listener, capture] );
 target.addEventListener(event, listener, capture);
}
function destroyEventListeners(event) {
 for (var i = 0, l=openEventListeners.length; i<l; i++)     {
  var rel = openEventListeners[i];
  rel[0].removeEventListener(rel[1], rel[2], rel[3]);
 }
 window.removeEventListener('unload', destroyEventListeners, false);
}




if(document.location.pathname=="/account.php") {
 getPlayerName(accountGo);
} else {
 getPlayerName(choiceGo);
}