// ==UserScript==
// @version        0.11  (09:49 2011.10.21.)
// @name           nCore ShowPicture
// @namespace      ncore
// @include        *ncore.*/torrents.php*
// @include        *ncore.*/bookmarks.php*
// ==/UserScript==

//contains code from "nCore Tools v3 By Kecs"  [http://userscripts.org/scripts/show/86746]
const popTTDelay  = 10;  //amount of time(in ms) after mouseover before popup (0 for immediatly)
var pictureWidth  = (window.innerWidth * 0.45);
var bg_color      = "#ffffff";
var border_color  = "#ffffff";
var font_color    = "#4682b4";
var font_face     = "verdana";
var padding       = 4;
var font_size     = "10px"; // sorry, change styles manually in function create_window   :-)
var FireOnMouseOver = false;   //if true then MouseOver is enough to make the preview    if false then you have to click the item to show the preview
const offSBRRight = 24;     //horizontal constant. if the popup makes horizontal scrollbars appear, increase this constant until it doesn't (default:18)
const offSBRTop   = 24;     //vertical constant. if the popup makes vertical scrollbars appear, increase this constant until it doesn't (default:18)

String.prototype.between = function(prefix, suffix) {
        s = this;
        var i = s.indexOf(prefix);
        if (i >= 0) { 
                s = s.substring(i + prefix.length);
        }else{
                return '';
        }
        if (suffix) {
                i = s.indexOf(suffix);
                if (i >= 0) {
                        s = s.substring(0, i);
                }else{
                        return '';
                }
        }
        return s;
}

        function get_css_path(){
                var head = document.getElementsByTagName("HEAD")[0];				
                var css_path = head.getElementsByTagName("link")[2].href.between('styles/','/');
                return css_path;
        }

        function locate(event){   
          var ttWin = find_window();
          if (ttWin){  
            var tempLeft=(event.clientX + window.pageXOffset)+5;
            var tempTop=(event.clientY + window.pageYOffset)+5;
            if( (tempLeft+ttW) > (window.innerWidth+window.pageXOffset-offSBRRight) ) { //if its too far right
              tempLeft = (window.innerWidth+window.pageXOffset-offSBRRight-ttW-10);
            }
                
            if( (tempTop+ttH) > (window.innerHeight+window.pageYOffset-offSBRTop) ) { //if its too far down
              tempTop-=(ttH+offSBRTop+10);
            }

            if(tempLeft < window.pageXOffset) { //if it is too far left, i.e. it is a super-wide box
              tempLeft=window.pageXOffset+1; //set it all the way to the left
            }
                        if (tempTop < pageYOffset){
                          tempTop = pageYOffset+9;                        
                        }
                        if (tempTop+ttH > pageYOffset+window.innerHeight){
                          tempTop = (pageYOffset+window.innerHeight)-(ttH+10);
                        }
            ttWin.style.top = tempTop + "px";
            ttWin.style.left = tempLeft + "px";
          }
        }

        function show_windowTT(){
          var ttWin = find_window();
          if (ttWin) {
            ttWin.style.display = '';
            ttWin.addEventListener("click", kill_window, false);
            }
        }

        function kill_window(){
                        if (find_window()){
                                find_window().parentNode.removeChild(find_window());
                        }
        }
                
        function find_window(){ 
          return document.getElementById("link_tt");
        }
        
        function create_window(id, ref, event){  
                        kill_window();

                        var tt_err ='';
                        var tt_div = document.createElement("div");
                        tt_div.setAttribute("id", "link_tt");
                        tt_div.setAttribute('style', 'text-align: left; background:' + bg_color + '; '+
                                         'border:1px solid ' + border_color + '; ' +
                                         'padding:0px; ' +
                                         'color:' + font_color + '; ' +
                                         'font-family:' + font_face + ';font-size:' + font_size + '; ' + 
                                         'position:absolute; z-index:1000000; ' + 
                                         'padding-left: ' + padding + 'px; padding-right: '  + padding + 'px; ' +
                                         'padding-top: '  + padding + 'px; padding-bottom: ' + padding + 'px; ' +
                                         'max-width: 95% !important; line-height: 1.2 !important; width: auto !important;'
                                                                );
                        var imageLink = ref;
                        //GM_log('create_window: ' + imageLink);
//http://ncore.cc/showimage.php?link=2011/0301/1ebfd22d579df52b525b230ac4c6789e/9876543210.jpg
//http://kepzelet.com/pictures/2011/0301/1ebfd22d579df52b525b230ac4c6789e/px9876543210.jpg

                        if (imageLink.match('showimage.php')=='showimage.php'){
                                imageLink = imageLink.replace('http://ncore.cc/showimage.php?link=','http://kepzelet.com/pictures/');
                                imageLink = imageLink.replace('&type=xxx','');
                        }else{
                                imageLink = imageLink.replace(/http:\/\/anonym.to\/\?/,'');
                                imageLink = imageLink.replace(/http:\/\/sjmp.eu\/\?/,'');
                        }
//                      
                        tt_div.innerHTML = '<img src=' + imageLink + ' width=' + pictureWidth + '>';
                        //GM_log(tt_div.innerHTML);
                        
            document.body.appendChild(tt_div);
                        ttH = tt_div.offsetHeight;
                        ttW = tt_div.offsetWidth;
            if (popTTDelay){
                                find_window().style.display='none';
                                window.setTimeout('show_windowTT()', popTTDelay);
                        }
                        locate(event);
        }

        function create_event(id,ref){
                        if (FireOnMouseOver){
                                id.addEventListener("mouseover", function(event) { create_window(id, ref, event); }, false);
                                id.addEventListener("mouseout", function() { kill_window(); }, false);                  
                        }else{
                                id.addEventListener("click", function(event) { create_window(id, ref, event);}, false);
                        }
        }
                               
        function add_link_with_image(aParentNode, aLinkSrc, aImageSrc){
                        var newLink = document.createElement('a');
                        newLink.setAttribute('href',aLinkSrc);
                        newLink.className = 'OK!';
                        //aParentNode.appendChild(newLink);
                        if (aImageSrc != ''){
                                var linkImage = document.createElement("img");
                                linkImage.setAttribute('src', aImageSrc);
                                linkImage.setAttribute('width','16px');
                                linkImage.setAttribute('height','16px');
                                linkImage.style.margin = '7px 0 0 12px';
                                newLink.appendChild(linkImage);
                                
                        }
                        return newLink;
                }
        
        function add_link(aParentNode, aLinkSrc, aLinkText){
                        var newLink = document.createElement('a');
                        newLink.setAttribute('href',aLinkSrc);
//                      newLink.style.padding = '0px 10px 30px 12px';
//                      newLink.style.margin = '-7px 0px -30px 25px';
                        aParentNode.appendChild(newLink);

                        var linkText = document.createTextNode(aLinkText);
                        newLink.appendChild(linkText);
                        return newLink;
                }
        
        function add_image(aParentNode, aImageSrc){
                        var aImage = document.createElement("img");
                        aImage.setAttribute('src', aImageSrc);
                        aParentNode.appendChild(aImage);
                        return aImage;
                }
                
                function add_td(aParentNode){
                        var aTD = document.createElement("td");
                        aParentNode.appendChild(aTD);
                        return aTD;     
                }
                
                function add_link_and_image(aParentNode, aLinkSrc, aImageSrc){
                        var linkImage = document.createElement("img");
                        linkImage.setAttribute('src', aImageSrc);
                        //linkImage.style.padding = '20px 20px 20px 22px';
                        //linkImage.style.margin = '0 0 0 20px';                        
                        aParentNode.appendChild(linkImage);
                        add_link(aParentNode, aLinkSrc, 'O');   
                        return linkImage;
        }


