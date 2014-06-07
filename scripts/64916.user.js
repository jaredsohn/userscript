// ==UserScript==
// @name		Hero State Converter Helper
// @namespace		fenghou
// @description		Let Hero State Converter on www.wodtools.de works with Chinese language
// @include		http*://www.wodtools.de/index.php*
// ==/UserScript==

var Interface = [{"eName":"Outputform: ","cName":"输出格式："},
		{"eName":"Forum View","cName":"论坛显示"},
		{"eName":"Direct View","cName":"直接查看"},
		{"eName":"Race: ","cName":"种族："},
		{"eName":"Borderlander","cName":"边塞人"},
		{"eName":"Dinturan","cName":"丁图安蛮族"},
		{"eName":"Gnome","cName":"侏儒"},
		{"eName":"Halfling","cName":"半身人"},
		{"eName":"Hill Dwarf","cName":"丘陵矮人"},
		{"eName":"Kerasi","cName":"卡拉希人"},
		{"eName":"Mag-Mor Elf","cName":"玛格-莫精灵"},
		{"eName":"Mountain Dwarf","cName":"高山矮人"},
		{"eName":"Rashani","cName":"拉沙尼人"},
		{"eName":"Tiram-Ag Elf","cName":"提伦-埃精灵"},
		{"eName":"Woodlander","cName":"林地人"},
		{"eName":"Level: ","cName":"等级："},
		{"eName":"World: ","cName":"世界："},
		{"eName":"insert attribute-data here","cName":"复制属性信息到这里"},
		{"eName":"insert skill-data here","cName":"复制技能信息到这里"},
		{"eName":"Transform","cName":"转换"}];

