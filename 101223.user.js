// ==UserScript==
// @name           LSL posting tool for community.secondlife.com
// @namespace      http://sites.google.com/site/cerisesorbet/
// @description    Add or remove colors for LSL code in pre blocks
// @include        http://community.secondlife.com/*
// ==/UserScript==

/*
  ©2011 Cerise Sorbet. This work is licensed under a Creative Commons
  Attribution-ShareAlike 3.0 United States License. For details see
  http://creativecommons.org/licenses/by-sa/3.0/us
*/

/*
  --- CHANGES ---
  2011-05-15  Temporarily remove wrapping fix because the new editor does not like it.
  2011-04-17  llGetEnv and prerelease functions, plus related constants
  2011-04-17  special case reserved words print, event; special highlights for jump, @, default, state; typos
  2011-04-16  move decimal ints to end of list, to capture floats w/trailing period
  ---------------
*/

// Maybe set 'other' and 'word' to '' to save
// more space.
var lslColors = {
  comment: '#C7622B', // burnt orange
  bad: '#FF0000', // bright red
  number: '#6666FF', // light bright blue
  string: '#008888', // turquoise blue
  type: '#339933', // mid green
  keyword: '#0000CC', // medium blue
  state: '#660099', // deep violet
  statename: '#BF00FF', // bright purple
  jump: '#0892D0', // deep electric blue
  constant: '#CC0099', // pinkish magenta
  word: '#555555', // 33% gray
  punctuation: '', // picked up by div color
  llfunction: '#A8090D', // Ferrari red
  other: ''
};

// I double dog dare you to say this ten times fast.
var lslTokens = {
  comment: /^(\/\/(?:.|[\r\n]*\s*\/\/)*|\/\*(?:.|[\r\n])*?\*\/)/,
  bad: /^\/\*(?:.|[\r\n])*?$/, // dangling /*
  number: /^(?:0[xX][a-fA-F\d]+|\d+[Ee][+-]?\d+|\d*\.\d+(?:[Ee][+-]?\d+)?[fF]?|^\d+\.\d*(?:[Ee][+-]?\d+)?[fF]?|\d+)/,
  string: /^\"(?:\\.|[^\\\"])*\"/,
  punctuation: /^(?:\+\+|--|\+=|-=|\*=|\/=|%=|&&|\|\||<<|>>|==|\!=|>=|<=|;|\{|\}|,|=|\(|\)|-|\+|\*|\/|%|:|>|<|\]|\[|&|\||\^|~|\!)/,
  word: /^([a-zA-Z_]\w*|@)/,
  space: /^\s+/
};

