// ==UserScript==
// @name           iFanboy Ignore Script
// @namespace      Articles
// @description    Ignore annoying people in the ifanboy comments
// @include        http://ifanboy.com/content/*
// @include        http://www.ifanboy.com/content/*
// @include        http://ifanboy.com/podcasts/*
// @include        http://www.ifanboy.com/podcasts/*
// ==/UserScript==

                                var list = new Array();
                                list[0] = 'flapjaxx';
                                list[1] = 'edward';
                                
                                function getElementsByClassName(classname, par){
                                   var a=[];
                                   var re = new RegExp('\\b' + classname + '\\b');
                                   var els = par.getElementsByTagName("*");
                                   for(var i=0,j=els.length; i<j; i++){
                                      if(re.test(els[i].className)){
                                         a.push(els[i]);
                                      }
                                   }
                                   return a;
                                };
                                
                                function findName(nameentry) {
                                  for (var i=0; i<list.length; i++)
                                    if (nameentry.innerHTML.indexOf('>' + list[i] + '<', 0)>=0) {
                                    	return 1;
                                    }
                                  return 0;
                                }
                                
                                
                                function IgnorePosts(par) {
                                   var els = par.getElementsByTagName("*");
                                   for(var i=0,j=els.length; i<j; i++)
                                      if (els[i].className == 'post') {
                                      	if (findName(els[i])) {
                                        	par.parentNode.removeChild(par);
                                      		
                                      	}
                                   }
                                }
                                                                
                                window.setTimeout( function() {
                                
                                  var url=window.location.toString();
                                  if ((url.indexOf("content/",0) >= 0) || (url.indexOf("podcasts/",0) >= 0)){
                                
                                    var posts = getElementsByClassName('comment', document);
                                    for (var i=0; i<posts.length; i++) {
                                       IgnorePosts(posts[i]);
                                    }
                                  }                                
                                }, 100);

