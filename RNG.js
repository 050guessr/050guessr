// Teletubby code mode activated
function encodeToBase64(str) {
    return btoa(str);
}

function request(website) {
    return new Promise((resolve, reject) => {
        fetch(website)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                resolve(text);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function RNG(daily) {
    var info = "Error fetching";
    return request("info.json").then(text => {
        info = JSON.parse(text);
    })
    .catch(error => {
        console.error('Error fetching plain text:', error);
        throw error;
    })
    .then(() => {
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

        var storedValue = sessionStorage.getItem("DAILY_" + daily);
        //document.writeln(storedValue)
        var RNG = Math.floor(storedValue * info.lengt)+1;
        //document.writeln(RNG)
        
        var foto = document.getElementById("img");

        return request("fotos/" + RNG + "/" + RNG + ".json").then(text => {
            var fotoInfo = JSON.parse(text);
            foto.src = "fotos/" + RNG + "/" + RNG + ".jpeg";
            return fotoInfo;
        });
    })
    .catch(error => {
        console.error('Error in RNG function:', error);
        throw error;
    });
}
