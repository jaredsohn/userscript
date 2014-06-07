// ==UserScript==
// @name           Diaspora Tagfilter
// @namespace      https://pod.geraspora.de/u/deusfigendi
// @description    Filters Postings with set tags out of your Diaspora-stream. Also hides images and iframes.
// @include        http*://pod.geraspora.de/*
// @include        http*://my-seed.com/*
// @include        http*://the.diasperse.com/*
// @include        http*://li-la.de:3000/*
// @include        http*://social.mathaba.net/*
// @include        http*://humanless.ru/*
// @include        http*://poddery.com/*
// @include        http*://yaspora.com/*
// @include        http*://ottospora.nl/*
// @include        http*://diasp.eu/*
// @include        http*://diasp.be/*
// @include        http*://diasp.org/*
// @include        http*://mul.tiver.se/*
// @include        http*://diaspora.compadre.dk/*
// @include        http*://failure.net/*
// @include        http*://despora.de/*
// @include        http*://londondiaspora.org/*
// @include        http*://filiusdex.com/*
// @include        http*://diasp.de/*
// @include        http*://diasp.urbanabydos.ca/*
// @include        http*://fused.at/*
// @include        http*://diaspora.subsignal.org/*
// @include        http*://diaspora.lt/*
// @include        http*://joindiaspora.com/*
// @include        http*://efix.tk/*
// @include        http*://diaspora.streusel.org/*
// @include        http*://diasp.eu.com/*
// @include        http*://diasp.fi/*
// @include        http*://diaspora.dannielou.com/*
// @include        http*://diaspora.xn--grne-lampe-beb.de/*
// @include        http*://dpod.se/*
// @include        http*://diaspora.isnap.gr/*
// @include        http*://soc.ragriz.net/*
// @include        http*://pod.chrisi01.de/*
// @include        http*://foobar.cx/*
// @include        http*://testy.kompisen.se/*
// @include        http*://yaspora.es/*
// @include        http*://diaspora.eigenlab.org/*
// @include        http*://diaspora.sceal.ie/*
// @include        http*://mariosabatino.info/*
// @include        http*://diaspora.gpeni.net/*
// @include        http*://rlb.co/*
// @include        http*://www.geekspot.eu/*
// @include        http*://diaspora.adlerweb.info/*
// @include        http*://diasporapt.com/*
// @include        http*://friends.gabewarren.com/*
// @include        http*://84.23.75.136/*
// @include        http*://diaspora.chouchoune.fr/*
// @include        http*://alt.md/*
// @include        http*://lksnyder0.mooo.com/*
// ==/UserScript==


//    Diaspora Tagfilter shoud filter posts off your stream by tags. And hides inline-images and -iframes.
//    Copyright (C) 2011  Deus Figendi (https://pod.geraspora.de/u/deusfigendi)
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.





// Thanks to Flitze...
// http://www.mywebsolution.de/tipps/7/show_inarray-fuer-Javascript.html
Array.prototype.in_array = function(needle){
    for(var i=0; i<this.length; i++){
        if(needle===this[i])
            return true
    }
    return false;
}

gm_functions_work = false;
function test_gm() {
    try {
		if (typeof GM_setValue === 'function' && typeof GM_getValue === 'function') {
			GM_setValue('testkey','test');
			if (GM_getValue('testkey',false) === 'test') gm_functions_work = true;
		}
    } catch(e) {
        console.warn(e);
    }
}
test_gm();

function my_setValue(name,value) {
        if (gm_functions_work) {
            GM_setValue(name,value);
        } else {
			if (value === false) { value = "FaLsE"; }
			if (value === true ) { value = "TrUe" ; }
            localStorage['df_d_tagfilter'+name]=value;
        }
}
 
function my_getValue(name,defaultvalue) {
        if (gm_functions_work) {
                var val = GM_getValue(name,defaultvalue);
        } else {
                var val = localStorage['df_d_tagfilter'+name];
                if (val === "FaLsE"  ) val = false;
                if (val === "TrUe"   ) val = true;
                if (val === undefined) val = defaultvalue;
        }
        return val;
}

function load_tags(type) {
	var tag_array = my_getValue( type+"_tags", "#example_tag" ).split(" ");
	for (var i = tag_array.length -1; i >= 0; i--) {
		if (tag_array[i] == "#") {
			tag_array.splice(i,1);
		}
	}
	return tag_array
}

function add_tags(new_tags,tagtype) {
	var tag_array = load_tags(tagtype).concat(new_tags);
	
	for (var i = 0; i < tag_array.length; i++) {
		if (tag_array[i][0] != "#") {
			tag_array[i] = "#"+tag_array[i];
		}
		tag_array[i] = tag_array[i].toLowerCase();
	}
	my_setValue( tagtype+"_tags", tag_array.join(" ") );
}



function destroy_tagfilter_editor() {
	document.getElementById("tf_option_box").parentNode.removeChild(document.getElementById("tf_option_box"));
}

function remove_tag(tagname,tagtype) {
	var tag_array = load_tags(tagtype);
	var my_match = -1;
	for (var i = 0; i < tag_array.length; i++) {
		if (tag_array[i] == tagname) {
			my_match = i;
		}
	}
	if (my_match >= 0) {
		tag_array.splice(my_match,1);
	}
	my_setValue( tagtype+"_tags", tag_array.join(" ") );
	
}

function tf_option_activate(optiongroupname) {
	//Step one unhighlight all buttons:
	for (var i = 0; i < document.getElementById("tf_option_pagebutton_ul").childNodes.length; i++) {
		document.getElementById("tf_option_pagebutton_ul").childNodes[i].style.textDecoration = null;
		document.getElementById("tf_option_pagebutton_ul").childNodes[i].style.fontWeight = null;
	}
	//Step two highlight the new active XD
	if (document.getElementById("tf_option_pagebutton_"+optiongroupname)) {
		document.getElementById("tf_option_pagebutton_"+optiongroupname).style.textDecoration = "underline";
		document.getElementById("tf_option_pagebutton_"+optiongroupname).style.fontWeight = "bold";
	}
	//Step three hide all options-groups
	for (var i = 0; i < document.getElementsByClassName("tf_option_group").length; i++) {
		document.getElementsByClassName("tf_option_group")[i].style.display = "none";
	}
	//Step four display the active group
	if (document.getElementById("tf_option_group_"+optiongroupname)) {
		document.getElementById("tf_option_group_"+optiongroupname).style.display = null;
	}
	
}

