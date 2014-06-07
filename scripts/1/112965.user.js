// ==UserScript==
// @name           4 unclickable emoticons by @lidsa
// @namespace      http://www.plurk.com/lidsa
// @description    For your Plurk, get emotes not clickable and that align with your phrases, because they are on Plurk's server.
// @include        http://www.plurk.com/*
// ==/UserScript==



var smileData = [];


smileData.push(['1', '', [
'http://emos.plurk.com/6abf91c10895da1cd809616a5236e413_w23_h21.gif',
'http://emos.plurk.com/2c1a3d06667920553ea68d42f322ae64_w18_h19.png',
'http://emos.plurk.com/6aa6b02b7ef600be6531ef25349fabf4_w23_h26.gif',
'http://emos.plurk.com/e57e20bd20478cb4e22d4a15a1e68358_w48_h26.gif',
'http://emos.plurk.com/1f4a6d2016af3b4a346117e20c1d4e52_w19_h19.gif',
'http://emos.plurk.com/6f86927c2d1efd17851b208aad5e4211_w20_h27.gif',
'http://emos.plurk.com/6e354ae00c60579200ea01e86e248a8a_w21_h19.jpeg',
'http://emos.plurk.com/729ae4f84045520708c67f42130b56b2_w30_h22.gif',
'http://emos.plurk.com/aeb20f22c0d3542d8468ed749e9eccd6_w19_h19.png',
'http://emos.plurk.com/046a98b27ef46fb4a17c135716618e8b_w47_h32.gif',
'http://emos.plurk.com/ffc5ff0321f13bd96e2e5730fbc77286_w38_h35.gif',
'http://emos.plurk.com/0910eda9a43c547463739fe741afb388_w33_h20.gif',
'http://emos.plurk.com/2d426d385a55eda667988c492a632310_w41_h28.gif',
'http://emos.plurk.com/ca364c6b3f08977cb715d6e59229ca2d_w30_h30.gif',
'http://emos.plurk.com/3b39e997c17262c21f8e0af3582e8717_w18_h18.gif',
'http://emos.plurk.com/cc1ca5d4fdcb6d18e404d65dbfbe063d_w24_h22.gif',
'http://emos.plurk.com/e4721a5c68a9c8140fe1d10e629db8b7_w23_h23.gif',
'http://emos.plurk.com/81cf47ab0d2e1fa175331855cfba73ac_w24_h22.gif',
'http://emos.plurk.com/a651f0bfeba55be4e9bf493e6220f286_w24_h25.gif',
'http://emos.plurk.com/b361605e58868d967efc9a65a7f9343c_w25_h25.gif',
'http://emos.plurk.com/b08964d2563f710fc8bea14cc9cb13f3_w26_h26.gif',
'http://emos.plurk.com/1457b9446bd45e84f5aba928689d2851_w19_h19.gif',
'http://emos.plurk.com/232bbf89bc04d20ae15c2fd0b60bfd1a_w48_h34.gif',
'http://emos.plurk.com/4f998b625c02b05c0399a86e1f53928d_w19_h19.png',
'http://emos.plurk.com/e0ef0438f0c616fb3d1ce1b619b47dd7_w19_h19.png',
'http://emos.plurk.com/0aa72a6b650b8b951bda86dc27ea58d5_w19_h19.gif',
'http://emos.plurk.com/d9feca3c010bdbd9cfde49662a97c0ff_w22_h21.gif',
'http://emos.plurk.com/7acc1ce9f19976bfabf1a409cea2525a_w19_h19.png',
'http://emos.plurk.com/dac9378d58a2fce107eb74a19b9a2c79_w18_h22.gif',
'http://emos.plurk.com/a7a0ba226f0e3f3eb9c68144bbe60137_w19_h19.gif',
'http://emos.plurk.com/caf551afc47298a3bd2e02d65de715fd_w26_h23.gif',
'http://emos.plurk.com/4f41598fceed816c4c4b48676bc552ed_w24_h24.gif',
'http://emos.plurk.com/32eb432e53371e3c328fdff9e32a5b99_w23_h23.gif',
'http://emos.plurk.com/6f12c43d4d1a9011e1185e52b9d29d26_w19_h19.gif',
'http://emos.plurk.com/9cf3801f24c1291ff0e1793cb6b8b955_w19_h19.gif',
'http://emos.plurk.com/c81bc52b4e73f2191a59d92c4aaa5265_w19_h19.gif',
'http://emos.plurk.com/8f3170249918867d9b4337dfb21bef7a_w19_h19.gif',
'http://emos.plurk.com/032b8f560235bad2691051921e5bbd01_w19_h19.png',
'http://emos.plurk.com/78b046a2f8dcdc0db38281062cce5252_w19_h19.png',
'http://emos.plurk.com/4b68ab43494bd66bd6a36fabf20f70dd_w19_h19.jpeg',
'http://emos.plurk.com/a383b5816b734441624931dea973dff3_w25_h32.gif',
'http://emos.plurk.com/f75c7caf85cd9314be452fefd7c685dd_w23_h20.gif',
'http://emos.plurk.com/904f931a175888b81d1e204b29c42a69_w19_h19.png',
'http://emos.plurk.com/988ad3295585c1d36c4fc3173101ec9a_w19_h19.gif',
'http://emos.plurk.com/a2ae3ed3725a70e05290555b6cd05e12_w19_h19.gif',
'http://emos.plurk.com/2d87db0dc624d318bfd5525ad8e61045_w20_h20.gif',
'http://emos.plurk.com/3ff5041d802ac78acd23a8a6b35f59b2_w20_h20.gif',
'http://emos.plurk.com/44a7c8a1f5edf6ad3690bb930f845e68_w19_h19.png',
'http://emos.plurk.com/62d0b4297297344d870842ee1a278266_w20_h20.gif',
'http://emos.plurk.com/7fe6147c5cf8d3d9ee45a3e53ce6ae65_w34_h26.gif',
'http://emos.plurk.com/134d6d81a92dac177332a3ba8e0398d0_w19_h19.png',
'http://emos.plurk.com/7e3cceedca80b8283b99a409f25df27e_w19_h20.gif',
'http://emos.plurk.com/ea222c32539207d158a82dafcfe2bfbe_w19_h19.gif',
'http://emos.plurk.com/d77633af688e5ceeb55de94e1f481129_w19_h19.gif',
'http://emos.plurk.com/511706d50ed56ed782a81ff7647b2ed2_w19_h19.png',
'http://emos.plurk.com/b3a6cbaeb1c4483bdd3cf5e93d8aace8_w21_h21.gif',
'http://emos.plurk.com/66a111f85952ab78ee51aeb63450d07b_w19_h19.gif',
'http://emos.plurk.com/7fa5d99cb58a1d6b8f266b11649f8ada_w19_h19.gif',
'http://emos.plurk.com/ecc88b0a496766f58ed0b05530d4add4_w19_h19.gif',
'http://emos.plurk.com/aca2fa16d13fab364c8651d0b9d588f8_w20_h20.gif',
'http://emos.plurk.com/53c2bdb4c5ecb947cfc010daa06639cc_w19_h19.gif',
'http://emos.plurk.com/76243934686414516122a534d8751cfe_w19_h19.gif',
'http://emos.plurk.com/44c8facb00601d45e82a2cafb50ff81f_w19_h19.gif',
'http://emos.plurk.com/bfbeff908ffac5bebcb6dd3441adb608_w22_h18.gif',
'http://emos.plurk.com/72ae9611bbc6adeeac21c91fb8364ca9_w19_h19.jpeg',
'http://emos.plurk.com/a51648437e0b9d1761d19122ae32ccde_w19_h19.gif',
'http://emos.plurk.com/ed0020d46d339293d54bcee1c4545baf_w20_h20.gif',
'http://emos.plurk.com/791fcf206ac50d3202c0ba3b24a66fc9_w20_h20.gif',
'http://emos.plurk.com/a64adcca10bff71bcb0448e791b32b24_w20_h20.gif',
'http://emos.plurk.com/3c318a07ab057a9be354cb039c957fc5_w24_h23.gif',
'http://emos.plurk.com/552ffbd3309419f9703bc004c52c49ee_w23_h23.gif',
'http://emos.plurk.com/3958e67b4f5005c2e7be65226ad20fab_w28_h28.gif',
'http://emos.plurk.com/42ab76a1689cc1a295d914d886ceb492_w30_h30.gif',
'http://emos.plurk.com/c0f901b05c6c722991b6bdb84e539bcb_w22_h25.gif',
'http://emos.plurk.com/fa4499eeea24b6a77437f8db13f152d1_w19_h19.gif',
'http://emos.plurk.com/da5e600690e307d809dd1093c7de96fb_w20_h20.gif',
'http://emos.plurk.com/8ca611f8081ebcfd61a1b46ee105c919_w26_h21.gif',
'http://emos.plurk.com/cac0221ccd9fd868a2ff853c98288468_w30_h30.gif',
'http://emos.plurk.com/fdb3e943eac70e7cc77833edb75c7149_w28_h24.gif',
'http://emos.plurk.com/442533dd4a4f5c06421ce0beda6816f1_w21_h24.gif',
'http://emos.plurk.com/afdd89c265d7bee84547361cc7795696_w24_h25.gif',
'http://emos.plurk.com/556fee5aa2791b790ecd31b510ceac5d_w30_h30.gif',
'http://emos.plurk.com/30ddd6205d1cbd394d0275b8383a88d9_w26_h23.gif',
'http://emos.plurk.com/5301bd02927135c5a800998c67bed915_w20_h20.gif',
'http://emos.plurk.com/0277306a659f5a8dae8b0cb87ba169e2_w19_h19.gif',
'http://emos.plurk.com/ea76527e6100902532b1cb0519a1eba3_w30_h30.gif',
'http://emos.plurk.com/6b18a31e779aa0212b5af263dd178096_w25_h24.gif',
'http://emos.plurk.com/3f60d53389d426b4bc1b054c39a7c6ed_w23_h26.gif',
'http://emos.plurk.com/6564a0997e86732530a32231aaf93a0f_w24_h24.gif',
'http://emos.plurk.com/30e658567e8107950404236d055f420a_w25_h24.gif',
'http://emos.plurk.com/0b9254e3b0630775bcde446ae623b9e4_w23_h22.gif',
'http://emos.plurk.com/8d8ef0fbef42f5df159596fe234d4608_w27_h24.gif',
'http://emos.plurk.com/6a82e23888487eb80a22521d3ab3768a_w19_h19.gif',
'http://emos.plurk.com/b8edb165b395c8a391375e21b1971c82_w18_h18.gif',
'http://emos.plurk.com/ac960be9517eafe8221cd0b6e2f8ace9_w21_h22.jpeg',
'http://emos.plurk.com/bb187105790ae0ca6e4f90af64f6c73e_w19_h19.gif',
'http://emos.plurk.com/793d2983f0e5e9a88de5dd600cfe8358_w42_h19.gif',
'http://emos.plurk.com/be60142badcaec5ac1f4942253e73033_w44_h25.gif',
'http://emos.plurk.com/a7d5ba0ada1b2b1caa0b1efe27025c58_w19_h19.gif',
'http://emos.plurk.com/4e26a8455206d126cc1c131e17b105e9_w18_h18.png',
'http://emos.plurk.com/f0365078c13ff48e3c83678666a47ec4_w24_h24.gif',
'http://emos.plurk.com/4b186176426fe1f1f616ec877c8fd8e2_w20_h27.gif',
'http://emos.plurk.com/412dd113f8392d2cada8b72294514f29_w19_h19.png',
'http://emos.plurk.com/8322eb0006cb932671f4cc9655804538_w20_h20.gif',
'http://emos.plurk.com/4ffde08385f8bd5dab2687a72f14d9ee_w19_h19.gif',
'http://emos.plurk.com/2500c1cf554d5280ed89a88f3912d6ce_w45_h30.gif',
'http://emos.plurk.com/593821314038df60b21e3977f7d2c37e_w19_h19.gif',
'http://emos.plurk.com/316fbd01b6ef9f46e851a2f2d6aa0d32_w21_h21.jpeg',
'http://emos.plurk.com/59b770eeac3690a8c34331cb1969e203_w21_h21.gif',
'http://emos.plurk.com/8566a7d09c6d1fb58428bfb0d30e4cf2_w19_h19.gif',
'http://emos.plurk.com/fa45bda649f565d3e2ed37d549d2038a_w40_h27.gif',
'http://emos.plurk.com/9ed9ded705aa6de1718bf87f05db7c29_w19_h19.gif',
'http://emos.plurk.com/eb03362c8f8f4527d400adb81dc818da_w19_h18.png',
'http://emos.plurk.com/2dc8dc8d010b3750bc273d250cd9169f_w19_h19.gif',
'http://emos.plurk.com/c7043052b623cea87e9088494096de6e_w18_h18.gif',
'http://emos.plurk.com/3919332d89077d8d6721e7965aaa37bf_w19_h19.gif',
'http://emos.plurk.com/c3fcc772543180cf38bc261ba988ed73_w19_h19.png',
'http://emos.plurk.com/6d064f12f86604c08b13e319b424261d_w30_h30.gif',
'http://emos.plurk.com/7578271f72a89b0a7acf0490fad33f7e_w18_h22.png',
'http://emos.plurk.com/5e4b6c94b7d27cf7b8e5d11984556eec_w18_h22.png',
'http://emos.plurk.com/9c1c00fa5258eb400243557d1eec0966_w18_h22.png',
'http://emos.plurk.com/655cee39941f9d1ba00b25c474830688_w18_h22.png',
'http://emos.plurk.com/9654a317a9e40198fbe8a903635c932f_w18_h22.png',
'http://emos.plurk.com/d29f04e230fdf82792027685769402ab_w18_h22.png',
'http://emos.plurk.com/3bf1b1342bd484c0d097d7741233dc0b_w18_h22.png',
'http://emos.plurk.com/aa8ea7a9dcad07d2c49059ec6120bbbb_w18_h22.png',
'http://emos.plurk.com/609653c5a3412b08f00ec5c1a5a393bc_w18_h22.png',
'http://emos.plurk.com/d1c3668988879bfbbbfbcd2b42c87fb3_w19_h19.png',
'http://emos.plurk.com/86cf36552ed885ce6d4792ed95845f53_w19_h19.gif',
'http://emos.plurk.com/de53e926615570786f10fa9d1982bccc_w37_h20.gif',
'http://emos.plurk.com/97251ef70606e90ad8e4c158137af059_w19_h19.png',
'http://emos.plurk.com/51c767b415256c59100e8db00df5e3dd_w19_h19.png',
'http://emos.plurk.com/d587c8f9cac9a26f9c309b8ace836814_w22_h22.gif',
'http://emos.plurk.com/7f7367382ddea5f318d2489a23a92902_w19_h19.png',
'http://emos.plurk.com/20aaba78b414a2d4a2549ad50a844c2c_w18_h22.png',
'http://emos.plurk.com/6c0f9911c4f991e10ee8807300164416_w19_h19.gif',
'http://emos.plurk.com/77aca2f63a19be353d7481e8e3718168_w20_h20.gif',
'http://emos.plurk.com/88edb8cd1de4fb63bca338116218efe4_w43_h27.gif',
'http://emos.plurk.com/19015076dd3561da6690741f64d4efba_w34_h33.gif',
'http://emos.plurk.com/32324992f574e72b2d49eb0a2df9af54_w40_h23.gif',
'http://emos.plurk.com/ee4ecbb4148d099002e1483ea163fbdd_w18_h22.png',
'http://emos.plurk.com/2e99c506a22e0a351bcc79e72e4cfd82_w18_h22.png',
'http://emos.plurk.com/920da4fe30e750e69aae4b5e8af19389_w18_h22.png',
'http://emos.plurk.com/e5e2f2c26fa4c60576189b71fac7c193_w18_h22.png',
'http://emos.plurk.com/b4a1adc046f4c9c82c405c82e1f1663a_w46_h23.gif',
'http://emos.plurk.com/42ab76a1689cc1a295d914d886ceb492_w30_h30.gif',
'http://emos.plurk.com/c82300cef8ec43aad275824da6d2b510_w30_h30.gif',
'http://emos.plurk.com/97c6a19e549d86ff01e71718085334c0_w18_h18.gif',
'http://emos.plurk.com/5301bd02927135c5a800998c67bed915_w20_h20.gif',
'http://emos.plurk.com/a30b565313f30a27dfe96200ab841a8f_w28_h28.gif',
'http://emos.plurk.com/3e83f527d1888326aad3dcca171b3a0a_w21_h21.gif',
'http://emos.plurk.com/a662364f9718c0eca8f2fb474e0c8130_w19_h19.jpeg',
'http://emos.plurk.com/7193092eecae9a80ef5b5972715b4906_w32_h28.gif',
'http://emos.plurk.com/2ef90a40e4e440395c7f763e7e70498a_w19_h19.gif',
'http://emos.plurk.com/0d59132686628fec8f4d787c00f3cb3f_w19_h19.gif',
'http://emos.plurk.com/9dc4b1d01bdb3bb2b02b797781ff753e_w19_h19.gif',
'http://emos.plurk.com/52515ebf2a356d7e2f48acd43adbb24d_w19_h19.gif',
'http://emos.plurk.com/4cc7f52a453555082d0af28df1b85df8_w20_h20.gif',
'http://emos.plurk.com/35238a5f65c02a28825ff61562f646a0_w23_h24.gif',
'http://emos.plurk.com/a72b41750e3133bee4046e214198bf88_w20_h19.gif',
'http://emos.plurk.com/e4cd069631974935fa33ef13086faa90_w20_h20.bmp',
'http://emos.plurk.com/3b34009d962609a7c20b6df9c0920875_w20_h27.gif',
'http://emos.plurk.com/20ddd215ef219e04cd01be9667688238_w23_h23.gif',
'http://emos.plurk.com/a1328747fec499a04a42c3d94ca8c9cc_w21_h21.jpeg',
'http://emos.plurk.com/92ec82cc7ba874c0ac7102a689fa4d5e_w19_h19.png',
'http://emos.plurk.com/0405fd1dfb459de23a5e14e1a27edffc_w18_h22.png',
'http://emos.plurk.com/8c833a518e6a64a8e55b2015929df30c_w21_h21.gif',
'http://emos.plurk.com/448e37765459a35e5e401fed2f5c0a33_w19_h19.gif',
'http://emos.plurk.com/a03e3711ba8ff2db8fde5d43b9454406_w19_h19.gif',
'http://emos.plurk.com/e96a64c243082bb91c7bcb4d970418f2_w21_h21.bmp',
'http://emos.plurk.com/69bc6d90c24715e93bbfe5cb363208dc_w19_h19.png',
'http://emos.plurk.com/db4a4d64830f24d2f7be8dfe2d34711c_w19_h19.png',
'http://emos.plurk.com/e2c89297eed55fa93c0f88f8b0e4bb3d_w20_h20.gif',
'http://emos.plurk.com/36246d4b9ead568eb3a3b54a2bebff77_w37_h27.gif',
'http://emos.plurk.com/fda94abdf64f41d5d143a5c0038d9e29_w19_h19.gif',
'http://emos.plurk.com/94d2ef350b5a5b37b296bc342403a377_w45_h25.gif',
'http://emos.plurk.com/f65fcf02d6da1063cd3aaa2820a92486_w19_h19.png',
'http://emos.plurk.com/3449ad2c2cf08970901ef59fcf083afa_w19_h19.gif',
'http://emos.plurk.com/bc2f06c773a2389465c0674ab6bc1083_w19_h19.gif',
'http://emos.plurk.com/cbbe5480da0a0a8ca6616b2cc4635f1f_w19_h19.gif',
'http://emos.plurk.com/9439a662fc39295b097a3dc398c2c391_w19_h19.png',
'http://emos.plurk.com/7e5d72a333549630a798048ebce32582_w19_h21.gif',
'http://emos.plurk.com/6b6c30ab47738bd52565cb4a3419d90e_w25_h25.gif',
'http://emos.plurk.com/3ea5deb2fe345658640d7ab89b5b71dd_w19_h19.png',
'http://emos.plurk.com/ab4c5c56a62b8ace52cac658591ca576_w30_h30.png',
'http://emos.plurk.com/320de4a310e2fd309a0e75c337919a95_w27_h26.gif',
'http://emos.plurk.com/a51648437e0b9d1761d19122ae32ccde_w19_h19.gif',
'http://emos.plurk.com/8f4b2a7526b515b96a615420187b05ba_w19_h19.gif',
'http://emos.plurk.com/aa5a39e795debf9c44364840e7358580_w19_h19.gif',
'http://emos.plurk.com/f07d726bfcab11c1bdd16191a335bc93_w20_h20.gif',
'http://emos.plurk.com/8bed394c5e04eb1c74700afe33904b16_w20_h20.gif',
'http://emos.plurk.com/a31db6e49ab268b2303a6f8494032595_w19_h19.png',
'http://emos.plurk.com/a75c4342f748f28dc83c2c3d78bb259e_w19_h19.png',
'http://emos.plurk.com/25643a9b28fc06464cec668de2f45d02_w19_h19.gif',
'http://emos.plurk.com/a03e3711ba8ff2db8fde5d43b9454406_w19_h19.gif',
'http://emos.plurk.com/25e4ae05cbeaccdc7c5bf586526e3123_w19_h19.gif',
'http://emos.plurk.com/9de73257adfb13d887acb2712cc35543_w30_h20.gif',
'http://emos.plurk.com/be46071c4525931e033fe6a4f0217efc_w38_h18.gif',
'http://emos.plurk.com/1f9dbfacda5d35d12297db3c366e9322_w21_h21.gif',
'http://emos.plurk.com/9c0353df6abba656d9dd27af36ac8de9_w19_h19.gif',
'http://emos.plurk.com/c6ec5575e57d92704e737a7ac733c4f4_w19_h18.gif',
'http://emos.plurk.com/da86b4d64a6029c2ca403448638df09a_w19_h19.gif',
'http://emos.plurk.com/9a4f7c8dfaadcf4ac059665d6118bba1_w19_h19.gif',
'http://emos.plurk.com/856501871531971ef3ab0f66a5e5437b_w24_h22.gif',
'http://emos.plurk.com/57cf23ca0feca5d7414b4e0e379ff2c3_w22_h18.gif',


'http://emos.plurk.com/026d78138d71e7308beaf9045d592280_w19_h19.bmp',
'http://emos.plurk.com/4bbfa36f7057195aeb956364c69041c8_w20_h26.gif',
'http://emos.plurk.com/937ce995c5f1b584149ba4f6424e2d8f_w29_h30.gif',
'http://emos.plurk.com/ecc5ba84c89ec05f5bc58218aa13f8f6_w19_h19.png',
'http://emos.plurk.com/157c929ffd34bd232b239ae695f311e8_w19_h19.png',
'http://emos.plurk.com/49326087a67ac568ce06962067aef2e8_w27_h27.bmp',
'http://emos.plurk.com/41f9dab9bae691a4fee51d57ca5ffae2_w19_h19.bmp',
'http://emos.plurk.com/5dae15aafaf6fe8437685c8461ab742a_w19_h19.gif',
'http://emos.plurk.com/c4b2c3e75424910318bab2f233fd9f4a_w30_h30.gif',

    ], [ 

'http://emos.plurk.com/6abf91c10895da1cd809616a5236e413_w23_h21.gif',
'http://emos.plurk.com/2c1a3d06667920553ea68d42f322ae64_w18_h19.png',
'http://emos.plurk.com/6aa6b02b7ef600be6531ef25349fabf4_w23_h26.gif',
'http://emos.plurk.com/e57e20bd20478cb4e22d4a15a1e68358_w48_h26.gif',
'http://emos.plurk.com/1f4a6d2016af3b4a346117e20c1d4e52_w19_h19.gif',
'http://emos.plurk.com/6f86927c2d1efd17851b208aad5e4211_w20_h27.gif',
'http://emos.plurk.com/6e354ae00c60579200ea01e86e248a8a_w21_h19.jpeg',
'http://emos.plurk.com/729ae4f84045520708c67f42130b56b2_w30_h22.gif',
'http://emos.plurk.com/aeb20f22c0d3542d8468ed749e9eccd6_w19_h19.png',
'http://emos.plurk.com/046a98b27ef46fb4a17c135716618e8b_w47_h32.gif',
'http://emos.plurk.com/ffc5ff0321f13bd96e2e5730fbc77286_w38_h35.gif',
'http://emos.plurk.com/0910eda9a43c547463739fe741afb388_w33_h20.gif',
'http://emos.plurk.com/2d426d385a55eda667988c492a632310_w41_h28.gif',
'http://emos.plurk.com/ca364c6b3f08977cb715d6e59229ca2d_w30_h30.gif',
'http://emos.plurk.com/3b39e997c17262c21f8e0af3582e8717_w18_h18.gif',
'http://emos.plurk.com/cc1ca5d4fdcb6d18e404d65dbfbe063d_w24_h22.gif',
'http://emos.plurk.com/e4721a5c68a9c8140fe1d10e629db8b7_w23_h23.gif',
'http://emos.plurk.com/81cf47ab0d2e1fa175331855cfba73ac_w24_h22.gif',
'http://emos.plurk.com/a651f0bfeba55be4e9bf493e6220f286_w24_h25.gif',
'http://emos.plurk.com/b361605e58868d967efc9a65a7f9343c_w25_h25.gif',
'http://emos.plurk.com/b08964d2563f710fc8bea14cc9cb13f3_w26_h26.gif',
'http://emos.plurk.com/1457b9446bd45e84f5aba928689d2851_w19_h19.gif',
'http://emos.plurk.com/232bbf89bc04d20ae15c2fd0b60bfd1a_w48_h34.gif',
'http://emos.plurk.com/4f998b625c02b05c0399a86e1f53928d_w19_h19.png',
'http://emos.plurk.com/e0ef0438f0c616fb3d1ce1b619b47dd7_w19_h19.png',
'http://emos.plurk.com/0aa72a6b650b8b951bda86dc27ea58d5_w19_h19.gif',
'http://emos.plurk.com/d9feca3c010bdbd9cfde49662a97c0ff_w22_h21.gif',
'http://emos.plurk.com/7acc1ce9f19976bfabf1a409cea2525a_w19_h19.png',
'http://emos.plurk.com/dac9378d58a2fce107eb74a19b9a2c79_w18_h22.gif',
'http://emos.plurk.com/a7a0ba226f0e3f3eb9c68144bbe60137_w19_h19.gif',
'http://emos.plurk.com/caf551afc47298a3bd2e02d65de715fd_w26_h23.gif',
'http://emos.plurk.com/4f41598fceed816c4c4b48676bc552ed_w24_h24.gif',
'http://emos.plurk.com/32eb432e53371e3c328fdff9e32a5b99_w23_h23.gif',
'http://emos.plurk.com/6f12c43d4d1a9011e1185e52b9d29d26_w19_h19.gif',
'http://emos.plurk.com/9cf3801f24c1291ff0e1793cb6b8b955_w19_h19.gif',
'http://emos.plurk.com/c81bc52b4e73f2191a59d92c4aaa5265_w19_h19.gif',
'http://emos.plurk.com/8f3170249918867d9b4337dfb21bef7a_w19_h19.gif',
'http://emos.plurk.com/032b8f560235bad2691051921e5bbd01_w19_h19.png',
'http://emos.plurk.com/78b046a2f8dcdc0db38281062cce5252_w19_h19.png',
'http://emos.plurk.com/4b68ab43494bd66bd6a36fabf20f70dd_w19_h19.jpeg',
'http://emos.plurk.com/a383b5816b734441624931dea973dff3_w25_h32.gif',
'http://emos.plurk.com/f75c7caf85cd9314be452fefd7c685dd_w23_h20.gif',
'http://emos.plurk.com/904f931a175888b81d1e204b29c42a69_w19_h19.png',
'http://emos.plurk.com/988ad3295585c1d36c4fc3173101ec9a_w19_h19.gif',
'http://emos.plurk.com/a2ae3ed3725a70e05290555b6cd05e12_w19_h19.gif',
'http://emos.plurk.com/2d87db0dc624d318bfd5525ad8e61045_w20_h20.gif',
'http://emos.plurk.com/3ff5041d802ac78acd23a8a6b35f59b2_w20_h20.gif',
'http://emos.plurk.com/44a7c8a1f5edf6ad3690bb930f845e68_w19_h19.png',
'http://emos.plurk.com/62d0b4297297344d870842ee1a278266_w20_h20.gif',
'http://emos.plurk.com/7fe6147c5cf8d3d9ee45a3e53ce6ae65_w34_h26.gif',
'http://emos.plurk.com/134d6d81a92dac177332a3ba8e0398d0_w19_h19.png',
'http://emos.plurk.com/7e3cceedca80b8283b99a409f25df27e_w19_h20.gif',
'http://emos.plurk.com/ea222c32539207d158a82dafcfe2bfbe_w19_h19.gif',
'http://emos.plurk.com/d77633af688e5ceeb55de94e1f481129_w19_h19.gif',
'http://emos.plurk.com/511706d50ed56ed782a81ff7647b2ed2_w19_h19.png',
'http://emos.plurk.com/b3a6cbaeb1c4483bdd3cf5e93d8aace8_w21_h21.gif',
'http://emos.plurk.com/66a111f85952ab78ee51aeb63450d07b_w19_h19.gif',
'http://emos.plurk.com/7fa5d99cb58a1d6b8f266b11649f8ada_w19_h19.gif',
'http://emos.plurk.com/ecc88b0a496766f58ed0b05530d4add4_w19_h19.gif',
'http://emos.plurk.com/aca2fa16d13fab364c8651d0b9d588f8_w20_h20.gif',
'http://emos.plurk.com/53c2bdb4c5ecb947cfc010daa06639cc_w19_h19.gif',
'http://emos.plurk.com/76243934686414516122a534d8751cfe_w19_h19.gif',
'http://emos.plurk.com/44c8facb00601d45e82a2cafb50ff81f_w19_h19.gif',
'http://emos.plurk.com/bfbeff908ffac5bebcb6dd3441adb608_w22_h18.gif',
'http://emos.plurk.com/72ae9611bbc6adeeac21c91fb8364ca9_w19_h19.jpeg',
'http://emos.plurk.com/a51648437e0b9d1761d19122ae32ccde_w19_h19.gif',
'http://emos.plurk.com/ed0020d46d339293d54bcee1c4545baf_w20_h20.gif',
'http://emos.plurk.com/791fcf206ac50d3202c0ba3b24a66fc9_w20_h20.gif',
'http://emos.plurk.com/a64adcca10bff71bcb0448e791b32b24_w20_h20.gif',
'http://emos.plurk.com/3c318a07ab057a9be354cb039c957fc5_w24_h23.gif',
'http://emos.plurk.com/552ffbd3309419f9703bc004c52c49ee_w23_h23.gif',
'http://emos.plurk.com/3958e67b4f5005c2e7be65226ad20fab_w28_h28.gif',
'http://emos.plurk.com/42ab76a1689cc1a295d914d886ceb492_w30_h30.gif',
'http://emos.plurk.com/c0f901b05c6c722991b6bdb84e539bcb_w22_h25.gif',
'http://emos.plurk.com/fa4499eeea24b6a77437f8db13f152d1_w19_h19.gif',
'http://emos.plurk.com/da5e600690e307d809dd1093c7de96fb_w20_h20.gif',
'http://emos.plurk.com/8ca611f8081ebcfd61a1b46ee105c919_w26_h21.gif',
'http://emos.plurk.com/cac0221ccd9fd868a2ff853c98288468_w30_h30.gif',
'http://emos.plurk.com/fdb3e943eac70e7cc77833edb75c7149_w28_h24.gif',
'http://emos.plurk.com/442533dd4a4f5c06421ce0beda6816f1_w21_h24.gif',
'http://emos.plurk.com/afdd89c265d7bee84547361cc7795696_w24_h25.gif',
'http://emos.plurk.com/556fee5aa2791b790ecd31b510ceac5d_w30_h30.gif',
'http://emos.plurk.com/30ddd6205d1cbd394d0275b8383a88d9_w26_h23.gif',
'http://emos.plurk.com/5301bd02927135c5a800998c67bed915_w20_h20.gif',
'http://emos.plurk.com/0277306a659f5a8dae8b0cb87ba169e2_w19_h19.gif',
'http://emos.plurk.com/ea76527e6100902532b1cb0519a1eba3_w30_h30.gif',
'http://emos.plurk.com/6b18a31e779aa0212b5af263dd178096_w25_h24.gif',
'http://emos.plurk.com/3f60d53389d426b4bc1b054c39a7c6ed_w23_h26.gif',
'http://emos.plurk.com/6564a0997e86732530a32231aaf93a0f_w24_h24.gif',
'http://emos.plurk.com/30e658567e8107950404236d055f420a_w25_h24.gif',
'http://emos.plurk.com/0b9254e3b0630775bcde446ae623b9e4_w23_h22.gif',
'http://emos.plurk.com/8d8ef0fbef42f5df159596fe234d4608_w27_h24.gif',
'http://emos.plurk.com/6a82e23888487eb80a22521d3ab3768a_w19_h19.gif',
'http://emos.plurk.com/b8edb165b395c8a391375e21b1971c82_w18_h18.gif',
'http://emos.plurk.com/ac960be9517eafe8221cd0b6e2f8ace9_w21_h22.jpeg',
'http://emos.plurk.com/bb187105790ae0ca6e4f90af64f6c73e_w19_h19.gif',
'http://emos.plurk.com/793d2983f0e5e9a88de5dd600cfe8358_w42_h19.gif',
'http://emos.plurk.com/be60142badcaec5ac1f4942253e73033_w44_h25.gif',
'http://emos.plurk.com/a7d5ba0ada1b2b1caa0b1efe27025c58_w19_h19.gif',
'http://emos.plurk.com/4e26a8455206d126cc1c131e17b105e9_w18_h18.png',
'http://emos.plurk.com/f0365078c13ff48e3c83678666a47ec4_w24_h24.gif',
'http://emos.plurk.com/4b186176426fe1f1f616ec877c8fd8e2_w20_h27.gif',
'http://emos.plurk.com/412dd113f8392d2cada8b72294514f29_w19_h19.png',
'http://emos.plurk.com/8322eb0006cb932671f4cc9655804538_w20_h20.gif',
'http://emos.plurk.com/4ffde08385f8bd5dab2687a72f14d9ee_w19_h19.gif',
'http://emos.plurk.com/2500c1cf554d5280ed89a88f3912d6ce_w45_h30.gif',
'http://emos.plurk.com/593821314038df60b21e3977f7d2c37e_w19_h19.gif',
'http://emos.plurk.com/316fbd01b6ef9f46e851a2f2d6aa0d32_w21_h21.jpeg',
'http://emos.plurk.com/59b770eeac3690a8c34331cb1969e203_w21_h21.gif',
'http://emos.plurk.com/8566a7d09c6d1fb58428bfb0d30e4cf2_w19_h19.gif',
'http://emos.plurk.com/fa45bda649f565d3e2ed37d549d2038a_w40_h27.gif',
'http://emos.plurk.com/9ed9ded705aa6de1718bf87f05db7c29_w19_h19.gif',
'http://emos.plurk.com/eb03362c8f8f4527d400adb81dc818da_w19_h18.png',
'http://emos.plurk.com/2dc8dc8d010b3750bc273d250cd9169f_w19_h19.gif',
'http://emos.plurk.com/c7043052b623cea87e9088494096de6e_w18_h18.gif',
'http://emos.plurk.com/3919332d89077d8d6721e7965aaa37bf_w19_h19.gif',
'http://emos.plurk.com/c3fcc772543180cf38bc261ba988ed73_w19_h19.png',
'http://emos.plurk.com/6d064f12f86604c08b13e319b424261d_w30_h30.gif',
'http://emos.plurk.com/7578271f72a89b0a7acf0490fad33f7e_w18_h22.png',
'http://emos.plurk.com/5e4b6c94b7d27cf7b8e5d11984556eec_w18_h22.png',
'http://emos.plurk.com/9c1c00fa5258eb400243557d1eec0966_w18_h22.png',
'http://emos.plurk.com/655cee39941f9d1ba00b25c474830688_w18_h22.png',
'http://emos.plurk.com/9654a317a9e40198fbe8a903635c932f_w18_h22.png',
'http://emos.plurk.com/d29f04e230fdf82792027685769402ab_w18_h22.png',
'http://emos.plurk.com/3bf1b1342bd484c0d097d7741233dc0b_w18_h22.png',
'http://emos.plurk.com/aa8ea7a9dcad07d2c49059ec6120bbbb_w18_h22.png',
'http://emos.plurk.com/609653c5a3412b08f00ec5c1a5a393bc_w18_h22.png',
'http://emos.plurk.com/d1c3668988879bfbbbfbcd2b42c87fb3_w19_h19.png',
'http://emos.plurk.com/86cf36552ed885ce6d4792ed95845f53_w19_h19.gif',
'http://emos.plurk.com/de53e926615570786f10fa9d1982bccc_w37_h20.gif',
'http://emos.plurk.com/97251ef70606e90ad8e4c158137af059_w19_h19.png',
'http://emos.plurk.com/51c767b415256c59100e8db00df5e3dd_w19_h19.png',
'http://emos.plurk.com/d587c8f9cac9a26f9c309b8ace836814_w22_h22.gif',
'http://emos.plurk.com/7f7367382ddea5f318d2489a23a92902_w19_h19.png',
'http://emos.plurk.com/20aaba78b414a2d4a2549ad50a844c2c_w18_h22.png',
'http://emos.plurk.com/6c0f9911c4f991e10ee8807300164416_w19_h19.gif',
'http://emos.plurk.com/77aca2f63a19be353d7481e8e3718168_w20_h20.gif',
'http://emos.plurk.com/88edb8cd1de4fb63bca338116218efe4_w43_h27.gif',
'http://emos.plurk.com/19015076dd3561da6690741f64d4efba_w34_h33.gif',
'http://emos.plurk.com/32324992f574e72b2d49eb0a2df9af54_w40_h23.gif',
'http://emos.plurk.com/ee4ecbb4148d099002e1483ea163fbdd_w18_h22.png',
'http://emos.plurk.com/2e99c506a22e0a351bcc79e72e4cfd82_w18_h22.png',
'http://emos.plurk.com/920da4fe30e750e69aae4b5e8af19389_w18_h22.png',
'http://emos.plurk.com/e5e2f2c26fa4c60576189b71fac7c193_w18_h22.png',
'http://emos.plurk.com/b4a1adc046f4c9c82c405c82e1f1663a_w46_h23.gif',
'http://emos.plurk.com/42ab76a1689cc1a295d914d886ceb492_w30_h30.gif',
'http://emos.plurk.com/c82300cef8ec43aad275824da6d2b510_w30_h30.gif',
'http://emos.plurk.com/97c6a19e549d86ff01e71718085334c0_w18_h18.gif',
'http://emos.plurk.com/5301bd02927135c5a800998c67bed915_w20_h20.gif',
'http://emos.plurk.com/a30b565313f30a27dfe96200ab841a8f_w28_h28.gif',
'http://emos.plurk.com/3e83f527d1888326aad3dcca171b3a0a_w21_h21.gif',
'http://emos.plurk.com/a662364f9718c0eca8f2fb474e0c8130_w19_h19.jpeg',
'http://emos.plurk.com/7193092eecae9a80ef5b5972715b4906_w32_h28.gif',
'http://emos.plurk.com/2ef90a40e4e440395c7f763e7e70498a_w19_h19.gif',
'http://emos.plurk.com/0d59132686628fec8f4d787c00f3cb3f_w19_h19.gif',
'http://emos.plurk.com/9dc4b1d01bdb3bb2b02b797781ff753e_w19_h19.gif',
'http://emos.plurk.com/52515ebf2a356d7e2f48acd43adbb24d_w19_h19.gif',
'http://emos.plurk.com/4cc7f52a453555082d0af28df1b85df8_w20_h20.gif',
'http://emos.plurk.com/35238a5f65c02a28825ff61562f646a0_w23_h24.gif',
'http://emos.plurk.com/a72b41750e3133bee4046e214198bf88_w20_h19.gif',
'http://emos.plurk.com/e4cd069631974935fa33ef13086faa90_w20_h20.bmp',
'http://emos.plurk.com/3b34009d962609a7c20b6df9c0920875_w20_h27.gif',
'http://emos.plurk.com/20ddd215ef219e04cd01be9667688238_w23_h23.gif',
'http://emos.plurk.com/a1328747fec499a04a42c3d94ca8c9cc_w21_h21.jpeg',
'http://emos.plurk.com/92ec82cc7ba874c0ac7102a689fa4d5e_w19_h19.png',
'http://emos.plurk.com/0405fd1dfb459de23a5e14e1a27edffc_w18_h22.png',
'http://emos.plurk.com/8c833a518e6a64a8e55b2015929df30c_w21_h21.gif',
'http://emos.plurk.com/448e37765459a35e5e401fed2f5c0a33_w19_h19.gif',
'http://emos.plurk.com/a03e3711ba8ff2db8fde5d43b9454406_w19_h19.gif',
'http://emos.plurk.com/e96a64c243082bb91c7bcb4d970418f2_w21_h21.bmp',
'http://emos.plurk.com/69bc6d90c24715e93bbfe5cb363208dc_w19_h19.png',
'http://emos.plurk.com/db4a4d64830f24d2f7be8dfe2d34711c_w19_h19.png',
'http://emos.plurk.com/e2c89297eed55fa93c0f88f8b0e4bb3d_w20_h20.gif',
'http://emos.plurk.com/36246d4b9ead568eb3a3b54a2bebff77_w37_h27.gif',
'http://emos.plurk.com/fda94abdf64f41d5d143a5c0038d9e29_w19_h19.gif',
'http://emos.plurk.com/94d2ef350b5a5b37b296bc342403a377_w45_h25.gif',
'http://emos.plurk.com/f65fcf02d6da1063cd3aaa2820a92486_w19_h19.png',
'http://emos.plurk.com/3449ad2c2cf08970901ef59fcf083afa_w19_h19.gif',
'http://emos.plurk.com/bc2f06c773a2389465c0674ab6bc1083_w19_h19.gif',
'http://emos.plurk.com/cbbe5480da0a0a8ca6616b2cc4635f1f_w19_h19.gif',
'http://emos.plurk.com/9439a662fc39295b097a3dc398c2c391_w19_h19.png',
'http://emos.plurk.com/7e5d72a333549630a798048ebce32582_w19_h21.gif',
'http://emos.plurk.com/6b6c30ab47738bd52565cb4a3419d90e_w25_h25.gif',
'http://emos.plurk.com/3ea5deb2fe345658640d7ab89b5b71dd_w19_h19.png',
'http://emos.plurk.com/ab4c5c56a62b8ace52cac658591ca576_w30_h30.png',
'http://emos.plurk.com/320de4a310e2fd309a0e75c337919a95_w27_h26.gif',
'http://emos.plurk.com/a51648437e0b9d1761d19122ae32ccde_w19_h19.gif',
'http://emos.plurk.com/8f4b2a7526b515b96a615420187b05ba_w19_h19.gif',
'http://emos.plurk.com/aa5a39e795debf9c44364840e7358580_w19_h19.gif',
'http://emos.plurk.com/f07d726bfcab11c1bdd16191a335bc93_w20_h20.gif',
'http://emos.plurk.com/8bed394c5e04eb1c74700afe33904b16_w20_h20.gif',
'http://emos.plurk.com/a31db6e49ab268b2303a6f8494032595_w19_h19.png',
'http://emos.plurk.com/a75c4342f748f28dc83c2c3d78bb259e_w19_h19.png',
'http://emos.plurk.com/25643a9b28fc06464cec668de2f45d02_w19_h19.gif',
'http://emos.plurk.com/a03e3711ba8ff2db8fde5d43b9454406_w19_h19.gif',
'http://emos.plurk.com/25e4ae05cbeaccdc7c5bf586526e3123_w19_h19.gif',
'http://emos.plurk.com/9de73257adfb13d887acb2712cc35543_w30_h20.gif',
'http://emos.plurk.com/be46071c4525931e033fe6a4f0217efc_w38_h18.gif',
'http://emos.plurk.com/1f9dbfacda5d35d12297db3c366e9322_w21_h21.gif',
'http://emos.plurk.com/9c0353df6abba656d9dd27af36ac8de9_w19_h19.gif',
'http://emos.plurk.com/c6ec5575e57d92704e737a7ac733c4f4_w19_h18.gif',
'http://emos.plurk.com/da86b4d64a6029c2ca403448638df09a_w19_h19.gif',
'http://emos.plurk.com/9a4f7c8dfaadcf4ac059665d6118bba1_w19_h19.gif',
'http://emos.plurk.com/856501871531971ef3ab0f66a5e5437b_w24_h22.gif',
'http://emos.plurk.com/57cf23ca0feca5d7414b4e0e379ff2c3_w22_h18.gif',
'http://emos.plurk.com/026d78138d71e7308beaf9045d592280_w19_h19.bmp',
'http://emos.plurk.com/4bbfa36f7057195aeb956364c69041c8_w20_h26.gif',
'http://emos.plurk.com/937ce995c5f1b584149ba4f6424e2d8f_w29_h30.gif',
'http://emos.plurk.com/ecc5ba84c89ec05f5bc58218aa13f8f6_w19_h19.png',
'http://emos.plurk.com/157c929ffd34bd232b239ae695f311e8_w19_h19.png',
'http://emos.plurk.com/49326087a67ac568ce06962067aef2e8_w27_h27.bmp',
'http://emos.plurk.com/41f9dab9bae691a4fee51d57ca5ffae2_w19_h19.bmp',
'http://emos.plurk.com/5dae15aafaf6fe8437685c8461ab742a_w19_h19.gif',
'http://emos.plurk.com/c4b2c3e75424910318bab2f233fd9f4a_w30_h30.gif',


]]);


