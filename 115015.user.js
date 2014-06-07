// ==UserScript==
// @name           UserScripts Topic Plus
// @description    Userscripts.org Konu ve Tartışma Bölümünü Geliştirin!
// @include        http://userscripts.org/topics/*
// @include        http://userscripts.org/reviews/*
// @author         Maxcod2
// @version        2.7
// @license        GNU General Public License (GPL)
// ==/UserScript==
var SS = document.styleSheets[0];
SS.ir = SS.insertRule;
if (window.location.href.search(/http:\/\/userscripts.org\/topics\/\d+/)!=-1) SS.ir("#FormatTools{width:807px;text-align:center;vertical-align:middle;background-color:#CCC;border:1px solid #666;diplay:block;margin-left:88px;}",0);
else SS.ir("#FormatTools{width:710px;text-align:center;vertical-align:middle;background-color:#CCC;border:1px solid #666;diplay:block;}",0);
SS.ir("#FormatTools img{width:16px;height:16px;border:inherit;margin:10px;background-color:white;}",1);
SS.ir("#FormatTools h1{font-weight:bold;font-style:oblique;font-size:20px;width:100%;text-decoration:underline;}",2);
SS.ir("#FormatTools h1 sub{font-weight:normal;font-style:inherit;font-size:40%;text-decoration:none;}",3);
SS.ir("#Preview{color:black;backgroung-image:-moz-linear-gradient(top,#CCC, white);font-weight:normal;background-color:#CCC;padding:10px;}",4);
SS.ir("#Preview h2{color:white;background-color:#FFB84D;border:1px double #F93;font-size:20px;height:30px;vertical-align:middle;text-align:center;}",5);
SS.ir("#Preview button{position:absolute;top:0px;right:0px;background-color:red;color:inherit;width:30px;height:30px;border-radius:5px;}",6);
SS.ir("#FormatTools input{margin:10px;display:inline;}",7);

var UFE = {};
UFE.text="";
UFE.selection="";
UFE.start=undefined;
UFE.end=undefined;
UFE.place=document.getElementById("new_topic")||document.getElementById("reply");
UFE.FT=document.createElement("div");
UFE.FT.id="FormatTools";
UFE.FT.innerHTML="<h1>UserScripts Topic Plus</h1><h6><b>Created By A. Deniz Özgül</b></h6>";
UFE.TA=document.getElementById("topic_body")||document.getElementById("post_body");
//----------
var getSelection=function(){if(this.selectionStart!=undefined && this.selectionEnd!=undefined){UFE.selection=this.value.substring(this.selectionStart,this.selectionEnd);UFE.start=this.selectionStart;UFE.end=this.selectionEnd;UFE.text=this.value;}
                            else alert("Text selections are not supported in this browser!");}
UFE.TA.warpSelection=function(before,after){if (UFE.selection!=""){this.value=this.value.substring(0,UFE.start)+before+UFE.selection+after+this.value.substring(UFE.end);UFE.selection="";UFE.start=undefined;UFE.end=undefined;UFE.text=this.value;this.focus();}
                                            else alert("Please select a text first!");}
UFE.TA.addText=function(text){this.value=UFE.text+text;UFE.text=this.value;this.focus();}
//----------
UFE.TA.addEventListener("select",getSelection,false);
UFE.TA.addEventListener("change",function(){UFE.text=this.value},false);
//----------
function insertLink(){var url=prompt("Enter the URL:","http://");
                      if(url)
                      UFE.TA.warpSelection("<a href='"+url+"'>","</a>");}
function insertImage(){var url=prompt("Enter the image URL:","http://");
                       if(url)
                       UFE.TA.addText("<img src='"+url+"' alt='Image'/>");}
function insertHeading(){var h=prompt("Enter the heading text:","");
                         if(h)
                         UFE.TA.addText("<h1>"+h+"</h1>");}
function insertQuote(){var q=prompt("Enter the quote text:","");
                       if(q)
                       UFE.TA.addText("<q>"+q+"</q>");}
function insertICode(){var ic=prompt("Enter the code text:","");
                       if(ic)
                       UFE.TA.addText("<code>"+ic+"</code>");}
function insertBCode(){UFE.TA.addText("<pre>Insert a multi-line code here</pre>");}
function makeBold(){UFE.TA.warpSelection("<b>","</b>");}
function makeItalic(){UFE.TA.warpSelection("<i>","</i>");}
function makeUnderlined(){UFE.TA.warpSelection("<ins>","</ins>");}
function makeStrikethrough(){UFE.TA.warpSelection("<del>","</del>");}
function insertLBreak(){UFE.TA.addText("<br/>\n");}
function reset(){if(confirm("Are you sure?"))UFE.TA.value="";UFE.TA.focus();}
//----------
function preview(){UFE.div=document.createElement("div");
                   UFE.div.id="Preview";
				   var h2=document.createElement("h2");
				   h2.innerHTML="Önizleme";
				   UFE.div.appendChild(h2);
				   var p=document.createElement("div");
				   UFE.div.appendChild(p);
				   p.innerHTML=UFE.text;
				   var button=document.createElement("button");
				   button.innerHTML="X";
				   button.addEventListener("click",function(){UFE.div.parentNode.removeChild(UFE.div);},false);
				   UFE.div.appendChild(button);
                   document.body.appendChild(UFE.div);
				   popUp();
				   function popUp(){UFE.div.style.position="fixed";
                     UFE.div.style.left="20%";
		   		     UFE.div.style.top="30%";
				     UFE.div.style.zIndex="100";
				     UFE.div.style.border="3px outset #F93";
				     UFE.div.style.width="600px";
				     UFE.div.style.height="25px";
				     var I=setInterval(animateHeight,10);
				     function animateHeight(){if(parseFloat(UFE.div.style.height)<300)UFE.div.style.height=parseFloat(UFE.div.style.height)+5+"px";
										      else clearInterval(I);}
				    }
				}
