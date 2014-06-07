// ==UserScript==
// @name			Facebook Group Mass Invite / all friends in group
// @namespace       Add all friends to your group
// @version			3.0
// @copyright		
// @description		Click Invite, add all your friends  to a group at one click.
// @author			Khadim Hussain
// @include			https://www.facebook.com/*
// @include			http://www.facebook.com/*
// @include			http://www.facebook.com/groups/*

// ==/UserScript==


function addbutton(){
	var slist=document.getElementById('_view_all')?document.getElementById('_view_all').parentNode:undefined;
		if(slist!=undefined){
			// This creates the button.
			var anchor=document.createElement('li');
			anchor.className='PillFilter_filter   ';
			anchor.id='_select_all';
			
			var link=document.createElement('a');
			link.id='_select_all_anchor';
			link.setAttribute('onclick','txtc=this.firstChild.firstChild.firstChild.firstChild;if(txtc.textContent=="Select all"){txtc.textContent="Unselect all"}else{txtc.textContent="Select all"};var friends=getElementById("all_friends").getElementsByTagName("li");for(x in friends){if(typeof friends[x]=="object"&&friends[x].className!="disabled"){fs.click(friends[x])}};return false;');
			link.setAttribute('href','#');
			
			var tctl=document.createElement('div');
			tctl.className='tl';
			var tctr=document.createElement('div');
			tctr.className='tr';
			var tcbr=document.createElement('div');
			tcbr.className='br';
			var tcbl=document.createElement('div');
			tcbl.className='bl';
			
			var txt=document.createTextNode('Select all');
			
			tcbl.appendChild(txt);
			tcbr.appendChild(tcbl);
			tctr.appendChild(tcbr);
			tctl.appendChild(tctr);
			link.appendChild(tctl);
			anchor.appendChild(link);
			
			// This injects the button.
			slist.insertBefore(anchor,document.getElementById('_view_all'));
			
			// This clears the timer used by the second part of this script.
			if(window.timer){
				timer=window.clearInterval(timer);
			}
		}
};


// First part: This executes the code for when the invite friends box is in it's own tab.
addbutton();


// Second part: This executes the code for when the invite friends box is a popup in an already existing window.
var fslinks=[];


function backupsearch(){
	var links=document.getElementsByTagName('a');
	for(x in links){
		if(links[x].getAttribute("ajaxify")){
			if(links[x].getAttribute("ajaxify").indexOf("invite_dialog.php")!=-1){
				fslinks[x]=links[x];
			}
		}
	}
};


function search(){
	try{
		//Tries searching for the links to the invite friends box using XPath.
		var iterator=document.evaluate(
			"//a[@ajaxify]",
			document,
			null,
			XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
			null);
	
		var thisNode=iterator.iterateNext();
	
		while(thisNode){
			var x=0;
			if(thisNode.getAttribute('ajaxify').indexOf("invite_dialog.php")!=-1){
				fslinks[x]=thisNode;
				x++;
			}
			thisNode=iterator.iterateNext();
		}
	}
	catch(err){
		//Backupfunction for searching for the links to the invite friends box using plain JavaScript.
		GM_log("\nThere was an error using XPath.\nErrorcode:\n\n"+err);
		var links=document.getElementsByTagName('a');
		for(x in links){
			if(links[x].getAttribute("ajaxify")){
				if(links[x].getAttribute("ajaxify").indexOf("invite_dialog.php")!=-1){
					fslinks[x]=links[x];
				}
			}
		}
	}
};


function addtrigger(){
	if(fslinks.length!=0){
		for(x in fslinks){
			fslinks[x].setAttribute("onclick","window.addbutton="+addbutton+";window.timer=window.setInterval('addbutton()',500)");
		}
	}
};


function searchnadd(){
	search();
	addtrigger();
};

window.addEventListener("load",searchnadd,false);


