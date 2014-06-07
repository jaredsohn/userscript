// ==UserScript==
//   ______                 _               _____ _                              ___      _______ 
//  |  ____|               | |             / ____| |                            | \ \    / / ____|
//  | |__   _ __ ___   ___ | |_ ___  ___  | (___ | |_ ___  __ _ _ __ ___        | |\ \  / / |     
//  |  __| | '_ ` _ \ / _ \| __/ _ \/ __|  \___ \| __/ _ \/ _` | '_ ` _ \   _   | | \ \/ /| |     
//  | |____| | | | | | (_) | ||  __/\__ \  ____) | ||  __/ (_| | | | | | | | |__| |  \  / | |____ 
//  |______|_| |_| |_|\___/ \__\___||___/ |_____/ \__\___|\__,_|_| |_| |_|  \____/    \/   \_____|
//
// Ce script a pour but d'ajouter les emotes Steam (et Twitch.tv) sur JVC
// Pour toute demande d'ajout d'emotes, ajoutez moi sur Steam "Sovex66"
//
// @name           Emotes Steam JVC
// @namespace      http://steamcommunity.com/id/Sovex66/
// @description    Emotes Steam JVC
// @author         Sovex66
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/messages-prives/message*
// @include        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @version        0.2
// ==/UserScript==
var chaine=document.body.innerHTML;
// Dota 2
var reg=new RegExp("(:d2antimage:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/xKlfucAWfswdYqol8SnWX3zllQiEZnCMyax5PxXPnvgNomhCmQo43r27ttvXSZjVcfCMG9EkMpTCoWQnFMyf_wCmewKHAivcvOb63c4DhtI7pNZIkSpqhJz9JmwPjI6vCq0gFNhbfNnqpufQ2VTfxCD30x3bKGqHnaonaQiSmvML/18fx18f' />");

var reg=new RegExp("(:d2axe:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/Ml_gdvtNATa5RKVKILwXVooTKse_PQ92bYp2UMRaX_H7VNeNolFHJBmdubQG3FnchwYz1Op_TW5mh2tIxVle9vZQxM28WVQmGMD1sh-WR9vNUmmHqnQRLTvcJgfdEBOgqViWhudWUXkb1--6DsYTydtUZ4W8JxIoMNYsBt8HW_r9/18fx18f' />");

var reg=new RegExp("(:d2bloodseeker:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/QVI_WvFlz_cMUaztPHJQ9Pke9eu1FcG32J9_99iUGFOIWQihqHmJ5ayIsBMaEh5-9Avs-OBXg6_TkmLv2ZcZVIVdG-G2cZrnrdX8FQNYAHm-X7aroAje4onKIq_P01wPi1FI9u4oyeX5lbdOTg0IaPdS46LuDNy5hJ8v9MLJHFiO/18fx18f' />");

var reg=new RegExp("(:d2brewmaster:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/BrhvV-rPU4BcjnQ0f_RyCr70peauv13AiECnLpsSOq3Ps1iss9MVkvxXaMpZlDyAs-G89fv9H9iDTbo2mhE7qsK3S-yt2waQ_QokzEDeIof5teamu_RKlYlB-XyDAy38yrgboPHXVMerQTnDAd15lu6y5aL2pUSe1BGseodPPqbJ/18fx18f' />");

var reg=new RegExp("(:d2invoker:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/uxOYvPkpBXq3kh3cMJ9YCQNfUg29WQs6Y1zOxtR5EK5yGK9HoDVDaBdLASIW_xaDDkpLHugbSSJoUdPe1XoRqX8cvAe-PVBqFhZNJA-1CIREHhFNqBdAYD5bn5LJaAX6K03mHbMxUzoXUAZ7HbJcz15JEUm3RxU0ZQjGwc8kFKV0/18fx18f' />");

var reg=new RegExp("(:d2lonedruid:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/NENIGwsrJQqRr7VOYA5eCIwPgqpPWytKRWFmVIToFq_9SH_gUjdjGDF2qbBGbhCCgRqbuRoZaVJObHtMhesXqPBMbKBMP3AaMCvltl8kDoXLTsHqWhE2FRIxbAea-ATzrRRt7Udmc0liaK-9SHdQxIZCxL9GETwTQjw3UMi1EqT7/18fx18f' />");

var reg=new RegExp("(:d2naturesprophet:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/y5uCZP4SIV2_TdH2e8S3H3PXSNW6Yi8da4MC7J8i_7gCkLWfpw5nTx-UzQhdpPmVfsJRxu8gbQVgjh_0niH-vw-Upt-5BnRNHsmBDkTu55I0lguVr3liRGjTDbXTYr7vAc_8yOZedh8Zg58FA7myhyjBWZCyezZJPIRa6Yl_-7ME/18fx18f' />");

