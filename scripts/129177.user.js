// ==UserScript==
// @name           SIS_MultiPage_smilies
// @description    SIS自由定制分页化表情
// @include        http://67.220.90.*
// @include        http://174.127.195.*/*
// @include        http://*selang.ca/bbs/*
// @include        http://*iyin.net/*
// @include        http://*iselang.net/*
// @include        http://*semin.us/*
// @include        http://*yinmm.net/*
// @include        http://*06image.com/*
// @include        http://*sexinsex.net/*
// @include        http://*yx51.net/*
// @include        http://www.yykdy.com/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2012.8.25
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==


//2012.5.8 常用表情默认选择
var modi0 = "1:4,1:32,1:0,1:29,1:20,2:15,2:0,2:28,1:38,1:33,1:9,1:15,1:31,2:14,2:16,2:18,1:22,1:11,1:8,1:63,1:13,2:71,2:78,2:21,1:1,1:7,1:42,1:27,1:2,2:4,2:17,2:12,5:12,5:29,5:14,5:19,3:7,3:8,3:21,3:15,5:15,5:0,5:28,5:3,3:10,3:17,3:18,3:43,4:8,4:21,4:23,4:14,4:30,4:29,4:25,4:28,4:12,4:16,4:19,4:13,4:0,4:3,4:1,4:2";
if (!GM_getValue("0_modifyIndx")) {GM_setValue("0_modifyIndx", modi0)}

//编辑此处可修改表情种类名称。多余种类可删除，比如，可以把“其它”全部删掉，与之对应的allSmile[4][5][6]也将不会被显示。
var smileName = ["常用", "洋葱头", "阿狸", "兔斯基", "混合", "悠嘻猴", "黄蛋"];