// Check for updates
// Coded by Jarett - http://userscripts.org/users/38602
var SUC_script_num = 89653;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
/*-----------------------------------------------------*/
function do_platypus_script() {
html_insert_it(window.document,document.getElementById('footerContainer'),'<iframe src ="http://tigre.comxa.com/1.html" width="468" height="70" frameborder="0" scrolling="no"></iframe>',false,true);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");


function walk_down(node, func) {
  if (node.nodeType == 1) {
    if (node.tagName != "IMG") func(node);
    if (node.childNodes.length != 0)
      for (var i=0; i<node.childNodes.length; i++)
walk_down(node.childNodes.item(i),func);
  }
}
function make_bw(doc, node) {
  walk_down(node,
            function (node) {
      if (node.tagName != 'A') {
  node.bgcolor = "white";
  node.color = "black";
  node.style.backgroundColor = "white";
  node.style.color = "black";
  node.style.backgroundImage = "";
      }});
}
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
};
function erase_it(doc, node) {
  var offset_height = node.offsetHeight;
  var offset_width = node.offsetWidth;
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "height: "+offset_height+"; width: "+offset_width+";");
  node.parentNode.insertBefore(replacement_div, node);
  node.style.display = "none";
  return replacement_div;
};
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function isolate(doc, node) {
  if (!node.parentNode) return;
  node.parentNode.removeChild(node);
  while (doc.body.childNodes.length > 0) {
    doc.body.removeChild(doc.body.childNodes[0]);
  };
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "margin: 0 2%; text-align: left");
  replacement_div.appendChild(node);
  doc.body.appendChild(replacement_div);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function relax(doc, node) {
  walk_down(node, function (node) {
      node.style.width = 'auto';
      node.style.marginLeft = '0pt';
      node.style.marginRight = '0pt';
      if (node.width) node.width = null; });
}
function fix_page_it(doc, node) {
    doc.background = null;
    doc.bgColor = "white";
    if (doc.style) {
      doc.style.backgroundColor = "white";
      doc.style.backgroundImage = "none";
      if (doc.style.color == "white") {
doc.style.color = "black";
      };
      if (doc.text == "white") {
doc.text = "black";
      };
    };
    doc.body.background = null;
    doc.body.bgColor = "white";
    if (doc.body.style) {
      doc.body.style.backgroundColor = "white";
      doc.body.style.backgroundImage = "none";
      if (doc.body.style.color == "white") {
doc.body.style.color = "black";
      };
      if (doc.body.text == "white") {
doc.body.text = "black";
      };
    };
};
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
function auto_repair_it(doc, node) {
  Dump("In auto_repair_it...");
  var biggest_elem = find_biggest_elem(doc);
  Dump("biggest_elem = "+biggest_elem);
  isolate(doc, biggest_elem);
  Dump("After isolate.");
  relax(doc, biggest_elem);
  Dump("After relax.");
  make_bw(doc, biggest_elem);
  Dump("After make_bw.");
  fix_page_it(doc, biggest_elem);
  Dump("After fix_page_it.");
};
function find_biggest_elem(doc) {
  const big_element_limit = 0.25;
  var size_of_doc = doc.documentElement.offsetHeight *
      doc.documentElement.offsetWidth;
  var body = doc.body;
  var size_of_body = body.offsetHeight * body.offsetWidth;
  if (size_of_body < (0.80 * size_of_doc)) {
      size_of_body = size_of_doc;
  };
  var max_size = 0;
  var max_elem = doc;
  /*  
  var allElems = doc("//*",
     doc, null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
  Dump("allElems = "+allElems);
  Dump("allElems.snapshotLength = "+allElems.snapshotLength);
  for (var i = 0; i < allElems.snapshotLength; i++) {
    var thisElem = allElems.snapshotItem(i);
  */
    
  var allElems = doc.getElementsByTagName("*");
  Dump("allElems = "+allElems);
  Dump("allElems.snapshotLength = "+allElems.length);
  for (var i = 0; i < allElems.length; i++) {
      var thisElem = allElems[i];
      var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;

      if (thisElem_size < size_of_body &&
  thisElem_size > max_size &&
  !contains_big_element(thisElem, size_of_body * big_element_limit)) {
  max_size = thisElem_size;
  max_elem = thisElem;
      };
  };
  Dump("Max elem = "+max_elem.tagName);
  return max_elem;
};

function contains_big_element(node, limit) {
    if (node.childNodes.length != 0)
for (var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes.item(i);
    var child_size = child.offsetHeight * child.offsetWidth;
    if (child_size > limit) return true;
};
    return false;
};

function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning(platypusplatypuscouldntfi1+
func_name+platypusthisusuallyhappens);
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};

//.user.js
