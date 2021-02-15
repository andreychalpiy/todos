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
        return _.split(user.name, ' ')[0];
    })
}
// 8. function getLastNames() -> return all users last names ['Graham', 'Howell',...]
function getLastNames() {
    return _.map(users, function (user) {
        return _.split(user.name, ' ')[1];
    })
}
// 10. function maxUserAge() -> return max user age
function maxUserAge() {
    return _.maxBy(_.map(users, 'age'));
}
// sort director true or false
function getUsersByDirector(value) {
    return _.filter(users, ['director', value]);
}
// 3. function directorsAgeSum() -> return sum of ages where director=true
function directorsAgeSum() {
    return _.sumBy(getUsersByDirector(true), 'age');
}
// 1. function sortByDesc(sort) -> will sort list by id in descending order
function sortByDesc() {
    return _.orderBy(users, ['age'], ['desc']);
}
// return _.reverse(_.sortBy(users, 'age'));
// 4. function averageStaffAge() -> return average age for users where director=false
function averageStaffAge() {
    return _.sumBy(getUsersByDirector(false), 'age') / _.size(getUsersByDirector(false));
}
// 5. function getCompanyUsers(companyId) -> return users where company id = companyId
function getCompanyUsers(companyId) {
    return _.filter(users, ['company.id', companyId]);
}
// 12. function sortByUsersCount() -> return (sorted by count of users) result from function groupByCompany()
function sortByUsersCount() {
    return _.sortBy(groupByCompany(), ['users.length']);
}
//6. function groupByCompany() -> return list of companies with users
function groupByCompany() {
    let comp = _.uniqBy(_.map(users, 'company'), "id");
    _.map(comp, function (user) {
        return _.each(user.users = getCompanyUsers(user.id), function (user) {
            delete user.company;
        })
    })
    return comp;
}
// // 11. function biggestCompanyName() -> return the company name with the most users
function biggestCompanyName() {
    return _.reverse(_.sortBy(groupByCompany(), ['users.length'])).splice(0, 1)[0].name
}
// 14. function usersWithSettings() -> return all users with added user settings, if no settings add empty settings settings:{}
function usersWithSettings() {
    return _.map(users, function (user) {
        return _.assign({}, user, { setting: getUserSettings(user.id) });
    })
}
//return user settings
function getUserSettings(userId) {
    let index = _.findIndex(userSettings, ['user_id', userId]);
    return (index !== -1) ? userSettings[index].settings : {};
}
// 15. function getUsersByTheme(theme) -> return all users where settings.theme = theme
function getUsersByTheme(theme) {
    return _.filter(usersWithSettings(), ["setting.theme", theme]);
}
// 9. function groupByTitle() -> return list of titles with users list
function groupByTitle() {
    let sortTitle = _.uniqBy(_.map(users, function (user) {
        return { title: user.title };
    }), "title");
    _.each(sortTitle, function (user) {
        return _.assign(user, { users: getTitleUsers(user.title) });
    })
    return sortTitle;
}
// return users title
function getTitleUsers(title) {
    return _.filter(users, ["title", title]);
}
// 2. function filterAge(minAge, maxAge) -> return list where age >= minAge and age <= maxAge
function filterAge(minAge, maxAge) {
    return _.filter(users, function (user) {
        return _.inRange(user.age, minAge, maxAge);
    });
}
// 13. function getCompaniesNameWithUsersCount() -> return new list {company_name: users_count,...} example {'Yodah': 3, 'Soundtesting': 2,...}
function getCompaniesNameWithUsersCount() {
    let arr = {};
    _.each(groupByCompany(), function (item) {
        arr[item.name] = item.users.length;
    })
}