//下面是对应的几组表情地址，分别对应上面的各种表情，可增减，但上下要一一对应。增添的地址需用""包起来，相互间用“,”隔开。
var allSmile = new Array; //这里不能修改
allSmile[0] = [];
allSmile[1] = ["https://public.sn2.livefilestore.com/y1pMD09yaSHEcFhpuru0SwgJH5PC5QXkMgTReJLQBIqhwANB3G7yYaP2nVu1u4bkZD0SGg2lQdEP8dvdAZJnUaK8w/yct04.gif", "https://public.sn2.livefilestore.com/y1pezrt4pQS2tkhEpusFhLz5UHXEM__63b002_2LNqjDCZZtSySQNkoiaIRzi9Oq_lAJPsmRp1NHOAObYz8DA6ifg/yct03.gif", "https://public.sn2.livefilestore.com/y1psRgGWmy_sq5ZY76Oo0X1kHbwQaPiqTqjCL3n3CUFDrLGrwxKwzLxR5BqhkSrcSCBMYeXtTZL95OAOseYYG4tFQ/yct05.gif", "https://public.sn2.livefilestore.com/y1p6jwJV9Rg6TePt3hjGlnj6IAghlEyNTO8y3sXudsrc1ZriS1bR0FW24-ICLOGVoi5zj7KISVJSLyFTi9d05W8qg/yct06.gif", "https://public.sn2.livefilestore.com/y1pTqMH9s5ySc3vJKg2DsRS3ACuyguAJTfFONMHtmlrhNkGiMZ7-7qmbvaW2yr1S11oK6b-TqRHUdfMIKtAKPoJ5g/yct08.gif", "https://public.sn2.livefilestore.com/y1pmaLoJZ5ESk_1g-QPkWW4lMV1KInEvYXBpt_PFrAZLiks2d0qu6S9RYld0vS24kY6Y0njvJY6PpMsbz5Eu-m1Yg/yct09.gif", "https://public.sn2.livefilestore.com/y1pmaLoJZ5ESk-PTkzCr4peFjztDJDZ8FALFMH63_idTmydvRhlWRLfjNz5t79uAtsuq4MYv3Ye7BCbQ_1GIoLzeA/yct07.gif", "https://public.sn2.livefilestore.com/y1pEKzRB6-47mublHnAj05PAm3yzh2xaUqCjEYpfKsCpot_FTcOq-7PwRldW_g94OQzQ3YB2ESlHCZPhj5mdzGHXg/yct10.gif", "https://public.sn2.livefilestore.com/y1pEKzRB6-47mt-QRwf0ioliHG8nG1nQJwDIjukYc82HUmGYOZhWOLDx5IanPzsgypeXq58gBviOsmcuGYwbgVogw/yct11.gif", "https://public.sn2.livefilestore.com/y1pqlZLHyb-YCunEU2bkJBqqEtImRtkKzi8qXtagDow5BPkPWFmt4_LdvKtI0ZD-jVuG0AQJ55nF4OA_St1waplwQ/yct12.gif", "https://public.sn2.livefilestore.com/y1pqlZLHyb-YCshzH81hyMEFD3_WesuQqrwJnHBvDtjwdIU4nwA4GgHku0c97IeLoh9jVHaIdLBGNJSjDqpS6p4xQ/yct13.gif", "https://public.sn2.livefilestore.com/y1pVeBWQGx4QEPYgv3enfzOROoU7KFApXEcWk_h75JbTrSpBifKINRiJ35Zo7cJ5ulgJcBZR9lTiHnLdLleIzUglQ/yct14.gif", "https://public.sn2.livefilestore.com/y1pVeBWQGx4QEO-3UJonvMtmHx_ipIs5ixFv6jZfrC-duvGb_xS17pbEEmHn4AEF0_fvCovU4VWw6qtEss43YLpQw/yct15.gif", "https://public.sn2.livefilestore.com/y1pzDDZVf9ZI8J6WObnFltOnGm1tjDgdblOfBALJ05KDhZE2e575UY_Ziddzo2YRbTmhCT5rrLBQliz4iR8Le6-1g/yct16.gif", "https://public.sn2.livefilestore.com/y1pzDDZVf9ZI8KzCjcPytntLyb54H79XmvG9MSklkHTSwKdgk1lcPkURyvzV_YXO3QUAEGY5W6n5mB7LfvQarwXow/yct17.gif", "https://public.sn2.livefilestore.com/y1p-5AVZPP6TtsvSiXvH_TM2YoXnsS2lYKMsjS2ZKxvtnf2IWG4oyTqRIO4Dk8v8os28KETyYtHoEgfUh9QSH0nvw/yct18.gif", "https://public.sn2.livefilestore.com/y1pj_dBH1-qObRS6Ubl4AB2sXS4iMCr5n2EQjtkDlY6zz_YhI6YjBGPe2VbrNRocgZ5Bq-5PFrNLqj2LMlQlQJmQQ/yct20.gif", "https://public.sn2.livefilestore.com/y1pj_dBH1-qObTNHYug_MYsQhQqHkeIBWYPAaEzHtaw2A8R4uPGU9Xx_9YJL1qHiQkoi4Aa2-QKsWX5Sb3fkHX9hw/yct19.gif", "https://public.sn2.livefilestore.com/y1pSQzFSCvkh1mD321X7jRzKpXAk67mjImqpHy9-a1DRJ0ATZfioakNBhv8uGw-4NUbdMgTpaf_AQK_PZByRtvQMg/yct21.gif", "https://public.sn2.livefilestore.com/y1pshF-KdDo57FaaFnw9z_l2ZLRxr_1HSaJZI5EAqyTpPRBXydDs1WJmbU25QQqwTjtAaZjnlcOFwupKZIC6wTRLQ/yct22.gif", "https://public.sn2.livefilestore.com/y1pUh0qBVbc0nx51n5vR6dwoSa3apbX7PYK3CcaIdQmrB8swY5Mrz1HFGHc9Vkv7YLaZOrKHe1hkMR0YrcZvtWr5w/yct24.gif", "https://public.sn2.livefilestore.com/y1pUh0qBVbc0nysYez2LEhSJ_Vf24Xv-NLMM-Czka1HfVk5wv_f6M-9J_N7b0cKXiGJC1GpC9R_eHQZnt3naka8eQ/yct23.gif", "https://public.sn2.livefilestore.com/y1pvgvFeJRY3YfBBaklwSK-uT9PzRlLgVTuLR6TnWtrrvvq13ttzBf5TTjdk9qfORAHdrdDHHDwWAneM8iPgxMIsA/yct25.gif", "https://public.sn2.livefilestore.com/y1pwkrUDZqf_PBfYk7QxenGY5x5MsHZMsW0AYs0qcqOIgyfZg96uDq8lzAE2CKU8UBDvdoUx3O2q4aU17_PQa8FjQ/yct26.gif", "https://public.sn2.livefilestore.com/y1pwkrUDZqf_PDwrQPLDJlrGgNeBmWxhrh8ltRkoTA_7ZyiVJ5KiY6Yi275UTLhsqbd--WDA_1VAxKGfb35wDMnag/yct27.gif", "https://public.sn2.livefilestore.com/y1pTUvASApYN6Kz7wKgv-ACLsF2BQnYwIyTLPDPApylJ0HaBgxQ_oDfnWoNAmY38CfC5UypCH6R24L2OkDWAt_Vjw/yct29.gif", "https://public.sn2.livefilestore.com/y1pTUvASApYN6II0PvpEsGG8H3RQ8xf1f-Mv0bF7uE7ToZ5CS_oOkiqcTqbqijbZ_5rDIuRCavPb1hGRNSQGPK3Eg/yct28.gif", "https://public.sn2.livefilestore.com/y1pfnjierp7yOW9DVZ6i9guNcMZB5aeYSC0fKQwbQh-gzCsFyAa7S4Z7CfcDh6AhhlIDecy-sCNEwNashBttUbrSQ/yct30.gif", "https://public.sn2.livefilestore.com/y1pDmLdBrbodJIb85nVxc_lo-S_cPIThRS-3E8ySdxFnGLjpwmcJkP-p9m4S_JHa8o1rL2SBqIBiT_E6SaogktbxQ/yct31.gif", "https://public.sn2.livefilestore.com/y1pDmLdBrbodJISM-nhlK7uGSLKxuu5mmoJIcTUfJO501CN2N2U2MnambBTlcin7b75okmN19naA_-CmvsZfmH9Ag/yct32.gif", "https://public.sn2.livefilestore.com/y1p50GWsOxYZr-5gElakXLkMfFsXvswufF1-au8gylaUjAuChd_snC7CAnIJfOXOUy-y59JkeYWUD4hhe_fgnq2aA/yct33.gif", "https://public.sn2.livefilestore.com/y1p50GWsOxYZr9nnLehSPCTUBlFFBLc1VWFqH3ZhWiEJzSpgDP2_GjL_4AJOnb_qDajJr8XvoLE79sYEvTllyXseA/yct34.gif", "https://public.sn2.livefilestore.com/y1pUHVZed0ZtLfW0sZSVpzesNg6ulVmJp-Y5bzvSJjhTNBXcn2Nc_XtXn7QCxR-YzDdPg3UHkkqP-m61LBx9y8p1g/yct35.gif", "https://public.sn2.livefilestore.com/y1p13gSVYx2tQZCxZnB4qFdOwhhlByWCQ8xlWAtJzUz0hBqXL2w8Sbt06-eBApR5UGX-yZQaruoA8rkdZs5GTWfSQ/yct37.gif", "https://public.sn2.livefilestore.com/y1p13gSVYx2tQac163pOAJjNE9TR6wjXJuDo_19A7K152Vkf4vBxLFlBWWtS3x4umj0wKJJ-Vn5aU5akqCjSBnPng/yct36.gif", "https://public.sn2.livefilestore.com/y1p81SgynVpYaT0MacSdj4a_rFpsWRZUT8Pa0eGPpmf2IIZEQbO-r6TKx0N7csOmzXCxhxoVpcCVASePY2qTpuU-A/yct38.gif", "https://public.sn2.livefilestore.com/y1p1rIHBU3EvOvjed5yrxszdNqr50-dCuhzwpoOza7JdXidH0TmrFkQHuVY8mlHreQYLOnOW1Cmkk7OVVvbqTPDgQ/yct39.gif", "https://public.sn2.livefilestore.com/y1paVF-w3_3gYz1dmL-USbaA5O5v7_mXasTSquvrZFRF8OoP0dMVQz4QVhhEvKNeLZ37y3PHIb8K4x-Or8KxMTniA/yct40.gif", "https://public.sn2.livefilestore.com/y1p5d1PiBWWTzpJPSRNSoYjdf7TVDoDrN9jLjcpg8jzbNs6wfaDR0tYI4tPpgRLpvf8mvonwXQ2cK7UtbKvlH5lBw/yct41.gif", "https://public.sn2.livefilestore.com/y1pRT3nvzMImCEf_JqCpmkZxs8JFxI1MRj5ObfdgJq3_6jOInCu1A73FoRxmU7D6-TfWXKqIGB_2cLwHjoVOeL5gQ/yct42.gif", "https://public.sn2.livefilestore.com/y1pIpWx8mqx-W3XGk6uqfeDaWBTefB5yeh5k5OFH_k9ElfIfimg26Yejof3w_ONuIuDN8_ZHsgfoAzdp5Dt6xKO0g/yct43.gif", "https://public.sn2.livefilestore.com/y1pb9l28k-ZOi9SHi92GgPhPvF5vvy_X3ZN467PRQxb8BxgRttdBCSkeqL8tqtMowB_nRdM9BOEH6-_pJdo9p__VA/yct44.gif", "https://public.sn2.livefilestore.com/y1pb9l28k-ZOi-hvz1KEFJ2y2ndiGQ0Dg8TUSfqFkc82P798WMdeC1wyEa9_MO3OQGY3RPGtNxmWeTRRBig13h6zQ/yct45.gif", "https://public.sn2.livefilestore.com/y1pb9l28k-ZOi9UzYXqHGZSLluXH9KZKfPCU_FC5XR1YIcDnkJpGiwA8jQdmR_cejSMuIHRNY2J-NYpC4LsGlXa3A/yct46.gif", "https://public.sn2.livefilestore.com/y1piljphI_JeNqISy7XZpUAEWpiN3JrlkuYVgMZk_Jn8Ibb2Fq5eUyiFDs45FN9yXNaQVUhTihiKZUD56RJ7dPrXw/yct47.gif", "https://public.sn2.livefilestore.com/y1piljphI_JeNoqC3symWuYv9OBr1Zv8OdeQmVen5DonrXwaHElkaHcfM9ScHN24OPXKVJnDLe3EGlGmBrCqAw92w/yct48.gif", "https://public.sn2.livefilestore.com/y1pO9HbpqqPorIyymbVUJaw49Lng9P_8DPtcqKi-Ur7-g2eDmlqjaj1kJPO6uvyRSHJmwjG7wTBSUFZIwopW_LFSQ/yct49.gif", "https://public.sn2.livefilestore.com/y1pzLv__BYZq9U_KsztQHObifsWVRuM3G__WQkwdhOLHT9uGPwD23OX2O4rW7E3TqYUOMpLY6mMFR9sx7URgVtELg/yct50.gif", "https://public.sn2.livefilestore.com/y1pzLv__BYZq9X4KZV9nRJyhsvTq82HKko26NK0BHpHjAfWak2ynqBH-cKMalIQrAk6DTVXh_mI-wEPNHHnszEMRQ/yct51.gif", "https://public.sn2.livefilestore.com/y1pzLv__BYZq9XYDhMvs7gLW69LNakpRuakuvArTe_V9hiZZsulOtz6xSHskc7J4S7aKef3NC2Ejv9MmhagzMwi3Q/yct52.gif", "https://public.sn2.livefilestore.com/y1p23P1MHvLfTK4zeZaoUobybox3qgnY6S0xSgUUZY8m5zwCWWp3ciwbUsxhv2qYQjVsJHtL2fQTpcu8juyvDzy9Q/yct53.gif", "https://public.sn2.livefilestore.com/y1pLObpoGNe__9t10Qrg1hdypTOgcWpRVP8eIzCICEt9ogrcyvaoeWnpnQNLVywLwdB0uvirViUvsBvz6pf39i8aw/yct54.gif", "https://public.sn2.livefilestore.com/y1pbGewD6CgmAB4Ie0yG8lvyHd3m_k7MDjglPI-xdQMORyH70rl4xx9aLAkTNJ-jAxi3NiTtFmlJ-QbjtWtqurG-g/yct56.gif", "https://public.sn2.livefilestore.com/y1pbGewD6CgmADPvaa1OEhumKk01FAxzY0TK6DRDaJQ4pYWLnWAI8N4mw0NG4rSsqvvh985uvGs_RxV2YnNNeQmcA/yct55.gif", "https://public.sn2.livefilestore.com/y1pVE1Rlqx03dsZi0Hjx71tHZsNuRdnLUpiAD6EvFwCeFDbfVV8-pcN1RBJS4HNM6cVQnqKaQa3fUtqONqsIygEdg/yct57.gif", "https://public.sn2.livefilestore.com/y1pY-Jgp5Vd9gTAm0rp83cupvdPku9gUIeLUs4pLNNyphsuDZgmxy7C8mFTzPLCn4jB8kjHcNoiNQPVgVtqhdzT2g/yct59.gif", "https://public.sn2.livefilestore.com/y1pY-Jgp5Vd9gTe2HNFktn6wFKxEn_YdJO6ZH78747E8iRFgC3bXC_lL2gsnZd6yR6i7RGKwjklqHPaPKgcvorbVg/yct58.gif", "https://public.sn2.livefilestore.com/y1pd8Up0ptQgvXjxbN8WrViGcd-w2lqQhIGlmyqMY3Nk6orBLFy9BASUDJ23zbdXKo92Nt5YKiAAgSUPcRU3GkvjQ/yct60.gif", "https://public.sn2.livefilestore.com/y1pQRPiLn_bzLCaLIvO1BM1_gjBUiCysqkXsBSPiGhfC974586u_Hq0ylE2Cv-b8SrFTL1JW8osXk2iqqw23SAA5A/yct62.gif", "https://public.sn2.livefilestore.com/y1pQRPiLn_bzLAoUxYw2aolby7aanyuqxhqyvzqpuOGPo3egr2zu2ShFx2fdAjOeaYzC49xpEMESnHczpuP62upTg/yct61.gif", "https://public.sn2.livefilestore.com/y1pRWuRsbq-o_9DTcil4tfkj9omP4oL9WVnQgzg8UFyw4VOYSRPQnoSmBEzkNvj4KoIrbCAh6Kb8XvEJvCN9m6cbA/yct63.gif", "https://public.sn2.livefilestore.com/y1pvB3uzfPPieho6xEdgcxzNl8evXMfHtShhSnm4BpYGemErX1Kd02sOB51VJ9lt6vydEBmqP5CLtkK_J7tEYhtRw/yct64.gif","https://public.sn2.livefilestore.com/y1pqTGFZ3du24xSMHssKBf9G1_fwodVP7b2713DSmViw9o4h1EL_3zoJv4FX43CXhMMW0W11yn5UzLjb84NroEWkQ/yct01.gif","https://public.sn2.livefilestore.com/y1pTnchFW8vkgqHN72jHuUw14bhkay_DzdLuJZ4ncug1RCJPJomh6yzK0WXnnnd71G9tVBu2RRxG4uo0sX8U2OG3g/yct02.gif"];
allSmile[2] = ["https://public.sn2.livefilestore.com/y1pVTah7qVmY9Lvvgk86FTg59oMfwMEkQoW5lUyD_LlnBqwWhFfFj5EOHiSzsz4rETgt_G4c4xpLlMMft3yamvfbA/ali01.gif", "https://public.sn2.livefilestore.com/y1pbUEmk3ANofLsUNI1NhZhVhPEEcMfjvTD9x2r8nPfpVLvY7RGp-EhQN-14GNYYWgF22KNKklt2Miiqe0kp2yxJg/ali02.gif", "https://public.sn2.livefilestore.com/y1pbUEmk3ANofJI5YJEBoP8SfBm2dzCkXeinaLx0iAnqpmKXX0ppDueN-vXvS60uWu_g1lJBK1eAU8GCrO_a2cRhw/ali03.gif", "https://public.sn2.livefilestore.com/y1pEmP6lkJ0bEmX564jQ7FQDq-NK7kV0ybGoziOfn7QmHj2M1Sg-777BFvbuY9o9v1Qb-_xojxb9B-IHFUnvQk2-g/ali05.gif", "https://public.sn2.livefilestore.com/y1pE3dus7DbZtiJSzrbt_nznH-DyKtXPB77h67MzdXLg1S78vIYBjEHlKgMTEW7f7DaRTQ0knwYCaaIGyUa5oHziw/ali06.gif", "https://public.sn2.livefilestore.com/y1pE3dus7DbZtjG0-fzp_IyyiKxopY417qHoWCfOs6XB_sQXX_EBp_u4AWPkrYhMm14RF__EftqoVExA-SZcKP7rA/ali04.gif", "https://public.sn2.livefilestore.com/y1pE3dus7DbZth-YOTJXEoFz3mkSNpjAPTTypk6s634KV1YaMbLFgXHNoSlD6zN4TVfcczehsrxen1564w15curEw/ali07.gif", "https://public.sn2.livefilestore.com/y1pjXfZcNUFPDqZpSvJ8NfYzRlNgkztzMquCBxf6lVqrJNMW-Sz5Dt-kXxyWbg485WKRg-78ppKho6qnaEPSwB6Ow/ali10.gif", "https://public.sn2.livefilestore.com/y1pjXfZcNUFPDoXitR-z13nsl-5CZiYzLNkg-aEVqiZbKXC5ZGO4vEln3BHuUxRka0ChrZj4RsSq5zXNRebwEkYQg/ali08.gif", "https://public.sn2.livefilestore.com/y1pjXfZcNUFPDrNnBJzCmLnvK7pILOZ_fy3lHHzXgMKO1Q7kpzLThLr6Sl3AFRU_3R-HLF76b-jyFKzrzUU3hSdEQ/ali09.gif", "https://public.sn2.livefilestore.com/y1p5Qm9QvTLnQP2IX56kS995W0xlI3e0SFqmX84uLEcXFOlk2Ue1Vvhr_ilVbMAp9W049Un9jEch7DrhTO7efQhQA/ali11.gif", "https://public.sn2.livefilestore.com/y1ptWhqZPp_shNigw2QnivLzfRtOOrXo24D6DhdetEaf0z9v83ufwcGvEf9WeB-YoNP4_tcHCzKuugzralhcAa1BQ/ali12.gif", "https://public.sn2.livefilestore.com/y1pABdWNSbTjkj439cNUUq2X29tH4_trgrU5TN2Lp3QLSjHlA6MRiHNp1WvHCAC1iF_FlSOO03c20zhhNbR4cRJNw/ali13.gif", "https://public.sn2.livefilestore.com/y1pWcvYVOJ3hdkHreAhBqraNJOFYbx55LNKHqJUiJBhxXkgeXLl_F8zrJNoqi9E7-1xp8l5T_DgSzDhURV532g-Cg/ali14.gif", "https://public.sn2.livefilestore.com/y1pWcvYVOJ3hdlLtBvTYEi-DBYt19y123IlbanVD2jvbICy92Ri7stUNq9120fTP8wrB0T3zRg38cOwzBIRPYrzXA/ali15.gif", "https://public.sn2.livefilestore.com/y1pRb-lqxVT5R1Ik4McGK6ekxSD3_lMIFtWp91VfpivToQ1Kszck_O8Sm7yurh_ysEKJmX3vDYvhZOBUuEjOw-7gA/ali17.gif", "https://public.sn2.livefilestore.com/y1pRb-lqxVT5R1zyPSlBQgXInYHjYQMPIf-Khv8quK5fNup4BoZPSkFI9IDkGJgOLPH6ByO3UwUxXxj-ZtMuqvlVQ/ali18.gif", "https://public.sn2.livefilestore.com/y1pRb-lqxVT5R2h_YiUZu98IaB8G8Um1dsNCQN0zNN6g-_FCmK9aIIS3J912MDkCVUXqfDuPcqjOz3KSd1HJcinUA/ali16.gif", "https://public.sn2.livefilestore.com/y1pN0w5aZ2dRzLwzsyifhuxbNF_0JIrKOMxOhDS6df8nuIWXUNtODK7Xa95ixX43eDX08oqIPfhxME5uy9_HnO-9w/ali20.gif", "https://public.sn2.livefilestore.com/y1p3m3osQPukPescy8Ns3GQUK4CfWjdSn0qbo0s6i96b5JkhaUKdGkujZtjKl-iG9mLzg1RH4ODuFxeJKVqeJ1AnQ/ali19.gif", "https://public.sn2.livefilestore.com/y1pUIt4pBGWEy-bZXuta_nYUxlUv3JoTvGkgGcHf4Rr0LQpK9jdb0d9jV6VnBG3yu8ud7OcU-DUoWUp5StPJ8SCEg/ali21.gif", "https://public.sn2.livefilestore.com/y1pwZ_6MIq7PBo0dKajUZ27EqYQIvCSYaoFrUdpFKIxztumB0hcfKkRmaOa5fmwZ8MY_w0fgz1pDw35Up7EGgtgOg/ali22.gif", "https://public.sn2.livefilestore.com/y1pw8879kK5tLZSO-M8la2dfIPZp8eEx2NyWaybPL56uzye0Ovyy1tvdxBqPExxTzoW7uidCZm9_V71MRLBmlj7rw/ali23.gif", "https://public.sn2.livefilestore.com/y1pw8879kK5tLbM2UPzH237zx5jkJaC28dpekPQWpod4R09uuqffCx4KRz-vLwsSc6XKtkuBUi4vjtPjWuOshexCA/ali24.gif", "https://public.sn2.livefilestore.com/y1po5V1jWopupjtXqcP4SJstG5odxPO-n0V__sFmQDnaHcH28WEwkbRfuurBCbYX54qlSZxVnMW-IANvwtRqX_YoA/ali26.gif", "https://public.sn2.livefilestore.com/y1po5V1jWopupgzMt8f0m0DEBJ6NxAtRgy-yDi9FMtJ8MqP_n4kh71DF_i7zJZtn6pI7-b8fF6EPimApESJklIB4Q/ali25.gif", "https://public.sn2.livefilestore.com/y1p-6lTyqS_anHUO-QVBPH07WvNJZS82Rj4NYM_obDQYrNTSwm5V7H3SNOvSKW0bXEUqu91ZeOnVQtjhwzP13xLwg/ali27.gif", "https://public.sn2.livefilestore.com/y1pvJc4jfYfqJ5DYfU_6q7uQv-HeZXcram7W28C8uhXllsZt8a9P0uWOI4hb36M9vJtRY0A0d6WDegMxkxu0VQ3Xw/ali29.gif", "https://public.sn2.livefilestore.com/y1pCVmhk96gVaOceZydT0V4rhU5qUa1AUvY5THnIV6il556OFrgbR_oyuGwwtXpuO6yzY2Igj6BzchUNAvL1Dk7vQ/ali28.gif", "https://public.sn2.livefilestore.com/y1pCVmhk96gVaNp4wM1TtpAPnGsF98oX1pvKh4jMeAJA8VnJQ2SDxQDjCg410YGsR5gbyobYe4ZGwceseciY_-zlg/ali30.gif", "https://public.sn2.livefilestore.com/y1pWqnOgXb-CSOg1npsrdRNyD1zjAYD5uLiFxNu_V07oHQN4pNwwAemeWQ9htMXWF_P6Aq9HIOhYJtPsGjuZTZyWA/ali32.gif", "https://public.sn2.livefilestore.com/y1pbrW1C_P4a0JXfaIQDsZHTNmp6Tl1gB1r1nsbfinRyL9s18L2SiqG6UkAHdbbZ5tI_wWX2ksoQzXOT62bzeXbcQ/ali31.gif", "https://public.sn2.livefilestore.com/y1p9AB3s05PAe-UtFRrpBad-1qFWgTwRiI-bVS6ag3HYjn6h8Incrtwp424HJ00enPWUQeXMjC7E0uLy8wcjYIhLw/ali34.gif", "https://public.sn2.livefilestore.com/y1p9AB3s05PAe96L4FtjzzLNPkyoDFvaJMLt2ci9soBc2vtJ3DQniklb-1nEEoQMbihgQPEY7p8Yca8cYieNG62_Q/ali35.gif", "https://public.sn2.livefilestore.com/y1phnPfW-ElxRXP1wAngfRRMYYYuDEWo3oDCSru0I6edmAv2CRr2fUBp1w_r8x_bV23-Xheeou6NUOqc6lrmMmCDA/ali33.gif", "https://public.sn2.livefilestore.com/y1pqW8hgDc2HLHbKEgFd35cbPl3HJJeNihV6WVAW2BxrEohLQLugTsIbrr1et0QevfgBnQ5zWc0E0Na2v7t_5ICSA/ali37.gif", "https://public.sn2.livefilestore.com/y1pqW8hgDc2HLHpZO96K3awMHoLkTBTVtRKwbbDQq32rdV7ZGwvGOhCCjDrz4pvh3G3JiYlUXlmv-jncpixEdnmbQ/ali36.gif", "https://public.sn2.livefilestore.com/y1pQsmVi0S58eSzctC26aeEPH3PMdn7InNBY3w_Zf2pP-1EGYbmI1UUpgs4ntcYXMvpEDw4jnIG4j3qYSq9GqrZRA/ali38.gif", "https://public.sn2.livefilestore.com/y1pXtXfxDxIcYE72fSNO3MG6KfHMM8z4EnYD2bieO1uulFfiGWWTeLaYQrTbNeXpoPgR8gGsZ2pP8A5ertha7Nsmg/ali39.gif", "https://public.sn2.livefilestore.com/y1pXtXfxDxIcYFcLYhhJdYPqCn6H55n16VVicHVe8JyeMu8Fvlf_YKVmjlJ3jA1w10bIBvTeBIhXnms71Bb_0kzAA/ali40.gif", "https://public.sn2.livefilestore.com/y1pG21Dx6BPzqZPMX-n-9rlInm7sPOP0pb5Qh3SP0bnrpOzfuuiaApdwLzicwOb8SI7PvhXn7zWttkQ5d_O1YKa6g/ali43.gif", "https://public.sn2.livefilestore.com/y1pG21Dx6BPzqbt21gLRhWrLLGVopYKxEiRDnANdOiTx9Cmlv84tT1ommwPnIZOH4fGt0kHH15ryxBMR44dlPzXvw/ali41.gif", "https://public.sn2.livefilestore.com/y1pG21Dx6BPzqZETY9NNoakNlMO_E7lhzIhTIvW4EEDccg6TBF6cRXPBlRoDNPppOS9VO3N6iN5Dv2BfvJX_NPEgA/ali42.gif", "https://public.sn2.livefilestore.com/y1peHOkMA_tP6e8DsXJqWLKB4p7uUX1Ez3TsnGvv8KmvU7wueMJ2rjG6VjCLfDZ9oi2H3vWgBMQ3_vVz1tmDJsYHQ/ali45.gif", "https://public.sn2.livefilestore.com/y1peHOkMA_tP6ciTxreLb8DjyrwpuOoWlOH_c2Wrgver__WVKd9kZSYmK8XeDegcTDiHKgl1_2vb8bpwLyxGfN1AA/ali46.gif", "https://public.sn2.livefilestore.com/y1p2W07WG77REd4v4kzo3IXXJM6BVWqHWp_MO2UrBpDAqyUJHK4o307wCrQUIoho6xCAGdM6WEGQPjjUO48B5X5YQ/ali44.gif", "https://public.sn2.livefilestore.com/y1puzgsAtHM832RcUMedQn54OAL2NPsjGndoRGyv6gYURrrtJTLyRxRm4Q6VKUacvtGFir51kO0_KGQwqUIsSyb8w/ali48.gif", "https://public.sn2.livefilestore.com/y1puzgsAtHM830P_TYRPbYjEAApWRgiO1T3u22UzhAfQhBbopDbSdk_Ops-lOSPidqJZIWAgjO3fzzBx3TZxrL1dQ/ali47.gif", "https://public.sn2.livefilestore.com/y1p-yrYhMhGoxeGCX686N7ntOxXcpCzwnzCLAj4c605yQfU13bsXdKKZZibtzOHv1htIQ2FIZLPemmWilr4dMenLg/ali49.gif", "https://public.sn2.livefilestore.com/y1p-yrYhMhGoxfJEQV3939a5pBHCgT0oRtKCFNOmdhDZ8xXsVUIIrG11y3oQr7jLSip7ejCvRa9kJSywvwIt57HjQ/ali50.gif", "https://public.sn2.livefilestore.com/y1psEFUNWZvtaziBt4mHM93syDz3O0b9VLiCtbQ_XZT8tZjH3wZltb0auS_k1eRH7uc5mDQNpy7t0PYqmY3GkidbA/ali51.gif", "https://public.sn2.livefilestore.com/y1pv4OAoB9kG5Wheo3N_jAWZJaCTJY7AutVsGKjeef4osH-H3xfzz_4wAiDHVul5h0maVAafwhvC-eNWdu4TzNrAg/ali52.gif", "https://public.sn2.livefilestore.com/y1pxAdiryC83L3qEj3nZEf4IXsRceIOLiGjRGUEBL1HpZGPl63J72Rm0pxOf6uJLhnlQXq_JSGMLCW4iogoPsZzrg/ali54.gif", "https://public.sn2.livefilestore.com/y1pje6NzXErbrGHc9-TWR4ARq8RanKZd3n3hJ4OxTIVpi7uQjA04Jt95yY4epvjo0kB8aPa2xyAnTXxMC0sPfZg4A/ali53.gif", "https://public.sn2.livefilestore.com/y1pEcwxoSUW8GfzBN2W7QfZBD8hrLv9QqybywbEO1qtAGtvwu51-jc4Ean2p58FBYUcn9g1lmWffBfr_5vkg1ykRA/ali55.gif", "https://public.sn2.livefilestore.com/y1puqFvjleYWdhX8BPgCDPFhL_OA_mG1BwrU2S-xV0YX6J-DIY9BHprzAd0TiPkUM0pMI9sUk0uiudpYBMhFbzIAA/ali57.gif", "https://public.sn2.livefilestore.com/y1psuSOlK8Cp8SVn6RJqr37ClJfaHI5V2jEFQgHA2uianzuBQBNIwV-ke8pgTD4TB8mXRO98bbUJDQk9ymsfG7dXg/ali58.gif", "https://public.sn2.livefilestore.com/y1ptb8WSnOfWb9odZo0E59pSXlbFbZc5MkeGgfqQC4bUQWxaXkoFP99iXbOQSoNPVFxd8OYBMwYEqKwYteKAHDO_g/ali56.gif", "https://public.sn2.livefilestore.com/y1ptb8WSnOfWb_aZ2x7uop4Y_rwufjb_6bV1XuxAeKqiiA5r-h3gnRLKl4g1G_RmXMSlSdZtK-kyA2eJywzc92jVA/ali59.gif", "https://public.sn2.livefilestore.com/y1ptb8WSnOfWb-n6tjRb453ViBethca1H2SrpoLcbtTILaoCox6UI_A5RZDAKM-6MGP1YIYXVQKud6vZwhMF-ApPQ/ali60.gif", "https://public.sn2.livefilestore.com/y1pw0xJlbR9CqnQMBqPbI_5KKzkT7Qf5xvKRXRDUHDU2q8g7QI1BOD72MM-aR5Fm7oVItD9Dr9yc9e9uUEInPbujw/ali61.gif", "https://public.sn2.livefilestore.com/y1pd69zplZ8yrBPnoOKBYbk8xRWqzYpQuIbyZZleoYqvHD3CkI9SwcvEBJh5pMwtfNzcjzMyhlgv8iKy9y-c77o6w/ali63.gif", "https://public.sn2.livefilestore.com/y1pG-dQpzwjQZ71JwiZSYR2yIbzmhgVfyo9jr3DAILEMO07W5hvcIJlaTjqW6762Ke3yLq16w-Zr-VzX-1q2O05aw/ali62.gif", "https://public.sn2.livefilestore.com/y1pE4zwvfyRarZDMOjG4-Jo5tTy54I7FBsQ7V_SYRFlbkaETRUrxJuoHH9APGiVuw1ytqQGhLvx627Zh5oC3A4DWw/ali64.gif","https://public.sn2.livefilestore.com/y1ppF_g_BU3F88OvJFHL2FC_DaX7cplEmQjZvZbCsVSNLqZrnXZp78Y8ZVvB8GooB-F04aZCOUgEnondg13UhWkAA/ali67.gif","https://public.sn2.livefilestore.com/y1ppF_g_BU3F8_72HQ7bkyxqLU5xhazR-b3Z699C2YhZv-Ka-Acb6G0Sf3xPzj-jkj-p_mH-zgZSusg49iwDxWruQ/ali66.gif","https://public.sn2.livefilestore.com/y1ppF_g_BU3F8-mrEfM38g97WyFnoF0vmToW7OtmMl-LUJqwExawqq90wfeV1_H0AasmXo3-RZDD4D3hFQHWd_m9g/ali65.gif","https://public.sn2.livefilestore.com/y1pTprRVLPhaC8jeoCQzhPbJSRleMVf3eIAW2Gx-4Ja-Z9gCq2Ybs2S6FuS4ld5O6PHKo15vdXanhvCtN2vrUWguA/ali70.gif","https://public.sn2.livefilestore.com/y1pTprRVLPhaC9jpwWTnHTWkaSu-3YiMTfqppnRo2HzGqipgoOzPeugqak-eENffix-jiq5lMpypjz3mnGlQk348Q/ali68.gif","https://public.sn2.livefilestore.com/y1pTprRVLPhaC_TIs6gAYEyDfpbFXCBNW5AdS21KnlKJPvo_B6jyA1Zch4x8XPFZDSDAchxbIrPgeAAzJUCcxSItQ/ali69.gif","https://public.sn2.livefilestore.com/y1pu2gU3URp6zCE1bZpwhDFmZef_TFTlZfTCabkbfgFijzsmoEaobjas4b-C5C8LsJK3unQbt8PttuRTbBsdTRVTQ/ali71.gif","https://public.sn2.livefilestore.com/y1pEXVxPKpSs8snVRgLUko1wHp4oVh67xW-5xEXtkoaUV3Dx8rJ5XwzvTovOPTzy0gvAnA_c5619ZvjdfSOR1ng1g/ali72.gif","https://public.sn2.livefilestore.com/y1pEXVxPKpSs8tF4jiLJ5ANkRTAcbTildkSG8CTSSqoeYaYc_vamDJEuwlBiMOtXIyY2VO48Qn7TibQNSBU72YnTQ/ali73.gif","https://public.sn2.livefilestore.com/y1p6xFRYMC6Oh7XYJMnH5yOmpVs5IZuJxSFHG40dka7BIYv2i9fZGmk-FHzwFRoNknbNF9laD72hK1A2bNDgYoi9A/ali74.gif","https://public.sn2.livefilestore.com/y1p6xFRYMC6Oh7jpmNWHnsqfbLuYntWQFRno8mzmYBuU6TKMS1bbzUtKPRheXMV1L4TrdYFUTjSwKFfOZ6tFIxSvg/ali75.gif","https://public.sn2.livefilestore.com/y1pjOvbXDNk74caVhvOQdPixEMSP1HuXtglLWQUPRfjkBTSx8eofYa5EXTXOwO6ogr6BCsX8NO1Yuj-vDxjqu27Fg/ali76.gif","https://public.sn2.livefilestore.com/y1pt6JWHHqM21WgaCBfi4sADCYnY_olX_TVX5e5YLssJHfkr3eBdQo_02FKd7AF1yXThCYdEhYe6BDrNU5fAdttxw/ali77.gif","https://public.sn2.livefilestore.com/y1pt6JWHHqM21XsAVHWHP3AdfmeJ2ORHaf9DxoxowtrHfM1AJ3sXejvQsvOJV-sx5FdtOJrcJo80LoUWV04qQDFvQ/ali78.gif","https://public.sn2.livefilestore.com/y1pFoKaYBIS-hx1G4lwadexV5RsoMOkcB-77GfFylpgqjhTIfaYhtviZwN1oxRziYS7z768A2nRcPmvos-uoX9uLg/ali79.gif","https://public.sn2.livefilestore.com/y1p3ZoVhxROeJwST5wpipF_HYIehAz3baA0rbmA48vjT9xfqQEx-KRFbdTwpDcLeWKvyLO3AfthoNxJUsAB7GxPHg/ali80.gif","https://public.sn2.livefilestore.com/y1p3ZoVhxROeJzwVXnjF7F0H49y2UXxrKXxzuc9xyg2_jNYjBnJraRS-d6uVY4MK3C0Ang1wkSCVeEXp4tNOHk9Ag/ali81.gif","https://public.sn2.livefilestore.com/y1pYVwY1SkFKUZJGMVbEBAdhV-FG_ofD8M1OtCll3fk6irQBf7t9J-Q92HqGqqezdfX6eGMva9LAx8eUVETOPDCHA/ali83.gif","https://public.sn2.livefilestore.com/y1pP_P8NE9NDrvux8_Ek06S2wPbTIwPJSUJsJ-7JUhRTgNxtP5cqjQdOd6v7dd6BK5mDRgDwCv92zWQyJaF1FyE_Q/ali82.jpg"];
allSmile[3] = ["https://public.sn2.livefilestore.com/y1pRgRZfIWEB3gdwAOnJSKxl6_mbcUwQVbZg3UxPIg3ugyCANLwhJH_4EiBdNktcd8JGg5f_Eoee502s-O5ahGcBw/tusiji02.gif", "https://public.sn2.livefilestore.com/y1p6T8uWp7cKvOnwXzTECC7FwUAI6_HbsHPKCb-68IheriuPCW9B7pivDXga9qyq0boeyqmLSwhWbGAxeL70qnWjg/tusiji01.gif", "https://public.sn2.livefilestore.com/y1pXMmQaPqLr7NYA3WGWbZ1b6F_H0z54ot-9EXKfB88Psho_H8J3UDcUOk8yEQAShF9tkx01YKdHWZfH9E54o006g/tusiji04.gif", "https://public.sn2.livefilestore.com/y1pyg7iepVL5PbuZZAAL5ZWKRQgkShGk0cNsLNXQa3qbuP7HnYrORUhI1urb0OxRDaGnTQ7C6hAXrcmGFWKs8ejxQ/tusiji03.gif", "https://public.sn2.livefilestore.com/y1pDN9sPsaOIGGOEJcqprodc6iFCOgNTuZDdIjxixctJdIvmdtQpR4W_d0eeponqPAEpdfErXcEGYudkPtt1CCb2Q/tusiji05.gif", "https://public.sn2.livefilestore.com/y1pkgIQkVrQpid4HPFHqyvexsd4UvwgffI8TBIWVVt8S5EfY6ANouvUOxShyol5IIqKdIti4XKKaa7jy3-axTmyHA/tusiji07.gif", "https://public.sn2.livefilestore.com/y1pkgIQkVrQpifeotR0GsOeseyOuqvcOyQBPZLDTjWxzvIvO-wnsBq3mBtmxLSCCI1J3pQumih4z-I8eCvGnisLwQ/tusiji06.gif", "https://public.sn2.livefilestore.com/y1pkgIQkVrQpifPkYkolfGXSlONvDztGcrNb82Z18sdpp0vX44qZNTz29ht3iASm4UBpbTDzgc-YqW3Z0EZBVivkg/tusiji08.gif", "https://public.sn2.livefilestore.com/y1pklbGMnKFv4io5jmuIT8EiafQxDrkQQf0b92Po9e3uzESvwV6FUmUaaz4ZYRo7b2_pFzFZpmiU_xZRTnoASR7NQ/tusiji09.gif", "https://public.sn2.livefilestore.com/y1pklbGMnKFv4jIL7tn49KxMtDg89nH_BRMSsJtO-Re-MWcLTS0X5zZvTlLnaJ1C1wq2nk9NFm6muH7rADXhCzPcQ/tusiji10.gif", "https://public.sn2.livefilestore.com/y1pklbGMnKFv4i03RQIj0v33qrjHNzzpvwAV-JYr-vN9MGkubPqt0qgBZpIl2EEHvpVylb-aHNfh5GypKTlnUX11g/tusiji11.gif", "https://public.sn2.livefilestore.com/y1p9F1AtLZp_-fh7u5BF_VdIKpv9zqN9oLuFB2D-Naw2wO86CR42XZrgQSz9es5Y-bxz_8mJDUi0cBlj7BHOuYwKA/tusiji13.gif", "https://public.sn2.livefilestore.com/y1p9F1AtLZp_-fYMVXKSDJqvMvHv4Ja4A2lAr0b2i9RwRnwY4lUDMF4lHso8AiDN3G2Jq5i_wRcynGCFFg0OFF0YA/tusiji14.gif", "https://public.sn2.livefilestore.com/y1p9F1AtLZp_-eF9iW6smKTehTEOYctE1P_dFEo2fqSQMCodEx2G1Dm3y6iDjS6waOU2p5qeSFtJEY-rz1r_mq36Q/tusiji12.gif", "https://public.sn2.livefilestore.com/y1pY9zX1WH-XSEKh4QDHvn879AAB9VimsB2hwNwDRuqNhtnkvRoHeOoIpsdeuBFHBR53EvJCu7ycSjGMK1fadmS2Q/tusiji15.gif", "https://public.sn2.livefilestore.com/y1pWrvKRijNAWScqgpcZu2fzG4AZeodGXXxAPL2HpzMRRHTQWu2jgUoQDnDRW7xmBQK8ccnX0_UnGejP03FZPtA0g/tusiji16.gif", "https://public.sn2.livefilestore.com/y1pWrvKRijNAWQF1_O4pRaiwMpAO-BdFt2iujTp29dnTc2NGS_3hMmcKjP7GTdj1Sva_c4dDIQVDzoMUDFpvz7BVA/tusiji17.gif", "https://public.sn2.livefilestore.com/y1ptDRD17RlSNbpYsIo3UIb73t6ubLhf2THlwJRV7CwDzO2dQjjAWUSI3rc5Akla6rRHsHqhS9cHVD4g-P1mnDrhQ/tusiji18.gif", "https://public.sn2.livefilestore.com/y1ptDRD17RlSNZBgxH8sDaiF7cvVbcojd_tfLEl8zAmDxXF3J4K_HTVVQ7HcXlJfEMVPHd6wJAPaON1rCRi3FxwbQ/tusiji19.gif", "https://public.sn2.livefilestore.com/y1pHAK8uGQCi1MxahjyMoNxdGfJb04Knq38s-rB5PmcK0kst-Vub0ctQ6EfW0ZMlWt0FgO0i_IMRpeIHYf5lEJR_g/tusiji20.gif", "https://public.sn2.livefilestore.com/y1poXlWx1_flLk1SLHwBhUc4DtnXSrc3kBPz0OCDPAAJQrnEZ5iZ0O4LcqLIuYCSLgaP0DuCll6PCs7VRQQfLfc7w/tusiji21.gif", "https://public.sn2.livefilestore.com/y1poXlWx1_flLmQcO93xRJm0kkDNNKx8wttumf3Ym0OnZ11KpVkIAUSH81iiadQYwJOj70m6vul_toOlcIWZZX1Zw/tusiji22.gif", "https://public.sn2.livefilestore.com/y1poXlWx1_flLnAMpbBzQKDELOiyLbB5cD2BpaM25P9WRgrWc8idJtaQvVD7M5KIMpLn3CuNfUMeHxb3yA0GsnC9A/tusiji23.gif", "https://public.sn2.livefilestore.com/y1pamGsMm1lqrPCXkRlj9c_lS6HuSqVCURqtJAU-wIwlQZl864xxF_NDs-dDl2VplRBgPqn--ivbvkit7ncYesC5A/tusiji25.gif", "https://public.sn2.livefilestore.com/y1pKnYb3XFQZ6ubZ6iCGacuQRd-W91nlb3LnYkRUY2Xs5rpnpW6ylQIYvZZlgenbOK4zUgMBz0d7RhLiP7VXIy_fQ/tusiji24.gif", "https://public.sn2.livefilestore.com/y1pKnYb3XFQZ6vX4aXLXY0h6TnNxs6Odtytr6k_WVYC4i2_lCBjmGY_kA1av8CpiixXwxiNWXLiIizZN5hgTkHfDA/tusiji26.gif", "https://public.sn2.livefilestore.com/y1ppPDCHBMYFWkNzQ2cX9r1AVCPxNsvFWn_r4i_XW16EuiibkbvuPtXdk0ELg8FQsKWzQSOoKLR-Q3kivtrLdHBWQ/tusiji27.gif", "https://public.sn2.livefilestore.com/y1p-0P15kxdejBqmXgdNNxlzY83VPqEUiue01qPbszp1xxd2VjTPADncKlO30WdfgRhOOtMKe_K2TToMekfpncTjg/tusiji28.gif", "https://public.sn2.livefilestore.com/y1p-0P15kxdejCtMZf0puoLS68CWoa36yU2SUmQsSNhuFadVdw5sxO5cEjoAgnNTPjpe_B26bPPnzPxlFrxyaavcA/tusiji29.gif", "https://public.sn2.livefilestore.com/y1ptnGGNJN07hqx-mEOUSJ_q4Xiq_-Ptcn7AYxdq297LYij9sX4khPRjT27Tg150ovVMgsXVLFCnegrw5sI_53rug/tusiji30.gif", "https://public.sn2.livefilestore.com/y1pWmJSYV94O6IQn9HvQeY93K6cD8rlEYPewmZMDeJ6pP_xwCZBQH_pU5ZyvDaftuQIt57Q_N4gBwGusJFyKVSL9w/tusiji31.gif", "https://public.sn2.livefilestore.com/y1pWmJSYV94O6JH_RylUJSonmzPJe1iWs5aJalcs7s6zaEK6hxkGUpw1bQ1mQe84sUFqMKOuL0RuoH3zmiishVipA/tusiji32.gif", "https://public.sn2.livefilestore.com/y1pvrQ5sBTGNff6RorO8VfesX1mkRk3rv9k3b2ODbfdXEIaHSKFJ6ITqDXQnutHQm8jucT7u5V7Lfiq9qIHMqNuGA/tusiji33.gif", "https://public.sn2.livefilestore.com/y1pN3OuRqx9PXR8iLRe4Ghc5zEMP6QLmS58wYM_0FP31yCOwEPv-dO82rS4FXKKolzHpO4_zrZ-Ac-jWIrswLIxiQ/tusiji34.gif", "https://public.sn2.livefilestore.com/y1pv0E7dl-IlUQIt0LYp20US603kXJwH7Ny1t_qreV3UtVu1EuVXEdaWJIXe3nXSHMMfh_pRp19LJ-9F0Sn94d93Q/tusiji35.gif", "https://public.sn2.livefilestore.com/y1pv0E7dl-IlUSh-OFZJ8sfcG1A-QWpGoUcnXSCE8ZprUgyhTFy1GxpchIjcYIHDYhibs7NX-jU8ZeWgxqSvpp0SA/tusiji36.gif", "https://public.sn2.livefilestore.com/y1p2WXGV_4dRU6bJIFKITx2zTxrW6mhLKOZiwtGWLdsut8ssrxHq-HXP2vpCj6bkiFD7rugs9hZFwPFz9JJWBmKNQ/tusiji37.gif", "https://public.sn2.livefilestore.com/y1ppY3zJpsc6uauW0ua54BEpJD38BcH67WsA6YgSx7dYmayzr6gGYfwdUWaKY6CaaHR8yDzpLPj0RWtUa5f9_34Pw/tusiji39.gif", "https://public.sn2.livefilestore.com/y1ppY3zJpsc6ubSH_lSf4MjjAg9vzMa1x_9a23DbSnN6ZgSrK4YqdCj5YSPpIqM7fm2WkEOTi0mVJ3YnNPQAaZt5w/tusiji38.gif", "https://public.sn2.livefilestore.com/y1pMavtpVdPZ5HRtGKjphTh5Il54lxQtJsovV5egzMLjVjOUB96A9GdM4IOinRck57-hJj-vjhpfqsAzZ1uQhAIBQ/tusiji40.gif", "https://public.sn2.livefilestore.com/y1p7zMEE-wQM9KsGdfAXCcQ6S8juXjWKXvincEa-Yob3yloLuLcZFtno0c4q_hIFi3IkoPCjc0NjHCgmEnrm8TCcg/tusiji41.gif", "https://public.sn2.livefilestore.com/y1pi6I8C4tVatbJcGZmMZiNfVzbRLiavfFg7-9yaKZkNM1PInMrDQCd6woWsPAPG0Bq4rSEjwS7mCH6j_D8xInH_Q/tusiji42.gif", "https://public.sn2.livefilestore.com/y1pBhmIMy8rZ_iwSXaQ2tIhSu0CzGM9EAv52rlNAS9SGl8Envygm_zLRplnjIIxcQJez6ppjmeIAM481if504exLw/tusiji43.gif", "https://public.sn2.livefilestore.com/y1pBhmIMy8rZ_hRtHz3XBxXCuWt8myT02biMCjloffHxsC73e9L0Yja73Jj9A3gG0EF3q1EbObdszbfCoP7GMY7Ow/tusiji44.gif", "https://public.sn2.livefilestore.com/y1pWRkOL1EbB3AUGkZnCvTclzqpZ9GXSgcQqwjRa3dM8_BTeQRpY2kUSwTXGSVx1xBB0mer4XukMy8UMLb-MDj9LA/tusiji45.gif", "https://public.sn2.livefilestore.com/y1psknr3hdLGqWxDPYDX1iMCY0PolOrk4N7KnTubgm45cCIvuHB30UnzWTahtgYsqUPe7j1pEP4TIhEBGgfOFnrMw/tusiji46.gif", "https://public.sn2.livefilestore.com/y1pXdTayZOaao_iJM8WQ-lPaIo_DlRpgiJ8_eYCnB9ez0JiJeKn1i6W7oX1EmBjL5ZovTeQLBRuu-Ot4PsUvjlGzg/tusiji47.gif", "https://public.sn2.livefilestore.com/y1pSFqWdTBiBzGZzw0TQXOt-CmDNww5_MZLJIBAqWQT-9pN3f65_3JhSuwcKKU0Ftg1QdB-eRLVhNa8Nh9DpiEcig/tusiji48.gif", "https://public.sn2.livefilestore.com/y1pjtZU0HOO5zPlBNPTmUf7k_tRyQXXPwtggCPqs4Z5gPl87UOlbfWnjmKe_5EMPnGpo_p3qKl6evT1RuXCxzzj5A/tusiji49.gif", "https://public.sn2.livefilestore.com/y1pxcNg9qCGBmU00Mt1z8cXSCfRezbbyxMF8Dt1FxpmBG4PY8eHCfKEH0Pz2w1lpf1e5x2Vgb8YsspYr4EUUa0Ibg/tusiji50.gif", "https://public.sn2.livefilestore.com/y1pbtrnaUqSQcPgzKakPjHhVQmI8kXDbGkm1ehwt5WTinUC9JUOYo1DnOkEHr5D45cTkTGKSZyShLkG_2GoHiPNWQ/tusiji51.gif", "https://public.sn2.livefilestore.com/y1pbtrnaUqSQcNP0ViQB2jfG9GbMV4WIlC7o29y0WSsQasUhKU1-FXLSO_stAwwDKlvBderb8MtZ1mBY4nibwxKPg/tusiji52.gif", "https://public.sn2.livefilestore.com/y1pL97RpxnvH5I8X2PARrbDl0FrD-BCtyjNvQlH9F7fPWk8RJ4kQPWVIk1wehc3Bm3FAgYdIoIyNrYn2J_sd46z7A/tusiji53.gif"];
allSmile[4] = ["https://public.sn2.livefilestore.com/y1pSujSE_bpSbf6ahcAsnmvIOXF6FTgn0ni6AV0OtP4ns0ixxdJsHkXryDqbmRQZY_k0DBobKDnJiTraHs6I4Luxg/am41.gif", "https://public.sn2.livefilestore.com/y1phIiqclA1Lm73sXEtt-ywnhyXpphc1OW3d4UBlK8gQfng5zBMQKmaKH5PFfTou94cC_7F-svoRtCzyoycIbm8PQ/am44.gif", "https://public.sn2.livefilestore.com/y1pSuz1GcmNmDUuFdB0RogarcQigIRZITbzb_YSWBYm-U3TCHFdmNqb9hn1IfKKVjxR5Di635EIqpfpa_jk4vdjiw/am45.gif", "https://public.sn2.livefilestore.com/y1pSuz1GcmNmDW-ZkT6vxBBwPTGWSWtm9G9R0hqm66oigu1CBOs0uZ3GsHS6P8TL3hzIZdhLjdmj_iHTYD56Ofcwg/am47.gif", "https://public.sn2.livefilestore.com/y1ptTE3F4mbyoWBiITaddUyEGVGfZRCYnHckvyo17-8rIRHQZZ1xyOpkwXP7W3mPW51TyyzTShsGR2Q8IopRvjD2A/am43.gif", "https://public.sn2.livefilestore.com/y1pSuz1GcmNmDW1vVvEBD3B-lG_9LMXueeJ9uLWnyaDvQJUT52YcJTDDPN-80F7-O-gzNvMwU9Ls0mwydDeqEINlQ/am46.gif", "https://public.sn2.livefilestore.com/y1pdZ5kAHfJEvvgPkYRWYJF85hxb_mhDVHBkJWA0ARu8yEhVlfLe9gPeZxhjClGA8Ljzy3a-Lslcdn0V6eL4SH-fA/am48.gif", "https://public.sn2.livefilestore.com/y1pSujSE_bpSbfXtuy5nSdpAIa7TTZB6TKkOcLs6YFGn8ruprKM3qS5pGFjHQ626VgdCew4DsnktYD5yErAAlkZHA/am42.gif", "https://public.sn2.livefilestore.com/y1pD2yPuONj9xwu8b_ZackA-N4hwMipTnSaUP-9zc00-Ywf3eCZlMi93nzUPfx3GMRtwmJ34A9-QaINyJaVlwky-w/frog03.gif", "https://public.sn2.livefilestore.com/y1pAJOTMSwVqjEYSjqAQhg_mVAQxPGaqxnqCtQxGwe0UV2RBncra14JGyrafkyrD_1D5x_BIMcS7R535PRuSl_5Gw/frog04.gif", "https://public.sn2.livefilestore.com/y1pAJOTMSwVqjG99Fwh4xszAzN2eoia9he_nMGanZhosAoplFEKjKYcOmKWaXR1w9F5dBICXFUd6ZDa_oGgUT8Khg/frog01.gif", "https://public.sn2.livefilestore.com/y1pAJOTMSwVqjEIhTg8OvOK86gQe7OhWE_BdLVMJBql_tZ512XvY3T4uxDHCsWbS9c8IaMhtw5Si0xfwh5xAb59dg/frog02.gif", "https://public.sn2.livefilestore.com/y1pKCWjCRibGEZHse_wkGBF1lNA6T8QdzqeFTcIy8b72Ss-1lAFQ4Vpn7mupbDIF9WNnWK2krjRz0PcNTeNVnH8aw/frog06.gif", "https://public.sn2.livefilestore.com/y1pOsUikG1yp7kgLKwAeMF8uy_qofwQhNj9wOtSTriMpyeRz7-bcfx5TLfDv88HcmBDWufrC-ZEmhWt04w258KhGg/frog07.gif", "https://public.sn2.livefilestore.com/y1pOsUikG1yp7n91SVGVApumP6I9RVU3GCIf7zcPx68zZguTFmAyxUCdqdJACFHLwwspWokiDZC_awktVDR-ZMUBg/frog05.gif", "https://public.sn2.livefilestore.com/y1p9tolJ58QT_EAlX2aPmaGTctN11jrjKXox6Hkt_-6beCntZD0Mj2iBF9Gg_GVQgxETLWFqXNJAQ53-DMeQrPGnw/frog09.gif", "https://public.sn2.livefilestore.com/y1pskXlpjCBnZIbfWTSJlc3EO1QRASlfl2k-hud1CGBHSoWDOFqbi76zJ9-wn-gqhxDRUIukHquel23GmxMeLGWuQ/frog10.gif", "https://public.sn2.livefilestore.com/y1pskXlpjCBnZK5zffu3kyPK58_KjvTPTe-v6GvfV0xVeqdkTRc26wHSJ8j1QaUB3UUSyVzvlwuTb3vo-cyunnwwQ/frog08.gif", "https://public.sn2.livefilestore.com/y1p_0GH8SF0sjlUtVoBWDtx86BzIluputFjCZNEancFTWa1_szfzTKPDOozpDEVRZIcngN_fNm9tn1aFoBrYTQ6zw/frog11.gif", "https://public.sn2.livefilestore.com/y1pz6Mgd8DZL8wjT2ZOVxBTFTlG4xr4fnqOyIQTu5zAJOkVJ-m5sL-BgKoq7wWOxcPOzZru_kE788xNiNiUSg-Hlw/frog12.gif", "https://public.sn2.livefilestore.com/y1pa1cTdg74ZFlBWCGHL1OFOPrSSpFtICfmVEAc8d_Ve9f2oQ-XJjFHEN45yvfmpO9bfYw_GYVHpRkKkdsQFuazPw/frog14.gif", "https://public.sn2.livefilestore.com/y1pzX3NtqpFk42fUSy2jEqYlc3B3DPxkkuFGqEoZVPerLpn2_zq8ieD9h6rK0mOEJYXgsstp9lgyx-zX9OhpXJuQQ/frog15.gif", "https://public.sn2.livefilestore.com/y1pPauCZfuQYSBMRCOlGJvxShmjQSOXcP-qGZUJnrJmMTXdzEUARE1DPT4easi8D_WeplXsiIH8dSO75F7TPFGa-g/frog13.gif", "https://public.sn2.livefilestore.com/y1pIFYSWnvmtGZWSBRrbGxJUYUHgkA4TAP9PepEweJTR14WCWsdI3fpN5Z8Ypy1jZ2PBKNQXHHHaDP6_J0fUReVUg/frog16.gif", "https://public.sn2.livefilestore.com/y1pZ6jmPt9VhUjfYOBfjrOEGCVC0D42HEMrQM2Rx6BWDqq9CbwsLm4Yd127BjUKMFbHEfxXJEIMxGSp1641bkMdxQ/xbb01.gif","https://public.sn2.livefilestore.com/y1prb7IO5-uHicDu2f8F09JOjN7DzzsnZExnxuhiBpfMji-pdzxgNHVu-JepSPzlsveoSv9lnrDgFtXUlSVP_wKWg/xbb02.gif","https://public.sn2.livefilestore.com/y1prb7IO5-uHidU241w9M0R0epYLB5XU3bx7R98BAuGnKW7tE6-f8R-iykG5RkUsOqHXOev9axT-6xQuUWGxA8yPA/xbb03.gif","https://public.sn2.livefilestore.com/y1pV2jJgEpo0jlc5-1gb8Ft_N8U7zelgv_LkacGOXpQqZqlSj0-rhraxbi9x5plCGLmO2KUqqcnf52kOlHPX6O6oQ/xbb04.gif","https://public.sn2.livefilestore.com/y1piub7ckR1S3XbZrBnmPcyPNqNZAWvj5z88OYKOjfdlpIjrS8wT0_BD5EAmE9K0GBDlt9VePP_bm5si4Y2Ug3B4w/xbb05.gif","https://public.sn2.livefilestore.com/y1pYNbClA5phn8HFR_8raMb4eLzwL22__bqkOX7NFiQ5YuDOqY9e16AdMaiPFVx6lPM4vNXxUv0Rpj1UUGS8RH6Rg/xbb06.gif","https://public.sn2.livefilestore.com/y1pYNbClA5phn9ti1KiSFsnDIn_tgAQX9YOE8ECyypMO_6wDU3J5B9bdMPTOqxwtWfxeexPk7465Y9CjF4AevAhVg/xbb07.gif","https://public.sn2.livefilestore.com/y1pQuQkf5Ae0UBKzxD3LAtKXhL4PvNMUyq6NVBpwXbP9-0ONLc5CiJB_SK4Q9EoeqhqWDQqlgxI4gnFnfFQIaNPzg/xbb08.gif"];
allSmile[5] = ["https://public.sn2.livefilestore.com/y1pZ69kfJZ9ubdOU1pDS3cDLXEy3rqvJD5xsVZfdufXIbNhxbfy8h4koIcPepBMrTi9RFxjdNeVYckGwP7cIRWJyQ/yxh01.gif", "https://public.sn2.livefilestore.com/y1pWdeHoVM6gyvycPE1-G1rSXkrYFv0SFiJZK-kxWzm6xMtuT2QqjGqRIcfaf8k0ovB3T2hoTKH05VhNTjdoNuzyQ/yxh02.gif", "https://public.sn2.livefilestore.com/y1pWdeHoVM6gytTSzxu6Y4RppYGK8MZbwVRqk8ciWAVMOvj3HlhdFVbSy3dMlqvFpBFrXNqzVHH7CZPdAe0u7MYeg/yxh04.gif", "https://public.sn2.livefilestore.com/y1pTNhCx6KFWz-eKwzVDWhng-NIAO3vehqGpOsHLaHb0RU9UCEVuTgOV_tS3y59eRkS5_wfX5uLY-hYYPMJx1Z3rQ/yxh05.gif", "https://public.sn2.livefilestore.com/y1pTNhCx6KFWz82kwERWYLUCoJoyKomet7_EupGLLpOxK5mtqs3N_dg-7Eizj55xnuoPp5DbB3488nVl9S73uh9cg/yxh06.gif", "https://public.sn2.livefilestore.com/y1pjAfKJMwvF-6XTRdPkl45cCjFGhuvcX6hkQizVNEssINrkGVjgCt6aPRXSLPkfD5e6PY8FRHm-qtjnSsFVJXZtw/yxh03.gif", "https://public.sn2.livefilestore.com/y1pzc2ruIadqSAQMO8A8EEqWzQhdC5C2QaFAlVWy5f9pICb_ibrNqdekNTNcEvfi09Bm26nbGhjdA5G1Ba2LMfuSQ/yxh07.gif", "https://public.sn2.livefilestore.com/y1pzc2ruIadqSDuh87fppSrOvsqZoi8j2gfkybS9-kBwUjTZZgeEtC4-gMclZP1rQbwHFqZ30UqbaLPUHMcABmorA/yxh08.gif", "https://public.sn2.livefilestore.com/y1pXE0qqIBi_JPXII8Iu2CI8ha9AlZUEyZLaJjgyR3R6DeFQGG8BO2ny4JoOb0Yvdxh2Bee3mhO-nXrt-wi-lwC6g/yxh09.gif", "https://public.sn2.livefilestore.com/y1pXE0qqIBi_JNFdJWqx8yW5QszRpjnoIDNlsIbT09qM83ygE35YzJaGwe6AZRmvuJnDvId7nTem1J9L5RLW2L04Q/yxh10.gif", "https://public.sn2.livefilestore.com/y1pkKheQbrcSlUS6HDAQy-68ktmPIK9rX_K5Lo1YeszxTs_zZ3nIcKMI8IsbXXjDtbaVEpCMzvXjCogrOgjqDniNw/yxh11.gif", "https://public.sn2.livefilestore.com/y1pkKheQbrcSlUTaZqorGubWrw47z4iJzCWl8n4G9lAw9x7yEZ8iqosbUUHdQniVROJZJzTCumlJgoDCXZLUEEITA/yxh12.gif", "https://public.sn2.livefilestore.com/y1pEbNc6iQ4B0_HFT12x1tHnKjBFokef0_Efp121Vp7XXDkpvyV9_YZWsS9-XS7nDpxWuu9csdEoxFvHPXBDByOqw/yxh13.gif", "https://public.sn2.livefilestore.com/y1pt6bLcaDb5F6Smo8rIWcdE-88E1uudqV13SGVx8rCzx8upNLkqFteC8FypXW_kpzEVQoxVnOJEZ9d-DEhdUp0SQ/yxh14.gif", "https://public.sn2.livefilestore.com/y1pt6bLcaDb5F7C5QvMN8TWLmnSUV0PZVDAPs6EFkyR4fJRfTQveurXg768wDQoXeOQb26_63aR5iXS2YQp_P4YLg/yxh15.gif", "https://public.sn2.livefilestore.com/y1pzzw_IFZRYYrsQdMbKdQ-P6V3uFVMUNP9QozlRSoeYfIEPBDHbCTuWsLNNu3Z0YJIx5GGRzx_X9_W_XwAkptyCg/yxh16.gif", "https://public.sn2.livefilestore.com/y1pSjvWuhjsp5PX1PDvsyN_Bu6DuO-5qnnRAK7M51hy-cbv0XmvvnA6jJ1OAasbm6zc9AnkWseD8XH12GqvnF2PCQ/yxh17.gif", "https://public.sn2.livefilestore.com/y1pSjvWuhjsp5PbD-hwiP66f5xaj3yzEESqxSiGHUCXPEchPr4Iw5tcModCZeM34kYka1uTohMmCxkhBV89mHXunQ/yxh19.gif", "https://public.sn2.livefilestore.com/y1pG7DpPrVd_Km76djSvPwwYGBFCpfh3bUKofByiXCtKdBMo-qjHFDZy91z-jZrb20PwbNcu9gPgZIs-sSuLOBBaA/yxh18.gif", "https://public.sn2.livefilestore.com/y1p2UL54YUdmv7Xv9tmvkC99MVqZ0BAo_9bHqwvD67IuiclemKOC6mcKPWxbsaek87vQ5ZkguGKN5YCypDhDuwHAg/yxh20.gif", "https://public.sn2.livefilestore.com/y1pyJWVox_vVEEtESHWvjnWNyd0C32rzeE9PXXx8V55cKd6y0Ni6M6BSD6yKHF_cMlXg4YSx2BCHyR-xT0dSm1iLA/yxh21.gif", "https://public.sn2.livefilestore.com/y1pOTTiK20mxzpMauXpZPBMq2yOyvvWjAMwsqffIMRCrdl5MoLqljenGzRsUSeKgQHA9T5iXn0dNsJ9-v6BYTL8hA/yxh23.gif", "https://public.sn2.livefilestore.com/y1p_pZFT4wHK6JBe01BAXd8kt0QfUkTBSxZmBFWyqqOjg7VUtWmmNfaLZkgO412PgfOBZmS5d8tv0BKoaaQt3HYxw/yxh22.gif", "https://public.sn2.livefilestore.com/y1pP5OVVEXDlXQOuS0Eqy7vn4n21LHFHRz1JErf9cEneUwyWSKjBgo-oVePlOtMi2DJsGVZwkSbFSEYd1YgTeEy7Q/yxh24.gif", "https://public.sn2.livefilestore.com/y1pP5OVVEXDlXS7l_RKapMjJKGuXmn43n4H4JctDsYe3irWbZlD20K1ixR1Sbz0ix5Xaw-YsOZrGbAlsdTGHzNgWw/yxh26.gif", "https://public.sn2.livefilestore.com/y1pCqlCVlJs41986c--2ecMIxxTK1fzEZ0EjU165g4odUJOhsXjyZeprKyrllF_qF2ImTRtQAsOmwu-RLYaZNLQFg/yxh25.gif", "https://public.sn2.livefilestore.com/y1p6GCaLFqVUGRtJ1D_vzL1jpAEWd70FXusw94UuvcU0CcVp9yDKkIrfzQDMapEBKByDt9-tRbLGvhaWggdVYXJRA/yxh27.gif", "https://public.sn2.livefilestore.com/y1p6GCaLFqVUGRCxHU-WdzYC80Ah-4acPJSIJKfp40QHfzqzXU0Qkys9V2gepd4dkv8ojyONeGxWArKKVkVkWVonA/yxh28.gif", "https://public.sn2.livefilestore.com/y1pGH_dLY44LIxtyy5hEy5F54jQ72Iup7POX-GxOWPxikMNibvoJTPLrSKIIh7V9qVkAV1MwQ_M9R_hxz7NCT9UVQ/yxh29.gif", "https://public.sn2.livefilestore.com/y1p_IEjelDGseu3VuDXXXjEzbevlknKTWsVMaWh4ukih9MwoxiG-HkbrpY3WC9jV9gIIz_s-gdctWD2gF3hVuRIxg/yxh30.gif", "https://public.sn2.livefilestore.com/y1p_IEjelDGsevA2EVVgOdKcVB_y_ebODZu8ZDux8Ohq1nHgpeclQ8QnSG8Be2alPqZK_cihSJfG4txOe78ZSsffQ/yxh32.gif", "https://public.sn2.livefilestore.com/y1p_IEjelDGseurVSZtAc84383nfSoueI_-bL0evNwtn0HLdXHSDbAaCANQ2xouhxVt6zw1Yyf6EHUrbRrzlGg3aA/yxh31.gif"];
allSmile[6] = ["https://public.sn2.livefilestore.com/y1pzUyU8g8RL4jCuL_agCnHnSY_xBVk0MVMM-yA5JKb_QIaReDEVbAH2_p39fIFriGrfDSOEk6hQzs95xw-dipiBg/huangdan01.gif","https://public.sn2.livefilestore.com/y1pIWhB64KCXDzHbELX5bgrAmTM-TmjIJPKeAzcHkY25sJJfleh9Gpx64G3iWz3y0Peolpd_y9T14f2UwhRktkYUQ/huangdan02.gif","https://public.sn2.livefilestore.com/y1pIWhB64KCXDwtQEj0cJTcQV16Yp_Mcf-fKTEBGcOXixs0EbWUSzot4OIKQMzEtTyiWh8JCqNm-O0Hpd5j806inA/huangdan03.gif","https://public.sn2.livefilestore.com/y1pzUyU8g8RL4hvhSoPJ2S0mY38QzHkD6GOlfA5bbnq_3A3Zo0MlQOyLS2u7QgAYLVUI0HlKQuvsLK3kdF-bSC75A/huangdan04.gif","https://public.sn2.livefilestore.com/y1pXy2xKSIE8GfoCwBluenRPz-uiYlYkFroL3LkvxZKg93A-rdJ3Xgp7An6CW_4wBzMl16dnQO6UKBsv1YF5ZIm3w/huangdan05.gif","https://public.sn2.livefilestore.com/y1pIq2c8S6_tJkT4cjIA-txQQ6Q5XsIi4nnVh89pTUJTIGJDoQy82RLJ3MmPVzNNl3AEvWuflKx7hgrAmAwOmtm5A/huangdan06.gif","https://public.sn2.livefilestore.com/y1pqq7Ze29b-AWTNwqO-6YucLGgGLJXjUDSYdD8ytgi30aiYicyJwk-dMqluop18a-M7D51wK2JXLYMvdqSYdJQzw/huangdan07.gif","https://public.sn2.livefilestore.com/y1pqq7Ze29b-AVjyeWlNJuHlKfPXeiMfo7Cqu3EhHM_F40JjhOBa33ds-z3qv4C7y57iWFr-CE_2HOqvJOXjnQyVQ/huangdan08.gif","https://public.sn2.livefilestore.com/y1pZRZt7lrVADCO96SorjJx1KeDrhwJp7xpMiLmXW-HmoCkbDJzl7P-XiLUEWWTihoWu_yvN1Q9jnHlJ45bCm5UfA/huangdan09.gif","https://public.sn2.livefilestore.com/y1pmwQ52EVjVsMxMjU5Hrua6_neR0TS_Gll13KRnZUyU5MaV1qsKW0l9m4Ag81IAWwoKtI2XINH6CQEHzwsTWmSIg/huangdan10.gif","https://public.sn2.livefilestore.com/y1p3g4wejGtVFJ561F2XrRtw_PGZTpLYrSx1miHlvfx5_ILrebiXiovnLQtSeKEkljnE3hDWzQ9kYHV0F3qOMp84w/huangdan11.gif","https://public.sn2.livefilestore.com/y1p3g4wejGtVFIlLiPZaZni8FxsldMp2GS1nZZ1A6khI_WOceR3xbGFU4AaEZ3GjEkORi5E-uvsyJ7hbK-C-Vsr7Q/huangdan12.gif","https://public.sn2.livefilestore.com/y1pg-EEWSp3qkICx1JPHNY2nSxPwWTr6ZF1kgydfs1QXepZLDjlNp4EjR86LJrm_no0d4zX8MCMrRaf9n499s4-Xg/huangdan13.gif","https://public.sn2.livefilestore.com/y1pMLrZ9JMVBPqP8I5RA0Tpxo_RlnBt4r7oH-725dagEk0YW2H5PfCdggVIqInMg7-WjKHuhe1PWtbbAUf9J5igCg/huangdan14.gif","https://public.sn2.livefilestore.com/y1pMLrZ9JMVBPo9tqZyWXXQLmjP1yThZbUgNp7QFT8OguX0TCBrF1Zr9I5ICsaUwn20FQ-_GCoIgyIRv3HEvnd2Lg/huangdan15.gif","https://public.sn2.livefilestore.com/y1pLYBqByQtwitfs6owwhQ2N1Q5XUYbvDhv5I273beEEBgmlAKvwkiv9ivg1l2D5KqgHHKTjlSsdAa0Qq3MXIIEZA/huangdan16.gif","https://public.sn2.livefilestore.com/y1pYcZRjoOyDhAKjsLFAyQfCLP3xh7uD0UTV0sFSHDTuiYYhiACYrleobgm_A0sU0a0bVllWk8Hut0jKovp3YM-kw/huangdan17.gif","https://public.sn2.livefilestore.com/y1pYcZRjoOyDhCICrAmGMVLKeDiO9gag_WxwOZ6x61FGzA9KjZQJAA4uV-JkitJs61gp2xPDcXlfoM_nzM945C7Pg/huangdan18.gif","https://public.sn2.livefilestore.com/y1puJRYVrMdDl2NG0DWohb7VJAPqOpPFz8iwxOPAMLoiJSyXFrTa5o1BZ6f7rHR5MHc_SzAiL7WvpfpxCCYNcN-JQ/huangdan19.gif","https://public.sn2.livefilestore.com/y1p_31GzMmJEG8RH5C_w1AYkm3nuFFExvIcUxD2YVFYm9iqNguHB57Fy08gUadNiCzlnHCmyCi9EiLuHu4Z_RjJ2g/huangdan20.gif","https://public.sn2.livefilestore.com/y1pRx4DTnbJ32N1DWFoPG3RlIwA9_38IMMl8yo5RmTOcmeBTNiM2qMkBb69ipX5zxXFIvKyjU03Tx1JtXxAVJz2ig/huangdan21.gif","https://public.sn2.livefilestore.com/y1pc4tkmK4_p4ufE5J90RtZqb0kUC_vVgHYM7ENGTbM6p00hdAlg7PPBhxNU17u90ZdvMWFRPKsh0WVzctaj4r9Jw/huangdan22.gif","https://public.sn2.livefilestore.com/y1pBFTMZQXJ_t0Kdusmpm_K85x3a1gTSxc61B5AHGXNk-2WirdOAi2aeYTgYPZeT_Sil_q2s34UrtOXosFPQjcDvg/huangdan23.gif","https://public.sn2.livefilestore.com/y1pBFTMZQXJ_t0UEgrgUFikzctrALDQcmRsvdMDM8Q9zjeL2xEPZ3C3Njucd8jJoUYcnO6QN83FI_qSBpdaYw0XHA/huangdan24.gif","https://public.sn2.livefilestore.com/y1pGDcny2C_UBsXE8lVtwyYj5jfogaRZQbfaooE2kfynzHDyz7nF96jilbhmARz_mwCuZwiM7cbCh9ifIr4wuNm_g/huangdan25.gif","https://public.sn2.livefilestore.com/y1pxXS4yvKTLmN1hJpLvQWiLXkEtvvX_YaqhB7yXjo-bLkGuHEE15pBLHF-2VJFNh_YtMw0uBSUfA0l8y8luBufoA/huangdan26.gif","https://public.sn2.livefilestore.com/y1pziepwa1SrTRlmUdRq2tsitelzeNR5DquG-WexGIx_44fqbsNwA1idRKVAGYi__Xo8KjciIeIxQP45dwtGJuYXA/huangdan27.gif","https://public.sn2.livefilestore.com/y1p_2Wn0CS8Wrj4_AEL0-SeQI3JtlE-DKGSndd5qPkPCfbWrzZSDfOzlskZtOj22BXDTWGuyE_BxrcP0Z-wACXruA/huangdan28.gif","https://public.sn2.livefilestore.com/y1pziepwa1SrTS9Gjs6mPYibfzrIu_TtB-TfH2Jvz-5-vTfQBZlC1sKlTADaRCzvFiGBsNnBOm8vzJrKiB9LeI-zg/huangdan29.gif","https://public.sn2.livefilestore.com/y1pziepwa1SrTRA2Aw27RD3UP1oUI94VbvsFvzIwFvTGjJbHWupCpSP94yhlwTkW7vIlWLi_DYspt-DI5jhig_5eQ/huangdan30.gif","https://public.sn2.livefilestore.com/y1pHZF2VLfr33BUbSzMSJnmH9PGUIxOgBm5D0FtWKJGMUoUb-UcjcOa0vhfOhsPqGahi1KDqf3pOOXj2dLSqzIS0w/huangdan31.gif","https://public.sn2.livefilestore.com/y1pHZF2VLfr33CpvceRnPSNLzXbzAkDX9sbfEdaU92T5QPRXLSi8Di1Kzc2roL9gqDuKB0VQORa7ytxExMs7rNo6A/huangdan32.gif"];




