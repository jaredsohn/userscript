// ==UserScript==
// @name          BasecampBlues
// @namespace     http://userscripts.org/scripts
// @description   change style on projectpath.com and enhance to-do functionality.
// @include       https://*.projectpath.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body, html { background-color: #FFF !important; background-image: url(http://amplifystudios.com/App_Images/Assets/fadeBottom.jpg) !important; background-repeat: repeat-x; background-position: bottom; }' +
'.Right p, .Right h1 {  }' +
'.Right h2, .Right a:link, .Right a:visited { color: #0078B3 !important; }' +
'.Right a:hover { color: #390 !important; background-color: transparent !important; }' +

'#Header { background-color: #003A9E ! important; background-image: url(http://amplifystudios.com/App_Images/Assets/footerbg.gif) !important; }' +
'#Header h1 { color: #CCC ! important; margin-right: 0px !important; text-align: center !important; }' +
'#Header h1 span { color: #FFF ! important; }' +
'#Header h3, #Header h3 a:link, #Header h3 a:visited { color: #FFF ! important; }' +
'#Header h3 a:hover { background-color: #FFF ! important; color: #666 !important; }' +

'#Tabs a:link, #Tabs a:visited { background-color: #D9EAF2 ! important; color: #666 !important; border-color: transparent transparent #D9EAF2 #FFF !important; }' +
'#Tabs a:hover { background-color: #390 !important; color: #FFF !important; }' +
'#Tabs ul#MainTabs a.current:link, #Tabs ul#MainTabs a.current:visited { background-color: #FFF !important; color: #360 !important; background-image: none !important; border-bottom: 1px solid #FFF !important; }' +

'.Left .col, .Full .col { background-image:none !important; padding-right: 0 !important; }' +
'.Left .col a, .Full .col a { color: #0078B3 !important; }' +
'.Left .col a:hover, .Full .col a:hover { color: #390 !important; background-color: transparent !important; }' +
'div#CategoryList a.category_link:hover {background-color: transparent !important;}' +
'.bottom { background-image:none !important; }' +
'.item { border: 1px solid #666 !important; padding: 10px 0; position:relative;cursor:pointer; }');




//start to-do edits
function dw()
{
	var ct;
	
	var head, sscript;
    head = document.getElementsByTagName('body')[0];
    if (!head) { alert("oops");return; }
	sscipt = document.createElement('script');
    sscipt.type = 'text/javascript';
    sscipt.innerHTML = "function cct( p, t ){" +
	"switch( t ){" +
	"case 1: p.style.backgroundColor = \"#CFC\"; p.setAttribute( 'onclick', 'javascript:cct(this, 2)'); break;" +
	"case 2: p.style.backgroundColor = \"#FFC\"; p.setAttribute( 'onclick', 'javascript:cct(this, 3)'); break;" +
	"case 3: p.style.backgroundColor = \"#FCC\"; p.setAttribute( 'onclick', 'javascript:cct(this, 4)'); break;" +
	"default: p.style.backgroundColor = \"#FFF\"; p.setAttribute( 'onclick', 'javascript:cct(this, 1)'); break;" +
	"}}";
	//"if( p.getAttribute('style') == null || p.getAttribute('style') == '' ){" +
	//"p.style.backgroundColor = \"#CFC\";}" +
	//"else{p.style.backgroundColor = null;}}";
    head.appendChild(sscipt);	
	
	ct = document.getElementsByTagName('input');
	for( var i = 0; i < ct.length; i++ )
	{
		if( ct[i].tyle = "checkbox" )
		{
			if( ct[i].parentNode.className == "controls hover_target" && ct[i].className != 'dontUseAgain' )
			{
				ct[i].parentNode.parentNode.setAttribute( 'onclick', "javascript:cct(this, 1)");
			}

		}
	}
}



window.addEventListener('load',dw,true);

(function() {

    var BaseCampTodoSpan =
    {
        go: function()
        {
            spanList = document.getElementsByTagName('span');

            for (a = 0; a < spanList.length; a++)
            {
                span = spanList[a];
                try
                {
                    if (span.getAttribute('style').match(/^background:/i))
                    {
                        span.setAttribute('style', span.getAttribute('style').replace(/^background[^;]*;/i, 'border-left: 12px solid yellow; padding-left: 5px;'));
                    }
                }
                catch(e) {}
            }
        }
    }

    BaseCampTodoSpan.go();

})();