var skills = [{"cName":"自然精通","eName":"Naturalist"},
		{"cName":"强健体魄","eName":"Toughness"},
		{"cName":"巨魔血统","eName":"Trollblood"},
		{"cName":"健康","eName":"Health"},
		{"cName":"大吃一顿","eName":"Time to Eat!"},
		{"cName":"臭脾气","eName":"Tantrum"},
		{"cName":"大地之力","eName":"Power of Earth"},
		{"cName":"石匠","eName":"Stonemasonry"},
		{"cName":"野性狂暴","eName":"Berserker Rage"},
		{"cName":"典型的丁图安蛮族！","eName":"Typical Dinturan!"},
		{"cName":"石匠（大师级）","eName":"Stonemasonry (masterful)"},
		{"cName":"远古智慧（防御）","eName":"Ancient Wisdom (defensive)"},
		{"cName":"远古智慧（被动）","eName":"Ancient Wisdom (passive)"},
		{"cName":"远古智慧（攻击）","eName":"Ancient Wisdom (offensive)"},
		{"cName":"远古召唤","eName":"Summoning the Ancients"},
		{"cName":"第六感","eName":"Sixth Sense"},
		{"cName":"无动于衷","eName":"Indifference"},
		{"cName":"小符文法术","eName":"Minor Rune Magery"},
		{"cName":"矿物学","eName":"Mineralogy"},
		{"cName":"雕琢","eName":"Gem Cutter"},
		{"cName":"强化锻冶","eName":"Reinforced Smithing"},
		{"cName":"典型的丘陵矮人！","eName":"Typical Hill Dwarf!"},
		{"cName":"雕琢（大师级）","eName":"Gem Cutter (masterful)"},
		{"cName":"胆小鬼","eName":"Undertall"},
		{"cName":"神秘学","eName":"Mystic"},
		{"cName":"冰冷之力","eName":"Power of Ice"},
		{"cName":"皮革切割","eName":"Leather Cutter"},
		{"cName":"火之祝福","eName":"Blessing of Fire"},
		{"cName":"顽固","eName":"Stubborn"},
		{"cName":"典型的侏儒！","eName":"Typical Gnome!"},
		{"cName":"皮革切割（大师级）","eName":"Leather Cutter (masterful)"},
		{"cName":"幸运","eName":"Luck"},
		{"cName":"抽烟","eName":"Smoke Pipe"},
		{"cName":"讲故事","eName":"Story Telling"},
		{"cName":"午饭时间","eName":"Lunch"},
		{"cName":"编织","eName":"Knitting"},
		{"cName":"典型的半身人！","eName":"Typical Halfling!"},
		{"cName":"编织（大师级）","eName":"Knitting (masterful)"},
		{"cName":"痛饮时间","eName":"Bottoms up!"},
		{"cName":"制革","eName":"Hide Tanning"},
		{"cName":"抵抗寒冷","eName":"Resist Cold"},
		{"cName":"典型的卡拉希人！","eName":"Typical Kerasi!"},
		{"cName":"制革（大师级）","eName":"Hide Tanning (masterful)"},
		{"cName":"抵抗炎热","eName":"Resist Heat"},
		{"cName":"烟雾的祝福","eName":"Smoke Blessing"},
		{"cName":"制骨工艺","eName":"Bonecrafting"},
		{"cName":"危险察觉","eName":"Sense Danger"},
		{"cName":"典型的拉沙尼人！","eName":"Typical Rashani!"},
		{"cName":"制骨工艺（大师级）","eName":"Bonecrafting (masterful)"},
		{"cName":"行动敏捷","eName":"Agile"},
		{"cName":"快速思考","eName":"Quick Thinking"},
		{"cName":"书法","eName":"Calligraphy"},
		{"cName":"心灵护盾","eName":"Mental Shield"},
		{"cName":"入定","eName":"Trance"},
		{"cName":"典型的提伦-埃精灵！","eName":"Typical Tiram-Ag!"},
		{"cName":"书法（大师级）","eName":"Calligraphy (masterful)"},
		{"cName":"无声行动","eName":"Silent Movement"},
		{"cName":"刻印","eName":"Engrave Glyphs"},
		{"cName":"大地匕首","eName":"Earth Dagger"},
		{"cName":"典型的林地人！","eName":"Typical Woodlander!"},
		{"cName":"刻印（大师级）","eName":"Engrave Glyphs (masterful)"},
		{"cName":"削制","eName":"Whittle"},
		{"cName":"最佳视野","eName":"Perfect Sight"},
		{"cName":"典型的玛格—莫精灵","eName":"Typical Mag-Mor!"},
		{"cName":"削制（大师级）","eName":"Whittle (masterful)"},
		{"cName":"纹章学","eName":"Heraldry"},
		{"cName":"精密打造","eName":"Precision Smithing"},
		{"cName":"旗手","eName":"Banner Carrier"},
		{"cName":"典型的边塞人！","eName":"Typical Borderlander!"},
		{"cName":"精密打造（大师级）","eName":"Precision Smithing (masterful)"},
		{"cName":"岩石切割","eName":"Stone Cutter"},
		{"cName":"大符文法术","eName":"Major Rune Magery"},
		{"cName":"典型的高山矮人！","eName":"Typical Mountain Dwarf!"},
		{"cName":"岩石切割（大师级）","eName":"Stone Cutter (masterful)"},
		{"cName":"饮用治疗药剂","eName":"Drink Healing Potion"},
		{"cName":"剑术","eName":"Swordsmanship"},
		{"cName":"投掷武器攻击","eName":"Use throwing weapons"},
		{"cName":"英雄故事","eName":"Heroic Stories"},
		{"cName":"树肤","eName":"Barkskin"},
		{"cName":"嘲笑","eName":"Mockery"},
		{"cName":"饮用法力药剂","eName":"Drink Mana Potion"},
		{"cName":"佯攻","eName":"Feign Attack"},
		{"cName":"双重打击","eName":"Double Strike"},
		{"cName":"钝器攻击","eName":"Crushing weapons"},
		{"cName":"勇气之歌","eName":"Song of courage"},
		{"cName":"阅读","eName":"Read"},
		{"cName":"豪饮","eName":"Drink"},
		{"cName":"肉搏","eName":"Brawling"},
		{"cName":"击剑","eName":"Fencing"},
		{"cName":"迅捷","eName":"Reaction"},
		{"cName":"法力再生","eName":"Mana Regeneration"},
		{"cName":"治愈之歌","eName":"Song of healing"},
		{"cName":"无知无觉","eName":"Ignorance"},
		{"cName":"勇气小调","eName":"Ditty of courage"},
		{"cName":"近程闪避","eName":"Dodge blow"},
		{"cName":"顽强小调","eName":"Ditty of Stubborness"},
		{"cName":"箭术","eName":"Archery"},
		{"cName":"嘲弄之歌","eName":"Song of mockery"},
		{"cName":"十字弓射击","eName":"Use Crossbow"},
		{"cName":"抗魔","eName":"Resist Magic"},
		{"cName":"护符强化","eName":"Amulet of Power"},
		{"cName":"偷袭","eName":"Ambush"},
		{"cName":"迅捷小调","eName":"Ditty of speed"},
		{"cName":"远程回避","eName":"Dodge missile"},
		{"cName":"治愈颂歌","eName":"Greater song of healing"},
		{"cName":"预感","eName":"Premonition"},
		{"cName":"机警","eName":"Alertness"},
		{"cName":"护符削弱","eName":"Amulet of Weakness"},
		{"cName":"非凡魅力","eName":"Charmer"},
		{"cName":"勇气颂歌","eName":"Greater song of courage"},
		{"cName":"变戏法","eName":"Jugglery"},
		{"cName":"星座守护","eName":"Blessed by the stars"},
		{"cName":"坚定不移","eName":"Determination"},
		{"cName":"霰弹攻击","eName":"Blunderbuss"},
		{"cName":"嘲弄颂歌","eName":"Greater song of mockery"},
		{"cName":"疾风之速","eName":"Burst of Speed"},
		{"cName":"洞察之歌","eName":"Song of Overview"},
		{"cName":"天赋：非凡气质","eName":"Talent: Gallant"},
		{"cName":"天赋：声援专家","eName":"Talent: Motivationalist"},
		{"cName":"天赋：决斗家","eName":"Talent: Duellist"},
		{"cName":"天赋：震慑尖啸","eName":"Talent: Scream of Shock"},
		{"cName":"天赋：毒舌","eName":"Talent: Verbal Abuse"},
		{"cName":"天赋：嘲讽大师","eName":"Talent: Complex Insults"},
		{"cName":"天赋：鹰之旋律","eName":"Talent: Melody of the Eagle"},
		{"cName":"天赋：治愈赞歌","eName":"Talent: Virtue of Healing Melodies"},
		{"cName":"天赋：自信愉悦","eName":"Talent: Convincing Smile"},
		{"cName":"治愈之手","eName":"Healing Hands"},
		{"cName":"圣武士光环","eName":"Aura of the paladin"},
		{"cName":"盾牌格挡","eName":"Use shield"},
		{"cName":"小范围保护光环","eName":"Lesser Sphere of Protection"},
		{"cName":"神圣信念","eName":"Divine confidence"},
		{"cName":"小范围自信光环","eName":"Lesser Sphere of Confidence"},
		{"cName":"小范围治愈光环","eName":"Lesser Sphere of Healing"},
		{"cName":"小范围恢复法力光环","eName":"Lesser Sphere of Recovery"},
		{"cName":"进阶护符强化","eName":"Advanced Amulet of Power"},
		{"cName":"小范围力量光环","eName":"Lesser Sphere of Might"},
		{"cName":"长柄武器攻击","eName":"Use Polearms"},
		{"cName":"小范围元素光环","eName":"Lesser Sphere of Elements"},
		{"cName":"进阶护符削弱","eName":"Advanced Amulet of Weakness"},
		{"cName":"群体保护光环","eName":"Greater Sphere of Protection"},
		{"cName":"群体自信光环","eName":"Greater Sphere of Confidence"},
		{"cName":"群体治愈光环","eName":"Greater Sphere of Healing"},
		{"cName":"群体恢复法力光环","eName":"Greater Sphere of Recovery"},
		{"cName":"群体力量光环","eName":"Greater Sphere of Might"},
		{"cName":"群体元素光环","eName":"Greater Sphere of Elements"},
		{"cName":"狂暴","eName":"Berserker"},
		{"cName":"奇袭","eName":"Change of Tactics"},
		{"cName":"最后的祷告","eName":"Final Prayer"},
		{"cName":"天赋：暴躁天性","eName":"Talent: Choleric"},
		{"cName":"天赋：自信","eName":"Talent: Self Assurance"},
		{"cName":"天赋：正义的守护者","eName":"Talent: Keeper of Justice"},
		{"cName":"天赋：天选者","eName":"Talent: The Chosen One"},
		{"cName":"天赋：钢铸之主","eName":"Talent: Master of Tempered Steel"},
		{"cName":"天赋：迪莫桑的祝福","eName":"Talent: Demosans Blessing"},
		{"cName":"天赋：胸有成竹","eName":"Talent: Planning"},
		{"cName":"天赋：天文学","eName":"Talent: Astronomy"},
		{"cName":"天赋：神赐直觉","eName":"Talent: Godly Intuition"},
		{"cName":"投石攻击","eName":"Sling"},
		{"cName":"魔法触摸","eName":"Magic touch"},
		{"cName":"杖击","eName":"Use Staves"},
		{"cName":"智慧之语","eName":"Words of Wisdom"},
		{"cName":"魔法盾","eName":"Magic shield"},
		{"cName":"钢铁意志","eName":"Iron Will"},
		{"cName":"厄运降临","eName":"Jinx"},
		{"cName":"酸液处理","eName":"Acid Treatment"},
		{"cName":"侦测陷阱","eName":"Detect Traps"},
		{"cName":"解除陷阱","eName":"Disarm Traps"},
		{"cName":"卷轴加持","eName":"Use supportive scrolls"},
		{"cName":"卷轴防护","eName":"Protective Magic"},
		{"cName":"冥想","eName":"Meditation"},
		{"cName":"传送法力","eName":"Transfer Mana"},
		{"cName":"魔法防护","eName":"Magical Protection"},
		{"cName":"精准投石","eName":"Precision Sling"},
		{"cName":"魔法标记","eName":"Magic mark"},
		{"cName":"侦测埋伏","eName":"Spot ambush"},
		{"cName":"冷酷凝视","eName":"Austere gaze"},
		{"cName":"科学演讲","eName":"Scientific lecture"},
		{"cName":"力量之语","eName":"Words of Power"},
		{"cName":"魔法学识","eName":"Magic Lore"},
		{"cName":"法力抽取","eName":"Drain mana"},
		{"cName":"书虫","eName":"Bookworm"},
		{"cName":"富摩尔之石","eName":"Stone of Frumol"},
		{"cName":"智慧","eName":"Wisdom"},
		{"cName":"草药运用","eName":"Apply Herbs"},
		{"cName":"草药知识","eName":"Herbal lore"},
		{"cName":"疾影","eName":"Prestidigitation"},
		{"cName":"运筹帷幄","eName":"Organization"},
		{"cName":"天赋：声光之术","eName":"Talent: Sound and Smoke"},
		{"cName":"天赋：法力流掌握","eName":"Talent: Master of the Magical Flow"},
		{"cName":"天赋：秘语大师","eName":"Talent: Master of Arcane Words"},
		{"cName":"天赋：舒缓身心","eName":"Talent: Relaxation"},
		{"cName":"天赋：博识","eName":"Talent: Informed"},
		{"cName":"天赋：弹弓大师","eName":"Talent: Master of the Sling"},
		{"cName":"天赋：狂热讲演","eName":"Talent: Enthusiastic Speaker"},
		{"cName":"绝处逢生","eName":"Last-second escape"},
		{"cName":"燃烧箭","eName":"Incendiary projectiles"},
		{"cName":"寒冰矢","eName":"Ice Bolt"},
		{"cName":"急救","eName":"First aid"},
		{"cName":"虚招","eName":"Feint"},
		{"cName":"一箭双雕","eName":"Double Shot"},
		{"cName":"标记","eName":"Mark target"},
		{"cName":"淬毒箭","eName":"Poisoned projectiles"},
		{"cName":"淬毒矢","eName":"Poisoned bolt"},
		{"cName":"穿心矢","eName":"Penetration"},
		{"cName":"箭雨","eName":"Hail of arrows"},
		{"cName":"爆裂","eName":"Burst"},
		{"cName":"精准箭","eName":"Precision Archery"},
		{"cName":"精准弩","eName":"Marksman crossbow"},
		{"cName":"精确瞄准","eName":"Careful aim"},
		{"cName":"鹰眼","eName":"Eagle-Eye"},
		{"cName":"身手敏捷","eName":"Acrobatics"},
		{"cName":"抗毒","eName":"Resist Poison"},
		{"cName":"草药茶","eName":"Prepare Herbal Tea"},
		{"cName":"天赋：无虞之击","eName":"Talent: Unbeatable Marksmanship"},
		{"cName":"天赋：冷静之佑","eName":"Talent: Blessing of Calmness"},
		{"cName":"天赋：附魔射击","eName":"Talent: Magical Projectiles"},
		{"cName":"天赋：射手天资","eName":"Talent: Highly Gifted Archer"},
		{"cName":"天赋：解剖学","eName":"Talent: Anatomy"},
		{"cName":"天赋：黑火药大师","eName":"Talent: Master of Black Powder"},
		{"cName":"天赋：调配火药","eName":"Talent: Alternative useage of black powder"},
		{"cName":"匕首格斗","eName":"Knife Combat"},
		{"cName":"摔跤","eName":"Wrestling"},
		{"cName":"灵敏","eName":"Nimbleness"},
		{"cName":"武器淬毒","eName":"Poison weapon"},
		{"cName":"投网","eName":"Throw Net"},
		{"cName":"滚翻","eName":"Somersault"},
		{"cName":"恶作剧者","eName":"Prankster"},
		{"cName":"混乱攻击","eName":"Puzzling attack"},
		{"cName":"割喉","eName":"Cut-throat"},
		{"cName":"刃术大师","eName":"Blademaster"},
		{"cName":"精准投掷","eName":"Precision Throwing"},
		{"cName":"跳跃攻击","eName":"Leap attack"},
		{"cName":"天眼","eName":"Second Sight"},
		{"cName":"天赋：坚如磐石","eName":"Talent: Steadfast"},
		{"cName":"天赋：金字塔之基","eName":"Talent: Base of the Pyramid"},
		{"cName":"天赋：潜行","eName":"Talent: Stealth"},
		{"cName":"天赋：诱捕大师","eName":"Talent: Master of Ensnarement"},
		{"cName":"天赋：活靶子","eName":"Talent: Living Target"},
		{"cName":"天赋：小丑","eName":"Talent: Clown"},
		{"cName":"天赋：着迷","eName":"Talent: Enrapture"},
		{"cName":"天赋：剑术大师","eName":"Talent: Blademaster"},
		{"cName":"魔法飞弹","eName":"Magic Missile"},
		{"cName":"火箭术","eName":"Fire Arrow"},
		{"cName":"寒冰飞弹","eName":"Ice Missile"},
		{"cName":"苦修","eName":"Asceticism"},
		{"cName":"卷轴攻击","eName":"Offensive Magery"},
		{"cName":"能量风暴","eName":"Thunderstorm"},
		{"cName":"火球术","eName":"Fireball"},
		{"cName":"冻云术","eName":"Ice Cloud"},
		{"cName":"法力复苏之风","eName":"Master of the winds of magic"},
		{"cName":"火系魔法精通","eName":"Master of fire"},
		{"cName":"冰系魔法精通","eName":"Master of ice"},
		{"cName":"闪电风暴","eName":"Electrical Storm"},
		{"cName":"火雨术","eName":"Fire Rain"},
		{"cName":"冰雨术","eName":"Ice Rain"},
		{"cName":"空间移动","eName":"Dimension Shift"},
		{"cName":"天赋：冰封领域","eName":"Talent: Sphere of Cold"},
		{"cName":"天赋：冰冷之咒","eName":"Talent: Curse of Cold"},
		{"cName":"天赋：致死冰束","eName":"Talent: Deadly Ice Ray"},
		{"cName":"天赋：炽烈领域","eName":"Talent: Sphere of Flame"},
		{"cName":"天赋：灼热之咒","eName":"Talent: Curse of Heat"},
		{"cName":"天赋：烈焰护盾","eName":"Talent: Flameshield"},
		{"cName":"天赋：大师祝福","eName":"Talent: Masterful Blessings"},
		{"cName":"天赋：攻击魔法艺术","eName":"Talent: Art of Offensive Magery"},
		{"cName":"力量仪式","eName":"Ritual of Strength"},
		{"cName":"回复型卷轴加持","eName":"Use supportive scrolls (Scroll of Regeneration)"},
		{"cName":"单发射击","eName":"Single Shot"},
		{"cName":"烟雾弥漫","eName":"Cloud of Smoke"},
		{"cName":"锁定目标","eName":"Lock and Load"},
		{"cName":"良好声誉","eName":"Good Reputation"},
		{"cName":"自夸","eName":"Boastful Manner"},
		{"cName":"王牌击剑手","eName":"Banner Fencer"},
		{"cName":"精确打击（穿刺伤害）","eName":"Deadly precision (piercing damage)"},
		{"cName":"精确打击（切割伤害）","eName":"Deadly precision (cutting damage)"},
		{"cName":"缴械攻击","eName":"Disarming Strike"},
		{"cName":"恫吓","eName":"Intimidation"},
		{"cName":"高等烟雾弥漫","eName":"Greater Cloud of Smoke"},
		{"cName":"要害射击","eName":"Master Shot"},
		{"cName":"骷髅旗下","eName":"Under Black Flag"},
		{"cName":"精确剑击","eName":"Precise Fencing Strike"},
		{"cName":"以父之名","eName":"In the Name of the Father"},
		{"cName":"领袖魅力","eName":"Charismatic Leader"},
		{"cName":"阴险技法","eName":"Insidious Manoeuvre"},
		{"cName":"发现弱点","eName":"Spot Weakness"},
		{"cName":"双刺","eName":"Double Thrust"},
		{"cName":"重剑大师","eName":"Master of the epee"},
		{"cName":"昂首阔步","eName":"Prance"},
		{"cName":"贯穿一击","eName":"Hail of Lead"},
		{"cName":"巴图塔舞","eName":"Battuta"},
		{"cName":"危机意识","eName":"Apell"},
		{"cName":"飞刺","eName":"Flechette"},
		{"cName":"蛇击","eName":"Bite of the Snake"},
		{"cName":"天赋：沉稳之握","eName":"Talent: Steady Hand"},
		{"cName":"天赋：阴暗把戏","eName":"Talent: Obscure Tricks"},
		{"cName":"天赋：彬彬有礼","eName":"Talent: Etiquette"},
		{"cName":"天赋：荣耀决斗士","eName":"Talent: Honorable Duellist"},
		{"cName":"天赋：击剑战术","eName":"Talent: Fencing Tactics"},
		{"cName":"炼金治疗","eName":"Alchemical Healing"},
		{"cName":"预治疗","eName":"Preventive Healing"},
		{"cName":"炼金再生","eName":"Alchemical Regeneration"},
		{"cName":"强壮试剂","eName":"Experimental Strength"},
		{"cName":"法力增效试剂","eName":"Experimental Mana Boost"},
		{"cName":"游刃有余","eName":"Surgeon"},
		{"cName":"炼金群体治疗","eName":"Alchemical Mass Healing"},
		{"cName":"炼金知识","eName":"Alchemical Knowledge"},
		{"cName":"使用魔化药剂","eName":"Use Magical Potion"},
		{"cName":"炼金法力恢复","eName":"Alchemical Mana Restoration"},
		{"cName":"健康指南","eName":"Health Tips"},
		{"cName":"天赋：爆炸试剂","eName":"Talent: Multiple Explosives"},
		{"cName":"天赋：炼金学","eName":"Talent: Alchemy"},
		{"cName":"天赋：自然学识","eName":"Talent: Nature Lore"},
		{"cName":"天赋：全面复原","eName":"Talent: Complete Recovery"},
		{"cName":"天赋：治愈之眠","eName":"Talent: Healing Sleep"},
		{"cName":"涂毒（自身武器）","eName":"Poison own weapon"},
		{"cName":"自律","eName":"Stoic"},
		{"cName":"暴怒","eName":"Raging boar"},
		{"cName":"野性之力","eName":"Strength of the bear"},
		{"cName":"自然之魂","eName":"The ghosts of nature"},
		{"cName":"天赋：自然之主","eName":"Talent: Master of Nature"},
		{"cName":"天赋：箭之祝福","eName":"Talent: Blessing of the Arrow"},
		{"cName":"天赋：根须之主","eName":"Talent: Master of Roots"},
		{"cName":"天赋：查桑的恩赐","eName":"Talent: Chasuns' Blessing"},
		{"cName":"天赋：狩猎之王","eName":"Talent: Master of the Hunt"},
		{"cName":"祝福","eName":"Bless"},
		{"cName":"神圣盾牌","eName":"Divine Shield"},
		{"cName":"驱魔","eName":"Exorcism"},
		{"cName":"神圣火焰","eName":"Holy fire of Akbeth"},
		{"cName":"火焰之佑","eName":"Fire Blessing"},
		{"cName":"邪恶呢喃","eName":"Sinister mumble"},
		{"cName":"诅咒","eName":"Curse"},
		{"cName":"神圣力量","eName":"Divine Strength"},
		{"cName":"大型驱魔","eName":"Greater Exorcism"},
		{"cName":"神圣治疗","eName":"Divine healing"},
		{"cName":"审判","eName":"Condemn"},
		{"cName":"神圣炼狱","eName":"Holy inferno of Akbeth"},
		{"cName":"威信","eName":"Authority"},
		{"cName":"审判之怒","eName":"Justified Rage"},
		{"cName":"天赋：拉尚的祝福","eName":"Talent: Rashons' Blessing"},
		{"cName":"天赋：拉尚的宽恕","eName":"Talent: Rashons' Pardon"},
		{"cName":"天赋：拉尚的长眠","eName":"Talent: Rashons' Slumber"},
		{"cName":"天赋：迪莫桑之锤","eName":"Talent: Hammer of Demosan"},
		{"cName":"天赋：迪莫桑的愤怒","eName":"Talent: Wrath of Demosan"},
		{"cName":"天赋：阿克雷斯箭雨","eName":"Talent: Acres purifying hail of arrows"},
		{"cName":"天赋：阿克雷斯之影","eName":"Talent: Acres' Shadow"},
		{"cName":"天赋：阿克雷斯的祝福","eName":"Talent: Acres Blessing"},
		{"cName":"爪击","eName":"Palm Claw Strike"},
		{"cName":"忠诚的同伴","eName":"Loyal Companion"},
		{"cName":"安抚之语","eName":"Soothing Words"},
		{"cName":"蛇之记号（自身）","eName":"Mark of the Snake (Self)"},
		{"cName":"吹管","eName":"Blowpipe"},
		{"cName":"鹰之记号（自身）","eName":"Mark of the Eagle (Self)"},
		{"cName":"土狼的喊叫","eName":"Call of the Hyena"},
		{"cName":"冰雹","eName":"Hail"},
		{"cName":"选择药物","eName":"Alternative Medicine"},
		{"cName":"熊之记号（自身）","eName":"Mark of the Bear (Self)"},
		{"cName":"蛇之记号（队友）","eName":"Mark of the Snake (Companion)"},
		{"cName":"鹰之记号（队友）","eName":"Mark of the Eagle (Companion)"},
		{"cName":"熊之记号（队友）","eName":"Mark of the Bear (Companion)"},
		{"cName":"自然的呼唤","eName":"Call of Nature"},
		{"cName":"眼镜蛇之凝视","eName":"Gaze of the Cobra"},
		{"cName":"熊之愤怒","eName":"Rage of the bear"},
		{"cName":"鹰之飞翔","eName":"Flight of the Eagle"},
		{"cName":"轻度出神","eName":"Light Trance"},
		{"cName":"土狼之尖啸","eName":"Laugh of the Hyena"},
		{"cName":"利爪","eName":"Sharp Claws"},
		{"cName":"震怒之魂","eName":"Spiritual Rage"},
		{"cName":"精神活力","eName":"Spirit Vigor"},
		{"cName":"精神支柱","eName":"Supportive Spirit"},
		{"cName":"星界投影","eName":"Astral Projection"},
		{"cName":"蛇之记号（全队）","eName":"Mark of the Snake (Group)"},
		{"cName":"鹰之记号（全队）","eName":"Mark of the Eagle (Group)"},
		{"cName":"熊之记号（全队）","eName":"Mark of the Bear (Group)"},
		{"cName":"熊之坚韧","eName":"Bear Toughness"},
		{"cName":"鹰之感知","eName":"Perception of the Eagle"},
		{"cName":"深度出神","eName":"Deep Trance"},
		{"cName":"蛇之出神","eName":"Snakes Trance"},
		{"cName":"冰雹与冻雨","eName":"Hail and Sleet"},
		{"cName":"高级吹管","eName":"Advanced Blowpipe"},
		{"cName":"天赋：灵肉一体","eName":"Talent: Unison of Body and Spirit"},
		{"cName":"天赋：冰雹大师","eName":"Talent: Master of Hail"},
		{"cName":"天赋：灵界契合","eName":"Talent: Etherworld Affinity"},
		{"cName":"天赋：恐惧之息","eName":"Talent: Bestow Fear"},
		{"cName":"天赋：驯兽大师","eName":"Talent: Beastmaster"},
		{"cName":"天赋：耐心的狩猎者","eName":"Talent: Patient Hunter"},
		{"cName":"天赋：虎爪","eName":"Talent: Claw of the Tiger"},
		{"cName":"斧技","eName":"Axemanship"},
		{"cName":"铁拳","eName":"Iron Fist"},
		{"cName":"武器大师","eName":"Master-of-arms"},
		{"cName":"跑位（左侧）","eName":"Switch Position (left)"},
		{"cName":"跑位（后方）","eName":"Switch Position (back)"},
		{"cName":"跑位（右侧）","eName":"Switch Position (right)"},
		{"cName":"跑位（前方）","eName":"Switch Position (front)"},
		{"cName":"跑位（中间）","eName":"Switch Position (center)"},
		{"cName":"跑位","eName":"Switch Position"},
		{"cName":"精确打击（钝击伤害）","eName":"Deadly precision (crushing damage)"},
		{"cName":"战斗大师","eName":"Master of Combat"},
		{"cName":"粉碎","eName":"Smash"},
		{"cName":"蛮牛顽固","eName":"Oxen Stubbornness"},
		{"cName":"飞拳","eName":"Flying Fists"},
		{"cName":"战斗洞察","eName":"Insight of Combat"},
		{"cName":"超凡反射","eName":"Supernatural Reflexes"},
		{"cName":"破甲","eName":"Break Armor"},
		{"cName":"明镜止水","eName":"Inner Peace"},
		{"cName":"战斗常识","eName":"Blessed with Overview"},
		{"cName":"充能拳","eName":"Steelfist"},
		{"cName":"专心一致","eName":"Impervious"},
		{"cName":"下流把戏","eName":"Dirty Tricks"},
		{"cName":"天赋：战神威压","eName":"Talent: Demand Respect"},
		{"cName":"天赋：摔跤大师","eName":"Talent: Master of Wrestling"},
		{"cName":"天赋：荣耀勇士","eName":"Talent: Glorious Fighter"},
		{"cName":"天赋：竞技者","eName":"Talent: Actor"},
		{"cName":"天赋：自负的英雄","eName":"Talent: Boastful Hero"},
		{"cName":"战吼","eName":"Battle Cry"},
		{"cName":"结实如木","eName":"Toughness of wood"},
		{"cName":"坚硬如石","eName":"Toughness of stone"},
		{"cName":"强韧如铁","eName":"Toughness of iron"},
		{"cName":"旋风斩","eName":"Roundhouse"},
		{"cName":"石肤","eName":"Stoneskin"},
		{"cName":"铁肤","eName":"Iron Skin"},
		{"cName":"黑耀石护体","eName":"Obsidian Skin"},
		{"cName":"坚韧","eName":"Trolls Toughness"},
		{"cName":"战争咆哮","eName":"War Dance"},
		{"cName":"天赋：致命精准（投掷）","eName":"Talent: Deadly Precision (throwing weapons)"},
		{"cName":"天赋：钢筋铁骨","eName":"Talent: Musclebound"},
		{"cName":"天赋：斧技大师","eName":"Talent: Axe Master"},
		{"cName":"天赋：巨魔后裔","eName":"Talent: Troll Ancestry"},
		{"cName":"天赋：生吞活剥","eName":"Talent: Carnivore"},
		{"cName":"军规","eName":"Discipline"},
		{"cName":"威压","eName":"Commanding presence"},
		{"cName":"上尉","eName":"Captain"},
		{"cName":"元帅","eName":"Field Marshall"},
		{"cName":"骑士的誓言","eName":"Vassals Loyalty"},
		{"cName":"勇敢的心","eName":"Lionheart"},
		{"cName":"运动机能","eName":"Athletics"},
		{"cName":"施压","eName":"Impressive Appearance"},
		{"cName":"天赋：强壮","eName":"Talent: Ruggedness"},
		{"cName":"天赋：战场经验","eName":"Talent: Battlefield Veteran"},
		{"cName":"天赋：光焕的领导者","eName":"Talent: Radiant Leadership"}];

