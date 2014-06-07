// ==UserScript==
// @name           Quake-Config
// @namespace      std
// @include        http://larkinor.index.hu/*
// ==/UserScript==

seta com_allowConsole "1" 

seta clan "^7rape."
seta name "^7i^1i^7Pon"

NEW CVARS:

seta cg_screenDamage_Self 1
seta cg_screenDamage 1
seta cg_HitBeep 3
seta cg_impactSparks 1
seta cg_speedometer 0
seta cg_simpleitems 1
seta cg_noProjectileTrail 1
seta cg_autoswitch 0
seta cg_marks 0
seta cg_scorePlums 0
seta cg_brasstime 0

seta m_filter "0"
seta m_yaw "0.022"
seta m_pitch "0.022"
seta cl_mouseAccel "0"
seta cl_mouseAccelOffset "5"
seta cl_mouseSensCap "0"
seta cl_mouseAccelStyle "0"
seta m_forward "0.25"
seta m_side "0.25"
seta in_mouse "1"
seta cg_zoomSensitivity "0"

seta cg_fov "110"
seta cg_truelightning 1

seta r_dynamiclight 0
seta s_ambient 0
seta s_musicvolume 0
seta s_doppler 0

seta r_gamma 1.5
seta r_mapoverbrightbits 1
seta r_intensity 1.2
seta r_ignorehwgamma 1
seta r_dynamiclight 0
seta r_smp 0

seta bot_nochat 1

seta cg_bob 0
seta cg_bobroll "0"
seta cg_bobpitch "0"
seta cg_bob "0"
seta cg_kickscale 0
seta cg_leveltimerdirection 1
seta cg_muzzleFlash "0"
seta cg_waterWarp "0"

seta cg_smokeRadius_NG "0"
seta cg_noprojectiletrail 1
seta cg_buzzerSound "1"
seta cg_allowTaunt "0"
seta cg_autoaction "3"
seta cg_enableRespawnTimer "1"
seta cg_lightningImpact "1"
seta cg_smoke_SG "0"
seta cg_smokeRadius_GL "0"
seta cg_smokeRadius_RL "0"
seta cg_switchToEmpty "0"
seta cg_deadBodyDarken "1"
seta cg_bubbleTrail "0"
seta cg_predictItems "1"
seta cg_viewsize "100"

seta cg_forcemodel 0
seta cg_forceenemymodel "keel/bright"
seta cg_scaleplayermodelstobb "0"
seta cg_enemyLowerColor "0x33ff00ff"
seta cg_enemyUpperColor "0x33ff00ff"
seta cg_enemyHeadColor "0x33ff00ff"

seta cl_maxpackets 125
seta rate 25000
seta snaps 30
seta cg_smoothClients "0.5"
seta cl_packetudp "1"

seta pb_sleep 500
seta pb_security 0
seta cl_punkbuster 1

play sound/misc/menu2

bind 2 "say ^7I'm not a ^6Teddy Bear^7...,dear visitor of ^3Yellowstone^7:/"
bind 3 "say ^5\o/ ^7vs. ^6\o/^7,^6\o/^7,^6\o/ ^7easyjob:)"
bind 4 "say ^5\o/ ^7vs. ^6\o/^7,^6\o/^7,^6\o/^7,^6\o/ ^7Need to concentrate:)"
bind 5 "say ^5\o/ ^7vs. ^6\o/^7,^6\o/^7,^6\o/^7,^6\o/^7,^6\o/ ^7Beast-challange:)"
bind 6 "say ^5\o/ ^7vs. ^6\o/^7,^6\o/^7,^6\o/^7,^6\o/^7,^6\o/^7,^6\o/ ^7Impossible, or what?:)"
bind 7 "say ^5Killing enemy Bastards: ^2DONE"
bind 8 "say ^7Ge^1tt^7ing fra^1gg^7ed by epic-^1lucker^7:("
bind 9 "say_team Don't shoot me mate ffs, im not an ^6ENEMY^7..."

bind l "say ^2d^7[^1^^7_^1^^7]^2b"
bind m "say ^5Nice:)"
bind n "say_team Nice:)"
bind h "say ^1T^7h^2x ^5:)"
bind i "seta in_restart"

seta cg_crosshairSize 64

bind q weapon 5 "seta cg_crosshairSize 64"
bind e weapon 7 "seta cg_crosshairSize 34"
bind f weapon 3 "seta cg_crosshairSize 64"

clear
