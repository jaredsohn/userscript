// ==UserScript==
// @name 知乎性别区分
// @namespace Ashitaka
// @description 将女性用户答案标红
// @include http://www.zhihu.com*
// @version 0.1
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function change_color(girlslist){
	j=-1;
	temp="";
	girls=new Array();
 	for (i=0;i<girlslist.length;i++){
 		if (girlslist[i] == ","){
 			girls[++j]=temp;
 			temp="";
 		} else {
 			temp=temp+girlslist[i];
 		}
 	}
 	if (girls.length==0) return ;
 	q=0;
	handle=xpath("//div[@class='zm-item-answer ']");
	for (k=0;k<handle.snapshotLength;k++) {
		if (girls[q]>k) continue;
		handle.snapshotItem(k).setAttribute('style','background:#FFCCFF');
		if (q<girls.length -1) {
			q++;

		}else{
			break;
		}
	}

}
function get_sex(usersarr,num,girlslist){
	userurl="http://www.zhihu.com"+usersarr[num][0]+"/about";
	GM_xmlhttpRequest({
	method: 'GET',
	url: userurl,
	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
	onload: function(responseDetails) {
		res=responseDetails.responseText;
		female="zg-icon gender female";
		if (res.indexOf(female)>=0){
			girlslist=girlslist+usersarr[num][1]+",";
		}
		if (num<usersarr.length-1) {
			get_sex(usersarr,num+1,girlslist);
		}else{
			change_color(girlslist);
		}
	}
	});
}

function find_all_user(){
	var users=new Array();
	k=0;
	handle=xpath("//h3[@class='zm-item-answer-author-wrap']");
	for (i=0;i<handle.snapshotLength;i++) {
		curr=handle.snapshotItem(i);
		curr_child=curr.childNodes;

		if (curr_child.length<5)
			continue;
		str=curr_child[3].outerHTML;

		pos=str.indexOf('href=');
		pos+=6;
		link="";
		while (str[pos]!='"') {
			link=link + str[pos];
			pos++;
		}
		users[k]=new Array();
		users[k][0]=link;
		users[k++][1]=i;
	}


	return users;
}


window.addEventListener(
	'load', 
	function() { 
		all_users=find_all_user();
		get_sex(all_users,0,'');
	},
	true);