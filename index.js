import { config, products, validationRules } from './config';
import { fieldsMap } from './fields';
import './style.css';

const formNode = document.getElementById('dynamic-form');
const registerButton = document.getElementById('register-button');
const formState = {};

const onChange = (id, value) => {
  if (!formState[id]) {
    formState[id] = value;
  } else {
    delete formState[id];
  }
};

const onClick = (product) => {
  if (!formState.products) formState.products = [];

  if (formState.products.includes(product)) {
    formState.products = formState.products.filter(function (r) {
      return r !== product;
    });
  } else formState.products.push(product);
};

config.forEach(function (info) {
  let section = fieldsMap.section(info);
  formNode.appendChild(section);
  info.fields.forEach(function (field) {
    switch (field.type) {
      case 'text':
        let textField = fieldsMap.text(field, onChange);
        section.appendChild(textField);
        break;
      case 'product': {
        const fullProduct = products.find((product) => product.id === field.id);
        let productField = fieldsMap.product(fullProduct, onClick);
        section.appendChild(productField);
        break;
      }
    }
  });
});

const isValid = (value, rules) => {
  const rulesArray = Object.entries(rules);
  // console.log(rulesArray);

  return rulesArray.every(([ruleType, ruleValue]) => {
    if (ruleType === 'required' && ruleValue) {
      return !!value;
    }
    if (ruleType === 'includes') {
      return value.includes(ruleValue);
    }
    if (ruleType === 'min') {
      return value.length > ruleValue;
    }
    return true;
  });
};

function validateForm() {
  let invalidFields = [];
  console.log(invalidFields);
  validationRules.forEach(function ([id, rules]) {
    if (!isValid(formState[id], rules)) {
      // console.log('RULES ' + id);
      // console.log('RULES ' + Object.values(rules));
      // console.log('FSI ' + formState[id]);
      // console.log('RUL' + Object.entries(rules));
      // console.log(rules);
      invalidFields.push(id);
      // console.log(invalidFields);
    }
    return invalidFields;
    //console.log(invalidFields);
  });
  if (invalidFields.length > 0) {
    alert(invalidFields.join(', ').toUpperCase() + ' NOT VALID!');
  } else {
    let sum = 0;
    formState.products?.reduce(function (acc, inc) {
      console.log(formState);
      return (sum = acc += inc.price);
    }, 0);
    alert(
      'UTENTE: \n' +
        Object.entries(formState)
          .join(' \n')
          .replace(/,/g, ': ')
          .toUpperCase() +
        '\n\n TOTALE ORDINE: ' +
        sum +
        ' €'
    );
  }

  console.log(invalidFields[0]);
}
formNode.appendChild(registerButton);

registerButton.onclick = function onSubmit() {
  validateForm();
  // Register button clicked
};