smileData.push(['2', '', [
'http://emos.plurk.com/9679c83e97d074fc48dec92295e6e965_w17_h17.gif',
'http://emos.plurk.com/f41bf07cb141ad8fa6571d75706f0715_w41_h31.gif',
'http://emos.plurk.com/003abc702484e539dff282d285bae2d2_w48_h48.gif',
'http://emos.plurk.com/549b61cd5ca3e0b288b6dfdf1648beea_w48_h18.gif',
'http://emos.plurk.com/90ae16f2a1c424fb4f451228565fad23_w48_h42.gif',
'http://emos.plurk.com/ac184c56708d1e790914739054b50f4d_w45_h18.gif',
'http://emos.plurk.com/e9b044963fe6d207a02cc67bc2505c28_w30_h30.gif',
'http://emos.plurk.com/fbb6a2577ccca6f7e9a6cb4fd69d05d2_w30_h24.gif',
'http://emos.plurk.com/61cc26b6ddc2d1dd5f8c32f9912fdc21_w48_h21.gif',
'http://emos.plurk.com/4877bc5e785977bd5ca0b6708f67241b_w21_h40.gif',
'http://emos.plurk.com/d4d0e041305db26924aaa9ba3cc0a884_w35_h18.gif',
'http://emos.plurk.com/a83925e135532a36cc309bc576943bc0_w35_h23.gif',
'http://emos.plurk.com/2ea6397a4a687656b268b1e87c17e8e0_w40_h40.gif',
'http://emos.plurk.com/384234c708acdb7d7834c21821a822fb_w33_h21.gif',
'http://emos.plurk.com/08b48375289bb5186b2258118f1caa91_w38_h24.gif',
'http://emos.plurk.com/e9b044963fe6d207a02cc67bc2505c28_w30_h30.gif',
'http://emos.plurk.com/9373cc0a52a1bbf875fbb4b6e9826a8c_w25_h27.gif',
'http://emos.plurk.com/25a2fa0418288c5bcd8d9abc6f30fd20_w32_h32.gif',
'http://emos.plurk.com/44f232af1ecba23bbc6ca67eaf2ffee0_w38_h32.gif',
'http://emos.plurk.com/e8f364fd0903e1eeed107e9b99f7ae96_w27_h19.gif',
'http://emos.plurk.com/20ed36d07b882d120455bb70bcc80de1_w37_h35.jpeg',
'http://emos.plurk.com/68326fd784243fe372f6f6b4b63ec4d0_w40_h40.gif',
'http://emos.plurk.com/d76e385177a4abfa26aeae8d94867fda_w33_h21.gif',
'http://emos.plurk.com/631d133295f908df6afbb6ab55a41002_w27_h18.gif',
'http://emos.plurk.com/e4480a56cd7eaf900532812e7334edd1_w19_h23.gif',
'http://emos.plurk.com/384a0f937fc621ab0ea46bbfb97894e8_w39_h30.gif',
'http://emos.plurk.com/40a2350f0ac5e287e068e19abb20a94c_w25_h22.gif',
'http://emos.plurk.com/ff93af0cb6300c09f60f9a8b968f9ccf_w37_h20.gif',
'http://emos.plurk.com/8e6f6de272024dbe7344ddf91fcc39a1_w30_h21.gif',
'http://emos.plurk.com/2b4b4008fd28bcccc5e6dd86582163ba_w42_h28.gif',
'http://emos.plurk.com/48bcd2f421ff93d02916fd400bef915c_w40_h28.gif',
'http://emos.plurk.com/70ff9eeb56851b876036c282955003ea_w30_h15.gif',
'http://emos.plurk.com/9fe2e4d1504895c70c3680c0d998c27d_w30_h26.gif',
'http://emos.plurk.com/0dcad0728f7fbb3971a6c0e43fb382f8_w21_h24.gif',
'http://emos.plurk.com/aad62c4445945422d38e469355bddb8d_w27_h23.gif',
'http://emos.plurk.com/5808b4e7975e104871a608cf30f9f8a8_w48_h37.gif',
'http://emos.plurk.com/a30ac66c1ea744e803472eb653cab22e_w28_h20.gif',
'http://emos.plurk.com/590234a69b800747e5ba781fea16f04d_w19_h19.gif',
'http://emos.plurk.com/c7de793c16ea06263648f4bb56ccdcb0_w30_h21.gif',
'http://emos.plurk.com/fb015bb4cbc64f31f5228e5f536ef8f2_w40_h40.gif',
'http://emos.plurk.com/25f3188cc4c4259aa7fcb18276c63f99_w22_h15.gif',
'http://emos.plurk.com/690275cd203e62842292947c2cdd3ff2_w42_h29.gif',
'http://emos.plurk.com/f9b21c23da8c8ac340edea31f925cf5c_w26_h25.gif',
'http://emos.plurk.com/539afca979de95f5e66c093ab8b7a3de_w33_h44.gif',
'http://emos.plurk.com/e47b1a6be490aa5178d40356d0322712_w33_h48.gif',
'http://emos.plurk.com/f6575a5544257d8f045a27e8724fbd37_w38_h44.png',
'http://emos.plurk.com/47deaa29921f94049b9bf5820083d266_w19_h16.gif',
'http://emos.plurk.com/48f4dbfc9dff1d4f54322a3f52c21d08_w17_h15.gif',
'http://emos.plurk.com/4f69301597a6f5a639c77c58cfb45a77_w20_h20.gif',
'http://emos.plurk.com/241abf205a0dfd954fc67db38ceb497f_w30_h30.gif',
'http://emos.plurk.com/7cf6f704c36e72f4d430455b1452c601_w25_h20.gif',
'http://emos.plurk.com/b6a1cea5bf251462763a8289720e453e_w19_h19.png',
'http://emos.plurk.com/9c751fbf5028b476f68742feec41a11e_w32_h32.png',
'http://emos.plurk.com/2002ce1031b65201a5752c513caacc04_w40_h30.gif',
'http://emos.plurk.com/1a3333f636619c5988fb463a0485e612_w24_h24.gif',
'http://emos.plurk.com/1616e6603d2bdda1c49378724c9edb49_w45_h28.gif',
'http://emos.plurk.com/ef2303e9aead36e9f40b20a3489a3668_w21_h27.png',
'http://emos.plurk.com/b2f4b615e99f2c10de008c5a81b2f0b3_w35_h34.gif',
'http://emos.plurk.com/4e8f49c7db0c31fdb620d901d37de30a_w15_h15.gif',
'http://emos.plurk.com/e0c7c372f23fd436832cb50dc2665e4c_w15_h15.gif',
'http://emos.plurk.com/64e68996de25b41662793352aa156f12_w21_h21.gif',
'http://emos.plurk.com/a556c43b805644d05d8a0282d0429940_w30_h30.gif',
'http://emos.plurk.com/3b55f5f80dd7f84dd178579ed89b6b18_w44_h29.gif',
'http://emos.plurk.com/5da7e92807fb5e4f982e6be29e886bfb_w30_h17.gif',
'http://emos.plurk.com/58807075baaae0fa55dca290a2cd7e75_w15_h15.gif',
'http://emos.plurk.com/c7bdf3a765a34571915d98953958fa4f_w23_h15.gif',
'http://emos.plurk.com/d7d2c6941fb6ea5fccca52094f0b2a99_w29_h21.gif',
'http://emos.plurk.com/8367fc159ba82f2041449c7bf740b7f4_w26_h19.gif',
'http://emos.plurk.com/d1f4d0c19585dfa07655a310058173b3_w47_h24.gif',
'http://emos.plurk.com/1e44d4ce919aa18f02fcc18f3fa73c89_w47_h20.gif',
'http://emos.plurk.com/f664574368b1075968ad29650a0fe96c_w15_h15.gif',
'http://emos.plurk.com/d8746259b87e1a87cafc53902b0bd12d_w22_h15.gif',
'http://emos.plurk.com/19c5aaf71e87e45c8188e78b745e6c14_w26_h18.gif',
'http://emos.plurk.com/ae3c5c41114ea2263a8969739af8e28c_w41_h25.gif',
'http://emos.plurk.com/9e9a9bec3180f73c3a34d7d8e9a282f3_w31_h17.gif',
'http://emos.plurk.com/a22dc04cc18fb87bb8472b17fa30380a_w43_h31.gif',
'http://emos.plurk.com/75f7c9debc69fbc0687d1ccfac97d136_w17_h18.gif',
'http://emos.plurk.com/629172ad78591578e02088a9a316834e_w16_h20.gif',
'http://emos.plurk.com/6781b296b4a8406b47835d7b1d99944f_w15_h15.gif',
'http://emos.plurk.com/267bc7b66cfda650b075fe682475691d_w22_h24.gif',
'http://emos.plurk.com/e90c2a77be8f09b9fd0f1081ed78f39c_w31_h26.gif',
'http://emos.plurk.com/5f91d680f7c4690f6b43cb99f3d9faf6_w32_h28.gif',
'http://emos.plurk.com/1fb7260cf441be79b537a9a161436ba0_w30_h17.gif',
'http://emos.plurk.com/15043fd79667fe98396e74518d69bad6_w29_h30.gif',
'http://emos.plurk.com/4d6a1b7df8636c778bca784852235311_w33_h16.gif',
'http://emos.plurk.com/9a680a43b14f2305a4c3f6588c2623ce_w22_h25.gif',
'http://emos.plurk.com/81344426b09d71a75ff6fa964a3f1dff_w45_h32.gif',
'http://emos.plurk.com/4e8b1fb4bd64475d4ce86a675efb8390_w23_h15.gif',
'http://emos.plurk.com/5120ac973ea8745b17959d37d8d7ce25_w25_h26.gif',
'http://emos.plurk.com/54e3a60c7391ddd49abca9538961d017_w18_h17.gif',
'http://emos.plurk.com/5d357b58a03343d32c31d478af4a05ba_w15_h15.gif',
'http://emos.plurk.com/3a90ef8bc5a525900461298d20552448_w15_h15.gif',
'http://emos.plurk.com/ea1a73ca3c4c140afff9edecc6c613e3_w16_h15.gif',
'http://emos.plurk.com/99d35acce93cc8a9a6f5e3a439835294_w15_h15.gif',
'http://emos.plurk.com/9ee9cfaac1dcb5178e98ac4ef500f55e_w15_h15.gif',
'http://emos.plurk.com/8f955fd8a053a666c2e4b2da9d69e5a2_w15_h19.gif',
'http://emos.plurk.com/17ee24ecc2e40afc4d6aa9b1647fcfba_w36_h37.gif',
'http://emos.plurk.com/6855ce21f691759e25773a603da72962_w33_h24.gif',
'http://emos.plurk.com/245e78dcf548f6be72a2c800e6718a94_w38_h18.gif',
'http://emos.plurk.com/c987bff253267e37c823d12705562cd9_w19_h16.gif',
'http://emos.plurk.com/430e9fc59d990ed70afa52635a2d5b83_w15_h15.gif',
'http://emos.plurk.com/f92f357f35fe87cb2a1bcb3bda1eac96_w15_h15.gif',
'http://emos.plurk.com/658d888e3770eb18fecbfb22f4f89476_w15_h20.gif',
'http://emos.plurk.com/b36dc0ee305f5796f828d3ff80847ae8_w37_h17.gif',
'http://emos.plurk.com/4c5bf6755438a8a9cd6f9729e947f4c2_w15_h15.gif',
'http://emos.plurk.com/a8f23fa55ef96722225aa53004e94fc6_w25_h25.gif',
'http://emos.plurk.com/a0006602f9c7ef10e3d5f0cf51de4e2d_w32_h20.gif',
'http://emos.plurk.com/782e4d92d91f21550d9bda6251f8fb8f_w41_h19.gif',
'http://emos.plurk.com/e05b9c7e2ff5571fe1e2ccd72a9a16ad_w25_h15.gif',
'http://emos.plurk.com/24302b4ea4f9e09957bb2852d6f54b40_w23_h15.gif',
'http://emos.plurk.com/930856ab76dcc89a394417575329a2ef_w17_h17.gif',
'http://emos.plurk.com/f9d9abd311aea7cb1e67da828d391ae0_w30_h15.gif',
'http://emos.plurk.com/3f314ecdefe1687b0da300a4ae2f7d51_w22_h25.gif',
'http://emos.plurk.com/ab6f802784e68a583d7a7bcb53c4eec3_w18_h20.gif',
'http://emos.plurk.com/2673d7f2958feecde51e0ac98791ed76_w15_h15.gif',
'http://emos.plurk.com/b29a5b0d44d5e4f74547bd8c82e40f94_w15_h15.gif',






    ], [ 
'http://emos.plurk.com/9679c83e97d074fc48dec92295e6e965_w17_h17.gif',
'http://emos.plurk.com/f41bf07cb141ad8fa6571d75706f0715_w41_h31.gif',
'http://emos.plurk.com/003abc702484e539dff282d285bae2d2_w48_h48.gif',
'http://emos.plurk.com/549b61cd5ca3e0b288b6dfdf1648beea_w48_h18.gif',
'http://emos.plurk.com/90ae16f2a1c424fb4f451228565fad23_w48_h42.gif',
'http://emos.plurk.com/ac184c56708d1e790914739054b50f4d_w45_h18.gif',
'http://emos.plurk.com/e9b044963fe6d207a02cc67bc2505c28_w30_h30.gif',
'http://emos.plurk.com/fbb6a2577ccca6f7e9a6cb4fd69d05d2_w30_h24.gif',
'http://emos.plurk.com/61cc26b6ddc2d1dd5f8c32f9912fdc21_w48_h21.gif',
'http://emos.plurk.com/4877bc5e785977bd5ca0b6708f67241b_w21_h40.gif',
'http://emos.plurk.com/d4d0e041305db26924aaa9ba3cc0a884_w35_h18.gif',
'http://emos.plurk.com/a83925e135532a36cc309bc576943bc0_w35_h23.gif',
'http://emos.plurk.com/2ea6397a4a687656b268b1e87c17e8e0_w40_h40.gif',
'http://emos.plurk.com/384234c708acdb7d7834c21821a822fb_w33_h21.gif',
'http://emos.plurk.com/08b48375289bb5186b2258118f1caa91_w38_h24.gif',
'http://emos.plurk.com/e9b044963fe6d207a02cc67bc2505c28_w30_h30.gif',
'http://emos.plurk.com/9373cc0a52a1bbf875fbb4b6e9826a8c_w25_h27.gif',
'http://emos.plurk.com/25a2fa0418288c5bcd8d9abc6f30fd20_w32_h32.gif',
'http://emos.plurk.com/44f232af1ecba23bbc6ca67eaf2ffee0_w38_h32.gif',
'http://emos.plurk.com/e8f364fd0903e1eeed107e9b99f7ae96_w27_h19.gif',
'http://emos.plurk.com/20ed36d07b882d120455bb70bcc80de1_w37_h35.jpeg',
'http://emos.plurk.com/68326fd784243fe372f6f6b4b63ec4d0_w40_h40.gif',
'http://emos.plurk.com/d76e385177a4abfa26aeae8d94867fda_w33_h21.gif',
'http://emos.plurk.com/631d133295f908df6afbb6ab55a41002_w27_h18.gif',
'http://emos.plurk.com/e4480a56cd7eaf900532812e7334edd1_w19_h23.gif',
'http://emos.plurk.com/384a0f937fc621ab0ea46bbfb97894e8_w39_h30.gif',
'http://emos.plurk.com/40a2350f0ac5e287e068e19abb20a94c_w25_h22.gif',
'http://emos.plurk.com/ff93af0cb6300c09f60f9a8b968f9ccf_w37_h20.gif',
'http://emos.plurk.com/8e6f6de272024dbe7344ddf91fcc39a1_w30_h21.gif',
'http://emos.plurk.com/2b4b4008fd28bcccc5e6dd86582163ba_w42_h28.gif',
'http://emos.plurk.com/48bcd2f421ff93d02916fd400bef915c_w40_h28.gif',
'http://emos.plurk.com/70ff9eeb56851b876036c282955003ea_w30_h15.gif',
'http://emos.plurk.com/9fe2e4d1504895c70c3680c0d998c27d_w30_h26.gif',
'http://emos.plurk.com/0dcad0728f7fbb3971a6c0e43fb382f8_w21_h24.gif',
'http://emos.plurk.com/aad62c4445945422d38e469355bddb8d_w27_h23.gif',
'http://emos.plurk.com/5808b4e7975e104871a608cf30f9f8a8_w48_h37.gif',
'http://emos.plurk.com/a30ac66c1ea744e803472eb653cab22e_w28_h20.gif',
'http://emos.plurk.com/590234a69b800747e5ba781fea16f04d_w19_h19.gif',
'http://emos.plurk.com/c7de793c16ea06263648f4bb56ccdcb0_w30_h21.gif',
'http://emos.plurk.com/fb015bb4cbc64f31f5228e5f536ef8f2_w40_h40.gif',
'http://emos.plurk.com/25f3188cc4c4259aa7fcb18276c63f99_w22_h15.gif',
'http://emos.plurk.com/690275cd203e62842292947c2cdd3ff2_w42_h29.gif',
'http://emos.plurk.com/f9b21c23da8c8ac340edea31f925cf5c_w26_h25.gif',
'http://emos.plurk.com/539afca979de95f5e66c093ab8b7a3de_w33_h44.gif',
'http://emos.plurk.com/e47b1a6be490aa5178d40356d0322712_w33_h48.gif',
'http://emos.plurk.com/f6575a5544257d8f045a27e8724fbd37_w38_h44.png',
'http://emos.plurk.com/47deaa29921f94049b9bf5820083d266_w19_h16.gif',
'http://emos.plurk.com/48f4dbfc9dff1d4f54322a3f52c21d08_w17_h15.gif',
'http://emos.plurk.com/4f69301597a6f5a639c77c58cfb45a77_w20_h20.gif',
'http://emos.plurk.com/241abf205a0dfd954fc67db38ceb497f_w30_h30.gif',
'http://emos.plurk.com/7cf6f704c36e72f4d430455b1452c601_w25_h20.gif',
'http://emos.plurk.com/b6a1cea5bf251462763a8289720e453e_w19_h19.png',
'http://emos.plurk.com/9c751fbf5028b476f68742feec41a11e_w32_h32.png',
'http://emos.plurk.com/2002ce1031b65201a5752c513caacc04_w40_h30.gif',
'http://emos.plurk.com/1a3333f636619c5988fb463a0485e612_w24_h24.gif',
'http://emos.plurk.com/1616e6603d2bdda1c49378724c9edb49_w45_h28.gif',
'http://emos.plurk.com/ef2303e9aead36e9f40b20a3489a3668_w21_h27.png',
'http://emos.plurk.com/b2f4b615e99f2c10de008c5a81b2f0b3_w35_h34.gif',
'http://emos.plurk.com/4e8f49c7db0c31fdb620d901d37de30a_w15_h15.gif',
'http://emos.plurk.com/e0c7c372f23fd436832cb50dc2665e4c_w15_h15.gif',
'http://emos.plurk.com/64e68996de25b41662793352aa156f12_w21_h21.gif',
'http://emos.plurk.com/a556c43b805644d05d8a0282d0429940_w30_h30.gif',
'http://emos.plurk.com/3b55f5f80dd7f84dd178579ed89b6b18_w44_h29.gif',
'http://emos.plurk.com/5da7e92807fb5e4f982e6be29e886bfb_w30_h17.gif',
'http://emos.plurk.com/58807075baaae0fa55dca290a2cd7e75_w15_h15.gif',
'http://emos.plurk.com/c7bdf3a765a34571915d98953958fa4f_w23_h15.gif',
'http://emos.plurk.com/d7d2c6941fb6ea5fccca52094f0b2a99_w29_h21.gif',
'http://emos.plurk.com/8367fc159ba82f2041449c7bf740b7f4_w26_h19.gif',
'http://emos.plurk.com/d1f4d0c19585dfa07655a310058173b3_w47_h24.gif',
'http://emos.plurk.com/1e44d4ce919aa18f02fcc18f3fa73c89_w47_h20.gif',
'http://emos.plurk.com/f664574368b1075968ad29650a0fe96c_w15_h15.gif',
'http://emos.plurk.com/d8746259b87e1a87cafc53902b0bd12d_w22_h15.gif',
'http://emos.plurk.com/19c5aaf71e87e45c8188e78b745e6c14_w26_h18.gif',
'http://emos.plurk.com/ae3c5c41114ea2263a8969739af8e28c_w41_h25.gif',
'http://emos.plurk.com/9e9a9bec3180f73c3a34d7d8e9a282f3_w31_h17.gif',
'http://emos.plurk.com/a22dc04cc18fb87bb8472b17fa30380a_w43_h31.gif',
'http://emos.plurk.com/75f7c9debc69fbc0687d1ccfac97d136_w17_h18.gif',
'http://emos.plurk.com/629172ad78591578e02088a9a316834e_w16_h20.gif',
'http://emos.plurk.com/6781b296b4a8406b47835d7b1d99944f_w15_h15.gif',
'http://emos.plurk.com/267bc7b66cfda650b075fe682475691d_w22_h24.gif',
'http://emos.plurk.com/e90c2a77be8f09b9fd0f1081ed78f39c_w31_h26.gif',
'http://emos.plurk.com/5f91d680f7c4690f6b43cb99f3d9faf6_w32_h28.gif',
'http://emos.plurk.com/1fb7260cf441be79b537a9a161436ba0_w30_h17.gif',
'http://emos.plurk.com/15043fd79667fe98396e74518d69bad6_w29_h30.gif',
'http://emos.plurk.com/4d6a1b7df8636c778bca784852235311_w33_h16.gif',
'http://emos.plurk.com/9a680a43b14f2305a4c3f6588c2623ce_w22_h25.gif',
'http://emos.plurk.com/81344426b09d71a75ff6fa964a3f1dff_w45_h32.gif',
'http://emos.plurk.com/4e8b1fb4bd64475d4ce86a675efb8390_w23_h15.gif',
'http://emos.plurk.com/5120ac973ea8745b17959d37d8d7ce25_w25_h26.gif',
'http://emos.plurk.com/54e3a60c7391ddd49abca9538961d017_w18_h17.gif',
'http://emos.plurk.com/5d357b58a03343d32c31d478af4a05ba_w15_h15.gif',
'http://emos.plurk.com/3a90ef8bc5a525900461298d20552448_w15_h15.gif',
'http://emos.plurk.com/ea1a73ca3c4c140afff9edecc6c613e3_w16_h15.gif',
'http://emos.plurk.com/99d35acce93cc8a9a6f5e3a439835294_w15_h15.gif',
'http://emos.plurk.com/9ee9cfaac1dcb5178e98ac4ef500f55e_w15_h15.gif',
'http://emos.plurk.com/8f955fd8a053a666c2e4b2da9d69e5a2_w15_h19.gif',
'http://emos.plurk.com/17ee24ecc2e40afc4d6aa9b1647fcfba_w36_h37.gif',
'http://emos.plurk.com/6855ce21f691759e25773a603da72962_w33_h24.gif',
'http://emos.plurk.com/245e78dcf548f6be72a2c800e6718a94_w38_h18.gif',
'http://emos.plurk.com/c987bff253267e37c823d12705562cd9_w19_h16.gif',
'http://emos.plurk.com/430e9fc59d990ed70afa52635a2d5b83_w15_h15.gif',
'http://emos.plurk.com/f92f357f35fe87cb2a1bcb3bda1eac96_w15_h15.gif',
'http://emos.plurk.com/658d888e3770eb18fecbfb22f4f89476_w15_h20.gif',
'http://emos.plurk.com/b36dc0ee305f5796f828d3ff80847ae8_w37_h17.gif',
'http://emos.plurk.com/4c5bf6755438a8a9cd6f9729e947f4c2_w15_h15.gif',
'http://emos.plurk.com/a8f23fa55ef96722225aa53004e94fc6_w25_h25.gif',
'http://emos.plurk.com/a0006602f9c7ef10e3d5f0cf51de4e2d_w32_h20.gif',
'http://emos.plurk.com/782e4d92d91f21550d9bda6251f8fb8f_w41_h19.gif',
'http://emos.plurk.com/e05b9c7e2ff5571fe1e2ccd72a9a16ad_w25_h15.gif',
'http://emos.plurk.com/24302b4ea4f9e09957bb2852d6f54b40_w23_h15.gif',
'http://emos.plurk.com/930856ab76dcc89a394417575329a2ef_w17_h17.gif',
'http://emos.plurk.com/f9d9abd311aea7cb1e67da828d391ae0_w30_h15.gif',
'http://emos.plurk.com/3f314ecdefe1687b0da300a4ae2f7d51_w22_h25.gif',
'http://emos.plurk.com/ab6f802784e68a583d7a7bcb53c4eec3_w18_h20.gif',
'http://emos.plurk.com/2673d7f2958feecde51e0ac98791ed76_w15_h15.gif',
'http://emos.plurk.com/b29a5b0d44d5e4f74547bd8c82e40f94_w15_h15.gif',




]]);


