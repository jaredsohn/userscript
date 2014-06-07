// ==UserScript==
// @name       		Phishink Link Preventer
// @namespace  		http://jessecar96.net/
// @version    		1.2
// @description  	Trying to prevent steam phishing
// @match      		http://www.tf2outpost.com/*
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require			http://updater.sizzlemctwizzle.com:8081/177385.js?days=1
// @updateURL		http://userscripts.org/scripts/source/177385.user.js
// @copyright  		2012+, Jessecar
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// ==/UserScript==


var verified_urls = [
    "scrap.tf",
    "steamrep.com",
    "sourceop.com",
    "bazaar.tf",
    "scrapbank.me",
    "backpack.tf",
    "wiki.tf",
    "teamfortress.com",
    "tf2b.com",
    "tf2items.com",
    "google.com",
    "teamfortress.tv",
    "reddit.com",
    "valvesoftware.com",
    "ppm.tf",
    "tf2wh.com",
    "tf2tp.com",
    "trade.tf",
    
];

var msg = {
    types: {
    	good: "border-color:green;background:rgba(0,255,0,.3);",
   		warn: "border-color:rgb(201, 129, 0);background:rgba(201, 129, 0, 0.3);",
    	bad: "border-color:red;background:rgba(255,0,0,.3);"
	},
    create: function(text,type)
	{
        return "<div style='margin-top:6px;font-size:16px;border:2px solid #000;padding:4px;border-radius:4px;"+type+"'>"+text+"</div>";   
	}
};

var steamphishregex = /(https?:\/\/|\/\/|www?.\.)\S*?[sz][tf][ea].?[mnru]..?.?[mnruv][mnruv]?..?.?[jiltf][jiltf][yi]\.\S+/i;
var block_follow = false;

$(function(){
    
    console.log("Beh~");
    
    $(".unsafe_link").addClass("unsafe_link2");
    $(".unsafe_link").removeClass("unsafe_link");
   
    $(document).on("click", ".unsafe_link2", function () {
        block_follow = false;
        console.log("Fish");
        var url = encodeURI($(this).attr("href"));
        var parsed = parse_url(url);
        var frag = parsed.hostname.replace("www.","");
        if(frag == "tf2outpost.com") return true;
        var b = "";
       	b += "<div id=\"unsafe_link_modal\">    <div>";
        b += "        You are now leaving TF2Outpost<br />";
        b += "        The URL You Clicked is: <strong>"+url+"<strong><br/><br/>";
        
        if(steamphishregex.test(url))
        {
            if(frag.match(/(https?:\/\/|\/\/|[a-z0-9]\.)steamcommunity\.com/i)){
                // Good
                b += msg.create("This is a verified Steam Community Link",msg.types.good);
            }else{
                // Bad
                b += msg.create("This is a confirmed phishing link.  DO NOT FOLLOW IT!",msg.types.bad);
                block_follow = true;
            }
        }else{
    		console.log(frag);
            if(verified_urls.indexOf(frag) == -1){
            	b += msg.create("Unknown link.  Be cautious!",msg.types.warn); 
            }else{
            	b += msg.create("This is a link to a reputable community website.  You're all good!",msg.types.good);
            }
        }
        
        
        b += "    </div>";
        b += "    <form>Would you like to follow this link?<br/><br/>";
        
        if(!block_follow)
        	b += "        <button class=\"submit\" onclick=\"window.open('"+url+"');zemnmodal.unmake();return false;\">Yes</button>";
        
        b += "        <button class=\"submit\" onclick=\"zemnmodal.unmake();return false;\">No</button>";
        b += "    </form>";
        b += "</div>";
        zemnmodal.make(b);
        return false;
    });
    
});

function parse_url(url)
{
    var parser = document.createElement('a');
	parser.href = url;
 	return parser;
}