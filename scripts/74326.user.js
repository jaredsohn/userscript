// ==UserScript==
// @author        Teerapap Changwichukarn
// @name          Thai Dictionary Pop Box
// @namespace     http://www.teerapap.net/tag/thaidictpop
// @description   Open English-Thai dictionary in a pop box.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var isCtrl = false;
var defaultSrcLang = "en"
var defaultDestLang = "th";
var isLoading = false;
var translation = null;
var translationCurrentIndex = 0;
var isAnimating = false;
var canNavigate = false;

function getText(){
	var txt = '';
    if (window.getSelection)
    {
    	txt = window.getSelection();
    }
    else if (document.getSelection)
    {
        txt = document.getSelection();
    }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
    }
	if(txt==''){
		txt = prompt("Enter the words.");
	}
	if(txt!=''&&txt!=null){
		return txt;
	}else{
		return ''
	}
}

function startDict(){
	canNavigate = false;
	var box = $("div#thaidictpop_box");
	if (box != null){
		box.remove();
	}
	var txt = getText();
	if (txt==''){
		return;
	}
	isLoading = true;
	i=document.createElement('div');
	i.setAttribute('name', 'thaidictpop_box');
	i.setAttribute('id', 'thaidictpop_box');
    c = 'left:10px;top:10px;width:400px;';
	opacity = "filter: alpha(opacity=90); -ms-filter: \"alpha(opacity=90)\"; opacity: 0.9;";
	i.setAttribute('style', 'z-index: 2147483647; position: fixed;'+c+' width:400px; background-color:white; '+opacity+' border: 3px solid #aaa; padding:5px; font-size:12px !important; font-family: Verdana !important; font-weight:normal; color: blank; text-decoration:none;');
	document.body.appendChild(i);
	output = "";
	output+="<table border=\"0\" width=\"100%\" style=\"margin:0px; border:0px; padding:0px;\"><tr>";
	output+="<td>Translate: <b style=\"font-size:16px;\">"+txt+"</b></td>";
	output+="<td width=\"60\" style=\"text-align:right\" id=\"thaidictpop_navigation\"></td>";
	output+="<td width=\"30\" id=\"thaidictpop_closebtn\" ><a href=\"javascript:void(0);\" style=\"font-weight:bold; font-family:Verdana; font-color:blue; text-decoration:none\">[close]</a></td>";
	output+="</tr></table>";
	output+="<div id=\"thaidictpop_translation\">Loading...</div>"
	output+="<style type=\"text/css\">"
	output+="div#thaidictpop_translation { font-size:12px; margin-top:5px; }";
	output+=".thaidictpop_cls_transtable { text-align: center; font-family: Verdana; font-weight: normal; font-size: 12px; color: #404040; background-color: #fafafa; border: 1px #d79900 solid; border-collapse: collapse; border-spacing: 0px; padding:4px; margin:0px; }";
	output+=".thaidictpop_cls_source { border-bottom: 2px solid #d79900; background-color: #fff2ba; text-align: center; font-family: Verdana; font-weight: bold; font-size: 12px; color: #404040; padding:5px 2px 5px 2px; }";
	output+=".thaidictpop_cls_translation p { text-align: left; font-family: Verdana, sans-serif, Arial; font-weight: normal; font-size: 12px; line-height: 15px; color: #404040; background-color: #fafafa; text-indent: -8px; margin-left: 10px; margin-right: 10px; margin-top: 3px; margin-bottom: 3px; padding:0px; }";
	output+=".thaidictpop_cls_translation p a { text-decoration:none; }";
	output+=".thaidictpop_cls_translation p a:visited { text-decoration:none; }";
	output+=".thaidictpop_cls_translation p a:hover { text-decoration:underline; }";

	output+="</script>";
	$("div#thaidictpop_box").html(output);
	$("#thaidictpop_closebtn a").click(function(){ checkPreviousBox() });
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://dict.longdo.com/search/"+txt,
		onload: function(response){
			if(response.status != 200){
				dict_service_err(response);
			}else{
				dict_show(response);
			}
			isLoading = false;
		}
	});
}

function dict_service_err(response){
	GM_log([
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.responseText,
      response.finalUrl,
      response.responseXML
    ].join("\n"));
	var box = $("div#thaidictpop_translation");
	if (box!=null){
		box.html("Dictionary service error: "+response.statusText);
	}
}

