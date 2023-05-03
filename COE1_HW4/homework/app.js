function reverseNumber(num) {
    return Math.sign(num)*parseInt(num.toString().split('').reverse().join(''));
}

function forEach(arr, func) {
    for(let le of arr){
        func(le);
    }
}

function map(arr, func) {
    
    let newArray = [];
    for(let el of arr){
        newArray.push(func(el))
    }
    return newArray;
 }

 function filter(arr, func) {
    let newArray = [];
    for(let el of arr){
        if(func(el)){
            newArray.push(el)
        }
    }
    return newArray;
 }

function getAdultAppleLovers(data) {
    let filter_data = filter(data,function(e1) { 
        return e1.age > '18' && e1.favoriteFruit === 'apple'
    })
    let map_data = map(filter_data,function(e1) { 
        return e1.name 
    }) 
    return map_data;
}

function getKeys(obj) {
    let newKeys = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newKeys.push(key)
        }
      } 
      return newKeys;
}

function getValues(obj) {
    let newKeys = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newKeys.push(obj[key])
        }
      } 
      return newKeys;
}

function showFormattedDate(dateObj) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-IN', options);
}
