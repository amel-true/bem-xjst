var BEMHTML=function(t,e){return function(i){if("object"==typeof e&&"undefined"!=typeof t)t.exports=i();else if("function"==typeof define&&define.amd)define([],i);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.bemhtml=i()}}(function(){return function t(e,i,n){function s(o,h){if(!i[o]){if(!e[o]){var c="function"==typeof require&&require;if(!h&&c)return c(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var a=i[o]={exports:{}};e[o][0].call(a.exports,function(t){var i=e[o][1][t];return s(i?i:t)},a,a.exports,t,e,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({1:[function(t,e,i){function n(t){this.bemxjst=t,this.jsClass=null,this.tag=new r(this),this.attrs=new r(this),this.mod=new r(this),this.js=new r(this),this.mix=new r(this),this.bem=new r(this),this.cls=new r(this),o.apply(this,arguments)}var s=t("inherits"),r=t("../bemxjst/match").Match,o=t("../bemxjst/entity").Entity;s(n,o),i.Entity=n,n.prototype.init=function(t,e){this.block=t,this.elem=e,this.jsClass=this.bemxjst.classBuilder.build(this.block,this.elem)},n.prototype._initRest=function(t){"default"===t?this.rest[t]=this.def:"tag"===t||"attrs"===t||"js"===t||"mix"===t||"bem"===t||"cls"===t||"content"===t?this.rest[t]=this[t]:this.rest.hasOwnProperty(t)||(this.rest[t]=new r(this))},n.prototype.defaultBody=function(t){var e=this.tag.exec(t);void 0===e&&(e=t.ctx.tag);var i;t.ctx.js!==!1&&(i=this.js.exec(t));var n=this.bem.exec(t),s=this.cls.exec(t),r=this.mix.exec(t),o=this.attrs.exec(t),h=this.content.exec(t);return 0===this.content.count&&void 0===h&&(h=t.ctx.content),this.bemxjst.render(t,this,e,i,n,s,r,o,h)}},{"../bemxjst/entity":5,"../bemxjst/match":7,inherits:10}],2:[function(t,e,i){function n(t){h.apply(this,arguments);var e="undefined"==typeof t.xhtml?!0:t.xhtml;this._shortTagCloser=e?"/>":">"}var s=t("inherits"),r=t("../bemxjst/utils"),o=t("./entity").Entity,h=t("../bemxjst");s(n,h),e.exports=n,n.prototype.Entity=o,n.prototype.runMany=function(t){var e="",i=this.context,n=i.position,s=i._notNewList;if(s?i._listLength+=t.length-1:(i.position=0,i._listLength=t.length),i._notNewList=!0,this.canFlush)for(var r=0;r<t.length;r++)e+=i._flush(this._run(t[r]));else for(var r=0;r<t.length;r++)e+=this._run(t[r]);return s||(i.position=n),e},n.prototype.render=function(t,e,i,n,s,o,h,c,l){var a=t.ctx;if(void 0===i&&(i="div"),!i)return this.renderNoTag(t,n,s,o,h,c,l);var u="<"+i,p=a.js;p!==!1&&(n===!0&&(n={}),n?p!==!0&&(n=r.extend(p,n)):n=p===!0?{}:p);var f;n&&(f={},f[e.jsClass]=n);var d=s;void 0===d&&(d=void 0===a.bem?e.block||e.elem:a.bem),d=!!d,void 0===o&&(o=a.cls);var m=e.block&&f&&!e.elem;if(!d&&!o)return this.renderClose(u,t,i,c,d,a,l);if(u+=' class="',d){var y=e.elem?t.elemMods:t.mods;u+=e.jsClass,u+=this.buildModsClasses(e.block,e.elem,y);var v=h;if(a.mix&&(v=v?[].concat(v,a.mix):a.mix),v){var b=this.renderMix(e,v,f,m);u+=b.out,f=b.jsParams,m=b.addJSInitClass}o&&(u+=" "+o)}else o&&(u+=o);return u+=m?' i-bem"':'"',d&&f&&(u+=" data-bem='"+r.jsAttrEscape(JSON.stringify(f))+"'"),this.renderClose(u,t,i,c,d,a,l)},n.prototype.renderClose=function(t,e,i,n,s,o,h){var c=t;if(n=r.extend(n,o.attrs)){var l;for(l in n){var a=n[l];void 0!==a&&a!==!1&&null!==a&&(c+=a===!0?" "+l:" "+l+'="'+r.attrEscape(r.isSimple(a)?a:this.context.reapply(a))+'"')}}return r.isShortTag(i)?(c+=this._shortTagCloser,this.canFlush&&(c=e._flush(c))):(c+=">",this.canFlush&&(c=e._flush(c)),(h||0===h)&&(c+=this.renderContent(h,s)),c+="</"+i+">"),this.canFlush&&(c=e._flush(c)),c},n.prototype.renderMix=function(t,e,i,n){var s={},o=this.context,h=i,c=n;s[t.jsClass]=!0,r.isArray(e)||(e=[e]);for(var l=this.classBuilder,a="",u=0;u<e.length;u++){var p=e[u];if(p){"string"==typeof p&&(p={block:p,elem:void 0});var f=!1;p.elem?f=p.elem!==t.elem&&p.elem!==o.elem||p.block&&p.block!==t.block:p.block&&(f=!(p.block===t.block&&p.mods)||p.mods&&t.elem);var d=p.block||p._block||o.block,m=p.elem||p._elem||o.elem,y=l.build(d,m),v=p.elem||p._elem||(p.block?void 0:o.elem);if(f&&(a+=" "+l.build(d,v)),a+=this.buildModsClasses(d,v,p.elem||!p.block&&(p._elem||o.elem)?p.elemMods:p.mods),p.js&&(h||(h={}),h[l.build(d,p.elem)]=p.js===!0?{}:p.js,c||(c=d&&!p.elem)),f&&!s[y]){s[y]=!0;var b=this.entities[y];if(b){var x=o.block,g=o.elem,k=b.mix.exec(o);if(o.elem=g,o.block=x,k)for(var w=0;w<k.length;w++){var M=k[w];(M.block||M.elem)&&s[l.build(M.block,M.elem)]||(M._block=d,M._elem=m,e=e.slice(0,u+1).concat(M,e.slice(u+1)))}}}}}return{out:a,jsParams:h,addJSInitClass:c}},n.prototype.buildModsClasses=function(t,e,i){if(!i)return"";var n,s="";for(n in i)if(i.hasOwnProperty(n)&&""!==n){var r=i[n];if(r||0===r){"boolean"!=typeof r&&(r+="");var o=this.classBuilder;s+=" "+(e?o.buildElemClass(t,e,n,r):o.buildBlockClass(t,n,r))}}return s},n.prototype.renderNoTag=function(t,e,i,n,s,r,o){return o||0===o?this._run(o):""}},{"../bemxjst":6,"../bemxjst/utils":9,"./entity":1,inherits:10}],3:[function(t,e,i){function n(t){this.modDelim=t.mod||"_",this.elemDelim=t.elem||"__"}i.ClassBuilder=n,n.prototype.build=function(t,e){return e?t+this.elemDelim+e:t},n.prototype.buildModPostfix=function(t,e){var i=this.modDelim+t;return e!==!0&&(i+=this.modDelim+e),i},n.prototype.buildBlockClass=function(t,e,i){var n=t;return i&&(n+=this.buildModPostfix(e,i)),n},n.prototype.buildElemClass=function(t,e,i,n){var s=this.buildBlockClass(t)+this.elemDelim+e;return n&&(s+=this.buildModPostfix(i,n)),s},n.prototype.split=function(t){return t.split(this.elemDelim,2)}},{}],4:[function(t,e,i){function n(t){this._bemxjst=t,this.ctx=null,this.block="",this._currBlock="",this.elem=null,this.mods={},this.elemMods={},this.position=0,this._listLength=0,this._notNewList=!1,this._onceRef={}}var s=t("./utils");i.Context=n,n.prototype._flush=null,n.prototype.isArray=s.isArray,n.prototype.isSimple=s.isSimple,n.prototype.isShortTag=s.isShortTag,n.prototype.extend=s.extend,n.prototype.identify=s.identify,n.prototype.xmlEscape=s.xmlEscape,n.prototype.attrEscape=s.attrEscape,n.prototype.jsAttrEscape=s.jsAttrEscape,n.prototype.isFirst=function(){return 1===this.position},n.prototype.isLast=function(){return this.position===this._listLength},n.prototype.generateId=function(){return s.identify(this.ctx)},n.prototype.reapply=function(t){return this._bemxjst.run(t)}},{"./utils":9}],5:[function(t,e,i){function n(t,e,i,n){this.bemxjst=t,this.block=null,this.elem=null,this.options={},this.canFlush=!0,this.def=new o(this),this.content=new o(this),this.rest={},this.init(e,i),this.initModes(n)}function s(){return this.ctx.content}var r=t("./utils"),o=t("./match").Match,h=t("./tree"),c=h.Template,l=h.PropertyMatch,a=h.CompilerOptions;i.Entity=n,n.prototype.init=function(t,e){this.block=t,this.elem=e},n.prototype.initModes=function(t){for(var e=0;e<t.length;e++){for(var i=t[e],n=i.predicates.length-1;n>=0;n--){var s=i.predicates[n];if(s instanceof l&&"_mode"===s.key){i.predicates.splice(n,1),this._initRest(s.value),this.rest[s.value].push(i);break}}-1===n&&this.def.push(i);for(var n=i.predicates.length-1;n>=0;n--){var s=i.predicates[n];s instanceof a&&(this.options=r.extend(this.options,s.options))}}},n.prototype.prepend=function(t){for(var e=Object.keys(this.rest),i=0;i<e.length;i++){var n=e[i];t.rest[n]&&this.rest[n].prepend(t.rest[n])}e=Object.keys(t.rest);for(var i=0;i<e.length;i++){var n=e[i];this.rest[n]||(this._initRest(n),this.rest[n].prepend(t.rest[n]))}},n.prototype.run=function(t){return 0!==this.def.count?this.def.exec(t):this.defaultBody(t)},n.prototype.setDefaults=function(){if(0!==this.content.count&&this.content.push(new c([],s)),0!==this.def.count){this.canFlush=this.options.flush||!1;var t=this;this.def.push(new c([],function(){return t.defaultBody(this)}))}}},{"./match":7,"./tree":8,"./utils":9}],6:[function(t,e,i){function n(t){this.options=t||{},this.entities=null,this.defaultEnt=null,this.tree=null,this.match=null,this.contextConstructor=function(t){h.call(this,t)},s(this.contextConstructor,h),this.context=null,this.classBuilder=new c(this.options.naming||{}),this.depth=0,this.canFlush=!1,this.oninit=null,this.defaultEnt=new this.Entity(this,"","",[]),this.defaultElemEnt=new this.Entity(this,"","",[])}var s=t("inherits"),r=t("./tree").Tree,o=t("./tree").PropertyMatch,h=t("./context").Context,c=t("./class-builder").ClassBuilder,l=t("./utils");e.exports=n,n.prototype.locals=r.methods.concat("local","applyCtx","applyNext","apply"),n.prototype.compile=function(t){function e(){return o._run(o.context.ctx)}function i(t,i){return i?o.local(i,function(){return o.local({ctx:t},e)}):o.local({ctx:t},e)}function n(t,e){return o.applyMode(t,e)}function s(t){return function(e){return o.local(t,e)}}var o=this,h=new r({refs:{applyCtx:i,local:s}}),c=this.recompileInput(t),l=h.build(c,[s,i,function u(t){return t?o.local(t,u):o.applyNext()},n]);this.tree&&(l={templates:l.templates.concat(this.tree.templates),oninit:this.tree.oninit.concat(l.oninit)}),this.tree=l;var a=this.groupEntities(l.templates);a=this.transformEntities(a),this.entities=a,this.oninit=l.oninit},n.prototype.recompileInput=function(t){var e=t.toString(),i=n.prototype.locals;return"function"==typeof t&&t.length===i.length?t:(e=e.replace(/^function[^{]+{|}$/g,""),e=new Function(i.join(", "),e))},n.prototype.groupEntities=function(t){for(var e={},i=0;i<t.length;i++){var n,s=t[i].clone(),r=null;n=void 0;for(var h=0;h<s.predicates.length;h++){var c=s.predicates[h];if(c instanceof o){if("block"===c.key)r=c.value;else{if("elem"!==c.key)continue;n=c.value}s.predicates.splice(h,1),h--}}if(null===r)throw new Error('block("...") not found in one of the templates');var l=this.classBuilder.build(r,n);e[l]||(e[l]=[]),e[l].push(s)}return e},n.prototype.transformEntities=function(t){for(var e=[],i=Object.keys(t),n=0;n<i.length;n++){var s=i[n],r=this.classBuilder.split(s),o=r[0],h=r[1];"*"===h&&e.push(o),t[s]=new this.Entity(this,o,h,t[s])}if(t.hasOwnProperty("*")){for(var c=t["*"],n=0;n<i.length;n++){var s=i[n];"*"!==s&&t[s].prepend(c)}this.defaultEnt.prepend(c),this.defaultElemEnt.prepend(c)}for(var n=0;n<e.length;n++){for(var o=e[n],l=this.classBuilder.build(o,"*"),c=t[l],n=0;n<i.length;n++){var s=i[n];if(s!==l){var a=t[s];a.block===o&&void 0!==a.elem&&t[s].prepend(c)}}this.defaultElemEnt.prepend(c)}for(var n=0;n<i.length;n++){var s=i[n];t[s].setDefaults(),this.defaultEnt.setDefaults(),this.defaultElemEnt.setDefaults()}return t},n.prototype._run=function(t){var e;return e=void 0===t||""===t||null===t?this.runEmpty():l.isArray(t)?this.runMany(t):l.isSimple(t)?this.runSimple(t):this.runOne(t)},n.prototype.run=function(t){var e=this.match,i=this.context;this.match=null,this.context=new this.contextConstructor(this),this.canFlush=null!==this.context._flush,this.depth=0;var n=this._run(t);return this.canFlush&&(n=this.context._flush(n)),this.match=e,this.context=i,n},n.prototype.runEmpty=function(){return this.context._listLength--,""},n.prototype.runSimple=function(t){this.context._listLength--;var e="";return(t&&t!==!0||0===t)&&(e+=t),e},n.prototype.runOne=function(t){var e=this.context,i=e.ctx,n=e.block,s=e._currBlock,r=e.elem,o=e.mods,h=e.elemMods;t.block||t.elem?e._currBlock="":e._currBlock=e.block,e.ctx=t,t.block?(e.block=t.block,t.mods?e.mods=t.mods:e.mods={}):t.elem?s&&(e.block=s):e.block="",e.elem=t.elem,t.elemMods?e.elemMods=t.elemMods:e.elemMods={};var c=e.block||"",l=e.elem;c||l?e.position++:e._listLength--,this.depth++;var a=this.classBuilder.build(c,l),u=!1,p=this.entities[a];p?this.canFlush&&!p.canFlush&&(u=!0,this.canFlush=!1):(p=this.defaultEnt,void 0!==l&&(p=this.defaultElemEnt),p.init(c,l));var f=p.run(e);return e.ctx=i,e.block=n,e.elem=r,e.mods=o,e.elemMods=h,e._currBlock=s,this.depth--,u&&(this.canFlush=!0),f},n.prototype.renderContent=function(t,e){var i=this.context,n=i.position,s=i._listLength,r=i._notNewList;i._notNewList=!1,e&&(i.position=0,i._listLength=1);var o=this._run(t);return i.position=n,i._listLength=s,i._notNewList=r,o},n.prototype.local=function(t,e){for(var i=Object.keys(t),n=[],s=0;s<i.length;s++){for(var r=i[s],o=r.split("."),h=this.context,c=0;c<o.length-1;c++)h=h[o[c]];n.push({parts:o,value:h[o[c]]}),h[o[c]]=t[r]}for(var l=e.call(this.context),s=0;s<n.length;s++){for(var o=n[s].parts,h=this.context,c=0;c<o.length-1;c++)h=h[o[c]];h[o[c]]=n[s].value}return l},n.prototype.applyNext=function(){return this.match.exec(this.context)},n.prototype.applyMode=function(t,e){var i=this.match.entity.rest[t];if(i){if(!e)return i.exec(this.context);var n=this,s=function(){return i.exec(n.context)};return this.local(e,s)}},n.prototype.exportApply=function(t){var e=this;t.apply=function(t){return e.run(t)},t.compile=function(t){return e.compile(t)};var i={};t.BEMContext=this.contextConstructor,i.BEMContext=t.BEMContext;for(var n=0;n<this.oninit.length;n++){var s=this.oninit[n];s(t,i)}}},{"./class-builder":3,"./context":4,"./tree":8,"./utils":9,inherits:10}],7:[function(t,e,i){function n(t,e){this.template=t,this.key=e.key,this.value=e.value}function s(t,e){this.template=t,this.keys=e.key,this.value=e.value}function r(t,e){this.template=t,this.key=e.key}function o(t,e){this.template=t,this.body=e.body}function h(t){this.template=t,this.once=null}function c(t){this.template=t,this.wrap=null}function l(t,e){this.mode=t,this.predicates=new Array(e.predicates.length),this.body=e.body;for(var i=[],l=0,a=0;l<this.predicates.length;l++,a++){var p=e.predicates[l];p instanceof f?u.isArray(p.key)?this.predicates[a]=new s(this,p):this.predicates[a]=new n(this,p):p instanceof y?this.predicates[a]=new r(this,p):p instanceof v?this.predicates[a]=new o(this,p):p instanceof d?(a--,i.push(new h(this))):p instanceof m?(a--,i.push(new c(this))):a--}for(var l=0;l<i.length;l++,a++)this.predicates[a]=i[l];this.predicates.length!==a&&(this.predicates.length=a)}function a(t){this.entity=t,this.bemxjst=this.entity.bemxjst,this.templates=[],this.mask=[0],this.maskSize=0,this.maskOffset=0,this.count=0,this.depth=-1,this.thrownError=null}var u=t("./utils"),p=t("./tree"),f=p.PropertyMatch,d=p.OnceMatch,m=p.WrapMatch,y=p.PropertyAbsent,v=p.CustomMatch;n.prototype.exec=function(t){return t[this.key]===this.value},s.prototype.exec=function(t){for(var e=t,i=0;i<this.keys.length-1;i++)if(e=e[this.keys[i]],!e)return!1;return e[this.keys[i]]===this.value},r.prototype.exec=function(t){return!t[this.key]},o.prototype.exec=function(t){return this.body.call(t,t,t.ctx)},h.prototype.exec=function(t){var e=this.once!==t._onceRef;return this.once=t._onceRef,e},c.prototype.exec=function(t){var e=this.wrap!==t.ctx;return this.wrap=t.ctx,e},i.MatchTemplate=l,i.Match=a,a.prototype.clone=function(t){var e=new a(t);return e.templates=this.templates.slice(),e.mask=this.mask.slice(),e.maskSize=this.maskSize,e.count=this.count,e},a.prototype.prepend=function(t){for(this.templates=t.templates.concat(this.templates),this.count+=t.count;Math.ceil(this.count/31)>this.mask.length;)this.mask.push(0);this.maskSize=this.mask.length},a.prototype.push=function(t){this.templates.push(new l(this,t)),this.count++,Math.ceil(this.count/31)>this.mask.length&&this.mask.push(0),this.maskSize=this.mask.length},a.prototype.tryCatch=function(t,e){try{return t.call(e,e,e.ctx)}catch(i){this.thrownError=i}},a.prototype.exec=function(t){for(var e,i=this.checkDepth(),n=this.maskOffset,s=this.mask[n],r=1,o=0;o<this.count;o++){if(0===(s&r)){e=this.templates[o];for(var h=0;h<e.predicates.length;h++){var c=e.predicates[h];if(!c.exec(t))break}if(h===e.predicates.length)break}1073741824===r?(n++,s=this.mask[n],r=1):r<<=1}if(o!==this.count){var l=s,a=this.bemxjst.match;this.mask[n]|=r,this.bemxjst.match=this,this.thrownError=null;var u;u="function"==typeof e.body?this.tryCatch(e.body,t):e.body,this.mask[n]=l,this.bemxjst.match=a,this.restoreDepth(i);var p=this.thrownError;if(null!==p)throw this.thrownError=null,p;return u}},a.prototype.checkDepth=function(){if(-1===this.depth)return this.depth=this.bemxjst.depth,-1;if(this.bemxjst.depth===this.depth)return this.depth;var t=this.depth;for(this.depth=this.bemxjst.depth,this.maskOffset+=this.maskSize;this.mask.length<this.maskOffset+this.maskSize;)this.mask.push(0);return t},a.prototype.restoreDepth=function(t){-1!==t&&t!==this.depth&&(this.maskOffset-=this.maskSize),this.depth=t}},{"./tree":8,"./utils":9}],8:[function(t,e,i){function n(t,e){this.predicates=t,this.body=e}function s(){}function r(t,e){this.conditions=[],this.children=[];for(var i=e.length-1;i>=0;i--){var n=e[i];n instanceof s?this.conditions.push(n):n===t.boundBody?this.children[i]=t.queue.pop():this.children[i]=n}}function o(){s.call(this)}function h(t){s.call(this),this.refs=t}function c(t){s.call(this),this.refs=t}function l(t){s.call(this),this.refs=t}function a(t){s.call(this),this.options=t}function u(t,e){s.call(this),this.key=t,this.value=e}function p(t){s.call(this),this.key=t}function f(t){s.call(this),this.body=t}function d(t){this.options=t,this.refs=this.options.refs,this.boundBody=this.body.bind(this);for(var e=this.methods("body"),i=0;i<e.length;i++){var n=e[i];this.boundBody[d.methods[i]]=n}this.queue=[],this.templates=[],this.initializers=[]}function m(t,e,i){var n=t[i],s=t.boundBody;return"body"!==e?"replace"===i||"extend"===i||"wrap"===i?function(){return n.apply(t,arguments)}:function(){return n.apply(t,arguments),s}:function(){var e=n.apply(t,arguments),r=t.queue.pop(),o=t.queue[t.queue.length-1];return o.conditions=o.conditions.concat(r.conditions),o.children=o.children.concat(r.children),"replace"===i||"extend"===i||"wrap"===i?e:s}}var y=t("minimalistic-assert"),v=t("inherits");i.Template=n,n.prototype.wrap=function(){for(var t=this.body,e=0;e<this.predicates.length;e++){var i=this.predicates[e];t=i.wrapBody(t)}this.body=t},n.prototype.clone=function(){return new n(this.predicates.slice(),this.body)},i.MatchBase=s,s.prototype.wrapBody=function(t){return t},v(o,s),i.OnceMatch=o,v(h,s),i.WrapMatch=h,h.prototype.wrapBody=function(t){var e=this.refs.applyCtx;return"function"!=typeof t?function(){return e(t)}:function(){return e(t.call(this))}},v(c,s),i.ReplaceMatch=c,c.prototype.wrapBody=function(t){var e=this.refs.applyCtx;return"function"!=typeof t?function(){return e(t)}:function(){return e(t.call(this))}},v(l,s),i.ExtendMatch=l,l.prototype.wrapBody=function(t){var e=this.refs.applyCtx,i=this.refs.local;return"function"!=typeof t?function(){for(var n={},s=Object.keys(t),r=0;r<s.length;r++)n["ctx."+s[r]]=t[s[r]];return i(n)(function(){return e(this.ctx)})}:function(){for(var n={},s=t.call(this),r=Object.keys(s),o=0;o<r.length;o++)n["ctx."+r[o]]=s[r[o]];return i(n)(function(){return e(this.ctx)})}},v(a,s),i.CompilerOptions=a,v(u,s),i.PropertyMatch=u,v(p,s),i.PropertyAbsent=p,v(f,s),i.CustomMatch=f,i.Tree=d,d.methods=["match","once","wrap","elemMatch","block","elem","mode","mod","elemMod","def","tag","attrs","cls","js","bem","mix","content","replace","extend","oninit","xjstOptions"],d.prototype.build=function(t,e){var i=this.methods("global").concat(e);return i[0]=this.match.bind(this),t.apply({},i),{templates:this.templates.slice().reverse(),oninit:this.initializers}},d.prototype.methods=function(t){for(var e=new Array(d.methods.length),i=0;i<e.length;i++){var n=d.methods[i];e[i]=m(this,t,n)}return e},d.prototype.flush=function(t,e){var i;i=e.conditions?t.concat(e.conditions):e.conditions;for(var s=0;s<e.children.length;s++){var o=e.children[s];if(o instanceof r)this.flush(i,e.children[s]);else{var h=new n(t,o);h.wrap(),this.templates.push(h)}}},d.prototype.body=function(){for(var t=new Array(arguments.length),e=0;e<arguments.length;e++)t[e]=arguments[e];var i=new r(this,t);return this.queue[this.queue.length-1].children.push(i),1===this.queue.length&&this.flush([],this.queue.shift()),this.boundBody},d.prototype.match=function(){for(var t=new Array(arguments.length),e=0;e<arguments.length;e++){var i=arguments[e];"function"==typeof i&&(i=new f(i)),y(i instanceof s,"Wrong .match() argument"),t[e]=i}return this.queue.push(new r(this,t)),this.boundBody},d.prototype.once=function(){if(arguments.length)throw new Error("Predicate once() should not have arguments");return this.match(new o)},d.prototype.applyMode=function(t,e){if(t.length)throw new Error("Predicate should not have arguments but "+JSON.stringify(t)+" passed");return this.mode(e)},d.prototype.wrap=function(){return this.def.apply(this,arguments).match(new h(this.refs))},d.prototype.xjstOptions=function(t){return this.queue.push(new r(this,[new a(t)])),this.boundBody},d.prototype.block=function(t){return this.match(new u("block",t))},d.prototype.elemMatch=function(){return this.match.apply(this,arguments)},d.prototype.elem=function(t){return this.match(new u("elem",t))},d.prototype.mode=function(t){return this.match(new u("_mode",t))},d.prototype.mod=function(t,e){return this.match(new u(["mods",t],e))},d.prototype.elemMod=function(t,e){return this.match(new u(["elemMods",t],e))},d.prototype.def=function(){return this.applyMode(arguments,"default")},d.prototype.tag=function(){return this.applyMode(arguments,"tag")},d.prototype.attrs=function(){return this.applyMode(arguments,"attrs")},d.prototype.cls=function(){return this.applyMode(arguments,"cls")},d.prototype.js=function(){return this.applyMode(arguments,"js")},d.prototype.bem=function(){return this.applyMode(arguments,"bem")},d.prototype.mix=function(){return this.applyMode(arguments,"mix")},d.prototype.content=function(){return this.applyMode(arguments,"content")},d.prototype.replace=function(){return this.def.apply(this,arguments).match(new c(this.refs))},d.prototype.extend=function(){return this.def.apply(this,arguments).match(new l(this.refs))},d.prototype.oninit=function(t){this.initializers.push(t)}},{inherits:10,"minimalistic-assert":11}],9:[function(t,e,i){function n(){return l+ ++o}var s=Object.prototype.toString;i.isArray=Array.isArray,i.isArray||(i.isArray=function(t){return"[object Array]"===s.call(t)}),i.xmlEscape=function(t){return(t+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},i.attrEscape=function(t){return(t+"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")},i.jsAttrEscape=function(t){return(t+"").replace(/&/g,"&amp;").replace(/'/g,"&#39;")},i.extend=function(t,e){if(!t||!e)return t||e;var i,n={};for(i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);for(i in e)e.hasOwnProperty(i)&&(n[i]=e[i]);return n};var r={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,wbr:1};i.isShortTag=function(t){return r.hasOwnProperty(t)},i.isSimple=function(t){return t&&t!==!0?"string"==typeof t||"number"==typeof t:!0};var o=0,h=+new Date,c="__"+h,l="uniq"+h;i.getUniq=n,i.identify=function(t,e){if(!t)return n();if(e||t[c])return t[c];var i=n();return t[c]=i,i}},{}],10:[function(t,e,i){"function"==typeof Object.create?e.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(t,e){t.super_=e;var i=function(){};i.prototype=e.prototype,t.prototype=new i,t.prototype.constructor=t}},{}],11:[function(t,e,i){function n(t,e){if(!t)throw new Error(e||"Assertion failed")}e.exports=n,n.equal=function(t,e,i){if(t!=e)throw new Error(i||"Assertion failed: "+t+" != "+e)}},{}]},{},[2])(2)}),t.exports||e.BEMHTML}({},{}),api=new BEMHTML({});api.compile(function(t,e,i,n,s,r,o,h,c,l,a,u,p,f,d,m,y,v,b,x,g,k,w,M,_){});