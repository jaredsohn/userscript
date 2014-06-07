// ==UserScript==
// @name        mp3 Filter Results
// @namespace   bitsscream
// @include     http://www.mp3olimp.net/*
// @include     http://mp3skull.com/mp3/*
// @version     2.1
// ==/UserScript==


var G_ARR_BLKD_URL_PATTERN = new Array();
var G_STR_BLKD_DOMAIN_LST = "";
var STATIC_BLOCKED_DOMAIN_LST = "*.jnk.com";
var STATIC_BLK_LST_STORE_KEY = "blkdDomainLst";
var STATIC_DOMAIN_ATTRIB_MAP_LST = new Object();

function init(){
	STATIC_DOMAIN_ATTRIB_MAP_LST["mp3skull.com"] = new DomainAttribMap("", "div", "id=song_html" , 0, "div", "class=left"    );
	STATIC_DOMAIN_ATTRIB_MAP_LST["www.mp3olimp.net"] = new DomainAttribMap("moretrend", "div", "class=mp3Play", 0, "div", "class=fileinfo");

	G_STR_BLKD_DOMAIN_LST = GM_getValue(STATIC_BLK_LST_STORE_KEY,STATIC_BLOCKED_DOMAIN_LST);
	GM_setValue(STATIC_BLK_LST_STORE_KEY, G_STR_BLKD_DOMAIN_LST);
	var arr_blkd_domain_lst = G_STR_BLKD_DOMAIN_LST.split(";");
	for(j=0;j<arr_blkd_domain_lst.length;j++){
			var tmp_url = arr_blkd_domain_lst[j];
			tmp_url = tmp_url.replace(/\//g, '\\/');
			tmp_url = tmp_url.replace(/\./g, '\\.');
			tmp_url = tmp_url.replace(/\?/g, '\\?');
			tmp_url = tmp_url.replace(/\*/g, '.*');
			G_ARR_BLKD_URL_PATTERN.push(new RegExp(tmp_url));
	}
}
function addToBlockedList(){
	var domain = prompt("Please specify domain", this.getAttribute("domain"));
	if (domain!=null && domain!=""){
		G_STR_BLKD_DOMAIN_LST = G_STR_BLKD_DOMAIN_LST + ";" + domain;
		GM_setValue(STATIC_BLK_LST_STORE_KEY, G_STR_BLKD_DOMAIN_LST);
		main(false);
	} 
}
function main(){
	init();
	setTimeout(mainP2, 2000);
}
function mainP2(){
	STATIC_DOMAIN_ATTRIB_MAP_LST[window.location.hostname].main(true);
}
function DomainAttribMap(more_link, outer_elem, outer_prop, outer_index, inner_elem, inner_prop){
	this.outer_elem = outer_elem;
	this.outer_prop = outer_prop;
	this.outer_index = outer_index;
	this.inner_elem = inner_elem;
	this.inner_prop = inner_prop;	
	this.more_link = more_link;
		
	try{//fetch all results
		document.getElementById(this.more_link).click();
	}catch(e){}
	
	
	this.main = function(flg_add_blk){
		var elem_lst = getElementsByProp(document, this.outer_elem, this.outer_prop);
		var cnt=0;	
		for(i=0;i<elem_lst.length&1<10;i++){		
			var flg_found = false;
			var elem_a = elem_lst[i].getElementsByTagName("a")[this.outer_index];
			outer:			
			for(j=0;j<G_ARR_BLKD_URL_PATTERN.length;j++){			
				if (G_ARR_BLKD_URL_PATTERN[j].test(elem_a.hostname)) {	
					elem_lst[i].style.display="none";
					cnt++;
					flg_found = !flg_found;
					break outer;
				}
			}
				
			if(flg_add_blk && !flg_found){
				var elem_div = document.createElement("a");
				elem_div.setAttribute("style", "float:left; height:27px; font-size:13px; padding-top:2px;color:red;text-decoration:underline");
				elem_div.setAttribute("domain", elem_a.hostname);
				elem_div.innerHTML = "Block It!";
				elem_div.addEventListener("click", addToBlockedList, false);
				getElementsByProp(elem_lst[i], this.inner_elem, this.inner_prop)[0].appendChild(elem_div);
			}
		}
		var elem_div = document.createElement("div");
		elem_div.innerHTML = "<hr/><b>" + cnt + " results Blocked as per filter rule!</b>"
		elem_lst[0].parentNode.appendChild(elem_div);
	}
}

//------------------------ Util --------------------------------------------
function getElementsByProp(parent, tagName, propNameVal){
	object=parent.getElementsByTagName(tagName);
	propName = propNameVal.split("=")[0];
	propValue = propNameVal.split("=")[1];
	
	var j=0;
	var retArr=new Array();
	for(z=0;z<object.length;z++){
		if(object[z].getAttribute(propName)==propValue){
			retArr[j++]=object[z];
		}
	}
	return retArr;
}
setTimeout(main, 2000);

