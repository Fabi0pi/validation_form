const formNode = document.getElementById('dynamic-form');

const createSection = (section) => {
  let sect = document.createElement('section');
  sect.classList.add('section');

  let title = document.createElement('h2');
  title.classList.add('title');

  let description = document.createElement('p');
  description.classList.add('description');

  sect.appendChild(title);
  sect.appendChild(description);

  title.innerHTML = section.title;
  description.innerHTML = section.description;

  return sect;
};

const createTextField = (textField, onChange) => {
  let input = document.createElement('input');
  let label = document.createElement('label');
  let inputBox = document.createElement('div');

  input.type = textField.type;
  input.id = textField.id;

  input.classList.add('field');
  label.classList.add('label');

  // formNode.appendChild(label);
  // formNode.appendChild(input);

  label.innerHTML = textField.label;
  inputBox.appendChild(label);
  inputBox.appendChild(input);

  input.addEventListener('change', onChangeValue);
  function onChangeValue() {
    onChange(textField.id, this.value);
  }
  return inputBox;
};

const createProductField = (product, onClick) => {
  let checkContainer = document.createElement('div');
  checkContainer.classList.add('checkContainer');
  let checkBox = document.createElement('input');
  checkBox.classList.add('square');
  checkBox.type = 'checkbox';

  checkContainer.appendChild(checkBox);
  // formNode.appendChild(checkContainer);
  checkBox.id = product.id;

  let productBox = document.createElement('div');
  productBox.classList.add('productBox');
  productBox.innerHTML = product.title;
  checkContainer.appendChild(productBox);

  let price = document.createElement('div');
  price.classList.add('price');
  price.innerHTML = product.price + ' €';
  checkContainer.appendChild(price);

  checkBox.addEventListener('change', onClickBox);
  function onClickBox() {
    onClick(product);
  }
  return checkContainer;
};

export const fieldsMap = {
  section: createSection,
  text: createTextField,
  product: createProductField,
};