// Second pass matches for lslTokens['word']
var lslWords = {
  bad: ['event', 'print'],
  statename: ['default', 'state'],
  jump: ['jump', '@'],
  type: ['integer', 'float', 'string', 'key', 'vector', 'quaternion', 'rotation', 'list'],
  keyword: ['return', 'if', 'else', 'for', 'do', 'while'],
  state: [
    'state_entry', 'state_exit', 'touch_start', 'touch', 'touch_end', 'collision_start', 'collision',
    'collision_end', 'land_collision_start', 'land_collision', 'land_collision_end', 'timer', 'listen',
    'sensor', 'no_sensor', 'control', 'at_target', 'not_at_target', 'at_rot_target',
    'not_at_rot_target', 'money', 'email', 'run_time_permissions', 'changed', 'attach', 'dataserver',
    'moving_start', 'moving_end', 'link_message', 'on_rez', 'object_rez', 'remote_data',
    'http_response', 'http_request'
    ],
  // The SL editor colors constants differently by type, but this is already big enough.
  constant: [
    'TRUE', 'FALSE',
    'STATUS_PHYSICS', 'STATUS_ROTATE_X', 'STATUS_ROTATE_Y', 'STATUS_ROTATE_Z', 'STATUS_PHANTOM',
    'STATUS_SANDBOX', 'STATUS_BLOCK_GRAB', 'STATUS_DIE_AT_EDGE', 'STATUS_RETURN_AT_EDGE',
    'STATUS_CAST_SHADOWS',
    'AGENT_FLYING', 'AGENT_ATTACHMENTS', 'AGENT_SCRIPTED', 'AGENT_MOUSELOOK', 'AGENT_SITTING',
    'AGENT_ON_OBJECT', 'AGENT_AWAY', 'AGENT_WALKING', 'AGENT_IN_AIR', 'AGENT_TYPING',
    'AGENT_CROUCHING', 'AGENT_BUSY', 'AGENT_ALWAYS_RUN', 'AGENT_AUTOPILOT',
    'CAMERA_PITCH', 'CAMERA_FOCUS_OFFSET', 'CAMERA_POSITION_LAG', 'CAMERA_FOCUS_LAG', 'CAMERA_DISTANCE',
    'CAMERA_BEHINDNESS_ANGLE', 'CAMERA_BEHINDNESS_LAG', 'CAMERA_POSITION_THRESHOLD', 'CAMERA_FOCUS_THRESHOLD',
    'CAMERA_ACTIVE', 'CAMERA_POSITION', 'CAMERA_FOCUS', 'CAMERA_POSITION_LOCKED', 'CAMERA_FOCUS_LOCKED',
    'ANIM_ON',  'LOOP', 'REVERSE', 'PING_PONG', 'SMOOTH', 'ROTATE', 'SCALE',
    'ALL_SIDES', 'LINK_ROOT', 'LINK_SET', 'LINK_ALL_OTHERS', 'LINK_ALL_CHILDREN', 'LINK_THIS',
    'AGENT', 'ACTIVE', 'PASSIVE', 'SCRIPTED',
    'CONTROL_FWD', 'CONTROL_BACK', 'CONTROL_LEFT', 'CONTROL_RIGHT', 'CONTROL_ROT_LEFT', 'CONTROL_ROT_RIGHT',
    'CONTROL_UP', 'CONTROL_DOWN', 'CONTROL_LBUTTON', 'CONTROL_ML_LBUTTON',
    'PERMISSION_DEBIT', 'PERMISSION_TAKE_CONTROLS', 'PERMISSION_REMAP_CONTROLS',
    'PERMISSION_TRIGGER_ANIMATION', 'PERMISSION_ATTACH', 'PERMISSION_RELEASE_OWNERSHIP',
    'PERMISSION_CHANGE_LINKS', 'PERMISSION_CHANGE_JOINTS', 'PERMISSION_CHANGE_PERMISSIONS',
    'PERMISSION_TRACK_CAMERA', 'PERMISSION_CONTROL_CAMERA',
    'INVENTORY_TEXTURE', 'INVENTORY_SOUND', 'INVENTORY_OBJECT', 'INVENTORY_SCRIPT', 'INVENTORY_LANDMARK',
    'INVENTORY_CLOTHING', 'INVENTORY_NOTECARD', 'INVENTORY_BODYPART', 'INVENTORY_ANIMATION',
    'INVENTORY_GESTURE', 'INVENTORY_ALL', 'INVENTORY_NONE',
    'CHANGED_INVENTORY', 'CHANGED_COLOR', 'CHANGED_SHAPE', 'CHANGED_SCALE', 'CHANGED_TEXTURE', 'CHANGED_LINK',
    'CHANGED_ALLOWED_DROP', 'CHANGED_OWNER', 'CHANGED_REGION', 'CHANGED_TELEPORT', 'CHANGED_REGION_START',
    'CHANGED_MEDIA',
    'OBJECT_UNKNOWN_DETAIL', 'OBJECT_NAME',  'OBJECT_DESC', 'OBJECT_POS', 'OBJECT_ROT', 'OBJECT_VELOCITY',
    'OBJECT_OWNER', 'OBJECT_GROUP', 'OBJECT_CREATOR',
    'TYPE_INTEGER', 'TYPE_FLOAT', 'TYPE_STRING', 'TYPE_KEY', 'TYPE_VECTOR', 'TYPE_ROTATION', 'TYPE_INVALID',
    'NULL_KEY', 'EOF',
    'URL_REQUEST_GRANTED', 'URL_REQUEST_DENIED',
    'PI', 'TWO_PI', 'PI_BY_TWO', 'DEG_TO_RAD', 'RAD_TO_DEG', 'SQRT2',
    'DEBUG_CHANNEL', 'PUBLIC_CHANNEL',
    'ZERO_VECTOR', 'ZERO_ROTATION',
    'ATTACH_CHEST', 'ATTACH_HEAD', 'ATTACH_LSHOULDER', 'ATTACH_RSHOULDER', 'ATTACH_LHAND', 'ATTACH_RHAND',
    'ATTACH_LFOOT', 'ATTACH_RFOOT', 'ATTACH_BACK', 'ATTACH_PELVIS', 'ATTACH_MOUTH', 'ATTACH_CHIN',
    'ATTACH_LEAR', 'ATTACH_REAR','ATTACH_LEYE', 'ATTACH_REYE', 'ATTACH_NOSE', 'ATTACH_RUARM', 'ATTACH_RLARM',
    'ATTACH_LUARM', 'ATTACH_LLARM', 'ATTACH_RHIP', 'ATTACH_RULEG', 'ATTACH_RLLEG', 'ATTACH_LHIP',
    'ATTACH_LULEG', 'ATTACH_LLLEG', 'ATTACH_BELLY', 'ATTACH_RPEC', 'ATTACH_LPEC', 'ATTACH_HUD_CENTER_2',
    'ATTACH_HUD_TOP_RIGHT', 'ATTACH_HUD_TOP_CENTER', 'ATTACH_HUD_TOP_LEFT', 'ATTACH_HUD_CENTER_1',
    'ATTACH_HUD_BOTTOM_LEFT', 'ATTACH_HUD_BOTTOM', 'ATTACH_HUD_BOTTOM_RIGHT',
    'LAND_LEVEL', 'LAND_RAISE', 'LAND_LOWER', 'LAND_SMOOTH', 'LAND_NOISE', 'LAND_REVERT',
    'LAND_SMALL_BRUSH', 'LAND_MEDIUM_BRUSH', 'LAND_LARGE_BRUSH',	
    'DATA_ONLINE', 'DATA_NAME', 'DATA_BORN', 'DATA_RATING', 'DATA_SIM_POS', 'DATA_SIM_STATUS',
    'DATA_SIM_RATING', 'DATA_PAYINFO',
    'PAYMENT_INFO_ON_FILE', 'PAYMENT_INFO_USED',
    'REMOTE_DATA_CHANNEL', 'REMOTE_DATA_REQUEST', 'REMOTE_DATA_REPLY',
    'PSYS_PART_FLAGS',  'PSYS_PART_START_COLOR', 'PSYS_PART_START_ALPHA', 'PSYS_PART_START_SCALE',
    'PSYS_PART_END_COLOR', 'PSYS_PART_END_ALPHA', 'PSYS_PART_END_SCALE', 'PSYS_PART_MAX_AGE',
    'PSYS_PART_WIND_MASK', 'PSYS_PART_INTERP_COLOR_MASK', 'PSYS_PART_INTERP_SCALE_MASK',
    'PSYS_PART_BOUNCE_MASK', 'PSYS_PART_FOLLOW_SRC_MASK', 'PSYS_PART_FOLLOW_VELOCITY_MASK',
    'PSYS_PART_TARGET_POS_MASK', 'PSYS_PART_EMISSIVE_MASK', 'PSYS_PART_TARGET_LINEAR_MASK',
    'PSYS_SRC_MAX_AGE', 'PSYS_SRC_PATTERN', 'PSYS_SRC_INNERANGLE', 'PSYS_SRC_OUTERANGLE',
    'PSYS_SRC_ANGLE_BEGIN', 'PSYS_SRC_ANGLE_END', 'PSYS_SRC_BURST_RATE', 'PSYS_SRC_BURST_PART_COUNT',
    'PSYS_SRC_BURST_RADIUS', 'PSYS_SRC_BURST_SPEED_MIN', 'PSYS_SRC_BURST_SPEED_MAX', 'PSYS_SRC_ACCEL',
    'PSYS_SRC_TEXTURE', 'PSYS_SRC_TARGET_KEY', 'PSYS_SRC_OMEGA',
    'PSYS_SRC_OBJ_REL_MASK',
    'PSYS_SRC_PATTERN_DROP', 'PSYS_SRC_PATTERN_EXPLODE', 'PSYS_SRC_PATTERN_ANGLE',
    'PSYS_SRC_PATTERN_ANGLE_CONE', 'PSYS_SRC_PATTERN_ANGLE_CONE_EMPTY',
    'VEHICLE_TYPE_NONE', 'VEHICLE_TYPE_SLED', 'VEHICLE_TYPE_CAR', 'VEHICLE_TYPE_BOAT',
    'VEHICLE_TYPE_AIRPLANE', 'VEHICLE_TYPE_BALLOON',
    'VEHICLE_REFERENCE_FRAME', 'VEHICLE_LINEAR_FRICTION_TIMESCALE', 'VEHICLE_ANGULAR_FRICTION_TIMESCALE',
    'VEHICLE_LINEAR_MOTOR_DIRECTION', 'VEHICLE_ANGULAR_MOTOR_DIRECTION', 'VEHICLE_LINEAR_MOTOR_OFFSET',
    'VEHICLE_HOVER_HEIGHT', 'VEHICLE_HOVER_EFFICIENCY', 'VEHICLE_HOVER_TIMESCALE', 'VEHICLE_BUOYANCY',
    'VEHICLE_LINEAR_DEFLECTION_EFFICIENCY', 'VEHICLE_LINEAR_DEFLECTION_TIMESCALE',
    'VEHICLE_LINEAR_MOTOR_TIMESCALE', 'VEHICLE_LINEAR_MOTOR_DECAY_TIMESCALE',
    'VEHICLE_ANGULAR_DEFLECTION_EFFICIENCY', 'VEHICLE_ANGULAR_DEFLECTION_TIMESCALE',
    'VEHICLE_ANGULAR_MOTOR_TIMESCALE', 'VEHICLE_ANGULAR_MOTOR_DECAY_TIMESCALE',
    'VEHICLE_VERTICAL_ATTRACTION_EFFICIENCY', 'VEHICLE_VERTICAL_ATTRACTION_TIMESCALE',
    'VEHICLE_BANKING_EFFICIENCY', 'VEHICLE_BANKING_MIX', 'VEHICLE_BANKING_TIMESCALE',	
    'VEHICLE_FLAG_NO_FLY_UP', 'VEHICLE_FLAG_NO_DEFLECTION_UP', 'VEHICLE_FLAG_LIMIT_ROLL_ONLY',
    'VEHICLE_FLAG_HOVER_WATER_ONLY', 'VEHICLE_FLAG_HOVER_TERRAIN_ONLY', 'VEHICLE_FLAG_HOVER_GLOBAL_HEIGHT',
    'VEHICLE_FLAG_HOVER_UP_ONLY', 'VEHICLE_FLAG_LIMIT_MOTOR_UP', 'VEHICLE_FLAG_MOUSELOOK_STEER',
    'VEHICLE_FLAG_MOUSELOOK_BANK', 'VEHICLE_FLAG_CAMERA_DECOUPLED',
    'PRIM_TYPE', 'PRIM_MATERIAL', 'PRIM_PHYSICS', 'PRIM_FLEXIBLE', 'PRIM_POINT_LIGHT', 'PRIM_TEMP_ON_REZ',
    'PRIM_PHANTOM', 'PRIM_CAST_SHADOWS', 'PRIM_POSITION', 'PRIM_SIZE', 'PRIM_ROTATION', 'PRIM_TEXTURE',
    'PRIM_COLOR', 'PRIM_BUMP_SHINY', 'PRIM_FULLBRIGHT', 'PRIM_TEXGEN', 'PRIM_GLOW',
    'PRIM_TYPE_BOX', 'PRIM_TYPE_CYLINDER', 'PRIM_TYPE_PRISM', 'PRIM_TYPE_SPHERE', 'PRIM_TYPE_TORUS',
    'PRIM_TYPE_TUBE', 'PRIM_TYPE_RING', 'PRIM_TYPE_SCULPT',
    'PRIM_HOLE_DEFAULT', 'PRIM_HOLE_CIRCLE', 'PRIM_HOLE_SQUARE', 'PRIM_HOLE_TRIANGLE',
    'PRIM_MATERIAL_STONE', 'PRIM_MATERIAL_METAL', 'PRIM_MATERIAL_GLASS', 'PRIM_MATERIAL_WOOD',
    'PRIM_MATERIAL_FLESH', 'PRIM_MATERIAL_PLASTIC', 'PRIM_MATERIAL_RUBBER', 'PRIM_MATERIAL_LIGHT',
    'PRIM_SHINY_NONE', 'PRIM_SHINY_LOW', 'PRIM_SHINY_MEDIUM', 'PRIM_SHINY_HIGH',
    'PRIM_BUMP_NONE', 'PRIM_BUMP_BRIGHT', 'PRIM_BUMP_DARK', 'PRIM_BUMP_WOOD', 'PRIM_BUMP_BARK',
    'PRIM_BUMP_BRICKS', 'PRIM_BUMP_CHECKER', 'PRIM_BUMP_CONCRETE', 'PRIM_BUMP_TILE', 'PRIM_BUMP_STONE',
    'PRIM_BUMP_DISKS', 'PRIM_BUMP_GRAVEL', 'PRIM_BUMP_BLOBS', 'PRIM_BUMP_SIDING', 'PRIM_BUMP_LARGETILE',
    'PRIM_BUMP_STUCCO', 'PRIM_BUMP_SUCTION', 'PRIM_BUMP_WEAVE',
    'PRIM_TEXGEN_DEFAULT', 'PRIM_TEXGEN_PLANAR',
    'PRIM_SCULPT_TYPE_SPHERE', 'PRIM_SCULPT_TYPE_TORUS', 'PRIM_SCULPT_TYPE_PLANE',
    'PRIM_SCULPT_TYPE_CYLINDER', 'PRIM_SCULPT_TYPE_MASK', 'PRIM_SCULPT_FLAG_MIRROR',
    'PRIM_SCULPT_FLAG_INVERT', 'PRIM_DESC', 'PRIM_TEXT', 'PRIM_NAME',
    'MASK_BASE', 'MASK_OWNER', 'MASK_GROUP', 'MASK_EVERYONE', 'MASK_NEXT',
    'PERM_TRANSFER', 'PERM_MODIFY', 'PERM_COPY', 'PERM_MOVE', 'PERM_ALL',
    'PARCEL_MEDIA_COMMAND_STOP', 'PARCEL_MEDIA_COMMAND_PAUSE', 'PARCEL_MEDIA_COMMAND_PLAY',
    'PARCEL_MEDIA_COMMAND_LOOP', 'PARCEL_MEDIA_COMMAND_TEXTURE', 'PARCEL_MEDIA_COMMAND_URL',
    'PARCEL_MEDIA_COMMAND_TIME', 'PARCEL_MEDIA_COMMAND_AGENT', 'PARCEL_MEDIA_COMMAND_UNLOAD',
    'PARCEL_MEDIA_COMMAND_AUTO_ALIGN', 'PARCEL_MEDIA_COMMAND_TYPE', 'PARCEL_MEDIA_COMMAND_SIZE',
    'PARCEL_MEDIA_COMMAND_DESC', 'PARCEL_MEDIA_COMMAND_LOOP_SET',
    'LIST_STAT_MAX', 'LIST_STAT_MIN', 'LIST_STAT_MEAN', 'LIST_STAT_MEDIAN', 'LIST_STAT_STD_DEV',
    'LIST_STAT_SUM', 'LIST_STAT_SUM_SQUARES', 'LIST_STAT_NUM_COUNT', 'LIST_STAT_GEOMETRIC_MEAN',
    'LIST_STAT_RANGE',
    'PAY_HIDE', 'PAY_DEFAULT',
    'PARCEL_FLAG_ALLOW_FLY', 'PARCEL_FLAG_ALLOW_GROUP_SCRIPTS', 'PARCEL_FLAG_ALLOW_SCRIPTS',
    'PARCEL_FLAG_ALLOW_LANDMARK', 'PARCEL_FLAG_ALLOW_TERRAFORM', 'PARCEL_FLAG_ALLOW_DAMAGE',
    'PARCEL_FLAG_ALLOW_CREATE_OBJECTS', 'PARCEL_FLAG_ALLOW_CREATE_GROUP_OBJECTS',
    'PARCEL_FLAG_USE_ACCESS_GROUP', 'PARCEL_FLAG_USE_ACCESS_LIST', 'PARCEL_FLAG_USE_BAN_LIST',
    'PARCEL_FLAG_USE_LAND_PASS_LIST', 'PARCEL_FLAG_LOCAL_SOUND_ONLY', 'PARCEL_FLAG_RESTRICT_PUSHOBJECT',
    'PARCEL_FLAG_ALLOW_GROUP_OBJECT_ENTRY', 'PARCEL_FLAG_ALLOW_ALL_OBJECT_ENTRY',
    'REGION_FLAG_ALLOW_DAMAGE', 'REGION_FLAG_FIXED_SUN', 'REGION_FLAG_BLOCK_TERRAFORM',
    'REGION_FLAG_SANDBOX', 'REGION_FLAG_DISABLE_COLLISIONS', 'REGION_FLAG_DISABLE_PHYSICS',
    'REGION_FLAG_BLOCK_FLY', 'REGION_FLAG_ALLOW_DIRECT_TELEPORT', 'REGION_FLAG_RESTRICT_PUSHOBJECT',
    'HTTP_METHOD', 'HTTP_MIMETYPE', 'HTTP_BODY_MAXLENGTH', 'HTTP_BODY_TRUNCATED', 'HTTP_VERIFY_CERT',
    'PARCEL_COUNT_TOTAL', 'PARCEL_COUNT_OWNER', 'PARCEL_COUNT_GROUP', 'PARCEL_COUNT_OTHER',
    'PARCEL_COUNT_SELECTED', 'PARCEL_COUNT_TEMP',
    'PARCEL_DETAILS_NAME', 'PARCEL_DETAILS_DESC', 'PARCEL_DETAILS_OWNER', 'PARCEL_DETAILS_GROUP',
    'PARCEL_DETAILS_AREA',
    'STRING_TRIM_HEAD', 'STRING_TRIM_TAIL', 'STRING_TRIM',
    'CLICK_ACTION_NONE', 'CLICK_ACTION_TOUCH', 'CLICK_ACTION_SIT', 'CLICK_ACTION_BUY', 'CLICK_ACTION_PAY',
    'CLICK_ACTION_OPEN', 'CLICK_ACTION_PLAY', 'CLICK_ACTION_OPEN_MEDIA', 'CLICK_ACTION_ZOOM',
    'TEXTURE_BLANK', 'TEXTURE_DEFAULT', 'TEXTURE_MEDIA', 'TEXTURE_PLYWOOD', 'TEXTURE_TRANSPARENT',
    'TOUCH_INVALID_FACE', 'TOUCH_INVALID_VECTOR', 'TOUCH_INVALID_TEXCOORD',
    'PRIM_MEDIA_ALT_IMAGE_ENABLE', 'PRIM_MEDIA_CONTROLS', 'PRIM_MEDIA_CURRENT_URL', 'PRIM_MEDIA_HOME_URL',
    'PRIM_MEDIA_AUTO_LOOP', 'PRIM_MEDIA_AUTO_PLAY', 'PRIM_MEDIA_AUTO_SCALE', 'PRIM_MEDIA_AUTO_ZOOM',
    'PRIM_MEDIA_FIRST_CLICK_INTERACT', 'PRIM_MEDIA_WIDTH_PIXELS', 'PRIM_MEDIA_HEIGHT_PIXELS',
    'PRIM_MEDIA_WHITELIST_ENABLE', 'PRIM_MEDIA_WHITELIST', 'PRIM_MEDIA_PERMS_INTERACT',
    'PRIM_MEDIA_PERMS_CONTROL', 'PRIM_MEDIA_PARAM_MAX',
    'PRIM_MEDIA_CONTROLS_STANDARD', 'PRIM_MEDIA_CONTROLS_MINI', 'PRIM_MEDIA_PERM_NONE',
    'PRIM_MEDIA_PERM_OWNER', 'PRIM_MEDIA_PERM_GROUP', 'PRIM_MEDIA_PERM_ANYONE',
    'PRIM_MEDIA_MAX_URL_LENGTH', 'PRIM_MEDIA_MAX_WHITELIST_SIZE', 'PRIM_MEDIA_MAX_WHITELIST_COUNT',
    'PRIM_MEDIA_MAX_WIDTH_PIXELS', 'PRIM_MEDIA_MAX_HEIGHT_PIXELS',
    'STATUS_OK', 'STATUS_MALFORMED_PARAMS', 'STATUS_TYPE_MISMATCH', 'STATUS_BOUNDS_ERROR',
    'STATUS_NOT_FOUND', 'STATUS_NOT_SUPPORTED', 'STATUS_INTERNAL_ERROR', 'STATUS_WHITELIST_FAILED',
    // functions in development, names could change or they could be dropped.
    'RC_REJECT_TYPES', 'RC_DATA_FLAGS' , 'RC_MAX_HITS' , 'RC_DETECT_PHANTOM',
    'RC_REJECT_AGENTS', 'RC_REJECT_PHYSICAL', 'RC_REJECT_NONPHYSICAL', 'RC_REJECT_LAND',
    'RC_GET_NORMAL', 'RC_GET_ROOT_KEY', 'RC_GET_LINK_NUM' ,'RCERR_SIM_PERF_LOW', 'RCERR_CAST_TIME_EXCEEDED',
    'PROFILE_NONE', 'PROFILE_SCRIPT_MEMORY'
    ],
  llfunction: [
    'llSin', 'llCos', 'llTan', 'llAtan2', 'llSqrt', 'llPow', 'llAbs', 'llFabs', 'llFrand', 'llFloor',
    'llCeil', 'llRound', 'llVecMag', 'llVecNorm', 'llVecDist', 'llRot2Euler', 'llEuler2Rot', 'llAxes2Rot',
    'llRot2Fwd', 'llRot2Left', 'llRot2Up', 'llRotBetween', 'llWhisper', 'llSay', 'llShout', 'llListen',
    'llListenControl', 'llListenRemove', 'llSensor', 'llSensorRepeat', 'llSensorRemove', 'llDetectedName',
    'llDetectedKey', 'llDetectedOwner', 'llDetectedType', 'llDetectedPos', 'llDetectedVel',
    'llDetectedGrab', 'llDetectedRot', 'llDetectedGroup', 'llDetectedLinkNumber', 'llDie', 'llGround',
    'llCloud', 'llWind', 'llSetStatus', 'llGetStatus', 'llSetScale', 'llGetScale', 'llSetColor',
    'llGetAlpha', 'llSetAlpha', 'llGetColor', 'llSetTexture', 'llScaleTexture', 'llOffsetTexture',
    'llRotateTexture', 'llGetTexture', 'llSetPos', 'llGetPos', 'llGetLocalPos', 'llSetRot', 'llGetRot',
    'llGetLocalRot', 'llSetForce', 'llGetForce', 'llTarget', 'llTargetRemove', 'llRotTarget',
    'llRotTargetRemove', 'llMoveToTarget', 'llStopMoveToTarget', 'llApplyImpulse',
    'llApplyRotationalImpulse', 'llSetTorque', 'llGetTorque', 'llSetForceAndTorque', 'llGetVel',
    'llGetAccel', 'llGetOmega', 'llGetTimeOfDay', 'llGetWallclock', 'llGetTime', 'llResetTime',
    'llGetAndResetTime', 'llSound', 'llPlaySound', 'llLoopSound', 'llLoopSoundMaster', 'llLoopSoundSlave',
    'llPlaySoundSlave', 'llTriggerSound', 'llStopSound', 'llPreloadSound', 'llGetSubString',
    'llDeleteSubString', 'llInsertString', 'llToUpper', 'llToLower', 'llGiveMoney', 'llMakeExplosion',
    'llMakeFountain', 'llMakeSmoke', 'llMakeFire', 'llRezObject', 'llLookAt', 'llStopLookAt',
    'llSetTimerEvent', 'llSleep', 'llGetMass', 'llCollisionFilter', 'llTakeControls', 'llReleaseControls',
    'llAttachToAvatar', 'llDetachFromAvatar', 'llTakeCamera', 'llReleaseCamera', 'llGetOwner',
    'llInstantMessage', 'llEmail', 'llGetNextEmail', 'llGetKey', 'llSetBuoyancy', 'llSetHoverHeight',
    'llStopHover', 'llMinEventDelay', 'llSoundPreload', 'llRotLookAt', 'llStringLength',
    'llStartAnimation', 'llStopAnimation', 'llPointAt', 'llStopPointAt', 'llTargetOmega',
    'llGetStartParameter', 'llGodLikeRezObject', 'llRequestPermissions', 'llGetPermissionsKey',
    'llGetPermissions', 'llGetLinkNumber', 'llSetLinkColor', 'llCreateLink', 'llBreakLink',
    'llBreakAllLinks', 'llGetLinkKey', 'llGetLinkName', 'llGetInventoryNumber', 'llGetInventoryName',
    'llSetScriptState', 'llGetEnergy', 'llGiveInventory', 'llRemoveInventory', 'llSetText', 'llWater',
    'llPassTouches', 'llRequestAgentData', 'llRequestInventoryData', 'llSetDamage', 'llTeleportAgentHome',
    'llModifyLand', 'llCollisionSound', 'llCollisionSprite', 'llGetAnimation', 'llResetScript',
    'llMessageLinked', 'llPushObject', 'llPassCollisions', 'llGetScriptName', 'llGetNumberOfSides',
    'llAxisAngle2Rot', 'llRot2Axis', 'llRot2Angle', 'llAcos', 'llAsin', 'llAngleBetween',
    'llGetInventoryKey', 'llAllowInventoryDrop', 'llGetSunDirection', 'llGetTextureOffset',
    'llGetTextureScale', 'llGetTextureRot', 'llSubStringIndex', 'llGetOwnerKey', 'llGetCenterOfMass',
    'llListSort', 'llGetListLength', 'llList2Integer', 'llList2Float', 'llList2String', 'llList2Key',
    'llList2Vector', 'llList2Rot', 'llList2List', 'llDeleteSubList', 'llGetListEntryType', 'llList2CSV',
    'llCSV2List', 'llListRandomize', 'llList2ListStrided', 'llGetRegionCorner', 'llListInsertList',
    'llListFindList', 'llGetObjectName', 'llSetObjectName', 'llGetDate', 'llEdgeOfWorld', 'llGetAgentInfo',
    'llAdjustSoundVolume', 'llSetSoundQueueing', 'llSetSoundRadius', 'llKey2Name', 'llSetTextureAnim',
    'llTriggerSoundLimited', 'llEjectFromLand', 'llParseString2List', 'llOverMyLand', 'llGetLandOwnerAt',
    'llGetNotecardLine', 'llGetAgentSize', 'llSameGroup', 'llUnSit', 'llGroundSlope', 'llGroundNormal',
    'llGroundContour', 'llGetAttached', 'llGetFreeMemory', 'llGetRegionName', 'llGetRegionTimeDilation',
    'llGetRegionFPS', 'llParticleSystem', 'llGroundRepel', 'llGiveInventoryList', 'llSetVehicleType',
    'llSetVehicleFloatParam', 'llSetVehicleVectorParam', 'llSetVehicleRotationParam', 'llSetVehicleFlags',
    'llRemoveVehicleFlags', 'llSitTarget', 'llAvatarOnSitTarget', 'llAddToLandPassList', 'llSetTouchText',
    'llSetSitText', 'llSetCameraEyeOffset', 'llSetCameraAtOffset', 'llDumpList2String', 'llScriptDanger',
    'llDialog', 'llVolumeDetect', 'llResetOtherScript', 'llGetScriptState', 'llRemoteLoadScript',
    'llSetRemoteScriptAccessPin', 'llRemoteLoadScriptPin', 'llOpenRemoteDataChannel', 'llSendRemoteData',
    'llRemoteDataReply', 'llCloseRemoteDataChannel', 'llMD5String', 'llSetPrimitiveParams',
    'llStringToBase64', 'llBase64ToString', 'llXorBase64Strings', 'llRemoteDataSetRegion', 'llLog10',
    'llLog', 'llGetAnimationList', 'llSetParcelMusicURL', 'llGetRootPosition', 'llGetRootRotation',
    'llGetObjectDesc', 'llSetObjectDesc', 'llGetCreator', 'llGetTimestamp', 'llSetLinkAlpha',
    'llGetNumberOfPrims', 'llGetNumberOfNotecardLines', 'llGetBoundingBox', 'llGetGeometricCenter',
    'llGetPrimitiveParams', 'llIntegerToBase64', 'llBase64ToInteger', 'llGetGMTclock',
    'llGetSimulatorHostname', 'llSetLocalRot', 'llParseStringKeepNulls', 'llRezAtRoot',
    'llGetObjectPermMask', 'llSetObjectPermMask', 'llGetInventoryPermMask', 'llSetInventoryPermMask',
    'llGetInventoryCreator', 'llOwnerSay', 'llRequestSimulatorData', 'llForceMouselook',
    'llGetObjectMass', 'llListReplaceList', 'llLoadURL', 'llParcelMediaCommandList', 'llParcelMediaQuery',
    'llModPow', 'llGetInventoryType', 'llSetPayPrice', 'llGetCameraPos', 'llGetCameraRot', 'llSetPrimURL',
    'llRefreshPrimURL', 'llEscapeURL', 'llUnescapeURL', 'llMapDestination', 'llAddToLandBanList',
    'llRemoveFromLandPassList', 'llRemoveFromLandBanList', 'llSetCameraParams', 'llClearCameraParams',
    'llListStatistics', 'llGetUnixTime', 'llGetParcelFlags', 'llGetRegionFlags',
    'llXorBase64StringsCorrect', 'llHTTPRequest', 'llResetLandBanList', 'llResetLandPassList',
    'llGetObjectPrimCount', 'llGetParcelPrimOwners', 'llGetParcelPrimCount', 'llGetParcelMaxPrims',
    'llGetParcelDetails', 'llSetLinkPrimitiveParams', 'llSetLinkTexture', 'llStringTrim', 'llRegionSay',
    'llGetObjectDetails', 'llSetClickAction', 'llGetRegionAgentCount', 'llTextBox', 'llGetAgentLanguage',
    'llDetectedTouchUV', 'llDetectedTouchFace', 'llDetectedTouchPos',
    'llDetectedTouchNormal', 'llDetectedTouchBinormal', 'llDetectedTouchST', 'llSHA1String',
    'llGetFreeURLs', 'llRequestURL', 'llRequestSecureURL', 'llReleaseURL', 'llHTTPResponse',
    'llGetHTTPHeader', 'llSetPrimMediaParams', 'llGetPrimMediaParams', 'llClearPrimMedia',
    'llSetLinkPrimitiveParamsFast', 'llGetLinkPrimitiveParams', 'llLinkParticleSystem',
    'llSetLinkTextureAnim', 'llGetLinkNumberOfSides', 'llGetUsername', 'llRequestUsername',
    'llGetDisplayName', 'llRequestDisplayName', 'llGetEnv', 'llRegionSayTo',
    // functions in development, names could change or they could be dropped.
    'llCastRay', 'llGetSPMaxMemory', 'llScriptProfiler', 'llGetUsedMemory'
    ]
};