smileData.push(['3', '', [
'http://emos.plurk.com/bb54c05fc7d3564151482f127c95c2b7_w47_h47.gif',

 'http://emos.plurk.com/7f5252d858b642014e67f7604367fa89_w39_h39.gif',

'http://emos.plurk.com/0d6758132e0458d68cfc9bf9ccb3c802_w40_h32.gif',

'http://emos.plurk.com/c98027dc018072e816f392fe249cdaab_w40_h24.gif',
'http://emos.plurk.com/e27f7ae0ffa2219121f750503df3d2a5_w27_h35.gif',
'http://emos.plurk.com/aabcadc98095897c0429f17a831df731_w35_h38.gif',
'http://emos.plurk.com/1a0facb604ffb92bcf60c0edb893e86b_w40_h21.gif',
'http://emos.plurk.com/877abde80122dca1ed851b170c331f92_w37_h29.gif',

'http://emos.plurk.com/6450db6913282c55b2ca044fb859f758_w39_h29.gif',

'http://emos.plurk.com/ae7c0051ef691fe1696b859372c691a4_w33_h17.gif',

'http://emos.plurk.com/c89714f89a28c53b0f4384358557b23b_w41_h42.gif',

'http://emos.plurk.com/5ed8426ea61d943f701c310253fbbd76_w30_h18.gif',


'http://emos.plurk.com/197851039c5bf2ff527b26c8d5244157_w19_h19.gif',

'http://emos.plurk.com/6a85166a1f3603b44148386f9e175d62_w19_h18.gif',

'http://emos.plurk.com/a41b6ac2578f063d8d668944c4ba88b7_w37_h29.gif',

'http://emos.plurk.com/f7926f00dbfe7aeae074d817e9fad792_w48_h24.gif',

'http://emos.plurk.com/11c3574b3fa755239fd09f11895a484e_w48_h39.jpeg',

'http://emos.plurk.com/5a36b93f6e4e01dc8fab36ccdff9f8dd_w19_h19.gif',

'http://emos.plurk.com/05b4a6102490febacf12efdcb7ccbfa0_w44_h30.gif',

'http://emos.plurk.com/af863844ce34990cc5723fcb418262e5_w40_h40.gif',

'http://emos.plurk.com/7cb1d208d8157fe9a58d5d6c7758a4ab_w20_h20.gif',

'http://emos.plurk.com/287cb0184fbd27d9fb65fce0ba329783_w36_h38.gif',

'http://emos.plurk.com/d240a64eb7474854cc82c5c7b44af412_w13_h12.gif',

'http://emos.plurk.com/02c89d195ba26d8d85fd1a90f8900a70_w15_h15.gif',

'http://emos.plurk.com/8ff56e570d967c6e11096b6bed4a592f_w48_h48.gif',

'http://emos.plurk.com/fa63cd17503e6fed376bda22c771661e_w46_h34.gif',

'http://emos.plurk.com/6d32045fd4df477c6cc7ebd6e1e0e724_w46_h48.gif',

'http://emos.plurk.com/0bc469515d8cc936d48d3eff2ee51f9e_w30_h27.gif',

'http://emos.plurk.com/276521aaa64e1f8c2e5a62e7f81f1d9c_w31_h15.gif',

'http://emos.plurk.com/64cf4699299aac7fad53b06e6bf95786_w48_h48.gif',

'http://emos.plurk.com/f5ea5f70ef21ffaada31ec9d219f3207_w48_h48.gif',

'http://emos.plurk.com/bc658a59c74f69a2c0e06ca2e300e546_w48_h48.gif',

'http://emos.plurk.com/971c5cf6e62121d0020c2d0c8e9519c3_w48_h35.gif',

'http://emos.plurk.com/800e0cc9b3f674dd451fe854a78aec09_w32_h32.gif',

'http://emos.plurk.com/30f308d571c557b38a62b98d2e1d3efa_w48_h48.gif',

'http://emos.plurk.com/8718c7f8e4a8f667fa67b8c2daf63f83_w28_h24.gif',

'http://emos.plurk.com/0f82164ca7d3938462ca98a40d5107b9_w44_h44.gif',

'http://emos.plurk.com/bcedd83bc16c465de98305ef2df19750_w48_h48.gif',

'http://emos.plurk.com/18ead2df9e1c0339dc90086dd2253084_w19_h19.gif',

'http://emos.plurk.com/d7cb41d70afe2c037545e5dc45abe431_w48_h48.gif',

'http://emos.plurk.com/26b000f5bb353f749b85c8397d74fb24_w48_h48.gif',

'http://emos.plurk.com/a683b26959f4da15f4e3a400c75ad9a9_w17_h18.gif',

'http://emos.plurk.com/68e3a82aa3164127107f1bff39991e23_w20_h20.gif',

'http://emos.plurk.com/be8be5b4db8929eba5ad70939c07222f_w47_h31.gif',

'http://emos.plurk.com/bda67b48fae15b05f5883fd171c9c5f3_w47_h34.gif',

'http://emos.plurk.com/0e544ace12e34209ca5ff05a3e24f732_w19_h19.gif',

'http://emos.plurk.com/6263d2f1ddca5b59988a6bb6e247971b_w37_h21.gif',

'http://emos.plurk.com/3d2c9c0fafe896ff31af53b737baaa86_w23_h11.gif',

'http://emos.plurk.com/f89c9a2c4b1ab054d6ca347038191051_w19_h34.gif',

'http://emos.plurk.com/59005d9ce26a67eae03bce817c5b4cc4_w14_h13.gif',

'http://emos.plurk.com/f8725b55a0269b3849082d3764410357_w41_h28.gif',

'http://emos.plurk.com/81344426b09d71a75ff6fa964a3f1dff_w45_h32.gif',

'http://emos.plurk.com/9193f4a2029a4a3fdd381ec7aafb80f0_w40_h24.gif',

'http://emos.plurk.com/791154e85543805465095858a6eb0182_w48_h48.gif',

'http://emos.plurk.com/d3cb45a725b1f31acc4260370dd2bacf_w48_h34.gif',

'http://emos.plurk.com/fb98ee03de245ba215a83b8186b93a2f_w35_h40.gif',
'http://emos.plurk.com/c48385bab3bbc2365932cacb34587ebd_w35_h40.gif',
'http://emos.plurk.com/87a9131a0d11e08bf642062b367be7d7_w40_h25.gif',
'http://emos.plurk.com/6d1a1e6530ec4ddc1da8061c16fef3b6_w41_h41.gif',
'http://emos.plurk.com/9d1c55cf81a75ae6c3c32052df528257_w48_h48.gif',
'http://emos.plurk.com/e1a0d646a0e32d1ce0a1ec8912e15998_w27_h27.gif',
'http://emos.plurk.com/eb0230921cfb31829d4891a57a81a695_w28_h41.jpeg',
'http://emos.plurk.com/0aef1e61bf35b999776a4c97dfcfec7c_w48_h41.gif',
'http://emos.plurk.com/a74afa9807fbaab08cabe60fd22cb942_w48_h48.gif',
'http://emos.plurk.com/99d22ea83ba84464bcc98a48bd2a0c57_w31_h26.gif',
'http://emos.plurk.com/0f8e4acf34a78bc5cd9ca5727ff04a7c_w20_h20.gif',
'http://emos.plurk.com/dd4fdb1342d9775a9d9641430be688e6_w20_h20.gif',
'http://emos.plurk.com/f6997bc37799a3fc2482526f5f47cd9b_w19_h19.gif',
'http://emos.plurk.com/0b3aaffe5915587e726f1776b6ec32d3_w19_h19.gif',
'http://emos.plurk.com/fe05ff7fdbe0cf68cb2a108f7b8d5b48_w19_h19.gif',


'http://emos.plurk.com/c485c501d18bbcbd65c209ca367131db_w17_h19.gif',
'http://emos.plurk.com/572f74626f9e0fd375ae4f9d7af36112_w20_h20.gif',
'http://emos.plurk.com/66f1ae3004d46b58fdb35d06419e3603_w38_h24.gif',
'http://emos.plurk.com/601aa7ea023428c1b6f492fae21ecebe_w45_h19.gif',
'http://emos.plurk.com/54a995d2248d896a00d24c3b8bd20c49_w43_h39.gif',
'http://emos.plurk.com/8e1591acf31974f7c96c279001a161e7_w14_h27.gif',
'http://emos.plurk.com/6cf298848ef553b8914e2a79b143c5bc_w16_h25.gif',
'http://emos.plurk.com/50a7618d758974a0a7de92b336a7741b_w43_h24.gif',
'http://emos.plurk.com/d944e5c8f8a8aaa49ce0ed8b28996bf7_w45_h30.gif',
'http://emos.plurk.com/0d835aaa20a3d58c539b1b1104faa77b_w26_h22.gif',
'http://emos.plurk.com/5d41bf4f6bc1f0116b26e2d263ffff44_w39_h32.gif',
'http://emos.plurk.com/15a92a66e8b94828c0208eb73e89047c_w20_h20.gif',
'http://emos.plurk.com/f5c3f0538c73ab251bc7bcdab64d4949_w20_h20.gif',

    ], [ 
'http://emos.plurk.com/bb54c05fc7d3564151482f127c95c2b7_w47_h47.gif',

 'http://emos.plurk.com/7f5252d858b642014e67f7604367fa89_w39_h39.gif',

'http://emos.plurk.com/0d6758132e0458d68cfc9bf9ccb3c802_w40_h32.gif',

'http://emos.plurk.com/c98027dc018072e816f392fe249cdaab_w40_h24.gif',
'http://emos.plurk.com/e27f7ae0ffa2219121f750503df3d2a5_w27_h35.gif',
'http://emos.plurk.com/aabcadc98095897c0429f17a831df731_w35_h38.gif',
'http://emos.plurk.com/1a0facb604ffb92bcf60c0edb893e86b_w40_h21.gif',
'http://emos.plurk.com/877abde80122dca1ed851b170c331f92_w37_h29.gif',

'http://emos.plurk.com/6450db6913282c55b2ca044fb859f758_w39_h29.gif',

'http://emos.plurk.com/ae7c0051ef691fe1696b859372c691a4_w33_h17.gif',

'http://emos.plurk.com/c89714f89a28c53b0f4384358557b23b_w41_h42.gif',

'http://emos.plurk.com/5ed8426ea61d943f701c310253fbbd76_w30_h18.gif',


'http://emos.plurk.com/197851039c5bf2ff527b26c8d5244157_w19_h19.gif',

'http://emos.plurk.com/6a85166a1f3603b44148386f9e175d62_w19_h18.gif',

'http://emos.plurk.com/a41b6ac2578f063d8d668944c4ba88b7_w37_h29.gif',

'http://emos.plurk.com/f7926f00dbfe7aeae074d817e9fad792_w48_h24.gif',

'http://emos.plurk.com/11c3574b3fa755239fd09f11895a484e_w48_h39.jpeg',

'http://emos.plurk.com/5a36b93f6e4e01dc8fab36ccdff9f8dd_w19_h19.gif',

'http://emos.plurk.com/05b4a6102490febacf12efdcb7ccbfa0_w44_h30.gif',

'http://emos.plurk.com/af863844ce34990cc5723fcb418262e5_w40_h40.gif',

'http://emos.plurk.com/7cb1d208d8157fe9a58d5d6c7758a4ab_w20_h20.gif',

'http://emos.plurk.com/287cb0184fbd27d9fb65fce0ba329783_w36_h38.gif',

'http://emos.plurk.com/d240a64eb7474854cc82c5c7b44af412_w13_h12.gif',

'http://emos.plurk.com/02c89d195ba26d8d85fd1a90f8900a70_w15_h15.gif',

'http://emos.plurk.com/8ff56e570d967c6e11096b6bed4a592f_w48_h48.gif',

'http://emos.plurk.com/fa63cd17503e6fed376bda22c771661e_w46_h34.gif',

'http://emos.plurk.com/6d32045fd4df477c6cc7ebd6e1e0e724_w46_h48.gif',

'http://emos.plurk.com/0bc469515d8cc936d48d3eff2ee51f9e_w30_h27.gif',

'http://emos.plurk.com/276521aaa64e1f8c2e5a62e7f81f1d9c_w31_h15.gif',

'http://emos.plurk.com/64cf4699299aac7fad53b06e6bf95786_w48_h48.gif',

'http://emos.plurk.com/f5ea5f70ef21ffaada31ec9d219f3207_w48_h48.gif',

'http://emos.plurk.com/bc658a59c74f69a2c0e06ca2e300e546_w48_h48.gif',

'http://emos.plurk.com/971c5cf6e62121d0020c2d0c8e9519c3_w48_h35.gif',

'http://emos.plurk.com/800e0cc9b3f674dd451fe854a78aec09_w32_h32.gif',

'http://emos.plurk.com/30f308d571c557b38a62b98d2e1d3efa_w48_h48.gif',

'http://emos.plurk.com/8718c7f8e4a8f667fa67b8c2daf63f83_w28_h24.gif',

'http://emos.plurk.com/0f82164ca7d3938462ca98a40d5107b9_w44_h44.gif',

'http://emos.plurk.com/bcedd83bc16c465de98305ef2df19750_w48_h48.gif',

'http://emos.plurk.com/18ead2df9e1c0339dc90086dd2253084_w19_h19.gif',

'http://emos.plurk.com/d7cb41d70afe2c037545e5dc45abe431_w48_h48.gif',

'http://emos.plurk.com/26b000f5bb353f749b85c8397d74fb24_w48_h48.gif',

'http://emos.plurk.com/a683b26959f4da15f4e3a400c75ad9a9_w17_h18.gif',

'http://emos.plurk.com/68e3a82aa3164127107f1bff39991e23_w20_h20.gif',

'http://emos.plurk.com/be8be5b4db8929eba5ad70939c07222f_w47_h31.gif',

'http://emos.plurk.com/bda67b48fae15b05f5883fd171c9c5f3_w47_h34.gif',

'http://emos.plurk.com/0e544ace12e34209ca5ff05a3e24f732_w19_h19.gif',

'http://emos.plurk.com/6263d2f1ddca5b59988a6bb6e247971b_w37_h21.gif',

'http://emos.plurk.com/3d2c9c0fafe896ff31af53b737baaa86_w23_h11.gif',

'http://emos.plurk.com/f89c9a2c4b1ab054d6ca347038191051_w19_h34.gif',

'http://emos.plurk.com/59005d9ce26a67eae03bce817c5b4cc4_w14_h13.gif',

'http://emos.plurk.com/f8725b55a0269b3849082d3764410357_w41_h28.gif',

'http://emos.plurk.com/81344426b09d71a75ff6fa964a3f1dff_w45_h32.gif',

'http://emos.plurk.com/9193f4a2029a4a3fdd381ec7aafb80f0_w40_h24.gif',

'http://emos.plurk.com/791154e85543805465095858a6eb0182_w48_h48.gif',

'http://emos.plurk.com/d3cb45a725b1f31acc4260370dd2bacf_w48_h34.gif',

'http://emos.plurk.com/fb98ee03de245ba215a83b8186b93a2f_w35_h40.gif',
'http://emos.plurk.com/c48385bab3bbc2365932cacb34587ebd_w35_h40.gif',
'http://emos.plurk.com/87a9131a0d11e08bf642062b367be7d7_w40_h25.gif',
'http://emos.plurk.com/6d1a1e6530ec4ddc1da8061c16fef3b6_w41_h41.gif',
'http://emos.plurk.com/9d1c55cf81a75ae6c3c32052df528257_w48_h48.gif',
'http://emos.plurk.com/e1a0d646a0e32d1ce0a1ec8912e15998_w27_h27.gif',
'http://emos.plurk.com/eb0230921cfb31829d4891a57a81a695_w28_h41.jpeg',
'http://emos.plurk.com/0aef1e61bf35b999776a4c97dfcfec7c_w48_h41.gif',
'http://emos.plurk.com/a74afa9807fbaab08cabe60fd22cb942_w48_h48.gif',
'http://emos.plurk.com/99d22ea83ba84464bcc98a48bd2a0c57_w31_h26.gif',
'http://emos.plurk.com/0f8e4acf34a78bc5cd9ca5727ff04a7c_w20_h20.gif',
'http://emos.plurk.com/dd4fdb1342d9775a9d9641430be688e6_w20_h20.gif',
'http://emos.plurk.com/f6997bc37799a3fc2482526f5f47cd9b_w19_h19.gif',
'http://emos.plurk.com/0b3aaffe5915587e726f1776b6ec32d3_w19_h19.gif',
'http://emos.plurk.com/fe05ff7fdbe0cf68cb2a108f7b8d5b48_w19_h19.gif',


'http://emos.plurk.com/c485c501d18bbcbd65c209ca367131db_w17_h19.gif',
'http://emos.plurk.com/572f74626f9e0fd375ae4f9d7af36112_w20_h20.gif',
'http://emos.plurk.com/66f1ae3004d46b58fdb35d06419e3603_w38_h24.gif',
'http://emos.plurk.com/601aa7ea023428c1b6f492fae21ecebe_w45_h19.gif',
'http://emos.plurk.com/54a995d2248d896a00d24c3b8bd20c49_w43_h39.gif',
'http://emos.plurk.com/8e1591acf31974f7c96c279001a161e7_w14_h27.gif',
'http://emos.plurk.com/6cf298848ef553b8914e2a79b143c5bc_w16_h25.gif',
'http://emos.plurk.com/50a7618d758974a0a7de92b336a7741b_w43_h24.gif',
'http://emos.plurk.com/d944e5c8f8a8aaa49ce0ed8b28996bf7_w45_h30.gif',
'http://emos.plurk.com/0d835aaa20a3d58c539b1b1104faa77b_w26_h22.gif',
'http://emos.plurk.com/5d41bf4f6bc1f0116b26e2d263ffff44_w39_h32.gif',
'http://emos.plurk.com/15a92a66e8b94828c0208eb73e89047c_w20_h20.gif',
'http://emos.plurk.com/f5c3f0538c73ab251bc7bcdab64d4949_w20_h20.gif',
]]);

