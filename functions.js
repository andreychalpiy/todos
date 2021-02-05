let users = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "age": 18,
        "director": false,
        "title": "Accountant",
        "company": {
            "id": 1,
            "name": "Yodah"
        }
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "age": 33,
        "director": false,
        "title": "Manager",
        "company": {
            "id": 1,
            "name": "Yodah"
        }
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "age": 24,
        "director": false,
        "title": "Accountant",
        "company": {
            "id": 2,
            "name": "Soundtesting"
        }
    },
    {
        "id": 4,
        "name": "Patricia Lebsack",
        "age": 45,
        "director": false,
        "title": "Accountant",
        "company": {
            "id": 2,
            "name": "Soundtesting"
        }
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "age": 50,
        "director": false,
        "title": "Manager",
        "company": {
            "id": 1,
            "name": "Yodah"
        }
    },
    {
        "id": 6,
        "name": "Dennis Schulist",
        "age": 33,
        "director": true,
        "title": "Director",
        "company": {
            "id": 3,
            "name": "Baseenergy"
        }
    },
    {
        "id": 7,
        "name": "Kurtis Weissnat",
        "age": 27,
        "director": false,
        "title": "Accountant",
        "company": {
            "id": 4,
            "name": "Thecodestore"
        }
    },
    {
        "id": 8,
        "name": "Nicholas Runolfsdottir",
        "age": 27,
        "director": false,
        "title": "Accountant",
        "company": {
            "id": 1,
            "name": "Yodah"
        }
    },
    {
        "id": 9,
        "name": "Glenna Reichert",
        "age": 50,
        "director": true,
        "title": "Director",
        "company": {
            "id": 1,
            "name": "Yodah"
        }
    },
    {
        "id": 10,
        "name": "Clementina DuBuque",
        "age": 49,
        "director": true,
        "title": "Director",
        "company": {
            "id": 2,
            "name": "Soundtesting"
        }
    },
];

function getFirstNames() { 
    return users.map(function(user){
       return user.name.split(' ')[0];
    })
}
function getLastNames() { 
    return users.map(function(user){
       return user.name.split(' ')[1];
    })
}
function sortByDesc() {
    return users.sort(function(a, b) {
        if(a.id < b.id) return 1;
        if(a.id > b.id) return -1;
        if(a.id === b.id) return 0;

   }) 
}
function directorsAgeSum() {
    let sumAge = users.filter(function(user) {
        return user.director;
    }).reduce((prev, item) => {
        return prev + item.age;
    },0);
    return sumAge;
}
function filterAge(minAge, maxAge) {
    return users.filter(function(user) {
        return user.age >= minAge && user.age <= maxAge;
    })
}