var races = [{"eName":"Borderlander","cName":"边塞人"},
		{"eName":"Dinturan","cName":"丁图安蛮族"},
		{"eName":"Gnome","cName":"侏儒"},
		{"eName":"Halfling","cName":"半身人"},
		{"eName":"Hill Dwarf","cName":"丘陵矮人"},
		{"eName":"Kerasi","cName":"卡拉希人"},
		{"eName":"Mag-Mor Elf","cName":"玛格-莫精灵"},
		{"eName":"Mountain Dwarf","cName":"高山矮人"},
		{"eName":"Rashani","cName":"拉沙尼人"},
		{"eName":"Tiram-Ag Elf","cName":"提伦-埃精灵"},
		{"eName":"Woodlander","cName":"林地人"}];

var attrs = [{"cName":"力量","eShort":"st","eName":"Strength"},
		{"cName":"体质","eShort":"co","eName":"Constitution"},
		{"cName":"智力","eShort":"in","eName":"Intelligence"},
		{"cName":"灵巧","eShort":"dx","eName":"Dexterity"},
		{"cName":"魅力","eShort":"ch","eName":"Charisma"},
		{"cName":"敏捷","eShort":"ag","eName":"Agility"},
		{"cName":"感知","eShort":"pe","eName":"Perception"},
		{"cName":"意志","eShort":"wi","eName":"Willpower"}];