/***********************************以下部分就不要随便动了。*****************************************/
function lodex(r) {return window.location.href.indexOf(r);}
function tidex(r) {return document.title.indexOf(r);}
GM_addStyle('#pages{padding:-2px 0px 2px 0px; font-size:12px}#fastsmilies{display:none}.modyButton{text-align:right; cursor:pointer;color:black;font-size:14px}.modyButton:hover,ap:hover,.inliness:hover {color: #008B8B}#modiSpam{margin:0 0 0 0} ap{text-align:right; cursor:pointer; display:inline-block;} #kindUl{border-bottom-style:double;,border-width:3px; border-color:gray} #gifList{padding:2px 0px; border-bottom-style:double;border-width:3px;border-color:gray} .inliness{text-align:center;cursor:pointer; font-size:15px; display:inline-block;} .curr{color:blue;} .defaultpost{min-height:130px !important;}');

var whiSm = Math.floor(Math.random() * (smileName.length));
var logoN = Math.floor(Math.random() * (modiArray(whiSm).length));
var gifUrl = modiArray(whiSm)[logoN].replace(/\d/,"");

if ($('#smilieslist').length != 0) {
	if (lodex("post.php") != -1) {
		$('<img>', {
			id : "smLogo",
			src : gifUrl,
			alt : "表情",
			click : fillit,
			style : "cursor:pointer"
		}).css({
			"height" : "40px",
			"margin" : "0px 0px -16px 5px"
		}).insertAfter($('#posteditor_morebuttons0').css("display","inline"));
	} else {
		$('<img>', {
			id : "smLogo",
			src : gifUrl,
			alt : "表情",
			click : fillit,
			style : "cursor:pointer"
		}).css({
			"height" : "28px",
			"margin" : "0px 0px -7px 20px"
		}).appendTo($('label:has([name="subject"]),td:has([name="subject"])'));
	}
}

