// ==UserScript==
// @name           salon exilien
// @namespace      salon exile
// @description    ajouter un complement au salon d'exile
// @include        http://*.exile.fr/game/chat.asp
// ==/UserScript==

var exile = {

//Activer BBCode
	else if ($('bbcode')) {
		try {
			$('bbcode').checked=true;
			var firescript=doc.createElement("script");
			var functfire=""+function editbbc(type) {
								var sellength = $("message").textLength;
								var selstart = $("message").selectionStart;
								var selend = $("message").selectionEnd;
								var s1 = ($("message").value).substring(0,selstart);
								var s2 = ($("message").value).substring(selstart, selend)
								var s3 = ($("message").value).substring(selend, sellength);
								if(type=='color') $("message").value=s1+"["+type+"="+$("color1").value+"]"+s2+"[/"+type+"]"+s3;
								else $("message").value=s1+"["+type+"]"+s2+"[/"+type+"]"+s3;
							}
							+function mppreview() {
								text=$("message").value;
								text= text.replace(/\n/g, '<br />');
								text= text.replace(/\[b\](.*?)\[\/b\]/g, '<b>$1</b>');
								text= text.replace(/\[i\](.*?)\[\/i\]/g, '<i>$1</i>');
								text= text.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>');
								text= text.replace(/\[color=(.*?)\](.*?)\[\/color\]/g, '<span style="color:$1;">$2</span>');
								text= text.replace(/\[url\](.*?)\[\/url\]/g, '<a href="$1">$1</a>');
								$("apercu").innerHTML=text;
							};
			firescript.innerHTML=functfire;
			docu.appendChild(firescript);
			var newtr=doc.createElement("tr");
			var td1=doc.createElement("td");
			td1.innerHTML="BBCode";
			newtr.appendChild(td1);
			var td2=doc.createElement("td");
			td2.innerHTML="<input type='button' style='padding:2px 5px;' value='url' onclick='editbbc(this.value)'> "
						 +"<input type='button' style='padding:2px 5px;font-style:italic' value='i' onclick='editbbc(this.value)'> "
						 +"<input type='button' style='padding:2px 5px;' value='u' onclick='editbbc(this.value)'> "
						 +"<input type='button' style='padding:2px 5px;font-weight:bold' value='b' onclick='editbbc(this.value)'> "
						 +"<input type='button' style='padding:2px 5px;font-weight:bold' value='color' onclick='editbbc(this.value)'>"
						 +"<input type='text'   style='padding:3px 2px;' size='6' id='color1' value='#FFFFFF' onkeyup='this.setAttribute(\"style\",\"padding:3px 2px;color:\"+this.value);'> ";
			newtr.appendChild(td2);
			ftbody=docu.getElementsByTagName("tbody")[0];
			ftbody.childNodes[4].childNodes[1].firstChild.setAttribute("id","message");
			ftbody.insertBefore(newtr, ftbody.childNodes[4]);
			var newtr=doc.createElement("tr");
			var td1=doc.createElement("td");
			td1.innerHTML="Aperçu";
			newtr.appendChild(td1);
			var td2=doc.createElement("td");
			newtr.appendChild(td2);
			td2.id="apercu";
			ftbody.appendChild(newtr);
			
			$('message').setAttribute("onkeyup", "mppreview()");
			ftbody.setAttribute("onclick", "mppreview()");
		}
		catch (e) { erreurdebug += e +'\n ligne '+ e.lineNumber +'\n'; }
	}
},
            
    var motsclefs_all = new Array("WAR", "ASSIST", "INFO");
    var motsclefs_colors = new Array("indianred", "#5C5", "royalblue");
    var color = -1;
    for (clef in motsclefs_all) {
        var regexp_motsclefs = new RegExp("\\[" + motsclefs_all[clef] + "\\]", "i");
        var allylight = regexp_motsclefs.test(line);
        if (allylight) {
            color = clef;
            break;
        }
          }