function getRequestObj() { try{ return new XMLHttpRequest(); } catch(e) {} }
function embedTorrentHandler(event, e, tid) {
        if( et.readyState == 4 ) { 
                //GM_log('embedTorrentHandler e:' + e.innerHTML);
                try { 
                        var pics = e.getElementsByClassName("torrent_lenyilo_tartalom")[0].getElementsByTagName("img");         
                        for( var i in pics ) { 
                                //GM_log(pics[i]);
                                var anchor = pics[i].parentNode; 
                                if( anchor.tagName == "A" ) { 
                                        var container = anchor.parentNode;
                                        container.setAttribute("class",'');
                                        var ref = anchor.href;
                                        container.removeChild(anchor);
                                        var td = add_td(container);
                                        var img = add_image(td,'styles/' + cssPath + '/ico_attach.png');
                                        td  = add_td(container);
//                                        td..setAttribute("class",'');
                                        var alink = add_link(td,ref,'O')
                                        create_event(img,ref);
                                } 
                        } 
                        unsafeWindow.CB_Init(); 
                }catch(e) {} 
        } 
}

function isLoading(text){
  var res = text.indexOf('Töltés...','');
  //GM_log(res);
  return res != -1;
}

function embedTorrent() { 
        var tid = this.innerHTML.between('id=','"');
        //GM_log('torrent_id: ' + tid);
        var e = document.getElementById(tid); 
        //GM_log(e.innerHTML);
        if(e.innerHTML=="" || isLoading(e.innerHTML)) { 
                //GM_log("!f");
                e.innerHTML = loading; 
                //GM_log(e.style.display);
                //e.style.display = e.style.display == "none" ? "block" : "none";               
                //GM_log('ajax url:' + "ajax.php?action=torrent_drop&id="+tid);
                //GM_log('e.style: ' + e.style.display);
                et.open("GET", "ajax.php?action=torrent_drop&id="+tid); 

                et.onreadystatechange = function (event) { 
                        embedTorrentHandler(event, e, tid);
                }; 
                et.send(null);
        } else { 
                //GM_log("!else");
                //e.style.display = e.style.display == "none" ? "block" : "none"; 
        }
}
function addClick(elements) {
        for (i = 0; i < elements.length;i++) { 
                elements[i].removeAttribute("onclick");
                elements[i].setAttribute("onclick","return false;"); 
                elements[i].addEventListener("click",embedTorrent,false);
        } 
}