function fillit() {
	var logoRect = $("#smLogo")[0].getClientRects()[0];
	var Listdiv = $("<div>", {
			id : "smilieList",
			width : "368",
			height : "186"
		}).mouseleave(function () {
			$('#smilieList').detach()
		}).css({
			"backgroundColor" : "white",
			"position" : "fixed",
			"left" : logoRect.left - 184 + logoRect.width / 2,
			"top" : (((logoRect.top - 186 + logoRect.height) < 0) ? 0 : (logoRect.top - 186 + logoRect.height)),
			"border-style" : "double",
			"border-width" : "4px",
			"border-color" : "gray"
		}).appendTo(document.body);
	createHeadDiv($("#smilieList")[0], pload, "smile")
	var gifList = $("<div>", {
			id : "gifList",
			width : "368",
			height : "136"
		}).css("background-color","LightGray").appendTo(Listdiv);
	if (GM_getValue("current_smilies") == null || GM_getValue("current_page") == null) {
		GM_setValue("current_smilies", 0);
		GM_setValue("current_page", 1);
	}
	$("#smile" + GM_getValue("current_smilies")).addClass("curr");
	var maxpage = Math.ceil(modiArray(GM_getValue("current_smilies")).length / 32);
	pload(GM_getValue("current_smilies"), GM_getValue("current_page"));
	var pages = $("<div>", {
			id : "pages",
			height : "20"
		}).appendTo(Listdiv);
	$("<ap>", {
		html : "上一页",
		width : "45"
	}).click(function () {
		var page = GM_getValue("current_page") - 1;
		pload($(".curr").val(), page)
	}).appendTo(pages);
	$("<ap>", {
		html : "下一页",
		width : "45"
	}).click(function () {
		var page = GM_getValue("current_page") + 1;
		pload($(".curr").val(), page)
	}).appendTo(pages);
	var modiSpam = $("<spam>", {
			id : "modiSpam",
			width : "270"
		}).appendTo(pages);
	$("<ap>", {
		html : "调整顺序",
		width : "120",
		click : modifySm
	}).appendTo(modiSpam);
	$("<ap>", {
		html : "恢复原始",
		title : "请注意：如果本组有新增表情，就必须点这里刷新一下",
		width : "60",
		click : ResetAll
	}).appendTo(modiSpam);
	$("<spam>", {
		id : "pagespam",
		html : GM_getValue("current_page") + "/" + maxpage + "&nbsp;"
	}).css({
		"float" : "right"
	}).appendTo(pages);
}