var Misc = [{"cName":"体力","eName":"hit points"},
		{"cName":"法力","eName":"mana points"},
		{"cName":"生命值再生","eName":"recover hp"},
		{"cName":"法力值再生","eName":"recover mp"},
		{"cName":"每回合的行动次数","eName":"actions per round"},
		{"cName":"先攻权","eName":"initiative"},
		{"cName":"重置点数","eName":"reset points"},
		{"cName":"英雄的等级","eName":"hero's level"},
		{"cName":"粉碎伤害","eName":"crushing damage"},
		{"cName":"切割伤害","eName":"cutting damage"},
		{"cName":"穿刺伤害","eName":"piercing damage"},
		{"cName":"火焰伤害","eName":"fire damage"},
		{"cName":"寒冰伤害","eName":"ice damage"},
		{"cName":"闪电伤害","eName":"lightning damage"},
		{"cName":"毒素伤害","eName":"poison damage"},
		{"cName":"酸性伤害","eName":"acid damage"},
		{"cName":"法力伤害","eName":"mana damage"},
		{"cName":"心灵伤害","eName":"psychological damage"},
		{"cName":"所有","eName":"all"},
		{"cName":"近程","eName":"melee"},
		{"cName":"远程","eName":"ranged"},
		{"cName":"魔法","eName":"spell"},
		{"cName":"心理攻击","eName":"social"},
		{"cName":"偷袭","eName":"ambush"},
		{"cName":"陷阱","eName":"trap"},
		{"cName":"自然灾害","eName":"nature"},
		{"cName":"疾病","eName":"disease"}];

