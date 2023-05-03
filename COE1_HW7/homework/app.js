const appRoot = document.getElementById('app-root');

let form = document.createElement('form');
form.className = 'form'; 
appRoot.append(form);
const formHeader = document.createElement('h1');
formHeader.className = 'form-header';
formHeader.textContent = 'Countries Search';
form.append(formHeader);
let fieldsetRadioInput = document.createElement('fieldset');
fieldsetRadioInput.classList.add('form-fieldset', 'form-fieldset_radio');
form.append(fieldsetRadioInput);
let radioWrapper = document.createElement('div');
radioWrapper.classList.add('form-radio-wrapper');
fieldsetRadioInput.append(radioWrapper);
let labelRadioInputs = document.createElement('label');
labelRadioInputs.setAttribute('for', 'InputRegion', 'InputLanguage');
labelRadioInputs.textContent='By Please choose the type of search:';
radioWrapper.append(labelRadioInputs);
let inputsWrapper = document.createElement('div');
inputsWrapper.classList.add('form-radio-inputs-wrapper');
fieldsetRadioInput.append(inputsWrapper);

let inputRadioRegion = document.createElement('input');
inputRadioRegion.className = 'form-input';
inputRadioRegion.type = 'radio';
inputRadioRegion.name = 'Radio';
inputRadioRegion.id = 'InputRegion';
inputRadioRegion.value='Regions';
inputsWrapper.append(inputRadioRegion);
let labelRegion = document.createElement('label');
labelRegion.setAttribute('for', 'InputRegion');
labelRegion.textContent='By Region';
inputsWrapper.append(labelRegion);

let inputRadioLanguage = document.createElement('input');
inputRadioLanguage.className = 'form-input';
inputRadioLanguage.type = 'radio';
inputRadioLanguage.name = 'Radio';
inputRadioLanguage.id = 'InputLanguage';
inputRadioLanguage.value='Languages'
inputsWrapper.append(inputRadioLanguage);
let labelLanguage = document.createElement('label');
labelLanguage.setAttribute('for', 'InputLanguage');
labelLanguage.textContent='By Language'
inputsWrapper.append(labelLanguage);

let fieldsetSelectInput = document.createElement('fieldset');
fieldsetSelectInput.className = 'form-fieldset';
form.append(fieldsetSelectInput);
let labelSelect = document.createElement('label');
labelSelect.setAttribute('for', 'inputSelect');
labelSelect.textContent='Please choose search query:'
fieldsetSelectInput.append(labelSelect);

let select = document.createElement('select');
select.id='inputSelect';
select.name = 'select';
select.value = 'select';
select.setAttribute('disabled', true);
fieldsetSelectInput.append(select);
function baseOption(){
  let option = document.createElement('option');
  option.className = 'form-base-option';
  option.textContent = 'Select value';
  select.append(option);
}
let chooseQueryAlert = document.createElement('p');
chooseQueryAlert.textContent = 'No items, please choose search query';
chooseQueryAlert.classList.add('table-alert');
appRoot.append(chooseQueryAlert);
let tableBlock = document.createElement('div');
appRoot.append(tableBlock);

baseOption();



inputRadioRegion.addEventListener('change', radioChecked);
inputRadioLanguage.addEventListener('change', radioChecked);

function radioChecked(evt){
  tableBlock.innerHTML='';
  chooseQueryAlert.classList.remove('table-alert_none');
  let radioCheck = evt.target;
  select.innerHTML='';
  baseOption();
  if(radioCheck.value === 'Regions'){
    createOptions(externalService.getRegionsList());
   let optionArray = document.querySelectorAll('.option');
   optionArray.forEach(function(element){
    element.classList.add('form-option-region');
   })
  } else{
    createOptions(externalService.getLanguagesList());
    let optionArray = document.querySelectorAll('.option');
    optionArray.forEach(function(element){
    element.classList.add('form-option-language');
    })    
  }
}
function createOptions(method){
  for(let i = 0; i<method.length-1; i++){
    let optionExtra = document.createElement('option');
    optionExtra.textContent = method[i];
    optionExtra.value = method[i];
    optionExtra.className = 'option';
    select.append(optionExtra);
  }   
  select.removeAttribute('disabled');  
}
select.addEventListener('input', createOptionTable);

