// ==UserScript==
// @name           Links validator
// @namespace      http://userscripts.org/users/Hamza7
// @description    Checks links and highlight broken ones in a web page so that you don't have to click them.
// @include        http*://*
// @include        file:///*
// @exclude        http://userscripts.org/*
// @require        http://code.jquery.com/jquery.min.js
// @resource       error http://www.mediafire.com/imgbnc.php/1bc3eabbb1069fa663697259fbf6f21eaefd1d51168f33ced13c2965f1e2b1bd6g.jpg
// @resource       unknown http://www.mediafire.com/imgbnc.php/011f4e33d86b448078a2bd56b7060770b2c079e86aad2b7298ab0db216758f346g.jpg
// @version        1.1
// @author         Hamza Abbad
// @license        GNU General Public License
// ==/UserScript==
if(window.top===window.self){//Not in frame.
var LV={};
LV.a=$("a[href]").filter(function(){return this.href.search(/http/i)==0;});//Only links with href attribute and start with HTTP
if(LV.a.length>0){//If there any links in this page.
LV.container=$("<div id='LV'><h1>Links validator</h1></div>");
$("body").append(LV.container);
(LV.button=document.createElement("button")).innerHTML="Hide";
$(LV.button).click(function(){LV.container.fadeOut(500);}).css({height:"100%"});
LV.container.children("h1").append(LV.button)
LV.container.css({position:"fixed",left:"0px",bottom:"0px",border:"1px solid blue",borderTopWidth:"3px",backgroundColor:"LightBlue",zIndex:"3725",width:"220px",height:"100px",font:"normal 12px/normal Arial, sans-serif",color:"Blue",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",direction:"ltr",textAlign:"center",padding:"0px",margin:"0px"});
LV.container.children("h1").css({backgroundColor:"RoyalBlue",borderBottom:"2px double blue",color:"White",fontSize:"120%",fontWeight:"bold ",position:"absolute",top:"0px",left:"0px",height:"20px",width:"100%",padding:"0px",margin:"0px"});
(LV.s=$(document.createElement("p"))).appendTo(LV.container).css({position:"absolute",left:"10px",top:"30px",width:"200px",height:"20px",padding:"0px",margin:"0px"});
$(document.createElement("div")).css({width:"200px",height:"20px",backgroundColor:"LightCyan",border:"1px dashed Aqua",position:"absolute",top:"70px",left:"10px",borderTopRightRadius:"5px",borderBottomRightRadius:"5px"}).appendTo(LV.container);
$(document.createElement("div")).css({width:"0px",height:"20px",backgroundColor:"Orange",borderLeft:"1px dotted Aqua",position:"absolute",top:"71px",left:"10px",borderTopRightRadius:"5px",borderBottomRightRadius:"5px"}).appendTo(LV.container);
(LV.p=$(document.createElement("p"))).css({width:"0px",height:"76px",border:"1px solid DodgerBlue",borderTopWidth:"3px",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",position:"absolute",left:"220px",top:"15px",zIndex:"10000",backgroundColor:"SkyBlue",overflow:"hidden",opacity:"0.0"}).appendTo(LV.container);
(LV.l=$(document.createElement("p"))).css({width:"auto",height:"20px",display:"none",backgroundColor:"Cyan",border:"1px dotted MediumBlue",borderTop:"3px SlateBlue",position:"fixed",bottom:"100px",left:"0px",fontSize:"12px",fontWeight:"normal",color:"MediumBlue",direction:"ltr",borderRaius:"5px",overflow:"hidden",cursor:"help",zIndex:"10000",font:"normal 12px/normal Arial, sans-serif"}).appendTo(document.body);
LV.s.hover(function(){if(LV.s.html()!="Validation completed")LV.l.fadeIn(500);},function(){LV.l.fadeOut(500);});
function checkURL(index,element){
GM_xmlhttpRequest({ method:"HEAD",
                    url:element.href,
					synchronous:false,
				    onreadystatechange:function(o){if(o.readyState==2){checkURL.i++;LV.s.html("Checking link "+(checkURL.i)+" of "+LV.a.length+" ("+Math.round((checkURL.i)/LV.a.length*100)+"%)");LV.l.html("Current link : "+element.href)}
					                               else if(o.readyState==4){if(o.status<300)success();
					                                                        else if(o.status<400 || o.status==405)unknown(o.statusText);
																	        else error(o.statusText);
												                            if(LV.a.length==checkURL.i){LV.container.children("div:last").html("Done");
																			                            LV.s.html("Validation completed");
																										LV.l.hide();
				                                                                                        LV.p.html(checkURL.i+" links checked.<table><tr><th>Valid</th><td>"+checkURL.s+"</td></tr><tr><th>Unknown</th><td>"+checkURL.r+"</td>.</tr><tr><th>Invalid</th><td>"+checkURL.f+"</td></tr></table>.");
                                                                                                        LV.p.find("td:first").css("color","Green").end().find("td:last").css("color","Red").end().find("td:eq(1)").css("color","Yellow");
																										LV.p.find("th:first").css("background","none scroll 0 0 LawnGreen").end().find("th:last").css("background","none scroll 0 0 OrangeRed").end().find("th:eq(1)").css("background","none scroll 0 0 #FF6").end().find("th,td").css({border:"1px solid Blue",padding:"0px",margin:"0px",width:"50%",height:"auto"});
				                                                                                        LV.p.children("table").css({borderCollapse:"collapse",width:"90%",marginLeft:"auto",marginRight:"auto"});
																										LV.p.animate({width:"200px",opacity:"1.0"},"slow");
												                                                        window.setTimeout(function(){LV.p.animate({width:"0px",opacity:"0.0"},"slow");},3000);
				                                                                                        window.setTimeout(function(){LV.container.hide("slow");},4000);}
																	       }
					                              }
				  });
function error(s){$(element).css("background-color","Tomato").after("<img src='"+GM_getResourceURL('error')+"' alt='"+s+"' title='"+s+"' style='cursor:help'/>");
				  LV.container.children("div:last").width(Math.round((checkURL.i+1)/LV.a.length*200));
				  checkURL.f++;
				 }
function success(){//$(element).css("border","1px dotted Lime");
			       LV.container.children("div:last").width(Math.round((checkURL.i+1)/LV.a.length*200));
			       checkURL.s++;
				  }
function unknown(s){$(element).css("backgroun-color","Yellow").after("<img src='"+GM_getResourceURL('unknown')+"' alt='"+s+"' title='"+s+"' style='cursor:help'/>");
                    LV.container.children("div:last").width(Math.round((checkURL.i+1)/LV.a.length*200));
					checkURL.r++;
				}			  
}
checkURL.i=0;
checkURL.s=0;
checkURL.f=0;
checkURL.r=0;
LV.a.each(checkURL);}}//Credits: This script uses jQuery and famfamfam icons.