function show_tagfilter_editor() {
	var tf_option_box = document.createElement("div");
	tf_option_box.id = "tf_option_box";
	tf_option_box.style.position = "fixed";
	tf_option_box.style.top = "0";
	tf_option_box.style.left = "0";
	tf_option_box.style.backgroundColor = "rgba(200,200,200,0.9)";
	tf_option_box.style.margin = "5em";
	tf_option_box.style.padding = "2em";
	tf_option_box.style.zIndex = "100";
	tf_option_box.style.border = "10px ridge";
	tf_option_box.style.minWidth = "20em";
	
	var tf_option_closebutton = document.createElement("div");
	tf_option_closebutton.id = "tf_option_closebutton";
	tf_option_closebutton.style.position = "absolute";
	tf_option_closebutton.style.top = "-5ex";
	tf_option_closebutton.style.right = "-10px";
	tf_option_closebutton.style.padding = "0 1ex";
	tf_option_closebutton.style.backgroundColor = "rgba(200,200,200,0.9)";
	tf_option_closebutton.style.zIndex = "101";
	tf_option_closebutton.appendChild(document.createTextNode(" X "));
	tf_option_closebutton.style.border = "10px ridge";
	tf_option_closebutton.style.borderBottom = "none";
	tf_option_closebutton.style.cursor = "pointer";
	tf_option_closebutton.addEventListener("click",function f(){ destroy_tagfilter_editor(); });
	
	
	var tf_option_pagebutton_ul = document.createElement("ul");
	tf_option_pagebutton_ul.id = "tf_option_pagebutton_ul";
	tf_option_pagebutton_ul.style.position = "absolute";
	tf_option_pagebutton_ul.style.top = "-5ex";
	tf_option_pagebutton_ul.style.left = "0";
	tf_option_pagebutton_ul.style.padding = "0";
	tf_option_pagebutton_ul.style.backgroundColor = "rgba(200,200,200,0.9)";
	tf_option_pagebutton_ul.style.zIndex = "101";
	
	var tf_option_pagebutton_tags = document.createElement("li");
	tf_option_pagebutton_tags.id = "tf_option_pagebutton_tags";
	tf_option_pagebutton_tags.style.display = "inline-block";
	tf_option_pagebutton_tags.style.top = "0";
	tf_option_pagebutton_tags.style.left = "0";
	tf_option_pagebutton_tags.style.backgroundColor = "rgba(200,200,200,0.9)";
	tf_option_pagebutton_tags.style.margin = "0";
	tf_option_pagebutton_tags.style.padding = "0 1ex";
	tf_option_pagebutton_tags.style.zIndex = "101";
	tf_option_pagebutton_tags.style.border = "10px ridge";
	tf_option_pagebutton_tags.style.borderBottom = "none";
	tf_option_pagebutton_tags.style.fontWeight = "bold";
	tf_option_pagebutton_tags.style.textDecoration = "underline";
	tf_option_pagebutton_tags.appendChild(document.createTextNode("Tags"));
	tf_option_pagebutton_tags.addEventListener("click",function f() { tf_option_activate("tags"); });
	
	tf_option_pagebutton_ul.appendChild(tf_option_pagebutton_tags);
	
	var tf_option_pagebutton_images = document.createElement("li");
	tf_option_pagebutton_images.id = "tf_option_pagebutton_images";
	tf_option_pagebutton_images.style.display = "inline-block";
	tf_option_pagebutton_images.style.top = "0";
	tf_option_pagebutton_images.style.left = "0";
	tf_option_pagebutton_images.style.backgroundColor = "rgba(200,200,200,0.9)";
	tf_option_pagebutton_images.style.margin = "0";
	tf_option_pagebutton_images.style.padding = "0 1ex";
	tf_option_pagebutton_images.style.zIndex = "101";
	tf_option_pagebutton_images.style.border = "10px ridge";
	tf_option_pagebutton_images.style.borderBottom = "none";
	tf_option_pagebutton_images.style.fontWeight = "normal";
	tf_option_pagebutton_images.appendChild(document.createTextNode("Images + Videos"));
	tf_option_pagebutton_images.addEventListener("click",function f() { tf_option_activate("images"); });
	
	tf_option_pagebutton_ul.appendChild(tf_option_pagebutton_images);
	
	var tf_option_pagebutton_about = document.createElement("li");
	tf_option_pagebutton_about.id = "tf_option_pagebutton_about";
	tf_option_pagebutton_about.style.display = "inline-block";
	tf_option_pagebutton_about.style.top = "0";
	tf_option_pagebutton_about.style.left = "0";
	tf_option_pagebutton_about.style.backgroundColor = "rgba(200,200,200,0.9)";
	tf_option_pagebutton_about.style.margin = "0";
	tf_option_pagebutton_about.style.padding = "0 1ex";
	tf_option_pagebutton_about.style.zIndex = "101";
	tf_option_pagebutton_about.style.border = "10px ridge";
	tf_option_pagebutton_about.style.borderBottom = "none";
	tf_option_pagebutton_about.style.fontWeight = "normal";
	tf_option_pagebutton_about.appendChild(document.createTextNode("About"));
	tf_option_pagebutton_about.addEventListener("click",function f() { tf_option_activate("about"); });
	
	tf_option_pagebutton_ul.appendChild(tf_option_pagebutton_about);
	
	
	tf_option_box.appendChild(tf_option_pagebutton_ul);
	tf_option_box.appendChild(tf_option_closebutton);
	
	
	//"Tags" -page:
	var tf_option_tags_page = document.createElement("div");
	tf_option_tags_page.className = "tf_option_group";
	tf_option_tags_page.id = "tf_option_group_tags";
	tf_option_tags_page.style.minWidth = "20em";
	
	var tf_option_tags_apply_label = document.createElement("label");
	tf_option_tags_apply_label.id = "tf_option_tags_apply_label";
	tf_option_tags_apply_label.setAttribute("for","tf_option_tags_apply_input");
	tf_option_tags_apply_label.className = "bootstrapped";
	tf_option_tags_apply_label.style.display = "block";
	var tf_option_tags_apply_input = document.createElement("input");
	tf_option_tags_apply_input.id = "tf_option_tags_apply_input";
	tf_option_tags_apply_input.type = "checkbox";
	tf_option_tags_apply_input.checked = my_getValue("tagfilter_on",true);
	tf_option_tags_apply_input.style.display = "inline";
	tf_option_tags_apply_input.addEventListener("change",function f() { my_setValue("tagfilter_on",this.checked); });
	tf_option_tags_apply_label.appendChild(tf_option_tags_apply_input);
	tf_option_tags_apply_label.appendChild(document.createTextNode("apply tag-filter"));
	
	
	tf_option_tags_page.appendChild(tf_option_tags_apply_label);
	
	
	var tf_option_tags_fav_apply_group = document.createElement("fieldset");
	tf_option_tags_fav_apply_group.id = "tf_option_tags_fav_apply_group";
	tf_option_tags_fav_apply_group.style.paddingTop = "0";
	var tf_option_tags_fav_apply_group_legend = document.createElement("legend");
	tf_option_tags_fav_apply_group_legend.id = "tf_option_tags_fav_apply_group_legend";
	tf_option_tags_fav_apply_group_legend.appendChild(document.createTextNode("how should favorites apear?"));
	var tf_option_tags_fav_apply_option1 = document.createElement("input");
	tf_option_tags_fav_apply_option1.id = "tf_option_tags_fav_apply_option1";
	tf_option_tags_fav_apply_option1.name = "tf_option_tags_fav_apply_option";
	tf_option_tags_fav_apply_option1.type = "radio";
	tf_option_tags_fav_apply_option1.value = "1";
	if (my_getValue("favtags_aply",0) == 1) {
		tf_option_tags_fav_apply_option1.checked = true;
	}
	tf_option_tags_fav_apply_option1.style.display = "inline";
	tf_option_tags_fav_apply_option1.style.maxWidth = "1em";
	var tf_option_tags_fav_apply_option2 = document.createElement("input");
	tf_option_tags_fav_apply_option2.id = "tf_option_tags_fav_apply_option2";
	tf_option_tags_fav_apply_option2.name = "tf_option_tags_fav_apply_option";
	tf_option_tags_fav_apply_option2.type = "radio";
	tf_option_tags_fav_apply_option2.value = "2";
	if (my_getValue("favtags_aply",0) == 2) {
		tf_option_tags_fav_apply_option2.checked = true;
	}
	tf_option_tags_fav_apply_option2.style.display = "inline";
	tf_option_tags_fav_apply_option2.style.maxWidth = "1em";
	var tf_option_tags_fav_apply_option3 = document.createElement("input");
	tf_option_tags_fav_apply_option3.id = "tf_option_tags_fav_apply_option3";
	tf_option_tags_fav_apply_option3.name = "tf_option_tags_fav_apply_option";
	tf_option_tags_fav_apply_option3.type = "radio";
	tf_option_tags_fav_apply_option3.value = "3";
	if (my_getValue("favtags_aply",0) == 3) {
		tf_option_tags_fav_apply_option3.checked = true;
	}
	tf_option_tags_fav_apply_option3.style.display = "inline";
	tf_option_tags_fav_apply_option3.style.maxWidth = "1em";
	var tf_option_tags_fav_apply_option4 = document.createElement("input");
	tf_option_tags_fav_apply_option4.id = "tf_option_tags_fav_apply_option4";
	tf_option_tags_fav_apply_option4.name = "tf_option_tags_fav_apply_option";
	tf_option_tags_fav_apply_option4.type = "radio";
	tf_option_tags_fav_apply_option4.value = "4";
	if (my_getValue("favtags_aply",0) == 4) {
		tf_option_tags_fav_apply_option4.checked = true;
	}
	tf_option_tags_fav_apply_option4.style.display = "inline";
	tf_option_tags_fav_apply_option4.style.maxWidth = "1em";
	tf_option_tags_fav_apply_option1.addEventListener("change",function f() { my_setValue("favtags_aply",this.value); });
	tf_option_tags_fav_apply_option2.addEventListener("change",function f() { my_setValue("favtags_aply",this.value); });
	tf_option_tags_fav_apply_option3.addEventListener("change",function f() { my_setValue("favtags_aply",this.value); });
	tf_option_tags_fav_apply_option4.addEventListener("change",function f() { my_setValue("favtags_aply",this.value); });
	var tf_option_tags_fav_apply_label1 = document.createElement("label");
	tf_option_tags_fav_apply_label1.id = "tf_option_tags_fav_apply_label1";
	tf_option_tags_fav_apply_label1.setAttribute("for","tf_option_tags_fav_apply_option1");
	tf_option_tags_fav_apply_label1.className = "bootstrapped";
	tf_option_tags_fav_apply_label1.style.display = "block";
	tf_option_tags_fav_apply_label1.appendChild(tf_option_tags_fav_apply_option1);
	tf_option_tags_fav_apply_label1.appendChild(document.createTextNode("always add to my postings and comments"));
	var tf_option_tags_fav_apply_label2 = document.createElement("label");
	tf_option_tags_fav_apply_label2.id = "tf_option_tags_fav_apply_label2";
	tf_option_tags_fav_apply_label2.setAttribute("for","tf_option_tags_fav_apply_option2");
	tf_option_tags_fav_apply_label2.className = "bootstrapped";
	tf_option_tags_fav_apply_label2.style.display = "block";
	tf_option_tags_fav_apply_label2.appendChild(tf_option_tags_fav_apply_option2);
	tf_option_tags_fav_apply_label2.appendChild(document.createTextNode("always add to my postings"));
	var tf_option_tags_fav_apply_label3 = document.createElement("label");
	tf_option_tags_fav_apply_label3.id = "tf_option_tags_fav_apply_label3";
	tf_option_tags_fav_apply_label3.setAttribute("for","tf_option_tags_fav_apply_option3");
	tf_option_tags_fav_apply_label3.className = "bootstrapped";
	tf_option_tags_fav_apply_label3.style.display = "block";
	tf_option_tags_fav_apply_label3.appendChild(tf_option_tags_fav_apply_option3);
	tf_option_tags_fav_apply_label3.appendChild(document.createTextNode("show a clickable list"));
	var tf_option_tags_fav_apply_label4 = document.createElement("label");
	tf_option_tags_fav_apply_label4.id = "tf_option_tags_fav_apply_label4";
	tf_option_tags_fav_apply_label4.setAttribute("for","tf_option_tags_fav_apply_option4");
	tf_option_tags_fav_apply_label4.className = "bootstrapped";
	tf_option_tags_fav_apply_label4.style.display = "block";
	tf_option_tags_fav_apply_label4.appendChild(tf_option_tags_fav_apply_option4);
	tf_option_tags_fav_apply_label4.appendChild(document.createTextNode("they shouldn't"));
	
	tf_option_tags_fav_apply_group.appendChild(tf_option_tags_fav_apply_group_legend);
	tf_option_tags_fav_apply_group.appendChild(tf_option_tags_fav_apply_label1);
	tf_option_tags_fav_apply_group.appendChild(tf_option_tags_fav_apply_label2);
	tf_option_tags_fav_apply_group.appendChild(tf_option_tags_fav_apply_label3);
	tf_option_tags_fav_apply_group.appendChild(tf_option_tags_fav_apply_label4);
	
	tf_option_tags_page.appendChild(tf_option_tags_fav_apply_group);
	
	
	var tf_option_tags_filterlist = document.createElement("ul");
	tf_option_tags_filterlist.id = "tf_option_tags_filterlist";
	tf_option_tags_filterlist.style.cssFloat = "left";
	
	var list_of_filtertags = load_tags("filter");
	var tf_option_tags_filtertag = document.createElement("li");
	tf_option_tags_filtertag.style.fontWeight = "bold";
	tf_option_tags_filtertag.appendChild(document.createTextNode("Tags to block"));
	tf_option_tags_filterlist.appendChild(tf_option_tags_filtertag);
	for (var i = 0; i < list_of_filtertags.length;i++) {
		tf_option_tags_filtertag = document.createElement("li");
		tf_option_tags_filtertag.appendChild(document.createTextNode(list_of_filtertags[i]));
		tf_option_tags_filtertag.style.cursor = "sw-resize";
		tf_option_tags_filtertag.addEventListener("mousemove",function f(){this.style.textDecoration = "line-through";});
		tf_option_tags_filtertag.addEventListener("mouseout",function f(){ this.style.textDecoration = null;});
		tf_option_tags_filtertag.addEventListener("click",function f(){ remove_tag(this.firstChild.data,"filter"); destroy_element(this); });
		
		tf_option_tags_filterlist.appendChild(tf_option_tags_filtertag);
	}	
	tf_option_tags_page.appendChild(tf_option_tags_filterlist);
	
	var tf_option_tags_favlist = document.createElement("ul");
	tf_option_tags_favlist.id = "tf_option_tags_filterlist";
	
	var list_of_filtertags = load_tags("fav");
	var tf_option_tags_favtag = document.createElement("li");
	tf_option_tags_favtag.style.fontWeight = "bold";
	tf_option_tags_favtag.appendChild(document.createTextNode("Favorite Tags"));
	tf_option_tags_favlist.appendChild(tf_option_tags_favtag);
	for (var i = 0; i < list_of_filtertags.length;i++) {
		tf_option_tags_favtag = document.createElement("li");
		tf_option_tags_favtag.appendChild(document.createTextNode(list_of_filtertags[i]));
		tf_option_tags_favtag.style.cursor = "sw-resize";
		tf_option_tags_favtag.addEventListener("mousemove",function f(){this.style.textDecoration = "line-through";});
		tf_option_tags_favtag.addEventListener("mouseout",function f(){ this.style.textDecoration = null;});
		tf_option_tags_favtag.addEventListener("click",function f(){ remove_tag(this.firstChild.data,"fav"); destroy_element(this); });
		
		tf_option_tags_favlist.appendChild(tf_option_tags_favtag);
	}	
	tf_option_tags_page.appendChild(tf_option_tags_favlist);
	
	var tf_option_newtaginput = document.createElement("input");
	tf_option_newtaginput.id = "tf_option_newtaginput";
	tf_option_newtaginput.setAttribute("placeholder","New Tags… (seperate with space)");
	tf_option_tags_page.appendChild(tf_option_newtaginput);
	
	var tf_option_newtag_addfilter = document.createElement("input");
	tf_option_newtag_addfilter.id = "tf_option_newtag_addfilter";
	tf_option_newtag_addfilter.type = "button";
	tf_option_newtag_addfilter.value = "Add to filter";	
	tf_option_newtag_addfilter.style.display = "inline-block";	
	tf_option_newtag_addfilter.style.maxWidth = "45%";	
	tf_option_newtag_addfilter.style.marginRight = "1ex";	
	tf_option_newtag_addfilter.addEventListener("click", function f() { add_tags(document.getElementById("tf_option_newtaginput").value.split(" "),"filter"); destroy_tagfilter_editor(); show_tagfilter_editor(); });
	tf_option_tags_page.appendChild(tf_option_newtag_addfilter);
	
	var tf_option_newtag_addfav = document.createElement("input");
	tf_option_newtag_addfav.id = "tf_option_newtag_addfav";
	tf_option_newtag_addfav.type = "button";
	tf_option_newtag_addfav.value = "Add to favorites";	
	tf_option_newtag_addfav.style.display = "inline-block";	
	tf_option_newtag_addfav.style.maxWidth = "45%";	
	tf_option_newtag_addfav.style.marginLeft = "1ex";	
	tf_option_newtag_addfav.addEventListener("click", function f() { add_tags(document.getElementById("tf_option_newtaginput").value.split(" "),"fav");  destroy_tagfilter_editor(); show_tagfilter_editor(); });
	tf_option_tags_page.appendChild(tf_option_newtag_addfav);
	
	
	tf_option_box.appendChild(tf_option_tags_page);
	
	
	//"Images" -page:
	var tf_option_images_page = document.createElement("div");
	tf_option_images_page.className = "tf_option_group";
	tf_option_images_page.id = "tf_option_group_images";
	tf_option_images_page.style.minWidth = "20em";
	tf_option_images_page.style.display = "none";
	
	var tf_option_images_dhilink1 = document.createElement("a");
	tf_option_images_dhilink1.href = "http://dl.dropbox.com/u/22821615/diaspora/extensions/hideimg/hideimg.html";
	tf_option_images_dhilink1.style.backgroundColor = "#fff";
	tf_option_images_dhilink1.style.padding = "0.5ex 0.25ex 0.5ex 1ex";
	tf_option_images_dhilink1.appendChild(document.createTextNode("maybe you'd like to try D* Hide Images by"));
	var tf_option_images_dhilink2 = document.createElement("a");
	tf_option_images_dhilink2.href = "https://joindiaspora.com/u/3l3v3n";
	tf_option_images_dhilink2.style.backgroundColor = "#fff";
	tf_option_images_dhilink2.appendChild(document.createTextNode("▲rl✱gattonero"));
	tf_option_images_dhilink2.style.padding = "0.5ex 1ex 0.5ex 0.25ex";
	tf_option_images_page.appendChild(tf_option_images_dhilink1);
	tf_option_images_page.appendChild(tf_option_images_dhilink2);
	
	
	
	var tf_option_images_hide_apply_group = document.createElement("fieldset");
	tf_option_images_hide_apply_group.id = "tf_option_images_hide_apply_group";
	tf_option_images_hide_apply_group.style.paddingTop = "0";
	var tf_option_images_hide_apply_group_legend = document.createElement("legend");
	tf_option_images_hide_apply_group_legend.id = "tf_option_images_hide_apply_group_legend";
	tf_option_images_hide_apply_group_legend.appendChild(document.createTextNode("How to hide images?"));
	var tf_option_images_apply_option1 = document.createElement("input");
	tf_option_images_apply_option1.id = "tf_option_images_apply_option1";
	tf_option_images_apply_option1.name = "tf_option_images_apply_option";
	tf_option_images_apply_option1.type = "radio";
	tf_option_images_apply_option1.value = "1";
	if (my_getValue("image_mode",0) <= 1) {
		tf_option_images_apply_option1.checked = true;
	}
	tf_option_images_apply_option1.style.display = "inline";
	tf_option_images_apply_option1.style.maxWidth = "1em";
	var tf_option_images_apply_option2 = document.createElement("input");
	tf_option_images_apply_option2.id = "tf_option_images_apply_option2";
	tf_option_images_apply_option2.name = "tf_option_images_apply_option";
	tf_option_images_apply_option2.type = "radio";
	tf_option_images_apply_option2.value = "2";
	if (my_getValue("image_mode",0) == 2) {
		tf_option_images_apply_option2.checked = true;
	}
	tf_option_images_apply_option2.style.display = "inline";
	tf_option_images_apply_option2.style.maxWidth = "1em";
	var tf_option_images_apply_option3 = document.createElement("input");
	tf_option_images_apply_option3.id = "tf_option_images_apply_option3";
	tf_option_images_apply_option3.name = "tf_option_images_apply_option";
	tf_option_images_apply_option3.type = "radio";
	tf_option_images_apply_option3.value = "3";
	if (my_getValue("image_mode",0) == 3) {
		tf_option_images_apply_option3.checked = true;
	}
	tf_option_images_apply_option3.style.display = "inline";
	tf_option_images_apply_option3.style.maxWidth = "1em";
	var tf_option_images_apply_option4 = document.createElement("input");
	tf_option_images_apply_option4.id = "tf_option_images_apply_option4";
	tf_option_images_apply_option4.name = "tf_option_images_apply_option";
	tf_option_images_apply_option4.type = "radio";
	tf_option_images_apply_option4.value = "4";
	if (my_getValue("image_mode",0) == 4) {
		tf_option_images_apply_option4.checked = true;
	}
	tf_option_images_apply_option4.style.display = "inline";
	tf_option_images_apply_option4.style.maxWidth = "1em";
	tf_option_images_apply_option1.addEventListener("change",function f() { my_setValue("image_mode",this.value); });
	tf_option_images_apply_option2.addEventListener("change",function f() { my_setValue("image_mode",this.value); });
	tf_option_images_apply_option3.addEventListener("change",function f() { my_setValue("image_mode",this.value); });
	tf_option_images_apply_option4.addEventListener("change",function f() { my_setValue("image_mode",this.value); });
	var tf_option_images_apply_label1 = document.createElement("label");
	tf_option_images_apply_label1.id = "tf_option_images_apply_label1";
	tf_option_images_apply_label1.setAttribute("for","tf_option_images_apply_option1");
	tf_option_images_apply_label1.className = "bootstrapped";
	tf_option_images_apply_label1.style.display = "block";
	tf_option_images_apply_label1.appendChild(tf_option_images_apply_option1);
	tf_option_images_apply_label1.appendChild(document.createTextNode("Show images"));
	var tf_option_images_apply_label2 = document.createElement("label");
	tf_option_images_apply_label2.id = "tf_option_images_apply_label2";
	tf_option_images_apply_label2.setAttribute("for","tf_option_images_apply_option2");
	tf_option_images_apply_label2.className = "bootstrapped";
	tf_option_images_apply_label2.style.display = "block";
	tf_option_images_apply_label2.appendChild(tf_option_images_apply_option2);
	tf_option_images_apply_label2.appendChild(document.createTextNode("Hide images"));
	var tf_option_images_apply_label3 = document.createElement("label");
	tf_option_images_apply_label3.id = "tf_option_images_apply_label3";
	tf_option_images_apply_label3.setAttribute("for","tf_option_images_apply_option3");
	tf_option_images_apply_label3.className = "bootstrapped";
	tf_option_images_apply_label3.style.display = "block";
	tf_option_images_apply_label3.appendChild(tf_option_images_apply_option3);
	tf_option_images_apply_label3.appendChild(document.createTextNode("Replace images with a textlink"));
	var tf_option_images_apply_label4 = document.createElement("label");
	tf_option_images_apply_label4.id = "tf_option_images_apply_label4";
	tf_option_images_apply_label4.setAttribute("for","tf_option_images_apply_option4");
	tf_option_images_apply_label4.className = "bootstrapped";
	tf_option_images_apply_label4.style.display = "block";
	tf_option_images_apply_label4.appendChild(tf_option_images_apply_option4);
	tf_option_images_apply_label4.appendChild(document.createTextNode("Replace images with this grafic:"));
	var tf_option_images_replace_url = document.createElement("input");
	tf_option_images_replace_url.value = my_getValue("image_url","https://upload.wikimedia.org/wikipedia/commons/1/12/Black_Paw.svg");
	tf_option_images_replace_url.id = "tf_option_images_replace_url";
	tf_option_images_replace_url.addEventListener("blur",function f() { my_setValue("image_url",this.value); document.getElementById("tf_option_images_replace_img").src = my_getValue("image_url","https://upload.wikimedia.org/wikipedia/commons/1/12/Black_Paw.svg"); });
	var tf_option_images_replace_img = document.createElement("img");
	tf_option_images_replace_img.id = "tf_option_images_replace_img";
	tf_option_images_replace_img.src = my_getValue("image_url","https://upload.wikimedia.org/wikipedia/commons/1/12/Black_Paw.svg");
	tf_option_images_replace_img.style.height = my_getValue("image_height","30")+"px";
	var tf_option_images_replace_hight = document.createElement("input");
	tf_option_images_replace_hight.id = "tf_option_images_replace_hight";
	tf_option_images_replace_hight.value = my_getValue("image_height","30");
	tf_option_images_replace_hight.style.display = "inline";
	tf_option_images_replace_hight.style.width = "3em";
	tf_option_images_replace_hight.style.textAlign = "center";
	tf_option_images_replace_hight.addEventListener("blur",function f() { my_setValue("image_height",this.value); document.getElementById("tf_option_images_replace_img").style.height = my_getValue("image_height","30")+"px"; });
	
	tf_option_images_hide_apply_group.appendChild(tf_option_images_hide_apply_group_legend);
	tf_option_images_hide_apply_group.appendChild(tf_option_images_apply_label1);
	tf_option_images_hide_apply_group.appendChild(tf_option_images_apply_label2);
	tf_option_images_hide_apply_group.appendChild(tf_option_images_apply_label3);
	tf_option_images_hide_apply_group.appendChild(tf_option_images_apply_label4);
	tf_option_images_hide_apply_group.appendChild(tf_option_images_replace_url);
	tf_option_images_hide_apply_group.appendChild(tf_option_images_replace_img);
	tf_option_images_hide_apply_group.appendChild(document.createTextNode("Image-hight: "));
	tf_option_images_hide_apply_group.appendChild(tf_option_images_replace_hight);
	tf_option_images_hide_apply_group.appendChild(document.createTextNode(" pixels"));
	
	tf_option_images_page.appendChild(tf_option_images_hide_apply_group);
	
	
	
	
	var tf_option_images_hideframe_apply_group = document.createElement("fieldset");
	tf_option_images_hideframe_apply_group.id = "tf_option_images_hideframe_apply_group";
	tf_option_images_hideframe_apply_group.style.paddingTop = "0";
	var tf_option_images_hideframe_apply_group_legend = document.createElement("legend");
	tf_option_images_hideframe_apply_group_legend.id = "tf_option_images_hideframe_apply_group_legend";
	tf_option_images_hideframe_apply_group_legend.appendChild(document.createTextNode("How to hide iframes?"));
	var tf_option_images_frame_option1 = document.createElement("input");
	tf_option_images_frame_option1.id = "tf_option_images_frame_option1";
	tf_option_images_frame_option1.name = "tf_option_images_frame_option";
	tf_option_images_frame_option1.type = "radio";
	tf_option_images_frame_option1.value = "1";
	if (my_getValue("iframe_mode",0) <= 1) {
		tf_option_images_frame_option1.checked = true;
	}
	tf_option_images_frame_option1.style.display = "inline";
	tf_option_images_frame_option1.style.maxWidth = "1em";
	var tf_option_images_frame_option2 = document.createElement("input");
	tf_option_images_frame_option2.id = "tf_option_images_frame_option2";
	tf_option_images_frame_option2.name = "tf_option_images_frame_option";
	tf_option_images_frame_option2.type = "radio";
	tf_option_images_frame_option2.value = "2";
	if (my_getValue("iframe_mode",0) == 2) {
		tf_option_images_frame_option2.checked = true;
	}
	tf_option_images_frame_option2.style.display = "inline";
	tf_option_images_frame_option2.style.maxWidth = "1em";
	var tf_option_images_frame_option3 = document.createElement("input");
	tf_option_images_frame_option3.id = "tf_option_images_frame_option3";
	tf_option_images_frame_option3.name = "tf_option_images_frame_option";
	tf_option_images_frame_option3.type = "radio";
	tf_option_images_frame_option3.value = "3";
	if (my_getValue("iframe_mode",0) == 3) {
		tf_option_images_frame_option3.checked = true;
	}
	tf_option_images_frame_option3.style.display = "inline";
	tf_option_images_frame_option3.style.maxWidth = "1em";
	var tf_option_images_frame_option4 = document.createElement("input");
	tf_option_images_frame_option4.id = "tf_option_images_frame_option4";
	tf_option_images_frame_option4.name = "tf_option_images_frame_option";
	tf_option_images_frame_option4.type = "radio";
	tf_option_images_frame_option4.value = "4";
	if (my_getValue("iframe_mode",0) == 4) {
		tf_option_images_frame_option4.checked = true;
	}
	tf_option_images_frame_option4.style.display = "inline";
	tf_option_images_frame_option4.style.maxWidth = "1em";
	tf_option_images_frame_option1.addEventListener("change",function f() { my_setValue("iframe_mode",this.value); });
	tf_option_images_frame_option2.addEventListener("change",function f() { my_setValue("iframe_mode",this.value); });
	tf_option_images_frame_option3.addEventListener("change",function f() { my_setValue("iframe_mode",this.value); });
	tf_option_images_frame_option4.addEventListener("change",function f() { my_setValue("iframe_mode",this.value); });
	var tf_option_images_frame_label1 = document.createElement("label");
	tf_option_images_frame_label1.id = "tf_option_images_frame_label1";
	tf_option_images_frame_label1.setAttribute("for","tf_option_images_frame_option1");
	tf_option_images_frame_label1.className = "bootstrapped";
	tf_option_images_frame_label1.style.display = "block";
	tf_option_images_frame_label1.appendChild(tf_option_images_frame_option1);
	tf_option_images_frame_label1.appendChild(document.createTextNode("Show iFrames and videos"));
	var tf_option_images_frame_label2 = document.createElement("label");
	tf_option_images_frame_label2.id = "tf_option_images_frame_label2";
	tf_option_images_frame_label2.setAttribute("for","tf_option_images_frame_option2");
	tf_option_images_frame_label2.className = "bootstrapped";
	tf_option_images_frame_label2.style.display = "block";
	tf_option_images_frame_label2.appendChild(tf_option_images_frame_option2);
	tf_option_images_frame_label2.appendChild(document.createTextNode("Destroy iFrames! I hate those."));
	var tf_option_images_frame_label3 = document.createElement("label");
	tf_option_images_frame_label3.id = "tf_option_images_frame_label3";
	tf_option_images_frame_label3.setAttribute("for","tf_option_images_frame_option3");
	tf_option_images_frame_label3.className = "bootstrapped";
	tf_option_images_frame_label3.style.display = "block";
	tf_option_images_frame_label3.appendChild(tf_option_images_frame_option3);
	tf_option_images_frame_label3.appendChild(document.createTextNode("Create a textlink"));
	var tf_option_images_frame_label4 = document.createElement("label");
	tf_option_images_frame_label4.id = "tf_option_images_frame_label4";
	tf_option_images_frame_label4.setAttribute("for","tf_option_images_frame_option4");
	tf_option_images_frame_label4.className = "bootstrapped";
	tf_option_images_frame_label4.style.display = "block";
	tf_option_images_frame_label4.appendChild(tf_option_images_frame_option4);
	tf_option_images_frame_label4.appendChild(document.createTextNode("Create a show-button with this grafic:"));
	var tf_option_images_freplace_url = document.createElement("input");
	tf_option_images_freplace_url.value = my_getValue("iframe_url","https://upload.wikimedia.org/wikipedia/commons/b/b7/Gnome-multimedia.svg");
	tf_option_images_freplace_url.id = "tf_option_images_freplace_url";
	tf_option_images_freplace_url.addEventListener("blur",function f() { my_setValue("iframe_url",this.value); document.getElementById("tf_option_images_freplace_img").src = my_getValue("iframe_url","https://upload.wikimedia.org/wikipedia/commons/b/b7/Gnome-multimedia.svg"); });
	var tf_option_images_freplace_img = document.createElement("img");
	tf_option_images_freplace_img.id = "tf_option_images_freplace_img";
	tf_option_images_freplace_img.src = my_getValue("iframe_url","https://upload.wikimedia.org/wikipedia/commons/b/b7/Gnome-multimedia.svg");
	tf_option_images_freplace_img.style.height = my_getValue("image_height","30")+"px";
	var tf_option_images_freplace_hight = document.createElement("input");
	tf_option_images_freplace_hight.id = "tf_option_images_freplace_hight";
	tf_option_images_freplace_hight.value = my_getValue("iframe_height","30");
	tf_option_images_freplace_hight.style.display = "inline";
	tf_option_images_freplace_hight.style.width = "3em";
	tf_option_images_freplace_hight.style.textAlign = "center";
	tf_option_images_freplace_hight.addEventListener("blur",function f() { my_setValue("iframe_height",this.value); document.getElementById("tf_option_images_freplace_img").style.height = my_getValue("iframe_height","30")+"px"; });
	
	tf_option_images_hideframe_apply_group.appendChild(tf_option_images_hideframe_apply_group_legend);
	tf_option_images_hideframe_apply_group.appendChild(document.createTextNode("(and within videos)"));
	tf_option_images_hideframe_apply_group.appendChild(tf_option_images_frame_label1);
	tf_option_images_hideframe_apply_group.appendChild(tf_option_images_frame_label2);
	tf_option_images_hideframe_apply_group.appendChild(tf_option_images_frame_label3);
	tf_option_images_hideframe_apply_group.appendChild(tf_option_images_frame_label4);
	tf_option_images_hideframe_apply_group.appendChild(tf_option_images_freplace_url);
	tf_option_images_hideframe_apply_group.appendChild(tf_option_images_freplace_img);
	tf_option_images_hideframe_apply_group.appendChild(document.createTextNode("Image-hight: "));
	tf_option_images_hideframe_apply_group.appendChild(tf_option_images_freplace_hight);
	tf_option_images_hideframe_apply_group.appendChild(document.createTextNode(" pixels"));
	
	tf_option_images_page.appendChild(tf_option_images_hideframe_apply_group);
		
	tf_option_box.appendChild(tf_option_images_page);
	
	
	
	//"About" -page:
	var tf_option_about_page = document.createElement("div");
	tf_option_about_page.className = "tf_option_group";
	tf_option_about_page.id = "tf_option_group_about";
	tf_option_about_page.style.minWidth = "20em";
	tf_option_about_page.style.display = "none";
		
	var tf_option_about_col_title1 = document.createElement("h3");
	tf_option_about_col_title1.appendChild(document.createTextNode("Diaspora Tagfilter"));
	tf_option_about_page.appendChild(tf_option_about_col_title1);
	
	var tf_option_about_table = document.createElement("table");
	var tf_option_about_row_version = document.createElement("tr");
	var tf_option_about_col_version1 = document.createElement("td");
	tf_option_about_col_version1.appendChild(document.createTextNode("Version"));
	var tf_option_about_col_version2 = document.createElement("td");
	tf_option_about_col_version2.appendChild(document.createTextNode("2.0 (or something around)"));
	tf_option_about_row_version.appendChild(tf_option_about_col_version1);
	tf_option_about_row_version.appendChild(tf_option_about_col_version2);
	tf_option_about_table.appendChild(tf_option_about_row_version);
	
	var tf_option_about_row_licence = document.createElement("tr");
	var tf_option_about_col_licence1 = document.createElement("td");
	tf_option_about_col_licence1.appendChild(document.createTextNode("Copyright"));
	var tf_option_about_col_licence2 = document.createElement("td");
	tf_option_about_col_licence2.appendChild(document.createTextNode("© 2011 Deus Figendi GPL 3.0"));
	tf_option_about_row_licence.appendChild(tf_option_about_col_licence1);
	tf_option_about_row_licence.appendChild(tf_option_about_col_licence2);
	tf_option_about_table.appendChild(tf_option_about_row_licence);
	
	var tf_option_about_row_programming = document.createElement("tr");
	var tf_option_about_col_programming1 = document.createElement("td");
	tf_option_about_col_programming1.appendChild(document.createTextNode("Coding"));
	var tf_option_about_col_programming2 = document.createElement("td");
	tf_option_about_col_programming2.appendChild(document.createTextNode("Deus Figendi"));
	tf_option_about_row_programming.appendChild(tf_option_about_col_programming1);
	tf_option_about_row_programming.appendChild(tf_option_about_col_programming2);
	tf_option_about_table.appendChild(tf_option_about_row_programming);
	var tf_option_about_row_pawimage = document.createElement("tr");
	var tf_option_about_col_pawimage1 = document.createElement("td");
	var tf_option_about_pawimage_img = document.createElement("img");
	tf_option_about_pawimage_img.src = "https://upload.wikimedia.org/wikipedia/commons/1/12/Black_Paw.svg";
	tf_option_about_pawimage_img.style.height = "15px";
	tf_option_about_pawimage_img.alt = "black paw image";
	tf_option_about_col_pawimage1.appendChild(tf_option_about_pawimage_img);
	var tf_option_about_pawimage_link = document.createElement("a");
	tf_option_about_pawimage_link.href = "https://commons.wikimedia.org/wiki/File:Black_Paw.svg";
	tf_option_about_pawimage_link.appendChild(document.createTextNode("(Source)"));
	var tf_option_about_col_pawimage2 = document.createElement("td");
	tf_option_about_col_pawimage2.appendChild(document.createTextNode("Public Domain "));
	tf_option_about_col_pawimage2.appendChild(tf_option_about_pawimage_link);
	tf_option_about_row_pawimage.appendChild(tf_option_about_col_pawimage1);
	tf_option_about_row_pawimage.appendChild(tf_option_about_col_pawimage2);
	tf_option_about_table.appendChild(tf_option_about_row_pawimage);
	var tf_option_about_row_filmimage = document.createElement("tr");
	var tf_option_about_col_filmimage1 = document.createElement("td");
	var tf_option_about_filmimage_img = document.createElement("img");
	tf_option_about_filmimage_img.src = "https://upload.wikimedia.org/wikipedia/commons/b/b7/Gnome-multimedia.svg";
	tf_option_about_filmimage_img.style.height = "15px";
	tf_option_about_filmimage_img.alt = "GNOME Multimedia Icon";
	tf_option_about_col_filmimage1.appendChild(tf_option_about_filmimage_img);
	var tf_option_about_filmimage_link = document.createElement("a");
	tf_option_about_filmimage_link.href = "https://commons.wikimedia.org/wiki/File:Gnome-multimedia.svg";
	tf_option_about_filmimage_link.appendChild(document.createTextNode("(Source)"));
	var tf_option_about_col_filmimage2 = document.createElement("td");
	tf_option_about_col_filmimage2.appendChild(document.createTextNode("LGPL "));
	tf_option_about_col_filmimage2.appendChild(tf_option_about_filmimage_link);
	tf_option_about_col_filmimage2.appendChild(document.createTextNode(" (© GNOME-Project)"));
	tf_option_about_row_filmimage.appendChild(tf_option_about_col_filmimage1);
	tf_option_about_row_filmimage.appendChild(tf_option_about_col_filmimage2);
	tf_option_about_table.appendChild(tf_option_about_row_filmimage);
	/*
	var tf_option_about_row_thanks = document.createElement("tr");
	var tf_option_about_col_thanks1 = document.createElement("td");
	tf_option_about_col_thanks1.appendChild(document.createTextNode("Thanks to"));
	var tf_option_about_col_thanks2 = document.createElement("td");
	var tf_option_about_thank1_a = document.createElement("a");
	tf_option_about_thank1_a.href = "";
	tf_option_about_thank1_a.appendChild(document.createTextNode(""));
	var tf_option_about_thank2_a = document.createElement("a");
	tf_option_about_thank2_a.href = "";
	tf_option_about_thank2_a.appendChild(document.createTextNode(""));
	var tf_option_about_thank3_a = document.createElement("a");
	tf_option_about_thank3_a.href = "";
	tf_option_about_thank3_a.appendChild(document.createTextNode(""));
	var tf_option_about_thank4_a = document.createElement("a");
	tf_option_about_thank4_a.href = "";
	tf_option_about_thank4_a.appendChild(document.createTextNode(""));
	var tf_option_about_thank5_a = document.createElement("a");
	tf_option_about_thank5_a.href = "";
	tf_option_about_thank5_a.appendChild(document.createTextNode(""));
	tf_option_about_col_thanks2.appendChild(tf_option_about_thank1_a);
	tf_option_about_col_thanks2.appendChild(tf_option_about_thank2_a);
	tf_option_about_col_thanks2.appendChild(tf_option_about_thank3_a);
	tf_option_about_col_thanks2.appendChild(tf_option_about_thank4_a);
	tf_option_about_col_thanks2.appendChild(tf_option_about_thank5_a);
	tf_option_about_row_thanks.appendChild(tf_option_about_col_thanks1);
	tf_option_about_row_thanks.appendChild(tf_option_about_col_thanks2);
	tf_option_about_table.appendChild(tf_option_about_row_thanks);
	*/
	tf_option_about_page.appendChild(tf_option_about_table);
	
	var tf_option_about_linklist  = document.createElement("ul");
		
	var tf_option_about_uso_li  = document.createElement("li");
	var tf_option_about_uso_a   = document.createElement("a");
	tf_option_about_uso_a.href  = "http://userscripts.org/scripts/show/117102";
	tf_option_about_uso_a.appendChild(document.createTextNode("This script on userscripts.org"));
	tf_option_about_uso_li.appendChild(tf_option_about_uso_a);
	tf_option_about_linklist.appendChild(tf_option_about_uso_li);
	
	var tf_option_about_disc_li  = document.createElement("li");
	var tf_option_about_disc_a   = document.createElement("a");
	tf_option_about_disc_a.href  = "https://pod.geraspora.de/posts/196846";
	tf_option_about_disc_a.appendChild(document.createTextNode("Feedbackthread on Diaspora "));
	tf_option_about_disc_li.appendChild(tf_option_about_disc_a);
	var tf_option_about_disc2_a   = document.createElement("a");
	tf_option_about_disc2_a.href  = "https://pod.geraspora.de/posts/198834";
	tf_option_about_disc2_a.appendChild(document.createTextNode("(german)"));
	tf_option_about_disc_li.appendChild(tf_option_about_disc2_a);
	tf_option_about_linklist.appendChild(tf_option_about_disc_li);
	
		
	var tf_option_about_tools_li  = document.createElement("li");
	var tf_option_about_tools_a   = document.createElement("a");
	tf_option_about_tools_a.href  = "https://github.com/diaspora/diaspora/wiki/Tools-to-use-with-Diaspora";
	tf_option_about_tools_a.appendChild(document.createTextNode("GitHub: Tools to use with Diaspora"));
	tf_option_about_tools_li.appendChild(tf_option_about_tools_a);
	tf_option_about_tools_li.appendChild(document.createTextNode(" including..."));
	tf_option_about_linklist.appendChild(tf_option_about_tools_li);
	
	var tf_option_about_dhi_li  = document.createElement("li");
	var tf_option_about_dhi_a   = document.createElement("a");
	tf_option_about_dhi_a.href  = "http://bit.ly/pWcCYN";
	tf_option_about_dhi_a.appendChild(document.createTextNode("D* Hide Images"));
	tf_option_about_dhi_li.appendChild(tf_option_about_dhi_a);
	var tf_option_about_dhi2_a   = document.createElement("a");
	tf_option_about_dhi2_a.href  = "https://joindiaspora.com/u/3l3v3n";
	tf_option_about_dhi2_a.appendChild(document.createTextNode(" by ▲rl✱gattonero"));
	tf_option_about_dhi_li.appendChild(tf_option_about_dhi2_a);
	tf_option_about_linklist.appendChild(tf_option_about_dhi_li);
	
	tf_option_about_page.appendChild(tf_option_about_linklist);
	
	tf_option_box.appendChild(tf_option_about_page);
	
	
	
	document.getElementsByTagName("body")[0].appendChild(tf_option_box);
	
	
	
}

