// ==UserScript==
// @name        iphone emojis
// @namespace   ryan entro
// @description adds iphone emojis for eti
// @require 	http://code.jquery.com/jquery-1.8.0.min.js
// @include     /https?:\/\/((boards|archives)\.)?endoftheinter\.net\/(showmessages|postmsg|inboxthread)\.php/
// @version     0.05
// ==/UserScript==
// If you want to add new emoji to the script, it's pretty self explanatory. Add the ID and the image url in the format you see here.
// Make sure it's the direct link to the image. Warning though, if I update the script and you install the latest one, any changes to
// your emoji list will be lost, unless you yell at me to add the new emoji or change the id.
var emoji = [];
	emoji["alien"] = "http://i3.endoftheinter.net/i/n/ac7dd8d398f696efcbc0388faea5ae05/alien.png";
	emoji["angry"] = "http://i4.endoftheinter.net/i/n/364b2fe95d83f27c091f8a7134b381c2/angry.png";
	emoji["anguished"] = "http://i4.endoftheinter.net/i/n/b67ec4039b6b9d8ae987690660a5f7e2/anguished.png";
	emoji["astonished"] = "http://i2.endoftheinter.net/i/n/9b9ce7ff9f6be237c518df1acc4b8f1b/astonished.png";
	emoji["baby"] = "http://i3.endoftheinter.net/i/n/2828d73a5b7c570421d8e4b125a5abfd/baby.png";
	emoji["baby_chick"] = "http://i2.endoftheinter.net/i/n/94ebcae78013b90428ebafdc9f02298f/baby_chick.png";
	emoji["bear"] = "http://i3.endoftheinter.net/i/n/2ef1484c7fdccd271de73a13f388fa1c/bear.png";
	emoji["bear"] = "http://i1.endoftheinter.net/i/n/8c2962f964b73a7e7665d8938920869c/beer.png";
	emoji["blush"] = "http://i4.endoftheinter.net/i/n/3ad5f42eb383f4fe15cbace91c0c3354/blush.png";
	emoji["boom"] = "http://i2.endoftheinter.net/i/n/134daa47da320f810dd09bc7e0518489/boom.png";
	emoji["bow"] = "http://i1.endoftheinter.net/i/n/02ac6157869e66b4c0546ef936baaf69/bow.png";
	emoji["bowtie"] = "http://i2.endoftheinter.net/i/n/1d411a020fd6471eda61e32ba19eba15/bowtie.png";
	emoji["boy"] = "http://i4.endoftheinter.net/i/n/ffe8ab948225e25915293969df3ba16a/boy.png";
	emoji["bride"] = "http://i1.endoftheinter.net/i/n/43f5387fc2c9d266072d2ac06091cc3e/bride_with_veil.png";
	emoji["brokenheart"] = "http://i1.endoftheinter.net/i/n/0389080a5173fda6ccd013c44b008f19/broken_heart.png";
	emoji["car"] = "http://i4.endoftheinter.net/i/n/f57232c055b31834177ce6376e579a3f/car.png";
	emoji["cat"] = "http://i1.endoftheinter.net/i/n/03de9d1d97f30183147be8183f06df55/cat.png";
	emoji["cat2"] = "http://i3.endoftheinter.net/i/n/6068e776f67a0e574e4ae22469fbbc31/cat2.png";
	emoji["chicken"] = "http://i1.endoftheinter.net/i/n/864b98f4ac8ae52cfc1a35e963cf8b45/chicken.png";
	emoji["clap"] = "http://i1.endoftheinter.net/i/n/cf8117929399d044e549ca6d31a6383b/clap.png";
	emoji["cold_sweat"] = "http://i1.endoftheinter.net/i/n/43687a7f077e56bc1524b96b88c8a56a/cold_sweat.png";
	emoji["collision"] = "http://i2.endoftheinter.net/i/n/134daa47da320f810dd09bc7e0518489/collision.png";
	emoji["coffee"] = "http://i3.endoftheinter.net/i/n/2da485a46d93fb011d6d2225383724b1/coffee.png";
	emoji["confounded"] = "http://i1.endoftheinter.net/i/n/8330578dd94a36a0aad3aa26e9a27518/confounded.png";
	emoji["confused"] = "http://i2.endoftheinter.net/i/n/5a51bc934019e326e722cb920fb5fc6f/confused.png";
	emoji["cop"] = "http://i4.endoftheinter.net/i/n/7b8ade64a7c2ca23d2927c54d717bcef/cop.png";
	emoji["couple"] = "http://i2.endoftheinter.net/i/n/d8ee6e6e8c3014a8cbf795781e4ad34f/couple.png";
	emoji["coupleheart"] = "http://i4.endoftheinter.net/i/n/b8f1b84a2c906c812531fdc4b3e6b888/couple_with_heart.png";
	emoji["couplekiss"] = "http://i4.endoftheinter.net/i/n/37c5d67c40755fceda4580342a8f208d/couplekiss.png";
	emoji["cow"] = "http://i2.endoftheinter.net/i/n/584a0a3dc65f1464859952aa016d0eff/cow.png";
	emoji["crown"] = "http://i4.endoftheinter.net/i/n/73d13e49ac294f1bb4904f7ee5b0ebf2/crown.png";
	emoji["cry"] = "http://i2.endoftheinter.net/i/n/1812bef367a174a7f4669d78595a1111/cry.png";
	emoji["cryingcat"] = "http://i4.endoftheinter.net/i/n/b37c009adce8beace0b78b6d2d5611e1/crying_cat_face.png";
	emoji["cupid"] = "http://i2.endoftheinter.net/i/n/db8ce1d1fe873573a65f60d73d4c3aaf/cupid.png";
	emoji["disappointed"] = "http://i3.endoftheinter.net/i/n/639987907179b7168eae164871afb1bb/disappointed.png";
	emoji["relieved"] = "http://i1.endoftheinter.net/i/n/83b28ccab8f7125a004a0611fc67cef8/disappointed_relieved.png";
	emoji["dizzy"] = "http://i3.endoftheinter.net/i/n/61e96dd047b0f32cf4abc96187d9231e/dizzy_face.png";
	emoji["dog"] = "http://i2.endoftheinter.net/i/n/5a4a57bc0fc3f36d38a5601eed137532/dog.png";
	emoji["dog2"] = "http://i4.endoftheinter.net/i/n/b636244d352f4f653a693d7d95b0b955/dog2.png";
	emoji["dolls"] = "http://i3.endoftheinter.net/i/n/a68ed2fa534b1ef1839f7260d0072b84/dolls.png";
	emoji["donut"] = "http://i3.endoftheinter.net/i/n/28bee38c236171f41c9de09dfd88a5e5/donut.png";
	emoji["camel"] = "http://i1.endoftheinter.net/i/n/0abc75ad5f4446b2a435729b0b02b45d/dromedary_camel.png";
	emoji["droplet"] = "http://i1.endoftheinter.net/i/n/01dbb6cf122d320f7e9daaef39ec03b7/droplet.png";
	emoji["ear"] = "http://i2.endoftheinter.net/i/n/9131ebcf962fba3fe772f73edcc5626e/ear.png";
	emoji["earth"] = "http://i2.endoftheinter.net/i/n/1e249a9c2938d5e7c181928259883366/earth_americas.png";
	emoji["eggplant"] = "http://i2.endoftheinter.net/i/n/9fa9dc01a0631e6cd5769c721cbecc81/eggplant.png";
	emoji["exclamation"] = "http://i1.endoftheinter.net/i/n/42ffc09a0513d533bced9ff5c4ff8f75/exclamation.png";
	emoji["expressionless"] = "http://i4.endoftheinter.net/i/n/3c0bcdc2127bceb95161fbb6a2f1d058/expressionless.png";
	emoji["eyes"] = "http://i4.endoftheinter.net/i/n/f8fd1b9a578a914133a05a3c4e64fe3e/eyes.png";
	emoji["fearful"] = "http://i1.endoftheinter.net/i/n/c99de628670585750855128aee2a4d4e/fearful.png";
	emoji["feelsgood"] = "http://i4.endoftheinter.net/i/n/b0d2d71e5513e1ec70273297644ceb56/feelsgood.png";
	emoji["finnadie"] = "http://i3.endoftheinter.net/i/n/2599f7d7f3973eec400b8570a1cede28/finnadie.png";
	emoji["fire"] = "http://i3.endoftheinter.net/i/n/ae1f72e73fc7810ce17debc54604b5c3/fire.png";
	emoji["firstqmoon"] = "http://i2.endoftheinter.net/i/n/9aa7479776ea026a601d4cccb5517367/first_quarter_moon.png";
	emoji["firstqmoonface"] = "http://i2.endoftheinter.net/i/n/125b6b5b2594eb50a0fc7eccb17d7996/first_quarter_moon_with_face.png";
	emoji["fist"] = "http://i1.endoftheinter.net/i/n/832d862cf658566e6b314d68dc6c5cbe/fist.png";
	emoji["flushed"] = "http://i3.endoftheinter.net/i/n/688aa287dfc01db4e3eb787003b09c9c/flushed.png";
	emoji["football"] = "http://i1.endoftheinter.net/i/n/caf852010e683d3d1450550a4117bd0b/football.png";
	emoji["shrimp"] = "http://i4.endoftheinter.net/i/n/fce256dd221c1aa2b32bcc3f5e40ad27/fried_shrimp.png";
	emoji["frowning"] = "http://i1.endoftheinter.net/i/n/0be80cd12144dedff55729440fb5b0d1/frowning.png";
	emoji["fu"] = "http://i1.endoftheinter.net/i/n/8131031a0af7b89d08b32b62f0b9221a/fu.png";
	emoji["fullmoon"] = "http://i4.endoftheinter.net/i/n/f6bf477775504579588137fac6f21389/full_moon.png";
	emoji["fullmoonface"] = "http://i4.endoftheinter.net/i/n/baaa9ebf858d570162740cdf6d80ce1f/full_moon_with_face.png";
	emoji["dice"] = "http://i4.endoftheinter.net/i/n/f71fc45368d40066bc8cb4031a00fbc1/game_die.png";
	emoji["gem"] = "http://i3.endoftheinter.net/i/n/621278a6cc63fd4a7c025532de79b75f/gem.png";
	emoji["ghost"] = "http://i1.endoftheinter.net/i/n/854659aa89dd8c59a2bc678f6b431033/ghost.png";
	emoji["gift"] = "http://i3.endoftheinter.net/i/n/2d9a164061620aa31869b0062d82cb39/gift.png";
	emoji["giftheart"] = "http://i1.endoftheinter.net/i/n/49f068a251b558f1981fe5b6375e4186/gift_heart.png";
	emoji["girl1"] = "http://i1.endoftheinter.net/i/n/0b0e290ec5c770eb710597bd787d2610/girl.png";
	emoji["goat"] = "http://i3.endoftheinter.net/i/n/ac563e0dac2db56f75cd570453ffc44e/goat.png";
	emoji["goberserk"] = "http://i4.endoftheinter.net/i/n/b1dc3035d806ce192dd7640437aafeaf/goberserk.png";
	emoji["godmode"] = "http://i2.endoftheinter.net/i/n/5aca20f5e41a5040e8285ecb3abcc549/godmode.png";
    emoji["snake"] = "http://i1.endoftheinter.net/i/n/08692543aad69cd64b5d2e80bf0228b6/snake.png";
    emoji["boot"] = "http://i2.endoftheinter.net/i/n/1f03dbf0eec585d7c1aae729d7732337/boot.png";
	emoji["greenheart"] = "http://i4.endoftheinter.net/i/n/fb4340fd8e44012666d39aa15bfcd369/green_heart.png";
	emoji["grey_exclamation"] = "http://i1.endoftheinter.net/i/n/8148e2fc1d461e6629ec559af1ad4a48/grey_exclamation.png";
	emoji["grey_question"] = "http://i3.endoftheinter.net/i/n/24e2caeb3260f3c609049945f9bea029/grey_question.png";
	emoji["grimacing"] = "http://i3.endoftheinter.net/i/n/68fa3fa21cc50cafd94d33ce4fd62fb0/grimacing.png";
	emoji["grin"] = "http://i4.endoftheinter.net/i/n/b0bb8a12cd8d1d2b9a4574b344ca2d36/grin.png";
	emoji["grinning"] = "http://i1.endoftheinter.net/i/n/0a5f249adb1c431a179b24bb7a9b9416/grinning.png";
	emoji["guardsman"] = "http://i1.endoftheinter.net/i/n/8493d17a4dd1d3ff83e81261f7993856/guardsman.png";
	emoji["gun"] = "http://i2.endoftheinter.net/i/n/9d22320eca7b3abd8f04c8d061f45d2f/gun.png";
	emoji["haircut"] = "http://i2.endoftheinter.net/i/n/d630a88e225c12d89e1e9c0fa9d43f59/haircut.png";
	emoji["hamburger"] = "http://i2.endoftheinter.net/i/n/11d0284c5fd73ff558168cd52361edf0/hamburger.png";
	emoji["hamster"] = "http://i3.endoftheinter.net/i/n/29bbdfc0073ad18585247db1b76091fc/hamster.png";
	emoji["hand"] = "http://i2.endoftheinter.net/i/n/d49a31c6e86d923414014fb24ef5c4e6/hand.png";
	emoji["hankey"] = "http://i1.endoftheinter.net/i/n/04e2c1954c9e112368ff529955c0c5c5/hankey.png";
	emoji["hatched_chick"] = "http://i1.endoftheinter.net/i/n/0376de2f6dd63998f3bff68a1323824e/hatched_chick.png";
	emoji["hatching_chick"] = "http://i2.endoftheinter.net/i/n/df5abf1b1ca54d93f2b4839918806dc8/hatching_chick.png";
	emoji["hear_no_evil"] = "http://i2.endoftheinter.net/i/n/911dc97ef05e89b43bde4ff55f29ce2f/hear_no_evil.png";
	emoji["heart"] = "http://i3.endoftheinter.net/i/n/e859bd1d6fa16f0d7abbc787192a4449/heart.png";
	emoji["heart_decoration"] = "http://i3.endoftheinter.net/i/n/63ffe36a2591087cbe6600e76f5238e1/heart_decoration.png";
	emoji["heart_eyes"] = "http://i2.endoftheinter.net/i/n/54f66e1a593081b951d6975f8ccec5db/heart_eyes.png";
	emoji["heart_eyes_cat"] = "http://i4.endoftheinter.net/i/n/3e41838d878c7277117de5ca591858f6/heart_eyes_cat.png";
	emoji["heartbeat"] = "http://i3.endoftheinter.net/i/n/2be398d196ea5f12066144e339cd1df6/heartbeat.png";
	emoji["heartpulse"] = "http://i2.endoftheinter.net/i/n/55b8479bb57f2ecf5d3cd4643dfa047c/heartpulse.png";
	emoji["hearts"] = "http://i3.endoftheinter.net/i/n/674c36c55319aba142300a70e73c38a0/hearts.png";
	emoji["helicopter"] = "http://i4.endoftheinter.net/i/n/b469cedf85c73c42f5396feeff14bea2/helicopter.png";
	emoji["high_brightness"] = "http://i3.endoftheinter.net/i/n/2dd6fa5aa00b46b39681a388a2859a96/high_brightness.png";
	emoji["hibiscus"] = "http://i2.endoftheinter.net/i/n/95a8d8dda9f41fed8bd38b5f998e3563/hibiscus.png";
	emoji["high_heel"] = "http://i2.endoftheinter.net/i/n/da9fb60382c59e55c927e53346da1025/high_heel.png";
	emoji["hocho"] = "http://i3.endoftheinter.net/i/n/ec77434381ad04a689bf19c5ec0806b6/hocho.png";
	emoji["honeybee"] = "http://i3.endoftheinter.net/i/n/6cd96cb6a18de9c1879baf2d3c14a323/honeybee.png";
	emoji["horse"] = "http://i2.endoftheinter.net/i/n/15b0e76a9bb8404d2889dc8a694055cd/horse.png";
	emoji["horse_racing"] = "http://i1.endoftheinter.net/i/n/c6f51deb75222a27d07423cf8c617240/horse_racing.png";
	emoji["hurtrealbad"] = "http://i4.endoftheinter.net/i/n/777fffa1587d55d62a243cdf91f26819/hurtrealbad.png";
	emoji["hushed"] = "http://i4.endoftheinter.net/i/n/7673680142ad6c47e40f1b0a22d2a27e/hushed.png";
	emoji["icecream"] = "http://i3.endoftheinter.net/i/n/68b9995d761a5d0b062dbde29619adbf/icecream.png";
	emoji["information_desk_person"] = "http://i4.endoftheinter.net/i/n/3679334a538cdaf2f34115dfb8435fc7/information_desk_person.png";
	emoji["innocent"] = "http://i2.endoftheinter.net/i/n/14b125323fa6cfd5d9aa5052a0f181df/innocent.png";
	emoji["interrobang"] = "http://i2.endoftheinter.net/i/n/5bc99e6030a2eefe804d25f3029752ba/interrobang.png";
	emoji["jack_o_lantern"] = "http://i2.endoftheinter.net/i/n/d2fcf4e0224dbe60b89574eca368143d/jack_o_lantern.png";
	emoji["japanese_goblin"] = "http://i3.endoftheinter.net/i/n/e1069ebc8bf7eb974c527681fe2501b2/japanese_goblin.png";
	emoji["japanese_ogre"] = "http://i4.endoftheinter.net/i/n/3f75895d8046ca4b966f5ee58d27a2d7/japanese_ogre.png";
	emoji["joy"] = "http://i1.endoftheinter.net/i/n/c3617844035667a9d84718e7ec645e0e/joy.png";
	emoji["joy_cat"] = "http://i2.endoftheinter.net/i/n/5e707c68869eb87431d1c9035a6fcd00/joy_cat.png";
	emoji["kiss"] = "http://i2.endoftheinter.net/i/n/190b4e4e2d615bc891aa3fc7ae9493cf/kiss.png";
	emoji["kissing"] = "http://i2.endoftheinter.net/i/n/54ff255935f26d248854cc2603117475/kissing.png";
	emoji["kissing_cat"] = "http://i2.endoftheinter.net/i/n/563e31cc21e03505dd07eaaf4a158a38/kissing_cat.png";
	emoji["kissing_closed_eyes"] = "http://i4.endoftheinter.net/i/n/7156929fa40e8ec6617580bb82e43add/kissing_closed_eyes.png";
	emoji["kissing_face"] = "http://i4.endoftheinter.net/i/n/7156929fa40e8ec6617580bb82e43add/kissing_face.png";
	emoji["kissing_heart"] = "http://i2.endoftheinter.net/i/n/9930e4caefcc8a38778dbcfc1dd3fa58/kissing_heart.png";
	emoji["kissing_smiling_eyes"] = "http://i1.endoftheinter.net/i/n/c5838be6faaa172b97c10d2f49b61634/kissing_smiling_eyes.png";
	emoji["koala"] = "http://i3.endoftheinter.net/i/n/219b6f3b8d214c33618a6a6750c097ae/koala.png";
	emoji["last_quarter_moon"] = "http://i1.endoftheinter.net/i/n/cd9dc5d6b384fcd6e6eb78c6deb08798/last_quarter_moon.png";
	emoji["last_quarter_moon_with_face"] = "http://i4.endoftheinter.net/i/n/f41d8cb9b00f84ac427573cf089db425/last_quarter_moon_with_face.png";
	emoji["laughing"] = "http://i1.endoftheinter.net/i/n/8ed8c4759b991e9ed9dad42a3011cf70/laughing.png";
	emoji["lemon"] = "http://i3.endoftheinter.net/i/n/af35e65c2c621e3d870ddb4f56f4a62b/lemon.png";
	emoji["leopard"] = "http://i1.endoftheinter.net/i/n/01c4618684096fa099491d3a50c3a1f1/leopard.png";
	emoji["loudspeaker"] = "http://i1.endoftheinter.net/i/n/062151121c4fe7d41b623a8581b6fef5/loudspeaker.png";
	emoji["love_letter"] = "http://i1.endoftheinter.net/i/n/4f64af142e29cd8534e6daa386df9747/love_letter.png";
	emoji["man"] = "http://i2.endoftheinter.net/i/n/90e554ef6a9ee0b78db3ab3c0ca3744e/man.png";
	emoji["man_with_gua_pi_mao"] = "http://i3.endoftheinter.net/i/n/695bded2fb476b0018d285e63252e36f/man_with_gua_pi_mao.png";
	emoji["man_with_turban"] = "http://i1.endoftheinter.net/i/n/4c17993ad778c583a8b033766f5e0ed7/man_with_turban.png";
	emoji["maple_leaf"] = "http://i4.endoftheinter.net/i/n/338df0abd568be6fcf2eee6afae1968a/maple_leaf.png";
	emoji["mask"] = "http://i3.endoftheinter.net/i/n/a001d74bce373fa281a97687efca2457/mask.png";
	emoji["massage"] = "http://i3.endoftheinter.net/i/n/eb7d8bdebd015287ddabbda2821c4c3e/massage.png";
	emoji["metal"] = "http://i1.endoftheinter.net/i/n/8dc1616bc89fffb4f3d10eb268f37ca8/metal.png";
	emoji["moneybag"] = "http://i4.endoftheinter.net/i/n/34750ed3b5ebdad033719d7ef789095f/moneybag.png";
	emoji["monkey_face"] = "http://i4.endoftheinter.net/i/n/be0d8d2f3c52cc84d976e30547afecac/monkey_face.png";
	emoji["moon"] = "http://i4.endoftheinter.net/i/n/31aaba535eaec40dce0d69141c8b1513/moon.png";
	emoji["mortar_board"] = "http://i2.endoftheinter.net/i/n/193830e9a963aea6de99d59a5e162dfa/mortar_board.png";
	emoji["mouse"] = "http://i4.endoftheinter.net/i/n/b258a2d98406fb5b904e1c8dd5396862/mouse.png";
	emoji["mouse2"] = "http://i1.endoftheinter.net/i/n/8b10a972fb2dcf920c41a6d9a4466981/mouse2.png";
	emoji["movie_camera"] = "http://i3.endoftheinter.net/i/n/e14f7085704633a5ea8fb397df4518ad/movie_camera.png";
	emoji["muscle"] = "http://i1.endoftheinter.net/i/n/0a77fbab3b71d27b0949fd3634fcf870/muscle.png";
	emoji["mushroom"] = "http://i4.endoftheinter.net/i/n/3326f8b8ad414927343c2b947f111d17/mushroom.png";
	emoji["musical_keyboard"] = "http://i2.endoftheinter.net/i/n/d60bb8571f6012a88672d9c0bcdbd57c/musical_keyboard.png";
	emoji["musical_note"] = "http://i1.endoftheinter.net/i/n/0d085221f900b663b0a6710221bbd56b/musical_note.png";
	emoji["neutral_face"] = "http://i3.endoftheinter.net/i/n/6d4aa90c0de573f933b0c14e35002159/neutral_face.png";
	emoji["new_moon"] = "http://i1.endoftheinter.net/i/n/8994bddac4025a3db0e621c818635b27/new_moon.png";
	emoji["new_moon_with_face"] = "http://i3.endoftheinter.net/i/n/aa2a7ab98ab2f239924eb5e5864580b6/new_moon_with_face.png";
	emoji["no_good"] = "http://i3.endoftheinter.net/i/n/69eb67c4cf17eef77a540895c4062ebf/no_good.png";
	emoji["nose"] = "http://i4.endoftheinter.net/i/n/7b192a2e7071f22abee37a7d7ba38fbe/nose.png";
	emoji["octocat"] = "http://i2.endoftheinter.net/i/n/160cb62f33b7512c0e21b128c9763492/octocat.png";
	emoji["octopus"] = "http://i2.endoftheinter.net/i/n/52b4e24952d802e42bee9e3fdb232767/octopus.png";
	emoji["ok_hand"] = "http://i2.endoftheinter.net/i/n/14142368fa22019b592f9303547c743f/ok_hand.png";
	emoji["ok_woman"] = "http://i2.endoftheinter.net/i/n/dab47cd4d154d624f6fb8997842622bf/ok_woman.png";
	emoji["older_man"] = "http://i3.endoftheinter.net/i/n/ecab0a2952766a328fd735e4e289c1af/older_man.png";
	emoji["older_woman"] = "http://i4.endoftheinter.net/i/n/3ef54ffadbf106a925120d3555c570aa/older_woman.png";
	emoji["on"] = "http://i2.endoftheinter.net/i/n/5a1994f13126b1f53801fd1a004b8d57/on.png";
	emoji["oncoming_automobile"] = "http://i3.endoftheinter.net/i/n/20ca335305937aa03895fd7c02c6ee12/oncoming_automobile.png";
	emoji["oncoming_bus"] = "http://i4.endoftheinter.net/i/n/b4193eee695c931d5a5341a385ae4876/oncoming_bus.png";
	emoji["oncoming_police_car"] = "http://i3.endoftheinter.net/i/n/6ef9a0daa12ca3d834036da629fc2247/oncoming_police_car.png";
	emoji["oncoming_taxi"] = "http://i1.endoftheinter.net/i/n/8fb19f7d64ec9d747c82e3db4d80e739/oncoming_taxi.png";
	emoji["open_mouth"] = "http://i2.endoftheinter.net/i/n/19596ee6aaf5f983ca73c9060d099cba/open_mouth.png";
	emoji["palm_tree"] = "http://i1.endoftheinter.net/i/n/416f6ba193ec925c6d2998b33076ed72/palm_tree.png";
	emoji["panda_face"] = "http://i3.endoftheinter.net/i/n/2379010e721684e4a04a5ed358f6ef3a/panda_face.png";
	emoji["paw_prints"] = "http://i3.endoftheinter.net/i/n/6e07aaa671ea3157fea43182f79561a8/paw_prints.png";
	emoji["peach"] = "http://i1.endoftheinter.net/i/n/017282370c11124c0e6cc44c709cd2de/peach.png";
	emoji["pear"] = "http://i4.endoftheinter.net/i/n/b2d2e30ef34183e5dd6d845e60845f8d/pear.png";
	emoji["pensive"] = "http://i1.endoftheinter.net/i/n/07cccef3a8c0706b1504a4cb599b0d45/pensive.png";
	emoji["performing_arts"] = "http://i3.endoftheinter.net/i/n/e52cd1d5a32efad5d7266152fb48502f/performing_arts.png";
	emoji["persevere"] = "http://i2.endoftheinter.net/i/n/5ef382fb7754f1f25d91623bb14f3a8f/persevere.png";
	emoji["person_frowning"] = "http://i3.endoftheinter.net/i/n/e3055b7558623719e854569844baa64a/person_frowning.png";
	emoji["person_with_blond_hair"] = "http://i4.endoftheinter.net/i/n/3a81305f30c732b6e99df8791222af03/person_with_blond_hair.png";
	emoji["person_with_pouting_face"] = "http://i2.endoftheinter.net/i/n/1dceae8df156c2376665ec70cf7da4ed/person_with_pouting_face.png";
	emoji["pig"] = "http://i2.endoftheinter.net/i/n/9f69d6d984497cc1be4a22bac12eba64/pig.png";
	emoji["pill"] = "http://i2.endoftheinter.net/i/n/179d8890c58abb4e918e4f36fa73d6a8/pill.png";
	emoji["pineapple"] = "http://i2.endoftheinter.net/i/n/10295fc8912789d0e8973f7e1af22a63/pineapple.png";
	emoji["pizza"] = "http://i4.endoftheinter.net/i/n/7ac3c67e8a2b03b4bfdcf59e8962024e/pizza.png";
	emoji["point_down"] = "http://i1.endoftheinter.net/i/n/cac9ce2fdde8da70e64901b986184bda/point_down.png";
	emoji["point_left"] = "http://i4.endoftheinter.net/i/n/b227be102a9c735230969faa293f4841/point_left.png";
	emoji["point_right"] = "http://i2.endoftheinter.net/i/n/590ccd2852f8075a02bf59585ea6bc44/point_right.png";
	emoji["point_up"] = "http://i3.endoftheinter.net/i/n/6d4fdba86e526eed595613a2b0e6653c/point_up.png";
	emoji["point_up_2"] = "http://i2.endoftheinter.net/i/n/dda7568aea7bdd552e1c7f6a5874bc79/point_up_2.png";
	emoji["ok_hand"] = "http://i2.endoftheinter.net/i/n/14142368fa22019b592f9303547c743f/ok_hand.png";
	emoji["revolving_hearts"] = "http://i3.endoftheinter.net/i/n/a6a934dcf454a165f1d74e559aa3a082/revolving_hearts.png";
	emoji["relieved"] = "http://i4.endoftheinter.net/i/n/3dfa2186ace392eca709219ff297447d/relieved.png";
	emoji["relaxed"] = "http://i4.endoftheinter.net/i/n/be82e3f5ab5d8a1244d2ba14cf863f9f/relaxed.png";
	emoji["rat"] = "http://i4.endoftheinter.net/i/n/f7384c921a9b2ab61ae46555388b5108/rat.png";
	emoji["raising_hand"] = "http://i2.endoftheinter.net/i/n/1782d4eefb0d0ff0f3a8b0ddc19d1adf/raising_hand.png";
	emoji["raised_hands"] = "http://i4.endoftheinter.net/i/n/33dd36d3da0efd660e49ce1f51213ebd/raised_hands.png";
	emoji["raised_hand"] = "http://i2.endoftheinter.net/i/n/d49a31c6e86d923414014fb24ef5c4e6/raised_hand.png";
	emoji["rage4"] = "http://i3.endoftheinter.net/i/n/ec86018f44b02a8b6cdb668c1850142f/rage4.png";
	emoji["rage3"] = "http://i2.endoftheinter.net/i/n/9eef02a12f00ddd5b4b8c82c3ef32e80/rage3.png";
	emoji["rage"] = "http://i2.endoftheinter.net/i/n/d8eb3751550f274ff850ef91a4a97e53/rage.png";
	emoji["rabbit"] = "http://i1.endoftheinter.net/i/n/43f6bae24d0261725bd6227dc866511d/rabbit.png";
	emoji["question"] = "http://i3.endoftheinter.net/i/n/2e680dec2d948372a69b8e8f5480f289/question.png";
	emoji["purple_heart"] = "http://i2.endoftheinter.net/i/n/94de654f3ee370e7a7a0f5a894d9156e/purple_heart.png";
	emoji["punch"] = "http://i2.endoftheinter.net/i/n/9653000b89b7d0697f523f65636184a6/punch.png";
	emoji["princess"] = "http://i4.endoftheinter.net/i/n/375bbc43a149dcb1d760eeed7c570c4e/princess.png";
	emoji["pray"] = "http://i4.endoftheinter.net/i/n/ba01876b0e3527121504af56b0fc7f85/pray.png";
	emoji["police_car"] = "http://i1.endoftheinter.net/i/n/49d89a15a948e462b7f7900a3235c5b3/police_car.png";
	emoji["santa"] = "http://i1.endoftheinter.net/i/n/c1026c9a4cbb988ce8469172461749a8/santa.png";
	emoji["satisfied"] = "http://i1.endoftheinter.net/i/n/8ed8c4759b991e9ed9dad42a3011cf70/satisfied.png";
	emoji["scream"] = "http://i2.endoftheinter.net/i/n/9d4b42c844437138310d6378c20930a8/scream.png";
	emoji["scream_cat"] = "http://i4.endoftheinter.net/i/n/3a3181506acc530a8eb7435bbb989cfa/scream_cat.png";
	emoji["see_no_evil"] = "http://i4.endoftheinter.net/i/n/7f28e5645d0781233ea77a1b8aeedb3e/see_no_evil.png";
	emoji["shit"] = "http://i1.endoftheinter.net/i/n/04e2c1954c9e112368ff529955c0c5c5/shit.png";
	emoji["skull"] = "http://i1.endoftheinter.net/i/n/8f96d63620032ae3617932152f849330/skull.png";
	emoji["sun_with_face"] = "http://i2.endoftheinter.net/i/n/5ddf46f56821f21a0e7dca606fb5a645/sun_with_face.png";
	emoji["stuck_out_tongue_winking_eye"] = "http://i2.endoftheinter.net/i/n/126440d4efd59063602f6c5c273bea17/stuck_out_tongue_winking_eye.png";
	emoji["stuck_out_tongue_closed_eyes"] = "http://i3.endoftheinter.net/i/n/2744d303f013cc1ad773a9ea5ffcea8a/stuck_out_tongue_closed_eyes.png";
	emoji["stuck_out_tongue"] = "http://i2.endoftheinter.net/i/n/568c15dea88c5e9c581152826d98ba8b/stuck_out_tongue.png";
	emoji["strawberry"] = "http://i2.endoftheinter.net/i/n/de1420e1e09879abc1de7041c294acdf/strawberry.png";
	emoji["star2"] = "http://i2.endoftheinter.net/i/n/9b6f3422f72bea1d881a145b6e0dc1c7/star2.png";
	emoji["star"] = "http://i3.endoftheinter.net/i/n/ec71557705d60f3b5f30f89f28531148/star.png";
	emoji["sparkling_heart"] = "http://i1.endoftheinter.net/i/n/89defe77510c284d0f1984770214d72d/sparkling_heart.png";
	emoji["sparkles"] = "http://i1.endoftheinter.net/i/n/8c5aa8462322a0b58b100b148b360bd4/sparkles.png";
	emoji["space_invader"] = "http://i3.endoftheinter.net/i/n/a9c6f6d00ac9587b7ad3c62d5af00784/space_invader.png";
	emoji["sob"] = "http://i1.endoftheinter.net/i/n/84d0a2c796c2ce202f595c54d9be6482/sob.png";
	emoji["snowflake"] = "http://i1.endoftheinter.net/i/n/02433de714078da5956966702a6ecf6b/snowflake.png";
	emoji["smirk_cat"] = "http://i2.endoftheinter.net/i/n/9f656fae64ace17b8ac531416c63203f/smirk_cat.png";
	emoji["smirk"] = "http://i2.endoftheinter.net/i/n/1e827fb878f379343544ca96e4399cc4/smirk.png";
	emoji["smiling_imp"] = "http://i1.endoftheinter.net/i/n/4bf5c4324b532b9012da4ee8c4445e5d/smiling_imp.png";
	emoji["smiley_cat"] = "http://i1.endoftheinter.net/i/n/05d039abd2f80db6a970e0030ca4a3a8/smiley_cat.png";
	emoji["smiley"] = "http://i1.endoftheinter.net/i/n/877d76854ac442b78499c0cf6d0be97d/smiley.png";
	emoji["smile_cat"] = "http://i1.endoftheinter.net/i/n/0619fda74e822ca0c388aadc288df129/smile_cat.png";
	emoji["smile"] = "http://i2.endoftheinter.net/i/n/540051e97af6ffce46b5ad9f2cb43563/smile.png";
	emoji["sleepy"] = "http://i2.endoftheinter.net/i/n/9fa3420f9bf1811033bd4f32b852aa83/sleepy.png";
	emoji["sleeping"] = "http://i4.endoftheinter.net/i/n/3691c1b3884afd222989eeba0da2e8fa/sleeping.png";
	emoji["sunglasses"] = "http://i4.endoftheinter.net/i/n/f13db9bc88c1a6cc92fbc90f8eb365be/sunglasses.png";
	emoji["sunny"] = "http://i1.endoftheinter.net/i/n/8623b829b749238dae4a29cd094154e7/sunny.png";
	emoji["suspect"] = "http://i1.endoftheinter.net/i/n/8c49949d74239406ba13157757de72b4/suspect.png";
	emoji["sweat"] = "http://i2.endoftheinter.net/i/n/d61ecd08873c67f067b4acf8d20d655e/sweat.png";
	emoji["sweat_drops"] = "http://i1.endoftheinter.net/i/n/8659295c8c5cd6a623f1d3f84bfd4495/sweat_drops.png";
	emoji["sweat_smile"] = "http://i2.endoftheinter.net/i/n/5419299f37fb2d65c9be8662cb604022/sweat_smile.png";
	emoji["tada"] = "http://i2.endoftheinter.net/i/n/924860c231adf13cbb59790e89cedfaf/tada.png";
	emoji["thumbsdown"] = "http://i3.endoftheinter.net/i/n/6e452cf4e0de5a0e8bd95a88181f7555/thumbsdown.png";
	emoji["thumbsup"] = "http://i3.endoftheinter.net/i/n/22796bc6a3b2f8d0b167eb430362eb65/thumbsup.png";
	emoji["tired_face"] = "http://i1.endoftheinter.net/i/n/02b2bdb604d46d500c6acedfe9ff183a/tired_face.png";
	emoji["triumph"] = "http://i4.endoftheinter.net/i/n/7a211022f538621a75b3b20eb99387e6/triumph.png";
	emoji["weary"] = "http://i2.endoftheinter.net/i/n/1b193c91b863d687a1817fa55cd13d09/weary.png";
	emoji["waxing_gibbous_moon"] = "http://i2.endoftheinter.net/i/n/d0fe502f091160bc9c5404ba57fcf469/waxing_gibbous_moon.png";
	emoji["waxing_crescent_moon"] = "http://i3.endoftheinter.net/i/n/6ae34be6ec34816bc076b542f263d2f6/waxing_crescent_moon.png";
	emoji["wavy_dash"] = "http://i4.endoftheinter.net/i/n/7dba72def9effdd490340becf8c63136/wavy_dash.png";
	emoji["wave"] = "http://i3.endoftheinter.net/i/n/ea35e43827083f573b8ec6bbde360f3c/wave.png";
	emoji["watermelon"] = "http://i3.endoftheinter.net/i/n/24fef3d54d34b76b3ba3415d235d68d1/watermelon.png";
	emoji["warning"] = "http://i3.endoftheinter.net/i/n/e543f7d6fb65b6d13c0f58c342127724/warning.png";
	emoji["waning_gibbous_moon"] = "http://i1.endoftheinter.net/i/n/839ed931c37524feb2997e5c3a7b5a90/waning_gibbous_moon.png";
	emoji["waning_crescent_moon"] = "http://i3.endoftheinter.net/i/n/a68d2caba44e7f44e84d520ee90771f4/waning_crescent_moon.png";
	emoji["v"] = "http://i1.endoftheinter.net/i/n/8b2ae1486c5699e0af9ac61454bbc4b5/v.png";
	emoji["unamused"] = "http://i1.endoftheinter.net/i/n/48be9069523a8c9eb406bc983a0029b0/unamused.png";
	emoji["two_hearts"] = "http://i4.endoftheinter.net/i/n/7d8f94aaef2458dc74f2c39e8679b3a6/two_hearts.png";
	emoji["two_men_holding_hands"] = "http://i3.endoftheinter.net/i/n/62910e1600bce68f541762150e02e4bc/two_men_holding_hands.png";
	emoji["two_women_holding_hands"] = "http://i3.endoftheinter.net/i/n/e987bf2274647c462cdb0c12278dc4ab/two_women_holding_hands.png";
	emoji["tulip"] = "http://i2.endoftheinter.net/i/n/13e13093b0d6c6ba9adc2dbe48dcd5ef/tulip.png";
	emoji["trollface"] = "http://i2.endoftheinter.net/i/n/5b3670dc1038bec169a3dbb4009da804/trollface.png";
	emoji["wink"] = "http://i1.endoftheinter.net/i/n/4ea930c61caa3f1ebb9c914679f37fe7/wink.png";
	emoji["wolf"] = "http://i4.endoftheinter.net/i/n/b8efa3a4b8ee8066216cf3bdf8492640/wolf.png";
	emoji["woman"] = "http://i3.endoftheinter.net/i/n/675472f9bb9aed0c6ea4d2812222ef91/woman.png";
	emoji["worried"] = "http://i1.endoftheinter.net/i/n/ca9759416a7c827cebe6a57b30b4e331/worried.png";
	emoji["wrench"] = "http://i4.endoftheinter.net/i/n/bbe7058a47140f943bd2d9420a023dbd/wrench.png";
	emoji["yellow_heart"] = "http://i2.endoftheinter.net/i/n/9919924122e0513ab880b5582df82b81/yellow_heart.png";
	emoji["yum"] = "http://i2.endoftheinter.net/i/n/5a5eb5a678dbfc7f6222879fe0967ced/yum.png";
	emoji["zap"] = "http://i3.endoftheinter.net/i/n/a64bb89a3b477806941487b84f09189c/zap.png";