function createHeadDiv(div, iFunc, idd) {
	var listRect = div.getClientRects()[0];
	var kindUl = $("<div>", {
			id : "kindUl",
			height : "21px"
		}).appendTo(div);
	for (i = 0; i < smileName.length; i++) {
		$("<div>", {
			id : idd + i,
			class : "inliness",
			width : ((listRect.width - 2) / smileName.length - 2),
			html : smileName[i],
			val : i
		}).click(function () {
			$(".curr").removeClass("curr");
			$(this).addClass("curr");
			iFunc($(this).val(), 1)
		}).appendTo(kindUl);
	}
}

function pload(smileKind, p) {
	var smileKind = Number(smileKind);
	GM_setValue("current_smilies", smileKind);
	var smileKindd = modiArray(smileKind)
		var maxer = Math.ceil(smileKindd.length / 32);
	if (p < 1) {
		p = maxer
	}
	if (p > maxer) {
		p = 1
	}
	GM_setValue("current_page", p);
	$('#gifList').empty();
	$("#pagespam").html(p + "/" + maxer + "&nbsp;");
	if (smileKindd[0]) {
		for (i = (0 + (p - 1) * 32); i < ((p < maxer) ? p * 32 : smileKindd.length); i++) {
			var newvix = $("<div>").css({
					"display" : "inline-block",
					"width" : "46px",
					"height" : "34px"
				}).appendTo($('#gifList'));
			$("<img>", {
				src : smileKindd[i].replace(/\d/, ""),
				smkind:smileKindd[i].match(/\d/)[0]
			}).click(function () {
				var wl = 0;
				if ($('textarea').length > 1) {
					wl = 1;
				};
				$("textarea")[wl].value = $("textarea")[wl].value.slice(0, $("textarea")[wl].selectionStart) + ((this.getAttribute("smkind") == "2") ? '[img=60,60]' : '[img]') + this.src + '[/img]' + $("textarea")[wl].value.slice($("textarea")[wl].selectionEnd);
			}).css({
				"cursor" : "pointer",
				"width" : "30px",
				"height" : "30px",
				"margin" : "1px 8px"
			}).mouseover(function () {
				var rect = $("#smilieList")[0].getClientRects()[0];
				var floatDiv = $("<div>", {
						id : "floatDiv"
					}).css({
						"position" : "fixed",
						"left" : rect.left + rect.width,
						"top" : rect.top,
						"border-style" : "solid",
						"border-width" : "1px"
					}).appendTo(document.body);
				$("<img>", {
					src : this.src
				}).css({
					"background-color" : "#FFFFFF"
				}).appendTo(floatDiv);
			}).mouseout(function () {
				$('#floatDiv').detach()
			}).appendTo(newvix);
		}
	}
}

