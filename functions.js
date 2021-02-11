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
    return users.filter(function (user) {
        return user.director;
    }).reduce(function (prev, item) {
        return prev + item.age;
    }, 0);
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
    return users.map(function (user) {
        return Object.assign({}, user.company);
    }).filter(function (value, index, self) {
        return self.findIndex(function (item) {
            return value.id === item.id;
        }) === index;
    }).map(function (company) {
        company.users = getCompanyUsers(company.id).map(function (user) {
            let copyUsers = Object.assign({}, user);
            delete copyUsers.company;
            return copyUsers;
        })
        return company;
    })
}
// 12. function sortByUsersCount() -> return (sorted by count of users) result from function groupByCompany()
function sortByUsersCount() {
    return groupByCompany().sort(function (a, b) {
        if (a.users.length > b.users.length) return 1;
        if (a.users.length < b.users.length) return -1;
        if (a.users.length === b.users.length) return 0;
    })
}
// 11. function biggestCompanyName() -> return the company name with the most users
function biggestCompanyName() {
    return groupByCompany().sort(function (a, b) {
        if (a.users.length < b.users.length) return 1;
        if (a.users.length > b.users.length) return -1;
        if (a.users.length === b.users.length) return 0;
    }).splice(0, 1)[0].name
}
// 14. function usersWithSettings() -> return all users with added user settings, if no settings add empty settings settings:{}
function usersWithSettings() {
    return users.map(function (user) {
        return Object.assign({}, user);
    }).map(function (user) {
        user.settings = getUserSettings(user.id).map(function (user) {
            let setting = Object.assign(user.settings)
            delete setting.user_id;
            return setting;
        })
        return user;
    });
}
//return user settings
function getUserSettings(userId) {
    return userSettings.filter(function (user) {
        return user.user_id === userId;
    })
}
// 15. function getUsersByTheme(theme) -> return all users where settings.theme = theme
function getUsersByTheme(theme) {
    return usersWithSettings().filter(function (user) {
        return user.settings.theme === theme;
    })
}
console.log(getCompaniesNameWithUsersCount())
// 9. function groupByTitle() -> return list of titles with users list
function groupByTitle() {
    return users.map(function (user) {
        return user.title;
    }).map(function (title) {
        return Object.assign({ title })
    }).filter(function (val, index, arr) {
        return arr.findIndex(function (item) {
            return val.title === item.title;
        }) === index;
    }).map(function (item) {
        item.users = getTitleUsers(item.title)
        return Object.assign({}, item)
    })
}
// return users title
function getTitleUsers(title) {
    return users.filter(function (user) {
        return user.title === title;
    })
}
// 13. function getCompaniesNameWithUsersCount() -> return new list {company_name: users_count,...} example {'Yodah': 3, 'Soundtesting': 2,...}
function getCompaniesNameWithUsersCount() {
    let arr = {};
    groupByCompany().forEach(function (item) {
        arr[item.name] = item.users.length;
    })
    return arr
}


// let arr = {};
// arr = groupByCompany().map(function (item) {
//     return { [item.name]: item.users.length };
// }).forEach(function (item) {
//     return Object.assign({}, item)

// })
// return arr