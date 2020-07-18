function getDataFromServer() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://randomuser.me/api/?results=150",
            method: "GET",
            success: function(DATA) {
                resolve(DATA)
            },
            failure: function(err) {
                reject(err)
            }
        })
    })
}

$(function() {
    const container = $('#container');
    container.html(`<div class="loader"></div>`)

    getDataFromServer().then((DATA) => {
        setTimeout(() => {
            draw(DATA.results)
        }, Math.floor(Math.random() * 2000));

    }).catch((err) => {
        console.error(err)
    })

    function draw(usersData) {
        container.empty()
        const tr = usersData.map((user, i) => {
            return getTR(user)
        })

        container.append(...tr)
    }
    
    function getTR(user) {
        const row = $('<tr></tr>');
        const fName = $(`<td>${user.name.first}</td>`);
        const lName = $(`<td>${user.name.last}</td>`);
        const gender = $(`<td>${user.gender}</td>`);
        const thumbnailIMG = $(`<td><img src="${user.picture.thumbnail}"></td>`);

        return row.append(fName, lName, gender, thumbnailIMG);
    }
})