function add_option2options () {
	var tagfilter_option_a = document.createElement("a");
	tagfilter_option_a.appendChild(document.createTextNode("#Tag Filter"));
	tagfilter_option_a.addEventListener("click",function e() { show_tagfilter_editor(); },true);
	var tagfilter_option_li = document.createElement("li");
	tagfilter_option_li.appendChild(tagfilter_option_a);
	if (document.getElementById("user_menu")) {
		document.getElementById("user_menu").appendChild(tagfilter_option_li);
	} else {
		window.setTimeout(add_option2options,500);
	}
}

function check_postings() {
	//load settings:
	var options_filterbytag = my_getValue("tagfilter_on",false);
	var options_filterimages = my_getValue("image_mode",0);
	var options_filteriframe = my_getValue("iframe_mode",0);
	if (options_filterbytag) {
		var options_tags2filter = load_tags("filter");
		var options_favtags_mode = my_getValue("favtags_aply",100);
		if (options_favtags_mode < 4) {
			var options_tags2fav = load_tags("fav");
		}
	}
	if (options_filterimages == 4) {
		var options_imageurl    = my_getValue("image_url","https://upload.wikimedia.org/wikipedia/commons/1/12/Black_Paw.svg");
		var options_imageheight = my_getValue("image_height","30");
	} else {
		var options_imageurl = false;
		var options_imageheight = false;
	}
	if (options_filteriframe == 4) {
		var options_frameurl = my_getValue("iframe_url","https://upload.wikimedia.org/wikipedia/commons/b/b7/Gnome-multimedia.svg"); my_getValue("image_url","https://upload.wikimedia.org/wikipedia/commons/1/12/Black_Paw.svg");
		var options_frameheight = my_getValue("iframe_height","300");
	} else {
		var options_frameurl = false;
		var options_frameheight = false;
	}
	
	var all_postings = document.getElementsByClassName("stream_element");
	
	if (document.getElementById("status_message_fake_text")) {
		if (options_favtags_mode <= 2) {
			if (document.getElementById("status_message_fake_text").value.length < 2) {
				document.getElementById("status_message_fake_text").value = document.getElementById("status_message_fake_text").value + "\n\n"+options_tags2fav.join(" ");
			}
		}

		if (options_favtags_mode == 3) {
			if (document.getElementsByClassName("tagadder").length < 1) {
				var tag_add_ul = document.createElement("ul");
				tag_add_ul.className = "tagadder";
				tag_add_ul.style.margin = "0 0 1.5em 0";
				for (var i = 0; i < options_tags2fav.length; i++) {
					var tag_add_span = document.createElement("li");
					tag_add_span.style.padding = "0 0.5ex";
					tag_add_span.style.cursor = "pointer";
					tag_add_span.style.position = "relative";
					if (i < 5) {
						tag_add_span.style.display = "inline";
					} else {
						tag_add_span.style.display = "none";
					}
					tag_add_span.className = "tagadder";
					tag_add_span.appendChild(document.createTextNode(options_tags2fav[i]));
					tag_add_span.addEventListener("click",function f(){ var target_box = document.getElementById("status_message_fake_text"); target_box.value = target_box.value+" "+this.firstChild.data+" "; });
					tag_add_ul.appendChild(tag_add_span);
				}
				document.getElementById("status_message_fake_text").parentNode.parentNode.insertBefore(tag_add_ul,document.getElementById("status_message_fake_text").parentNode);
				document.getElementById("status_message_fake_text").addEventListener("focus",function f() { for (var i = 0; i < document.getElementById("status_message_fake_text").parentNode.parentNode.getElementsByClassName("tagadder").length; i++) { document.getElementById("status_message_fake_text").parentNode.parentNode.getElementsByClassName("tagadder")[i].style.display = "block";} });
			}
		
		}
	}
	
	for (var i = 0; i < all_postings.length; i++) {
		if (!all_postings[i].tagfilter_checked) {
			all_postings[i].tagfilter_checked = true;
			if (options_filterbytag) {
				filter_post_by_tag(all_postings[i],options_tags2filter);
			}
			if (options_favtags_mode == 1 || options_favtags_mode == 3) {
				add_favtags_2_textbox(all_postings[i],options_favtags_mode,options_tags2fav);
			}
			if (options_filterimages > 1 || options_filteriframe > 1) {
				filter_images(options_filterimages,options_filteriframe,all_postings[i],options_imageurl,options_imageheight,options_frameurl,options_frameheight);
			}
		}
	}
	
}

