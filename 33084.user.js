/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Userscripts.org TOC
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/33084
// @description     Adds a TOC for Userscripts.org metadata
// @description     Userscripts.org TOC v1.7 Beta
// @copyright       2008 Jerone
// @version         v1.7 Beta
// @versiontext     Added exclution of "noTOC" in cite attribute and fixed bug with headers in another node.
// @browser         FF3
// @include         http://userscripts.org/scripts/show/*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Framework Check
// - User Settings
// - User Script
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
// History:
// [+] = added; [-] = removed; [/] = fixed; [*] = updated;
// - 03-09-2008 10:00 [v1 Alpha]:
//   [+] initial release;
// - 05-09-2008 10:00 [v1.1 Beta]:
//   [+] option to choose position;
// - 07-09-2008 10:00 [v1.2 Beta]:
//   [/] problem with padding/margin for the list;
// - 08-09-2008 10:30 [v1.3 Beta]:
//   [+] option to hide when no headers;
// - 11-09-2008 11:45 [v1.4 Beta]:
//   [*] improved element finding;
//   [+] multiple levels indent;
//   [+] support for levels 5 and 6;
//   [+] TOC removed on print;
// - 24-09-2008 13:00 [v1.5 Beta]:
//   [+] added numbering + custom numbering;
//   [/] use only headers with text;
//   [*] links are trimmed;
//   [*] updated layout;
// - 21-11-2008 21:00 [v1.5.1 Beta];
//   [/] fixed small bug in framework check;
// - 10-01-2009 19:30 [v1.6 Beta]:
//   [*] updated framework;
// - 12-01-2009 14:30 [v1.7 Beta]:
//   [+] added exclution of "noTOC" in cite;
//   [/] fixed bug with headers in a node;
//   [*] cleaned up code;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - remember hider;
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work without it's framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK CHECK ***//
if(!window.US||!window.US.Framework){if(window.US!==null&&confirm(String.fromCharCode(83,111,109,101,116,104,105,110,103,32,119,101,110,116,32,119,114,111,110,103,32,119,105,116,104,32,116,104,101,32,85,83,32,70,114,97,109,101,119,111,114,107,46,32,92,110,77,97,107,101,32,115,117,114,101,32,105,116,32,105,115,32,105,110,115,116,97,108,108,101,100,32,99,111,114,114,101,99,116,108,121,32,111,114,32,114,101,105,110,115,116,97,108,108,32,116,104,101,32,115,99,114,105,112,116,46,32,92,110,92,110,68,111,32,121,111,117,32,119,97,110,116,32,116,111,32,103,111,32,116,111,32,116,104,101,32,115,99,114,105,112,116,115,32,104,111,109,101,112,97,103,101,63).replace(/\\n/g,"\n")))GM_openInTab("http://userscripts.org/scripts/show/39678");window.US=null;return;}else if(!window.US.Framework())return;

var language=new US.Language({langMod:"browser",locals:{
	'en' : {
		'USOTOC' : {
			'toc'		: 'TOC',  // Abbreviation;
			'toclong'	: 'Table Of Contents',  // Full description;
			'hide'		: 'hide',
			'show'		: 'show'}},
	'nl':{'USOTOC':{'toc':'TOC','toclong':'Table Of Contents','hide':'verbergen','show':'weergeven'
}}}});

new US.Update({check4Update:true,updateTime:1*60*60*1000,language:"browser",title:"Userscripts.org TOC",thisVersion:'v1.7 Beta',versionUrl:33084,updateUrl:33084});

eval(US.Functions.prototype({String:["truncate","strip","trim"]}));



//*** USER SETTINGS ***//
const tocPosition	= 2;			// [Integer] float position: 0=whole screen, 1=left, 2=right;
const hideNone		= true;			// [Boolean] hide when there are no headers;
const showNumbering = true;			// [Boolean] add numbering;
const customNrs		= function(n){	// [Function] use custom numbering (parameter "n" is an Array with all numbering, starting with 1);
						return n.join(".").toString() + ") ";
					  };



