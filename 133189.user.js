// ==UserScript==
// @name           acfun
// @namespace      test
// ==/UserScript==


var elems = document.getElementsByTagName("embed");
var supportVideo = new Array();
supportVideo[0] = new RegExp("http://www.tudou.com/v/[^/]+/[^/]+/v.swf");
supportVideo[1] = new RegExp("http://player.youku.com/player.php/sid/[^/]+/v.swf");
supportVideo[2] = new RegExp("http://www.tudou.com/v/[^/]+/v.swf");
supportVideo[3] = new RegExp("http://you.video.sina.com.cn/api/sinawebApi/outplay.php[^\"]+");
supportVideo[4] = new RegExp("http://player.youku.com/player.php/Type/Folder/Fid/[^/]+/[^/]+/[^/]+/[^/]+/[^/]+/sid/[^/]+/v.swf");

var tudouHost = "http://www.tudou.com/v/";
var param = new RegExp("[^/]+");
var param2 = new RegExp("sid/[^/]+");

var pmbilibili = new Array();
pmbilibili[0] = new RegExp("vid=[^\"]+");
pmbilibili[1] = new RegExp("ykid=[^\"]+");
pmbilibili[2] = new RegExp("uid=[^\"]+");
pmbilibili[3] = new RegExp("qid=[^\"]+");

var bReplace = 0;

var supportUrl = new Array();
supportUrl[0] = new RegExp("v.youku.com");
supportUrl[1] = new RegExp("video.sina.com.cn");
supportUrl[2] = new RegExp("tudou.com");
supportUrl[3] = new RegExp("bilibili.tv");
var bUrl = -1;

for(i=0; i<supportUrl.length; i++)
{
    if(supportUrl[i].test(document.location.href))
    {    
        bUrl = i;
        break;
    }
}
if(bUrl != -1)
{
    if(bUrl == 0)
    {
        if(new String(videoId2).length != 0)
        {
        document.location = "http://static.acfun.tv/player/ACFlashPlayer.artemis.20120422.swf?id=" + new String(videoId2) + "&type2=youku";
        }
    }
    else if(bUrl == 1)
    {
        if(new String($SCOPE.video.vid).length != 0)
        {
            document.location = "http://static.acfun.tv/player/ACFlashPlayer.artemis.20120422.swf?id=" + new String($SCOPE.video.vid) + "&type=video";
        }
    }
    else if(bUrl == 2)
    {
        if(new String(iid).length != 0)
        {
            document.location = "http://static.acfun.tv/player/ACFlashPlayer.artemis.20120422.swf?id=" + new String(iid) + "&type2=tudou";
        }
    }
    else if(bUrl == 3)
    {
        for(i =0; i < elems.length; i ++)
        {
            for(j=0; j<pmbilibili.length; j++)
            {
                if(pmbilibili[j].test(elems[i].outerHTML))
                {
                    if(j == 0)
                    {
                        document.location = "http://static.acfun.tv/player/ACFlashPlayer.artemis.20120422.swf?id=" + new String(pmbilibili[j].exec(elems[i].outerHTML)).replace("vid=","") + "&type=video";
                    }
                    else if(j == 1)
                    {
                        document.location = "http://static.acfun.tv/player/ACFlashPlayer.artemis.20120422.swf?id=" + new String(pmbilibili[j].exec(elems[i].outerHTML)).replace("ykid=","") + "&type2=youku";
                    }
                    else if(j == 2)
                    {
                        document.location = "http://static.acfun.tv/player/ACFlashPlayer.artemis.20120422.swf?id=" + new String(pmbilibili[j].exec(elems[i].outerHTML)).replace("uid=","") + "&type2=tudou";
                    }
                    else if(j == 3)
                    {
                        document.location = "http://static.acfun.tv/player/ACFlashPlayer.artemis.20120422.swf?id=" + new String(pmbilibili[j].exec(elems[i].outerHTML)).replace("qid=","") + "&type2=qq";
                    }
                }
            }
        }
    }
}
else
{

do
{

for(i=0; i<elems.length; i++)
{
    bReplace = 0;
    for(j=0;j<supportVideo.length;j++)
    {
        if(supportVideo[j].test(elems[i].outerHTML))
        {
            if(j == 0 || j == 2)
            {
                var vlink = new String(supportVideo[j].exec(elems[i].outerHTML));
                var vurl = "<input type=button onclick='window.open(\"http://www.tudou.com/programs/view/" + param.exec(vlink.replace(tudouHost,"")) + "/\")' value='播放'/>";
                elems[i].outerHTML = vurl;
                bReplace = 1;
                break;
            }
            else if(j == 1 || j == 4)
            {
                var vlink = new String(supportVideo[j].exec(elems[i].outerHTML));
                var vlink2 = new String(param2.exec(vlink));
                var vurl = "<input type=button onclick='window.open(\"http://static.acfun.tv/player/ACFlashPlayer.artemis.20120422.swf?id=" + param.exec(vlink2.replace("sid/","")) + "&type2=youku\")' value='播放'/>";
                elems[i].outerHTML = vurl;
                bReplace = 1;
                break;
            }
            else if(j == 3)
            {
            }
        }
    }

    if(bReplace == 1)
        break;
}
}while(bReplace == 1)
}