// Minimal entity escaping, about what Lithium appears to use.
function EscapeHTML(s) {
  // Keep /&/ first, else other entities will be mangled
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


// A simplistic tokenizer. Matches with lslToknes, and lslWords
// within 'word' tokens, are wrapped in styled spans per lslColors
function AddColor(s)
{
  var t, i, match, lastToken;
  var rv = "";
  var badWords = lslWords['bad'];
  var jumpWords = lslWords['jump'];
  var wordColor = lslColors['word'] || '';

  while(s.length) {
    for (t in lslTokens) {
      if (match = s.match(lslTokens[t]))
        break;
    }

    if (!match) {
      match = [s[0]];
      t = 'other';
    }

    if (t == 'word') {
      var color = wordColor;
      if (~badWords.indexOf(match[0]))
        color = lslColors['bad'];
      else if (~jumpWords.indexOf(lastToken))
        color = lslColors['jump'];
      else if (lastToken == 'state')
        color = lslColors['statename'];
      else {
        for (wordType in lslWords) {
          if (~lslWords[wordType].indexOf(match[0])) {
            color = lslColors[wordType];
            break;
          }
        }
      }
      rv += color ? '<span style="color:' + color + '">' +  EscapeHTML(match[0]) + '</span>' : EscapeHTML(match[0]);
    }
    else
      rv += lslColors[t] ? '<span style="color:' + lslColors[t] + '">' +  EscapeHTML(match[0]) + '</span>' : EscapeHTML(match[0]);

    if (!~['space', 'comment'].indexOf(t))
        lastToken = match[0];
    s = s.substr(match[0].length);
  }
  return rv;
}


// Show highlight buttons, only if in TinyMCE mode
function SetButtonVisibility() {
  var activeRichTab = document.getElementsByClassName('lia-tabs-active lia-tabs rich-tab');
  var buttons = ['cerise-plain-pre-button', 'cerise-lsl-pre-button'];
  for (var i in buttons) {
    var button = document.getElementById(buttons[i]);
    if (button)
      button.style.display = activeRichTab.length ? '' : 'none';
  }
}

function HighlightPre(useColor) {
  var mceframe = document.getElementById('tinyMceEditor_ifr');
  if (!mceframe)
    return;
  var mceContent = mceframe.contentDocument;
  if (!mceContent)
    return;

  var pre = mceContent.getElementsByTagName('pre');
  var k; for (k = 0; k < pre.length; k++) {
    var source = 'textContent' in pre[k] ? pre[k].textContent : pre[k].innerText;
    if (useColor)
        pre[k].innerHTML = /* '<span style="white-space:pre;">' + */ AddColor(source) /* + '</span>' */;
    else
        pre[k].innerHTML = /* '<span style="white-space:pre;">' + */ EscapeHTML(source) /* + '</span>' */;
  }
}


// Create LSL highlight buttons and install listeners
function MakeButtons() {
  var messageEditor = document.getElementById('messageEditor');
  if (messageEditor) {
    var controls = document.getElementsByClassName('message-editor-controls');
    if (controls.length) {
      var buttonGroup = controls[0].getElementsByClassName('lia-form-submit lia-button-group');
      if (buttonGroup.length) {
        var lslButton = document.createElement('span');
        lslButton.className = 'lia-button-wrapper lia-button-wrapper-secondary';
        lslButton.id = 'cerise-plain-pre-button';
        lslButton.innerHTML = '<a class="lia-button lia-button-secondary">- LSL</span>';
        buttonGroup[0].appendChild(lslButton);
        lslButton.addEventListener('click', function(){HighlightPre(false)}, false);

        lslButton = document.createElement('span');
        lslButton.className = 'lia-button-wrapper lia-button-wrapper-secondary';
        lslButton.id = 'cerise-lsl-pre-button';
        lslButton.innerHTML = '<a class="lia-button lia-button-secondary">+ LSL</span>';
        buttonGroup[0].appendChild(lslButton);
        lslButton.addEventListener('click', function(){HighlightPre(true)}, false);

        SetButtonVisibility();
        var tabGroup = document.getElementById('tabgroup');
        if (tabGroup)
          tabGroup.addEventListener('DOMSubtreeModified', SetButtonVisibility, false);
      }
    }
  }
}

MakeButtons();
