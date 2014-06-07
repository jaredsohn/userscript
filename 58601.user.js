// ==UserScript==
// @name           Whirlpool Last Read - Cross-browser
// @namespace      WLR_Cross_browser
// @description    Whirlpool Last Read - Cross-browser
// @exclude       http://forums.whirlpool.net.au/forum-replies-print.cfm*
// @exclude       http://forums.whirlpool.net.au/forum-replies-archive.cfm*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*p=-2*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*&ux*
// @include        http://forums.whirlpool.net.au/*
// @match        http://forums.whirlpool.net.au/*
// @version        1.1.7
// ==/UserScript==

//Whirlcode2 code Copyright Simon Wright - http://whirlpool.net.au/blog/


/***todo
Looping throught twice :( - might be ok
add a stop tracking button/shortcut to threads?
better colour scheme
***/


var wlrX = {
		u:document.URL,
		b:document.querySelector('body'),
		opdInputs:{},
		create:{},
		isCtrl:null,
		whirlcode2:function (f,w){var o=f;var s=0;var g={};if(typeof w=="string"){g={whirlcode:(w.indexOf("w")>-1),headings:(w.indexOf("h")>-1),paragraph:(w.indexOf("p")>-1),entities:(w.indexOf("e")>-1),basichtml:(w.indexOf("b")>-1),autolink:(w.indexOf("a")>-1),wordfilter:(w.indexOf("f")>-1),linelimit:(w.indexOf("l")>-1)};}else{if(typeof w=="object"){g=w;}else{g={whirlcode:true,headings:true,paragraph:true,entities:true,basichtml:true,autolink:true,wordfilter:true,linelimit:true};}}o=o.replace(/\u00AB/g,"&laquo;").replace(/\u00BB/g,"&raquo;").replace(/</g,"\u00AB").replace(/>/g,"\u00BB");o=o.replace(/\r\n?/g,"\n").replace(/([^\n])\n([=#*]{1,3}\s|[+]{3}|[:$]\s|@[0-9]{1,12}\s|\+\+\{)/g,"$1\n\n$2").replace(/([^\n])\n(-----)/g,"$1\n\n$2").replace(/([^\n])\n([^\n])/g,"$1<br>$2").replace(/\n{2,}/g,"\n");o=o.replace(/\u00A0/g," ");if(g.whirlcode){o=o.replace(/\[\[(([-A-Z0-9_]+?)\|(.+?)|([-A-Z0-9_]+?))\]\]/ig, "<a class=\"wiki\" href=\"/wiki/$2$4\">$3$4</a>");var n=[{code:"\\*",tag:"strong"},{code:"/",tag:"em"},{code:"\\\\",tag:"sub"},{code:"\\^",tag:"sup"},{code:"-",tag:"strike"},{code:"#",tag:"tt"},{code:"\\(",tag:"small",code2:"\\)"},{code:'"',tag:"span",plus:' class="wcrep1"'},{code:"'",tag:"span",plus:' class="wcrep2"'},{code:"`",tag:"span",plus:' class="wcgrey"'},{code:"~",tag:"span",plus:' class="wcserif"'},{code:"\\+",tag:"span",plus:' class="wcauth"'},{code:"_",tag:"span",plus:' class="wcspoil"'},{code:"\\?",tag:"a",plus:' href="http://www.google.com.au/search?q=$1"'}];for(s=0;s<n.length;s++){o=o.replace(new RegExp("\\["+n[s].code+"(.+?)"+(n[s].code2?n[s].code2:n[s].code)+"\\]","g"),"<"+n[s].tag+(n[s].plus?n[s].plus:"")+">$1</"+n[s].tag+">");}o=o.replace(/\[\.(.+?)\.\]/g,"[$1]");}if(g.basichtml){var d=[{tag:"a",inner:' href="(/|https?://|mailto:)[^"]+?"'},{tag:"strong|b"},{tag:"em|i"},{tag:"small"},{tag:"tt"},{tag:"sup"},{tag:"sub"},{tag:"strike"}];for(s=0;s<d.length;s++){o=o.replace(new RegExp("\u00AB("+d[s].tag+")("+(d[s].inner?d[s].inner:"()")+")\u00BB(.+?)\u00AB/\\1\u00BB","ig"),"<"+d[s].tag.split("|")[0]+"$2>$4</"+d[s].tag.split("|")[0]+">");}}if(g.entities){o=o.replace(/&(\s)/ig,"&amp;$1").replace(/ -- /ig," &mdash; ").replace(/ - /ig," &ndash; ").replace(/\(c\)/ig,"&copy;").replace(/\(r\)/ig,"&reg;").replace(/\(tm\)/ig,"&trade;").replace(/(\s)1\/4([^0-9])/ig,"$1&frac14;$2").replace(/(\s)1\/2([^0-9])/ig,"$1&frac12;$2").replace(/(\s)3\/4([^0-9])/ig,"$1&frac34;$2");}if(g.wordfilter){o=o.replace(/fuck(ed|ing|er)/ig,"flapp$1").replace(/fuck/ig,"flap").replace(/cunt/ig,"legend");}if(g.autolink){o=" "+o;o=o.replace(/([^""\/])\b(https?:\/\/|ftp:\/\/|file:\/\/|www\.)([-A-Z0-9+&@#\/%?=~_|!:,.;]*(?:_\([-A-Z0-9+&@#\/%=~_|?!:,.;]*\)|[-A-Z0-9+&@#\/%=~_|]))/ig,'$1<a href="$2$3">$2$3</a>');o=o.replace(/href="www\./ig,'href="http://www.');o=o.replace(/([^"":])\b(?:mailto:)?([A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4})\b/ig,'$1<a href="mailto:$2">$2</a>');}var b=o.split("\n");var l=[];var k="";for(s=0;s<b.length;s++){k=b[s].replace(/^\s\s*/,"").replace(/(\s|<br>)+$/,"");l[s]="";if(g.headings&&k.search(/^===\s+/)!=-1){l[s]="2";k=k.replace(/^===\s+/,"");}if(g.headings&&k.search(/^==\s+/)!=-1){l[s]="3";k=k.replace(/^==\s+/,"");}if(g.headings&&k.search(/^=\s+/)!=-1){l[s]="4";k=k.replace(/^=\s+/,"");}if(g.paragraph&&k.search(/^:\s+/)!=-1){l[s]=":";k=k.replace(/^:\s+/,"");}if(g.paragraph&&k.search(/^\$\s+/)!=-1){l[s]="$";k=k.replace(/^\$\s+/,"");}if(g.paragraph&&k.search(/^-----$/)!=-1){l[s]="-";}if(g.paragraph&&k.search(/^\+\+\{.+\}$/)!=-1){l[s]="+";k=k.replace(/^\+\+\{(.+)\}$/,"$1");}if(g.paragraph&&k.search(/^@[0-9]{1,12}\s+/)!=-1){l[s]="@";k=k.replace(/^@([0-9]{1,12})\s+/,"$1 ").replace(/<br>/,"</p>\n<p>");}if(g.paragraph&&k.search(/^[*#]{1,3}\s+/)!=-1){l[s]=k.match(/^([*#]{1,3})\s+/)[1];k=k.replace(/^[*#]{1,3}\s+/,"");}if(l[s].length==0&&k.length>0){l[s]="p";}switch(l[s].charAt(0)){case"2":k="<h2>"+k+"</h2>";break;case"3":k="<h3>"+k+"</h3>";break;case"4":k="<h4>"+k+"</h4>";break;case"@":k='<p class="reference">'+k+"</p>";break;case"#":case"*":k="<li>"+k+"</li>";break;case"p":case":":k="<p>"+k+"</p>";break;case"$":break;case"-":k="<hr>";break;case"+":k='<p class="include" title="'+k+'">(include: '+k+")</p>";break;default:k="deletethisline";}b[s]=k;}var r=0;var p="";for(s=0;s<b.length;s++){if(l[s]==":"){if(s==0||l[s]!=l[s-1]){b[s]="<blockquote>\n"+b[s];}if(s==b.length-1||l[s]!=l[s+1]){b[s]+="\n</blockquote>";}}else{if(l[s]=="$"){if(s==0||l[s]!=l[s-1]){b[s]="<pre>"+b[s];}if(s==b.length-1||l[s]!=l[s+1]){b[s]+="</pre>";}}else{if(l[s].match(/(\*|#)+/)){for(r=2;r>=0;r--){p=l[s].charAt(r);if(p.length&&(s==0||p!=l[s-1].charAt(r))){b[s]=(p=="*"?"<ul>\n":"<ol>\n")+b[s];}if(p.length&&(s==b.length-1||p!=l[s+1].charAt(r))){b[s]+=(p=="*"?"\n</ul>":"\n</ol>");}}}}}}o=b.join("\n");o=o.replace(/deletethisline\n?/g,"");o=o.replace(/(<a.+?>)http:\/\/forums\.whirlpool\.net\.au(\/.+?<\/a>)/g,"$1$2").replace(/(<a.+?>)http:\/\/(wpool\.com|whrl\.pl)(\/.+?<\/a>)/g, "$1$2$3").replace(/<a href=""?(\/|http:\/\/([a-z.]*whirlpool\.net\.au|wpool\.com|whrl\.pl)\/)/ig,'<a class="internal" href="$1').replace(/<a href=""?http/ig,'<a class="external" rel="nofollow" target="_blank" href="http').replace(/<a href=""?mailto/ig,'<a class="email" href="mailto').replace(/<span class="wcauth"> ?([0-9]{1,12})([^<]+?)<\/span>/ig,'<span class="wcauth"><a onclick="jumpToReplyId($1);return false;" title="$1">$2</a></span>').replace(/<p class="reference">([0-9]{1,12}) (.+?)<\/p>/ig,'<p class="reference"><a onclick="jumpToReplyId($1);return false;" title="$1">$2</a></p>');o=o.replace(/[\u2580\u2581\u2582\u2583\u2584\u2585\u2586\u2587\u2588\u2589\u258A\u258B\u258C\u258D\u258E\u258F\u2590\u2591\u2592\u2593\u2594\u2595\u2596\u2597\u2598\u2599\u259A\u259B\u259C\u259D\u259E\u259F]/g,"?");if(g.linelimit){var x=o;var q=[];var u=30;var c=/^((<[^>]+>|[^<\s]){0,30}\s+)+/;var h=/^<\/?[p|h1|h2|h3|ul|ol|li|hr|br]>/;var t=/^&\w+?;/;var v=0;var a=0;while(x.length){if(x.length<u){q.push(x);break;}var m=x.match(c);var e=x.match(h);if(m&&m[0]){a=m[0].length;v=0;}else{if(x.charAt(0)=="<"&&x.indexOf(">")>-1){a=x.indexOf(">");if(x.match(h)){v=0;}}else{if(x.match(t)){a=(x.indexOf(";")>-1)?1+x.indexOf(";"):x.length;v++;}else{a=1;v++;}}}q.push(x.substring(0,a));x=x.substring(a);if(v>=u){q.push("<wbr>");v=2;}}o=q.join("");}o=o.replace(/\u00AB/g,"&lt;").replace(/\u00BB/g,"&gt;");return o;},
		nA:navigator.userAgent,
		browser:null,	
		checkbrowser:function(){
			if(wlrX.nA.indexOf('MSIE')>-1) {  
				wlrX.browser='IE';
			} 				
			else if(wlrX.nA.indexOf('Safari')>-1){
				wlrX.browser='Safari';
				if(wlrX.nA.indexOf('Chrome')>-1){	//Chrome has the word 'Safari' in its user agent string
					wlrX.browser='Chrome';		
				}
			}
			else if(wlrX.nA.indexOf('Firefox')>-1){
				wlrX.browser='Firefox';
			}
			else if(window.opera){  
				wlrX.browser='Opera';			
			}										
		},
		addStyle:function(css){
			if(wlrX.browser=='IE'){
				PRO_addStyle(css);
			}
			else if(wlrX.browser=='Firefox'){
				GM_addStyle(css);
			}
			else{
				var style = document.createElement('style');
				style.textContent = css;
				document.querySelector('head').appendChild(style);
			}
		},
		domTools:{
			nextEl:function(node) {	//IE doesn't support next/previousElementSibling etc. so hook into jQuery for this bit (I don't know why the "while (node && node.nodeType..." isn't working //http://www.quirksmode.org/dom/w3c_traversal.html 
				if(node){				
					if(wlrX.browser=='IE'){
						node = $(node).next()[0];
					}
					else{
						node = node.nextElementSibling;
					}
					return node;
				}
			},
			prevEl:function(node) {
				if(node){				
					if(wlrX.browser=='IE'){
						node = $(node).prev()[0];
					}
					else{
						node = node.previousElementSibling;
					}
					return node;
				}
			},
			first:function(node){
				if(node){			
					if(wlrX.browser=='IE'){
						node = $(node).children()[0];
					}
					else{
						node = node.firstElementChild;
					}
					return node;	
				}
			},
			last:function(node){
				if(node){
					if(wlrX.browser=='IE'){
						node = $(node).children(':last')[0];
					}
					else{
						node = node.lastElementChild;
					}
					return node;	
				}
			},
			getScroll:function(){
				var s;
				if(wlrX.browser=='IE'){
					var de=document.documentElement;
					s=(de.scrollTop+de.clientHeight);
				}
				else{
					s=(window.pageYOffset+window.innerHeight);
				}
				return s;
			},
			getDocWidth:function(){
				var w;
				if(wlrX.browser=='IE'){
					w=$(document).width();
				}
				else if(wlrX.browser=='Opera'){
					w=window.innerWidth;
				}
				else{
					w=document.width;
				}
				return w;
			},			
			getOffSet:function(n){
				var topCoor=0;
				while( n !== null ){
					topCoor += n.offsetTop;
					n = n.offsetParent;
				}	
				return topCoor;
			}
		},
		event:{	//cross-browser events   http://ejohn.org/blog/flexible-javascript-events/
			add:function( obj, type, fn ) {
			  if ( wlrX.browser=='IE' ) {
				/*obj['e'+type+fn] = fn;
				obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
				obj.attachEvent( 'on'+type, obj[type+fn] );*/
				/***above seems to breaks sometimes so hook into jQuery for IE again***/
				$(obj).bind(type, fn);
			  } else{
				obj.addEventListener( type, fn, false );
				}
			},
			remove:function( obj, type, fn ) {
			  if ( wlrX.browser=='IE' ) {
				/*obj.detachEvent( 'on'+type, obj[type+fn] );
				obj[type+fn] = null;*/
				$(obj).unbind(type, fn);
			  } else{
				obj.removeEventListener( type, fn, false );
				}
			}
		},
		storage:{
			/******
			WLR storage structure:
			
			'WLR' is the main key used by localStorage (e.g. localStorage.setItem('WLR',stringifiedjson);
			this is what comes out after we parse stringifiedjson with JSON.parse(); -
			{
				lastRead:{
					213412:{
						threadNumber:213412,
						pageNumber:2,
						anchorNumber:40
					}
				},
				wlrXcreatetarvalue:'blah blah',
				ptObj:{	
					modewc:{name:'modewc',c:true},
					modeht:{name:'modeht',c:false},
					modest:{name:'modest',c:true},
					modewl:{name:'modewl',c:true}	
				}
			
			}
			the wlrXcreatetarvalue & ptObj keys are deleted after they are used on the page redirect
			********/			
			getStorage:function(){
				var	g=localStorage.getItem('WLR');
				if(g){
					var par = JSON.parse(g);
					var m=g.match(/threadNumber/g);
					if(m && m.length>4999){		//limit it to 5000 threads
						for (var e in par.lastRead ) {	//when you add to an object, it's placed last, so the first key is always the oldest (oh hai bravo...)
							delete par.lastRead[e];
							break;
						}						
					}
					g=par;
				}
				return g;
			},		
			saveStorage:function(ob){			//everything is stored to localStorage on beforeUnLoad
				var getS=wlrX.storage.getStorage();
				var obT=ob.threadNumber;
				if(!getS){
					getS={};
				}
				if(!getS.lastRead){
					getS.lastRead={};
				}
				if(ob.wlrXcreatetarvalue){
					getS.wlrXcreatetarvalue=ob.wlrXcreatetarvalue;
				}
				if(ob.ptObj){
					getS.ptObj=ob.ptObj;
				}
				else if(obT){
					getS.lastRead[obT]=ob;
				}
				localStorage.setItem('WLR', JSON.stringify(getS));
			},
			deleteStorage:function(lastRObj){
				var s=wlrX.storage.getStorage();
				if(typeof lastRObj == "object"){
					var lroTHN=lastRObj.threadNumber;
					if(s.lastRead[lroTHN]){
						delete s.lastRead[lroTHN];
					}
				}
				else if(typeof lastRObj == "string"){
					delete s[lastRObj];
				}
				localStorage.setItem('WLR', JSON.stringify(s));									
			}
		},	
		tracker:{
			forumTracker:function(){
				
				var uLa = document.querySelector('#left .userinfo dt a');
				var userLink = uLa.querySelector('span').innerHTML;
				var grabTrs;
				if(wlrX.browser=='IE'){ //IE8 doesn't yet support :not() selectors - http://ejohn.org/apps/selectortest/ - so hook into jQuery again for IE
					grabTrs = $("#threads>table>tbody>tr:not(.pointer):not(.deleted):not(.section)");
				}
				else{
					grabTrs = document.querySelectorAll("#threads>table>tbody>tr:not(.pointer):not(.deleted):not(.section)");
				}
				var uUrlTest=wlrX.u.indexOf('/user/');
			
				if(uUrlTest>-1) {
					var userNumber = uLa.href.split('user/')[1];
					var urlUserNumber = document.location.href.split('/user/')[1].split('&')[0];
					if(userNumber===urlUserNumber){
						var h2s = document.querySelectorAll('#userprofile div h2');
						for(var j=0;j<h2s.length;j++){
							h2s[j].style.cursor='pointer';
							h2s[j].setAttribute('title','Click to show');
							wlrX.domTools.nextEl(h2s[j]).style.display='none';
							wlrX.event.add(h2s[j], "click", function(e){
								var neTab=wlrX.domTools.nextEl(this);
								if(neTab.style.display=='none'){
									neTab.style.display='block';
								}
								else{
									neTab.style.display='none';
								}
							});											
						}
					}
				}
				if(wlrX.tempDb && wlrX.tempDb.lastRead){

					for(var i=0;i<grabTrs.length;i++){
						var cItr = grabTrs[i];
						var tds={};
						tds.lastTd = wlrX.domTools.last(cItr);
						var bum = wlrX.domTools.first(tds.lastTd);
						var threadNum = Number(bum.href.split('t=')[1].split('&')[0]);
						if(wlrX.tempDb.lastRead[threadNum]){

							if(uUrlTest<0){
								tds.title = wlrX.domTools.first(cItr);
								tds.group = wlrX.domTools.nextEl(tds.title);
								tds.newest = wlrX.domTools.prevEl(tds.lastTd);
								tds.oldest = wlrX.domTools.prevEl(tds.newest);
								tds.reads = wlrX.domTools.prevEl(tds.oldest);
								tds.reps = wlrX.domTools.prevEl(tds.reads);								
							}
							else{
								tds.reps = grabTrs[i].querySelector('.reps+td');
								tds.reps2 = wlrX.domTools.prevEl(tds.reps);
								tds.title = wlrX.domTools.prevEl(tds.reps2);
								tds.newest = wlrX.domTools.nextEl(tds.reps);
							}
							var repsNum = Number(tds.reps.innerHTML)+1;
							var lrNum = wlrX.tempDb.lastRead[threadNum].anchorNumber;

							var sp=document.createElement('span');
							sp.setAttribute('class','small wlrx');
							
							var spA =document.createElement('a');
							spA.setAttribute('class','stopTrack');
							spA.setAttribute('title','Stop Tracking Thread');
							spA.setAttribute('threadNum',threadNum);
							spA.setAttribute('href','#');
							spA.innerHTML='S';
							
							sp.appendChild(spA);
							tds.reps.appendChild(sp);
							
							wlrX.event.add(spA, 'click', function(e){
								e.preventDefault();
								wlrX.storage.deleteStorage(wlrX.tempDb.lastRead[Number(this.getAttribute('threadNum'))]);
								var pNode = this.parentNode;
								var gettdsTop = pNode.parentNode.parentNode.querySelectorAll("td");
								for(var i=0;i<gettdsTop.length;i++){
									gettdsTop[i].removeAttribute('style');
									if(i==(gettdsTop.length-1)){
										var lastA = gettdsTop[i].querySelector("a");
										lastA.href=lastA.href.split('&')[0]+'&p=-1#bottom';
									}
								}								
								pNode.parentNode.removeChild(pNode);
								return false;
							});		
							if(wlrX.u.indexOf('/user/')<0){
								var lfpLast=1,lfp=wlrX.domTools.last(tds.title);	//look for pages
								if(lfp.nodeName=='SPAN'){
									var lelC = wlrX.domTools.last(lfp);
									if(lelC){
										lfpLast = (wlrX.browser=='IE')?Number(lelC.innerText):Number(lelC.textContent); 
									}
								}
							}
							bum.href=bum.href.split('&')[0]+'&p='+wlrX.tempDb.lastRead[threadNum].pageNumber.toString()+'#r'+lrNum.toString();
							bum.title="Jump to last read post";
							if(repsNum>lrNum){	//new post
							
								if(wlrX.u.indexOf('/user/')<0){	//because we can't tell how many pages are in the thread on user pages
									var sp1=document.createElement('span');
									sp1.setAttribute('class','small wlrx');
									
									var spA1 =document.createElement('a');
									spA1.setAttribute('class','markRead');
									spA1.setAttribute('title','Mark All Posts As Read');
									spA1.setAttribute('threadNum',threadNum);
									spA1.setAttribute('NumOfPages',lfpLast);
									spA1.setAttribute('NumOfReplies',repsNum);
									spA1.setAttribute('href','#');
									spA1.innerHTML='M';
									sp1.appendChild(spA1);
									tds.reads.appendChild(sp1);	
									var numNewPosts = repsNum-lrNum;
									tds.reps.setAttribute('title',numNewPosts.toString()+' new posts');
									
									wlrX.event.add(spA1, 'click', function(e){
										e.preventDefault();
										var trNumber = Number(this.getAttribute('threadNum'));
										var pNumber = Number(this.getAttribute('NumOfPages'));
										var anNumber = Number(this.getAttribute('NumOfReplies'));
										wlrX.tempDb.lastRead[trNumber]={
											threadNumber:trNumber,
											pageNumber:pNumber,
											anchorNumber:anNumber									
										};
										var pNode = this.parentNode;
										var gettdsMark = pNode.parentNode.parentNode.querySelectorAll("td"); //see if I can use tds={} instead
										for(var i=0;i<gettdsMark.length;i++){
											gettdsMark[i].setAttribute('style','background:#CBC095 !important;');
											if(i==(gettdsMark.length-1)){
												var lastA = gettdsMark[i].querySelector("a");
												lastA.href=lastA.href.split('&')[0]+'&p='+pNumber.toString()+'#r'+anNumber.toString();
											}										
										}
										pNode.parentNode.removeChild(pNode);
										wlrX.storage.saveStorage(wlrX.tempDb.lastRead[trNumber]);
										return false;

									});								
								}
								/***might convert this all to one css thingo***/
								for(var z in tds){
									tds[z].setAttribute('style','background:#95B0CB !important;');
								}
							}
							else{	//no new post
								for(var x in tds){
									tds[x].setAttribute('style','background:#CBC095 !important;');	
								}
							}
						}
					}
				}
			},
			repliesTracker:function(){
			
				//Looping throught twice :( - might be ok
				var greyB =document.querySelectorAll('td[class^="bodyuser"] a[name^="r"]:nth-child(1)');
				var tNhcA=Number(wlrX.u.split('t=')[1].split('&')[0].split('#')[0]);
				var pagInation=document.querySelectorAll('#top_pagination li');
				var pagNum=1;
				var pagCheck = document.querySelector('#top_pagination .current a');
				if(pagCheck){
					pagNum=Number(pagCheck.innerHTML);
				}
				if(wlrX.tempDb && wlrX.tempDb.lastRead){
					for(var a=0;a<greyB.length;a++){	
						var cA=greyB[a];
						var hcA=cA.getAttribute('name');
						var aNhcA=hcA.split('r')[1];
						if(wlrX.tempDb.lastRead[tNhcA] && Number(wlrX.tempDb.lastRead[tNhcA].anchorNumber)>Number(aNhcA)){
							cA.parentNode.parentNode.setAttribute('style','background:#CFCBBC none repeat scroll 0 0 !important'); //temp colour
						}
					}
				}
				var yOff = wlrX.domTools.getScroll();
				wlrX.event.add(window, 'scroll', function(evt){
					var gS = wlrX.domTools.getScroll();
					if(gS > yOff){
						yOff = gS;
					}
				});
				var lr=null;
				function checkAndSaveAnchor(){
					
					for(var i=0;i<greyB.length;i++){
						var offN = wlrX.domTools.getOffSet(greyB[i]);
						var ancNum = Number(greyB[i].getAttribute('name').split('r')[1]);
						if(Number(offN)<Number(yOff)){
							if(!wlrX.tempDb){
								wlrX.tempDb={};
							}
							if(!wlrX.tempDb.lastRead){
								wlrX.tempDb.lastRead={};
							}
							if(!wlrX.tempDb.lastRead[tNhcA] || wlrX.tempDb.lastRead[tNhcA].anchorNumber<ancNum){
								wlrX.tempDb.lastRead[tNhcA]={
										threadNumber:tNhcA,
										pageNumber:pagNum,
										anchorNumber:ancNum									
								};	
								lr={
									threadNumber:tNhcA,
									pageNumber:pagNum,
									anchorNumber:ancNum									
								};
							}		
						}
						if(lr && i==(greyB.length-1)){
							wlrX.storage.saveStorage(lr);
						}						
					}
				}
				if(wlrX.browser=='Opera'){	//opera doesn't support beforeunload
					var op = window.setInterval(function(){ 	//save to localStorage every 300 milliseconds and hope for the best
						checkAndSaveAnchor();
					},300);
				}
				
				wlrX.event.add(window, 'beforeunload', function(){checkAndSaveAnchor();});	
			}
		},
		qquote:{
			qquoteRedirect:function(){
				var p2i = document.getElementById('post2');
				if(p2i){
					var grabval=wlrX.tempDb.wlrXcreatetarvalue;
					if(grabval){
						var graboptObj=wlrX.tempDb.ptObj;
						for(var i in graboptObj){
							var icache = graboptObj[i];
							var b=true;
							if(!icache.c){
								b=false;
							}
							document.getElementById(graboptObj[i].name).checked=b;					
						}
						document.getElementById('body').value=decodeURIComponent(grabval);
						wlrX.storage.deleteStorage('ptObj');
						wlrX.storage.deleteStorage('wlrXcreatetarvalue');
						p2i.setAttribute('value','post');
						p2i.parentNode.submit();
					}
				}
			},			
			init:function(){
			
				wlrX.threadStatus=document.querySelector('.foot_reply a');		

				if(wlrX.browser=='IE'){	//to fix issue with wbr element in IE
					wlrX.addStyle('wbr{display:block;}');		
				}
				
				function toPostPage(){
					if(wlrX.threadStatus && wlrX.create.tar.value.length>0){
						if(!wlrX.tempDb){
							wlrX.tempDb={};
						}
						wlrX.tempDb.ptObj ={
							modewc:{name:'modewc',c:wlrX.create.modewc.checked},
							modeht:{name:'modeht',c:wlrX.create.modeht.checked},
							modest:{name:'modest',c:wlrX.create.modest.checked},
							modewl:{name:'modewl',c:wlrX.create.modewl.checked}	
						}
						wlrX.tempDb.wlrXcreatetarvalue=encodeURIComponent(wlrX.create.tar.value);
						wlrX.storage.saveStorage(wlrX.tempDb);
						document.location=wlrX.threadStatus;
					}
				}
				
				var greyA =document.querySelectorAll('.greylink[title="a link to this specific post"]');

				for(var a=0;a<greyA.length;a++){
					
					var tParent = greyA[a].parentNode;
					var spanBar = document.createElement('span');
					spanBar.className='bar';
					spanBar.innerHTML=' | ';
					var noJQqqLink = document.createElement('button');
					noJQqqLink.setAttribute('class','qqlink greylink');
					noJQqqLink.innerHTML='q-quote ';
					tParent.insertBefore( spanBar, greyA[a] );
					tParent.insertBefore( noJQqqLink, spanBar );

					wlrX.event.add(noJQqqLink, "mouseup", function(e){
					
						var nE = wlrX.domTools.prevEl(this.parentNode.parentNode);
						var buser = wlrX.domTools.prevEl(nE);
						//var nE1 = wlrX.domTools.prevEl(this);
						//var nE2 = nE1.querySelector('a[name^="r"]');
						var qqpreS = buser.querySelector('a[name^="r"]:nth-child(2)').getAttribute('name').split('r')[1];

						var qquNam = buser.querySelector('.bu_name');
						var ws, tc;
						if(wlrX.browser=='IE'){	//http://www.quirksmode.org/dom/range_intro.html
							ws=document.selection.createRange().text;
							tc= qquNam.innerText;
						}
						else{
							ws=window.getSelection().toString();
							tc= qquNam.textContent;
						}

						var qqtSel = ws.replace(/^(.+)$/mg, '["$1"]');

						if(wlrX.create.tar.value.length > 0){
							wlrX.create.tar.value+='\r@'+qqpreS+' '+tc+' writes... \n'+qqtSel+'\n\n';
						}
						else{
							wlrX.create.tar.value='@'+qqpreS+' '+tc+' writes... \n'+qqtSel+'\n\n';
						}
						wlrX.create.tar.focus();
					});
				}

				var buttons ={
					Bold:{title:'Bold WhirlCode',accesskey:'b',id:'wc_whirlBold',text:'Bold'},
					Italic:{title:'Italic WhirlCode',accesskey:'i',id:'wc_whirlItalic',text:'Italic'},
					SingleQuote:{title:'SingleQuote WhirlCode',accesskey:'t',id:'wc_whirlSingleQuote',text:'\'quote\''},
					DoubleQuote:{title:'DoubleQuote WhirlCode',accesskey:'q',id:'wc_whirlDoubleQuote',text:'"quote"'},
					quote:{title:'Quote WhirlCode',accesskey:'h',id:'wc_whirlQuote',text:'who'},		
					Superscript:{title:'Superscript WhirlCode',accesskey:'p',id:'wc_whirlSuperscript',text:'Super'},
					Subscript:{title:'Subscript WhirlCode',accesskey:'\\',id:'wc_whirlSubscript',text:'Sub'},
					Strike:{title:'Strike WhirlCode',accesskey:'k',id:'wc_whirlStrike',text:'Strike'},
					Courier:{title:'Courier WhirlCode',accesskey:'c',id:'wc_whirlCourier',text:'Courier'},
					Small:{title:'Small WhirlCode',accesskey:'m',id:'wc_whirlSmall',text:'Small'},
					Grey:{title:'Grey WhirlCode',accesskey:'r',id:'wc_whirlGrey',text:'Grey'},
					Serif:{title:'Serif WhirlCode',accesskey:'s',id:'wc_whirlSerif',text:'Serif'},
					Google:{title:'Google WhirlCode',accesskey:'g',id:'wc_whirlGoogle',text:'Google'},
					Escape:{title:'Escape WhirlCode',accesskey:'e',id:'wc_whirlEscape',text:'Esc'},
					Wiki:{title:'Wiki WhirlCode',accesskey:'w',id:'wc_whirlWiki',text:'Wiki'},
					Spoiler:{title:'Spoiler WhirlCode',accesskey:'o',id:'wc_whirlSpoil',text:'Spoiler'},
					URLLink:{title:'URL Link',accesskey:'u',id:'wc_whirlurl',text:'URL'},
					Link:{title:'Link',accesskey:'l',id:'wc_whirllink',text:'Link'}		
				};

				var code={
						wc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
						wc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
						wc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
						wc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
						wc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
						wc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
						wc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
						wc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
						wc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
						wc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
						wc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
						wc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
						wc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
						wc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
						wc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"},
						wc_whirlSpoil :			{ encloseLeft : "[_", encloseRight  : "_]"}						
					};
				
				function preview(){
				
					var previewTimer;
					var previewWait = false;

					if (!previewWait) {
						previewWait = true;
						previewTimer = setTimeout(function(){

							var settingStr = "pflh";
							if(wlrX.create.modewc.checked){
								settingStr+='w';
							}
							if(wlrX.create.modest.checked){
								settingStr+='e';
							}
							if(wlrX.create.modeht.checked){
								settingStr+='b';
							}
							if(wlrX.create.modewl.checked){
								settingStr+='a';
							}
							wlrX.create.td2.innerHTML=wlrX.whirlcode2(wlrX.create.tar.value, settingStr);
							previewWait = false;
						}, 600);
					}			
				
				}
				function processText(evt){
					/**** http://stackoverflow.com/questions/275761/how-to-get-selected-text-from-textbox-control-with-javascript ****/
					var qqbuttonID = (wlrX.browser=='IE')?evt.srcElement.getAttribute('id'):evt.target.getAttribute('id');
					var endPos,startPos,selectedText,uPrompt;
					wlrX.create.tar.focus();
					var textComponent = wlrX.create.tar;
					if (textComponent.selectionStart != undefined){ 		// Mozilla version
						startPos = textComponent.selectionStart;
						endPos = textComponent.selectionEnd;
						selectedText = textComponent.value.substring(startPos, endPos);
					}
					else if (document.selection != undefined){  // IE version	http://the-stickman.com/web-development/javascript/finding-selection-cursor-position-in-a-textarea-in-internet-explorer/
						var range = document.selection.createRange();
						var stored_range = range.duplicate();
						stored_range.moveToElementText( textComponent );
						stored_range.setEndPoint( 'EndToEnd', range );
						startPos = stored_range.text.length - range.text.length;
						endPos = startPos + range.text.length;
						selectedText = range.text;
					}				
					function insertAtCursor( left, right){
						var storeVal = textComponent.value;
						var startText = storeVal.slice(0,startPos);
						var replaceText = left+selectedText.replace(/^(.+)$/mg, "$1")+right;
						var endText = storeVal.slice(endPos,storeVal.length);
						var bugsBunny = startText+replaceText.length;
						textComponent.value=startText+replaceText+endText;
					}
					if(qqbuttonID == "wc_whirlurl"){
						uPrompt = (wlrX.browser=='IE')?PRO_prompt("Enter URL:", "http://"):window.prompt("Enter URL:", "http://"); //PRO_prompt (http://iescripts.org/help/pro_prompt.html) because of this http://www.hunlock.com/blogs/Working_around_IE7s_prompt_bug,_er_feature
						if (uPrompt && uPrompt !== "http://" && uPrompt !== "") {
							var uNum = 16+selectedText.length+uPrompt.length;
							var l = '<a href="'+uPrompt+'">';
							insertAtCursor(l, '</a>');
						}
					}
					else if(qqbuttonID == "wc_whirllink"){
						uPrompt = (wlrX.browser=='IE')?PRO_prompt("Enter Text:", ""):window.prompt("Enter Text:", ""); 
						if (uPrompt && uPrompt !== "") {
							if(selectedText.indexOf('http://')<0){
								selectedText = 'http://'+selectedText;
							}
							var r='">'+uPrompt+'</a>';
							insertAtCursor('<a href="', r);
						}
					}		
					else{
						insertAtCursor(code[qqbuttonID].encloseLeft, code[qqbuttonID].encloseRight);
					}		
					preview();
				}
				//wlrX.create... so can store reference and don't need to getElementById later
				wlrX.create.qqContainer = document.createElement('div');
				wlrX.create.qqContainer.setAttribute('id','qQuote');	
				wlrX.create.qqContainer.setAttribute('align','center');
				
				wlrX.create.qqbuttonsDiv = document.createElement('div');
				wlrX.create.qqbuttonsDiv.setAttribute('id','qqbuttonsDiv');
				wlrX.create.qqbuttonsDiv.setAttribute('align','center');
				
				for(var i in buttons){
					var b = document.createElement('button');
					b.setAttribute('title', buttons[i].title);
					b.setAttribute('accesskey', buttons[i].accesskey);
					b.setAttribute('id', buttons[i].id);
					b.innerHTML=buttons[i].text;
					wlrX.event.add(b, 'mouseup', function(evt){processText(evt);});
					wlrX.create.qqbuttonsDiv.appendChild(b);
				}	

				wlrX.create.qqContainer.appendChild(wlrX.create.qqbuttonsDiv);
				
				wlrX.create.tar = document.createElement('textarea');
				wlrX.create.tar.setAttribute('id','qqTextArea');
				var colCheck = (wlrX.domTools.getDocWidth()<1200)? '80': '100';
				wlrX.create.tar.setAttribute('cols',colCheck);
				wlrX.create.tar.setAttribute('rows','10');
				wlrX.create.tar.setAttribute('style','background-color:#E5E5E5;');
				wlrX.event.add(wlrX.create.tar, 'focus', function(evt){
				
					var checkIfThere=document.getElementById('previewTR');
					if(!checkIfThere){
						wlrX.create.tr=document.createElement('tr');
						wlrX.create.tr.setAttribute('id','previewTR');
						wlrX.create.tr.setAttribute('height','100');
						
						wlrX.create.td1=document.createElement('td');
						wlrX.create.td1.setAttribute('class','bodyuser');
						wlrX.create.td1.setAttribute('style','vertical-align: middle;');
						
						wlrX.create.tp1=document.createElement('p');
						wlrX.create.tp1.innerHTML="Preview";
						wlrX.create.tp1.setAttribute('style','opacity:0.3;filter: alpha(opacity=10);font:2em bold Verdana');	

						wlrX.create.td1.appendChild(wlrX.create.tp1);
						wlrX.create.tr.appendChild(wlrX.create.td1);
						
						wlrX.create.td2=document.createElement('td');
						wlrX.create.td2.setAttribute('class','bodytext');		

						wlrX.create.tr.appendChild(wlrX.create.td2);

						wlrX.create.td3=document.createElement('td');
						wlrX.create.td3.setAttribute('class','bodypost');
						wlrX.create.td3.setAttribute('style','vertical-align: middle;');
						
						wlrX.create.tp2=document.createElement('p');
						wlrX.create.tp2.innerHTML="Preview";
						wlrX.create.tp2.setAttribute('style','opacity:0.3;filter: alpha(opacity=10);font:2em bold Verdana');	

						wlrX.create.td3.appendChild(wlrX.create.tp2);
						wlrX.create.tr.appendChild(wlrX.create.td3);	

						document.querySelector('#replies tbody').appendChild(wlrX.create.tr);	
						if(wlrX.browser=='Opera'){	
							document.addEventListener('keyup',function(event){
								if(event.which==0){
									wlrX.isCtrl=false;
								}
							},false);
							document.addEventListener('keydown',function(e){
								if(e.which == 0){
									wlrX.isCtrl=true; 
								}
								if(e.which == 13 && wlrX.isCtrl) { 
									toPostPage(); 
								} 
							},false);
						}
						else{
							var eleForEvent=(wlrX.browser=='IE')?wlrX.b:document;		//IE chucks a spaz if apply event listener to document
							wlrX.event.add(eleForEvent, "keydown", function(event){	
								if(event.ctrlKey && event.keyCode==13 ){
									toPostPage();
								}
							});
						}												
					}	
							
				});	
				wlrX.event.add(wlrX.create.tar, 'keyup', function(evt){
					preview();
				});	
				wlrX.event.add(wlrX.create.tar, 'change', function(evt){
					wlrX.tempDb.wlrXcreatetarvalue=encodeURIComponent(wlrX.create.tar.value);
					wlrX.storage.saveStorage(wlrX.tempDb);
				});					
				wlrX.create.qqContainer.appendChild(wlrX.create.tar);
				if(wlrX.tempDb && wlrX.tempDb.wlrXcreatetarvalue){
					wlrX.create.tar.value=unescape(wlrX.tempDb.wlrXcreatetarvalue);
				}
					
				wlrX.create.br = document.createElement('br');
				wlrX.create.qqContainer.appendChild(wlrX.create.br);
				
				wlrX.create.cl = document.createElement('button');
				wlrX.create.cl.setAttribute('id','qqpostclear');
				wlrX.create.cl.innerHTML='Clear';
				wlrX.event.add(wlrX.create.cl, 'mouseup', function(evt){
					wlrX.create.tar.value="";
					preview();
					wlrX.storage.deleteStorage('wlrXcreatetarvalue');					
					wlrX.create.tar.focus();
				});	
				wlrX.create.qqContainer.appendChild(wlrX.create.cl);	

				wlrX.create.p = document.createElement('button');
				wlrX.create.p.setAttribute('id','qqpost');
				wlrX.create.p.innerHTML='Post Reply';
				wlrX.event.add(wlrX.create.p, 'mouseup', function(evt){
					toPostPage();
				});
				wlrX.create.qqContainer.appendChild(wlrX.create.p);	
				
				wlrX.create.opd = document.createElement('div');
				wlrX.create.opd.setAttribute('id','opInputs');
				
				wlrX.opdInputs={
					modewc:{
						attributes:{
							id:'modewc',
							type:'checkbox',
							value:'value',
							checked:'checked'
							},
						innerHTML:'Use WhirlCode'
					},
					modeht:{
						attributes:{
							id:'modeht',
							type:'checkbox',
							value:'value',
							checked:'checked'
							},
						innerHTML:'Allow HTML'
					},	
					modest:{
						attributes:{
							id:'modest',
							type:'checkbox',
							value:'value',
							checked:'checked'
							},
						innerHTML:'Auto entities'
					},	
					modewl:{
						attributes:{
							id:'modewl',
							type:'checkbox',
							value:'value',
							checked:'checked'
							},
						innerHTML:'Make links clickable'
					}			
				};

				for(var ip in wlrX.opdInputs){
				
					var ipWO = wlrX.opdInputs[ip];
					var ipWOAtts = ipWO.attributes;
				
					wlrX.create[ipWOAtts.id] = document.createElement('input');
					wlrX.create[ipWOAtts.id].setAttribute('type', ipWOAtts.type);
					wlrX.create[ipWOAtts.id].setAttribute('value', ipWOAtts.value);
					wlrX.create[ipWOAtts.id].setAttribute('id', ipWOAtts.id);
					wlrX.create[ipWOAtts.id].setAttribute('checked', ipWOAtts.checked);		
					wlrX.create.opd.appendChild(wlrX.create[ipWOAtts.id]);	
					
					var chref, lab = document.createElement('label');
					lab.setAttribute('for', ipWOAtts.id);	
					lab.innerHTML=ipWO.innerHTML;
					wlrX.create.opd.appendChild(lab);
					if(ipWOAtts.id=='modewc' || ipWOAtts.id=='modeht'){
						wlrX.create[ipWOAtts.id].alink = document.createElement('a');
						wlrX.create[ipWOAtts.id].alink.setAttribute("target", "_blank");
						(ipWOAtts.id=='modewc')?chref="http://forums.whirlpool.net.au/wiki/?tag=whirlcode":chref="http://forums.whirlpool.net.au/wiki/?tag=html";
						wlrX.create[ipWOAtts.id].alink.setAttribute("href", chref);
						wlrX.create[ipWOAtts.id].alink.innerHTML='<img src="http://forums.whirlpool.net.au/im/forum/help.gif" alt="" align="absbottom" border="0" height="17" width="17">';
						wlrX.create.opd.appendChild(wlrX.create[ipWOAtts.id].alink);
					}
					
				}

				wlrX.create.qqContainer.appendChild(wlrX.create.opd);
				
				document.getElementById('replies').appendChild(wlrX.create.qqContainer);
				
				if(wlrX.threadStatus && document.title.match(' - Focused - The Pool Room - Whirlpool Forums')){
					backImg = 'data:image/png;base64,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';
					if(wlrX.browser=='IE'){
						backImg = 'http://i50.tinypic.com/xgad55.png';
					}				
					document.getElementById('qqTextArea').setAttribute("style","background:#E5E5E5 url("+backImg+") center no-repeat;}");				
					
				}
				else if(!wlrX.threadStatus){	//closed thread
					backImg = 'data:image/png;base64,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';
					if(wlrX.browser=='IE'){
						backImg = 'http://i49.tinypic.com/29zynn5.png';
					}
					document.getElementById('opInputs').setAttribute("style","display:none;}");	
					document.getElementById('qqpost').setAttribute("style","display:none;}");	
					document.getElementById('qqTextArea').setAttribute("style","background:#E5E5E5 url("+backImg+") center no-repeat;}");	
				}	
			}
		}

};

function pageChecks(){

	/****page checks****/
	if(wlrX.u.match('forum-replies')){
		wlrX.checkbrowser();
		wlrX.tempDb=wlrX.storage.getStorage();
		wlrX.qquote.init();
		wlrX.tracker.repliesTracker();
	}
	else if(wlrX.u.indexOf('index.cfm?action=reply')>-1){
		wlrX.checkbrowser();
		wlrX.tempDb=wlrX.storage.getStorage();
		wlrX.qquote.qquoteRedirect();	
	}
	else if(wlrX.u.indexOf('/forum/')>-1 || (wlrX.u.indexOf('/user/')>-1 && wlrX.u.indexOf('?action=online')<0)){
		wlrX.checkbrowser();
		wlrX.tempDb=wlrX.storage.getStorage();
		wlrX.tracker.forumTracker();
		
	}

}

if(window.opera){
	var oper = window.setInterval(function(){
		if(document.querySelector('#left>.userinfo') && document.getElementById('footer')){
			window.clearInterval(oper);
			pageChecks();
		}	
	},50);
}
else{
	pageChecks();
}	

/***debugging for IE and Opera
var fbScript=document.createElement('script');
fbScript.setAttribute('src','http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');
document.body.appendChild(fbScript);
var fbc = window.setInterval(function(){
	if(window.firebug.version){
		window.clearInterval(fbc);
		firebug.init();
		pageChecks();
	}	
},300);
***/