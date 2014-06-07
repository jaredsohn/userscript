// ==UserScript==
// @name          HWM_forum_counter
// @description   HWM_forum_counter
// @include      http://www.heroeswm.ru/forum_messages.php*
// @include      http://www.heroeswm.ru/new_topic.php*
// ==/UserScript==


var url_cur = location.href ;
//alert("HWM_forum_counter");

var url_reply = "heroeswm.ru/forum_messages.php";
var url_newmsg = "heroeswm.ru/new_topic.php";


var max_chars = 3000; // actually about 4k, but to be sure we set it to 3k :-)
var msg_form = document.forms[0];
var msg_ta = document.forms[0][1];
var msg_cb = document.forms[0][2];

if(url_cur.indexOf(url_newmsg)!=-1 || document.forms[0].length ==5){ 
// new message or just replied (wait 60 sec)
	msg_ta = document.forms[0][2];
	msg_cb = document.forms[0][3];
}


msg_ta.rows = 30;


var d = document.createElement( 'span' );
d.style.marginLeft = "50";
//d.style.backgroundColor = "#eee";
d.style.fontSize = "12px";
//
d.innerHTML = "\u0412\u0432\u0435\u0434\u0435\u043D\u043E 0 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0438\u0437 "+max_chars;

msg_cb.parentNode.insertBefore(d, msg_cb.nextSibling);


msg_ta.addEventListener( "keypress", countChars , false );

// ==================== functions ===========================

function countChars(){
	//d.innerHTML = "used "+(msg_ta.value.length)+" chars of N";
	
	setTimeout( function() { countCharsChange() } , 100 ); // workaround for pasting from clipboard
}

function countCharsChange(){
	//alert("countCharsChange, ta.len = "+ msg_ta.value);
	// \u0412\u0432\u0435\u0434\u0435\u043D\u043E 222 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0438\u0437 333
	//d.innerHTML = "used "+(msg_ta.value.length)+" chars of N";
	d.innerHTML = "\u0412\u0432\u0435\u0434\u0435\u043D\u043E "+(msg_ta.value.length)+" \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0438\u0437 "+max_chars;
	
	d.style.backgroundColor = (msg_ta.value.length>=max_chars)? "#fcc" : "";

}




