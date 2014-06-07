// ==UserScript==
// @name           GTAF Poster Helper
// @namespace      www.userscript.org/sripts/show
// @include        http://www.gtaforums.com/index.php?showtopic=*
// @include        http://www.gtaforums.com/index.php?act=Post&CODE=00*
// @include        http://www.gtaforums.com/index.php?act=Post&CODE=02*
// @include        http://www.gtaforums.com/index.php?act=Post&CODE=06*
// @include        http://www.gtaforums.com/index.php?act=Post&CODE=08*
// ==/UserScript==

	var d=document, byId=d.getElementById, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName, create=d.createElement;
	var post;
	
	var style= ('.post_frame {padding:0px 2px 0px 2px;padding:2px;} .hide {visibility:collapse;} .t_elem {} .t_elem td {border-width:0px!important;padding:1px!important;}');
	
(function (){
	if (d.URL.indexOf("show")>0) Panel(1);
	else Panel(0);
})()

function AddQLink(){
	var name= byId("q_name").value;
	if (name.indexOf(";")>-1) name= name.replace(";", ":");		// "fix" the separator in name issue
	var cont= byId("q_cont").value;
	
	if (name!=""){
		if (cont==""){
			var i= post.selectionStart;
			var j= post.selectionEnd;
			if (i==j) return;
			else if (i<j) cont= post.value.substring(i, j);
			else alert("i>j too");
		}
		var sel= byId("qlink_lst");
		var qlinks= byId("qlinks");
		byId("q_name").value= "";
		byId("q_cont").value= "";
		GM_setValue(name, cont);
		var data= GM_getValue("ph_index", "");
		if (data.length){										// add new entry
			data= data.split(";");
			var i;
			for (i=0; i<data.length-1; i++) if (data[i]==name) break;
			if (i!=data.length-1) return;									// add button only if it's a new entry
			GM_setValue("ph_index", GM_getValue("ph_index")+name+";");
		} else GM_setValue("ph_index", name+";");							// append the first entry
		
		qlinks.innerHTML+= "<input class=\"codebuttons\" type=\"button\" value=\""+name+"\" title=\""+cont+"\" style=\"margin:1px;\"/>";
		sel.innerHTML+= "<option>"+name+"</option>";
	}
}

function DataExport(){
	var data= GM_getValue("ph_index", "");
	if (data!=""){
		data= data.split(";");
		post.value=data.length+";;;";
		for (var i=0; i<data.length-1; i++) post.value+= data[i]+";;;"+GM_getValue(data[i], "")+";;;";
		post.focus();
		post.select();
	}
}

function DataImport(){
	if (post.value.length>0){
		var data= post.value.split(";;;");
		if (data.length>0){
			if (Number(data[0])==data.length/2){
				var sel= byId("qlink_lst");
				var qlinks= byId("qlinks");
				var new_index= GM_getValue("ph_index", "");
				var index="", k=0;
				if (new_index.length>0) index= new_index.split(";");
				
				for (var i=1; i<data.length-1; i+=2){
					GM_setValue(data[i], data[i+1]);
					if (index.length>0){
						var j;
						for (j=0; j<index.length-1; j++) if (index[j]==data[i]) break;
						if (j==index.length-1) continue;
						k++;
					}
					new_index+= data[i]+";";
					qlinks.innerHTML+= "<input class=\"codebuttons\" type=\"button\" value=\""+data[i]+"\" title=\""+data[i+1]+"\" style=\"margin:1px;\"/>";
					sel.innerHTML+= "<option>"+data[i]+"</option>";
				}
				GM_setValue("ph_index", new_index);
				alert("Import OK, imported "+k+" items, "+(data[0]-k-1)+" have been overwritten");
				
			} else alert("Wrong input formatting! Changes will be disregarded.")
		}
	}
}

function InsertText(){
	var i= post.selectionStart;
	var j= post.selectionEnd;
	
	if (i==j) post.value= post.value.substring(0, i)+ GM_getValue(this.value)+ post.value.substring(i);
	else if (i<j) post.value= post.value.substring(0, i)+ GM_getValue(this.value)+ post.value.substring(j);
	else alert("i>j");
	post.focus();
}

function Panel(type){
	post= byTag("textarea");			// post area
	if (post.length>0){
		post= post[0];
		GM_addStyle(style);
		
		var nodes="", nodes2="", i;
		var data= GM_getValue("ph_index", "");
		if (data.length>0){
			data= data.split(";");
			for (i=0; i<data.length-1; i++){
				nodes+= "<input class=\"codebuttons\" type=\"button\" value=\""+data[i]+"\" title=\""+GM_getValue(data[i])+"\" style=\"margin:1px;\"/>";
				nodes2+= "<option>"+data[i]+"</option>";
			}
		}
		var t= create("table"); t.id= "qtable"; t.className= "t_elem";
		t.innerHTML+= "<tr><td colspan=6 id=\"qlinks\">"+nodes+"</td></tr><tr><td><input class=\"codebuttons\" type=\"button\" value=\"x\" /></td></tr>";
		t.innerHTML+= "<tr class=\"hide\"><td width=\"35px\" align=\"right\">Title</td><td width=\"180px\"><input id=\"q_name\" class=\"forminput\" type=\"text\" style=\"width:100%\"/></td><td width=\"50px\" align=\"right\">Content</td><td width=\"180px\"><input id=\"q_cont\" class=\"forminput\" type=\"text\" style=\"width:100%\"/></td><td width=\"50px\"><input class=\"codebuttons\" type=\"button\" value=\"Add\" /></td><td></td></tr>";
		t.innerHTML+= "<tr class=\"hide\"><td></td><td><select id=\"qlink_lst\" class=\"forminput\" style=\"width:100%\">"+nodes2+"</select></td><td></td><td><input class=\"codebuttons\" type=\"button\" value=\"Remove\" /></td></tr>";
		t.innerHTML+= "<tr class=\"hide\"><td></td><td><input class=\"codebuttons\" type=\"button\" value=\"Import\" /><input class=\"codebuttons\" type=\"button\" value=\"Export\" /></td></tr>";
		
		var div= create("div");
		div.className= "post_frame";
		div.style.width= (type==0) ? "80%" : "60%";
		div.appendChild(t);
		var td= post.parentNode;
		if (type) td.insertBefore(div, post.nextSibling); else td.appendChild(div);
		
		var inpt= t.getElementsByTagName("input");
		for (i=0; i<inpt.length-7; i++) inpt[i].addEventListener("click", InsertText, false);
		inpt[i].addEventListener("click", function(){
			var tr= byClass("hide");
			var hide= (tr[0].style.visibility=="visible") ? "collapse" : "visible";
			for (var j=0; j<tr.length; j++) tr[j].style.visibility= hide;
		}, false);
		inpt[i+3].addEventListener("click", AddQLink, false);
		inpt[i+4].addEventListener("click", RemoveQLink, false);
		inpt[i+5].addEventListener("click", DataImport, false);
		inpt[i+6].addEventListener("click", DataExport, false);
		
	} else if (!type) GM_log("Error: post area not found");
}

function RemoveQLink(){
	if (GM_getValue("ph_index", "")!=""){
		var sel= byId("qlink_lst");
		var qlinks= byId("qlinks");
		qlinks.removeChild(qlinks.getElementsByTagName("input")[sel.selectedIndex]);
		var opt= sel.getElementsByTagName("option")[sel.selectedIndex];
		GM_setValue("ph_index", GM_getValue("ph_index").replace(opt.textContent+";", ""));
		GM_deleteValue(opt.textContent);
		opt.parentNode.removeChild(opt);
	}
}

