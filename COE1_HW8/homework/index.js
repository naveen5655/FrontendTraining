/* START TASK 1: Your code goes here */
function clickCell() {
  let row = document.getElementById('mytable').rows;

  for (let i = 0; i < row.length; i++) {
    for (let j = 0; j < row[i].cells.length; j++) {
      row[i].cells[j].addEventListener('click', function () {
        row[i].cells[j].classList.add('yellow');
        if (
          i === 0 && j === 0 ||
          i === 1 && j === 0 ||
          i === 2 && j === 0
        ) {
          row[i].cells[j].classList.remove('yellow');
          for (let y = 0; y < row[i].cells.length; y++) {
            if (row[i].cells[y].classList.value !== 'white yellow') {
              row[i].cells[y].classList.add('blue');
            }
          }
        }
        if (row[i].cells[j].innerHTML.toLowerCase() === 'specialcell') {
          row[i].cells[j].classList.remove('yellow');
          for (let u = 0; u < row.length; u++) {
            for (let v = 0; v < row[u].cells.length; v++) {
              if (row[u].cells[v].classList.value === 'white') {
                row[u].cells[v].classList.add('green');
              }
            }
          }
        }
      });
    }
  }
}
clickCell();

/* END TASK 1 */

/* START TASK 2: Your code goes here */

const inputField = document.querySelector('#phoneNumberInputField');
const button = document.querySelector('#phoneNumberSubmitButton');
const notification = document.querySelector('.notification');
const pattern = /^[+][3][8][0][0-9]*$/g;
inputField.addEventListener('change', (event) => {
    if ( event.target.value.match(pattern)) {
        button.disabled = false;
        notification.className = 'notification hidden';
    } else {
document.querySelector('.successMessage').className = 'successMessage hidden';
        button.disabled = true;
        notification.className = 'notification';
    }
});

button.addEventListener('click', () => {
	notification.className = 'notification hidden';
    document.querySelector('.successMessage').className = 'successMessage';
});
/* END TASK 2 */

/* START TASK 3: Your code goes here */

/* END TASK 3 */