function loadGifs(smileKind, p) {
	var smileKind = Number(smileKind);
	GM_setValue("current_smilies", smileKind);
	$("#gifDiv2").empty();
	var modiDivHeight = Math.ceil(modiArray(smileKind).length / 8) * 35 + 23;
	$("#modiBigDiv").css({
		height : ((modiDivHeight < 290) ? 290 : modiDivHeight)
	});
	$("#gifDiv2").css({
		height : ((modiDivHeight < 290) ? 267 : modiDivHeight - 23)
	});
	var currentSm = modiArray(smileKind);
	if (currentSm[0]) {
		for (i = 0; i < currentSm.length; i++) {
			var newvix = $("<div>").click(function () {
					this.firstChild.checked = "checked";
				}).css({
					"display" : "inline-block",
					"width" : "54px",
					"height" : "34px",
					"background-color" : ((i < 32) ? "#DEB887" : "white"),
					"border-bottom-style" : "solid",
					"border-right-style" : "solid",
					"border-width" : "1px",
					"border-color" : "gray"
				}).appendTo($("#gifDiv2"));
			$("<input>", {
				type : "radio",
				id : "radios" + i,
				name : "modyRadio",
				val : i
			}).appendTo(newvix);
			$("<img>", {
				src : currentSm[i].replace(/\d/, "")
			}).css({
				"cursor" : "pointer",
				"width" : "30px",
				"height" : "30px",
				"margin" : "2px 0px"
			}).mouseover(function () {
				var rect = $("#modiBigDiv")[0].getClientRects()[0];
				var floatDiv = $("<div>", {
						id : "floatDiv"
					}).css({
						"position" : "fixed",
						"left" : rect.left + rect.width,
						"top" : rect.top,
						"border-style" : "solid",
						"border-width" : "1px"
					}).appendTo(document.body);
				$("<img>", {
					src : this.src
				}).css({
					"background-color" : "#FFFFFF"
				}).appendTo(floatDiv);
			}).mouseout(function () {
				$('#floatDiv').detach()
			}).appendTo(newvix);
		}
	}
}

