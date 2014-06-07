// ==UserScript==
// @name           Greasemonkey starter kit
// @namespace      GLB
// @description    compilation of the most needed scripts for beginners
// @include        http://goallineblitz.com/*
// ==/UserScript==

window.setTimeout( function() 
{


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};


GM_xmlhttpRequest({
method: 'GET',
url: 'http://goallineblitz.com/game/home.pl',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(inbox) {
var bodySource=inbox.responseText;

var newPM = bodySource.split('<div id="inbox_button"><div>');
var newPM1 = newPM[1].split('</div>');
var numNewPMs = newPM1[0];

var inboxBar = getElementsByClassName('toolbar_item',document)[5];
inboxBar.innerHTML = 'Inbox (' + numNewPMs + ')';

var newAlert = bodySource.split('<div id="alerts_button"><div>');
var newAlert1 = newAlert[1].split('</div>');
var numNewAlerts = newAlert1[0];

var tBar = document.getElementById('toolbar');
var tBar1 = tBar.innerHTML.split('<a href="/game/chat.pl" class="toolbar_item">Chat</a>');
tBar.innerHTML = tBar1[0] + 
	'<a href="inbox.pl?alerts=1.pl" class="toolbar_item">' + 'Alerts (' + numNewAlerts + ')</a>' +
	'<a href="/game/chat.pl" class="toolbar_item">Chat</a>' 
	+ tBar1[1];


}
});


}, 100);

// ==UserScript==
// @name           GLB Forum Send PM Link
// @namespace      GLB
// @description    Add a Send PM Link beneath user name in forum threads
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

window.setTimeout( function() 
{


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var users = getElementsByClassName("user_name",document);

for (var i = 0; i < users.length; i++) {
    	var thisUser = users[i];
	var userIDstart =thisUser.innerHTML.indexOf('user_id=') + 8;
	var userIDend = thisUser.innerHTML.indexOf(' id=') - 1;
	var uid = thisUser.innerHTML.substring(userIDstart ,userIDend);
	thisUser.innerHTML = thisUser.innerHTML + '<br><a href="http://goallineblitz.com/game/new_message.pl?to=' + uid + '">Send PM</a>';
}


}, 100);



// ==UserScript==

// @name           Scouting Report Numbers

// @namespace      http://goallinebliz.com

// @description    Adds numbers to the scouting report bars

// @include        http://goallineblitz.com/game/player.pl?player_id=*

// ==/UserScript==

window.setTimeout( function() 
{


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var bars = getElementsByClassName("rating_bar",document);
for(var i=0; i<bars.length; i++)
{
	var element = bars[i].firstChild;
	var number = element.style.width;
	element.innerHTML = parseInt(element.style.width,10);
}
}, 100);

// ==UserScript==
// @name           Greasemonkey Search
// @namespace      bamaplaya1
// @description    will search userscripts.org for a desired script
// @include        http://goallineblitz.com*
// ==/UserScript==

document.getElementById('footer').innerHTML = '<form method="get" action="http://userscripts.org/scripts/search"><input type="text" name="q" size="31" maxlength="255" value=""><input type="submit" value="Userscripts Search"></form>';

// ==UserScript==
// @name           GLB Training Fix
// @namespace      pbr_tf
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// @version        08.10.23
// ==/UserScript==

/*
 *
 * pabst did this 10/23/08+
 *
 */

window.setTimeout(
    function() {
        training_main();
    }
, 200);

var att = ["strength","speed","agility","jumping","stamina",
            "vision","confidence","blocking","tackling","throwing",
            "catching","carrying","kicking","punting"];
var att2 = [
            [3,7,8,9,11,12,13], //str
            [2,4,8],            //spd    
            [1,4,5,7,8,9],      //agi
            [0,4,5,8,10],       //jmp
            [1,2,3,6],          //sta
            [2,3,6,9,10,12,13], //vis
            [4,5,11],           //con
            [0,2],              //blk
            [0,1,2,3],          //tac
            [0,2,5],            //thr
            [3,5,11],           //cat
            [0,6,10],           //car
            [0,5],              //kck
            [0,5],              //pun
           ];

function training_main() {
    var d = document.getElementById("training_intense");
    var p = d.parentNode;
    var s1 = document.createElement("select");
    s1.setAttribute("id","firstselection");

    for (var i=0; i<att.length; i++) {
        var o = document.createElement("option");
        o.text = att[i];
        s1.add(o,null);
    }
    var div = document.createElement("div");
    div.innerHTML = "&nbsp;";
    p.appendChild(div);
    var div = document.createElement("div");
    div.setAttribute("style","text-align: center;");
    div.innerHTML = " - OR - ";
    p.appendChild(div);
    var div = document.createElement("div");
    div.innerHTML = "&nbsp;";
    p.appendChild(div);

    var div = document.createElement("div");
    var txt = document.createElement("b");
    txt.innerHTML = "Primary Attribute: ";
    div.appendChild(txt);
    txt.appendChild(s1);
    p.appendChild(div);

    var s2 = document.createElement("select");
    s2.setAttribute("id","secondselection");
    var div = document.createElement("div");
    var txt = document.createElement("b");
    txt.setAttribute("class","training_selection");
    txt.innerHTML = "Secondary Attribute: ";
    div.appendChild(txt);
    txt.appendChild(s2);
    p.appendChild(div);

    resetSelections();
    s1.addEventListener("change", function() { showSecondSelection(); }, true);
    s2.addEventListener("change", function() { setIntenseSelection(); }, true);

    var t = document.getElementById("training_type");
    t.addEventListener("change", function() { enableSelections(this); }, true);
    enableSelections(t);
    
    d.addEventListener("change", function() { resetSelections(); }, true);
}

