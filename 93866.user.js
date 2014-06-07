// ==UserScript==
// @name           doubanApi
// @namespace      ifree.common
// @description    get douban.fm's music by js not flash.
// @version        1.0.0
// // ==/UserScript==
function trace(msg) {
    if(window['debug'])
    	console&&console.log(msg);
}
function fakeUrlLoader(url,callback,errcallback){//due to cross domain policy... 
	var aid="dbjsonp";
	
	var proxyUrl="http://ifree.kodingen.com/tools/php/jsonpproxy.php";
	var sobj=document.getElementById(aid);
	if(sobj){
		sobj.src=proxyUrl+"?out_var="+aid+"&req_url="+escape(url);
		document.body.removeChild(sobj);
	}else{
		sobj=document.createElement("script");
		sobj.id=aid;
		sobj.src=proxyUrl+"?out_var="+aid+"&req_url="+escape(url);
	}
	document.body.appendChild(sobj);
	sobj.onload=function(){
			if(callback)
				callback(dbjsonp);
	};
	sobj.onerror=errcallback;
	
}

function DoubanRadio(channelNo, sid) {
    if (channelNo) {
        this.channel = channelNo;

    }
    else {
        this.channel = parseInt(Math.random() * 10, 10);

    }
    if (sid) {
        this.sid = sid;

    }
    else {
        this.sid = "000000";

    }
    this.channels = {
        0: "私人电台",
        1: "华语 ",
        2: "欧美 ",
        3: "七零 ",
        4: "八零 ",
        5: "九零 ",
        6: "粤语 ",
        7: "摇滚 ",
        8: "民谣 ",
        9: "轻音乐",
        10: "原声"
    };
    this.playlistUrl = "http://douban.fm/j/mine/playlist";
    this.playList = [];

}

DoubanRadio.prototype.requireList = function(sid, type) {
    var reqUrl = this.playlistUrl + "?r=" + Math.random() + "&amp;type=" + type + "&amp;h=&amp;channel=" + this.channel;
    var This=this;
    fakeUrlLoader(reqUrl,function(data){
    		This.processList(data);
    });
}
DoubanRadio.prototype.onSongStatus = function(sid, subtype, type)
 {

    switch (type)
    {
        case "p":
        {
            trace("play ok");
            this.reportPlayed(nowPlaySong.sid);
            break;

        }
        case "s":
        {
            trace("play skipped");
            this.requireList(sid, "s");
            break;

        }
        case "r":
        {

            this.playList = [];
            this.requireList(sid, "r");
            break;

        }
        case "w":
        {

            this.playList = [];
            this.requireList("", "n");
            break;

        }
        case "u":
        {

            trace("conceled good mark");
            this.playList = [];
            this.requireList(sid, "u");
            break;

        }
        case "b":
        {

            trace("marked bad");
            this.playList = [];
            this.requireList(sid, "b");

        }
        default:
        {
            break;

        }

    }


}
DoubanRadio.prototype.processList = function(listData)
 {
    var his;
    var error;
    var songJson=listData;
    var song;
    var harr;

    trace("new list loaded...");
    error = songJson.err;
    if (error != undefined)
    {
        if (error == "newuser")
        {
            trace("newuser, choose artists.");
            alert("请先告诉我们你的音乐喜好，豆瓣电台会根据你的喜好，来给你推荐歌曲。");
            location.assign(location.host + "/new");

        }
        else if (error == "wronguser")
        {
            alert("你没有使用电台的权限或者没有登陆，请重试");
            location.assign(location.host + "/radio");

        }
        return;

    }
		

    for (var i = 0, il = songJson.song.length; i < il; i++)
    {
        		song = songJson.song[i];
            trace("[" + song.title + " / " + song.artist + " (" + song.sid + ")]");
            this.playList.push({
                sid: song.sid,
                url: song.url,
                artist: song.artist,
                title: song.title,
                picture: song.picture,
                album: song.album,
                albumtitle: song.albumtitle,
                like: song.like,
                aid: song.aid,
                subtype: song.subtype
            });


    }


}
DoubanRadio.prototype.reportPlayed = function(sid) {
    trace("reporting:played");
    this.requireList(sid, "e");

}


var rdo=new DoubanRadio(2);
rdo.requireList('','n');