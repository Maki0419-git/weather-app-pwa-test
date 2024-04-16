!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/weather-app-pwa-test/",n(n.s=5)}([function(e,t,n){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(s){}},function(e,t,n){"use strict";try{self["workbox:precaching:5.1.4"]&&_()}catch(s){}},function(e,t,n){"use strict";try{self["workbox:routing:5.1.4"]&&_()}catch(s){}},function(e,t,n){"use strict";try{self["workbox:strategies:5.1.4"]&&_()}catch(s){}},function(e,t,n){"use strict";try{self["workbox:expiration:5.1.4"]&&_()}catch(s){}},function(e,t,n){"use strict";n.r(t);n(0);const s=function(e){let t=e;for(var n=arguments.length,s=new Array(n>1?n-1:0),r=1;r<n;r++)s[r-1]=arguments[r];return s.length>0&&(t+=" :: ".concat(JSON.stringify(s))),t};class r extends Error{constructor(e,t){super(s(e,t)),this.name=e,this.details=t}}const a=new Set;const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},c=e=>[i.prefix,e,i.suffix].filter((e=>e&&e.length>0)).join("-"),o=e=>e||c(i.precache),h=e=>e||c(i.runtime);const l=e=>new URL(String(e),location.href).href.replace(new RegExp("^".concat(location.origin)),""),u=(e,t)=>e.filter((e=>t in e)),d=async e=>{let{request:t,mode:n,plugins:s=[]}=e;const r=u(s,"cacheKeyWillBeUsed");let a=t;for(const i of r)a=await i.cacheKeyWillBeUsed.call(i,{mode:n,request:a}),"string"===typeof a&&(a=new Request(a));return a},p=async e=>{let{cacheName:t,request:n,event:s,matchOptions:r,plugins:a=[]}=e;const i=await self.caches.open(t),c=await d({plugins:a,request:n,mode:"read"});let o=await i.match(c,r);for(const h of a)if("cachedResponseWillBeUsed"in h){const e=h.cachedResponseWillBeUsed;o=await e.call(h,{cacheName:t,event:s,matchOptions:r,cachedResponse:o,request:c})}return o},f=async e=>{let{cacheName:t,request:n,response:s,event:i,plugins:c=[],matchOptions:o}=e;const h=await d({plugins:c,request:n,mode:"write"});if(!s)throw new r("cache-put-with-no-response",{url:l(h.url)});const f=await(async e=>{let{request:t,response:n,event:s,plugins:r=[]}=e,a=n,i=!1;for(const c of r)if("cacheWillUpdate"in c){i=!0;const e=c.cacheWillUpdate;if(a=await e.call(c,{request:t,response:a,event:s}),!a)break}return i||(a=a&&200===a.status?a:void 0),a||null})({event:i,plugins:c,response:s,request:h});if(!f)return void 0;const g=await self.caches.open(t),m=u(c,"cacheDidUpdate"),w=m.length>0?await p({cacheName:t,matchOptions:o,request:h}):null;try{await g.put(h,f)}catch(y){throw"QuotaExceededError"===y.name&&await async function(){for(const e of a)await e()}(),y}for(const r of m)await r.cacheDidUpdate.call(r,{cacheName:t,event:i,oldResponse:w,newResponse:f,request:h})},g=p;let m;function w(e){e.then((()=>{}))}class y{constructor(e,t){let{onupgradeneeded:n,onversionchange:s}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this._db=null,this._name=e,this._version=t,this._onupgradeneeded=n,this._onversionchange=s||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let n=!1;setTimeout((()=>{n=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const s=indexedDB.open(this._name,this._version);s.onerror=()=>t(s.error),s.onupgradeneeded=e=>{n?(s.transaction.abort(),s.result.close()):"function"===typeof this._onupgradeneeded&&this._onupgradeneeded(e)},s.onsuccess=()=>{const t=s.result;n?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,n){return await this.getAllMatching(e,{query:t,count:n})}async getAllKeys(e,t,n){return(await this.getAllMatching(e,{query:t,count:n,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e){let{index:t,query:n=null,direction:s="next",count:r,includeKeys:a=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return await this.transaction([e],"readonly",((i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(n,s);u.onsuccess=()=>{const e=u.result;e?(l.push(a?e:e.value),r&&l.length>=r?c(l):e.continue()):c(l)}}))}async transaction(e,t,n){return await this.open(),await new Promise(((s,r)=>{const a=this._db.transaction(e,t);a.onabort=()=>r(a.error),a.oncomplete=()=>s(),n(a,(e=>s(e)))}))}async _call(e,t,n){for(var s=arguments.length,r=new Array(s>3?s-3:0),a=3;a<s;a++)r[a-3]=arguments[a];return await this.transaction([t],n,((n,s)=>{const a=n.objectStore(t),i=a[e].apply(a,r);i.onsuccess=()=>s(i.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}y.prototype.OPEN_TIMEOUT=2e3;const _={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[$,z]of Object.entries(_))for(const e of z)e in IDBObjectStore.prototype&&(y.prototype[e]=async function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),r=1;r<n;r++)s[r-1]=arguments[r];return await this._call(e,t,$,...s)});const v=async e=>{let{request:t,fetchOptions:n,event:s,plugins:a=[]}=e;if("string"===typeof t&&(t=new Request(t)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const i=u(a,"fetchDidFail"),c=i.length>0?t.clone():null;try{for(const e of a)if("requestWillFetch"in e){const n=e.requestWillFetch,r=t.clone();t=await n.call(e,{request:r,event:s})}}catch(h){throw new r("plugin-error-request-will-fetch",{thrownError:h})}const o=t.clone();try{let e;e="navigate"===t.mode?await fetch(t):await fetch(t,n);for(const t of a)"fetchDidSucceed"in t&&(e=await t.fetchDidSucceed.call(t,{event:s,request:o,response:e}));return e}catch(l){0;for(const e of i)await e.fetchDidFail.call(e,{error:l,event:s,originalRequest:c.clone(),request:o.clone()});throw l}};async function R(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,a=function(){if(void 0===m){const t=new Response("");if("body"in t)try{new Response(t.body),m=!0}catch(e){m=!1}m=!1}return m}()?n.body:await n.blob();return new Response(a,r)}n(4);const x="cache-entries",q=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class b{constructor(e){this._cacheName=e,this._db=new y("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(x,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise(((t,n)=>{const s=indexedDB.deleteDatabase(e);s.onerror=()=>{n(s.error)},s.onblocked=()=>{n(new Error("Delete blocked"))},s.onsuccess=()=>{t()}}))})(this._cacheName)}async setTimestamp(e,t){const n={url:e=q(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(x,n)}async getTimestamp(e){return(await this._db.get(x,this._getId(e))).timestamp}async expireEntries(e,t){const n=await this._db.transaction(x,"readwrite",((n,s)=>{const r=n.objectStore(x).index("timestamp").openCursor(null,"prev"),a=[];let i=0;r.onsuccess=()=>{const n=r.result;if(n){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&i>=t?a.push(n.value):i++),n.continue()}else s(a)}})),s=[];for(const r of n)await this._db.delete(x,r.id),s.push(r.url);return s}_getId(e){return this._cacheName+"|"+q(e)}}class U{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new b(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),n=await self.caches.open(this._cacheName);for(const s of t)await n.delete(s);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,w(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}n(1);const T=[],E={get:()=>T,add(e){T.push(...e)}};function L(e){if(!e)throw new r("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new r("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),a=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:a.href}}class N{constructor(e){this._cacheName=o(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"===typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=L(n),a="string"!==typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new r("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!==typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new r("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,a),t.length>0){const e="Workbox is precaching URLs without revision "+"info: ".concat(t.join(", "),"\nThis is generally NOT safe. ")+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install(){let{event:e,plugins:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=[],s=[],r=await self.caches.open(this._cacheName),a=await r.keys(),i=new Set(a.map((e=>e.url)));for(const[o,h]of this._urlsToCacheKeys)i.has(h)?s.push(o):n.push({cacheKey:h,url:o});const c=n.map((n=>{let{cacheKey:s,url:r}=n;const a=this._cacheKeysToIntegrities.get(s),i=this._urlsToCacheModes.get(r);return this._addURLToCache({cacheKey:s,cacheMode:i,event:e,integrity:a,plugins:t,url:r})}));await Promise.all(c);return{updatedURLs:n.map((e=>e.url)),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache(e){let{cacheKey:t,url:n,cacheMode:s,event:a,plugins:i,integrity:c}=e;const o=new Request(n,{integrity:c,cache:s,credentials:"same-origin"});let h,l=await v({event:a,plugins:i,request:o});for(const r of i||[])"cacheWillUpdate"in r&&(h=r);if(!(h?await h.cacheWillUpdate({event:a,request:o,response:l}):l.status<400))throw new r("bad-precaching-response",{url:n,status:l.status});l.redirected&&(l=await R(l)),await f({event:a,plugins:i,response:l,request:t===n?o:new Request(t),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return async t=>{let{request:n}=t;try{const e=await this.matchPrecache(n);if(e)return e;throw new r("missing-precache-entry",{cacheName:this._cacheName,url:n instanceof Request?n.url:n})}catch(s){if(e)return fetch(n);throw s}}}createHandlerBoundToURL(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.getCacheKeyForURL(e))throw new r("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let K;const M=()=>(K||(K=new N),K);function C(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(const n of[...e.searchParams.keys()])t.some((e=>e.test(n)))&&e.searchParams.delete(n);return e}const O=(e,t)=>{const n=M().getURLsToCacheKeys();for(const s of function*(e){let{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const a=new URL(e,location.href);a.hash="",yield a.href;const i=C(a,t);if(yield i.href,n&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=n,yield e.href}if(s){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let S=!1;function A(e){S||(!function(){let{ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const r=o();self.addEventListener("fetch",(a=>{const i=O(a.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!i)return;let c=self.caches.open(r).then((e=>e.match(i))).then((e=>e||fetch(i)));a.respondWith(c)}))}(e),S=!0)}const P=e=>{const t=M(),n=E.get();e.waitUntil(t.install({event:e,plugins:n}).catch((e=>{throw e})))},W=e=>{const t=M();e.waitUntil(t.activate())};n(2);const k=e=>e&&"object"===typeof e?e:{handle:e};class D{constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";this.handler=k(t),this.match=e,this.method=n}}class I extends D{constructor(e,t,n){super((t=>{let{url:n}=t;const s=e.exec(n.href);if(s&&(n.origin===location.origin||0===s.index))return s.slice(1)}),t,n)}}class j{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const n=Promise.all(t.urlsToCache.map((e=>{"string"===typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})})));e.waitUntil(n),e.ports&&e.ports[0]&&n.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest(e){let{request:t,event:n}=e;const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:r,route:a}=this.findMatchingRoute({url:s,request:t,event:n});let i=a&&a.handler;if(!i&&this._defaultHandler&&(i=this._defaultHandler),!i)return void 0;let c;try{c=i.handle({url:s,request:t,event:n,params:r})}catch(o){c=Promise.reject(o)}return c instanceof Promise&&this._catchHandler&&(c=c.catch((e=>this._catchHandler.handle({url:s,request:t,event:n})))),c}findMatchingRoute(e){let{url:t,request:n,event:s}=e;const r=this._routes.get(n.method)||[];for(const a of r){let e;const r=a.match({url:t,request:n,event:s});if(r)return e=r,(Array.isArray(r)&&0===r.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"===typeof r)&&(e=void 0),{route:a,params:e}}return{}}setDefaultHandler(e){this._defaultHandler=k(e)}setCatchHandler(e){this._catchHandler=k(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new r("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new r("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let H;const F=()=>(H||(H=new j,H.addFetchListener(),H.addCacheListener()),H);function B(e,t,n){let s;if("string"===typeof e){const r=new URL(e,location.href);0;s=new D((e=>{let{url:t}=e;return t.href===r.href}),t,n)}else if(e instanceof RegExp)s=new I(e,t,n);else if("function"===typeof e)s=new D(e,t,n);else{if(!(e instanceof D))throw new r("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});s=e}return F().registerRoute(s),s}n(3);const G={cacheWillUpdate:async e=>{let{response:t}=e;return 200===t.status||0===t.status?t:null}};var Q;self.addEventListener("activate",(()=>self.clients.claim())),function(e){M().addToCacheList(e),e.length>0&&(self.addEventListener("install",P),self.addEventListener("activate",W))}([{'revision':'5f0f74cd8aa665d8e973c2454c2e6c15','url':'/weather-app-pwa-test/index.html'},{'revision':null,'url':'/weather-app-pwa-test/static/css/2.1f265813.chunk.css'},{'revision':null,'url':'/weather-app-pwa-test/static/css/main.a0f28ca9.chunk.css'},{'revision':null,'url':'/weather-app-pwa-test/static/js/2.59981841.chunk.js'},{'revision':null,'url':'/weather-app-pwa-test/static/js/3.c7991dc7.chunk.js'},{'revision':null,'url':'/weather-app-pwa-test/static/js/main.7c6c80a5.chunk.js'},{'revision':null,'url':'/weather-app-pwa-test/static/js/runtime-main.e873c3b7.js'},{'revision':null,'url':'/weather-app-pwa-test/static/media/clock.359387cf.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/cloudy3.b7e18a25.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/fog.6105d90c.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/haze.b5b9a3c4.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/humidity.bcc24a5b.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/nightClear.d15bbe30.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/nightCloudy.00d8c0a2.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/nightCloudyFog.93392b02.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/nightRain.06643658.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/nightThunderStorm.52c4dac8.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/rain.06ebf3b6.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/reload.c6c1b2b8.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/setting-lines.4858059a.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/snowing.0a8de166.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/storm.b1993377.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/sun.aecbfd5e.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/thermometer.26bec6cd.svg'},{'revision':null,'url':'/weather-app-pwa-test/static/media/wind.c9a5073c.svg'}]),A(Q);const J=new RegExp("/[^/?]+\\.[^/]+$");var V;B((e=>{let{request:t,url:n}=e;return"navigate"===t.mode&&(!n.pathname.startsWith("/_")&&!n.pathname.match(J))}),(V="/weather-app-pwa-test/index.html",M().createHandlerBoundToURL(V))),B((e=>{let{url:t}=e;return t.origin===self.location.origin&&t.pathname.endsWith(".png")}),new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(this._cacheName=h(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[G,...e.plugins]}else this._plugins=[G];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle(e){let{event:t,request:n}=e;"string"===typeof n&&(n=new Request(n));const s=this._getFromNetwork({request:n,event:t});let a,i=await g({cacheName:this._cacheName,request:n,event:t,matchOptions:this._matchOptions,plugins:this._plugins});if(i){if(t)try{t.waitUntil(s)}catch(a){0}}else{0;try{i=await s}catch(c){a=c}}if(!i)throw new r("no-response",{url:n.url,error:a});return i}async _getFromNetwork(e){let{request:t,event:n}=e;const s=await v({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins}),r=f({cacheName:this._cacheName,request:t,response:s.clone(),event:n,plugins:this._plugins});if(n)try{n.waitUntil(r)}catch(a){0}return s}}({cacheName:"images",plugins:[new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var t;this.cachedResponseWillBeUsed=async e=>{let{event:t,request:n,cacheName:s,cachedResponse:r}=e;if(!r)return null;const a=this._isResponseDateFresh(r),i=this._getCacheExpiration(s);w(i.expireEntries());const c=i.updateTimestamp(n.url);if(t)try{t.waitUntil(c)}catch(o){0}return a?r:null},this.cacheDidUpdate=async e=>{let{cacheName:t,request:n}=e;const s=this._getCacheExpiration(t);await s.updateTimestamp(n.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),a.add(t))}_getCacheExpiration(e){if(e===h())throw new r("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new U(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),n=new Date(t).getTime();return isNaN(n)?null:n}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}))}]);
//# sourceMappingURL=service-worker.js.map