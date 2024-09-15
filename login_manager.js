document.addEventListener('DOMContentLoaded', async function (event) {
    var acount_text = document.getElementById("acount_text");
    console.log(in_gelogd())
    if (in_gelogd()) {
        acount_text.innerText = await acount_naam()
    }


});

function in_gelogd() {
    if (localStorage.getItem("key") !== null) {
        return true
    }
    return false
}
async function acount_naam() {
    const options = {method: 'GET'};

    return await makeRequest("http://51.15.125.47:5000/get_item/user_key/"+localStorage.getItem("key")+"/1")
}
async function makeRequest(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}