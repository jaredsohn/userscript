// ==UserScript==
// @name          Doodle or die
// @namespace     doodleordie
// @author        Absolute
// @version       1.2
// @description	  Only show new posts
// @include       http://doodle.no.de*
// ==/UserScript==

var showamount = 4; // how many of the already seen pictures/descriptions will be shown

function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
      c_name = "doodleordie_" + c_name;
      var c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1)
        {
        c_start=c_start + c_name.length+1;
        var c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
        return unescape(document.cookie.substring(c_start,c_end));
        }
      }
    return "";
}

function setCookie(c_name,value,exseconds)
{
    var exdate;
    if (typeof(exseconds) == "object") 
        exdate = exseconds;
    else 
    {
        exdate=new Date();
        exdate.setTime(exdate.getTime() + exseconds*1000);
    }
    c_name = "doodleordie_" + c_name;
    var c_value=escape(value) + ((exseconds==null) ? "" : "; expires="+exdate.toUTCString() + ";");
    document.cookie=c_name + "=" + c_value;
}

var clickfunction = function (e) {
        var count = this.parentNode.getElementsByTagName("li").length;
        var id = this.href.match(/#([0-9a-z]+)/)[1];
        e.preventDefault();
        this.parentNode.style.display = "None";
        setCookie(id, count, 3600*48); 
        
}


var history = document.querySelectorAll(".history div ol");
for (var x = 0;x < history.length; x++)
{
    var ele = history[x];
    var elename = ele.getElementsByClassName("display_drawing")[0].firstElementChild;
    
    elename = elename.src.match(/\/([0-9a-z]+?)-/)[1];
    var oldvalue = getCookie(elename);
    
    if (oldvalue != ""){
        var lielements = ele.getElementsByTagName("li")
        var count = lielements.length;
        if (oldvalue != count)
        {
            if (oldvalue > showamount+2)
            {
                console.log(oldvalue-showamount);
                for (var y=0;y < oldvalue-showamount;y++)
                {
                    
                    var liele = lielements[y];
                    
                    if (liele.className == "doodle_count")
                    {
                        liele.nextElementSibling.style.display = "None";
                    }
                    
                    liele.style.display = "None";
                    console.log("none");
                }
                ele.start = oldvalue-showamount;
                var newtext2 = document.createElement("a");
                newtext2.href = "#" + elename;
                ele.parentNode.insertBefore(newtext2, ele);
                newtext2.textContent = "Show Previous Posts";
                newtext2.addEventListener("click", function (e) {
                    e.preventDefault();
                    this.nextElementSibling.start = 1;
                    var elename = this.href.match(/#([0-9a-z]+)/)[1];
                    setCookie(elename, "", 0);
                    
                    var list = this.nextElementSibling.children;
                    console.log(list);
                    for (var x=0;x < list.length;x++)
                    {
                        
                        list[x].style.display = "";
                    }
                    this.style.display = "None";
                }, true);
            }
            
            // setCookie(elename, "", 0);
            
        }
        else
        {
            ele.parentNode.style.display = "None";
            continue;
        }
    }
    
    var newtext = document.createElement("a");
    newtext.className = "hideallclass";
    newtext.href = "#" + elename;
    ele.parentNode.insertBefore(newtext, ele.parentNode.firstElementChild);
    newtext.innerHTML = "[X]<br>";
    newtext.addEventListener("click", clickfunction, true);
    var newtext = document.createElement("a");
    newtext.href = "#" + elename;
    ele.parentNode.appendChild(newtext);
    newtext.textContent = "[X]";
    newtext.addEventListener("click", clickfunction, true);
    
}

var hideAll = document.createElement("a");
hideAll.textContent = "Hide All Pictures/Captions";
hideAll.href = "#";
document.getElementsByClassName("history")[0].appendChild(hideAll)
hideAll.addEventListener("click", function (e) {
    e.preventDefault();
    var oldlist = document.getElementsByClassName("hideallclass");
    for (var x = 0;x < oldlist.length; x++)
    {
        oldlist[x].click();
    }
    this.style.display = "None";
}, true);