function filter_images(imagemode,framemode,post_element,imagereplace_url,image_height,framereplace_url,frame_height) {
	//var elements_to_care = false;
	var frames_to_care = post_element.getElementsByTagName("iframe");
	
	
	if (imagemode > 1) {
		var elements_to_care = post_element.getElementsByTagName("img");
		var handle_me = true;
		for (var i = 0; i < elements_to_care.length; i++) {
			handle_me = true;
			if (elements_to_care[i].parentNode.classList.contains("indicator"))           { handle_me = false; }
			if (elements_to_care[i].parentNode.classList.contains("controls"))            { handle_me = false; }
			if (elements_to_care[i].parentNode.parentNode.classList.contains("controls")) { handle_me = false; }
			if (elements_to_care[i].classList.contains("avatar"))                         { handle_me = false; }
			if (elements_to_care[i].parentNode.classList.contains("likes_container"))     { handle_me = false; }
			
			
			if (handle_me) {
				if (elements_to_care[i].nodeName.toLowerCase() == "img") {
					if (imagemode == 1) {
						//do nothing
					} else if (imagemode == 2) {
						//just hide the image
						elements_to_care[i].style.display = "none";
					} else if (imagemode == 3) {
						//handle by textlink
						var image_replacelink = document.createElement("a");
						var image_replacetext = " Link to image ";
						if (elements_to_care[i].title.length > 1) { image_replacetext = elements_to_care[i].tilte; }
						if (elements_to_care[i].alt.length > 1) { image_replacetext = elements_to_care[i].alt; }
						image_replacelink.title = elements_to_care[i].title;
						image_replacelink.href = elements_to_care[i].src;
						image_replacelink.appendChild(document.createTextNode(image_replacetext));
						if (elements_to_care[i].parentNode.nodeName.toLowerCase() == "a") {
							elements_to_care[i].parentNode.parentNode.insertBefore(image_replacelink,elements_to_care[i].parentNode);
							elements_to_care[i].parentNode.appendChild(document.createTextNode(" (Link) "));
						} else {
							elements_to_care[i].parentNode.insertBefore(image_replacelink,elements_to_care[i]);
						}
						elements_to_care[i].style.display = "none";
					} else if (imagemode == 4) {
						//handle by image
						if (!elements_to_care[i].classList.contains("imgage_redisplay_button") && elements_to_care[i].style.display != "none") {
							
							if (!elements_to_care[i].id) { elements_to_care[i].id = "image_hidden_"+Math.round(Math.random() * 10000); }
							var imgage_redisplay_button = document.createElement("img");
							imgage_redisplay_button.id = elements_to_care[i].id+"_redisplay_button";
							imgage_redisplay_button.className = "imgage_redisplay_button";
							imgage_redisplay_button.src = imagereplace_url;
							imgage_redisplay_button.style.height = image_height+"px";
							imgage_redisplay_button.style.cursor = "pointer";
							imgage_redisplay_button.addEventListener("click",function f() { if(document.getElementById(this.id.substring(0,this.id.length-17)).style.display == "none") { document.getElementById(this.id.substring(0,this.id.length-17)).style.display = null; } else {  document.getElementById(this.id.substring(0,this.id.length-17)).style.display = "none"; } });
												
							elements_to_care[i].style.display = "none";
							if (elements_to_care[i].parentNode.nodeName.toLowerCase() == "a") {
								elements_to_care[i].parentNode.parentNode.insertBefore(imgage_redisplay_button,elements_to_care[i].parentNode);
							} else {
								elements_to_care[i].parentNode.insertBefore(imgage_redisplay_button,elements_to_care[i]);
							}
						}
					}
				}
			}
		}
	}
	if (framemode > 1) {
		var elements_to_care = post_element.getElementsByTagName("iframe");
		var handle_me = true;
		for (var i = 0; i < elements_to_care.length; i++) {
			handle_me = true;
			if (elements_to_care[i].parentNode.classList.contains("indicator"))           { handle_me = false; }
			if (elements_to_care[i].parentNode.classList.contains("controls"))            { handle_me = false; }
			if (elements_to_care[i].parentNode.parentNode.classList.contains("controls")) { handle_me = false; }
			if (elements_to_care[i].classList.contains("avatar"))                         { handle_me = false; }
			if (elements_to_care[i].parentNode.classList.contains("likes_container"))     { handle_me = false; }
			
			
			if (handle_me) {
				if (framemode == 1) {
					//do nothing
				} else if (framemode == 2) {
					//ELIMINATE THAT DALEK!
					destroy_element(elements_to_care[i]);
				} else if (framemode == 3) {
					//handle by textlink
					var frame_replacelink = document.createElement("a");
					var frame_replacetext = " Link to video (or other content) ";
					if (elements_to_care[i].title.length > 1) { frame_replacetext = elements_to_care[i].tilte; }
					if (elements_to_care[i].alt.length > 1) { frame_replacetext = elements_to_care[i].alt; }
					frame_replacelink.title = elements_to_care[i].title;
					frame_replacelink.href = elements_to_care[i].src;
					frame_replacelink.appendChild(document.createTextNode(frame_replacetext));
					elements_to_care[i].parentNode.insertBefore(frame_replacelink,elements_to_care[i]);
					destroy_element(elements_to_care[i]);
				} else if (framemode == 4) {
					//handle by image
					if (!elements_to_care[i].classList.contains("iframe_redisplay_button") && elements_to_care[i].style.display != "none") {
						
						if (!elements_to_care[i].id) { elements_to_care[i].id = "iframe_hidden_"+Math.round(Math.random() * 10000); }
						var iframe_redisplay_button = document.createElement("img");
						iframe_redisplay_button.id = elements_to_care[i].id+"_redisplay_button";
						iframe_redisplay_button.className = "iframe_redisplay_button";
						iframe_redisplay_button.src = framereplace_url;
						iframe_redisplay_button.style.height = frame_height+"px";
						iframe_redisplay_button.style.cursor = "pointer";
						iframe_redisplay_button.addEventListener("click",function f() { if(document.getElementById(this.id.substring(0,this.id.length-17)).style.display == "none") { document.getElementById(this.id.substring(0,this.id.length-17)).style.display = null; } else {  document.getElementById(this.id.substring(0,this.id.length-17)).style.display = "none"; } });
											
						elements_to_care[i].style.display = "none";
						
						elements_to_care[i].parentNode.insertBefore(iframe_redisplay_button,elements_to_care[i]);
					}
				}
			}
		}
	}
}

