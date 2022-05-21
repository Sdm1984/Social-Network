const username = [
    'Stephanie',
    'Lindsay',
    'Ann',
    'Jerry',
    'Brittany'
];

const thoughts = [
    'I am feeling good today',
    'You will be successful',
    'Live life to the fullest',
    'Love yourself',
    'Stay calm under pressure',  
];

const reactions = [
    'I like it',
    'Thats great',
    'I am not impressed',
    'Very cool',
    'Thank you'
];

const randomArrItem = (arrName) => {
    // console.log(arr);
    let arr = [];
    if(arrName === 'username'){
        arr = username;
    }else if(arrName === 'thoughts'){
        arr = thoughts;
    }else {
        arr = reactions;
    }
    const item = arr[Math.floor(Math.random() * arr.length)];
    // console.log(item);
    return item;
}

const addUsers = () => {
    return username;
}

module.exports = { randomArrItem, addUsers };