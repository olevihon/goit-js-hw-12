import{a as b,S as O,i as m}from"./assets/vendor-6e0bf343.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const I="28832278-63978a27bea5cce988fdacee8";b.defaults.baseURL="https://pixabay.com/";const p=15,E=async(t,s=1)=>(await b.get("api/",{params:{key:I,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:s}})).data,L=t=>t.map(({webformatURL:s,largeImageURL:l,tags:a,likes:e,views:r,comments:c,downloads:M})=>`
    <li class="gallery-item js-gallery-item">
        <a class="gallery-link js-gallery-link" href="${l}">
            <img class="gallery-img" src="${s}" alt="${a}" >
        </a>
        <div class="gallery-info">
            <div class="gallery-info-item">
                <div class="gallery-info-title">Likes</div>
                <div class="gallery-info-value">${e}</div>
            </div>
            <div class="gallery-info-item">
                <div class="gallery-info-title">Views</div>
                <div class="gallery-info-value">${r}</div>
            </div>
            <div class="gallery-info-item">
                <div class="gallery-info-title">Comments</div>
                <div class="gallery-info-value">${c}</div>
            </div>
            <div class="gallery-info-item">
                <div class="gallery-info-title">Downloads</div>
                <div class="gallery-info-value">${M}</div>
            </div>
        </div>   
    </li>`).join(""),i=t=>{t.classList.add("is-hidden")},d=t=>{t.classList.remove("is-hidden")},$=t=>{t.disabled=!0},v=t=>{t.disabled=!1},D=t=>{t.innerHTML=""},g=document.querySelector(".js-gallery"),H=document.querySelector(".js-form-search"),o=document.querySelector(".js-loader"),n=document.querySelector(".js-btn-more"),j=document.querySelector(".js-end-msg"),y={position:"topRight",transitionIn:"fadeIn",transitionOut:"fadeOut",animateInside:!1},S=new O(".js-gallery .js-gallery-link",{captionsData:"alt",captionDelay:250,overlayOpacity:.8});let f="",u=1,h=0,P=null;const q=()=>{P=g.querySelector(".js-gallery-item:last-child")},T=async t=>{t.preventDefault();const s=t.currentTarget,l=s.querySelector(".js-btn-submit");if(f=s.elements.searchKeyword.value.trim(),f===""){m.error({message:"Please enter search query",...y});return}D(g),i(n),i(j);try{$(l),d(o),u=1;const{hits:a,totalHits:e}=await E(f,u);if(e===0||a.length===0){v(l),m.error({message:"Sorry, there are no images matching your search query. Please try again!",...y}),i(o),s.reset();return}i(o),g.innerHTML=L(a),q(),S.refresh(),s.reset(),i(o),v(l),h=Math.ceil(e/p),h>1&&(d(n),n.addEventListener("click",w))}catch(a){v(l),i(o),m.error({message:a.message,...y})}},w=async t=>{try{u+=1,i(n),d(o);const{hits:s,totalHits:l}=await E(f,u);i(o),g.insertAdjacentHTML("beforeend",L(s)),S.refresh(),window.scrollBy({top:P.getBoundingClientRect().bottom,left:0,behavior:"smooth"}),q(),h=Math.ceil(l/p),u<h?d(n):(n.removeEventListener("click",w),d(j))}catch(s){i(o),m.error({message:s.message,...y})}};H.addEventListener("submit",T);
//# sourceMappingURL=commonHelpers.js.map