function add_dl_links(){
        var torrents = document.getElementsByClassName("box_nev2");
        for ( i = 0; i < torrents.length;i++ ){ 
                //torrents[i].childNodes[3].style.width = "345px";
                var anc2 = torrents[i].getElementsByTagName("a");
                var tid2 = anc2[0].href.substring(TIDSTART);
                var dl_link = 'torrents.php?action=download&id='+tid2;  
                add_link_with_image(torrents[i], dl_link, downImage,''); 

                var aLink = add_link_with_image(torrents[i], dl_link, downImage, '');  //'themes/default/smilies/arrow.gif','');
                torrents[i].appendChild(aLink); 
        }
}

    function getElementsByClassName(classname, node) {
                if(!node) node = document.getElementsByTagName("body")[0];
                var a = [];
                var re = new RegExp('\\b' + classname + '\\b');
                var els = node.getElementsByTagName("*");
                for(var i=0,j=els.length; i<j; i++)
                if(re.test(els[i].className))a.push(els[i]);
                return a;
    }
//      var downImage = 'data:image/gif;base64,R0lGODlhCgAKAPcAAPv7++Li4pubm4SEhIyMjOzs7PT09Pb29oeHh/X19fr6+u3t7eHh4f39/QBHFpmZmf///4CAgP///w';for (i=1;i<=947;i++){downImage += 'A';}downImage += 'CwAAAAACgAKAAAIOwAjCBxIMAKEgw4cHIQgcGHChQ0RKjwoMKFFiwIBXEyoQGCCAxcTGBC4oGTCBQUWCGQQIACDly8LygwIADs=';
        var downImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAoFJREFUeJx1kstL1FEYhp9zzsw45VxSs5Fuk8NITldqMCWKIDCQiogW0UKoDCKCWrUOoj+gVYsocNGiRWBEi6A2CQXahJV2WdSgdNGiJh3NnzO/c2mhjZL2rc7ifR/e872fYIlJH01f3X9sf6ee0VMCgQqryOO7j2/l7+Wv/KsNLAVINTZmujpOrdeeDwJUOMhwLt+UJ79IuyRg2vzSH6cGMZ7BAQGtmBbjZimtWvCWbeeyNzP70scbdsR2xxpCcc+N4zHOpCkw7Sbiq1NrW+q31x38nBt9ALhFCULN5fa9h7PrjO9RcB8IBiUAvnaksisbk7tk45MHuZG/5kWATi8z3P+qt97f4sLxQIyIWIF1mh+M8b00SmSw2jtd3vPpGe8Xf+FEe/Ptg61Nh6rfI/WMJyKp1axZniYarAXrk+iTtLxLy6aGug2ZVCL1qO9DTwVw+dKZqx3ZVR0DAy9qvn7+JnhTxo0Itmw+QKxUz5cbz7G9RX4WCvLr6BfasptSieTWxNP+1w8DAL8nJ5sS1SI1EqlhWbQWJSR+0THWk8M5qJuKUJWO4pxFOkNUlKLC2UxlB8boeFAb9rVuxvkeQkhAYLSPEALZkATncA4sIEtFgk7GKgCrjRZYVm5s5VH3NRz2n7YFAF7ZcqTrIt9z95kpq1IF4CQ+QoKqAhViZ3brAnOlMQZeDEEoPJfEzgOEFT5qtnNjDK8GhnAVo6gAjJk9RhkIYayeBxhEGTl7EkoptjUnsdYgpcLaOZNSvHw7AoDWGmdZkEBILQWApf3kBf437S0OEKhQECtMqZIvHCZ59vjh60gZcDgnhQQxF93N78ACdfFIdaFQLHbfuX9+osTwHy4bB5h5T+YrAAAAAElFTkSuQmCC';
        var ttH, ttW; 
        var loc = new String(window.parent.document.location);
        var cssPath = get_css_path();
        if( loc.indexOf("https://") != -1 ) { var TIDSTART = 48; } else { var TIDSTART = 47; }
        
        if ((loc.indexOf('torrents.php') > -1)){
                document.getElementById("kategoriak").style.display = "block"; document.getElementById("letoltes_hr").style.display = "block"; document.getElementById("panel_stuff").style.display = "none";
                unsafeWindow.show_windowTT = show_windowTT;     
                document.addEventListener("keypress", function(evt) { var kC = evt.which; if(kC == 0){ kill_window(); } },false);
        
                var links1 = document.getElementsByClassName("torrent_txt");
                var links2 = document.getElementsByClassName("torrent_txt2");
                var et = getRequestObj();
                addClick(links1);
                addClick(links2);
                var loading = '<div class="torrent_lenyilo_lehetoseg"></div><div class="torrent_lenyilo_tartalom"><div style="margin:10px 0;text-align:center"><img src="styles/ajax.gif" title="Töltés..."></div></div><div class="torrent_lenyilo_lab"></div>';
                
                add_dl_links();
        }
        if ((loc.indexOf('bookmarks.php') > -1)){
                var link = document.getElementsByTagName("a");
                var i = 0;
                
                while(i <= link.length){
                        var sLink = String(link[i]).toLowerCase();
                        if      (sLink.indexOf('torrents.php?action=details') > -1){
                                var aparent = link[i].parentNode.parentNode.parentNode;                         
                                //http://ncore.cc/torrent_letoltese.php?torrent_id=347509
                                //http://ncore.cc/torrent_adatok.php?torrent_id=347509
                                var aLink = add_link_with_image(aparent, String(link[i]).replace("details","download"), downImage,'');  //'themes/default/smilies/arrow.gif','');
                                aLink.setAttribute('style', 'float:right;margin-right:0px;margin-top:-10px;');
                                aparent.appendChild(aLink);
                        }
                        i++;
                }
        }