smileData.push(['4', '', [

'http://emos.plurk.com/9e66c1ff9d0633881c2383c0f3ba2288_w42_h46.gif',

'http://emos.plurk.com/5841371806d0c93815e8b4961c7e9cc4_w36_h48.gif',

'http://emos.plurk.com/a2197049cceae4f8044de1a7460c48c9_w48_h42.gif',
'http://emos.plurk.com/85a8d84613ea3bc9b1691e3cb705acd3_w48_h40.jpeg',

'http://emos.plurk.com/bc43c08b29df677defe0ee5d757d981c_w39_h39.gif',

'http://emos.plurk.com/38274ff4f89cc880bb31e8f6ded68b9c_w38_h48.gif',

'http://emos.plurk.com/3d275b04e8cb0c9ee9d12a7055d5465b_w42_h42.gif',

'http://emos.plurk.com/c1324b6425ae625454516f0457e77c78_w47_h18.gif',

'http://emos.plurk.com/f46b4a46bea8a83ed4da0e9e0a5bb0c4_w26_h34.gif',

'http://emos.plurk.com/9364bc4d8ad31a5fe237bc46528ecd81_w43_h23.gif',

'http://emos.plurk.com/aac4f300b2899a7fe3a6cf68bab5f7f4_w43_h35.gif',

'http://emos.plurk.com/d08926fcfdde6b73b4a30dd8d311a112_w48_h26.gif',

'http://emos.plurk.com/81d982dcb976b8680db2ca91a8e7844c_w48_h25.gif',
'http://emos.plurk.com/5a1f2a04783fef4ad1dcadb88a3a154c_w33_h26.gif',

'http://emos.plurk.com/8fb4126f54ac872860eb57c2aa01137f_w35_h36.gif',

'http://emos.plurk.com/efbd22da6bf755548ad23567ad58f1ca_w48_h35.gif',

'http://emos.plurk.com/26aae08a677ff9835f74515462de33f0_w36_h34.gif',

'http://emos.plurk.com/3b88c9c752b2c8e857e0451a810ffd54_w44_h48.gif',

'http://emos.plurk.com/fc83fa6b7a370b5ed3cf67e93bb11b05_w33_h35.gif',

'http://emos.plurk.com/20c1cffe55ac3b3a5ba278ca67cd1420_w33_h35.gif',

'http://emos.plurk.com/e507b3497bc8ec488fceb9791fb38953_w39_h39.gif',

'http://emos.plurk.com/fac6feba7d6243832acdbb8aab1ea974_w21_h31.gif',

'http://emos.plurk.com/6123b252245b31749ca4c71f6ced441a_w30_h30.gif',

'http://emos.plurk.com/8ddc9f3a2fdaa8c751544bc376ef6efd_w33_h35.gif',

'http://emos.plurk.com/dcfb4711a9a5ef205073c0142f42b75a_w33_h35.gif',

'http://emos.plurk.com/b65fea205180d07405a0fe4d3604dc35_w25_h18.gif',

'http://emos.plurk.com/543a542ac8a5e1e1b1fba7181b943084_w23_h23.gif',

'http://emos.plurk.com/9ff86a449f25e16a6d10e6293ecb544e_w28_h31.gif',

'http://emos.plurk.com/60ad263d27c226db1d3fb8801e249666_w22_h32.gif',

'http://emos.plurk.com/c96b3c2bbe0d70627f3383724830de80_w29_h18.gif',

'http://emos.plurk.com/2cc84117368b8d7a1ca55de0b499796c_w38_h48.png',

'http://emos.plurk.com/4983384b8a3b10ac83c6c0555b443e54_w32_h25.gif',

'http://emos.plurk.com/0c0692061d7f3b92e373866f587a2299_w20_h20.gif',

'http://emos.plurk.com/5c148995f7bba982f21bbd3603367907_w46_h48.gif',

'http://emos.plurk.com/3b2fcccf2e008f97d8575ccccfb462ed_w30_h26.gif',

'http://emos.plurk.com/7a2c822a16199e15da7f8ba62d338b92_w48_h43.gif',

'http://emos.plurk.com/655ede7546cd4af021fc0dd6210355f1_w43_h23.gif',

'http://emos.plurk.com/48b81eb4121421205dc6a60cffc066d4_w19_h19.gif',

'http://emos.plurk.com/1d95eb4f08111df9ccf6b8f08d10d37a_w18_h21.gif',

'http://emos.plurk.com/55f64644ba72bf94db3be34c4e2cf4b9_w36_h30.gif',

'http://emos.plurk.com/6482975244ae635e9a170bf7d0e72668_w21_h22.gif',

'http://emos.plurk.com/2b84abb524ffa22fc7fd16852ae51608_w48_h38.gif',

'http://emos.plurk.com/aea63fd33ef1fc3c4fc4cc02f19c89fd_w32_h32.gif',

'http://emos.plurk.com/682693423dcb91435da88528c1f80b59_w30_h30.gif',

'http://emos.plurk.com/933f22eed2ad0c9d78af26bfc355b0eb_w41_h30.gif',

'http://emos.plurk.com/f56150fd1fc5439015cd5644f6c5f71b_w10_h17.gif',

'http://emos.plurk.com/3c454616f225d331e8ee67f2ada8997d_w17_h17.gif',

'http://emos.plurk.com/229d8f6a33e167647dd5afc4d92106dc_w22_h25.gif',

'http://emos.plurk.com/09e506db21d6667da55d85ebf8e54f89_w34_h18.gif',

'http://emos.plurk.com/82d327964f70c0d2563756917d9c3ce8_w38_h32.gif',

'http://emos.plurk.com/43b55d8e2e65ec54c09cf3098486db66_w35_h39.gif',

'http://emos.plurk.com/24faae2cfcff41dae2c57a328bfa3750_w39_h28.gif',

'http://emos.plurk.com/1539371debb75ad9e68bc641eb0f41ce_w40_h26.gif',

'http://emos.plurk.com/9351cfed1faa66a27da9c0585ebfeacf_w19_h19.gif',

'http://emos.plurk.com/703500eba9fc8e0c777281ba5e8bef5b_w19_h19.gif',

'http://emos.plurk.com/78503d4f9a9b7a52112b090fc231fda2_w19_h19.gif',

'http://emos.plurk.com/1d617c2508494e935628010a8d3a76d5_w20_h20.gif',

'http://emos.plurk.com/94e4bf0be8e95fd8c831a056ca887b65_w25_h26.gif',

'http://emos.plurk.com/6f6d2ab2aa3e10cf2bc9f8031055d00b_w40_h42.gif',

'http://emos.plurk.com/109c33defa891b4af95209c7913502f9_w30_h32.gif',

'http://emos.plurk.com/44d6ed86d7c6b9ceda51caefbb42d0ad_w30_h30.gif',

'http://emos.plurk.com/9d12c75b8af7e99238787776dbbcef41_w32_h32.gif',

'http://emos.plurk.com/df1bf47feebe6e2234a69b35a13664a1_w38_h29.gif',

'http://emos.plurk.com/201a1aec2da6574408229ab8c8585ce3_w26_h22.gif',

'http://emos.plurk.com/29fde23c0b8ceb5d1d58722108db02cc_w44_h45.gif',

'http://emos.plurk.com/bdb9088cd0f014a52600642ca7f5aebe_w26_h24.gif',

'http://emos.plurk.com/7d601151dd01bdb8bed899d8ae3648d7_w48_h48.gif',

'http://emos.plurk.com/708e8e26e67512167301ff841e4bfe93_w47_h35.gif',

'http://emos.plurk.com/62c08f23321933c59ccc51106efc603f_w29_h33.gif',

'http://emos.plurk.com/8acdc0eeb7bac142db6cc151c0219768_w23_h26.gif',

'http://www.mandoubem.com/conteudo/emoticons/6/sel1_108.gif',

'http://emos.plurk.com/eac8ec2a2f7aceb0ec74fbf407ff404d_w48_h48.gif',
'http://emos.plurk.com/2e28b1bb2d91bef3f7f0824454925def_w37_h45.gif',

'http://emos.plurk.com/25954a35b5ae7a164a5164c9cef2042b_w43_h30.gif',

'http://emos.plurk.com/7f5fcf61976fefdb641bfde8a43c4c13_w20_h20.gif',

'http://emos.plurk.com/e4140698b83357056ceb99ca940c26be_w42_h31.gif',
'http://emos.plurk.com/79e4719ee1940e8c63a490c41bc6cf5d_w47_h48.gif',
'http://emos.plurk.com/80f82023199bda98d7b7a4a60aea810f_w48_h48.gif',

'http://emos.plurk.com/6215afe1c0f48aed133c9b8a45f1a8d7_w15_h15.gif',

'http://emos.plurk.com/552fe1bdda1cf1c8ecc72f31b38b6813_w23_h15.gif',

'http://emos.plurk.com/135d3ef0208dee343a80595ce267197d_w17_h15.gif',

'http://emos.plurk.com/47a580409819188e8ba9e579be2722d9_w23_h15.gif',

'http://emos.plurk.com/5efd2caab6c46f3c9fbb0aab1c81f7a7_w29_h15.gif',

'http://emos.plurk.com/72b9f165e1ee81c9f1174e3d43b64e59_w23_h15.gif',

'http://emos.plurk.com/e12e0a0702e8ddbf08d8d77946d1a2d5_w15_h15.gif',

'http://emos.plurk.com/c2bb77c3ff093cbc908e25ef52cf1f5e_w23_h15.gif',



    ], [ 

'http://emos.plurk.com/9e66c1ff9d0633881c2383c0f3ba2288_w42_h46.gif',

'http://emos.plurk.com/5841371806d0c93815e8b4961c7e9cc4_w36_h48.gif',

'http://emos.plurk.com/a2197049cceae4f8044de1a7460c48c9_w48_h42.gif',
'http://emos.plurk.com/85a8d84613ea3bc9b1691e3cb705acd3_w48_h40.jpeg',

'http://emos.plurk.com/bc43c08b29df677defe0ee5d757d981c_w39_h39.gif',

'http://emos.plurk.com/38274ff4f89cc880bb31e8f6ded68b9c_w38_h48.gif',

'http://emos.plurk.com/3d275b04e8cb0c9ee9d12a7055d5465b_w42_h42.gif',

'http://emos.plurk.com/c1324b6425ae625454516f0457e77c78_w47_h18.gif',

'http://emos.plurk.com/f46b4a46bea8a83ed4da0e9e0a5bb0c4_w26_h34.gif',

'http://emos.plurk.com/9364bc4d8ad31a5fe237bc46528ecd81_w43_h23.gif',

'http://emos.plurk.com/aac4f300b2899a7fe3a6cf68bab5f7f4_w43_h35.gif',

'http://emos.plurk.com/d08926fcfdde6b73b4a30dd8d311a112_w48_h26.gif',

'http://emos.plurk.com/81d982dcb976b8680db2ca91a8e7844c_w48_h25.gif',
'http://emos.plurk.com/5a1f2a04783fef4ad1dcadb88a3a154c_w33_h26.gif',

'http://emos.plurk.com/8fb4126f54ac872860eb57c2aa01137f_w35_h36.gif',

'http://emos.plurk.com/efbd22da6bf755548ad23567ad58f1ca_w48_h35.gif',

'http://emos.plurk.com/26aae08a677ff9835f74515462de33f0_w36_h34.gif',

'http://emos.plurk.com/3b88c9c752b2c8e857e0451a810ffd54_w44_h48.gif',

'http://emos.plurk.com/fc83fa6b7a370b5ed3cf67e93bb11b05_w33_h35.gif',

'http://emos.plurk.com/20c1cffe55ac3b3a5ba278ca67cd1420_w33_h35.gif',

'http://emos.plurk.com/e507b3497bc8ec488fceb9791fb38953_w39_h39.gif',

'http://emos.plurk.com/fac6feba7d6243832acdbb8aab1ea974_w21_h31.gif',

'http://emos.plurk.com/6123b252245b31749ca4c71f6ced441a_w30_h30.gif',

'http://emos.plurk.com/8ddc9f3a2fdaa8c751544bc376ef6efd_w33_h35.gif',

'http://emos.plurk.com/dcfb4711a9a5ef205073c0142f42b75a_w33_h35.gif',

'http://emos.plurk.com/b65fea205180d07405a0fe4d3604dc35_w25_h18.gif',

'http://emos.plurk.com/543a542ac8a5e1e1b1fba7181b943084_w23_h23.gif',

'http://emos.plurk.com/9ff86a449f25e16a6d10e6293ecb544e_w28_h31.gif',

'http://emos.plurk.com/60ad263d27c226db1d3fb8801e249666_w22_h32.gif',

'http://emos.plurk.com/c96b3c2bbe0d70627f3383724830de80_w29_h18.gif',

'http://emos.plurk.com/2cc84117368b8d7a1ca55de0b499796c_w38_h48.png',

'http://emos.plurk.com/4983384b8a3b10ac83c6c0555b443e54_w32_h25.gif',

'http://emos.plurk.com/0c0692061d7f3b92e373866f587a2299_w20_h20.gif',

'http://emos.plurk.com/5c148995f7bba982f21bbd3603367907_w46_h48.gif',

'http://emos.plurk.com/3b2fcccf2e008f97d8575ccccfb462ed_w30_h26.gif',

'http://emos.plurk.com/7a2c822a16199e15da7f8ba62d338b92_w48_h43.gif',

'http://emos.plurk.com/655ede7546cd4af021fc0dd6210355f1_w43_h23.gif',

'http://emos.plurk.com/48b81eb4121421205dc6a60cffc066d4_w19_h19.gif',

'http://emos.plurk.com/1d95eb4f08111df9ccf6b8f08d10d37a_w18_h21.gif',

'http://emos.plurk.com/55f64644ba72bf94db3be34c4e2cf4b9_w36_h30.gif',

'http://emos.plurk.com/6482975244ae635e9a170bf7d0e72668_w21_h22.gif',

'http://emos.plurk.com/2b84abb524ffa22fc7fd16852ae51608_w48_h38.gif',

'http://emos.plurk.com/aea63fd33ef1fc3c4fc4cc02f19c89fd_w32_h32.gif',

'http://emos.plurk.com/682693423dcb91435da88528c1f80b59_w30_h30.gif',

'http://emos.plurk.com/933f22eed2ad0c9d78af26bfc355b0eb_w41_h30.gif',

'http://emos.plurk.com/f56150fd1fc5439015cd5644f6c5f71b_w10_h17.gif',

'http://emos.plurk.com/3c454616f225d331e8ee67f2ada8997d_w17_h17.gif',

'http://emos.plurk.com/229d8f6a33e167647dd5afc4d92106dc_w22_h25.gif',

'http://emos.plurk.com/09e506db21d6667da55d85ebf8e54f89_w34_h18.gif',

'http://emos.plurk.com/82d327964f70c0d2563756917d9c3ce8_w38_h32.gif',

'http://emos.plurk.com/43b55d8e2e65ec54c09cf3098486db66_w35_h39.gif',

'http://emos.plurk.com/24faae2cfcff41dae2c57a328bfa3750_w39_h28.gif',

'http://emos.plurk.com/1539371debb75ad9e68bc641eb0f41ce_w40_h26.gif',

'http://emos.plurk.com/9351cfed1faa66a27da9c0585ebfeacf_w19_h19.gif',

'http://emos.plurk.com/703500eba9fc8e0c777281ba5e8bef5b_w19_h19.gif',

'http://emos.plurk.com/78503d4f9a9b7a52112b090fc231fda2_w19_h19.gif',

'http://emos.plurk.com/1d617c2508494e935628010a8d3a76d5_w20_h20.gif',

'http://emos.plurk.com/94e4bf0be8e95fd8c831a056ca887b65_w25_h26.gif',

'http://emos.plurk.com/6f6d2ab2aa3e10cf2bc9f8031055d00b_w40_h42.gif',

'http://emos.plurk.com/109c33defa891b4af95209c7913502f9_w30_h32.gif',

'http://emos.plurk.com/44d6ed86d7c6b9ceda51caefbb42d0ad_w30_h30.gif',

'http://emos.plurk.com/9d12c75b8af7e99238787776dbbcef41_w32_h32.gif',

'http://emos.plurk.com/df1bf47feebe6e2234a69b35a13664a1_w38_h29.gif',

'http://emos.plurk.com/201a1aec2da6574408229ab8c8585ce3_w26_h22.gif',

'http://emos.plurk.com/29fde23c0b8ceb5d1d58722108db02cc_w44_h45.gif',

'http://emos.plurk.com/bdb9088cd0f014a52600642ca7f5aebe_w26_h24.gif',

'http://emos.plurk.com/7d601151dd01bdb8bed899d8ae3648d7_w48_h48.gif',

'http://emos.plurk.com/708e8e26e67512167301ff841e4bfe93_w47_h35.gif',

'http://emos.plurk.com/62c08f23321933c59ccc51106efc603f_w29_h33.gif',

'http://emos.plurk.com/8acdc0eeb7bac142db6cc151c0219768_w23_h26.gif',

'http://www.mandoubem.com/conteudo/emoticons/6/sel1_108.gif',

'http://emos.plurk.com/eac8ec2a2f7aceb0ec74fbf407ff404d_w48_h48.gif',
'http://emos.plurk.com/2e28b1bb2d91bef3f7f0824454925def_w37_h45.gif',

'http://emos.plurk.com/25954a35b5ae7a164a5164c9cef2042b_w43_h30.gif',

'http://emos.plurk.com/7f5fcf61976fefdb641bfde8a43c4c13_w20_h20.gif',

'http://emos.plurk.com/e4140698b83357056ceb99ca940c26be_w42_h31.gif',
'http://emos.plurk.com/79e4719ee1940e8c63a490c41bc6cf5d_w47_h48.gif',
'http://emos.plurk.com/80f82023199bda98d7b7a4a60aea810f_w48_h48.gif',

'http://emos.plurk.com/6215afe1c0f48aed133c9b8a45f1a8d7_w15_h15.gif',

'http://emos.plurk.com/552fe1bdda1cf1c8ecc72f31b38b6813_w23_h15.gif',

'http://emos.plurk.com/135d3ef0208dee343a80595ce267197d_w17_h15.gif',

'http://emos.plurk.com/47a580409819188e8ba9e579be2722d9_w23_h15.gif',

'http://emos.plurk.com/5efd2caab6c46f3c9fbb0aab1c81f7a7_w29_h15.gif',

'http://emos.plurk.com/72b9f165e1ee81c9f1174e3d43b64e59_w23_h15.gif',

'http://emos.plurk.com/e12e0a0702e8ddbf08d8d77946d1a2d5_w15_h15.gif',

'http://emos.plurk.com/c2bb77c3ff093cbc908e25ef52cf1f5e_w23_h15.gif',




]]);


