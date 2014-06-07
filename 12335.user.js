// ==UserScript==
// @name            Strip all info except the current's day Top 30 Black list from www.adsblacklist.com
// @namespace       http://www.ngtech.gr/blog/en/my-greasemonkey-scripts/my-adbslacklistcom-top-30-cleaner-greasemonkey-script
// @include         http://www.adsblacklist.com/index.php
// @include         http://www.adsblacklist.com/
// @include         http://www.adsblacklist.com
// @author          Nick Georgakis <grease_monkey@ngtech.gr>
// @license         This software is licensed under the GNU GPL License <http://creativecommons.org/licenses/GPL/2.0/>
// @credit          Code Parts Generated using Platypus Firefox Extension
// @version         0.2

var my_ver = 0.2; //current script version

/*******************************************************************************
functions to edit the page:
*******************************************************************************/
function hide(id){
    if(document.getElementById(id))
      document.getElementById(id).style.display="none";
}

function show(id){
    if(document.getElementById(id))
      document.getElementById(id).style.display="";
}

function wait_ajax(){
	//function to delay script execution after AJAX has been performed
	if(document.getElementById('abltop30_loadstatus').innerHTML!="Complete"){
		//Not loaded - schedule check
		setTimeout(wait_ajax,500);
	}else{
		//Loaded - Do Platypus stuff
		do_platypus_script();
	}		
}

function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
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

function do_platypus_script() {
	//Platypus Rocks - But needs a bit more XPath Hacking	
	isolate(window.document,document.getElementById('abltop30'),null,null,null);
	
	//Clean up the site table - not sure why all this strange looping is needed
	done = false;
	while(!done){
		var nodesSnapshot =document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[*]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		done=true;
		for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
			tmp = nodesSnapshot.snapshotItem(i).innerHTML;
			if((rep = /^.*href="(.*?)".*$/gm.exec(tmp)) != null){
				nodesSnapshot.snapshotItem(i).innerHTML = rep[1];
				done=false;
			}else{
			}
		}
	}
	
	//Add Header
	html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/TABLE[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<div align="center"><h1>Today\'s Top 30</h1></div>',true,false);
	//Add link & Donation form
	$new_html = '<div align="right"><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_new">' + 
	'<input type="hidden" name="cmd" value="_s-xclick">' +
	'<input style="background:none;border:0px;margin:0px;padding:0px;width:auto;"type="image" src="http://www.ngtech.gr/blog/img_src/donate.png?&script=blklst&v='+my_ver+'" border="0" name="submit" alt="Donate via PayPal - it is fast, free and secure!">'+
	'<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">' +
	'<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">'+
	'</form>'+
	'<a href="http://www.ngtech.gr/blog/en/" title="Visit www.ngtech.gr for more great scripts!">GM Script provided by Nick Georgakis (www.ngtech.gr)</a></div>';
	html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[30]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,$new_html,false,false);
	//Show
	show(document.getElementsByTagName('body')[0]);
	//Center table
	center_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/TABLE[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);	
};

// Ends do_platypus_script


/*******************************************************************************
script follows:
*******************************************************************************/
//Add AJAX listener
window.addEventListener("load", function() { wait_ajax() }, false);

//hide page while waiting for Ajax
hide(document.getElementsByTagName('body')[0]);