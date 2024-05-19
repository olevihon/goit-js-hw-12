import{a as b,S as O,i as u}from"./assets/vendor-6e0bf343.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const I="28832278-63978a27bea5cce988fdacee8";b.defaults.baseURL="https://pixabay.com/";const p=15,E=async(t,s=1)=>(await b.get("api/",{params:{key:I,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:s}})).data,L=t=>t.map(({webformatURL:s,largeImageURL:l,tags:i,likes:e,views:r,comments:c,downloads:M})=>`
    <li class="gallery-item js-gallery-item">
        <a class="gallery-link js-gallery-link" href="${l}">
            <img class="gallery-img" src="${s}" alt="${i}" >
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
    </li>`).join(""),a=t=>{t.classList.add("is-hidden")},d=t=>{t.classList.remove("is-hidden")},$=t=>{t.disabled=!0},v=t=>{t.disabled=!1},D=t=>{t.innerHTML=""},g=document.querySelector(".js-gallery"),H=document.querySelector(".js-form-search"),o=document.querySelector(".js-loader"),n=document.querySelector(".js-btn-more"),j=document.querySelector(".js-end-msg"),m={position:"topRight",transitionIn:"fadeIn",transitionOut:"fadeOut",animateInside:!1},S=new O(".js-gallery .js-gallery-link",{captionsData:"alt",captionDelay:250,overlayOpacity:.8});let y="",f=1,h=0,P=null;const q=()=>{P=g.querySelector(".js-gallery-item:last-child")},T=async t=>{t.preventDefault();const s=t.currentTarget,l=s.querySelector(".js-btn-submit");if(y=s.elements.searchKeyword.value.trim(),y===""){u.error({message:"Please enter search query",...m});return}D(g),a(n),a(j);try{$(l),d(o);const{hits:i,totalHits:e}=await E(y,f);if(e===0){v(l),u.error({message:"Sorry, there are no images matching your search query. Please try again!",...m}),a(o),s.reset();return}a(o),g.innerHTML=L(i),q(),S.refresh(),s.reset(),a(o),v(l),h=Math.ceil(e/p),h>1&&(d(n),n.addEventListener("click",w))}catch(i){v(l),a(o),u.error({message:i.message,...m})}},w=async t=>{try{f+=1,a(n),d(o);const{hits:s,totalHits:l}=await E(y,f);a(o),g.insertAdjacentHTML("beforeend",L(s)),S.refresh(),window.scrollBy({top:P.getBoundingClientRect().bottom,left:0,behavior:"smooth"}),q(),h=Math.ceil(l/p),f<h?d(n):(n.removeEventListener("click",w),d(j))}catch(s){a(o),u.error({message:s.message,...m})}};H.addEventListener("submit",T);
//# sourceMappingURL=commonHelpers.js.map
