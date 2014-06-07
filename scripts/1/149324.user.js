// ==UserScript==
// @name           wip_stfu
// @namespace      2
// @description    silence of the spam
// @version        1.03
// @include        http://blogs.crikey.com.au/*
// @include        http://www.crikey.com.au/*
// @require 		 http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// ==/UserScript==
// Ver 0.04
// Add wordfilter
// Ver 1.00
// Add config dialog
// Ver 1.01
// Add GM/TM menu access to config dialog
// Ver 1.02
// Fix lower case bug
// Ver 1.03
// Better defensive code around get class

// The first rule of stfu: stfu about stfu

////////////////////////////////////////////////////////////////////////////////
// Config settings dialog
GM_config.storage = 'stfu';
GM_config.init('Better Bludging', 
	{
		authorFilter: {
			label: 'Author filter&nbsp;&nbsp;(use the format: \'bob1234|L. Ron Hubbard|Joseph Smith, Jr.\')',
			type: 'text',
			'default': 'bob1234',
			size:50
		},
		wordFilter: {
			label: 'Word/phrase filter&nbsp;&nbsp;(use the format: \'programmatic specificity|leadership rumblings\')',
			type: 'text',
			'default': '',
			size:50
		}
	},
	{
		save: function() { location.reload(); } // reload the page when configuration was changed
	}
);
function showConfigSTFU() {
	GM_config.open();
}
GM_registerMenuCommand('stfu Settings', showConfigSTFU);


// Add config link on page
var stfu_showconfig = document.createElement('span');
stfu_showconfig.style.clear = 'both';
var stfu_showconfiglink = document.createElement('a');
stfu_showconfiglink.id = 'stfu-showconfig';
stfu_showconfiglink.style.color = 'blue';
stfu_showconfiglink.innerHTML = 'stfu Settings';
stfu_showconfig.appendChild(stfu_showconfiglink);
stfu_showconfig.addEventListener("click", showConfigSTFU, false);
var stfu_showconfigpad = document.createElement('span');
stfu_showconfigpad.style.clear = 'both';
stfu_showconfigpad.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	
var cccp_helper = document.getElementById("cccp-helper");
if (cccp_helper != null) {
	var spa = cccp_helper.getElementsByTagName('span');
	if (spa != null && spa.length >= 3) {
		cccp_helper.insertBefore(stfu_showconfig, spa[2]);
		cccp_helper.insertBefore(stfu_showconfigpad, spa[2]);
	}
} else {
	var comments=document.getElementById("comments");
	if (comments != null) {
		var stfu_option = document.createElement('div');
		stfu_option.setAttribute("id","stfu-option");
		stfu_option.appendChild(stfu_showconfig);
		var clear=document.createElement('div');
		clear.setAttribute("class","clear");
		comments.appendChild(clear.cloneNode(0)); 
		comments.appendChild(stfu_option); 
	}
}

////////////////////////////////////////////////////////
function toggleComment(){
  var elem = this.parentNode.nextSibling;
  if (elem.style.display == 'none') {
    elem.style.display = 'block'
    this.innerHTML = this.innerHTML.replace(/Show Comment/g,'Hide Comment');
  } else {
    elem.style.display = 'none'
    this.innerHTML = this.innerHTML.replace(/Hide Comment/g,'Show Comment');
  }
}
////////////////////////////////////////////////////////

var authorFilter = GM_config.get('authorFilter').toLowerCase();
var wordFilter = GM_config.get('wordFilter');

// Hide posts by blacklisted authors
if (authorFilter != null && authorFilter.length > 0 && document.getElementById('comments-list') != null) {
	var af = '^' + authorFilter.replace(/\|/g,'$|^') + '$';
	Array.filter( document.getElementById('comments-list').getElementsByClassName('fn'), function(elem){
	  var author = elem.innerHTML.toLowerCase();
	  if (author.match(af)) {
		 elem.parentNode.parentNode.style.display = 'none';
		 var newNodeP = document.createElement('p');
		 var newNodeA = document.createElement('a');
		 newNodeA.addEventListener("click", toggleComment, true);
		 newNodeP.appendChild(newNodeA);
		 elem.parentNode.parentNode.parentNode.insertBefore(newNodeP,elem.parentNode.parentNode);
		 newNodeA.innerHTML = author + ' - Show Comment (Author)';
		 newNodeA.style.color = '#99CC33';
	  } else {
		 elem.parentNode.parentNode.style.display = 'block';
	  }
	});
}

// Hide posts containing words found in the word filter
if (wordFilter != null && wordFilter.length > 0) {
	var wf = wordFilter.toLowerCase();
	Array.filter( document.getElementById('comments-list').getElementsByTagName('li'), function(elem){
	  var text = elem.innerHTML.toLowerCase();
	  if (elem.style.display == 'block' && text.match(wf)) {
		 elem.style.display = 'none';
		 var newNodeP = document.createElement('p');
		 var newNodeA = document.createElement('a');
		 newNodeA.addEventListener("click", toggleComment, true);
		 newNodeP.appendChild(newNodeA);
		 elem.parentNode.insertBefore(newNodeP,elem);
		 if (elem.getElementsByClassName('fn') != null && elem.getElementsByClassName('fn').length > 0)
			newNodeA.innerHTML = elem.getElementsByClassName('fn')[0].innerHTML + ' - Show Comment (WordFilter)';
		 else
			newNodeA.innerHTML = 'Show Comment (WordFilter)';
		 newNodeA.style.color = '#99CC33';
	  }
	});
}