function find_tags(post_element) {
	
	
	var all_tag_elements = post_element.getElementsByClassName("tag");
	var all_found_tags = new Array();
	
	for (var i = 0; i < all_tag_elements.length; i++) {
		all_found_tags.push(all_tag_elements[i].firstChild.data.toLowerCase());
	}
	return all_found_tags;
}

function add_favtags_2_textbox(post_element,favtag_mode,fav_tags) {
	if (favtag_mode == 1) {
		for (var i = 0; i < post_element.getElementsByClassName("comment_box").length; i++) {
			post_element.getElementsByClassName("comment_box")[i].addEventListener("focus",function f(){ if (this.value.length < 2) { this.value = this.value+"\n\n"+fav_tags.join(" "); this.selectionStart = 0;} });
		}
	}
	if (favtag_mode == 3) {
		var tagadddiv = post_element.getElementsByClassName("submit_button")[0];
		if (typeof(tagadddiv) != "undefined") {
			
			for (var i = 0; i < fav_tags.length; i++) {
				var tag_add_span = document.createElement("span");
				tag_add_span.style.padding = "0 0.5ex";
				tag_add_span.style.cursor = "pointer";
				tag_add_span.appendChild(document.createTextNode(fav_tags[i]));
				tag_add_span.addEventListener("click",function f(){ var target_box = this.parentNode; while (target_box.nodeName.toLowerCase() != "p") { target_box = target_box.previousSibling; } target_box = target_box.getElementsByClassName("comment_box")[1]; target_box.value = target_box.value+" "+this.firstChild.data+" "; });
				tagadddiv.insertBefore(tag_add_span,post_element.getElementsByClassName("comment_submit")[0]);
			}
		}
	}
}


