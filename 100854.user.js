// ==UserScript==
// @name           mtime2hudbt
// @namespace      mtime2hudbt
// @description    mtime2hudbt
// @include        http://movie.mtime.com/*
// ==/UserScript==
(function(){
    // get movie name from the title of web page
    var getMovieName = function(){
        var s = document.title.trim();
        s = s.substring(0, s.length-6).trim();
		var s1 =  new Array();
		s1 = s.split(" ");
        return s1[0];
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
    //hudbt_box.style.marginBottom = '20px';
	//hudbt_box.style.font = "bold italic 14px 宋体 Yellow";
	//hudbt_box.style.font.color = "Yellow";
	//hudbt_box.style.position = "absolute"; 
	//hudbt_box.style.top="5%";
	//hudbt_box.style.left="85%";
	//hudbt_box.style.width = "200px";
	//hudbt_box.style.height = "100px";
	//document.body.appendChild(hudbt_box);
	var ur2 = "http://pt.sjtu.edu.cn/torrents.php?search="+name;
    var pt_box = document.createElement("div");
    pt_box.innerHTML = "<a target='_blank' href='"+ur2+"'>到PT搜索 "+name+"</a>";
	var ur3 = "http://www.gougou.com/search?search="+name;
    var gougou_box = document.createElement("div");
    gougou_box.innerHTML = "<a target='_blank' href='"+ur3+"'>到狗狗搜索 "+name+"</a>";
    //pt_box.style.marginBottom = '20px';
	//pt_box.style.font = "bold italic 14px 宋体 Yellow";
	//pt_box.style.font.color = "Yellow";
	//pt_box.style.position = "absolute"; 
	//pt_box.style.top="10%";
	//pt_box.style.left="85%";
	//pt_box.style.width = "200px";
	//pt_box.style.height = "100px";
	//document.body.appendChild(pt_box);
	var my_box = document.createElement("div");
	my_box.style.marginBottom = '20px';
	my_box.style.font = "bold italic 14px 宋体 Yellow";
	my_box.style.position = "absolute"; 
	my_box.style.top="8%";
	my_box.style.left="85%";
	my_box.style.width = "200px";
	my_box.style.height = "100px";
	my_box.appendChild(pt_box);
	my_box.appendChild(hudbt_box);
	my_box.appendChild(gougou_box);
	document.body.appendChild(my_box);
}());