//----------
function popUp(){UFE.div.style.position="fixed";
                 UFE.div.style.left="50%";
		   		 UFE.div.style.top="30%";
				 UFE.div.style.zIndex="100";
				 UFE.div.style.border="3px outset #F93";
				 UFE.div.style.width="700px";
				 UFE.div.style.height="25px";
				 var I=setInterval(animateHeight,50);
				 function animateHeight(){if(parseFloat(UFE.div.style.height)<300)UFE.div.style.height=parseFloat(UFE.div.style.height)+1+"px";
										  else clearInterval(I);}
				}
//----------
(UFE.link=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/9fef59cbf551cae68fd049dfe3dac3efbf997da959f62b2defcb748b4a2d26f46g.jpg";
UFE.link.alt=UFE.link.title="Link Ekle";
UFE.FT.appendChild(UFE.link);
UFE.link.addEventListener("click",insertLink,false);

(UFE.image=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/0d8857ccad2f5229a4ba2adf6dbb2b94392fe2bb08079d572546dde81de37a1b6g.jpg";
UFE.image.alt=UFE.image.title="Resim Ekle";
UFE.FT.appendChild(UFE.image);
UFE.image.addEventListener("click",insertImage,false);

(UFE.heading=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/e5b9bbb5231525da6f216b83b3e007ad84a170fcaf57b9b53a9c4961d73e371d6g.jpg";
UFE.heading.alt=UFE.heading.title="Başlık Ekle";
UFE.FT.appendChild(UFE.heading);
UFE.heading.addEventListener("click",insertHeading,false);

(UFE.bold=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/445cef922112e18137d95ccfbc73b0025309025ea45148dacbc0778adfedcbb26g.jpg";
UFE.bold.alt=UFE.bold.title="Kalın Yazı";
UFE.FT.appendChild(UFE.bold);
UFE.bold.addEventListener("click",makeBold,false);

(UFE.italic=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/91e576e1d3ad0529754af37d11062863c2c7490691eeac31b213c3eebdc4684e6g.jpg";
UFE.italic.alt=UFE.italic.title="İtalik Yazı";
UFE.FT.appendChild(UFE.italic);
UFE.italic.addEventListener("click",makeItalic,false);

(UFE.underlined=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/0be9313705f54c5b7303408f2ddbc5c72bc7fb766fcbffba49022dbfb3bfe31f6g.jpg";
UFE.underlined.alt=UFE.underlined.title="Altçizgi";
UFE.FT.appendChild(UFE.underlined);
UFE.underlined.addEventListener("click",makeUnderlined,false);

(UFE.strike=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/288f231adc5c1c9af3620ee22fff0b31c33390f9cc7858447657ae2eacba0d186g.jpg";
UFE.strike.alt=UFE.strike.title="Karalama";
UFE.FT.appendChild(UFE.strike);
UFE.strike.addEventListener("click",makeStrikethrough,false);

(UFE.ICode=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/46819c0531380b2081f39181b8319316502752ac704c18887c3a96d791299d446g.jpg";
UFE.ICode.alt=UFE.ICode.title="Satır-içi Kod";
UFE.FT.appendChild(UFE.ICode);
UFE.ICode.addEventListener("click",insertICode,false);

(UFE.BCode=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/77a2b14114528eb6e3af76637f52c640c83cd80a3f5c72de76a3bbc5d79c16276g.jpg";
UFE.BCode.alt=UFE.BCode.title="Blok Kod";
UFE.FT.appendChild(UFE.BCode);
UFE.BCode.addEventListener("click",insertBCode,false);

(UFE.quote=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/53d9b00fa6dbcd996d59ce7b2babfa34395921f85625506b551907875f8220e36g.jpg";
UFE.quote.alt=UFE.quote.title="Alıntı";
UFE.FT.appendChild(UFE.quote);
UFE.quote.addEventListener("click",insertQuote,false);

(UFE.LBreak=document.createElement("img")).src="http://www.mediafire.com/imgbnc.php/a8a14da049004895f37133055b1a66e76c469930b7f0623a8aa3017db9846b566g.jpg";
UFE.LBreak.alt=UFE.LBreak.title="Satır Ekle";
UFE.FT.appendChild(UFE.LBreak);
UFE.LBreak.addEventListener("click",insertLBreak,false);

(UFE.preview=document.createElement("input")).type="button";
UFE.preview.value=UFE.preview.title="Önizleme";
UFE.FT.appendChild(UFE.preview);
UFE.preview.addEventListener("click",preview,false);

(UFE.reset=document.createElement("input")).type="button";
UFE.reset.value=UFE.reset.title="Reset";
UFE.FT.appendChild(UFE.reset);
UFE.reset.addEventListener("click",reset,false);
//---------
UFE.place.appendChild(UFE.FT);
UFE.place.insertBefore(UFE.FT,UFE.FT.parentNode.getElementsByTagName("p")[1]||UFE.FT.parentNode.getElementsByTagName("div")[0]);