function filter_post_by_tag(post_element,unwanted_tags) {
	var given_tags = find_tags(post_element);
	var filtered_tags = new Array();
	for (var i = 0; i < given_tags.length; i++) {
		if (unwanted_tags.in_array(given_tags[i])) {
			filtered_tags.push(given_tags[i]);
		}
	}
	if (filtered_tags.length > 0) {
		//filter Post...
		//hide Avatar:
		var avatarelement = post_element.getElementsByClassName("avatar")[0];
		if (avatarelement.parentNode.nodeName.toLowerCase() == "a") {
			avatarelement = avatarelement.parentNode;
		}
		avatarelement.style.display = "none";
		
		//hide content:
		var content_container = post_element.getElementsByClassName("content")[0];
		for (var i = 0; i < content_container.childNodes.length; i++) {
			if (content_container.childNodes[i].classList) {
				if (!content_container.childNodes[i].classList.contains("post_initial_info")) {
					content_container.childNodes[i].style.display = "none";
				}
			}
		}
		
		//lower streamelement
		post_element.style.padding = "15px 15px 1px 1px";
		post_element.style.minHeight = "5px";
		
		//list why this post is blocked
		var tag_span = document.createElement("span");
		tag_span.className = "via";
		tag_span.style.cursor = "pointer";
		tag_span.appendChild(document.createTextNode(filtered_tags.join(" ")));
		
		tag_span.addEventListener("click",function f() {redisplay_posting(this);});
		
		content_container.getElementsByClassName("post_initial_info")[0].appendChild(tag_span);
		
	} else {
		if (post_element.getElementsByClassName("controls").length > 0) {
			var tag_ul = document.createElement("ul");
			//tag_ul.style.paddingLeft = "0"; 
			tag_ul.style.padding = "0 2ex 0 10px";
			tag_ul.style.marginRight = "0";
			tag_ul.style.textAlign = "left";
			//tag_ul.style.opacity = "0.7";
			tag_ul.style.backgroundColor = "#fff";
			tag_ul.style.border = "dotted 1px";
			
				
			for (var i = 0; i < given_tags.length; i++) {
				if (i == 0) {
					var tag_li = document.createElement("li");
					tag_li.appendChild(document.createTextNode("X"));
					tag_li.style.cursor = "pointer";
					tag_li.style.textAlign = "right";
					tag_li.style.position = "absolute";
					tag_li.style.right = "0.5ex";
					tag_li.addEventListener("click",function f(){ destroy_parent_ul(this); });
					tag_ul.appendChild(tag_li);
					
					var tag_li = document.createElement("li");
					tag_li.appendChild(document.createTextNode("Add tags to filter:"));
					tag_li.style.fontWeight = "bold";
					tag_ul.appendChild(tag_li);
				}
				var tag_li = document.createElement("li");
				tag_li.appendChild(document.createTextNode(given_tags[i]));
				tag_li.style.cursor = "pointer";
				tag_li.addEventListener("mousemove",function f(){this.style.textDecoration = "line-through";});
				tag_li.addEventListener("mouseout",function f(){ this.style.textDecoration = null;});
				tag_li.addEventListener("click",function f(){ add_tags(new Array(this.firstChild.data.toLowerCase()),"filter"); });
				tag_ul.appendChild(tag_li);
			}
			post_element.getElementsByClassName("controls")[0].appendChild(tag_ul);
			post_element.getElementsByClassName("controls")[0].style.textAlign = "right";
		}
	}
}