var reg=new RegExp("(:d2rubick:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/Eo3udgbRWDV8SIsN0GVxt6rBJMdCoVZ1qIZYFzSDORDbhtmNX80eJ9yRl_P2BT89p9Q91BfjFG2ji0UPNYA4F9aCys1BxQ0l3czb9e9PITrtgGeHV-pAKq_SVEEtkn4Ugtya2h6dDnWAhpKl-RMvL_LQMYUe6Bopq9UBFC7ePRvd/18fx18f' />");

var reg=new RegExp("(:d2tidehunter:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/3Dv-gYhEIzo2yW-qOk_btGR3NDDMNC164ge8sN6pkxMVMMl60VhlKJYQc1QcL5U-aWItI5l2b2LpCqGo36qSFBg02jrPUHYql00_UgVlizkjNndw2SNmJbMF4-DAv4ZGQz_dLMVYLnzHXygOQTXSKTw6InfPfmAl5lHt58b0lxgT/18fx18f' />");

var reg=new RegExp("(:d2puck:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/ZRt8yKhHZpwhb7W1bJGeSN1XtnnsN2jc9aFmr4h31u-sEEsz8VsgjoG2qUtK8dDC0EKvarl1KsT-rHu3iXTX6KEUWHPvUzOMgOvlTVO7zsWaFvU5-SBw0_Tya_nFNJu7-kwIPbYJaorQ-vsdF7jB1YdH8zvjL3GI8fNtrJIq0uSq/18fx18f' />");

// Garry's Mod
var reg=new RegExp("(:gmod:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/RIbTpePITfuklNHAUgnsEvzKGRSnuEO7cFoC2rbvpLWNjeReutQL6QRNzT50aaKY8d8AB_L6AaN7Vx_Ct-ylsoCJ9x6k3BjrBRCBOG0jvJ-7il1Urbhbsi1cD9qvqLSz2YOsB_3TGO8DAchneyPkjqHbWVz781TnJApdjPv__qCChw==/18fx18f' />");

// Half-Life 2
var reg=new RegExp("(:alyx:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/WlGvjHppi0r6caylwIDEO-IdZT0-GYUKLr9_vyRmjJyTWph3I3XNWFqosFvm4Iqx7wh8LmtbxxIlsmKnJWWNm55eizc9fd5aW_X8Xf-qlLalWyN9K1KeVX_tI7xoJsycwQCJemIh3AsN4-tR6vjJ9-xbKSg2AJwCL7ol7j07iJeV/18fx18f' />");

var reg=new RegExp("(:gordon:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/Vt8CD3DrdWTA64jNCl1B--6TyL40m3skFCVb1-67CVyf1DX0KfczdmAylDMsPQ9x44bRrWHZOTwfKEbP77gIW5LQJrQ3_yB0YW_YNTV3EXap1Y7-IYxnLBV3AIH48UsLytsnq2-kcSsyepQ5dyYdYeTX3_pqg218QiIKhvPmDVeZ/18fx18f' />");

var reg=new RegExp("(:headcrab:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/6CbMgl-9umXxCjJMc4xEIFBqBjMbzbQlJcThVpdqDIchLft5BqH8d1HTLrJV7AqqXX8fIE6P9j0uyfxOlmkNgCwp6DkYqe91UI5itEymFK0XLEBzDtGtLCLC7g6OIB2GcSPudEKi7HAFz33tWvpP5gh_QCIRgf5_eZa5Ado3CIwn/18fx18f' />");

var reg=new RegExp("(:eli:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/B7gHVlAqGh1Gc9Ha8BaCJL_0zecUWhRdkr0CwBTwyoPOszCtCTZcD-aqzSTWdsyusuHU9EEYVkWZsB_YFfPLhMO3I-0XPk8N5_eBIs880qn4sounAUINVZO4UpVcu4rVmu0l8kxgSlm0tpp9ijyI7rO13aEfFA1SkuBTmVytzojI/18fx18f' />");

var reg=new RegExp("(:gman:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/OR2dEevwCAxl8f7cRYYor4FRV6CvgAZMsT8txqFgYAjwFqrqsuxOHsUo4iJj5mYljEROs_rCRFS6MjDeoGNhD_0Suaqs5F0cxHWuJHqseCLGFxHgupdNFuI6cZe-cnAIpEzt5PfqDkqUMOV6PqsnYdAVGuWmzRsS4W4nxek9ZAP2/18fx18f' />");

// Portal 2

