// Your code goes here
// Task1
function isEquals(x,y){
    return !(x ^ y);
}

// Task2
function isBigger(x,y){
    return x > y;
}

// Task3
function storeNames(...names){
    return names;
}


// Task4
function getDifference(x, y){
    return x > y ? x - y : getDifference(y,x)
}


function negativeCount(arr) {
    let count;
    count = arr.filter(ar => ar < 0)
    return count.length;
}

function letterCount(string1,string2){
    let count = 0;
    for(let r of string1){
        if(r.toLowerCase() === string2.toLowerCase()){
            ++count;
        }
    }
    return count;
}


function countPoints(arr){
    let count = 0;
    for(let st of arr){
        let str = st.split(':')
        if(~~str[0] > ~~str[1]){
            count += 3;
        } else if (~~str[0] < ~~str[1]){
            count += 0;
        } else{
            count += 1;
        }
    }

    return count;
}
