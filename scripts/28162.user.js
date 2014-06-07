// ==UserScript==
// @name           LSL Style
// @namespace      http://home.comcast.net/~mailerdaemon/
// @include        https://wiki.secondlife.com/*
// @include        http://wiki.secondlife.com/*
// @include        http://lslwiki.net/lslwiki/wakka.php?wakka=*
// @include        http://www.lslwiki.net/lslwiki/wakka.php?wakka=*
// @version        1.5
// @author         Strife Onizuka
// @author         Kireji Haiku
// @grant          GM_log
// @grant          GM_addStyle
// ==/UserScript==
(function(){
var GM_addStyle = function(css){
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
    return style;//default GM_addStyle doesn't return the new style element
};

var search = "";
var prefixed = false;
 
if (($X("//meta[@name='generator' and starts-with(@content,'MediaWiki ')]")))
{
    GM_addStyle("table.diff td div {overflow:visible;} pre.code a{ text-decoration:none; }");
    GM_addStyle(".pBody { padding:0pt 0.8em 0.3em 0.5em; border:1px solid #AAAAAA; } .portlet h5 {background: transparent;}");
    prefixs = ["", "/wiki/Special:Search?search="];
    search = "//pre[@class='code' or @class='lsl']";
 
    if ((breadcrumbs = $X("//div[@id='contentSub']")))
    {
        if (!(title = unsafeWindow.realTitleText))
            if (title = $X("//div[@id='ReatTitleBanner']/span[@id='RealTitle']"))
                title = title.textContent;
        if (title && unsafeWindow.wgTitle)
            $Z(".//text()[contains(.,'"+unsafeWindow.wgTitle+"')]",function(r,i,p){
                r.data = r.data.replace(unsafeWindow.wgTitle, title);
            }, breadcrumbs);
    }
 
    GM_addStyle([
                    ".lsl a {font-weight: bold; text-decoration: none;}",
                    ".lsl .imp {font-weight: bold; color: red;}",
                    ".lsl .lsl_states {color: #801A4D;}",
                    ".lsl .lsl_events {color: #004D80;}",
                    ".lsl .lsl_builtin_functions {color: #820124;}",
                    ".lsl .lsl_builtin_constants_integer {color: #1A1A80;}",
                    ".lsl .lsl_builtin_constants_string {color: #1A4D80;}",
                    ".lsl .lsl_builtin_constants_float {color: #4D1A80;}",
                    ".lsl .lsl_builtin_constants_compound {color: #663366;}",
                    ".lsl .lsl_illegal_invalid {font-weight: bold; color: #FFFFFF; background-color: #FF0000; text-decoration: line-through;}",
                    ".lsl .lsl_illegal_deprecated {font-weight: bold; color: #FFFF00; background-color: #FF0000; text-decoration: line-through;}",
                    ".lsl .lsl_control {color: #0000CD;}",
                    ".lsl .lsl_types {color: #003300;}",
                    ".lsl .co1 {color: #CD4D26;}",
                    ".lsl .es0 {color: #CD4D26;}",
                    ".lsl .br0 {color: #66CC66;}",
                    ".lsl .st0 {color: #003300;}",
                    ".lsl .nu0 {color: #cc66cc;}",
                    ".lsl .me1 {color: #006600;}",
                    ".lsl .me2 {color: #006600;}",
                    ""].join("\n"));
}
else
    return;
 
function Group(className, prefix, expression, captures, processor){ this.c = className; this.v = prefix; this.r = expression; this.captures = captures || 0; this.processor = processor;}
Group.prototype = { toString: function(){ return "("+this.r+")"; }, };

var groups = [ //{
    new Group("nu0", -1, "0[xX][0-9a-fA-F]+|\\.[0-9]*[Ee][+-]?[0-9]*|[0-9]+[Ee][+-]?[0-9]*"),
    new Group("lsl_illegal_deprecated", 0, "ll(?:Cloud|CollisionSprite|GodLikeRezObject|Make(?:Explosion|Fountain|Smoke|Fire)|(?:Stop)?PointAt|(?:(?:Refresh|Set)Prim)URL|(?:Take|Release)Camera|RemoteDataSetRegion|RemoteLoadScript|SetInventoryPermMask|Sound(?:Preload)?|XorBase64Strings)|AGENT|DATA_RATING|LAND_(?:LARGE|MEDIUM|SMALL)_BRUSH|PERMISSION_(?:CHANGE_(?:JOINTS|PERMISSIONS)|RELEASE_OWNERSHIP|REMAP_CONTROLS)|PRIM_(?:CAST_SHADOWS|TYPE_LEGACY)|PSYS_SRC_(?:INNER|OUTER)ANGLE|VEHICLE_FLAG_NO_FLY_UP"),
    new Group("lsl_illegal_invalid", 0, "event|print"),
    new Group("lsl_states", 0, "(?:state)\\s+\\w+|default"),
    new Group("lsl_control", 0, "@|do|else(?: if)?|for|if|jump|return|while"),
    new Group("lsl_types", 0, "float|integer|key|list|quaternion|rotation|string|vector"),
    new Group("lsl_events", 0, "state_(?:entry|exit)|touch(?:_(?:start|end))?|(?:land_)?collision(?:_(?:start|end))?|timer|listen|(?:no_)?sensor|control|(?:not_)?at_(?:rot_)?target|money|email|run_time_permissions|changed|attach|dataserver|moving_(?:start|end)|link_message|(?:on|object)_rez|remote_data|http_re(?:sponse|quest)|path_update|transaction_result"),
    new Group("lsl_builtin_constants_integer", 1, "FALSE|TRUE|EOF|NULL_KEY|STATUS_(?:PHYSICS|ROTATE_[XYZ]|PHANTOM|SANDBOX|BLOCK_GRAB(?:_OBJECT)?|(?:DIE|RETURN)_AT_EDGE|CAST_SHADOWS|OK|MALFORMED_PARAMS|TYPE_MISMATCH|BOUNDS_ERROR|NOT_(?:FOUND|SUPPORTED)|INTERNAL_ERROR|WHITELIST_FAILED)|AGENT_(?:BY_(?:LEGACY_|USER)NAME|FLYING|ATTACHMENTS|SCRIPTED|MOUSELOOK|SITTING|ON_OBJECT|AWAY|WALKING|IN_AIR|TYPING|CROUCHING|BUSY|ALWAYS_RUN|AUTOPILOT|LIST_(?:PARCEL(?:_OWNER)?|REGION))|CAMERA_(?:PITCH|DISTANCE|BEHINDNESS_(?:ANGLE|LAG)|(?:FOCUS|POSITION)(?:_(?:THRESHOLD|LOCKED|LAG))?|FOCUS_OFFSET|ACTIVE)|ANIM_ON|LOOP|REVERSE|PING_PONG|SMOOTH|ROTATE|SCALE|ALL_SIDES|LINK_(?:ROOT|SET|ALL_(?:OTHERS|CHILDREN)|THIS)|ACTIVE|PASSIVE|SCRIPTED|CONTROL_(?:FWD|BACK|(?:ROT_)?(?:LEFT|RIGHT)|UP|DOWN|(?:ML_)?LBUTTON)|PERMISSION_(?:DEBIT|OVERRIDE_ANIMATIONS|SILENT_ESTATE_MANAGEMENT|TAKE_CONTROLS|TRIGGER_ANIMATION|ATTACH|CHANGE_LINKS|(?:CONTROL|TRACK)_CAMERA|TELEPORT)|INVENTORY_(?:TEXTURE|SOUND|OBJECT|SCRIPT|LANDMARK|CLOTHING|NOTECARD|BODYPART|ANIMATION|GESTURE|ALL|NONE)|CHANGED_(?:INVENTORY|COLOR|SHAPE|SCALE|TEXTURE|LINK|ALLOWED_DROP|OWNER|REGION(?:_START)?|TELEPORT|MEDIA)|OBJECT_(?:(?:PHYSICS|SERVER|STREAMING)_COST|UNKNOWN_DETAIL|NAME|DESC|POS|PRIM_EQUIVALENCE|ROO?T|VELOCITY|OWNER|GROUP|CREATOR|ATTACHED_POINT|PATHFINDING_TYPE|(?:RUNNING|TOTAL)_SCRIPT_COUNT|SCRIPT_(?:MEMORY|TIME))|TYPE_(?:INTEGER|FLOAT|STRING|KEY|VECTOR|ROTATION|INVALID)|URL_REQUEST_(?:GRANTED|DENIED)|(?:DEBUG|PUBLIC)_CHANNEL|ATTACH_(?:AVATAR_CENTER|CHEST|HEAD|BACK|PELVIS|MOUTH|CHIN|NECK|NOSE|BELLY|[LR](?:SHOULDER|HAND|FOOT|EAR|EYE|[UL](?:ARM|LEG)|HIP)|(?:LEFT|RIGHT)_PEC|HUD_(?:CENTER_[12]|TOP_(?:RIGHT|CENTER|LEFT)|BOTTOM(?:_(?:RIGHT|LEFT))?))|LAND_(?:LEVEL|RAISE|LOWER|SMOOTH|NOISE|REVERT)|DATA_(?:ONLINE|NAME|BORN|SIM_(?:POS|STATUS|RATING)|PAYINFO)|PAYMENT_INFO_(?:ON_FILE|USED)|REMOTE_DATA_(?:CHANNEL|REQUEST|REPLY)|PSYS_(?:PART_(?:FLAGS|(?:START|END)_(?:COLOR|ALPHA|SCALE)|MAX_AGE|(?:WIND|INTERP_(?:COLOR|SCALE)|BOUNCE|FOLLOW_(?:SRC|VELOCITY)|TARGET_(?:POS|LINEAR)|EMISSIVE)_MASK)|SRC_(?:MAX_AGE|PATTERN|ANGLE_(?:BEGIN|END)|BURST_(?:RATE|PART_COUNT|RADIUS|SPEED_(?:MIN|MAX))|ACCEL|TEXTURE|TARGET_KEY|OMEGA|OBJ_REL_MASK|PATTERN_(?:DROP|EXPLODE|ANGLE(?:_CONE(?:_EMPTY)?)?)))|VEHICLE_(?:REFERENCE_FRAME|TYPE_(?:NONE|SLED|CAR|BOAT|AIRPLANE|BALLOON)|(?:LINEAR|ANGULAR)_(?:FRICTION_TIMESCALE|MOTOR_DIRECTION)|LINEAR_MOTOR_OFFSET|HOVER_(?:HEIGHT|EFFICIENCY|TIMESCALE)|BUOYANCY|(?:LINEAR|ANGULAR)_(?:DEFLECTION_(?:EFFICIENCY|TIMESCALE)|MOTOR_(?:DECAY_)?TIMESCALE)|VERTICAL_ATTRACTION_(?:EFFICIENCY|TIMESCALE)|BANKING_(?:EFFICIENCY|MIX|TIMESCALE)|FLAG_(?:NO_DEFLECTION_UP|LIMIT_(?:ROLL_ONLY|MOTOR_UP)|HOVER_(?:(?:WATER|TERRAIN|UP)_ONLY|GLOBAL_HEIGHT)|MOUSELOOK_(?:STEER|BANK)|CAMERA_DECOUPLED))|PRIM_(?:TYPE(?:_(?:BOX|CYLINDER|PRISM|SPHERE|TORUS|TUBE|RING|SCULPT))?|HOLE_(?:DEFAULT|CIRCLE|SQUARE|TRIANGLE)|MATERIAL(?:_(?:STONE|METAL|GLASS|WOOD|FLESH|PLASTIC|RUBBER|LIGHT))?|SHINY_(?:NONE|LOW|MEDIUM|HIGH)|BUMP_(?:NONE|BRIGHT|DARK|WOOD|BARK|BRICKS|CHECKER|CONCRETE|TILE|STONE|DISKS|GRAVEL|BLOBS|SIDING|LARGETILE|STUCCO|SUCTION|WEAVE)|TEXGEN_(?:DEFAULT|PLANAR)|SCULPT_(?:TYPE_(?:SPHERE|TORUS|PLANE|CYLINDER|MASK)|FLAG_(?:MIRROR|INVERT))|PHYSICS(?:_(?:SHAPE_(?:CONVEX|NONE|PRIM|TYPE)|MATERIAL))?|(?:POS|ROT)_LOCAL|SLICE|TEXT|FLEXIBLE|POINT_LIGHT|TEMP_ON_REZ|PHANTOM|POSITION|SIZE|ROTATION|TEXTURE|NAME|OMEGA|DESC|LINK_TARGET|COLOR|BUMP_SHINY|FULLBRIGHT|TEXGEN|GLOW|MEDIA_(?:ALT_IMAGE_ENABLE|CONTROLS|(?:CURRENT|HOME)_URL|AUTO_(?:LOOP|PLAY|SCALE|ZOOM)|FIRST_CLICK_INTERACT|(?:WIDTH|HEIGHT)_PIXELS|WHITELIST(?:_ENABLE)?|PERMS_(?:INTERACT|CONTROL)|PARAM_MAX|CONTROLS_(?:STANDARD|MINI)|PERM_(?:NONE|OWNER|GROUP|ANYONE)|MAX_(?:URL_LENGTH|WHITELIST_(?:SIZE|COUNT)|(?:WIDTH|HEIGHT)_PIXELS)))|MASK_(?:BASE|OWNER|GROUP|EVERYONE|NEXT)|PERM_(?:TRANSFER|MODIFY|COPY|MOVE|ALL)|PARCEL_(?:MEDIA_COMMAND_(?:STOP|PAUSE|PLAY|LOOP|TEXTURE|URL|TIME|AGENT|UNLOAD|AUTO_ALIGN|TYPE|SIZE|DESC|LOOP_SET)|FLAG_(?:ALLOW_(?:FLY|(?:GROUP_)?SCRIPTS|LANDMARK|TERRAFORM|DAMAGE|CREATE_(?:GROUP_)?OBJECTS)|USE_(?:ACCESS_(?:GROUP|LIST)|BAN_LIST|LAND_PASS_LIST)|LOCAL_SOUND_ONLY|RESTRICT_PUSHOBJECT|ALLOW_(?:GROUP|ALL)_OBJECT_ENTRY)|COUNT_(?:TOTAL|OWNER|GROUP|OTHER|SELECTED|TEMP)|DETAILS_(?:NAME|DESC|OWNER|GROUP|AREA|ID|SEE_AVATARS))|LIST_STAT_(?:MAX|MIN|MEAN|MEDIAN|STD_DEV|SUM(?:_SQUARES)?|NUM_COUNT|GEOMETRIC_MEAN|RANGE)|PAY_(?:HIDE|DEFAULT)|REGION_FLAG_(?:ALLOW_DAMAGE|FIXED_SUN|BLOCK_TERRAFORM|SANDBOX|DISABLE_(?:COLLISIONS|PHYSICS)|BLOCK_FLY|ALLOW_DIRECT_TELEPORT|RESTRICT_PUSHOBJECT)|HTTP_(?:METHOD|MIMETYPE|BODY_(?:MAXLENGTH|TRUNCATED)|CUSTOM_HEADER|PRAGMA_NO_CACHE|VERBOSE_THROTTLE|VERIFY_CERT)|STRING_(?:TRIM(?:_(?:HEAD|TAIL))?)|CLICK_ACTION_(?:NONE|TOUCH|SIT|BUY|PAY|OPEN(?:_MEDIA)?|PLAY|ZOOM)|TOUCH_INVALID_FACE|PROFILE_(?:NONE|SCRIPT_MEMORY)|RC_(?:DATA_FLAGS|DETECT_PHANTOM|GET_(?:LINK_NUM|NORMAL|ROOT_KEY)|MAX_HITS|REJECT_(?:TYPES|AGENTS|(?:NON)?PHYSICAL|LAND))|RCERR_(?:CAST_TIME_EXCEEDED|SIM_PERF_LOW|UNKNOWN)|ESTATE_ACCESS_(?:ALLOWED_(?:AGENT|GROUP)_(?:ADD|REMOVE)|BANNED_AGENT_(?:ADD|REMOVE))|DENSITY|FRICTION|RESTITUTION|GRAVITY_MULTIPLIER|KFM_(?:COMMAND|CMD_(?:PLAY|STOP|PAUSE|SET_MODE)|MODE|FORWARD|LOOP|PING_PONG|REVERSE|DATA|ROTATION|TRANSLATION)|CHARACTER_(?:CMD_(?:(?:SMOOTH_)?STOP|JUMP)|DESIRED_(?:TURN_)?SPEED|RADIUS|LENGTH|ORIENTATION|ACCOUNT_FOR_SKIPPED_FRAMES|AVOIDANCE_MODE|TYPE(?:_(?:[ABCD]|NONE))?|MAX_(?:DECEL|TURN_RADIUS|(?:ANGULAR_)?(?:ACCEL|SPEED))|TURN_SPEED_MULTIPLIER)|PURSUIT_(?:OFFSET|FUZZ_FACTOR|GOAL_TOLERANCE|INTERCEPT)|REQUIRE_LINE_OF_SIGHT|FORCE_DIRECT_PATH|VERTICAL|HORIZONTAL|AVOID_(?:CHARACTERS|DYNAMIC_OBSTACLES|NONE)|PU_(?:EVADE_(?:HIDDEN|SPOTTED)|FAILURE_(?:DYNAMIC_PATHFINDING_DISABLED|INVALID_(?:GOAL|START)|NO_(?:NAVMESH|VALID_DESTINATION)|OTHER|TARGET_GONE|(?:PARCEL_)?UNREACHABLE)|(?:GOAL|SLOWDOWN_DISTANCE)_REACHED)|TRAVERSAL_TYPE(?:_(?:FAST|NONE|SLOW))?|CONTENT_TYPE_(?:ATOM|FORM|HTML|JSON|LLSD|RSS|TEXT|XHTML|XML)|GCNP_(?:RADIUS|STATIC)|(?:PATROL|WANDER)_PAUSE_AT_WAYPOINTS|OPT_(?:AVATAR|CHARACTER|EXCLUSION_VOLUME|LEGACY_LINKSET|MATERIAL_VOLUME|OTHER|STATIC_OBSTACLE|WALKABLE)|SIM_STAT_PCT_CHARS_STEPPED"),
    new Group("lsl_builtin_constants_string", 1, "TEXTURE_(?:BLANK|DEFAULT|MEDIA|PLYWOOD|TRANSPARENT)|JSON_(?:APPEND|ARRAY|FALSE|INVALID|NULL|NUMBER|OBJECT|STRING|TRUE)"),
    new Group("lsl_builtin_constants_float", 1, "DEG_TO_RAD|PI(?:_BY_TWO)?|RAD_TO_DEG|SQRT2|TWO_PI"),
    new Group("lsl_builtin_constants_compound", 1, "ZERO_(?:ROTATION|VECTOR)|TOUCH_INVALID_(?:TEXCOORD|VECTOR)"),
    new Group("lsl_builtin_functions", 0, "ll(?:Json(?:2List|[GS]etValue|ValueType)|Sin|Cos|Tan|Atan2|Sqrt|Pow|Abs|Fabs|Frand|Floor|Ceil|Round|Vec(?:Mag|Norm|Dist)|Rot(?:Between|2(?:Euler|Fwd|Left|Up))|(?:Euler|Axes)2Rot|Whisper|(?:Region|Owner)?Say|Shout|Listen(?:Control|Remove)?|Sensor(?:Repeat|Remove)?|Detected(?:Name|Key|Owner|Type|Pos|Vel|Grab|Rot|Group|LinkNumber)|Die|Ground|Wind|(?:Set|Get)(?:AnimationOverride|MemoryLimit|PrimMediaParams|ParcelMusicURL|Object(?:Desc|PermMask|Name)|PhysicsMaterial|Status|Scale|Color|Alpha|Texture|Pos|Rot|Force|Torque)|ResetAnimationOverride|(?:Scale|Offset|Rotate)Texture|(?:Rot)?Target(?:Remove)?|(?:Stop)?MoveToTarget|Apply(?:Rotational)?Impulse|Set(?:KeyframedMotion|ContentType|RegionPos|(?:Angular)?Velocity|Buoyancy|HoverHeight|ForceAndTorque|TimerEvent|ScriptState|Damage|TextureAnim|Sound(?:Queueing|Radius)|Vehicle(?:Type|(?:Float|Vector|Rotation)Param)|(?:Touch|Sit)?Text|Camera(?:Eye|At)Offset|PrimitiveParams|ClickAction|Link(?:Alpha|Color|PrimitiveParams(?:Fast)?|Texture(?:Anim)?|Camera|Media)|RemoteScriptAccessPin|PayPrice|LocalRot)|Get(?:ClosestNavPoint|StaticPath|SimStats|Env|PrimitiveParams|Link(?:PrimitiveParams|Number(?:OfSides)?|Key|Name|Media)|HTTPHeader|FreeURLs|Object(?:Details|PrimCount)|Parcel(?:MaxPrims|Details|Prim(?:Count|Owners))|Attached|(?:SPMax|Free|Used)Memory|Region(?:Name|TimeDilation|FPS|Corner|AgentCount)|Root(?:Position|Rotation)|UnixTime|(?:Parcel|Region)Flags|(?:Wall|GMT)clock|SimulatorHostname|BoundingBox|GeometricCenter|Creator|NumberOf(?:Prims|NotecardLines|Sides)|Animation(?:List)?|(?:Camera|Local)(?:Pos|Rot)|Vel|Accel|Omega|Time(?:stamp|OfDay)|(?:Object|CenterOf)?Mass|MassMKS|Energy|Owner|(?:Owner)?Key|SunDirection|Texture(?:Offset|Scale|Rot)|Inventory(?:Number|Name|Key|Type|Creator|PermMask)|Permissions(?:Key)?|StartParameter|List(?:Length|EntryType)|Date|Agent(?:Size|Info|Language|List)|LandOwnerAt|NotecardLine|Script(?:Name|State))|(?:Get|Reset|GetAndReset)Time|PlaySound(?:Slave)?|LoopSound(?:Master|Slave)?|(?:Trigger|Stop|Preload)Sound|(?:(?:Get|Delete)Sub|Insert)String|To(?:Upper|Lower)|Give(?:InventoryList|Money)|RezObject|(?:Stop)?LookAt|Sleep|CollisionFilter|(?:Take|Release)Controls|DetachFromAvatar|AttachToAvatar(?:Temp)?|InstantMessage|(?:GetNext)?Email|StopHover|MinEventDelay|RotLookAt|String(?:Length|Trim)|(?:Start|Stop)Animation|TargetOmega|RequestPermissions|(?:Create|Break)Link|BreakAllLinks|(?:Give|Remove)Inventory|Water|PassTouches|Request(?:Agent|Inventory)Data|TeleportAgent(?:Home|GlobalCoords)?|ModifyLand|CollisionSound|ResetScript|MessageLinked|PushObject|PassCollisions|AxisAngle2Rot|Rot2(?:Axis|Angle)|A(?:cos|sin)|AngleBetween|AllowInventoryDrop|SubStringIndex|List2(?:CSV|Integer|Json|Float|String|Key|Vector|Rot|List(?:Strided)?)|DeleteSubList|List(?:Statistics|Sort|Randomize|(?:Insert|Find|Replace)List)|EdgeOfWorld|AdjustSoundVolume|Key2Name|TriggerSoundLimited|EjectFromLand|(?:CSV|ParseString)2List|OverMyLand|SameGroup|UnSit|Ground(?:Slope|Normal|Contour)|ParticleSystem|GroundRepel|(?:Set|Remove)VehicleFlags|(?:AvatarOn)?(?:Link)?SitTarget|Script(?:Danger|Profiler)|Dialog|VolumeDetect|ResetOtherScript|RemoteLoadScriptPin|(?:Open|Close)RemoteDataChannel|SendRemoteData|RemoteDataReply|(?:Integer|String)ToBase64|XorBase64StringsCorrect|Log(?:10)?|Base64To(?:String|Integer)|ParseStringKeepNulls|RezAtRoot|RequestSimulatorData|ForceMouselook|(?:Load|Release|(?:E|Une)scape)URL|ParcelMedia(?:CommandList|Query)|ModPow|MapDestination|(?:RemoveFrom|AddTo|Reset)Land(?:Pass|Ban)List|(?:Set|Clear)CameraParams|HTTP(?:Request|Response)|TextBox|DetectedTouch(?:UV|Face|Pos|(?:N|Bin)ormal|ST)|(?:MD5|SHA1|DumpList2)String|Request(?:Secure)?URL|Clear(?:Prim|Link)Media|LinkParticleSystem|(?:Get|Request)(?:Username|DisplayName)|RegionSayTo|CastRay|GenerateKey|TransferLindenDollars|ManageEstateAccess|(?:Create|Delete)Character|ExecCharacterCmd|Evade|FleeFrom|NavigateTo|PatrolPoints|Pursue|UpdateCharacter|WanderWithin)"),
]; //}
const gl = groups.length;
var missed = new RegExp("^(|[\\W\\w]*?\\W)("+groups.join("|")+")([\\W][\\W\\w]*|)$");
 
var lang = $X("//div[@id='PageLanguage']");
lang = (lang && lang.innerHTML) || "";
 
$Z(search, function(r,i){
    for (var a = 0; b = r.childNodes[a]; ++a)
        if (b.nodeName == "#text" && (c = missed.exec(b.nodeValue)))
        {
            var s, v, p, q;
            if ((v = c[c.length - 1]) && (v != ""))//whitespace after
                insertAfter(document.createTextNode(v), b);
            for (p=0, q = 3; p < gl; p++)
            {
                var n = groups[p];
                var y = 1 + n.captures;
                if ((v = c[q]) && (v != ""))
                {
                    if (n.v >= 0)
                    {
                        s = document.createElement("a");
                        s.href = prefixs[n.v] + v + lang;
                    }
                    else
                        s = document.createElement("span");
                    if (n.c && n.c != "")
                        s.className = n.c;
                    s.appendChild(document.createTextNode(v));
                    insertAfter(s, b);
                    if (!(v = c[1]) || (v == ""))//whitespace before
                        b.parentNode.removeChild(b);
                    else
                        b.nodeValue = c[1];
                    if (n.processor)
                        n.processor(s, c.slice(q, q + y), c[1], c[c.length - 1]);
                    break;
                }
                q += y;
            }
        }
    if ((b = r.childNodes[0]) && b.nodeName == "#text" && b.nodeValue.substring(0,7) == "&nbsp;\n")
        b.nodeValue = b.nodeValue.substring(7);
    if ((b = r.childNodes[r.childNodes.length - 1]) && b.nodeName == "#text" && b.nodeValue.substr(-2) == "\n ")
        b.nodeValue = b.nodeValue.substring(0, b.nodeValue.length - 2);
    if (lang)      $Z("./a[span[starts-with(@class,'kw')]]", function(ir,ii){ir.attributes.getNamedItem("href").value += lang;}, r);
});
 
$Z("//a[starts-with(@title, 'Ll') and starts-with(@title, text())]", function(r,i){
    var m = "l" + r.title.substring(1);
    if (r.title == r.innerHTML)
        r.innerHTML = m;
    r.title = m;
});
 
if (m = $X("//li[@id='n-editingdiscussion']")){
    n = document.createElement("li");
    n.id = "n-randompage";
    n.innerHTML = "<a accesskey='x' title='Load a random article [alt-shift-x]' href='/wiki/Special:Random'>Random Page</a>";
    insertAfter(n, m);
}
 
function $X(_xpath, node){
    var doc = (node)?(node.ownerDocument || node):(node = document);
    return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
function $Z(_xpath, func, node){
    var doc = (node)?(node.ownerDocument || node):(node = document);
    var res = doc.evaluate(_xpath, node, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var args = Array.prototype.slice.call(arguments, 3);
    var i = 0;
    for (; i < res.snapshotLength; ++i)
        func.apply(func, [res.snapshotItem(i), i].concat(args));
    return i;
}
function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}
function log(){
    var arg;
    switch (arguments.length) {
        case 1:
            arg = arguments[0];
            break;
        case 0:
            arg = null;
            break;
        default:
            arg = arguments;
            break;
    }
 
    if (typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) != "undefined")
        unsafeWindow.console.log(arg);
    else if (typeof(GM_log) != "undefined")
        GM_log(arg);
    return arg;
}
})();