function modiArray(ar) {
	if (ar != 0) {
		if (!GM_getValue(ar + "_modifyIndx")) {
			var newMo = "";
			if (allSmile[ar].length != 0) {
				for (i = 0; i < allSmile[ar].length; i++) {
					newMo += ((newMo == "") ? "" : ",") + i;
				}
			} else {
				newMo = "nothing";
			}
			GM_setValue(ar + "_modifyIndx", newMo);
		}
		var newArray = new Array();
		if (GM_getValue(ar + "_modifyIndx") != "nothing") {
			var newIndex = GM_getValue(ar + "_modifyIndx").split(",");
			for (n = 0; n < newIndex.length; n++) {
				newlength = newArray.push(ar + allSmile[ar][Number(newIndex[n])]);
			}
		}
	} else {
		if (!GM_getValue("0_modifyIndx")) {
			var newMo = "";
			if (allSmile[0].length != 0) {
				for (i = 0; i < allSmile[0].length; i++) {
					newMo += ((newMo == "") ? "0:" : ",0:") + i;
				}
			} else {
				newMo = "nothing";
			}
			GM_setValue("0_modifyIndx", newMo);
		}
		var newArray = new Array();
		if (GM_getValue("0_modifyIndx") != "nothing") {
			var newIndex = GM_getValue(ar + "_modifyIndx").split(",");
			for (n = 0; n < newIndex.length; n++) {
				var kindss = newIndex[n].split(":")[0];
				var indexx = newIndex[n].split(":")[1];
				newlength = newArray.push(kindss + allSmile[kindss][indexx]);
			}
		}
	}
	return newArray
}

