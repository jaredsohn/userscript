<!DOCTYPE HTML>
<html><body>
  <script type="text/javascript">
// ==UserScript==
// @name          سكربت الابتسامات الجديدة 2011  By: wise wizard and nagato pein
// @namespace     Anonymous User
// @description   سكربت الابتسامات في الرسائل و المنتدى الخاص بالقبيلة , By: nagato pein and wize wizard
// @include        http://ae*.tribalwars.ae/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
// @include        http://ae16.tribalwars.ae/game.php?village=120464&screenmode=view_thread&thread_id=66809&answer=true&page=last&screen=forum#
// ==/UserScript==

/*
DS Smilies-BB-Codes-List

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

You may change string values if it's necessary for your language area.
Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.
*/

var smilies = new Array(
'http://www.bh30.com/vb3/images/ns/About_To_Cry.gif',
'http://www.bh30.com/vb3/images/ns/Angel.gif',
'http://www.bh30.com/vb3/images/ns/Angry_2.gif',
'http://www.bh30.com/vb3/images/ns/Angry_1.gif',
'http://www.bh30.com/vb3/images/ns/Angry_3.gif',
'http://www.bh30.com/vb3/images/ns/Soldier.gif',
'http://www.bh30.com/vb3/images/ns/Angry_4.gif',
'http://www.bh30.com/vb3/images/ns/Asking.gif',
'http://www.bh30.com/vb3/images/ns/Beaten.gif',
'http://www.bh30.com/vb3/images/ns/Being_Funny.gif',
'http://www.bh30.com/vb3/images/ns/Sleep.gif',
'http://www.bh30.com/vb3/images/ns/Bomb.gif',
'http://www.bh30.com/vb3/images/ns/Boss.gif',
'http://www.bh30.com/vb3/images/ns/Boy.gif',
'http://www.bh30.com/vb3/images/ns/Bye.gif',
'http://www.bh30.com/vb3/images/ns/Cry_1.gif',
'http://www.bh30.com/vb3/images/ns/Cry_2.gif',
'http://www.bh30.com/vb3/images/ns/Fighter.gif',
'http://www.bh30.com/vb3/images/ns/Hypno.gif',
'http://www.bh30.com/vb3/images/ns/Hello.gif',
'http://www.bh30.com/vb3/images/ns/Laught_1.gif',
'http://www.bh30.com/vb3/images/ns/Money.gif',
'http://www.bh30.com/vb3/images/ns/Magnify.gif',
'http://www.bh30.com/vb3/images/ns/Phone.gif',
'http://www.bh30.com/vb3/images/ns/Scream.gif',
'http://www.bh30.com/vb3/images/ns/Moon.gif',
'http://www.bh30.com/vb3/images/ns/Tongue.gif',
'http://www.bh30.com/vb3/images/ns/Yell.gif',
'http://www.bh30.com/vb3/images/ns/Slapped.gif',
'http://www.bh30.com/vb3/images/ns/Ok.gif',
'http://www.bh30.com/vb3/images/ns/In_Love.gif',
'http://www.bh30.com/vb3/images/ns/Thinking.gif',
'http://www.hostk.info/upload/uploads/hostk12978768211.gif',
'http://www.hostk.info/upload/uploads/hostk12978768212.jpg',
'http://www.hostk.info/upload/uploads/hostk12978768213.jpg',
'http://www.hostk.info/upload/uploads/hostk12979581182.jpg',
'http://www.hostk.info/upload/uploads/hostk12979581184.gif',
'http://www.hostk.info/upload/uploads/hostk12979581183.jpg',
'http://www.hostk.info/upload/uploads/hostk12978768224.jpg',
'http://www.hostk.info/upload/uploads/hostk12978696041.gif',
'http://www.hostk.info/upload/uploads/hostk12978696052.gif',
'http://www.hostk.info/upload/uploads/hostk12978696053.gif',
'http://www.hostk.info/upload/uploads/hostk12978696064.gif',
'http://www.hostk.info/upload/uploads/hostk12978696065.gif',
'http://www.hostk.info/upload/uploads/hostk12978696076.gif',
'http://www.hostk.info/upload/uploads/hostk12978696087.gif',
'http://www.hostk.info/upload/uploads/hostk13107454291.gif',
'http://www.hostk.info/upload/uploads/hostk13107454292.gif',
'http://www.hostk.info/upload/uploads/hostk13107454293.gif',
'http://www.hostk.info/upload/uploads/hostk13107454294.gif',
'http://www.hostk.info/upload/uploads/hostk13107454295.gif',
'http://www.hostk.info/upload/uploads/hostk13107454296.gif',
'http://www.hostk.info/upload/uploads/hostk13107454297.gif',
'http://www.hostk.info/upload/uploads/hostk13107454298.gif',
'http://www.hostk.info/upload/uploads/hostk13107454299.gif',
'http://www.hostk.info/upload/uploads/hostk131074542910.gif',
'http://www.hostk.info/upload/uploads/hostk131074542911.png',
'http://www.hostk.info/upload/uploads/hostk131074542912.gif',
'http://www.hostk.info/upload/uploads/hostk131074542913.gif',
'http://www.hostk.info/upload/uploads/hostk131074543014.gif',
'http://forum.tribalwars.ae/images/smilies/biggrin.gif',
'http://www.hostk.info/upload/uploads/hostk13107928821.gif',
'http://www.hostk.info/upload/uploads/hostk13107928832.gif',
'http://www.hostk.info/upload/uploads/hostk13107928833.gif',
'http://www.hostk.info/upload/uploads/hostk13107928834.gif',
'http://www.hostk.info/upload/uploads/hostk13107928835.gif',
'http://www.hostk.info/upload/uploads/hostk13107928836.gif',
'http://www.hostk.info/upload/uploads/hostk13107928837.gif',
'http://www.hostk.info/upload/uploads/hostk13107928838.gif',
'http://www.hostk.info/upload/uploads/hostk13107928839.gif',
'http://www.hostk.info/upload/uploads/hostk131079288310.gif',
'http://www.hostk.info/upload/uploads/hostk13107953951.gif',
'http://www.hostk.info/upload/uploads/hostk13107953952.gif',
'http://www.hostk.info/upload/uploads/hostk13107953953.gif',
'http://www.hostk.info/upload/uploads/hostk13107953954.gif',
'http://www.hostk.info/upload/uploads/hostk13107953956.gif',
'http://www.hostk.info/upload/uploads/hostk13107953967.gif',
'http://www.hostk.info/upload/uploads/hostk13107953968.gif',
'http://www.hostk.info/upload/uploads/hostk13107953969.gif',
'http://www.hostk.info/upload/uploads/hostk131079539610.gif',
'http://www.hostk.info/upload/uploads/hostk131079539611.gif',
'http://www.hostk.info/upload/uploads/hostk131079539612.gif',
'http://www.hostk.info/upload/uploads/hostk131079539613.gif',
'http://www.hostk.info/upload/uploads/hostk131079539614.gif',
'http://www.hostk.info/upload/uploads/hostk131079539615.gif',
'http://www.hostk.info/upload/uploads/hostk131079539616.gif',
'http://www.hostk.info/upload/uploads/hostk131079539717.gif',
'http://www.hostk.info/upload/uploads/hostk131079539718.gif',
'http://www.hostk.info/upload/uploads/hostk131079539719.gif',
'http://www.hostk.info/upload/uploads/hostk13107960261.gif',
'http://www.hostk.info/upload/uploads/hostk13107960262.gif',
'http://www.hostk.info/upload/uploads/hostk13107960263.gif',
'http://www.hostk.info/upload/uploads/hostk13107960274.gif',
'http://www.hostk.info/upload/uploads/hostk13107960275.gif',
'http://www.hostk.info/upload/uploads/hostk13107960276.gif',
'http://www.hostk.info/upload/uploads/hostk13107960277.gif',
'http://www.hostk.info/upload/uploads/hostk13107960278.gif',
'http://www.hostk.info/upload/uploads/hostk13107960279.gif',
'http://www.hostk.info/upload/uploads/hostk131079602710.gif',
'http://www.hostk.info/upload/uploads/hostk131079602711.gif',
'http://www.hostk.info/upload/uploads/hostk13107201731.gif',
'http://forum.tribalwars.ae/images/smilies/smile.gif',
'http://forum.tribalwars.ae/images/smilies/wink.gif',
'http://forum.tribalwars.ae/images/smilies/tongue.gif',
'http://forum.tribalwars.ae/images/smilies/mad.gif',
'http://forum.tribalwars.ae/images/smilies/frown.gif',
'http://forum.tribalwars.ae/images/smilies/rolleyes.gif',
'http://forum.tribalwars.ae/images/smilies/eek.gif',
'http://forum.tribalwars.ae/images/smilies/cool.gif',
'http://forum.tribalwars.ae/images/smilies/confused.gif',
'http://forum.tribalwars.ae/images/smilies/redface.gif',
'http://www.plapl.com/up/smile/plapl (101).gif',
'http://www.plapl.com/up/smile/plapl (102).gif',
'http://www.plapl.com/up/smile/plapl (103).gif',
'http://www.plapl.com/up/smile/plapl (104).gif',
'http://www.plapl.com/up/smile/plapl (105).gif',
'http://www.plapl.com/up/smile/plapl (106).gif',
'http://www.plapl.com/up/smile/plapl (107).gif',
'http://www.plapl.com/up/smile/plapl (108).gif',
'http://www.plapl.com/up/smile/plapl (109).gif',
'http://www.plapl.com/up/smile/plapl (110).gif',
'http://www.plapl.com/up/smile/plapl (112).gif',
'http://www.plapl.com/up/smile/plapl (111).gif',
'http://www.plapl.com/up/smile/plapl (113).gif',
'http://www.plapl.com/up/smile/plapl (114).gif',
'http://www.plapl.com/up/smile/plapl (115).gif',
'http://www.plapl.com/up/smile/plapl (116).gif',
'http://www.plapl.com/up/smile/plapl (117).gif',
'http://www.plapl.com/up/smile/plapl (118).gif',
'http://www.plapl.com/up/smile/plapl (119).gif',
'http://www.plapl.com/up/smile/plapl (120).gif',
'http://www.plapl.com/up/smile/plapl (121).gif',
'http://www.plapl.com/up/smile/plapl (122).gif',
'http://www.plapl.com/up/smile/plapl (123).gif',
'http://www.plapl.com/up/smile/plapl (124).gif',
'http://www.plapl.com/up/smile/plapl (125).gif',
'http://www.plapl.com/up/smile/plapl (126).gif',
'http://www.plapl.com/up/smile/plapl (127).gif',
'http://www.plapl.com/up/smile/plapl (128).gif',
'http://www.plapl.com/up/smile/plapl (129).gif',
'http://www.plapl.com/up/smile/plapl (130).gif',
'http://www.plapl.com/up/smile/plapl (131).gif',
'http://www.plapl.com/up/smile/plapl (132).gif',
'http://www.plapl.com/up/smile/plapl (133).gif',
'http://www.plapl.com/up/smile/plapl (134).gif',
'http://www.plapl.com/up/smile/plapl (135).gif',
'http://www.plapl.com/up/smile/plapl (136).gif',
'http://www.plapl.com/up/smile/plapl (137).gif',
'http://www.plapl.com/up/smile/plapl (138).gif',
'http://www.plapl.com/up/smile/plapl (139).gif',
'http://www.plapl.com/up/smile/plapl (140).gif',
'http://www.plapl.com/up/smile/plapl (141).gif',
'http://www.plapl.com/up/smile/plapl (142).gif',
'http://www.plapl.com/up/smile/plapl (143).gif',
'http://www.plapl.com/up/smile/plapl (145).gif',
'http://www.plapl.com/up/smile/plapl (146).gif',
'http://www.plapl.com/up/smile/plapl (147).gif',
'http://www.plapl.com/up/smile/plapl (148).gif',
'http://www.plapl.com/up/smile/plapl (149).gif',
'http://www.plapl.com/up/smile/plapl (150).gif',
'http://www.plapl.com/up/smile/plapl (151).gif',
'http://www.plapl.com/up/smile/plapl (152).gif',
'http://www.plapl.com/up/smile/plapl (153).gif',
'http://www.plapl.com/up/smile/plapl (154).gif',
'http://www.plapl.com/up/smile/plapl (155).gif',
'http://www.plapl.com/up/smile/plapl (156).gif',
'http://www.plapl.com/up/smile/plapl (157).gif',
'http://www.plapl.com/up/smile/plapl (158).gif',
'http://www.plapl.com/up/smile/plapl (159).gif',
'http://www.plapl.com/up/smile/plapl (160).gif',
'http://www.plapl.com/up/smile/plapl (161).gif',
'http://www.plapl.com/up/smile/plapl (162).gif',
'http://www.plapl.com/up/smile/plapl (163).gif',
'http://www.plapl.com/up/smile/plapl (164).gif',
'http://www.plapl.com/up/smile/plapl (165).gif',
'http://www.plapl.com/up/smile/plapl (166).gif',
'http://www.plapl.com/up/smile/plapl (167).gif',
'http://www.plapl.com/up/smile/plapl (168).gif',
'http://www.plapl.com/up/smile/plapl (169).gif',
'http://www.plapl.com/up/smile/plapl (170).gif',
'http://www.plapl.com/up/smile/plapl (171).gif',
'http://www.plapl.com/up/smile/plapl (172).gif',
'http://www.plapl.com/up/smile/plapl (173).gif',
'http://www.plapl.com/up/smile/plapl (174).gif',
'http://www.plapl.com/up/smile/plapl (175).gif',
'http://www.plapl.com/up/smile/plapl (176).gif',
'http://www.plapl.com/up/smile/plapl (178).gif',
'http://www.plapl.com/up/smile/plapl (179).gif',
'http://www.plapl.com/up/smile/plapl (180).gif',
'http://www.plapl.com/up/smile/plapl (181).gif',
'http://www.plapl.com/up/smile/plapl (182).gif',
'http://www.plapl.com/up/smile/plapl (183).gif',
'http://www.plapl.com/up/smile/plapl (184).gif',
'http://www.plapl.com/up/smile/plapl (185).gif',
'http://www.plapl.com/up/smile/plapl (186).gif',
'http://www.plapl.com/up/smile/plapl (187).gif',
'http://www.plapl.com/up/smile/plapl (188).gif',
'http://www.plapl.com/up/smile/plapl (189).gif',
'http://www.plapl.com/up/smile/plapl (190).gif',
'http://www.plapl.com/up/smile/plapl (191).gif',
'http://www.plapl.com/up/smile/plapl (192).gif',
'http://www.plapl.com/up/smile/plapl (193).gif',
'http://www.plapl.com/up/smile/plapl (194).gif',
'http://www.plapl.com/up/smile/plapl (195).gif',
'http://www.plapl.com/up/smile/plapl (196).gif',
'http://www.plapl.com/up/smile/plapl (197).gif',
'http://www.plapl.com/up/smile/plapl (198).gif',
'http://www.plapl.com/up/smile/plapl (199).gif',
'http://www.plapl.com/up/smile/plapl (200).gif',
'http://www.plapl.com/up/smile/plapl (201).gif',
'http://www.plapl.com/up/smile/plapl (202).gif',
'http://www.plapl.com/up/smile/plapl (203).gif',
'http://www.plapl.com/up/smile/plapl (204).gif',
'http://www.plapl.com/up/smile/plapl (205).gif',
'http://www.plapl.com/up/smile/plapl (206).gif',
'http://www.plapl.com/up/smile/plapl (207).gif',
'http://www.plapl.com/up/smile/plapl (208).gif',
'http://www.plapl.com/up/smile/plapl (209).gif',
'http://www.plapl.com/up/smile/plapl (210).gif',
'http://www.plapl.com/up/smile/plapl (211).gif',
'http://www.plapl.com/up/smile/plapl (212).gif',
'http://www.plapl.com/up/smile/plapl (213).gif',
'http://www.plapl.com/up/smile/plapl (214).gif',
'http://www.plapl.com/up/smile/plapl (215).gif',
'http://www.plapl.com/up/smile/plapl (216).gif',
'http://www.plapl.com/up/smile/plapl (217).gif',
'http://www.plapl.com/up/smile/plapl (218).gif',
'http://www.plapl.com/up/smile/plapl (219).gif',
'http://www.plapl.com/up/smile/plapl (220).gif',
'http://www.plapl.com/up/smile/plapl (221).gif',
'http://www.plapl.com/up/smile/plapl (222).gif',
'http://www.plapl.com/up/smile/plapl (223).gif',
'http://www.plapl.com/up/smile/plapl (224).gif',
'http://www.plapl.com/up/smile/plapl (225).gif',
'http://www.plapl.com/up/smile/plapl (226).gif',
'http://www.plapl.com/up/smile/plapl (227).gif',
'http://www.plapl.com/up/smile/plapl (228).gif',
'http://www.plapl.com/up/smile/plapl (229).gif',
'http://www.plapl.com/up/smile/plapl (230).gif',
'http://www.plapl.com/up/smile/plapl (231).gif',
'http://www.plapl.com/up/smile/plapl (232).gif',
'http://www.plapl.com/up/smile/plapl (233).gif',
'http://www.plapl.com/up/smile/plapl (234).gif',
'http://www.plapl.com/up/smile/plapl (235).gif',
'http://www.plapl.com/up/smile/plapl (236).gif',
'http://www.plapl.com/up/smile/plapl (237).gif',
'http://www.plapl.com/up/smile/plapl (238).gif',
'http://www.plapl.com/up/smile/plapl (239).gif',
'http://www.plapl.com/up/smile/plapl (240).gif',
'http://www.plapl.com/up/smile/plapl (241).gif',
'http://www.plapl.com/up/smile/plapl (242).gif',
'http://www.plapl.com/up/smile/plapl (243).gif',
'http://www.plapl.com/up/smile/plapl (244).gif',
'http://www.plapl.com/up/smile/plapl (245).gif',
'http://www.plapl.com/up/smile/plapl (246).gif',
'http://www.plapl.com/up/smile/plapl (247).gif',
'http://www.plapl.com/up/smile/plapl (151).gif',
'http://www.plapl.com/up/smile/plapl (248).gif',
'http://www.plapl.com/up/smile/plapl (249).gif',
'http://www.plapl.com/up/smile/plapl (250).gif',
'http://www.plapl.com/up/smile/plapl (251).gif',
'http://www.plapl.com/up/smile/plapl (252).gif',
'http://www.plapl.com/up/smile/plapl (253).gif',
'http://www.plapl.com/up/smile/plapl (254).gif',
'http://www.plapl.com/up/smile/plapl (255).gif',
'http://www.plapl.com/up/smile/plapl (256).gif',
'http://www.plapl.com/up/smile/plapl (257).gif',
'http://www.plapl.com/up/smile/plapl (258).gif',
'http://www.plapl.com/up/smile/plapl (259).gif',
'http://www.plapl.com/up/smile/plapl (260).gif',
'http://www.plapl.com/up/smile/plapl (261).gif',
'http://www.plapl.com/up/smile/plapl (262).gif',
'http://www.plapl.com/up/smile/plapl (263).gif',
'http://www.plapl.com/up/smile/plapl (264).gif',
'http://www.plapl.com/up/smile/plapl (265).gif',
'http://www.plapl.com/up/smile/plapl (266).gif',
'http://www.plapl.com/up/smile/plapl (267).gif',
'http://www.plapl.com/up/smile/plapl (268).gif',
'http://www.plapl.com/up/smile/plapl (269).gif',
'http://www.plapl.com/up/smile/plapl (270).gif',
'http://www.plapl.com/up/smile/plapl (271).gif',
'http://www.plapl.com/up/smile/plapl (272).gif',
'http://www.plapl.com/up/smile/plapl (273).gif',
'http://www.plapl.com/up/smile/plapl (274).gif',
'http://www.plapl.com/up/smile/plapl (275).gif',
'http://www.plapl.com/up/smile/plapl (276).gif',
'http://www.plapl.com/up/smile/plapl (277).gif',
'http://www.plapl.com/up/smile/plapl (278).gif',
'http://www.plapl.com/up/smile/plapl (279).gif',
'http://www.plapl.com/up/smile/plapl (280).gif',
'http://www.plapl.com/up/smile/plapl (281).gif',
'http://www.plapl.com/up/smile/plapl (282).gif',
'http://www.plapl.com/up/smile/plapl (283).gif',
'http://www.plapl.com/up/smile/plapl (284).gif',
'http://www.plapl.com/up/smile/plapl (285).gif',
'http://www.plapl.com/up/smile/plapl (286).gif',
'http://www.plapl.com/up/smile/plapl (287).gif',
'http://www.plapl.com/up/smile/plapl (288).gif',
'http://www.plapl.com/up/smile/plapl (289).gif',
'http://www.plapl.com/up/smile/plapl (290).gif',
'http://www.plapl.com/up/smile/plapl (291).gif',
'http://www.plapl.com/up/smile/plapl (292).gif',
'http://www.plapl.com/up/smile/plapl (293).gif',
'http://www.plapl.com/up/smile/plapl (294).gif',
'http://www.plapl.com/up/smile/plapl (295).gif',
'http://www.plapl.com/up/smile/plapl (296).gif',
'http://www.plapl.com/up/smile/plapl (297).gif',
'http://www.plapl.com/up/smile/plapl (298).gif',
'http://www.plapl.com/up/smile/plapl (299).gif',
'http://www.plapl.com/up/smile/plapl (300).gif',
'http://www.plapl.com/up/smile/plapl (301).gif',
'http://www.plapl.com/up/smile/plapl (302).gif',
'http://www.plapl.com/up/smile/plapl (303).gif',
'http://www.plapl.com/up/smile/plapl (304).gif',
'http://www.plapl.com/up/smile/plapl (305).gif',
'http://www.plapl.com/up/smile/plapl (306).gif',
'http://www.plapl.com/up/smile/plapl (307).gif',
'http://www.plapl.com/up/smile/plapl (308).gif',
'http://www.plapl.com/up/smile/plapl (309).gif',
'http://www.plapl.com/up/smile/plapl (310).gif',
'http://www.plapl.com/up/smile/plapl (311).gif',
'http://www.plapl.com/up/smile/plapl (312).gif',
'http://www.plapl.com/up/smile/plapl (313).gif',
'http://www.plapl.com/up/smile/plapl (314).gif',
'http://www.plapl.com/up/smile/plapl (315).gif',
'http://www.plapl.com/up/smile/plapl (316).gif',
'http://www.plapl.com/up/smile/plapl (317).gif',
'http://www.plapl.com/up/smile/plapl (318).gif',
'http://www.plapl.com/up/smile/plapl (319).gif',
'http://www.plapl.com/up/smile/plapl (320).gif',
'http://www.plapl.com/up/smile/plapl (321).gif',
'http://www.plapl.com/up/smile/plapl (322).gif',
'http://www.plapl.com/up/smile/plapl (323).gif',
'http://www.plapl.com/up/smile/plapl (324).gif',
'http://www.plapl.com/up/smile/plapl (325).gif',
'http://www.plapl.com/up/smile/plapl (326).gif',
'http://www.plapl.com/up/smile/plapl (327).gif',
'http://www.plapl.com/up/smile/plapl (328).gif',
'http://www.plapl.com/up/smile/plapl (329).gif',
'http://www.plapl.com/up/smile/plapl (330).gif',
'http://www.plapl.com/up/smile/plapl (331).gif',
'http://www.plapl.com/up/smile/plapl (334).gif',
'http://www.plapl.com/up/smile/plapl (335).gif',
'http://www.plapl.com/up/smile/plapl (336).gif',
'http://www.plapl.com/up/smile/plapl (337).gif',
'http://www.plapl.com/up/smile/plapl (338).gif',
'http://www.plapl.com/up/smile/plapl (339).gif',
'http://www.plapl.com/up/smile/plapl (340).gif',
'http://www.plapl.com/up/smile/plapl (341).gif',
'http://www.plapl.com/up/smile/plapl (342).gif',
'http://www.plapl.com/up/smile/plapl (343).gif',
'http://www.plapl.com/up/smile/plapl (344).gif',
'http://www.plapl.com/up/smile/plapl (345).gif',
'http://www.plapl.com/up/smile/plapl (346).gif',
'http://www.plapl.com/up/smile/plapl (347).gif',
'http://www.plapl.com/up/smile/plapl (348).gif',
'http://www.plapl.com/up/smile/plapl (349).gif',
'http://www.plapl.com/up/smile/plapl (350).gif',
'http://www.plapl.com/up/smile/plapl (351).gif',
'http://www.plapl.com/up/smile/plapl (352).gif',
'http://www.plapl.com/up/smile/plapl (353).gif',
'http://www.plapl.com/up/smile/plapl (356).gif',
'http://www.plapl.com/up/smile/plapl (354).gif',
'http://www.plapl.com/up/smile/plapl (355).gif',
'http://www.plapl.com/up/smile/plapl (357).gif',
'http://www.plapl.com/up/smile/plapl (358).gif',
'http://www.plapl.com/up/smile/plapl (358).gif',
'http://www.plapl.com/up/smile/plapl (359).gif',
'http://www.plapl.com/up/smile/plapl (360).gif',
'http://www.plapl.com/up/smile/plapl (361).gif',
'http://www.plapl.com/up/smile/plapl (362).gif',
'http://www.plapl.com/up/smile/plapl (363).gif',
'http://www.plapl.com/up/smile/plapl (367).gif',
'http://www.plapl.com/up/smile/plapl (368).gif',
'http://www.plapl.com/up/smile/plapl (369).gif',
'http://www.plapl.com/up/smile/plapl (370).gif',
'http://www.plapl.com/up/smile/plapl (371).gif',
'http://www.plapl.com/up/smile/plapl (372).gif',
'http://www.plapl.com/up/smile/plapl (373).gif',
'http://www.plapl.com/up/smile/plapl (374).gif',
'http://www.plapl.com/up/smile/plapl (375).gif',
'http://www.plapl.com/up/smile/plapl (376).gif',
'http://www.plapl.com/up/smile/plapl (377).gif',
'http://www.plapl.com/up/smile/plapl (378).gif',
'http://www.plapl.com/up/smile/plapl (379).gif',
'http://www.plapl.com/up/smile/plapl (380).gif',
'http://www.plapl.com/up/smile/plapl (381).gif',
'http://www.plapl.com/up/smile/plapl (382).gif',
'http://www.plapl.com/up/smile/plapl (383).gif',
'http://www.plapl.com/up/smile/plapl (384).gif',
'http://www.plapl.com/up/smile/plapl (385).gif',
'http://www.plapl.com/up/smile/plapl (386).gif',
'http://www.plapl.com/up/smile/plapl (387).gif',
'http://www.plapl.com/up/smile/plapl (388).gif',
'http://www.plapl.com/up/smile/plapl (389).gif',
'http://www.plapl.com/up/smile/plapl (390).gif',
'http://www.plapl.com/up/smile/plapl (391).gif',
'http://www.plapl.com/up/smile/plapl (392).gif',
'http://www.plapl.com/up/smile/plapl (393).gif',
'http://www.plapl.com/up/smile/plapl (394).gif',
'http://www.plapl.com/up/smile/plapl (395).gif',
'http://www.plapl.com/up/smile/plapl (396).gif',
'http://www.plapl.com/up/smile/plapl (397).gif',
'http://www.plapl.com/up/smile/plapl (398).gif',
'http://www.plapl.com/up/smile/plapl (399).gif',
'http://www.plapl.com/up/smile/plapl (400).gif',
'http://www.plapl.com/up/smile/plapl (401).gif',
'http://www.plapl.com/up/smile/plapl (402).gif',
'http://www.plapl.com/up/smile/plapl (403).gif',
'http://www.plapl.com/up/smile/plapl (404).gif',
'http://www.plapl.com/up/smile/plapl (405).gif',
'http://www.plapl.com/up/smile/plapl (406).gif',
'http://www.plapl.com/up/smile/plapl (407).gif',
'http://www.plapl.com/up/smile/plapl (408).gif',
'http://www.plapl.com/up/smile/plapl (409).gif',
'http://www.plapl.com/up/smile/plapl (410).gif',
'http://www.plapl.com/up/smile/plapl (411).gif',
'http://www.plapl.com/up/smile/plapl (412).gif',
'http://www.plapl.com/up/smile/plapl (413).gif',
'http://www.plapl.com/up/smile/plapl (414).gif',
'http://www.plapl.com/up/smile/plapl (415).gif',
'http://www.plapl.com/up/smile/plapl (416).gif',
'http://www.plapl.com/up/smile/plapl (417).gif',
'http://www.plapl.com/up/smile/plapl (418).gif',
'http://www.plapl.com/up/smile/plapl (419).gif',
'http://www.plapl.com/up/smile/plapl (420).gif',
'http://www.plapl.com/up/smile/plapl (421).gif',
'http://www.plapl.com/up/smile/plapl (422).gif',
'http://www.plapl.com/up/smile/plapl (423).gif',
'http://www.plapl.com/up/smile/plapl (424).gif',
'http://www.plapl.com/up/smile/plapl (425).gif',
'http://www.plapl.com/up/smile/plapl (426).gif',
'http://www.plapl.com/up/smile/plapl (427).gif',
'http://www.plapl.com/up/smile/plapl (428).gif',
'http://www.plapl.com/up/smile/plapl (429).gif',
'http://www.plapl.com/up/smile/plapl (430).gif',
'http://www.plapl.com/up/smile/plapl (431).gif',
'http://www.plapl.com/up/smile/plapl (432).gif',
'http://www.plapl.com/up/smile/plapl (433).gif',
'http://www.plapl.com/up/smile/plapl (434).gif',
'http://www.plapl.com/up/smile/plapl (435).gif',
'http://www.plapl.com/up/smile/plapl (436).gif',
'http://www.plapl.com/up/smile/plapl (437).gif',
'http://www.plapl.com/up/smile/plapl (438).gif',
'http://www.plapl.com/up/smile/plapl (439).gif',
'http://www.plapl.com/up/smile/plapl (441).gif',
'http://www.plapl.com/up/smile/plapl (440).gif',
'http://www.plapl.com/up/smile/plapl (442).gif',
'http://www.plapl.com/up/smile/plapl (443).gif',
'http://www.plapl.com/up/smile/plapl (444).gif',
'http://www.plapl.com/up/smile/plapl (445).gif',
'http://www.plapl.com/up/smile/plapl (446).gif',
'http://www.plapl.com/up/smile/plapl (447).gif',
'http://www.plapl.com/up/smile/plapl (448).gif',
'http://www.plapl.com/up/smile/plapl (449).gif',
'http://www.plapl.com/up/smile/plapl (450).gif',
'http://www.plapl.com/up/smile/plapl (451).gif',
'http://www.plapl.com/up/smile/plapl (452).gif',
'http://www.plapl.com/up/smile/plapl (453).gif',
'http://www.plapl.com/up/smile/plapl (454).gif',
'http://www.plapl.com/up/smile/plapl (455).gif',
'http://www.plapl.com/up/smile/plapl (456).gif',
'http://www.plapl.com/up/smile/plapl (457).gif',
'http://www.plapl.com/up/smile/plapl (458).gif',
'http://www.plapl.com/up/smile/plapl (459).gif',
'http://smileys.smileycentral.com/cat/18/18_1_34.gif',
'http://smileys.smileycentral.com/cat/36/36_13_13.gif',
'http://smileys.smileycentral.com/cat/7/7_20_8.gif',
'http://smileys.smileycentral.com/cat/7/7_2_111.gif',
'http://smileys.smileycentral.com/cat/16/16_7_212.gif',
'http://smileys.smileycentral.com/cat/36/36_15_30.gif',
'http://smileys.smileycentral.com/cat/8/8_4_145.gif',
'http://smileys.smileycentral.com/cat/8/8_1_220.gif',
'http://smileys.smileycentral.com/cat/11/11_9_10.gif',
'http://smileys.smileycentral.com/cat/3/3_8_14.gif',
'http://smileys.smileycentral.com/cat/7/7_20_8.gif',
'http://smileys.smileycentral.com/cat/36/36_1_34.gif',
'http://smileys.smileycentral.com/cat/23/23_49_2.gif',
'http://smileys.smileycentral.com/cat/7/7_5_133.gif',
'http://smileys.smileycentral.com/cat/8/8_2_101.gif',
'http://smileys.smileycentral.com/cat/36/36_13_14.gif',
'http://smileys.smileycentral.com/cat/10/10_12_9.gif',
'http://smileys.smileycentral.com/cat/36/36_2_81.gif',
'http://smileys.smileycentral.com/cat/3/3_11_3.gif',
'http://www.7fala.com/vb/images/smilies/pic/14.gif',
'http://www.7fala.com/vb/images/smilies/pic/1.gif',
'http://www.7fala.com/vb/images/smilies/pic/23.gif',
'http://www.bh30.com/vb3/images/ns/biaoqing_019.png',
'http://www.shooq4.net/upfiles/vAI22677.jpg',
'http://www.bh30.com/vb3/images/ns/after_boom051.png',
'http://www.qatarshares.com/vb/image.php?u=35911&dateline=1294424059',
'http://gallery.sendbad.net/data/thumbnails/233/36_2_8.gif',
'http://www.hala-ksa.com/uploadcenter/uploads/07-2011/PIC-276-1310741712.gif',
'http://smiles.mmuz.com/data/15/a6rb_113.gif',
'http://vb.shmo5k.com/images/smilies/shmo5k3%20(17).gif',
'http://www.77d.com/vb/images/smilies/43346366kl9.gif',
'http://www.alayis.com/vb/images/smilies/41.gif',
'http://www.shbab-2day.com/vb/2011/1310809129_676.gif',
'http://www.shmo5k.com/vb/images/smilies/shmo5k3%20(57).gif',
'http://forum.kuwaitup.com/images/smilies/420.gif',
'http://www.lakii.com/vb/smile/5_18.gif',
'http://vb.i666i.com/images/smilies/114.gif',
'http://forum.z7mh.com/images/fisat/93.gif',
'http://www.funooon.com/vb/vmoods/images/47.gif',
'http://www.bh30.com/vb3/images/ns/after_boom010.png',
'http://t3.gstatic.com/images?q=tbn:ANd9GcRU4YV-Ag1ySMWWBMrDpMUFqqPtxHJGF9HSViwpJefhPRWva3z3&t=1',
'http://forum.kuwaitup.com/images/smilies/347.gif',
'http://lh4.ggpht.com/_V8iWfdy0lZ4/TKn2rxybiwI/AAAAAAAAD8s/B0DKVaMjmck/136-Smiley-www.ward2u.com.gif',
'http://www.lakii.com/vb/smile/5_23.gif',
'http://www.hostk.info/upload/uploads/hostk12978696089.gif',
'http://ae1.tribalwars.ae/graphic/unit/unit_spear_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_sword_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_axe_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_archer_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_snob_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_ram_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_catapult_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_spy_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_light_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_marcher_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_heavy_60.png?1');