var reg=new RegExp("(:p2blue:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/vUIMyauJbvUNo100h27dGQUOxnjv-WC12W2OLmOIlb50STsy8pUo5616QcqhDpOTCBvfa7q7Iq3SYJM2YouUuXlNKHLsnTvlrCcNzLhEjZRCTIA4-uF-vYg7hHt8z9TrJkF5aebCaeavZBKW-xLV1F0Y0G3h5yrgimyDLS_VkbVy/18fx18f' />");

var reg=new RegExp("(:p2orange:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/owBuXnpPYk0-eWccl0iJbBtMpO8-P2wN6re0BnOuwctqC1mlI1MkX56ge-KxKMfmFlm9_Gt9LhXhuqkecq3AzGcPSuU9Wzddn_035Khi2eFcDuKvKyEhAb6wvgI-voTPbwMe_mFVYFyf7yvuvjPXqxJbtvxnJHMFuLbsBm_zxcBs/18fx18f' />");

var reg=new RegExp("(:p2cube:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/Kak19CaJQWxAMnmHUDEYE5Hl_0Vi-U8slPyqnbTXULTgogIPf5UHfuDrZXl2UVaZnPDmVje7DTSf8beFtdRRs-2mEU9hnRR84bYpf28bSJ7Wp7kFd7RUcML-98v7kke3t_dEBm7DFyLn8jZ0KBpEi5yluwA751J0wq2hnaOKVL_m/18fx18f' />");

// Super Meat Boy
var reg=new RegExp("(:beatmeat:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/xSLordjMAtr4cBfRqUXT5X1uIhycvAyaLL7Ey02jm0IMKd9WgdBEyFipCy-PJZ1vcHs7D8n-ToIns9nTTKCaRQEtzBaf2FfKWfRHKZZvg2g6LmZUlqMMziq4y5NR6NhFVHScCZONB84Mtlkkhj6LeHYiZwqVqkLGKOLOyFPhiQkdKsg=/18fx18f' />");

var reg=new RegExp("(:happymeat:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/VsZZBPilH3ksoRONVSidRe6Kk7W81RE5-G_Al7HO1eKfzW7_oblZa4x4D3NzSNPP45-KpumXUyHzYt2PsM3U5ZLJfb-_sUppjSVDdWoCzcipytf9tsoRba8_zcX5i5Lmm5B7qOLlG2vYbw8pKV7F3eTH3vzgnA1h-2nLxq2KlKmOznk=/18fx18f' />");

var reg=new RegExp("(:dealwithit:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/cM2YrADtvhtrsx-G6kqTc8iBUh1EnbBbv33MnA6s29S5xq9XWfH4CctqA3jMKt35xZRLDhHf8kO0cNGED6_a07TCvBdH-esLyjdPftVgw_6PwRZVToKwD78gx8oY6JmFupruWxqhv1TNJlEulTzLtZOTRAlK0PtQuyGQmRG5y5-oxbg=/18fx18f' />");

var reg=new RegExp("(:meatytears:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/9rH-qeOJDFa4Csn_Yth6_k79NBin-QIWbMQa5YY-Mlk_uslSupVKRBjT1QFEuDR0Q-gtC_K7QA5nyQf9hz0zXjK-2hKknVlGGY6ZB13yKnMJvXBQreYCQz2WEbLLdHNfZ-7aXvqSCxBIyNdbHKJxYRa9JFipshsdMZIW5856JRIuud4=/18fx18f' />");

var reg=new RegExp("(:golden:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/9Jj3yZK1x5jyNG_Xatm1S0zUPXjWxcnYJvq8zY4__ew9k8Ayy6mBilLtcylMufvBQcEka4OHi8At96HVjzz86zCX03LVoZKIU7A_L1Xz5cYLlHkw3NrJhCWp55-WfOrsbsuEbN_4yo1Q9iZ_EqXqjRPDKGmJjIKCdqjhmJMquacskNc=/18fx18f' />");

// Team Fortress 2
var reg=new RegExp("(:crate:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/r7bvnfEf4iAiFyAkg5Th3xf6JSy1b-xg9tnzPmdyqXhmvdhmqAOkMoLOPNql9K9VGu88P-Atrnj91O4mZnGof2u5yya2C7cwg5Nw3Ly-sVJQumVsoHL1NKeNq2wqZOwqN-PJOboA4mTRg2zXqerlQkzrMGi5caFrqt75bn4vrXNg/18fx18f' />");

