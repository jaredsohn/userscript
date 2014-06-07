// ==UserScript==
// @name        sa eti emojis
// @namespace   ryan entro
// @description adds SA emotes to eti
// @require 	http://code.jquery.com/jquery-1.8.0.min.js
// @include     /https?:\/\/((boards|archives)\.)?endoftheinter\.net\/(showmessages|postmsg|inboxthread)\.php/
// @version     0.01
// ==/UserScript==
// If you want to add new emoji to the script, it's pretty self explanatory. Add the ID and the image url in the format you see here.
// Make sure it's the direct link to the image. Warning though, if I update the script and you install the latest one, any changes to
// your emoji list will be lost, unless you yell at me to add the new emoji or change the id.
var emoji = [];
emoji["frown"] = "http://i4.endoftheinter.net/i/n/74b81618d9c50fdc449089233f44fc79/frown.gif";
emoji["smile"] = "http://i4.endoftheinter.net/i/n/7a2ec307e08bd38a3b723d71202d217f/smile.gif";
emoji["frown"] = "http://i4.endoftheinter.net/i/n/74b81618d9c50fdc449089233f44fc79/frown.gif";
emoji["smile"] = "http://i4.endoftheinter.net/i/n/7a2ec307e08bd38a3b723d71202d217f/smile.gif";
emoji["30bux"] = "http://i1.endoftheinter.net/i/n/0ddcd47e61845a6c49f740a5b30b24e0/30bux.png";
emoji["3"] = "http://i2.endoftheinter.net/i/n/15774d2a1ccce4deee0ab2f80671ba39/3.gif";
emoji["aaa"] = "http://i3.endoftheinter.net/i/n/a7b9e502c60669f805af9f04fa7eae32/aaa.gif";
emoji["aaaaa"] = "http://i4.endoftheinter.net/i/n/72c29da1a42edd89b79d747884c752c9/aaaaa.gif";
emoji["airquote"] = "http://i4.endoftheinter.net/i/n/b2e8dbdbb29eae7fe9011165cd90b4b5/airquote.gif";
emoji["allears"] = "http://i4.endoftheinter.net/i/n/f0c65999cc7d3315ef3da82a7f55a25c/allears.gif";
emoji["angel"] = "http://i1.endoftheinter.net/i/n/c08aef587ee4ae79c038f7cf53c09ec3/angel.gif";
emoji["argh"] = "http://i1.endoftheinter.net/i/n/843ee33bdfa7572fe2f7e75993426df9/argh.gif";
emoji["arghfist"] = "http://i4.endoftheinter.net/i/n/ba7d3075fd0aa0f2e3f587b6a88af61a/arghfist.gif";
emoji["bang"] = "http://i2.endoftheinter.net/i/n/569abc953b85a20f831c20d273639fbe/bang.gif";
emoji["banjo"] = "http://i2.endoftheinter.net/i/n/dfb3cd40b4e2afa89cd70ac14efb338d/banjo.gif";
emoji["black101"] = "http://i2.endoftheinter.net/i/n/17ce4a51f35ba527e75ff74d1e2dcb89/black101.gif";
emoji["blush"] = "http://i1.endoftheinter.net/i/n/cb51ce9d4e07a0e2ea53d932044aa44d/blush.gif";
emoji["bravo2"] = "http://i4.endoftheinter.net/i/n/3f6581996879662daa7e9609deb6fbae/bravo2.gif";
emoji["butt"] = "http://i3.endoftheinter.net/i/n/6407362fee1162e564c0d9c829d5ac21/butt.gif";
emoji["catholic"] = "http://i2.endoftheinter.net/i/n/5075a30899f610ddbcdd5077c818eaaa/catholic.gif";
emoji["cawg"] = "http://i2.endoftheinter.net/i/n/dea0f93fe078c76750b11f8860c41c59/cawg.gif";
emoji["cb"] = "http://i2.endoftheinter.net/i/n/dcd190b7e9d117e36a16d03ea8babe15/cb.gif";
emoji["cheeky"] = "http://i4.endoftheinter.net/i/n/fc93f021bcfc599bae783d1fb38f8102/cheeky.gif";
emoji["cheers"] = "http://i4.endoftheinter.net/i/n/70022011a3a1947e0e48613a1bd53b60/cheers.gif";
emoji["chef"] = "http://i1.endoftheinter.net/i/n/4e3f876eca7276f1daa42c222b5f8cae/chef.gif";
emoji["choco"] = "http://i2.endoftheinter.net/i/n/5671857aeaa382944ccc6eb6e1a53159/choco.gif";
emoji["clint"] = "http://i1.endoftheinter.net/i/n/c8938e83b1dbe60f0616262684e16caf/clint.gif";
emoji["coffee"] = "http://i1.endoftheinter.net/i/n/c273c7e5641edf684639d3ce3cc4bc57/coffee.gif";
emoji["colbert"] = "http://i1.endoftheinter.net/i/n/cce52f2958506648c1a6b0b9c2704c62/colbert.gif";
emoji["comeback"] = "http://i1.endoftheinter.net/i/n/c8c5cfbfda3429ae423a2f6185f9b2ed/comeback.gif";
emoji["commissar"] = "http://i4.endoftheinter.net/i/n/337fd3faca4bb40f5dcabbcb6889d326/commissar.gif";
emoji["confused"] = "http://i1.endoftheinter.net/i/n/c0136eed14e1d78bc8bf3770606a941b/confused.gif";
emoji["cool"] = "http://i2.endoftheinter.net/i/n/da321deef813c8ab752daf0e449d2a8b/cool.gif";
emoji["cop"] = "http://i1.endoftheinter.net/i/n/4ab5596b9332f0b288ade3accdd68e74/cop.gif";
emoji["crossarms"] = "http://i4.endoftheinter.net/i/n/f343da4d00e96952763ae8a22e2055c0/crossarms.gif";
emoji["cry"] = "http://i2.endoftheinter.net/i/n/d65c03728778c06e3c901f303144af7c/cry.gif";
emoji["cthulhu"] = "http://i1.endoftheinter.net/i/n/82933792b71a0cb7474324df9159b93e/cthulhu.gif";
emoji["biggrin"] = "http://i4.endoftheinter.net/i/n/3cbce05e9849cd7f606933332aef63c2/biggrin.gif";
emoji["dance"] = "http://i2.endoftheinter.net/i/n/dcf1fb5a4888ac5030c36e93196804ff/dance.gif";
emoji["devil"] = "http://i3.endoftheinter.net/i/n/e9e61681209d9dfc64c6adf24a690dd2/devil.gif";
emoji["dings"] = "http://i2.endoftheinter.net/i/n/5090a2e5f817d0656c79ce9bbbb5659e/dings.gif";
emoji["doh"] = "http://i2.endoftheinter.net/i/n/1dfb7101b6791896a41d7d6215c2ddc9/doh.gif";
emoji["downs"] = "http://i1.endoftheinter.net/i/n/83df057ae0263d4344f3a23c821a3c1e/downs.gif";
emoji["downsgun"] = "http://i4.endoftheinter.net/i/n/b175e1711dfc68a4c6e0ddd5d14b1900/downsgun.gif";
emoji["downswords"] = "http://i2.endoftheinter.net/i/n/d33c10df8b46674b8d8d40c3519ad4cb/downswords.gif";
emoji["drac"] = "http://i4.endoftheinter.net/i/n/3091415e6ffbc1f9932cf557221eb2e0/drac.gif";
emoji["eek"] = "http://i3.endoftheinter.net/i/n/2be411c30b822a714d745fb034b6bbe7/eek.gif";
emoji["emo"] = "http://i2.endoftheinter.net/i/n/9d3c94cdf74cc2610dd7ce332454a799/emo.gif";
emoji["eng101"] = "http://i3.endoftheinter.net/i/n/eeb321c9686c3ae89b6cef92aa428ca3/eng101.gif";
emoji["eng99"] = "http://i4.endoftheinter.net/i/n/b46013d77aed6497490297f13fd7abcd/eng99.gif";
emoji["engleft"] = "http://i4.endoftheinter.net/i/n/353e563a429e4cba09f0916068ae413a/engleft.gif";
emoji["eyepop"] = "http://i4.endoftheinter.net/i/n/f540cec27179f3ca29f03821ef9ef4db/eyepop.gif";
emoji["f5"] = "http://i1.endoftheinter.net/i/n/0877a7ea36805a327d5927a87c39a001/f5.gif";
emoji["f5h"] = "http://i1.endoftheinter.net/i/n/ccba9f9848ae36e548c6165143657778/f5h.gif";
emoji["fap"] = "http://i4.endoftheinter.net/i/n/feefc6531a88ee0fea34b18632fd59ab/fap.gif";
emoji["fh"] = "http://i1.endoftheinter.net/i/n/83353840c901f7e8a960f29c61064536/fh.gif";
emoji["flame"] = "http://i3.endoftheinter.net/i/n/a057f29416a46ae68d82732d6e72290e/flame.gif";
emoji["gay"] = "http://i2.endoftheinter.net/i/n/94a769bb7f9a591db3cb915f4b5a998c/gay.gif";
emoji["geno"] = "http://i1.endoftheinter.net/i/n/0872b41008d092dac7a0ab2204b0e3ce/geno.gif";
emoji["ghost"] = "http://i3.endoftheinter.net/i/n/22d069a4cba3b5f5a30f8be0ca11431d/ghost.gif";
emoji["gibs"] = "http://i3.endoftheinter.net/i/n/e1730487006a2b2845bb5f583337ad09/gibs.gif";
emoji["glomp"] = "http://i3.endoftheinter.net/i/n/6e1a14a81b19c6c35da4f00ec5c4e81e/glomp.gif";
emoji["golfclap"] = "http://i1.endoftheinter.net/i/n/06c76887836a217ac69d8ee957eb4877/golfclap.gif";
emoji["gonk"] = "http://i4.endoftheinter.net/i/n/3a75c6f79729ffc6270be83c8cbdac5e/gonk.gif";
emoji["greatgift"] = "http://i2.endoftheinter.net/i/n/51e82943872304c8b883f9d12df7900b/greatgift.gif";
emoji["greenangel"] = "http://i2.endoftheinter.net/i/n/5af504e40a37952322ca1bba7039a8de/greenangel.gif";
emoji["haw"] = "http://i2.endoftheinter.net/i/n/5ea7adfe1a04694178e39964ad7c3345/haw.gif";
emoji["hawaaaafap"] = "http://i2.endoftheinter.net/i/n/d490f82083b3ef018094b4983debb83d/hawaaaafap.gif";
emoji["hehe"] = "http://i2.endoftheinter.net/i/n/5a1acda364833ad7016eb3c4d8b34542/hehe.gif";
emoji["henget"] = "http://i4.endoftheinter.net/i/n/be01daec2bc477724ec719360c14a277/henget.gif";
emoji["heysexy"] = "http://i1.endoftheinter.net/i/n/826c67fb857da7ea29d35188956f8592/heysexy.gif";
emoji["hf"] = "http://i2.endoftheinter.net/i/n/5bcd6c64bae146ad2fbeb2e520001288/hf.gif";
emoji["hfive"] = "http://i1.endoftheinter.net/i/n/8dfb93493ced157799425b64c771b416/hfive.gif";
emoji["hist101"] = "http://i1.endoftheinter.net/i/n/870591ce6cec4e93602a9361d56ab772/hist101.gif";
emoji["holy"] = "http://i1.endoftheinter.net/i/n/41161d263eb6381c7312f617a2336efe/holy.gif";
emoji["huh"] = "http://i2.endoftheinter.net/i/n/1c78b8fc3c09febc2ecf3be8c1aa0178/huh.gif";
emoji["hydrogen"] = "http://i2.endoftheinter.net/i/n/115b01fa2cf321ee3bc0ae0e07742409/hydrogen.gif";
emoji["j"] = "http://i1.endoftheinter.net/i/n/0bf75737e764b43ae5fe60d215f36d35/j.gif";
emoji["jerkbag"] = "http://i4.endoftheinter.net/i/n/376cec5fb080c8932a02fa03c8d75e54/jerkbag.gif";
emoji["jewish"] = "http://i3.endoftheinter.net/i/n/28032a543707f55bc800b8abbc395b97/jewish.gif";
emoji["jihad"] = "http://i4.endoftheinter.net/i/n/b17e9e3a63cc3fcdda1f6abffa202120/jihad.gif";
emoji["keke"] = "http://i3.endoftheinter.net/i/n/64982a684e7db54530622ee663702627/keke.gif";
emoji["kimchi"] = "http://i1.endoftheinter.net/i/n/cde866c5ae754e2fe625b8d0470e3cc8/kimchi.gif";
emoji["mad"] = "http://i3.endoftheinter.net/i/n/e3bbf7bc32fc771b6dfeb300a60f9918/mad.gif";
emoji["mmmhmm"] = "http://i3.endoftheinter.net/i/n/a09f27711047961091f1073b7061b475/mmmhmm.gif";
emoji["monocle"] = "http://i2.endoftheinter.net/i/n/960115d9fe9564c9c60753b91bd7af29/monocle.gif";
emoji["morning"] = "http://i2.endoftheinter.net/i/n/1297f25f15c55c5b3deb76cbb1cbec5a/morning.gif";
emoji["munch"] = "http://i4.endoftheinter.net/i/n/3d4e2d27a6b4ffe799e5d49665c2c968/munch.gif";
emoji["neckbeard"] = "http://i2.endoftheinter.net/i/n/5157282bb7881bb15a9334ff16a4585f/neckbeard.gif";
emoji["newfap"] = "http://i2.endoftheinter.net/i/n/970871216109e0f1386222b376d03f2c/newfap.gif";
emoji["newlol"] = "http://i3.endoftheinter.net/i/n/2fb225d2672becc74caeb84f71249048/newlol.gif";
emoji["niggly"] = "http://i1.endoftheinter.net/i/n/09f16babc1c22fc4af3d059d2793cfb8/niggly.gif";
emoji["ninja"] = "http://i2.endoftheinter.net/i/n/53c11d97c6d6c2b015377696c9fb4e6a/ninja.gif";
emoji["nyd"] = "http://i4.endoftheinter.net/i/n/7f90bb461baa1e7f67b1f6c114535a7d/nyd.gif";
emoji["o"] = "http://i1.endoftheinter.net/i/n/c67d0a9a30d389803083173d3b48af3f/o.gif";
emoji["ohdear"] = "http://i1.endoftheinter.net/i/n/87971ec9fee59b1544c225e225a0bbb5/ohdear.png";
emoji["ohdearsass"] = "http://i1.endoftheinter.net/i/n/8596f2048bf49ec85d044dbde5c934fb/ohdearsass.png";
emoji["pedo"] = "http://i3.endoftheinter.net/i/n/26377a9228bba61d2be928ad3c352957/pedo.gif";
emoji["pervert"] = "http://i3.endoftheinter.net/i/n/e68be853fbe49ab234def44af8b2a93c/pervert.gif";
emoji["pirate"] = "http://i1.endoftheinter.net/i/n/4f92d58930174d7fab53aa1d32034380/pirate.gif";
emoji["pray"] = "http://i1.endoftheinter.net/i/n/c8bcdf6eb7922e3fce082df5e85ae48b/cumpolice.gif";
emoji["pseudo"] = "http://i4.endoftheinter.net/i/n/3d9fb838b0b78d3e7b82489a5bb0a49a/pseudo.gif";
emoji["raise"] = "http://i3.endoftheinter.net/i/n/ef1aa3fbdc7416e4714ede420b5672d0/raise.gif";
emoji["rant"] = "http://i2.endoftheinter.net/i/n/dfd5b10a1615714a8e6d9468bd93dd0a/rant.gif";
emoji["reject"] = "http://i2.endoftheinter.net/i/n/54425c30cdce80b6e1193afcdc471a54/reject.gif";
emoji["respek"] = "http://i3.endoftheinter.net/i/n/e1e79be9196859571c260a94f7eb4d37/respek.gif";
emoji["rimshot"] = "http://i3.endoftheinter.net/i/n/a737d3cefc4b3994a2b0eef08beafccb/rimshot.gif";
emoji["roboluv"] = "http://i1.endoftheinter.net/i/n/cbaafcc7b36050e416a886349b52f1cf/roboluv.gif";
emoji["rock"] = "http://i2.endoftheinter.net/i/n/df7bc1dfae5356485c1b01988cb6977b/rock.gif";
emoji["roflolmao"] = "http://i3.endoftheinter.net/i/n/eaf25b0a667ee165bec5ff875c95b58d/roflolmao.gif";
emoji["rolleye"] = "http://i2.endoftheinter.net/i/n/1cf27c4f810eddaea07f77629425a356/rolleye.gif";
emoji["rolleyes"] = "http://i3.endoftheinter.net/i/n/6305765704644dcccb47b9a8939d6864/rolleyes.gif";
emoji["saddowns"] = "http://i1.endoftheinter.net/i/n/0e01f248524df3903c3fbd52317713f5/saddowns.gif";
emoji["sassargh"] = "http://i4.endoftheinter.net/i/n/bcad7d595da03d30bcdbbd80fb5c4bdd/sassargh.gif";
emoji["science"] = "http://i1.endoftheinter.net/i/n/8e2b0338159cfcba73388e3dca80098a/science.gif";
emoji["shlick"] = "http://i3.endoftheinter.net/i/n/abe3aae97d9b744195754181820ccba2/shlick.gif";
emoji["shobon"] = "http://i3.endoftheinter.net/i/n/2aa72c64c9aacc6a961296b0e3031bfb/shobon.gif";
emoji["shrug"] = "http://i4.endoftheinter.net/i/n/b89505213b6bbaeae02d50de50740069/shrug.gif";
emoji["sigh"] = "http://i3.endoftheinter.net/i/n/28c643f0387f0a418b39447110b4712d/sigh.gif"; 
emoji["silent"]	= "http://i4.endoftheinter.net/i/n/f7b8e729cc099c8e200f3306843937e0/silent.gif";
emoji["siren"] = "http://i4.endoftheinter.net/i/n/be494d9eccf4dcd146f8fe0e85790636/siren.gif";
emoji["smuggo"] = "http://i2.endoftheinter.net/i/n/580ac0b269d57bb2562ae8093280aabb/smuggo.gif";
emoji["smugmrgw"] = "http://i3.endoftheinter.net/i/n/ef6c85cd9081e98ed0f2fd8e89a1fc76/smugmrgw.png";
emoji["ssh"] = "http://i3.endoftheinter.net/i/n/e73dacd186ea9616d0a5b0edb35f63ef/ssh.gif";
emoji["ssj"] = "http://i4.endoftheinter.net/i/n/fad9af2bb515cd71d6a665fdafef72ed/ssj.gif";
emoji["stare"] = "http://i3.endoftheinter.net/i/n/62222d3935016fd733f8bf4004605c49/stare.gif";
emoji["stonk"] = "http://i1.endoftheinter.net/i/n/08e0a62d1230c719bdcce1a0de29453d/stonk.gif";
emoji["suicide"] = "http://i2.endoftheinter.net/i/n/543f8ca6523f3d4fe9384978cd4b8ae0/suicide.gif";
emoji["sun"] = "http://i2.endoftheinter.net/i/n/142060cded85f1e4abdcad36be4ffca6/sun.gif";
emoji["supaburn"] = "http://i1.endoftheinter.net/i/n/4e691a79ee855ef5fee06d52ff3f3f38/supaburn.gif";
emoji["sweatdrop"] = "http://i2.endoftheinter.net/i/n/929cef9cd29a9e95e3a301cc688a3668/sweatdrop.gif";
emoji["swoon"] = "http://i4.endoftheinter.net/i/n/72b41a84c42052f54d9b5cb8228fefe9/swoon.gif";
emoji["sympathy"] = "http://i1.endoftheinter.net/i/n/8a5df709c1314f7b73351af94792d1d3/sympathy.gif";
emoji["tinfoil"] = "http://i3.endoftheinter.net/i/n/a0443972fc2a3e81e7b3c641c68f7589/tinfoil.gif";
emoji["tipshat"] = "http://i2.endoftheinter.net/i/n/5a75662bb0429850634591abe93f24ca/tipshat.gif";
emoji["tizzy"] = "http://i2.endoftheinter.net/i/n/5615a33c5c548152c22483915af06ea2/tizzy.gif";
emoji["toot"] = "http://i1.endoftheinter.net/i/n/44a4ea286e611897b2b126f8a2cbb203/toot.gif";
emoji["twisted"] = "http://i1.endoftheinter.net/i/n/c9c3d12da1e9da699e490b86d24eee85/twisted.gif";
emoji["v"] = "http://i4.endoftheinter.net/i/n/302367713bea8e8c6ebff3f9601eacb0/v.gif";
emoji["what"] = "http://i3.endoftheinter.net/i/n/293d2e084f6fff45143434b909de89cf/what.gif";
emoji["whip"] = "http://i4.endoftheinter.net/i/n/f7ac39791face53b36cfd6b4f50dde86/whip.gif";
emoji["witch"] = "http://i1.endoftheinter.net/i/n/864514b9bba19381bc46095cfbc205a2/witch.gif";
emoji["woop"] = "http://i4.endoftheinter.net/i/n/3e00e0ba93eb1b339381b5df99b6bc19/woop.gif";
emoji["words"] = "http://i2.endoftheinter.net/i/n/d8cf42a454059c0ea1356cdf939f7195/words.gif";
emoji["worship"] = "http://i2.endoftheinter.net/i/n/5a25986e4f78babd42658008650bd873/worship.gif";
emoji["wth"] = "http://i1.endoftheinter.net/i/n/031bdc12c3e420db79671bf7c11d3539/wth.gif";
emoji["xd"] = "http://i3.endoftheinter.net/i/n/2049c816039e6a3ebbb20818c112fc48/xd.gif";
emoji["yarr"] = "http://i3.endoftheinter.net/i/n/ee600823c7c35e163e7ff1823255d775/yarr.gif";
emoji["yotj"] = "http://i1.endoftheinter.net/i/n/46fa906afdfb73f0b37f56612d8d9c33/yotj.gif";
emoji["yum"] = "http://i3.endoftheinter.net/i/n/2862bd2ae2dc4137c65a1c09465f5767/yum.gif";
emoji["zombie"] = "http://i4.endoftheinter.net/i/n/3cd942ec45ef4af0ae40bd5e920aace1/zombie.gif";
emoji["zoro"] = "http://i2.endoftheinter.net/i/n/546ea84d14ba12f3ff211d1c1c621040/zoro.gif";
emoji["winksmile"] = "http://i4.endoftheinter.net/i/n/bec7d00785cfad0d35e1dc9de8f9f0a1/winksmile.gif";
emoji["whore"] = "http://i3.endoftheinter.net/i/n/ae436311470ad6a74d9183a6cf9c9891/whore.gif";
emoji["10bux"] = "http://i3.endoftheinter.net/i/n/692b3d29b4868c4a213eab227c30906c/10bux.gif";
emoji["20bux"] = "http://i4.endoftheinter.net/i/n/f3d7c6957ced57b76e511977b69ed016/20bux.gif";
emoji["69snypa"] = "http://i2.endoftheinter.net/i/n/9073bf5ec9ca737ca1993e260ac104bf/69snypa.gif";
emoji["banme"] = "http://i2.endoftheinter.net/i/n/1a929a68d95c58be972a3f872857a814/banme.gif";
emoji["bunt"] = "http://i2.endoftheinter.net/i/n/dea6a95432cb768f30e51b57880d860c/bunt.gif";
emoji["byewhore"] = "http://i2.endoftheinter.net/i/n/d80a35b1393986a9f75970a2d3d55e75/byewhore.gif";
emoji["byob"] = "http://i3.endoftheinter.net/i/n/2fcc51bc6fbf1013e729c62481e37ddf/byob.gif";
emoji["cadfan"] = "http://i4.endoftheinter.net/i/n/39addb43d2c17bc71320fb3dcf241257/cadfan.gif";
emoji["clegg"] = "http://i2.endoftheinter.net/i/n/9a559338a27368f9754903f490f34546/clegg.gif";
emoji["cmon"] = "http://i4.endoftheinter.net/i/n/bf6d913fd27bfc87d3278a595e2c8abe/cmon.gif";
emoji["coupons"] = "http://i3.endoftheinter.net/i/n/a3b5af8fc6f3a9181486a66763a0447c/coupons.gif";
emoji["cumpolice"] = "http://i1.endoftheinter.net/i/n/c8bcdf6eb7922e3fce082df5e85ae48b/cumpolice.gif";
emoji["damn"] = "http://i1.endoftheinter.net/i/n/06c180f7880c41b8adc3c0818885c08c/damn.gif";
emoji["darksouls"] = "http://i3.endoftheinter.net/i/n/a319ea072d60cdb1f4a3c4848c620cb1/darksouls.gif";
emoji["dealwithit"] = "http://i1.endoftheinter.net/i/n/8a1924cec4ac082f27652e8a299c3af4/dealwithit.gif";
emoji["dice"] = "http://i4.endoftheinter.net/i/n/b5503e2977948e0345927a772c159a6a/dice.gif";
emoji["downsowned"] = "http://i2.endoftheinter.net/i/n/5ea00cfe8c584f08d2f6469580a3b8f6/downsowned.gif";
emoji["effort"] = "http://i1.endoftheinter.net/i/n/0fb42e77807f3dcc8e21eb4a39da8bf7/effort.gif";
emoji["feelsgood"] = "http://i2.endoftheinter.net/i/n/d6aab4e8a65943c0dfdae2176f554234/feelsgood.png";
emoji["filez"] = "http://i1.endoftheinter.net/i/n/c8f819ea04032bf5d62c6257cd3f5cda/filez.gif";
emoji["firstpost"] = "http://i1.endoftheinter.net/i/n/48dc229e14f8d8b5c9546fe49587596d/firstpost.gif";
emoji["frogon"] = "http://i2.endoftheinter.net/i/n/1a7661d70ee0eb3a25a679eb6cc3e107/frogon.png";
emoji["frogout"] = "http://i3.endoftheinter.net/i/n/64bbe387312d643cb1939ffaa9ed92e0/frogout.gif";
emoji["ftbrg"] = "http://i4.endoftheinter.net/i/n/7c626060ab9ecce17dec9f624ae81269/ftbrg.gif";
emoji["gb2byob"] = "http://i3.endoftheinter.net/i/n/a644a371ad9fbff7a6392de4ba7295c2/gb2byob.gif";
emoji["gb2fyad"] = "http://i1.endoftheinter.net/i/n/895e7323ccbf899c5074d38244a7de91/gb2fyad.gif";
emoji["gb2gbs"] = "http://i2.endoftheinter.net/i/n/511a40c311f2984e0a862cf25c29165c/gb2gbs.gif";
emoji["gb2hd2k"] = "http://i4.endoftheinter.net/i/n/bce559b672016548f8b3ccc29c486dff/gb2hd2k.gif";
emoji["getout"] = "http://i4.endoftheinter.net/i/n/b71b4f8992f807c1590d94106804c40c/getout.png";
emoji["godwin"] = "http://i2.endoftheinter.net/i/n/1e06f428ead636a04524fc28102c139e/godwin.gif";
emoji["goof"] = "http://i2.endoftheinter.net/i/n/59f012dd7afe2ff91b38c58a54983d82/goof.gif";
emoji["hurr"] = "http://i3.endoftheinter.net/i/n/67bce52bed4b9b2ddc4f00d0499921d9/hurr.gif";
emoji["iceburn"] = "http://i4.endoftheinter.net/i/n/b2a5f99c9dc36b8d84dc36d8fab0159e/iceburn.gif";
emoji["iia"] = "http://i2.endoftheinter.net/i/n/978fa505cfcd1bc508b7563439f8c8d3/iia.png";
emoji["iiam"] = "http://i3.endoftheinter.net/i/n/ef4b5ce8af7f605d06904687a5f3ca74/iiam.gif";
emoji["iiapa"] = "http://i2.endoftheinter.net/i/n/d7ff02c78bb5172d3e9bc709a440ea29/iiapa.png";
emoji["justpost"] = "http://i1.endoftheinter.net/i/n/814b73f7ab2e0419b8701c94a17bf649/justpost.gif";
emoji["laffo"] = "http://i3.endoftheinter.net/i/n/2f8d43a79eb7acb88674cb3e91c5294e/laffo.gif";
emoji["lol"] = "http://i2.endoftheinter.net/i/n/138dced81fa54f6e15831ea1eab98848/lol.gif";
emoji["m10"] = "http://i2.endoftheinter.net/i/n/d499c87b2dd731e06ecf7b950bce7985/m10.gif";
emoji["master"] = "http://i4.endoftheinter.net/i/n/747198ef6f7a58e953dfd540563aa53d/master.gif";
emoji["milkie"] = "http://i1.endoftheinter.net/i/n/4fa9192b3b82fb3f425fd479dff7f491/milkie.gif";
emoji["mitt"] = "http://i2.endoftheinter.net/i/n/53dd59954660951596ef546e4628cba4/mitt.gif";
emoji["mordin"] = "http://i3.endoftheinter.net/i/n/2c5743de7b898659bcb654d221725f1b/mordin.gif";
emoji["moreevil"] = "http://i4.endoftheinter.net/i/n/b2e24203575aa31a249965950265a484/moreevil.gif";
emoji["ms"] = "http://i1.endoftheinter.net/i/n/0d7bc14b97d28b97d9e96bbe201fac50/ms.gif";
emoji["nattyburn"] = "http://i3.endoftheinter.net/i/n/27600bec7f687550f3e6e24cf7b438d4/nattyburn.gif";
emoji["nms"] = "http://i2.endoftheinter.net/i/n/91503f30d4157355fdfc83944a33cf73/nms.gif";
emoji["nws"] = "http://i3.endoftheinter.net/i/n/e80cbd79882ceecc8946a1022a1a09e1/nws.gif";
emoji["owned"] = "http://i2.endoftheinter.net/i/n/54bb85ff9ca5bb1b59a77f048cf80f9a/owned.gif";
emoji["pedophiles"] = "http://i1.endoftheinter.net/i/n/84302a1fba92257a1acd06aa525e3387/pedophiles.gif";
emoji["protarget"] = "http://i3.endoftheinter.net/i/n/6452ea1932562ce224bdc7c85f1a40cb/protarget.gif";
emoji["regd04"] = "http://i4.endoftheinter.net/i/n/3f6d26274a179dd819d2d0a8a52f3e76/regd04.gif";
emoji["regd05"] = "http://i3.endoftheinter.net/i/n/e159dedb713a79954ff4cd42f9b2ac59/regd05.gif";
emoji["regd06"] = "http://i2.endoftheinter.net/i/n/d3653372af146ab4a9fe596b2a5f9a2c/regd06.gif";
emoji["regd07"] = "http://i4.endoftheinter.net/i/n/78df2190c3576cfd39bbcee6dd65bd6a/regd07.gif";
emoji["regd08"] = "http://i3.endoftheinter.net/i/n/ad30528cafd70aaf26b2b15cd2a2a2cf/regd08.gif";
emoji["regd10"] = "http://i4.endoftheinter.net/i/n/74e22e9e8274ff15fb765038c54c3abe/regd10.png";
emoji["rms"] = "http://i1.endoftheinter.net/i/n/c0b8d3be877fd423b45e82703194964b/rms.png";
emoji["sbahj"] = "http://i1.endoftheinter.net/i/n/4ba4ff1910a83b2f6c28e0812a531f4e/sbahj.gif";
emoji["sicknasty"] = "http://i3.endoftheinter.net/i/n/6f890abededa6c25cb1167fd85dbe874/sicknasty.gif";
emoji["speculate"] = "http://i1.endoftheinter.net/i/n/8df1f5ef7630b4abd4218aa58c82147c/speculate.gif";
emoji["stoke"] = "http://i1.endoftheinter.net/i/n/46ca79be04813d6278ab6a39e3f75574/stoke.gif";
emoji["tetten"] = "http://i1.endoftheinter.net/i/n/4db65b27407865469300ded8ee88fbe2/tetten.gif";
emoji["their"] = "http://i2.endoftheinter.net/i/n/d11d4e951bc6a35abdf72add4c5fa140/their.gif";
emoji["vd"] = "http://i4.endoftheinter.net/i/n/b40a6f8b86ae22a93f2aea0180532382/vd.gif";
emoji["w00t"] = "http://i2.endoftheinter.net/i/n/dd087258ac9357e5b0c1683cc1ff0268/w00t.gif";
emoji["w2byob"] = "http://i4.endoftheinter.net/i/n/7519b4c51d096322eff0c549d58f4eb3/w2byob.gif";
emoji["waycool"] = "http://i1.endoftheinter.net/i/n/8c30ccfea59133f8582c5c9b45a4f4cc/waycool.gif";
emoji["whoptc"] = "http://i2.endoftheinter.net/i/n/18ccc3afaf6b036ffbf096e5abe75c45/whoptc.gif";
emoji["wrongful"] = "http://i2.endoftheinter.net/i/n/1d196a041deea5ef8cc43470d3b26950/wrongful.gif";
emoji["wtc"] = "http://i4.endoftheinter.net/i/n/764be8e8a8b5cc15de3a73b68753fc3b/wtc.gif";
emoji["wtf"] = "http://i3.endoftheinter.net/i/n/20bb0dedc785573db59fdc584d82cfbb/wtf.gif";
emoji["yohoho"] = "http://i2.endoftheinter.net/i/n/5515a31448f7a454e06fa57a89e7a993/yohoho.gif";
emoji["anime"] = "http://i2.endoftheinter.net/i/n/541fabea23c9dc8628fb550e0ef25f83/anime.png";
emoji["aslol"] = "http://i2.endoftheinter.net/i/n/18a76a5cf62cd6636368777c393bf8eb/aslol.gif";
emoji["awesome"] = "http://i3.endoftheinter.net/i/n/e9bda40db0f2e39d506f2bce9dd51e71/awesome.gif";
emoji["baby"] = "http://i4.endoftheinter.net/i/n/36fc464e5f41033ff6ba4f5582098d73/baby.png";
emoji["backtowork"] = "http://i3.endoftheinter.net/i/n/25975fffdd0efc4e83ec89249f8aa516/backtowork.gif";
emoji["barf"] = "http://i1.endoftheinter.net/i/n/033f89252e492744eed24f2b0252d342/barf.gif";
emoji["boonie"] = "http://i2.endoftheinter.net/i/n/519832879d19315849f2957d16e64da6/boonie.gif";
emoji["bravo"] = "http://i3.endoftheinter.net/i/n/aa4905ea2ddb7a38da88886d7f3d9eab/bravo.gif";
emoji["buddy"] = "http://i2.endoftheinter.net/i/n/5b54727714a0b0a0e58cb389a4cbe344/buddy.gif";
emoji["byodame"] = "http://i2.endoftheinter.net/i/n/9e05b1a3635ce5ac59c2d83175a8843d/byodame.gif";
emoji["byodood"] = "http://i3.endoftheinter.net/i/n/af0bf57031beeb6ef79611ab70fd6007/byodood.gif";
emoji["c00l"] = "http://i2.endoftheinter.net/i/n/db81c06327ebe28c99cb559f99630884/c00l.gif";
emoji["c00lbert"] = "http://i2.endoftheinter.net/i/n/9e05b1a3635ce5ac59c2d83175a8843d/byodame.gif";
emoji["can"] = "http://i1.endoftheinter.net/i/n/8408e63667f09a5a09475bb765430e31/can.gif";
emoji["catstare"] = "http://i3.endoftheinter.net/i/n/2dd819065d1e33d53bcf93d92b2a32ed/catstare.gif";
emoji["chord"] = "http://i4.endoftheinter.net/i/n/f1ee8ebadff766aec1d584a483dfd2d1/chord.gif";
emoji["corsair"] = "http://i3.endoftheinter.net/i/n/69d1dffed6e831abe0ed9607484cd41e/corsair.gif";
emoji["cripes"] = "http://i3.endoftheinter.net/i/n/ac0afc8e5458858bd5d80c18bfb6e955/cripes.gif";
emoji["crow"] = "http://i4.endoftheinter.net/i/n/7af6c4fc4143456072c19dc7fd3ab80c/crow.gif";
emoji["dawkins101"] = "http://i1.endoftheinter.net/i/n/0d2826c324d3146f5508f8c752500bd5/dawkins101.gif";
emoji["devilchild"] = "http://i4.endoftheinter.net/i/n/bcdfdf9fc6258507c29e2188eabab14c/devilchild.gif";
emoji["dogout"] = "http://i2.endoftheinter.net/i/n/1fe538553b86a844086a9758290a784b/dogout.gif";
emoji["douche"] = "http://i4.endoftheinter.net/i/n/f31fcbe107d5fddcfacebd4cea70589f/douche.gif";
emoji["downsbravo"] = "http://i2.endoftheinter.net/i/n/594e93ab43a90f274e527c71163a5ee2/downsbravo.gif";
emoji["downsrim"] = "http://i1.endoftheinter.net/i/n/8cf64a9eb0887f9db882e5a22d62a16a/downsrim.gif";
emoji["dukedog"] = "http://i2.endoftheinter.net/i/n/dc0356eb472852c2837083a7c951e230/dukedog.png";
emoji["faggot"] = "http://i2.endoftheinter.net/i/n/1ddf1c75881c4b78604d6a941d4d4b4d/faggot.gif";
emoji["fella"] = "http://i1.endoftheinter.net/i/n/c2b4ba47619e27be7fcd986dfd234f84/fella.png";
emoji["fiesta"] = "http://i3.endoftheinter.net/i/n/a2a8848a6dcf24aab92a885381d9a216/fiesta.gif";
emoji["forkbomb"] = "http://i4.endoftheinter.net/i/n/7110ab0cee18e2ad073e4190cd2b81f5/forkbomb.gif";
emoji["frog"] = "http://i2.endoftheinter.net/i/n/1c254a6ba634db2113ddcb27c253256d/frog.gif";
emoji["frogbon"] = "http://i3.endoftheinter.net/i/n/a5144d6ad245522e920bcb3f2d682de9/frogbon.gif";
emoji["frogc00l"] = "http://i2.endoftheinter.net/i/n/5f69e3ae886e532e0b031f707438974a/frogc00l.gif";
emoji["froggonk"] = "http://i1.endoftheinter.net/i/n/4a009b502762aa983e2320f5e964259f/froggonk.gif";
emoji["frogsiren"] = "http://i3.endoftheinter.net/i/n/e39a87ca876cc9d83ebd48e0c201b46f/frogsiren.gif";
emoji["fuckoff"] = "http://i4.endoftheinter.net/i/n/b0ca7c774e2074d81595456c15d2cd2e/fuckoff.gif";
emoji["fyadride"] = "http://i1.endoftheinter.net/i/n/0ac098e062133f1cd2b18a69700d63b0/fyadride.gif";
emoji["gbsmith"] = "http://i4.endoftheinter.net/i/n/b3bbcf1059785ccbc736584760b8afd6/gbsmith.gif";
emoji["getin"] = "http://i4.endoftheinter.net/i/n/b94d246fa64684fe2247cc5ffa7cd5e6/getin.gif";
emoji["gifttank"] = "http://i3.endoftheinter.net/i/n/e43f31eef33393091e882bfb970d626d/gifttank.gif";
emoji["goatsecx"] = "http://i2.endoftheinter.net/i/n/dadd4b61d9a9b5a339c02ae7fd2b83d1/goatsecx.gif";
emoji["goonsay"] = "http://i3.endoftheinter.net/i/n/6f1ef72a218680e569c6568fa9616412/goonsay.gif";
emoji["hampants"] = "http://i4.endoftheinter.net/i/n/fb47d21f74507dd3e3cf0c28046b2e9c/hampants.gif";
emoji["iamafag"] = "http://i1.endoftheinter.net/i/n/4dd9baac49013b93006d97394922a96b/iamafag.gif";
emoji["jiggled"] = "http://i2.endoftheinter.net/i/n/1e0c56b445606221a843df1eadc6ab77/jiggled.gif";
emoji["mmmsmug"] = "http://i3.endoftheinter.net/i/n/20cbc88ab09e07f3e46a1d4532c09ea8/mmmsmug.gif";
emoji["mrapig"] = "http://i2.endoftheinter.net/i/n/11cc8422f436a90ca51efc23ffa833cd/mrapig.png";
emoji["mump"] = "http://i3.endoftheinter.net/i/n/62a98fa03ea2c391cc29788245476693/mump.png";
emoji["parrot"] = "http://i2.endoftheinter.net/i/n/98bd6e736df1edb226ade9ff61909062/parrot.gif";
emoji["psyboom"] = "http://i3.endoftheinter.net/i/n/2b404c5cb11890cb58ae8b703132e8b7/psyboom.gif";
emoji["pwm"] = "http://i4.endoftheinter.net/i/n/352555ab18c23a08078eeaa3e030716f/pwm.gif";
emoji["pwn"] = "http://i1.endoftheinter.net/i/n/46fea459d38ac02b9c0e670094d57a7b/pwn.gif";
emoji["qq"] = "http://i4.endoftheinter.net/i/n/f053caf0b670b357b1caff581670c028/qq.gif";
emoji["qqsay"] = "http://i1.endoftheinter.net/i/n/c3311c0cf5100abc82799328c1ee1c92/qqsay.gif";
emoji["razz"] = "http://i1.endoftheinter.net/i/n/09b16e1bbcde3139bd9db665e165ecd5/razz.gif";
emoji["reddit"] = "http://i3.endoftheinter.net/i/n/67255fb07b77ae58d87659b5ffb80c8e/reddit.gif";
emoji["regd09"] = "http://i3.endoftheinter.net/i/n/634caebe9b1d43d86fcf26da1fb85ff8/regd09.gif";
emoji["regd11"] = "http://i2.endoftheinter.net/i/n/15876f85f00f031567c22d430b246d0c/regd11.gif";
emoji["rodimus"] = "http://i4.endoftheinter.net/i/n/7c8cada746fa3430b2f465dad96678b8/rodimus.gif";
emoji["rubshands"] = "http://i3.endoftheinter.net/i/n/add74d421ff64ef59ad5d7259a591515/rubshands.gif";
emoji["shivdurf"] = "http://i4.endoftheinter.net/i/n/31bebded52259d9ed99618264184b2c7/shivdurf.gif";
emoji["smith"] = "http://i2.endoftheinter.net/i/n/51fbf5b4d81b65d8bf1e1c6a81bb6793/smith.gif";
emoji["smithfrog"] = "http://i2.endoftheinter.net/i/n/91ad8377438bf9a1479aaba740a94ee8/smithfrog.png";
emoji["smithicide"] = "http://i3.endoftheinter.net/i/n/e1a9b3d5f4e66fa47e023df514441e4a/smithicide.gif";
emoji["smithmouth"] = "http://i1.endoftheinter.net/i/n/c2a899427207299101026d9ef741c641/smithmouth.gif";
emoji["smug"] = "http://i1.endoftheinter.net/i/n/0b838c7c1660cf5ebae31e7dd5980cce/smug.gif";
emoji["smugbert"] = "http://i3.endoftheinter.net/i/n/2f81482768c2f1b1f60e98368a685d31/smugbert.gif";
emoji["smugdog"] = "http://i1.endoftheinter.net/i/n/45a1ad20afe439795201a34e6e05c9e8/smugdog.gif";
emoji["smugissar"] = "http://i3.endoftheinter.net/i/n/6ee899c5f2475033ae328a774d2b87ab/smugissar.gif";
emoji["smugspike"] = "http://i4.endoftheinter.net/i/n/f36a20ab1bcf48f4e16807d0608c4fdb/smugspike.png";
emoji["staredog"] = "http://i3.endoftheinter.net/i/n/2a9d9606bb37a61bd10858388079de3f/staredog.gif";
emoji["stoat"] = "http://i2.endoftheinter.net/i/n/957ead1a4fe70ecc774c4b8610c8794e/stoat.gif";
emoji["suspense"] = "http://i3.endoftheinter.net/i/n/a378705ea2fa70e2ae43292ed8bb2444/suspense.gif";
emoji["sweep"] = "http://i3.endoftheinter.net/i/n/26c4a6504eeb10e8bae1607d46d6db30/sweep.gif";
emoji["synthy"] = "http://i1.endoftheinter.net/i/n/82a9f8d03e903e3d55cd445dc77c8051/synthy.gif";
emoji["thejoke"] = "http://i2.endoftheinter.net/i/n/941ea282f2423c7990efe6d1927eb531/thejoke.png";
emoji["thumbsup"] = "http://i2.endoftheinter.net/i/n/dbb9d358e44707d2dfbcef721101cc20/thumbsup.gif";
emoji["ughh"] = "http://i1.endoftheinter.net/i/n/cf0470ba777b77a26f1a8a6692bc0941/ughh.gif";
emoji["unsmigghh"] = "http://i3.endoftheinter.net/i/n/611fafede90ecdbffd0ccea9885a1db0/unsmigghh.gif";
emoji["unsmith"] = "http://i4.endoftheinter.net/i/n/f7966d7c1dd288a1edc249360ef26195/unsmith.gif";
emoji["wotwot"] = "http://i3.endoftheinter.net/i/n/e0e21da7408fd58ec6a73ec5b7367847/wotwot.gif";
emoji["911"] = "http://i2.endoftheinter.net/i/n/5d4b23cfdd8699a2722c2e57c446b75f/911.gif";
emoji["anarchists"] = "http://i4.endoftheinter.net/i/n/797a20b413034ef5b303bb90e63b3fe0/anarchists.gif";
emoji["ancap"] = "http://i3.endoftheinter.net/i/n/2b9a607a93df02794990e57c482e114e/ancap.gif";
emoji["australia"] = "http://i3.endoftheinter.net/i/n/aca8b214d96049968678f94ee039a688/australia.gif";
emoji["beck"] = "http://i2.endoftheinter.net/i/n/9fddc6edca5ec24f2b83759dbc290a68/beck.gif";
emoji["belarus"] = "http://i3.endoftheinter.net/i/n/69b785676038be6b803e9f5f1d59f0bf/belarus.gif";
emoji["britain"] = "http://i3.endoftheinter.net/i/n/e8ecf298cc4aaa93f969232460b68c1a/britain.gif";
emoji["ca"] = "http://i4.endoftheinter.net/i/n/73efc24d100035a6ea1bf5448fbfa23e/ca.gif";
emoji["canada"] = "http://i1.endoftheinter.net/i/n/49865f62db0567fb145d375ff574610b/canada.gif";
emoji["cheat"] = "http://i2.endoftheinter.net/i/n/932e4710cbbd4296b57b8e1608c580ef/cheat.gif";
emoji["china"] = "http://i1.endoftheinter.net/i/n/c051a9c0c11d3556d273551a2adde388/china.gif";
emoji["denmark"] = "http://i4.endoftheinter.net/i/n/fdc9bf0dc1d4b16b6d685640280078d4/denmark.gif";
emoji["ese"] = "http://i4.endoftheinter.net/i/n/3d47ddc01d200ec1cd670432cd951d72/ese.gif";
emoji["eurovision"] = "http://i2.endoftheinter.net/i/n/5c60bcd3b4f1a21491194c621ca06ab3/eurovision.png";
emoji["france"] = "http://i3.endoftheinter.net/i/n/2e456b1d164429342bb79acb6854385a/france.gif";
emoji["fsmug"] = "http://i1.endoftheinter.net/i/n/c8246dcdcae18b78e924e3b0abf50efd/fsmug.gif";
emoji["geert"] = "http://i3.endoftheinter.net/i/n/2f7cdc32992e0ab4b5c4b8ea581a749d/geert.gif";
emoji["godwinning"] = "http://i2.endoftheinter.net/i/n/1a9e2e643913d9196551c7a4fa000e72/godwinning.gif";
emoji["helladid"] = "http://i2.endoftheinter.net/i/n/14ef02767ccdfbf26961b4968ddc8d20/helladid.gif";
emoji["hitler"] = "http://i2.endoftheinter.net/i/n/5d3f3ad5e02db95545e86d44b409d53c/hitler.gif";
emoji["italy"] = "http://i2.endoftheinter.net/i/n/d9615a27491313effd602fc20da0f755/italy.gif";
emoji["japan"] = "http://i3.endoftheinter.net/i/n/2532002ca366e67f260ca35502b85e43/japan.gif";
emoji["mexico"] = "http://i1.endoftheinter.net/i/n/c884be18ff1f99b82a851257aaa47a3b/mexico.gif";
emoji["norway"] = "http://i1.endoftheinter.net/i/n/09fc32f6d8d0ce979858dcd9a9ab4961/norway.gif";
emoji["patriot"] = "http://i1.endoftheinter.net/i/n/07476ec48e5e2c176b57f57320bf1bd7/patriot.gif";
emoji["poland"] = "http://i3.endoftheinter.net/i/n/68047ea31a9c0b3f9df3e30a482b73d9/poland.gif";
emoji["quebec"] = "http://i3.endoftheinter.net/i/n/61dd5b75e27866aacc597d644ec6f10d/quebec.gif";
emoji["scotland"] = "http://i1.endoftheinter.net/i/n/0fa4964425e0ea29a03205598f6e86ef/scotland.gif";
emoji["spain"] = "http://i1.endoftheinter.net/i/n/c18a73df0eb478c9cb22ec168fad075d/spain.gif";
emoji["sweden"] = "http://i4.endoftheinter.net/i/n/77cd57b81598514c4f573b6f47817280/sweden.gif";
emoji["tf"] = "http://i4.endoftheinter.net/i/n/37b7eb38fe03627c1ef67d06f6f14486/tf.gif";
emoji["tito"] = "http://i2.endoftheinter.net/i/n/998b0f0d15493da3936b16e7e4286752/tito.gif";
emoji["ussr"] = "http://i2.endoftheinter.net/i/n/d318dd419a52f79e76e109c80bb50304/ussr.gif";
emoji["vuvu"] = "http://i1.endoftheinter.net/i/n/46b0528dae336fd3b1e6130ee25688ea/vuvu.gif";
emoji["woz"] = "http://i2.endoftheinter.net/i/n/980e82f15b8ee114acb0d4396e8d60f9/woz.gif";
emoji["zpatriot"] = "http://i3.endoftheinter.net/i/n/a1d004f0210b8c572d5b26915b9de412/zpatriot.gif";
emoji["asoiaf"] = "http://i3.endoftheinter.net/i/n/e5d9efb3d4aaa9ab4b475f814cf83527/asoiaf.gif";
emoji["axe"] = "http://i3.endoftheinter.net/i/n/e96627dd8238d7e068f5c168a0c1f945/axe.gif";
emoji["bsg"] = "http://i3.endoftheinter.net/i/n/2a16d9c02c443cbd5aecd9b770b860b5/bsg.gif";
emoji["bubblewoop"] = "http://i4.endoftheinter.net/i/n/f7a5d1affb17842b84a0aaa6c15b5912/bubblewoop.gif";
emoji["c"] = "http://i3.endoftheinter.net/i/n/276785ef449c945bc9338e4a05556654/c.png";
emoji["d"] = "http://i3.endoftheinter.net/i/n/666f53e814413e11a0afa76f17a415f4/d.png";
emoji["doink"] = "http://i4.endoftheinter.net/i/n/ffb02f4269b208742bc5e0406b0a81d7/doink.gif";
emoji["doom"] = "http://i3.endoftheinter.net/i/n/24b7924ee92ade9e884be8a194131034/doom.gif";
emoji["dota101"] = "http://i1.endoftheinter.net/i/n/82e8c3170ce6ab6274ba45619feb4724/dota101.gif";
emoji["flashfact"] = "http://i4.endoftheinter.net/i/n/b378cf42982cb7a173aacef8a571eeeb/flashfact.gif";
emoji["flashfap"] = "http://i1.endoftheinter.net/i/n/c10b114c47a9d119a3f7170578d39913/flashfap.gif";
emoji["foxnews"] = "http://i4.endoftheinter.net/i/n/b168f853f1a2c9d936d877800efe534a/foxnews.gif";
emoji["fry"] = "http://i2.endoftheinter.net/i/n/1355604fd5514d7e0f2bbcbf0cb29de4/fry.gif";
emoji["gaben"] = "http://i2.endoftheinter.net/i/n/5d434088735fe42e9a92d6f32155164e/gaben.gif";
emoji["golgo"] = "http://i2.endoftheinter.net/i/n/df2b9747065f674066954278b500b6cd/golgo.gif";
emoji["h"] = "http://i2.endoftheinter.net/i/n/994b0c7abce32123baf61dd2fbc732e6/h.png";
emoji["itjb"] = "http://i3.endoftheinter.net/i/n/6739bf184e4f2f30d3e66ab33239974a/itjb.gif";
emoji["jp"] = "http://i2.endoftheinter.net/i/n/dd53b78f74a9d71b195f09f93d3c040c/jp.gif";
emoji["kakashi"] = "http://i1.endoftheinter.net/i/n/03a89bbee4d59eed239646e40d591ec9/kakashi.gif";
emoji["kratos"] = "http://i4.endoftheinter.net/i/n/744002555de4b9048db70188713708b6/kratos.gif";
emoji["laugh"] = "http://i1.endoftheinter.net/i/n/421ae41923da485cf4c087ac26012438/laugh.gif";
emoji["legion"] = "http://i4.endoftheinter.net/i/n/74dc44d8a6f26768b1f26fc0d4cada28/legion.gif";
emoji["liara"] = "http://i1.endoftheinter.net/i/n/0d49ab9f2844f800431f6e37bd695001/liara.gif";
emoji["lost"] = "http://i2.endoftheinter.net/i/n/9073e9af328a103626a8a35ef5ad1da2/lost.gif";
emoji["lovewcc"] = "http://i4.endoftheinter.net/i/n/3412b84292a42378f83b468d506e3847/lovewcc.gif";
emoji["lron"] = "http://i1.endoftheinter.net/i/n/0ba08077766cf9afd40f41271e3c14c2/lron.gif";
emoji["mario"] = "http://i2.endoftheinter.net/i/n/9981ae732522bb7be068532346b5fa06/mario.gif";
emoji["mcnabb"] = "http://i2.endoftheinter.net/i/n/51084ef23f2f3ecc28b0d820b8ddbd6c/mcnabb.png";
emoji["megaman"] = "http://i1.endoftheinter.net/i/n/c5284fa216c8c5f0438270a35aef431b/megaman.gif";
emoji["nixon"] = "http://i2.endoftheinter.net/i/n/df0351dff22cbe9ec9f9a02d0f9ce284/nixon.gif";
emoji["nolan"] = "http://i3.endoftheinter.net/i/n/6acaa95cee8dd12c2ecd0caec963f1b1/nolan.gif";
emoji["nyan"] = "http://i4.endoftheinter.net/i/n/b3256d49dda5623d2f887281ea20b0ec/nyan.gif";
emoji["orks"] = "http://i3.endoftheinter.net/i/n/abd86e331700e80522567ce36d29504a/orks.gif";
emoji["pcgaming1"] = "http://i1.endoftheinter.net/i/n/0e12f51d8f56ff5a1f73c5bfd6986379/pcgaming1.gif";
emoji["pcgaming"] = "http://i2.endoftheinter.net/i/n/9f6fdcad23b1f75552a40ddae7d493bf/pcgaming.gif";
emoji["psydwarf"] = "http://i2.endoftheinter.net/i/n/9b025f36d98e3988cdfe59e37f2f6dd8/psydwarf.png";
emoji["punto"] = "http://i3.endoftheinter.net/i/n/e22cae2b4e2240f1549072fb03b6bb4f/punto.gif";
emoji["qfg"] = "http://i1.endoftheinter.net/i/n/c982e358fe24d9182d69aefd607b0915/qfg.gif";
emoji["quagmire"] = "http://i1.endoftheinter.net/i/n/8258ebbc9a3eb62f503f5a8c5ee65bce/quagmire.gif";
emoji["ramsay"] = "http://i4.endoftheinter.net/i/n/f2cd9ecb7421609c057e77eec612a283/ramsay.gif";
emoji["retrogames"] = "http://i4.endoftheinter.net/i/n/f53cd6cf6dbff31151c5e286f81e8c1f/retrogames.gif";
emoji["riot"] = "http://i4.endoftheinter.net/i/n/77a92512c7cd13beb4ffdc043ca75f2b/riot.gif";
emoji["rolldice"] = "http://i1.endoftheinter.net/i/n/c95612479432369a86017492b6a4a4e0/rolldice.gif";
emoji["s"] = "http://i3.endoftheinter.net/i/n/a5656144a7117d79a2598d1f60d76461/s.png";
emoji["sg"] = "http://i4.endoftheinter.net/i/n/710b99bce5010f013b8c0096c5c56f5d/sg.gif";
emoji["shepface"] = "http://i3.endoftheinter.net/i/n/6fe67a731bd7fb46983d05c208954e39/shepface.gif";
emoji["shepicide"] = "http://i3.endoftheinter.net/i/n/a35f829d9608656d032b97e2207f81f7/shepicide.gif";
emoji["smaug"] = "http://i4.endoftheinter.net/i/n/baba492d631652cd42bc51c965ff331f/smaug.gif";
emoji["spidey"] = "http://i4.endoftheinter.net/i/n/f068f8f6db8477fdd3732d22a8c5d20b/spidey.gif";
emoji["stat"] = "http://i1.endoftheinter.net/i/n/cf941d0281503251ff8d0f2ff8f49c46/stat.gif";
emoji["steam"] = "http://i1.endoftheinter.net/i/n/88df0e4345d134c8f59c7bc842fa8bfc/steam.gif";
emoji["tali"] = "http://i2.endoftheinter.net/i/n/d969b3b127d50fc4ddf21df9e1e05e0b/tali.gif";
emoji["todd"] = "http://i3.endoftheinter.net/i/n/2c9c6b694a76f5b506f4d0e17fe144c6/todd.gif";
emoji["turianass"] = "http://i3.endoftheinter.net/i/n/2b9735a34dbbb7c7ff319bb72dd63a26/turianass.gif";
emoji["tviv"] = "http://i1.endoftheinter.net/i/n/45fc5d823147daa9af226a266fa43e62/tviv.gif";
emoji["tvtropes"] = "http://i3.endoftheinter.net/i/n/62e6340feccd558f80ef01c266a92c93/tvtropes.gif";
emoji["twentyfour"] = "http://i4.endoftheinter.net/i/n/f01b4825beb84df0f3b1c2cd973b1e27/twentyfour.gif";
emoji["wal"] = "http://i2.endoftheinter.net/i/n/98819771138fa3f8215a05532bb7e5b2/wal.gif";
emoji["wcc"] = "http://i3.endoftheinter.net/i/n/2bd0e9efa627cf8087e3ac17de93602e/wcc.gif";
emoji["wcw"] = "http://i2.endoftheinter.net/i/n/18c4058baa7a9f58648dcd479ef1a366/wcw.gif";
emoji["wookie"] = "http://i4.endoftheinter.net/i/n/fcf732e1c4759734b09cf3834f49e9a8/wookie.gif";
emoji["xcom"] = "http://i4.endoftheinter.net/i/n/75506a96f3ee0e73998785697e6fb3bc/xcom.gif";
emoji["yoshi"] = "http://i3.endoftheinter.net/i/n/29507c04f6a252e097ae3ca8595aa1da/yoshi.gif";
emoji["zaeed"] = "http://i4.endoftheinter.net/i/n/f9e7b1b11e7eabeb6a93e173b558fcf7/zaeed.gif";
emoji["zoid"] = "http://i3.endoftheinter.net/i/n/239b517888a27ba01df93de1799c3669/zoid.gif";
emoji["11tea"] = "http://i4.endoftheinter.net/i/n/7268aefd55e4f949dac2c1cf88cdb54b/11tea.gif";
emoji["a2m"] = "http://i1.endoftheinter.net/i/n/0221abd9ab977fec031ce6a39026e490/a2m.gif";
emoji["am"] = "http://i2.endoftheinter.net/i/n/915977b1e6882dbf5362c0b6de345343/am.gif";
emoji["awesomelon"] = "http://i1.endoftheinter.net/i/n/44870393d7926c73c7b874d160082bcf/awesomelon.gif";
emoji["bahgawd"] = "http://i4.endoftheinter.net/i/n/f18907a2938710e9a7371c29ff742658/bahgawd.gif";
emoji["bandwagon"] = "http://i3.endoftheinter.net/i/n/69e3bb62deffb775b7c85595e4b194d9/bandwagon.gif";
emoji["bick"] = "http://i3.endoftheinter.net/i/n/e146fd0e757385c2cbac4983558315de/bick.gif";
emoji["bigtran"] = "http://i1.endoftheinter.net/i/n/8299bc4c736efecdeca92bdcd39ba410/bigtran.gif";
emoji["biotruths"] = "http://i2.endoftheinter.net/i/n/91168acc38d889c66a781f08fdfa8b26/biotruths.gif";
emoji["btroll"] = "http://i2.endoftheinter.net/i/n/554b5b6d99f2e93554daecbfab70bfb0/btroll.gif";
emoji["burger"] = "http://i2.endoftheinter.net/i/n/9ab2cd5ce3eec54aeba61fc5da5dace7/burger.gif";
emoji["bustem"] = "http://i4.endoftheinter.net/i/n/f559762067d4402cf28a76f86d59767d/bustem.png";
emoji["byobear"] = "http://i1.endoftheinter.net/i/n/44ed5ef3440c06fef38466e479753b42/byobear.gif";
emoji["c00lbutt"] = "http://i1.endoftheinter.net/i/n/c57d0a01600a181013a8b8e1dacbff49/c00lbutt.gif";
emoji["camera6"] = "http://i2.endoftheinter.net/i/n/11aa40bc3c50d75f7d43a745719106bd/camera6.gif";
emoji["ccb"] = "http://i4.endoftheinter.net/i/n/bb75060b79aa0d7f746f6754c394fc46/ccb.gif";
emoji["cedric"] = "http://i2.endoftheinter.net/i/n/dc914ca3e0cc238538729e44d9c5894a/cedric.png";
emoji["cenobite"] = "http://i3.endoftheinter.net/i/n/245c8ca4951a1da46e0ecd7c0b0f912e/cenobite.gif";
emoji["chiefsay"] = "http://i1.endoftheinter.net/i/n/82d72daf72f7a434718fb2796f2d5a20/chiefsay.gif";
emoji["chiyo"] = "http://i3.endoftheinter.net/i/n/a15f043a68af11c6186daec95ca0af2c/chiyo.gif";
emoji["circlefap"] = "http://i4.endoftheinter.net/i/n/7f2750a2e7d10c06e684272a5296b7ba/circlefap.gif";
emoji["coal"] = "http://i3.endoftheinter.net/i/n/a872882e3495149b3d427f0cdc5d7c10/coal.gif";
emoji["confuoot"] = "http://i3.endoftheinter.net/i/n/64365cf4e45cb8580e2e0e7b0412d2b9/confuoot.gif";
emoji["coolfish"] = "http://i1.endoftheinter.net/i/n/0c217067981b8467652d4ea71a7f3f9b/coolfish.gif";
emoji["derp"] = "http://i3.endoftheinter.net/i/n/e705cc69e562e433ffd8c9f60e54f542/derp.gif";
emoji["derptiel"] = "http://i1.endoftheinter.net/i/n/4f1fa253a4d23cf26405c210ee12ae32/derptiel.gif";
emoji["dong"] = "http://i1.endoftheinter.net/i/n/c6b8a13abdf555e5064199dac83c9001/dong.gif";
emoji["drum"] = "http://i2.endoftheinter.net/i/n/da9ee2e1dafaad382fb224dab3bfb7da/drum.gif";
emoji["ducksiren"] = "http://i1.endoftheinter.net/i/n/493e4437c47232c41f3c8068cd418bcd/ducksiren.gif";
emoji["edi"] = "http://i3.endoftheinter.net/i/n/2beda8656407aa8876f5ea0adf1912e8/edi.gif";
emoji["emoticon"] = "http://i4.endoftheinter.net/i/n/b0520a344710ff92c49a831ce282e7ab/emoticon.gif";
emoji["evil"] = "http://i3.endoftheinter.net/i/n/2789ea0565e1acee7900f3b230334397/evil.gif";
emoji["fireman"] = "http://i2.endoftheinter.net/i/n/df8aa52b5e7f137a48272a38c009d986/fireman.gif";
emoji["flaccid"] = "http://i3.endoftheinter.net/i/n/e19e3392f9b16e8426633d75742b1dbd/flaccid.gif";
emoji["flag"] = "http://i1.endoftheinter.net/i/n/84364818fb56ccfe85e7925a9445bf11/flag.gif";
emoji["fork"] = "http://i3.endoftheinter.net/i/n/2c8ff9a265d125a2cb5e996313fce57c/fork.png";
emoji["frogdowns"] = "http://i2.endoftheinter.net/i/n/dd323cf6078f5930e3f39554d33249d7/frogdowns.png";
emoji["fsn"] = "http://i1.endoftheinter.net/i/n/8fb1c2beede22b004be578b1214c16a7/fsn.gif";
emoji["furcry"] = "http://i3.endoftheinter.net/i/n/205abef1f4ef059d1bdbcf4e84b3ca37/furcry.gif";
emoji["fut"] = "http://i3.endoftheinter.net/i/n/29722248733b0b681e734e5fb48b8d03/fut.gif";
emoji["FYH"] = "http://i1.endoftheinter.net/i/n/85a8bde8d16bce6aee24207291a7542a/FYH.gif";
emoji["george"] = "http://i3.endoftheinter.net/i/n/e4345070e11ba544059daee176e36bbc/george.gif";
emoji["gizz"] = "http://i2.endoftheinter.net/i/n/560490ba62fae16b5f14f787b6390ee9/gizz.gif";
emoji["goleft"] = "http://i3.endoftheinter.net/i/n/20579bfdda91b7532683dd176944fde4/goleft.gif";
emoji["gonchar"] = "http://i3.endoftheinter.net/i/n/e43fa860d6f28a033de089798e397389/gonchar.gif";
emoji["google"] = "http://i4.endoftheinter.net/i/n/ffc39c91b4d2945fc35785d8ea602bb0/google.gif";
emoji["goon"] = "http://i4.endoftheinter.net/i/n/f27d1cf4ca91482d56956f27338fc603/goon.gif";
emoji["goonboot"] = "http://i3.endoftheinter.net/i/n/21dbe58285d9ded40bfc6138426bd2ef/goonboot.gif";
emoji["gooncamp"] = "http://i1.endoftheinter.net/i/n/481eb29ae7ff6241b399ebc5fe03c715/gooncamp.gif";
emoji["gtfoycs"] = "http://i3.endoftheinter.net/i/n/e758b1fa988a00739dbe70ab86c79043/gtfoycs.gif";
emoji["guitar"] = "http://i2.endoftheinter.net/i/n/da45ddae51aeb546f9869301013eec66/guitar.gif";
emoji["gurf"] = "http://i1.endoftheinter.net/i/n/477a845931db2047c97552dd4c6a51ac/gurf.gif";
emoji["happyelf"] = "http://i2.endoftheinter.net/i/n/1b86d3b28067c8b13a56354adf0ff90b/happyelf.gif";
emoji["havlat"] = "http://i2.endoftheinter.net/i/n/d683b554b0f65dae1bc9d9fd2df720fb/havlat.gif";
emoji["hb"] = "http://i4.endoftheinter.net/i/n/bd91e81b14644bc8640006b745e10255/hb.gif";
emoji["hchatter"] = "http://i3.endoftheinter.net/i/n/e2906b0a473641b853cd0a489e3d3014/hchatter.gif";
emoji["hellyeah"] = "http://i2.endoftheinter.net/i/n/50df2626733db2945a5d28acb4bd3f47/hellyeah.gif";
emoji["holymoley"] = "http://i3.endoftheinter.net/i/n/adf6acb41f0ebb0779be6f2bae7f5d7d/holymoley.gif";
emoji["horse"] = "http://i2.endoftheinter.net/i/n/5f7c90e3c9181c50f19fbb0ed9bb6077/horse.gif";
emoji["hr"] = "http://i3.endoftheinter.net/i/n/eebd7811e59a0e773762687db7d2feee/hr.gif";
emoji["iiaca"] = "http://i3.endoftheinter.net/i/n/69006a3d37b2b1fb7dacb9a3712577a3/iiaca.gif";
emoji["ironicat"] = "http://i2.endoftheinter.net/i/n/d7fa07e16f98f2d1a67df75d168e9e1e/ironicat.gif";
emoji["irony"] = "http://i2.endoftheinter.net/i/n/149d23fe2b5fea5de21b4e5ba53dbf76/irony.gif";
emoji["iw"] = "http://i4.endoftheinter.net/i/n/73057f225c4005caa7d5ba61ea567f64/iw.gif";
emoji["jeb"] = "http://i1.endoftheinter.net/i/n/c979203bc8a441d8da8711ef7a316d0c/jeb.gif";
emoji["joel"] = "http://i1.endoftheinter.net/i/n/cc4749c03091cb26107a6b15a9277f2c/joel.gif";
emoji["kamina"] = "http://i1.endoftheinter.net/i/n/cc4749c03091cb26107a6b15a9277f2c/joel.gif";
emoji["kiddo"] = "http://i1.endoftheinter.net/i/n/4f705220608721e42c6cfc41bd00fb2b/kiddo.gif";
emoji["killdozer"] = "http://i3.endoftheinter.net/i/n/6f855d3e21e21dcfce3847bfdc762b3a/killdozer.gif";
emoji["krad"] = "http://i3.endoftheinter.net/i/n/2a3d4f598f924b8d5fcfc0d779b496f3/krad.gif";
emoji["krakken"] = "http://i4.endoftheinter.net/i/n/b20f684185ba6aa6118ce82ee95daf9e/krakken.gif";
emoji["love"] = "http://i2.endoftheinter.net/i/n/50e174af5d07c1e1b96bbc034e7d5244/love.gif";
emoji["madmax"] = "http://i4.endoftheinter.net/i/n/bdcaae5a820eec99e7d62a34ff9767c8/madmax.gif";
emoji["manning"] = "http://i1.endoftheinter.net/i/n/05cac2ccb4c45f69df3835d975c6412c/manning.gif";
emoji["mason"] = "http://i2.endoftheinter.net/i/n/181fcfc5712e8e031ce28416ebc17a18/mason.gif";
emoji["milk"] = "http://i4.endoftheinter.net/i/n/77e3858d725890028b8261124d05e9be/milk.gif";
emoji["monar"] = "http://i3.endoftheinter.net/i/n/6c54cf9855045c07d3b0bd7a90550a32/monar.gif";
emoji["moustache"] = "http://i3.endoftheinter.net/i/n/2ae057b94e178efbf08be29bd3518768/moustache.gif";
emoji["mufasa"] = "http://i2.endoftheinter.net/i/n/568d500b56b7584d45929868ec3b20a1/mufasa.png";
emoji["negative"] = "http://i2.endoftheinter.net/i/n/5d8f7393212f0942058644583caef368/negative.png";
emoji["notfunny"] = "http://i2.endoftheinter.net/i/n/190fb8377a6162e5a8ee4f824594ba0d/notfunny.gif";
emoji["nyoron"] = "http://i3.endoftheinter.net/i/n/270d516a9cd3b3a0ff4dcb1bf79f67e0/nyoron.gif";
emoji["objection"] = "http://i4.endoftheinter.net/i/n/f5ef4a86ada5125b6bd1943f8c0df0fe/objection.gif";
emoji["ovr"] = "http://i3.endoftheinter.net/i/n/6eefd673146de825ff08c096e862086c/ovr.gif";
emoji["page3"] = "http://i3.endoftheinter.net/i/n/6eefd673146de825ff08c096e862086c/ovr.gif";
emoji["phone"] = "http://i2.endoftheinter.net/i/n/dd206c84a5e58459bf8181d57fe35f6d/phone.gif";
emoji["phoneb"] = "http://i2.endoftheinter.net/i/n/54252288a012f8b8c733cdbcb8cc3cf3/phoneb.gif";
emoji["phoneline"] = "http://i4.endoftheinter.net/i/n/3c0126599dd9f208f01e5e4c5d2c228f/phoneline.gif";
emoji["pipe"] = "http://i4.endoftheinter.net/i/n/f257fbad9139eefa348191d1c40f02a4/pipe.gif";
emoji["pluto"] = "http://i4.endoftheinter.net/i/n/f90fa0aeca708309e973792226837a39/pluto.gif";
emoji["pranke"] = "http://i2.endoftheinter.net/i/n/52d38e02c57fbc5018e7ddb03c0283f9/pranke.gif";
emoji["psyberger"] = "http://i3.endoftheinter.net/i/n/aa200c4f8e36043fc3964b3aaf6bad56/psyberger.gif";
emoji["psyduck"] = "http://i4.endoftheinter.net/i/n/3c9a9c9ccbe3d441d33764f45ad8d7fc/psyduck.gif";
emoji["psylon"] = "http://i1.endoftheinter.net/i/n/c9851d648f16bb8be8b1159c24c189fb/psylon.gif";
emoji["psypop"] = "http://i4.endoftheinter.net/i/n/b8e6d748d6d64335be71ac8fabe63cfb/psypop.gif";
emoji["pt"] = "http://i3.endoftheinter.net/i/n/a0a9ee75629d52efca19bd50b31cfd23/pt.gif";
emoji["q"] = "http://i1.endoftheinter.net/i/n/c3740cd2cf430b3b8a0f67a2bd129247/q.gif";
emoji["qirex"] = "http://i2.endoftheinter.net/i/n/1b4d9908fdf67f4f5f0c300ba318b231/qirex.gif";
emoji["ranbowdash"] = "http://i1.endoftheinter.net/i/n/420dd71293a7880271450ee395cabad3/ranbowdash.png";
emoji["redhammer"] = "http://i2.endoftheinter.net/i/n/5154a7baf93e5b94323ea841cf58da6a/redhammer.gif";
emoji["rice"] = "http://i1.endoftheinter.net/i/n/8157b75de862c5e67e3af33512e6aa2e/rice.gif";
emoji["riker"] = "http://i1.endoftheinter.net/i/n/82315497b99928e3c0089aa29408d1bb/riker.gif";
emoji["rudebox"] = "http://i1.endoftheinter.net/i/n/c767764f684fe41b217989e2eaaf8578/rudebox.gif";
emoji["russbus"] = "http://i1.endoftheinter.net/i/n/8c058167704cc890e5fdf3793f238e4c/russbus.gif";
emoji["sax"] = "http://i2.endoftheinter.net/i/n/1c539a4686fb16ce10581dd86eadcb4c/sax.gif";
emoji["sharpton"] = "http://i1.endoftheinter.net/i/n/49d79db39231a08c9c780bade9c40255/sharpton.gif";
emoji["shibaz"] = "http://i2.endoftheinter.net/i/n/1232bfe01cd2861281ba18fffff49de7/shibaz.png";
emoji["shopkeeper"] = "http://i1.endoftheinter.net/i/n/c915c229bfa9aa8747423dcfe0f88cfd/shopkeeper.gif";
emoji["signings"] = "http://i1.endoftheinter.net/i/n/8844bc79a3067b8a42c4b75d9998448b/signings.gif";
emoji["sissies"] = "http://i2.endoftheinter.net/i/n/521a8949cbe57512093f1765ac42bcc7/sissies.gif";
emoji["slick"] = "http://i1.endoftheinter.net/i/n/0725f42a45dd367ebb76319b453f091d/slick.gif";
emoji["smugbird"] = "http://i4.endoftheinter.net/i/n/f2c26c514217ae6bbea4dd9cce06e307/smugbird.gif";
emoji["smugdroid"] = "http://i4.endoftheinter.net/i/n/b6abffb2718e6363bc0aa8a61a7bd1b3/smugdroid.png";
emoji["smugndar"] = "http://i1.endoftheinter.net/i/n/4b493738b8b678e985ec0c3ad73002fb/smugndar.gif";
emoji["smugteddie"] = "http://i4.endoftheinter.net/i/n/fbf4c4d17c98a248e7d9154042ec3fd3/smugteddie.gif";
emoji["snoop"] = "http://i4.endoftheinter.net/i/n/354a6a8cd9b02f09772f48c98c159cd4/snoop.gif";
emoji["solanadumb"] = "http://i4.endoftheinter.net/i/n/f105e156287de34d2685693e552fbd02/solanadumb.png";
emoji["sonia"] = "http://i1.endoftheinter.net/i/n/cc94a3995da6a22183a9a1795c0a76da/sonia.gif";
emoji["sotw"] = "http://i3.endoftheinter.net/i/n/634af6d9a32c9d04f43f3c49da6794a3/sotw.gif";
emoji["spergin"] = "http://i3.endoftheinter.net/i/n/29a07ebda390bd9b89f354075ccccdc6/spergin.png";
emoji["spooky"] = "http://i4.endoftheinter.net/i/n/7d032c99edf4e980762b53bcc4a933bf/spooky.gif";
emoji["stalker"] = "http://i1.endoftheinter.net/i/n/08272f3c8134f317aec025d7d86e93ed/stalker.gif";
emoji["sugartits"] = "http://i1.endoftheinter.net/i/n/0525902f7a0d438f1a0d77eb65037093/sugartits.png";
emoji["synpa"] = "http://i1.endoftheinter.net/i/n/439ebedb4593ecea9799ba88b306b91d/synpa.gif";
emoji["syoon"] = "http://i4.endoftheinter.net/i/n/760d857e2804f9bd52e38e2cd9ee30bb/syoon.gif";
emoji["taco"] = "http://i1.endoftheinter.net/i/n/881923303820d0465171a4d8cecd5ee9/taco.gif";
emoji["tastykake"] = "http://i2.endoftheinter.net/i/n/9e9e74d5fca492652a71d91264d67ff8/tastykake.gif";
emoji["tbear"] = "http://i4.endoftheinter.net/i/n/7c83c359c431b73e708f1010749dca84/tbear.gif";
emoji["techno"] = "http://i3.endoftheinter.net/i/n/60d682a13f6c672891c071dc4d6e8288/techno.gif";
emoji["thurman"] = "http://i2.endoftheinter.net/i/n/54a4168e162ae9b42278476299ab6b7c/thurman.gif";
emoji["toughguy"] = "http://i3.endoftheinter.net/i/n/201a1aec2da6574408229ab8c8585ce3/toughguy.gif";
emoji["toxx"] = "http://i1.endoftheinter.net/i/n/c56431d2b9c8fb4246e0fc99127bee78/toxx.gif";
emoji["troll"] = "http://i2.endoftheinter.net/i/n/1401c920b8d7e8eac035fe69ee7c54f7/troll.png";
emoji["tubular"] = "http://i4.endoftheinter.net/i/n/f5bcab2126d75a66fa5675a5479315c6/tubular.gif";
emoji["uhaul"] = "http://i2.endoftheinter.net/i/n/9d460417b6bf39cde1e93eb64434140e/uhaul.gif";
emoji["vick"] = "http://i1.endoftheinter.net/i/n/03e15d4e22320cc5483aa4bf85b80b5c/vick.gif";
emoji["viconia"] = "http://i1.endoftheinter.net/i/n/02d0bf384f129c62925429b981a3c07f/viconia.gif";
emoji["viggo"] = "http://i1.endoftheinter.net/i/n/0c491b2b2b0c45fc7abd58a7ddceed4c/viggo.gif";
emoji["whatup"] = "http://i3.endoftheinter.net/i/n/ebca91a124cc6725200fe08311c8103b/whatup.gif";
emoji["wink"] = "http://i3.endoftheinter.net/i/n/29d61235c2393e080f87fa32e4454c35/wink.gif";
emoji["wmwink"] = "http://i3.endoftheinter.net/i/n/2c78e363dbfed53d81b96a7d7e7a46d4/wmwink.png";
emoji["wom"] = "http://i1.endoftheinter.net/i/n/cacb00ae48a7c29dfb1a246a4281abcc/wom.gif";
emoji["woof"] = "http://i4.endoftheinter.net/i/n/7b9aa8d38f71ca02385a0f2dab62513d/woof.gif";
emoji["wooper"] = "http://i2.endoftheinter.net/i/n/da0d496240c7d2ce429d850adff88763/wooper.gif";
emoji["xie"] = "http://i2.endoftheinter.net/i/n/926c0e13a81791fcd0069eb8c1d43f2e/xie.gif";
emoji["yosbutt"] = "http://i2.endoftheinter.net/i/n/1cc99114f2eaf94b34279e33389632e6/yosbutt.gif";
emoji["zerg"] = "http://i4.endoftheinter.net/i/n/bf91a2f643aa9e870d07f32f5f07047d/zerg.gif";
emoji["2bong"] = "http://i2.endoftheinter.net/i/n/9a34b5ef5ce119f5cba9c36b2d1ce3f5/2bong.png";
emoji["350"] = "http://i2.endoftheinter.net/i/n/5e8d8aa718bef206af7ef0b17dddc206/350.gif";
emoji["420"] = "http://i1.endoftheinter.net/i/n/029b5cb0ea44121601ca4ca45257a8fd/420.gif";
emoji["catdrugs"] = "http://i1.endoftheinter.net/i/n/8c3554a0cf539be58fad4b1b44519475/catdrugs.gif";
emoji["chillpill"] = "http://i1.endoftheinter.net/i/n/086df7612de1a5e99b159888d0cea60d/chillpill.gif";
emoji["dominic"] = "http://i1.endoftheinter.net/i/n/863166458d7bd6f59901fc925f43ecf5/dominic.gif";
emoji["drugnerd"] = "http://i4.endoftheinter.net/i/n/b2c5f87d2cc326988dc4fa810545e34c/drugnerd.gif";
emoji["lsd"] = "http://i4.endoftheinter.net/i/n/f35a8c54c1283b73519519f512b3b6ba/lsd.gif";
emoji["obama"] = "http://i3.endoftheinter.net/i/n/607addb9dedf48504d061cab0a3967bc/obama.gif";
emoji["okpos"] = "http://i1.endoftheinter.net/i/n/0e42c53891bbd9220e084dea57383299/okpos.gif";
emoji["rory"] = "http://i1.endoftheinter.net/i/n/0765f612437ca33757ea8f3ad0313c59/rory.gif";
emoji["shroom"] = "http://i3.endoftheinter.net/i/n/611bf6dc946c8682ca529554d02670ae/shroom.gif";
emoji["tinsley"] = "http://i1.endoftheinter.net/i/n/405ee5d94fa48c66783ac9dcd8d2b522/tinsley.gif";
emoji["weed"] = "http://i4.endoftheinter.net/i/n/3ce4b43953dbeb71cf61910f52eb1e68/weed.gif";
emoji["agesilaus"] = "http://i4.endoftheinter.net/i/n/7b9a522c12ebc4fb28bba1a8a8a0f81a/agesilaus.png";
emoji["anasta"] = "http://i2.endoftheinter.net/i/n/daa04e1167e9d0e007442565fcf98821/anasta.jpg";
emoji["bape"] = "http://i2.endoftheinter.net/i/n/1f610baff1c76e74e3d5942c3d6b7b53/bape.png";
emoji["bsdsnype"] = "http://i1.endoftheinter.net/i/n/4b87af2e45b238549142aed415ec4765/bsdsnype.gif";
emoji["catbert"] = "http://i1.endoftheinter.net/i/n/8c0e563c77d6dac19e9bb46ed06cba7b/catbert.gif";
emoji["ccp"] = "http://i4.endoftheinter.net/i/n/be81207226a3bf565c21d80cfabb747a/ccp.gif";
emoji["classiclol"] = "http://i1.endoftheinter.net/i/n/c6371105d08e1d2d07c0a6626836ad28/classiclol.gif";
emoji["corrupt"] = "http://i4.endoftheinter.net/i/n/b718e6291db75e7ee6170856adc45ccd/corrupt.gif";
emoji["csgo"] = "http://i1.endoftheinter.net/i/n/0cb3f12426b32ddebcf0021399034be4/csgo.gif";
emoji["cult"] = "http://i2.endoftheinter.net/i/n/5e220b57f3cb2236da7a794191230219/cult.jpg";
emoji["effortless"] = "http://i1.endoftheinter.net/i/n/48276785c3012a1493caacf28d456d31/effortless.gif";
emoji["fedora"] = "http://i4.endoftheinter.net/i/n/717fd21dc796b7ed8f9c434118a57c2c/fedora.png";
emoji["freep"] = "http://i1.endoftheinter.net/i/n/cdbea5c3d74c83bf422d1c477e93620b/freep.gif";
emoji["gas"] = "http://i3.endoftheinter.net/i/n/e3382f8b796a9e7377e03020b05f9ca1/gas.gif";
emoji["gerty"] = "http://i3.endoftheinter.net/i/n/e92284d263baf7bc432f42562098fbd5/gerty.png";
emoji["ghitler"] = "http://i4.endoftheinter.net/i/n/79489546c19ad3bd2a35ce7dcb2652a6/ghitler.png";
emoji["gogtears"] = "http://i2.endoftheinter.net/i/n/11da39d792d4eabf6b50acd35ecca3b9/gogtears.gif";
emoji["gop"] = "http://i3.endoftheinter.net/i/n/68588b4fa034ecc1e087f24b8c3c0790/gop.gif";
emoji["gowron"] = "http://i3.endoftheinter.net/i/n/eeceb71f0374fa7ded66e52c2fe4af43/gowron.gif";
emoji["guinness"] = "http://i2.endoftheinter.net/i/n/531f490fdbb43615697e0c94f2ce9cc6/guinness.gif";
emoji["hawksin"] = "http://i3.endoftheinter.net/i/n/6c522c4f2a39af76eb49d1c094977c6f/hawksin.gif";
emoji["hirez"] = "http://i1.endoftheinter.net/i/n/8ea1bd6cbfd83bc04ee8ba40324458eb/hirez.gif";
emoji["histdowns"] = "http://i1.endoftheinter.net/i/n/002e8ea433ac2def3c9e1246c60a011a/histdowns.gif";
emoji["homebrew"] = "http://i1.endoftheinter.net/i/n/ce7a3d95b6103fe52390a1fbc5b79994/homebrew.gif";
emoji["ins"] = "http://i4.endoftheinter.net/i/n/bb481df52e67aa4c63a8daa8c3bfff8b/ins.gif";
emoji["itwaspoo"] = "http://i4.endoftheinter.net/i/n/7810ac201f141b7082797de115f7007f/itwaspoo.gif";
emoji["jebstare"] = "http://i4.endoftheinter.net/i/n/303e4a1599b7f71e737527dc03dd29c8/jebstare.png";
emoji["kheldragar"] = "http://i1.endoftheinter.net/i/n/c7833d477bb83b83ff54e9c03f661a9a/kheldragar.gif";
emoji["krakentoot"] = "http://i4.endoftheinter.net/i/n/7d19b1047779864e29bf7c87a349281c/krakentoot.gif";
emoji["lumpen"] = "http://i2.endoftheinter.net/i/n/5010414f8a076e10cdaf6a5be89908fa/lumpen.gif";
emoji["lurkmore"] = "http://i2.endoftheinter.net/i/n/9685e29b1360a3ca69add085094d4ddc/lurkmore.gif";
emoji["magical"] = "http://i3.endoftheinter.net/i/n/6755896b238a941c68f9febd1cf109fc/magical.png";
emoji["marc"] = "http://i2.endoftheinter.net/i/n/dc559a2599be1ddf2dbb90b9d14576d5/marc.gif";
emoji["mensch"] = "http://i1.endoftheinter.net/i/n/cef89e3ad921c5cd2eefaa5928700929/mensch.gif";
emoji["mil101"] = "http://i2.endoftheinter.net/i/n/97ee1055ddc3cb6b276fe0070d9cc842/mil101.gif";
emoji["moments"] = "http://i4.endoftheinter.net/i/n/336fd0c8c0f14181f11a40600b1a2b36/moments.gif";
emoji["mrgw2"] = "http://i1.endoftheinter.net/i/n/c618821cc0c8b0290bd5423224f351ad/mrgw2.png";
emoji["mrgw"] = "http://i3.endoftheinter.net/i/n/6652b948329e0cf557d2d1151e5e4d40/mrgw.png";
emoji["newt"] = "http://i2.endoftheinter.net/i/n/5e5d0e3a5512bbface5cd5df13fa8fdc/newt.png";
emoji["nexus"] = "http://i4.endoftheinter.net/i/n/ba143cfe5dd5488db26e3a37a6aca1ae/nexus.png";
emoji["nignog"] = "http://i1.endoftheinter.net/i/n/0d8031c76f86d490fcd76e6ab4577e31/nignog.gif";
emoji["nitecrew"] = "http://i2.endoftheinter.net/i/n/58aeb4f114352d6b04cba16ea6385356/nitecrew.gif";
emoji["notch"] = "http://i4.endoftheinter.net/i/n/f0d8fe422b731f9942d69f88d03d1a18/notch.png";
emoji["nsa"] = "http://i4.endoftheinter.net/i/n/3631788e3ac11af51b43efeb205380c4/nsa.png";
emoji["ocelot"] = "http://i2.endoftheinter.net/i/n/d7df25cff20270104120864b34960e5d/ocelot.gif";
emoji["omarcomin"] = "http://i4.endoftheinter.net/i/n/bc868c1d81cc0e8c46baf0a2e7df7980/omarcomin.gif";
emoji["orks101"] = "http://i4.endoftheinter.net/i/n/70ddeaa6aba6f344e21de1e3a371c80e/orks101.gif";
emoji["ortiz"] = "http://i2.endoftheinter.net/i/n/97a652b210c1350e11b52a5e2abd3022/ortiz.png";
emoji["patssay"] = "http://i1.endoftheinter.net/i/n/8aa4d8433f210902d79e800054e0b090/patssay.gif";
emoji["pgi"] = "http://i1.endoftheinter.net/i/n/4bd2c2af65106e3cec422fc456a3249a/pgi.gif";
emoji["pilot"] = "http://i3.endoftheinter.net/i/n/25b0813a172e978dbcbd6e2f287c09e0/pilot.gif";
emoji["radcat"] = "http://i4.endoftheinter.net/i/n/388824471026be9453493961146a5f7d/radcat.png";
emoji["regd13"] = "http://i2.endoftheinter.net/i/n/59057e38363a023a34de472e731a87b6/regd13.gif";
emoji["rip"] = "http://i4.endoftheinter.net/i/n/7e298efd6e0e5366a7389ffa4fdebd2d/rip.gif";
emoji["rms2"] = "http://i1.endoftheinter.net/i/n/c7ace18037c095b20391c1f8f19187ed/rms2.png";
emoji["romo"] = "http://i1.endoftheinter.net/i/n/889df9bd94fb7a04a64a85cd806736ca/romo.png";
emoji["russo"] = "http://i4.endoftheinter.net/i/n/b79f2d56708e3a82056a54aec46b9bf7/russo.gif";
emoji["sadwave"] = "http://i1.endoftheinter.net/i/n/4f75ee4e90e2bc0a2dd67ddfe4f01042/sadwave.gif";
emoji["shepspends"] = "http://i3.endoftheinter.net/i/n/6f2e1454dcd7d443f9c5cf4e18696642/shepspends.gif";
emoji["shibewow"] = "http://i4.endoftheinter.net/i/n/35eff643e57e75224b97dabcbb0c80ff/shibewow.gif";
emoji["shrek"] = "http://i1.endoftheinter.net/i/n/85f0dccb1067426e4dec7e8cb0ad5ae8/shrek.gif";
emoji["smithcloud"] = "http://i3.endoftheinter.net/i/n/61b3a16acd9bf18ab8be78458e80bc3f/smithcloud.gif";
emoji["smugjones"] = "http://i4.endoftheinter.net/i/n/7dbc9e5577199e97deaf1c2f0f00d095/smugjones.gif";
emoji["smugwizard"] = "http://i3.endoftheinter.net/i/n/200adc135e93f0af1c75ef9b3ab3a6d4/smugwizard.png";
emoji["soe"] = "http://i1.endoftheinter.net/i/n/838f0cf241a06c5571f9216d1c48de61/soe.gif";
emoji["sparkles"] = "http://i1.endoftheinter.net/i/n/c0176541af540a6c24b81e503c997dfd/sparkles.gif";
emoji["sterv"] = "http://i2.endoftheinter.net/i/n/d304e6af8d0017dbd1cd670b52379730/sterv.gif";
emoji["stonkhat"] = "http://i4.endoftheinter.net/i/n/70d85c4b7523aebfa1bace643c5199cf/stonkhat.gif";
emoji["stonklol"] = "http://i1.endoftheinter.net/i/n/40562088df969889b01c8383b46b576c/stonklol.gif";
emoji["temporary"] = "http://i4.endoftheinter.net/i/n/75d444be334af182a4de0faca7a0e750/temporary.gif";
emoji["tfrxmas"] = "http://i2.endoftheinter.net/i/n/523155742a053f10b4fcb0a2ee2c4f4f/tfrxmas.gif";
emoji["thx"] = "http://i3.endoftheinter.net/i/n/2c74eef0bf4de2972918dd09c225cc34/thx.gif";
emoji["tootzzz"] = "http://i3.endoftheinter.net/i/n/a51464c2cdcd340a5159b26d4cb51c3e/tootzzz.png";
emoji["torgue"] = "http://i3.endoftheinter.net/i/n/a912fd7713be08653afc976c468681de/torgue.gif";
emoji["toxogond"] = "http://i4.endoftheinter.net/i/n/32abce307b94bdb51627d7163dc17102/toxogond.gif";
emoji["valvebeta"] = "http://i3.endoftheinter.net/i/n/26644f1068255a42a03c6bf1b3eda41a/valvebeta.png";
emoji["wave"] = "http://i3.endoftheinter.net/i/n/6801f5f921d3adc4d4ddf607ba9f15b7/wave.gif";
emoji["wiggle"] = "http://i3.endoftheinter.net/i/n/aabbc82c2b0dc72bfbce2f82c97a95e8/wiggle.gif";
emoji["wow"] = "http://i3.endoftheinter.net/i/n/efd187d3af6b6f0f8614ad7d2559ad11/wow.gif";
emoji["xbone"] = "http://i4.endoftheinter.net/i/n/36aae5bdf3410d8b107e99862a122a53/xbone.gif";
emoji["yayclod"] = "http://i1.endoftheinter.net/i/n/87f480c0ac529c894a0f4b2e463f96bb/yayclod.png";
emoji["yaycloud"] = "http://i3.endoftheinter.net/i/n/203a07236b5b5afb0295a276e8d250d7/yaycloud.gif";

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
GM_addStyle( "#SAicons { position: absolute; width: 20px; height: auto; display: inline-block; margin-left: 3px } #SASmiles { position: absolute; width: 1200px; height: 700px; padding: 5px; border: black 4px dashed; border-width: thin; margin-top: -735px }" )
// Create the little emoji icon button that open and closes the emoji panel :^)
var SAicons = document.createElement('img');
SAicons.id = "SAicons";
SAicons.src = "http://i2.endoftheinter.net/i/n/5d8f7393212f0942058644583caef368/negative.png";
// I don't know how stressful the emoji panel generating is on the browser, so I only generate it once if I can.
// Once it's generated, it gets stored in your browser's local storage until a change to the emoji array is detected (adding/removing an emoji).
if (GM_getValue("SAPanels") == undefined || GM_getValue("SAPanelsCount") != emojiCounts)
{
	// Time to generate the large emoji panel.
	var SASmiles = document.createElement('div');
	SASmiles.id = "SASmiles";
	for (var key in emoji)
	{
		if (emoji.hasOwnProperty(key)) 
		{
			var newEmoji = document.createElement('img');
			newEmoji.className = 'SAemote';
			newEmoji.id = key;
			newEmoji.alt = key;
			newEmoji.src = emoji[key];
			
			SASmiles.appendChild(newEmoji);
		}
	}
	SASmiles.innerHTML = SASmiles.innerHTML + "<br />";
	var autoInsertSpan = document.createElement('span');
	autoInsertSpan.style = "font-size=6px;";
	autoInsertSpan.innerHTML = "auto-insert emoji?";
	SASmiles.appendChild(autoInsertSpan);
	var autoInsertInput = document.createElement('input');
	autoInsertInput.type = "checkbox";
	autoInsertInput.id = "autoinsert";
	autoInsertInput.value = "on";
	SASmiles.appendChild(autoInsertInput);
	
	GM_setValue("SAPanels", SASmiles.outerHTML)
	GM_setValue("SAPanelsCount", emojiCounts)
} else {
	SASmiles = GM_getValue("SAPanels");
}
// The emoji panel already existed or just finished generating, time to insert everything.
$("textarea[name=message]").before(SAicons);
$("#SAicons").after("<br />");
$("textarea[name=message]").before(SASmiles);
// Set the emoji panel's background CSS to match the user's current skin.
$("#SASmiles").css("background-color", $("body").css('background-color'));
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
$("#SAicons").click(function(event) {
	if (emojiHidden) {
		$("#SASmiles").show();
	} else {
		$("#SASmiles").hide();
	}
	emojiHidden = !emojiHidden;
});
$("#SASmiles").hide();
// Auto-hide the emoji panel when you click post or preview.
$("input[name=post]").click(function(event) {
	emojiHidden = true;
	$("#SASmiles").hide();
});
$("input[name=preview]").click(function(event) {
	emojiHidden = true;
	$("#SASmiles").hide();
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
$(".SAemote").click(function(event) {
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