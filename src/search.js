const store = {
  isCaseSensitive: false,
  input: undefined,
  sourceTexts: undefined,
};

store.sourceTexts = Array.from(
  document
    .getElementById('text')
    .getElementsByTagName('p'))
  .map(item => item.innerText);

const search =(val, param, strings) => {
  let flags = !param ? 'gi' : 'g';
  let regexp = new RegExp(val, flags);

  return strings.map(text =>
    text.replace(regexp, match =>
      `<span class="selected">${match}</span>`
    )
  );
};

const render = (val) => {
  document.getElementById('text').innerHTML = val.map(paragraph => `<p>${paragraph}</p>`).join('');
};

const checkboxOnChangeHandler = (e) => {
  store.isCaseSensitive = e.target.checked;
  render(search(store.input, store.isCaseSensitive, store.sourceTexts));
};

const inputOnChangeHandler = (e) => {
  store.input = e.target.value;
  render(search(store.input, store.isCaseSensitive, store.sourceTexts));
};

document.getElementById('searchInput').addEventListener('input', inputOnChangeHandler);
document.getElementById('register').addEventListener('change', checkboxOnChangeHandler);

