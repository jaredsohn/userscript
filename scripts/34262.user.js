// ==UserScript==
// @name           google_image_with_gazopa
// @namespace      gomaxfire.dnsdojo.com
// @include        http://images.google.co*/images*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.6.js
// @require        http://github.com/gotin/chain/tree/master/chain.js?raw=true
// @require        http://github.com/gotin/gm_utils/tree/master/util2.js?raw=true
// ==/UserScript==
const GAZOPA_LOGIN_URL= "http://www.gazopa.com/sign_in";
const GAZOPA_SEARCH_URL= "http://www.gazopa.com/similar?key_url=";
const GAZOPA_ID_PREFIX = "Gazopa_search_";
var area = null;

function set(){
  $("#ImgContent td")
    .each(
      function(i){
        if(!this.id.match(/^tDataImage\d+$/))return;
        var img = this.getElementsByTagName("img")[0];
        var gazopa_search_url = GAZOPA_SEARCH_URL +escape(img.src)+"&param=standard2";
        var key_src = img.src;
        var button = $input({type:"button", value:"GazoPa search", id:GAZOPA_ID_PREFIX+i},{display:"block"})();
        $(this).append(button);
        $(button)
          .click(
            function(){
              var func = arguments.callee;
              if(area){
                $(area).slideUp(function(){
                                  $(this).remove();
                                  area = null;
                                  func();
                                });
                return;
              }
              area = $div({},{position:"fixed", display:"hidden", top:"100px", left:"100px", margin:"20px", padding:"10px", border:"1px dashed #333", backgroundColor:"#EEE"})();
              var close =
                $input({type:"button", value:"close"},{margin:"5px"})();
              try{
                var title =
                  $a({href:gazopa_search_url})(
                    "Similar image searched by ",
                    $span({},{color:"blue"})("G"),
                    "a",
                    $span({},{color:"red"})("z"),
                    "o",
                    $span({},{color:"green"})("P"),
                    "a"
                  );
              }catch(e){
                console.log(e);
              }
              $(close).click(function(){
                               $(area).slideUp(function(){$rm(this);});
                             });
              var result = $div({textContent:"Searching..."},{border:"1px solid #999", backgroundColor:"#FFF",padding:"5px",marginTop:"5px"})();
              $add(area,
                   $div()(close, title),
                   $div()("Key image:", $img({src:key_src},{display:"block"})()),
                   result);
              $add(document.body, area);
              $(area).slideDown();

              $C.xhr(gazopa_search_url+"&page_size=5")(
                function(html){
                  result.innerHTML = "";
                  var div = $div({innerHTML:html})();
                  var divs = div.getElementsByTagName("div");
                  var need_login = false;
                  for(var i=0,l=divs.length;i<l;++i){

                    if(divs[i].id=="login_form"){
                      need_login = true;
                      break;
                    }
                  }
                  if(need_login){
                    $add(result,
                         $a({href:GAZOPA_LOGIN_URL, target:"_blank"})("Please sign in GazoPa"));
                    return;
                  }

                  var imgs = div.getElementsByTagName("img");
                  for(var i=0,l=imgs.length;i<l;++i){
                    var img = imgs[i];
                    if(!img.id || !img.id.match(/^result_img_\d+$/)) continue;
                    $add(result, $a({href:img.parentNode.href.replace(/page_size=5/,""),title:"similar image search"},{margin:"0 5px"})($img({src:img.src, border:"0"})()));
                  }
                  $add(result, $a({href:gazopa_search_url})("more..."));
                });
            });
      });
}
set();
$(window).resize(function(){
                   if(!document.getElementById(GAZOPA_ID_PREFIX +"0")){
                     set();
                   }
                 });