// #################################################################################
// # do not edit below this block unless you want to break things and ruin my life #
// #################################################################################
var emojiHidden = true;
// Janky way of counting an array that consists of string based keys since the .length property only works on 'normal' numeric indexed arrays.
Array.prototype.strCount = function () {
	var cnt = -1;
	for(var fieldName in this)
	{
		cnt++;
	} 
	return cnt;
}
var emojiCounts = emoji.strCount();
// This is the CSS for both the emoji icon and the entire emoji panel. Will probably have to adjust the width if we begin to add new emoji.
GM_addStyle( "#emojiIcons { position: absolute; width: 15px; height: auto; display: inline-block; margin-left: 1px } #phoneSmilies { position: absolute; width: 800px; height: auto; padding: 5px; border: black 4px dashed; border-width: thin; margin-top: -175px }" )
// Create the little emoji icon button that open and closes the emoji panel :^)
var emojiIcons = document.createElement('img');
emojiIcons.id = "emojiIcons";
emojiIcons.src = "http://i2.endoftheinter.net/i/n/1b193c91b863d687a1817fa55cd13d09/entroji.png";
// I don't know how stressful the emoji panel generating is on the browser, so I only generate it once if I can.
// Once it's generated, it gets stored in your browser's local storage until a change to the emoji array is detected (adding/removing an emoji).
if (GM_getValue("emojiPanels") == undefined || GM_getValue("emojiPanelsCount") != emojiCounts)
{
	// Time to generate the large emoji panel.
	var phoneSmilies = document.createElement('div');
	phoneSmilies.id = "phoneSmilies";
	for (var key in emoji)
	{
		if (emoji.hasOwnProperty(key)) 
		{
			var newEmoji = document.createElement('img');
			newEmoji.className = 'taigaEmote';
			newEmoji.id = key;
			newEmoji.alt = key;
			newEmoji.src = emoji[key];
			
			phoneSmilies.appendChild(newEmoji);
		}
	}
	phoneSmilies.innerHTML = phoneSmilies.innerHTML + "<br />";
	var autoInsertSpan = document.createElement('span');
	autoInsertSpan.style = "font-size=6px;";
	autoInsertSpan.innerHTML = "auto-insert emoji?";
	phoneSmilies.appendChild(autoInsertSpan);
	var autoInsertInput = document.createElement('input');
	autoInsertInput.type = "checkbox";
	autoInsertInput.id = "autoinsert";
	autoInsertInput.value = "on";
	phoneSmilies.appendChild(autoInsertInput);
	
	GM_setValue("emojiPanels", phoneSmilies.outerHTML)
	GM_setValue("emojiPanelsCount", emojiCounts)
} else {
	phoneSmilies = GM_getValue("emojiPanels");
}
// The emoji panel already existed or just finished generating, time to insert everything.
$("textarea[name=message]").before(emojiIcons);
$("#emojiIcons").after("<br />");
$("textarea[name=message]").before(phoneSmilies);
// Set the emoji panel's background CSS to match the user's current skin.
$("#phoneSmilies").css("background-color", $("body").css('background-color'));
// This block checks to see if we've already stored the value for auto-insert for option persistence. False is the default.
var autoInsert = false;
if (GM_getValue("auto-insert") == undefined)
{
	GM_setValue("auto-insert", true)
	autoInsert = true;
} else {
	var autoInsert = GM_getValue('auto-insert');
}
// These next three blocks are just defining how the various buttons will toggle and set values.
if (autoInsert == true)
{
	$("#autoinsert").attr('checked', true);
}
$("#autoinsert").click(function(event) {
	autoInsert = !autoInsert;
	GM_setValue("auto-insert", autoInsert)
});
$("#emojiIcons").click(function(event) {
	if (emojiHidden) {
		$("#phoneSmilies").show();
	} else {
		$("#phoneSmilies").hide();
	}
	emojiHidden = !emojiHidden;
});
$("#phoneSmilies").hide();
// Auto-hide the emoji panel when you click post or preview.
$("input[name=post]").click(function(event) {
	emojiHidden = true;
	$("#phoneSmilies").hide();
});
$("input[name=preview]").click(function(event) {
	emojiHidden = true;
	$("#phoneSmilies").hide();
});
// These next three functions I found on a few random blogs after testing at least 10 different functions for each of these because no one could decide on which was the best, these are the only 3 that reliably worked.
$.fn.insertAtCaret = function (tagName) {
	return this.each(function(){
		if (document.selection) {
			//IE support
			this.focus();
			sel = document.selection.createRange();
			sel.text = tagName;
			this.focus();
		}else if (this.selectionStart || this.selectionStart == '0') {
			//MOZILLA/NETSCAPE support
			startPos = this.selectionStart;
			endPos = this.selectionEnd;
			scrollTop = this.scrollTop;
			this.value = this.value.substring(0, startPos) + tagName + this.value.substring(endPos,this.value.length);
			this.focus();
			this.selectionStart = startPos + tagName.length;
			this.selectionEnd = startPos + tagName.length;
			this.scrollTop = scrollTop;
		} else {
			this.value += tagName;
			this.focus();
		}
	});
};
(function($) {
	$.fn.getCursorPosition = function() {
		var input = this.get(0);
		if (!input) return; // No (input) element found
		if ('selectionStart' in input) {
			// Standard-compliant browsers
			return input.selectionStart;
		} else if (document.selection) {
			// IE
			input.focus();
			var sel = document.selection.createRange();
			var selLen = document.selection.createRange().text.length;
			sel.moveStart('character', -input.value.length);
			return sel.text.length - selLen;
		}
	}
})(jQuery);
new function($) {
  $.fn.setCursorPosition = function(pos) {
	if ($(this).get(0).setSelectionRange) {
	  $(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
	  var range = $(this).get(0).createTextRange();
	  range.collapse(true);
	  range.moveEnd('character', pos);
	  range.moveStart('character', pos);
	  range.select();
	}
  }
}(jQuery);
// This whole carat business is what gave me the most trouble I think, the whole text box gets replaced as soon as an emoji is found, but it seems seamless since the text cursor gets placed back where it was.
$(".taigaEmote").click(function(event) {
	if (emoji.hasOwnProperty(event.target.id)){
		$("textarea[name=message]").insertAtCaret('<img src="' + emoji[event.target.id] + '" />');
	};
});
// The following is black magic.
var postCheck = setInterval(function() {
	if (!autoInsert) { return; }
	
	var post = $("textarea[name=message]").val();
	
	var emojiRegEx = post.match(/:(?:[^:/]*):/g);
	var addPos = 0;
	if (emojiRegEx)
	{
		var newpost = post;
		$.each(emojiRegEx, function(i, value)
		{
			var emojiId = value.substr(0, value.length-1).substr(1);
			if (emoji[emojiId.toLowerCase()])
			{
				var curPos = $("textarea[name=message]").getCursorPosition();
				var imgLink = "<img src=\"" + emoji[emojiId.toLowerCase()] + "\" />";
				newpost = newpost.replace(value, imgLink);
				addPos = addPos + imgLink.length - value.length;
				
				$("textarea[name=message]").val(newpost);
				$("textarea[name=message]").setCursorPosition(curPos + addPos);
			}
		});
	}
}, 100);