function resetSelections(d) {
    var d = document.getElementById("training_intense");
    var s1 = document.getElementById("firstselection");
    var s2 = document.getElementById("secondselection");

    var strings = d.options[d.selectedIndex].text;
    strings = strings.split("+");
    strings[1] = strings[1].slice(0,strings[1].indexOf(","));
    strings[2] = strings[2].slice(0,strings[2].indexOf(")"));
    //console.log("resetting to "+strings[1]+" -- "+strings[2]);
    setSelect(s1, strings[1]);
    showSecondSelection();
    setSelect(s2, strings[2]);
    setIntenseSelection();
}

function setSelect(sel, txt) {
    //console.log("txt = "+txt);
    for (var i=0; i<sel.length; i++) {
        if (sel.options[i].text.indexOf(txt) != -1) {
            //console.log(sel.options[i].text+" -- "+txt);
            sel.selectedIndex = i;
            break;
        }
    }
}

function enableSelections(t) {
    var bool = true;
    if (t.value.indexOf("intense") != -1) {
        bool = false;
    }

    var f = document.getElementById("firstselection");
    var s = document.getElementById("secondselection");
    if (bool == true) {
        f.disabled = true;
        s.disabled = true;
    }
    else {
        f.disabled = false;
        s.disabled = false;
    }
}

function setIntenseSelection() {
    var f = document.getElementById("firstselection");
    var s = document.getElementById("secondselection");
    var d = document.getElementById("training_intense");
    for (var i=0; i<d.length; i++) {
        var o = d.options[i];
        if (o.text.indexOf("+"+f.value) != -1) {
            if (o.text.indexOf("+"+s.value) != -1) {
                d.selectedIndex = i;
                break;
            }
        }
    }
}

function showSecondSelection() {
    var f = document.getElementById("firstselection");
    var s = document.getElementById("secondselection");
    while (s.length > 0) {
        s.remove(0);
    }
    
    var t = f.options[f.selectedIndex].text;
    var idx = att.indexOf(t);
    for (var i=0; i<att2[idx].length; i++) {
        var o = document.createElement("option");
        o.text = att[att2[idx][i]];
        s.add(o,null);
    }
    setIntenseSelection();
}

// ==UserScript==
// @name	  GLB Bold, Italics, Underline, Smilies
// @namespace	  
// @description	  Gives buttons to add bold, italics, or underline to textarea.
// @version	  1
// @include	  http://goallineblitz.com/game/forum_thread_list.pl*
// @include	  http://goallineblitz.com/game/forum_thread.pl?*
// @include	  http://goallineblitz.com/game/new_message.pl*
// @author	  chris465, modified by Deathblade
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

if (
 document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body    // Basic sanity
) {
  run();
}

function addChar(txtarea,charac){
	var intEnd = txtarea.selectionEnd;
	var intStart = txtarea.selectionStart;
	
	var Start = (txtarea.value).substring(0,intStart);
	
	var End = (txtarea.value).substring(intEnd);
	
	var text = "["+ charac +"]";
	text += (txtarea.value).substring(intStart,intEnd);
	text += "[/"+ charac +"]";
	
	txtarea.value = Start + text + End;
	txtarea.selectionStart = intStart;
	txtarea.selectionEnd = intEnd + 7;
} 

function addSmiley(txtarea,charac){
	var intEnd = txtarea.selectionEnd;
	var intStart = txtarea.selectionStart;
	
	var Start = (txtarea.value).substring(0,intStart);
	
	var End = (txtarea.value).substring(intEnd);
	
	var text = " "+ charac +" ";
	
	txtarea.value = Start + text + End;
	txtarea.selectionStart = intStart;
	txtarea.selectionEnd = intEnd + 7;
} 

function run () {	
  var them = document.getElementsByTagName("textarea");
  for(var i = them.length - 1; i >= 0; i--) {
    tweak_textarea(them[i]);
  }
  return;
}


function tweak_textarea (t) {
  var d   = t.ownerDocument;
  var p   = t.parentNode.parentNode.parentNode;
  var n   = t.nextSibling;
  var l   = p.previousSibling;
  var post = getElementsByClassName('medium_head', document)
  var posts = post[0]
	if (post[0].innerHTML == 'New Message') {
	var post = getElementsByClassName('fieldheading', document)
	var posts = post[2]
	}
  var br = d.createElement('br');
  posts.appendChild(br)

//<button type="button" style="font: bold 12px Arial">B</button>
	buttonBold = d.createElement('button');
	buttonBold.setAttribute('type','button');
	buttonBold.setAttribute('style','font: bold 12px Arial');
	buttonBold.appendChild(d.createTextNode("B"));
  	buttonBold.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonBold.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonBold);
	//p.insertBefore(buttonBold, t);