smileData.push(['5', '', [


'http://emos.plurk.com/2f632ebc3dbf773ce16ed06781a8de31_w19_h19.gif',

'http://emos.plurk.com/e4bc489e5d83193bc02ff346142e5d5a_w13_h12.gif',

'http://emos.plurk.com/0773bc5952486007c6d0ab164c0d591a_w13_h12.gif',

'http://emos.plurk.com/c002dec697a38c73203d20f938159a50_w13_h12.gif',

'http://emos.plurk.com/273ff7eb03b4f76f15c8113b4df47d6f_w19_h19.gif',

'http://emos.plurk.com/48f65db11bfbd25e5b6d8f1ad69876d5_w34_h18.gif',

'http://emos.plurk.com/1bb4ad7a4537736909d4aae550d963f5_w18_h18.gif',

'http://emos.plurk.com/cf21e2fd3cbbbd1157faf60d491f36bb_w22_h18.gif',

'http://emos.plurk.com/595b57b9899afc5aa42b6590227bfa0c_w22_h18.gif',

'http://emos.plurk.com/f83923c724cfc51c039c88dd32a084f7_w18_h18.gif',

'http://emos.plurk.com/7ef4a33e7818e2040a902a808397a8a4_w18_h18.gif',

'http://emos.plurk.com/1ff4f9a530c38ed18dfe0c205c784a15_w18_h18.gif',

'http://emos.plurk.com/514e1cfa8f84c79da4d96d8cb5e93aeb_w18_h18.gif',

'http://emos.plurk.com/28afdbdbe4b3151467cdba83b46ad7eb_w20_h18.gif',

'http://emos.plurk.com/ec2a8f0ee25edc930992ec8251c785ba_w18_h18.gif',

'http://emos.plurk.com/a4364cc0987a9aa4b29e928a8f86bb68_w16_h16.png',

'http://emos.plurk.com/dc9a97a13f03d61dac5c242cf54b909d_w16_h16.png',

'http://emos.plurk.com/66bb8e5f82ffa3b293b8681cfd4b9290_w32_h32.gif',

'http://emos.plurk.com/f61ee4d0a8c76308dde2f08815848774_w16_h16.png',

'http://emos.plurk.com/4a8042602eab8dffc29c30e85b608e59_w25_h22.gif',

'http://emos.plurk.com/376728e58c750bab98fd825d7817259b_w33_h35.gif',

'http://emos.plurk.com/964b77539edcdfe1c7ea0fee95eae2aa_w19_h19.gif',

'http://emos.plurk.com/7d7a84db7136218b61c87f3055399d9b_w26_h17.png',

'http://emos.plurk.com/8ca920d66287b6e2999b8ea7f0af844e_w25_h29.gif',

'http://emos.plurk.com/51f9d1d3efdf0a2738fecfdfb052e248_w34_h35.gif',

'http://emos.plurk.com/f88fa5af702144080934eff5e7c2324b_w31_h42.gif',

'http://emos.plurk.com/4b31fcc01ef7a7f446dc564e0b95794c_w39_h34.gif',

'http://emos.plurk.com/99c0d121f63061fd1faa212af78352a3_w31_h27.gif',

'http://emos.plurk.com/b6ab25783e0cd3a69ecf48b5cd50da31_w48_h45.png',

'http://emos.plurk.com/f7a3670698dae3eb3b5bb87e26303eeb_w48_h48.gif',

'http://emos.plurk.com/6effa777191f5ca99c48b32982585402_w42_h43.gif',

'http://emos.plurk.com/3930f8482b121bac3324bd8c18b72a1b_w32_h32.gif',

'http://emos.plurk.com/5915f8f083578f991b21f30b93b7f0d7_w48_h48.gif',


    'http://statics.plurk.com/deda4d9f78ad528d725e3a6bfbf6352f.gif', // ( ???????)
    'http://statics.plurk.com/7256dae81d56d150120ccd0c96dd2197.gif', // (fireworks)
    'http://statics.plurk.com/0efc4d55d28704f4370ef874ae906161.gif', // (code)
    'http://statics.plurk.com/8855f56400a936db07f348d9290adaac.gif', // (code_okok)
    'http://statics.plurk.com/71acd802cc931649dd9a371ccf70bad2.gif', // (hungry_okok)
    'http://statics.plurk.com/74030f05f06547a3d26b02ccbf0bbac7.gif', // (music_okok)
    'http://statics.plurk.com/3acbaf42504fff32c5eac4f12083ce56.gif', // (yarr_okok)
    'http://statics.plurk.com/fcd28d7d78ec1f828c76930fa63270e6.gif', // (gym_okok)
    'http://statics.plurk.com/bac8c8392f7ca8f5ac74612be4d08b74.gif', // (wave_okok)
    'http://statics.plurk.com/a555399b40c379adca5b6f5bad5bf732.gif', // (dance_okok) 
    'http://statics.plurk.com/6675254cd7449b1847a93b0024127eae.gif', // (angry_okok)
    'http://statics.plurk.com/88fac5a4b99110a35d4e4794dad58ab4.gif', // (taser_okok) 
    'http://statics.plurk.com/feb43dbbbf2763905571060be9a496d1.gif', // (no_dance)
    'http://statics.plurk.com/5b51892d7d1f392d93ea7fe26e5100f4.gif', // (banana_gym)
    'http://statics.plurk.com/47d20905d017c396d67b4a30c9ac9b10.png', // (goal)
    'http://statics.plurk.com/129b757f2346a6e5ea782c79f0337ba9.png', // (bzzz)
    'http://statics.plurk.com/4ad099fba019942f13058610ff3fc568.gif', // (dance_bzz)
    'http://statics.plurk.com/4c40d16a0d369b895c08f2e33d062ec8.gif', // (yarr)
    'http://statics.plurk.com/6de58c967f1c2797d250a713ba50eddd.gif', // (dance_yarr)
    'http://statics.plurk.com/b3b9856e557fcc2700fd41c53f9d4910.gif', // (droid_dance)
'http://emos.plurk.com/2df63967a0d4acb96e393bfc744ab41d_w48_h48.gif',
    'http://statics.plurk.com/cfdd2accc1188f5fbc62e149074c7f29.png', // (fuu)
    'http://statics.plurk.com/828b9819249db696701ae0987fba3638.png', // (gfuu)
    'http://statics.plurk.com/1bd653e166492e40e214ef6ce4dd716f.png', // (yay)
    'http://statics.plurk.com/3fe6cf919158597d7ec74f8d90f0cc9f.png', // (gyay)
    'http://statics.plurk.com/9c5c54081547d2ad903648f178fcc595.png', // (bah)
    'http://statics.plurk.com/2da76999ca3716fb4053f3332270e5c9.png', // (gbah)
    'http://statics.plurk.com/f73b773aa689647cb09f57f67a83bb89.png', // (troll)
    'http://statics.plurk.com/45beda260eddc28c82c0d27377e7bf42.png', // (gtroll)
    'http://statics.plurk.com/8590888362ae83daed52e4ca73c296a6.png', // (aha)
    'http://statics.plurk.com/c7551098438cc28ec3b54281d4b09cc3.png', // (gaha)
    'http://statics.plurk.com/cfd84315ebceec0c4389c51cf69132bd.png', // (whatever)
    'http://statics.plurk.com/0e0bf1ec2c2958799666f3995ef830ca.png', // (gwhatever)
    'http://statics.plurk.com/e2998ca75f80c1c4a5508c549e3980a6.png', // (pokerface)
    'http://statics.plurk.com/c6ad1c4f9e11f6859a1ba39c4341ef8b.png', // (gpokerface)
    'http://statics.plurk.com/4a61085f1c6a639f028cd48ae97d07d0.png', // (yea)
    'http://statics.plurk.com/53253ca60f5831f0812954213a2e9bb3.png', // (gyea)
    'http://statics.plurk.com/6928f3117658cc38d94e70519a511005.png',  // (jazzhands)
    ], [ 

'http://emos.plurk.com/2f632ebc3dbf773ce16ed06781a8de31_w19_h19.gif',

'http://emos.plurk.com/e4bc489e5d83193bc02ff346142e5d5a_w13_h12.gif',

'http://emos.plurk.com/0773bc5952486007c6d0ab164c0d591a_w13_h12.gif',

'http://emos.plurk.com/c002dec697a38c73203d20f938159a50_w13_h12.gif',

'http://emos.plurk.com/273ff7eb03b4f76f15c8113b4df47d6f_w19_h19.gif',

'http://emos.plurk.com/48f65db11bfbd25e5b6d8f1ad69876d5_w34_h18.gif',

'http://emos.plurk.com/1bb4ad7a4537736909d4aae550d963f5_w18_h18.gif',

'http://emos.plurk.com/cf21e2fd3cbbbd1157faf60d491f36bb_w22_h18.gif',

'http://emos.plurk.com/595b57b9899afc5aa42b6590227bfa0c_w22_h18.gif',

'http://emos.plurk.com/f83923c724cfc51c039c88dd32a084f7_w18_h18.gif',

'http://emos.plurk.com/7ef4a33e7818e2040a902a808397a8a4_w18_h18.gif',

'http://emos.plurk.com/1ff4f9a530c38ed18dfe0c205c784a15_w18_h18.gif',

'http://emos.plurk.com/514e1cfa8f84c79da4d96d8cb5e93aeb_w18_h18.gif',

'http://emos.plurk.com/28afdbdbe4b3151467cdba83b46ad7eb_w20_h18.gif',

'http://emos.plurk.com/ec2a8f0ee25edc930992ec8251c785ba_w18_h18.gif',

'http://emos.plurk.com/a4364cc0987a9aa4b29e928a8f86bb68_w16_h16.png',

'http://emos.plurk.com/dc9a97a13f03d61dac5c242cf54b909d_w16_h16.png',

'http://emos.plurk.com/66bb8e5f82ffa3b293b8681cfd4b9290_w32_h32.gif',

'http://emos.plurk.com/f61ee4d0a8c76308dde2f08815848774_w16_h16.png',

'http://emos.plurk.com/4a8042602eab8dffc29c30e85b608e59_w25_h22.gif',

'http://emos.plurk.com/376728e58c750bab98fd825d7817259b_w33_h35.gif',

'http://emos.plurk.com/964b77539edcdfe1c7ea0fee95eae2aa_w19_h19.gif',

'http://emos.plurk.com/7d7a84db7136218b61c87f3055399d9b_w26_h17.png',

'http://emos.plurk.com/8ca920d66287b6e2999b8ea7f0af844e_w25_h29.gif',

'http://emos.plurk.com/51f9d1d3efdf0a2738fecfdfb052e248_w34_h35.gif',

'http://emos.plurk.com/f88fa5af702144080934eff5e7c2324b_w31_h42.gif',

'http://emos.plurk.com/4b31fcc01ef7a7f446dc564e0b95794c_w39_h34.gif',

'http://emos.plurk.com/99c0d121f63061fd1faa212af78352a3_w31_h27.gif',

'http://emos.plurk.com/b6ab25783e0cd3a69ecf48b5cd50da31_w48_h45.png',

'http://emos.plurk.com/f7a3670698dae3eb3b5bb87e26303eeb_w48_h48.gif',

'http://emos.plurk.com/6effa777191f5ca99c48b32982585402_w42_h43.gif',

'http://emos.plurk.com/3930f8482b121bac3324bd8c18b72a1b_w32_h32.gif',

'http://emos.plurk.com/5915f8f083578f991b21f30b93b7f0d7_w48_h48.gif',



    '( ???????)',
    '(fireworks)',
    '(code)',
    '(code_okok)',
    '(hungry_okok)',
    '(music_okok)',
    '(yarr_okok)',
    '(gym_okok)',
    '(wave_okok)',
    '(dance_okok)',
    '(angry_okok)', 
    '(taser_okok) ', 
    '(no_dance)',
    '(banana_gym)',
    '(goal)',
    '(bzzz)',
    '(dance_bzz)',
    '(yarr)',
    '(dance_yarr)', 
    '(droid_dance)',
'http://emos.plurk.com/2df63967a0d4acb96e393bfc744ab41d_w48_h48.gif',
    '(fuu)',
    '(gfuu)', 
    '(yay)', 
    '(gyay)', 
    '(bah)', 
    '(gbah)', 
    '(troll)',
    '(gtroll)',
    '(aha)',
    '(gaha)',
    '(whatever)',
    '(gwhatever)',
    '(pokerface)',
    '(gpokerface)',
    '(yea)',
    '(gyea)',
    '(jazzhands)',

]]);

