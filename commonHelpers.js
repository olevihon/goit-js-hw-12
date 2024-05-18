import{S as u,i as o}from"./assets/vendor-8c59ed88.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const y="28832278-63978a27bea5cce988fdacee8",m="https://pixabay.com/api/",g=s=>{const i=new URLSearchParams({key:y,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${m}/?${i}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})},h=s=>s.map(({webformatURL:i,largeImageURL:t,tags:l,likes:e,views:r,comments:a,downloads:f})=>`
    <li class="gallery-item">
        <a class="gallery-link js-gallery-link" href="${t}">
            <img class="gallery-img" src="${i}" alt="${l}" >
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
                <div class="gallery-info-value">${a}</div>
            </div>
            <div class="gallery-info-item">
                <div class="gallery-info-title">Downloads</div>
                <div class="gallery-info-value">${f}</div>
            </div>
        </div>   
    </li>`).join(""),c=document.querySelector(".js-gallery"),v=document.querySelector(".js-form-search"),d=document.querySelector(".js-loader"),n={position:"topRight",transitionIn:"fadeIn",transitionOut:"fadeOut",animateInside:!1},p=new u(".js-gallery .js-gallery-link",{captionsData:"alt",captionDelay:250,overlayOpacity:.8});function L(s){s.preventDefault();const i=s.target.elements.searchKeyword.value.trim();if(i===""){o.error({message:"Please enter search query",...n});return}d.classList.remove("is-hidden"),c.innerHTML="",g(i).then(t=>{if(t.total===0){o.error({message:"Sorry, there are no images matching your search query. Please try again!",...n});return}c.innerHTML=h(t.hits),p.refresh()}).catch(t=>{o.error({message:t.message,...n})}).finally(()=>{s.target.reset(),d.classList.add("is-hidden")})}v.addEventListener("submit",L);
//# sourceMappingURL=commonHelpers.js.map
