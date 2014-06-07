// ==UserScript==
// @name                  Remove Hidden Text
// @namespace             http://userscripts.org/scripts/show/93009
// @version               1.0.3
// @description           Remove invisible text which appears when text is copied
// @description0x0804     清除在复制网页文字时出现的隐藏文字
// @include               http://www.cngba.com/*
// ==/UserScript==

(function(){
        // for Chrome and other non-IE/FF/Opera
        var realWindow=this['unsafeWindow'] || unsafeWindow || window;
        addRemoveNode();
        removeHidden('font');
        removeHidden('span');
        realWindow.document.body.oncopy=null;
        realWindow.document.body.onbeforecopy=null;
        realWindow.document.oncopy=null;
        realWindow.document.onbeforecopy=null;
        realWindow.oncopy=null;
        realWindow.onbeforecopy=null;
        function removeHidden(x){
                var objs=realWindow.document.getElementsByTagName(x);
                for(var j=objs.length-1; j>=0; j--){
                        var style=objs[j].style;
                        var currentStyle=getCurrentStyle(objs[j]);
                        if(currentStyle.display=='none'
                           ||currentStyle.visibility=='hidden'
                           ||currentStyle.fontSize.indexOf('0')==0
                           ||style.fontSize=='0px'
                           ||style.width=='0px'
                           ||style.height=='0px'
                          ){
                             //console.debug(objs[j].tagName+':'+style.display+','+style.visibility+','+style.fontSize+','+style.width+','+style.height+' removed by style');
                             objs[j].removeNode(true);
                        } else {
                                var y=fixColor(getCurrentStyle(objs[j]).color);
                                var yR=parseInt(y.substr(1,2),16);
                                var yG=parseInt(y.substr(3,2),16);
                                var yB=parseInt(y.substr(5,2),16);
                                var z=objs[j].parentElement;
                                while(z){
                                        var c=fixColor(z.style.backgroundColor);
                                        //console.debug(z.tagName+'='+z.id+'.backgroundColor='+c+', '+objs[j].tagName+'='+objs[j].id+'.color='+y);
                                        if(z.tagName=='BODY' && c=='transparent') c='#ffffff';
                                        if(c==y){
                                            //console.debug(objs[j].tagName+'='+objs[j].id+':'+y+','+z.tagName+':'+c+' removed by background');
                                            objs[j].removeNode(true);
                                            break;
                                        }
                                        else if(Math.abs(parseInt(c.substr(1,2),16)-yR)<20 && Math.abs(parseInt(c.substr(3,2),16)-yG)<20 && Math.abs(parseInt(c.substr(5,2),16)-yB)<20){
                                            //console.debug(objs[j].tagName+'='+objs[j].id+' removed by color');
                                            objs[j].removeNode(true);
                                            break;
                                        }
                                        else if(c!='transparent') break;
                                        else z=z.parentElement;
                                }
                        }
                }
        }
        function dec2hex(i){
                var r='00';
                i=parseInt(i);
                if(i>=0 && i<=15) r='0'+i.toString(16);
                else if(i>=16 && i<=255) r=i.toString(16);
                return(r);
        }
        function fixColor(x){
                if(x.length==7 && x.indexOf('#')==0) return(x);
                else if(x=='transparent') return(x);
                else if(x.length==4 && x.indexOf('#')==0) return('#'+x.charAt(1)+x.charAt(1)+x.charAt(2)+x.charAt(2)+x.charAt(3)+x.charAt(3));
                else if(x.indexOf('rgb')==0){
                        var y=x.substr(4, x.length-5);
                        var a=y.split(',');
                        return('#'+dec2hex(a[0])+dec2hex(a[1])+dec2hex(a[2]));
                }
                else if(x=='white') return('#ffffff');
                else if(x=='black') return('#000000');
                else return(x);
       }
       function getCurrentStyle(e){
           return e.currentStyle || realWindow.getComputedStyle(e,null);
       }
       function addRemoveNode(){
           if(realWindow.Node&&!realWindow.opera){
              Node.prototype.removeNode=function(removeChildren){
                  if(removeChildren||!this.hasChildNodes()){
                      return this.parentNode.removeChild(this);
                  }
                  var $parent=this.parentNode;
                  var $nextSibling=this.nextSibling;
                  var $childNodes=$parent.removeChild(this).childNodes;
                  while($childNodes.length){
                      $nextSibling?$parent.insertBefore($childNodes[0],$nextSibling):$parent.appendChild($childNodes[0]);
                  }
                  return this;
              }
           }
       }
})();