var icon_smilies = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACoFBM'+
'VEUAAACvsrfb0bHNwJS5ur7Zz7DJvJSusrbe1LStsbbKvJG4sAuyqgrVzK7c0rKvpwrQxJ7IuI/TyKKU'+
'jQfDs411bwns4Rm0rArf0xK0rAu3rwvNwZvFvA66si7e1J706Rje1LDRyJ7VzBHKwA7c0RTYzqC7snmz'+
'qgv79Brb0q779yva0Jnb0RHw6l9sZwmwqA3CuRCYkBfb0bDe1bDs53Lt5nP26xf78xweHQW2rXTXzRGn'+
'oA0ZGASRigyxqBCooAiRiiLNxJzc07Lw6lz68xv16Rbu4hXUyRMKCgOlng3SyRGbkwze1KyEfgm4sAys'+
'sLXf1a6im1359TTWzJ3y6y6fmA/r4BTm2xSnnhAjIgWyqg7OxQ+jmw0gHgWVjgu2rgyelQbd0hWBew7V'+
'yovr3xTn3BPJvxCSiw26sV/LwA67sg7k3Jr49DP89BqwqAqlnQeBexjy5xbMwYLZzhKwpxCclA/WzBHS'+
'yBHOxA/KwQ7GvA7Btw28tAzj2pqupwv17DKFfwiBexDJvxbJvIgKCQKspA+FfwzQxhDMww7Jvw7FvA3B'+
'uA28swzp3RSxqAppYwmHgAeFfRyimiTMv5HOwZfKu5K3rTCKhAy9tA7Hvg3DuQ3Atw28sw2zqgqYjwh0'+
'bgqXkAaPhzbGvRmzqVa1rAqblAqPiQ2/tg6+tgy6sguzrAq1rBGjmguTjAmJgQ2roWrGuYaclCOIggl/'+
'eQuhmgqvpgqRiQlybAuOiAuJgjHFuIu4rHOUjB2mnQmakgt4cgl1cAp9dgtzbQp2cAmWjwiTjAiHfyK5'+
'rn+7r3mSii6Rig+YkQaXjweVjQiUjQaTjAeIgRKRijy8sIGMhDLGuo24rXeimVGTizeNhS6TiziimVW3'+
'rHrIu5CGgAqupwy1rQpMLoSeAAAAAXRSTlMAQObYZgAAAWlJREFUeF5VzFOzK1EQgNG9xzOxk2Pbtm3b'+
'tm1b17Zt27b9V85k8nLzvXTXqq4GACP/C0JIYgBAAY7ohQswAHGKK8nE0dqe23AaQISdZsPOo0qrCeM6'+
'cyFFIakcpnln+Jouqy0sbTfaeFAId+np5WBXXhHr5Obiynf3F+qwsanZJ8TvVEBgUDAvNCxci3hEZFR0'+
'THZcfELiVHKKSJaOsyjNzGrPyc3LLygsKi4pFZV9krIorlRWVatrao3qG/78/dfS2iYmATTs6Ozq7unt'+
'6x8YHDIYUYyNG0IAicmD0zOzc/MLi0s8zcrq2gaCRWbTVqNt23fs3LWbp9mzd9/+AwzJInro8JGjx46f'+
'MDipOq04c/YcQ2vx/AX+xUuXVfwrV69dl924qUP01u07d+/df/Dw0eMnT5+hDOQQff7i5avXb96+e//h'+
'I4pqfxKb2T5/+frt+4+fv36zO8GiXLJFL4kcAwCjSb1oDKwDMvtwyB3q78QAAAAASUVORK5CYII=';

