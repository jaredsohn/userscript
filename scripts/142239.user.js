// ==UserScript==
// @name           Tieba_ACFace
// @description    百度贴吧acFun表情修改版
// @version        2013.5.5.0
// @include        http://tieba.baidu.com/*
// @updateURL      https://userscripts.org/scripts/source/142239.meta.js
// @downloadURL    https://userscripts.org/scripts/source/142239.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// ==/UserScript==

//AC娘黑白版表情
var acfun_collection_name = 'AC娘';
var acfun_collection = ["http://mogswg.blu.livefilestore.com/y1pN4Z89hOpHrlnU_b2-jf5Mqa3rWX7juGdEwDIszXlJveS6-O-TdgtdPoCIhoh7d_Ir4e6pecuto_4wrMPZhA_C1KQGvTXo0jU/01.gif", "http://mogswg.blu.livefilestore.com/y1pN4Z89hOpHrm8QQ71fdddRwRMakD6d1xbnMJf0STo_ptr0359I1rS3g1aMsK-OR1VJbwOmtP0hIVvMBaiyu8NG2UcL3mQ6h5P/02.gif", "http://mogswg.blu.livefilestore.com/y1pc1zhK1l995Bq1X_HI7myWyZUy9OLCKAsjcmf9YECpCTbS4nRggysoktjVHkO9H8m6POyC3CLNnceJ9kvFa2KQrCWqsmfgIj7/03.gif", "http://mogswg.blu.livefilestore.com/y1pc1zhK1l995D6DKnSjnIj1nP0Pr6gEKKrmCNk8l-uYIdMPtQPNH7-oJU-LuCRDXMjpN3d0UTIyDroAb6w20PJnsydjxbAxFQc/04.gif", "http://mogswg.blu.livefilestore.com/y1pd6nkcn-dOOEiq21eIdL5kIzp2jpgSvchDua0XqLa2GrINHakf0StejT7ST7IZSpCEmAtHMvJY3sOjaP3ZSdVrVoanjt3LpqF/05.gif", "http://mogswg.blu.livefilestore.com/y1paBuYr_9VadzaqCuCmtypFBjSQAD2jvJmYcDvDzuSyEXObqE-m5v12O5avtjnXUIOrL1X8L4RWdTWvgbqQzirPiov4EGhRNJH/06.gif", "http://mogswg.blu.livefilestore.com/y1paBuYr_9VadyL6Lq857sSgM5MeudUZ5Ldj2X005InsST5euUifYW4vMoXcTWgHOR6B7_lv164RHxd8D6tUEsBpq7BGF8c-9U2/07.gif", "http://mogswg.blu.livefilestore.com/y1pr7NOqnpgdOClUl_31WyKUa_JBawIntCCIe6FJI25y0JOJ5psRIh2Z0RW7rp2l1FdGgaJYdd56GPq_G7mNCMrDhYJSv4fxG0f/08.gif", "http://mogswg.blu.livefilestore.com/y1pi7vnHYhzmLGcdDI1_cXES-6z-ohpWqzHFpPPD8mRWoAoCgYjzHUsbZf5Iu4Vk_5vUCTKBrUkWPac76Pmia0m9TXNf3FULrz3/09.gif", "http://mogswg.blu.livefilestore.com/y1phLOmMrly2rS7iCfUPxckpLkLjW8Feh9xfpcdO3pw2MwqQ5wlU3qlwQT8zPvLpcS3aSEsUD-3BGNA-_bl1uca0MKvzK_KXOLq/10.gif", "http://mogswg.blu.livefilestore.com/y1pbT6P5eRd8FnD8jdmGMwWMCfccntwBjuD9Dhd4U3Fe6Al_gzHXD23jqLs-FlU6rbuZnGqm9NYZ-1uVaBHtXQLdeb9PkxVOuXZ/11.gif", "http://mogswg.blu.livefilestore.com/y1pgZ6IApLs-dALyjNw-QburmRXkkXIOUCH-VBPb0bk6xll9Timpt0R0HtWyPOZdkFQUVNElsbR2GJ4vO9Uc501EVGnQ0s4C8H8/12.gif", "http://mogswg.blu.livefilestore.com/y1pmV2ta85J3tcR19BbUte8mqGH-JghrkPu3XVU4F9uf7wQgbdm1IolTIvfWKMM6yrTByzh6r6JEZisKFkAxuGUOvQTDjIKJ9y3/13.gif", "http://mogswg.blu.livefilestore.com/y1pmV2ta85J3tcNbMIalQyL7KeUP4wPMwNIh1zwGO63cF5bEy96T2Z6L2Atp8GHRlO1FEI8R_nueDhNU2RJV6LnHYiGS6POR-ls/14.gif", "http://mogswg.blu.livefilestore.com/y1pm2Uhmk2-MtavL8Ck0s3-1NBLdabw1W6SB7i1uMN3nVrhhpue6Y8NcWq_6Gy2Ty8ZuWaXk3YmWeK2uZtG7MHFhyJjTpKpsgbo/15.gif", "http://mogswg.blu.livefilestore.com/y1pqWInMtvbCIm7SEgPtE1NrBc5pyAcQ_7oeixHURoISMuy5jL739VqXG2UFKzK2-qOAR_oln6Ql4MlUlAYcobHn7cPVuHKIiEp/16.gif", "http://mogswg.blu.livefilestore.com/y1pqWInMtvbCIld-PZtEj7YpyAmIbNM3DuW0raD7QYoaiJGpWTx5CMqD7RR_9JzZLeAf6rcQuHoCDo-tBHgDYuMm5rhGfMlzu9g/17.gif", "http://mogswg.blu.livefilestore.com/y1pqWInMtvbCImjgM_r79NUY1YKzd5zwBNU15yfLySGe3hAWERkfdTPmU0z89thLfbN1Zq_GO8vvyYtY7GCWoKNGTaTKKfsQnnF/18.gif", "http://mogswg.blu.livefilestore.com/y1pFCPbBmBt7hdqIWmbTuL-3WqRguTSB3mfjIEWstZa8w5uw23O_6x0s6CPADqxPXMaRpgwUUzPNlmYdISu6sryQFCQPRmYEVBU/19.gif", "http://mogswg.blu.livefilestore.com/y1pFCPbBmBt7hfhxEOFKY7dc0HVUChCOwCvB3gyBVBNtGFP1gkW7Hd6mS_I_iqZLqFx9naAMI7U2PWb88T355R8Gdgxc7-fY7M_/20.gif", "http://mogswg.blu.livefilestore.com/y1p7aiBv-12sQ9EiJiLew1mdNVYDplSJj_hH9QAm7glDr7J1ky553q0ARKHxDpySCEQS4X2ECuIKocLRKLtjcJ7ju_XOjxrCdIc/21.gif", "http://mogswg.blu.livefilestore.com/y1pTwscC7d91GvTB6Y4OFnc6qSR4HcpBeFv1teAeaGlQsYtsk6UIdiZiegwC-bDnbQk17cXJvAJU10Cm0ogUnPGnnXLLymdEFz8/22.gif", "http://mogswg.blu.livefilestore.com/y1pTwscC7d91Gv3LeZLvhg7tG-V8_4y9KXSpREqo4zpwaQhCmEOsipxWRvxs18mnmjq6NG-mbcRgxhSpqGErqLX_QY5gLeWEajt/23.gif", "http://mogswg.blu.livefilestore.com/y1pJJIb8VE0Bw389Qa3OYU-yevvTALuCwelJwEtVOMcwSlxhjip8DUJg686vq2XK1GMNd0XtfyHsrZJCtc-tz4qkI8uEvr0HDDx/24.gif", "http://mogswg.blu.livefilestore.com/y1pJJIb8VE0Bw1VGsHC607L2MGIApgUiq9WUaoOSgo6Xgu-0mPJ0MNcVFVPPyG6aCLTr227XBC038cYchuc1tzIS4A5E6v7G_Mt/25.gif", "http://mogswg.blu.livefilestore.com/y1pJJIb8VE0Bw2BycHlF640lP-_d-PyozPctwwssr4AG-J05ChY6zyAY9dPAqcfzpy8xD6b9dWa43hpSNOz5R0l4eBC65sNtNv0/26.gif", "http://mogswg.blu.livefilestore.com/y1pFOiH632vm6NBFtzscxJ0YrTDOntk-uJInkcgEWiCPa0ZprsvMmnHBIAL-WdTvyWwkxTK4tYAHKzZkl_lPIXqSMlgB4huIG_s/27.gif", "http://mogswg.blu.livefilestore.com/y1pFOiH632vm6Mn3StliZQZK6D8Lve63BvmXXefckxsw3AApYm9t439sCfJjZYGH_eSACAE9Q70KBMjzvJ62rqaSYn01KtQERu2/28.gif", "http://mogswg.blu.livefilestore.com/y1pRHpSygi6_3L9Y1HmkEZgNHdd2lbi473mzxUjU9quK1-cqb0WUwe_YJch9Fl4uw4-Dj7bePtrR4GGUdTZFIyexphcWgUEcz39/29.gif", "http://mogswg.blu.livefilestore.com/y1pDCkK6J75RcLOG1yhlP318pqOlr0Devon36dFJmuEX6Wz8rRfIaZY9pem5NVKOsUk0edxTL5_YV22WaAu5UGObgiylNK5k8JL/30.gif", "http://mogswg.blu.livefilestore.com/y1pDCkK6J75RcJK25XWTJyBiKpeF9xH3FgWCzA3lPLX2WbmK-bWPaM70tX3evVyLt1FFdsrlqqwXp67MONbYflHTlx_xKxTf6Bb/31.gif", "http://mogswg.blu.livefilestore.com/y1pDCkK6J75RcKGXwlz-5PYIj4UlaeFDSg_lQsjyAZmSU6iU__XBsNZH4cufPu1O0m6tdW3cAGK_XDcUnSxqUKLh4hhrDdC9_8j/32.gif", "http://mogswg.blu.livefilestore.com/y1putDxznIzYXv8GdsQnALVhvLtr18WxtsEPsMNX8VGRUAmdAXZMzERPvr6fyGnO4MEnM0uKXKWaIXv4uEBVD94xaL3RIWYtbgz/33.gif", "http://mogswg.blu.livefilestore.com/y1putDxznIzYXsCx713YbRpGxdnBYopg7CfSG4o4eOudpZoHb_Q6H0EWPtbSusmnuF7V6MhdSVe1R-tLI5M_HxRQxHAEg5IjlzE/34.gif", "http://mogswg.blu.livefilestore.com/y1pb-pDn8ojTTbUaUqIooSYEJnfGhf8Guals5VeMR6DVOmi2bjuRLjG4x2NeR6Oc_wxW0Ry5SsgIXjR7WlW4mPr8w9lehRm8GF9/35.gif", "http://mogswg.blu.livefilestore.com/y1py90gzWMMq0S1dpMHhwmjXPPfe7orKKYBzmwU33QHaOIMC6xKpxh_5nIKTSWigldMMR7qm01Hn5tOWeU7k51Xpf7CnJuxEpPx/36.gif", "http://mogswg.blu.livefilestore.com/y1pDp90fogelGHQrbxbv3Fq_uXJ0rDniidF7Hrp0X-Pbyfmo8stuERtsRGc1RVtWiEt7UZrU8E9PBZt4OOqfM2lLKinfe5WHVtw/37.gif", "http://mogswg.blu.livefilestore.com/y1p5XsyfvCqFDlu89p0QfTrn76PNY3NdK8uU_Xu0zb9lR0g8u0Rk10DWTusjDYBGsmmqcvP6oG4llItl1UoANWuRysYeNf-WP4H/38.gif", "http://mogswg.blu.livefilestore.com/y1p5XsyfvCqFDk89Iel-RFyeRVHzIYVnKMDL03f0abQJpOmOSaQZj8kSG9d8-Kx9ML19b6ZPpq3d6YMhmWHfC6d0p3XKKUEheAI/39.gif", "http://mogswg.blu.livefilestore.com/y1pwQQIj1xtOMr4w1eJ7hD7OZb2XJTIjzgDSydKoFf_bViked6alb2v9KOgRMlnWZfnKroXe2Sg0PVZaDV9cJpO3-QMxMUYvUGF/40.gif", "http://mogswg.blu.livefilestore.com/y1pwQQIj1xtOMq8mV-6R2lzNIjnQvh8nZhH4fd44NOBZy9pySsDVjgNdc_LK1t1jcP1eUoeXtt0Ob0Oc8FNaqMBcCOA-4j8GwOy/41.gif", "http://mogswg.blu.livefilestore.com/y1pw4nH90a_0qpdjZJW7XapnXST18j7d90-oJRbVhiXryG6Seu0pE3Ay_uizv-qxrJfnQyVtFvc8p81JSlMi7YiddOlneyI7Uyf/42.gif", "http://mogswg.blu.livefilestore.com/y1p_8b9a8zY9d46Qrfk9s6Sn1SQuKLZA3uO700FQ_LxXIZkWZ5LxAjH7cuskDHtTLK53ClB6fSel8QYvLCMimRTWgkbtLNIUSRK/43.gif", "http://mogswg.blu.livefilestore.com/y1p_8b9a8zY9d7TSLUYVBJJNS8aDsCx_1GtiEG2Iu-TUmc15A-nqauzzQbvmLbn9V3Yp7DimW-zJYdJFwoRdDCtbSkMZvSWTpyp/44.gif", "http://mogswg.blu.livefilestore.com/y1pzhTVxIKqz0rgrvQQ4SdypA1KOuJO2xV6P922u__aGXWEd2iRywOG1HXS7a6Is7yTJKZKy-Fj69_0TMrACHq1nXkXJzC9-2bB/45.gif", "http://mogswg.blu.livefilestore.com/y1pb2r2h8XWEcucqtqqFTr0QM5gL9ZEGhMAa0yts6DxPyewPp5-p6RYxB_3BVPwBZjL8PQgrbdBuqzK6Lw22AsGChWW26fPa7ur/46.gif", "http://mogswg.blu.livefilestore.com/y1pb2r2h8XWEcsHYlgCltfSv-Ax4wHq-vOltVZ1D2eeRIR7oynii7l-nE7IntWB6-OCuLnOwJSFl1o89Ztj_jhy22DtxfTXss6r/47.gif", "http://mogswg.blu.livefilestore.com/y1pkeJKT3s-av7RWLT_hOTdtLOQnsWu-esASibWePTeePPh6EJC0bc3xajzGoL_dS-7vd2gsppaRcmJ2n2vZrdmJeSidRNczGVQ/48.gif", "http://mogswg.blu.livefilestore.com/y1p1IsIReR4fC9r5JbUlPz6ZFznpCd4ENomS3jZidUTkz0t-9lpkJiP7GHggfjtv0ugEQp4AmBGXDvLpCZi2h8Ag-BJ9nmmdU3q/49.gif", "http://mogswg.blu.livefilestore.com/y1p1IsIReR4fC9_XAWSUXr3UP0hNjNvfIXvkvqu8H4G2E9NbgCKXa1zpZZixdBVuuHpXSKhU-cAhCG5A9KgZtVcNlgmehOkxpDt/50.gif", "http://mogswg.blu.livefilestore.com/y1pjYCZhVI9uJM-Z-mRlflkpWcb-czd_oydTiodeYBiuAkL9W1MBSZ5JmC4ViW3w-XIYpTFE0oOqPHELcLa_Zwd4EgdW_7ky5fP/51.gif", "http://mogswg.blu.livefilestore.com/y1pLshSCSdbx8FAauU8ieiev9I1fcsN20CZvR12AoLGQbJE42Cj0s8Q6L2ECVEAdjKuF58qdq0F1oAqvy1xUSxg0rmIo_qrF-tb/52.gif", "http://mogswg.blu.livefilestore.com/y1p2KXvyjKtW2Y-GwSYfIH6paYVLm3vTyn4CQ6f6ttpvrw1glXZD99SWtrLrSc_4Sogc2EWp57AOpcQTgwIOYeV-gL-Onze7tp-/53.gif", "http://mogswg.blu.livefilestore.com/y1p4z93w7sHw6zDbgFCdASBfC6ZlTboBan_oMUfSUB6ySvkePQtDa3YQxKhVX5I_kTAm9m2nvc6SZuxtpme7iwjFzJH3IZI6H96/54.gif", "http://mogswg.bn1.livefilestore.com/y1pjc4XtgbSFZQr6BuVcZJztyDCrCj53uRmlX2TB_eosp_AIkhTSzdx3UuGDItNXLl3ZvtzJNc6U38XgefvourwDVmMsq7HHhoT/55.gif"];
var acfun_collection_name2 = 'AC娘2';
var acfun_collection2 = ["http://zsogpw.bn1.livefilestore.com/y1pZQuMbDK_aN1g3aK4JRMtk9YT93tv5e4YuaLBQWTPyKXO9t9T8BptZ8sQJjxl-2vXgY5fFK_F2Zmvc_bDH39WKmNr11o1Kvwc/acfun01.png", "http://zsogpw.bn1.livefilestore.com/y1px7v29fg0STPgTd7SD5GQgrHKAOg7uKNhS4UVyq6uqF3YcqLDKnx2fZz4f25x4wb-pZ4TUoP6QLSjhLVEdPyymBpBCarY1Chv/acfun02.png", "http://zsogpw.bn1.livefilestore.com/y1pA3SS7LiAESuYUiw1zigjLYyKhDn4Xi6dg5nPOQKehdh36koBhDuH1Yovt7THPNIW73Vu7iiEQGcBXPGw7O3kij-gzBpOfHDO/acfun03.png", "http://zsogpw.bn1.livefilestore.com/y1pdTjgYI7-V-EKTo8kMtSSQnxUavUl1X0FQU0TeXoxh2lat2-XXzMyMaCzJXbG86S9TDDWEQFSB9BO_5xC5GDLuDk2SG8Q3gYx/acfun04.png", "http://zsogpw.bn1.livefilestore.com/y1pZXkX-X5vpGml6jVH_rXo_FQ5JHYXyPLRYjnYL24m6fi-UnEy4gSw9CQsOdJJYgLyrW85lFY_xYHvLot3hc4MoHkLZO3y9gZ6/acfun05.png", "http://zsogpw.bn1.livefilestore.com/y1pvhjdWPlDVQiTkZ35Q3JEkcKzFeZKJjzux7IsNMw9e7wPFT9zQFWc-soZiJ1deQiOIedWpP6xY38Q9cu679XgRCgkfSIuAIPt/acfun06.png", "http://zsogpw.bn1.livefilestore.com/y1pvhjdWPlDVQiLkbJmKfWoZhpMtjmrFr2xHuaJhUk8KikXmQFxh_EHyctFpqZv47hJLCHdUK7Tdtr__urAUS-fW6j1MZQe6Hzb/acfun07.png", "http://zsogpw.bn1.livefilestore.com/y1pvhjdWPlDVQj9KgPs4i-8jaAYq7W0KpOlMJf06DeBYgPba5O8migTjYBKl1EE5MSf1V4cicn8DpY6N5qVZaVlTzSgob1a8gOO/acfun08.png", "http://zsogpw.bn1.livefilestore.com/y1pR24JVI2HfYTDV92BABKye6s9tarLVnXQKuuzEmJYoCUy0p8TroT_tkXbhkBhDsziFpChzbzG3z20amdmpe3lECwajTtjs4Hh/acfun09.png", "http://zsogpw.bn1.livefilestore.com/y1pTHNnjmh1Q4w3xXzyHJ7_2-06L2g1NkEBme1eky2DYlclNTyupelyr29hVnh9DC9cYpz50bnqhROFgOoPZf5iB8XiABuRWBP4/acfun10.png", "http://zsogpw.bn1.livefilestore.com/y1pbdw9dVRskTslvMFH7jPqG12SM-VYarWx-1EErIBx7gMEhdkYUiOXC65pJuN-LYrU63Xr_jw9SiS7GCNyY1-UoEZ3HjTQaQyQ/acfun11.png", "http://zsogpw.bn1.livefilestore.com/y1pHdZUOkSI0YkbucpBT3F-6EoH5MyxyL61R05bF4abzNDBEY4DXcGXa0RTvAWKB6iNMCsThR5lT7KAQs0MzdZZEkxcSkcg0nFY/acfun12.png", "http://zsogpw.bn1.livefilestore.com/y1p3WMzqlTuwI2AOOspxmqZca28DEkbzMYZBv0gfZm91-gbeSIs-rKtjci7_jp-MLy8Tyo7-yKXVoL2oG0IOU6lfGkQi1YiDezQ/acfun13.png", "http://zsogpw.bn1.livefilestore.com/y1pqUmYceqFfrLS6F_T75LRm9DJK2KYk34gHX95wiHH9dBkXdvB_MJU_8GxMezLeaM1zC72B4-eKBhvSN3EWUPS_VTTW4c-oNV6/acfun14.png", "http://zsogpw.bn1.livefilestore.com/y1pqUmYceqFfrI-6aq9Ug6f3ZFpHM3LqOIMhpER63MtunqgBr2xms4umAsGnfOm8ZvayZoVsPICodwXk4O9-0YGzOkBxaaBZZ7f/acfun15.png", "http://zsogpw.bn1.livefilestore.com/y1pmk19S84rZKKAD1qJpZWTDJUgVwZQIPzBKZB2s_tj3_x2dc-6KZzgRRxaPNM50vBA4LKOaPthu08IFepENCOkRa0ZDcrbjDZo/acfun16.png", "http://zsogpw.bn1.livefilestore.com/y1pdV45GXGDpJeD2VYOAdPDtaDsfaM9I4HOC0-cf69qkiIybHGBB94yYaJwLDWQcKj4olToTQBbN6ZYCZYIHriZQcPVh2TAS3TQ/acfun17.png", "http://zsogpw.bn1.livefilestore.com/y1pmk19S84rZKL90QvQcG3I68Fw5CqxEfXCH2y52-nuC2oyHuJ09mf4VwSNjNg0V6cJdzQvK_0tkfZHV2j_9ixVYadJlqg9xocO/acfun18.png", "http://zsogpw.bn1.livefilestore.com/y1p4EbzT6X1uUOKUbfL9f_oo-zqwEKnCEMd2c0PmyKQHSBxg-vpc1-oZMPD5oebz2GYNdT9CPBhGn6yu-s3Dg4EUwEFmdyQBE27/acfun19.png", "http://zsogpw.bn1.livefilestore.com/y1p4EbzT6X1uUPzse6PdBR7F9uLG5JztfdBoNIO_gk_MyUVl_C_eMNkSGRS5L8rD2QZFFR2YXVeU87kYtd8DKtcrEeV7MdrAMvo/acfun20.png", "http://zsogpw.bn1.livefilestore.com/y1prTUfLYJ0wrx1WS80L1sciKUYL7h0gNiTzdYAwMOo3PYIziqA32S5oUZHhqGkGAWBE0uAUuz7Y6pXpfydbEcx_JvHkxeAi5CL/acfun21.png", "http://zsogpw.bn1.livefilestore.com/y1pwpRtFTlITco1BMk7pk4uwxnkZcKMKHNGWlcV5zHL_HkI6MXNDY8JmHm5Uq6kn7c6BkQRcAIWovq9pEzhDtqJm4wLHDpepJpL/acfun22.png", "http://zsogpw.bn1.livefilestore.com/y1pBjWRAmqSn-nppi7wqx1vVnmBf5gN3CTQVLiJ4mfEQx3SfMN9FWy2eSCCZh-KXCh7pbTzXyaL1udgoVNJ1uFBbYoreQJC7pcj/acfun24.png", "http://zsogpw.bn1.livefilestore.com/y1pRX__lcLVQKMffd-9LJ-DDF-JeBcnDBKw4mF4b5gxg8oVgkimhnU4rK3-uPTRFWQLxk2WByZM2suAw6600Dttgzf_T-Na-4YK/acfun25.png", "http://zsogpw.bn1.livefilestore.com/y1pjRFmokxWCi0VSuXl_pncFzxYOdYjXYpyOTGFvnXs-U_vZgr1voGW_FiGDF75blDZbkKL9HIL2Mv-qKsP8kzF5mfJS4w5VyCs/acfun26.png", "http://zsogpw.bn1.livefilestore.com/y1pdug2mNY64Q8SaenRIZzi-W0us0DQp1t-el9RtOoBHJxtgccrtT2NddUrVA0l4ojim2tAAoJsUMvxnuSQsfFUPUIkSKPWU38q/acfun27.png", "http://zsogpw.bn1.livefilestore.com/y1pAPNsUvP1f-5UfzA5U2-GbGY8tPnijdyOq1U1p-4IawKU3VFaUngd6foC-sdcxfQS9DraJGudpF56ckvJmvV9o4GTuY73VsVB/acfun29.png", "http://zsogpw.bn1.livefilestore.com/y1pdx3gLOnfAzppTzrjHkclRRK3um__yZEz5Byfx40SM2hCvGkQ8gz3dNvj7RYmb9BQez5g_t8slkXstePpTh7T1nCZUPRf5fh5/acfun30.png", "http://zsogpw.bn1.livefilestore.com/y1pBEWWWee3aVCfyqZzj7_Pu80wXrpmnbRpcmyzeQt80cPgDeyQNbH4iIKQxccEOH-MaT1SLHeKny_annvI17jAfObLjoHLU4-Z/acfun32.png", "http://zsogpw.bn1.livefilestore.com/y1pCV-gL3gRarfKKEMjZsBqx7NIpFLEbijV5DbL1Na-fDCQzpV86n2VhObURD4f_lMLaek0ITaHOEGzpvaAnuqr6CTnW_C3Pxet/acfun33.png", "http://zsogpw.bn1.livefilestore.com/y1pBEWWWee3aVAch07hfRCjgS7jR6ax4Ku41VR2nlmVe1OdlH5Wj0OI-xtDcKC-wDzhsRvWbE8kTpLC4Iv0dyBvzYNmCK99vTtD/acfun34.png", "http://zsogpw.bn1.livefilestore.com/y1p4zMZd7SUsEH-bnb7HkBDvYWiMTV3Yd98BzpKu1OT_f0rdTE6E3_DKhnTn8nNuhBePIoHKtbtqxCcv8iSzo3HdawEzplUGLBl/acfun35.png", "http://zsogpw.bn1.livefilestore.com/y1p95J4xWiQWF1jeTubPxe2KhfiW5W5LD83aTax7x7b5Y9NPRAx8pATpAW5vBGAXZCCZdiMbgMfJkkAGhoKHft-SU61ODA2Ywm3/acfun37.png", "http://zsogpw.bn1.livefilestore.com/y1pxS8HKoA1bT-PVtIQtk7Rm2P4AVUw8tjXDoRB7GRxYH7IUmBx8QykcCzlZdnPtex3XIVgzmxEIze1TNr28kW2zs-0Oj_TpFCk/acfun38.png", "http://zsogpw.bn1.livefilestore.com/y1pIO-R_MDpafAtr26UMjin5NJ7KtUToCQk8MuiIMjLOume7gqrTT918oODUF5f_nd3ozh1-iFfjOaGaB-xuNGbKzvVDgqOnXr6/acfun39.png", "http://zsogpw.bn1.livefilestore.com/y1p95J4xWiQWF2sL6xrRqp73aV5HHLyp3gRnbAC6CpZOjlaEmcXQnNoQhr0mxckl5BfTYcmBWOez1SdtwTn3tCjY_4PpD37D8Pd/acfun40.png", "http://zsogpw.bn1.livefilestore.com/y1pcd4GnBdt7ghhtD97uQDqXNI2MhCx6uioJhDz5XdR4weSrh4f6CgWWt-4yY0DeQSyIdfGlCptxEWpXtUVkEkv1mtT-m2NoV4X/acfun41.png", "http://zsogpw.bn1.livefilestore.com/y1pcd4GnBdt7gjggGOuy9HM1uxqEl1NPG4tNmJxcwE1gQkIS1wLiznPQLJoWcPrVxXP47dSjwtvRoVomJ54BUFTCJFzfUMhJrFa/acfun42.png", "http://zsogpw.bn1.livefilestore.com/y1pcd4GnBdt7ghdHR3Bu1gayZyTvnPgLRx2CETdeawCe3e2WX8VUnW41gh5mbBtrD-0WnbQ1S6701NfXfyVvjoWxnVcYUkFyApd/acfun43.png", "http://zsogpw.bn1.livefilestore.com/y1pMD-VWWt251O1U-m2Iva_L7hSbuEDdSBJCLAM9xdQYBpnmTeZl4ustxe-PoGcvJpUb9pnvZ6Ej3t3TTRqiJNtL50fUu6tLRC1/acfun44.png", "http://zsogpw.bn1.livefilestore.com/y1pjAcVc97baJFxo5DL5-OtfaiobGO54DJibXO7aGX8JN0uH66DDHylCcoptMJ-HnqzTnu9KPHgH7u3Lg8irtO-LYdWq7oNiIZR/acfun45.png", "http://zsogpw.bn1.livefilestore.com/y1pjAcVc97baJGujcCbGIlbd6DXRxbprwFLPaMyP9lcCL2YdGtDnrrfC7zj61L3uCUwWwSv8JDieM4qxTVKOYLFUjBqUOTC8qRx/acfun46.png", "http://zsogpw.bn1.livefilestore.com/y1pSQ6HdRZHsiQlcLV4F2w6YWsZoN2IOY-jEiri5NukoVy46MPwg-pBiiGZcagYKdqwW-N8mcjF-VuIfwSv9GQon9km_lGvzFpv/acfun47.png", "http://zsogpw.bn1.livefilestore.com/y1pTsEw5rJF0tzcSSXividcXj-WDFc_b4Jqvke-1VEmYOKOqnKBbhYVf9yxmvGFrZ31M6lQK_8Imhzjjx6-AClce6t97w0qhCv0/acfun48.png", "http://zsogpw.bn1.livefilestore.com/y1pFhQP6Gmq_Oo99sp63F0pe7uGxDtIi29EkP7KT3qWKrOao6r_LO-DThA2CkJW-Gt3lXriFEmmDQpEQDojSiDl1Am9pPF3dhV_/acfun49.png", "http://zsogpw.bn1.livefilestore.com/y1pESe5-sN-NiRH2-YlMUd2NxCTNTmbFymNy84tm0LFqaEINb71esmhQXed6kWFJ9YRz8LiUvraNbiVuP5_nPSgWF-yXFIftFBM/acfun50.png", "http://zsogpw.bn1.livefilestore.com/y1pnGSLaJ_DTbnUNhTpMsEAhMg6dOdFeDiglo-E3z6h44abROCi5iklEeeIu8nkM4ELPIsMcIIRtpWKDoL6hpSMb3ZY5Vgz847v/acfun52.png", "http://zsogpw.bn1.livefilestore.com/y1pIWWX0ETPCxE9Qds4Du-V2_NtLbruTv9CHH8pL96DEfmTZY6GRsFZg5Ts0DoGxk0Nn8gH6aA679BaUh5hNxez-d9jnOpIGlyr/acfun53.png", "http://zsogpw.bn1.livefilestore.com/y1pwHw7fKjaFJ75WPXFpNJgUfp3hL1GTNn3BXTLxROlML08iYwNUcthLWb8_O59Cvdgrwfg_uxuaNvDxqCB8hH2csAznjAJzETz/acfun55.png", "http://zsogpw.bn1.livefilestore.com/y1ptPwRq6z-Nr4DMuuu_a6J54NYPwaBLlc0Zoy53qIeDWkbD9RL9XHZOxPErVLqvG5Ys44FgfvGK90iYiMw6_Lr9Vno6kzU8s7p/acfun56.png", "http://zsogpw.bn1.livefilestore.com/y1prLb1pwQSv0ttAd0rk4ALkyxc7MXjSsZSBg4u6SKMzGxc8PG0evJXBVRFIuhV2_8DQmPUQh6qdcPDE8_rUn85OG1JPUdoOfi2/acfun57.png", "http://zsogpw.bn1.livefilestore.com/y1puw1W_r2xg42-Oki-jpHIfzbzAAnaQ1B0sIFye8yT8cFIEqsnNxkwQT2hBbadp9jsT3Ge720Fk2HoKDbHkuTC3mqcVAWqt4Jw/acfun58.png", "http://zsogpw.bn1.livefilestore.com/y1p5OeIk4t_V1Uw_I4REs6FoDvLvIkpasmtB92t01acXUBXAD1_K69cKga3g_7YEGThikZG2lP4BnmC6pwzmbgHGLW-eldHCY0F/acfun59.png", "http://zsogpw.bn1.livefilestore.com/y1pivQatFOusax-1pC5HVS9vk3ty3fBz53uMSIDvICi-DmwxCR7L7pxwTzbEK7NrOKtsf0mrW9hcDILk8NC2t-xPcQo0_7yoHUS/acfun61.png", "http://zsogpw.bn1.livefilestore.com/y1pxP7XNkORo-6wC3wiLemy0Nzke7TASrP1WVNRIhy1IK6wBqLgCggpsOzAsElXTEdYYU7_Bg5zrEbgYY2fuawWtmtrufQ2DuK3/acfun60.png"];