//<button type="button" style="font: 12px Arial;text-decoration: underline;">U</button>
	buttonUnder = d.createElement('button');
	buttonUnder.setAttribute('type','button');
	buttonUnder.setAttribute('style','font: 12px Arial;text-decoration: underline;');
	buttonUnder.appendChild(d.createTextNode("U"));
  	buttonUnder.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonUnder.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonUnder);
//<button type="button" style="font: bold 12px Arial;font-style : italic">I</button>
	buttonItalic = d.createElement('button');
	buttonItalic.setAttribute('type','button');
	buttonItalic.setAttribute('style','font: bold 12px Arial;font-style : italic');
	buttonItalic.appendChild(d.createTextNode("I"));
  	buttonItalic.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonItalic.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonItalic);
//<button type="button" style="font: bold 12px Arial;">:)</button>
	buttonSmile = d.createElement('button');
	buttonSmile.setAttribute('type','button');
	buttonSmile.setAttribute('style','font: bold 12px Arial;');
	buttonSmile.appendChild(d.createTextNode(":)"));
  	buttonSmile.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonSmile.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonSmile);
//<button type="button" style="font: bold 12px Arial;">:D</button>
	buttonTeeth = d.createElement('button');
	buttonTeeth.setAttribute('type','button');
	buttonTeeth.setAttribute('style','font: bold 12px Arial;');
	buttonTeeth.appendChild(d.createTextNode(":D"));
  	buttonTeeth.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonTeeth.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonTeeth);
//<button type="button" style="font: bold 12px Arial;">:(</button>
	buttonSad = d.createElement('button');
	buttonSad.setAttribute('type','button');
	buttonSad.setAttribute('style','font: bold 12px Arial;');
	buttonSad.appendChild(d.createTextNode(":("));
  	buttonSad.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonSad.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonSad);
//<button type="button" style="font: bold 12px Arial;">:P</button>
	buttonTongue = d.createElement('button');
	buttonTongue.setAttribute('type','button');
	buttonTongue.setAttribute('style','font: bold 12px Arial;');
	buttonTongue.appendChild(d.createTextNode(":P"));
  	buttonTongue.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonTongue.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonTongue);
//<button type="button" style="font: bold 12px Arial;">O_o</button>
	buttonEyes = d.createElement('button');
	buttonEyes.setAttribute('type','button');
	buttonEyes.setAttribute('style','font: bold 12px Arial;');
	buttonEyes.appendChild(d.createTextNode("O_o"));
  	buttonEyes.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonEyes.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonEyes);
//<button type="button" style="font: bold 12px Arial;">;)</button>
	buttonWink = d.createElement('button');
	buttonWink.setAttribute('type','button');
	buttonWink.setAttribute('style','font: bold 12px Arial;');
	buttonWink.appendChild(d.createTextNode(";)"));
  	buttonWink.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonWink.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	posts.appendChild(buttonWink);

  
  buttonBold.addEventListener('click', function(event) {
  	addChar ( t,"b" );
  	return;
  	}, true
  );
  buttonUnder.addEventListener('click', function(event) {
    	addChar ( t,"u" );
    	return;
    	}, true
  );
  buttonItalic.addEventListener('click', function(event) {
    	addChar ( t,"i" );
    	return;
    	}, true
  );
  buttonSmile.addEventListener('click', function(event) {
    	addSmiley ( t,":)" );
    	return;
    	}, true
  );
  buttonSad.addEventListener('click', function(event) {
    	addSmiley ( t,":(" );
    	return;
    	}, true
  );
  buttonTongue.addEventListener('click', function(event) {
    	addSmiley ( t,":P" );
    	return;
    	}, true
  );
  buttonEyes.addEventListener('click', function(event) {
    	addSmiley ( t,"O_o" );
    	return;
    	}, true
  );  
  buttonTeeth.addEventListener('click', function(event) {
    	addSmiley ( t,":D" );
    	return;
    	}, true
  );  
  buttonWink.addEventListener('click', function(event) {
    	addSmiley ( t,";)" );
    	return;
    	}, true
  );  

  var textareaKeydown = function(e) {
  	if (e.ctrlKey && e.altKey && e.keyCode == 66) {
  		// ctrl + alt + B
  		addChar(t,"b");
  	}
  	else if (e.ctrlKey && e.altKey && e.keyCode == 85) {
  		// ctrl + alt + U
  		addChar(t,"u");
  	}
	else if (e.ctrlKey && e.altKey && e.keyCode == 73) {
  		//ctrl + alt + I
  		addChar(t,"i");
  	}
  }
  	
  t.addEventListener("keydown",textareaKeydown,0);

  return;
}


// End