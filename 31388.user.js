// ==UserScript==
// @name           baune
// @namespace      mel
// @description    amélioration de l'interface math en ligne
// @include        http://www.forum.math.ulg.ac.be/*
// ==/UserScript==
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		
		$("body").append('<div id="proposals" style="position:absolute;display:none;background:#ffcc99;padding:5px;filter:alpha(opacity=90);opacity:.90;"></div>');
		
		$("head").append('\n\
			<style>							\n\
			.navigfirst{					\n\
				background:yellow;			\n\
				border:1px solid #6699cc;	\n\
			}								\n\
			.navig > a{						\n\
				border:1px solid #000;		\n\
				background-color:#336699;	\n\
				margin:0 5px;				\n\
				padding:0 5px;				\n\
				text-decoration:none;		\n\
				color:#ffeecc				\n\
			}								\n\
			.navig > a:hover{				\n\
				border:1px solid #000;		\n\
				background-color:#aacccc;	\n\
				margin:0 5px;				\n\
				padding:0 5px;				\n\
			}								\n\
			</style>						\n\
		');
		$(".msgtext").hide();
		$(".message > h3").append('<a href="javascript:void(0);" class="openlink">ouvrir</a>');
		$(".back").removeClass("back");
		$(".navig:first").append('<a href="javascript:void(0);" id="openall"><span>tout ouvrir</span></a>');
		$(".navig:first").append('<a href="javascript:void(0);" id="closeall"><span>tout fermer</span></a>');
		$(".navig:first").addClass("navigfirst");
		$("#openall").click(function(){
			$(".msgtext").slideDown();
			$(".openlink").text("fermer");
		});
		
		$("#closeall").click(function(){
			$(".msgtext").slideUp();
			$(".openlink").text("ouvrir");			
		});
		
        $(".openlink").click(function(evt){
			$(evt.target).parents().siblings(".msgtext").slideToggle();
			if ($(evt.target).text()=="ouvrir"){
				$(evt.target).text("fermer");
			}else{
				$(evt.target).text("ouvrir");
			}
		});
		
		$("#form_latex").keyup(function(evt){
			texte=evt.target.value;
			debut=evt.target.selectionStart;
			debutcmd=texte.lastIndexOf("\\",debut)+1;
			//alert(debutcmd);
			fincmd=indexOfOne(texte,[" ","\n","\t","\\","{",".","[","]","^","*","+","/","&"],debutcmd);
			//alert(fincmd);
			if (debut < fincmd) {
				cmd = texte.substring(debutcmd, debut);
			}else{
				cmd = texte.substring(debutcmd, fincmd);
			}
			if(debut <= fincmd && cmd!=null && cmd.length>0){
				$("#proposals").empty();
				lc=getLineColumn(evt.target);
				//$("#proposals").append('<span>'+lc.line+','+lc.column+'</span>');
				addProposal(cmd);
				addProposals(cmd);
				offset=$("#form_latex").offset();
				$("#proposals").css({display:"block",left:offset.left+lc.column*8,top:offset.top+lc.line*16+16});
			}else{
				$("#proposals").css({display:"none"});
			}
			//alert(cmd);
		});
		
		function getLineColumn(textarea){
			texte=textarea.value;
			lines=texte.split("\n");
			debut=textarea.selectionStart;
			indice=0;
			nbChars=0;
			found=false;
			while(indice<lines.length){
				nbChars+=lines[indice].length;
				if(debut<=nbChars){
					return {line:indice,column:lines[indice].length-nbChars+debut};
				}
				nbChars++;
				indice++;
			}
			return {line:-1,column:-1};
		}
		
		function indexOfOne(str,arr){
			return indexOfOne(str,arr,0);
		}
		
		function indexOfOne(str,arr,start){
			i=0;
			//alert(arr.length);
			res=[];
			while(i<arr.length){
				res.push(str.indexOf(arr[i],start));
				i++;
			}
			i=0;
			minVal=str.length;
			while(i<res.length){
				if(res[i]<minVal && res[i]!=-1){
					minVal=res[i];
				}
				i++;
			}
			
			return minVal;
		}
		
		function addProposal(prop){
			$("#proposals").append('<div style="margin:0px;padding:0px;" class="proposal"><a href="javascript:void(0);"><span>'+prop+'</span></a></div>');
		}
		
		
		
		function addProposals(mot){
			mots=getLike(mot);
			i=0;
			while(i<mots.length){
				addProposal(mots[i]);
				i++;
			}
			$("#proposals a").click(function(evt){
				textarea=document.getElementById("form_latex");
				texte=textarea.value;
				//alert(texte);
				debut=textarea.selectionStart;
				debutcmd=texte.lastIndexOf("\\",debut)+1;
				textarea.value=texte.substring(0,debutcmd)+$(evt.target).text()+texte.substring(debut,texte.length);
				$("#proposals").css({
					dislay: "none"
				});
				$("#proposals").blur();
			});
		}
		
		function getLike(mot){
			mots=[	"textit",
					"tiny",
					"huge",
					"vert",
					"vee",
					"cup",
					"cap",
					"bigcup",
					"bigcap",
					"it",
					"item",
					"begin",
					"end",
					"par",
					"section",
					"flush",
					"sum",
					"int"];
			i=0;
			rep=[];
			while(i<mots.length){
				if(mots[i].indexOf(mot)==0){
					rep.push(mots[i]);
				}
				i++;
			}
			return rep;
		}
		
    }