smileData.push(['6', '', [

'http://emos.plurk.com/51771e37fb5bd74d8671d1842af8232b_w46_h48.gif',
'http://emos.plurk.com/cd146e125d166cd53283faf1c28bb52d_w33_h47.gif',
'http://emos.plurk.com/a3f1412448b3cb50bb8980076af5865e_w39_h48.gif',
'http://emos.plurk.com/3c586799c7c90727e4a5c1e3ea69761b_w48_h43.gif',
'http://emos.plurk.com/250b1ab5ca85ab21fbd61f4b4605c196_w46_h48.gif',
'http://emos.plurk.com/2ec8a19bf492eab2b80089976d98d014_w41_h47.gif',
'http://emos.plurk.com/377fff968624e46464ef276d670987da_w48_h48.gif',
'http://emos.plurk.com/b3414bc2a27d9bb46a88895a487f5eee_w48_h42.gif',
'http://emos.plurk.com/5c598b8a6d5cf4840b72c303afa553c3_w39_h48.gif',
'http://emos.plurk.com/56ca60307474c9eebb5b45f24be0857d_w48_h48.png',
'http://emos.plurk.com/d376bd1ae48bcf5511d3bdcd19026db2_w45_h45.png',
'http://emos.plurk.com/5eb2b8529d4828a54374667efde56ca9_w46_h48.gif',

'http://emos.plurk.com/316f49dda4f0cf7f5f05c126e56a4ef4_w40_h48.gif',

'http://emos.plurk.com/6e7d17576c059f7657e8bac0ab8eec04_w48_h32.gif',

'http://emos.plurk.com/57f6acc47d832651fd43a492bdffb1c5_w48_h38.gif',

'http://emos.plurk.com/296b97c9f76057cfcd3fa4f16af61d7d_w48_h48.gif',

'http://emos.plurk.com/74a7200caebf3359d3f453e9d9e2a191_w25_h48.gif',

'http://emos.plurk.com/b3267c7676b6b8352fc9628960f1205d_w44_h47.png',

'http://emos.plurk.com/9fdf0c359e5a1f57e4b90ef7dbe07a1d_w43_h48.jpeg',

'http://emos.plurk.com/5856becc9fbe2a3328a83e84a33a1e99_w48_h48.gif',

'http://emos.plurk.com/b99786dc0fd5a9804f3d0c13b5776090_w42_h48.gif',

'http://emos.plurk.com/5efddc04e1ebcc21ce78a1b955a0f363_w48_h46.jpeg',

'http://emos.plurk.com/3056d6392049e97aca1854f19a4673bb_w48_h46.jpeg',

'http://emos.plurk.com/6c6361b1ba39375a3aa9b4df1767dad2_w48_h48.gif',

'http://emos.plurk.com/104bf305f9837011a0ec0e1b91c6a663_w48_h48.png',

'http://emos.plurk.com/7fc2d6dc43b14c0b6bcd803e3cf75626_w39_h47.png',

'http://emos.plurk.com/b50f3b2624f9edb99f95f0826fefb0f5_w48_h48.gif',

'http://emos.plurk.com/db381fdb85e09c21cf12dab397b2bf98_w38_h41.png',

'http://emos.plurk.com/41c9b4941c5a4e2f6c1d9ee0fe2ed42a_w48_h48.png',

'http://emos.plurk.com/24c6ec78bc915343612c4f91c7304b67_w48_h48.png',

'http://emos.plurk.com/5dd959fa7f074ee9adeb496e5eb8ac3f_w48_h48.gif',

'http://emos.plurk.com/64f0f30b4ecc8bedda3db972336e3525_w48_h48.png',

'http://emos.plurk.com/c937b68a50c17f613072d3cde2712ff5_w44_h40.png',

'http://emos.plurk.com/0ca3447d2eaa077a908b825c41d52cab_w38_h41.png',

'http://emos.plurk.com/c8a4bc7c9043d0e5ece246147a0f71ed_w48_h48.jpeg',

'http://emos.plurk.com/71dc18c3214e495bf1b7a43377838aee_w48_h48.gif',
'http://emos.plurk.com/c6b43c96b8ba9dd743566307bcbd85e7_w48_h48.png',
'http://emos.plurk.com/d46b5e9167b61d70fd2c6a6760747bae_w48_h48.jpeg',
'http://emos.plurk.com/95506eca8d29221e4db3ecb90f435168_w45_h47.gif',

    ], [ 

'http://emos.plurk.com/51771e37fb5bd74d8671d1842af8232b_w46_h48.gif',
'http://emos.plurk.com/cd146e125d166cd53283faf1c28bb52d_w33_h47.gif',
'http://emos.plurk.com/a3f1412448b3cb50bb8980076af5865e_w39_h48.gif',
'http://emos.plurk.com/3c586799c7c90727e4a5c1e3ea69761b_w48_h43.gif',
'http://emos.plurk.com/250b1ab5ca85ab21fbd61f4b4605c196_w46_h48.gif',
'http://emos.plurk.com/2ec8a19bf492eab2b80089976d98d014_w41_h47.gif',
'http://emos.plurk.com/377fff968624e46464ef276d670987da_w48_h48.gif',
'http://emos.plurk.com/b3414bc2a27d9bb46a88895a487f5eee_w48_h42.gif',
'http://emos.plurk.com/5c598b8a6d5cf4840b72c303afa553c3_w39_h48.gif',
'http://emos.plurk.com/56ca60307474c9eebb5b45f24be0857d_w48_h48.png',
'http://emos.plurk.com/d376bd1ae48bcf5511d3bdcd19026db2_w45_h45.png',
'http://emos.plurk.com/5eb2b8529d4828a54374667efde56ca9_w46_h48.gif',

'http://emos.plurk.com/316f49dda4f0cf7f5f05c126e56a4ef4_w40_h48.gif',

'http://emos.plurk.com/6e7d17576c059f7657e8bac0ab8eec04_w48_h32.gif',

'http://emos.plurk.com/57f6acc47d832651fd43a492bdffb1c5_w48_h38.gif',

'http://emos.plurk.com/296b97c9f76057cfcd3fa4f16af61d7d_w48_h48.gif',

'http://emos.plurk.com/74a7200caebf3359d3f453e9d9e2a191_w25_h48.gif',

'http://emos.plurk.com/b3267c7676b6b8352fc9628960f1205d_w44_h47.png',

'http://emos.plurk.com/9fdf0c359e5a1f57e4b90ef7dbe07a1d_w43_h48.jpeg',

'http://emos.plurk.com/5856becc9fbe2a3328a83e84a33a1e99_w48_h48.gif',

'http://emos.plurk.com/b99786dc0fd5a9804f3d0c13b5776090_w42_h48.gif',

'http://emos.plurk.com/5efddc04e1ebcc21ce78a1b955a0f363_w48_h46.jpeg',

'http://emos.plurk.com/3056d6392049e97aca1854f19a4673bb_w48_h46.jpeg',

'http://emos.plurk.com/6c6361b1ba39375a3aa9b4df1767dad2_w48_h48.gif',

'http://emos.plurk.com/104bf305f9837011a0ec0e1b91c6a663_w48_h48.png',

'http://emos.plurk.com/7fc2d6dc43b14c0b6bcd803e3cf75626_w39_h47.png',

'http://emos.plurk.com/b50f3b2624f9edb99f95f0826fefb0f5_w48_h48.gif',

'http://emos.plurk.com/db381fdb85e09c21cf12dab397b2bf98_w38_h41.png',

'http://emos.plurk.com/41c9b4941c5a4e2f6c1d9ee0fe2ed42a_w48_h48.png',

'http://emos.plurk.com/24c6ec78bc915343612c4f91c7304b67_w48_h48.png',

'http://emos.plurk.com/5dd959fa7f074ee9adeb496e5eb8ac3f_w48_h48.gif',

'http://emos.plurk.com/64f0f30b4ecc8bedda3db972336e3525_w48_h48.png',

'http://emos.plurk.com/c937b68a50c17f613072d3cde2712ff5_w44_h40.png',

'http://emos.plurk.com/0ca3447d2eaa077a908b825c41d52cab_w38_h41.png',

'http://emos.plurk.com/c8a4bc7c9043d0e5ece246147a0f71ed_w48_h48.jpeg',

'http://emos.plurk.com/71dc18c3214e495bf1b7a43377838aee_w48_h48.gif',
'http://emos.plurk.com/c6b43c96b8ba9dd743566307bcbd85e7_w48_h48.png',
'http://emos.plurk.com/d46b5e9167b61d70fd2c6a6760747bae_w48_h48.jpeg',
'http://emos.plurk.com/95506eca8d29221e4db3ecb90f435168_w45_h47.gif',

]]);