function dict_show(response){
	var box = $("div#thaidictpop_translation");
	if (box!=null){
		output="";
		translationCurrentIndex = 0;
		startIndex = response.responseText.indexOf("<TABLE bgcolor=brown width=100%>");
		stopIndex = response.responseText.indexOf("frameborder=0 src=/ads/right-panel.php></iframe></td></tr></table>")+66;
		var resultPart = response.responseText.substring(startIndex,stopIndex);
		translation = $("table:eq(0) > tbody > tr > td",resultPart).html();
		translation = $("table:eq(0) > tbody > tr > td",resultPart);
		if (translation!=null && translation.length>0 && translation.html().indexOf("<span title=\"Few results found for \">") < 0){
			show_translation(0);
			$("#thaidictpop_navigation").html("<span id=\"thaidictpop_page\">1/"+translation.length+"</span> <a href=\"javascript:void(0);\" style=\"font-family:Verdana; font-weight:bold; color:blue; text-decoration:none\" id=\"thaidictpop_prevbtn\">&lt;</a><a href=\"javascript:void(0);\" style=\"font-family:Verdana; font-weight:bold; color:blue; text-decoration:none\" id=\"thaidictpop_nextbtn\">&gt;</a>");
			$("#thaidictpop_prevbtn").click(function(){ prev_translation() });
			$("#thaidictpop_nextbtn").click(function(){ next_translation() });
			canNavigate = true;
		}else{
			show_output("Translation not found.");
		}
	}
}

function show_output(output){
	isAnimating = true;
	$("div#thaidictpop_translation").fadeOut(300,function(){
		$(this).html(output);
	}).fadeIn(300,function(){
		isAnimating = false
	});
}

function show_translation(index){
	if (isAnimating){
		return;
	}
	if (translation==null) return;
	if (translation.length<=index){
		translationCurrentIndex = 0;
	}else if (index<0){
		translationCurrentIndex = translation.length - 1;
	}else{
		translationCurrentIndex = index;
	}
	var trans = translation.eq(translationCurrentIndex);
	header = trans.find("b:first").html();
	output="<table width=\"100%\" class=\"thaidictpop_cls_transtable\" cellspadding=\"0\" cellspacing=\"0\">";
	output+="<tr><td class=\"thaidictpop_cls_source\">"+header+"</td></tr>";
	output+="<tr><td class=\"thaidictpop_cls_translation\">";
	trans.find("table:first td").each(function(index){
		if (index%2==0){
			output+="<p><span class=\"thaidictpop_cls_word\">"+$(this).html()+"</span>";
		}else{
			output+="<br/><span class=\"thaidictpop_cls_wordtrans\">"+$(this).html()+"</span></p>";
		}
	});
	output+="</td></tr></table>";
	$("#thaidictpop_page").html((translationCurrentIndex+1)+"/"+translation.length);
	show_output(output);	
}

function next_translation(){
	show_translation(translationCurrentIndex+1);
}

function prev_translation(){
	show_translation(translationCurrentIndex-1);
}

function checkPreviousBox(){
	if (isLoading) return;
	var box = $("div#thaidictpop_box");
	if (box!=null){
		box.fadeOut(300,function(){
			canNavigate = false;
			box.remove();
		});
	}
}

function OnKeyDown(evt){
	if (canNavigate){
		if (evt.keyCode==37){
			prev_translation();
			return;
		}else if (evt.keyCode==39){
			next_translation();
			return;
		}
	}
	if(!isCtrl){
		checkPreviousBox();
		return;
	}
	if(evt.keyCode==190){
		startDict();
	}else{
		checkPreviousBox();
	}
}


OnKeyModDownUp = function(evt){
 	evt = (evt) ? evt : (window.event) ? window.event : ""
    if (evt) {
        if (evt.modifiers) {
            isCtrl = !(evt.modifiers & Event.ALT_MASK) && (evt.modifiers & Event.CONTROL_MASK) && !(evt.modifiers & Event.SHIFT_MASK) && !(evt.modifiers & Event.META_MASK);
        } else {
            isCtrl = !evt.altKey && evt.ctrlKey && !evt.shiftKey;
        }
    }
}



$(document).ready(function() {
	if(window.top == window.self){
		document.addEventListener('keydown',OnKeyModDownUp,0);
		document.addEventListener('keyup',OnKeyModDownUp,0);
		document.addEventListener('keydown',OnKeyDown,0);
	}
});

