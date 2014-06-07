// ==UserScript==
// @name           Auto.Lepra Car Pics
// @namespace      chez
// @include        http://auto.leprosorium.ru/comments/*
// ==/UserScript==

var cars = {
	15084 : 'http://photofile.ru/photo/shiten/3621055/xlarge/80100991.jpg',
	18178 : 'http://www.e1.ru/fun/photo/view_pic.php/p/1095098c5c9d1e42b62ebe522ecb4f0e/view.pic',
	5487 : 'http://pit.dirty.ru/lepro/159/2008/11/20/5487-111020-61898f1a5b29c5d95715fade6c13bd83.jpg',
	7847 : 'http://pit.dirty.ru/lepro/159/2008/11/20/7847-121218-74eb0dadaad8dd1687ebee2062bc36c7.jpg',
	21786 : 'http://photofile.ru/photo/eblancer/95209728/xlarge/102508131.jpg',
	18048 : 'http://img.leprosorium.com/851139',
	16441 : 'http://www.ljplus.ru/img4/x/m/xman_mf/0_2f_3ac6a2a2_L.jpeg',
	3935 : 'http://www.japnuts.com/4x4section/4X4_deal/Rav4_001_small.jpg',
	14006 : 'http://pit.dirty.ru/lepro/159/2008/11/20/14006-213257-67edae8e5e0db50601e41633b3c13a17.jpg',
	21296 : 'http://pit.dirty.ru/lepro/159/2008/11/20/21296-225704-b963e3141ef985b2c7be5f0e7599537f.jpg',
	10075 : 'http://maximaf.ru/pic/2/yk1bsjxyapahqspb.jpg',
	13793 : 'http://i.ynblpb.com/u/2009/12/1260977933.jpeg',
	16634 : 'http://img.leprosorium.com/39228',
	10130 : 'http://img21.imageshack.us/img21/5660/imprezatz6.jpg',
	8261 : 'http://cs1218.vkontakte.ru/u838945/34705909/x_84ce293c.jpg',
	14505 : 'http://www.seat-club.ru/photoplog/images/1/large/1_toledo3.jpg',
	14269 : 'http://pit.dirty.ru/lepro/159/2008/11/23/14269-180650-ac33f06b89b2d4bed7affcdb0c7c7e6a.jpg',
	18763 : 'http://img.leprosorium.com/39935',
	8177 : 'http://pit.dirty.ru/lepro/159/2008/11/23/8177-211337-82fb7635a5214d110bbf0cd174eb9efa.jpg',
	20848 : 'http://pit.dirty.ru/lepro/159/2008/11/24/20848-003002-684e8bd78eb49a89e3706d409a4a60ec.jpg',
	8703 : 'http://photos.krononsolutions.com/1/CARPRT84-FJHG-98UY-5KBC-DJFHG91SGDY7/1YVGF22C815200350/cwhhi_640.jpg',
	21531 : 'http://www.gkford.co.uk/graphics/vehicles/nl56emf.jpg',
	21181 : 'http://pit.dirty.ru/lepro/159/2008/11/24/21181-133015-62679878e5bf33e3d5e55ff2ad70a96a.jpg',
	9286 : 'http://pit.dirty.ru/lepro/159/2008/11/24/9286-172526-d51c02ad2053ce95dbcd506fbc2e5c20.jpg',
	5692 : 'http://pit.dirty.ru/lepro/159/2008/11/24/5692-205528-59c3bf0050786e448221f9a0b0cb7f09.jpg',
	19744 : 'http://photofile.ru/photo/realgonza/3054226/xlarge/63646555.jpg',
	16503 : 'http://foto.z-off.ru/honeym/images/img_5234.jpg',
	6282 : 'http://sun.org.ua/lj/img/25112008-carr.jpg',
	19685 : 'http://pit.dirty.ru/lepro/159/2008/11/25/19685-121114-4563ad4f829299adc65737cc51fb10d9.jpg',
	5922 : 'http://pit.dirty.ru/lepro/159/2008/11/25/5922-121849-3288f88fb126958df23ed35d8d42b097.jpg',
	14680 : 'http://shaidakoff.com/kia_1.jpg',
	18702 : 'http://img.leprosorium.com/591915',
	911 : 'http://pit.dirty.ru/lepro/159/2008/11/25/911-230430-d78fcf560c6d9ad729e1781ebe193c3c.jpg',
	16626 : 'http://cs1537.vkontakte.ru/u1671535/36146711/x_4675b7af.jpg',
	9614 : 'http://pit.dirty.ru/lepro/159/2008/11/26/9614-011625-25d6757434ba99a064a06f3997301c64.jpg',
	10975 : 'http://www.legiogravis.ru/files/P1010586_r.jpg',
	11574 : 'http://img.leprosorium.com/863176',
	10763 : 'http://img138.imageshack.us/img138/3692/1412071236qj6.jpg',
	18580 : 'http://i238.photobucket.com/albums/ff125/zigzag_ns/IMG_3761_600_450-1.jpg',
	13521 : 'http://pit.dirty.ru/lepro/159/2008/11/26/13521-164426-7be2ad3e97706956c07aaf757f5396a1.jpg',
	8763 : 'http://img341.imageshack.us/img341/5612/235bc305ws1.jpg',
	1258 : 'http://img268.imageshack.us/img268/6153/accentfrozen.png',
	20389 : 'http://img.ria.ua/photos/auto/photo/144/14442/1444263/1444263f.jpg',
	9837 : 'http://pit.dirty.ru/lepro/159/2008/11/27/9837-021929-9107435b6de8cd02a50b5bdf5c84b939.jpg',
	12206 : 'http://avto-russia.ru/autos/hyundai/photo/hyundai_santa_fe_classic_1.jpg',
	5207 : 'http://img151.imageshack.us/img151/4339/p8157954.jpg',
	17332 : 'http://img100.imageshack.us/img100/115/img6091uz4.jpg',
	18346 : 'http://i35.tinypic.com/1zf3msy.jpg',
	18071 : 'http://users.omsknet.ru/Prius/My_ToyotaPrius_Lepra.jpg',
	14656 : 'http://pit.dirty.ru/lepro/159/2008/11/29/14656-163017-7bb2c2b8fdd63000d496a642b0c2232c.jpg',
	2441 : 'http://pit.dirty.ru/lepro/159/2008/11/30/2441-051147-090334fc05f31dc9ef6e9ef314ee1070.jpg',
	1397 : 'http://img372.imageshack.us/img372/1181/0000dz56fd0.jpg',
	13459 : 'http://pit.dirty.ru/lepro/159/2008/11/30/13459-143738-f1cf4b90b6a4424dd0f2c968950cf2f5.jpg',
	17055 : 'http://img.leprosorium.com/598655',
	18538 : 'http://img7.imageshack.us/img7/8358/scoobs.jpg',
	12164 : 'http://leprastuff.ru/data/img/20081201/57732954697cab12a7f5a1407567c7cb.jpg',
	713 : 'http://farm4.static.flickr.com/3116/2668161534_06f527b873.jpg',
	8601 : 'http://araneola.com/images/lj/BMP.jpg',
	19973 : 'http://img252.imageshack.us/img252/5296/dsc5953nv3.jpg',
	6044 : 'http://korean-cars.net/uploads/posts/1213182732_kia_sportage.jpg',
	17563 : 'http://leprastuff.ru/data/img/20081208/thumb_5f3b7111afd387802037a961d6b0fabc.JPG',
	9871 : 'http://pit.dirty.ru/lepro/159/2008/12/11/9871-182408-1c9fd315cbd61d9a174a70155edd2a29.jpg',
	7028 : 'http://img.leprosorium.com/49010',
	17485 : 'http://l.yimg.com/g/images/spaceball.gif',
	6124 : 'http://leprastuff.ru/data/img/20081216/1bd552acd383477db8e0714c218ac655.jpg',
	20296 : 'http://pit.dirty.ru/lepro/159/2008/12/17/20296-190628-f197d2c5845e04c8f6168b97ae3b1ef9.jpg',
	16037 : 'http://pit.dirty.ru/lepro/159/2010/05/12/16037-125544-e23ea706c1e4512b52329d3c42c8038e.jpg',
	6441 : 'http://acars.ru/img.php?size=600&pic=uploaded/2008/26-08-2008/1219767329.jpg',
	3196 : 'http://www.drive.ru/images/lib/profiles/auto/13594.jpeg',
	9123 : 'http://image.motortrend.com/f/auto-review/long-term-drive-2008-subaru-impreza-wrx-sedan/8281056+cr1+re0+ar1/2008-subaru-impreza-wrx-front-three-quarter-view-up-close.jpg',
	14422 : 'http://pit.dirty.ru/lepro/159/2008/12/19/14422-235324-5bb25ce5d7bb3e01e6da38859bab83a6.jpg',
	6690 : 'http://img.leprosorium.com/53765',
	22254 : 'http://pit.dirty.ru/lepro/159/2008/12/24/22254-232806-ca7cf5133d22453a01cfacb7159215dd.jpg',
	5652 : 'http://pit.dirty.ru/lepro/159/2008/12/26/5652-133232-671d13bc0cafb0e29f2521e294aea509.jpg',
	11075 : 'http://pit.dirty.ru/lepro/159/2008/12/26/11075-143742-28109fffbf9a35c65ff5432d40b1e9a9.jpg',
	10211 : 'http://farm3.static.flickr.com/2050/2299158717_8e5c8c1c48.jpg',
	14129 : 'http://pit.dirty.ru/lepro/159/2008/12/26/14129-021824-c0789b195f4c1483ddbbe935d73ec3c7.jpg',
	581 : 'http://pit.dirty.ru/lepro/159/2008/12/26/581-201903-19ba8a9889c039abed9c9d7701a5ca27.jpg',
	283 : 'http://img-fotki.yandex.ru/get/2714/ljournal.7/0_1c7ed_edda6bec_XL',
	22197 : 'http://pit.dirty.ru/lepro/159/2009/01/05/22197-173206-6c5067020bd1a22f52459a6dd6168aa2.jpg',
	13130 : 'http://i40.tinypic.com/35ciqt3.jpg',
	16566 : 'http://pit.dirty.ru/lepro/159/2009/01/06/16566-223432-879cde26f5a1293d79bb7c1fa3b4cc7c.jpg',
	16465 : 'http://pit.dirty.ru/lepro/159/2009/01/09/16465-012039-c551b278f0665d192aa460692e1ef80c.jpg',
	20928 : 'http://pit.dirty.ru/lepro/159/2009/01/12/20928-153159-02c22b7f740156635859499f412ecbc7.jpg',
	15699 : 'http://img-fotki.yandex.ru/get/3300/tupang.0/0_1e5fa_3cf1cb24_orig',
	9699 : 'http://gt-irk.wraith.ru/images/phocagallery/satisfaction/thumbs/phoca_thumb_l_dsc05649.jpg',
	5416 : 'http://pit.dirty.ru/lepro/159/2009/01/11/5416-145925-c57816392446f7a0565db5989164e419.jpg',
	7029 : 'http://pit.dirty.ru/lepro/159/2009/01/13/7029-114658-52aae72f5ec422bc6196e0093634d115.jpg',
	7653 : 'http://farm4.static.flickr.com/3092/3193133491_b0507442da_o.jpg',
	16147 : 'http://farm4.static.flickr.com/3324/3199487175_37ce61039e.jpg',
	15868 : 'http://lh3.ggpht.com/_ZblCw_1PSdU/SXFAsJjRtNI/AAAAAAAAM9k/ynHKjHdzK2c/s800/IMG_0648.JPG',
	23289 : 'http://pit.dirty.ru/lepro/159/2010/04/19/23289-184502-d7c539f834583c951fcbe3e13fbfbaec.jpg',
	22890 : 'http://pit.dirty.ru/lepro/159/2009/01/20/22890-193857-df417bf587e2ef276159badd41f8fe7a.jpg',
	15882 : 'http://i103.photobucket.com/albums/m121/kurych/cars/deep.jpg',
	22065 : 'http://photofile.ru/photo/todik/115285108/124080449.jpg',
	24403 : 'http://pit.dirty.ru/lepro/159/2009/01/22/24403-104935-82a6e854d34eb7ed39e1a1fbc3ed2ab5.jpg',
	23947 : 'http://pit.dirty.ru/lepro/159/2009/06/15/23947-125915-2cfb44cf506f1b786d6a6587ebb1f985.jpg',
	23887 : 'http://photofile.ru/photo/uxtiblya/95193605/large/101520850.jpg',
	1642 : 'http://pit.dirty.ru/lepro/159/2009/01/25/1642-180502-9464618dcb3964de6edf8fdf9fb70c79.jpg',
	23833 : 'http://pit.dirty.ru/lepro/159/2009/10/12/23833-005151-5b82c4d8d8209174cc447516b7975aca.jpg',
	1896 : 'http://img231.imageshack.us/img231/8913/pizhfq5.th.jpg',
	6514 : 'http://boytsoff.ru/dirty/Glam_Opel.jpg',
	6167 : 'http://pit.dirty.ru/lepro/159/2009/01/27/6167-004231-f97db5e12cdaaf292cd9f051a1fddb86.jpg',
	19913 : 'http://leprastuff.ru/data/img/20090127/thumb_c5adfb416146ec7af53b7832b7a014bc.jpg',
	10898 : 'http://pit.dirty.ru/lepro/159/2009/01/29/10898-111636-7d2b56b3b348927b501fae25f9a661ec.jpg',
	9638 : 'http://pit.dirty.ru/lepro/159/2009/01/31/9638-190611-192f404668b5ea525c80db9472e3afff.jpg',
	3669 : 'http://pit.dirty.ru/lepro/159/2009/02/02/3669-182426-1c88fadd27501ecaf3a45dc027f91610.jpg',
	7253 : 'http://pit.dirty.ru/lepro/159/2009/02/03/7253-180723-fb2b5f6e4c8da6cfd00b6ed572a790f8.png',
	25125 : 'http://pit.dirty.ru/lepro/159/2009/02/03/25125-183446-316b976e637d7cc0ad3ca7225410d1e6.jpg',
	21938 : 'http://pics.livejournal.com/agentserge/pic/00002sq3/s640x480',
	10588 : 'http://farm3.static.flickr.com/2070/2423352462_a8f0700351.jpg?v=0',
	9227 : 'http://pit.dirty.ru/lepro/159/2009/02/06/9227-233656-db219a132606e28d74d1d9b0373d814c.jpg',
	8058 : 'http://pit.dirty.ru/lepro/159/2009/02/09/8058-011813-7094bfed914fdce36c09b907b34fe1a1.jpg',
	15921 : 'http://img201.imageshack.us/img201/7962/mg2331640qj1.jpg',
	24831 : 'http://pit.dirty.ru/lepro/159/2009/02/11/24831-031526-7ba5fc0048fec25eb7723c9273252b87.jpg',
	4711 : 'http://img.leprosorium.com/520436',
	2726 : 'http://nub1an.ru/img/IMG_4267.jpg',
	13706 : 'http://www.ljplus.ru/img4/_/f/_funt/x_c4d2e1fb.jpg',
	22759 : 'http://img5.imageshost.ru/imgs/090304/33cb1a9abb57fd291fee1d664d3f8060/40fdc9fd2ece7e2242bc494c2302df84.png',
	8453 : 'http://pit.dirty.ru/lepro/159/2009/03/08/8453-095834-8c5b8eb7ff02c200e3b285487c5b1e66.jpg',
	19185 : 'http://img17.imageshack.us/img17/9202/img0272vzj.jpg',
	10913 : 'http://pit.dirty.ru/lepro/159/2009/03/25/10913-074957-2847dafcc7d4b9e8e2a0742ac36f0832.jpg',
	15993 : 'http://pit.dirty.ru/lepro/159/2009/03/25/15993-110825-fc71c647506caec5ff08863019886f73.jpg',
	11489 : 'http://www.drive.ru/images/lib/galleries/small/157442.jpeg',
	17428 : 'http://pit.dirty.ru/lepro/159/2009/03/25/17428-121544-5d6b8864890d0a9d34c83e47464094f8.jpg',
	21976 : 'http://img.leprosorium.com/545862',
	5614 : 'http://yani.ru/330_2.jpg',
	9811 : 'http://pit.dirty.ru/lepro/159/2009/03/31/9811-235531-7551ff706dcf8f0aa3995a84a30386bc.jpg',
	11507 : 'http://lh6.ggpht.com/_UN8w9VGqrPw/StLqDNArKAI/AAAAAAAAD1E/QqpDbCRJ0x8/DSC_0170.jpg',
	26607 : 'http://funkyimg.com/u2/120/478/x_c42575ae.jpg',
	3951 : 'http://pit.dirty.ru/lepro/159/2009/04/02/3951-013914-472ace2717b4808c33de66749809b38d.jpg',
	6596 : 'http://www.automania.ru/webroot/delivery/images/thumbnails/Auto_catalog/Citroen/Xsara/480x260_Xsara_big.jpg',
	24807 : 'http://pit.dirty.ru/lepro/2/2009/05/29/24807-203032-37e67c8775febe192a3391c6f20c4c78.jpg',
	3912 : 'http://pit.dirty.ru/lepro/159/2009/04/18/3912-193853-7a094c9859c8e84f785d0e76ee45cc61.jpg',
	17242 : 'http://leprastuff.ru/data/img/20090423/025d618f2cdbe39cc33e8a7467342381.jpg',
	5939 : 'http://pit.dirty.ru/lepro/159/2009/05/04/5939-220848-5546c9246b3314f88bae225a811a5fe0.jpg',
	10916 : 'http://dc15.4shared.com/download/106459757/686b74e6/c4_online.jpg',
	23747 : 'http://troitsk.org/sites/desmodus/galant2.jpg',
	7154 : 'http://pit.dirty.ru/lepro/159/2009/06/01/7154-112347-69ff70c841136d8666735f396ec13812.jpg',
	4655 : 'http://zatup.org/pics/bmw/2/DSCN0237.JPG',
	19857 : 'http://images.avtomagazine.ua/001/003/1Lu7pP0000CsKH/nissan-primera-slx-1994-w.jpeg',
	18050 : 'http://leprastuff.ru/data/img/20090607/274c4a49b5d176790fd17e92a6fb42e8.jpg',
	20190 : 'http://pit.dirty.ru/lepro/2/2009/06/24/20190-003215-6e827af01cf0722f48cfc9fe5758df74.jpg',
	31681 : 'http://www.e1.ru/fun/photo/view_pic.php/p/82f3cd09bb11915537effe684ce4732d/view.pic',
	7297 : 'http://gruz39.ru/begemot2.jpg',
	30188 : 'http://pit.dirty.ru/lepro/159/2009/07/24/30188-091726-da2efa3faa41156d689070a29710df8d.jpg',
	19756 : 'http://leprastuff.ru/data/img/20090701/e818d63360f151eb4b0681d3cc1d83b8.jpg',
	32704 : 'http://pit.dirty.ru/lepro/159/2009/07/24/32704-144300-5f7f94bb6e9d4da96a5cfac3cb87bca2.jpg',
	7290 : 'http://www.luisi.ru/prikol_798.jpg',
	17294 : 'http://gnomus.ru/crash/p1040683.jpg',
	31212 : 'http://pit.dirty.ru/lepro/159/2009/08/25/31212-193107-6f33162ef32665d8c41d15c9770c0289.jpg',
	32271 : 'http://pit.dirty.ru/lepro/159/2009/08/25/32271-200625-022e016f7b2ce63685d9f4303f7081fb.jpg',
	9199 : 'http://img.leprosorium.com/653750',
	20540 : 'http://pit.dirty.ru/lepro/159/2009/09/23/20540-124850-a54f5494a8dc26e2341241c6c215d1d1.jpg',
	38941 : 'http://pit.dirty.ru/lepro/159/2009/11/02/38941-190453-b8bf7cb013e9312532952d295fc1b284.jpg',
	19462 : 'http://auto.lenta.ru/articles/2009/05/19/autoputin/4.jpg',
	6362 : 'http://pit.dirty.ru/lepro/159/2009/07/26/6362-232300-6e63d1d7edc4d853e98807284b3f6497.jpg',
	26728 : 'http://pit.dirty.ru/lepro/159/2009/05/27/26728-205741-86031f6d6f91c89495e88624c5328e92.jpg',
	24810 : 'http://pit.dirty.ru/lepro/159/2009/05/28/24810-180506-be8d8828aafd7acb3cdde9f0e9653288.jpg',
	3012 : 'http://pit.dirty.ru/lepro/159/2009/06/10/3012-010905-6ebd43c7efbfcfa7bfd0bc2319211f48.jpg',
	5326 : 'http://www.autotic.com/Album/PreOwned/2004%20Pontiac%20Vibe%20Blue%2011074/slides/DSC05084.JPG',
	22394 : 'http://pit.dirty.ru/lepro/159/2009/06/16/22394-155355-5d208f88d616287fe9e0469432ab06a1.jpg',
	24060 : 'http://pit.dirty.ru/lepro/159/2009/07/04/24060-211730-61e1fdad74bea6d8fc60f9cce0f3709a.jpg',
	26332 : 'http://pit.dirty.ru/lepro/159/2009/07/04/26332-211858-8821e6ea5fb2c505c59874f6c1e31179.jpg',
	18156 : 'http://pit.dirty.ru/lepro/159/2009/07/07/18156-152502-1ba3fa214c0818fdba8106aa4fcab317.jpg',
	28944 : 'http://pit.dirty.ru/lepro/159/2009/07/17/28944-074844-d247eda0606771a106747674c29bc798.jpg',
	10469 : 'http://smotra.ru/files/imagecache/full/img/side.jpg?',
	6830 : 'http://pit.dirty.ru/lepro/159/2009/07/18/6830-020617-04840d74140d35c97dd2118053b8b653.jpg',
	14379 : 'http://pit.dirty.ru/lepro/159/2009/07/18/14379-021559-3d2a76d92f6a7111f94dc72ca56c4968.jpg',
	13523 : 'http://img.leprosorium.com/623707',
	20639 : 'http://pit.dirty.ru/lepro/159/2009/07/26/20639-223117-017b1eab21c62c906c62b3c889cb2c9b.jpg',
	8613 : 'http://creator.bcsoft.org/turnier/mk7.jpg',
	28453 : 'http://pit.dirty.ru/lepro/159/2009/07/27/28453-003438-78f58567373bf0695064a4b92c1d761c.jpg',
	24178 : 'http://pit.dirty.ru/lepro/159/2009/07/31/24178-105429-8024fbc9d278959062b1cf867cb825db.jpg',
	31816 : 'http://images.drive2.ru/car.photos/3840/000/000/00a/b4d/88cb9bacd3712330-original.jpg',
	29568 : 'http://pit.dirty.ru/lepro/159/2009/07/31/29568-155945-20bfe698cf2bee46f4977bfa27990319.jpg',
	34818 : 'http://img38.imageshack.us/img38/5066/lemond.jpg',
	19496 : 'http://pit.dirty.ru/lepro/159/2009/08/04/19496-135755-fd4c94ee9b31cfbd9a25915588777e94.jpg',
	18519 : 'http://images.drive2.ru/car.journal.photos/3800/000/000/031/5dd/88cbd4208076f400-main.jpg',
	23806 : 'http://cs636.vkontakte.ru/u1477606/10730883/x_84d722fb.jpg',
	32335 : 'http://img.leprosorium.com/642809',
	32471 : 'http://pit.dirty.ru/lepro/159/2009/08/20/32471-124436-36b587dce9a9481a27451e41ebf9de1b.jpg',
	36641 : 'http://pit.dirty.ru/lepro/159/2009/08/28/36641-123008-7a14736c2d2dad4008b01b6b0e45bc9d.jpg',
	25545 : 'http://img.gameru.net/th/98407.jpg',
	18298 : 'http://leprastuff.ru/data/img/20090831/b11824f25ce0abf9a6adffc10026aa29.jpg',
	33762 : 'http://spm_on_lebaron.users.photofile.ru/photo/spm_on_lebaron/95043480/xlarge/97032802.jpg',
	34222 : 'http://pit.dirty.ru/lepro/159/2009/09/08/34222-163933-f7c49c8eec03d01ef61956174a00d317.jpg',
	25160 : 'http://img.leprosorium.com/664114',
	33318 : 'http://pit.dirty.ru/lepro/159/2009/09/16/33318-002316-cfda7b4531e3138041a6bb4b563c0b48.jpg',
	12496 : 'http://images.drom.ru/reviews/photos/honda/domani/30683_0.jpeg',
	20449 : 'http://pit.dirty.ru/lepro/159/2009/10/14/20449-013155-f5096ec123f70e362d530ea512b0fa6f.jpg',
	28101 : 'http://img.leprosorium.com/694023',
	28352 : 'http://pit.dirty.ru/lepro/159/2009/10/15/28352-082614-029e93674db4be947a45e8654655a77e.jpg',
	37858 : 'http://pit.dirty.ru/lepro/159/2009/10/18/37858-132734-d49e38d0e8711d0ee01b57922b6b2d30.jpg',
	28219 : 'http://pit.dirty.ru/lepro/159/2009/10/19/28219-093913-6566cc3e38945fd7083a8deb089476cd.jpg',
	4262 : 'http://pit.dirty.ru/lepro/159/2009/10/19/4262-103701-c7af1ed921231104ddbcec4f01f76b9a.jpg',
	23311 : 'http://pit.dirty.ru/lepro/159/2009/10/19/23311-141417-180d69a24e6c3e4feae52c8705e31223.jpg',
	771 : 'http://pit.dirty.ru/lepro/159/2010/04/21/771-195238-05bb93ddb3202f898a1e0ed7570e6488.jpg',
	29265 : 'http://pit.dirty.ru/lepro/159/2009/10/20/29265-215141-05e277cb435a9f91385850b10a2e6d9a.jpg',
	34235 : 'http://img.leprosorium.com/704526',
	38900 : 'http://pit.dirty.ru/lepro/159/2009/10/27/38900-135224-de99252207d582cba1e0e8e4e07f83a1.jpg',
	9882 : 'http://pit.dirty.ru/lepro/159/2009/10/30/9882-133212-23b3e7d24cb9186ae929a3a5ad93dc1a.jpg',
	19297 : 'http://pit.dirty.ru/lepro/159/2009/11/05/19297-133328-8ef059a3c2802cf3082e12573f23ab3d.jpg',
	9585 : 'http://pit.dirty.ru/lepro/159/2009/11/06/9585-195630-417cb3d90f58709309f9ce655012a979.jpg',
	8021 : 'http://i005.radikal.ru/0911/91/03e86ab7a3fe.jpg',
	6824 : 'http://img190.imageshack.us/img190/5067/astrad.jpg',
	8215 : 'http://data8.gallery.ru/albums/gallery/118437-e2e03-15372720-400.jpg',
	8926 : 'http://images.drom.ru/reviews/photos/subaru/legacy_lancaster/22106_0.jpeg',
	40074 : 'http://pit.dirty.ru/lepro/159/2009/11/12/40074-121047-23a57e7caea5fa66f36fa2614eef2f15.jpg',
	34526 : 'http://pit.dirty.ru/lepro/159/2009/12/09/34526-043038-ed6327bcf1cd52a1f242b8eed3925c80.jpg',
	22847 : 'http://s2.images.drive2.ru/car.photos/3860/000/000/010/513/88cc3f50331c5ada-main.jpg',
	31663 : 'http://www.ljplus.ru/img4/m/a/maymak/2008-suzuki-sx4-i0011.jpg',
	41037 : 'http://img.leprosorium.com/739390',
	10214 : 'http://pic.madfire.net/berkus/mazda_front2.jpg',
	20063 : 'http://www.francemobile.by/upload/cms_images/test-drive/11-2008/B1-Honda-CRV.jpg',
	40890 : 'http://img.picsa.ru/pictures/0/000/018/736/18736.JPG',
	40234 : 'http://pit.dirty.ru/lepro/159/2009/12/10/40234-134118-8547af311e7665b9e462f2407221767f.jpg',
	34230 : 'http://pit.dirty.ru/lepro/159/2010/02/05/34230-125405-72d67d3c303d91b1cf577e5ad9cb856e.jpg',
	10303 : 'http://pit.dirty.ru/lepro/159/2009/12/11/10303-042355-e434d54c2db3e0dcd3b0112b233691c1.jpg',
	30446 : 'http://pit.dirty.ru/lepro/159/2009/12/16/30446-134755-d9e56420c40ef0e4eccfcb4a1d751e4d.jpg',
	5966 : 'http://pit.dirty.ru/lepro/159/2009/12/18/5966-173613-adce477034058134d739df2b92fdb8b8.jpg',
	8335 : 'http://ultraxs.com/image-6213_4B01782F.jpg',
	25528 : 'http://img7.imageshost.ru/imgs/091221/22c6c29b3d/2ff87.jpg',
	23129 : 'http://img716.imageshack.us/img716/7204/17063059.jpg',
	42049 : 'http://pit.dirty.ru/lepro/159/2010/01/29/42049-165643-86abf67cddac9af8ef0d91c5a040d067.jpg',
	25707 : 'http://pit.dirty.ru/lepro/159/2010/01/29/25707-235616-78d71fa48429e5950b9a696a37fab72d.jpg',
	14719 : 'http://pit.dirty.ru/lepro/159/2010/01/30/14719-001605-0552f7fcdcff80c7b268fa446ffc7043.jpg',
	22321 : 'http://img.leprosorium.com/781246',
	9712 : 'http://pit.dirty.ru/lepro/159/2010/01/31/9712-134731-d51ba812257315bcec3a2771a74acb92.jpg',
	17190 : 'http://img524.imageshack.us/img524/7805/img1010m.jpg',
	38034 : 'http://pit.dirty.ru/lepro/159/2010/02/01/38034-000309-f0a8c455eeff246b502d2b045857e559.jpg',
	8632 : 'http://www.dronix.ru/img/car/3.jpg',
	16259 : 'http://cs4278.vkontakte.ru/u231841/97124096/x_38b7fc23.jpg',
	10389 : 'http://leprastuff.ru/data/img/20100112/f91b076796b4054c9b82cca965f80296.jpg',
	9087 : 'http://pit.dirty.ru/lepro/159/2010/02/05/9087-104937-1db40512f7d2d73ee581495c9ec110fb.jpg',
	19287 : 'http://pit.dirty.ru/lepro/159/2010/02/05/19287-131032-379770ae28d9b21f2d2f83937e655150.jpg',
	40233 : 'http://customimporttraders.com/citjoomla/images/stories/images/Cars/Honda/CRV/honda%20crv1.jpg',
	42628 : 'http://img.leprosorium.com/805147',
	26029 : 'http://pit.dirty.ru/lepro/159/2010/02/21/26029-120523-061a6b71001538206aff849c87535897.jpg',
	37843 : 'http://pit.dirty.ru/lepro/159/2010/03/28/37843-163849-857e85acaef18bd7c64b4f777cb94513.jpg',
	38391 : 'http://i29.photobucket.com/albums/c288/verytolik/lepra/P1010627.jpg',
	7406 : 'http://img.leprosorium.com/836550',
	24129 : 'http://pit.dirty.ru/lepro/159/2010/03/28/24129-202632-b470fad37fc5a5dd3eca5f58804855af.jpg',
	5036 : 'http://pit.dirty.ru/lepro/159/2010/03/30/5036-112504-8c21a7f887045f234bf9af817dcdd092.jpg',
	27696 : 'http://pit.dirty.ru/lepro/159/2010/03/30/27696-130637-8b8ff05a8e7113a833f85e0537742d3a.jpg',
	12208 : 'http://i921.photobucket.com/albums/ad51/petr0vichua/x_0d52ada0.jpg',
	35022 : 'http://pit.dirty.ru/lepro/159/2010/04/12/35022-231253-f5669976812bd89d929268ca30e444b9.jpg',
	21468 : 'http://pit.dirty.ru/lepro/159/2010/04/14/21468-092306-9b4dd02f2dbf5479e3d82210e20258c9.jpg',
	27102 : 'http://pit.dirty.ru/lepro/159/2010/04/19/27102-142950-a57942d8423f5d9025c03b2cc8ff0433.jpg',
	28940 : 'http://pit.dirty.ru/lepro/159/2010/04/19/28940-144625-bac43a0c7916e412f9924bbcb6bb3af2.jpg',
	9686 : 'http://pit.dirty.ru/lepro/159/2010/04/24/9686-190930-aa39ecd5f98dd88251d8d2053ac1d37a.jpg',
	30442 : 'http://pit.dirty.ru/lepro/159/2010/05/12/30442-042029-3ac15657d4553bc9ef340b32109ea8b2.jpg',
	16347 : 'http://farm2.static.flickr.com/1295/4601037842_4a6cfe6571.jpg'
};

