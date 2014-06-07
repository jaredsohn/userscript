// ==UserScript==
// @name        Base class
// @namespace   Made by Heya on Neofriends.net
// @version     1
// ==/UserScript==
function base(title, url, onload, run) {
        if(dom.class('nav_image', 8).getElementsByTagName('img')[0].src != 'http://i40.tinypic.com/312k650.gif') {
            dom.class('nav_image', 8).getElementsByTagName('img')[0].src = 'http://i40.tinypic.com/312k650.gif';
			dom.class('dropdown', 8).innerHTML = '';
        }

        dom.class('dropdown', 8).innerHTML = dom.class('dropdown', 8).innerHTML+'<li><a href="http://www.neopets.com/'+url+'"> &raquo; '+title+'</a></li>';

	if (window.location.href.match(url)) {
		document.title = title;
		dom.class('content', 0).innerHTML = "<div id='program_bar'><div id='topbar_header'><table cellpadding='0' cellspacing='0'><tr><td style='webkit-border-radius:15px 0px 0px 0px; moz-border-radius:15px 0px 0px 0px; border-radius:15px 0px 0px 0px; background: #296aff; font-size: 20pt; font-family: Arial Black, Gadget, sans-serif; color: #fcb50a'><b style='padding-left: 10px;'>"+title+"</b></td><td style='background: url(http://i44.tinypic.com/2qiabg6.gif); width: 70px; height: 57px;'></td><td style='width: 240px;'><div id='buttons'></div></td><td><div id='count_down'></div></td></tr></table></div><div id='status'>Idle</div></div><br /><style>#program_bar { background: #F0F0EE; border: 1px #999 solid; webkit-border-radius:15px 15px 15px 15px; moz-border-radius:15px 5px 15px 15px; border-radius:15px 15px 15px 15px; } #count_down { font-family: Impact, Charcoal, sans-serif; font-size: 20px; } #status { font-family: Impact, Charcoal, sans-serif; padding: 5px; font-size: 15pt; text-align: center; } #topbar_header { background: #fcb50a; border-bottom: 1px #999 solid; webkit-border-radius:15px 15px 0px 0px; moz-border-radius:15px 5px 0px 0px; border-radius:15px 15px 0px 0px; } .main_header { padding: 0px; font-size: 20pt; font-family: Arial Black, Gadget, sans-serif; color: #296aff; background: #fcb50a; border-bottom: 1px #999 solid; webkit-border-radius:15px 15px 0px 0px; moz-border-radius:15px 15px 0px 0px; border-radius:15px 15px 0px 0px; } .main_content { background: #F0F0EE; border: 1px #999 solid; webkit-border-radius:15px 15px 15px 15px; moz-border-radius:15px 15px 15px 15px; border-radius:15px 15px 15px 15px; } .main { padding: 10px; } textarea { padding-left: 5px; border: none; width: 500px; webkit-border-radius:0px 0px 15px 15px; moz-border-radius:0px 0px 15px 15px; border-radius:0px 0px 15px 15px; } .textbox { padding: 3px; border: 1px #999 solid; webkit-border-radius:5px 5px 5px 5px; moz-border-radius:5px 5px 5px 5px; border-radius:5px 5px 5px 5px; } .button { padding: 2px; padding-left: 10px; background: #296aff; padding-right: 10px; border: 1px #000000 solid; webkit-border-radius:5px 5px 5px 5px; moz-border-radius:5px 5px 5px 5px; border-radius:5px 5px 5px 5px; } .button:hover { background: #ffa800; }</style>";
		onload();
	
		dom.name('run', 0).addEventListener('click', run, true);
		
		setstatus = function(status) {
			dom.id('status').innerHTML = status;
		}
		
		isrunning = function() {
			if(GM_getValue('isrunning', "0") == "0") {
				return false;	
			} else {
				return true;
			}	
		}
		
		getbetween = function(source, firstitem, seconditem) {
			return new RegExp(firstitem.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1')+'((?:.|\n)*)'+seconditem.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1')).exec(source)[1];
		}
		
		if(isrunning()) {
			run();
		}
	}
}