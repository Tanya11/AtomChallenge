import{b as N}from"./chunk-SNQLB77J.js";import{b as P,c as w,d as I,f as M,h as D}from"./chunk-6DVVXX7C.js";import{Da as g,Ob as F,Sa as f,Ua as y,V as d,Wa as v,X as p,Ya as A,Za as C,ba as h,cc as b,ga as m,ja as c,ka as u,qb as R}from"./chunk-5REYHDUB.js";var x=(()=>{class n{constructor(){this.title="atom-challenge-fe-template"}static{this.\u0275fac=function(r){return new(r||n)}}static{this.\u0275cmp=m({type:n,selectors:[["app-root"]],standalone:!0,features:[F],decls:1,vars:0,template:function(r,o){r&1&&R(0,"router-outlet")},dependencies:[M]})}}return n})();var O="@",k=(()=>{class n{constructor(t,r,o,i,s){this.doc=t,this.delegate=r,this.zone=o,this.animationType=i,this.moduleImpl=s,this._rendererFactoryPromise=null,this.scheduler=h(y,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-2SSLZWAO.js")).catch(r=>{throw new d(5300,!1)}).then(({\u0275createEngine:r,\u0275AnimationRendererFactory:o})=>{this._engine=r(this.animationType,this.doc,this.scheduler);let i=new o(this.delegate,this._engine,this.zone);return this.delegate=i,i})}createRenderer(t,r){let o=this.delegate.createRenderer(t,r);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let i=new a(o);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(s=>{let T=s.createRenderer(t,r);i.use(T)}).catch(s=>{i.use(o)}),i}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(r){f()}}static{this.\u0275prov=p({token:n,factory:n.\u0275fac})}}return n})(),a=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,r,o){this.delegate.insertBefore(e,t,r,o)}removeChild(e,t,r){this.delegate.removeChild(e,t,r)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,r,o){this.delegate.setAttribute(e,t,r,o)}removeAttribute(e,t,r){this.delegate.removeAttribute(e,t,r)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,r,o){this.delegate.setStyle(e,t,r,o)}removeStyle(e,t,r){this.delegate.removeStyle(e,t,r)}setProperty(e,t,r){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(e,t,r)),this.delegate.setProperty(e,t,r)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,r){return this.shouldReplay(t)&&this.replay.push(o=>o.listen(e,t,r)),this.delegate.listen(e,t,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(O)}};function l(n="animations"){return A("NgAsyncAnimations"),c([{provide:v,useFactory:(e,t,r)=>new k(e,t,r,n),deps:[b,w,C]},{provide:g,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var E=[{path:"",redirectTo:"/home",pathMatch:"full"},{path:"home",loadComponent:()=>import("./chunk-W7XE3GZA.js").then(n=>n.ExamplePageComponent)},{path:"tasks",loadComponent:()=>import("./chunk-DSI7IE7E.js").then(n=>n.TasksPageComponent)}];var S={providers:[D(E),l(),l(),P(),u(N)]};I(x,S).catch(n=>console.error(n));