smileData.push(['7', '', [
'http://emos.plurk.com/efdfad36a32d386c333450a803f3d761_w35_h35.gif',
'http://emos.plurk.com/da277b88cd6734f6c7ae38adff866a78_w20_h31.gif',
'http://emos.plurk.com/16699ee5683cdea1f9841a3de50a2acc_w25_h30.gif',
'http://emos.plurk.com/81da3fe695a627c077e56c861d256500_w30_h30.gif',
'http://emos.plurk.com/86a22c3f35727133fd6dc9c8f5b85c04_w24_h32.gif',
'http://emos.plurk.com/52547089ce99a7738620490d079fb645_w16_h19.gif',
'http://emos.plurk.com/351c0bdf9c43c2243930de3d7efe61b1_w47_h35.gif',
'http://emos.plurk.com/61792aa56a34af6fb0d6628898079737_w48_h33.gif',
'http://emos.plurk.com/b9f7c4f5f5910e4b1d26e0fd878014f9_w29_h29.gif',
'http://emos.plurk.com/74eb5d127c41b914dd033515896f5f63_w19_h19.gif',
'http://emos.plurk.com/667fe364289cf3f13545d4a08b1b9919_w33_h33.gif',
'http://emos.plurk.com/66684509fb4085d1be8951d9a0e3fa62_w48_h48.gif',
'http://emos.plurk.com/d4f2bba5bccb87ae2399e45670c205e3_w46_h32.gif',
'http://emos.plurk.com/eb827369da8e6869a89b52b6652a0a42_w27_h28.gif',
'http://emos.plurk.com/b04f7fe7bf3876944da8842dd41c6150_w34_h35.gif',
'http://emos.plurk.com/51ef435700b37b42ba00dbc44fab55ef_w39_h37.gif',
'http://emos.plurk.com/29107ea1046d09ddfb9944de3a23f49f_w28_h20.gif',
'http://emos.plurk.com/d9fe3c283c5b4c88ce0908898f33f6d3_w40_h30.gif',
'http://emos.plurk.com/3e0bc9fbb0c5f8c7389d9219af0e7fb9_w48_h48.gif',
'http://emos.plurk.com/cc878535afb9b7146cb37587efb9f75a_w33_h27.gif',
'http://emos.plurk.com/9eaaff2e76a40790ae559c585fe1c5be_w48_h48.gif',
'http://emos.plurk.com/e169954c2ed9121e6f635d278b84a4aa_w23_h37.gif',
'http://emos.plurk.com/e40f46fa17d90c216f9d5adb14d487c6_w45_h24.gif',
'http://emos.plurk.com/f1b136e325813d891ffe9da3d69ad580_w48_h28.gif',
'http://emos.plurk.com/7d63cb85bf94c7d92c7b202008fab03c_w34_h48.gif',
'http://emos.plurk.com/d586d32f2c7f63e5125dc5c90c17b261_w48_h33.gif',
'http://emos.plurk.com/c67dbfab58b47697eb36a75aef0e35d5_w20_h20.gif',
'http://emos.plurk.com/98d83e0cdda5b1833bbd03558d5b9bb1_w20_h20.gif',
'http://emos.plurk.com/7c27b69f5e2f56e1772f3111c3290f0e_w29_h37.png',
'http://emos.plurk.com/29fde23c0b8ceb5d1d58722108db02cc_w44_h45.gif',
'http://emos.plurk.com/1a374cc97f876c11880134a2f29c70a5_w46_h25.gif',
'http://emos.plurk.com/8baae0247fafae349424cc9182224e8e_w40_h39.gif',
'http://emos.plurk.com/d7f08b15be89ad686e36073565c717e2_w20_h20.gif',
'http://emos.plurk.com/ed42ebcc41eec03e6f1a937c889befdd_w40_h30.gif',
'http://emos.plurk.com/4ebdc2377844b960847900f589f9c279_w48_h48.gif',
'http://emos.plurk.com/af4304d71daf34c9448b8e6fb3aca9bb_w34_h48.gif',
'http://emos.plurk.com/add2df5a1956a32e187ca4147947ed0e_w23_h42.gif',
'http://emos.plurk.com/85688b37f240ffe5dfca1019107c94d7_w38_h20.gif',
'http://emos.plurk.com/860efd2b89b9159418a8beee683d4785_w35_h26.gif',
'http://emos.plurk.com/ff25477f1a0b655b9c2722a8c9052b7e_w28_h48.gif',
'http://emos.plurk.com/b46e03d95b646ac6c05f417b29384495_w42_h27.gif',
'http://emos.plurk.com/fa3e58bf17080fb3f2030f7d0596b543_w39_h23.gif',
'http://emos.plurk.com/86cbf0fe21c1375c37494e3a88599214_w48_h48.gif',
'http://emos.plurk.com/a3106212d4d937bddef29c6204e473f4_w33_h25.gif',
'http://emos.plurk.com/291386a4b8ed573366d48836c617a6a4_w37_h39.jpeg',
'http://emos.plurk.com/7c9b753ee63744948eeddd1673c5457a_w35_h36.gif',
'http://emos.plurk.com/766701057ab40a85dc971218fe9ba623_w48_h48.gif',
'http://emos.plurk.com/7f6530b20e2f58514614859dc4245e36_w38_h48.gif',
'http://emos.plurk.com/7a249c51d00cc4c467c64d5ed14c6bcc_w30_h30.gif',
'http://emos.plurk.com/3a4c8aaab80a2a0de7fe43b63b65b4f2_w45_h19.gif',
'http://emos.plurk.com/1a9182eb71e8f0e05d07a29016be3c7f_w35_h18.gif',
'http://emos.plurk.com/51b7ee85ebb515d641a811147a4d40c5_w37_h39.gif',
'http://emos.plurk.com/3b91fb38677a2f39e08ab5fa61b42cc5_w47_h45.gif',
'http://emos.plurk.com/ce6859ea3e8e28ecd30562cb14cdb820_w43_h48.jpeg',
'http://emos.plurk.com/0ac2eb91a5bd42592e08ca036e500382_w27_h36.gif',
'http://emos.plurk.com/c4a5a317115fec204fd523d39f176562_w48_h43.jpeg',
'http://emos.plurk.com/eeb10747e433ba19e24f85e5ddbb24b3_w48_h48.gif',
'http://emos.plurk.com/0d870c20a06bf920830809f0fab33eb4_w48_h48.gif',
'http://emos.plurk.com/2bda1ef89f811c9d5c07ac95c0055b24_w34_h35.gif',
'http://emos.plurk.com/d4d29830791914dbb2fe0799ff391cbb_w43_h17.gif',
'http://emos.plurk.com/67374c3af39df937ff0110fda33bb3ca_w44_h48.gif',
'http://emos.plurk.com/70fc14150fdc7a86f1102dbd3f12b618_w40_h20.gif',
'http://emos.plurk.com/04b3b51ca96b74eda879b401790f8576_w35_h25.gif',
'http://emos.plurk.com/24159718f905d617dde3836cfa141bc4_w35_h15.gif',
'http://emos.plurk.com/e3a1f30c72e609209b3060b004efee3d_w17_h29.png',
'http://emos.plurk.com/633a1db49bf9ddf80f0fe001d2ffa722_w48_h48.gif',
'http://emos.plurk.com/81cf8b8f4edb9e9689169bb7c0f9e337_w48_h19.png',
'http://emos.plurk.com/645b8d41252e3042bb43c0f53d63d1cc_w48_h46.gif',
'http://emos.plurk.com/97f48d4c313ff98928fbbed142045cd0_w48_h38.gif',
'http://emos.plurk.com/80a203072124d428d83bb3bcbb42012a_w48_h48.jpeg',
'http://emos.plurk.com/82711a37ecb1d558c52e13ea4a283a06_w20_h20.gif',
'http://emos.plurk.com/eb67916e5087e3e1a0ad4861712aef82_w44_h25.gif',
'http://emos.plurk.com/4820563e022649affbd00e3d0a89c999_w21_h28.gif',
'http://emos.plurk.com/d1d7acf0be33aef55aecdb494943e778_w32_h32.gif',


'http://emos.plurk.com/2e3bedc3bdf7b5f900f717a6c5ab01f4_w20_h20.gif',
'http://emos.plurk.com/a3f750f96bd99430a0fc38fdba441ae8_w17_h21.gif',
'http://emos.plurk.com/6573f28d3ff503bc8188ce5231f01538_w48_h48.gif',
'http://emos.plurk.com/9f1e9ac558a63e79014c530ad6e10da5_w21_h27.gif',
    ], [ 
'http://emos.plurk.com/efdfad36a32d386c333450a803f3d761_w35_h35.gif',
'http://emos.plurk.com/da277b88cd6734f6c7ae38adff866a78_w20_h31.gif',
'http://emos.plurk.com/16699ee5683cdea1f9841a3de50a2acc_w25_h30.gif',
'http://emos.plurk.com/81da3fe695a627c077e56c861d256500_w30_h30.gif',
'http://emos.plurk.com/86a22c3f35727133fd6dc9c8f5b85c04_w24_h32.gif',
'http://emos.plurk.com/52547089ce99a7738620490d079fb645_w16_h19.gif',
'http://emos.plurk.com/351c0bdf9c43c2243930de3d7efe61b1_w47_h35.gif',
'http://emos.plurk.com/61792aa56a34af6fb0d6628898079737_w48_h33.gif',
'http://emos.plurk.com/b9f7c4f5f5910e4b1d26e0fd878014f9_w29_h29.gif',
'http://emos.plurk.com/74eb5d127c41b914dd033515896f5f63_w19_h19.gif',
'http://emos.plurk.com/667fe364289cf3f13545d4a08b1b9919_w33_h33.gif',
'http://emos.plurk.com/66684509fb4085d1be8951d9a0e3fa62_w48_h48.gif',
'http://emos.plurk.com/d4f2bba5bccb87ae2399e45670c205e3_w46_h32.gif',
'http://emos.plurk.com/eb827369da8e6869a89b52b6652a0a42_w27_h28.gif',
'http://emos.plurk.com/b04f7fe7bf3876944da8842dd41c6150_w34_h35.gif',
'http://emos.plurk.com/51ef435700b37b42ba00dbc44fab55ef_w39_h37.gif',
'http://emos.plurk.com/29107ea1046d09ddfb9944de3a23f49f_w28_h20.gif',
'http://emos.plurk.com/d9fe3c283c5b4c88ce0908898f33f6d3_w40_h30.gif',
'http://emos.plurk.com/3e0bc9fbb0c5f8c7389d9219af0e7fb9_w48_h48.gif',
'http://emos.plurk.com/cc878535afb9b7146cb37587efb9f75a_w33_h27.gif',
'http://emos.plurk.com/9eaaff2e76a40790ae559c585fe1c5be_w48_h48.gif',
'http://emos.plurk.com/e169954c2ed9121e6f635d278b84a4aa_w23_h37.gif',
'http://emos.plurk.com/e40f46fa17d90c216f9d5adb14d487c6_w45_h24.gif',
'http://emos.plurk.com/f1b136e325813d891ffe9da3d69ad580_w48_h28.gif',
'http://emos.plurk.com/7d63cb85bf94c7d92c7b202008fab03c_w34_h48.gif',
'http://emos.plurk.com/d586d32f2c7f63e5125dc5c90c17b261_w48_h33.gif',
'http://emos.plurk.com/c67dbfab58b47697eb36a75aef0e35d5_w20_h20.gif',
'http://emos.plurk.com/98d83e0cdda5b1833bbd03558d5b9bb1_w20_h20.gif',
'http://emos.plurk.com/7c27b69f5e2f56e1772f3111c3290f0e_w29_h37.png',
'http://emos.plurk.com/29fde23c0b8ceb5d1d58722108db02cc_w44_h45.gif',
'http://emos.plurk.com/1a374cc97f876c11880134a2f29c70a5_w46_h25.gif',
'http://emos.plurk.com/8baae0247fafae349424cc9182224e8e_w40_h39.gif',
'http://emos.plurk.com/d7f08b15be89ad686e36073565c717e2_w20_h20.gif',
'http://emos.plurk.com/ed42ebcc41eec03e6f1a937c889befdd_w40_h30.gif',
'http://emos.plurk.com/4ebdc2377844b960847900f589f9c279_w48_h48.gif',
'http://emos.plurk.com/af4304d71daf34c9448b8e6fb3aca9bb_w34_h48.gif',
'http://emos.plurk.com/add2df5a1956a32e187ca4147947ed0e_w23_h42.gif',
'http://emos.plurk.com/85688b37f240ffe5dfca1019107c94d7_w38_h20.gif',
'http://emos.plurk.com/860efd2b89b9159418a8beee683d4785_w35_h26.gif',
'http://emos.plurk.com/ff25477f1a0b655b9c2722a8c9052b7e_w28_h48.gif',
'http://emos.plurk.com/b46e03d95b646ac6c05f417b29384495_w42_h27.gif',
'http://emos.plurk.com/fa3e58bf17080fb3f2030f7d0596b543_w39_h23.gif',
'http://emos.plurk.com/86cbf0fe21c1375c37494e3a88599214_w48_h48.gif',
'http://emos.plurk.com/a3106212d4d937bddef29c6204e473f4_w33_h25.gif',
'http://emos.plurk.com/291386a4b8ed573366d48836c617a6a4_w37_h39.jpeg',
'http://emos.plurk.com/7c9b753ee63744948eeddd1673c5457a_w35_h36.gif',
'http://emos.plurk.com/766701057ab40a85dc971218fe9ba623_w48_h48.gif',
'http://emos.plurk.com/7f6530b20e2f58514614859dc4245e36_w38_h48.gif',
'http://emos.plurk.com/7a249c51d00cc4c467c64d5ed14c6bcc_w30_h30.gif',
'http://emos.plurk.com/3a4c8aaab80a2a0de7fe43b63b65b4f2_w45_h19.gif',
'http://emos.plurk.com/1a9182eb71e8f0e05d07a29016be3c7f_w35_h18.gif',
'http://emos.plurk.com/51b7ee85ebb515d641a811147a4d40c5_w37_h39.gif',
'http://emos.plurk.com/3b91fb38677a2f39e08ab5fa61b42cc5_w47_h45.gif',
'http://emos.plurk.com/ce6859ea3e8e28ecd30562cb14cdb820_w43_h48.jpeg',
'http://emos.plurk.com/0ac2eb91a5bd42592e08ca036e500382_w27_h36.gif',
'http://emos.plurk.com/c4a5a317115fec204fd523d39f176562_w48_h43.jpeg',
'http://emos.plurk.com/eeb10747e433ba19e24f85e5ddbb24b3_w48_h48.gif',
'http://emos.plurk.com/0d870c20a06bf920830809f0fab33eb4_w48_h48.gif',
'http://emos.plurk.com/2bda1ef89f811c9d5c07ac95c0055b24_w34_h35.gif',
'http://emos.plurk.com/d4d29830791914dbb2fe0799ff391cbb_w43_h17.gif',
'http://emos.plurk.com/67374c3af39df937ff0110fda33bb3ca_w44_h48.gif',
'http://emos.plurk.com/70fc14150fdc7a86f1102dbd3f12b618_w40_h20.gif',
'http://emos.plurk.com/04b3b51ca96b74eda879b401790f8576_w35_h25.gif',
'http://emos.plurk.com/24159718f905d617dde3836cfa141bc4_w35_h15.gif',
'http://emos.plurk.com/e3a1f30c72e609209b3060b004efee3d_w17_h29.png',
'http://emos.plurk.com/633a1db49bf9ddf80f0fe001d2ffa722_w48_h48.gif',
'http://emos.plurk.com/81cf8b8f4edb9e9689169bb7c0f9e337_w48_h19.png',
'http://emos.plurk.com/645b8d41252e3042bb43c0f53d63d1cc_w48_h46.gif',
'http://emos.plurk.com/97f48d4c313ff98928fbbed142045cd0_w48_h38.gif',
'http://emos.plurk.com/80a203072124d428d83bb3bcbb42012a_w48_h48.jpeg',
'http://emos.plurk.com/82711a37ecb1d558c52e13ea4a283a06_w20_h20.gif',
'http://emos.plurk.com/eb67916e5087e3e1a0ad4861712aef82_w44_h25.gif',
'http://emos.plurk.com/4820563e022649affbd00e3d0a89c999_w21_h28.gif',
'http://emos.plurk.com/d1d7acf0be33aef55aecdb494943e778_w32_h32.gif',

'http://emos.plurk.com/2e3bedc3bdf7b5f900f717a6c5ab01f4_w20_h20.gif',
'http://emos.plurk.com/a3f750f96bd99430a0fc38fdba441ae8_w17_h21.gif',
'http://emos.plurk.com/6573f28d3ff503bc8188ce5231f01538_w48_h48.gif',
'http://emos.plurk.com/9f1e9ac558a63e79014c530ad6e10da5_w21_h27.gif',

]]);

