// ==UserScript==
// @name        AddSmiles
// @description Add some additional smiles to standard panel http://smotri.com/live*
// @description This version removes the limitation on the quantity of smiles
// @version     1.2
// @include     http://smotri.com/live/*
// @include     http://video.gdate.ru/live/*
// @include     http://video.passion.ru/live/*
// @include     http://video.qip.ru/live/*
// @include     http://video.comedy.ru/live/*
// @run        onload
// ==/UserScript==


var MainPanel = document.getElementById("BroChatSmiles"); var SmlImg = MainPanel.getElementsByTagName("img"); var SmlQuantity = SmlImg.length; 
for(var i=0; i<SmlQuantity; i++) { MainPanel.removeChild(SmlImg[0]); SmlImg = MainPanel.getElementsByTagName("img");} 
var ElemA = MainPanel.getElementsByTagName("a")[0]; var CloneA = ElemA.cloneNode(true); ElemA.parentNode.removeChild(ElemA); CloneA.style.top = '6px';

function createElement(pr,name, attrs, style) { var parent = document.getElementById(pr); var elem = document.createElement(name); if (attrs) { for (key in attrs) { 
if (key == 'class') { elem.className = attrs[key]; } else if (key == 'id') { elem.id = attrs[key]; } else { elem.setAttribute(key, attrs[key]); }}} if (style) { for (key in style) {elem.style[key] = style[key];}} parent.appendChild(elem);}



createElement('BroChatSmiles','div',
              {'class': 'myPanelForSmile', 'id': 'myPanelIdn','align':'center'}, {'width': '390px',  'height': '30px'});
createElement('myPanelIdn','img',
              {'id': 'smile1n','align':'left', 'onclick': "insert_smile('chat_text', ':) ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/ab.gif'});
createElement('myPanelIdn','img',
              {'id': 'smile2n','align':'left', 'onclick': "insert_smile('chat_text', ':( ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/ac.gif'});
createElement('myPanelIdn','img',
              {'id': 'smile3n','align':'left', 'onclick': "insert_smile('chat_text', ';) ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/a_d.gif'});
createElement('myPanelIdn','img',
              {'id': 'smile4n','align':'left', 'onclick': "insert_smile('chat_text', ':-D ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/ag.gif'});
createElement('myPanelIdn','img',
              {'id': 'smile5n','align':'left', 'onclick': "insert_smile('chat_text', '=-O ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/ai.gif'});
createElement('myPanelIdn','img',
              {'id': 'smile6n','align':'left', 'onclick': "insert_smile('chat_text', '%) ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/be.gif'});
createElement('myPanelIdn','img',
              {'id': 'smile7n','align':'left', 'onclick': "insert_smile('chat_text', ':-[ ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/ah.gif'});
createElement('myPanelIdn','img',
              {'id': 'smile8n','align':'left', 'onclick': "insert_smile('chat_text', '*MAIL* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bv.gif'});
createElement('myPanelIdn','img',
              {'id': 'smile9n','align':'left', 'onclick': "insert_smile('chat_text', '*LOL* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bj.gif'});
document.getElementById('myPanelIdn').appendChild(CloneA);
createElement('BroChatSmiles','div',
              {'class': 'myPanelForSmile', 'id': 'myPanelId','align':'center'}, {'width': '390px',  'height': '30px'});
createElement('myPanelId','img',
              {'id': 'smile1','align':'left', 'onclick': "insert_smile('chat_text', '*HI* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bq.gif'});
createElement('myPanelId','img',
              {'id': 'smile3','align':'left', 'onclick': "insert_smile('chat_text', '*DRINK* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/az.gif'});
createElement('myPanelId','img',
              {'id': 'smile2','align':'left', 'onclick': "insert_smile('chat_text', '*BYE* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/br.gif'});
createElement('myPanelId','img',
              {'id': 'smile4','align':'left', 'onclick': "insert_smile('chat_text', '*KISSING* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/aw.gif'});
createElement('myPanelId','img',
              {'id': 'smile5','align':'left', 'onclick': "insert_smile('chat_text', '@}~--- ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/ax.gif'});
createElement('myPanelId','img',
              {'id': 'smile5','align':'left', 'onclick': "insert_smile('chat_text', '*YES* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bs.gif'});
createElement('myPanelId','img',
              {'id': 'smile5','align':'left', 'onclick': "insert_smile('chat_text', '*NO* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bl.gif'});
createElement('myPanelId','img',
              {'id': 'smile6','align':'left', 'onclick': "insert_smile('chat_text', ';D ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bt.gif'});
createElement('BroChatSmiles','div',
              {'class': 'myPanelForSmile', 'id': 'myPanelId2','align':'center'}, {'width': '390px',  'height': '40px'});
createElement('myPanelId2','img',
              {'id': 'smile7','align':'left', 'onclick': "insert_smile('chat_text', '*TITS* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/by.gif'});
createElement('myPanelId2','img',
              {'id': 'smile8','align':'left', 'onclick': "insert_smile('chat_text', '*DANCE* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bo.gif'});
createElement('myPanelId2','img',
              {'id': 'smile9','align':'left', 'onclick': "insert_smile('chat_text', '[:-} ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/ar.gif'});
createElement('myPanelId2','img',
              {'id': 'smile10','align':'left', 'onclick': "insert_smile('chat_text', '*YAHOO* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bp.gif'});
createElement('myPanelId2','img',
              {'id': 'smile11','align':'left', 'onclick': "insert_smile('chat_text', '*BOYAN* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bz.gif'});
createElement('myPanelId2','img',
              {'id': 'smile12','align':'left', 'onclick': "insert_smile('chat_text', '*JOKINGLY* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/ap.gif'});
createElement('myPanelId2','img',
              {'id': 'smile12','align':'left', 'onclick': "insert_smile('chat_text', ':-X ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/al.gif'});
createElement('myPanelId2','img',
              {'id': 'smile13','align':'left', 'onclick': "insert_smile('chat_text', '*CRAZY* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bm.gif'});

createElement('myPanelId2','img',
              {'id': 'smile13','align':'left', 'onclick': "insert_smile('chat_text', '*SCRATCH* ­', 'smiles_popup'); return false;", 'src': 'http://pics.smotri.com/cskins/blue/smiles/bw.gif'});
createElement('BroChatSmiles','div', {'class': 'myPanelForMsg', 'id': 'MsgPanelId','align':'left'}, {'width': '300px',  'height': '40px'});
var Mainobj = document.getElementById("UserInbox"); var Cloneobj = Mainobj.cloneNode(true); Mainobj.parentNode.removeChild(Mainobj); Cloneobj.style.top = '6px';
document.getElementById('MsgPanelId').appendChild(Cloneobj);
              