//*** USER SCRIPT ***//
var USOTOC={
	init: function(){
		if((descrip=$gi("full_description"))){
			var headers=[];
			if(document.evaluate){  // XPath;
				Array.forEach($x(".//h1|.//h2|.//h3|.//h4|.//h5|.//h6",descrip),function(node){
					if(!/noTOC/i.test($ga(node,"cite"))){
						headers.push(node);
			}	});	}
			else if(document.getElementsByTagName){  // DOM;
				Array.forEach($gt("*",descrip),function(node){
					if(node.tagName.match(/^h[1-6]$/i) && !/noTOC/i.test($ga(node,"cite"))){
						headers.push(node);
			}	});	}
				
			if(hideNone && headers.length==0)return;
			
			var toc=$ce("DIV");
			$sa(toc,"id","USOTOC");
			$sa(toc,"style","float:"+(typeof(tocPosition)!="undefined"?(tocPosition==1?"left":(tocPosition==2?"right":"none")):"right")+"; display:block; min-width:20%; max-width:50%; background-color:#F9F9F9; border:1px solid #AAAAAA; padding:5px; margin:0 5px 5px 5px; overflow:auto;");
			$ib(descrip.firstChild,toc);
			
			$addCSS('@media print{#USOTOC{display:none; visibility:hidden;}}');
			
			var curList=$ce("UL");
			$sa(curList,"id","tocUl");
			$sa(curList,"style","padding:0px; margin:0px; list-style-position:inside; white-space:nowrap;");
			
			var tocList=[curList];
			var curLevel=1;
			var oldLevel=0;
			var numbering=[];
			headers.forEach(function(heading,index){
				if(heading.textContent.length>0){
					var headLevel=parseInt(heading.tagName.match(/\d/));
	
					while(curLevel<headLevel){
						var previousList=curList;
						tocList.push(previousList);
						curList=$ce("UL");
						$sa(curList,"style","padding:0 0 0 20px; margin:0px; list-style-position:inside; white-space:nowrap;");
						$ac(previousList,curList);
						curLevel++;
					}
					while(curLevel>headLevel){
						curList=tocList.pop();
						curLevel--;
					}
					
					if(showNumbering){
						numbering[curLevel-1]=(numbering[curLevel-1]?numbering[curLevel-1]+1:1);  // som++;
						for(var i=numbering.length-1; i>=0; i--){  // fill empty;
							if(typeof(numbering[i])=="undefined" || numbering[i]=="undefined" || numbering[i]==null){
								numbering[i]=1;
						}	}
						var tempLevel=oldLevel;
						while(tempLevel>curLevel){  // remove unneeded;
							numbering.pop();
							tempLevel--;
						}
						oldLevel=curLevel;
						
						var text=$ce("SPAN");
						$ih(text,customNrs(numbering));
						$sa(text,"style","font-size:12px; font-weight:bold;");
					}
					
					var link=$ce("A");
					$sa(link,"href","#" + index + "_" + heading.textContent.trim().strip(/:$/).trim());
					$ac(link,$ct(heading.textContent.trim().strip(/:$/).truncate(40)));  // doesn't convert to HTML;
					if(showNumbering)$af(link,text);
					
					var item=$ce("LI");
					$sa(item,"style","margin-left:4px;");
					$ac(item,link);
					$ac(curList,item);
					
					var anchor=$ce("A");
					$sa(anchor,"name",index + "_" + heading.textContent.trim().strip(/:$/).trim());
					$ib(heading,anchor);
				}
			});
			$ac(toc,tocList[0]);

			var tocHead=$ce("H3");  // excluded from search;
			$sa(tocHead,"style","margin:0;");
			
			var tocHeadHider=$ce("DIV");
			$sa(tocHeadHider,"id","tocHeadHider");
			$sa(tocHeadHider,"style","display:inline; font-weight:normal; float:right; margin:2px;");
			var tocHeadHiderSmall=$ce("SMALL");
			$sa(tocHeadHiderSmall,"style","cursor:crosshair;");
			$sa(tocHeadHiderSmall,"title",language.localise(['USOTOC','hide']));
			$ac(tocHeadHiderSmall,$ct("[−]"));  // &minus;
			$addEvent(tocHeadHiderSmall,"click",function(){
				$hs($gi("tocUl"),3);
				$sa(this,"title",($hs($gi("tocUl"),0,true)?language.localise(['USOTOC','show']):language.localise(['USOTOC','hide'])));
				$oc(this,$ct($hs($gi("tocUl"),0,true)?"[+]":"[−]"));
			});
			$ac(tocHeadHider,tocHeadHiderSmall);
			$ac(tocHead,tocHeadHider);
			
			var tocHeadAbbr=$ce("ABBR");
			$sa(tocHeadAbbr,"title",language.localise(['USOTOC','toclong']));
			$ih(tocHeadAbbr,language.localise(['USOTOC','toc']));
			$ac(tocHead,tocHeadAbbr);
			$ac(tocHead,$ct(":  "));
			
			$af(toc,tocHead);
}	}	}

USOTOC.init();  // execute;



//*** STATISTICS ***//
// Chars (exclude spaces): 7.987
// Chars (include spaces): 9.211
// Chars (Chinese): 2
// Words: 765
// Lines: 230