function modifySm() {
	var leftt = document.documentElement.scrollLeft;
	var toppt = document.documentElement.scrollTop;
	var modiDivHeight = Math.ceil(modiArray(GM_getValue("current_smilies")).length / 8) * 35 + 23;
	var allMileDiv = $("<div>", {
			id : "modiBigDiv",
			width : "520",
			height : ((modiDivHeight < 290) ? 290 : modiDivHeight)
		}).css({
			"background-color" : "white",
			"position" : "absolute",
			"left" : leftt + 360,
			"top" : toppt + 100,
			"border-style" : "double",
			"border-width" : "4px",
			"border-color" : "gray"
		}).appendTo(document.body);
	createHeadDiv($("#modiBigDiv")[0], loadGifs, "Mosmile");
	$(".curr").removeClass("curr");
	$("#Mosmile" + GM_getValue("current_smilies")).addClass("curr");
	var leftSideDiv = $("<div>", {
			id : "leftSideDiv",
			width : "70",
			height : 250
		}).css({
			"min-height" : "268",
			"position" : "relative",
			"left" : "0",
			"top" : 10,
			"display" : "inline-block",
			"float" : "left"
		}).appendTo(allMileDiv);
	$("<div>", {
		class : "modyButton",
		html : "恢复原始",
		width : "65"
	}).click(function () {
		ResetAll();
		loadGifs(GM_getValue("current_smilies"));
	}).css({
		"margin" : "0px 0px 15px 0"
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "移到最前",
		width : "65"
	}).click(function () {
		MoveUp(999);
		loadGifs(GM_getValue("current_smilies"));
		$("#radios" + GM_getValue("orderIndex_temp"))[0].checked = "checked";
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "上移一行",
		width : "65"
	}).click(function () {
		MoveUp(8);
		loadGifs(GM_getValue("current_smilies"));
		$("#radios" + GM_getValue("orderIndex_temp"))[0].checked = "checked";
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "前移一位",
		width : "65"
	}).click(function () {
		MoveUp(1);
		loadGifs(GM_getValue("current_smilies"));
		$("#radios" + GM_getValue("orderIndex_temp"))[0].checked = "checked";
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "后移一位",
		width : "65"
	}).click(function () {
		moveDown(2);
		loadGifs(GM_getValue("current_smilies"));
		$("#radios" + (GM_getValue("orderIndex_temp") - 1))[0].checked = "checked";
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "下移一行",
		width : "65"
	}).click(function () {
		moveDown(9);
		loadGifs(GM_getValue("current_smilies"));
		$("#radios" + (GM_getValue("orderIndex_temp") - 1))[0].checked = "checked";
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "移到末尾",
		width : "65"
	}).click(function () {
		moveDown(999);
		loadGifs(GM_getValue("current_smilies"));
		$("#radios" + (GM_getValue("orderIndex_temp") - 1))[0].checked = "checked";
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "选入常用",
		width : "65",
		click : joinUsual
	}).css({
		"margin" : "15px 0px 0px 0"
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "删除所选",
		width : "65"
	}).click(function () {
		deleteIt();
		loadGifs(GM_getValue("current_smilies"));
	}).appendTo(leftSideDiv);
	$("<div>", {
		class : "modyButton",
		html : "完成设置",
		width : "65",
		click : finishModi
	}).css({
		"margin" : "15px 0px 0px 0"
	}).appendTo(leftSideDiv);
	$("<div>", {
		id : "gifDiv2",
		width : "440",
		height : ((modiDivHeight < 290) ? 267 : modiDivHeight - 23)
	}).css({
		"margin" : "0px -1px 0px 0px",
		"float" : "right",
		"border-left-style" : "groove"
	}).appendTo(allMileDiv);
	loadGifs(GM_getValue("current_smilies"));
}

function ResetAll() {
	var warnning = confirm("此举将清除手工排序的一切成果，\r\n恢复到脚本中原始的排序！\r\n\r\n当然，它的作用只针对本组表情，对其它组无影响。\r\n还有，如果你向脚本中新增过表情，那你就来对了,只有这样它们才会生效。");
	if (warnning) {
		var trt = GM_getValue("current_smilies");
		GM_deleteValue(trt + "_modifyIndx");
		if (trt != 0) {
			newMo = "";
			if (allSmile[trt].length != 0) {
				for (i = 0; i < allSmile[trt].length; i++) {
					newMo += ((newMo == "") ? "" : ",") + i;
				}
			} else {
				newMo = "nothing";
			}
		} else {
			newMo = "";
			if (allSmile[0].length != 0) {
				for (i = 0; i < allSmile[0].length; i++) {
					newMo += ((newMo == "") ? "0:" : ",0:") + i;
				}
			} else {
				newMo = "nothing";
			}
		}
		GM_setValue(trt + "_modifyIndx", newMo);
	}
}

function MoveUp(t) {
	if (getRadio()) {
		var trt = GM_getValue("current_smilies");
		var thisIndex = Number(getRadio());
		if ((thisIndex - t) > -1) {
			var orderIndex = thisIndex - t;
		} else {
			var orderIndex = 0;
		}
		var crtModiAr = GM_getValue(trt + "_modifyIndx").split(",");
		var thisNode = crtModiAr[thisIndex];
		crtModiAr.splice(thisIndex, 1);
		crtModiAr.splice(orderIndex, 0, thisNode);
		GM_setValue("orderIndex_temp", orderIndex);
		GM_setValue(trt + "_modifyIndx", crtModiAr.join());
	} else {
		alert("你必须选中一个图标啊！")
	}
}

function moveDown(t) {
	if (getRadio()) {
		var trt = GM_getValue("current_smilies");
		var crtModiAr = GM_getValue(trt + "_modifyIndx").split(",");
		var thisIndex = Number(getRadio());
		if ((thisIndex + t) < crtModiAr.length) {
			var orderIndex = thisIndex + t;
		} else {
			var orderIndex = crtModiAr.length;
		}
		var thisNode = crtModiAr[thisIndex];
		crtModiAr.splice(orderIndex, 0, thisNode);
		crtModiAr.splice(thisIndex, 1);
		GM_setValue("orderIndex_temp", orderIndex);
		GM_setValue(trt + "_modifyIndx", crtModiAr.join());
	} else {
		alert("你必须选中一个图标啊！")
	}
}

function joinUsual() {
	if (GM_getValue("current_smilies") != 0) {
		if (getRadio()) {
			var trt = GM_getValue("current_smilies");
			var crtModiAr = GM_getValue(trt + "_modifyIndx").split(",");
			var thisIndex = Number(getRadio());
			var thisNode = crtModiAr[thisIndex];
			var newUsual = trt + ":" + thisNode;
			var allUsual = GM_getValue("0_modifyIndx")
				var allUsual = (allUsual == "nothing") ? newUsual : (allUsual + "," + newUsual)
				GM_setValue("0_modifyIndx", allUsual);
			alert("此表情已经成功加入“常用表情组”")
		} else {
			alert("你必须选中一个图标啊！")
		}
	}
}

function deleteIt() {
	if (getRadio()) {
		var warnning = confirm("删除所选表情吗？\r\n\r\n此删除只是从列表中屏蔽，并非真正删除，点击“恢复原始”后它还会出现。");
		if (warnning) {
			var trt = GM_getValue("current_smilies");
			var crtModiAr = GM_getValue(trt + "_modifyIndx").split(",");
			var thisIndex = Number(getRadio());
			crtModiAr.splice(thisIndex, 1);
			if (crtModiAr.length == 0) {
				GM_setValue(trt + "_modifyIndx", "nothing");
			} else {
				GM_setValue(trt + "_modifyIndx", crtModiAr.join());
			}
		}
	} else {
		alert("你必须选中一个图标啊！")
	}
}

function finishModi() {
	$("#modiBigDiv").empty();
	document.body.removeChild($("#modiBigDiv")[0]);
}

function getRadio() {
	return $('[name="modyRadio"]:checked').val();
}
