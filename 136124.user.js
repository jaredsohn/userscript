// ==UserScript==
// @name       AdultFriendFinder 
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enlarges adultfriendfinder images
// @match      http://adultfriendfinder.com/p/manage_photos.cgi*
// @match      http://adultfriendfinder.com/p/member.cgi*
// @match      http://adultfriendfinder.com/p/interested.cgi*
// @match      http://adultfriendfinder.com/p/main.cgi*
// @match      https://secure.adultfriendfinder.com/p/order.cgi*
// @copyright  2012+, You
// ==/UserScript==

function enlargephoto(a,b){
    // call original function
    mp(a,b);
    // swap photo sizes
    if (document.getElementsByClassName("mt0").length) {
        var pd=document.getElementsByClassName("mt0")[document.getElementsByClassName("mt0").length-1];
        if (pd.tagName=="IMG") {
            pd.src=pd.src.replace("square","superphoto");
            pd.src=pd.src.replace("main","superphoto");
            pd.setAttribute("onerror","this.src=this.src.replace('superphoto','main');");
            var nodes = document.getElementsByClassName("with_ribbon");
            for(i=0; i<nodes.length; i++) { nodes[i].children[0].children[0].src=nodes[i].children[0].children[0].src.replace("square","superphoto");}
        } else {
            pd.style.backgroundImage=pd.style.backgroundImage.replace("main","superphoto");
            pd.innerHTML="<img src="+pd.style.backgroundImage.slice(4, -1)+" onerror=\"this.src=this.src.replace('superphoto','main')\">";
            document.getElementsByClassName("photo_overflow")[0].style.overflow="auto";
        }
        pd.style.width="auto";
        pd.style.height="auto";
        pd.style.position="";
        pd.style.display="block";
        document.getElementsByClassName("page clearfix")[0].style.width="90%";
        document.getElementById("main_new_likes_viewer").style.width="45%";
        document.getElementById("main_new_likes_viewer").style.overflow="auto";
        // document.getElementsByClassName("col_right")[0].style.width="85%";
        document.getElementsByClassName("col_left1")[0].style.width="100%";
        pd.parentNode.style.width="auto";
        pd.parentNode.style.height="auto";
    }
}

if (document.location.href.indexOf("member.cgi")>0) {
    // member page handler
    document.getElementsByClassName("content2")[0].children[0].children[0].children[0].setAttribute("onerror","this.src=this.src.replace('superphoto','main');");
    document.body.innerHTML=document.body.innerHTML.replace(".main.",".superphoto.");
    document.getElementsByClassName("page clearfix")[0].style.width="90%";
    document.getElementById("page_left").style.width="45%";
    document.getElementById("page_main").style.width="45%";
    document.getElementById("page_left").style.overflow="auto"; // stop the text overwriting the image when the browser is resized or too small.
} else if (document.location.href.indexOf("interested.cgi")>0) {
    document.body.innerHTML=document.body.innerHTML.replace(/square/g,"main");
    document.getElementById("page_main").style.width="65%";
    document.getElementsByClassName("page clearfix")[0].style.width="90%";
} else if (document.location.href.indexOf("order.cgi")>0 && document.location.href.indexOf("p_pwsid=")>0) {
    var mid=document.location.href.substr(document.location.href.indexOf("p_pwsid=")+8,15);
    document.location.href="http://adultfriendfinder.com/p/manage_photos.cgi?mid="+mid+"&do=show_profile_photo_page";
} else if (document.location.href.indexOf("main.cgi")>0) {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(".checker { display: none} .ckecker_over_img { display: none} .checker_over_upgrade_btn { display: none} .checker_over_upgrade_msg { display: none}"));
    (document.body || document.head || document.documentElement).appendChild(style);
} else {
    // embed script in html to avoid use of unsafewindow (greasemonkey)
    var script = document.createElement('script');
    script.appendChild(document.createTextNode(enlargephoto+"var mp=render_simple; render_simple=enlargephoto;"));
    (document.body || document.head || document.documentElement).appendChild(script);
}