var browser = false;
if (navigator.vendor.split('Apple').length > 1) {
    browser = 'safari';
} else if (navigator.userAgent.split('Firefox').length > 1) {
    browser = 'firefox';
} else if (window.opera) {
    browser = 'opera';
}

if (browser) {
    function showPic(obj) {
        var vars = obj.href.split('#')[1].split('/');
        var url = cars[vars[0]];
        var nick = vars[1];
        if (nick.split('%').length > 1) {
            nick = 'с кириллическим ником';
        }
        var image = document.createElement('img');
        image.setAttribute('src', url);
        image.setAttribute('style', 'margin:0;padding:0;max-width:500px;');
        image.setAttribute('alt', 'Загружается...');
        var comment = document.createElement('span');
        comment.innerHTML = 'Авто лепера '+ nick;
        comment.setAttribute('style', 'font-size:10px;');
        var block = document.createElement('div');
        block.setAttribute('id', 'user_carpic');
        block.setAttribute('style', 'position:fixed;top:50px;right:50px;width:auto;border:5px #E2E2E2 solid;margin:0;padding:0;background-color:#E2E2E2;z-index:999;');
        block.appendChild(image);
        block.appendChild(document.createElement('br'));
        block.appendChild(comment);
        
        document.getElementsByTagName('body')[0].appendChild(block);
    }
    
    function hidePic() {
        document.getElementsByTagName('body')[0].removeChild(document.getElementById('user_carpic'));
    }
    
    var divs = document.getElementsByTagName('div');
    for (i = 0; i < divs.length; i++) {
        if (divs[i].className.split('post tree').length > 1) {
            user_id = parseInt(divs[i].className.split(' u')[1]);
            if (cars[user_id]) {
                nick_div = divs[i].getElementsByTagName('div')[2];
                nick = nick_div.getElementsByTagName('a')[1].innerHTML
                button = document.createElement('a');
                button.setAttribute('href', '#'+ user_id +"/"+ nick);
                button.innerHTML = '<span style="color:green;">моё ведро</b>';
                if (browser == 'firefox') {
                    button.addEventListener('mouseover', function(){showPic(this);}, false);
                    button.addEventListener('mouseout', function(){hidePic();}, false);
                } else {
                    button.onmouseover = function(){showPic(this);};
                    button.onmouseout = function(){hidePic();};
                }
                nick_div.appendChild(button);
            }
        }
    }
}