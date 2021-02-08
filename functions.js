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
    return users.map(function (user) {
        return user.name.split(' ')[0];
    })
}
// 8. function getLastNames() -> return all users last names ['Graham', 'Howell',...]
function getLastNames() {
    return users.map(function (user) {
        return user.name.split(' ')[1];
    })
}
// 1. function sortByDesc(sort) -> will sort list by id in descending order
function sortByDesc() {
    return users.sort(function (a, b) {
        if (a.id < b.id) return 1;
        if (a.id > b.id) return -1;
        if (a.id === b.id) return 0;

    })
}
// 3. function directorsAgeSum() -> return sum of ages where director=true
function directorsAgeSum() {
    let sumAge = users.filter(function (user) {
        return user.director;
    }).reduce((prev, item) => {
        return prev + item.age;
    }, 0);
    return sumAge;
}
// 2. function filterAge(minAge, maxAge) -> return list where age >= minAge and age <= maxAge
function filterAge(minAge, maxAge) {
    return users.filter(function (user) {
        return user.age >= minAge && user.age <= maxAge;
    })
}
// 4. function averageStaffAge() -> return average age for users where director=false
function averageStaffAge() {
    let notDerector = users.filter(function (user) {
        return !user.director;
    })
    let sum = notDerector.reduce((prev, user) => {
        return prev + user.age;
    }, 0)
    return sum / notDerector.length;
}
// 5. function getCompanyUsers(companyId) -> return users where company id = companyId
function getCompanyUsers(companyId) {
    return users.filter(function (user) {
        return user.company.id === companyId;
    })
}
// 10. function maxUserAge() -> return max user age
function maxUserAge() {
    let arr = users.map(function (user) {
        return user.age;
    })
    return Math.max(...arr);
}
//6. function groupByCompany() -> return list of companies with users
function groupByCompany() {
    let companies = users.map(function (user) {
        let company = Object.assign({}, user.company);
        company.users = getCompanyUsers(company.id);
        let usersCompany = company.users.map(function (user) {
            let copyUsers = Object.assign({}, user);
            delete copyUsers.company;
            return copyUsers;
        })
        company.users = usersCompany;
        return company;
    })
    // return Object.values(companies.reduce((acc, current) => Object.assign(acc, { [current.id]: current }), {}));
    let uniq = {}
    return companies.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
}