function createOptionTable(e){
  chooseQueryAlert.classList.add('table-alert_none');
  let optionValue = e.target.value;
  if(externalService.getRegionsList().includes(optionValue)){
    createTable(externalService.getCountryListByRegion(optionValue));
  }
  if(externalService.getLanguagesList().includes(optionValue)){
    createTable(externalService.getCountryListByLanguage(optionValue));
}
  e.stopPropagation();
}
let firstRow = 1;
let secondRow = -1;
function createTable(method){
  createTH();  
  createBaseArrows();
  method = method.sort((a, b) => a.name > b.name ? firstRow : secondRow);

  let table = document.querySelector('.table');
  createRows(method, table);
  table.addEventListener('click', function sort(e){
  if(e.target.id === 'nameArrow'){  
    if(e.target.classList.contains('table-arrow-up')){
      method = method.sort((a, b) => a.name < b.name ? firstRow : secondRow);
      let tableSorted = resetTable(table, method);
      changeArrowClass(e.target, 'table-arrow-down', area, 'table-arrow-doubleside');
      tableSorted.addEventListener('click', sort);
    } 
    if(e.target.classList.contains('table-arrow-doubleside') || e.target.classList.contains('table-arrow-down')){
      method = method.sort((a, b) => a.name > b.name ? firstRow : secondRow);
      let tableSorted = resetTable(table, method);
       tableSorted.addEventListener('click', sort);
      changeArrowClass(e.target, 'table-arrow-up', area, 'table-arrow-doubleside');
    }
    }
  if(e.target.id === 'area'){ 
    if(e.target.classList.contains('table-arrow-up')){
      method = method.sort((a, b) => {
        return b.area - a.area;
      });

      let tableSorted = resetTable(table, method);
      changeArrowClass(e.target, 'table-arrow-down', nameArrow, 'table-arrow-doubleside');
      tableSorted.addEventListener('click', sort);
   } 
    if(e.target.classList.contains('table-arrow-down') || e.target.classList.contains('table-arrow-doubleside')){
     method = method.sort((a, b) => {
      return a.area - b.area;
    }); 
      table.innerHTML='';
     let tableNew = createTH();
     createRows(method, tableNew); 
     tableNew.addEventListener('click', sort);
     changeArrowClass(e.target, 'table-arrow-up', nameArrow, 'table-arrow-doubleside');
    } 
    }
    }, method);
    }

function createTH(){
  chooseQueryAlert.classList.add('table-alert_none');
  tableBlock.innerHTML='';
  let table = document.createElement('table');
  table.classList.add('table');
  tableBlock.append(table);
  table.innerHTML=`
  <th class="th th-name">Country name<div id = "nameArrow"></div></th>
  <th class="th">Capital</th>
  <th class="th">World region</th>
  <th class="th">Languages</th>
  <th class="th th-area">Area<div class="area" id = "area"></div></th>
  <th class="th">Flag</th>`; 
  return table;
} 

function createBaseArrows(){
  let nameArrow = document.querySelector('#nameArrow');
  let areaArrow = document.querySelector('.area');
  nameArrow.classList.add('table-arrow-up');  
  areaArrow.classList.add('table-arrow-doubleside');
}

function createRows(method, table){
  for (let j=0; j<method.length; j++){
    let row = `<tr class = "row">
              <td column-name = "name" class="td td-name">${method[j].name}</td>
              <td class="td">${method[j].capital}</td>
              <td class="td">${method[j].region}</td>
              <td class="td">${Object.keys(method[j].languages).map(function(key){
                return method[j].languages[key];
              })}</td>
              <td class="td">${method[j].area}</td>
              <td class="td"><img src=${method[j].flagURL}></td>
    </tr>`
    table.innerHTML+= row; 
  }
}

function resetTable(table, method){
  table.innerHTML='';
  let tableNew = createTH(); 
  createRows(method, tableNew);
  return tableNew;
}
function changeArrowClass(targetArrow, newtargetArrowClass, secondArrow, newsecondArrowClass){
  let Arrow = document.querySelector(`#${targetArrow.id}`);
  Arrow.classList.add(newtargetArrowClass);
  let anotherArrow = document.querySelector(`#${secondArrow.id}`);
  anotherArrow.classList.add(newsecondArrowClass);
  }


