// ==UserScript==
// @name           FilesTube Cleaner
// @namespace      FilesTube Cleaner
// @include        http://*filestube.com/source.html?token=*
// @include        http://*filestube.com/*/*.html
// ==/UserScript==

if(document.location.toString().indexOf('filestube.com/source.html?token=') != -1){
	document.location = document.getElementsByTagName('frame')[1].src;
}
else{
if(typeof GM_addStyle==='undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }

GM_addStyle("#recent, #top_options, #divWildfirePost, #wfmodule_divWildfirePost, #addPlayer, #addFFExtension, #dfr_outer, .resultadv, .resultadv2, .other_adv, .other_adv2, .fb_image, .boxpromo, .newcomm, .linkbox, .gobut, .trends, .file_details_title, .n_right_detail, .sharebox, .vbg, .vbg2, a[href='http://www.filestube.com/account/register.html'], iframe[width='728'], img[width='728'], object[width='728'], p[align='center'], div[style='text-align: center;'], div[style='text-align:center;'], div[style='padding: 0pt 10px;'], div[style='float: left; line-height: 16px;'], div[style='width: 99%;'], a[href='http://www.filestube.com/account/register_choice.html'], a[href='http://www.addthis.com/bookmark.php'], a[href='http://www.filestube.com/account/login.html'] {\ndisplay:none !important;\n}");

var linkslist = document.getElementById("copy_paste_links").innerHTML.toString().split("\n");
var i3 = 0;
for (i2=0;i2<=document.getElementsByTagName('a').length;i2++){
	if(document.getElementsByTagName('a')[i2].getAttribute("class") != "gobut"){
		if(document.getElementsByTagName('a')[i2].href.toString().indexOf("/go.html") > 0){
			document.getElementsByTagName('a')[i2].href = linkslist[i3];
			i3++;
		}
	}
}
}