// 当前网页类型：1, 通用表情页面；2，楼中楼表情页面
var this_page = 1;
if (location.href.indexOf("simplesmiley.html") != -1) {
	this_page = 2;
}

setTimeout(function () {
	//表情名、表情URL数组、ContentID号，MenuID号，后两者包含的数字应大于16
	fun_UserDefinedSmiley(acfun_collection_name, acfun_collection, 'tab34', 'tab_34');
	fun_UserDefinedSmiley(acfun_collection_name2, acfun_collection2, 'tab35', 'tab_35');
}, 0);

function fun_UserDefinedSmiley(collection_name, collection, content_id, menu_id) {
	var f1 = document.getElementById('tabContent');
	var f2 = document.getElementById('tabMenu');
	if (f1 && f2) {
		//添加自定义表情存储表格
		var node = document.createElement('div');
		node.id = content_id;
		node.setAttribute('style', 'display: none;');
		var text = '<table cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse; " border="1" bordercolor="#B8B3FF" width="100%" height="100%"><tbody>';
		var number = 0;
		for (var i = 0; i < collection.length / 7; i++) {
			text += '<tr>';
			for (var j = 0; j < 7; j++) {
				var posflag = j > 3 ? 1 : 0;
				var image_src = collection[number++];
				if (image_src) {
					text += '<td border="1" width=35px style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="FrozenFaceSmileyinsertimage(\'' + image_src + '\')" onmouseover="over(this,\'' + image_src + '\',\'' + posflag + '\')" onmouseout="out(this)">';
					text += '<img height=36px src="' + image_src + '">';
					text += '</td>';
				} else {
					text += '<td width=35px bgcolor="#FFFFFF"></td>';
				}
			}
			text += '</tr>';
		}
		text += '</tbody></table>';
		node.innerHTML = text;
		f1.appendChild(node);
		
		//添加自定义表情切换按钮
		var node = document.createElement('div');
		node.id = menu_id;
		node.setAttribute('class', 'menuDefault');
		node.setAttribute('onclick', 'FrozenFaceSwitchTab("' + content_id + '","' + menu_id + '");');
		node.innerHTML = '<u>' + collection_name + '</u>';
		f2.appendChild(node);
		
		//设置预览框大小
		document.getElementById('faceReview').setAttribute('style', 'width:150px;height:130px;');
	}
}
unsafeWindow.FrozenFaceSwitchTab = function (content_id, menu_id) {
	var f1 = document.getElementById(content_id);
	if (f1) {
		//显示自定义表情储存表格
		var f2 = document.getElementById('tabContent');
		if (f2) {
			for (var i = 0; i < f2.children.length; i++) {
				if (f2.children[i].getAttribute('style') == 'display: block;' ||
					f2.children[i].getAttribute('style') == 'display: block; ') {
					f2.children[i].setAttribute('style', 'display:none;');
				}
			}
		}
		f1.setAttribute('style', 'display: block;');
		
		//表情切换按钮调整
		var f3 = document.getElementById('tabMenu');
		if (f3) {
			for (var i = 0; i < f3.children.length; i++) {
				var item = f3.children[i];
				if (item.getAttribute('class') != 'menuDefault disable') {
					item.setAttribute('class', 'menuDefault');
				}
				var tab_number = item.id.match(/\d+/);
				if (parseInt(tab_number) < 16 && item.getAttribute('class') != 'menuDefault disable') { //假定16以下的序号已被百度贴吧占用，其他序号保留给小脸使用
					item.setAttribute('onclick', 'document.getElementById("' + content_id + '").setAttribute("style", "display:none;");document.getElementById("' + menu_id + '").setAttribute("class", "menuDefault");switchTab(' + tab_number + ')');
				}
			}
			document.getElementById(menu_id).setAttribute('class', 'menuFocus');
		}
	}
}

unsafeWindow.FrozenFaceSmileyinsertimage = function (image_src) {
	var editorID = unsafeWindow.getSearchById('id');
	var P = parent.wrappedJSObject;
	if (typeof P === 'undefined') {
		P = parent;
	}
	
	if (this_page == 1) {
		var editor = P.TED.Editor.getInstanceById(editorID);
		editor.execCommand('insertimage', image_src);
		editor.overlay.close();
		return;
	}
	
	if (this_page == 2 && image_src.indexOf("http://static.tieba.baidu.com") != -1) {
		var editor = P.TED.SimpleEditor.getInstanceById(editorID);
		editor.execCommand('insertimage', image_src);
		editor.editorPlugins.insertimage.closeOverlay();
		return;
	}
}