function destroy_element(element) {
	element.parentNode.removeChild(element);
}

function destroy_parent_ul(li) {
	var ul_element = li;
	while (ul_element.nodeName.toLowerCase() != "ul") {
		ul_element = ul_element.parentNode;
	}
	ul_element.parentNode.removeChild(ul_element);
}


function redisplay_posting(some_element_inside) {
	var stream_element = some_element_inside;
	while (!stream_element.classList.contains("stream_element") && stream_element.nodeName.toLowerCase() != "body") {
		stream_element = stream_element.parentNode;
	}
	if (stream_element.classList.contains("stream_element")) {
		//reverse everything happened while hiding...
		
		var avatarelement = stream_element.getElementsByClassName("avatar")[0];
		if (avatarelement.parentNode.nodeName.toLowerCase() == "a") {
			avatarelement = avatarelement.parentNode;
		}
		avatarelement.style.display = null;
		
		//hide content:
		var content_container = stream_element.getElementsByClassName("content")[0];
		for (var i = 0; i < content_container.childNodes.length; i++) {
			if (content_container.childNodes[i].classList) {
					content_container.childNodes[i].style.display = null;
			}
		}
		
		//lower streamelement
		stream_element.style.padding = null;
		stream_element.style.minHeight = null;
		
		
	}
}





add_option2options();

window.setInterval(check_postings,1000);



/*

                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU General Public License is a free, copyleft license for
software and other kinds of works.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.  We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors.  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights.  Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received.  You must make sure that they, too, receive
or can get the source code.  And you must show them these terms so they
know their rights.

  Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

  For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software.  For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

  Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so.  This is fundamentally incompatible with the aim of
protecting users' freedom to change the software.  The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable.  Therefore, we
have designed this version of the GPL to prohibit the practice for those
products.  If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

  Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary.  To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

  The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Use with the GNU Affero General Public License.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

                     END OF TERMS AND CONDITIONS

            How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

    <program>  Copyright (C) <year>  <name of author>
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License.  Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<http://www.gnu.org/licenses/>.

  The GNU General Public License does not permit incorporating your program
into proprietary programs.  If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library.  If this is what you want to do, use the GNU Lesser General
Public License instead of this License.  But first, please read
<http://www.gnu.org/philosophy/why-not-lgpl.html>.


*/
