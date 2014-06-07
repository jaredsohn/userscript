// ==UserScript==
// @name          Moodle Class Resoureces Downloader
// @namespace     http://rococolabs.org
// @author        Diego Carvallo
// @copyright     2013+, rococolabs.org
// @version       1.0rc1
// @description   This script is meant to facilitate the downloads on a Moodle Class by adding a Download All button to every Session.
// @icon          https://www.google.com/s2/favicons?domain=moodle.org
// @run-at        document-end
// @match         http://lms.incae.edu/course/view.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

// function to inject js to the DOM
function inject(id, jscode) {
    var injscript = document.createElement('script');
    injscript.setAttribute("id", id);
    injscript.setAttribute("type", "text/javascript");
    injscript.appendChild(document.createTextNode('('+ jscode +')();'));
    (document.body || document.head || document.documentElement).appendChild(injscript);
}

function injmain() 
{
    
    function require(url, callback)
    {
        // adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
    
        // then bind the event to the callback function 
        // there are several events for cross browser compatibility
        script.onreadystatechange = callback;
        script.onload = callback;
    
        // fire the loading
        head.appendChild(script);
    };
    function step1()
    { 
        require("http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", step2);
    };
    function step2()
    { 
        require("https://raw.github.com/sapeish/multiDownload/use-a-download/jquery.multiDownload.js", step3);
    };
    function step3()
    { 
        require("https://raw.github.com/sapeish/jszip/load-from-url/jszip.js", step4);
    };
    function step4()
    { 
        function cleanSpecialCharacters(string) {
            string = string.replace(/á/g, "a");
            string = string.replace(/é/g, "e");
            string = string.replace(/í/g, "i");
            string = string.replace(/ó/g, "o");
            string = string.replace(/ú/g, "u");
            string = string.replace(/ñ/g, "n");
            string = string.replace(/ç/g, "c");
            return string;
        }
        function getExtensionFromURL(url) {
            var name = "image";
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var result = regex.exec(url);
            result = (result == null) ? "" : decodeURIComponent(result[1].replace(/\+/g, " "));
            if(result)
                result = result.substring(result.indexOf("/")+1);
            if(result == "powerpoint")
                result = "ppt";
            if(result == "word")
                result = "doc";
            if(result == "excel")
                result = "xls";
            if(result == "visio")
                result = "vsd";
            if(result == "project")
                result = "mp";
            return result;
        }
        
        function triggerDownoad(name, url)
        {
            var aelement = document.createElement('a');
            aelement.download = name;
            aelement.href = url;
            aelement.click();
        }
        
        function generateZip(button, group, fname)
        {
            $("#loader-"+group).css("display", "initial");
            var button = button;
            var zip = new JSZip();
            var foldername = $(".breadcrumb li:last-child a").text().replace(/\//g, "").replace(/\\/g, "") + " " + fname;
            var folder = zip.folder(foldername);
            var count = $("#" + group + " .content .section.img-text .activity.resource a").length;
            var progress = 0;
            var textupdate =  document.getElementById("zipalldone-"+group);
            textupdate.innerHTML = "loading "+progress+"/"+count;
            $("#" + group + " .content .section.img-text .activity a .downloadstatus").css("background-position", "16px 0px");
            $("#" + group + " .content .section.img-text .activity.resource a .downloadstatus").css("background-position", "0px 0px");
            
            var callback = function(id){
                progress += 1;
                textupdate.innerHTML = "loading "+progress+"/"+count;
                $("#" + group + " #" + id + " .downloadstatus").css("background-position", "-16px 0px");
                if (progress == count)
                {
                    var content = zip.generate({type:"blob"});
                    try 
                    {
                        $("#loader-"+group).css("display", "none");
                        textupdate.innerHTML = "";
                        var name = foldername+".zip";
                        var url = window.URL.createObjectURL(content);
                        triggerDownoad(name, url);
                        $(button).data("working", null);
                        $(button).attr("style", "");
                    }
                    catch(e)
                    {
                        textupdate.innerHTML += " (not supported on this browser)";
                    }
                }
            };

            $("#" + group + " .content .section.img-text .activity.resource a").each(function(index) {
                var name = $(this).data("name");
                var url = $(this).data("url");
                var id = $(this).attr("id");
                folder.fileURL(name, url, id, callback, {xhrtype:"blob"});
            });        
        }

        // add the downloadall div
        $(".section.main .content").append("<div class='downloadall'></div>");
        
        // organize elements
        $(".section.main .content .section.img-text").css( "float", "left" );
        $(".section.main .content .downloadall").css( "float", "right" )
                                                .css( "margin", "0 0 1em 1em" );
        
        // remove hidden span in resource name
        $(".section.main .content .section.img-text .activity.resource a .instancename .accesshide").remove();
        
        // prepare all href link with the option "redirect=1" and remove onclick
        $(".section.main .content .section.img-text .activity.resource a").each(function(index) {
            var ihref = $(this).attr( "href" );
            ihref = ihref + "&redirect=1";
            $(this).attr( "href",  ihref);
            $(this).attr( "onclick",  "");
        });
        
        // add download status icon
        $(".section.main .content .section.img-text .activity a").append("<span class='downloadstatus' style='width:16px; height:16px; display:inline-block;'></span>");
        $(".section.main .content .section.img-text .activity a .downloadstatus").css("background","url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA1hJREFUSEvtlW1IU1EYx4+b5Fa6u93pGpmaFa4kgrZw9SGIlLxSsfmhsrZYLxCsjKLXD30IEkmjF5BeIMuXomkj1MJE0lraiKg73Xq1GEZOafrBINtY2u30nHWKVmZ9WBbRD/6cc57n+cNz7n24F/0nylxCaIodoUKQDeSkIvtCkqNlf4hLSWnInsSDOBqJoBahFXVSqcOt1/sGzObA0JYtwhurVeg3mQKdWVk+kiM1tHycuZgoRzWJDZsH92FYeVDEJS5CY1fkcpffZAq+sliwz2SKEIn1FhQEGxjGRWqpbZw4r5yALiRWzLuT3be2Zyu29O8YgTNPs6gaRqNWInH0rFoVfJafj58aDKOqy2jEXoMhWBMX5yAeav/NVLIxqEpZPK1Z123s2oCXPTYPx9emPkDVyuW0AlXAfN/Ran2evDx8b8mSMdWZm4tvZGb6iIfao0Q5y4H48Po15axVaZ/ZtbRz9Ycc10pBXpP+BJ1lN9FsmDMI1TzMzQ049Hr8Wde1Wtyg0WDb1Km4SqXCZ1k2LLJv1GgCxEPtUeCUgkOnFfzGgV0CWcPnT/HlknPqh3OaFo1k1Os/yKrSnkN+fzj3FafgSwNPX2jR6XAoFMLd3d24o6MDezwe7PV6sd/vx4ODg2FVKxT4ckqKQDzUHgXKGN7ct22Yc6/BBS+t78kZtC32pPL+jMb5ofSrWsxUpr2A2BF0Qi6iri+UQTOunBzhWkYGdrvdmOf5UZsnssMF6tVqgXioPQock3HoqIw3PLO8m96qw4vdxhA5T7maOZTcPAcz51N74VyBjjMS6ojgKIzDrblzA40wIrXQ4FhqBNWzbIB4qD1KlCRw6FACr7uXHVTfno1n8Qvx5PZZmLGnDkC8Dh1OkNPK7yglPy6VqqcN5vsmNPgzVUulPuKh9ihSNIlDByfxybcy3ypdM7GsKeV1TFF8CyqOT6YVo1IMn8TDYrGjTa0O3oW3cBea/JFaGSZYKhI5iIfao8weCYd2xvETbSp/zF6JE86zaWZMDsDPqSQ21uVk2aAHLuGBZr9VOzRfIha7SC21/SY2iDlkEfGwLqCRX2I7NLYbnu45icTnlMkCjxQKgYjsSYzkSA0t/ztZD6OxDuYbZAM5qci+kORo2b8CQh8BUvzSd3kOUMMAAAAASUVORK5CYII=)");
        
        // loop al main sections and create their download buttons
        $(".topics>li.section.main").each(function(index) {
            var group = $(this).attr("id");
            var folder = group.replace("section", "sesion");
            // place only a span if there is nothing to download
            if($(".content .section.img-text .activity.resource a", this).length <= 0)
            {
                $(".downloadall", this).append("<span id='triggerall-" + group + "' style='color:#A3A3A3;'>Download all</span><br>");
                $(".downloadall", this).append("<span id='zipallstart-" + group + "' style='color:#A3A3A3;'>Download all zipped</span>");
            }
            // add the link if has downloadable resources
            else
            {
                // set download buttons
                $(".downloadall", this).append("<a id='triggerall-" + group + "' href=''>Download all</a><br>");
                $(".downloadall", this).append("<a id='zipallstart-" + group + "' href=''>Download all zipped</a>&nbsp;&nbsp;"+
                                               "<img id='loader-"+ group + "' alt='loading'  style='vertical-align:-15px; display:none;' src='data:image/gif;base64,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'/>&nbsp;&nbsp;"+
                                               "<a id='zipalldone-"+ group + "' href=''></a>");

                // set unzipped download functionality
                $(".content .section.img-text .activity.resource a", this).multiDownloadAdd(group);
                $(".content .section.img-text .activity.resource a", this).each( function(index, elem) {
                    var id = group + "-resource-" + index;
                    var url = $(this).attr( "href");
                    var name = $(".instancename", this).text();
                    var iconurl = $("img", this).attr("src");
                    var ext = getExtensionFromURL(iconurl);
                    name = folder + " - " + name + "." + ext;
                    $(this).attr("id", id);
                    $(this).attr("data-url", url);
                    $(this).attr("data-name", name);
                    $(this).attr("data-folder", folder);
                    $(this).click( function() { 
                        triggerDownoad(name, url);
                        return false; 
                    });
                });
                $("#triggerall-"+group).multiDownload('click', group, { delay: 1000, cleaningDelay: 1000, type: "adownload" });

                // set zipped download functionality
                $("#zipallstart-"+group).click( function() { 
                    if(!$(this).data("working")) {
                        $(this).data("working", "working");
                        $(this).css( {"color": "gray", "text-decoration": "none", "cursor": "default" });
                        generateZip(this, group, folder);
                    }
                    return false; 
                });
            }
        });
        
    };
    step1();
}

inject("injmain", injmain);


