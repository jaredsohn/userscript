// ==UserScript==
// @name        BaiduYun-ShowAlbum_and_Artist
// @include     http://pan.baidu.com/share/link?*
// @include		http://pan.baidu.com/s/*
// @version     2014.3.19
// @description 度盘音乐文件显示专辑名和歌手
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// ==/UserScript==

var $=unsafeWindow.$;

//构造函数
var song = function(albumTitle,artistName,trackTitle)
{
	this.albumTitle = albumTitle;	//专辑名
	this.artistName = artistName;	//歌手
	this.trackTitle = trackTitle;	//分轨名称
	//显示歌曲信息
	this.setUi = function()
	{
		$('.slide-show-other-cns').append('<span style="float:rignt">\
			<a target="_blank" href="http://cn.last.fm/music/'+this.artistName+'" title="歌手">'+this.artistName+'\
			</a href=""> - [<a target="_blank" href="http://www.baidu.com/s?wd=site:pan.baidu.com+'+this.albumTitle+'" title="专辑">'+this.albumTitle+'</a href="">] \
			<a target="_blank" href="http://www.baidu.com/s?wd=site:pan.baidu.com+'+this.trackTitle+'" title="歌名">'+this.trackTitle+'</a href="">\
			</span>');
	}
}

var curSong = new song(unsafeWindow.FileUtils.albumTitle,
					unsafeWindow.FileUtils.artistName,
					unsafeWindow.FileUtils.trackTitle);
if(curSong.albumTitle)
	curSong.setUi();