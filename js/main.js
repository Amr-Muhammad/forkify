let myData;
let query = ''

Array.from(document.getElementsByTagName('li')).forEach(el => {
    el.addEventListener('click', () => {
        query = el.innerText
        getData(query)
    })
})

async function getData() {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query ? query : 'pizza'}`)
    myData = (await response.json()).recipes
    displayData()
}
getData()

function displayData() {
    let temp = ''
    for (let i = 0; i < myData.length; i++) {
        temp += `
        <div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="border border-1 rounded-3">
                        <img class="w-100" src="${myData[i].image_url}" alt="">
                        <h5 class="mt-3">${myData[i].title.length > 15 ? myData[i].title.slice(0, 20) + `...` : myData[i].title}</h5>
                        <button class="btn btn-outline-dark my-3">
                            <a class="text-decoration-none text-black" href="${myData[i].source_url}">See More
                                ...</a>
                        </button>
                    </div>
                </div>`
    }
    document.getElementById('data').innerHTML = temp
}