// English words will be treated as Regular Expressions, Chinese words will be treated as Replacements. Case Sensitive.
var ResultInterface = [{"cName":"]属性：[","eName":"\\]Attributes:\\["},
		{"cName":"]其他：[","eName":"\\]Miscellaneous:\\["},
		{"cName":"]技能：[","eName":"\\]Skills:\\["},
		{"cName":"]先攻权：[","eName":"\\]Initiative:\\["},
		{"cName":"]防御：[","eName":"\\]Parries:\\["},
		{"cName":"]使用武器防御：[","eName":"\\]Weapon Parries:\\["},
		{"cName":"]护甲：[","eName":"\\]Armor:\\["},
		{"cName":"]攻击：[","eName":"\]Attacks:\\["},
		{"cName":"]恢复技能：[","eName":"\\]Healingskills:\\["},
		{"cName":"]增益：[","eName":"\\]Pushes:\\["},
		{"cName":"]恢复[","eName":"\\]Healing\\["},
		{"cName":"$1 先攻权 (","eName":"(\\+|-) initiative \\("},
		{"cName":"]近程攻击[","eName":"\\]Melee Attack\\["},
		{"cName":"]远程攻击[","eName":"\\]Ranged Attack\\["},
		{"cName":"]魔法攻击[","eName":"\\]Spell Attack\\["},
		{"cName":"]心理攻击[","eName":"\\]Social Attack\\["},
		{"cName":"]偷袭[","eName":"\\]Ambush\\["},
		{"cName":"]触发陷阱[","eName":"\\]Activate Trap\\["},
		{"cName":"]爆炸和冲击[","eName":"\\]Explosion or Blast\\["},
		{"cName":"]自然灾害[","eName":"\\]Force of Nature\\["},
		{"cName":"]疾病[","eName":"\\]Disease\\["},
		{"cName":"]魔法投射[","eName":"\\]Magic Projectile Attack\\["},
		{"cName":"]诅咒攻击[","eName":"\\]Curse Attack\\["},
		{"cName":"(近程攻击)","eName":"\\(Melee Attack\\)"},
		{"cName":"(远程攻击)","eName":"\\(Ranged Attack\\)"},
		{"cName":"(魔法攻击)","eName":"\\(Spell Attack\\)"},
		{"cName":"(心理攻击)","eName":"\\(Social Attack\\)"},
		{"cName":"(偷袭)","eName":"\\(Ambush\\)"},
		{"cName":"(陷阱)","eName":"\\(trap\\)"},
		{"cName":"(爆炸和冲击)","eName":"\\(Explosion or Blast\\)"},
		{"cName":"(自然灾害)","eName":"\\(Force of Nature\\)"},
		{"cName":"(疾病)","eName":"\\(Disease\\)"},
		{"cName":"(魔法投射)","eName":"\\(Magic Projectile Attack\\)"},
		{"cName":"(诅咒攻击)","eName":"\\(Curse Attack\\)"},
		{"cName":"]命中[","eName":"\\]Attack\\["},
		{"cName":"]伤害[","eName":"\\]Damage\\["},
		{"cName":"(消耗法力:","eName":"\\(Manacosts:"},
		{"cName":"(目标:","eName":"\\(Targets:"},
		{"cName":": 自身)","eName":": self\\)"},
		{"cName":"$1 全体)","eName":"(\\d|%) Pos\\+\\)"}
		];

