//tealium universal tag - utag.232 ut4.0.201903142007, Copyright 2019 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={"id":id};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}
var match=/ut\d\.(\d*)\..*/.exec(utag.cfg.v);if(utag.ut.loader===undefined||!match||parseInt(match[1])<41){u.loader=function(o,a,b,c,l,m){utag.DB(o);a=document;if(o.type=="iframe"){m=a.getElementById(o.id);if(m&&m.tagName=="IFRAME"){b=m;}else{b=a.createElement("iframe");}o.attrs=o.attrs||{};utag.ut.merge(o.attrs,{"height":"1","width":"1","style":"display:none"},0);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";}if(o.id){b.id=o.id;}for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l]);}b.setAttribute("src",o.src);if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){this.onreadystatechange=null;o.cb();}};}}if(o.type!="img"&&!m){l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}}};}else{u.loader=utag.ut.loader;}
if(utag.ut.typeOf===undefined){u.typeOf=function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};}else{u.typeOf=utag.ut.typeOf;}
u.ev={"view":1,"link":1};u.hasgtagjs=function(){if(typeof window[window.gtagRename]==="function"){return true;}
var i,s=document.getElementsByTagName("script");for(i=0;i<s.length;i++){if(s[i].src&&s[i].src.indexOf("gtag/js")>=0){return true;}}
window.gtagRename=window.gtagRename||""||"gtag";window.dataLayer=window.dataLayer||[];window[window.gtagRename]=function(){dataLayer.push(arguments);};window[window.gtagRename]("js",new Date());};u.initialized=u.hasgtagjs();u.scriptrequested=false;u.queue=[];u.o=window[window.gtagRename];u.map_func=function(arr,obj,item){var i=arr.shift();obj[i]=obj[i]||{};if(arr.length>0){u.map_func(arr,obj[i],item);}else{obj[i]=item;}};u.hasOwn=function(o,a){return o!=null&&Object.prototype.hasOwnProperty.call(o,a);};u.isEmptyObject=function(o,a){for(a in o){if(u.hasOwn(o,a)){return false;}}return true;};u.map={"dc_advertiser_id":"src,advertiser_id","dc_countertype":"countertype,counting_method","dc_category":"cat,activity_group","dc_type":"type,activity","dc_event:conversion":"conversion"};u.extend=[function(a,b,c,d,e,f,g){d=b['dom.pathname'];if(typeof d=='undefined')return;c=[{'^\/us\/en-us\/accessories\/c\/accessories$':'DC-8435720|categ0|us_ac0|standard'},{'^\/us\/en-us\/mens-accessories\/c\/mens-accessories$':'DC-8435720|gende0|us_m_0|standard'},{'^\/us\/en-us\/mens-running-accessories\/c\/mens-running-accessories$':'DC-8435720|gende0|us_m_00|standard'},{'^\/us\/en-us\/mens-training-accessories\/c\/mens-training-accessories$':'DC-8435720|gende0|us_m_000|standard'},{'^\/us\/en-us\/womens-accessories\/c\/womens-accessories$':'DC-8435720|gende0|us_w_0|standard'},{'^\/us\/en-us\/best-sellers\/c\/best-sellers$':'DC-8435720|categ0|us_be0|standard'},{'^\/us\/en-us\/mens-best-sellers\/c\/mens-best-sellers$':'DC-8435720|gende0|us_m_001|standard'},{'^\/us\/en-us\/womens-best-sellers\/c\/womens-best-sellers$':'DC-8435720|gende0|us_w_00|standard'},{'^\/us\/en-us\/clearance\/c\/clearance$':'DC-8435720|categ0|us_cl0|standard'},{'^\/us\/en-us\/clothing\/c\/clothing$':'DC-8435720|categ0|us_cl00|standard'},{'^\/us\/en-us\/mens-bottoms\/c\/mens-bottoms$':'DC-8435720|gende0|us_m_002|standard'},{'^\/us\/en-us\/mens-clothing\/c\/mens-clothing$':'DC-8435720|gende0|us_m_007|standard'},{'^\/us\/en-us\/mens-outerwear\/c\/mens-outerwear$':'DC-8435720|gende0|us_m_003|standard'},{'^\/us\/en-us\/mens-running-clothing\/c\/mens-running-clothing$':'DC-8435720|gende0|us_m_004|standard'},{'^\/us\/en-us\/mens-socks\/c\/mens-socks$':'DC-8435720|gende0|us_m_005|standard'},{'^\/us\/en-us\/mens-tops\/c\/mens-tops$':'DC-8435720|gende0|us_m_006|standard'},{'^\/us\/en-us\/womens-bottoms\/c\/womens-bottoms$':'DC-8435720|gende0|us_w_000|standard'},{'^\/us\/en-us\/womens-clothing\/c\/womens-clothing$':'DC-8435720|gende0|us_w_001|standard'},{'^\/us\/en-us\/womens-outerwear\/c\/womens-outerwear$':'DC-8435720|gende0|us_w_002|standard'},{'^\/us\/en-us\/womens-socks\/c\/womens-socks$':'DC-8435720|gende0|us_w_003|standard'},{'^\/us\/en-us\/womens-sports-bras\/c\/womens-sports-bras$':'DC-8435720|gende0|us_w_004|standard'},{'^\/us\/en-us\/womens-tops\/c\/womens-tops$':'DC-8435720|gende0|us_w_005|standard'},{'^\/us\/en-us\/jordan-burroughs-collection\/c\/jordan-burroughs-collection$':'DC-8435720|categ0|us_bu0|standard'},{'^\/us\/en-us\/mens-boa-lacing-system\/c\/mens-boa-lacing-system$':'DC-8435720|gende0|us_m_008|standard'},{'^\/us\/en-us\/mens-gel-cumulus\/c\/mens-gel-cumulus$':'DC-8435720|gende0|us_m_009|standard'},{'^\/us\/en-us\/mens-flytefoam-equipped\/c\/mens-flytefoam-equipped$':'DC-8435720|gende0|us_m_00-|standard'},{'^\/us\/en-us\/mens-gt-series\/c\/mens-gt-series$':'DC-8435720|gende0|us_m_00a|standard'},{'^\/us\/en-us\/mens-gel-kayano\/c\/mens-gel-kayano$':'DC-8435720|gende0|us_m_00b|standard'},{'^\/us\/en-us\/mens-lite-show\/c\/mens-lite-show$':'DC-8435720|gende0|us_m_00c|standard'},{'^\/us\/en-us\/mens-gel-nimbus\/c\/mens-gel-nimbus$':'DC-8435720|gende0|us_m_00d|standard'},{'^\/us\/en-us\/mens-gel-quantum-series\/c\/mens-gel-quantum$':'DC-8435720|gende0|us_m_00e|standard'},{'^\/us\/en-us\/sakura-collection\/c\/sakura-collection$':'DC-8435720|categ0|us_sa0|standard'},{'^\/us\/en-us\/womens-boa-lacing-system\/c\/womens-boa-lacing-system$':'DC-8435720|gende0|us_w_006|standard'},{'^\/us\/en-us\/womens-gel-cumulus\/c\/womens-gel-cumulus$':'DC-8435720|gende0|us_w_007|standard'},{'^\/us\/en-us\/flytefoam-equipped\/c\/flytefoam-equipped$':'DC-8435720|categ0|us_fl0|standard'},{'^\/us\/en-us\/womens-gt-series\/c\/womens-gt-series$':'DC-8435720|gende0|us_w_008|standard'},{'^\/us\/en-us\/womens-gel-kayano\/c\/womens-gel-kayano$':'DC-8435720|gende0|us_w_009|standard'},{'^\/us\/en-us\/womens-lite-show\/c\/womens-lite-show$':'DC-8435720|gende0|us_w_00-|standard'},{'^\/us\/en-us\/womens-gel-nimbus\/c\/womens-gel-nimbus$':'DC-8435720|gende0|us_w_00a|standard'},{'^\/us\/en-us\/womens-gel-quantum-series\/c\/womens-gel-quantum$':'DC-8435720|gende0|us_w_00b|standard'},{'^\/us\/en-us\/clothing-size-guide$':'DC-8435720|categ0|us_cl000|standard'},{'^\/us\/en-us\/pronation-guide$':'DC-8435720|categ0|us_pr0|standard'},{'^\/us\/en-us\/product-finder\/shoe$':'DC-8435720|categ0|us_sh00|standard'},{'^\/us\/en-us\/widths\/c\/widths$':'DC-8435720|categ0|us_sh001|standard'},{'^\/us\/en-us\/shoe-width-guide$':'DC-8435720|categ0|us_sh000|standard'},{'^\/us\/en-us\/$':'DC-8435720|homep0|usasi0|standard'},{'^\/us\/en-us\/instagram-shop$':'DC-8435720|categ0|us_in0|standard'},{'^\/us\/en-us\/new-arrivals\/c\/new-arrivals$':'DC-8435720|categ0|us_ne0|standard'},{'^\/us\/en-us\/womens-new-arrivals\/c\/womens-new-arrivals$':'DC-8435720|gende0|us_w_00c|standard'},{'^\/us\/en-us\/shoes\/c\/shoes$':'DC-8435720|categ0|us_sh0|standard'},{'^\/us\/en-us\/womens-shoes\/c\/womens-shoes$':'DC-8435720|gende0|usasi0|standard'},{'^\/us\/en-us\/running-shoes\/c\/running-shoes$':'DC-8435720|categ0|us_ru0|standard'},{'^\/us\/en-us\/training-shoes\/c\/training-shoes$':'DC-8435720|categ0|us_tr0|standard'},{'^\/us\/en-us\/womens\/c\/women$':'DC-8435720|gende0|US_wo0|standard'},{'^\/us\/en-us\/wrestling-shoes\/c\/wrestling-shoes$':'DC-8435720|categ0|us_wr0|standard'},{'^\/us\/en-us\/running$':'DC-8435720|categ0|us_ru00|standard'},{'^\/us\/en-us\/tennis$':'DC-8435720|categ0|us_te0|standard'},{'^\/us\/en-us\/trail$':'DC-8435720|categ0|us_tr00|standard'},{'^\/us\/en-us\/training$':'DC-8435720|categ0|us_tr000|standard'},{'^\/us\/en-us\/volleyball$':'DC-8435720|categ0|us_vo0|standard'},{'^\/us\/en-us\/wrestling$':'DC-8435720|categ0|us_wr00|standard'},{'^\/us\/en-us\/tops\/c\/tops$':'DC-8435720|categ0|us_to0|standard'},{'^\/us\/en-us\/bottoms\/c\/bottoms$':'DC-8435720|categ0|us_bo0|standard'},{'^\/us\/en-us\/socks\/c\/socks$':'DC-8435720|categ0|us_so0|standard'},{'^\/us\/en-us\/outerwear\/c\/outerwear$':'DC-8435720|categ0|us_ou0|standard'},{'^\/us\/en-us\/lite-show-running-gear\/c\/lite-show-running-gear$':'DC-8435720|categ0|us_li0|standard'},{'^\/us\/en-us\/gel-kayano\/c\/gel-kayano$':'DC-8435720|categ0|us_ka0|standard'},{'^\/us\/en-us\/gel-nimbus\/c\/gel-nimbus$':'DC-8435720|categ0|us_ni0|standard'},{'^\/us\/en-us\/gt-series\/c\/gt-series$':'DC-8435720|categ0|us_gt0|standard'},{'^\/us\/en-us\/gel-cumulus\/c\/gel-cumulus$':'DC-8435720|categ0|us_cu0|standard'},{'^\/us\/en-us\/gel-quantum-series\/c\/gel-quantum$':'DC-8435720|categ0|us_qu0|standard'},{'^\/us\/en-us\/the-boa-system\/c\/the-boa-system$':'DC-8435720|categ0|us_bo00|standard'},{'^\/us\/en-us\/cart$':'DC-8435720|cartw0|cartd0|standard'},{'^\/us\/en-us\/mens\/c\/men$':'DC-8435720|gende0|us_me0|standard'},{'^\/us\/en-us\/mens-new-arrivals\/c\/mens-new-arrivals$':'DC-8435720|gende0|us_m_00f|standard'},{'.*\/p\/(.*)':'DC-8435720|produ0|us_pr0|standard'},{'^\/us\/en-us\/gel-kayano-25\/c\/gel-kayano-25$':'DC-8435720|produ0|us_as0|standard'},{'^\/us\/en-us\/mens-gel-kayano-25\/c\/mens-gel-kayano-25$':'DC-8435720|produ0|us_as000|standard'},{'^\/us\/en-us\/womens-gel-kayano-25\/c\/womens-gel-kayano-25$':'DC-8435720|produ0|us_as00|standard'},{'^\/us\/en-us\/gel-cumulus-20\/c\/gel-cumulus-20$':'DC-8435720|produ0|us_as003|standard'},{'^\/us\/en-us\/gel-nimbus-21\/c\/gel-nimbus-21$':'DC-8435720|produ0|us_ni0|standard'},{'^\/us\/en-us\/innovation-in-motion\/c\/innovation-in-motion$':'DC-8435720|produ0|aac_i0|standard'},{'^\/us\/en-us\/mk\/metaride$':'DC-8435720|produ0|aac_m0|standard'},{'^\/us\/en-us\/the-new-strong-luxe-traveler\/c\/the-new-strong-luxe-traveler(.*)':'DC-8435720|produ0|us_ne00|standard'},{'^\/us\/en-us\/the-new-strong-moto-femme\/c\/the-new-strong-moto-femme(.*)':'DC-8435720|produ0|us_ne0|standard'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){g=new RegExp(f,'i');if(g.test(d)){b['dc_settings']=c[e][f];m=true};};if(m)break};if(!m)b['dc_settings']='';},function(a,b){try{if(1){try{b['dc_advertiser_id']=b['dc_settings'].split("|")[0]}catch(e){};try{b['dc_type']=b['dc_settings'].split("|")[2]}catch(e){};try{b['dc_category']=b['dc_settings'].split("|")[1]}catch(e){};try{b['dc_countertype']=b['dc_settings'].split("|")[3]}catch(e){};b['dc_event']='conversion'}}catch(e){utag.DB(e)}},function(a,b){try{if(1){if(b['page_type']&&b['page_type']=='Order Confirmation Page Template'){b['dc_settings']='DC-8435720|confi0|us_co0|standard'}
if(document.location.pathname&&document.location.search&&document.location.pathname=='/us/en-us/pronation-guide/c/pronation-guide'){if(document.location.search.indexOf('Overpronate')>-1){if(document.location.search.indexOf('Severe')>-1){b['dc_settings']='DC-8435720|categ0|sever0|standard';}else{b['dc_settings']='DC-8435720|categ0|overp0|standard';}}else if(document.location.search.indexOf('Underpronate')>-1){b['dc_settings']='DC-8435720|categ0|under0|standard';}else if(document.location.search.indexOf('Neutral')>-1){b['dc_settings']='DC-8435720|categ0|neutr0|standard';}}
if(b['page_type']&&b['page_type']=='Product Details Page Template'){if(b['product_gender']&&b['product_gender'][0]=="FEMALE"&&b['dom.pathname']&&b['dom.pathname'].indexOf('/us/en-us/gel-kayano-25')>-1){b['dc_settings']='DC-8435720,DC-8435720|produ0,produ0|us_as002,us_pr0|standard,standard';}else if(b['product_gender']&&b['product_gender'][0]=="MALE"&&b['dom.pathname']&&b['dom.pathname'].indexOf('/us/en-us/gel-kayano-25')>-1){b['dc_settings']='DC-8435720,DC-8435720|produ0,produ0|us_as001,us_pr0|standard,standard';}}
if(b['page_type']&&b['page_type']=='Product Details Page Template'){if(b['product_gender']&&b['product_gender'][0]=="FEMALE"&&b['dom.pathname']&&b['dom.pathname'].indexOf('/us/en-us/gel-cumulus-20')>-1){b['dc_settings']='DC-8435720,DC-8435720|produ0,produ0|us_as005,us_pr0|standard,standard';}else if(b['product_gender']&&b['product_gender'][0]=="MALE"&&b['dom.pathname']&&b['dom.pathname'].indexOf('/us/en-us/gel-cumulus-20')>-1){b['dc_settings']='DC-8435720,DC-8435720|produ0,produ0|us_as004,us_pr0|standard,standard';}}
if(b['dc_settings']){b['dc_advertiser_id']=b['dc_settings'].split("|")[0];b['dc_type']=b['dc_settings'].split("|")[2];b['dc_category']=b['dc_settings'].split("|")[1];b['dc_countertype']=b['dc_settings'].split("|")[3];b['dc_event']='conversion';}
if(b['dc_settings']===''){return false;}}}catch(e){utag.DB(e)}}];u.loader_cb=function(a,b){utag.DB("send:232:CALLBACK");u.initialized=true;var i,j,_event,p,key;for(i=0;i<u.data.advertiser_id.length;i++){u.o("config",u.data.advertiser_id[i]);}
if(u.data.order_id){for(i=0;i<u.data.event.length;i++){if(u.data.event[i]==="purchase"){p=true;}}
if(!p){u.data.event.push("purchase");}}
var total_qty=1;if(typeof(u.data.product_quantity)==="number"){total_qty=u.data.product_quantity;}else if(u.data.product_quantity.length===1){total_qty=u.data.product_quantity[0];}else if(u.data.product_quantity.length>1){for(i=0;i<u.data.product_quantity.length;i++){total_qty+=parseInt(u.data.product_quantity[i],10);}}
for(i=0;i<u.data.event.length;i++){_event=u.data.event[i];for(j=0;j<u.data.advertiser_id.length;j++){var eventIdData={};if(u.data.custom_scripts==="true"||u.data.custom_scripts){eventIdData.allow_custom_scripts=true;}else if(u.data.custom_scripts==="false"||!u.data.custom_scripts){eventIdData.allow_custom_scripts=false;}
if(u.data.session_id.length===1&&u.data.session_id[0]!==""){eventIdData.session_id=u.data.session_id[0];}else if(u.data.session_id[j]!==""){eventIdData.session_id=u.data.session_id[j];}
if(u.data.order_total){eventIdData.value=u.data.order_total;eventIdData.transaction_id=u.data.order_id;}
if(u.data.product_quantity){eventIdData.quantity=total_qty;}
for(key in u.data.custom){eventIdData[key]=u.data.custom[key];}
if(!u.isEmptyObject(u.data.dc_custom_params)){eventIdData.dc_custom_params={};for(key in u.data.dc_custom_params){eventIdData.dc_custom_params[key]=u.data.dc_custom_params[key];}}
eventIdData.send_to=u.data.advertiser_id[j]+"/"+u.data.activity_group[j]+"/"+u.data.activity[j]+"+"+u.data.counting_method[j];if(_event==="purchase"){u.o("event","purchase",eventIdData);}
if(_event==="conversion"){try{delete(eventIdData.quantity);}catch(e){}
u.o("event","conversion",eventIdData);}}}
utag.DB("send:232:CALLBACK:COMPLETE");};u.callBack=function(){var data={};while(data=u.queue.shift()){u.data=data.data;u.loader_cb(data.a,data.b);}};u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){utag.DB("send:232");utag.DB(b);var d,e,f,h;u.data={"qsp_delim":"&","kvp_delim":"=","base_url":"https://www.googletagmanager.com/gtag/js","advertiser_id":"DC-8435720","activity_group":"us_co0","activity":"confi0","counting_method":"standard","custom_scripts":"true","session_id":"","product_quantity":[],"dc_custom_params":{},"event_name":"","event":[],"custom":{}};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};utag.DB("send:232:EXTENSIONS");utag.DB(b);for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.map_func(e[f].split("."),u.data,b[d]);}}else{h=d.split(":");if(h.length===2&&b[h[0]]===h[1]){if(u.map[d]){u.data.event=u.data.event.concat(u.map[d].split(","));}}}}
utag.DB("send:232:MAPPINGS");utag.DB(u.data);u.data.order_id=u.data.order_id||b._corder||"";u.data.order_total=u.data.order_total||b._ctotal||"";if(u.data.product_quantity.length===0&&b._cquan!==undefined){u.data.product_quantity=b._cquan.slice(0);}
if(typeof(u.data.advertiser_id)==="string"){u.data.advertiser_id=u.data.advertiser_id.split(",");}
if(typeof(u.data.activity_group)==="string"){u.data.activity_group=u.data.activity_group.split(",");}
if(typeof(u.data.activity)==="string"){u.data.activity=u.data.activity.split(",");}
if(typeof(u.data.counting_method)==="string"){u.data.counting_method=u.data.counting_method.split(",");}
if(typeof(u.data.session_id)==="string"){u.data.session_id=u.data.session_id.split(",");}
if(!u.data.advertiser_id){utag.DB(u.id+": Tag not fired: Required attribute not populated");return;}
u.data.base_url+="?id="+"DC-8435720";if(u.initialized){u.loader_cb(a,b);}else{u.queue.push({"data":u.data,"a":a,"b":b});if(!u.scriptrequested){u.scriptrequested=true;u.loader({"type":"script","src":u.data.base_url,"cb":u.callBack,"loc":"script","id":"utag_232","attrs":{}});}}
utag.DB("send:232:COMPLETE");}};utag.o[loader].loader.LOAD(id);}("232","asics.main"));}catch(error){utag.DB(error);}