var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL'+
'e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ'+
'REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF'+
'EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E'+
'rkJggg==';

var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n'+
'mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf'+
'mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf'+
'ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS'+
'TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM'+
'NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a'+
'zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E'+
'rkJggg==';



if(document.getElementById('message'))
  {
  // Smilies' Box
  var table = document.createElement('table');
  table.setAttribute('id','bb_smilies');
  table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 24px; left: 200px; ');

  var tr = document.createElement('tr');

  var td = document.createElement('td');
  td.setAttribute('style','padding:2px;');

  for(var i = 0; i < smilies.length; i++)
    {
    var img = new Image();
    img.setAttribute('src',smilies[i]);
    img.setAttribute('style','vertical-align:middle; ');
    img.setAttribute('alt','[img]'+smilies[i]+'[/img]');

    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.setAttribute('style','vertical-align:middle; ');
    a.addEventListener('click',function() {
      insert(this.title,'');
      toggle('bb_smilies');
      return false;
    },false);
    a.setAttribute('title','[img]'+smilies[i]+'[/img]');
    a.appendChild(img);

    td.appendChild(a);
    }

  tr.appendChild(td);
  table.appendChild(tr);
  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].appendChild(table);

  // Smilies
  var a = document.createElement('a');
  a.setAttribute('title','Smilies');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    toggle('bb_smilies');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_smilies+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

  // Report Direct
  var a = document.createElement('a');
  a.setAttribute('title','Bericht verlinken');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    var url = prompt('اضهار التقرير على شكل ربط:','');
    if(url != '')
      {
      if(url.indexOf('=') != -1)
        {
        url = url.split('=').pop();
        insert('[report]'+url+'[/report]','');
        }
      else
        {
        url = url.split('/').pop();
        insert('[report]'+url+'[/report]','');
        }
      }
    else
      insert('[report]','[/report]');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_report_link+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

  // Report link
  var a = document.createElement('a');
  a.setAttribute('title','Bericht direkt anzeigen');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    var url = prompt('أاضهار التقرير على شكل صوره  :','');
    if(url != '')
      {
      if(url.indexOf('=') != -1)
        {
        url = url.split('=').pop();
        insert('[report_display]'+url+'[/report_display]','');
        }
      else
        {
        url = url.split('/').pop();
        insert('[report_display]'+url+'[/report_display]','');
        }
      }
    else
      insert('[report_display]','[/report_display]');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_report_direct+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

  }

function toggle(id)
  {
  var e = document.getElementById(id);
  if(e.style.display == 'block')
    e.style.display = 'none';
  else
    e.style.display = 'block';
  }

// Stolen Code:
// http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/
function insert(aTag, eTag)
  {
  var input = document.getElementById('message');
  input.focus();
  if(typeof input.selectionStart != undefined)
    {
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var insText = input.value.substring(start, end);
    input.value = input.value.substr(0,start) + aTag + insText + eTag + input.value.substr(end);
    var pos;
    if(insText.length == 0)
      pos = start + aTag.length;
    else
      pos = start + aTag.length + insText.length + eTag.length;
    input.selectionStart = pos;
    input.selectionEnd = pos;
    }
  }




  </script>

  <form target="_blank" action="http://www.0zz0.com" method="post" enctype="multipart/form-data">
<input type="hidden" name="upload" value="ok">
    حدد صورة : <input type="file" name="file2up[]" />
    <input type="submit" value=" رفع " />
</form> </body></html>
