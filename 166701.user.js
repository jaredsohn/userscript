// ==UserScript==
// @name        PGTV下载器
// @namespace   pgtv
// @include     http://playgirl.com/*
// @version     1
// ==/UserScript==
            function addJQuery(callback) {
            var script = document.createElement("script");
            script.setAttribute("src", "http://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.8.0.min.js");
            script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
            }, false);
            document.body.appendChild(script);
            }
            // jQuery(document).ready(
            function ini() {
            jQuery(".video-item a").click(function(){  
            return false;  
            });  
            var poop= function(){
            jQuery("div").remove(".pop");
            var pop='<div class="pop"><a class="hight" href="#">高清</a><a class="low" href="#">普通</a><div>'
            jQuery(pop).appendTo("body");
            jQuery(".pop").css({ position: "fixed", top: "20%",width: "400px",left: "35%",display: "block",height: "100px"});
            jQuery(".pop").css('z-index', 99999);
            jQuery(".pop").css('background-color', 'rgba(0, 0, 0, 0.6)');
            jQuery(".pop").css('box-shadow', '10px 10px 30px rgb(255, 255, 255)');
            jQuery(".pop").css('border-radius','6px');
            jQuery(".pop a").css({ display: 'inline-block',width: '30%',height: '40px',color: '#fff'});
            jQuery(".pop a").css('margin-top', '7%');
            jQuery(".pop a").css('margin-left', '11%');
            jQuery(".pop a").css('background-color', 'rgb(230, 12, 12)');
            jQuery(".pop a").css('border-radius','7px');
            jQuery(".pop a").css('box-shadow', '1px 1px 3px rgb(241, 61, 61)');
            jQuery(".pop a").css('text-align', 'center');
            jQuery(".pop a").css('line-height', '40px');
            }

            jQuery(document).bind("click",function(){
            jQuery(".pop").hide("normal","swing");                    
            });

            var loc=window.location.href;
            if(loc.search("couples").toString()!=="-1")
            {
            jQuery(".video-item a").bind("click",
            function(e){
            e=e||window.event;
            e.stopPropagation();
            var url=jQuery(this).attr("href");
            poop();
            var length=url.length;
            var video=(url.indexOf("video"));
            var e=(url.indexOf("/",video));
            var name=url.substring(e+1,url.length-1)+".mp4";
            var fileName=name.replace(/-/g,"_");
            var minDownloadPath="http://video.playgirl.com/mp4low/Playgirl_Member_"+fileName;
            var higDownloadPath="http://video.playgirl.com/mp4hi/Playgirl_Member_"+fileName;
            jQuery("div.pop a.low").attr("href",minDownloadPath);
            jQuery("div.pop a.hight").attr("href",higDownloadPath);

            }
            );
            }
            //
            if(loc.search("solo").toString()!=="-1"){
            //solo
            jQuery(".video-item a").bind("click",
            function(){
            var url=jQuery(this).children("img").attr("src");
            poop();
            var s=(url.indexOf("Playgirl_Member"));
            var e=(url.indexOf("/",s));
            var name=url.substring(s,e)+".mp4";
            var fileName=name.replace(/-/g,"_");
            var minDownloadPath="http://video.playgirl.com/mp4low/"+fileName;
            var higDownloadPath="http://video.playgirl.com/mp4hi/Playgirl_Member_"+fileName;
            jQuery("div.pop a.low").attr("href",minDownloadPath);
            jQuery("div.pop a.hight").attr("href",higDownloadPath);
            }
            );
            }
            //
            if(loc.search("behind").toString()!=="-1"){
            //benhind
            jQuery(".video-item a").bind("click",
            function(){
            var url=jQuery(this).children("img").attr("src");
            poop();
            var s=(url.indexOf("Playgirl_Member"));
            var e=(url.indexOf("/",s));
            var name=url.substring(s,e)+".mp4";
            var fileName=name.replace(/-/g,"_");
            var minDownloadPath="http://video.playgirl.com/mp4low/"+fileName;
            var higDownloadPath="http://video.playgirl.com/mp4hi/Playgirl_Member_"+fileName;
            jQuery("div.pop a.low").attr("href",minDownloadPath);
            jQuery("div.pop a.hight").attr("href",higDownloadPath);
            }
            );
            }
      };
            addJQuery(ini);


            //
            // }
            // );