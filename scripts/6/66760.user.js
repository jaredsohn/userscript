// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "";
	buttons += emoticonButton("001", "http://i45.tinypic.com/347z04o.jpg");
	buttons += emoticonButton("002", "http://i49.tinypic.com/2mhxvyr.jpg");
	buttons += emoticonButton("003", "http://i50.tinypic.com/n1dkjc.jpg");
	buttons += emoticonButton("004", "http://i50.tinypic.com/262sbhu.jpg");
	buttons += emoticonButton("005", "http://i50.tinypic.com/2a0gbj9.jpg");
	buttons += emoticonButton("006", "http://i45.tinypic.com/9jnlh5.jpg");
	buttons += emoticonButton("007", "http://i50.tinypic.com/2i99mw.jpg");
	buttons += emoticonButton("008", "http://i46.tinypic.com/xm75sy.jpg");
	buttons += emoticonButton("009", "http://i45.tinypic.com/2d9sq3r.jpg");
	buttons += emoticonButton("010", "http://i45.tinypic.com/2cne4cx.jpg");
	buttons += emoticonButton("011", "http://i46.tinypic.com/6f2mqc.jpg");
	buttons += emoticonButton("012", "http://i50.tinypic.com/29pf4f5.jpg");
	buttons += emoticonButton("013", "http://i48.tinypic.com/2v92par.jpg");
	buttons += emoticonButton("014", "http://i46.tinypic.com/s3m1zr.jpg");
	buttons += emoticonButton("015", "http://i45.tinypic.com/2hfi650.jpg");
	buttons += emoticonButton("016", "http://i45.tinypic.com/2re2pao.jpg");
	buttons += emoticonButton("017", "http://i46.tinypic.com/1t7f3d.jpg");
	buttons += emoticonButton("018", "http://i50.tinypic.com/2cdbtvk.jpg");
	buttons += emoticonButton("019", "http://i46.tinypic.com/2e21k7n.jpg");
	buttons += emoticonButton("020", "http://i46.tinypic.com/2e6bvo4.jpg");
	buttons += emoticonButton("021", "http://i50.tinypic.com/2wn0i7k.jpg");
	buttons += emoticonButton("022", "http://i45.tinypic.com/t7khfb.jpg");
	buttons += emoticonButton("023", "http://i47.tinypic.com/16c73oz.jpg");
	buttons += emoticonButton("024", "http://i48.tinypic.com/160ugzm.jpg");
	buttons += emoticonButton("025", "http://i48.tinypic.com/2nhdx6e.jpg");
	buttons += emoticonButton("026", "http://i46.tinypic.com/240zqtj.jpg");
	buttons += emoticonButton("027", "http://i46.tinypic.com/m783y8.jpg");
	buttons += emoticonButton("028", "http://i50.tinypic.com/nmjf2v.jpg");
	buttons += emoticonButton("029", "http://i50.tinypic.com/npl2qq.jpg");
	buttons += emoticonButton("030", "http://i47.tinypic.com/14nid0m.jpg");
	buttons += emoticonButton("031", "http://i48.tinypic.com/24o562x.jpg");
	buttons += emoticonButton("032", "http://i45.tinypic.com/2gvig6p.jpg");
	buttons += emoticonButton("033", "http://i49.tinypic.com/2qvw8cn.jpg");
	buttons += emoticonButton("034", "http://i45.tinypic.com/t8lq4n.jpg");
	buttons += emoticonButton("035", "http://i45.tinypic.com/24e0tgp.jpg");
	buttons += emoticonButton("036", "http://i47.tinypic.com/acenio.jpg");
	buttons += emoticonButton("037", "http://i46.tinypic.com/29yi3ag.jpg");
	buttons += emoticonButton("038", "http://i49.tinypic.com/zitaph.jpg");
	buttons += emoticonButton("039", "http://i47.tinypic.com/o8dv2r.jpg");
	buttons += emoticonButton("040", "http://i49.tinypic.com/314cjg7.jpg");
	buttons += emoticonButton("041", "http://i46.tinypic.com/102mihw.jpg");
	buttons += emoticonButton("042", "http://i46.tinypic.com/57iw0.jpg");
	buttons += emoticonButton("042", "http://i45.tinypic.com/29kxueg.jpg");
	buttons += emoticonButton("044", "http://i46.tinypic.com/2vkb62c.jpg");
	buttons += emoticonButton("045", "http://i49.tinypic.com/16gefd.jpg");
	buttons += emoticonButton("046", "http://i50.tinypic.com/2hzh6vq.jpg");
	buttons += emoticonButton("047", "http://i45.tinypic.com/312760o.jpg");
	buttons += emoticonButton("048", "http://i47.tinypic.com/o70iz5.jpg");
	buttons += emoticonButton("049", "http://i48.tinypic.com/29fcjya.jpg");
	buttons += emoticonButton("050", "http://i50.tinypic.com/300y70y.jpg");
	buttons += emoticonButton("051", "http://i45.tinypic.com/2pslmyo.jpg");
	buttons += emoticonButton("052", "http://i46.tinypic.com/10zs9sj.jpg");
	buttons += emoticonButton("053", "http://i45.tinypic.com/35k35nb.jpg");
	buttons += emoticonButton("054", "http://i45.tinypic.com/534m6b.jpg");
	buttons += emoticonButton("055", "http://i48.tinypic.com/etvehj.jpg");
	buttons += emoticonButton("056", "http://i46.tinypic.com/8wcuat.jpg");
	buttons += emoticonButton("057", "http://i49.tinypic.com/29awt51.jpg");
	buttons += emoticonButton("059", "http://i49.tinypic.com/mb66gw.jpg");
	buttons += emoticonButton("060", "http://i48.tinypic.com/312ibzm.jpg");
	buttons += emoticonButton("061", "http://i50.tinypic.com/2itmqsk.jpg");
	buttons += emoticonButton("062", "http://i49.tinypic.com/icsg1d.jpg");
	buttons += emoticonButton("063", "http://i47.tinypic.com/1olpj9.jpg");
	buttons += emoticonButton("064", "http://i47.tinypic.com/1t4oye.jpg");
	buttons += emoticonButton("065", "http://i50.tinypic.com/34xn803.jpg");
	buttons += emoticonButton("066", "http://i48.tinypic.com/sbq22u.jpg");
	buttons += emoticonButton("067", "http://i49.tinypic.com/m80nzc.jpg");
	buttons += emoticonButton("068", "http://i50.tinypic.com/zyaxj9.jpg");
	buttons += emoticonButton("069", "http://i45.tinypic.com/35mgps5.jpg");
	buttons += emoticonButton("070", "http://i50.tinypic.com/33lmhc5.jpg");
	buttons += emoticonButton("071", "http://i47.tinypic.com/2hd0k2a.jpg");
	buttons += emoticonButton("072", "http://i47.tinypic.com/24fk85w.jpg");
	buttons += emoticonButton("073", "http://i45.tinypic.com/243100m.jpg");
	buttons += emoticonButton("074", "http://i47.tinypic.com/uvu60.jpg");
	buttons += emoticonButton("075", "http://i49.tinypic.com/154864y.jpg");
	buttons += emoticonButton("076", "http://i50.tinypic.com/ih3x1e.jpg");
	buttons += emoticonButton("077", "http://i46.tinypic.com/25umfdc.jpg");
	buttons += emoticonButton("078", "http://i47.tinypic.com/24m5fr7.jpg");
	buttons += emoticonButton("079", "http://i45.tinypic.com/x4rk3.jpg");
	buttons += emoticonButton("080", "http://i48.tinypic.com/2i8aqb.jpg");
	buttons += emoticonButton("081", "http://i50.tinypic.com/nex094.jpg");
	buttons += emoticonButton("082", "http://i49.tinypic.com/ay3ked.jpg");
	buttons += emoticonButton("083", "http://i48.tinypic.com/95uc2h.jpg");
	buttons += emoticonButton("084", "http://i46.tinypic.com/ok0bx2.jpg");
	buttons += emoticonButton("085", "http://i49.tinypic.com/2llg0w2.jpg");
	buttons += emoticonButton("086", "http://i45.tinypic.com/10ggt37.jpg");
	buttons += emoticonButton("087", "http://i49.tinypic.com/2hziskk.jpg");
	buttons += emoticonButton("088", "http://i50.tinypic.com/i41tlz.jpg");
	buttons += emoticonButton("089", "http://i45.tinypic.com/2dirho5.jpg");
	buttons += emoticonButton("090", "http://i45.tinypic.com/2qtguwk.jpg");
	buttons += emoticonButton("091", "http://i47.tinypic.com/2cyk1hw.jpg");
	buttons += emoticonButton("092", "http://i50.tinypic.com/e8lv01.jpg");
	buttons += emoticonButton("093", "http://i49.tinypic.com/2d9qwoz.jpg");
	buttons += emoticonButton("094", "http://i48.tinypic.com/2lnes81.jpg");
	buttons += emoticonButton("095", "http://i49.tinypic.com/xpzyh3.jpg");
	buttons += emoticonButton("096", "http://i49.tinypic.com/2q3u6pj.jpg");
	buttons += emoticonButton("097", "http://i49.tinypic.com/zy6c7t.jpg");
	buttons += emoticonButton("098", "http://i47.tinypic.com/2q02jps.jpg");
	buttons += emoticonButton("099", "http://i48.tinypic.com/35aj6vb.jpg");
	buttons += emoticonButton("100", "http://i45.tinypic.com/ouz8gp.jpg");
	buttons += emoticonButton("101", "http://i47.tinypic.com/34ru5fp.jpg");
	buttons += emoticonButton("102", "http://i49.tinypic.com/bg9sns.jpg");
	buttons += emoticonButton("103", "http://i48.tinypic.com/sqtt14.jpg");
	buttons += emoticonButton("104", "http://i50.tinypic.com/34xqdsn.jpg");
	buttons += emoticonButton("105", "http://i47.tinypic.com/29z4g7n.jpg");
	buttons += emoticonButton("106", "http://i48.tinypic.com/1z6fpyx.jpg");
	buttons += emoticonButton("107", "http://i49.tinypic.com/2w34ahi.jpg");
	buttons += emoticonButton("108", "http://i46.tinypic.com/207qhoo.jpg");
	buttons += emoticonButton("109", "http://i47.tinypic.com/2v9dr8k.jpg");
	buttons += emoticonButton("110", "http://i46.tinypic.com/vzhc03.jpg");
	buttons += emoticonButton("111", "http://i45.tinypic.com/2wr2ibn.jpg");
	buttons += emoticonButton("112", "http://i48.tinypic.com/2r7rqes.jpg");
	buttons += emoticonButton("113", "http://i46.tinypic.com/2yxhn45.jpg");
	buttons += emoticonButton("114", "http://i49.tinypic.com/o8tqok.jpg");
	buttons += emoticonButton("115", "http://i47.tinypic.com/25psjrc.jpg");
	buttons += emoticonButton("116", "http://i48.tinypic.com/2h6cdc9.jpg");
	buttons += emoticonButton("117", "http://i50.tinypic.com/350kn6a.jpg");
	buttons += emoticonButton("118", "http://i48.tinypic.com/2nq2xt.jpg");
	buttons += emoticonButton("119", "http://i48.tinypic.com/oks6qh.jpg");
	buttons += emoticonButton("120", "http://i47.tinypic.com/2rm06fk.jpg");
	buttons += emoticonButton("121", "http://i45.tinypic.com/dbpilg.jpg");
	buttons += emoticonButton("122", "http://i46.tinypic.com/rkphmr.jpg");
	buttons += emoticonButton("123", "http://i46.tinypic.com/5n88lh.jpg");
	buttons += emoticonButton("124", "http://i46.tinypic.com/2czx08w.jpg");
	buttons += emoticonButton("125", "http://i45.tinypic.com/20870jk.jpg");
	buttons += emoticonButton("126", "http://i46.tinypic.com/2ue2wef.jpg");
	buttons += emoticonButton("127", "http://i49.tinypic.com/hx0zdl.jpg");
	buttons += emoticonButton("128", "http://i48.tinypic.com/2zfsyhe.jpg");
	buttons += emoticonButton("129", "http://i50.tinypic.com/2qnpicg.jpg");
	buttons += emoticonButton("130", "http://i48.tinypic.com/20qxlxu.jpg");
	buttons += emoticonButton("131", "http://i50.tinypic.com/s6q5c1.jpg");
	buttons += emoticonButton("132", "http://i47.tinypic.com/sfxrhi.jpg");
	buttons += emoticonButton("133", "http://i49.tinypic.com/ok3l20.jpg");
	buttons += emoticonButton("134", "http://i49.tinypic.com/n6dd10.jpg");
	buttons += emoticonButton("135", "http://i46.tinypic.com/2wf31g5.jpg");
	buttons += emoticonButton("136", "http://i45.tinypic.com/2iu920.jpg");
	buttons += emoticonButton("137", "http://i50.tinypic.com/2820sg5.jpg");
	buttons += emoticonButton("138", "http://i45.tinypic.com/in7uig.jpg");
	buttons += emoticonButton("139", "http://i47.tinypic.com/105nq8m.jpg");
	buttons += emoticonButton("140", "http://i50.tinypic.com/2vvuhzl.jpg");
	buttons += emoticonButton("141", "http://i46.tinypic.com/35iy4ug.jpg");
	buttons += emoticonButton("142", "http://i48.tinypic.com/2j61f94.jpg");
	buttons += emoticonButton("143", "http://i49.tinypic.com/2ldeidd.jpg");
	buttons += emoticonButton("144", "http://i47.tinypic.com/9gy8vt.jpg");
	buttons += emoticonButton("145", "http://i50.tinypic.com/kb6scw.jpg");
	buttons += emoticonButton("146", "http://i46.tinypic.com/i1dxkx.jpg");
	buttons += emoticonButton("147", "http://i50.tinypic.com/118pxjc.jpg");
	buttons += emoticonButton("148", "http://i49.tinypic.com/r8fd3s.jpg");
	buttons += emoticonButton("149", "http://i46.tinypic.com/313hqol.jpg");
	buttons += emoticonButton("150", "http://i46.tinypic.com/34fyal0.jpg");
	buttons += emoticonButton("151", "http://i45.tinypic.com/2nu2mpw.jpg");
	buttons += emoticonButton("152", "http://i46.tinypic.com/2wrn1i8.jpg");
	buttons += emoticonButton("153", "http://i47.tinypic.com/t97fxu.jpg");
	buttons += emoticonButton("154", "http://i50.tinypic.com/2mpndsk.jpg");
	buttons += emoticonButton("155", "http://i46.tinypic.com/2dkzj3b.jpg");
	buttons += emoticonButton("156", "http://i45.tinypic.com/kdnc07.jpg");
	buttons += emoticonButton("157", "http://i46.tinypic.com/6jh946.jpg");
	buttons += emoticonButton("158", "http://i46.tinypic.com/2jayemt.jpg");
	buttons += emoticonButton("159", "http://i50.tinypic.com/9qxt6w.jpg");
	buttons += emoticonButton("160", "http://i49.tinypic.com/65wboh.jpg");
	buttons += emoticonButton("161", "http://i46.tinypic.com/esooar.jpg");
	buttons += emoticonButton("162", "http://i47.tinypic.com/idhjj6.jpg");
	buttons += emoticonButton("163", "http://i49.tinypic.com/219dpx3.jpg");
	buttons += emoticonButton("164", "http://i50.tinypic.com/jglkdj.jpg");
	buttons += emoticonButton("165", "http://i50.tinypic.com/15x8ln8.jpg");
	buttons += emoticonButton("166", "http://i46.tinypic.com/2uft4rc.jpg");
	buttons += emoticonButton("167", "http://i49.tinypic.com/zmmno6.jpg");
	buttons += emoticonButton("168", "http://i46.tinypic.com/r9fnf4.jpg");
	buttons += emoticonButton("169", "http://i46.tinypic.com/2jg8mx0.jpg");
	buttons += emoticonButton("170", "http://i50.tinypic.com/154eeja.jpg");
	buttons += emoticonButton("171", "http://i49.tinypic.com/5bobqt.jpg");
	buttons += emoticonButton("172", "http://i45.tinypic.com/2n70ciu.jpg");
	buttons += emoticonButton("173", "http://i48.tinypic.com/s623x1.jpg");
	buttons += emoticonButton("174", "http://i50.tinypic.com/2cf6sus.jpg");
	buttons += emoticonButton("175", "http://i50.tinypic.com/5yybyt.jpg");
	buttons += emoticonButton("176", "http://i47.tinypic.com/24zym4w.jpg");
	buttons += emoticonButton("177", "http://i45.tinypic.com/20zdz43.jpg");
	buttons += emoticonButton("178", "http://i50.tinypic.com/mj5to4.jpg");
	buttons += emoticonButton("179", "http://i45.tinypic.com/124wvu1.jpg");
	buttons += emoticonButton("180", "http://i50.tinypic.com/2dlj042.jpg");
	buttons += emoticonButton("181", "http://i46.tinypic.com/2dsfh1j.jpg");
	buttons += emoticonButton("182", "http://i45.tinypic.com/5b9pp0.jpg");
	buttons += emoticonButton("183", "http://i46.tinypic.com/257di01.jpg");
	buttons += emoticonButton("184", "http://i47.tinypic.com/2dt5fys.jpg");
	buttons += emoticonButton("185", "http://i47.tinypic.com/am6p4.jpg");
	buttons += emoticonButton("186", "http://i50.tinypic.com/14wyio0.jpg");
	buttons += emoticonButton("187", "http://i49.tinypic.com/2n8xw6r.jpg");
	buttons += emoticonButton("188", "http://i45.tinypic.com/210yixy.jpg");
	buttons += emoticonButton("189", "http://i47.tinypic.com/504bbm.jpg");
	buttons += emoticonButton("190", "http://i47.tinypic.com/2aj430h.jpg");
	buttons += emoticonButton("191", "http://i49.tinypic.com/ab2mom.jpg");
	buttons += emoticonButton("192", "http://i49.tinypic.com/2cne8eu.jpg");
	buttons += emoticonButton("193", "http://i45.tinypic.com/10pshhc.jpg");
	buttons += emoticonButton("194", "http://i48.tinypic.com/11l6gzq.jpg");
	buttons += emoticonButton("195", "http://i49.tinypic.com/5cgi6w.jpg");
	buttons += emoticonButton("196", "http://i46.tinypic.com/t6qo2u.jpg");
	buttons += emoticonButton("197", "http://i47.tinypic.com/6qaypv.jpg");
	buttons += emoticonButton("198", "http://i48.tinypic.com/dh4xux.jpg");
	buttons += emoticonButton("199", "http://i48.tinypic.com/33o02oo.jpg");
	buttons += emoticonButton("200", "http://i45.tinypic.com/1zzhx5v.jpg");
	buttons += emoticonButton("201", "http://i46.tinypic.com/68ajpu.jpg");
	buttons += emoticonButton("202", "http://i45.tinypic.com/21c5pog.jpg");
	buttons += emoticonButton("203", "http://i50.tinypic.com/29e6fcn.jpg");
	buttons += emoticonButton("204", "http://i45.tinypic.com/f4gydc.jpg");
	buttons += emoticonButton("205", "http://i46.tinypic.com/345lshg.jpg");
	buttons += emoticonButton("206", "http://i49.tinypic.com/21d4lev.jpg");
	buttons += emoticonButton("207", "http://i45.tinypic.com/30wa6ma.jpg");
	buttons += emoticonButton("208", "http://i45.tinypic.com/ae47s8.jpg");
	buttons += emoticonButton("209", "http://i48.tinypic.com/9um7mx.jpg");
	buttons += emoticonButton("210", "http://i46.tinypic.com/2evvv3s.jpg");
	buttons += emoticonButton("211", "http://i47.tinypic.com/28iq7b8.jpg");
	buttons += emoticonButton("212", "http://i50.tinypic.com/5yx0rr.jpg");
	buttons += emoticonButton("213", "http://i45.tinypic.com/aexy4j.jpg");
	buttons += emoticonButton("214", "http://i47.tinypic.com/2f0byu9.jpg");
	buttons += emoticonButton("215", "http://i50.tinypic.com/4lruo5.jpg");
	buttons += emoticonButton("216", "http://i45.tinypic.com/28jds2t.jpg");
	buttons += emoticonButton("217", "http://i48.tinypic.com/ie0554.jpg");
	buttons += emoticonButton("218", "http://i45.tinypic.com/1zwg00o.jpg");
	buttons += emoticonButton("219", "http://i50.tinypic.com/2ci70o3.jpg");
	buttons += emoticonButton("220", "http://i47.tinypic.com/2zgg9pk.jpg");
	buttons += emoticonButton("221", "http://i46.tinypic.com/vqjecj.jpg");
	buttons += emoticonButton("222", "http://i46.tinypic.com/15s8lyo.jpg");
	buttons += emoticonButton("223", "http://i46.tinypic.com/dcq4ag.jpg");
	buttons += emoticonButton("224", "http://i47.tinypic.com/2m31iys.jpg");
	buttons += emoticonButton("225", "http://i50.tinypic.com/2z7rkn9.jpg");
	buttons += emoticonButton("226", "http://i49.tinypic.com/2z5r8s2.jpg");
	buttons += emoticonButton("227", "http://i46.tinypic.com/1ex9n4.jpg");
	buttons += emoticonButton("228", "http://i47.tinypic.com/k2l6ko.jpg");
	buttons += emoticonButton("229", "http://i50.tinypic.com/2vnfm1s.jpg");
	buttons += emoticonButton("230", "http://i49.tinypic.com/67pqqc.jpg");
	buttons += emoticonButton("231", "http://i50.tinypic.com/eld0xw.jpg");
	buttons += emoticonButton("232", "http://i49.tinypic.com/2eexuzr.jpg");
	buttons += emoticonButton("233", "http://i45.tinypic.com/2uzthdd.jpg");
	buttons += emoticonButton("234", "http://i50.tinypic.com/t4vaxh.jpg");
	buttons += emoticonButton("235", "http://i47.tinypic.com/29uw32e.jpg");
	buttons += emoticonButton("236", "http://i47.tinypic.com/j953y0.jpg");
	buttons += emoticonButton("237", "http://i46.tinypic.com/11snno2.jpg");
	buttons += emoticonButton("238", "http://i50.tinypic.com/2ed4eb7.jpg");
	buttons += emoticonButton("239", "http://i45.tinypic.com/66vwo0.jpg");
	buttons += emoticonButton("240", "http://i49.tinypic.com/t8vh2s.jpg");
	buttons += emoticonButton("241", "http://i49.tinypic.com/ibm81d.jpg");
	buttons += emoticonButton("242", "http://i50.tinypic.com/316vu6x.jpg");
	buttons += emoticonButton("243", "http://i46.tinypic.com/29yktnb.jpg");
	buttons += emoticonButton("244", "http://i45.tinypic.com/21omr6.jpg");
	buttons += emoticonButton("245", "http://i48.tinypic.com/34ecfba.jpg");
	buttons += emoticonButton("246", "http://i48.tinypic.com/123uo1u.jpg");
	buttons += emoticonButton("247", "http://i50.tinypic.com/smt4r9.jpg");
	buttons += emoticonButton("248", "http://i50.tinypic.com/2v3h1xe.jpg");
	buttons += emoticonButton("249", "http://i46.tinypic.com/ipo2uc.jpg");
	buttons += emoticonButton("250", "http://i50.tinypic.com/160wmlt.jpg");
	buttons += emoticonButton("251", "http://i47.tinypic.com/2ibda3d.jpg");
	buttons += emoticonButton("252", "http://i50.tinypic.com/2rdas8i.jpg");
	buttons += emoticonButton("253", "http://i48.tinypic.com/9ub5hs.jpg");
	buttons += emoticonButton("254", "http://i49.tinypic.com/fmhobo.jpg");
	buttons += emoticonButton("255", "http://i47.tinypic.com/vyb9sl.jpg");
	buttons += emoticonButton("256", "http://i46.tinypic.com/23h2h35.jpg");
	buttons += emoticonButton("257", "http://i49.tinypic.com/zocg2o.jpg");
	buttons += emoticonButton("258", "http://i45.tinypic.com/10nguus.jpg");
	buttons += emoticonButton("259", "http://i49.tinypic.com/2j5b382.jpg");
	buttons += emoticonButton("260", "http://i48.tinypic.com/eascy9.jpg");
	buttons += emoticonButton("261", "http://i50.tinypic.com/10i9nat.jpg");
	buttons += emoticonButton("262", "http://i45.tinypic.com/30nb1hj.jpg");
	buttons += emoticonButton("263", "http://i50.tinypic.com/29ypoxg.jpg");
	buttons += emoticonButton("264", "http://i47.tinypic.com/2468fol.jpg");
	buttons += emoticonButton("265", "http://i49.tinypic.com/2hpojl4.jpg");
	buttons += emoticonButton("266", "http://i50.tinypic.com/2e3287l.jpg");
	buttons += emoticonButton("267", "http://i49.tinypic.com/2621mza.jpg");
	buttons += emoticonButton("268", "http://i50.tinypic.com/34jdmxt.jpg");
	buttons += emoticonButton("269", "http://i49.tinypic.com/1196v54.jpg");
	buttons += emoticonButton("270", "http://i49.tinypic.com/28u1fkl.jpg");
	buttons += emoticonButton("271", "http://i50.tinypic.com/24ou71e.jpg");
	buttons += emoticonButton("272", "http://i48.tinypic.com/5l9zd1.jpg");
	buttons += emoticonButton("273", "http://i49.tinypic.com/23jiquq.jpg");
	buttons += emoticonButton("274", "http://i50.tinypic.com/25a3slh.jpg");
	buttons += emoticonButton("275", "http://i45.tinypic.com/2e3a538.jpg");
	buttons += emoticonButton("276", "http://i47.tinypic.com/szv2op.jpg");
	buttons += emoticonButton("277", "http://i46.tinypic.com/soqolc.jpg");
	buttons += emoticonButton("278", "http://i48.tinypic.com/2yo4r9j.jpg");
	buttons += emoticonButton("279", "http://i49.tinypic.com/2wmdp92.jpg");
	buttons += emoticonButton("280", "http://i45.tinypic.com/152kso2.jpg");
	buttons += emoticonButton("281", "http://i48.tinypic.com/2jewpwg.jpg");
	buttons += emoticonButton("282", "http://i46.tinypic.com/11wcwlj.jpg");
	buttons += emoticonButton("283", "http://i47.tinypic.com/2eppwle.jpg");
	buttons += emoticonButton("284", "http://i50.tinypic.com/34pdisg.jpg");
	buttons += emoticonButton("285", "http://i49.tinypic.com/2lc5g7.jpg");
	buttons += emoticonButton("286", "http://i48.tinypic.com/vpdp1l.jpg");
	buttons += emoticonButton("287", "http://i50.tinypic.com/behc2e.jpg");
	buttons += emoticonButton("288", "http://i46.tinypic.com/ncdqmq.jpg");
	buttons += emoticonButton("289", "http://i50.tinypic.com/op02gp.jpg");
	buttons += emoticonButton("290", "http://i49.tinypic.com/scgzgk.jpg");
	buttons += emoticonButton("291", "http://i49.tinypic.com/6dwk7n.jpg");
	buttons += emoticonButton("292", "http://i47.tinypic.com/2r2c2s5.jpg");
	buttons += emoticonButton("293", "http://i49.tinypic.com/28an7s1.jpg");
	buttons += emoticonButton("294", "http://i45.tinypic.com/25s8vtf.jpg");
	buttons += emoticonButton("295", "http://i48.tinypic.com/9rki87.jpg");
	buttons += emoticonButton("296", "http://i50.tinypic.com/2556gls.jpg");
	buttons += emoticonButton("297", "http://i47.tinypic.com/ih6x7a.jpg");
	buttons += emoticonButton("298", "http://i47.tinypic.com/5v18yh.jpg");
	buttons += emoticonButton("299", "http://i50.tinypic.com/30sdaap.jpg");
	buttons += emoticonButton("300", "http://i45.tinypic.com/kd1owo.jpg");
	buttons += emoticonButton("301", "http://i50.tinypic.com/3340iz6.jpg");
	buttons += emoticonButton("302", "http://i50.tinypic.com/6tcps6.jpg");
	buttons += emoticonButton("303", "http://i48.tinypic.com/23ii7fs.jpg");
	buttons += emoticonButton("304", "http://i48.tinypic.com/1551k4j.jpg");
	buttons += emoticonButton("305", "http://i49.tinypic.com/17df15.jpg");
	buttons += emoticonButton("306", "http://i49.tinypic.com/2q99yk1.jpg");
	buttons += emoticonButton("307", "http://i46.tinypic.com/2iblyl5.jpg");
	buttons += emoticonButton("308", "http://i46.tinypic.com/2r43juw.jpg");
	buttons += emoticonButton("309", "http://i50.tinypic.com/5weeix.jpg");
	buttons += emoticonButton("310", "http://i47.tinypic.com/63xfno.jpg");

			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  src=\\\""+url+"\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);