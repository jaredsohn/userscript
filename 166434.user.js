// ==UserScript==
// @id             getBaiduAlbum
// @name           Random Tail Image
// @version        1.0
// @namespace      simon
// @author         Simon Chan
// @description    Use a random image in an album as tail.
// @include        http://tieba.baidu.com/*
// @exclude	       http://tieba.baidu.com/tb/*
// @run-at         document-end
// ==/UserScript==

// Tail code/尾巴代码 unsafeWindow.getBaiduAlbumGetRandomPicture(); "<img changedsize='true' pic_type='0' class='BDE_Image' src='http://imgsrc.baidu.com/forum/w%3D580/sign=6ca77dcee5dde711e7d243fe97edcef4/b03533fa828ba61e111605e44134970a314e5905.jpg' height='11' width='560'><br><img changedsize='true' pic_type='0' class='BDE_Image' src='" + unsafeWindow.getBaiduAlbumRandomPictureSrc + "' height='" + unsafeWindow.getBaiduAlbumRandomPictureHeight + "' width='" + unsafeWindow.getBaiduAlbumRandomPictureHeight + "'>"

var albumId = localStorage.getItem("getBaiduAlbumId");
var allPictureList = localStorage.getItem("getBaiduAlbumDatabase");
if (allPictureList)
    allPictureList = JSON.parse(allPictureList);
else {
    allPictureList = [];
    refreshDatabase();
}

function refreshDatabase() {
    if (albumId) {
        GM_xmlhttpRequest({
            url: "http://xiangce.baidu.com/picture/album/list/" + albumId + "/?format=json&size=1&pn=0",
            onload: function (request) {
                var data = JSON.parse(request.responseText)["data"];
                if (data) {
                    var imgCount = parseInt(data["picture_num"]);
                    function getAlbum(sign) {
                        GM_xmlhttpRequest({
                            url: "http://xiangce.baidu.com/picture/single/list/" + sign + "?type=album&size=100",
                            onload: function (request) {
                                var pictureList = JSON.parse(request.responseText)["data"]["picture_list"];
                                allPictureList = allPictureList.concat(pictureList);
                                if (allPictureList.length < imgCount - 2)
                                    getAlbum(pictureList[pictureList.length - 1]["picture_sign"]);
                                else
                                    localStorage.setItem("getBaiduAlbumDatabase", JSON.stringify(allPictureList));
                            }
                        });
                    }
                    getAlbum(data["picture_list"][0]["picture_sign"]);
                }
                else
                    alert("Wrong album ID!");
            }
        });
    }
    else
        alert("Please set an album ID!");
}

unsafeWindow.getBaiduAlbumRefreshDatabase = function () {
    setTimeout(function() {
        refreshDatabase();
    }, 0);
}

unsafeWindow.getBaiduAlbumSetAlbumId = function (id) {
    setTimeout(function() {
        albumId = id;
        localStorage.setItem("getBaiduAlbumId", id);
        refreshDatabase();
    }, 0);
};

unsafeWindow.getBaiduAlbumGetRandomPicture = function () {
    var randomPicture = allPictureList[Math.floor(Math.random() * allPictureList.length)];
    unsafeWindow.getBaiduAlbumRandomPictureSrc = randomPicture["img_src_ac"];
    unsafeWindow.getBaiduAlbumRandomPictureWidth = randomPicture["picture_width"];
    unsafeWindow.getBaiduAlbumRandomPictureHeight = randomPicture["picture_height"];
};