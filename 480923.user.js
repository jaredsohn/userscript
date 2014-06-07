// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://tower.im/teams/0f2e2d4813904d8695de89e70acfdb42/
// @copyright  2012+, You
// ==/UserScript==

function FetchProjectsFromProjectsPage(){
    if(location.pathname.match("/teams/.*?\/$") != null){
        console.info("fetch projects");
        var projects = [];
        $(".project .name a").each(function(){
            projects.push({
                name: $(this).text(),
                href: $(this).attr("href")
            });
        });
        localStorage.projects = JSON.stringify(projects);
    }
}

function CreateProjectsNav(){
    console.info("create nav");
    if(localStorage.projects){
        try{
        	var projects = JSON.parse(localStorage.projects);
            if(projects && projects.length){
                var proj;
                var navs = "";
                for(var i=0,l=projects.length; i<l; i++){
                    proj  = projects[i];
                	navs += "<a href='"+proj.href+"'>"+proj.name+"</a>"
                }
                
                var navsCss = {
                    "display": "block",
                    "border": "1px solid #ddd",
                    "font-size": "12px",
                    "margin-bottom": "10px",
                    "text-align":"center",
                    "border-radius": "4px",
                    "padding": "0 10px",
                    "line-height": "30px"
                }
              
                
                var wrap = $("<div></div>").css({
                    "position":"fixed",
                    "top": "100px",
                    "left": ((document.body.offsetWidth - 960) / 2 - 127 - 20) + 'px'
                });
                
                wrap.append($(navs).css(navsCss));
                
                wrap.appendTo($(".page"));
            }
        }catch(e){
            console.error("Parse projects failed:" + e);
        }
    }
}

FetchProjectsFromProjectsPage();
CreateProjectsNav();
                               
                    