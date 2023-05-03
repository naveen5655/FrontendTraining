// Your code goes here
function is_valid(){
    if (intial_amount < valid_number || isNaN(intial_amount)) {
        return false;
    }
    if (no_years < valid_year || isNaN(no_years)) {
        return false;
    }
    if (percentage_of_year > valid_percentage || isNaN(percentage_of_year)) {
        return false;
    }
    return true;
}

function calculate_total(){
    let amount = intial_amount
    let total_profit = 0,profit = 0
    let print_data = null
    let alert_data = null
    for(let i = 0; i < no_years; i++){
        profit = parseFloat((amount * percentage_of_year/valid_percentage).toFixed(precision))
        total_profit += profit 
        let pre_amount = amount
        amount += profit
        if(i === 0){
            print_data = '<p>'+(i+1)+'Year</p>'+
                          '<p>Total Profit :'+total_profit+'('+percentage_of_year+'% from initial amount)</p>'+
                          '<p>Total amount :'+amount+'(initial amount + total profit)</p><br>'
        }else{
            print_data += '<p>'+(i+1)+'Year</p>'+
                          '<p>Total Profit :'+parseFloat(total_profit).toFixed(precision)+
                          '(previous profit + '+percentage_of_year+'% from previous total amount ('+pre_amount+'))</p>'+
                          '<p>Total amount :'+parseFloat(amount).toFixed(precision)+
                          '(initial amount + total profit)</p><br>'
        }
    }
    alert_data = 'Initial amount: '+intial_amount+'\n'+
    'Number of years: '+no_years+'\n'+
    'Percentage of year: '+percentage_of_year+'\n\n\n'+
    'Total profit: '+parseFloat(total_profit).toFixed(precision)+'\n'+
    'Total amount :'+parseFloat(amount).toFixed(precision)+'\n'

    alert(alert_data) 
    return print_data
}


const valid_number = 1000
const valid_year = 1
const valid_percentage = 100
const precision = 2
let intial_amount = parseInt(prompt('Enter Amount'),10)
let no_years = parseInt(prompt('Enter No.Of Years'),10)
let percentage_of_year = parseFloat(prompt('Enter Percentage Of Year'))

if(is_valid()){
    let print_data = calculate_total()
    document.writeln(print_data)
}else{
    alert('Invalid Input Data')
}
