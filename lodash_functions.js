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
let userSettings = [
    {
        "user_id": 1,
        "settings": { "theme": "black" },
    },
    {
        "user_id": 3,
        "settings": { "theme": "purple" },
    },
    {
        "user_id": 7,
        "settings": { "theme": "default" },
    },
    {
        "user_id": 6,
        "settings": { "theme": "default" },
    },
    {
        "user_id": 10,
        "settings": { "theme": "black" },
    }
];
// 7. function getFirstNames() -> return all users first names ['Leanne', 'Ervin',...]
function getFirstNames() {
    return _.map(users, function (user) {
        return user.name.split(' ')[0];
    })
}
// 8. function getLastNames() -> return all users last names ['Graham', 'Howell',...]
function getLastNames() {
    return _.map(users, function (user) {
        return user.name.split(' ')[1];
    })
}
// 10. function maxUserAge() -> return max user age
function maxUserAge() {
    return _.maxBy(_.map(users, 'age'));
}
// sort director true or false
function getUsersByDirector(value) {
    return _.filter(users, ['director', value])
}
// 3. function directorsAgeSum() -> return sum of ages where director=true
function directorsAgeSum() {
    return _.sumBy(getUsersByDirector(true), 'age');
}
// 1. function sortByDesc(sort) -> will sort list by id in descending order
function sortByDesc() {
    return _.reverse(_.sortBy(users, 'age'));
}
// 4. function averageStaffAge() -> return average age for users where director=false
function averageStaffAge() {
    return _.sumBy(getUsersByDirector(false), 'age') / _.size(getUsersByDirector(false));
}
// 5. function getCompanyUsers(companyId) -> return users where company id = companyId
function getCompanyUsers(companyId) {
    return _.filter(users, ['id', companyId])
}
