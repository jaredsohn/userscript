// ==UserScript==
// @name          X TuKu.cc
// @namespace     YuJianrong@GMail.com
// @description	  将在线漫画站cc图库在线漫画转化为批量下载链接页面
// @include       http://www.tuku.cc/comic/*/*/
// ==/UserScript==

function PostProcess()
{
    var ImgUrls=new Array();
    var ImgUrlsDownload=new Array();
    with(unsafeWindow)
    {
        if ((document.evaluate("//script[@src='/Js/Vol4.js']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength != 0)
            for (var current=1 ; current <= total; ++current)
            {
                var current3 ;
                var imgsrc, imgsrc3;
                var imgl, imgl3;
                //if(current2 > total){current2 = total;}
                current3 = current*18527
                    imgsrc = current.toString();
                imgsrc3 = current3.toString();
                imgl = imgsrc.length;
                imgl3 = imgsrc3.length;
                for(var i=1;i<=(tpf+1-imgl);++i)
                    imgsrc = '0' + imgsrc;
                for(var i=1;i<=(tpf+1-imgl3);++i)
                    imgsrc3 = '0' + imgsrc3;
                //volpic + imgsrc3 + imgsrc + '.jpg';
                ImgUrls.push( volpic + imgsrc3 + imgsrc + '.jpg' );
                ImgUrlsDownload.push( volpic + imgsrc3 + imgsrc + '.jpg?/' + imgsrc+'.jpg' );
            }
        else if ((document.evaluate("//script[@src='/Js/Vol3.js']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength != 0)
            for (var current=1 ; current <= total; ++current)
            {
                var current3, current5 ;
                var imgsrc, imgsrc3, imgsrc5;
                var imgl, imgl3, imgl5;
                current3 = current-1;
                current5 = current+1;
                imgsrc = current.toString();
                imgsrc3 = current3.toString();
                imgsrc5 = current5.toString();
                imgl = imgsrc.length;
                imgl3 = imgsrc3.length;
                imgl5 = imgsrc5.length;
                for(i=1;i<=(tpf+1-imgl);i++)
                    imgsrc = '0' + imgsrc;
                for(i=1;i<=(tpf+1-imgl3);i++)
                    imgsrc3 = '0' + imgsrc3;
                for(i=1;i<=(tpf+1-imgl5);i++)
                    imgsrc5 = '0' + imgsrc5;
                var src = volpic+ imgsrc5 + imgsrc3 + imgsrc + '.jpg';
                ImgUrls.push( src );
                ImgUrlsDownload.push( src+ '?/' + imgsrc + '.jpg' );
            }
        else if ((document.evaluate("//script[@src='/Js/Vol2.js']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength != 0)
            for (var current=1 ; current <= total; ++current)
            {
                var imgsrc;
                var imgl;
                imgsrc = current.toString();
                imgl = imgsrc.length;
                for(i=1;i<=(tpf+1-imgl);i++)
                    imgsrc = '0' + imgsrc;
                document.getElementById('Img').src = volpic + imgsrc + '.jpg';
                ImgUrls.push( volpic + imgsrc + '.jpg' );
                ImgUrlsDownload.push( volpic + imgsrc + '.jpg' );
            }
        else alert("not found related methods, site updated?");
        
    }
    for (var i=0 ; i<ImgUrls.length; ++i)
        document.writeln('<a href="' + ImgUrlsDownload[i] + '"> ' + ImgUrls[i] + "</a><br>");

}

PostProcess();
