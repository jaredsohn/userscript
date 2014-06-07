// ==UserScript==
// ***********************************
// @name         # felplacerad
// @version      0.0.1
// @author       dennis.bdn@gmail.com
// ***********************************
// ==/UserScript==

//@Player Settings
set 	clan 				"^1#"
set 	name 				"^7felplacerad"
set 	ui_clantagpos 		"1"
set 	sex 				"male"
set 	cg_forcemodel 		"1"
set 	model 			"visor"
set	cg_forceTeamModel		"crash/bright"			// Team-mates model
set	cg_forceEnemyModel	"keel/bright"			// Enemy model 
set	cg_enemyUpperColor	"0x00FF00FF"			// Green
set	cg_enemyLowerColor	"0x00FF00FF"			// Green
set	cg_enemyHeadColor		"0x000000FF"			// Black
set	cg_teamUpperColor		"0xFF00FFFF"			// Pink
set	cg_teamLowerColor		"0xFF00FFFF"			// Pink
set	cg_teamHeadColor		"0xFFFFFFFF"			// White
set	cg_forcemodel		"1"
set	cg_deadBodyDarken		"1"

//@General Settings
set 	com_allowconsole 		"1"
set 	cg_drawfps 			"1"
set 	com_maxfps 			"125"
set 	cg_drawtimer 		"1"
set 	cg_leveltimerdirection "1"
set 	cg_lagometer 		"1"
set 	cg_kickscale 		"0"
set 	cg_bob 			"0"
set 	cg_fov 			"110"
set 	cg_zoomfov 			"20"
set 	cg_newweaponbar 		"1"

//@Rail Settings
set 	r_railwidth 		"11"
set 	r_railcorewidth 		"4"
set 	r_railsegmentlength 	"4"
set 	cg_railtrailtime 		"1500"
set 	color1 			"6"
set 	color2 			"6"
set 	cg_oldrail 			"1"

//@Others
set	cg_smokeRadius_GL		"0"				// Grenade smoke size
set	cg_smokeRadius_RL		"0"				// Rocket smoke size
set	cg_smoke_SG			"0"				// Shotgun smoke
set	cg_muzzleFlash		"0"
set	cg_lightningImpact 	"0"	

//@Hud Settings
set 	ui_bigfont 			"0.3"
set 	ui_smallfont 		"0.18"
set 	cg_drawcrosshairnames 	"1"
set 	cg_crosshairhealth 	"0"
set 	cg_crosshaircolor 	"7"
set 	cg_drawstatus 		"1"

//@Video Settings
set 	r_fullscreen 		"1"
set 	r_dynamiclight 		"0"
set 	r_shadows 			"0"
set 	r_enablepostprocess 	"0"
set 	r_picmip 			"10"
set 	r_gamma 			"2.8"
set 	r_fullbright 		"0"
set 	r_overbrightbits 		"0"
set 	r_mapoverbrightbits 	"2"
set 	r_vertexlight 		"1"
set 	r_fastsky 			"1"
set 	r_mode 			"-1" //-1
set 	r_customwidth 		"1440" //1680
set 	r_customheight 		"1080" //1050
set 	r_fullscreen 		"1"
set 	r_displayrefresh 		""
set 	cg_draw3dicons 		"0"
set 	cg_simpleitems 		"1"
set 	cg_marks 			"0"
set 	cg_noprojectiletrail 	"0"
vid_restart

//@Sound Settings
set 	s_volume  			"1"
set 	s_musicvolume  		"0"

//@Weapon Settings
set 	cg_drawgun 			"2"
set 	cg_autoswitch 		"0"
set 	cg_switchonempty  	"1"
set 	cg_brasstime 		"0"
set 	cg_truelightning  	"1"

//@Mouse Settings
//set 	cl_mouseaccel 	"0"
//set 	sensitivity 	"4.4"
//set 	in_mouse 		"2"
//set 	m_filter 		"0"

//----
in_mouse "1"
set 	sensitivity 		"5.7"
set 	cl_mouseAccel 		"0"
set 	cl_mouseAccelStyle 	"0"
set 	cl_mouseAccelOffset 	"5"
set 	m_yaw 			"0.022"
set 	m_forward 			"0.25"
set 	m_side 			"0.25"
set 	m_filter 			"0"
//-----

//@Network Settings
set 	rate 				"25000"
set 	cl_maxpackets 		"100"
set 	cg_smoothclients 		"1" // 

//@Demo record on/off toggle
set 	demoon 			"record; set nextdemo vstr demooff"
set 	demooff 			"stoprecord; set nextdemo vstr demoon"
set 	nextdemo 			"vstr demoon"
bind 	f4 				"vstr nextdemo"

//@Keybinds
bind 	escape 			"togglemenu"
bind 	` 				"toggleconsole"
bind 	tab 				"+scores"
bind 	f1 				"vote yes"
bind 	f2 				"vote no"
bind 	f3 				"readyup"
bind 	f11 				"screenshotjpeg"
bind 	w 				"+forward"
bind 	s 				"+back"
bind 	a 				"+moveleft"
bind 	d 				"+moveright"
bind 	mouse1 			"+attack"
bind 	mouse2 			"+moveup"
bind 	space 			"+moveup"
bind 	c 				"+movedown"
bind 	ctrl 				"+speed"
bind  INS				"vstr maplist"


//@Saybinds
bind 	Y 				"messagemode"
bind 	U 				"messagemode2"
bind 	p 				"messagemode ^1"

//@Weaponbinds
bind 	MOUSE3 			"vstr gauntlet"
bind 	mwheelup 			"vstr machinegun"
bind 	mwheeldown 			"vstr shotgun"
bind 	G 				"vstr grenadelauncher"
bind 	Q 				"vstr rocketlauncher"
bind 	F 				"vstr lightninggun"
bind 	E 				"vstr railgun"
bind 	R 				"vstr plasmagun"
bind 	J 				"vstr bigfuckinggun"

//@chat
bind 	1 				"say ^2(:"
bind 	2 				"say ^1:("
bind 	3 				"say ^2 Hi!"
bind  4 				"say ^2gl hf"	
bind 	5 				"say ^1wft^7!"



