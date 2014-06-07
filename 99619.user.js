// ==UserScript==
// @name          Beta v1 23-11-2011
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Rubin Jose
// @description   Random Smilies
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();


	smileyarr["smiling"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGppqnXd5GI/AAAAAAAAACY/eRztlvTOdGo/smiling3.gif";
	smileyarr["pray"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGppqoJcoRI/AAAAAAAAACc/RLAh2S1Fadk/manga0.gif";
	smileyarr["kiss"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGppq-d4NNI/AAAAAAAAACg/JlJaKYQybKE/love49.gif";
	smileyarr["love"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGppq4a6NrI/AAAAAAAAACk/-3evS4ktW_E/love27.gif";
    smileyarr["love2"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGppq_IKbyI/AAAAAAAAACo/rQSqCmV2mcs/love3.gif";
	smileyarr["laugh"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp4jHVCpI/AAAAAAAAACs/RQ_hvtefsL8/laughing20.gif";
	smileyarr["laugh2"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp4odA3uI/AAAAAAAAACw/Mihlbyxd6X8/laughing6.gif";
	smileyarr["help"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp4uENiGI/AAAAAAAAAC0/Zbyf2dsCThw/infomilies16.gif";
	smileyarr["confuse"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqH9B-htI/AAAAAAAAADc/ET3itpMlTsM/i_confuse.gif";
	smileyarr["laugh"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqILJ7qNI/AAAAAAAAADg/HY43qVzb9Vg/i_bigsmile.gif";
	smileyarr["laugh_ani"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqIPEbYvI/AAAAAAAAADk/ljVqvtvPscU/i_bigsmil.gif";
	smileyarr["diss"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqOm3BmJI/AAAAAAAAADo/OBJphbP8YoY/greetings11.gif";
	smileyarr["angry"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqOmgAZoI/AAAAAAAAADs/YIqTf6scrWs/i_angry.gif";
	smileyarr["wave"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqOsYd1rI/AAAAAAAAADw/LGWSE7XhYiY/greetings0.gif";
	smileyarr["confuse"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqO8o0XwI/AAAAAAAAAD0/ifOeYObOaaw/confused1.gif";
	smileyarr["tease"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqO7frorI/AAAAAAAAAD4/jFClf-LLXZ0/celebrate16.gif";
	smileyarr["mad"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqWIqX0MI/AAAAAAAAAD8/c_7AHAja7cE/angry5.gif";
	smileyarr["anger"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqWfLmryI/AAAAAAAAAEA/PRNi7vWhyNo/angry0.gif";
	smileyarr["angel"]="http://lh3.ggpht.com/_CVwzZq9Yq3s/TGpqWfXLqrI/AAAAAAAAAEE/WcvlclmRVlQ/angel3.gif";
	smileyarr["sleep"]="http://lh3.ggpht.com/_CVwzZq9Yq3s/TGpqWZSX1UI/AAAAAAAAAEI/GbLdYJAtP38/aloofandbored10.gif";
	smileyarr["funny"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqWt5DnvI/AAAAAAAAAEM/E0B6eYnfR6Y/aloofandbored0.gif";
	smileyarr["r4d_7"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYC5xwqiohI/AAAAAAAAAIQ/Q1Y7QHW6a6A/celebrate8.gif";
    smileyarr["laughing_1"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYC5xyeiPWI/AAAAAAAAAIM/QvZkQlSd-CA/laughing6.gif";
    smileyarr["laughing_2"]="https://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp4jHVCpI/AAAAAAAAACs/RQ_hvtefsL8/laughing20.gif";
    
	smileyarr["wink"]="http://lh3.ggpht.com/_CVwzZq9Yq3s/TGpp48QZVZI/AAAAAAAAAC4/pQWaxOTti3g/i_wink.gif";
	smileyarr["Surpise"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp45VeT5I/AAAAAAAAAC8/d3PawcvZLvc/i_surprise.gif";
	smileyarr["sup_ani"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp_bXh9iI/AAAAAAAAADA/YiSSfKpOr-U/i_surpris.gif";
	smileyarr["simple"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp_YskMyI/AAAAAAAAADE/_LqeVKQmyOE/i_smile.gif";
	smileyarr["sad"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp_atwlqI/AAAAAAAAADI/kOwk5hsAG0w/i_sad.gif";
	smileyarr["sad_ani"]="http://lh3.ggpht.com/_CVwzZq9Yq3s/TGpp_nQ6YUI/AAAAAAAAADM/Gqrq11W3qt0/i_sa.gif";
	smileyarr["Fun"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpp_gKv7qI/AAAAAAAAADQ/xPGKtEPW0SE/i_funny.gif";
	smileyarr["Fun_ani"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqHuWNBbI/AAAAAAAAADU/qGAyVIzdMto/i_funn.gif";
	smileyarr["cool"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TGpqH0ajK0I/AAAAAAAAADY/ehF8-BDd_EI/i_cool.gif";
   
	smileyarr["blush"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYN3kPuZRZI/AAAAAAAAAIw/-05pCvIODgs/9.gif";
    smileyarr["love4"]="https://lh4.ggpht.com/_CVwzZq9Yq3s/TYN3kFnVy_I/AAAAAAAAAIs/QTVJ-mA_ndQ/8.gif";
    smileyarr["r4d_1"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYN3kf5YTtI/AAAAAAAAAI0/dJIOyxDUBGs/10.gif";
    smileyarr["r4d_2"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYN3k82meAI/AAAAAAAAAI4/cJD1aDgQv-Q/25.gif";
    smileyarr["r4d_3"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYN3kBwAiVI/AAAAAAAAAIo/uK6t0u4uQqo/6.gif";
    smileyarr["r4d_4"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYN3jir-FMI/AAAAAAAAAIk/2Ql4U569htk/41.gif";
    smileyarr["r4d_5"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYN3jhFT3RI/AAAAAAAAAIg/7QSg6v_uu4A/4.gif";
    smileyarr["r4d_6"]="http://lh4.ggpht.com/_CVwzZq9Yq3s/TYN3joVYAfI/AAAAAAAAAIc/4Zx1OrqPVLE/68.gif";
    

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

//Rubin Jose (c) 2010-2011