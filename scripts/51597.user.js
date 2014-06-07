// ==UserScript==
// @name           3.7香蕉人圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="香蕉人" href="http://a5556.myweb.hinet.net/msn/crazyfruit/">cf (0).gif,cf (1).gif,cf (2).gif,cf (3).gif,cf (4).gif,cf (5).gif,cf (6).gif,cf (7).gif,cf (8).gif,cf (9).gif,cf (10).gif,cf (11).gif,cf (12).gif,cf (13).gif,cf (14).gif,cf (15).gif,cf (16).gif,cf (17).gif,cf (18).gif,cf (19).gif,cf (20).gif,cf (21).gif,cf (22).gif,cf (23).gif,cf (24).gif,cf (25).gif,cf (26).gif,cf (27).gif,cf (28).gif,cf (29).gif,cf (30).gif,cf (31).gif,cf (32).gif,cf (33).gif,cf (34).gif,cf (35).gif,cf (36).gif,cf (37).gif,cf (38).gif,cf (39).gif,cf (40).gif,cf (41).gif,cf (42).gif,cf (43).gif,cf (44).gif,cf (45).gif,cf (46).gif,cf (47).gif,cf (48).gif,cf (49).gif,cf (50).gif,cf (51).gif,cf (52).gif,cf (53).gif,cf (54).gif,cf (55).gif,cf (56).gif,cf (57).gif,cf (58).gif,cf (59).gif,cf (60).gif,cf (61).gif,cf (62).gif,cf (63).gif,cf (64).gif,cf (65).gif,cf (66).gif,cf (67).gif,cf (68).gif,cf (69).gif,cf (70).gif,cf (71).gif,cf (72).gif,cf (73).gif,cf (74).gif,cf (75).gif,cf (76).gif,cf (77).gif,cf (78).gif,cf (79).gif,cf (80).gif,cf (81).gif,cf (82).gif,cf (83).gif,cf (84).gif,cf (85).gif,cf (86).gif,cf (87).gif,cf (88).gif,cf (89).gif,cf (90).gif,cf (91).gif,cf (92).gif,cf (93).gif,cf (94).gif,cf (95).gif,cf (96).gif,cf (97).gif,cf (98).gif,cf (99).gif,cf (100).gif,cf (101).gif,cf (102).gif,cf (103).gif,cf (104).gif,cf (105).gif,cf (106).gif,cf (107).gif,cf (108).gif,cf (109).gif,cf (110).gif,cf (111).gif,cf (112).gif,cf (113).gif,cf (114).gif,cf (115).gif,cf (116).gif,cf (117).gif,cf (118).gif,cf (119).gif,cf (120).gif,cf (121).gif,cf (122).gif,cf (123).gif,cf (124).gif,cf (125).gif,cf (126).gif,cf (127).gif,cf (128).gif,cf (129).gif,cf (130).gif,cf (131).gif,cf (132).gif,cf (133).gif,cf (134).gif,cf (135).gif,cf (136).gif,cf (137).gif,cf (138).gif,cf (139).gif,cf (140).gif,cf (141).gif,cf (142).gif,cf (143).gif,cf (144).gif,cf (145).gif,cf (146).gif,cf (147).gif,cf (148).gif,cf (149).gif,cf (150).gif,cf (151).gif,cf (152).gif,cf (153).gif,cf (154).gif,cf (155).gif,cf (156).gif,cf (157).gif,cf (158).gif,cf (159).gif,cf (160).gif,cf (161).gif,cf (162).gif,cf (163).gif,cf (164).gif,cf (165).gif,cf (166).gif,cf (167).gif,cf (168).gif,cf (169).gif,cf (170).gif,cf (171).gif,cf (172).gif,cf (173).gif,cf (174).gif,cf (175).gif,cf (167).gif,cf (177).gif,cf (178).gif,cf (179).gif,cf (180).gif,cf (181).gif,cf (182).gif,cf (183).gif,cf (184).gif,cf (185).gif,cf (186).gif,cf (187).gif,cf (188).gif,cf (189).gif,cf (190).gif,cf (191).gif,cf (192).gif,cf (193).gif,cf (194).gif,cf (195).gif</a>';

/* Smilies definition ends ====================== */

/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);