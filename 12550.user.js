// ==UserScript==
// @name           user-css-switcher
// @namespace      perlnamehoge@gmail.com
// @include        http://*
// ==/UserScript==

new function () {
    if ( location.href.match(/^http:\/\/userstyles.org\/styles\//) &&
         location.hash == '#stylishInstall' &&
         !isNaN( location.href.replace( new RegExp( location.hash || "" ), "").split(/\//).pop() ) )
    {
        var stylishEvent = document.createEvent("Events");
        stylishEvent.initEvent("stylishInstall", false, false, window, null);
        return document.dispatchEvent(stylishEvent);
    } else if ( document && document.body ) {
        var $N = function ( name, attr ) {
            var each = function (obj,iter) { for ( i in obj ) iter.call(null,i,obj[i]); }
            var name = document.createElement(name);
            each( attr || {} , function (k,v) {
                  k == 'css'      ? name.style.cssText = v :
                  k == 'text'     ? name.appendChild( document.createTextNode(v) ) :
                  k == 'addEvent' ? name.addEventListener( v.name, v.observe, false )
                                  : name.setAttribute(k,v);
            });
            return name;
        }
        var $ = function (id) {
            if ( !this.ids ) this.ids = {};
            return this.ids[id]
                                ? this.ids[id]
                                : ( this.ids[id] = document.getElementById(id) );
        }
        GM_xmlhttpRequest({
                method : 'GET',
                url    : 'http://userstyles.org/styles/search/' + encodeURIComponent( location.href ),
                onload : function (res) {
                       var html   = res.responseText.replace(/\x0D\x0A|\x0D|\x0A/g, "");
                       var list   = ( html.match(/<ul id="style-list">(.*?)<\/ul>/) || ["", ""] )[1];
                       var result = [];
                       ( list.match(/<li>(.*?)<\/li>/g) || [""] ).forEach(function (li) {
                            if ( /class='(.*?)'\s+href='(.*?)'\s+title='(.*?)'>(.*?)<\/a>/.test( li ) ) {
                               result.push({
                                  className   : RegExp.$1,
                                  stylePath   : RegExp.$2,
                                  styleRate   : RegExp.$3,
                                  description : RegExp.$4
                               });
                            }
                       });
                       if ( result.length ) {
                           /*
                                box-outline
                           */
                           var div = $N("div", {
                               css  : "position:absolute; left:0px; bottom:0px; border-top: 2px solid #B3CCE2; border-right: 2px solid #B3CCE2;"
                           });
                           /*
                                box-title
                           */
                           var tdiv = $N("div", {
                               css  : "color:black; cursor:pointer; background: #c0d7e9; width:150px; text-align:center; -moz-opacity:0.8; padding: 5px 0px 5px 0px; font-size:10px; font-weight:bold;",
                               text : location.host + " (" + result.length + ")",
                               addEvent : {
                                        name : 'click',
                                        observe : function () {
                                                if ( $("userstyles.org").style.display == "" ) {
                                                   $("userstyles.org").style.display = "none";
                                                   tdiv.style.width = "150px";
                                                } else {
                                                   $("userstyles.org").style.display = "";
                                                   tdiv.style.width = "100%";
                                                }
                                        }
                               }
                           });
                           /*
                                box-outline, append box-title
                           */
                           div.appendChild( tdiv );

                           var height = result.length > 10 ? "height:300px;" : "";
                           var div2   = $N("div", {
                               id  : "userstyles.org",
                               css : "background:white; font-size:12px; overflow:scroll; padding-top:5px; display:none;" + height
                           });
                           result.forEach(function (item) {
                                   var li = $N("li", {
                                       css : "list-style-type:none; padding: 0px 10px 5px 10px;"
                                   });
                                   li.appendChild( $N("a", {
                                       href     : 'javascript:void(0)',
                                       css      : 'color:#4E87B7;',
                                       text     : item.description,
                                       addEvent : {
                                                name : "click",
                                                observe : function () {
                                                        document.body.appendChild( $N("iframe", {
                                                             src         : 'http://userstyles.org' + item.stylePath + '#stylishInstall',
                                                             width       : 0,
                                                             height      : 0,
                                                             frameborder : 0
                                                        }) );
                                                }
                                       }
                                   }) );
                                   div2.appendChild(li);
                           });
                           div.appendChild(div2);
                           document.body.appendChild( div );

                           setInterval(function () {
                                  div.style.bottom = -( document.documentElement.scrollTop || document.body.scrollTop ) + "px";
                           }, 100);
                       }
                }
        });
    }
}