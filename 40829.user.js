// ==UserScript==
// @name	Shudhui Bangla
// @description Auto badge place for Shudhui Bangla
// @version        0.2
// @date           2009-01-20
// @creator        M. M. Rifat-Un-Nabi (to.rifat@gmail.com)
// @include http://*flickr.com/photos/*/*
// @exclude http://*flickr.com/photos/*/*#preview
// @exclude http://*flickr.com/photos/organize*
// ==/UserScript==

function embedFunction(s) {
    document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

(function () {
    if(document.getElementById('contextDiv_pool660339@N21') || (document.getElementById('contextLink_pool').href.match('shudhuibangla')!=null)) {
        embedFunction('function sb_exec() {document.getElementById("message").value = document.getElementById("message").value.replace(new RegExp(\'<i>.*"http://6v8\.gamboni\.org/Flickr-Add-referer-into-comments\.html.*</em>\', "g"), "")+ \'\\n\\n<a href="http://www.flickr.com/groups/shudhuibangla/" title="SB Logo by Tipu Kibria, on Flickr"><img src="http://farm4.static.flickr.com/3022/2563541105_33c647b936_t.jpg" width="100" height="100" alt="SB Logo" /></a>\\n<a href="http://www.flickr.com/groups/660339@N21/">Shudhui Bangla</a> -y dekhechi.\';document.getElementById("sb_btn").disabled=true;document.getElementById("DiscussPhoto").getElementsByTagName("form")[0].submit();}');
        document.getElementById('btn_post_comment').parentNode.innerHTML+='<input type="button" id="sb_btn" style="background: #05a34e;" onclick="sb_exec()" value="Shudhui Banglay Dekhechi" class="Butt" tabindex="3"/>';
    }
})();
