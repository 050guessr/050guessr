// Teletubby code mode activated
function encodeToBase64(str) {
    return btoa(str);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function RNG(daily) {
    if (sessionStorage.getItem("DAILY_5") === null) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy + '/superrand/siemvk/2024/';
        var seed = encodeToBase64(today);
        var myrng = new Math.seedrandom(seed);
        sessionStorage.setItem("DAILY_1", myrng());
        sessionStorage.setItem("DAILY_2", myrng());
        sessionStorage.setItem("DAILY_3", myrng());
        sessionStorage.setItem("DAILY_4", myrng());
        sessionStorage.setItem("DAILY_5", myrng());
    }
    var info = JSON.parse(httpGet("info.json"));
    var storedValue = sessionStorage.getItem("DAILY_" + daily);
    var RNG = Math.floor(storedValue * info.foto_hoeveelheid)+1;
    var foto = document.getElementById("img");
    foto.src = "fotos/" + RNG + "/" + RNG + ".jpeg";
    return httpGet("fotos/" + RNG + "/" + RNG + ".json");
}