var isinit = false;

var currInput = null;

var rplreg = /\[(\d+) (\d+)\]/g;

var pageState = location.href.split('/')[3];



window.addEventListener('load', function()

{

    setTimeout(function()

    {

        var selImgs = document.getElementsByClassName('smily_holder');



        // bind key up event

        if(pageState == 'p')

            getById('input_permalink').addEventListener('keyup', replaceSmile, false);

        else

        {

            getById('input_big').addEventListener('keyup', replaceSmile, false);

            getById('input_small').addEventListener('keyup', replaceSmile, false);

        }



        // create tabs

        for(var i=0; i<selImgs.length; i++)

        {

            selImgs[i].setAttribute('ref', selImgs.length - i);

            selImgs[i].addEventListener('click', function()

            {

                isinit || setTimeout(init, 1000);

                currInput = pageState != 'p' ? this.getAttribute('ref') == 2 ? getById('input_big') : getById('input_small') : getById('input_permalink');

            }, false);

        }

    }, 2000);

}, false);





// init

function init()

{

    isinit = true;

    // init contents

    for(var i=0; i<smileData.length; i++)

    {

        addTab(i, smileData[i]);

    }

    // init css

    getById('emoticons_show').style.width  = '100%';

    getById('emoticons_show').style.height = '100%';

    getById('emoticons_show').style.overflow = 'auto';

}



function replaceSmile()

{

    if(rplreg.test(this.value))

        this.value = this.value.replace(rplreg, doReplace);

}



function doReplace(str, datid, smileid)

{

    arr = smileData[datid];

    if (typeof(arr) != 'undefined')

    {

        if(typeof(arr[2][smileid]) != 'undefined')

            str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';

    }

    return str;

}



function addTab(id, data)

{

    var myli = document.createElement('li');

    myli.className = 'emoticon_selecter';

    myli.innerHTML = '<a href="javascript:void 0;">'+data[0]+'</a>';

    myli.addEventListener('click', function()

    {

        addImages(this, id);

    }, false);



    getById('emoticons_tabs').getElementsByTagName('ul')[0].appendChild(myli);

}



function addImages(obj, ind)

{

    var showDiv = getById('emoticons_show');

    var lis = getById('emoticons_tabs').getElementsByTagName('li');

    for(var i=0; i<lis.length; i++)

        lis[i].className = 'emoticon_selecter';



    obj.className += ' current';



    var data = smileData[ind];

    var baseUrl = data[1];

    var str = '<div align="bottom">';
    str += ' <a href="http://www.plurk.com/lidsa" target="_blank">@lidsa</a>';
    str += '</div>';


    str += '<div>';

    for(var i=0, dat = data[2], _url; i<dat.length; i++)

    {

        _url = baseUrl + dat[i];

        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+data[3][i]+'" title="'+data[3][i]+'"/></a>';



    }

    str += '</div>';

    showDiv.innerHTML = str;

    

    var imgs = showDiv.getElementsByTagName('img');

    for(var i=0; i<imgs.length; i++)

    {

        imgs[i].addEventListener('click', function()

        {

            currInput.value += ' ' + this.alt + ' ';

            currInput.focus();

        }, false);

    }

}



function getById(oid)

{

    return document.getElementById(oid);

}