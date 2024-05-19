export const hideEl = el => {
  el.classList.add('is-hidden');
};

export const showEl = el => {
  el.classList.remove('is-hidden');
};

export const setDisabled = el => {
  el.disabled = true;
};

export const unsetDisabled = el => {
  el.disabled = false;
};

export const clearElInnerHtml = el => {
  el.innerHTML = '';
};