////////////////////////////////////////////////////////////////
// For output page:

// Translate Output text
var TextAreas = document.getElementsByTagName("textarea");
if (TextAreas.length == 1 && TextAreas[0].name == "eingabe")	// Output page
	{
	var result = TextAreas[0].value;
	var pattern;
	
	// Translate phrase first

	for (var i = 0; i < skills.length; ++i)
		{
		pattern = new RegExp("\\[skill: " + skills[i].eName + "\\]", "g");
		result = result.replace(pattern, "[skill:" + skills[i].cName + "]");
		pattern = new RegExp("x" + skills[i].eName + " \\(", "g");
		result = result.replace(pattern, "x" + skills[i].cName + " (");
		pattern = new RegExp("\\+ " + skills[i].eName + "/", "g");
		result = result.replace(pattern, "+ " + skills[i].cName + "/");
		pattern = new RegExp("\\]" + skills[i].eName + "\\[", "g");
		result = result.replace(pattern, "]" + skills[i].cName + "[");
		pattern = new RegExp("(\\+|-) " + skills[i].eName + " \\(", "g");
		result = result.replace(pattern, "$1 " + skills[i].cName + " (");
		}

	for (var i = 0; i < races.length; ++i)
		{
		pattern = new RegExp("(\\+|-) " + races[i].eName + " \\(", "g");
		result = result.replace(pattern, "$1 " + races[i].cName + " (");
		}

	for (var i = 0; i < Misc.length; ++i)
		{
		pattern = new RegExp("\\]" + Misc[i].eName + "\\[", "g");
		result = result.replace(pattern, "]" + Misc[i].cName + "[");
		}

	for (var i = 0; i < ResultInterface.length; ++i)
		{
		pattern = new RegExp(ResultInterface[i].eName, "g");
		result = result.replace(pattern, ResultInterface[i].cName);
		}

	for (var i = 0; i < attrs.length; ++i)
		{
		pattern = new RegExp("\\]" + attrs[i].eName + "\\[", "g");
		result = result.replace(pattern, "]" + attrs[i].cName + "[");

		pattern = new RegExp("x" + attrs[i].eShort + " \\(", "g");
		result = result.replace(pattern, "x" + attrs[i].cName + " (");
		pattern = new RegExp("(\\+ |\\]|\\()" + attrs[i].eShort + "/", "g");
		result = result.replace(pattern, "$1" + attrs[i].cName + "/");
		pattern = new RegExp("\\+ " + attrs[i].eShort + " \\(", "g");
		result = result.replace(pattern, "+ " + attrs[i].cName + " (");
		}
	
	TextAreas[0].value = result;
	return;
	}