var reg=new RegExp("(:jarate:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/kwkMuN0cfVzK4GUeUjVpVStFxgmZbHMcHi62BLbTIfJaAjtDhAA7Tmo5eeB0VSffJlDfGswuMQQVI6sct9Ag9VcGKAOaCChMa2Q15m0fOdhsBYZJjHU9R0l8vFf9xjf1DV4uHsYBeRM7JH69K0NinnsHhBqaImQXQ328U_2OJflc/18fx18f' />");

var reg=new RegExp("(:medicon:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/uyxz0Te859rw7lACuIh6IgNguWBzzOmaJCCDGFxuMoVyJ0QqbqChyFA3TPye6DSoDnWgcyaOq4IvLZ4AXW0zgn8jV2pwqLLKUWoA-oeiKq9EIPkgZtWlwCQmjh9BeyPWInkMcX394ZVQLRnyl_Qk7g4tqSV72qfBIibTG0EzNo50/18fx18f' />");

var reg=new RegExp("(:sentry:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/va8BsXQgUx0gLcCNNdBxHAXjywAwUF1d9OMTl9E2Obt0pDZKLTwVD4D03HMTsD-WCPbSE2USH0X_7g6P0DU4vHmgJQozNAYNgamQdQr6IZFCo4tAJUhFB_W-G8fIc3ruc_9wETk_VguHudspHat1gwig20RuRkZWqLMbw8xrPbBy/18fx18f' />");

var reg=new RegExp("(:spycon:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/va8BsXQgUx0gLcCNNdBxHAXjywAwUF1d9OMTl9E2Obt0pDZKLTwVD4D03HMTsD-WCPbSE2USH0X_7g6P0DU4vHmgJQozNAYNgamQdQr6IZFCo4tAJUhFB_W-G8fIc3ruc_9wETk_VguHudspHat1gwig20RuRkZWqLMbw8xrPbBy/18fx18f' />");

var reg=new RegExp("(:sticky:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/o4z7hmRGTVbR5OOwUC3OORvAMTcgNkMWBSowqrTLhp5qh8x9PVoLRHE9_052TYCzFtUoJHV0AQ4OJy2ytciHmWeD3z0jUhhGcGCzSG8HnrRcgHF3NSkOSlB5YPr43sXLbdyMJn4JSxZ0cflAIgfL9ErXJHEvewkfVnY7qamWgpVs/18fx18f' />");

var reg=new RegExp("(:balloonicorn:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/lgPXI4kKtxpLl-AsjmJwsi5PHZLNerlan1kzNmqEOBVfCODY0BbxCOtO_NKoAj44I1oEgZg4-0KUVC4ua4c5ElIM85jOHuIK6hOw1LFIID9pD13S2G30DskKajIhxC4VXFLy0ZNK4ljtVPve8Ut-dHIIDYfEN6IPngpvMiLZPB5Z/18fx18f' />");

var reg=new RegExp("(:demoticon:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/r7RMiVnX7PLGp4i5AuXz9Rf4hjgdp-KyEmlbo-YDu1Jmv3tyAMuq4GZ-lEckhb1_Gu2fK0jloKoZZEa75wC6VWu7aDIew7niZyPYQT3Po3hQuMZ4CLz-7xI4V6OqQv8ENeRoeEWb4LAzacBJeZivPkm6xCxDvPnnFjRT8qlev1lg/18fx18f' />");

// Offspring Fling
var reg=new RegExp("(:dogface:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cdn.steamcommunity.com/economy/image/uAii09ke1eUH-F9JJsViawBEaGKdbtul0zaMU8IjKsxxA5UogAKT96chQ7cApSzhDVFxccgsmb3YO5FLwyAry3wHhmieCoD1pnwPsRnvMuZHAi0jlHfE59dq3QXZNW-ecVbXcsJTgqalOxXoVLtp9lFUKyvDcM2t0GfdAt9gapg-Hosg/18fx18f' />")

// Twitch
var reg=new RegExp("(Kappa)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/kappa.png' />")

var reg=new RegExp("(FrankerZ)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/frankerz.png' />")

var reg=new RegExp("(SwiftRage)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/swiftrage.png' />")

var reg=new RegExp("(WinWaker)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/winwaker.png' />")

var reg=new RegExp("(FailFish)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/failfish.png' />")

var reg=new RegExp("(SSSsss)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/ssssss.png' />")

var reg=new RegExp("(PunchTrees)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/punchtrees.png' />");

var reg=new RegExp("(BibleThump)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/biblethump.png' />");

var reg=new RegExp("(BloodTrail)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/bloodtrail.png' />");

var reg=new RegExp("(EvilFetusss)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.chatslang.com/images/shortcuts/twitch/admins/evilfetus.png' />");

document.body.innerHTML=chaine;