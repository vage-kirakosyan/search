let isCaseSensitive = false;
let input = '';

const search =(val, param) => {
  let flags = !param ? 'gi' : 'g';
  let regexp = new RegExp(val, flags);
  let text = document.getElementById('text').innerText;

  document.getElementById('text').innerHTML = text.replace(regexp, match => {
    return `<span class="selected">${match}</span>`;
  });
};

const checkboxOnChangeHandler = (e) => {
  isCaseSensitive = e.target.checked;
  search(input, isCaseSensitive);
};

const inputOnChangeHandler = (e) => {
  input = e.target.value;
  search(input, isCaseSensitive);
};

document.getElementById('searchInput').addEventListener('input', inputOnChangeHandler);
document.getElementById('register').addEventListener('change', checkboxOnChangeHandler);