////////////////////////////////////////////////////////////////
// For input page:

// Translate interface text
for (var i = 0; i < Interface.length; ++i)
	{
	var pattern = new RegExp(Interface[i].eName, "g");
	document.body.innerHTML = document.body.innerHTML.replace(pattern, Interface[i].cName);
	}

// Freeze useless selects
var FrozenSelects = new Array();
var allSelects = document.getElementsByTagName('select');
for (var i = 0; i < allSelects.length; ++i)
	{
	var thisSelect = allSelects[i];
	if (thisSelect.name == "template" || thisSelect.name == "welt")
		{
		thisSelect.disabled = "disabled";
		FrozenSelects.push(thisSelect);
		}
	}

// Add button event
var allInputs = document.getElementsByTagName('input');
for (var i = 0; i < allInputs.length; ++i)
	{
	var thisInput = allInputs[i];
	if (thisInput.value == "转换")
		thisInput.addEventListener("mousedown", TranslateInput, false);
	}

////////////////////////////////////////////////////////////////
// Functions

// Translate Input text
function TranslateInput()
	{
	var TextAreas = document.getElementsByName("eingabe");
	var att = TextAreas[0].value;
	for (var i = 0; i < attrs.length; ++i)
		{
		var pattern = new RegExp("\\n" + attrs[i].cName + " \\t", "g");
		att = att.replace(pattern, "\n" + attrs[i].eName + " \t");
		}
	for (var i = 0; i < Misc.length; ++i)
		{
		var pattern = new RegExp("\\n" + Misc[i].cName + " \\t", "g");
		att = att.replace(pattern, "\n" + Misc[i].eName + " \t");
		var pattern = new RegExp("\\t" + Misc[i].cName + "( :|:| \\t)", "g");
		att = att.replace(pattern, "\t" + Misc[i].eName + "$1");
		}
	TextAreas[0].value = att;

	TextAreas = document.getElementsByName("fertigkeiten");
	var skill = TextAreas[0].value;
	for (var i = 0; i < skills.length; ++i)
		{
		var pattern = new RegExp("\\t" + skills[i].cName + " \\t", "g");
		skill = skill.replace(pattern, "\t" + skills[i].eName + " \t");
		}
	// Skills that haven't learned
	skill = skill.replace(/\t([0-9]{1,2})级后可学习 \t/g, "\tat level $1 \t");

	TextAreas[0].value = skill;
	
	// Unfreeze useless selects
	for (var i = 0; i < FrozenSelects.length; ++i)
		FrozenSelects[i].removeAttribute("disabled");
	}
