// ==UserScript==
// @name           Twitter TinyURL Copy Paste
// @namespace      gohulu.com
// @include        *
// ==/UserScript==
//Toggle script by  PostInterceptor http://userscripts.org/scripts/show/743

const POST_INTERCEPT = 'PostIntercept';
var intercept_on;
var is_modified = false;

interceptor_setup();

function toggle_intercept(flag)
{
    intercept_on = flag;
    GM_setValue(POST_INTERCEPT, intercept_on);
    setup_pi_button();
}

function setup_pi_button()
{
    var pi = document.getElementById('__pi_toggle');
    if (!pi) {
        pi = new_node('p', '__pi_toggle');
        pi.appendChild(new_text_node(''));
        document.getElementsByTagName('body')[0].appendChild(pi);

        var pi_toggle_style = ' \
#__pi_toggle { \
  position: fixed; \
  bottom: 0; right: 0; \
  padding: 2px; margin: 0; \
  font: caption; \
  font-weight: bold; \
  cursor: crosshair; \
  opacity: .5; \
} \
#__pi_toggle:hover { \
  border-width: 2px 0 0 2px; \
  border-style: solid none none solid; \
  border-color: black; \
} \
';
        add_style("__pi_toggle_style", pi_toggle_style);
        pi.addEventListener('click',
                            function() {toggle_intercept(!intercept_on)},
                            false);
    }

    if (intercept_on) {
        pi.firstChild.data = '[CU] is On';
        pi.setAttribute('title', 'Click to turn Compact URL Off');
        pi.style.backgroundColor = '#ff8';
        pi.style.color = '#008';
    } else {
        pi.firstChild.data = '[CU] is Off';
        pi.setAttribute('title', 'Click to turn Compact URL On');
        pi.style.backgroundColor = '#ccc';
        pi.style.color = '#444';
    }
}

function interceptor_setup()
{
 
    if (typeof GM_getValue != 'undefined') {
        intercept_on = GM_getValue(POST_INTERCEPT, false);
        GM_log('intercept_on = ' + intercept_on);
        setup_pi_button();
    } else {
        intercept_on = true;
    }


    window.addEventListener('submit', function(e) {
                                interceptor(e);
                                e.preventDefault();
                            }, false);
}



    if (intercept_on) {

///Tiny URL Script///
function getTinyAndInsert() {
  var theanchor=this;
  				var theText2 = this.parentNode.previousSibling.textContent;
				//alert("*"+theText2+"*");
  GM_xmlhttpRequest({
		method: 'GET',
		url: "http://gohulu.com/1/?save=y&url=" + this.parentNode.previousSibling.href,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				
				//var thetinyurl=responseDetails.responseText.match(/<blockquote><b>(http\:\/\/gohulu\.com\/[a-zA-Z0-9]+)<\/b><p>/)[1];
				var theHTML = responseDetails.responseText; 
				var theHTML2 = theHTML.substr(theHTML.indexOf("select_all();")+15,theHTML.indexOf("</textarea>")-theHTML.indexOf("select_all();")-15)
				var theText = "&nbsp;<textarea name='select1' style='width:600px; height:20px;'>Reading " + theText2 + ": " + theHTML2 + "</textarea>";
				//var theText2 = theanchor.previousSibling;

			
        //theanchor.parentNode.previousSibling.href=theHTML2
        theanchor.parentNode.innerHTML=theText;

inputs = document.getElementsByName('select1');	
for(var j=0;j<inputs.length;j++){
	inputs[j].addEventListener("mouseover", function(){
		 this.focus(); 
		 this.select(); 
	} , false);
}
			}	
		}
	});
}

var d,rid;
var alinkholder=document.getElementsByTagName('a')

for (var i=0;i<alinkholder.length;i++) {
  var alink=alinkholder[i];
  var alink2=alinkholder[i].textContent;
	
  if (alink.href&&(alink.href.match('http://'))&&(alink.href.length>23)) {
	  
    d=document.createElement('span')
    rid=parseInt(Math.random() * 100 * Math.random()* 100 * Math.random()* 100* Math.random()* 100)
    //&nbsp;
    d.innerHTML+="<a title='Make this link into a compact URL!' href='javascript://change this to compact URL' id='"+rid+"'>&otimes;</a>"
    alinkholder[i].parentNode.insertBefore(d,alinkholder[i].nextSibling)
    document.getElementById(rid).addEventListener("click",getTinyAndInsert,false)
  }
}
///Tiny URL Script///

        //return false;
    } else {
       // frm.real_submit();
    }


function new_node(type, id)
{
    var node = document.createElement(type);
    if (id && id.length > 0)
        node.id = id;
    return node;
}

function new_text_node(txt)
{
    return document.createTextNode(txt);
}

function add_style(style_id, style_rules)
{
    if (document.getElementById(style_id))
        return;

    var style = new_node("style", style_id);
    style.type = "text/css";
    style.innerHTML = style_rules;
    document.getElementsByTagName('head')[0].appendChild(style);
}

