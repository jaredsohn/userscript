// ==UserScript==
// @name       douban2hudbt
// @namespace  douban2hudbt
// @version    v1.0
/* @reason
 * add a link to hudbt on douban movie
 * @end
 */
// @match     http://movie.douban.com/subject/*
// @author    wonderfuly@gmail.com
// @thankto   wong2.cn
//
// ==/UserScript==

(function(){
    // get movie name from the title of web page
    var getMovieName = function(){
        var s = document.title.trim();
        s = s.substring(0, s.length-4).trim();
        return s;
    };
    // get all [child(if node is given)] elements with the given classname
    var getElementsByClassName = function(classname, node)  {
        node = node || document.body;
        var i, j;
        var a = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var child_nodes = node.getElementsByTagName("*");
        for(i=0,j=child_nodes.length; i<j; i++){
            if(re.test(child_nodes[i].className)){
                a.push(child_nodes[i]);
            }
        }
        return a;
    };    
    var name = getMovieName();
    var url = "http://www.kmgtp.org/torrents.php?search="+name;
    var hudbt_box = document.createElement("div");
    hudbt_box.innerHTML = "<a target='_blank' href='"+url+"'>到HUDBT搜索 "+name+"</a>";
    hudbt_box.style.marginBottom = '20px';
    var right_box = getElementsByClassName("aside", document.getElementById("content"))[0];
    right_box.insertBefore(hudbt_box, right_box.firstChild);
}());